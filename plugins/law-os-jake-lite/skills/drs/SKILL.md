---
name: drs
display_name: "Discovery Response Sufficiency Analyzer"
description: >-
  Discovery Response Sufficiency Analyzer (DRS). Analyzes the *substance* of
  discovery responses — separate from objection analysis — to determine
  whether answers, admissions, and productions actually respond to what was
  asked. Identifies evasive, incomplete, non-responsive, and misleading
  answers. Detects answers that technically respond but omit critical
  information. Feeds GFL, MTC, and DRP with substantive deficiency findings.
  TRIGGERS: Use this skill when the user mentions "response sufficiency",
  "analyze discovery responses", "evasive answers", "incomplete answers",
  "non-responsive", "DRS", "sufficiency analysis", "did they answer the
  question", "response adequacy", or wants to evaluate whether discovery
  responses actually answer the questions that were asked. Do NOT use for
  objection analysis (use oa-rfa, oa-rog, or oa-rfp) (v1.0)
version: "1.0"
category: discovery-review
pack_consumes:
  - DPB
  - CFP
  - LPB
  - PCM
  - PDM
pack_produces:
  - DRS sufficiency report
checkpoints: 0
author: "Parnall & Adams"
license: Proprietary
---

## Pack Dependencies
**Consumes:**
- DPB (all discovery types)
- CFP (case facts for relevance assessment)
- LPB (discovery sufficiency standards)
- PCM (claims element mapping for gap analysis)
- PDM (defense element mapping for gap analysis)

**Produces:**
- DRS Sufficiency Report
- Deficiency Findings

# DRS (Discovery Response Sufficiency Analyzer) — v1.0

## What This Skill Does

Analyzes the **substance** of discovery responses — completely separate from
objection analysis — to determine whether the responding party actually answered
what was asked. The OA-* skills analyze objections; DRS analyzes the answers
themselves.

Key questions DRS answers:
- Did the response actually answer the question that was asked?
- Is the answer complete, or does it omit categories of responsive information?
- Is the answer evasive — technically responsive but practically useless?
- Does the answer contradict other known facts (from CFP)?
- Does the answer leave gaps in the proof matrix (PCM/PDM)?
- Did the production include all documents reasonably responsive to the request?
- Are the answers consistent across related interrogatories?

## Architecture

```
DPB PACKET (all types) ───┐
                           ├── DRS ──► Sufficiency Report
CFP PACKET (case facts) ───┤           + Deficiency Findings
LPB PACKET (sufficiency) ──┤           + Contradiction Analysis
PCM/PDM (element map) ─────┘           + Gap Analysis
                                            │
                            ┌───────────────┘
                            ▼
                      GFL (good faith letter)
                      MTC (motion to compel)
                      DRP (discovery responder)
```

## Modes

| Mode | Discovery Type | Purpose |
|------|---------------|---------|
| **ROG-SUFFICIENCY** | Interrogatories | Analyze whether ROG answers are complete and responsive |
| **RFA-SUFFICIENCY** | Admissions | Analyze whether RFA responses properly admit, deny, or explain |
| **RFP-SUFFICIENCY** | Productions | Analyze whether document production is complete and compliant |
| **CROSS-RESPONSE** | All types | Cross-reference answers across discovery types for inconsistencies |
| **ELEMENT-GAP** | All types | Map responses against PCM/PDM elements to find proof gaps |

## Pack Locations (v1.1)

**Read DPB from:** `cases/{CASE_CODE}/dpb/`
**Read LP from:** `law-packs/`
**Save review output to:** `cases/{CASE_CODE}/drafts/`

## Hard Rules

1. **Pack-First:** Every sufficiency finding must trace to a DPB row (SetID + ReqNum + AnswerText).
   Cross-references to CFP must cite Fact# and pinpoint.
2. **Never invent** answer text, request text, facts, or citations.
3. **Separate from objection analysis.** DRS analyzes the substantive answer, not the
   objection. If a response contains both objection AND answer, DRS analyzes only the answer.
   Forward the objection to OA-* skills.
4. **Sufficiency classification required:** Each response must be classified as
   SUFFICIENT, INSUFFICIENT, EVASIVE, NON-RESPONSIVE, CONTRADICTORY, or PARTIAL.
5. **Specificity:** When identifying a deficiency, DRS must state exactly what
   information is missing and why it matters to the claims/defenses.
6. **Preserve verbatim answer text** from DPB AnswerText. Quote directly when analyzing.
7. **No speculation about withheld information.** Only flag gaps that are apparent
   from the answer text and the scope of the request.

## Sufficiency Categories

### ROG Answer Sufficiency Tests

| Test | What It Checks | Deficiency Signal |
|------|---------------|-------------------|
| **Completeness** | Does the answer address every part of the interrogatory? | Subparts unanswered or ignored |
| **Specificity** | Does the answer provide specific facts vs. vague generalities? | "Various documents" instead of identifying specific docs |
| **Responsiveness** | Does the answer address what was actually asked? | Answers a different question than what was posed |
| **Consistency** | Does the answer match answers to related ROGs? | Contradicts ROG-3 on timeline |
| **Verification** | Is the answer under oath / verified as required? | No verification statement |
| **Supplementation** | Has the answer been supplemented as required by FRCP 26(e)? | Known facts not reflected in answer |
| **Cross-reference** | Does the answer match known facts from CFP? | CFP shows 5 witnesses; ROG answer lists only 2 |

### RFA Response Sufficiency Tests

| Test | What It Checks | Deficiency Signal |
|------|---------------|-------------------|
| **Admit/Deny clarity** | Is the response a clear admission or denial? | Hedging language without clear position |
| **Partial admission form** | Does partial admission specify what is admitted and denied? | "Admitted in part" without specifying which part |
| **Denial basis** | Does denial state basis when required? | Blanket denial of verifiable fact |
| **Lack of knowledge** | Is "insufficient knowledge" claim credible after reasonable inquiry? | Party should have knowledge from own records |
| **Qualification** | Does qualification materially change the admission? | Qualifying language that nullifies the admission |

### RFP Production Sufficiency Tests

| Test | What It Checks | Deficiency Signal |
|------|---------------|-------------------|
| **Completeness** | Were all responsive documents produced? | Known documents not in production |
| **Organization** | Produced as kept OR labeled to correspond to categories? | Dump of unsorted documents |
| **Metadata** | ESI metadata preserved (if required by protocol)? | Metadata stripped from native files |
| **Bates integrity** | Continuous Bates stamping with no gaps? | Unexplained gaps in Bates sequence |
| **Redaction propriety** | Are redactions properly noted and justified? | Over-redaction without privilege log |
| **Format compliance** | Produced in requested form (native, TIFF, PDF)? | Wrong format without explanation |

## Required Inputs

### Always Required

```xml
<evidence_layer>
[DPB PACKET — include all discovery types being analyzed.
 Must include: SetType, ReqNum, ReqText, ObjText, AnswerText,
 State, AdmissionResult (for RFA)]
[For RFP sufficiency: include Productions tab with Bates ranges]
</evidence_layer>

<legal_layer>
[LPB PACKET — discovery sufficiency standards:
 FRCP 26(e) supplementation obligations,
 FRCP 33(b) interrogatory answer requirements,
 FRCP 36(a) admission response requirements,
 FRCP 34(b)(2) production requirements,
 evasive/incomplete answer doctrine (FRCP 37(a)(4))]
</legal_layer>
```

### Optional (Strengthens Analysis)

- `<case_facts>` — CFP PACKET for cross-referencing answers against known facts
- `<strategic_layer>` — PCM/PDM for mapping responses to proof elements
- Prior discovery responses (for supplementation analysis)
- Deposition transcripts (for contradiction detection)
- Document production index (for completeness audit)

## Output Contract (Required Order)

### 1. Sufficiency Matrix

| ReqNum | SetType | Classification | Missing Information | Impact on Elements | Priority |
|--------|---------|---------------|--------------------|--------------------|----------|
| ROG-3 | ROG | EVASIVE | Identifies "various" docs but won't name them | Element 2.1 | HIGH |
| RFA-7 | RFA | INSUFFICIENT | Admits "in part" without specifying | Element 4.3 | HIGH |
| RFP-2 | RFP | PARTIAL | 47 docs produced, ~200 expected | Element 1.2 | CRITICAL |

### 2. Request-by-Request Sufficiency Analysis

For each response analyzed:

```
**[SetType] No. [ReqNum]**

*What Was Asked:* [Brief summary from DPB ReqText]
*What Was Answered:* [Verbatim or close summary from DPB AnswerText]

*Sufficiency Classification:* [SUFFICIENT / INSUFFICIENT / EVASIVE /
  NON-RESPONSIVE / CONTRADICTORY / PARTIAL]

*Analysis:*
- [Specific finding: what information is missing or deficient]
- [Why this matters: connection to claim/defense element]
- [What a sufficient answer would include]

*Cross-Reference Findings (if applicable):*
- CFP Fact# [X]: [contradiction or omission detail]
- [SetType] No. [Y]: [inconsistency with another response]
- PCM/PDM Element [Z]: [proof gap created by insufficient answer]

*Recommended Action:*
- [Demand supplementation / include in GFL / include in MTC /
   deposition follow-up / subpoena third-party source]
```

### 3. Contradiction Report (if CFP provided)

| ReqNum | Answer Claims | CFP Says | Contradiction Type | Source |
|--------|--------------|----------|-------------------|--------|

### 4. Element Gap Report (if PCM/PDM provided)

| Element_ID | Element Description | Discovery Responses | Gap Status | Recommended Action |
|------------|--------------------|--------------------|------------|-------------------|

### 5. Cross-Response Consistency Report

| Response A | Response B | Inconsistency | Severity |
|-----------|-----------|---------------|----------|

### 6. Deficiency Summary for GFL/MTC

```
DEFICIENCY FINDINGS FOR GFL/MTC HANDOFF:
- ROG-3: Answer is evasive — identifies "various documents" without naming them.
  Demand: Identify each document by title, date, and custodian.
- RFA-7: Partial admission without specifying which facts admitted.
  Demand: Identify specifically which facts are admitted and which denied.
- RFP-2: Production incomplete — ~200 responsive documents expected, 47 produced.
  Demand: Complete production within 14 days or provide privilege log for withheld docs.
```

### 7. Cite Table

| # | Assertion | Evidence (SetID/ReqNum or LawTag + Pinpoint) | Confidence | Notes |
|---|-----------|----------------------------------------------|------------|-------|

### 8. Gate Results
- Traceability: [PASS/FAIL] — all findings from DPB rows, all law from LPB
- Cross-Reference: [PASS/FAIL] — CFP contradictions verified against source
- Element Coverage: [PASS/FAIL] — PCM/PDM elements mapped (if provided)
- Separation: [PASS/FAIL] — objections analyzed only by OA-* skills, not DRS
- Pack Status: [PASS/FAIL]

### 9. Next Requests

## Integration Points

| System | How DRS Connects |
|--------|-----------------|
| **DPB** | Consumes DPB rows — reads AnswerText, ReqText, State. DRS may recommend state changes (e.g., PARTIAL → EVASIVE). |
| **CFP** | Cross-references answers against known facts for contradiction detection. |
| **LPB** | Uses discovery sufficiency law to determine legal standards for "adequate" responses. |
| **PCM/PDM** | Maps responses to proof elements to identify gaps created by insufficient answers. |
| **OA-*** | DRS handles substance; OA-RFA/OA-ROG/OA-RFP handle objections. No overlap. |
| **OCN** | DRS deficiencies feed OCN when compromise is possible (e.g., narrow supplementation scope). |
| **GFL** | Deficiency findings feed GFL request-by-request analysis alongside OA-* findings. |
| **MTC** | Evasive/incomplete findings support FRCP 37(a)(4) arguments in MTC. |
| **DRP** | DRP uses DRS to evaluate sufficiency of our own draft responses before serving. |
| **QVS** | DRS uses QVS to preserve exact verbatim quotes from responses for comparison. |
