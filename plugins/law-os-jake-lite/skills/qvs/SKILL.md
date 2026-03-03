---
name: qvs
display_name: "Quotation Verbatim Skill"
description: >-
  Quotation Verbatim Skill (QVS). Extracts exact, verbatim quotes from source
  documents with ZERO TOLERANCE for variation. Every character, space,
  punctuation mark, and formatting element must match the source exactly.
  Provides pinpoint citations and integrity verification. Used by DRP, GFL,
  MTC, and other skills that require guaranteed-accurate quotations from
  discovery documents, deposition transcripts, contracts, medical records, and
  other source materials. TRIGGERS: Use this skill when the user mentions
  "verbatim quote", "exact quote", "quote from document", "QVS", "zero
  tolerance", "exact text", "pull quote", "verbatim extract", "quote
  verbatim", "exact wording", "precise quote", or wants to extract exact text
  from a document with no paraphrasing. Do NOT use for paraphrasing or
  summarizing — those are different tasks (v1.0)
version: "1.0"
category: discovery-response
pack_consumes:
  - Source documents
pack_produces:
  - QVS quote pack
checkpoints: 0
author: "Parnall & Adams"
license: Proprietary
---

## Pack Dependencies
**Consumes:**
- Source documents (any format)
- CFP (existing quotes for deduplication)

**Produces:**
- QVS Quote Pack (verbatim extracts with zero-tolerance verification)

# QVS (Quotation Verbatim Skill) — v1.0

## What This Skill Does

Extracts exact, verbatim quotations from source documents with **absolute zero
tolerance** for any variation from the original text. Not one word changed. Not
one comma moved. Not one capitalization altered. The source text is sacred.

This skill exists because legal work demands perfect fidelity to source
material. A single word changed in a contract clause, a deposition answer, or
a medical record can alter legal meaning. The QVS is the guarantee layer that
other skills rely on when they need quotes they can cite with confidence.

## The Zero-Tolerance Standard

**ZERO TOLERANCE means:**
- Every character must match the source exactly
- No "fixing" grammar, spelling, or punctuation — reproduce errors with `[sic]`
- No substituting words, even synonyms
- No reordering clauses or sentences
- No omitting words without `[...]` ellipsis notation
- No adding words without `[brackets]` to indicate insertion
- No changing capitalization, hyphenation, or spacing
- If the source has a typo, reproduce the typo
- If the source has unusual formatting, note it in metadata

**Permitted modifications (with notation):**
- `[...]` — omission of non-essential words (must not change meaning)
- `[sic]` — indicating error in original
- `[emphasis added]` / `[emphasis in original]` — noting emphasis
- `[bracketed additions]` — clarifying pronoun referents or context
- All modifications must be noted in the Quote Metadata

## Architecture

```
Source Document(s) ─────┐
                        ├── QVS ──► Quote Pack
CFP (existing quotes) ──┘           + Verification Report
                                    + Pinpoint Index
                                        │
                        ┌───────────────┘
                        ▼
                  DRP (discovery responses)
                  GFL (good faith letters)
                  MTC (motions to compel)
                  MSJ (summary judgment)
                  CFP (quote enrichment)
                  Any drafting skill
```

## Modes

| Mode | Purpose |
|------|---------|
| **EXTRACT** | Pull verbatim quotes from uploaded source document(s) |
| **VERIFY** | Check existing quotes against source for accuracy |
| **COMPARE** | Compare two versions of text for differences |
| **INDEX** | Build a pinpoint index of all quotes from a document |
| **REFRESH** | Re-extract quotes from updated source documents |

## Pack Locations (v1.1)

**Read CFP from:** `cases/{CASE_CODE}/cfp/`
**Read DPB from:** `cases/{CASE_CODE}/dpb/`
**Save response drafts to:** `cases/{CASE_CODE}/drafts/`

## Hard Rules

1. **ZERO TOLERANCE.** Every character must match the source. No exceptions.
2. **Never paraphrase.** If the user wants a summary, that is a different skill.
3. **Pinpoint required.** Every quote must include a pinpoint citation:
   - Documents: Page number, paragraph number, section number, or Bates number
   - Depositions: Page:Line (e.g., "45:12-46:3")
   - Contracts: Section, paragraph, clause number
   - Medical records: Date of entry, provider, page
   - Correspondence: Date, author, recipient, page
4. **Source identification required.** Every quote must identify the source document
   by: Title/Description, Date, Author (if applicable), DocID/Bates (if available).
5. **Context preservation.** Include sufficient surrounding text to prevent
   misleading extraction. Flag potential out-of-context risks.
6. **Integrity hash.** Generate a character count and word count for each quote
   to enable downstream verification.
7. **Never combine quotes.** Each quote is a discrete unit. If two passages
   are needed, extract two separate quotes. Never stitch them together.
8. **Modification logging.** Any permitted modification (`[...]`, `[sic]`, etc.)
   must be logged in the Quote Metadata with justification.
9. **Deduplication.** If a CFP Quote Pack is provided, flag duplicates rather
   than re-extracting.

## Quote Pack Schema

Each extracted quote is a record in the Quote Pack:

| Field | Type | Description |
|-------|------|-------------|
| **QuoteID** | TEXT | Unique identifier: `QVS-[DocID]-[Seq]` |
| **SourceDoc** | TEXT | Document title / description |
| **SourceDocID** | TEXT | DocID, Bates number, or file reference |
| **SourceDate** | DATE | Date of source document |
| **SourceAuthor** | TEXT | Author/speaker (if applicable) |
| **PinpointStart** | TEXT | Starting location (page, line, section) |
| **PinpointEnd** | TEXT | Ending location |
| **QuoteText** | TEXT | Exact verbatim text — ZERO TOLERANCE |
| **CharCount** | INT | Character count of QuoteText (for integrity) |
| **WordCount** | INT | Word count of QuoteText (for integrity) |
| **Modifications** | TEXT | Any `[...]`, `[sic]`, `[emphasis]` applied |
| **ContextBefore** | TEXT | 1-2 sentences before the quote (for context) |
| **ContextAfter** | TEXT | 1-2 sentences after the quote (for context) |
| **UseTags** | TEXT | How this quote is used: Key-Admission, Impeachment, Corroboration, Contract-Term, Medical-Finding, Expert-Opinion, etc. |
| **Element_ID** | TEXT | PCM/PDM element this quote supports (if applicable) |
| **CFP_FactRef** | TEXT | Linked CFP Fact# (if applicable) |
| **IntegrityStatus** | TEXT | VERIFIED / UNVERIFIED / FLAGGED |
| **Notes** | TEXT | Extraction notes, out-of-context warnings |

## Required Inputs

### Always Required

- Source document(s) — uploaded file(s) from which to extract quotes
- User instruction specifying what to quote (specific passages, topics, or "all relevant")

### Optional

- `<quote_requests>` — specific passages or topics to extract
- CFP Quote Pack — existing quotes for deduplication
- Element_ID list — PCM/PDM elements to tag quotes against
- Use tags — desired categorization for extracted quotes

## Output Contract (Required Order)

### 1. Quote Pack

For each extracted quote:

```
**QuoteID: QVS-[DocID]-[Seq]**

Source: [SourceDoc] ([SourceDate])
Author/Speaker: [if applicable]
Pinpoint: [PinpointStart] — [PinpointEnd]
Bates/DocID: [if available]

> "[Exact verbatim text — every character matches source]"

Integrity: [CharCount] chars | [WordCount] words
Modifications: [None / list of modifications with justification]
Context: [Brief note on surrounding context]
Use Tags: [Key-Admission | Impeachment | Corroboration | etc.]
Element_ID: [if mapped]
Status: [VERIFIED / UNVERIFIED]

---
```

### 2. Pinpoint Index

| QuoteID | Source | Pinpoint | First Words | Use Tags |
|---------|--------|----------|-------------|----------|

### 3. Integrity Report

| QuoteID | CharCount | WordCount | Modifications | Verified? |
|---------|-----------|-----------|---------------|-----------|

### 4. Deduplication Report (if CFP provided)

| QuoteID | Duplicate of CFP Quote# | Action |
|---------|------------------------|--------|

### 5. Out-of-Context Warnings

| QuoteID | Risk | Recommendation |
|---------|------|----------------|

### 6. Gate Results
- Zero Tolerance: [PASS/FAIL] — all quotes character-for-character accurate
- Pinpoint Coverage: [PASS/FAIL] — every quote has a pinpoint citation
- Source Identification: [PASS/FAIL] — every quote identifies its source document
- Modification Logging: [PASS/FAIL] — all modifications documented
- Integrity Hashes: [PASS/FAIL] — character and word counts computed

### 7. Next Requests

## Integration Points

| System | How QVS Connects |
|--------|-----------------|
| **CFP** | QVS quotes can feed CFP Quotes table. CFP Quotes can be verified by QVS. |
| **DRP** | DRP uses QVS to extract verbatim quotes for discovery responses (e.g., quoting contracts, medical records). |
| **GFL** | GFL uses QVS to quote objection language and response text verbatim. |
| **MTC** | MTC uses QVS to quote discovery requests and responses verbatim in motion text. |
| **MSJ** | MSJ uses QVS to quote deposition testimony and documentary evidence verbatim. |
| **DRS** | DRS uses QVS to preserve exact answer text for sufficiency comparison. |
| **OA-*** | OA skills use QVS to preserve exact objection text for analysis. |
| **PCM/PDM** | Element_ID linkage maps quotes to proof elements. |
| **LPB** | LPB can use QVS for extracting exact statutory text and rule language. |

