# DEMAND Output Format Reference

## Purpose

This reference defines the exact output format for every DEMAND skill response. All modes (PRE-SUIT, LITIGATION, TIME-LIMITED, POLICY-LIMITS) must follow this format. The output contract is strict: every section must be present in the specified order.

---

## Part 1: BODY-ONLY Format

### 1.1 What BODY-ONLY Means

The DEMAND skill produces the **body text only** of the demand letter. The following elements are NOT included in the output because they come from the SmartAdvocate (SA) document shell:

| Element | Provided By | NOT in DEMAND Output |
|---------|-------------|---------------------|
| Firm letterhead | SA shell template | Correct -- omit |
| Date | SA shell merge token | Correct -- omit |
| Recipient address block | SA shell merge token | Correct -- omit |
| Salutation ("Dear...") | SA shell merge token | Correct -- omit |
| Re: line (claim/case reference) | SA shell merge token | Correct -- omit |
| Signature block | SA shell template | Correct -- omit |
| Attorney name/bar number | SA shell template | Correct -- omit |
| Enclosures notation format | SA shell template | Correct -- omit |

### 1.2 What IS Included in BODY-ONLY

The DEMAND output includes only:

1. **Body paragraphs** -- Sections 1-7 of the demand letter (see SKILL.md)
2. **Enclosures list content** -- The list of items enclosed (but not the "Enclosures:" heading format, which SA provides)
3. **Merge tokens** -- Preserved exactly as provided (e.g., `{{client_name}}`, `{{firm_name}}`)

### 1.3 Merge Token Rules

| Rule | Detail |
|------|--------|
| Preserve exactly | Never change `{{client_name}}` to an actual name |
| Never invent | If a merge token is needed but not in the shell, use `[MERGE TOKEN NEEDED: description]` |
| Case-sensitive | `{{Client_Name}}` and `{{client_name}}` are different tokens |
| No surrounding edits | Do not add formatting around merge tokens |
| Document in Cite Table | Note which merge tokens appear in the demand body |

### 1.4 BODY-ONLY Example Structure

```
[Section 1: Introduction paragraph(s)]

[Section 2: Liability summary paragraph(s)]

[Section 3: Injury and treatment narrative paragraph(s)]

[Section 4: Damages presentation paragraph(s) with itemized table]

[Section 5: Comparable outcomes paragraph(s) -- if DVP available]

[Section 6: Demand amount, basis, response deadline, consequences paragraph(s)]

[Section 7: Enclosures list]
```

---

## Part 2: Cite Table Format

### 2.1 Purpose

The Cite Table is the traceability mechanism. Every factual assertion, damages figure, and legal standard in the demand body must have a corresponding Cite Table entry. This is how the attorney verifies that nothing was invented.

### 2.2 Cite Table Template

```
---
CITE TABLE

| # | Assertion | Evidence Source | Confidence | Notes |
|---|-----------|---------------|------------|-------|
```

### 2.3 Column Definitions

| Column | Content | Example |
|--------|---------|---------|
| **#** | Sequential number | 1, 2, 3... |
| **Assertion** | The specific claim made in the demand body | "Client sustained cervical disc herniation at C5-C6" |
| **Evidence Source** | Pack reference with pinpoint citation | CFP Fact#12, Pinpoint: Dr. Martinez MRI report at 3 |
| **Confidence** | Verification status | HIGH (verified), MEDIUM (partially verified), `[VERIFY]` |
| **Notes** | Additional context, flags, or concerns | "Date of MRI needs confirmation" |

### 2.4 Source Reference Formats

| Source Type | Format | Example |
|-------------|--------|---------|
| CFP fact | `CFP Fact#[number], Pinpoint: [source at page]` | CFP Fact#12, Pinpoint: Police Report at 2 |
| DC damages row | `DC [category]-[row], Value: $[amount]` | DC PAST-MED-001, Value: $45,230 |
| DC settlement eval | `DC SETTLEMENT-EVAL, Demand: $[amount]` | DC SETTLEMENT-EVAL, Demand: $350,000 |
| LPB law tag | `LPB [LawTag], Pinpoint: [citation]` | LPB NM-NEG-001, Pinpoint: UJI 13-1601 |
| DVP outcome | `DVP [outcome_id], Verdict: $[amount]` | DVP COMP-003, Verdict: $425,000 |
| SDC posture | `SDC [item_id], Status: [disclosure status]` | SDC DISC-005, Status: REVEAL-AT-DEMAND |

### 2.5 Confidence Levels

| Level | Meaning | Action |
|-------|---------|--------|
| HIGH | Fact verified against source document, CFP row is DRAFT-READY | Safe to include in demand |
| MEDIUM | Fact partially verified or source quality is moderate | Include but note in Open Items |
| `[VERIFY]` | Fact not yet verified against source document | Include with `[VERIFY]` flag, attorney must confirm |
| `[VERIFY-CITE]` | Legal citation not yet confirmed as current | Include with flag, attorney must Shepardize |
| `CITE NEEDED` | No supporting source found | Do NOT include in demand body. List in Open Items. |

### 2.6 Cite Table Example

```
---
CITE TABLE

| # | Assertion | Evidence Source | Confidence | Notes |
|---|-----------|---------------|------------|-------|
| 1 | Client was rear-ended at intersection of Central and Broadway on 6/15/2024 | CFP Fact#1, Pinpoint: Police Report at 1 | HIGH | |
| 2 | Defendant was cited for following too closely | CFP Fact#3, Pinpoint: Police Report at 2 | HIGH | |
| 3 | Client diagnosed with cervical disc herniation at C5-C6 | CFP Fact#12, Pinpoint: Dr. Martinez MRI Report at 3 | HIGH | |
| 4 | Past medical expenses total $67,432.18 | DC PAST-MED-TOTAL, Value: $67,432.18 | HIGH | Billed amount |
| 5 | Future medical expenses estimated $45,000-$85,000 | DC FUT-MED-001, Range: $45K-$85K | MEDIUM | Based on Dr. Lopez prognosis, no life care plan |
| 6 | NM requires duty of ordinary care | LPB NM-NEG-001, Pinpoint: UJI 13-305 | HIGH | |
| 7 | Comparable verdict: Garcia v. Smith, $325,000 (Bernalillo Co.) | DVP COMP-001, Verdict: $325,000 | HIGH | Similar MVC, similar injuries |
| 8 | Total demand amount: $350,000 | DC SETTLEMENT-EVAL, Demand: $350,000 | HIGH | Attorney-approved anchor |
| 9 | Lost wages: $12,500 | DC PAST-WAGES-001, Value: $12,500 | [VERIFY] | Employer verification letter pending |
```

---

## Part 3: Gate Results Format

### 3.1 Purpose

Gate Results provide a pass/fail assessment of the demand's compliance with Law-OS quality standards. Every demand output must include Gate Results.

### 3.2 Gate Results Template

```
---
GATE RESULTS

1. Traceability Gate:     [PASS/FAIL]
   - All facts traced to CFP: [X/Y facts traced]
   - All damages traced to DC: [X/Y figures traced]
   - All law traced to LPB: [X/Y citations traced]
   [If FAIL: List untraced items]

2. Status Gate:           [PASS/FAIL]
   - CFP rows DRAFT-READY: [X/Y rows]
   - LPB rows PackReady=Yes: [X/Y rows]
   [If FAIL: List non-ready rows used]

3. Damages Integrity:     [PASS/FAIL]
   - Demand amount: $[AMOUNT]
   - DC SETTLEMENT-EVAL source: [present/absent]
   - Demand matches DC output: [yes/no]
   [If FAIL: Explain mismatch]

4. SDC Posture Compliance: [PASS/FAIL/N/A]
   - SDC posture available: [yes/no]
   - UNDISCLOSED items revealed: [count -- must be 0 for PASS]
   - REVEAL-AT-DEMAND items used: [count]
   [If FAIL: List posture violations]

5. Shepard Gate:          [PASS/FAIL]
   - LPB citations Shepardized: [X/Y]
   - Unverified citations: [count]
   [If FAIL: List [VERIFY-CITE] items]

6. Conflicts:             [note any]
   [List any conflicts between sources, inconsistent facts,
    damages discrepancies, or Pack disagreements]

7. Merge Token Integrity: [PASS/FAIL]
   - Merge tokens found: [list]
   - Modified or invented tokens: [count -- must be 0 for PASS]
   [If FAIL: List token issues]
```

### 3.3 Gate Pass/Fail Criteria

| Gate | PASS Criteria | FAIL Criteria |
|------|--------------|---------------|
| Traceability | 100% of assertions have Pack sources | Any assertion without Pack source |
| Status | All used Pack rows are DRAFT-READY / PackReady | Any non-ready row used in demand |
| Damages Integrity | Demand amount matches DC SETTLEMENT-EVAL | Demand amount without DC support |
| SDC Posture | Zero UNDISCLOSED items revealed | Any UNDISCLOSED item in demand text |
| Shepard | All citations Shepardized or flagged | Unverified citation used without flag |
| Merge Token | All tokens preserved, none invented | Any modified or invented token |

### 3.4 Handling Gate Failures

| Gate Failure | Action |
|-------------|--------|
| Traceability FAIL | Add `CITE NEEDED` flags to untraced assertions. List in Open Items. |
| Status FAIL | Mark non-ready assertions with `[VERIFY]`. Recommend running VERIFY on source Pack. |
| Damages Integrity FAIL | Add `[DECISION REQUIRED: demand amount needs DC SETTLEMENT-EVAL support]`. |
| SDC Posture FAIL | CRITICAL: Remove UNDISCLOSED items from demand. Flag as `[SDC VIOLATION -- REMOVED]`. |
| Shepard FAIL | Add `[VERIFY-CITE]` flags. Recommend Shepardizing before sending. |
| Merge Token FAIL | Correct token issues. Note corrections in Open Items. |

---

## Part 4: Next Requests Format

### 4.1 Purpose

Next Requests tells the attorney what additional information or action is needed before the demand can be finalized and sent.

### 4.2 Template

```
---
NEXT REQUESTS

Missing Inputs:
  [ ] [Description of missing input -- e.g., "DC SETTLEMENT-EVAL not provided; run DC skill"]
  [ ] [Description -- e.g., "Updated medical billing from Dr. Martinez (last visit 2026-01-15)"]

Attorney Decisions Required:
  [ ] [Decision -- e.g., "Approve demand amount of $350,000"]
  [ ] [Decision -- e.g., "Select response deadline (recommend 30 days)"]
  [ ] [Decision -- e.g., "Confirm enclosures list matches actual package contents"]

Verification Needed:
  [ ] [Item -- e.g., "Verify lost wages amount with employer (Cite Table #9)"]
  [ ] [Item -- e.g., "Shepardize LPB citation for UJI 13-1806 (Cite Table #6)"]

Pack Updates Recommended:
  [ ] [Update -- e.g., "Run CFP VERIFY to confirm treatment dates in Cite Table #3, #5"]
  [ ] [Update -- e.g., "Run DVP to add Bernalillo County comparables for Section 5"]
```

---

## Part 5: Open Items Format

### 5.1 Purpose

Open Items is the comprehensive list of everything that needs resolution before the demand is final. It aggregates all flags from the demand body, Cite Table, and Gate Results.

### 5.2 Template

```
---
OPEN ITEMS

[VERIFY] Items (factual verification needed):
  1. [Cite Table #9] Lost wages amount -- employer verification pending
  2. [Cite Table #5] Future medical estimate -- confirm with treating physician

[VERIFY-CITE] Items (legal citation verification needed):
  1. [Cite Table #6] UJI 13-1806 -- Shepardize for current status
  2. [LPB NM-DAMAGES-003] NMSA 56-8-4 pre-judgment interest rate -- confirm 15%

[DECISION REQUIRED] Items (attorney approval needed):
  1. Demand amount: $350,000 (from DC SETTLEMENT-EVAL) -- approve or adjust
  2. Response deadline: 30 days recommended -- approve or adjust
  3. Enclosures list: confirm documents available for inclusion
  4. [If TIME-LIMITED/POLICY-LIMITS] Bad faith language: approve specific statutory references

[SDC POSTURE] Items (disclosure decisions):
  1. [If any] SDC item [ID] -- REVEAL-AT-DEMAND authorized? Confirm.

Unresolved Conflicts:
  1. [If any] DC past medical total ($67,432) vs. billing summary total ($65,890) -- reconcile
```

---

## Part 6: Complete Output Assembly Order

Every DEMAND response must include all sections in this exact order:

```
1. MODE + SCOPE STATEMENT
   [Mode: PRE-SUIT-DEMAND / LITIGATION-DEMAND / TIME-LIMITED-DEMAND / POLICY-LIMITS-DEMAND]
   [Case: case_id, parties, jurisdiction]
   [Input packs consumed: CFP, DC, LPB, DVP (if any), SDC (if any)]
   [Demand amount: $X (source: DC SETTLEMENT-EVAL)]

2. BODY-ONLY DEMAND LETTER
   [Sections 1-7 as defined in SKILL.md and mode-specific reference]

3. ---

4. CITE TABLE
   [Full table with all assertions traced to sources]

5. GATE RESULTS
   [All 7 gates with PASS/FAIL]

6. NEXT REQUESTS
   [Missing inputs, attorney decisions, verification needed, pack updates]

7. OPEN ITEMS
   [All [VERIFY], [VERIFY-CITE], [DECISION REQUIRED], [SDC POSTURE] items]
```

### 6.1 Token Fail-Safe (Chunking)

If the demand is extensive and approaching token limits, chunk the output:

**Part 1:** Mode + Scope Statement + BODY-ONLY Demand Letter (Sections 1-7)
**Part 2:** Cite Table + Gate Results + Next Requests + Open Items

Always complete Part 1 before starting Part 2. Note at the end of Part 1:
```
[CONTINUED IN PART 2: Cite Table, Gate Results, Next Requests, Open Items]
```

### 6.2 Output Validation Checklist

Before delivering any DEMAND output:

- [ ] Mode + Scope Statement present and accurate
- [ ] BODY-ONLY format (no letterhead, date, address, signature)
- [ ] All 7 sections present in demand body (or justified omission noted)
- [ ] Divider (---) between demand body and Cite Table
- [ ] Cite Table present with all assertions traced
- [ ] Gate Results present with all 7 gates assessed
- [ ] Next Requests present with actionable items
- [ ] Open Items present with all flagged items consolidated
- [ ] Merge tokens preserved exactly
- [ ] No invented facts, figures, citations, or dates
- [ ] Professional, confident tone throughout
- [ ] NM-specific law cited where applicable (UJI, NMSA, NMRA)
