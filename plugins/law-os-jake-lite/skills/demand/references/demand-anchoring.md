# DEMAND Anchoring Strategy Reference

## Purpose

This reference provides the negotiation theory and practical strategy behind demand amount selection and presentation. The demand amount is the first number in the negotiation -- it sets the psychological anchor from which all subsequent negotiation proceeds. A well-anchored demand increases the settlement outcome; a poorly anchored one leaves money on the table or destroys credibility.

This reference is used in conjunction with DC SETTLEMENT-EVAL output, which provides the computed demand number, walk-away number, and anchoring rationale.

---

## Part 1: Anchoring Theory

### 1.1 The Anchoring Effect in Negotiation

**Anchoring** is the cognitive bias whereby the first number introduced in a negotiation disproportionately influences the final outcome. Research consistently shows:

- The party that makes the first offer achieves better outcomes (Galinsky & Mussweiler, 2001)
- Higher opening demands lead to higher settlement amounts, provided they remain credible
- The anchor works even when the other party knows it is a starting position
- The anchor is most powerful when supported by specific, detailed justification

### 1.2 Why Plaintiff Goes First

In PI settlement negotiations, the plaintiff almost always makes the first demand. This is strategically advantageous because:

1. **Sets the range.** The carrier's counter-offer will be calibrated against the demand.
2. **Frames the discussion.** The negotiation becomes "how far down from the demand" rather than "how far up from zero."
3. **Forces the carrier to justify a lower number.** The burden shifts to the adjuster to explain why the case is worth less.
4. **Controls the midpoint.** The eventual settlement typically falls near the midpoint between the demand and the first counter-offer.

### 1.3 The Credibility-Aggression Tradeoff

| Anchor Level | Effect | Risk |
|-------------|--------|------|
| Too low | Leaves money on the table; carrier accepts quickly (bad sign) | Undervalues client's claim |
| Appropriately aggressive | Sets high anchor; carrier takes demand seriously and negotiates down | Optimal zone |
| Too high | Carrier dismisses demand as unrealistic; may not counter-offer at all | Destroys credibility, stalls negotiation |

**The goal:** Demand at the highest level that remains credible given the facts and damages.

---

## Part 2: Demand Amount Selection

### 2.1 The DC SETTLEMENT-EVAL Framework

The DC skill produces the demand number through this analysis:

```
DC SETTLEMENT-EVAL Output:
  Specials Total:        $[AMOUNT]  (medical + lost wages -- hard numbers)
  Generals Range:        $[LOW] - $[HIGH]  (pain/suffering, loss of enjoyment, etc.)
  Total Damages Range:   $[LOW TOTAL] - $[HIGH TOTAL]
  Demand Number:         $[DEMAND]  (anchoring target)
  Walk-Away Number:      $[WALK-AWAY]  (minimum acceptable settlement)
  Settlement Target:     $[TARGET]  (realistic expected outcome)
  Anchoring Rationale:   [Explanation of how demand number was derived]
```

### 2.2 Multiplier Method

The traditional PI demand approach uses a multiplier on special damages:

```
Demand = (Special Damages) x (Multiplier) + Special Damages
       = Special Damages x (1 + Multiplier)
```

| Case Severity | Typical Multiplier | Applies When |
|---------------|-------------------|-------------|
| Soft tissue, full recovery | 1.5 - 3x | Minor injuries, short treatment, full recovery |
| Moderate injury, some permanence | 3 - 5x | Herniated disc, surgery, some ongoing symptoms |
| Serious injury, significant impact | 5 - 8x | Multiple surgeries, chronic pain, permanent limitations |
| Catastrophic injury | 8 - 15x+ | TBI, paralysis, amputation, loss of function |
| Wrongful death | Case-specific | Not strictly multiplier-based; depends on decedent's life and survivors |

**IMPORTANT:** The multiplier method is a rough heuristic. The DC skill uses more sophisticated analysis including comparable outcomes, NM jury values, and case-specific factors. The multiplier is a cross-check, not the primary method.

### 2.3 Comparable Outcomes Method

When DVP outcomes pack is available, the demand can be anchored to actual NM verdicts and settlements:

1. Identify 3-5 comparable cases from DVP (similar injuries, similar liability, NM jurisdiction preferred)
2. Adjust for case-specific factors (stronger/weaker liability, more/less severe injuries, venue differences)
3. Set the demand at or above the median of the comparable range
4. Use the highest comparable as the upper bound for the demand justification

**Example:**
```
Comparable NM outcomes for MVC with cervical disc herniation:
  Garcia v. Smith (Bernalillo Co., 2024):   $325,000 verdict
  Rodriguez v. Jones (Bernalillo Co., 2023): $285,000 settlement
  Martinez v. Lee (Santa Fe Co., 2024):      $410,000 verdict
  Chavez v. Williams (Dona Ana Co., 2023):   $225,000 settlement

Range: $225,000 - $410,000
Median: $305,000
Our case factors: Strong liability (rear-end), surgery required, ongoing treatment

Anchoring decision: Demand at $400,000 (near top of range, justified by surgery
and ongoing treatment that distinguish from lower outcomes)
```

### 2.4 Per Diem Method for Non-Economic Damages

For presenting non-economic damages (pain and suffering) in the demand:

```
Per Diem Calculation:
  Daily pain/suffering value: $[AMOUNT] per day
  Days of suffering (past): [X] days (incident to present)
  Days of suffering (future): [Y] days (present to life expectancy or recovery)

  Past non-economic: $[DAILY] x [X] = $[PAST TOTAL]
  Future non-economic: $[DAILY] x [Y] = $[FUTURE TOTAL]
```

**NM note:** Per diem arguments are generally permitted in NM. UJI 13-1802 allows the jury to consider the "nature, extent, and duration" of injuries, which supports a per diem presentation.

**Selecting the daily rate:**
- Low: $50-$100/day (minor discomfort, intermittent pain)
- Moderate: $100-$300/day (chronic pain, significant limitations)
- High: $300-$750/day (severe pain, major life disruption)
- Catastrophic: $750+/day (constant severe pain, total disability)

---

## Part 3: Bracketing Strategy

### 3.1 What is Bracketing?

Bracketing is the technique of setting the demand so that the expected settlement falls within a target range. The demand is set high enough that even after negotiation concessions, the final number lands in the acceptable zone.

```
Demand (opening):       $400,000  <-- Anchor
Expected counter:       $75,000   <-- Carrier's opening position
Midpoint:              $237,500   <-- Mathematical midpoint
Settlement target:     $250,000   <-- Where we want to land
Walk-away:             $175,000   <-- Minimum acceptable

Bracket analysis:
  If carrier counters at $75K and we settle near midpoint ($237K),
  this exceeds our walk-away ($175K) and approaches our target ($250K).
  Demand of $400K creates the right bracket.
```

### 3.2 Bracket Calculation

To reverse-engineer the demand from a settlement target:

```
Desired Settlement = (Demand + Expected Counter) / 2
Therefore: Demand = (2 x Desired Settlement) - Expected Counter

Example:
  Desired Settlement: $250,000
  Expected Counter: $75,000
  Demand = (2 x $250,000) - $75,000 = $425,000

  Rounding up for anchoring strength: Demand = $450,000
```

### 3.3 Carrier Counter-Offer Estimation

To estimate the carrier's likely counter-offer (for bracketing purposes):

| Factor | Lower Counter | Higher Counter |
|--------|--------------|---------------|
| Liability disputed | Lower | N/A |
| Liability clear | N/A | Higher |
| Soft tissue only | Lower | N/A |
| Surgery required | N/A | Higher |
| Prior claims history | Lower | N/A |
| Sympathetic plaintiff | N/A | Higher |
| Conservative venue | Lower | N/A |
| Plaintiff-friendly venue | N/A | Higher |
| Low policy limits | Lower (limited by limits) | N/A |
| High policy limits | N/A | Higher (more room) |
| Colossus/ClaimIQ evaluation | Carrier's software sets reserves | DRO skill can estimate |

---

## Part 4: Concession Patterns

### 4.1 Planning the Concession Sequence

The demand letter establishes the first number. Subsequent negotiation involves a series of concessions. Plan the concession pattern BEFORE sending the demand.

**Principle: Diminishing concessions.** Each concession should be smaller than the last, signaling that you are approaching your bottom line.

```
Round 1 (Demand):       $400,000
Round 2 (if counter):   $350,000  (concession: $50,000)
Round 3 (if counter):   $320,000  (concession: $30,000)
Round 4 (if counter):   $305,000  (concession: $15,000)
Round 5 (if counter):   $300,000  (concession: $5,000 -- "final number" signal)
Walk-away:              $250,000
```

### 4.2 Concession Rules

| Rule | Explanation |
|------|-------------|
| Never concede without a counter | Do not reduce the demand unless the carrier has made a counter-offer |
| Each concession smaller than the last | Signals approaching your floor |
| Never split the difference first | Let the carrier suggest splitting; then negotiate from there |
| Justify each concession | "In the interest of resolution, we are willing to reduce to $X because [reason]" |
| Never reveal the walk-away | The walk-away is internal strategy, never communicated |
| Use round numbers strategically | Dropping from $400K to $350K feels like a concession; $400K to $387,500 signals precision |
| Time concessions to events | Reduce after mediation, after discovery milestone, or after favorable ruling |

### 4.3 Carrier Negotiation Tactics to Anticipate

| Tactic | Description | Response |
|--------|-------------|----------|
| Lowball first counter | Carrier offers 10-15% of demand | Reject quickly with minimal concession to signal the lowball is unacceptable |
| "Policy limits" claim | Carrier says limits are low | Request proof of limits; explore umbrella/excess; consider UIM |
| Delay | Carrier stalls to reduce urgency | Set clear deadlines; reference pre-judgment interest accrual |
| "Reserves set at X" | Carrier reveals reserves to anchor low | Reserves are not relevant to case value; reject the framing |
| "Colossus says X" | Carrier cites software valuation | Software valuations undervalue NM jury potential; reference actual verdicts |
| Comparative fault argument | Carrier argues plaintiff contributed | Address with NM pure comparative fault law; discount is factor, not bar |
| Pre-existing condition argument | Carrier claims injuries pre-existing | Eggshell plaintiff doctrine; aggravation of pre-existing (UJI 13-1806) |
| "Final offer" before it is final | Carrier claims best offer to force acceptance | Test by making a small counter; true final offers do not move |

---

## Part 5: Demand Amount Presentation in the Letter

### 5.1 How to State the Demand

The demand amount should be stated:
1. As a specific number (not a range)
2. With clear connection to the damages analysis
3. With brief anchoring rationale
4. Without apology or qualification

**Strong presentation:**
```
Based on the damages analysis detailed above, including $67,432 in past
medical expenses, $45,000-$85,000 in estimated future medical costs,
$12,500 in lost wages, and substantial non-economic damages for the
pain, suffering, and loss of enjoyment of life [CLIENT NAME] has endured
and will continue to endure, we demand the sum of $350,000 to resolve
this claim.

This demand reflects the conservative end of [CLIENT NAME]'s total
damages, which range from $[DC LOW] to $[DC HIGH]. Comparable New Mexico
outcomes in cases with similar injuries support a resolution in this range.
```

**Weak presentation (avoid):**
```
We believe the case might be worth somewhere around $350,000, though
we understand the defense may see it differently. We are open to
significantly reducing this number.
```

### 5.2 Rounding and Precision

| Demand Range | Rounding Strategy | Example |
|-------------|-------------------|---------|
| Under $50K | Round to nearest $5,000 | $35,000 |
| $50K - $250K | Round to nearest $25,000 | $175,000 |
| $250K - $1M | Round to nearest $50,000 | $450,000 |
| Over $1M | Round to nearest $100,000 | $1,200,000 |

**Precision signals:** Very precise numbers (e.g., $347,821) can signal that the number is calculated and defensible, but may also invite line-item scrutiny. Rounded numbers (e.g., $350,000) signal confidence and room to negotiate. Use rounded numbers for the demand; save precision for the damages breakdown.

---

## Part 6: Mode-Specific Anchoring Adjustments

### 6.1 PRE-SUIT Anchoring

- Demand typically 2-4x the expected settlement value
- Carrier expects negotiation room in pre-suit demands
- Anchor aggressively but credibly; the demand is the first impression

### 6.2 LITIGATION Anchoring

- Can anchor higher than pre-suit because discovery supports the case
- If case has strengthened, demand MUST be higher than pre-suit demand
- Reference pre-judgment interest accrual to justify increase
- Expert reports provide authoritative damages support

### 6.3 TIME-LIMITED Anchoring

- Demand is at POLICY LIMITS (not a strategic anchor -- it is the limits amount)
- Anchoring rationale: damages exceed limits, making limits the "discount"
- No negotiation expected -- carrier either tenders or faces bad faith

### 6.4 POLICY-LIMITS Anchoring

- Same as TIME-LIMITED: demand equals policy limits
- Anchoring emphasis on multiples: "Damages are [X] times the policy limits"
- The anchor is the total damages figure, which frames limits as a bargain

---

## Part 7: Anchoring Quality Checklist

Before finalizing the demand amount:

- [ ] DC SETTLEMENT-EVAL output reviewed and demand number sourced from it
- [ ] Demand amount is specific (not a range)
- [ ] Demand amount is appropriately rounded for the magnitude
- [ ] Anchoring rationale is stated in the demand body
- [ ] Demand is credible given the facts and damages
- [ ] Demand creates a bracket where the midpoint falls near the settlement target
- [ ] Concession pattern has been planned (even if not stated in the demand)
- [ ] Comparable outcomes support the demand level (if DVP available)
- [ ] Specials are accurately totaled (these are verifiable and anchor credibility)
- [ ] Non-economic damages are justified by severity, duration, and impact
- [ ] Demand is high enough that the walk-away is well above the midpoint with expected counter
- [ ] If LITIGATION mode: demand is higher than any prior pre-suit demand (or justified if not)
- [ ] If TIME-LIMITED/POLICY-LIMITS: demand equals confirmed policy limits exactly
- [ ] Pre-judgment interest leverage mentioned (NMSA 56-8-4, 15% per annum)
- [ ] Attorney has approved the demand number `[DECISION REQUIRED]` resolved
