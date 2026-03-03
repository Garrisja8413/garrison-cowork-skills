# VERIFY Stage — Reference (MPR v1.0)

Read this file when entering VERIFY mode.

## Purpose

Source-check every entry in the MPR against the filed motion documents.
This is the final accuracy gate before the MPR is consumed by downstream skills.

**Accuracy is non-negotiable. Every entry must be verified against the source.**

## Verification Checklist

### Check 1: Verbatim Accuracy
For each VerbatimIssueStatement, VerbatimArgument, VerbatimAssertion, and
VerbatimRuling field:
- Compare against the source filing
- Flag ANY deviation
- Mark: `VERIFIED` or `VERIFY-FAILED`

### Check 2: Issue Completeness
- Re-read the motion to confirm all discrete issues were extracted
- Confirm no issues were merged or split incorrectly
- Count sections/headings in source and compare to Issues count

### Check 3: Argument-Issue Linking
- Every argument should link to a valid issue
- No orphaned arguments (argument without a matching issue)

### Check 4: Factual Assertion Evidence Citations
- Every evidence citation in Factual_Assertions should be verifiable
- Check that EvidenceCited and EvidencePinpoint are accurate

### Check 5: Evidence Inventory
- Compare Evidence_Submitted tab against the filing's exhibit list
- Confirm no exhibits were missed
- Confirm IsNewToRecord assessment is correct

### Check 6: Response Coverage Accuracy
- For each NOT-ADDRESSED finding: re-read the response to confirm the issue
  was truly not addressed (it may have been addressed under a different heading
  or combined with another issue)
- For each ADDRESSED finding: confirm the linked response arguments actually
  address the motion issue

### Check 7: Authority Accuracy
- Confirm case citations are reproduced correctly (name, reporter, page)
- Confirm statutory citations match the source
- Confirm pinpoint references are accurate

### Check 8: Ruling Accuracy (for orders)
- Confirm VerbatimRuling matches the court's language exactly
- Confirm RulingResult correctly characterizes the outcome
- Confirm RulingBasis captures the court's stated reasoning

## Output

### Verified MPR Excel
Add `VerifyStatus` column: `VERIFIED`, `VERIFY-FAILED`, or `ATTORNEY-REVIEW`

### QA Report
```
MPR VERIFICATION REPORT
=======================
Case: [CASE_CODE]
Verified: [timestamp]

SUMMARY
- Total entries verified: [N]
- VERIFIED: [N] ([%])
- VERIFY-FAILED: [N] ([%])
- ATTORNEY-REVIEW: [N] ([%])

ISSUE COMPLETENESS
- Issues in source filing: [N]
- Issues in MPR: [N]
- Missing: [list or "None"]

ARGUMENT COMPLETENESS
- Legal arguments in source: ~[N]
- Arguments in MPR: [N]
- Orphaned arguments: [N]

EVIDENCE COMPLETENESS
- Exhibits in source: [N]
- Evidence in MPR: [N]
- Missing: [list or "None"]

RESPONSE COVERAGE ACCURACY
- Coverage assessments verified: [N]
- Coverage assessments corrected: [N]
- Details: [list corrections]

VERIFY-FAILED ITEMS
[List each with: EntryID, Tab, Issue, Expected, Found]

ATTORNEY-REVIEW ITEMS
[List each with: EntryID, Tab, Issue, Options]
```
