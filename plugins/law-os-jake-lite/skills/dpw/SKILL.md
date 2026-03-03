---
name: dpw
display_name: "Demand Phase Workflow"
description: >-
  Demand Phase Workflow (DPW) — full-lifecycle orchestrator for settlement
  demand preparation across PI, Med Mal, Civil Rights, and Consumer Protection.
  6 phases: READINESS (practice-specific maturity triggers), AUDIT (evidence
  & economic verification), AUTHORITY (valuation matrix + client sign-off),
  DRAFT (practice-area tactical drafting via Demand skill), ASSEMBLE (Bates-
  stamped brochure + QC + transmission), ESCALATE (deadline enforcement +
  negotiation + impasse). Coordinates CFP, DVP, DC, DRO, Demand, CAL, and
  PA-DOC-FORMAT-LETTERS. 4 attorney checkpoints. TRIGGERS: "demand workflow",
  "demand prep", "DPW", "demand phase", "demand readiness", "move to demand",
  "settlement preparation", "demand package", "demand brochure", "demand
  escalation", "demand impasse", "adjuster response". Do NOT use for drafting
  alone (use demand), damages calculation alone (use dc), or demand
  optimization alone (use dro). (v1.0)
version: "1.0"
category: workflow
pack_consumes:
  - CFP
  - LPB
  - DVP
  - DC
  - DRO
  - SDC
  - ICM
  - CAL
pack_produces:
  - DPW Readiness Assessment
  - DPW Evidence Audit Report
  - DPW Estimated Settlement Statement (ESS)
  - DPW Settlement Authority Directive
  - DPW Demand Brochure Package
  - DPW Escalation Tracker
checkpoints: 4
author: "Parnall & Adams"
license: Proprietary
---

## Pack Dependencies

**Consumes:**
- CFP (case facts, medical records, treatment timeline)
- LPB (liability law, damages caps, statutory multipliers)
- DVP (damages valuation, medical bills, liens, lost wages)
- DC (damages calculation, settlement evaluation)
- DRO (demand optimization, anchoring strategy)
- SDC (strategic disclosure posture)
- ICM (insurance coverage mapping)
- CAL (deadline tracking, SOL dates)

**Produces:**
- DPW Readiness Assessment (Phase 1 gate report)
- DPW Evidence Audit Report (Phase 2 completeness matrix)
- DPW Estimated Settlement Statement (ESS) (Phase 3 client-facing breakdown)
- DPW Settlement Authority Directive (Phase 3 signed authorization record)
- DPW Demand Brochure Package (Phase 5 assembled deliverable)
- DPW Escalation Tracker (Phase 6 deadline/negotiation log)

# DPW (Demand Phase Workflow) — v1.0

## Purpose

Orchestrate the entire demand preparation lifecycle — from the moment a case
file is mature enough to demand through post-demand negotiation and impasse
resolution. DPW enforces a disciplined, phase-gated process that prevents
premature demands, ensures bulletproof evidence packaging, secures ethical
client authority, and maintains aggressive deadline enforcement.

The Demand Phase is the critical pivot point in any plaintiff's case. It is
where months of pre-litigation investigation are weaponized into a highly
structured presentation designed to accomplish one of two things: **force a
maximum-value settlement** or **set up the defendant and their insurance
carrier for a Bad Faith claim when the lawsuit is filed**.

DPW adapts to the unique leverage points of each practice area (PI, Med Mal,
Civil Rights, Consumer Protection) while strictly adhering to legal ethics
and state laws — including the NM Unfair Claims Practices Act (NMSA §59A-16-20).

## Architecture: Phase-Gated Orchestrator

```
Phase 1: READINESS ─── Practice-specific maturity triggers
    │                  [CHECKPOINT 1: Demand Readiness Gate]
    ▼
Phase 2: AUDIT ─────── Evidence & economic verification
    │                  Medical audit + lien resolution + hard costs
    ▼
Phase 3: AUTHORITY ─── Valuation matrix + ESS + client sign-off
    │                  [CHECKPOINT 2: Valuation & Authority Gate]
    ▼
Phase 4: DRAFT ─────── Practice-area tactical drafting
    │                  → Routes to DEMAND skill for letter body
    │                  [CHECKPOINT 3: Draft Review Gate]
    ▼
Phase 5: ASSEMBLE ──── Bates stamping + brochure assembly + QC
    │                  → Routes to PA-DOC-FORMAT-LETTERS for formatting
    │                  [CHECKPOINT 4: Final QC & Transmission Gate]
    ▼
Phase 6: ESCALATE ──── Deadline enforcement + tickler + negotiation
                       → Routes to CAL for docketing
                       → Routes to Complaint skill at impasse
```

DPW is a **workflow orchestrator** — it does not draft the demand letter itself
(that is the Demand skill's job). DPW coordinates all upstream and downstream
skills to ensure nothing falls through the cracks across the multi-week demand
preparation lifecycle.

## Hard Rules

1. **Phase-Gated:** Each phase must pass its gate before the next phase begins.
   Skipping phases creates malpractice exposure.
2. **Practice-Area Adaptive:** Readiness triggers, drafting tactics, and
   escalation strategies differ by practice area. DPW applies the correct
   protocol based on case type.
3. **Pack-First:** Every assertion in the demand must trace to a verified pack
   row. DPW audits pack completeness before routing to the Demand skill.
4. **Client Authority Required:** Never send a demand without the client's
   written authorization (Settlement Authority Directive). This is an
   inviolable ethical rule.
5. **Lien Resolution Before Disbursement:** All statutory liens (Medicare,
   Medicaid, VA, ERISA) must be identified and ledgers procured. Failure to
   satisfy liens creates bar complaint exposure.
6. **Bad Faith Preservation:** Every demand must include language preserving
   bad faith claims under the NM Unfair Claims Practices Act. The demand
   itself becomes evidence in any subsequent bad faith action.
7. **Mathematical Accuracy:** Every dollar figure must be verified. Mathematical
   errors are the #1 reason adjusters delay responses.
8. **Deadline Enforcement:** Demand deadlines are real. If the firm sets a
   deadline and fails to enforce it, credibility is destroyed. File suit the
   moment the deadline expires without acceptable resolution.
9. **Never Bluff:** The threat of a lawsuit is only effective if the firm
   actually files it when the deadline blows. DPW enforces this discipline.
10. **Ethical Compliance:** All demand activity complies with NM Rules of
    Professional Conduct, particularly Rules 16-101 (competence), 16-104
    (communication), and 16-115 (safekeeping property/liens).

## Modes

| Mode | Description | Entry Trigger |
|------|-------------|---------------|
| **FULL** | Complete 6-phase workflow from readiness through escalation | Case manager moves file to "Demand Prep" |
| **READINESS-CHECK** | Phase 1 only — assess if file is ready for demand | Attorney wants readiness status |
| **AUDIT-ONLY** | Phase 2 only — evidence & economic audit | File is in demand prep, need completeness check |
| **AUTHORITY** | Phase 3 only — valuation + ESS + client sign-off | Audit passed, need client authorization |
| **ASSEMBLE** | Phase 5 only — package the demand brochure | Demand letter is drafted, need assembly |
| **ESCALATE** | Phase 6 only — manage post-demand deadline & negotiation | Demand sent, managing adjuster response |
| **RESUME** | Resume workflow from last completed phase | Pick up where DPW left off |

### Mode: FULL (default)

Runs the complete 6-phase demand preparation workflow. Coordinates all
downstream skills, pauses at 4 attorney checkpoints, and produces all
deliverables. This is the primary mode for demand preparation.

### Mode: READINESS-CHECK

Evaluates whether the file meets practice-area-specific readiness triggers
without initiating the full workflow. Produces a DPW Readiness Assessment
identifying what is ready, what is missing, and what actions remain before
the file can enter demand prep.

### Mode: AUDIT-ONLY

Runs the evidence and economic audit (Phase 2) in isolation. Useful when
the file has been in demand prep for a while and needs a fresh completeness
check before proceeding.

### Mode: AUTHORITY

Runs the valuation and client authority phase (Phase 3) in isolation.
Produces the Estimated Settlement Statement and Settlement Authority Directive.

### Mode: ASSEMBLE

Runs the assembly phase (Phase 5) in isolation. Packages the demand letter
with Bates-stamped exhibits into the digital demand brochure.

### Mode: ESCALATE

Runs the escalation phase (Phase 6) in isolation. Manages the post-demand
deadline enforcement, adjuster response handling, and impasse protocol.

### Mode: RESUME

Resumes the DPW workflow from the last completed phase. DPW checks prior
phase outputs and picks up at the next pending phase.

## Required Inputs

### Always Required

```xml
<case_identity>
[Case code, practice area (PI/MedMal/CivilRights/ConsumerProtection),
 defendant(s), insurer(s), claim number(s), policy number(s)]
</case_identity>
```

### Phase-Specific Requirements

| Phase | Required Input | Source |
|-------|---------------|--------|
| 1 (READINESS) | Case type + treatment status + coverage info | Intake/CMS |
| 2 (AUDIT) | Medical records + billing ledgers + lien letters + wage docs | CFP + DVP |
| 3 (AUTHORITY) | DC DAMAGES output + DC SETTLEMENT-EVAL + LPB damages law | DC + LPB |
| 4 (DRAFT) | All Phase 1-3 outputs + DRO optimization | DRO + Demand |
| 5 (ASSEMBLE) | Draft demand letter + all exhibits | Demand skill output |
| 6 (ESCALATE) | Sent demand package + adjuster info + deadline date | Phase 5 output + CAL |

### If Inputs Are Missing

If missing CFP: **"Run the CFP skill first (EXTRACT → ENRICH → VERIFY → PACKET) to build the factual foundation."**
If missing DVP: **"Run the DVP skill first to structure damages data from medical records, bills, and economic reports."**
If missing DC: **"Run the DC skill (DAMAGES mode + SETTLEMENT-EVAL mode) to establish damages ranges and demand number."**
If missing DRO: **"Run the DRO skill (AUDIT + ANCHOR modes) to optimize the demand amount and strategy."**
If missing LPB: **"Run the LPB skill to extract liability standards and damages law."**
If missing ICM: **"Run the ICM skill to map insurance coverage and policy limits."**

## Phase Detail Summary

### Phase 1: Demand Readiness (Steps 1)
Ensure the file is completely mature before asking for money. Premature demands
leave money on the table; demanding with missing records gives adjusters an
excuse to delay. Practice-area-specific triggers determine readiness.

→ See `references/phase-1-readiness.md`

### Phase 2: Evidence & Economic Audit (Steps 2-4)
Build the bulletproof financial baseline. Adjusters use missing records or
unresolved liens to justify zero-dollar evaluations. Covers the "Zero Balance"
medical audit, lien resolution prep, and hard costs/wage loss verification.

→ See `references/phase-2-evidence-audit.md`

### Phase 3: Valuation & Client Authority (Steps 5-7)
The attorney evaluates risk, establishes the "bottom line," and secures ethical
clearance from the client to make a formal offer. Produces the Valuation Matrix,
Estimated Settlement Statement, and Settlement Authority Directive.

→ See `references/phase-3-valuation-authority.md`

### Phase 4: Demand Letter Drafting (Steps 8-10)
Write a highly persuasive, structured demand letter tailored to exploit the
specific legal vulnerabilities of the defendant. Practice-area-specific drafting
tactics are applied. Routes to the Demand skill for the actual letter body.

→ See `references/phase-4-drafting.md`

### Phase 5: Assembly & Transmission (Steps 11-12)
Deliver a professional, unassailable demand package. Includes Bates stamping,
hyperlinking, visual integration, final QC, and dual-method transmission
(certified mail + electronic).

→ See `references/phase-5-assembly.md`

### Phase 6: Tickler & Escalation Protocol (Steps 13-15)
Enforce deadlines aggressively and control the negotiation tempo. Includes
the 15-day nudge, lowball counter protocol, bracketed reductions, policy
limits tender procedures, and the "Drop Dead" impasse-to-filing transition.

→ See `references/phase-6-escalation.md`

## Checkpoints

| # | Name | Gate | Options |
|---|------|------|---------|
| 1 | **Demand Readiness Gate** | Phase 1 → 2 | PROCEED / PROCEED WITH EXCEPTIONS / HOLD / FAST-TRACK (policy limits) |
| 2 | **Valuation & Authority Gate** | Phase 3 → 4 | APPROVE / REVISE AMOUNT / REVISE WALK-AWAY / HOLD |
| 3 | **Draft Review Gate** | Phase 4 → 5 | APPROVE DRAFT / REVISE TONE / REVISE CONTENT / RE-DRAFT |
| 4 | **Final QC & Transmission Gate** | Phase 5 → 6 | TRANSMIT / HOLD FOR EDITS / HOLD FOR EXHIBITS / ABORT |

Each checkpoint pauses execution and presents the attorney with work completed,
the decision needed, the options above, and a recommendation based on prior
phase outputs. The attorney must select an option before DPW proceeds.

## Output Contract (by Phase)

### Phase 1 Output: DPW Readiness Assessment

```
DPW READINESS ASSESSMENT
========================
Case: [CASE_CODE]
Practice Area: [PI / MedMal / CivilRights / ConsumerProtection]
Date: [DATE]

TRIGGER EVALUATION
------------------
| Trigger | Required | Status | Evidence | Gap Action |
|---------|----------|--------|----------|------------|
| [trigger] | Yes/No | MET/NOT MET/PARTIAL | [source] | [action if not met] |

READINESS VERDICT: [READY / NOT READY / FAST-TRACK]
ESTIMATED GAPS TO CLOSE: [count]
RECOMMENDED NEXT STEP: [action]
```

### Phase 2 Output: DPW Evidence Audit Report

```
DPW EVIDENCE AUDIT REPORT
==========================
Case: [CASE_CODE]
Date: [DATE]

SECTION A: MEDICAL RECORDS AUDIT
---------------------------------
| Provider | Record | Bill | Imaging | Ledger | Status |
|----------|--------|------|---------|--------|--------|

SECTION B: LIEN RESOLUTION STATUS
-----------------------------------
| Lien Type | Entity | Amount | Ledger | Status |
|-----------|--------|--------|--------|--------|

SECTION C: HARD COSTS & WAGE LOSS
-----------------------------------
| Category | Amount | Documentation | Status |
|----------|--------|---------------|--------|

AUDIT VERDICT: [COMPLETE / GAPS REMAIN]
OPEN ITEMS: [list]
```

### Phase 3 Output: Estimated Settlement Statement (ESS)

```
ESTIMATED SETTLEMENT STATEMENT
===============================
Case: [CASE_CODE]
Client: [CLIENT_NAME]
Date: [DATE]

Gross Demand Amount:               $[AMOUNT]
Less: Attorney Fees ([X]%):       ($[AMOUNT])
Less: Case Expenses:              ($[AMOUNT])
Less: Medical Liens:              ($[AMOUNT])
Less: Government Liens:           ($[AMOUNT])
Less: LOPs:                       ($[AMOUNT])
                                  ──────────
ESTIMATED NET TO CLIENT:           $[AMOUNT]

Walk-Away / Bottom Line:           $[AMOUNT]
Estimated Net at Walk-Away:        $[AMOUNT]

[DECISION REQUIRED: Client must sign Settlement Authority Directive]
```

### Phase 5 Output: QC Checklist

```
DPW FINAL QC CHECKLIST
=======================
Case: [CASE_CODE]
Date: [DATE]

| # | Check | Status | Notes |
|---|-------|--------|-------|
| 1 | All exhibits Bates-stamped | PASS/FAIL | |
| 2 | Hyperlinks verified | PASS/FAIL | |
| 3 | Visuals embedded (photos, imaging) | PASS/FAIL | |
| 4 | Mathematical accuracy verified | PASS/FAIL | |
| 5 | Demand amount matches DC output | PASS/FAIL | |
| 6 | Bad faith language included | PASS/FAIL | |
| 7 | Deadline date specified | PASS/FAIL | |
| 8 | Typos / tone review | PASS/FAIL | |
| 9 | Client authority on file | PASS/FAIL | |
| 10 | Certified mail + email ready | PASS/FAIL | |

QC VERDICT: [PASS / FAIL]
```

### Phase 6 Output: Escalation Tracker

```
DPW ESCALATION TRACKER
=======================
Case: [CASE_CODE]
Demand Sent: [DATE]
Deadline: [DATE]

| Date | Day# | Action | Response | Next Step |
|------|------|--------|----------|-----------|
| [date] | 0 | Demand transmitted | — | Monitor |
| [date] | 15 | 15-day nudge call | [response] | [action] |
| [date] | 30 | Deadline expires | [response] | [action] |

NEGOTIATION LOG
| Date | Party | Offer/Counter | Amount | Authority | Next |
|------|-------|---------------|--------|-----------|------|

STATUS: [OPEN / SETTLED / IMPASSE / FILED SUIT]
```

## Integration Points

| System | How DPW Connects |
|--------|-----------------|
| **CFP** | DPW checks CFP PACKET completeness in Phase 2 audit. Missing facts trigger CFP re-run. |
| **DVP** | DPW triggers DVP EXTRACT for missing billing/lien data. DVP VERIFY confirms amounts. |
| **DC** | DPW triggers DC DAMAGES + SETTLEMENT-EVAL in Phase 3. DC output drives ESS and demand amount. |
| **DRO** | DPW triggers DRO AUDIT + ANCHOR before Phase 4 drafting. DRO output calibrates demand strategy. |
| **Demand** | DPW routes to Demand skill for Phase 4 letter drafting. Passes mode (PRE-SUIT, LITIGATION, TIME-LIMITED, POLICY-LIMITS) based on case posture. |
| **SDC** | DPW respects SDC disclosure posture throughout. SDC REVEAL plan governs what the demand discloses. |
| **ICM** | DPW checks ICM for policy limits and coverage in Phase 1 readiness and Phase 3 valuation. |
| **CAL** | DPW fires CAL events: DEMAND-DEADLINE for the response deadline, DEMAND-NUDGE for the 15-day check-in, DEMAND-EXPIRATION for the drop-dead date. |
| **Complaint** | At Phase 6 impasse, DPW triggers immediate transition to Complaint skill for lawsuit filing. |
| **PA-DOC-FORMAT-LETTERS** | Phase 5 routes assembled demand through PA-DOC-FORMAT-LETTERS for firm formatting. |

## Practice-Area Quick Reference

| Practice Area | Readiness Trigger | Key Drafting Tactic | Primary Leverage |
|--------------|-------------------|--------------------|--------------------|
| **PI / Premises** | MMI reached OR life care plan finalized | "Colossus" keyword format for adjuster AI | Damages severity + treatment narrative |
| **PI / Med Mal (Limits)** | Bills drastically exceed policy limits | Science-focused + PR threat | Excess exposure + bad faith setup |
| **Medical Malpractice** | Board-certified expert affidavit obtained | Expert credibility + MRC publicity threat | Standard of care breach proof |
| **Civil Rights** | IPRA/FOIA complete + Heck cleared + damages calculated | Fee-shifting threat + QI ban emphasis | Statutory attorney fees + no QI |
| **Consumer Protection** | Forensic audit complete + pre-suit notice ready | Treble damages + statutory penalties | Willful fraud = automatic triple |

## Reference Files

- `references/phase-1-readiness.md` — Practice-area readiness triggers, trigger evaluation matrix, fast-track protocol
- `references/phase-2-evidence-audit.md` — "Zero Balance" medical audit, lien resolution prep, hard costs & wage loss verification
- `references/phase-3-valuation-authority.md` — Valuation matrix, ESS drafting, Settlement Authority Directive, ethical rules
- `references/phase-4-drafting.md` — Practice-area drafting tactics (Colossus, science/PR, fee-shifting, treble damages), demand letter anatomy, bad faith trigger language
- `references/phase-5-assembly.md` — Bates stamping protocol, hyperlinking, visual integration, QC checklist, transmission methods
- `references/phase-6-escalation.md` — System docketing, 15-day nudge, lowball counter protocol, bracketed reductions, policy limits tender, "Drop Dead" impasse, filing suit transition

---

*CONFIDENTIAL — Attorney Work Product*
