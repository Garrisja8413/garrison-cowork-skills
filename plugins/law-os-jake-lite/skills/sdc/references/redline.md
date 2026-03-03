# SDC Reference: REDLINE Mode — Draft Review for Inadvertent Disclosure

## Purpose

Before any document leaves the firm, REDLINE scans it against the
Disclosure Ledger and flags anything that reveals, telegraphs, or
enables inference of currently-protected information.

## Input Requirements

1. **Draft document** — uploaded or pasted (complaint, discovery request,
   discovery response, motion, brief, demand letter, GFL, correspondence)
2. **Disclosure Ledger** — from prior AUDIT (or run AUDIT first)
3. **Current Posture** — from POSTURE mode or user-specified

## Review Protocol

### Pass 1: Direct Disclosure Check

For every assertion, fact, citation, exhibit reference, or witness
mention in the draft:

1. Look up the item in the Disclosure Ledger
2. If current status is `UNDISCLOSED` or `PARTIALLY-DISCLOSED`:
   - **FLAG:** "Line [X]: This discloses [Ledger item #Y] — currently
     [status], Surprise Value [Z]. Sending this document changes status
     to [new status]."
   - If Surprise Value ≥ 4: **⚠️ HIGH-VALUE DISCLOSURE WARNING**
   - Provide vaguer alternative language if possible

3. If current status is `DISCLOSED-VAGUE` and draft adds specifics:
   - **FLAG:** "Line [X]: This adds specificity to [Ledger item #Y] —
     currently DISCLOSED-VAGUE. Sending this upgrades status to
     DISCLOSED-SPECIFIC."

### Pass 2: Theory Telegraphing Check

Analyze the draft for signals that reveal legal theories:

**In Complaints:**
- Which causes of action are pled? → check against THEORY-HIDDEN items
- How specific are the factual allegations? → could be vaguer?
- Are damages categories listed that reveal hidden valuation strategy?
- Are specific defendants named that reveal theory of liability?

**In Discovery Requests:**
- What topics do the interrogatories target? → reveals theories of the case
- What document categories are requested? → reveals what you're looking for
- What time periods are specified? → reveals what you think happened when
- What definitions are included? → reveals how you're framing the case
- Which 30(b)(6) topics are noticed? → directly reveals contested issues

**In Motions/Briefs:**
- Which cases are cited? → reveals legal theory
- Which facts are emphasized? → reveals proof strategy
- Which arguments are made? → reveals trial strategy

**In Demand Letters:**
- Which damages categories are itemized? → reveals valuation approach
- Which facts are featured? → reveals strongest evidence
- Which comparables are cited? → reveals settlement expectations

### Pass 3: Inference Chain Analysis

The most dangerous disclosures are indirect. Check for combinatorial
inferences:

1. List all items that will be newly disclosed by this draft
2. For each, check: "Combined with previously-disclosed items, does this
   enable the defense to infer something currently UNDISCLOSED?"
3. If yes: **FLAG:** "Disclosing [A] in this draft, combined with
   previously-disclosed [B], enables defense to infer [C] (currently
   UNDISCLOSED, SV [X])."

**Common inference chains to watch for:**

| Disclosed | + Previously Disclosed | = Inferable |
|-----------|----------------------|-------------|
| Specific treatment dates | General injury allegations | Severity/duration of treatment |
| Request for personnel files | Negligent hiring not yet pled | Future amended complaint theory |
| Expert disclosure (type) | Complaint allegations | Which elements expert will address |
| Document request by date range | Timeline allegations | What event you think happened when |
| Deposition notice (person) | Complaint allegations | Which witnesses you think are key |
| Damages category itemized | General damages allegation | Valuation strategy/range |

### Pass 4: Posture Consistency Check

Compare the draft's disclosure level against the current strategic posture:

| Posture | Expected Disclosure Level | Flag If |
|---------|--------------------------|---------|
| `TIGHT` | Minimal. Vague allegations. Broad objections. | Any specific disclosure of UNDISCLOSED items |
| `SELECTIVE` | Some strategic disclosures. Others held. | Disclosure of items not in the Reveal Plan |
| `PROGRESSIVE` | Controlled escalation. | Disclosures out of planned sequence |
| `OVERWHELMING` | Full disclosure expected. | This posture doesn't trigger flags |
| `DEFENSIVE` | Tightening after overexposure. | Any new disclosure not strictly required |

### Pass 5: Over-Specification Check

For each factual assertion in the draft, assess whether it could be
stated more vaguely while still satisfying legal requirements:

**Notice Pleading Standard (NMRA 1-008(A)):**
A complaint need only contain "a short and plain statement of the claim
showing that the pleader is entitled to relief." Specificity beyond this
is a CHOICE, not a requirement (except for fraud/mistake under NMRA 1-009).

**Examples of over-specification:**

| Over-Specified | Sufficient (Vaguer) | Why Vague Is Better |
|---------------|---------------------|-------------------|
| "On March 15, 2024, at 2:30 PM, Defendant ran a red light at the intersection of Central and University" | "Defendant negligently operated their vehicle, causing a collision with Plaintiff" | Specific details can be reserved for discovery/deposition ambush |
| "Defendant's internal memo dated January 8, 2024, authored by VP of Operations John Smith, states that safety protocols were knowingly ignored" | "Defendant had knowledge of the dangerous condition and failed to act" | Preserves smoking gun for maximum impact at deposition |
| "Plaintiff's medical expenses total $147,832.56, including $45,000 for surgery at UNM Hospital" | "Plaintiff has incurred substantial medical expenses and will continue to incur future expenses" | Keeps damages figures hidden until demand stage |

## Output Format

### Redline Report

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SDC REDLINE REPORT — [Document Type] — [Date]
Current Posture: [POSTURE]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DIRECT DISCLOSURE FLAGS: [count]

⚠️ [HIGH-VALUE] Line [X]: "[quoted text from draft]"
   → Discloses: [Ledger item description] (SV: [X])
   → Current Status: UNDISCLOSED → Would become: DISCLOSED-SPECIFIC
   → Suggested Rewrite: "[vaguer alternative]"
   → [DECISION REQUIRED]

🔶 [MODERATE] Line [X]: "[quoted text]"
   → Upgrades: [Ledger item] from DISCLOSED-VAGUE → DISCLOSED-SPECIFIC
   → Suggested Rewrite: "[alternative]"
   → [DECISION REQUIRED]

THEORY TELEGRAPHING FLAGS: [count]

📡 [SIGNAL] Lines [X-Y]: Discovery requests re: [topic]
   → Telegraphs: [legal theory currently THEORY-HIDDEN]
   → Mitigation: Add decoy requests about [other topics] to dilute signal
   → Alternative: Broader framing: "[suggested rewrite]"

INFERENCE CHAIN FLAGS: [count]

🔗 [CHAIN] Line [X] discloses [A]
   → Combined with previously-disclosed [B] ([date], [method])
   → Enables inference of [C] (currently UNDISCLOSED, SV [X])
   → Mitigation: Remove [specific language] or defer to later filing

POSTURE CONSISTENCY: [CONSISTENT / INCONSISTENT]
   Current posture: [POSTURE]
   Draft disclosure level: [assessment]
   → [Recommendation if inconsistent]

OVER-SPECIFICATION FLAGS: [count]

📋 Line [X]: "[over-specified text]"
   → Notice pleading only requires: "[minimal version]"
   → Suggested Rewrite: "[vaguer version]"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

DISCLOSURE IMPACT SUMMARY:
If sent as-is, this document would:
- Move [N] items from UNDISCLOSED → DISCLOSED-SPECIFIC
- Move [N] items from PARTIALLY-DISCLOSED → DISCLOSED-SPECIFIC
- Move [N] items from DISCLOSED-VAGUE → DISCLOSED-SPECIFIC
- Enable inference of [N] currently-UNDISCLOSED items
- Reduce Surprise Inventory by [N] items
- Information Advantage Score impact: [current] → [projected]

DECISION GATES:
1. [Item] — Disclose or rewrite? [DECISION REQUIRED]
2. [Item] — Disclose or rewrite? [DECISION REQUIRED]
...

ETHICAL COMPLIANCE: [PASS]
- No recommendation to conceal responsive discovery
- Suggested rewrites maintain legal sufficiency
- Vagueness suggestions within notice pleading standards

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

## Special Rules by Document Type

### Complaints
- Notice pleading is your friend. Plead broadly.
- Fraud/mistake claims require specificity (NMRA 1-009) — but everything
  else benefits from strategic vagueness
- Multiple defendants → consider who to name now vs. add later via amendment
- Damages → "in an amount to be proven at trial" preserves flexibility

### Discovery Responses (Incoming)
- Answer what was asked. Do NOT volunteer.
- Object on good faith grounds where appropriate — buys time
- "Subject to and without waiving objections, [minimal answer]"
- Reference documents by Bates range, not by content summary
- Do NOT explain the significance of produced documents

### Discovery Requests (Outgoing)
- Every question is a signal. Use TELEGRAPH mode first.
- Include decoy requests to dilute signals
- Frame requests broadly to avoid revealing specific targets
- Consider sequence: which requests reveal the least about your theory?

### Motions
- You must cite facts and law to win — some disclosure is unavoidable
- Focus REDLINE on: are you disclosing MORE than necessary to win this motion?
- Consider sealed filings for sensitive evidence
- Consider in camera review for privilege/work product issues

### Demand Letters
- Settlement communications are often privileged (NM Settlement Privilege)
- Still, assume OC shares with adjuster, client, and defense experts
- Disclose enough to create pressure, but save the best for mediation/trial
- Damages figures in demands → they know your range. Use DC SETTLEMENT-EVAL
  to set anchors strategically.

### Meet-and-Confer Letters
- These set up your motion. What you say here you'll say in the motion.
- But you don't have to reveal WHY the discovery matters — just that it's
  deficient and what the rules require
- Avoid "we need this because..." language that reveals strategy
