# SDC Reference: TELEGRAPH Mode — Outgoing Discovery Request Signal Analysis

## Purpose

Before serving discovery requests (interrogatories, RFPs, RFAs,
deposition notices), analyze what our questions reveal about our
litigation strategy. Every question is a signal. TELEGRAPH mode helps
minimize unintended signals and adds deliberate noise.

## Input Requirements

1. **Draft discovery requests** — the requests we plan to serve
2. **Disclosure Ledger** — current state
3. **Current Posture** — from POSTURE mode

## Signal Analysis Framework

### What Discovery Requests Reveal

| Request Feature | What It Signals |
|----------------|----------------|
| **Topic selection** | Which issues we consider important |
| **Time period** | When we think relevant events occurred |
| **Person/entity named** | Who we think is responsible or knowledgeable |
| **Document categories** | What kind of evidence we're looking for |
| **Defined terms** | How we're framing the case legally |
| **Level of specificity** | How much we already know (vs. fishing) |
| **Number of requests on a topic** | How important we think that topic is |
| **Sequence/ordering** | Our theory of the case structure |
| **Conspicuous omissions** | What we're NOT asking about (may signal we already have it) |

### Signal Intensity Scale

| Level | Description | Example |
|-------|-------------|---------|
| **5 — Direct** | Request explicitly reveals strategy | "Produce all documents relating to your decision to terminate safety inspections in Q1 2024" → reveals we know about the termination |
| **4 — Strong** | Request strongly implies strategy | "Identify all employees who raised safety concerns" → reveals we're building negligence/cover-up theory |
| **3 — Moderate** | Request suggests an area of interest | "Produce all safety-related documents from 2023-2024" → reveals safety is a focus area |
| **2 — Weak** | Request provides minimal strategic information | "Produce all policies and procedures" → routine, reveals little |
| **1 — Noise** | Request reveals nothing about strategy | Standard boilerplate requests → no signal |

## Analysis Protocol

### Step 1: Request-by-Request Signal Assessment

For each discovery request:

```
| Req # | Signal Level | What It Reveals | Ledger Impact | Recommendation |
```

**Ledger Impact:** Which currently-UNDISCLOSED items become INFERRED if
defense connects the dots?

**Recommendation:**
- `SERVE AS-IS` — acceptable signal level
- `BROADEN` — make the request broader to dilute the signal
- `REFRAME` — change the framing to reduce specificity
- `DEFER` — consider serving this request later, after other discovery
  has provided cover for the question
- `ADD DECOY` — include decoy requests to mask the signal
- `REMOVE` — signal too strong for current posture; obtain the
  information through other means

### Step 2: Combinatorial Signal Analysis

Some requests are individually low-signal but COMBINED reveal strategy:

**Example:**
- Request 1: "Produce all personnel files for employees in the safety department" (Signal: 3)
- Request 2: "Identify all OSHA complaints filed in 2023-2024" (Signal: 3)
- Request 3: "Produce documents relating to safety training programs" (Signal: 2)
- **Combined signal: 5** — clearly building a negligent safety claim

**Assessment:** Look at all requests together. Group by theme. Identify
when the aggregate signal exceeds acceptable levels.

### Step 3: Omission Analysis

What are you NOT asking about? Conspicuous omissions can signal:
- You already have the information (from a non-party source)
- You're not pursuing a theory the defense expects you to pursue
- You're deliberately avoiding a topic to preserve surprise

**Risk:** A sophisticated defense attorney will notice what you DIDN'T ask
for and may infer that you already have it through other means.

**Mitigation:** Include at least some requests in areas where you already
have information. This creates noise — the defense can't distinguish
between "they're asking because they need it" and "they're asking even
though they already have it."

### Step 4: Decoy Design

Decoy requests serve multiple purposes:
1. **Dilute signals** — mask real targets in a larger request set
2. **Consume defense resources** — they spend time objecting/responding
   to decoys instead of focusing on what matters
3. **Create discovery record** — even decoy requests, if they produce
   useful information, help the case

**Good decoy characteristics:**
- Plausible (defense doesn't immediately see them as fishing)
- In areas adjacent to but not directly on your hidden theory
- Produce some useful information (not completely pointless)
- Consistent with the case theories you've disclosed

**Example:** If your hidden theory is UPA (unfair practices), serve
prominent discovery on negligence topics (your disclosed theory) with
UPA-relevant requests mixed in as seemingly routine items about
"business practices," "customer communications," and "complaint history."

### Step 5: Sequence Optimization

The ORDER in which you serve discovery sets matters:

**Round 1 (Early):** Broad, routine requests that establish baseline.
Low signal. Get the defense used to responding.

**Round 2 (Mid):** More targeted requests. Some signal is acceptable now
because the defense has already committed positions in their first responses.

**Round 3 (Late):** Targeted follow-ups. Higher signal is acceptable
because you're building on information already obtained.

**Principle:** Later rounds can be more specific because the defense
will attribute the specificity to what they disclosed in earlier rounds.

## Output Format

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SDC TELEGRAPH REPORT — [Discovery Set Type] — [Date]
Current Posture: [POSTURE]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

REQUEST-BY-REQUEST ANALYSIS:

| Req # | Signal | Reveals | Ledger Items at Risk | Action |
|-------|--------|---------|---------------------|--------|
| ROG 1 | 2 | Routine | None | SERVE AS-IS |
| ROG 2 | 4 | Safety theory | CFP-F#47, LPB-UPA-001 | BROADEN |
| ROG 3 | 1 | Nothing | None | SERVE AS-IS (good noise) |
| RFP 1 | 5 | We know about memo | CFP-F#89 | REFRAME or DEFER |
| ... |

COMBINATORIAL SIGNALS:

⚠️ [GROUP]: Requests [X, Y, Z] together reveal [theory/strategy]
   Combined Signal: [5]
   Recommendation: [Spread across multiple discovery rounds / add decoys]

OMISSION ANALYSIS:

📋 Conspicuous omissions: [areas NOT covered that defense may notice]
   Risk: [assessment]
   Mitigation: [add noise requests in these areas]

DECOY RECOMMENDATIONS:

Add [N] decoy requests in these areas:
1. [Topic] — [example request] — masks signal on [real topic]
2. [Topic] — [example request] — creates noise around [area]
3. [Topic] — [example request] — consumes defense resources

SEQUENCE RECOMMENDATION:

Serve in this order:
1. [Set type]: [Topics] — [Signal level: Low]
2. [Set type]: [Topics] — [Signal level: Moderate] — after Round 1 responses received
3. [Set type]: [Topics] — [Signal level: Acceptable given prior rounds]

NET SIGNAL ASSESSMENT:

Overall signal if served as drafted: [1-5 score]
Overall signal with recommended changes: [1-5 score]
Posture consistency: [CONSISTENT / INCONSISTENT]

[DECISION REQUIRED] — Attorney review of high-signal requests.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## RFA-Specific Telegraph Considerations

RFAs are uniquely revealing because they show exactly what you consider
established facts:

- Asking someone to admit X means you believe X is true and provable
- The TOPICS of your RFAs reveal your claim structure
- RFAs on specific dates/events reveal your timeline theory
- RFAs on specific standards reveal your legal theory

**Mitigation:** Include RFAs on undisputed background facts (easy admits)
alongside targeted RFAs. This normalizes the format and reduces signal
intensity on individual requests.

## Deposition Notice Telegraph Considerations

A 30(b)(6) notice is the most telegraphing discovery device:
- Each topic area explicitly identifies what you want to learn
- Topic selection reveals which corporate functions you're targeting
- The number of topics on an area reveals its importance

**Mitigation:**
- Include broad, routine topics alongside targeted ones
- Frame topics in general business language, not legal terms
- Save the most revealing topics for later notices (after initial
  corporate deposition provides cover for follow-up specificity)
