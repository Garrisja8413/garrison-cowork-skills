---
name: cfp
display_name: "Case Fact Pack Builder"
description: >-
  Case Fact Pack (CFP) builder for legal document analysis. Builds Excel-based
  fact packs from uploaded documents OR combines multiple smaller CFPs into a
  consolidated master. Runs in three strict stages: EXTRACT (core
  facts/quotes/timeline from documents), ENRICH
  (scoring/classification/hierarchy on extracted rows), VERIFY (source-check
  and QA). Each stage produces a downloadable Excel file that feeds the next.
  TRIGGERS: Use this skill whenever the user mentions "CFP", "case fact pack",
  "fact pack", "extract facts", "build a pack", "combine packs", "merge CFPs",
  "enrich facts", "verify pack", "QA the pack", or uploads legal documents
  (medical records, depositions, discovery responses, police reports, court
  notices) for fact extraction. Also use when user asks for "filtered
  packets", "sub-packs", or evidence-keyed fact tables. Even if user just says
  "extract from this document" in a legal context, use this skill (v1.0)
version: "1.0"
category: builder
pack_consumes:
  - Source documents
pack_produces:
  - CFP Excel workbook
checkpoints: 2
author: "Parnall & Adams"
license: Proprietary
---

# CFP (Case Fact Pack Builder) — v7.0

## Architecture: Three Stages, Always Separate

**The #1 cause of errors is trying to do too much in one response.** This skill
enforces strict separation. Each stage produces an Excel file. No skipping stages.

```
EXTRACT  →  .xlsx file  →  ENRICH  →  .xlsx file  →  VERIFY  →  final .xlsx
   ↑                          ↑                          ↑
 source docs              extract output             enriched output
 OR smaller CFPs
```

## Modes

| Mode | Stage | Input | Output | Reference |
|------|-------|-------|--------|-----------|
| **EXTRACT** | 1 | Uploaded document(s) | `CFP-Extract-[DocID].xlsx` | `references/extract.md` |
| **COMBINE** | 1 | Multiple CFP Excel files | `CFP-Combined-[CaseName].xlsx` | `references/combine.md` |
| **ENRICH** | 2 | Extract/Combined .xlsx | `CFP-Enriched-[name].xlsx` | `references/enrich.md` |
| **VERIFY** | 3 | Enriched .xlsx | `CFP-Verified-[name].xlsx` + QA report | `references/verify.md` |
| **PACKET** | Any | Any CFP .xlsx | Filtered markdown packet | `references/packet.md` |

**How to pick a mode:**
- User uploads a document to extract from → **EXTRACT**
- User has multiple partial CFPs to merge → **COMBINE**
- User has extracted rows and wants scoring/classification → **ENRICH**
- User wants QA / source-checking before drafting → **VERIFY**
- User needs a filtered subset for a Prompt Block → **PACKET**

## Pack Locations (v1.1)

**Save outputs to:** `cases/{CASE_CODE}/cfp/`
**Naming:** `CFP-{Stage}-{CASE_CODE}-{Descriptor}.xlsx`
  - Examples: `CFP-Extract-ALIPAT-MedRecs.xlsx`, `CFP-Combined-ALIPAT-Master.xlsx`

**Before starting EXTRACT or COMBINE:**
1. Ask the user for the case code if not established.
2. Verify `cases/{CASE_CODE}/cfp/` exists; create it if not.
3. List existing CFPs in that directory so the user knows what already exists.

## Stage 1a: EXTRACT (from documents)

Read `references/extract.md` before starting.

**What it does:** Takes an uploaded document (medical record, depo, discovery, etc.)
and produces an Excel file with core extraction tables only.

**Chunking rule:** For documents over ~10 pages, process in chunks of ~8-12 pages
per response. Each chunk writes rows to the same output file. Number rows with
chunk prefix: `C1-001`, `C2-001`, etc.

**Core tables only (5 columns max per table):**
- File_Metadata (DocID, Title, Type, BatesStart, BatesEnd)
- Quotes (DocID, Pinpoint, Quote, Use)
- Facts (Fact#, Fact, SourceDocID, Pinpoint, SourceWho)
- Timeline (Date, Event, SourceDocID, Pinpoint)

**Output:** Excel file with one tab per table. Nothing else in this stage.

## Stage 1b: COMBINE (merge multiple CFPs)

Read `references/combine.md` before starting.

**What it does:** Takes 2+ CFP Excel files and merges them into one consolidated
workbook. Deduplicates, renumbers, cross-references File_Metadata, and flags
conflicts between sources.

**This is the answer to "I built CFPs from individual documents and now need one
master pack."**

**Output:** Single consolidated Excel file with all tabs merged and renumbered.

## Stage 2: ENRICH (add scoring and classification)

Read `references/enrich.md` before starting.

**Input:** An EXTRACT or COMBINE output Excel file.

**What it does:** Adds classification and scoring columns to existing rows.
Does NOT add new fact rows (that's EXTRACT's job).

**Added columns (to Facts only):**
- PackType, PartyTag, EvidenceType, UseType
- AdmisScore, CredScore
- FactLevel, FactGroupID

**Also creates:** Admissions tab (extracted from existing Quotes/Facts)

**Output:** Enriched Excel file with added columns.

## Stage 3: VERIFY (source-check and QA)

Read `references/verify.md` before starting.

**Input:** An ENRICHED output Excel file.

**What it does:** Runs the QA checklist, produces a verification report, and marks
rows as DRAFT-READY or DO-NOT-USE-YET.

**Output:** Verified Excel file (with Status column) + QA Report markdown.

## Hard Rules (all modes)

1. **Never invent** DocIDs, Bates, pinpoints, dates, amounts, diagnoses, quotes, authorities
2. Missing pinpoint → `PINPOINT NEEDED` | Missing DocID → `CITE NEEDED`
3. **Micro-decompose:** One discrete attribute/observation per row. No compounds.
4. Preserve conflicts: both rows + `CONFLICT` flag in Notes
5. Neutral, source-matched phrasing ("reported" vs "diagnosed")
6. **Never consolidate:** Two sources = two rows. Two attributes = two rows.
7. **Never skip stages.** EXTRACT first, then ENRICH, then VERIFY.

## Micro-Fact Decomposition

Split the row if it contains:
- "and" connecting two assertions → split
- Comma-separated list → one row per item
- "with" introducing additional attribute → split
- Any portion an opponent could dispute independently → split

**Example** — "Patient presented on 3/15/24 with headache, nausea, and dizziness":
- Row 1: "Patient presented on 3/15/24"
- Row 2: "Patient reported headache on 3/15/24"
- Row 3: "Patient reported nausea on 3/15/24"
- Row 4: "Patient reported dizziness on 3/15/24"

## Input Hygiene

**Prohibited** → respond `OUT OF SCOPE — requires BAA environment`:
- sealed/protected material, privileged strategy, protective-order-restricted

**Allowed:** Medical records with filing-minimum redactions (SSN last 4, DOB year
only, minors initials, financial accounts last 4, MRN redacted).

## Volume Expectations (at micro-fact level)

| Document type | Expected rows |
|---------------|--------------|
| Single visit note (~2-3 pages) | 15–30+ |
| 10-page medical record | 80–150+ |
| Full deposition transcript | 200+ (chunked) |
| Discovery response set | 1 row per discrete assertion per answer |

## Excel Output (all modes)

Read the xlsx SKILL.md (`/mnt/skills/public/xlsx/SKILL.md`) when creating Excel files.

Use openpyxl. Each stage creates a properly formatted .xlsx with:
- Tab names matching the schema (File_Metadata, Quotes, Facts, Timeline, etc.)
- Headers in bold, frozen top row
- Column widths auto-fitted
- A README tab explaining what stage produced this file and what to do next

## Chunking Protocol (large documents)

When a document exceeds ~10 pages:

1. Announce: "This document requires chunked processing. I'll process [N] sections."
2. Process 8-12 pages per chunk (or natural section breaks like visit dates)
3. Each chunk **appends rows** to the growing Excel file
4. Row numbering: `C1-001, C1-002...` then `C2-001, C2-002...`
5. After each chunk, save the Excel file and report: "Chunk [N] complete. [X] rows. Reply 'continue'."
6. After final chunk: save final Excel + output consolidation QA summary

**Between chunks:** Save intermediate Excel to preserve progress. If the conversation
errors out, the user still has partial work.

## Attorney Checkpoints

This skill pauses at two decision points (see `shared/templates/checkpoint-protocol.md`):

**⛔ CHECKPOINT 1: Ambiguity Resolution** — During EXTRACT, when source
documents contain ambiguous data (unclear dates, illegible portions, vague
references). Present: (a) the ambiguous text with pinpoint, (b) possible
interpretations, (c) recommended interpretation. Attorney selects the correct
reading or marks `[VERIFY]` for later resolution.

**⛔ CHECKPOINT 2: Conflicting Data** — During EXTRACT or COMBINE, when
multiple source documents report conflicting facts about the same event
(e.g., different dates, different diagnoses, contradictory statements).
Present: (a) both facts with sources and pinpoints, (b) nature of the conflict,
(c) options: include both with CONFLICT flag, prefer one source, or mark for
investigation. Attorney decides how to handle the conflict.

## Output Contract (every response)

### 1) Mode + Scope Statement
What mode, what document(s), what stage.

### 2) Work Product
Excel file (or filtered packet in PACKET mode).

### 3) QA Summary
Row counts per tab, PINPOINT NEEDED count, CITE NEEDED count, conflicts.

### 4) Next Steps
Exactly what to do next: "Run ENRICH on this file" or "Continue with chunk 3" etc.

## SSOT Integration: PSR -> CFP (Admitted Facts)

The Pleading State Register (PSR) is the single source of truth for pleading
data. When a PSR exists for a case, admitted facts flow from PSR to CFP:

**PSR Admissions_Map -> CFP Facts (automatic import):**
- `AdmissionType=FULL` -> CFP fact row with `EvidenceType=Admission`,
  `CredScore=5`, `FactLevel=Undisputed`, `Status=DRAFT-READY`
- `AdmissionType=DEEMED` -> CFP fact row with `EvidenceType=Admission`,
  `CredScore=5`, `FactLevel=Undisputed`, `Status=DRAFT-READY`
- `AdmissionType=PARTIAL` -> CFP fact row with `EvidenceType=Admission`,
  `CredScore=4`, `FactLevel=Supported`, `Status=DRAFT-READY`
  (only the admitted portion text)

**Source attribution for PSR-derived facts:**
- `SourceDocID` = the Answer's DocID (from PSR Pleading_Index)
- `Pinpoint` = `¶[AllegationParaNum]` (complaint paragraph admitted)
- `SourceWho` = `[AdmittingParty] (judicial admission)`
- `UseType` = `Proof`
- `PackType` = determined by allegation content (Liability/Damages/Causation)

**Admissions are the highest-confidence facts in the case.** They receive
maximum credibility scores because they are binding judicial admissions that
cannot be disputed at trial.

**Critical rule:** CFP receives facts FROM PSR. CFP does not modify PSR.
The PSR is the authoritative record of what was admitted; CFP is the
authoritative record of case facts organized for litigation use.

## SSOT Integration: MPR -> CFP (New Evidence Only)

The Motion Practice Register (MPR) tracks motions. **Factual assertions
in motions are NOT CFP facts.** Only new EVIDENCE submitted with motions
(declarations, affidavits, exhibits not previously in the record) triggers
CFP extraction:

1. MPR ENRICH flags `FlagForCFP=Y` for new evidence
2. Attorney approves at checkpoint
3. CFP EXTRACT runs on the approved evidence documents
4. CFP fact rows get `SourceDocID` pointing to the original evidence, NOT the motion

**The fact asserted in the motion is not the source of truth for the CFP.**
Only the underlying evidence is. Motion characterizations of facts are
advocacy, not source data.

## Integration Points

| System | How CFP Connects |
|--------|-----------------|
| **PSR** | PSR Admissions_Map feeds CFP with admitted facts (highest confidence). PSR is SSOT for pleading data; CFP receives admitted facts from PSR. |
| **DPB** | DPB discovery responses can contain admissions (RFA) that feed CFP via the PSR or directly. Discovery-produced documents are CFP EXTRACT sources. |
| **MPR** | MPR flags new evidence for CFP extraction. Motion factual assertions do NOT become CFP facts — only the underlying evidence does. |
| **LPB** | CFP facts tagged with Element_IDs join to LPB authorities on Element_ID in PCM/PDM. |
| **PCM** | PCM consumes CFP facts for claims gap analysis. |
| **PDM** | PDM consumes CFP facts for defense gap analysis. |
| **Complaint** | Complaint drafting uses CFP facts for factual allegations. |
| **MSJ** | MSJ uses CFP facts for SUMF (Statement of Undisputed Material Facts). |
| **DRR** | DRR cross-references discovery answers against CFP for contradiction detection. |

## Reference Files

- `references/extract.md` — EXTRACT stage schema + workflow
- `references/combine.md` — COMBINE stage schema + workflow
- `references/enrich.md` — ENRICH stage schema + controlled vocabulary
- `references/verify.md` — VERIFY stage checklist + status codes
- `references/packet.md` — PACKET mode filtered output templates
