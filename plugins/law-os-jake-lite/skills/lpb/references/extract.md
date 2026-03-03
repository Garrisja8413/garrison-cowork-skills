# EXTRACT Stage — Reference (LPB v1.1)

Read this file when entering EXTRACT mode.

## Purpose

Extract ALL legal authorities, rule text, propositions, quotes, and pinpoints
from uploaded source documents (briefs, motions, opinions, letters, Lexis
research output). Exhaustive extraction — but done in small, reliable chunks
that never exhaust output tokens.

## THE TWO DANGERS AND HOW TO AVOID THEM

**Danger 1: Output token exhaustion.** You try to output too many rows and
the response gets cut off. Fix: stop at 15 LAW rows and 10 RULES rows, period.

**Danger 2: Python syntax crash from embedded text.** Legal text has quotes,
section symbols (§), em-dashes (—), apostrophes, brackets, and unicode. If you
hardcode these into Python list literals, it WILL crash. Fix: embed rows in a
raw triple-quoted string (`r"""..."""`) with `~|~` delimiter, then parse with
`pd.read_csv(io.StringIO(...), sep=r"~\|~", engine="python")`.
Every record MUST be on one line — no line breaks inside fields.

## What to Extract

### From Briefs / Motions:
- Every case citation with its proposition and any quoted language
- Every rule/statute cited, with the text excerpt if provided
- Standards of review stated
- Elements tests recited
- Key holdings relied upon

### From Court Opinions:
- The holding(s) — one row per distinct legal point
- Standards applied
- Rules interpreted
- Key quotes with pinpoints
- Dicta worth preserving (flag as dicta)

### From Letters / Correspondence:
- Legal standards cited
- Rule provisions quoted
- Authorities referenced (often without pinpoints — flag accordingly)

### From Lexis Research Output:
- Each authority with full citation
- Quotes with pinpoints
- Shepard status if visible
- Headnotes/key numbers (as proposition candidates)

## Workflow

### Step 1: Stop-Sign Gate
Refuse prohibited inputs (sealed opinions, privileged strategy memos).

### Step 2: Assess Size and Plan
Estimate total authorities. Plan chunks. Announce:
"This document cites ~[N] authorities. I'll extract in ~[M] chunks of ≤15 LAW
rows each, plus RULES rows as encountered."

### Step 3: Create Workbook (FIRST CHUNK ONLY)
Run the workbook creation script (see code below).

### Step 4: Extract One Chunk
Read the next section of the document. Extract:
- RULES rows (≤ 10 per chunk) — actual rule/statute text
- LAW rows (≤ 15 per chunk) — propositions + quotes + pinpoints
- Source_Docs row (once per source document)

**ROW COUNT IS THE GOVERNOR.** If you hit 15 LAW rows before finishing a
section, STOP. Note where you stopped. Save. Ask for 'continue'.

### Step 5: Write to CSV, Append to Excel
Use the raw-string + io.StringIO pattern.

### Step 6: Report and Wait
Output chunk summary. Wait for 'continue'.

## Schemas (core columns — EXTRACT stage keeps it lean)

### Source_Docs (one row per input document — like File_Metadata in CFP)
| Column | Notes |
|--------|-------|
| SourceID | Unique ID for this source document (e.g., `SRC-MSJ-BRIEF-001`) |
| Title | Document title |
| Type | brief, motion, opinion, letter, lexis-output, research-memo, order, statute-text, rule-text, other |
| Court | Court of origin (if applicable) |
| Date | Date of document |
| Notes | |

### RULES (rule text — lean extract columns)
| Column | Notes |
|--------|-------|
| RuleID | Unique per rule provision (e.g., `FRCP-56-a`, `NMRA-1-037-A`, `NMSA-41-4-16-A`) |
| RuleName | Short name (e.g., "Summary Judgment Standard") |
| Jurisdiction | `NM` or `FED (D.N.M.)` or `FED-10th-Cir` or `FED-SCOTUS` |
| Source | `Rule` / `Statute` / `Local-Rule` / `Constitutional` |
| Text | Authoritative text excerpt. Keep to the key operative language. |
| Link | URL if available |
| SourceID | Which source document this was extracted from |
| Notes | |

### LAW (propositions — lean extract columns)
| Column | Notes |
|--------|-------|
| LawTag | Unique ID (e.g., `LAW-MSJ-001`, `LAW-DISC-COMPEL-003`) |
| AuthorityType | `Case` / `Statute` / `Rule-Proposition` / `Regulation` / `Other` |
| FullCitation | Bluebook-style citation as stated in source |
| Court | Issuing court |
| Year | Decision year |
| Jurisdiction | `NM` / `FED (D.N.M.)` / `FED-10th-Cir` / `FED-SCOTUS` |
| Proposition | Affirmative statement of law (one legal point per row) |
| QuoteOrSummary | Verbatim quote or short summary from the authority |
| Pinpoint | Page/paragraph pinpoint for the quote. `PINPOINT NEEDED` if absent. |
| SourceID | Which source document this was extracted from |
| Notes | Flag `DICTA` / `UNPUBLISHED` / `[VERIFY-CITE]` here |

## Code Patterns

### Pattern 1: Create the workbook (first chunk only)

```python
import os, shutil
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill

PACK_NAME = "REPLACE_WITH_PACK_NAME"  # ← MUST SET (e.g., "MSJ-Standards", "Discovery-Compel")
WORK = f"/home/claude/LP-Extract-{PACK_NAME}.xlsx"
OUT  = f"/mnt/user-data/outputs/LP-Extract-{PACK_NAME}.xlsx"

wb = Workbook()
hf = Font(bold=True, size=11)
hfill = PatternFill("solid", fgColor="D9E1F2")

# README
ws = wb.active
ws.title = "README"
ws["A1"] = "LAW PACK EXTRACT"
ws["A2"] = f"Pack: {PACK_NAME}"
ws["A3"] = "Stage: EXTRACT — core columns only"
ws["A4"] = "Next step: Run ENRICH on this file"
ws["A5"] = "Chunks completed: 0"
ws["A6"] = "Schema version: LPB-v1.1"

# Data tabs
tabs = {
    "Source_Docs": ["SourceID","Title","Type","Court","Date","Notes"],
    "RULES":       ["RuleID","RuleName","Jurisdiction","Source","Text","Link","SourceID","Notes"],
    "LAW":         ["LawTag","AuthorityType","FullCitation","Court","Year","Jurisdiction",
                    "Proposition","QuoteOrSummary","Pinpoint","SourceID","Notes"],
    "Processing_Log": ["Stage","Timestamp","InputFile","Action","RowsProcessed","Notes"],
}
for name, headers in tabs.items():
    ws = wb.create_sheet(name)
    for c, h in enumerate(headers, 1):
        cell = ws.cell(1, c, h)
        cell.font = hf
        cell.fill = hfill
    ws.freeze_panes = "A2"

# Initial Processing_Log entry
from datetime import datetime
ws = wb["Processing_Log"]
ws.append(["EXTRACT", datetime.now().isoformat(), "N/A", f"Workbook created for {PACK_NAME}", "0", ""])

wb.save(WORK)
shutil.copy2(WORK, OUT)
print(f"Created: {WORK}")
```

### Pattern 2: Write chunk data via raw string + io.StringIO (EVERY chunk)

```python
import io, shutil
import pandas as pd
from openpyxl import load_workbook
from openpyxl.utils.dataframe import dataframe_to_rows

PACK_NAME = "REPLACE_WITH_PACK_NAME"  # ← MUST SET
WORK = f"/home/claude/LP-Extract-{PACK_NAME}.xlsx"
OUT  = f"/mnt/user-data/outputs/LP-Extract-{PACK_NAME}.xlsx"
CHUNK = 1  # ← MUST INCREMENT per chunk

# --- AI INSTRUCTIONS (CRITICAL) ---
# 1. Output extracted data inside raw triple-quoted strings using ~|~ delimiter.
# 2. DO NOT write Python list arrays.
# 3. EVERY record MUST be on a single line. NO line breaks inside fields.
# 4. Replace newlines in extracted text (esp. quotes) with a space.

rules_csv = r"""RuleID~|~RuleName~|~Jurisdiction~|~Source~|~Text~|~Link~|~SourceID~|~Notes
FRCP-56-a~|~Summary Judgment Standard~|~FED (D.N.M.)~|~Rule~|~A party may move for summary judgment, identifying each claim or defense — or the part of each claim or defense — on which summary judgment is sought. The court shall grant summary judgment if the movant shows that there is no genuine dispute as to any material fact and the movant is entitled to judgment as a matter of law.~|~~|~SRC-001~|~
"""

law_csv = r"""LawTag~|~AuthorityType~|~FullCitation~|~Court~|~Year~|~Jurisdiction~|~Proposition~|~QuoteOrSummary~|~Pinpoint~|~SourceID~|~Notes
LAW-MSJ-001~|~Case~|~Celotex Corp. v. Catrett, 477 U.S. 317 (1986)~|~SCOTUS~|~1986~|~FED-SCOTUS~|~The moving party bears the initial burden of showing the absence of a genuine issue of material fact.~|~"[T]he plain language of Rule 56(c) mandates the entry of summary judgment ... against a party who fails to make a showing sufficient to establish the existence of an element essential to that party's case, and on which that party will bear the burden of proof at trial."~|~477 U.S. at 322~|~SRC-001~|~
LAW-MSJ-002~|~Case~|~Anderson v. Liberty Lobby, Inc., 477 U.S. 242 (1986)~|~SCOTUS~|~1986~|~FED-SCOTUS~|~At summary judgment, the court views evidence in the light most favorable to the nonmoving party.~|~"The evidence of the non-movant is to be believed, and all justifiable inferences are to be drawn in his favor."~|~477 U.S. at 255~|~SRC-001~|~
"""

# --- Parse raw strings into DataFrames ---
SEP = r"~\|~"
df_rules = pd.read_csv(io.StringIO(rules_csv), sep=SEP, engine="python", dtype=str, keep_default_na=False)
df_law = pd.read_csv(io.StringIO(law_csv), sep=SEP, engine="python", dtype=str, keep_default_na=False)

# --- VALIDATE COLUMN COUNTS (catches newline-in-field errors) ---
assert len(df_rules.columns) == 8, f"RULES parse error: got {len(df_rules.columns)} cols, expected 8"
assert len(df_law.columns) == 11, f"LAW parse error: got {len(df_law.columns)} cols, expected 11"

# --- Append to existing Excel ---
wb = load_workbook(WORK)

for sheet_name, df in [("RULES", df_rules), ("LAW", df_law)]:
    if len(df) > 0:
        ws = wb[sheet_name]
        for r in dataframe_to_rows(df, index=False, header=False):
            ws.append(list(r))

# Update README chunk count
wb["README"]["A5"] = f"Chunks completed: {CHUNK}"

# Log to Processing_Log
from datetime import datetime
ws_log = wb["Processing_Log"]
ws_log.append(["EXTRACT", datetime.now().isoformat(), PACK_NAME,
               f"Chunk {CHUNK}: {len(df_rules)} RULES + {len(df_law)} LAW rows appended",
               str(len(df_rules) + len(df_law)), ""])

wb.save(WORK)
shutil.copy2(WORK, OUT)

# Report
for tab in ["RULES", "LAW"]:
    print(f"{tab}: {wb[tab].max_row - 1} rows")
```

### CRITICAL RULES FOR THIS PATTERN

1. **ALWAYS use `r"""..."""` (raw triple-quote) for data strings.** Never Python lists.
2. **Use `~|~` as delimiter** — legal text contains literal pipes in tables and citations.
3. **NO line breaks inside fields.** Every record on one line. Replace newlines with space.
4. **ALWAYS `load_workbook(WORK)`** after chunk 1. Using `Workbook()` overwrites everything.
5. **REPLACE all fill-in values** before running.
6. **VALIDATE column counts after every parse:**
```python
EXPECTED_LAW_COLS = 11  # LawTag through Notes
EXPECTED_RULES_COLS = 8  # RuleID through Notes
assert len(df_law.columns) == EXPECTED_LAW_COLS, \
    f"LAW column mismatch: got {len(df_law.columns)}, expected {EXPECTED_LAW_COLS}. " \
    "A newline likely slipped into a field. Check raw string for line breaks."
assert len(df_rules.columns) == EXPECTED_RULES_COLS, \
    f"RULES column mismatch: got {len(df_rules.columns)}, expected {EXPECTED_RULES_COLS}."
```

## LawTag Naming (globally unique — prevents PK collision in COMBINE)

Pattern: `{SourceID}-{type}-{seq:03d}`

- From brief SRC-MSJ-BRIEF: `SRC-MSJ-BRIEF-LAW-001`, `SRC-MSJ-BRIEF-LAW-002`
- From opinion SRC-ANDERSON-OP: `SRC-ANDERSON-OP-LAW-001`
- Rules: Use the actual rule ID (e.g., `FRCP-56-a`, `NMRA-1-037-A`)

## Extraction Guidance by Source Type

### Briefs / Motions
- Extract EVERY authority cited — do not skip "minor" citations
- For string-cite chains, give each authority its own row
- The brief's characterization of the holding becomes the Proposition
- Quoted language becomes QuoteOrSummary
- If the brief gives a pinpoint, capture it; if not, `PINPOINT NEEDED`
- Note which section of the brief uses the authority (this feeds Placement in ENRICH)

### Court Opinions
- Each distinct holding = one LAW row
- Standards of review = separate LAW rows
- Element tests = one row per element (not the whole test in one row)
- Dicta worth capturing = LAW row with `DICTA` in Notes
- Statutory interpretation = LAW row + corresponding RULES row

### Lexis Research Output
- Each case result = at minimum one LAW row per key proposition
- Capture Shepard status in Notes if visible (feeds ENRICH)
- Headnote language can be a Proposition candidate — flag `FROM-HEADNOTE` in Notes

### Letters / Correspondence
- Legal standards cited (often without full quotes) = LAW rows with `PINPOINT NEEDED`
- Rule provisions referenced = RULES rows if text is quoted; otherwise just note the rule ID

## Chunk Completion Template

```
**Chunk [N] of ~[M] complete.**
- RULES: [X] new ([Y] total)
- LAW: [X] new ([Y] total)
- PINPOINT NEEDED: [count]
- [VERIFY-CITE]: [count]
- Stopped at: [section/page where you stopped]
- Saved: LP-Extract-[name].xlsx

Reply 'continue' for chunk [N+1].
```

After FINAL chunk:
```
**EXTRACT complete for [filename].**
Total: [R] RULES, [L] LAW rows.
PINPOINT NEEDED: [count] | [VERIFY-CITE]: [count]
Three-layer complete (Proposition+Quote+Pinpoint): [count]/[total]

Next: Reply 'enrich', 'next file', or 'combine'.
```
