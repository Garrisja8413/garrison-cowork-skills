---
name: letter-of-representation
display_name: "Letter of Representation"
description: >-
  Draft Letters of Representation (LOR), Tort Claim Notices, and Civil Rights
  Act Notices for New Mexico personal injury practice. CRITICAL TRIGGERS - Use
  for (1) any letter notifying parties of representation, (2) ANY claim
  against government entities/public bodies (City, County, State, police,
  fire, public schools, etc.) - these ALWAYS require Tort Claim Notice under
  NMSA §41-4-1, (3) ANY claim against law enforcement involving constitutional
  rights - requires Civil Rights Act Notice under NMSA §§41-4A-1, (4)
  preservation/spoliation letters, (5) follow-up letters when no response
  received. Accepts police reports, intake notes, or sanitized case
  information. Generates formatted Word documents with firm letterhead (v1.0)
version: "1.0"
category: correspondence
pack_consumes:
  - Intake info
pack_produces:
  - LOR
  - Tort Claim Notice
checkpoints: 0
author: "Parnall & Adams"
license: Proprietary
---

# Letter of Representation Skill

Draft professional Letters of Representation and statutory notices as formatted Word documents for New Mexico personal injury practice.

## CRITICAL: Letter Type Decision Tree

**ALWAYS START HERE** - Determine letter type based on recipient:

```
Is the claim against a GOVERNMENT ENTITY or PUBLIC BODY?
(City, County, State, APD, BCSO, Fire Department, Public School, etc.)

├─ YES → Is it about LAW ENFORCEMENT conduct / constitutional rights?
│         ├─ YES → CIVIL RIGHTS ACT NOTICE (NMSA §§41-4A-1)
│         └─ NO  → TORT CLAIM NOTICE (NMSA §41-4-1)
│
└─ NO  → Is this a follow-up to a previous letter?
          ├─ YES → FOLLOW-UP LETTER (no response / insufficient)
          └─ NO  → STANDARD LOR (insurer/business/property owner)
```

**Key Recognition Patterns:**

**Tort Claim Notice triggers:**
- "City of Albuquerque"
- "Bernalillo County"
- "State of New Mexico"
- "Albuquerque Police Department" (non-civil rights matters)
- "Fire Department"
- "Public Schools"
- "County Sheriff"
- "State agency" (MVD, CYFD, etc.)
- Any government-owned property or facility

**Civil Rights Act Notice triggers:**
- "APD" or "Albuquerque Police Department" (civil rights/excessive force)
- "BCSO" or sheriff's office (civil rights)
- "certified law enforcement officer"
- "police misconduct"
- "excessive force"
- "constitutional rights violation"
- "false arrest" / "unlawful detention"

**Standard LOR triggers:**
- Insurance companies (Geico, State Farm, Progressive, etc.)
- Businesses (Walmart, Target, restaurants, etc.)
- Property owners/managers
- Registered agents
- Adjusters

## Scope

**IN SCOPE:**
- Process intake information: police reports, intake notes, initial client statements
- Extract relevant facts and sanitize PHI/PII
- Generate Word documents with firm letterhead (from `shared/config/firm-config.yaml`)
- Standard LORs to insurers, businesses, property owners
- Tort Claim Notices (government entities)
- Civil Rights Act Notices (law enforcement)
- Follow-up letters

**OUT OF SCOPE:**
- Anything requiring raw medical records with PHI identifiers
- Sealed materials
- Privileged strategy memos (work with sanitized surrogates)

**STOP SIGN:** If user provides non-sanitizable PHI, respond: "OUT OF SCOPE — requires BAA environment"

## Quick Start Workflow

### Step 1: Intake & Information Gathering

**Accept any of these input formats:**

**A. Police Reports**
- Extract: date, location, parties involved, narrative
- Sanitize: remove SSNs, DOBs, medical details
- Flag: witnesses, evidence, responding officers

**B. Intake Notes**
- Extract: incident summary, injuries, timeline
- Sanitize: use client initials, remove identifiers
- Flag: insurance info, potential defendants

**C. Sanitized Case Packet** (preferred)
- Matter ID and case name
- Incident basics (date, location, type)
- Parties (client, defendants, insurers)
- Brief incident summary (2-6 sentences)

**D. Verbal Description**
- Listen for: who, what, when, where
- Ask: recipient entity, incident type
- Determine: letter type using decision tree

### Step 2: Determine Letter Type

**USE THE DECISION TREE ABOVE** - This is critical!

**If recipient is government/law enforcement** → TCN or Civil Rights Notice  
**If recipient is private entity** → Standard LOR  
**If this is a follow-up** → Follow-Up Letter

**Recipient-specific protocol:**
- Defendant recipient → use spoliation-forward language.
- Witness recipient → use cooperative tone and narrow requests.
- Insurer recipient (including UM/UIM) → include coverage-position requests.

### Step 3: Load Reference Files

Before drafting, read:

**ALWAYS read:**
- references/letter-types.md (for letter structure and recipient-specific protocols)
- references/request-library.md (for VERBATIM request language)

**Read when needed:**
- references/nm-authorities.md (for citations)

### Step 4: Gather Required Information

**For ALL letters:**
- Date (default to today)
- Recipient entity name + address
- Service method (Certified Mail, Email, Fax)
- Client reference (use initials: `[MERGE:ClientInitials]`)
- Incident date
- Incident location (city/state, non-sensitive)
- Incident summary (2-6 sentences, sanitized)

**Additional for TCN:**
- Government entity full legal name
- Specific tortious conduct alleged
- Injuries/damages summary

**Additional for Civil Rights Notice:**
- Law enforcement agency name
- Agency email address
- Constitutional rights violated
- Law enforcement officer conduct (if known)

**Additional for Standard LOR:**
- Incident type (car crash, premises, slip/fall, etc.)
- Request categories needed (basic, preservation, incident-specific)
- Insurance info (claim#, policy# as merge tokens)

### Step 5: Generate Content

**Build letter content following references/letter-types.md structure:**

1. Date + service method
2. Recipient address
3. RE: line (Claimant, Date of Incident, Location)
4. Opening paragraph (representation statement)
5. Incident summary (sanitized)
6. Document requests (VERBATIM from request-library.md)
7. Preservation language (VERBATIM from request-library.md)
8. Closing
9. Signature block

**Use merge tokens where applicable:**
- `[MERGE:MatterID]`
- `[MERGE:CaseName]`
- `[MERGE:ClientInitials]`
- `[MERGE:DefendantName]`
- `[MERGE:AccidentDate]`
- `[MERGE:ClaimNo]` (insurance claims)
- `[MERGE:PolicyNo]` (insurance policies)

### Step 6: Create Word Document

**Use the scripts/generate_letter.py script to create formatted .docx:**

1. Prepare JSON content structure
2. Call script to generate Word document
3. Document will include firm letterhead (from shared config) and proper formatting

**Example JSON structure:**
```json
{
  "letter_type": "tort_claim_notice",
  "date": "January 15, 2026",
  "service_method": "By Mail and Fax to (555) 555-5555",
  "recipient_address": "City of Albuquerque\\nOffice of Risk Management\\nP.O. Box 1293\\nAlbuquerque, NM 87103",
  "claimant": "[MERGE:ClientInitials]",
  "incident_date": "[MERGE:AccidentDate]",
  "location": "Albuquerque, New Mexico",
  "entity_name": "City of Albuquerque",
  "incident_facts": "[Sanitized incident description]",
  "injuries": "[Sanitized injury summary]",
  "attorney_name": "[ATTORNEY NAME]",
  "initials": "[INIT]/[INIT]",
  "output_path": "/mnt/user-data/outputs/[FILENAME].docx"
}
```

### Step 7: Generate Output Package

**Return to user:**

**1. Word Document** (.docx file)
- Formatted with letterhead
- Ready for SmartAdvocate import
- Merge tokens preserved

**2. Cite Table** (internal tracking)

| # | Assertion | Evidence | Confidence | Notes |
|---|-----------|----------|------------|-------|

**3. Gate Results**
- Cite completeness: X%
- Jurisdiction coverage
- Request coverage (all categories included?)

**4. Next Requests**
- Missing information needed
- Missing documents to cite
- Items to verify

**5. Open Items**
- `[VERIFY]` items (addresses, deadlines, statutes)
- `[DECISION REQUIRED]` items (admission of liability? revocation language?)

## Intake Processing Guidelines

### Processing Police Reports

**Extract:**
- Report number and date
- Incident date/time/location
- Reporting officer(s)
- Parties involved (names → initials)
- Narrative summary
- Witness information
- Evidence collected

**Sanitize:**
- Replace full names with initials
- Remove DOBs, SSNs, medical record numbers
- Remove specific addresses (use city/intersection only)
- Remove phone numbers

**Flag for attorney:**
- Conflicting statements
- Missing evidence
- Witness contact needed
- Criminal charges filed

### Processing Intake Notes

**Extract:**
- How injury occurred
- Who was responsible
- Where it happened
- When it happened
- What injuries resulted

**Organize into:**
- Timeline (date-ordered events)
- Parties (client, defendants, witnesses)
- Incident type classification
- Potential claims/theories

**Sanitize:**
- Client = initials only
- Medical details = general descriptions
- Financial info = ranges or merge tokens

### Common Intake Scenarios

**Car Crash:**
- Vehicles involved
- Insurance information
- Police report reference
- Injuries sustained
- Fault determination

**Premises Liability:**
- Property owner/manager
- Incident type (slip/fall, assault, etc.)
- Hazard/condition present
- Notice to owner (actual/constructive)
- Security measures (if applicable)

**Government Entity:**
- IMMEDIATELY identify as needing TCN
- Determine if law enforcement involved (→ Civil Rights Notice)
- Note any actual notice to entity
- Calculate deadlines

## Critical Rules

**1. VERBATIM REQUEST LANGUAGE**
Use request language exactly as written in request-library.md. No modifications. This ensures discovery requests match LOR language word-for-word (spoliation defense).

**2. PRESERVE MERGE TOKENS**
Never convert merge tokens to plain text. SmartAdvocate will populate them.

**3. SANITIZATION DISCIPLINE**
- Client = `[MERGE:ClientInitials]`
- Claim/Policy = merge tokens only (not in narrative)
- No PHI identifiers in any narrative

**4. LETTER TYPE DECISION IS CRITICAL**
Government entity = TCN or Civil Rights Notice (NOT standard LOR)
Use the decision tree at the top of this document.

**5. GENERATE ACTUAL WORD DOCUMENTS**
Do not just output text. Use scripts/generate_letter.py to create formatted .docx files.

## Output Modes

**Filing-Ready (default):**
- Minimal placeholders
- All request language verbatim from library
- Complete Word document with formatting

**Quick Draft (only if user says "Quick Draft"):**
- More placeholders allowed
- Still includes Cite Table + gates
- Still generates Word document

## Follow-Up Letters

When user says "draft follow-up" or "no response received":

**Gather:**
- Original letter date
- Response status (none / insufficient / partial)
- Days elapsed
- Specific items still missing

**Adjust tone:**
- Professional but firmer
- Note deadline passed
- Emphasize preservation obligations
- May mention next steps if no response

## Save to SmartAdvocate

**After generating Word document:**

**Standard LOR:** Correspondence → Rep Letters  
**TCN:** Correspondence → Government / Tort Claims  
**Civil Rights Notice:** Correspondence → Government / Civil Rights  
**Follow-up:** Same category as original

**Naming:** `[MERGE:MatterID] — [Letter Type] — YYYY-MM-DD — v1`

## Common Pitfalls to Avoid

1. **Wrong letter type** - ALWAYS use decision tree for government entities
2. **Modified request language** - Must be VERBATIM from library
3. **Broken merge tokens** - Preserve exactly
4. **Text output instead of Word doc** - Must generate .docx
5. **Missing TCN for government claims** - Any city/county/state entity needs TCN
6. **Generic spoliation language** - Use NM case citations
7. **Missing revocation/disavowal** - Include for standard LORs

## Pack Locations (v1.1)

**Read CFP from:** `cases/{CASE_CODE}/cfp/`
**Read DPB from:** `cases/{CASE_CODE}/dpb/` (if applicable to this skill)
**Read LP from:** `law-packs/` (global) + `law-packs/law-of-the-case/{CASE_CODE}/` (if exists)
**Save draft output to:** `cases/{CASE_CODE}/drafts/`
**Naming:** `LOR-{CASE_CODE}-{Descriptor}-DRAFT.docx`

**Law-of-the-case check:** Before drafting, check whether `law-packs/law-of-the-case/{CASE_CODE}/` contains an LOTC pack. If it does, load it alongside the global LP. Flag any LOTC overrides in the Cite Table with `[LOTC]` tag so the attorney knows which legal points are governed by case-specific rulings.

## Detailed Reference Files

- Letter structures & examples → references/letter-types.md
- Standardized requests (VERBATIM) → references/request-library.md
- NM case law & statutes → references/nm-authorities.md

## Examples

**Example 1: Police Report Input**
User: "Draft LOR from this police report: APD responded to shooting at 5609 Central Ave NW on 10/14/2022. Victim Alex Lueras was shot by Hope Tapia at apartment complex."

Response: *Identifies government property/APD involvement* → "This involves the Roadrunner Apartments (private property) but APD was involved. Since the claim would be against the property owner (not APD), this needs a **Standard LOR** to the property owner/manager. However, if there's also a claim against APD for investigation failures, we'd need a separate **Tort Claim Notice**. Which entity should this letter go to?"

**Example 2: Government Entity**
User: "Draft letter to City of Albuquerque for negligent maintenance of sidewalk causing trip and fall."

Response: *City = government entity* → "This requires a **Tort Claim Notice** under NMSA §41-4-1. [Proceeds to draft TCN with proper statutory language]"

**Example 3: Law Enforcement Civil Rights**
User: "Draft notice to APD regarding excessive force during traffic stop."

Response: *APD + constitutional rights* → "This requires a **Civil Rights Act Notice** under NMSA §§41-4A-1 because it involves law enforcement conduct and constitutional rights violations. [Proceeds to draft Civil Rights Notice with proper format]"
