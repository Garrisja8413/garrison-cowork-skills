# PACKET Mode -- Reference (DVP v0.1)

Read this file when entering PACKET mode.

## Purpose

Generate a filtered damages packet (markdown) from DVP data for use in downstream
skills (DC Damages Calculator, DEMAND demand letter, SDC settlement analysis,
CLOSING-ARGUMENT damages section). The packet is a structured snapshot of the
DVP hub, filtered and formatted for a specific downstream consumer.

## When to use

- User needs a damages summary for a demand letter
- User says "build DVP packet", "damages packet for demand", "settlement damages summary"
- Before running DC (Damages Calculator)
- Before pasting into DEMAND skill
- Attorney needs a quick damages overview for mediation preparation

## Workflow

### Step 1: Query DVP Data via MCP

Load all DVP tables for the case. Check dvp_damages_summary VIEW for aggregated totals.

### Step 2: Apply Filters

Based on the downstream consumer, filter the DVP data:

| Consumer | Filter Strategy |
|----------|----------------|
| DC (Damages Calculator) | All verified/plausible rows. Group by UJI category. Include outcomes for comparables. |
| DEMAND (Demand Letter) | Verified rows only. Aggregate by category. Include settlement history. Exclude internal notes. |
| SDC (Settlement Analysis) | All data including offers. Include comparable outcomes. Include lien exposure. |
| CLOSING-ARGUMENT | Verified rows with exhibit/testimony support. Formatted for jury presentation. |
| TRIAL-BRIEF | Verified rows with pinpoint citations. Formatted for legal argument. |
| SETTLEMENT-NEGOTIATOR | DC output + offer history + lien exposure + comparables. |

### Step 3: Build Packet Sections

## Packet Format

```markdown
### DVP FILTERED PACKET -- [Consumer Target]
### Generated: [date] | Case: [case_id]
### Verification Status: [N] Verified / [N] Plausible / [N] Unverified

---

A) **Medical Expenses -- Past (UJI 13-1805)**

| Provider | Type | Date Range | Line Items | Total Billed | Status |
|----------|------|------------|------------|-------------|--------|

Subtotal Past Medical: $XX,XXX.XX

B) **Medical Expenses -- Future (UJI 13-1805)**

| Provider/Category | Projection Basis | Annual Cost | Duration | Total | Present Value | Status |
|-------------------|-----------------|-------------|----------|-------|--------------|--------|

Subtotal Future Medical: $XX,XXX.XX (present value: $XX,XXX.XX)

C) **Lost Wages / Earning Capacity (UJI 13-1827)**

| Type | Employer | Period | Rate | Amount | Present Value (if future) | Status |
|------|----------|--------|------|--------|--------------------------|--------|

Subtotal Past Lost Wages: $XX,XXX.XX
Subtotal Future Lost Wages (PV): $XX,XXX.XX

D) **Non-Economic Damages (UJI 13-1805)**
[Referenced from CFP -- not stored in DVP tables]
- Physical pain and suffering: [describe from CFP facts]
- Mental anguish: [describe from CFP facts]
- Loss of enjoyment of life: [describe from CFP facts]
- Disfigurement / physical impairment: [describe from CFP facts]

E) **Wrongful Death / Consortium (UJI 13-1806/1807)** (if applicable)

| Claimant | Role | WD Share | LOC Share | Other | Total |
|----------|------|----------|-----------|-------|-------|

Subtotal WD/Consortium: $XX,XXX.XX

F) **Lien Exposure**

| Lienholder | Type | Asserted | Negotiated | Final | Status | Priority |
|-----------|------|----------|------------|-------|--------|----------|

Total Lien Exposure (asserted): $XX,XXX.XX
Total Lien Exposure (best estimate): $XX,XXX.XX

G) **Settlement History** (if applicable)

| Date | Direction | Party | Amount | Stage | Response | Notes |
|------|-----------|-------|--------|-------|----------|-------|

H) **Comparable Outcomes** (if available)

| ID | Case Type | Severity | Venue | Resolution | Gross Amount | Comp. Fault | Year |
|----|-----------|----------|-------|------------|-------------|-------------|------|

---

I) **Damages Grand Total**

| Category | Amount |
|----------|--------|
| Past Medical Expenses | $XX,XXX.XX |
| Future Medical Expenses (PV) | $XX,XXX.XX |
| Past Lost Wages | $XX,XXX.XX |
| Future Lost Wages (PV) | $XX,XXX.XX |
| Non-Economic (not quantified -- jury determination) | [see CFP facts] |
| WD/Consortium | $XX,XXX.XX |
| **Gross Economic Subtotal** | **$XX,XXX.XX** |
| Lien Exposure (best estimate) | ($XX,XXX.XX) |
| **Net After Liens (economic)** | **$XX,XXX.XX** |

J) **Packet QA**
- Verified rows used: [count] ([%])
- Plausible rows used: [count]
- `[CITE NEEDED]` rows excluded: [count]
- Discrepancy rows excluded: [count]
- Present values computed: [Y/N -- list missing if N]
- Lien completeness: [all known lienholders represented? Y/N]
- Non-economic damages: [CFP facts available? Y/N]
```

## Consumer-Specific Adjustments

### For DC (Damages Calculator)

Include ALL categories with maximum granularity. DC needs line-item detail to
compute ranges and generate the damages framework. Include comparable outcomes
for calibration. Include non-economic damage facts from CFP for the multiplier
analysis.

### For DEMAND (Demand Letter)

Aggregate by category (not line-item). Attorney-facing presentation:
- Round dollar amounts to nearest dollar for display
- Emphasize total economic damages prominently
- Include lien net-down calculation
- Omit internal notes, conflict flags, and verification details
- Include only Verified rows (Plausible with `[VERIFICATION PENDING]` note)

### For SDC (Settlement Analysis)

Include settlement offer history and BATNA data. Show the full negotiation
trajectory. Include comparable outcomes for leverage. Include lien exposure
for net-to-client modeling.

### For CLOSING-ARGUMENT

Aggregate by UJI instruction category. Map each damages category to the
jury instruction the court will give. Include exhibit references for each
amount. Format for oral presentation (round numbers, clear categories).

## Common Filter Recipes

| Request | Filter |
|---------|--------|
| All past medical for demand | is_future=0, status=Verified/Plausible |
| Future medical with PV | is_future=1, present_value IS NOT NULL |
| Lien net-down | All liens, status != Waived/Expired |
| Settlement trajectory | All offers, chronological |
| NM venue comparables | dvp_outcomes WHERE jurisdiction IN ('NM', 'D.N.M.') |
| Catastrophic comparables | dvp_outcomes WHERE severity_tier = 'Catastrophic' |

## Amount Display Rules

- Store in INTEGER CENTS (123456 = $1,234.56)
- Display with dollar sign, comma separators, two decimal places
- Grand totals in bold
- Present values annotated: "$XX,XXX.XX (PV @ [rate]%)"
- Lien amounts shown as negative in net calculations
