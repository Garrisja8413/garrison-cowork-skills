---
name: dro
display_name: "Demand Recovery Optimizer"
description: >-
  Demand Recovery Optimizer (DRO) — reverse-engineers insurance carrier
  severity scoring algorithms (Colossus, ClaimIQ) and applies empirical
  negotiation science to optimize demand amounts and strategy. 4 modes: AUDIT
  (reverse-engineer carrier severity scoring), OPTIMIZE (maximize demand
  within coverage), ANCHOR (determine optimal opening demand with negotiation
  science), MEDMAL (specialized med-mal demand optimization). Consumes CFP,
  LPB, DC, ICM, LTB, PCM, QTB, DPB, DVP, SDC packs. Produces BODY-ONLY demand
  optimization text, Severity Audit Report, Anchoring Strategy Memo, and
  Negotiation Playbook. TRIGGERS: "demand optimization", "DRO", "Colossus",
  "ClaimIQ", "severity scoring", "anchoring", "opening demand", "demand
  strategy", "carrier algorithm", "demand amount", "negotiation strategy",
  "bracketing", "concession pattern", "med-mal demand", "time-limited demand".
  Not for drafting the demand letter (use DEMAND skill downstream) (v1.0)
version: "1.0"
category: analysis
pack_consumes:
  - CFP
  - LPB
  - DC
  - DVP
  - PCM
  - DPB
  - SDC
pack_produces:
  - Severity Audit Report
  - Anchoring Strategy Memo
  - Negotiation Playbook
checkpoints: 0
author: "Parnall & Adams"
license: Proprietary
---

## Pack Dependencies
**Consumes:**
- cfp
- lpb
- dc
- icm
- ltb
- pcm
- qtb
- dpb
- dvp
- sdc

# DRO (Demand Recovery Optimizer) --- v1.0

## Purpose

Maximize plaintiff recovery by reverse-engineering insurance carrier severity
scoring algorithms (Colossus, ClaimIQ) and applying empirical negotiation science
to demand strategy. DRO is an **analysis skill** that operates upstream of the
DEMAND drafting skill. It determines **what to demand and why** --- DEMAND then
drafts **how to say it**.

DRO solves a specific problem: insurance carriers use algorithmic severity scoring
systems that reduce claims to numerical inputs. By understanding what those systems
value (and penalize), DRO ensures the demand package feeds the algorithm the inputs
that maximize the output --- then layers negotiation science on top to determine
the optimal opening number, concession strategy, and timing.

## Architecture: Carrier Algorithm Reverse-Engineering + Negotiation Science

```
CFP (facts) ────────────┐
LPB (law/liability) ────┤
DC (damages calc) ──────┤
ICM (insurance coverage) ┤
LTB (lien/billing) ─────┤── DRO Skill ──► Severity Audit Report
PCM (proof matrix) ─────┤                  Optimized Demand Amount
QTB (treatment/billing) ┤                  Anchoring Strategy Memo
DPB (discovery) ────────┤                  Negotiation Playbook
DVP (damages valuation) ┤                  BODY-ONLY optimization text
SDC (strategy) ─────────┘
```

DRO does NOT draft the demand letter. DRO produces structured optimization
analysis that the DEMAND skill consumes to draft the letter. Think of DRO
as the strategist and DEMAND as the scribe.

**Pipeline position:**
```
DC (calculate damages) --> DRO (optimize demand strategy) --> DEMAND (draft letter)
```

## Modes

| Mode | Goal | Key Output | Reference |
|------|------|------------|-----------|
| **AUDIT** | Reverse-engineer how the carrier's severity scoring system will evaluate this claim | Severity Audit Report: 400-point framework scoring, value driver analysis, gap identification | `references/audit-methodology.md` |
| **OPTIMIZE** | Maximize the demand amount within policy limits and case reality | Optimized Demand Amount with carrier-specific justification, coverage-aware ceiling analysis | `references/audit-methodology.md` |
| **ANCHOR** | Determine the optimal opening demand using empirical negotiation science | Anchoring Strategy Memo: opening number, bracket design, concession schedule, deadline strategy | `references/anchoring-strategy.md` |
| **MEDMAL** | Specialized demand optimization for medical malpractice claims | Med-Mal Demand Package: standard-of-care framing, expert-driven valuation, carrier-specific positioning | `references/medmal-mode.md` |

Default mode is **AUDIT** unless the user specifies otherwise.

**Typical workflow:** Run AUDIT first (understand the scoring landscape), then
OPTIMIZE (determine the number), then ANCHOR (determine the strategy). MEDMAL
replaces all three for med-mal cases.

## Hard Rules

1. **Analysis only --- never draft.** DRO produces analytical outputs (reports,
   memos, playbooks). It does NOT produce demand letter prose. If the user asks
   DRO to draft a demand letter, route to DEMAND with DRO outputs attached.

2. **Never invent facts, numbers, or medical data.** All factual inputs must
   trace to CFP, DC, DVP, QTB, or source documents. Missing data points are
   flagged `[DATA GAP]` with specific instructions on what is needed. Never
   fabricate treatment dates, billing amounts, diagnoses, or prognoses.

3. **Never state carrier algorithm internals as fact.** Colossus and ClaimIQ
   are proprietary. DRO's 400-point framework is a **reverse-engineered model
   based on published research, adjuster testimony, and empirical claims data**.
   All scoring analysis must be prefaced: "Based on published research and
   empirical modeling of carrier severity systems..."

4. **Pack-First discipline.** DRO requires at minimum CFP + DC to operate. If
   packs are missing, route user to the appropriate builder skill before
   proceeding. ICM (insurance coverage) is strongly recommended --- without it,
   coverage ceiling analysis is limited.

5. **Coverage ceiling is inviolable.** Never recommend a demand amount that
   exceeds confirmed policy limits without explicit attorney authorization
   and documented bad-faith / excess-exposure strategy. Flag as
   `[DECISION REQUIRED]` if demand must exceed limits.

6. **Medical billed = amounts billed (firm rule).** Consistent with DC: medical
   expense inputs use amounts billed / gross charges, not paid or adjusted
   amounts, unless explicitly instructed otherwise.

7. **Severity scores are decision-support, not guarantees.** Every Severity
   Audit Report must include the disclaimer: "Severity scoring is analytical
   modeling for decision-support. Actual carrier valuations may differ based
   on adjuster discretion, regional factors, and proprietary algorithm updates."

8. **Negotiation science citations required.** Anchoring recommendations must
   cite empirical basis (Kahneman & Tversky, Galinsky & Mussweiler, Malhotra &
   Bazerman, or firm outcomes data). No unsourced negotiation tactics.

9. **Time-limited demand rules.** If recommending a time-limited demand: (a)
   confirm statutory/case-law basis for enforceability in NM, (b) specify
   minimum reasonable response period, (c) flag ethical constraints per NMRA
   16-301 et seq. Always `[DECISION REQUIRED]` for time-limited demands.

10. **Confidentiality and work product.** DRO outputs are attorney work product.
    Never include in outputs intended for opposing counsel. Severity Audit Reports
    and Negotiation Playbooks must be marked "ATTORNEY WORK PRODUCT --- PRIVILEGED."

11. **Carrier-specific calibration.** Do not apply generic scoring to all
    carriers. Colossus-based carriers (e.g., Allstate) and ClaimIQ-based carriers
    (e.g., State Farm) use different value-driver weightings. Identify the
    specific carrier and calibrate analysis accordingly. If carrier system is
    unknown, run both models and note the variance.

12. **No phantom precision.** Do not report severity scores to decimal places or
    imply false precision. Use ranges and confidence bands. Report scores as
    ranges (e.g., "320-355 of 400") not point values.

## Colossus / ClaimIQ Value Driver Reference (400-Point Framework)

DRO uses a 400-point reverse-engineered severity framework based on published
research into carrier algorithmic scoring. The framework captures 30+ value
drivers across 5 domains.

### Domain Weightings

| Domain | Points | Weight | Description |
|--------|--------|--------|-------------|
| **Injury Severity** | 120 | 30% | Diagnosis severity, treatment intensity, permanence |
| **Treatment Profile** | 80 | 20% | Duration, consistency, type appropriateness, provider credentials |
| **Functional Impact** | 80 | 20% | ADL limitations, work impact, lifestyle changes |
| **Liability Clarity** | 60 | 15% | Fault allocation, comparative negligence risk, evidence strength |
| **Documentation Quality** | 60 | 15% | Medical record consistency, gap-free timeline, objective findings |

### Key Value Drivers (30+)

See `references/audit-methodology.md` for the complete 30+ value driver
breakdown with scoring criteria, carrier-specific weightings, and optimization
tactics for each driver.

**High-impact drivers (move the needle most):**
- Objective diagnostic findings (MRI, CT, EMG vs. subjective complaints only)
- Surgical intervention or recommendation
- Treatment duration > 12 months
- Permanent impairment rating (AMA Guides)
- Lost wages with employer verification
- Pre-existing condition documentation (distinguish aggravation)
- Consistent treatment narrative (no unexplained gaps)
- Provider credentials (MD/DO specialist vs. DC-only)
- Liability clarity (police report, witness statements, citations)
- Future medical need with physician letter of medical necessity

## Required Inputs

### Always Required

```xml
<evidence_layer>
  <!-- CFP: Case facts, timeline, medical records, liability evidence -->
  <cfp_packet status="required">
    Facts, quotes, timeline, medical summaries from source documents
  </cfp_packet>
</evidence_layer>

<damages_layer>
  <!-- DC: Calculated damages ranges by category -->
  <dc_output status="required">
    Damages calculation table with Low/Mid/High ranges
    Economic subtotals, non-economic subtotals, grand total
  </dc_output>
</damages_layer>
```

### Strongly Recommended

```xml
<insurance_layer>
  <!-- ICM: Insurance coverage details -->
  <icm_data status="strongly_recommended">
    Carrier name, policy limits (BI per person, per occurrence, UM/UIM)
    Carrier severity system (Colossus, ClaimIQ, manual, or unknown)
    Adjuster name and authority level (if known)
  </icm_data>
</insurance_layer>

<treatment_layer>
  <!-- QTB: Treatment and billing detail -->
  <qtb_data status="strongly_recommended">
    Provider list, treatment timeline, billing summary
    Procedure codes, diagnosis codes, referral chain
  </qtb_data>
</treatment_layer>

<legal_layer>
  <!-- LPB: Legal authority for liability and damages -->
  <lpb_packet status="recommended">
    Liability theories, comparative fault analysis
    Damages law (caps, multipliers, statutory enhancements)
  </lpb_packet>
</legal_layer>

<strategy_layer>
  <!-- SDC: Disclosure posture and leverage inventory -->
  <sdc_data status="recommended">
    Surprise inventory, disclosure posture
    Information advantage assessment
  </sdc_data>
</strategy_layer>

<proof_layer>
  <!-- PCM: Proof matrix gap analysis -->
  <pcm_data status="recommended">
    Element coverage status, proof gaps
    Evidence strength assessment
  </pcm_data>
</proof_layer>
```

### Optional (Strengthens Output)

- **LTB** --- Lien and billing data for net-to-client analysis
- **DPB** --- Discovery state (what has been exchanged, outstanding requests)
- **DVP** --- Damages valuation pack with detailed economic modeling

### If Inputs Are Missing

| Missing Pack | Impact | Route To |
|-------------|--------|----------|
| CFP | Cannot operate | "Run CFP builder first --- I need case facts before analyzing demand strategy." |
| DC | Cannot operate | "Run DC DAMAGES mode first --- I need calculated damages ranges." |
| ICM | Coverage ceiling unknown; will model multiple limit scenarios | ICM builder (if available) or ask user for policy limits |
| QTB | Treatment profile scoring degraded; will flag gaps | QTB builder or ask user for treatment summary |
| LPB | Liability scoring limited to CFP facts only | LPB builder |
| SDC | No leverage/disclosure overlay | SDC AUDIT mode |
| PCM | No proof gap analysis | PCM builder |

## Carrier Algorithm Interaction Model

### How Carriers Score Claims (Simplified)

```
                    ADJUSTER INPUTS
                         |
                         v
    ┌──────────────────────────────────┐
    │     SEVERITY SCORING ENGINE      │
    │  (Colossus / ClaimIQ / Manual)   │
    │                                  │
    │  Injury Code ──► Base Value      │
    │  + Treatment Profile Modifiers   │
    │  + Liability Allocation          │
    │  + Duration / Permanence Boost   │
    │  + Regional Multiplier           │
    │  = ALGORITHMIC RANGE             │
    │                                  │
    │  Adjuster: ±15% discretion       │
    └──────────────────────────────────┘
                         |
                         v
              CARRIER SETTLEMENT RANGE
         (authority granted to adjuster)
```

### DRO Counter-Strategy

```
    ┌──────────────────────────────────┐
    │        DRO OPTIMIZATION          │
    │                                  │
    │  1. AUDIT: Score claim through   │
    │     reverse-engineered framework │
    │  2. IDENTIFY: Gaps where we're   │
    │     leaving points on the table  │
    │  3. OPTIMIZE: Maximize inputs    │
    │     the algorithm values most    │
    │  4. ANCHOR: Set opening demand   │
    │     using negotiation science    │
    │  5. PLAYBOOK: Design concession  │
    │     pattern to reach target      │
    └──────────────────────────────────┘
```

## Output Contract

### For All Modes

Every DRO output includes these sections in order:

1. **Mode Header** --- Mode name, carrier identified, packs consumed
2. **Primary Deliverable** --- Mode-specific output (see below)
3. **BODY-ONLY Optimization Text** --- Structured text that DEMAND skill
   consumes for letter drafting (key talking points, value driver emphasis
   recommendations, carrier-specific framing notes)
4. **Quality Gate**
   - Traceability: Every number traces to DC/CFP/QTB source `[PASS/FAIL]`
   - Coverage check: Demand vs. policy limits reconciled `[PASS/FAIL]`
   - Algorithm disclaimer included `[PASS/FAIL]`
   - Work product marking present `[PASS/FAIL]`
5. **Decision Gates** --- All `[DECISION REQUIRED]` items
6. **Open Items** --- `[VERIFY]`, `[DATA GAP]`, research needs
7. **SmartAdvocate Save Notes** --- Case Notes category and naming

### Mode-Specific Primary Deliverables

**AUDIT mode:**
- Severity Audit Report (400-point framework scoring by domain)
- Value Driver Scorecard (30+ drivers with current score and max possible)
- Gap Analysis (points being left on the table + remediation plan)

**OPTIMIZE mode:**
- Optimized Demand Amount (with Low/Target/Stretch ranges)
- Coverage Ceiling Analysis (demand vs. limits reconciliation)
- Carrier-Specific Value Maximization Checklist
- Pre-Demand Documentation Checklist

**ANCHOR mode:**
- Anchoring Strategy Memo (opening number with empirical justification)
- Bracket Design (opening, target, floor with rationale)
- Concession Schedule (move-by-move pattern with timing)
- Deadline / Time-Pressure Strategy
- Negotiation Playbook (if-then response matrix)

**MEDMAL mode:**
- Med-Mal Severity Audit (modified framework for med-mal)
- Standard-of-Care Demand Framing
- Expert-Driven Valuation Overlay
- Carrier-Specific Med-Mal Positioning

### Token Fail-Safe

If output is extensive:
- **Part 1:** Primary deliverable (Audit Report or Strategy Memo)
- Stop: "Part 1 complete. Reply 'continue' for optimization text + Playbook + Quality Gate."
- **Part 2:** BODY-ONLY text + remaining deliverables + Quality Gate + Open Items

## Integration Points

| System | How DRO Connects |
|--------|-----------------|
| **CFP** | DRO reads CFP for injury facts, medical timeline, liability evidence, witness statements. Required input. |
| **DC** | DRO reads DC DAMAGES output for calculated ranges. DC provides the raw numbers; DRO optimizes them for demand strategy. Required input. |
| **ICM** | DRO reads ICM for carrier identity, policy limits, adjuster info. Determines which scoring model to apply and coverage ceiling. Strongly recommended. |
| **QTB** | DRO reads QTB for treatment profile scoring --- duration, consistency, provider types, gaps. Strongly recommended. |
| **LPB** | DRO reads LPB for liability strength, comparative fault risk, damages law. Recommended. |
| **PCM** | DRO reads PCM for proof gaps that affect severity scoring. Recommended. |
| **SDC** | DRO reads SDC surprise inventory and disclosure posture for leverage assessment in ANCHOR mode. Recommended. |
| **DVP** | DRO reads DVP for detailed economic modeling (life care plans, earning capacity). Optional. |
| **DPB** | DRO reads DPB for discovery state --- what the carrier already knows affects anchoring strategy. Optional. |
| **LTB** | DRO reads LTB for lien data affecting net-to-client analysis. Optional. |
| **DEMAND** | DRO feeds INTO DEMAND. DRO produces optimization analysis and BODY-ONLY text; DEMAND consumes it to draft the actual letter. DRO is upstream; DEMAND is downstream. |
| **Settlement Negotiator** | DRO Negotiation Playbook feeds into Settlement Negotiator for ongoing negotiation management post-demand. |
| **SA** | Save per Save Map. Severity Audit --> Case Valuation. Anchoring Strategy --> Settlement History. Negotiation Playbook --> Case Strategy. |

## Reference Files

Read only the reference needed for the active mode:

- `references/audit-methodology.md` --- AUDIT and OPTIMIZE mode: severity scoring framework, 400-point model, value driver analysis, carrier-specific calibration
- `references/anchoring-strategy.md` --- ANCHOR mode: negotiation science, bracketing, concession patterns, deadline leverage, empirical research basis
- `references/medmal-mode.md` --- MEDMAL mode: med-mal demand specialization, standard-of-care framing, expert requirements, carrier positioning
- `references/output-format.md` --- Output contract details: Severity Audit Report format, Anchoring Strategy Memo format, Negotiation Playbook format, BODY-ONLY text structure
