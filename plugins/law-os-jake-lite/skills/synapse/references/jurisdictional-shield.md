# Jurisdictional Enforcement Module (The "Shield") — Detailed Reference

## Overview

The Shield operates as an automated procedural referee during deposition.
It monitors for opposing counsel violations, enforces clean-record protocols,
and manages the temporal budget. All scripts cite specific NM/Federal rules.

---

## Shield 1: NMRA 1-030(D)(1) Anti-Interruption Protocol

### Rule Text (Summary)
NMRA 1-030(D)(1) explicitly prohibits interruptions while a question is
pending. Opposing counsel may not instruct the witness, make speaking
objections, or interject while the examining attorney's question awaits
an answer.

### Trigger Conditions
The AI activates this shield when:
- Opposing counsel speaks while a question is pending (before witness answers)
- Opposing counsel speaks during witness document review
- Opposing counsel attempts to "clarify" the question for the witness
- Opposing counsel starts a sidebar conversation with the witness

### Response Script
```
"Counsel, NMRA 1-030(D)(1) explicitly prohibits interruptions while a
question is pending. Let's keep the record clean."

[PAUSE]

"Court reporter, please read back my pending question."

[OR]

"I'll re-ask the question. [Witness], {re-state question}."
```

### Escalation Ladder
If opposing counsel continues interrupting:

**Level 1 — First Violation:**
```
"Counsel, I'll note the interruption for the record. NMRA 1-030(D)(1)
is clear. Please allow the witness to answer."
```

**Level 2 — Second Violation:**
```
"Counsel, this is the second time you've interrupted a pending question.
I'm making a record of these violations. Under NMRA 1-030(D)(1), you
are not permitted to instruct the witness or interject while a question
is pending. If this continues, I will seek relief from the court."
```

**Level 3 — Third+ Violation:**
```
"Counsel, I am terminating this deposition and will file a motion under
NMRA 1-030(D)(3) / FRCP 30(d)(3) for a protective order and sanctions.
This pattern of interruption constitutes obstruction of the deposition."
```

### AI Logging
Every interruption is logged with:
- Timestamp (deposition clock)
- Question that was pending
- Nature of interruption (objection, instruction, sidebar)
- Whether the witness had begun answering
- Verbatim quote of opposing counsel's interruption (if captured)

---

## Shield 2: Form/Foundation Filter (Anti-Coaching)

### Rule Basis
- **FRCP 30(c)(2):** Objections must be stated concisely in a non-argumentative
  and non-suggestive manner.
- **NMRA 1-030(D)(1):** Same principle — objections shall be stated concisely.
- **D.N.M. LR-Civ 30.6:** Local rules reinforcing concise objections.

### What Constitutes a "Speaking Objection"
A speaking objection is any objection that goes beyond "objection — form" or
"objection — foundation" and contains language that:
- Suggests the answer to the witness
- Coaches the witness on how to respond
- Argues the merits of the objection
- Characterizes the evidence
- Provides a narrative instruction

### Examples of Coaching Violations

| Violation | What Counsel Said | Why It's Coaching |
|-----------|------------------|-------------------|
| Answer suggestion | "Objection, form. If you know." | "If you know" signals the witness to say "I don't know" |
| Narrative coaching | "Objection. You can answer if you recall, but don't speculate." | Tells witness to add qualifier |
| Framing | "Objection. That mischaracterizes the document." | Tells witness the question is inaccurate |
| Scope coaching | "Objection. That calls for information beyond what you personally witnessed." | Tells witness to limit answer to personal knowledge |

### Response Script

**Standard Speaking Objection:**
```
"Counsel, under NMRA 1-030(D)(1) and FRCP 30(c)(2), objections must be
concise and non-suggestive. Please state 'objection — form' or
'objection — foundation' only. The witness is capable of answering
without instruction."
```

**Repeated Coaching:**
```
"Counsel, I'm noting for the record that this is the {Nth} speaking
objection in this deposition. Each time, the objection has included
suggestive language directed at the witness. I'm preserving this record
for a motion under FRCP 30(d)(3) / NMRA 1-030(D)(3)."
```

### AI Coaching Log
The AI maintains a running log of all objections and classifies each as:
- `PROPER` — "Objection, form." / "Objection, foundation."
- `BORDERLINE` — Slightly verbose but not clearly coaching
- `COACHING` — Contains suggestive language directed at the witness

The log feeds the POST phase Hot-Wash report and supports sanctions motions.

---

## Shield 3: Temporal Governor (7-Hour Rule)

### Rule Basis
- **FRCP 30(d)(1):** Deposition limited to one day of seven hours.
- **D.N.M. LR-Civ 30.2:** Presumptive 7-hour limit applies.
- **NMRA 1-030(D)(2):** NM state equivalent time limitations.

### Time Budget Architecture

**Total available:** 420 minutes (7 hours)
**Deductions:**
| Deduction | Minutes | Reason |
|-----------|---------|--------|
| Breaks (bio, lunch) | -30 | Standard allowance |
| Tech friction (remote) | -20 | Connection issues, exhibit sharing delays |
| **Net available** | **370** | Actual examination time |

### Module Time Allocation

The AI allocates the 370-minute budget across deposition modules at PREP time.
Default allocation by witness type:

**Party Witness (370 min):**
| Module | Minutes | Priority |
|--------|---------|----------|
| Background / employment history | 20 | Low |
| Incident narrative (G1) | 45 | Medium |
| Liability elements (G2) | 90 | **CRITICAL** |
| Damages (G2) | 60 | **CRITICAL** |
| Document impeachment (G3) | 45 | High |
| Prior inconsistent statements | 30 | High |
| Mitigation / comparative fault | 30 | Medium |
| Cleanup / re-examination | 20 | Low |
| Buffer | 30 | Safety margin |

**30(b)(6) Designee (370 min):**
| Module | Minutes | Priority |
|--------|---------|----------|
| Preparation scope | 25 | Medium |
| Topic-by-topic examination | 250 | **CRITICAL** |
| Corporate records foundation | 45 | High |
| Cleanup / scope disputes | 20 | Medium |
| Buffer | 30 | Safety margin |

**Expert (370 min):**
| Module | Minutes | Priority |
|--------|---------|----------|
| Qualifications | 15 | Low |
| Materials reviewed | 20 | Medium |
| Methodology | 60 | **CRITICAL** |
| Assumptions / sensitivity | 90 | **CRITICAL** |
| Prior testimony / publications | 60 | High |
| Fee / bias | 15 | Medium |
| Cleanup | 10 | Low |

### Real-Time Time Tracking

**HUD Display:**
```
⏱ TIME: {elapsed} / 370 min | Remaining: {remaining} min
  Current module: {name} ({allocated} min, {used} min used)
  SJ Must-Gets remaining: {count}
  Priority modules remaining: {list}
```

**AI Alerts:**

| Condition | Alert Level | Message |
|-----------|-------------|---------|
| Module at 75% of allocated time | YELLOW | "Module {name} at 75% time. {X} min remaining. Consider transitioning." |
| Module exceeds allocated time | ORANGE | "Module {name} has exceeded allocated time by {X} min. Unfinished SJ elements: {list}." |
| Total deposition at 80% (296 min) | YELLOW | "80% of time used. {X} SJ Must-Gets still open. Prioritize." |
| Total deposition at 90% (333 min) | RED | "90% of time used. Must-Gets remaining: {list}. Switch to CRITICAL modules only." |
| SJ Must-Get elements uncovered with <30 min remaining | RED | "CRITICAL: {X} Must-Get elements not yet addressed. Abandon low-priority modules. Script rapid lock-in sequences now." |

### Time Dispute Protocol

If opposing counsel claims time has expired:
```
"For the record, my time calculation shows {X} minutes of actual
examination time. I am excluding:
- Break time ({Y} minutes)
- Time consumed by counsel's objections ({Z} minutes)
- Time for off-the-record conferences ({W} minutes)
Under FRCP 30(d)(1), only actual examination time counts against
the seven-hour limit."
```

---

## Shield 4: Instruction Not to Answer (Limited Grounds)

### Rule Basis
Under FRCP 30(c)(2) and NMRA 1-030(D)(1), opposing counsel may instruct
a witness not to answer ONLY to:
1. Preserve a privilege
2. Enforce a court-ordered limitation
3. Suspend the deposition to seek a protective order

### AI Response to Improper Instruction

When opposing counsel instructs the witness not to answer on grounds other
than the three permitted:
```
"Counsel, under FRCP 30(c)(2), you may instruct the witness not to
answer only to preserve a privilege, enforce a court-ordered limitation,
or to suspend for a protective order motion. Your instruction does not
fall within those categories. I direct the witness to answer."
```

If the witness still refuses:
```
"Let the record reflect that the witness has been improperly instructed
not to answer by counsel. I will certify this question under
FRCP 37(a)(3)(B)(i) / NMRA 1-037 and seek an order compelling an answer."
```

### AI Logging
Every instruction not to answer is logged with:
- Timestamp
- Question asked
- Stated basis for instruction
- AI classification: `PROPER-PRIVILEGE`, `PROPER-COURT-ORDER`, `PROPER-PROTECTIVE`, `IMPROPER`
- Follow-up action needed (motion to compel, certification)

---

## Combined Shield Dashboard (LIVE Phase)

During LIVE execution, the AI maintains a combined shield status:

```
╔═══════════════════════════════════════════════════════════════╗
║  SHIELD STATUS                                                ║
║  Anti-Interruption: {violations count} violations logged      ║
║  Coaching Log: {proper}/{borderline}/{coaching} objections    ║
║  Time Budget: {elapsed}/{370} min | {remaining} min left      ║
║  Instructions Not to Answer: {count} ({improper} improper)    ║
║  Record Status: {CLEAN / ISSUES NOTED}                        ║
╚═══════════════════════════════════════════════════════════════╝
```

---

*CONFIDENTIAL — Parnall & Adams Law, LLC — Attorney Work Product*
