# IKP MEDMAL-INTAKE — Medical Malpractice Intake SOP (NM)

## Purpose

Medical malpractice intake requires a vastly different, more rigorous process
than standard auto collision or premises liability cases. These cases are
extraordinarily expensive to litigate (often requiring $50,000-$100,000+ in
expert fees), fiercely defended, and subject to highly specialized state laws.

In New Mexico, the intake process is a legal minefield governed by:
- **NM Medical Malpractice Act (NMMMA)** — NMSA 41-5-1 et seq.
- **NM Tort Claims Act (NMTCA)** — NMSA 41-4-1 et seq.
- **NM Medical Review Commission (NMMRC)** — NMSA 41-5-15 et seq.
- **2026 HB 99** — Overhauled punitive damages caps

This SOP replaces the standard IKP pipeline when `incident_type = MEDICAL-MALPRACTICE`.
The standard IKP phases (CAPTURE, SCREEN, INTERVIEW, EVALUATE, SIGN) are
preserved but each phase is augmented with med-mal-specific steps and data
points. Additionally, med-mal cases add post-signing investigation phases
not present in standard PI intake.

## When to Activate MEDMAL Mode

Activate when ANY of the following are present:
- Caller describes an injury occurring during medical treatment
- Caller mentions a hospital, doctor, nurse, surgeon, or clinic as the cause
- Incident type involves: surgical error, delayed diagnosis, misdiagnosis,
  birth injury, medication error, anesthesia error, failure to treat,
  failure to diagnose, wrong-site surgery, hospital-acquired infection,
  nursing negligence, radiology misread, pathology error, ER malpractice

---

## Phase 1: Initial Triage & The "Red Flag" Screen

**Goal:** Immediately identify the facility type to prevent missed hard
deadlines (which in NM can be as short as 90 days) and rule out economically
non-viable cases.

### Step 1: Identify the Facility Type (The NM "Minefield" Check)

Before taking a long medical narrative, immediately establish WHERE the
malpractice occurred. In New Mexico, the facility dictates your deadlines:

| Facility Type | Examples | Governing Law | SOL | Notice Deadline | Urgency |
|---------------|----------|---------------|-----|-----------------|---------|
| **State/County** | UNM Hospital, Sandoval Regional Medical Center (SRMC), county clinics | NM Tort Claims Act (NMTCA) — NMSA 41-4-1 et seq. | 2 years from DOI | **90 days** — Formal Tort Claims Notice MUST be received by Risk Management Division | CRITICAL — if caller is within 30 days of the 90-day notice deadline, ESCALATE TO ATTORNEY IMMEDIATELY |
| **Federal** | Albuquerque VA, Indian Health Services (IHS) clinics, military facilities | Federal Tort Claims Act (FTCA) — 28 USC 2671 et seq. | 2 years from DOI | **2 years** — Form SF-95 must be filed with appropriate agency | HIGH — federal bureaucracy adds time; start immediately |
| **Private** | Presbyterian, Lovelace, private practices, ambulatory surgery centers | NM Medical Malpractice Act (NMMMA) — NMSA 41-5-1 et seq. | **3 years from date of occurrence** | None, but must file with NMMRC if defendant is QHP before filing lawsuit | STANDARD |

**CRITICAL NM NUANCE:** New Mexico is an "occurrence" state. The 3-year clock
for private facility malpractice usually starts on the exact date of the
malpractice, NOT the date it was discovered. The discovery rule has very
limited application in NM — primarily when the malpractice was inherently
unknowable (e.g., sponge left in body discovered years later).

**Red Flag Escalation Rules:**
- State/County facility + caller is on day 60+ of 90-day notice period → **IMMEDIATE ATTORNEY ESCALATION**
- Federal facility + caller approaching 2-year deadline → **URGENT ATTORNEY REVIEW**
- Any facility + SOL within 6 months → **PRIORITY HANDLING**

### Step 2: The "Severity & Economics" Screen

Because proving a breach of the standard of care is incredibly expensive,
the damages MUST justify the cost under NM's statutory caps.

#### Damages Assessment Questions

Ask BEFORE investing 30+ minutes in a clinical interview:

| Question | Why It Matters |
|----------|----------------|
| "Did the malpractice result in death?" | Wrongful death — highest value, always investigate |
| "Did it cause permanent brain damage, paralysis, or loss of a limb or organ?" | Catastrophic — always investigate |
| "Did you require major corrective surgeries?" | Significant — investigate if multiple surgeries |
| "Are you permanently disabled from working?" | Lost earning capacity — major damages component |
| "Was this a birth injury to a child?" | Birth injuries — among highest-value med-mal cases |
| "Did you fully recover from the injury?" | If temporary with full recovery — likely NOT economically viable |

#### 2026 NM Damages Cap Reference

Intake staff MUST understand current NM damages caps:

| Damages Category | Cap | Notes |
|-----------------|-----|-------|
| **Non-economic damages (independent provider)** | $750,000 | Per qualified healthcare provider |
| **Non-economic damages (hospital/facility)** | $6,000,000 | Per facility |
| **Punitive damages — independent doctors** | $1,000,000 | NEW — 2026 HB 99 |
| **Punitive damages — local hospitals** | $6,000,000 | NEW — 2026 HB 99 |
| **Punitive damages — large hospital systems** | $15,000,000 | NEW — 2026 HB 99 |
| **Past medical expenses** | **UNCAPPED** | Actual costs, no limit |
| **Future medical expenses** | **UNCAPPED** | Life care plan, no limit |
| **Lost wages / earning capacity** | **UNCAPPED** | Economic damages, no limit |

**Economics Decision Rule:**
- Death, catastrophic injury, permanent disability, birth injury → **PROCEED** to full interview
- Major corrective surgery, significant ongoing treatment → **PROCEED** with flag for attorney review
- Temporary injury, full recovery, minimal treatment → **RESPECTFULLY DECLINE** and offer referral
- Uncertain severity → **PROCEED** with caution; flag for early attorney review

```yaml
# Update ikp_leads:
incident_type: MEDICAL-MALPRACTICE
medmal_facility_type: {STATE-COUNTY|FEDERAL|PRIVATE}
medmal_facility_name: {facility name}
medmal_severity_screen: {CATASTROPHIC|SEVERE|SIGNIFICANT|MODERATE|MINOR}
medmal_notice_deadline: {date if state/county, null otherwise}
```

---

## Phase 2: Comprehensive Clinical Interview

**Goal:** Gather specific clinical facts required for an initial attorney
review and a future physician expert.

### Step 3: The Medical Narrative & "The Breach"

Unlike standard PI where you ask "what happened," med-mal requires a
clinical narrative structured around what went wrong medically.

#### Baseline — Pre-Existing Condition

| Data Point | Question Template | Why It Matters |
|-----------|-------------------|----------------|
| Original condition | "Why did you originally go to the doctor/hospital? What health condition were you being treated for?" | Establishes baseline; separates pre-existing from malpractice injury |
| Prior health status | "Before this treatment, how was your overall health? Were you working, active, independent?" | Establishes pre-malpractice quality of life |
| Treatment history | "How long had you been treating for this condition? What treatments had you tried before?" | Context for whether the procedure was appropriate |

#### The Procedure/Treatment — What Went Wrong

| Data Point | Question Template | Why It Matters |
|-----------|-------------------|----------------|
| Provider identity | "Who was the doctor or nurse who made the mistake? What is their specialty?" | Identifies defendant; determines QHP status |
| Procedure/treatment | "What exactly was the procedure or treatment you received?" | Names the specific medical intervention |
| Date(s) | "When did this happen? Was it a single event or over multiple visits?" | Establishes timeline; SOL calculation |
| The error | "In your own words, what do you believe went wrong?" | Client's theory of the breach |
| What should have happened | "What were you told to expect from this treatment?" | Informed consent analysis |
| Warnings given | "Were you warned about the risks? Did you sign a consent form?" | Informed consent defense |
| Delayed diagnosis | "Were there symptoms or test results that were missed or ignored? For how long?" | Delayed diagnosis theory |

#### The Outcome — Expected vs. Actual

| Data Point | Question Template | Why It Matters |
|-----------|-------------------|----------------|
| Expected outcome | "What was the expected result of the treatment?" | Standard of care baseline |
| Actual outcome | "What actually happened? What is your condition now?" | The injury — central to damages |
| When realized | "When did you first realize something had gone wrong?" | Discovery rule analysis for SOL |
| Permanent effects | "Do your doctors believe the effects are permanent?" | Damages severity |

### Step 4: Subsequent Treating Providers ("The Fixers")

This is unique to med-mal and critically important.

| Data Point | Question Template | Why It Matters |
|-----------|-------------------|----------------|
| Corrective provider | "Who did you go to in order to get the mistake fixed?" | Subsequent treating physicians are the best source for establishing breach |
| Corrective facility | "Where did you go for corrective treatment? A different hospital or practice?" | Identifies potential favorable witnesses |
| What they said | "Did the new doctor say anything about what the previous doctor did? Did they say 'your previous doctor messed up' or something similar?" | **GOLD** — subsequent provider statements about prior breach |
| Corrective procedures | "What procedures did you need to correct the problem?" | Additional medical costs; severity of original error |
| Ongoing treatment | "Are you still receiving treatment for the effects of the original error?" | Future medical damages |

> **Why "The Fixers" Matter:** Subsequent treating physicians who explicitly
> criticize the prior provider's care are the strongest foundation for a
> malpractice claim. Their statements establish breach from a medical peer,
> and they may serve as fact witnesses (not just experts) since they treated
> the patient.

### Step 5: Check "Qualified Healthcare Provider" (QHP) Status

Before concluding the interview, determine the defendant's QHP status.

**Procedure:**
1. Check the NM Office of Superintendent of Insurance (OSI) database
2. Search for the provider by name and/or facility
3. Determine if they are paying into the Patient's Compensation Fund (PCF)

**Why QHP Status Matters:**

| QHP Status | Legal Consequence |
|-----------|-------------------|
| **IS a QHP** | NMMMA applies. Damages cap in effect. MUST file Application with NM Medical Review Commission (NMMRC) BEFORE filing lawsuit in District Court. Filing with NMMRC tolls the SOL. |
| **NOT a QHP** | NMMMA does NOT apply. No cap on non-economic damages. Can file directly in District Court. Standard PI procedures apply. |

```yaml
# Update ikp_leads:
medmal_provider_name: {provider name}
medmal_provider_specialty: {specialty}
medmal_qhp_status: {QHP|NON-QHP|UNKNOWN}
medmal_subsequent_provider: {corrective provider name, if any}
medmal_subsequent_provider_statements: {summary of what corrective provider said}
```

---

## Phase 3: "Investigation-Only" Onboarding

**Goal:** Secure the client's medical records without fully committing to a
lawsuit until an expert verifies the claim.

### Step 6: Execute an "Investigation Agreement"

Unlike auto collision cases, med-mal firms rarely sign a standard contingency
agreement promising to file a lawsuit on day one. Instead:

**Investigative Phase Retainer:**
- The firm agrees ONLY to gather medical records and pay an independent
  medical expert to review the file
- The firm legally RESERVES THE RIGHT to drop the case if the expert does
  not support a finding of malpractice
- The client understands this is an investigation, not a commitment to sue
- No contingency percentage is set until the case is formally accepted
  after expert review

| Document | Purpose | Key Terms |
|----------|---------|-----------|
| **Investigation Agreement** | Limits firm's commitment to investigation phase only | Firm may withdraw if expert does not support claim; client responsible for no fees during investigation; firm advances investigation costs |
| **HIPAA Authorization (Broad)** | Medical records release covering all providers | Must cover all past, present, and future providers |
| **HIPAA — Behavioral/Mental Health Addendum** | Separate NM-required authorization | NM hospitals REJECT releases without separate specific initials for behavioral/mental health records |
| **HIPAA — Substance Abuse Addendum** | 42 CFR Part 2 authorization | NM hospitals REJECT releases without separate specific initials for substance abuse records |
| **HIPAA — HIV/AIDS Addendum** | Separate NM-required authorization | NM hospitals REJECT releases without separate specific initials for HIV/AIDS records |

> **NM HIPAA Nuance:** New Mexico hospitals will REJECT HIPAA releases that
> do not have separate, specific initials for: (1) behavioral/mental health,
> (2) substance abuse, and (3) HIV/AIDS records. Standard blanket
> authorizations are insufficient. The firm's HIPAA form MUST include
> separate acknowledgment lines for each category with the client's initials.

### Step 7: Set NM-Specific Client Expectations

Tell the client explicitly:

| Expectation | Explanation |
|------------|-------------|
| **Timeline** | "NM medical malpractice cases take an average of 2 to 4 years from start to resolution." |
| **Investigation phase** | "Just ordering your medical records and getting a qualified doctor to review them will take 3 to 6 months of quiet time where it may seem like nothing is happening." |
| **No guarantee** | "We are investigating your case. If our expert does not support a malpractice claim, we will notify you promptly so you can seek a second opinion before any deadlines expire." |
| **Costs** | "Medical malpractice cases are extremely expensive to prosecute — expert fees alone can exceed $50,000-$100,000. We advance these costs but you should understand the investment required." |
| **NM Medical Review Commission** | "If the doctor is a qualified healthcare provider, New Mexico law requires us to go through a Medical Review Commission process before we can file a lawsuit. This adds time." |

```yaml
# Update ikp_leads:
status: INVESTIGATION
retainer_type: INVESTIGATIVE
medmal_investigation_start: {today ISO-8601}
```

---

## Phase 4: Case Opening & Administrative Setup (CO Integration)

**Goal:** Establish the complex medical file and secure zero-margin-for-error
deadlines.

### Step 8: System Setup & Rigid Docketing

When CO processes a med-mal case, the following modifications apply:

**CMS Case Type:** Open as "Investigative Med Mal" matter (NOT standard PI).

**Dual-Docketing Protocol:**
Two separate staff members MUST independently verify and calendar:
1. The Statute of Limitations expiration date
2. The 90-day NM Tort Claims Notice deadline (if state/county facility)
3. The FTCA 2-year deadline (if federal facility)

Both staff members sign off on the calendar entries. This dual-verification
prevents the single most catastrophic malpractice risk in the firm.

**Med-Mal File Structure Additions:**

```
cases/{CASE_CODE}/
├── [standard PI folders from CO]
├── 08-Expert-Review/
│   ├── Expert-Search/
│   ├── Expert-Reports/
│   ├── Expert-CV/
│   └── Expert-Correspondence/
├── 09-Medical-Chronology/
│   ├── Raw-Records/
│   ├── Chronology-Draft/
│   └── Missing-Records-Log/
├── 10-NMMRC/                    # NM Medical Review Commission
│   ├── Application/
│   ├── Panel-Submissions/
│   ├── Panel-Decision/
│   └── Correspondence/
├── 11-Standard-of-Care/
│   ├── Clinical-Guidelines/
│   ├── Published-Standards/
│   └── Expert-Analysis/
└── 12-Preservation/
    ├── Spoliation-Letters/
    └── EMR-Audit-Trail-Requests/
```

### Step 9: Send Preservation / Spoliation Letters

Med-mal preservation demands are MORE SPECIFIC than standard PI:

| Recipient | What to Preserve | Why |
|-----------|-----------------|-----|
| Facility Risk Management | Entire patient file, incident reports, root cause analysis, peer review materials (may be privileged), staffing records for relevant shifts, equipment maintenance logs | Comprehensive record preservation |
| **EMR Audit Trails / Metadata** | Electronic Medical Record audit trails showing every access, modification, addition, or deletion | **CRITICAL** — Proves if a provider went back into the computer and altered a chart or added fake notes after the injury. Courts treat EMR metadata as smoking-gun evidence of consciousness of guilt. |
| IT Department | EHR system metadata, backup tapes, server logs | Prevents claimed "routine purging" of electronic evidence |
| Pharmacy | Medication administration records, pharmacy dispensing logs | Drug errors, dosing verification |
| Nursing Department | Nursing flowsheets, handoff documentation, call light logs | Nursing negligence, response time |
| Radiology/Pathology | Original images (DICOM format), slides, interpretation reports | Misread imaging, pathology errors |

**Send via certified mail with return receipt.**

---

## Phase 5: Medical Record Collection & Internal Review

**Goal:** Build the "Medical Bible" to send to a reviewing physician.

### Step 10: Order ALL Medical Records (Strategically)

**Strategic Approach — Do NOT Send Letter of Representation Yet:**
- Send the HIPAA release directly to the records department
- Do NOT send a standard "Letter of Representation" to the target
  doctor/facility at this stage
- Reason: Sending an LOR triggers defensive behavior — the facility
  notifies risk management, the provider's insurer gets involved, and
  the records may be "reviewed" (potentially sanitized) before release

**Records to Request:**

| Record Type | From Whom | Format | Why |
|------------|-----------|--------|-----|
| Complete medical records | All treating facilities | Paper + electronic | Foundation of the case |
| Operative reports | Surgical facility | Paper | Details of what was done during surgery |
| Pathology reports / slides | Pathology lab | Reports + physical slides | Pathology errors, cancer misdiagnosis |
| Radiology images | Imaging facility | **DICOM format on CD/drive** — NOT printed films | Digital analysis, second opinions |
| Fetal monitor strips | OB/L&D unit | Paper or electronic | Birth injury cases — minute-by-minute baby status |
| Nursing flowsheets | Hospital | Paper or electronic | Nursing assessments, vital signs, interventions |
| Medication administration records (MAR) | Hospital pharmacy | Paper or electronic | Drug dosing, timing, allergies |
| Anesthesia records | Anesthesia department | Paper or electronic | Anesthesia errors, monitoring |
| Lab results | Laboratory | Paper or electronic | Missed abnormal results |
| Informed consent documents | Facility records | Paper | Was proper consent obtained? |

### Step 11: Paralegal / Nurse Medical Chronology

Once records arrive, the firm's in-house Legal Nurse Consultant (LNC) or
specialized Med Mal paralegal organizes the potentially thousands of pages:

**Chronology Format:**
- Strict day-by-day (or minute-by-minute for ER codes and births)
- Highlight suspected errors in RED
- Flag missing records in YELLOW
- Note discrepancies between different providers' notes
- Cross-reference nursing notes with physician orders
- Identify gaps in monitoring or assessment

**Chronology Output:**
```
MEDICAL CHRONOLOGY — {CASE_CODE}
Patient: {name}
Period: {first date} through {last date}

Date/Time | Provider | Entry Type | Content | FLAG
----------|----------|------------|---------|-----
{date}    | {name}   | {type}     | {text}  | [SUSPECTED ERROR] / [MISSING RECORD] / [DISCREPANCY]
```

**Flag Categories:**
- `[SUSPECTED ERROR]` — Entry that may evidence breach of standard of care
- `[MISSING RECORD]` — Expected record that was not produced
- `[DISCREPANCY]` — Conflicting entries between providers
- `[LATE ENTRY]` — Entry timestamped significantly after the event
- `[ALTERED]` — Evidence of chart alteration (EMR audit trail needed)

---

## Phase 6: Expert Review & The "Go / No-Go" Decision

**Goal:** Obtain legal backing from a medical peer to certify the malpractice.

### Step 12: Retain an Out-of-State Expert Witness

**Expert Selection Criteria:**
- Board-certified in the EXACT same specialty as the defendant doctor
- Active clinical practice (not retired-turned-expert)
- Licensed in good standing (no disciplinary history)
- Preferably from a respected institution
- Available for testimony if case goes to trial

**NM Strategy:** Because New Mexico has a small, tight-knit medical community,
you almost always must hire experts from out-of-state (e.g., Texas, Colorado,
Arizona, California). In-state experts risk:
- Personal relationships with the defendant
- Fear of professional retaliation
- Reluctance to testify against colleagues in a small market

**Expert Engagement:**
1. Send the complete Medical Chronology and source records
2. Request a preliminary written opinion on:
   - Standard of care applicable to the defendant's specialty
   - Whether the defendant breached that standard
   - Whether the breach caused the patient's injury
   - Whether the injury was distinct from the expected risks of the treatment
3. Expert must opine to "within reasonable degree of medical probability"

### Step 13: The Attorney "Go / No-Go" Decision

#### If Expert Says NO (No Breach or No Causation)

**Mandatory Actions:**
1. Send a detailed, certified **Non-Engagement / Declination Letter** immediately
2. The letter MUST include:
   - Clear statement the firm is NOT pursuing the case
   - The specific SOL expiration date
   - Recommendation to seek a second legal opinion BEFORE the SOL expires
   - Statement that the firm has NOT filed any claim on the client's behalf
3. Allow sufficient time for the client to find another attorney before SOL

```yaml
# Update ikp_leads:
status: DECLINED
decline_reason: EXPERT-NO-SUPPORT
medmal_expert_opinion: UNFAVORABLE
medmal_declination_date: {today ISO-8601}
medmal_sol_warning_in_letter: {SOL date}
```

#### If Expert Says YES (Breach + Causation Supported)

**Actions:**
1. Execute a **Full Litigation Retainer Agreement** (standard contingency)
2. Convert case status from INVESTIGATION to ACTIVE-LITIGATION
3. Set contingency fee percentage
4. Begin pre-suit requirements (Phase 7)

```yaml
# Update ikp_leads:
status: SIGNED
retainer_type: STANDARD
medmal_expert_opinion: FAVORABLE
medmal_litigation_start: {today ISO-8601}
fee_percentage: {agreed percentage}
```

---

## Phase 7: New Mexico Pre-Suit Requirements

**Goal:** Clear New Mexico's unique legal hurdles required before stepping
foot in District Court.

### Step 14: File Tort Claims Notices (If Not Done in Phase 1)

If a state/county hospital (UNMH, SRMC) is involved:
- Ensure the formal Notice of Claim has been PHYSICALLY RECEIVED by the
  NM Risk Management Division
- Track the date of receipt (not mailing date)
- Calendar all downstream deadlines from the receipt date

If a federal facility (VA, IHS) is involved:
- Ensure Form SF-95 has been properly filed with the appropriate agency
- Track the 6-month waiting period for agency response

### Step 15: The NM Medical Review Commission (NMMRC) Application

If the defendant is a Qualified Healthcare Provider (QHP):

**NM Law REQUIRES** that you CANNOT file a lawsuit in District Court until
you have submitted the case to the NMMRC.

**Application Contents:**
1. Draft a formal Application to the NMMRC
2. The Application acts like a mini-complaint outlining:
   - Identity of the patient and healthcare provider
   - Date(s) of the alleged malpractice
   - Description of the alleged malpractice
   - Injuries claimed
   - Expert support for the claim
3. File the Application with the NMMRC

**Critical Legal Effect:**
Filing the NMMRC Application **tolls (pauses) the Statute of Limitations**
until 30 days after the panel renders its final decision. This is protective
but must be done correctly.

```yaml
# Calendar entries for NMMRC:
medmal_nmmrc_filed: {filing date ISO-8601}
medmal_sol_tolled: true
medmal_sol_tolled_from: {filing date}
```

### Step 16: NMMRC Panel Hearing & Filing the Lawsuit

**Panel Composition:**
- Three (3) NM attorneys
- Three (3) NM healthcare providers in the defendant's specialty

**Panel Procedure:**
- Live testimony is NOT allowed
- Panel decides based on records and written/oral presentations
- Panel votes on whether malpractice occurred

**Panel Outcome:**

| Outcome | Legal Effect | Strategic Impact |
|---------|-------------|-----------------|
| **Favorable** (malpractice found) | Non-binding but admissible | Massive settlement leverage. Many cases settle after a favorable panel. |
| **Unfavorable** (no malpractice found) | Non-binding but admissible | Case can still proceed. Must address in demand/trial strategy. Defense WILL cite it. |
| **Split** | Non-binding | Neutral — neither side gets strong leverage. |

**After Panel Decision:**
Regardless of the panel's vote (the decision is non-binding), once the panel
renders its decision, the firm is legally cleared to file the **Complaint for
Medical Negligence** in New Mexico District Court.

The lawsuit must be filed within **30 days** of the panel's decision to avoid
SOL issues (the tolling ends 30 days after the decision).

```yaml
# Update case after NMMRC:
medmal_nmmrc_decision: {FAVORABLE|UNFAVORABLE|SPLIT}
medmal_nmmrc_decision_date: {date ISO-8601}
medmal_filing_deadline: {decision date + 30 days}
```

---

## Med-Mal Intake Data Model Extensions

The following fields extend the standard `ikp_leads` record for med-mal cases:

| Field | Type | Description |
|-------|------|-------------|
| `medmal_facility_type` | enum | STATE-COUNTY, FEDERAL, PRIVATE |
| `medmal_facility_name` | string | Name of the facility where malpractice occurred |
| `medmal_provider_name` | string | Name of the provider who committed malpractice |
| `medmal_provider_specialty` | string | Provider's medical specialty |
| `medmal_qhp_status` | enum | QHP, NON-QHP, UNKNOWN |
| `medmal_severity_screen` | enum | CATASTROPHIC, SEVERE, SIGNIFICANT, MODERATE, MINOR |
| `medmal_notice_deadline` | date | 90-day Tort Claims Notice deadline (state/county only) |
| `medmal_subsequent_provider` | string | Name of corrective treating provider |
| `medmal_subsequent_provider_statements` | text | What the corrective provider said about the error |
| `medmal_investigation_start` | date | Date investigation agreement was signed |
| `medmal_expert_opinion` | enum | FAVORABLE, UNFAVORABLE, PENDING |
| `medmal_litigation_start` | date | Date full retainer was executed after expert approval |
| `medmal_nmmrc_filed` | date | Date NMMRC application was filed |
| `medmal_nmmrc_decision` | enum | FAVORABLE, UNFAVORABLE, SPLIT, PENDING |
| `medmal_nmmrc_decision_date` | date | Date panel rendered decision |
| `medmal_filing_deadline` | date | 30 days after NMMRC decision |
| `medmal_sol_tolled` | boolean | Whether SOL is currently tolled by NMMRC filing |
| `medmal_declination_date` | date | Date declination letter sent (if declined) |

---

## Med-Mal Intake Workflow Chain

```
Phase 1: TRIAGE          Phase 2: CLINICAL        Phase 3: ONBOARD
+------------------+    +------------------+    +---------------------+
| Facility type    |    | Medical narrative |    | Investigation       |
| (minefield check)|--->| Breach theory    |--->| agreement (not      |
| Severity/econ    |    | Fixers interview |    | full retainer)      |
| screen           |    | QHP status check |    | NM HIPAA nuances    |
+------------------+    +------------------+    | Client expectations |
                                                 +---------------------+
                                                          |
Phase 4: SETUP           Phase 5: RECORDS         Phase 6: EXPERT
+------------------+    +------------------+    +---------------------+
| CMS as           |    | Strategic record |    | Out-of-state expert |
| "Investigative   |<---| collection       |<---| Same specialty      |
| Med Mal"         |    | (no LOR yet)     |    | Go / No-Go decision |
| Dual docketing   |    | Medical chronol. |    |                     |
| Preservation ltrs|    | Nurse review     |    +---------------------+
+------------------+    +------------------+              |
                                                          v
                                                 Phase 7: PRE-SUIT
                                                 +---------------------+
                                                 | Tort Claims Notice  |
                                                 | (if state/county)   |
                                                 | NMMRC Application   |
                                                 | (if QHP)            |
                                                 | Panel Hearing       |
                                                 | File Complaint      |
                                                 +---------------------+
```

---

## Common Med-Mal Intake Pitfalls

1. **Failing to identify facility type FIRST** — Missing a 90-day Tort Claims
   Notice deadline is catastrophic and irreversible.
2. **Taking economically non-viable cases** — A temporary injury with full
   recovery will cost $50K+ in experts with no economic return.
3. **Using a standard contingency retainer** — Sign an Investigation Agreement
   first; only convert to full retainer after expert support.
4. **Standard HIPAA forms** — NM hospitals reject authorizations without
   separate initials for behavioral health, substance abuse, and HIV/AIDS.
5. **Sending LOR to target provider too early** — Triggers defensive behavior
   and risk management interference. Get records first via HIPAA release.
6. **Using in-state experts** — NM's small medical community creates bias
   and retaliation risks. Use Texas, Colorado, or Arizona experts.
7. **Not checking QHP status** — Determines whether NMMRC filing is required
   and whether damages caps apply.
8. **Not preserving EMR audit trails** — Electronic metadata is the smoking
   gun for chart alteration. Always demand it in preservation letters.
9. **Missing the 30-day post-NMMRC filing window** — SOL tolling ends 30
   days after the panel decision. The complaint MUST be filed in time.
10. **Not dual-docketing deadlines** — Two staff members must independently
    verify and calendar every critical deadline.
