---
name: depo-index
display_name: "Deposition Transcript Indexer"
description: >-
  Deposition Transcript Indexer (DEPO-INDEX) — analysis skill that parses and
  indexes deposition transcripts with cross-references to CFP facts and DPB
  discovery responses. Produces indexed transcripts with topic tags, admission
  flags, impeachment markers, and element mapping for trial preparation.
  TRIGGERS: Use this skill whenever the user mentions "deposition index",
  "DEPO-INDEX", "index the deposition", "deposition transcript", "index
  transcript", "depo transcript", "transcript analysis", "deposition summary",
  "depo summary", "parse deposition", "digest deposition", "deposition
  digest", "transcript digest", "deposition coding", or uploads a deposition
  transcript for analysis. Do NOT use for deposition preparation (use
  depo-outline). Do NOT use for impeachment tracking (use depo-impeach -- runs
  after DEPO-INDEX) (v1.0)
version: "1.0"
category: deposition
pack_consumes:
  - CFP
  - DPB
  - PCM
pack_produces:
  - Indexed transcript
checkpoints: 0
author: "Parnall & Adams"
license: Proprietary
---

## Pack Dependencies
**Consumes:**
- CFP
- DPB
- PCM

# DEPO-INDEX (Deposition Transcript Indexer) — v1.0

## What This Skill Does

Parses deposition transcripts and produces a structured index with topic
classifications, admission flags, impeachment markers, and cross-references to
CFP facts and DPB discovery responses. The index transforms raw transcript text
into a searchable, categorized resource for trial preparation.

This skill is the foundation of the deposition analysis pipeline:
DEPO-INDEX (index) -> DEPO-IMPEACH (find contradictions) -> DEPO-OUTLINE
(prepare future depositions) -> CLOSING-ARGUMENT (cite testimony).

## Architecture: Parse-and-Classify

```
Deposition Transcript ──────┐
CFP PACKET (case facts) ────┤── DEPO-INDEX Skill ──> Indexed Transcript
DPB (discovery responses) ──┤                        Topic Tags
PCM (element mapping) ──────┘                        Admission Flags
                                                     Impeachment Markers
                                                     Element Cross-References
```

DEPO-INDEX is an **ANALYSIS** skill that produces structured data, not prose.
Its output feeds downstream skills (DEPO-IMPEACH, CLOSING-ARGUMENT, TRIAL-NOTEBOOK).

## Hard Rules

1. **Verbatim fidelity:** Never paraphrase testimony in the index. Quote
   exactly or cite by page:line reference. Misquoting testimony is
   professional misconduct.
2. **Page:line citations required:** Every indexed entry must include the
   transcript page:line reference (e.g., "45:12-46:3"). No uncited references.
3. **Never invent:** No invented testimony, page references, or witness
   statements. If the transcript is unclear, flag as `[UNCLEAR: page:line]`.
4. **Classification discipline:** Use only the controlled topic tags and
   flag types defined below. Do not create ad hoc classifications.
5. **CFP cross-reference:** When testimony confirms or contradicts a CFP fact,
   link the index entry to the CFP Fact# with confirmation/contradiction flag.
6. **DPB cross-reference:** When testimony confirms or contradicts a prior
   discovery response, link to the DPB SetID/ReqNum with consistency flag.
7. **Neutral classification:** Index objectively. Do not characterize testimony
   as "helpful" or "harmful" in the index itself -- that analysis belongs to
   downstream skills.
8. **Token fail-safe:** Depositions can be lengthy. Chunk by topic area or
   transcript section. Part 1 = Topic Index, Part 2 = Admission/Impeachment
   Flags, Part 3 = Cross-References + Gate Results.

## Required Inputs

### Always Required

```xml
<transcript>
[Full deposition transcript text with page:line numbers preserved.
  Include: witness name, date, caption information.
  Format: standard court reporter transcript format.]
</transcript>

<evidence_layer>
[CFP PACKET -- case facts for cross-referencing:
  Facts this witness may confirm or contradict.
  Timeline entries involving this witness or their knowledge.]
</evidence_layer>
```

### Optional (Strengthens Index)

- `<discovery_layer>` -- DPB prior discovery responses from this witness's party
  (for consistency checking against testimony)
- `<element_layer>` -- PCM element mapping (for element tagging of testimony)
- `<prior_depo_index>` -- Prior DEPO-INDEX output from other witnesses in this case
  (for cross-witness consistency)
- Exhibit list (to flag exhibit references in testimony)

### If Inputs Are Missing

If no transcript: **"Upload the deposition transcript with page:line numbers preserved."**
If no CFP packet: **"Run the CFP skill to extract case facts for cross-referencing. Without CFP, the index will have no cross-references."**

## Topic Tag Taxonomy (Controlled Vocabulary)

| Tag | Description |
|-----|-------------|
| `LIABILITY-DUTY` | Testimony about duty of care, standard of care, responsibilities |
| `LIABILITY-BREACH` | Testimony about what was or was not done (breach facts) |
| `LIABILITY-CAUSE` | Testimony about causation, sequence of events |
| `DAMAGES-MEDICAL` | Testimony about injuries, treatment, prognosis |
| `DAMAGES-ECONOMIC` | Testimony about lost wages, expenses, financial impact |
| `DAMAGES-NONECONOMIC` | Testimony about pain, suffering, life impact |
| `BACKGROUND` | Witness background, qualifications, employment history |
| `TIMELINE` | Date/time/sequence testimony |
| `DOCUMENT-ID` | Testimony identifying or authenticating a document |
| `POLICY-PROCEDURE` | Testimony about policies, procedures, protocols |
| `EXPERT-OPINION` | Expert witness opinion testimony |
| `RELATIONSHIP` | Testimony about relationships between parties/witnesses |
| `PRIOR-INCIDENT` | Testimony about prior similar incidents |
| `REMEDIAL-MEASURES` | Testimony about post-incident changes |
| `CORPORATE-KNOWLEDGE` | 30(b)(6) organizational knowledge testimony |

## Flag Types (Controlled Vocabulary)

| Flag | Description | Downstream Use |
|------|-------------|---------------|
| `ADMISSION` | Witness admits a fact favorable to our case | CLOSING-ARGUMENT |
| `DENIAL` | Witness denies a fact we allege | DEPO-IMPEACH |
| `EVASION` | Witness is evasive or non-responsive | DEPO-IMPEACH |
| `INCONSISTENCY-INTERNAL` | Testimony contradicts own earlier testimony | DEPO-IMPEACH |
| `INCONSISTENCY-DISCOVERY` | Testimony contradicts prior discovery response | DEPO-IMPEACH |
| `INCONSISTENCY-DOCUMENT` | Testimony contradicts a document in evidence | DEPO-IMPEACH |
| `LOCK-DOWN` | Witness firmly committed to a position (useful for trial) | CLOSING-ARGUMENT |
| `FOUNDATION` | Testimony establishing foundation for exhibit | TRIAL-NOTEBOOK |
| `EXPERT-VULNERABLE` | Expert testimony with Daubert vulnerability | MURDER-BOARD |
| `PRIVILEGE-ISSUE` | Testimony touching on privilege or work product | LPB research |

## Output Contract (Required Order)

1. **Transcript Metadata**
   - Witness name, date, duration, page count
   - Examining attorneys
   - Exhibits marked/referenced

2. **Topic Index**

| Page:Line | Topic Tag | Summary (verbatim excerpt or brief) | Element_ID | Notes |
|-----------|-----------|--------------------------------------|------------|-------|

3. **Admission Inventory**

| # | Page:Line | Admission (verbatim) | Element Supported | CFP Fact# | Significance |
|---|-----------|---------------------|-------------------|-----------|-------------|

4. **Flag Inventory**

| # | Page:Line | Flag Type | Description | Cross-Ref (CFP/DPB) | Action Needed |
|---|-----------|-----------|-------------|---------------------|---------------|

5. **Cross-Reference Table**

| Page:Line | Testimony Summary | CFP Fact# | Consistent? | DPB Ref | Consistent? |
|-----------|-------------------|-----------|-------------|---------|-------------|

6. **Exhibit Reference Log**

| Exhibit # | Page:Line Marked | Page:Line Discussed | Description | Authentication Status |
|-----------|-----------------|-----------------------|-------------|---------------------|

7. **---** (divider)
8. **Gate Results**
   - Verbatim Fidelity: [PASS/FAIL] -- all quotes verified against transcript
   - Citation Completeness: [PASS/FAIL] -- all entries have page:line references
   - Cross-Reference Coverage: [PASS/FAIL] -- relevant testimony linked to CFP/DPB
   - Tag Consistency: [PASS/FAIL] -- all tags from controlled vocabulary

9. **Open Items**
   - `[UNCLEAR]` items (transcript passages that are ambiguous)
   - `[VERIFY-QUOTE]` items (quotations to double-check against original)
   - `[CROSS-REF-NEEDED]` items (testimony that likely relates to CFP/DPB but link not confirmed)

## Modes

| Mode | Input | Output |
|------|-------|--------|
| **FULL INDEX** | Complete transcript + CFP + DPB | All deliverables (Topic Index, Admissions, Flags, Cross-Refs) |
| **TOPIC ONLY** | Complete transcript | Topic Index only (no cross-references) |
| **ADMISSION SCAN** | Complete transcript + CFP | Admission Inventory + Flag Inventory only |
| **ELEMENT MAP** | Complete transcript + PCM | Element-mapped index showing which elements testimony supports |
| **INCREMENTAL** | New transcript + prior index | Updated index incorporating new deposition |

### Mode: FULL INDEX (default)

Complete indexing with all deliverables. Requires transcript + CFP + DPB.
Most thorough and useful for trial preparation.

### Mode: TOPIC ONLY

Quick topic-level index without cross-referencing. Useful when CFP/DPB
are not yet available or for a rapid first pass.

### Mode: ADMISSION SCAN

Focused scan for admissions and inconsistencies only. Fastest way to
identify the most trial-valuable portions of the testimony.

### Mode: ELEMENT MAP

Maps testimony to PCM elements, showing which elements this witness's
testimony supports or undermines. Useful for PCM gap analysis update.

### Mode: INCREMENTAL

Updates the case-level deposition index with a new transcript. Cross-references
new testimony against prior deposition indexes for cross-witness consistency.

## Integration Points

| System | How DEPO-INDEX Connects |
|--------|------------------------|
| **CFP** | DEPO-INDEX cross-references testimony against CFP facts. New admissions may generate CFP Delta Requests for DRAFT-READY facts. |
| **DPB** | DEPO-INDEX compares testimony against prior discovery responses for consistency checking. |
| **PCM** | DEPO-INDEX ELEMENT MAP mode updates PCM with testimony support for each element. |
| **DEPO-IMPEACH** | DEPO-INDEX output is the primary input for DEPO-IMPEACH impeachment tracking. |
| **CLOSING-ARGUMENT** | DEPO-INDEX admissions and lock-downs are cited in closing argument with page:line references. |
| **TRIAL-NOTEBOOK** | DEPO-INDEX exhibit references and authentication status feed into Trial Notebook exhibit section. |
| **SDC** | SDC DEBRIEF mode uses DEPO-INDEX to log what was disclosed during the deposition. |
| **SA** | Save per Save Map: Discovery -> Deposition Indexes. |

## Reference Files

- `references/methodology.md` -- transcript parsing, page:line citation format, topic categorization
- `references/cross-reference-protocol.md` -- how to cross-reference depo testimony with CFP facts, PCM elements
- `references/output-format.md` -- index format, topic-based and witness-based views
