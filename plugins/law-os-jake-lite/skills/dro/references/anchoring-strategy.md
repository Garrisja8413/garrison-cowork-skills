# DRO Reference: ANCHOR Mode --- Negotiation Anchoring Strategy

## Purpose

Determine the optimal opening demand amount, bracket structure, concession
pattern, and timing strategy using empirical negotiation science. ANCHOR mode
translates the AUDIT/OPTIMIZE analysis into a concrete negotiation playbook
that maximizes settlement recovery.

## Prerequisites

**Required:**
- Completed DRO AUDIT (severity scoring) or sufficient data to run inline
- DC DAMAGES output (calculated damages ranges)
- ICM data (carrier identity, policy limits) --- strongly recommended

**Recommended:**
- SDC surprise inventory (leverage assessment)
- AIP profiles (adjuster behavioral patterns)

## Empirical Negotiation Science Foundation

ANCHOR mode is grounded in peer-reviewed negotiation research, not intuition.
Every recommendation cites its empirical basis.

### Core Research Base

| Principle | Source | Application |
|-----------|--------|-------------|
| **Anchoring bias** | Tversky & Kahneman (1974), "Judgment Under Uncertainty" | First numbers bias all subsequent negotiation. The opening demand is the most important number in the negotiation. |
| **Extreme anchors** | Galinsky & Mussweiler (2001), "First Offers as Anchors" | More aggressive first offers lead to higher settlement amounts, even when they are perceived as extreme. |
| **Precise numbers** | Mason et al. (2013), "Precise Offers Are Potent Anchors" | Precise opening demands ($487,500 vs. $500,000) are perceived as more informed and anchor more strongly. |
| **Bracketing** | Malhotra & Bazerman (2007), "Negotiation Genius" | Setting brackets (opening demand and walkaway) that are asymmetrically aggressive toward the target shifts the midpoint in plaintiff's favor. |
| **Concession patterns** | Kwon & Weingart (2004), "Unilateral Concessions" | Decreasing concession sizes signal approaching a firm number. Consistent-size concessions invite continued negotiation. |
| **Deadline effects** | Moore (2004), "The Unexpected Benefits of Final Deadlines" | Deadlines increase settlement rates and can increase settlement amounts when the deadline-setter has the stronger position. |
| **BATNA clarity** | Fisher & Ury (1981), "Getting to Yes" | A clearly communicated Best Alternative to Negotiated Agreement (litigation) strengthens negotiation position. |
| **Loss framing** | Kahneman & Tversky (1979), "Prospect Theory" | Framing the demand in terms of what the carrier risks losing (verdict exposure) rather than what plaintiff is gaining increases compliance. |

## Opening Demand Calculation

### The Anchor Formula

```
OPENING DEMAND = f(DC_High, Severity_Score, Coverage_Ceiling, Carrier_Type, Case_Strength)
```

**Decision matrix for opening demand multiplier:**

| Case Strength | Severity Score | Carrier Type | Opening Demand |
|--------------|----------------|--------------|----------------|
| Strong liability + strong damages | 300-400/400 | Algorithm-driven (Colossus) | 2.5-3.5x DC Mid-Range |
| Strong liability + strong damages | 300-400/400 | Adjuster-discretion | 2.0-3.0x DC Mid-Range |
| Strong liability + moderate damages | 200-300/400 | Algorithm-driven | 2.0-2.5x DC Mid-Range |
| Strong liability + moderate damages | 200-300/400 | Adjuster-discretion | 1.8-2.2x DC Mid-Range |
| Moderate liability + strong damages | 200-300/400 | Either | 1.5-2.0x DC Mid-Range |
| Moderate liability + moderate damages | 150-250/400 | Either | 1.3-1.8x DC Mid-Range |
| Weak liability or weak damages | <150/400 | Either | 1.2-1.5x DC Mid-Range |

**Coverage ceiling override:** If the multiplied amount exceeds policy limits,
the opening demand defaults to policy limits unless an excess/bad-faith
strategy is authorized. `[DECISION REQUIRED]` if demand must exceed limits.

### Precise Number Selection

Per Mason et al. (2013), precise numbers anchor more effectively than round
numbers. After calculating the multiplied amount:

1. If calculated opening is $500,000, adjust to $487,500 or $512,750
2. Avoid obvious round numbers ($100K, $250K, $500K, $1M)
3. The precise figure implies thorough analysis behind the number
4. Include cents for demands under $100,000 (e.g., $78,437.50)

## Bracket Design

### Three-Number Framework

Every ANCHOR output produces three numbers:

| Number | Definition | Calculation | Purpose |
|--------|-----------|-------------|---------|
| **Opening Demand** | First number communicated to carrier | Multiplier formula above | Set the anchor; establish the negotiation range ceiling |
| **Target** | The amount we realistically aim to settle at | DC Mid-to-High range, adjusted for severity and leverage | Internal goal; never communicated to carrier |
| **Floor** | Minimum acceptable settlement; below this we litigate | DC Low range minus litigation cost adjustment | Walk-away point; `[DECISION REQUIRED]` for attorney to set |

### Bracket Asymmetry

The opening demand should be positioned so that the **midpoint between
the opening demand and the expected carrier opening offer** falls at or
above the Target.

```
Example:
  Our opening demand: $475,000
  Expected carrier counter: $45,000
  Midpoint: $260,000
  Our target: $225,000
  Result: Midpoint ($260K) > Target ($225K) --- GOOD bracket design
```

If the midpoint falls below the Target, the opening demand is too low.
Adjust upward.

### Carrier Response Prediction

Predict the carrier's likely opening counter based on:
- Carrier type (algorithm carriers counter lower; discretion carriers vary)
- Severity score (higher scores = higher initial counter)
- Policy limits (carriers rarely open above 20% of limits)
- Litigation stage (pre-suit counters are lower than post-suit)

## Concession Pattern Design

### The Decreasing Concession Model

Research shows that decreasing concession sizes signal approaching a firm
position. DRO designs a concession schedule that:

1. **First concession**: Largest move (25-35% of distance to target)
2. **Second concession**: Smaller (15-20% of remaining distance)
3. **Third concession**: Smaller still (10-15% of remaining distance)
4. **Final concession**: Token move (under 5%) --- signals "final number"

### Concession Schedule Template

```
CONCESSION SCHEDULE
| Round | Our Number | Move ($) | Move (%) | Signal | Timing |
|-------|-----------|----------|----------|--------|--------|
| 1 (Demand) | $475,000 | --- | --- | Anchor set | Day 0 |
| 2 (Counter) | $387,500 | -$87,500 | 18.4% | "Significant movement; reflect seriousness" | Day 30-45 |
| 3 | $337,500 | -$50,000 | 12.9% | "Movement slowing; approaching real number" | Day 60-75 |
| 4 | $312,500 | -$25,000 | 7.4% | "Nearly there; this is close to our bottom" | Day 80-90 |
| 5 (Final) | $300,000 | -$12,500 | 4.0% | "Final number; this is where we are" | Day 95 |
```

### Conditional Concession Rules

- Never make a concession without receiving one from the carrier
- Match the carrier's concession ratio (if they move 10%, we move proportionally)
- If the carrier's counter is unreasonably low (< 15% of demand), do NOT
  make a large concession --- it rewards bad-faith negotiation
- If the carrier does not move, hold position and escalate (litigation threat,
  supervisor demand, time-limited demand)

## Deadline and Time-Pressure Strategy

### Time-Limited Demand Framework

A time-limited demand (TLD) creates urgency by setting an expiration date
on the demand amount. After expiration, the demand increases or is withdrawn.

**When to use a TLD:**
- Strong liability (clear fault)
- Policy-limits or near-limits demand
- Carrier is stalling or offering unreasonably low
- Pre-suit demand with litigation filing date approaching
- Stowers / bad-faith exposure scenario (creates excess exposure for carrier)

**NM-specific considerations:**
- NM follows the Stowers doctrine (carrier has duty to settle within limits
  when liability is clear and damages exceed limits)
- Time-limited demand creates documented bad-faith exposure
- Must allow "reasonable" time to respond (minimum 30 days recommended;
  shorter periods may be challenged as unreasonable)
- `[DECISION REQUIRED]` for every TLD --- attorney must approve timing and terms

### TLD Structure

```
TIME-LIMITED DEMAND
| Element | Value | Notes |
|---------|-------|-------|
| Demand amount | $[X] | Policy limits or calculated amount |
| Expiration date | [Date] | Minimum 30 days from receipt |
| Post-expiration consequence | Demand increases to $[Y] / Litigation filed / Offer withdrawn | Specify clearly |
| Bad-faith exposure notice | Included (Y/N) | If demand = limits and liability clear |
| Response requirements | Written acceptance + check within [N] days | Be specific on form of acceptance |
```

### Non-TLD Timing Strategy

Even without a formal TLD, timing creates leverage:

- **Pre-suit demand**: "We intend to file suit on [date] if this matter
  is not resolved." Creates implicit deadline.
- **Discovery deadline pressure**: "Discovery closes on [date]; after that,
  our damages evidence will be public and your exposure increases."
- **Trial date pressure**: "Trial is set for [date]; jury verdicts in
  [county] for similar injuries average $[X]."
- **Seasonal timing**: Avoid December-January (holiday adjuster turnover);
  target Q2/Q3 when budgets are fresh.

## Negotiation Playbook: If-Then Response Matrix

The playbook prepares responses for common carrier tactics:

| Carrier Move | DRO Response | Rationale |
|-------------|-------------|-----------|
| Low-ball counter (< 15% of demand) | Hold position; request justification for valuation; escalate to supervisor | Rewarding low-balls with concessions trains the adjuster to low-ball |
| "Pre-existing condition" objection | Present aggravation evidence; physician causation letter | Address directly; do not concede without medical evidence |
| "Treatment was excessive" | Present treatment guidelines; physician necessity letter | Reframe as "thorough treatment for serious injury" |
| "Soft tissue only" | Present objective findings; emphasize functional impact | Shift from diagnosis label to impact narrative |
| "Comparative negligence" argument | Present liability evidence; police report; witnesses | Address percentage directly with evidence |
| Demand for medical authorization | Decline; offer specific records with HIPAA-compliant authorization | Do not give carrier fishing license into medical history |
| Radio silence (no response) | 30-day follow-up; then escalation letter; then litigation | Document every contact attempt for bad-faith file |
| Supervisor review claim | Accept supervisor involvement; restate demand firmly | Supervisor review is often a stall tactic; maintain pressure |
| Offer to mediate | Evaluate timing; accept if leverage is strong | Mediation works best when we have full documentation ready |

## Output Format

### Anchoring Strategy Memo

```
ATTORNEY WORK PRODUCT --- PRIVILEGED

ANCHORING STRATEGY MEMO --- [Case Name]
Carrier: [Name] | System: [Colossus/ClaimIQ/Manual] | Limits: $[X]
DC Range: Low $[X] / Mid $[X] / High $[X]
Severity Score: [X]-[Y] / 400

OPENING DEMAND: $[Precise amount]
  Multiplier: [X.X]x DC Mid
  Empirical basis: [Citation]
  Coverage ceiling: [Within/Exceeds] limits [DECISION REQUIRED if exceeds]

BRACKET DESIGN:
  Opening: $[X]
  Target: $[X]
  Floor: $[X] [DECISION REQUIRED]
  Midpoint test: $[X] [PASS/FAIL vs. target]

CONCESSION SCHEDULE: [See table]

TIME STRATEGY: [TLD / Pre-suit deadline / Seasonal timing]

NEGOTIATION PLAYBOOK: [If-then matrix]

QUALITY GATE: [PASS/FAIL]
OPEN ITEMS: [List]
```
