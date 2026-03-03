# EMAIL Stage — Reference (CVR v1.0)

Read this file when entering EMAIL mode.

## Purpose

Package retrieved full opinions as DOCX files and email them to
jake@garrisonlawnm.com so Jake has local copies of every case the firm
relies on.

## DOCX Creation

For each retrieved case, create a DOCX file containing:

### Document Structure

1. **Header block:**
   - Case name (bold, centered)
   - Full citation
   - Court and date of decision
   - CVR verification status: GREEN / YELLOW / RED

2. **Verification summary** (if YELLOW or RED):
   - Brief description of each flagged issue
   - Relevant page/paragraph references

3. **Full opinion text:**
   - Preserve paragraph structure
   - Headings for major sections (if identifiable)
   - Footnotes (inline, numbered)
   - Concurrence(s) and dissent(s) as separate sections

### File Naming
`[CaseName-Short] — [Citation].docx`
Example: `Celotex v Catrett — 477 US 317.docx`

### DOCX Creation Method

Read the docx SKILL.md for proper DOCX creation using python-docx. Key points:
- Use `python-docx` library
- Set reasonable margins and font (Times New Roman 12pt)
- Use styles for headings, body text, block quotes
- Save to working directory first, then copy to outputs

## Email Delivery

### Email Configuration
- **Recipient:** jake@garrisonlawnm.com
- **Subject:** `CVR: [Pleading Name] — [N] Cases Retrieved [Date]`
- **Body:**

```
CVR Case Retrieval Complete

Pleading: [name]
Cases retrieved: [N]
Verification summary:
  GREEN: [count]
  YELLOW: [count] — [brief list]
  RED: [count] — [brief list]

[N] DOCX files attached.

— Marge (CVR v1.0)
```

### Email Method

Use available email tools or browser-based email (Gmail, Outlook web) to send.
If no direct email capability is available:
1. Save all DOCX files to the outputs folder
2. Inform the user the files are ready for manual email or download
3. Provide a download link for each file

### Pre-Send Confirmation

**Always confirm before sending.** Present to the user:
```
Ready to email [N] case files to jake@garrisonlawnm.com:
[list of filenames]

Confirm to send, or 'skip email' to just save the files.
```

Wait for explicit confirmation before sending.

## Batch Size

If more than 10 cases, split into multiple emails to avoid attachment size
limits. Each email should be under 25MB total.
