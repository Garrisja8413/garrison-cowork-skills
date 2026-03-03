# CAL EXTRACT Stage Reference

## Purpose

The EXTRACT stage populates the CAL hub with two types of data:
1. **Jurisdiction rules** -- procedural rules from NMRA, FRCP, and local rules seeded into `cal_rules`
2. **Trigger events** -- case-specific events captured from scheduling orders, filings, and case data into `cal_trigger_events`

EXTRACT is the foundation. No deadline can be computed (ENRICH) without a rule in `cal_rules` and a trigger event in `cal_trigger_events`. Every EXTRACT operation must be traceable to an authoritative source.

---

## Part 1: Seeding Jurisdiction Rules into `cal_rules`

### 1.1 Rule Source Hierarchy

Rules are seeded from the following sources, in order of authority:

| Priority | Source | Jurisdiction Code | Example |
|----------|--------|-------------------|---------|
| 1 | Court-specific scheduling order | Case-specific override | "Discovery cutoff 60 days before trial" |
| 2 | Local rules (district) | `NM-2ND-DIST`, `NM-FED-DNM` | Second Judicial District Local Rule LR2-XXX |
| 3 | NMRA Rules of Civil Procedure | `NM-STATE` | NMRA 1-012(A), 1-033, 1-034 |
| 4 | FRCP (if federal) | `NM-FEDERAL` | FRCP 12(a), 33, 34, 56 |
| 5 | 10th Circuit rules (if appellate) | `10TH-CIR` | 10th Cir. R. 31.1, 31.2 |

### 1.2 Core NM State Rules to Seed (NMRA)

Seed these rules for every NM state personal injury case. Each rule becomes one row in `cal_rules`.

#### Answer / Responsive Pleading Deadlines

| Rule Source | Trigger Event | Offset Days | Offset Type | Description |
|-------------|---------------|-------------|-------------|-------------|
| NMRA 1-012(A) | COMPLAINT-SERVED | +30 | calendar | Answer due 30 days after service |
| NMRA 1-012(A)(1) | COMPLAINT-SERVED-STATE-AGENCY | +30 | calendar | Answer when NM state agency served |
| NMRA 1-012(E) | MOTION-TO-DISMISS-DENIED | +10 | calendar | Answer due 10 days after MTD denied |
| NMRA 1-012(A) | AMENDED-COMPLAINT-SERVED | +30 | calendar | Answer to amended complaint |

#### Discovery Deadlines

| Rule Source | Trigger Event | Offset Days | Offset Type | Description |
|-------------|---------------|-------------|-------------|-------------|
| NMRA 1-033(A) | INTERROGATORIES-SERVED | +30 | calendar | Interrogatory responses due |
| NMRA 1-034(B) | RFP-SERVED | +30 | calendar | Document production responses due |
| NMRA 1-036(A) | RFA-SERVED | +30 | calendar | RFA responses due (deemed admitted if not answered) |
| NMRA 1-030(B)(1) | DEPOSITION-NOTICE-SERVED | +14 | calendar | Minimum notice for deposition |

#### Motion Practice Deadlines

| Rule Source | Trigger Event | Offset Days | Offset Type | Description |
|-------------|---------------|-------------|-------------|-------------|
| NMRA 1-007.1(A) | MOTION-FILED | +15 | calendar | Response to motion due |
| NMRA 1-007.1(B) | MOTION-RESPONSE-FILED | +10 | calendar | Reply in support of motion due |
| NMRA 1-056(B) | SCHEDULING-ORDER | varies | calendar | MSJ deadline per scheduling order |

#### Trial-Related Deadlines (Reverse-Computed from Trial Date)

| Rule Source | Trigger Event | Offset Days | Offset Type | Description |
|-------------|---------------|-------------|-------------|-------------|
| Local/Scheduling | TRIAL-DATE | -30 | calendar | Pretrial order due (typical) |
| Local/Scheduling | TRIAL-DATE | -14 | calendar | Exhibit and witness lists due (typical) |
| Local/Scheduling | TRIAL-DATE | -7 | calendar | Motions in limine due (typical) |
| Local/Scheduling | TRIAL-DATE | -60 | calendar | Discovery cutoff (typical -- per scheduling order) |
| Local/Scheduling | TRIAL-DATE | -90 | calendar | Expert disclosure deadline (typical) |
| Local/Scheduling | TRIAL-DATE | -45 | calendar | Dispositive motions deadline (typical) |

**IMPORTANT:** Trial-related deadlines marked "typical" use negative offset_days (counted backward from trial date). Actual values MUST be confirmed against the specific scheduling order for each case. Tag as `[VERIFY-CITE]` until confirmed.

### 1.3 Core Federal Rules to Seed (FRCP)

For cases in the District of New Mexico (DNM) federal court:

| Rule Source | Trigger Event | Offset Days | Offset Type | Description |
|-------------|---------------|-------------|-------------|-------------|
| FRCP 12(a)(1)(A)(i) | COMPLAINT-SERVED | +21 | calendar | Answer due 21 days after service |
| FRCP 12(a)(1)(A)(ii) | WAIVER-OF-SERVICE | +60 | calendar | Answer due 60 days after waiver request sent |
| FRCP 12(a)(4)(A) | MOTION-TO-DISMISS-DENIED | +14 | calendar | Answer due 14 days after MTD denied |
| FRCP 33(b)(2) | INTERROGATORIES-SERVED | +30 | calendar | Interrogatory responses due |
| FRCP 34(b)(2)(A) | RFP-SERVED | +30 | calendar | Document production responses due |
| FRCP 36(a)(3) | RFA-SERVED | +30 | calendar | RFA responses due |
| FRCP 56(b) | SCHEDULING-ORDER | varies | calendar | MSJ per scheduling order |
| FRCP 6(d) | SERVICE-BY-MAIL | +3 | calendar | Add 3 days for mail service |

### 1.4 MCP Write Operation for `cal_rules`

Use the following MCP call pattern to seed a rule:

```xml
<mcp_call>
  <tool>insert_rows</tool>
  <params>
    <hub>cal</hub>
    <table>cal_rules</table>
    <rows>
      <row>
        <jurisdiction>NM-STATE</jurisdiction>
        <rule_source>NMRA 1-012(A)</rule_source>
        <rule_description>Answer due 30 days after service of complaint</rule_description>
        <trigger_event_type>COMPLAINT-SERVED</trigger_event_type>
        <offset_days>30</offset_days>
        <offset_type>calendar</offset_type>
        <is_extendable>1</is_extendable>
        <priority>HIGH</priority>
        <notes>Calendar days per NMRA 1-006(A). Extendable by stipulation or court order.</notes>
        <verification_status>VERIFIED</verification_status>
        <created_by>CAL-EXTRACT</created_by>
      </row>
    </rows>
  </params>
</mcp_call>
```

### 1.5 Rule Verification Status

Every seeded rule must have a `verification_status`:

| Status | Meaning | Action Required |
|--------|---------|-----------------|
| `VERIFIED` | Rule confirmed against current NMRA/FRCP text | None -- ready for ENRICH |
| `[VERIFY-CITE]` | Rule seeded from memory or template, not yet confirmed | Attorney must verify before relying on computed deadlines |
| `SUPERSEDED` | Rule has been amended or replaced | Do not use. Seed replacement rule. |
| `LOCAL-OVERRIDE` | Local rule or scheduling order overrides default | Note the override source in `notes` column |

---

## Part 2: Capturing Trigger Events into `cal_trigger_events`

### 2.1 Trigger Event Sources

Trigger events come from the following sources:

| Source | How Captured | Reliability |
|--------|-------------|-------------|
| Scheduling order (PDF/text) | Parse dates from scheduling order text | HIGH -- court-issued dates |
| SA case data | SmartAdvocate case fields (filing date, service date, trial date) | HIGH -- attorney-entered |
| FLG filing events | Court response or filing creates trigger | HIGH -- tracked filing |
| DPB discovery events | Discovery served/received creates trigger | HIGH -- tracked discovery |
| IKP case signing | CASE-SIGNED event when lead converts | MEDIUM -- intake data |
| Manual entry | User provides date and event type | MEDIUM -- verify source |

### 2.2 Parsing Scheduling Orders

When a scheduling order is provided, extract ALL dates into trigger events:

**Step 1:** Identify the document as a scheduling order (look for: "SCHEDULING ORDER", "PRETRIAL ORDER", "CASE MANAGEMENT ORDER", "CMC ORDER").

**Step 2:** Extract every date mentioned with its associated obligation:

```
Pattern to match:
- "Discovery shall be completed by [DATE]" --> DISCOVERY-CUTOFF trigger
- "Dispositive motions shall be filed by [DATE]" --> DISPOSITIVE-DEADLINE trigger
- "Trial is set for [DATE]" --> TRIAL-DATE trigger
- "Expert disclosures due by [DATE]" --> EXPERT-DISCLOSURE trigger
- "Mediation to be completed by [DATE]" --> MEDIATION-DATE trigger
- "Pretrial conference set for [DATE]" --> PRETRIAL-CONFERENCE trigger
```

**Step 3:** For each extracted date, create a `cal_trigger_events` row.

**Step 4:** If the scheduling order supersedes a previous one, mark old trigger events as `is_active = 0` and set `superseded_by` to the new trigger_id.

### 2.3 MCP Write Operation for `cal_trigger_events`

```xml
<mcp_call>
  <tool>insert_rows</tool>
  <params>
    <hub>cal</hub>
    <table>cal_trigger_events</table>
    <rows>
      <row>
        <case_id>2025-CV-00456</case_id>
        <event_type>TRIAL-DATE</event_type>
        <event_date>2026-09-15</event_date>
        <source_description>Scheduling Order dated 2026-01-10, filed by Judge Martinez</source_description>
        <source_document_id>DOC-2026-0110-001</source_document_id>
        <is_active>1</is_active>
        <superseded_by></superseded_by>
        <created_by>CAL-EXTRACT</created_by>
        <notes>Initial trial setting. Second Judicial District Court.</notes>
      </row>
    </rows>
  </params>
</mcp_call>
```

### 2.4 Trigger Supersession Protocol

When a trigger event is superseded (e.g., trial date moved):

1. **Query** existing active triggers for the same case_id and event_type
2. **Update** the old trigger: set `is_active = 0`, set `superseded_by = [new_trigger_id]`
3. **Insert** the new trigger event with `is_active = 1`
4. **Flag** all dependent deadlines for ENRICH re-computation (they will be marked SUPERSEDED in ENRICH)
5. **Log** the supersession in the output with: old date, new date, source of change

```xml
<mcp_call>
  <tool>update_rows</tool>
  <params>
    <hub>cal</hub>
    <table>cal_trigger_events</table>
    <where>
      <case_id>2025-CV-00456</case_id>
      <event_type>TRIAL-DATE</event_type>
      <is_active>1</is_active>
    </where>
    <set>
      <is_active>0</is_active>
      <superseded_by>CAL-TRIG-002</superseded_by>
    </set>
  </params>
</mcp_call>
```

---

## Part 3: EXTRACT Checklists

### 3.1 Rule Seeding Checklist

Before completing an EXTRACT for rule seeding, confirm:

- [ ] Jurisdiction code is correct (`NM-STATE`, `NM-FEDERAL`, `10TH-CIR`, or district-specific)
- [ ] Rule source citation is complete (e.g., "NMRA 1-012(A)" not just "Rule 12")
- [ ] Offset days are correct for the jurisdiction (NM state vs. federal differences)
- [ ] Offset type is correct (`calendar` vs. `business` -- see ENRICH reference for counting rules)
- [ ] `is_extendable` is correctly set (SOL deadlines = 0, most others = 1)
- [ ] Priority is assigned (CRITICAL for SOL, HIGH for answer deadlines, MEDIUM for discovery, LOW for administrative)
- [ ] Verification status is honest -- use `[VERIFY-CITE]` if any doubt
- [ ] No duplicate rules (query existing cal_rules for same jurisdiction + trigger_event_type + rule_source)

### 3.2 Trigger Capture Checklist

Before completing an EXTRACT for trigger capture, confirm:

- [ ] Case ID matches the SA case number format
- [ ] Event type is from the controlled vocabulary (see SKILL.md Trigger Event Types table)
- [ ] Event date is a valid date and makes chronological sense (not in the past for future events, not unreasonably far out)
- [ ] Source description identifies the document or data source
- [ ] Supersession checked: is there an existing active trigger for this case + event type?
- [ ] If superseding, old triggers are properly deactivated
- [ ] Activity log entry created documenting the trigger capture

### 3.3 Common EXTRACT Errors to Avoid

1. **Seeding federal rules for a state case** -- always confirm jurisdiction before seeding
2. **Using calendar days where business days are required** -- NMRA 1-006(A) specifies when business days apply (periods < 7 days)
3. **Missing the +3 mail service rule** -- FRCP 6(d) adds 3 days when service is by mail; NMRA 1-006(E) adds 3 days for mail service in NM state court
4. **Forgetting scheduling order overrides** -- a scheduling order deadline trumps the default rule offset
5. **Not capturing ALL dates from a scheduling order** -- parse every date, not just the trial date
6. **Seeding SOL as extendable** -- statute of limitations deadlines are NEVER extendable (is_extendable = 0)
7. **Duplicate trigger events** -- always check for existing active triggers before inserting

---

## Part 4: SOL-Specific EXTRACT Rules

Statute of limitations triggers deserve special treatment because they are CRITICAL priority and non-extendable.

### 4.1 NM SOL Triggers

| Incident Type | Statute | SOL Period | Trigger Event Type | Notes |
|---------------|---------|------------|-------------------|-------|
| Personal Injury | NMSA 37-1-8 | 3 years | SOL-EXPIRATION | From date of incident |
| Wrongful Death | NMSA 41-2-2 | 3 years | SOL-EXPIRATION | From date of death |
| Medical Malpractice | NMSA 41-5-13 | 3 years | SOL-EXPIRATION | From occurrence; discovery rule may apply |
| Govt Entity (TCA) | NMSA 41-4-15 | 2 years | SOL-EXPIRATION | PLUS 90-day notice under NMSA 41-4-16(A) |
| Workers' Comp | NMSA 52-1-31 | 1 year | SOL-EXPIRATION | From last benefit payment |
| Property Damage | NMSA 37-1-4 | 4 years | SOL-EXPIRATION | From date of damage |

### 4.2 SOL EXTRACT Protocol

1. Determine `incident_date` from case data (IKP or SA)
2. Determine `incident_type` to select the correct statute
3. Compute `sol_expiration_date = incident_date + SOL period`
4. Check for government defendants (adds TCA 90-day notice requirement)
5. Create two trigger events:
   - `SOL-EXPIRATION` with the computed date
   - `TCA-NOTICE-DEADLINE` if government defendant (incident_date + 90 days under NMSA 41-4-16(A))
6. Set priority = CRITICAL, is_extendable = 0
7. ENRICH will compute reminder deadlines at 180, 90, 60, 30, 14, and 7 days before SOL

### 4.3 Discovery Rule Warning

For medical malpractice and latent injury cases, the SOL may run from the date of discovery rather than occurrence. If the discovery rule may apply:

- Seed the SOL from occurrence date as default
- Add a note: `[DISCOVERY RULE MAY APPLY -- verify incident_date vs. discovery_date with attorney]`
- Flag as `[DECISION REQUIRED]` for attorney review
- If attorney confirms a different discovery date, supersede the original SOL trigger
