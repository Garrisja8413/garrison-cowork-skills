# ENRICH Stage — Reference (DPB v1.2)

Read this file when entering ENRICH mode.

## Purpose

Add authority-linked objection analysis, CFP fact cross-references, Element_ID
for PCM compatibility, deficiency classification, severity scoring,
state-machine values, WitnessRefs for deposition planning, and ProdIDs for
Productions cross-reference. Also enrich Productions rows with Element_ID,
Significance, CFP_DocID, and CompletionFlag. This is where the DPB becomes
actionable for drafting.

## CRITICAL: Output Discipline

**Process ≤ 15 Requests rows per response.** After enriching a batch:
1. Write enrichment data to a raw-string CSV
2. Use pandas to merge the new columns into the existing Excel file
3. Save. Wait for 'continue'.

**Process ≤ 20 Productions rows per response** (lighter per-row work).

## Inputs

| File | Required? | Purpose |
|------|-----------|---------|
| DPB Extract/Combined .xlsx | **Yes** | Base DPB |
| CFP .xlsx (any stage) | Recommended | Cross-ref answers → CFP Fact# |
| LPB .xlsx (any stage) | Recommended | Link objections → LPB LawTag |

If CFP/LPB not provided, those columns = `NO CFP PROVIDED` / `NO LPB PROVIDED`.

## Workflow

### Step 1: Load All Files via Pandas

```python
import pandas as pd

DPB_PATH = "REPLACE_WITH_DPB_PATH"  # ← MUST SET
df_req = pd.read_excel(DPB_PATH, sheet_name="Requests", dtype=str, keep_default_na=False)
print(f"Total Requests rows to enrich: {len(df_req)}")
print(f"Batches needed: {(len(df_req) // 15) + 1}")

# Productions tab
try:
    df_prod = pd.read_excel(DPB_PATH, sheet_name="Productions", dtype=str, keep_default_na=False)
    print(f"Total Productions rows to enrich: {len(df_prod)}")
except:
    df_prod = pd.DataFrame()
    print("No Productions tab found — skipping productions enrichment")

# Optional: load CFP and LPB
# df_facts = pd.read_excel(CFP_PATH, sheet_name="Facts", dtype=str, keep_default_na=False)
# df_law = pd.read_excel(LPB_PATH, sheet_name="LAW", dtype=str, keep_default_na=False)
```

### Step 2: Enrich One Batch of Requests (≤ 15 rows)

For each row, determine:
- **ObjType** — Pipe-delimited objection type codes (from taxonomy below)
- **ObjBasis_LPB** — LPB tags supporting/defeating each objection
- **AnswerCFP_FactRefs** — CFP Fact# references found in answer
- **Element_ID** — PCM element(s) this request relates to (pipe-delimited)
- **DeficiencyType** — From controlled vocabulary below
- **DeficiencySeverity** — Critical / Major / Minor / None
- **CureRequested** — What the responding party should do
- **State** — State-machine value (decision tree below)
- **GoodFaithSent** — Y / N / N/A
- **GoodFaithDate** — If GF letter sent
- **CureDeadline** — If cure deadline set
- **WitnessRefs** — Pipe-delimited witness names identified in answer text
- **ProdIDs** — Pipe-delimited FK → Productions.ProdID for cross-reference

### Step 3: Write Requests Batch via CSV + Pandas Merge

```python
import io, shutil
import pandas as pd
from openpyxl import load_workbook
from openpyxl.utils.dataframe import dataframe_to_rows

PACK_NAME = "REPLACE_WITH_PACK_NAME"    # ← MUST SET
WORK = f"/home/claude/DPB-Enriched-{PACK_NAME}.xlsx"
OUT  = f"/mnt/user-data/outputs/DPB-Enriched-{PACK_NAME}.xlsx"

enrich_csv = r"""SetID~|~ReqNum~|~ObjType~|~ObjBasis_LPB~|~AnswerCFP_FactRefs~|~Element_ID~|~DeficiencyType~|~DeficiencySeverity~|~CureRequested~|~State~|~GoodFaithSent~|~GoodFaithDate~|~CureDeadline~|~WitnessRefs~|~ProdIDs
DEF-RFP-001~|~1~|~OVERBROAD | RELEVANCE~|~RELEVANCE: LPB-DISC-003 (defeats) | OVERBROAD: LPB-DISC-007 (defeats)~|~NO CFP PROVIDED~|~BREACH-001 | DUTY-001~|~INCOMPLETE-ANSWER~|~Major~|~Withdraw overbroad objection and produce all maintenance records 2024-present~|~PARTIAL~|~N~|~~|~~|~~|~PROD-DEF-RFP-001-001 | PROD-DEF-RFP-001-002
DEF-RFP-001~|~6~|~OVERBROAD~|~OVERBROAD: LPB-DISC-007 (defeats — proportionality favors production)~|~NO CFP PROVIDED~|~BREACH-001~|~OBJECTION-NO-ANSWER~|~Critical~|~Produce all bookkeeping and accounting records for subject premises~|~OBJECTION-ONLY~|~N~|~~|~~|~~|~
"""

SEP = r"~\|~"
df_enrich = pd.read_csv(io.StringIO(enrich_csv), sep=SEP, engine="python",
                        dtype=str, keep_default_na=False)

EXPECTED_ENRICH_COLS = 15
assert len(df_enrich.columns) == EXPECTED_ENRICH_COLS, \
    f"Enrich parse error: got {len(df_enrich.columns)} cols, expected {EXPECTED_ENRICH_COLS}."

# Load existing workbook
df_req = pd.read_excel(WORK, sheet_name="Requests", dtype=str, keep_default_na=False)

enrichment_cols = ["ObjType","ObjBasis_LPB","AnswerCFP_FactRefs","Element_ID",
                   "DeficiencyType","DeficiencySeverity","CureRequested",
                   "State","GoodFaithSent","GoodFaithDate","CureDeadline",
                   "WitnessRefs","ProdIDs"]

for col in enrichment_cols:
    if col not in df_req.columns:
        df_req[col] = ""

# Merge by SetID + ReqNum composite key
for _, erow in df_enrich.iterrows():
    mask = (df_req["SetID"] == erow["SetID"]) & (df_req["ReqNum"] == erow["ReqNum"])
    for col in enrichment_cols:
        df_req.loc[mask, col] = erow[col]

# Write back
wb = load_workbook(WORK)
ws = wb["Requests"]
ws.delete_rows(2, ws.max_row)
for c, col in enumerate(df_req.columns, 1):
    ws.cell(1, c, col)
for r in dataframe_to_rows(df_req, index=False, header=False):
    ws.append(list(r))

from datetime import datetime
if "Processing_Log" not in wb.sheetnames:
    ws_log = wb.create_sheet("Processing_Log")
    for c, h in enumerate(["Stage","Timestamp","InputFile","Action","RowsProcessed","SkillVersion","Notes"], 1):
        ws_log.cell(1, c, h)
else:
    ws_log = wb["Processing_Log"]
ws_log.append(["ENRICH", datetime.now().isoformat(), PACK_NAME,
               f"Enriched Requests batch: {len(df_enrich)} rows", str(len(df_enrich)), "DPB-v1.2", ""])

wb.save(WORK)
shutil.copy2(WORK, OUT)
print(f"Enriched. Total with State assigned: {len(df_req[df_req.get('State','') != ''])}/{len(df_req)}")
```

### Step 4: Enrich Productions Batch (≤ 20 rows, after all Requests batches)

For each Productions row, determine:
- **CFP_DocID** — FK → CFP File_Metadata.DocID (if CFP available)
- **Significance** — Attorney analysis of relevance (from notes or assessment)
- **Element_ID** — PCM element(s) this document supports (pipe-delimited)
- **CompletionFlag** — `Complete` / `Partial` / `Redacted` / `Responsive-Questioned`

```python
import io, shutil
import pandas as pd
from openpyxl import load_workbook
from openpyxl.utils.dataframe import dataframe_to_rows

PACK_NAME = "REPLACE_WITH_PACK_NAME"  # ← MUST SET
WORK = f"/home/claude/DPB-Enriched-{PACK_NAME}.xlsx"
OUT  = f"/mnt/user-data/outputs/DPB-Enriched-{PACK_NAME}.xlsx"

prod_enrich_csv = r"""ProdID~|~CFP_DocID~|~Significance~|~Element_ID~|~CompletionFlag
PROD-DEF-RFP-001-001~|~DOC-MGMT-AGR-001~|~Management agreement shows T&C contractual duty to maintain premises~|~DUTY-001~|~Complete
PROD-DEF-RFP-001-002~|~DOC-MGMT-AGR-002~|~Second management agreement with Kesani; shows ownership transfer~|~DUTY-001~|~Complete
"""

SEP = r"~\|~"
df_pe = pd.read_csv(io.StringIO(prod_enrich_csv), sep=SEP, engine="python",
                    dtype=str, keep_default_na=False)

EXPECTED_PE_COLS = 5
assert len(df_pe.columns) == EXPECTED_PE_COLS, \
    f"Productions enrich parse error: got {len(df_pe.columns)} cols, expected {EXPECTED_PE_COLS}."

df_prod = pd.read_excel(WORK, sheet_name="Productions", dtype=str, keep_default_na=False)

prod_enrich_cols = ["CFP_DocID", "Significance", "Element_ID", "CompletionFlag"]
for col in prod_enrich_cols:
    if col not in df_prod.columns:
        df_prod[col] = ""

for _, erow in df_pe.iterrows():
    mask = df_prod["ProdID"] == erow["ProdID"]
    for col in prod_enrich_cols:
        df_prod.loc[mask, col] = erow[col]

wb = load_workbook(WORK)
ws = wb["Productions"]
ws.delete_rows(2, ws.max_row)
for c, col in enumerate(df_prod.columns, 1):
    ws.cell(1, c, col)
for r in dataframe_to_rows(df_prod, index=False, header=False):
    ws.append(list(r))

ws_log = wb["Processing_Log"]
ws_log.append(["ENRICH", datetime.now().isoformat(), PACK_NAME,
               f"Enriched Productions batch: {len(df_pe)} rows", str(len(df_pe)), "DPB-v1.2", ""])
wb.save(WORK)
shutil.copy2(WORK, OUT)
print(f"Productions enriched: {len(df_prod[df_prod.get('Element_ID','') != ''])}/{len(df_prod)}")
```

## Columns Added to Requests Tab (ENRICH)

| Column | Type | Notes |
|--------|------|-------|
| ObjType | Text | Pipe-delimited objection type codes |
| ObjBasis_LPB | Text | Pipe-delimited objection analysis with LPB tags |
| AnswerCFP_FactRefs | Text | Comma-separated CFP Fact# references |
| Element_ID | Text | Pipe-delimited PCM Element_IDs |
| DeficiencyType | Text | From controlled vocabulary |
| DeficiencySeverity | Text | `Critical` / `Major` / `Minor` / `None` |
| CureRequested | Text | What the cure should be |
| State | Text | State-machine value |
| GoodFaithSent | Text | `Y` / `N` / `N/A` |
| GoodFaithDate | Date | YYYY-MM-DD if GF letter sent |
| CureDeadline | Date | YYYY-MM-DD if deadline set |
| WitnessRefs | Text | Pipe-delimited witness names identified in answers |
| ProdIDs | Text | Pipe-delimited FK → Productions.ProdID |

## Columns Added to Productions Tab (ENRICH)

| Column | Type | Notes |
|--------|------|-------|
| CFP_DocID | Text | FK → CFP File_Metadata.DocID |
| Significance | Text | Attorney analysis of relevance |
| Element_ID | Text | Pipe-delimited PCM element(s) this document supports |
| CompletionFlag | Text | `Complete` / `Partial` / `Redacted` / `Responsive-Questioned` |

## Element_ID Assignment (PCM Integration)

Each request may relate to one or more legal elements the requested information
would prove or disprove. This connects DPB to the Proof of Claims Matrix:

| Discovery relates to... | Element_ID |
|------------------------|------------|
| Maintenance, inspection, safety protocols | `DUTY-001` |
| Prior incidents, complaints, knowledge of hazard | `BREACH-001` |
| Medical records, treatment, injuries | `INJURY-001` |
| Lost wages, bills, financial impact | `DAMAGES-ECON-001` |
| Causation evidence (video, expert data) | `CAUSE-ACTUAL-001` |
| General background / procedural | `ELEMENT-UNTAGGED` |

Use pipe-delimited if a request touches multiple elements.
If uncertain, use `ELEMENT-UNTAGGED` — VERIFY will flag it.

## WitnessRefs (Deposition Planning Integration)

When ROG answers identify witnesses by name, capture them in WitnessRefs:
- Format: `Name1 (role) | Name2 (role)` — pipe-delimited
- Example: `Blanca Bedolla (Leasing Consultant) | Christal Castillo (Leasing Supervisor)`
- Also add `DEPO-TARGET: [Name] re [topic]` in Notes when the answer suggests
  a witness should be deposed on a specific topic
- These flow into SA Depositions planning (see KB 03 Section K)

## ProdIDs Cross-Reference

Link each request to the Productions rows that respond to it:
- Format: pipe-delimited ProdIDs, e.g. `PROD-DEF-RFP-001-001 | PROD-DEF-RFP-001-002`
- Build by matching: for each request, find Productions rows where
  Productions.ReqNum contains this request's ReqNum
- If no productions exist for a request, leave blank

## State Assignment Decision Tree

```
Has response been served?
├── NO → State = NO-RESPONSE
└── YES
    ├── Objection only, no substantive answer?
    │   ├── Objection timely and facially valid? → OBJECTION-ONLY
    │   └── Objection untimely or format-defective? → OBJECTION-WAIVED
    ├── Answer provided?
    │   ├── Answer fully responsive? → COMPLETE
    │   ├── Answer partially responsive? → PARTIAL
    │   └── Answer evasive / non-responsive / refers-elsewhere? → EVASIVE
    ├── Documents produced?
    │   ├── Production appears complete? → PRODUCED
    │   └── Production has gaps? → PRODUCED-INCOMPLETE
    └── Previously sent good faith letter?
        ├── Cure deadline not yet passed → CURE-PENDING
        └── Cure deadline passed without adequate cure → CURE-FAILED
```

## Objection Taxonomy (controlled)

| ObjType Code | Meaning | FRCP Basis | NMRA Basis |
|-------------|---------|------------|------------|
| `RELEVANCE` | Not relevant | FRCP 26(b)(1) | NMRA 1-026(B) |
| `OVERBROAD` | Overbroad in scope | FRCP 26(b)(1) | NMRA 1-026(B) |
| `UNDULY-BURDEN` | Undue burden/expense | FRCP 26(b)(1), 26(c) | NMRA 1-026(B), 1-026(C) |
| `VAGUE` | Vague or ambiguous | General practice | General practice |
| `PRIVILEGE` | Atty-client / work product | FRCP 26(b)(3), (b)(5) | NMRA 1-026(B)(2), (B)(6) |
| `PRIV-NOLOG` | Privilege claimed, no log | FRCP 26(b)(5)(A) | NMRA 1-026(B)(6) |
| `COMPOUND` | Compound / multiple subparts | FRCP 33(a)(1) | NMRA 1-033(A) |
| `DUPLICATIVE` | Duplicative of other discovery | FRCP 26(b)(2)(C) | NMRA 1-026(B)(1) |
| `PROPORTIONALITY` | Proportionality objection | FRCP 26(b)(1) factors | NMRA 1-026(B) |
| `NOT-POSSESS` | Not in possession/custody/control | FRCP 34(a) | NMRA 1-034(A) |
| `FORM-OBJ` | Form of production objection | FRCP 34(b)(2)(E) | NMRA 1-034(B) |
| `BEST-EVIDENCE` | Original required | FRE 1002 | NMRE 11-1002 |
| `PREMATURE` | Discovery premature / not ripe | Scheduling order | Scheduling order |
| `HARASS` | Harassment / bad faith | FRCP 26(c) | NMRA 1-026(C) |
| `TRADE-SECRET` | Trade secret / confidential | FRCP 26(c)(1)(G) | NMRA 1-026(C) |
| `THIRD-PARTY` | Third-party privacy | FRCP 26(c) | NMRA 1-026(C) |
| `EXPERT` | Expert/consulting protection | FRCP 26(b)(4) | NMRA 1-026(B)(5) |
| `BOILERPLATE` | General/boilerplate (no specific basis) | Often waived | Often waived |
| `OTHER` | Other — specify in Notes | | |

## Deficiency Type (controlled vocabulary)

| DeficiencyType | Meaning |
|----------------|---------|
| `NO-RESPONSE` | No response served |
| `OBJECTION-NO-ANSWER` | Objection stated but no substantive answer |
| `INCOMPLETE-ANSWER` | Answer omits requested information |
| `EVASIVE-ANSWER` | Non-responsive to the question asked |
| `NO-BATES` | Production referenced but no Bates stamps |
| `INCOMPLETE-PRODUCTION` | Some docs produced, others withheld |
| `NO-PRIV-LOG` | Privilege claimed but no log |
| `BOILERPLATE-OBJ` | Boilerplate objection without specific basis |
| `WAIVED-OBJ` | Objection likely waived |
| `REFERS-ELSEWHERE` | Improperly refers to "other documents" |
| `NARRATIVE-DUMP` | Unfocused narrative burying info |
| `FORMAT-DEFECT` | Wrong production format |
| `UNVERIFIED` | ROG answers not verified under oath |
| `RFA-NO-BASIS` | RFA denial without basis as required |
| `NONE` | No deficiency |

## Batch Completion Template

```
**ENRICH batch [N] of ~[M] complete.**
- Requests enriched: [X] (rows [A] through [B])
- WitnessRefs populated: [count]
- ProdIDs linked: [count]
- Saved: DPB-Enriched-[name].xlsx

Reply 'continue' for next batch.
```

After all Requests batches:
```
**Requests ENRICH complete. Now enriching Productions.**
- Total Requests enriched: [N]
- State distribution: [summary]
- WitnessRefs populated: [N]/[total]
- Depo targets flagged: [count]
```

After Productions enrichment:
```
**ENRICH complete.**
- Requests enriched: [N] | Productions enriched: [P]
- State distribution: [summary]
- Severity: Critical=[N], Major=[N], Minor=[N], None=[N]
- LPB-linked: [N]/[total] | CFP-linked: [N]/[total]
- Element_ID assigned (Requests): [N]/[total]
- Element_ID assigned (Productions): [N]/[total]
- WitnessRefs populated: [N] | Depo targets: [count]

Next: Reply 'verify' to run VERIFY stage.
```
