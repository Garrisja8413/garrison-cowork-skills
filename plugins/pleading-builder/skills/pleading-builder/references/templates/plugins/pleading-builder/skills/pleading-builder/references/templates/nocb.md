# Notice of Completion of Briefing (NOCB)

## Purpose
Filed to notify the court that briefing on a pending motion is complete and the matter is ready for adjudication. Filed after the response deadline has passed (whether or not a response was filed). Governed by **Rule 1-007.1(H) NMRA**.

## Rule Basis
- **NMRA 1-007.1(H)** â Notice of completion of briefing; duty to notify court when briefing period expires

## Document Format
- **Font:** Century Schoolbook, 12pt (title bold, underlined, centered)
- **Margins:** 1" all sides
- **Page size:** US Letter (8.5" x 11")
- **Body alignment:** Justified
- **Body line spacing:** Double-spaced (480 twips)
- **Body first-line indent:** 0.5" (720 DXA) on body paragraphs
- **Caption:** Standard firm format (state/county/court not bold for civil; court-first for probate)

## Supported Styles

### Style A â COME NOW + Numbered Facts (default, civil litigation)
Body structure:
1. "COME NOW, [clientRole] [partyNames], by and through undersigned counsel, hereby notify the Court that briefing is complete on [clientRole]' [motionTitle (bold)] and state:"
2. Numbered facts (array):
   - "1. [clientRole] filed the Motion on [motionFilingDate];"
   - "2. Any response by [opposingRole] was due by [responseDeadline];"
   - "3. As of the filing of this notice, no response has been filed." (or custom fact)
3. "This matter is now fully briefed and ready for the Court's adjudication."

### Style B â Narrative (probate/simple)
Body structure:
1. Single paragraph: "Pursuant to Rule 1-007.1(H) NMRA, [narrative text describing motion and briefing status]. Hence, the briefing on the [clientRole]' Motion is complete and ready for decision."

## Required Variables

| Variable | Description | Example |
|---|---|---|
| `state` | State name (uppercase) | `"NEW MEXICO"` |
| `county` | County name (uppercase) | `"BERNALILLO"` |
| `court` | Full court name | `"SECOND JUDICIAL DISTRICT COURT"` |
| `caseNumber` | Full case number | `"D-202-CV-2020-04403"` |
| `plaintiffs` | Plaintiff name(s), newline-separated if multiple | `"AARON D. LEAVITT and JEANETTE J. LEAVITT"` |
| `defendants` | Defendant name(s), newline-separated if multiple | `"KEITH PAGE, GIANG PAGE, et al."` |
| `clientRole` | Party role the firm represents | `"Plaintiffs"` |
| `partyNames` | Named parties for COME NOW paragraph | `"Aaron D. Leavitt and Jeanette J. Leavitt" |
| `motionTitle` | Full title of the motion (rendered bold) | `"Motion for Reconsideration of Interlocutory Discovery Order" |

## Optional Variables

| Variable | Description | Default |
|---|---|---|
| `style` | `"comeNow"` (default) or `"narrative"` | `"comeNow"` |
| `motionFilingDate` | Date motion was filed | *(required if style=comeNow)* |
| `responseDeadline` | Date response was due | *(required if style=comeNow)* |
| `responseFiled` | `true`/`false` â whether a response was filed | `false` |
| `numberedFacts` | Array of custom numbered-fact strings (overrides auto-generated) | *(auto-generated)* |
| `narrativeText` | Full narrative paragraph text (for style=narrative) | *(required if style=narrative)* |
| `certificateText` | Custom certificate of service text | *(aauto-generated)* |
| `serviceDate` | Date of service for certificate | *(defaults to "this date")* |
| `serviceMethod` | `"electronic" or `"mail"` or custom | `"electronic"` |
| `servedParties` | Array of `{ name, address?, cityStateZip? }` for mailed parties | `[]` |

## Document Structure

1. **Caption** â Standard firm format (state/county/court, case number indented 5760 DXA, party blocks)
2. **Title** â "NOTICE OF COMPLETION OF BRIEFING" centered, bold, underlined
3. **Body*s â Style A (COME NOW + numbered facts + closing) or Style B (narrative paragraph)
4. **"Respectfully submitted,"** â Left-aligned
5. **Firm signature blok** â /s/ underlined â name â firm â address â phone â "Attorney for [clientRole]" italic
6. **Certificate of Service** â "CERTIFICATE OF SERVICE" centered, bold, underlined â service paragraph â /s/ signature â firm name
