---
name: mtd-response
display_name: "Motion to Dismiss Response"
description: >-
  Motion to Dismiss Response drafting skill. Uses CFP facts and LPB
  authorities to generate BODY-ONLY opposition text to Rule 12 / NMRA 1-012
  dismissal motions, including standard-of-review framing, element-by-element
  response, and amendment/fallback requests where needed. Produces Cite Table
  and Gate Results and flags unsupported assertions for verification (v1.0)
version: "1.0"
category: drafting
pack_consumes:
  - CFP
  - LPB
  - Defendant MTD (uploaded)
pack_produces:
  - BODY-ONLY opposition to MTD
checkpoints: 0
author: "Parnall & Adams"
license: Proprietary
---

# MTD-R (Motion to Dismiss Response) — v1.0

## What This Skill Does

Drafts the BODY-ONLY text of a plaintiff's opposition/response to a defendant's
motion to dismiss under NMRA 1-012(B) (NM state court) or FRCP 12(b) (federal
court). The response addresses each dismissal ground raised by the defendant,
demonstrates that the complaint states viable claims, and requests denial of the
motion.

This skill implements **PB-MTD-R-01** from the Prompt Blocks library.

## Architecture: Pack-First, Direct-Output

```
Defendant's MTD (uploaded) ──┐
                              ├── MTD-R Skill ──► BODY-ONLY Opposition
CFP PACKET (case facts) ─────┤                   + Cite Table + Gates
                              │
LPB PACKET (opposition law) ──┘
Complaint (uploaded) ── required ──────────────► Pleading reference
PCM (claims matrix) ─── optional ──────────────► Element-level mapping
```

The response must systematically address every ground for dismissal raised in
the defendant's motion. The plaintiff bears the burden of showing that the
complaint states a claim upon which relief can be granted.

## Hard Rules

1. **Pack-First:** Every factual assertion must trace to a CFP row
   (Evidence_DocID + Bates/Page:Line) or Complaint paragraph number.
   Every legal assertion must trace to an LPB row (LawTag + Pinpoint).
   No Pack row → no assertion.
2. **Direct-Output:** SA generates the Word shell (caption, COS, signature block,
   merge tokens). This skill provides BODY-ONLY text for the opposition brief.
3. **BODY-ONLY output:** No caption, no certificate of service, no signature block,
   no verification. Those come from the SA shell.
4. **Cite Table gate:** Every assertion must appear in the Cite Table with
   supporting evidence (CFP row, Complaint ¶, or LPB authority + pinpoint).
5. **Never invent:** No invented paragraph numbers, case citations, rule numbers,
   holdings, dates, record cites, or pinpoints. Missing support → `CITE NEEDED`
   or `[VERIFY-CITE]`.
6. **Preserve merge tokens exactly.** Never modify or invent merge tokens.
7. **Accept all well-pleaded allegations as true.** On a 12(b)(6) / 1-012(B)(6)
   motion, the standard requires treating the complaint's factual allegations as
   true for purposes of the motion. The response must frame arguments within this
   standard — do not argue disputed facts; argue legal sufficiency.
8. **Consider matters outside the pleadings.** If the defendant attached exhibits
   or materials outside the pleadings, flag with `[DECISION REQUIRED]`:
   "Defendant attached materials outside the pleadings — motion may convert to
   MSJ under NMRA 1-012(B) / FRCP 12(d). Attorney must decide whether to argue
   conversion or request exclusion."
9. **Token fail-safe:** If the opposition is extensive, chunk output:
   Part 1 = BODY-ONLY opposition text. Part 2 = Cite Table + Gate Results.

## Dismissal Grounds Classification

The skill must identify which 1-012(B) / 12(b) ground(s) the defendant raises
and tailor the response framework accordingly:

| Ground | NM Rule | Federal Rule | Response Framework |
|--------|---------|-------------|-------------------|
| Lack of subject matter jurisdiction | 1-012(B)(1) | 12(b)(1) | Establish jurisdictional basis; statutory/constitutional authority |
| Lack of personal jurisdiction | 1-012(B)(2) | 12(b)(2) | Long-arm statute + due process; contacts analysis |
| Improper venue | 1-012(B)(3) | 12(b)(3) | Statutory venue basis; convenience factors |
| Insufficiency of process | 1-012(B)(4) | 12(b)(4) | Compliance with process requirements; cure if defective |
| Insufficiency of service | 1-012(B)(5) | 12(b)(5) | Compliance with service rules; cure or extension |
| Failure to state a claim | 1-012(B)(6) | 12(b)(6) | Plausibility standard; well-pleaded facts state viable claim |
| Failure to join required party | 1-012(B)(7) | 12(b)(7) | Party not required or joinder feasible |

**Most common:** 12(b)(6) / 1-012(B)(6) — failure to state a claim. The
response structure below is optimized for this ground but includes guidance
for all grounds.

## Required Inputs

### Always Required

```xml
<evidence_layer>
[Complaint or Amended Complaint — full text with paragraph numbers preserved]
[Defendant's Motion to Dismiss — full text with argument structure preserved]
[Any exhibits attached to the MTD]
</evidence_layer>

<legal_layer>
[LPB PACKET — opposition authority:
  pleading standards, plausibility doctrine, elements of each claim,
  NM-specific standards for 1-012(B)(6), leave to amend standards]
[Must be PACK-READY / PackReady=Yes rows only]
</legal_layer>
```

### Optional (Strengthens Response)

- CFP PACKET — case facts with record cites (for factual support beyond the complaint)
- `<strategic_layer>` — PCM showing which elements are satisfied by complaint allegations
- `<behavioral_layer>` — target judge profile (influences tone/structure)
- Prior related filings (e.g., amended complaint, prior dismissal orders)

### If Inputs Are Missing

If no Complaint + MTD uploaded:
**"Upload the Complaint and Defendant's Motion to Dismiss inside `<evidence_layer>` tags. I need both documents to draft the response."**

If no LPB packet:
**"Run the LPB skill to extract opposition authority (pleading standards, claim elements, plausibility doctrine), then provide the LPB packet in `<legal_layer>` tags."**

If no CFP packet:
Continue with Complaint paragraph cites only. Note in Open Items:
**"No CFP packet provided. Response relies on Complaint ¶ cites only. For record-cite strengthening, run CFP skill on case documents."**

## Response Structure

Read `references/response-structure.md` for the detailed template. Summary:

### I. Introduction
- Brief statement that defendant's motion should be denied
- Identification of claims challenged and grounds asserted
- Summary of why the complaint states viable claims
- Statement of applicable standard (construed in plaintiff's favor)

### II. Factual Background
- Drawn from Complaint allegations (accepted as true for purposes of this motion)
- Organized to support claim viability
- All cites to Complaint ¶ numbers
- No characterization beyond what the Complaint states
- Additional record cites from CFP packet if available

### III. Legal Standard
- 12(b)(6) / 1-012(B)(6) standard: plausibility, not probability
- Well-pleaded allegations taken as true
- Reasonable inferences drawn in plaintiff's favor
- Leave to amend liberally granted
- Defendant bears burden of demonstrating failure to state a claim
- All citations from LPB with pinpoints

### IV. Argument — Claim-by-Claim Response
For each claim defendant seeks to dismiss:

```
A. [Claim Name] — [Cause of Action]

[Identify the elements required for this claim — cite LPB authority.]

[For each element defendant challenges:]

Defendant contends that [paraphrase defendant's argument — cite MTD page/¶].

This argument fails because [response — cite LPB authority + Complaint ¶s
showing the element is satisfied].

[If defendant mischaracterizes the complaint:]
Defendant misreads the Complaint. [Correct citation with actual Complaint ¶
and text.]

[If defendant applies wrong standard:]
Defendant applies the wrong legal standard. [State correct standard with
LPB authority.]
```

### V. Leave to Amend (Alternative Relief)
- If any claim is found deficient, request leave to amend
- Liberal amendment standard under NMRA 1-015 / FRCP 15(a)
- No futility, undue delay, or bad faith
- Identify what additional facts could cure any deficiency

### VI. Conclusion
- Specific relief requested (deny motion in its entirety)
- Alternative relief (leave to amend if any claim dismissed)

## Output Contract (Required Order)

1. **BODY-ONLY Opposition Text** (Sections I–VI)
2. **---** (divider)
3. **Cite Table**

| # | Assertion | Evidence (Complaint ¶, CFP DocID/Bates, or LawTag + Pinpoint) | Confidence | Notes |
|---|-----------|---------------------------------------------------------------|------------|-------|

4. **Gate Results**
   - Traceability: [PASS/FAIL] — all facts from Complaint/CFP, all law from LPB
   - Status Gate: [PASS/FAIL] — all CFP rows DRAFT-READY (if used), all LPB rows PackReady=Yes
   - Shepard Gate: [PASS/FAIL] — all LPB rows Shepardized (or flagged [VERIFY-CITE])
   - Standard-of-Review Gate: [PASS/FAIL] — response correctly frames 12(b)(6) standard
   - Conversion Watch: [PASS/FAIL/FLAG] — flag if defendant attached matters outside pleadings
   - Conflicts: [note any]
   - Merge-token integrity: [PASS/FAIL]

5. **Next Requests** — missing LPB authority, missing Complaint pages, missing CFP data

6. **Open Items**
   - `[VERIFY]` items (record cites, dates)
   - `[VERIFY-CITE]` items (unverified law)
   - `[DECISION REQUIRED]` items (strategic choices — e.g., conversion, amendment scope)

## Modes

| Mode | Input | Output |
|------|-------|--------|
| **FULL OPPOSITION** | Complaint + MTD + LPB packet | Full BODY-ONLY opposition + Cite Table + Gates |
| **CLAIM-SPECIFIC** | Complaint + MTD (specific claims only) + LPB | Opposition addressing only specified claims |
| **AMENDMENT BRIEF** | Prior dismissed complaint + dismissal order + LPB | Brief supporting motion for leave to amend |
| **SUR-REPLY** | Opposition + defendant's reply + LPB | Sur-reply addressing new arguments in reply (if permitted) |

## Pack Locations (v1.1)

**Read CFP from:** `cases/{CASE_CODE}/cfp/`
**Read DPB from:** `cases/{CASE_CODE}/dpb/` (if applicable to this skill)
**Read LP from:** `law-packs/` (global) + `law-packs/law-of-the-case/{CASE_CODE}/` (if exists)
**Save draft output to:** `cases/{CASE_CODE}/drafts/`
**Naming:** `MTD-Response-{CASE_CODE}-{Descriptor}-DRAFT.docx`

**Law-of-the-case check:** Before drafting, check whether `law-packs/law-of-the-case/{CASE_CODE}/` contains an LOTC pack. If it does, load it alongside the global LP. Flag any LOTC overrides in the Cite Table with `[LOTC]` tag so the attorney knows which legal points are governed by case-specific rulings.

## Jurisdiction-Specific Rules

Read `references/jurisdiction-rules.md` for NM vs FED differences.

### New Mexico (NMRA 1-012(B))
- NM applies a "notice pleading" standard
- Complaint need only state a claim that falls within a recognized legal theory
- Standard: whether, accepting complaint allegations as true, plaintiff may
  establish a set of facts entitling plaintiff to relief
- Leave to amend liberally granted under NMRA 1-015(A)

### Federal (D.N.M.) (FRCP 12(b)(6) + D.N.M. Local Rules)
- *Twombly*/*Iqbal* plausibility standard
- Two-step inquiry: (1) identify non-conclusory factual allegations;
  (2) determine if those facts plausibly state a claim
- Page limits per D.N.M. LR-Civ 7.5 (response brief: 24 pages)
- Leave to amend under FRCP 15(a) — freely given when justice requires

## Claim Element Mapping

For 12(b)(6) / 1-012(B)(6) responses, the skill maps each challenged claim
to its required elements and demonstrates that the Complaint's allegations
satisfy each element:

```
Claim: [Claim Name]
├── Element 1: [Description] — Complaint ¶¶ [X, Y] — LPB [LawTag]
├── Element 2: [Description] — Complaint ¶¶ [Z] — LPB [LawTag]
├── Element 3: [Description] — Complaint ¶¶ [A, B, C] — LPB [LawTag]
└── Element 4: [Description] — [INSUFFICIENT — request leave to amend]
```

If a PCM (Proof of Claims Matrix) is available, use it directly. If not,
construct a lightweight element map from the Complaint + LPB authority.

## Integration Points

| System | How MTD-R Connects |
|--------|--------------------|
| **CFP** | MTD-R consumes CFP PACKET for record-cite support beyond Complaint ¶ numbers. Optional but strengthens factual narrative. |
| **LPB** | MTD-R consumes LPB PACKET filtered to pleading-standards and claim-element authority. LawTags cited in Cite Table. Required input. |
| **PCM** | Optional strategic layer providing element-fact-law mapping per claim. If available, drives the claim-by-claim argument structure. |
| **ADR** | If answer has already been filed (MTD denied), ADR handles answer defects. Separate pipeline. |
| **NML** | NML formats MTD-R BODY-ONLY output into NM-formatted brief (page-limit per local rules). Apply NML after MTD-R drafting. |
| **SA** | Direct-Output: SA provides caption/COS shell. Save per Save Map: Motions → Responsive Motions. |

## Reference Files

- `references/response-structure.md` — detailed section templates and examples
- `references/jurisdiction-rules.md` — NM vs FED 12(b) standards and local rules
- `references/nm-authorities.md` — NMRA rule index + key NM case holdings for MTD opposition
