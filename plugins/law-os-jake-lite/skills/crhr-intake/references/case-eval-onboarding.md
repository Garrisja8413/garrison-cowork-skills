# Phase 3: Case Evaluation & Client Onboarding

## Purpose

Attorney evaluates the case for viability, selects the optimal legal forum
(NMCRA vs. § 1983 vs. both), executes a specialized fee-shifting retainer
agreement, and delivers the mandatory "Fishbowl" warning about life becoming
public record.

## Step 7: Attorney Review — Forum Selection Strategy

### The NM Advantage: NMCRA vs. § 1983

The 2021 New Mexico Civil Rights Act (NMCRA, NMSA §§ 41-4A-1 et seq.)
fundamentally changed civil rights litigation in New Mexico by banning
qualified immunity for state and local actors. The attorney must evaluate
which legal vehicle — or combination — maximizes the client's recovery.

### Forum Comparison Matrix

| Factor | NM State Court (NMCRA) | Federal Court (§ 1983) |
|--------|----------------------|----------------------|
| **Qualified Immunity** | BANNED — officers cannot use it | AVAILABLE — major defense hurdle |
| **Damages Cap** | $2,000,000 per occurrence (damages + attorney fees combined) | UNCAPPED |
| **Attorney Fees** | Statutory fee-shifting (NMCRA § 41-4A-13) | § 1988 fee-shifting |
| **Jury Pool** | NM state jury (Bernalillo County, etc.) | Federal jury (D.NM) |
| **Docket Speed** | Generally faster | Generally slower |
| **Discovery** | NM Rules of Civil Procedure | Federal Rules of Civil Procedure |
| **Appeal** | NM Court of Appeals → NM Supreme Court | 10th Circuit → US Supreme Court |
| **Interlocutory Appeal (QI)** | N/A — no QI defense | Defendant can take immediate appeal on QI denial |
| **Government Liability** | Direct entity liability under NMCRA | Monell liability required for § 1983 entity claims |
| **Punitive Damages** | May be available | Available against individual officers |
| **Statute of Limitations** | 2 years (§ 41-4A-14) | 3 years (NMSA § 37-1-8 borrowed) |

### Forum Selection Decision Framework

| Scenario | Recommended Forum | Reasoning |
|----------|------------------|-----------|
| Strong liability, damages under $2M | **NMCRA (State)** | No QI defense, faster resolution, sufficient cap |
| Catastrophic damages (above $2M) | **§ 1983 (Federal)** or **Both** | Uncapped damages justify QI risk |
| Clearly established law (QI likely denied) | **§ 1983 (Federal)** | Uncapped + strong QI denial argument |
| Novel legal theory (QI likely granted) | **NMCRA (State)** | Avoid QI dismissal in federal court |
| Pattern/practice claims | **Both (parallel)** | Federal for policy claims, state for individual |
| Employment discrimination | **NMHRA (State)** + **Title VII (Federal)** | Cross-file for maximum leverage |
| Federal agent defendant | **FTCA/Bivens (Federal)** only | NMCRA does not apply to federal actors |
| Jail conditions | **Both** | State avoids PLRA if grievances deficient |

### Viability Evaluation: Four Pillars

The attorney assesses four pillars specific to civil rights cases:

#### Pillar 1: Constitutional Violation
- Is there a clearly identifiable constitutional or statutory violation?
- Does the evidence support the violation? (not just the client's word)
- How strong is the video evidence?
- Are there corroborating witnesses?

#### Pillar 2: Damages
- Physical injury severity
- Duration of unlawful detention
- Employment losses quantified
- Emotional distress documented and in treatment
- Punitive damages factors (willfulness, pattern, cover-up)

#### Pillar 3: Defendant Exposure
- Individual officer(s) identifiable and served
- Entity liability viable (Monell for § 1983, direct for NMCRA)
- Insurance/indemnification coverage available
- Government entity's history of settlements in similar cases

#### Pillar 4: Legal Barriers
- Heck v. Humphrey status (CLEAR / PENDING / PLEA / CONVICTED)
- PLRA exhaustion status (EXHAUSTED / DEFICIENT / N/A)
- Tort Claims Notice deadline (met / expired / within window)
- Statute of limitations (within period / expired)
- Comparative fault (client's own conduct)

### Evaluation Decision Matrix

| Violation | Damages | Barriers | Decision |
|-----------|---------|----------|----------|
| Strong + video evidence | Significant | None | **ACCEPT** — high-value case |
| Strong + video evidence | Moderate | None | **ACCEPT** — standard civil rights case |
| Strong + video evidence | Significant | Pending criminal | **CONDITIONAL** — coordinate with criminal counsel |
| Strong + video evidence | Any | Heck plea (battery on officer) | **LIKELY DECLINE** — Heck-barred |
| Moderate (no video) | Significant | None | **ACCEPT** — develop evidence through IPRA |
| Moderate (no video) | Minor | None | **DECLINE** — insufficient damages |
| Weak | Any | Any | **DECLINE** — insufficient violation evidence |
| Any | Catastrophic (death/permanent) | Any except Heck | **ACCEPT** — always investigate catastrophic |
| NMHRA discrimination | Documented losses | Within 300 days | **ACCEPT** — evaluate strength of comparators |
| NMHRA discrimination | Emotional only | Within 300 days | **CONDITIONAL** — need strong comparator evidence |

### If DECLINED

Mandatory actions within 24 hours:
1. Update `crhr_leads.status` → `DECLINED`
2. Set `decline_reason`
3. Send formal Non-Engagement / Declination Letter
4. Include in letter:
   - Statement that the firm is NOT representing the client
   - Warning about ALL applicable deadlines with specific dates
   - Specific warning about 90-day Tort Claims Notice if applicable
   - Recommendation to seek other counsel immediately
   - Statement that the firm has NOT investigated the claim
5. Log the declination in `crhr_activity_log`

### If ACCEPTED

1. Update `crhr_leads.status` → `ACCEPTED`
2. Record `forum_selection` (NMCRA / SECTION-1983 / BOTH / NMHRA / FTCA)
3. Assign estimated_value
4. Proceed to retainer execution (Step 8)

## Step 8: Execute Specialized Retainer Agreements

### Hybrid Fee Agreement (Civil Rights Specific)

Civil rights retainers differ fundamentally from standard PI contingency
agreements because of statutory fee-shifting provisions. Both 42 U.S.C. § 1988
(federal) and the NMCRA (state) allow courts to award reasonable attorney fees
to the prevailing plaintiff — paid by the government defendant.

### Required Retainer Provisions

| Provision | Language Summary | Reason |
|-----------|----------------|--------|
| **Fee-shifting clause** | Firm takes EITHER contingency percentage (33%-40%) OR court-awarded statutory attorney fees, whichever is GREATER | Prevents double-dipping while ensuring fair compensation |
| **Contingency percentage** | Standard: 33.33% pre-suit, 40% post-suit | Matches firm standard but fee-shifting may exceed |
| **Expense advancement** | Firm advances litigation costs; recovered from settlement or fee award | Civil rights cases have high expert/depo costs |
| **Criminal case waiver** | "This firm does NOT represent you in any criminal proceedings arising from this incident" | Firm is not criminal defense counsel |
| **Scope of representation** | Lists specific claims and specific defendants covered | Prevents scope creep and manages expectations |
| **Multiple-forum clause** | If filing in both state and federal court, retainer covers both | Single agreement for parallel proceedings |
| **Fee petition clause** | Firm will petition for statutory fees; client agrees to cooperate with fee documentation | Required for fee-shifting recovery |

### Retainer Type Classification

| Retainer Type | Use When | Fee Structure |
|---------------|----------|---------------|
| HYBRID-CR | Civil rights (§ 1983 / NMCRA) | Greater of contingency OR statutory fees |
| HYBRID-HR | Human rights (NMHRA / Title VII) | Greater of contingency OR statutory fees |
| STANDARD | Tort claims only (no fee-shifting) | Standard contingency |

### Retainer Documents Checklist

| Document | Purpose | Required |
|----------|---------|----------|
| Hybrid Fee Agreement | Fee-shifting contingency | YES |
| HIPAA / HITECH Authorization | Medical records release | YES (if physical injury) |
| General Release — Police/Government Records | Authority to obtain records via IPRA | YES |
| Criminal Case Waiver Acknowledgment | Client confirms firm does not represent in criminal matter | YES (if criminal charges) |
| Social Media & Communications Agreement | Media blackout, social media lockdown | YES |
| Client Acknowledgment of Risks | Fishbowl warning documented | YES |

## Step 9: Fishbowl Warning & Client Expectations

### The "Fishbowl" Warning (Mandatory)

Every civil rights client MUST be warned about the following realities before
signing. This warning must be documented with client acknowledgment.

### Warning Script

> "I need to be very direct with you about what happens when you sue the police
> [or the government / your employer]. Filing this lawsuit makes your entire
> life an open book. The defense attorneys will dig into every aspect of your
> past — your criminal history, your drug use, your mental health treatment,
> your employment history, your social media, your relationships. They will do
> this specifically to attack your character in front of a jury.
>
> This is not something we can prevent. It is how civil rights cases are
> defended. You need to be prepared for this, and you need to be completely
> honest with us about your past so we are never surprised.
>
> I also need you to understand the following rules, which are non-negotiable:"

### Non-Negotiable Client Rules

| Rule | Explanation | Consequence of Violation |
|------|-------------|------------------------|
| **Social media lockdown — immediate** | Set ALL profiles to private. Post NOTHING about the case, the police, your injuries, or your physical activities | Defense monitors social media. A photo of you at a BBQ undermines pain-and-suffering claims |
| **Media blackout** | Do NOT speak to any news outlet (KOB, KOAT, KRQE, Albuquerque Journal) without attorney approval | Statements to media become discovery and can be used against you |
| **No social media deletion** | Do NOT delete any existing posts or photos | Deletion = spoliation. Defense will find the deleted content and use the deletion against you |
| **Complete honesty** | Tell us about EVERY arrest, conviction, drug issue, mental health issue, and prior lawsuit | If we are surprised at deposition, the case is severely damaged |
| **No contact with defendants** | Do not confront, call, text, or approach any officer, supervisor, or defendant | Can be used to claim harassment or fabrication |
| **No recorded statements** | Do not give any recorded or written statements to anyone (investigators, insurance, government) | Statements can be taken out of context |

### Client Acknowledgment Documentation

```
CLIENT ACKNOWLEDGMENT — CIVIL RIGHTS CASE RISKS
Case: {case_id}
Client: {name}
Date: {date}

I acknowledge that I have been informed of the following:

[ ] Filing a civil rights lawsuit makes my personal history subject to
    discovery and public scrutiny
[ ] The defense will investigate my criminal history, employment history,
    mental health history, drug use history, and social media activity
[ ] I must immediately set all social media accounts to private
[ ] I must not post anything about this case, the police, my injuries,
    or my physical activities on social media
[ ] I must not delete any existing social media posts or photos
[ ] I must not speak to any media outlet without attorney approval
[ ] I must not contact any defendant, officer, or government official
    about this case
[ ] I must be completely honest with my legal team about my past
[ ] I understand the firm does NOT represent me in any criminal matter

Client Signature: _______________
Date: _______________
Attorney Witness: _______________
```

## Onboarding Completion Checklist

```
ONBOARDING COMPLETE — {lead_id}

EVALUATION:
[ ] Forum selection: NMCRA / §1983 / BOTH / NMHRA / FTCA
[ ] Estimated value: LOW / MEDIUM / HIGH / CATASTROPHIC
[ ] Decision: ACCEPTED / DECLINED

RETAINER:
[ ] Hybrid Fee Agreement executed — Type: HYBRID-CR / HYBRID-HR / STANDARD
[ ] HIPAA authorization executed
[ ] Government records release executed
[ ] Criminal case waiver signed (if applicable)
[ ] Social media agreement signed
[ ] Client acknowledgment of risks signed

FISHBOWL WARNING:
[ ] Fishbowl warning delivered
[ ] Social media lockdown instructions given
[ ] Media blackout instructions given
[ ] Complete honesty requirement discussed
[ ] Client acknowledgment documented

STATUS: Lead → SIGNED → Transition to Phase 4 (OPEN)
```
