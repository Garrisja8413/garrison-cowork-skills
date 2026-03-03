# VERIFY Stage — Reference (LPB v1.1)

Read this file when entering VERIFY mode.

## Purpose

QA and completeness-check an enriched Law Pack. Marks each row with a Status
code. Produces a verification report. The primary QA target is the
**three-layer authority requirement**: every usable LAW row must have
Proposition + QuoteOrSummary+Pinpoint + MicroBrief.

## CRITICAL: USE PANDAS FOR ALL CHECKS

Traceability, cross-reference, and completeness checks are data-engineering
tasks. Write a pandas script to perform them programmatically.

The LLM's role in VERIFY is limited to:
1. Writing and running the QA script
2. Semantic review of proposition quality (batched)
3. Producing the human-readable QA report

## Workflow

### Step 1: Run the Structural QA Script

Write and execute ONE script that performs all automated checks:

```python
import pandas as pd
import glob, shutil
from openpyxl import load_workbook
from openpyxl.utils.dataframe import dataframe_to_rows

PACK_NAME = "REPLACE_WITH_ACTUAL_PACK_NAME"    # ← MUST SET
WORK = f"/home/claude/LP-Verified-{PACK_NAME}.xlsx"
OUT  = f"/mnt/user-data/outputs/LP-Verified-{PACK_NAME}.xlsx"

# Find enriched input file
candidates = (
    glob.glob(f"/mnt/user-data/uploads/LP-Enriched-{PACK_NAME}*.xlsx") +
    glob.glob(f"/mnt/user-data/outputs/LP-Enriched-{PACK_NAME}*.xlsx") +
    glob.glob(f"/home/claude/LP-Enriched-{PACK_NAME}*.xlsx")
)
if not candidates:
    raise FileNotFoundError(
        f"No files matching LP-Enriched-{PACK_NAME}*.xlsx found. "
        "Stop and ask the user for the exact filename."
    )
INPUT = candidates[0]
print(f"Input: {INPUT}")

shutil.copy2(INPUT, WORK)

# Load all tabs
df_law = pd.read_excel(WORK, sheet_name="LAW", dtype=str, keep_default_na=False)
df_rules = pd.read_excel(WORK, sheet_name="RULES", dtype=str, keep_default_na=False)
df_src = pd.read_excel(WORK, sheet_name="Source_Docs", dtype=str, keep_default_na=False)

valid_sourceids = set(df_src["SourceID"].tolist())

# =============================================
# LAW CHECKS
# =============================================

# --- Check 1: Three-Layer Completeness ---
# Layer 1: Proposition
no_proposition = df_law["Proposition"].isin(["", "nan"]) | df_law["Proposition"].isna()
# Layer 2: QuoteOrSummary + Pinpoint
no_quote = df_law["QuoteOrSummary"].isin(["", "nan"]) | df_law["QuoteOrSummary"].isna()
no_pinpoint = (
    df_law["Pinpoint"].str.contains("PINPOINT NEEDED", case=False, na=True) |
    df_law["Pinpoint"].isin(["", "nan"]) |
    df_law["Pinpoint"].isna()
)
# Layer 3: MicroBrief (only present after ENRICH)
has_microbrief_col = "MicroBrief" in df_law.columns
if has_microbrief_col:
    no_microbrief = df_law["MicroBrief"].isin(["", "nan"]) | df_law["MicroBrief"].isna()
else:
    no_microbrief = pd.Series(True, index=df_law.index)

# --- Check 2: Orphaned SourceIDs ---
orphan_mask = ~df_law["SourceID"].isin(valid_sourceids) & (df_law["SourceID"] != "")

# --- Check 3: Missing enrichment ---
enrich_check_cols = ["Category", "Subcategory", "Placement", "Tags"]
missing_enrich = []
for col in enrich_check_cols:
    if col in df_law.columns:
        missing = df_law[df_law[col].isin(["", "nan"])]["LawTag"].tolist()
        if missing:
            missing_enrich.append({"Column": col, "Count": len(missing)})

# --- Check 4: Shepard Status ---
shepard_col = "ShepardStatus" if "ShepardStatus" in df_law.columns else None
not_checked = pd.Series(False, index=df_law.index)
negative = pd.Series(False, index=df_law.index)
if shepard_col:
    not_checked = df_law[shepard_col].isin(["Not-Checked", "", "nan"])
    negative = df_law[shepard_col].isin(["Negative", "Do-Not-Cite"])

# --- Check 5: [VERIFY-CITE] flags ---
verify_cite_mask = pd.Series(False, index=df_law.index)
if "Notes" in df_law.columns:
    verify_cite_mask = df_law["Notes"].str.contains(r"VERIFY.CITE", case=False, na=False)

# --- Assign Status + AllDefects ---
# AllDefects captures EVERY issue (pipe-separated). Status is the most severe.
# This prevents masking: a row missing both pinpoint and micro-brief shows both.

defect_lists = [[] for _ in range(len(df_law))]

checks = [
    (verify_cite_mask, "VERIFY-CITE"),
    (negative, "NEGATIVE-TREATMENT"),
    (orphan_mask, "ORPHAN-SOURCEID"),
    (no_proposition, "NEEDS-PROPOSITION"),
    (no_quote & no_pinpoint, "NEEDS-QUOTE-AND-PINPOINT"),
    (no_pinpoint & ~no_quote, "NEEDS-PINPOINT"),
    (no_microbrief & ~no_pinpoint & ~no_quote, "NEEDS-MICROBRIEF"),
]

for mask, defect_name in checks:
    for idx in df_law[mask].index:
        defect_lists[idx].append(defect_name)

df_law["AllDefects"] = [" | ".join(d) if d else "" for d in defect_lists]

# Status = most severe defect (priority: last in checks list = least severe)
SEVERITY_ORDER = [
    "NEEDS-MICROBRIEF",
    "NEEDS-PINPOINT",
    "NEEDS-QUOTE-AND-PINPOINT",
    "NEEDS-PROPOSITION",
    "ORPHAN-SOURCEID",
    "NEGATIVE-TREATMENT",
    "VERIFY-CITE",
]
df_law["Status"] = "PACK-READY"
for defect_name in SEVERITY_ORDER:
    mask = df_law["AllDefects"].str.contains(defect_name, na=False)
    df_law.loc[mask, "Status"] = defect_name

# =============================================
# RULES CHECKS
# =============================================
df_rules["Status"] = "PACK-READY"

# Missing rule text
rules_no_text = df_rules["Text"].isin(["", "nan"]) | df_rules["Text"].isna()
df_rules.loc[rules_no_text, "Status"] = "NEEDS-TEXT"

# Orphaned SourceIDs
rules_orphan = ~df_rules["SourceID"].isin(valid_sourceids) & (df_rules["SourceID"] != "")
df_rules.loc[rules_orphan, "Status"] = "ORPHAN-SOURCEID"

# =============================================
# WRITE BACK
# =============================================
wb = load_workbook(WORK)

# Update LAW sheet
ws = wb["LAW"]
ws.delete_rows(2, ws.max_row)
for c, col in enumerate(df_law.columns, 1):
    ws.cell(1, c, col)
for r in dataframe_to_rows(df_law, index=False, header=False):
    ws.append(list(r))
ws.freeze_panes = "A2"

# Update RULES sheet
ws = wb["RULES"]
ws.delete_rows(2, ws.max_row)
for c, col in enumerate(df_rules.columns, 1):
    ws.cell(1, c, col)
for r in dataframe_to_rows(df_rules, index=False, header=False):
    ws.append(list(r))
ws.freeze_panes = "A2"

wb.save(WORK)
shutil.copy2(WORK, OUT)

# --- Log to Processing_Log ---
from datetime import datetime
if "Processing_Log" not in wb.sheetnames:
    ws_log = wb.create_sheet("Processing_Log")
    for c, h in enumerate(["Stage","Timestamp","InputFile","Action","RowsProcessed","Notes"], 1):
        ws_log.cell(1, c, h)
else:
    ws_log = wb["Processing_Log"]
ws_log.append(["VERIFY", datetime.now().isoformat(), INPUT,
               "Structural QA complete", str(len(df_law) + len(df_rules)),
               f"LAW PACK-READY: {(df_law['Status']=='PACK-READY').sum()}/{len(df_law)}"])
wb.save(WORK)
shutil.copy2(WORK, OUT)

# =============================================
# PRINT SUMMARY
# =============================================
law_status = df_law["Status"].value_counts()
rules_status = df_rules["Status"].value_counts()
total_law = len(df_law)
total_rules = len(df_rules)

# Count multi-defect rows
multi_defect = df_law[df_law["AllDefects"].str.contains(r"\|", na=False)]

print("=== STRUCTURAL VERIFY COMPLETE ===")
print(f"\n--- LAW ({total_law} rows) ---")
for status, count in law_status.items():
    pct = round(count / total_law * 100, 1)
    print(f"  {status}: {count} ({pct}%)")
print(f"  Rows with multiple defects: {len(multi_defect)}")
if len(multi_defect) > 0:
    for _, row in multi_defect.head(10).iterrows():
        print(f"    {row['LawTag']}: {row['AllDefects']}")

print(f"\n--- RULES ({total_rules} rows) ---")
for status, count in rules_status.items():
    pct = round(count / total_rules * 100, 1)
    print(f"  {status}: {count} ({pct}%)")

print(f"\nShepard Not-Checked: {not_checked.sum()}")
print(f"Missing Enrichment:")
for me in missing_enrich:
    print(f"  {me['Column']}: {me['Count']} rows")
print(f"\nSaved: {OUT}")
print(f"\nNOTE: Semantic proposition review requires Step 2 below.")
```

### Step 2: Semantic Proposition Quality Review (LLM task, batched)

The structural script handles missing fields and cross-references. The LLM
handles semantic quality issues that require legal judgment.

**CRITICAL: Print data to console first so it enters the context window.**

**Step 2a: Print PACK-READY LAW rows to console:**
```python
import pandas as pd
WORK = "/home/claude/LP-Verified-REPLACE_WITH_ACTUAL_PACK_NAME.xlsx"
df = pd.read_excel(WORK, sheet_name="LAW", dtype=str, keep_default_na=False)
review = df[df["Status"] == "PACK-READY"].head(30)
print(f"Batch: {len(review)} PACK-READY rows to review")
print(review[["LawTag", "Proposition", "FullCitation", "Pinpoint"]].to_markdown(index=False))
```

**Step 2b: After reading, identify quality issues:**

Check for:
- **Compound propositions** — two legal points in one Proposition → NEEDS-SPLIT
- **Overbroad propositions** — too generic to be useful → NEEDS-NARROWING
- **Dicta not flagged** — proposition is dicta but not marked → flag DICTA
- **Holding vs standard confusion** — proposition mixes holding with standard of review
- **Jurisdiction mismatch** — NM authority cited as FED or vice versa
- **Citation format issues** — incomplete or non-Bluebook citation

```python
import io, shutil
import pandas as pd
from openpyxl import load_workbook
from openpyxl.utils.dataframe import dataframe_to_rows

WORK = "/home/claude/LP-Verified-REPLACE_WITH_ACTUAL_PACK_NAME.xlsx"
OUT  = "/mnt/user-data/outputs/LP-Verified-REPLACE_WITH_ACTUAL_PACK_NAME.xlsx"

quality_csv = r"""LawTag~|~Status~|~QualityNote
LAW-MSJ-005~|~NEEDS-SPLIT~|~Compound: contains both burden standard and evidence-viewing standard
LAW-DISC-003~|~NEEDS-NARROWING~|~Proposition too generic — specify which aspect of discovery scope
"""

SEP = r"~\|~"
df_quality = pd.read_csv(io.StringIO(quality_csv), sep=SEP, engine="python", dtype=str, keep_default_na=False)

df_law = pd.read_excel(WORK, sheet_name="LAW", dtype=str, keep_default_na=False)

if "QualityNote" not in df_law.columns:
    df_law["QualityNote"] = ""

for _, qrow in df_quality.iterrows():
    mask = df_law["LawTag"] == qrow["LawTag"]
    df_law.loc[mask, "Status"] = qrow["Status"]
    # Append to AllDefects (don't overwrite existing structural defects)
    if "AllDefects" in df_law.columns:
        existing = df_law.loc[mask, "AllDefects"].astype(str).str.replace("nan", "")
        new_defect = qrow["Status"]
        df_law.loc[mask, "AllDefects"] = existing.apply(
            lambda x: f"{x} | {new_defect}" if x.strip() else new_defect)
    current = df_law.loc[mask, "QualityNote"].astype(str).str.replace("nan", "")
    df_law.loc[mask, "QualityNote"] = current + " | AI: " + qrow.get("QualityNote", "")

wb = load_workbook(WORK)
ws = wb["LAW"]
ws.delete_rows(2, ws.max_row)
for c, col in enumerate(df_law.columns, 1):
    ws.cell(1, c, col)
for r in dataframe_to_rows(df_law, index=False, header=False):
    ws.append(list(r))

wb.save(WORK)
shutil.copy2(WORK, OUT)
print(f"Semantic review complete. Flagged {len(df_quality)} rows.")
```

**Process in batches of ≤ 30 rows. Save after each. Wait for 'continue'.**

### Step 3: Write QA Report

## QA Report Format

```markdown
# Law Pack Verification Report
**File:** [filename]
**Date:** [date]
**Pack Subject:** [subject]

## LAW Summary
| Status | Count | % |
|--------|-------|---|
| PACK-READY | [N] | [%] |
| NEEDS-PINPOINT | [N] | [%] |
| NEEDS-MICROBRIEF | [N] | [%] |
| NEEDS-SPLIT | [N] | [%] |
| NEEDS-QUOTE-AND-PINPOINT | [N] | [%] |
| VERIFY-CITE | [N] | [%] |
| NEGATIVE-TREATMENT | [N] | [%] |

## RULES Summary
| Status | Count | % |
|--------|-------|---|
| PACK-READY | [N] | [%] |
| NEEDS-TEXT | [N] | [%] |

## Three-Layer Completeness
- Proposition present: [N]/[total]
- QuoteOrSummary present: [N]/[total]
- Pinpoint present: [N]/[total]
- MicroBrief present: [N]/[total]
- **Fully three-layer complete: [N]/[total] ([%])**

## Multi-Defect Rows
- Rows with 2+ issues: [N]
- [List LawTag + AllDefects for each]

## Shepard Status
- Good: [N]
- Not-Checked: [N] ← **ACTION: Run Lexis Shepardize on these**
- Questioned: [N]
- Negative / Do-Not-Cite: [N] ← **ACTION: Remove or replace**

## Critical Issues (must fix before citing)
[List]

## Warnings
[List]

## Recommendation
[Ready for drafting / Fix [N] issues first / Run Shepardize on [N] authorities]
```

## Status Codes

| Status | Meaning | Action |
|--------|---------|--------|
| `PACK-READY` | All three layers present, no issues | Safe for Prompt Blocks |
| `NEEDS-PINPOINT` | Has quote but no pinpoint | Get pinpoint from Lexis |
| `NEEDS-MICROBRIEF` | Has proposition+quote but no MicroBrief | Add during ENRICH or manually |
| `NEEDS-QUOTE-AND-PINPOINT` | Proposition only — no supporting quote | Verify in Lexis, pull quote |
| `NEEDS-PROPOSITION` | Missing proposition text | Should not happen — data entry error |
| `NEEDS-SPLIT` | Compound proposition | Decompose into atomic propositions |
| `NEEDS-NARROWING` | Too generic to be useful | Refine the proposition |
| `VERIFY-CITE` | Flagged for citation verification | Confirm in Lexis |
| `NEGATIVE-TREATMENT` | Shepard shows negative treatment | Replace or remove |
| `ORPHAN-SOURCEID` | SourceID not in Source_Docs | Fix Source_Docs or SourceID |
| `NEEDS-TEXT` | RULES row missing rule text | Pull from rule source |
