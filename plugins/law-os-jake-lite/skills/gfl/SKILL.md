---
name: gfl
display_name: "Good Faith Letter"
description: >-
  Good Faith Letter (GFL) — Discovery dispute drafting skill for Rule 37 /
  NMRA 1-037 meet-and-confer correspondence. Consumes DPB PACKET (GF-filtered
  deficiencies) + LPB PACKET (discovery standards) to produce BODY-ONLY good
  faith letters. Pack-First, Direct-Output, Cite Table gated. Generates Word
  documents. TRIGGERS: Use this skill whenever the user mentions "good faith
  letter", "GFL", "meet and confer letter", "meet-confer letter", "discovery
  deficiency letter", "Rule 37 letter", "demand to cure", "request to
  supplement", "GF letter", "good faith conference letter", "discovery dispute
  letter", "cure letter", or wants to draft correspondence about discovery
  deficiencies. Also use when the user uploads a DPB packet filtered for good
  faith use. Do NOT use for Motion to Compel — use mtc skill instead. Do NOT
  use for Letters of Representation — use letter-of-representation skill
  instead (v1.0)
version: "1.0"
category: correspondence
pack_consumes:
  - DPB
  - LPB
  - CFP (optional)
pack_produces:
  - BODY-ONLY good faith letter
checkpoints: 0
author: "Parnall & Adams"
license: Proprietary
---

# GFL (Good Faith Letter) — v1.0

## What This Skill Does

Drafts good faith discovery dispute letters that satisfy the meet-and-confer
requirement before filing a motion to compel. The letter addresses each discovery
deficiency individually, with traceable citations to the specific request, the
specific objection, and the legal authority requiring a different response.

The GFL is the critical prerequisite to PB-MTC-01. A well-documented GFL
demonstrates genuine good faith effort and strengthens any subsequent motion.

## Architecture: Pack-First, Direct-Output

```
DPB PACKET (GF filter) ─┐
                         ├── GFL Skill ──► BODY-ONLY Letter
LPB PACKET (disc. law) ──┘                + Cite Table + Gates
CFP (meet-confer log) ──── optional ──────► Timeline support
```

The GFL skill is a **DRAFTING** skill, not a Builder. It does not modify Packs.
It consumes verified Pack data and produces prose.

## Hard Rules

1. **Pack-First:** Every factual assertion (what was asked, what was objected,
   what is deficient) must trace to a DPB row. Every legal assertion must trace
   to an LPB row. No Pack row → no assertion.
2. **Direct-Output:** SA generates the Word shell (letterhead, date, address block,
   signature block, merge tokens). This skill provides BODY-ONLY text.
3. **BODY-ONLY output:** No caption, no letterhead, no signature block.
   Those come from the SA shell.
4. **Cite Table gate:** Every assertion in the letter must appear in the Cite Table.
5. **Never invent:** No invented request numbers, objection language, response text,
   Bates ranges, case citations, rule numbers, or pinpoints.
6. **Preserve merge tokens exactly.** Never modify or invent merge tokens.
7. **Neutral, professional tone.** No threats. No blame language. No admissions of fault.
   Firm but respectful — this letter may be shown to a judge.
8. **Token fail-safe:** If the letter is extensive, chunk the output. Part 1 = letter body.
   Part 2 = Cite Table + Gate Results + Next Requests.

## Required Inputs

### Always Required

Provide inside XML boundaries to prevent context bleed:

```xml
<evidence_layer>
[DPB PACKET — GF-filtered: State ≠ COMPLETE/WITHDRAWN/RESOLVED/ADMITTED/DENIED]
[Include: Set Metadata + Discovery Deficiencies + Productions Index]
</evidence_layer>

<legal_layer>
[LPB PACKET — discovery standards: objection law, scope of discovery,
proportionality, waiver rules, supplementation obligations]
[Must be PACK-READY / PackReady=Yes rows only]
</legal_layer>
```

### Optional (Strengthens Letter)

- `<meet_confer_log>` — prior correspondence and conference attempts (from CFP)
- SA Word shell headings + Merge Legend excerpt
- Prior GFL (if this is a follow-up / cure-failed letter)

### If Inputs Are Missing

If the user provides unstructured text without XML tags:
**"Please wrap the DPB packet in `<evidence_layer>` and LPB packet in `<legal_layer>` tags to prevent context bleed."**

If no DPB packet exists yet:
**"Run the DPB skill first: EXTRACT your discovery sets, then ENRICH to assign states, then PACKET (GF filter) to generate the evidence layer."**

## Letter Structure

Read `references/letter-structure.md` for the detailed template. Summary:

### Section 1: Opening
- Representation statement with merge tokens
- Reference to specific discovery set(s) by SetID
- Statement of meet-and-confer obligation (cite jurisdiction rule)

### Section 2: General Objections Block
- Statement of law: general/boilerplate objections are disfavored
- Address each general objection with a declarative statement explaining
  why it is unsupported and should be withdrawn
- Cite LPB authority for each

### Section 3: Specificity Deficiency Block
- Statement of law: objections must state grounds with specificity
- Identify every request with an objection that lacks sufficient detail
- Cite each by Interrogatory/RFP/RFA number from the DPB packet

### Section 4: Request-by-Request Analysis
For each deficient request (from DPB packet, ordered by ReqNum):

```
**[SetType] No. [ReqNum]: [ReqLabel or brief description]**

*Request:* [Brief summary of what was sought — from DPB ReqText]
*Objection(s):* [Summarize objection(s) — from DPB ObjText]
*Response:* [Summarize response, if any — from DPB AnswerText]

*Analysis:* [Why this request is narrowly tailored to seek admissible evidence]

*Objection Analysis:* [For each objection, argue why it should be
withdrawn or overruled, citing LPB authority]

*Requested Action:* [Specific supplementation/cure requested with deadline]
```

### Section 5: Cure Demand
- Specific deadline for supplementation (typically 14 days NM, 30 days FED)
- Statement that failure to cure will result in a motion to compel
- Request for meet-and-confer conference if disputes remain

### Section 6: Preservation
- Preservation/spoliation language if productions are incomplete

## Output Contract (Required Order)

1. **BODY-ONLY Letter**
2. **---** (divider)
3. **Cite Table**

| # | Assertion | Evidence (SetID/ReqNum or LawTag + Pinpoint) | Confidence | Notes |
|---|-----------|----------------------------------------------|------------|-------|

4. **Gate Results**
   - Traceability: [PASS/FAIL] — all deficiency assertions from DPB, all law from LPB
   - Status Gate: [PASS/FAIL] — all DPB rows PACK-READY, all LPB rows PackReady=Yes
   - Conflicts: [note any]
   - Merge-token integrity: [PASS/FAIL]

5. **Next Requests** — missing DPB rows, missing LPB authority, missing meet-confer log

6. **Open Items**
   - `[VERIFY]` items
   - `[DECISION REQUIRED]` items

7. **Fill-In Checklist** — any placeholders remaining in the letter

## Modes

| Mode | Input | Output |
|------|-------|--------|
| **NEW DRAFT** | DPB packet + LPB packet | Full GFL + Cite Table + Gates |
| **REWRITE** | Prior GFL + updated DPB packet | Change Summary + revised GFL |
| **FOLLOW-UP** | Prior GFL + cure status | Follow-up letter (firmer tone, note deadline passed) |
| **CURE-FAILED** | Prior GFL + DPB rows still deficient | Pre-MTC letter (last opportunity) |

## Pack Locations (v1.1)

**Read CFP from:** `cases/{CASE_CODE}/cfp/`
**Read DPB from:** `cases/{CASE_CODE}/dpb/` (if applicable to this skill)
**Read LP from:** `law-packs/` (global) + `law-packs/law-of-the-case/{CASE_CODE}/` (if exists)
**Save draft output to:** `cases/{CASE_CODE}/drafts/`
**Naming:** `GFL-{CASE_CODE}-{Descriptor}-DRAFT.docx`

**Law-of-the-case check:** Before drafting, check whether `law-packs/law-of-the-case/{CASE_CODE}/` contains an LOTC pack. If it does, load it alongside the global LP. Flag any LOTC overrides in the Cite Table with `[LOTC]` tag so the attorney knows which legal points are governed by case-specific rulings.

## Jurisdiction-Specific Rules

Read `references/jurisdiction-rules.md` for NM vs FED differences.

### New Mexico (NMRA 1-037)
- Meet-and-confer required before MTC filing
- 30-day cure period is customary (not statutory)
- General objections disfavored: *Roth v. Thompson* framework

### Federal (D.N.M.) (FRCP 37, D.N.M. LR-Civ 7.1(a))
- Good faith conference certification required (LR-Civ 7.1(a))
- Proportionality factors (FRCP 26(b)(1))
- Specificity required: *Heller v. City of Dallas* framework

## Integration Points

| System | How GFL Connects |
|--------|-----------------|
| **DPB** | GFL consumes DPB PACKET (GF filter). DPB States drive which requests appear. |
| **LPB** | GFL consumes LPB PACKET filtered to discovery law. LawTags cited in Cite Table. |
| **CFP** | Optional meet-confer log provides timeline of prior good faith efforts. |
| **SA** | Direct-Output: SA provides letterhead/shell. Save per Save Map: Correspondence → Discovery Disputes. |
| **MTC** | If GFL cure period expires → DPB ENRICH updates States to CURE-FAILED → MTC skill takes over. |

## Reference Files

- `references/letter-structure.md` — detailed section templates and examples
- `references/jurisdiction-rules.md` — NM vs FED meet-and-confer requirements
