# DRO Reference: MEDMAL Mode --- Medical Malpractice Demand Optimization

## Purpose

Optimize demand strategy for medical malpractice claims, which require
fundamentally different framing than standard personal injury. Med-mal
claims involve standard-of-care analysis, expert-driven valuation, different
carrier behavior, and NM-specific procedural requirements that reshape every
aspect of demand optimization.

MEDMAL mode replaces the standard AUDIT-OPTIMIZE-ANCHOR pipeline with an
integrated analysis tailored to the med-mal context.

## Prerequisites

**Required:**
- CFP (case facts, medical records, standard-of-care evidence)
- DC (calculated damages ranges)
- LPB (med-mal legal authority, NM Medical Malpractice Act if applicable)

**Strongly recommended:**
- Expert reports or opinions (standard-of-care and causation)
- ICM (carrier identity, policy limits --- med-mal carriers differ from auto)
- QTB (treatment records showing injury progression)

**Critical LPB elements for med-mal:**
- NM Medical Malpractice Act (NMSA 41-5-1 et seq.) applicability
- Qualified healthcare provider status
- Patient Compensation Fund (PCF) layer analysis
- Statutory cap provisions and current cap amounts `[VERIFY-CITE]`
- Prelitigation review panel requirements

## Med-Mal Severity Framework (Modified 400-Point Model)

Med-mal claims require a modified severity framework. The standard auto/PI
model over-weights factors that are less relevant in med-mal and under-weights
factors that are critical.

### Modified Domain Weightings

| Domain | Points | Weight | Modification from Standard |
|--------|--------|--------|---------------------------|
| **Standard-of-Care Breach** | 120 | 30% | Replaces "Liability Clarity" (elevated from 60 to 120 pts) |
| **Injury Severity & Causation** | 100 | 25% | Modified: causation is harder in med-mal; weighted higher |
| **Expert Foundation** | 80 | 20% | NEW domain: replaces "Documentation Quality" (experts drive med-mal) |
| **Damages Profile** | 60 | 15% | Reduced: damages are typically higher in med-mal but valuation depends on breach/causation |
| **Procedural Compliance** | 40 | 10% | NEW domain: NM MMA compliance, panel requirements, PCF layer |

### Domain 1: Standard-of-Care Breach (120 Points)

| Value Driver | Max Pts | Scoring Criteria |
|-------------|---------|------------------|
| **Breach clarity** | 30 | Clear deviation from standard > judgment-call deviation > guideline-based only |
| **Departure severity** | 25 | Gross negligence / reckless > clear deviation > borderline |
| **Guideline support** | 20 | Published clinical guidelines violated > peer consensus > expert opinion only |
| **Multiple breaches** | 15 | Multiple discrete breaches > pattern of negligence > single isolated breach |
| **Defensive documentation** | 15 | Records show provider knew of risk and failed to act > no documentation of decision-making > thorough documentation (harder to prove breach) |
| **Informed consent** | 15 | No consent obtained > inadequate consent > consent obtained but flawed risk disclosure |

### Domain 2: Injury Severity & Causation (100 Points)

| Value Driver | Max Pts | Scoring Criteria |
|-------------|---------|------------------|
| **Injury severity** | 25 | Death / catastrophic > permanent disability > temporary disability > prolonged recovery |
| **Causation directness** | 25 | But-for causation clear > substantial contributing factor > loss of chance |
| **Causation documentation** | 20 | Expert causation opinion with records support > expert opinion alone > implied |
| **Injury vs. underlying condition** | 15 | Injury distinct from presenting condition > aggravation of condition > same system as condition |
| **Timing** | 15 | Injury immediately followed breach > delayed manifestation with documentation > delayed with gap |

### Domain 3: Expert Foundation (80 Points)

| Value Driver | Max Pts | Scoring Criteria |
|-------------|---------|------------------|
| **Expert qualifications** | 20 | Same specialty + board-certified + active practice > same specialty only > related specialty |
| **Expert opinion strength** | 20 | "Reasonable degree of medical probability" + specific > general opinion > preliminary |
| **Number of experts** | 15 | Multiple experts (standard + causation + damages) > single expert covering all > no expert yet |
| **Expert availability for trial** | 10 | Expert committed to testify > available > report only |
| **Defense expert vulnerability** | 15 | Known defense expert weaknesses > neutral defense expert landscape > strong defense expert pool |

### Domain 4: Damages Profile (60 Points)

| Value Driver | Max Pts | Scoring Criteria |
|-------------|---------|------------------|
| **Economic damages magnitude** | 20 | $500K+ future care > $100-500K > <$100K |
| **Non-economic damages** | 20 | Death/catastrophic injury > significant permanent > moderate permanent > temporary |
| **Life care plan** | 10 | Formal life care plan by certified planner > physician estimate > no future care estimate |
| **Lost earning capacity** | 10 | Vocational expert opinion > employer records > estimate only |

### Domain 5: Procedural Compliance (40 Points)

| Value Driver | Max Pts | Scoring Criteria |
|-------------|---------|------------------|
| **MMA applicability** | 15 | Outside MMA (no cap) > Inside MMA with PCF exposure > Inside MMA within cap |
| **Panel review status** | 10 | Panel favorable > panel waived/bypassed > panel unfavorable |
| **Statutory compliance** | 10 | All NM MMA requirements met > minor issues > significant procedural risk |
| **SOL / notice compliance** | 5 | Well within statute > approaching deadline > potential SOL issue `[VERIFY]` |

## Standard-of-Care Demand Framing

### Framing Principles

Med-mal demand framing differs from standard PI:

1. **Lead with the breach, not the injury.** In standard PI, you lead with
   damages ("my client suffered X"). In med-mal, lead with what the provider
   did wrong. The breach narrative creates emotional resonance.

2. **Use the provider's own records against them.** Carrier adjusters in
   med-mal look for documentation of decision-making. Gaps in documentation
   suggest the provider did not think through the decision. Highlight these.

3. **Frame as system failure when possible.** Systemic failures (understaffing,
   protocol non-compliance, inadequate supervision) are more compelling than
   individual error and may expose institutional defendants.

4. **Distinguish from adverse outcome.** The demand must clearly articulate:
   "This is not a bad outcome from good care --- this is a bad outcome
   FROM bad care." Failure to make this distinction is the #1 reason
   med-mal demands fail.

5. **Cite clinical guidelines.** Published clinical practice guidelines
   (CPGs) from professional societies (AMA, specialty colleges) are powerful.
   They establish an objective standard the carrier cannot easily dispute.

### Standard-of-Care Narrative Structure

```
STANDARD-OF-CARE ANALYSIS (for DEMAND skill consumption)

1. ACCEPTED STANDARD: What a reasonably competent [specialty] physician
   would have done under similar circumstances
   - Cite: [Clinical guideline / textbook / expert opinion]

2. ACTUAL CONDUCT: What [provider] actually did (or failed to do)
   - Cite: [Medical record reference with date and entry]

3. DEPARTURE: How the actual conduct fell below the standard
   - Cite: [Expert opinion + clinical guideline comparison]

4. CAUSATION: How the departure caused the injury
   - Cite: [Expert causation opinion]

5. INJURY: The resulting harm to the patient
   - Cite: [Medical records documenting injury progression]
```

## Expert Requirements and Integration

### Required Expert Opinions

| Expert Type | Purpose | Minimum Qualification |
|-------------|---------|----------------------|
| **Standard-of-care expert** | Establish the standard and identify breach | Same or similar specialty; board-certified; active practice |
| **Causation expert** | Link breach to injury | Medical degree; expertise in relevant pathology |
| **Damages expert** | Life care plan, lost earnings, future medical | Certified life care planner, vocational expert, economist |

### Expert Opinion Strength Scale

DRO scores expert opinions on a 5-point strength scale:

| Score | Level | Description |
|-------|-------|-------------|
| 5 | **Definitive** | "Within reasonable degree of medical probability, the breach caused the injury" + detailed reasoning |
| 4 | **Strong** | Clear opinion with supporting analysis but some qualifications |
| 3 | **Moderate** | Opinion expressed but hedged ("likely," "probably") |
| 2 | **Preliminary** | Initial assessment; not yet formalized in report |
| 1 | **Absent** | No expert opinion yet; case assessment is speculative |

**Minimum for demand:** Expert strength score of 3+ on both standard-of-care
and causation. Below 3, DRO flags `[EXPERT GAP]` and recommends obtaining
stronger expert opinions before proceeding with demand.

## Med-Mal Carrier Behavior

### How Med-Mal Carriers Differ from Auto Carriers

| Factor | Auto/PI Carrier | Med-Mal Carrier |
|--------|----------------|-----------------|
| **Scoring system** | Colossus/ClaimIQ algorithmic | More manual evaluation; less algorithmic |
| **Adjuster expertise** | General adjusters | Specialized medical claims adjusters |
| **Expert involvement** | Rarely pre-suit | Carrier retains defense experts early |
| **Settlement timing** | Pre-suit settlement common | Rarely settle pre-suit; prefer panel/litigation |
| **Defense strategy** | Cost-based (cost of defense vs. settlement) | Reputation-based (provider reputation, hospital risk) |
| **Authority levels** | Adjuster authority with supervisor override | Committee decisions; higher authority required |

### Med-Mal Negotiation Adjustments

- **Expect longer timelines**: Med-mal negotiations take 2-4x longer than auto
- **Expect lower initial counters**: First counter-offers in med-mal are often
  insulting; do not react emotionally or make large concessions
- **Expert-to-expert dynamic**: Carrier will retain defense expert; our demand
  must be strong enough to survive defense expert criticism
- **Panel leverage**: If NM MMA panel review is favorable, use it aggressively;
  if unfavorable, address it preemptively in demand
- **Institutional defendant dynamics**: Hospitals and health systems have
  different settlement calculus than individual providers (reputation risk,
  board approval, insurance vs. self-insured retention)

## NM Medical Malpractice Act Considerations

**Critical NM-specific factors** (always `[VERIFY-CITE]` current law):

- **Qualified healthcare provider**: Determine if defendant is a "qualified
  healthcare provider" under NMSA 41-5-1 et seq. This determines MMA applicability.
- **Cap**: The MMA cap applies to qualified providers. Current cap amount must
  be verified --- `[VERIFY-CITE]` the current statutory cap.
- **Patient Compensation Fund (PCF)**: Qualified providers pay into the PCF.
  The provider's personal exposure is limited; the PCF covers amounts above
  the provider layer up to the cap. Demand strategy must account for the
  two-layer structure.
- **Non-qualified providers**: If the provider is not qualified under MMA,
  the cap does not apply. This significantly changes demand strategy.
- **Prelitigation panel**: MMA requires (for qualified providers) submission
  to a medical review panel before suit. Panel opinion is admissible but not
  binding. A favorable panel opinion is powerful leverage.

## MEDMAL Mode Output Structure

```
ATTORNEY WORK PRODUCT --- PRIVILEGED

MED-MAL DEMAND OPTIMIZATION --- [Case Name]
Provider: [Name] | Specialty: [X] | Facility: [Name]
Carrier: [Name] | Limits: $[X] | MMA Qualified: [Y/N]
Expert Strength: SOC [X/5] | Causation [X/5]

MED-MAL SEVERITY AUDIT: [X]-[Y] / 400
  Standard-of-Care Breach: [X] / 120
  Injury Severity & Causation: [X] / 100
  Expert Foundation: [X] / 80
  Damages Profile: [X] / 60
  Procedural Compliance: [X] / 40

GAP ANALYSIS: [Top gaps with remediation]

DEMAND RECOMMENDATION:
  Opening demand: $[X]
  Coverage structure: Provider layer $[X] + PCF layer $[X]
  MMA cap analysis: [Within/Exceeds] cap [VERIFY-CITE]

STANDARD-OF-CARE NARRATIVE (for DEMAND skill):
  [Structured breach-causation-injury narrative]

NEGOTIATION ADJUSTMENTS:
  [Med-mal-specific playbook modifications]

QUALITY GATE: [PASS/FAIL]
OPEN ITEMS: [List]
EXPERT GAPS: [List]
```
