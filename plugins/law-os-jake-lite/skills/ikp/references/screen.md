# IKP SCREEN — Conflict Check, SOL Calculation & Pre-Screen

## Purpose

Before investing 45 minutes in a full interview, determine: (1) no conflicts
exist, (2) the statute of limitations is calculated and tracked, and (3) the
case passes basic viability criteria.

## Step 1: Conflict of Interest Check

### Names to Check

Before any substantive discussion, collect and check ALL of the following:

| Name Category | What to Get | Check Against |
|--------------|-------------|---------------|
| Prospective client | Full legal name, maiden name, aliases | All parties in CMS |
| Spouse/partner | If known | All parties in CMS |
| At-fault party (Defendant) | Name, business name | All current/former clients and adverse parties |
| Defendant's employer | Business name | All parties in CMS |
| Witnesses | Names if known | All parties in CMS |
| Insurance carrier | Company name | Active matters with same carrier (may not be a conflict but flag for staffing) |

### Conflict Check Procedure

1. Open CMS conflict check module
2. Enter each name — search for exact AND similar matches
3. Check current cases AND closed/archived cases
4. Document the search: who searched, when, what names, what results

### Conflict Found

If ANY name matches a current or former adverse party:

> **STOP.** Do not discuss any case details with the prospect.

1. Say: "I need to check on something with my supervisor. May I place you
   on a brief hold?"
2. Consult supervising attorney immediately
3. Attorney determines if conflict is actual or potential
4. If actual conflict: Decline the lead. Do not reveal why or give any details about the conflicting matter.
5. Update lead status to DECLINED with decline_reason = CONFLICTS
6. Send declination letter (do not mention the conflict as the reason)
7. Offer referral to another firm

### Conflict Clear

Log the conflict check in `ikp_activity_log`:

```yaml
activity_type: NOTE
description: "Conflict check CLEAR. Names checked: {list}. Searched by: {staff}."
outcome: COMPLETED
```

## Step 2: Statute of Limitations Calculation

### NM SOL Reference Table

| Claim Type | SOL Period | Statute | From When |
|-----------|-----------|---------|-----------|
| General PI / Negligence | 3 years | NMSA §37-1-8 | Date of injury |
| Medical Malpractice | 3 years | NMSA §41-5-13 | Date of occurrence OR discovery |
| Wrongful Death | 3 years | NMSA §41-2-2 | Date of death |
| Products Liability | 3 years | NMSA §37-1-8 | Date of injury |
| Government Entity (TCA) | 2 years | NMSA §41-4-15 | Date of occurrence |
| Civil Rights (Govt) | 2 years | NMSA §41-4A-14 | Date of occurrence |
| Property Damage (non-PI) | 4 years | NMSA §37-1-4 | Date of damage |
| Assault/Battery (intentional) | 3 years | NMSA §37-1-8 | Date of occurrence |

### Government Entity Notice Deadlines

**These are IN ADDITION to the SOL filing deadline:**

| Notice Type | Deadline | Statute | Consequence if Missed |
|-------------|----------|---------|----------------------|
| Tort Claims Act Notice | 90 days from DOI | NMSA §41-4-16(A) | Claim may be barred entirely |
| Civil Rights Act Notice | 90 days from DOI | NMSA §41-4A-12 | Claim may be barred entirely |

### SOL Calculation Steps

1. **Get DOI:** Already captured in CAPTURE mode
2. **Determine claim type:** Based on incident description
3. **Identify defendant type:** Private vs. Government
4. **Calculate:**
   - SOL expiration = DOI + SOL period
   - Government notice deadline = DOI + 90 days (if applicable)
5. **Determine urgency tier:**
   - Days remaining = SOL expiration - today
   - Apply urgency classification

### Urgency Tiers & Escalation

| Days Until SOL | Tier | Color | Action Required |
|---------------|------|-------|-----------------|
| ≤ 0 | **EXPIRED** | RED | SOL has passed. Decline unless discovery rule applies. Attorney review. |
| 1–30 | **CRITICAL** | RED | Immediate attorney escalation. Emergency retainer if accepting. |
| 31–90 | **URGENT** | ORANGE | Same-day attorney review. Expedited signing process. |
| 91–180 | **WATCH** | YELLOW | Priority pipeline. Schedule consultation within 1 week. |
| > 180 | **OK** | GREEN | Normal processing. |

**Government entity double-check:**
If defendant is government AND Tort Claims Notice deadline has passed (> 90 days from DOI):
→ ESCALATE to attorney immediately. The claim may already be time-barred.

### SOL Data Update

```yaml
# Update ikp_leads:
statute_date: {computed SOL expiration ISO-8601}
statute_type: {statute citation, e.g., "NMSA-37-1-8"}
defendant_type: {PRIVATE|GOVERNMENT|EMPLOYER|UNKNOWN}
```

## Step 3: Stop/Go Pre-Screen

### Pre-Screen Questions

| # | Question | GO | CONDITIONAL | STOP |
|---|----------|-----|-------------|------|
| 1 | Incident type? | MVC, Premises, Dog bite, Med mal, Wrongful death | Work injury with 3rd party | PD-only, Workers' comp only |
| 2 | Medical treatment? | ER, Hospital, Doctor, Chiro, PT | Plans to seek treatment | No injuries, no treatment |
| 3 | Fault? | Other party clearly at fault | Shared fault, unclear | Client solely at fault |
| 4 | Current representation? | No attorney | Wants to switch (confirm release) | Satisfied with current attorney |

### Decision Logic

```
IF any STOP answer → DECLINE lead
  Send declination letter
  Offer referral
  Log in activity_log

IF all GO answers → PROCEED to INTERVIEW
  Status → SCREENED

IF any CONDITIONAL (no STOP) → PROCEED to INTERVIEW with FLAGS
  Status → SCREENED
  Note flags in lead record
```

### Screen Completion

Update lead record:

```yaml
# Update ikp_leads:
status: SCREENED
statute_date: {computed}
statute_type: {citation}
defendant_type: {PRIVATE|GOVERNMENT|EMPLOYER|UNKNOWN}
```

Log the screen:

```yaml
activity_type: NOTE
description: "Pre-screen complete. Conflict: CLEAR. SOL: {date} ({urgency}). Stop/Go: {decision}. Flags: {any flags}."
outcome: COMPLETED
```
