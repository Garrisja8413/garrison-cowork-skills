# Matrix A: Witness Type Algorithms — Detailed Reference

## Overview

Each witness type triggers a distinct AI algorithm that adjusts the 3-Gear
architecture, question priorities, time allocation, and procedural safeguards.
The AI selects the algorithm at PREP time and dynamically adjusts during LIVE.

---

## 1. Party Witness (Plaintiff or Defendant)

### Primary Objective
Element admissions, damages quantification, mitigation failures, credibility.

### AI Strategy: The Binary Vice
Drive the witness into binary (Yes/No) positions on every claim and defense
element using the Lock-In Ladder. Leave no element unaddressed.

### Gear Allocation
| Gear | Time % | Focus |
|------|--------|-------|
| Gear 1 | 25% | Background, timeline, their version of events |
| Gear 2 | 55% | Element-by-element Lock-In Ladder |
| Gear 3 | 20% | Document impeachment on locked positions |

### AI Directives

**Gear 1 — Party Narrative:**
```
[G1-PARTY] Walk me through your involvement in {case event} from the beginning.
[G1-PARTY] What did you do after {event}?
[G1-LOOP]  Identify each document you rely on to support {claim/defense}.
[G1-LOOP]  Are there any others? [Lock the boundary]
```

**Gear 2 — Element Lock-In:**
```
[G2-PARTY] You were responsible for {duty}, correct?
[G2-PARTY] You did not {required action}, correct?
[G2-PARTY] There is no record showing you {took alternative action}, correct?
[G2-SJ]   ► Target admission: "{sentence}" → Element {ID}
```

**Gear 3 — Impeachment:**
```
[G3-PARTY] Your testimony today is that {claim}. Correct?
[G3-PARTY] Exhibit {N} says {opposite}. Do you see that?
```

### Special Protocols
- **Damages module (plaintiff):** Full module for medical, lost wages, pain/suffering, future damages.
- **Mitigation module (defendant):** Lock every mitigation step, close the boundary.
- **Prior statements:** Cross-reference against interrogatory responses and complaint allegations.

---

## 2. Non-Party Fact Witness

### Primary Objective
Corroboration of key facts, discovery of new leads, credibility assessment.

### AI Strategy: The Bias/Limit Loop
Establish relationship, determine firsthand vs. hearsay knowledge, lock only
facts the witness truly owns. Do not over-lead early.

### Gear Allocation
| Gear | Time % | Focus |
|------|--------|-------|
| Gear 1 | 45% | What they saw/heard/know firsthand |
| Gear 2 | 40% | Lock corroborating facts, establish limits |
| Gear 3 | 15% | Document corroboration |

### AI Directives

**Gear 1 — Context & Observation:**
```
[G1-NONFACT] How do you know {party}? For how long?
[G1-NONFACT] Were you present when {event} occurred?
[G1-NONFACT] Tell me everything you personally observed.
[G1-NONFACT] What did you hear {person} say? Exact words.
```

**Gear 2 — Bias Check + Fact Lock:**
```
[G2-NONFACT] Have you discussed this case with {party} before today?
[G2-NONFACT] Has anyone asked you to testify a certain way?
[G2-NONFACT] You personally saw {fact}, correct?
[G2-NONFACT] You did NOT personally see {other fact}, correct? [Limit]
[G2-NONFACT] That information came from {party}, not your own observation?
```

### Special Protocols
- **Bias detection:** Financial relationship, promises, who contacted them.
- **Discovery leads:** Non-parties often know about undisclosed documents/witnesses.
- **Do NOT over-impeach** helpful non-party witnesses.

---

## 3. FRCP 30(b)(6) / Corporate Designee

### Primary Objective
Entity binding and scope lock. Every admission binds the corporation.

### AI Strategy: Scope Algorithm
Parse the 30(b)(6) Notice (Verb + Noun + Timebox). Map live testimony strictly
to noticed topics. Lock corporate inability to answer for FRCP 37 / NMRA sanctions.

### Gear Allocation
| Gear | Time % | Focus |
|------|--------|-------|
| Gear 1 | 20% | Preparation scope (who they spoke with, what they reviewed) |
| Gear 2 | 60% | Topic-by-topic entity admissions |
| Gear 3 | 20% | Corporate record authentication + impeachment |

### AI Directives

**Pre-Substance — Preparation Lock:**
```
[G1-30b6] You are the corporate designee for {entity}?
[G1-30b6] You were designated for Topics 1 through {N}?
[G1-30b6] What did you do to prepare?
[G1-30b6] Who did you speak with?
[G1-30b6] Did you review documents not provided in discovery?
```

**Gear 2 — Topic-by-Topic Entity Lock:**
```
[G2-30b6] Topic {N}: {description}. What is {entity}'s position?
[G2-30b6] Who at {entity} has personal knowledge of {topic}?
[G2-30b6] {Entity} did not {required action}, correct?
```

**Ignorance Lock (CRITICAL):**
When the designee says "I don't know" or "I wasn't prepared on that":
```
[G2-30b6-IGN] Is it your testimony that {entity} cannot answer about {topic}?
[G2-30b6-IGN] Despite being designated for Topic {N}, {entity} is unable to testify?
[G2-30b6-IGN] Who at {entity} WOULD have this information?
[G2-30b6-IGN] Did you speak with that person before today?
► [SJ-FLAG] Corporate inability → FRCP 37(d) / NMRA 1-037 sanctions foundation
```

### Special Protocols
- **Notice parsing:** AI parses each topic at PREP time into Verb + Noun + Timebox checklist.
- **Scope objections:** AI cross-references questions against parsed topics for instant response.
- **Designee vs. personal:** Distinguish "In your capacity as designee..." from personal knowledge.

---

## 4. Retained Expert

### Primary Objective
Methodology attack under Daubert / Frye. Challenge assumptions, test sensitivity.

### AI Strategy: Sensitivity Algorithm
**Bypass Gear 1.** Retained experts have prepared narratives — do not let them
rehearse. Go directly to assumption interrogation (Gear 2), then prior
inconsistencies (Gear 3).

### Gear Allocation
| Gear | Time % | Focus |
|------|--------|-------|
| Gear 1 | 5% | Qualifications only (brief) |
| Gear 2 | 65% | Assumptions checklist, methodology, sensitivity |
| Gear 3 | 30% | Prior testimony/publications, learned treatise impeachment |

### AI Directives

**Gear 1 — Qualifications (BRIEF):**
```
[G1-EXPERT] State your qualifications briefly.
[G1-EXPERT] How many times testified? For plaintiffs? Defendants?
[G1-EXPERT] What percentage of income from litigation work?
[G1-EXPERT] What are you being paid for this case?
```

**Gear 2 — Assumptions Checklist:**
```
[G2-EXPERT] What materials did you review?
[G2-EXPERT] What facts did you assume to be true?
[G2-EXPERT] If {Fact X} was actually {Y}, would your opinion change?
[G2-EXPERT] Did you independently verify {assumed fact}?
[G2-EXPERT] What alternative explanations did you consider?
[G2-EXPERT] What is the error rate for this methodology?
```

**Gear 3 — Prior Inconsistency / Learned Treatise:**
```
[G3-EXPERT] Are you familiar with {treatise/article}?
[G3-EXPERT] Is {author} a recognized authority in this field?
[G3-EXPERT] Page {X} states {contrary position}. Your opinion is inconsistent?
[G3-EXPERT] In {prior case}, you testified {opposite opinion}. Correct?
```

### Special Protocols
- **Sensitivity matrix:** Pre-generate "If X then Y" questions for each assumed fact.
- **Prior testimony search:** Cross-reference available prior transcripts.
- **Fee/bias module:** Total fees, side preference, repeat engagements.

---

## 5. Treating Physician

### Primary Objective
Delineate treating observations (fact witness) vs. retained opinions (expert).

### AI Strategy: Temporal Algorithm
Map EMR timestamps against live testimony. Strictly separate "What did you
observe at that exact moment?" from "What is your opinion now?"

### Gear Allocation
| Gear | Time % | Focus |
|------|--------|-------|
| Gear 1 | 35% | Treatment timeline, observations, patient reports |
| Gear 2 | 45% | Lock observations to dates/records, causation boundaries |
| Gear 3 | 20% | EMR record consistency |

### AI Directives

**Gear 1 — Treatment Timeline:**
```
[G1-TREAT] When did you first see {patient} for {condition}?
[G1-TREAT] Walk me through that first visit — what did you observe?
[G1-TREAT] What did {patient} report to you?
[G1-TREAT] What was your assessment at that time?
```

**Gear 2 — Temporal Lock:**
```
[G2-TREAT] On {date}, your note states {finding}. Accurate?
[G2-TREAT] That finding was based solely on your exam that day, correct?
[G2-TREAT] At that visit, you had not reviewed {other records}, correct?
[G2-TREAT] You did not render an opinion on causation during that visit?
```

**Gear 3 — EMR Consistency:**
```
[G3-TREAT] Your note from {date} states {X}. Today you testified {Y}. Which is accurate?
[G3-TREAT] Your note does NOT mention {finding}. If present, you'd have documented it?
```

### Special Protocols
- **Treater vs. expert boundary:** Mark which questions target treating observations vs. expert opinions.
- **EMR negative inference:** Establish documentation practice → undocumented = didn't exist.
- **Referral chain:** Map who referred, what info was conveyed, what was independently observed.

---

## 6. Custodian of Records

### Primary Objective
FRE 803(6) / 902(11) / NM 11-803(F) business records foundation for trial admissibility.

### AI Strategy: Business Records Loop
Rote, precise foundation questions satisfying every element. Mechanical process.

### Gear Allocation
| Gear | Time % | Focus |
|------|--------|-------|
| Gear 1 | 10% | Role, responsibilities, systems |
| Gear 2 | 75% | Business records foundation per document, ESI authentication |
| Gear 3 | 15% | Gap analysis, missing records, retention failures |

### AI Directives

**Gear 2 — Business Records Foundation (per document):**
```
[G2-CUST] I'm showing you Exhibit {N}. You recognize this?
[G2-CUST] Made at or near the time of the events described?
[G2-CUST] Made by or from info transmitted by a person with knowledge?
[G2-CUST] Kept in the regular course of {entity}'s business?
[G2-CUST] Regular practice to make this type of record?
[G2-CUST] No reason to believe it's inaccurate?
► [FOUNDATION-COMPLETE] Business record foundation satisfied — Exhibit {N}
```

**ESI Foundation:**
```
[G2-CUST-ESI] What email system does {entity} use?
[G2-CUST-ESI] Retention policy? Litigation hold issued? When? Who covered?
[G2-CUST-ESI] Steps taken to preserve ESI?
```

**Gear 3 — Gaps:**
```
[G3-CUST] Production does not include {X}. Why?
[G3-CUST] Was {document} destroyed?
[G3-CUST] Retention policy requires preservation of {type}?
```

### Special Protocols
- **Checklist-driven:** AI tracks every document needing foundation. Do not end until complete.
- **902(11) certification:** Consider self-authenticating certification for cooperative custodians.
- **Spoliation foundation:** Duty to preserve, notice, destruction, relevance.

---

## Witness Type Selection Priority

When a witness wears multiple hats:

1. **30(b)(6) designation** overrides personal capacity
2. **Expert designation** overrides fact witness for opinion topics
3. **Party status** overrides non-party for claim/defense elements
4. **Custodian role** is additive — run as separate module

The AI organizes the outline into separate modules for each role.

---

*CONFIDENTIAL — Parnall & Adams Law, LLC — Attorney Work Product*
