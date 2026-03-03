# VERIFY Stage — Reference (CFP v7.0)

Read this file when entering VERIFY mode.

## Purpose

QA and source-check an enriched CFP. Marks each row as DRAFT-READY or
DO-NOT-USE-YET. Produces a verification report that identifies issues
before the pack feeds downstream drafting.

## When to use

- User has an enriched CFP Excel file
- User says "verify this", "QA the pack", "source check", "is this draft-ready"
- Before using CFP rows in any Prompt Block or filing-adjacent draft

## Workflow

### Step 1: Load Enriched Excel
Read the file. Inventory all tabs and row counts.

### Step 2: Run Traceability Checks
For every row in Facts, Quotes, Timeline:
- Does SourceDocID exist in File_Metadata? → If no: `ORPHAN-DOCID`
- Does the row have a real pinpoint? → If `PINPOINT NEEDED`: flag
- Is the DocID format consistent? → Flag anomalies

### Step 3: Run Decomposition Checks
For every Fact row:
- Does it contain "and" connecting two assertions? → Flag: `NEEDS-SPLIT`
- Does it contain a comma-separated list? → Flag: `NEEDS-SPLIT`
- Is it truly atomic? → Pass or flag

### Step 4: Run Consistency Checks
Across all tabs:
- Conflicting dates for same event? → Flag: `DATE-CONFLICT`
- Conflicting descriptions? → Flag: `FACT-CONFLICT`
- "reported" vs "diagnosed" — correct per source type?
- PartyTag consistent for same party across tabs?
- Timeline events match Facts about same events?

### Step 5: Run Completeness Checks
- Are there obvious gaps in the timeline?
- Missing tabs that the document type warrants? (e.g., medical record but no Damages tab)
- Volume consistent with expectations? (e.g., 10-page medical → 80-150+ rows)

### Step 6: Run Enrichment Quality Checks (if enriched)
- Every Fact has PackType + PartyTag?
- Every Fact has AdmisScore + CredScore?
- Every Fact has FactLevel?
- Binding admissions properly flagged in Admissions tab?
- FactGroupIDs make sense (related facts grouped)?

### Step 7: Assign Status to Each Row
Add a `Status` column to Facts:

| Status | Meaning |
|--------|---------|
| `DRAFT-READY` | Row is usable in filing-adjacent work |
| `NEEDS-PINPOINT` | DocID exists but pinpoint missing |
| `NEEDS-SPLIT` | Row is compound, needs micro-decomposition |
| `NEEDS-REVIEW` | Ambiguity, conflict, or scoring uncertainty |
| `ORPHAN-DOCID` | SourceDocID not in File_Metadata |
| `DO-NOT-USE` | Critical issue — do not cite until fixed |

### Step 8: Save Verified Excel + QA Report

## QA Report Format (markdown)

```markdown
# CFP Verification Report
**File:** [filename]
**Date:** [date]
**Stage:** VERIFY

## Summary
- Total Facts: [N]
- DRAFT-READY: [N] ([%])
- NEEDS-PINPOINT: [N]
- NEEDS-SPLIT: [N]
- NEEDS-REVIEW: [N]
- ORPHAN-DOCID: [N]
- DO-NOT-USE: [N]

## Critical Issues (must fix before drafting)
1. [Issue description + affected row refs]
2. ...

## Warnings (should fix)
1. [Warning + affected rows]
2. ...

## Conflicts Detected
| Fact# | Conflicts With | Nature | Resolution Needed |
|-------|---------------|--------|-------------------|
| M-015 | M-023 | Date of incident differs | Attorney review |

## Missing Pinpoints
| Fact# | DocID | Issue |
|-------|-------|-------|
| M-007 | MedRec-001 | Page/line not provided |

## Completeness Notes
- [Any gaps, missing expected tabs, low volume flags]

## Recommendation
[Ready for ENRICH / Ready for drafting / Fix [N] critical issues first]
```

## Chunking (large verification jobs)

If the pack has 100+ rows, verify in batches:
1. Verify Facts rows 1-50, assign Status, save Excel
2. Report progress: "Verified [50] of [N] rows. Reply 'continue'."
3. Continue until all rows verified
4. Generate final QA Report

## Integration with Drafting

After VERIFY:
- DRAFT-READY rows can be used in any Prompt Block (PB-MSJ-01, PB-MTC-01, etc.)
- NEEDS-PINPOINT rows should not appear in Cite Tables without the pinpoint
- NEEDS-SPLIT rows must be decomposed before use in SUMF
- DO-NOT-USE rows must be fixed before any citation

The PACKET mode can filter to DRAFT-READY rows only for clean downstream packets.
