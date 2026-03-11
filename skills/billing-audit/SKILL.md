---
name: billing-audit
description: >
  Dual-mode billing audit for The Garrison Law Firm. MODE 1 (Client Audit): Cross-references a
  specific client's Outlook email folder against existing PracticePanther billing entries to find
  unbilled work. MODE 2 (Date Audit): Reads all emails visible on a pre-filtered Outlook screen
  for a given date or date range, identifies billable activity across ALL clients, and drafts
  time entries grouped by client. Both modes draft time entries in Jake's billing style and use
  the client reference spreadsheet (pp-client-reference.xlsx) for Contact/Matter GUID resolution.
  Use this skill whenever Jake asks to audit billing for a client, find unbilled time, check what
  hasn't been billed, catch up on billing, review emails for billable work, or says anything like
  "billing audit for [client]", "what haven't I billed for [client]", "catch up billing",
  "audit [client] time", "find unbilled emails", "run bills for [client]", "what did I do on
  [date]", "billing for yesterday", "time entries for March 5", "what did I work on today",
  "bill [date]", "daily billing", "what's unbilled for [date range]", or "catch up billing
  for this week". Also trigger when Jake mentions a date and billing in the same request,
  even casually (e.g., "pull up last Tuesday so I can bill it").
---

# Billing Audit

Two modes for identifying unbilled work and drafting PracticePanther time entries in Jake's
billing style.

- **Client Audit** — scans a single client's Outlook folder against PP entries
- **Date Audit** — scans all emails on a pre-filtered Outlook screen for a date or date range,
  then groups billable work by client

## Mode Detection

Determine which mode based on Jake's request:

- **Client Audit**: Jake names a client (e.g., "billing audit for Sandoval," "catch up billing
  on Krupiak"). Proceed to the Client Audit workflow below.
- **Date Audit**: Jake names a date or date range (e.g., "what did I do yesterday," "bill last
  week," "time entries for March 5"). Proceed to the Date Audit workflow below.
- **Ambiguous**: If the request mentions both a client and a date, ask Jake which mode he wants —
  or whether he wants client-scoped entries filtered to that date range.

---

## Shared: Step 0 — Load Reference Data

Both modes begin here. Read `pp-client-reference.xlsx` from the workspace:

```
Glob: **/pp-client-reference.xlsx
```

Read it with openpyxl or pandas. Columns of interest:

| Column | Field |
|--------|-------|
| B | Client Name |
| H | Contact GUID |
| I | Matter GUID |
| J | Outlook Folder |
| K | Rate |

Load the full table into memory — Date Audit needs all rows to match emails to clients.

If GUID columns are empty for a matched client, flag it and suggest running pp-reference-sync.

## Shared: Step 1 — Clarify Consolidation Rule

Ask Jake once per session:

- **Block billing** — one entry per day per client combining all activities (default)
- **Separate entries** — one entry per distinct activity

---

## Client Audit Workflow

Use this when Jake names a specific client.

### CA-1 — Resolve Client

Match Jake's input against column B (Client Name). Pull Contact GUID, Matter GUID, Outlook
Folder, Rate. If multiple matters exist for the same client name, ask Jake which matter to audit.

### CA-2 — Gather Existing Billing from PP

1. Navigate to the client's matter page in PP and open the Time Entries section.
2. Extract what has already been billed: date, hours, description.
3. This is the baseline — anything already billed gets skipped.

### CA-3 — Read the Outlook Folder

1. Navigate to `https://outlook.office.com/mail/`.
2. Open the folder from column J (Outlook Folder). If column J is empty, search the sidebar
   for the client name.
3. Sort oldest-first and process each email chronologically.

For each email:

- Read sender, recipients, date, subject, body.
- **Open and read all attachments.** Letters, motions, agreements, pleadings, and contracts
  represent drafting/revision time — often the most significant billable component. For each
  attachment, note: document type, length, complexity, whether it is an initial draft or revision.
- The email transmittal itself is often trivial — the real billable work is producing the
  attachment.

### CA-4 — Cross-Reference and Draft Entries

For each email/activity: if already billed (matching date + similar description), skip it.
Otherwise, draft an entry. Follow the Description Style and Time Estimation guidelines below.

### CA-5 — Present Results

Present a single table for the client:

| Date | Hours | Description | Contact GUID | Matter GUID | Notes |
|------|-------|-------------|--------------|-------------|-------|

GUIDs come from the reference spreadsheet. Notes column: flag revisions, possible overlaps,
attachments that could not be opened.

**Wait for Jake's approval.** He may adjust hours, edit descriptions, or remove entries.

### CA-6 — Hand Off

Once approved, confirm: "These entries are approved. Shall I enter them in PracticePanther?"
Do NOT enter anything into PP from this skill.

---

## Date Audit Workflow

Use this when Jake names a date or date range.

### DA-1 — Confirm the Date and Outlook Setup

Jake will set his Outlook screen to show the date(s) at issue — using the search bar or date
filters to display all sent and received emails in a single view. Confirm:

"Navigate to Outlook and set the view to show all emails for [date/range]. Let me know when
the screen is ready, or I can navigate there now if you prefer."

Once Jake confirms (or asks Marge to navigate), proceed to read emails from the screen.

If Jake asks Marge to navigate:
1. Go to `https://outlook.office.com/mail/`.
2. Use the Outlook search bar to search for emails within the specified date range.
   Example search syntax: `received:YYYY-MM-DD` or `sent:YYYY-MM-DD` or a date range.
3. Confirm the results are visible before proceeding.

### DA-2 — Read All Visible Emails

Read every email visible on the current Outlook screen. For each email capture:

- **Direction**: sent by Jake or received by Jake
- **Sender / Recipients**: full names and email addresses
- **Date and time**
- **Subject line**
- **Body** (at minimum the first substantive portion)
- **Attachments**: open and read each one — document type, length, complexity, initial draft
  vs. revision

Scroll down to ensure all emails in the filtered view are captured. If pagination or "load more"
controls are present, click through them to get the complete set.

### DA-3 — Match Emails to Clients

For each email, attempt to match it to a client in the reference spreadsheet:

1. **Outlook Folder match**: If the email is filed in a folder matching column J, use that client.
2. **Name / email match**: Check sender and recipient names/addresses against column B client
   names. Look for partial matches (e.g., "Sandoval" in the email matches "Sandoval - Encroachment"
   in the spreadsheet).
3. **Subject line match**: Check the subject for client names or matter references.
4. **No match found**: Place in an "Unmatched" group. These will be presented to Jake for manual
   client assignment.

### DA-4 — Gather Existing Billing from PP (Optional but Recommended)

For each matched client, check PP for existing time entries on the date(s) at issue to avoid
duplicates. If Jake wants to skip this step (e.g., he knows nothing is billed yet), respect that.

### DA-5 — Draft Entries Grouped by Client

For each client, draft time entries following the Description Style and Time Estimation guidelines
below. Present results grouped by client:

```
### [Client Name] — [Matter Name]
Contact GUID: [guid]  |  Matter GUID: [guid]

| Date | Hours | Description | Notes |
|------|-------|-------------|-------|
| ...  | ...   | ...         | ...   |
```

If block billing: combine all activities for a client on a single date into one entry.

### Unmatched Emails

Present unmatched emails separately:

```
### Unmatched — Needs Client Assignment

| Date | From/To | Subject | Suggested Client | Notes |
|------|---------|---------|-----------------|-------|
| ...  | ...     | ...     | (best guess)    | ...   |
```

Provide a best-guess client if possible. Jake assigns the correct client, or marks as
non-billable.

### DA-6 — Present and Approve

Present the full set of draft entries. **Wait for Jake's approval.** He may:
- Adjust hours or edit descriptions
- Assign unmatched emails to clients
- Remove non-billable items
- Merge or split entries

### DA-7 — Hand Off

Once approved, confirm: "These entries are approved. Shall I enter them in PracticePanther?"
Do NOT enter anything into PP from this skill.

---

## Description Style (Both Modes)

- Semicolon-separated clauses for multiple activities on the same date (block billing)
- Active past tense ("Reviewed...", "Drafted...", "Conferred with...")
- Parties by role and name ("opposing counsel, Mr. Martinez", "client, Mrs. Sandoval")
- Reference specific documents ("Motion to Compel", "Settlement Agreement")
- No first person — never "I reviewed"

**Example (block billing):**
> Reviewed email correspondence from opposing counsel, Mr. Martinez, regarding proposed discovery
> schedule; drafted response outlining client's objections to interrogatory scope; reviewed and
> revised attached Motion to Compel prior to filing

**Example (separate entry):**
> Drafted Letter of Representation to GEICO Insurance Company regarding client's UIM claim

## Time Estimation (Both Modes)

**Emails:**

| Activity | Hours |
|----------|-------|
| Brief review / scheduling | 0.10 |
| Substantive exchange | 0.20-0.30 |
| Drafting / coordination | 0.40-0.50 |
| Heavy drafting / strategy | 0.50+ |

**Attachments (often the primary billable component):**

| Document Type | Hours |
|---------------|-------|
| Short letter (1-2 pages) | 0.30-0.50 |
| Substantive letter/motion/agreement (3-10 pages) | 0.50-1.50 |
| Complex pleading/brief/contract (10+ pages) | 1.50-3.00+ |

Revisions of prior documents: reduce by ~30-50% unless changes are substantial.

---

## Firm Context

- **Firm**: The Garrison Law Firm, LLC — solo practitioner (Jake A. Garrison)
- **Rate**: $350/hr default (verify against col K in reference spreadsheet)
- **Outlook**: outlook.office.com, jake@garrisonlawnm.com
- **Folders**: Named by client/matter (e.g., "Sandoval - Encroachment")
