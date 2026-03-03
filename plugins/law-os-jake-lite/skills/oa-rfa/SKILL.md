---
name: oa-rfa
display_name: "Objection Analyzer — RFA"
description: >-
  Objection Analyzer — Requests for Admission (OA-RFA). Evaluates objections
  to RFAs and objections raised in response to RFAs for legal validity,
  identifies waived or insufficiently specific objections, and generates
  modification recommendations to cure valid objections while preserving the
  right to obtain admissions. Feeds OCN (Objection Compromise Negotiator) and
  DRP (Discovery Responder Plugin). TRIGGERS: Use this skill when the user
  mentions "RFA objection analysis", "analyze RFA objections", "admission
  objections", "request for admission objections", "RFA validity", "respond to
  RFA objections", "object to RFA", "RFA modifications", or wants to evaluate
  whether objections to requests for admission are legally valid or how to
  overcome them. Do NOT use for interrogatories (use oa-rog) or requests for
  production (use oa-rfp) (v1.0)
version: "1.0"
category: discovery-review
pack_consumes:
  - DPB
  - LPB
pack_produces:
  - OA-RFA assessment report
checkpoints: 0
author: "Parnall & Adams"
license: Proprietary
---

## Pack Dependencies
**Consumes:**
- DPB (RFA-filtered rows)
- LPB (RFA objection law + admission law)

**Produces:**
- OA-RFA Assessment Report
- Modification Recommendations

# OA-RFA (Objection Analyzer — Requests for Admission) — v1.0

## What This Skill Does

Performs deep legal analysis of objections to Requests for Admission, assessing
each objection for validity under applicable rules (FRCP 36 / NMRA 1-036) and
generating actionable recommendations. Unlike the DPB (which tracks objection
*states*), OA-RFA evaluates the *legal merit* of each objection and proposes
concrete modifications to overcome valid objections.

RFAs have unique legal characteristics that require specialized analysis:
- Unanswered RFAs can be deemed admitted (FRCP 36(a)(3))
- The standard for objection differs from ROGs and RFPs
- Admissions are binding judicial admissions — stakes are highest
- The right to amend/withdraw admissions requires court leave (FRCP 36(b))
- Number limitations apply in federal court (25 without leave under FRCP 36)

## Architecture

```
DPB PACKET (RFA rows) ───┐
                          ├── OA-RFA ──► Assessment Report
LPB PACKET (RFA law) ─────┘              + Modification Recs
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
| **ANALYZE-OUTGOING** | We served RFAs, they objected | Evaluate validity of their objections to our RFAs |
| **ANALYZE-INCOMING** | They served RFAs on us | Evaluate our potential objections before responding |
| **ASSESS-DEEMED** | Either direction | Analyze whether admissions should be deemed admitted |

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
6. **RFA-specific standards only.** Do not apply ROG or RFP standards to RFA objections.
7. **Deemed-admission tracking:** Flag any RFA where the response deadline has passed
   without response — these may be deemed admitted under FRCP 36(a)(3).
8. **Number-limitation awareness:** In federal court, flag if total RFAs exceed 25
   (FRCP 36(a)(2)) without stipulation or leave.

## Objection Categories (RFA-Specific)

### Common RFA Objections and Validity Tests

| Objection Type | Validity Test | If Valid → Modification |
|----------------|---------------|------------------------|
| **Vague/Ambiguous** | Does the RFA use terms with multiple reasonable interpretations? | Define the term; narrow the scope |
| **Compound** | Does the RFA contain multiple discrete facts requiring separate admissions? | Break into individual RFAs |
| **Legal Conclusion** | Does the RFA ask for a pure legal conclusion vs. application of law to fact? | Reframe as factual application |
| **Irrelevant** | Is the RFA not reasonably calculated to lead to admissible evidence? | Show relevance chain to claim/defense element |
| **Unduly Burdensome** | Does answering impose burden disproportionate to the case? | Narrow scope or quantity |
| **Premature Expert** | Does the RFA seek expert opinion before expert discovery? | Defer to expert phase or limit to lay knowledge |
| **Privilege** | Does answering require disclosure of privileged material? | Request privilege log; narrow to non-privileged facts |
| **Not Within Knowledge** | Responding party claims lack of knowledge after reasonable inquiry | Challenge adequacy of inquiry |
| **Improper — Authenticity** | RFA seeks authentication but document not attached or identified | Attach document or provide Bates reference |

## Required Inputs

### Always Required

```xml
<evidence_layer>
[DPB PACKET — RFA rows only. Must include:
 SetType=RFA, ReqNum, ReqText, ObjText, AnswerText, AdmissionResult,
 State, ObjBasis_LPB]
</evidence_layer>

<legal_layer>
[LPB PACKET — RFA objection law:
 FRCP 36 / NMRA 1-036 standards, admission law,
 objection sufficiency requirements, deemed admission doctrine,
 withdrawal/amendment standards (FRCP 36(b))]
[Must be PACK-READY / PackReady=Yes rows only]
</legal_layer>
```

### Optional

- `<case_context>` — CFP excerpt showing relevance of requested admissions to claims/defenses
- `<strategic_layer>` — PCM/PDM showing which elements the RFAs target
- Prior RFA responses (for ANALYZE-OUTGOING mode)
- Court scheduling order (for deadline/deemed-admission analysis)

## Output Contract (Required Order)

### 1. Validity Matrix

| ReqNum | ObjType | Validity | Basis | Modification Available | Priority |
|--------|---------|----------|-------|----------------------|----------|
| RFA-1 | Vague | VALID | "Good cause" undefined | Define term | HIGH |
| RFA-3 | Compound | PARTIALLY-VALID | Contains 2 facts | Split into RFA-3a, RFA-3b | MEDIUM |
| RFA-5 | Irrelevant | INVALID | Directly relevant to Element 2 | N/A | HIGH |

### 2. Request-by-Request Analysis

For each RFA with objections:

```
**RFA No. [ReqNum]**

*Request:* [Verbatim from DPB ReqText]
*Objection(s):* [Verbatim from DPB ObjText]
*Admission Result:* [Admitted/Denied/Objection-Only — from DPB AdmissionResult]

*Objection Validity Assessment:*
- Objection Type: [category from table above]
- Validity: [VALID / INVALID / PARTIALLY-VALID / WAIVED]
- Legal Basis: [LPB authority + pinpoint]
- Reasoning: [Why valid/invalid under applicable standard]

*If VALID or PARTIALLY-VALID:*
- Modification Recommendation: [specific proposed modification]
- Modified RFA Text: [exact proposed rewording]
- Expected Effect: [Why modification cures the objection]

*If INVALID or WAIVED:*
- Deficiency: [Why objection fails]
- Authority: [LPB citation showing objection is insufficient]
- Recommended Action: [Demand withdrawal / include in GFL / include in MTC]
```

### 3. Deemed Admission Analysis (if applicable)

| ReqNum | Response Deadline | Response Received | Status | Deemed Admitted? |
|--------|-------------------|-------------------|--------|-----------------|

### 4. Modification Summary

Grouped list of all recommended modifications, ready for OCN consumption:

```
MODIFICATIONS FOR OCN HANDOFF:
- RFA-1: Define "good cause" as [proposed definition]
- RFA-3: Split into RFA-3a (fact 1) and RFA-3b (fact 2)
- RFA-7: Limit temporal scope to [date range]
```

### 5. Cite Table

| # | Assertion | Evidence (SetID/ReqNum or LawTag + Pinpoint) | Confidence | Notes |
|---|-----------|----------------------------------------------|------------|-------|

### 6. Gate Results
- Traceability: [PASS/FAIL]
- RFA-Specific Standards: [PASS/FAIL] — applied FRCP 36 / NMRA 1-036, not ROG/RFP standards
- Modification Coverage: [PASS/FAIL] — every VALID objection has a modification recommendation
- Pack Status: [PASS/FAIL]

### 7. Next Requests

## Integration Points

| System | How OA-RFA Connects |
|--------|-------------------|
| **DPB** | Consumes RFA-filtered DPB rows. Reads ObjText, ReqText, AdmissionResult, State, ObjBasis_LPB. |
| **LPB** | Consumes RFA objection law. All legal standards from LPB rows. |
| **OCN** | Feeds VALID/PARTIALLY-VALID objections + modification recommendations to OCN for compromise proposals. |
| **DRP** | When Direction=Incoming, DRP calls OA-RFA to evaluate whether to object to RFAs served on us. |
| **GFL** | INVALID objection findings feed GFL request-by-request analysis. |
| **MTC** | INVALID + WAIVED findings feed MTC argument sections. |
| **CFP** | Deemed admissions feed CFP Admissions table directly. |
| **PCM/PDM** | Element_ID linkage shows which claim/defense elements are affected by each RFA. |
| **TOH** | Trial objection handling for RFA-related admissibility disputes. |
