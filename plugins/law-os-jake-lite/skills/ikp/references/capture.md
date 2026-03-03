# IKP CAPTURE — First Contact Data Capture

## Purpose

Capture essential data from a prospective client within the first 5 minutes
of contact. Speed to lead is the #1 conversion factor in PI practice.

## Contact Response Standards

| Channel | Response Time Target | Escalation |
|---------|---------------------|------------|
| Phone (inbound) | Answer within 3 rings | If missed, return call within 5 minutes |
| Web inquiry | Outbound call within 5–15 minutes | If no answer, text + email within 30 minutes |
| Walk-in | Greet within 2 minutes | Intake coordinator or receptionist |
| Referral | Call within 1 hour | Acknowledge referring source same day |
| After-hours | Next business day 8:00 AM | After-hours answering service captures basics |

## First Contact Script

### Opening (Empathy First)

> "Thank you for calling Parnall & Adams. My name is [NAME], and I'm here to
> help you. I'm sorry to hear about what happened. Can you tell me your name
> and a little about what's going on?"

**Key principle:** Lead with empathy, not legal jargon. The prospect is often
in pain, scared, or overwhelmed.

### Data Capture Sequence

Capture in this order (highest priority first):

1. **Full legal name** — "Can I get your full legal name, as it appears on
   your ID?"
2. **Phone number** — "What's the best number to reach you?"
3. **Date of incident** — "When did this happen?" ← CRITICAL for SOL
4. **Brief description** — "In a sentence or two, what happened?"
5. **Email address** — "What's your email? We'll use it to send documents."
6. **Physical address** — "What's your mailing address?"
7. **Lead source** — "How did you hear about our firm?"
8. **Preferred contact method** — "Do you prefer calls, texts, or email?"

### If the Prospect is Reluctant

> "I completely understand your hesitation. Let me assure you that this call
> is confidential and there's no obligation. I just want to make sure we can
> help you before the clock runs out on your legal rights."

## Lead Source Classification

| Source | CMS Code | Notes |
|--------|----------|-------|
| Attorney referral | ATTORNEY-REFERRAL | Record referring attorney name |
| Current client referral | CLIENT-REFERRAL | Record referring client name |
| Bar association referral | BAR-REFERRAL | Record bar program name |
| Website contact form | WEBSITE | Record landing page if known |
| Google Ads | GOOGLE-ADS | Record campaign/keyword if available |
| Social media | SOCIAL-MEDIA | Record platform (FB, IG, TikTok, etc.) |
| TV advertisement | TV-AD | Record station/show if known |
| Radio advertisement | RADIO | Record station if known |
| Billboard | BILLBOARD | Record location if known |
| Phone (cold call-in) | PHONE | General inbound, no specific source |
| Walk-in | WALK-IN | In-person visit |
| Other | OTHER | Describe in source_detail |

## IKP Lead Record Template

```yaml
lead_id: IKP-LEAD-{YYYY}{MM}{DD}-{SEQ}
lead_date: {today ISO-8601}
source: {source code from table above}
source_detail: {campaign name, referring attorney, etc.}
contact_name: {full legal name}
contact_phone: {phone with area code}
contact_email: {email}
preferred_contact: {PHONE|EMAIL|TEXT}
incident_date: {DOI ISO-8601}
incident_type: {MVC|PREMISES|MEDICAL-MAL|WRONGFUL-DEATH|PRODUCT-LIABILITY|DOG-BITE|SLIP-FALL|WORK-INJURY|CIVIL-RIGHTS|OTHER}
incident_summary: {1-2 sentence description}
status: NEW
assigned_to: {intake staff member}
```

## Activity Log Entry Template

```yaml
activity_id: IKP-ACT-{YYYY}{MM}{DD}-{SEQ}
lead_id: {lead_id from above}
activity_date: {now ISO-8601}
activity_type: CALL-INBOUND  # or CALL-OUTBOUND, EMAIL-RECEIVED, WALK-IN, etc.
description: "Initial contact — {source}. DOI: {incident_date}. {incident_summary}"
performed_by: {staff name}
outcome: CONNECTED  # or NO-ANSWER, VOICEMAIL, SCHEDULED
followup_date: {next contact date if callback needed}
```

## After Capture — Immediate Next Steps

1. **Proceed to SCREEN mode** if all critical data captured (name, DOI, brief description)
2. **Schedule callback** if prospect needs to call back (set followup_date)
3. **Flag for priority** if incident is very recent (< 48 hours) or injuries sound severe
4. **Never let a prospect hang up** without at minimum: name + phone + DOI
