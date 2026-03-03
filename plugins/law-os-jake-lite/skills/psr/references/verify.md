# VERIFY Stage — Reference (PSR v1.0)

Read this file when entering VERIFY mode.

## Purpose

Source-check every entry in the PSR against the filed pleading documents.
This is the final accuracy gate before the PSR is consumed by downstream skills.

**Accuracy is non-negotiable. Every entry must be verified against the source.**

## VERIFY is a DATA-ENGINEERING + MANUAL REVIEW TASK

Claude performs automated consistency checks via pandas scripts.
Discrepancies are flagged for attorney review.

## Verification Checklist

### Check 1: Verbatim Accuracy

For each VerbatimText and VerbatimResponse field:
- Compare against the source pleading document
- Flag ANY deviation (even minor punctuation differences)
- Mark status: `VERIFIED` or `VERIFY-FAILED`

### Check 2: Paragraph Numbering

For each ParaNum in Allegations and Responses:
- Confirm the paragraph number matches the source
- Confirm no paragraphs were skipped
- Confirm no paragraphs were duplicated
- Flag gaps: "Paragraphs 1-15 extracted, paragraph 16 missing"

### Check 3: Response-Allegation Linking

For each Response row:
- Confirm AllegationID points to a valid Allegations row
- Confirm AllegationParaNum matches the complaint paragraph being addressed
- Flag mismatches: `[PARAGRAPH-MISMATCH]`

### Check 4: Admission/Denial Classification

For each Response row:
- Re-read the VerbatimResponse text
- Confirm ResponseType accurately reflects the language used
- Flag any classification that may be wrong: `[CLASSIFICATION-REVIEW]`
- Special attention to:
  - Responses that could be either admission or qualified denial
  - "Lacks knowledge or information" for facts in defendant's control
  - Bare denials without stated basis

### Check 5: Affirmative Defense Completeness

- Count affirmative defenses in the source answer
- Compare to count in PSR
- Flag any missing defenses
- Confirm each defense's VerbatimText matches the source

### Check 6: Claims Completeness

- Count causes of action / counterclaims / cross-claims in source
- Compare to Claims_Register count
- Flag any missing claims

### Check 7: Cross-Pleading Consistency

For combined PSRs with multiple pleadings:
- Every paragraph referenced in an answer should exist in the complaint
- Amended pleadings should supersede originals
- No orphaned responses (response with no matching allegation)

### Check 8: Admissions_Map Derivation

- Every ADMITTED response should have an Admissions_Map entry
- Every NO-RESPONSE should have a DEEMED entry in Admissions_Map
- Every partial admission should have the correct admitted portion

### Check 9: Denials_Map Derivation

- Every DENIED response should have a Denials_Map entry
- DenialBasis should be populated (even if `[NONE STATED — BARE DENIAL]`)
- DefectFlag should be consistent between Responses and Denials_Map

## Output

### Verified PSR Excel

Add a `VerifyStatus` column to each tab:
- `VERIFIED` — Entry matches source pleading exactly
- `VERIFY-FAILED` — Discrepancy found (see Notes)
- `ATTORNEY-REVIEW` — Ambiguous entry requiring attorney judgment

### QA Report

```
PSR VERIFICATION REPORT
=======================
Case: [CASE_CODE]
Verified: [timestamp]
PSR Version: v1.0

SUMMARY
- Total entries verified: [N]
- VERIFIED: [N] ([%])
- VERIFY-FAILED: [N] ([%])
- ATTORNEY-REVIEW: [N] ([%])

PARAGRAPH COVERAGE
- Complaint paragraphs in source: [N]
- Complaint paragraphs in PSR: [N]
- Missing: [list or "None"]
- Answer paragraphs in source: [N]
- Answer responses in PSR: [N]
- Missing: [list or "None"]
- Affirmative defenses in source: [N]
- Affirmative defenses in PSR: [N]
- Missing: [list or "None"]

CROSS-LINK INTEGRITY
- Responses with valid AllegationID: [N] / [Total]
- Paragraph mismatches: [N] [list]
- Orphaned responses: [N] [list]

ADMISSION/DENIAL ACCURACY
- Admission classifications verified: [N] / [Total]
- Denial classifications verified: [N] / [Total]
- Classifications flagged for review: [N] [list]

DERIVED TAB ACCURACY
- Admissions_Map entries: [N] (expected: [N])
- Denials_Map entries: [N] (expected: [N])
- Derivation errors: [list or "None"]

VERIFY-FAILED ITEMS (require correction)
[List each with: EntryID, Tab, Issue, Expected, Found]

ATTORNEY-REVIEW ITEMS (require judgment)
[List each with: EntryID, Tab, Issue, Options]
```

## CFP Cross-Reference (during VERIFY)

For each entry in the Admissions_Map, check whether a corresponding CFP fact
row exists:
- If yes: populate `CFP_FactRef` with the Fact# from CFP
- If no: note "Admitted fact not yet in CFP — recommend adding via CFP Delta"
  This creates a work item for the CFP to import the admitted fact.
