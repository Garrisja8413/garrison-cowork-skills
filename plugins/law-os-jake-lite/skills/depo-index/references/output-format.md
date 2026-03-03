# DEPO-INDEX Reference: Output Format — Index Structure and Views

## Purpose

This reference defines the exact output format for the DEPO-INDEX skill,
including the topic-based index, admission inventory, flag inventory,
cross-reference tables, exhibit log, gate results, and open items. It also
defines the alternative output views available in different modes.

---

## 1. Complete Output Structure (FULL INDEX Mode)

The output must follow this exact order. Every section is required in
FULL INDEX mode.

### Section 1: Transcript Metadata

```markdown
## Transcript Metadata

| Field | Value |
|-------|-------|
| **Witness** | [Full legal name] |
| **Date** | [Deposition date] |
| **Duration** | [Start time — End time, total hours] |
| **Pages** | [Total page count] |
| **Court** | [Court name, case number] |
| **Examining Attorney(s)** | [Name(s), representing [Party]] |
| **Defending Attorney(s)** | [Name(s), representing [Party]] |
| **Court Reporter** | [Name] |
| **Videotaped** | [Yes/No] |
| **Exhibits Marked** | [List of exhibit numbers] |

### Stipulations
- [Any stipulations placed on the record, with page:line reference]
- [If none: "No stipulations noted on the record."]
```

### Section 2: Topic Index

The core deliverable. Every substantive testimony passage indexed by topic.

```markdown
## Topic Index

| # | Page:Line | Topic Tag | Summary | Verbatim Excerpt | Element_ID | Flags | Notes |
|---|-----------|-----------|---------|------------------|------------|-------|-------|
| 1 | 8:3-12:15 | BACKGROUND | Witness employment history at [Company] | "I have worked there since 2019 as a safety manager." (8:5) | -- | -- | Establishes role |
| 2 | 13:1-15:22 | POLICY-PROCEDURE | Company inspection protocols | "We were supposed to inspect monthly." (13:8) | NEG-DUTY-001 | ADMISSION | Duty established |
| 3 | 16:5-18:10 | TIMELINE | Events of [date] morning | "I arrived at approximately 7:30 a.m." (16:8) | NEG-CAUSE-001 | LOCK-DOWN | Firm commitment |
| 4 | 19:1-22:14 | LIABILITY-BREACH | Witness describes skipped inspection | "I did not inspect that area in March." (19:12) | NEG-BREACH-001 | ADMISSION | Key breach admission |
```

**Topic Index column definitions:**

| Column | Content | Rules |
|--------|---------|-------|
| **#** | Sequential entry number | Auto-increment |
| **Page:Line** | Transcript location | Required; exact format `PP:LL-PP:LL` |
| **Topic Tag** | From controlled vocabulary | Must use only tags from SKILL.md taxonomy |
| **Summary** | Brief, neutral description | Maximum 1-2 sentences; no advocacy language |
| **Verbatim Excerpt** | Key quote from testimony | Exact transcript text in quotes with specific page:line |
| **Element_ID** | PCM element reference | From PCM if available; `--` if no PCM or not applicable |
| **Flags** | From controlled flag types | Multiple flags comma-separated; `--` if none |
| **Notes** | Additional context | Brief; neutral |

**Topic Index rules:**
1. Every substantive testimony passage must have an entry
2. Procedural exchanges (objections, off-record, introductions) are excluded
   unless they contain substantive information
3. Entries ordered chronologically by page:line
4. One entry per topic group (related Q-A exchanges grouped together)
5. Verbatim excerpt is the single most important quote from the group
6. Multiple flags per entry are permitted

### Section 3: Admission Inventory

A focused extraction of all admissions for rapid trial preparation reference.

```markdown
## Admission Inventory

| # | Page:Line | Admission (Verbatim) | Element Supported | CFP Fact# | Significance | Trial Use |
|---|-----------|---------------------|-------------------|-----------|-------------|-----------|
| 1 | 19:12 | "I did not inspect that area in March." | NEG-BREACH-001 | Fact#23 | Establishes failure to inspect | Cross-exam / Closing |
| 2 | 34:5-8 | "We knew there had been complaints about that area." | NEG-BREACH-002 | Fact#31 | Establishes notice | Cross-exam / Closing |
| 3 | 45:18-20 | "Monthly inspections were required by our policy." | NEG-DUTY-001 | Fact#15 | Establishes duty standard | Cross-exam / Closing |
```

**Admission Inventory rules:**
1. Only entries flagged `ADMISSION` in the Topic Index appear here
2. The admission must be quoted verbatim — no paraphrasing
3. Element Supported links to PCM (if available)
4. CFP Fact# links to the CFP fact this admission confirms
5. Significance is a brief, neutral description of why this admission matters
6. Trial Use indicates how this admission will be used at trial

### Section 4: Flag Inventory

A comprehensive list of all flagged entries for downstream skill consumption.

```markdown
## Flag Inventory

| # | Page:Line | Flag Type | Description | Cross-Ref (CFP/DPB) | Downstream Skill | Action Needed |
|---|-----------|-----------|-------------|---------------------|-----------------|---------------|
| 1 | 19:12 | ADMISSION | Admits failure to inspect | CFP Fact#23 | CLOSING-ARGUMENT | Cite in closing |
| 2 | 28:3-5 | INCONSISTENCY-DISCOVERY | Says monthly; Rog answer said weekly | DPB Set1/Rog#5 | DEPO-IMPEACH | Analyze severity |
| 3 | 34:5-8 | ADMISSION | Admits prior complaints known | CFP Fact#31 | CLOSING-ARGUMENT | Cite in closing |
| 4 | 52:8-15 | DENIAL | Denies seeing warning sign | CFP Fact#18 | DEPO-IMPEACH | Find contradiction source |
| 5 | 67:1-68:4 | EVASION | Non-responsive on training topic | -- | DEPO-IMPEACH | Pattern analysis |
| 6 | 78:1-15 | INCONSISTENCY-DOCUMENT | Contradicts own email re: timeline | CFP Doc#7 (Bates DEF-000234) | DEPO-IMPEACH | High-value impeachment |
| 7 | 89:10-12 | LOCK-DOWN | Firm commitment on arrival time | CFP Fact#8 | CLOSING-ARGUMENT | Prevents testimony shift |
```

**Flag Inventory rules:**
1. Every flagged entry from the Topic Index gets a row
2. Cross-Ref column links to CFP fact or DPB response (if applicable)
3. Downstream Skill identifies which skill will consume this flag
4. Action Needed provides a brief, actionable instruction

### Section 5: Cross-Reference Table

Full cross-reference of testimony against CFP facts and DPB responses.

```markdown
## Cross-Reference Table

| # | Page:Line | Testimony Summary | CFP Fact# | CFP Consistent? | DPB Ref | DPB Consistent? | Notes |
|---|-----------|-------------------|-----------|-----------------|---------|-----------------|-------|
| 1 | 13:8 | Monthly inspection requirement | Fact#15 | CONFIRMS | Set1/Rog#5 | INCONSISTENT | Rog says "weekly" |
| 2 | 19:12 | Did not inspect in March | Fact#23 | CONFIRMS | -- | -- | No DPB ref on this fact |
| 3 | 34:5-8 | Knew about complaints | Fact#31 | CONFIRMS | Set1/RFA#12 | CONTRADICTS-SWORN | RFA denied knowledge |
| 4 | 52:8-15 | Did not see warning sign | Fact#18 | CONTRADICTS | -- | -- | CFP says sign visible |
```

### Section 6: Exhibit Reference Log

```markdown
## Exhibit Reference Log

| Exhibit # | Description | Marked (Page:Line) | Discussed (Page:Line) | Auth Status | CFP Doc Ref | Notes |
|-----------|-------------|--------------------|-----------------------|-------------|-------------|-------|
| Ex. 1 | Police report | 25:1 | 25:3-28:15 | AUTHENTICATED | CFP Doc#3 | Witness confirmed accuracy |
| Ex. 2 | Email chain (3/15) | 42:1 | 42:3-45:22; 78:1-80:5 | PARTIALLY-AUTH | CFP Doc#7 | Witness identified but disputed content |
| Ex. 3 | Inspection log | 55:1 | 55:3-58:10 | DISPUTED | CFP Doc#12 | Witness says log is incomplete |
```

### Section 7: Divider

```markdown
---
```

### Section 8: Gate Results

```markdown
## Gate Results

- **Verbatim Fidelity:** [PASS/FAIL] — All quotes verified against transcript text.
  [If FAIL: list entries with unverified quotes]

- **Citation Completeness:** [PASS/FAIL] — All entries have page:line references.
  [If FAIL: list entries without citations]

- **Cross-Reference Coverage:** [PASS/FAIL] — All flagged entries (ADMISSION,
  DENIAL, INCONSISTENCY-*) have cross-references to CFP and/or DPB where applicable.
  [If FAIL: list entries without cross-references]

- **Tag Consistency:** [PASS/FAIL] — All topic tags and flag types are from the
  controlled vocabulary defined in SKILL.md.
  [If FAIL: list non-standard tags used]
```

### Section 9: Open Items

```markdown
## Open Items

### [UNCLEAR] Items
- [UNCLEAR: Page:Line] — [Description of ambiguity in transcript]

### [VERIFY-QUOTE] Items
- [VERIFY-QUOTE: Page:Line] — [Quote to double-check against original transcript]

### [CROSS-REF-NEEDED] Items
- [CROSS-REF-NEEDED: Page:Line] — [Testimony that likely relates to CFP/DPB
  but specific link not confirmed]

### CFP Delta Request Candidates
- [NEW testimony at Page:Line] — [Description of new fact not in CFP.
  Consider adding to CFP via Delta Request.]
```

---

## 2. Mode-Specific Output Variations

### TOPIC ONLY Mode

Output includes only:
- Section 1: Transcript Metadata
- Section 2: Topic Index (without Element_ID column, without Flag column)
- Section 7: Divider
- Section 8: Gate Results (only Verbatim Fidelity and Citation Completeness)
- Section 9: Open Items

### ADMISSION SCAN Mode

Output includes only:
- Section 1: Transcript Metadata
- Section 3: Admission Inventory
- Section 4: Flag Inventory (ADMISSION, DENIAL, INCONSISTENCY-*, LOCK-DOWN only)
- Section 7: Divider
- Section 8: Gate Results
- Section 9: Open Items

### ELEMENT MAP Mode

Output includes:
- Section 1: Transcript Metadata
- Section 2: Topic Index (with Element_ID column emphasized)
- Additional: **Element Coverage Summary**

```markdown
## Element Coverage Summary

| Element_ID | Element | Support Status | Key Testimony (Page:Line) | Notes |
|-----------|---------|----------------|---------------------------|-------|
| NEG-DUTY-001 | Duty of Care | SUPPORTED | 13:8; 45:18 | Strong admission of duty |
| NEG-BREACH-001 | Breach | SUPPORTED | 19:12; 34:5 | Multiple admissions |
| NEG-CAUSE-001 | Causation | PARTIALLY SUPPORTED | 67:1-68:4 | Sequence established but gap in mechanism |
| DAM-MED-001 | Medical Damages | NOT ADDRESSED | -- | Witness has no medical knowledge |
```

- Section 7: Divider
- Section 8: Gate Results (plus Element Coverage gate)
- Section 9: Open Items

### INCREMENTAL Mode

Output includes:
- Section 1: Transcript Metadata (for the new transcript)
- Section 2: Topic Index (for the new transcript)
- Additional: **Cross-Witness Consistency Table** comparing new testimony against
  prior DEPO-INDEX outputs
- All standard sections
- Section 9: Open Items includes "Prior index update recommendations"

---

## 3. Witness-Based View

When multiple DEPO-INDEX outputs exist for a case, the system can produce
a **witness-based view** that consolidates testimony across all depositions
by witness.

### Witness-Based View Format

```markdown
## Witness-Based View: [Witness Name]

### Deposition Summary
- **Date(s):** [Date(s) of deposition(s)]
- **Total Pages:** [Combined page count]
- **Key Admissions:** [Count]
- **Inconsistencies Flagged:** [Count]

### Testimony by Element

#### NEG-DUTY-001: Duty of Care
| Depo Date | Page:Line | Summary | Flags |
|-----------|-----------|---------|-------|
| [Date 1] | 13:8 | Monthly inspection requirement | ADMISSION |
| [Date 1] | 45:18 | Policy required inspections | ADMISSION, LOCK-DOWN |

#### NEG-BREACH-001: Breach
| Depo Date | Page:Line | Summary | Flags |
|-----------|-----------|---------|-------|
| [Date 1] | 19:12 | Did not inspect in March | ADMISSION |
...
```

---

## 4. Topic-Based View

An alternative view that groups all testimony across all witnesses by topic tag.

### Topic-Based View Format

```markdown
## Topic-Based View: [Topic Tag]

### LIABILITY-BREACH — All Witness Testimony

| Witness | Depo Date | Page:Line | Summary | Flags | Consistency |
|---------|-----------|-----------|---------|-------|-------------|
| J. Smith | 1/15/2025 | 19:12 | Did not inspect | ADMISSION | -- |
| R. Jones | 2/3/2025 | 34:5-8 | Inspection schedule unclear | EVASION | DIFFERS from Smith |
| M. Davis | 2/10/2025 | 12:1-5 | Confirmed no inspection | ADMISSION | CORROBORATES Smith |
```

This view is useful for:
- CLOSING-ARGUMENT: Gathering all testimony on a single element
- DEPO-IMPEACH: Comparing cross-witness statements
- PCM: Updating element proof status based on all testimony

---

## 5. Formatting Standards

### Table Formatting

- Use markdown tables with aligned columns
- Keep summaries brief (1-2 sentences maximum)
- Verbatim excerpts in double quotes with specific page:line citation
- Element_IDs in code format when referenced inline
- Flag types in code format (backtick-delimited)

### Page:Line Citation Format

Always use consistent format:
- Single line: `45:12`
- Range (same page): `45:12-18`
- Range (cross-page): `45:12-46:3`
- Multiple: `45:12; 67:5-8`

### Verbatim Excerpt Conventions

```
"Exact transcript text here." (45:12)
```

- Always in double quotes
- Page:line in parentheses immediately after
- If excerpt spans multiple lines, use the starting page:line
- Maximum excerpt length: 2-3 sentences
- If the key testimony is longer, excerpt the most important portion and
  cite the full range in the Page:Line column

---

## 6. Multi-Part Output (Token Fail-Safe)

### When to Chunk

Chunk when the transcript is long enough that the full index exceeds output
token limits. General guidelines:

| Transcript Length | Chunking Needed? |
|-------------------|-----------------|
| Under 100 pages | Usually not |
| 100-200 pages | Possibly (depends on density of testimony) |
| 200-400 pages | Likely; use 2-3 parts |
| Over 400 pages | Definitely; use 3-4 parts |

### Chunking Strategy

| Part | Content |
|------|---------|
| Part 1 | Transcript Metadata + Topic Index |
| Part 2 | Admission Inventory + Flag Inventory |
| Part 3 | Cross-Reference Table + Exhibit Reference Log |
| Part 4 | Gate Results + Open Items |

### Chunking Rules

1. Each part labeled "Part [N] of [Total]"
2. Never split a single table row across parts
3. Topic Index entries remain chronologically ordered within each part
4. Gate Results and Open Items always in the final part
5. Each part begins with a brief header: "DEPO-INDEX: [Witness Name] —
   Part [N] of [Total]"

---

## 7. Quality Checks Before Output

```
PRE-OUTPUT CHECKLIST:
[ ] Transcript Metadata complete (all fields populated)
[ ] Every Topic Index entry has page:line citation
[ ] Every Topic Index entry has topic tag from controlled vocabulary
[ ] Every Topic Index entry has a verbatim excerpt
[ ] All ADMISSION entries appear in Admission Inventory
[ ] All flagged entries appear in Flag Inventory
[ ] Cross-Reference Table includes all ADMISSION, DENIAL, INCONSISTENCY entries
[ ] Exhibit Reference Log includes all exhibits marked in transcript
[ ] All verbatim quotes are exact matches to transcript text
[ ] No advocacy language in summaries or notes
[ ] Gate Results evaluated for all four gates
[ ] Open Items lists all [UNCLEAR], [VERIFY-QUOTE], [CROSS-REF-NEEDED] items
[ ] If PCM provided: Element_ID column populated for liability/damages entries
[ ] If DPB provided: DPB cross-references populated
[ ] If prior DEPO-INDEX provided: cross-witness comparison included
[ ] CFP Delta Request candidates flagged for NEW testimony
```
