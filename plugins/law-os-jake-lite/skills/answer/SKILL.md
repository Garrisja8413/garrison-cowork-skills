---
name: answer
display_name: "Answer Drafter"
description: >-
  Answer Drafter (ANSWER) — Pack-First, Direct-Output drafting skill for
  defendant's answers to civil complaints under NMRA 1-008. Reviews each
  complaint allegation paragraph-by-paragraph and drafts admit/deny/lack
  knowledge responses, then drafts applicable affirmative defenses with
  factual basis. Produces BODY-ONLY .docx answer + Cite Table + Gate
  Results. Consumes CFP and LPB packs when available; falls back to
  complaint-only analysis when packs are absent.
  TRIGGERS: "draft an answer", "answer the complaint", "respond to the
  complaint", "draft answer and affirmative defenses", "answer drafter",
  "ANSWER", "prepare our answer", "we need to answer this complaint",
  "draft affirmative defenses", "admit deny responses", "NMRA 1-008
  answer", "paragraph by paragraph response", or uploads a complaint
  and asks to draft a responsive pleading. Not for discovery responses
  (use drp), answer diagnostics of opponent's answer (use adr), or
  motions to dismiss (use mtd-response) (v1.0)
version: "1.0"
category: drafting
pack_consumes:
  - CFP (optional)
  - LPB (optional)
  - PSR (optional)
  - PCM (optional)
pack_produces:
  - BODY-ONLY Answer (.docx)
checkpoints: 3
author: "Garrison Law NM"
license: Proprietary
---

# ANSWER (Answer Drafter) — v1.0

## What This Skill Does

Drafts the BODY-ONLY text of a defendant's answer to a civil complaint
under NM state practice (NMRA 1-008). The answer responds to each
complaint allegation paragraph-by-paragraph with admit, deny, or lack
sufficient knowledge responses, then asserts applicable affirmative
defenses with factual basis.

Output is a .docx file following Direct-Output / BODY-ONLY discipline.

## Architecture: Pack-First, Direct-Output
```
Complaint (uploaded) ──────────┐
                                ├── ANSWER Skill ──► BODY-ONLY Answer (.docx)
CFP PACKET (case facts) ──opt──┤                    + Cite Table + Gates
LPB PACKET (defense law) ─opt──┤
PSR (pleading register) ──opt──┘
```

When CFP and LPB packs are available, the skill produces fact-informed
responses with legal authority for each denial and affirmative defense.
When packs are absent, the skill analyzes the complaint text directly
and marks all factual and legal assertions [VERIFY] or [VERIFY-CITE].

## Hard Rules

1. **Paragraph-by-paragraph:** Every complaint allegation gets a response.
   No allegation may be skipped. An unanswered allegation risks deemed
   admission under NMRA 1-008(D).
2. **Response specificity:** Denials must "fairly meet the substance of
   the denied allegations" (NMRA 1-008(B)). General denials are
   disfavored. Each denial should identify what is denied and why.
3. **Lack-of-knowledge standard:** "Lacks knowledge or information
   sufficient to form a belief" is only proper when the facts are
   genuinely outside the answering party's knowledge or control.
4. **Partial admissions required:** When an allegation contains both
   true and false statements, admit the true portions and deny only
   the false portions (NMRA 1-008(B)).
5. **Affirmative defenses must have factual basis:** Each affirmative
   defense must state supporting facts — not just the legal label.
   Boilerplate defenses without factual grounding invite a motion to
   strike under NMRA 1-012(F).
6. **Pack-First when available:** If CFP rows exist, response decisions
   should be informed by the verified case facts. If LPB rows exist,
   legal bases for defenses should cite the pack authority.
7. **Never invent:** No invented facts, case citations, rule numbers,
   or pinpoints. Missing support → [VERIFY], [VERIFY-CITE], or
   [DECISION REQUIRED].
8. **Direct-Output / BODY-ONLY:** No caption, case number, certificate
   of service, or signature block. Those come from the document shell.
9. **Token fail-safe:** If the answer is extensive, chunk output:
   Part 1 = Responses to Allegations.
   Part 2 = Affirmative Defenses.
   Part 3 = Cite Table + Gate Results.

## Required Inputs

### Always Required

The complaint or petition being answered — full text with paragraph
numbers preserved. Upload the document or paste the text.

### Optional (Strengthens Answer)

- **CFP PACKET** — Verified case facts for fact-informed responses.
- **LPB PACKET** — Defense-side legal authority for cited defenses.
- **PSR** — Structured complaint data instead of re-parsing.
- **PCM/PDM** — Element coverage analysis for defense strategy.
- **Client interview notes** — Drives admit/deny decisions.

### If Inputs Are Missing

If no complaint uploaded:
**"Upload the Complaint (with paragraph numbers preserved)."**

If no CFP/LPB and no client information:
**"No case fact pack or client information provided. I will draft
conservative responses and mark all decisions [VERIFY WITH CLIENT]."**

## Attorney Checkpoints

**⛔ CHECKPOINT 1: Response Strategy** — After analyzing all complaint
allegations. Present summary table of proposed responses per allegation
(ADMIT / DENY / LACK KNOWLEDGE / PARTIAL ADMIT). Attorney confirms.

**⛔ CHECKPOINT 2: Affirmative Defenses** — Present each proposed defense
with factual basis and legal authority. Attorney selects which to assert.

**⛔ CHECKPOINT 3: Final Review** — Present admit/deny/LKI breakdown,
open items, and complete defense list. Attorney gives final approval.

## NM Answer Requirements (NMRA 1-008)

### Response Types

| Response | When to Use | Rule |
|----------|-------------|------|
| **Admit** | Allegation is true based on client knowledge/CFP | NMRA 1-008(B) |
| **Deny** | Allegation is false or materially misleading | NMRA 1-008(B) |
| **Lack Knowledge** | Facts genuinely outside party's knowledge | NMRA 1-008(B) |
| **Partial Admit/Deny** | Allegation contains both true and false | NMRA 1-008(B) |
| **Legal conclusion** | No response required; deny if deemed required | NMRA 1-008(B) |

### Affirmative Defenses (NMRA 1-008(C))

Must be affirmatively pled or waived. Common PI defenses:

- Comparative fault / contributory negligence (NMSA 41-3A-1)
- Assumption of risk
- Failure to mitigate damages
- Statute of limitations (NMSA 37-1-8: 3 years for PI)
- Governmental immunity (NMSA 41-4-1 et seq.)
- Workers compensation exclusivity
- Release / settlement / accord and satisfaction
- Failure to exhaust administrative remedies
- Lack of causation
- Pre-existing condition / intervening cause
- Failure to comply with TCA notice (NMSA 41-4-16)
- Qualified immunity (for 1983 claims)

Each defense must include: (1) legal label and basis, (2) facts
supporting the defense, (3) controlling authority or [VERIFY-CITE].

### Timing

- Answer due 30 days after service (NMRA 1-012(A))
- If MTD filed, answer due 10 days after denial

## Answer Structure

### I. Introductory Paragraph
Identify answering party and complaint being answered.

### II. Responses to Allegations
For each complaint paragraph:
- **Admit:** "Admitted."
- **Deny:** "Denied. [Brief basis if available.]"
- **Lack Knowledge:** "Defendant lacks knowledge or information
  sufficient to form a belief as to the truth of this allegation
  and therefore denies the same."
- **Partial:** "Admitted that [true portion]. Denied that [false portion]."
- **Legal conclusion:** "States a legal conclusion to which no response
  is required. To the extent a response is deemed required, denied."

### III. Affirmative Defenses
Each as a separately numbered section with legal label, factual basis,
and legal authority.

### IV. Reservation of Rights
Brief, specific reservation to amend after discovery.

### V. Prayer
Dismiss with prejudice, plaintiff take nothing, costs and fees if basis.

## Output Contract

1. **BODY-ONLY Answer Text** (Sections I-V)
2. **---** (divider)
3. **Response Summary Table**

| Complaint P | Response | Basis | CFP Ref | Notes |
|-------------|----------|-------|---------|-------|

4. **Affirmative Defense Summary**

| # | Defense | Factual Basis | Legal Authority | Strength |
|---|---------|---------------|-----------------|----------|

5. **Cite Table**

| # | Assertion | Authority/Record Cite + Pinpoint | Type | Confidence | Notes |
|---|-----------|----------------------------------|------|------------|-------|

6. **Gate Results**
   - Completeness: [PASS/FAIL] — every complaint paragraph answered
   - Specificity: [PASS/FAIL] — no blanket denials
   - Defense Basis: [PASS/FAIL] — every defense has factual basis
   - Authority Gate: [PASS/FAIL] — legal assertions cite authority
   - Certification: [PASS/FAIL] — satisfies NMRA 1-011
   - LKI Propriety: [PASS/FAIL] — lack knowledge used only for genuinely unknown facts

7. **Open Items**
   - [VERIFY WITH CLIENT] — response decisions needing confirmation
   - [VERIFY-CITE] — unverified legal citations
   - [DECISION REQUIRED] — strategic choices for attorney
   - [VERIFY] — unverified factual assertions

## .docx Generation

After Checkpoint 3 approval, generate Word document using docx skill:
- Consecutive numbered paragraphs matching complaint numbering
- Bold headings for AFFIRMATIVE DEFENSES and each numbered defense
- 12pt Times New Roman, 1-inch margins, double-spaced
- Filename: Answer-{Descriptor}-DRAFT.docx

## Integration Points

| System | How ANSWER Connects |
|--------|---------------------|
| **CFP** | Consumes facts for admit/deny decisions |
| **LPB** | Consumes defense-side legal authority |
| **PSR** | Consumes structured complaint data; update PSR after filing |
| **PCM/PDM** | Gap analysis informs defense strategy |
| **ADR** | ADR analyzes opponent answer; ANSWER drafts ours |
| **COMPLAINT** | ANSWER responds to COMPLAINT-drafted pleading |
| **docx** | Uses docx skill for Word document generation |