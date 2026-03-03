---
name: co
display_name: "Case Opening"
description: >-
  Case Opening (CO). Manages the post-signing case-opening workflow for
  personal injury cases. Covers CMS data entry and file structure setup,
  critical deadline calendaring (SOL, Tort Claims Notice), legal team
  assignment, Letters of Representation dispatch, spoliation/preservation
  letters, official report and initial medical records requests, property
  damage and medical care assistance, introductory client call, and
  recurring check-in cadence. Triggered when IKP lead status reaches SIGNED.
  Integrates with CAL for deadline docketing, LOR for letter generation,
  and CFP for initial fact pack seeding. TRIGGERS: Use when user mentions
  "case opening", "open case", "CO", "new case setup", "first 48 hours",
  "LOR dispatch", "spoliation letter", "preservation letter", "introductory
  call", "check-in cadence", or when a signed retainer needs administrative
  processing. Do NOT use for pre-signing intake (use IKP instead). (v1.0)
version: "1.0"
category: builder
pack_consumes:
  - IKP Lead record
  - Firm config
  - Court rules
pack_produces:
  - Active case record
  - CAL trigger events
  - LOR letters
  - Case folder structure
checkpoints: 3
author: "Parnall & Adams"
license: Proprietary
---

## Pack Dependencies

**Consumes:**
- IKP Lead record (ikp_leads row with status=SIGNED)
- Firm config (`shared/config/firm-config.yaml`) — firm identity for letters
- Court rules (`shared/court-rules/`) — jurisdiction deadlines

**Produces:**
- Active case record in CMS
- CAL trigger events (SOL, Tort Claims Notice deadlines)
- LOR letters (to defendant insurance, client insurance, client health insurance)
- Spoliation/Preservation letters (when applicable)
- Official records requests (police reports, 911 audio, initial medicals)
- Case folder structure
- Recurring check-in task schedule

## Integration Points

| Skill | How CO Connects |
|-------|----------------|
| **IKP** | Upstream — receives signed lead data package |
| **CAL** | CO fires SOL-EXPIRATION and CASE-SIGNED trigger events for deadline seeding |
| **LOR** | CO triggers LOR drafting for all required letters of representation |
| **CFP** | Incident narrative from IKP seeds initial CFP EXTRACT |
| **FIN** | Fee structure from IKP retainer feeds FIN expense tracking (future) |

# CO (Case Opening) — v1.0

## Purpose

Transition a signed PI case from the intake pipeline into the firm's active
case management workflow. CO ensures that every administrative, legal, and
client-service task is completed within the first 48 hours after signing,
then establishes the ongoing monitoring cadence for the pre-litigation phase.

**The first 48 hours after signing determine the trajectory of the case.**
Delayed LORs, missed preservation deadlines, and slow evidence collection
cause irreversible harm to case value.

## Architecture

```
IKP SIGNED                    CASE SETUP                    FIRST 48 HOURS
+------------------+       +------------------+          +-------------------+
| Lead data        |       | CMS entry        |          | LOR dispatch      |
| Retainer signed  |------>| File structure    |--------->| Spoliation letters|
| Client info      |       | Deadline calendar |          | Report requests   |
| Insurance info   |       | Team assignment   |          | Initial medicals  |
+------------------+       +------------------+          | PD/medical assist |
                                                          +-------------------+
                                                                  |
                                                                  v
                                                          +-------------------+
                                                          | HANDOFF           |
                                                          | Intro call        |
                                                          | Check-in cadence  |
                                                          | Pre-lit monitor   |
                                                          +-------------------+
```

## Hard Rules

1. **48-hour deadline.** All Phase 5 items (LORs, spoliation letters, report
   requests) must be initiated within 48 hours of retainer execution.
2. **SOL must be docketed on Day 1.** The statute of limitations goes into the
   firm's master calendar the same day the case is opened, with automated
   warnings at 1 year, 6 months, 90 days, and 30 days prior.
3. **Government notice deadlines take priority.** If a Tort Claims Notice is
   required, it is the #1 priority item and must be calendared and sent before
   any other task.
4. **Preservation letters before evidence is lost.** Commercial surveillance
   footage is typically overwritten in 14-30 days. Trucking black box data
   may be overwritten. Time is critical.
5. **No case without a team.** Every case must have an assigned Lead Attorney,
   Case Manager/Paralegal, and Legal Assistant before any substantive work.
6. **Client contact within 48 hours.** The assigned Case Manager must make an
   introductory call within 48 hours of signing.
7. **Check-in cadence is mandatory.** Recurring client check-ins every 14-30
   days must be set up as automated tasks in the CMS from Day 1.

## Modes

| Mode | Purpose | Input | Output | Reference |
|------|---------|-------|--------|-----------|
| **SETUP** | CMS entry, file structure, deadlines, team assignment | Signed lead data from IKP | Active case record, folder structure, calendar entries, team assignments | `references/setup.md` |
| **DISPATCH** | First 48 hours action items | Active case + intake data | LORs, spoliation letters, report requests, medical requests, PD/medical assistance | `references/dispatch.md` |
| **HANDOFF** | Transition to pre-litigation monitoring | Complete case setup | Introductory call, check-in cadence, pre-lit monitoring plan | `references/handoff.md` |
| **CHECKLIST** | Status report of all CO tasks | Case ID | Completion status of all setup, dispatch, and handoff items | `references/checklist.md` |

**Mode selection guidance:**
- New signed case arriving from IKP → **SETUP** then **DISPATCH** then **HANDOFF**
- Checking case-opening progress → **CHECKLIST**
- Individual letter/action needed → **DISPATCH** with specific task

## Phase 4: SETUP — CMS Entry & Administrative Foundation

### Step 1: Convert Lead to Active Case

| Action | Details | Priority |
|--------|---------|----------|
| Create case in CMS | Convert IKP lead to active case | IMMEDIATE |
| Assign case ID | CMS-generated case number | IMMEDIATE |
| Link to IKP lead | Populate ikp_leads.case_id | IMMEDIATE |
| Set case type | PI subcategory from intake data | IMMEDIATE |
| Set case status | Active — Pre-Litigation | IMMEDIATE |

### Step 2: Create Contact Records

Create distinct contact cards in the CMS for each party:

| Contact Type | Data Source | Required Fields |
|-------------|-------------|-----------------|
| **Client** | IKP lead record | Name, phone, email, address, DOB, SSN (encrypted) |
| **Defendant(s)** | IKP interview | Name, address (if known), employer, insurance |
| **Defendant Insurance** | IKP interview | Company, adjuster name (if known), claim #, policy # |
| **Client Auto Insurance** | IKP interview | Company, policy #, UM/UIM limits, MedPay limits |
| **Client Health Insurance** | IKP interview | Company, plan type, group #, member # |
| **Medical Providers** | IKP interview | All treating providers — name, address, phone, fax |
| **Witnesses** | IKP interview | Names, contact info, relationship to incident |
| **Responding Officers** | IKP interview | Name, badge #, agency |

### Step 3: Create Digital File Structure

Set up the case folder structure:

```
cases/{CASE_CODE}/
├── 01-Medical-Records/
│   ├── Ambulance/
│   ├── ER-Hospital/
│   ├── Primary-Care/
│   ├── Specialists/
│   ├── Chiropractic/
│   ├── Physical-Therapy/
│   ├── Imaging/
│   ├── Pharmacy/
│   └── Bills/
├── 02-Pleadings/
│   ├── Complaint/
│   ├── Answer/
│   ├── Motions/
│   └── Orders/
├── 03-Correspondence/
│   ├── LOR/
│   ├── Insurance/
│   ├── Defendant/
│   └── Client/
├── 04-Client-Documents/
│   ├── Retainer/
│   ├── Releases-Authorizations/
│   ├── ID-Documents/
│   └── Employment/
├── 05-Investigation/
│   ├── Police-Reports/
│   ├── Photos-Video/
│   ├── Witness-Statements/
│   └── Scene-Documentation/
├── 06-Insurance/
│   ├── Defendant-Policy/
│   ├── Client-UM-UIM/
│   ├── MedPay-PIP/
│   └── Health-Insurance/
├── 07-Expenses/
├── cfp/                    # Case Fact Pack
├── dpb/                    # Discovery Pack (when litigation begins)
├── pcm/                    # Proof of Claims Matrix
├── pdm/                    # Proof of Defense Matrix
├── dvp/                    # Damages Valuation Pack
├── outcomes/               # Settlement/verdict comparables
└── drafts/                 # Draft work product
```

### Step 4: Calendar Critical Deadlines

**THE MOST IMPORTANT STEP IN CASE OPENING.**

| Deadline | Date | Source | Warnings | Priority |
|----------|------|--------|----------|----------|
| **Statute of Limitations** | DOI + SOL period | IKP statute_date | 1 year, 6 months, 90 days, 30 days | CRITICAL |
| **Tort Claims Notice** | DOI + 90 days | NMSA §41-4-16(A) | 60 days, 30 days, 14 days, 7 days | CRITICAL (govt only) |
| **Civil Rights Notice** | DOI + 90 days | NMSA §41-4A-12 | 60 days, 30 days, 14 days, 7 days | CRITICAL (govt only) |
| **Initial LOR deadline** | Signing + 48 hrs | Firm SOP | Day of signing | HIGH |
| **Intro call deadline** | Signing + 48 hrs | Firm SOP | Day of signing | HIGH |

**CAL Integration:**

Fire the following CAL trigger events:

```yaml
# Trigger 1: SOL expiration
event_type: SOL-EXPIRATION
event_date: {statute_date from IKP}
source: "IKP intake — DOI {incident_date}, statute {statute_type}"

# Trigger 2: Case signed (starts internal deadlines)
event_type: CASE-SIGNED
event_date: {retainer_signed_date}
source: "Retainer executed — IKP lead {lead_id}"

# Trigger 3: Tort Claims Notice (if government defendant)
event_type: CUSTOM
event_date: {DOI + 90 days}
source: "Tort Claims Notice deadline — NMSA §41-4-16(A)"
# Only if defendant_type = GOVERNMENT
```

### Step 5: Assign Legal Team

| Role | Responsibility | CMS Assignment |
|------|---------------|---------------|
| **Lead Attorney** | Case strategy, legal decisions, client relationship | Primary attorney |
| **Case Manager / Paralegal** | Day-to-day management, client contact, records collection | Primary paralegal |
| **Legal Assistant** | Administrative support, filing, calendar management | Support staff |

**Send internal notification:** Email/task to all team members that the file
is open and active, including:
- Case summary (from IKP)
- SOL date and urgency
- Government entity status
- Special flags from intake

## Phase 5: DISPATCH — First 48 Hours Action Items

### Action 1: Letters of Representation (LOR)

**Use the LOR skill to draft all letters.** Priority order:

| # | LOR Recipient | Purpose | Priority | LOR Skill Type |
|---|--------------|---------|----------|---------------|
| 1 | **Government Entity** (if applicable) | Tort Claims Notice — 90-day deadline | CRITICAL | tort_claim_notice |
| 2 | **Defendant's Insurance** | Put on notice, direct communications to firm, request policy limits declaration | HIGH | standard_lor |
| 3 | **Client's Auto Insurance** | Open PIP/MedPay claim, put on notice for UM/UIM | HIGH | standard_lor |
| 4 | **Client's Health Insurance** | Notify of third-party claim, manage subrogation | MEDIUM | standard_lor |

**Each LOR to defendant's insurance must include:**
- Statement of representation
- Demand that all communication be directed to the firm
- Formal request for declaration of policy limits
- Preservation of evidence language

### Action 2: Spoliation / Preservation of Evidence Letters

**When required (check all that apply):**

| Scenario | Recipient | Preserve What | Urgency |
|----------|-----------|--------------|---------|
| Commercial truck crash | Trucking company + their insurer | Black box/ECM data, driver logs, maintenance records, GPS, dashcam | CRITICAL — data can be overwritten |
| Slip and fall at business | Business owner/manager | Surveillance video, sweep/inspection logs, maintenance records, incident reports | CRITICAL — video overwrites in 14-30 days |
| Dog bite at property | Property owner/manager | Security footage, animal control records, prior complaint records | HIGH |
| Rideshare (Uber/Lyft) | Rideshare company legal dept | Driver records, trip data, app data, dashcam | HIGH |
| Intersection crash with cameras | City/DOT traffic engineering | Traffic camera footage, signal timing records | HIGH — footage retention is short |
| Medical malpractice | Healthcare facility | Medical records, incident reports, policies/procedures, staffing records | HIGH |

**Send via certified mail with return receipt.** The letter must:
- Identify the incident (date, location, parties)
- List specific categories of evidence to preserve
- Cite NM spoliation case law (e.g., *Galindo v. Western States Leasing*, 2019-NMCA-031)
- Demand preservation pending litigation
- Warn that destruction may result in adverse inference sanctions

**Use the LOR skill** with preservation language from `references/request-library.md`.

### Action 3: Request Official Reports

| Report | Request From | Method | Notes |
|--------|-------------|--------|-------|
| Police/Crash Report | Responding agency (APD, BCSO, NMSP, etc.) | Online portal, mail, or in-person | Use report # from intake |
| CAD (dispatch) records | Responding agency | IPRA request (NM) | If liability disputed |
| 911 audio | Dispatch center | IPRA request (NM) | If liability disputed |
| Fire/EMS report | Fire department | Records request | If ambulance transported |
| Animal control report | City animal services | Records request | Dog bite cases |
| Incident report | Business/property | Preservation letter + request | Premises cases |

### Action 4: Request Initial Medical Records

Send HIPAA releases to the following providers to obtain records that
tie injuries directly to the DOI:

| Provider | Records Requested | Priority |
|----------|------------------|----------|
| Ambulance company | Trip report, patient care record | HIGH |
| Emergency Room / Hospital | ER records, imaging, discharge summary | HIGH |
| Urgent Care | Visit notes, imaging | HIGH |
| Primary Care Physician | Records from DOI forward | MEDIUM |
| Chiropractor | Records from DOI forward | MEDIUM |
| Physical Therapist | Records from DOI forward | MEDIUM |

**Purpose:** Establish the causal chain — incident → immediate treatment →
documented injuries on or near the DOI. This is the foundation for
proving causation.

### Action 5: Assist with Immediate Client Needs

**Property Damage (MVC cases):**

| Task | Action | Notes |
|------|--------|-------|
| Vehicle location | Confirm where vehicle is (tow yard, body shop, home) | Prevent storage fees from accumulating |
| Insurance claim | Open PD claim with defendant's insurance or client's collision | Get claim assigned |
| Appraisal | Request vehicle appraisal / damage estimate | For repair or total loss |
| Rental car | Help client obtain rental car through insurance | Or arrange LOP rental |
| Total loss | If total loss, advise on fair market value negotiation | Do not let client accept lowball |

**Medical Care (if client lacks coverage):**

| Task | Action | Notes |
|------|--------|-------|
| LOP referral | Connect client with providers who accept Letters of Protection | Firm's LOP provider network |
| Urgent care | If client needs immediate care, provide LOP provider contact | Same-day if possible |
| Specialist referral | If specific specialist needed (ortho, neuro, etc.) | From firm's provider network |
| MedPay application | Help client access MedPay/PIP for immediate bills | File with client's auto carrier |

## Phase 6: HANDOFF — Transition to Pre-Litigation Monitoring

### Action 1: Introductory Call (Within 48 Hours)

The assigned Case Manager or Paralegal calls the client to:

1. **Introduce themselves** as the day-to-day point of contact
2. **Confirm** that LORs have been sent to insurance companies
3. **Review** the Welcome Packet rules (medical care, social media, communication)
4. **Set expectations** for the pre-litigation timeline:
   - Treatment phase: client focuses on recovery
   - Records collection: firm gathers medical records continuously
   - Maximum Medical Improvement (MMI): when doctors say recovery is complete
   - Demand phase: settlement demand sent after MMI
   - Litigation: if settlement fails, lawsuit is filed
5. **Ask** if the client has any immediate questions or needs
6. **Confirm** contact information is current

### Action 2: Establish Check-In Cadence

Set up automated, recurring CMS tasks:

| Cadence | Task | Assigned To |
|---------|------|-------------|
| Every 14 days (serious injuries) | Client check-in call | Case Manager |
| Every 30 days (standard cases) | Client check-in call | Case Manager |
| Every 30 days | Medical records status review | Legal Assistant |
| Every 60 days | Case status review with attorney | Lead Attorney |
| Every 90 days | Comprehensive case assessment | Lead Attorney + Case Manager |

### Check-In Call Agenda

During each recurring client check-in:

1. **Physical recovery:** "How are you feeling? Any new symptoms?"
2. **Treatment compliance:** "Are you attending all your appointments?"
3. **Provider changes:** "Have you started seeing any new doctors?"
4. **Work status:** "Are you back to work? Any changes?"
5. **Insurance contact:** "Has anyone from the insurance company contacted you?"
6. **Update firm records:** Add new providers to medical tracking list
7. **Encourage treatment:** Remind about gap-in-treatment risks
8. **Next steps:** Explain what the firm is currently working on

### Action 3: Pre-Litigation Monitoring Plan

| Monitoring Task | Frequency | Purpose |
|----------------|-----------|---------|
| Medical records collection | Ongoing | Order records from every new provider |
| Medical bills tracking | Ongoing | Running total of specials |
| Provider list maintenance | Per check-in | Update with new providers |
| MMI watch | Per check-in | Monitor for treatment completion |
| Insurance coverage investigation | As needed | Policy limits, stacking, UM/UIM |
| Liens tracking | Ongoing | Health insurance, Medicare, Medicaid, VA |
| Property damage resolution | Until resolved | Repair/total loss completion |

### MMI Trigger

When the client reaches Maximum Medical Improvement (MMI):
- Transition from Pre-Litigation Monitoring to Settlement Preparation
- Order FINAL medical records and bills from all providers
- Trigger DVP (Damages Valuation Pack) skill for damages calculation
- Begin demand preparation workflow: CFP → DVP → DC → DRO → Demand

## Output Contract (every response)

### 1) Mode + Status Statement
Current mode (SETUP / DISPATCH / HANDOFF / CHECKLIST), case ID, days since signing.

### 2) Work Product
- SETUP: CMS entry confirmation, folder structure, calendar entries, team assignments
- DISPATCH: LOR status, spoliation letter status, report request status, medical request status
- HANDOFF: Intro call confirmation, check-in schedule, monitoring plan
- CHECKLIST: Complete status of all CO tasks with completion dates

### 3) Outstanding Items
- Tasks not yet completed with priority and deadline
- Missing information needed to complete tasks
- Escalation items requiring attorney attention

### 4) Next Steps
Concrete next actions with deadlines: "Send spoliation letter to business by
{date} — surveillance footage may be overwritten" or "Schedule intro call with
client for {date}."

## CO Checklist Template

```
CASE OPENING CHECKLIST — {CASE_CODE}
Client: {name}
Signed: {date}
Days Since Signing: {n}

SETUP (Day 1)
[ ] Case created in CMS — Case ID: ___
[ ] Contact records created (Client, Defendant, Insurance, Providers)
[ ] File folder structure created
[ ] SOL docketed in master calendar — Date: ___
[ ] Tort Claims Notice deadline docketed (if govt) — Date: ___
[ ] Lead Attorney assigned: ___
[ ] Case Manager assigned: ___
[ ] Legal Assistant assigned: ___
[ ] Internal team notification sent

DISPATCH (First 48 Hours)
[ ] Tort Claims Notice sent (if govt defendant) — Date: ___
[ ] LOR to Defendant Insurance — Date: ___
[ ] LOR to Client Auto Insurance — Date: ___
[ ] LOR to Client Health Insurance — Date: ___
[ ] Spoliation/Preservation letters sent (if applicable) — Date: ___
[ ] Police/Crash Report requested — Date: ___
[ ] 911/CAD records requested (if applicable) — Date: ___
[ ] Ambulance records requested — Date: ___
[ ] ER/Hospital records requested — Date: ___
[ ] Property damage claim opened (if MVC) — Date: ___
[ ] LOP referral provided (if needed) — Date: ___

HANDOFF (Within 48 Hours)
[ ] Introductory call completed — Date: ___
[ ] Check-in cadence established — Every ___ days
[ ] First check-in scheduled — Date: ___
[ ] Pre-litigation monitoring plan active

STATUS: ___ / ___ items complete
```

## Reference Files

- `references/setup.md` — CMS entry procedures, folder structure, calendar integration
- `references/dispatch.md` — LOR dispatch, spoliation letters, report requests, medical requests
- `references/handoff.md` — Introductory call script, check-in cadence, monitoring plan
- `references/checklist.md` — Complete case-opening checklist with status tracking

## Common Pitfalls

1. **Delayed LOR dispatch** — Insurance companies start investigating immediately. Get LORs out Day 1.
2. **Missing spoliation letter** — Surveillance footage overwrites in 14-30 days. Send ASAP.
3. **SOL not calendared** — The #1 malpractice risk. Docket on Day 1 with multiple warnings.
4. **No introductory call** — Client feels abandoned. Call within 48 hours.
5. **No check-in cadence** — Client stops treatment, gaps develop, case value drops.
6. **Government notice missed** — 90-day Tort Claims Notice is a hard deadline.
7. **Initial medicals not ordered** — ER and ambulance records establish causation chain.
8. **Property damage neglected** — Client frustration if vehicle issues are ignored.
