# DRO Reference: AUDIT & OPTIMIZE Modes --- Severity Scoring Methodology

## Purpose

Reverse-engineer how insurance carrier severity scoring systems (Colossus,
ClaimIQ, and manual evaluation) will evaluate a plaintiff's claim. Identify
gaps where the claim is under-scoring and produce actionable recommendations
to maximize algorithmic output before the demand is sent.

## Prerequisites

**Required:**
- CFP (case facts, medical records, injury timeline)
- DC (calculated damages ranges)

**Strongly recommended:**
- ICM (carrier identity, policy limits, adjuster info)
- QTB (treatment profile, billing detail, provider list)

## The 400-Point Severity Framework

This framework is reverse-engineered from published research on Colossus
(Computer Sciences Corporation / DXC Technology), ClaimIQ (Mitchell
International), and adjuster training materials disclosed in litigation.

**Disclaimer:** This is an analytical model, not a reproduction of proprietary
software. Actual carrier scoring may vary.

### Domain 1: Injury Severity (120 Points)

| Value Driver | Max Pts | Scoring Criteria | Optimization Tactic |
|-------------|---------|------------------|---------------------|
| **Primary diagnosis severity** | 25 | ICD-10 code hierarchy: fracture > disc herniation > sprain/strain > contusion | Ensure most severe diagnosis is primary; confirm with treating physician |
| **Objective diagnostic findings** | 20 | MRI/CT/EMG positive findings vs. subjective-only complaints | Obtain objective imaging; EMG for radiculopathy; document positive findings in demand |
| **Surgical intervention** | 20 | Surgery performed > surgery recommended > conservative only | If surgery recommended but not performed, get surgical consult letter |
| **Permanence / impairment rating** | 20 | AMA Guides rating > physician narrative permanence > no permanence stated | Obtain impairment rating from qualified physician using AMA Guides methodology |
| **Number of body regions** | 15 | Multiple body regions injured scores higher than single-region | Ensure all injured body regions are documented and coded separately |
| **Pre-existing condition handling** | 10 | Documented aggravation of pre-existing > no pre-existing > undocumented pre-existing | Get clear physician statement: "accident aggravated / accelerated pre-existing condition" |
| **Hospitalization** | 10 | ER + admission > ER only > urgent care > delayed presentation | Document hospital admission if applicable; ER records always included |

### Domain 2: Treatment Profile (80 Points)

| Value Driver | Max Pts | Scoring Criteria | Optimization Tactic |
|-------------|---------|------------------|---------------------|
| **Treatment duration** | 15 | >12 months > 6-12 months > 3-6 months > <3 months | If treatment ongoing, ensure records reflect continued medical necessity |
| **Treatment consistency** | 15 | No gaps > minor gaps explained > unexplained gaps (penalized) | If gaps exist, get physician note explaining reason (COVID, financial hardship, holiday) |
| **Provider credentials** | 12 | MD/DO specialist > MD/DO general > DC/PT > self-directed care | Ensure specialist referrals documented; minimize DC-only treatment chains |
| **Treatment appropriateness** | 12 | Treatment matches diagnosis per clinical guidelines | Verify treatment plan aligns with diagnosis; flag overtreatment risk |
| **Referral chain integrity** | 10 | PCP > specialist > treatment (clean chain) vs. attorney referral (penalized) | Ensure referral chain starts with ER/PCP, not attorney office |
| **Procedure type hierarchy** | 8 | Injection/surgery > physical therapy > chiropractic > medication only | Document all procedure types; emphasize higher-tier interventions |
| **Future treatment need** | 8 | Physician letter of medical necessity for future care > none documented | Obtain letter of medical necessity from treating physician |

### Domain 3: Functional Impact (80 Points)

| Value Driver | Max Pts | Scoring Criteria | Optimization Tactic |
|-------------|---------|------------------|---------------------|
| **ADL limitations** | 20 | Documented specific ADL limitations with duration > vague "difficulty" | Get patient affidavit detailing specific daily activities affected |
| **Work impact** | 20 | Total disability period > partial restrictions > no work impact | Obtain employer verification of missed work; document restrictions |
| **Lifestyle / recreational loss** | 15 | Specific activities lost with pre-injury baseline documented | Detail specific hobbies, sports, activities lost; before/after comparison |
| **Emotional / psychological impact** | 15 | Diagnosed PTSD/anxiety/depression with treatment > self-reported | Obtain mental health treatment records; formal diagnosis scores higher |
| **Household service impact** | 10 | Documented inability to perform specific household tasks | Quantify household services with specificity: mowing, cleaning, childcare |

### Domain 4: Liability Clarity (60 Points)

| Value Driver | Max Pts | Scoring Criteria | Optimization Tactic |
|-------------|---------|------------------|---------------------|
| **Fault clarity** | 20 | Clear single-party fault > shared fault > disputed fault | Police report citations, witness statements establishing clear liability |
| **Comparative negligence risk** | 15 | 0% comp neg > 1-10% > 11-25% > 26-50% (NM pure comparative) | Address comp neg arguments preemptively in demand package |
| **Evidence strength** | 15 | Video/photo + witnesses + report > report only > testimony only | Compile all liability evidence; emphasize objective documentation |
| **Prior claims / litigation history** | 10 | No prior claims > unrelated prior claims > related prior claims (penalized) | If prior claims exist, distinguish clearly; get physician causation opinion |

### Domain 5: Documentation Quality (60 Points)

| Value Driver | Max Pts | Scoring Criteria | Optimization Tactic |
|-------------|---------|------------------|---------------------|
| **Medical record completeness** | 15 | All providers' records obtained > most > significant gaps | Obtain all records; send records request checklist to client |
| **Timeline continuity** | 15 | Gap-free treatment timeline > minor gaps > major gaps | Fill timeline gaps with physician notes or patient diary |
| **Billing documentation** | 10 | Itemized bills from all providers > partial > missing | Obtain itemized billing statements; reconcile with treatment records |
| **Causation documentation** | 10 | Clear physician causation opinion > implied > not addressed | Get explicit causation letter from treating physician |
| **Narrative consistency** | 10 | Consistent account across all records > minor inconsistencies > contradictions | Review all records for inconsistencies before demand; address in demand narrative |

## AUDIT Mode Workflow

### Step 1: Identify the Carrier and Scoring System

| Carrier | Primary System | Notes |
|---------|---------------|-------|
| Allstate | Colossus | Heavily algorithm-driven; adjuster discretion limited |
| State Farm | ClaimIQ | More adjuster discretion than Colossus; relationship-based adjusting |
| GEICO | Internal system | Hybrid approach; regional variation |
| Progressive | Internal system | Data-driven; telematics integration |
| Farmers | Colossus variant | Modified Colossus with Farmers-specific modules |
| USAA | Manual + decision support | More adjuster latitude; military community focus |
| Unknown | Run both models | Report variance between Colossus and ClaimIQ estimates |

### Step 2: Score Each Domain

For each of the 5 domains, score every value driver based on available pack
data. Use three columns:

- **Current Score**: What the claim scores today based on available documentation
- **Max Possible**: Maximum achievable score given case facts (some drivers have hard ceilings)
- **Gap**: Points being left on the table

### Step 3: Gap Analysis and Remediation

For every gap > 0, produce a remediation recommendation:

```
GAP ANALYSIS
| Driver | Current | Max | Gap | Remediation | Priority | Effort |
|--------|---------|-----|-----|-------------|----------|--------|
| Impairment rating | 5/20 | 18/20 | 13 | Obtain AMA Guides impairment rating | HIGH | Physician appointment |
| Treatment gaps | 8/15 | 15/15 | 7 | Get physician note explaining 3-month gap | HIGH | Letter request |
| Future medical | 0/8 | 8/8 | 8 | Obtain letter of medical necessity | HIGH | Physician letter |
```

Priority classification:
- **HIGH**: Gap > 5 points AND remediation is achievable before demand
- **MEDIUM**: Gap > 3 points OR remediation requires moderate effort
- **LOW**: Gap <= 3 points OR remediation requires significant effort/time

### Step 4: Carrier-Specific Calibration

Apply carrier-specific adjustments:

**Colossus carriers (Allstate, Farmers):**
- Weight objective findings +10% (Colossus penalizes subjective-only claims heavily)
- Treatment duration weighted heavily; short treatment = low score
- Pre-existing conditions scrutinized more aggressively
- Referral chain integrity is a flag item (attorney referrals penalized)

**ClaimIQ carriers (State Farm):**
- More weight on functional impact narratives
- Adjuster relationship and presentation quality matter more
- Regional comparable data influences scoring
- Less rigid on referral chain; more on treatment reasonableness

## OPTIMIZE Mode Workflow

### Step 1: Consume AUDIT Output

OPTIMIZE requires a completed AUDIT (or runs AUDIT inline if not yet done).

### Step 2: Coverage Ceiling Analysis

```
COVERAGE ANALYSIS
| Layer | Carrier | Limit | Available | Notes |
|-------|---------|-------|-----------|-------|
| BI - Tortfeasor | [Carrier] | $[X] | $[X] | Primary layer |
| UM/UIM - Client | [Carrier] | $[X] | $[X] | If BI insufficient |
| Umbrella | [Carrier] | $[X] | $[X] | If applicable |
| TOTAL AVAILABLE | | | $[X] | |

DC Grand Total (Mid): $[X]
Coverage Ratio: [X]% of mid-range damages covered
```

### Step 3: Optimized Demand Amount

Produce three demand scenarios:

- **Conservative**: Amount likely within adjuster authority; targets quick resolution
- **Target**: Optimal demand balancing recovery maximization with settlement probability
- **Stretch**: Maximum defensible demand; may require supervisor authority or litigation

Each scenario includes:
- Dollar amount
- Percentage of policy limits
- Severity score justification
- Settlement probability estimate (Low/Medium/High)
- Expected negotiation rounds to resolution

### Step 4: Pre-Demand Documentation Checklist

Before sending the demand, verify:
- [ ] All HIGH-priority gap remediations completed
- [ ] Impairment rating obtained (if applicable)
- [ ] Future medical necessity letter obtained
- [ ] All medical records current (within 60 days)
- [ ] Lost wages verified by employer
- [ ] Causation opinion letter from treating physician
- [ ] Photos / objective evidence compiled
- [ ] Billing reconciled with treatment records

## Chunk Protocol

If the Severity Audit exceeds 30 value drivers:
- **Part 1:** Domain scores + Top 10 gaps + Remediation priorities
- Stop: "Part 1 complete. Reply 'continue' for full driver scorecard + carrier calibration."
- **Part 2:** Complete driver scorecard + carrier-specific notes + OPTIMIZE output
