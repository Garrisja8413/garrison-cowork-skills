# Joint Motion to Dismiss

## Purpose
Joint motion filed when all parties agree to dismiss the action, typically after settlement. Filed separately from the proposed Order of Dismissal (see `order-of-dismissal.md`).

## Rule Basis
- **NMRA 1-041(A)(2)** â Voluntary dismissal by stipulation of all parties
- May be with or without prejudice

## Document Format
- **Font:** Century Schoolbook, 12pt (title 13pt)
- **Margins:** 1" all sides
- **Page size:** US Letter (8.5" x 11")
- **Body alignment:** Left (not justified)
- **Body line spacing:** Double-spaced (480 twips)
- **Body first-line indent:** 0.5" (720 DXA)
- **Caption:** Standard firm format (state/county/court bold, case number on own line indented 5760 DXA)

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
| `supportingParagraphs` | Array of numbered basis statements | See below |
| `feesProvision` | How fees/costs are handled | `"each party to bear their own attorney's fees and costs"` |
| `opposingPartyName` | Name of the opposing signatory | `"Andrew Adam Montoya"` |
| `opposingPartyAddress` | Street address | `"199 Western Skies Rd., Space #19"` |
| `opposingPartyCityStateZip` | City, State ZIP | `"Gallup, NM 87301"` |
| `opposingPartyPhone` | Phone number | `"(505) 728-0464"` |
| `opposingPartyRole` | Role line (italic) | `"Plaintiff, Pro Se"` |

### supportingParagraphs Example
```json
[
  "The Parties have reached a full and final settlement of all claims asserted in this matter.",
  "As part of the settlement, the Parties have executed a Settlement Agreement and Real Estate Purchase Agreement resolving all disputes between them.",
  "The Parties agree that all claims and counterclaims in this action should be dismissed with prejudice, with each party to bear their own attorney's fees and costs."
]
```

## Document Structure

1. **Caption** â Standard firm format
2. **Title** â "JOINT MOTION TO DISMISS [WITH/WITHOUT] PREJUDICE" centered, bold, underlined, 13pt
3. **COME NOG paragraph** â Names all parties, states they jointly move to dismiss. Double-spaced, 0.5" indent.
4. **Numbered paragraphs** â From `supportingParagraphs` array. Double-spaced, 0.5" indent.
5. **WHEREFORE paragraph** â Requests order of dismissal. Double-spaced, 0.5" indent.
6. **Firm signature block** â "Respectfully submitted," â firm name bold â /s/ underlined â contact info â "Attorney for [clientRole]" italic
7. **Opposing party approval block** â "Approved:" â signature line â name, address, phone â role italic

## Generation Script
`scripts/generate-joint-motion-dismiss.js`
