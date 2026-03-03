# DPW Phase 6: Tickler & Escalation Protocol — Reference

## Purpose

Enforce deadlines aggressively and control the negotiation tempo. Law firms lose
credibility when they let demand deadlines expire without consequence. Phase 6
ensures the firm maintains absolute discipline: every deadline is monitored,
every response is handled strategically, and every impasse triggers immediate
action.

Phase 6 has three steps:
- Step 13: System Docketing & The "15-Day Nudge"
- Step 14: Handling the Adjuster's Response
- Step 15: The "Drop Dead" Impasse & Filing Suit

---

## Part 1: System Docketing & The "15-Day Nudge" (Step 13)

### 1.1 CAL Docketing Events

When the demand is transmitted (Phase 5, Step 12), the paralegal enters the
following events into the Case Management System via the CAL skill:

| CAL Event | Date | Alert | Responsible | Action |
|-----------|------|-------|-------------|--------|
| **DEMAND-SENT** | Day 0 (transmission date) | — | Paralegal | Log transmission method, tracking numbers |
| **DEMAND-NUDGE** | Day 15 | Day of, AM | Paralegal | Execute 15-day nudge protocol |
| **DEMAND-DEADLINE** | Day 30 (or per demand letter) | Day 25 (5-day warning) + Day 30 | Lead Attorney + Paralegal | Evaluate response / declare impasse |
| **DEMAND-EXPIRATION** | Day 30 (same as deadline) | Day 30, with ESCALATION flag | Lead Attorney | MANDATORY: declare impasse OR accept settlement |

### 1.2 The 15-Day Nudge Protocol

On Day 15, the paralegal contacts the adjuster proactively. This serves two
strategic purposes:
1. **Eliminates the delay excuse:** The adjuster cannot later claim they were
   "missing records" or "didn't receive the package" if you confirmed receipt
   on Day 15.
2. **Builds the bad faith record:** A documented, courteous follow-up on Day 15
   shows the firm acted reasonably and gave the carrier every opportunity to
   evaluate the claim.

**Nudge call script:**

```
"Good [morning/afternoon], this is [NAME] from [FIRM] calling regarding
the demand we submitted on [DATE] for [CLIENT NAME] under Claim #[NUMBER].

I'm calling to confirm you received the complete demand package,
including the medical records and supporting exhibits.

Do you need any additional records or clarification to complete your
evaluation?

As noted in the demand, the response deadline is [DEADLINE DATE].
Please let me know if there are any questions."
```

**After the call, document:**

| Item | Record |
|------|--------|
| Date and time of call | [datetime] |
| Person spoken with | [name, title] |
| Confirmed receipt? | YES / NO / VOICEMAIL |
| Missing records requested? | YES (list) / NO |
| Estimated evaluation timeline provided? | [response] |
| Follow-up needed? | YES (action) / NO |

**If adjuster claims missing records:**
1. Verify the records were included in the transmitted package (check Bates index)
2. If records were included: send email confirming they were included at Bates
   [range], with the records re-attached
3. If records were genuinely missing: provide them immediately and document the
   gap in the DPW record
4. This eliminates the adjuster's classic excuse: "We were waiting for a $50
   x-ray bill."

**If adjuster has not been assigned:**
1. Escalate to the claims supervisor
2. Demand immediate assignment
3. Document the delay — this is bad faith evidence (failure to promptly
   investigate under NMSA §59A-16-20(A))

### 1.3 Nudge Documentation Template

```
15-DAY NUDGE LOG — [CASE_CODE]
================================
Demand Sent: [DATE]
Nudge Date: [DATE] (Day 15)

Contact Attempt:
  Time: [TIME]
  Method: Phone / Email / Both
  Person Contacted: [NAME, TITLE]
  Carrier: [CARRIER NAME]

Confirmed Receipt: YES / NO / VOICEMAIL
Missing Records Requested: [NONE / list items]
Records Provided: [NONE / list items provided]
Adjuster Evaluation Status: [in progress / not started / complete]
Estimated Response Date: [date if provided]
Follow-Up Required: YES / NO — [action if YES]

Documented by: [PARALEGAL NAME]
```

---

## Part 2: Handling the Adjuster's Response (Step 14)

### 2.1 Response Categories

When the adjuster responds (or the deadline approaches), the response falls
into one of these categories:

| Response | DPW Action | Next Step |
|----------|------------|-----------|
| **Full acceptance** | Settlement accepted at demand amount | → Settlement Disbursement Phase |
| **Reasonable counter** | Counter within negotiation range | → Bracketed negotiations (2.3) |
| **Lowball counter** | Insultingly low counter-offer | → Lowball protocol (2.2) |
| **Policy limits tender** | Carrier tenders full policy limits | → Limits acceptance protocol (2.4) |
| **Denial** | Claim denied entirely | → Impasse protocol (Part 3) |
| **Request for extension** | Adjuster asks for more time | → Extension protocol (2.5) |
| **No response** | Deadline passes with no communication | → Impasse protocol (Part 3) |

### 2.2 The Lowball Counter Protocol

**Definition:** A counter-offer that is so far below the case's documented value
that it reflects an unreasonable evaluation of the claim.

**Critical rule: Do NOT bid against yourself.** When an adjuster counters with
an insultingly low number, the instinct is to drop the demand significantly.
This is a trap — it signals that the firm's original demand was inflated and
teaches the adjuster that lowball counters work.

**Protocol:**

1. **Demand the rationale:** Request the adjuster's specific rationale and
   their summary report detailing exactly why they discounted the medical bills,
   treatment, and damages.

   ```
   "Before we respond to your evaluation, we need to understand your
   analysis. Please provide:
   (a) Your itemized breakdown of which medical expenses you accepted
       and which you discounted, with specific reasons for each discount;
   (b) Your evaluation methodology for non-economic damages;
   (c) Any records or information you believe are missing from our package;
   (d) Your authority level and whether supervisory review has been completed."
   ```

2. **Analyze the rationale:** Review the adjuster's response for unreasonable
   discounts that constitute bad faith under the NM Unfair Claims Practices Act.

3. **Get client authority:** Present the lowball to the client with your analysis.
   Get authority for a specific counter-offer amount.

4. **Counter strategically:** Make ONE calculated counter-reduction. Do not
   enter a rapid back-and-forth bidding war.

### 2.3 Bracketed Reductions Protocol

When negotiations are in a reasonable range, use calculated, decreasing
concessions to signal firm resolve:

**Bracketing pattern:**

| Round | Plaintiff Position | Movement | Signal |
|-------|-------------------|----------|--------|
| Opening demand | $100,000 | — | Anchored per DRO analysis |
| Counter 1 | $90,000 | -$10,000 (10%) | Willing to negotiate but serious |
| Counter 2 | $85,000 | -$5,000 (5.6%) | Decreasing concessions = approaching floor |
| Counter 3 | $82,500 | -$2,500 (2.9%) | Nearly at bottom — this is the number |
| Final | Walk-away | $0 further | Done negotiating |

**Bracketing rules:**
- Each concession is SMALLER than the previous one (decreasing concessions)
- Never make a concession without a corresponding counter from the defense
- Never drop below the client's authorized walk-away number
- Document each round in the Escalation Tracker with the client's authority
- If the adjuster stops moving: declare impasse

### 2.4 Policy Limits Tender Protocol

**If the carrier tenders the full policy limits, do NOT immediately accept.**
Complete these steps first:

| Step | Action | Why |
|------|--------|-----|
| 1 | **Verify no excess/umbrella** | Search for umbrella or excess policies. Check ICM. Ask the adjuster directly: "Are there any excess or umbrella policies that may provide additional coverage?" If yes → do NOT sign a general release and pursue the additional coverage. |
| 2 | **Verify tender is unconditional** | The tender must not require a general release of parties beyond the insured. Watch for attempts to release co-defendants or additional insureds. |
| 3 | **Verify tender covers ALL claims** | If the incident involves multiple claims (e.g., PI + property damage), verify the tender covers all claims or only some. |
| 4 | **Client authority** | Confirm with the client that accepting policy limits is authorized. Update the Settlement Authority Directive if the tender is less than the original demand. |
| 5 | **Preserve excess claims** | If damages genuinely exceed limits, preserve the right to pursue the tortfeasor personally for the excess. Do not sign a release that waives this right. |
| 6 | **Move to disbursement** | Once verified, accept the tender and transition to the Settlement Disbursement Phase. |

### 2.5 Extension Request Protocol

| Situation | DPW Response |
|-----------|-------------|
| Adjuster requests 7-14 day extension with specific reason | Grant ONE extension. Confirm new deadline in writing. Docket new deadline in CAL. |
| Adjuster requests open-ended extension | Deny. "We can grant a [7/14]-day extension to [NEW DATE]. The demand will be withdrawn if not resolved by that date." |
| Adjuster requests second extension | Deny unless extraordinary circumstances. Any further delay = bad faith evidence. |
| Adjuster requests extension on the deadline date | Deny. The firm set the deadline for a reason. Extensions requested at the last minute suggest bad faith delay tactics. |

**Extension documentation:**
```
EXTENSION LOG — [CASE_CODE]
Original Deadline: [DATE]
Extension Requested: [DATE] by [ADJUSTER NAME]
Reason: [reason provided]
Extension Granted: YES / NO
New Deadline: [DATE]
Documented in CAL: YES
Client Notified: YES
```

---

## Part 3: The "Drop Dead" Impasse & Filing Suit (Step 15)

### 3.1 Impasse Declaration

If the deadline expires or the adjuster refuses to reach the client's Bottom
Line (Phase 3, Step 7 walk-away number), the pre-litigation phase immediately
ends. There is no further negotiation. The firm's credibility depends on
following through.

**Impasse triggers:**

| Trigger | Condition |
|---------|-----------|
| **Deadline expired** | Response deadline passed with no acceptable offer |
| **Denial received** | Carrier denied the claim entirely |
| **Below walk-away** | Final counter is below the client's authorized bottom line |
| **Bad faith conduct** | Adjuster engaged in bad faith tactics (delay, refusal to investigate, misrepresentation) |
| **No response** | No communication received despite nudge and deadline |

### 3.2 Impasse Letter

**Send immediately upon impasse:**

```
[DATE]

[ADJUSTER NAME]
[CARRIER NAME]
[ADDRESS]

Re: [CLIENT NAME] v. [INSURED NAME]
     Claim #[NUMBER]

Dear [ADJUSTER NAME]:

Because [CARRIER NAME] failed to reasonably evaluate this claim
within the time provided, our demand dated [DEMAND DATE] is hereby
formally and permanently withdrawn.

[If lowball:] Your final evaluation of $[AMOUNT] against documented
damages of $[AMOUNT] reflects an unreasonable and bad faith failure
to properly evaluate this claim in violation of NMSA §59A-16-20.

[If no response:] Your failure to respond to our demand within
the [X]-day deadline — despite our confirmed follow-up on [NUDGE DATE]
— constitutes bad faith delay in violation of NMSA §59A-16-20.

Enclosed for your records is a courtesy copy of the Complaint filed
today in [COURT], Case No. [NUMBER].

[CARRIER NAME] is hereby placed on notice that [CLIENT NAME] will
pursue all available remedies, including but not limited to:
- Compensatory damages for [injuries];
- Punitive damages for [CARRIER NAME]'s bad faith conduct;
- Attorney's fees and costs;
- Pre-judgment and post-judgment interest.

All future communications should be directed to the undersigned.

[FIRM SIGNATURE BLOCK]

Enclosure: Filed Complaint (courtesy copy)
```

### 3.3 File Suit — Immediate Transition

**The threat of a lawsuit is only effective if the firm actually files it the
moment the deadline blows. Do not bluff.**

**Impasse-to-filing protocol:**

| Step | Action | Timeline |
|------|--------|----------|
| 1 | **Declare impasse** | Day of deadline expiration |
| 2 | **Notify client** | Same day — phone call to inform client of impasse and next steps |
| 3 | **Client authority for suit** | Obtain written authority to file lawsuit (may already be in retainer agreement) |
| 4 | **Draft complaint** | Route to Complaint skill immediately |
| 5 | **File complaint** | File within 5 business days of impasse (sooner if SOL is near) |
| 6 | **Send impasse letter** | Send with courtesy copy of filed complaint on the day of filing |
| 7 | **Transition to litigation** | Move the file to the Litigation Department. DPW workflow is complete. |
| 8 | **Update CMS** | Change case status from "Demand" to "Litigation — Filed" |
| 9 | **Update CAL** | Docket all litigation deadlines (service, answer, scheduling conference) |

### 3.4 Bad Faith Preservation After Filing

After filing suit, preserve all bad faith evidence:

| Evidence | Location | Preservation Action |
|----------|----------|-------------------|
| Original demand letter | Case file | Retain original + proof of delivery |
| Certified mail return receipt (green card) | Case file | Scan and preserve |
| Email delivery receipts / read receipts | Case file | Screenshot and save |
| 15-day nudge call notes | DPW Escalation Tracker | Retain in case file |
| Adjuster's lowball rationale | Case file | Retain as bad faith exhibit |
| Extension correspondence | Case file | Retain as timeline evidence |
| Impasse letter | Case file | Retain + proof of delivery |
| All negotiation correspondence | Case file | Preserve chronologically |
| DPW Escalation Tracker | Case file | Print and preserve as summary exhibit |

### 3.5 Post-Filing Demand Opportunities

Filing suit does not permanently close the door to settlement. However, any
post-filing settlement discussions occur in the **litigation context** with
different leverage:

| Litigation Event | Settlement Leverage Change |
|-----------------|--------------------------|
| Answer filed | Discovery rights activated — can compel document production |
| Written discovery served | Defense must reveal claim file, internal evaluations |
| Depositions taken | Adjuster and insured testimony locked in |
| MSJ denied | Trial is certain — settlement pressure increases |
| Trial date set | "Trial tax" — settlement value increases as trial date approaches |
| Mediation ordered | Structured settlement opportunity with neutral mediator |

---

## Part 4: Escalation Tracker Template

```
DPW ESCALATION TRACKER
========================
Case: [CASE_CODE]
Demand Amount: $[AMOUNT]
Walk-Away: $[AMOUNT]
Demand Sent: [DATE]
Deadline: [DATE]

TIMELINE LOG
| Date | Day# | Event | Detail | Next Action | Due |
|------|------|-------|--------|-------------|-----|
| [date] | 0 | Demand transmitted | Cert mail + email | Monitor delivery | Day 3 |
| [date] | 3 | Delivery confirmed | Green card / read receipt | — | — |
| [date] | 15 | 15-day nudge | Called [NAME] | [response] | Day 30 |
| [date] | 25 | 5-day warning | Internal alert | Prepare for impasse | Day 30 |
| [date] | 30 | Deadline | [response received / expired] | [action] | — |

NEGOTIATION LOG
| Date | Round | Party | Position | $ Amount | Authority | Notes |
|------|-------|-------|----------|----------|-----------|-------|
| [date] | 1 | Plaintiff | Demand | $[amt] | Per SAD | Opening |
| [date] | 1 | Defense | Counter | $[amt] | — | [lowball / reasonable] |
| [date] | 2 | Plaintiff | Counter | $[amt] | Client auth [date] | Bracket 1 |
| [date] | 2 | Defense | Counter | $[amt] | — | [analysis] |
| ... | | | | | | |

RESOLUTION
| Field | Value |
|-------|-------|
| Status | OPEN / SETTLED / IMPASSE / FILED SUIT |
| Settlement Amount | $[amt] or N/A |
| Date Resolved | [date] or PENDING |
| Complaint Filed | YES / NO — Case #[number] if YES |
| Impasse Letter Sent | YES / NO — [date] if YES |
```

---

*CONFIDENTIAL — Attorney Work Product*
