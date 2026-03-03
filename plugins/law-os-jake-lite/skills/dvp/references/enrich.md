# ENRICH Stage -- Reference (DVP v0.1)

Read this file when entering ENRICH mode.

## Purpose

Add UJI damages taxonomy mapping, present value computations, CFP cross-references,
and PCM element linkage to existing DVP rows. This stage does NOT extract new data --
it annotates and computes on what EXTRACT produced.

## When to use

- User has DVP rows from EXTRACT or COMBINE
- User says "enrich DVP", "add UJI mapping", "compute present value", "categorize damages"
- Before running DC (Damages Calculator) or generating a demand letter

## Workflow

### Step 1: Query Existing DVP Data

Load current DVP rows for the case via MCP. Inventory row counts per table
and identify rows missing enrichment fields (uji_reference, element_id,
present_value for future items).

### Step 2: Map to UJI Damages Taxonomy

For each row in dvp_medical_bills, dvp_lost_wages:

| Condition | UJI Reference | Category |
|-----------|--------------|----------|
| dvp_medical_bills WHERE is_future = 0 | UJI 13-1805 | Past Medical Expenses |
| dvp_medical_bills WHERE is_future = 1 | UJI 13-1805 | Future Medical Expenses |
| dvp_lost_wages WHERE loss_type = 'Past-Lost-Wages' | UJI 13-1827 | Past Lost Earnings |
| dvp_lost_wages WHERE loss_type = 'Future-Lost-Wages' | UJI 13-1827 | Future Lost Earnings |
| dvp_lost_wages WHERE loss_type = 'Past-Earning-Capacity' | UJI 13-1827 | Past Earning Capacity |
| dvp_lost_wages WHERE loss_type = 'Future-Earning-Capacity' | UJI 13-1827 | Future Earning Capacity |
| dvp_lost_wages WHERE loss_type = 'Loss-of-Services' | UJI 13-1830 | Wrongful Death (if applicable) |
| dvp_lost_wages WHERE loss_type = 'Loss-of-Support' | UJI 13-1830 | Wrongful Death (if applicable) |

**Additional UJI categories (mapped from CFP, not directly in DVP tables):**
- UJI 13-1805: Physical pain and suffering (past and future)
- UJI 13-1805: Mental anguish and emotional distress
- UJI 13-1805: Loss of enjoyment of life
- UJI 13-1805: Disfigurement and physical impairment
- UJI 13-1806: Damages for wrongful death
- UJI 13-1807: Damages for loss of consortium

Note: Pain and suffering, mental anguish, and loss of enjoyment are not
stored in DVP tables (they are non-economic, argued from CFP facts). DVP
enrichment populates the UJI references so DC can access the taxonomy.

### Step 3: Cross-Reference CFP Medical Evidence

For each row in dvp_medical_bills where cfp_doc_id is populated:

1. Query CFP: `SELECT doc_id, title, type FROM cfp_file_metadata WHERE doc_id = ?`
2. Verify the CFP document exists and is categorized as medical/billing
3. If CFP facts exist about this treatment: note the CFP Fact#s in notes
4. If cfp_doc_id = `[CITE NEEDED]`: flag for resolution

### Step 4: Link to PCM Elements

For each damage category, identify the corresponding PCM element_id:

1. Query PCM for damages-related elements: `SELECT element_id, element_name FROM pcm_elements WHERE claim_id LIKE '%damages%' OR element_name LIKE '%damages%'`
2. Map DVP rows to the appropriate element_id
3. Update the element_id column via MCP

This linkage enables the pcm_gap_analysis VIEW to show proof status for
damages elements based on DVP data availability.

### Step 5: Compute Present Values (Future Damages)

For rows where is_future = 1 AND present_value is NULL:

**Present value formula:**
```
present_value = future_amount / (1 + discount_rate) ^ years_to_receipt
```

**Rules:**
- discount_rate MUST come from an economist report or court standard.
  Never assume a discount rate.
- If no discount_rate is available: set present_value = NULL and note
  `[DISCOUNT RATE NEEDED -- consult economist]`.
- If the economist provides a net discount rate (discount rate minus
  wage growth), use that directly.
- All computations in INTEGER CENTS. Round at the final step only.

### Step 6: Classify Lien Priority

For rows in dvp_liens where priority is NULL:

Standard lien priority order (NM):
1. Attorney liens (NMSA 36-2-11)
2. Hospital liens (NMSA 48-8-1)
3. Medicare/Medicaid (federal super-lien -- 42 USC 1395y(b))
4. ERISA health plans (depends on plan language -- check anti-subrogation)
5. Health insurance (contractual subrogation)
6. Workers' compensation
7. Government liens (child support, VA)

**Important:** Priority depends on specific facts and plan language.
Populate the priority column only when the attorney confirms the order.
Otherwise, leave NULL and note `[PRIORITY -- attorney review needed]`.

### Step 7: Enrich Settlement Offers Context

For rows in dvp_settlement_offers:
- Add momentum_at_offer if not populated (brief case posture description)
- Cross-reference with prior offers to establish the negotiation trajectory
- Compute offer-to-offer movement percentages in notes

### Step 8: Save Enriched Data + Report

Update rows via MCP with enrichment fields populated.

## QA Summary (end of ENRICH)

Report:
- Rows enriched per table
- UJI mapping coverage: [N] of [M] rows mapped ([%])
- Element_id coverage: [N] of [M] rows linked to PCM
- Present values computed: [N] rows, total present value: $X,XXX.XX
- CFP cross-references verified: [N] of [M] rows linked
- `[CITE NEEDED]` remaining: [count]
- `[DISCOUNT RATE NEEDED]` count
- `[PRIORITY -- attorney review needed]` count
- "Next: Run VERIFY to validate amounts against source documents"
