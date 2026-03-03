# EXTRACT Stage -- Reference (DVP v0.1)

Read this file when entering EXTRACT mode.

## Purpose

Parse source documents (medical bills, lien letters, wage records, settlement
correspondence, prior verdict/settlement data) into structured DVP rows via MCP.
Each document type maps to a specific DVP table. Exhaustive extraction -- every
line item, every lien, every wage period, every offer.

## When to use

- User uploads medical billing records or billing summaries --> `dvp_medical_bills`
- User uploads lien letters, lien spreadsheets, or subrogation notices --> `dvp_liens`
- User uploads wage verification, pay stubs, W-2s, or tax returns --> `dvp_lost_wages`
- User provides settlement offer/demand history or mediation statements --> `dvp_settlement_offers`
- User provides prior verdict/settlement data for comparables --> `dvp_outcomes`
- User provides wrongful death claimant information --> `dvp_wd_claimants`
- User says "extract damages", "build DVP", "extract bills", "log lien"

## Workflow

### Step 1: Stop-Sign Gate

Check for prohibited inputs:
- Documents under protective order without authorization --> refuse
- Documents from unrelated cases without sanitization --> refuse for outcomes seeding
- Documents with visible SSN/DOB --> redact warning, proceed with extraction only
  of billing/amount data

### Step 2: Identify Target Table

| Document Type | Target Table | Key Columns |
|---------------|-------------|-------------|
| Medical bills, billing summaries, EOBs | `dvp_medical_bills` | provider_name, service_date, cpt_code, amount_billed |
| Lien letters, subrogation notices, ERISA notices | `dvp_liens` | lienholder, lien_type, amount_asserted |
| Pay stubs, W-2s, tax returns, employer letters | `dvp_lost_wages` | loss_type, period_start, period_end, amount_calculated |
| Demand letters, offer letters, mediation statements | `dvp_settlement_offers` | direction, offering_party, amount, stage |
| Verdict reporters, settlement databases, firm data | `dvp_outcomes` | case_type, severity_tier, gross_amount, resolution_type |
| Family information, WD petition, consortium claims | `dvp_wd_claimants` | claimant_name, role, wd_share_cents |

### Step 3: Extract Rows via MCP

For each line item in the source document, create one row in the target table.

**Critical:** One row per line item. A single billing statement with 12 line items
= 12 rows in dvp_medical_bills. Never consolidate line items.

### Step 4: Cross-Reference CFP

If a cfp_file_metadata.doc_id exists for the source document, populate the
`cfp_doc_id` column to link the DVP row to its CFP source.

If no CFP doc_id exists yet: set `cfp_doc_id = '[CITE NEEDED]'` and note that
CFP EXTRACT should be run on this document.

### Step 5: QA Summary

## Table Schemas

### dvp_medical_bills

| Column | Type | Required | Notes |
|--------|------|----------|-------|
| provider_name | TEXT | Yes | Full provider name as on bill |
| provider_type | TEXT | Yes | Controlled: Hospital, Physician, Specialist, Surgeon, Physical-Therapy, Mental-Health, Pharmacy, Imaging, DME, Ambulance, Other |
| service_date | TEXT | Yes | ISO 8601 (YYYY-MM-DD). Unknown --> `[DATE NEEDED]` |
| service_description | TEXT | Yes | Description from bill line item |
| cpt_code | TEXT | If available | CPT/HCPCS code from bill |
| icd_codes | TEXT | If available | Comma-separated ICD-10 codes |
| amount_billed | INTEGER | Yes | **INTEGER CENTS.** $1,234.56 = 123456 |
| amount_paid | INTEGER | If available | INFO ONLY. Integer cents |
| amount_adjusted | INTEGER | If available | INFO ONLY. Integer cents |
| is_future | INTEGER | Yes | 0 = past, 1 = future/projected |
| projection_basis | TEXT | If is_future=1 | Required for future damages. Cite expert or method |
| present_value | INTEGER | If is_future=1 | Present value in cents. Requires discount_rate |
| discount_rate | TEXT | If present_value set | Source of discount rate (economist report, court standard) |
| uji_reference | TEXT | If known | UJI 13-1805, 13-1806, etc. |
| element_id | TEXT | If known | PCM element_id this bill supports |
| cfp_doc_id | TEXT | Yes | CFP doc_id for source document. `[CITE NEEDED]` if unknown |
| case_id | TEXT | Yes | Case identifier (e.g., "2025-CV-00456") |
| notes | TEXT | Optional | Conflicts, anomalies, questions |

### dvp_liens

| Column | Type | Required | Notes |
|--------|------|----------|-------|
| lien_type | TEXT | Yes | Controlled: Health-Insurance, Medicare, Medicaid, ERISA, VA, Workers-Comp, Hospital, Child-Support, Attorney, Government, Other |
| lienholder | TEXT | Yes | Name of lienholder entity |
| amount_asserted | INTEGER | Yes | Integer cents. Amount claimed in lien notice |
| amount_negotiated | INTEGER | Only if confirmed | Integer cents. Only if source confirms negotiated amount |
| amount_final | INTEGER | Only if confirmed | Integer cents. Only if source confirms final/resolved amount |
| priority | INTEGER | If known | Lien priority rank (1 = highest priority) |
| status | TEXT | Yes | Controlled: Asserted, Negotiating, Resolved, Disputed, Waived, Expired |
| assertion_date | TEXT | If known | ISO 8601. Date lien was asserted |
| cfp_doc_id | TEXT | Yes | CFP doc_id for lien letter. `[CITE NEEDED]` if unknown |
| case_id | TEXT | Yes | Case identifier |
| notes | TEXT | Optional | |

### dvp_lost_wages

| Column | Type | Required | Notes |
|--------|------|----------|-------|
| loss_type | TEXT | Yes | Controlled: Past-Lost-Wages, Future-Lost-Wages, Past-Earning-Capacity, Future-Earning-Capacity, Loss-of-Services, Loss-of-Support |
| employer_name | TEXT | If applicable | Employer at time of loss |
| job_title | TEXT | If available | Position held |
| period_start | TEXT | Yes | ISO 8601. Start of loss period |
| period_end | TEXT | Yes | ISO 8601. End of loss period. Ongoing --> `[ONGOING]` |
| hourly_rate | INTEGER | If available | Integer cents per hour |
| hours_per_week | REAL | If available | Average hours/week |
| amount_calculated | INTEGER | Yes | Integer cents. Total loss for this period |
| is_future | INTEGER | Yes | 0 = past, 1 = future/projected |
| projection_basis | TEXT | If is_future=1 | Required. Cite economist, vocational expert, or method |
| present_value | INTEGER | If is_future=1 | Present value in cents |
| discount_rate | TEXT | If present_value set | Source of discount rate |
| uji_reference | TEXT | If known | UJI 13-1805, 13-1827, etc. |
| element_id | TEXT | If known | PCM element_id |
| cfp_doc_id | TEXT | Yes | CFP doc_id for wage source. `[CITE NEEDED]` if unknown |
| case_id | TEXT | Yes | Case identifier |
| notes | TEXT | Optional | |

### dvp_settlement_offers

| Column | Type | Required | Notes |
|--------|------|----------|-------|
| offer_date | TEXT | Yes | ISO 8601 |
| direction | TEXT | Yes | Controlled: Demand, Offer, Counter, Mediator |
| offering_party | TEXT | Yes | Who made this offer/demand |
| amount | INTEGER | Yes | Integer cents |
| conditions | TEXT | Optional | Any conditions attached to the offer |
| response_deadline | TEXT | If stated | ISO 8601 deadline for response |
| response_received | TEXT | If applicable | What happened: accepted, rejected, countered, expired |
| stage | TEXT | Yes | Controlled: Pre-Suit, Post-Suit, Mediation, Arbitration, Trial-Pending, Post-Trial |
| momentum_at_offer | TEXT | Optional | Brief note on case posture at time of offer |
| cfp_doc_id | TEXT | If available | CFP doc_id for offer letter |
| case_id | TEXT | Yes | Case identifier |
| notes | TEXT | Optional | |

### dvp_outcomes (seeded comparables)

| Column | Type | Required | Notes |
|--------|------|----------|-------|
| outcome_id | TEXT | Yes | Unique ID. Format: `DVP-OUT-[###]` |
| case_group | TEXT | Yes | SA picklist category |
| case_type | TEXT | Yes | SA picklist type |
| venue | TEXT | If known | County or court |
| jurisdiction | TEXT | If known | Controlled: NM, FED, D.N.M., Other |
| severity_tier | TEXT | Yes | Controlled: Minor, Moderate, Severe, Catastrophic, Death |
| injury_description | TEXT | Yes | Brief injury description (sanitized) |
| resolution_type | TEXT | Yes | Controlled: Settlement, Verdict, MSJ, Mediation, Arbitration |
| gross_amount | INTEGER | Yes | Integer cents |
| attorney_fees_pct | INTEGER | If known | Basis points (3333 = 33.33%) |
| resolution_year | INTEGER | If known | Year resolved |
| comparative_fault_pct | INTEGER | If applicable | Plaintiff's fault percentage |
| expert_retained | INTEGER | Default 0 | Boolean: was expert retained? |
| notes | TEXT | Optional | **SANITIZED.** No party names, case numbers, or attorney names from source firm cases |
| case_id | TEXT | Optional | Only if linked to a specific active case |

### dvp_wd_claimants

| Column | Type | Required | Notes |
|--------|------|----------|-------|
| claimant_name | TEXT | Yes | Claimant name |
| role | TEXT | Yes | Spouse, Child, Parent, etc. |
| relationship | TEXT | Optional | Description of relationship to decedent |
| wd_share_cents | INTEGER | Default 0 | Wrongful death share in cents |
| loc_share_cents | INTEGER | Default 0 | Loss of consortium share in cents |
| other_claims_cents | INTEGER | Default 0 | Other claims in cents |
| case_id | TEXT | Yes | Case identifier |
| notes | TEXT | Optional | |

## MCP Write Patterns

```
mcp__law-os__upsert_row("dvp_medical_bills", {
    "provider_name": "Presbyterian Hospital",
    "provider_type": "Hospital",
    "service_date": "2025-06-15",
    "service_description": "Emergency room visit - Level 4",
    "cpt_code": "99284",
    "amount_billed": 345600,
    "amount_paid": 0,
    "is_future": 0,
    "cfp_doc_id": "MED-001",
    "case_id": "2025-CV-00456"
})
```

## Parsing Rules by Document Type

### Medical Bills / Billing Summaries

1. One row per CPT/HCPCS line item. If no CPT codes, one row per service date per provider.
2. Amount billed is the primary number (firm policy). Amount paid and adjusted are INFO ONLY.
3. Date of service from the bill, not the bill date.
4. If the bill is a summary showing totals only (no line items), create one row per provider per date range with a note: `[SUMMARY ONLY -- line items not available]`.
5. If the bill shows both facility and professional charges, create separate rows.

### Lien Letters / Subrogation Notices

1. One row per lienholder per lien assertion.
2. Amount_asserted = the amount stated in the lien letter. Never compute or estimate.
3. If the letter references multiple claims on the same lien, create one row for the total.
4. Status defaults to `Asserted` unless the letter confirms resolution.
5. Priority is populated only if the source states it. Never assume priority.

### Wage Records

1. One row per loss period. Past and future are separate rows.
2. Amount_calculated: for past wages, compute from rate x hours x weeks. Show the math in notes.
3. For future wages: amount_calculated must have a projection_basis (economist, vocational expert).
4. If multiple employers during loss period, create separate rows per employer.

### Settlement Correspondence

1. One row per offer, demand, counter-offer, or mediator proposal.
2. Direction: Demand = our side, Offer = their side, Counter = response to prior, Mediator = mediator's proposal.
3. Preserve chronological order. Momentum_at_offer captures the case posture context.
4. Response tracking: what happened after this offer (accepted, rejected, countered, expired).

### Outcomes Data (Seeding Comparables)

1. **SANITIZE ALL DATA.** No party names, case numbers, or attorney names from source firm's cases.
2. One row per historical verdict or settlement used as a comparable.
3. Severity_tier must match the controlled vocabulary.
4. Focus on NM jurisdiction comparables; flag out-of-state with jurisdiction.

## Chunking (Large Billing Records)

For bills with 50+ line items:
1. Process 25 line items per chunk
2. Write rows via MCP after each chunk
3. Report: `DVP EXTRACT chunk [N] complete. [X] rows written to dvp_medical_bills ([Y] total). Reply 'continue'.`

## QA Summary (end of EXTRACT)

Report:
- Target table(s) written to
- Row counts per table
- Total amount_billed (in dollars for display): $X,XXX.XX
- Total lien exposure (asserted): $X,XXX.XX
- `[CITE NEEDED]` count (rows without cfp_doc_id)
- `[DATE NEEDED]` count
- `CONFLICT` count (if any)
- "Next: Run ENRICH to add UJI mapping and present value computations"
