# DEPO-NOTICE Reference: Output Format and BODY-ONLY Contract

## Purpose

This reference defines the exact output format for the DEPO-NOTICE skill.
All output must conform to the Direct-Output / BODY-ONLY discipline. The SA
(SmartAdvocate) connector provides the document shell (caption, certificate
of service, signature block, merge tokens). This skill provides only the
notice body text and required metadata sections.

---

## 1. Direct-Output / BODY-ONLY Discipline

### What BODY-ONLY Means

The DEPO-NOTICE skill output contains **only** the substantive body text of
the deposition notice. The following elements are **never** included:

| Element | Included? | Source |
|---------|-----------|--------|
| Case caption | NO | SA shell |
| Court name/address | NO | SA shell |
| Document title (centered heading) | NO | SA shell |
| Attorney signature block | NO | SA shell |
| Certificate of service | NO | SA shell |
| Page numbers | NO | SA shell |
| Headers / footers | NO | SA shell |
| Letterhead | NO | SA shell |
| Filing stamp area | NO | SA shell |

### What BODY-ONLY Includes

| Element | Included? | Notes |
|---------|-----------|-------|
| Notice header paragraph | YES | Identifies deponent, rule, noticing party |
| Scheduling details block | YES | Date, time, location, method, duration, recording |
| Duces tecum requests | YES (if applicable) | Numbered document categories |
| 30(b)(6) topic designations | YES (if applicable) | Numbered topics with reasonable particularity |
| Standard provisions | YES | Recording, continuation, applicable rules |
| Sanctions reservation | YES (for 30(b)(6)) | Reservation of rights for inadequate designation |

---

## 2. Complete Output Structure

The output must follow this exact order. Every section is required unless
marked "(conditional)."

### Part 1: BODY-ONLY Deposition Notice

```markdown
## BODY-ONLY DEPOSITION NOTICE

### Notice of Deposition

[Notice header paragraph identifying:
- Noticing party
- Deponent (name, address, title/role)
- Governing rule (NMRA 1-030 or FRCP 30(a))
- Party vs. non-party designation]

### Scheduling Details

| Detail | Value |
|--------|-------|
| **Date** | [Date or [FILL-IN: Date]] |
| **Time** | [Time or [FILL-IN: Time]] |
| **Location** | [Address or [FILL-IN: Location]] |
| **Method** | [In-person / Videoconference / Telephonic] |
| **Estimated Duration** | [Duration or default per jurisdiction] |
| **Recording Method** | [Stenographic / Video / Both] |
| **Officer** | [Name or [FILL-IN: Court Reporter]] |

### Document Requests (Duces Tecum) (conditional)

[Only if duces tecum is applicable]

The deponent is requested to bring to the deposition the following documents
and tangible things:

1. [Document category] — [time period] — [relevance to Element/Claim]
2. [Document category] — [time period] — [relevance to Element/Claim]
...

### Rule 30(b)(6) Topic Designations (conditional)

[Only for CORPORATE-30b6 mode]

The designated representative(s) shall be prepared to testify regarding:

**TOPIC 1:** [Description with reasonable particularity]
Including but not limited to: [specific sub-topics, scope, time period]
[Element/Claim reference]

**TOPIC 2:** [Description]
...

### Standard Provisions

[Standard paragraphs re: recording method, continuation, applicable rules,
objection procedures, and (if 30(b)(6)) sanctions reservation for inadequate
designation]
```

### Part 2: Divider

```markdown
---
```

### Part 3: Cite Table

```markdown
## Cite Table

| # | Assertion | Source (DPB witness ref, CFP Fact#, Rule cite) | Confidence | Notes |
|---|-----------|------------------------------------------------|------------|-------|
| 1 | [Deponent identified as...] | [DPB-W-001] | HIGH | From DPB witness target |
| 2 | [Deponent relevance to...] | [CFP Fact#42] | HIGH | CFP fact reference |
| 3 | [Notice under NMRA 1-030] | [NMRA 1-030(B)(1)] | HIGH | Rule citation |
| 4 | [Duration limit] | [FRCP 30(d)(1)] | HIGH | Federal 7-hour limit |
...
```

**Cite Table rules:**
- Every factual assertion in the notice must have a Cite Table entry
- Every rule citation must have a Cite Table entry
- Confidence levels: HIGH (verified source), MEDIUM (inferred from context),
  LOW (uncertain, flag for verification)
- Sources must be specific: DPB witness reference ID, CFP Fact number,
  exact rule section

### Part 4: Gate Results

```markdown
## Gate Results

- **Traceability:** [PASS/FAIL] — Deponent identity traces to DPB or CFP.
  [Details if FAIL]
- **Rule Compliance:** [PASS/FAIL] — Notice conforms to [FRCP 30 / NMRA 1-030].
  [Details if FAIL]
- **Scheduling Gate:** [PASS/FAIL] — Reasonable notice period; no scheduling
  conflicts noted. [Details if FAIL or if date uses temporary filler text]
- **Non-Party Subpoena:** [PASS/FAIL/N/A] — If non-party, subpoena requirement
  flagged. [Details]
- **Merge-Token Integrity:** [PASS/FAIL] — All SA merge tokens preserved
  exactly. [Details]
```

**Gate evaluation rules:**
- **Traceability FAIL** if deponent cannot be traced to any DPB row or CFP reference
- **Rule Compliance FAIL** if notice omits required elements (e.g., recording method)
- **Scheduling Gate FAIL** if proposed date is < 14 days from expected service or
  if date is `[FILL-IN]` (note: FILL-IN is not a failure, but gate notes it)
- **Non-Party Subpoena FAIL** if deponent is non-party and subpoena not flagged
- **Merge-Token Integrity FAIL** if any merge token was modified or invented

### Part 5: Next Requests

```markdown
## Next Requests

- [List of items the attorney needs to provide or actions to take]
- Examples:
  - "Confirm deposition date and time with opposing counsel"
  - "Book court reporter for [date]"
  - "Serve subpoena on non-party witness [name]"
  - "Confirm deponent's current address for service"
  - "Review duces tecum list for completeness"
```

### Part 6: Open Items

```markdown
## Open Items

### [FILL-IN] Items
- [FILL-IN: Date] — Deposition date not provided
- [FILL-IN: Time] — Deposition start time not provided
- [FILL-IN: Location] — Deposition location not provided

### [VERIFY] Items
- [VERIFY: Deponent address] — Address not confirmed
- [VERIFY: Case number] — Case number to be confirmed against SA

### [DECISION REQUIRED] Items
- [DECISION REQUIRED: Recording method] — Attorney to decide stenographic,
  video, or both
- [DECISION REQUIRED: Duration estimate] — No estimated duration provided
```

---

## 3. Formatting Rules

### Markdown Conventions

- Use `##` for main section headers
- Use `###` for subsection headers
- Use markdown tables for structured data (Cite Table, Scheduling Details)
- Use numbered lists for duces tecum requests and 30(b)(6) topics
- Use bold for emphasis on key terms
- Use code blocks for literal text that should appear exactly in the notice

### Fill-In Conventions

| Fill-In Token | Meaning | Resolution |
|-------------|---------|------------|
| `[FILL-IN: description]` | Information not provided; attorney must supply | Listed in Open Items |
| `[VERIFY: description]` | Information provided but not confirmed | Listed in Open Items |
| `[DECISION REQUIRED: description]` | Attorney judgment needed | Listed in Open Items |
| `[ACTION REQUIRED: description]` | Specific action needed (e.g., serve subpoena) | Listed in Next Requests |

### Merge Token Handling

- Merge tokens from SA shell appear as `<<TokenName>>` (e.g., `<<CaseNumber>>`)
- **Never modify** a merge token
- **Never invent** new merge tokens
- If a merge token is referenced in input, preserve it exactly in output
- If no merge tokens are provided in input, do not add any

---

## 4. Multi-Part Output (Token Fail-Safe)

Most deposition notices fit in a single output. If the notice is extensive
(e.g., 30(b)(6) with 20+ topics and duces tecum), chunk as follows:

### Part 1 Output
- Notice header + Scheduling Details + Standard Provisions
- Note: "Continued in Part 2"

### Part 2 Output
- 30(b)(6) Topic Designations + Duces Tecum requests
- Note: "Continued in Part 3"

### Part 3 Output
- Cite Table + Gate Results + Next Requests + Open Items

**Chunking rules:**
- Each part must be self-contained and labeled (Part 1 of 3, etc.)
- The divider (`---`) appears only before the Cite Table in the final part
- Gate Results always appear in the final part
- Never chunk standard individual notices (they are always short enough)

---

## 5. Mode-Specific Output Variations

### INDIVIDUAL-PARTY Mode
- No subpoena section
- No geographic limitation analysis
- Duces tecum optional (included in notice if requested)
- Non-Party Subpoena gate = N/A

### INDIVIDUAL-NONPARTY Mode
- Subpoena requirement flagged prominently
- Geographic limitation analysis included
- Witness fee information included
- Non-Party Subpoena checklist in Open Items
- Non-Party Subpoena gate must PASS

### CORPORATE-30b6 Mode
- Topic Designations section required
- Designation instruction paragraph required
- Sanctions reservation paragraph required
- Topic-to-element mapping included in Cite Table
- Additional gate: Topic Particularity (reasonable particularity check)

### EXPERT Mode
- Expert report reference required
- Timing compliance check (expert discovery deadlines)
- Scope statement (opinions, methodology, qualifications)
- Additional gate: Expert Disclosure Compliance

---

## 6. Quality Checks Before Output

Before finalizing output, verify:

```
PRE-OUTPUT CHECKLIST:
[ ] Output is BODY-ONLY (no caption, signature, COS)
[ ] All sections present in correct order
[ ] All [FILL-IN] items listed in Open Items
[ ] All [VERIFY] items listed in Open Items
[ ] All [DECISION REQUIRED] items listed in Open Items
[ ] Cite Table covers every factual assertion
[ ] Cite Table covers every rule citation
[ ] Gate Results evaluated for all five gates
[ ] Merge tokens (if any) preserved exactly
[ ] No invented names, dates, addresses, or case numbers
[ ] Non-party subpoena flagged (if applicable)
[ ] Correct jurisdiction rules applied (NMRA vs. FRCP)
[ ] Duration limit correctly stated (7 hrs federal; none NM)
[ ] Recording method specified or flagged as [DECISION REQUIRED]
```
