# DRO Reference: Output Contract --- Format Specifications

## Purpose

Define the exact output format for every DRO deliverable. The DEMAND skill
and Settlement Negotiator consume DRO outputs programmatically --- format
consistency is critical for downstream integration.

## Universal Output Rules

1. **Every DRO output starts with the work product marking:**
   `ATTORNEY WORK PRODUCT --- PRIVILEGED`

2. **Every output includes a mode header block** with structured metadata.

3. **BODY-ONLY optimization text** is always produced alongside the primary
   deliverable. This is what the DEMAND skill consumes.

4. **Quality Gate is mandatory** --- never skip even for partial outputs.

5. **SmartAdvocate Save Notes** appear at the end of every output.

## Severity Audit Report Format (AUDIT Mode)

### Header Block

```
ATTORNEY WORK PRODUCT --- PRIVILEGED

SEVERITY AUDIT REPORT --- [Case Name]
Date: [YYYY-MM-DD]
Analyst Mode: DRO AUDIT
Carrier: [Name] | Scoring System: [Colossus / ClaimIQ / Manual / Unknown]
Policy Limits: $[X] BI per person | $[X] BI per occurrence
Adjuster: [Name] (if known) | Authority Level: [if known]
Packs Consumed: [List of packs used, e.g., CFP v2, DC v1, ICM v1, QTB v1]
```

### Domain Scoring Summary

```
SEVERITY SCORING SUMMARY (400-Point Framework)

| Domain | Current | Max Possible | Gap | Status |
|--------|---------|-------------|-----|--------|
| Injury Severity | [X] | [X] / 120 | [X] | [On Track / Gaps / Critical] |
| Treatment Profile | [X] | [X] / 80 | [X] | [On Track / Gaps / Critical] |
| Functional Impact | [X] | [X] / 80 | [X] | [On Track / Gaps / Critical] |
| Liability Clarity | [X] | [X] / 60 | [X] | [On Track / Gaps / Critical] |
| Documentation Quality | [X] | [X] / 60 | [X] | [On Track / Gaps / Critical] |
| **TOTAL** | **[X]** | **[X] / 400** | **[X]** | |

Carrier Calibration: [Colossus / ClaimIQ] adjustments applied
Confidence Band: [X]-[Y] / 400 (accounting for modeling uncertainty)
```

### Value Driver Scorecard

```
VALUE DRIVER SCORECARD

INJURY SEVERITY (Current: [X] / Max: [X] / 120)
| # | Driver | Current | Max | Gap | Source | Optimization Note |
|---|--------|---------|-----|-----|--------|-------------------|
| 1 | Primary diagnosis severity | [X] | [X]/25 | [X] | [CFP/DC ref] | [Note] |
| 2 | Objective diagnostic findings | [X] | [X]/20 | [X] | [ref] | [Note] |
| ... | ... | ... | ... | ... | ... | ... |

TREATMENT PROFILE (Current: [X] / Max: [X] / 80)
| # | Driver | Current | Max | Gap | Source | Optimization Note |
|---|--------|---------|-----|-----|--------|-------------------|
| ... | ... | ... | ... | ... | ... | ... |

[Repeat for all 5 domains]
```

### Gap Analysis

```
GAP ANALYSIS --- POINTS LEFT ON THE TABLE

Total gap: [X] points ([X]% of maximum achievable)

HIGH PRIORITY (Gap > 5 pts, achievable before demand):
| # | Driver | Gap | Remediation Action | Owner | Deadline | Effort |
|---|--------|-----|-------------------|-------|----------|--------|
| 1 | [Driver] | [X] | [Specific action] | [Attorney/Staff] | [Date] | [Low/Med/High] |
| 2 | [Driver] | [X] | [Specific action] | [Owner] | [Date] | [Effort] |

MEDIUM PRIORITY (Gap 3-5 pts):
| # | Driver | Gap | Remediation Action | Owner | Deadline | Effort |
|---|--------|-----|-------------------|-------|----------|--------|
| ... |

LOW PRIORITY (Gap < 3 pts or high effort):
| # | Driver | Gap | Remediation Action | Owner | Deadline | Effort |
|---|--------|-----|-------------------|-------|----------|--------|
| ... |

ESTIMATED SCORE AFTER REMEDIATION: [X]-[Y] / 400
```

## Optimized Demand Amount Format (OPTIMIZE Mode)

### Header Block

```
ATTORNEY WORK PRODUCT --- PRIVILEGED

DEMAND OPTIMIZATION REPORT --- [Case Name]
Date: [YYYY-MM-DD]
Analyst Mode: DRO OPTIMIZE
Severity Score: [X]-[Y] / 400 (from AUDIT)
DC Range: Low $[X] / Mid $[X] / High $[X]
Policy Limits: $[X] per person
```

### Coverage Ceiling Analysis

```
COVERAGE ANALYSIS

| Layer | Carrier | Type | Limit | Available | Status |
|-------|---------|------|-------|-----------|--------|
| Primary BI | [Carrier] | [Auto/CGL/etc] | $[X] | $[X] | [Confirmed/Estimated] |
| UM/UIM | [Carrier] | [Stacked/Unstacked] | $[X] | $[X] | [Confirmed/Estimated] |
| Umbrella/Excess | [Carrier] | [Type] | $[X] | $[X] | [Confirmed/Estimated] |
| TOTAL AVAILABLE COVERAGE | | | | $[X] | |

DC Mid-Range Total: $[X]
Coverage Ratio: [X]% (coverage / DC mid)
Demand-to-Limits Analysis: [See scenarios below]
```

### Demand Scenarios

```
DEMAND SCENARIOS

| Scenario | Amount | % of Limits | Severity Basis | Settlement Prob | Negotiation Rounds |
|----------|--------|-------------|----------------|-----------------|-------------------|
| Conservative | $[X] | [X]% | Score [X]-[Y] justifies [rationale] | High | 2-3 |
| Target | $[X] | [X]% | Score [X]-[Y] justifies [rationale] | Medium | 3-5 |
| Stretch | $[X] | [X]% | Score [X]-[Y] justifies [rationale] | Low-Medium | 4-7 |

RECOMMENDED SCENARIO: [Target / Conservative / Stretch]
Rationale: [2-3 sentences explaining recommendation]
```

### Pre-Demand Checklist

```
PRE-DEMAND DOCUMENTATION CHECKLIST

HIGH-PRIORITY ITEMS (must complete before sending demand):
- [ ] [Item] --- Status: [Done / In Progress / Not Started]
- [ ] [Item] --- Status: [Status]

RECOMMENDED ITEMS (strengthen demand if completed):
- [ ] [Item] --- Status: [Status]
- [ ] [Item] --- Status: [Status]

Estimated time to demand-ready: [X] days/weeks
```

## Anchoring Strategy Memo Format (ANCHOR Mode)

### Header Block

```
ATTORNEY WORK PRODUCT --- PRIVILEGED

ANCHORING STRATEGY MEMO --- [Case Name]
Date: [YYYY-MM-DD]
Analyst Mode: DRO ANCHOR
Carrier: [Name] | System: [Type] | Limits: $[X]
DC Range: Low $[X] / Mid $[X] / High $[X]
Severity Score: [X]-[Y] / 400
Recommended Demand Scenario: [From OPTIMIZE]
```

### Opening Demand

```
OPENING DEMAND CALCULATION

Base: DC Mid-Range = $[X]
Multiplier: [X.X]x (based on [case strength + severity score + carrier type])
Empirical Basis: [Citation --- e.g., Galinsky & Mussweiler 2001]
Raw calculated: $[X]
Precise adjustment: $[X] (per Mason et al. 2013)
Coverage ceiling check: [Within limits / Exceeds limits --- DECISION REQUIRED]

OPENING DEMAND: $[Precise amount]
```

### Bracket Design

```
BRACKET DESIGN

| Position | Amount | Basis |
|----------|--------|-------|
| Opening Demand | $[X] | [Multiplier rationale] |
| Expected Carrier Counter | $[X] | [Carrier behavior prediction] |
| Midpoint | $[X] | Arithmetic midpoint of opening + expected counter |
| Target | $[X] | DC Mid-to-High adjusted for severity |
| Floor | $[X] | [DECISION REQUIRED --- attorney sets walkaway] |

Midpoint Test: Midpoint ($[X]) vs. Target ($[X]) = [PASS: midpoint >= target / FAIL: adjust opening upward]
```

### Concession Schedule

```
CONCESSION SCHEDULE

| Round | Position | Our Number | Move ($) | Move (%) | Signal to Send | Timing Window |
|-------|----------|-----------|----------|----------|----------------|---------------|
| 1 | Demand | $[X] | --- | --- | "Thoroughly analyzed; supported by evidence" | Day 0 |
| 2 | Counter-1 | $[X] | -$[X] | [X]% | "[Specific signal language]" | Day [X]-[X] |
| 3 | Counter-2 | $[X] | -$[X] | [X]% | "[Specific signal language]" | Day [X]-[X] |
| 4 | Counter-3 | $[X] | -$[X] | [X]% | "[Specific signal language]" | Day [X]-[X] |
| 5 | Final | $[X] | -$[X] | [X]% | "Final position; prepared to litigate" | Day [X] |

Note: Schedule is adaptive. If carrier makes significant moves, accelerate.
If carrier stalls, hold position and escalate per playbook.
```

### Negotiation Playbook

```
NEGOTIATION PLAYBOOK --- IF-THEN RESPONSE MATRIX

| # | Carrier Move | Our Response | Escalation if No Movement |
|---|-------------|-------------|--------------------------|
| 1 | [Scenario] | [Response] | [Escalation path] |
| 2 | [Scenario] | [Response] | [Escalation path] |
| ... |

DEADLINE STRATEGY:
- Type: [TLD / Pre-suit deadline / Discovery deadline / Trial date]
- Details: [Specific deadline structure]
- [DECISION REQUIRED] for time-limited demands
```

## BODY-ONLY Optimization Text (All Modes)

Every mode produces BODY-ONLY text that the DEMAND skill consumes. This is
NOT the demand letter --- it is structured guidance for the DEMAND drafter.

```
DRO OPTIMIZATION TEXT --- FOR DEMAND SKILL CONSUMPTION

CARRIER-SPECIFIC FRAMING NOTES:
- Carrier: [Name] uses [Colossus/ClaimIQ/Manual] scoring
- Emphasize: [List of value drivers to highlight in demand letter]
- De-emphasize: [List of weaknesses to handle carefully]
- Framing: [Specific framing recommendations for this carrier]

VALUE DRIVER EMPHASIS (in priority order for demand letter):
1. [Driver]: [How to present in demand narrative --- specific language guidance]
2. [Driver]: [Presentation guidance]
3. [Driver]: [Presentation guidance]
...

DEMAND AMOUNT JUSTIFICATION POINTS:
- [Point 1 with supporting citation]
- [Point 2 with supporting citation]
- [Point 3 with supporting citation]

ITEMS TO EXCLUDE FROM DEMAND LETTER:
- [Item]: [Reason to exclude --- e.g., weakness that shouldn't be highlighted]
- [Item]: [Reason]

DOCUMENTATION TO ATTACH:
- [ ] [Document type] --- [Purpose in demand package]
- [ ] [Document type] --- [Purpose]
```

## Quality Gate Format (All Modes)

```
QUALITY GATE

| Check | Status | Notes |
|-------|--------|-------|
| Traceability: every number traces to source pack | [PASS/FAIL] | [If FAIL: specify untraced items] |
| Coverage ceiling: demand vs. limits reconciled | [PASS/FAIL] | [Details] |
| Algorithm disclaimer included | [PASS/FAIL] | |
| Work product marking present | [PASS/FAIL] | |
| No invented facts or numbers | [PASS/FAIL] | |
| Carrier correctly identified and calibrated | [PASS/FAIL] | |
| Expert basis cited for negotiation tactics | [PASS/FAIL] | [Citations] |
| Time-limited demand rules followed (if applicable) | [PASS/N-A] | |

OVERALL: [PASS / FAIL --- fix list below]
```

## SmartAdvocate Save Notes Format

```
SA SAVE NOTES
- Category: [Case Valuation / Settlement History / Case Strategy]
- Document Name: [Case Short Name] --- DRO [Mode] Report [Date]
- Notes: [1-line summary of key finding or recommendation]
- Follow-up: [Any tasks to create in SA]
```

## Chunking Rules

### When to Chunk

Chunk output when:
- Severity Audit has all 30+ drivers scored (always chunk in AUDIT)
- ANCHOR mode produces full playbook with 8+ if-then scenarios
- MEDMAL mode produces both audit and narrative sections
- Total output would exceed estimated 3000 words

### Chunk Boundaries

**AUDIT mode:**
- Part 1: Domain scores + Gap Analysis (HIGH priority) + BODY-ONLY text
- Part 2: Full Value Driver Scorecard + Medium/Low gaps + Quality Gate

**OPTIMIZE mode:**
- Part 1: Coverage Analysis + Demand Scenarios + Recommendation
- Part 2: Pre-Demand Checklist + BODY-ONLY text + Quality Gate

**ANCHOR mode:**
- Part 1: Opening Demand + Bracket Design + Concession Schedule
- Part 2: Negotiation Playbook + Deadline Strategy + BODY-ONLY text + Quality Gate

**MEDMAL mode:**
- Part 1: Med-Mal Severity Audit + Gap Analysis
- Part 2: Standard-of-Care Narrative + Negotiation Adjustments + BODY-ONLY text + Quality Gate
