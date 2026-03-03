# DEPO-INDEX Reference: Transcript Parsing and Indexing Methodology

## Purpose

This reference defines the step-by-step methodology for parsing deposition
transcripts and producing structured indexes. It covers transcript format
recognition, page:line citation conventions, topic categorization using the
controlled vocabulary, and flag assignment protocols.

---

## 1. Transcript Parsing Protocol

### Step 1: Metadata Extraction

Before indexing testimony content, extract and record transcript metadata:

```
METADATA EXTRACTION CHECKLIST:
[ ] Witness name (full legal name)
[ ] Deposition date
[ ] Case caption (parties, case number, court)
[ ] Examining attorney(s) (name, representing which party)
[ ] Defending attorney(s) (name, representing which party)
[ ] Court reporter name
[ ] Start time and end time (if stated)
[ ] Total page count
[ ] Exhibits marked during deposition (exhibit numbers)
[ ] Whether videotaped (if noted)
[ ] Stipulations on the record (if any)
```

### Step 2: Identify Transcript Format

Court reporter transcripts follow standard formats. Recognize these patterns:

**Standard Page:Line Format:**
```
         45
  1   Q. Can you describe what happened next?
  2   A. I was driving northbound on I-25
  3   when I saw the defendant's vehicle cross
  4   the center line.
  5   Q. How fast were you traveling?
  6   A. Approximately 55 miles per hour.
```

**Citation format:** `45:1-4` refers to page 45, lines 1 through 4.

**Key parsing rules:**
- `Q.` marks the beginning of a question by examining counsel
- `A.` marks the beginning of an answer by the witness
- `MR./MS. [NAME]:` marks a statement by an attorney (objection, instruction, etc.)
- `THE WITNESS:` marks a spontaneous statement by the witness
- `THE REPORTER:` or `THE VIDEOGRAPHER:` marks a procedural statement
- `(Off the record.)` / `(On the record.)` marks breaks
- `(Exhibit [N] marked for identification.)` marks exhibit designation

### Step 3: Segment by Q-A Exchanges

Parse the transcript into discrete question-answer (Q-A) exchanges:

```
EXCHANGE: [Page:Line(Q) — Page:Line(A end)]
  EXAMINER: [Attorney name]
  QUESTION: [Verbatim question text]
  ANSWER: [Verbatim answer text]
  OBJECTIONS: [Any objections interposed, with ruling if on record]
  EXHIBITS: [Any exhibit referenced or marked]
```

**Multi-line answers:** An answer continues until the next `Q.` marker or
attorney statement. The page:line range covers the entire answer.

**Colloquy:** Attorney-to-attorney exchanges (objections, arguments) are
parsed separately and tagged as procedural unless they contain substantive
information.

### Step 4: Topic Classification

For each Q-A exchange (or group of related exchanges), assign:
1. **Topic Tag** from the controlled vocabulary (see Section 3)
2. **Flag(s)** from the controlled flag types (see Section 4)
3. **Summary** — a brief description of the testimony content
4. **Verbatim excerpt** — the most significant quote(s) from the exchange

**Grouping rule:** Related Q-A exchanges on the same topic may be grouped
into a single index entry. The page:line range covers the entire group.
Example: A series of questions about the witness's employment history from
pages 12:5 through 15:22 may be a single index entry tagged `BACKGROUND`.

### Step 5: Flag Assignment

Review each indexed entry for flag conditions:

| Check | If True | Flag |
|-------|---------|------|
| Witness admits a fact favorable to our case? | Yes | `ADMISSION` |
| Witness denies a fact we allege? | Yes | `DENIAL` |
| Witness is evasive or non-responsive? | Yes | `EVASION` |
| Testimony contradicts earlier testimony in this depo? | Yes | `INCONSISTENCY-INTERNAL` |
| Testimony contradicts a prior discovery response? | Yes | `INCONSISTENCY-DISCOVERY` |
| Testimony contradicts a document? | Yes | `INCONSISTENCY-DOCUMENT` |
| Witness firmly commits to a position? | Yes | `LOCK-DOWN` |
| Testimony lays foundation for an exhibit? | Yes | `FOUNDATION` |
| Expert testimony has methodology vulnerability? | Yes | `EXPERT-VULNERABLE` |
| Testimony touches privilege or work product? | Yes | `PRIVILEGE-ISSUE` |

**Multiple flags per entry:** An entry may receive multiple flags. For example,
a witness statement that admits a fact AND firmly commits to it receives both
`ADMISSION` and `LOCK-DOWN`.

---

## 2. Page:Line Citation Standards

### Citation Format

All citations must use the `page:line` format:

| Format | Example | Meaning |
|--------|---------|---------|
| Single line | `45:12` | Page 45, line 12 |
| Line range (same page) | `45:12-18` | Page 45, lines 12 through 18 |
| Cross-page range | `45:12-46:3` | Page 45, line 12 through page 46, line 3 |
| Multiple discrete cites | `45:12; 67:5-8` | Two separate passages |

### Citation Rules

1. **Every index entry must have a page:line citation.** No exceptions.
   An entry without a citation is incomplete and must be flagged `[UNCLEAR]`.

2. **Citations must be exact.** Do not approximate. If the exact line number
   is uncertain, cite the entire page range and flag `[VERIFY-QUOTE]`.

3. **Answer citations take priority.** When citing testimony, the primary
   citation should be to the answer (A.) that contains the substantive
   testimony, not the question (Q.) that prompted it.

4. **Objection citations are secondary.** If an objection interrupts a
   Q-A exchange, cite both the testimony and the objection separately.

5. **Verbatim excerpts must match.** When quoting testimony, the excerpt
   must exactly match the transcript text. Any paraphrasing is prohibited
   and constitutes a professional ethics violation.

### Handling Transcript Irregularities

| Situation | Protocol |
|-----------|----------|
| Missing page numbers | Flag `[UNCLEAR: page numbering gap at approximately page X]` |
| Garbled text ("[inaudible]") | Include in index as `[UNCLEAR: 45:12 — transcript reads "[inaudible]"]` |
| Reporter corrections (errata) | Index the original transcript; note errata changes if provided |
| Off-the-record gaps | Note gap in index: "Off the record: 45:25 - 46:1" |
| Exhibit descriptions | Index exhibit identification with page:line where marked |
| Interpreter present | Note interpreter; index testimony as spoken by witness through interpreter |

---

## 3. Topic Tag Taxonomy — Detailed Definitions

### Liability Tags

**`LIABILITY-DUTY`**
- Testimony about what the defendant was required to do
- Standard of care testimony
- Duty owed to plaintiff specifically
- Regulatory or contractual obligations
- Company policies establishing duty
- NM relevance: UJI 13-1601 (ordinary care), UJI 13-1604 (duty)

**`LIABILITY-BREACH`**
- Testimony about what the defendant did or failed to do
- Actions or omissions constituting the alleged breach
- Deviations from standard, policy, or regulation
- NM relevance: UJI 13-1602 (negligence defined)

**`LIABILITY-CAUSE`**
- Testimony about how the breach caused the harm
- But-for causation testimony
- Sequence of events connecting breach to injury
- NM relevance: UJI 13-305 (proximate cause)

### Damages Tags

**`DAMAGES-MEDICAL`**
- Testimony about injuries sustained
- Medical treatment received or recommended
- Diagnosis and prognosis
- Future medical needs
- NM relevance: NMSA 1978 Section 41-5-1 et seq. (Medical Malpractice Act damages)

**`DAMAGES-ECONOMIC`**
- Lost wages and earning capacity
- Medical expenses (past and future)
- Property damage
- Out-of-pocket costs
- NM relevance: UJI 13-1807 through 13-1812

**`DAMAGES-NONECONOMIC`**
- Pain and suffering
- Emotional distress
- Loss of enjoyment of life
- Loss of consortium
- NM relevance: UJI 13-1807 (general damages); no statutory cap in NM for
  general negligence (cap applies only to medical malpractice per NMSA 41-5-6)

### Contextual Tags

**`BACKGROUND`**
- Witness's personal, professional, or educational background
- Employment history
- Relationship to parties in the case
- Qualifications (for expert witnesses)

**`TIMELINE`**
- Date, time, and sequence testimony
- Chronological accounts of events
- Duration of events or conditions
- "Before," "during," "after" the incident

**`DOCUMENT-ID`**
- Testimony identifying a document
- Authentication testimony (authorship, receipt, review)
- Document handling or chain of custody
- Business records foundation

**`POLICY-PROCEDURE`**
- Company or organizational policies
- Standard operating procedures
- Training protocols
- Compliance programs

**`EXPERT-OPINION`**
- Opinion testimony by a qualified expert
- Methodology used to form the opinion
- Basis and data relied upon
- Limitations or qualifications on the opinion
- NM relevance: NMRA 11-702 (expert testimony standard)

**`RELATIONSHIP`**
- Testimony about relationships between parties or witnesses
- Employment relationships (respondeat superior)
- Contractual relationships
- Personal relationships affecting credibility

**`PRIOR-INCIDENT`**
- Testimony about prior similar incidents
- Pattern evidence
- Prior complaints or reports
- Notice-related testimony
- NM relevance: NMRA 11-404(B) (prior acts)

**`REMEDIAL-MEASURES`**
- Post-incident changes, repairs, or policy modifications
- NM relevance: NMRA 11-407 (subsequent remedial measures generally
  inadmissible to prove negligence, but admissible for other purposes:
  ownership, control, feasibility if controverted)

**`CORPORATE-KNOWLEDGE`**
- Testimony given in a 30(b)(6) corporate capacity
- Organizational knowledge on designated topics
- Corporate policies, practices, and decision-making

---

## 4. Flag Types — Detailed Definitions

### Trial-Value Flags

**`ADMISSION`**
- The witness concedes a fact favorable to our client's case
- Must be a clear, unqualified admission (not a qualified or partial concession)
- Quote the admission verbatim in the index entry
- Downstream: CLOSING-ARGUMENT will cite this directly
- Example: Defendant admits they did not inspect the property for 6 months

**`LOCK-DOWN`**
- The witness makes a firm commitment to a factual position
- Not necessarily favorable — may be useful for showing the witness cannot
  later change their story
- The commitment should be specific and unambiguous
- Downstream: Trial cross-examination can use this to prevent shifting testimony
- Example: Witness states definitively they were at a specific location

### Impeachment Flags

**`DENIAL`**
- The witness denies a fact that our case requires
- Important for identifying areas needing alternative proof
- Downstream: DEPO-IMPEACH will analyze for contradiction opportunities

**`EVASION`**
- The witness gives non-responsive, evasive, or deliberately vague answers
- Patterns of evasion suggest consciousness of unfavorable facts
- Downstream: DEPO-IMPEACH may use evasion patterns for credibility attack

**`INCONSISTENCY-INTERNAL`**
- The witness contradicts their own earlier testimony in the same deposition
- Cite both the earlier statement (page:line) and the later statement (page:line)
- This is the strongest form of impeachment: the witness contradicts themselves

**`INCONSISTENCY-DISCOVERY`**
- Testimony contradicts a sworn discovery response (interrogatory, RFA, etc.)
- Requires DPB cross-reference to identify the specific discovery response
- Cite both the testimony (page:line) and the DPB reference (SetID/ReqNum)
- Downstream: DEPO-IMPEACH analyzes the severity and strategy

**`INCONSISTENCY-DOCUMENT`**
- Testimony contradicts a document in evidence
- Cite the testimony (page:line) and the document (Bates number, exhibit number)
- The document may be one the witness authored, received, or should have known about

### Procedural Flags

**`FOUNDATION`**
- Testimony establishing the evidentiary foundation for an exhibit
- Authentication (witness identifies the document, its author, its contents)
- Business records foundation (NMRA 11-803(F))
- Downstream: TRIAL-NOTEBOOK exhibit section

**`EXPERT-VULNERABLE`**
- Expert testimony containing a Daubert/NMRA 11-702 vulnerability
- Methodology flaws, insufficient data, unsupported assumptions
- Testimony that contradicts learned treatises
- Downstream: MURDER-BOARD and Daubert challenge preparation

**`PRIVILEGE-ISSUE`**
- Testimony that inadvertently touches on privileged communications
- Attorney-client communications referenced or nearly disclosed
- Work product references
- Flag immediately for attorney review: `[DECISION REQUIRED: Privilege issue]`

---

## 5. Indexing Order of Operations

Execute these steps in sequence for each transcript:

```
1. METADATA EXTRACTION
   Extract all transcript metadata (Step 1)
   Record in Transcript Metadata section

2. FIRST PASS: SEQUENTIAL READ
   Read transcript beginning to end
   Segment into Q-A exchanges
   Assign preliminary topic tags
   Flag obvious admissions, denials, inconsistencies

3. SECOND PASS: TOPIC GROUPING
   Group related Q-A exchanges into topic blocks
   Assign final topic tags
   Calculate page:line ranges for each group
   Write summaries and select verbatim excerpts

4. THIRD PASS: FLAG REVIEW
   Review all entries for flag conditions
   Cross-check for internal inconsistencies (compare entries)
   Verify all flags are supported by the transcript text

5. CROSS-REFERENCE PASS (requires CFP/DPB)
   Compare indexed entries against CFP facts
   Compare indexed entries against DPB discovery responses
   Assign cross-reference links
   Flag inconsistencies between testimony and prior statements

6. EXHIBIT LOG
   Compile all exhibit references from the transcript
   Record where each exhibit was marked and discussed
   Note authentication status for each

7. QUALITY CHECK
   Verify all entries have page:line citations
   Verify all verbatim excerpts match transcript
   Verify all tags are from controlled vocabulary
   Verify all flags have supporting evidence
   Run gate checks
```

---

## 6. Handling Long Transcripts

### Transcripts Over 200 Pages

For lengthy depositions, use the chunking protocol:

**Chunk 1:** Pages 1 through approximately one-third of the transcript
- Focus on background, preliminary topics
- Usually covers witness background, initial liability testimony

**Chunk 2:** Middle third of the transcript
- Usually covers core liability and damages testimony
- Most admissions and key testimony occur here

**Chunk 3:** Final third of the transcript
- Usually covers follow-up, exhibits, clean-up questions
- Cross-examination often occurs here
- Final lock-down statements

### Output Chunking

When the index exceeds token limits, output in parts:

| Output | Content |
|--------|---------|
| Part 1 | Transcript Metadata + Topic Index (all entries) |
| Part 2 | Admission Inventory + Flag Inventory |
| Part 3 | Cross-Reference Table + Exhibit Reference Log |
| Part 4 | Gate Results + Open Items |

Each part labeled "Part [N] of [Total]" with reference to other parts.

---

## 7. Neutral Indexing Discipline

### What Neutral Means

The index classifies testimony **objectively**. It does not characterize
testimony as "good," "bad," "helpful," or "harmful." That analysis belongs
to downstream skills (DEPO-IMPEACH, CLOSING-ARGUMENT).

### Permitted Language

- "Witness stated..." / "Witness testified..."
- "Witness confirmed..." / "Witness denied..."
- "Testimony establishes..." / "Testimony addresses..."
- "Consistent with CFP Fact#..." / "Inconsistent with DPB..."

### Prohibited Language

- "Favorable testimony" / "Unfavorable testimony"
- "Strong admission" / "Weak denial"
- "This helps our case" / "This hurts our case"
- "Important testimony" (unless marked as a priority flag with objective criteria)
- Any advocacy characterization

### Exception: Flags

Flags inherently indicate relevance (ADMISSION, DENIAL, INCONSISTENCY, etc.).
This is acceptable because flags use controlled vocabulary with objective
definitions, not subjective assessments.

---

## 8. Transcript Quality Issues

### Common Quality Problems and Resolutions

| Problem | Resolution |
|---------|------------|
| Scanned PDF (no text layer) | Request OCR version; flag `[UNCLEAR: OCR quality uncertain]` |
| Missing pages | Note gap; flag `[UNCLEAR: Pages [X]-[Y] missing from transcript]` |
| "[Inaudible]" passages | Index with `[UNCLEAR]` flag; note context if interpretable |
| Reporter notes ("sic") | Include in index; note the "sic" marker |
| Multiple witnesses (Rule 30(d)) | Index each witness separately within the same transcript |
| Interpreter-assisted | Note interpreter; trust the record as transcribed |
| Rough draft (not final) | Flag entire index: `[VERIFY: Based on rough draft transcript — re-index when final transcript is available]` |
| Errata sheet provided | Note errata changes alongside original testimony; flag substantive changes |
