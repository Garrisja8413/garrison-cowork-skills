# MSJ Tool: Additional / Alternative Material Facts (AMF)

## Tool Code: AMF

## Purpose

Identifies, selects, and organizes additional or alternative material
facts from the record to strengthen our MSJ response. When opposing
defendant's motion for summary judgment, we need more than just
disputing their facts — we need to present our own affirmative facts
that reframe the record in our favor.

Used for:
1. **Building Counter-Statements** — facts defendant omitted or minimized
2. **Filling element gaps** — facts needed to defeat MSJ on specific elements
3. **Reframing the narrative** — contextual facts that change how the court
   views the undisputed facts
4. **Strengthening inference chains** — additional facts that upgrade
   inference confidence from WEAK/MODERATE to STRONG

## Governing Legal Standard

### Nonmovant's Right to Present Additional Facts

Under NMRA 1-056, the nonmovant opposing summary judgment may:
- Dispute movant's asserted facts with contradicting evidence
- Present **additional material facts** that create genuine disputes
- Rely on the entire record, not just what movant cited
- Draw all reasonable inferences from the full record

`[VERIFY-CITE]` for NM-specific rules on counter-statements and
additional facts in MSJ responses.

### What Qualifies as an "Additional Material Fact"

An additional material fact for MSJ response purposes must be:
1. **Supported by admissible evidence** in the record (with pinpoint cite)
2. **Material** to an element of a claim or defense at issue
3. **Not merely cumulative** of facts already presented
4. **Properly cited** to specific record evidence (not attorney argument)

## Integration Architecture

```
CFP PACKET (full record) ────────────────────┐
                                               │
LPB PACKET (elements) ────────────────────────┤
                                               ├── AMF ──► Additional Facts Set
PCM (element coverage + gaps) ────────────────┤          + Counter-Statement Draft
                                               │          + Fact Selection Rationale
GDI (genuine dispute map) ────────────────────┤
                                               │
Inference Engine (inference chains) ──────────┘
Opponent's MSJ + SUMF ── required ────────────
```

## Modes

| Mode | Purpose | When Used |
|------|---------|-----------|
| **MINE** | Search full CFP for facts not in defendant's SUMF | Building MSJ response |
| **SELECT** | Prioritize and organize mined facts by element | Drafting counter-statement |
| **REFRAME** | Identify contextual facts that reframe movant's facts | Strengthening MSJ response narrative |
| **UPGRADE** | Find facts that strengthen weak inference chains | Improving inference confidence |

## Required Inputs

### For All Modes
```xml
<evidence_layer>
[CFP PACKET — FULL record, not just SUMF candidates]
</evidence_layer>

<legal_layer>
[LPB PACKET — elements of all claims/defenses at issue]
</legal_layer>

<opponent_motion>
[Defendant's MSJ + SUMF]
</opponent_motion>
```

### Optional (Recommended)
```xml
<strategic_layer>
[PCM — element coverage analysis]
[GDI output — genuine dispute map]
[Inference Engine output — current inference chains]
</strategic_layer>
```

## Process: MINE Mode

### Step 1: Map Defendant's SUMF
Catalog every fact defendant asserted in their SUMF:
- What element does it support?
- What record evidence did they cite?
- What did they leave out from that same source?

### Step 2: Full Record Scan
For each element at issue, scan the entire CFP PACKET for facts
defendant did NOT cite:
- Facts from the same documents defendant cited (omitted portions)
- Facts from documents defendant did not cite at all
- Timeline facts that provide crucial context
- Testimony quotes that contradict defendant's narrative
- Expert opinions or findings not referenced by defendant

### Step 3: Categorize Mined Facts

| Category | Definition | Priority |
|----------|-----------|----------|
| **CONTRADICTING** | Directly contradicts a defendant SUMF fact | HIGHEST |
| **CONTEXTUALIZING** | Adds essential context to a defendant SUMF fact | HIGH |
| **GAP-FILLING** | Addresses an element defendant claims lacks evidence | HIGH |
| **INFERENCE-BOOSTING** | Strengthens a weak inference chain | MEDIUM |
| **NARRATIVE** | Reframes the overall case story in plaintiff's favor | MEDIUM |
| **CUMULATIVE** | Supports an already-strong element | LOW — exclude unless powerful |

### Step 4: Admissibility Screen
For each mined fact:
- Is it based on admissible evidence? (not hearsay, not speculation)
- Can it be presented in admissible form at trial?
- If admissibility is uncertain → flag `[ADMISSIBILITY-CHECK]`

## Output: MINE Mode

### 1) Mined Facts Inventory

| MF# | Fact Statement | Source (DocID + Pin) | CFP Fact# | Category | Element_ID | In Def's SUMF? | Priority |
|------|---------------|---------------------|-----------|----------|-----------|----------------|----------|
| MF-001 | [fact text] | [DocID:Bates/p:l] | F-042 | CONTRADICTING | BREACH-001 | NO | HIGHEST |
| MF-002 | [fact text] | [DocID:Bates/p:l] | F-017 | CONTEXTUALIZING | CAUSE-001 | NO | HIGH |
| MF-003 | [fact text] | [DocID:Bates/p:l] | F-055 | GAP-FILLING | DUTY-002 | NO | HIGH |

### 2) Omission Analysis

Facts from sources defendant cited but chose not to include:

| Def's SUMF ¶ | Def Cited Source | What Def Quoted/Cited | What Def Omitted | Significance |
|-------------|-----------------|----------------------|-----------------|-------------|
| ¶3 | DocID-MR-005 | "patient stable at discharge" | Same page: "patient reported persistent pain" | Undermines Def's "no injury" argument |

### 3) Element Gap Analysis

| Element_ID | Def's Position | Our Additional Facts | Impact |
|-----------|---------------|---------------------|--------|
| BREACH-001 | "No deviation from standard" | MF-001, MF-005, MF-008 | Creates genuine dispute |
| CAUSE-001 | "No causation evidence" | MF-002, MF-003 | Fills causation gap |

## Output: SELECT Mode

### 1) Prioritized Fact Selection

Organized by element, ranked by impact:

**Element: [Name] — [Def's position: "no genuine dispute"]**

| Rank | MF# | Fact | Category | Why Selected |
|------|------|------|----------|-------------|
| 1 | MF-001 | [fact] | CONTRADICTING | Directly refutes SUMF ¶3 |
| 2 | MF-005 | [fact] | GAP-FILLING | Expert testimony on standard of care |
| 3 | MF-008 | [fact] | CONTEXTUALIZING | Timeline establishes delay |

**Excluded facts:**
| MF# | Fact | Reason Excluded |
|------|------|----------------|
| MF-012 | [fact] | Cumulative — MF-001 already covers this point |

### 2) Counter-Statement of Additional Material Facts (Draft)

Numbered paragraphs, ready for MSJ_RESPONSE_ATOMIC:

**PLAINTIFF'S ADDITIONAL STATEMENT OF MATERIAL FACTS**

1. [Fact statement]. [DocID], [Bates/Page:Line].
2. [Fact statement]. [DocID], [Bates/Page:Line].
...

Each paragraph:
- One fact only
- Pinpoint record cite
- Source-matched language
- Tagged with Element_ID

## Output: REFRAME Mode

### 1) Reframing Facts

Facts that don't contradict defendant's SUMF directly but change the
interpretive frame:

| RF# | Context Fact | Source | How It Reframes | Target SUMF ¶ |
|------|-------------|--------|----------------|--------------|
| RF-001 | [context fact] | [DocID + pin] | Def says "[X]" but this shows [Y] was the full picture | ¶5 |

### 2) Narrative Bridge

How additional facts connect to build a coherent counter-narrative:

```
Def's Story: [1-2 sentence summary of defendant's MSJ narrative]

Our Counter-Narrative: [1-2 sentence reframe using additional facts]

Key Reframing Facts:
  RF-001: [brief] — shifts [element]
  RF-002: [brief] — provides context for [element]
  RF-003: [brief] — establishes timeline defendant omitted
```

## Output: UPGRADE Mode

### 1) Inference Chain Upgrades

For each WEAK or MODERATE inference chain from Inference Engine:

| Chain | Current Confidence | Upgrading Fact(s) | New Confidence | Explanation |
|-------|--------------------|-------------------|----------------|-------------|
| Chain-1 (CAUSE) | MODERATE | MF-003, MF-007 | STRONG | Additional corroboration eliminates alternative explanation |
| Chain-3 (BREACH) | WEAK | MF-011 | MODERATE | Expert finding now anchors second inference step |

### 2) Remaining Gaps

Inferences that cannot be upgraded with current record:
| Chain | Current Confidence | What's Missing | Proposed Cure |
|-------|--------------------|---------------|---------------|
| Chain-5 | WEAK | Expert causation opinion | Retain causation expert |

## Selection Principles

### Include When:
- Fact directly contradicts a defendant SUMF assertion
- Fact fills an element gap that defendant claims is dispositive
- Fact provides essential context omitted from defendant's presentation
- Fact upgrades a critical inference chain
- Fact is from a source defendant cited but selectively quoted

### Exclude When:
- Fact is merely cumulative (already have 3+ facts on same point)
- Fact is immaterial (doesn't bear on any element at issue)
- Fact is inadmissible and cannot be presented in admissible form
- Fact is argumentative (characterization, not factual assertion)
- Fact would open unfavorable line of inquiry

### Quantity Guidance
- Counter-statement should be focused, not exhaustive
- Typical strong MSJ response: 15-40 additional facts
- Each fact must earn its place by advancing a specific element
- Quality and precision over volume

## Integration Points

| System | How AMF Connects |
|--------|-----------------|
| **CFP** | AMF searches full CFP PACKET — not just SUMF candidates — for additional facts |
| **LPB** | AMF uses LPB to determine which elements need strengthening |
| **PCM** | AMF uses PCM gap analysis to prioritize fact-mining by element |
| **GDI** | AMF builds on GDI's dispute map — mined facts strengthen identified disputes |
| **Inference Engine** | AMF UPGRADE mode uses IE output to find facts that strengthen weak chains |
| **MSJ** | AMF feeds MSJ_RESPONSE_ATOMIC counter-statement and argument sections |
