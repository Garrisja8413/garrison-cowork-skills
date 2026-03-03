---
name: depo-outline
display_name: "Deposition Examination Outline"
description: >-
  Deposition Examination Outline (DEPO-OUTLINE) — Pack-First drafting skill
  that creates organized deposition examination outlines by element, topic,
  and witness. Consumes CFP facts, DPB responses, LPB legal standards, and PCM
  element mapping to produce structured outlines with impeachment
  opportunities flagged, document references, and strategic examination
  sequencing. TRIGGERS: Use this skill whenever the user mentions "deposition
  outline", "DEPO-OUTLINE", "depo outline", "depo prep", "deposition
  preparation", "deposition questions", "examination outline",
  "cross-examination outline", "depo strategy", "what to ask at deposition",
  "deposition topics", "witness examination plan", or wants to prepare
  questions/topics for a deposition. Do NOT use for deposition notices (use
  depo-notice). Do NOT use for transcript indexing (use depo-index) (v1.0)
version: "1.0"
category: deposition
pack_consumes:
  - CFP
  - DPB
  - LPB
  - PCM
pack_produces:
  - Deposition examination outline
checkpoints: 0
author: "Parnall & Adams"
license: Proprietary
---

## Pack Dependencies
**Consumes:**
- CFP
- DPB
- LPB
- PCM

# DEPO-OUTLINE (Deposition Examination Outline) — v1.0

## What This Skill Does

Creates organized, element-driven deposition examination outlines that ensure
every required proof point is addressed during testimony. The outline maps
each topic to the legal element it supports, identifies impeachment
opportunities from prior statements, flags documents to use as exhibits,
and sequences examination for maximum strategic impact.

This skill produces the substantive preparation for depositions -- the "what
to ask and why." The procedural notice is handled by DEPO-NOTICE.

## Architecture: Pack-First, Element-Driven

```
CFP PACKET (facts) ──────────┐
DPB (prior responses) ───────┤
LPB PACKET (legal elements) ─┤── DEPO-OUTLINE Skill ──> Examination Outline
PCM (element mapping) ────────┤                          + Impeachment Flags
SDC (disclosure posture) ─────┘                          + Document References
                                                         + Strategic Notes
```

DEPO-OUTLINE is a **DRAFTING** skill that produces examination outlines, not
a Builder. It consumes verified Pack data and produces structured outlines
organized by topic area and mapped to legal elements.

## Hard Rules

1. **Pack-First:** Every question topic must trace to a legal element (LPB/PCM)
   or a factual gap (CFP). Do not include topics without a clear litigation purpose.
2. **Element-driven structure:** Organize outline by element/claim, not by
   random topic. Every section must identify which element(s) it supports.
3. **Never invent:** No invented facts, prior statements, document contents,
   case citations, or witness information. Prior statements must trace to
   DPB or CFP sources. Missing -> `[VERIFY]`.
4. **SDC awareness:** Do not include questions that telegraph hidden theories
   (THEORY-HIDDEN) or reveal UNDISCLOSED evidence without SDC REVEAL plan
   authorization. Flag potential telegraphing as `[DECISION REQUIRED]`.
5. **Impeachment discipline:** Impeachment opportunities must cite specific
   prior statements with source (discovery response, prior deposition, document).
   No speculative impeachment. Missing source -> `[VERIFY-IMPEACH]`.
6. **Document references required:** Every outline topic that involves a
   document must identify the document (Bates range, exhibit number, or
   description). No vague "show the document" instructions.
7. **Strategic sequencing notes:** Include notes on examination order strategy
   (build rapport first, establish facts before confrontation, etc.) but mark
   all strategic recommendations as `[DECISION REQUIRED]` for attorney review.
8. **Token fail-safe:** If outline is extensive, chunk by topic area:
   Part 1 = Liability topics, Part 2 = Damages topics, Part 3 = Impeachment
   + Strategic Notes.

## Required Inputs

### Always Required

```xml
<evidence_layer>
[CFP PACKET -- facts relevant to this witness:
  Facts the witness can establish or contradict
  Timeline entries involving this witness
  Documents authored by or referencing this witness]
[DPB -- prior discovery responses from this witness or their party:
  Interrogatory answers, RFA responses, RFP productions
  Prior deposition transcripts (if any)]
</evidence_layer>

<legal_layer>
[LPB PACKET -- legal elements each topic must support:
  Elements of each cause of action
  Burden of proof allocations
  Standards for key legal issues]
[PCM -- element mapping showing which elements need proof from this witness]
</legal_layer>
```

### Optional (Strengthens Outline)

- `<strategic_layer>` -- SDC posture (what to avoid telegraphing)
- `<behavioral_layer>` -- AIP profile of witness (cooperative vs. hostile)
- `<impeachment_sources>` -- DEPO-IMPEACH output (prior inconsistencies)
- DEPO-INDEX output from prior depositions in the case
- Expert reports (if deposing an expert)

### If Inputs Are Missing

If no CFP packet: **"Run the CFP skill first to extract facts about this witness and their involvement."**
If no LPB packet: **"Run the LPB skill to extract the legal elements this deposition must address."**
If no PCM: **"Without a PCM, I will organize by topic rather than by element. For element-driven organization, run the PCM skill first."**

## Outline Structure

### Part A: Witness Profile

- Name, role, relationship to parties
- Prior testimony / discovery responses (from DPB)
- Known biases, motivations, or credibility issues (from CFP)
- Cooperative vs. hostile assessment

### Part B: Examination Objectives (Element Map)

Table mapping each objective to its legal purpose:

| # | Objective | Element(s) Supported | Priority | Status |
|---|-----------|---------------------|----------|--------|
| 1 | Establish duty of care | NEG-DUTY-001 | HIGH | PCM: FACTS-ONLY |
| 2 | Lock in timeline | NEG-CAUSE-001 | HIGH | PCM: PROVEN |

### Part C: Topic-by-Topic Outline

For each topic area:

```
## TOPIC [N]: [Topic Name]
**Element(s):** [Element_ID(s) from PCM/LPB]
**Objective:** [What we need to establish or lock down]
**Priority:** [HIGH / MEDIUM / LOW]

### Background Questions
- [Question area] -- [purpose note]
- [Question area] -- [purpose note]

### Key Questions
- [Question area] -- [purpose note] -- [Doc: Bates/Exhibit ref]
- [Question area] -- [purpose note]

### Lock-Down Questions
- [Statement to confirm] -- [why this matters for trial]

### Impeachment Setup (if applicable)
- [Prior statement source] -- [contradiction identified]
- [Document to confront with] -- [Bates ref]
```

### Part D: Impeachment Inventory

Table of identified impeachment opportunities:

| # | Prior Statement (Source + Pinpoint) | Expected Testimony | Contradiction | Confrontation Document |
|---|------------------------------------|--------------------|---------------|----------------------|

### Part E: Document Exhibit List

Ordered list of documents to use during examination:

| Order | Document | Bates/Exhibit | Topic | Purpose |
|-------|----------|---------------|-------|---------|

### Part F: Strategic Notes

- Recommended examination sequence and rationale
- Areas to avoid (SDC telegraphing risks)
- Redirect preparation (if defending this deponent)
- Time allocation recommendations
- All strategic notes flagged `[DECISION REQUIRED]`

## Output Contract (Required Order)

1. **Examination Outline** (Parts A-F)
2. **---** (divider)
3. **Cite Table**

| # | Topic/Question Area | Source (CFP Fact#, DPB ref, LPB LawTag, PCM Element_ID) | Confidence | Notes |
|---|--------------------|---------------------------------------------------------|------------|-------|

4. **Gate Results**
   - Traceability: [PASS/FAIL] -- all topics trace to elements or fact gaps
   - Element Coverage: [PASS/FAIL] -- all required elements addressed
   - Impeachment Sourcing: [PASS/FAIL] -- all impeachment cites verified
   - SDC Compliance: [PASS/FAIL] -- no unauthorized disclosure of hidden items
   - Document References: [PASS/FAIL] -- all documents identified with Bates/exhibit

5. **Next Requests** -- missing prior testimony, missing documents, missing
   element mapping, witness background information needed

6. **Open Items**
   - `[VERIFY]` items (prior statement accuracy, document availability)
   - `[VERIFY-IMPEACH]` items (unconfirmed impeachment opportunities)
   - `[DECISION REQUIRED]` items (examination sequence, topic inclusion, SDC compliance)

## Modes

| Mode | Input | Output |
|------|-------|--------|
| **DIRECT** | Friendly/party witness + elements to establish | Outline optimized for building favorable testimony |
| **CROSS** | Adverse witness + elements to challenge | Outline optimized for control, impeachment, admissions |
| **EXPERT** | Expert witness + report | Outline targeting methodology, qualifications, opinions |
| **CORPORATE-30b6** | 30(b)(6) topics + organization profile | Topic-by-topic examination outline for corporate designee |

### Mode: DIRECT (default for party witnesses)

Optimizes for building favorable testimony. Open questions, narrative
development, foundation laying for trial testimony. Emphasis on
establishing elements and creating a favorable record.

### Mode: CROSS

Optimizes for witness control and impeachment. Leading questions,
document confrontation, locking witness into positions, exposing
contradictions. Emphasis on admissions and undermining credibility.

### Mode: EXPERT

Targets expert methodology, qualifications, basis for opinions,
assumptions, and Daubert/NMRA 11-702 vulnerabilities. References
expert report and curriculum vitae throughout.

### Mode: CORPORATE-30b6

Organized by the 30(b)(6) topic designations from the deposition notice.
Ensures each designated topic is fully explored. Flags areas where the
designee may claim lack of preparation (potential motion to compel).

## Integration Points

| System | How DEPO-OUTLINE Connects |
|--------|--------------------------|
| **CFP** | DEPO-OUTLINE consumes CFP facts about the witness and case for question development. |
| **DPB** | DEPO-OUTLINE uses DPB prior responses as impeachment sources and to avoid duplicative questioning. |
| **LPB** | DEPO-OUTLINE maps topics to LPB legal elements to ensure litigation relevance. |
| **PCM** | DEPO-OUTLINE uses PCM element mapping to prioritize topics by proof need (UNPROVEN > FACTS-ONLY > PROVEN). |
| **SDC** | DEPO-OUTLINE checks SDC posture to avoid telegraphing hidden theories or revealing undisclosed evidence. |
| **DEPO-NOTICE** | DEPO-NOTICE handles the procedural notice; DEPO-OUTLINE handles substantive preparation. |
| **DEPO-INDEX** | After deposition, DEPO-INDEX indexes the transcript; DEPO-OUTLINE may be revised for subsequent depositions based on new information. |
| **DEPO-IMPEACH** | DEPO-IMPEACH output feeds impeachment inventory in Part D. |
| **SA** | Save per Save Map: Trial Preparation -> Deposition Outlines. |

## Reference Files

- `references/methodology.md` -- funnel technique, topic sequencing, element-driven questioning
- `references/element-mapping.md` -- how to map PCM elements to deposition topics and questions
- `references/output-format.md` -- output contract, outline format with topic blocks
