---
name: mpr
display_name: "Motion Practice Register"
description: >-
  Motion Practice Register (MPR) — the single source of truth (SSOT) for all
  motion practice data in a case. Extracts motions, grounds, legal arguments,
  factual assertions, evidence, responses, replies, and rulings into a
  structured Excel workbook with perfect party attribution. Every entry
  preserves exact source language — the AI does not generate or paraphrase.
  Tracks which response issues were addressed and which were NOT addressed.
  Motion factual assertions do NOT flow to CFP — only new evidence does.
  TRIGGERS: Use when user mentions "motion register", "MPR", "motion SSOT",
  "track motions", "motion history", "parse motion", "extract motion
  arguments", "motion response tracking", or uploads motions/responses
  for extraction (v1.0)
version: "1.0"
category: builder
pack_consumes:
  - Filed motions
  - Responses to motions
  - Replies in support of motions
  - Court orders/rulings on motions
pack_produces:
  - MPR Excel workbook
checkpoints: 2
author: "Parnall & Adams"
license: Proprietary
---

# MPR (Motion Practice Register) — v1.0

## CORE PRINCIPLE: THIS IS A DATA EXTRACTION SKILL, NOT A GENERATION SKILL

The MPR extracts, organizes, and reproduces motion practice content verbatim.
The AI does not generate, paraphrase, summarize, or interpret the language of
any motion, response, reply, or ruling in verbatim fields. The only AI
contribution is structural organization, tagging, issue classification, and
cross-referencing — never the substance of legal arguments or factual assertions.

**If it was not written in the filing, it does not appear in the MPR.**

## CRITICAL RULE: MOTION FACTS ARE NOT CASE FACTS

Factual assertions made in motions are **NOT** the source of truth for the
Case Fact Pack (CFP). Parties make factual assertions in motions that may be:
- Disputed by the opposing party
- Unsupported by admissible evidence
- Characterized or spun for advocacy purposes
- Contradicted by other evidence in the record

**Only new EVIDENCE submitted with a motion** (declarations, affidavits,
exhibits not previously in the record) should be flagged for CFP review.
The factual assertions themselves are tracked in the MPR but do NOT
automatically flow to CFP.

**There is no room for error. Mistakes are unacceptable.**

## Mission

Provide a single, authoritative, structured record of every motion filed in
a case — tracking the complete lifecycle from filing through ruling. There
must never be any confusion about:

- **Who filed what motions** (filing party + motion type + date)
- **What grounds were argued** (verbatim issue statements + legal theories)
- **Which legal assertions were made** (verbatim legal arguments + authorities)
- **Which legal assertions may not be valid law** (flagged for LPB verification)
- **What factual assertions were presented** (verbatim + evidence citations)
- **What evidence was submitted** (exhibits, declarations, affidavits)
- **Which issues were addressed in responses** (matched to motion issues)
- **Which issues raised in the motion were NOT addressed in the response**
- **Which factual assertions were acknowledged, disputed, or not addressed**
- **What arguments were made in replies** (tied to motion and response)
- **What the court ruled and on what basis**

**There is no room for error. Mistakes are unacceptable. This must be 100% accurate.**

## Architecture: EXTRACT -> ENRICH -> VERIFY

```
Filed Motion/Response/Reply/Order
         │
         ▼
      EXTRACT ──► .xlsx ──► ENRICH ──► .xlsx ──► VERIFY ──► final .xlsx
         │                    │                     │
      Verbatim            Add tags,             Source-check
      issue-by-issue      LPB cross-refs,       every entry
      argument-by-        validity flags,        against filed
      argument            response coverage      documents
      extraction          analysis                  │
                                    ┌───────────────┘
                                    ▼
                              LPB (legal validity check)
                              CFP (new evidence only)
                              LOTC (rulings → law of case)
                              MSJ / MTC / MTD-R (argument reuse)
                              PSR (if ruling affects pleading state)
```

## Modes

| Mode | Stage | Input | Output | Reference |
|------|-------|-------|--------|-----------|
| **EXTRACT** | 1 | Filed motion/response/reply/order | `MPR-Extract-[CaseCode]-[MotionType].xlsx` | `references/extract.md` |
| **COMBINE** | 1 | Multiple MPR Extract files | `MPR-Combined-[CaseCode]-Master.xlsx` | `references/combine.md` |
| **ENRICH** | 2 | Extract/Combined .xlsx | `MPR-Enriched-[CaseCode].xlsx` | `references/enrich.md` |
| **VERIFY** | 3 | Enriched .xlsx | `MPR-Verified-[CaseCode].xlsx` + QA report | `references/verify.md` |
| **PACKET** | Any | Any MPR .xlsx | Filtered markdown packet | `references/packet.md` |

**How to pick a mode:**
- User uploads a motion, response, or reply for extraction -> **EXTRACT**
- User has multiple MPR extracts to merge -> **COMBINE**
- User has extracted rows and wants classification/cross-referencing -> **ENRICH**
- User wants source verification before downstream use -> **VERIFY**
- User needs a filtered subset for a downstream skill -> **PACKET**

## Pack Locations (v1.1)

**Save outputs to:** `cases/{CASE_CODE}/mpr/`
**Naming:** `MPR-{Stage}-{CASE_CODE}-{Descriptor}.xlsx`
  - Examples: `MPR-Extract-ALIPAT-MSJ-Def.xlsx`, `MPR-Extract-ALIPAT-MSJ-Response.xlsx`,
    `MPR-Combined-ALIPAT-Master.xlsx`

**Before starting EXTRACT or COMBINE:**
1. Ask the user for the case code if not established.
2. Verify `cases/{CASE_CODE}/mpr/` exists; create it if not.
3. List existing MPRs in that directory so the user knows what already exists.

## Hard Rules (ALL MODES)

1. **VERBATIM EXTRACTION ONLY.** Every issue statement, legal argument, factual
   assertion, and ruling must be reproduced using the exact language from the
   source filing. No paraphrasing. No summarizing. No "cleaning up" language.
   Copy exactly as written. Truncation permitted for entries exceeding 2000
   characters: preserve the first 1500 characters verbatim + `[FULL TEXT IN
   SOURCE — Section X]`.

2. **PERFECT ATTRIBUTION.** Every row must identify:
   - **Who** filed the document (party name)
   - **What** they argued (verbatim text)
   - **Where** in the filing (page/section/heading reference)
   - **When** it was filed (filing date)
   - **In what document** (MotionID or FilingID)

3. **MOTION FACTS != CASE FACTS.** Factual assertions in motions do NOT flow
   to CFP. Only NEW EVIDENCE (exhibits, declarations, affidavits not previously
   in the record) gets flagged for CFP review with `NewEvidence=Y`.

4. **NEVER INVENT** case citations, rule numbers, page references, argument
   characterizations, or rulings. If a piece of information is not in the
   source filing, use `[NOT STATED]`.

5. **ISSUE-BY-ISSUE EXTRACTION.** Each discrete legal issue raised in a motion
   gets its own row in the Issues tab. Each argument supporting an issue gets
   its own row in the Arguments tab. Do not consolidate multiple issues or
   arguments into single rows.

6. **RESPONSE COVERAGE TRACKING.** When extracting a response, explicitly track
   which motion issues were addressed and which were NOT addressed. Failure to
   address an issue is strategically significant and must be captured.

7. **REPLY SCOPE TRACKING.** When extracting a reply, track which response
   arguments were countered, which new arguments were raised (potentially
   improper), and which response points were conceded by silence.

8. **LEGAL VALIDITY FLAGS.** When extracting legal assertions, flag any that:
   - Cite authority that may not be good law (`[VERIFY-CITE]`)
   - Make legal assertions without citation (`[UNCITED-LEGAL-ASSERTION]`)
   - Appear to misstate the applicable standard (`[STANDARD-CHECK]`)
   - Cite persuasive-only authority as controlling (`[PERSUASIVE-ONLY]`)
   These flags drive LPB verification tasks.

9. **Never exceed row caps.** Stop, save, ask for 'continue'.

10. **Never hardcode text into Python arrays.** Use `r"""..."""` raw strings
    + `io.StringIO` + `~|~` delimiter. No line breaks inside fields.

11. **Write a Processing_Log tab in every output file.**

## Hard Caps Per Response

| Limit | Cap | Why |
|-------|-----|-----|
| **EXTRACT — Issue rows per response** | **<= 15** | Issue statements can be lengthy |
| **EXTRACT — Argument rows per response** | **<= 20** | Legal arguments are verbose |
| **EXTRACT — Factual Assertion rows per response** | **<= 25** | Fact statements vary in length |
| **ENRICH rows per response** | **<= 15** | Cross-referencing is verbose |
| **VERIFY rows per response** | **<= 40** | Verification is lighter per row |

## THE RAW-STRING DATA RULE (prevents syntax crashes)

Same as DPB/CFP: use `r"""..."""` with `~|~` delimiter for all data output.

## Tabs Overview

| Tab | Purpose | Stage Created |
|-----|---------|---------------|
| **Motion_Index** | One row per filed motion/response/reply/order — metadata | EXTRACT |
| **Issues** | One row per discrete legal issue raised | EXTRACT |
| **Arguments** | One row per legal argument supporting an issue | EXTRACT |
| **Factual_Assertions** | One row per factual assertion made in the filing | EXTRACT |
| **Evidence_Submitted** | One row per exhibit/declaration/affidavit submitted | EXTRACT |
| **Response_Coverage** | Tracks which issues were addressed/not addressed in responses | ENRICH |
| **Reply_Coverage** | Tracks which response arguments were countered in replies | ENRICH |
| **Rulings** | Court rulings on motions | EXTRACT (when order is parsed) |
| **Processing_Log** | Audit trail | All stages |
| **README** | Human-readable summary | EXTRACT |

## Tab Schemas

### Motion_Index (one row per filing — 16 columns)

| Column | Required | Notes |
|--------|----------|-------|
| MotionID | Yes | Format: `[CASE]-[TYPE]-[SEQ]` e.g. `ALIPAT-MSJ-001` |
| FilingType | Yes | Controlled: `MOTION` / `RESPONSE` / `REPLY` / `SUR-REPLY` / `ORDER` / `NOTICE` |
| MotionType | Yes | `MSJ` / `MTD` / `MTC` / `MIL` / `MTStrike` / `MForSanctions` / `MToAmend` / `MTTransfer` / `MTStay` / `MTReconsider` / `OTHER` |
| ParentMotionID | If applicable | For responses/replies: the MotionID being responded to |
| FilingParty | Yes | Full name of the filing party |
| FilingPartyRole | Yes | `PLAINTIFF` / `DEFENDANT` / `CROSS-CLAIMANT` / `THIRD-PARTY` |
| FilingDate | Yes | YYYY-MM-DD |
| CourtName | Yes | Full court name |
| CaseNumber | Yes | Case number |
| TotalIssues | Yes | Count of discrete issues raised |
| TotalArguments | Yes | Count of argument rows extracted |
| TotalFactualAssertions | Yes | Count of factual assertion rows |
| TotalExhibits | Yes | Count of exhibits/declarations submitted |
| DocID | Yes | CFP File_Metadata DocID for traceability |
| SourceFile | Yes | Original filename |
| Notes | Optional | |

### Issues (one row per legal issue — 12 columns)

| Column | Required | Notes |
|--------|----------|-------|
| IssueID | Yes | Format: `[MotionID]-I-[Num]` e.g. `ALIPAT-MSJ-001-I-03` |
| MotionID | Yes | FK -> Motion_Index.MotionID |
| IssueNum | Yes | Sequential number within the motion |
| VerbatimIssueStatement | Yes | EXACT text of the issue as framed in the filing |
| IssueCategory | ENRICH | `JURISDICTION` / `STANDING` / `FAILURE-TO-STATE` / `SJ-ELEMENT` / `DISCOVERY-COMPEL` / `EVIDENCE-EXCLUDE` / `SANCTIONS` / `PROCEDURE` / `DAMAGES` / `OTHER` |
| RelatedElement_IDs | ENRICH | Element_IDs this issue relates to (for PCM/PDM cross-ref) |
| ResponseStatus | ENRICH | `ADDRESSED` / `NOT-ADDRESSED` / `PARTIALLY-ADDRESSED` / `CONCEDED` / `N/A` |
| ResponseMotionID | ENRICH | MotionID of the response that addresses this issue |
| RulingStatus | ENRICH | `GRANTED` / `DENIED` / `GRANTED-IN-PART` / `MOOT` / `DEFERRED` / `PENDING` |
| RulingMotionID | If applicable | MotionID of the order ruling on this issue |
| PageRef | Yes | Page/section reference in the source filing |
| Notes | Optional | |

### Arguments (one row per legal argument — 14 columns)

| Column | Required | Notes |
|--------|----------|-------|
| ArgumentID | Yes | Format: `[MotionID]-ARG-[Num]` |
| MotionID | Yes | FK -> Motion_Index.MotionID |
| IssueID | Yes | FK -> Issues.IssueID (which issue this argument supports) |
| ArgumentNum | Yes | Sequential within the motion |
| VerbatimArgument | Yes | EXACT text of the legal argument |
| AuthorityCited | Yes | Verbatim case/statute cited. `[NO AUTHORITY CITED]` if none. |
| AuthorityPinpoint | If applicable | Page, paragraph, or section of cited authority |
| ArgumentType | ENRICH | `RULE-STATEMENT` / `RULE-APPLICATION` / `POLICY-ARGUMENT` / `ANALOGY` / `DISTINCTION` / `REBUTTAL` / `BURDEN-SHIFTING` / `STANDARD-OF-REVIEW` |
| ValidityFlag | ENRICH | `VALID` / `VERIFY-CITE` / `UNCITED` / `STANDARD-CHECK` / `PERSUASIVE-ONLY` / `OVERRULED` |
| LPB_LawTag | ENRICH | Cross-reference to LPB authority if verified |
| CounterArgumentID | ENRICH | If this is a response argument, the motion ArgumentID being countered |
| ResponseStatus | ENRICH | For motion arguments: was this countered in the response? `COUNTERED` / `UNCOUNTERED` / `N/A` |
| PageRef | Yes | Page/section reference in the source filing |
| Notes | Optional | |

### Factual_Assertions (one row per factual assertion — 14 columns)

| Column | Required | Notes |
|--------|----------|-------|
| AssertionID | Yes | Format: `[MotionID]-FA-[Num]` |
| MotionID | Yes | FK -> Motion_Index.MotionID |
| IssueID | If applicable | FK -> Issues.IssueID (which issue this fact supports) |
| AssertionNum | Yes | Sequential within the motion |
| VerbatimAssertion | Yes | EXACT text of the factual assertion |
| EvidenceCited | Yes | What evidence supports this assertion. `[NO EVIDENCE CITED]` if none. |
| EvidencePinpoint | If applicable | Bates/page:line of cited evidence |
| AssertingParty | Yes | Party making the assertion |
| CFP_CrossRef | ENRICH | Cross-reference to CFP Fact# if fact exists in CFP |
| CFP_Consistency | ENRICH | `CONSISTENT` / `INCONSISTENT` / `NEW-FACT` / `NOT-IN-CFP` |
| NewEvidence | ENRICH | `Y` if this assertion cites evidence not previously in the record, `N` otherwise |
| DisputeStatus | ENRICH | `UNDISPUTED` / `DISPUTED` / `NOT-ADDRESSED` / `ACKNOWLEDGED` (from response) |
| PageRef | Yes | Page/section reference in the source filing |
| Notes | Optional | |

### Evidence_Submitted (one row per exhibit — 12 columns)

| Column | Required | Notes |
|--------|----------|-------|
| EvidenceID | Yes | Format: `[MotionID]-EX-[Num]` |
| MotionID | Yes | FK -> Motion_Index.MotionID |
| ExhibitLabel | Yes | As labeled in the filing (e.g., "Exhibit A", "Declaration of John Smith") |
| EvidenceType | Yes | `DECLARATION` / `AFFIDAVIT` / `DEPOSITION-EXCERPT` / `DOCUMENT` / `RECORD` / `EXPERT-REPORT` / `PHOTO-VIDEO` / `OTHER` |
| Description | Yes | Brief description of the evidence |
| BatesOrPinpoint | If applicable | Bates numbers or page references |
| IsNewToRecord | Yes | `Y` if not previously in the case record, `N` if already known |
| CFP_DocID | ENRICH | Cross-reference to CFP File_Metadata if imported |
| FlagForCFP | ENRICH | `Y` if this new evidence should be extracted into CFP, `N` otherwise |
| SubmittingParty | Yes | Who submitted this evidence |
| AuthenticatedBy | If applicable | Declaration/affidavit authenticating this exhibit |
| Notes | Optional | |

### Response_Coverage (derived in ENRICH — 10 columns)

| Column | Required | Notes |
|--------|----------|-------|
| CoverageID | Yes | Format: `[ResponseMotionID]-COV-[IssueNum]` |
| MotionIssueID | Yes | FK -> Issues.IssueID (from the original motion) |
| ResponseMotionID | Yes | FK -> Motion_Index.MotionID (the response) |
| IssueStatement | Yes | Verbatim issue from the motion (for reference) |
| CoverageStatus | Yes | `ADDRESSED` / `NOT-ADDRESSED` / `PARTIALLY-ADDRESSED` / `CONCEDED` |
| ResponseArguments | If addressed | ArgumentIDs from the response that address this issue |
| ResponseFactualAssertions | If addressed | AssertionIDs from the response addressing this issue's facts |
| FactsAcknowledged | ENRICH | Motion facts acknowledged in the response |
| FactsDisputed | ENRICH | Motion facts disputed in the response |
| FactsNotAddressed | ENRICH | Motion facts not mentioned in the response |

### Reply_Coverage (derived in ENRICH — 8 columns)

| Column | Required | Notes |
|--------|----------|-------|
| ReplyCoverageID | Yes | Format: `[ReplyMotionID]-RCOV-[Num]` |
| ResponseArgumentID | Yes | FK -> Arguments.ArgumentID (from the response) |
| ReplyMotionID | Yes | FK -> Motion_Index.MotionID (the reply) |
| CoverageStatus | Yes | `COUNTERED` / `NOT-COUNTERED` / `CONCEDED-BY-SILENCE` |
| ReplyArguments | If countered | ArgumentIDs from the reply that counter this point |
| NewArgumentFlag | Yes | `Y` if reply raises new argument not in original motion (potentially improper) |
| ImproperNewMatter | ENRICH | `Y` if new argument constitutes improper new matter in reply, `N` otherwise |
| Notes | Optional | |

### Rulings (one row per ruling — 12 columns)

| Column | Required | Notes |
|--------|----------|-------|
| RulingID | Yes | Format: `[CASE]-RULING-[Num]` |
| MotionID | Yes | FK -> Motion_Index.MotionID (the motion ruled upon) |
| OrderMotionID | Yes | FK -> Motion_Index.MotionID (the order document) |
| RulingDate | Yes | YYYY-MM-DD |
| Judge | Yes | Name of the ruling judge |
| VerbatimRuling | Yes | EXACT text of the ruling/order |
| RulingResult | Yes | `GRANTED` / `DENIED` / `GRANTED-IN-PART` / `DENIED-IN-PART` / `MOOT` / `DEFERRED` / `WITHDRAWN` |
| RulingBasis | Yes | Verbatim reasoning stated by the court |
| AffectsLOTC | ENRICH | `Y` if ruling establishes law of the case, `N` otherwise |
| LOTC_Ref | ENRICH | Cross-reference to LOTC pack entry if created |
| AffectsCAL | ENRICH | `Y` if ruling creates or modifies deadlines |
| Notes | Optional | |

## Stage 1: EXTRACT (from filed motions)

Read `references/extract.md` before starting.

### What it does

Takes a filed motion, response, reply, or order and extracts every discrete
issue, argument, factual assertion, and evidence submission into structured
rows, preserving verbatim text and perfect attribution.

### EXTRACT Workflow

1. **Identify the filing type** (motion, response, reply, order).
2. **Create Motion_Index row** with metadata from the caption/filing.
3. **For MOTIONS:** Extract each discrete issue into Issues tab. Extract each
   legal argument into Arguments tab. Extract each factual assertion into
   Factual_Assertions tab. Extract each exhibit into Evidence_Submitted tab.
4. **For RESPONSES:** Same extraction, PLUS link each argument to the motion
   issue it addresses. Track which motion issues are addressed and which are not.
5. **For REPLIES:** Same extraction, PLUS link each argument to the response
   argument it counters. Flag any new arguments not in the original motion.
6. **For ORDERS:** Extract the ruling, basis, and result for each issue.

### Chunking Rule

For lengthy motions (>20 pages), process in chunks. Each chunk appends rows
to the growing Excel file.

## Stage 2: ENRICH (add classification and cross-referencing)

Read `references/enrich.md` before starting.

### What it does

- Classifies issues (IssueCategory)
- Classifies arguments (ArgumentType, ValidityFlag)
- Cross-references factual assertions against CFP
- Flags new evidence for CFP review
- Builds Response_Coverage and Reply_Coverage tabs
- Tags Element_IDs for PCM/PDM cross-reference
- Cross-references legal assertions against LPB

### ENRICH Does NOT:
- Add new issue, argument, or assertion rows
- Change verbatim text fields
- Resolve legal validity questions (flags them for LPB verification)

## Stage 3: VERIFY (source-check and QA)

Read `references/verify.md` before starting.

### What it does

Source-checks every entry against the filed documents. Confirms verbatim
accuracy, issue coverage, argument attribution, and evidence cataloging.

## Attorney Checkpoints

**CHECKPOINT 1: Legal Validity Assessment** — During ENRICH, when legal
assertions are flagged as potentially invalid (`VERIFY-CITE`, `STANDARD-CHECK`,
`OVERRULED`). Present: (a) the flagged assertion with its authority, (b) the
concern, (c) recommendation (challenge vs. distinguish vs. accept). Attorney
decides which assertions to challenge in our law packs.

**CHECKPOINT 2: Response Gap Strategy** — During ENRICH for responses, when
motion issues are identified as NOT-ADDRESSED. Present: (a) the unaddressed
issues, (b) strategic implications (concession vs. oversight), (c) recommended
action (supplemental brief, oral argument, concede). Attorney decides how to
handle gaps.

## Downstream Data Flow

- **MPR -> CFP (New Evidence ONLY):** Only Evidence_Submitted entries where
  `IsNewToRecord=Y` and `FlagForCFP=Y` trigger CFP extraction (attorney
  approval required). Motion factual assertions do NOT flow to CFP — motions
  are advocacy. CFP fact rows point to original evidence, NOT the motion.
- **MPR -> LOTC:** Rulings flagged `AffectsLOTC=Y` feed Law of the Case pack.
  LOTC entries override global LP entries on matching legal points.
- **MPR -> LPB:** Arguments with `ValidityFlag != VALID` create LPB tasks:
  VERIFY-CITE (Shepardize), UNCITED (research basis), STANDARD-CHECK (verify
  standard), PERSUASIVE-ONLY (confirm jurisdiction), OVERRULED (confirm status).
- **MPR -> MSJ/MTC/MTD-R:** Downstream skills consume MPR packets to reference
  prior arguments, avoid contradicting earlier positions, build on rulings,
  and identify issues already decided.

## Integration Points

| System | How MPR Connects |
|--------|-----------------|
| **CFP** | MPR flags new evidence for CFP extraction. Motion factual assertions are NOT CFP facts — they are checked against CFP for consistency only. |
| **LPB** | MPR argument authorities cross-reference to LPB. Validity flags create LPB research tasks. |
| **LOTC** | MPR rulings with `AffectsLOTC=Y` feed Law of the Case pack creation. |
| **PCM/PDM** | MPR issues and arguments tagged with Element_IDs show which claim/defense elements are being litigated in motions. |
| **PSR** | If a ruling affects the pleading state (e.g., MTD granted on one count, MToAmend granted), PSR Claims_Register is updated. |
| **DPB** | Discovery motions (MTC) link to DPB deficiency rows. MTC outcomes update DPB states. |
| **MSJ** | MSJ drafting consumes MPR for prior positions, rulings, and argument history. |
| **MTC** | MTC drafting consumes MPR for meet-confer history and prior discovery motion outcomes. |
| **MTD-R** | MTD response drafting consumes MPR for the motion being responded to. |
| **CAL** | Rulings that create or modify deadlines trigger CAL updates. |
| **SA** | Save per Save Map: Motions -> MPR Packs. |

## Input Hygiene

**Prohibited** -> respond `OUT OF SCOPE — requires BAA environment`:
- sealed motions, in-camera submissions

**Allowed:** Filed motions with standard litigation redactions applied.

## Excel Output (all modes)

Read the xlsx SKILL.md (`/mnt/skills/public/xlsx/SKILL.md`) when creating Excel files.
Use openpyxl for workbook creation/structure. Use pandas for data operations.
Every save must copy to `/mnt/user-data/outputs/` so the user can download.

## Response Template (every chunk response)

```
**Mode: [MODE] | Filing: [FilingType] | Chunk [N] of ~[M] | Stage [#]**

[Minimal prose: what was extracted/processed]

---
**Chunk [N] complete.**
- Issues: [X] new ([Y] total)
- Arguments: [X] new ([Y] total)
- Factual Assertions: [X] new ([Y] total)
- Evidence: [X] new ([Y] total)
- Validity Flags: [list any VERIFY-CITE, UNCITED, STANDARD-CHECK flags]
- New Evidence for CFP: [count flagged]
- Saved: [filename.xlsx]

Reply 'continue' for next chunk.
```

## Reference Files

- `references/extract.md` — EXTRACT stage schema + workflow + code patterns
- `references/combine.md` — COMBINE stage merge rules
- `references/enrich.md` — ENRICH stage classification + cross-referencing + derived tabs
- `references/verify.md` — VERIFY stage checklist + accuracy protocol
- `references/packet.md` — PACKET mode filtered output templates
