---
name: ikp
display_name: "Intake & Pre-Screening"
description: >-
  Intake & Pre-Screening (IKP). Manages the full PI intake pipeline from first
  contact through attorney case-acceptance decision. Covers immediate response
  capture, conflict-of-interest checks, SOL calculation and escalation,
  pre-screening triage (Stop/Go), comprehensive interview (incident narrative,
  medical/injury assessment, insurance/coverage identification), and attorney
  evaluation of liability-damages-recovery. Writes to ikp_leads and
  ikp_activity_log tables. Integrates with CAL for SOL deadlines and LOR for
  letter generation post-signing. TRIGGERS: Use when user mentions "intake",
  "new lead", "new client", "IKP", "pre-screen", "triage", "potential case",
  "case evaluation", "sign up", "speed to lead", or asks about a prospective
  client who has not yet signed a retainer. Do NOT use for post-signing
  case-opening tasks (use CO instead). (v1.0)
version: "1.0"
category: builder
pack_consumes:
  - Firm config
  - Court rules
pack_produces:
  - IKP Lead record
  - IKP Activity Log entries
  - Intake Summary Pack
checkpoints: 3
author: "Parnall & Adams"
license: Proprietary
---

## Pack Dependencies

**Consumes:**
- Firm config (`shared/config/firm-config.yaml`) — jurisdiction defaults, SOL rules
- Court rules (`shared/court-rules/`) — jurisdiction-specific SOL statutes

**Produces:**
- IKP Lead record (`ikp_leads` row)
- IKP Activity Log entries (`ikp_activity_log` rows)
- Intake Summary Pack — structured data for attorney review and downstream skills

## Integration Points

| Downstream Skill | Trigger | Data Passed |
|-----------------|---------|-------------|
| **CAL** | SOL expiration date computed | `statute_date`, `statute_type` for deadline tracking |
| **CO** | Lead status → SIGNED | Full intake record for case-opening workflow |
| **LOR** | Attorney accepts case | Incident data, parties, insurance info for LOR drafting |
| **CFP** | Case opened | Incident narrative seeds initial CFP EXTRACT |

# IKP (Intake & Pre-Screening) — v1.0

## Purpose

A structured, SOP-driven intake pipeline that ensures every prospective PI
client is triaged rapidly, screened for viability, interviewed comprehensively,
and evaluated by an attorney — with no critical deadlines missed and no
malpractice exposure created.

**Speed to Lead:** The single most important factor in PI client acquisition is
response time. The firm that answers first and shows empathy wins the case.
IKP enforces a 5–15 minute response window for web inquiries and 3-ring
phone answer discipline.

## Architecture

```
FIRST CONTACT              PRE-SCREEN               INTERVIEW               EVALUATION
+------------------+    +------------------+    +---------------------+    +------------------+
| Capture basics   |    | Conflict check   |    | Incident narrative  |    | 3 Pillars test:  |
| Name, phone,     |--->| SOL calculation  |--->| Medical assessment  |--->| Liability?       |
| email, address   |    | Stop/Go triage   |    | Insurance/coverage  |    | Damages?         |
+------------------+    +------------------+    +---------------------+    | Recovery source? |
       |                       |                        |                 +------------------+
       v                       v                        v                        |
  ikp_leads.NEW          ikp_leads.SCREENED      ikp_leads.CONSULTATION    ACCEPTED / DECLINED
  ikp_activity_log       ikp_activity_log         -COMPLETE                      |
                                                  ikp_activity_log         +-----------+
                                                                           | SIGNED →  |
                                                                           | Hand to CO|
                                                                           +-----------+
```

## Hard Rules

1. **Never skip conflict check.** Before any substantive discussion, run all
   party names through the CMS. If a conflict exists, STOP and notify the
   supervising attorney. Do not disclose any case details to the prospect.
2. **SOL is calculated immediately.** Ask for Date of Incident (DOI) within
   the first 2 minutes of the call. Compute the SOL before continuing.
3. **Government entity = escalate.** If the defendant is a government entity,
   check for Tort Claims Notice deadlines (typically 90 days in NM under
   NMSA §41-4-16). Escalate to attorney immediately if within 30 days.
4. **No medical records in IKP.** IKP captures injury descriptions from the
   client's own words. Actual medical records are never processed in IKP.
   PHI is limited to what the client volunteers during the interview.
5. **Decline letters are mandatory.** If a case is declined, a formal
   Non-Engagement/Declination Letter must be sent within 24 hours via
   certified mail or email. This is a malpractice protection requirement.
6. **Never promise outcomes.** During intake, never state or imply a case
   value, likelihood of success, or settlement timeline.
7. **Log every interaction.** Every call, email, text, or note must be
   recorded in `ikp_activity_log` with timestamp and outcome.
8. **Pre-existing conditions must be asked.** Always ask about prior
   injuries, accidents, or pre-existing conditions in the same body parts.
   Client transparency here is required to fight defense arguments later.

## Modes

| Mode | Purpose | Input | Output | Reference |
|------|---------|-------|--------|-----------|
| **CAPTURE** | First contact data entry | Name, phone, email, incident basics | `ikp_leads` row (status=NEW) | `references/capture.md` |
| **SCREEN** | Conflict check, SOL calc, Stop/Go | Lead ID + DOI + defendant info | Updated lead (status=SCREENED) + SOL data | `references/screen.md` |
| **INTERVIEW** | Full intake interview | Lead ID + client on phone/in office | Comprehensive intake record | `references/interview.md` |
| **EVALUATE** | Attorney case evaluation | Complete intake record | ACCEPTED / DECLINED decision + reasoning | `references/evaluate.md` |
| **SIGN** | Execute retainer & transition | Accepted lead + retainer details | Lead status=SIGNED, triggers CO handoff | `references/sign.md` |
| **DASHBOARD** | Pipeline status report | Optional filters | Pipeline funnel, SOL watchlist, follow-up queue | `references/dashboard.md` |

**Mode selection guidance:**
- New prospect calling in → **CAPTURE** then **SCREEN**
- Returning to complete interview → **INTERVIEW**
- Attorney reviewing screened lead → **EVALUATE**
- Client ready to sign → **SIGN**
- Checking pipeline status → **DASHBOARD**

## Phase 1: CAPTURE — Initial Contact & Data Entry

### Required Data Points

| Field | Priority | Notes |
|-------|----------|-------|
| Full legal name | CRITICAL | Exact spelling for conflict check |
| Phone number | CRITICAL | Primary contact method |
| Email address | HIGH | For document delivery |
| Physical address | MEDIUM | Jurisdiction determination |
| How they found us | MEDIUM | Lead source tracking (referral, web, ad, etc.) |
| Brief incident description | HIGH | 1-2 sentences for initial triage |
| Date of incident | CRITICAL | SOL calculation — ask within first 2 minutes |

### Capture Output

```
ikp_leads row:
  lead_id:        IKP-LEAD-{auto}
  lead_date:      {today ISO-8601}
  source:         {REFERRAL|WEBSITE|PHONE|WALK-IN|...}
  contact_name:   {full legal name}
  contact_phone:  {phone}
  contact_email:  {email}
  incident_date:  {DOI ISO-8601}
  incident_summary: {brief description}
  status:         NEW
  assigned_to:    {intake staff member}

ikp_activity_log row:
  activity_type:  CALL-INBOUND | CALL-OUTBOUND | ...
  description:    "Initial contact — {source}. DOI: {date}. Brief: {summary}"
  outcome:        CONNECTED
  followup_date:  {if callback needed}
```

## Phase 2: SCREEN — Conflict Check, SOL & Stop/Go

### Step 2.1: Conflict of Interest Check

**Mandatory before any substantive discussion.**

1. Obtain the name of the at-fault party (Defendant) and any known witnesses.
2. Run ALL names through the firm's CMS:
   - Client name
   - Defendant name(s)
   - Witness names
   - Any business/entity names
3. **If conflict found:** STOP immediately. Do not discuss case details.
   Notify supervising attorney. Log as `STATUS-CHANGE` to `DECLINED` with
   `decline_reason = CONFLICTS`.
4. **If clear:** Proceed to SOL calculation.

### Step 2.2: Statute of Limitations Calculation

**New Mexico PI Statutes of Limitations:**

| Claim Type | SOL | Statute | Notes |
|-----------|-----|---------|-------|
| General PI / Negligence | 3 years from DOI | NMSA §37-1-8 | Most common |
| Medical Malpractice | 3 years from DOI | NMSA §41-5-13 | Discovery rule may extend |
| Wrongful Death | 3 years from death | NMSA §41-2-2 | From date of death, not injury |
| Products Liability | 3 years from DOI | NMSA §37-1-8 | General PI statute applies |
| Government Entity (Tort Claims) | 2 years from DOI | NMSA §41-4-15 | BUT: 90-day Tort Claims Notice required |
| Civil Rights (Govt) | 2 years from DOI | NMSA §41-4A-14 | 90-day notice under §41-4A-12 |
| Property Damage Only | 4 years | NMSA §37-1-4 | Usually not PI intake |

**Tort Claims Notice Deadlines (Government Defendants):**

| Notice Type | Deadline | Statute |
|-------------|----------|---------|
| Tort Claims Act | 90 days from DOI | NMSA §41-4-16(A) |
| Civil Rights Act | 90 days from DOI | NMSA §41-4A-12 |

**SOL Urgency Escalation:**

| Days Until SOL | Urgency | Action |
|---------------|---------|--------|
| ≤ 30 days | CRITICAL | Immediate attorney escalation. Emergency retainer. |
| 31–90 days | URGENT | Same-day attorney review. Expedited signing. |
| 91–180 days | WATCH | Prioritize in pipeline. Schedule consultation within 1 week. |
| > 180 days | OK | Normal pipeline processing. |

**Government Entity — Double Deadline:**
When the defendant is a government entity, TWO deadlines must be tracked:
1. Tort Claims Notice: 90 days from DOI
2. Lawsuit filing: 2 years from DOI
If the 90-day notice deadline has already passed, this may bar the claim
entirely. Escalate to attorney IMMEDIATELY.

### Step 2.3: Stop/Go Pre-Screen

Ask these 4 questions to determine if the case fits the firm's criteria:

**Question 1 — Incident Type:**
"What type of incident was this?"
- Auto collision → GO (firm's primary practice area)
- Slip and fall / premises → GO
- Dog bite → GO
- Medical malpractice → GO (but flag: higher complexity, expert requirements)
- Wrongful death → GO (flag: high value, priority handling)
- Work injury only (no third party) → STOP (refer to workers' comp attorney)
- Property damage only → STOP (firm does not handle PD-only claims)

**Question 2 — Medical Treatment:**
"Did you seek medical attention for your injuries?"
- Yes, went to ER / Urgent Care / Hospital → GO
- Yes, seeing a doctor / chiropractor / PT → GO
- Not yet, but plan to → CONDITIONAL GO (advise to seek treatment immediately)
- No, no injuries → STOP (no physical injury = no PI claim)

**Question 3 — Fault:**
"Was the other party at fault? Were you cited with a ticket?"
- Other party clearly at fault → GO
- Shared fault / unclear → CONDITIONAL GO (NM is pure comparative fault)
- Client was sole cause → STOP
- Client received citation → FLAG (does not bar claim in NM but complicates)

**Question 4 — Representation:**
"Are you currently represented by another attorney for this matter?"
- No → GO
- Yes, wants to switch → FLAG (must confirm prior attorney release)
- Yes, satisfied → STOP (already represented)

**Pre-Screen Decision:**
- All GO → Proceed to INTERVIEW
- Any CONDITIONAL → Proceed to INTERVIEW with flags noted
- Any STOP → Decline. Offer referral if appropriate. Send declination letter.

## Phase 3: INTERVIEW — Comprehensive Intake

### Step 3.1: Incident Narrative & Liability

Gather a complete, step-by-step narrative:

| Data Point | Question Template | Required |
|-----------|-------------------|----------|
| Narrative | "Please walk me through exactly what happened, step by step." | YES |
| Location | "Where exactly did this happen? Street, city, business name?" | YES |
| Date/Time | "What was the exact date and approximate time?" | YES |
| Weather/Lighting | "What were the weather and lighting conditions?" | If relevant |
| Police Report | "Was a police report filed? Do you have the report number?" | YES |
| Responding Agency | "Which police/sheriff department responded?" | YES |
| Witnesses | "Were there any witnesses? Do you have their names or contact info?" | YES |
| Video/Photos | "Is there any dashcam, bodycam, or surveillance footage you know of?" | YES |
| Photos Taken | "Did you take any photos at the scene?" | YES |
| Other Party Info | "Do you have the other person's name, insurance, license plate?" | YES |

### Step 3.2: Medical & Injury Assessment

| Data Point | Question Template | Required |
|-----------|-------------------|----------|
| Ambulance | "Did you take an ambulance from the scene?" | YES |
| First Treatment | "Where were you first treated? ER, Urgent Care, or doctor's office?" | YES |
| Facility Name | "What was the name of the hospital or facility?" | YES |
| Diagnoses | "What injuries were you diagnosed with?" | YES |
| Current Pain | "On a scale of 1-10, what is your current pain level?" | YES |
| Current Treatment | "Are you currently receiving treatment? With whom?" | YES |
| Treating Providers | "List all doctors, chiropractors, PTs you've seen for this." | YES |
| Surgery | "Have you had or been recommended for any surgery?" | YES |
| Work Impact | "Have you missed work? Are you able to work now?" | YES |
| Daily Activities | "How have your injuries affected your daily life?" | YES |
| **Pre-Existing** | "Have you ever had injuries or treatment to the same body parts before this incident?" | **CRITICAL** |
| Prior Claims | "Have you ever been in another accident or filed an injury claim before?" | YES |

### Step 3.3: Insurance & Sources of Recovery

| Data Point | Question Template | Required |
|-----------|-------------------|----------|
| Defendant Insurance | "Do you have the at-fault party's insurance company name?" | YES |
| Defendant Policy # | "Do you have their policy or claim number?" | If available |
| Defendant Claim # | "Has a claim already been opened? What's the claim number?" | If available |
| Client Auto Insurance | "Who is your auto insurance carrier?" | YES (MVC) |
| UM/UIM Coverage | "Do you have uninsured/underinsured motorist coverage?" | YES (MVC) |
| MedPay/PIP | "Do you have Medical Payments or PIP coverage on your policy?" | YES (MVC) |
| Health Insurance | "Do you have health insurance? Medicare? Medicaid? VA/Tricare?" | YES |
| Health Carrier | "What is the name of your health insurance company?" | If applicable |
| LOP Needed | "Are you having difficulty paying for medical treatment?" | YES |

## Phase 4: EVALUATE — Attorney Case Review

The reviewing attorney assesses the **Three Pillars** of a PI case:

### Pillar 1: Liability
- Can we legally prove the other party is at fault?
- Is there clear negligence, strict liability, or intentional conduct?
- What evidence supports fault? (police report, witnesses, video)
- Is there comparative fault exposure? (NM pure comparative — NMSA §41-3A-1)
- Government immunity issues? (Tort Claims Act, NMSA §41-4-1 et seq.)

### Pillar 2: Damages
- Are the injuries severe enough to warrant the firm's time and resources?
- Medical treatment ongoing or completed?
- Surgery performed or recommended?
- Lost wages / earning capacity impact?
- Pain and suffering magnitude?
- Future medical needs?
- Life-care plan potential (catastrophic cases)?

### Pillar 3: Source of Recovery
- Is there an insurance policy to pay a settlement/verdict?
- Policy limits known or discoverable?
- UM/UIM coverage available?
- Solvent corporate defendant?
- Government entity with coverage?
- Multiple policies/defendants?

### Evaluation Decision Matrix

| Liability | Damages | Recovery | Decision |
|-----------|---------|----------|----------|
| Strong | Significant | Available | **ACCEPT** |
| Strong | Significant | Unknown | **ACCEPT** (investigate coverage) |
| Strong | Moderate | Available | **ACCEPT** (standard case) |
| Moderate | Significant | Available | **ACCEPT** (develop liability) |
| Weak | Any | Any | **DECLINE** (unless extraordinary damages) |
| Any | Minimal | Any | **DECLINE** (low value) |
| Any | Any | None | **DECLINE** (no recovery source) |
| Any | Catastrophic | Any | **ACCEPT** (always investigate catastrophic) |

### If DECLINED

**Mandatory actions within 24 hours:**
1. Update `ikp_leads.status` → `DECLINED`
2. Set `decline_reason` (LOW-VALUE, NO-LIABILITY, CONFLICTS, SOL-EXPIRED, COVERAGE-ISSUE, CLIENT-UNRESPONSIVE)
3. Send formal **Non-Engagement / Declination Letter** via certified mail AND email
4. Include in letter:
   - Statement that the firm is NOT representing the client
   - Warning about the statute of limitations and specific expiration date
   - Recommendation to seek other counsel immediately
   - Statement that the firm has NOT investigated the claim
5. Log the declination letter in `ikp_activity_log`

**The declination letter is a critical malpractice-prevention document.**

### If ACCEPTED

1. Update `ikp_leads.status` → `ACCEPTED`
2. Assign estimated_value (LOW, MEDIUM, HIGH, CATASTROPHIC)
3. Transition to **SIGN** mode

## Phase 5: SIGN — Execute Retainer & Transition

### Retainer Documents (via e-signature or in-office)

| Document | Purpose | Required |
|----------|---------|----------|
| Contingency Fee Agreement | Fee percentage, expense handling | YES |
| HIPAA / HITECH Authorization | Broad medical records release | YES |
| General Release — Police Reports | Authority to obtain reports | YES |
| General Release — Employment | Authority to obtain wage records | YES |
| General Release — 911 Audio/CAD | Authority to obtain dispatch records | If applicable |
| Client Acknowledgment | Social media rules, communication rules | YES |

### Welcome Packet — Client Rules

Provide a packet (digital or physical) covering:

1. **Medical Care Rules:**
   - Attend ALL scheduled appointments — no exceptions
   - "Gaps in medical treatment destroy case value"
   - Do not stop treatment without consulting the legal team
   - Keep all medical receipts and documentation

2. **Social Media Rules:**
   - Set ALL profiles to private immediately
   - Post NOTHING about the accident, injuries, or physical activities
   - Do not accept new friend requests from unknown people
   - Do not delete any existing posts (spoliation risk)

3. **Communication Rules:**
   - Do NOT speak to any insurance adjuster — direct all calls to the firm
   - Do NOT sign anything from an insurance company
   - Do NOT give recorded statements
   - Contact the firm immediately if you receive any legal documents

4. **Legal Team Introduction:**
   - Assigned attorney name and role
   - Assigned paralegal/case manager name
   - Firm phone number and best times to call
   - Emergency contact procedure

### Sign-Off Handoff

Upon execution of retainer:
1. Update `ikp_leads.status` → `SIGNED`
2. Record `retainer_signed_date`, `retainer_type`, `fee_percentage`
3. Populate `case_id` linking to the new case in CMS
4. Log signing in `ikp_activity_log`
5. **Trigger CO skill** for case-opening workflow

## Output Contract (every response)

### 1) Mode + Status Statement
Current mode (CAPTURE / SCREEN / INTERVIEW / EVALUATE / SIGN / DASHBOARD),
lead ID if applicable, current pipeline status.

### 2) Work Product
- CAPTURE: Lead record created, data points captured vs. missing
- SCREEN: Conflict result, SOL calculation with citation, Stop/Go decision
- INTERVIEW: Comprehensive intake summary organized by category
- EVALUATE: Three Pillars analysis with recommendation
- SIGN: Retainer checklist status, welcome packet delivery confirmation
- DASHBOARD: Pipeline funnel, SOL watchlist, follow-up queue

### 3) Flags & Escalations
- SOL urgency tier and days remaining
- Government entity / Tort Claims Notice deadline
- Missing critical data points
- Pre-existing condition disclosures
- Conflict check results

### 4) Next Steps
Concrete next actions: "Complete interview sections 3.2 and 3.3" or
"Schedule attorney review for evaluation" or "Send declination letter within 24 hours."

## IKP Tables Quick Reference

| Table | Rows Represent | Key Columns | Stage |
|-------|---------------|-------------|-------|
| `ikp_leads` | One per prospective client | contact_name, incident_date, status, statute_date, estimated_value | CAPTURE through SIGN |
| `ikp_activity_log` | Every interaction with a lead | lead_id, activity_type, description, outcome, followup_date | All stages |

## IKP Views Quick Reference

| View | Purpose |
|------|---------|
| `ikp_pipeline` | Status funnel dashboard — lead counts by status |
| `ikp_conversion_analytics` | Conversion rates by lead source |
| `ikp_statute_watchlist` | SOL tracking for unsigned leads with urgency tiers |
| `ikp_followup_queue` | Leads needing follow-up contact with staleness indicators |

## Reference Files

- `references/capture.md` — First contact data capture procedures and scripts
- `references/screen.md` — Conflict check, SOL calculation, and pre-screen protocols
- `references/interview.md` — Comprehensive interview question bank and recording templates
- `references/evaluate.md` — Attorney evaluation framework and decision matrix
- `references/sign.md` — Retainer execution checklist and welcome packet contents
- `references/dashboard.md` — Pipeline reporting and analytics queries

## Common Pitfalls

1. **Skipping conflict check** — Malpractice risk. Always run before substantive discussion.
2. **Forgetting SOL calculation** — Ask for DOI in the first 2 minutes. Calculate immediately.
3. **Missing Tort Claims Notice deadline** — Government defendants have 90-day notice requirements.
4. **Not asking about pre-existing conditions** — Defense will find out. Better to know upfront.
5. **No declination letter** — Every declined case MUST get a formal non-engagement letter.
6. **Promising outcomes** — Never state case value or likelihood of success during intake.
7. **Not logging interactions** — Every contact must be in `ikp_activity_log`.
8. **Delayed response** — 5–15 minute response for web leads. Speed wins clients.
