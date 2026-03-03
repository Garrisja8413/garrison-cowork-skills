# Phase 1: Triage — Entity & Deadline Screen

## Purpose

Immediately identify the bad actor to trigger the correct statutory deadlines,
rule out sovereign immunity hurdles, and check for fatal legal barriers (Heck
v. Humphrey, PLRA exhaustion). This phase must be completed before hearing the
full emotional narrative.

## Step 1: Identify the Bad Actor (Entity Test)

### Required First Questions

Ask these before any other substantive discussion:

1. "Who did this to you? Was it the police, a government agency, an employer,
   a landlord, or someone else?"
2. "Which specific agency, department, or organization?"
3. "When did this happen? What was the exact date?"

### Entity Classification Decision Tree

```
Who violated the client's rights?
│
├── STATE, COUNTY, or MUNICIPAL ACTOR
│   (APD, BCSO, NMSP, MDC, NMCD, local schools, state agencies)
│   │
│   ├── Law enforcement conduct / constitutional rights?
│   │   ├── YES → NMCRA + NMTCA + potentially §1983
│   │   │         90-day Tort Claims Notice (NMSA §41-4-16(A))
│   │   │         90-day CRA Notice (NMSA §41-4A-12)
│   │   │         2-year SOL (NMCRA: §41-4A-14)
│   │   │         3-year SOL (§1983: NMSA §37-1-8)
│   │   │
│   │   └── NO (non-police government negligence) → NMTCA only
│   │             90-day Tort Claims Notice
│   │             2-year SOL (NMSA §41-4-15)
│   │
│   └── Employment discrimination by government employer?
│       → NMHRA + Title VII + potentially NMCRA
│         300-day EEOC/NMHRB charge
│         90-day Tort Claims Notice (if suing entity directly)
│
├── FEDERAL AGENT
│   (FBI, DEA, ICE, Border Patrol, BIA/Tribal Police, federal prison staff)
│   │
│   ├── FTCA (Federal Tort Claims Act) + Bivens claims
│   ├── File Form SF-95 within 2 years
│   ├── NMCRA does NOT apply (no state ban on qualified immunity)
│   └── Federal qualified immunity DOES apply
│
├── PRIVATE EMPLOYER (discrimination)
│   │
│   ├── NMHRA (NM Human Rights Act)
│   ├── Title VII / ADA / ADEA (if 15+ employees)
│   ├── 300-day deadline to file charge with EEOC/NMHRB
│   └── No Tort Claims Notice required
│
├── PRIVATE LANDLORD (housing discrimination)
│   │
│   ├── NMHRA + Fair Housing Act
│   ├── 300-day NMHRB charge / 1-year HUD complaint
│   └── No Tort Claims Notice required
│
└── PRIVATE BUSINESS (public accommodation discrimination)
    │
    ├── NMHRA + Title II (Civil Rights Act of 1964)
    ├── 300-day NMHRB charge
    └── No Tort Claims Notice required
```

### Entity Recognition Patterns

**State/Local Law Enforcement:**
- "APD" / "Albuquerque Police Department"
- "BCSO" / "Bernalillo County Sheriff's Office"
- "NMSP" / "New Mexico State Police"
- "Santa Fe Police" / any municipal PD
- "Campus police" (if state university)
- "School resource officer" (public school)

**State/Local Corrections:**
- "MDC" / "Metropolitan Detention Center"
- "NMCD" / "New Mexico Corrections Department"
- "county jail" / "detention center"
- "juvenile detention"

**Federal Agents:**
- "FBI" / "Federal Bureau of Investigation"
- "DEA" / "Drug Enforcement Administration"
- "ICE" / "Immigration and Customs Enforcement"
- "Border Patrol" / "CBP"
- "BIA Police" / "Bureau of Indian Affairs"
- "US Marshals"
- "Federal prison" / "BOP"

**Discrimination — Private:**
- Any employer name + discriminatory conduct
- Landlord / property management company + housing denial
- Restaurant / store / hotel + denial of service

### Deadline Calculation

Once the entity is identified, compute all applicable deadlines immediately:

```
Entity: {entity_name}
Entity Type: {STATE-LOCAL | FEDERAL | PRIVATE-EMPLOYER | PRIVATE-LANDLORD | PRIVATE-BUSINESS}
Date of Incident: {DOI}
Date of Intake: {today}

DEADLINE CALCULATIONS:
┌─────────────────────────────────┬──────────────┬──────────────┬───────────┐
│ Deadline                        │ Due Date     │ Days Left    │ Urgency   │
├─────────────────────────────────┼──────────────┼──────────────┼───────────┤
│ 90-Day Tort Claims Notice       │ DOI + 90d    │ {computed}   │ {tier}    │
│ 90-Day CRA Notice               │ DOI + 90d    │ {computed}   │ {tier}    │
│ 300-Day EEOC/NMHRB Charge       │ DOI + 300d   │ {computed}   │ {tier}    │
│ 2-Year FTCA (SF-95)             │ DOI + 2yr    │ {computed}   │ {tier}    │
│ 2-Year SOL (NMCRA)              │ DOI + 2yr    │ {computed}   │ {tier}    │
│ 3-Year SOL (§ 1983)             │ DOI + 3yr    │ {computed}   │ {tier}    │
│ 6-Month Notice (wrongful death) │ DOD + 6mo    │ {computed}   │ {tier}    │
└─────────────────────────────────┴──────────────┴──────────────┴───────────┘

Urgency Tiers:
  CRITICAL  = ≤ 10 days  → STOP intake, escalate to attorney NOW
  EMERGENCY = 11-30 days → Same-day attorney review, expedited signing
  URGENT    = 31-60 days → Prioritize, schedule consultation within 3 days
  WATCH     = 61-90 days → Normal priority, monitor closely
  OK        = > 90 days  → Standard pipeline processing
```

### Wrongful Death Special Rules

If the client died as a result of the civil rights violation:
- Tort Claims Notice deadline: **6 months** from date of death (not 90 days)
- SOL: 3 years from date of death
- Standing: Only the personal representative of the estate can bring the claim
- Verify: Has an estate been opened? Who is the PR?

## Step 2: Criminal Status Check (Heck v. Humphrey)

### The Heck Doctrine

Under *Heck v. Humphrey*, 512 U.S. 477 (1994), a person generally cannot
sue police for civil rights violations if a successful civil suit would
necessarily imply the invalidity of an existing criminal conviction or pending
charge.

**Example:** Client pleads guilty to "Battery on a Peace Officer." A civil
excessive force claim would require proving the officer used unlawful force —
but the guilty plea establishes the client committed battery on the officer.
The civil claim would "necessarily imply" the plea was invalid. Result: the
civil claim is Heck-barred.

### Mandatory SOPA Search Protocol

1. Access NM Courts Secured Odyssey Public Access (SOPA)
2. Search by client's full legal name AND date of birth
3. Filter for the date of incident and 30 days prior/after
4. Document findings:

```
HECK v. HUMPHREY STATUS CHECK
Client: {name}
DOI: {date}
SOPA Search Date: {today}

Findings:
  [ ] No cases found → HECK STATUS: CLEAR
  [ ] Case found — DISMISSED → HECK STATUS: CLEAR
  [ ] Case found — PENDING → HECK STATUS: PENDING-CHARGES
      Case No: _______________
      Charges: _______________
      Criminal Attorney: _______________
      Next Court Date: _______________
  [ ] Case found — GUILTY PLEA → HECK STATUS: PLEA
      Charges pled to: _______________
      Plea Date: _______________
  [ ] Case found — CONVICTED AT TRIAL → HECK STATUS: CONVICTED
      Charges convicted: _______________
      Conviction Date: _______________
```

### Criminal Status Decision Matrix

| Status | Action | Can Proceed? |
|--------|--------|-------------|
| CLEAR | No criminal barrier. Proceed normally. | YES |
| PENDING-CHARGES | Get criminal attorney name. Attorney must coordinate. | CONDITIONAL — attorney decision |
| PLEA (minor charge) | Attorney evaluates whether plea bars specific civil claims | CONDITIONAL — attorney decision |
| PLEA (battery on officer, resisting) | Likely fatal to excessive force claim | LIKELY NO — attorney must evaluate |
| CONVICTED | May bar claims that would invalidate conviction | LIKELY NO — attorney must evaluate |

### Critical Coordination Rule

If criminal charges are PENDING:
- Get the criminal defense attorney's name and phone immediately
- The civil firm MUST contact the criminal attorney within 48 hours
- Strategy: Prevent the criminal attorney from accepting a plea that
  waives civil liability (e.g., battery on a peace officer)
- The criminal attorney can subpoena bodycam video through criminal
  discovery (Rule 5-501) faster than IPRA

## Step 3: PLRA Grievance Check (Jail/Prison Cases Only)

### The PLRA Exhaustion Requirement

Under the Prison Litigation Reform Act, 42 U.S.C. § 1997e(a), an inmate
MUST exhaust all available administrative remedies (internal grievances)
before filing a federal lawsuit under § 1983.

**This is a mandatory, non-waivable prerequisite.** A federal judge will
dismiss the case immediately — even if the underlying violation is egregious —
if the inmate did not properly grieve it through the facility's process.

### PLRA Screening Questions

Ask every client whose injury occurred in a correctional facility:

| # | Question | Required Answer |
|---|----------|----------------|
| 1 | "Were you still in the facility when this happened?" | Establishes PLRA applies |
| 2 | "Did you file a formal, written grievance about this incident?" | Must be YES |
| 3 | "Did you use the jail's kiosk system or official grievance form?" | Must be YES |
| 4 | "Did you receive a written response to your grievance?" | Document response |
| 5 | "Did you appeal the response to the next level?" | Must be YES |
| 6 | "Did you appeal to the highest level available?" | Must be YES for full exhaustion |
| 7 | "Do you have copies of your grievances and responses?" | Ideal but not required |

### PLRA Status Classification

```
PLRA EXHAUSTION CHECK
Facility: {name}
Incident Date: {date}

Grievance Filed:    [ ] YES  [ ] NO
Appeal Level 1:     [ ] YES  [ ] NO  [ ] N/A
Appeal Level 2:     [ ] YES  [ ] NO  [ ] N/A
Highest Level:      [ ] YES  [ ] NO
Copies Available:   [ ] YES  [ ] NO

PLRA STATUS: {EXHAUSTED | DEFICIENT | N/A}
```

### PLRA-Deficient Cases

If the client did NOT exhaust grievances:
- The **federal § 1983** claim is almost certainly barred
- The **state NMCRA** claim may still be viable (the PLRA is a federal
  statute and does not apply to state-law claims filed in state court)
- Flag the case as PLRA-DEFICIENT and note the state-court-only path
- Attorney must evaluate whether the NMCRA claim alone justifies the case

### Exceptions to PLRA Exhaustion

The exhaustion requirement may be excused if:
- The grievance process was effectively unavailable (e.g., kiosk broken,
  staff refused to provide forms, threats of retaliation)
- The facility thwarted the inmate's attempts to grieve
- Document any evidence of administrative process obstruction

## Triage Completion Checklist

Before proceeding to Phase 2 (INTERVIEW), confirm:

```
TRIAGE COMPLETION — {lead_id}

[ ] Entity identified and classified
[ ] All applicable deadlines calculated
[ ] Deadline urgency tier assigned
[ ] SOPA criminal status search completed
[ ] Heck v. Humphrey status determined
[ ] PLRA grievance check completed (if jail/prison case)
[ ] Lead record created in crhr_leads
[ ] Activity log entry recorded

CHECKPOINT 1: Attorney review required before proceeding to INTERVIEW
  Attorney: _______________
  Review Date: _______________
  Decision: [ ] PROCEED TO INTERVIEW  [ ] DECLINE  [ ] HOLD
  Notes: _______________
```
