---
name: complaint
display_name: "Complaint Drafter"
description: >-
  Complaint Drafting (COMPLAINT) — Pack-First, Direct-Output drafting skill for
  civil complaints and petitions. Uses CFP PACKET facts and LPB PACKET legal
  elements to produce BODY-ONLY complaint text with Cite Table and Gate
  Results. Supports NM state and federal pleading standards. Use for drafting
  or amending complaints/petitions and initial pleading allegations; not for
  answers, motions, or letter workflows (v1.0)
version: "1.0"
category: drafting
pack_consumes:
  - CFP
  - LPB
  - PCM (optional)
pack_produces:
  - BODY-ONLY complaint
checkpoints: 3
author: "Parnall & Adams"
license: Proprietary
---

# COMPLAINT (Complaint Drafting) — v1.0

## What This Skill Does

Drafts the BODY-ONLY text of a civil complaint or petition for damages.
The complaint sets forth jurisdictional allegations, identifies the parties,
pleads factual allegations in numbered paragraphs traceable to the Case Fact
Pack (CFP), states each cause of action with elements mapped to the Law Pack
(LPB), alleges damages, and requests specific relief.

This skill implements **PB-COMP-01** from the Prompt Blocks library.

## Architecture: Pack-First, Direct-Output

```
CFP PACKET (verified facts) ──┐
                               ├── COMPLAINT Skill ──► BODY-ONLY Complaint
LPB PACKET (COA elements) ────┘                       + Cite Table + Gates
PCM (gap analysis) ─── optional ────────────────────► Coverage validation
Intake Info ─── optional ────────────────────────────► Party/jurisdiction data
```

A complaint should follow thorough fact investigation and legal research.
The CFP provides the factual foundation; the LPB provides the legal elements
that each cause of action must satisfy. The PCM (if available) confirms that
every element has both factual and legal support.

## Hard Rules

1. **Pack-First:** Every factual allegation must trace to a CFP row (Fact# + Pinpoint).
   Every legal element must trace to an LPB row (LawTag + Pinpoint) or statutory
   citation. No Pack row → no allegation.
2. **Direct-Output:** SA generates the Word shell (caption, case number, court name,
   verification, certificate of service, signature block, merge tokens). This skill
   provides BODY-ONLY text for the complaint body.
3. **BODY-ONLY output:** No caption, no case number header, no certificate of service,
   no signature block, no verification page. Those come from the SA shell.
4. **Cite Table gate:** Every factual allegation must appear in the Cite Table with
   a CFP source (Fact# + SourceDoc + Pinpoint). Every element citation must trace
   to an LPB row or statute.
5. **Never invent:** No invented facts, dates, names, addresses, medical diagnoses,
   damages amounts, case citations, rule numbers, statutory sections, or pinpoints.
   Missing support → `CITE NEEDED`, `[VERIFY]`, or `[VERIFY-CITE]`.
6. **Preserve merge tokens exactly.** Never modify or invent merge tokens.
   Use `[MERGE:ClientInitials]`, `[MERGE:DefendantName]`, `[MERGE:MatterID]`,
   `[MERGE:AccidentDate]`, etc. where SA will populate.
7. **Element coverage:** Each cause of action must plead every required element.
   If a required element lacks CFP or LPB support, flag as
   `[ELEMENT-GAP: COA-Name / Element-Name]` and continue drafting. Do not omit
   the element — plead it with the gap flagged.
8. **Numbered paragraphs (Word numbered lists):** All factual allegations must
   use consecutive numbered paragraphs (¶ 1, ¶ 2, ...). Causes of action
   incorporate prior paragraphs by reference and continue numbering.
   **CRITICAL:** When the complaint is assembled into a Word document,
   paragraph numbers MUST be implemented as **Word numbered lists** using
   `<w:numPr>` — NOT as inline text numbers. This ensures automatic
   renumbering when paragraphs are added, deleted, or reordered. Use the
   `_PA Complaint Paragraph` style or List Number style with a decimal
   abstractNum starting at 1. See PA-DOC-FORMAT-PLEADINGS for the OOXML
   numbered list definition.
9. **One fact per paragraph (where practicable):** Follow micro-decomposition
   principles from CFP. Compound allegations weaken the complaint.
10. **Token fail-safe:** If the complaint is extensive, chunk output:
    Part 1 = Jurisdictional + Party + Factual Allegations.
    Part 2 = Causes of Action + Damages + Prayer.
    Part 3 = Cite Table + Gate Results.

## Required Inputs

### Always Required

```xml
<evidence_layer>
[CFP PACKET — verified facts for complaint use:
  Status = DRAFT-READY
  Include: Facts tab with Element_IDs mapped to causes of action
  Include: Timeline tab (chronological foundation for factual allegations)
  Include: File_Metadata tab (source documents for Cite Table)]
</evidence_layer>

<legal_layer>
[LPB PACKET — cause-of-action elements and pleading standards:
  Include: RULES rows (statutes, rules defining each COA)
  Include: LAW rows (element definitions, standards, burden allocation)
  Must be PACK-READY / PackReady=Yes rows only]
</legal_layer>
```

### Optional (Strengthens Complaint)

- `<strategic_layer>` — PCM showing element coverage status per cause of action.
  If PCM shows UNPROVEN or FACTS-ONLY elements, the complaint skill flags them
  but still pleads (discovery may fill the gap).
- `<intake_info>` — Party names, addresses, court, jurisdiction basis,
  incident summary, insurance information. If not in CFP, provide here.
- `<behavioral_layer>` — Target judge profile (influences tone and specificity level).
- Prior ADR analysis (if drafting an amended complaint responding to a motion to dismiss).

### If Inputs Are Missing

If no CFP packet:
**"Run the CFP skill first (EXTRACT → ENRICH → VERIFY → PACKET) to build the factual foundation for the complaint."**

If no LPB packet:
**"Run the LPB skill to extract cause-of-action elements and pleading standards, then generate a PACKET filtered to complaint-relevant authority."**

If no party/jurisdiction information:
**"Provide party names, court selection (NM state / D.N.M. federal), and jurisdictional basis inside `<intake_info>` tags."**

## Attorney Checkpoints

This skill pauses at three decision points (see `shared/templates/checkpoint-protocol.md`):

**⛔ CHECKPOINT 1: Theory of the Case** — After loading packs and analyzing
available causes of action. Present: (a) which COAs the evidence supports,
(b) which are borderline, (c) which are unsupported. Attorney selects which
COAs to include and which theory to lead with.

**⛔ CHECKPOINT 2: Cause of Action Inclusion** — After drafting factual
allegations, before drafting COA counts. Present the proposed order and framing
of each COA count. Attorney approves, reorders, or removes counts. Flag any
elements with UNPROVEN status from PCM.

**⛔ CHECKPOINT 3: Fact Emphasis & Prayer** — Before final output. Present:
(a) key factual allegations that drive the complaint's narrative,
(b) proposed damages categories and prayer for relief, (c) any `[VERIFY]` or
`CITE NEEDED` items. Attorney confirms emphasis, damages framing, and relief.

## Complaint Structure

Read `references/complaint-structure.md` for the detailed template. Summary:

### I. Jurisdictional Allegations

- Court identification and basis for jurisdiction
- NM state: subject matter jurisdiction (district court general jurisdiction)
- Federal: federal question (28 U.S.C. § 1331) or diversity (28 U.S.C. § 1332)
- Venue allegations (county/district where events occurred or parties reside)

### II. Parties

- Plaintiff identification (name, residency/citizenship, capacity)
- Defendant identification (name, residency/citizenship, capacity, agency relationships)
- Doe defendants (if applicable, with NM relation-back rules)
- Respondeat superior / vicarious liability relationships

### III. General Factual Allegations

- Chronological narrative in numbered paragraphs
- Each paragraph traces to one or more CFP Fact# rows
- Incident description, circumstances, causation chain
- Injuries and damages overview (detailed in Damages section)
- All dates, locations, and actors from CFP — never invented

### IV. Causes of Action

For each cause of action (separate count):

```
COUNT [N]: [CAUSE OF ACTION NAME]
([Statutory/Common Law Basis])

[Plaintiff] incorporates by reference the allegations in
Paragraphs 1 through [last general allegation ¶] as though
fully set forth herein.

[For each required element of the COA:]
¶ [##]. [Element statement — from LPB element definition].
[Factual support — from CFP rows mapped to this Element_ID].
[If element gap:] [ELEMENT-GAP: COA-Name / Element-Name]
```

### V. Damages Allegations

- Categories of damages sought (per UJI if NM; general/special if federal)
- Medical expenses (past and future)
- Lost wages/earning capacity (past and future)
- Pain and suffering / mental anguish
- Loss of enjoyment of life
- Disfigurement
- Property damage
- Punitive damages (if applicable — must plead predicate conduct)
- Pre-judgment interest (if applicable)

### VI. Prayer for Relief

- Specific dollar amounts OR "in excess of" threshold
- Each category of damages
- Pre/post-judgment interest
- Costs and attorney's fees (if statutory basis)
- Punitive damages (if pled)
- General catch-all ("such other and further relief as the Court deems just")

### VII. Jury Demand

- Demand for trial by jury on all issues so triable (if desired)

## Cause of Action Sequencing

Read `references/causes-of-action.md` for NM PI cause-of-action elements.

**Preferred order (strongest first):**
1. Primary negligence / statutory liability claims
2. Premises liability / landowner liability
3. Vicarious liability / respondeat superior
4. Statutory claims (Tort Claims Act, Civil Rights Act, etc.)
5. Product liability (if applicable)
6. Loss of consortium (derivative claim — last)

**Each count must:**
- State the legal basis (statute or common law)
- Plead every required element
- Map factual support to each element via CFP references
- Cite the controlling authority from LPB for element definitions

## Output Contract (Required Order)

1. **BODY-ONLY Complaint Text** (Sections I–VII, consecutively numbered ¶¶)
2. **---** (divider)
3. **Cite Table**

| # | Assertion (¶ ref) | Source (CFP Fact# + Pinpoint OR LPB LawTag + Pinpoint) | Type | Confidence | Notes |
|---|-------------------|-------------------------------------------------------|------|------------|-------|

Type column values: `FACT` (from CFP), `LAW` (from LPB), `STATUTE` (direct statutory cite)

4. **Gate Results**
   - Traceability: [PASS/FAIL] — all factual allegations from CFP, all elements from LPB
   - Status Gate: [PASS/FAIL] — all CFP rows DRAFT-READY, all LPB rows PackReady=Yes
   - Element Coverage: [PASS/FAIL] — every required element pled for each COA
     - If FAIL: list each `[ELEMENT-GAP]` with COA + element name
   - Shepard Gate: [PASS/FAIL] — all LPB case rows Shepardized (or flagged [VERIFY-CITE])
   - Conflicts: [note any internal tensions between allegations]
   - Merge-token integrity: [PASS/FAIL]
   - Paragraph numbering: [PASS/FAIL] — consecutive, no gaps, no duplicates

5. **Next Requests** — missing CFP rows, missing LPB authority, missing party information,
   missing jurisdictional facts

6. **Open Items**
   - `[VERIFY]` items (dates, addresses, party names, jurisdictional facts)
   - `[VERIFY-CITE]` items (unverified statutory sections, case law)
   - `[ELEMENT-GAP]` items (elements lacking factual or legal support)
   - `[DECISION REQUIRED]` items (strategic choices: which COAs to include,
     Doe defendants, punitive damages, jury demand, court selection)

## Modes

| Mode | Input | Output |
|------|-------|--------|
| **NEW DRAFT** | CFP packet + LPB packet + intake info | Full BODY-ONLY complaint + Cite Table + Gates |
| **AMENDED** | Prior complaint + motion to dismiss / ADR analysis + updated CFP/LPB | Amended complaint addressing identified deficiencies |
| **SUPPLEMENTAL** | Prior complaint + new CFP/LPB data (new parties, new COAs) | Additional counts or party allegations for supplement |
| **SECTION DRAFT** | CFP packet + LPB packet + specific section request | Single section only (e.g., "just the negligence count") |

### Mode: NEW DRAFT (default)

Full complaint from scratch. Requires CFP + LPB + intake info.
Produces all sections (I–VII) + Cite Table + Gates.

### Mode: AMENDED

Responds to a motion to dismiss, 12(b)(6) challenge, or ADR analysis
identifying pleading deficiencies. The amended complaint:
- Cures specificity defects identified in the motion/order
- Adds factual allegations from updated CFP
- Adds/removes causes of action based on legal analysis
- Preserves well-pled allegations from the original
- Notes all changes in a Change Summary before the complaint body

### Mode: SUPPLEMENTAL

Adds new parties (Doe defendant identification), new causes of action
discovered during litigation, or additional factual allegations from
newly-obtained evidence. Does not rewrite the entire complaint.

### Mode: SECTION DRAFT

Drafts a single section on request (e.g., "draft the negligence count"
or "draft the damages section"). Still follows Pack-First discipline
and produces a section-specific Cite Table.

## Pack Locations (v1.1)

**Read CFP from:** `cases/{CASE_CODE}/cfp/`
**Read DPB from:** `cases/{CASE_CODE}/dpb/` (if applicable to this skill)
**Read LP from:** `law-packs/` (global) + `law-packs/law-of-the-case/{CASE_CODE}/` (if exists)
**Save draft output to:** `cases/{CASE_CODE}/drafts/`
**Naming:** `Complaint-{CASE_CODE}-{Descriptor}-DRAFT.docx`

**Law-of-the-case check:** Before drafting, check whether `law-packs/law-of-the-case/{CASE_CODE}/` contains an LOTC pack. If it does, load it alongside the global LP. Flag any LOTC overrides in the Cite Table with `[LOTC]` tag so the attorney knows which legal points are governed by case-specific rulings.

## Jurisdiction-Specific Rules

Read `references/jurisdiction-rules.md` for NM vs FED differences.

### New Mexico State Court (NMRA 1-008)

- **Pleading standard:** "Short and plain statement of the claim showing
  the pleader is entitled to relief" (NMRA 1-008(A))
- **Notice pleading:** NM follows notice pleading — complaint must give
  defendant fair notice of claims and grounds upon which they rest
- **Numbered paragraphs:** Required (NMRA 1-010(B))
- **Verification:** Required for certain claims (quiet title, injunction);
  otherwise not required for PI complaints — but SA shell includes if needed
- **Tort Claims Act:** Claims against government entities require prior
  90-day notice (NMSA § 41-4-16(A)) — must allege compliance
- **Civil Rights Act:** Claims against law enforcement require prior
  notice (NMSA § 41-4A-12) — must allege compliance
- **Doe defendants:** NM permits Doe defendants with relation-back under
  NMRA 1-015(C) — name when identified through discovery
- **Jury demand:** NMRA 1-038 — demand must be served within 10 days
  after service of last pleading directed to triable issue
- **Damages:** No specific amount required in ad damnum clause for PI;
  "in excess of the jurisdictional minimum" is sufficient

### Federal Court — D.N.M. (FRCP 8)

- **Pleading standard:** "Short and plain statement of the claim showing
  the pleader is entitled to relief" (FRCP 8(a)(2))
- **Twombly/Iqbal:** Federal complaints must plead facts that state a
  plausible claim — more than "labels and conclusions" or "formulaic
  recitation of the elements." Must plead enough facts to "nudge claims
  across the line from conceivable to plausible."
- **Diversity jurisdiction:** Must allege citizenship (not residency) of
  all parties and amount in controversy exceeds $75,000 (28 U.S.C. § 1332)
- **Federal question:** Must identify the federal statute/constitutional
  provision creating the right of action (28 U.S.C. § 1331)
- **Numbered paragraphs:** Required (FRCP 10(b))
- **Verification:** Not required for PI complaints unless statute requires
- **Doe defendants:** Disfavored in federal court; cannot use Does to
  manufacture diversity. Must identify with specificity when possible.
- **Jury demand:** FRCP 38(b) — must be served within 14 days after
  service of last pleading directed to triable issue
- **Damages:** Amount in controversy must be alleged for diversity;
  specific amounts optional but some local rules prefer ranges

## Pleading Specificity Standards

### Notice Pleading (NM State — Default)

Under NM notice pleading, the complaint must:
- Give defendant fair notice of the claims
- State the grounds upon which the claims rest
- Need not plead evidence or detailed facts
- Must plead enough facts to identify the transaction or occurrence

**Exception — Heightened Specificity:**
- Fraud: must plead with particularity (NMRA 1-009(B))
- Punitive damages: must plead specific conduct warranting punitive damages
  (willful, wanton, reckless, or fraudulent conduct)

### Plausibility Pleading (Federal — Twombly/Iqbal)

Under federal plausibility pleading, the complaint must:
- Contain factual allegations (not just legal conclusions)
- State facts that, taken as true, plausibly establish each element
- Cross the line from "merely possible" to "plausible"
- Each element must have factual support in the complaint

**Two-step Iqbal analysis (for self-check):**
1. Identify conclusory statements (legal conclusions dressed as facts) — these
   are not entitled to presumption of truth
2. Determine whether the remaining factual allegations plausibly state a claim

**The complaint skill automatically adjusts specificity based on jurisdiction:**
- NM state → notice-level factual detail (sufficient for fair notice)
- Federal → plausibility-level factual detail (sufficient to survive 12(b)(6))

## Integration Points

| System | How COMPLAINT Connects |
|--------|----------------------|
| **CFP** | COMPLAINT consumes CFP PACKET (DRAFT-READY facts). Fact# and Element_ID drive paragraph content and element mapping. |
| **LPB** | COMPLAINT consumes LPB PACKET filtered to cause-of-action elements and pleading standards. LawTags cited in Cite Table. |
| **PCM** | Optional gap analysis. PCM coverage status validates that each element has both factual (CFP) and legal (LPB) support. UNPROVEN elements are flagged. |
| **ADR** | For AMENDED mode: ADR analysis of a motion to dismiss identifies pleading deficiencies to cure. |
| **LOR** | LOR may have been sent before complaint filing. Reference notice letters in factual allegations (e.g., Tort Claim Notice compliance). |
| **DC** | Damages Calculator output informs the damages section and prayer for relief. |
| **NML** | NML formatting overlay can be applied if the complaint requires brief-style formatting (unusual for complaints, but available). |
| **SA** | Direct-Output: SA provides caption, case number, COS, verification, signature block. Save per Save Map: Pleadings → Initial Pleadings (new) or Pleadings → Amended Pleadings (amended). |

## Downstream Workflow

```
COMPLAINT filed ──► Defendant serves Answer ──► ADR analyzes Answer
                                                    │
                    ┌───────────────────────────────┘
                    ▼
         Defects found? ──► Meet-and-confer (GFL) ──► Motion to Strike/JOP
                    │
         No defects ──► Discovery phase ──► DPB/GFL/MTC pipeline
```

## Reference Files

- `references/complaint-structure.md` — detailed section templates with examples
- `references/jurisdiction-rules.md` — NM state vs federal pleading rules and requirements
- `references/nm-authorities.md` — NM pleading standards, rules, and key case law
- `references/causes-of-action.md` — common PI causes of action with required elements
