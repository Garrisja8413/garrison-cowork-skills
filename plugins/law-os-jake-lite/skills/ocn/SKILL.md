---
name: ocn
display_name: "Objection Compromise Negotiator"
description: >-
  Objection Compromise Negotiator (OCN). Takes valid objections identified by
  OA-RFA, OA-ROG, and OA-RFP and generates concrete compromise proposals to
  resolve discovery disputes without motion practice. Proposes limiting
  temporal scope, narrowing subject matter, defining vague terms,
  restructuring compound requests, phasing production, offering search term
  protocols, and other compromise strategies. Produces ready-to-use modified
  discovery requests and meet-and-confer agendas. TRIGGERS: Use this skill
  when the user mentions "compromise", "resolve objections", "narrow
  discovery", "limit scope", "define terms", "OCN", "discovery compromise",
  "meet and confer agenda", "resolve discovery dispute", "modify requests",
  "negotiate discovery", or wants to find middle ground on discovery
  objections. Do NOT use for analyzing objection validity (use oa-rfa, oa-rog,
  oa-rfp). Do NOT use for drafting letters/motions (use gfl, mtc) (v1.0)
version: "1.0"
category: discovery-review
pack_consumes:
  - OA-RFA
  - OA-ROG
  - OA-RFP
  - DRS
  - LPB
pack_produces:
  - OCN compromise proposals
checkpoints: 0
author: "Parnall & Adams"
license: Proprietary
---

## Pack Dependencies
**Consumes:**
- OA-RFA (RFA objection assessment reports)
- OA-ROG (ROG objection assessment reports)
- OA-RFP (RFP objection assessment reports)
- DRS Sufficiency Report (deficiency findings)
- LPB (compromise precedent + proportionality law)
- CFP (case context for relevance weighing)
- PCM (element importance for prioritization)
- PDM (defense element importance for prioritization)

**Produces:**
- OCN Compromise Proposals
- Modified Discovery Requests
- Meet-and-Confer Agenda

# OCN (Objection Compromise Negotiator) — v1.0

## What This Skill Does

Generates concrete compromise proposals to resolve valid discovery objections
without motion practice. The OCN sits between objection analysis (OA-*) and
dispute escalation (GFL/MTC), offering a structured path to get the information
relevant to claims or defenses while acknowledging legitimate objections.

The OCN's philosophy: **A narrow answer is better than no answer.** If we can
get 80% of what we need by modifying the request, that is preferable to
litigating for 100% and waiting months.

## Architecture

```
OA-RFA Report ─────┐
OA-ROG Report ─────┤
OA-RFP Report ─────┤
DRS Report ─────────┤
                    ├── OCN ──► Compromise Proposals
LPB (compromise) ──┤           + Modified Requests
CFP (relevance) ────┤           + Meet-Confer Agenda
PCM/PDM (elements) ─┘           + Priority Matrix
                                     │
                     ┌───────────────┘
                     ▼
               GFL (incorporate compromises)
               DRP (compromise when responding)
               MTC (show good faith effort)
```

## Modes

| Mode | Purpose |
|------|---------|
| **PROPOSE** | Generate compromise proposals for valid objections from OA-* reports |
| **AGENDA** | Build a structured meet-and-confer agenda with compromise options |
| **REWRITE** | Produce modified discovery requests incorporating compromises |
| **PRIORITIZE** | Rank discovery requests by importance to claims/defenses and recommend what to concede vs. fight |

## Pack Locations (v1.1)

**Read DPB from:** `cases/{CASE_CODE}/dpb/`
**Read LP from:** `law-packs/`
**Save review output to:** `cases/{CASE_CODE}/drafts/`

## Hard Rules

1. **Input required:** OCN requires at least one OA-* Assessment Report or DRS Report.
   It does not independently analyze objections — that is the OA-* skills' job.
2. **Only compromise VALID objections.** INVALID and WAIVED objections should not be
   compromised — they should be fought. Include them in GFL/MTC.
3. **Every compromise must preserve relevance.** The modified request must still seek
   information relevant to the claims or defenses. Never compromise away the core ask.
4. **Concrete proposals only.** No vague suggestions like "consider narrowing."
   Every proposal must include exact modified language.
5. **Never invent** case citations, rule numbers, or facts.
6. **Prioritize by element importance.** When PCM/PDM is available, prioritize
   compromises that preserve discovery on high-gap elements.
7. **Track what we give up.** Every compromise has a cost — explicitly state what
   information we lose by accepting the compromise.
8. **Offer tiers.** When possible, offer Tier 1 (minimal compromise) and Tier 2
   (maximal compromise) options so the attorney can choose.

## Compromise Strategy Catalog

### Temporal Scope Limitations

| Strategy | When to Use | Template |
|----------|-------------|----------|
| **Date range limit** | Request spans unreasonable period | "Limit to documents/information from [start] to [end]" |
| **Rolling window** | Ongoing relationship, only recent period relevant | "Limit to the [X]-year period preceding [event]" |
| **Event-anchored** | Key event defines relevant period | "Limit to [period before/after] [specific event]" |

### Subject Matter Narrowing

| Strategy | When to Use | Template |
|----------|-------------|----------|
| **Topic limit** | Request sweeps in unrelated subjects | "Limit to documents/information concerning [specific topics]" |
| **Custodian limit** | Too many potential sources | "Limit to documents from [named custodians]" |
| **Transaction limit** | Request covers unrelated transactions | "Limit to [specific transaction or project]" |
| **Geographic limit** | Multi-jurisdiction, only some relevant | "Limit to [specific jurisdiction or location]" |

### Term Definition

| Strategy | When to Use | Template |
|----------|-------------|----------|
| **Define vague term** | Objection that term is ambiguous | "Define '[term]' to mean [specific definition]" |
| **Add parenthetical** | Term has multiple reasonable meanings | "By '[term],' Plaintiff means [definition]" |
| **Incorporate glossary** | Multiple terms at issue | "Attach Definitions Appendix; define [terms]" |
| **Reference external standard** | Industry term with established meaning | "As that term is defined in [standard/regulation/statute]" |

### Structural Modifications

| Strategy | When to Use | Template |
|----------|-------------|----------|
| **Split compound** | Request contains discrete subparts | "Break into [N] separate requests: [list]" |
| **Phased discovery** | All at once is burdensome | "Phase 1: [core docs]; Phase 2: [broader scope] if needed" |
| **Sampling** | Large volume, proportionality concern | "Produce a representative sample of [N] documents from [category]" |
| **Search term protocol** | ESI volume concern | "Apply agreed search terms [list] to [custodian] collections" |
| **Category prioritization** | Multiple categories, some more important | "Produce [high-priority categories] first; defer [lower priority]" |

### Cost and Burden Mitigation

| Strategy | When to Use | Template |
|----------|-------------|----------|
| **Cost-sharing** | Genuine burden, important information | "Requesting party to bear [%] of collection/review costs" |
| **Vendor selection** | ESI processing dispute | "Use mutually agreed e-discovery vendor" |
| **Review protocol** | Privilege review burden | "Use predictive coding / TAR with agreed seed set" |
| **Rolling production** | Volume too large for single production | "Produce in monthly rolling productions of [N] documents" |

## Required Inputs

### Always Required

At least one of:
```xml
<objection_analysis>
[OA-RFA and/or OA-ROG and/or OA-RFP Assessment Report(s)]
[Must include: Validity Matrix + Modification Summary]
[Only VALID and PARTIALLY-VALID objections are candidates for compromise]
</objection_analysis>
```

OR:
```xml
<sufficiency_analysis>
[DRS Sufficiency Report]
[Must include: Deficiency Summary]
</sufficiency_analysis>
```

### Also Required

```xml
<legal_layer>
[LPB PACKET — proportionality standards, compromise precedent,
 scope of discovery, protective order standards]
</legal_layer>
```

### Optional (Strengthens Proposals)

- `<case_facts>` — CFP showing relevance of discovery to claims/defenses
- `<strategic_layer>` — PCM/PDM showing element importance and gaps
- Scheduling order (for phasing proposals)
- Prior meet-and-confer correspondence (to build on prior discussions)
- Opposing counsel's stated positions (from GFL responses)

## Output Contract (Required Order)

### 1. Priority Matrix

| ReqNum | SetType | Element(s) | Importance | Compromise Feasible? | Strategy |
|--------|---------|-----------|------------|---------------------|----------|
| ROG-3 | ROG | 2.1 | CRITICAL | Yes — define term | Term Definition |
| RFP-1 | RFP | 1.2, 3.1 | HIGH | Yes — date limit | Temporal Scope |
| RFA-9 | RFA | 4.3 | MEDIUM | Yes — split compound | Structural |

### 2. Compromise Proposals

For each valid objection:

```
**[SetType] No. [ReqNum] — [ObjType] Objection**

*Current Request:* [from OA-* report]
*Valid Objection:* [from OA-* report]

*Tier 1 Compromise (Minimal):*
- Modification: [specific change]
- Modified Text: "[exact reworded request]"
- What We Preserve: [information still obtained]
- What We Lose: [information sacrificed]

*Tier 2 Compromise (Maximal):*
- Modification: [broader concession]
- Modified Text: "[exact reworded request]"
- What We Preserve: [core information still obtained]
- What We Lose: [additional information sacrificed]

*Recommended Tier:* [1 or 2] — [reasoning based on element importance]
```

### 3. Modified Discovery Requests (Ready to Serve)

Complete set of rewritten requests incorporating recommended compromises:

```
MODIFIED [SetType] — SET [SetID]

[SetType] No. [ReqNum]: [Full modified request text]
[SetType] No. [ReqNum]: [Full modified request text]
...

DEFINITIONS (if applicable):
1. "[Term]" means [definition]
2. "[Term]" means [definition]
```

### 4. Meet-and-Confer Agenda

```
MEET-AND-CONFER AGENDA

I. Requests Where We Seek Full Compliance (INVALID objections — no compromise)
   - [List with brief basis for each]

II. Requests Where We Offer Compromise (VALID objections)
   A. [ReqNum] — Proposed compromise: [summary]
   B. [ReqNum] — Proposed compromise: [summary]

III. Requests We Are Willing to Withdraw (low priority / cumulative)
   - [List, if any]

IV. Outstanding Issues Requiring Discussion
   - [Privilege log completeness]
   - [ESI protocol]
   - [Protective order terms]
```

### 5. Concession Cost Summary

| Request | Compromised? | Information Lost | Impact on Proof | Acceptable? |
|---------|-------------|-----------------|-----------------|-------------|

### 6. Cite Table

| # | Assertion | Evidence | Confidence | Notes |
|---|-----------|----------|------------|-------|

### 7. Gate Results
- Input Validation: [PASS/FAIL] — all compromises based on OA-*/DRS findings
- Relevance Preservation: [PASS/FAIL] — every modified request still seeks relevant information
- Concession Tracking: [PASS/FAIL] — every compromise explicitly states what is lost
- Tier Coverage: [PASS/FAIL] — tiered options provided where applicable
- Pack Status: [PASS/FAIL]

### 8. Next Requests

## Integration Points

| System | How OCN Connects |
|--------|-----------------|
| **OA-RFA** | Consumes VALID objection findings + modification recommendations for RFAs. |
| **OA-ROG** | Consumes VALID objection findings + modification recommendations for ROGs. |
| **OA-RFP** | Consumes VALID objection findings + modification recommendations for RFPs. |
| **DRS** | Consumes deficiency findings where compromise on supplementation scope is possible. |
| **LPB** | Uses proportionality law and compromise precedent. |
| **CFP** | Uses case facts to assess relevance and prioritize discovery. |
| **PCM/PDM** | Uses element importance to prioritize — never compromise away critical-element discovery. |
| **GFL** | GFL can incorporate OCN compromise proposals as specific cure demands. |
| **MTC** | MTC can reference OCN proposals as evidence of good faith compromise efforts. |
| **DRP** | DRP uses OCN when formulating our own compromise positions on incoming discovery. |
