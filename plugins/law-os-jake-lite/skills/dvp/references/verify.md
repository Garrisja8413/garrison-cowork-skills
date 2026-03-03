# VERIFY Stage -- Reference (DVP v0.1)

Read this file when entering VERIFY mode.

## Purpose

Validate DVP data against source documents, check arithmetic, detect
discrepancies, and confirm lien status. Produces a verification report
that identifies issues before the DVP feeds DC, SDC, or demand drafting.

## When to use

- User has enriched DVP data from ENRICH
- User says "verify damages", "check the numbers", "audit DVP", "validate amounts"
- Before generating a demand letter or settlement analysis
- When new billing records arrive and need reconciliation

## Workflow

### Step 1: Load DVP Data

Query all DVP tables for the case via MCP. Inventory row counts, total
amounts, and enrichment status (UJI mapping, element linkage, present values).

### Step 2: Amount Verification (dvp_medical_bills)

For each billing row, verify:

| Check | How | Flag if Failed |
|-------|-----|----------------|
| Amount matches source | Compare amount_billed against uploaded bill | `AMOUNT-MISMATCH` |
| Provider name matches | Verify provider_name against source | `PROVIDER-MISMATCH` |
| Date matches | Verify service_date against source | `DATE-MISMATCH` |
| CPT code matches | Verify cpt_code against source (if available) | `CPT-MISMATCH` |
| No double-counting | Check for duplicate rows (same provider + date + CPT) | `POTENTIAL-DUPLICATE` |
| Arithmetic check | For summaries: do line items sum to stated total? | `SUM-MISMATCH` |
| Future basis check | If is_future=1: does projection_basis cite an expert? | `[PROJECTION BASIS NEEDED]` |

**Confidence scoring for each row:**
- `Verified` -- amount confirmed against source document
- `Plausible` -- amount is consistent with source but pinpoint not confirmed
- `Unverified` -- no source document comparison possible
- `Discrepancy` -- amount does not match source

### Step 3: Lien Verification (dvp_liens)

For each lien row, verify:

| Check | How | Flag if Failed |
|-------|-----|----------------|
| Amount matches letter | Compare amount_asserted against lien letter | `LIEN-AMOUNT-MISMATCH` |
| Lien type correct | Verify lien_type against source | `LIEN-TYPE-ERROR` |
| Status current | Is the lien status still accurate? Check for resolution | `LIEN-STATUS-STALE` |
| Authorization valid | Is HIPAA authorization current for this lienholder? (check PRC) | `HIPAA-CHECK-NEEDED` |
| Lien priority reasonable | Does stated priority align with NM lien priority rules? | `PRIORITY-REVIEW` |

**Lien completeness check:**
- Are all lienholders mentioned in CFP or PRC represented in dvp_liens?
- Are there insurance carriers who may have subrogation rights but no lien recorded?
- Flag missing lienholders: `[LIEN MISSING -- check [carrier/entity]]`

### Step 4: Wage Verification (dvp_lost_wages)

For each wage row, verify:

| Check | How | Flag if Failed |
|-------|-----|----------------|
| Rate matches source | Compare hourly_rate against pay stubs/W-2 | `RATE-MISMATCH` |
| Period matches source | Verify period_start/end against employer records | `PERIOD-MISMATCH` |
| Calculation correct | Recalculate: rate x hours x weeks = amount | `CALC-ERROR` |
| Future basis valid | If is_future=1: economist report cited? | `[PROJECTION BASIS NEEDED]` |
| Present value correct | If present_value set: recalculate with stated discount_rate | `PV-CALC-ERROR` |
| Discount rate sourced | Is discount_rate from an identified expert? | `[DISCOUNT RATE NEEDED]` |

### Step 5: Settlement History Verification (dvp_settlement_offers)

For each offer row, verify:
- Amount matches the offer/demand letter
- Date matches the letter date
- Direction (Demand/Offer/Counter/Mediator) is correct
- Chronological order makes sense (no counter before initial offer)
- Response tracking is complete (what happened after this offer?)

### Step 6: Cross-Hub Consistency Checks

| Check | Tables | Flag |
|-------|--------|------|
| Medical bills match CFP treatment records | dvp_medical_bills vs. cfp_facts (Medical) | `CFP-DVP-MISMATCH` |
| Lien amounts consistent with bills | dvp_liens vs. dvp_medical_bills totals | `LIEN-BILL-GAP` |
| Lost wages match employment records | dvp_lost_wages vs. CFP employment facts | `WAGE-FACT-MISMATCH` |
| Settlement offers match SDC log | dvp_settlement_offers vs. SDC negotiation data | `SDC-DVP-SYNC` |

### Step 7: Assign Verification Status

Add a verification_status to tracking (in notes or separate log):

| Status | Meaning |
|--------|---------|
| `VERIFIED` | Amount confirmed against source, arithmetic checks pass |
| `PLAUSIBLE` | Consistent with source but not pinpoint-confirmed |
| `UNVERIFIED` | No source comparison performed yet |
| `DISCREPANCY` | Mismatch found -- requires resolution |
| `CONFLICT` | Conflicting data from multiple sources |

### Step 8: Generate Verification Report

## Verification Report Format

```markdown
# DVP Verification Report
**Case:** [case_id]
**Date:** [date]
**Stage:** VERIFY

## Summary
| Table | Total Rows | Verified | Plausible | Unverified | Discrepancy | Conflict |
|-------|------------|----------|-----------|------------|-------------|----------|
| dvp_medical_bills | [N] | [N] | [N] | [N] | [N] | [N] |
| dvp_liens | [N] | [N] | [N] | [N] | [N] | [N] |
| dvp_lost_wages | [N] | [N] | [N] | [N] | [N] | [N] |
| dvp_settlement_offers | [N] | [N] | [N] | [N] | [N] | [N] |

## Financial Summary
- Total medical billed (past): $XX,XXX.XX
- Total medical projected (future): $XX,XXX.XX
- Total lost wages (past): $XX,XXX.XX
- Total lost wages (future, present value): $XX,XXX.XX
- Total lien exposure (asserted): $XX,XXX.XX
- Total lien exposure (final/negotiated): $XX,XXX.XX

## Discrepancies (must resolve before demand)
| # | Table | Row ID | Issue | Source vs. DVP | Resolution Needed |
|---|-------|--------|-------|---------------|-------------------|

## Arithmetic Errors
| # | Table | Row ID | Expected | Actual | Difference |
|---|-------|--------|----------|--------|------------|

## Missing Data
- `[CITE NEEDED]` rows: [count + list]
- `[PROJECTION BASIS NEEDED]` rows: [count]
- `[DISCOUNT RATE NEEDED]` rows: [count]
- `[LIEN MISSING]` flags: [count + entities]

## Cross-Hub Consistency
- CFP-DVP alignment: [PASS/FAIL + details]
- Lien-Bill coverage: [PASS/FAIL + details]
- SDC-DVP sync: [PASS/FAIL + details]

## Recommendation
[Ready for DC/demand drafting / Fix [N] discrepancies first / Missing source documents needed]
```

## Chunking (large verification jobs)

For DVP hubs with 100+ medical bill rows:
1. Verify bills in batches of 25 rows
2. Report progress: "Verified [25] of [N] rows. Reply 'continue'."
3. Generate final verification report after all batches complete

## Integration with Downstream

After VERIFY:
- `VERIFIED` rows can feed DC (Damages Calculator) and DEMAND (demand letters)
- `PLAUSIBLE` rows can feed DC with a note that pinpoint confirmation is pending
- `DISCREPANCY` rows must be resolved before any downstream use
- The dvp_damages_summary VIEW automatically aggregates verified data for DC input
