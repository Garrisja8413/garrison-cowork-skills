# TRIAL-BRIEF — Standard Trial Brief Format and Structure

## Purpose

This reference defines the standard trial brief format for the TRIAL-BRIEF
skill operating in FULL BRIEF mode. The standard trial brief is filed before
trial per local rule or scheduling order and serves as the court's roadmap
for the plaintiff's case presentation.

## When to Use Standard Mode

Use this format when:
- The court's scheduling order requires a "trial brief" or "trial memorandum"
- The attorney requests a comprehensive pre-trial brief
- No specific format is mandated by local rule
- The case is proceeding to jury trial in NM state court or D.N.M.

## Section-by-Section Template

### Section I: Introduction (Target: 1 page)

**Purpose**: Orient the court to the case and the plaintiff's strongest points.
Establish the narrative frame in the court's mind before the detailed analysis.

**Structure**:

```
I. INTRODUCTION

This is a [case type] action arising from [brief incident description —
1-2 sentences] that occurred on [date] in [location], New Mexico.

[Plaintiff name] brings claims for [list causes of action] against
[defendant name(s)].

The evidence will establish that [2-3 sentences summarizing the strongest
evidence and the core theory of liability]. As a result of defendant's
[negligence/conduct], [plaintiff name] sustained [summary of injuries]
requiring [summary of treatment] and incurring [summary of damages].

[Plaintiff name] seeks [general/compensatory/punitive] damages at trial.
```

**Pack Integration**:
- Case type and causes of action from LPB PACKET
- Incident description from CFP PACKET (strongest narrative facts)
- Injuries and damages summary from DC / CFP
- All facts must trace to CFP Fact# (citations not shown in Introduction
  but tracked in Cite Table)

**Rules**:
- Maximum 1 page per NML standards
- No legal citations in the Introduction (save for Legal Standards section)
- Use the client's name, not "plaintiff" (or use SA merge token)
- Set the theme — this is the court's first impression
- Do not overstate the evidence; credibility with the court matters

---

### Section II: Statement of the Case (Target: 1-2 pages)

**Purpose**: Provide the procedural context so the court knows the case's
posture and what remains for trial.

**Structure**:

```
II. STATEMENT OF THE CASE

A. Procedural History

[Plaintiff name] filed this action on [date]. [Dkt. #1]. The Complaint
asserts [number] causes of action: [list]. [Defendant] filed an Answer
on [date] raising [key affirmative defenses]. [Dkt. #X].

[If applicable: Discovery closed on [date]. Plaintiff disclosed [number]
expert witnesses. Defendant disclosed [number] expert witnesses.]

[If applicable: The Court granted/denied [relevant motions — MSJ, MTD,
MIL rulings] on [date]. [Dkt. #X]. As a result, the following claims
remain for trial: [list].]

B. Nature of Claims

The claims remaining for trial are:
1. [Cause of action 1] — [brief description]
2. [Cause of action 2] — [brief description]

C. Parties

Plaintiff [name] is [brief identifying information relevant to claims].
Defendant [name] is [brief identifying information — corporate status,
relationship to incident].
```

**Pack Integration**:
- Procedural dates from case metadata (SA or user-provided)
- Claims from LPB PACKET
- Motion outcomes from MSJ analysis (if available)
- Party information from CFP PACKET

---

### Section III: Statement of Facts (Target: 3-8 pages)

**Purpose**: Present the factual narrative in a compelling, chronological
manner supported by record citations. This is the most important section
for persuasion.

**Structure**:

```
III. STATEMENT OF FACTS

A. Background

[Plaintiff's life and circumstances before the incident — humanize]
[CFP Fact#, Exhibit/Deposition cite for each material fact]

B. The [Incident/Accident/Event]

[Chronological narrative of what happened]
[Each fact cited to specific exhibit or deposition transcript]
[Present tense for immediacy where appropriate in trial brief]

C. Injuries and Medical Treatment

[Description of injuries sustained]
[Initial emergency treatment]
[Subsequent treatment course]
[Current medical status and prognosis]
[All cited to medical records with Bates references]

D. Impact and Damages

[Impact on plaintiff's life, work, activities]
[Lost wages documentation]
[Ongoing limitations and future treatment needs]
[Cited to employment records, medical records, plaintiff testimony]
```

**Pack Integration**:
- Every fact from CFP PACKET with Fact# reference
- Every citation to exhibit (Bates number) or deposition (Page:Line)
- Medical facts from CFP medical timeline entries
- Damages facts from DC / DVP framework

**Rules**:
- RECORD DISCIPLINE: Every material fact must have a pinpoint citation
  to an exhibit or deposition transcript
- Citation format: `(Ex. [#], Bates [####])` or `([Name] Depo. [Page]:[Line])`
- Do not include facts without evidentiary support — flag as `[VERIFY]`
- Present facts favorably but honestly — do not overstate
- Organize chronologically unless a topical organization better serves
  the narrative

---

### Section IV: Legal Standards (Target: 2-4 pages)

**Purpose**: Set forth the legal elements the jury will be instructed on
and the burden of proof, establishing the framework for the argument section.

**Structure**:

```
IV. LEGAL STANDARDS

A. Burden of Proof

In a civil action, the plaintiff bears the burden of proving each
element of the claim by a preponderance of the evidence. UJI 13-201.
[LPB LawTag reference]

B. [Cause of Action 1] — [e.g., Negligence]

To prevail on a claim of negligence under New Mexico law, plaintiff
must prove:

1. Defendant owed plaintiff a duty of ordinary care;
2. Defendant breached that duty;
3. Defendant's breach was a proximate cause of plaintiff's injuries; and
4. Plaintiff suffered damages.

UJI 13-1601; [Case citation from LPB]; [LPB LawTag].

[Brief elaboration on each element with key case law defining the standard]

C. [Cause of Action 2] — [if applicable]

[Same format]

D. Damages Standards

New Mexico law permits recovery of the following categories of damages
for personal injuries: [list per UJI 13-1802]. UJI 13-1802; [LPB LawTag].
```

**Pack Integration**:
- All legal standards from LPB PACKET (PackReady=Yes only)
- UJI element definitions from LPB
- Case law with pinpoint citations from LPB
- NM-first authority hierarchy per NML rules

**Rules**:
- Use NM authority first (NM Supreme Court > NM Court of Appeals > UJI
  Committee Commentary > federal courts applying NM law)
- Every legal assertion cited to LPB LawTag with pinpoint
- Include only standards relevant to remaining claims
- If a legal standard is uncertain, flag as `[VERIFY-CITE]`

---

### Section V: Argument — Element-by-Element Analysis (Target: 5-15 pages)

**Purpose**: The heart of the brief. Apply facts to law for each element
of each cause of action.

**Structure (per element)**:

```
V. ARGUMENT

A. [CAUSE OF ACTION 1]: [Name]

  1. [Element 1: Duty]

[Legal standard from LPB with pinpoint citation]

[Application to facts: "Here, [defendant] owed [plaintiff] a duty of
ordinary care because [factual basis from CFP with exhibit/depo cites]."]

[PCM proof status: evidence supporting this element]

[If defense anticipated:] Defendant will likely argue [defense position].
This argument fails because [rebuttal with authority from LPB].

  2. [Element 2: Breach]

[Same format — standard, application, proof status, defense anticipation]

  3. [Element 3: Causation]

[Same format]

  4. [Element 4: Damages]

[Same format — may cross-reference to Damages section]

B. [CAUSE OF ACTION 2]: [Name]

[Same element-by-element format]
```

**Pack Integration**:
- Legal standards from LPB PACKET
- Facts and evidence from CFP PACKET with Fact# references
- Element mapping from PCM
- Defense anticipation from PDM (if available) or attorney input

**Rules**:
- One subsection per element — no skipping elements
- If an element has weak proof, address it honestly and flag as
  `[ELEMENT-RISK]` — do not pretend the weakness does not exist
- Distinguish adverse authority rather than ignoring it
- Each element subsection should stand alone as a mini-argument
- Cross-reference to jury instructions where helpful

---

### Section VI: Damages (Target: 2-5 pages)

**Purpose**: Present the damages case with specificity, organized by UJI
damages categories.

**Structure**:

```
VI. DAMAGES

A. Medical Expenses

  1. Past Medical Expenses

[Itemized medical providers and amounts from DC/DVP]
[Cited to medical bills with exhibit numbers and Bates references]
Total past medical expenses: $[amount] (Ex. [#])

  2. Future Medical Expenses

[Life care plan or treating physician projections]
[Expert testimony anticipated]
[Cited to expert report or medical records]

B. Lost Wages and Earning Capacity

  1. Past Lost Wages: $[amount]
  [Employment records, tax returns — Ex. [#]]

  2. Future Lost Earning Capacity
  [Economist projections if available]

C. Pain and Suffering

  1. Past Pain and Suffering
  [Evidence of pain, limitations, emotional impact]

  2. Future Pain and Suffering
  [Prognosis, permanent limitations, ongoing treatment]

D. Loss of Enjoyment of Life

[Before/after comparison of activities and quality of life]

E. [Additional Categories if Applicable]

[Disfigurement, loss of consortium, punitive damages]
```

**Pack Integration**:
- Medical expenses from DC / DVP
- Lost wages from DC / CFP employment records
- Pain evidence from CFP PACKET
- Expert projections from CFP expert entries

---

### Section VII: Evidentiary Issues (Target: 1-3 pages)

**Purpose**: Alert the court to key evidentiary matters and demonstrate
trial readiness.

**Structure**:

```
VII. EVIDENTIARY ISSUES

A. Motions in Limine

[Status of filed motions in limine — granted, denied, pending]
[Key rulings and their impact on trial presentation]

B. Key Exhibits — Foundation and Admissibility

[For critical exhibits, note foundation basis and anticipated objections]

| Exhibit | Description | Foundation | Anticipated Objection | Response |
|---------|-------------|------------|----------------------|----------|

C. Expert Testimony

[Summary of expert witnesses and the scope of their anticipated testimony]
[Daubert/NMRA 11-702 qualifications addressed if challenged]

D. Deposition Designations

[Status of deposition designations and counter-designations]
[Key testimony to be presented by deposition]
```

---

### Section VIII: Conclusion (Target: 0.5-1 page)

**Purpose**: Summarize and state the specific relief requested.

**Structure**:

```
VIII. CONCLUSION

For the reasons set forth above, the evidence at trial will establish
that [defendant] [was negligent / is liable] and that [plaintiff] suffered
[damages] as a direct result. [Plaintiff name] respectfully requests
that this Court [specific relief — e.g., "permit this matter to proceed
to trial on the merits" / "enter judgment in favor of plaintiff following
trial"].
```

**Rules**:
- BODY-ONLY: No signature block, certificate of service, or verification
  (these come from SA shell)
- Keep concise — the argument section did the heavy lifting
- State specific relief requested
- End with confidence, not with hedging

## Section Length Guidelines

| Section | Target Length | Maximum |
|---------|-------------|---------|
| I. Introduction | 1 page | 1.5 pages |
| II. Statement of Case | 1-2 pages | 3 pages |
| III. Statement of Facts | 3-8 pages | 12 pages |
| IV. Legal Standards | 2-4 pages | 5 pages |
| V. Argument | 5-15 pages | 20 pages |
| VI. Damages | 2-5 pages | 8 pages |
| VII. Evidentiary Issues | 1-3 pages | 4 pages |
| VIII. Conclusion | 0.5-1 page | 1 page |
| **Total** | **15-39 pages** | **55 pages** |

Note: Page estimates assume standard NML formatting (12pt Times New Roman,
double-spaced, 1-inch margins). Adjust for actual formatting requirements.

## BODY-ONLY Reminder

The TRIAL-BRIEF skill produces BODY-ONLY content. The following are NOT
included in the output (they come from the SA shell):
- Caption / case header
- Court name and case number
- Signature block
- Certificate of service
- Verification (if required)
- Table of contents (generated from headings)
- Table of authorities (generated from citations)

The SA shell provides merge tokens for case-specific information.
Preserve all merge tokens exactly as provided.
