---
name: trial-brief
display_name: "Trial Brief Drafter"
description: >-
  Trial Brief Drafter (TRIAL-BRIEF) — Pack-First, Direct-Output drafting skill
  for trial briefs and trial memoranda. Consumes CFP facts, LPB legal
  authority, PCM element mapping, and MSJ analysis to produce BODY-ONLY trial
  brief text with NML formatting compatibility. Supports plaintiff's trial
  brief, pretrial memoranda, and trial memoranda of law. TRIGGERS: Use this
  skill whenever the user mentions "trial brief", "TRIAL-BRIEF", "trial
  memorandum", "pretrial brief", "trial memo", "memorandum of law for trial",
  "trial preparation brief", "brief for trial", "trial legal memorandum",
  "pretrial memorandum", or wants to draft a brief summarizing legal issues
  and evidence for trial. Do NOT use for motions in limine (separate skill).
  Do NOT use for MSJ (use msj skill). Do NOT use for opening/closing (use
  opening-statement or closing-argument) (v1.0)
version: "1.0"
category: drafting
pack_consumes:
  - CFP
  - LPB
  - PCM
  - DC
pack_produces:
  - BODY-ONLY trial brief
checkpoints: 0
author: "Parnall & Adams"
license: Proprietary
---

## Pack Dependencies
**Consumes:**
- CFP
- LPB
- PCM
- DC

# TRIAL-BRIEF (Trial Brief Drafter) — v1.0

## What This Skill Does

Drafts the BODY-ONLY text of a trial brief or trial memorandum that presents the
plaintiff's legal theories, evidentiary foundation, element-by-element analysis,
and trial strategy to the court. The trial brief integrates all upstream Pack
data -- CFP facts verified through discovery, LPB legal authority Shepardized and
current, PCM element mapping showing proof status, and DC damages framework -- into
a comprehensive brief ready for NML formatting.

The trial brief is typically filed before trial per local rule or scheduling order
and serves as the court's roadmap for plaintiff's case.

## Architecture: Pack-First, Direct-Output

```
CFP PACKET (verified facts) ──┐
LPB PACKET (legal authority) ──┤
PCM (element proof matrix) ────┤── TRIAL-BRIEF Skill ──> BODY-ONLY Trial Brief
DC (damages framework) ────────┤                         + Cite Table + Gates
MSJ analysis (if any) ─────────┘                         + NML-ready output
```

The TRIAL-BRIEF skill is a **DRAFTING** skill. It consumes verified Pack data
and produces BODY-ONLY prose ready for NML formatting overlay and SA shell
integration.

## Hard Rules

1. **Pack-First:** Every factual assertion must trace to a CFP row (Fact# + Pinpoint).
   Every legal assertion must trace to an LPB row (LawTag + Pinpoint). Every
   element must map to a PCM row. No Pack row -> no assertion.
2. **Direct-Output:** SA generates the Word shell (caption, COS, signature block,
   merge tokens). This skill provides BODY-ONLY text for the brief body.
3. **BODY-ONLY output:** No caption, no certificate of service, no signature block,
   no verification. Those come from the SA shell.
4. **NML compatibility:** Output must conform to NML formatting standards. Use
   NML as the formatting overlay after TRIAL-BRIEF produces content.
5. **Cite Table gate:** Every assertion must appear in the Cite Table with
   supporting evidence source and pinpoint.
6. **Never invent:** No invented facts, testimony, exhibit contents, case
   citations, rule numbers, expert opinions, or damages figures.
   Missing support -> `CITE NEEDED`, `[VERIFY]`, or `[VERIFY-CITE]`.
7. **Preserve merge tokens exactly.** Never modify or invent merge tokens.
8. **Element completeness:** Address every element of every cause of action
   going to trial. If an element has weak proof, address it honestly with
   available evidence and flag as `[ELEMENT-RISK]`.
9. **Anticipate defense:** Address anticipated defense arguments and
   distinguish adverse authority. Do not ignore weaknesses.
10. **Token fail-safe:** If extensive, chunk: Part 1 = Statement of Case +
    Legal Standards, Part 2 = Argument, Part 3 = Cite Table + Gates.

## Required Inputs

### Always Required

```xml
<evidence_layer>
[CFP PACKET -- trial-ready facts:
  All facts with Status = DRAFT-READY or VERIFIED
  Timeline entries with exhibit/testimony support
  Witness list with anticipated testimony summaries]
[PCM -- element proof matrix showing evidence + authority per element:
  All causes of action going to trial
  Gap status for each element]
</evidence_layer>

<legal_layer>
[LPB PACKET -- trial authority:
  Elements of each cause of action (UJI definitions)
  Burden of proof standards
  Jury instruction authority
  Key case law with pinpoints
  Must be PACK-READY / PackReady=Yes rows only]
</legal_layer>
```

### Optional (Strengthens Brief)

- `<damages_layer>` -- DC damages framework with categories and ranges
- `<discovery_layer>` -- key deposition excerpts, admissions from DPB
- `<motion_history>` -- MSJ ruling, motions in limine outcomes
- `<behavioral_layer>` -- target judge profile (trial preferences)
- Exhibit list with Bates references
- Witness list with expected testimony summaries
- Jury instructions (proposed)

### If Inputs Are Missing

If no CFP packet: **"Run the CFP skill first to build the trial fact foundation."**
If no LPB packet: **"Run the LPB skill to extract trial authority and UJI element definitions."**
If no PCM: **"Run the PCM skill to map evidence and authority to each element. The trial brief requires element-by-element analysis."**

## Trial Brief Structure

### I. Introduction

- Brief statement of the case and claims going to trial
- Summary of plaintiff's strongest evidence
- Relief sought
- Maximum 1 page (per NML standards)

### II. Statement of the Case

- Procedural history (filing date, key rulings, discovery status)
- Nature of the claims remaining for trial
- Parties and their relationships

### III. Statement of Facts

- Chronological narrative supported by CFP facts
- Every material fact cited to exhibit or deposition transcript
- Organized to build the narrative arc for trial
- Record discipline: Bates or exhibit cite for every fact

### IV. Legal Standards

- Elements of each cause of action (from UJI / LPB)
- Burden of proof allocation
- Applicable legal standards (negligence, strict liability, etc.)
- NM-first authority hierarchy per NML rules

### V. Argument -- Element-by-Element Analysis

For each cause of action, for each element:

```
A. [CAUSE OF ACTION]: [Element Name]

[Legal standard from LPB with pinpoint citation]

[Application to facts from CFP with exhibit/deposition citations]

[PCM proof status: evidence supporting this element]

[If defense anticipated:] Defendant will likely argue [defense position].
This argument fails because [rebuttal with authority].
```

### VI. Damages

- Summary of damages categories going to trial
- UJI damages instruction mapping
- Key evidence supporting each category
- Expert testimony anticipated (if applicable)

### VII. Evidentiary Issues

- Key evidentiary rulings expected or already made
- Motions in limine status
- Foundation and admissibility for critical exhibits
- Anticipated objections and responses

### VIII. Conclusion

- Summary of why plaintiff is entitled to relief
- Specific relief requested
- Request for trial setting or confirmation

## Output Contract (Required Order)

1. **BODY-ONLY Trial Brief** (Sections I-VIII)
2. **---** (divider)
3. **Cite Table**

| # | Assertion | Evidence (CFP Fact#, LPB LawTag + Pinpoint, PCM Element_ID) | Type | Confidence | Notes |
|---|-----------|-------------------------------------------------------------|------|------------|-------|

4. **Gate Results**
   - Traceability: [PASS/FAIL] -- all facts from CFP, all law from LPB
   - Element Coverage: [PASS/FAIL] -- every element of every COA addressed
   - Status Gate: [PASS/FAIL] -- all CFP rows DRAFT-READY, all LPB rows PackReady=Yes
   - Shepard Gate: [PASS/FAIL] -- all LPB case rows Shepardized
   - Record Discipline: [PASS/FAIL] -- every material fact has exhibit/deposition cite
   - NML Compliance: [PASS/FAIL] -- output conforms to NML formatting standards
   - Conflicts: [note any]
   - Merge-token integrity: [PASS/FAIL]

5. **Next Requests** -- missing exhibit list, missing witness summaries,
   missing deposition excerpts, missing motion rulings

6. **Open Items**
   - `[VERIFY]` items (exhibit availability, deposition cites, dates)
   - `[VERIFY-CITE]` items (unverified legal authority)
   - `[ELEMENT-RISK]` items (elements with weak proof)
   - `[DECISION REQUIRED]` items (strategic choices, defense anticipation)

## Modes

| Mode | Input | Output |
|------|-------|--------|
| **FULL BRIEF** | CFP + LPB + PCM + DC | Complete trial brief (Sections I-VIII) |
| **LEGAL MEMO** | LPB + PCM + specific legal issues | Trial memorandum on discrete legal issues |
| **SUPPLEMENT** | Prior brief + new evidence/rulings | Supplemental trial brief addressing developments |
| **SECTION DRAFT** | Specific section request + relevant packs | Single section only (e.g., "draft the damages section") |

## Integration Points

| System | How TRIAL-BRIEF Connects |
|--------|-------------------------|
| **CFP** | TRIAL-BRIEF consumes CFP PACKET for all factual narrative with exhibit/deposition references. |
| **LPB** | TRIAL-BRIEF consumes LPB PACKET for legal standards, UJI elements, and case authority. |
| **PCM** | TRIAL-BRIEF uses PCM element mapping to ensure every element is addressed with evidence and authority. |
| **DC** | TRIAL-BRIEF consumes DC damages framework for the damages section. |
| **MSJ** | If MSJ was filed, the ruling informs which issues are resolved and which remain for trial. |
| **NML** | NML formatting overlay applied to TRIAL-BRIEF output for brief style compliance. |
| **JURY-INSTRUCTIONS** | JURY-INSTRUCTIONS element mapping informs the argument structure. |
| **SA** | Direct-Output: SA provides caption/COS shell. Save per Save Map: Trial Preparation -> Trial Briefs. |

## Reference Files

- `references/mode-standard.md` -- standard trial brief mode and section templates
- `references/mode-pretrial-memo.md` -- pretrial memorandum mode
- `references/nm-trial-brief-rules.md` -- NM trial brief requirements and local rules
- `references/output-format.md` -- output contract and format specifications
