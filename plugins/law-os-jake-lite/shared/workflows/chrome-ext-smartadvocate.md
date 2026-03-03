# Chrome Extension Workflow: SmartAdvocate Data Extraction

**Version:** 1.0
**Last Updated:** 2026-02-23
**Status:** Interim bridge — will be replaced by native SA API integration

## Purpose

Extract structured case data from SmartAdvocate's web interface and feed it
into Law-OS skills (primarily CFP) via the Claude Pro Cowork session. This
workflow bridges the gap between SA's web-based case management system and
Law-OS's pack-first architecture until native API connectors are available.

## Prerequisites

- SmartAdvocate web access (login credentials)
- Chrome browser with Claude extension installed
- Active Claude Pro Cowork session mounted to `law-os-lite/` workspace

## When to Use

- Starting a new case in Law-OS (need case demographics from SA)
- Building a CFP and want SA case data as a starting point
- Updating case facts with new information entered into SA
- Pulling party information, insurance details, or provider lists from SA

## Workflow Steps

### Step 1: Open SmartAdvocate Case

1. Navigate to the case in SmartAdvocate web interface
2. Open the relevant case tab(s):
   - **Case Summary** — parties, dates, case type, jurisdiction
   - **Contacts** — all parties, attorneys, adjusters, providers
   - **Insurance** — all policies (UM/UIM, liability, MedPay, PIP)
   - **Medical** — provider list, treatment dates, billing totals
   - **Incidents** — accident details, police report info

### Step 2: Extract Data via Chrome Extension

For each SA tab containing relevant data:

1. Click the Claude Chrome extension icon
2. Select "Extract page content" (or equivalent)
3. The extension captures the structured data from the SA page

**What gets extracted:**
- Text content visible on the page
- Table data (parties, providers, insurance policies)
- Key-value pairs from form fields

**What does NOT get extracted:**
- Uploaded documents (PDFs, images) — these must be downloaded and uploaded to Cowork separately
- Data in collapsed/hidden sections — expand all sections before extracting
- Data requiring navigation to sub-pages — extract each page separately

### Step 3: Feed to Law-OS Skill

After extraction, paste or send the structured data to the Cowork session:

```
/cfp

Here is the case data from SmartAdvocate for case [CASE_CODE]:

[Paste extracted data here]

Please extract facts and build a Case Fact Pack.
```

### Step 4: Verify and Save

1. CFP processes the SA data and produces a structured fact pack
2. Review the output for accuracy against SA records
3. Save to `cases/{CASE_CODE}/cfp/CFP-Extract-SA-{CASE_CODE}.xlsx`

## Output Format for Law-OS Consumption

The Chrome extension output should be structured as closely as possible to
these formats for optimal skill consumption:

### Case Demographics

```
Case Code: [SA case number]
Case Type: [MVC / Med Mal / Premises / etc.]
Date of Incident: [YYYY-MM-DD]
Date Opened: [YYYY-MM-DD]
Jurisdiction: [NM State / D.NM Federal]
Court: [county or division]
Case Number: [if filed]

Plaintiff: [full name]
Defendant(s): [full names, comma-separated]
```

### Insurance Data

```
Policy Type | Carrier | Policy # | Limits | Adjuster | Status
Liability   | [name]  | [number] | [amt]  | [name]   | [Open/Closed]
UM/UIM      | [name]  | [number] | [amt]  | [name]   | [Open/Closed]
MedPay      | [name]  | [number] | [amt]  | [name]   | [Open/Closed]
```

### Medical Provider List

```
Provider | Specialty | First Visit | Last Visit | Total Billed | Status
[name]   | [type]    | [date]      | [date]     | [amount]     | [treating/discharged]
```

## Limitations

- **No real-time sync:** Data is a point-in-time snapshot; must re-extract after SA updates
- **Manual process:** Each extraction requires manual Chrome extension activation
- **No write-back:** Law-OS cannot write data back to SmartAdvocate via this method
- **Page-level extraction:** Only captures data visible on the current page view
- **Document files separate:** SA-attached documents must be downloaded and uploaded to Cowork individually

## Future: Native SA Integration

The native SmartAdvocate API integration (planned post-v1.1) will:
- Connect directly to SA via API keys
- Automatically pull case data on case code entry
- Sync pack updates back to SA
- Eliminate the Chrome extension bridge entirely

Until then, this workflow is the supported method for SA data extraction.

---

*CONFIDENTIAL — Attorney Work Product*
