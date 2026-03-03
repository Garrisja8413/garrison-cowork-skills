# CAL ENRICH Stage Reference

## Purpose

The ENRICH stage transforms raw rules and trigger events into actionable, case-specific deadlines and work tasks. It performs two core operations:

1. **Deadline Computation** -- Applies `cal_rules` offset logic to `cal_trigger_events` dates to produce `cal_deadlines` rows
2. **Task Generation** -- Applies `cal_task_templates` to computed deadlines to produce `cal_work_tasks` rows

ENRICH is where date arithmetic precision is critical. A one-day error in counting can mean a missed deadline and potential malpractice liability.

---

## Part 1: Deadline Computation Logic

### 1.1 Core Formula

```
deadline_date = trigger_event.event_date + rule.offset_days
```

Where:
- `trigger_event.event_date` comes from `cal_trigger_events` (must be `is_active = 1`)
- `rule.offset_days` comes from `cal_rules` (matched by `jurisdiction` + `trigger_event_type`)
- Positive offset = days AFTER trigger (e.g., answer due +30 days after service)
- Negative offset = days BEFORE trigger (e.g., exhibit list due -14 days before trial)

### 1.2 Rule Matching Logic

For a given trigger event, find all applicable rules:

```sql
SELECT r.*
FROM cal_rules r
WHERE r.trigger_event_type = :trigger_event_type
  AND r.jurisdiction = :case_jurisdiction
  AND r.verification_status != 'SUPERSEDED'
ORDER BY r.priority DESC;
```

Each matching rule generates one `cal_deadlines` row for the case.

### 1.3 Scheduling Order Overrides

If a scheduling order provides a specific date that would normally be computed from a rule, the scheduling order date takes precedence:

1. Check if `cal_trigger_events` contains a direct date for the obligation (e.g., DISCOVERY-CUTOFF with a specific date from the scheduling order)
2. If yes, use that date directly instead of computing from rule offset
3. Mark the deadline with `source = 'SCHEDULING-ORDER-DIRECT'` instead of `source = 'RULE-COMPUTED'`
4. Still link to the relevant rule for reference, but note the override

---

## Part 2: Business Day vs. Calendar Day Counting

### 2.1 NMRA 1-006(A) -- NM State Court Counting Rules

**The controlling rule for NM state courts:**

| Period Length | Counting Method | Rule |
|---------------|----------------|------|
| Less than 7 days | **Business days** -- exclude weekends and court holidays | NMRA 1-006(A)(2) |
| 7 days or more | **Calendar days** -- include all days | NMRA 1-006(A)(1) |

**Additional NMRA 1-006 rules:**

- **Day of the event is excluded.** Start counting the day AFTER the trigger event. (NMRA 1-006(A))
- **Last day rule:** If the last day falls on a Saturday, Sunday, or legal holiday, the period extends to the next business day. (NMRA 1-006(A))
- **Mail service adds 3 days.** When service is by mail, add 3 calendar days to the response period. (NMRA 1-006(E))
- **Electronic service does NOT add days** under NMRA 1-005.2.

### 2.2 FRCP 6(a) -- Federal Court Counting Rules

**The controlling rule for federal courts (District of NM):**

| Period Length | Counting Method | Rule |
|---------------|----------------|------|
| Less than 11 days (stated in days) | **Business days** -- exclude weekends and federal holidays | FRCP 6(a)(2) |
| 11 days or more | **Calendar days** -- include all days | FRCP 6(a)(1) |

**Additional FRCP 6 rules:**

- **Day of the event is excluded.** Start counting the day AFTER the trigger event. (FRCP 6(a)(1)(A))
- **Last day rule:** If the last day falls on a Saturday, Sunday, or legal holiday, the period extends to the next day that is not a Saturday, Sunday, or legal holiday. (FRCP 6(a)(1)(C))
- **Mail service adds 3 days.** FRCP 6(d) -- when the period is triggered by service and service is by mail, add 3 calendar days.
- **Electronic service adds 3 days.** FRCP 6(d) includes electronic service in the +3 day addition (unlike NM state).

### 2.3 Implementation: Day Counting Algorithm

```
FUNCTION compute_deadline(trigger_date, offset_days, offset_type, jurisdiction):

    IF offset_type == 'business':
        -- Count only business days
        current_date = trigger_date + 1 day  -- exclude trigger day
        days_counted = 0
        WHILE days_counted < ABS(offset_days):
            IF is_business_day(current_date, jurisdiction):
                days_counted += 1
            IF days_counted < ABS(offset_days):
                current_date = current_date + 1 day (or -1 if offset negative)
        deadline_date = current_date

    ELSE IF offset_type == 'calendar':
        -- Count all days
        deadline_date = trigger_date + offset_days
        -- But exclude the trigger day itself per NMRA 1-006(A) / FRCP 6(a)
        -- (offset already accounts for this in the rule definition)

    -- Apply last-day rule
    IF is_weekend_or_holiday(deadline_date, jurisdiction):
        deadline_date = next_business_day(deadline_date, jurisdiction)

    RETURN deadline_date
```

### 2.4 Automatic offset_type Determination

When seeding rules, the offset_type should be set based on:

| Jurisdiction | Offset Days | offset_type |
|-------------|-------------|-------------|
| NM-STATE | < 7 | `business` |
| NM-STATE | >= 7 | `calendar` |
| NM-FEDERAL | < 11 | `business` |
| NM-FEDERAL | >= 11 | `calendar` |

**IMPORTANT:** Some rules specify "calendar days" or "business days" explicitly in the rule text, overriding the default. Always check the rule text.

### 2.5 NM Court Holidays (for business day counting)

The following are NM state court holidays (non-exhaustive -- verify annually):

1. New Year's Day (January 1)
2. Martin Luther King Jr. Day (3rd Monday, January)
3. Presidents' Day (3rd Monday, February)
4. Memorial Day (last Monday, May)
5. Juneteenth (June 19)
6. Independence Day (July 4)
7. Labor Day (1st Monday, September)
8. Indigenous Peoples' Day (2nd Monday, October)
9. Veterans Day (November 11)
10. Thanksgiving Day (4th Thursday, November)
11. Day after Thanksgiving (4th Friday, November)
12. Christmas Day (December 25)

Federal court holidays follow the federal schedule, which largely overlaps but may differ on state-specific holidays.

---

## Part 3: Task Generation from Templates

### 3.1 Task Template Matching

After computing a deadline, check `cal_task_templates` for matching auto-generation rules:

```sql
SELECT t.*
FROM cal_task_templates t
WHERE t.trigger_type = 'DEADLINE-COMPUTED'
  AND (t.trigger_filter = :deadline_rule_source OR t.trigger_filter = 'ALL')
ORDER BY t.deadline_offset_days ASC;
```

### 3.2 Task Due Date Computation

Work tasks are back-scheduled from the deadline:

```
task.due_date = deadline.deadline_date + template.deadline_offset_days
```

Where `deadline_offset_days` is typically NEGATIVE (days before the deadline). Examples:

| Template | deadline_offset_days | Meaning |
|----------|---------------------|---------|
| Draft discovery responses | -10 | Due 10 days before response deadline |
| Attorney review of responses | -5 | Due 5 days before response deadline |
| File responses | -1 | Due 1 day before response deadline |
| Send mediation brief | -7 | Due 7 days before mediation |
| Prepare exhibit list | -21 | Due 21 days before exhibit list deadline |

### 3.3 Standard Task Templates for PI Cases

Seed these templates for personal injury case workflows:

#### Discovery Response Chain
```
DEADLINE: Interrogatory Responses Due
  TASK: Draft interrogatory responses        | offset: -10 days | role: PARALEGAL    | hours: 3.0
  TASK: Attorney review of draft responses   | offset: -5 days  | role: ATTORNEY     | hours: 1.5
  TASK: Finalize and serve responses         | offset: -1 day   | role: PARALEGAL    | hours: 0.5
```

#### Deposition Chain
```
DEADLINE: Deposition Date
  TASK: Prepare deposition outline           | offset: -7 days  | role: ATTORNEY     | hours: 3.0
  TASK: Prepare client for deposition        | offset: -3 days  | role: ATTORNEY     | hours: 2.0
  TASK: Assemble deposition exhibits         | offset: -5 days  | role: PARALEGAL    | hours: 2.0
```

#### Trial Preparation Chain
```
DEADLINE: Trial Date
  TASK: Draft pretrial order                 | offset: -35 days | role: ATTORNEY     | hours: 4.0
  TASK: Prepare exhibit list                 | offset: -21 days | role: PARALEGAL    | hours: 3.0
  TASK: Prepare witness list                 | offset: -21 days | role: ATTORNEY     | hours: 2.0
  TASK: Draft motions in limine              | offset: -14 days | role: ATTORNEY     | hours: 5.0
  TASK: Prepare jury instructions            | offset: -14 days | role: ATTORNEY     | hours: 4.0
  TASK: Trial binder assembly               | offset: -7 days  | role: PARALEGAL    | hours: 6.0
  TASK: Final trial preparation meeting      | offset: -3 days  | role: ATTORNEY     | hours: 2.0
```

### 3.4 MCP Write Operation for `cal_deadlines`

```xml
<mcp_call>
  <tool>insert_rows</tool>
  <params>
    <hub>cal</hub>
    <table>cal_deadlines</table>
    <rows>
      <row>
        <case_id>2025-CV-00456</case_id>
        <rule_id>CAL-RULE-012A</rule_id>
        <trigger_id>CAL-TRIG-001</trigger_id>
        <deadline_description>Answer due 30 days after service of complaint</deadline_description>
        <deadline_date>2026-03-15</deadline_date>
        <status>ACTIVE</status>
        <priority>HIGH</priority>
        <is_extendable>1</is_extendable>
        <source>RULE-COMPUTED</source>
        <date_arithmetic>Service date 2026-02-13 + 30 calendar days = 2026-03-15 (Sunday) -> extended to 2026-03-16 (Monday) per NMRA 1-006(A)</date_arithmetic>
        <reminder_30>2026-02-13</reminder_30>
        <reminder_14>2026-03-01</reminder_14>
        <reminder_7>2026-03-08</reminder_7>
        <filing_id></filing_id>
        <created_by>CAL-ENRICH</created_by>
      </row>
    </rows>
  </params>
</mcp_call>
```

### 3.5 MCP Write Operation for `cal_work_tasks`

```xml
<mcp_call>
  <tool>insert_rows</tool>
  <params>
    <hub>cal</hub>
    <table>cal_work_tasks</table>
    <rows>
      <row>
        <case_id>2025-CV-00456</case_id>
        <deadline_id>CAL-DL-001</deadline_id>
        <template_id>CAL-TPL-DRAFT-DISC</template_id>
        <task_description>Draft interrogatory responses for Smith v. Jones</task_description>
        <due_date>2026-03-05</due_date>
        <status>PENDING</status>
        <assigned_to></assigned_to>
        <responsible_role>PARALEGAL</responsible_role>
        <estimated_hours>3.0</estimated_hours>
        <created_by>CAL-ENRICH</created_by>
      </row>
    </rows>
  </params>
</mcp_call>
```

---

## Part 4: Cascading When Triggers Change

### 4.1 Trigger Supersession Cascade

When a trigger event is superseded (e.g., trial date moved from Sept 15 to Nov 1), ALL dependent data must cascade:

**Step 1: Mark old deadlines as SUPERSEDED**
```sql
UPDATE cal_deadlines
SET status = 'SUPERSEDED',
    superseded_by = :new_trigger_id,
    superseded_date = CURRENT_TIMESTAMP
WHERE trigger_id = :old_trigger_id
  AND status = 'ACTIVE';
```

**Step 2: Mark old work tasks as CANCELLED**
```sql
UPDATE cal_work_tasks
SET status = 'CANCELLED',
    notes = 'Cancelled due to trigger supersession: ' || :reason
WHERE deadline_id IN (
    SELECT deadline_id FROM cal_deadlines
    WHERE trigger_id = :old_trigger_id
)
AND status IN ('PENDING', 'ASSIGNED');
```

**Step 3: Re-compute new deadlines from new trigger**
Run standard ENRICH computation using the new trigger event.

**Step 4: Re-generate work tasks from new deadlines**
Run standard task generation from templates.

**Step 5: Preserve in-progress work**
If any tasks were `IN-PROGRESS` (work already started), do NOT auto-cancel. Instead:
- Flag as `[DECISION REQUIRED]` for attorney review
- Note the old deadline and new deadline
- Attorney decides whether to reassign the work to the new deadline

### 4.2 Cascade Audit Trail

Every cascade must be documented in the ENRICH output:

```
TRIGGER SUPERSESSION CASCADE
Old Trigger: CAL-TRIG-001 (TRIAL-DATE: 2026-09-15)
New Trigger: CAL-TRIG-002 (TRIAL-DATE: 2026-11-01)
Reason: Amended Scheduling Order dated 2026-05-20

Deadlines Superseded: 12
Deadlines Re-Computed: 12
Tasks Cancelled: 8
Tasks Flagged for Review: 2 (IN-PROGRESS at time of cascade)
Tasks Re-Generated: 10
```

---

## Part 5: ENRICH Checklists

### 5.1 Deadline Computation Checklist

Before completing an ENRICH for deadline computation:

- [ ] Trigger event is ACTIVE (`is_active = 1`)
- [ ] All matching rules are found for the trigger event type + jurisdiction
- [ ] Offset type (business vs. calendar) is correct per NMRA 1-006(A) / FRCP 6(a)
- [ ] Date arithmetic is shown explicitly in `date_arithmetic` column
- [ ] Last-day rule applied (weekend/holiday extension)
- [ ] Mail service +3 days added where applicable
- [ ] SOL deadlines are marked CRITICAL priority and `is_extendable = 0`
- [ ] Reminder dates computed (30, 14, 7 days before deadline)
- [ ] No duplicate deadlines (check existing cal_deadlines for same case + rule + trigger)
- [ ] Scheduling order overrides applied where applicable

### 5.2 Task Generation Checklist

Before completing an ENRICH for task generation:

- [ ] Deadline is ACTIVE status before generating tasks
- [ ] Template match found for the deadline type
- [ ] Task due dates are computed correctly (deadline + negative offset)
- [ ] Task due dates do not fall on weekends/holidays (adjust if needed)
- [ ] Responsible role is assigned from template
- [ ] Estimated hours are realistic and from template
- [ ] No duplicate tasks (check existing cal_work_tasks for same deadline + template)
- [ ] Task chain ordering makes sense (draft before review before file)

### 5.3 Common ENRICH Errors to Avoid

1. **Off-by-one errors** -- The most dangerous error. Always show date arithmetic explicitly.
2. **Forgetting the last-day rule** -- If deadline lands on Saturday/Sunday/holiday, extend to next business day.
3. **Wrong offset_type** -- A 5-day deadline in NM state court is business days (NMRA 1-006(A)(2)), not calendar days.
4. **Not cascading supersessions** -- When a trigger changes, ALL dependent deadlines and tasks must cascade.
5. **Generating tasks for SUPERSEDED deadlines** -- Only generate tasks for ACTIVE deadlines.
6. **Setting SOL deadlines as extendable** -- SOL is NEVER extendable. `is_extendable = 0`, always.
7. **Ignoring mail service days** -- If service was by mail, add 3 days per NMRA 1-006(E) / FRCP 6(d).
8. **Not recording date arithmetic** -- The `date_arithmetic` column is mandatory. It is the audit trail that proves the computation is correct.
