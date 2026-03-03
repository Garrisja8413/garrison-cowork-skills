---
name: lpb
display_name: "Law Pack Builder"
description: >-
  Law Pack Builder (LPB) — extracts legal authority from briefs, motions,
  opinions, letters, Lexis research into Excel Law Packs. Separates RULES
  (rule text) from LAW (propositions + quotes + pinpoints + micro-briefs).
  Three stages: EXTRACT, ENRICH, VERIFY. TRIGGERS: "law pack", "LPB", "extract
  authorities", "extract rules", "extract law", "authority extraction",
  "pack-ready law", "combine law packs", "enrich law pack", "verify law pack",
  "QA the law pack", "authority tables", "proposition tables", "pull the
  authorities", or uploads of briefs/motions/opinions for legal authority
  extraction. Do NOT use for Case Fact Pack (CFP) — use cfp skill instead
  (v1.0)
version: "1.1"
category: builder
pack_consumes:
  - Source legal documents
pack_produces:
  - LPB Excel workbook
checkpoints: 0
author: "Parnall & Adams"
license: Proprietary
---

# LPB (Law Pack Builder) — v1.1

## THE #1 RULE: NEVER EXHAUST OUTPUT TOKENS

Every prior CFP version failed because responses were too long. LPB inherits
the same hard caps and raw-string pattern.

### Hard caps per response (ROW-COUNT IS THE PRIMARY GOVERNOR)

| Limit | Cap | Why |
|-------|-----|-----|
| **LAW rows per response** | **≤ 15** | Propositions + quotes + micro-briefs are long |
| **RULES rows per response** | **≤ 10** | Rule text excerpts are substantial |
| **Enrichment rows per response** | **≤ 20** | Adding columns to existing rows |
| **Verify rows per response** | **≤ 30** | Lighter per-row work |

**If you are approaching ANY row cap, STOP. Save the file. Tell the user to
reply 'continue'. Do NOT try to squeeze in more rows.**

### THE RAW-STRING DATA RULE (prevents syntax crashes)

**NEVER hardcode extracted text into Python list literals or string arrays.**
Legal text contains nested quotes, apostrophes, backslashes, section symbols
(§), em-dashes, and unicode that will cause `SyntaxError`.

Instead, use this pattern for ALL data output:
1. Write extracted rows inside a raw triple-quoted string (`r"""..."""`) using
   `~|~` as delimiter
2. **NO line breaks inside fields** — every record must be on one single line.
   Replace any newlines in extracted text with a space.
3. Parse with `pd.read_csv(io.StringIO(raw_string), sep=r"~\|~", engine="python")`
4. Append the DataFrame to the Excel workbook

See `references/extract.md` for the exact code pattern.

## Architecture: Three Stages, Always Separate

```
EXTRACT  →  .xlsx  →  ENRICH  →  .xlsx  →  VERIFY  →  final .xlsx
   ↑                     ↑                     ↑
 source docs          extract output        enriched output
 OR smaller LPs
```

## Modes

| Mode | Stage | Input | Output | Reference |
|------|-------|-------|--------|-----------|
| **EXTRACT** | 1 | Uploaded document(s) | `LP-Extract-[name].xlsx` | `references/extract.md` |
| **COMBINE** | 1 | Multiple LP Excel files | `LP-Combined-[name].xlsx` | `references/combine.md` |
| **ENRICH** | 2 | Extract/Combined .xlsx | `LP-Enriched-[name].xlsx` | `references/enrich.md` |
| **VERIFY** | 3 | Enriched .xlsx | `LP-Verified-[name].xlsx` + QA report | `references/verify.md` |
| **PACKET** | Any | Any LP .xlsx | Filtered markdown packet | `references/packet.md` |

## Pack Locations (v1.1)

**Save outputs to:** `law-packs/`
**Naming:** `LP-{Stage}-{TopicSlug}.xlsx`
  - Examples: `LP-Verified-Discovery-Standards.xlsx`, `LP-Enriched-MedMal-DutyToInform.xlsx`

**Law-of-the-Case outputs save to:** `law-packs/law-of-the-case/{CASE_CODE}/`
**Naming:** `LOTC-{CASE_CODE}.xlsx`

**Before starting EXTRACT:**
1. If the source document is a court order or ruling specific to one case, ask: "Is this a law-of-the-case ruling for a specific case, or general legal authority?"
2. If LOTC → save to `law-packs/law-of-the-case/{CASE_CODE}/`
3. If general → save to `law-packs/`
4. List existing LPs in the target directory so the user sees what is already built.

## What Goes Where: RULES vs LAW

This is the critical design decision. Get it right and downstream drafting
becomes reliable.

### RULES Sheet — The Rule Itself
Store the **authoritative text** of a rule, statute, or local rule provision.
Think of RULES as "what the law says on paper." One row per rule provision.

Examples of RULES rows:
- FRCP 56(a) text on summary judgment standard
- NMRA 1-037(A) text on sanctions
- NMSA § 41-4-16(A) Tort Claims Act notice period
- D.N.M. LR-Civ 7.1(a) page limits

### LAW Sheet — How Courts Apply the Rule
Store **case propositions, holdings, quotes, and micro-briefs** that explain
how courts have interpreted and applied the rules. One row per proposition
(a single case may yield multiple LAW rows for different propositions).

Examples of LAW rows:
- "The moving party bears the initial burden..." (Celotex + pinpoint + micro-brief)
- "Sanctions under Rule 37 are within the court's discretion..." (case + pinpoint)
- "Minimum contacts requires purposeful availment..." (case + pinpoint)

### Grey Area: Rule Propositions
When a court restates a rule as a legal standard (e.g., "Summary judgment is
appropriate when..."), this goes in **LAW** as AuthorityType = `Rule-Proposition`,
with the rule cited in the proposition and the case providing the formulation.

## DATA ENGINEERING RULE

**COMBINE and VERIFY are data-engineering tasks.** Claude MUST write and execute
pandas scripts. Claude's text response should contain ONLY the summary/QA
report, not the row-by-row data.

**EXTRACT and ENRICH are semantic tasks.** Claude reads the source material,
makes judgments (what is a proposition, what category, what placement), and
outputs structured rows.

## Multi-File Processing

When multiple documents are uploaded:

1. **Process ONE file at a time.**
2. Each file gets its own EXTRACT run → own `.xlsx`.
3. After all files extracted, COMBINE into one master LP.
4. Then ENRICH the combined file. Then VERIFY it.

**Announce the plan first:**
```
I see [N] files. I'll extract from each separately, then combine.
  1. [filename1] → LP-Extract-001.xlsx
  2. [filename2] → LP-Extract-002.xlsx
  ...
Starting with file 1.
```

## Hard Rules (all modes)

1. **Never invent** citations, pinpoints, quotes, holdings, rule text, or Shepard status
2. Missing pinpoint → `PINPOINT NEEDED` | Missing citation → `[VERIFY-CITE]`
3. **Three-layer authority:** Every usable LAW row must have Proposition + QuoteOrSummary+Pinpoint + MicroBrief. If any layer is missing, the row is NOT pack-ready.
4. **One proposition per row.** A single case may yield 3–5 LAW rows for different legal points.
5. Preserve conflicting authority: both rows + `SPLIT` or `TENSION` flag in Notes
6. **Source-matched certainty:** "held" vs "noted" vs "suggested" vs "dicta"
7. **Never skip stages.** EXTRACT → ENRICH → VERIFY.
8. **Never exceed row caps.** Stop, save, ask for 'continue'.
9. **Never hardcode text into Python arrays.** Use `r"""..."""` raw strings + `io.StringIO` + `~|~` delimiter. No line breaks inside fields.
10. **Use pandas for all data-engineering.** COMBINE, VERIFY, dedup, merge, cross-ref.
11. **Validate CSV column counts after parsing.** After every `pd.read_csv`, check `len(df.columns) == expected`. If wrong, a newline slipped into a field — abort and fix.
12. **Track ALL defects per row, not just the worst one.** VERIFY must populate an `AllDefects` column (pipe-separated list) alongside the primary `Status` column. Never mask secondary issues.
13. **Write a Processing_Log tab in every output file.** Record: Stage, Timestamp, InputFile, Action, RowsProcessed, Notes.

## Proposition Decomposition (like micro-fact decomposition for CFP)

Split the row if the proposition contains:
- "and" connecting two distinct legal points → split
- Multiple elements of a test listed together → one row per element
- A holding + a standard of review → separate rows
- Dictum alongside a holding → separate rows, flag dictum

**Example** — "Summary judgment is appropriate when there is no genuine dispute
of material fact and the movant is entitled to judgment as a matter of law.
The court views the evidence in the light most favorable to the nonmovant.":
- Row 1: Proposition = "Summary judgment is appropriate when no genuine dispute of material fact exists and movant is entitled to judgment as a matter of law." (the standard)
- Row 2: Proposition = "At summary judgment, the court views evidence in the light most favorable to the nonmoving party." (the lens)

## Input Hygiene

**Prohibited** → respond `OUT OF SCOPE`:
- Sealed/protected opinions not yet public
- Privileged strategy memos (convert to non-privileged instructions first)

**Allowed:**
- Published opinions, briefs, motions, letters, Lexis output, research memos
- Unpublished opinions (flag as `Unpublished` in Notes)

## Excel Output

Read `/mnt/skills/public/xlsx/SKILL.md` when creating Excel files.
Use openpyxl for workbook creation/structure. Use pandas for data operations.
Every save must copy to `/mnt/user-data/outputs/` so the user can download.

**Save after EVERY chunk.** If the conversation errors, the user keeps progress.

## Response Template (every chunk response)

```
**Mode: [MODE] | File: [name] | Chunk [N] of ~[M] | Stage [#]**

[Minimal prose: what was extracted/processed]

---
**Chunk [N] complete.**
- RULES: [X] new ([Y] total)
- LAW: [X] new ([Y] total)
- PINPOINT NEEDED: [count]
- [VERIFY-CITE]: [count]
- Saved: [filename.xlsx]

Reply 'continue' for next chunk.
```

## Reference Files

Only load the reference for the active mode:
- `references/extract.md` — EXTRACT stage
- `references/combine.md` — COMBINE stage
- `references/enrich.md` — ENRICH stage
- `references/verify.md` — VERIFY stage
- `references/packet.md` — PACKET mode
