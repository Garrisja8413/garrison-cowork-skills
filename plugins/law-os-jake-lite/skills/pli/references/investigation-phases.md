# PLI Investigation Phases — Detailed Procedures

## Phase 1: LAUNCH — Investigation Initialization

### 1.1 Case File Setup

Upon receiving a SIGNED case from IKP/CO, create the investigation file:

```
Investigation File Structure:
  /Case-{ID}/
    /01-Scene/
      /Photos/
      /Measurements/
      /Diagrams/
    /02-Witnesses/
      /Statements/
      /Contact-Log/
    /03-Medical-Records/
      /ER/
      /Treating-Physicians/
      /Imaging/
      /Pharmacy/
      /Pre-Existing/
    /04-Police-Reports/
    /05-Insurance/
      /Defendant-Policy/
      /Client-Policy/
      /Declarations-Pages/
    /06-Employment/
      /Wage-Records/
      /Job-Description/
    /07-Expert-Reports/
    /08-Correspondence/
      /Spoliation-Letters/
      /Tort-Claims-Notices/
      /Records-Requests/
    /09-Photos-Video/
      /Scene/
      /Vehicle-Damage/
      /Injuries/
      /Surveillance/
```

### 1.2 Investigation Plan Template

For each accepted case, generate an investigation plan:

```
INVESTIGATION PLAN — Case {ID}

Client: {name}
DOI: {date}
Case Type: {MVC / Premises / Med Mal / Product / Other}
Assigned Attorney: {name}
Assigned Paralegal: {name}
Assigned Investigator: {name, if applicable}

CRITICAL DEADLINES:
  Tort Claims Notice:  {DOI + 90 days, if govt defendant}
  SOL Expiration:      {DOI + SOL period}
  Scene Visit:         {acceptance + 72 hours}
  Spoliation Letters:  {acceptance + 48 hours}

INVESTIGATION PRIORITIES:
  1. [Priority task based on case type]
  2. [Priority task]
  3. [Priority task]

ESTIMATED INVESTIGATION TIMELINE:
  Phase 1 (Launch):   Day 1
  Phase 2 (Scene):    Days 1-3
  Phase 3 (Witness):  Days 1-14
  Phase 4 (Records):  Days 1-90
  Phase 5 (Coverage): Days 1-30
  Phase 6 (Expert):   Days 30-90
  Target Completion:  {date}
```

### 1.3 First-Day Checklist

These items must be completed on the day of case acceptance:

| # | Task | Assigned To | Deadline | Status |
|---|------|-------------|----------|--------|
| 1 | Import IKP/CO data into investigation file | Paralegal | Day 1 | |
| 2 | Calculate and calendar ALL deadlines | Paralegal | Day 1 | |
| 3 | Identify government defendants (Tort Claims trigger) | Attorney | Day 1 | |
| 4 | Draft spoliation letters | Attorney | Day 1 (send by Day 2) | |
| 5 | Send medical records authorizations to all known providers | Paralegal | Day 1 | |
| 6 | Request police report | Paralegal | Day 1 | |
| 7 | Schedule scene visit | Investigator/Paralegal | Day 1 (visit by Day 3) | |
| 8 | Open claim with defendant's insurer (if not already open) | Paralegal | Day 1 | |
| 9 | File MedPay/PIP claim with client's insurer | Paralegal | Day 1 | |
| 10 | Send Letter of Representation to all known parties | Attorney | Day 1 | |

---

## Phase 2: SCENE — Scene Investigation Procedures

### 2.1 Pre-Visit Preparation

Before visiting the scene:

1. **Review the police report** (if available) for scene description and diagram
2. **Review client's narrative** from IKP interview
3. **Check Google Maps/Street View** for preliminary layout understanding
4. **Identify time of day** of the original incident — visit at the same time
   if possible to match lighting and traffic conditions
5. **Gather equipment:** Camera (high-res), measuring tape/wheel, notepad,
   traffic cone (for scale reference), compass, charged phone with GPS

### 2.2 Motor Vehicle Collision Scene Protocol

| Step | Action | Documentation |
|------|--------|--------------|
| 1 | Approach from each party's direction of travel | Wide-angle photos showing what each driver saw |
| 2 | Document all traffic control devices | Photos of each signal, sign, lane marking within 500 ft |
| 3 | Measure intersection/roadway dimensions | Tape measure — lane widths, crosswalk, turn lanes |
| 4 | Document road surface | Photos + notes — potholes, grade, curve radius, drainage |
| 5 | Check sight lines | Stand at each driver's position, photograph view at eye level |
| 6 | Look for physical evidence | Skid marks, gouge marks, debris, fluid stains |
| 7 | Identify nearby cameras | Business security, traffic cameras, residential doorbells |
| 8 | Note current traffic patterns | Volume, speed, common maneuvers at this location |
| 9 | Check for construction or temporary conditions | Work zones, temporary signals, detours |
| 10 | GPS-tag all key locations | Point of impact, rest positions, traffic controls |

### 2.3 Premises Liability Scene Protocol

| Step | Action | Documentation |
|------|--------|--------------|
| 1 | Photograph the hazard/defect | Multiple angles with scale reference |
| 2 | Measure the defect | Depth, height differential, width of crack/hole |
| 3 | Document lighting conditions | Lux readings if possible, photo of light fixtures |
| 4 | Check for warning signs or barriers | Present or absent — both are relevant |
| 5 | Document maintenance indicators | Age of surfaces, repair history visible |
| 6 | Identify property owner/manager | Signage, property records, on-site inquiry |
| 7 | Check building codes | Handrail height, stair tread depth, ADA compliance |
| 8 | Document weather conditions | Rain, ice, snow — and drainage adequacy |
| 9 | Canvas for witnesses | Employees, regular visitors, neighboring businesses |
| 10 | Request incident reports | Ask property manager for their internal reports |

### 2.4 Scene Report Template

```
SCENE INVESTIGATION REPORT

Case ID:          {ID}
Investigator:     {name}
Date/Time of Visit: {date, time}
Weather at Visit:   {conditions}
Weather at DOI:     {historical weather data}

LOCATION:
  Address:        {full address}
  GPS:            {coordinates}
  Description:    {intersection / parking lot / sidewalk / building interior}

OBSERVATIONS:
  [Detailed narrative of scene conditions]

MEASUREMENTS:
  [Table of all measurements taken]

TRAFFIC CONTROLS:
  [List of signals, signs, markings]

PHYSICAL EVIDENCE:
  [Skid marks, debris, damage to structures]

NEARBY CAMERAS IDENTIFIED:
  [List with business names, camera types, contact info]

PHOTOS TAKEN:
  [Numbered list with descriptions]
  Photo 1: {description}
  Photo 2: {description}
  ...

COMPARISON TO CLIENT NARRATIVE:
  [Consistent / Inconsistent points]

INVESTIGATOR NOTES:
  [Observations relevant to liability analysis]
```

---

## Phase 3: WITNESS — Witness Location & Statement Procedures

### 3.1 Witness Identification Sources

| Source | Information Available |
|--------|---------------------|
| Police report | Names, addresses, phone numbers of witnesses interviewed |
| Client interview | Names/descriptions of people at the scene |
| EMS run report | Bystanders who assisted, other patients treated |
| 911 call records | Caller identity (may be a witness) |
| Business employees | Staff on duty at incident location |
| Nearby residents | People who may have seen/heard the incident |
| Social media | Posts about the incident from witnesses |

### 3.2 Skip Tracing for Unlocated Witnesses

When police report contact info is outdated or incomplete:

1. **Public records databases** — TLO, Accurint, LexisNexis
2. **Social media search** — Facebook, Instagram, LinkedIn by name and location
3. **Voter registration** — NM Secretary of State records
4. **Property records** — County assessor for current address
5. **Court records** — Odyssey/SOPA for current address from recent cases
6. **In-person visit** — Last known address, ask neighbors for forwarding info

### 3.3 Witness Interview Best Practices

**DO:**
- Let the witness tell their story in their own words first
- Ask open-ended questions: "What did you see?" not "Did you see the red car run the light?"
- Ask about the witness's vantage point, distance, and obstructions
- Ask what the witness did after the incident (stayed, left, called 911)
- Ask if the witness took photos or video
- Ask if the witness spoke with anyone else about the incident
- Record the interview (with consent) in addition to the written statement

**DO NOT:**
- Lead the witness toward a particular version of events
- Show the witness other statements or the police report before their interview
- Promise the witness anything (compensation, anonymity in litigation)
- Pressure an unwilling witness — note the refusal and move on
- Interview a witness represented by counsel without their attorney's consent

### 3.4 Witness Statement Template

```
WITNESS STATEMENT

I, [Full Legal Name], residing at [Address], [City], [State] [Zip],
provide the following statement voluntarily:

On [Date of Incident], at approximately [Time], I was located at
[Witness Location] when the following occurred:

[Witness narrative — in their own words]

I [was/was not] interviewed by police at the scene.
I [did/did not] take photos or video of the incident.
I [have/have not] spoken with anyone else about this incident.

I declare under penalty of perjury that the foregoing is true and
correct to the best of my knowledge and recollection.

Witness Signature: _______________
Printed Name:      _______________
Date:              _______________
Phone:             _______________
Email:             _______________

Statement taken by: _______________
Date/Time/Location: _______________
```

---

## Phase 4: RECORDS — Records Collection Procedures

### 4.1 Medical Records Request Letter Template

```
[FIRM LETTERHEAD]

[Date]

Medical Records Department
[Provider Name]
[Address]

RE: Records Request — Authorization Enclosed
    Patient: [Client Name]
    DOB: [Date of Birth]
    Dates of Service: [DOI] to Present

Dear Records Custodian:

Enclosed please find a signed HIPAA/HITECH authorization from our
client, [Client Name]. Please provide complete copies of the following:

1. All medical records, including but not limited to:
   - Office/clinic notes and progress notes
   - Emergency department records
   - Hospital admission and discharge summaries
   - Operative reports and anesthesia records
   - Diagnostic imaging reports (X-ray, MRI, CT)
   - Laboratory results
   - Physical therapy / rehabilitation notes
   - Referral letters
   - Prescription records

2. All billing records, including:
   - Itemized billing statements
   - Explanation of Benefits (EOBs)
   - Payment ledger showing amounts billed, paid, and outstanding

Please forward these records to our office at your earliest convenience.
If there are any questions or if additional authorization is needed,
please contact [Paralegal Name] at [Phone] or [Email].

Thank you for your prompt attention.

Sincerely,
[Attorney Name]
[Firm Name]

Enc: HIPAA/HITECH Authorization
```

### 4.2 Police Report Request Procedures

**New Mexico agencies:**

| Agency | Request Method | Fee | Turnaround |
|--------|---------------|-----|------------|
| Albuquerque PD | Online portal or in-person | $5-15 | 5-10 business days |
| State Police (NMSP) | Written request to Records Bureau | $5-10 | 10-15 business days |
| County Sheriff | Written request or in-person | Varies | 5-15 business days |
| Municipal PD (other) | Written request to Records Div | Varies | 5-15 business days |

**Include in every request:**
- Date and approximate time of incident
- Location of incident
- Names of parties involved
- Report number (if known)
- Copy of Letter of Representation

### 4.3 Employment Records Request

For wage loss documentation:

| Record | Purpose |
|--------|---------|
| Pay stubs (12 months pre-DOI + post-DOI) | Establish baseline earnings and post-incident loss |
| W-2 or 1099 (3 years pre-DOI) | Verify annual income history |
| Job description | Document physical requirements affected by injuries |
| Attendance records | Show days missed due to injuries |
| Performance reviews (if relevant) | Document pre-injury work capacity |
| Benefits documentation | Quantify lost benefits (health insurance, retirement) |
| FMLA / disability leave records | Document formal medical leave |
| Return-to-work restrictions | Show ongoing limitations |

---

## Phase 5: COVERAGE — Insurance Coverage Investigation Procedures

### 5.1 Defendant's Liability Coverage

**Step 1:** Check police report for defendant's insurance info
**Step 2:** If not in police report, check with client's insurer (they may have it)
**Step 3:** Send Letter of Representation to defendant's carrier
**Step 4:** Request policy limits disclosure per NMSA 39-2-2(B)
**Step 5:** Calendar 30-day disclosure deadline

### 5.2 Client's UM/UIM Coverage Analysis

| Question | Why It Matters |
|----------|---------------|
| Does client have UM/UIM coverage? | Additional source of recovery if defendant underinsured |
| What are the UM/UIM limits? | May exceed defendant's limits |
| Is stacking available? | NM allows stacking of UM/UIM across vehicles on policy |
| Are there other household policies? | Resident relatives may have UM/UIM that covers client |
| Was UM/UIM properly rejected? | If insurer cannot prove valid written rejection, statutory minimums apply |

**NM UM/UIM Key Rules:**
- UM/UIM coverage is mandatory unless validly rejected in writing (NMSA 66-5-301)
- Stacking is permitted unless anti-stacking provision was properly offered and accepted
- Jordan v. Allstate (2010): UM/UIM rejection must be on a separate form signed by the named insured

### 5.3 MedPay / PIP Quick-Start

File the MedPay/PIP claim on Day 1:

1. Contact client's auto insurer
2. Provide Letter of Representation
3. Submit claim with incident details and initial medical records
4. MedPay pays regardless of fault — use to fund ongoing treatment
5. Track MedPay payments against policy limits
6. Monitor for subrogation rights (carrier may assert lien)

### 5.4 Coverage Map Template

```
COVERAGE MAP — Case {ID}

DEFENDANT COVERAGE:
  Carrier:        {name}
  Policy #:       {number}
  Liability Limits: ${amount} / ${amount}
  Umbrella/Excess:  ${amount} (or NONE / UNKNOWN)
  Adjuster:       {name, phone, email}
  Claim #:        {number}

CLIENT UM/UIM:
  Carrier:        {name}
  Policy #:       {number}
  UM/UIM Limits:  ${amount} / ${amount}
  Stacking:       YES / NO / INVESTIGATING
  Valid Rejection: N/A / YES (form on file) / NO (statutory minimum applies)

CLIENT MEDPAY/PIP:
  Carrier:        {same as UM/UIM}
  MedPay Limits:  ${amount}
  Amount Used:    ${amount}
  Amount Remaining: ${amount}

CLIENT HEALTH INSURANCE:
  Carrier:        {name}
  Type:           {Private / Medicare / Medicaid / Tricare / VA}
  Lien/Subrogation: YES / NO / INVESTIGATING
  Amount Paid:    ${amount}

OTHER COVERAGE:
  [List any additional policies — employer, premises owner, etc.]

TOTAL AVAILABLE COVERAGE:
  Defendant Liability:  ${amount}
  Defendant Umbrella:   ${amount}
  Client UM/UIM:        ${amount}
  GRAND TOTAL:          ${amount}
```

---

## Phase 6: EXPERT — Expert Consultation Procedures

### 6.1 Expert Selection Criteria

| Factor | Evaluation |
|--------|-----------|
| Qualifications | Board certifications, degrees, publications relevant to the issue |
| Experience | Years in field, number of times testified, types of cases |
| Testimony history | Track record of being qualified/excluded, Daubert challenges |
| Geographic relevance | NM experience preferred for jury credibility |
| Fee structure | Hourly rate, retainer, estimated total — must be within case budget |
| Availability | Timeline compatibility with case deadlines |
| Communication | Ability to explain complex issues in plain language |

### 6.2 Expert Retention Letter Template

```
[FIRM LETTERHEAD]

[Date]

[Expert Name, Credentials]
[Address]

RE: Expert Consultation — [Client Name] v. [Defendant Name]
    Case No.: [Pre-litigation — no case number yet]

Dear [Expert Name]:

We are writing to retain your services as a [type] expert in connection
with the above-referenced matter. The facts are briefly as follows:

[2-3 paragraph summary of incident, injuries, and issues requiring
expert analysis]

We are requesting your:
[ ] Preliminary consultation and verbal opinion
[ ] Written report
[ ] Trial testimony (if case proceeds to litigation)

Enclosed please find the following materials for your review:
1. [List of records provided]
2. [List of records provided]

We understand your fee schedule is:
  Review/Consultation: $[amount]/hour
  Report Preparation:  $[amount]/hour
  Deposition:          $[amount]/half-day
  Trial Testimony:     $[amount]/half-day
  Retainer:            $[amount]

Please confirm your availability and willingness to assist. All
materials and communications are protected attorney work product
and are strictly confidential.

Sincerely,
[Attorney Name]
```

### 6.3 Common Expert Types for NM PI Cases

| Expert | When Needed | Typical Cost Range |
|--------|------------|-------------------|
| Accident Reconstructionist | Multi-vehicle, disputed fault, high-speed | $5,000 - $25,000 |
| Biomechanical Engineer | Disputed injury causation from impact forces | $5,000 - $15,000 |
| Medical Expert (IME) | Disputed diagnosis, causation, or prognosis | $2,500 - $10,000 |
| Life Care Planner | Catastrophic injury, long-term care needs | $5,000 - $15,000 |
| Vocational Rehabilitation | Lost earning capacity, disability | $3,000 - $8,000 |
| Economist | Future damages calculation, present value | $3,000 - $8,000 |
| Human Factors Expert | Visibility, perception-reaction time | $5,000 - $15,000 |
| Safety/Code Expert | Premises liability, OSHA violations | $3,000 - $10,000 |

---

## Investigation Status Dashboard

### Master Checklist Template

| # | Category | Item | Status | Assigned | Deadline | Completed |
|---|----------|------|--------|----------|----------|-----------|
| 1 | PRESERVE | Spoliation letters sent | | | +48 hrs | |
| 2 | PRESERVE | Tort Claims Notice filed (if govt) | | | DOI+90 | |
| 3 | SCENE | Scene photos taken | | | +72 hrs | |
| 4 | SCENE | Surveillance camera canvas | | | +48 hrs | |
| 5 | RECORDS | Police report requested | | | +5 days | |
| 6 | RECORDS | Medical records requested (all providers) | | | +5 days | |
| 7 | RECORDS | Employment records requested | | | +30 days | |
| 8 | WITNESS | All witnesses contacted | | | +14 days | |
| 9 | WITNESS | Written statements obtained | | | +30 days | |
| 10 | COVERAGE | Defendant policy identified | | | +14 days | |
| 11 | COVERAGE | Policy limits requested | | | +14 days | |
| 12 | COVERAGE | Client UM/UIM analyzed | | | +7 days | |
| 13 | COVERAGE | MedPay/PIP claim filed | | | +1 day | |
| 14 | RECORDS | All medical records received | | | +90 days | |
| 15 | RECORDS | Police report received | | | +30 days | |
| 16 | EXPERT | Liability expert consulted (if needed) | | | +60 days | |
| 17 | EXPERT | Medical expert consulted (if needed) | | | +60 days | |
| 18 | COVERAGE | Coverage map complete | | | +30 days | |
| 19 | STATUS | Investigation file complete | | | +120 days | |
| 20 | STATUS | Attorney review and case evaluation | | | +120 days | |

### Completion Scoring

| Score | Meaning | Next Step |
|-------|---------|-----------|
| 0-25% | Early investigation | Focus on PRESERVE and SCENE tasks |
| 26-50% | Active records collection | Follow up on outstanding requests |
| 51-75% | Records received, gaps identified | Target remaining items, expert consults |
| 76-99% | Near-complete | Attorney review, fill final gaps |
| 100% | Investigation complete | Ready for DEMAND or COMPLAINT skill |
