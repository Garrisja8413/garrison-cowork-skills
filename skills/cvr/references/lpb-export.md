# LPB-EXPORT Stage — Reference (CVR v1.0)

Read this file when entering LPB-EXPORT mode.

## Purpose

Convert CVR-verified cases into LPB-compatible Excel format so verified
authority flows directly into the firm's law pack pipeline. The key value:
every row produced by this export has FullTextRead = YES, meaning it was
extracted from the actual full opinion — not from a brief's selective quotation.

## Eligibility

Only export cases where:
- RetrievalStatus = RETRIEVED
- FullTextRead = YES
- OverallFidelity = GREEN or YELLOW

RED cases are excluded from LPB export until the user reviews and corrects the
citation issues. The user can override this by explicitly requesting export of
a RED case.

## Export Workflow

### Step 1: Load the Fidelity Report and Full Opinion Text

For each eligible case:
1. Read the Fidelity Report entry
2. Load the full opinion .txt file

### Step 2: Extract RULES Rows

Identify any rules, statutes, or procedural provisions that the opinion
interprets or applies. For each rule:

| Column | Source |
|--------|--------|
| RuleID | Auto-generated: `CVR-R-[Seq]` |
| RuleName | Rule name (e.g., "FRCP 56(a)") |
| Jurisdiction | Federal / NM State / etc. |
| RuleText | The rule text as quoted or described in the opinion |
| Category | Procedure / Substantive / Evidence / etc. |
| SourceID | CVR CiteID of the case |
| Notes | "Extracted from full opinion via CVR" |

### Step 3: Extract LAW Rows

For each verified proposition (PropositionStatus = VERIFIED or SUPPORTED):

| Column | Source |
|--------|--------|
| LawTag | Auto-generated: `CVR-L-[Seq]` |
| FullCitation | From Citation Index |
| Court | From Citation Index |
| Year | From Citation Index |
| Proposition | The verified proposition (use the actual opinion language, not the pleading's characterization if they differ) |
| QuoteOrSummary | Verbatim quote from the opinion supporting the proposition |
| Pinpoint | Verified pinpoint (use CorrectPinpoint if original was WRONG-PAGE) |
| MicroBrief | 2-3 sentence summary of the holding and its context |
| AuthorityType | Holding / Rule-Proposition / Dictum / Standard-Recitation |
| Placement | Tag for downstream use: MSJ / MTC / GFL / General / etc. |
| ShepardStatus | If visible during Lexis retrieval; otherwise UNKNOWN |
| Status | PACK-READY (from verified cases) |
| FullTextRead | YES |
| CVR_CiteID | Cross-reference to CVR Citation Index |
| CVR_Fidelity | GREEN or YELLOW |
| Notes | Any verification notes (especially for YELLOW cases) |

### Step 4: Proposition Decomposition

Apply LPB's decomposition rules:
- If a proposition contains "and" connecting two distinct legal points → split
- Multiple elements of a test listed together → one row per element
- Holding + standard of review → separate rows
- Dictum alongside holding → separate rows, flag dictum

### Step 5: Three-Layer Authority Check

Every LAW row must have all three layers per LPB rules:
1. **Proposition** — the legal point
2. **QuoteOrSummary + Pinpoint** — the supporting text with location
3. **MicroBrief** — contextual summary

If any layer is missing, the row is NOT pack-ready. Mark as NEEDS-ENRICHMENT
and note what is missing.

### Step 6: Output Excel

Use the raw-string + io.StringIO pattern from LPB:

```python
import pandas as pd
import io
from openpyxl import load_workbook

# Create workbook with RULES, LAW, Source_Docs, Processing_Log sheets
# Follow LPB EXTRACT schema exactly
```

Save as: `LP-Extract-CVR-[PleadingName].xlsx`
Save location: `law-packs/` per LPB conventions
Also copy to outputs directory for user access.

### Step 7: Processing Log

Record in the Processing_Log tab:
- Stage: CVR-LPB-EXPORT
- Timestamp
- InputFile: CVR Fidelity Report filename
- Action: "Exported [N] RULES rows and [M] LAW rows from [K] verified cases"
- RowsProcessed: total rows
- Notes: "All rows extracted from full opinion text (FullTextRead=YES)"

## Downstream Use

The exported LP file can be:
1. Fed directly into **LPB ENRICH** for category tagging, element mapping, and
   placement refinement
2. Fed into **LPB VERIFY** for QA (dedup, completeness, consistency)
3. Combined with other LP files via **LPB COMBINE**
4. Filtered via **LPB PACKET** for use in MSJ, MTC, GFL, or other drafting skills

The CVR_CiteID and CVR_Fidelity columns provide traceability back to the
original verification, so downstream consumers can confirm the authority was
read in full.
