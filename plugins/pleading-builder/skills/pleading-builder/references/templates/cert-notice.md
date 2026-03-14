# Certificate as to State of Record / Notice of Non-Appearance

## Purpose
Combined certificate from the court clerk confirming (1) the complaint was filed, (2) process was served, and (3) no appearance has been filed by the named defendant. Required as part of the default judgment package. Filed per-defendant if multiple defendants.

## Document Format
- **Font**: Century Schoolbook, 12pt
- **Page**: US Letter, margins 1" top/left/right, 0.75" bottom
- **Title**: Centered, bold, underlined â two-part: "CERTIFICATE AS TO THE STATE OF THE RECORD AND NOTICE OF NON-APPEARANCE"
- **Body**: Double-spaced, first paragraph indented 0.5", subsequent indented slightly
- **Clerk Block**: Indented, with signature line and "Deputy" designation

## Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `state` | State name (caps) | NEW MEXICO |
| `county` | County name (caps) | SAN JUAN |
| `court` | Court name | ELEVENTH JUDICIAL DISTRICT |
| `courtOrdinal` | Ordinal form of district | Eleventh |
| `caseNumber` | Full case number | D-1116-CV-2022-00987 |
| `plaintiffs` | Plaintiff name(s) | JESUS MORENO and AMY MORENO |
| `defendants` | Defendant name(s) | SAN JUAN RIVER OUTFITTERS AND LIVERY CO., LLC, and JOHN JAQUEZ |
| `clientRole` | "Plaintiffs" or "Plaintiff" | Plaintiffs |
| `targetDefendant` | Specific defendant this cert covers | John Jaquez |
| `complaintTitle` | Full title of the complaint | Complaint for Breach of Lease, to Enforce Guaranty, and for Damages |
| `complaintFilingDate` | Date complaint was filed | November 19, 2022 |
| `processIssuedDate` | Date process was issued for this defendant | November 21, 2022 |
| `serviceDate` | Date service was completed | December 5, 2022 |
| `serviceMethod` | Method of service | mailing (certified) |
| `witnessMonth` | Month for witness clause | June |
| `witnessYear` | Two-digit year for witness clause | 23 |

## Note
This document is filed **per defendant**. If there are multiple defendants, generate one for each.

## Generation Script
`scripts/generate-cert-notice.js`
