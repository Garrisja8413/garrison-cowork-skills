# COMBINE Stage — Reference (DPB v1.2)

Read this file when entering COMBINE mode.

## Purpose

Merge multiple DPB Extract files into one consolidated workbook. Essential when
a case has ROGs + RFPs + RFAs from the same or multiple parties.
v1.2 adds Productions tab merging with ProdID collision detection.

## CRITICAL: ALL DATA OPERATIONS VIA PANDAS

Write and execute a pandas script. Your text response should contain ONLY
the summary report.

## Workflow

### Step 1: Inventory (text response)
List input files and their contents. Announce the plan.

### Step 2: Execute Merge Script

```python
import pandas as pd
import glob, os, shutil
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill
from openpyxl.utils.dataframe import dataframe_to_rows
from datetime import datetime

# --- Config ---
PACK_NAME = "REPLACE_WITH_CASE_NAME"  # ← MUST SET
INPUT_FILES = (
    glob.glob("/mnt/user-data/uploads/DPB-Extract-*.xlsx") +
    glob.glob("/mnt/user-data/outputs/DPB-Extract-*.xlsx") +
    glob.glob("/home/claude/DPB-Extract-*.xlsx")
)
if not INPUT_FILES:
    raise FileNotFoundError("No DPB-Extract-*.xlsx files found.")

# Deduplicate by basename
seen = set()
unique_files = []
for f in INPUT_FILES:
    base = os.path.basename(f)
    if base not in seen:
        seen.add(base)
        unique_files.append(f)
INPUT_FILES = unique_files

WORK = f"/home/claude/DPB-Combined-{PACK_NAME}.xlsx"
OUT  = f"/mnt/user-data/outputs/DPB-Combined-{PACK_NAME}.xlsx"

print(f"Found {len(INPUT_FILES)} input files:")
for f in INPUT_FILES:
    print(f"  {f}")

# --- Load all tabs ---
all_tabs = {}
for filepath in INPUT_FILES:
    fname = os.path.basename(filepath)
    xl = pd.ExcelFile(filepath)
    for sheet in xl.sheet_names:
        if sheet == "README":
            continue
        df = xl.parse(sheet, dtype=str, keep_default_na=False)
        df["_source_file"] = fname
        if sheet not in all_tabs:
            all_tabs[sheet] = []
        all_tabs[sheet].append(df)

merged = {}

# Set_Metadata: concat, flag duplicate SetIDs
if "Set_Metadata" in all_tabs:
    sm = pd.concat(all_tabs["Set_Metadata"], ignore_index=True)
    dupes = sm.duplicated(subset=["SetID"], keep="first")
    if dupes.any():
        print(f"WARNING: {dupes.sum()} duplicate SetID(s) found — keeping first")
    sm = sm.drop_duplicates(subset=["SetID"], keep="first")
    sm = sm.drop(columns=["_source_file"], errors="ignore")
    merged["Set_Metadata"] = sm

# Requests: concat (SetID+ReqNum is the composite key)
if "Requests" in all_tabs:
    req = pd.concat(all_tabs["Requests"], ignore_index=True)
    before = len(req)
    req = req.drop_duplicates(subset=["SetID", "ReqNum"], keep="first")
    removed = before - len(req)
    req = req.drop(columns=["_source_file"], errors="ignore")
    merged["Requests"] = req
    print(f"Requests: {before} → {len(req)} (removed {removed} duplicates)")

# Productions: concat (ProdID is the PK)
prod_collisions = []
if "Productions" in all_tabs:
    prod = pd.concat(all_tabs["Productions"], ignore_index=True)
    before_prod = len(prod)
    # Check for ProdID collisions across files
    prod_dupes = prod[prod.duplicated(subset=["ProdID"], keep=False)]
    if len(prod_dupes) > 0:
        for pid in prod_dupes["ProdID"].unique():
            sources = prod_dupes[prod_dupes["ProdID"] == pid]["_source_file"].unique()
            if len(sources) > 1:
                prod_collisions.append({"ProdID": pid, "Sources": list(sources)})
    prod = prod.drop_duplicates(subset=["ProdID"], keep="first")
    removed_prod = before_prod - len(prod)
    prod = prod.drop(columns=["_source_file"], errors="ignore")
    merged["Productions"] = prod
    print(f"Productions: {before_prod} → {len(prod)} (removed {removed_prod} duplicates)")

# Other tabs: concat
for tab in all_tabs:
    if tab not in merged:
        df = pd.concat(all_tabs[tab], ignore_index=True)
        df = df.drop(columns=["_source_file"], errors="ignore")
        merged[tab] = df

# Cross-reference validation
valid_setids = set()
if "Set_Metadata" in merged:
    valid_setids = set(merged["Set_Metadata"]["SetID"].tolist())

orphans = []
for tab in ["Requests", "Productions"]:
    if tab in merged and "SetID" in merged[tab].columns:
        tab_setids = set(merged[tab]["SetID"].tolist())
        for oid in (tab_setids - valid_setids - {""}):
            orphans.append({"Tab": tab, "OrphanSetID": oid})

# ProdID → SetID cross-reference
prod_orphan_setids = []
if "Productions" in merged:
    prod_setids = set(merged["Productions"]["SetID"].tolist())
    prod_orphan_setids = list(prod_setids - valid_setids - {""})

# Processing_Log
log_rows = [{"Stage": "COMBINE", "Timestamp": datetime.now().isoformat(),
             "InputFile": ", ".join([os.path.basename(f) for f in INPUT_FILES]),
             "Action": "Merged input files",
             "RowsProcessed": str(sum(len(df) for df in merged.values())),
             "SkillVersion": "DPB-v1.2", "Notes": ""}]
merged["Processing_Log"] = pd.DataFrame(log_rows)

# --- Write output ---
wb = Workbook()
hf = Font(bold=True, size=11)
hfill = PatternFill("solid", fgColor="D9E1F2")

ws = wb.active
ws.title = "README"
ws["A1"] = "DISCOVERY PACK COMBINED"
ws["A2"] = f"Case: {PACK_NAME}"
ws["A3"] = f"Source files: {len(INPUT_FILES)}"
ws["A4"] = "Stage: COMBINE — ready for ENRICH"
ws["A5"] = "Schema version: DPB-v1.2"

tab_order = ["Set_Metadata", "Requests", "Productions", "Processing_Log"]
for t in merged:
    if t not in tab_order:
        tab_order.append(t)

for tab_name in tab_order:
    if tab_name not in merged:
        continue
    df = merged[tab_name]
    ws = wb.create_sheet(tab_name)
    for c, col in enumerate(df.columns, 1):
        cell = ws.cell(1, c, col)
        cell.font = hf
        cell.fill = hfill
    for r in dataframe_to_rows(df, index=False, header=False):
        ws.append(list(r))
    ws.freeze_panes = "A2"

wb.save(WORK)
shutil.copy2(WORK, OUT)

# Summary
print(f"\n=== COMBINE COMPLETE ===")
for t in tab_order:
    if t in merged:
        print(f"  {t}: {len(merged[t])} rows")
print(f"Orphaned SetIDs: {[o['OrphanSetID'] for o in orphans]}")
print(f"ProdID collisions across files: {len(prod_collisions)}")
for c in prod_collisions:
    print(f"  {c['ProdID']}: {c['Sources']}")
print(f"Saved: {OUT}")
```

### Step 3: Report

```
**COMBINE complete.**
- Input files: [list]
- Set_Metadata: [N] sets
- Requests: [N] rows (deduplicated from [M])
- Productions: [N] rows (deduplicated from [M])
- Orphaned SetIDs: [count]
- ProdID collisions: [count]
- Saved: DPB-Combined-[name].xlsx

Next: Reply 'enrich' to run ENRICH stage.
```

## Deduplication Rules

1. **Set_Metadata:** Same SetID = duplicate → keep first
2. **Requests:** Same SetID + same ReqNum = duplicate → keep first
3. **Productions:** Same ProdID = duplicate → keep first; flag cross-file collisions
4. **When in doubt:** Keep both, let VERIFY flag conflicts
