# EXTRACT Stage — Reference (DPB v1.2)

Read this file when entering EXTRACT mode.

## Purpose

Parse ALL requests from an uploaded discovery request/response set into individual
rows. Exhaustive — every request gets a row, even boilerplate objections.
v1.2 also extracts per-document production records into the Productions tab and
captures SA-aligned metadata fields.

## THE TWO DANGERS AND HOW TO AVOID THEM

**Danger 1: Output token exhaustion.** You try to output too many rows and
the response gets cut off. Fix: stop at 20 Requests rows or 25 Productions rows
per chunk, period.

**Danger 2: Python syntax crash from embedded text.** Discovery responses contain
nested quotes, section symbols (§), em-dashes, apostrophes. Fix: embed rows in a
raw triple-quoted string (`r"""..."""`) with `~|~` delimiter, then parse with
`pd.read_csv(io.StringIO(...), sep=r"~\|~", engine="python")`.
Every record MUST be on one line — no line breaks inside fields.

## Workflow

### Step 1: Stop-Sign Gate
Check for prohibited inputs. If sealed/protective-order material, refuse.

### Step 2: Identify the Set
Determine: SetType, Direction (Outgoing/Incoming), Jurisdiction (NM or FED),
ServingParty, RespondingParty, ServedDate, ResponseDate, ResponseDueDate,
ServiceMethod, VerifiedBy + VerificationDate (ROG only).

### Step 3: Create Workbook (FIRST CHUNK ONLY)
Run Pattern 1 below.

### Step 4: Write Set_Metadata Row
Run Pattern 3 below (once per set).

### Step 5: Extract One Chunk (≤ 20 Requests rows)
Parse the next section. Write via Pattern 2.

### Step 6: Extract Productions (if RFP responses with Bates)
If the response set references Bates-numbered documents, extract per-document
or per-range rows into the Productions tab. Run Pattern 4.

### Step 7: Report and Wait for 'continue'.

## Schemas

### Set_Metadata (SA-aligned — 24 columns)
| Column | Required | Notes |
|--------|----------|-------|
| SetID | Yes | Format: `[PARTY]-[TYPE]-[SET#]` e.g. `DEF-RFP-001` |
| Title | Yes | Descriptive title |
| SetType | Yes | `ROG` / `RFP` / `RFA` / `RFP-SUBP` / `ROG-SUBP` |
| Direction | Yes | `Outgoing` (we served) / `Incoming` (served on us) |
| Jurisdiction | Yes | `NM` or `FED (D.N.M.)` |
| ServingParty | Yes | Who served the requests |
| RespondingParty | Yes | Who responded |
| DemandOrOrder | If known | `Demand` or `Order` (SA radio button) |
| ServiceMethod | If known | `E-mail` / `Personal` / `Mail` / `Other` |
| ServedDate | If known | YYYY-MM-DD |
| ResponseDate | If known | YYYY-MM-DD |
| ResponseDueDate | If known | YYYY-MM-DD (SA "Date To Comply" / "Due Date") |
| DocID_Requests | Yes | CFP File_Metadata DocID |
| DocID_Responses | Yes | CFP DocID. `NOT YET SERVED` if pending. |
| TotalRequests | Yes | Count of individual requests |
| VerifiedBy | If known | Name (ROG only — who verified under oath) |
| VerificationDate | If known | YYYY-MM-DD (ROG only) |
| DiscToClient | If known | YYYY-MM-DD — date discovery sent to client |
| ClientConfDate | If known | YYYY-MM-DD — client conference date |
| RecvdFromClient | If known | YYYY-MM-DD — date client returned responses |
| SA_SetStatus | If known | `Complied` / `Superseded` / `Waived` / `Open` |
| SA_Comments | Optional | Notes from SA Respondent record |
| Description | Optional | SA Description field |
| Notes | Optional | |

### Requests (core — one row per request, 10 columns)
| Column | Required | Notes |
|--------|----------|-------|
| SetID | Yes | Match Set_Metadata.SetID |
| ReqNum | Yes | As numbered (e.g., "1", "GEN-OBJ") |
| ReqLabel | Yes | Full label (e.g., "Interrogatory No. 5") |
| ReqText | Yes | Full text. If >500 chars: summary + `[FULL TEXT IN SOURCE]` |
| ObjText | Yes | ALL objections verbatim. `None stated` if none. |
| AnswerText | Yes | Substantive answer. `No substantive answer provided` or `NO RESPONSE SERVED` |
| BatesProduced | If applicable | Bates range(s) summary. Blank if N/A. |
| AdmissionResult | RFA only | `Admitted` / `Denied` / `Admitted-in-Part` / `Denied-in-Part` / `Deemed-Admitted` / `Objection-Only` / `N/A` |
| DeficiencyFlag | Yes | `Y` / `N` / `REVIEW` |
| Notes | Optional | Spoliation flags, cross-references, witness names |

### Productions (one row per produced document or Bates range — v1.2)
| Column | Required | Notes |
|--------|----------|-------|
| ProdID | Yes | Format: `PROD-{SetID}-{seq:03d}` |
| SetID | Yes | FK → Set_Metadata.SetID |
| ReqNum | Yes | Which request this responds to. Pipe-separated if multiple. |
| BatesStart | Yes | First Bates number in range |
| BatesEnd | If known | Last Bates number. Same as BatesStart if single doc. |
| DocCount | If known | Number of pages/documents in range |
| DocDescription | Yes | Short title / description of produced document(s) |
| DocDate | If known | Date of the document(s). YYYY-MM-DD. |
| ProducingParty | Yes | Who produced these documents |
| SA_Category | If known | SA document category (e.g., "4c Evidence and Discovery") |
| SA_SubCategory | If known | SA sub-category (e.g., "Defendant Responses to Requests for Admission") |
| Notes | Optional | Redaction notes, completeness concerns |

### Processing_Log
| Column | Notes |
|--------|-------|
| Stage | `EXTRACT` |
| Timestamp | ISO format |
| InputFile | Source filename |
| Action | What was done |
| RowsProcessed | Count |
| SkillVersion | `DPB-v1.2` |
| Notes | |

## DeficiencyFlag Rules

| Condition | DeficiencyFlag |
|-----------|---------------|
| Substantive answer, appears complete | `N` |
| Objection only, no substantive answer | `Y` |
| Evasive/non-responsive answer | `Y` |
| No response served | `Y` |
| Partial answer, info missing | `Y` |
| Answer references production but no Bates | `REVIEW` |
| Boilerplate objection + substantive answer | `REVIEW` |
| RFA: Admitted or Denied properly | `N` |
| RFA: No response (deemed admitted) | `Y` |
| ROG: Answer merely refers to documents | `Y` |

## Parsing Guidance

### General objections / preliminary statements
Single row: ReqNum=`GEN-OBJ`, full text in ObjText, DeficiencyFlag=`REVIEW`.

### Definitions & Instructions
Do NOT create rows. Note in Set_Metadata.Notes.

### Spoliation Detection
If a response admits destruction of evidence (footage overwritten, records lost),
flag in Notes: `SPOLIATION — [describe what was destroyed and why]`.

### ROG answers that merely refer to documents
Per FRCP 33(d) / NMRA 1-033, a party may refer to business records only when
"the burden of deriving the answer is substantially the same." When the answer
simply says "see documents" without explanation, flag DeficiencyFlag=Y.

### Productions Extraction (v1.2)
When an RFP response references Bates-numbered documents:
- Create one Productions row per distinct document or contiguous Bates range
- If a response says "Bates 14-23, 24-39, 40-127" — that's 3 Productions rows
- If a production index or privilege log accompanies the response, extract from it
- When extracting from an associate's tracking spreadsheet, map their columns:
  - "Bates No." → BatesStart
  - "Document Name/Brief Description" → DocDescription
  - "Document Date" → DocDate
  - "Significance/Description" → Notes (moves to Significance in ENRICH)
  - "Element Supported" → Notes (moves to Element_ID in ENRICH)

### Witness Detection (for deposition planning)
When ROG answers identify specific witnesses by name, note in the request's
Notes field: `WITNESSES: [Name1], [Name2]`. ENRICH will formalize these into
the WitnessRefs column.

## Code Patterns

### Pattern 1: Create the workbook (first chunk only)

```python
import os, shutil
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment

SET_ID = "REPLACE_WITH_SET_ID"  # ← MUST SET
WORK = f"/home/claude/DPB-Extract-{SET_ID}.xlsx"
OUT  = f"/mnt/user-data/outputs/DPB-Extract-{SET_ID}.xlsx"

wb = Workbook()
hf = Font(bold=True, size=11)
hfill = PatternFill("solid", fgColor="D9E1F2")

ws = wb.active
ws.title = "README"
ws["A1"] = "DISCOVERY PACK EXTRACT"
ws["A2"] = f"Set: {SET_ID}"
ws["A3"] = "Stage: EXTRACT — core columns only"
ws["A4"] = "Next step: Run ENRICH with CFP + LPB"
ws["A5"] = "Chunks completed: 0"
ws["A6"] = "Schema version: DPB-v1.2"

tabs = {
    "Set_Metadata": ["SetID","Title","SetType","Direction","Jurisdiction",
                      "ServingParty","RespondingParty","DemandOrOrder",
                      "ServiceMethod","ServedDate","ResponseDate",
                      "ResponseDueDate","DocID_Requests","DocID_Responses",
                      "TotalRequests","VerifiedBy","VerificationDate",
                      "DiscToClient","ClientConfDate","RecvdFromClient",
                      "SA_SetStatus","SA_Comments","Description","Notes"],
    "Requests":     ["SetID","ReqNum","ReqLabel","ReqText","ObjText",
                     "AnswerText","BatesProduced","AdmissionResult",
                     "DeficiencyFlag","Notes"],
    "Productions":  ["ProdID","SetID","ReqNum","BatesStart","BatesEnd",
                     "DocCount","DocDescription","DocDate","ProducingParty",
                     "SA_Category","SA_SubCategory","Notes"],
    "Processing_Log": ["Stage","Timestamp","InputFile","Action",
                       "RowsProcessed","SkillVersion","Notes"],
}
for name, headers in tabs.items():
    ws = wb.create_sheet(name)
    for c, h in enumerate(headers, 1):
        cell = ws.cell(1, c, h)
        cell.font = hf
        cell.fill = hfill
    ws.freeze_panes = "A2"

ws_req = wb["Requests"]
col_widths = {"A":12, "B":10, "C":25, "D":60, "E":60, "F":60,
              "G":25, "H":18, "I":15, "J":30}
wrap = Alignment(wrap_text=True, vertical='top')
for col_letter, width in col_widths.items():
    ws_req.column_dimensions[col_letter].width = width

from datetime import datetime
ws_log = wb["Processing_Log"]
ws_log.append(["EXTRACT", datetime.now().isoformat(), "N/A",
               f"Workbook created for {SET_ID}", "0", "DPB-v1.2", ""])

wb.save(WORK)
shutil.copy2(WORK, OUT)
print(f"Created: {WORK}")
```

### Pattern 2: Write Requests chunk via raw string (EVERY chunk)

```python
import io, shutil
import pandas as pd
from openpyxl import load_workbook
from openpyxl.utils.dataframe import dataframe_to_rows

SET_ID = "REPLACE_WITH_SET_ID"  # ← MUST SET
WORK = f"/home/claude/DPB-Extract-{SET_ID}.xlsx"
OUT  = f"/mnt/user-data/outputs/DPB-Extract-{SET_ID}.xlsx"
CHUNK = 1  # ← MUST INCREMENT

# --- AI: Output rows inside raw triple-quoted string using ~|~ delimiter ---
# --- NO line breaks inside fields. Replace newlines with space. ---

requests_csv = r"""SetID~|~ReqNum~|~ReqLabel~|~ReqText~|~ObjText~|~AnswerText~|~BatesProduced~|~AdmissionResult~|~DeficiencyFlag~|~Notes
DEF-RFP-001~|~1~|~Request for Production No. 1~|~All documents relating to maintenance of the premises.~|~Objection. Overbroad and unduly burdensome.~|~Subject to objections, see Bates 14-23.~|~14-23~|~N/A~|~REVIEW~|~Narrowing objection
"""

SEP = r"~\|~"
df_req = pd.read_csv(io.StringIO(requests_csv), sep=SEP, engine="python",
                     dtype=str, keep_default_na=False)

EXPECTED_REQ_COLS = 10
assert len(df_req.columns) == EXPECTED_REQ_COLS, \
    f"Requests parse error: got {len(df_req.columns)} cols, expected {EXPECTED_REQ_COLS}."

wb = load_workbook(WORK)
ws = wb["Requests"]
for r in dataframe_to_rows(df_req, index=False, header=False):
    ws.append(list(r))

wb["README"]["A5"] = f"Chunks completed: {CHUNK}"

from datetime import datetime
ws_log = wb["Processing_Log"]
ws_log.append(["EXTRACT", datetime.now().isoformat(), SET_ID,
               f"Chunk {CHUNK}: {len(df_req)} Requests rows appended",
               str(len(df_req)), "DPB-v1.2", ""])

wb.save(WORK)
shutil.copy2(WORK, OUT)
print(f"Requests: {wb['Requests'].max_row - 1} rows total")
```

### Pattern 3: Write Set_Metadata row (once per set)

```python
import io
import pandas as pd
from openpyxl import load_workbook
from openpyxl.utils.dataframe import dataframe_to_rows

SET_ID = "REPLACE_WITH_SET_ID"
WORK = f"/home/claude/DPB-Extract-{SET_ID}.xlsx"

meta_csv = r"""SetID~|~Title~|~SetType~|~Direction~|~Jurisdiction~|~ServingParty~|~RespondingParty~|~DemandOrOrder~|~ServiceMethod~|~ServedDate~|~ResponseDate~|~ResponseDueDate~|~DocID_Requests~|~DocID_Responses~|~TotalRequests~|~VerifiedBy~|~VerificationDate~|~DiscToClient~|~ClientConfDate~|~RecvdFromClient~|~SA_SetStatus~|~SA_Comments~|~Description~|~Notes
DEF-RFP-001~|~Defendant Acme Responses to Plaintiff First RFPs~|~RFP~|~Outgoing~|~NM~|~Plaintiff Jane Doe~|~Defendant Acme Corporation~|~Demand~|~E-mail~|~2026-01-15~|~2026-02-12~|~2026-02-14~|~DOC-REQ-001~|~DOC-RESP-001~|~10~|~~|~~|~~|~~|~~|~Open~|~~|~~|~
"""

SEP = r"~\|~"
df_meta = pd.read_csv(io.StringIO(meta_csv), sep=SEP, engine="python",
                      dtype=str, keep_default_na=False)

EXPECTED_META_COLS = 24
assert len(df_meta.columns) == EXPECTED_META_COLS, \
    f"Set_Metadata parse error: {len(df_meta.columns)} cols, expected {EXPECTED_META_COLS}"

wb = load_workbook(WORK)
ws = wb["Set_Metadata"]
for r in dataframe_to_rows(df_meta, index=False, header=False):
    ws.append(list(r))
wb.save(WORK)
import shutil
shutil.copy2(WORK, f"/mnt/user-data/outputs/DPB-Extract-{SET_ID}.xlsx")
```

### Pattern 4: Write Productions rows (when Bates-numbered docs produced)

```python
import io, shutil
import pandas as pd
from openpyxl import load_workbook
from openpyxl.utils.dataframe import dataframe_to_rows

SET_ID = "REPLACE_WITH_SET_ID"  # ← MUST SET
WORK = f"/home/claude/DPB-Extract-{SET_ID}.xlsx"
OUT  = f"/mnt/user-data/outputs/DPB-Extract-{SET_ID}.xlsx"

prod_csv = r"""ProdID~|~SetID~|~ReqNum~|~BatesStart~|~BatesEnd~|~DocCount~|~DocDescription~|~DocDate~|~ProducingParty~|~SA_Category~|~SA_SubCategory~|~Notes
PROD-DEF-RFP-001-001~|~DEF-RFP-001~|~1~|~14~|~23~|~10~|~Property Management Agreement~|~2020-02-12~|~Defendant Acme Corporation~|~~|~~|~Owner was Puneet Rastogi; redacted block on p1
PROD-DEF-RFP-001-002~|~DEF-RFP-001~|~3~|~24~|~39~|~16~|~Property Management Agreement (Kesani)~|~2022-08-16~|~Defendant Acme Corporation~|~~|~~|~No redactions
"""

SEP = r"~\|~"
df_prod = pd.read_csv(io.StringIO(prod_csv), sep=SEP, engine="python",
                      dtype=str, keep_default_na=False)

EXPECTED_PROD_COLS = 12
assert len(df_prod.columns) == EXPECTED_PROD_COLS, \
    f"Productions parse error: got {len(df_prod.columns)} cols, expected {EXPECTED_PROD_COLS}."

wb = load_workbook(WORK)
ws = wb["Productions"]
for r in dataframe_to_rows(df_prod, index=False, header=False):
    ws.append(list(r))

from datetime import datetime
ws_log = wb["Processing_Log"]
ws_log.append(["EXTRACT", datetime.now().isoformat(), SET_ID,
               f"Productions: {len(df_prod)} rows appended",
               str(len(df_prod)), "DPB-v1.2", ""])

wb.save(WORK)
shutil.copy2(WORK, OUT)
print(f"Productions: {wb['Productions'].max_row - 1} rows total")
```

## Chunk Completion Template

```
**Chunk [N] of ~[M] complete.**
- Requests: [X] new ([Y] total)
- Productions: [X] new ([Y] total)
- DeficiencyFlag=Y: [count] | N: [count] | REVIEW: [count]
- Stopped at: [request number where you stopped]
- Saved: DPB-Extract-[SetID].xlsx

Reply 'continue' for chunk [N+1].
```
