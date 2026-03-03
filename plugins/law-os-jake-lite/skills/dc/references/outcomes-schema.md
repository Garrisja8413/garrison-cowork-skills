# Outcomes Pack Schema — DC Reference

## Column Definitions

The Outcomes Pack is an Excel file with one row per resolved case.
Column order and controlled vocabulary must match exactly.

### Required Columns

| # | Column Name | Type | Controlled Vocab | Description |
|---|------------|------|-----------------|-------------|
| 1 | `OutcomeID` | String | Auto-generated | Unique row identifier |
| 2 | `CaseGroup` | String | SA picklist (KB 02) | Case group from SmartAdvocate |
| 3 | `CaseType` | String | SA picklist (KB 02) | Case type from SmartAdvocate |
| 4 | `Venue` | String | County name | County where case resolved |
| 5 | `Jurisdiction` | Code | NM / FED / D.N.M. | Court system |
| 6 | `SeverityTier` | Code | Minor / Moderate / Severe / Catastrophic / Death | Injury severity classification |
| 7 | `LiabilityTier` | Code | Strong / Moderate / Contested / Weak | Liability assessment |
| 8 | `CompFault` | Percentage | 0–100 | Comparative fault (defendant's position) |
| 9 | `ResolutionStage` | Code | Pre-Suit / Post-Suit / Mediation / Arbitration / Trial-Verdict / Trial-Settled | Stage at resolution |
| 10 | `ResolutionType` | Code | Settlement / Verdict-P / Verdict-D / MSJ / Dismissal | How case resolved |
| 11 | `GrossAmount` | Currency | — | Total gross recovery |
| 12 | `NetToClient` | Currency | — | Net to client after fees/costs |
| 13 | `PolicyLimits` | Currency | — | Policy limits (if known) |
| 14 | `MedicalBilled` | Currency | — | Total medical billed |
| 15 | `FeePercentage` | Percentage | — | Attorney fee percentage |
| 16 | `Costs` | Currency | — | Litigation costs |
| 17 | `Liens` | Currency | — | Total liens |
| 18 | `ResolutionDate` | Date | YYYY-MM | Month/year of resolution |

### Optional Columns (Strengthen Analysis)

| # | Column Name | Type | Description |
|---|------------|------|-------------|
| 19 | `Judge` | String | Assigned judge (if relevant) |
| 20 | `DefenseCounsel` | String | Defense firm (if relevant) |
| 21 | `Insurer` | String | Insurance carrier |
| 22 | `InjuryType` | String | Primary injury description |
| 23 | `TreatmentDuration` | String | Length of treatment (months) |
| 24 | `Surgery` | Code | Y/N | Whether surgery was performed |
| 25 | `PermanentImpairment` | Code | Y/N | Whether permanent impairment |
| 26 | `WrongfulDeath` | Code | Y/N | Wrongful death case |
| 27 | `LossOfConsortium` | Code | Y/N | LOC claim included |
| 28 | `PunitivesDemanded` | Code | Y/N | Punitive damages sought |
| 29 | `ExpertRetained` | Code | Y/N | Expert witness retained |
| 30 | `Notes` | String | Free text — sanitized, no PII |

---

## Controlled Vocabulary

### SeverityTier

| Code | Definition |
|------|-----------|
| `Minor` | Soft tissue, resolved within 6 months, no surgery, no permanent impairment |
| `Moderate` | Significant injury, treatment >6 months, possible surgery, partial recovery |
| `Severe` | Major injury, surgery required, permanent impairment, life-altering impact |
| `Catastrophic` | TBI, spinal cord, amputation, permanent disability, requires ongoing care |
| `Death` | Wrongful death case |

### LiabilityTier

| Code | Definition |
|------|-----------|
| `Strong` | Clear liability, minimal comparative fault exposure |
| `Moderate` | Liability likely but some defense arguments, comp fault <25% |
| `Contested` | Genuine dispute on liability, comp fault 25–50% |
| `Weak` | Significant liability challenges, comp fault >50% or causation issues |

### ResolutionStage

| Code | Definition |
|------|-----------|
| `Pre-Suit` | Resolved before filing complaint |
| `Post-Suit` | Resolved after filing but before mediation/trial |
| `Mediation` | Resolved at or after mediation |
| `Arbitration` | Resolved through binding arbitration |
| `Trial-Verdict` | Resolved by jury or bench trial verdict |
| `Trial-Settled` | Settled during or after trial (before verdict) |

### ResolutionType

| Code | Definition |
|------|-----------|
| `Settlement` | Negotiated resolution |
| `Verdict-P` | Plaintiff verdict |
| `Verdict-D` | Defense verdict |
| `MSJ` | Resolved by summary judgment |
| `Dismissal` | Dismissed (voluntary or involuntary) |

---

## Sanitization Rules for Outcomes Pack

When extracting or entering data:

1. **No plaintiff names** — use OutcomeID or case type descriptor
2. **No full DOB** — year only if needed for age context
3. **No SSN/TIN/MRN** — never include
4. **No addresses** — county/venue is sufficient
5. **Resolution date** — month/year only (YYYY-MM)
6. **Notes field** — sanitized, no PII, no narrative copy from source documents
7. **Defense counsel / insurer** — include only if relevant to analysis; omit
   if firm relationship concerns exist

---

## QA Rules (for OUTCOMES-QA Mode)

### Critical (Must Fix)
- Required column missing or empty
- CaseGroup or CaseType not in controlled vocabulary
- Duplicate OutcomeID
- GrossAmount = 0 or negative (unless Verdict-D or Dismissal)
- NetToClient > GrossAmount
- CompFault > 100 or < 0
- FeePercentage > 50 or < 0
- ResolutionDate in future

### Warning (Should Fix)
- Optional columns mostly empty (>50% blank)
- GrossAmount outlier (>3 SD from median for CaseType)
- MedicalBilled = 0 for injury case
- ResolutionDate > 5 years old without context
- SeverityTier inconsistent with MedicalBilled amount
- LiabilityTier inconsistent with CompFault percentage
- PolicyLimits < GrossAmount (potential excess recovery or data error)
