# Order of Dismissal (Proposed)

## Purpose
Proposed order submitted with a Joint Motion to Dismiss for the judge's signature. Dismisses the action with or without prejudice per the parties' stipulation. Filed as a separate document from the Joint Motion.

## Rule Basis
- **NMRA 1-041(A)(2)** â Voluntary dismissal by stipulation
- Entered upon court approval of joint motion

## Document Format
- **Font:** Century Schoolbook, 12pt (title 13pt)
- **Margins:** 1" all sides
- **Page size:** US Letter (8.5" x 11")
- **Body alignment:** Left (not justified)
- **Body line spacing:** Double-spaced (480 twips)
- **Body first-line indent:** 0.5" (720 DXA)
- **Caption:** Standard firm format

## Required Variables

| Variable | Description | Example |
|---|---|---|
| `state` | State name | `"NEW MEXICO"` |
| `county` | County name | `"BERNALILLO"` |
| `court` | Full court name | `"SECOND JUDICIAL DISTRICT COURT"` |
| `caseNumber` | Full case number | `"D-202-CV-2025-04279"` |
| `plaintiffs` | Plaintiff name(s), newline-separated if multiple | `"ANDREW ADAM MONTOYA"` |
| `defendants` | Defendant name(s), newline-separated if multiple | `"PATRICK O'BRIEN\nPATRICIA BURR"` |
| `clientRole` | Party the firm represents | `"Defendants"` |
| `dismissalType` | `"with prejudice"` or `"without prejudice"` | `"with prejudice"` |
| `feesProvision` | How fees/costs are handled | `"each party to bear their own attorney's fees and costs"` |
| `opposingPartyName` | Name of the opposing signatory | `"Andrew Adam Montoya"` |
| `opposingPartyAddress` | Street address | `"199 Western Skies Rd., Space #19"` |
| `opposingPartyCityStateZip` | City, State ZIP | `"Gallup, NM 87301"` |
| `opposingPartyPhone` | Phone number | `"(505) 728-0464"` |
| `opposingPartyRole` | Role line (italic) | `"Plaintiff, Pro Se"` |

## Document Structure

1. **Caption** â Standard firm format
2. **Title** â "ORDER OF DISMISSAL [WITH/WITHOUT] PREJUDICE" centered, bold, underlined, 13pt
3. **Recital paragraph** â "THIS MATTER having come before the Court on the Joint Motion to Dismiss [with/without] Prejudice filed by the Parties..." Double-spaced, 0.5" indent.
4. **Order paragraph** â "IT IS HEREBY ORDERED that the above-captioned action is DISMISSED [WITH/WITHOUT] PREJUDICE, [feesProvision]." Double-spaced, 0.5" indent.
5. **"IT IS SO ORDERED."** â Bold, left-aligned.
6. **Judge signature block** â Signature line, "DISTRICT COURT JUDGE", "Date: ___"
7. **Firm signature block** â "Respectfully submitted," â firm name bold â /s/ underlined â contact info â "Attorney for [clientRole]" italic
8. **Opposing party approval block** â "Approved:" â signature line â name, address, phone â role italic

## Generation Script
`scripts/generate-order-of-dismissal.js`
