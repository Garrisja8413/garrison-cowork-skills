# CO HANDOFF — Transition to Pre-Litigation Monitoring

## Purpose

Close the case-opening loop by making the introductory client call,
establishing the recurring check-in cadence, and activating the
pre-litigation monitoring plan.

## Action 1: Introductory Call (Within 48 Hours of Signing)

### Who Makes the Call

The assigned **Case Manager or Paralegal** — NOT the intake coordinator
and not necessarily the attorney. This person will be the client's
primary day-to-day contact for the duration of the case.

### Call Script

> "Hello [Client Name], this is [Name] from Parnall & Adams. I'm the
> [Case Manager/Paralegal] assigned to your case. I wanted to introduce
> myself and let you know that I'll be your main point of contact going
> forward. How are you feeling today?"

**Cover these points:**

#### 1. Team Introduction
- "Your lead attorney is [Attorney Name]. [He/She] will be overseeing
  the strategy and legal decisions on your case."
- "For day-to-day questions — scheduling, documents, updates — you can
  reach me directly at [phone] or [email]."
- "Our office number is [firm phone]. You can call anytime during
  business hours."

#### 2. Confirm LOR Status
- "We've sent letters to the insurance companies letting them know
  we represent you. This means they should not be contacting you
  directly anymore."
- "If anyone from an insurance company does call you, please tell
  them you have an attorney and give them our number."

#### 3. Review Key Rules
- **Medical care:** "The most important thing you can do for your case
  right now is follow your doctor's treatment plan. Missing appointments
  gives the insurance company a reason to reduce your claim."
- **Social media:** "Please make sure all your social media accounts are
  set to private. Don't post anything about the accident or your injuries."
- **Communication:** "If any insurance company contacts you, don't talk to
  them. Just give them our number."

#### 4. Set Timeline Expectations
- "Here's how the process works: Right now, we're in the treatment phase.
  Your job is to focus on getting better. Our job is to collect all your
  medical records and build your case."
- "Once your doctors say you've recovered as much as you're going to —
  we call that 'Maximum Medical Improvement' — we'll put together a
  demand package for the insurance company."
- "If the insurance company won't offer a fair settlement, we have the
  option to file a lawsuit. But most cases resolve before that."
- "I'll be checking in with you regularly to see how you're doing and
  keep you updated on the case."

#### 5. Address Immediate Questions
- "Do you have any questions for me right now?"
- "Is there anything you need help with — medical care, your vehicle,
  anything?"

#### 6. Confirm Contact Info
- "Let me confirm your contact information is current..."
- Phone, email, address
- "What's the best time to reach you for our check-in calls?"

### Log the Call

```yaml
activity_type: CALL-OUTBOUND
description: "Introductory call with client. Introduced as case manager. Confirmed LORs sent. Reviewed medical care, social media, and communication rules. Timeline expectations set. Client questions addressed: {summary}. Next check-in: {date}."
performed_by: {case manager name}
outcome: CONNECTED
followup_date: {first check-in date}
```

## Action 2: Establish Check-In Cadence

### Cadence Selection

| Case Severity | Check-In Frequency | Rationale |
|--------------|-------------------|-----------|
| CATASTROPHIC | Every 7-14 days | Active treatment, high stakes, frequent updates |
| HIGH / Significant injuries | Every 14 days | Regular treatment, close monitoring |
| MEDIUM / Standard | Every 21-30 days | Standard treatment course |
| LOW / Soft tissue | Every 30 days | Shorter treatment, routine |

### CMS Task Setup

Create the following recurring tasks:

```
Task: Client Check-In Call — {CASE_CODE}
Assigned To: {Case Manager}
Frequency: Every {14|21|30} days
Start Date: {first check-in date}
Description: "Call client to check on recovery, treatment compliance, provider changes. Update medical provider list. Document in activity log."

Task: Medical Records Status Review — {CASE_CODE}
Assigned To: {Legal Assistant}
Frequency: Every 30 days
Start Date: {30 days from signing}
Description: "Review outstanding medical records requests. Follow up on unfilled requests. Update records received log."

Task: Attorney Case Review — {CASE_CODE}
Assigned To: {Lead Attorney}
Frequency: Every 60 days
Start Date: {60 days from signing}
Description: "Review case status, treatment progress, liability developments, coverage updates. Assess if case strategy needs adjustment."

Task: Comprehensive Case Assessment — {CASE_CODE}
Assigned To: {Lead Attorney + Case Manager}
Frequency: Every 90 days
Start Date: {90 days from signing}
Description: "Full case review: liability strength, damages trajectory, coverage status, lien estimates, settlement timing, resource allocation."
```

### Check-In Call Protocol

Each check-in call should cover:

| Topic | Questions | Update Action |
|-------|-----------|--------------|
| Physical status | "How are you feeling? Pain levels? New symptoms?" | Note changes |
| Treatment | "Are you attending all appointments? Any missed?" | Flag gaps |
| New providers | "Have you started seeing any new doctors?" | Add to tracking |
| Work | "Any changes to your work status?" | Update lost wages |
| Insurance contact | "Has anyone from insurance contacted you?" | Intervene if needed |
| Daily life | "How are things day-to-day? Any improvements or setbacks?" | Document for P&S |
| Questions | "Do you have any questions about your case?" | Address or escalate |

### Document Every Check-In

```yaml
activity_type: CALL-OUTBOUND
description: "Check-in call. Physical status: {summary}. Treatment: {compliance}. New providers: {any}. Work status: {status}. Insurance contact: {any}. Client concerns: {any}. Next check-in: {date}."
performed_by: {case manager}
outcome: CONNECTED | NO-ANSWER | VOICEMAIL
followup_date: {next check-in date}
```

**If no-answer or voicemail:**
- Leave message
- Send follow-up text or email
- Try again within 24-48 hours
- After 3 failed attempts, escalate to attorney
- Document each attempt

## Action 3: Pre-Litigation Monitoring Activation

### Active Monitoring Items

| Item | Responsible | Frequency | Tracking Method |
|------|-------------|-----------|-----------------|
| Medical records collection | Legal Assistant | Ongoing | Records request log |
| Medical bills tracking | Legal Assistant | As received | Running specials total |
| Provider list maintenance | Case Manager | Per check-in | CMS contact records |
| Treatment compliance | Case Manager | Per check-in | Activity log notes |
| Insurance coverage investigation | Paralegal | As needed | Coverage summary |
| Liens tracking | Paralegal | Monthly | Lien tracking spreadsheet |
| Property damage resolution | Paralegal | Until resolved | PD status log |
| Evidence preservation follow-up | Paralegal | Monthly until received | Preservation log |
| Police report follow-up | Legal Assistant | Until received | Records request log |
| Witness follow-up | Paralegal | As needed | Witness contact log |

### Lien Tracking Setup

Begin tracking all potential liens from Day 1:

| Lien Type | Source | Action | NM Law |
|-----------|--------|--------|--------|
| Health insurance (private) | Client's carrier | Negotiate at settlement | Common law/contract |
| Health insurance (ERISA) | Employer plan | ERISA preemption — full reimbursement may apply | 29 USC §1132 |
| Medicare | CMS/Medicare | Mandatory reporting, conditional payments | 42 USC §1395y(b) |
| Medicaid | NM HSD | State lien, negotiate | NMSA §27-2-23 |
| VA/Tricare | Federal government | Federal lien | 38 USC §1729 |
| Workers' comp | Employer's WC carrier | If work-related component | NMSA §52-5-17 |
| MedPay/PIP | Client's auto carrier | Subrogation rights | Policy terms |
| Ambulance | City/county | Government lien | Varies |
| Hospital | Hospital | Hospital lien statute | NMSA §48-8-1 |

### MMI Watch Protocol

**What is MMI?**
Maximum Medical Improvement — the point at which the client's condition has
stabilized and further treatment is not expected to produce significant
improvement. The treating physician makes this determination.

**Indicators to watch for:**
- Doctor states "no further treatment recommended"
- Doctor releases client from care
- Doctor recommends maintenance-only treatment
- Doctor provides permanent impairment rating
- Treatment plateaus (symptoms stable, no new interventions)

**When MMI is reached:**
1. Confirm MMI with treating physician(s)
2. Order FINAL medical records from all providers
3. Order FINAL billing statements from all providers
4. Obtain narrative report from treating physician (if needed)
5. Transition to settlement preparation:
   - CFP EXTRACT on final medical records
   - DVP build for damages valuation
   - DC for damages calculation
   - DRO for insurer scoring analysis
   - Demand letter preparation

## CO Completion

When all three phases (SETUP, DISPATCH, HANDOFF) are complete:

1. Run the CO CHECKLIST to verify all items are done
2. Log the CO completion:

```yaml
activity_type: NOTE
description: "CO case opening workflow COMPLETE. All setup, dispatch, and handoff items finished. Case in active pre-litigation monitoring. Next check-in: {date}. Next attorney review: {date}."
performed_by: {case manager}
outcome: COMPLETED
```

3. The case is now in the pre-litigation monitoring phase
4. Ongoing tasks are managed through the CMS recurring task system
5. The next major milestone is MMI → settlement preparation
