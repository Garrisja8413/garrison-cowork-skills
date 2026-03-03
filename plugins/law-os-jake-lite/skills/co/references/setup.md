# CO SETUP — CMS Entry, File Structure & Deadline Calendaring

## Purpose

Convert a signed lead into a fully configured active case in the CMS with
all contact records, file structure, critical deadlines, and team assignments
in place before any substantive work begins.

## Step 1: CMS Case Creation

### Required Fields

| Field | Source | Example |
|-------|--------|---------|
| Case ID | CMS auto-generated | 2026-PI-00123 |
| Case Name | Client last name v. Defendant | Adams v. Smith |
| Case Type | IKP incident_type | Motor Vehicle Collision |
| Case Status | Default | Active — Pre-Litigation |
| Date Opened | Today | 2026-02-24 |
| Date of Incident | IKP incident_date | 2025-12-15 |
| SOL Date | IKP statute_date | 2028-12-15 |
| Retainer Date | IKP retainer_signed_date | 2026-02-24 |
| Fee Type | IKP retainer_type | Standard Contingency |
| Fee Percentage | IKP fee_percentage | 33.33% |
| Estimated Value | IKP estimated_value | MEDIUM |
| Jurisdiction | From incident location | NM State — Second Judicial District |
| Linked Lead | IKP lead_id | IKP-LEAD-20260224-001 |

### Link to IKP

After creating the case, update the IKP lead record:

```yaml
# Update ikp_leads:
case_id: {new CMS case ID}
```

## Step 2: Contact Record Creation

### Client Record

| Field | Data | Notes |
|-------|------|-------|
| Full Name | IKP contact_name | Legal name as on ID |
| Phone | IKP contact_phone | Primary contact |
| Email | IKP contact_email | For e-signature and correspondence |
| Address | From interview | Mailing address |
| DOB | Collect at signing or follow-up | Needed for medical records |
| SSN | Collect at signing (encrypted) | Needed for Medicare/Medicaid |
| Preferred Contact | IKP preferred_contact | Phone, Email, or Text |
| Employer | From interview | For lost wages |
| Occupation | From interview | For earning capacity |

### Defendant Record(s)

| Field | Data | Notes |
|-------|------|-------|
| Full Name | From interview | At-fault party |
| Address | If known | For service of process |
| Phone | If known | |
| Employer | If known | Respondeat superior |
| Vehicle Info | If MVC | Make, model, year, plate |
| Commercial | If applicable | Company vehicle, rideshare |

### Insurance Records

Create separate contact cards for each:

**Defendant's Insurance:**
- Company name, mailing address, fax
- Adjuster name and direct contact (if known)
- Claim number (if opened)
- Policy number (if known)

**Client's Auto Insurance:**
- Company name, mailing address, fax
- Policy number
- UM/UIM limits
- MedPay/PIP limits
- Collision/comprehensive status

**Client's Health Insurance:**
- Company name, mailing address
- Plan type (group/individual, HMO/PPO)
- Group number, member ID
- ERISA status (employer plan = ERISA)
- Medicare/Medicaid ID (if applicable)

### Medical Provider Records

Create contact cards for every treating provider identified during intake:

- Ambulance company
- ER / Hospital
- Primary Care Physician
- Chiropractor
- Physical Therapist
- Specialists (Orthopedic, Neurologist, Pain Management, etc.)

Each record needs: Name, Address, Phone, Fax (for HIPAA requests).

### Witness Records

- Full name
- Phone number
- Email (if available)
- Relationship to parties
- Brief description of what they witnessed

## Step 3: File Folder Structure

Create the standard case folder hierarchy. See SKILL.md for the complete
directory tree under `cases/{CASE_CODE}/`.

**Naming Convention for Documents:**

```
{CASE_CODE} — {Document Type} — {Date} — {Version}
```

Examples:
- `ADAMS-001 — LOR to GEICO — 2026-02-24 — v1.docx`
- `ADAMS-001 — Police Report — 2025-12-15.pdf`
- `ADAMS-001 — ER Records — Presbyterian — 2025-12-15.pdf`

## Step 4: Calendar Critical Deadlines

### SOL Docketing

**This is the single most important task in case opening.**

| Calendar Entry | Date | Warnings |
|---------------|------|----------|
| SOL Expiration | statute_date | 1 year, 6 months, 90 days, 30 days, 14 days, 7 days |
| Filing Deadline (internal) | statute_date minus 30 days | Forces filing before actual SOL |

**Hard-code into the firm's master calendar.** Do NOT rely on a single person's
calendar. The SOL must appear in:
1. Master firm calendar (visible to all attorneys)
2. Lead Attorney's personal calendar
3. Case Manager's task list
4. CMS tickler system with automated email reminders

### Government Entity Deadlines (if applicable)

| Calendar Entry | Date | Warnings |
|---------------|------|----------|
| Tort Claims Notice Deadline | DOI + 90 days | 60, 30, 14, 7 days |
| Civil Rights Notice Deadline | DOI + 90 days | 60, 30, 14, 7 days |
| Government SOL Expiration | DOI + 2 years | 1 year, 6 months, 90 days, 30 days |

### CAL Trigger Events

Fire these events to the CAL skill for automated deadline chain computation:

```yaml
# Event 1: SOL Deadline
trigger_type: SOL-EXPIRATION
case_id: {case_id}
event_date: {statute_date}
source: "CO case opening — DOI {incident_date}, {statute_type}"
is_active: 1

# Event 2: Case Signed (internal deadlines)
trigger_type: CASE-SIGNED
case_id: {case_id}
event_date: {retainer_signed_date}
source: "CO case opening — retainer signed"
is_active: 1

# Event 3: Tort Claims Notice (if government defendant)
trigger_type: CUSTOM
case_id: {case_id}
event_date: {DOI + 90 days}
source: "CO case opening — Tort Claims Notice deadline NMSA §41-4-16(A)"
is_active: 1
# Only fire this if defendant_type = GOVERNMENT
```

## Step 5: Team Assignment

### Assignment Matrix

| Case Value | Lead Attorney | Case Manager | Legal Assistant |
|-----------|--------------|-------------|----------------|
| CATASTROPHIC | Senior Partner | Senior Paralegal | Dedicated assistant |
| HIGH | Partner or Senior Associate | Experienced Paralegal | Shared assistant |
| MEDIUM | Associate or Partner | Paralegal | Shared assistant |
| LOW | Associate | Junior Paralegal or Legal Assistant | Shared assistant |

### Internal Notification

Send to all team members:

```
NEW CASE ASSIGNMENT — {CASE_CODE}

Client: {name}
Type: {incident_type}
DOI: {incident_date}
SOL: {statute_date} ({days_remaining} days — {urgency})
Value: {estimated_value}
Government Defendant: {YES/NO}

Lead Attorney: {name}
Case Manager: {name}
Legal Assistant: {name}

PRIORITY ITEMS:
1. {Tort Claims Notice — if govt entity, deadline: {date}}
2. LOR dispatch to all insurance carriers — deadline: {signing + 48 hrs}
3. Introductory client call — deadline: {signing + 48 hrs}

Case Summary:
{incident_summary from IKP}

Injuries:
{injuries_summary from IKP}

Special Flags:
{any flags from intake — pre-existing conditions, comparative fault, etc.}
```
