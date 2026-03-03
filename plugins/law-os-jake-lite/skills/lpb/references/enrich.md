# ENRICH Stage — Reference (LPB v1.1)

Read this file when entering ENRICH mode.

## Purpose

Add taxonomy (Category/Subcategory/Subject), Placement, MicroBrief, Tags,
and Shepard status fields to existing extracted rows. This is a SEMANTIC task —
the LLM reads each proposition and makes classification judgments. It does NOT
extract new authorities.

## CRITICAL: Output Discipline

**Process ≤ 20 rows per response.** After enriching a batch:
1. Write enrichment data to a raw-string CSV
2. Use pandas to merge the new columns into the existing Excel file
3. Save. Wait for 'continue'.

## Workflow

### Step 1: Load Input Excel via Pandas
```python
import pandas as pd
df_law = pd.read_excel("input.xlsx", sheet_name="LAW", dtype=str, keep_default_na=False)
print(f"Total LAW rows to enrich: {len(df_law)}")
print(f"Batches needed: {(len(df_law) // 20) + 1}")

df_rules = pd.read_excel("input.xlsx", sheet_name="RULES", dtype=str, keep_default_na=False)
print(f"Total RULES rows to enrich: {len(df_rules)}")
```

### Step 2: Enrich One Batch (≤ 20 LAW rows)
For each LAW row, determine:
- **Category** — top-level (Procedure / Evidence / Claims / Theories-Doctrines)
- **Subcategory** — second-level (e.g., Discovery, Pleadings, Summary Judgment)
- **Subject** — specific topic (e.g., "Motion to Compel Standard", "Burden Shifting at MSJ")
- **MicroBrief** — 2–6 sentences: how/when the authority applies, practical usage notes
- **Placement** — which motion type + section this feeds (e.g., "MSJ > Standard", "MTC > Legal Standard", "Evidence > Hearsay")
- **Tags** — multi-tag string for cross-referencing (e.g., "msj, burden, movant, initial-burden")
- **ShepardStatus** — `Good` / `Questioned` / `Negative` / `Do-Not-Cite` / `Not-Checked`
- **NegativeTreatmentNotes** — details if Questioned/Negative
- **PackReady** — `Yes` if all three layers present; `No` if any missing

### Step 3: Write Batch via CSV + Pandas Merge

```python
import io, shutil
import pandas as pd
from openpyxl import load_workbook
from openpyxl.utils.dataframe import dataframe_to_rows

PACK_NAME = "REPLACE_WITH_ACTUAL_PACK_NAME"    # ← MUST SET
WORK = f"/home/claude/LP-Enriched-{PACK_NAME}.xlsx"
OUT  = f"/mnt/user-data/outputs/LP-Enriched-{PACK_NAME}.xlsx"

# --- AI INSTRUCTION ---
# Output enrichment data inside a raw triple-quoted string using ~|~ delimiter.
# DO NOT write Python list arrays. NO line breaks inside fields.

enrich_csv = r"""LawTag~|~Category~|~Subcategory~|~Subject~|~MicroBrief~|~Placement~|~Tags~|~ShepardStatus~|~NegativeTreatmentNotes~|~PackReady
LAW-MSJ-001~|~Procedure~|~Summary Judgment~|~MSJ Burden — Moving Party~|~Celotex establishes the initial burden framework for summary judgment. The moving party must show the absence of a genuine issue. When the nonmovant bears the burden of proof at trial, the movant can satisfy this by pointing to an absence of evidence. Use this as the foundational standard in every MSJ brief.~|~MSJ > Standard~|~msj, burden, movant, initial-burden, celotex~|~Good~|~~|~Yes
LAW-MSJ-002~|~Procedure~|~Summary Judgment~|~MSJ Viewing Standard — Light Most Favorable~|~Anderson establishes the lens through which courts evaluate MSJ evidence. All inferences favor the nonmovant. This is universally cited and should appear in the standard-of-review section of every MSJ brief, both for movant and nonmovant.~|~MSJ > Standard~|~msj, evidence-standard, nonmovant, light-most-favorable~|~Good~|~~|~Yes
"""

SEP = r"~\|~"
df_enrich = pd.read_csv(io.StringIO(enrich_csv), sep=SEP, engine="python", dtype=str, keep_default_na=False)

# --- VALIDATE COLUMN COUNTS ---
EXPECTED_ENRICH_COLS = 10  # LawTag through PackReady
assert len(df_enrich.columns) == EXPECTED_ENRICH_COLS, \
    f"Enrich parse error: got {len(df_enrich.columns)} cols, expected {EXPECTED_ENRICH_COLS}. " \
    "Check for newline inside a field."

# Load existing workbook data
df_law = pd.read_excel(WORK, sheet_name="LAW", dtype=str, keep_default_na=False)

enrichment_cols = ["Category","Subcategory","Subject","MicroBrief","Placement",
                   "Tags","ShepardStatus","NegativeTreatmentNotes","PackReady"]

# Add columns if they don't exist yet
for col in enrichment_cols:
    if col not in df_law.columns:
        df_law[col] = ""

# Merge enrichment into existing rows by LawTag
for _, erow in df_enrich.iterrows():
    mask = df_law["LawTag"] == erow["LawTag"]
    for col in enrichment_cols:
        df_law.loc[mask, col] = erow[col]

# Write back to Excel
wb = load_workbook(WORK)
ws = wb["LAW"]
ws.delete_rows(2, ws.max_row)

for c, col in enumerate(df_law.columns, 1):
    ws.cell(1, c, col)

for r in dataframe_to_rows(df_law, index=False, header=False):
    ws.append(list(r))

wb.save(WORK)
shutil.copy2(WORK, OUT)

# Log to Processing_Log
from datetime import datetime
if "Processing_Log" not in wb.sheetnames:
    ws_log = wb.create_sheet("Processing_Log")
    for c, h in enumerate(["Stage","Timestamp","InputFile","Action","RowsProcessed","Notes"], 1):
        ws_log.cell(1, c, h)
else:
    ws_log = wb["Processing_Log"]
ws_log.append(["ENRICH", datetime.now().isoformat(), PACK_NAME,
               f"Enriched batch: {len(df_enrich)} rows", str(len(df_enrich)), ""])
wb.save(WORK)
shutil.copy2(WORK, OUT)

print(f"Enriched batch. Total enriched: {len(df_law[df_law['Category'] != ''])}/{len(df_law)}")
```

### Step 4: After All LAW Batches
- Enrich RULES rows with Category/Subcategory/Subject/Tags (pandas script)
- Add EffectiveDate and VerifiedOn/VerifiedBy fill-in fields to RULES
- Create Standards_of_Review tab if MSJ/dispositive standards found
- Create Elements_by_Claim tab if element tests found

## Columns Added to LAW

| Column | Type | Notes |
|--------|------|-------|
| Category | Controlled | See taxonomy below |
| Subcategory | Controlled | See taxonomy below |
| Subject | Free text | Specific topic label |
| MicroBrief | Free text | 2–6 sentences: how/when to use this authority |
| Placement | Controlled | `{MotionType} > {Section}` — tells drafter where it goes |
| Tags | Multi-tag | Comma-separated, lowercase, for cross-reference |
| ShepardStatus | Controlled | `Good` / `Questioned` / `Negative` / `Do-Not-Cite` / `Not-Checked` |
| NegativeTreatmentNotes | Free text | Details of any negative treatment |
| PackReady | Boolean | `Yes` if Proposition + QuoteOrSummary+Pinpoint + MicroBrief all present |

## Columns Added to RULES

| Column | Type | Notes |
|--------|------|-------|
| Category | Controlled | Same taxonomy |
| Subcategory | Controlled | Same taxonomy |
| Subject | Free text | Specific provision topic |
| Tags | Multi-tag | Cross-reference tags |
| EffectiveDate | Date | If known |
| VerifiedOn | Date | Fill-in field for attorney verification |
| VerifiedBy | Text | Fill-in field for attorney name |

## Category Taxonomy (Controlled Vocabulary)

### Category (top-level)
| Value | What belongs |
|-------|-------------|
| `Procedure` | Civil procedure, appellate procedure, motion practice |
| `Evidence` | Rules of evidence, admissibility, foundations, hearsay |
| `Claims` | Common law and statutory claims (negligence, products, civil rights) |
| `Theories-Doctrines` | Affirmative defenses, vicarious liability, res judicata, etc. |

### Subcategory (second-level — non-exhaustive, add as needed)
| Category | Subcategories |
|----------|--------------|
| Procedure | Discovery, Pleadings, Summary-Judgment, Motions-General, Service, Jurisdiction, Venue, Sanctions, Appellate, Pretrial, Trial |
| Evidence | Relevance, Hearsay, Expert-Testimony, Authentication, Best-Evidence, Privilege, Foundations |
| Claims | Negligence, Products-Liability, Medical-Malpractice, Civil-Rights-1983, Premises-Liability, Wrongful-Death, Contract, Fraud, UPA-NMSA |
| Theories-Doctrines | Affirmative-Defenses, Vicarious-Liability, Joint-Liability, Comparative-Fault, Res-Judicata, Collateral-Estoppel, Equitable-Tolling, Qualified-Immunity, Governmental-Immunity |

### Placement Values (where it goes in a draft)
Format: `{MotionType} > {Section}`

Common patterns:
- `MSJ > Standard` — summary judgment standard of review section
- `MSJ > Burden-Shifting` — burden allocation section
- `MSJ > Element-[Name]` — specific element argument
- `MTC > Legal-Standard` — motion to compel legal standard
- `MTC > Sanctions` — sanctions standard
- `MTS > Legal-Standard` — motion to strike standard
- `Discovery > Scope` — discovery scope/relevance
- `Discovery > Proportionality` — proportionality factors
- `Evidence > Hearsay` — hearsay exception argument
- `Evidence > Foundation` — authentication/foundation
- `Pleading > Sufficiency` — pleading sufficiency standard
- `Jurisdiction > Personal` — personal jurisdiction
- `Jurisdiction > Subject-Matter` — subject matter jurisdiction
- `General > Standard-of-Review` — reusable across motion types
- `General > Discretion` — abuse of discretion standard

## Optional Tabs Created During ENRICH

### Standards_of_Review (if MSJ or dispositive content found)
| Column | Notes |
|--------|-------|
| StandardID | `STD-###` |
| StandardName | e.g., "Summary Judgment — Fed" |
| Jurisdiction | NM / FED |
| StandardText | The standard as formulated |
| KeyAuthority | Primary citation |
| Pinpoint | |
| LawTags | Comma-separated LawTag references |
| Placement | |
| Notes | |

### Elements_by_Claim (if element tests found)
| Column | Notes |
|--------|-------|
| ClaimID | `CLM-###` |
| Claim | e.g., "Negligence — NM" |
| ElementNumber | 1, 2, 3... |
| ElementText | The element |
| KeyAuthority | Citation establishing element |
| Pinpoint | |
| LawTags | Related LawTag references |
| Jurisdiction | |
| Notes | |

## Batch Completion Template

```
**ENRICH batch [N] of ~[M] complete.**
- LAW rows enriched: [X] (rows [A] through [B])
- Saved: LP-Enriched-[name].xlsx

Reply 'continue' for next batch.
```

After all batches:
```
**ENRICH complete.**
- LAW enriched: [L], RULES enriched: [R]
- Standards_of_Review created: [count]
- Elements_by_Claim created: [count]
- Category distribution: [summary]
- PackReady = Yes: [count] | PackReady = No: [count] (need Pinpoint/MicroBrief)
- ShepardStatus = Not-Checked: [count] (need Lexis verification)

Next: Reply 'verify' to run VERIFY stage.
```
