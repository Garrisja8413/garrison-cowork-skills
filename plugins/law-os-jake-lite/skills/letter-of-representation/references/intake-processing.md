# Intake Processing Guide

How to process police reports, intake notes, and initial client information into letter content.

---

## Overview

Initial information often comes in messy formats:
- Scanned police reports (narrative format)
- Handwritten intake notes
- Client email descriptions
- Phone call summaries
- Witness statements

This guide helps convert raw intake into sanitized, structured letter content.

---

## Processing Police Reports

### Step 1: Identify Key Information

**Always extract:**
- Report number (for cite table)
- Report date
- Incident date/time
- Incident location (address/intersection)
- Reporting officer(s)
- Case number

**Parties involved:**
- Victim/plaintiff (will be sanitized)
- Suspect/defendant
- Witnesses
- Other involved parties

**Narrative:**
- What happened (sequence of events)
- Statements made
- Officer observations
- Evidence collected/photographed

### Step 2: Sanitize

**Client information:**
```
Original: "John David Smith, DOB 01/15/1985, SSN XXX-XX-XXXX"
Sanitized: "[MERGE:ClientInitials]" or "JDS"
```

**Addresses:**
```
Original: "123 Main Street SW, Apt 4B, Albuquerque, NM 87102"
Sanitized: "intersection of Main Street and Central Avenue SW, Albuquerque, NM" 
    OR "[INCIDENT LOCATION]" (for merge)
```

**Medical information:**
```
Original: "transported to UNMH with gunshot wounds to chest and abdomen"
Sanitized: "transported to local hospital with serious injuries"
    OR "[CLIENT] suffered [INJURY DESCRIPTION]"
```

**Phone numbers, emails, SSNs:**
```
Remove entirely or use: "[CONTACT INFORMATION REDACTED]"
```

### Step 3: Structure for Letter

**Convert narrative into 2-6 sentence summary:**

```
Original Police Report Narrative (500 words):
"Officers responded to 5609 Central Ave NW on 10/14/2022 at approximately 0520 hours 
regarding shots fired. Upon arrival, officers observed blood trail leading from 
Apartment 12 to the parking lot. Witness statements indicate male subject later 
identified as Alex Lueras was involved in verbal altercation with female subject 
later identified as Hope Tapia inside apartment. Tapia allegedly retrieved firearm 
and shot Lueras multiple times. Lueras fled apartment and was assisted to nearby 
fire station by witness. Lueras transported to UNMH with multiple GSW..."

Sanitized Summary (3 sentences):
"On October 14, 2022, [CLIENT] was shot multiple times at the Roadrunner Apartments 
located at 5609 Central Ave NW, Albuquerque, NM. The shooting occurred during a 
dispute in an apartment unit. [CLIENT] sustained serious injuries requiring immediate 
hospitalization."
```

### Step 4: Flag Issues for Attorney

Note in "Next Requests" or "Open Items":
- Conflicting witness statements
- Missing evidence (video, photos)
- Criminal charges status
- Additional parties not yet identified

---

## Processing Intake Notes

### Common Intake Note Formats

**Phone intake:**
```
"Client called. Says she slipped at Walmart on 1/10. Wet floor. Broke wrist. 
Has surgery scheduled. Store manager took report. Workers comp denied."
```

**Convert to structured:**
- Who: [CLIENT] 
- What: Slip and fall on wet floor
- When: January 10, 2026
- Where: Walmart, [City, State]
- Injury: Broken wrist, surgery scheduled
- Defendant: Walmart (+ property owner if different)
- Evidence: Store incident report exists
- Special notes: Workers comp denial (not workers comp case)

**Email intake:**
```
"I was in car accident last Tuesday on I-40 and Eubank. Guy ran red light and 
hit my car. Police came. I went to ER. State Farm called but haven't heard back. 
Need lawyer."
```

**Convert to structured:**
- Who: [CLIENT]
- What: Motor vehicle collision, t-bone at intersection
- When: [LAST TUESDAY DATE]
- Where: I-40 and Eubank, Albuquerque, NM
- Injury: ER treatment required (get details)
- Defendant: Other driver (get name from police report)
- Insurer: State Farm (for other driver? for client? clarify)
- Evidence: Police report (need to obtain)

### Missing Information Checklist

**Before drafting, verify you have:**
- [ ] Incident date
- [ ] Incident location (city/state minimum)
- [ ] Incident type classification
- [ ] Defendant/responsible party identity
- [ ] Insurance information (if available)
- [ ] Basic injury description (sanitized)
- [ ] Whether government entity involved (TCN needed?)

**If missing, use placeholders:**
- `[INCIDENT DATE]`
- `[LOCATION DESCRIPTION]`
- `[DEFENDANT NAME]`
- `[INSURANCE COMPANY]`

---

## Incident Type Classification

### Car Crashes

**Key info needed:**
- Date/time/location
- Vehicles involved
- Insurance for each vehicle
- Police report reference
- Fault determination
- Injuries

**Letter type:** Standard LOR to at-fault driver's insurer

**Request categories:** Basic + car crash categories (vehicle info, driver info, EDR data if serious)

### Premises Liability - Slip/Trip/Fall

**Key info needed:**
- Date/time/location
- Property owner/manager
- Hazard/condition (wet floor, uneven surface, ice, etc.)
- Notice to owner (how long was hazard present?)
- Incident report filed?
- Injuries

**Letter type:** Standard LOR to property owner/manager

**Request categories:** Basic + premises + slip/fall (floor logs, inspection records, lighting if relevant)

### Premises Liability - Violent Crime

**Key info needed:**
- Date/time/location
- Property type (apartment, parking lot, business)
- Nature of crime (shooting, assault, robbery)
- Prior crimes at location (foreseeability)
- Security measures (cameras, lighting, security guard)
- Police report
- Injuries

**Letter type:** Standard LOR to property owner/manager

**Request categories:** Basic + premises + security (video, crime history, security policies, previous complaints)

**Special considerations:** 
- May also have TCN if government property
- May also have Civil Rights Notice if police involved in misconduct

### Government Property or Entity

**Triggers TCN:**
- City/County/State property
- Public facility (library, park, rec center)
- Government vehicle
- Government employee acting in scope
- Police, fire, EMS (if not civil rights)

**Key info needed:**
- Specific government entity
- Date/time/location
- Nature of negligence
- Injuries
- Actual notice (did government know about hazard?)

**Letter type:** Tort Claim Notice

### Law Enforcement - Civil Rights

**Triggers Civil Rights Notice:**
- Excessive force
- False arrest
- Unlawful detention
- Search violations
- Any constitutional rights violation

**Key info needed:**
- Agency name and address
- Officer name(s) if known
- Date/time/location
- Specific conduct alleged
- Constitutional rights violated
- Injuries (physical and/or rights deprivation)

**Letter type:** Civil Rights Act Notice

---

## Sanitization Quick Reference

### Always Sanitize

| Type | Raw Data | Sanitized Version |
|------|----------|-------------------|
| Client name | John David Smith | [MERGE:ClientInitials] or JDS |
| Client DOB | 01/15/1985 | [DOB REDACTED] or omit |
| Client SSN | 123-45-6789 | [SSN REDACTED] or omit |
| Address (specific) | 123 Main St SW, Apt 4B | Intersection of Main & Central SW |
| Phone | (505) 555-1234 | [CONTACT REDACTED] or omit |
| Medical record # | MRN 987654 | [MRN REDACTED] or omit |
| Detailed medical | GSW to L chest, hemothorax, chest tube | Serious injuries requiring hospitalization |
| Insurance claim # | CLM-123456 | [MERGE:ClaimNo] |
| Insurance policy # | POL-ABC123 | [MERGE:PolicyNo] |

### Okay to Include (Already Public or Non-Sensitive)

- Incident date
- Incident location (city, intersection, business name)
- Defendant/business entity name
- Insurance company name (not claim/policy numbers)
- General injury description ("broken wrist," "back injuries")
- Police report number (public record)

---

## Examples: Raw to Sanitized

### Example 1: Police Report (Premises Security)

**Raw intake:**
```
APD Case 2022-12345. Officers responded to shooting at Roadrunner Apartments, 
5609 Central Ave NW #12, on 10/14/2022 at 0520 hrs. Victim Alex Lueras, 
DOB 03/15/1992, SSN 456-78-9101, shot 8x by Hope Tapia in apt. Blood trail 
from apt to parking lot. Victim assisted to Fire Station 7, 5715 Central Ave NW. 
AMR transported to UNMH. GSW to head, chest, abdomen, R leg. Tapia fled scene. 
Warrant issued. Property manager "Polly" (no last name) uncooperative.
```

**Sanitized for LOR:**
```
On October 14, 2022, [MERGE:ClientInitials] was shot multiple times by a resident 
or guest at the Roadrunner Apartments located at 5609 Central Ave NW, Albuquerque, 
NM. Mr. [LAST NAME] sustained serious injuries requiring immediate hospitalization 
and ongoing treatment. The shooting occurred on the property premises, raising 
concerns about property security measures and foreseeability of violent crime.
```

**For Cite Table:**
- Incident date: Police report APD-2022-12345, p. 1
- Location: Police report APD-2022-12345, p. 1
- Injury description: Police report APD-2022-12345, p. 3; UNMH medical records [to be obtained]

### Example 2: Phone Intake (Slip & Fall)

**Raw intake notes:**
```
Client: Maria Gonzalez
Phone: 505-123-4567
Called: 1/15/26
Says: Slipped at Target on 1/10/26 around 2pm. Wet floor by produce. 
No sign. Fell hard. Hurt back and left wrist. Went to ER. X-rays. 
Nothing broken but bruised bad. Still hurts. Missed 3 days work. 
Target gave her incident report number T-45678. Manager's name was Kevin.
```

**Sanitized for LOR:**
```
On January 10, 2026, [MERGE:ClientInitials] slipped and fell at the Target store 
located in [CITY, STATE]. The fall occurred on a wet floor near the produce section 
where no warning signage was present. [CLIENT] sustained injuries to her back and 
left wrist requiring emergency room treatment. Target staff prepared an incident 
report (reference number T-45678).
```

**For Cite Table:**
- Incident date: Client statement 1/15/26; Target incident report T-45678 [to be obtained]
- Wet floor: Client statement 1/15/26
- No warning sign: Client statement 1/15/26  
- Injuries: ER records from [HOSPITAL] 1/10/26 [to be obtained]

**For Next Requests:**
- Obtain Target incident report T-45678
- Obtain ER records from [HOSPITAL]
- Obtain witness statements (employees, customers)
- Confirm Target property owner/manager info

### Example 3: Email Intake (Government - TCN)

**Raw email:**
```
From: john.smith@email.com
Subject: Trip and Fall - Need Lawyer

I tripped on broken sidewalk in front of City Hall on Jan 5th. The concrete 
was all buckled up. I fell and broke my arm. Had surgery. City didn't fix it 
even though I called them about it last year. Can you help?
```

**Identify:** City property = **NEEDS TORT CLAIM NOTICE**

**Sanitized for TCN:**
```
On January 5, 2026, [MERGE:ClientInitials] tripped and fell on a broken, 
buckled section of sidewalk in front of Albuquerque City Hall. The City of 
Albuquerque had actual notice of the hazardous condition, as [CLIENT] had 
previously reported the defect to the City approximately one year prior to 
the incident. As a result of the City's failure to repair the known hazard, 
[CLIENT] suffered a broken arm requiring surgical intervention.
```

**Critical for TCN:**
- Government entity: City of Albuquerque
- Actual notice: Client had reported defect ~1 year before
- Tortious conduct: Failure to maintain/repair sidewalk
- Injuries: Broken arm, surgery required

---

## Special Scenarios

### Multiple Defendants

**Scenario:** Client injured in car crash. Hit by drunk driver who was over-served at bar.

**Approach:**
- Separate LORs to each defendant
- LOR #1 to drunk driver's insurer (car crash categories)
- LOR #2 to bar/restaurant (dram shop categories)

**Do NOT combine into single letter unless all defendants share same insurer.**

### Government + Private Defendants

**Scenario:** Client assaulted in parking lot of government building by private security guard.

**Approach:**
- TCN to government entity (for failure to provide safe premises)
- Standard LOR to security company (for employee's conduct)

### Unclear Defendant

**Scenario:** Client slipped at shopping center. Not sure if it's tenant store or property owner responsible.

**Approach:**
- Start with property owner/manager
- Request in LOR: "Please forward this letter immediately to [TENANT NAME] and their insurance carrier"
- Follow up with separate letter to tenant once identified

---

## Intake → Letter Workflow Summary

```
1. Receive raw intake (police report, notes, email, call)
   ↓
2. Identify incident type + determine letter type
   ↓
3. Extract key facts (who, what, when, where, injuries)
   ↓
4. Sanitize PHI/PII (initials, general descriptions, merge tokens)
   ↓
5. Structure into 2-6 sentence summary
   ↓
6. Flag missing information for "Next Requests"
   ↓
7. Select appropriate request categories from library
   ↓
8. Generate Word document with proper letter type
   ↓
9. Review Cite Table for completeness
   ↓
10. Identify items needing verification
```

---

## Red Flags During Intake

**Requires immediate attorney attention:**
- Minor involved (under 18)
- Death or catastrophic injury
- Multiple parties injured
- Complex liability (multiple defendants)
- Deadline concerns (government entity, statute of limitations)
- Criminal charges pending against client
- Conflicting accounts of incident
- Potential need for expert witnesses

**Note these in "Open Items" section of output.**
