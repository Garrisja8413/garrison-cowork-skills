# COMBINE Stage — Reference (LPB v1.1)

Read this file when entering COMBINE mode.

## Purpose

Merge multiple partial Law Pack Excel files into one consolidated master
Law Pack. This is essential when authorities were extracted from multiple
source documents (e.g., plaintiff's brief + defendant's brief + the opinion).

## CRITICAL: ALL DATA OPERATIONS VIA PANDAS

You MUST NOT attempt to merge or deduplicate by reasoning about it in text.
Write and execute pandas scripts. Your text response should contain ONLY
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

# --- Config ---
PACK_PREFIX = "REPLACE_WITH_PACK_PREFIX"  # ← MUST SET (e.g., "MSJ", "DISC-COMPEL")
INPUT_FILES = (
    glob.glob(f"/mnt/user-data/uploads/LP-Extract-{PACK_PREFIX}*.xlsx") +
    glob.glob(f"/mnt/user-data/outputs/LP-Extract-{PACK_PREFIX}*.xlsx") +
    glob.glob(f"/home/claude/LP-Extract-{PACK_PREFIX}*.xlsx")
)
if not INPUT_FILES:
    raise FileNotFoundError(
        f"No files matching LP-Extract-{PACK_PREFIX}*.xlsx found. "
        "Stop and ask the user for the exact filenames."
    )

# Deduplicate by basename
seen = set()
unique_files = []
for f in INPUT_FILES:
    base = os.path.basename(f)
    if base not in seen:
        seen.add(base)
        unique_files.append(f)
INPUT_FILES = unique_files

PACK_NAME = "REPLACE_WITH_ACTUAL_PACK_NAME"  # ← MUST SET
WORK = f"/home/claude/LP-Combined-{PACK_NAME}.xlsx"
OUT  = f"/mnt/user-data/outputs/LP-Combined-{PACK_NAME}.xlsx"

print(f"Found {len(INPUT_FILES)} input files:")
for f in INPUT_FILES:
    print(f"  {f}")

# --- Load all tabs from all files ---
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

# --- Merge each tab ---
merged = {}

# Source_Docs: concat, flag duplicate SourceIDs
if "Source_Docs" in all_tabs:
    sd = pd.concat(all_tabs["Source_Docs"], ignore_index=True)
    sd = sd.drop_duplicates(subset=["SourceID"], keep="first")
    sd = sd.drop(columns=["_source_file"], errors="ignore")
    merged["Source_Docs"] = sd

# RULES: concat, dedup by RuleID (same rule from multiple sources → keep first)
if "RULES" in all_tabs:
    r = pd.concat(all_tabs["RULES"], ignore_index=True)
    r_before = len(r)
    r = r.drop_duplicates(subset=["RuleID"], keep="first")
    r = r.drop(columns=["_source_file"], errors="ignore")
    merged["RULES"] = r
    r_removed = r_before - len(r)
    print(f"RULES: {r_before} → {len(r)} (removed {r_removed} duplicates)")

# LAW: concat, renumber with M- prefix, dedup by citation+proposition+pinpoint
ref_map = {}
collisions = []
if "LAW" in all_tabs:
    law = pd.concat(all_tabs["LAW"], ignore_index=True)
    law["OrigLawTag"] = law["LawTag"]

    # Dedup: same FullCitation + same Proposition + same Pinpoint = duplicate
    # (same case + same proposition but DIFFERENT pinpoint = different excerpt → keep both)
    law["_dedup_key"] = (
        law["FullCitation"].str.strip().str.lower() + "|" +
        law["Proposition"].str.strip().str.lower() + "|" +
        law["Pinpoint"].str.strip().str.lower()
    )
    exact_dupes = law.duplicated(subset=["_dedup_key"], keep="first")
    law_before = len(law)
    law = law[~exact_dupes].copy()
    law_removed = exact_dupes.sum()
    law = law.drop(columns=["_dedup_key", "_source_file"], errors="ignore")

    # Renumber
    law["LawTag"] = [f"M-LAW-{i+1:03d}" for i in range(len(law))]

    # COLLISION GUARD: detect when two different OrigLawTags map to same new LawTag
    # (should not happen with sequential numbering, but guard against logic errors)
    new_tags_seen = {}
    for old_tag, new_tag in zip(law["OrigLawTag"], law["LawTag"]):
        if new_tag in new_tags_seen and new_tags_seen[new_tag] != old_tag:
            collisions.append({"NewTag": new_tag, "OldTag1": new_tags_seen[new_tag], "OldTag2": old_tag})
        new_tags_seen[new_tag] = old_tag
        ref_map[old_tag] = new_tag

    if collisions:
        print(f"WARNING: {len(collisions)} LawTag collision(s) detected!")
        for c in collisions:
            print(f"  {c['NewTag']}: {c['OldTag1']} vs {c['OldTag2']}")

    merged["LAW"] = law
    print(f"LAW: {law_before} → {len(law)} (removed {law_removed} duplicates)")

# Other tabs: concat and cascade references
for tab in all_tabs:
    if tab not in merged:
        df = pd.concat(all_tabs[tab], ignore_index=True)
        df = df.drop(columns=["_source_file"], errors="ignore")
        merged[tab] = df

# --- CASCADE: Update LawTag cross-references ---
def update_law_refs(old_refs):
    if not str(old_refs).strip() or str(old_refs) == "nan" or old_refs == "":
        return ""
    return ", ".join([ref_map.get(r.strip(), r.strip()) for r in str(old_refs).split(",")])

xref_columns = ["LawTags", "LawTag_Refs"]
for tab_name, df in merged.items():
    for col in xref_columns:
        if col in df.columns:
            df[col] = df[col].apply(update_law_refs)
            print(f"  Cascaded {col} in {tab_name}")

# --- Cross-reference validation ---
valid_sourceids = set()
if "Source_Docs" in merged:
    valid_sourceids = set(merged["Source_Docs"]["SourceID"].tolist())

orphans = []
for tab in ["LAW", "RULES"]:
    if tab in merged and "SourceID" in merged[tab].columns:
        tab_sourceids = set(merged[tab]["SourceID"].tolist())
        tab_orphans = tab_sourceids - valid_sourceids - {""}
        for oid in tab_orphans:
            orphans.append({"Tab": tab, "OrphanSourceID": oid})

# --- Merge_Log tab ---
log_rows = [{"Action": "Merged", "SourceFile": os.path.basename(f), "Notes": "All tabs"}
            for f in INPUT_FILES]
merged["Merge_Log"] = pd.DataFrame(log_rows)

# --- Processing_Log tab ---
from datetime import datetime
processing_rows = [{
    "Stage": "COMBINE",
    "Timestamp": datetime.now().isoformat(),
    "InputFile": ", ".join([os.path.basename(f) for f in INPUT_FILES]),
    "Action": "Merged input files",
    "RowsProcessed": str(sum(len(df) for df in merged.values())),
    "Notes": f"Collisions: {len(collisions)}" if collisions else ""
}]
merged["Processing_Log"] = pd.DataFrame(processing_rows)

# --- Write output ---
wb = Workbook()
hf = Font(bold=True, size=11)
hfill = PatternFill("solid", fgColor="D9E1F2")

ws = wb.active
ws.title = "README"
ws["A1"] = "LAW PACK COMBINED"
ws["A2"] = f"Pack: {PACK_NAME}"
ws["A3"] = f"Source files: {len(INPUT_FILES)}"
ws["A4"] = "Stage: COMBINE — ready for ENRICH"
ws["A5"] = "Schema version: LPB-v1.1"

tab_order = ["Source_Docs", "RULES", "LAW", "Merge_Log", "Processing_Log"]
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

# --- Summary ---
print("\n=== COMBINE COMPLETE ===")
for tab_name in tab_order:
    if tab_name in merged:
        print(f"{tab_name}: {len(merged[tab_name])} rows")
print(f"Orphaned SourceIDs: {len(orphans)}")
for o in orphans:
    print(f"  {o['Tab']}: {o['OrphanSourceID']}")
print(f"LawTag collisions: {len(collisions)}")
for c in collisions:
    print(f"  {c['NewTag']}: {c['OldTag1']} vs {c['OldTag2']}")
print(f"Saved: {OUT}")
```

### Step 3: Report Summary

```
**COMBINE complete.**
- Input files: [list]
- RULES: [N] (deduplicated from [M])
- LAW: [N] (deduplicated from [M])
- Orphaned SourceIDs: [count + details]
- Saved: LP-Combined-[name].xlsx

Next: Reply 'enrich' to run ENRICH stage.
```

## Deduplication Rules

1. **RULES:** Same RuleID = duplicate → keep first (rule text is the same regardless of source)
2. **LAW:** Same FullCitation + same Proposition + same Pinpoint (case-insensitive) = duplicate → keep first
3. **LAW:** Same case + same proposition but DIFFERENT pinpoint = different excerpt → keep both
4. **LAW:** Same case, different propositions = NOT duplicates → keep both
4. **LAW:** Same proposition from different cases = NOT duplicates → keep both (different authorities supporting the same point)
5. **Source_Docs:** Same SourceID = duplicate → keep first

## Conflict Handling

- Two authorities that state conflicting propositions → keep BOTH, add `TENSION` in Notes
- Same authority cited differently in two sources → keep the version with better pinpoint
- When in doubt, keep both and let VERIFY flag it
