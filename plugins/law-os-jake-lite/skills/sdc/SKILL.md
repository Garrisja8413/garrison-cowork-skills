---
name: sdc
display_name: "Strategic Disclosure Control"
description: >-
  Strategic Disclosure Control (SDC) — analysis skill for deciding what
  information to disclose, when to disclose it, and by which channel across
  case phases. Tracks disclosure timing, leverage impact, and risk controls
  while preserving privilege/work product boundaries. Use for disclosure
  sequencing, strategy audits, and phase-specific disclosure planning with
  documented rationale (v1.0)
version: "1.0"
category: analysis
pack_consumes:
  - CFP
  - DPB
  - LPB
  - PCM
  - DVP
pack_produces:
  - SDC disclosure ledger
checkpoints: 0
author: "Parnall & Adams"
license: Proprietary
disable-model-invocation: true
---

## Pack Dependencies
**Produces:**
- SDC disclosure strategy (timing, leverage, risk controls)

# SDC (Strategic Disclosure Controller) — v1.0

## Mission

Control the flow of information to the defense. Maintain an asymmetric
information advantage throughout litigation by tracking exactly what has
been disclosed, what remains hidden, and what should be strategically
revealed — and when.

**Core principle:** In plaintiff-side litigation, we generally control the
tempo of disclosure. The Complaint sets the initial frame. Discovery
responses are calibrated. Depositions are prepared. Settlement demands are
timed. Every disclosure is a choice. SDC makes those choices deliberate.

## Architecture: Overlay on All Packs

```
CFP (facts) ─────────┐
LPB (law) ───────────┤
DPB (discovery) ─────┤── SDC Overlay ──► Disclosure Ledger
DVP (damages) ───────┤                   Surprise Inventory
PCM (proof matrix) ──┤                   Posture Assessment
AIP (behavioral) ────┘                   Reveal Plans
                                          Bluff Register
                                          Redline Reports
```

SDC does NOT duplicate data from other packs. It creates a **disclosure
dimension** that attaches to existing rows via Element_ID and source
references. Think of it as a classification layer: every piece of
information in Law-OS gets a disclosure tag.

## Hard Rules

1. **Ethics first.** All tactics must comply with NM Rules of Professional
   Conduct (16-301 through 16-804). No fabrication of evidence. No
   destruction or concealment of discoverable material. No false statements
   to the court. Bluffs are limited to settlement posturing and strategic
   ambiguity — areas where advocacy is expected.
2. **Discovery obligations are sacred.** SDC never recommends withholding
   information that is responsive to a proper discovery request. Instead,
   it helps frame responses to disclose the minimum required while
   preserving advantage. Objections must have good faith basis.
3. **Never invent.** No invented disclosure events, dates, or status
   classifications. If disclosure status is unknown → `UNKNOWN`.
4. **Pack-First.** SDC consumes data from CFP, DPB, LPB, PCM, DVP, AIP.
   It cannot operate without at least a CFP or DPB to audit.
5. **Attorney decision gates.** SDC recommends; the attorney decides.
   Every REVEAL plan and BLUFF strategy requires `[DECISION REQUIRED]`
   flag for senior attorney sign-off.
6. **Record everything.** The Disclosure Ledger is an audit trail. Every
   disclosure event gets logged with date, method, audience, and what
   was revealed. This protects against later claims of concealment.
7. **Token fail-safe.** If output is extensive, chunk: Part 1 = Ledger
   summary, Part 2 = Surprise Inventory + Posture, Part 3 = Reveal
   Plans + Bluff Register.

## Disclosure Status Taxonomy (Controlled Vocabulary)

Every item in the Disclosure Ledger gets exactly one status:

| Status | Meaning | Color |
|--------|---------|-------|
| `UNDISCLOSED` | We have it; they don't know we have it | 🟢 Green — maximum advantage |
| `PARTIALLY-DISCLOSED` | They know we have something in this area but not the specifics | 🟡 Yellow — some advantage |
| `DISCLOSED-VAGUE` | Disclosed but in intentionally vague terms (e.g., notice pleading) | 🟡 Yellow — framing advantage |
| `DISCLOSED-SPECIFIC` | Fully disclosed with specifics (pinpoints, quotes, exhibits) | 🔴 Red — no surprise value |
| `DISCLOSED-BY-THEM` | They produced it or stated it — they know we have it | 🔴 Red — no surprise value |
| `DISCLOSED-BY-COURT` | Disclosed via court filing (publicly available) | 🔴 Red — no surprise value |
| `INFERRED` | Not directly disclosed but likely inferred from other disclosures | 🟠 Orange — diminished advantage |
| `UNKNOWN` | Disclosure status not yet classified | ⚪ White — needs audit |

## Disclosure Method Taxonomy

| Method | Description | Typical Phase |
|--------|-------------|---------------|
| `COMPLAINT` | Alleged in the Complaint / Amended Complaint | Pre-discovery |
| `DISCOVERY-RESPONSE` | Disclosed in our response to their discovery | Discovery |
| `DISCOVERY-REQUEST` | Revealed by what we asked for (telegraphing) | Discovery |
| `PRODUCTION` | Produced as a document in discovery | Discovery |
| `DEPOSITION` | Came out during deposition testimony | Discovery |
| `MOTION` | Disclosed in a motion or brief | Motions |
| `SETTLEMENT` | Disclosed in demand letter or settlement communications | Negotiation |
| `MEDIATION` | Disclosed during mediation | Mediation |
| `TRIAL` | Disclosed at trial (opening, witness, exhibit) | Trial |
| `CORRESPONDENCE` | Disclosed in meet-and-confer or other correspondence | Any |
| `INADVERTENT` | Unintentionally disclosed — damage assessment needed | Any |
| `COURT-ORDER` | Compelled by court order | Any |

## Information Advantage Categories

SDC classifies our information advantage into strategic categories:

| Category | Description | Example |
|----------|-------------|---------|
| `SMOKING-GUN` | Critical evidence the defense doesn't know exists | Internal memo contradicting their position |
| `THEORY-HIDDEN` | Legal theory not yet telegraphed | UPA claim supported by undisclosed evidence |
| `WITNESS-UNKNOWN` | Witness the defense doesn't know about | Coworker willing to testify |
| `TIMELINE-GAP` | We know something about a timeline gap they think is empty | Records filling their missing period |
| `IMPEACHMENT` | Evidence that contradicts their position/witness but not yet revealed | Prior inconsistent statement |
| `DAMAGES-HIDDEN` | Damages category or amount not yet disclosed | Future medical costs, earning capacity |
| `PATTERN` | Pattern evidence they don't know we've assembled | Multiple similar incidents |
| `ADMISSION-UNUSED` | Their own admission we haven't yet deployed | Deposition answer, Rog response |

## Modes

| Mode | Input | Output | Reference |
|------|-------|--------|-----------|
| **AUDIT** | CFP + DPB + any filed documents | Disclosure Ledger + Surprise Inventory | `references/audit.md` |
| **POSTURE** | Current litigation phase + AIP profiles | Posture Assessment + Phase-Specific Guidance | `references/posture.md` |
| **REDLINE** | Draft document (complaint, discovery, letter, motion) | Redline Report flagging inadvertent disclosures | `references/redline.md` |
| **BLUFF** | Case posture + AIP + target audience | Bluff Strategy with ethical guardrails | `references/bluff.md` |
| **REVEAL** | Specific items to disclose + timing context | Controlled Reveal Plan | `references/reveal.md` |
| **DEBRIEF** | Event description (depo, hearing, mediation) | Disclosure Event Log + Ledger Update | `references/debrief.md` |
| **TELEGRAPH** | Our outgoing discovery requests (before serving) | Telegraph Analysis — what our questions reveal about our strategy | `references/telegraph.md` |

Default mode is **AUDIT** unless the user specifies otherwise.

---

## Pack Locations (v1.1)

**Read CFP from:** `cases/{CASE_CODE}/cfp/`
**Read LP from:** `law-packs/` + `law-packs/law-of-the-case/{CASE_CODE}/` (if exists)
**Save analysis output to:** `cases/{CASE_CODE}/drafts/`

## Mode Details

### AUDIT — Build / Update the Disclosure Ledger

**Purpose:** Scan all available packs and classify every item by disclosure
status. This is the foundation — run AUDIT before any other mode.

**Process:**

1. **Ingest** — Read CFP facts, DPB discovery states, LPB legal theories,
   PCM gap analysis, DVP damages categories
2. **Cross-Reference Filed Documents** — Compare pack contents against:
   - Complaint allegations (what was pled?)
   - Discovery responses (what was answered?)
   - Produced documents (what was turned over?)
   - Motions filed (what was argued?)
   - Deposition transcripts (what came out?)
   - Demand letters / settlement communications
3. **Classify** — Assign Disclosure Status to each item
4. **Score** — Calculate Surprise Value (1-5 scale):
   - 5 = Smoking gun, completely unknown to defense
   - 4 = Strong evidence, likely unknown
   - 3 = Moderate value, possibly inferred
   - 2 = Low surprise value, likely known
   - 1 = No surprise value, fully disclosed
5. **Output** — Disclosure Ledger + Surprise Inventory

**Surprise Inventory** = All items with status `UNDISCLOSED` or
`PARTIALLY-DISCLOSED` and Surprise Value ≥ 3.

### POSTURE — Set Strategic Disclosure Posture

**Purpose:** Define the overall disclosure strategy for the current
litigation phase, calibrated to the opposing counsel and judge profiles.

**Posture Types:**

| Posture | Description | When to Use |
|---------|-------------|-------------|
| `TIGHT` | Disclose absolute minimum. Vague pleading. Object broadly. Play dumb. | Early litigation, weak OC, favorable momentum |
| `SELECTIVE` | Disclose strategically to build narrative. Reveal strengths, hide weaknesses. | Mid-litigation, building settlement pressure |
| `PROGRESSIVE` | Gradually escalate disclosure to create momentum pressure. | Pre-mediation, progressive reveal strategy |
| `OVERWHELMING` | Disclose everything at once to demonstrate case strength. | Pre-trial, strong case, settlement push |
| `DEFENSIVE` | Tighten disclosure — we've been revealing too much or OC is exploiting disclosures. | When defense is using our disclosures against us |

**AIP Integration:** Posture is calibrated to:
- OC discovery_style (boilerplate objector → we can be TIGHT)
- OC settlement_behavior (moves at mediation → PROGRESSIVE toward mediation)
- Judge discovery_tendency (grants MTCs liberally → be careful with TIGHT)
- Adjuster negotiation_style (algorithm-driven → SELECTIVE with structured reveals)

### REDLINE — Review Draft for Inadvertent Disclosure

**Purpose:** Before any document goes out, REDLINE scans it against the
Disclosure Ledger and flags anything that:

1. **Reveals UNDISCLOSED items** — "This paragraph discloses Fact #47
   (currently UNDISCLOSED, Surprise Value 5). Is this intentional?"
2. **Telegraphs legal theory** — "This discovery request reveals you are
   pursuing a UPA theory. Currently THEORY-HIDDEN."
3. **Over-specifies** — "This could be stated more vaguely while still
   satisfying notice pleading requirements."
4. **Creates inference chains** — "Disclosing A + B together allows the
   defense to infer C, which is currently UNDISCLOSED."
5. **Conflicts with posture** — "Current posture is TIGHT but this draft
   is at SELECTIVE disclosure level."

**Output:** Redline Report with:
- Line-by-line flags
- Suggested rewrites (vaguer alternatives)
- Disclosure impact assessment (what changes in the Ledger if sent as-is)
- `[DECISION REQUIRED]` for each flagged item

### BLUFF — Ethical Bluff Strategy Design

**Purpose:** Design ethically permissible bluffs — strategic ambiguity,
posturing, and misdirection that fall within the bounds of zealous
advocacy.

**Ethical Guardrails (MANDATORY):**

| ✅ Permitted | ❌ Prohibited |
|-------------|--------------|
| Implying you have more evidence than you've shown | Fabricating evidence that doesn't exist |
| Vague references to "additional witnesses" when you have some | Claiming witnesses exist when they don't |
| Overstating confidence in damages range during negotiation | Misrepresenting facts to the court |
| Asking discovery questions that suggest a theory you may not pursue | Making false statements in verified pleadings |
| Strategic silence on weaknesses | Concealing responsive discovery |
| Projecting trial readiness to pressure settlement | Misrepresenting case status to the court |
| Aggressive demand anchoring based on best-case scenario | Creating fraudulent documents |
| Implying willingness to try the case when you prefer settlement | Suborning perjury |
| Misdirecting attention to strong claims while building weak ones | Violating duty of candor to the tribunal |

**Bluff Types:**

| Type | Description | Phase |
|------|-------------|-------|
| `STRENGTH-PROJECTION` | Project greater case strength than current PCM shows | Settlement, Mediation |
| `THEORY-DECOY` | Emphasize one theory while quietly building another | Discovery, Motions |
| `READINESS-BLUFF` | Project trial readiness to create settlement pressure | Pre-trial |
| `NUMBERS-ANCHOR` | Demand well above expected value to anchor negotiation | Settlement |
| `DISCOVERY-FEINT` | Discovery requests that suggest pursuit of theory X while building theory Y | Discovery |
| `WITNESS-IMPLICATION` | Imply additional testimony without specifying | Settlement, Mediation |
| `TIMELINE-PRESSURE` | Create urgency through scheduling / deadline pressure | Any |
| `SILENCE-AS-STRENGTH` | Strategic non-response that lets the defense fill in with their fears | Settlement |

**Output:** Bluff Strategy Card:
- Type + target audience (OC, adjuster, mediator)
- Setup moves (what to do first)
- The bluff itself (specific language/action)
- Maintenance plan (how to sustain it)
- Exit strategy (what if called on it)
- Ethical analysis (why this is permissible)
- `[DECISION REQUIRED]` — senior attorney must approve

### REVEAL — Controlled Disclosure Plan

**Purpose:** When it's time to reveal something, do it deliberately.
REVEAL mode creates a plan for maximum impact.

**Reveal Timing Framework:**

| Timing | Impact | When |
|--------|--------|------|
| `AMBUSH-DEPO` | Maximum — witness cannot prepare | Deposition (cross of defense witness) |
| `AMBUSH-TRIAL` | Maximum — jury sees genuine reaction | Trial cross-examination |
| `MEDIATION-BOMB` | High — creates settlement pressure | Mediation session |
| `MOTION-REVEAL` | Moderate — becomes public record | Motion filing |
| `DEMAND-LEVERAGE` | Moderate — shows strength for negotiation | Demand letter |
| `PROGRESSIVE-DRIP` | Cumulative — builds momentum over time | Multiple phases |
| `PREEMPTIVE` | Defensive — get ahead of it before they find it | When discovery will compel anyway |

**Output:** Reveal Plan:
- What to reveal + what to continue holding
- Sequencing (if multi-item)
- Framing (how to present for maximum impact)
- Audience reaction prediction (using AIP profiles)
- Follow-up moves (what to do after the reveal)
- Ledger update plan

### DEBRIEF — Post-Event Disclosure Logging

**Purpose:** After any event where information was exchanged (deposition,
hearing, mediation, meet-and-confer), log exactly what was disclosed —
by both sides — and update the Ledger.

**Process:**

1. **What did WE disclose?** (Review transcript/notes against Ledger)
   - Intentional disclosures → update status
   - Inadvertent disclosures → flag for damage assessment
2. **What did THEY disclose?** (New information gained)
   - New facts → create CFP Delta Requests
   - New legal theories → flag for LPB research
   - Admissions → create CFP Admission entries
3. **What can they now INFER?** (Inference chain analysis)
   - Update INFERRED status on items they can now deduce
4. **Surprise Inventory impact** — what moved from 🟢 to 🟡 or 🔴?
5. **Posture adjustment needed?** — does this event change our posture?

### TELEGRAPH — Outgoing Discovery Request Review

**Purpose:** Before serving discovery requests, analyze what our questions
reveal about our litigation strategy. Every question is a signal.

**What telegraphing looks like:**
- Asking about specific dates → reveals you know those dates matter
- Requesting specific document categories → reveals your theory
- Interrogatory topics → reveals your claim structure
- RFA targets → reveals your strongest allegations

**Output:** Telegraph Report:
- Question-by-question signal analysis
- Suggested rewrites to reduce telegraphing
- Decoy questions to add (requests that suggest false trails)
- Net disclosure impact assessment

---

## Integration Points

| System | How SDC Connects |
|--------|-----------------|
| **CFP** | SDC reads CFP facts, quotes, timeline, admissions. Classifies each by disclosure status. DEBRIEF creates CFP Delta Requests for new facts learned. |
| **DPB** | SDC reads DPB requests/responses/productions. Classifies disclosure status based on discovery state machine. TELEGRAPH analyzes outgoing requests before service. |
| **LPB** | SDC classifies legal theories by disclosure status. REDLINE flags when draft motions/briefs telegraph hidden theories. |
| **PCM** | SDC reads gap_status to identify vulnerabilities. BLUFF mode uses PCM gaps to design strength-projection strategies. |
| **DVP** | SDC classifies damages categories by disclosure status. REVEAL mode plans damages disclosure for maximum settlement impact. |
| **AIP** | SDC uses OC/judge/adjuster profiles to calibrate POSTURE and predict reactions to REVEAL plans. BLUFF mode targets specific behavioral triggers. |
| **ADR** | SDC AUDIT includes deemed-admission inventory — admissions by the defense that we haven't yet deployed (ADMISSION-UNUSED category). |
| **GFL/MTC** | REDLINE mode reviews draft good faith letters and motions before filing. TELEGRAPH mode reviews discovery requests before service. |
| **DC** | SDC tracks which damages figures have been disclosed (demand letters) vs. held back (future medical, earning capacity). REVEAL mode plans damages disclosure for settlement leverage. |
| **PB-08** | Settlement Negotiator consumes SDC Surprise Inventory to craft momentum-driven demands that strategically reveal select items. |
| **PB-10** | Murder Board consumes SDC Ledger to simulate adversary's knowledge state — what can they attack? What don't they know? |

## Disclosure Ledger Schema (Markdown Table Output)

```
| # | Source | Item | Element_ID | DisclosureStatus | Method | Date | Audience | SurpriseValue | AdvantageCategory | Notes |
```

**Column definitions:**
- **Source**: Pack + ID (e.g., "CFP-Fact#47", "DPB-Set-P-ROGS-001-Req#5", "LPB-LAW-NEG-DUTY-001")
- **Item**: Brief description of the information
- **Element_ID**: Universal relational key
- **DisclosureStatus**: From controlled taxonomy above
- **Method**: How it was disclosed (or blank if UNDISCLOSED)
- **Date**: When disclosed (or blank)
- **Audience**: Who learned it (OC name, adjuster name, court, public)
- **SurpriseValue**: 1-5 scale
- **AdvantageCategory**: From Information Advantage Categories above
- **Notes**: Strategic notes, inference chains, related items

## Output Contract (All Modes)

1. **Mode Header** — Mode name, inputs consumed, current posture
2. **Primary Deliverable** — Mode-specific output (Ledger, Redline, etc.)
3. **Surprise Inventory Summary** — Current counts by status
4. **Posture Check** — Is current posture still appropriate?
5. **Decision Gates** — All `[DECISION REQUIRED]` items
6. **Ethical Compliance Gate** — `[PASS/FAIL]`
   - No recommendations to conceal responsive discovery
   - No recommendations to make false statements
   - No recommendations to fabricate evidence
   - All bluffs within NM RPC bounds
7. **Open Items** — `[VERIFY]`, `[DECISION REQUIRED]`, research needs
8. **SmartAdvocate Save Notes** — Case Notes → Strategy category

## Response Template

```
**Mode: [MODE] | Posture: [POSTURE] | Phase: [LITIGATION-PHASE]**

[Primary deliverable]

---

**Surprise Inventory Summary**
- 🟢 UNDISCLOSED: [count] items (Surprise Value avg: [X])
- 🟡 PARTIALLY-DISCLOSED: [count]
- 🟡 DISCLOSED-VAGUE: [count]
- 🔴 DISCLOSED-SPECIFIC: [count]
- 🔴 DISCLOSED-BY-THEM: [count]
- 🟠 INFERRED: [count]
- ⚪ UNKNOWN: [count] — need classification

**Posture Check:** [Current posture] — [still appropriate / adjustment recommended]

**Ethical Compliance:** [PASS]

**Decision Gates:**
- [List all DECISION REQUIRED items]

**Open Items:**
- [List]
```

## Ethical Framework: The Bright Lines

SDC operates in the space between full transparency and deception. The
ethical framework is non-negotiable:

### Always Permitted
- Strategic timing of disclosures (choosing WHEN to reveal, not WHETHER)
- Vague pleading within notice pleading standards
- Objecting to discovery on good faith grounds
- Aggressive settlement posturing
- Strategic silence (not volunteering information not asked for)
- Asking discovery designed to test defenses without revealing theories
- Projecting confidence in case strength
- Anchoring negotiations above expected value

### Never Permitted
- Withholding responsive discovery (violates NMRA 1-026, 1-033, 1-034)
- Making false statements to the court (NMRA 16-303)
- Fabricating evidence (NMRA 16-304, 16-803)
- Assisting perjury (NMRA 16-303)
- Destroying or concealing evidence (spoliation)
- Misrepresenting material facts in verified pleadings
- Communicating with represented parties without counsel (NMRA 16-402)
- Knowingly presenting false evidence (NMRA 16-303)

### Gray Zone — Requires Senior Attorney Decision
- Omitting a claim from the Complaint that you intend to add later
- Answering discovery questions technically but evasively
- Using protective orders to limit what becomes public
- Strategic timing of amendments to add claims/parties
- Selective disclosure in mediation (mediation privilege applies)

## Reference Files

Read only the reference needed for the active mode:

- `references/audit.md` — AUDIT mode detailed workflow + Ledger construction
- `references/posture.md` — POSTURE mode phase-by-phase guidance + AIP calibration
- `references/redline.md` — REDLINE mode document review protocol
- `references/bluff.md` — BLUFF mode strategy cards + ethical analysis framework
- `references/reveal.md` — REVEAL mode timing framework + impact maximization
- `references/debrief.md` — DEBRIEF mode event logging protocol
- `references/telegraph.md` — TELEGRAPH mode discovery request signal analysis
