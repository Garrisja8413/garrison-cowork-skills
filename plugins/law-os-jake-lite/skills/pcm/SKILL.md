---
name: pcm
display_name: "Proof of Claims Matrix Builder"
description: >-
  Proof of Claims Matrix (PCM) Builder. Combines a Case Fact Pack (CFP) and Law
  Pack (LPB) on Element_ID to produce a strategic gap-analysis matrix showing
  which claim elements are supported, partially supported, or missing proof.
  Identifies evidentiary gaps and prioritizes discovery and investigation needs.
  Feeds Complaint, MSJ, MTC, DRP, and trial preparation skills. TRIGGERS: Use
  this skill when the user mentions "proof of claims", "claims matrix", "PCM",
  "gap analysis", "strategic layer", "map facts to elements", "evidentiary
  gaps", "build pcm", or wants to build a structured matrix of claim elements
  mapped to facts and authority. Do NOT use for defenses (use pdm) (v1.0)
version: "1.0"
category: builder
pack_consumes:
  - CFP
  - LPB
pack_produces:
  - PCM Excel workbook
  - Strategic Layer packet
checkpoints: 2
author: "Parnall & Adams"
license: Proprietary
---

## Pack Dependencies

**Consumes:**
- CFP (case facts mapped to claim elements)
- LPB (legal authority for claim elements)

**Produces:**
- PCM Excel workbook (Proof of Claims Matrix)
- Strategic Layer packet (`<strategic_layer>` XML)

# PCM (Proof of Claims Matrix) Builder — v1.0

## Mission

Build a litigation-ready claims matrix by joining CFP facts to LPB law on
`Element_ID`, then flag proof strengths, missing evidence, and strategic gaps.

## Why PCM Matters

PCM answers the critical pre-drafting question: **Can we prove every element
of every cause of action?** Before drafting a complaint, MSJ, or any motion,
the attorney needs to know which elements have both factual support and legal
authority, which elements have gaps, and where to focus investigation and
discovery.

## Architecture

```
CFP (facts, mapped to claim Element_IDs) ──┐
                                            ├── PCM ──► Claims Matrix
LPB (law, mapped to claim Element_IDs) ────┘           + Strategic Layer
                                                        + Gap Report
                                                            │
                                            ┌───────────────┘
                                            ▼
                                      Complaint (fact allegations)
                                      MSJ (SUMF selection)
                                      MTC (discovery gaps)
                                      DRP (disclosure analysis)
                                      Trial preparation
```

## Inputs

- A CFP workbook with facts tagged to claim Element_IDs
- An LPB workbook with legal authority tagged to claim Element_IDs

## Element_ID Convention

Element_IDs use a structured format to uniquely identify each legal element:

```
Format: {DefenseType}-{Element}

Examples:
- DUTY-001          → Duty of Care (1st element of negligence)
- BREACH-001        → Breach of Duty
- CAUSE-ACTUAL-001  → Actual Causation
- CAUSE-PROX-001    → Proximate Causation
- INJURY-001        → Physical Injury
- DAMAGES-ECON-001  → Economic Damages
```

Multi-element tagging uses pipe delimiter: `DUTY-001|BREACH-001`

## Core Workflow

1. **Validate** both CFP and LPB inputs are present and readable.
2. **Extract** Element_ID values from both packs.
3. **Normalize** Element_ID values (trim spaces, preserve case format).
4. **Join** CFP and LPB rows on Element_ID.
5. **Generate per-element status:**

| Status | Meaning | Strategic Implication |
|--------|---------|----------------------|
| `COVERED` | Fact + authority present, material facts included | Element is provable — ready for drafting |
| `PARTIAL` | Fact + authority present, but no material-level facts | Needs stronger evidence or higher fact classification |
| `LAW-ONLY` | Authority exists, no fact proof | We know the law but lack evidence — target for discovery |
| `FACTS-ONLY` | Facts exist, no legal authority | Facts exist but not connected to legal standard — research needed |
| `UNPROVEN` | No aligned support | Critical gap — element cannot be proven; prioritize immediately |

6. **Produce** output matrix and strategic layer packet.

## Output Requirements

### 1. Claims Matrix (Excel)

**Tab: Claims_Matrix**

| Element_ID | Element_Name | Required_Standard | Supporting_Facts | Fact_Count | Material_Count | Gap_Status | Law_Authorities |
|------------|--------------|-------------------|------------------|------------|----------------|------------|-----------------|

**Tab: Gap_Priority**

| Rank | Element_ID | Element_Name | Gap_Status | Impact | RecommendedAction |
|------|------------|--------------|------------|--------|-------------------|

**Tab: Processing_Log**

| Stage | Timestamp | InputFile | Action | RowsProcessed | SkillVersion | Notes |
|-------|-----------|-----------|--------|---------------|--------------|-------|

### 2. Strategic Layer Packet

```xml
<strategic_layer source="PCM">
  <case_id>[CaseID]</case_id>
  <generated>[timestamp]</generated>
  <claims_summary>
    <total_elements>[N]</total_elements>
    <covered>[N]</covered>
    <partial>[N]</partial>
    <law_only>[N]</law_only>
    <facts_only>[N]</facts_only>
    <unproven>[N]</unproven>
  </claims_summary>
  <elements>
    [Markdown table of all elements with status]
  </elements>
  <priority_gaps>
    [Ranked list of critical gaps with recommended actions]
  </priority_gaps>
</strategic_layer>
```

### 3. Battle Map Summary

After producing the matrix, present the attorney with a Battle Map:

1. **COVERED elements** — ready for drafting
2. **PARTIAL elements** — need stronger evidence
3. **LAW-ONLY elements** — need facts (recommend specific discovery)
4. **FACTS-ONLY elements** — need legal authority (recommend LPB research)
5. **UNPROVEN elements** — critical failures requiring immediate attention

### 4. Gate Results

- Schema Match: [PASS/FAIL] — CFP and LPB schemas compatible
- Element_ID Coverage: [PASS/FAIL] — all claim elements from LPB have CFP mapping attempted
- Gap Classification: [PASS/FAIL] — every element classified
- No Invention: [PASS/FAIL] — no facts or authority fabricated
- Processing Log: [PASS/FAIL] — audit trail complete

### 5. Next Requests

Recommend next steps based on gap analysis:
- For LAW-ONLY gaps: "Build CFP from [specific document type] to support [element]"
- For FACTS-ONLY gaps: "Run LPB to research authority for [element]"
- For UNPROVEN gaps: "Priority investigation needed for [element]"
- When all COVERED: "Ready for drafting — recommend /complaint or /msj"

## Attorney Checkpoints

This skill pauses at two decision points (see `shared/templates/checkpoint-protocol.md`):

**⛔ CHECKPOINT 1: Gap Prioritization** — After building the matrix, before
producing the Battle Map. Present the gap analysis with elements ranked by
severity. Attorney confirms: (a) which gaps to prioritize for investigation,
(b) whether any UNPROVEN elements should be de-prioritized (e.g., alternative
theories the attorney does not intend to pursue), (c) resource allocation
across gaps.

**⛔ CHECKPOINT 2: Strategic Focus** — After the Battle Map, before Next
Requests. Present recommended next actions per gap. Attorney selects which
actions to pursue first and confirms the strategic direction (e.g., "focus
discovery on causation gaps" vs. "build law pack for damages theory").

## Guardrails

- Do not invent facts or authority.
- If Element_IDs are malformed or missing, stop and report exact rows requiring repair.
- If the packs use incompatible schemas, return a schema-mismatch report first.
- Preserve source citations/row references from both packs.
- Keep output deterministic and table-first.

## SSOT Integration: PSR -> PCM (Claims)

The Pleading State Register (PSR) is the single source of truth for all claims
in the case. When a PSR exists, PCM consumes the PSR Claims_Register:

**PSR Claims_Register -> PCM Claims:**
- Each `ClaimType=CLAIM` entry with `Status=ACTIVE` feeds PCM
- `Element_IDs` from PSR provide the authoritative list of claim elements
- `SupportingParagraphs` link to the specific allegations supporting each claim

**PSR Admissions_Map -> PCM Gap Analysis:**
- Admitted facts automatically receive `gap_status=ADMITTED` in PCM
- This is the strongest possible proof status — no evidence gap exists

**The PSR is the authoritative source for WHAT claims exist.**
PCM maps those claims to evidence (CFP) and law (LPB).

## Integration Points

| System | How PCM Connects |
|--------|-----------------|
| **PSR** | PSR Claims_Register provides the authoritative list of claims and elements. Admissions_Map feeds ADMITTED gap_status. |
| **CFP** | PCM reads CFP facts tagged with claim Element_IDs |
| **LPB** | PCM reads LPB legal authority tagged with claim Element_IDs |
| **PDM** | PDM is the defensive counterpart to PCM. Same Element_ID system, different element sets |
| **MPR** | MPR shows which claim elements are being litigated in motions and what rulings affect element status |
| **Complaint** | Complaint reads PCM to know which claim elements have evidentiary support |
| **MSJ** | MSJ reads PCM for SUMF selection (COVERED elements) and argument prioritization |
| **MTC** | MTC reads PCM gaps to justify discovery needs |
| **DRP** | DRP uses PCM for disclosure risk analysis |
| **DC** | Damages Calculator uses PCM for damages element completeness |

## Pack Locations (v1.1)

**Read CFP from:** `cases/{CASE_CODE}/cfp/`
**Read LPB from:** `law-packs/` (global) + `law-packs/law-of-the-case/{CASE_CODE}/` (LOTC overrides)
**Save PCM to:** `cases/{CASE_CODE}/pcm/`

When loading law packs, check for LOTC entries that override global LP on matching legal points. LOTC always controls for that case.

## Reference Files

- `references/build_pcm.md` — Python build script for automated PCM generation (pandas-based relational join on Element_ID)
