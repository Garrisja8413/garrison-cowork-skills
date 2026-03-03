# Deliverables — ADR Reference

Read this file for output schemas across all ADR modes.

---

## Deliverable 1: Defect Matrix

The core analytical output. Every ADR run produces this table.

### Schema

| Column | Type | Description |
|--------|------|-------------|
| `Row#` | Integer | Sequential row number |
| `Complaint_Para` | String | Complaint ¶ number (e.g., "¶12", "¶14(a)") |
| `Answer_Para` | String | Corresponding Answer ¶ (or "NONE" if silent) |
| `Response_Type` | Code | From taxonomy: ADMIT, DENY, ADMIT-PART, LKI, BLANKET, EVASIVE, REFER, LEGAL-CONCLUSION, NO-RESPONSE, MIXED |
| `Defect_Flag` | Code | From diagnostic: ADMIT-DEFAULT, BLANKET-DENIAL, LKI-IMPROPER, EVASIVE, PARTIAL-ADMIT-NEEDED, INTERNAL-CONFLICT, BOILERPLATE, SPECIFICITY-FAIL, IMPROPER-RESERVATION, REDUNDANT-IMMATERIAL, DEFENSE-DENIAL-CONFLICT, CERT-FAILURE, or NONE |
| `NMRA_Rule` | String | Rule citation with subsection (e.g., "NMRA 1-008(B)") or `[VERIFY-CITE]` |
| `Case_Authority` | String | NM case with neutral citation + pinpoint ¶, or `[VERIFY-CITE]` |
| `Record_Cite` | String | Pin cite to Complaint/Answer (e.g., "Compl. ¶12; Ans. ¶12") |
| `Proposed_Remedy` | String | From Remedy Playbook (e.g., "1-012(F) Strike", "Deemed Admitted") |
| `Priority` | Code | Critical / High / Medium / Low |
| `Notes` | String | Additional context, cross-references, or `[DECISION REQUIRED]` items |

### Rules

1. One row per defect (a single ¶ may generate multiple rows if multiple defects)
2. Every row must have a Record_Cite
3. Every row must have an NMRA_Rule or `[VERIFY-CITE]`
4. Defect_Flag = NONE for ¶s with no deficiency (include in FULL DIAGNOSTIC mode only)
5. Priority assigned per framework in `references/remedy-playbook.md`

### Example Rows

```
| 1 | ¶5 | ¶5 | BLANKET | BLANKET-DENIAL | NMRA 1-008(B) | [VERIFY-CITE] | Compl. ¶5; Ans. ¶5 | Meet-Confer → 1-012(C) | High | Multi-fact ¶ (date, location, parties) gets single "Denied" |
| 2 | ¶8 | NONE | NO-RESPONSE | ADMIT-DEFAULT | NMRA 1-008(D) | [VERIFY-CITE] | Compl. ¶8; Ans. — | Deemed Admitted → MSJ | Critical | No answer ¶ addresses this complaint ¶ |
| 3 | ¶12 | ¶12 | LKI | LKI-IMPROPER | NMRA 1-008(B) | [VERIFY-CITE] | Compl. ¶12; Ans. ¶12 | Meet-Confer → RFA | High | Defendant's own employee conduct — plainly within knowledge |
```

---

## Deliverable 2: Remedy Playbook (Case-Specific)

A prioritized action plan derived from the Defect Matrix.

### Schema

| Column | Type | Description |
|--------|------|-------------|
| `Remedy#` | Integer | Sequential number |
| `Remedy_Type` | String | From Remedy Playbook (e.g., "1-012(F) Strike") |
| `Target_Defects` | String | Defect Matrix Row#s addressed (e.g., "Rows 3, 7, 12") |
| `Legal_Basis` | String | NMRA rule + case authority (or `[VERIFY-CITE]`) |
| `Proof_Requirements` | String | What must be shown (from Remedy Playbook checklist) |
| `Assigned_Role` | Code | Senior Attorney / Associate / Law Clerk / Paralegal |
| `Timeline` | String | Recommended filing window |
| `Priority` | Code | Critical / High / Medium / Low |
| `Decision_Status` | Code | APPROVED / PENDING / `[DECISION REQUIRED]` |
| `Notes` | String | Strategic considerations |

### Rules

1. Group related defects into single remedy actions where possible
2. Every remedy must trace to at least one Defect Matrix row
3. All motions marked `[DECISION REQUIRED]` until senior attorney approves
4. Timeline must account for meet-and-confer prerequisites

---

## Deliverable 3: Role-Based Task Assignments

Tasks assigned by role per the firm's staffing model.

### Role Definitions

#### Senior Attorney
- Strategic decisions: which motions to file, timing, tone
- Approve/reject remedy recommendations
- Review all `[DECISION REQUIRED]` items
- Sign off on final motion/letter drafts
- Courtroom strategy and judicial relationship management

#### Associate
- Draft meet-and-confer letters (using Meet-and-Confer Outline)
- Draft motions (1-012(F), 1-012(C)) using Pack-First workflow
- Legal research to verify `[VERIFY-CITE]` authorities
- Analyze complex defects (internal conflicts, certification failures)
- Prepare for oral argument on filed motions

#### Law Clerk
- Run initial ADR diagnostic (FULL DIAGNOSTIC or MATRIX ONLY)
- Paragraph-by-paragraph comparison mapping
- Populate Defect Matrix
- Research NM authority for each defect flag
- Shepardize all cited authorities
- Draft Citation Appendix

#### Paralegal
- Calendar all deadlines (response deadlines, cure deadlines, motion deadlines)
- Docket tasks in SmartAdvocate
- Prepare Certificate of Service
- File motions with court
- Track meet-and-confer correspondence
- Maintain document versions in SA

### Task Table Schema

| Column | Type | Description |
|--------|------|-------------|
| `Task#` | Integer | Sequential number |
| `Role` | Code | Senior Attorney / Associate / Law Clerk / Paralegal |
| `Task` | String | Specific action item |
| `Source_Row` | String | Defect Matrix Row# or Remedy# that generates this task |
| `Deadline` | String | Calendar date or relative deadline (e.g., "Cure + 7 days") |
| `SA_Task_Type` | String | SmartAdvocate task category for docketing |
| `Status` | Code | PENDING / IN-PROGRESS / COMPLETE |
| `Notes` | String | Dependencies, prerequisites |

---

## Deliverable 4: Meet-and-Confer Outline

A structured outline for the meet-and-confer letter addressing pleading deficiencies.

### Structure

```
I. OPENING
   - Identify case (caption, cause number)
   - Reference the Answer being analyzed (date filed)
   - State purpose: address deficiencies before motion practice

II. DEFICIENCY SUMMARY
   - Number of deficient paragraphs identified
   - Categories of deficiencies found
   - Brief statement of applicable rules (NMRA 1-008, 1-009, 1-012)

III. SPECIFIC DEFICIENCIES (Grouped by Type)

   A. Unanswered Paragraphs (ADMIT-DEFAULT)
      - List complaint ¶s with no corresponding answer
      - Cite NMRA 1-008(D) deemed-admission rule
      - Request: respond to each identified ¶

   B. Blanket Denials (BLANKET-DENIAL)
      - Identify multi-fact ¶s receiving single-word denials
      - Cite NMRA 1-008(B) duty to specify
      - Request: admit undisputable portions, specify denial basis

   C. Improper LKI Responses (LKI-IMPROPER)
      - Identify facts within defendant's knowledge/control
      - Cite NMRA 1-008(B) LKI limitations
      - Request: provide substantive response

   D. Evasive Denials (EVASIVE)
      - Quote specific evasive language
      - Cite evasive-denial rule
      - Request: provide direct admission or specific denial

   E. Boilerplate Defenses (BOILERPLATE / SPECIFICITY-FAIL)
      - Identify defenses lacking factual basis
      - Cite NMRA 1-008(A) short-and-plain statement requirement
      - Request: plead supporting facts or withdraw defense

IV. CURE DEMAND
   - Deadline: [14 days NM / 30 days FED]
   - Specify: Amended Answer addressing identified deficiencies
   - State: Failure to cure will result in motion practice

V. PRESERVATION
   - Note good faith effort for future motion certification
   - Reserve all rights and remedies
```

### Rules

1. Tone: Professional, factual, no characterization of opposing counsel's motives
2. Specificity: Enough detail to show good faith, not a preview of motion strategy
3. Every deficiency cited must trace to a Defect Matrix row
4. Cure deadline must be reasonable for the jurisdiction
5. `[DECISION REQUIRED]` — senior attorney approves content and timing before sending

---

## Deliverable 5: Calendar & Compliance Sheet

Deadline tracking for all ADR-related actions.

### Schema

| Column | Type | Description |
|--------|------|-------------|
| `Event#` | Integer | Sequential number |
| `Event` | String | Description of deadline or milestone |
| `Date` | String | Calendar date or `PENDING-CALC` with calculation formula |
| `Source` | String | Rule, order, or custom (e.g., "NMRA 1-012(A)", "Customary 14-day cure") |
| `Responsible` | Code | Role assignment |
| `SA_Docket_Code` | String | SmartAdvocate docket entry code |
| `Status` | Code | UPCOMING / DUE / OVERDUE / COMPLETE |
| `Notes` | String | Dependencies, reminders |

### Standard Calendar Events (NM State Court)

```
1. Answer Filed                    → [date]     → triggers ADR diagnostic
2. ADR Diagnostic Complete         → Answer + 7 → Law Clerk
3. Senior Attorney Review          → Answer + 10 → Senior Attorney
4. Meet-Confer Letter Sent         → Answer + 14 → Associate
5. Cure Deadline                   → Letter + 14 → Paralegal (track)
6. Cure Assessment                 → Cure + 7   → Law Clerk (update matrix)
7. Motion Filing Decision          → Cure + 10  → Senior Attorney
8. RFAs Served (if applicable)     → [strategic] → Associate
9. RFA Response Deadline           → RFA + 30   → Paralegal (track)
10. Motion Filed (if applicable)   → [strategic] → Associate + Paralegal
11. Response to Motion Due         → Filing + 15 → Paralegal (track)
12. Reply Filed (if applicable)    → Response + 10 → Associate
```

### Rules

1. All dates must be verified against the court's scheduling order
2. Discovery cutoff and trial date constrain all deadlines
3. Federal deadlines differ — adjust per `references/nm-authorities.md`
4. `[VERIFY]` all calculated dates before finalizing
5. SA docket codes must match the firm's SmartAdvocate configuration

---

## Output Contract Summary

Every ADR run must produce deliverables in this order:

### FULL DIAGNOSTIC Mode
1. Defect Matrix (all ¶s, including NONE defects)
2. Remedy Playbook (case-specific)
3. Role-Based Task Assignments
4. Meet-and-Confer Outline
5. Calendar & Compliance Sheet
6. `---` (divider)
7. Gate Results
8. Open Items (`[VERIFY-CITE]`, `[DECISION REQUIRED]`, `[VERIFY]`)

### MATRIX ONLY Mode
1. Defect Matrix (deficient ¶s only)
2. `---` (divider)
3. Gate Results (abbreviated)
4. Open Items

### REMEDY ANALYSIS Mode
1. Remedy Playbook (case-specific, from provided Defect Matrix)
2. Role-Based Task Assignments
3. `---` (divider)
4. Gate Results
5. Open Items

### MEET-CONFER Mode
1. Meet-and-Confer Outline
2. `---` (divider)
3. Open Items

### CALENDAR Mode
1. Calendar & Compliance Sheet
2. `---` (divider)
3. Open Items

---

## Gate Results Schema

```
- Traceability: [PASS/FAIL] — every assertion traced to Complaint/Answer cite
- Authority Gate: [PASS/FAIL] — every rule cite verified or flagged [VERIFY-CITE]
- Completeness: [PASS/FAIL] — all complaint ¶s mapped (FULL DIAGNOSTIC only)
- Role Assignment: [PASS/FAIL] — all tasks assigned to a role
- Calendar Integrity: [PASS/FAIL] — all deadlines calculated and docketed
- Conflicts: [note any internal conflicts between deliverables]
```
