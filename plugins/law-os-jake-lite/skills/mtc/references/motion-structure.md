# MTC Motion Structure — Reference

## BODY-ONLY Template

The SA shell provides: caption, case number, court, COS, signature block.
This skill drafts only the argument body (Sections I–VII).

---

### I. INTRODUCTION

**Template:**
```
[MERGE:CaseName] respectfully moves this Court for an order compelling
[Respondent] to provide complete responses to [count] discovery requests
and to produce all responsive documents withheld on the basis of
legally insufficient objections.

[If NM:] This motion is brought pursuant to NMRA 1-037.
[If FED:] This motion is brought pursuant to Fed. R. Civ. P. 37(a)(3)(B).
Undersigned counsel certifies that a good faith effort to resolve these
disputes without court intervention was made, as required by D.N.M.
LR-Civ 7.1(a). [Reference GFL date and cure deadline.]

[Pattern summary — if one exists, e.g.:]
[Respondent]'s responses follow a pattern of [boilerplate objections /
evasive answers / refusal to produce] that, taken together, frustrate
[Plaintiff]'s ability to [prepare for trial / respond to Defendant's
motion / complete expert disclosures].
```

**Traceability:** Request count from DPB PACKET row count. GFL date from
evidence_layer or meet_confer_log. Rule citation from LPB.

---

### II. FACTUAL BACKGROUND

**Template:**
```
On [ServedDate], [Plaintiff/our client] served [SetType description]
on [Respondent]. (DPB Set [SetID].)

[Respondent] served responses on [ResponseDate].

On [GFL date], undersigned counsel sent a detailed good faith letter
identifying [count] deficient responses and requesting supplementation
within [deadline] days. (Exhibit [X].)

[If meet-confer conference occurred:]
On [conference date], the parties conferred regarding the outstanding
deficiencies. [Brief outcome — e.g., "Respondent agreed to supplement
certain responses but has failed to do so."]

[If cure deadline passed:]
The cure deadline expired on [date] without adequate supplementation.
[Count] requests remain deficient.
```

**Traceability:** All dates from DPB Set_Metadata and meet_confer_log.
No characterization of opposing counsel's motives — just chronological facts.

---

### III. LEGAL STANDARD

**Template:**
```
[Build from LPB authority. Use the following structure:]

A party may move for an order compelling discovery when a party fails
to answer an interrogatory or to produce documents as requested.
[Rule citation + LPB LawTag + Pinpoint].

The scope of discovery is broad. [Quote scope rule — LPB authority].

The party resisting discovery bears the burden of showing that the
requested discovery should not be permitted. [LPB authority + Pinpoint].

An objection that fails to state grounds with specificity is waived.
[LPB authority + Pinpoint].
```

**Note:** Every sentence in this section must cite an LPB LawTag + Pinpoint.
If a rule statement lacks LPB backing, mark `[VERIFY-CITE]`.

---

### IV. ARGUMENT — GENERAL OBJECTIONS (if applicable)

**When to include:** When DPB packet shows the same boilerplate objection
text repeated across 3+ requests, address it globally first to avoid
repetition in the request-by-request section.

**Template per general objection:**
```
A. The "[Objection Text]" Objection Should Be Overruled.

[Respondent] objects to [count] requests on the ground that the requests
are "[objection text]." This objection is legally insufficient because
[analysis — cite LPB authority + pinpoint].

[If objection lacks specificity:]
Moreover, this objection fails to identify which requests are purportedly
[burdensome/vague/etc.] or explain why. [Cite specificity requirement —
LPB authority + pinpoint.]

[If waiver applies:]
This objection is also waived because [reason — untimely / format defect /
failure to preserve at response]. [Cite waiver authority — LPB + pinpoint.]
```

---

### V. ARGUMENT — REQUEST-BY-REQUEST

**This is the core of the motion. Each deficient request gets its own
lettered subsection.**

**Template per request:**
```
[Letter]. [SetType] No. [ReqNum]

[Respondent] was asked to [summarize request — from DPB ReqText].

[If OBJECTION-ONLY:]
[Respondent] interposed [count] objection(s) without providing any
substantive response: "[ObjText summary]." [DPB SetID/ReqNum.]

[If EVASIVE:]
[Respondent] provided the following response: "[AnswerText summary]."
[DPB SetID/ReqNum.] This response is evasive because [explain what is
missing or non-responsive].

[If NO-RESPONSE:]
[Respondent] failed to provide any response to this request.
[DPB SetID/ReqNum.]

[If CURE-FAILED:]
This deficiency was identified in the [date] good faith letter and
[Respondent] was given [N] days to cure. The cure period has expired
without adequate supplementation. [DPB SetID/ReqNum.]

[Relevance analysis:]
This request seeks information directly relevant to [Plaintiff]'s
[claim type / element — from DPB Element_ID if available] because
[explain specific relevance]. [Cite scope/relevance authority —
LPB LawTag + Pinpoint.]

[Objection analysis — for each objection:]
The [objection type] objection is unfounded. [Analysis + LPB citation.]

[If proportionality raised:]
The proportionality factors favor disclosure: [address applicable factors
from FRCP 26(b)(1) or NM equivalent — each factor cited to LPB].

[If productions incomplete:]
The documents produced to date ([BatesStart]–[BatesEnd]) are incomplete.
[Describe gap — from DPB Productions tab.] [Respondent] should be
compelled to produce all responsive documents with a complete index.

[Relief:]
The Court should compel [Respondent] to [specific relief].
```

---

### VI. SANCTIONS / EXPENSES

**Template:**
```
[If FED:]
Under Rule 37(a)(5)(A), if the motion is granted, the Court "must"
require the party whose conduct necessitated the motion to pay the
movant's reasonable expenses, including attorney's fees, unless the
opposing party's position was substantially justified or other
circumstances make an award unjust. [LPB authority + Pinpoint.]

[Respondent]'s position was not substantially justified because
[brief summary — the objections were boilerplate, the deficiencies
were identified in the GFL, and [Respondent] failed to cure].

[MERGE:CaseName] respectfully requests an award of reasonable attorney's
fees and costs incurred in bringing this motion.

[If NM:]
Under NMRA 1-037(A)(4), the Court may award reasonable expenses
including attorney's fees. [LPB authority + Pinpoint.]
```

---

### VII. CONCLUSION

**Template:**
```
WHEREFORE, [MERGE:CaseName] respectfully requests that this Court:

1. Compel [Respondent] to provide full, verified responses to
   [SetType] Nos. [list ReqNums] within [N] days;

2. Compel [Respondent] to produce all responsive documents withheld
   on the basis of the overruled objections, with a complete Bates index;

3. Award [Plaintiff] reasonable attorney's fees and costs incurred in
   bringing this motion; and

4. Grant such other relief as the Court deems just and proper.
```

---

## Exhibit Strategy

The motion should reference exhibits that the attorney will assemble:

| Exhibit | Content | Source |
|---------|---------|--------|
| A | Discovery requests (as served) | SA document archive |
| B | Discovery responses (as received) | SA document archive |
| C | Good faith letter(s) | GFL output / SA archive |
| D | Correspondence showing cure efforts | Meet-confer log |

The BODY-ONLY draft references these as "(Exhibit [X])" — the attorney
attaches them during SA shell assembly.
