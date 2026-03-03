# DEPO-OUTLINE Reference: Output Format and Outline Structure

## Purpose

This reference defines the exact output format for the DEPO-OUTLINE skill.
The outline follows a structured format with topic blocks organized by element,
each containing question areas at multiple funnel levels. The output includes
the examination outline, cite table, gate results, next requests, and open items.

---

## 1. Complete Output Structure

The output must follow this exact order. Every section is required.

### Part 1: Examination Outline (Parts A-F)

#### Part A: Witness Profile

```markdown
## Part A: Witness Profile

**Name:** [Full name]
**Role:** [Title, position, relationship to parties]
**Party/Non-Party:** [Party witness / Non-party witness]
**Deposition Date:** [Date or [FILL-IN: Date]]
**Examination Type:** [DIRECT / CROSS / EXPERT / CORPORATE-30b6]

### Prior Testimony / Discovery Responses
- [DPB SetID/ReqNum]: [Brief summary of relevant prior response]
- [Prior deposition]: [Date, brief summary of key testimony if available]

### Known Biases, Motivations, Credibility Issues
- [From CFP/DPB: employment relationship, financial interest, personal
  relationship, prior inconsistencies, etc.]
- [If none identified: "No known credibility issues identified in CFP/DPB."]

### Cooperative vs. Hostile Assessment
- [Assessment based on DPB data, AIP profile if available, party status]
- [DECISION REQUIRED: Attorney to confirm assessment based on personal
  knowledge of the witness]
```

#### Part B: Examination Objectives (Element Map)

```markdown
## Part B: Examination Objectives (Element Map)

| # | Objective | Element_ID(s) | Claim | Priority | PCM Status | Witness Relevance |
|---|-----------|---------------|-------|----------|------------|-------------------|
| 1 | [What to establish] | [NEG-DUTY-001] | [Negligence] | [P1-CRITICAL] | [UNPROVEN] | [Why this witness] |
| 2 | [What to lock down] | [NEG-BREACH-001] | [Negligence] | [P2-HIGH] | [FACTS-ONLY] | [Why this witness] |
...

### Coverage Summary
- **CRITICAL (P1):** [N] objectives — [list Element_IDs]
- **HIGH (P2):** [N] objectives — [list Element_IDs]
- **MEDIUM (P3):** [N] objectives — [list Element_IDs]
- **LOW (P4):** [N] objectives — [list Element_IDs]
- **Total estimated time:** [Time estimate] [DECISION REQUIRED]
```

#### Part C: Topic-by-Topic Outline

This is the core deliverable. Each topic follows a standardized block format.

```markdown
## Part C: Topic-by-Topic Outline

---

### TOPIC 1: [Topic Name]
**Element(s):** [Element_ID(s) from PCM/LPB]
**Claim:** [Cause of action this topic supports]
**Objective:** [What we need to establish or lock down]
**Priority:** [P1-CRITICAL / P2-HIGH / P3-MEDIUM / P4-LOW]
**Estimated Time:** [Minutes] [DECISION REQUIRED]

#### Background Questions (Funnel Level 1)
- [Question area] — [purpose note]
- [Question area] — [purpose note]

#### Narrowing Questions (Funnel Level 2)
- [Question area] — [purpose note]
- [Question area] — [purpose note]

#### Key Questions (Funnel Level 3)
- [Question area] — [purpose note] — **Doc: [Bates/Exhibit ref]**
- [Question area] — [purpose note]
- [Question area] — [purpose note] — **Doc: [Bates/Exhibit ref]**

#### Lock-Down Questions (Funnel Level 4)
- [Statement to confirm] — [why this matters for trial]
- [Statement to confirm] — [why this matters for trial]

#### Impeachment Setup (if applicable)
- **Prior Statement:** [Source + pinpoint cite] — [verbatim quote]
- **Contradiction:** [What current testimony is expected to be]
- **Confrontation Sequence:** Commit → Credit → Confront
- **Doc for Confrontation:** [Bates/Exhibit ref]

#### Strategic Notes
- [Sequencing recommendation] [DECISION REQUIRED]
- [Risk/caution note]
- [SDC compliance note if applicable]

---

### TOPIC 2: [Topic Name]
[Same structure as above]

---
```

**Topic block rules:**
1. Every topic must have an Element_ID connection
2. Every topic must have at least Background + Key Questions + Lock-Down
3. Impeachment Setup only if prior inconsistent statement exists in DPB/CFP
4. All strategic notes flagged `[DECISION REQUIRED]`
5. All document references must include Bates range or exhibit number
6. Topics ordered by priority (P1 first, then P2, etc.)

#### Part D: Impeachment Inventory

```markdown
## Part D: Impeachment Inventory

| # | Prior Statement (Source + Pinpoint) | Expected Testimony | Contradiction | Confrontation Document | Topic Ref |
|---|------------------------------------|--------------------|---------------|----------------------|-----------|
| 1 | [DPB SetID/ReqNum: "verbatim"] | [Expected testimony] | [How they conflict] | [Bates/Exhibit] | TOPIC [N] |
| 2 | [Prior depo page:line: "verbatim"] | [Expected testimony] | [How they conflict] | [Transcript] | TOPIC [N] |
...

### Impeachment Sourcing Notes
- All prior statements verified against DPB/CFP: [YES/NO]
- Unverified impeachment opportunities: [List any [VERIFY-IMPEACH] items]
```

**Impeachment inventory rules:**
1. Every entry must have a verbatim prior statement with exact source citation
2. No speculative impeachment — every entry must cite a specific prior statement
3. Cross-reference to the Topic where the impeachment appears in the outline
4. If source cannot be verified: `[VERIFY-IMPEACH]`

#### Part E: Document Exhibit List

```markdown
## Part E: Document Exhibit List

| Order | Document | Bates/Exhibit | Topic(s) | Purpose | Authentication Witness |
|-------|----------|---------------|----------|---------|----------------------|
| 1 | [Document description] | [Bates range] | TOPIC [N] | [Auth/Confront/Corroborate] | [This witness / Other] |
| 2 | [Document description] | [Exhibit #] | TOPIC [N,M] | [Purpose] | [Witness] |
...
```

**Document list rules:**
1. Documents ordered by recommended usage sequence
2. Every document must have a Bates range or exhibit number (or `[VERIFY]`)
3. Purpose must be specified (Authentication, Confrontation, Corroboration, Foundation)
4. If document has not been produced in discovery, flag: `[VERIFY: Document
   availability — confirm produced in discovery]`

#### Part F: Strategic Notes

```markdown
## Part F: Strategic Notes

### Recommended Examination Sequence
[DECISION REQUIRED]
1. [Recommended topic order with rationale]
2. [E.g., "Start with Topics 1-2 (background/rapport), move to Topics 3-5
   (admissions), close with Topics 6-7 (impeachment)"]

### Areas to Avoid
- [SDC telegraphing risks — topics or questions that may reveal hidden strategy]
- [Topics that may open unfavorable areas for the opposing party to explore]

### Redirect Preparation (if defending this deponent)
- [Anticipated cross-examination topics]
- [Rehabilitation points for redirect]

### Time Allocation
[DECISION REQUIRED]
| Topic Group | Estimated Time | Notes |
|-------------|---------------|-------|
| Background (Topics 1-2) | [X] min | |
| Liability (Topics 3-5) | [X] min | Most critical — allocate maximum time |
| Damages (Topics 6-8) | [X] min | |
| Impeachment (Topic 9) | [X] min | Save for end of exam |
| Buffer | [X] min | For follow-up and clean-up |
| **Total** | **[X] min** | [Within 7-hour limit if federal] |

### Additional Notes
- [Any other strategic considerations]
- [Witness preparation notes (if defending)]
- [Coordination with other depositions in the case]
```

### Part 2: Divider

```markdown
---
```

### Part 3: Cite Table

```markdown
## Cite Table

| # | Topic/Question Area | Source (CFP Fact#, DPB ref, LPB LawTag, PCM Element_ID) | Confidence | Notes |
|---|--------------------|---------------------------------------------------------|------------|-------|
| 1 | [Topic 1: Duty] | [CFP Fact#12; LPB NEG-DUTY; PCM NEG-DUTY-001] | HIGH | [Note] |
| 2 | [Topic 2: Timeline] | [CFP Fact#5, #6, #7; DPB Set1/Rog3] | HIGH | [Note] |
| 3 | [Impeachment #1] | [DPB Set1/Rog5: verbatim quote] | HIGH | Verified |
| 4 | [Impeachment #2] | [Prior depo 45:12-15] | MEDIUM | [VERIFY-IMPEACH] |
...
```

**Cite table rules:**
1. Every topic block must have at least one cite table entry
2. Every impeachment must have a cite table entry with exact source
3. Confidence: HIGH (verified in pack data), MEDIUM (inferred), LOW (uncertain)
4. Multiple sources per entry are acceptable (separated by semicolons)

### Part 4: Gate Results

```markdown
## Gate Results

- **Traceability:** [PASS/FAIL] — All topics trace to elements or fact gaps.
  [If FAIL: list untraced topics]
- **Element Coverage:** [PASS/FAIL] — All required elements addressed.
  [If FAIL: list missing Element_IDs]
- **Impeachment Sourcing:** [PASS/FAIL] — All impeachment cites verified.
  [If FAIL: list unverified items]
- **SDC Compliance:** [PASS/FAIL] — No unauthorized disclosure of hidden items.
  [If FAIL: list potential telegraphing risks]
- **Document References:** [PASS/FAIL] — All documents identified with Bates/exhibit.
  [If FAIL: list documents without identification]
```

### Part 5: Next Requests

```markdown
## Next Requests

- [Specific items the attorney needs to provide or review]
- Examples:
  - "Review Topic 3 impeachment setup — confirm prior statement accuracy"
  - "Provide Bates range for [document]"
  - "Confirm examination sequence recommendation"
  - "Review SDC compliance flags in Topics 5 and 7"
  - "Provide expert report for Topic 8 (expert methodology)"
  - "Run DEPO-IMPEACH for comprehensive inconsistency analysis"
```

### Part 6: Open Items

```markdown
## Open Items

### [VERIFY] Items
- [VERIFY: description] — [location in outline]

### [VERIFY-IMPEACH] Items
- [VERIFY-IMPEACH: description] — [prior statement source uncertain]

### [DECISION REQUIRED] Items
- [DECISION REQUIRED: description] — [attorney judgment needed]
  - Examination sequence (Part F)
  - Time allocation (Part F)
  - SDC compliance decisions (specific topics)
  - Topic inclusion decisions (borderline relevance)
```

---

## 2. Mode-Specific Output Variations

### DIRECT Mode

- Funnel levels emphasize open questions (Levels 1-2 longer)
- Impeachment Setup section reframed as "Weakness Anticipation" —
  areas where the witness may be vulnerable on cross
- Strategic Notes include redirect preparation
- Lock-down questions focus on preserving favorable testimony

### CROSS Mode

- Funnel levels emphasize leading questions (Levels 3-4 longer)
- Impeachment Setup section is prominent
- Topics sequenced for maximum control (chapter method)
- Lock-down questions focus on commitment and closing escape routes

### EXPERT Mode

- Part A includes detailed qualifications review
- Topics organized by: (1) Qualifications, (2) Methodology, (3) Opinions,
  (4) Bases/Data, (5) Assumptions, (6) Daubert/11-702 Challenges
- Document list includes expert report, CV, prior publications, prior testimony
- Additional section: "Daubert Challenge Points" listing specific vulnerabilities

### CORPORATE-30b6 Mode

- Topics organized by the 30(b)(6) topic designations from the notice
- Part A includes organizational profile rather than individual profile
- Each topic block begins with "Preparation Assessment" questions
- Additional section: "Inadequate Designation Tracking" flagging topics where
  designee was not adequately prepared

---

## 3. Formatting Standards

### Markdown Conventions

- `##` for main parts (Part A through Part F, Cite Table, Gates, etc.)
- `###` for topic headers within Part C
- `####` for sub-sections within topics (question levels)
- Bold for emphasis on key terms, document references, and element IDs
- Tables for structured data (element map, impeachment inventory, etc.)
- Horizontal rules (`---`) between topic blocks in Part C

### Question Area Formatting

Questions in the outline are formatted as question **areas**, not verbatim
questions. The attorney adapts the question areas to their own style.

```
Good: "Establish witness's observation point and sight lines — [NEG-CAUSE-001]"
Bad:  "Did you see the accident from the parking lot?"

Good: "Lock down timeline: arrival time, duration of observation, departure"
Bad:  "What time did you get there? How long were you there? When did you leave?"
```

**Exception:** Impeachment confrontation questions may be more specific because
the exact wording matters for the commit-credit-confront sequence.

### Document Reference Formatting

Always bold document references inline:

```
- Establish witness authored the inspection report — **Doc: DEF-001234-001240**
- Confront with prior inconsistent email — **Doc: PL-EX-015 (Email dated 3/15/2024)**
```

---

## 4. Multi-Part Output (Token Fail-Safe)

If the outline is extensive (many topics, extensive impeachment inventory),
chunk by category:

### Chunking Strategy

| Part | Content |
|------|---------|
| **Output 1** | Parts A + B + Topics 1-[N] (Liability topics) |
| **Output 2** | Topics [N+1]-[M] (Damages topics) + Part D (Impeachment Inventory) |
| **Output 3** | Parts E + F + Cite Table + Gate Results + Next Requests + Open Items |

### Chunking Rules

- Each output labeled "Part [X] of [Total]"
- Do not split a single topic block across outputs
- Gate Results and Open Items always in the final output
- Cite Table always in the final output (or split: liability cites in Part 1,
  damages cites in Part 2, with complete table in Part 3)

---

## 5. Quality Checks Before Output

```
PRE-OUTPUT CHECKLIST:
[ ] Part A: Witness profile complete
[ ] Part B: Element map covers all relevant PCM elements
[ ] Part C: Every topic has Element_ID, Objective, Priority, questions at 3+ levels
[ ] Part C: Topics ordered by priority
[ ] Part D: Every impeachment entry has verbatim quote + exact source
[ ] Part E: Every document has Bates/Exhibit reference
[ ] Part F: Strategic notes flagged [DECISION REQUIRED]
[ ] Cite Table: Every topic and impeachment has a cite entry
[ ] Gate Results: All five gates evaluated
[ ] Open Items: All [VERIFY], [VERIFY-IMPEACH], [DECISION REQUIRED] items listed
[ ] No invented facts, quotes, documents, or citations
[ ] SDC compliance verified — no telegraphing of hidden items
[ ] Time allocation within jurisdictional limits (7 hrs if federal)
```
