---
name: depo-impeach
display_name: "Deposition Impeachment Tracker"
description: >-
  Deposition Impeachment Tracker (DEPO-IMPEACH) — analysis skill that
  identifies impeachment opportunities by comparing deposition testimony
  against prior statements, discovery responses, documents, and other witness
  testimony. Consumes DEPO-INDEX output, DPB prior discovery responses, and
  CFP facts to produce contradiction tables, impeachment strategies, and prior
  inconsistent statement indexes for trial preparation. TRIGGERS: Use this
  skill whenever the user mentions "impeachment", "DEPO-IMPEACH", "impeach
  witness", "prior inconsistent statement", "contradiction", "inconsistency",
  "deposition contradiction", "impeachment tracker", "witness impeachment",
  "prior statement", "inconsistent testimony", "witness credibility",
  "credibility attack", "PIS" (prior inconsistent statement), or wants to find
  contradictions between testimony and prior statements. Do NOT use for
  deposition indexing (use depo-index first). Do NOT use for deposition
  preparation (use depo-outline) (v1.0)
version: "1.0"
category: deposition
pack_consumes:
  - CFP
  - DPB
pack_produces:
  - Impeachment analysis
checkpoints: 0
author: "Parnall & Adams"
license: Proprietary
---

## Pack Dependencies
**Consumes:**
- CFP
- DPB

# DEPO-IMPEACH (Deposition Impeachment Tracker) — v1.0

## What This Skill Does

Identifies impeachment opportunities by systematically comparing deposition
testimony against prior inconsistent statements from discovery responses,
other depositions, documents, and public records. Produces a structured
contradiction table with impeachment strategies, foundation requirements,
and trial presentation recommendations.

This skill runs **after** DEPO-INDEX has indexed the transcript. It takes
the indexed testimony and performs the comparison analysis that DEPO-INDEX
flags but does not fully develop.

## Architecture: Comparison Engine

```
DEPO-INDEX output ───────────────┐
DPB (prior discovery responses) ──┤── DEPO-IMPEACH ──> Contradiction Table
CFP PACKET (facts + documents) ───┤    Skill           Impeachment Strategy
Prior DEPO-INDEX outputs ─────────┤                    Foundation Checklist
Documents in evidence ────────────┘                    Trial Presentation Plan
```

DEPO-IMPEACH is an **ANALYSIS** skill. It produces structured impeachment
analysis that feeds into DEPO-OUTLINE (for future depositions), CLOSING-ARGUMENT
(for trial), and MURDER-BOARD (for vulnerability assessment).

## Hard Rules

1. **Source fidelity:** Every prior inconsistent statement must be quoted
   verbatim with exact source citation (page:line for transcripts, SetID/ReqNum
   for discovery, Bates for documents). No paraphrasing prior statements.
2. **Testimony fidelity:** Every deposition statement must be quoted verbatim
   with page:line citation from the DEPO-INDEX. No paraphrasing testimony.
3. **Never invent:** No invented prior statements, testimony, document contents,
   or contradictions. If a potential inconsistency is uncertain, flag as
   `[VERIFY-INCONSISTENCY]` rather than asserting it.
4. **Materiality filter:** Not every inconsistency is worth pursuing at trial.
   Rate each contradiction by materiality (how much it matters to an element)
   and severity (how stark the contradiction is).
5. **Foundation awareness:** For each impeachment opportunity, identify the
   evidentiary foundation required under NMRA 11-613 (prior inconsistent
   statements) or applicable federal rule. Missing foundation ->
   `[FOUNDATION-NEEDED]`.
6. **Cross-reference discipline:** Track whether the same witness has been
   inconsistent across multiple sources (deposition + discovery + documents).
   Pattern inconsistency is more powerful than a single contradiction.
7. **Ethical bounds:** Impeachment must be based on genuine inconsistencies,
   not out-of-context quotations or misleading juxtapositions. Flag any
   impeachment opportunity where context significantly affects interpretation
   as `[CONTEXT-SENSITIVE]`.
8. **Token fail-safe:** If extensive, chunk: Part 1 = Contradiction Table,
   Part 2 = Impeachment Strategy + Foundation, Part 3 = Trial Presentation Plan.

## Required Inputs

### Always Required

```xml
<depo_index>
[DEPO-INDEX output for the witness being analyzed:
  Topic Index, Admission Inventory, Flag Inventory, Cross-Reference Table
  Must include page:line citations for all entries]
</depo_index>

<prior_statements>
[DPB -- prior discovery responses from this witness's party:
  Interrogatory answers (verified/sworn)
  RFA responses
  RFP responses and objections
  Include SetID/ReqNum for each]
[CFP -- documents containing prior statements by this witness:
  Reports authored by witness
  Emails, letters, memos
  Prior sworn statements or affidavits
  Medical records authored by witness (if medical provider)
  Include Bates or document ID for each]
</prior_statements>
```

### Optional (Strengthens Analysis)

- Prior DEPO-INDEX outputs from other witnesses (cross-witness inconsistency)
- Prior DEPO-INDEX output from this witness's earlier deposition (if re-deposed)
- Social media posts or public statements by witness
- Incident reports, police reports, or regulatory filings
- Expert report (if impeaching an expert witness)

### If Inputs Are Missing

If no DEPO-INDEX output: **"Run the DEPO-INDEX skill first to index the deposition transcript. DEPO-IMPEACH requires the indexed transcript."**
If no DPB: **"Provide prior discovery responses to compare against testimony. Without prior statements, impeachment analysis is limited."**

## Contradiction Classification

### Severity Scale

| Severity | Description | Trial Impact |
|----------|-------------|-------------|
| `DIRECT` | Flat contradiction -- says X now, said Y before | Devastating if proven |
| `MATERIAL-OMISSION` | Omits key fact previously stated, or states fact previously omitted | Strong -- shows selective memory |
| `QUALIFICATION` | Previously stated without qualification, now qualifies heavily | Moderate -- shows retreat |
| `DEGREE` | Same general statement but materially different on degree/extent | Moderate -- undermines precision |
| `TIMELINE` | Different dates, times, or sequence of events | Varies by materiality |
| `DETAIL` | Minor factual detail differs | Low unless pattern emerges |

### Materiality Rating

| Rating | Description |
|--------|-------------|
| `ELEMENT-CRITICAL` | Contradiction directly affects a required element of a claim |
| `CREDIBILITY-CRITICAL` | Contradiction destroys overall witness credibility |
| `SIGNIFICANT` | Contradiction matters but is not dispositive |
| `MINOR` | Contradiction exists but has limited trial value |
| `CUMULATIVE` | Minor alone but powerful as part of a pattern |

## Foundation Requirements

### NMRA 11-613: Prior Inconsistent Statements

For extrinsic evidence of a prior inconsistent statement:
1. Witness must be given opportunity to explain or deny the statement
2. Opposing party must have opportunity to examine the witness about it
3. Statement must be inconsistent with witness's testimony

### FRCP / FRE 613: Prior Inconsistent Statements

1. Statement need not be shown to witness before questioning (unlike old "Queen's Case" rule)
2. But witness must be afforded opportunity to explain or deny
3. Extrinsic evidence admissible if witness denies or equivocates
4. Foundation for impeachment by omission requires establishing duty/opportunity to speak

## Output Contract (Required Order)

1. **Witness Impeachment Summary**
   - Witness name, deposition date
   - Number of contradictions identified by severity
   - Overall credibility assessment
   - Top 3 impeachment opportunities

2. **Contradiction Table**

| # | Depo Statement (Page:Line, verbatim) | Prior Statement (Source, verbatim) | Severity | Materiality | Element Affected | Foundation Status |
|---|--------------------------------------|-----------------------------------|----------|-------------|-----------------|-------------------|

3. **Pattern Analysis**
   - Themes across multiple contradictions (selective memory, minimization, etc.)
   - Cross-witness inconsistencies (if multiple DEPO-INDEX outputs provided)
   - Discovery response consistency assessment

4. **Impeachment Strategy**
   - For each DIRECT or ELEMENT-CRITICAL contradiction:
     - Recommended impeachment sequence (commit, credit, confront)
     - Exact questions to ask
     - Document to confront with (Bates/exhibit reference)
     - Expected witness response
     - Follow-up strategy

5. **Foundation Checklist**
   - For each impeachment: foundation elements satisfied / needed
   - Rule citation (NMRA 11-613 or FRE 613)
   - Procedural steps at trial

6. **Trial Presentation Plan**
   - Recommended order of impeachment topics
   - Visual aid suggestions (side-by-side comparison exhibits)
   - Timing within cross-examination

7. **---** (divider)
8. **Gate Results**
   - Verbatim Fidelity: [PASS/FAIL] -- all quotes verified against sources
   - Citation Completeness: [PASS/FAIL] -- all entries have exact source citations
   - Foundation Status: [PASS/FAIL] -- foundation requirements identified for each item
   - Ethical Compliance: [PASS/FAIL] -- no misleading out-of-context quotations

9. **Open Items**
   - `[VERIFY-INCONSISTENCY]` items (potential contradictions needing confirmation)
   - `[FOUNDATION-NEEDED]` items (foundation not yet established)
   - `[CONTEXT-SENSITIVE]` items (contradictions where context matters)
   - `[DECISION REQUIRED]` items (strategic decisions about which impeachments to pursue)

## Modes

| Mode | Input | Output |
|------|-------|--------|
| **FULL ANALYSIS** | DEPO-INDEX + DPB + CFP | Complete contradiction analysis + all deliverables |
| **DISCOVERY COMPARE** | DEPO-INDEX + DPB | Compare testimony against discovery responses only |
| **CROSS-WITNESS** | Multiple DEPO-INDEX outputs | Cross-witness inconsistency analysis |
| **EXPERT IMPEACH** | DEPO-INDEX (expert) + expert report + learned treatises | Expert-specific impeachment analysis |
| **TRIAL PREP** | Prior DEPO-IMPEACH output + trial context | Refined trial presentation plan for identified contradictions |

### Mode: FULL ANALYSIS (default)

Compares testimony against all available prior statements: discovery responses,
documents, other witness testimony. Most comprehensive mode.

### Mode: DISCOVERY COMPARE

Focused comparison of testimony against sworn discovery responses. Useful
immediately after a deposition to identify responses that were contradicted.

### Mode: CROSS-WITNESS

Compares testimony across multiple witnesses on the same topics. Identifies
where defense witnesses contradict each other (powerful for closing argument).

### Mode: EXPERT IMPEACH

Specialized for expert witnesses. Compares testimony against the expert's
report, learned treatise positions, prior testimony in other cases, and
the expert's own publications.

### Mode: TRIAL PREP

Takes prior DEPO-IMPEACH analysis and refines it for trial presentation.
Produces finalized impeachment sequences with exact questions, exhibits,
and timing recommendations.

## Integration Points

| System | How DEPO-IMPEACH Connects |
|--------|--------------------------|
| **DEPO-INDEX** | DEPO-IMPEACH requires DEPO-INDEX output as primary input. DEPO-INDEX flags feed the comparison engine. |
| **DPB** | DEPO-IMPEACH compares testimony against DPB discovery responses (sworn interrogatory answers, RFA responses). |
| **CFP** | DEPO-IMPEACH uses CFP documents as prior statement sources for comparison. |
| **DEPO-OUTLINE** | DEPO-IMPEACH results inform future deposition outlines with targeted impeachment questions. |
| **CLOSING-ARGUMENT** | DEPO-IMPEACH contradiction table and strategy feed directly into closing credibility arguments. |
| **MURDER-BOARD** | PB-10 uses DEPO-IMPEACH results to assess our own witnesses' vulnerability to impeachment. |
| **TRIAL-NOTEBOOK** | DEPO-IMPEACH impeachment plans filed in Trial Notebook cross-examination section. |
| **SA** | Save per Save Map: Trial Preparation -> Impeachment Analysis. |

## Reference Files

- `references/methodology.md` -- contradiction detection, prior inconsistent statement analysis
- `references/impeachment-scoring.md` -- impeachment value scoring (severity, reliability, trial impact)
- `references/output-format.md` -- impeachment report format, trial-ready cross-examination blocks
