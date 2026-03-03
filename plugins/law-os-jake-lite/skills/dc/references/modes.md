# DC Modes — Detailed Reference

---

## MODE: DAMAGES

**Goal:** Jury-value damages ranges (Low/Mid/High) by category.

### Inputs Required
- Case classification (Group + Type + flags)
- Medical records or CFP PACKET with medical facts
- Economic data (lost wages, earning capacity, medical bills)
- Injury description and prognosis
- Life expectancy data (if future damages claimed)

### UJI Element Tracking
Track NM UJI elements as a checklist:

**Personal Injury (UJI 13-1802):**
- [ ] UJI 13-1803: Physical pain and suffering (past + future)
- [ ] UJI 13-1804: Mental anguish (past + future)
- [ ] UJI 13-1805: Medical expenses (past + future — amounts billed)
- [ ] UJI 13-1806: Lost earnings / earning capacity (past + future)
- [ ] UJI 13-1807: Loss of enjoyment of life / impairment
- [ ] UJI 13-1808: Disfigurement
- [ ] UJI 13-1809: Property damage
- [ ] UJI 13-1810A: Aggravating circumstances / punitive damages

**Wrongful Death (UJI 13-1830):**
- [ ] Economic losses (support, services, contributions)
- [ ] Value of life (relationship, companionship, guidance)
- [ ] Optional: emotional distress of statutory beneficiaries

### Output Structure

```
ASSUMPTIONS & INPUTS
- Case type: [Group / Type]
- Flags: [WD: Y/N] [LOC: Y/N] [Consumer/UPA: Y/N] [Med-mal cap: Y/N]
- Medical billed rule: amounts billed / gross charges used per firm policy
- [List key factual assumptions with source citations]

DAMAGES CALCULATION TABLE
| Category | Element | Low | Mid | High | Source / Basis | UJI Ref |
|----------|---------|-----|-----|------|----------------|---------|
| Economic — Past Medical | Billed charges | $X | $X | $X | [cite] | 13-1805 |
| Economic — Future Medical | Life care plan | $X | $X | $X | [cite] | 13-1805 |
| Economic — Past Lost Wages | [period] | $X | $X | $X | [cite] | 13-1806 |
| Economic — Future Earning Cap | [method] | $X | $X | $X | [cite] | 13-1806 |
| Non-Economic — Pain/Suffering | Past + Future | $X | $X | $X | [basis] | 13-1803 |
| Non-Economic — Mental Anguish | Past + Future | $X | $X | $X | [basis] | 13-1804 |
| Non-Economic — LOE/Impairment | | $X | $X | $X | [basis] | 13-1807 |
| Non-Economic — Disfigurement | | $X | $X | $X | [basis] | 13-1808 |
| Enhanced — Punitive | If applicable | $X | $X | $X | [basis] | 13-1810A |

SUBTOTALS
- Economic total: Low $X / Mid $X / High $X
- Non-economic total: Low $X / Mid $X / High $X
- Enhanced total (if applicable): Low $X / Mid $X / High $X
- GRAND TOTAL: Low $X / Mid $X / High $X

QUALITY GATE
- [ ] All economic figures sourced to records or expert
- [ ] Medical = amounts billed (firm rule)
- [ ] Future damages: discount rate / present value applied (if applicable)
- [ ] UJI elements checklist: [X of Y] elements addressed
- [ ] No invented numbers

OPEN ITEMS
- [VERIFY] / [VERIFY-CITE] / CITE NEEDED / PINPOINT NEEDED items

SA SAVE NOTES
- Category: Case Valuation
- Name: [Case Short Name] — Damages Analysis [Date]
```

### Math Rules
- Present math step-by-step in 3 lines or fewer: inputs, operation, result
- For longer models (life care plans, earning capacity), show core math
  and add `[MORE-ON-REQUEST]`
- Future damages: state whether present-value discount is applied and at
  what rate, or flag `[VERIFY]` if rate not provided

---

## MODE: DAMAGES-ARGUMENT

**Goal:** Draft BODY-ONLY damages argument sections for demand letters /
mediation statements.

### Inputs Required
- Completed DAMAGES analysis (or equivalent inputs)
- Case narrative facts (from CFP or user-provided)
- Target audience (demand letter, mediation statement, trial brief)

### Persuasion Framework (General Only)
Use general plaintiff-side persuasion frameworks:
- Themes: accountability, safety, before-vs-after, loss of normal life
- Future burden as time multiplier
- Credible anchoring with record support
- Sensory detail without embellishment
- Humanize the plaintiff without gratuitous sensitive detail

### Hard Limits
- Original wording; match certainty to sources; no new facts
- Client-centered, trauma-informed phrasing
- No invented quotes or "what the record says" fabrications

### Output Structure

```
ASSUMPTIONS & INPUTS
- [Case classification + key facts]

THEME OPTIONS (3-5)
1. [Theme name]: [1-2 sentence description]
2. [Theme name]: [1-2 sentence description]
...

DAMAGES STORY OUTLINE
- Before: [key life facts]
- Incident: [what happened — from record]
- After: [immediate impact — from record]
- Ongoing: [continuing impact — from record]
- Future: [projected impact — from record/expert]

BODY-ONLY NARRATIVE PARAGRAPHS
[Traditional paragraphs with topic sentences. BODY-ONLY format.
Every material fact tied to record cite. No filler.]

MISSING PROOF LIST
- [Fact that would strengthen damages] → proposed cure: [RFP/ROG/depo/expert]

QUALITY GATE + OPEN ITEMS
SA SAVE NOTES
```

---

## MODE: WD-ALLOCATE

**Goal:** Allocate a global settlement among multiple claimants in
wrongful death / loss of consortium scenarios with overlapping roles.

### Inputs Required
- Claimant list with roles (spouse, child, parent, LOC claimant)
- Each claimant's relationship to decedent/injured party
- Jury-value estimates per claimant (or inputs to calculate them)
- Gross settlement amount
- Fee structure (contingency %, costs, liens, tax considerations)

### Method (Required — Non-Negotiable)
Allocation based on **relative estimated jury awards**:
1. Estimate each claimant's jury-value total (WD share + consortium + other claims)
2. Convert totals to percentages of combined jury value
3. Apply percentages to **gross** settlement and **net** (after fees/costs/taxes/other)

### Output Structure

```
ASSUMPTIONS & INPUTS
- Settlement amount: $X (gross)
- Fee structure: [%] + costs [$X] + liens [$X]
- Net distributable: $X
- Claimants: [list with roles]

CLAIMANT JURY-VALUE TABLE
| Claimant | Role(s) | WD Share | LOC | Other Claims | Total Jury Value |
|----------|---------|----------|-----|--------------|-----------------|
| [Name] | [Role] | $X | $X | $X | $X |
| [Name] | [Role] | $X | $X | $X | $X |
| COMBINED | | | | | $X |

ALLOCATION TABLE
| Claimant | % of Combined | Gross Allocation | Net Allocation |
|----------|---------------|-----------------|----------------|
| [Name] | X% | $X | $X |
| [Name] | X% | $X | $X |
| TOTAL | 100% | $X | $X |

TOTALS CHECK
- Percentages sum: 100% [PASS/FAIL]
- Gross allocations sum: $X = $X settlement [PASS/FAIL]
- Net allocations sum: $X = $X distributable [PASS/FAIL]

OPEN ITEMS / CONFLICT FLAGS
- Probate requirements: [if applicable]
- Court approval: [if minors or incapacitated]
- Liens: [if unresolved]
- Tax considerations: [if applicable]
- Overlapping roles: [note any dual-role claimants]

QUALITY GATE
SA SAVE NOTES
```

---

## MODE: SETTLEMENT-EVAL

**Goal:** Expected settlement range (Low/Mid/High), recommended demand,
walk-away number.

### Inputs Required
- Case Group + Case Type (SA picklists)
- Venue/county (if known)
- Liability tier + comparative fault (if any)
- Policy limits / collectability notes
- Litigation stage (pre-suit / post-suit / mediation / trial track)
- DAMAGES range (or equivalent inputs)
- Outcomes Pack data (Excel upload or pasted comparable rows)

### Method
- Use Outcomes Pack comparables by case type + venue + severity + stage
- If data is thin, disclose and widen filters
- Apply risk/discount factors transparently:
  - Liability risk
  - Causation risk
  - Collectability / policy limits
  - Cap risk (med-mal, etc.)
  - Stage discount (pre-suit vs. trial-ready)
- Keep settlement evaluation **separate** from jury-value damages

### Output Structure

```
ASSUMPTIONS & INPUTS
- [Classification, venue, stage, liability, limits]

COMPARABLE CASES SUMMARY
- Filtered: [X] cases matching [criteria]
- Range: $X (low) — $X (high)
- Median: $X
- [If thin data: "Data limited; filters widened to [criteria]"]

RISK / DISCOUNT FACTORS
| Factor | Assessment | Impact |
|--------|-----------|--------|
| Liability | [Strong/Moderate/Weak] | [% discount or none] |
| Causation | [Direct/Contributing/Disputed] | [% discount or none] |
| Collectability | [Full limits/Partial/Unknown] | [cap at $X or none] |
| Cap risk | [Y/N — do not state cap unless verified] | [% discount or none] |
| Stage | [Pre-suit/Post-suit/Mediation/Trial] | [% discount or none] |

SETTLEMENT ANALYSIS
- Expected range: Low $X / Mid $X / High $X
  → Short "why" for each number
- Recommended demand: $X
  → Anchoring rationale: [explain]
- Walk-away number: $X
  → Floor rationale: [explain; incorporate client priorities if provided]

QUALITY GATE + OPEN ITEMS
SA SAVE NOTES
```

---

## MODE: OUTCOMES-EXTRACT

**Goal:** Extract one sanitized Outcomes Pack row from a demand letter,
mediation statement, or settlement memo.

### Inputs Required
- Uploaded document (PDF, Word, or pasted text)
- Outcomes Pack schema (column order — from `references/outcomes-schema.md`
  or user-provided)

### Output Structure

```
EXTRACTED ROW
[One row in exact Outcomes Pack column order, sanitized per redaction baseline]

MISSING FIELDS
| Field | Status | Likely Location |
|-------|--------|----------------|
| [Field name] | Missing | [Page X / section Y / not in document] |

[VERIFY] FLAGS
- Policy limits: [VERIFY]
- Comp fault: [VERIFY]
- Liens: [VERIFY]
- Fees/costs: [VERIFY]
```

---

## MODE: OUTCOMES-QA

**Goal:** QA an Outcomes Pack Excel upload for data quality issues.

### Inputs Required
- Outcomes Pack Excel file

### QA Checks

**Critical (must fix):**
- Missing required columns
- Uncontrolled Case Group / Case Type values
- Duplicate rows (same case appearing twice)
- Numeric fields with text or formatting errors
- Dates in wrong format

**Warning (should fix):**
- Outlier values (settlement amounts >3 SD from median for case type)
- Missing optional fields that would improve analysis
- Inconsistent naming (same case or party with different spellings)
- Stale data (cases >5 years old without context)

### Output Structure

```
QA FINDINGS
| # | Severity | Row(s) | Field | Issue | Proposed Fix |
|---|----------|--------|-------|-------|-------------|
| 1 | Critical | 12 | CaseType | "auto accident" not in controlled vocab | Change to "Motor Vehicle Collision" |
...

ADD TO CONTROLLED VOCAB
- [Only if a genuinely new, valid category is needed]

SUMMARY
- Critical: [X] findings
- Warning: [X] findings
- Proposed fixes: [X] total
```

---

## MODE: OUTCOMES-COMBINE

**Goal:** Merge multiple Outcomes Pack files into one consolidated pack.

### Inputs Required
- Two or more Outcomes Pack Excel files

### Method
1. Validate schemas match (or map columns if different versions)
2. Combine rows
3. Deduplicate (flag potential duplicates for user review)
4. Run OUTCOMES-QA on combined result
5. Output combined pack + dedup report

### Output Structure

```
COMBINE REPORT
- Source files: [list]
- Rows per source: [counts]
- Combined total: [X] rows
- Duplicates flagged: [X] (for user review)

DEDUP REPORT
| # | Row A (Source) | Row B (Source) | Match Basis | Action |
|---|---------------|---------------|-------------|--------|

QA ON COMBINED (abbreviated OUTCOMES-QA)

[Combined Excel file output]
```
