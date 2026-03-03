# CAL PACKET Mode Reference

## Purpose

The PACKET mode assembles structured reports from the CAL hub data for attorney consumption. PACKET does not modify the hub -- it queries and formats existing data from `cal_deadlines`, `cal_work_tasks`, and associated VIEWs.

Four PACKET types are supported:
1. **Upcoming Dashboard** -- Case-specific or firm-wide deadline overview
2. **Urgency Report** -- Filtered view of deadlines by urgency tier
3. **Workload Capacity Analysis** -- Staff assignment and capacity tracking
4. **Case Timeline** -- Chronological deadline chain for a single case

---

## Part 1: The `cal_upcoming` VIEW

### 1.1 VIEW Definition

The `cal_upcoming` VIEW is the primary data source for PACKET output. It joins deadlines, triggers, rules, and tasks into a single queryable result set:

```sql
CREATE VIEW cal_upcoming AS
SELECT
    d.deadline_id,
    d.case_id,
    d.deadline_description,
    d.deadline_date,
    d.status,
    d.priority,
    d.is_extendable,
    d.filing_id,
    d.reminder_30,
    d.reminder_14,
    d.reminder_7,
    t.event_type AS trigger_type,
    t.event_date AS trigger_date,
    r.rule_source,
    r.jurisdiction,
    r.verification_status AS rule_verified,
    julianday(d.deadline_date) - julianday('now') AS days_remaining,
    CASE
        WHEN julianday(d.deadline_date) - julianday('now') < 0 THEN 'OVERDUE'
        WHEN julianday(d.deadline_date) - julianday('now') <= 7 THEN 'URGENT'
        WHEN julianday(d.deadline_date) - julianday('now') <= 14 THEN 'APPROACHING'
        WHEN julianday(d.deadline_date) - julianday('now') <= 30 THEN 'UPCOMING'
        WHEN julianday(d.deadline_date) - julianday('now') <= 90 THEN 'FUTURE'
        ELSE 'DISTANT'
    END AS urgency_tier,
    (SELECT COUNT(*) FROM cal_work_tasks wt
     WHERE wt.deadline_id = d.deadline_id
       AND wt.status IN ('PENDING', 'ASSIGNED', 'IN-PROGRESS')) AS open_tasks,
    (SELECT COUNT(*) FROM cal_work_tasks wt
     WHERE wt.deadline_id = d.deadline_id
       AND wt.status = 'COMPLETED') AS completed_tasks
FROM cal_deadlines d
JOIN cal_trigger_events t ON d.trigger_id = t.trigger_id
JOIN cal_rules r ON d.rule_id = r.rule_id
WHERE d.status = 'ACTIVE';
```

### 1.2 Querying `cal_upcoming`

**All OVERDUE deadlines (firm-wide):**
```sql
SELECT * FROM cal_upcoming
WHERE urgency_tier = 'OVERDUE'
ORDER BY days_remaining ASC;
```

**URGENT + APPROACHING for a specific case:**
```sql
SELECT * FROM cal_upcoming
WHERE case_id = :case_id
  AND urgency_tier IN ('URGENT', 'APPROACHING')
ORDER BY deadline_date ASC;
```

**SOL deadlines within 90 days:**
```sql
SELECT * FROM cal_upcoming
WHERE trigger_type = 'SOL-EXPIRATION'
  AND days_remaining <= 90
ORDER BY days_remaining ASC;
```

**Deadlines with unverified rules:**
```sql
SELECT * FROM cal_upcoming
WHERE rule_verified = '[VERIFY-CITE]'
ORDER BY deadline_date ASC;
```

---

## Part 2: Upcoming Dashboard

### 2.1 Dashboard Template

The Upcoming Dashboard is the most common PACKET request. It provides a snapshot of all active deadlines for a case or firm.

```
===============================================================
CAL DEADLINE DASHBOARD
Generated: [date] | Scope: [case_id or "Firm-Wide"]
===============================================================

--- OVERDUE (IMMEDIATE ACTION REQUIRED) ---

| # | Case | Deadline | Due Date | Days Over | Priority | Tasks |
|---|------|----------|----------|-----------|----------|-------|
| 1 | 2025-CV-00123 | Answer to Amended Complaint | 2026-02-18 | -2 | HIGH | 0/3 done |

ACTION: Escalate to attorney immediately. Document reason for delay.

--- URGENT (This Week: 0-7 days) ---

| # | Case | Deadline | Due Date | Days Left | Priority | Tasks |
|---|------|----------|----------|-----------|----------|-------|
| 1 | 2025-CV-00456 | Interrogatory Responses | 2026-02-25 | 5 | MEDIUM | 1/3 done |
| 2 | 2025-CV-00789 | Expert Report Disclosure | 2026-02-27 | 7 | HIGH | 0/2 done |

--- APPROACHING (Next 2 Weeks: 8-14 days) ---

| # | Case | Deadline | Due Date | Days Left | Priority | Tasks |
|---|------|----------|----------|-----------|----------|-------|
| 1 | 2025-CV-00456 | RFP Responses | 2026-03-05 | 13 | MEDIUM | 0/3 done |

--- UPCOMING (Next Month: 15-30 days) ---

| # | Case | Deadline | Due Date | Days Left | Priority | Tasks |
|---|------|----------|----------|-----------|----------|-------|
| 1 | 2025-CV-00456 | MSJ Deadline | 2026-03-15 | 23 | HIGH | 0/4 done |

--- FUTURE (31-90 days) ---
[Listed by month, summarized]

===============================================================
SUMMARY
  OVERDUE:     1 deadline  [ESCALATE]
  URGENT:      2 deadlines [ACTIVE WORK THIS WEEK]
  APPROACHING: 1 deadline  [PREPARATION UNDERWAY]
  UPCOMING:    1 deadline  [PLANNING PHASE]
  FUTURE:      [count] deadlines tracked
  TOTAL ACTIVE: [count]

UNVERIFIED RULES: [count] deadlines rely on [VERIFY-CITE] rules
SOL DEADLINES: [count] active, nearest in [X] days
===============================================================
```

### 2.2 Dashboard Filtering Options

| Filter | Query Parameter | Use Case |
|--------|----------------|----------|
| Single case | `case_id = :case_id` | Attorney reviewing one case |
| Attorney caseload | `assigned_to = :attorney` (via work tasks) | Attorney reviewing their deadlines |
| Urgency tier | `urgency_tier IN ('OVERDUE', 'URGENT')` | Daily morning triage |
| Priority | `priority = 'CRITICAL'` | SOL and critical deadlines only |
| Date range | `deadline_date BETWEEN :start AND :end` | Weekly/monthly planning |
| Jurisdiction | `jurisdiction = :jurisdiction` | State vs. federal deadlines |

### 2.3 Color / Priority Coding

When presenting the dashboard, use these visual indicators:

| Urgency | Indicator | Meaning |
|---------|-----------|---------|
| OVERDUE | `[!!!]` or bold red equivalent | Immediate escalation required |
| URGENT | `[!!]` | Active work this week |
| APPROACHING | `[!]` | Preparation should be underway |
| UPCOMING | `[~]` | Planning and resource allocation |
| FUTURE | `[ ]` | Tracking only |

---

## Part 3: Urgency Report

### 3.1 Report Template

The Urgency Report focuses exclusively on deadlines requiring immediate attention.

```
===============================================================
CAL URGENCY REPORT
Generated: [date] | Scope: [firm-wide or case-specific]
Alert Level: [CRITICAL / WARNING / NORMAL]
===============================================================

CRITICAL ALERTS:
  [!!!] 2025-CV-00123: Answer OVERDUE by 2 days. No filing recorded.
        Rule: NMRA 1-012(A). Trigger: Service on 2026-01-19.
        Assigned: Attorney Lopez. Tasks: 0/3 completed.
        --> IMMEDIATE ACTION: File answer or request extension TODAY.

  [!!!] 2025-CV-00567: SOL expires in 12 days (2026-03-04).
        Statute: NMSA 37-1-8 (3-year PI). Incident: 2023-03-04.
        Status: Complaint not yet filed.
        --> IMMEDIATE ACTION: File complaint before 2026-03-04.

WARNING ALERTS:
  [!!] 2025-CV-00456: Interrogatory responses due in 5 days (2026-02-25).
       Drafting task 33% complete. Attorney review not started.
       --> ACTION: Prioritize completion this week.

  [!!] 2025-CV-00789: Expert disclosure in 7 days. Expert report not received.
       --> ACTION: Contact expert for report status.

APPROACHING (information only):
  [!] 3 deadlines in the next 8-14 days. See dashboard for details.

===============================================================
SUMMARY METRICS:
  Overdue: [count]     | Urgent: [count]
  Approaching: [count] | Total active: [count]
  Unverified rules affecting urgent deadlines: [count]
===============================================================
```

### 3.2 Urgency Report Triggers

Generate an urgency report automatically when:

| Condition | Report Type |
|-----------|-------------|
| Any deadline is OVERDUE | CRITICAL urgency report |
| SOL within 30 days | CRITICAL urgency report |
| More than 3 URGENT deadlines in one week | WARNING urgency report |
| Capacity OVER-COMMITTED for any staff member | WARNING urgency report |
| Attorney requests "what's due" or "urgent deadlines" | On-demand urgency report |
| Monday morning (weekly triage) | Standard urgency report |

---

## Part 4: Workload Capacity Analysis

### 4.1 Capacity Report Template

```
===============================================================
CAL WORKLOAD CAPACITY ANALYSIS
Generated: [date] | Period: [week of YYYY-MM-DD]
===============================================================

STAFF WORKLOAD SUMMARY:

| Staff Member | Role | Assigned Hours | Capacity | Status | Cases |
|-------------|------|---------------|----------|--------|-------|
| Lopez, M. | ATTORNEY | 48.0 | 40.0 | OVER-COMMITTED | 5 |
| Garcia, A. | PARALEGAL | 36.0 | 40.0 | AT-CAPACITY | 8 |
| Chen, R. | ATTORNEY | 22.0 | 40.0 | AVAILABLE | 3 |
| Trujillo, S. | PARALEGAL | 18.0 | 40.0 | AVAILABLE | 4 |

OVER-COMMITTED DETAIL (Lopez, M.):

| Case | Task | Due Date | Est. Hours | Status |
|------|------|----------|-----------|--------|
| 2025-CV-00456 | Attorney review: interrogatory responses | 2026-02-25 | 1.5 | ASSIGNED |
| 2025-CV-00456 | Draft MSJ brief | 2026-02-28 | 8.0 | IN-PROGRESS |
| 2025-CV-00789 | Expert disclosure review | 2026-02-27 | 3.0 | ASSIGNED |
| 2025-CV-00123 | Prepare for hearing | 2026-02-26 | 4.0 | ASSIGNED |
| (other tasks...) | ... | ... | ... | ... |
| TOTAL | | | 48.0 | |

RECOMMENDATION: Reassign 8.0 hours to Chen, R. (AVAILABLE, 18.0 hours remaining).
  Suggested: Move 2025-CV-00789 expert disclosure review to Chen, R.

===============================================================
CAPACITY TRENDS (past 4 weeks):
  Week 1: 2 OVER-COMMITTED, 1 AT-CAPACITY, 1 AVAILABLE
  Week 2: 1 OVER-COMMITTED, 2 AT-CAPACITY, 1 AVAILABLE
  Week 3: 0 OVER-COMMITTED, 2 AT-CAPACITY, 2 AVAILABLE
  Week 4: 1 OVER-COMMITTED, 1 AT-CAPACITY, 2 AVAILABLE [current]
===============================================================
```

### 4.2 Capacity Thresholds

| Status | Condition | Action |
|--------|-----------|--------|
| OVER-COMMITTED | Assigned hours > capacity (typically > 40/week) | Surface prominently. Recommend reassignment. |
| AT-CAPACITY | Assigned hours > 80% of capacity (> 32/week) | Warning. No new assignments without review. |
| AVAILABLE | Assigned hours <= 80% of capacity | Can accept additional assignments. |
| BLOCKED | One or more tasks in BLOCKED status | Investigate blockers before assigning more work. |

### 4.3 Capacity Query

```sql
SELECT
    wt.assigned_to,
    wt.responsible_role,
    strftime('%Y-W%W', wt.due_date) AS work_week,
    SUM(wt.estimated_hours) AS total_hours,
    COUNT(*) AS task_count,
    COUNT(DISTINCT wt.case_id) AS case_count,
    SUM(CASE WHEN wt.status = 'BLOCKED' THEN 1 ELSE 0 END) AS blocked_count,
    CASE
        WHEN SUM(wt.estimated_hours) > 40 THEN 'OVER-COMMITTED'
        WHEN SUM(wt.estimated_hours) > 32 THEN 'AT-CAPACITY'
        ELSE 'AVAILABLE'
    END AS capacity_status
FROM cal_work_tasks wt
WHERE wt.status IN ('PENDING', 'ASSIGNED', 'IN-PROGRESS', 'BLOCKED')
  AND wt.due_date BETWEEN :week_start AND :week_end
GROUP BY wt.assigned_to, wt.responsible_role, strftime('%Y-W%W', wt.due_date)
ORDER BY total_hours DESC;
```

---

## Part 5: Case Timeline

### 5.1 Timeline Template

The Case Timeline shows the full chronological sequence of deadlines for a single case.

```
===============================================================
CAL CASE TIMELINE
Case: [case_id] -- [case_name]
Jurisdiction: [jurisdiction]
Generated: [date]
===============================================================

PAST EVENTS (completed/superseded):
  2025-08-15  CASE-SIGNED           IKP conversion --> CAL seeded
  2025-08-20  COMPLAINT-FILED       Complaint filed in 2nd Judicial District
  2025-09-02  COMPLAINT-SERVED      Defendant served (personal service)
  2025-10-02  ANSWER-FILED          [COMPLETED] Answer filed by defense

ACTIVE DEADLINES:
  2026-02-25  Interrogatory Responses  [URGENT - 5 days]    Tasks: 1/3
  2026-02-27  Expert Disclosure        [URGENT - 7 days]    Tasks: 0/2
  2026-03-05  RFP Responses            [APPROACHING]        Tasks: 0/3
  2026-03-15  MSJ Deadline             [UPCOMING]           Tasks: 0/4
  2026-07-17  Discovery Cutoff         [FUTURE]             Tasks: 0/0
  2026-08-15  Pretrial Order Due       [FUTURE]             Tasks: 0/0
  2026-09-01  Exhibit/Witness Lists    [FUTURE]             Tasks: 0/0
  2026-09-08  Motions in Limine        [FUTURE]             Tasks: 0/0
>>2026-09-15  TRIAL DATE               [FUTURE - 207 days]

SOL STATUS:
  Statute: NMSA 37-1-8 (3-year PI)
  Incident Date: 2023-08-15
  SOL Expiration: 2026-08-15 [FILED - complaint filed before SOL]

SUPERSEDED EVENTS:
  (none)

===============================================================
KEY METRICS:
  Total active deadlines: 9
  Nearest deadline: 2026-02-25 (5 days)
  Trial date: 2026-09-15 (207 days)
  Open work tasks: 10
  Completed work tasks: 4
  Unverified rules: 0
===============================================================
```

### 5.2 Timeline Display Rules

1. **Past events** are shown in standard format with completion status
2. **Active deadlines** show urgency tier and task completion ratio
3. **Trial date** is highlighted with `>>` prefix as the anchor point
4. **SOL status** always shown if applicable, with filed/unfiled status
5. **Superseded events** shown at bottom for audit trail
6. **Negative offset deadlines** (computed backward from trial) are displayed in chronological order, not in order of creation

---

## Part 6: PACKET Assembly Checklist

Before delivering any PACKET output:

- [ ] Data freshness: All queries run against current hub state (not cached data)
- [ ] OVERDUE deadlines are listed first with escalation instructions
- [ ] SOL deadlines are called out explicitly regardless of urgency tier
- [ ] Unverified rules (`[VERIFY-CITE]`) are noted if they affect any displayed deadline
- [ ] Capacity warnings (OVER-COMMITTED) are surfaced prominently
- [ ] Task completion ratios are accurate (open vs. completed)
- [ ] Date is displayed consistently (YYYY-MM-DD format throughout)
- [ ] Case identifiers match SA case numbers
- [ ] Days remaining is computed from today's date, not a cached date
- [ ] Summary metrics are accurate and match the detailed data
- [ ] Next steps are actionable and specific ("File answer in Case X" not "Review deadlines")

### 6.1 PACKET Output Sections

Every PACKET response must include:

1. **Mode + Scope Statement** -- PACKET type, case or firm-wide, date range
2. **Report Body** -- The formatted dashboard/report/timeline
3. **QA Summary** -- Counts by status, urgency, capacity
4. **Next Steps** -- Specific actions the attorney should take based on the report
5. **Open Items** -- `[VERIFY-CITE]` rules, `[DECISION REQUIRED]` conflicts, missing data
