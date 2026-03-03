---
name: dpb
display_name: "Discovery Pack Builder (Discovery SSOT)"
description: >-
  Discovery Pack Builder (DPB) — the single source of truth (SSOT) for all
  discovery data in a case. Extracts verbatim requests, objections, responses,
  and production records into structured packs with perfect party attribution.
  Every entry preserves the exact language of the discovery document — the AI
  does not generate, paraphrase, or summarize discovery content. DPB is the
  authoritative record of who requested what, who objected on what grounds,
  and what responsive information was provided. Tracks interrogatories, RFPs,
  RFAs with objection types, answer status, and deficiency flags. Produces
  DPB Excel workbook consumed by DRR, DRP, GFL, MTC, and deposition skills.
  TRIGGERS: Use when user mentions "discovery pack", "DPB", "track discovery",
  "organize discovery", "deficiency tracking", "discovery SSOT", or wants to
  structure discovery into a reviewable pack (v1.3)
version: "1.3"
category: builder
pack_consumes:
  - Source discovery documents
pack_produces:
  - DPB Excel workbook
checkpoints: 0
author: "Parnall & Adams"
license: Proprietary
---

# DPB (Discovery Pack Builder) — v1.3 (Discovery SSOT)

## CORE PRINCIPLE: THIS IS A DATA EXTRACTION SKILL, NOT A GENERATION SKILL

The DPB is the **single source of truth for all discovery data in a case.**
It extracts, organizes, and reproduces discovery content verbatim. The AI does
not generate, paraphrase, summarize, or interpret the language of any discovery
document in verbatim fields (ReqText, ObjText, AnswerText). The only AI
contribution is structural organization, tagging, state classification, and
cross-referencing — never the substance of requests, objections, or responses.

**If it was not written in the discovery document, it does not appear in the
DPB's verbatim fields.**

There must NEVER be any confusion about:
- **Who requested what** (verbatim request text + request number + serving party)
- **Who objected to what** (verbatim objection text + responding party + grounds)
- **What grounds and rationale support each objection** (verbatim from response)
- **What responsive information was provided** (verbatim answer text + attribution)
- **Who produced what documents** (Bates ranges + producing party)

**There is no room for error. Mistakes are unacceptable.**

## THE #2 RULE: NEVER EXHAUST OUTPUT TOKENS

Every prior CFP/LPB version failed because responses were too long. DPB inherits
the same hard caps and raw-string pattern.

### Hard caps per response (ROW-COUNT IS THE PRIMARY GOVERNOR)

| Limit | Cap | Why |
|-------|-----|-----|
| **EXTRACT rows per response** | **≤ 20** | Request text + objections + answers are long |
| **Productions rows per response** | **≤ 25** | Bates indexing is lighter per row |
| **Enrichment rows per response** | **≤ 15** | Adding objection analysis + state is verbose |
| **Verify rows per response** | **≤ 30** | Lighter per-row work |

**If you are approaching ANY row cap, STOP. Save the file. Tell the user to
reply 'continue'. Do NOT try to squeeze in more rows.**

### THE RAW-STRING DATA RULE (prevents syntax crashes)

**NEVER hardcode extracted text into Python list literals or string arrays.**
Discovery text contains nested quotes, apostrophes, section symbols (§),
em-dashes, brackets, and unicode that will cause `SyntaxError`.

Instead, use this pattern for ALL data output:
1. Write extracted rows inside a raw triple-quoted string (`r"""..."""`) using
   `~|~` as delimiter
2. **NO line breaks inside fields** — every record must be on one single line.
   Replace any newlines in extracted text with a space.
3. Parse with `pd.read_csv(io.StringIO(raw_string), sep=r"~\|~", engine="python")`
4. Append the DataFrame to the Excel workbook

See `references/extract.md` for the exact code pattern.

## What It Is

An Excel **state-machine** for discovery logistics. Each row = one discovery
request. The row tracks the full lifecycle: what was asked → what was objected →
what was answered → what was produced → what is deficient.

The DPB is the **battlefield map** that feeds the Discovery Disputes Playbook
(KB 09). Without a DPB, good faith letters and motions to compel cite from
memory. With a DPB, every deficiency assertion traces to a request number,
response pinpoint, and (when enriched) an LPB authority tag.

**v1.2 adds:** SA field alignment (Set_Metadata mirrors SmartAdvocate's
Edit Discovery / Add Respondent dialogs), a Productions tab for per-document
Bates indexing with Element_ID tagging, and WitnessRefs for deposition planning.

## Architecture: Three Stages, Always Separate

```
EXTRACT  →  .xlsx  →  ENRICH  →  .xlsx  →  VERIFY  →  final .xlsx
   ↑                     ↑                     ↑
 request/response     extract output +       enriched output
 docs (served sets)   CFP + LPB references
```

## Modes

| Mode | Stage | Input | Output | Reference |
|------|-------|-------|--------|-----------|
| **EXTRACT** | 1 | Uploaded request/response set(s) | `DPB-Extract-[SetID].xlsx` | `references/extract.md` |
| **COMBINE** | 1 | Multiple DPB Extract files | `DPB-Combined-[CaseName].xlsx` | `references/combine.md` |
| **ENRICH** | 2 | Extract/Combined .xlsx + CFP + LPB | `DPB-Enriched-[name].xlsx` | `references/enrich.md` |
| **VERIFY** | 3 | Enriched .xlsx | `DPB-Verified-[name].xlsx` + QA report | `references/verify.md` |
| **PACKET** | Any | Any DPB .xlsx | Filtered markdown packet | `references/packet.md` |

## Pack Locations (v1.1)

**Save outputs to:** `cases/{CASE_CODE}/dpb/`
**Naming:** `DPB-{Stage}-{CASE_CODE}-{SetID}.xlsx`
  - Examples: `DPB-Extract-ALIPAT-Set1-ROGs.xlsx`, `DPB-Combined-ALIPAT-Master.xlsx`

**Before starting EXTRACT or COMBINE:**
1. Ask the user for the case code if not established.
2. Verify `cases/{CASE_CODE}/dpb/` exists; create it if not.
3. List existing DPBs in that directory.

## Tabs Overview

| Tab | Purpose | Stage Created |
|-----|---------|---------------|
| Set_Metadata | One row per discovery set — SA-aligned metadata | EXTRACT |
| Requests | One row per individual request — state machine | EXTRACT |
| Productions | One row per produced document/range — Bates index | EXTRACT |
| Processing_Log | Audit trail | All stages |
| README | Human-readable summary | EXTRACT |

## Discovery Set Types (controlled)

| SetType | What | Jurisdiction | Typical Request Prefix |
|---------|------|-------------|----------------------|
| `ROG` | Interrogatories | NM or FED | "Interrogatory No." |
| `RFP` | Requests for Production | NM or FED | "Request No." |
| `RFA` | Requests for Admission | NM or FED | "Request No." |
| `RFP-SUBP` | Subpoena-attached RFPs (FRCP 45) | FED | "Request No." |
| `ROG-SUBP` | Subpoena-attached ROGs (FRCP 45) | FED | "Interrogatory No." |

## Direction (v1.2)

Every set has a Direction — critical for filtering:
- **`Outgoing`** — We served these requests. Deficiencies → GF letter / MTC.
- **`Incoming`** — Served on us. Track our response deadlines + client workflow.

## Discovery State Machine

Each request row has a `State` value (assigned in ENRICH, validated in VERIFY):

| State | Meaning | Downstream |
|-------|---------|-----------|
| `COMPLETE` | Fully answered, no deficiency | No action needed |
| `PARTIAL` | Some answer provided but incomplete | Good faith letter |
| `OBJECTION-ONLY` | Objection without substantive answer | Good faith letter → MTC |
| `OBJECTION-WAIVED` | Objection waived (untimely, format defect) | MTC — strong |
| `EVASIVE` | Answer technically provided but non-responsive | Good faith letter → MTC |
| `NO-RESPONSE` | No response served at all | MTC — default |
| `PRODUCED` | Documents produced, confirm completeness | Verify Bates |
| `PRODUCED-INCOMPLETE` | Some docs produced, gaps identified | Good faith → MTC |
| `CURE-PENDING` | Good faith letter sent, awaiting cure | Track deadline |
| `CURE-FAILED` | Cure deadline passed, no adequate cure | MTC ready |
| `WITHDRAWN` | Request withdrawn or stipulated out | Archive |
| `RESOLVED` | Deficiency resolved via supplementation | Archive |

## Hard Rules (all modes)

1. **Never invent** request numbers, response text, Bates ranges, objection language, or answer content
2. **One row per request.** Never consolidate multiple requests into one row.
3. Missing response → `NO RESPONSE SERVED` in AnswerText (not blank)
4. Boilerplate objections still get rows — they matter for meet-confer
5. **Preserve verbatim objection + answer text** (paraphrase only in Notes).
   ReqText, ObjText, and AnswerText fields must contain the EXACT language from
   the source document. No editing, cleaning, or improving the language.
   Truncation is permitted for entries exceeding 2000 characters: preserve the
   first 1500 characters verbatim + `[FULL TEXT IN SOURCE — Request No. X]`.
6. **Perfect party attribution.** Every row must unambiguously identify the
   ServingParty (who asked) and RespondingParty (who answered/objected). When
   multiple defendants serve separate responses to the same requests, each
   gets its own SetID and rows — never merge responses from different parties.
7. **Never skip stages.** EXTRACT first, then ENRICH, then VERIFY.
7. If request text is cut off → `[TEXT INCOMPLETE — VERIFY AGAINST SOURCE]`
8. **Never exceed row caps.** Stop, save, ask for 'continue'.
9. **Never hardcode text into Python arrays.** Use `r"""..."""` raw strings + `io.StringIO` + `~|~` delimiter. No line breaks inside fields.
10. **Use pandas for all data-engineering.** COMBINE, VERIFY, cross-ref checks.
11. **Validate CSV column counts after parsing.** After every `pd.read_csv`, check `len(df.columns) == expected`. If wrong, a newline slipped into a field — abort and fix.
12. **Write a Processing_Log tab in every output file.** Record: Stage, Timestamp, InputFile, Action, RowsProcessed, SkillVersion, Notes.

## RFA-Specific Rules

RFAs have unique legal semantics that differ from ROGs and RFPs:
- **Admitted** = binding judicial admission (feeds CFP directly)
- **Denied** = denial preserved; no deficiency unless basis inadequate
- **Admitted in Part / Denied in Part** = parse both portions
- **Deemed Admitted** (failure to timely respond) = strongest possible admission
- **Objection without admission/denial** = same as OBJECTION-ONLY

EXTRACT captures `AdmissionResult` for RFA sets. ENRICH uses it for state assignment.

## DATA ENGINEERING RULE

**COMBINE and VERIFY are data-engineering tasks.** Claude MUST write and execute
pandas scripts. Claude's text response should contain ONLY the summary/QA
report, not the row-by-row data.

**EXTRACT and ENRICH are semantic tasks.** Claude reads the source material,
makes judgments (what is deficient, what objection type, what state), and
outputs structured rows via the raw-string pattern.

## Input Hygiene

**Prohibited** → respond `OUT OF SCOPE — requires BAA environment`:
- sealed discovery, protective-order-restricted responses (unless redacted)

**Allowed:** Discovery sets with standard litigation redactions applied.

## Excel Output (all modes)

Read the xlsx SKILL.md (`/mnt/skills/public/xlsx/SKILL.md`) when creating Excel files.
Use openpyxl for workbook creation/structure. Use pandas for data operations.
Every save must copy to `/mnt/user-data/outputs/` so the user can download.

**Save after EVERY chunk.** If the conversation errors, the user keeps progress.

## Response Template (every chunk response)

```
**Mode: [MODE] | Set: [SetID] | Chunk [N] of ~[M] | Stage [#]**

[Minimal prose: what was extracted/processed]

---
**Chunk [N] complete.**
- Requests: [X] new ([Y] total)
- Productions: [X] new ([Y] total)
- DeficiencyFlag=Y: [count]
- DeficiencyFlag=N: [count]
- Saved: [filename.xlsx]

Reply 'continue' for next chunk.
```

## Integration Points

| System | How DPB connects |
|--------|-----------------|
| **SmartAdvocate** | Set_Metadata mirrors SA Edit Discovery + Add Respondent fields. Save per Save Map KB 05: Discovery → Requests/Responses |
| **CFP** | DPB `AnswerCFP_FactRefs` → CFP `Fact#`. DPB VERIFY exports to CFP `Discovery_Defects` format. Productions `CFP_DocID` → CFP `File_Metadata.DocID`. |
| **LPB** | DPB `ObjBasis_LPB` → LPB `LawTag`. Objection analysis uses LPB authority. |
| **PCM** | DPB `Element_ID` (ENRICH) → PCM merge key. Productions `Element_ID` → PCM. Shows which elements are blocked by discovery. |
| **PB-GF-DISC-01** | DPB PACKET (State≠COMPLETE) → Good faith letter evidence layer |
| **PB-MTC-01** | DPB PACKET (State∈{OBJECTION-ONLY, EVASIVE, CURE-FAILED, NO-RESPONSE}) → MTC evidence layer |
| **Depositions** | DPB `WitnessRefs` (ENRICH) identifies deposition targets from ROG answers. Flag `DEPO-TARGET` in Notes. |
| **PSR** | DPB and PSR are sibling SSOTs. DPB is SSOT for discovery; PSR is SSOT for pleadings. RFA admissions (AdmissionResult=Admitted or Deemed-Admitted) should be cross-referenced with PSR Admissions_Map. Discovery requests may reference allegations tracked in PSR. |
| **MPR** | Discovery disputes that escalate to motions (GFL -> MTC) create entries in the MPR (Motion Practice Register). DPB deficiency findings feed MPR argument tracking. |

## Reference Files

Only load the reference for the active mode:
- `references/extract.md` — EXTRACT stage schema + code patterns
- `references/combine.md` — COMBINE stage merge script
- `references/enrich.md` — ENRICH stage + controlled vocabulary + state machine + code
- `references/verify.md` — VERIFY stage QA script + status codes
- `references/packet.md` — PACKET mode filtered output + code
