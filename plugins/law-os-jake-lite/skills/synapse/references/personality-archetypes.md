# Matrix B: Personality Archetypes & NLP — Detailed Reference

## Overview

The AI classifies each witness into a behavioral archetype during PREP (from
case knowledge and prior transcripts) and refines the classification in real-time
during LIVE execution via linguistic telemetry. Each archetype triggers specific
countermeasures that override default Gear behavior.

---

## NLP Baseline Tracking

### Representational Modalities

During Gear 1, the AI identifies the witness's dominant processing modality:

| Modality | Linguistic Markers | Rapport Strategy (Gear 2) | Disruption Strategy (Gear 3) |
|----------|-------------------|--------------------------|------------------------------|
| **Visual** | "I see," "it looked like," "from my perspective," "clearly" | Mirror: "So what you saw was..." | Switch to auditory: "What were the exact words said?" |
| **Auditory** | "I heard," "it sounded like," "they told me," "that rings true" | Mirror: "So what you heard was..." | Switch to kinesthetic: "How did that make you feel?" |
| **Kinesthetic** | "I felt," "it hit me," "my gut reaction," "heavy pressure" | Mirror: "So your sense was..." | Switch to visual: "Show me exactly where you were standing." |

### Deception Indicators (Linguistic Telemetry)

The AI monitors for shifts from Gear 1 baseline that may indicate cognitive stress:

| Indicator | Baseline (Gear 1) | Stress Signal | AI Action |
|-----------|-------------------|---------------|-----------|
| **Latency** | Normal response time | Significant delay before answering | Note for Gear 3 targeting |
| **Modality shift** | Consistent modality | Sudden switch (e.g., visual → kinesthetic) | Flag — possible fabrication |
| **Pronoun distance** | "I did," "I saw" | Shift to "one might," "it was done" | Push for first-person re-commitment |
| **Qualifier inflation** | Direct answers | "To the best of my recollection," "I believe" | Memory Pressure Sequence |
| **Tense shift** | Consistent past tense | Shift to present tense when describing past events | Flag — possible rehearsed narrative |
| **Detail flooding** | Proportionate detail | Excessive, irrelevant detail on specific points | Flag — possible constructed alibi |

---

## Archetype 1: The Arrogant / Narcissist

### Linguistic Signifiers
- "Always," "Never" (absolute language)
- Correcting the examiner's word choices
- High "I" usage (self-referential dominance)
- Volunteering information not asked for
- Dismissive of documents ("That's not how I would describe it")
- Confident, fast answers with no hedging

### AI Strategy: The Rope Drop

**Philosophy:** The narcissist's weakness is their confidence. They WANT to talk.
They WANT to demonstrate superiority. Let them. Suppress leading questions in
Gear 1. Feign confusion to draw them out further. Let them confidently over-commit
to an absolute standard, then use their own words to destroy them in Gear 3.

**Gear 1 Modifications:**
```
[G1-NARC] Extended Gear 1 — let them talk longer than normal
[G1-NARC] Feign confusion: "I'm not sure I follow. Can you explain that again?"
[G1-NARC] Feed the ego: "You seem to know this area well. Walk me through it."
[G1-NARC] Record every absolute: "always," "never," "every single time"
```

**Gear 2 Modifications:**
```
[G2-NARC] Lock the absolutes: "You said you 'always' do {X}. No exceptions?"
[G2-NARC] "In your entire career, not a single instance of {exception}?"
[G2-NARC] "So if I showed you a document where {exception occurred},
           that would be wrong? Because you 'always' do {X}?"
```

**Gear 3 Modifications:**
```
[G3-NARC] Deploy the single exception that destroys the "always/never"
[G3-NARC] Use their own corrected terminology against them
[G3-NARC] The contrast between their confidence and the document is devastating
```

### Critical Warning
Do NOT argue with the narcissist. Do NOT try to control them in Gear 1.
Every minute they talk freely is a minute they're building the trap for themselves.

---

## Archetype 2: The Evasive / "Amnesiac"

### Linguistic Signifiers
- "I don't recall" (frequent, even for recent events)
- Hedge words: "possibly," "maybe," "I think," "I'm not sure"
- Passive voice: "The report was filed" (not "I filed the report")
- Long latency before answering
- Answering a different question than was asked
- "That sounds about right" instead of "Yes"

### AI Strategy: Memory Pressure Sequence

**Philosophy:** Convert fog into limits. The witness who "doesn't recall" anything
is creating a record of comprehensive ignorance — which is itself usable. The
sequence methodically strips away the "I don't recall" escape by offering every
possible memory aid, then locking the inability.

**The Memory Pressure Sequence (5 steps):**
```
Step 1: "Is there anything that would refresh your memory about {topic}?"
Step 2: "Would looking at a document help?"
Step 3: "I'm showing you {Doc X}. Does this refresh your recollection?"
Step 4: [If still no] "So even after reviewing {Doc X}, you still cannot recall?"
Step 5: "Sitting here today, you cannot point to any {document/record/person}
         that would help you remember {fact}. Correct?"
► [SJ-FLAG] Inability locked — witness cannot support or deny {fact}
```

**Gear 1 Modifications:**
```
[G1-EVASIVE] Shorter Gear 1 — evasive witnesses waste time in narrative
[G1-EVASIVE] Pin down: "When you say 'I don't recall,' do you mean it didn't
              happen, or it may have happened but you don't remember?"
[G1-EVASIVE] "Is your memory generally good about events in {timeframe}?"
```

**Gear 2 Modifications:**
```
[G2-EVASIVE] Convert every "I don't recall" into a limit:
[G2-EVASIVE] "You cannot recall any {action} occurring. Correct?"
[G2-EVASIVE] "You have no memory of {event}. Correct?"
[G2-EVASIVE] "If {event} had occurred, you would expect to remember it?"
[G2-EVASIVE] "So if no one can recall {event}, there is no evidence it happened?"
```

**Gear 3 Modifications:**
```
[G3-EVASIVE] Documents are the antidote to "I don't recall"
[G3-EVASIVE] "You don't recall writing this email. But this IS your email address?"
[G3-EVASIVE] "And this IS your signature?"
[G3-EVASIVE] "So the document shows {fact}, even though you cannot recall it?"
```

---

## Archetype 3: The Analytical / Pedant

### Linguistic Signifiers
- Semantic fighting: "That depends on what you mean by 'inspection'"
- Hyper-literalism: answering exactly what was asked, nothing more
- Requests to rephrase or clarify questions
- Long, precise, over-qualified answers
- "Well, technically..." or "To be precise..."
- Refuses to agree to reasonable generalizations

### AI Strategy: Definitional Anchoring

**Philosophy:** Remove semantic escape hatches before they can be exploited. Build
an upfront module forcing the witness to agree to a strict glossary of terms.
Once definitions are locked, the pedant cannot wriggle out via word games.

**Pre-Substance Module (MANDATORY for this archetype):**
```
[G0-PEDANT] Before we begin on the substance, I want to make sure we're using
            the same language.
[G0-PEDANT] When I use the word "{term}", I mean {definition}. Is that fair?
[G0-PEDANT] When you use the word "{term}", what do you mean by that?
[G0-PEDANT] For today's purposes, can we agree that "{term}" means {definition}?
[G0-PEDANT] [Build glossary of 5-10 key terms before substance begins]
```

**Gear 2 Modifications:**
```
[G2-PEDANT] Prefix every critical question with the agreed definition:
[G2-PEDANT] "Using our agreed definition of 'inspection' — meaning {def} —
             you did not conduct an inspection on May 14. Correct?"
[G2-PEDANT] If they try to redefine: "We agreed earlier that {term} means {def}.
             Has your understanding changed?"
```

**Gear 3 Modifications:**
```
[G3-PEDANT] Use the document's own terminology — harder for the pedant to dispute
[G3-PEDANT] "The document uses the word 'inspection.' In context, does it match
             our agreed definition?"
```

### Critical Warning
Do NOT get drawn into the pedant's semantic game. If they refuse to agree to
a definition, use their own definition and lock them to it. The key is to
establish the glossary EARLY before substance, so objections based on word
meaning are foreclosed.

---

## Archetype 4: The Hostile / Defiant

### Linguistic Signifiers
- High pitch, fast speech rate
- Answering questions with questions ("Why do you want to know?")
- Argumentative responses ("That's not what happened")
- Physically aggressive body language (leaning forward, pointing)
- Refusal to answer: "I'm not going to answer that"
- Attacking the attorney's competence or motives

### AI Strategy: Emotional Aikido

**Philosophy:** The hostile witness wants to provoke an emotional response. Their
aggression, if unchecked, destroys their video credibility. DO NOT engage.
Maintain flat, clinical tone. Use silence as a weapon. Repeat the exact question
verbatim. Let their behavior speak for itself on the video record.

**Gear 1 Modifications:**
```
[G1-HOSTILE] Minimal Gear 1 — hostile witnesses will not narrate helpfully
[G1-HOSTILE] Short, clear questions only
[G1-HOSTILE] If witness answers with a question: "I'll note your non-answer.
              My question was: {exact question}. Can you answer that?"
```

**Gear 2 Modifications (THE CORE PROTOCOL):**
```
[G2-HOSTILE] When hostility spikes:
  1. DO NOT SPEAK. Maintain flat, clinical tone.
  2. Let 5 seconds of silence pass. [SILENCE PROTOCOL]
  3. Repeat the exact question verbatim. Same words. Same tone.
  4. If still refused: "I'll ask the court reporter to read back the question."
  5. If still refused: "I'm directing you to answer under NMRA 1-030."
```

**Handling Specific Hostile Behaviors:**

| Behavior | Response |
|----------|----------|
| Answers with a question | "My question was {X}. Can you answer yes or no?" |
| "I'm not going to answer" | "Are you refusing to answer on advice of counsel?" → If no counsel objection: "Then please answer." |
| Argues with premise | "I understand you disagree. My question is simply: {X}. Yes or no?" |
| Attacks attorney | [SILENCE — 5 sec] Repeat question verbatim. |
| Filibusters | "I appreciate the context. My specific question was: {X}." |

**Gear 3 Modifications:**
```
[G3-HOSTILE] Documents calm hostile witnesses — they have to read, which
             engages System 2 and suppresses emotional System 1
[G3-HOSTILE] Use documents heavily and early with hostile witnesses
[G3-HOSTILE] "Please read the highlighted portion to yourself." [PAUSE]
[G3-HOSTILE] Flat, factual: "The document says {X}. Your testimony is {Y}.
              Which is correct?"
```

### Critical Warning
**The attorney's demeanor IS the strategy.** If the attorney matches the
witness's hostility, both lose. The calm, clinical attorney next to the
raging witness creates devastating trial video. The AI must reinforce this
discipline throughout.

---

## Archetype Detection During LIVE Phase

The AI does not require a pre-classification. During LIVE, it monitors for
signifier clusters and adapts:

```
IF witness uses ≥3 absolute terms in 5 minutes → Flag ARROGANT
IF witness says "I don't recall" ≥3 times in 10 minutes → Flag EVASIVE
IF witness challenges ≥2 word definitions → Flag PEDANT
IF witness exhibits ≥2 hostile behaviors → Flag HOSTILE
```

**Transition protocol:** When the AI detects an archetype shift (e.g., a witness
starts cooperative then becomes hostile), it immediately updates the HUD and
adjusts prompts to the new archetype's countermeasures.

**Hybrid profiles:** Some witnesses exhibit traits of multiple archetypes. The AI
applies the dominant archetype's strategy but incorporates secondary countermeasures
as needed. Example: An Arrogant-Hostile witness gets the Rope Drop strategy
(let them talk) combined with Emotional Aikido (flat tone when they attack).

---

*CONFIDENTIAL — Parnall & Adams Law, LLC — Attorney Work Product*
