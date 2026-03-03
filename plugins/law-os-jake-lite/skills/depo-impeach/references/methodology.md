# DEPO-IMPEACH Reference: Contradiction Detection and Prior Inconsistent Statement Analysis

## Purpose

This reference defines the methodology for detecting contradictions between
deposition testimony and prior statements, analyzing the nature and severity
of each inconsistency, and preparing prior inconsistent statement impeachment
strategies. It covers the systematic comparison process, contradiction
classification, foundation requirements under NM and federal rules, and
the commit-credit-confront examination technique.

---

## 1. Contradiction Detection Process

### Overview

DEPO-IMPEACH performs a systematic, multi-source comparison of deposition
testimony against all available prior statements. The process is:

```
DEPO-INDEX Output (indexed testimony)
  |-- Compare vs. DPB Discovery Responses (sworn statements)
  |-- Compare vs. CFP Documents (written records)
  |-- Compare vs. Prior DEPO-INDEX Outputs (prior testimony)
  |-- Compare vs. Internal Testimony (self-contradiction within depo)
  +-- Compare vs. Public Records / Social Media (if provided)
```

### Step-by-Step Detection Protocol

**Step 1: Ingest DEPO-INDEX Output**

Load the indexed deposition transcript. Focus on entries flagged as:
- `DENIAL` -- Witness denies facts we allege
- `EVASION` -- Witness is evasive (may be hiding inconsistency)
- `INCONSISTENCY-INTERNAL` -- Already identified self-contradiction
- `INCONSISTENCY-DISCOVERY` -- Already identified discovery contradiction
- `INCONSISTENCY-DOCUMENT` -- Already identified document contradiction
- `LOCK-DOWN` -- Firm commitments to check against prior statements
- `ADMISSION` -- Even admissions may contradict prior denials

**Step 2: Load Prior Statement Sources**

Compile all available prior statements by source reliability:

| Source Type | Provenance | Reliability |
|-------------|------------|-------------|
| Sworn interrogatory answers | DPB (verified, signed under oath) | Highest -- sworn and signed |
| RFA admissions | DPB (binding admissions) | Highest -- judicial admissions |
| RFA denials | DPB (sworn) | High -- but less binding than admissions |
| Prior deposition testimony | Prior DEPO-INDEX output | High -- under oath, page:line citable |
| Signed declarations/affidavits | CFP documents | High -- under oath |
| Written reports by witness | CFP documents | Medium-High -- authored by witness |
| Emails/letters by witness | CFP documents | Medium -- not sworn but authored |
| Medical records by witness | CFP documents | Medium-High -- business records |
| Social media posts | Provided separately | Medium -- public statements |
| Incident reports | CFP documents | Medium -- contemporaneous records |
| Police report statements | CFP documents | Medium -- may be paraphrased by officer |
| Witness statements to insurance | CFP documents | Medium -- often recorded or signed |

**Step 3: Systematic Comparison**

For each DEPO-INDEX entry, compare against each prior statement source
on the **same topic**:

```
For each testimony entry T in DEPO-INDEX:
  For each prior statement P addressing the same topic:
    Compare T and P:
      If T directly contradicts P -> Flag as DIRECT contradiction
      If T omits something P stated -> Flag as MATERIAL-OMISSION
      If T qualifies what P stated without qualification -> Flag as QUALIFICATION
      If T states the same thing but to a different degree -> Flag as DEGREE
      If T states a different timeline -> Flag as TIMELINE
      If T differs on a minor detail -> Flag as DETAIL
      If T is consistent with P -> Note as CONSISTENT (no flag)
```

**Step 4: Verify Each Potential Contradiction**

Before recording a contradiction, verify:

1. **Is the comparison fair?** Are both statements addressing the same topic,
   time period, and subject? A witness may legitimately give different testimony
   about different events.

2. **Is context accounted for?** Does the full context of either statement
   change the meaning? Flag context-sensitive contradictions as
   `[CONTEXT-SENSITIVE]` rather than asserting a flat contradiction.

3. **Is the prior statement accurately quoted?** Verify the verbatim quote
   against the source document. Misquotation is a professional ethics violation.

4. **Is the testimony accurately quoted?** Verify the verbatim quote against
   the DEPO-INDEX entry, which itself must match the transcript.

**Step 5: Classify and Score**

For each verified contradiction:
1. Assign a **Severity** classification (see Section 2)
2. Assign a **Materiality** rating (see Section 2)
3. Calculate an **Impeachment Score** (see `impeachment-scoring.md`)
4. Determine **Foundation Requirements** (see Section 4)

---

## 2. Contradiction Classification

### Severity Scale

| Severity | Definition | Example | Impeachment Power |
|----------|------------|---------|-------------------|
| `DIRECT` | Flat contradiction -- says X now, said Y before | "I never saw the sign" vs. prior: "I saw the sign" | Devastating |
| `MATERIAL-OMISSION` | Omits key fact previously stated, or states new fact previously omitted | Fails to mention second vehicle now; mentioned it in Rog answer | Strong |
| `QUALIFICATION` | Previously stated without qualification, now qualifies heavily | "I inspected" (then) vs. "I briefly looked but didn't really inspect" (now) | Moderate-Strong |
| `DEGREE` | Same general statement but materially different on degree/extent | "I was going about 30 mph" (then) vs. "maybe 45 mph" (now) | Moderate |
| `TIMELINE` | Different dates, times, or sequence of events | "It happened at 3 PM" (then) vs. "around 5 PM" (now) | Varies |
| `DETAIL` | Minor factual detail differs | "Blue car" (then) vs. "dark-colored car" (now) | Low individually |

### Materiality Rating

| Rating | Definition | Trial Impact |
|--------|------------|-------------|
| `ELEMENT-CRITICAL` | Contradiction directly affects a required element of a claim | May be dispositive of an element |
| `CREDIBILITY-CRITICAL` | Contradiction destroys overall witness credibility | Affects all testimony |
| `SIGNIFICANT` | Contradiction matters but is not dispositive | Weakens witness on specific point |
| `MINOR` | Contradiction exists but limited trial value | Minimal standalone impact |
| `CUMULATIVE` | Minor alone but powerful as part of a pattern | Must be combined with others |

### Combined Priority Matrix

| | ELEMENT-CRITICAL | CREDIBILITY-CRITICAL | SIGNIFICANT | MINOR | CUMULATIVE |
|---|---|---|---|---|---|
| **DIRECT** | TOP PRIORITY | TOP PRIORITY | HIGH | MEDIUM | MEDIUM |
| **MATERIAL-OMISSION** | HIGH | HIGH | MEDIUM | LOW | MEDIUM |
| **QUALIFICATION** | MEDIUM | MEDIUM | MEDIUM | LOW | LOW-MED |
| **DEGREE** | MEDIUM | LOW-MED | LOW | LOW | LOW |
| **TIMELINE** | VARIES | VARIES | VARIES | LOW | LOW |
| **DETAIL** | LOW | LOW | LOW | SKIP | CUMULATIVE |

---

## 3. Source-Specific Comparison Protocols

### Protocol A: Discovery Response Comparison (DPB)

**Interrogatory answers (verified under oath):**
1. Pull the specific interrogatory question and answer from DPB
2. Identify the exact factual assertions in the answer
3. Compare each assertion against deposition testimony on the same topic
4. Note: Interrogatory answers are signed under penalty of perjury --
   contradictions are particularly powerful

**RFA responses:**
1. Pull the RFA and the response (admitted/denied/qualified)
2. If **admitted**: Any testimony contradicting the admission is extraordinary.
   The party admitted the fact under Rule 36; contradicting it at deposition
   requires explanation. Flag as `CONTRADICTS-SWORN` with severity `DIRECT`.
3. If **denied**: Testimony that now admits the denied fact is a contradiction.
   Flag as `DIRECT`.
4. If **qualified**: Compare the qualification against testimony nuance.

**RFP responses/objections:**
1. Less direct impeachment value, but useful for:
   - "You objected to producing [document] claiming it didn't exist, but today
     you testified about that document"
   - "Your response said you had no responsive documents, but today you
     described [document]"

### Protocol B: Document Comparison (CFP)

**Witness-authored documents:**
1. Pull documents authored by the witness from CFP
2. Compare factual statements in documents against deposition testimony
3. Documents authored by the witness carry high impeachment weight because
   the witness cannot deny authorship

**Documents received or reviewed by witness:**
1. Compare the content of documents the witness received/reviewed against
   their testimony about the same facts
2. Impeachment framing: "You received this document stating [X], but today
   you testified [Y]"

**Medical records (if witness is a treating provider):**
1. Compare contemporaneous medical record entries against testimony
2. Medical records are particularly powerful because they are created near
   the time of treatment and are considered reliable business records
3. NM: NMRA 11-803(F) (records of regularly conducted activity)

### Protocol C: Prior Testimony Comparison

**Prior deposition in this case:**
1. Compare page:line from prior DEPO-INDEX against current DEPO-INDEX
2. Both are under oath -- contradiction between two sworn statements is
   exceptionally powerful
3. Use the exact same commit-credit-confront sequence with both transcripts

**Prior deposition in other case:**
1. If available, compare prior testimony from other litigation
2. Less directly relevant but devastating for expert witnesses who have
   testified differently in different cases
3. Foundation: establish the witness testified in the other case, under oath

**Affidavits or declarations:**
1. Sworn statements -- high impeachment value
2. Compare specific paragraphs against testimony
3. Foundation: show the witness signed the affidavit

### Protocol D: Internal Consistency (Same Deposition)

**Self-contradiction within the deposition:**
1. Review DEPO-INDEX for `INCONSISTENCY-INTERNAL` flags
2. Additionally, compare all entries on the same topic -- the witness may
   have given different testimony at different points without an
   explicit flag
3. Internal contradictions require no extrinsic evidence -- the
   transcript impeaches itself

---

## 4. Foundation Requirements

### NMRA 11-613: Prior Inconsistent Statements (NM State Court)

**NMRA 11-613(A) -- Examining the Witness:**
- A witness may be examined about a prior statement without first showing
  or disclosing the statement to the witness
- But on request, the statement must be shown or disclosed to opposing counsel

**NMRA 11-613(B) -- Extrinsic Evidence:**
Extrinsic evidence of a prior inconsistent statement is admissible only if:
1. The witness is given an **opportunity to explain or deny** the statement
2. The **opposing party** is given an opportunity to examine the witness about it
3. The statement is actually **inconsistent** with the witness's testimony

**Exception:** These foundation requirements do not apply to statements by
opposing parties under NMRA 11-801(D)(2) (party admissions -- no foundation
needed).

**Practical foundation checklist for NM:**
```
NM IMPEACHMENT FOUNDATION (NMRA 11-613):
[ ] Prior statement is actually inconsistent with testimony
[ ] Witness given opportunity to explain or deny
[ ] Opposing party given opportunity to examine about it
[ ] If witness admits making the statement: impeachment complete
[ ] If witness denies: extrinsic evidence admissible under 11-613(B)
[ ] If party admission: no foundation needed (NMRA 11-801(D)(2))
```

### FRE 613: Prior Inconsistent Statements (Federal Court / D.N.M.)

**FRE 613(a) -- Examining the Witness:**
- When examining about a prior statement, the statement need not be shown
  or disclosed to the witness at that time
- But the statement must be shown or disclosed to opposing counsel on request

**FRE 613(b) -- Extrinsic Evidence:**
Extrinsic evidence of a prior inconsistent statement is admissible only if:
1. The witness is given an **opportunity to explain or deny**
2. The **opposing party** is given an opportunity to examine
3. Or if **justice so requires** (catch-all exception)

**Exception:** Does not apply to opposing party statements under FRE 801(d)(2).

**Practical foundation checklist for Federal:**
```
FEDERAL IMPEACHMENT FOUNDATION (FRE 613):
[ ] Prior statement is actually inconsistent with testimony
[ ] Witness given opportunity to explain or deny
[ ] Opposing party given opportunity to examine
[ ] If witness admits: impeachment complete (no extrinsic evidence needed)
[ ] If witness denies/equivocates: extrinsic evidence admissible
[ ] If party admission: no foundation needed (FRE 801(d)(2))
```

---

## 5. The Commit-Credit-Confront Technique

### Overview

The commit-credit-confront technique is the standard three-phase method for
impeaching a witness with a prior inconsistent statement. DEPO-IMPEACH
prepares the specific questions and materials for each phase.

### Phase 1: COMMIT

Lock the witness into their current testimony.

```
Purpose: Get a clear, unequivocal statement of the current position
Method: Ask the witness to repeat and confirm their testimony

Example questions:
- "Your testimony today is that [X], correct?"
- "Is there anything that would change your answer?"
- "You're certain about that?"
- "You wouldn't have any reason to say something different, would you?"
```

**Why commit first:** Prevents the witness from claiming they "didn't really
mean" the testimony. The stronger the commitment, the more devastating the
confrontation.

### Phase 2: CREDIT

Establish that the prior statement is reliable and the witness should be held to it.

```
Purpose: Make the prior statement credible and the witness accountable

For sworn discovery responses:
- "You were represented by counsel when you answered interrogatories?"
- "You reviewed your answers before you signed them?"
- "You understood you were under oath?"
- "You took care to be accurate and truthful?"

For prior deposition:
- "You were placed under oath at that deposition?"
- "You had the opportunity to review and correct the transcript?"
- "You were being just as careful and truthful then as you are today?"

For written documents:
- "You wrote this report yourself?"
- "You wrote it [at/near the time of the events]?"
- "You were trying to be accurate when you wrote it?"
```

**Why credit second:** The witness validates the reliability of the very
statement that will impeach them.

### Phase 3: CONFRONT

Present the prior inconsistent statement.

```
Purpose: Show the jury the contradiction
Method: Read or show the prior statement verbatim

- "Let me read from your [source]..."
- "[Read verbatim quote]"
- "Did I read that correctly?"
- [STOP. Let the contradiction speak for itself.]
- [Move to next topic.]
```

**Critical confrontation rules:**
1. Read verbatim. Never paraphrase the prior statement.
2. Stop after confronting. Do not argue with the witness.
3. Move on. The jury will draw the inference.
4. Have the document ready in case the witness denies making the statement.
5. Do not ask "So which is it?" or "Were you lying then or lying now?"

---

## 6. Pattern Analysis

### Individual Witness Patterns

Beyond individual contradictions, DEPO-IMPEACH identifies patterns across
multiple contradictions by the same witness:

| Pattern | Description | Trial Argument |
|---------|-------------|----------------|
| **Selective memory** | Remembers helpful details but cannot recall harmful ones | Memory is suspiciously convenient |
| **Minimization** | Consistently understates unfavorable facts | Pattern of downplaying |
| **Shifting story** | Key facts change over time across multiple statements | Story evolves to meet litigation needs |
| **Document disconnect** | Testimony consistently differs from documents | Documents more reliable than testimony |
| **Evasion pattern** | Evades questions on specific topics repeatedly | Consciousness of unfavorable facts |
| **Preparation artifact** | Testimony sounds rehearsed; contradicts earlier natural statements | Testimony manufactured for litigation |

### Cross-Witness Patterns

When multiple DEPO-INDEX outputs are available from witnesses on the same side:

| Pattern | Description | Trial Argument |
|---------|-------------|----------------|
| **Coordinated testimony** | Witnesses use identical language on key points | Suggests coaching or coordination |
| **Conflicting accounts** | Same-side witnesses disagree on key facts | At least one is wrong -- both unreliable |
| **Selective corroboration** | Corroborate helpful facts but diverge on harmful ones | Coordination broke down on inconvenient facts |

---

## 7. Ethical Boundaries

### Impeachment Must Be Based on Genuine Inconsistencies

1. **No out-of-context quotation.** The prior statement must be presented
   in fair context. Cherry-picking a fragment that sounds contradictory
   but means the same thing in context is improper.

2. **No misleading juxtaposition.** Do not juxtapose statements about
   different subjects to create an appearance of contradiction.

3. **Account for reasonable explanations.** If a witness reasonably explains
   an apparent contradiction, note this as `[CONTEXT-SENSITIVE]`.

4. **Do not manufacture contradictions.** Every contradiction must exist
   in the record. Do not invent, fabricate, or exaggerate inconsistencies.

### NMRA 16-303 / Model Rule 3.3 -- Candor to the Tribunal

While impeachment is a core litigation skill, it must be pursued honestly:
- All quoted statements must be accurate
- Source citations must be correct
- Context-sensitive contradictions must be flagged as such
- The analysis must not misrepresent the record

### When Not to Pursue Impeachment

Flag `[DECISION REQUIRED]` and recommend against pursuing when:
- The contradiction is trivial and will make the examiner look petty
- The explanation for the contradiction is obvious and sympathetic
- The prior statement's context negates the apparent contradiction
- Pursuing the impeachment will open a door to unfavorable testimony
- The witness is sympathetic and impeachment may alienate the jury
- The impeachment is cumulative (too many minor hits dilute impact)
