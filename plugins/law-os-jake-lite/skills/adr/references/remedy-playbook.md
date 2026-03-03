# Remedy Playbook — ADR Reference

Read this file when running FULL DIAGNOSTIC or REMEDY ANALYSIS mode.

## Remedy Selection Framework

For each defect identified in the Defect Matrix, select one or more remedies
from the menu below. Multiple remedies may apply to the same defect.

---

## Remedy 1: Motion to Strike — NMRA 1-012(F) / FRCP 12(f)

### When to Use
- Affirmative defenses that are legally insufficient (boilerplate / bare labels)
- Redundant, immaterial, impertinent, or scandalous matter
- Improper "reservations" that are not actual defenses
- Defenses that fail heightened specificity requirements (NMRA 1-009)

### Legal Standard
- **NM:** NMRA 1-012(F) — court may order stricken any insufficient defense
  or any redundant, immaterial, impertinent, or scandalous matter. [VERIFY-CITE]
- **Federal:** FRCP 12(f) — court may strike from a pleading an insufficient
  defense or any redundant, immaterial, impertinent, or scandalous matter.
  [VERIFY-CITE]

### Proof Checklist
- [ ] Identify the specific defense number and text
- [ ] State which category applies (insufficient / redundant / immaterial /
      impertinent / scandalous)
- [ ] For insufficient defense: show no facts supporting the legal label
- [ ] For redundant: identify the duplicative defenses
- [ ] For immaterial/impertinent: show no logical connection to claims
- [ ] Cite controlling authority on strike standard

### Pros
- Removes defenses from case early — simplifies discovery and trial
- Prevents defendant from raising stricken defense at summary judgment or trial
- May narrow discovery scope (no discovery on stricken defenses)
- Relatively low-cost motion

### Cons
- Courts sometimes reluctant to strike — preference to decide on merits
- Strike without prejudice may allow defendant to replead
- Some judges view as "drastic remedy" requiring showing of prejudice
- Motion practice cost if denied

### Strategic Notes
- Strongest when defense is a bare legal label with zero supporting facts
- Pair with 1-012(C) motion when appropriate (strike + partial judgment)
- Consider timing: before discovery on the defense begins
- `[DECISION REQUIRED]` — senior attorney decides whether to file

---

## Remedy 2: Partial Judgment on the Pleadings — NMRA 1-012(C) / FRCP 12(c)

### When to Use
- Denials that are legally insufficient as a matter of law
- Averments deemed admitted by operation of law (silence / no response)
- Evasive or incomplete denials that fail to meet the substance of the averment
- Blanket denials of multi-fact paragraphs where some facts are undeniable

### Legal Standard
- **NM:** NMRA 1-012(C) — after the pleadings are closed but within such time
  as not to delay the trial, any party may move for judgment on the pleadings.
  [VERIFY-CITE]
- **Federal:** FRCP 12(c) — same standard. Treated as summary judgment if
  matters outside the pleadings are presented. [VERIFY-CITE]

### Proof Checklist
- [ ] Identify the specific complaint ¶ and answer response
- [ ] Show the denial is legally insufficient (cite NMRA 1-008(B) / FRCP 8(b))
- [ ] Demonstrate that the averment is deemed admitted by operation of law
- [ ] If silence: show no corresponding answer ¶ exists (NMRA 1-008(D))
- [ ] If evasive: show the denial does not fairly meet the substance of the
      averment
- [ ] Present only the pleadings — no extrinsic evidence

### Pros
- Establishes facts as admitted without discovery
- May resolve entire claims or elements
- Streamlines case toward summary judgment or trial
- Based solely on pleadings — no evidentiary burden

### Cons
- Narrow scope — only what appears on face of pleadings
- Court may allow defendant to amend rather than grant judgment
- If court considers matters outside pleadings, converts to MSJ
- Some courts reluctant to deem facts admitted without opportunity to cure

### Strategic Notes
- Most powerful for silence defects (ADMIT-DEFAULT) — clear rule application
- For evasive denials, pair with RFA to lock in the admission
- Consider timing: file before discovery or in conjunction with MSJ
- `[DECISION REQUIRED]` — senior attorney decides whether to file

---

## Remedy 3: Deemed Admitted — NMRA 1-008(D) / FRCP 8(b)(6)

### When to Use
- Averments not denied in the responsive pleading (silence)
- Evasive or incomplete denials treated as failure to deny
- Improper LKI responses where facts are within defendant's control
- As supporting argument in other motions (MSJ, MTC, trial)

### Legal Standard
- **NM:** NMRA 1-008(D) — averments in a pleading to which a responsive
  pleading is required are admitted when not denied in the responsive pleading.
  [VERIFY-CITE]
- **Federal:** FRCP 8(b)(6) — an allegation — other than one relating to the
  amount of damages — is admitted if a responsive pleading is required and the
  allegation is not denied. [VERIFY-CITE]
- **Evasive denial rule:** An evasive or incomplete denial has the effect of
  a failure to deny. [VERIFY-CITE]

### Proof Checklist
- [ ] Identify the complaint ¶ and corresponding answer response (or absence)
- [ ] Show the averment required a responsive pleading
- [ ] Show no denial (silence) or insufficient denial (evasive/blanket)
- [ ] Cite the deemed-admission rule with pinpoint
- [ ] If evasive: quote the evasive language and explain what remains undenied

### Pros
- Operates by force of law — no motion required in theory
- Powerful foundation for MSJ (fact deemed established)
- Can narrow triable issues significantly
- Defendant cannot later dispute deemed-admitted facts

### Cons
- Defendant may seek leave to amend to cure the deficiency
- Court may allow amendment freely if early in case
- Some courts require formal motion or ruling before treating as admitted
- Strongest when combined with other procedural mechanisms

### Strategic Notes
- Use in MSJ briefing: "Paragraph X is deemed admitted because..."
- Use in trial: request jury instruction that fact is established
- Pair with RFA to confirm the admission
- Best when defendant fails to seek leave to amend within reasonable time

---

## Remedy 4: Request for Admissions — NMRA 1-036 / FRCP 36

### When to Use
- To lock in deemed admissions from defective denials
- To force defendant to explicitly admit or deny specific facts
- To narrow triable issues
- As precursor to cost-of-proof sanctions (FRCP 37(c)(2))

### Legal Standard
- **NM:** NMRA 1-036 — failure to timely respond = deemed admitted. [VERIFY-CITE]
- **Federal:** FRCP 36(a) — matter is admitted unless a written answer or
  objection is served within 30 days. [VERIFY-CITE]
- **Cost of proof:** FRCP 37(c)(2) — if party fails to admit and requesting
  party later proves the matter, court must award reasonable expenses of proving.
  [VERIFY-CITE]

### Proof Checklist
- [ ] Identify facts that should be undisputed based on pleading defects
- [ ] Draft RFAs targeting those specific facts
- [ ] Serve within discovery period
- [ ] Track response deadline
- [ ] If no response: file motion to determine sufficiency or deem admitted

### Pros
- Forces binary admit/deny on specific facts
- Failure to respond = deemed admitted (automatic)
- Cost-of-proof sanctions available if denied then proven at trial
- Low cost, high value

### Cons
- Defendant may provide qualified denials requiring further litigation
- Defendant can seek withdrawal of admissions (good cause + no prejudice)
- 30-day window gives defendant time to cure pleading defects
- Requires discovery period to still be open

### Strategic Notes
- Draft RFAs that mirror the deemed-admitted facts from the ADR analysis
- Time service strategically (after answer deficiency analysis, before MSJ)
- Track deadlines carefully for automatic admission
- `[DECISION REQUIRED]` — senior attorney approves RFA content

---

## Remedy 5: Sanctions — NMRA 1-011 / FRCP 11

### When to Use
- Pattern of blanket denials suggesting no reasonable inquiry
- Denials of facts admitted in other filings or discovery
- Affirmative defenses foreclosed by binding precedent
- Certification failure (factual contentions lack evidentiary support)

### Legal Standard
- **NM:** NMRA 1-011 — by presenting a pleading, an attorney certifies that
  it is not presented for improper purpose, that denials are warranted on
  evidence or reasonably based on lack of information. [VERIFY-CITE]
- **Federal:** FRCP 11 — same framework with 21-day safe harbor. [VERIFY-CITE]

### Proof Checklist
- [ ] Identify the specific denials or defenses that lack reasonable basis
- [ ] Show the pattern (not isolated instance)
- [ ] Document that the facts denied are within defendant's knowledge/records
- [ ] If applicable: show contradiction with defendant's other filings
- [ ] **Safe harbor:** Serve sanctions motion; allow 21 days to cure (FRCP 11)
      or equivalent notice period (NMRA 1-011)
- [ ] If not cured: file with court

### Pros
- Deters future frivolous pleading
- May recover attorney's fees incurred on the motion
- Signals to court that opposing counsel is not engaging in good faith
- Can affect court's view of credibility

### Cons
- Courts impose sanctions reluctantly — high bar
- Safe harbor period may result in cure (which resolves the issue anyway)
- Risk of reciprocal sanctions motion
- Can damage attorney relationship / increase litigation costs

### Strategic Notes
- Reserve for egregious cases (pattern of bad faith, not isolated errors)
- Always comply with safe harbor procedure
- Consider the relationship dynamic — sanctions escalate conflict
- `[DECISION REQUIRED]` — senior attorney decides; this is a strategic choice

---

## Remedy 6: Meet-and-Confer Demand

### When to Use
- As first step before any motion practice
- To document good faith effort to resolve pleading deficiencies
- To give opposing counsel opportunity to amend
- Required by local rules before many motions

### Legal Standard
- **NM:** Good faith effort to resolve expected before motion practice
  (judicial economy principle). [VERIFY-CITE]
- **Federal:** D.N.M. LR-Civ 7.1(a) — certification of good faith effort
  required for most motions. [VERIFY-CITE]

### Proof Checklist
- [ ] Identify specific defects to raise with opposing counsel
- [ ] Draft meet-and-confer letter (use Meet-and-Confer Outline deliverable)
- [ ] Set reasonable cure deadline (14 days NM / 30 days FED is customary)
- [ ] Send via email and mail (create paper trail)
- [ ] If no response or no cure: document for motion certification
- [ ] If partial cure: update Defect Matrix and assess remaining defects

### Pros
- Required prerequisite for most motions — must do anyway
- May resolve defects without motion practice
- Creates favorable record for court
- Low cost

### Cons
- Gives defendant notice and opportunity to cure (strategic tradeoff)
- Defendant may amend answer, eliminating some leverage
- Time delay before motion can be filed

### Strategic Notes
- Always the first remedy step unless time-critical
- The Meet-and-Confer Outline deliverable provides the draft
- Balance: enough specificity to show good faith, not so much that you
  preview your entire motion strategy
- `[DECISION REQUIRED]` — senior attorney approves letter content and timing

---

## Remedy Selection Matrix

| Defect Flag | Primary Remedy | Secondary Remedy | Notes |
|-------------|---------------|------------------|-------|
| `ADMIT-DEFAULT` | Deemed Admitted → MSJ | 1-012(C) Judgment | Strongest defect — operate by law |
| `BLANKET-DENIAL` | Meet-Confer → 1-012(C) | RFA to lock in | Depends on how many facts are undeniable |
| `LKI-IMPROPER` | Meet-Confer → Deemed Admitted | RFA + Cost of Proof | Strong when facts are defendant's own |
| `EVASIVE` | Deemed Admitted → MSJ | 1-012(C) Judgment | Evasive = failure to deny by rule |
| `PARTIAL-ADMIT-NEEDED` | Meet-Confer → RFA | 1-012(C) if extreme | Often resolved by meet-confer |
| `INTERNAL-CONFLICT` | 1-012(F) Strike + 1-012(C) | Sanctions if pattern | Judicial estoppel argument |
| `BOILERPLATE` | 1-012(F) Strike | Sanctions if egregious | Courts increasingly willing to strike |
| `SPECIFICITY-FAIL` | 1-012(F) Strike | Meet-Confer first | Must show prejudice in some courts |
| `IMPROPER-RESERVATION` | 1-012(F) Strike | — | Nearly automatic — not a defense |
| `REDUNDANT-IMMATERIAL` | 1-012(F) Strike | — | Straightforward if truly immaterial |
| `DEFENSE-DENIAL-CONFLICT` | 1-012(F) Strike | Judicial estoppel brief | Strong impeachment value |
| `CERT-FAILURE` | NMRA 1-011 Sanctions | — | Reserve for pattern / bad faith |

---

## Priority Framework

### Critical Priority
- Defects affecting essential elements of plaintiff's claims
- Defects that could resolve claims without trial
- Time-sensitive defects (approaching deadlines)

### High Priority
- Pattern defects across multiple paragraphs (systemic blanket denials)
- Defects implicating key disputed facts
- Internal conflicts that undermine defendant's position

### Medium Priority
- Individual paragraph defects on secondary issues
- Boilerplate defenses that may not affect case trajectory
- Defects easily cured by amendment

### Low Priority
- Technical defects on undisputed background facts
- Defects on damages-only paragraphs (may be excluded from deemed admission)
- Defects likely to be rendered moot by discovery

---

## Timing Considerations

| Phase | Action |
|-------|--------|
| **Answer received** | Run ADR diagnostic |
| **Within 14 days** | Send meet-and-confer letter |
| **Cure deadline + 7 days** | Assess response; update Defect Matrix |
| **Before discovery cutoff** | Serve targeted RFAs |
| **After RFA deadline** | File motion (strike / judgment / sanctions) |
| **Before MSJ deadline** | Use deemed admissions in MSJ briefing |
| **Pre-trial** | Request jury instructions on established facts |
