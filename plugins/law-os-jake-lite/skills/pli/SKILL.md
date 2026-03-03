---
name: pli
display_name: "Pre-Litigation Investigation"
description: >-
  Pre-Litigation Investigation (PLI). Manages the full pre-suit investigation
  pipeline from case acceptance through complaint-filing readiness. Covers
  scene investigation, witness location and statements, records collection
  (medical, police, employment), insurance coverage investigation, expert
  consultation, evidence preservation and spoliation prevention, government
  tort claims notice filing, and investigation file assembly. Consumes IKP
  intake data and CO case record. Produces Investigation Summary Pack for
  downstream CFP, LPB, PCM, COMPLAINT, and DEMAND skills. TRIGGERS: Use
  when user mentions "pre-litigation investigation", "prelitigation", "PLI",
  "scene investigation", "witness statements", "records collection",
  "spoliation letter", "tort claims notice", "pre-suit investigation",
  "investigation checklist", or asks about investigation steps after case
  opening but before filing suit. Do NOT use for intake (use IKP), case
  opening (use CO), or post-filing discovery (use DPB). (v1.0)
version: "1.0"
category: analysis
pack_consumes:
  - IKP Intake Summary Pack
  - CO Case Record
  - Firm config
  - Court rules
pack_produces:
  - Investigation Summary Pack
checkpoints: 3
author: "Parnall & Adams"
license: Proprietary
---

## Pack Dependencies

**Consumes:**
- IKP Intake Summary Pack — incident narrative, parties, DOI, injury data
- CO Case Record — case ID, assigned team, case type classification
- Firm config (`shared/config/firm-config.yaml`) — jurisdiction defaults
- Court rules (`shared/court-rules/`) — SOL statutes, Tort Claims deadlines

**Produces:**
- Investigation Summary Pack (ISP) — structured investigation findings for downstream skills
- PLI Activity Log entries (`pli_activity_log` rows)
- Evidence Inventory — cataloged evidence with chain-of-custody metadata

## Integration Points

| Downstream Skill | Trigger | Data Passed |
|-----------------|---------|-------------|
| **CFP** | Investigation records collected | Witness statements, police reports, scene photos seed CFP EXTRACT |
| **LPB** | Liability theories identified | Legal theories and elements for LPB research |
| **PCM** | Investigation complete | Facts mapped to legal elements for Proof of Claims Matrix |
| **COMPLAINT** | Pre-suit investigation complete | Factual basis, parties, theories for complaint drafting |
| **DEMAND** | Pre-suit demand authorized | Investigation findings, damages documentation for demand letter |
| **CAL** | Deadlines identified | Tort Claims Notice, SOL, and discovery deadlines for calendar |
| **DVP** | Medical records collected | Treatment records, bills, wage loss docs for damages valuation |

# PLI (Pre-Litigation Investigation) — v1.0

## Purpose

A structured, SOP-driven pre-suit investigation pipeline that ensures every
accepted PI case is thoroughly investigated before filing suit or sending a
demand. PLI bridges the gap between intake/case-opening and litigation,
building the factual foundation that drives case value and litigation strategy.

**Investigation Drives Value:** The quality of pre-suit investigation directly
determines case outcome. Missing witnesses, lost evidence, and incomplete
records cannot be recovered later. PLI enforces systematic evidence collection
within critical time windows.

## Architecture

```
CASE ACCEPTED           SCENE & WITNESSES        RECORDS             EXPERT REVIEW
+------------------+   +------------------+   +------------------+   +------------------+
| Import IKP data  |   | Scene inspection |   | Medical records  |   | Liability expert |
| Assign team      |-->| Witness locate   |-->| Police reports   |-->| Medical review   |
| Set deadlines    |   | Statements taken |   | Employment docs  |   | Damages eval     |
+------------------+   +------------------+   | Insurance invest |   +------------------+
       |                       |               +------------------+          |
       v                       v                      |                     v
  pli_activity_log      Evidence Inventory      Records Inventory    COMPLAINT-READY
                                                                     or DEMAND-READY
```

## Hard Rules

1. **Scene investigation within 72 hours.** Visit the scene and photograph
   conditions within 72 hours of case acceptance. Road conditions, signage,
   lighting, and physical evidence change rapidly.
2. **Spoliation letters within 48 hours.** Send preservation-of-evidence
   letters to all adverse parties and third parties with relevant evidence
   (surveillance footage, vehicle data, maintenance records) within 48 hours
   of case acceptance. Delay = evidence destruction.
3. **Tort Claims Notice is non-negotiable.** If ANY defendant is a government
   entity, file the Tort Claims Notice within 90 days of DOI per NMSA
   Section 41-4-16(A). Missing this deadline bars the claim entirely.
4. **Never contact represented parties.** If an adverse party is known to
   have counsel, all communication must go through their attorney per
   NMRA 16-402. Direct contact is an ethics violation.
5. **Witness statements must be signed.** Oral summaries are insufficient.
   Obtain written, signed statements from every material witness. Include
   date, time, and location of the statement.
6. **Medical records requests require HIPAA authorization.** Never request
   medical records without a signed HIPAA/HITECH authorization from the
   client. Verify the authorization covers the requested providers and
   date ranges.
7. **Chain of custody for all physical evidence.** Document who collected
   each item, when, where, and how it has been stored. Gaps in chain of
   custody allow defense to challenge admissibility.
8. **Log every investigation action.** Every call, site visit, records
   request, and expert consultation must be recorded in `pli_activity_log`
   with timestamp, action type, and outcome.
9. **Attorney review before expert retention.** No expert witness may be
   formally retained without supervising attorney approval. Expert costs
   and scope must be pre-approved.
10. **Investigation file must be complete before demand or complaint.**
    No demand letter or complaint may be drafted until the PLI checklist
    shows all critical items as COMPLETE or documented as UNAVAILABLE
    with explanation.

## Modes

| Mode | Purpose | Input | Output | Reference |
|------|---------|-------|--------|-----------|
| **LAUNCH** | Initialize investigation from accepted case | IKP data + CO case record | Investigation plan, deadline calendar, assignment matrix | `references/investigation-phases.md` |
| **SCENE** | Scene investigation and evidence collection | Case ID + incident location | Scene photos, measurements, conditions report, evidence inventory | `references/investigation-phases.md` |
| **WITNESS** | Witness location and statement collection | Case ID + known witness list | Located witnesses, signed statements, contact log | `references/investigation-phases.md` |
| **RECORDS** | Records collection and tracking | Case ID + provider/agency list | Records inventory, outstanding requests, received documents | `references/investigation-phases.md` |
| **PRESERVE** | Evidence preservation and spoliation prevention | Case ID + evidence targets | Spoliation letters sent, preservation confirmations, tort claims notices | `references/evidence-preservation.md` |
| **EXPERT** | Expert consultation and retention | Case ID + liability/medical issues | Expert opinions, retention agreements, cost approvals | `references/investigation-phases.md` |
| **COVERAGE** | Insurance coverage investigation | Case ID + party/policy info | Coverage map, policy limits, stacking analysis, UM/UIM evaluation | `references/investigation-phases.md` |
| **STATUS** | Investigation progress dashboard | Case ID or filters | Checklist completion, outstanding items, deadline alerts | `references/investigation-phases.md` |

**Mode selection guidance:**
- New case just accepted from IKP/CO -> **LAUNCH**
- Need to visit accident scene -> **SCENE**
- Need to find or interview witnesses -> **WITNESS**
- Need to request or track records -> **RECORDS**
- Need to send spoliation letters or tort claims notice -> **PRESERVE**
- Need expert opinion on liability or injuries -> **EXPERT**
- Need to map insurance coverage -> **COVERAGE**
- Checking investigation progress -> **STATUS**

## Phase 1: LAUNCH — Investigation Initialization

### Import from IKP / CO

Pull the following from the intake and case-opening records:

| Data Point | Source | Purpose |
|-----------|--------|---------|
| Client contact info | IKP Lead Record | Primary communication |
| Incident narrative | IKP Interview | Investigation starting point |
| Date of incident (DOI) | IKP Lead Record | SOL and deadline calculations |
| Incident location | IKP Interview | Scene investigation planning |
| Known parties | IKP Interview | Witness and adverse party identification |
| Police report number | IKP Interview | Records request |
| Insurance info | IKP Interview | Coverage investigation |
| Case type | CO Case Record | Investigation scope determination |
| Assigned team | CO Case Record | Task assignment |

### Deadline Calendar Setup

Calculate and calendar ALL deadlines on day one:

| Deadline | Calculation | Statute | Priority |
|----------|------------|---------|----------|
| Tort Claims Notice | DOI + 90 days | NMSA 41-4-16(A) | CRITICAL (if govt defendant) |
| SOL expiration | DOI + SOL period | Varies by claim type | CRITICAL |
| Scene investigation | Case acceptance + 72 hours | Firm SOP | HIGH |
| Spoliation letters | Case acceptance + 48 hours | Firm SOP | HIGH |
| Medical records requests | Case acceptance + 5 business days | Firm SOP | HIGH |
| Police report request | Case acceptance + 5 business days | Firm SOP | HIGH |
| Witness contact attempts | Case acceptance + 10 business days | Firm SOP | MEDIUM |
| Initial expert consult | Case acceptance + 30 days | Firm SOP | MEDIUM |
| 6-month investigation review | Case acceptance + 180 days | Firm SOP | STANDARD |

### Investigation Assignment Matrix

| Task Category | Assigned To | Supervision |
|--------------|-------------|-------------|
| Scene investigation | Investigator or Paralegal | Attorney review of photos/report |
| Witness location | Investigator | Attorney review of statements |
| Medical records | Paralegal / Case Manager | Attorney review when complete |
| Police/govt records | Paralegal | Attorney review when complete |
| Spoliation letters | Attorney drafts | Senior attorney review |
| Tort Claims Notice | Attorney drafts | Senior attorney review and sign |
| Expert consultation | Attorney | Senior attorney approves retention |
| Insurance investigation | Paralegal | Attorney review of coverage map |

## Phase 2: SCENE — Scene Investigation

### Scene Visit Checklist

| Item | Method | Notes |
|------|--------|-------|
| Overall scene photos (wide angle) | Camera | All approach angles, 4 cardinal directions |
| Point-of-impact photos | Camera | Close-up with measurement reference |
| Traffic signals and signs | Camera | All relevant signage within 500 feet |
| Road surface conditions | Camera + notes | Potholes, paint markings, grade, curves |
| Sight lines from each party's perspective | Camera | From each driver/pedestrian position |
| Lighting conditions | Camera + notes | Natural and artificial, time-matched if possible |
| Surveillance cameras nearby | Camera + notes | Businesses, traffic cameras, residential doorbells |
| Skid marks or debris | Camera + measurement | Measure length and location |
| Property damage to structures | Camera | Guardrails, poles, fences |
| Weather conditions at time of visit | Notes | Compare to DOI weather records |
| GPS coordinates | Phone/GPS | Exact location for mapping |
| Measurements and distances | Tape measure | Key distances (intersection width, crosswalk, etc.) |

### Surveillance Camera Canvas

Within 48 hours of case acceptance, canvas the scene for nearby cameras:

| Camera Source | Request Method | Retention Period |
|--------------|---------------|-----------------|
| Traffic cameras (city/DOT) | IPRA request / records request | 30-90 days typical |
| Business security cameras | Direct request to business owner | 7-30 days typical |
| Residential doorbell cameras (Ring, Nest) | Knock-and-ask, subpoena if needed | 30-60 days typical |
| Gas station cameras | Direct request to manager | 14-30 days typical |
| ATM cameras | Request through bank | 30-90 days typical |

**Time is critical.** Most surveillance systems overwrite footage within
14-30 days. If the scene visit is delayed, this evidence is lost forever.

## Phase 3: WITNESS — Witness Location & Statements

### Witness Categories

| Category | Priority | Typical Sources |
|----------|----------|----------------|
| Eyewitnesses to incident | CRITICAL | Police report, client narrative |
| First responders (EMS, fire) | HIGH | EMS run reports, fire dept records |
| Responding officers | HIGH | Police report (badge numbers) |
| Medical treaters | HIGH | ER records, treating physician notes |
| Character/impact witnesses | MEDIUM | Client referral (family, employer, friends) |
| Expert witnesses | MEDIUM | Attorney selection based on case needs |

### Witness Statement Protocol

For each material witness:

1. **Locate** — Use police report, social media, skip tracing, public records
2. **Contact** — Phone first, then in-person visit. Never leave case details in voicemail
3. **Interview** — Open-ended narrative first, then targeted follow-up questions
4. **Document** — Written statement, signed and dated by witness
5. **Preserve** — Obtain contact info for future follow-up and potential trial testimony

### Statement Content Requirements

Every signed witness statement must include:

- Witness full name and contact information
- Date, time, and location of the statement
- Witness relationship to the incident (eyewitness, bystander, etc.)
- Complete narrative of what the witness observed
- Any photos or videos the witness took
- Whether the witness spoke with police or anyone else about the incident
- Witness signature and date

## Phase 4: RECORDS — Records Collection

### Medical Records Request Tracking

| Provider | Date Requested | Date Received | Pages | Cost | Status |
|----------|---------------|---------------|-------|------|--------|
| ER / Hospital | | | | | PENDING |
| Primary Care | | | | | PENDING |
| Specialist(s) | | | | | PENDING |
| Chiropractor | | | | | PENDING |
| Physical Therapy | | | | | PENDING |
| Imaging (MRI, CT, X-ray) | | | | | PENDING |
| Pharmacy (Rx history) | | | | | PENDING |
| Prior treatment (pre-existing) | | | | | PENDING |

### Other Records Requests

| Record Type | Source | Method | Deadline |
|-------------|--------|--------|----------|
| Police report | PD Records Division | Written request + fee | 5 business days |
| 911 audio / CAD | PD / Dispatch | IPRA or records request | 5 business days |
| EMS run report | Fire Dept / EMS agency | Written request | 5 business days |
| Traffic camera footage | City DOT / PD | IPRA or records request | ASAP (retention limits) |
| Weather records | NOAA / Weather service | Online retrieval | Within 30 days |
| Employment records | Client's employer | Subpoena or auth + request | Within 30 days |
| Wage verification | Client's employer | Authorization + request | Within 30 days |
| Property damage estimate | Insurance or body shop | Request through client | Within 30 days |
| Vehicle black box data | EDR download service | Expert extraction | ASAP (before vehicle repair/disposal) |

### Records Follow-Up Protocol

| Days Since Request | Action |
|-------------------|--------|
| 14 days | First follow-up call |
| 28 days | Second follow-up — written demand |
| 42 days | Third follow-up — escalate to attorney |
| 60 days | Attorney letter demanding compliance |
| 90 days | Evaluate subpoena or HIPAA complaint |

## Phase 5: COVERAGE — Insurance Coverage Investigation

### Coverage Map

Build a comprehensive map of all available insurance coverage:

| Coverage Type | Carrier | Policy # | Limits | Status |
|--------------|---------|----------|--------|--------|
| Defendant liability | | | | INVESTIGATING |
| Defendant umbrella/excess | | | | INVESTIGATING |
| Client UM/UIM | | | | INVESTIGATING |
| Client MedPay/PIP | | | | INVESTIGATING |
| Client health insurance | | | | INVESTIGATING |
| Employer (if work-related) | | | | INVESTIGATING |
| Premises owner (if premises) | | | | INVESTIGATING |
| Additional defendants | | | | INVESTIGATING |

### Coverage Investigation Steps

1. **Defendant policy:** Obtain from police report exchange, defendant's
   carrier, or client's carrier (they often have it from claim filing)
2. **Policy limits disclosure:** In NM, request policy limits disclosure.
   Carrier must respond within 30 days per NMSA Section 39-2-2(B)
3. **UM/UIM stacking analysis:** Review client's auto policy declarations
   page for stacking availability across multiple vehicles
4. **MedPay/PIP:** Identify and file MedPay/PIP claim immediately to fund
   ongoing treatment without liens
5. **Umbrella/excess coverage:** Ask defendant's carrier about excess
   coverage. Send written request if not disclosed
6. **Subrogation interests:** Identify health insurance, Medicare, Medicaid,
   VA, or ERISA plan subrogation/lien interests early

## Phase 6: EXPERT — Expert Consultation

### When to Retain Experts

| Situation | Expert Type | Purpose |
|-----------|------------|---------|
| Complex liability (multi-vehicle, defect) | Accident reconstructionist | Establish causation and fault |
| Disputed medical causation | Medical expert (IME) | Link injuries to incident |
| Catastrophic injury / future damages | Life care planner | Project lifetime care costs |
| Lost earning capacity | Vocational expert / economist | Calculate future wage loss |
| Premises defect | Engineer / safety expert | Identify code violations |
| Product defect | Engineering / design expert | Establish manufacturing or design defect |
| Government immunity defense | Constitutional law expert | Qualified immunity analysis |

### Expert Retention Protocol

1. **Attorney identifies need** — Based on investigation findings
2. **Research candidates** — Qualifications, CV, testimony history, Daubert challenges
3. **Obtain fee schedule** — Hourly rate, retainer, estimated total cost
4. **Attorney approval** — Supervising attorney must approve retention and budget
5. **Retention letter** — Formal engagement with scope, fees, and confidentiality
6. **Initial consultation** — Provide relevant records for preliminary opinion
7. **Preliminary opinion** — Written summary of expert's initial findings
8. **Decision point** — Formal retention for report/testimony or disengage

## Output Contract (every response)

### 1) Mode + Status Statement
Current mode (LAUNCH / SCENE / WITNESS / RECORDS / PRESERVE / EXPERT /
COVERAGE / STATUS), case ID, investigation phase status.

### 2) Work Product
- LAUNCH: Investigation plan, deadline calendar, assignment matrix
- SCENE: Scene report with photos inventory, conditions, measurements
- WITNESS: Witness list with contact status, statements obtained/pending
- RECORDS: Records request tracker with status for each provider/agency
- PRESERVE: Spoliation letters log, tort claims notice status, preservation confirmations
- EXPERT: Expert consultation summary, retention status, preliminary opinions
- COVERAGE: Coverage map with all policies, limits, and investigation status
- STATUS: Master checklist, completion percentages, outstanding critical items

### 3) Flags & Escalations
- Tort Claims Notice deadline approaching (with days remaining)
- SOL urgency tier and days remaining
- Evidence at risk of destruction (surveillance retention expiring)
- Outstanding records requests past 30 days
- Unlocated critical witnesses
- Coverage gaps or policy limits concerns

### 4) Next Steps
Concrete next actions with responsible party and deadline: "Send spoliation
letters to [parties] by [date]" or "Follow up on medical records from
[provider] — 14 days past request" or "Schedule scene visit for [date]."

## PLI Tables Quick Reference

| Table | Rows Represent | Key Columns | Stage |
|-------|---------------|-------------|-------|
| `pli_activity_log` | Every investigation action | case_id, activity_type, description, outcome, assigned_to, followup_date | All phases |
| `pli_evidence_inventory` | Each piece of evidence collected | case_id, evidence_type, description, source, date_collected, collected_by, storage_location, chain_of_custody | SCENE, RECORDS |
| `pli_records_tracker` | Each records request | case_id, provider, record_type, date_requested, date_received, status, pages, cost | RECORDS |
| `pli_witness_tracker` | Each identified witness | case_id, witness_name, category, contact_info, statement_status, statement_date | WITNESS |
| `pli_coverage_map` | Each insurance policy identified | case_id, coverage_type, carrier, policy_number, limits, status | COVERAGE |

## Reference Files

- `references/investigation-phases.md` — Detailed procedures for each investigation phase
- `references/evidence-preservation.md` — Spoliation letters, preservation protocols, tort claims notice
- `references/nm-prelitigation-rules.md` — NM-specific statutes, deadlines, and procedural requirements

## Common Pitfalls

1. **Delayed scene visit** — Scene conditions change within days. 72-hour window is firm policy.
2. **No spoliation letters** — Without written preservation demands, adverse parties can claim
   innocent destruction. Send within 48 hours.
3. **Missing Tort Claims Notice** — This is a claim-killing deadline. 90 days, no exceptions.
4. **Surveillance footage lost** — Most cameras overwrite in 14-30 days. Canvas immediately.
5. **Unsigned witness statements** — Oral summaries have minimal evidentiary value.
6. **Incomplete medical records** — Missing providers or date ranges create gaps defense exploits.
7. **No coverage investigation** — Discovering policy limits after filing wastes resources on
   uncollectible cases.
8. **Expert retained without approval** — Unauthorized expert costs create client trust issues
   and potential fee disputes.
9. **Records requests not followed up** — Providers ignore unfollowed requests. Use the 14/28/42/60
   day follow-up protocol.
10. **Vehicle disposed before EDR download** — Black box data is lost when the vehicle is
    repaired, sold, or scrapped. Preserve immediately.
