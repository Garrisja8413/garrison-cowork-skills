# Complaint Structure — Reference

## BODY-ONLY Template

The SA shell provides: caption, case number, court identification header,
certificate of service, verification (if required), signature block.
This skill drafts only the complaint body (Sections I–VII).

---

### I. JURISDICTIONAL ALLEGATIONS

**Purpose:** Establish the court's authority to hear the case.

#### NM State Court Template:

```
¶ 1.  This is an action for [damages / personal injury / wrongful death /
      other] arising from [brief description of incident type].

¶ 2.  This Court has jurisdiction over this matter pursuant to [NMSA § 38-3-1.1
      (district court general jurisdiction)] [and/or specific statutory basis].

¶ 3.  Venue is proper in [County] County pursuant to [NMSA § 38-3-1(A)
      (county where the cause of action arose) / (B) (county where defendant
      resides) / (C) (county where defendant may be found)].
```

#### Federal Court (D.N.M.) Template:

```
¶ 1.  This is an action for [damages / personal injury / civil rights
      violations] arising from [brief description of incident type].

¶ 2.  This Court has subject matter jurisdiction pursuant to
      [28 U.S.C. § 1332 (diversity of citizenship — Plaintiff is a citizen
      of [State] and Defendant is a citizen of [State], and the amount in
      controversy exceeds $75,000, exclusive of interest and costs)]
      [OR: 28 U.S.C. § 1331 (federal question — claims arise under
      [federal statute / 42 U.S.C. § 1983 / etc.])].

¶ 3.  This Court has personal jurisdiction over [Defendant] because
      [Defendant resides in this District / transacts business in this
      District / committed tortious acts in this District].

¶ 4.  Venue is proper in the District of New Mexico pursuant to
      28 U.S.C. § 1391(b) because [a substantial part of the events giving
      rise to the claims occurred in this District / Defendant resides in
      this District].
```

**Traceability:** Jurisdiction and venue facts from intake_info or CFP.
Statutory citations from LPB RULES rows or direct statutory reference.
If jurisdiction/venue facts are not in the CFP, flag `[VERIFY]`.

---

### II. PARTIES

**Purpose:** Identify all parties with sufficient specificity for service
and to establish the court's authority over each.

#### Plaintiff Template:

```
¶ [#].  Plaintiff [MERGE:ClientFullName] (hereinafter "[MERGE:ClientInitials]"
        or "Plaintiff") is [an individual / a natural person] who, at all
        times relevant hereto, was a [resident of [County] County, New Mexico /
        citizen of the State of New Mexico].
```

#### Individual Defendant Template:

```
¶ [#].  Defendant [MERGE:DefendantName] (hereinafter "[DefShortName]") is
        [an individual / a natural person] who, at all times relevant hereto,
        was a [resident of [County] County, New Mexico / citizen of the State
        of [State]], and who may be served with process at [address or
        through registered agent].
```

#### Entity Defendant Template:

```
¶ [#].  Defendant [Entity Name] (hereinafter "[ShortName]") is a
        [corporation organized under the laws of [State] / limited liability
        company / partnership / political subdivision of the State of
        New Mexico] that, at all times relevant hereto, [owned / operated /
        maintained / managed] [the property / business / vehicle] at issue
        and [was authorized to do business in / transacted business in /
        maintained a principal place of business in] the State of New Mexico.
        [Entity Name] may be served with process through its [registered
        agent / statutory agent / office] at [address].
```

#### Government Entity Template (NM TCA):

```
¶ [#].  Defendant [Government Entity Name] is a [governmental entity /
        political subdivision of the State of New Mexico / state agency]
        subject to the New Mexico Tort Claims Act, NMSA §§ 41-4-1 through
        41-4-27.

¶ [#].  [If applicable:] Plaintiff provided timely written notice of this
        claim to [Government Entity] on [date], in compliance with NMSA
        § 41-4-16(A). More than ninety (90) days have elapsed since the
        giving of said notice, and [Government Entity] has [denied the claim /
        failed to act upon the claim].
```

#### Doe Defendant Template (NM):

```
¶ [#].  Defendants DOES 1 through [N], inclusive, are persons or entities
        whose true names and capacities are unknown to Plaintiff at this
        time. Plaintiff will seek leave to amend this Complaint to state
        the true names and capacities of said Doe Defendants when they are
        ascertained. Plaintiff is informed and believes, and thereon
        alleges, that each Doe Defendant is in some manner responsible for
        the injuries and damages alleged herein.
```

#### Agency / Respondeat Superior Template:

```
¶ [#].  At all times relevant hereto, Defendant [Employee/Agent Name] was
        acting within the course and scope of [his/her/their] employment
        with and/or agency for Defendant [Employer/Principal Name].
        Defendant [Employer] is vicariously liable for the acts and
        omissions of [Employee/Agent] under the doctrine of respondeat
        superior.
```

**Traceability:** Party names from intake_info or CFP File_Metadata.
Residency/citizenship from intake_info. Service addresses from intake_info.
If any party information is missing, use merge tokens or flag `[VERIFY]`.

---

### III. GENERAL FACTUAL ALLEGATIONS

**Purpose:** Establish the factual foundation for all causes of action
in a chronological, numbered-paragraph narrative.

**Template pattern per paragraph:**
```
¶ [#].  [Factual allegation — one discrete fact per paragraph, derived
        from CFP Fact# row]. [CFP: Fact#-[###], [SourceDoc], [Pinpoint]].
```

**Organization principle:** Chronological order, grouped by phase:

#### Phase 1: Pre-Incident Context
- Defendant's duties, obligations, relationship to plaintiff
- Property conditions, employment relationships, safety standards
- Prior notice or knowledge (if relevant)

#### Phase 2: The Incident
- Date, time, location
- Sequence of events (strictly from CFP — no embellishment)
- Actions/omissions of each party
- Mechanism of injury

#### Phase 3: Post-Incident / Causation
- Immediate aftermath
- Emergency response / medical treatment
- Diagnostic findings (general — detailed in Damages)
- Causal connection between defendant's conduct and injuries

#### Phase 4: Notice & Compliance (if applicable)
- Tort Claim Notice sent (date, method, recipient)
- 90-day waiting period elapsed
- Insurance notifications
- Any administrative exhaustion required

**Critical rules for factual allegations:**
- One fact per paragraph (micro-decomposition from CFP)
- Every paragraph has a CFP Fact# trace in the Cite Table
- Use "upon information and belief" only when CFP row is marked as such
- Never characterize or editorialize — state facts neutrally
- Dates and locations must match CFP exactly
- Medical conditions stated in source-matched language (CFP phrasing)
- No legal conclusions in factual paragraphs (save for COA sections)

**Example factual paragraphs:**
```
¶ 12.  On [MERGE:AccidentDate], Plaintiff was a lawful patron at the
       [business/premises] located at [address], [City], New Mexico.

¶ 13.  At approximately [time], [describe condition/hazard — from CFP].

¶ 14.  As a direct result of [condition/hazard], Plaintiff [describe
       incident — from CFP].

¶ 15.  [Defendant/Defendant's employee] [knew or should have known of
       the dangerous condition] because [notice facts — from CFP].

¶ 16.  Immediately following the incident, Plaintiff was [transported to /
       treated at] [medical facility] for [general injury description —
       from CFP].
```

**Traceability:** Every factual paragraph must have a corresponding
Cite Table entry linking to CFP Fact# + SourceDoc + Pinpoint.
Paragraphs synthesizing multiple facts reference multiple Fact# rows.

---

### IV. CAUSES OF ACTION (COUNTS)

**Purpose:** State each legal theory with its required elements,
factual support, and legal basis.

**Template per Count:**

```
                            COUNT [N]
               [CAUSE OF ACTION NAME — CAPS]
         ([Statutory/Common Law Basis — e.g., Negligence])

¶ [#].  Plaintiff incorporates by reference the allegations contained
        in Paragraphs 1 through [last prior ¶] as though fully set
        forth herein.

[For each required element of the cause of action:]

¶ [#].  [Element statement — drawn from LPB element definition].

¶ [#].  [Factual support for this element — drawn from CFP rows
        mapped to this Element_ID]. Specifically, [facts demonstrating
        this element is satisfied].

[If element gap:]
¶ [#].  [ELEMENT-GAP: [COA Name] / [Element Name]] — [Plead the
        element with available facts; flag gap in Open Items for
        attorney review].

[Conclude each count:]

¶ [#].  As a direct and proximate result of [Defendant]'s [negligent
        acts / breach / violation], Plaintiff has suffered and continues
        to suffer [damages description — general reference; detail in
        Damages section].
```

**Element mapping discipline:**
- Read `references/causes-of-action.md` for NM PI element definitions
- Each element must reference the LPB LawTag that defines it
- Each element must reference the CFP Fact# rows that support it
- If PCM is available, cross-reference PCM coverage status
- COVERED elements: plead with full factual support
- PARTIAL elements: plead with available facts + flag for discovery
- UNPROVEN elements: plead conservatively + flag `[ELEMENT-GAP]`

**Count ordering:** Strongest claims first. See SKILL.md for preferred sequence.

---

### V. DAMAGES ALLEGATIONS

**Purpose:** Specify the categories and nature of damages sought.

**Template:**
```
                          DAMAGES

¶ [#].  As a direct and proximate result of Defendants' [negligent /
        wrongful / unlawful] conduct as alleged herein, Plaintiff has
        suffered and continues to suffer the following injuries and
        damages:

        a. Physical injuries including but not limited to [general
           description from CFP — e.g., "injuries to Plaintiff's
           [body part(s)]"];

        b. Past and future medical expenses [in an amount to be
           proven at trial / in excess of $[amount] — from DC or CFP];

        c. Past and future lost wages and impairment of earning
           capacity [in an amount to be proven at trial];

        d. Past and future physical pain and suffering;

        e. Past and future mental anguish and emotional distress;

        f. Loss of enjoyment of life;

        g. [If applicable:] Disfigurement and physical impairment;

        h. [If applicable:] Property damage in an amount to be
           proven at trial;

        i. [If applicable:] Pre-judgment interest as allowed by law;

        j. Costs of suit and attorneys' fees [if statutory basis
           exists — cite statute]; and

        k. Such other and further damages as may be proven at trial.
```

#### Punitive Damages (if applicable):

```
¶ [#].  [Defendant]'s conduct as alleged herein was [willful / wanton /
        reckless / fraudulent / in reckless disregard of Plaintiff's
        rights and safety], warranting an award of punitive damages
        sufficient to punish [Defendant] and deter similar conduct in
        the future.
```

**Traceability:** Damage categories from CFP medical/financial facts.
Amounts from DC (Damages Calculator) output if available.
Punitive damages predicate conduct from CFP rows showing willfulness/recklessness.

---

### VI. PRAYER FOR RELIEF

**Template:**
```
                      PRAYER FOR RELIEF

WHEREFORE, Plaintiff [MERGE:ClientFullName] respectfully requests that
this Court enter judgment against Defendants, jointly and severally,
and award Plaintiff:

1. Compensatory damages [in an amount to be proven at trial / in
   excess of $[amount]], including but not limited to:

   a. Past and future medical expenses;
   b. Past and future lost wages and impairment of earning capacity;
   c. Past and future pain and suffering;
   d. Past and future mental anguish and emotional distress;
   e. Loss of enjoyment of life;
   f. [Disfigurement — if applicable];
   g. [Property damage — if applicable];

2. [If applicable:] Punitive damages in an amount sufficient to
   punish Defendants and deter similar conduct;

3. [If statutory basis:] Attorneys' fees and costs of suit pursuant
   to [statute];

4. Pre-judgment and post-judgment interest as allowed by law;

5. Costs of suit; and

6. Such other and further relief as the Court deems just and proper.
```

**NM-specific note:** In NM state court, the prayer need not state a
specific dollar amount for PI claims. "In excess of the jurisdictional
minimum" or "in an amount to be proven at trial" is sufficient.

**Federal note:** For diversity jurisdiction, must allege amount in
controversy exceeds $75,000. The prayer should reflect this.

---

### VII. JURY DEMAND

**Template:**
```
                        JURY DEMAND

Plaintiff demands a trial by jury on all issues so triable.
```

**NM:** NMRA 1-038 — demand must be served no later than 10 days after
service of the last pleading directed to the triable issue.

**Federal:** FRCP 38(b) — demand must be served no later than 14 days
after service of the last pleading directed to the triable issue.

**Strategic note:** Include the jury demand in the complaint itself to
preserve the right. It can also be made separately, but including it in
the complaint is the safest practice.

---

## Paragraph Numbering Rules

1. All paragraphs numbered consecutively from ¶ 1 through the end
2. No gaps in numbering
3. No duplicate numbers
4. Each Count incorporates prior paragraphs by reference, then continues
   the consecutive numbering (does NOT restart at ¶ 1)
5. The Damages and Prayer sections continue the numbering
6. The Cite Table references paragraphs by number for traceability

### Word Numbered List Implementation (CRITICAL)

When the complaint is assembled into a .docx file, paragraph numbers
**MUST use Word's numbered list mechanism** (`<w:numPr>`) — NOT inline
text numbers (do NOT type "1." or "¶ 1." as text before the paragraph).

Define a `_PA Complaint Paragraph` style with:

```xml
<w:style w:type="paragraph" w:customStyle="1" w:styleId="PAComplaintParagraph">
  <w:name w:val="_PA Complaint Paragraph"/>
  <w:basedOn w:val="Normal"/>
  <w:qFormat/>
  <w:pPr>
    <w:numPr>
      <w:numId w:val="[complaint-num-id]"/>
    </w:numPr>
    <w:ind w:left="720" w:hanging="360"/>
  </w:pPr>
</w:style>
```

The corresponding abstractNum must define:
- `numFmt="decimal"` — produces "1.", "2.", "3.", etc.
- `start val="1"` — begins at paragraph 1
- Hanging indent for clean alignment of paragraph text after the number

**Why this matters:** Attorneys regularly add, delete, and reorder complaint
paragraphs during drafting and amendment. Word's numbering engine renumbers
automatically. Inline text numbers require tedious manual updates and
frequently result in numbering errors in filed documents.

**Example numbering:**
```
Jurisdiction:     ¶¶ 1–3
Parties:          ¶¶ 4–10
Factual:          ¶¶ 11–35
Count I:          ¶¶ 36–45
Count II:         ¶¶ 46–53
Count III:        ¶¶ 54–60
Damages:          ¶¶ 61–63
Prayer:           (unnumbered — traditional format)
Jury Demand:      (unnumbered — traditional format)
```

---

## Incorporation by Reference

Each Count after the first must incorporate prior allegations:

```
¶ [#].  Plaintiff incorporates by reference the allegations contained
        in Paragraphs 1 through [last prior ¶] as though fully set
        forth herein.
```

This avoids re-pleading the same facts in each count while preserving
the factual foundation for every cause of action.

---

## Exhibit Strategy

The complaint may reference exhibits that the attorney will attach:

| Exhibit | Content | Source |
|---------|---------|--------|
| A | Tort Claim Notice (if government defendant) | LOR output / SA archive |
| B | Return receipt / proof of service of notice | SA document archive |
| C | Photographs / diagrams (if referenced) | Case file |
| D | Contracts / agreements (if referenced) | CFP source documents |

The BODY-ONLY draft references these as "(Exhibit [X])" or "(a true
and correct copy of which is attached hereto as Exhibit [X])" — the
attorney attaches them during SA shell assembly.

---

## Amended Complaint Considerations

When drafting in AMENDED mode:

1. **Change Summary:** Before the complaint body, provide a summary of
   all changes from the prior version:
   - New paragraphs added (with reason)
   - Modified paragraphs (with reason — e.g., "cures specificity defect
     identified in MTD")
   - Removed paragraphs (with reason)
   - New/removed causes of action
   - New/removed parties

2. **Track changes internally:** Flag new or modified paragraphs with
   `[NEW]` or `[MODIFIED]` in the Cite Table Notes column.

3. **Relation-back:** If adding new parties or claims, note whether
   relation-back under NMRA 1-015(C) / FRCP 15(c) applies.

4. **Preserve paragraph numbering:** Amended complaint should have its
   own consecutive numbering (not the original's numbers). The Change
   Summary maps old ¶¶ to new ¶¶.
