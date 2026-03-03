---
name: msj
display_name: "Motion for Summary Judgment"
description: >-
  Motion for Summary Judgment (MSJ) drafting skill. Consumes CFP evidence
  facts and LPB authorities to draft BODY-ONLY MSJ sections (statement of
  undisputed facts, argument by element, and requested relief) with a required
  Cite Table and Gate Results. Use for drafting plaintiff/defendant MSJ
  content, opposition-ready framing, and element-by-element no-genuine-dispute
  analysis (v1.0)
version: "2.0"
category: drafting
pack_consumes:
  - CFP
  - LPB
  - PCM (optional)
pack_produces:
  - BODY-ONLY MSJ motion
checkpoints: 3
author: "Parnall & Adams"
license: Proprietary
---

# MSJ (Motion for Summary Judgment) — v2.0

## What This Skill Does

Drafts BODY-ONLY motion memoranda for summary judgment across multiple
legal theories. Each theory has its own element checklist and legal
framework, but all share the same Pack-First accuracy controls, SUMF
discipline, and output contract.

v2.0 generalizes the original personal-jurisdiction-only MSJ skill into
a theory-routed system.

## Architecture: Pack-First, Direct-Output, Theory-Routed

```
CFP PACKET (SUMF facts) ──┐
                            ├── MSJ Skill ──► BODY-ONLY Motion
LPB PACKET (law/rules) ────┘                 + SUMF
PCM (strategic layer) ── optional ──────────► + Element-Fact-Law Map
                                              + Cite Table + Gates
        ┌───────────────────────────┐
        │   Theory Router           │
        │                           │
        │  Which element checklist  │
        │  and legal framework?     │
        └───────────┬───────────────┘
                    │
    ┌───────────────┼───────────────────────────────┐
    │               │               │               │
    ▼               ▼               ▼               ▼
 Med-Mal        Contract/UPA    Insurance       Procedural
 Theories       Theories        Theories        Theories
```

## Theory Selection

**Always confirm theory before drafting.** If user says "draft MSJ" without
specifying, ask: "Which MSJ theory? Options: [list from table below]"

| Theory Code | Theory | Reference | Movant |
|-------------|--------|-----------|--------|
| **MED-MAL-INFORM** | Medical malpractice — duty to inform / informed consent | `references/med-mal-duty-to-inform.md` | Plaintiff |
| **MED-MAL-TRANSFER** | Medical malpractice — duty to transfer | `references/med-mal-duty-to-transfer.md` | Plaintiff |
| **MED-MAL-RECORDS** | Medical malpractice — duty to maintain records | `references/med-mal-duty-to-maintain-records.md` | Plaintiff |
| **UPA** | Unfair Practices Act (NMSA §57-12-1 et seq.) | `references/unfair-practices-act.md` | Plaintiff |
| **BREACH-CONTRACT** | Breach of contract | `references/breach-of-contract.md` | Plaintiff |
| **DECL-JUDGMENT** | Declaratory judgment — insurance coverage disputes | `references/declaratory-judgment-coverage.md` | Plaintiff or Insurer |
| **UNFAIR-INSURANCE** | Unfair insurance practices (NMSA §59A-16-20) | `references/unfair-insurance-practices.md` | Plaintiff |
| **MED-MAL-CAP** | Medical Malpractice Act cap applicability | `references/med-mal-cap-applicability.md` | Plaintiff |
| **PERSONAL-JURIS** | Lack of specific personal jurisdiction | `references/personal-jurisdiction.md` | Defendant |
| **DEFEAT-AFF-DEF** | Defeat opponent's affirmative defenses | `references/defeat-affirmative-defenses.md` | Plaintiff |

### MSJ Analytical Tools

These tools support MSJ drafting across all theories. They do not produce
motion drafts themselves — they produce structured analysis that feeds
into MSJ_MOTION_ATOMIC, MSJ_REPLY_ATOMIC, and MSJ_RESPONSE_ATOMIC.

| Tool Code | Tool | Reference | Purpose |
|-----------|------|-----------|---------|
| **GDI** | Genuine Dispute Identifier | `references/genuine-dispute-identifier.md` | Identify genuine issues of material fact that preclude MSJ |
| **AMF** | Additional Material Facts | `references/additional-material-facts.md` | Mine, select, and organize additional facts for MSJ responses |
| **RJA** | Reasonable Juror Analysis | `references/reasonable-juror-analysis.md` | Assess whether a reasonable juror could reach a conclusion; mock jury + cognitive bias analysis |

**Multiple theories in one motion:** If the MSJ addresses multiple theories,
draft each as a separate argument section with its own element checklist.
The SUMF is consolidated (one set of undisputed facts serving all theories).

## Non-Negotiables

1. **Sanitized inputs only.** No raw medical dumps, full SA exports, minor
   identifiers, sealed materials, or privileged memos. Prohibited inputs →
   **"OUT OF SCOPE — requires BAA environment"**

2. **Direct-Output / BODY-ONLY:** SA template shell is SSOT for caption/COS/
   signature/merge fields. Draft BODY-ONLY for paste zone.

3. **Merge token discipline:** Preserve merge tokens exactly as provided.
   Never invent merge codes.

4. **No hallucinations:** Never invent facts, dates, DocIDs, Bates ranges,
   pinpoints, authorities, medical diagnoses, treatment details, policy
   numbers, or contract terms.

5. **Pinpoints required:**
   - Factual statement lacks pinpoint → `PINPOINT NEEDED`
   - Law/rule missing/unverified → `[VERIFY-CITE]`

6. **Conflicts stay visible:** Flag conflicting sources; do not resolve silently.

7. **Use only the packet.** No web/external research.

8. **Filing-compatibility:** SSN last-4; DOB year-only; minors initials;
   accounts last-4.

9. **Medical billed rule:** Medical expense figures use amounts billed
   (not paid/adjusted) unless instructed otherwise.

10. **NM-first authority.** NM authorities control. Federal is persuasive
    only and must be clearly labeled.

## Task Selection

Set: `DraftType = [MSJ_MOTION_ATOMIC | MSJ_REPLY_ATOMIC | MSJ_RESPONSE_ATOMIC]`

- **MSJ_MOTION_ATOMIC**: Motion memo + SUMF + proposed order outline
- **MSJ_REPLY_ATOMIC**: Reply memorandum supporting previously-filed MSJ
- **MSJ_RESPONSE_ATOMIC**: Response opposing defendant's MSJ

## Required Input Packet

### 1) SA Shell MERGE LEGEND
[PASTE MERGE LEGEND — tokens preserved exactly]

### 2) Case Posture + MSJ Scope
- Jurisdiction: `[NM State Court | D.N.M. Federal | Other]`
- Movant: `[Plaintiff | Defendant]`
- Theory: `[Theory Code from table above]`
- Target: [What the MSJ seeks to establish]
- Relief requested: [Specific relief]

### 3) Case Fact Pack Excerpt

Provide inside `<evidence_layer>` tags:

**MSJ_SUMF rows:**
| Fact# | Statement | Evidence_DocID | Bates/Page:Line | ParaID | Material_Element_Tag | Dispute? | Notes |
|------:|-----------|----------------|-----------------|--------|---------------------|----------|-------|

**File_Metadata rows:**
| DocID | Title | Type | BatesStart | BatesEnd | Confidentiality | StoredAt |
|-------|-------|------|------------|----------|-----------------|----------|

### 4) Law Pack Excerpt

Provide inside `<legal_layer>` tags:

Paste verified LAW + RULES rows with pinpoints. Load the theory-specific
reference file for required micro-propositions.

### 5) Optional Inputs
- `<strategic_layer>` — PCM Claims Matrix showing element coverage
- `<behavioral_layer>` — Target judge profile
- Opposition brief (for REPLY or RESPONSE drafts)

### If Inputs Are Missing

If no CFP packet: **"Provide CFP PACKET (SUMF candidates) in `<evidence_layer>` tags."**
If no LPB packet: **"Provide LPB PACKET (MSJ legal standards) in `<legal_layer>` tags."**
If theory unclear: **"Which MSJ theory? [list options]"**

## Attorney Checkpoints

This skill pauses at three decision points (see `shared/templates/checkpoint-protocol.md`):

**⛔ CHECKPOINT 1: SUMF Selection** — After analyzing pack data, before writing
the SUMF. Present candidate undisputed facts ranked by element coverage and
persuasive value. Attorney selects which facts to include, reorders as needed,
and flags any facts the opposing party may dispute.

**⛔ CHECKPOINT 2: Authority Prioritization** — After SUMF is confirmed,
before drafting the argument. Present: (a) available authorities per element
from LPB, (b) recommended lead authority for each proposition, (c) any
authority gaps. Attorney approves authority selection and ordering.

**⛔ CHECKPOINT 3: Standard of Review & Framing** — After argument draft,
before final output. Present: (a) the proposed standard of review framing,
(b) how the burden-shifting framework is presented, (c) overall argument
structure. Attorney confirms or adjusts framing. This is especially critical
for MSJ_RESPONSE_ATOMIC where the standard favors the non-movant.

## SUMF Discipline (All Theories)

### Writing SUMF Paragraphs
- One fact per numbered paragraph
- No argument, no conclusions, no characterization
- Every fact cites DocID + Bates/Page:Line
- Material facts only — each must connect to an element
- Source-matched language ("records reflect" vs. "proves")
- Conflicts between sources → separate SUMF ¶s with both, flagged

### UMF Numbered List in Word (CRITICAL)

When assembled into a .docx, UMF paragraphs **MUST use Word's numbered
list mechanism** with the prefix "UMF No." — NOT inline text numbers.

Define a `_PA UMF Paragraph` style with a custom abstractNum:

```xml
<w:lvl w:ilvl="0">
  <w:start w:val="1"/>
  <w:numFmt w:val="decimal"/>
  <w:lvlText w:val="UMF No. %1."/>
  <w:lvlJc w:val="left"/>
  <w:pPr>
    <w:ind w:left="1440" w:hanging="720"/>
  </w:pPr>
  <w:rPr>
    <w:rFonts w:ascii="Optima" w:hAnsi="Optima"/> <!-- Font from shared/firm-styles/ -->
    <w:b/>
  </w:rPr>
</w:lvl>
```

This renders as: **UMF No. 1.** [fact statement], **UMF No. 2.** [fact
statement], etc. The numbering is automatic — adding or removing a UMF
paragraph renumbers all subsequent paragraphs.

The body text following each UMF number is double-spaced, justified,
Firm style font at 12pt (from `shared/firm-styles/`). The evidence cite (DocID + Bates/Page:Line) follows the
fact statement in the same paragraph.

**Do NOT format UMFs as plain numbered paragraphs (1., 2., 3.).** The
"UMF No." prefix is required to distinguish undisputed material facts
from other numbered paragraphs in the document.

### SUMF Organization
- Group by element (tag each ¶ with Material_Element_Tag)
- Within each element group, chronological order
- Cross-reference File_Metadata for every DocID

## Output Structure (All Theories)

### MSJ_MOTION_ATOMIC

#### 1) Introduction / Relief Requested
- Identify parties and posture
- State the theory and what is sought
- Summarize why undisputed facts compel judgment

#### 2) Statement of Undisputed Material Facts (SUMF)
- **UMF No. X** numbered paragraphs (Word numbered list — see SUMF
  Discipline section), one fact each
- Evidence cite for each (DocID + Bates/Page:Line)
- Organized by element

#### 3) Standard of Review (Atomized)
Break into micro-propositions from Law Pack:
- MSJ burden: NMRA 1-056 / FRCP 56 standard
- "Genuine" dispute definition
- "Material" fact definition
- Evidence viewed in light favorable to nonmovant
- Theory-specific burden allocation (from theory reference)

#### 4) Argument (Element-by-Element; Atomized IRAC)

**Load the theory-specific reference file.** For each element:

**A. [Element Name]**
1. **Rule sentence** (authority + pinpoint from LPB)
2. **Application sentence** ("SUMF ¶ X" + record cite from CFP)
3. **Result sentence** (what undisputed facts establish for this element)

Repeat for each element in the theory's checklist.

#### 5) Conclusion + Relief Requested
- Specific relief
- Request for hearing if appropriate
- Proposed order outline

### MSJ_REPLY_ATOMIC

#### 1) Introduction
What opposition fails to establish

#### 2) Reply Framing Standard (Atomized)
Only from Law Pack; otherwise `[VERIFY-CITE]`

#### 3) Point-by-Point Reply
Mirror opposition headings. For each point:
- (a) What they claim
- (b) Controlling legal micro-proposition + cite
- (c) Record correction (SUMF ¶ + DocID+Bates)
- (d) Why dispute is not genuine/material

#### 4) Conclusion

### MSJ_RESPONSE_ATOMIC

#### 1) Introduction
Why genuine disputes of material fact preclude summary judgment

#### 2) Counter-Statement of Facts
Additional facts from CFP that create genuine dispute

#### 3) Argument
For each element opponent claims is undisputed:
- (a) What movant claims
- (b) Controverted facts (with record cites)
- (c) Why dispute is genuine and material
- (d) Legal standard for nonmovant's burden

#### 4) Conclusion

## Required Output Contract

Return in this exact order:

### 1) DRAFT (Word-ready; BODY-ONLY)
Full draft for selected DraftType

### 2) ELEMENT-FACT-LAW APPLICATION MAP

**Table A — Elements Map:**
| Element | Governing LawTag(s) | Law Pinpoints | SUMF Fact#s Applied | Notes/Gaps |
|---------|---------------------|---------------|---------------------|------------|

**Table B — Law Atomization Index:**
| LawAtomID | Micro-Proposition | Authority + Pinpoint | Used In Section | Notes |
|-----------|-------------------|----------------------|-----------------|-------|

### 3) CITE TABLE
| # | Assertion | Evidence (DocID + Bates/page:line OR authority + pinpoint) | Confidence | Notes |
|--:|-----------|-------------------------------------------------------------|------------|-------|

### 4) GATE RESULTS

| Gate | Status | Details |
|------|--------|---------|
| Pack Traceability (facts) | | |
| Pinpoint Completeness | | |
| No-New-Facts | | |
| Law Coverage (theory elements + MSJ standard) | | |
| Merge Token Integrity | | |
| Conflict Detection | | |
| Filing Data-Min Check | | |
| Local Rules Check | | |
| Granularity Gate | | |

### 5) NEXT REQUESTS
Prioritized list of missing items to remove placeholders

### 6) OPEN ITEMS
- **[VERIFY]**: Items requiring verification before filing
- **[VERIFY-CITE]**: Unverified legal citations
- **[DECISION REQUIRED]**: Choices attorney must make

## Token Fail-Safe

If the motion is extensive:
- **Part 1:** SUMF + Argument (BODY-ONLY)
- Stop: "Part 1 complete. Reply 'continue' for Element-Fact-Law Map, Cite Table, Gate Results."
- **Part 2:** Maps + Cite Table + Gates + Open Items

## Pack Locations (v1.1)

**Read CFP from:** `cases/{CASE_CODE}/cfp/`
**Read DPB from:** `cases/{CASE_CODE}/dpb/` (if applicable to this skill)
**Read LP from:** `law-packs/` (global) + `law-packs/law-of-the-case/{CASE_CODE}/` (if exists)
**Save draft output to:** `cases/{CASE_CODE}/drafts/`
**Naming:** `MSJ-{CASE_CODE}-{Descriptor}-DRAFT.docx`

**Law-of-the-case check:** Before drafting, check whether `law-packs/law-of-the-case/{CASE_CODE}/` contains an LOTC pack. If it does, load it alongside the global LP. Flag any LOTC overrides in the Cite Table with `[LOTC]` tag so the attorney knows which legal points are governed by case-specific rulings.

## SSOT Integration: PSR/MPR -> MSJ

**PSR -> MSJ (Undisputed Facts):**
- PSR Admissions_Map entries identify facts not in genuine dispute
- Admitted facts are prime SUMF candidates (judicial admissions = undisputed)
- Denied facts with defective denials (from PSR DefectFlag) may also qualify
- PSR Denials_Map shows which facts ARE disputed and on what grounds

**MPR -> MSJ (Prior Motion History):**
- MPR tracks prior motions and rulings that may affect MSJ strategy
- Prior MSJ rulings on specific elements (from MPR Rulings tab) inform what
  issues remain live vs. already decided
- MPR argument history prevents contradicting prior positions
- MPR Response_Coverage tab shows which arguments opponents tend to address vs. ignore

## Integration Points

| System | How MSJ Connects |
|--------|-----------------|
| **PSR** | PSR Admissions_Map provides admitted facts for SUMF candidates. PSR Denials_Map shows disputed facts and grounds. PSR is SSOT for who admitted/denied what. |
| **CFP** | MSJ consumes CFP PACKET for SUMF facts. Every SUMF ¶ traces to CFP rows. Admitted facts from PSR are highest-confidence CFP entries. |
| **LPB** | MSJ consumes LPB PACKET for legal standards. Every legal proposition traces to LPB rows. |
| **PCM** | Optional strategic layer showing which elements have evidence gaps. |
| **MPR** | MPR provides prior motion history, rulings, and argument precedent. Prevents contradicting prior positions. |
| **Inference Engine** | IE provides fact-vs-inference classification and inference chains. GDI and RJA both invoke IE for inference analysis. |
| **DC** | RJA uses DC jury-value ranges for anchoring analysis. DC DAMAGES-ARGUMENT uses RJA DEBIAS output for persuasion strategy. |
| **NML** | NML formats MSJ BODY-ONLY output into NM-compliant brief (page-limit enforced per local rules; 30-page default for MSJ). |
| **SA** | Direct-Output: SA provides caption/COS shell. Save per Save Map: Motions → Dispositive Motions. |

## Reference Files

Load only the reference for the active theory:

- `references/med-mal-duty-to-inform.md` — Informed consent / duty to inform elements
- `references/med-mal-duty-to-transfer.md` — Duty to transfer elements
- `references/med-mal-duty-to-maintain-records.md` — Duty to maintain records elements
- `references/unfair-practices-act.md` — NM UPA elements
- `references/breach-of-contract.md` — Breach of contract elements
- `references/declaratory-judgment-coverage.md` — Insurance coverage declaratory judgment
- `references/unfair-insurance-practices.md` — Unfair insurance practices elements
- `references/med-mal-cap-applicability.md` — MMA cap applicability / non-malpractice claims
- `references/personal-jurisdiction.md` — Specific personal jurisdiction elements
- `references/defeat-affirmative-defenses.md` — Framework for defeating affirmative defenses

### Analytical Tools (load as needed alongside theory references)

- `references/genuine-dispute-identifier.md` — Identify and articulate genuine disputes of material fact
- `references/additional-material-facts.md` — Mine and select additional facts for MSJ responses
- `references/reasonable-juror-analysis.md` — Reasonable juror assessment, mock jury deliberation, cognitive bias analysis
