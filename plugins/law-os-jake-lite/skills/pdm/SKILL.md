---
name: pdm
display_name: "Proof of Defense Matrix Builder"
description: >-
  Proof of Defense Matrix (PDM) Builder. Parallel to the Proof of Claims
  Matrix (PCM) but for affirmative defenses, counterclaims, and responsive
  defenses. Combines CFP facts and LPB legal authority on Element_ID to
  produce a strategic gap-analysis matrix showing which defense elements are
  supported, partially supported, or missing proof. Identifies defensive proof
  gaps and prioritizes discovery and investigation needs. Feeds DRP (for
  strategic disclosure analysis), GFL, MTC, MSJ, and trial preparation.
  TRIGGERS: Use this skill when the user mentions "proof of defense", "defense
  matrix", "PDM", "defense gap analysis", "defense elements", "affirmative
  defense proof", "defense strategic layer", "map defenses", "defense proof
  gaps", or wants to build a structured matrix of defense elements mapped to
  facts and authority. Do NOT use for claims (use pcm) (v1.0)
version: "1.0"
category: builder
pack_consumes:
  - CFP
  - LPB
  - DPB (optional)
pack_produces:
  - PDM Excel workbook
  - Strategic Defense Layer packet
checkpoints: 2
author: "Parnall & Adams"
license: Proprietary
---

## Pack Dependencies

**Consumes:**
- CFP (case facts mapped to defense elements)
- LPB (defense legal authority)
- DPB (discovery related to defenses — optional)

**Produces:**
- PDM Excel workbook (Proof of Defense Matrix)
- Strategic Defense Layer packet

# PDM (Proof of Defense Matrix) Builder — v1.0

## Mission

Build a litigation-ready defense matrix by joining CFP facts to LPB law on
`Element_ID` for all defense elements, then flag proof strengths, missing
evidence, and strategic gaps — the defensive counterpart to PCM.

## Why PDM Exists Separately From PCM

PCM maps **claims** (what we must prove to win). PDM maps **defenses** (what
the opposing party must prove to succeed on their defenses, or what we must
prove for our affirmative defenses). The analysis is structurally identical
but strategically distinct:

- **PCM gaps** = things we need to find evidence for
- **PDM gaps** = things the opposing party cannot prove (weaknesses to exploit)
  OR things we need evidence for to support our own affirmative defenses

The same CFP fact may appear in both PCM and PDM but serve different strategic
purposes.

## Architecture

```
CFP (facts, mapped to defense Element_IDs) ──┐
                                              ├── PDM ──► Defense Matrix
LPB (defense law, mapped to defense Element_IDs)┘          + Strategic Layer
                                                            + Gap Report
DPB (discovery on defense elements) ── optional ──────────► Discovery Status
                                                                │
                                               ┌────────────────┘
                                               ▼
                                         DRP (disclosure analysis)
                                         GFL / MTC (discovery on defense gaps)
                                         MSJ (defense arguments)
                                         Trial preparation
```

## Inputs

- A CFP workbook with facts tagged to defense Element_IDs
- An LPB workbook with defense legal authority tagged to defense Element_IDs
- Optional: DPB workbook showing discovery status on defense-related requests

## Element_ID Convention for Defenses

Defense Element_IDs follow the same format as PCM but use defense-specific prefixes:

```
Format: {CaseID}-{DefenseType}-{Element}

Examples:
- SMITH-AFF-SOL-1      → Affirmative Defense: Statute of Limitations, Element 1
- SMITH-AFF-COMPNEG-2  → Affirmative Defense: Comparative Negligence, Element 2
- SMITH-AFF-FAIL-MIT-1 → Affirmative Defense: Failure to Mitigate, Element 1
- SMITH-CC-BREACH-3    → Counterclaim: Breach of Contract, Element 3
- SMITH-DEF-DUTY-1     → Responsive Defense: No Duty, Element 1
- SMITH-DEF-CAUSE-2    → Responsive Defense: No Causation, Element 2
```

### Defense Type Prefixes

| Prefix | Type | Description |
|--------|------|-------------|
| `AFF-` | Affirmative Defense | Defense raised by opposing party that must be proven |
| `CC-` | Counterclaim | Claims asserted by opposing party against our client |
| `DEF-` | Responsive Defense | Direct denials or attacks on plaintiff's prima facie case |
| `XC-` | Cross-Claim | Claims between co-parties |
| `TP-` | Third-Party Claim | Claims against third-party defendants |

## Core Workflow

1. **Validate** both CFP and LPB inputs are present and readable.
2. **Extract defense Element_IDs** from both packs.
3. **Normalize** Element_ID values (trim spaces, preserve case format).
4. **Join** CFP and LPB rows on Element_ID.
5. **Generate per-element status:**

| Status | Meaning | Strategic Implication |
|--------|---------|----------------------|
| `SUPPORTED` | Fact + authority present | If their defense: they can prove this element — prepare rebuttal. If our AFF defense: we can prove this element. |
| `LAW-ONLY` | Authority exists, no fact proof | If their defense: they have law but no facts — attack at MSJ. If our AFF defense: find supporting facts urgently. |
| `FACTS-ONLY` | Facts exist, no legal authority | If their defense: facts exist but may not be legally sufficient — attack legal theory. If our AFF defense: research legal authority. |
| `MISSING` | No aligned support | If their defense: element is unproven — strongest MSJ target. If our AFF defense: critical gap — prioritize. |
| `DISPUTED` | Conflicting evidence on this element | Prepare for contested hearing/trial; gather corroboration. |
| `CONCEDED` | Element not contested by either side | Remove from active dispute matrix. |

6. **Produce** output matrix and strategic defense layer packet.

## Output Requirements

### 1. Defense Matrix (Excel)

**Tab: Defense_Elements**

| Element_ID | DefenseType | ElementName | ElementText | Status | CFP_FactRefs | LPB_LawTags | DiscoveryStatus | GapSeverity | RecommendedAction | Notes |
|------------|-------------|-------------|-------------|--------|-------------|-------------|-----------------|-------------|-------------------|-------|

**Tab: Defense_Summary**

| DefenseType | Defense | TotalElements | Supported | LawOnly | FactsOnly | Missing | Disputed | OverallStrength |
|-------------|---------|---------------|-----------|---------|-----------|---------|----------|-----------------|

**Tab: Gap_Priority**

| Rank | Element_ID | Status | GapSeverity | Impact | RecommendedAction |
|------|------------|--------|-------------|--------|-------------------|

**Tab: Processing_Log**

| Stage | Timestamp | InputFile | Action | RowsProcessed | SkillVersion | Notes |
|-------|-----------|-----------|--------|---------------|--------------|-------|

### 2. Strategic Defense Layer

```xml
<strategic_defense_layer>
  <case_id>[CaseID]</case_id>
  <generated>[timestamp]</generated>
  <defense_summary>
    <total_defenses>[N]</total_defenses>
    <total_elements>[N]</total_elements>
    <supported>[N]</supported>
    <gaps>[N]</gaps>
    <overall_assessment>[narrative]</overall_assessment>
  </defense_summary>
  <defenses>
    <defense type="[AFF/DEF/CC]" name="[DefenseName]">
      <element id="[Element_ID]" status="[STATUS]">
        <fact_support>[CFP references]</fact_support>
        <law_support>[LPB references]</law_support>
        <gap_analysis>[if applicable]</gap_analysis>
        <recommended_action>[action]</recommended_action>
      </element>
    </defense>
  </defenses>
  <priority_gaps>
    [Ranked list of critical gaps]
  </priority_gaps>
</strategic_defense_layer>
```

### 3. Gate Results

- Schema Match: [PASS/FAIL] — CFP and LPB schemas compatible
- Element_ID Coverage: [PASS/FAIL] — all defense elements from LPB have CFP mapping attempted
- Gap Classification: [PASS/FAIL] — every element classified
- No Invention: [PASS/FAIL] — no facts or authority fabricated
- Processing Log: [PASS/FAIL] — audit trail complete

### 4. Next Requests

Recommend next steps based on gap analysis:
- For their weak defenses (MISSING/LAW-ONLY): "Consider MSJ to defeat [defense]"
- For our weak affirmative defenses: "Build CFP/LPB to support [defense]"
- For DISPUTED elements: "Prepare for contested hearing; gather corroboration"
- When defense picture is complete: "Ready for MSJ planning or trial prep"

## Attorney Checkpoints

This skill pauses at two decision points (see `shared/templates/checkpoint-protocol.md`):

**⛔ CHECKPOINT 1: Defense Classification** — After loading packs, before
building the matrix. Present: (a) identified defenses and their types
(AFF/DEF/CC), (b) for each defense, whether it is "theirs" (to undermine) or
"ours" (to support). Attorney confirms classification — this drives the entire
strategic analysis (opposite implications for gaps).

**⛔ CHECKPOINT 2: Gap Prioritization & Strategy** — After building the
matrix, before Next Requests. Present: (a) their weakest defenses (MSJ
targets), (b) our weakest affirmative defenses (investigation priorities),
(c) contested elements requiring corroboration. Attorney confirms which
gaps to pursue and overall defensive strategy.

## Guardrails

- Do not invent facts or authority.
- If Element_IDs are malformed or missing, stop and report exact rows requiring repair.
- If the packs use incompatible schemas, return a schema-mismatch report first.
- Defense elements must come from the actual pleadings — do not invent defenses.
- Clearly distinguish between "their defenses" (which we want to undermine) and
  "our affirmative defenses" (which we need to support). The strategic implications
  are opposite.

## SSOT Integration: PSR -> PDM (Defenses)

The Pleading State Register (PSR) is the single source of truth for all
affirmative defenses, counterclaims, and cross-claims in the case. When a
PSR exists, PDM consumes the PSR Affirmative_Defenses and Claims_Register:

**PSR Affirmative_Defenses -> PDM Defense Elements:**
- Each defense with `Element_ID` tags feeds PDM
- `DefenseType` classification drives PDM Defense_Summary
- `DefectFlag` from PSR informs PDM strategic analysis
- `TargetClaims` shows which of our claims each defense attacks

**PSR Claims_Register (counterclaims/cross-claims) -> PDM:**
- `ClaimType=COUNTERCLAIM` entries feed PDM as claims we must defend against
- `ClaimType=CROSS-CLAIM` entries feed PDM where our client is a target

**The PSR is the authoritative source for WHAT defenses exist and who asserted them.**
PDM maps those defenses to evidence (CFP) and law (LPB).

## Integration Points

| System | How PDM Connects |
|--------|-----------------|
| **PSR** | PSR Affirmative_Defenses provides the authoritative list of defenses and elements. PSR Claims_Register provides counterclaims/cross-claims to defend. |
| **CFP** | PDM reads CFP facts tagged with defense Element_IDs. Same fact may appear in both PCM and PDM. |
| **LPB** | PDM reads LPB defense authority. Same authority may appear in both PCM and PDM. |
| **DPB** | PDM shows which defense elements are blocked by outstanding discovery. |
| **PCM** | PDM is the defensive counterpart to PCM. Same Element_ID system, different element sets. |
| **MPR** | MPR shows which defense elements are being litigated in motions and what rulings affect defense status. |
| **DRP** | DRP uses PDM for disclosure risk analysis — what does disclosing a fact do to defense elements? |
| **GFL/MTC** | PDM gaps on "our" defenses drive discovery needs → GFL/MTC on defense-related requests. |
| **MSJ** | PDM "their defense" gaps (MISSING, LAW-ONLY) = MSJ targets for defeating defenses. |
| **ADR** | Answer Diagnostic uses PDM to evaluate strength of asserted defenses. ADR now consumes PSR as structured input. |

## Pack Locations (v1.1)

**Read CFP from:** `cases/{CASE_CODE}/cfp/`
**Read LPB from:** `law-packs/` (global) + `law-packs/law-of-the-case/{CASE_CODE}/` (LOTC overrides)
**Read DPB from:** `cases/{CASE_CODE}/dpb/` (optional)
**Save PDM to:** `cases/{CASE_CODE}/pdm/`

When loading law packs, check for LOTC entries that override global LP on matching legal points. LOTC always controls for that case.
