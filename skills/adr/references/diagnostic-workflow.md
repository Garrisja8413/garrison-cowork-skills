# ADR Diagnostic Workflow — Reference

Read this file when running FULL DIAGNOSTIC or MATRIX ONLY mode.

## Step 1: Build Paragraph Comparison Map

Before any analysis, create a structural map:

```
For each Complaint ¶:
  → Find the corresponding Answer ¶ (by number or cross-reference)
  → Classify the Answer's response type (see taxonomy below)
  → If no corresponding Answer ¶ exists → flag ADMIT-DEFAULT
```

### Response Type Taxonomy

| Code | Response Pattern | Example Language |
|------|-----------------|------------------|
| `ADMIT` | Full admission | "Admitted." / "Defendant admits the allegations in ¶X." |
| `DENY` | Full specific denial | "Denied." (with substantive basis) |
| `ADMIT-PART` | Partial admission | "Defendant admits [X] but denies [Y]." |
| `LKI` | Lacks knowledge or information | "Defendant lacks knowledge or information sufficient to form a belief..." |
| `BLANKET` | General/blanket denial | "Denied" applied to multi-fact paragraphs without distinguishing parts |
| `EVASIVE` | Qualified / evasive | "To the extent ¶X alleges...", "Defendant is without sufficient knowledge to the extent..." |
| `REFER` | Refers to document | "The document speaks for itself" / "Defendant refers to [document]..." |
| `LEGAL-CONCLUSION` | Denies as legal conclusion | "¶X states legal conclusions to which no response is required." |
| `NO-RESPONSE` | Silent / no corresponding ¶ | No answer paragraph addresses this complaint ¶ |
| `MIXED` | Multiple response types in one ¶ | Admits some, denies some, LKI on others |

---

## Step 2: Denial Defect Classification

For each non-ADMIT response, apply these tests in order:

### Test 2A: Silence / No Response (NMRA 1-008(D))

**Rule:** Averments in a pleading to which a responsive pleading is required
are admitted when not denied in the responsive pleading. [VERIFY-CITE]

**Check:** Does the Answer address every Complaint ¶ that requires a response?

**If ¶ is unanswered:**
- Flag: `ADMIT-DEFAULT`
- Record: Complaint ¶ number + Answer gap
- Proposed remedy: Deem admitted; cite in future MSJ or at trial

---

### Test 2B: General/Blanket Denial (NMRA 1-008(B))

**Rule:** When a pleader intends in good faith to deny only a part of an
averment, the pleader shall specify so much of it as is true and deny
the remainder. A denial shall fairly meet the substance of the averments
denied. [VERIFY-CITE]

**Check:** Does the denial address the specific factual assertions in the ¶?

**Indicators of blanket denial:**
- Multi-fact ¶ receives a single-word "Denied"
- No distinction between admitted and denied portions
- Formulaic language applied identically to factually distinct ¶s

**If blanket denial found:**
- Flag: `BLANKET-DENIAL`
- Record: Complaint ¶ (noting which sub-facts are likely undisputable)
- Analysis: Identify which portions should be admitted under 1-008(B)

---

### Test 2C: Improper "Lacks Knowledge" Denial (NMRA 1-008(B))

**Rule:** A party may state that the party is without knowledge or information
sufficient to form a belief as to the truth of an averment — and this has
the effect of a denial. But this response is improper when the facts are
plainly within the party's control or accessible through reasonable inquiry.
[VERIFY-CITE]

**Check:** Could the defendant reasonably know or determine this fact?

**Indicators of improper LKI:**
- Facts about defendant's own conduct, employees, or records
- Facts from documents the defendant authored or received
- Facts from events where defendant was present
- Publicly available facts (date of incident, location, etc.)
- Facts defendant admits elsewhere in the Answer or affirmative defenses

**If improper LKI found:**
- Flag: `LKI-IMPROPER`
- Record: Complaint ¶ + why facts are within defendant's control
- Cross-check: Does this also implicate NMRA 1-011 (lack of reasonable inquiry)?

---

### Test 2D: Evasive / Qualified Denial

**Rule:** An evasive or incomplete denial has the same effect as a failure
to deny — the averment is treated as admitted. [VERIFY-CITE]

**Check:** Does the denial actually deny the factual assertion, or does it
avoid answering while appearing to respond?

**Indicators of evasive denial:**
- "To the extent that ¶X alleges [recharacterization], Defendant denies..."
- "Defendant denies ¶X as stated" (without saying what is actually denied)
- "The document speaks for itself" (avoids admitting or denying facts)
- "Defendant is without sufficient knowledge to the extent that..."
- Conditional language that sidesteps the core assertion

**If evasive denial found:**
- Flag: `EVASIVE`
- Record: Complaint ¶ + specific evasive language
- Analysis: Identify what remains undenied → candidate for deemed admission

---

### Test 2E: Failure to Admit Undisputed Portions (NMRA 1-008(B))

**Rule:** The duty to admit what is true and deny only the remainder. [VERIFY-CITE]

**Check:** Are there factual components in the ¶ that are plainly undisputable
(dates, locations, document existence) that the defendant fails to admit?

**If failure found:**
- Flag: `PARTIAL-ADMIT-NEEDED`
- Record: Complaint ¶ + specific undisputable sub-facts
- Analysis: These are strong candidates for deemed-admitted treatment

---

### Test 2F: Internal Inconsistency (Denial vs. Affirmative Defense)

**Check:** Does any denial contradict a position taken in an affirmative defense?

**Examples:**
- Denies involvement but raises comparative fault defense
- Denies the contract existed but raises statute of frauds defense
- Denies knowledge of condition but raises assumption of risk

**If inconsistency found:**
- Flag: `INTERNAL-CONFLICT`
- Record: Denial ¶ + conflicting affirmative defense number
- Analysis: Candidate for strike or partial judgment

---

## Step 3: Affirmative Defense Analysis

For each numbered affirmative defense:

### Test 3A: Factual Sufficiency (NMRA 1-008(A))

**Rule:** Affirmative defenses must contain a short and plain statement of
the claim/defense showing the pleader is entitled to relief/defense. [VERIFY-CITE]

**Check:** Does the defense state facts, or is it a bare legal label?

**Boilerplate indicators:**
- Single sentence restating a legal doctrine with no supporting facts
- Identical language that could apply to any case
- No reference to this defendant, this incident, or this plaintiff
- "Laundry list" of 10+ defenses with no factual grounding

**If boilerplate found:**
- Flag: `BOILERPLATE`
- Record: Defense number + text
- Analysis: Fails to provide notice; candidate for 1-012(F) strike

---

### Test 3B: Heightened Specificity Requirements (NMRA 1-009)

**Rule:** In all averments of fraud or mistake, the circumstances constituting
fraud or mistake shall be stated with particularity. [VERIFY-CITE]

**Check:** Do any defenses require heightened specificity?

**Defenses requiring specificity:**
- Fraud (contributory fraud, fraud in the inducement)
- Mistake
- Conditions precedent (1-009(C)) [VERIFY-CITE]
- Any defense with a particularity requirement under NM law

**If specificity failure found:**
- Flag: `SPECIFICITY-FAIL`
- Record: Defense number + missing specifics

---

### Test 3C: Improper Reservations & Strikeable Matter (NMRA 1-012(F))

**Rule:** The court may order stricken any insufficient defense or any
redundant, immaterial, impertinent, or scandalous matter. [VERIFY-CITE]

**Check for:**
- "Reserves the right to amend or add defenses" → improper; not a defense
- Redundant defenses (same theory stated multiple times)
- Immaterial defenses (inapplicable to this case type)
- Impertinent or scandalous allegations
- "Catch-all" defenses with no relationship to the claims

**If strikeable matter found:**
- Flag: `IMPROPER-RESERVATION`, `REDUNDANT-IMMATERIAL`, or `SCANDALOUS`
- Record: Defense number + specific text

---

### Test 3D: Certification Failure (NMRA 1-011)

**Rule:** By presenting a pleading, an attorney certifies that to the best
of the attorney's knowledge, information, and belief, formed after
reasonable inquiry: (1) it is not presented for improper purpose;
(2) the claims/defenses are warranted by existing law or nonfrivolous
argument; (3) factual contentions have or will likely have evidentiary
support; (4) denials are warranted on the evidence or reasonably based
on lack of information. [VERIFY-CITE]

**Check:** Do any denials or defenses appear to lack any reasonable basis?

**Certification red flags:**
- Denying facts admitted in other filings or discovery
- Asserting defenses foreclosed by binding precedent
- Pattern of blanket denials suggesting no review of the complaint
- Contradictory positions not justified by alternative pleading

**If certification failure suspected:**
- Flag: `CERT-FAILURE`
- Record: Specific ¶s or defenses + basis for concern
- Analysis: Outline sanctions pathway including 1-011 safe-harbor steps
- Note: `[DECISION REQUIRED]` — sanctions is a strategic choice for senior attorney

---

## Step 4: Cross-Reference and Conflict Detection

After all individual tests:

1. **Cross-check denials against affirmative defenses** for logical conflicts
2. **Cross-check LKI responses against defendant's own exhibits/discovery**
   (if available) for knowledge the defendant demonstrably has
3. **Group related defects** — a pattern of blanket denials across many ¶s is
   stronger than a single instance
4. **Prioritize** — rank defects by:
   - Strength of authority
   - Impact on case (does this defect affect a key element?)
   - Likelihood of success on the remedy
   - Cost/effort of pursuing the remedy

---

## Step 5: Populate Defect Matrix

Output the Defect Matrix table (schema in `references/deliverables.md`).
Every row must have:
- A Complaint ¶ or defense number (record cite)
- A defect category (from the flags above)
- An NMRA rule + pin cite or `[VERIFY-CITE]`
- A proposed remedy
- A priority rank (Critical / High / Medium / Low)
