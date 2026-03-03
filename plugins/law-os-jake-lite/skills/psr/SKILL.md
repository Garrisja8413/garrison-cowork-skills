---
name: psr
display_name: "Pleading State Register"
description: >-
  Pleading State Register (PSR) — the single source of truth (SSOT) for all
  pleading data in a case. Extracts verbatim allegations, responses,
  admissions, denials, affirmative defenses, claims, counterclaims, and
  cross-claims from filed pleadings into a structured Excel workbook with
  perfect party attribution. The AI does not generate or paraphrase — every
  entry preserves exact source language. PSR is the authoritative record of
  who alleged, admitted, or denied what, on what grounds. Feeds CFP, PCM,
  PDM, ADR, Complaint, and MSJ. TRIGGERS: Use when user mentions "pleading
  register", "PSR", "pleading SSOT", "extract pleadings", "parse the
  answer", "parse the complaint", "track admissions", "track denials",
  "affirmative defense register", "claims register", or uploads
  complaint/answer pairs for extraction (v1.0)
version: "1.0"
category: builder
pack_consumes:
  - Complaint (filed pleading)
  - Answer (filed pleading)
  - Amended Complaint (if filed)
  - Amended Answer (if filed)
  - Counterclaim (if filed)
  - Cross-Claim (if filed)
  - Reply to Counterclaim (if filed)
pack_produces:
  - PSR Excel workbook
checkpoints: 2
author: "Parnall & Adams"
license: Proprietary
---

# PSR (Pleading State Register) — v1.0

## THE #1 RULE: THIS IS A DATA EXTRACTION SKILL, NOT A GENERATION SKILL

The PSR extracts, organizes, and reproduces pleading content verbatim. The AI
does not generate, paraphrase, summarize, or interpret the language of any
pleading. Every field that contains pleading content must be a verbatim copy
from the source document. The only AI contribution is structural organization,
tagging, and cross-referencing — never the substance.

**If it was not written in the pleading, it does not appear in the PSR.**

## Mission

Provide a single, authoritative, structured record of every allegation,
response, admission, denial, affirmative defense, claim, counterclaim, and
cross-claim in a case — with perfect attribution to the party who made each
assertion in the specific pleading where it appears. Downstream skills consume
the PSR as the canonical source of pleading truth. There must never be any
confusion about:

- Who alleged what (verbatim allegation text + paragraph number + source pleading)
- Who admitted what (verbatim admission + paragraph number + source pleading)
- Who denied what and on what grounds (verbatim denial + stated basis + paragraph number)
- What each party's affirmative defenses are (verbatim defense text + elements)
- What claims, counterclaims, and cross-claims exist (verbatim + party attribution)

**There is no room for error. Mistakes are unacceptable.**

## Architecture: EXTRACT -> ENRICH -> VERIFY

```
Filed Pleadings ──► EXTRACT ──► .xlsx ──► ENRICH ──► .xlsx ──► VERIFY ──► final .xlsx
(Complaint,          │                      │                      │
 Answer,             │                      │                      │
 Amended,            │                      │                      │
 Counterclaims,      Verbatim              Add tags,             Source-check
 Cross-Claims,       paragraph-by-         Element_IDs,          every entry
 Replies)            paragraph             party roles,          against filed
                     extraction            claim/defense         pleading
                                           classification        documents
                                                                    │
                                                    ┌───────────────┘
                                                    ▼
                                              CFP (admitted facts)
                                              PCM (claims)
                                              PDM (defenses)
                                              ADR (answer diagnostics)
                                              Complaint (amended drafting)
                                              MSJ (undisputed facts)
```

## Modes

| Mode | Stage | Input | Output | Reference |
|------|-------|-------|--------|-----------|
| **EXTRACT** | 1 | Filed pleading document(s) | `PSR-Extract-[CaseCode]-[PleadingType].xlsx` | `references/extract.md` |
| **COMBINE** | 1 | Multiple PSR Extract files | `PSR-Combined-[CaseCode]-Master.xlsx` | `references/combine.md` |
| **ENRICH** | 2 | Extract/Combined .xlsx | `PSR-Enriched-[CaseCode].xlsx` | `references/enrich.md` |
| **VERIFY** | 3 | Enriched .xlsx | `PSR-Verified-[CaseCode].xlsx` + QA report | `references/verify.md` |
| **PACKET** | Any | Any PSR .xlsx | Filtered markdown packet | `references/packet.md` |

**How to pick a mode:**
- User uploads a complaint or answer for extraction -> **EXTRACT**
- User has multiple PSR extracts to merge (e.g., original + amended) -> **COMBINE**
- User has extracted rows and wants tagging/classification -> **ENRICH**
- User wants source verification before downstream use -> **VERIFY**
- User needs a filtered subset for a downstream skill -> **PACKET**

## Pack Locations (v1.1)

**Save outputs to:** `cases/{CASE_CODE}/psr/`
**Naming:** `PSR-{Stage}-{CASE_CODE}-{Descriptor}.xlsx`
  - Examples: `PSR-Extract-ALIPAT-Complaint.xlsx`, `PSR-Extract-ALIPAT-Answer.xlsx`,
    `PSR-Combined-ALIPAT-Master.xlsx`

**Before starting EXTRACT or COMBINE:**
1. Ask the user for the case code if not established.
2. Verify `cases/{CASE_CODE}/psr/` exists; create it if not.
3. List existing PSRs in that directory so the user knows what already exists.

## Hard Rules (ALL MODES)

1. **VERBATIM EXTRACTION ONLY.** Every allegation, response, objection, defense,
   and claim must be reproduced using the exact language from the source pleading.
   No paraphrasing. No summarizing. No "cleaning up" language. No correcting
   grammar or spelling. Copy exactly as written. The only acceptable modification
   is truncation with `[FULL TEXT IN SOURCE — ¶XX]` for entries exceeding 2000
   characters, preserving the first 1500 characters verbatim.

2. **PERFECT ATTRIBUTION.** Every row must identify:
   - **Who** made the assertion (party name, as identified in the pleading)
   - **What** they asserted (verbatim text)
   - **Where** they asserted it (pleading document + paragraph number)
   - **When** the pleading was filed (filing date)
   Attribution errors are unacceptable. If attribution is ambiguous, flag as
   `[ATTRIBUTION-AMBIGUOUS]` and include both possible attributions.

3. **ONE ROW PER PARAGRAPH.** Each numbered paragraph in a pleading gets exactly
   one row in the appropriate tab. Multi-sentence paragraphs stay as one row
   (they are one paragraph in the pleading). Do NOT micro-decompose pleading
   paragraphs — that is CFP's job after PSR feeds it.

4. **NEVER INVENT** paragraph numbers, party names, filing dates, causes of
   action, defense names, admission/denial classifications, or any other data.
   If a piece of information is not in the source pleading, use `[NOT STATED]`.

5. **PRESERVE PARAGRAPH NUMBERING EXACTLY.** Use the paragraph numbers as they
   appear in the pleading. If a pleading uses "1." use "1". If it uses "¶ 1"
   use "1". If paragraphs are not numbered, assign temporary numbers as
   `[UNNUMBERED-1]`, `[UNNUMBERED-2]`, etc. and flag for attorney review.

6. **NEVER SKIP PARAGRAPHS.** Every substantive paragraph must be extracted.
   If a paragraph contains only a section heading (e.g., "COUNT I — NEGLIGENCE"),
   extract it as a structural row with `RowType=HEADING`.

7. **DENIALS MUST INCLUDE GROUNDS.** When extracting a denial, if the answering
   party states grounds or qualifications, those must be captured verbatim in
   the `DenialBasis` field. A bare denial with no stated basis gets
   `DenialBasis=[NONE STATED]`.

8. **AFFIRMATIVE DEFENSES ARE SEPARATE FROM DENIALS.** Affirmative defenses
   asserted in an answer go into the `Affirmative_Defenses` tab, NOT the
   `Responses` tab. The `Responses` tab tracks only responses to specific
   numbered allegations.

9. **CROSS-PLEADING CONSISTENCY.** When extracting an answer, every paragraph
   number referenced in the answer MUST match a paragraph number in the
   complaint extract. If they don't match, flag as `[PARAGRAPH-MISMATCH]`.

10. **Never exceed row caps.** Stop, save, ask for 'continue'. See caps below.

11. **Never hardcode text into Python arrays.** Use `r"""..."""` raw strings
    + `io.StringIO` + `~|~` delimiter. No line breaks inside fields.

12. **Write a Processing_Log tab in every output file.** Record: Stage,
    Timestamp, InputFile, Action, RowsProcessed, SkillVersion, Notes.

## Hard Caps Per Response (ROW-COUNT IS THE PRIMARY GOVERNOR)

| Limit | Cap | Why |
|-------|-----|-----|
| **EXTRACT — Allegations rows** | **<= 30** | Verbatim text is long per row |
| **EXTRACT — Responses rows** | **<= 25** | Response + basis text is lengthy |
| **EXTRACT — Affirmative Defense rows** | **<= 15** | Defense text can be substantial |
| **ENRICH rows per response** | **<= 20** | Adding classification is verbose |
| **VERIFY rows per response** | **<= 40** | Verification is lighter per row |

**If you are approaching ANY row cap, STOP. Save the file. Tell the user to
reply 'continue'. Do NOT try to squeeze in more rows.**

## THE RAW-STRING DATA RULE (prevents syntax crashes)

**NEVER hardcode extracted pleading text into Python list literals or string arrays.**
Pleading text contains nested quotes, apostrophes, section symbols, special
characters, and legal formatting that will cause `SyntaxError`.

Instead, use this pattern for ALL data output:
1. Write extracted rows inside a raw triple-quoted string (`r"""..."""`) using
   `~|~` as delimiter
2. **NO line breaks inside fields** — every record must be on one single line.
   Replace any newlines in extracted text with a space.
3. Parse with `pd.read_csv(io.StringIO(raw_string), sep=r"~\|~", engine="python")`
4. Append the DataFrame to the Excel workbook

## Tabs Overview

| Tab | Purpose | Stage Created |
|-----|---------|---------------|
| **Pleading_Index** | One row per filed pleading document — metadata | EXTRACT |
| **Allegations** | One row per numbered allegation paragraph — verbatim | EXTRACT |
| **Responses** | One row per response to each allegation — verbatim | EXTRACT |
| **Affirmative_Defenses** | One row per asserted affirmative defense — verbatim | EXTRACT |
| **Claims_Register** | One row per claim/counterclaim/cross-claim | EXTRACT |
| **Admissions_Map** | Derived: all admitted allegations with party attribution | ENRICH |
| **Denials_Map** | Derived: all denied allegations with grounds and attribution | ENRICH |
| **Processing_Log** | Audit trail | All stages |
| **README** | Human-readable summary | EXTRACT |

## Tab Schemas

### Pleading_Index (one row per filed pleading — 14 columns)

| Column | Required | Notes |
|--------|----------|-------|
| PleadingID | Yes | Format: `[CASE]-[TYPE]-[SEQ]` e.g. `ALIPAT-COMPLAINT-001` |
| PleadingType | Yes | Controlled: `COMPLAINT` / `AMENDED-COMPLAINT` / `ANSWER` / `AMENDED-ANSWER` / `COUNTERCLAIM` / `CROSS-CLAIM` / `REPLY-TO-COUNTERCLAIM` / `THIRD-PARTY-COMPLAINT` |
| FilingParty | Yes | Full name of the filing party as identified in the pleading |
| FilingPartyRole | Yes | `PLAINTIFF` / `DEFENDANT` / `CROSS-CLAIMANT` / `COUNTER-CLAIMANT` / `THIRD-PARTY-PLAINTIFF` |
| RespondingParty | If applicable | For answers/responses: who is responding |
| FilingDate | Yes | YYYY-MM-DD. `[DATE NOT STATED]` if not in document. |
| CourtName | Yes | Full court name as stated in caption |
| CaseNumber | Yes | Case number as stated in caption |
| TotalParagraphs | Yes | Count of numbered paragraphs extracted |
| TotalCausesOfAction | If applicable | Count of causes of action / counts |
| TotalAffirmativeDefenses | If applicable | Count of affirmative defenses |
| DocID | Yes | CFP File_Metadata DocID for traceability |
| SourceFile | Yes | Original filename or document description |
| Notes | Optional | |

### Allegations (one row per numbered allegation paragraph — 10 columns)

| Column | Required | Notes |
|--------|----------|-------|
| AllegationID | Yes | Format: `[PleadingID]-A-[ParaNum]` e.g. `ALIPAT-COMPLAINT-001-A-15` |
| PleadingID | Yes | FK -> Pleading_Index.PleadingID |
| ParaNum | Yes | Paragraph number as it appears in the pleading |
| RowType | Yes | `ALLEGATION` / `HEADING` / `INCORPORATION` / `PRAYER` / `JURY-DEMAND` |
| AllegingParty | Yes | Party making the allegation |
| VerbatimText | Yes | EXACT text of the paragraph. No paraphrase. |
| CountOrSection | If applicable | Which cause of action or section (e.g., "COUNT I — NEGLIGENCE") |
| TargetParty | If identifiable | Party the allegation is directed at (e.g., specific defendant) |
| Element_ID | Optional (ENRICH) | Element_ID tag if allegation maps to a legal element |
| Notes | Optional | |

### Responses (one row per response to each allegation — 14 columns)

| Column | Required | Notes |
|--------|----------|-------|
| ResponseID | Yes | Format: `[PleadingID]-R-[ParaNum]` e.g. `ALIPAT-ANSWER-001-R-15` |
| PleadingID | Yes | FK -> Pleading_Index.PleadingID (the answer/response document) |
| AllegationID | Yes | FK -> Allegations.AllegationID (the allegation being responded to) |
| AllegationParaNum | Yes | Paragraph number in the complaint being addressed |
| ResponseParaNum | Yes | Paragraph number in the answer |
| RespondingParty | Yes | Party making the response |
| ResponseType | Yes | Controlled: `ADMITTED` / `DENIED` / `DENIED-IN-PART-ADMITTED-IN-PART` / `INSUFFICIENT-KNOWLEDGE` / `NO-RESPONSE` / `EVASIVE` / `QUALIFIED` / `INCORPORATION` |
| VerbatimResponse | Yes | EXACT text of the response paragraph. No paraphrase. |
| DenialBasis | If denied | Verbatim grounds stated for denial. `[NONE STATED]` if bare denial. |
| AdmittedPortion | If partial | Verbatim: what was admitted in a partial admission |
| DeniedPortion | If partial | Verbatim: what was denied in a partial denial |
| ResponseClassification | ENRICH | `PROPER-ADMISSION` / `PROPER-DENIAL` / `BLANKET-DENIAL` / `EVASIVE-DENIAL` / `LKI-IMPROPER` / `PARTIAL-ADMIT-NEEDED` / `DEEMED-ADMITTED` / `QUALIFIED-RESPONSE` |
| DefectFlag | ENRICH | `NONE` / `BLANKET` / `EVASIVE` / `LKI-IMPROPER` / `NO-RESPONSE` / `INTERNAL-CONFLICT` |
| Notes | Optional | |

### Affirmative_Defenses (one row per defense — 12 columns)

| Column | Required | Notes |
|--------|----------|-------|
| DefenseID | Yes | Format: `[PleadingID]-AD-[Num]` e.g. `ALIPAT-ANSWER-001-AD-03` |
| PleadingID | Yes | FK -> Pleading_Index.PleadingID |
| DefenseNum | Yes | Number as it appears in the pleading (e.g., "Third Affirmative Defense") |
| AssertingParty | Yes | Party asserting this defense |
| DefenseType | ENRICH | Controlled: `COMPARATIVE-NEGLIGENCE` / `ASSUMPTION-OF-RISK` / `SOL` / `FAILURE-TO-MITIGATE` / `IMMUNITY` / `PREEMPTION` / `CONTRIBUTORY-NEGLIGENCE` / `RELEASE-WAIVER` / `ACCORD-SATISFACTION` / `ESTOPPEL` / `LACHES` / `OTHER` |
| VerbatimText | Yes | EXACT text of the affirmative defense. No paraphrase. |
| FactualBasis | EXTRACT | Verbatim factual assertions within the defense. `[NO FACTS STATED — BOILERPLATE]` if none. |
| LegalBasis | EXTRACT | Verbatim legal bases cited. `[NO LEGAL BASIS STATED]` if none. |
| DefectFlag | ENRICH | `NONE` / `BOILERPLATE` / `SPECIFICITY-FAIL` / `IMPROPER-RESERVATION` / `REDUNDANT-IMMATERIAL` / `CERT-FAILURE` / `DEFENSE-DENIAL-CONFLICT` |
| Element_ID | ENRICH | Defense Element_ID for PDM consumption |
| TargetClaims | ENRICH | Which claims this defense applies to (e.g., "COUNT I, COUNT III") |
| Notes | Optional | |

### Claims_Register (one row per claim/counterclaim/cross-claim — 14 columns)

| Column | Required | Notes |
|--------|----------|-------|
| ClaimID | Yes | Format: `[CASE]-[ClaimType]-[Num]` e.g. `ALIPAT-CLAIM-001` |
| PleadingID | Yes | FK -> Pleading_Index.PleadingID |
| ClaimType | Yes | `CLAIM` / `COUNTERCLAIM` / `CROSS-CLAIM` / `THIRD-PARTY-CLAIM` |
| ClaimLabel | Yes | As stated in pleading (e.g., "COUNT I — NEGLIGENCE") |
| AssertingParty | Yes | Party asserting the claim |
| TargetParty | Yes | Party the claim is asserted against |
| LegalBasis | Yes | Verbatim legal basis (statute, common law theory) as stated |
| VerbatimText | Yes | EXACT text of the cause of action / claim section |
| RequiredElements | ENRICH | List of required legal elements (from LPB cross-reference) |
| SupportingParagraphs | Yes | Paragraph numbers incorporated or referenced |
| Element_IDs | ENRICH | Element_ID tags for PCM/PDM consumption |
| Status | ENRICH | `ACTIVE` / `DISMISSED` / `WITHDRAWN` / `SETTLED` |
| DismissalBasis | If applicable | Verbatim ruling if dismissed |
| Notes | Optional | |

### Admissions_Map (derived in ENRICH — 10 columns)

See `references/enrich.md` Step 5 for full schema and generation code. Columns:
AdmissionID, ResponseID, AllegationID, AllegationParaNum, AdmittingParty,
AdmittedText, AdmissionType (FULL/PARTIAL/DEEMED), SourcePleading, CFP_FactRef, Notes.

### Denials_Map (derived in ENRICH — 12 columns)

See `references/enrich.md` Step 6 for full schema and generation code. Columns:
DenialID, ResponseID, AllegationID, AllegationParaNum, DenyingParty, DeniedText,
DenialType (GENERAL/SPECIFIC/QUALIFIED/INSUFFICIENT-KNOWLEDGE/PARTIAL),
DenialBasis, DefectFlag, DisputedFacts, SourcePleading, Notes.

## Stage 1: EXTRACT (from filed pleadings)

Read `references/extract.md` before starting. Takes a filed pleading and
extracts every paragraph into structured tabs, preserving verbatim text.
Workflow: identify pleading type → create Pleading_Index row → extract
paragraphs to Allegations/Responses tabs → extract affirmative defenses →
extract claims/counterclaims. For answers, match each response to its
allegation by paragraph number and classify as ADMITTED/DENIED/etc. based
on verbatim language (if ambiguous, use QUALIFIED and flag for review).

**Chunking:** For pleadings >30 paragraphs, process in chunks appending to
the Excel file.

## Stage 1b: COMBINE (merge multiple PSR extracts)

Read `references/combine.md` before starting. Merges 2+ PSR Extract files
into one consolidated workbook. Cross-links allegations to responses and
handles amendments. Amended pleadings supersede originals (marked SUPERSEDED).
Every answer response must link to a complaint allegation. Counterclaims and
cross-claims get their own Claims_Register entries.

## Stage 2: ENRICH (add classification and tagging)

Read `references/enrich.md` before starting. Adds ResponseClassification,
DefectFlag, DefenseType, Element_ID tagging, and builds derived Admissions_Map
and Denials_Map tabs. Does NOT add new rows, change verbatim text, or resolve
ambiguities (those stay flagged for attorney review).

## Stage 3: VERIFY (source-check and QA)

Read `references/verify.md` before starting. Source-checks every entry against
filed pleading documents: verbatim accuracy, paragraph numbering, response-
allegation linking, admission/denial classification, defense completeness,
claims completeness, cross-pleading consistency. Output: verified PSR Excel
with Status = VERIFIED / VERIFY-FAILED / ATTORNEY-REVIEW per row.

## Attorney Checkpoints

This skill pauses at two decision points (see `shared/templates/checkpoint-protocol.md`):

**CHECKPOINT 1: Ambiguous Responses** — During EXTRACT of an answer, when a
response paragraph uses ambiguous language that could be interpreted as either
an admission or denial (e.g., "Defendant lacks sufficient information to
admit or deny" for facts within defendant's knowledge). Present: (a) the
verbatim response text, (b) the allegation being responded to, (c) possible
classifications (INSUFFICIENT-KNOWLEDGE vs. EVASIVE vs. QUALIFIED), (d)
recommended classification with reasoning. Attorney selects the correct
classification.

**CHECKPOINT 2: Defense Classification Conflicts** — During ENRICH, when an
affirmative defense contradicts the party's own denial or when a defense
appears to be both boilerplate and potentially meritorious. Present: (a) the
defense text, (b) the conflicting denial(s), (c) possible DefectFlag values.
Attorney determines whether the conflict is genuine or how to classify.

## DATA ENGINEERING RULE

**COMBINE and VERIFY are data-engineering tasks.** Claude MUST write and execute
pandas scripts. Claude's text response should contain ONLY the summary/QA
report, not the row-by-row data.

**EXTRACT and ENRICH are semantic tasks.** Claude reads the source pleading,
makes judgments (admission vs. denial, defense classification), and outputs
structured rows via the raw-string pattern.

## Downstream Data Flow

- **PSR -> CFP (Admitted Facts):** Admissions_Map entries become DRAFT-READY
  facts. FULL: EvidenceType=JUDICIAL-ADMISSION, AdmisScore=10. DEEMED:
  EvidenceType=DEEMED-ADMISSION, AdmisScore=10. PARTIAL:
  EvidenceType=PARTIAL-ADMISSION, AdmisScore=8 (admitted portion only).
  Admissions are binding judicial admissions — highest-confidence facts.
- **PSR -> PCM:** Claims_Register Element_IDs feed PCM claims-side merge.
- **PSR -> PDM:** Affirmative_Defenses Element_IDs feed PDM defense-side merge.
- **PSR -> ADR:** ADR consumes PSR as structured input for answer diagnostics
  instead of re-parsing raw pleadings.
- **PSR -> MSJ:** Admissions_Map identifies undisputed facts for SUMF candidates.
  Denied facts with defective denials may also qualify.

## Integration Points

| System | How PSR Connects |
|--------|-----------------|
| **CFP** | PSR Admissions_Map exports admitted facts to CFP with `EvidenceType=JUDICIAL-ADMISSION`. Denied facts inform CFP dispute status. |
| **LPB** | PSR Claims_Register and Affirmative_Defenses reference legal elements that LPB must cover. PSR flags legal basis gaps. |
| **PCM** | PSR Claims_Register Element_IDs feed PCM claims-side merge. PSR provides the authoritative list of claims to prove. |
| **PDM** | PSR Affirmative_Defenses Element_IDs feed PDM defense-side merge. PSR provides the authoritative list of defenses to address. |
| **ADR** | ADR consumes PSR for structured answer diagnostics instead of re-parsing raw documents. Defect flags from PSR ENRICH drive ADR analysis. |
| **Complaint** | For amended complaints, PSR Denials_Map shows which allegations were denied and why — informing what to strengthen. |
| **MSJ** | PSR Admissions_Map provides admitted facts for SUMF. PSR Denials_Map identifies disputed vs. undisputed facts. |
| **DRP** | PSR Claims_Register informs what discovery is relevant to claims. Affirmative_Defenses inform what discovery is relevant to defenses. |
| **SA** | Save per Save Map: Pleadings -> PSR Packs. |

## Input Hygiene

**Prohibited** -> respond `OUT OF SCOPE — requires BAA environment`:
- sealed pleadings, protective-order-restricted filings

**Allowed:** Filed pleadings with standard litigation redactions applied.

## Excel Output (all modes)

Read the xlsx SKILL.md (`/mnt/skills/public/xlsx/SKILL.md`) when creating Excel files.
Use openpyxl for workbook creation/structure. Use pandas for data operations.
Every save must copy to `/mnt/user-data/outputs/` so the user can download.

**Save after EVERY chunk.** If the conversation errors, the user keeps progress.

## Response Template (every chunk response)

```
**Mode: [MODE] | Pleading: [PleadingType] | Chunk [N] of ~[M] | Stage [#]**

[Minimal prose: what was extracted/processed]

---
**Chunk [N] complete.**
- Allegations: [X] new ([Y] total)
- Responses: [X] new ([Y] total)
- Affirmative Defenses: [X] new ([Y] total)
- Claims: [X] new ([Y] total)
- Flags: [list any PARAGRAPH-MISMATCH, ATTRIBUTION-AMBIGUOUS, or VERIFY flags]
- Saved: [filename.xlsx]

Reply 'continue' for next chunk.
```

## Reference Files

- `references/extract.md` — EXTRACT stage schema + workflow + code patterns
- `references/combine.md` — COMBINE stage merge rules + cross-linking
- `references/enrich.md` — ENRICH stage classification rules + derived tab generation
- `references/verify.md` — VERIFY stage checklist + accuracy protocol
- `references/packet.md` — PACKET mode filtered output templates
