# Phase 2: Live AI Co-Pilot (Telemetry & Execution) — Detailed Reference

## Overview

Phase 2 operates DURING the deposition. The AI functions as a real-time
co-pilot providing gear tracking, SJ progress monitoring, jurisdictional
enforcement, personality adaptation, and silence protocol management.

---

## Component 1: Gear-Tracking HUD

### Purpose
Visually display which Gear the attorney is currently operating in and
warn when gear transitions are needed.

### HUD Layout

```
╔═══════════════════════════════════════════════════════════════════════╗
║  SYNAPSE LIVE | Witness: {Name} ({Type}) | Archetype: {Profile}      ║
╠═══════════════════════════════════════════════════════════════════════╣
║                                                                       ║
║  GEAR: [1 NARRATIVE]  [2 LOCK-IN]  [3 PROOF]                        ║
║         ▲ ACTIVE                                                      ║
║                                                                       ║
║  Module: {Current Module Name}                                        ║
║  Time:   {Module elapsed} / {Module allocated} min                    ║
║  Total:  {Total elapsed} / 370 min                                    ║
║                                                                       ║
║  SJ Tracker: {X}/{Y} MUST-GETs locked | {Z} open                    ║
║                                                                       ║
║  Shield: {status} | Coaching Log: {count} | Objections: {count}      ║
║                                                                       ║
╚═══════════════════════════════════════════════════════════════════════╝
```

### Gear Transition Warnings

| Condition | Alert | Message |
|-----------|-------|---------|
| Gear 1 > 40% of module time | YELLOW | "Gear 1 extended. Consider transitioning to Lock-In. Narrative captured: {summary}." |
| Gear 1 > 60% of module time | ORANGE | "WARNING: Still in Gear 1. SJ elements for this module are not being locked. Key terms recorded: {list}. Transition to Gear 2 now." |
| Gear 2 without completing Gear 1 loops | YELLOW | "Exhaustive loops not completed. Before locking in, ask: 'Anyone else? Anything else?'" |
| Gear 3 attempted without Gear 2 close | RED | "STOP: Escape hatches not closed. Complete Lock-In Ladder Step 4 before impeachment." |
| New topic mentioned in Gear 2/3 | INFO | "New topic detected: {topic}. Consider Gear 1 re-entry for this topic before locking." |

---

## Component 2: SJ Fact Tracker

### Purpose
Live checklist mapping secured admissions against the Case-Theory Grid.
The AI will not let the attorney end the deposition if a MUST-GET element
remains unlocked.

### Tracker Display

```
╔═══════════════════════════════════════════════════════════════╗
║  SJ FACT TRACKER                                              ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║  ✅ Element 1: Duty — LOCKED                                  ║
║     Admission: "I was the supervisor on duty that day."       ║
║     Module 2, ~timestamp                                      ║
║                                                               ║
║  ✅ Element 2: Breach — LOCKED                                ║
║     Admission: "I did not initial line 7."                    ║
║     Module 3, ~timestamp                                      ║
║                                                               ║
║  ⬜ Element 3: Causation — OPEN                               ║
║     Target: "The failure to inspect caused the collapse."     ║
║     Assigned: Module 4                                        ║
║                                                               ║
║  ⬜ Element 4: Damages — OPEN                                 ║
║     Target: "Medical expenses total $X."                      ║
║     Assigned: Module 5                                        ║
║                                                               ║
║  SCORE: 2/4 MUST-GETs locked | 2 remaining                   ║
╚═══════════════════════════════════════════════════════════════╝
```

### Tracker States

| State | Symbol | Meaning |
|-------|--------|---------|
| LOCKED | ✅ | Witness made the target admission (or close equivalent) |
| PARTIAL | 🟡 | Witness partially admitted — needs follow-up to complete |
| DENIED | ❌ | Witness denied — impeachment needed (Gear 3) |
| EVASIVE | 🟠 | Witness evaded — Memory Pressure Sequence needed |
| OPEN | ⬜ | Not yet addressed |

### End-of-Deposition Gate

When the attorney signals intent to conclude:

```
╔═══════════════════════════════════════════════════════════════╗
║  ⚠️  DEPOSITION COMPLETION CHECK                             ║
║                                                               ║
║  MUST-GET elements still OPEN:                                ║
║  ⬜ Element 3: Causation — not addressed                     ║
║  🟠 Element 4: Damages — evasive, needs follow-up            ║
║                                                               ║
║  RECOMMENDATION: Do NOT close. Allocate {X} min to address   ║
║  these elements before concluding.                            ║
║                                                               ║
║  Rapid lock-in scripts:                                       ║
║  [Element 3]: "{scripted rapid question sequence}"            ║
║  [Element 4]: "{scripted follow-up for evasive response}"     ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## Component 3: Real-Time Personality Adaptation

### How It Works

During LIVE execution, the AI monitors the witness's responses for
archetype signifiers and adjusts prompts accordingly.

### Detection → Adaptation Flow

```
Witness Response → Linguistic Analysis → Archetype Match → Prompt Adjustment
```

### Live Prompt Examples by Archetype

**Arrogant (detected: absolute language, correcting examiner):**
```
SYNAPSE PROMPT: "Witness is over-committing. DO NOT challenge yet.
Let them continue. Record absolute: '{quote}'. Save for Gear 3.
Suggested next Q: 'And that was ALWAYS the case? No exceptions?'"
```

**Evasive (detected: "I don't recall" pattern):**
```
SYNAPSE PROMPT: "Evasive pattern detected ({X} 'don't recall' in {Y} min).
Execute Memory Pressure Sequence:
1. 'Is there anything that would refresh your memory?'
2. 'Would looking at {Doc X} help?'
3. [Show doc] 'Does this refresh your recollection?'
4. 'So sitting here today, you cannot recall {fact}. Correct?'"
```

**Pedantic (detected: semantic fighting):**
```
SYNAPSE PROMPT: "Witness is fighting definitions. PAUSE substance.
Anchor the term NOW:
'Let me make sure we're on the same page. When I say {term},
I mean {definition}. Can we agree to use that meaning today?'
Then return to substance with the anchored definition."
```

**Hostile (detected: answering with questions, argumentative):**
```
SYNAPSE PROMPT: "Hostile spike detected. DO NOT ENGAGE.
1. Maintain flat, clinical tone.
2. [SILENCE — 5 seconds]
3. Repeat the exact question verbatim. Same words.
4. If refused: 'I'll ask the court reporter to read back the question.'"
```

---

## Component 4: Silence Protocol

### Purpose
Train the attorney to use strategic silence after high-stakes questions.
Silence creates cognitive dissonance that pressures unprompted admissions.

### When to Activate
- After any Gear 2 COMMIT question
- After any Gear 3 CONFRONT question
- When the witness gives an incomplete answer
- When the witness's body language suggests they want to add something

### Protocol

```
╔═══════════════════════════════════════════════════════╗
║  🔇 SILENCE PROTOCOL ACTIVE                          ║
║                                                       ║
║  High-stakes question asked. DO NOT SPEAK.            ║
║                                                       ║
║  ████████████░░░░░░░░  3 seconds                     ║
║                                                       ║
║  Let the silence work.                                ║
║  The witness's discomfort is your advantage.          ║
║  Wait for them to fill the void.                      ║
╚═══════════════════════════════════════════════════════╝
```

### Countdown States

| Phase | Duration | AI Display |
|-------|----------|-----------|
| Active silence | 0-3 sec | "Silence active. Hold." |
| Pressure building | 3-5 sec | "Witness processing. Continue holding." |
| Maximum effect | 5-7 sec | "Peak pressure. If witness hasn't spoken, repeat question calmly." |
| Release | 7+ sec | "If still no response, move to next question or rephrase." |

---

## Component 5: Live Document Management

### Exhibit Queue
The AI maintains a queue of documents ready for deployment:

```
EXHIBIT QUEUE:
► NEXT: Exhibit 7 (Bates DEF-00145) — For Module 4, Gear 3
  STAGED: Exhibit 12 (Bates PLT-00089) — For Module 5, Gear 3
  STAGED: Exhibit 3 (Bates DEF-00023) — For Module 6, Gear 2 (foundation)
  USED: Exhibit 1, 4, 5, 9 (authenticated and on record)
```

### Pre-Impeachment Checklist
Before the AI allows Gear 3 document deployment:

```
PRE-IMPEACHMENT CHECK — Exhibit {N}:
□ Witness committed to contrary position (Gear 2 COMMIT)?
□ Escape hatches closed (no alternative explanations available)?
□ Document credibility established (Gear 3 CREDIT)?
→ All checks passed: PROCEED with CONFRONT
→ Check failed: RETURN to Gear 2 to close gaps
```

---

## Component 6: Objection & Coaching Monitor

### Real-Time Objection Log

```
OBJECTION LOG:
| # | Time | Type | Counsel Statement | Classification | Action |
|---|------|------|------------------|----------------|--------|
| 1 | 10:15 | Form | "Objection, form." | PROPER | None |
| 2 | 10:32 | Speaking | "Objection. If you recall." | COACHING | Script response |
| 3 | 10:45 | Form | "Objection, foundation." | PROPER | None |
| 4 | 11:02 | Speaking | "Objection. That mischaracterizes..." | COACHING | Script response |
```

### Auto-Generated Response (on COACHING detection)
```
SYNAPSE PROMPT: "Speaking objection detected. Suggested response:
'Counsel, objections must be concise and non-suggestive under
FRCP 30(c)(2). Please limit objections to form or foundation.'"
```

---

## LIVE Mode Invocation

**Attorney input:** "SYNAPSE LIVE" or "Go live" or "Start co-pilot"

**AI Response:**
1. Load the PREP outline (if already generated)
2. Initialize the HUD with Module 0 (Preamble)
3. Begin gear tracking and SJ monitoring
4. Activate the Shield

**During the deposition, the attorney provides:**
- Witness answers (typed summaries or quotes)
- Notes on witness behavior
- Requests for next questions or follow-up suggestions
- Alerts about opposing counsel behavior

**The AI provides:**
- Next question suggestions (gear-tagged)
- Personality adaptation prompts
- Shield alerts and response scripts
- SJ Tracker updates
- Time budget updates
- Silence Protocol activations

---

*CONFIDENTIAL — Parnall & Adams Law, LLC — Attorney Work Product*
