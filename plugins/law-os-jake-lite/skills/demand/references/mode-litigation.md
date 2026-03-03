# DEMAND Mode: LITIGATION-DEMAND Reference

## Purpose

The LITIGATION-DEMAND mode produces a settlement demand letter during active litigation. Unlike the pre-suit demand, this demand can leverage discovery findings, deposition testimony, expert opinions, and the procedural posture of the case to apply pressure toward resolution. The SDC disclosure posture is critical -- only authorized disclosures may appear.

---

## Part 1: When to Use LITIGATION-DEMAND

### 1.1 Appropriate Timing Windows

| Litigation Phase | Demand Appropriateness | Notes |
|-----------------|----------------------|-------|
| Post-answer, pre-discovery | LOW | Limited leverage; use PRE-SUIT-DEMAND format unless strategic reason |
| Mid-discovery | MEDIUM | Can reference discovery obtained; emerging evidence strengthens position |
| Post-expert disclosure | HIGH | Expert opinions provide powerful damages support |
| Post-deposition | HIGH | Deposition testimony locks in facts and admissions |
| Pre-MSJ deadline | HIGH | Threat of summary judgment creates settlement pressure |
| Post-MSJ (if survived) | VERY HIGH | Case survived dispositive motion; trial is imminent |
| Pre-trial (30-60 days) | VERY HIGH | Trial preparation costs and uncertainty drive settlement |
| Post-mediation (failed) | HIGH | Mediator's bracket may inform revised demand |

### 1.2 Required Inputs Beyond Standard

In addition to CFP + DC + LPB:

- **Current litigation status** -- what phase, what has been filed, what motions are pending
- **Discovery obtained** -- key admissions, documents produced, deposition testimony
- **Expert reports** -- retained experts and their opinions (especially damages experts)
- **SDC posture assessment** -- what can and cannot be disclosed in the demand
- **Prior demand history** -- if a pre-suit demand was sent, what was the response

---

## Part 2: Litigation Demand Structure

### Section 1: Introduction (Litigation Context)

**Differences from pre-suit:**
- Reference the pending case caption and case number
- Note the current procedural posture
- Reference prior settlement discussions if any

**Template pattern:**
```
As you are aware, this firm represents [CLIENT NAME] in [CLIENT NAME] v.
[DEFENDANT NAME], Cause No. [CASE NUMBER], currently pending in the
[COURT NAME]. [This matter is set for trial on [TRIAL DATE] / Discovery
closes on [DISCOVERY CUTOFF]].

[If prior demand:] On [DATE], we submitted a pre-suit demand in the amount
of $[PRIOR AMOUNT]. [RESPONSE HISTORY]. In light of the evidence developed
through discovery, we write to present a revised demand for resolution of
this matter.

[If no prior demand:] We write to present a comprehensive demand for
resolution of this matter based on the evidence developed through litigation.
```

### Section 2: Liability Summary (Litigation-Enhanced)

**Enhancements over pre-suit:**

1. **Defendant's own admissions** -- Reference answers to interrogatories, RFA responses, deposition testimony where defendant admitted facts favorable to plaintiff
2. **Document production revelations** -- Key documents obtained in discovery that strengthen liability (incident reports, internal communications, prior complaints)
3. **Expert opinions on liability** -- If liability experts have been disclosed, reference their opinions
4. **Failed defenses** -- If defendant's affirmative defenses have been narrowed through discovery or motion practice, note this

**SDC Compliance Gate:**
Before including ANY discovery finding or deposition quote:
- Check SDC disclosure posture for each item
- Items marked UNDISCLOSED in SDC must NOT appear
- Items marked REVEAL-AT-DEMAND in SDC may be included
- Flag any tension as `[DECISION REQUIRED: SDC posture check needed for [item]]`

**Example pattern with discovery references:**
```
Discovery has confirmed [CLIENT NAME]'s account of the incident. In
[DEFENDANT]'s Answers to Interrogatories, [DEFENDANT] admitted that
[ADMISSION]. (CFP Fact#XX; Defendant's Answers to Interrogatories, No. [X]).

Moreover, documents produced by [DEFENDANT] reveal [DAMAGING FACT].
(CFP Fact#XX; Bates No. [DEF-XXXX]).

[DEFENDANT]'s own designated expert, [EXPERT NAME], conceded during
deposition that [CONCESSION]. (CFP Fact#XX; [Expert] Dep. at [page:line]).
```

### Section 3: Injury Narrative (Litigation-Enhanced)

**Enhancements over pre-suit:**
- Reference IME findings (if defense IME supports plaintiff's position)
- Include deposition testimony about pain, limitations, impact on daily life
- Reference plaintiff's deposition testimony establishing damages
- If treating physicians were deposed, cite their testimony on causation and prognosis
- Updated treatment information (ongoing treatment since pre-suit demand)

### Section 4: Damages (Litigation-Enhanced)

**Enhancements over pre-suit:**

| Enhancement | Source | Value |
|-------------|--------|-------|
| Updated medical specials | Continued treatment since pre-suit | Higher total billed |
| Expert damages opinions | Economist, life care planner, vocational expert | Authoritative figures |
| Day-in-the-life evidence | Video or detailed narrative from discovery | Powerful non-economic anchor |
| Defense expert concessions | IME or defense economist concessions | Undercut defense valuation |
| Future damages projection | Medical expert prognosis + life care plan | Long-term cost analysis |

**NM-specific leverage:**
- Pre-judgment interest accruing since date of pre-suit demand (NMSA 56-8-4) -- calculate the accrued amount and include it
- No damages cap in NM for standard PI (powerful against carriers used to capped states)
- Bernalillo County jury verdicts trend (reference DVP outcomes if available)
- UJI 13-1802 allows broad damages presentation to jury

### Section 5: Trial Leverage (Litigation-Specific)

This section does NOT exist in pre-suit demands. It is unique to litigation demands.

**Purpose:** Demonstrate trial readiness and make the carrier's risk analysis favor settlement.

**Elements to include:**
1. **Trial date proximity** -- "This matter is set for trial on [DATE], now [X] days away."
2. **Jury venue analysis** -- Reference favorable jury demographics or verdict history for the venue (e.g., Bernalillo County juries, if applicable from DVP outcomes)
3. **Strength of evidence** -- Summarize the key exhibits and witnesses ready for trial
4. **Expert testimony preview** -- Note retained experts and the substance of their expected testimony
5. **Pretrial rulings** -- If any pretrial motions have been decided favorably (MSJ denied against plaintiff, evidence admitted, etc.)
6. **Litigation costs** -- Note that continued litigation will increase defense costs (subtly incentivize settlement)

**Template pattern:**
```
With trial [X] days away, the evidence in this case is fully developed and
strongly supports [CLIENT NAME]'s claims. Our retained experts -- [EXPERT 1
(specialty)] and [EXPERT 2 (specialty)] -- will present compelling testimony
on [liability/causation/damages]. [DEFENDANT]'s own records and testimony
corroborate the central facts of this case.

[If favorable rulings:] The Court has already [ruled on motion / admitted
evidence / denied defendant's MSJ], further confirming the strength of
[CLIENT NAME]'s position.

New Mexico juries in [COUNTY] County have consistently recognized the
full scope of damages in cases of this nature. [If DVP available: Reference
comparable verdicts.]
```

**SDC Compliance:** The trial leverage section is most likely to trigger SDC posture issues. Items held as "surprise inventory" for trial must NOT be revealed in the demand. Check every statement against the SDC REVEAL plan.

### Section 6: Demand Amount (Litigation-Adjusted)

**Adjustments from pre-suit:**
1. Demand amount should be HIGHER than pre-suit if:
   - Discovery strengthened the case
   - Additional medical treatment occurred
   - Expert reports support higher damages
   - Pre-judgment interest has accrued
2. Include pre-judgment interest calculation from date of initial demand
3. Reference the pre-suit demand amount and explain the increase
4. Shorter response deadline (14-21 days during active litigation)

**Pre-judgment interest calculation (NMSA 56-8-4):**
```
Pre-suit demand: $[AMOUNT] on [DATE]
Days since demand: [X] days
Annual rate: 15% (NMSA 56-8-4)
Accrued interest: $[AMOUNT] x 0.15 x ([X] / 365) = $[INTEREST]
```

### Section 7: Enclosures (Litigation-Adjusted)

In addition to standard enclosures, consider:
- Expert reports (if disclosed and authorized by SDC)
- Key deposition excerpts
- Key document production excerpts
- Updated medical records and bills
- Day-in-the-life materials (if applicable)
- Settlement brochure / demand package binder

---

## Part 3: SDC Integration Protocol

### 3.1 Disclosure Categories

Every fact, document, or piece of evidence referenced in the demand must be checked against SDC:

| SDC Status | Include in Demand? | Action |
|------------|-------------------|--------|
| DISCLOSED | Yes | Safe to reference |
| REVEAL-AT-DEMAND | Yes | Authorized for this demand. Note in Cite Table. |
| REVEAL-AT-MEDIATION | No (unless demand follows mediation) | Do NOT include. Flag `[SDC: MEDIATION-ONLY]` |
| REVEAL-AT-TRIAL | No | Do NOT include. Flag `[SDC: TRIAL-ONLY]` |
| UNDISCLOSED | No | Do NOT include. Flag `[SDC: UNDISCLOSED]` |
| DECISION REQUIRED | Ask attorney | Flag `[DECISION REQUIRED: SDC posture for [item]]` |

### 3.2 SDC Posture Compliance Checklist

- [ ] Every discovery reference checked against SDC posture
- [ ] No UNDISCLOSED items included in demand text
- [ ] No TRIAL-ONLY surprise inventory revealed
- [ ] REVEAL-AT-DEMAND items noted in Cite Table
- [ ] Any ambiguous items flagged as `[DECISION REQUIRED]`
- [ ] SDC REDLINE review recommended before sending (attorney reviews for inadvertent disclosures)

---

## Part 4: Discovery Posture Integration

### 4.1 Using Discovery Offensively in the Demand

| Discovery Type | Demand Use | Example |
|---------------|-----------|---------|
| Interrogatory answers | Quote defendant's admissions | "Defendant admitted that..." |
| RFA responses | Cite admitted facts | "Defendant admitted Request No. X" |
| Document production | Reference key documents by Bates number | "Defendant's internal report (DEF-0234)..." |
| Deposition testimony | Quote key admissions, concessions | "[Witness] testified: '...' (Dep. at 45:12-16)" |
| IME report | Use defense expert's favorable findings | "Even Defendant's expert found..." |
| Expert reports | Reference disclosed expert opinions | "[Expert]'s report concludes..." |

### 4.2 Discovery Gaps to Leverage

If discovery revealed defense weaknesses:
- Missing documents (spoliation concerns)
- Inconsistent testimony between witnesses
- Changed stories from defendant
- Failure to preserve evidence
- Late or incomplete discovery responses (note pending GFL/MTC issues)

---

## Part 5: Litigation Demand Quality Checklist

Before finalizing a LITIGATION-DEMAND:

- [ ] All standard PRE-SUIT checklist items satisfied (see mode-pre-suit.md)
- [ ] Case caption and case number included
- [ ] Current procedural posture accurately stated
- [ ] Trial date referenced (if set)
- [ ] Discovery references are accurate (correct Bates numbers, depo page:line, interrogatory numbers)
- [ ] SDC posture compliance verified for EVERY fact and evidence reference
- [ ] No surprise inventory or trial-only items revealed
- [ ] Prior demand history referenced (if applicable)
- [ ] Pre-judgment interest calculated from date of initial demand
- [ ] Demand amount justified by updated DC analysis
- [ ] Response deadline appropriate for litigation phase (14-21 days)
- [ ] Expert opinions referenced only if disclosed per expert disclosure rules
- [ ] Trial leverage section does not bluff about evidence not yet in the record
- [ ] Tone accounts for the judge potentially reading the demand (at mediation or hearing)
