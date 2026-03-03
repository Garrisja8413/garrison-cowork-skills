# Causes of Action — Complaint Reference

## Common NM Personal Injury Causes of Action

This reference provides the required elements for each cause of action
commonly pled in New Mexico personal injury complaints. For each COA,
the complaint must plead every listed element with factual support from
the CFP and legal authority from the LPB.

All element definitions are derived from NM Uniform Jury Instructions (UJI)
and controlling NM case law. All citations `[VERIFY-CITE]` until verified.

---

## 1. NEGLIGENCE (General)

**Legal basis:** Common law; UJI 13-1601 through 13-1604 [VERIFY-CITE]

**Element_IDs for CFP/LPB mapping:** `NEG-DUTY`, `NEG-BREACH`, `NEG-CAUSE`, `NEG-DAMAGES`

### Required Elements:

| # | Element | Element_ID | UJI Reference | What to Plead |
|---|---------|------------|---------------|---------------|
| 1 | **Duty** | NEG-DUTY | UJI 13-1601 | Defendant owed plaintiff a duty of ordinary care under the circumstances |
| 2 | **Breach** | NEG-BREACH | UJI 13-1602 | Defendant failed to exercise ordinary care (specify the negligent act or omission) |
| 3 | **Causation** | NEG-CAUSE | UJI 13-1603 | Defendant's negligence was a cause of plaintiff's injuries (but-for + proximate cause) |
| 4 | **Damages** | NEG-DAMAGES | UJI 13-1604 | Plaintiff suffered actual damages (physical injury, medical expenses, lost wages, pain/suffering, etc.) |

### Pleading Template:

```
COUNT [N]: NEGLIGENCE

¶ [#].  Plaintiff incorporates by reference Paragraphs 1 through [##].

¶ [#].  At all times relevant hereto, [Defendant] owed Plaintiff a duty
        to exercise ordinary care [in the operation of a motor vehicle /
        in the maintenance of premises / in providing [service/product]
        / describe specific duty context].
        [CFP: Element_ID = NEG-DUTY; LPB: duty standard]

¶ [#].  [Defendant] breached this duty by [specific negligent act(s) or
        omission(s) — from CFP rows mapped to NEG-BREACH]. Specifically,
        [Defendant] [describe each negligent act].
        [CFP: Fact# rows mapped to NEG-BREACH]

¶ [#].  [Defendant]'s negligence was a direct and proximate cause of
        Plaintiff's injuries and damages.
        [CFP: Element_ID = NEG-CAUSE; LPB: causation standard]

¶ [#].  As a direct and proximate result of [Defendant]'s negligence,
        Plaintiff has suffered and continues to suffer injuries and
        damages as set forth herein.
```

---

## 2. NEGLIGENCE PER SE

**Legal basis:** UJI 13-1501 [VERIFY-CITE]; statutory violation as
evidence of negligence

**Element_IDs:** `NPS-STATUTE`, `NPS-CLASS`, `NPS-HARM`, `NPS-CAUSE`, `NPS-DAMAGES`

### Required Elements:

| # | Element | Element_ID | What to Plead |
|---|---------|------------|---------------|
| 1 | **Statutory violation** | NPS-STATUTE | Defendant violated a specific statute, ordinance, or regulation |
| 2 | **Protected class** | NPS-CLASS | Plaintiff is within the class of persons the statute was designed to protect |
| 3 | **Type of harm** | NPS-HARM | Plaintiff suffered the type of harm the statute was designed to prevent |
| 4 | **Causation** | NPS-CAUSE | The statutory violation was a proximate cause of plaintiff's injuries |
| 5 | **Damages** | NPS-DAMAGES | Plaintiff suffered actual damages |

### Pleading Template:

```
COUNT [N]: NEGLIGENCE PER SE

¶ [#].  Plaintiff incorporates by reference Paragraphs 1 through [##].

¶ [#].  [Statute/ordinance citation] provides that [quote or paraphrase
        the relevant statutory duty/prohibition].
        [LPB: RULES row for the statute]

¶ [#].  [Defendant] violated [statute] by [specific conduct constituting
        the violation — from CFP].

¶ [#].  [Statute] was designed to protect persons in Plaintiff's
        position — namely, [describe protected class].

¶ [#].  The harm suffered by Plaintiff — [describe injury type] — is
        the type of harm [statute] was designed to prevent.

¶ [#].  [Defendant]'s violation of [statute] was a direct and proximate
        cause of Plaintiff's injuries and damages as set forth herein.
```

---

## 3. PREMISES LIABILITY

**Legal basis:** Common law; UJI 13-1307 through 13-1315 [VERIFY-CITE]

**Element_IDs:** `PREM-CONTROL`, `PREM-CONDITION`, `PREM-KNOWLEDGE`,
`PREM-FAILURE`, `PREM-CAUSE`, `PREM-DAMAGES`

### Required Elements:

| # | Element | Element_ID | UJI Reference | What to Plead |
|---|---------|------------|---------------|---------------|
| 1 | **Ownership/Control** | PREM-CONTROL | UJI 13-1307 | Defendant owned, occupied, or controlled the premises |
| 2 | **Dangerous condition** | PREM-CONDITION | UJI 13-1308 | A dangerous or defective condition existed on the premises |
| 3 | **Knowledge/Notice** | PREM-KNOWLEDGE | UJI 13-1309 | Defendant knew or should have known of the condition (actual or constructive notice) |
| 4 | **Failure to remedy/warn** | PREM-FAILURE | UJI 13-1310 | Defendant failed to correct the condition or adequately warn |
| 5 | **Causation** | PREM-CAUSE | UJI 13-1311 | The dangerous condition was a proximate cause of plaintiff's injuries |
| 6 | **Damages** | PREM-DAMAGES | UJI 13-1312 | Plaintiff suffered actual damages |

### Additional Considerations:

**Invitee status:** Plead that plaintiff was an invitee (business visitor,
customer, patron) — highest duty of care owed.

**Constructive notice:** If no evidence of actual notice, plead that the
condition existed for a sufficient time that defendant should have
discovered it through reasonable inspection.

### Pleading Template:

```
COUNT [N]: PREMISES LIABILITY

¶ [#].  Plaintiff incorporates by reference Paragraphs 1 through [##].

¶ [#].  At all times relevant hereto, [Defendant] owned, operated,
        maintained, managed, and/or controlled the premises located at
        [address] (the "Premises").
        [CFP: Element_ID = PREM-CONTROL]

¶ [#].  Plaintiff was a [business invitee / patron / customer / tenant /
        licensee] lawfully present on the Premises.

¶ [#].  A dangerous [and/or defective] condition existed on the Premises,
        specifically [describe condition — from CFP].
        [CFP: Element_ID = PREM-CONDITION]

¶ [#].  [Defendant] knew or, in the exercise of ordinary care, should
        have known of the dangerous condition because [describe basis
        for actual or constructive notice — from CFP].
        [CFP: Element_ID = PREM-KNOWLEDGE]

¶ [#].  [Defendant] failed to [correct / remedy / repair / warn of]
        the dangerous condition, despite having knowledge or constructive
        notice thereof.
        [CFP: Element_ID = PREM-FAILURE]

¶ [#].  The dangerous condition on [Defendant]'s Premises was a direct
        and proximate cause of Plaintiff's injuries and damages.
        [CFP: Element_ID = PREM-CAUSE]

¶ [#].  As a direct and proximate result of [Defendant]'s negligence
        in maintaining the Premises, Plaintiff has suffered injuries
        and damages as set forth herein.
```

---

## 4. MOTOR VEHICLE NEGLIGENCE

**Legal basis:** Common law negligence + NM Motor Vehicle Code
(NMSA § 66-3-301 et seq.); UJI 13-1601 et seq. [VERIFY-CITE]

**Element_IDs:** `MVA-DUTY`, `MVA-BREACH`, `MVA-CAUSE`, `MVA-DAMAGES`

### Required Elements:

Same as general negligence, but duty and breach are particularized to
motor vehicle operation:

| # | Element | Element_ID | What to Plead |
|---|---------|------------|---------------|
| 1 | **Duty** | MVA-DUTY | Defendant owed a duty of ordinary care in operating a motor vehicle |
| 2 | **Breach** | MVA-BREACH | Specific negligent driving conduct (speeding, distraction, failure to yield, DUI, etc.) |
| 3 | **Causation** | MVA-CAUSE | Defendant's negligent driving was a proximate cause of the collision and plaintiff's injuries |
| 4 | **Damages** | MVA-DAMAGES | Plaintiff suffered actual damages |

### Common Breach Theories (plead all supported by CFP):

- Failing to maintain proper lookout
- Failing to yield the right of way
- Exceeding the posted speed limit (cite NMSA § 66-7-301)
- Following too closely (cite NMSA § 66-7-318)
- Driving under the influence (cite NMSA § 66-8-102)
- Distracted driving (cell phone use, etc.)
- Failing to obey traffic signal/sign
- Making an improper lane change
- Failing to maintain control of the vehicle

### Pleading Template:

```
COUNT [N]: NEGLIGENCE (Motor Vehicle)

¶ [#].  Plaintiff incorporates by reference Paragraphs 1 through [##].

¶ [#].  At all times relevant hereto, [Defendant] owed a duty to
        operate [his/her/their] motor vehicle with ordinary care for
        the safety of other persons on the roadway, including Plaintiff.

¶ [#].  [Defendant] breached this duty by one or more of the following
        negligent acts or omissions:

        a. [Specific negligent act — from CFP, e.g., "failing to
           maintain a proper lookout"];
        b. [Specific negligent act — from CFP, e.g., "exceeding the
           posted speed limit in violation of NMSA § 66-7-301"];
        c. [Additional negligent acts as supported by CFP];
        d. [Other negligent acts to be established through discovery].

¶ [#].  [Defendant]'s negligence as described above was a direct and
        proximate cause of the collision and Plaintiff's resulting
        injuries and damages.

¶ [#].  As a direct and proximate result of [Defendant]'s negligence,
        Plaintiff has suffered injuries and damages as set forth herein.
```

---

## 5. RESPONDEAT SUPERIOR / VICARIOUS LIABILITY

**Legal basis:** Common law; UJI 13-407 [VERIFY-CITE]

**Element_IDs:** `RS-EMPLOYMENT`, `RS-SCOPE`, `RS-TORT`

### Required Elements:

| # | Element | Element_ID | What to Plead |
|---|---------|------------|---------------|
| 1 | **Employment/agency relationship** | RS-EMPLOYMENT | Employee was employed by / agent of the employer |
| 2 | **Course and scope** | RS-SCOPE | Employee was acting within the course and scope of employment at the time |
| 3 | **Underlying tort** | RS-TORT | Employee committed the underlying tortious act (cross-reference the negligence count) |

### Pleading Template:

```
COUNT [N]: VICARIOUS LIABILITY — RESPONDEAT SUPERIOR
(Against [Employer Defendant])

¶ [#].  Plaintiff incorporates by reference Paragraphs 1 through [##].

¶ [#].  At all times relevant hereto, [Employee] was an employee,
        servant, and/or agent of [Employer].

¶ [#].  At the time of the [incident/collision/occurrence], [Employee]
        was acting within the course and scope of [his/her/their]
        employment with [Employer].

¶ [#].  Under the doctrine of respondeat superior, [Employer] is
        vicariously liable for the negligent acts and omissions of
        [Employee] as set forth in Count [cross-reference negligence
        count] above.

¶ [#].  As a direct and proximate result of [Employee]'s negligence,
        for which [Employer] is vicariously liable, Plaintiff has
        suffered injuries and damages as set forth herein.
```

---

## 6. NEGLIGENT HIRING / RETENTION / SUPERVISION / ENTRUSTMENT

**Legal basis:** Common law; direct liability of employer

**Element_IDs:** `NH-INCOMPETENCE`, `NH-KNOWLEDGE`, `NH-CAUSE`, `NH-DAMAGES`

### Required Elements:

| # | Element | Element_ID | What to Plead |
|---|---------|------------|---------------|
| 1 | **Incompetent/unfit employee** | NH-INCOMPETENCE | Employee was incompetent or unfit for the position |
| 2 | **Employer knowledge** | NH-KNOWLEDGE | Employer knew or should have known of the unfitness |
| 3 | **Causation** | NH-CAUSE | Employer's negligent hiring/retention/supervision was a proximate cause |
| 4 | **Damages** | NH-DAMAGES | Plaintiff suffered actual damages |

### Theories (plead as applicable):

- **Negligent hiring:** Failed to conduct reasonable investigation of
  employee's fitness before hiring
- **Negligent retention:** Continued to employ after learning of unfitness
- **Negligent supervision:** Failed to adequately supervise employee
- **Negligent entrustment:** Entrusted a vehicle/instrument to a person
  known to be incompetent to use it safely

---

## 7. NM TORT CLAIMS ACT (NMSA §§ 41-4-1 et seq.)

**Legal basis:** NMSA §§ 41-4-1 through 41-4-27

**Element_IDs:** `TCA-WAIVER`, `TCA-NOTICE`, `TCA-NEGLIGENCE`, `TCA-CAUSE`, `TCA-DAMAGES`

### Required Elements:

| # | Element | Element_ID | What to Plead |
|---|---------|------------|---------------|
| 1 | **Government entity** | TCA-ENTITY | Defendant is a governmental entity or public employee |
| 2 | **Waiver of immunity** | TCA-WAIVER | Specific waiver provision applies (§§ 41-4-5 through 41-4-12) |
| 3 | **Negligence within waiver** | TCA-NEGLIGENCE | Negligent act falls within the scope of the waiver |
| 4 | **Notice compliance** | TCA-NOTICE | Timely written notice provided under § 41-4-16(A) |
| 5 | **Causation** | TCA-CAUSE | Government entity's negligence caused plaintiff's injuries |
| 6 | **Damages** | TCA-DAMAGES | Plaintiff suffered actual damages (subject to § 41-4-19 cap) |

### Pleading Template:

```
COUNT [N]: NEGLIGENCE — NEW MEXICO TORT CLAIMS ACT
(NMSA § 41-4-[specific waiver section])

¶ [#].  Plaintiff incorporates by reference Paragraphs 1 through [##].

¶ [#].  Defendant [Government Entity] is a [governmental entity /
        political subdivision] within the meaning of the New Mexico
        Tort Claims Act, NMSA § 41-4-3.

¶ [#].  Immunity from suit is waived under NMSA § 41-4-[section]
        because [describe how the waiver applies — e.g., "the claim
        arises from the negligent operation of a motor vehicle by a
        public employee acting within the scope of duty" (§ 41-4-6) /
        "the claim arises from a dangerous condition of a building or
        public grounds" (§ 41-4-9)].
        [LPB: RULES row for § 41-4-[section]]

¶ [#].  On or about [notice date], Plaintiff provided timely written
        notice of this claim to [Government Entity] in compliance with
        NMSA § 41-4-16(A), setting forth the time, place, and
        circumstances of the loss or injury.

¶ [#].  More than ninety (90) days have elapsed since the giving of
        said notice, and [Government Entity] has [denied the claim /
        failed to act upon the claim].

¶ [#].  [Government Entity], through its employees and agents, was
        negligent in [describe specific negligence — from CFP].

¶ [#].  [Government Entity]'s negligence was a direct and proximate
        cause of Plaintiff's injuries and damages as set forth herein.
```

---

## 8. NM CIVIL RIGHTS ACT (NMSA §§ 41-4A-1 et seq.)

**Legal basis:** NMSA §§ 41-4A-1 through 41-4A-13

**Element_IDs:** `CRA-RIGHT`, `CRA-DEPRIVATION`, `CRA-PERSON`, `CRA-NOTICE`, `CRA-DAMAGES`

### Required Elements:

| # | Element | Element_ID | What to Plead |
|---|---------|------------|---------------|
| 1 | **Constitutional right** | CRA-RIGHT | Specific constitutional right at issue |
| 2 | **Deprivation** | CRA-DEPRIVATION | Defendant deprived plaintiff of the right |
| 3 | **Public body / person** | CRA-PERSON | Defendant is a "person" acting under color of law |
| 4 | **Notice compliance** | CRA-NOTICE | Notice provided under § 41-4A-12 |
| 5 | **Damages** | CRA-DAMAGES | Plaintiff suffered actual damages |

### Key Distinction from § 1983:

**Qualified immunity is NOT a defense** under the NM Civil Rights Act
(NMSA § 41-4A-6). This is a significant advantage over federal § 1983 claims.

### Pleading Template:

```
COUNT [N]: NEW MEXICO CIVIL RIGHTS ACT
(NMSA §§ 41-4A-1 et seq.)

¶ [#].  Plaintiff incorporates by reference Paragraphs 1 through [##].

¶ [#].  [Defendant officer/entity] is a "person" within the meaning of
        the New Mexico Civil Rights Act, NMSA § 41-4A-3.

¶ [#].  At all times relevant hereto, [Defendant] was acting under
        color of law and within the scope of [his/her/their] authority
        as [a law enforcement officer / public employee].

¶ [#].  [Defendant] deprived Plaintiff of [his/her/their] rights under
        [Article II, Section [##] of the New Mexico Constitution /
        specific constitutional provision], specifically the right to
        [describe right — e.g., "be free from unreasonable seizure" /
        "due process of law" / "equal protection"].
        [LPB: constitutional provision]

¶ [#].  Specifically, [Defendant] [describe the deprivation conduct —
        from CFP].

¶ [#].  On or about [notice date], Plaintiff provided written notice
        of this claim to [Defendant / Entity] in compliance with
        NMSA § 41-4A-12.

¶ [#].  Qualified immunity is not a defense to this claim. NMSA
        § 41-4A-6.

¶ [#].  As a direct and proximate result of [Defendant]'s deprivation
        of Plaintiff's constitutional rights, Plaintiff has suffered
        damages including but not limited to [describe — from CFP],
        and is entitled to compensatory damages, costs, and reasonable
        attorneys' fees pursuant to NMSA § 41-4A-8.
```

---

## 9. 42 U.S.C. § 1983 — FEDERAL CIVIL RIGHTS

**Legal basis:** 42 U.S.C. § 1983 (federal court)

**Element_IDs:** `1983-RIGHT`, `1983-COLOR`, `1983-PERSON`, `1983-CAUSE`, `1983-DAMAGES`

### Required Elements:

| # | Element | Element_ID | What to Plead |
|---|---------|------------|---------------|
| 1 | **Constitutional/federal right** | 1983-RIGHT | Specific right under the Constitution or federal law |
| 2 | **Under color of state law** | 1983-COLOR | Defendant acted under color of state law |
| 3 | **Person** | 1983-PERSON | Defendant is a "person" (individual or entity with policy/custom) |
| 4 | **Causation** | 1983-CAUSE | Defendant's conduct caused the deprivation |
| 5 | **Damages** | 1983-DAMAGES | Plaintiff suffered actual damages |

### Municipal Liability (Monell):

For claims against a government entity (city, county):
- Must plead a **policy or custom** that caused the violation
- A single incident generally insufficient unless it reflects
  official policy or deliberate indifference
- **Monell v. Department of Social Services**, 436 U.S. 658 (1978)
  [VERIFY-CITE]

**Additional Monell elements:**
| # | Element | Element_ID | What to Plead |
|---|---------|------------|---------------|
| 6 | **Policy/custom** | 1983-MONELL-POLICY | Official policy, widespread custom, or final policymaker decision |
| 7 | **Moving force** | 1983-MONELL-CAUSE | Policy/custom was the "moving force" behind the violation |

---

## 10. LOSS OF CONSORTIUM

**Legal basis:** Common law; derivative claim

**Element_IDs:** `LOC-RELATIONSHIP`, `LOC-INJURY`, `LOC-LOSS`, `LOC-CAUSE`

### Required Elements:

| # | Element | Element_ID | What to Plead |
|---|---------|------------|---------------|
| 1 | **Marital/family relationship** | LOC-RELATIONSHIP | Plaintiff is the [spouse / parent / child] of the injured party |
| 2 | **Underlying injury** | LOC-INJURY | The injured party suffered compensable injuries (cross-reference injury count) |
| 3 | **Loss of consortium** | LOC-LOSS | Plaintiff has been deprived of [companionship / affection / comfort / sexual relations / services / support] |
| 4 | **Causation** | LOC-CAUSE | Defendant's tortious conduct caused the loss of consortium |

### Pleading Template:

```
COUNT [N]: LOSS OF CONSORTIUM
(On behalf of [Spouse/Family Member Name])

¶ [#].  Plaintiff [Spouse] incorporates by reference Paragraphs 1
        through [##].

¶ [#].  At all times relevant hereto, [Spouse] was the [husband / wife]
        of [Injured Plaintiff].

¶ [#].  As a direct and proximate result of Defendants' [negligence /
        wrongful conduct] as alleged herein, and the injuries thereby
        sustained by [Injured Plaintiff], [Spouse] has been deprived of
        the companionship, comfort, affection, society, and sexual
        relations of [Injured Plaintiff], and has suffered and continues
        to suffer mental anguish, emotional distress, and loss of
        enjoyment of the marital relationship.
```

---

## 11. WRONGFUL DEATH (NMSA §§ 41-2-1 et seq.)

**Legal basis:** NMSA §§ 41-2-1 through 41-2-4

**Element_IDs:** `WD-CAUSE`, `WD-REPRESENTATIVE`, `WD-BENEFICIARIES`, `WD-DAMAGES`

### Required Elements:

| # | Element | Element_ID | What to Plead |
|---|---------|------------|---------------|
| 1 | **Wrongful act causing death** | WD-CAUSE | Decedent's death was caused by defendant's wrongful act, neglect, or default |
| 2 | **Viable claim** | WD-VIABLE | Decedent would have had a viable claim had they survived |
| 3 | **Personal representative** | WD-REPRESENTATIVE | Action brought by personal representative |
| 4 | **Beneficiaries** | WD-BENEFICIARIES | Identify statutory beneficiaries (spouse, children, parents) |
| 5 | **Damages** | WD-DAMAGES | Damages suffered by the beneficiaries |

---

## 12. PRODUCT LIABILITY (NMSA § 41-3A-1 et seq.)

**Legal basis:** NM Product Liability Act (NMSA § 41-3A-1 et seq.);
UJI 13-1401 et seq. [VERIFY-CITE]

**Element_IDs:** `PL-PRODUCT`, `PL-DEFECT`, `PL-SELLER`, `PL-CAUSE`, `PL-DAMAGES`

### Required Elements:

| # | Element | Element_ID | What to Plead |
|---|---------|------------|---------------|
| 1 | **Product** | PL-PRODUCT | Identify the product at issue |
| 2 | **Defect** | PL-DEFECT | Product was defective (design, manufacturing, or warning) |
| 3 | **Seller in chain** | PL-SELLER | Defendant was a manufacturer, distributor, or seller |
| 4 | **Causation** | PL-CAUSE | Defect was a proximate cause of plaintiff's injuries |
| 5 | **Damages** | PL-DAMAGES | Plaintiff suffered actual damages |

### Defect theories (plead as applicable):

- **Manufacturing defect:** Product deviated from intended design
- **Design defect:** Product design was unreasonably dangerous
- **Warning defect:** Product lacked adequate warnings/instructions

---

## Cause of Action Selection Guide

**Use this decision tree to select which COAs to plead:**

```
What happened?
│
├── Motor vehicle collision
│   ├── Driver at fault → NEGLIGENCE (MVA) + NEGLIGENCE PER SE (traffic code)
│   ├── Employer's vehicle → + RESPONDEAT SUPERIOR
│   ├── Government vehicle → + TCA (§ 41-4-6)
│   └── Spouse/family → + LOSS OF CONSORTIUM
│
├── Premises incident (slip/fall, assault, etc.)
│   ├── Private property → PREMISES LIABILITY
│   ├── Employee involved → + RESPONDEAT SUPERIOR + NEGLIGENT HIRING/SUPERVISION
│   ├── Government property → + TCA (§ 41-4-9)
│   └── Security failure → + NEGLIGENT SECURITY
│
├── Law enforcement encounter
│   ├── State actors → NM CIVIL RIGHTS ACT + TCA (§ 41-4-12)
│   ├── Federal court → + 42 U.S.C. § 1983
│   ├── Municipal liability → + MONELL (policy/custom)
│   └── Supervisor liability → + SUPERVISORY LIABILITY
│
├── Medical malpractice
│   ├── Private facility → MEDICAL NEGLIGENCE (NMSA § 41-5-1 et seq.)
│   ├── Government facility → + TCA (§ 41-4-10)
│   └── Note: Medical Malpractice Act requirements apply
│
├── Product-related injury
│   ├── Defective product → PRODUCT LIABILITY (strict + negligence)
│   ├── + manufacturer → against manufacturer
│   ├── + seller/distributor → against downstream sellers
│   └── Failure to warn → WARNING DEFECT
│
└── Death
    └── All applicable underlying COAs + WRONGFUL DEATH (§ 41-2-1)
```

---

## Element_ID Convention

For CFP/LPB/PCM integration, use these Element_ID prefixes:

| Prefix | Cause of Action |
|--------|----------------|
| `NEG-` | General Negligence |
| `NPS-` | Negligence Per Se |
| `MVA-` | Motor Vehicle Negligence |
| `PREM-` | Premises Liability |
| `RS-` | Respondeat Superior |
| `NH-` | Negligent Hiring/Retention/Supervision |
| `TCA-` | Tort Claims Act |
| `CRA-` | NM Civil Rights Act |
| `1983-` | 42 U.S.C. § 1983 |
| `LOC-` | Loss of Consortium |
| `WD-` | Wrongful Death |
| `PL-` | Product Liability |
| `DMG-` | Damages (cross-cutting) |
| `PUNI-` | Punitive Damages |

These Element_IDs appear in the CFP `Element_ID` column and the LPB
`Element_ID` column, enabling the PCM to merge facts and law by element
and report coverage status.
