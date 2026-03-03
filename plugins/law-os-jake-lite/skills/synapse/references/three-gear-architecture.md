# 3-Gear Cognitive Questioning Architecture — Detailed Reference

## Overview

The 3-Gear system maps cognitive science directly to legal objectives. Every
question in a SYNAPSE deposition outline is tagged with its Gear. The attorney
moves through Gears sequentially within each topic module, though they may
cycle back when new information emerges.

---

## GEAR 1: NARRATIVE (Information Gathering & Cognitive Harvesting)

### Legal Objective
Maximize discovery yield. Capture the witness's unvarnished timeline,
vocabulary, and unknown variables **before showing your hand**.

### Cognitive Framework: The PEACE Model
The AI scripts open-ended, sensory-rich questions void of attorney assumptions
to prevent defensive reactance. The PEACE model (Planning, Engage/Explain,
Account, Closure, Evaluate) is adapted from investigative interviewing.

### Core Directives

**Question Patterns:**
- "Walk me through what happened on [date] from the moment you arrived."
- "Describe what you saw when you entered the room."
- "Tell me everything you remember about that conversation."
- "What happened next?"

**Exhaustive Loops (mandatory at the end of every Gear 1 topic):**
- "Who else was present?" → "Anyone else?" → "Are you sure there was no one else?"
- "What other documents were involved?" → "Any others?" → "Is that a complete list?"
- "What else did they say?" → "Anything else?" → "Nothing else at all?"

**NLP Baseline Tracking:**
During Gear 1, the AI tracks the witness's primary representational modality:
- **Visual:** "I see," "it looked like," "from my perspective" — witness processes visually
- **Auditory:** "I heard," "it sounded like," "they told me" — witness processes aurally
- **Kinesthetic:** "I felt," "it hit me," "my gut reaction" — witness processes through feelings

**Why this matters:** In Gear 2, the AI mirrors the witness's modality to
build unconscious rapport before locking them in. In Gear 3, the AI
deliberately switches modalities to create cognitive friction.

### Gear 1 Rules
1. **No leading questions.** Every Gear 1 question is open-ended.
2. **No documents shown.** Keep exhibits hidden during narrative capture.
3. **No attorney assumptions embedded.** Do not presuppose facts.
4. **Record vocabulary.** Note the exact words the witness uses — these become
   the defined terms in Gear 2.
5. **Map the unknown unknowns.** Gear 1 is where you discover entities, events,
   and documents you didn't know existed.
6. **Time allocation:** ~30-40% of total witness time budget.

### Gear 1 Output Format
```
[G1] Topic: {topic_name}
[G1-NAR] Walk me through {event/process/decision} from {starting point}.
[G1-NAR] What happened next?
[G1-NAR] Describe what you {saw/heard/observed} at that point.
[G1-LOOP] Who else was involved in {topic}?
[G1-LOOP] Anyone else?
[G1-LOOP] What other documents relate to {topic}?
[G1-LOOP] Any others?
[G1-VOCAB] Note: Witness uses "{term}" to describe {concept} — carry to G2.
```

---

## GEAR 2: LOCK-IN (Micro-Commitments & The Funnel)

### Legal Objective
Generate SJ-ready, atomic facts: single fact per question, defined terms,
zero unanchored pronouns. Every Gear 2 answer should be directly quotable
in a Statement of Undisputed Material Facts.

### Cognitive Framework: Cialdini's Consistency Principle
Once a person commits to a position (especially publicly, on the record),
they experience strong psychological pressure to remain consistent. The AI
weaponizes this by building a ladder of micro-commitments that progressively
narrow the witness's position until contradictions with documents become
inescapable.

### The Lock-In Ladder (4-Step Sequence)

**Step 1: Define the Term**
Use the witness's own vocabulary from Gear 1.
```
"When you said 'inspection' earlier, what does that word mean to you?"
"In your role, what does a 'complete inspection' include?"
```

**Step 2: Anchor Time/Person/Place**
Pin every fact to a specific temporal, personal, and spatial anchor.
```
"On May 14, 2024, you were the supervisor on duty, correct?"
"At 2:15 PM, you were in the control room, correct?"
"Dr. Martinez was the attending physician that day, correct?"
```

**Step 3: Commit to the Action (Yes/No)**
Force a binary commitment on the critical fact.
```
"You did not initial line 7 of the inspection report, correct?"
"You did not call Dr. Martinez before administering the medication, correct?"
"The company did not conduct a safety audit in Q3 2024, correct?"
```

**Step 4: Close Escape Hatches**
Eliminate alternative explanations before the witness realizes what's coming.
```
"There is no other document showing you completed that inspection, correct?"
"No one else was authorized to sign off on your behalf, correct?"
"You're not aware of any email where you raised this concern, correct?"
"Sitting here today, you cannot point to any record of that conversation?"
```

### Gear 2 Rules
1. **One fact per question.** No compound questions. No "and."
2. **Defined terms only.** Every noun must have been defined (by the witness or by stipulation).
3. **No unanchored pronouns.** Not "he said" — "Dr. Martinez told you on May 14."
4. **Leading questions permitted.** Gear 2 is cross-examination territory.
5. **Tag for SJ.** Every Gear 2 answer maps to a specific element in the Case-Theory Grid.
6. **Time allocation:** ~40-50% of total witness time budget.

### Gear 2 Output Format
```
[G2] Topic: {topic_name} | SJ Element: {element_id}
[G2-DEF] What does "{witness_term}" mean to you?
[G2-ANCHOR] On {date}, you were the {role}, correct?
[G2-COMMIT] You did not {action}, correct?
[G2-CLOSE] There is no {document/person/record} showing {alternative}, correct?
[G2-CLOSE] Sitting here today, you cannot identify any {escape}, correct?
[G2-SJ] ► Target admission: "{Exact sentence for SUMF}" → Element {ID}
```

---

## GEAR 3: PROOF (Document-Anchored Reality & Impeachment)

### Legal Objective
Foundation, authentication, and flawless impeachment under:
- **Rule 613** (prior inconsistent statements)
- **FRCP 32** (use of depositions at trial)
- **NMRA 1-032** (NM use of depositions)
- **FRE 803(6)** (business records)
- **FRE 901/902** (authentication)

### Cognitive Framework: Working Memory Exhaustion
Lying requires heavy working memory (Kahneman's System 2). Truthful recall
is relatively effortless (System 1). The AI introduces complex, timestamped
documentation to overwhelm the deceptive witness's cognitive load while
leaving the truthful witness unaffected.

### The Commit → Credit → Confront Loop

**This is the impeachment protocol. It must be followed exactly.**

**Step 1: COMMIT (lock the current testimony)**
Get the witness to firmly commit to their current version BEFORE showing any document.
```
"So your testimony today is that you never received that email, correct?"
"And you're certain about that?"
"Nothing would change your answer?"
```

**Step 2: CREDIT (establish the document's reliability)**
Before showing the contradicting document, establish the witness's prior
relationship with it so they cannot later claim it was fabricated or unreliable.
```
"You kept a daily log as part of your job duties, correct?"
"That log was maintained in the ordinary course of business?"
"You understood the importance of accurate entries?"
"Entries were made at or near the time of the events?"
```

**Step 3: CONFRONT (deploy the exhibit)**
Only NOW show the document. The witness is trapped — they committed to a
position, credited the document's reliability, and now face the contradiction.
```
"I'm going to show you what's been marked as Exhibit 7."
"Please read the highlighted portion on page 3 to yourself."
[PAUSE — let them read]
"That entry, dated May 14, states 'Email received from contractor re: safety concern.' Do you see that?"
"That's your handwriting, isn't it?"
"So your log — which you just confirmed was accurate — shows you DID receive that email. Correct?"
```

### CRITICAL WARNING
```
╔══════════════════════════════════════════════════════════════════╗
║  DO NOT IMPEACH PREMATURELY.                                     ║
║                                                                   ║
║  If a contradiction appears during Gear 1 or early Gear 2:       ║
║  1. DO NOT react. DO NOT show the document.                       ║
║  2. Note the contradiction internally.                            ║
║  3. Continue building Gear 2 commitments.                         ║
║  4. Close ALL escape hatches FIRST.                               ║
║  5. ONLY THEN execute the Commit → Credit → Confront loop.       ║
║                                                                   ║
║  The witness must be fully locked before you deploy the exhibit.  ║
╚══════════════════════════════════════════════════════════════════╝
```

### Document Foundation Scripts

**Business Record (FRE 803(6) / NM 11-803(F)):**
```
[G3-FOUND] This document was created by [entity] as part of its regular business operations?
[G3-FOUND] It was the regular practice of [entity] to create this type of record?
[G3-FOUND] The information was recorded at or near the time of the events described?
[G3-FOUND] The person recording the information had knowledge of the events?
[G3-FOUND] You have no reason to believe this record is inaccurate?
```

**Email / ESI Authentication (FRE 901(b)(4)):**
```
[G3-FOUND] You recognize this email address — {address} — as belonging to {person}?
[G3-FOUND] You were a recipient of this email?
[G3-FOUND] The content is consistent with communications you received on that date?
```

### Gear 3 Rules
1. **Never show a document before completing the Commit-Credit-Confront sequence.**
2. **Surface exact Bates-stamped documents.** Reference by exhibit number and Bates range.
3. **One document per impeachment cycle.** Do not stack exhibits.
4. **Let silence work.** After confrontation, pause. Do not fill the silence.
5. **Preserve the clean record.** State document ID, page, and line for the court reporter.
6. **Time allocation:** ~10-20% of total witness time budget (high impact, low volume).

### Gear 3 Output Format
```
[G3] Topic: {topic_name} | Exhibit: {exhibit_id} | Bates: {range}
[G3-COMMIT] Your testimony is that {current_claim}, correct?
[G3-COMMIT] And you're certain of that?
[G3-CREDIT] You maintained {document_type} as part of your duties?
[G3-CREDIT] Those records were accurate to the best of your knowledge?
[G3-CONFRONT] I'm showing you Exhibit {N}, Bates {range}.
[G3-CONFRONT] Please read {specific portion} to yourself.
[G3-CONFRONT] This document states {contradiction}. Do you see that?
[G3-CONFRONT] So {document} shows {fact}, but your testimony today is {opposite}. Which is accurate?
[G3-SJ] ► Impeachment captured: "{testimony}" contradicts Exhibit {N} at Bates {page}
```

---

## Gear Transition Protocol

### Gear 1 → Gear 2 Transition Checklist
Before leaving Gear 1 on any topic:
- [ ] Witness's full narrative is captured
- [ ] All exhaustive loops completed (who else, what else, anyone else)
- [ ] Witness vocabulary recorded for Gear 2 term definitions
- [ ] NLP baseline modality identified
- [ ] Unknown unknowns catalogued for follow-up

### Gear 2 → Gear 3 Transition Checklist
Before entering Gear 3 on any topic:
- [ ] All Gear 2 commitments are locked (Yes/No answers secured)
- [ ] All escape hatches are closed
- [ ] Contradicting document is identified and pre-staged
- [ ] Commit → Credit → Confront sequence is scripted
- [ ] SJ element mapping is confirmed

### Re-Entry Rules
- **Gear 2 → Gear 1:** Permitted if Gear 2 reveals a new topic area not yet explored
- **Gear 3 → Gear 2:** Permitted if impeachment reveals new facts requiring lock-in
- **Gear 3 → Gear 1:** Rare; only if impeachment opens entirely new discovery territory

---

## Outline Template (Per Topic Module)

```markdown
## Module: {Topic Name}
**Time Budget:** {X} minutes
**SJ Elements:** {element_ids}
**Key Documents:** {exhibit_list}
**Witness Personality Adaptation:** {archetype_adjustments}

### Gear 1: Narrative
{Open-ended questions}
{Exhaustive loops}

### Gear 2: Lock-In
{Lock-In Ladder sequences}
{SJ target admissions}

### Gear 3: Proof (if applicable)
{Commit → Credit → Confront sequences}
{Document foundation scripts}

### Module SJ Scorecard
- [ ] Element {A}: {status}
- [ ] Element {B}: {status}
```

---

*CONFIDENTIAL — Parnall & Adams Law, LLC — Attorney Work Product*
