# SDC Reference: POSTURE Mode — Strategic Disclosure Posture Setting

## Purpose

Define the overall disclosure strategy for the current litigation phase,
calibrated to opposing counsel and judge behavioral profiles (AIP),
case strength (PCM), and momentum (CFP timeline).

## Posture Definitions

### TIGHT — "Keep It Close to the Chest"

**Philosophy:** Disclose the absolute minimum. Every word is measured.
Complaints are vague. Discovery responses are narrow. Objections are broad.
Communications are sparse. Let them wonder.

**Best for:**
- Early litigation (pre-discovery or early discovery)
- Weak or inexperienced opposing counsel
- Cases with strong surprise inventory (multiple SV ≥ 4 items)
- When momentum is favorable and you want to maintain tempo advantage
- When defense hasn't yet figured out the strength of your case

**Indicators to adopt TIGHT:**
- PCM shows COVERED or ADMITTED on most elements → strength to protect
- AIP shows OC with boilerplate objection pattern → they won't push back
- Surprise Inventory has ≥ 3 items with SV ≥ 4
- No court orders compelling specific disclosures

**Risk:** If judge has liberal discovery tendencies, being too TIGHT may
result in adverse rulings on motions to compel. Check AIP judge profile.

**Phase-specific guidance:**

| Phase | TIGHT Looks Like |
|-------|-----------------|
| Complaint | Notice pleading. General allegations. "Injuries" not "L4-L5 disc herniation." Damages "to be proven." |
| Discovery (responding) | Object broadly (relevance, scope, burden). Answer minimally. "Subject to objections..." |
| Discovery (serving) | Broad requests. Decoy topics mixed in. Minimize theory-telegraphing. |
| Depositions | Prepare witness to answer only what's asked. Short answers. "I don't recall the specifics." |
| Motions | File only when necessary. Cite minimum facts/law to prevail. |
| Settlement | Don't initiate. If they ask, high anchor. Minimal damages disclosure. |

### SELECTIVE — "Show Them What We Want Them to See"

**Philosophy:** Control the narrative through deliberate, curated
disclosures. Reveal strengths to build pressure. Hide weaknesses and
surprises. Every disclosure is a strategic choice with a specific purpose.

**Best for:**
- Mid-litigation (discovery in progress)
- Building settlement pressure
- When you have strong proof on some elements but gaps on others
- When OC is moderately skilled (they'll push back but can be managed)
- When you want to shape the defense's preparation for mediation/trial

**Indicators to adopt SELECTIVE:**
- PCM shows mix of COVERED and gap statuses
- AIP shows OC who responds to demonstrated strength
- Settlement discussions are opening or upcoming
- Some surprise items are ready for strategic deployment

**Phase-specific guidance:**

| Phase | SELECTIVE Looks Like |
|-------|---------------------|
| Complaint | Amend to add specificity on strong claims. Keep weak claims general. |
| Discovery (responding) | Full answers on strong topics. Minimal + objection on weak topics. |
| Discovery (serving) | Target defense weaknesses. Expose their gaps. |
| Depositions | Use depositions to establish strong facts on record. Avoid weak areas. |
| Motions | File strategic motions that showcase strength (MSJ on specific claims, MTC on strong deficiency items). |
| Settlement | Detailed demand on strong elements. Vague on weak ones. Partial damages disclosure. |

### PROGRESSIVE — "Turn Up the Heat"

**Philosophy:** Gradually escalate disclosure over a planned timeline.
Each disclosure builds on the last, creating cumulative momentum pressure.
The defense feels the noose tightening.

**Best for:**
- Pre-mediation strategy
- When you have multiple strong items to deploy in sequence
- When OC/adjuster settlement behavior responds to momentum
- When trial date is approaching and you want escalating pressure

**Indicators to adopt PROGRESSIVE:**
- Surprise Inventory has 3+ items suitable for sequenced reveal
- AIP shows adjuster/OC who "moves at mediation" or responds to pressure
- Momentum is Favorable or Critical-Leverage
- Clear deployment timeline: discovery → GFL → MTC → demand → mediation

**Sequence template:**

```
WEEK 1-2: Disclose Item A (moderate value) via targeted discovery supplement
WEEK 3-4: Disclose Item B (higher value) via deposition exhibit
WEEK 5-6: File motion citing Items A + B (court record, momentum)
WEEK 7-8: Send demand letter with full damages (anchor high)
WEEK 9-10: Mediation — reveal Item C (highest value) for maximum impact
```

### OVERWHELMING — "Shock and Awe"

**Philosophy:** Disclose everything at once to demonstrate overwhelming
case strength. Designed to end the case — either via settlement or by
making the defense realize trial is unwinnable.

**Best for:**
- Strong case with multiple COVERED elements and high-SV surprise items
- Pre-trial when you want to force settlement
- When defense has been unreasonable and you need to break the logjam
- After completing all discovery and building full proof

**Indicators to adopt OVERWHELMING:**
- PCM shows TRIAL-READY or near-TRIAL-READY
- Surprise Inventory has high-impact items ready for deployment
- Previous PROGRESSIVE or SELECTIVE disclosures haven't moved the needle
- Defense needs a wake-up call

**Execution:** Single comprehensive disclosure event:
- Updated demand with full damages breakdown
- Summary of all evidence (organized by element)
- Expert opinions (disclosed or summarized)
- Trial exhibit list
- Witness list with anticipated testimony summaries

### DEFENSIVE — "Seal the Leaks"

**Philosophy:** We've been disclosing too much, or OC is exploiting our
disclosures effectively. Time to tighten up and reassess.

**Best for:**
- After an adverse deposition where too much was revealed
- When defense is using our disclosures against us (defense MSJ citing
  our own evidence, deposition impeachment)
- When we realize our posture has been too loose
- After a DEBRIEF reveals significant inadvertent disclosure

**Indicators to adopt DEFENSIVE:**
- DEBRIEF shows multiple inadvertent disclosures
- Surprise Inventory has shrunk significantly
- Defense motions are citing our own disclosures effectively
- Information Advantage Score has dropped below 5

**Phase-specific guidance:**

| Phase | DEFENSIVE Looks Like |
|-------|---------------------|
| Discovery (responding) | Maximum objections. Seek protective orders. Narrow responses. |
| Depositions | Prepare witness extensively. Instruct on short answers. Object frequently. |
| Motions | Seal or redact where permissible. In camera review requests. |
| Settlement | Pause communications. Don't respond immediately. Reassess position. |

## AIP Calibration Matrix

Use AIP profiles to fine-tune posture:

### Opposing Counsel Profile → Posture Adjustment

| OC Trait | Posture Adjustment |
|----------|-------------------|
| `discovery_style = "Boilerplate objections"` | TIGHT is safe — they won't push back effectively |
| `discovery_style = "Aggressive, targeted"` | TIGHT may backfire — they'll file MTC. Consider SELECTIVE. |
| `settlement_behavior = "Lowballs until trial"` | PROGRESSIVE builds pressure they respond to |
| `settlement_behavior = "Moves at mediation"` | Save best reveals for mediation (PROGRESSIVE → mediation bomb) |
| `motion_practice = "Files frivolous MSJs"` | SELECTIVE — reveal enough to defeat MSJ but save the rest |
| `negotiation_style = "Anchors extreme, moves slowly"` | NUMBERS-ANCHOR + PROGRESSIVE to outpace them |
| `deposition_style = "Aggressive, frequent objections"` | Prepare TIGHT deposition protocol — short answers, minimal volunteering |

### Judge Profile → Posture Constraint

| Judge Trait | Posture Constraint |
|-------------|-------------------|
| `discovery_tendency = "Grants MTCs liberally"` | TIGHT posture on discovery responses is risky — be prepared to supplement |
| `discovery_tendency = "Strict on GFL prerequisite"` | Good faith letters must be substantive — SELECTIVE disclosure in GFL |
| `msj_tendency = "Grants MSJ readily"` | SELECTIVE — disclose enough evidence to create genuine issue of material fact |
| `formatting_preferences = "Prefers short briefs"` | TIGHT works — brief filings are consistent |
| `settlement_tendency = "Pushes settlement at CMC"` | Be ready with SELECTIVE disclosure at first CMC |

### Adjuster Profile → Demand Calibration

| Adjuster Trait | Posture for Settlement |
|---------------|----------------------|
| `initial_offer_pattern = "25-35% of specials"` | SELECTIVE: show specials clearly, hold non-economic details |
| `authority_level = "Up to $50K"` | If case > $50K, PROGRESSIVE to force supervisor involvement |
| `negotiation_style = "Algorithm-driven"` | SELECTIVE: structured, data-driven disclosures |
| `settlement_behavior = "Moves at mediation"` | PROGRESSIVE → save best reveals for mediation |

## Posture Transition Rules

Postures should evolve as the case progresses. Common transitions:

```
TIGHT (early) → SELECTIVE (mid-discovery) → PROGRESSIVE (pre-mediation) → OVERWHELMING (pre-trial)
```

**Transition triggers:**
- TIGHT → SELECTIVE: Discovery is producing results; time to build narrative
- SELECTIVE → PROGRESSIVE: Mediation scheduled; time to build momentum
- PROGRESSIVE → OVERWHELMING: Mediation failed; trial approaching; time for shock and awe
- ANY → DEFENSIVE: Significant inadvertent disclosure; defense exploiting our information

**Never transition backward without cause.** Going from SELECTIVE back to
TIGHT signals weakness unless justified by a specific event (adverse ruling,
new vulnerability discovered).

## Output Format

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SDC POSTURE ASSESSMENT — [Case Name] — [Date]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CURRENT PHASE: [Pre-suit / Early Discovery / Mid-Discovery /
               Late Discovery / Pre-Mediation / Post-Mediation /
               Pre-Trial / Trial]

RECOMMENDED POSTURE: [TIGHT / SELECTIVE / PROGRESSIVE / OVERWHELMING / DEFENSIVE]

BASIS:
- PCM Readiness: [TRIAL-READY / PARTIAL-GAPS / CRITICAL-GAPS]
- Surprise Inventory: [N] items, avg SV [X]
- Momentum: [Critical-Leverage / Favorable / Neutral / Unfavorable / Adverse]
- OC Profile: [key traits affecting posture]
- Judge Profile: [key constraints]
- Adjuster Profile: [key traits for settlement posture]

PHASE-SPECIFIC GUIDANCE:
[Table of what to do/not do in current phase under this posture]

UPCOMING TRANSITION:
- Next posture: [recommendation]
- Trigger: [what event should cause the transition]
- Timeline: [estimated]

POSTURE-SPECIFIC RULES:
1. [Rule for current phase + posture]
2. [Rule]
3. [Rule]

[DECISION REQUIRED] — Attorney must confirm posture before SDC applies
it to REDLINE and REVEAL modes.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
