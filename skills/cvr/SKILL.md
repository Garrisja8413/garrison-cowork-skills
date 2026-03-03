---
name: cvr
description: >-
  Case Verification & Retrieval (CVR) — parses citations from pleadings,
  retrieves full opinions from Lexis+ via browser, verifies cited propositions
  and quotes against actual opinion text, emails cases as DOCX, and produces
  LPB-ready verified law packs. TRIGGERS: "pull the cases", "verify citations",
  "CVR", "check the cases", "go to Lexis", "pull from Lexis", "retrieve cases",
  "full case review", "read the full case", "citation check", "case
  verification", "Lexis pull", "get the full opinions", "verify the law",
  "are we citing this right", "citation fidelity", or uploads a pleading and
  asks to verify/retrieve cited cases. Not for LPB EXTRACT (documents in hand)
  or QVS (non-case verbatim quotes) (v1.0)
license: Proprietary
---

# CVR (Case Verification & Retrieval) — v1.0

## Why This Skill Exists

Every drafting skill in the system (MSJ, MTC, GFL, COMPLAINT, TRIAL-BRIEF)
depends on accurate legal authority. LPB extracts what's already in uploaded
documents. But extraction from a brief only captures what the brief's author
chose to include — which may be selective quotation, out-of-context language,
or flat-out wrong pinpoints.

CVR closes that gap. It goes to the source: the full opinion on Lexis+. It
reads the entire case. It confirms — or flags — every proposition, quote, and
holding attributed to that case. Nothing gets through unless verified against
full text.

The operating principle: **if you haven't read the full case, you don't know
if you're citing it correctly.**

## Architecture

```
Uploaded Pleading(s) ──► PARSE ──► Citation Index
                                        │
                                        ▼
                                   RETRIEVE (Lexis+ browser)
                                        │
                                        ▼
                                   Full Opinion Text
                                        │
                              ┌─────────┴──────────┐
                              ▼                    ▼
                         VERIFY                  EMAIL
                    (fidelity check)         (DOCX to Jake)
                              │
                              ▼
                    CVR Fidelity Report
                         + LPB PACKET
```

## Modes

| Mode | Purpose | Input | Output | Reference |
|------|---------|-------|--------|-----------|
| **PARSE** | Extract all citations from pleading | Uploaded pleading | Citation Index (.xlsx) | `references/parse.md` |
| **RETRIEVE** | Pull full opinions from Lexis+ | Citation Index | Full opinion text files | `references/retrieve.md` |
| **VERIFY** | Compare cited propositions against full text | Citation Index + Full opinions | Fidelity Report (.xlsx) | `references/verify.md` |
| **EMAIL** | Package and email verified cases | Full opinions | DOCX files emailed | `references/email.md` |
| **FULL-RUN** | All four modes in sequence | Uploaded pleading | All outputs | Run PARSE → RETRIEVE → VERIFY → EMAIL |
| **LPB-EXPORT** | Produce LPB-ready pack from verified cases | Fidelity Report + Full opinions | LP-Extract-CVR.xlsx | `references/lpb-export.md` |

## Default Workflow: FULL-RUN

When the user uploads a pleading and says anything like "pull these cases" or
"verify the citations," default to FULL-RUN unless they specify a single mode.

### Phase 1: PARSE

1. Read the uploaded pleading (PDF → extract text; DOCX → extract text; or use
   pasted text directly).
2. Identify every case citation using standard legal citation patterns:
   - Full citations: *Smith v. Jones*, 123 F.3d 456, 459 (10th Cir. 2005)
   - Short-form: *Smith*, 123 F.3d at 460
   - Id. citations: *Id.* at 461
   - Supra references
3. For each citation, extract:
   - **Case name** (full party names)
   - **Reporter citation** (volume, reporter, page)
   - **Pinpoint** (specific page or pages cited)
   - **Court and year**
   - **Proposition attributed** (the legal point the pleading says the case stands for)
   - **Quoted language** (if any direct quotes from the case appear in the pleading)
   - **Pleading location** (page/paragraph where the citation appears)
4. Resolve short-form citations and *Id.* references back to their full citation.
5. Deduplicate: one master entry per unique case, with all pinpoints and
   propositions collected.
6. Output: **CVR Citation Index** (Excel) with columns:

| Column | Description |
|--------|-------------|
| CiteID | CVR-[Seq] |
| CaseName | Full case name |
| FullCitation | Complete reporter citation |
| Court | Deciding court |
| Year | Decision year |
| Pinpoints | All pinpoint pages cited (comma-separated) |
| PropositionsCited | What the pleading says this case holds (pipe-separated if multiple) |
| QuotedLanguage | Any direct quotes attributed to this case in the pleading |
| PleadingLocation | Where in the pleading this case is cited |
| RetrievalStatus | PENDING / RETRIEVED / NOT-FOUND / RESTRICTED |
| VerificationStatus | PENDING / VERIFIED / FLAGGED / MISQUOTED / OUT-OF-CONTEXT |

7. Present the Citation Index to the user. Announce: "I found **[N]** unique
   cases cited in this pleading. Ready to retrieve from Lexis+."

### Phase 2: RETRIEVE

Read `references/retrieve.md` for the full Lexis+ browser automation protocol.

**High-level flow:**
1. Open Lexis+ in browser (user must be logged in or will log in when prompted).
2. For each case in the Citation Index:
   a. Search by citation in Lexis+
   b. Navigate to the full opinion
   c. Extract the complete opinion text
   d. Save as `CVR-[CiteID]-[ShortName].txt` in working directory
   e. Update RetrievalStatus in the Citation Index
3. If a case is not found on Lexis+, mark as `NOT-FOUND` and flag for the user.
4. If access is restricted, mark as `RESTRICTED`.
5. Report retrieval results: "[X] of [N] cases retrieved. [Y] not found. [Z] restricted."

**Critical rule:** The user handles Lexis+ authentication. CVR never enters
credentials. If a login screen appears, pause and ask the user to log in.

### Phase 3: VERIFY

For each retrieved case, compare the pleading's citations against the full
opinion text:

1. **Quote verification:** Does the quoted language appear verbatim in the
   opinion? Character-for-character check (invoke QVS standards).
   - MATCH: exact match found at the cited pinpoint
   - NEAR-MATCH: language is close but has minor differences (flag differences)
   - MISQUOTED: material differences between quoted and actual text
   - NOT-FOUND: quoted language does not appear in the opinion

2. **Proposition verification:** Does the case actually stand for what the
   pleading says it stands for?
   - VERIFIED: the opinion expressly states or clearly holds this proposition
   - SUPPORTED: the proposition is a reasonable reading but not a direct holding
   - DICTA: the language exists but is dicta, not holding
   - UNSUPPORTED: the opinion does not support this proposition
   - CONTRARY: the opinion actually holds the opposite

3. **Pinpoint verification:** Does the cited page actually contain the
   relevant material?
   - CORRECT: material found at cited pinpoint
   - WRONG-PAGE: material found but at a different location (provide correct pinpoint)
   - NOT-AT-PINPOINT: cited material not located at the specified page

4. **Context check:** Is the cited language taken out of context?
   - IN-CONTEXT: cited language faithfully represents the court's analysis
   - PARTIAL-CONTEXT: some relevant qualifications or limitations omitted
   - OUT-OF-CONTEXT: the full opinion context materially changes the meaning

5. Output: **CVR Fidelity Report** (Excel) updating the Citation Index with:

| Column | Description |
|--------|-------------|
| QuoteStatus | MATCH / NEAR-MATCH / MISQUOTED / NOT-FOUND / N-A |
| QuoteDifferences | If NEAR-MATCH or MISQUOTED, describe the differences |
| ActualQuoteText | The verbatim text from the opinion (if different) |
| PropositionStatus | VERIFIED / SUPPORTED / DICTA / UNSUPPORTED / CONTRARY |
| PropositionNotes | Explanation of verification finding |
| PinpointStatus | CORRECT / WRONG-PAGE / NOT-AT-PINPOINT |
| CorrectPinpoint | If WRONG-PAGE, the actual location |
| ContextStatus | IN-CONTEXT / PARTIAL-CONTEXT / OUT-OF-CONTEXT |
| ContextNotes | If flagged, what context is missing |
| OverallFidelity | GREEN (all verified) / YELLOW (minor issues) / RED (material problems) |
| FullTextRead | YES — confirms the entire opinion was read |

6. Present the Fidelity Report to the user with a summary:
   - **GREEN cases:** [list] — citation is accurate
   - **YELLOW cases:** [list] — minor issues to review
   - **RED cases:** [list] — material citation problems that need correction

### Phase 4: EMAIL

1. For each retrieved case, create a DOCX file containing:
   - Case name and full citation as title
   - Court and date
   - Full opinion text, preserving paragraph structure
   - CVR verification status summary at the top
2. Email all DOCX files to **jake@garrisonlawnm.com** with subject line:
   `CVR: [Pleading Name] — [N] Cases Retrieved`
3. The email body should contain the Fidelity Report summary (GREEN/YELLOW/RED).

### Phase 5: LPB-EXPORT (runs after VERIFY if user wants LPB integration)

1. For each VERIFIED or SUPPORTED case, extract LPB-ready rows:
   - RULES rows for any rules interpreted by the case
   - LAW rows for each verified proposition with:
     - Full citation
     - Verified pinpoint
     - Verified quote (from the actual opinion, not the pleading)
     - Micro-brief of the holding
     - FullTextRead = YES
2. Output: `LP-Extract-CVR-[PleadingName].xlsx` using LPB EXTRACT schema
3. This output can be fed directly into LPB ENRICH → VERIFY pipeline
4. Save to `law-packs/` directory per LPB conventions

## Hard Rules

1. **Full-text read required.** Every case in the Fidelity Report must have
   FullTextRead = YES. Skimming or partial reads are not acceptable. If the
   opinion is too long for a single pass, read it in sections and confirm
   coverage.
2. **Never fabricate verification results.** If you cannot determine whether a
   proposition is supported, mark it UNCERTAIN and explain why.
3. **Never enter Lexis credentials.** Authentication is the user's responsibility.
4. **Preserve the pleading's citations exactly.** The Citation Index must capture
   what the pleading actually says, even if it's wrong. Correction happens in
   the Fidelity Report, not by editing the Citation Index.
5. **QVS standards for quotes.** All quote comparisons use zero-tolerance
   character-for-character matching.
6. **One case at a time on Lexis.** Do not try to batch-search. Navigate to each
   case individually, read it fully, then proceed to the next.
7. **Save progress after each case.** Update the Citation Index and Fidelity
   Report after each case is retrieved and verified. If the session is
   interrupted, the user keeps all progress.
8. **Flag everything uncertain.** Better to flag a GREEN case as YELLOW than
   to miss a problem. The user can always review and override.
9. **Email requires explicit confirmation.** Before sending, show the user the
   list of files and ask for confirmation.
10. **LPB rows only from verified cases.** Never export a case to an LPB pack
    unless its FullTextRead = YES and OverallFidelity is GREEN or YELLOW.

## Row Caps (same discipline as LPB)

| Operation | Cap | Why |
|-----------|-----|-----|
| Citations parsed per response | 20 | Keep parsing manageable |
| Cases retrieved per session segment | 5 | Lexis browser automation is slow |
| LPB LAW rows per response | 15 | Inherited from LPB |
| LPB RULES rows per response | 10 | Inherited from LPB |

If approaching any cap, STOP. Save. Ask for 'continue'.

## Integration Points

| System | How CVR Connects |
|--------|-----------------|
| **LPB** | CVR VERIFIED cases export directly into LPB EXTRACT format. LPB ENRICH and VERIFY can then process them. |
| **QVS** | CVR uses QVS zero-tolerance standards for quote verification. |
| **MSJ** | Before drafting MSJ, run CVR on opponent's brief to verify their cases. Run CVR on your own draft to confirm your citations. |
| **MTC** | Same pattern: verify cited discovery standards before filing. |
| **GFL** | Verify cited authority before sending meet-and-confer correspondence. |
| **COMPLAINT** | Verify statutory and case authority before filing. |
| **TRIAL-BRIEF** | Final verification pass before trial submission. |
| **PCM/PDM** | CVR-verified authority strengthens element support assessment. |
| **R11** | CVR Fidelity Report is direct evidence for/against Rule 11 certification. |

## Response Template

```
**Mode: [MODE] | Pleading: [name] | Case [N] of [M]**

[What was done this step]

---
**Progress:**
- Citations found: [X]
- Retrieved: [Y] / [X]
- Verified: [Z] / [Y]
- GREEN: [count] | YELLOW: [count] | RED: [count]
- Saved: [filename]

Reply 'continue' for next case.
```

## Reference Files

Load only the reference for the active mode:
- `references/parse.md` — Citation extraction patterns and resolution
- `references/retrieve.md` — Lexis+ browser automation protocol
- `references/verify.md` — Fidelity verification methodology
- `references/email.md` — DOCX creation and email delivery
- `references/lpb-export.md` — LPB integration format
