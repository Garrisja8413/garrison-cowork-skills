# Matrix C: Subject Area Ontologies — Detailed Reference

## Overview

Matrix C provides domain-specific questioning frameworks that overlay the
3-Gear architecture. The AI selects the appropriate ontology engine based on
the case type and tailors question content, document strategies, and
analytical calculations accordingly.

---

## Engine 1: PI / Med-Mal (Kinematic / Medical Engine)

### Scope
Personal injury and medical malpractice cases requiring:
- Accident reconstruction / kinematic analysis
- Medical chronology and standard-of-care questioning
- Causation chain establishment

### Kinematic Sub-Engine (Accident/Premises Cases)

**AI Capability:** Real-time spatial and physics reasoning during deposition to
identify inconsistencies in witness testimony about speed, distance, timing,
and visibility.

**Gear 1 — Scene Reconstruction Questions:**
```
[G1-KINE] Describe the intersection/location. How many lanes? Traffic controls?
[G1-KINE] What was the weather? Lighting conditions? Road surface?
[G1-KINE] Where exactly were you when you first saw {vehicle/hazard}?
[G1-KINE] How far away was it?
[G1-KINE] How fast were you going?
[G1-KINE] How fast was the other {vehicle/person} going?
[G1-KINE] How many seconds passed between when you first saw it and the impact?
```

**AI Analysis (runs in background during Gear 1):**
```
Given: Witness claims speed = {X} mph, distance = {Y} feet, reaction time = {Z} sec
Calculate: Stopping distance at {X} mph = perception-reaction distance + braking distance
Compare: Does the claimed timeline allow for the described outcome?
Flag: "Witness claims 30 mph and 50 feet. At 30 mph, stopping distance is ~75 feet.
       Inconsistency detected — carry to Gear 2."
```

**Gear 2 — Lock the Physics:**
```
[G2-KINE] You were traveling at {X} mph. Correct?
[G2-KINE] The distance was approximately {Y} feet. Correct?
[G2-KINE] You had approximately {Z} seconds to react. Correct?
[G2-KINE] At {X} mph, your vehicle travels approximately {calc} feet per second. Agreed?
[G2-KINE] So in {Z} seconds, you traveled approximately {calc} feet. Correct?
► [SJ-FLAG] Locked inconsistency: claimed reaction vs. physical possibility
```

### Medical Sub-Engine (Med-Mal / Injury Cases)

**AI Capability:** Chronological mapping of medical records against testimony,
standard-of-care benchmarks, and differential diagnosis protocols.

**Medical Chronology Framework:**

| Phase | Questions Target | Key Documents |
|-------|-----------------|---------------|
| Pre-incident | Prior medical history, pre-existing conditions | Prior records, intake forms |
| Incident | What happened, mechanism of injury, initial symptoms | ER records, first responder reports |
| Acute treatment | Initial diagnosis, treatment decisions, informed consent | Hospital records, op notes, consents |
| Recovery | Treatment course, complications, follow-up | Progress notes, therapy records |
| Current status | Current symptoms, limitations, prognosis | Recent records, IME reports |

**Gear 1 — Medical Narrative (Treating Physician or Party):**
```
[G1-MED] What were {patient}'s symptoms when you first examined them?
[G1-MED] What was your differential diagnosis at that time?
[G1-MED] What ruled in {diagnosis}? What ruled out alternatives?
[G1-MED] What treatment did you recommend and why?
[G1-MED] Were there alternative treatments? Why weren't they chosen?
[G1-MED] What did you tell {patient} about risks and alternatives?
```

**Gear 2 — Standard of Care Lock:**
```
[G2-MED] The standard of care for {condition} in {timeframe} required {action}. Agreed?
[G2-MED] You did not {perform required action} before {date}. Correct?
[G2-MED] The medical records do not document {required step}. Correct?
[G2-MED] If you had {performed action}, it would be documented. Correct?
[G2-MED] The delay between {date A} and {date B} was {X} days. Correct?
```

**Gear 3 — Record Impeachment:**
```
[G3-MED] Your note from {date} says {X}. Today you testified {Y}. Which is accurate?
[G3-MED] The EMR shows {finding} was first documented on {date}, not {earlier date}
          as you testified. Correct?
```

### Damages Module (PI-Specific)

**Must-Get Damages Admissions:**
```
[G2-DMG] What medical treatment have you received for injuries from this incident?
[G2-DMG] Total medical expenses to date?
[G2-DMG] Are you still treating?
[G2-DMG] What future treatment is anticipated?
[G2-DMG] Were you employed at the time of the incident?
[G2-DMG] What was your income?
[G2-DMG] How many days of work did you miss?
[G2-DMG] Have you returned to full duty?
[G2-DMG] Describe how this has affected your daily life.
[G2-DMG] What activities can you no longer perform?
```

---

## Engine 2: Commercial / Employment / Consumer (Intent Engine)

### Scope
Cases requiring proof of knowledge, intent, or willful conduct:
- Employment discrimination / retaliation
- Consumer fraud / deceptive trade practices (UPA)
- Contract breach with willful/bad faith element
- Insurance bad faith

### Core Capability: ESI Chronology Mapping

**AI Capability:** Map the chronological flow of ESI (emails, Slack, Teams,
texts, internal memos) to pinpoint the exact moment of actual corporate
knowledge. The gap between "when they knew" and "when they acted" proves
intent, willfulness, or bad faith.

**The Knowledge Timeline Framework:**

```
PHASE A: Innocence          PHASE B: Knowledge          PHASE C: Action/Inaction
──────────────────── ───► ──────────────────── ───► ────────────────────────
"We didn't know"          "The email shows             "They knew and did
                           they knew on {date}"         nothing for {X} days"
```

### Gear 1 — Corporate Decision Narrative
```
[G1-INTENT] Walk me through the decision to {terminate/deny/cancel/breach}.
[G1-INTENT] Who was involved in that decision?
[G1-INTENT] When was the decision made?
[G1-INTENT] What information did you have at the time?
[G1-INTENT] Were there any meetings about this? Who attended?
[G1-INTENT] What documents were reviewed before the decision?
[G1-INTENT] Was this decision documented? Where?
[G1-LOOP]   Who else had input? Anyone else?
[G1-LOOP]   What other options were considered?
```

### Gear 2 — Knowledge & Intent Lock
```
[G2-INTENT] On {date}, you received {email/report/complaint}. Correct?
[G2-INTENT] After receiving that, you understood {fact}. Correct?
[G2-INTENT] Despite knowing {fact}, {entity} did not {required action}. Correct?
[G2-INTENT] How many days elapsed between {knowledge date} and {action date}?
[G2-INTENT] During those {X} days, what steps did {entity} take?
[G2-INTENT] No steps were taken during that period. Correct?
[G2-INTENT] The {policy/procedure/regulation} required action within {timeframe}. Correct?
[G2-INTENT] {Entity} did not act within that timeframe. Correct?
```

### Gear 3 — ESI Impeachment
```
[G3-INTENT] I'm showing you an email dated {date}, from {sender} to {recipients}.
[G3-INTENT] You are on this email. You received it on {date}. Correct?
[G3-INTENT] This email states {knowledge/warning/complaint}. You see that?
[G3-INTENT] So as of {date}, you personally knew {fact}. Correct?
[G3-INTENT] But the {action} did not occur until {later date}. Correct?
[G3-INTENT] That's a gap of {X} days after you had actual knowledge. Correct?
► [SJ-FLAG] Actual knowledge established {date} → Inaction for {X} days
```

### Employment-Specific Modules

**Discrimination (Pretext Analysis):**
```
[G2-EMP-DISCRIM] What was the stated reason for {adverse action}?
[G2-EMP-DISCRIM] Who made that decision?
[G2-EMP-DISCRIM] Were other employees in similar situations treated the same way?
[G2-EMP-DISCRIM] Name one employee outside {protected class} who did the same thing
                  and received the same discipline.
[G2-EMP-DISCRIM] You cannot identify one. Correct?
[G2-EMP-DISCRIM] The {policy} was applied to {plaintiff} but not to {comparator}. Correct?
► [SJ-FLAG] Pretext established — disparate treatment locked
```

**Retaliation (Temporal Proximity):**
```
[G2-EMP-RETAL] When did {plaintiff} make the complaint?
[G2-EMP-RETAL] When was the adverse action taken?
[G2-EMP-RETAL] That's {X} days after the complaint. Correct?
[G2-EMP-RETAL] Before the complaint, {plaintiff}'s performance reviews were {positive}?
[G2-EMP-RETAL] No performance issues were documented before the complaint. Correct?
► [SJ-FLAG] Temporal proximity + clean record pre-complaint = retaliation inference
```

### Consumer / UPA-Specific Module

**Deceptive Practice (Knowledge + Pattern):**
```
[G2-UPA] How many consumers reported {issue} before {plaintiff}?
[G2-UPA] What did {entity} do in response to those prior complaints?
[G2-UPA] The {marketing material/contract/disclosure} states {representation}. Correct?
[G2-UPA] That representation was not accurate as of {date}. Correct?
[G2-UPA] {Entity} continued using that {material} after learning it was inaccurate. Correct?
► [SJ-FLAG] Willful/knowing deceptive practice established
```

### Insurance Bad Faith Module

**Claim Handling Timeline:**
```
[G2-BADFAITH] When was the claim reported?
[G2-BADFAITH] When was it assigned to an adjuster?
[G2-BADFAITH] What investigation was conducted?
[G2-BADFAITH] When was a coverage determination made?
[G2-BADFAITH] What was the basis for the {denial/undervaluation}?
[G2-BADFAITH] Did you consult the policy language before making that determination?
[G2-BADFAITH] The policy provides coverage for {X}. You see that?
[G2-BADFAITH] Your denial is inconsistent with the policy language. Correct?
► [SJ-FLAG] Bad faith — denial contradicts plain policy language
```

---

## Engine Selection

The AI selects the engine at PREP time based on case type:

| Case Type | Primary Engine | Secondary Engine |
|-----------|---------------|-----------------|
| Auto accident PI | Kinematic | Medical (damages) |
| Premises liability | Kinematic | Medical (damages) |
| Medical malpractice | Medical | — |
| Employment discrimination | Intent | — |
| Employment retaliation | Intent | — |
| Consumer fraud / UPA | Intent | — |
| Insurance bad faith | Intent | — |
| Commercial contract | Intent | — |
| Product liability | Kinematic + Medical | Intent (if corporate defendant) |

When both engines apply (e.g., product liability), the AI organizes outline
modules by engine, running Kinematic questions for the incident and Intent
questions for corporate knowledge/conduct.

---

*CONFIDENTIAL — Parnall & Adams Law, LLC — Attorney Work Product*
