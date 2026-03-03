# DEPO-INDEX Reference: Cross-Reference Protocol

## Purpose

This reference defines the protocol for cross-referencing deposition testimony
against CFP (Case Fact Pack) facts, DPB (Discovery Pack) responses, PCM
(Proof of Claims Matrix) elements, and other deposition transcripts. Cross-
referencing transforms a standalone transcript index into an integrated
litigation resource that reveals consistencies, contradictions, and proof gaps.

---

## 1. Cross-Reference Overview

### What Gets Cross-Referenced

```
Deposition Testimony
  ├── vs. CFP Facts (confirmed? contradicted? new information?)
  ├── vs. DPB Discovery Responses (consistent? inconsistent?)
  ├── vs. PCM Elements (which elements does testimony support?)
  ├── vs. Other DEPO-INDEX outputs (cross-witness consistency?)
  └── vs. Documents/Exhibits (authenticated? contradicted?)
```

### When Cross-Referencing Occurs

Cross-referencing is the final pass in the indexing methodology (see
`methodology.md`, Step 5). It requires at minimum the CFP PACKET. Additional
cross-references are available when DPB, PCM, and prior DEPO-INDEX outputs
are provided.

---

## 2. CFP Cross-Reference Protocol

### Process

For each indexed testimony entry:

1. **Identify related CFP facts.** Compare the testimony subject matter against
   CFP facts. A CFP fact is "related" if it addresses the same event, condition,
   person, document, or time period as the testimony.

2. **Classify the relationship.** For each related CFP fact, determine:

   | Classification | Definition | Notation |
   |----------------|------------|----------|
   | `CONFIRMS` | Testimony is consistent with and supports the CFP fact | CFP Fact#[N] - CONFIRMS |
   | `CONTRADICTS` | Testimony is inconsistent with the CFP fact | CFP Fact#[N] - CONTRADICTS |
   | `EXPANDS` | Testimony adds new detail not in CFP | CFP Fact#[N] - EXPANDS |
   | `QUALIFIES` | Testimony agrees with CFP fact but adds qualification or limitation | CFP Fact#[N] - QUALIFIES |
   | `NEW` | Testimony introduces information not in any CFP fact | NEW - [brief description] |

3. **Record in Cross-Reference Table.** Every related pair (testimony entry +
   CFP fact) gets a row in the Cross-Reference Table.

### CFP Cross-Reference Table Format

```markdown
| Page:Line | Testimony Summary | CFP Fact# | Classification | Notes |
|-----------|-------------------|-----------|----------------|-------|
| 45:12-46:3 | Witness states speed was 45 mph | Fact#12 | CONFIRMS | CFP: "Vehicle traveling approx. 45 mph" |
| 52:8-15 | Witness denies seeing stop sign | Fact#18 | CONTRADICTS | CFP: "Stop sign visible from 200 feet" |
| 67:1-68:4 | Witness describes second impact | -- | NEW | Not in CFP; potential Delta Request |
```

### Handling NEW Testimony

When testimony introduces facts not present in any CFP entry:

1. Tag the entry as `NEW` in the cross-reference table
2. Note: "Potential CFP Delta Request" — this testimony may warrant adding
   a new fact to the CFP
3. Do not create the CFP Delta Request directly; flag it in Open Items for
   the attorney to route to CFP BUILDER

### Handling CONTRADICTS Classifications

When testimony contradicts a CFP fact:

1. Record the contradiction with exact quotes from both sources
2. Flag the entry with `INCONSISTENCY-DOCUMENT` if the CFP fact is based on
   a document, or note the CFP source
3. Assess whether the contradiction is:
   - **Material:** Affects an element of a claim -> flag for DEPO-IMPEACH
   - **Immaterial:** Minor detail difference -> note but do not escalate
4. Do not resolve the contradiction. The index records both positions neutrally.
   Resolution belongs to the attorney and downstream skills.

---

## 3. DPB Cross-Reference Protocol

### Process

For each indexed testimony entry, compare against DPB discovery responses
from the same witness's party:

1. **Identify related DPB responses.** Match by subject matter:
   - Interrogatory answers addressing the same topics as testimony
   - RFA responses on facts the witness testified about
   - RFP responses regarding documents discussed in testimony

2. **Classify the relationship:**

   | Classification | Definition | Notation |
   |----------------|------------|----------|
   | `CONSISTENT` | Testimony matches the discovery response | DPB [SetID/ReqNum] - CONSISTENT |
   | `INCONSISTENT` | Testimony differs from the discovery response | DPB [SetID/ReqNum] - INCONSISTENT |
   | `SUPPLEMENTAL` | Testimony provides information beyond the discovery response | DPB [SetID/ReqNum] - SUPPLEMENTAL |
   | `CONTRADICTS-SWORN` | Testimony contradicts a verified/sworn response | DPB [SetID/ReqNum] - CONTRADICTS-SWORN |

3. **Record in Cross-Reference Table.**

### DPB Cross-Reference Table Format

```markdown
| Page:Line | Testimony Summary | DPB Ref (SetID/ReqNum) | Classification | Notes |
|-----------|-------------------|-----------------------|----------------|-------|
| 34:5-12 | Witness says inspection was monthly | Set1/Rog#5 | INCONSISTENT | Rog answer: "weekly inspections" |
| 55:18-56:2 | Witness identifies 3 witnesses | Set1/Rog#8 | SUPPLEMENTAL | Rog listed 2 witnesses; testimony adds 1 |
| 78:1-15 | Witness denies receiving complaint | Set2/RFA#12 | CONTRADICTS-SWORN | RFA admitted receipt of complaint |
```

### Severity of DPB Inconsistencies

| Source Type | Severity | Rationale |
|-------------|----------|-----------|
| Verified interrogatory answer | HIGH | Sworn and signed by party; inconsistency is under oath |
| RFA response (admitted) | CRITICAL | RFA admission is binding; contradiction is extraordinary |
| RFA response (denied) | MEDIUM | Denial may be legitimately different from testimony |
| RFP objection/response | LOW-MEDIUM | Objections may not directly conflict with testimony |
| Privilege log entry | VARIES | Compare what was logged vs. what was disclosed in testimony |

### CONTRADICTS-SWORN Flag

When testimony contradicts a **sworn** discovery response (verified
interrogatory answer or RFA admission), this is the most powerful
impeachment material:

1. Flag the index entry with `INCONSISTENCY-DISCOVERY`
2. Record as `CONTRADICTS-SWORN` in the DPB cross-reference
3. Include verbatim quotes from both the testimony and the discovery response
4. Flag in Open Items: "High-value impeachment: [Page:Line] vs [DPB ref]"
5. This entry will be prioritized by DEPO-IMPEACH

---

## 4. PCM Element Cross-Reference Protocol

### Process

When PCM data is available, map testimony entries to the legal elements
they support or undermine:

1. **For each indexed entry,** determine which PCM Element_ID(s) the
   testimony addresses. A testimony entry "addresses" an element if it
   provides evidence relevant to proving or disproving that element.

2. **Classify the support:**

   | Classification | Definition |
   |----------------|------------|
   | `SUPPORTS` | Testimony provides evidence supporting the element |
   | `UNDERMINES` | Testimony provides evidence against the element |
   | `NEUTRAL` | Testimony addresses the element but neither supports nor undermines |

3. **Record the Element_ID** in the Topic Index table's Element_ID column.

### Element Mapping Table

```markdown
| Page:Line | Topic Tag | Element_ID | Support | PCM Status Before | Notes |
|-----------|-----------|------------|---------|-------------------|-------|
| 45:12-46:3 | LIABILITY-DUTY | NEG-DUTY-001 | SUPPORTS | FACTS-ONLY | Strong duty testimony |
| 52:8-15 | LIABILITY-BREACH | NEG-BREACH-001 | UNDERMINES | UNPROVEN | Witness denies breach |
| 67:1-68:4 | LIABILITY-CAUSE | NEG-CAUSE-001 | SUPPORTS | UNPROVEN | Establishes causal sequence |
```

### PCM Status Update Recommendations

After indexing, the element mapping may suggest PCM status updates:

| Current Status | Testimony Effect | Recommended Action |
|----------------|------------------|--------------------|
| UNPROVEN | Strong supporting testimony | Recommend: "Consider upgrading to FACTS-ONLY" |
| FACTS-ONLY | Additional testimony support | Recommend: "Consider upgrading to PROVEN" |
| PROVEN | Contradicting testimony | Flag: "PROVEN status at risk — contradicting testimony at [Page:Line]" |
| CONCEDED | Witness retracts concession | Flag: "CONCEDED status at risk — retraction at [Page:Line]" |

**Important:** DEPO-INDEX does not modify the PCM. It recommends status
updates. The attorney or PCM BUILDER skill handles actual updates.

---

## 5. Cross-Witness Consistency Protocol

### When Multiple DEPO-INDEX Outputs Are Available

If prior DEPO-INDEX outputs from other witnesses in the same case are
provided, perform cross-witness consistency analysis:

1. **Identify overlapping topics.** Find topic tags that appear in both
   the current index and prior indexes.

2. **Compare testimony on overlapping topics:**

   | Comparison Result | Classification | Notes |
   |-------------------|----------------|-------|
   | Same facts, same details | `CORROBORATES` | Strengthens the fact |
   | Same facts, different details | `DIFFERS-DETAIL` | Minor but notable |
   | Different accounts of same event | `CONFLICTS` | Material inconsistency between witnesses |
   | One witness adds information | `SUPPLEMENTS` | Additional information from new witness |

3. **Record in a Cross-Witness Table** (appended to Cross-Reference Table):

```markdown
### Cross-Witness Consistency

| This Witness (Page:Line) | Other Witness (Name, Page:Line) | Topic | Comparison | Notes |
|--------------------------|--------------------------------|-------|------------|-------|
| 45:12-46:3 | J. Smith, 23:5-10 | Timeline | CORROBORATES | Both place event at 3 PM |
| 52:8-15 | J. Smith, 34:1-6 | Breach | CONFLICTS | Smith says inspection done; this witness says not |
```

### Cross-Witness Conflict Escalation

When witnesses from the **same side** conflict:
- Flag as `[DECISION REQUIRED: Same-side witness conflict]`
- This suggests a credibility problem or witness preparation gap
- Downstream: MURDER-BOARD will assess this vulnerability

When witnesses from **opposing sides** conflict:
- This is expected; record neutrally
- Flag material conflicts for DEPO-IMPEACH
- Downstream: CLOSING-ARGUMENT will use to argue credibility

---

## 6. Exhibit Cross-Reference Protocol

### Tracking Exhibits in Testimony

For every exhibit referenced during the deposition:

1. **Record when marked:** Note the page:line where the exhibit was marked
   for identification (e.g., "Exhibit 3 marked at 45:1")

2. **Record when discussed:** Note every page:line range where the exhibit
   is discussed or questioned about

3. **Record authentication status:**

   | Status | Definition |
   |--------|------------|
   | `AUTHENTICATED` | Witness identified document, confirmed authorship/receipt/accuracy |
   | `PARTIALLY-AUTHENTICATED` | Witness identified some aspects but not all |
   | `DISPUTED` | Witness challenges authenticity, accuracy, or completeness |
   | `NOT-AUTHENTICATED` | Exhibit shown but witness could not authenticate |
   | `OBJECTION-PENDING` | Objection to exhibit sustained or taken under advisement |

4. **Cross-reference to CFP documents:** If the exhibit corresponds to a
   document in the CFP, note the CFP document reference

### Exhibit Reference Log Format

```markdown
| Exhibit # | Description | Marked (Page:Line) | Discussed (Page:Line) | Auth Status | CFP Doc Ref |
|-----------|-------------|--------------------|-----------------------|-------------|-------------|
| Ex. 1 | Police report | 25:1 | 25:3-28:15 | AUTHENTICATED | CFP Doc#3 |
| Ex. 2 | Email chain | 42:1 | 42:3-45:22; 78:1-80:5 | PARTIALLY-AUTH | CFP Doc#7 |
| Ex. 3 | Inspection log | 55:1 | 55:3-58:10 | DISPUTED | CFP Doc#12 |
```

---

## 7. Cross-Reference Quality Standards

### Completeness Requirements

| Cross-Reference Type | Required When | Completeness Standard |
|---------------------|---------------|----------------------|
| CFP cross-ref | CFP PACKET provided | Every testimony entry on a factual topic must be checked against CFP |
| DPB cross-ref | DPB provided | Every testimony entry must be checked against relevant DPB responses |
| PCM element mapping | PCM provided | Every entry with a liability/damages tag must have Element_ID |
| Cross-witness | Prior DEPO-INDEX provided | Overlapping topics must be compared |
| Exhibit log | Exhibits in transcript | Every exhibit referenced must be logged |

### Accuracy Standards

1. **No false cross-references.** Do not force a cross-reference where the
   connection is speculative. If uncertain, flag `[CROSS-REF-NEEDED]` rather
   than asserting a match.

2. **No missed critical cross-references.** ADMISSION, DENIAL, and
   INCONSISTENCY entries must always have cross-references (to CFP and/or DPB).
   A flagged entry without a cross-reference is incomplete.

3. **Verbatim accuracy.** When quoting both the testimony and the CFP/DPB
   source, both must be verbatim. No paraphrasing.

### Gate Check: Cross-Reference Coverage

The Cross-Reference Coverage gate evaluates:

- **PASS:** All flagged entries (ADMISSION, DENIAL, INCONSISTENCY-*) have
  cross-references to CFP and/or DPB. All exhibits are logged. Element mapping
  covers all tagged entries when PCM is available.
- **FAIL:** Flagged entries without cross-references, or exhibits not logged.
  List specific gaps.

---

## 8. Cross-Reference and NM Law Considerations

### Prior Inconsistent Statement Foundation (NMRA 11-613)

When the cross-reference identifies an INCONSISTENCY-DISCOVERY or
INCONSISTENCY-DOCUMENT, note the foundation requirements for using this
at trial in NM:

1. Witness must be given opportunity to explain or deny (NMRA 11-613(B))
2. Opposing party must have opportunity to examine (NMRA 11-613(B))
3. Extrinsic evidence is admissible if conditions met (NMRA 11-613(B))

**Note in the cross-reference:** "Foundation for impeachment under NMRA 11-613
requires opportunity to explain. Ensure deposition record includes confrontation
or preserve for trial."

### Party Admission (NMRA 11-801(D)(2))

When the cross-reference identifies testimony by a party or party agent that
constitutes an admission:
- The admission is admissible as a non-hearsay statement under NMRA 11-801(D)(2)
- No foundation required beyond establishing the speaker was the party or agent
- Note: "Usable at trial as party admission — NMRA 11-801(D)(2)"

### 30(b)(6) Organizational Admission

When indexing a 30(b)(6) deposition:
- The designee's testimony binds the organization
- Cross-references should note: "Organizational admission — binding on [Org Name]"
- These admissions are exceptionally powerful and should be highlighted
- NM courts follow the federal standard on binding effect of 30(b)(6) testimony
