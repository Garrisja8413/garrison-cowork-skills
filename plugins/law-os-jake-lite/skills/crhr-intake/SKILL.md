---
name: crhr-intake
display_name: "Civil Rights & Human Rights Intake"
description: >-
  Civil Rights & Human Rights Intake (CRHR-INTAKE). NM-specific SOP-driven
  intake pipeline for police misconduct, excessive force, wrongful arrest,
  jail conditions, and employment/housing/public-accommodation discrimination.
  Navigates NMCRA (no qualified immunity), 42 USC 1983, NMTCA 90-day notice,
  NMHRA/EEOC 300-day charge, FTCA/Bivens, Heck v Humphrey criminal-status
  trap, and PLRA grievance exhaustion. Six phases: Entity & Deadline Triage,
  Comprehensive Rights Interview, Case Evaluation & Onboarding, Case Opening
  & Admin Setup, First-48-Hours Evidence Rescue (IPRA, spoliation, admin
  charges), and Pre-Litigation Investigation & Handoff. TRIGGERS: Use when
  user mentions "civil rights intake", "police misconduct", "excessive force",
  "wrongful arrest", "jail conditions", "NMCRA", "1983 claim", "human rights",
  "discrimination", "EEOC", "NMHRA", "IPRA request", or "qualified immunity".
  Do NOT use for standard PI intake (use IKP) or post-signing case opening
  without civil rights elements (use CO). (v1.0)
version: "1.0"
category: builder
pack_consumes:
  - Intake info
pack_produces:
  - CRHR Lead record
  - CRHR Activity Log entries
  - Intake Summary Pack (civil rights variant)
checkpoints: 3
author: "Parnall & Adams"
license: Proprietary
---

# CRHR-INTAKE (Civil Rights & Human Rights Intake) — v1.0

## What This Skill Does

Manages the complete intake pipeline for New Mexico civil rights and human
rights cases — from the moment a prospective client contacts the firm through
case opening, evidence preservation, and pre-litigation investigation handoff.

Civil rights cases (police misconduct, excessive force, wrongful arrest, jail
conditions) and human rights cases (employment, housing, and public
accommodation discrimination) are among the most procedurally complex and
fiercely defended matters in New Mexico law. The 2021 New Mexico Civil Rights
Act (NMCRA) banned qualified immunity for state and local actors, creating a
powerful state-court pathway — but navigating the intersection of the NMCRA,
federal 42 U.S.C. § 1983, the NM Tort Claims Act (NMTCA), and the NM Human
Rights Act (NMHRA) demands a zero-margin-for-error intake process.

This skill implements all six phases of the firm's Civil Rights & Human Rights
intake SOP.

## Architecture

```
PHASE 1: TRIAGE          PHASE 2: INTERVIEW       PHASE 3: EVALUATE
+------------------+    +---------------------+    +------------------+
| Entity ID        |    | Incident narrative   |    | Forum selection: |
| (who is bad      |    | (4th/1st Amend,     |    | NMCRA vs §1983  |
|  actor?)         |--->| discrimination)      |--->| Hybrid retainer |
| Deadline screen  |    | Digital evidence     |    | Client warnings |
| Heck v Humphrey  |    | Witness ID           |    | Fishbowl brief  |
| PLRA check       |    | Damages assessment   |    +------------------+
+------------------+    +---------------------+           |
                                                           v
PHASE 4: CASE OPEN       PHASE 5: EVIDENCE        PHASE 6: HANDOFF
+------------------+    +---------------------+    +------------------+
| CMS setup        |    | IPRA requests        |    | Criminal coord   |
| Dual-docketing   |    | Spoliation letters   |    | Video review     |
| 90-day notice    |    | Admin charges        |    | Psych management |
| 300-day EEOC     |    | (NMHRB/EEOC)        |    | 30-day cadence   |
| SOL calendaring  |    +---------------------+    +------------------+
+------------------+
```

## Pack Dependencies

**Consumes:**
- Firm config (`shared/config/firm-config.yaml`) — jurisdiction defaults
- Court rules (`shared/court-rules/`) — SOL and notice statutes

**Produces:**
- CRHR Lead record (`crhr_leads` row)
- CRHR Activity Log entries (`crhr_activity_log` rows)
- CRHR Intake Summary Pack — civil-rights-specific data for downstream skills

## Integration Points

| Downstream Skill | Trigger | Data Passed |
|-----------------|---------|-------------|
| **CAL** | SOL + notice deadlines computed | `statute_date`, `notice_deadline`, `eeoc_deadline` |
| **CO** | Lead status → SIGNED | Full CRHR intake record for case-opening workflow |
| **LOR** | Attorney accepts case | Entity data, incident info for Tort Claim / CRA Notice |
| **CFP** | Case opened | Incident narrative seeds initial CFP EXTRACT |

## Hard Rules

1. **Entity first.** Before hearing the full narrative, establish WHO violated
   the client's rights. The entity dictates every statutory deadline.
2. **Heck check is mandatory.** Search NM Courts (SOPA) for pending criminal
   charges tied to the incident. If charges are pending, get the criminal
   defense attorney's name immediately.
3. **PLRA exhaustion is mandatory for jail/prison cases.** If the injury
   occurred in a correctional facility, confirm formal written grievances were
   filed and appealed to the highest level. No exhaustion = no federal case.
4. **90-day Tort Claims Notice is a hard kill.** If the bad actor is a state,
   county, or municipal entity, the NMTCA/NMCRA 90-day notice deadline must
   be calculated on first contact. If the caller is within 10 days, escalate
   to an attorney immediately — do not continue intake.
5. **Dual-docketing (Code Red).** Two separate staff members must independently
   docket the 90-day notice deadline. Single-point-of-failure docketing is
   unacceptable for this deadline.
6. **300-day EEOC/NMHRA deadline.** For employment/housing/public-accommodation
   discrimination, the 300-day charge-filing deadline must be calculated and
   tracked alongside any tort claims deadlines.
7. **Never skip criminal coordination.** If the client has pending criminal
   charges, the civil rights attorney must contact the criminal defense
   attorney within 48 hours to coordinate strategy.
8. **Video or it didn't happen.** Bodycam/lapel camera footage requests (via
   IPRA) must be launched within 48 hours of case acceptance. Jail CCTV
   overwrites in 14–30 days.
9. **Fishbowl warning is mandatory.** Every civil rights client must be warned
   that suing the police/government makes their entire life public record.
   Social media lockdown and media blackout instructions are non-optional.
10. **No frivolous filings.** If IPRA bodycam footage definitively shows the
    client lied and was the clear aggressor, the firm must ethically disengage
    before filing. Rule 11 sanctions are real.

## Modes

| Mode | Purpose | Input | Output | Reference |
|------|---------|-------|--------|-----------|
| **TRIAGE** | Entity ID, deadline screen, Heck/PLRA checks | Name, DOI, incident basics, bad actor | Entity classification, deadline calculations, criminal status | `references/triage-entity-deadline.md` |
| **INTERVIEW** | Comprehensive rights interview | Lead ID + client on phone/in office | Full incident narrative, evidence inventory, damages profile | `references/rights-interview.md` |
| **EVALUATE** | Attorney case evaluation & forum strategy | Complete interview record | Forum recommendation (NMCRA vs §1983), accept/decline, retainer type | `references/case-eval-onboarding.md` |
| **OPEN** | Case opening & administrative setup | Accepted lead + retainer details | CMS record, dual-docketed deadlines, Tort Claims Notice | `references/case-opening-admin.md` |
| **RESCUE** | First 48 hours evidence preservation | Active case | IPRA requests, spoliation letters, admin charges filed | `references/evidence-rescue.md` |
| **HANDOFF** | Pre-litigation investigation & monitoring | Complete case setup | Criminal coordination, video review, psych referral, check-in cadence | `references/pre-litigation-handoff.md` |

**Mode selection guidance:**
- New prospective civil rights client → **TRIAGE** then **INTERVIEW**
- Attorney reviewing screened lead → **EVALUATE**
- Client signed, case opening → **OPEN** then **RESCUE** then **HANDOFF**
- Checking case status → use any mode to review current state

**Checkpoint 1 (TRIAGE → INTERVIEW):** Attorney reviews entity classification,
deadline calculations, and Heck/PLRA status before proceeding to full interview.

**Checkpoint 2 (EVALUATE):** Attorney makes forum selection (NMCRA vs. § 1983
vs. both) and accept/decline decision.

**Checkpoint 3 (RESCUE → HANDOFF):** Attorney reviews IPRA returns and bodycam
footage before confirming case viability and authorizing continued representation.

## Phase 1: TRIAGE — Entity & Deadline Screen

### Step 1: Identify the Bad Actor (Entity Test)

| Entity Type | Legal Framework | Key Deadline | Statute |
|-------------|----------------|--------------|---------|
| **State/County/Municipal** (APD, BCSO, NMSP, MDC, schools) | NMTCA + NMCRA | 90-day Tort Claims Notice | NMSA §41-4-16(A), §41-4A-12 |
| **Federal Agent** (FBI, DEA, ICE, Border Patrol, BIA) | FTCA + Bivens | 2-year SF-95 filing | 28 U.S.C. §2401(b) |
| **Private Employer/Landlord** (discrimination) | NMHRA + Title VII | 300-day EEOC/NMHRB charge | NMSA §28-1-10, 42 U.S.C. §2000e-5 |

**Escalation triggers:**
- 90-day notice deadline within 10 days → IMMEDIATE attorney escalation
- 90-day notice deadline within 30 days → same-day attorney review
- 300-day EEOC deadline within 30 days → urgent attorney review

### Step 2: Criminal Status Check (Heck v. Humphrey)

Search SOPA (NM Secured Odyssey Public Access) for the client's name.

| Criminal Status | Impact on Civil Claim | Action |
|----------------|----------------------|--------|
| No charges / charges dismissed | No Heck barrier | Proceed normally |
| Pending charges | Potential Heck barrier | Get criminal attorney name, coordinate |
| Guilty plea to resisting/battery on officer | Likely fatal to excessive force claim | Attorney must evaluate before proceeding |
| Convicted at trial | May bar claims that would invalidate conviction | Attorney evaluation required |

### Step 3: PLRA Grievance Check (Jail/Prison Cases Only)

| Question | Required Answer for Federal Claim |
|----------|----------------------------------|
| "Did you file formal, written grievances?" | Must be YES |
| "Did you use the jail's kiosk/form system?" | Must be YES |
| "Did you appeal to the highest level?" | Must be YES |

If grievances were NOT exhausted: flag as PLRA-DEFICIENT. The federal § 1983
claim is likely barred. State NMCRA claim may still be viable (PLRA does not
apply to state claims under the NMCRA).

### Triage Output

```
crhr_leads row:
  lead_id:          CRHR-LEAD-{auto}
  lead_date:        {today ISO-8601}
  entity_type:      STATE-LOCAL | FEDERAL | PRIVATE-EMPLOYER | PRIVATE-LANDLORD
  entity_name:      {specific agency/employer}
  notice_deadline:  {DOI + 90 days, if state/local}
  eeoc_deadline:    {DOI + 300 days, if discrimination}
  sol_date:         {computed SOL expiration}
  heck_status:      CLEAR | PENDING-CHARGES | CONVICTED | PLEA
  criminal_case_no: {if applicable}
  criminal_attorney:{name, if applicable}
  plra_status:      N/A | EXHAUSTED | DEFICIENT
  status:           TRIAGED
```

## Phase 2: INTERVIEW — Comprehensive Rights Interview

See `references/rights-interview.md` for complete question bank.

### Claim Identification Categories

| Constitutional Basis | Key Questions | Evidence Priorities |
|---------------------|---------------|-------------------|
| **4th Amendment** (search/seizure/force) | Reason for stop? Warrant? Resistance? Exact force used? Warnings given? | Bodycam, dashcam, bystander video, medical records |
| **1st Amendment** (retaliation) | Was client filming police? Protesting? Speaking out? | Video of filming/protest, arrest records, timeline |
| **14th Amendment** (equal protection) | Protected class? Comparators treated differently? | Witness statements, pattern evidence, statistics |
| **NMHRA** (discrimination) | Protected class? Employer/landlord/public accommodation? Paper trail? | Emails, HR complaints, personnel files, comparator evidence |

### Evidence Inventory

**Civil rights cases live and die by video.**

| Evidence Type | Question | Preservation Urgency |
|--------------|----------|---------------------|
| Client cell phone video | "Did you or a bystander record this?" | Secure copy immediately |
| Bodycam/OBRD footage | "Were officers wearing body cameras?" | IPRA request within 48 hours |
| Dashcam footage | "Were there patrol car cameras?" | IPRA request within 48 hours |
| Jail CCTV | "Were there cameras in the area of the facility?" | CRITICAL — overwrites in 14-30 days |
| Civilian witnesses | "Names and contact info of every bystander" | Contact within 1 week |

### Damages Assessment

| Damages Category | Key Questions |
|-----------------|---------------|
| Physical injury | Hospital? Visible scars? Permanent injuries? |
| Loss of liberty | Hours/days unlawfully detained? |
| Employment loss | Lost wages? Back pay/front pay calculations? |
| Emotional distress | PTSD symptoms? Seeking counseling? |
| Punitive damages | Was the conduct willful, reckless, or egregious? |

## Phase 3: EVALUATE — Case Evaluation & Client Onboarding

See `references/case-eval-onboarding.md` for complete evaluation framework.

### Forum Selection Strategy (The NM Advantage)

| Forum | Pros | Cons |
|-------|------|------|
| **NM State Court (NMCRA)** | No qualified immunity; NM jury pool; faster docket | $2M cap on damages + fees per claim |
| **Federal Court (§ 1983)** | Uncapped damages; § 1988 fee-shifting | Qualified immunity defense; federal jury pool |
| **Both (parallel filing)** | Maximum leverage; preserves all options | Higher litigation cost; coordination burden |

### Retainer: Hybrid Fee Agreement

Civil rights retainers MUST include:
- **Fee-shifting clause:** Firm takes EITHER contingency percentage (33%-40%)
  OR court-awarded statutory fees (§ 1988 / NMCRA), whichever is greater.
- **Criminal case waiver:** Firm does NOT represent client in underlying
  criminal matters.
- **Scope limitation:** Defines exactly which claims and which defendants
  are covered.

### Fishbowl Warning (Mandatory)

Every civil rights client must be warned:
1. Suing police/government makes their entire life public record
2. Defense will investigate past arrests, drug use, mental health, employment
3. Social media lockdown is immediate and non-negotiable
4. Media blackout — no statements to KOB, KOAT, KRQE without attorney approval
5. Character assassination is the defense's primary strategy

## Phase 4: OPEN — Case Opening & Administrative Setup

See `references/case-opening-admin.md` for complete procedures.

### Dual-Docketing Protocol (Code Red)

| Deadline | Computation | Docketed By | Verified By |
|----------|------------|-------------|-------------|
| **90-Day Tort Claims Notice** | DOI + 90 calendar days | Staff Member 1 | Staff Member 2 |
| **3-Year SOL (§ 1983)** | DOI + 3 years | Staff Member 1 | Staff Member 2 |
| **2-Year SOL (NMCRA)** | DOI + 2 years | Staff Member 1 | Staff Member 2 |
| **300-Day EEOC/NMHRA** | Discriminatory act + 300 days | Staff Member 1 | Staff Member 2 |

### Tort Claims Notice — Service Requirements

| Defendant Entity | Serve Notice On | Statute |
|-----------------|-----------------|---------|
| City of Albuquerque / APD | Mayor AND City Clerk | NMSA §41-4-16(A) |
| Bernalillo County / BCSO | County Manager AND County Clerk | NMSA §41-4-16(A) |
| NM State Police / State Agency | Risk Management Division, NM GSD | NMSA §41-4-16(A) |
| Public School District | Superintendent AND Board Secretary | NMSA §41-4-16(A) |

**Sending notice only to the police chief does NOT satisfy NM law.**

## Phase 5: RESCUE — First 48 Hours Evidence Preservation

See `references/evidence-rescue.md` for complete procedures.

### IPRA Requests (Inspection of Public Records Act)

NM's powerful sunshine law — government must respond within 15 days.

| Record Category | Specific Items |
|----------------|---------------|
| **Video** | Unedited native OBRD/bodycam files, dashcam footage |
| **Dispatch** | CAD reports, 911 audio recordings |
| **Reports** | Police report, Use of Force reports, internal disciplinary histories |
| **Facility** (jail cases) | Pod CCTV, cell-door logs, taser deployment logs, guard shift rosters |

### Spoliation / Preservation Letters

Send certified preservation demand to Chief of Police, Sheriff, or Warden:
- Suspend all automated deletion protocols
- Preserve all video, audio, electronic records
- Cite NM spoliation case law
- Warn of adverse inference sanctions

### Administrative Charges (Discrimination Cases)

Cross-file Charge of Discrimination with:
1. New Mexico Human Rights Bureau (NMHRB)
2. Federal EEOC
Purpose: Secure "Right to Sue" letter for federal court claims.

## Phase 6: HANDOFF — Pre-Litigation Investigation

See `references/pre-litigation-handoff.md` for complete procedures.

### Criminal Defense Coordination (Within 48 Hours)

- Contact client's criminal defense attorney
- Coordinate to prevent plea deals that waive civil liability
- Request criminal discovery sharing (bodycam via Rule 5-501)

### Video Review (Upon IPRA Return)

- Schedule internal legal team review of all footage
- Compare footage against client's narrative
- **Ethics gate:** If video shows client lied and was clear aggressor,
  firm must disengage before filing (Rule 11 sanctions)

### Psychological Management & Check-In Cadence

- Ensure client is in consistent psychological counseling (PTSD, trauma)
- Counseling supports emotional distress damages at trial
- Automated CMS task: call client every 30 days
- Monitor IPRA returns and criminal case status at each check-in

## Output Contract (every response)

### 1) Mode + Status Statement
Current mode (TRIAGE / INTERVIEW / EVALUATE / OPEN / RESCUE / HANDOFF),
lead ID if applicable, current pipeline status.

### 2) Work Product
- TRIAGE: Entity classification, deadline calculations, Heck/PLRA status
- INTERVIEW: Claim identification, evidence inventory, damages assessment
- EVALUATE: Forum strategy recommendation, accept/decline, retainer type
- OPEN: CMS setup confirmation, dual-docketed deadlines, notice status
- RESCUE: IPRA request status, spoliation letters, admin charges filed
- HANDOFF: Criminal coordination status, video review, counseling referral

### 3) Flags & Escalations
- Deadline urgency tiers and days remaining
- Heck v. Humphrey barriers
- PLRA exhaustion deficiencies
- Missing critical evidence or witnesses
- Criminal case coordination status

### 4) Next Steps
Concrete next actions: "File IPRA request for OBRD footage by {date}" or
"Contact criminal defense attorney {name} within 48 hours" or "Draft Tort
Claims Notice for service on Mayor and City Clerk."

## CRHR Tables Quick Reference

| Table | Rows Represent | Key Columns | Stage |
|-------|---------------|-------------|-------|
| `crhr_leads` | One per prospective civil rights client | entity_type, entity_name, notice_deadline, heck_status, plra_status | TRIAGE through SIGNED |
| `crhr_activity_log` | Every interaction with a lead | lead_id, activity_type, description, outcome | All stages |

## Reference Files

- `references/triage-entity-deadline.md` — Entity identification, deadline calculation, Heck/PLRA protocols
- `references/rights-interview.md` — Constitutional claim question bank, evidence checklist, damages assessment
- `references/case-eval-onboarding.md` — Forum selection, hybrid retainer, Fishbowl warning, client onboarding
- `references/case-opening-admin.md` — CMS setup, dual-docketing, Tort Claims Notice service requirements
- `references/evidence-rescue.md` — IPRA request templates, spoliation letters, EEOC/NMHRB charge filing
- `references/pre-litigation-handoff.md` — Criminal coordination, video review ethics gate, psych management

## Common Pitfalls

1. **Missing the 90-day notice** — The most dangerous deadline in NM civil rights practice. Calculate on first contact.
2. **Ignoring Heck v. Humphrey** — A guilty plea to battery on a peace officer destroys the excessive force claim.
3. **Skipping PLRA exhaustion** — Federal judges dismiss jail cases immediately without exhausted grievances.
4. **Single-point docketing** — One person's calendar mistake = malpractice. Always dual-docket.
5. **Sending notice to wrong recipient** — Police chief is not the statutory recipient. Research the correct clerk/official.
6. **Delayed IPRA requests** — Jail CCTV overwrites in 14-30 days. Every day of delay is lost evidence.
7. **No criminal coordination** — Criminal plea deals can destroy civil claims. Contact defense counsel immediately.
8. **Skipping Fishbowl warning** — Client posts on social media → defense uses it at trial.
9. **Filing without watching the video** — Rule 11 sanctions for filing frivolous claims when video contradicts narrative.
10. **Neglecting psychological counseling** — Emotional distress damages require proof of treatment.
