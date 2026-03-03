# DEPO-OUTLINE Reference: Element-to-Deposition Mapping

## Purpose

This reference defines how to map PCM (Proof of Claims Matrix) elements to
deposition topics and questions. The element mapping ensures that every
deposition topic serves a litigation purpose, that every required element
is addressed, and that examination priority follows proof need.

---

## 1. The Element Mapping Process

### Overview

The element mapping process transforms abstract legal elements into concrete
deposition questions. The flow is:

```
LPB (legal elements)
  └── PCM (element-to-evidence mapping + proof status)
        └── DEPO-OUTLINE (element-to-question mapping)
              └── Topic blocks with element tags
```

### Step-by-Step Process

**Step 1: Extract Elements from LPB/PCM**

Pull all elements relevant to this witness from the PCM. Each element has:
- `Element_ID` (e.g., NEG-DUTY-001)
- `Claim` (e.g., Negligence)
- `Element` (e.g., Duty of Care)
- `Proof Status` (UNPROVEN, FACTS-ONLY, PROVEN, CONCEDED)
- `Evidence References` (CFP Fact#, documents, witness IDs)

**Step 2: Filter by Witness Relevance**

Not every element involves every witness. Filter to elements where:
- This witness is listed as a source in PCM evidence references
- This witness's knowledge (from DPB/CFP) relates to the element
- This witness authored or received relevant documents

**Step 3: Prioritize by Proof Need**

| PCM Status | Priority | Outline Treatment |
|------------|----------|-------------------|
| UNPROVEN | P1 — CRITICAL | Extensive topic block. Multiple question approaches. Must establish testimony to fill proof gap. |
| FACTS-ONLY | P2 — HIGH | Focused topic block. Develop testimony to strengthen factual record beyond documents alone. |
| PROVEN | P3 — MEDIUM | Brief topic block. Lock-down existing proof. Confirm and commit witness. |
| CONCEDED | P4 — LOW | Single question or brief confirmation. Do not over-examine conceded elements. |

**Step 4: Map Each Element to Topic(s)**

One element may require multiple topics. One topic may serve multiple elements.

Example mapping:

| Element_ID | Element | Topics Generated |
|-----------|---------|-----------------|
| NEG-DUTY-001 | Duty of Care | TOPIC 2: Defendant's role and responsibilities; TOPIC 4: Industry standards |
| NEG-BREACH-001 | Breach | TOPIC 5: Actions taken (or not taken) on date of incident |
| NEG-CAUSE-001 | Causation | TOPIC 6: Sequence of events; TOPIC 7: Mechanism of injury |
| DAM-MED-001 | Medical Damages | TOPIC 8: Treatment history; TOPIC 9: Current symptoms |

**Step 5: Generate Question Areas per Topic**

For each topic, generate question areas at each funnel level (see methodology.md):
- Level 1 (Background): Open questions about the general subject
- Level 2 (Narrowing): Focused questions about specifics
- Level 3 (Key): Targeted questions establishing critical facts
- Level 4 (Lock-down): Commitment questions for trial use

**Step 6: Cross-Reference Documents**

For each topic, identify documents from CFP/DPB that:
- Corroborate expected testimony (use on direct)
- Contradict expected testimony (use for impeachment on cross)
- Need authentication by this witness
- Should be marked as exhibits

---

## 2. Element Mapping Table Format

The element mapping table appears in Part B of the outline (Examination Objectives).

### Standard Format

```markdown
## Part B: Examination Objectives (Element Map)

| # | Objective | Element_ID(s) | Claim | Priority | PCM Status | Witness Relevance |
|---|-----------|---------------|-------|----------|------------|-------------------|
| 1 | Establish duty of care | NEG-DUTY-001 | Negligence | P1-CRITICAL | UNPROVEN | Defendant's direct supervisor |
| 2 | Lock in timeline of events | NEG-CAUSE-001 | Negligence | P2-HIGH | FACTS-ONLY | Eyewitness to incident |
| 3 | Confirm prior complaints | NEG-BREACH-002 | Negligence | P2-HIGH | FACTS-ONLY | Received complaints |
| 4 | Establish treatment necessity | DAM-MED-001 | Damages | P3-MEDIUM | PROVEN | Treating physician |
```

### Column Definitions

| Column | Content | Source |
|--------|---------|--------|
| **#** | Sequential number | Auto-generated |
| **Objective** | What we need this witness to establish or concede | Derived from element + witness knowledge |
| **Element_ID(s)** | PCM Element ID(s) this objective supports | PCM |
| **Claim** | The cause of action | LPB |
| **Priority** | P1-CRITICAL through P4-LOW | Derived from PCM status |
| **PCM Status** | UNPROVEN / FACTS-ONLY / PROVEN / CONCEDED | PCM |
| **Witness Relevance** | Why this witness can address this element | CFP/DPB |

---

## 3. Common Element Categories for NM Personal Injury

### Negligence Elements (UJI 13-1601 to 13-1604)

| Element | Typical Deposition Topics | Typical Witnesses |
|---------|---------------------------|-------------------|
| **Duty** | Relationship, role, responsibilities, industry standards, applicable regulations | Defendant, defendant's supervisor, corporate designee, industry expert |
| **Breach** | What was done or not done, deviations from standard, failures to act | Defendant, eyewitnesses, inspectors, co-workers |
| **Cause-in-Fact** | Timeline, sequence, mechanism, but-for analysis | Eyewitnesses, investigators, medical experts |
| **Proximate Cause** | Foreseeability, intervening causes, scope of risk | Expert witnesses, defendant, investigators |
| **Damages** | Injuries, treatment, impact on life, economic losses | Plaintiff, treating physicians, employers, family members |

### Comparative Fault (NMSA 1978 Section 41-3A-1)

NM is a **pure comparative fault** jurisdiction. Consider:
- Plaintiff's own conduct (potential reduction)
- Apportionment among multiple defendants
- Non-party fault allocation (NMSA Section 41-3A-1(B))

**Deposition implication:** When deposing the defendant, establish that they
are pointing to specific persons (or the plaintiff) for comparative fault.
Lock them down on their allocation theory.

### Vicarious Liability / Respondeat Superior

| Element | Topics | Questions |
|---------|--------|-----------|
| Employment relationship | Hiring, training, supervision | "Was [employee] acting within the scope of employment?" |
| Scope of employment | Job duties, authorization, control | "What were [employee's] assigned duties on [date]?" |
| Course of employment | Time, place, purpose of activity | "Was [employee] performing work tasks at the time?" |

### Premises Liability (UJI 13-1309 to 13-1316)

| Element | Topics | Key Questions |
|---------|--------|---------------|
| Ownership/control | Property records, management | "Who is responsible for maintaining [area]?" |
| Dangerous condition | Inspection records, complaints | "Were you aware of [condition] before [date]?" |
| Notice | Reports, complaints, inspections | "When was [area] last inspected?" |
| Failure to act | Policies, responses, remediation | "What was done to address [condition]?" |

---

## 4. Handling Multiple Claims Against the Same Witness

When a witness is relevant to multiple claims, organize the element map to
group related elements and minimize repetitive questioning.

### Grouping Strategy

```
GROUP A: LIABILITY (all negligence elements)
  - NEG-DUTY-001
  - NEG-BREACH-001
  - NEG-BREACH-002
  - NEG-CAUSE-001

GROUP B: DAMAGES (all damage elements)
  - DAM-MED-001
  - DAM-ECON-001
  - DAM-NONECON-001

GROUP C: AFFIRMATIVE DEFENSES (if applicable)
  - COMPFAULT-001
  - ASSUMPTION-001
```

### Cross-Cutting Topics

Some topics serve multiple elements simultaneously:

```
TOPIC 3: Timeline of Events
  Serves: NEG-BREACH-001 (what defendant did/didn't do)
          NEG-CAUSE-001 (sequence establishing causation)
          COMPFAULT-001 (plaintiff's actions in timeline)
  Priority: P1-CRITICAL (highest of served elements)
```

When a topic serves multiple elements, assign the **highest** priority among
the elements it serves.

---

## 5. Gap Analysis Integration

### Identifying Proof Gaps Before the Deposition

Use the element map to identify gaps:

1. **Missing elements:** Elements with no witness assigned -> flag for
   attorney review: `[DECISION REQUIRED: No witness identified for [Element_ID]]`
2. **Single-source elements:** Elements supported only by this witness ->
   flag as critical: must extract testimony
3. **Document-only elements:** Elements supported only by documents ->
   this deposition can add testimony to strengthen the record

### Post-Deposition Gap Update

After the deposition, the element map feeds back into PCM:
- Testimony that established an element -> PCM status update candidate
- Testimony that failed to establish an element -> PCM gap remains
- Unexpected testimony -> possible new elements or claims

---

## 6. Witness-Type Element Mapping Templates

### Party Defendant (Cross Mode)

Focus on: Duty, Breach, Notice, Knowledge, Control

```
ELEMENT MAP TEMPLATE — PARTY DEFENDANT:
1. Background/Qualifications → establishes competence for duty testimony
2. Duty of Care → NEG-DUTY elements (role, responsibilities, standards)
3. Knowledge/Notice → premises: NOTICE elements; products: DEFECT-KNOWLEDGE
4. Actions/Inactions → NEG-BREACH elements (what was done or omitted)
5. Timeline → NEG-CAUSE elements (sequence establishing causation)
6. Post-Incident → remedial measures, investigation, admissions
7. Comparative Fault Defense → lock down their allocation theory
```

### Treating Physician (Direct Mode)

Focus on: Causation, Damages, Prognosis

```
ELEMENT MAP TEMPLATE — TREATING PHYSICIAN:
1. Qualifications → establish expertise for opinion testimony
2. History/Presentation → patient's complaints and presentation
3. Diagnosis → NEG-CAUSE elements (injury identification)
4. Causation Opinion → "reasonable degree of medical probability"
5. Treatment → DAM-MED elements (necessity, appropriateness)
6. Prognosis → DAM-MED elements (future treatment, permanency)
7. Records → authenticate medical records for trial
```

### Eyewitness (Direct or Cross Mode)

Focus on: Breach facts, Timeline, Causation

```
ELEMENT MAP TEMPLATE — EYEWITNESS:
1. Presence/Observation → where they were, what they could see
2. Pre-Incident Observations → conditions, behavior, warnings
3. Incident Account → what happened (NEG-BREACH + NEG-CAUSE)
4. Post-Incident → what they did, what they saw after
5. Prior Knowledge → any prior awareness of conditions (NOTICE)
```

### Corporate Designee (30(b)(6) Mode)

Focus on: Organizational knowledge on noticed topics

```
ELEMENT MAP TEMPLATE — 30(b)(6) DESIGNEE:
[Mapped to noticed topics, each tied to elements]
Topic 1 → Element_ID(s)
Topic 2 → Element_ID(s)
...
For each topic:
  1. Preparation assessment
  2. Organizational knowledge on topic
  3. Binding admissions
  4. Documents reviewed/relied upon
  5. Other persons with knowledge
```

---

## 7. Element Coverage Verification

### Pre-Output Gate Check

Before finalizing the outline, verify element coverage:

```
ELEMENT COVERAGE CHECKLIST:
[ ] All UNPROVEN elements have at least one topic block
[ ] All FACTS-ONLY elements have at least one topic block
[ ] All PROVEN elements have at least a lock-down question
[ ] No topic blocks exist without an element connection
[ ] Priority assignments match PCM status
[ ] Documents identified for all document-dependent topics
[ ] Impeachment opportunities tied to specific elements
[ ] Cross-element topics identified and consolidated
[ ] Gap analysis completed — missing elements flagged
```

### Coverage Gate Result

The Element Coverage gate in Gate Results evaluates:

- **PASS:** All required elements from PCM are addressed in the outline
  with appropriate priority
- **FAIL:** One or more elements are not addressed. List missing Element_IDs.
  This indicates either the wrong witness or missing input data.

---

## 8. Working with Incomplete PCM Data

If the PCM is not available or incomplete:

### No PCM Available

- Organize outline by topic area rather than by element
- Use LPB elements directly (if available) without proof status
- All elements default to P2-HIGH priority
- Flag: `[DECISION REQUIRED: Without PCM, element priority cannot be assessed.
  All elements treated as HIGH priority.]`

### Partial PCM

- Map available elements normally
- For unmapped elements, use LPB elements with default P2-HIGH priority
- Flag gaps: `[VERIFY: PCM does not include [Element]. Assumed HIGH priority.]`

### No LPB or PCM

- Organize by general topic areas (liability, causation, damages)
- Flag: `[DECISION REQUIRED: Without LPB/PCM, outline is organized by topic
  only. Run LPB and PCM skills for element-driven organization.]`
- The outline will still be useful but will not have element traceability
