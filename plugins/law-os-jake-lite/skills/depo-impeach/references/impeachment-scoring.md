# DEPO-IMPEACH Reference: Impeachment Value Scoring

## Purpose

This reference defines the quantitative scoring system for evaluating impeachment
opportunities identified by DEPO-IMPEACH. The scoring system assigns a composite
numerical score to each contradiction across five weighted axes, enabling the
attorney to prioritize the most impactful impeachments and allocate limited trial
time effectively.

---

## 1. Five-Axis Scoring Framework

Each identified contradiction is scored on five axes:

| Axis | Weight | Range | What It Measures |
|------|--------|-------|------------------|
| **Severity** | 2x | 1-5 | How stark is the contradiction? |
| **Materiality** | 2x | 1-5 | How relevant to a case element? |
| **Source Reliability** | 1x | 1-5 | How reliable is the prior statement? |
| **Jury Impact** | 2x | 1-5 | How persuasive to a jury? |
| **Confrontation Feasibility** | 1x | 1-5 | How easy to present at trial? |

### Composite Score Formula

```
Score = (Severity x 2) + (Materiality x 2) + Source Reliability
        + (Jury Impact x 2) + Confrontation Feasibility

Maximum: 40 points
```

### Score Interpretation

| Score Range | Priority Level | Trial Recommendation |
|-------------|---------------|---------------------|
| 32-40 | **CRITICAL (P1)** | Must use at trial. Lead impeachment. Prepare visual aids. |
| 24-31 | **HIGH (P2)** | Strong impeachment. Include in cross-examination plan. |
| 16-23 | **MEDIUM (P3)** | Useful impeachment. Include if time permits. |
| 8-15 | **LOW (P4)** | Minor value. Use only as part of a pattern argument. |
| 1-7 | **MINIMAL (P5)** | Document but do not pursue at trial unless cumulative. |

---

## 2. Axis 1: Severity Score

How stark and clear is the contradiction?

| Score | Level | Definition | Example |
|-------|-------|------------|---------|
| 5 | DIRECT | Flat, irreconcilable contradiction | "I never saw him" vs. prior: "I spoke with him for 10 minutes" |
| 4 | MATERIAL-OMISSION | Key fact present in one source, absent in other | Failed to mention second vehicle in deposition; described it in interrogatories |
| 3 | QUALIFICATION | Unqualified statement now heavily qualified (or vice versa) | "I inspected" vs. "I briefly looked but didn't really inspect" |
| 2 | DEGREE | Same general fact, materially different degree | "About 30 mph" vs. "Maybe 50 mph" |
| 1 | DETAIL | Minor factual detail differs | "Blue car" vs. "dark car" |

### Severity Assessment Rules

- **Score 5** requires a direct, binary contradiction (X vs. not-X). Both
  statements cannot be true.
- **Score 4** requires a material fact, not just a minor detail. The omission
  must be significant enough that a reasonable person would have included it.
- **Score 3** requires that the qualification substantively changes the meaning.
  Minor hedging ("I think" added to an otherwise identical statement) may not
  rise to this level.
- **Score 2** requires that the degree difference is material to the case.
  Rounding or estimation variance does not qualify.
- **Score 1** is the default for any identified inconsistency not meeting
  higher criteria.

---

## 3. Axis 2: Materiality Score

How relevant is the contradicted fact to a case element?

| Score | Level | Definition | PCM Connection |
|-------|-------|------------|----------------|
| 5 | ELEMENT-CRITICAL | Directly affects a required element of a cause of action | Links to UNPROVEN element in PCM |
| 4 | CREDIBILITY-CRITICAL | Destroys or severely undermines overall witness credibility | Pattern of dishonesty across elements |
| 3 | SIGNIFICANT | Affects a contested factual issue material to the case | Important but not elemental |
| 2 | RELEVANT | Relates to a case issue but not a critical one | Supporting detail |
| 1 | PERIPHERAL | Tangentially related to the case | Background fact |

### NM Element Mapping for PI Cases

Connect materiality to specific New Mexico elements:

| Element Category | UJI/NMSA Reference | If Contradicted |
|-----------------|--------------------|--------------------|
| Duty of care | UJI 13-1601 | Score 5 if duty is contested |
| Breach | UJI 13-1602 | Score 5 (breach is almost always contested) |
| Causation | UJI 13-305 (proximate cause) | Score 5 if causation is disputed |
| Medical damages | UJI 13-1807 to 13-1812 | Score 4-5 depending on dispute level |
| Economic damages | UJI 13-1808 | Score 4-5 if wage loss contested |
| Comparative fault | NMSA 1978 Section 41-3A-1 | Score 4-5 if major defense argument |
| Premises notice | UJI 13-1312 | Score 5 if notice is a key issue |
| Product defect | UJI 13-1407 | Score 5 if defect is disputed |

---

## 4. Axis 3: Source Reliability Score

How reliable and impeachment-worthy is the prior statement source?

| Score | Source Category | Definition | Foundation Difficulty |
|-------|----------------|------------|---------------------|
| 5 | Sworn testimony | Prior deposition, trial testimony under oath | Low -- transcript is the evidence |
| 5 | Sworn discovery | Verified interrogatory answers, RFA admissions | Low -- signed under penalty of perjury |
| 4 | Signed documents | Affidavits, declarations, signed reports | Low-Medium -- witness signed it |
| 3 | Authored records | Emails, memos, medical records, business records | Medium -- authorship must be established |
| 2 | Third-party records | Incident reports, police reports (witness's statement paraphrased) | Medium-High -- may be contested as paraphrase |
| 1 | Informal statements | Social media, verbal statements documented by others | High -- witness may deny or claim out of context |

### Source Reliability Assessment Rules

- **Score 5** sources are the gold standard: sworn, signed, citable with
  exact references. The witness cannot credibly deny making the statement.
- **Score 4** sources are strong because the witness signed the document,
  but the statement was not under oath.
- **Score 3** sources are good because the witness authored the record, but
  the witness may argue the record was informal or incomplete.
- **Score 2** sources may involve paraphrasing by a third party (e.g., a
  police officer summarizing the witness's statement).
- **Score 1** sources face the most challenges: denial, context disputes,
  authentication difficulties.

---

## 5. Axis 4: Jury Impact Score

How persuasive would this impeachment be to a New Mexico jury?

| Score | Level | Definition | Jury Perception |
|-------|-------|------------|-----------------|
| 5 | Devastating | Jury will conclude witness is lying | "They caught them in a lie" |
| 4 | Significant | Jury will seriously question credibility | "That doesn't add up" |
| 3 | Noticeable | Jury will note the inconsistency | "That's a little different" |
| 2 | Subtle | Only attentive jurors will catch it | Requires explanation |
| 1 | Minimal | Unlikely to register with jury | "So what?" |

### Factors that INCREASE jury impact (+1 to score, capped at 5)

- The contradiction is simple and easy to understand
- It can be shown visually (side-by-side comparison exhibit)
- The witness was emphatic in both statements
- The topic is one jurors care about (safety, children, honesty)
- The contradiction reveals a self-serving motive
- The witness holds a position of trust (doctor, official, employer)

### Factors that DECREASE jury impact (-1 to score, minimum 1)

- The contradiction is technical or hard to explain
- It requires extensive context to understand
- The time gap between statements is large (memory naturally fades)
- The witness is sympathetic and the contradiction is understandable
- The examiner will appear to be bullying the witness
- The topic is boring or irrelevant to the jury

### NM Jury Considerations

- New Mexico jurors value honesty and directness
- Rural NM jurors may be more skeptical of corporate witnesses
- In medical malpractice: jurors may give doctors benefit of the doubt
  on minor inconsistencies
- In trucking/commercial vehicle cases: jurors expect accurate records
  and are suspicious of logbook or inspection record inconsistencies
- In premises liability: NM jurors expect property owners to know about
  dangerous conditions, making knowledge contradictions impactful

---

## 6. Axis 5: Confrontation Feasibility Score

How easy is it to present this impeachment effectively at trial?

| Score | Level | Definition | Practical Notes |
|-------|-------|------------|-----------------|
| 5 | Effortless | Clear prior statement, simple confrontation, no obstacles | Read it and the jury sees it |
| 4 | Straightforward | Minor logistics but no substantive barriers | Exhibit may need pre-marking |
| 3 | Moderate | Some complexity in presentation or foundation | Requires setup time at trial |
| 2 | Difficult | Foundation challenges, context complications, or hearsay issues | Sustained objection possible |
| 1 | Problematic | Major obstacles to admissibility or effectiveness | May not survive objection |

### Feasibility Factors

**Score 5:** The prior statement is written, authenticated, already in evidence
or stipulated, and the contradiction is self-evident.

**Score 4:** The document needs to be marked but is straightforward; foundation
requires only a few preliminary questions.

**Score 3:** The prior statement is embedded in a long document; or foundation
requires establishing a business records exception; or the contradiction
requires some explanation.

**Score 2:** The prior statement is a third-party paraphrase (hearsay concern);
or the witness may argue the statement was taken out of context; or a
sustained objection is plausible.

**Score 1:** The prior statement may be privileged; or extrinsic evidence is
needed but may be excluded; or the confrontation opens the door to harmful
redirect testimony.

---

## 7. Score Adjustments

### Pattern Bonus

When a witness has multiple contradictions forming a recognized pattern
(see methodology.md, Section 6), apply a pattern bonus:

| Pattern Size | Bonus per Contradiction | Rationale |
|-------------|------------------------|-----------|
| 2 contradictions in pattern | +2 | Coincidence becomes suspicious |
| 3-4 in pattern | +4 | Clear pattern of inconsistency |
| 5+ in pattern | +6 (cap total at 40) | Pervasive unreliability |

### Same-Side Conflict Bonus

When two witnesses from the same party contradict each other on the same topic:
- Add **+3** to each contradiction in the cross-witness pair
- Rationale: The opposing party cannot explain this as memory failure --
  at least one of their own witnesses is wrong

### Sympathy Deduction

When the witness is sympathetic (e.g., injured plaintiff, elderly witness):
- Subtract **1-2** from the Jury Impact axis score
- Rationale: Aggressive impeachment of a sympathetic witness can backfire
  with the jury
- This deduction is `[DECISION REQUIRED]` -- attorney must assess

### Recency Bonus

When the prior statement is very close in time to the deposition:
- Add **+1** to Source Reliability if prior statement was made within
  30 days of the deposition
- Rationale: Memory should be fresh; inconsistency is harder to explain

---

## 8. Composite Score Calculation Examples

### Example 1: High-Value Impeachment

**Contradiction:** Defendant denies receiving safety complaints in deposition,
but verified interrogatory answer lists specific complaints received.

| Axis | Assessment | Raw | Weight | Weighted |
|------|-----------|-----|--------|----------|
| Severity | DIRECT -- flat denial vs. prior admission | 5 | x2 | 10 |
| Materiality | ELEMENT-CRITICAL -- notice element (NEG-BREACH-002) | 5 | x2 | 10 |
| Source Reliability | Sworn interrogatory (DPB Set1/Rog#8) | 5 | x1 | 5 |
| Jury Impact | Devastating -- simple, clear contradiction on safety | 5 | x2 | 10 |
| Confrontation Feasibility | Effortless -- signed interrogatory in evidence | 5 | x1 | 5 |
| **Composite** | | | | **40/40** |

**Priority: CRITICAL (P1).** Must use at trial. Prepare side-by-side exhibit.

### Example 2: Medium-Value Impeachment

**Contradiction:** Witness estimates speed at "about 45 mph" in deposition;
police report records witness as saying "approximately 30 mph."

| Axis | Assessment | Raw | Weight | Weighted |
|------|-----------|-----|--------|----------|
| Severity | DEGREE -- 30 vs. 45 mph | 2 | x2 | 4 |
| Materiality | SIGNIFICANT -- relevant to causation analysis | 3 | x2 | 6 |
| Source Reliability | Police report (paraphrased by officer) | 2 | x1 | 2 |
| Jury Impact | Noticeable -- speed difference is understandable to jurors | 3 | x2 | 6 |
| Confrontation Feasibility | Moderate -- need to establish witness made the statement | 3 | x1 | 3 |
| **Composite** | | | | **21/40** |

**Priority: MEDIUM (P3).** Include if time permits. More valuable as part of
a broader inaccuracy pattern.

### Example 3: Low-Value Impeachment

**Contradiction:** Witness says "Tuesday" in deposition; email says "Wednesday."

| Axis | Assessment | Raw | Weight | Weighted |
|------|-----------|-----|--------|----------|
| Severity | DETAIL -- day of week differs | 1 | x2 | 2 |
| Materiality | PERIPHERAL -- meeting day not relevant to any element | 1 | x2 | 2 |
| Source Reliability | Email authored by witness | 3 | x1 | 3 |
| Jury Impact | Minimal -- jurors won't care about the day | 1 | x2 | 2 |
| Confrontation Feasibility | Straightforward -- email in evidence | 4 | x1 | 4 |
| **Composite** | | | | **13/40** |

**Priority: LOW (P4).** Document but do not pursue unless part of a pattern.

---

## 9. Foundation Cost Assessment

Each impeachment has a "foundation cost" -- the time and steps required to
properly impeach at trial:

| Foundation Step | Time Estimate | Required? |
|----------------|--------------|-----------|
| Commit witness to deposition testimony | 1-2 minutes | Always |
| Credit the prior statement source | 1-3 minutes | For extrinsic evidence |
| Confront with the prior statement | 2-5 minutes | Always (the impeachment itself) |
| Offer extrinsic evidence (if witness denies) | 3-10 minutes | Only if witness denies |
| Argue admissibility (if objection) | 2-5 minutes | Only if objected to |

**Total estimated time per impeachment: 5-25 minutes**

### Time Budget by Score

| Score Range | Impeachments to Budget | Estimated Time Each | Total Allocation |
|-------------|----------------------|--------------------|-----------------|
| CRITICAL (32-40) | Use all | 10-15 min | As needed |
| HIGH (24-31) | Use all if time allows | 8-12 min | Significant |
| MEDIUM (16-23) | Select best 2-3 | 5-8 min | Moderate |
| LOW (8-15) | Only for pattern | 2-3 min each in group | Minimal |

---

## 10. Strategic Considerations

### Impeachment vs. Admission Priority

When testimony contains both an admission (favorable) and an impeachment
opportunity (inconsistency) on the same topic:

1. **Lead with the admission** -- get the favorable fact on the record
2. **Impeach on a different topic** -- undermine credibility elsewhere
3. **Do not impeach the admission** -- you already have the favorable answer

### Recommended Trial Sequencing

| Position | Which Impeachment | Rationale |
|----------|-------------------|-----------|
| Open cross | Medium-strength (P2-P3) | Establishes control; signals more to come |
| Build | Pattern impeachments | Cumulative effect builds credibility attack |
| Climax | Strongest (P1 CRITICAL) | Maximum impact at attention peak |
| Close | Second-strongest (P1-P2) | Strong final impression for jury |

### When NOT to Pursue Scored Impeachments

Even high-scoring impeachments should be reconsidered when:

- The witness already conceded the point (no need to impeach)
- The impeachment will open the door to harmful redirect testimony
- The cumulative cross-examination time exceeds what the judge will allow
- The contradiction has been adequately addressed through other evidence
- Attorney strategic judgment overrides the scoring system

All scoring is advisory. Flag: `[DECISION REQUIRED]` for final attorney review.
