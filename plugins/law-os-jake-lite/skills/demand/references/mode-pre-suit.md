# DEMAND Mode: PRE-SUIT-DEMAND Reference

## Purpose

The PRE-SUIT-DEMAND mode produces a settlement demand letter before any lawsuit has been filed. This is the default mode and the most common demand type for a personal injury practice. The goal is to present the case persuasively enough to resolve the claim without litigation, saving the client time and the firm resources.

---

## Part 1: Pre-Suit Demand Context

### 1.1 When to Use PRE-SUIT-DEMAND

- Client has completed or substantially completed medical treatment
- DC DAMAGES output is available with stabilized damages figures
- CFP PACKET is DRAFT-READY with verified facts
- LPB PACKET is available with liability standards
- No lawsuit has been filed
- Statute of limitations is NOT imminent (if SOL < 60 days, consider filing suit first)

### 1.2 Audience Analysis: Insurance Adjusters

The primary reader of a pre-suit demand is an **insurance claims adjuster**. Understanding their evaluation process is critical:

| Adjuster Concern | How to Address |
|-----------------|----------------|
| Liability clarity | Lead with strongest liability facts. Make duty-breach-causation obvious. |
| Damages documentation | Provide specific amounts with supporting documentation references |
| Medical causation | Show clear causal chain from incident to injury to treatment |
| Treatment reasonableness | Present treatment as medically necessary and proportionate |
| Prior injuries / pre-existing | Address proactively if CFP contains pre-existing condition facts |
| Comparative fault | If NM pure comparative (NMSA 41-3A-1), address plaintiff's conduct if relevant |
| Policy limits awareness | Know (or infer) policy limits to calibrate demand appropriately |
| Settlement authority | Adjuster has limited authority; demand must help them build internal case for payment |

### 1.3 Timing Considerations

| Factor | Timing Guidance |
|--------|----------------|
| Treatment completion | Wait until MMI (maximum medical improvement) or treatment substantially complete |
| Medical records available | All records and bills must be obtainable. Do not demand with missing records. |
| SOL buffer | File demand at least 6 months before SOL to allow negotiation time |
| Seasonal timing | Avoid holiday periods (Nov-Dec) when adjuster caseloads spike and authority is limited |
| Carrier assignment | Confirm the claim has been assigned to an adjuster before sending |
| Prior settlement discussions | If informal discussions have occurred, reference them in the demand |

---

## Part 2: Pre-Suit Demand Letter Structure

### Section 1: Introduction and Representation

**Tone:** Professional, confident, cooperative.

**Template pattern:**
```
This firm represents [CLIENT NAME] regarding injuries sustained in an incident
that occurred on [INCIDENT DATE] involving [DEFENDANT/INSURED NAME]. This
matter arises under Claim Number [CLAIM NUMBER] / Policy Number [POLICY NUMBER].

We write to present a comprehensive summary of [CLIENT NAME]'s claim and to
demand settlement in the amount of [DEMAND AMOUNT] for the injuries and damages
sustained.
```

**Required elements:**
- Client identification (merge token: `{{client_name}}`)
- Representation statement
- Incident date and parties
- Claim number and/or policy number (from SA or intake data)
- Purpose statement (settlement demand)

**Do NOT include:**
- Threats of litigation in the introduction (save for closing)
- Emotional language in the opening
- Detailed facts (those come in Section 2-3)

### Section 2: Liability Summary

**Structure:** Duty -> Breach -> Causation -> Concise conclusion.

**Drafting rules:**
1. State the legal standard from LPB (duty of care applicable to the incident type)
2. Present the 3-5 strongest breach facts from CFP, strongest first
3. Connect breach to injury with causation narrative
4. If comparative fault may be argued, address it proactively with NM law (NMSA 41-3A-1: pure comparative fault -- plaintiff recovers reduced by their percentage of fault)
5. Cite NM UJI 13-1601 (negligence), UJI 13-305 (ordinary care), or other applicable UJI from LPB

**Example pattern:**
```
Under New Mexico law, [DEFENDANT TYPE] owes a duty of ordinary care to
[PLAINTIFF CATEGORY]. See UJI 13-305 (defining ordinary care). [DEFENDANT]
breached this duty by [SPECIFIC BREACH CONDUCT -- from CFP Fact#].

[BREACH FACT 1 -- strongest] (CFP Fact#XX, Pinpoint: [source])
[BREACH FACT 2] (CFP Fact#XX, Pinpoint: [source])
[BREACH FACT 3] (CFP Fact#XX, Pinpoint: [source])

As a direct and proximate result of [DEFENDANT]'s negligence, [CLIENT NAME]
sustained the injuries described below. See UJI 13-305; UJI 13-1601.
```

### Section 3: Injury and Treatment Narrative

**Structure:** Chronological, empathetic but factual.

**Drafting rules:**
1. Begin with the immediate aftermath of the incident (what the client experienced)
2. Proceed chronologically through all medical treatment
3. Name every provider, date of first visit, and type of treatment
4. All facts from CFP rows with DRAFT-READY status
5. Include current condition and prognosis
6. Describe impact on daily life, work, relationships, and enjoyment of life
7. If pre-existing conditions exist, address them with the "eggshell plaintiff" doctrine (you take the plaintiff as you find them)

**NM-specific law to reference:**
- UJI 13-1802: Damages for personal injury (elements the jury considers)
- UJI 13-1806: Aggravation of pre-existing condition
- NMSA 41-3A-1: Pure comparative fault (plaintiff's recovery reduced by percentage of fault, but never barred)

**Treatment timeline format:**
```
[DATE]: [PROVIDER NAME] -- [TYPE OF VISIT/TREATMENT]
  [Brief description of findings/treatment from CFP]
  (CFP Fact#XX, Pinpoint: [medical record page])
```

### Section 4: Damages Presentation

**Structure:** Category by category, with specific dollar amounts from DC.

**Required damages categories (as applicable from DC output):**

| Category | Source | Format |
|----------|--------|--------|
| Past medical expenses | DC DAMAGES -- billed amounts | Itemized by provider with totals |
| Future medical expenses | DC DAMAGES -- expert projection or life care plan | Range with supporting basis |
| Past lost wages | DC DAMAGES -- employer verification | Specific amount with calculation |
| Future lost earning capacity | DC DAMAGES -- vocational expert or projection | Range with methodology |
| Pain and suffering (past) | DC DAMAGES -- per diem or multiplier | Range with anchoring rationale |
| Pain and suffering (future) | DC DAMAGES -- projection from prognosis | Range with anchoring rationale |
| Loss of enjoyment of life | DC DAMAGES -- separate from pain and suffering in NM | Range |
| Emotional distress | DC DAMAGES | Range |
| Loss of consortium | DC DAMAGES (if applicable, separate claim) | Range |

**NM-specific damages law:**
- NM does not cap non-economic damages in standard PI cases (no tort reform cap)
- UJI 13-1802 lists compensable elements: physical pain, mental anguish, loss of enjoyment, disfigurement, disability, medical expenses, lost earnings
- Pre-judgment interest: NMSA 56-8-4 -- 15% per annum on liquidated damages from date of demand (powerful leverage)
- Punitive damages: UJI 13-1827 (requires willful, wanton, reckless, or fraudulent conduct -- usually not in standard negligence PI, but available for DUI, intentional acts)

### Section 5: Comparable Outcomes (if DVP available)

**Drafting rules:**
1. Only include if DVP outcomes pack is provided
2. Lead with NM-specific verdicts/settlements (Bernalillo County jury values are the strongest comparables for Albuquerque cases)
3. Present 3-5 most comparable cases
4. Note case similarities and differences
5. Use comparables to validate the demand amount, not as the primary basis

### Section 6: Demand Amount and Response Deadline

**Drafting rules:**
1. State the specific demand amount from DC SETTLEMENT-EVAL
2. Explain the basis (anchoring rationale from DC)
3. Set a response deadline (typically 30 days for pre-suit)
4. Describe consequences of non-response (filing of lawsuit, not threats)
5. Express willingness to discuss in good faith

**Pre-suit specific language:**
```
Based on the foregoing, we demand the sum of $[DEMAND AMOUNT] to resolve
[CLIENT NAME]'s claim in full. This demand is supported by the damages
analysis detailed above, including $[SPECIALS] in special damages and
$[GENERALS] in general damages.

We request a response to this demand within thirty (30) days of receipt.
Should we not receive a reasonable response within this timeframe, we are
prepared to file a civil complaint in the [COUNTY] Judicial District Court,
State of New Mexico, and to pursue all available remedies including
pre-judgment interest pursuant to NMSA 56-8-4.

We remain willing to discuss this matter in good faith and welcome the
opportunity to resolve [CLIENT NAME]'s claim without the necessity of
litigation.
```

**IMPORTANT:** The demand amount must trace directly to DC SETTLEMENT-EVAL output. If no DC output exists, use `[DEMAND AMOUNT -- DECISION REQUIRED: run DC SETTLEMENT-EVAL]`. Never invent a demand number.

### Section 7: Enclosures List

List all documents enclosed with the demand package:

```
Enclosures:
1. Medical records -- [Provider 1] ([date range])
2. Medical records -- [Provider 2] ([date range])
3. Medical billing summary
4. Photographs of injuries ([count] photos)
5. Police report / incident report
6. Employer verification of lost wages
7. [Additional documents as applicable]
```

---

## Part 3: Pre-Suit Demand Edge Cases

### 3.1 Government Defendants (Tort Claims Act)

If the defendant is a government entity:
- NMSA 41-4-16(A): 90-day written notice must have been sent before filing suit
- Confirm the notice was sent and the 90-day period has expired
- Reference the TCA notice in the demand letter
- Sovereign immunity defenses -- confirm the waiver category under NMSA 41-4-5 through 41-4-12
- Damages may be capped under NMSA 41-4-19: $750,000 per person for state entities, $400,000 for local public bodies (verify current amounts)

### 3.2 Multiple Defendants / Multiple Policies

- Address separate demands to each carrier if multiple defendants
- Note joint and several liability under NM law if applicable
- Consider contribution and indemnity rights among defendants
- Each demand should reference only the damages attributable to that defendant (or demand the full amount from each, noting joint and several liability)

### 3.3 Uninsured / Underinsured Motorist (UM/UIM) Claims

- UIM demand goes to the CLIENT'S own carrier
- Different tone: the carrier owes a duty of good faith to its own insured
- Reference NMSA 66-5-301 (mandatory UM/UIM coverage in NM)
- If stacking applies, address stacked limits
- Consider bad faith implications under NM law if carrier unreasonably denies

### 3.4 Policy Limits Unknown

If policy limits are not confirmed:
- Include a request for disclosure of policy limits
- Reference NMRA 1-026(B)(2): insurance agreements are discoverable
- Note that failure to disclose limits may be addressed in subsequent litigation
- Do NOT guess at policy limits in the demand amount

### 3.5 Client with Pre-Existing Conditions

- Apply the "eggshell plaintiff" doctrine: defendant takes plaintiff as found
- Cite UJI 13-1806 (aggravation of pre-existing condition)
- Present the pre-existing condition factually from CFP
- Distinguish pre-existing baseline from incident-caused aggravation
- Use medical records to show worsening after incident

---

## Part 4: Pre-Suit Quality Checklist

Before finalizing a PRE-SUIT-DEMAND:

- [ ] All factual assertions trace to CFP rows (Fact# + Pinpoint)
- [ ] All damages figures trace to DC output rows
- [ ] All legal standards trace to LPB rows (LawTag + Pinpoint)
- [ ] Demand amount traces to DC SETTLEMENT-EVAL
- [ ] No UNDISCLOSED items revealed (SDC posture compliance if SDC available)
- [ ] Tone is professional and confident, not threatening or emotional
- [ ] Treatment narrative is chronological and complete
- [ ] Damages are itemized by category with supporting references
- [ ] Response deadline is stated (typically 30 days)
- [ ] Enclosures list matches what will actually be enclosed
- [ ] Merge tokens are preserved (not modified or invented)
- [ ] BODY-ONLY format (no letterhead, date, address, or signature)
- [ ] Pre-judgment interest leverage mentioned (NMSA 56-8-4)
- [ ] Comparative fault addressed if applicable
- [ ] Pre-existing conditions addressed if present in CFP
- [ ] Government defendant TCA compliance confirmed if applicable
