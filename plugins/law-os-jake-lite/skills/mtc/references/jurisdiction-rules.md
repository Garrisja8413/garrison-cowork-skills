# Jurisdiction Rules — MTC Reference

## New Mexico (State Court — NMRA 1-037)

### Motion to Compel Standard
- **Rule:** NMRA 1-037(A) — party may apply for order compelling discovery
- **Prerequisite:** Good faith effort to resolve without court intervention
- **No specific certification form** — but courts expect documented effort

### Scope of Discovery
- **Rule:** NMRA 1-026(B) — relevant to claims or defenses
- **Standard:** Liberal construction; relevance interpreted broadly
- **Proportionality:** Less formalized than federal; courts apply reasonableness

### Burden Allocation
- Requesting party shows relevance (usually met if request is facially relevant)
- Objecting party bears burden to justify objection with specifics

### Objection Standards
- Must state specific grounds (NMRA 1-033(B) for ROGs; 1-034(B) for RFPs)
- General objections = insufficient
- Untimely objection = waiver
- "Subject to and without waiving" objections disfavored

### Sanctions / Expenses
- **NMRA 1-037(A)(4):** Court may award reasonable expenses including fees
- Discretionary (not mandatory like federal)

### RFA-Specific (NMRA 1-036)
- Failure to timely respond = deemed admitted
- Motion to determine sufficiency of answers/objections

---

## Federal — D.N.M. (FRCP 37(a) + Local Rules)

### Motion to Compel Standard
- **Rule:** FRCP 37(a)(3)(B) — motion to compel answers, production, etc.
- **Prerequisite:** Good faith conference **certification required**
- **D.N.M. LR-Civ 7.1(a):** "Movant must describe in the motion the
  efforts taken to resolve the matter"

### Good Faith Certification
**Required language (include in Introduction or as separate section):**
```
Pursuant to D.N.M. LR-Civ 7.1(a), undersigned counsel certifies that
a good faith effort has been made to resolve the matters raised in this
motion. [Describe: (1) GFL date, (2) response/lack of response,
(3) conference attempts, (4) outcome.]
```

### Scope of Discovery
- **Rule:** FRCP 26(b)(1) — relevant + proportional to the needs of the case
- **Proportionality factors** (must address when burden objection raised):
  1. Importance of issues at stake in the action
  2. Amount in controversy
  3. Parties' relative access to relevant information
  4. Parties' resources
  5. Importance of discovery in resolving the issues
  6. Whether burden or expense outweighs likely benefit

### Burden Allocation
- Requesting party: relevance (facial)
- Objecting party: undue burden, privilege, or other specific ground
- **Key:** Burden shifts to objecting party once facial relevance shown

### Objection Standards
- **FRCP 33(b)(4):** Grounds stated with specificity
- **FRCP 34(b)(2)(B):** Must state whether materials withheld on basis of objection
- **FRCP 34(b)(2)(C):** Objection must state whether responsive materials exist
- General objections = waiver in 10th Circuit
- Untimely objection = waiver unless good cause

### Sanctions / Expenses
- **FRCP 37(a)(5)(A):** If motion granted, court **must** award reasonable expenses
  including attorney's fees **unless:**
  (i) movant did not make good faith effort to resolve,
  (ii) opposing party's nondisclosure was substantially justified, or
  (iii) other circumstances make award unjust
- **FRCP 37(a)(5)(B):** If motion denied, court **must** award respondent's expenses
  unless motion was substantially justified
- **FRCP 37(a)(5)(C):** If granted in part/denied in part, court may apportion

### RFA-Specific (FRCP 36)
- Failure to timely respond = deemed admitted
- FRCP 36(a)(6) — motion to determine sufficiency
- FRCP 37(c)(2) — costs of proving matters that should have been admitted

---

## D.N.M. Judge-Specific Considerations

If a `<behavioral_layer>` (judge profile) is available, adjust:
- **Brief length preferences** — some judges prefer concise motions
- **Hearing preferences** — some judges decide on the papers; others want oral argument
- **Discovery philosophy** — broad vs. narrow discovery approach
- **Formatting preferences** — section headers, point headings, etc.

If no judge profile is available, draft in a neutral, formal style and
note in Open Items: `[DECISION REQUIRED] No judge profile provided —
consider adjusting tone/length for assigned judge.`

---

## Jurisdiction Detection

From DPB Set_Metadata `Jurisdiction` field:
- `NM` → New Mexico state court rules (NMRA 1-037)
- `FED` or `D.N.M.` → Federal rules (FRCP 37) + D.N.M. local rules

If mixed jurisdictions in the same DPB packet → separate motions required.
Flag as `[DECISION REQUIRED]`.
