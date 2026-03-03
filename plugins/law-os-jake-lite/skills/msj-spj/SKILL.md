---
name: msj-spj
display_name: "MSJ — Specific Personal Jurisdiction"
description: >-
  Use when drafting a SmartAdvocate Direct-Output, Pack-First BODY-ONLY Motion
  for Summary Judgment focused on specific personal jurisdiction. Facts must
  have Evidence_DocID plus Bates/Page:Line or be marked PINPOINT NEEDED. Law
  must be from Law Pack rows with pinpoints or be marked [VERIFY-CITE] (v1.0)
version: "1.0"
category: drafting
pack_consumes:
  - CFP
  - LPB
pack_produces:
  - BODY-ONLY MSJ motion (specific PJ)
checkpoints: 0
author: "Parnall & Adams"
license: Proprietary
---

# MSJ - Specific Personal Jurisdiction (SA + Packs)

Motion for Partial Summary Judgment on the issue of lack of specific personal jurisdiction over an out-of-state defendant. Uses Pack-driven accuracy controls with SmartAdvocate shell integration.

## Non-Negotiables

1. **Sanitized inputs only.** No raw medical dumps, full SA exports, minor identifiers, sealed materials, or privileged memos. If prohibited inputs are required, respond: **"OUT OF SCOPE — requires BAA environment"**

2. **Direct-Output / BODY-ONLY:** SA template shell is SSOT for caption/COS/signature/merge fields. Draft BODY-ONLY for paste zone.

3. **Merge token discipline:** Preserve merge tokens exactly as provided. Never invent merge codes.

4. **No hallucinations:** Never invent facts, dates, DocIDs, Bates ranges, pinpoints, or authorities.

5. **Pinpoints required:**
   - Factual statement lacks pinpoint → `PINPOINT NEEDED`
   - Law/rule missing/unverified → `[VERIFY-CITE]`

6. **Conflicts stay visible:** Flag conflicting sources; do not resolve silently.

7. **Web/external research:** OFF. Use only the packet.

8. **Filing-compatibility:** SSN last-4; DOB year-only; minors initials; accounts last-4.

---

## Task Selection

Set: `DraftType = [MSJ_MOTION_ATOMIC or MSJ_REPLY_ATOMIC]`

- **MSJ_MOTION_ATOMIC**: Motion memo + SUMF + proposed order outline
- **MSJ_REPLY_ATOMIC**: Reply memorandum supporting previously-filed MSJ

---

## Required Input Packet

### 1) SA Shell MERGE LEGEND
[PASTE MERGE LEGEND — tokens preserved exactly]

### 2) Case Posture + MSJ Scope
- Jurisdiction: `[NM State Court | D.N.M. Federal | Other]`
- Movant: `[Plaintiff | Defendant]`
- Target: Lack of specific personal jurisdiction over [Defendant name]
- Defendant's contacts alleged/at issue: [list]
- Relief requested: Dismissal with prejudice for lack of personal jurisdiction

### 3) Case Fact Pack Excerpt
Paste sanitized rows with **File_Metadata** for every DocID cited.

**MSJ_SUMF rows:**
| Fact# | Statement | Evidence_DocID | Bates/Page:Line | ParaID | Material_Element_Tag | Dispute? | Notes |
|------:|-----------|----------------|-----------------|--------|---------------------|----------|-------|

**File_Metadata rows:**
| DocID | Title | Type | BatesStart | BatesEnd | Confidentiality | StoredAt |
|-------|-------|------|------------|----------|-----------------|----------|

### 4) Law Pack Excerpt
Paste verified LAW + RULES rows with pinpoints. See `references/personal-jurisdiction-law.md` for required micro-propositions.

---

## Atomicity Requirements

### Law Atomization
Break every legal standard into micro-propositions, each with Law Pack authority + pinpoint:
- Constitutional due process basis
- Long-arm statute scope
- Purposeful direction/availment
- Arising-from/relatedness
- Reasonableness factors

### Fact Atomization
- One fact per SUMF paragraph
- No argument, no conclusions
- Every fact has DocID + Bates/Page:Line

### Application Atomization
For each element:
1. **Rule sentence** (authority + pinpoint)
2. **Application sentence** ("SUMF ¶ X" + record cite)
3. **Result sentence** (what it means for jurisdiction)

---

## Output: MSJ_MOTION_ATOMIC

Produce in this order:

### 1) Introduction / Relief Requested
- Identify defendant
- State court lacks specific personal jurisdiction
- Request dismissal with prejudice

### 2) Scope + Jurisdictional Framework
- List constitutional and statutory bases
- Identify burden allocation
- Reference element checklist (see `references/element-checklists.md`)

### 3) Factual Background (Atomic; cite-controlled)
- Short paragraphs, one point each
- Cross-reference SUMF ¶ and DocID+Bates
- No argument

### 4) Statement of Undisputed Material Facts (SUMF)
- Numbered paragraphs
- One fact per paragraph
- Evidence cite for each (DocID + Bates/Page:Line)
- No argument

### 5) Standard of Review (Atomized)
Break into micro-propositions from Law Pack:
- MSJ burden (movant vs. nonmovant)
- "Genuine" dispute definition
- "Material" fact definition
- Evidence viewed in light favorable to nonmovant
- Personal jurisdiction: plaintiff's burden once properly challenged

### 6) Argument (Element-by-Element; Atomized IRAC)

Structure each jurisdictional element as sub-section:

**A. Long-Arm Statute**
- NM: NMSA 1978 § 38-1-16 (coextensive with due process)
- Fed: Fed. R. Civ. P. 4(k)(1)(A) + state long-arm

**B. Constitutional Due Process**
1. **Purposeful Direction/Availment**
   - Rule micro-proposition + cite
   - Application to SUMF ¶s
   - Result

2. **Arising From / Relatedness**
   - Rule micro-proposition + cite
   - Application to SUMF ¶s
   - Result

3. **Reasonableness** (if reached)
   - Burden on defendant
   - Forum state's interest
   - Plaintiff's interest
   - Interstate efficiency
   - Shared policy interests

### 7) Conclusion

### 8) Proposed Order Outline
- Court lacks specific personal jurisdiction over [Defendant]
- Dismissal with prejudice / without prejudice [specify]

---

## Output: MSJ_REPLY_ATOMIC

### 1) Introduction
What opposition fails to establish

### 2) Reply Framing Standard (Atomized)
Only from Law Pack; otherwise `[VERIFY-CITE]`

### 3) Point-by-Point Reply
Mirror opposition headings. For each point:
- (a) What they claim (quote/paraphrase from packet)
- (b) Controlling legal micro-proposition + cite
- (c) Record correction (SUMF ¶ + DocID+Bates)
- (d) Why dispute is not genuine/material

### 4) Conclusion

---

## Pack Locations (v1.1)

**Read CFP from:** `cases/{CASE_CODE}/cfp/`
**Read DPB from:** `cases/{CASE_CODE}/dpb/` (if applicable to this skill)
**Read LP from:** `law-packs/` (global) + `law-packs/law-of-the-case/{CASE_CODE}/` (if exists)
**Save draft output to:** `cases/{CASE_CODE}/drafts/`
**Naming:** `MSJ-SPJ-{CASE_CODE}-{Descriptor}-DRAFT.docx`

**Law-of-the-case check:** Before drafting, check whether `law-packs/law-of-the-case/{CASE_CODE}/` contains an LOTC pack. If it does, load it alongside the global LP. Flag any LOTC overrides in the Cite Table with `[LOTC]` tag so the attorney knows which legal points are governed by case-specific rulings.

## Required Output Contract

Return in this exact order:

### 1) DRAFT (Word-ready; BODY-ONLY)
Full draft for selected DraftType

### 2) ELEMENT-FACT-LAW APPLICATION MAP

**Table A — Elements Map:**
| Element | Governing LawTag(s) | Law Pinpoints | SUMF Fact#s Applied | Notes/Gaps |
|---------|---------------------|---------------|---------------------|------------|

**Table B — Law Atomization Index:**
| LawAtomID | Micro-Proposition | Authority + Pinpoint | Used In Section | Notes |
|-----------|-------------------|----------------------|-----------------|-------|

### 3) CITE TABLE
| # | Assertion | Evidence (doc_id + Bates/page:line OR authority + pinpoint) | Confidence | Notes |
|--:|-----------|-------------------------------------------------------------|------------|-------|

Every SUMF paragraph = at least one row. Every legal proposition = Law Pack authority + pinpoint or `[VERIFY-CITE]`.

### 4) GATE RESULTS

| Gate | Status | Details |
|------|--------|---------|
| Pack Traceability (facts) | |
| Pinpoint Completeness | |
| No-New-Facts | |
| Law Coverage (jurisdiction + controlling standard) | |
| Merge Token Integrity | |
| Conflict Detection | |
| Filing Data-Min Check | |
| Local Rules Check | |
| Granularity Gate | |

### 5) NEXT REQUESTS
Prioritized list of missing items to remove placeholders

### 6) OPEN ITEMS
- **[VERIFY]**: Items requiring verification before filing
- **[DECISION REQUIRED]**: Choices attorney must make
