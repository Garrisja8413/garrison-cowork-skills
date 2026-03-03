# IKP EVALUATE — Attorney Case Evaluation

## Purpose

Provide the reviewing attorney with a structured framework to assess the
Three Pillars of a PI case (Liability, Damages, Source of Recovery) and
make an accept/decline decision.

## Attorney Review Packet

Present the following to the reviewing attorney in this order:

### 1. Case Summary Header

```
INTAKE EVALUATION — [Lead ID]
Date: [today]
Prospect: [contact_name]
DOI: [incident_date]
Incident Type: [incident_type]
SOL Expiration: [statute_date] — [days remaining] days ([urgency tier])
Government Entity: [YES/NO] — Tort Claims Notice: [deadline or N/A]
Intake Staff: [assigned_to]
```

### 2. Quick-Glance Assessment

| Factor | Rating | Notes |
|--------|--------|-------|
| Liability | Strong / Moderate / Weak / Unknown | |
| Damages | Catastrophic / Significant / Moderate / Minimal | |
| Recovery Source | Confirmed / Likely / Unknown / Unlikely | |
| Pre-Screen Flags | {list any CONDITIONAL flags} | |
| SOL Urgency | {tier} | |

## Pillar 1: Liability Analysis

### Negligence Elements Checklist

| Element | Evidence | Strength |
|---------|----------|----------|
| **Duty** | What duty did the defendant owe? | Standard/Heightened/Unclear |
| **Breach** | How did the defendant breach that duty? | Clear/Arguable/Weak |
| **Causation** | Does the evidence show defendant's breach caused the injury? | Direct/Circumstantial/Disputed |
| **Damages** | What harm resulted? | Documented/Claimed/Speculative |

### Liability Evidence Inventory

| Evidence Type | Available | Status | Notes |
|--------------|-----------|--------|-------|
| Police report | YES/NO/PENDING | | Report #, agency |
| Citations issued | YES/NO | | To whom, for what |
| Witness statements | YES/NO | | # of witnesses, favorable/adverse |
| Dashcam/video | YES/NO/UNKNOWN | | Source, preservation status |
| Photos | YES/NO | | Scene, vehicles, injuries |
| Defendant admission | YES/NO | | At scene, to police, to adjuster |

### Comparative Fault Assessment (NM Pure Comparative — NMSA §41-3A-1)

- Estimated client fault: ____%
- Basis for any client fault: ___
- NM allows recovery even at 99% fault (pure comparative)
- Verdict reduced by client's percentage of fault

### Special Liability Considerations

- [ ] Government defendant — Tort Claims Act immunity analysis needed
- [ ] Employer liability (respondeat superior)
- [ ] Commercial vehicle — federal motor carrier regulations
- [ ] Premises liability — notice requirement (actual/constructive)
- [ ] Product defect — strict liability theory available
- [ ] Medical malpractice — expert affidavit requirement
- [ ] Dram shop — alcohol-related, server liability
- [ ] Dog bite — strict liability under NM law

## Pillar 2: Damages Analysis

### Injury Severity Classification

| Tier | Description | Examples | Typical Value Range |
|------|-------------|---------|-------------------|
| **Catastrophic** | Life-altering, permanent | TBI, paralysis, amputation, death | $500K+ |
| **Severe** | Surgery required, extended recovery | Disc surgery, multiple fractures, internal organ damage | $150K–$500K |
| **Significant** | Substantial treatment, lasting effects | Disc herniations, torn ligaments, chronic pain | $50K–$150K |
| **Moderate** | Extended treatment, full recovery expected | Sprains/strains, minor fractures, soft tissue with PT | $15K–$50K |
| **Minor** | Brief treatment, quick recovery | Bruises, minor strains, 1-2 chiro visits | < $15K |

### Damages Components

| Component | Present | Details |
|-----------|---------|---------|
| Past medical bills | YES/NO | $ amount or estimate |
| Future medical (surgery) | YES/NO | Procedure + estimate |
| Future medical (ongoing) | YES/NO | PT, pain management, etc. |
| Lost wages (past) | YES/NO | Duration, income level |
| Lost earning capacity | YES/NO | Permanent limitations? |
| Pain & suffering | YES/NO | Severity, duration, daily impact |
| Loss of enjoyment | YES/NO | Activities lost |
| Loss of consortium | YES/NO | Spouse claim |
| Punitive damages | YES/NO | Gross negligence, DUI, intentional |
| Property damage | YES/NO | Vehicle total/repair |

### Pre-Existing Condition Impact

| Condition | Body Part | Treatment History | Impact on Case |
|-----------|-----------|-------------------|----------------|
| {condition} | {area} | {prior treatment} | Aggravation theory / Eggshell plaintiff |

**NM Law:** Under the eggshell plaintiff doctrine, a defendant takes the
plaintiff as they find them. Pre-existing conditions that are aggravated
by the incident are compensable. The key is proving the incident WORSENED
the pre-existing condition.

## Pillar 3: Source of Recovery

### Insurance Coverage Map

| Source | Carrier | Limits | Status |
|--------|---------|--------|--------|
| Defendant liability | {carrier} | {limits or UNKNOWN} | Claim opened? |
| Client UM/UIM | {carrier} | {limits or UNKNOWN} | Available? |
| Client MedPay/PIP | {carrier} | {limits or UNKNOWN} | Opened? |
| Client health insurance | {carrier} | N/A | Lien/subrogation? |
| Employer coverage | {if applicable} | {limits} | Respondeat superior? |
| Commercial coverage | {if applicable} | {limits} | Federal minimums? |
| Umbrella/excess | {if applicable} | {limits} | |

### Coverage Red Flags

- [ ] Defendant uninsured — UM claim only
- [ ] Defendant minimum policy ($25K NM minimum) — underinsured?
- [ ] Government defendant — Tort Claims Act damages cap ($750K per person)
- [ ] Medicare/Medicaid lien — MSP compliance required
- [ ] ERISA health plan — federal preemption for lien resolution
- [ ] Workers' comp lien — if work-related component
- [ ] No coverage identified — asset investigation needed

## Decision Matrix

### ACCEPT Criteria (any ONE sufficient)

1. **Clear liability + significant damages + identified coverage** → Standard accept
2. **Catastrophic damages regardless of liability clarity** → Always investigate
3. **Government defendant within notice period + significant damages** → Priority accept
4. **Strong liability + moderate damages + coverage** → Standard accept
5. **Multiple defendants with stacking coverage** → Complex but valuable

### DECLINE Criteria (any ONE sufficient)

1. **No physical injury / no medical treatment** → Property damage only
2. **SOL expired with no discovery rule argument** → Time-barred
3. **Client 100% at fault with no viable theory** → No liability
4. **No insurance, no assets, no coverage** → No recovery source
5. **Conflicts of interest** → Ethical bar
6. **Client represented and not seeking change** → Already has counsel

### CONDITIONAL (Requires Further Investigation)

- Liability unclear but damages high → Accept and investigate
- Coverage unknown → Accept and send policy limits demand
- Pre-existing conditions significant → Accept with causation caveat
- Shared fault but NM comparative → Accept (recovery reduced, not barred)

## Accept Process

```yaml
# Update ikp_leads:
status: ACCEPTED
estimated_value: {LOW|MEDIUM|HIGH|CATASTROPHIC}

# Activity log:
activity_type: STATUS-CHANGE
description: "Case ACCEPTED by [attorney]. Rationale: [brief reasoning]. Estimated value: [tier]. Next: execute retainer."
performed_by: {attorney name}
```

**Next step:** Proceed to IKP SIGN mode.

## Decline Process

```yaml
# Update ikp_leads:
status: DECLINED
decline_reason: {LOW-VALUE|NO-LIABILITY|CONFLICTS|SOL-EXPIRED|COVERAGE-ISSUE|CLIENT-UNRESPONSIVE}

# Activity log:
activity_type: STATUS-CHANGE
description: "Case DECLINED by [attorney]. Reason: [reason]. Declination letter to be sent within 24 hours."
performed_by: {attorney name}
```

**Mandatory within 24 hours:**

### Non-Engagement / Declination Letter

The letter MUST include:

1. **Clear statement:** The firm is NOT representing the client in this matter
2. **No investigation disclaimer:** The firm has NOT investigated the merits of the claim
3. **SOL warning:** "You may have a limited time to pursue your legal rights. The statute of limitations for your type of claim may expire on or about [DATE]. We strongly urge you to consult with another attorney immediately."
4. **No advice given:** The firm is not providing legal advice and has not evaluated the claim
5. **File retention:** The firm will not retain any documents provided

**Send via:** Certified mail AND email (for proof of delivery)

**Log:** Record the declination letter in `ikp_activity_log` with tracking number

### Referral (Optional but Recommended)

If appropriate, offer a referral:
- To a firm that handles the specific case type
- To the NM State Bar Lawyer Referral Service
- Note the referral in the declination letter and activity log
- Update `referred_to` field in `ikp_leads` if referring out
