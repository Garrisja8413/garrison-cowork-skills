---
name: pleading-builder
description: "Template-driven pleading drafter for routine court filings. Produces formatted .docx documents from pre-built templates that match the firm's exact formatting (fonts, margins, spacing, caption style). Currently supports: Motion for Default Judgment (Rule 1-055 NMRA), Transcript of Judgment, Certificate as to State of Record / Notice of Non-Appearance, Affidavit of Non-Military Service, Default Judgment (proposed order), Joint Motion to Dismiss, Order of Dismissal, Notice of Completion of Briefing (Rule 1-007.1(H) NMRA), and Notice of Hearing (proposed). Also includes NM judicial district/county/judge email reference data and a court email submission template for packaging briefing documents to the judge's office. Use this skill whenever the user asks to draft, generate, or create a Motion for Default, default judgment motion, Transcript of Judgment, Certificate as to State of Record, Notice of Non-Appearance, Affidavit of Non-Military Service, Default Judgment, default package, Joint Motion to Dismiss, Order of Dismissal, Stipulated Dismissal, Notice of Completion of Briefing, NOCB, Notice of Hearing, NOH, proposed notice of hearing, or any other pleading type listed in the templates directory. Also trigger when the user says 'draft me a [pleading]', 'I need a [pleading] for [case]', 'generate a [pleading type]', 'build a [pleading]', 'pleading builder', 'default package', 'default judgment package', 'dismiss the case', 'joint dismissal', 'NOCB', 'briefing complete', 'notice of completion', 'notice of hearing', 'set a hearing', 'proposed hearing notice', 'email the judge', 'submit to judge', 'court email', 'judge email', 'proposed text email', or asks about available pleading templates. Also use when the user uploads a new example pleading and wants to add it as a template. Do NOT use for complex motion practice that requires legal argument built from packs (use msj, mtc, mtd-response, complaint, etc. instead). This skill is for form-driven pleadings where the structure is fixed and only the case-specific details change."
---

# Pleading Builder

Template-driven drafter for routine court filings that follow a fixed structure. The user provides case-specific details, and this skill produces a formatted .docx that matches the firm's exact style.

## How This Skill Works

Each pleading type has two components stored in this skill:
1. **A template reference file** (`references/templates/<type>.md`) â describes the document structure, required variables, formatting specs, and what each variable means.
2. **A generation script** (`scripts/generate-<type>.js`) â a Node.js script using `docx-js` that takes a JSON input file of variables and produces the formatted .docx.

The template reference files are the source of truth for what information to collect from the user. Read the relevant template file before asking the user for input.

## Available Templates

Check `references/templates/` for all available pleading types. Current library:

- **motion-for-default** â Motion for Default Judgment (Rule 1-055 NMRA)
- **transcript-of-judgment** â Transcript of Judgment (clerk-certified judgment record)
- **cert-notice** â Certificate as to State of Record and Notice of Non-Appearance (filed per defendant)
- **affidavit-non-military** â Affidavit of Non-Military Service under SCRA (filed per defendant)
- **default-judgment** â Proposed Default Judgment order (findings + orders, submitted to judge)
- **joint-motion-dismiss** â Joint Motion to Dismiss (with or without prejudice)
- **order-of-dismissal** â Proposed Order of Dismissal (submitted with joint motion)
- **nocb** â Notice of Completion of Briefing (Rule 1-007.1(H) NMRA)
- **notice-of-hearing** â Proposed Notice of Hearing (submitted to judge's office for scheduling)
- **court-email-submission** â Template for emailing briefing documents to the judge's proposed-text email

### Reference Data

- **`references/nm-judicial-districts.md`** â Complete NM judicial district-county mapping and judge proposed-text email addresses for all 13 districts. Use this to look up the correct email address when preparing a court email submission or identifying the assigned judge's division.

### Default Package Workflow

When the user asks for a "default package" or "default judgment package," generate all five documents in sequence. The cert-notice and affidavit-non-military are filed **per defendant** â generate one of each for every defaulting defendant. Collect all case-specific variables once and reuse across all five scripts.

### Motion Briefing Submission Workflow

When the user says briefing is complete on a motion and wants to submit to the court, **or** when the user asks to email the judge / prepare a court email, this is a **mandatory** multi-step workflow. **All three steps must be completed in order â do not skip the NOCB or Notice of Hearing even if the user only mentions the email.**

1. **Generate NOCB** â Notice of Completion of Briefing, filed with the court
2. **Generate Notice of Hearing** â Proposed form for the judge's office to fill in and issue. **This is always required.** The proposed NOH is always included as an attachment in the court email. Generate it using `scripts/generate-notice-of-hearing.js` before preparing the email.
3. **Prepare Court Email** â Package **all** briefing documents (motion, response, reply, RFH, NOCB, **and** the proposed NOH) and email to the judge's proposed-text email address. The proposed NOH must be attached â never send a court email without it.

Use `references/nm-judicial-districts.md` to look up the judge's email. Use `references/templates/court-email-submission.md` for the email format.

## Drafting Workflow

When the user asks to draft a pleading:

### Step 1: Identify the Pleading Type
Match the user's request to a template in `references/templates/`. If no template exists, tell the user and offer to create one from an uploaded example (see "Adding New Templates" below).

### Step 2: Read the Template
Read the relevant `references/templates/<type>.md` file. This contains the full list of required variables with descriptions and examples.

### Step 3: Collect Case Information
Ask the user for all required variables that you do not already know. Present them as a clear list so the user can provide everything at once. If you already have some information from context (e.g., the user mentioned the case number earlier), pre-fill those and confirm.

**Firm defaults** â these are constant unless the user says otherwise:
- Attorney: Jake A. Garrison (Sup. Ct. No. 07182)
- Firm: The Garrison Law Firm, LLC
- Address: 1212 Pennsylvania St. NE, Albuquerque, NM 87110
- Phone: (505) 293-2710
- Fax: (505) 214-5764
- Email: jake@garrisonlawnm.com

Do not ask the user for firm info unless the case involves co-counsel or a different attorney.

### Step 4: Generate the Document
1. Write a JSON file with all variables to a temp path.
2. Run the generation script:
   ```bash
   cd <skill-directory>/scripts && node generate-<type>.js /tmp/input.json /path/to/output/<filename>.docx
   ```
3. Validate the output:
   ```bash
   python scripts/office/validate.py /path/to/output/<filename>.docx
   ```
4. Deliver the .docx to the user.

### Step 5: Review and Adjust
If the user requests changes, modify the JSON and regenerate. For changes to boilerplate text or formatting, edit the generation script directly.

## Adding New Templates

When the user uploads an example pleading and wants to add it as a new template:

### Step 1: Parse the Example
Read the uploaded .docx using python-docx to extract:
- Full paragraph text, alignment, indentation, spacing, line spacing
- Font name, size, bold/underline/italic for each run
- Table structure, column widths, cell content, header formatting
- Page dimensions and margins

### Step 2: Identify Variables vs. Boilerplate
Analyze the document to distinguish:
- **Fixed boilerplate** â language that stays the same regardless of case (legal recitals, standard procedural language, form titles)
- **Variable fields** â case-specific data that changes each time (party names, dates, amounts, case numbers)

### Step 3: Create the Template Reference File
Write `references/templates/<new-type>.md` following the same structure as existing templates:
- Rule basis / purpose
- Document format (font, size, margins, alignment, spacing)
- Required variables table with descriptions and examples
- Document structure outline
- Reference to generation script

### Step 4: Create the Generation Script
Write `scripts/generate-<new-type>.js` using docx-js, matching the exact formatting from the parsed example:
- Page size and margins (in DXA twips)
- Font family and size (in half-points)
- Paragraph alignment, indentation, and spacing
- Table structure with correct column widths and borders
- Bold, underline, and other run-level formatting

Follow the docx skill patterns: use `docx-js` for creation (never raw XML for new documents), validate with `scripts/office/validate.py`, and use US Letter page size explicitly.

### Step 5: Test
Generate a test document using the same data from the uploaded example and compare visually. Adjust the script until the output matches.

## Important Notes

- **Spacing and formatting are critical.** These documents go to courts. A Motion for Default with wrong margins or font will look unprofessional. The generation scripts are calibrated to match the firm's actual filed documents â do not deviate from the formatting specs in the template files without explicit instruction from the user.
- **The firm signature block is constant.** Jake A. Garrison, The Garrison Law Firm, LLC. Only change if the user explicitly says to.
- **Certificate of Service method varies.** Sometimes it is "filed through Court's electronic filing system," sometimes it is "mailed" or "hand-delivered." Always ask.
- **County and court names must match.** San Juan County cases go to the Eleventh Judicial District. If the user provides a county, look up the correct judicial district from `references/nm-judicial-districts.md`.
- **Judge email addresses for proposed documents.** When submitting proposed orders or notices of hearing to a judge, use the proposed-text email from `references/nm-judicial-districts.md`. Some districts have separate civil and criminal emails â use the civil email for civil matters.
- **Court email submissions always include a proposed Notice of Hearing.** When the user wants to email briefing documents to the judge, follow the format in `references/templates/court-email-submission.md`. **Always generate a Notice of Hearing before preparing the email** â it is a mandatory attachment. The email is sent by firm staff (Stephanie Garrison), not the attorney.
---
name: pleading-builder
description: "Template-driven pleading drafter for routine court filings. Produces formatted .docx documents from pre-built templates that match the firm's exact formatting (fonts, margins, spacing, caption style). Currently supports: Motion for Default Judgment (Rule 1-055 NMRA), Transcript of Judgment, Certificate as to State of Record / Notice of Non-Appearance, Affidavit of Non-Military Service, Default Judgment (proposed order), Joint Motion to Dismiss, Order of Dismissal, Notice of Completion of Briefing (Rule 1-007.1(H) NMRA), and Notice of Hearing (proposed). Also includes NM judicial district/county/judge email reference data and a court email submission template for packaging briefing documents to the judge's office. Use this skill whenever the user asks to draft, generate, or create a Motion for Default, default judgment motion, Transcript of Judgment, Certificate as to State of Record, Notice of Non-Appearance, Affidavit of Non-Military Service, Default Judgment, default package, Joint Motion to Dismiss, Order of Dismissal, Stipulated Dismissal, Notice of Completion of Briefing, NOCB, Notice of Hearing, NOH, proposed notice of hearing, or any other pleading type listed in the templates directory. Also trigger when the user says 'draft me a [pleading]', 'I need a [pleading] for [case]', 'generate a [pleading type]', 'build a [pleading]', 'pleading builder', 'default package', 'default judgment package', 'dismiss the case', 'joint dismissal', 'NOCB', 'briefing complete', 'notice of completion', 'notice of hearing', 'set a hearing', 'proposed hearing notice', 'email the judge', 'submit to judge', 'court email', 'judge email', 'proposed text email', or asks about available pleading templates. Also use when the user uploads a new example pleading and wants to add it as a template. Do NOT use for complex motion practice that requires legal argument built from packs (use msj, mtc, mtd-response, complaint, etc. instead). This skill is for form-driven pleadings where the structure is fixed and only the case-specific details change."
---

# Pleading Builder

Template-driven drafter for routine court filings that follow a fixed structure. The user provides case-specific details, and this skill produces a formatted .docx that matches the firm's exact style.

## How This Skill Works

Each pleading type has two components stored in this skill:
1. **A template reference file** (`references/templates/<type>.md`) â describes the document structure, required variables, formatting specs, and what each variable means.
2. **A generation script** (`scripts/generate-<type>.js`) â a Node.js script using `docx-js` that takes a JSON input file of variables and produces the formatted .docx.

The template reference files are the source of truth for what information to collect from the user. Read the relevant template file before asking the user for input.

## Available Templates

Check `references/templates/` for all available pleading types. Current library:

- **motion-for-default** â Motion for Default Judgment (Rule 1-055 NMRA)
- **transcript-of-judgment** â Transcript of Judgment (clerk-certified judgment record)
- **cert-notice** â Certificate as to State of Record and Notice of Non-Appearance (filed per defendant)
- **affidavit-non-military** â Affidavit of Non-Military Service under SCRA (filed per defendant)
- **default-judgment** â Proposed Default Judgment order (findings + orders, submitted to judge)
- **joint-motion-dismiss** â Joint Motion to Dismiss (with or without prejudice)
- **order-of-dismissal** â Proposed Order of Dismissal (submitted with joint motion)
- **nocb** â Notice of Completion of Briefing (Rule 1-007.1(H) NMRA)
- **notice-of-hearing** â Proposed Notice of Hearing (submitted to judge's office for scheduling)
- **court-email-submission** â Template for emailing briefing documents to the judge's proposed-text email

### Reference Data

- **`references/nm-judicial-districts.md`** â Complete NM judicial district-county mapping and judge proposed-text email addresses for all 13 districts. Use this to look up the correct email address when preparing a court email submission or identifying the assigned judge's division.

### Default Package Workflow

When the user asks for a "default package" or "default judgment package," generate all five documents in sequence. The cert-notice and affidavit-non-military are filed **per defendant** â generate one of each for every defaulting defendant. Collect all case-specific variables once and reuse across all five scripts.

### Motion Briefing Submission Workflow

When the user says briefing is complete on a motion and wants to submit to the court, this is a multi-step workflow:

1. **Generate NOCB** â Notice of Completion of Briefing, filed with the court
2. **Generate Notice of Hearing** â Proposed form for the judge's office to fill in and issue
3. **Prepare Court Email** â Package all briefing documents (motion, response, reply, RFH, NOCB, proposed NOH) and email to the judge's proposed-text email address

Use `references/nm-judicial-districts.md` to look up the judge's email. Use `references/templates/court-email-submission.md` for the email format.

## Drafting Workflow

When the user asks to draft a pleading:

### Step 1: Identify the Pleading Type
Match the user's request to a template in `references/templates/`. If no template exists, tell the user and offer to create one from an uploaded example (see "Adding New Templates" below).

### Step 2: Read the Template
Read the relevant `references/templates/<type>.md` file. This contains the full list of required variables with descriptions and examples.

### Step 3: Collect Case Information
Ask the user for all required variables that you do not already know. Present them as a clear list so the user can provide everything at once. If you already have some information from context (e.g., the user mentioned the case number earlier), pre-fill those and confirm.

**Firm defaults** â these are constant unless the user says otherwise:
- Attorney: Jake A. Garrison (Sup. Ct. No. 07182)
- Firm: The Garrison Law Firm, LLC
- Address: 1212 Pennsylvania St. NE, Albuquerque, NM 87110
- Phone: (505) 293-2710
- Fax: (505) 214-5764
- Email: jake@garrisonlawnm.com

Do not ask the user for firm info unless the case involves co-counsel or a different attorney.

### Step 4: Generate the Document
1. Write a JSON file with all variables to a temp path.
2. Run the generation script:
   ```bash
   cd <skill-directory>/scripts && node generate-<type>.js /tmp/input.json /path/to/output/<filename>.docx
   ```
3. Validate the output:
   ```bash
   python scripts/office/validate.py /path/to/output/<filename>.docx
   ```
4. Deliver the .docx to the user.

### Step 5: Review and Adjust
If the user requests changes, modify the JSON and regenerate. For changes to boilerplate text or formatting, edit the generation script directly.

## Adding New Templates

When the user uploads an example pleading and wants to add it as a new template:

### Step 1: Parse the Example
Read the uploaded .docx using python-docx to extract:
- Full paragraph text, alignment, indentation, spacing, line spacing
- Font name, size, bold/underline/italic for each run
- Table structure, column widths, cell content, header formatting
- Page dimensions and margins

### Step 2: Identify Variables vs. Boilerplate
Analyze the document to distinguish:
- **Fixed boilerplate** â language that stays the same regardless of case (legal recitals, standard procedural language, form titles)
- **Variable fields** â case-specific data that changes each time (party names, dates, amounts, case numbers)

### Step 3: Create the Template Reference File
Write `references/templates/<new-type>.md` following the same structure as existing templates:
- Rule basis / purpose
- Document format (font, size, margins, alignment, spacing)
- Required variables table with descriptions and examples
- Document structure outline
- Reference to generation script

### Step 4: Create the Generation Script
Write `scripts/generate-<new-type>.js` using docx-js, matching the exact formatting from the parsed example:
- Page size and margins (in DXA twips)
- Font family and size (in half-points)
- Paragraph alignment, indentation, and spacing
- Table structure with correct column widths and borders
- Bold, underline, and other run-level formatting

Follow the docx skill patterns: use `docx-js` for creation (never raw XML for new documents), validate with `scripts/office/validate.py`, and use US Letter page size explicitly.

### Step 5: Test
Generate a test document using the same data from the uploaded example and compare visually. Adjust the script until the output matches.

## Important Notes

- **Spacing and formatting are critical.** These documents go to courts. A Motion for Default with wrong margins or font will look unprofessional. The generation scripts are calibrated to match the firm's actual filed documents â do not deviate from the formatting specs in the template files without explicit instruction from the user.
- **The firm signature block is constant.** Jake A. Garrison, The Garrison Law Firm, LLC. Only change if the user explicitly says to.
- **Certificate of Service method varies.** Sometimes it is "filed through Court's electronic filing system," sometimes it is "mailed" or "hand-delivered." Always ask.
- **County and court names must match.** San Juan County cases go to the Eleventh Judicial District. If the user provides a county, look up the correct judicial district from `references/nm-judicial-districts.md`.
- **Judge email addresses for proposed documents.** When submitting proposed orders or notices of hearing to a judge, use the proposed-text email from `references/nm-judicial-districts.md`. Some districts have separate civil and criminal emails â use the civil email for civil matters.
- **Court email submissions.** When the user wants to email briefing documents to the judge, follow the format in `references/templates/court-email-submission.md`. The email is sent by firm staff (Stephanie Garrison), not the attorney.
