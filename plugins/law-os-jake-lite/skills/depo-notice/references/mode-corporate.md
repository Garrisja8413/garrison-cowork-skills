# DEPO-NOTICE Reference: Corporate Representative Deposition (Rule 30(b)(6))

## Purpose

This reference defines the format, content, and special requirements for
Rule 30(b)(6) corporate representative deposition notices. A 30(b)(6) notice
directs an organization to designate one or more persons to testify on specified
topics. The notice must describe the topics with "reasonable particularity."

This reference covers both NMRA 1-030(B)(6) (New Mexico state court) and
FRCP 30(b)(6) (federal court, including D.N.M.).

---

## 1. What Makes 30(b)(6) Different

A 30(b)(6) deposition is fundamentally different from an individual deposition:

| Feature | Individual Deposition | 30(b)(6) Deposition |
|---------|----------------------|---------------------|
| **Who testifies** | Named individual | Organization designates witness(es) |
| **Scope** | Witness's personal knowledge | Organization's collective knowledge on designated topics |
| **Preparation duty** | Witness prepares as they see fit | Organization **must** prepare designee(s) to testify on all designated topics |
| **Binding effect** | Testimony of the individual | Testimony binds the organization as a judicial admission |
| **Topic notice** | No topic limitation required | Topics must be described with "reasonable particularity" |
| **Multiple witnesses** | One notice = one witness | Organization may designate multiple witnesses for different topics |

**Key strategic value:** A 30(b)(6) designee's testimony constitutes an admission
by the organization and can be used against the organization at trial without
the need to call the witness. This is more powerful than individual testimony.

---

## 2. Notice Structure for 30(b)(6)

### Section 1: Notice Header

```
NOTICE OF DEPOSITION PURSUANT TO [NMRA 1-030(B)(6) / FRCP 30(b)(6)]
OF [ORGANIZATION NAME]

PLEASE TAKE NOTICE that [Plaintiff/Defendant] [Party Name], by and through
[his/her/their] undersigned counsel, will take the deposition upon oral
examination of [ORGANIZATION FULL NAME], pursuant to [NMRA 1-030(B)(6) /
FRCP 30(b)(6)], by its designated representative(s), on the topics set
forth herein at the time, date, and location specified below.

[ORGANIZATION NAME] is directed to designate one or more officers, directors,
managing agents, or other persons who consent to testify on its behalf, and
to prepare such designated person(s) to testify as to matters known or
reasonably available to the organization regarding each topic described below.
```

### Section 2: Scheduling Details

Same as standard notice (see `mode-standard.md`), with these additions:
- Duration may need to be longer due to multiple topics
- Consider whether multiple sessions may be needed
- If organization is out-of-state, address logistical considerations

### Section 3: Topic Designations

This is the critical section unique to 30(b)(6) notices.

```
TOPICS FOR EXAMINATION

The designated representative(s) shall be prepared to testify regarding
the following topics:

TOPIC 1: [Topic description with reasonable particularity]
Including but not limited to [specific sub-topics, time periods, and scope].
[Element/Claim reference: e.g., "relates to Plaintiff's negligence claim,
duty element"]

TOPIC 2: [Topic description with reasonable particularity]
...
```

### Section 4: Duces Tecum (if applicable)

```
DOCUMENTS TO PRODUCE

The designated representative(s) shall bring to the deposition the following
documents and tangible things in [ORGANIZATION NAME]'s possession, custody,
or control:

1. [Document category related to Topic 1]
2. [Document category related to Topic 2]
...
```

### Section 5: Standard Provisions

Same as standard notice, plus:

```
[ORGANIZATION NAME] is further notified that if it fails to designate a
representative to testify on any topic set forth above, or if the designated
representative is not adequately prepared to testify on any topic, the
noticing party reserves the right to seek sanctions pursuant to [NMRA 1-037 /
FRCP 37(d)] and/or to compel further testimony.
```

---

## 3. "Reasonable Particularity" Standard

### What Constitutes Reasonable Particularity

The topics must be described with enough specificity that the organization can:
1. Identify the right person(s) to designate
2. Prepare the designee(s) to testify competently
3. Understand the scope and boundaries of each topic

### Examples of Sufficient Topic Descriptions

**Good (sufficiently particular):**
```
TOPIC 3: The policies and procedures in effect at [Location] on [Date]
regarding [specific activity], including the training provided to employees
on such policies, the method of communicating policy changes, and any
modifications to such policies made within 12 months before or after [Date].
```

**Good:**
```
TOPIC 5: All communications between [Organization] and [Third Party]
regarding [Subject] during the period from [Start Date] to [End Date],
including the identity of persons who participated in such communications
and the substance of each communication.
```

### Examples of Insufficient Topic Descriptions

**Bad (too broad):**
```
TOPIC: Everything the company knows about the accident.
TOPIC: All of the company's safety policies.
TOPIC: The company's knowledge of plaintiff's claims.
```

**Bad (unlimited time scope):**
```
TOPIC: All hiring practices since the company's founding.
```

### Remedies for Overbreadth Objections

If topics risk overbreadth objections, apply these constraints:
1. **Time period:** Limit to a reasonable window (e.g., "within 2 years before and
   1 year after the incident")
2. **Geographic scope:** Limit to relevant location(s)
3. **Subject matter:** Narrow to specific activities, products, or departments
4. **Persons involved:** Identify specific roles or departments

---

## 4. Topic-to-Element Mapping

Every 30(b)(6) topic must serve a litigation purpose traceable to a legal element
or factual issue. Map topics as follows:

| Topic # | Topic Description | Element(s) Supported | CFP Fact Refs | Priority |
|---------|-------------------|---------------------|---------------|----------|
| 1 | [Topic] | [Element_ID from PCM/LPB] | [Fact#s] | HIGH/MED/LOW |
| 2 | [Topic] | [Element_ID] | [Fact#s] | HIGH/MED/LOW |

**Drafting instruction:** When the user provides `<topics_30b6>` input, map each
topic to the elements it supports. If a topic cannot be mapped to any element,
flag: `[DECISION REQUIRED: Topic [N] does not map to a specific element. Include?]`

---

## 5. Common 30(b)(6) Topic Categories for Personal Injury Cases

Use these as a starting framework when the user requests 30(b)(6) topics.
Each must be tailored to the specific case facts from CFP/DPB.

### Corporate Defendant Topics

1. **Organizational structure** — chain of command, reporting, relevant departments
2. **Policies and procedures** — safety policies, operational procedures, training
3. **Incident investigation** — internal investigation, findings, reports
4. **Prior incidents** — prior similar incidents at same location or involving same product/activity
5. **Training programs** — employee training on relevant safety/operational procedures
6. **Communications** — internal communications about the incident or relevant conditions
7. **Remedial measures** — post-incident changes (note: admissibility under NMRA 11-407)
8. **Insurance** — existence and terms of insurance coverage (NMRA 11-411 limits)
9. **Document retention** — policies and practices regarding relevant documents
10. **Regulatory compliance** — compliance with applicable regulations and standards

### Insurance Company Topics (UIM/UM cases)

1. **Claims handling** — processing of the specific claim, timeline, decisions
2. **Valuation methodology** — how the claim was valued, factors considered
3. **Policies and procedures** — claims handling policies, adjustment guidelines
4. **Communications** — all communications with insured and claimant
5. **Reserves** — reserve amounts set and changes (discoverable in NM in first-party claims)

### Employer Topics (Workers' Comp / Employment)

1. **Employment records** — hiring, training, supervision of relevant employees
2. **Safety programs** — OSHA compliance, safety committees, incident reporting
3. **Workplace conditions** — conditions at time of incident
4. **Prior complaints** — prior complaints about relevant conditions or personnel

---

## 6. Designation Failures and Sanctions

### Inadequate Preparation

If the designated witness is not adequately prepared, the noticing party may:
1. Seek a court order compelling a properly prepared witness (NMRA 1-037 / FRCP 37(a))
2. Seek sanctions including attorney's fees for the wasted deposition
3. Request the court treat the inadequate designation as a failure to appear

**NM case law:** *Hamaatsa, Inc. v. Pueblo of San Felipe*, 2017-NMCA-007
(organization must prepare designee with information reasonably available,
not just the designee's personal knowledge).

**Federal case law:** *Brazos River Auth. v. GE Ionics, Inc.*, 469 F.3d 416
(5th Cir. 2006) (duty to prepare designee goes beyond personal knowledge to
information reasonably available to the organization).

### Failure to Designate

If the organization fails to designate any witness:
- Treated as failure to appear under NMRA 1-037(D) / FRCP 37(d)
- Sanctions may include: facts deemed established, claims/defenses stricken,
  default judgment, attorney's fees

### Over-Designation

Organizations sometimes attempt to over-designate (naming many witnesses to
fragment topics and increase cost). The noticing party may:
- Object and seek court intervention
- Argue topics should be consolidated to fewer witnesses

---

## 7. Strategic Notes for 30(b)(6) Drafting

### Topic Breadth vs. Precision Tradeoffs

- **Broader topics:** More likely to catch organization off-guard, but more
  vulnerable to overbreadth objections and motions for protective order
- **Narrower topics:** Harder to object to, but organization may exploit gaps
  between topics to avoid answering questions

**Recommended approach:** Draft topics with moderate breadth but include
specific sub-topics. Use "including but not limited to" language to preserve
scope while providing specificity.

### Number of Topics

- No rule limits the number of topics
- Practically, 10-20 well-drafted topics is standard
- Excessive topics (30+) may invite objection as unduly burdensome
- Each topic should be distinct — avoid overlap that inflates the count

### Interaction with Individual Depositions

- A 30(b)(6) deposition does not "use up" a deposition of the designated
  individual in their personal capacity
- Under FRCP, both the 30(b)(6) deposition (organization capacity) and an
  individual deposition (personal capacity) are permitted
- In NM state court, same principle applies
- Strategic consideration: Take the 30(b)(6) first, then depose the designee
  individually to explore personal knowledge beyond the organization's position

---

## 8. NM-Specific 30(b)(6) Considerations

### NMRA 1-030(B)(6) Text

The New Mexico rule mirrors the federal rule. The organization must designate
persons to testify on its behalf about "information known or reasonably
available to the organization."

### Key NM Distinctions

1. **No deposition limit:** NM has no 10-deposition limit (unlike FRCP 30(a)(2)(A)(i)).
   Multiple 30(b)(6) depositions of the same organization on different topics are
   permissible without leave.
2. **No duration limit:** NM has no 7-hour presumptive limit. However,
   unreasonably long depositions may draw a protective order.
3. **Statewide subpoena:** If the corporate deponent is in NM, statewide subpoena
   power applies. No 100-mile limitation.
4. **Discovery scope:** NM follows proportionality principles under NMRA 1-026(B),
   similar to federal practice. Topics must be proportional to case needs.

---

## 9. Merge Token and Shell Compliance

The 30(b)(6) notice is BODY-ONLY. The SA shell provides:
- Caption (court, case number, parties)
- Certificate of service
- Signature block
- Any court-specific formatting

**Do not include** in the BODY-ONLY output:
- Case caption
- Court name/address
- Attorney signature block
- Certificate of service
- Page numbers or headers/footers

**Merge tokens:** If SA shell contains merge tokens (e.g., `<<CaseNumber>>`,
`<<DefendantName>>`), preserve them exactly. Do not modify or invent tokens.
