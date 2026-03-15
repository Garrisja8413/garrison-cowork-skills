# Court Email Submission Template

## Purpose
Template for emailing proposed orders, notices of hearing, and all supporting briefing documents to the assigned judge's proposed-text email address. Used when a motion is fully briefed and ready for the court's consideration. The email packages the complete briefing record so the judge's office has everything needed to set a hearing or rule on the motion.

## When to Use
- After filing a Notice of Completion of Briefing (NOCB) and Request for Hearing
- When submitting a proposed Notice of Hearing for the court to set
- Any time proposed documents (orders, notices) must go to the judge's office

## Recipient
The judge's proposed-text email address, looked up from `references/nm-judicial-districts.md` by judicial district and division number. Pattern: `[prefix]div[number]proposedtxt@nmcourts.gov`

## Email Format

### Subject Line
```
Re: [CaseNumber]; [PlaintiffLastName] v. [DefendantLastName]; [DocumentTitle]
```

**Examples:**
- `Re: D-202-CV-2025-04962; Foroughi v. Estate of Kimiai-Assadi; Proposed Notice of Hearing`
- `Re: D-1116-CV-2024-00123; Smith v. Jones Construction; Proposed Notice of Hearing on Motion for Summary Judgment`

### To
Judge's proposed-text email address (from `nm-judicial-districts.md`)

### CC
All counsel of record in the case

### Attachments
All briefing documents, in this order:
1. Motion (the underlying motion being heard)
2. Response (if filed)
3. Reply (if filed)
4. Request for Hearing
5. Notice of Completion of Briefing (NOCB)
6. Proposed Notice of Hearing

**Note:** Only attach documents that exist. If no response was filed, omit the response and reply. The NOCB will reflect that no response was filed.

### Body

```
Dear Judge [LastName]'s Office,

Please find attached the following documents for the Court's consideration in [CaseNumber], [PlaintiffLastName] v. [DefendantLastName]:

1. [Motion Title] (filed [FilingDate])
2. [Response Title] (filed [FilingDate]) â if applicable
3. [Reply Title] (filed [FilingDate]) â if applicable
4. Request for Hearing (filed [FilingDate])
5. Notice of Completion of Briefing (filed [FilingDate])
6. Proposed Notice of Hearing

Please do not hesitate to contact our office if anything further is needed.

Respectfully,

Stephanie Garrison
The Garrison Law Firm, LLC
1212 Pennsylvania St. NE
Albuquerque, NM 87110
Phone: (505) 293-2710
Fax: (505) 214-5764
```

## Required Variables

| Variable | Description | Example |
|---|---|---|
| `caseNumber` | Full case number | `"D-202-CV-2025-04962"` |
| `plaintiffLastName` | Plaintiff's last name for short caption | `"Foroughi"` |
| `defendantLastName` | Defendant's last name for short caption | `"Estate of Kimiai-Assadi"` |
| `judgeName` | Assigned judge's full name | `"Erin B. O'Connell"` |
| `judgeLastName` | Judge's last name (for salutation) | `"O'Connell"` |
| `judgeEmail` | Judge's proposed-text email | `"albddiv17proposedtxt@nmcourts.gov"` |
| `judicialDistrict` | District number (for email lookup) | `"2nd"` |
| `divisionNumber` | Division number (for email lookup) | `"17"` |
| `motionTitle` | Title of the underlying motion | `"Motion to Reopen and Reinstatement of Case"` |
| `motionFilingDate` | Date motion was filed | `"February 10, 2026"` |
| `nocbFilingDate` | Date NOCB was filed | `"March 14, 2026"` |
| `rfhFilingDate` | Date Request for Hearing was filed | `"March 14, 2026"` |

## Optional Variables

| Variable | Description | Default |
|---|---|---|
| `responseTitle` | Title of response (if filed) | `""` (omit from list) |
| `responseFilingDate` | Date response was filed | `""` |
| `replyTitle` | Title of reply (if filed) | `""` (omit from list) |
| `replyFilingDate` | Date reply was filed | `""` |
| `ccParties` | Array of CC email addresses | `[]` |
| `senderName` | Name of person sending email | `"Stephanie Garrison"` |

## Workflow Integration

This template is used as the final step after:
1. **NOCB** â Filed to notify the court briefing is complete
2. **Notice of Hearing** â Generated as a proposed form for the court
3. **Court Email** â Packages everything and sends to the judge's office

The judge's office receives the email, reviews the briefing, and either:
- Sets the hearing by filling in the date/time/length on the proposed Notice of Hearing and issuing it, or
- Rules on the motion without a hearing if appropriate

## Notes
- The email is sent by firm staff (Stephanie Garrison), not the attorney
- Always include ALL briefing documents â do not send the proposed NOH without the underlying motion and NOCB
- The judge's email address must match the assigned judge â verify against `nm-judicial-districts.md`
- Some districts (3rd, 9th, 10th) have separate clerk-issued document emails â those are for clerk-issued documents, NOT for proposed judge documents
- 6th, 9th, and 11th districts have separate civil and criminal proposed-text emails â use the civil email for civil matters
