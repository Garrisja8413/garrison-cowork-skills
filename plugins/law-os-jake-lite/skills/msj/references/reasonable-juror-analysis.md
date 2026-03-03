# MSJ Tool: Reasonable Juror Analysis (RJA)

## Tool Code: RJA

## Purpose

Analyzes whether a reasonable juror could reach a specified conclusion
based on the evidence in the record. This is the core factual question
at summary judgment: whether a reasonable jury could return a verdict for
the nonmoving party. NMRA 1-056; `[VERIFY-CITE]`

This skill integrates:
1. **Mock jury deliberation analysis** — simulate how jurors evaluate
   competing narratives and evidence
2. **Cognitive bias identification** — identify biases that affect how
   jurors (and judges) process evidence
3. **Debiasing strategies** — recommend approaches for countering
   unfavorable biases and leveraging favorable ones
4. **MSJ-specific framing** — translate jury analysis into summary
   judgment language

## Why This Matters

### At Summary Judgment
The MSJ standard asks whether a **reasonable jury** could find for the
nonmovant. This is not asking what would actually happen at trial — it
asks whether the evidence, viewed favorably, permits a rational verdict.

### For Trial Strategy
Understanding how jurors actually process evidence — through narrative
coherence, cognitive shortcuts, and psychological biases — informs how
we present facts at MSJ and at trial.

### For Settlement
Mock jury analysis calibrates case value by predicting how real jurors
would respond to the evidence.

## Integration Architecture

```
CFP PACKET (record facts) ──────────────────┐
                                              │
LPB PACKET (elements + standards) ──────────┤
                                              │
Inference Engine (inference chains) ─────────┤
                                              ├── RJA ──► Juror Analysis
GDI (genuine disputes) ─────────────────────┤          + Bias Report
                                              │          + Strategy Recs
DC (jury-value damages) ────────────────────┤
                                              │
Opponent's argument ── required for ASSESS ──┘
```

## Modes

| Mode | Purpose | When Used |
|------|---------|-----------|
| **ASSESS** | Could a reasonable juror reach [conclusion]? | MSJ analysis (ours or opponent's) |
| **DELIBERATE** | Simulate jury deliberation on key factual disputes | Trial strategy and MSJ preparation |
| **BIAS-AUDIT** | Identify cognitive biases affecting case evaluation | Case strategy review |
| **DEBIAS** | Recommend strategies for countering unfavorable biases | Trial preparation and MSJ framing |

## Required Inputs

### For ASSESS Mode
```xml
<evidence_layer>
[CFP PACKET — record facts with cites]
</evidence_layer>

<legal_layer>
[LPB PACKET — elements and burden of proof standards]
</legal_layer>

<question>
[The specific conclusion to assess. Example: "Could a reasonable juror
find that defendant's failure to diagnose caused plaintiff's injury?"]
</question>

<context>
[Posture: MSJ (ours or opposing) / Trial prep / Settlement eval]
</context>
```

### For DELIBERATE Mode
```xml
<evidence_layer>
[CFP PACKET — record facts]
</evidence_layer>

<disputes>
[GDI output or list of key factual disputes for jury evaluation]
</disputes>

<jury_profile>
[Optional: venue demographics, case type, jury selection notes]
</jury_profile>
```

### For BIAS-AUDIT Mode
```xml
<case_summary>
[Brief case summary including: parties, claims, key facts, venue,
case type, injury severity]
</case_summary>

<evidence_layer>
[CFP PACKET or summary of key evidence]
</evidence_layer>
```

## Process: ASSESS Mode

### Step 1: Frame the Question
Restate the question in precise legal terms:
- What element or issue does this conclusion relate to?
- What burden of proof applies? (preponderance for most PI)
- What is the relevant legal standard?
- Who bears the burden?

### Step 2: Evidence Inventory
Catalog all record evidence bearing on the question:
- Evidence supporting the conclusion
- Evidence opposing the conclusion
- Neutral or ambiguous evidence

### Step 3: Favorable Inference Analysis
(Invoke Inference Engine if not already done)
- What inferences favor the nonmovant?
- Rate each inference: STRONG / MODERATE / WEAK
- Identify the strongest inference chain supporting the conclusion

### Step 4: Reasonable Juror Test
Apply the legal standard:
- Viewing evidence in the light most favorable to the nonmovant
- Drawing all reasonable inferences in the nonmovant's favor
- Could a rational person find [conclusion] more likely than not?

### Step 5: Narrative Coherence Analysis
How would jurors actually process this evidence?
- **Story Model:** Does the evidence supporting this conclusion form a
  coherent, plausible narrative?
- **Anchoring:** What facts serve as cognitive anchors?
- **Credibility:** Which witnesses/sources carry more inherent credibility?
- **Emotional weight:** Which facts carry emotional resonance?

### Step 6: Conclusion
- YES: A reasonable juror could reach this conclusion → MSJ should be
  denied on this issue
- NO: No reasonable juror could reach this conclusion → MSJ should be
  granted on this issue
- CLOSE CALL: Arguable — identify what tips the balance

## Output: ASSESS Mode

### 1) Question Framing
- Legal question: [precise restatement]
- Element: [which element]
- Burden: [who bears it, what standard]
- Posture: [MSJ movant/nonmovant]

### 2) Evidence Matrix

| E# | Evidence | Source | Supports Conclusion | Opposes Conclusion | Weight |
|----|----------|--------|--------------------|--------------------|--------|
| E-001 | [evidence] | [DocID + pin] | YES | — | HIGH |
| E-002 | [evidence] | [DocID + pin] | — | YES | MEDIUM |
| E-003 | [evidence] | [DocID + pin] | AMBIGUOUS | AMBIGUOUS | LOW |

### 3) Inference Analysis
[From Inference Engine or conducted here]
- Best inference chain supporting conclusion: [chain + confidence]
- Best inference chain opposing conclusion: [chain + confidence]

### 4) Reasonable Juror Assessment

**Could a reasonable juror find [conclusion]?**

| Factor | Assessment | Explanation |
|--------|-----------|------------|
| Evidence sufficiency | [Sufficient / Insufficient / Marginal] | [why] |
| Inference reasonableness | [Reasonable / Unreasonable / Debatable] | [why] |
| Narrative coherence | [Strong / Moderate / Weak] | [does the story hold together?] |
| Alternative explanations | [None / Weak alternatives / Strong alternatives] | [what else could explain the evidence?] |
| Credibility dependency | [Low / Moderate / High] | [does it depend on believing one witness over another?] |

**CONCLUSION:** [YES / NO / CLOSE CALL] — A reasonable juror [could / could not]
find [conclusion] based on the current record.

**MSJ IMPLICATION:** [Summary judgment should be granted/denied on this issue because...]

### 5) Strengthening Recommendations
If CLOSE CALL or marginal YES:
| Priority | Recommendation | Expected Impact |
|----------|---------------|-----------------|
| 1 | [additional evidence/argument] | Moves from CLOSE CALL to clear YES |
| 2 | [additional evidence/argument] | Strengthens narrative coherence |

## Process: DELIBERATE Mode

### Step 1: Identify Key Decision Points
What specific factual questions would jurors need to resolve?

### Step 2: Simulate Juror Perspectives

Model deliberation through representative juror archetypes:

| Archetype | Tendency | How They View This Case |
|-----------|---------|----------------------|
| **Analytical** | Focuses on documents, timelines, logical consistency | [assessment] |
| **Empathic** | Focuses on human impact, identifies with injured party | [assessment] |
| **Skeptical** | Distrusts plaintiff motives, concerned about frivolous claims | [assessment] |
| **Authority-Deferential** | Defers to experts, medical professionals, institutions | [assessment] |
| **Personal-Responsibility** | Emphasizes plaintiff's own choices and agency | [assessment] |

These are analytical constructs for case assessment, not predictions of
actual juror behavior.

### Step 3: Deliberation Dynamics
- **Initial polling prediction:** [split estimate based on evidence strength]
- **Key swing facts:** [which facts would move undecided jurors]
- **Holdout scenarios:** [what positions a minority juror could maintain]
- **Verdict range:** [liability finding + damages range]

### Step 4: Vulnerability Identification
- What facts would lose jurors?
- What defense arguments would resonate?
- Where does our narrative break down?

## Output: DELIBERATE Mode

### 1) Decision Point Map
| DP# | Question | Plaintiff Evidence | Defense Evidence | Predicted Split |
|-----|----------|-------------------|-----------------|-----------------|
| DP-001 | Was defendant negligent? | [summary] | [summary] | 8-4 plaintiff |

### 2) Juror Archetype Analysis
[Table from Step 2 above]

### 3) Deliberation Dynamics
- Predicted initial split: [X]-[Y] in [party]'s favor
- Key swing facts: [list]
- Most vulnerable element: [element]
- Predicted verdict: [finding]
- Predicted damages range: [Low/Mid/High]

### 4) Strategic Recommendations
| Priority | Recommendation | Target Archetype | Expected Impact |
|----------|---------------|------------------|-----------------|
| 1 | [recommendation] | Skeptical | Neutralizes biggest defense argument |

## Process: BIAS-AUDIT Mode

### Cognitive Biases Relevant to Litigation

Evaluate the case for the following biases:

#### Biases Favoring Plaintiff
| Bias | Definition | Relevance to This Case |
|------|-----------|----------------------|
| **Hindsight Bias** | Knowing the outcome makes it seem more foreseeable | [assessment] |
| **Outcome Bias** | Judging the quality of a decision by its outcome | [assessment] |
| **Anchoring** (high damages) | Initial number frames all subsequent estimates | [assessment] |
| **Identifiable Victim Effect** | Named victim evokes more sympathy than statistics | [assessment] |
| **Availability Heuristic** | Vivid evidence (photos, testimony) weighs disproportionately | [assessment] |

#### Biases Favoring Defendant
| Bias | Definition | Relevance to This Case |
|------|-----------|----------------------|
| **Just World Hypothesis** | Belief that bad things happen to people who deserve them | [assessment] |
| **Status Quo Bias** | Reluctance to disrupt existing arrangements or institutions | [assessment] |
| **Authority Bias** | Deference to medical professionals or corporate defendants | [assessment] |
| **Anchoring** (low/zero damages) | Defense anchor of "no real injury" frames deliberation | [assessment] |
| **Attribution Error** | Attributing plaintiff's condition to character/choices rather than situation | [assessment] |
| **Defensive Attribution** | "This couldn't happen to me because I'd be more careful" | [assessment] |

#### Biases Affecting Both Sides
| Bias | Definition | Relevance to This Case |
|------|-----------|----------------------|
| **Confirmation Bias** | Seeking/weighting evidence that confirms existing beliefs | [assessment] |
| **Narrative Bias** | Preference for coherent stories over fragmented evidence | [assessment] |
| **Recency Effect** | Disproportionate weight to most recently presented evidence | [assessment] |
| **Complexity Aversion** | Difficulty processing complex technical or medical evidence | [assessment] |

### Assessment Framework
For each bias, rate:
- **Applicability:** HIGH / MEDIUM / LOW / N/A
- **Direction:** Favors Plaintiff / Favors Defendant / Neutral
- **Magnitude:** How much could this bias shift the outcome?
- **Addressability:** Can we mitigate or leverage this bias?

## Output: BIAS-AUDIT Mode

### 1) Bias Profile

| Bias | Applicability | Direction | Magnitude | Addressability |
|------|--------------|-----------|-----------|---------------|
| Hindsight bias | HIGH | Favors Plaintiff | Significant | Leverage in argument |
| Just world | MEDIUM | Favors Defendant | Moderate | Counter in voir dire |
| Authority bias | HIGH | Favors Defendant | Significant | Counter with expert |

### 2) Net Bias Assessment
- Overall bias landscape: [favors plaintiff / defendant / neutral]
- Dominant biases: [top 2-3 with strongest impact]
- Most dangerous bias: [the one most likely to lose us the case]
- Most leverageable bias: [the one we can use most effectively]

### 3) Recommendations
[Feeds into DEBIAS mode]

## Process: DEBIAS Mode

### For Each Identified Bias

#### Countering Biases Favoring Defendant

**Just World Hypothesis:**
- Show systematic failure (not plaintiff's bad luck)
- Emphasize defendant's power/control vs. plaintiff's vulnerability
- Use pattern evidence (same thing happened to others)

**Authority Bias:**
- Present equally credible expert on our side
- Show specific deviation from standards (not attacking the profession)
- Use defendant's own guidelines/protocols against them

**Defensive Attribution:**
- Emphasize circumstances beyond plaintiff's control
- Show how any reasonable person would have been injured
- Make jurors identify with the situation, not avoid it

#### Leveraging Biases Favoring Plaintiff

**Hindsight Bias:**
- Present the warning signs chronologically
- Ask "what would a reasonable provider have done, knowing X?"
- Use defendant's own documentation of risk awareness

**Identifiable Victim Effect:**
- Humanize the plaintiff with specific, relatable details
- Focus on concrete daily impacts (before/after)
- Let plaintiff's own words carry the narrative

**Anchoring:**
- Present damages early and prominently
- Use per diem framing for non-economic damages
- Anchor high with comparable verdicts

## Output: DEBIAS Mode

### 1) Bias Mitigation Strategy

For each dangerous bias:

| Bias | Strategy | Implementation | Timing |
|------|---------|---------------|--------|
| Just world | Pattern evidence | Show same failure affected others | Opening + evidence |
| Authority bias | Counter-expert + protocols | Retain expert; obtain defendant's own SOPs | Discovery + trial |

### 2) Bias Leverage Strategy

For each favorable bias:

| Bias | Strategy | Implementation | Timing |
|------|---------|---------------|--------|
| Hindsight | Chronological warning signs | SUMF organized by timeline | MSJ + trial |
| Anchoring | High damages anchor | Per diem framing in DAMAGES-ARGUMENT | Demand + opening |

### 3) Voir Dire Recommendations

Questions designed to identify and address key biases:

| Target Bias | Proposed Question | Purpose |
|------------|-------------------|---------|
| Just world | "Do you believe that bad things mostly happen for a reason?" | Identify jurors with strong just-world belief |
| Authority bias | "Would you give more weight to a doctor's testimony just because they're a doctor?" | Surface deference to medical authority |

### 4) Jury Instruction Considerations

Suggested instructions that counteract biases:

| Bias | Instruction Approach | UJI Reference |
|------|---------------------|---------------|
| Hindsight | Standard of care at time of incident, not in hindsight | `[VERIFY-CITE]` |
| Complexity aversion | Explain burden of proof clearly; circumstantial evidence instruction | UJI 13-202 `[VERIFY-CITE]` |

## Hard Rules

1. **No prediction of actual jury outcomes.** This is an analytical
   framework, not a fortune-telling tool. All outputs are assessments
   of what is *possible* or *reasonable*, not what *will* happen.

2. **Record-anchored analysis.** Every assessment must reference specific
   record evidence. No speculation about facts not in the record.

3. **Cognitive bias analysis is a tool, not a manipulation manual.**
   The goal is to understand how evidence is processed and present
   the truth more effectively — not to deceive or manipulate jurors.

4. **MSJ standard governs.** When used for MSJ analysis, the question
   is whether a reasonable juror *could* reach the conclusion — not
   whether they *would* or *should*.

5. **Acknowledge uncertainty.** Where reasonable minds differ, say so.
   Where evidence is ambiguous, say so. Never present close calls as
   certainties.

## Integration Points

| System | How RJA Connects |
|--------|-----------------|
| **CFP** | RJA uses CFP PACKET as the evidentiary record for all analysis |
| **LPB** | RJA uses LPB for legal standards and burden of proof |
| **Inference Engine** | RJA uses IE output for inference chains that jurors must evaluate |
| **GDI** | RJA assesses whether identified genuine disputes would survive jury evaluation |
| **AMF** | RJA identifies which additional facts would be most persuasive to jurors |
| **DC** | RJA uses DC jury-value ranges as anchoring analysis; DELIBERATE mode predicts damages range |
| **MSJ** | RJA directly answers the MSJ standard question: "could a reasonable jury find..." |
| **DC DAMAGES-ARGUMENT** | RJA DEBIAS mode informs persuasion strategy for damages narrative |
