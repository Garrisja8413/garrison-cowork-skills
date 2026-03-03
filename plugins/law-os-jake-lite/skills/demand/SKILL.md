---
name: demand
display_name: "Settlement Demand Letter"
description: >-
  Settlement Demand Letter (DEMAND) — Pack-First, Direct-Output drafting skill
  for settlement demand letters and packages. Consumes DC damages output + DVP
  outcomes + SDC posture assessment + CFP evidence to produce BODY-ONLY demand
  letters with Cite Table and Gate Results. Supports pre-suit, litigation,
  time-limited, and policy-limits demand formats. Gap-filler: completes
  the settlement workflow. TRIGGERS: Use this skill whenever the
  user mentions "demand letter", "settlement demand", "DEMAND", "demand
  package", "pre-suit demand", "policy limits demand", "time-limited demand",
  "PLD", "TLD", "demand number", "settlement offer", "demand draft", "demand
  to settle", "demand for payment", "insurance demand", "demand on carrier",
  "settlement package", or wants to draft a demand letter to an
  insurer/defendant to resolve a claim. Also use when user provides DC damages
  output and wants to convert it into a demand. Do NOT use for good faith
  letters (use gfl). Do NOT use for complaint drafting (use complaint) (v1.0)
version: "1.0"
category: correspondence
pack_consumes:
  - DC
  - DVP
  - SDC
  - CFP
  - LPB
pack_produces:
  - BODY-ONLY demand letter
checkpoints: 0
author: "Parnall & Adams"
license: Proprietary
---

## Pack Dependencies
**Consumes:**
- DC
- DVP
- SDC
- CFP
- LPB

# DEMAND (Settlement Demand Letter) — v1.0

## What This Skill Does

Drafts the BODY-ONLY text of a settlement demand letter or demand package that
presents the plaintiff's case for compensation. The demand letter integrates
damages calculations from DC, evidence valuation from DVP, strategic disclosure
posture from SDC, and factual narrative from CFP to produce a persuasive,
attorney-reviewed demand that anchors negotiation at the appropriate level.

This skill is the **critical gap-filler** that completes the settlement workflow:
CFP (facts) + LPB (law) + DC (damages) + DVP (valuation) + SDC (strategy) all
converge here into the demand that initiates or escalates settlement negotiations.

## Architecture: Pack-First, Direct-Output

```
DC (damages output) ────────┐
DVP (valuation pack) ───────┤
SDC (posture assessment) ───┤── DEMAND Skill ──> BODY-ONLY Demand Letter
CFP PACKET (facts) ─────────┤                    + Cite Table + Gates
LPB PACKET (liability) ─────┘
```

The DEMAND skill is a **DRAFTING** skill, not a Builder. It does not modify Packs.
It consumes verified Pack data and produces prose calibrated to the current
disclosure posture set by SDC.

## Hard Rules

1. **Pack-First:** Every factual assertion must trace to a CFP row (Fact# + Pinpoint).
   Every damages figure must trace to a DC output row. Every legal standard must
   trace to an LPB row (LawTag + Pinpoint). No Pack row -> no assertion.
2. **Direct-Output:** SA generates the Word shell (letterhead, date, address block,
   signature block, merge tokens). This skill provides BODY-ONLY text.
3. **BODY-ONLY output:** No letterhead, no date, no address block, no signature.
   Those come from the SA shell.
4. **Cite Table gate:** Every assertion must appear in the Cite Table with
   supporting evidence source.
5. **Never invent:** No invented facts, medical diagnoses, treatment dates,
   damages figures, case citations, policy numbers, or settlement values.
   Missing support -> `CITE NEEDED` or `[VERIFY]`.
6. **Preserve merge tokens exactly.** Never modify or invent merge tokens.
7. **SDC posture compliance:** The demand must conform to the current SDC
   disclosure posture. Do not reveal UNDISCLOSED items unless the SDC REVEAL
   plan authorizes it. Flag any tension as `[DECISION REQUIRED]`.
8. **Damages integrity:** Demand amount must trace to DC SETTLEMENT-EVAL output.
   Never state a demand number without DC support or attorney override.
9. **Professional tone with controlled strength.** Firm, confident, but not
   threatening. The demand may be shown to a mediator or judge.
10. **Token fail-safe:** If extensive, chunk: Part 1 = demand body,
    Part 2 = Cite Table + Gate Results + Next Requests.

## Required Inputs

### Always Required

Provide inside XML boundaries to prevent context bleed:

```xml
<evidence_layer>
[CFP PACKET -- verified facts: injury narrative, medical treatment timeline,
  liability facts, damages facts. Status = DRAFT-READY]
[DC DAMAGES output -- damages categories with Low/Mid/High ranges]
[DC SETTLEMENT-EVAL output -- demand number, walk-away number, anchoring rationale]
</evidence_layer>

<legal_layer>
[LPB PACKET -- liability standards, duty/breach/causation/damages elements,
  comparative fault law, damages caps (if any), pre-judgment interest rules]
[Must be PACK-READY / PackReady=Yes rows only]
</legal_layer>
```

### Optional (Strengthens Demand)

- `<strategic_layer>` -- SDC posture assessment (disclosure status, surprise inventory)
- `<valuation_layer>` -- DVP outcomes pack (comparable verdicts/settlements)
- `<behavioral_layer>` -- AIP profiles (adjuster negotiation style, OC settlement behavior)
- Prior demand (if this is a revised or escalated demand)
- Medical records summary / life care plan
- Expert reports

### If Inputs Are Missing

If no DC output: **"Run the DC skill first (DAMAGES mode + SETTLEMENT-EVAL mode) to establish damages ranges and demand number."**
If no CFP packet: **"Run the CFP skill first (EXTRACT -> ENRICH -> VERIFY -> PACKET) to build the factual foundation."**
If no LPB packet: **"Run the LPB skill to extract liability standards and damages law, then generate a PACKET."**

## Demand Letter Structure

### Section 1: Introduction and Representation

- Identification of client and representation with merge tokens
- Reference to claim number / policy number (from SA or intake)
- Purpose statement: demand for resolution / settlement

### Section 2: Liability Summary

- Concise statement of duty, breach, causation
- Key liability facts from CFP (strongest first)
- Legal standard from LPB with pinpoint citations
- Comparative fault analysis (if applicable)

### Section 3: Injury and Treatment Narrative

- Chronological injury narrative from CFP
- Medical treatment timeline with provider names and dates
- Current condition and prognosis
- Impact on daily life and functioning
- All facts traced to CFP rows

### Section 4: Damages Presentation

- Medical expenses (past) -- amounts billed per DC
- Medical expenses (future) -- life care plan / expert projection
- Lost wages / earning capacity (past and future)
- Pain and suffering / mental anguish
- Loss of enjoyment of life
- Other applicable UJI categories
- Total damages range from DC output

### Section 5: Comparable Outcomes (if DVP available)

- Similar verdicts and settlements from Outcomes Pack
- Jurisdiction-specific comparables emphasized
- Case distinguishing factors noted

### Section 6: Demand Amount and Deadline

- Specific demand amount (from DC SETTLEMENT-EVAL)
- Basis for demand (anchoring rationale)
- Response deadline
- Consequences of non-response (suit filing, escalation)
- Offer to discuss / negotiate in good faith

### Section 7: Enclosures List

- List of supporting documents enclosed with demand package
- Medical records, bills, expert reports, photos, etc.

## Output Contract (Required Order)

1. **BODY-ONLY Demand Letter** (Sections 1-7)
2. **---** (divider)
3. **Cite Table**

| # | Assertion | Evidence (CFP Fact#, DC Row, LPB LawTag + Pinpoint) | Confidence | Notes |
|---|-----------|------------------------------------------------------|------------|-------|

4. **Gate Results**
   - Traceability: [PASS/FAIL] -- all facts from CFP, all damages from DC, all law from LPB
   - Status Gate: [PASS/FAIL] -- all CFP rows DRAFT-READY, all LPB rows PackReady=Yes
   - Damages Integrity: [PASS/FAIL] -- demand amount traces to DC SETTLEMENT-EVAL
   - SDC Posture Compliance: [PASS/FAIL] -- no UNDISCLOSED items revealed without authorization
   - Shepard Gate: [PASS/FAIL] -- all LPB rows Shepardized (or flagged [VERIFY-CITE])
   - Conflicts: [note any]
   - Merge-token integrity: [PASS/FAIL]

5. **Next Requests** -- missing DC output, missing CFP rows, missing DVP comparables,
   missing medical records, missing expert reports

6. **Open Items**
   - `[VERIFY]` items (medical dates, treatment details, damages figures)
   - `[VERIFY-CITE]` items (unverified law)
   - `[DECISION REQUIRED]` items (demand amount approval, disclosure decisions, deadline)

## Modes

| Mode | Input | Output |
|------|-------|--------|
| **PRE-SUIT-DEMAND** | CFP + DC + LPB (no litigation pending) | Full demand package for pre-suit resolution |
| **LITIGATION-DEMAND** | CFP + DC + LPB + litigation status | Demand reflecting litigation posture and discovery |
| **TIME-LIMITED-DEMAND** | CFP + DC + policy limits info | Stowers/time-limited demand with statutory deadline |
| **POLICY-LIMITS-DEMAND** | CFP + DC + policy info | Policy limits demand with bad faith preservation language |

### Mode: PRE-SUIT-DEMAND (default)

Full demand package before suit is filed. Emphasis on presenting the case
persuasively to encourage resolution without litigation. Tone is professional
and collaborative while demonstrating case strength.

### Mode: LITIGATION-DEMAND

Demand issued during active litigation. Can reference discovery obtained,
deposition testimony, expert opinions, and motion outcomes. SDC posture
is critical -- only reveal what the REVEAL plan authorizes.

### Mode: TIME-LIMITED-DEMAND

Creates urgency through a specific statutory or contractual deadline.
Must include precise deadline language, consequences of non-response,
and preservation of bad faith claims. Requires attorney sign-off on
deadline period. Flag `[DECISION REQUIRED]` for deadline selection.

### Mode: POLICY-LIMITS-DEMAND

Demands the full policy limits with language designed to create
potential bad faith exposure for the carrier if they fail to tender.
Must include clear and unconditional terms, reasonable acceptance
period, and documentation of claim value exceeding limits.

## Integration Points

| System | How DEMAND Connects |
|--------|-------------------|
| **DPW** | DEMAND is the Phase 4 drafting engine within the DPW (Demand Phase Workflow) orchestrator. DPW handles readiness, evidence audit, valuation/authority, assembly, and escalation. DPW passes mode, practice-area tactics, and bad faith parameters to DEMAND. When invoked standalone, DEMAND drafts without the full DPW lifecycle. For the complete demand preparation workflow, use DPW instead. |
| **DC** | DEMAND consumes DC DAMAGES output (ranges) and SETTLEMENT-EVAL output (demand number, walk-away, anchoring). DC is the primary damages source. |
| **DVP** | DEMAND consumes DVP Outcomes Pack for comparable verdicts/settlements. Strengthens the demand anchoring. |
| **SDC** | DEMAND respects SDC posture. SDC REVEAL plan authorizes which items to disclose. SDC REDLINE can review draft demand before sending. |
| **CFP** | DEMAND consumes CFP PACKET for all factual narrative. Fact# references in Cite Table. |
| **LPB** | DEMAND consumes LPB PACKET for liability standards and damages law. LawTags cited in Cite Table. |
| **AIP** | Optional: adjuster/OC profiles from AIP calibrate tone and presentation strategy. |
| **SA** | Direct-Output: SA provides letterhead/shell. Save per Save Map: Correspondence -> Settlement Demands. |
| **SETTLEMENT-NEGOTIATOR** | DEMAND output feeds into PB-08 Settlement Negotiator for counter-offer analysis and concession strategy. |

## Reference Files

- `references/mode-pre-suit.md` -- PRE-SUIT-DEMAND mode: pre-suit format, timing, adjuster audience, policy limits
- `references/mode-litigation.md` -- LITIGATION-DEMAND mode: trial leverage, discovery posture, SDC integration
- `references/mode-time-limited.md` -- TIME-LIMITED-DEMAND mode: Stowers/excess exposure, statutory requirements, deadline mechanics
- `references/mode-policy-limits.md` -- POLICY-LIMITS-DEMAND mode: bad faith setup, coverage confirmation, excess exposure analysis
- `references/output-format.md` -- Output contract: BODY-ONLY format, Cite Table format, Gate Results format
- `references/demand-anchoring.md` -- Negotiation anchoring theory, bracketing strategy, concession patterns, demand amount presentation
