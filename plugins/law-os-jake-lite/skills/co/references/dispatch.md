# CO DISPATCH — First 48 Hours Action Items

## Purpose

Execute all critical actions within 48 hours of retainer signing: put
insurance companies on notice, preserve evidence, order initial records,
and assist the client with immediate needs.

## Priority Order

Execute in this order — highest priority first:

1. Tort Claims Notice (government defendants — may have 90-day deadline)
2. LOR to Defendant's Insurance
3. Spoliation / Preservation Letters (time-sensitive evidence)
4. LOR to Client's Auto Insurance (PIP/MedPay/UM-UIM)
5. LOR to Client's Health Insurance
6. Police/Crash Report Request
7. Initial Medical Records Requests
8. Property Damage Assistance
9. Medical Care Assistance (LOP referrals)

## Action 1: Letters of Representation

### LOR to Defendant's Insurance

**Trigger LOR skill with:**
```yaml
letter_type: standard_lor
recipient: {defendant insurance company}
incident_type: {from IKP}
requests:
  - Direct all communications to our firm
  - Provide declaration of policy limits within 30 days
  - Identify all available coverage (liability, umbrella, excess)
  - Preserve all records related to the claim
```

**Key content:**
- Statement of representation
- Direction to cease all contact with client
- Policy limits demand (30-day response)
- Preservation of evidence language
- Claim and policy numbers (if known)

### LOR to Client's Auto Insurance

**Trigger LOR skill with:**
```yaml
letter_type: standard_lor
recipient: {client auto insurance company}
purpose:
  - Open PIP/MedPay claim
  - Put on notice for potential UM/UIM claim
  - Request declarations page showing all coverages
```

**Key content:**
- Notification of representation
- MedPay/PIP claim opening
- UM/UIM notice (preserves right to claim)
- Request for declarations page (all coverages and limits)
- Direction to send all correspondence to firm

### LOR to Client's Health Insurance

**Trigger LOR skill with:**
```yaml
letter_type: standard_lor
recipient: {client health insurance company}
purpose:
  - Notify of third-party liability claim
  - Begin managing future subrogation/reimbursement liens
```

**Key content:**
- Notification of third-party claim
- Request for accounting of payments made for accident-related treatment
- Notice that liens will be negotiated at resolution
- ERISA compliance notice (if employer plan)

### Tort Claims Notice (Government Defendants)

**CRITICAL — 90-day deadline from DOI**

**Trigger LOR skill with:**
```yaml
letter_type: tort_claim_notice  # or civil_rights_notice
recipient: {government entity}
statute: NMSA §41-4-16(A)  # or NMSA §41-4A-12
```

**Must include per statutory requirements:**
- Description of the alleged negligent act
- Date, time, and place of the occurrence
- Name of the governmental entity and, if known, the public employees involved
- Description of the injuries and damages
- Amount of damages claimed

**Serve on:**
- Risk Management Division or designated agent
- Via certified mail with return receipt
- Keep copies of everything

## Action 2: Spoliation / Preservation Letters

### When to Send

| Indicator | Send Preservation Letter To |
|-----------|---------------------------|
| Commercial truck involved | Trucking company + insurer + driver employer |
| Slip/fall at business | Business + property owner/manager |
| Crash at intersection with cameras | City DOT / traffic engineering |
| Rideshare driver (Uber/Lyft) | Rideshare company legal department |
| Crash near business with cameras | Nearby businesses |
| Dog bite at apartment complex | Property management company |
| Medical facility incident | Healthcare facility risk management |

### Preservation Letter Content

**Trigger LOR skill with preservation language.** The letter must demand
preservation of:

**For trucking cases:**
- Electronic Control Module (ECM) / "black box" data
- Driver qualification file
- Hours of service logs (electronic and paper)
- Trip/dispatch records
- GPS/telematics data
- Dashcam and forward-facing camera footage
- Maintenance and inspection records
- Drug and alcohol testing records
- Training records
- Cell phone records

**For premises cases:**
- Surveillance camera footage (interior and exterior)
- Sweep/inspection/maintenance logs
- Incident/accident reports
- Employee statements
- Safety inspection records
- Prior complaint records for same hazard
- Insurance inspection reports
- Work orders for repairs

**For all cases:**
- Any photos or video
- All communications about the incident
- Electronic data (emails, texts, social media posts)
- Physical evidence (damaged property, clothing, etc.)

### Delivery Method

- **Certified mail** with return receipt requested
- **Email** to legal department (if known)
- **Fax** (if available) for immediate delivery
- Keep copies of all letters and delivery receipts
- Log in `ikp_activity_log` and case correspondence file

## Action 3: Official Reports

### Police/Crash Report

| Jurisdiction | How to Request | Typical Turnaround |
|-------------|---------------|-------------------|
| APD (Albuquerque) | Online portal or in person | 5-10 business days |
| BCSO (Bernalillo County) | Mail or in person | 5-10 business days |
| NMSP (State Police) | Mail with fee | 10-15 business days |
| Other municipal | Contact records division | Varies |

**Include:**
- Report number (from intake)
- Date of incident
- Names of parties
- Copy of police report release authorization
- Fee (if required)

### CAD / Dispatch Records

- File Inspection of Public Records Act (IPRA) request under NMSA §14-2-8
- Request CAD logs, dispatch records, unit assignment
- Include specific date/time range and location

### 911 Audio

- File IPRA request
- Specify date, time, and phone number (if known)
- Request audio recording and transcript

### Fire/EMS Reports

- Contact responding fire department records division
- Request patient care report and trip sheet
- Include HIPAA authorization

## Action 4: Initial Medical Records

### Priority Records (establish causation chain)

| Provider | Records Requested | Authorization |
|----------|------------------|---------------|
| Ambulance service | Patient care report, billing | HIPAA release |
| Emergency Room | ER records, triage notes, physician notes, imaging, labs, discharge summary | HIPAA release |
| Urgent Care (if initial visit) | Visit notes, imaging, referrals | HIPAA release |
| Treating PCP (first post-accident visit) | Office notes, referrals | HIPAA release |

### Records Request Letter Template

Send HIPAA authorization with cover letter requesting:
- All medical records from {DOI} to present
- All billing records/itemized statements from {DOI} to present
- All diagnostic imaging (X-ray, CT, MRI reports and films/discs)
- All lab results
- All referral notes
- Discharge/transfer records

**Track all requests** in a medical records log:
- Date sent
- Provider name
- Records requested
- Fee paid (if any)
- Date received
- Completeness check

## Action 5: Client Immediate Needs

### Property Damage (MVC)

1. **Locate vehicle:** Confirm where the vehicle is
   - If at tow yard, contact to prevent storage fee accumulation
   - If at body shop, confirm estimate is underway
2. **Open PD claim:** Help client open property damage claim
   - Through defendant's liability insurance (preferred)
   - Through client's collision coverage (if defendant uninsured/unknown)
3. **Rental car:** Help client obtain transportation
   - Through defendant's insurance (if liability clear)
   - Through client's rental reimbursement coverage
   - Through LOP rental provider (if no coverage)
4. **Total loss:** If vehicle is totaled
   - Advise client on fair market value (KBB, NADA)
   - Do not let client accept first offer without research
   - Negotiate if offer is below fair market value

### Medical Care (Client Lacks Coverage)

1. **Letter of Protection (LOP) referrals:**
   - Connect client with providers from firm's LOP network
   - Provider agrees to treat now, get paid from settlement later
   - LOP creates a medical lien on the settlement proceeds
2. **MedPay/PIP application:**
   - Help client file MedPay or PIP claim with own auto carrier
   - MedPay typically $5K-$25K, no-fault, no deductible
   - Can cover initial treatment costs regardless of fault
3. **Urgent referrals:**
   - If client is in pain and not being treated, arrange same-day appointment
   - Priority: get client into care immediately
   - Document the gap between DOI and treatment start (defense will argue)

## Dispatch Completion Log

After all dispatch items are initiated, log in activity log:

```yaml
activity_type: NOTE
description: "CO DISPATCH complete. LORs sent: {list with dates}. Spoliation letters: {list}. Reports requested: {list}. Medical records requested: {list}. PD status: {status}. Medical care: {status}."
outcome: COMPLETED
```

Update CO checklist with dates for each completed item.
