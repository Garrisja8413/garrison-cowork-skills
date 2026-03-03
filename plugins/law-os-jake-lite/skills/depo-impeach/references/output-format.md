# DEPO-IMPEACH Reference: Impeachment Report Format and Trial-Ready Cross-Examination Blocks

## Purpose

This reference defines the required output format for DEPO-IMPEACH impeachment
analysis. The output is structured for dual consumption: (1) attorney review for
strategic decision-making, and (2) machine consumption by downstream skills
(CLOSING-ARGUMENT, TRIAL-NOTEBOOK, DEPO-OUTLINE). It includes trial-ready
cross-examination blocks that attorneys can use directly during trial.

---

## 1. Complete Output Structure

The output must follow this exact order. Sections marked "(conditional)"
are only included in specific modes.

### Section 1: Witness Impeachment Summary

```markdown
## Witness Impeachment Summary

**Witness:** [Full legal name] -- [Role/Title]
**Deposition Date:** [Date]
**Sources Compared:** [List: DEPO-INDEX, DPB sets, CFP documents, prior depositions]
**Mode:** [FULL ANALYSIS / DISCOVERY COMPARE / CROSS-WITNESS / EXPERT IMPEACH / TRIAL PREP]

### Overall Credibility Assessment
**Rating:** [Strong / Moderate / Weak / Severely Compromised]
**Basis:** [2-3 sentence explanation of the overall assessment]

### Contradiction Summary

| Severity | Count | P1 (Critical) | P2 (High) | P3+ (Medium-Low) |
|----------|-------|---------------|-----------|-------------------|
| DIRECT | [#] | [#] | [#] | [#] |
| MATERIAL-OMISSION | [#] | [#] | [#] | [#] |
| QUALIFICATION | [#] | [#] | [#] | [#] |
| DEGREE | [#] | [#] | [#] | [#] |
| TIMELINE | [#] | [#] | [#] | [#] |
| DETAIL | [#] | [#] | [#] | [#] |
| **TOTAL** | **[#]** | **[#]** | **[#]** | **[#]** |

### Top 3 Impeachment Opportunities
1. **C-001: [Topic]** -- [Severity] / [Materiality] -- Score: [##]/40
   [One-sentence description]
2. **C-002: [Topic]** -- [Severity] / [Materiality] -- Score: [##]/40
   [One-sentence description]
3. **C-003: [Topic]** -- [Severity] / [Materiality] -- Score: [##]/40
   [One-sentence description]

### Patterns Detected
- [Pattern type]: [Brief description] (involves C-[##], C-[##], C-[##])
```

### Section 2: Contradiction Table

The core deliverable. Every identified contradiction in structured format,
sorted by composite score (highest first).

```markdown
## Contradiction Table

### C-001: [Brief Topic Label]

**Composite Score: [##]/40 -- [CRITICAL/HIGH/MEDIUM/LOW/MINIMAL]**
**Severity:** [DIRECT | MATERIAL-OMISSION | QUALIFICATION | DEGREE | TIMELINE | DETAIL]
**Materiality:** [ELEMENT-CRITICAL | CREDIBILITY-CRITICAL | SIGNIFICANT | MINOR | CUMULATIVE]
**Element Affected:** [Element_ID from PCM] -- [Element name]
**Score Breakdown:** Severity [#]x2 + Materiality [#]x2 + Source [#] + Jury [#]x2 + Feasibility [#] = [##]

**Deposition Testimony:**
> Page [##:##-##:##]:
> Q: [verbatim question text]
> A: [verbatim answer text]

**Prior Statement:**
> Source: [exact citation: DPB SetID/ReqNum | Document Bates# | Prior depo page:line]
> Date: [date of prior statement]
> "[verbatim text of prior statement]"

**Contradiction Analysis:**
[2-3 sentences explaining why these statements are inconsistent and what the
contradiction means for the case elements]

**Context Notes:** [Any relevant context; or "None -- contradiction is clear on its face"]
**Flags:** [CONTEXT-SENSITIVE | VERIFY-INCONSISTENCY | none]
**Foundation Status:** [COMPLETE | PARTIAL | NEEDED]

---

### C-002: [Brief Topic Label]
[Same structure as above]

---
```

**Contradiction Table rules:**
1. Number contradictions sequentially (C-001, C-002, etc.)
2. Sort by composite score, highest first
3. Both statements must be verbatim with exact pinpoint citations
4. Analysis must be objective -- explain the inconsistency, do not advocate
5. Context notes are mandatory if any context affects interpretation
6. Foundation status must be assessed for every entry

### Section 3: Pattern Analysis

```markdown
## Pattern Analysis

### Pattern 1: [Pattern Name] (e.g., Selective Memory)

**Contradictions Involved:** C-[##], C-[##], C-[##]
**Pattern Description:** [2-3 sentences describing the pattern]
**Impeachment Narrative:** [How to present this pattern to a jury --
  a concise theme the attorney can use in closing]
**Trial Value:** [HIGH | MEDIUM | LOW]
**Pattern Bonus Applied:** +[#] to each involved contradiction

### Cross-Witness Inconsistencies (conditional -- only with multiple DEPO-INDEX inputs)

| Topic | This Witness (cite) | Other Witness (name, cite) | Significance |
|-------|--------------------|-----------------------------|-------------|
| [subject] | "[quote]" ([page:line]) | [Name]: "[quote]" ([page:line]) | [why it matters] |
```

### Section 4: Impeachment Strategy (Trial-Ready Cross-Examination Blocks)

This section provides **trial-ready cross-examination sequences** for every
P1 and P2 contradiction. These are actual questions the attorney can use
at trial, organized in commit-credit-confront format.

```markdown
## Impeachment Strategy

### Trial-Ready Cross-Examination Block: C-001

**Contradiction:** [One-sentence summary]
**Score:** [##]/40 ([PRIORITY])
**Estimated Time:** [minutes]

#### Phase 1: COMMIT (Lock the witness into the deposition testimony)

```
Q: [Witness name], during your deposition on [date], you were asked about
   [topic], correct?
   Expected A: Yes.

Q: And your testimony under oath was that [paraphrase of deposition testimony],
   is that right?
   Expected A: Yes.

Q: You were certain about that when you gave that testimony, weren't you?
   Expected A: Yes.

Q: And nothing has changed since then that would cause you to change that
   testimony, has it?
   Expected A: No.
```

**If witness deviates:** [Contingency -- e.g., "Read the transcript at
[page:line] to refresh recollection"]

#### Phase 2: CREDIT (Establish reliability of the prior statement)

```
[For sworn discovery response:]
Q: Before your deposition, your attorneys sent you interrogatories to answer,
   correct?
   Expected A: Yes.

Q: You understood those interrogatories were asking you to provide information
   under oath?
   Expected A: Yes.

Q: You reviewed your answers before you signed them?
   Expected A: Yes.

Q: And when you signed them, you verified that the answers were true and
   accurate to the best of your knowledge?
   Expected A: Yes.

Q: You took that obligation seriously?
   Expected A: Yes.
```

```
[For prior deposition:]
Q: You were deposed previously in this case on [date], correct?
   Expected A: Yes.

Q: You were placed under oath at that deposition, just as you are today?
   Expected A: Yes.

Q: You had the opportunity to review and correct the transcript?
   Expected A: Yes.

Q: And you were trying to be truthful and accurate then, just as you are
   today?
   Expected A: Yes.
```

```
[For authored document:]
Q: I'm showing you [Exhibit #]. You recognize this document?
   Expected A: Yes.

Q: This is [description] that you [wrote/signed/sent] on [date]?
   Expected A: Yes.

Q: When you [wrote/signed/sent] this, you were trying to be accurate?
   Expected A: Yes.
```

#### Phase 3: CONFRONT (Present the prior inconsistent statement)

```
[For sworn discovery response:]
Q: Let me read from your answer to Interrogatory No. [#], which you signed
   under oath on [date]:

   [Read verbatim: "exact text of prior statement"]

   Did I read that correctly?
   Expected A: Yes.

[STOP. Do not argue. Do not ask "So which is it?" Let the contradiction
speak for itself. Move to next topic.]
```

```
[For prior deposition:]
Q: Let me read from your prior deposition, page [##], starting at line [##]:

   [Read verbatim: "exact question and answer"]

   Did I read that correctly?
   Expected A: Yes.

[STOP.]
```

```
[For authored document:]
Q: Please read the [highlighted/circled] portion of [Exhibit #] for the
   jury.

   [Witness reads the contradicting text]

   That's what it says, correct?
   Expected A: Yes.

[STOP.]
```

#### Contingencies

**If witness admits the inconsistency:**
```
Q: So your [prior statement/testimony] was different from what you told us
   today?
   [Do not press further. The jury heard the contradiction.]
```

**If witness denies or explains:**
```
[Offer extrinsic evidence of the prior statement under NMRA 11-613(B) /
FRE 613(b)]
[Mark the prior statement as exhibit if not already in evidence]
[Read the statement to the jury through the exhibit]
```

**If witness tries to explain at length:**
```
Q: My question was simple: Did I read your [answer/testimony] correctly?
   [Redirect witness to yes/no]
```

**Risk Assessment:** [What could go wrong and how to handle it]

---

### Trial-Ready Cross-Examination Block: C-002
[Same structure as above]

---
```

**Impeachment Strategy rules:**
1. Trial-ready blocks required for every P1 and P2 contradiction
2. Questions must be actual cross-examination questions (leading, closed)
3. All three phases (commit, credit, confront) must be included
4. Contingency planning for each possible witness response is required
5. Estimated time helps with trial time budgeting
6. The STOP instruction after confrontation is mandatory -- the attorney
   should not argue with the witness after presenting the contradiction

### Section 5: Foundation Checklist

```markdown
## Foundation Checklist

### C-001: [Topic]

**Applicable Rule:** [NMRA 11-613 / FRE 613]
**Type of Prior Statement:** [Sworn discovery / Prior deposition / Document / Other]

**Foundation Elements:**
- [ ] Prior statement is genuinely inconsistent with current testimony
- [ ] Witness given opportunity to explain or deny the prior statement
- [ ] Opposing party given opportunity to examine witness about it
- [ ] If party admission: no foundation needed (NMRA 11-801(D)(2) / FRE 801(d)(2))
- [ ] Extrinsic evidence available if witness denies making the statement
- [ ] [Additional foundation elements specific to this type of statement]

**Extrinsic Evidence:**
- **Available:** [Yes/No]
- **Form:** [Document, transcript, recording, testimony of another witness]
- **Admissibility:** [Admissible under [rule cite] / Potentially objectionable because [reason]]
- **Procedure:** [How to introduce if witness denies]

**Status:** [FOUNDATION-COMPLETE | FOUNDATION-PARTIAL | FOUNDATION-NEEDED]
```

### Section 6: Trial Presentation Plan

```markdown
## Trial Presentation Plan

### Recommended Impeachment Sequence

| Order | Contradiction | Score | Time Est. | Strategic Rationale |
|-------|--------------|-------|-----------|---------------------|
| 1 | C-[##] | [##]/40 | [min] | [e.g., "Strong opening -- establishes control"] |
| 2 | C-[##] | [##]/40 | [min] | [e.g., "Builds pattern of inconsistency"] |
| 3 | C-[##] | [##]/40 | [min] | [e.g., "Devastating close -- strongest contradiction"] |
| **Total** | | | **[min]** | |

### Visual Aid Recommendations
- [ ] Side-by-side exhibit: Deposition testimony vs. [prior source] for C-[##]
      Format: Left column = deposition quote with page:line; Right column = prior
      statement with source citation. Key differences highlighted.
- [ ] Timeline chart showing evolution of witness's position across [N] statements
      for pattern argument
- [ ] Blow-up of [Exhibit #] with contradicting passage highlighted for C-[##]

### Timing Within Cross-Examination
- **Opening (5-10 min):** Establish background, get initial commitments
- **Admissions block (10-15 min):** Extract favorable admissions before impeachment
- **Impeachment block ([est. min]):** Execute impeachment sequence per plan above
- **Clean-up (5 min):** Final lock-down questions
- **Close (2-3 min):** End on strongest remaining point

### Closing Argument Integration
Points for CLOSING-ARGUMENT skill consumption:
- C-[##]: "The defendant told you under oath that [X]. But when they signed
  their interrogatory answers, they said [Y]. Which version do you believe?"
- Pattern argument: "This witness changed their story [N] times on [N] different
  topics. That is not a memory problem -- that is a credibility problem."
```

### Section 7: Divider and Gate Results

```markdown
---

## Gate Results

- **Verbatim Fidelity:** [PASS/FAIL] -- All [#] quotations verified against
  source documents and transcript text.
  [If FAIL: list entries with unverified quotes]

- **Citation Completeness:** [PASS/FAIL] -- All [#] entries have exact
  pinpoint source citations (page:line, SetID/ReqNum, Bates#).
  [If FAIL: list entries without complete citations]

- **Foundation Status:** [PASS/FAIL] -- Foundation requirements identified
  and assessed for all [#] P1/P2 impeachment opportunities.
  [If FAIL: list entries without foundation assessment]

- **Ethical Compliance:** [PASS/FAIL] -- No misleading out-of-context
  quotations or manufactured contradictions. All context-sensitive items
  flagged appropriately.
  [If FAIL: list entries with ethical concerns]
```

### Section 8: Open Items

```markdown
## Open Items

### [VERIFY-INCONSISTENCY] Items
- C-[##]: [Potential contradiction needing confirmation] -- Verify by: [method]

### [FOUNDATION-NEEDED] Items
- C-[##]: [Foundation element not yet established] -- Obtain by: [method]

### [CONTEXT-SENSITIVE] Items
- C-[##]: [Contradiction where context may explain the inconsistency] --
  Attorney review needed before pursuing at trial

### [DECISION REQUIRED] Items
- C-[##]: [Strategic decision about whether to pursue this impeachment] --
  Considerations: [brief explanation of tradeoffs]
- Impeachment sequence: [DECISION REQUIRED] -- Attorney to confirm recommended order
- Visual aids: [DECISION REQUIRED] -- Attorney to approve side-by-side exhibits
```

---

## 2. Mode-Specific Output Variations

| Section | FULL ANALYSIS | DISCOVERY COMPARE | CROSS-WITNESS | EXPERT IMPEACH | TRIAL PREP |
|---------|--------------|-------------------|--------------|----------------|-----------|
| Summary | Full | Full | Full | Full | Abbreviated |
| Contradiction Table | All sources | DPB only | Cross-witness focus | Expert-specific | P1-P2 only |
| Pattern Analysis | Full | DPB patterns only | Cross-witness focus | Expert patterns | Trial-relevant only |
| Impeachment Strategy | P1-P2 blocks | P1-P2 blocks | P1-P2 blocks | Expert-specific blocks | All pursued (full detail) |
| Foundation Checklist | All entries | All entries | All entries | Daubert-focused | All pursued |
| Trial Presentation | Framework | Omit | Omit | Omit | Full (primary deliverable) |
| Gate Results | Full | Full | Full | Full | Full |
| Open Items | Full | Full | Full | Full | Full |

### EXPERT IMPEACH Mode Additions

In EXPERT IMPEACH mode, add these additional sections:

```markdown
### Expert-Specific Impeachment Sources

| Source Type | Citation | Contradiction with Testimony |
|------------|----------|------------------------------|
| Expert's own report | [Section, page] | [Brief description] |
| Learned treatise | [Title, edition, page] | [Brief description] |
| Expert's prior testimony (other case) | [Case name, page:line] | [Brief description] |
| Expert's publications | [Title, journal, date] | [Brief description] |
| Expert's CV | [Section] | [Brief description -- e.g., qualification claim not supported] |

### Daubert/NMRA 11-702 Vulnerability Analysis

| Vulnerability | Testimony Cite | Impeachment Basis | Trial Impact |
|---------------|---------------|-------------------|-------------|
| [Methodology flaw] | [Page:line] | [What the expert's own sources say] | [Impact on admissibility] |
```

---

## 3. Multi-Part Output (Token Fail-Safe)

If the analysis is extensive, chunk as follows:

| Part | Content |
|------|---------|
| Part 1 | Witness Impeachment Summary + Contradiction Table (all entries) |
| Part 2 | Pattern Analysis + Impeachment Strategy (all trial-ready blocks) |
| Part 3 | Foundation Checklist + Trial Presentation Plan + Gate Results + Open Items |

### Chunking Rules

1. Each part labeled "Part [N] of [Total]"
2. Never split a single contradiction entry across parts
3. The Contradiction Table stays together in Part 1
4. Trial-ready cross-examination blocks stay together in Part 2
5. Gate Results and Open Items always in the final part

---

## 4. Quality Checks Before Output

```
PRE-OUTPUT CHECKLIST:
[ ] All deposition quotes verified verbatim against DEPO-INDEX
[ ] All prior statement quotes verified verbatim against DPB/CFP sources
[ ] All citations are pinpoint (page:line, SetID/ReqNum, Bates#)
[ ] Composite scores calculated correctly for all contradictions
[ ] Contradictions sorted by composite score (highest first)
[ ] Pattern analysis identifies genuine patterns (3+ related contradictions)
[ ] Trial-ready blocks prepared for all P1 and P2 contradictions
[ ] Foundation checklist completed for all P1 and P2 entries
[ ] No out-of-context quotations or manufactured contradictions
[ ] Context-sensitive items flagged [CONTEXT-SENSITIVE]
[ ] Uncertain contradictions flagged [VERIFY-INCONSISTENCY]
[ ] All [DECISION REQUIRED] items listed in Open Items
[ ] Gate Results evaluated for all four gates
[ ] Ethical compliance verified -- no misleading juxtapositions
```
