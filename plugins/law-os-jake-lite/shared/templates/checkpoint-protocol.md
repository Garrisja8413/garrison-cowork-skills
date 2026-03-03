# Law-OS Checkpoint Protocol — v1.0

**Version:** 1.0
**Last Updated:** 2026-02-23
**Applies to:** All Law-OS skills that produce attorney work product

## Purpose

Transform skills from single-pass generators into checkpoint-based collaborative
workflows. The attorney makes the key strategic and ethical decisions; Law-OS
handles the research, analysis, and drafting between checkpoints.

## The Problem

Without checkpoints, skills run as monolithic operations:
- CFP extracts all facts without asking about ambiguities
- Complaint drafts the entire document without asking which theory to lead with
- DRP discloses information without confirming the disclosure strategy
- SYNAPSE selects deposition tactics without attorney input

This creates a dangerous pattern: the attorney reviews a finished product rather
than guiding the creation process. Errors compound because wrong decisions at
step 1 propagate through every subsequent step.

## Checkpoint Template

Every checkpoint follows this standard format:

```
───────────────────────────────────────────────
CHECKPOINT: [Decision Point Name]
───────────────────────────────────────────────

Work completed so far:
  [What the skill has done up to this point]

Decision needed:
  [What the attorney must decide before the skill continues]

Options:
  1. [Option A] — [implications]
  2. [Option B] — [implications]
  3. [Option C] — [implications]

Recommendation: [Skill's recommendation with reasoning]

→ Select an option or provide alternative direction.
───────────────────────────────────────────────
```

## Placement Rules

### ALWAYS checkpoint before:
- **Disclosure decisions** — any time the skill would reveal case facts or strategy
- **Theory selection** — choosing which legal theory, cause of action, or defense to pursue
- **Privilege assertions** — claiming attorney-client or work product privilege
- **Tone/strategy choices** — aggressive vs. cooperative, which arguments to lead with
- **Ambiguity resolution** — when source documents are unclear or contradictory
- **Priority ordering** — which issues to address first when order matters strategically

### NEVER checkpoint for:
- **Formatting decisions** — font, margins, spacing (handled by format overlays)
- **Mechanical operations** — file I/O, pack loading, data joins
- **Obvious next steps** — loading a law pack when the skill spec says to load it
- **Post-completion review** — the attorney reviews the output anyway

### Rule of thumb:
If the attorney would say "I would have done that differently" after seeing
the output, a checkpoint was needed there.

## Checkpoint Density Calibration

### Initial deployment: MORE checkpoints
Start with every checkpoint listed in the skill spec. This ensures the attorney
sees every decision point and can build trust in the system.

### After 2-4 weeks: calibrate
Track which checkpoints the attorney consistently accepts without modification.
These are candidates for "auto-proceed" mode:

| Pattern | Action |
|---------|--------|
| Attorney always picks the recommendation | Mark checkpoint as "auto-proceed" (show result but don't block) |
| Attorney always modifies | Keep as blocking checkpoint |
| Attorney skips entirely | Consider removing from flow |
| Attorney adds a decision not in the list | Add a new checkpoint at that point |

### Auto-proceed mode
When a checkpoint is set to auto-proceed:
- Still display the checkpoint information
- Show the auto-selected option
- Continue without waiting for input
- Attorney can interrupt at any time with "wait" or "stop"

## Checkpoint State Management

### Resume after checkpoint
After the attorney responds to a checkpoint, the skill:
1. Records the attorney's decision
2. Applies the decision to subsequent work
3. Continues to the next stage or checkpoint
4. References the decision in the output ("Per attorney direction at Checkpoint 2...")

### Checkpoint decisions are case-specific
A decision made at a checkpoint applies only to the current case and current
skill invocation. The same checkpoint in a different case starts fresh.

### Checkpoint audit trail
Every checkpoint interaction is part of the conversation history. The skill
references prior checkpoint decisions in its output for traceability:

```
Theory of case: Negligence per se (selected at Checkpoint 1)
Disclosure strategy: Full disclosure on liability facts,
  object on damages details (selected at Checkpoint 2)
```

## Integration with Pack-First Architecture

Checkpoints interact with the pack system:

- **Pre-checkpoint:** Skill loads and processes pack data
- **At checkpoint:** Skill presents pack-derived analysis for attorney decision
- **Post-checkpoint:** Skill applies attorney decision to pack data and continues

Checkpoints should reference specific pack rows/entries when presenting options:
```
Fact#23 from CFP says "Patient complained of headaches on 3/15"
Fact#24 from CFP says "Patient denied headaches at ER on 3/14"

CHECKPOINT: Conflicting Facts
These facts conflict. How should we handle them?
  1. Include both with notation about the conflict
  2. Lead with Fact#23 (later, more detailed account)
  3. Lead with Fact#24 (contemporaneous ER record)
```

## Skills with Checkpoints (v1.2)

| Skill | Checkpoints | Placement |
|-------|------------|-----------|
| DRP | 3 | Disclosure strategy, objection review, privilege assertions |
| Complaint | 3 | Theory selection, cause of action inclusion, fact emphasis |
| MTC | 2 | Deficiency prioritization, remedy selection |
| MSJ | 3 | SUMF selection, authority prioritization, standard of review |
| CFP | 2 | Ambiguity resolution, conflicting data |
| PCM/PDM | 2 | Gap prioritization, strategic focus |
| SYNAPSE | 2 | Witness classification, gear/topic selection |
| DPW | 4 | Demand readiness gate, valuation & authority gate, draft review gate, final QC & transmission gate |

---

*CONFIDENTIAL — Attorney Work Product*
