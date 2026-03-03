---
name: dvp
display_name: "Damages Valuation Pack Builder"
description: >-
  Damages Valuation Pack (DVP) Builder for Law-OS. Builds structured damages
  packs from medical bills, liens, lost wages, settlement history, and
  verdict/settlement comparables. Feeds DC, SDC, and demand drafting. Runs in
  four stages: EXTRACT, ENRICH, VERIFY, PACKET. TRIGGERS: "DVP", "damages
  pack", "medical bills", "build damages", "lien tracking", "lost wages",
  "settlement history", "outcome comparables", "damages valuation", "wrongful
  death allocation" (v1.0)
version: "1.0"
category: builder
pack_consumes:
  - CFP
  - LPB
pack_produces:
  - DVP pack
checkpoints: 0
author: "Parnall & Adams"
license: Proprietary
---

## Pack Dependencies
**Consumes:**
- CFP (medical evidence, treatment records, provider documentation)
- LPB (damages standards, UJI references, lien priority authorities)

**Produces:**
- DVP pack (structured damages valuation for DC, SDC, and settlement workflows)

# DVP (Damages Valuation Pack Builder) -- v1.0

## Purpose

Build a litigation-ready damages valuation pack by extracting, structuring,
and verifying all economic and non-economic damages data for a personal
injury case. The DVP is the **financial backbone** of every settlement
demand, mediation brief, and trial damages presentation.

Without a DVP, the DC (Damages Calculator) and SDC (Settlement Deposition
Counsel) skills operate on incomplete data. The DVP ensures every dollar
claimed traces to a source document, every lien is accounted for, and
every settlement offer is contextualized within the negotiation history.

## Architecture

```
Source Documents                  DVP Hub (SQLite)               Downstream
+-----------------+         +-------------------------+     +------------------+
| Medical Bills   |         | dvp_medical_bills       |     | DC (Calculator)  |
| Lien Letters    | EXTRACT | dvp_liens               |     | SDC (Settlement) |
| Wage Records    | ------> | dvp_lost_wages          | --> | Demand Letters   |
| Settlement Corr |         | dvp_settlement_offers   |     | Mediation Briefs |
| Prior Verdicts  |         | dvp_outcomes            |     | Trial Damages    |
+-----------------+         | dvp_wd_claimants        |     +------------------+
       |                    +-------------------------+            |
       |                         |           |                     |
   CFP (medical     ENRICH: UJI mapping,   VERIFY: source-      PACKET:
   evidence refs)   present value calc,    check amounts,       dvp_damages_summary
                    lien priority          flag discrepancies   VIEW assembly
```

## Modes / Stages

| Mode | Stage | Input | Output | Reference |
|------|-------|-------|--------|-----------|
| **EXTRACT** | 1 | Billing records, lien letters, wage docs, settlement letters | DVP rows in SQLite via MCP | `references/extract.md` |
| **COMBINE** | 1 | Multiple partial DVP extractions | Unified DVP hub rows with dedup | `references/combine.md` |
| **ENRICH** | 2 | DVP extract rows + CFP medical evidence + LPB damages law | Enriched rows: UJI mapping, present value, CFP cross-refs | `references/enrich.md` |
| **VERIFY** | 3 | Enriched DVP rows | Verified rows: amounts confirmed, discrepancies flagged | `references/verify.md` |
| **PACKET** | Any | DVP hub queries | Filtered damages packet for DC, SDC, demand, or mediation | `references/packet.md` |

**How to pick a mode:**
- User uploads medical bills or billing summaries --> **EXTRACT** (dvp_medical_bills)
- User uploads lien letters or lien spreadsheets --> **EXTRACT** (dvp_liens)
- User uploads wage verification or tax returns --> **EXTRACT** (dvp_lost_wages)
- User provides settlement offer/demand history --> **EXTRACT** (dvp_settlement_offers)
- User wants UJI categorization and present value --> **ENRICH**
- User wants amounts verified against source docs --> **VERIFY**
- User needs damages summary for DC or SDC --> **PACKET**

## Hard Rules

1. **Never invent** dollar amounts, dates of service, provider names, lien amounts, wage rates, or settlement figures.
2. **All currency in INTEGER CENTS.** $1,234.56 = 123456. No floating-point. No exceptions.
3. **Amount billed is the primary number** per firm policy. Amount paid and adjusted are INFO ONLY.
4. Missing source document --> `[CITE NEEDED]` in cfp_doc_id. Missing pinpoint --> `[PINPOINT NEEDED]`.
5. **One row per line item.** A single provider visit with 5 CPT codes = 5 rows in dvp_medical_bills.
6. **Preserve conflicts.** If two documents show different amounts for the same service, create both rows with `CONFLICT` in notes.
7. **Never skip stages.** EXTRACT first, then ENRICH, then VERIFY.
8. Lien amounts: always record amount_asserted. Do NOT populate amount_negotiated or amount_final unless the source document confirms the negotiated/final figure.
9. **Future damages require projection_basis.** Every row with is_future=1 MUST have a non-null projection_basis citing the expert or method.
10. **Present value calculations require discount_rate source.** Never assume a discount rate -- it must come from an economist report or court standard.
11. **Settlement offers: direction matters.** Demand = our side, Offer = their side, Counter = response to prior, Mediator = mediator's proposal.
12. **Outcomes data is sanitized.** Never include identifying details from prior cases in dvp_outcomes. No party names, case numbers, or attorney names from the source firm's cases.

## Required Inputs

### For EXTRACT (Medical Bills)
```xml
<dvp_extract_request>
  <mode>EXTRACT</mode>
  <target_table>dvp_medical_bills</target_table>
  <case_id>2025-CV-00456</case_id>
  <source_documents>
    <document doc_id="MED-001" type="billing_summary">
      <!-- uploaded billing record -->
    </document>
  </source_documents>
</dvp_extract_request>
```

### For EXTRACT (Liens)
```xml
<dvp_extract_request>
  <mode>EXTRACT</mode>
  <target_table>dvp_liens</target_table>
  <case_id>2025-CV-00456</case_id>
  <source_documents>
    <document doc_id="LIEN-001" type="lien_letter">
      <!-- uploaded lien correspondence -->
    </document>
  </source_documents>
</dvp_extract_request>
```

### For ENRICH
```xml
<dvp_enrich_request>
  <mode>ENRICH</mode>
  <case_id>2025-CV-00456</case_id>
  <cfp_reference>CFP-Verified-Case456.xlsx</cfp_reference>
  <lpb_reference>LP-Verified-DamagesLaw.xlsx</lpb_reference>
</dvp_enrich_request>
```

### For PACKET
```xml
<dvp_packet_request>
  <mode>PACKET</mode>
  <case_id>2025-CV-00456</case_id>
  <packet_type>settlement_demand</packet_type>
  <!-- Options: settlement_demand, mediation_brief, dc_input, sdc_input, trial_damages -->
</dvp_packet_request>
```

## Output Contract (every response)

### 1) Mode + Scope Statement
What mode, what table(s), what case, what stage.

### 2) Work Product
- EXTRACT: Row counts per table written via MCP, with source document references.
- ENRICH: Updated row counts, UJI mappings applied, present values computed.
- VERIFY: Verification report with discrepancy flags and confidence scores.
- PACKET: Filtered damages packet in markdown or XML format.

### 3) QA Summary
- Row counts per table (dvp_medical_bills, dvp_liens, dvp_lost_wages, etc.)
- Total billed amount (cents, converted to dollars for display)
- Total lien exposure (asserted vs. negotiated vs. final)
- `[CITE NEEDED]` count
- `CONFLICT` count
- Future vs. past damages split

### 4) Next Steps
Exactly what to do next: "Run ENRICH to add UJI mapping" or "Run VERIFY to confirm amounts against source records" etc.

## Integration Points

| System | How DVP Connects |
|--------|-----------------|
| **CFP** | dvp_medical_bills.cfp_doc_id --> cfp_file_metadata.doc_id. Medical evidence cross-reference. |
| **LPB** | DVP ENRICH uses LPB for UJI damages standards (UJI 13-1805, 13-1806, 13-1807). |
| **DC** | DVP PACKET (type=dc_input) feeds the Damages Calculator with structured amounts. |
| **SDC** | DVP PACKET (type=sdc_input) feeds Settlement Deposition Counsel with damages + settlement history + comparables. |
| **FIN** | dvp_damages_summary VIEW feeds fin_settlement_model VIEW for net-to-client computation. |
| **PCM** | dvp_medical_bills.element_id + dvp_lost_wages.element_id --> PCM proof mapping for damages elements. |
| **PRC** | PRC tracks record procurement; DVP consumes the received records. PRC.doc_id --> CFP --> DVP.cfp_doc_id. |
| **SmartAdvocate** | Settlement offers mirror SA negotiation log. Save per SA Save Map: Cases --> Damages tab. |
| **Demand Letters** | DVP PACKET (type=settlement_demand) provides the damages evidence layer for demand drafting. |

## DVP Tables Quick Reference

| Table | Rows Represent | Key Columns | Stage Created |
|-------|---------------|-------------|---------------|
| `dvp_medical_bills` | One per billing line item per provider | provider_name, service_date, amount_billed, provider_type, is_future | EXTRACT |
| `dvp_liens` | One per lien asserted | lienholder, lien_type, amount_asserted, status | EXTRACT |
| `dvp_lost_wages` | One per loss period or projection | loss_type, period_start/end, amount_calculated, is_future | EXTRACT |
| `dvp_settlement_offers` | One per offer/demand/counter | direction, offering_party, amount, stage, momentum_at_offer | EXTRACT |
| `dvp_outcomes` | One per historical comparable outcome | case_type, severity_tier, resolution_type, gross_amount | EXTRACT (seeded) |
| `dvp_wd_claimants` | One per wrongful death/consortium claimant | claimant_name, role, wd_share_cents, loc_share_cents | EXTRACT |

## Controlled Vocabulary

### Provider Types
`Hospital`, `Physician`, `Specialist`, `Surgeon`, `Physical-Therapy`, `Mental-Health`, `Pharmacy`, `Imaging`, `DME`, `Ambulance`, `Other`

### Lien Types
`Health-Insurance`, `Medicare`, `Medicaid`, `ERISA`, `VA`, `Workers-Comp`, `Hospital`, `Child-Support`, `Attorney`, `Government`, `Other`

### Loss Types
`Past-Lost-Wages`, `Future-Lost-Wages`, `Past-Earning-Capacity`, `Future-Earning-Capacity`, `Loss-of-Services`, `Loss-of-Support`

### Settlement Stages
`Pre-Suit`, `Post-Suit`, `Mediation`, `Arbitration`, `Trial-Pending`, `Post-Trial`

### Severity Tiers (Outcomes)
`Minor`, `Moderate`, `Severe`, `Catastrophic`, `Death`

## Reference Files

- `references/extract.md` -- EXTRACT stage: table schemas, MCP write patterns, source document parsing
- `references/combine.md` -- COMBINE stage: deduplication logic, multi-source merge
- `references/enrich.md` -- ENRICH stage: UJI mapping, present value computation, CFP cross-reference
- `references/verify.md` -- VERIFY stage: amount validation, discrepancy detection, lien priority check
- `references/packet.md` -- PACKET mode: filtered output templates for DC, SDC, demand, mediation
