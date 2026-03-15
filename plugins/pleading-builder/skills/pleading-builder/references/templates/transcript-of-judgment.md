# Transcript of Judgment

## Purpose
A court-clerk-certified record of a judgment, typically filed to create a lien or for enforcement purposes. The document is completed by the attorney and presented to the clerk for certification.

## Document Format
- **Font**: Times New Roman, 10pt
- **Page**: US Letter, margins 0.5" all around
- **Caption**: Left-aligned, NOT bold for state/county/court; case number with 6pt spacing
- **Title**: Centered bold, placed AFTER the full party block (below "Defendants.")
- **Tables**: Three tables with single-line black borders, centered headers bold
- **Clerk Section**: Left-aligned, standard text

## Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `state` | State name (caps) | NEW MEXICO |
| `county` | County name (caps) | SAN JUAN |
| `court` | Full court name | ELEVENTH JUDICIAL DISTRICT COURT |
| `caseNumber` | Full case number | D-1116-CV-2022-00987 |
| `plaintiffs` | Plaintiff name(s) | JESUS MORENO and AMY MORENO |
| `defendants` | Defendant name(s) | SAN JUAN RIVER OUTFITTERS AND LIVERY CO., LLC, and JOHN JAQUEZ |
| `amountOfJudgment` | Dollar amount (may be blank if TBD) | $15,000.00 |
| `dateOfJudgment` | Date judgment was entered | March 12, 2026 |
| `howSatisfied` | How satisfied/remarks (often blank) | |
| `natureOfAction` | Description of the action (caps) | COMPLAINT FOR BREACH OF LEASE AND DAMAGES |
| `judgmentCreditors` | Name(s) of judgment creditor(s), newline-separated if multiple | JESUS MORENO and AMY MORENO |
| `judgmentDebtors` | Name(s) of judgment debtor(s), newline-separated if multiple | SAN JUAN RIVER OUTFITTERS AND LIVERY CO., LLC\nJOHN JAQUEZ |
| `date` | Date on the document | March 12, 2026 |
| `attorneyBlock` | Full attorney info block (optional — defaults to firm info) | Jake A. Garrison (Sup. Ct. No. 07182)\nThe Garrison Law Firm, LLC\n... |

## Document Structure

1. **Caption Block** — Centered: State, County, Court, Case Number
2. **Party Block with Title** — Plaintiffs on left, "TRANSCRIPT OF JUDGMENT" tab-right on same line as "Plaintiffs,"; "v." centered; Defendants below
3. **Table 1** — 3 columns: Amount of Judgment | Date of Judgment | How Satisfied and Remarks
4. **Table 2** — 3 columns: Nature of Action | Judgment Creditor(s) | Judgment Debtor(s)
5. **Table 3** — 2 columns: Date | Attorney for Judgment Creditor
6. **Clerk Certification** — "I, _________, Clerk of the District Court..." with blanks for clerk name
7. **Witness Clause** — "IN WITNESS WHEREOF..." with blanks for date
8. **Signature Line** — Underline, "Clerk of the District Court", County name

## Generation Script
`scripts/generate-transcript-of-judgment.js`
