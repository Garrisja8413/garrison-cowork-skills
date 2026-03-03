# IKP SIGN — Retainer Execution & Client Onboarding

## Purpose

Formalize the attorney-client relationship by executing retainer documents,
setting client expectations, and preparing for handoff to the CO
(Case Opening) skill.

## Retainer Document Checklist

Execute all documents via e-signature (DocuSign/Clio Sign) or in-office
signing. Walk the client through each document while on the phone.

| # | Document | Purpose | Required | Notes |
|---|----------|---------|----------|-------|
| 1 | Contingency Fee Agreement | Fee structure, expense handling, withdrawal terms | YES | NM Rule 16-105(C) |
| 2 | HIPAA/HITECH Authorization | Broad medical records and billing release | YES | Must cover all providers |
| 3 | Police Report Release | Authority to obtain crash/incident reports | YES | Agency-specific forms may be needed |
| 4 | Employment Records Release | Authority to obtain wage/salary records | YES | For lost wages claims |
| 5 | 911/CAD Records Release | Authority to obtain dispatch records and audio | If applicable | Liability disputes |
| 6 | Client Acknowledgment Form | Social media rules, communication rules | YES | Signed understanding of obligations |
| 7 | Fee Schedule Disclosure | Expense categories and estimated costs | YES | NM Rule 16-105(B) transparency |

### Contingency Fee Agreement — Key Terms

| Term | Standard | Enhanced | Hybrid |
|------|----------|----------|--------|
| Pre-litigation fee | 33.33% | 40% | 25% + hourly |
| Post-filing fee | 40% | 45% | 33.33% + hourly |
| Trial fee | 40% | 45% | 40% |
| Expenses | Advanced by firm, deducted from recovery | Same | Same |
| Withdrawal | Firm may withdraw per NM Rules | Same | Same |

Record in lead:
```yaml
retainer_type: STANDARD | ENHANCED | HYBRID
fee_percentage: {basis points, e.g., 3333 for 33.33%}
```

### HIPAA Authorization — Scope

The authorization must be broad enough to cover:
- All past, present, and future medical providers
- All medical records, billing records, imaging, and test results
- Pharmacy records
- Mental health records (requires specific authorization in NM)
- Substance abuse records (42 CFR Part 2 — requires specific authorization)

## Welcome Packet — Client Rules

### Rule 1: Medical Care

> **"Your medical treatment is the foundation of your case."**

- Attend ALL scheduled appointments — cancellations and no-shows are used
  against you by the insurance company
- "Gaps in medical treatment destroy case value" — if you need to take a
  break from treatment, tell us FIRST
- Follow your doctor's instructions and treatment plan
- Do not stop treatment without discussing with your legal team
- Keep ALL medical receipts, prescriptions, and documentation
- If you cannot afford treatment, tell us — we can help with Letters of
  Protection (LOP) to qualified providers

### Rule 2: Social Media

> **"The insurance company WILL look at your social media."**

- Set ALL profiles to PRIVATE immediately (Facebook, Instagram, TikTok,
  Twitter/X, LinkedIn, Snapchat, YouTube, Strava, etc.)
- Post NOTHING about the accident, your injuries, or your legal case
- Post NOTHING showing physical activities (gym, hiking, sports, dancing)
- Do NOT accept friend requests from people you don't know personally
- Do NOT delete any existing posts (this can be considered spoliation of
  evidence and can result in sanctions)
- Do NOT create new accounts to circumvent these rules
- Tell family and friends not to post about your accident or injuries

### Rule 3: Communication with Insurance

> **"You have a lawyer now. All calls go through us."**

- Do NOT speak to any insurance adjuster — yours or the other party's
- Do NOT sign anything from any insurance company without our review
- Do NOT give a recorded statement to anyone
- Do NOT accept any settlement offer directly
- If an adjuster calls, say: "I am represented by Parnall & Adams.
  Please contact my attorney." Then give them our number and hang up.
- Forward any letters, emails, or documents from insurance companies to us

### Rule 4: Preserve Everything

> **"Evidence disappears. Help us preserve it."**

- Do NOT repair or dispose of your vehicle without our approval
- Keep ALL documentation: medical bills, pharmacy receipts, tow bills,
  rental car receipts, property damage estimates
- Preserve any photos or videos of the accident scene, your injuries,
  or your vehicle
- Save any text messages, emails, or communications with the other party
- Keep a pain journal (daily notes about pain levels, limitations, activities
  you cannot do)

### Rule 5: Stay in Touch

> **"We can't help you if we can't reach you."**

- Respond to our calls and messages within 24-48 hours
- Tell us immediately if your phone number, address, or email changes
- Tell us immediately if anything significant happens:
  - New medical symptoms or diagnoses
  - Surgery recommended
  - Insurance company contacts you
  - You receive any legal documents (lawsuit, subpoena)
  - You are in another accident
  - You return to work or change employers

## Legal Team Introduction

Provide the client with their team contacts:

```
YOUR LEGAL TEAM

Lead Attorney: [attorney name]
  Role: Oversees your case, makes legal strategy decisions

Case Manager / Paralegal: [to be assigned by CO skill]
  Role: Your day-to-day point of contact

Firm Phone: [firm phone]
Hours: [office hours]
Emergency: [emergency procedure]

Your Case Number: [to be assigned by CO skill]
```

## Sign-Off Data Updates

```yaml
# Update ikp_leads:
status: SIGNED
retainer_signed_date: {today ISO-8601}
retainer_type: {STANDARD|ENHANCED|HYBRID}
fee_percentage: {basis points}
case_id: {new case ID from CMS — assigned during CO}

# Activity log:
activity_type: STATUS-CHANGE
description: "Retainer executed. Type: {type}. Fee: {percentage}%. Documents signed: {list}. Welcome packet delivered: {method}."
performed_by: {staff name}
outcome: COMPLETED
```

## Handoff to CO (Case Opening)

Upon successful signing, the following data package transfers to the CO skill:

| Data Element | Source | Used By CO For |
|-------------|--------|---------------|
| Lead ID | ikp_leads.lead_id | Case linkage |
| Client name | ikp_leads.contact_name | CMS record |
| Contact info | ikp_leads phone/email | CMS record, communication |
| Incident date | ikp_leads.incident_date | CAL deadline seeding |
| Incident type | ikp_leads.incident_type | Case classification |
| Incident summary | ikp_leads.incident_summary | Case description |
| Injuries summary | ikp_leads.injuries_summary | Medical tracking setup |
| Defendant type | ikp_leads.defendant_type | LOR type determination |
| Insurance info | ikp_leads.insurance_carrier | LOR recipients |
| SOL date | ikp_leads.statute_date | CAL critical deadline |
| SOL type | ikp_leads.statute_type | CAL rule citation |
| Fee structure | ikp_leads.retainer_type + fee_percentage | FIN setup |
| Estimated value | ikp_leads.estimated_value | Case prioritization |

**CO skill activation:** `status = SIGNED` is the trigger event.
