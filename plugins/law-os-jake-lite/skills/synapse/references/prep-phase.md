# Phase 1: Predictive Prep (The Generator) — Detailed Reference

## Overview

Phase 1 runs BEFORE the deposition. It consumes case packs and generates
the complete deposition battle plan: Case-Theory Grid, Witness Objective
Memo, 3-Gear Outline, and optional Red Team simulation.

---

## Step 1: Case-Theory Grid Ingestion

### Input Required
- CFP (case facts, quotes, timeline, admissions)
- DPB (discovery state machine, deficiency map)
- LPB (legal authority, element checklists)
- Pleadings (complaint, answer, counterclaims)
- Prior deposition transcripts (if any)

### Process
The AI ingests all packs and generates a 1-page relational database mapping:

```
Claim Element → Required Fact → Target Witness → Proving Document → Target SJ Admission
```

### Case-Theory Grid Template

```markdown
## Case-Theory Grid: {CASE_CODE} — {Case Name}
**Generated:** {date} | **Target Witness:** {name} | **Depo Date:** {date}

| # | Claim | Element | Required Fact | Status | Target Witness | Proving Doc (Bates) | Target SJ Admission | Priority |
|---|-------|---------|---------------|--------|---------------|--------------------|--------------------|----------|
| 1 | Negligence | Duty | Defendant owed duty of care as {role} | GAP | {Witness} | {Doc / Bates} | "{Defendant} was responsible for {duty}." | MUST-GET |
| 2 | Negligence | Breach | Failed to {action} on {date} | PARTIAL | {Witness} | {Doc / Bates} | "{Defendant} did not {action} on {date}." | MUST-GET |
| 3 | Negligence | Causation | {Breach} caused {injury} | GAP | {Witness} | {Doc / Bates} | "But for {breach}, {injury} would not have occurred." | MUST-GET |
| 4 | Negligence | Damages | {Plaintiff} incurred ${X} in {category} | LOCKED | {Witness} | {Doc / Bates} | "Medical expenses total ${X}." | VERIFY |
```

### Status Values
| Status | Meaning | Depo Priority |
|--------|---------|--------------|
| `LOCKED` | Already established by prior testimony/admission | Low — verify only |
| `PARTIAL` | Some evidence exists but incomplete | Medium — fill gaps |
| `GAP` | No evidence yet | **HIGH — must capture** |
| `CONTESTED` | Both sides have evidence — disputed | High — lock our version |
| `CONCEDED` | Opposing side has conceded this element | Low — note for SJ |

---

## Step 2: Witness Objective Memo

### Purpose
A 1-page tactical brief that the attorney reviews before walking into the
deposition room. Ranked priorities, not a full outline.

### Template

```markdown
## Witness Objective Memo
**Witness:** {Name} | **Type:** {Type} | **Depo Date:** {Date}
**Personality Profile:** {Archetype} | **Subject Engine:** {Engine}

### PRIORITY 1: Discovery Gaps to Fill (Gear 1 targets)
1. {Gap description} — We don't know {X}. Must discover via open narrative.
2. {Gap description}
3. {Gap description}

### PRIORITY 2: SJ Lock-In Targets (Gear 2 targets)
1. Element: {element} — Target admission: "{exact sentence}"
2. Element: {element} — Target admission: "{exact sentence}"
3. Element: {element} — Target admission: "{exact sentence}"

### PRIORITY 3: Trial Story Beats (Gear 3 targets)
1. Impeachment: {Witness claimed X} vs. {Exhibit Y shows Z}
2. Foundation: {Document} needs authentication via this witness
3. Designation: Clean Q&A block for {topic} (jury impact)

### PRIORITY 4: Time Budget
| Module | Minutes | Priority |
|--------|---------|----------|
| {Module 1} | {X} | MUST-GET |
| {Module 2} | {X} | MUST-GET |
| {Module 3} | {X} | HIGH |
| {Module 4} | {X} | MEDIUM |
| Buffer | 30 | Safety |
| **TOTAL** | **370** | |

### LANDMINES (topics to AVOID or handle carefully)
- {Topic}: Risk of {bad admission/opening door}. Handle by {strategy}.
- {Topic}: Privilege concern. Do not ask about {X}.

### PERSONALITY NOTES
- Archetype: {type}. Key countermeasure: {summary}.
- Expected behavior: {prediction}.
- Trigger to watch for: {behavioral trigger}.
```

---

## Step 3: 3-Gear Deposition Outline Generation

### Process
1. Map each row from the Case-Theory Grid to a deposition module
2. Select the Witness Type Algorithm (Matrix A)
3. Apply the Personality Archetype countermeasures (Matrix B)
4. Apply the Subject Area Ontology engine (Matrix C)
5. Allocate time per module from the Temporal Governor
6. Tag every question with its Gear (G1/G2/G3)
7. Tag every Gear 2/3 question with its SJ Element target
8. Embed document references (Bates numbers) for Gear 3 sequences

### Outline Structure

```markdown
## SYNAPSE Deposition Outline
**Case:** {CASE_CODE} | **Witness:** {Name} ({Type})
**Date:** {Date} | **Personality:** {Archetype} | **Engine:** {Engine}
**Total Time Budget:** 370 min

---

### Module 0: Preamble & Stipulations ({X} min)
- Stipulations (remote protocols if applicable)
- Oath
- Background questions (name, address, role)
- Witness instructions (listen carefully, verbal answers, etc.)

### Module 1: {Topic Name} ({X} min)
**SJ Elements:** {IDs} | **Key Docs:** {Exhibits}

#### Gear 1: Narrative
[G1] Walk me through {topic} from {starting point}.
[G1] What happened next?
[G1-LOOP] Who else was involved?
[G1-LOOP] What documents relate to {topic}?

#### Gear 2: Lock-In
[G2-DEF] What does "{term}" mean to you?
[G2-ANCHOR] On {date}, you were the {role}. Correct?
[G2-COMMIT] You did not {action}. Correct?
[G2-CLOSE] No document shows otherwise. Correct?
[G2-SJ] ► "{Target SJ sentence}" → Element {ID}

#### Gear 3: Proof (if applicable)
[G3-COMMIT] Your testimony is {X}. Correct?
[G3-CREDIT] You maintained {record type}. Accurate?
[G3-CONFRONT] Exhibit {N} shows {Y}. Do you see that?

### Module 2: {Topic Name} ({X} min)
[... same structure ...]

### Module N: Cleanup & Closure ({X} min)
- "Is there anything I asked about that you want to correct or clarify?"
- "Is there anything else you think I should know about {topics covered}?"
- Reserve the right to continue if transcript review reveals gaps.

---

### SJ Scorecard (end of outline)
| # | Element | Target Admission | Module | Status |
|---|---------|-----------------|--------|--------|
| 1 | {Element} | "{sentence}" | Module {N} | PENDING |
| 2 | {Element} | "{sentence}" | Module {N} | PENDING |
```

### Outline Validation Rules
Before finalizing, the AI checks:
- [ ] Every MUST-GET element from the Case-Theory Grid has questions assigned
- [ ] Every Gear 2 question contains exactly one atomic fact
- [ ] Every Gear 3 sequence follows Commit → Credit → Confront
- [ ] Total time allocation = 370 minutes
- [ ] Personality archetype countermeasures are embedded
- [ ] Remote protocols included (if remote deposition)
- [ ] Document list with Bates references is complete

---

## Step 4: Red Team Simulator

### Purpose
The attorney practices against an AI simulating the deponent. The AI uses
the Personality Archetype and Subject Ontology to generate realistic responses
that challenge the attorney's questioning technique.

### How It Works

**Attorney Input:** "Start Red Team for {witness name}"

**AI Behavior:**
1. Adopt the witness's anticipated Personality Archetype
2. Use case facts from CFP to generate realistic (but adversarial) answers
3. Employ the archetype's characteristic linguistic patterns
4. Test the attorney's Gear transitions — does the attorney lock in before
   showing documents? Does the attorney close escape hatches?
5. After each exchange, provide coaching feedback

### Red Team Session Format

```
SYNAPSE RED TEAM — {Witness Name} ({Archetype})
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[Attorney asks question]

SIMULATED WITNESS ({Archetype}):
"{Response using archetype-specific linguistic patterns}"

SYNAPSE COACH:
- Gear assessment: {Was this the right Gear for this stage?}
- Technique note: {Specific feedback on question construction}
- Suggested follow-up: {What the attorney should ask next}
```

### Red Team Scenarios by Archetype

**Arrogant Witness:**
- AI gives confident, sweeping answers with absolute language
- AI corrects attorney's word choices
- AI volunteers information not asked for
- **Coach tests:** Did attorney resist the urge to argue? Did they record the absolutes?

**Evasive Witness:**
- AI responds with "I don't recall" to key questions
- AI uses hedge words and passive voice
- AI answers adjacent questions instead of the actual question
- **Coach tests:** Did attorney execute the Memory Pressure Sequence? Did they convert fog to limits?

**Pedantic Witness:**
- AI challenges definitions and word meanings
- AI gives hyper-literal, over-qualified answers
- AI refuses reasonable generalizations
- **Coach tests:** Did attorney establish the glossary early? Did they anchor to agreed definitions?

**Hostile Witness:**
- AI answers questions with questions
- AI argues with premises
- AI makes personal attacks on attorney competence
- **Coach tests:** Did attorney maintain flat tone? Did they use the Silence Protocol? Did they repeat verbatim?

---

## PREP Mode Output Contract

When the attorney invokes `SYNAPSE PREP`, the AI delivers in this order:

1. **Case-Theory Grid** — 1-page element mapping
2. **Witness Objective Memo** — 1-page tactical brief
3. **3-Gear Outline** — Full question sequence (chunked if necessary)
4. **Red Team offer** — "Would you like to run a Red Team simulation?"

**Token management:** If the outline is large, chunk delivery:
- Part 1: Theory Grid + Witness Memo
- Part 2: Modules 1-3 (Gear 1 heavy)
- Part 3: Modules 4-6 (Gear 2/3 heavy)
- Part 4: SJ Scorecard + Document List

---

*CONFIDENTIAL — Parnall & Adams Law, LLC — Attorney Work Product*
