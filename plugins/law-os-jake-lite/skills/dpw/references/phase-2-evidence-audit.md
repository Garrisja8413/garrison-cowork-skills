# DPW Phase 2: Evidence & Economic Audit — Reference

## Purpose

Build the bulletproof financial baseline. Adjusters use missing records or
unresolved liens to justify zero-dollar evaluations. This phase ensures every
medical record is accounted for, every lien is identified, and every economic
loss is documented before the demand amount is calculated.

Phase 2 has three sub-steps that must all pass before proceeding to Phase 3:
- Step 2: The "Zero Balance" Medical Audit (PI/Med Mal)
- Step 3: Lien Resolution Prep
- Step 4: Hard Costs & Wage Loss Verification

---

## Part 1: The "Zero Balance" Medical Audit (Step 2)

### 1.1 Purpose

The Demand Paralegal cross-references the client's treatment timeline against
the file to ensure absolute completeness. The goal is **zero balance** — no
missing records, no missing bills, no gaps in the medical chronology that an
adjuster can exploit.

### 1.2 Cross-Reference Methodology

For every provider in the treatment timeline:

| Document Type | What to Check | Common Gaps |
|--------------|---------------|-------------|
| **Office visit records** | All visits documented from first to last | Gaps between visits (did patient skip appointments?) |
| **ER records** | Facility records AND physician records | ER physician bills are often separate from facility bills |
| **Imaging reports** | Radiology report AND actual imaging disc | We may have the report but not the disc (needed for trial) |
| **Surgical records** | Op notes + anesthesia records + path reports | Anesthesia is always billed separately |
| **PT/Chiro records** | Initial eval + progress notes + discharge | High-frequency visits — easy to miss individual notes |
| **Pharmacy records** | Prescription history | Needed to prove medication usage and costs |
| **DME records** | Equipment orders + receipts | Braces, wheelchairs, home modifications |

### 1.3 Billing Verification

For every medical provider, verify:

| Billing Item | Requirement | Why It Matters |
|-------------|-------------|----------------|
| **Final billing ledger** | Exact CPT codes and gross charges | Adjusters reduce claims to CPT codes — must match |
| **Gross charges (not co-pays)** | Full billed amount before insurance adjustments | Demand presents gross charges; co-pay amounts understate damages |
| **Itemized statement** | Line-by-line breakdown | Lump-sum bills are routinely challenged |
| **Provider tax ID / NPI** | On all billing records | Required for lien verification and subrogation |

### 1.4 Gap Identification Protocol

When a gap is identified:

1. **Document the gap** in the Evidence Audit Report
2. **Assign responsibility** — who will request the missing record?
3. **Set a deadline** — calendar a follow-up in CAL (typically 14 days)
4. **Escalate if necessary** — if the provider is non-responsive after 2 attempts,
   issue a formal records request under state law (HIPAA-compliant authorization
   or subpoena if in litigation)

### 1.5 Medical Audit Checklist Template

```
MEDICAL RECORDS AUDIT — [CASE_CODE]
====================================

| # | Provider | Type | Records | Bills | Imaging | Ledger | Status | Gap Action |
|---|----------|------|---------|-------|---------|--------|--------|------------|
| 1 | [name] | ER | ✓/✗ | ✓/✗ | ✓/✗/NA | ✓/✗ | COMPLETE/GAP | [action] |
| 2 | [name] | Ortho | ✓/✗ | ✓/✗ | ✓/✗/NA | ✓/✗ | COMPLETE/GAP | [action] |
| ... | | | | | | | | |

TOTAL PROVIDERS: [n]
COMPLETE: [n]
GAPS: [n]
AUDIT STATUS: [PASS / GAPS REMAIN]
```

---

## Part 2: Lien Resolution Prep (Step 3)

### 2.1 Purpose

A lawyer can face severe bar complaints for disbursing settlement funds without
satisfying statutory liens. This step ensures every lien is identified and every
lien holder has provided a final ledger balance BEFORE the demand is sent —
not after settlement when the clock is ticking on disbursement.

### 2.2 Lien Categories and Resolution Requirements

#### Government Liens (Mandatory — Statutory Priority)

| Lien Type | Source | How to Procure Ledger | Timeline | Critical Notes |
|-----------|--------|----------------------|----------|----------------|
| **Medicare** | CMS portal (MSPRC) | Submit query to MSPRC with case details; request conditional payment letter | 60-120 days | START EARLY — Medicare liens take months. File the query the moment treatment begins, not at demand time. |
| **Medicaid** | State Medicaid agency | Submit third-party liability notification; request lien balance | 30-90 days | State-specific process. NM HSD has its own claim form. |
| **VA / Tricare** | VA/Tricare regional office | Submit notice of potential third-party recovery | 30-60 days | Federal super-lien — cannot be negotiated down without federal authority. |
| **Indian Health Service** | IHS regional office | Federal Medical Care Recovery Act (42 USC §2651) | 30-90 days | Often overlooked in NM — check if client received any IHS care. |

#### Health Insurance Liens

| Lien Type | Source | How to Evaluate | Critical Notes |
|-----------|--------|-----------------|----------------|
| **Private health plan** | Insurance EOBs | Request Summary Plan Description (SPD) | Check SPD for subrogation clause. Many plans claim subrogation but lack contractual or statutory authority. |
| **Self-funded ERISA plan** | Employer plan documents | Request SPD + plan document | ERISA plans have strong federal preemption. Check for "make whole" vs. "first dollar" reimbursement language. FMC Corp v. Holliday, 498 U.S. 52 (1990). |
| **Managed care / HMO** | Plan documents | State anti-subrogation statutes may apply | NM has limitations on health insurer subrogation — check NMSA §59A-22-34. |

#### Letters of Protection (LOPs)

| Item | Requirement |
|------|-------------|
| **Tally all LOP balances** | Contact each LOP provider for current balance |
| **Verify LOP terms** | Confirm the LOP is payable from settlement proceeds only |
| **Negotiate reductions** | LOP providers often accept reduced amounts — document negotiations |
| **Calendar LOP deadlines** | Some LOPs have payment deadlines post-settlement |

### 2.3 Lien Resolution Checklist Template

```
LIEN RESOLUTION STATUS — [CASE_CODE]
======================================

| # | Lien Type | Entity | Amount | Final Ledger | Status | Action |
|---|-----------|--------|--------|--------------|--------|--------|
| 1 | Medicare | MSPRC | $[amt] | ✓/✗ | RESOLVED/PENDING | [action] |
| 2 | Medicaid | NM HSD | $[amt] | ✓/✗ | RESOLVED/PENDING | [action] |
| 3 | BCBS PPO | [plan] | $[amt] | ✓/✗ | RESOLVED/PENDING | [action] |
| 4 | LOP | Dr. [name] | $[amt] | ✓/✗ | RESOLVED/PENDING | [action] |
| ... | | | | | | |

TOTAL LIEN EXPOSURE: $[total]
FINAL LEDGERS RECEIVED: [n] of [n]
LIEN STATUS: [ALL RESOLVED / PENDING]
```

### 2.4 Malpractice Trap Warning

**CRITICAL:** Disbursing settlement funds without satisfying statutory liens is
one of the most common sources of attorney disciplinary action. The following
rules are non-negotiable:

1. **Medicare liens must be satisfied or properly resolved** before any
   disbursement. The Medicare Secondary Payer Act (42 USC §1395y(b)(2)) creates
   a federal super-lien with independent recovery rights.
2. **Medicaid liens must be satisfied** per state statute. NM Medicaid has
   first-priority lien rights under NMSA §27-2-23.
3. **ERISA plan reimbursement claims** are federally preempted and may not be
   reduced by the common fund doctrine or "make whole" principles depending
   on plan language. See US Airways v. McCutchen, 569 U.S. 88 (2013).
4. **Settlement funds must be held in trust** (IOLTA account) until all liens
   are satisfied. NM Rule 16-115.
5. **Never release funds to the client** until all lien holders have been paid
   or have provided written lien waivers.

---

## Part 3: Hard Costs & Wage Loss Verification (Step 4)

### 3.1 Wage Loss Documentation

| Employment Type | Required Documentation | How to Obtain |
|----------------|----------------------|---------------|
| **W-2 employee** | Signed wage verification form from employer | Standard employer verification letter — provide template |
| **Self-employed** | Tax returns (3 years minimum) | Client provides; verify with IRS transcripts if needed |
| **Gig / contract worker** | 1099s + bank statements + contracts | Multiple sources needed to establish income pattern |
| **Unemployed / underemployed** | Prior employment history + vocational expert | May need vocational rehabilitation expert for lost earning capacity |

**Wage verification form must include:**
- Employee name and position
- Dates of employment
- Hourly rate or salary
- Hours/days missed due to injury
- Total wages lost (gross, before taxes)
- Whether employee has been terminated, demoted, or placed on modified duty
- Employer signature and date

### 3.2 Out-of-Pocket Expenses

| Expense Category | Documentation Required | Common Items |
|-----------------|----------------------|--------------|
| **Property damage** | Repair estimates, total loss valuation, deductible receipt | Vehicle damage, personal property destroyed |
| **Rental car / transportation** | Rental receipts, rideshare receipts, mileage logs | Alternative transportation during vehicle repair |
| **Home modifications** | Contractor estimates, receipts | Wheelchair ramps, bathroom modifications, grab bars |
| **Assistive devices** | Medical orders + receipts | Walkers, wheelchairs, braces, orthotics |
| **Counseling / therapy** | Bills from mental health providers | PTSD treatment, grief counseling, couples therapy |
| **Child care** | Receipts from providers | Additional childcare needed due to injury limitations |
| **Travel to treatment** | Mileage logs, parking receipts | IRS standard mileage rate for medical travel |

### 3.3 Practice-Area-Specific Hard Costs

| Practice Area | Additional Expense Categories |
|--------------|-------------------------------|
| **Civil Rights** | Criminal defense fees, bail/bond costs, lost business/employment, counseling for trauma |
| **Consumer Protection** | Credit repair costs, refinancing costs, penalty fees incurred, expert forensic audit fees |
| **Medical Malpractice** | Corrective/revision surgery costs, extended rehabilitation, home health care |
| **Wrongful Death** | Funeral expenses, loss of consortium valuation, estate administration costs |

### 3.4 Hard Costs Checklist Template

```
HARD COSTS & WAGE LOSS — [CASE_CODE]
======================================

WAGE LOSS:
| # | Source | Period | Amount | Documentation | Status |
|---|--------|--------|--------|---------------|--------|
| 1 | [employer] | [dates] | $[amt] | ✓/✗ | VERIFIED/PENDING |
| ... | | | | | |

OUT-OF-POCKET:
| # | Category | Amount | Receipt/Doc | Status |
|---|----------|--------|-------------|--------|
| 1 | [category] | $[amt] | ✓/✗ | VERIFIED/PENDING |
| ... | | | | |

TOTAL WAGE LOSS: $[total]
TOTAL OUT-OF-POCKET: $[total]
HARD COSTS STATUS: [ALL VERIFIED / PENDING]
```

---

## Part 4: Phase 2 Completion Gate

Phase 2 is complete when ALL three sub-steps pass:

| Sub-Step | Pass Criteria |
|----------|--------------|
| Medical Audit (Step 2) | Zero gaps OR all gaps documented with active resolution plans |
| Lien Resolution (Step 3) | All lien holders identified + final ledgers received OR in process with documented status |
| Hard Costs (Step 4) | All wage loss and out-of-pocket expenses documented and verified |

**If gaps remain:** DPW does NOT proceed to Phase 3. Instead:
1. Generate the full Evidence Audit Report with all open items
2. Assign responsibility and deadlines for each gap
3. Set DPW status to AUDIT-PENDING
4. Resume DPW when gaps are closed

**Exception:** The attorney may override at Checkpoint 1 if proceeding despite
gaps is strategically justified (e.g., SOL pressure). The override and
justification are documented in the DPW record.

---

*CONFIDENTIAL — Attorney Work Product*
