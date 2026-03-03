---
name: billing-audit
description: >
  Cross-references a client's Outlook email folder against existing PracticePanther billing entries
  to find unbilled work and draft time entries in Jake's billing style. Reads the client reference
  spreadsheet (pp-client-reference.xlsx) to resolve client names to Contact/Matter GUIDs and
  Outlook folder names. Use this skill whenever Jake asks to audit billing for a client, find
  unbilled time, check what hasn't been billed, catch up on billing, review emails for billable
  work, or says anything like "billing audit for [client]", "what haven't I billed for [client]",
  "catch up billing", "audit [client] time", "find unbilled emails", or "run bills for [client]".
---

# Billing Audit

Walks through a client's Outlook email folder, identifies work not yet billed in PracticePanther,
and drafts time entries ready for review and entry via pp-time-entry.

## Step 0 — Load Reference Data

Read `pp-client-reference.xlsx` from the workspace:

```
Glob: **/pp-client-reference.xlsx
```

Read it with openpyxl or pandas. When Jake names a client, match against column B (Client Name).
Pull: **Contact GUID** (col H), **Matter GUID** (col I), **Outlook Folder** (col J), **Rate** (col K).

If a client has multiple matters (multiple rows with the same name), ask Jake which matter to audit.
If the GUID columns are empty, tell Jake and suggest running pp-reference-sync to populate them.

## Step 1 — Clarify Consolidation Rule

Ask Jake once:

- **Block billing** — one entry per day combining all activities (default)
- **Separate entries** — one entry per distinct activity

## Step 2 — Gather Existing Billing from PP

1. Navigate to the client's matter page in PP and open the Time Entries section.
2. Extract what has already been billed: date, hours, description.
3. This is the baseline — anything already billed gets skipped.

## Step 3 — Read the Outlook Folder

1. Navigate to `https://outlook.office.com/mail/`.
2. Open the folder from column J (Outlook Folder) in the spreadsheet. If column J is empty,
   search the sidebar for the client name.
3. Sort oldest-first and process each email chronologically.

For each email:

- Read sender, recipients, date, subject, body.
- **Open and read all attachments.** Letters, motions, agreements, pleadings, and contracts
  represent drafting/revision time — often the most significant billable component. For each
  attachment, note: document type, length, complexity, whether it is an initial draft or revision.
- The email transmittal itself is often trivial — the real billable work is producing the attachment.

## Step 4 — Cross-Reference and Draft Entries

For each email/activity: if already billed (matching date + similar description), skip it.
Otherwise, draft an entry.

### Jake's Description Style

- Semicolon-separated clauses for multiple activities on the same date (block billing)
- Active past tense ("Reviewed...", "Drafted...", "Conferred with...")
- Parties by role and name ("opposing counsel, Mr. Martinez", "client, Mrs. Sandoval")
- Reference specific documents ("Motion to Compel", "Settlement Agreement")
- No first person — never "I reviewed"

**Example:**
> Reviewed email correspondence from opposing counsel, Mr. Martinez, regarding proposed discovery
> schedule; drafted response outlining client's objections to interrogatory scope

### Time Estimation

**Emails:**

| Activity | Hours |
|----------|-------|
| Brief review / scheduling | 0.10 |
| Substantive exchange | 0.20–0.30 |
| Drafting / coordination | 0.40–0.50 |
| Heavy drafting / strategy | 0.50+ |

**Attachments (the primary billable component):**

| Document Type | Hours |
|---------------|-------|
| Short letter (1–2 pages) | 0.30–0.50 |
| Substantive letter/motion/agreement (3–10 pages) | 0.50–1.50 |
| Complex pleading/brief/contract (10+ pages) | 1.50–3.00+ |

Revisions of prior documents: reduce by ~30–50% unless changes are substantial.

## Step 5 — Present Results

| Date | Hours | Description | Contact GUID | Matter GUID | Notes |
|------|-------|-------------|--------------|-------------|-------|

GUIDs come from the reference spreadsheet. Notes column: flag revisions, possible overlaps,
attachments that could not be opened.

**Wait for Jake's approval.** He may adjust hours, edit descriptions, or remove entries.

## Step 6 — Hand Off

Once approved, the table is ready for pp-time-entry. Confirm:
"These entries are approved. Shall I enter them in PracticePanther?"

Do NOT enter anything into PP from this skill.

## Firm Context

- **Firm**: The Garrison Law Firm, LLC — solo practitioner (Jake A. Garrison)
- **Rate**: $350/hr default (verify against col K in reference spreadsheet)
- **Outlook**: outlook.office.com, jake@garrisonlawnm.com
- **Folders**: Named by client/matter (e.g., "Sandoval - Encroachment")
