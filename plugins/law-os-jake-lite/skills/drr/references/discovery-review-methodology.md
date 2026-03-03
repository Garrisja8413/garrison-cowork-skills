# Discovery Response Review Methodology — DRR Reference

**Version:** 1.0
**Applies to:** DRR (Discovery Response Reviewer)

## Purpose

DRR orchestrates a multi-skill review of opponent's discovery responses. This
reference defines the review methodology, escalation criteria, and integration
points with downstream skills.

## Review Workflow

### Stage 1 — Discovery Pack Assembly (DPB)
Build a structured discovery pack from the opponent's responses:
- Parse each response by discovery type (ROG, RFA, RFP)
- Extract objections (general and specific)
- Extract substantive answers
- Tag each response with the original request number

### Stage 2 — Objection Analysis (OA-ROG/OA-RFP/OA-RFA)
Analyze every objection for legal validity:
- **Valid objections:** Properly asserted with legal basis, timely, not waived
- **Invalid objections:** Boilerplate, waived, overbroad assertion, no good faith basis
- **Partial objections:** Valid in scope but response still required for non-objectionable portion
- Apply NM discovery standards (Rules 1-026 through 1-037 NMRA)

### Stage 3 — Sufficiency Analysis (DRS)
Analyze the substance of each answer:
- Responsive: Answer directly addresses the question asked
- Evasive: Answer technically responds but omits critical information
- Incomplete: Answer addresses some but not all categories of responsive information
- Non-responsive: Answer does not address the question at all
- Contradictory: Answer conflicts with known facts from CFP

### Stage 4 — Compromise Generation (OCN)
For valid objections, generate compromise proposals:
- Narrowed scope (temporal, geographic, subject matter)
- Protective order framework for sensitive information
- Phased production schedule for voluminous requests
- In camera review proposals for privilege disputes

### Stage 5 — Escalation Assessment
Determine appropriate enforcement action:
- **Good Faith Letter (GFL):** First step for all deficiencies
- **Motion to Compel (MTC):** After failed good faith conferral
- **Sanctions Motion:** For bad faith or repeated non-compliance

## Element Gap Mapping

Cross-reference deficiencies against PCM/PDM to identify:
- Elements with zero supporting evidence after discovery
- Elements where discovery responses contradict existing proof
- Elements requiring supplemental or follow-up discovery

## Output Standards

All DRR outputs must include:
- Request-by-request analysis with objection and sufficiency scores
- Deficiency summary organized by severity (critical, moderate, minor)
- Recommended enforcement action for each deficiency
- PCM/PDM gap analysis showing impact on proof matrix
