---
name: r11
display_name: "Rule 11 Pre-Filing Certification"
description: >-
  Rule 11 / sanctions analysis and drafting skill for evaluating pleading
  support, certification risk, and sanctions posture. Uses CFP/LPB support to
  prepare BODY-ONLY motion or opposition sections with Cite Table and Gate
  Results, including safe-harbor timing checks, conduct chronology, and
  evidentiary sufficiency flags. Use for Rule 11 risk review and sanctions
  drafting workflows (v1.0)
version: "1.0"
category: drafting
pack_consumes:
  - CFP
  - LPB
pack_produces:
  - BODY-ONLY R11 motion
checkpoints: 0
author: "Parnall & Adams"
license: Proprietary
---

# R11 (Rule 11 Motion for Sanctions) — v1.0

## What This Skill Does

Drafts the BODY-ONLY text of a motion for sanctions under FRCP 11 or NMRA 1-011
targeting pleading certification violations. The motion identifies specific
denials, defenses, or claims that lack reasonable factual or legal basis,
demonstrates a pattern of sanctionable conduct, documents compliance with safe
harbor requirements (FRCP 11) or notice requirements (NMRA 1-011), and requests
appropriate sanctions.

This skill implements **PB-R11-01** from the Prompt Blocks library.

Rule 11 sanctions are a **high-stakes, relationship-altering remedy.** This skill
enforces a conservative, evidence-driven approach: every assertion of sanctionable
conduct must be traceable to specific record evidence, and the motion must
demonstrate that the conduct is not an isolated error but a pattern warranting
court intervention.

## Architecture: Pack-First, Direct-Output

```
ADR Defect Matrix ───────────┐
  (CERT-FAILURE flags)       │
                              ├── R11 Skill ──► BODY-ONLY Motion
CFP PACKET (record evidence) ─┤                 + Cite Table + Gates
                              │
LPB PACKET (sanctions law) ───┘
Safe Harbor Documentation ───── required ──────► Compliance evidence
Meet-Confer Log ──────────── optional ─────────► Good faith efforts
```

A Rule 11 motion is a **last-resort remedy.** The ADR skill identifies potential
certification failures; the R11 skill drafts the motion only after the safe
harbor period has expired without cure.

## Hard Rules

1. **Pack-First:** Every assertion of sanctionable conduct must trace to a
   record source — ADR Defect Matrix row (with Complaint ¶ or Defense #),
   CFP row (with DocID + Bates/pinpoint), or opposing party's own filing
   (with ¶ number). No record cite → no assertion.
2. **Direct-Output:** SA generates the Word shell (caption, COS, signature block,
   merge tokens). This skill provides BODY-ONLY text for the argument section.
3. **BODY-ONLY output:** No caption, no certificate of service, no signature block,
   no verification. Those come from the SA shell.
4. **Cite Table gate:** Every assertion must appear in the Cite Table with
   supporting evidence (record cite or LPB authority + pinpoint).
5. **Never invent:** No invented paragraph numbers, rule citations, case names,
   pinpoints, dates, holdings, or sanctions amounts. Missing support →
   `CITE NEEDED` or `[VERIFY-CITE]`.
6. **Preserve merge tokens exactly.** Never modify or invent merge tokens.
7. **Safe harbor compliance:** The motion must document compliance with the
   safe harbor procedure. If no safe harbor documentation is provided:
   - **FRCP 11:** Flag `[DECISION REQUIRED — SAFE HARBOR]`:
     "No safe harbor service documentation provided. FRCP 11(c)(2) requires
     service of the sanctions motion at least 21 days before filing."
   - **NMRA 1-011:** Flag `[DECISION REQUIRED — NOTICE]`:
     "Confirm notice and opportunity to respond has been provided per
     NMRA 1-011(C)."
8. **Pattern required:** A single isolated pleading defect is generally
   insufficient for sanctions. The motion must demonstrate either:
   - A pattern of sanctionable conduct across multiple paragraphs/defenses, OR
   - A single instance so egregious that it independently warrants sanctions
   If the ADR Matrix shows fewer than 3 CERT-FAILURE flags, flag
   `[DECISION REQUIRED — PATTERN THRESHOLD]`:
   "Fewer than 3 certification failures identified. Confirm this meets the
   pattern threshold for sanctions or identify the egregious-single-instance basis."
9. **Objective analysis only.** No speculation about opposing counsel's subjective
   intent. Focus on objective deficiencies: what the pleading says, what the
   record shows, and how the two are irreconcilable. NM Rules of Professional
   Conduct govern.
10. **Token fail-safe:** If the motion is extensive, chunk output:
    Part 1 = BODY-ONLY motion text. Part 2 = Cite Table + Gate Results.

## Required Inputs

### Always Required

```xml
<evidence_layer>
[ADR Defect Matrix — CERT-FAILURE rows:
  Include: Complaint ¶, Answer ¶/Defense #, Defect Flag, Rule, Analysis]
[CFP PACKET — record evidence of sanctionable conduct:
  Include: File_Metadata + relevant Facts/Quotes showing the facts that were
  improperly denied or the legal positions that lack any basis]
[Safe Harbor Documentation:
  FRCP 11: Date served, 21-day expiration date, cure status (cured/not cured)
  NMRA 1-011: Date notice given, response received (if any), cure status]
</evidence_layer>

<legal_layer>
[LPB PACKET — sanctions authority:
  Rule 11/1-011 standards, certification requirements, sanctions factors,
  safe harbor procedure, types of sanctions, appellate standards of review]
[Must be PACK-READY / PackReady=Yes rows only]
</legal_layer>
```

### Optional (Strengthens Motion)

- `<meet_confer_log>` — timeline of good faith efforts to resolve
- `<strategic_layer>` — PCM or ADR Remedy Playbook showing broader context
- `<behavioral_layer>` — target judge profile (influences tone/sanctions request)
- Prior meet-and-confer letter addressing the certification defects
- Opposing counsel's response (if any) to safe harbor notice

### If Inputs Are Missing

If no ADR Defect Matrix: **"Run the ADR skill first (FULL DIAGNOSTIC mode) to identify CERT-FAILURE defects. The ADR Defect Matrix is the primary input for this skill."**

If no CFP packet: **"Run the CFP skill to extract record evidence supporting the sanctionable conduct (e.g., documents contradicting the improper denials, discovery responses admitting facts that were denied in the pleading)."**

If no LPB packet: **"Run the LPB skill to extract sanctions authority (FRCP 11 / NMRA 1-011 standards, NM and federal case law on sanctions), then generate a PACKET."**

If no safe harbor documentation: Flag `[DECISION REQUIRED — SAFE HARBOR]` but continue drafting.

## Motion Structure

Read `references/motion-structure.md` for the detailed template. Summary:

### I. Introduction
- Brief statement that sanctions are sought under Rule 11 / NMRA 1-011
- Identification of the offending pleading (Answer, Motion, etc.)
- Summary of the pattern of sanctionable conduct
- Statement of safe harbor compliance

### II. Procedural Background
- Filing of the complaint
- Service and filing of the offending pleading
- Safe harbor notice service and expiration
- Cure status (not cured / partially cured / cured as to some items)
- Meet-and-confer efforts (if any)

### III. Certification Standard
- Text of FRCP 11(b) / NMRA 1-011(A) — the four certification obligations
- Standard for evaluating compliance (objective reasonableness)
- Distinction from subjective bad faith (Rule 11 = objective standard)
- Burden allocation
- All citations from LPB with pinpoints

### IV. Statement of Sanctionable Conduct
For each category of certification failure:

#### A. Factual Contentions Without Evidentiary Support (Rule 11(b)(3) / 1-011(A)(3))
- Identify specific denials or factual assertions lacking support
- For each: quote the pleading language, cite the contradicting record evidence
- Show the pattern across multiple instances

#### B. Denials Not Warranted on the Evidence (Rule 11(b)(4) / 1-011(A)(4))
- Identify denials of facts within the party's knowledge or records
- For each: quote the denial, cite the evidence the party possessed
- Cross-reference with ADR BLANKET-DENIAL, LKI-IMPROPER, EVASIVE flags

#### C. Legal Contentions Not Warranted by Existing Law (Rule 11(b)(2) / 1-011(A)(2))
- Identify defenses or legal positions foreclosed by binding authority
- For each: state the legal position taken, cite the controlling authority
- Show no nonfrivolous argument for extension, modification, or reversal

#### D. Improper Purpose (Rule 11(b)(1) / 1-011(A)(1)) — if applicable
- Identify objective indicators of improper purpose (harassment, delay, cost)
- Pattern evidence only — no speculation about subjective intent
- This is the hardest to prove; include only with strong record support

### V. Sanctions Requested
- Types of sanctions sought (see jurisdiction rules)
- Basis for each type requested
- Attorney's fees and costs calculation (or framework for calculation)
- Why lesser sanctions would be insufficient

### VI. Conclusion
- Specific relief requested
- Request for hearing (if appropriate)

## Output Contract (Required Order)

1. **BODY-ONLY Motion Text** (Sections I–VI)
2. **---** (divider)
3. **Cite Table**

| # | Assertion | Evidence (ADR Row/¶# or DocID+Bates or LawTag+Pinpoint) | Confidence | Notes |
|---|-----------|----------------------------------------------------------|------------|-------|

4. **Gate Results**
   - Traceability: [PASS/FAIL] — all sanctionable conduct from ADR/CFP, all law from LPB
   - Status Gate: [PASS/FAIL] — all CFP rows DRAFT-READY, all LPB rows PackReady=Yes
   - Shepard Gate: [PASS/FAIL] — all LPB rows Shepardized (or flagged [VERIFY-CITE])
   - Safe Harbor Gate: [PASS/FAIL] — safe harbor compliance documented
   - Pattern Gate: [PASS/FAIL] — 3+ CERT-FAILURE instances or egregious single instance documented
   - Objectivity Gate: [PASS/FAIL] — no speculation about subjective intent
   - Conflicts: [note any]
   - Merge-token integrity: [PASS/FAIL]

5. **Next Requests** — missing ADR rows, missing CFP evidence, missing LPB authority,
   missing safe harbor documentation

6. **Open Items**
   - `[VERIFY]` items (dates, filing numbers, docket entries)
   - `[VERIFY-CITE]` items (unverified law)
   - `[DECISION REQUIRED]` items (strategic choices — sanctions amount, types sought,
     safe harbor compliance, pattern threshold)

## Modes

| Mode | Input | Output |
|------|-------|--------|
| **FULL DRAFT** | ADR Matrix + CFP packet + LPB packet + safe harbor docs | Full BODY-ONLY motion + Cite Table + Gates |
| **PARTIAL** | ADR Matrix (subset of CERT-FAILURE rows) + LPB | Motion targeting only specified certification failures |
| **SAFE HARBOR LETTER** | ADR Matrix + LPB packet | BODY-ONLY safe harbor notice letter (serve before filing motion) |
| **REPLY** | Opposition to sanctions motion + LPB | Reply memorandum in support of sanctions motion |
| **FEES BRIEF** | Court order granting sanctions + billing records | Attorney's fees and costs brief supporting sanctions award |

## Pack Locations (v1.1)

**Read CFP from:** `cases/{CASE_CODE}/cfp/`
**Read DPB from:** `cases/{CASE_CODE}/dpb/` (if applicable to this skill)
**Read LP from:** `law-packs/` (global) + `law-packs/law-of-the-case/{CASE_CODE}/` (if exists)
**Save draft output to:** `cases/{CASE_CODE}/drafts/`
**Naming:** `R11-{CASE_CODE}-{Descriptor}-DRAFT.docx`

**Law-of-the-case check:** Before drafting, check whether `law-packs/law-of-the-case/{CASE_CODE}/` contains an LOTC pack. If it does, load it alongside the global LP. Flag any LOTC overrides in the Cite Table with `[LOTC]` tag so the attorney knows which legal points are governed by case-specific rulings.

## Jurisdiction-Specific Rules

Read `references/jurisdiction-rules.md` for NM vs FED differences.

### New Mexico (NMRA 1-011)
- Certification obligation mirrors federal Rule 11
- Court may impose "appropriate sanctions" after notice and opportunity to respond
- No explicit 21-day safe harbor in rule text — but courts expect notice
- Sanctions may include attorney's fees, nonmonetary directives, or penalties
- Court may act on its own initiative with notice and opportunity to respond

### Federal (D.N.M.) (FRCP 11 + LR-Civ)
- Mandatory 21-day safe harbor: serve motion on opposing party at least 21 days
  before filing with court; if offending party withdraws or corrects within 21 days,
  motion may not be filed
- Motion must be made separately from other motions
- Sanctions limited to what suffices to deter repetition
- Monetary sanctions against represented party only for Rule 11(b)(1) violations
  (improper purpose); all other monetary sanctions against counsel
- Court may award reasonable attorney's fees and expenses
- Court may also initiate sanctions proceedings sua sponte

## Integration Points

| System | How R11 Connects |
|--------|-----------------|
| **ADR** | R11 consumes ADR Defect Matrix — specifically CERT-FAILURE flagged rows. ADR identifies the certification violations; R11 drafts the sanctions motion. |
| **CFP** | R11 consumes CFP PACKET for record evidence contradicting the improper denials/claims (discovery admissions, documents, deposition testimony). |
| **LPB** | R11 consumes LPB PACKET filtered to sanctions authority (FRCP 11 / NMRA 1-011 standards, case law on sanctions, safe harbor procedure). |
| **GFL** | Prior meet-and-confer correspondence may provide context. If the meet-and-confer addressed certification defects, include as supporting evidence. |
| **NML** | NML formatting overlay applies to R11 BODY-ONLY output for polished brief formatting. |
| **SA** | Direct-Output: SA provides caption/COS shell. Save per Save Map: Motions → Sanctions Motions. |

## Workflow: Safe Harbor First

**Critical:** For FRCP 11 motions, the safe harbor procedure is a jurisdictional
prerequisite. The recommended workflow:

```
1. Run ADR FULL DIAGNOSTIC → identify CERT-FAILURE flags
2. Senior attorney reviews and approves sanctions pursuit [DECISION REQUIRED]
3. Run R11 in SAFE HARBOR LETTER mode → draft the safe harbor notice
4. Serve safe harbor notice on opposing counsel
5. Wait 21 days (FRCP 11) or reasonable notice period (NMRA 1-011)
6. If not cured: Run R11 in FULL DRAFT mode → draft the sanctions motion
7. Apply NML formatting overlay
8. Assemble in SA shell → file
```

For NMRA 1-011 (NM state court):
```
1. Run ADR FULL DIAGNOSTIC → identify CERT-FAILURE flags
2. Senior attorney reviews and approves sanctions pursuit [DECISION REQUIRED]
3. Send meet-and-confer letter identifying certification defects (optional but recommended)
4. If not cured: Run R11 in FULL DRAFT mode → draft the sanctions motion
5. Apply NML formatting overlay
6. Assemble in SA shell → file
```

## Reference Files

- `references/motion-structure.md` — detailed section templates and examples
- `references/jurisdiction-rules.md` — NM vs FED standards, safe harbor procedures, local rules
- `references/sanctions-standards.md` — sanctions types, factors, appellate review, case law framework
