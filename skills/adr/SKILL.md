---
name: adr
description: 'Answer Diagnostic & Remedy (ADR) — reviews Answer vs Complaint to detect defective denials, evasive responses, boilerplate defenses, certification failures under NMRA 1-008, 1-009, 1-011,
  1-012(C)/(F). Produces Defect Matrix, Remedy Playbook, meet-and-confer packet, task assignments, Calendar. TRIGGERS: "answer diagnostic", "ADR", "review the answer", "defective answer", "defective denials",
  "strike defenses", "boilerplate defenses", "1-012(F)", "NMRA 1-012", "judgment on the pleadings", "1-012(C)", "deemed admitted", "1-008 admission", "sanctions under 1-011", "defect matrix", "answer review",
  "pleading defects", "evasive denial", "blanket denial", or uploads Complaint + Answer pair. Not for discovery (use gfl/mtc) or MSJ (use msj) (v1.0)'
version: '1.0'
license: Proprietary
---

# ADR (Answer Diagnostic & Remedy) — v1.0

## Mission

Equip the team to detect, document, and remedy improper denials, evasive or
non-responsive answers, and defective affirmative defenses in the Defendant's
Answer — and to hold counsel accountable when conduct violates pleading rules.

This is an **analysis + strategy** skill, not a pure drafting skill. It
produces structured diagnostics that feed downstream drafting (GFL for
meet-and-confer, then motions via SA Direct-Output workflow).

## Architecture: Pack-First, Record-Driven

```
Complaint (uploaded) ─────┐
                          ├── ADR Skill ──► Defect Matrix
Answer (uploaded) ────────┘                 Remedy Playbook
                                            Meet-and-Confer Packet
LPB PACKET (pleading law) ── optional ──►   Citation Appendix
                                            Calendar & Compliance
                                            Role-Based Task Assignments
```

Unlike the Builder skills (CFP/LPB/DPB), ADR does not produce an Excel Pack.
It produces **analytical deliverables** (markdown tables, strategy documents,
and letter drafts) that reference the Complaint and Answer by paragraph number.

When an LPB packet with pleading-rule authority is available, ADR cites it
directly. When no LPB packet is available, ADR marks every legal assertion
`[VERIFY-CITE]` and generates a research task list for the law clerk.

## Hard Rules

1. **Record-driven:** Every factual assertion must cite a Complaint ¶ or
   Answer ¶ (or ECF/Bates number). No record cite → `[VERIFY]` or omit.
2. **Authority-driven:** Every legal assertion must cite NMRA rule + subsection
   or NM case + pinpoint ¶, or be marked `[VERIFY-CITE]`.
3. **NM-first:** NM authorities control. Federal analogs (FRCP 8, 9, 10, 11, 12)
   are persuasive only and must be clearly labeled as such.
4. **Never invent:** No invented paragraph numbers, rule citations, case names,
   pinpoints, dates, or holdings. Missing → flag, don't fabricate.
5. **Direct-Output for motions:** ADR produces strategy and diagnostics. When the
   team moves to draft a motion (strike, judgment on pleadings, sanctions),
   the motion itself follows Direct-Output / BODY-ONLY discipline.
6. **Ethical compliance:** NM Rules of Professional Conduct govern. Prefer
   omission over unsupported claims. No speculation about opposing counsel's
   subjective intent — focus on objective deficiencies in the pleading.
7. **Token fail-safe:** If output is extensive, chunk deliverables across
   multiple responses. Never allow truncation to silently drop the Cite Table.

## Required Inputs

### Always Required

```xml
<evidence_layer>
[Complaint or Amended Complaint — full text with paragraph numbers preserved]
[Answer or Amended Answer — full text with paragraph numbers preserved]
[Any court-ordered replies or docket orders affecting pleading obligations]
</evidence_layer>
```

### Optional (Strengthens Analysis)

```xml
<legal_layer>
[LPB PACKET — pleading-rule authority: NMRA 1-008, 1-009, 1-011, 1-012;
 NM cases on denial sufficiency, affirmative defense specificity, sanctions]
[PackReady=Yes rows only]
</legal_layer>
```

- `<behavioral_layer>` — target judge profile (influences remedy selection)
- Docket sheet or scheduling order (for deadline calculation)

### If Inputs Are Missing

If no Complaint + Answer uploaded:
**"Upload the Complaint and Answer (with paragraph numbers preserved) inside `<evidence_layer>` tags. I need both documents to run the diagnostic."**

If no LPB packet:
**"No legal authority packet provided. I will mark all legal citations `[VERIFY-CITE]`. For verified citations, run the LPB skill to extract pleading-rule authority, then provide the LPB packet in `<legal_layer>` tags."**

## Authority & Source Hierarchy

| Priority | Source | Citation Format | Label |
|----------|--------|----------------|-------|
| 1 | NMRA rules | NMRA 1-008(B) | Controlling |
| 2 | NMSC cases | Neutral citation + ¶ pin | Controlling |
| 3 | NMCOA cases | Neutral citation + ¶ pin | Controlling |
| 4 | FRCP rules | FRCP 8(b)(1)(B) | Persuasive only |
| 5 | Federal cases | Citation + page pin | Persuasive only |
| 6 | Treatises | Author, title, section | Persuasive only |

Every legal assertion requires a source + pinpoint or `[VERIFY-CITE]`.
Every factual assertion requires a record cite (¶ number, ECF, Bates) or `[VERIFY]`.

## Modes

| Mode | Input | Output |
|------|-------|--------|
| **FULL DIAGNOSTIC** | Complaint + Answer | All 5 deliverables + Cite Table + Gates |
| **MATRIX ONLY** | Complaint + Answer | Defect Matrix table only |
| **REMEDY ANALYSIS** | Defect Matrix (prior output) + LPB packet | Remedy Playbook + prioritized strategy |
| **MEET-CONFER** | Defect Matrix + remedy selections | GFL-style meet-and-confer letter (BODY-ONLY) |
| **CALENDAR** | Docket sheet + scheduling order | Calendar & Compliance Sheet |

Default mode is **FULL DIAGNOSTIC** unless the user specifies otherwise.

## Pack Locations (v1.1)

**Read CFP from:** `cases/{CASE_CODE}/cfp/`
**Read LP from:** `law-packs/` + `law-packs/law-of-the-case/{CASE_CODE}/` (if exists)
**Save analysis output to:** `cases/{CASE_CODE}/drafts/`

## Diagnostic Workflow

Read `references/diagnostic-workflow.md` for the complete step-by-step
paragraph classification system. Summary of checks:

### Denial Analysis (per Complaint ¶)

| Response Pattern | Defect Category | Rule | Flag |
|-----------------|----------------|------|------|
| No response / silence | Potential deemed admission | NMRA 1-008(D) | `ADMIT-DEFAULT` |
| General/blanket denial | Fails to "fairly meet the substance" | NMRA 1-008(B) | `BLANKET-DENIAL` |
| "Lacks knowledge or information" | Improper if facts within defendant's control | NMRA 1-008(B) | `LKI-IMPROPER` |
| Qualified / evasive ("to the extent...") | Non-responsive; may be deemed admission | NMRA 1-008(B) | `EVASIVE` |
| Failure to admit undisputed portions | Duty to admit what is true | NMRA 1-008(B) | `PARTIAL-ADMIT-NEEDED` |
| Internally inconsistent denial | Contradicts own affirmative defense | Logic | `INTERNAL-CONFLICT` |

### Affirmative Defense Analysis (per defense)

| Defect Pattern | Category | Rule | Flag |
|---------------|----------|------|------|
| No supporting facts / boilerplate | Insufficient notice | NMRA 1-008(A) | `BOILERPLATE` |
| Missing heightened specificity (fraud, etc.) | Specificity failure | NMRA 1-009 [VERIFY-CITE] | `SPECIFICITY-FAIL` |
| "Reserves right to add defenses" | Improper reservation | NMRA 1-012(F) | `IMPROPER-RESERVATION` |
| Redundant / immaterial / impertinent | Strikeable matter | NMRA 1-012(F) | `REDUNDANT-IMMATERIAL` |
| Inconsistent with own denials | Internal conflict | Logic + 1-008 | `DEFENSE-DENIAL-CONFLICT` |
| No reasonable factual basis | Certification failure | NMRA 1-011 | `CERT-FAILURE` |

### Certification Check (NMRA 1-011)

- Lack of reasonable inquiry before filing
- Purpose to harass or cause unnecessary delay
- Factual contentions without evidentiary support
- Legal contentions not warranted by existing law or good faith argument

## Role-Based Task Assignments

ADR produces task assignments for each role. Read `references/deliverables.md`
for the complete task definitions.

### Senior Attorney
- Review Defect Matrix and select which defects to attack
- Choose remedy sequence (meet-and-confer → strike vs. judgment vs. sanctions)
- Assess risk/cost of each remedy path
- Final sign-off on strategy before filing

### Associate
- Run the FULL DIAGNOSTIC (this skill)
- Prepare the Defect Matrix
- Draft meet-and-confer letter (using GFL skill or ADR MEET-CONFER mode)
- Prepare motion frameworks per senior attorney's strategy selections

### Law Clerk
- Verify all `[VERIFY-CITE]` authorities using Lexis+ AI
- Compile NM cases with neutral citations + pinpoint paragraphs
- Shepardize/KeyCite all authorities
- Prepare mini-brief on sanctions standards under NMRA 1-011

### Paralegal / Legal Assistant
- Build paragraph-level Complaint-Answer comparison chart
- Calendar all deadlines (1-012(F) motion deadlines, 1-011 safe-harbor period)
- Confirm page limits and format requirements from local rules
- Track meet-and-confer correspondence dates

## Output Contract

### For FULL DIAGNOSTIC mode:

1. **Defect Matrix** (table — see `references/deliverables.md` for schema)
2. **Remedy Playbook** (see `references/remedy-playbook.md`)
3. **Role-Based Task Assignments** (structured task list per role)
4. **Meet-and-Confer Outline** (key points; full letter via MEET-CONFER mode)
5. **Calendar & Compliance Notes** (deadlines + requirements)
6. **---** (divider)
7. **Citation Appendix** (all authorities used, NM first then federal)
8. **Cite Table**

| # | Assertion | Authority/Record Cite + Pinpoint | Confidence | Notes |
|---|-----------|----------------------------------|------------|-------|

9. **Gate Results**
   - Traceability: [PASS/FAIL] — all record assertions cite ¶/ECF/Bates
   - Authority Gate: [PASS/FAIL] — all legal assertions cite NMRA/case or [VERIFY-CITE]
   - NM-First Gate: [PASS/FAIL] — federal authorities clearly labeled persuasive
   - Conflicts: [note any internal tensions]
   - Ethical Compliance: [PASS/FAIL] — no speculation, no unsupported claims

10. **Next Requests** — missing record pages, missing LPB authority, missing docket info

11. **Open Items**
    - `[VERIFY-CITE]` items (unverified legal citations)
    - `[VERIFY]` items (unverified record references)
    - `[DECISION REQUIRED]` items (strategy choices for senior attorney)

### Token Fail-Safe

If the diagnostic is extensive:
- **Part 1:** Defect Matrix + Remedy Playbook
- Stop: "Part 1 complete. Reply 'continue' for task assignments, calendar, Citation Appendix, Cite Table, and Gate Results."
- **Part 2:** Remaining deliverables

## SSOT Integration: PSR -> ADR

The Pleading State Register (PSR) is the single source of truth for pleading
data. When a PSR exists for a case, **ADR should consume PSR as its primary
structured input** instead of re-parsing raw complaint and answer documents:

**PSR Responses tab -> ADR Denial Analysis:**
- ResponseType, ResponseClassification, and DefectFlag from PSR provide the
  pre-classified response data that ADR builds its Defect Matrix from
- ADR can focus on strategic analysis rather than re-extracting paragraph data

**PSR Affirmative_Defenses tab -> ADR Defense Analysis:**
- DefenseType, DefectFlag, FactualBasis, and LegalBasis from PSR provide
  the pre-extracted defense data
- ADR applies the remedy/strategy layer on top of PSR's factual extraction

**PSR Admissions_Map -> ADR Deemed Admission Identification:**
- Admissions and deemed admissions already identified in PSR
- ADR confirms and adds remedial strategy (e.g., file motion to deem admitted)

**When no PSR exists:** ADR falls back to its original workflow of parsing
raw complaint + answer documents. In this case, ADR should recommend building
a PSR first for data quality.

## Integration Points

| System | How ADR Connects |
|--------|-----------------|
| **PSR** | ADR consumes PSR as structured input for answer diagnostics. PSR Responses tab feeds denial analysis; Affirmative_Defenses tab feeds defense analysis. When no PSR exists, ADR parses raw documents but recommends building PSR. |
| **LPB** | ADR consumes LPB PACKET filtered to pleading-rule authority. If no LPB packet, generates `[VERIFY-CITE]` research list for law clerk to build one. |
| **CFP** | ADR Defect Matrix findings (deemed admissions, undisputed facts) feed CFP via PSR Admissions_Map as Delta Requests for new DRAFT-READY rows. |
| **MPR** | ADR findings that lead to motions (motion to strike, motion for judgment on pleadings) create entries in the MPR when those motions are filed. |
| **GFL** | ADR MEET-CONFER mode produces discovery-style meet-and-confer letter targeting pleading defects. Alternatively, use GFL skill with ADR Matrix as input. |
| **DPB** | If Answer references discovery obligations or responses, ADR flags cross-references to DPB rows. |
| **SA** | Direct-Output for all motions. Save per Save Map: Motions → Pleading Motions. Calendar deadlines to SA Critical Deadlines using controlled vocab. |
| **MTC** | Separate pipeline. ADR handles pleading defects; MTC handles discovery defects. If both apply, run both skills separately. |

## Reference Files

Read only the reference needed for the active mode:

- `references/diagnostic-workflow.md` — complete paragraph-by-paragraph classification system
- `references/remedy-playbook.md` — remedy selection criteria, pros/cons, proof checklists
- `references/deliverables.md` — schemas for all 5 deliverables + role task definitions
- `references/nm-authorities.md` — NMRA rule index + key NM case holdings (all [VERIFY-CITE])
