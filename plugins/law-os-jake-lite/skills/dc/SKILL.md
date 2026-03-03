---
name: dc
display_name: "Damages Calculator"
description: >-
  Damages Calculator (DC) — plaintiff-side damages valuation, settlement
  evaluation, WD allocation, outcomes data management. 7 modes: DAMAGES,
  DAMAGES-ARGUMENT, WD-ALLOCATE, SETTLEMENT-EVAL, OUTCOMES-EXTRACT,
  OUTCOMES-QA, OUTCOMES-COMBINE. Consumes CFP + LPB + Outcomes Pack. TRIGGERS:
  "damages", "DC", "jury value", "settlement evaluation", "settlement range",
  "demand number", "walk-away", "wrongful death allocation", "WD allocate",
  "loss of consortium", "outcomes pack", "outcomes extract", "outcomes QA",
  "comparable cases", "damages argument", "valuation", "case value",
  "settlement analysis", or uploads documents for damages/settlement
  evaluation. Not for discovery (gfl/mtc), pleadings (adr), or motions (msj)
  (v1.0)
version: "1.0"
category: analysis
pack_consumes:
  - CFP
  - LPB
  - Outcomes Pack (optional)
pack_produces:
  - DC damages analysis
checkpoints: 0
author: "Parnall & Adams"
license: Proprietary
---

## Pack Dependencies
**Produces:**
- DC damages analysis (valuation, settlement ranges, WD allocation)

# DC (Damages Calculator) — v1.0

## What This Skill Does

Provides internal decision-support analysis for plaintiff-side case valuation.
All output is **draft analysis for attorney review** — not client-facing
and not filing-ready unless combined with a drafting skill (e.g., DAMAGES-ARGUMENT
mode output fed into a demand letter or mediation statement shell).

This skill handles six distinct analytical tasks across 7 modes:
1. Jury-value damages ranges by category (DAMAGES)
2. Persuasive damages narrative drafting (DAMAGES-ARGUMENT)
3. Settlement evaluation with demand/walk-away numbers (SETTLEMENT-EVAL)
4. Global settlement allocation among multiple claimants (WD-ALLOCATE)
5. Outcomes Pack row extraction from documents (OUTCOMES-EXTRACT)
6. Outcomes Pack quality assurance (OUTCOMES-QA)
7. Outcomes Pack combination (OUTCOMES-COMBINE)

## Architecture: Pack-First, Analysis-First

```
CFP PACKET (evidence) ──┐
                         ├── DC Skill ──► Tables + Ranges + Narrative
LPB PACKET (UJI/law) ───┘                + Quality Gate + Open Items
Outcomes Pack (Excel) ───── optional ──► Settlement comparables
```

## Hard Rules

1. **No invention (facts, law, or numbers).** Never invent facts (dates, medical,
   charges, prognosis), quotes, legal standards/caps/multipliers, or allocation
   percentages. Missing support → `CITE NEEDED`, `PINPOINT NEEDED`, `[VERIFY]`,
   or `[VERIFY-CITE]`.
2. **Medical specials = amounts billed (firm rule).** Medical expense line items
   default to amounts billed / gross charges. Paid/adjusted/write-off amounts
   are INFO ONLY unless instructed otherwise.
3. **Confidentiality / sanitization.** No addresses, full DOBs, SSNs/TINs, MRNs,
   or high-risk identifiers in reusable rows. DOB year only if needed. Minors'
   initials. Last-4 for accounts.
4. **Controlled vocabulary.** Case Group and Case Type must match SmartAdvocate
   picklists exactly (KB file 02). Damages categories must match the firm's
   controlled list.
5. **Direct-Output (when drafting for templates).** Output BODY-ONLY text — no
   letterhead, caption, signature, COS blocks. Preserve merge tokens exactly.
6. **Conflicts stay visible.** If sources conflict, preserve both, flag the
   conflict, do not pick the winner.
7. **Source-matched certainty.** Use "reported" vs "diagnosed," "records state"
   vs "proved," etc. Match language to evidentiary support level.
8. **Token fail-safe.** If output is extensive, chunk: Part 1 = core tables/analysis,
   Part 2 = narrative, Part 3 = Quality Gate + Open Items.

## Required Inputs (Varies by Mode)

### Minimum for All Modes
- Case Group + Case Type (SA picklist values)
- Classification flags:
  - Wrongful death (Y/N)
  - Loss of consortium (Y/N)
  - Consumer/UPA/bad-faith statutory components (Y/N)
  - Med-mal cap risk (Y/N — do not state cap numbers unless user provides verified values)

### Mode-Specific Inputs

See `references/modes.md` for detailed input requirements per mode.

### If Inputs Are Missing

Use guided wizard behavior: confirm MODE, confirm classification and flags,
collect minimum numbers + factual anchors, then produce outputs.
Ask only what you need next. Do not front-load unnecessary questions.

## Modes

| Mode | Goal | Key Output |
|------|------|-----------|
| **DAMAGES** | Jury-value ranges (Low/Mid/High) by category | Damages calculation table + subtotals |
| **DAMAGES-ARGUMENT** | BODY-ONLY persuasive narrative sections | Theme options + story outline + narrative paragraphs |
| **WD-ALLOCATE** | Global settlement allocation among claimants | Claimant jury-value table + allocation table |
| **SETTLEMENT-EVAL** | Expected range + demand + walk-away | Settlement range + anchoring rationale |
| **OUTCOMES-EXTRACT** | One sanitized Outcomes Pack row | Row in Outcomes Pack schema + missing fields |
| **OUTCOMES-QA** | QA on Outcomes Pack Excel | Findings (Critical/Warning) + proposed fixes |
| **OUTCOMES-COMBINE** | Merge multiple Outcomes Packs | Combined pack + dedup report + QA |

## Pack Locations (v1.1)

**Read CFP from:** `cases/{CASE_CODE}/cfp/`
**Read LP from:** `law-packs/`
**Read Outcomes Pack from:** `cases/{CASE_CODE}/outcomes/`
**Save Outcomes Pack to:** `cases/{CASE_CODE}/outcomes/`
**Save analysis output to:** `cases/{CASE_CODE}/drafts/`

## UJI Damages Elements Checklist

### Personal Injury — UJI 13-1802 + Elements

Track these elements as a checklist in DAMAGES mode:

- UJI 13-1803: Physical pain and suffering (past/future)
- UJI 13-1804: Mental anguish (past/future)
- UJI 13-1805: Medical expenses (past/future — amounts billed)
- UJI 13-1806: Lost earnings / earning capacity (past/future)
- UJI 13-1807: Loss of enjoyment of life / impairment
- UJI 13-1808: Disfigurement
- UJI 13-1809: Property damage
- UJI 13-1810A: Aggravating circumstances / punitive damages (when supported)

### Wrongful Death — UJI 13-1830 Categories

- Economic losses (support, services, contributions)
- Value of life (relationship, companionship, guidance)
- Optional: emotional distress of statutory beneficiaries (when supported)

All UJI references are structural checklists. Do not state legal
standards/caps/multipliers unless user provides verified values or a
Law Pack row with pinpoints. Any legal statement without verified support
→ `[VERIFY-CITE]`.

## Output Contract (Required Order — All Modes)

1. **Assumptions & Inputs** (including "medical billed" rule statement)
2. **Tables / Calculations** (totals shown; math step-by-step)
3. **Narrative** (only if mode requires it; BODY-ONLY by default)
4. **Quality Gate** (pass/fail + fix list)
5. **Open Items** (`[VERIFY]`, `[VERIFY-CITE]`, `CITE NEEDED`, `PINPOINT NEEDED`)
6. **SmartAdvocate Save Notes** (suggested category/name)

## Redaction Baseline

For anything filed or shared, do not include:
- SSN/TIN except last 4
- Full DOB (year only if needed)
- Minor names (initials only)
- Financial account numbers except last 4
- MRNs or other medical identifiers

If the packet includes sensitive identifiers, remind the user to redact
before filing.

## Integration Points

| System | How DC Connects |
|--------|----------------|
| **CFP** | DC consumes CFP PACKET for evidence (medical records, economic data, witness statements). DAMAGES mode needs medical/economic facts; DAMAGES-ARGUMENT needs narrative facts. |
| **LPB** | DC consumes LPB PACKET for UJI element structure and verified legal standards. Required for DAMAGES and DAMAGES-ARGUMENT modes when citing law. |
| **Outcomes Pack** | DC reads/writes Outcomes Pack Excel files. SETTLEMENT-EVAL consumes comparables. OUTCOMES-EXTRACT produces rows. OUTCOMES-QA validates data quality. |
| **GFL/MTC** | No direct connection. DC identifies discovery gaps (`[FACT-GAP]`) that may trigger targeted discovery requests. |
| **ADR** | No direct connection. ADR may identify deemed-admitted facts that DC can use as established. |
| **SA** | Save per Save Map. Damages analysis → Case Valuation. Settlement eval → Settlement History. |

## Reference Files

- `references/modes.md` — detailed input/output specs for each mode
- `references/damages-categories.md` — NM damages taxonomy, UJI element mapping, calculation frameworks
- `references/outcomes-schema.md` — Outcomes Pack column definitions and controlled vocabulary
