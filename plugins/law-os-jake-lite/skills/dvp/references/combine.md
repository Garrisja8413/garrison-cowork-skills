# COMBINE Stage -- Reference (DVP v0.1)

Read this file when entering COMBINE mode.

## Purpose

Merge multiple partial DVP extractions into a unified DVP hub. This handles the
common scenario where billing records arrive from different providers at different
times, or where lien letters and wage records are extracted separately and need
to be unified into a single case-level damages picture.

## When to use

- User has run multiple DVP EXTRACT operations for the same case
- User says "combine damages", "merge DVP data", "consolidate billing"
- Multiple providers' billing records need to be unified for a single case
- Lien data and billing data need to be reconciled

## Workflow

### Step 1: Inventory Existing DVP Data

Query all DVP tables for the specified case_id via MCP:

```
mcp__law-os__query("SELECT COUNT(*) FROM dvp_medical_bills WHERE case_id = ?")
mcp__law-os__query("SELECT COUNT(*) FROM dvp_liens WHERE case_id = ?")
mcp__law-os__query("SELECT COUNT(*) FROM dvp_lost_wages WHERE case_id = ?")
mcp__law-os__query("SELECT COUNT(*) FROM dvp_settlement_offers WHERE case_id = ?")
mcp__law-os__query("SELECT COUNT(*) FROM dvp_outcomes WHERE case_id = ?")
mcp__law-os__query("SELECT COUNT(*) FROM dvp_wd_claimants WHERE case_id = ?")
```

Report current row counts per table.

### Step 2: Identify New Data to Merge

Compare the new source documents against existing rows:
- Same provider + same service_date + same cpt_code --> potential duplicate
- Same lienholder + same lien_type --> potential duplicate or update
- Same employer + overlapping period --> potential duplicate

### Step 3: Deduplication Rules

| Table | Duplicate Key | Action |
|-------|-------------|--------|
| dvp_medical_bills | provider_name + service_date + cpt_code + amount_billed | Skip if exact match exists |
| dvp_liens | lienholder + lien_type | Update if amount changed; keep both if genuinely different assertions |
| dvp_lost_wages | employer_name + period_start + period_end + loss_type | Skip if exact match; flag if amounts differ |
| dvp_settlement_offers | offer_date + direction + amount | Skip if exact match |
| dvp_outcomes | outcome_id | Skip if exists |
| dvp_wd_claimants | claimant_name + role | Update if amounts changed |

### Step 4: Handle Conflicts

When the same conceptual item has different amounts across sources:

1. **Medical bills:** If two billing records show different amounts for the same
   service, create BOTH rows with `CONFLICT -- see bill_id [X]` in notes of each.
   Never silently resolve billing conflicts.

2. **Liens:** If a lien amount changes (e.g., updated lien letter with new balance),
   update the existing row's amount_asserted and add a note documenting the change.
   If it is genuinely a different assertion (e.g., two different lienholders),
   create separate rows.

3. **Lost wages:** If different sources produce different wage calculations, create
   both rows with `CONFLICT` notes. The ENRICH stage will flag these for attorney
   resolution.

### Step 5: Cross-Provider Reconciliation

After merging, check for:
- **Overlapping treatment dates** across providers (not a conflict -- different providers)
- **Gap periods** where no treatment is documented (flag for investigation)
- **Total billed consistency** with any aggregate totals provided by the attorney

### Step 6: Write Merged Rows via MCP

Insert only non-duplicate rows. For updates (liens, WD claimants), use upsert.

### Step 7: Generate Combine Report

## Combine Report Format

```markdown
# DVP COMBINE Report
**Case:** [case_id]
**Date:** [date]

## Pre-Combine Inventory
| Table | Existing Rows | New Rows | Duplicates Skipped | Conflicts Flagged |
|-------|--------------|----------|-------------------|-------------------|

## Post-Combine Inventory
| Table | Total Rows | Total Amount (display) |
|-------|------------|----------------------|
| dvp_medical_bills | [N] | $XX,XXX.XX billed |
| dvp_liens | [N] | $XX,XXX.XX asserted |
| dvp_lost_wages | [N] | $XX,XXX.XX calculated |
| dvp_settlement_offers | [N] | [latest demand/offer] |
| dvp_outcomes | [N] | [range of comparables] |
| dvp_wd_claimants | [N] | $XX,XXX.XX total shares |

## Conflicts Requiring Resolution
| # | Table | Row ID | Conflict Description | Action Needed |
|---|-------|--------|---------------------|---------------|

## Provider Coverage
| Provider | Type | Date Range | Line Items | Total Billed |
|----------|------|------------|------------|-------------|

## Gap Analysis
- Treatment gaps: [any periods without treatment documentation]
- Missing providers: [providers mentioned in CFP but no billing records]
- Lien coverage: [lienholders mentioned but no lien amount recorded]

## Next Steps
[Run ENRICH to add UJI mapping, present values, and cross-references]
```

## Conflict Resolution Protocol

Conflicts are flagged but NEVER auto-resolved. The attorney must decide:

1. **Amount conflicts:** Which source is authoritative? The bill from the provider
   is generally more reliable than a summary from insurance.
2. **Date conflicts:** Which service date is correct? Cross-reference with CFP
   medical records.
3. **Lien conflicts:** Has the lien been updated, or are there truly two different
   assertions? Check dates and correspondence sequence.

After attorney resolution, update the appropriate rows via MCP and add resolution
notes documenting the decision.
