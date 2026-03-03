# GFL Letter Structure — Reference

## Template: Good Faith Discovery Letter

Use this structure for all GFL drafts. Each section traces to Pack data.

---

### Header Block (from SA Shell — do NOT generate)

```
[MERGE:FirmLetterhead]
[MERGE:TodayDate]

[Service Method]

[Recipient Name]
[Recipient Address]
```

### RE Line

```
RE:     [MERGE:CaseName]
        Claimant: [MERGE:ClientInitials]
        Date of Incident: [MERGE:AccidentDate]
        Discovery Set(s): [SetID(s) from DPB packet]
```

---

### Section 1: Opening

**Template:**
```
Dear [Recipient/Counsel]:

This office represents [MERGE:ClientInitials] in connection with the
above-referenced matter. We write regarding [Respondent]'s responses to
[our/Plaintiff's] [SetType — e.g., First Set of Interrogatories and
Requests for Production], served on [ServedDate] and responded to on
[ResponseDate].

[If NM:] Pursuant to NMRA 1-037, we are required to attempt a good faith
resolution of discovery disputes before seeking court intervention.
[If FED:] Pursuant to D.N.M. LR-Civ 7.1(a), undersigned counsel certifies
that a good faith effort has been made to resolve these disputes.

We have identified [count] requests with deficient responses requiring
supplementation or cure. The deficiencies are detailed below.
```

**Traceability:** ServedDate, ResponseDate, SetType, SetID all from DPB Set_Metadata.

---

### Section 2: General Objections

**When to include:** Include when DPB packet shows boilerplate/general objections
repeated across multiple requests.

**Template:**
```
I. GENERAL OBJECTIONS

[Respondent] has interposed general objections that are incorporated
by reference into responses to individual requests. General objections
are disfavored.

[Cite LPB authority — e.g.:]
"[Quote from LPB row re general objections being insufficient]"
[LawTag + Pinpoint]

The following general objections should be withdrawn:

A. [General objection text from DPB — e.g., "overly broad and unduly burdensome"]
   This objection is unsupported because [declarative statement — the request
   is narrowly tailored to [specific relevance]; no burden has been demonstrated
   with specifics as required by [LPB authority + pinpoint]].

B. [Next general objection...]
   ...
```

**Traceability:** Each general objection from DPB ObjText; each legal citation
from LPB LawTag + Pinpoint.

---

### Section 3: Specificity Deficiency

**When to include:** Include when any individual objection lacks sufficient
detail or specificity to allow meaningful evaluation.

**Template:**
```
II. OBJECTIONS LACKING SUFFICIENT SPECIFICITY

[Cite LPB authority — e.g., FRCP 33(b)(4) / NMRA 1-033(B):]
"[Quote re objections must state grounds with specificity]"
[LawTag + Pinpoint]

The following requests contain objections that fail to state the grounds
with sufficient specificity:

- [SetType] No. [ReqNum]: Objection states "[ObjText summary]" without
  identifying the specific burden, privilege, or basis.
- [SetType] No. [ReqNum]: ...
```

---

### Section 4: Request-by-Request Analysis

**This is the core of the letter. Every deficient request from the DPB packet
gets its own subsection.**

**Template per request:**
```
III. REQUEST-BY-REQUEST ANALYSIS

[Number sequentially: A, B, C... or by SetType groups]

A. [SetType] No. [ReqNum]

Request: [Brief description of what was sought — from DPB ReqText field.
Summarize; do not copy entire request unless short.]

Objection(s): [Summarize each objection — from DPB ObjText]

Response: [Summarize substantive response, if any — from DPB AnswerText.
If NO-RESPONSE: "No substantive response was provided."]

This request is narrowly tailored to seek admissible evidence relevant to
[explain specific relevance to claims/defenses and how it satisfies
proportionality — cite LPB authority if needed].

[For each objection, in order:]

Regarding the [objection type] objection: [Declarative statement
explaining why the objection should be withdrawn or overruled].
[Cite LPB authority + pinpoint]. [If DPB shows partial response:]
The partial response provided — [quote or summarize] — demonstrates
that the information exists and is accessible, undermining the
[burden/relevance] objection.

[If productions are incomplete — from DPB Productions tab:]
Furthermore, the production index shows [BatesStart–BatesEnd] produced
for this request, but [describe gap — e.g., "responsive documents
referenced in the narrative answer were not included in the production"].

Requested Action: [Respondent] should [withdraw objection / supplement
response / produce responsive documents] within [deadline] days of this
letter.
```

**Traceability per request:**
- ReqNum, ReqText, ObjText, AnswerText, State → DPB Requests tab
- BatesStart, BatesEnd, CompletionFlag → DPB Productions tab
- Legal authority → LPB LawTag + Pinpoint

---

### Section 5: Cure Demand

**Template:**
```
IV. REQUESTED RELIEF

We request that [Respondent] cure the above-identified deficiencies
within [14 days (NM) / 30 days (FED)] of this letter by:

1. Withdrawing all unsupported general objections;
2. Supplementing responses to the [count] requests identified above
   with substantive, verified answers;
3. Producing all responsive documents not yet produced, with a
   complete Bates index; and
4. Confirming in writing that the supplementation is complete.

If these deficiencies are not cured, we will have no choice but to
seek court intervention through a motion to compel pursuant to
[NMRA 1-037 / FRCP 37(a)].

We remain available to confer regarding these issues at your convenience.
Please contact this office at [MERGE:FirmPhone] to schedule a conference.
```

---

### Section 6: Preservation (if applicable)

**When to include:** Include when DPB Productions tab shows incomplete
production or any SPOLIATION flags.

**Template:**
```
V. PRESERVATION OBLIGATIONS

We remind [Respondent] of the continuing obligation to preserve all
documents, electronically stored information, and tangible things
relevant to this litigation. [Cite LPB authority re preservation].
Failure to preserve may result in sanctions under [NMRA 1-037(C) /
FRCP 37(e)].
```

---

### Closing (from SA Shell — merge tokens only)

```
Sincerely,

[MERGE:AttorneySignatureBlock]

[MERGE:Initials]

cc: [MERGE:ServiceList]
```

---

## Follow-Up Letter Adjustments

When mode = FOLLOW-UP or CURE-FAILED:

1. **Opening:** Reference prior GFL by date: "By letter dated [date], we
   identified [count] discovery deficiencies..."
2. **Tone:** Firmer but still professional. Note deadline has passed.
3. **Specifics:** Identify which requests remain deficient vs. cured.
4. **Closing:** For CURE-FAILED: "As the cure period has expired without
   adequate supplementation, we intend to file a motion to compel."

## Change Summary (Rewrite Mode)

When mode = REWRITE, prepend:

```
CHANGE SUMMARY:
- [List what changed between prior draft and this draft]
- [Reference updated DPB rows or new LPB authority]
```

Then output the clean letter.
