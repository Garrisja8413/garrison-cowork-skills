# EXTRACT Stage — Reference (PSR v1.0)

Read this file when entering EXTRACT mode.

## Purpose

Parse a filed pleading document into structured rows, preserving every paragraph
verbatim with perfect party attribution. This stage creates the raw data that
ENRICH and VERIFY will refine.

## THE TWO DANGERS AND HOW TO AVOID THEM

**Danger 1: Output token exhaustion.** Pleading paragraphs can be long. You try to
output too many rows and the response gets cut off. Fix: stop at 30 Allegation rows,
25 Response rows, or 15 Affirmative Defense rows per chunk, period.

**Danger 2: Python syntax crash from embedded text.** Pleading text contains nested
quotes, section symbols, statutory references, Latin phrases, and special formatting
that will cause `SyntaxError`. Fix: embed rows in a raw triple-quoted string
(`r"""..."""`) with `~|~` delimiter, then parse with
`pd.read_csv(io.StringIO(...), sep=r"~\|~", engine="python")`.
Every record MUST be on one line — no line breaks inside fields.

## Workflow

### Step 1: Stop-Sign Gate
Check for prohibited inputs. If sealed/protective-order material, refuse with
`OUT OF SCOPE — requires BAA environment`.

### Step 2: Identify the Pleading
Determine from the document:
- **PleadingType**: COMPLAINT, AMENDED-COMPLAINT, ANSWER, AMENDED-ANSWER,
  COUNTERCLAIM, CROSS-CLAIM, REPLY-TO-COUNTERCLAIM, THIRD-PARTY-COMPLAINT
- **FilingParty**: Full name as stated in caption
- **FilingPartyRole**: PLAINTIFF, DEFENDANT, etc.
- **RespondingParty**: (for answers) who they are responding to
- **FilingDate**: From caption or file stamp
- **CourtName**: Full court name from caption
- **CaseNumber**: From caption
- **DocID**: Assign a CFP-compatible DocID

### Step 3: Create Workbook (FIRST CHUNK ONLY)

```python
import openpyxl
from openpyxl.styles import Font, Alignment
from datetime import datetime

wb = openpyxl.Workbook()

# Create all tabs
tabs = [
    'Pleading_Index', 'Allegations', 'Responses',
    'Affirmative_Defenses', 'Claims_Register', 'Processing_Log', 'README'
]
for i, name in enumerate(tabs):
    if i == 0:
        ws = wb.active
        ws.title = name
    else:
        wb.create_sheet(name)

# Set headers for each tab
pleading_index_headers = [
    'PleadingID', 'PleadingType', 'FilingParty', 'FilingPartyRole',
    'RespondingParty', 'FilingDate', 'CourtName', 'CaseNumber',
    'TotalParagraphs', 'TotalCausesOfAction', 'TotalAffirmativeDefenses',
    'DocID', 'SourceFile', 'Notes'
]

allegations_headers = [
    'AllegationID', 'PleadingID', 'ParaNum', 'RowType',
    'AllegingParty', 'VerbatimText', 'CountOrSection',
    'TargetParty', 'Element_ID', 'Notes'
]

responses_headers = [
    'ResponseID', 'PleadingID', 'AllegationID', 'AllegationParaNum',
    'ResponseParaNum', 'RespondingParty', 'ResponseType',
    'VerbatimResponse', 'DenialBasis', 'AdmittedPortion',
    'DeniedPortion', 'ResponseClassification', 'DefectFlag', 'Notes'
]

affirmative_defenses_headers = [
    'DefenseID', 'PleadingID', 'DefenseNum', 'AssertingParty',
    'DefenseType', 'VerbatimText', 'FactualBasis', 'LegalBasis',
    'DefectFlag', 'Element_ID', 'TargetClaims', 'Notes'
]

claims_register_headers = [
    'ClaimID', 'PleadingID', 'ClaimType', 'ClaimLabel',
    'AssertingParty', 'TargetParty', 'LegalBasis', 'VerbatimText',
    'RequiredElements', 'SupportingParagraphs', 'Element_IDs',
    'Status', 'DismissalBasis', 'Notes'
]

processing_log_headers = [
    'Stage', 'Timestamp', 'InputFile', 'Action',
    'RowsProcessed', 'SkillVersion', 'Notes'
]

# Apply headers to each sheet
header_map = {
    'Pleading_Index': pleading_index_headers,
    'Allegations': allegations_headers,
    'Responses': responses_headers,
    'Affirmative_Defenses': affirmative_defenses_headers,
    'Claims_Register': claims_register_headers,
    'Processing_Log': processing_log_headers,
}

bold = Font(bold=True)
for sheet_name, headers in header_map.items():
    ws = wb[sheet_name]
    for col, h in enumerate(headers, 1):
        cell = ws.cell(row=1, column=col, value=h)
        cell.font = bold
    ws.freeze_panes = 'A2'

# README tab
readme = wb['README']
readme['A1'] = 'PSR EXTRACT Output'
readme['A2'] = f'Generated: {datetime.now().isoformat()}'
readme['A3'] = 'Stage: EXTRACT'
readme['A4'] = 'Next step: Run ENRICH on this file to add classification and derived maps.'
readme['A5'] = ''
readme['A6'] = 'IMPORTANT: All text in VerbatimText, VerbatimResponse, FactualBasis,'
readme['A7'] = 'and LegalBasis columns is EXACT verbatim from the source pleading.'
readme['A8'] = 'Do NOT edit these fields. Corrections should be made in the source document.'

wb.save(output_path)
```

### Step 4: Write Pleading_Index Row
One row per pleading document being extracted. Use Pattern A below.

### Step 5: Extract Paragraphs (one chunk at a time)

**For COMPLAINTS / AMENDED COMPLAINTS:**
- Extract each numbered paragraph into the `Allegations` tab
- Set `RowType` based on content:
  - `ALLEGATION` — substantive factual or legal allegation
  - `HEADING` — section heading (e.g., "PARTIES", "COUNT I — NEGLIGENCE")
  - `INCORPORATION` — "Plaintiff incorporates by reference..."
  - `PRAYER` — prayer for relief paragraphs
  - `JURY-DEMAND` — jury demand
- Set `CountOrSection` to identify which cause of action or section
- Extract causes of action into `Claims_Register`

**For ANSWERS / AMENDED ANSWERS:**
- Extract each numbered response into the `Responses` tab
- **CRITICAL: Match each response to the complaint paragraph it addresses.**
  The answer typically says "Defendant admits/denies the allegations in
  Paragraph X." The `AllegationParaNum` must match Paragraph X.
- Classify `ResponseType` based on the EXACT language used:
  - "admits" or "admitted" → `ADMITTED`
  - "denies" or "denied" → `DENIED`
  - "admits in part and denies in part" → `DENIED-IN-PART-ADMITTED-IN-PART`
  - "lacks sufficient knowledge or information" → `INSUFFICIENT-KNOWLEDGE`
  - "to the extent that..." or other qualifying language → `QUALIFIED`
  - No response to a specific paragraph → `NO-RESPONSE`
  - Evasive non-answer → `EVASIVE`
  - "incorporates" prior responses → `INCORPORATION`
- Extract affirmative defenses into `Affirmative_Defenses` tab
- Extract counterclaims into `Claims_Register` tab

### Step 6: Report and Wait for 'continue'

## Data Writing Patterns

### Pattern A: Write Pleading_Index Row

```python
import io
import pandas as pd

raw = r"""PleadingID~|~PleadingType~|~FilingParty~|~FilingPartyRole~|~RespondingParty~|~FilingDate~|~CourtName~|~CaseNumber~|~TotalParagraphs~|~TotalCausesOfAction~|~TotalAffirmativeDefenses~|~DocID~|~SourceFile~|~Notes
[DATA ROW HERE — all on one line, no breaks]"""

df = pd.read_csv(io.StringIO(raw), sep=r"~\|~", engine="python")

ws = wb['Pleading_Index']
for _, row in df.iterrows():
    ws.append(list(row))
```

### Pattern B: Write Allegation Rows (chunk of <= 30)

```python
raw = r"""AllegationID~|~PleadingID~|~ParaNum~|~RowType~|~AllegingParty~|~VerbatimText~|~CountOrSection~|~TargetParty~|~Element_ID~|~Notes
[ROW 1 — all on one line]
[ROW 2 — all on one line]
..."""

df = pd.read_csv(io.StringIO(raw), sep=r"~\|~", engine="python")
assert len(df.columns) == 10, f"Column count mismatch: {len(df.columns)}"

ws = wb['Allegations']
for _, row in df.iterrows():
    ws.append(list(row))
```

### Pattern C: Write Response Rows (chunk of <= 25)

```python
raw = r"""ResponseID~|~PleadingID~|~AllegationID~|~AllegationParaNum~|~ResponseParaNum~|~RespondingParty~|~ResponseType~|~VerbatimResponse~|~DenialBasis~|~AdmittedPortion~|~DeniedPortion~|~ResponseClassification~|~DefectFlag~|~Notes
[ROW 1 — all on one line]
..."""

df = pd.read_csv(io.StringIO(raw), sep=r"~\|~", engine="python")
assert len(df.columns) == 14, f"Column count mismatch: {len(df.columns)}"

ws = wb['Responses']
for _, row in df.iterrows():
    ws.append(list(row))
```

### Pattern D: Write Affirmative Defense Rows (chunk of <= 15)

```python
raw = r"""DefenseID~|~PleadingID~|~DefenseNum~|~AssertingParty~|~DefenseType~|~VerbatimText~|~FactualBasis~|~LegalBasis~|~DefectFlag~|~Element_ID~|~TargetClaims~|~Notes
[ROW 1 — all on one line]
..."""

df = pd.read_csv(io.StringIO(raw), sep=r"~\|~", engine="python")
assert len(df.columns) == 12, f"Column count mismatch: {len(df.columns)}"

ws = wb['Affirmative_Defenses']
for _, row in df.iterrows():
    ws.append(list(row))
```

### Pattern E: Write Claims_Register Rows

```python
raw = r"""ClaimID~|~PleadingID~|~ClaimType~|~ClaimLabel~|~AssertingParty~|~TargetParty~|~LegalBasis~|~VerbatimText~|~RequiredElements~|~SupportingParagraphs~|~Element_IDs~|~Status~|~DismissalBasis~|~Notes
[ROW 1 — all on one line]
..."""

df = pd.read_csv(io.StringIO(raw), sep=r"~\|~", engine="python")
assert len(df.columns) == 14, f"Column count mismatch: {len(df.columns)}"

ws = wb['Claims_Register']
for _, row in df.iterrows():
    ws.append(list(row))
```

## ResponseType Classification Rules

When extracting responses from an answer, classify ONLY based on the exact
language used. DO NOT interpret or infer intent.

| Language Pattern | ResponseType |
|-----------------|-------------|
| "admits" / "admitted" / "Defendant admits" | `ADMITTED` |
| "denies" / "denied" / "Defendant denies" | `DENIED` |
| "admits [X] but denies [Y]" | `DENIED-IN-PART-ADMITTED-IN-PART` |
| "lacks sufficient knowledge or information to form a belief" | `INSUFFICIENT-KNOWLEDGE` |
| "to the extent that..." / "insofar as..." / qualified language | `QUALIFIED` |
| No mention of this paragraph in the answer | `NO-RESPONSE` |
| Response does not address the substance of the allegation | `EVASIVE` |
| "incorporates" / "restates" prior responses | `INCORPORATION` |

**When in doubt, use `QUALIFIED` and add a note.** Never guess at admission vs denial.

## Affirmative Defense Extraction Rules

1. **Number as stated.** If the answer says "FIRST AFFIRMATIVE DEFENSE", use "1".
   If it says "THIRD DEFENSE", use "3".
2. **Verbatim text.** Copy the ENTIRE text of each defense, even if it's boilerplate.
3. **Factual basis.** If the defense includes factual assertions, copy them to
   `FactualBasis`. If the defense states no facts (pure boilerplate), use
   `[NO FACTS STATED — BOILERPLATE]`.
4. **Legal basis.** If the defense cites a statute, rule, or legal theory, copy
   the citation to `LegalBasis`. If no legal basis stated, use
   `[NO LEGAL BASIS STATED]`.
5. **DefenseType is populated in ENRICH**, not EXTRACT. Leave blank in EXTRACT.
6. **"Defendant reserves the right to add defenses"** — extract as a row with
   `DefenseNum=[RESERVATION]` and note it's an improper reservation.
