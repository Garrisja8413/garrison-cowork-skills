# Damages Categories — DC Reference

## NM Damages Taxonomy (UJI-Aligned)

### Economic Damages

| Category | UJI Reference | Calculation Method | Notes |
|----------|--------------|-------------------|-------|
| Past Medical Expenses | UJI 13-1805 | Amounts billed (firm rule) | Paid/adjusted = INFO ONLY |
| Future Medical Expenses | UJI 13-1805 | Life care plan or provider estimate | Present value if applicable |
| Past Lost Wages | UJI 13-1806 | Actual wages × time missed | Employer records / tax returns |
| Future Lost Earning Capacity | UJI 13-1806 | Economist projection | Work-life tables, growth rate, discount rate |
| Property Damage | UJI 13-1809 | Repair or FMV | Appraisal or estimate |
| Funeral / Burial (WD) | UJI 13-1830 | Actual costs | Invoices |
| Loss of Support (WD) | UJI 13-1830 | Economic expert projection | Dependency analysis |
| Loss of Services (WD) | UJI 13-1830 | Replacement cost method | Household services valuation |

### Non-Economic Damages

| Category | UJI Reference | Valuation Method | Notes |
|----------|--------------|-----------------|-------|
| Physical Pain & Suffering (Past) | UJI 13-1803 | Per diem or lump sum | Duration × severity |
| Physical Pain & Suffering (Future) | UJI 13-1803 | Per diem × life expectancy | Present value optional |
| Mental Anguish (Past) | UJI 13-1804 | Lump sum | Supported by records/testimony |
| Mental Anguish (Future) | UJI 13-1804 | Lump sum or per diem | Prognosis-dependent |
| Loss of Enjoyment of Life | UJI 13-1807 | Lump sum | Before-vs-after comparison |
| Impairment | UJI 13-1807 | Lump sum or rating-based | Functional limitations |
| Disfigurement | UJI 13-1808 | Lump sum | Visibility, permanence, age |
| Loss of Consortium | Separate claim | Lump sum | Spouse/partner claim |
| Value of Life (WD) | UJI 13-1830 | Lump sum | Relationship quality, duration |

### Enhanced Damages

| Category | UJI Reference | Valuation Method | Notes |
|----------|--------------|-----------------|-------|
| Punitive Damages | UJI 13-1810A | Multiplier or ratio | Requires aggravating circumstances |
| Statutory Damages (UPA) | NMSA §§ 57-12-1 et seq. | Per statute | Treble damages possible [VERIFY-CITE] |
| Bad Faith Damages | Case law | Consequential + punitive | Insurance context [VERIFY-CITE] |

---

## Medical Specials Rule (Firm Policy)

**Default:** All medical expense calculations use **amounts billed / gross charges**.

**Rationale:** New Mexico's collateral source rule protects against reduction
for insurance payments. Amounts billed represent the reasonable value of
medical services as charged by the provider.

**Paid/Adjusted Amounts:** Track separately as INFO ONLY. Include in
Assumptions & Inputs section but do not use in the damages calculation
unless specifically instructed by the attorney.

**Format in Tables:**
```
| Past Medical | Amounts Billed | $125,432.00 | Medical records / billing summary |
| Past Medical | Amounts Paid (INFO ONLY) | $47,215.00 | Insurance EOBs |
```

---

## Future Damages Calculation Framework

### Present Value Discount
- Future economic damages may require present-value discount
- Discount rate: use rate provided by economist or flag `[VERIFY]`
- If no rate provided: state "Present value not applied — economist rate needed"
- Show formula: FV / (1 + r)^n per year, or lump sum equivalent

### Life Expectancy
- Source: NM life tables or CDC actuarial data [VERIFY-CITE]
- Adjusted for health conditions if applicable
- State source and adjusted expectancy in Assumptions

### Work-Life Expectancy
- Different from life expectancy — accounts for retirement
- Source: Bureau of Labor Statistics work-life tables [VERIFY]
- Adjust for occupation and health

---

## Non-Economic Valuation Approaches

### Per Diem Method
- Calculate daily rate for pain/suffering
- Multiply by number of days (past) or projected days (future)
- State the daily rate and basis clearly
- Example: $X per day × Y days = $Z

### Lump Sum Method
- Single figure based on severity, duration, impact
- Anchor to comparable verdicts if available (from Outcomes Pack)
- State basis: "Based on [severity descriptor] injuries sustained over [duration]"

### Before-vs-After Comparison
- Document pre-injury baseline (activities, employment, relationships)
- Document post-injury limitations
- Quantify the delta in functional terms

---

## Wrongful Death Allocation Framework

### Statutory Beneficiaries (NMSA § 41-2-3) [VERIFY-CITE]
- Personal representative for benefit of statutory beneficiaries
- Priority: spouse, children, parents (varies by circumstances)
- Each beneficiary's share based on relationship and dependency

### Overlapping Roles
When a claimant holds multiple roles (e.g., spouse with WD claim AND
separate LOC claim), each claim must be valued independently and then
aggregated for that claimant's total jury value.

### Allocation Method (Required)
1. Estimate each claimant's total jury value across all claims
2. Calculate each claimant's percentage of the combined jury value
3. Apply percentages to gross and net settlement amounts
4. Verify: percentages sum to 100%, dollar amounts sum to settlement

### Special Considerations
- Minor claimants: court approval required [VERIFY-CITE]
- Probate: personal representative appointment if applicable
- Liens: must be resolved before distribution
- Tax: structured settlement considerations
- Competing interests: document and flag for attorney resolution

---

## Outcomes Pack Integration

### What the Outcomes Pack Is
An Excel file containing sanitized historical case outcomes from the firm's
own cases and public sources. Used as the comparable dataset for
SETTLEMENT-EVAL mode.

### How DC Uses It
- SETTLEMENT-EVAL: filters by case type, venue, severity, stage to find
  comparable outcomes for range estimation
- OUTCOMES-EXTRACT: creates new rows from demand/mediation documents
- OUTCOMES-QA: validates data quality
- OUTCOMES-COMBINE: merges multiple packs

### Column Schema
See `references/outcomes-schema.md` for the full column definition.
