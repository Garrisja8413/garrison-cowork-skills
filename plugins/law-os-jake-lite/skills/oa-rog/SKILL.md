---
name: oa-rog
display_name: "Objection Analyzer — ROG"
description: >-
  Objection Analyzer — Interrogatories (OA-ROG). Evaluates objections to
  interrogatories and objections raised in response to interrogatories for
  legal validity, identifies waived or insufficiently specific objections, and
  generates modification recommendations to cure valid objections while
  preserving the right to obtain substantive answers. Feeds OCN (Objection
  Compromise Negotiator) and DRP (Discovery Responder Plugin). TRIGGERS: Use
  this skill when the user mentions "interrogatory objection analysis",
  "analyze ROG objections", "interrogatory objections", "ROG validity",
  "respond to interrogatory objections", "object to interrogatories",
  "interrogatory modifications", or wants to evaluate whether objections to
  interrogatories are legally valid or how to overcome them. Do NOT use for
  RFAs (use oa-rfa) or requests for production (use oa-rfp) (v1.0)
version: "1.0"
category: discovery-review
pack_consumes:
  - DPB
  - LPB
pack_produces:
  - OA-ROG assessment report
checkpoints: 0
author: "Parnall & Adams"
license: Proprietary
---

## Pack Dependencies
**Consumes:**
- DPB (ROG-filtered rows)
- LPB (interrogatory objection law)

**Produces:**
- OA-ROG Assessment Report
- Modification Recommendations

# OA-ROG (Objection Analyzer — Interrogatories) — v1.0

## What This Skill Does

Performs deep legal analysis of objections to interrogatories, assessing each
objection for validity under applicable rules (FRCP 33 / NMRA 1-033) and
generating actionable recommendations. Unlike the DPB (which tracks objection
*states*), OA-ROG evaluates the *legal merit* of each objection and proposes
concrete modifications to overcome valid objections.

Interrogatories have unique legal characteristics that require specialized analysis:
- Answers are under oath and can be used at trial (FRCP 33(c))
- Contention interrogatories permitted but may be deferred (FRCP 33(a)(2))
- Number limitations: 25 in federal court without leave (FRCP 33(a)(1))
- Subparts count toward the limit — subpart analysis is critical
- "Business records" option allows production in lieu of answer (FRCP 33(d))
- Evasive or incomplete answers treated as failure to answer (FRCP 37(a)(4))

## Architecture

```
DPB PACKET (ROG rows) ───┐
                          ├── OA-ROG ──► Assessment Report
LPB PACKET (ROG law) ─────┘              + Modification Recs
                                          + Validity Matrix
                                              │
                          ┌───────────────────┘
                          ▼
                    OCN (compromise)
                    DRP (respond to incoming)
                    GFL (good faith letter)
                    MTC (motion to compel)
```

## Modes

| Mode | Direction | Purpose |
|------|-----------|---------|
| **ANALYZE-OUTGOING** | We served ROGs, they objected | Evaluate validity of their objections to our interrogatories |
| **ANALYZE-INCOMING** | They served ROGs on us | Evaluate our potential objections before responding |
| **SUBPART-AUDIT** | Either direction | Analyze subpart counting for number-limitation compliance |

## Pack Locations (v1.1)

**Read DPB from:** `cases/{CASE_CODE}/dpb/`
**Read LP from:** `law-packs/`
**Save review output to:** `cases/{CASE_CODE}/drafts/`

## Hard Rules

1. **Pack-First:** Every objection analyzed must trace to a DPB row (SetID + ReqNum).
   Every legal standard cited must trace to an LPB row (LawTag + Pinpoint).
2. **Never invent** objection language, request text, case citations, or rule numbers.
3. **Binary validity assessment:** Each objection must be classified as VALID, INVALID,
   PARTIALLY-VALID, or WAIVED — no hedging without classification.
4. **Modification required for VALID objections:** If an objection is VALID, the skill
   MUST produce at least one concrete modification recommendation.
5. **Preserve verbatim objection text** from DPB ObjText. Paraphrase only in Analysis.
6. **ROG-specific standards only.** Do not apply RFA or RFP standards to ROG objections.
7. **Subpart counting:** Apply the "discrete subpart" test — count only logically
   independent subparts, not grammatically separate clauses.
8. **Contention interrogatory awareness:** Flag contention interrogatories and note
   timing implications (may be premature before discovery closes).
9. **Business records option:** When objecting party invokes FRCP 33(d), assess
   whether the conditions are met (burden of deriving the answer substantially the
   same, records specified with reasonable particularity).

## Objection Categories (ROG-Specific)

### Common Interrogatory Objections and Validity Tests

| Objection Type | Validity Test | If Valid → Modification |
|----------------|---------------|------------------------|
| **Vague/Ambiguous** | Does the interrogatory use undefined terms with multiple meanings? | Define the term; add parenthetical clarification |
| **Overbroad** | Does the interrogatory seek information beyond scope of claims/defenses? | Limit to relevant time period, subject matter, or parties |
| **Unduly Burdensome** | Is the effort to answer disproportionate to the case needs? | Narrow scope; limit to specific categories |
| **Compound/Subparts** | Does the interrogatory contain discrete subparts exceeding the limit? | Restructure; prioritize subparts; seek leave |
| **Premature Contention** | Does the contention ROG come before adequate fact discovery? | Defer to close of discovery; limit to facts known now |
| **Calls for Legal Conclusion** | Does the ROG require a purely legal opinion? | Reframe to seek factual basis for legal position |
| **Privilege/Work Product** | Does answering require disclosure of privileged material? | Narrow to non-privileged facts; request privilege log |
| **Already Answered** | Was the substance already provided in prior discovery? | Identify specific prior response; request verification |
| **Seeks Expert Opinion** | Does the ROG seek expert analysis before expert designation? | Defer to expert phase; limit to lay knowledge |
| **Disproportionate** | FRCP 26(b)(1) proportionality factors weigh against answering | Limit temporal scope; limit to key players; sample |

## Required Inputs

### Always Required

```xml
<evidence_layer>
[DPB PACKET — ROG rows only. Must include:
 SetType=ROG, ReqNum, ReqText, ObjText, AnswerText,
 State, ObjBasis_LPB]
</evidence_layer>

<legal_layer>
[LPB PACKET — interrogatory objection law:
 FRCP 33 / NMRA 1-033 standards, scope of discovery,
 subpart counting rules, contention interrogatory doctrine,
 business records option (FRCP 33(d)),
 evasive/incomplete answer doctrine (FRCP 37(a)(4))]
[Must be PACK-READY / PackReady=Yes rows only]
</legal_layer>
```

### Optional

- `<case_context>` — CFP excerpt showing relevance of interrogatories to claims/defenses
- `<strategic_layer>` — PCM/PDM showing which elements the ROGs target
- Scheduling order (for contention interrogatory timing analysis)
- Prior interrogatory answers (for supplementation analysis)

## Output Contract (Required Order)

### 1. Validity Matrix

| ReqNum | ObjType | Validity | Basis | Modification Available | Priority |
|--------|---------|----------|-------|----------------------|----------|
| ROG-1 | Overbroad | VALID | No temporal limit | Add date range | HIGH |
| ROG-4 | Compound | PARTIALLY-VALID | 3 subparts, limit is 25 total | Split | MEDIUM |
| ROG-7 | Privilege | VALID | Seeks atty-client comms | Narrow to facts | HIGH |

### 2. Subpart Audit (if applicable)

| ROG# | Text | Discrete Subparts | Count | Notes |
|------|------|--------------------|-------|-------|
| ROG-1 | "State all facts..." | 1 | 1 | Single question despite broad scope |
| ROG-5 | "For each document: (a) identify, (b) describe, (c) state custodian" | 3 | 3 | Discrete subparts |
| **TOTAL** | | | **[N]/25** | [WITHIN LIMIT / EXCEEDS LIMIT] |

### 3. Request-by-Request Analysis

For each ROG with objections:

```
**Interrogatory No. [ReqNum]**

*Request:* [Verbatim from DPB ReqText]
*Objection(s):* [Verbatim from DPB ObjText]
*Answer (if any):* [Summary from DPB AnswerText]

*Objection Validity Assessment:*
- Objection Type: [category from table above]
- Validity: [VALID / INVALID / PARTIALLY-VALID / WAIVED]
- Legal Basis: [LPB authority + pinpoint]
- Reasoning: [Why valid/invalid under applicable standard]

*If VALID or PARTIALLY-VALID:*
- Modification Recommendation: [specific proposed modification]
- Modified ROG Text: [exact proposed rewording]
- Expected Effect: [Why modification cures the objection]

*If INVALID or WAIVED:*
- Deficiency: [Why objection fails]
- Authority: [LPB citation showing objection is insufficient]
- Recommended Action: [Demand withdrawal / include in GFL / include in MTC]
```

### 4. Evasive/Incomplete Answer Analysis

For ROGs with answers that technically respond but may be insufficient:

| ReqNum | Answer Summary | Evasive? | Incomplete? | Missing Information | FRCP 37(a)(4) Applies? |
|--------|---------------|----------|-------------|--------------------|-----------------------|

### 5. Modification Summary

```
MODIFICATIONS FOR OCN HANDOFF:
- ROG-1: Add temporal limitation "from [date] to [date]"
- ROG-4: Split into ROG-4a, ROG-4b, ROG-4c
- ROG-7: Narrow to "facts known to you, excluding communications with counsel"
```

### 6. Cite Table

| # | Assertion | Evidence (SetID/ReqNum or LawTag + Pinpoint) | Confidence | Notes |
|---|-----------|----------------------------------------------|------------|-------|

### 7. Gate Results
- Traceability: [PASS/FAIL]
- ROG-Specific Standards: [PASS/FAIL] — applied FRCP 33 / NMRA 1-033, not RFA/RFP standards
- Subpart Count: [PASS/FAIL] — verified subpart counting if applicable
- Modification Coverage: [PASS/FAIL] — every VALID objection has a modification recommendation
- Pack Status: [PASS/FAIL]

### 8. Next Requests

## Integration Points

| System | How OA-ROG Connects |
|--------|-------------------|
| **DPB** | Consumes ROG-filtered DPB rows. Reads ObjText, ReqText, AnswerText, State, ObjBasis_LPB. |
| **LPB** | Consumes interrogatory objection law. All legal standards from LPB rows. |
| **OCN** | Feeds VALID/PARTIALLY-VALID objections + modification recommendations to OCN for compromise proposals. |
| **DRP** | When Direction=Incoming, DRP calls OA-ROG to evaluate whether to object to ROGs served on us. |
| **GFL** | INVALID objection findings feed GFL request-by-request analysis. |
| **MTC** | INVALID + WAIVED findings feed MTC argument sections. |
| **DRS** | DRS (Discovery Response Sufficiency) analyzes the *substance* of answers; OA-ROG analyzes *objections*. |
| **PCM/PDM** | Element_ID linkage shows which claim/defense elements are affected by each ROG. |
| **TOH** | Trial objection handling for ROG-related admissibility disputes (answers under oath). |
