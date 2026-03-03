---
name: drp
display_name: "Discovery Responder"
description: >-
  Discovery Responder (DRP) drafts Plaintiff responses to incoming discovery
  requests (ROGs, RFPs, RFAs) in the firm's response-first / objections-after
  "Notwithstanding" style. Produces response text and can generate a Word doc via
  docx + PA-DOC-FORMAT-DISCOVERY overlay. Use when the user asks to draft or help
  prepare responses to served discovery (including when discovery is uploaded and
  they say "respond to these"). Do not use for good-faith letters (gfl), motions
  to compel (mtc), outgoing discovery (dpb), or reviewing opponent responses
  (drr/OA-*).
version: "2.0"
category: discovery-response
pack_consumes:
  - CFP
  - LPB
  - PCM
  - PDM
  - DPB
pack_produces:
  - Draft discovery responses
checkpoints: 3
author: "Parnall & Adams"
license: Proprietary
---

## Orchestrator Architecture

DRP orchestrates discovery response drafting through a checkpoint-based workflow
(see `shared/templates/checkpoint-protocol.md` for full protocol):

1. **TRIAGE** — Parse incoming requests, classify by type and subject matter
2. **⛔ CHECKPOINT 1: Disclosure Strategy** — Present triage results per request. Attorney decides: full disclosure, partial disclosure, object, or needs more info. Do NOT proceed to objection drafting until the attorney confirms the disclosure posture for each request.
3. **OBJECTION** — Draft objections per attorney direction using NM rules + LPB law pack
4. **⛔ CHECKPOINT 2: Objection Review** — Present proposed objections with legal basis. Attorney approves, modifies, or removes each objection.
5. **DISCLOSURE** — Run disclosure risk assessment; flag RED/YELLOW items
6. **⛔ CHECKPOINT 3: Privilege Assertions** — Present any privilege claims with specific basis (attorney-client, work product, etc.). Attorney confirms or withdraws each assertion. Must state whether info is withheld.
7. **DRAFT** — Generate response text in firm style (response-first, objections-after)
8. **SELF-CHECK** — Validate against quality checklist
9. **OUTPUT** — Produce DRAFT-only .docx via PA-DOC-FORMAT-DISCOVERY overlay

DRP follows the **Pack-First** principle: facts come from CFP packs, legal authority from LPB packs. When packs are absent, DRP works from uploaded discovery requests and marks assumptions as `[VERIFY]`.

Output is **BODY-ONLY** (Direct-Output discipline) — no letterhead or headers. Format overlays are applied separately.

### Disclosure Risk Assessment

Every proposed answer is assessed for disclosure risk before inclusion:

| Level | Meaning | Action |
|-------|---------|--------|
| **GREEN** | Safe to disclose; no strategic concern | Include in DRAFT |
| **YELLOW** | Potentially sensitive; attorney should review scope | Flag `[ATTORNEY REVIEW]` |
| **RED** | High risk; could damage case position | Flag `[DECISION REQUIRED]` |
| **PRIVILEGED** | Protected by privilege; must not disclose | Block from DRAFT; note privilege log entry |

### Sub-Skill References

- **QVS** (Quotation Verbatim Skill) — for extracting exact quotes from source documents when substantive answers require verbatim text
- **SDC** (Strategic Disclosure Control) — for strategic disclosure analysis and timing

## Pack Dependencies

**Consumes (optional — enhances quality):**
- CFP (case facts for substantive responses)
- LPB — discovery standards law pack (legal authority for objection citations)
- LPB — case-specific law pack (legal authority for substantive responses)
- PCM/PDM (claims/defense gap analysis for disclosure risk assessment)
- DPB EXTRACT (structured request analysis)

**Produces:**
- Draft Discovery Responses (complete .docx via docx skill + PA-DOC-FORMAT-DISCOVERY)

# DRP (Discovery Responder) — v2.0

## THE #1 RULE: RESPONSE-FIRST, OBJECTIONS-AFTER

This is the defining characteristic of the PA firm style. It is the **OPPOSITE**
of the standard pattern used by most firms and most LLM outputs.

### WRONG (never produce this):

```
Plaintiff objects to this Interrogatory as overly broad...

Subject to and without waiving the foregoing objections, Plaintiff responds
as follows: [answer]
```

### CORRECT (always produce this):

```
ANSWER:

Donna Grace Alipat's full legal name was Donna Grace Alipat.
[Substantive information continues...]

Notwithstanding this answer, Plaintiff objects to this Interrogatory to the
extent it seeks [specific objectionable portions with detailed reasoning].
No information is being withheld on the basis of this objection.
```

### Why this ordering matters:

Putting the answer first signals cooperation and good faith. Courts see a
substantive response before any objection language. Reviewing attorneys can
immediately see the actual answer without wading through boilerplate. The phrase
"Subject to and without waiving the foregoing objections" is **NEVER** used by
this firm.

## What This Skill Does

Drafts Plaintiff's responses to incoming discovery (ROGs, RFPs, RFAs) in the
the firm's response-first style (see `shared/firm-styles/`). Produces a formatted .docx ready for attorney
review and client input.

## Input Requirements

DRP needs at minimum:

1. The discovery requests (uploaded PDF or text of served ROGs/RFPs/RFAs)
2. Case context — case type, parties, claims (from conversation or complaint)

Optional inputs that improve quality:

- CFP (case facts for substantive responses)
- LPB (legal authority for objections)
- DPB EXTRACT (structured request analysis)
- Client-provided factual information

If discovery requests are uploaded without case context, ask the user for:

- Case type (med mal, MVC, premises liability, etc.)
- Brief description of claims
- Names of parties (plaintiff, defendant being responded to)
- Court and case number

## Hard Rules — Substance

### Response Ordering

1. **Response-first.** Every ANSWER/RESPONSE puts substantive information FIRST.
   Objections come AFTER, introduced by "Notwithstanding this answer/response,
   Plaintiff objects to this Interrogatory/Request to the extent it..."

2. **Only exception for objection-first:** When the ENTIRE request is
   objectionable and NO substantive response can be given (e.g., a request that
   is entirely privileged, or entirely outside the scope of discovery). Even
   then, explain why no response is possible rather than just objecting.

### Objection Language

1. **"Notwithstanding" transition.** Use "Notwithstanding this answer" (ROGs) or
   "Notwithstanding this response" (RFPs/RFAs) to introduce objections. NEVER
   use "Subject to and without waiving the foregoing objections."

2. **State whether information is withheld.** EVERY objection must say whether
   information is being withheld. Use: "No information is being withheld on the
   basis of this objection" or "Plaintiff withholds [description] on the basis
   of this objection and will produce a privilege log."

3. **No standalone relevance objections.** NEVER object on "relevance" alone.
   Use: "not reasonably calculated to lead to the discovery of admissible
   evidence" per Rule 1-026(B) NMRA.

4. **Overly broad — always explain proper scope.** When objecting "overly
   broad," ALWAYS explain: (a) what the request encompasses at its broadest
   reading, (b) what would be a proportional scope, and (c) how Plaintiff is
   responding within that proportional scope.

   Example: "...to the extent it seeks a complete lifetime residential history
   and household composition at every address. This is a wrongful death medical
   malpractice action; a proportional scope is limited to addresses during the
   period of treatment at issue and the period during which wrongful death
   damages are claimed."

5. **Undue burden — describe the burden concretely.** When objecting on burden,
   describe the actual effort required. Use midrange and wide range scope
   arguments: "At its narrowest reading, this request would require Plaintiff to
   identify and compile [X]. At its broadest, it would require [Y], imposing a
   burden disproportionate to the likely benefit of the discovery."

6. **Cite the specific objectionable portion.** Don't object to the entire
   request when only part is problematic. Quote the specific language: "to the
   extent it seeks 'each address she had throughout her lifetime' and 'who lived
   with her at each address.'"

### Substantive Responses

1. **Answer what was asked.** Provide substantive information responsive to the
   request. Don't volunteer beyond scope, but don't be evasive either.

2. **Cross-reference related answers.** When ROGs overlap: "See also Plaintiff's
   answers to Interrogatory Nos. 8, 11-18, and 28." This avoids repetition and
   demonstrates thoroughness.

3. **[CLIENT INPUT NEEDED] markers.** For facts only the client can provide:
   `[CLIENT INPUT NEEDED: exact description of what is needed]`. Be specific so
   the reviewing attorney knows exactly what to ask.

4. **Contention interrogatories.** For "state each and every fact"
   interrogatories: provide material and principal facts, then note: "Plaintiff
   is not required to provide a narrative account of each and every act or
   omission constituting negligence. See *Lucero v. Valdez*, 240 F.R.D. 591,
   594 (D.N.M. 2007). The material and principal facts include: [facts].
   Discovery and investigation are ongoing."

5. **Expert/premature topics.** When discovery seeks expert information before
   expert disclosure: provide what can be provided ("Plaintiff's experts are
   expected to offer opinions regarding the standard of care"), then note expert
   disclosures will follow per scheduling order.

6. **Supplement reservation.** End every answer/response: "Plaintiff reserves the
   right to amend or supplement this response as additional information becomes
   available through continuing investigation and discovery."

7. **Never volunteer harmful information.** Answer what was asked within proper
   scope. Do not expand the scope of your answer beyond what the request
   requires. Flag `[ATTORNEY REVIEW: potential harmful disclosure]` if a truthful
   answer may damage the case.

## Hard Rules — Formatting

1. **Caption:** Left-justified, single-spaced, no extra paragraph spacing
   between lines. Use `_PA Caption` style or `Normal1`.

2. **Title:** Centered, bold, AND underlined. First line shorter than second:

   ```
         PLAINTIFF'S ANSWERS TO DEFENDANT [NAME]'S
   FIRST SET OF INTERROGATORIES AND RESPONSES TO
                REQUESTS FOR PRODUCTION
   ```

3. **Request labels:** Bold AND underlined. Full text of the request reproduced.
   Example: **<u>INTERROGATORY NO. 1:</u>** [full text of interrogatory as served]

4. **Answer/Response labels:** **<u>ANSWER:</u>** or **<u>RESPONSE:</u>** — bold
   and underlined, on its own line before the substantive text.

5. **Body text:** Double-spaced (line 480 auto). Left-justified.

6. **Sub-items within answers:** Lettered items (a., b., c.) indented 720 DXA
   (0.5 inch). NO extra paragraph spacing between sub-items — use contextual
   spacing or spacing after 0. Single-spaced within the sub-item list.

7. **No Certificate of Service.** Discovery responses are served directly on
   counsel, NOT filed with the court. COS is a SEPARATE document. Do NOT include
   a COS on the response document.

8. **Verification block:** Include after the last response. State/county jurat,
   signature line, printed name, notary acknowledgment with commission
   expiration line.

9. **Signature block:** Right-indented per SignRight style. "Respectfully
   submitted," then firm name bold, attorneys, address, phone, emails.

10. **Font:** Times New Roman 12pt when responding on opposing counsel's
    discovery (this is the normal case). Firm style font (from
    `shared/firm-styles/{firm_style}.yaml → discovery.firm_originated_font`)
    at 12pt only for firm-originated discovery.

## General Objections — Standard Set

Include these at the beginning, numbered. Customize #6 for case type:

1. **Privilege:** Objects to the extent requests seek information protected by
   attorney-client privilege, work product doctrine, or any other applicable
   privilege or immunity. Inadvertent disclosure shall not constitute waiver.

2. **Proportionality:** Objects to the extent requests are overly broad, unduly
   burdensome, or not proportional to the needs of the case per Rule 1-026(B)
   NMRA.

3. **Reasonably calculated:** Objects to the extent requests seek information
   that is not reasonably calculated to lead to the discovery of admissible
   evidence, considering the importance of the issues, amount in controversy,
   parties' relative access to information, and whether the burden outweighs
   the likely benefit.

4. **Vagueness:** Objects to the extent requests are vague, ambiguous, or
   susceptible to multiple interpretations. Responds based on reasonable
   interpretation.

5. **Legal conclusions / equally available:** Objects to the extent requests call
   for legal conclusions or seek information equally available to Defendant
   through its own records or investigation.

6. **Case-specific scope (customize):** Objects to the extent requests seek
   [medical care/treatment/conditions | information about the accident |
   employment records | etc.] that are not related to the claims and injuries
   at issue in this litigation.

7. **Continuing duty:** Reserves the right to amend, supplement, or correct
   responses as additional information becomes available. Discovery and
   investigation are ongoing.

8. **Incorporation:** These General Objections are incorporated by reference
   into each specific response as if fully set forth therein.

## Document Structure (Output Order)

1. **Caption** — court, parties, case number (left-justified, single-spaced)

2. **Title** — centered, bold, underlined

3. **Introductory paragraph** — identifies the responding party, propounding
   party, and nature of the document

4. **General Objections** — numbered 1-8

5. **INTERROGATORIES heading** (if set includes ROGs)
   - For each ROG: request text → ANSWER: → substantive response →
     "Notwithstanding" objections → supplement reservation

6. **REQUESTS FOR PRODUCTION heading** (if set includes RFPs)
   - For each RFP: request text → RESPONSE: → substantive response →
     "Notwithstanding" objections → supplement reservation

7. **REQUESTS FOR ADMISSION heading** (if set includes RFAs)
   - For each RFA: request text → RESPONSE: → Admit/Deny/Qualified →
     objections if any

8. **Verification block** — oath/jurat with signature line and notary

9. **Signature block** — right-indented, firm name, attorneys, contact info

## Objection Quality Checklist

Every specific objection in the output must satisfy ALL of these:

- [ ] Identifies the SPECIFIC PORTION of the request that is objectionable
- [ ] States the legal basis (with NMRA rule citation where applicable)
- [ ] Explains the reasoning — why this objection applies to THIS request
- [ ] For overbreadth: identifies what proper/proportional scope would be
- [ ] For burden: describes the concrete burden at midrange and wide scope
- [ ] Expressly states whether information is being withheld
- [ ] Uses "not reasonably calculated to lead to discovery of admissible
  evidence" (never bare "relevance" objection)

## Pack Integration (Optional — Enhances Quality)

| Pack | What It Provides | Required? |
|------|------------------|-----------|
| CFP | Case facts for substantive responses | No — use `[CLIENT INPUT NEEDED]` if absent |
| LPB (discovery standards) | Legal authority for objection citations (relevance, proportionality, privilege, work product standards) | No — use standard NMRA cites if absent |
| LPB (case-specific) | Legal authority for substantive legal arguments in responses | No — general legal knowledge used if absent |
| PCM/PDM | Gap analysis showing which facts are critical to claims/defenses — informs disclosure risk | No — SDC used standalone if absent |
| DPB | Structured request analysis | No — DRP can parse requests directly |

When packs are available, cite them: "CFP Fact#42" or "LPB LawTag:
DISC-SCOPE-01". When packs are absent, DRP works from the uploaded discovery
requests and conversation context. Mark assumptions as `[VERIFY]`.

### LPB Law Pack Integration (v1.1)

DRP checks for discovery standards law packs before drafting objections. When a
law pack is present, objections cite the actual legal standard from the pack
rather than template-based NMRA rule numbers alone.

**Discovery standards law pack location:**
`law-packs/LP-Verified-Discovery-Standards-NM.xlsx` (or matching pattern)

**How DRP uses the law pack:**

1. **Before OBJECTION stage:** Check for a discovery standards law pack at
   `law-packs/`. Look for files matching `LP-*Discovery*` or `LP-*discovery*`.
2. **If present:** Load the law pack and use it for:
   - **Relevance objections:** Cite the specific legal standard and case law
     from the pack (e.g., *Montoya v. Villa Linda Mall* for relevance scope)
     instead of bare rule citations.
   - **Proportionality arguments:** Use the pack's proportionality factors
     and supporting case law for burden/proportionality objections.
   - **Privilege assertions:** Reference specific privilege standards and
     exceptions from the pack.
   - **Work product doctrine:** Cite the applicable work product standard
     and case law from the pack.
   - **Scope arguments:** Ground scope objections in the pack's discovery
     scope authority.
3. **If absent:** DRP still works using standard NMRA rule citations (Rules
   1-026 through 1-037). Output includes a notice:

   ```
   ⚠ LAW PACK NOT FOUND: No discovery standards law pack found at law-packs/.
   Objections use standard NMRA citations only. For legally-grounded objections
   citing case law authority, build a discovery standards law pack:
     /lpb → feed NM discovery case law → save to law-packs/
   ```

**LPB → DRP field mapping:**

| LPB Column | DRP Use |
|------------|---------|
| `Proposition` | Legal standard text cited in objection reasoning |
| `LawTag` | Internal reference for traceability |
| `Authority` | Case name and citation included in objection |
| `Rule` | NMRA/FRCP rule number for rule-based objections |
| `Element_ID` | Maps to discovery concept (e.g., DISC-RELEVANCE-001) |

**Example — without law pack:**
```
Notwithstanding this answer, Plaintiff objects to this Interrogatory to the
extent it seeks information not reasonably calculated to lead to the discovery
of admissible evidence per Rule 1-026(B) NMRA.
```

**Example — with law pack:**
```
Notwithstanding this answer, Plaintiff objects to this Interrogatory to the
extent it seeks information not reasonably calculated to lead to the discovery
of admissible evidence. Rule 1-026(B) NMRA limits discovery to matters relevant
to the claims or defenses of any party. See Montoya v. Villa Linda Mall, Inc.,
1990-NMSC-064, ¶ 12 (relevance must be construed in light of the pleadings and
the issues framed by the parties). The request seeks lifetime residential
history unrelated to any claim or defense in this action.
```

## Output Format

DRP produces a complete .docx document using the docx skill and
PA-DOC-FORMAT-DISCOVERY formatting overlay.

When generating the document:

1. Read the docx SKILL.md for document generation instructions
2. Read PA-DOC-FORMAT-DISCOVERY SKILL.md for formatting rules
3. Apply TNR 12pt (responding on OC form) or Optima 12pt (firm-originated)
4. Use the document structure defined above

## Quality Control — Final Checklist

Before delivering the output, verify:

- [ ] **Response-first ordering** — every answer puts substance before objections
- [ ] **"Notwithstanding" pattern** — zero instances of "Subject to and without
  waiving"
- [ ] **Info withheld stated** — every objection says whether info is withheld
- [ ] **No standalone relevance objections** — all use "reasonably calculated"
  standard
- [ ] **Overbreadth → scope explained** — proper scope identified for every
  broad objection
- [ ] **Burden → burden described** — concrete description for every burden
  objection
- [ ] **[CLIENT INPUT NEEDED]** — specific about what info is needed from client
- [ ] **Cross-references** — overlapping answers reference each other
- [ ] **Supplement reservation** — every answer reserves right to supplement
- [ ] **No COS** — Certificate of Service is NOT on this document
- [ ] **Verification block** — oath/jurat present
- [ ] **Sub-items indented, no extra spacing** — lettered lists tight, indented
- [ ] **Caption left-justified, single-spaced** — no extra paragraph spacing
- [ ] **Title centered, bold, underlined** — first line shorter than second
- [ ] **Request labels bold + underlined** — full text reproduced
- [ ] **ANSWER/RESPONSE labels bold + underlined**

## Pack Locations (v1.1)

**Read CFP from:** `cases/{CASE_CODE}/cfp/`
**Read DPB from:** `cases/{CASE_CODE}/dpb/`
**Save response drafts to:** `cases/{CASE_CODE}/drafts/`

## Reference Files

Load as needed:

- `references/objection-library.md` — Standard objection formulations with
  "Notwithstanding" transitions and NM authority citations
- `references/response-patterns.md` — Response patterns for common interrogatory
  and RFP types (identity, employment, medical, witnesses, experts, damages,
  insurance, contention, authorizations)
