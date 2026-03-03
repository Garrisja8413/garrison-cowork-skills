---
name: depo-notice
display_name: "Deposition Notice Drafter"
description: >-
  Deposition Notice Drafter (DEPO-NOTICE) — Pack-First, Direct-Output drafting
  skill for FRCP 30(a) / NMRA 1-030 deposition notices and subpoenas duces
  tecum. Consumes DPB witness targets, case metadata, and scheduling
  constraints to produce BODY-ONLY deposition notice text with scheduling
  details, document requests, and Rule 30(b)(6) topic designations where
  applicable. TRIGGERS: Use this skill whenever the user mentions "deposition
  notice", "DEPO-NOTICE", "notice of deposition", "schedule deposition",
  "30(b)(6)", "FRCP 30", "NMRA 1-030", "depo notice", "subpoena duces tecum",
  "SDT for deposition", "notice to take deposition", "corporate deposition",
  "Rule 30 notice", "deponent notice", or wants to draft a notice scheduling a
  deposition. Do NOT use for deposition outlines (use depo-outline). Do NOT
  use for deposition transcript analysis (use depo-index) (v1.0)
version: "1.0"
category: deposition
pack_consumes:
  - DPB
  - CFP
pack_produces:
  - BODY-ONLY deposition notice
checkpoints: 0
author: "Parnall & Adams"
license: Proprietary
---

## Pack Dependencies
**Consumes:**
- DPB
- CFP

# DEPO-NOTICE (Deposition Notice Drafter) — v1.0

## What This Skill Does

Drafts the BODY-ONLY text of a deposition notice under FRCP 30(a) / NMRA 1-030.
The notice identifies the deponent, specifies date/time/location, lists document
requests (duces tecum), and -- for Rule 30(b)(6) corporate depositions -- defines
the topic designations with reasonable particularity.

This skill handles the procedural logistics of scheduling depositions. The
substantive preparation (what to ask) belongs to the DEPO-OUTLINE skill.

## Architecture: Pack-First, Direct-Output

```
DPB (witness targets) ──────┐
                              ├── DEPO-NOTICE Skill ──> BODY-ONLY Notice
Case Metadata (SA/intake) ───┤                          + Scheduling Details
CFP (relevant facts) ────────┘                          + Cite Table + Gates
```

The DEPO-NOTICE skill is a **DRAFTING** skill. It does not modify Packs.
It consumes case metadata and DPB witness information to produce properly
formatted deposition notices.

## Hard Rules

1. **Pack-First:** Deponent identity and relevance must trace to DPB witness
   targets or CFP fact references. Do not notice depositions of unknown persons.
2. **Direct-Output:** SA generates the Word shell (caption, certificate of service,
   signature block, merge tokens). This skill provides BODY-ONLY notice text.
3. **BODY-ONLY output:** No caption, no certificate of service, no signature block.
   Those come from the SA shell.
4. **Never invent:** No invented deponent names, addresses, dates, times,
   locations, case numbers, or rule citations. Missing info -> `[VERIFY]` or
   `[FILL-IN: description]`.
5. **Preserve merge tokens exactly.** Never modify or invent merge tokens.
6. **Scheduling placeholders:** Use `[FILL-IN: Date]`, `[FILL-IN: Time]`,
   `[FILL-IN: Location]` when scheduling details are not provided. Flag
   these in Open Items.
7. **Reasonable notice period:** NM requires reasonable notice (no statutory
   minimum, but 14 days is customary). Federal requires reasonable notice.
   Flag if proposed date may violate reasonable notice. `[DECISION REQUIRED]`.
8. **Token fail-safe:** Deposition notices are typically short enough for
   single-part output. If 30(b)(6) topic designations are extensive,
   chunk: Part 1 = notice, Part 2 = topic designations + duces tecum list.

## Required Inputs

### Always Required

```xml
<evidence_layer>
[DPB witness target information:
  - Deponent name, title/role, employer/affiliation
  - Relevance to case (which elements/claims)
  - Party vs. non-party status
  - Prior discovery interactions (if any)]
[Case metadata: case number, court, parties, counsel]
</evidence_layer>
```

### Optional (Strengthens Notice)

- `<scheduling_info>` -- proposed date, time, location, estimated duration
- `<duces_tecum>` -- list of documents/categories to request at deposition
- `<topics_30b6>` -- Rule 30(b)(6) topic designations for corporate deponents
- `<legal_layer>` -- LPB authority on deposition scope or limitations
- CFP facts identifying what testimony is needed from this deponent

### If Inputs Are Missing

If no deponent identified: **"Identify the deponent (name, role, party/non-party status) and their relevance to the case."**
If no case metadata: **"Provide case number, court, party names, and opposing counsel contact information."**
If no scheduling details: Notice will use `[FILL-IN]` placeholders for date, time, and location.

## Notice Structure

### Section 1: Notice Header

- Identification of deposition under applicable rule (FRCP 30(a) or NMRA 1-030)
- Name and address of deponent
- Party or non-party designation (non-party requires subpoena)

### Section 2: Scheduling Details

- Date and time (or `[FILL-IN]`)
- Location / method (in-person address or videoconference platform)
- Estimated duration (default: 7 hours per FRCP 30(d)(1); NM has no default limit)
- Recording method: stenographic, video, or both

### Section 3: Document Requests (Duces Tecum)

- If duces tecum: numbered list of document categories to produce at deposition
- Each category tied to relevance (element or claim reference from DPB/CFP)
- Time period specifications
- Format specifications (native, paper, etc.)

### Section 4: Rule 30(b)(6) Topic Designations (if applicable)

- For corporate/organizational deponents only
- Numbered list of topics described with "reasonable particularity"
- Each topic tied to claims/elements
- Instruction that organization must designate knowledgeable witness(es)

### Section 5: Standard Provisions

- Statement re: recording method and officer
- Continuation provisions (if deposition cannot be completed)
- Applicable rules regarding objections and conduct
- Cross-notice provisions (if applicable)

## Output Contract (Required Order)

1. **BODY-ONLY Deposition Notice** (Sections 1-5)
2. **---** (divider)
3. **Cite Table**

| # | Assertion | Source (DPB witness ref, CFP Fact#, Rule cite) | Confidence | Notes |
|---|-----------|------------------------------------------------|------------|-------|

4. **Gate Results**
   - Traceability: [PASS/FAIL] -- deponent identity from DPB or CFP
   - Rule Compliance: [PASS/FAIL] -- notice conforms to FRCP 30 / NMRA 1-030
   - Scheduling Gate: [PASS/FAIL] -- reasonable notice period, no conflicts noted
   - Non-Party Subpoena: [PASS/FAIL] -- if non-party, subpoena requirement flagged
   - Merge-token integrity: [PASS/FAIL]

5. **Next Requests** -- scheduling details, opposing counsel availability,
   court reporter booking, subpoena service (if non-party)

6. **Open Items**
   - `[FILL-IN]` items (date, time, location, duration)
   - `[VERIFY]` items (deponent address, case number, rule cites)
   - `[DECISION REQUIRED]` items (recording method, duration, duces tecum scope)

## Modes

| Mode | Input | Output |
|------|-------|--------|
| **INDIVIDUAL-PARTY** | Deponent info (party witness) | Standard deposition notice |
| **INDIVIDUAL-NONPARTY** | Deponent info (non-party) | Deposition notice + subpoena flag |
| **CORPORATE-30b6** | Organization + topic list | 30(b)(6) notice with topic designations |
| **EXPERT** | Expert witness info + report | Expert deposition notice with report reference |

### Mode: INDIVIDUAL-PARTY (default)

Standard notice for a party witness. No subpoena required -- notice to counsel
is sufficient. Includes optional duces tecum for documents in witness's
possession or control.

### Mode: INDIVIDUAL-NONPARTY

Notice for a non-party witness. Flags that a subpoena is required for
attendance and a separate subpoena duces tecum for documents. Includes
geographic limitation analysis (100 miles under FRCP 45; NM statewide).

### Mode: CORPORATE-30b6

Rule 30(b)(6) notice requiring the organization to designate one or more
witnesses on specified topics. Topic designations must be described with
"reasonable particularity." The notice must instruct the organization to
prepare designated witnesses to testify on each topic.

### Mode: EXPERT

Notice for expert witness deposition. References the expert's report
(FRCP 26(a)(2)(B) / NMRA 1-026(B)) and may include specific areas of
examination. Timing must comply with expert discovery deadlines.

## Jurisdiction-Specific Rules

### New Mexico (NMRA 1-030)

- Reasonable notice required (no specific minimum; 14 days customary)
- No presumptive duration limit (unlike federal 7-hour rule)
- Statewide subpoena power for non-party witnesses
- Deposition may be taken before any person authorized to administer oaths
- Recording by stenographic or other means as specified in notice

### Federal (FRCP 30)

- Reasonable written notice required (FRCP 30(b)(1))
- 7-hour / 1-day duration limit (FRCP 30(d)(1)) unless stipulated or ordered
- 10-deposition limit per side (FRCP 30(a)(2)(A)(i)) without leave
- 100-mile geographic limit for subpoena (FRCP 45(c)(1)(A))
- Leave of court required if: deponent already deposed, >10 depositions,
  before FRCP 26(d) conference, or deponent in prison (FRCP 30(a)(2))

## Integration Points

| System | How DEPO-NOTICE Connects |
|--------|-------------------------|
| **DPB** | DEPO-NOTICE consumes DPB witness targets and prior discovery interaction history. Deponent relevance traced to DPB rows. |
| **CFP** | DEPO-NOTICE references CFP facts to establish relevance of deponent and to frame duces tecum requests. |
| **DEPO-OUTLINE** | After notice is served, DEPO-OUTLINE creates the substantive examination outline for the noticed deposition. |
| **SDC** | SDC TELEGRAPH mode can review the notice and duces tecum to assess what the notice reveals about litigation strategy. |
| **SA** | Direct-Output: SA provides caption/COS shell. Save per Save Map: Discovery -> Deposition Notices. Calendar deposition date to SA. |
| **CAL** | Deposition date, response deadlines, and subpoena service deadlines feed to CAL for calendaring. |

## Reference Files

- `references/mode-standard.md` -- standard individual deposition notice format, NM rules
- `references/mode-corporate.md` -- 30(b)(6) corporate representative designation requirements
- `references/nmra-1-030-rules.md` -- NMRA 1-030 deposition rules, notice requirements, timing
- `references/frcp-30-rules.md` -- Federal Rule 30 requirements for cases in D.N.M.
- `references/output-format.md` -- output contract, BODY-ONLY format
