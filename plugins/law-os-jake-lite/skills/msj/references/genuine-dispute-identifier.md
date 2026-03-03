# MSJ Tool: Genuine Dispute Identifier (GDI)

## Tool Code: GDI

## Purpose

Identifies and articulates genuine issues of material fact that exist in
the record and preclude summary judgment. Used when:

1. **Opposing defendant's MSJ** — find the disputes that defeat their motion
2. **Auditing our own MSJ** — identify vulnerabilities before filing
3. **Pre-filing analysis** — assess whether MSJ is viable or premature

## Governing Legal Standard

### What Makes a Dispute "Genuine"

A dispute is genuine when the evidence is such that a reasonable jury
could return a verdict for the nonmoving party. NMRA 1-056; `[VERIFY-CITE]`

- Not genuine: mere allegations, conclusory statements, or speculation
- Not genuine: dispute over immaterial facts
- Genuine: conflicting testimony, contradictory documents, reasonable
  competing inferences from the same facts
- Genuine: credibility determination required

### What Makes a Fact "Material"

A fact is material if it might affect the outcome under the governing
substantive law. A fact is material if it bears on an element of a
claim or defense. `[VERIFY-CITE]`

## Integration Architecture

```
CFP PACKET (record facts) ──────────────────┐
                                              │
LPB PACKET (elements of claims/defenses) ────┤
                                              ├── GDI ──► Dispute Map
PCM (element-fact coverage) ─────────────────┤          + Dispute Briefs
                                              │          + Vulnerability Report
Inference Engine (inferences from facts) ────┘
Opponent's MSJ (if opposing) ── optional ────
```

## Modes

| Mode | Purpose | When Used |
|------|---------|-----------|
| **IDENTIFY** | Find all genuine disputes in the record | Opposing defendant's MSJ or pre-filing audit |
| **ARTICULATE** | Draft dispute explanations for Response brief | Drafting MSJ_RESPONSE_ATOMIC |
| **AUDIT-OWN** | Identify vulnerabilities in our own MSJ | Before filing our MSJ |

## Required Inputs

### For IDENTIFY Mode
```xml
<evidence_layer>
[CFP PACKET — all DRAFT-READY facts with record cites]
</evidence_layer>

<legal_layer>
[LPB PACKET — elements of claims/defenses at issue]
</legal_layer>

<opponent_motion>
[Defendant's MSJ + SUMF — if opposing their motion]
</opponent_motion>
```

### For AUDIT-OWN Mode
```xml
<evidence_layer>
[CFP PACKET — all facts, not just those in our SUMF]
</evidence_layer>

<our_motion>
[Our draft MSJ + SUMF — the motion to audit]
</our_motion>
```

## Process: IDENTIFY Mode

### Step 1: Element Mapping
For each element of each claim/defense at issue:
- What must the movant prove is undisputed?
- What facts does the movant rely on?
- What record cites support those facts?

### Step 2: Contradiction Search
For each movant fact, search the CFP record for:
- **Direct contradiction:** Another document says the opposite
- **Inconsistent testimony:** Deponent's own prior inconsistent statements,
  or different witnesses giving different accounts
- **Missing context:** Fact is true but incomplete — full context changes meaning
- **Competing inference:** Same facts support a different reasonable conclusion
  (invoke Inference Engine DRAW mode)
- **Credibility challenge:** Fact depends on witness whose credibility is disputed
- **Expert disagreement:** Experts reach different conclusions from same data

### Step 3: Materiality Check
For each contradiction found:
- Which element does it affect?
- If this fact were resolved in nonmovant's favor, would it change the
  outcome on that element?
- If yes → GENUINE DISPUTE OF MATERIAL FACT
- If no → immaterial dispute (note but do not rely on)

### Step 4: Sufficiency Check
For each genuine dispute identified:
- Is there admissible evidence supporting the nonmovant's version?
  (not just allegations or attorney argument)
- Would a reasonable jury credit the nonmovant's evidence?
- Is the evidence more than a mere scintilla?

## Output: IDENTIFY Mode

### 1) Dispute Map

| D# | Element | Movant's Claimed Fact | Our Contradicting Evidence | Dispute Type | Material? | Genuine? | Strength |
|----|---------|----------------------|---------------------------|-------------|-----------|----------|----------|
| D-001 | [element] | "[movant's SUMF ¶X]" | [CFP Fact# + DocID + pin] | Direct contradiction | YES | YES | STRONG |
| D-002 | [element] | "[movant's SUMF ¶Y]" | [CFP Fact# + DocID + pin] | Competing inference | YES | YES | MODERATE |
| D-003 | [element] | "[movant's SUMF ¶Z]" | [CFP Fact# + DocID + pin] | Credibility issue | YES | YES | MODERATE |

### 2) Dispute Analysis (per dispute)

For each genuine dispute:

**D-[#]: [Element Name]**
- **Movant claims:** [their SUMF statement + cite]
- **Record shows:** [our contradicting evidence + CFP Fact# + DocID + pin]
- **Dispute type:** [Direct contradiction / Inconsistent testimony / Competing
  inference / Missing context / Credibility / Expert disagreement]
- **Why genuine:** [Explain why a reasonable jury could resolve this in
  nonmovant's favor]
- **Why material:** [Explain which element this affects and how resolution
  would change the outcome]
- **Admissible basis:** [Identify the admissible evidence — not just
  attorney argument]

### 3) Elements Without Genuine Dispute

| Element | Movant's Facts | Our Evidence | Assessment |
|---------|---------------|-------------|-----------|
| [element] | [SUMF ¶s] | [our facts] | No genuine dispute — consider conceding |

### 4) Vulnerability Summary

| Risk Level | Count | Details |
|------------|-------|---------|
| Elements with STRONG disputes | [X] | MSJ should be denied on these |
| Elements with MODERATE disputes | [X] | Arguable — strengthen with additional evidence |
| Elements with WEAK/NO dispute | [X] | Vulnerable — may need additional discovery |

## Output: ARTICULATE Mode

For each genuine dispute identified in IDENTIFY mode, draft a
MSJ_RESPONSE_ATOMIC argument paragraph:

**Element: [Name]**

> Defendant claims [their SUMF assertion]. SUMF ¶X. However, the record
> establishes [contradicting evidence]. [DocID], [Bates/Page:Line]. A
> reasonable jury could [find/conclude] [nonmovant-favorable inference].
> See [NM authority on favorable inferences at MSJ] `[VERIFY-CITE]`.
> Because a genuine dispute of material fact exists on [element],
> summary judgment must be denied.

### ARTICULATE Output Contract:
1. Counter-Statement of Disputed Material Facts (numbered, with cites)
2. Element-by-element dispute argument (IRAC format)
3. Cite Table
4. Gate Results
5. Open Items

## Output: AUDIT-OWN Mode

### 1) Vulnerability Report

For each element in our MSJ:

| Element | Our SUMF ¶s | Potential Dispute Source | Risk | Recommendation |
|---------|------------|------------------------|------|----------------|
| [element] | ¶1, ¶3 | [what opponent might cite] | HIGH | [action item] |
| [element] | ¶5, ¶6 | None identified | LOW | Proceed |

### 2) Anticipated Disputes

For each HIGH or MEDIUM risk element:
- **What we claim:** [our SUMF]
- **What opponent might argue:** [anticipated counter-evidence]
- **Source of dispute:** [where in the record]
- **Our response strategy:** [how to address in Reply brief]
- **Preemptive fix:** [consider adding to SUMF or addressing in motion]

### 3) Discovery Gaps

Facts that would eliminate disputes but are not yet in the record:
| Gap | What's Needed | Proposed Cure | Priority |
|-----|--------------|---------------|----------|
| [description] | [specific evidence] | [RFP/ROG/depo/expert] | HIGH |

## Dispute Type Definitions

### Direct Contradiction
Two documents state opposite things. Example: medical records say
"patient was conscious" vs. nursing notes say "patient was unresponsive."

### Inconsistent Testimony
Same or different witnesses give conflicting accounts. Example:
defendant says light was green in deposition, but said "I don't
remember" in the police report.

### Competing Inference
Same undisputed facts support two different reasonable conclusions.
Example: 3-hour ER wait — inference of understaffing vs. inference
of appropriate triage. (Invoke Inference Engine for analysis.)

### Missing Context
Movant's fact is technically true but misleading without additional
context that changes its significance. Example: "Patient was non-
compliant with treatment" — but records show patient was unable to
afford the medication and communicated this to the provider.

### Credibility Determination
The fact depends on a witness whose truthfulness a jury must evaluate.
Example: defendant's self-serving testimony about warning signs posted.

### Expert Disagreement
Competing experts reach different conclusions from the same data.
Example: plaintiff's expert says standard of care required X;
defendant's expert says standard of care only required Y.

## Integration Points

| System | How GDI Connects |
|--------|-----------------|
| **CFP** | GDI searches CFP PACKET for facts contradicting movant's SUMF |
| **LPB** | GDI uses LPB to determine which elements are at issue and what's material |
| **PCM** | GDI uses PCM coverage to quickly identify elements with fact gaps |
| **Inference Engine** | GDI invokes IE DRAW mode for competing inference analysis |
| **MSJ** | GDI feeds MSJ_RESPONSE_ATOMIC (ARTICULATE mode) and MSJ audit (AUDIT-OWN mode) |
| **DC** | GDI may identify damages disputes relevant to settlement evaluation |
