# EXTRACT Stage — Reference (CFP v7.0)

Read this file when entering EXTRACT mode.

## Purpose

Extract ALL facts, quotes, timeline events, and file metadata from uploaded
source documents. This is the foundation — exhaustive extraction, not selective.

## When to use

- User uploads a document (medical record, depo transcript, discovery response,
  police report, court notice, billing records, expert report, etc.)
- User says "extract from this" or "build a CFP from this document"

## Workflow

### Step 1: Stop-Sign Gate
Check for prohibited inputs. If sealed/privileged/protective-order material, refuse.

### Step 2: Assess Document Size
- **≤10 pages:** Process in a single response
- **>10 pages:** Announce chunking plan, process 8-12 pages per chunk

### Step 3: Create File_Metadata Row
Every document gets a File_Metadata row FIRST, before any extraction.

### Step 4: Extract Quotes (verbatim, with pinpoints)
Pull EVERY factual statement, admission, description, observation, opinion,
date, amount. This is the most important step — quotes anchor everything.

### Step 5: Micro-Decompose into Facts
Convert each quote into 1+ atomic fact rows. Apply the split rules from SKILL.md.

### Step 6: Extract Timeline Events
Every dated event becomes a Timeline row.

### Step 7: Create Excel + QA Summary

## Schemas

### File_Metadata
| Column | Required | Notes |
|--------|----------|-------|
| DocID | Yes | Unique identifier. Format: `[PREFIX]-[TYPE]-[###]` |
| Title | Yes | Descriptive title of the document |
| Type | Yes | See controlled values below |
| BatesStart | If available | Or `BATES NEEDED` |
| BatesEnd | If available | Or `BATES NEEDED` |

**Type values:** medical, depo, discovery, order, correspondence, contract,
photo, video, police-report, expert-report, billing, affidavit, pleading,
rfa-response, rog-response, rfp-response, intake-notes, other

### Quotes
| Column | Required | Notes |
|--------|----------|-------|
| DocID | Yes | Must match a File_Metadata.DocID |
| Pinpoint | Yes | Bates/Page:Line format, or `PINPOINT NEEDED` |
| Quote | Yes | VERBATIM. No paraphrasing. |
| Use | Yes | What this quote proves/shows (≤15 words) |

### Facts
| Column | Required | Notes |
|--------|----------|-------|
| Fact# | Yes | `NEW-###` or `C#-###` for chunked |
| Fact | Yes | One atomic assertion. No compounds. |
| SourceDocID | Yes | Must match a File_Metadata.DocID |
| Pinpoint | Yes | Bates/Page:Line or `PINPOINT NEEDED` |
| SourceWho | Yes | Name + role (e.g., "Dr. Smith, orthopedic surgeon") |

### Timeline
| Column | Required | Notes |
|--------|----------|-------|
| Date | Yes | YYYY-MM-DD format. Unknown → `DATE UNKNOWN` |
| Event | Yes | What happened (atomic, one event) |
| SourceDocID | Yes | Must match a File_Metadata.DocID |
| Pinpoint | Yes | Bates/Page:Line or `PINPOINT NEEDED` |

### Procedural_History (when input is court notice/order/NEF)
| Column | Required | Notes |
|--------|----------|-------|
| Date | Yes | YYYY-MM-DD |
| SourceSystem | Yes | `PACER/ECF` or `Odyssey` |
| Court/Venue | Yes | e.g., `D.N.M.` or `2nd Judicial District` |
| EventType | Yes | Use controlled list from project KB file 03 |
| CaseNo | Yes | Court case number |
| DocketNo | If PACER | Docket entry number |
| DocID | Yes | Must match File_Metadata |
| DeadlinesCreatedUpdated | Yes | Y or N |
| DeadlineTypes | If Y | Use controlled list from project KB file 03 |
| Notes | Optional | |

### Optional tabs (output only when document warrants)
- **Damages:** Category, Amount, SourceDocID, Pinpoint, Notes
- **Discovery_Defects:** Type, Number, Request_Text_Short, Response_Text_Short, Issue, Rule_Refs, Relief_Sought, Evidence_DocID, Pinpoint, Notes
- **Meet_Confer_Log:** Date, Participants, Issues_Discussed, Positions, Outcome, Next_Steps
- **Pleading_Issues_Log:** Pleading, Defense/Paragraph, Defect, Rule_Refs, Relief, Evidence_DocID, Pinpoint, Notes

## Excel Output Procedure

Use openpyxl to create the Excel file. Follow xlsx SKILL.md conventions.

```python
# Key setup patterns
from openpyxl import Workbook
from openpyxl.styles import Font, Alignment, PatternFill
from openpyxl.utils import get_column_letter

wb = Workbook()

# Header style
header_font = Font(bold=True, size=11)
header_fill = PatternFill(start_color="D9E1F2", end_color="D9E1F2", fill_type="solid")

# Create each tab, write headers, write data, auto-fit columns
# Freeze row 1 on each tab
# Include README tab as first tab explaining the file
```

Always save intermediate files during chunking so progress is preserved.

## Chunking Details

For large documents, each chunk response should:
1. Read the next 8-12 pages of content
2. Extract Quotes → Facts → Timeline for that section
3. Append rows to the Excel file (load existing, add rows, save)
4. Report: `Chunk [N] complete. [X] new rows ([Y] total). Reply 'continue'.`

Row numbering resets per chunk: C1-001, C1-002... then C2-001, C2-002...

After all chunks, output a consolidation summary:
- Total rows per tab
- PINPOINT NEEDED count
- Conflicts detected
- "Next: Run ENRICH on this file"
