# VERIFY Stage — Reference (DPB v1.2)

Read this file when entering VERIFY mode.

## Purpose

QA an enriched DPB. Validates cross-references (including Productions),
confirms state assignments, marks each row's readiness for downstream drafting.
Produces a verification report. This is a DATA-ENGINEERING task — use pandas
for all checks.

## CRITICAL: USE PANDAS FOR ALL CHECKS

Write and execute ONE script that performs all automated checks. The LLM's
role in VERIFY is limited to: running the QA script, reviewing edge cases,
and producing the human-readable report.

## Workflow

### Step 1: Run the Structural QA Script

```python
import pandas as pd
import glob, shutil
from openpyxl import load_workbook
from openpyxl.utils.dataframe import dataframe_to_rows

PACK_NAME = "REPLACE_WITH_ACTUAL_PACK_NAME"  # ← MUST SET
WORK = f"/home/claude/DPB-Verified-{PACK_NAME}.xlsx"
OUT  = f"/mnt/user-data/outputs/DPB-Verified-{PACK_NAME}.xlsx"

# Find enriched input
candidates = (
    glob.glob(f"/mnt/user-data/uploads/DPB-Enriched-{PACK_NAME}*.xlsx") +
    glob.glob(f"/mnt/user-data/outputs/DPB-Enriched-{PACK_NAME}*.xlsx") +
    glob.glob(f"/home/claude/DPB-Enriched-{PACK_NAME}*.xlsx")
)
if not candidates:
    raise FileNotFoundError(
        f"No files matching DPB-Enriched-{PACK_NAME}*.xlsx found."
    )
INPUT = candidates[0]
print(f"Input: {INPUT}")
shutil.copy2(INPUT, WORK)

# Load tabs
df_req = pd.read_excel(WORK, sheet_name="Requests", dtype=str, keep_default_na=False)
df_meta = pd.read_excel(WORK, sheet_name="Set_Metadata", dtype=str, keep_default_na=False)

# Productions tab (may not exist in older DPBs)
has_productions = False
try:
    df_prod = pd.read_excel(WORK, sheet_name="Productions", dtype=str, keep_default_na=False)
    has_productions = len(df_prod) > 0
    print(f"Productions: {len(df_prod)} rows")
except:
    df_prod = pd.DataFrame()
    print("No Productions tab found — skipping productions checks")

valid_setids = set(df_meta["SetID"].tolist())

# =============================================
# REQUESTS CHECKS
# =============================================

defect_lists = [[] for _ in range(len(df_req))]

# --- Check 1: Orphaned SetIDs ---
orphan_mask = ~df_req["SetID"].isin(valid_setids) & (df_req["SetID"] != "")
for idx in df_req[orphan_mask].index:
    defect_lists[idx].append("ORPHAN-SETID")

# --- Check 2: Missing Enrichment ---
required_enrich = ["ObjType", "DeficiencyType", "DeficiencySeverity", "State"]
for col in required_enrich:
    if col in df_req.columns:
        missing = df_req[col].isin(["", "nan"])
        for idx in df_req[missing].index:
            # GEN-OBJ rows exempt from State requirement
            if col == "State" and df_req.loc[idx, "ReqNum"] == "GEN-OBJ":
                continue
            defect_lists[idx].append(f"MISSING-{col.upper()}")

# --- Check 3: State Consistency ---
if "State" in df_req.columns:
    for idx, row in df_req.iterrows():
        state = row.get("State", "")
        deficiency = row.get("DeficiencyFlag", "")
        answer = row.get("AnswerText", "")
        bates = row.get("BatesProduced", "")
        gf_sent = row.get("GoodFaithSent", "")
        gf_date = row.get("GoodFaithDate", "")
        cure_dl = row.get("CureDeadline", "")

        if state == "COMPLETE" and deficiency == "Y":
            defect_lists[idx].append("STATE-VS-DEFICIENCY")
        if state == "NO-RESPONSE" and answer not in ["NO RESPONSE SERVED", ""]:
            defect_lists[idx].append("STATE-VS-ANSWER")
        if state == "OBJECTION-ONLY" and answer not in ["No substantive answer provided", ""]:
            if len(answer) > 50 and "subject to" in answer.lower():
                defect_lists[idx].append("STATE-MAY-BE-PARTIAL")
        if state == "PRODUCED" and not bates.strip():
            defect_lists[idx].append("PRODUCED-NO-BATES")
        if state == "CURE-FAILED" and not gf_date.strip():
            defect_lists[idx].append("CURE-FAILED-NO-GF-DATE")
        if state == "CURE-PENDING" and not cure_dl.strip():
            defect_lists[idx].append("CURE-PENDING-NO-DEADLINE")

# --- Check 4: Deficiency Quality ---
for idx, row in df_req.iterrows():
    if row.get("DeficiencyFlag", "") == "Y":
        if not row.get("DeficiencyType", "").strip():
            defect_lists[idx].append("DEFICIENCY-NO-TYPE")
        if not row.get("DeficiencySeverity", "").strip():
            defect_lists[idx].append("DEFICIENCY-NO-SEVERITY")
        if not row.get("CureRequested", "").strip():
            defect_lists[idx].append("DEFICIENCY-NO-CURE")

# --- Check 5: Request Numbering Gaps ---
for setid in valid_setids:
    set_rows = df_req[df_req["SetID"] == setid]
    nums = []
    for n in set_rows["ReqNum"]:
        try:
            nums.append(int(n))
        except ValueError:
            continue  # Skip GEN-OBJ etc
    if nums:
        expected = set(range(min(nums), max(nums) + 1))
        missing_nums = expected - set(nums)
        if missing_nums:
            for idx in set_rows.index[:1]:
                defect_lists[idx].append(f"MISSING-REQNUMS-{sorted(missing_nums)}")

# --- Check 6: TotalRequests vs actual count ---
for _, meta_row in df_meta.iterrows():
    setid = meta_row["SetID"]
    try:
        declared = int(meta_row.get("TotalRequests", 0))
    except (ValueError, TypeError):
        declared = 0
    actual = len(df_req[(df_req["SetID"] == setid) & (df_req["ReqNum"] != "GEN-OBJ")])
    if declared > 0 and declared != actual:
        mask = df_req["SetID"] == setid
        for idx in df_req[mask].index[:1]:
            defect_lists[idx].append(f"COUNT-MISMATCH-DECLARED-{declared}-ACTUAL-{actual}")

# --- Check 7: ProdIDs cross-reference (v1.2) ---
if has_productions and "ProdIDs" in df_req.columns:
    valid_prodids = set(df_prod["ProdID"].tolist()) if len(df_prod) > 0 else set()
    for idx, row in df_req.iterrows():
        prod_refs = str(row.get("ProdIDs", "")).strip()
        if prod_refs and prod_refs != "nan":
            for pid in [p.strip() for p in prod_refs.split("|")]:
                if pid and pid not in valid_prodids:
                    defect_lists[idx].append(f"ORPHAN-PRODID-{pid}")

# --- Check 8: Element_ID consistency (v1.2) ---
# Flag ELEMENT-UNTAGGED on deficient rows (should have been tagged)
for idx, row in df_req.iterrows():
    eid = row.get("Element_ID", "")
    deficiency = row.get("DeficiencyFlag", "")
    if deficiency == "Y" and (eid == "ELEMENT-UNTAGGED" or eid == ""):
        defect_lists[idx].append("DEFICIENCY-UNTAGGED-ELEMENT")

# =============================================
# ASSIGN REQUEST STATUS + AllDefects
# =============================================
df_req["AllDefects"] = [" | ".join(d) if d else "" for d in defect_lists]

def assign_status(row):
    defects = row.get("AllDefects", "")
    state = row.get("State", "")

    if state in ["WITHDRAWN", "RESOLVED"]:
        return "ARCHIVED"
    if "STATE-VS-" in defects or "STATE-MAY-BE" in defects:
        return "STATE-CONFLICT"
    if "ORPHAN-SETID" in defects:
        return "INCOMPLETE"
    if "MISSING-STATE" in defects or "MISSING-DEFICIENCYTYPE" in defects:
        return "INCOMPLETE"

    obj_basis = row.get("ObjBasis_LPB", "")
    cfp_refs = row.get("AnswerCFP_FactRefs", "")
    if "NO LPB" in obj_basis or "AUTHORITY NEEDED" in obj_basis:
        return "NEEDS-LPB"
    if cfp_refs == "NO CFP PROVIDED":
        return "NEEDS-CFP"

    if defects and "DEFICIENCY-" in defects:
        return "NEEDS-REVIEW"
    if defects:
        return "NEEDS-REVIEW"

    return "PACK-READY"

df_req["Status"] = df_req.apply(assign_status, axis=1)

# =============================================
# PRODUCTIONS CHECKS (v1.2)
# =============================================
prod_defect_lists = []
if has_productions:
    prod_defect_lists = [[] for _ in range(len(df_prod))]

    # Check P1: Orphaned SetIDs in Productions
    for idx, row in df_prod.iterrows():
        if row["SetID"] not in valid_setids and row["SetID"] != "":
            prod_defect_lists[idx].append("ORPHAN-SETID")

    # Check P2: Missing BatesStart
    for idx, row in df_prod.iterrows():
        if not row.get("BatesStart", "").strip():
            prod_defect_lists[idx].append("MISSING-BATESSTART")

    # Check P3: Missing DocDescription
    for idx, row in df_prod.iterrows():
        if not row.get("DocDescription", "").strip():
            prod_defect_lists[idx].append("MISSING-DOCDESCRIPTION")

    # Check P4: ReqNum references valid requests
    valid_reqnums_by_set = {}
    for _, rrow in df_req.iterrows():
        sid = rrow["SetID"]
        if sid not in valid_reqnums_by_set:
            valid_reqnums_by_set[sid] = set()
        valid_reqnums_by_set[sid].add(str(rrow["ReqNum"]))

    for idx, row in df_prod.iterrows():
        sid = row["SetID"]
        req_refs = str(row.get("ReqNum", "")).strip()
        if req_refs and sid in valid_reqnums_by_set:
            for rn in [r.strip() for r in req_refs.split("|")]:
                if rn and rn not in valid_reqnums_by_set.get(sid, set()):
                    prod_defect_lists[idx].append(f"ORPHAN-REQNUM-{rn}")

    # Check P5: Element_ID on enriched Productions
    if "Element_ID" in df_prod.columns:
        for idx, row in df_prod.iterrows():
            eid = row.get("Element_ID", "")
            if eid == "" or eid == "ELEMENT-UNTAGGED":
                prod_defect_lists[idx].append("PROD-UNTAGGED-ELEMENT")

    # Assign Productions Status
    df_prod["AllDefects"] = [" | ".join(d) if d else "" for d in prod_defect_lists]
    df_prod["Status"] = df_prod["AllDefects"].apply(
        lambda x: "NEEDS-REVIEW" if x.strip() else "PACK-READY"
    )

# =============================================
# WRITE BACK
# =============================================
wb = load_workbook(WORK)

# Update Requests sheet
ws = wb["Requests"]
ws.delete_rows(2, ws.max_row)
for c, col in enumerate(df_req.columns, 1):
    ws.cell(1, c, col)
for r in dataframe_to_rows(df_req, index=False, header=False):
    ws.append(list(r))
ws.freeze_panes = "A2"

# Update Productions sheet (if exists)
if has_productions and "Productions" in wb.sheetnames:
    ws = wb["Productions"]
    ws.delete_rows(2, ws.max_row)
    for c, col in enumerate(df_prod.columns, 1):
        ws.cell(1, c, col)
    for r in dataframe_to_rows(df_prod, index=False, header=False):
        ws.append(list(r))
    ws.freeze_panes = "A2"

# Log to Processing_Log
from datetime import datetime
if "Processing_Log" not in wb.sheetnames:
    ws_log = wb.create_sheet("Processing_Log")
    for c, h in enumerate(["Stage","Timestamp","InputFile","Action",
                           "RowsProcessed","SkillVersion","Notes"], 1):
        ws_log.cell(1, c, h)
else:
    ws_log = wb["Processing_Log"]

total_rows = len(df_req) + (len(df_prod) if has_productions else 0)
req_ready = (df_req['Status']=='PACK-READY').sum()
prod_ready = (df_prod['Status']=='PACK-READY').sum() if has_productions else 0
ws_log.append(["VERIFY", datetime.now().isoformat(), INPUT,
               "Structural QA complete", str(total_rows), "DPB-v1.2",
               f"Requests PACK-READY: {req_ready}/{len(df_req)} | "
               f"Productions PACK-READY: {prod_ready}/{len(df_prod) if has_productions else 0}"])
wb.save(WORK)
shutil.copy2(WORK, OUT)

# =============================================
# PRINT SUMMARY
# =============================================
status_vc = df_req["Status"].value_counts()
state_vc = df_req["State"].value_counts() if "State" in df_req.columns else pd.Series()
sev_vc = df_req["DeficiencySeverity"].value_counts() if "DeficiencySeverity" in df_req.columns else pd.Series()
multi_defect = df_req[df_req["AllDefects"].str.contains(r"\|", na=False)]

print("=== DPB VERIFY COMPLETE ===")
print(f"\n--- Requests Status ({len(df_req)} rows) ---")
for s, c in status_vc.items():
    print(f"  {s}: {c} ({round(c/len(df_req)*100,1)}%)")

print(f"\n--- State Distribution ---")
for s, c in state_vc.items():
    print(f"  {s}: {c}")

print(f"\n--- Deficiency Severity ---")
for s, c in sev_vc.items():
    print(f"  {s}: {c}")

print(f"\nMulti-defect rows: {len(multi_defect)}")
for _, row in multi_defect.head(10).iterrows():
    print(f"  {row['SetID']}/{row['ReqNum']}: {row['AllDefects']}")

if has_productions:
    prod_status_vc = df_prod["Status"].value_counts()
    print(f"\n--- Productions Status ({len(df_prod)} rows) ---")
    for s, c in prod_status_vc.items():
        print(f"  {s}: {c} ({round(c/len(df_prod)*100,1)}%)")

    # Element coverage
    if "Element_ID" in df_prod.columns:
        tagged = df_prod[~df_prod["Element_ID"].isin(["", "ELEMENT-UNTAGGED"])]
        print(f"  Element-tagged: {len(tagged)}/{len(df_prod)}")

# MTC readiness
mtc_states = {"OBJECTION-ONLY","EVASIVE","CURE-FAILED","NO-RESPONSE","OBJECTION-WAIVED"}
mtc_eligible = df_req[df_req["State"].isin(mtc_states)]
mtc_ready = mtc_eligible[mtc_eligible["Status"] == "PACK-READY"]
print(f"\nMTC eligible: {len(mtc_eligible)} | MTC PACK-READY: {len(mtc_ready)}")

# GF letter readiness
gf_exclude = {"COMPLETE","WITHDRAWN","RESOLVED","ADMITTED","DENIED"}
gf_eligible = df_req[~df_req["State"].isin(gf_exclude)]
gf_ready = gf_eligible[gf_eligible["Status"] == "PACK-READY"]
print(f"GF eligible: {len(gf_eligible)} | GF PACK-READY: {len(gf_ready)}")

# Witness / depo targets
if "WitnessRefs" in df_req.columns:
    witness_rows = df_req[df_req["WitnessRefs"].str.strip().ne("") & df_req["WitnessRefs"].ne("nan")]
    depo_targets = df_req[df_req["Notes"].str.contains("DEPO-TARGET", na=False)]
    print(f"\nWitnessRefs populated: {len(witness_rows)} rows")
    print(f"Depo targets flagged: {len(depo_targets)} rows")

print(f"\nSaved: {OUT}")
```

### Step 2: CFP Discovery_Defects Export (optional post-step)

After VERIFY, optionally export deficiency rows to CFP-compatible format:

```python
import pandas as pd
from openpyxl import load_workbook

VERIFIED = "REPLACE_WITH_VERIFIED_PATH"  # ← MUST SET
CFP_PATH = "REPLACE_WITH_CFP_PATH"  # ← target CFP workbook

df_req = pd.read_excel(VERIFIED, sheet_name="Requests", dtype=str, keep_default_na=False)

# Filter to deficient rows
deficient = df_req[df_req["DeficiencyFlag"] == "Y"].copy()

# Map to CFP Discovery_Defects schema
export = pd.DataFrame({
    "SetID": deficient["SetID"],
    "ReqNum": deficient["ReqNum"],
    "ReqLabel": deficient["ReqLabel"],
    "DeficiencyType": deficient.get("DeficiencyType", ""),
    "DeficiencySeverity": deficient.get("DeficiencySeverity", ""),
    "CureRequested": deficient.get("CureRequested", ""),
    "State": deficient.get("State", ""),
    "GoodFaithSent": deficient.get("GoodFaithSent", ""),
    "GoodFaithDate": deficient.get("GoodFaithDate", ""),
    "CureDeadline": deficient.get("CureDeadline", ""),
    "Status": deficient.get("Status", ""),
    "Notes": deficient.get("Notes", ""),
})

# Append to CFP as Discovery_Defects tab
wb = load_workbook(CFP_PATH)
if "Discovery_Defects" in wb.sheetnames:
    ws = wb["Discovery_Defects"]
else:
    ws = wb.create_sheet("Discovery_Defects")
    for c, h in enumerate(export.columns, 1):
        ws.cell(1, c, h)

from openpyxl.utils.dataframe import dataframe_to_rows
for r in dataframe_to_rows(export, index=False, header=False):
    ws.append(list(r))

wb.save(CFP_PATH)
print(f"Exported {len(export)} deficiency rows to CFP Discovery_Defects tab")
```

## Status Codes

| Status | Meaning | Action |
|--------|---------|--------|
| `PACK-READY` | Row usable in GF letter / MTC drafting | Safe for Prompt Blocks |
| `NEEDS-LPB` | Objection analysis incomplete | Run Lexis → LPB update |
| `NEEDS-CFP` | Answer cross-reference incomplete | Run CFP EXTRACT on source |
| `STATE-CONFLICT` | State inconsistent with data | Fix state or data |
| `NEEDS-REVIEW` | Ambiguity or data quality issue | Attorney review |
| `INCOMPLETE` | Missing required enrichment | Run ENRICH again |
| `ARCHIVED` | WITHDRAWN or RESOLVED | Excluded from active packets |

## QA Report Format

```markdown
# DPB Verification Report
**File:** [filename]
**Date:** [date]
**Stage:** VERIFY (DPB v1.2)

## Requests Summary
| Status | Count | % |
|--------|-------|---|
| PACK-READY | [N] | [%] |
| NEEDS-LPB | [N] | [%] |
| ... | | |

## State Distribution
| State | Count | % |
|-------|-------|---|

## Deficiency Severity Distribution
| Severity | Count | % |
|----------|-------|---|

## Productions Summary (v1.2)
| Status | Count | % |
|--------|-------|---|
| PACK-READY | [N] | [%] |
| NEEDS-REVIEW | [N] | [%] |

## Productions Element Coverage
- Element-tagged: [N]/[total]
- ELEMENT-UNTAGGED: [N]
- CFP_DocID linked: [N]/[total]

## Multi-Defect Rows
| SetID | ReqNum | AllDefects |
|-------|--------|-----------|

## MTC Readiness Assessment
- Eligible (State ∈ {OBJECTION-ONLY, EVASIVE, CURE-FAILED, NO-RESPONSE}): [N]
- PACK-READY: [N]
- Blocking issues: [list]

## Good Faith Letter Readiness
- Eligible (State ≠ COMPLETE/WITHDRAWN/RESOLVED): [N]
- PACK-READY: [N]

## Deposition Planning (v1.2)
- WitnessRefs populated: [N] rows
- Depo targets flagged: [N]
- Unique witnesses identified: [list]

## Critical Issues (must fix before drafting)
[List]

## Recommendation
[Ready for PB-GF-DISC-01 / Ready for PB-MTC-01 / Fix N issues first]
```
