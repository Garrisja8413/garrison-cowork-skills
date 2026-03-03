# SDC Reference: DEBRIEF Mode — Post-Event Disclosure Logging

## Purpose

After any event where information was exchanged — deposition, hearing,
mediation, meet-and-confer, settlement conference — log exactly what was
disclosed by both sides and update the Disclosure Ledger.

## Input Requirements

1. **Event description** — what happened (deposition of X, hearing on Y)
2. **Event date**
3. **Participants** — who was present
4. **Source material** — any of:
   - Deposition transcript (full or rough)
   - Hearing transcript or notes
   - Mediation notes (marked privileged)
   - Meet-and-confer correspondence
   - Attorney notes from event
   - Settlement communication

## Debrief Protocol

### Step 1: What Did WE Disclose?

Scan the event record for information we provided. For each:

| Question | How to Classify |
|----------|----------------|
| Was this an intentional disclosure? | If yes → update Ledger per plan |
| Was this an inadvertent disclosure? | If yes → **FLAG** for damage assessment |
| Did our witness volunteer information not asked for? | **FLAG** — volunteered info often reveals more than intended |
| Did we introduce an exhibit? | Ledger item → DISCLOSED-SPECIFIC |
| Did we cite a legal theory or authority? | Legal theory → DISCLOSED-BY-COURT or DISCLOSED-SPECIFIC |
| Did we state a damages figure? | Damages item → DISCLOSED-SPECIFIC |
| Did we reference a witness not previously known to defense? | Witness → DISCLOSED-SPECIFIC (at minimum, existence disclosed) |

**Intentional disclosures:** Cross-reference against the Reveal Plan
(if one exists). Mark as executed. Update Ledger per plan.

**Inadvertent disclosures:** These require damage assessment:
```
⚠️ INADVERTENT DISCLOSURE
Item: [Ledger reference]
Event: [Event description]
How it happened: [Attorney volunteered / Witness blurted / Exhibit shown
                  inadvertently / Question sequence forced it]
Previous Status: [UNDISCLOSED] → New Status: [DISCLOSED-SPECIFIC]
Surprise Value Lost: [X → 1]
Damage Assessment: [What can the defense now do with this information?]
Mitigation: [What can we do to limit the damage?]
```

### Step 2: What Did THEY Disclose?

Scan the event record for new information from the defense. For each:

**New facts:**
- Create CFP Delta Request (new fact for CFP EXTRACT)
- Classify: helpful or harmful to our case?
- If helpful → potential ADMISSION-UNUSED category
- If harmful → assess impact on PCM + prepare rebuttal

**Admissions:**
- Create CFP Admission entry (type based on source)
- Flag for immediate deployment or hold (SDC classification)
- Admissions are powerful — they can be used at any time

**Legal theories revealed:**
- What legal arguments is the defense telegraphing?
- Flag for LPB research if new authority cited
- Update AIP with any behavioral intelligence observed

**Witness information:**
- New witnesses identified? → prepare for deposition
- Witness credibility observations → update CFP cred_scores

**Settlement positions:**
- Record in DVP settlement_offers
- Analyze: what did their number/position reveal about their assessment?
- Update AIP adjuster/OC profiles with negotiation intelligence

### Step 3: What Can They Now INFER?

This is the most important analytical step. Based on everything that
was disclosed (by both sides) during this event:

1. **Direct inferences:** What can they now deduce from what was said?
2. **Combinatorial inferences:** What can they infer by combining event
   disclosures with prior disclosures?
3. **Strategic inferences:** What can they infer about our strategy from
   our questions, exhibits, and behavior?

For each inference:
- Identify the affected Ledger item
- Update status from UNDISCLOSED → INFERRED
- Adjust Surprise Value accordingly
- Document the inference chain in Notes

### Step 4: Surprise Inventory Impact Assessment

Compare pre-event and post-event Surprise Inventory:

```
SURPRISE INVENTORY IMPACT:
Pre-event: [N] items, avg SV [X]
Post-event: [N'] items, avg SV [X']

ITEMS LOST:
- [Ledger ref] — SV [old] → [new] — [how it was disclosed/inferred]

ITEMS RETAINED:
- [Ledger ref] — SV unchanged at [X] — [why it's still protected]

ITEMS GAINED:
- [New admission/information from defense] — classified as [category]

NET CHANGE: [+/- N items], [+/- X avg SV]
```

### Step 5: Posture Reassessment

Based on the debrief results, assess whether current posture is still
appropriate:

**Triggers for posture change:**
- Significant inadvertent disclosure → consider DEFENSIVE
- Defense revealed major weakness → consider PROGRESSIVE or OVERWHELMING
- Surprise Inventory significantly depleted → reassess strategy
- Defense showed unexpected strength → consider DEFENSIVE
- Successful planned reveal → continue current posture or escalate

### Step 6: Update Action Items

Generate specific follow-up tasks:

**For the team:**
- [ ] Update CFP with new facts from event
- [ ] Create CFP Delta Requests for information to verify
- [ ] Update AIP profiles with observed behavioral intelligence
- [ ] Update DVP with any settlement positions exchanged
- [ ] Run LPB research on any new legal theories identified
- [ ] Prepare for any depositions triggered by new witness information
- [ ] Draft supplemental discovery if new topics emerged

**For SDC specifically:**
- [ ] Update Disclosure Ledger with all status changes
- [ ] Recalculate Surprise Values for INFERRED items
- [ ] Update inference chain map
- [ ] Reassess Posture if warranted
- [ ] Update any active Bluff Register entries
- [ ] Revise Reveal Plans if sequence was affected

## Output Format

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SDC DEBRIEF — [Event Type] — [Date]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

EVENT: [Description]
DATE: [Date]
PARTICIPANTS: [Names and roles]
SOURCE: [Transcript / Notes / Correspondence]

═══ OUR DISCLOSURES ═══

INTENTIONAL ([count]):
| # | Ledger Ref | Item | Old Status | New Status | Per Reveal Plan? |
|---|-----------|------|-----------|-----------|-----------------|

INADVERTENT ([count]):
| # | Ledger Ref | Item | Old Status | New Status | SV Lost | Damage Assessment |
|---|-----------|------|-----------|-----------|---------|------------------|

⚠️ [Damage assessment detail for each inadvertent disclosure]

═══ THEIR DISCLOSURES ═══

NEW FACTS ([count]):
| # | Fact | Source Moment | Helpful/Harmful | CFP Action |
|---|------|-------------|----------------|-----------|

ADMISSIONS ([count]):
| # | Admission | Source Moment | Type | Deployment Status |
|---|-----------|-------------|------|------------------|

═══ INFERENCE ANALYSIS ═══

ITEMS NOW INFERABLE ([count]):
| # | Ledger Ref | Item | Inference Chain | SV Change |
|---|-----------|------|---------------|-----------|

═══ SURPRISE INVENTORY IMPACT ═══

[Pre/post comparison as described in Step 4]

═══ POSTURE REASSESSMENT ═══

Current Posture: [POSTURE]
Recommendation: [Maintain / Adjust to X]
Basis: [Why]

═══ ACTION ITEMS ═══

[Structured task list per Step 6]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Special Debrief Considerations by Event Type

### Deposition Debrief
- Review full transcript (or rough) line by line
- Every exhibit used → Ledger update
- Every question asked → did it telegraph strategy?
- Every answer given → did our witness over-disclose?
- Defense counsel's questions → what are THEY looking for?
- Objections made → what are they trying to protect?

### Mediation Debrief
- Mediation privilege protects communications
- But: defense NOW KNOWS even if they can't use it formally
- Update Ledger for items revealed to mediator/defense
- Critical: what did the mediator tell us about defense's position?
- Settlement figures exchanged → DVP update

### Hearing/Oral Argument Debrief
- Everything said is on the record → DISCLOSED-BY-COURT
- Judge's questions and comments → update AIP judge profile
- Ruling (if any) → update case posture
- OC's arguments → what theories are they pursuing?

### Meet-and-Confer Debrief
- What did we tell them about our discovery needs?
- What did they reveal about their objections/positions?
- Did we telegraph why we want specific discovery?
- Did they inadvertently reveal what they're trying to hide?
