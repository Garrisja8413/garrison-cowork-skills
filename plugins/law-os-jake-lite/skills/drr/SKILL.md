---
name: drr
display_name: "Discovery Response Reviewer"
description: >-
  Discovery Response Reviewer (DRR). Orchestrates a multi-skill review of
  opponent's discovery responses to YOUR discovery requests. Guides the user
  through a structured workflow: (1) DPB to build a discovery pack from the
  responses, (2) OA-ROG/OA-RFP/OA-RFA to analyze objection validity, (3) DRS
  to analyze whether substantive answers are sufficient, (4) OCN to generate
  compromise proposals for valid objections, (5) GFL to draft a good faith
  letter for deficiencies, (6) MTC to draft a motion to compel if cure fails.
  TRIGGERS: Use when user mentions "review discovery responses", "analyze
  opponent responses", "DRR", "review interrogatory answers", "review RFA
  responses", "evaluate discovery responses", "did they answer our discovery",
  "discovery review", or uploads responses from opposing counsel for review.
  Do NOT use for responding to INCOMING discovery (use drp instead) (v1.0)
version: "1.0"
category: discovery-review
pack_consumes:
  - DPB
  - LPB
  - CFP
  - PCM
pack_produces:
  - Discovery review report
checkpoints: 0
author: "Parnall & Adams"
license: Proprietary
---

## Pack Dependencies
**Consumes:**
- DPB (opponent's discovery responses — Direction=Outgoing, our requests)
- LPB (objection law, discovery standards)
- CFP (case facts for relevance and contradiction analysis)
- PCM (claims element mapping for gap analysis)

**Produces:**
- Discovery Review Report
- Objection Validity Assessment
- Substantive Sufficiency Assessment
- Compromise Proposals
- GFL/MTC-ready deficiency findings

# DRR (Discovery Response Reviewer) — v1.0

## What This Plugin Does

The Discovery Response Reviewer is the **master orchestrator** for reviewing
discovery responses your opponent has served in response to YOUR discovery
requests. It coordinates multiple Law-OS skills into a unified workflow that:

1. **Builds a discovery pack** from the opponent's responses (DPB)
2. **Analyzes every objection** for legal validity (OA-ROG, OA-RFP, OA-RFA)
3. **Analyzes every answer** for substantive sufficiency (DRS)
4. **Generates compromise proposals** for valid objections (OCN)
5. **Prepares deficiency findings** for GFL or MTC escalation
6. **Maps discovery gaps** to claims/defense elements (PCM)

## Architecture: Multi-Skill Orchestration

```
OPPONENT'S DISCOVERY RESPONSES
                │
                ▼
┌─────────────────────────────────────────────┐
│              DRR ORCHESTRATOR               │
│                                             │
│  Step 1: BUILD PACK                         │
│  └── DPB (EXTRACT → ENRICH → VERIFY)       │
│      Parse all requests, objections,        │
│      answers, and productions               │
│                                             │
│  Step 2: ANALYZE OBJECTIONS                 │
│  ├── OA-ROG → ROG objection validity        │
│  ├── OA-RFP → RFP objection validity        │
│  ├── OA-RFA → RFA objection validity        │
│  └── Results: VALID / INVALID / WAIVED      │
│                                             │
│  Step 3: ANALYZE SUBSTANCE                  │
│  ├── DRS → answer sufficiency analysis      │
│  ├── Cross-reference against CFP            │
│  └── Map gaps to PCM elements               │
│                                             │
│  Step 4: GENERATE COMPROMISES               │
│  ├── OCN → compromise proposals for         │
│  │   VALID objections                       │
│  └── Modified request language              │
│                                             │
│  Step 5: PREPARE ESCALATION                 │
│  ├── INVALID objections → GFL findings      │
│  ├── Insufficient answers → GFL findings    │
│  ├── Unresolved after GFL → MTC findings    │
│  └── Attorney Decision Points               │
│                                             │
│  Step 6: OUTPUT                             │
│  ├── Discovery Review Report                │
│  ├── Deficiency Summary for GFL/MTC         │
│  ├── Compromise Proposals for meet-confer   │
│  └── Element Gap Analysis                   │
└─────────────────────────────────────────────┘
```

## Modes

| Mode | Purpose |
|------|---------|
| **FULL-REVIEW** | Complete end-to-end review of all discovery responses |
| **OBJECTION-REVIEW** | Focus on objection analysis only (skip substance) |
| **SUFFICIENCY-REVIEW** | Focus on answer sufficiency only (skip objections) |
| **ESCALATION-PREP** | Generate GFL/MTC-ready findings from prior review |
| **FOLLOW-UP** | Review supplemental responses after GFL cure period |

## Pack Locations (v1.1)

**Read DPB from:** `cases/{CASE_CODE}/dpb/`
**Read LP from:** `law-packs/`
**Save review output to:** `cases/{CASE_CODE}/drafts/`

## Hard Rules

1. **Pack-First.** Run DPB before any analysis. Every finding must trace to
   a DPB row. No DPB → no review.
2. **Separate objection and substance.** OA-* skills handle objections.
   DRS handles substantive answers. Never confuse the two.
3. **Compromise valid objections, fight invalid ones.** Do not escalate
   VALID objections to GFL/MTC — route them to OCN instead.
4. **Never invent** objection language, answer text, request text, Bates
   ranges, case citations, or rule numbers.
5. **Attorney decisions required** for strategic calls: whether to accept
   a compromise, whether to escalate, whether to concede a request.
6. **Element-gap focus.** Always map deficiencies to claims/defense elements
   so the attorney understands what proof gaps exist.

## Workflow Detail

### Step 1: BUILD PACK (DPB)

**If the user hasn't already built a DPB:** Guide them through it.

Say: "Before I can review these responses, I need to build a Discovery Pack.
Let me run the DPB skill to extract and organize the requests, objections,
answers, and productions."

Run DPB in this sequence:
1. **EXTRACT** — Parse the discovery responses into structured DPB rows
2. **ENRICH** — Classify each response by state (COMPLETE, OBJECTION-ONLY,
   EVASIVE, NO-RESPONSE, PARTIAL, etc.)
3. **VERIFY** — QA check on the DPB data

**If the user already has a DPB:** Consume the existing DPB PACKET.

### Step 2: ANALYZE OBJECTIONS (OA-ROG / OA-RFP / OA-RFA)

Route each discovery type to its specialized analyzer:

- **Interrogatory responses → OA-ROG (ANALYZE-OUTGOING mode)**
  - Evaluate each objection for legal validity
  - Check subpart counting compliance
  - Flag waived objections (untimely, insufficiently specific)
  - Identify contention interrogatory timing issues

- **RFP responses → OA-RFP (ANALYZE-OUTGOING mode)**
  - Evaluate each objection for legal validity
  - Audit production completeness (if documents produced)
  - Check privilege log compliance
  - Assess ESI-specific issues

- **RFA responses → OA-RFA (ANALYZE-OUTGOING mode)**
  - Evaluate each objection for legal validity
  - Assess deemed-admission potential (missed deadlines)
  - Identify improper partial admissions

**Collect results into a unified Objection Validity Matrix:**

| ReqNum | SetType | ObjType | Validity | Modification? | Route To |
|--------|---------|---------|----------|---------------|----------|
| ROG-3 | ROG | Overbroad | VALID | Yes — date limit | OCN |
| RFP-1 | RFP | Privilege | PARTIALLY-VALID | Yes — privilege log | OCN |
| RFA-5 | RFA | Irrelevant | INVALID | N/A | GFL |

### Step 3: ANALYZE SUBSTANCE (DRS)

Invoke DRS on all responses that include substantive answers:

- **ROG-SUFFICIENCY** — Are interrogatory answers complete and responsive?
- **RFA-SUFFICIENCY** — Are admissions/denials clear and proper?
- **RFP-SUFFICIENCY** — Is the document production complete?
- **CROSS-RESPONSE** — Are answers consistent across discovery types?
- **ELEMENT-GAP** — What proof gaps remain after these responses?

**Cross-reference with CFP** for contradiction detection.
**Map to PCM elements** for gap analysis.

### Step 4: GENERATE COMPROMISES (OCN)

For VALID and PARTIALLY-VALID objections only:

1. Invoke OCN with OA-* findings
2. Generate Tier 1 (minimal) and Tier 2 (maximal) compromises
3. Produce modified request language ready for meet-and-confer
4. Track what information we lose with each compromise

### Step 5: PREPARE ESCALATION

Sort all findings into escalation categories:

**For GFL (Good Faith Letter):**
- All INVALID objections (demand withdrawal)
- All WAIVED objections (demand withdrawal)
- All INSUFFICIENT/EVASIVE/NON-RESPONSIVE answers (demand supplementation)
- Incomplete productions (demand completion)
- Missing privilege logs (demand production)

**For OCN (Meet-and-Confer Compromise):**
- All VALID objections with modification proposals
- All PARTIALLY-VALID objections with narrowing proposals

**For Attorney Decision:**
- Strategic choices (accept compromise vs. fight?)
- Requests to potentially concede (low-priority, cumulative)
- Timing decisions (escalate now vs. wait for more discovery?)

### Step 6: OUTPUT

## Output Contract (Required Order)

### 1. Review Summary Dashboard

| SetType | Total Requests | Objection-Only | Partial | Evasive | Complete | Insufficient |
|---------|---------------|----------------|---------|---------|----------|--------------|
| ROG | [N] | [N] | [N] | [N] | [N] | [N] |
| RFA | [N] | [N] | [N] | [N] | [N] | [N] |
| RFP | [N] | [N] | [N] | [N] | [N] | [N] |

### 2. Unified Objection Analysis

Combined findings from OA-ROG, OA-RFP, OA-RFA:

| ReqNum | SetType | Objection | Validity | Authority | Action |
|--------|---------|-----------|----------|-----------|--------|

### 3. Sufficiency Analysis

Combined findings from DRS:

| ReqNum | SetType | Classification | Missing Information | Element Impact |
|--------|---------|---------------|--------------------|--------------------|

### 4. Compromise Proposals (from OCN)

For VALID objections — tiered proposals with modified request language.

### 5. Deficiency Summary for GFL/MTC

Ready-to-use findings organized for GFL drafting:

```
DEFICIENCIES FOR GFL:

INVALID OBJECTIONS (demand withdrawal):
- [ReqNum]: [finding + authority]

INSUFFICIENT ANSWERS (demand supplementation):
- [ReqNum]: [finding + what is missing]

INCOMPLETE PRODUCTIONS (demand completion):
- [ReqNum]: [finding + what is missing]
```

### 6. Element Gap Report

| Element_ID | Description | Discovery Status | Remaining Gap | Recommended Action |
|------------|------------|-----------------|---------------|-------------------|

### 7. Attorney Decision Points

```
DECISIONS REQUIRED:

□ Accept OCN compromises for [ReqNums]?
□ Escalate to GFL immediately or wait for [event]?
□ Concede [low-priority ReqNums]?
□ Request meet-and-confer conference?
□ Authorize MTC filing for unresolved items?
```

### 8. Cite Table

| # | Assertion | Evidence (SetID/ReqNum or LawTag + Pinpoint) | Confidence | Notes |
|---|-----------|----------------------------------------------|------------|-------|

### 9. Gate Results
- Pack-First: [PASS/FAIL] — all findings from DPB rows
- Objection/Substance Separation: [PASS/FAIL] — OA-* for objections, DRS for answers
- Compromise Routing: [PASS/FAIL] — VALID → OCN, INVALID → GFL
- Element Mapping: [PASS/FAIL] — gaps mapped to PCM elements
- Escalation Readiness: [PASS/FAIL] — GFL-ready findings structured

### 10. Recommended Next Steps

Based on findings, recommend the specific next action:
- If mostly INVALID objections → "Run GFL to draft good faith letter"
- If mostly VALID objections → "Review OCN compromises and schedule meet-confer"
- If mixed → "Run GFL for invalid objections; bring OCN proposals to meet-confer"
- If cure period passed → "Run MTC to draft motion to compel"

## SSOT Integration

**DPB is the Discovery SSOT.** DRR's primary input is the DPB, which is the
single source of truth for all discovery data. DRR builds ON TOP of the DPB's
verbatim extractions — it never re-extracts or re-interprets discovery content.

**RFA Admissions flow to PSR and CFP:** When DRR identifies RFA admissions
(AdmissionResult=Admitted or Deemed-Admitted), these should be cross-referenced
with the PSR Admissions_Map and ultimately flow to CFP as admitted facts.

**Discovery motions feed MPR:** When DRR findings escalate to GFL and then MTC,
the filed MTC becomes an entry in the MPR (Motion Practice Register).

## Integration Points

| System | How DRR Connects |
|--------|-----------------|
| **DPB** | DRR starts with DPB (Discovery SSOT) to build the discovery pack from opponent's responses. All verbatim content comes from DPB. |
| **PSR** | RFA admissions from DRR analysis cross-reference to PSR Admissions_Map. Discovery relevance informed by PSR Claims_Register. |
| **MPR** | Discovery motions (MTC) filed after DRR analysis become MPR entries. Prior discovery motion rulings (from MPR) inform DRR strategy. |
| **OA-ROG** | DRR invokes OA-ROG (ANALYZE-OUTGOING) for interrogatory objection analysis. |
| **OA-RFP** | DRR invokes OA-RFP (ANALYZE-OUTGOING) for production objection analysis. |
| **OA-RFA** | DRR invokes OA-RFA (ANALYZE-OUTGOING) for admission objection analysis. |
| **DRS** | DRR invokes DRS for substantive answer sufficiency analysis. |
| **OCN** | DRR invokes OCN to generate compromise proposals for valid objections. |
| **CFP** | DRR reads CFP for cross-reference and contradiction detection. RFA admissions feed CFP via PSR. |
| **LPB** | DRR reads LPB for objection law and discovery standards. |
| **PCM** | DRR maps discovery gaps to claims elements. |
| **GFL** | DRR prepares deficiency findings ready for GFL consumption. |
| **MTC** | DRR prepares escalation findings ready for MTC consumption. |
| **SDC** | DRR can incorporate SDC strategic analysis for disclosure leverage assessment. |
