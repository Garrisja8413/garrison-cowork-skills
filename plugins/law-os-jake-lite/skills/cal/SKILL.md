---
name: cal
display_name: "Calendar & Deadlines Builder"
description: >-
  Calendar & Deadlines (CAL) Builder for Law-OS. Seeds NM statutory and
  federal procedural deadlines, computes case-specific deadline chains from
  trigger events, generates work tasks, and tracks workload capacity. Highest
  malpractice-prevention value in the system. Runs in four stages: EXTRACT,
  ENRICH, VERIFY, PACKET. TRIGGERS: "CAL", "calendar", "deadlines", "statute
  of limitations", "SOL", "trial date deadlines", "discovery cutoff",
  "scheduling order", "deadline chain", "compute deadlines", "workload",
  "capacity" (v1.0)
version: "1.0"
category: builder
pack_consumes:
  - Case metadata
  - DPB
pack_produces:
  - CAL pack
checkpoints: 0
author: "Parnall & Adams"
license: Proprietary
---

## Pack Dependencies
**Consumes:**
- Case metadata (case_id, jurisdiction, filing dates from SmartAdvocate)
- DPB (discovery deadlines and response due dates)
- FLG (filing deadlines, court response triggers)

**Produces:**
- CAL pack (deadline tracking, task generation, workload management)

# CAL (Calendar & Deadlines Builder) -- v1.0

## Purpose

Prevent malpractice through rigorous, rules-based deadline management.
CAL is the **highest malpractice-prevention value** hub in Law-OS. A missed
deadline can end a case. CAL ensures every procedural obligation is computed
from authoritative rules, tracked with urgency tiers, and assigned as a
work task to the responsible staff member.

CAL operates as a three-layer system:
1. **Rules Library** -- jurisdiction-specific procedural rules with offset calculations
2. **Deadline Engine** -- case-specific deadlines computed from trigger events
3. **Task Manager** -- work items generated from templates and back-scheduled from deadlines

## Architecture

```
Rules Library (shared)           Case-Specific Data              Downstream
+--------------------+      +-------------------------+     +------------------+
| cal_rules          |      | cal_trigger_events      |     | SA Connector     |
| (NM-STATE,         | ---> | (COMPLAINT-FILED,       |     |  (task creation) |
|  NM-FEDERAL,       |      |  TRIAL-DATE, etc.)      |     | FLG (filing      |
|  10TH-CIR)         |      +-------------------------+     |  deadlines)      |
+--------------------+               |                      | DPB (discovery   |
        |                    COMPUTE: trigger + offset       |  cutoffs)        |
        |                            |                      +------------------+
        v                            v                             |
+--------------------+      +-------------------------+            |
| cal_task_templates |      | cal_deadlines           |   PACKET: cal_upcoming,
| (auto-generation   | ---> | (ACTIVE, COMPLETED,     |   cal_case_summary,
|  rules for tasks)  |      |  EXTENDED, SUPERSEDED)  |   cal_workload VIEWs
+--------------------+      +-------------------------+
                                     |
                             GENERATE: template + deadline
                                     |
                                     v
                             +-------------------------+
                             | cal_work_tasks          |
                             | (PENDING, ASSIGNED,     |
                             |  IN-PROGRESS, BLOCKED)  |
                             +-------------------------+
```

## Modes / Stages

| Mode | Stage | Input | Output | Reference |
|------|-------|-------|--------|-----------|
| **EXTRACT** | 1 | Jurisdiction rules, scheduling orders, case events | cal_rules + cal_trigger_events rows via MCP | `references/extract.md` |
| **ENRICH** | 2 | Trigger events + rules library | cal_deadlines (computed) + cal_work_tasks (generated) | `references/enrich.md` |
| **VERIFY** | 3 | Computed deadlines + rule citations | Verified deadlines: rule cites confirmed, arithmetic checked | `references/verify.md` |
| **PACKET** | Any | CAL hub queries | Deadline dashboard, urgency report, or workload analysis | `references/packet.md` |

**How to pick a mode:**
- User provides scheduling order or case event dates --> **EXTRACT** (capture triggers)
- User asks to seed NM or federal rules --> **EXTRACT** (populate cal_rules)
- User wants deadline chains computed from a trigger --> **ENRICH**
- User wants work tasks generated for upcoming deadlines --> **ENRICH**
- User wants rule citations verified against current NMRA/FRCP --> **VERIFY**
- User wants a deadline dashboard or workload report --> **PACKET**

## Trigger Event Types

| Event Type | What Fires It | Example |
|------------|--------------|---------|
| `COMPLAINT-FILED` | Complaint served on defendant | Service date starts answer clock |
| `ANSWER-FILED` | Answer or responsive pleading filed | Starts discovery period |
| `TRIAL-DATE` | Trial date set by scheduling order | Reverse-engineers all pretrial deadlines |
| `DISCOVERY-SERVED` | Discovery requests served | Response deadlines (30 days NM, 30 days FED) |
| `REMOVAL-FILED` | Case removed to federal court | Resets federal deadlines |
| `SCHEDULING-ORDER` | Court issues scheduling order | Discovery cutoff, dispositive motion deadline, etc. |
| `SOL-EXPIRATION` | Statute of limitations expires | Hard deadline, non-extendable |
| `MEDIATION-DATE` | Mediation scheduled | Pre-mediation brief deadlines |
| `CMC-DATE` | Case management conference | CMC preparation deadlines |
| `CUSTOM` | Any user-defined event | Custom deadline chains |

## Deadline Status State Machine

```
                  +--> EXTENDED (new date, extended_by recorded)
                  |
ACTIVE --+--------+--> COMPLETED (completed_date recorded)
         |        |
         |        +--> SUPERSEDED (trigger changed, new deadline replaces)
         |        |
         |        +--> WAIVED (stipulation or court order)
         |
         +------------> MISSED (deadline passed without action -- CRITICAL ALERT)
```

## Hard Rules

1. **Never invent** rule citations, offset days, trigger dates, or deadline dates.
2. **All unverified rules are tagged `[VERIFY-CITE]`** until an attorney confirms against current NMRA/FRCP.
3. **SOL deadlines are CRITICAL priority and non-extendable.** is_extendable = 0. Never mark a SOL deadline as extendable.
4. **Trigger supersession cascades.** When a trigger event is superseded (e.g., trial date moved), ALL dependent deadlines must cascade to SUPERSEDED status and new deadlines computed from the replacement trigger.
5. **Never skip stages.** EXTRACT triggers first, then ENRICH computes deadlines, then VERIFY checks citations.
6. **Business day vs. calendar day matters.** NMRA 1-006(A) and FRCP 6(a) have specific counting rules. offset_type must be correctly set.
7. **Work tasks back-schedule from deadlines.** The due_date for a task is deadline_date + deadline_offset_days (typically negative, meaning days BEFORE the deadline).
8. **Capacity warnings are not suggestions.** If cal_workload VIEW shows OVER-COMMITTED for any staff member, surface this prominently in PACKET output.
9. **Reminder tiers are mandatory.** Every ACTIVE deadline must have reminder_30, reminder_14, and reminder_7 flags tracked.
10. **Filing linkage is required.** When a deadline is satisfied by a filing, filing_id must be populated linking to flg_filings.

## Required Inputs

### For EXTRACT (Seed Rules)
```xml
<cal_extract_request>
  <mode>EXTRACT</mode>
  <target>cal_rules</target>
  <jurisdiction>NM-STATE</jurisdiction>
  <rule_source>NMRA 1-012(A)</rule_source>
  <!-- Provide the rule text or scheduling order -->
</cal_extract_request>
```

### For EXTRACT (Capture Trigger)
```xml
<cal_extract_request>
  <mode>EXTRACT</mode>
  <target>cal_trigger_events</target>
  <case_id>2025-CV-00456</case_id>
  <event_type>TRIAL-DATE</event_type>
  <event_date>2026-09-15</event_date>
  <source>Scheduling Order dated 2026-01-10</source>
</cal_extract_request>
```

### For ENRICH (Compute Deadline Chain)
```xml
<cal_enrich_request>
  <mode>ENRICH</mode>
  <case_id>2025-CV-00456</case_id>
  <trigger_id>CAL-TRIG-001</trigger_id>
  <!-- Computes all deadlines from matching rules for this trigger type -->
</cal_enrich_request>
```

### For PACKET (Deadline Dashboard)
```xml
<cal_packet_request>
  <mode>PACKET</mode>
  <case_id>2025-CV-00456</case_id>
  <packet_type>upcoming_dashboard</packet_type>
  <!-- Options: upcoming_dashboard, case_timeline, workload_report, urgency_alert -->
</cal_packet_request>
```

## Output Contract (every response)

### 1) Mode + Scope Statement
What mode, what case, what trigger event(s), what jurisdiction.

### 2) Work Product
- EXTRACT: Rules seeded or triggers captured, with rule citations and source references.
- ENRICH: Deadline chain computed, work tasks generated, with date arithmetic shown.
- VERIFY: Rule citations confirmed or flagged, deadline arithmetic validated.
- PACKET: Dashboard, timeline, or workload report in structured format.

### 3) QA Summary
- Rules: total seeded, verified vs. `[VERIFY-CITE]` count
- Triggers: active vs. superseded count
- Deadlines: active, completed, overdue, urgent (within 7 days), approaching (within 14 days)
- Tasks: pending, assigned, in-progress, blocked, overdue
- Capacity: per-role hours this week vs. capacity

### 4) Next Steps
"Verify rule citations with attorney" or "Compute deadline chain from trial date trigger" etc.

## Integration Points

| System | How CAL Connects |
|--------|-----------------|
| **SmartAdvocate** | SA Connector pushes cal_work_tasks to SA task lists. Trigger events sourced from SA case data. |
| **FLG** | cal_deadlines.filing_id --> flg_filings.filing_id. Court responses (flg_court_responses) create new trigger events. |
| **DPB** | Discovery deadlines feed cal_deadlines. DPB EXTRACT triggers DISCOVERY-SERVED events. |
| **IKP** | When ikp_leads.status --> SIGNED, fires CASE-SIGNED trigger for initial deadline seeding. |
| **FIN** | Filing fee deadlines link to FIN expense tracking. |
| **PCM** | cal_deadlines.element_ids links deadlines to PCM elements (which elements are deadline-dependent). |
| **All Drafting Skills** | CAL PACKET provides deadline context for motion deadlines, response deadlines, briefing schedules. |

## CAL Tables Quick Reference

| Table | Rows Represent | Key Columns | Stage Created |
|-------|---------------|-------------|---------------|
| `cal_rules` | One per procedural rule per jurisdiction | jurisdiction, rule_source, trigger_event, offset_days, offset_type | EXTRACT (seeded) |
| `cal_trigger_events` | One per case-specific triggering event | case_id, event_type, event_date, is_active, superseded_by | EXTRACT |
| `cal_deadlines` | One per computed deadline per case | case_id, rule_id, trigger_id, deadline_date, status, priority | ENRICH |
| `cal_task_templates` | One per auto-generation rule (shared) | trigger_type, trigger_filter, estimated_hours, responsible_role | EXTRACT (seeded) |
| `cal_work_tasks` | One per assigned work item per case | case_id, deadline_id, assigned_to, due_date, status, estimated_hours | ENRICH |

## Urgency Tiers (from cal_upcoming VIEW)

| Urgency | Days Remaining | Action Required |
|---------|---------------|-----------------|
| `OVERDUE` | < 0 | Immediate escalation to attorney. Document reason for delay. |
| `URGENT` | 0-7 | Active work required this week. Daily check-in. |
| `APPROACHING` | 8-14 | Preparation should be underway. Assign tasks if not assigned. |
| `UPCOMING` | 15-30 | Awareness. Ensure resources planned. |
| `FUTURE` | 31-90 | Tracking only. No immediate action. |

## Reference Files

- `references/extract.md` -- EXTRACT stage: rule seeding patterns, trigger capture, MCP write operations
- `references/enrich.md` -- ENRICH stage: deadline computation logic, task generation from templates
- `references/verify.md` -- VERIFY stage: rule citation validation, date arithmetic audit
- `references/packet.md` -- PACKET mode: dashboard templates, urgency reports, workload analysis
