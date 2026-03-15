# Default Judgment (Proposed Order)

## Purpose
Proposed order for the judge to sign granting default judgment. Contains findings of fact and decretal paragraphs (orders). This is the most case-specific document in the default package â the findings and orders must be tailored to the specific claims, damages, and relief sought.

## Document Format
- **Font**: Century Schoolbook, 12pt
- **Page**: US Letter, margins 1" all around
- **Title**: "DEFAULT JUDGMENT" â centered, bold, underlined
- **Body**: Double-spaced, 0.5" first-line indent on all paragraphs
- **Numbered items**: Number + tab + text (e.g., "1.\tPlaintiffs filed...")
- **Transition**: "IT IS THEREFORE ORDERED, ADJUDGED, AND DECREED:" â bold, slightly tighter spacing
- **Closing**: "IT IS SO ORDERED." â bold, left-aligned
- **Judge block**: Right-indented (~3"), signature line, name, title
- **Attorney block**: Left-aligned, "Respectfully Submitted by:", /s/ line, firm info

## Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `state` | State name (caps) | NEW MEXICO |
| `county` | County name (caps) | SAN JUAN |
| `court` | Court name | ELEVENTH JUDICIAL DISTRICT |
| `caseNumber` | Full case number | D-1116-CV-2022-00987 |
| `plaintiffs` | Plaintiff name(s) | JESUS MORENO and AMY MORENO |
| `defendants` | Defendant name(s) | SAN JUAN RIVER OUTFITTERS AND LIVERY CO., LLC, and JOHN JAQUEZ |
| `clientRole` | "Plaintiffs" or "Plaintiff" | Plaintiffs |
| `findings` | Array of finding paragraphs (case-specific) | See below |
| `orders` | Array of order/decretal paragraphs (case-specific) | See below |
| `judgeName` | Full judge name with honorific | Hon. Brenna Clani-Washinawatok |
| `judgeTitle` | Judge's title | District Court Judge |

## Findings and Orders

The `findings` and `orders` arrays contain the substantive, case-specific content. Each element is the text of one numbered paragraph (the number is added automatically).

**Typical findings include:**
- Complaint filing date and nature of action
- Jurisdiction statement
- Proper service on defendants
- Failure to answer/appear
- Default status under Rule 1-055 NMRA
- Substantive facts supporting the claim (contract terms, breach, damages)

**Typical orders include:**
- Entry of default judgment against named defendants
- Principal damages amount (bold the dollar figure)
- Pre-judgment interest calculation
- Attorney's fees award
- Costs award
- Total judgment amount (bold)
- Post-judgment interest rate and statutory basis
- Authorization for collection activities

When the user asks to draft a default judgment, help them develop the findings and orders based on the case facts they provide. Dollar amounts in orders should be bolded in the final document â pass them with **bold** markers or handle in post-processing.

## Generation Script
`scripts/generate-default-judgment.js`
