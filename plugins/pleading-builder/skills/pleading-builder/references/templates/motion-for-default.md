# Motion for Default Judgment

## Rule Basis
Rule 1-055 NMRA (New Mexico state) / FRCP 55 (federal)

## When Used
Filed when a defendant fails to plead or otherwise defend within the time required by law after being properly served.

## Document Format
- **Font**: Century Schoolbook, 12pt
- **Page**: US Letter, margins 1" top/left/right, 0.75" bottom
- **Body**: Justified alignment, double-spaced, first paragraph has 0.5" first-line indent
- **Numbered paragraphs**: Justified, double-spaced, no first-line indent
- **Title**: Centered, bold, underlined
- **Signature**: /s/ line underlined with tab extensions
- **Caption**: Left-aligned, case number indented ~4 inches right

## Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `state` | State name (caps) | NEW MEXICO |
| `county` | County name (caps) | SAN JUAN |
| `court` | Court name | ELEVENTH JUDICIAL DISTRICT |
| `caseNumber` | Full case number | D-1116-CV-2022-00987 |
| `plaintiffs` | Plaintiff name(s) as they appear in caption | JESUS MORENO and AMY MORENO |
| `defendants` | Defendant name(s) as they appear in caption | SAN JUAN RIVER OUTFITTERS AND LIVERY CO., LLC, and JOHN JAQUEZ |
| `clientRole` | "Plaintiffs" or "Plaintiff" | Plaintiffs |
| `complaintFilingDate` | Date complaint was filed | November 19, 2022 |
| `summonReturnFilingDate` | Date summons return was filed | June 6, 2023 |
| `serviceDate` | Date defendants were actually served (bolded in doc) | December 5, 2022 |
| `affiantName` | Name of person filing supporting affidavit | Jake A. Garrison |
| `certificateOfServiceDate` | Full date string for COS | 4th day of October 2023 |
| `certificateOfServiceMethod` | How the pleading was served | filed through Court's electronic filing system |

## Document Structure

1. **Caption Block** â State, County, Court, Case Number, Parties, "vs."
2. **Title** â "MOTION FOR DEFAULT JUDGMENT" (centered, bold, underlined)
3. **Introductory Paragraph** â Cites Rule 1-055, identifies parties, states purpose (first-line indent 0.5")
4. **Numbered Paragraphs 1-6:**
   - Â¶1: Complaint filing date
   - Â¶2: Jurisdiction via service (summons return date + actual service date bolded)
   - Â¶3: Failure to answer or file responsive pleading
   - Â¶4: Failure to appear; defendant in default
   - Â¶5: Entitlement to default judgment
   - Â¶6: Reference to supporting affidavit
5. **WHEREFORE Paragraph** â Prayer for relief
6. **Signature Block** â "Respectfully submitted," then /s/ line, firm info
7. **Certificate of Service** â Centered bold title, date and method of service, firm name, /s/ line

## Generation Script
`scripts/generate-motion-for-default.js`
