# SDC Reference: AUDIT Mode — Disclosure Ledger Construction

## Purpose

Build or update the Disclosure Ledger by scanning all available Law-OS
packs and classifying every information item by disclosure status.

## Prerequisites

At minimum, one of:
- CFP (facts) — for fact-level audit
- DPB (discovery) — for discovery-level audit

Strongly recommended:
- Filed Complaint (uploaded or in CFP as source doc)
- Filed discovery responses (in DPB)
- Any demand letters or settlement communications

## Step-by-Step Workflow

### Step 1: Inventory All Information Assets

Scan each pack and extract inventory:

**From CFP:**
- All facts (cfp_facts) → each gets a Ledger row
- All quotes (cfp_quotes) → each gets a Ledger row
- All admissions (cfp_admissions) → each gets a Ledger row
- Timeline events (cfp_timeline) → significant events get Ledger rows

**From LPB:**
- All legal propositions (lpb_law) → each gets a Ledger row
- Group by legal theory (category field) → theory-level classification

**From DPB:**
- All discovery requests WE served (Direction=Outgoing) → assess what our
  questions reveal about our strategy
- All discovery responses WE provided (Direction=Incoming) → assess what
  we disclosed in our answers
- All productions WE made → assess what documents we turned over
- All deficiencies WE identified → assess what our GFL/MTC reveals

**From DVP:**
- Damages categories and amounts → each gets a Ledger row
- Settlement offer history → assess what amounts/bases were disclosed
- Lien information → assess if lien amounts reveal damages floor

**From PCM:**
- Gap analysis → identify UNPROVEN elements (vulnerabilities to protect)
- COVERED elements → these are our strengths (reveal strategically)

### Step 2: Cross-Reference Against Filed Documents

For each item in the inventory, check whether it appears in:

| Document | Check For | Status If Found |
|----------|-----------|----------------|
| Complaint | Fact alleged, even vaguely | `DISCLOSED-VAGUE` or `DISCLOSED-SPECIFIC` depending on specificity |
| Amended Complaint | New allegations added | `DISCLOSED-VAGUE` or `DISCLOSED-SPECIFIC` |
| Our Discovery Responses | Fact or theory disclosed in answer | `DISCLOSED-SPECIFIC` (usually) |
| Our Document Productions | Document turned over | `DISCLOSED-SPECIFIC` |
| Our Motions/Briefs | Fact, law, or theory cited | `DISCLOSED-BY-COURT` |
| Demand Letters | Damages, facts, theories cited | `DISCLOSED-SPECIFIC` (to adjuster/OC) |
| Mediation Statements | Facts, theories, damages cited | `PARTIALLY-DISCLOSED` (mediation privilege) |
| Deposition Testimony | Fact elicited or volunteered | `DISCLOSED-SPECIFIC` |
| Meet-and-Confer Letters | Deficiencies cited, theories referenced | `PARTIALLY-DISCLOSED` or `DISCLOSED-SPECIFIC` |
| Their Discovery (what they asked) | If their question targets a hidden item → they may be fishing; assess whether our response disclosed | Check our response |
| Their Productions | Documents they gave us | `DISCLOSED-BY-THEM` (they know we have it) |
| Their Depositions | What their witness said | `DISCLOSED-BY-THEM` |
| Court Orders | Anything in a court order | `DISCLOSED-BY-COURT` |

### Step 3: Classify Disclosure Status

Apply the controlled vocabulary from SKILL.md. Decision tree:

```
Is the item in a public court filing?
  → YES → DISCLOSED-BY-COURT
  → NO ↓

Did WE disclose it in any communication to OC/adjuster/court?
  → YES → Was it specific or vague?
    → Specific (pinpoints, quotes, details) → DISCLOSED-SPECIFIC
    → Vague (general allegation, no specifics) → DISCLOSED-VAGUE
  → NO ↓

Did THEY produce or state it?
  → YES → DISCLOSED-BY-THEM
  → NO ↓

Can they reasonably infer it from other disclosures?
  → YES → INFERRED (document the inference chain)
  → NO ↓

Have we disclosed something in the same category/area?
  → YES → PARTIALLY-DISCLOSED
  → NO → UNDISCLOSED
```

### Step 4: Score Surprise Value

For items classified as UNDISCLOSED or PARTIALLY-DISCLOSED, assign
Surprise Value (1-5):

| Score | Criteria |
|-------|----------|
| **5** | Smoking gun. Completely unknown. Would fundamentally change defense strategy if known. Would cause visible reaction at deposition or trial. |
| **4** | Strong evidence. Likely unknown. Significantly strengthens our position on a contested element. Would require defense to adjust strategy. |
| **3** | Moderate value. Possibly inferred but not confirmed. Fills a gap in our proof. Useful for impeachment or corroboration. |
| **2** | Low surprise value. Defense likely suspects or can obtain independently. Still useful for timing. |
| **1** | Minimal surprise. Defense probably knows or should know. Advantage is only in timing/framing. |

**Scoring factors that increase Surprise Value:**
- Item contradicts defense's known position
- Item comes from a source defense doesn't know we have
- Item fills a gap that defense thinks is empty
- Item supports a theory we haven't telegraphed
- Item impeaches a defense witness
- Item is time-sensitive (value decreases as trial approaches)

**Scoring factors that decrease Surprise Value:**
- Item is in a document defense produced to us
- Item is publicly available (court records, news)
- Defense has asked discovery questions targeting this area
- We've disclosed adjacent items that create inference chain
- OC is sophisticated and likely anticipates this

### Step 5: Assign Advantage Category

For UNDISCLOSED and PARTIALLY-DISCLOSED items with Surprise Value ≥ 3,
classify into an Advantage Category from SKILL.md.

Multiple categories can apply. Use the primary category.

### Step 6: Build Inference Chain Map

This is critical. Disclosures interact. Identify:

1. **Direct inferences:** "If they know A, they can deduce B"
   - Example: If they know we have Dr. Smith's records (disclosed), they
     can infer we know about the 2023 diagnosis (undisclosed item in those records)

2. **Combinatorial inferences:** "A alone doesn't reveal C, but A + B does"
   - Example: Our RFP for personnel files (A) plus our interrogatory about
     training (B) together reveal we're building a negligent hiring claim (C)

3. **Temporal inferences:** "Disclosing X now reveals we've known about Y"
   - Example: Citing a document we received in production last month but
     haven't used until now reveals we've been strategically timing

Document inference chains in the Notes column of the Ledger.

### Step 7: Generate Surprise Inventory

Filter the Ledger for:
- Status IN ('UNDISCLOSED', 'PARTIALLY-DISCLOSED')
- Surprise Value ≥ 3

Sort by:
1. Surprise Value (descending)
2. Advantage Category (SMOKING-GUN first)
3. Element_ID (group by claim element)

This is the crown jewels — the information we're protecting.

## Output Format

### Disclosure Ledger (Markdown Table)

```
| # | Source | Item | Element_ID | Status | Method | Date | Audience | SV | Category | Notes |
|---|--------|------|------------|--------|--------|------|----------|----|----------|-------|
| 1 | CFP-F#47 | Dr. Smith memo contradicting Def position on notice | NEG-Duty | UNDISCLOSED | — | — | — | 5 | SMOKING-GUN | Obtained from non-party subpoena. Defense does not know we subpoenaed this. |
| 2 | CFP-F#12 | Plaintiff reported pain on 3/15/2024 | NEG-Damages | DISCLOSED-VAGUE | COMPLAINT | 2024-06-01 | Court/OC | 2 | — | Complaint ¶8 alleges "injuries" without specifying date of onset. |
| ... |
```

### Surprise Inventory (Filtered View)

```
🟢 SURPRISE INVENTORY — [Case Name] — as of [Date]

HIGH VALUE (SV 5):
1. [Source] — [Item] — [Category] — [Deployment recommendation]

HIGH VALUE (SV 4):
2. [Source] — [Item] — [Category] — [Deployment recommendation]

MODERATE VALUE (SV 3):
3. [Source] — [Item] — [Category] — [Deployment recommendation]

DEPLOYMENT TIMELINE:
- Deposition phase: Items [X, Y] recommended for depo cross
- Mediation: Items [Z] recommended for mediation reveal
- Trial: Items [W] reserved for trial
- Settlement: Items [V] for demand leverage

INFERENCE RISK MAP:
- If we disclose [Item A], defense can infer [Item B] (SV drops from 5→2)
- If we disclose [Item C + D together], defense can infer [Item E]
```

### Summary Statistics

```
DISCLOSURE LEDGER SUMMARY:
- Total items tracked: [N]
- 🟢 UNDISCLOSED: [n] ([%])
- 🟡 PARTIALLY-DISCLOSED: [n] ([%])
- 🟡 DISCLOSED-VAGUE: [n] ([%])
- 🔴 DISCLOSED-SPECIFIC: [n] ([%])
- 🔴 DISCLOSED-BY-THEM: [n] ([%])
- 🔴 DISCLOSED-BY-COURT: [n] ([%])
- 🟠 INFERRED: [n] ([%])
- ⚪ UNKNOWN: [n] ([%])

INFORMATION ADVANTAGE SCORE: [1-10 scale]
- 10 = We know everything, they know nothing
- 1 = Full parity, no information advantage

SURPRISE INVENTORY: [n] items with SV ≥ 3
- SMOKING-GUN: [n]
- THEORY-HIDDEN: [n]
- WITNESS-UNKNOWN: [n]
- IMPEACHMENT: [n]
- DAMAGES-HIDDEN: [n]
- PATTERN: [n]
- ADMISSION-UNUSED: [n]
```

## Chunk Protocol

If the Ledger exceeds 30 rows:
- **Part 1:** Ledger rows 1-30 + Surprise Inventory
- Stop: "Part 1 complete. Reply 'continue' for remaining Ledger rows + Summary + Inference Map."
- **Part 2:** Remaining rows + Summary Statistics + Inference Chain Map

## Important Notes

- AUDIT is non-destructive. It reads packs but does not modify them.
- Run AUDIT periodically — after each major litigation event (deposition,
  motion filing, discovery exchange, settlement communication).
- The Ledger is cumulative. Each AUDIT updates existing entries and adds new ones.
- When in doubt about disclosure status, classify as `UNKNOWN` and flag
  for attorney review rather than guessing.
