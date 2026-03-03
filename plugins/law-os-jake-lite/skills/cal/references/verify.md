# CAL VERIFY Stage Reference

## Purpose

The VERIFY stage validates the integrity of everything produced by EXTRACT and ENRICH:

1. **Rule citation validation** -- Confirm that rule citations in `cal_rules` match current NMRA/FRCP text
2. **Date arithmetic audit** -- Independently verify every computed deadline date
3. **Conflict detection** -- Identify scheduling conflicts, impossible timelines, and overlapping obligations

VERIFY is the malpractice-prevention gate. No deadline should be relied upon by the attorney until it passes VERIFY.

---

## Part 1: Rule Citation Validation

### 1.1 Validation Protocol

For each rule in `cal_rules` with `verification_status = '[VERIFY-CITE]'`:

**Step 1: Confirm the rule exists.** Verify the citation refers to a real, current rule.

| Jurisdiction | Citation Format | Verification Source |
|-------------|----------------|---------------------|
| NM-STATE | NMRA 1-XXX(X) | New Mexico Rules Annotated, current edition |
| NM-FEDERAL | FRCP XX(x) | Federal Rules of Civil Procedure, current edition |
| 10TH-CIR | 10th Cir. R. XX.X | 10th Circuit Local Rules |
| NM-2ND-DIST | LR2-XXX | Second Judicial District Local Rules |
| NM-FED-DNM | D.N.M. LR-Civ. X.X | District of NM Local Rules |

**Step 2: Confirm the offset days.** Verify the period stated in the rule text matches the `offset_days` value.

**Step 3: Confirm the trigger event type mapping.** Verify the rule applies to the trigger event type assigned.

**Step 4: Confirm the offset type.** Verify whether the rule specifies calendar or business days, applying NMRA 1-006(A) / FRCP 6(a) defaults if the rule is silent.

**Step 5: Update verification status.**

```xml
<mcp_call>
  <tool>update_rows</tool>
  <params>
    <hub>cal</hub>
    <table>cal_rules</table>
    <where>
      <rule_id>:rule_id</rule_id>
    </where>
    <set>
      <verification_status>VERIFIED</verification_status>
      <verified_by>CAL-VERIFY</verified_by>
      <verified_date>2026-02-20</verified_date>
      <verification_notes>Confirmed against NMRA 2025 edition. Offset 30 calendar days matches rule text.</verification_notes>
    </set>
  </params>
</mcp_call>
```

### 1.2 Common Citation Issues

| Issue | Example | Resolution |
|-------|---------|------------|
| Rule number typo | "NMRA 1-012(a)" vs. "NMRA 1-012(A)" | Correct the citation. NM rules use capital letter subdivisions. |
| Outdated rule | Rule amended in 2024 changing 20 days to 30 days | Update `offset_days` and note the amendment date |
| Wrong subdivision | NMRA 1-012(B) cited but (A) is the correct subsection | Correct the citation |
| Rule does not exist | "NMRA 1-015(D)" but rule 1-015 has no subdivision (D) | Flag as INVALID. Remove or correct the rule. |
| Local rule conflict | Local rule provides different period than NMRA | Note both. Local rule prevails in that district. Create LOCAL-OVERRIDE entry. |
| Federal/state confusion | FRCP 12(a) cited for NM state case | Wrong jurisdiction. Replace with NMRA 1-012(A). |

### 1.3 Rules That Frequently Change

Pay special attention to these rules that have been amended in recent years:

1. **NMRA 1-007.1** -- Motion response times (check current response period)
2. **NMRA 1-026** -- Discovery scope and limits (amended for proportionality)
3. **FRCP 26(d)** -- Initial disclosure timing (confirm 14 days after Rule 26(f) conference)
4. **D.N.M. Local Rules** -- Federal local rules are amended more frequently than state rules
5. **E-filing rules** -- Electronic service rules affect the +3 day mail addition

### 1.4 Batch Verification Query

To find all unverified rules needing validation:

```sql
SELECT rule_id, jurisdiction, rule_source, rule_description,
       offset_days, offset_type, verification_status
FROM cal_rules
WHERE verification_status = '[VERIFY-CITE]'
ORDER BY jurisdiction, rule_source;
```

---

## Part 2: Date Arithmetic Audit

### 2.1 Audit Protocol

For each deadline in `cal_deadlines` with `status = 'ACTIVE'`:

**Step 1: Retrieve the source data.**
- Get the trigger event date from `cal_trigger_events`
- Get the rule offset from `cal_rules`
- Get the recorded `date_arithmetic` from the deadline row

**Step 2: Independently recompute the deadline.**

```
AUDIT COMPUTATION:
  Trigger: [event_type] on [event_date]
  Rule: [rule_source] -- [offset_days] [offset_type] days
  Step 1: Start date = [event_date] (exclude this day per NMRA 1-006(A))
  Step 2: Count [offset_days] [calendar/business] days forward/backward
  Step 3: Interim date = [computed_date]
  Step 4: Last-day check: [computed_date] is a [day of week]
    - If weekend/holiday: extend to [next_business_day]
  Step 5: Mail service check: was service by mail? [yes/no]
    - If yes: add 3 calendar days -> [adjusted_date]
  AUDIT RESULT: [final_computed_date]
  RECORDED DEADLINE: [deadline_date from cal_deadlines]
  MATCH: [YES/NO]
```

**Step 3: Compare audit result to recorded deadline.**

| Outcome | Action |
|---------|--------|
| MATCH | Mark as AUDIT-PASSED |
| MISMATCH (1-2 days) | Likely last-day rule or holiday issue. Investigate and correct. |
| MISMATCH (3 days) | Likely mail service +3 not applied or incorrectly applied. Investigate. |
| MISMATCH (large) | Likely wrong offset_days or wrong trigger date. CRITICAL -- correct immediately. |

### 2.2 Date Arithmetic Audit Checklist

For every ACTIVE deadline, verify each item:

- [ ] **Trigger date is correct.** Cross-reference against source document (scheduling order, certificate of service, filing stamp).
- [ ] **Trigger event is still active.** Confirm `is_active = 1` in `cal_trigger_events`. If superseded, deadline should also be superseded.
- [ ] **Rule offset is correct.** Confirmed against current rule text (not `[VERIFY-CITE]`).
- [ ] **Offset type is correct.** Business days for short periods per NMRA 1-006(A)(2) / FRCP 6(a)(2).
- [ ] **Day-of-event exclusion.** The trigger day itself is NOT counted. Counting starts the next day.
- [ ] **Business day counting is correct.** If business days, verify weekends and holidays were excluded.
- [ ] **Last-day rule applied.** If deadline falls on weekend/holiday, extended to next business day.
- [ ] **Mail service adjustment.** If served by mail, +3 calendar days added per NMRA 1-006(E) / FRCP 6(d).
- [ ] **Electronic service adjustment.** NM state: no addition. Federal: +3 days per FRCP 6(d).
- [ ] **Scheduling order override.** If scheduling order provides a specific date, that date is used instead of computation.
- [ ] **Reminder dates are correct.** reminder_30, reminder_14, reminder_7 computed from deadline_date.
- [ ] **Priority is appropriate.** SOL = CRITICAL, Answer = HIGH, Discovery = MEDIUM, Administrative = LOW.
- [ ] **is_extendable is correct.** SOL = 0. Most other deadlines = 1 (extendable by stipulation or court order).

### 2.3 Worked Example: Complete Audit

```
CASE: 2025-CV-00456 (Smith v. Jones)
DEADLINE: CAL-DL-001 -- Answer to Complaint

AUDIT COMPUTATION:
  Trigger: COMPLAINT-SERVED on 2026-02-13
  Rule: NMRA 1-012(A) -- 30 calendar days after service
  Step 1: Start date = 2026-02-13 (exclude this day)
  Step 2: Count 30 calendar days: 2026-02-14 is day 1
    Feb has 28 days in 2026 (not a leap year)
    Feb 14 (day 1) through Feb 28 (day 15)
    Mar 1 (day 16) through Mar 15 (day 30)
  Step 3: Interim date = 2026-03-15
  Step 4: Last-day check: 2026-03-15 is a Sunday
    Extend to Monday 2026-03-16 per NMRA 1-006(A)
  Step 5: Mail service check: service was personal (not by mail)
    No adjustment needed.
  AUDIT RESULT: 2026-03-16
  RECORDED DEADLINE: 2026-03-16
  MATCH: YES -- AUDIT PASSED
```

### 2.4 Leap Year and Month Boundary Warnings

Special attention for date arithmetic near:

| Boundary | Risk | Check |
|----------|------|-------|
| February 28/29 | Leap year miscounting | 2028 is a leap year. 2026 is not. |
| Month-end | 30-day offset crossing month boundary | Count carefully through month boundaries |
| Year-end | Offset crossing December 31 | Holiday season may compress business days |
| Holiday clusters | Thanksgiving week, Christmas-New Year | Multiple consecutive non-business days |

---

## Part 3: Conflict Detection

### 3.1 Types of Conflicts

| Conflict Type | Description | Severity |
|---------------|-------------|----------|
| **Scheduling Conflict** | Two hearings/events on the same date for the same attorney | HIGH |
| **Impossible Timeline** | Deadline occurs before its prerequisite (e.g., response due before motion filed) | CRITICAL |
| **Capacity Overload** | Staff member assigned more hours than available in a given week | MEDIUM |
| **SOL Compression** | SOL expiration is within 30 days and required pretrial steps are incomplete | CRITICAL |
| **Overlapping Deadlines** | Multiple deadlines within a 3-day window for the same case | MEDIUM |
| **Cross-Case Conflict** | Major deadlines in different cases on the same date for the same team | HIGH |

### 3.2 Conflict Detection Queries

**Scheduling Conflict Detection:**
```sql
SELECT d1.case_id AS case_1, d1.deadline_description AS desc_1,
       d2.case_id AS case_2, d2.deadline_description AS desc_2,
       d1.deadline_date AS conflict_date
FROM cal_deadlines d1
JOIN cal_deadlines d2 ON d1.deadline_date = d2.deadline_date
  AND d1.deadline_id < d2.deadline_id
WHERE d1.status = 'ACTIVE' AND d2.status = 'ACTIVE'
ORDER BY d1.deadline_date;
```

**Impossible Timeline Detection:**
```sql
SELECT d.deadline_id, d.deadline_description, d.deadline_date,
       t.event_type, t.event_date
FROM cal_deadlines d
JOIN cal_trigger_events t ON d.trigger_id = t.trigger_id
WHERE d.status = 'ACTIVE'
  AND d.deadline_date < t.event_date  -- deadline before its own trigger
ORDER BY d.case_id, d.deadline_date;
```

**Capacity Overload Detection:**
```sql
SELECT assigned_to, responsible_role,
       strftime('%Y-W%W', due_date) AS week,
       SUM(estimated_hours) AS total_hours,
       CASE
         WHEN SUM(estimated_hours) > 40 THEN 'OVER-COMMITTED'
         WHEN SUM(estimated_hours) > 32 THEN 'AT-CAPACITY'
         ELSE 'AVAILABLE'
       END AS capacity_status
FROM cal_work_tasks
WHERE status IN ('PENDING', 'ASSIGNED', 'IN-PROGRESS')
GROUP BY assigned_to, responsible_role, strftime('%Y-W%W', due_date)
HAVING SUM(estimated_hours) > 32;
```

**Deadline Cluster Detection (3-day window):**
```sql
SELECT d1.case_id, d1.deadline_date,
       COUNT(*) AS deadlines_in_window,
       GROUP_CONCAT(d1.deadline_description, '; ') AS descriptions
FROM cal_deadlines d1
JOIN cal_deadlines d2 ON d1.case_id = d2.case_id
  AND ABS(julianday(d1.deadline_date) - julianday(d2.deadline_date)) <= 3
  AND d1.deadline_id != d2.deadline_id
WHERE d1.status = 'ACTIVE' AND d2.status = 'ACTIVE'
GROUP BY d1.case_id, d1.deadline_date
HAVING COUNT(*) >= 3;
```

### 3.3 Conflict Resolution Actions

| Conflict Type | Resolution |
|---------------|------------|
| Scheduling Conflict | Flag `[DECISION REQUIRED]` -- attorney chooses which hearing to attend or requests continuance |
| Impossible Timeline | CRITICAL error -- re-check trigger dates and rule offsets. Correct immediately. |
| Capacity Overload | Surface in PACKET workload report. Recommend task reassignment or deadline extension. |
| SOL Compression | Escalate immediately. Attorney must prioritize SOL-dependent work. |
| Overlapping Deadlines | Surface in PACKET. Recommend staggered work plan starting 2 weeks before earliest deadline. |
| Cross-Case Conflict | Surface in PACKET. Attorney triages across cases. |

---

## Part 4: VERIFY Output Format

### 4.1 Rule Citation Verification Report

```
RULE CITATION VERIFICATION REPORT
Case: [case_id] | Jurisdiction: [jurisdiction]
Date: [verification_date]

RULES VERIFIED:
| # | Rule ID | Citation | Status | Notes |
|---|---------|----------|--------|-------|
| 1 | CAL-RULE-001 | NMRA 1-012(A) | VERIFIED | Confirmed, 30 cal days |
| 2 | CAL-RULE-002 | NMRA 1-033(A) | VERIFIED | Confirmed, 30 cal days |
| 3 | CAL-RULE-003 | NMRA 1-007.1(A) | [VERIFY-CITE] | Verify current response period -- may have been amended |

Summary: 2 VERIFIED, 1 [VERIFY-CITE] remaining
```

### 4.2 Date Arithmetic Audit Report

```
DATE ARITHMETIC AUDIT REPORT
Case: [case_id]
Date: [audit_date]

DEADLINES AUDITED:
| # | DL ID | Description | Trigger Date | Offset | Computed | Recorded | Match |
|---|-------|-------------|-------------|--------|----------|----------|-------|
| 1 | CAL-DL-001 | Answer due | 2026-02-13 | +30 cal | 2026-03-16 | 2026-03-16 | YES |
| 2 | CAL-DL-002 | Discovery cutoff | 2026-09-15 | -60 cal | 2026-07-17 | 2026-07-17 | YES |
| 3 | CAL-DL-003 | Expert disclosure | 2026-09-15 | -90 cal | 2026-06-17 | 2026-06-16 | NO [1-day] |

MISMATCHES: 1
  CAL-DL-003: 2026-06-17 (Wednesday) is correct. Recorded 2026-06-16 is one day early.
  ACTION: Correct deadline_date to 2026-06-17.

Summary: 2 PASSED, 1 FAILED (corrected)
```

### 4.3 Conflict Detection Report

```
CONFLICT DETECTION REPORT
Scope: All active cases | Date: [report_date]

CONFLICTS FOUND: [count]

[CRITICAL] IMPOSSIBLE TIMELINE:
  Case 2025-CV-00789: Response deadline (2026-03-01) is BEFORE motion filing date (2026-03-05).
  Action: Re-check trigger date for motion filing. Likely data entry error.

[HIGH] SCHEDULING CONFLICT:
  2026-04-15: Attorney Lopez has hearings in Case 2025-CV-00456 AND Case 2025-CV-00789.
  Action: Request continuance on one case or arrange coverage.

[MEDIUM] CAPACITY OVERLOAD:
  Week of 2026-04-13: Paralegal Garcia has 52 estimated hours (capacity: 40).
  Action: Reassign 12 hours of tasks or request deadline extensions.

Summary: 1 CRITICAL, 1 HIGH, 1 MEDIUM
```

---

## Part 5: VERIFY Checklist (Master)

Before marking the VERIFY stage complete for a case:

- [ ] All `[VERIFY-CITE]` rules have been reviewed (verified or flagged for attorney)
- [ ] All ACTIVE deadlines have passed date arithmetic audit
- [ ] All mismatches have been corrected or flagged
- [ ] Conflict detection has been run across all active cases
- [ ] CRITICAL conflicts (impossible timelines) have been resolved
- [ ] HIGH conflicts (scheduling) have been flagged for attorney decision
- [ ] SOL deadlines confirmed as CRITICAL priority and non-extendable
- [ ] Reminder dates (30, 14, 7 day) verified for all ACTIVE deadlines
- [ ] Capacity analysis run for all assigned staff members
- [ ] Verification report generated and included in output

### 5.1 Verification Frequency

| Event | Trigger for Re-Verification |
|-------|----------------------------|
| New trigger event captured | VERIFY deadlines dependent on new trigger |
| Trigger event superseded | VERIFY all cascaded new deadlines |
| Rule updated or corrected | VERIFY all deadlines using that rule across all cases |
| Monthly audit | Full VERIFY pass on all ACTIVE deadlines firm-wide |
| 30 days before trial | Full VERIFY pass on all trial-related deadlines for the case |
| SOL approaching (90 days) | Re-verify SOL computation from source documents |
