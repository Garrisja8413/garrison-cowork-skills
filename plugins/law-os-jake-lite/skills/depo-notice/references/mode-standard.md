# DEPO-NOTICE Reference: Standard Individual Deposition Notice

## Purpose

This reference defines the format and content requirements for standard individual
deposition notices under New Mexico (NMRA 1-030) and federal (FRCP 30) practice.
Use this reference when drafting notices for INDIVIDUAL-PARTY and INDIVIDUAL-NONPARTY
modes. For corporate/organizational depositions under Rule 30(b)(6), see
`mode-corporate.md`.

---

## 1. Notice Components (Required Sections)

Every standard deposition notice must contain the following sections in order:

### Section 1: Notice Header / Identification

```
NOTICE OF DEPOSITION OF [DEPONENT NAME]

PLEASE TAKE NOTICE that [Plaintiff/Defendant] [Party Name], by and through
[his/her/their] undersigned counsel, will take the deposition upon oral
examination of [DEPONENT FULL NAME] pursuant to [Rule cite: NMRA 1-030 or
FRCP 30(a)] at the time, date, and location set forth below.
```

**Required elements:**
1. Full legal name of the deponent
2. Title/role if known (e.g., "treating physician," "eyewitness," "employer")
3. Citation to the governing rule (NMRA 1-030 or FRCP 30(a))
4. Identity of the noticing party
5. Whether the deponent is a party or non-party witness

**Party vs. Non-Party distinction:**
- **Party witness:** Notice to opposing counsel is sufficient to compel attendance.
  No subpoena required. Cite NMRA 1-030(A) or FRCP 30(a)(1).
- **Non-party witness:** A subpoena under NMRA 1-045 or FRCP 45 is required in
  addition to the notice. Flag this in Open Items: `[ACTION REQUIRED: Serve
  subpoena on non-party witness]`.

### Section 2: Scheduling Details

```
DATE:       [Date or [FILL-IN: Date]]
TIME:       [Time or [FILL-IN: Time]]
LOCATION:   [Address or [FILL-IN: Location]]
METHOD:     [In-person / Videoconference via [Platform] / Telephonic]
DURATION:   [Estimated duration]
RECORDING:  [Stenographic / Video / Both stenographic and video]
OFFICER:    [Court reporter / videographer name or [FILL-IN: Officer]]
```

**Scheduling rules:**
- NM (NMRA 1-030): Reasonable notice required. No statutory minimum, but **14 days
  is the customary minimum** in New Mexico state court. Less than 14 days should
  trigger `[DECISION REQUIRED: Notice period is less than 14 days customary]`.
- Federal (FRCP 30(b)(1)): Reasonable written notice. **14 days is standard practice
  in D.N.M.** Expedited notice requires agreement or court order.
- Duration defaults: Federal = 7 hours / 1 day (FRCP 30(d)(1)). NM = no statutory
  limit; state "estimated [X] hours" as a courtesy.
- If scheduling details are not provided, use `[FILL-IN]` placeholders and flag
  in Open Items.

### Section 3: Document Requests (Duces Tecum)

Only include if the user provides `<duces_tecum>` input or if DPB/CFP data
identifies documents the deponent is likely to possess.

```
The deponent is requested to bring to the deposition the following documents
and tangible things, to the extent they are in the deponent's possession,
custody, or control:

1. [Document category] for the period [date range], including but not limited to
   [specific items]. [Relevance: Element/Claim reference]

2. [Document category]...
```

**Duces tecum rules:**
- For **party witnesses**: Duces tecum requests can be included in the notice itself.
  NMRA 1-030(B)(2); FRCP 30(b)(2).
- For **non-party witnesses**: Documents must be requested via **subpoena duces tecum**
  under NMRA 1-045 or FRCP 45(a)(1)(A)(iii). The notice alone is not sufficient.
  Flag: `[ACTION REQUIRED: Serve subpoena duces tecum on non-party]`.
- Each document category should tie to a CFP fact reference or DPB element.
- Include reasonable time period limitations.
- Include format specification if relevant (native electronic, paper, etc.).

### Section 4: Standard Provisions

```
This deposition will be taken before a [court reporter / officer authorized to
administer oaths] and will be recorded by [stenographic / audiovisual / both]
means pursuant to [NMRA 1-030(B)(3) / FRCP 30(b)(3)].

If the deposition is not completed on the date scheduled, it will be continued
from day to day at the same time and place until completed, unless otherwise
agreed by the parties or ordered by the Court.

This deposition is being taken for all purposes permitted under the [New Mexico
Rules of Civil Procedure / Federal Rules of Civil Procedure], including but not
limited to discovery, use at trial, and use in support of or in opposition to
any motion.
```

---

## 2. Mode-Specific Variations

### INDIVIDUAL-PARTY Mode

- No subpoena required
- Notice served on opposing counsel
- Duces tecum may be included in the notice itself
- Standard provisions apply
- No geographic limitation analysis needed

### INDIVIDUAL-NONPARTY Mode

Additional requirements:
- Flag subpoena requirement prominently
- Analyze geographic limitations:
  - **NM (NMRA 1-045):** Statewide subpoena power. Any witness in New Mexico can
    be compelled to attend at a location within the state.
  - **Federal (FRCP 45(c)(1)(A)):** 100-mile limit from where the witness resides,
    is employed, or regularly transacts business. If deponent is outside 100 miles,
    flag: `[DECISION REQUIRED: Deponent may be outside 100-mile subpoena range]`.
- Include witness fee and mileage information:
  - NM: Witness fees per NMSA 1978 Section 38-6-4 ($10/day plus mileage)
  - Federal: Per 28 U.S.C. Section 1821 ($40/day plus travel)
- Service of subpoena must be personal under NMRA 1-045(B)(1) or FRCP 45(b)(1)
- Flag timeline for subpoena service in Open Items

### EXPERT Mode

Additional requirements:
- Reference to expert report (FRCP 26(a)(2)(B) or NMRA 1-026(B))
- Compliance with expert discovery deadlines
- Statement that examination will cover opinions, bases, methodology, qualifications
- If opposing expert: confirm report has been disclosed before noticing deposition
- Duration may exceed standard — experts often require extended examination

---

## 3. Reasonable Notice Period Analysis

When the user provides a proposed deposition date, perform this analysis:

| Condition | Assessment | Action |
|-----------|------------|--------|
| 14+ days from service | Presumptively reasonable | PASS |
| 10-13 days from service | Borderline — may be contested | `[DECISION REQUIRED]` |
| 7-9 days from service | Short notice — likely objection | `[DECISION REQUIRED: Short notice]` |
| < 7 days from service | Unreasonably short absent agreement | `[DECISION REQUIRED: Emergency?]` |
| Unknown service date | Cannot assess | `[FILL-IN: Date of service]` |

**Factors affecting reasonableness:**
- Complexity of the case
- Whether deponent is local or out-of-state
- Whether duces tecum is attached (more time needed)
- Court scheduling order deadlines
- Whether this is a re-noticed deposition
- Agreement of counsel

---

## 4. Non-Party Subpoena Checklist

When the deponent is a non-party, include this checklist in Open Items:

```
NON-PARTY SUBPOENA CHECKLIST:
[ ] Subpoena prepared under [NMRA 1-045 / FRCP 45]
[ ] Witness fees tendered with subpoena ($[amount])
[ ] Personal service on witness
[ ] Service at least [14] days before deposition
[ ] If duces tecum: separate subpoena duces tecum or combined
[ ] Geographic limitation verified (NM: statewide / Fed: 100 miles)
[ ] Notice of subpoena served on all parties (FRCP 45(a)(4) / NMRA 1-045)
```

---

## 5. Recording Method Options

| Method | Rule Cite | Notes |
|--------|-----------|-------|
| Stenographic | NMRA 1-030(B)(3); FRCP 30(b)(3)(A) | Default method. Court reporter required. |
| Video | NMRA 1-030(B)(3); FRCP 30(b)(3)(A) | Must specify in notice. Operator need not be court reporter under FRCP but must in NM practice. |
| Both | NMRA 1-030(B)(3); FRCP 30(b)(3)(A) | Common for key witnesses. Specify both in notice. |
| Telephonic | NMRA 1-030(B)(3); FRCP 30(b)(4) | By stipulation or court order. Less common post-COVID for new depositions. |
| Remote/Video platform | Court order or stipulation | Zoom, Teams, etc. Specify platform and technical requirements. |

**Default if not specified:** Stenographic recording before a certified court reporter.
Include `[DECISION REQUIRED: Recording method]` if user does not specify.

---

## 6. Common [FILL-IN] and [VERIFY] Items

### Standard [FILL-IN] Placeholders

- `[FILL-IN: Date]` — deposition date
- `[FILL-IN: Time]` — deposition start time
- `[FILL-IN: Location]` — deposition location (address)
- `[FILL-IN: Officer]` — court reporter or videographer name
- `[FILL-IN: Duration]` — estimated duration
- `[FILL-IN: Recording Method]` — stenographic, video, or both

### Standard [VERIFY] Items

- `[VERIFY: Deponent address]` — confirm current address for notice/subpoena
- `[VERIFY: Case number]` — confirm case number from SA or user
- `[VERIFY: Court]` — confirm whether state (NM district) or federal (D.N.M.)
- `[VERIFY: Opposing counsel]` — confirm counsel of record for service
- `[VERIFY: Party/non-party status]` — confirm whether subpoena needed

---

## 7. Integration Notes

- **DPB consumption:** Pull deponent identity, role, and relevance from DPB witness
  target entries. The deponent must be traceable to a DPB row.
- **CFP consumption:** Reference CFP facts to establish why this deponent's testimony
  is relevant. CFP Fact# references support duces tecum requests.
- **SA shell:** The notice is BODY-ONLY. SA provides the caption block, certificate
  of service, signature block, and merge tokens. Never include these in output.
- **CAL integration:** Flag the deposition date, subpoena service deadline (if
  non-party), and any response deadlines for calendaring via CAL.
