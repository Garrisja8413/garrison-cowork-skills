---
name: mtc
display_name: "Motion to Compel"
description: >-
  Motion to Compel (MTC) — Pack-First, Direct-Output drafting skill for FRCP
  37(a) / NMRA 1-037 motions to compel discovery. Consumes DPB PACKET
  (MTC-filtered deficiencies with
  CURE-FAILED/OBJECTION-ONLY/EVASIVE/NO-RESPONSE states) + LPB PACKET
  (discovery compulsion authority) to produce BODY-ONLY motion text with Cite
  Table and Gate Results. Generates Word documents. TRIGGERS: Use this skill
  whenever the user mentions "motion to compel", "MTC", "compel discovery",
  "Rule 37 motion", "FRCP 37", "NMRA 1-037", "compel responses", "compel
  production", "compel answers", "force discovery", "discovery motion",
  "PB-MTC-01", or wants to draft a motion compelling discovery
  responses/production. Also use when user uploads a DPB packet filtered for
  MTC use. Do NOT use for Good Faith Letters — use gfl skill instead. Do NOT
  use for MSJ — use msj skill instead (v1.0)
version: "1.0"
category: drafting
pack_consumes:
  - DPB
  - LPB
  - GFL
  - CFP (optional)
pack_produces:
  - BODY-ONLY motion to compel
checkpoints: 2
author: "Parnall & Adams"
license: Proprietary
---

# MTC (Motion to Compel) — v1.0

## What This Skill Does

Drafts the BODY-ONLY text of a motion to compel discovery responses under
FRCP 37(a) or NMRA 1-037. The motion addresses each deficient discovery
request individually, demonstrates that the objections are legally insufficient
or that the responses are evasive/incomplete, and requests specific relief.

This skill implements **PB-MTC-01** from the Prompt Blocks library.

## Architecture: Pack-First, Direct-Output

```
DPB PACKET (MTC filter) ─┐
                          ├── MTC Skill ──► BODY-ONLY Motion
LPB PACKET (compel law) ──┘                + Cite Table + Gates
GFL (prior letter) ──── required ─────────► Good faith evidence
CFP (meet-confer log) ── optional ────────► Conference timeline
```

A motion to compel should normally follow a GFL that went uncured.
The DPB states eligible for MTC are: OBJECTION-ONLY, EVASIVE,
CURE-FAILED, NO-RESPONSE, OBJECTION-WAIVED.

## Hard Rules

1. **Pack-First:** Every factual assertion must trace to a DPB row (SetID + ReqNum).
   Every legal assertion must trace to an LPB row (LawTag + Pinpoint).
   No Pack row → no assertion.
2. **Direct-Output:** SA generates the Word shell (caption, COS, signature block,
   merge tokens). This skill provides BODY-ONLY text for the argument section.
3. **BODY-ONLY output:** No caption, no certificate of service, no signature block,
   no verification. Those come from the SA shell.
4. **Cite Table gate:** Every assertion must appear in the Cite Table with
   supporting evidence (DPB row or LPB authority + pinpoint).
5. **Never invent:** No invented request numbers, response text, objection language,
   Bates ranges, case citations, rule numbers, dates, or pinpoints.
   Missing support → `CITE NEEDED` or `[VERIFY-CITE]`.
6. **Preserve merge tokens exactly.** Never modify or invent merge tokens.
7. **Good faith prerequisite:** The motion must reference prior good faith efforts.
   If no GFL or meet-confer evidence is provided, flag as `[DECISION REQUIRED]`:
   "No good faith letter or conference documentation provided."
8. **Token fail-safe:** If the motion is extensive, chunk output:
   Part 1 = BODY-ONLY motion text. Part 2 = Cite Table + Gate Results.

## Required Inputs

### Always Required

```xml
<evidence_layer>
[DPB PACKET — MTC-filtered: State ∈ {OBJECTION-ONLY, EVASIVE, CURE-FAILED,
  NO-RESPONSE, OBJECTION-WAIVED}]
[Include: Set Metadata + Discovery Deficiencies + Productions Index]
[Also include: Prior GFL date + cure deadline status]
</evidence_layer>

<legal_layer>
[LPB PACKET — discovery compulsion authority:
  motion to compel standards, objection waiver, burden-shifting,
  scope of discovery, proportionality, sanctions/expenses]
[Must be PACK-READY / PackReady=Yes rows only]
</legal_layer>
```

### Optional (Strengthens Motion)

- `<meet_confer_log>` — timeline of good faith efforts
- `<strategic_layer>` — PCM showing which elements are blocked by discovery gaps
- `<behavioral_layer>` — target judge profile (influences tone/structure)
- Prior GFL (if not already summarized in the DPB packet)

### If Inputs Are Missing

If no DPB packet: **"Run the DPB skill first (EXTRACT → ENRICH → VERIFY → PACKET with MTC filter)."**
If no LPB packet: **"Run the LPB skill to extract discovery compulsion authority, then generate a PACKET."**
If no prior GFL: Flag `[DECISION REQUIRED]` but continue drafting.

## Attorney Checkpoints

This skill pauses at two decision points (see `shared/templates/checkpoint-protocol.md`):

**⛔ CHECKPOINT 1: Deficiency Prioritization** — After loading DPB packet and
analyzing all deficient requests. Present: (a) deficient requests ranked by
severity and strategic importance, (b) which deficiencies to lead with in the
motion, (c) any borderline requests where compulsion may not succeed. Attorney
selects which deficiencies to include and the leading order.

**⛔ CHECKPOINT 2: Remedy & Tone** — After drafting the argument section,
before final output. Present: (a) proposed remedies per request (produce
documents, answer interrogatory, compel deposition, etc.), (b) whether to
request sanctions/expenses, (c) tone calibration (aggressive vs. measured).
Attorney confirms remedies, sanctions position, and tone.

## Motion Structure

Read `references/motion-structure.md` for the detailed template. Summary:

### I. Introduction
- Brief statement of what is sought (number of requests, type of discovery)
- Statement that good faith efforts have been exhausted
- Summary of deficiency pattern (if one exists)

### II. Factual Background
- Discovery timeline: when served, when responded, when GFL sent, cure deadline
- All dates from DPB Set_Metadata and GFL documentation
- No characterization of opposing counsel — just facts

### III. Legal Standard
- Motion to compel standard (FRCP 37(a) / NMRA 1-037)
- Scope of discovery (FRCP 26(b)(1) / NMRA 1-026(B))
- Burden allocation (responding party bears burden to justify objection)
- Waiver doctrine (untimely or insufficiently specific objections)
- All citations from LPB with pinpoints

### IV. Argument — General Objections
- If DPB shows boilerplate objections across multiple requests
- Statement of law that general objections are insufficient
- Analysis of each general objection
- Request to overrule

### V. Argument — Request-by-Request
For each deficient request (from DPB packet):

```
A. [SetType] No. [ReqNum]

[Respondent] was asked to [brief summary of request — from DPB ReqText].
[Respondent] objected on the grounds that [objection summary — from DPB ObjText].
[If any answer:] [Respondent] provided only: "[AnswerText summary]."
[If no answer:] No substantive response was provided.

This request seeks information directly relevant to [element/claim —
from DPB Element_ID if available]. [Explain relevance and narrow tailoring].

The [objection type] objection fails because [legal analysis citing LPB
authority + pinpoint]. [If waiver applies:] Moreover, this objection was
waived because [cite waiver authority + pinpoint].

[If productions incomplete — from DPB Productions tab:]
The production provided ([BatesStart]–[BatesEnd]) is incomplete because
[gap analysis — from DPB CompletionFlag/Notes].

The Court should compel [Respondent] to [specific relief: withdraw objection /
provide verified answer / produce documents / supplement].
```

### VI. Sanctions / Expenses
- FRCP 37(a)(5) / NMRA 1-037 — expenses of the motion
- Responding party's conduct warranting sanctions (if applicable)
- Request for attorney's fees and costs
- Citation to LPB authority

### VII. Conclusion
- Specific relief requested
- Request for hearing (if appropriate for jurisdiction)

## Output Contract (Required Order)

1. **BODY-ONLY Motion Text** (Sections I–VII)
2. **---** (divider)
3. **Cite Table**

| # | Assertion | Evidence (SetID/ReqNum or LawTag + Pinpoint) | Confidence | Notes |
|---|-----------|----------------------------------------------|------------|-------|

4. **Gate Results**
   - Traceability: [PASS/FAIL] — all facts from DPB, all law from LPB
   - Status Gate: [PASS/FAIL] — all DPB rows PACK-READY, all LPB rows PackReady=Yes
   - Shepard Gate: [PASS/FAIL] — all LPB rows Shepardized (or flagged [VERIFY-CITE])
   - Good Faith Gate: [PASS/FAIL] — prior GFL or conference documented
   - Conflicts: [note any]
   - Merge-token integrity: [PASS/FAIL]

5. **Next Requests** — missing DPB rows, missing LPB authority, missing GFL docs

6. **Open Items**
   - `[VERIFY]` items (Shepard status, dates, rule numbers)
   - `[VERIFY-CITE]` items (unverified law)
   - `[DECISION REQUIRED]` items (strategic choices)

## Modes

| Mode | Input | Output |
|------|-------|--------|
| **FULL DRAFT** | DPB packet + LPB packet + GFL evidence | Full BODY-ONLY motion + Cite Table + Gates |
| **PARTIAL** | DPB packet (subset of requests) + LPB | Targeted motion addressing only specified requests |
| **SUPPLEMENT** | Prior MTC draft + new DPB/LPB data | Additional argument sections for newly-deficient requests |
| **SANCTIONS ONLY** | DPB packet + LPB sanctions authority | Standalone sanctions/expenses argument section |

## Pack Locations (v1.1)

**Read CFP from:** `cases/{CASE_CODE}/cfp/`
**Read DPB from:** `cases/{CASE_CODE}/dpb/` (if applicable to this skill)
**Read LP from:** `law-packs/` (global) + `law-packs/law-of-the-case/{CASE_CODE}/` (if exists)
**Save draft output to:** `cases/{CASE_CODE}/drafts/`
**Naming:** `MTC-{CASE_CODE}-{Descriptor}-DRAFT.docx`

**Law-of-the-case check:** Before drafting, check whether `law-packs/law-of-the-case/{CASE_CODE}/` contains an LOTC pack. If it does, load it alongside the global LP. Flag any LOTC overrides in the Cite Table with `[LOTC]` tag so the attorney knows which legal points are governed by case-specific rulings.

## Jurisdiction-Specific Rules

Read `references/jurisdiction-rules.md` for NM vs FED differences.

### New Mexico (NMRA 1-037)
- Meet-and-confer required (no specific certification form)
- Court may award expenses to prevailing party
- Proportionality analysis less formalized than federal

### Federal (D.N.M.) (FRCP 37(a) + LR-Civ 7.1(a))
- Good faith conference certification **required** (LR-Civ 7.1(a))
- Specific proportionality factors must be addressed (FRCP 26(b)(1))
- Expenses presumptively awarded to prevailing party (FRCP 37(a)(5))
- Judge-specific preferences may apply (check behavioral_layer)

## Integration Points

| System | How MTC Connects |
|--------|-----------------|
| **DPB** | MTC consumes DPB PACKET (MTC filter). States: OBJECTION-ONLY, EVASIVE, CURE-FAILED, NO-RESPONSE, OBJECTION-WAIVED. |
| **LPB** | MTC consumes LPB PACKET filtered to compulsion authority. LawTags cited in Cite Table. |
| **GFL** | Prior GFL provides good faith evidence. GFL date + cure deadline from DPB or GFL document. |
| **CFP** | Optional meet-confer log. Timeline of correspondence and conferences. |
| **PCM** | Optional strategic layer showing which claim elements are blocked by discovery gaps. |
| **SA** | Direct-Output: SA provides caption/COS shell. Save per Save Map: Motions → Discovery Motions. |

## Reference Files

- `references/motion-structure.md` — detailed section templates and examples
- `references/jurisdiction-rules.md` — NM vs FED standards and local rules
