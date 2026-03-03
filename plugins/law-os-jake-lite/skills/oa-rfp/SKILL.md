---
name: oa-rfp
display_name: "Objection Analyzer — RFP"
description: >-
  Objection Analyzer — Requests for Production (OA-RFP). Evaluates objections
  to document requests and objections raised in response to requests for
  production for legal validity, identifies waived or insufficiently specific
  objections, and generates modification recommendations to cure valid
  objections while preserving the right to obtain relevant documents. Feeds
  OCN (Objection Compromise Negotiator) and DRP (Discovery Responder Plugin).
  TRIGGERS: Use this skill when the user mentions "RFP objection analysis",
  "analyze RFP objections", "production objections", "request for production
  objections", "document request objections", "RFP validity", "respond to RFP
  objections", "object to RFP", "RFP modifications", or wants to evaluate
  whether objections to requests for production are legally valid or how to
  overcome them. Do NOT use for RFAs (use oa-rfa) or interrogatories (use
  oa-rog) (v1.0)
version: "1.0"
category: discovery-review
pack_consumes:
  - DPB
  - LPB
pack_produces:
  - OA-RFP assessment report
checkpoints: 0
author: "Parnall & Adams"
license: Proprietary
---

## Pack Dependencies
**Consumes:**
- DPB (RFP-filtered rows)
- LPB (production objection law)

**Produces:**
- OA-RFP Assessment Report
- Modification Recommendations

# OA-RFP (Objection Analyzer — Requests for Production) — v1.0

## What This Skill Does

Performs deep legal analysis of objections to Requests for Production, assessing
each objection for validity under applicable rules (FRCP 34 / NMRA 1-034) and
generating actionable recommendations. Unlike the DPB (which tracks objection
*states*), OA-RFP evaluates the *legal merit* of each objection and proposes
concrete modifications to overcome valid objections.

Requests for Production have unique legal characteristics that require specialized analysis:
- Must describe items with "reasonable particularity" (FRCP 34(b)(1)(A))
- Response must state whether production will be permitted and either produce or
  object with specificity (FRCP 34(b)(2))
- ESI-specific rules: form of production, accessibility, cost-shifting (FRCP 34(b)(1)(C))
- Production must be organized as kept in the ordinary course OR labeled to
  correspond with request categories (FRCP 34(b)(2)(E))
- Privilege log required for withheld documents (FRCP 26(b)(5))
- Proportionality analysis often central to RFP disputes

## Architecture

```
DPB PACKET (RFP rows) ───┐
                          ├── OA-RFP ──► Assessment Report
LPB PACKET (RFP law) ─────┘              + Modification Recs
DPB Productions tab ──── optional ──────► Completeness audit
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
| **ANALYZE-OUTGOING** | We served RFPs, they objected | Evaluate validity of their objections to our RFPs |
| **ANALYZE-INCOMING** | They served RFPs on us | Evaluate our potential objections before responding |
| **PRODUCTION-AUDIT** | Post-production | Assess completeness and compliance of document production |
| **ESI-DISPUTE** | Either direction | Specialized ESI form/accessibility/cost analysis |

## Pack Locations (v1.1)

**Read DPB from:** `cases/{CASE_CODE}/dpb/`
**Read LP from:** `law-packs/`
**Save review output to:** `cases/{CASE_CODE}/drafts/`

## Hard Rules

1. **Pack-First:** Every objection analyzed must trace to a DPB row (SetID + ReqNum).
   Every legal standard cited must trace to an LPB row (LawTag + Pinpoint).
2. **Never invent** objection language, request text, Bates ranges, case citations, or rule numbers.
3. **Binary validity assessment:** Each objection must be classified as VALID, INVALID,
   PARTIALLY-VALID, or WAIVED — no hedging without classification.
4. **Modification required for VALID objections:** If an objection is VALID, the skill
   MUST produce at least one concrete modification recommendation.
5. **Preserve verbatim objection text** from DPB ObjText. Paraphrase only in Analysis.
6. **RFP-specific standards only.** Do not apply RFA or ROG standards to RFP objections.
7. **Production completeness tracking:** When Productions tab is available, cross-reference
   produced documents against request scope for completeness.
8. **ESI awareness:** Flag ESI-specific issues (form of production, reasonably accessible
   vs. not reasonably accessible, cost-shifting, metadata preservation).
9. **Privilege log analysis:** If privilege is asserted, check whether a privilege log
   has been provided and whether it meets the requirements of FRCP 26(b)(5)(A).

## Objection Categories (RFP-Specific)

### Common RFP Objections and Validity Tests

| Objection Type | Validity Test | If Valid → Modification |
|----------------|---------------|------------------------|
| **Vague/Ambiguous** | Does the request use undefined terms susceptible to multiple interpretations? | Define terms; add parenthetical clarification |
| **Overbroad** | Does the request sweep in irrelevant documents beyond scope of claims/defenses? | Limit by date range, custodian, subject matter, or document type |
| **Unduly Burdensome** | Is the cost/effort of collection/review disproportionate? | Limit custodians; use search terms; phased production |
| **Disproportionate** | FRCP 26(b)(1) proportionality factors weigh against full production | Sampling; custodian limits; date limits; cost-sharing |
| **Not Reasonably Accessible** | ESI stored in inaccessible format (backup tapes, legacy systems) | Cost-shifting; sampling; specify accessible sources first |
| **Privilege/Work Product** | Documents contain privileged or work product material | Narrow to non-privileged categories; privilege log; in camera review |
| **Duplicate/Cumulative** | Documents already produced or available from another source (FRCP 26(b)(2)(C)) | Identify prior production; specify what is new |
| **Not in Possession/Custody/Control** | Responding party does not have the documents | Challenge control analysis; subpoena third party |
| **Trade Secret/Confidential** | Documents contain proprietary business information | Protective order; attorneys-eyes-only designation |
| **Form of Production** | Dispute over native vs. TIFF/PDF vs. other format | Specify form; meet and confer on ESI protocol |
| **Already Produced** | Documents previously produced in same or related litigation | Identify specific Bates ranges; confirm completeness |
| **Reasonable Particularity** | Request does not describe items with reasonable particularity (FRCP 34(b)(1)(A)) | Rewrite with specific document categories, date ranges, custodians |

## Required Inputs

### Always Required

```xml
<evidence_layer>
[DPB PACKET — RFP rows only. Must include:
 SetType=RFP, ReqNum, ReqText, ObjText, AnswerText,
 State, ObjBasis_LPB]
[If available: Productions tab with Bates ranges, CompletionFlag]
</evidence_layer>

<legal_layer>
[LPB PACKET — RFP objection law:
 FRCP 34 / NMRA 1-034 standards, scope of discovery,
 proportionality factors, ESI rules,
 privilege log requirements (FRCP 26(b)(5)),
 production organization requirements (FRCP 34(b)(2)(E))]
[Must be PACK-READY / PackReady=Yes rows only]
</legal_layer>
```

### Optional

- `<case_context>` — CFP excerpt showing relevance of requested documents
- `<strategic_layer>` — PCM/PDM showing which elements the RFPs target
- ESI protocol / discovery plan (for form-of-production disputes)
- Privilege log (for privilege objection analysis)
- Protective order (for confidentiality objection analysis)

## Output Contract (Required Order)

### 1. Validity Matrix

| ReqNum | ObjType | Validity | Basis | Modification Available | Priority |
|--------|---------|----------|-------|----------------------|----------|
| RFP-1 | Overbroad | VALID | No date limit on 15-year-old company | Limit to 2020-present | HIGH |
| RFP-3 | Privilege | PARTIALLY-VALID | Some docs privileged, no log provided | Demand privilege log | HIGH |
| RFP-8 | Burden | INVALID | No evidence of disproportionate burden | N/A | MEDIUM |

### 2. Request-by-Request Analysis

For each RFP with objections:

```
**Request for Production No. [ReqNum]**

*Request:* [Verbatim from DPB ReqText]
*Objection(s):* [Verbatim from DPB ObjText]
*Response:* [Summary from DPB AnswerText — did they agree to produce subject to objections?]

*Objection Validity Assessment:*
- Objection Type: [category from table above]
- Validity: [VALID / INVALID / PARTIALLY-VALID / WAIVED]
- Legal Basis: [LPB authority + pinpoint]
- Reasoning: [Why valid/invalid under applicable standard]

*If VALID or PARTIALLY-VALID:*
- Modification Recommendation: [specific proposed modification]
- Modified RFP Text: [exact proposed rewording]
- Expected Effect: [Why modification cures the objection]

*If INVALID or WAIVED:*
- Deficiency: [Why objection fails]
- Authority: [LPB citation showing objection is insufficient]
- Recommended Action: [Demand withdrawal / include in GFL / include in MTC]

*Production Completeness (if Productions tab available):*
- Documents Produced: [Bates range from DPB Productions]
- Completeness: [COMPLETE / INCOMPLETE / NOT PRODUCED]
- Gaps: [specific missing categories or documents]
```

### 3. ESI Analysis (if applicable)

| Issue | Request(s) | Current Status | Recommendation |
|-------|-----------|----------------|----------------|
| Form of production | RFP-2, RFP-5 | Produced as TIFF, native requested | Meet and confer on ESI protocol |
| Accessibility | RFP-12 | Backup tapes claimed inaccessible | Challenge; request cost estimate; propose cost-sharing |
| Metadata | RFP-3 | Metadata stripped | Request reproduction with metadata |

### 4. Privilege Log Audit (if applicable)

| ReqNum | Privilege Claimed | Log Provided? | Log Sufficient? | Deficiency |
|--------|-------------------|---------------|-----------------|------------|

### 5. Modification Summary

```
MODIFICATIONS FOR OCN HANDOFF:
- RFP-1: Limit to "documents created or modified between January 1, 2020 and present"
- RFP-3: Narrow to "non-privileged documents; provide privilege log per FRCP 26(b)(5)"
- RFP-6: Limit custodians to [named individuals with knowledge of relevant events]
- RFP-9: Define "communications" to mean "written correspondence, email, text messages"
```

### 6. Cite Table

| # | Assertion | Evidence (SetID/ReqNum or LawTag + Pinpoint) | Confidence | Notes |
|---|-----------|----------------------------------------------|------------|-------|

### 7. Gate Results
- Traceability: [PASS/FAIL]
- RFP-Specific Standards: [PASS/FAIL] — applied FRCP 34 / NMRA 1-034, not RFA/ROG standards
- ESI Compliance: [PASS/FAIL] — ESI-specific rules applied where relevant
- Modification Coverage: [PASS/FAIL] — every VALID objection has a modification recommendation
- Privilege Log Check: [PASS/FAIL] — privilege assertions paired with log analysis
- Pack Status: [PASS/FAIL]

### 8. Next Requests

## Integration Points

| System | How OA-RFP Connects |
|--------|-------------------|
| **DPB** | Consumes RFP-filtered DPB rows + Productions tab. Reads ObjText, ReqText, AnswerText, State, ObjBasis_LPB, Bates ranges. |
| **LPB** | Consumes RFP/production objection law. All legal standards from LPB rows. |
| **OCN** | Feeds VALID/PARTIALLY-VALID objections + modification recommendations to OCN for compromise proposals. |
| **DRP** | When Direction=Incoming, DRP calls OA-RFP to evaluate whether to object to RFPs served on us. |
| **GFL** | INVALID objection findings feed GFL request-by-request analysis. |
| **MTC** | INVALID + WAIVED findings feed MTC argument sections. |
| **DRS** | DRS analyzes sufficiency of the *production itself*; OA-RFP analyzes the *objections*. |
| **PCM/PDM** | Element_ID linkage shows which claim/defense elements are affected by each RFP. |
| **TOH** | Trial objection handling for RFP-related document admissibility disputes. |
