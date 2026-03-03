---
name: inference-engine
display_name: "Inference Engine"
description: >-
  Inference Engine (IE) — distinguishes established record facts from
  inferences drawn from those facts. Generates reasonable inferences from CFP
  fact packs, analyzes opponent inferences for reasonableness, and produces
  inference chains with confidence ratings for MSJ and trial use. Integrates
  with CFP (source facts), LPB (inference standards), and PCM (element-gap
  analysis). TRIGGERS: "inference", "draw inferences", "reasonable inference",
  "inference analysis", "inference chain", "opponent inference", "fact vs
  inference", "inference engine", "what can we infer", "analyze their
  inferences", "inference map", "inference audit" (v1.0)
version: "1.0"
category: analysis
pack_consumes:
  - CFP
  - LPB
  - PCM
pack_produces:
  - Inference analysis
checkpoints: 0
author: "Parnall & Adams"
license: Proprietary
---

# Inference Engine (IE) — v1.0

## What This Skill Does

Provides a structured system for:
1. **Drawing** reasonable inferences from established record facts
2. **Classifying** every assertion as FACT or INFERENCE (with confidence)
3. **Chaining** inferences (Fact → Inference-1 → Inference-2) with traceability
4. **Analyzing** opponent's inferences for reasonableness
5. **Identifying** inference gaps that need additional evidence

This skill does not draft motions. It produces structured inference analysis
that feeds MSJ (SUMF + Argument), ADR, and trial preparation.

## Why This Matters

At summary judgment, the court must draw all **reasonable** inferences in
favor of the nonmovant. This creates two critical tasks:

**When we move for MSJ:** Identify what inferences the opponent might claim,
and show they are unreasonable or unsupported — because the undisputed facts
compel only one inference.

**When we oppose MSJ:** Identify every reasonable inference from the record
that supports our claims, to show genuine disputes exist.

**At trial:** Distinguish what the evidence proves directly from what the
jury must infer, and build the inference chains that connect facts to elements.

## Architecture: Fact Layer → Inference Layer → Element Layer

```
CFP PACKET (DRAFT-READY facts) ─── Source facts with record cites
        │
        ▼
┌─────────────────────────────────────────────┐
│           INFERENCE ENGINE                   │
│                                              │
│  1. Classify: FACT vs INFERENCE              │
│  2. Draw: Fact → Reasonable Inference        │
│  3. Chain: Inference-1 → Inference-2         │
│  4. Rate: Confidence + Reasonableness        │
│  5. Map: Inference → Element_ID              │
│  6. Audit: Opponent inference analysis       │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
LPB PACKET (inference standards) ─── Legal standards for reasonableness
PCM (element gaps) ───────────────── Which elements need inference support
MSJ / Trial prep ─────────────────── Downstream consumers
```

## Hard Rules

1. **Every inference must trace to at least one DRAFT-READY fact.** No
   inference without a record anchor. Missing anchor → `[FACT-GAP]`.

2. **Facts and inferences must be clearly labeled.** Never present an
   inference as a fact. The classification is the point of this skill.

3. **Inference confidence must be rated.** Every inference gets a
   confidence rating (STRONG / MODERATE / WEAK) with stated basis.

4. **Inference chains must be explicit.** If Inference-2 depends on
   Inference-1, the chain must be documented. A chain is only as strong
   as its weakest link.

5. **Never invent facts to support inferences.** If the record is
   insufficient, flag `[FACT-GAP]` — do not bridge gaps with speculation.

6. **Opponent inferences get the same rigor.** Analyze their inferences
   with the same chain/confidence framework, then assess reasonableness.

7. **NM-first legal standards.** Use NM case law on inference
   reasonableness at summary judgment and trial.

## Modes

| Mode | Input | Output |
|------|-------|--------|
| **DRAW** | CFP PACKET + Element_IDs | Inference Map (facts → inferences → elements) |
| **AUDIT** | Opponent's brief/argument + CFP PACKET | Inference Audit (reasonableness analysis) |
| **CHAIN** | Specific facts or prior inference output | Inference Chain Diagram (multi-step chains) |
| **CLASSIFY** | Mixed assertions (from brief, depo, etc.) | Fact/Inference Classification Table |
| **GAP** | PCM + current inference map | Inference Gap Report (elements lacking inference support) |

## Pack Locations (v1.1)

**Read CFP from:** `cases/{CASE_CODE}/cfp/`
**Read LP from:** `law-packs/` + `law-packs/law-of-the-case/{CASE_CODE}/` (if exists)
**Save analysis output to:** `cases/{CASE_CODE}/drafts/`

## Definitions

### FACT (Record Fact)
An assertion directly supported by a specific document in the record with
a pinpoint cite. The fact is what the document says, without interpretation.

**Examples:**
- "Medical records reflect Patient presented to ER at 2:15 AM on 3/15/24"
  (DocID + Bates)
- "Defendant's interrogatory answer states: '[verbatim quote]'"
  (Discovery response + number)
- "Police report states Officer observed skid marks of 47 feet"
  (Report # + page)

### INFERENCE (Drawn Inference)
A conclusion that follows logically from one or more record facts but is
not directly stated in any document. An inference requires reasoning beyond
what the document says.

**Examples:**
- "The 47-foot skid marks indicate Defendant was traveling at approximately
  45 mph" (inference from fact, requires expert or physics)
- "The 3-hour gap between ER presentation and first physician contact
  indicates understaffing or triage failure" (inference from timeline facts)
- "Defendant's failure to preserve the surveillance footage supports an
  inference that the footage was unfavorable" (spoliation inference from
  fact of non-preservation)

### INFERENCE CHAIN
A multi-step reasoning path: Fact-A + Fact-B → Inference-1 → Inference-2.

**Example:**
```
FACT: Patient's vitals deteriorated over 4 hours (CFP Fact#12, DocID-MR-003)
FACT: No physician was called during that period (CFP Fact#15, DocID-MR-003)
  → INFERENCE-1: Nursing staff failed to escalate deteriorating condition [STRONG]
  → INFERENCE-2: Earlier physician involvement would have changed treatment [MODERATE]
  → INFERENCE-3: Delay caused or contributed to patient's worsened outcome [MODERATE]
```

Each step is rated independently. The chain's overall confidence is capped
by its weakest link.

## Confidence Rating System

| Rating | Meaning | MSJ Implications |
|--------|---------|-----------------|
| **STRONG** | Only one reasonable inference from these facts. Alternative explanations are speculative or contradicted by the record. | Supports MSJ — no genuine dispute on this inference. |
| **MODERATE** | Most reasonable inference, but a rational factfinder could draw a different conclusion. | May survive MSJ — depends on whether alternative inference is reasonable. |
| **WEAK** | One possible inference among several reasonable alternatives. Requires additional facts or credibility determinations. | Does not support MSJ — genuine dispute exists. May still be valuable at trial. |

### Factors Affecting Confidence

- **Directness:** How many inferential steps from fact to conclusion?
- **Exclusivity:** Are there plausible alternative inferences?
- **Corroboration:** Do multiple independent facts support the same inference?
- **Expert support:** Does the inference require specialized knowledge?
- **Common experience:** Would a reasonable person draw this inference?
- **Record contradiction:** Does any record evidence undercut the inference?

## Required Inputs

### For DRAW Mode
```xml
<evidence_layer>
[CFP PACKET — DRAFT-READY facts with DocID + pinpoints]
</evidence_layer>

<strategic_layer>
[PCM or Element_ID list — which elements need inference support]
</strategic_layer>
```

### For AUDIT Mode
```xml
<evidence_layer>
[CFP PACKET — our record facts]
</evidence_layer>

<opponent_argument>
[Opponent's brief, argument section, or specific assertions to analyze]
</opponent_argument>
```

### For CLASSIFY Mode
```xml
<assertions>
[Mixed list of assertions to classify as FACT or INFERENCE]
</assertions>

<evidence_layer>
[CFP PACKET — for verification against record]
</evidence_layer>
```

## Output: DRAW Mode

### 1) Inference Map

| Inf# | Source Fact#(s) | Source DocID + Pinpoint | Inference | Confidence | Element_ID | Chain? | Notes |
|------|----------------|------------------------|-----------|------------|------------|--------|-------|
| I-001 | F-003, F-007 | MR-003:p.12, MR-003:p.15 | [inference text] | STRONG | BREACH-001 | — | |
| I-002 | F-012 | DEP-002:45:3-8 | [inference text] | MODERATE | CAUSE-ACTUAL-001 | → I-003 | |
| I-003 | I-002, F-015 | (chained from I-002) | [inference text] | MODERATE | DAMAGES-ECON-001 | ← I-002 | Weakest link: I-002 |

### 2) Inference Chains (if multi-step)

```
Chain 1: [Element_ID]
  FACT: [text] (Fact#, DocID+Pin)
  FACT: [text] (Fact#, DocID+Pin)
    → INFERENCE-1: [text] [CONFIDENCE]
      → INFERENCE-2: [text] [CONFIDENCE]
  Chain Confidence: [weakest link]
  MSJ Viability: [assessment]
```

### 3) Element Coverage Summary

| Element_ID | Facts Available | Inferences Drawn | Strongest Chain | Gaps |
|------------|----------------|-----------------|-----------------|------|
| DUTY-001 | 5 | 2 | STRONG | None |
| BREACH-001 | 3 | 3 | MODERATE | Needs expert on standard of care |
| CAUSE-ACTUAL-001 | 2 | 2 | MODERATE | Needs causation expert |

### 4) Cite Table + Gate Results
Standard output contract (see main skill framework).

## Output: AUDIT Mode

### 1) Opponent Inference Audit

| OI# | Opponent's Assertion | Classification | Source Cited | Our Record Check | Reasonableness | Notes |
|-----|---------------------|----------------|-------------|-----------------|---------------|-------|
| OI-001 | "[their assertion]" | FACT / INFERENCE / UNSUPPORTED | [what they cited] | [our CFP check] | REASONABLE / UNREASONABLE / SPECULATIVE | |

### 2) Unreasonable Inference Analysis

For each inference rated UNREASONABLE or SPECULATIVE:
- **What they claim:** [assertion]
- **What the record actually shows:** [CFP fact + cite]
- **Why the inference fails:** [logical gap, contradiction, speculation]
- **Counter-inference:** [what the facts actually support]
- **Authority:** [NM case law on unreasonable inferences at MSJ] `[VERIFY-CITE]`

### 3) Conceded Facts

Facts opponent presents that our record confirms — these may be stipulable
or admitted in the SUMF.

### 4) Disputed Inferences

Inferences where both sides have a reasonable basis — these are the genuine
disputes that should survive MSJ.

## Output: CLASSIFY Mode

### Fact/Inference Classification Table

| # | Assertion | Classification | Record Basis | Pinpoint | Confidence | Notes |
|---|-----------|---------------|-------------|----------|------------|-------|
| 1 | "[assertion]" | FACT | Direct record statement | DocID+Pin | — | |
| 2 | "[assertion]" | INFERENCE | Drawn from Fact #1 + #3 | — | MODERATE | |
| 3 | "[assertion]" | UNSUPPORTED | No record basis found | — | — | [FACT-GAP] |

## Legal Standards for Inference Reasonableness

### At Summary Judgment (NM)
- Court draws all reasonable inferences in favor of nonmovant
- An inference is reasonable if a rational factfinder could draw it
- Speculation, conjecture, and unwarranted inferences are insufficient
- The mere existence of a scintilla of evidence is not enough
- `[VERIFY-CITE]` for current NM holdings

### At Trial (NM)
- Jury may draw reasonable inferences from the evidence
- Jury is not required to draw any particular inference
- Inference upon inference: generally disfavored but not categorically
  prohibited in NM `[VERIFY-CITE]`
- Circumstantial evidence can support inferences

## Integration Points

| System | How IE Connects |
|--------|----------------|
| **CFP** | IE consumes CFP PACKET as the source of record facts. Every inference anchors to CFP Fact# rows. |
| **LPB** | IE consumes LPB authority on inference standards (MSJ reasonableness, circumstantial evidence, inference-on-inference). |
| **PCM** | IE uses PCM to identify which elements have fact gaps that need inference support. IE output feeds back to PCM as inference coverage. |
| **MSJ** | IE output directly feeds MSJ SUMF (facts) and Argument (application of inferences to elements). |
| **ADR** | IE can analyze Answer's denials — are defendant's implicit factual assertions supported by the record or based on unsupported inferences? |
| **DC** | IE can draw damages inferences from medical/economic facts (future damages projections are inferences from current facts). |

## Reference Files

- `references/inference-standards.md` — NM legal standards for inference reasonableness
- `references/inference-patterns.md` — Common inference patterns in PI litigation
