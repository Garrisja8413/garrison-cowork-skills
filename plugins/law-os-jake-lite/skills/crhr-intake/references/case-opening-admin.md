# Phase 4: Case Opening & Administrative Setup

## Purpose

Secure the government's notice deadlines to prevent an immediate legal
malpractice claim. Set up the case in the CMS with civil-rights-specific
fields, dual-docket all critical deadlines, and draft and serve the NM Tort
Claims Notice to the correct statutory recipients.

## Step 10: System Setup & Strict Docketing

### Step 10.1: Convert Lead to Active Case

| Action | Details | Priority |
|--------|---------|----------|
| Create case in CMS | Convert CRHR lead to active case | IMMEDIATE |
| Assign case ID | CMS-generated case number | IMMEDIATE |
| Link to CRHR lead | Populate `crhr_leads.case_id` | IMMEDIATE |
| Set case type | CIVIL-RIGHTS or HUMAN-RIGHTS subcategory | IMMEDIATE |
| Set case status | Active — Pre-Litigation | IMMEDIATE |
| Set forum | NMCRA / §1983 / BOTH / NMHRA / FTCA | IMMEDIATE |

### Step 10.2: Create Contact Records (Civil Rights Specific)

| Contact Type | Data Source | Required Fields |
|-------------|-------------|-----------------|
| **Client** | CRHR lead record | Name, phone, email, address, DOB |
| **Defendant Officer(s)** | Interview | Name, badge #, rank, agency, unit/division |
| **Defendant Agency** | Triage | Agency name, address, IPRA contact, legal department |
| **Government Entity** | Triage | Entity (City/County/State), Mayor/Manager, Clerk |
| **Criminal Defense Attorney** | Heck check | Name, phone, firm, criminal case # |
| **Bystander Witnesses** | Interview | Names, phone, email, relationship to scene |
| **Medical Providers** | Interview | Treating providers — name, address, phone, fax |
| **Client Psychologist/Counselor** | Interview | Name, practice, phone (if in treatment) |

### Step 10.3: Create Digital File Structure (Civil Rights Variant)

```
cases/{CASE_CODE}/
├── 01-Medical-Records/
│   ├── ER-Hospital/
│   ├── Ambulance/
│   ├── Primary-Care/
│   ├── Specialists/
│   ├── Mental-Health-Counseling/     # CR-specific: PTSD/trauma treatment
│   ├── Imaging/
│   └── Bills/
├── 02-Pleadings/
│   ├── Complaint/
│   ├── Answer/
│   ├── Motions/
│   └── Orders/
├── 03-Correspondence/
│   ├── Tort-Claims-Notice/           # CR-specific: statutory notices
│   ├── CRA-Notice/                   # CR-specific: Civil Rights Act notice
│   ├── IPRA-Requests/                # CR-specific: public records requests
│   ├── IPRA-Responses/               # CR-specific: records received
│   ├── Spoliation-Letters/           # CR-specific: preservation demands
│   ├── EEOC-NMHRB/                   # CR-specific: discrimination charges
│   ├── Criminal-Defense-Coordination/ # CR-specific: Heck coordination
│   └── Client/
├── 04-Client-Documents/
│   ├── Retainer/
│   ├── Releases-Authorizations/
│   ├── Fishbowl-Acknowledgment/      # CR-specific: risk acknowledgment
│   ├── Social-Media-Agreement/       # CR-specific: media lockdown
│   └── Criminal-Case-Waiver/         # CR-specific
├── 05-Investigation/
│   ├── Bodycam-OBRD/                 # CR-specific: lapel camera footage
│   ├── Dashcam/                      # CR-specific
│   ├── Jail-CCTV/                    # CR-specific: facility video
│   ├── Client-Cell-Video/            # CR-specific: client recordings
│   ├── Bystander-Video/              # CR-specific
│   ├── Police-Reports/
│   ├── Use-of-Force-Reports/         # CR-specific
│   ├── Internal-Affairs/             # CR-specific: IA history
│   ├── CAD-911-Records/              # CR-specific: dispatch records
│   ├── Witness-Statements/
│   └── Scene-Documentation/
├── 06-Criminal-Case/                 # CR-specific: parallel criminal matter
│   ├── Criminal-Discovery/           # Shared from criminal defense
│   ├── Court-Orders/
│   ├── Plea-Agreements/
│   └── Coordination-Notes/
├── 07-Grievances-PLRA/               # CR-specific: jail cases only
│   ├── Grievance-Forms/
│   ├── Appeal-Records/
│   └── Exhaustion-Documentation/
├── 08-Expenses/
├── cfp/
├── dpb/
├── pcm/
├── pdm/
├── dvp/
├── outcomes/
└── drafts/
```

### Step 10.4: Dual-Docketing Protocol (Code Red)

**THE MOST CRITICAL STEP IN CIVIL RIGHTS CASE OPENING.**

Two separate staff members must independently docket every deadline. This is
a non-negotiable firm requirement — single-point-of-failure docketing on a
90-day notice deadline is per se malpractice exposure.

| Deadline | Computation | Docketed By | Verified By | Warning Intervals |
|----------|------------|-------------|-------------|-------------------|
| **90-Day Tort Claims Notice** | DOI + 90 calendar days | Staff #1 | Staff #2 | 60d, 30d, 14d, 7d, 3d |
| **90-Day CRA Notice** | DOI + 90 calendar days | Staff #1 | Staff #2 | 60d, 30d, 14d, 7d, 3d |
| **2-Year SOL (NMCRA)** | DOI + 2 years | Staff #1 | Staff #2 | 1yr, 6mo, 90d, 30d |
| **3-Year SOL (§ 1983)** | DOI + 3 years | Staff #1 | Staff #2 | 1yr, 6mo, 90d, 30d |
| **300-Day EEOC/NMHRB** | Discriminatory act + 300 days | Staff #1 | Staff #2 | 180d, 90d, 30d, 14d |
| **2-Year FTCA (SF-95)** | Date of incident + 2 years | Staff #1 | Staff #2 | 1yr, 6mo, 90d, 30d |
| **6-Month Wrongful Death Notice** | Date of death + 6 months | Staff #1 | Staff #2 | 90d, 60d, 30d, 14d, 7d |

### CAL Integration — Trigger Events

```yaml
# Trigger 1: SOL expiration (NMCRA — 2 years)
event_type: SOL-EXPIRATION
event_date: {DOI + 2 years}
source: "CRHR intake — DOI {incident_date}, NMCRA §41-4A-14"

# Trigger 2: SOL expiration (§ 1983 — 3 years)
event_type: SOL-EXPIRATION
event_date: {DOI + 3 years}
source: "CRHR intake — DOI {incident_date}, §1983 via NMSA §37-1-8"

# Trigger 3: Tort Claims Notice (90 days)
event_type: CUSTOM
event_date: {DOI + 90 days}
source: "Tort Claims Notice deadline — NMSA §41-4-16(A)"
priority: CODE-RED

# Trigger 4: CRA Notice (90 days)
event_type: CUSTOM
event_date: {DOI + 90 days}
source: "Civil Rights Act Notice deadline — NMSA §41-4A-12"
priority: CODE-RED

# Trigger 5: EEOC/NMHRB charge (300 days, if discrimination)
event_type: CUSTOM
event_date: {discriminatory_act + 300 days}
source: "EEOC/NMHRB charge deadline — NMSA §28-1-10"
priority: CRITICAL

# Trigger 6: Case signed (starts internal deadlines)
event_type: CASE-SIGNED
event_date: {retainer_signed_date}
source: "CRHR retainer executed — lead {lead_id}"
```

### Step 10.5: Assign Legal Team

| Role | Responsibility | CMS Assignment |
|------|---------------|---------------|
| **Lead Civil Rights Attorney** | Forum strategy, case evaluation, depositions | Primary attorney |
| **Case Manager / Paralegal** | IPRA requests, spoliation letters, evidence tracking | Primary paralegal |
| **Legal Assistant** | Docketing, file maintenance, administrative correspondence | Support staff |

Send internal notification to all team members including:
- Case summary from CRHR intake
- Entity type and defendant identification
- ALL deadline dates with urgency tiers
- Heck v. Humphrey status
- PLRA status (if jail/prison case)
- Criminal defense attorney contact info (if applicable)

## Step 11: Draft and Serve NM Tort Claims Notice

### Notice Requirements (NMSA §41-4-16)

The Tort Claims Notice must contain:
1. Name of the claimant
2. Date, time, and location of the incident
3. Circumstances of the incident
4. Nature and extent of injuries
5. Name(s) of the governmental entity/employee(s) involved
6. Statement of intent to pursue a lawsuit

### Service Requirements by Entity

**Sending notice only to the police chief does NOT satisfy NM law.** The
notice must be served on the specific officials mandated by statute.

| Defendant Entity | Must Serve | Address/Method |
|-----------------|-----------|----------------|
| **City of Albuquerque / APD** | Mayor of Albuquerque AND City Clerk | City Hall, One Civic Plaza NW, Albuquerque, NM 87102 |
| **Bernalillo County / BCSO** | County Manager AND County Clerk | Bernalillo County Government Center, One Civic Plaza NW, 10th Floor, Albuquerque, NM 87102 |
| **City of Las Cruces / LCPD** | City Manager AND City Clerk | City Hall, 700 N. Main Street, Las Cruces, NM 88001 |
| **City of Santa Fe / SFPD** | Mayor AND City Clerk | City Hall, 200 Lincoln Avenue, Santa Fe, NM 87501 |
| **City of Rio Rancho / RRPD** | Mayor AND City Clerk | City Hall, 3200 Civic Center Circle, Rio Rancho, NM 87144 |
| **NM State Police / State Agency** | Risk Management Division, NM General Services Department | 1100 S. St. Francis Drive, Room 1171, Santa Fe, NM 87505 |
| **NM Corrections Department** | Risk Management Division, NM General Services Department | Same as above |
| **Public School District** | Superintendent AND Board Secretary | District administrative offices |
| **State University** | University General Counsel AND Risk Management Division | University legal office + GSD |

### Service Method

- **Certified mail with return receipt** — REQUIRED
- Retain certified mail receipt and return card as proof of service
- File copies of notice + proof of service in case folder
- Log service in CMS and `crhr_activity_log`

### Notice Template Structure

```
[FIRM LETTERHEAD]

VIA CERTIFIED MAIL — RETURN RECEIPT REQUESTED

[Date]

[Recipient Name and Title]
[Entity Name]
[Address]

RE:    NOTICE OF TORT CLAIM / CIVIL RIGHTS ACT CLAIM
       Claimant: [Client Name]
       Date of Incident: [Date]
       Location: [Location]

Dear [Title] [Name]:

Pursuant to NMSA §41-4-16 (New Mexico Tort Claims Act) and NMSA §41-4A-12
(New Mexico Civil Rights Act), please accept this letter as formal notice of
[Client Name]'s intent to pursue a civil claim against [Entity Name] and its
employees.

I. INCIDENT DESCRIPTION
[Date, time, and location of the incident]
[Circumstances of the incident — factual narrative]
[Names of employees involved, if known]

II. NATURE AND EXTENT OF INJURIES
[Physical injuries sustained]
[Medical treatment received]
[Ongoing medical needs]
[Emotional/psychological impact]

III. CLAIMS
[Constitutional violations identified]
[Statutory claims under NMTCA and/or NMCRA]

IV. INTENT TO PURSUE LAWSUIT
[Client Name] intends to file a civil lawsuit arising from this incident
and hereby preserves all rights under the New Mexico Tort Claims Act,
the New Mexico Civil Rights Act, 42 U.S.C. § 1983, and any other
applicable federal or state law.

V. PRESERVATION OF EVIDENCE
[Entity Name] is hereby directed to preserve all evidence related to
this incident, including but not limited to bodycam/OBRD footage, dashcam
footage, CAD records, 911 audio, police reports, use of force reports,
internal affairs records, and all other related documents and recordings.

[Attorney Signature Block]
```

## Case Opening Completion Checklist

```
CASE OPENING CHECKLIST — {CASE_CODE} (Civil Rights)
Client: {name}
Signed: {date}
Days Since Signing: {n}
Entity: {entity_name}
Entity Type: {entity_type}
Forum: {NMCRA / §1983 / BOTH / NMHRA / FTCA}

SETUP (Day 1)
[ ] Case created in CMS — Case ID: ___
[ ] Case type set: CIVIL-RIGHTS / HUMAN-RIGHTS
[ ] Contact records created (Client, Officers, Agency, Entity, Witnesses)
[ ] Criminal defense attorney record created (if applicable)
[ ] File folder structure created (CR variant)
[ ] Lead Attorney assigned: ___
[ ] Case Manager assigned: ___
[ ] Legal Assistant assigned: ___
[ ] Internal team notification sent with all deadlines

DUAL-DOCKETING (Code Red — Day 1)
[ ] 90-Day Tort Claims Notice docketed — Due: ___ — Staff #1: ___ Staff #2: ___
[ ] 90-Day CRA Notice docketed — Due: ___ — Staff #1: ___ Staff #2: ___
[ ] 2-Year SOL (NMCRA) docketed — Due: ___ — Staff #1: ___ Staff #2: ___
[ ] 3-Year SOL (§ 1983) docketed — Due: ___ — Staff #1: ___ Staff #2: ___
[ ] 300-Day EEOC/NMHRB docketed (if discrimination) — Due: ___ — Staff #1: ___ Staff #2: ___
[ ] CAL trigger events fired

TORT CLAIMS NOTICE (Priority #1)
[ ] Notice drafted — Date: ___
[ ] Served on {Recipient 1}: ___ — Certified Mail #: ___
[ ] Served on {Recipient 2}: ___ — Certified Mail #: ___
[ ] Return receipts filed
[ ] Logged in CMS and activity log

STATUS: ___ / ___ items complete
```
