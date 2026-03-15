# Notice of Hearing (Proposed)

## Purpose
Proposed notice submitted to the assigned judge's office (via email to the judge's proposed-text email address) for the court to set a hearing date. The judge's office fills in the date, time, and length fields and issues the notice. Filed alongside the NOCB and all briefing documents (motion, response, reply, request for hearing).

## Rule Basis
- Filed as a proposed order/notice for the court's consideration
- Typically accompanies a Request for Hearing and NOCB submission

## Document Format
- **Font:** Century Schoolbook, 12pt
- **Margins:** 1" all sides
- **Page size:** US Letter (8.5" x 11")
- **Caption:** Standard firm format (state/county/court bold)
- **Title:** "NOTICE OF HEARING" centered, bold, underlined
- **Body:** Single-spaced fields with underlined blank lines for court to fill in

## Required Variables

| Variable | Description | Example |
|---|---|---|
| `state` | State name (uppercase) | `"NEW MEXICO"` |
| `county` | County name (uppercase) | `"BERNALILLO"` |
| `court` | Full court name | `"SECOND JUDICIAL DISTRICT COURT"` |
| `caseNumber` | Full case number | `"D-202-CV-2025-04962"` |
| `plaintiffs` | Plaintiff name(s) | `"HAIFA SADIGHI FOROUGHI"` |
| `defendants` | Defendant name(s), newline-separated if multiple | `"THE ESTATE OF SOUDABEH KIMIAI-ASSADI..."` |
| `clientRole` | Party role | `"Plaintiff"` |
| `judgeName` | Assigned judge's full name | `"Erin B. O'Connell"` |
| `hearingPlace` | Courthouse name and county | `"Second Judicial District Courthouse, Bernalillo County"` |
| `mattersToBeHeard` | Description of motion(s) to be heard | `"Motion to Reopen and Reinstatement of Case"` |

## Optional Variables

| Variable | Description | Default |
|---|---|---|
| `hearingDate` | Pre-filled date (usually left blank for court) | `""` (blank line) |
| `hearingTime` | Pre-filled time (usually left blank for court) | `""` (blank line) |
| `hearingLength` | Pre-filled length (usually left blank for court) | `""` (blank line) |
| `partiesEntitledToNotice` | Array of party names/descriptions | `[]` (blank section) |

## Document Structure

1. **Caption** â Standard firm format with bold state/county/court
2. **Title** â "NOTICE OF HEARING" centered, bold, underlined
3. **Opening line** â "A hearing in this case is set before Judge [judgeName] as follows:"
4. **Hearing details** (with underlined blank lines for court to fill):
   - "Date of hearing: _______________"
   - "Time of hearing: _______________"
   - "Length of hearing: _______________"
   - "Place of hearing: [hearingPlace]"
   - "Matter(s) to be heard: [mattersToBeHeard]"
5. **Court signature line** â "By ____________________" â "TRIAL COURT ASSISTANT"
6. **"Parties entitled to Notice:"** â bold, followed by blank lines or listed parties
7. **Footer note** â "*Cell phones and other electronic devices are not allowed in the courthouse.*" (bold, italic)

## Generation Script
`scripts/generate-notice-of-hearing.js`
