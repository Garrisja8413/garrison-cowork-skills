# Phase 3: Post-Deposition Record Engineering (Trial Prep) — Detailed Reference

## Overview

Phase 3 runs AFTER the deposition. It transforms raw testimony into
litigation-ready work product: delta reports, SJ fact statements, trial
designation maps, and follow-up discovery generators.

---

## Output 1: Same-Day Hot-Wash & Issue Map

### Purpose
Within minutes of going off the record, generate a structured assessment
of what was captured vs. what was missed.

### Input
- LIVE phase SJ Tracker data (locked/partial/denied/evasive/open elements)
- LIVE phase Shield log (objections, coaching, interruptions)
- Attorney's session notes
- Deposition summary / rough transcript (if available)

### Hot-Wash Template

```markdown
## HOT-WASH: {Witness Name} — {Date}
**Duration:** {X} min of {370} min used | **Time remaining:** {Y} min

---

### ADMISSIONS CAPTURED ✅
| # | Element | Admission | Gear | Approx. Location | Quality |
|---|---------|-----------|------|-------------------|---------|
| 1 | Duty | "I was the supervisor responsible for safety inspections." | G2 | ~45 min | CLEAN — direct, unequivocal |
| 2 | Breach | "I did not initial line 7 of the inspection report." | G2 | ~62 min | CLEAN — Yes/No confirmed |
| 3 | Knowledge | "I received the email on May 14." | G3 | ~95 min | STRONG — confirmed via Exhibit 7 |

### ADMISSIONS MISSED ❌
| # | Element | Target Admission | Why Missed | Remediation |
|---|---------|-----------------|------------|-------------|
| 1 | Causation | "The failure to inspect caused the collapse." | Witness evaded; ran out of time on module | Continuation depo OR address via expert |
| 2 | Damages-Future | "Plaintiff will need ongoing treatment." | Not reached — time budget exhausted | Address via treating physician depo |

### PARTIAL / CONTESTED 🟡
| # | Element | What We Got | What's Missing | Next Step |
|---|---------|------------|----------------|-----------|
| 1 | Prior Notice | "There were prior complaints." | Would not specify dates or number | Subpoena complaint log; MTC if needed |

### IMPEACHMENT SCORED 🎯
| # | Topic | Witness Claimed | Document Shows | Exhibit |
|---|-------|----------------|----------------|---------|
| 1 | Email receipt | "Never received that email" | Email in witness's inbox, May 14 | Exhibit 7 |
| 2 | Inspection freq. | "Always conducted monthly" | Log shows 3-month gap | Exhibit 12 |

### SHIELD REPORT
- Objections: {total} ({proper} proper, {coaching} coaching violations)
- Interruptions: {count} NMRA 1-030(D)(1) violations
- Instructions not to answer: {count} ({improper} improper)
- Coaching incidents: {count} — [motion-worthy? Y/N]

### NEW INFORMATION DISCOVERED (Gear 1 yield)
| # | Item | Type | Follow-Up Required |
|---|------|------|--------------------|
| 1 | Witness mentioned "Jenkins report" — not in discovery | Document | Subpoena / RFP |
| 2 | Third-party contractor "Apex Safety" involved | Entity | Investigate / potential party |
| 3 | Internal audit conducted Q4 2023 | Document | RFP for audit records |

### ASSESSMENT
**Overall:** {STRONG / ADEQUATE / WEAK} deposition
**SJ readiness:** {X}/{Y} elements locked — {READY / GAPS REMAIN}
**Trial designation quality:** {GOOD / NEEDS EDITING / PROBLEMATIC}
**Immediate action items:** {list}
```

---

## Output 2: Automated SJ Fact Drafting

### Purpose
Map locked Gear 2 and Gear 3 admissions directly back to the Case-Theory
Grid and auto-draft the Summary Judgment Statement of Undisputed Material
Facts (SUMF) with placeholder [Page:Line] tags.

### Process
1. Take each LOCKED element from the SJ Tracker
2. Draft the SUMF paragraph using the witness's own words
3. Insert [Page:Line] placeholders for the final transcript
4. Cross-reference with authenticated exhibits
5. Flag any element that needs corroboration from another source

### SUMF Draft Template

```markdown
## STATEMENT OF UNDISPUTED MATERIAL FACTS
**Case:** {Case Name} | **Source Deposition:** {Witness Name}, {Date}

**NOTE:** [Page:Line] placeholders must be updated with final transcript
references once the transcript is received and reviewed.

---

1. Defendant {Name} was employed by {Entity} as a {role} at all times
   relevant to this action. ({Witness Name} Dep. [Page:Line].)

2. As {role}, Defendant {Name} was responsible for {duty}.
   ({Witness Name} Dep. [Page:Line]; Exhibit {N}, Bates {range}.)

3. On {date}, Defendant {Name} did not {required action}.
   ({Witness Name} Dep. [Page:Line].)

4. No document exists showing that Defendant {Name} {alternative action}.
   ({Witness Name} Dep. [Page:Line].)

5. Defendant {Name} received {document/communication} on {date},
   establishing actual knowledge of {fact}.
   ({Witness Name} Dep. [Page:Line]; Exhibit {N}, Bates {range}.)

---

### ELEMENT MAP
| SUMF ¶ | Claim | Element | Status | Corroboration Needed? |
|--------|-------|---------|--------|----------------------|
| ¶ 1 | Negligence | Duty | LOCKED | No — admission sufficient |
| ¶ 2 | Negligence | Duty | LOCKED | No — admission + exhibit |
| ¶ 3 | Negligence | Breach | LOCKED | No — admission sufficient |
| ¶ 4 | Negligence | Breach | LOCKED | No — negative boundary |
| ¶ 5 | Negligence | Knowledge | LOCKED | No — admission + exhibit |

### GAPS (elements NOT ready for SUMF)
| Element | Status | What's Needed |
|---------|--------|--------------|
| Causation | PARTIAL | Expert testimony or additional fact witness |
| Damages-Future | OPEN | Treating physician deposition |
```

### Integration with MSJ Skill
The SUMF draft feeds directly into the MSJ skill as input. The MSJ skill
consumes the SUMF paragraphs, verifies element coverage, and incorporates
them into the full motion structure. The [Page:Line] placeholders are
updated when the final transcript is received.

---

## Output 3: Designation Map & Impeachment Clip File

### Purpose
Extract all clean Q&A blocks suitable for trial use under FRCP 32 /
NMRA 1-032 and pair them with authenticated exhibits, creating an isolated
trial designation database.

### Rule Basis
- **FRCP 32(a)(1-4):** Conditions for using depositions at trial
- **NMRA 1-032:** NM equivalent for deposition use at trial
- **FRCP 32(a)(2):** Adverse party depositions usable for any purpose
- **FRCP 32(a)(4):** Deposition of unavailable witness

### Designation Categories

| Category | Use Case | Quality Standard |
|----------|----------|-----------------|
| **ADMISSION** | Party admission for SJ or trial | Clean Yes/No, one fact, no objection pending |
| **IMPEACHMENT** | Prior inconsistent statement for cross | Complete Commit-Credit-Confront on record |
| **FOUNDATION** | Document authentication | Full business record foundation completed |
| **NARRATIVE** | Trial story — compelling testimony excerpt | Clean Q&A, no speaking objections, good video |
| **EXPERT-CONCESSION** | Expert admitted limitation or error | Direct concession, no qualifier walk-back |

### Designation Map Template

```markdown
## TRIAL DESIGNATION MAP
**Witness:** {Name} | **Depo Date:** {Date}
**Transcript Status:** [ROUGH / FINAL — received {date}]

---

### ADMISSION DESIGNATIONS
| # | Topic | Q&A Summary | Page:Line | Exhibit | Objections | Video Clip |
|---|-------|------------|-----------|---------|------------|------------|
| 1 | Duty | "I was the supervisor." | [P:L] | — | None | {timestamp} |
| 2 | Breach | "I did not initial line 7." | [P:L] | — | None | {timestamp} |
| 3 | Knowledge | "I received the email May 14." | [P:L] | Ex. 7 | Form (overruled) | {timestamp} |

### IMPEACHMENT DESIGNATIONS
| # | Topic | Witness Testimony | Contradicting Exhibit | Page:Line | Video Clip |
|---|-------|------------------|----------------------|-----------|------------|
| 1 | Email receipt | "Never received it" → Exhibit 7 shows receipt | Ex. 7 (DEF-00145) | [P:L] | {timestamp} |

### FOUNDATION DESIGNATIONS
| # | Document | Foundation Type | Complete? | Page:Line |
|---|----------|----------------|-----------|-----------|
| 1 | Exhibit 7 (email) | ESI Authentication | Yes | [P:L] |
| 2 | Exhibit 12 (log) | Business Record 803(6) | Yes | [P:L] |

### NARRATIVE DESIGNATIONS (jury impact)
| # | Topic | Why Compelling | Page:Line | Video Quality | Duration |
|---|-------|---------------|-----------|---------------|----------|
| 1 | Witness describes failure | Emotional, unguarded moment | [P:L] | Good | ~2 min |

### COUNTER-DESIGNATION PREDICTIONS
Anticipate what opposing counsel will designate to provide context:
| # | Our Designation | Their Likely Counter | Our Response |
|---|----------------|---------------------|-------------|
| 1 | Breach admission | Context Q&A where witness explains why | Re-designate our lock-in closing escape hatches |
```

---

## Output 4: The "Unknowns" Action Plan

### Purpose
Identify new entities, documents, systems, or facts mentioned during
Gear 1 narrative capture that were previously unknown, and automatically
generate the follow-up discovery needed to close the loop.

### Process
1. Review all Gear 1 notes and new information from the Hot-Wash
2. Classify each unknown by type
3. Generate the appropriate discovery instrument

### Unknowns Classification

| Type | Discovery Instrument | Template |
|------|---------------------|----------|
| **Unknown Document** | RFP (Request for Production) | "All documents relating to {description}, including but not limited to {type}, for the period {timeframe}." |
| **Unknown Entity** | Subpoena (FRCP 45 / NMRA 1-045) | Subpoena to {entity} for documents and/or testimony regarding {topic}. |
| **Unknown Witness** | Interrogatory + potential depo notice | "Identify all persons with knowledge of {topic}, including name, address, and description of knowledge." |
| **Unknown System** | RFP + ROG | "Identify and describe the {system} referenced by {witness}, including all records maintained therein for {timeframe}." |
| **Unknown Event** | ROG + RFP | "Describe in detail the {event} referenced by {witness} on {date}, including all persons involved and documents created." |

### Action Plan Template

```markdown
## UNKNOWNS ACTION PLAN
**Source Deposition:** {Witness Name}, {Date}

---

### NEW DOCUMENTS TO OBTAIN
| # | Description | Mentioned By | Context | Discovery Instrument | Draft |
|---|-------------|-------------|---------|---------------------|-------|
| 1 | "Jenkins Report" | {Witness} at ~30 min | Referenced as safety audit | RFP to {Entity} | "Request No. {X}: All documents known as or relating to the 'Jenkins Report,' including all drafts, attachments, and related correspondence, for the period {timeframe}." |
| 2 | Internal audit Q4 2023 | {Witness} at ~85 min | Conducted after incident | RFP to {Entity} | "Request No. {X}: All documents relating to any internal audit conducted in Q4 2023 concerning {topic}." |

### NEW ENTITIES TO INVESTIGATE
| # | Entity | Role | Mentioned By | Next Steps |
|---|--------|------|-------------|------------|
| 1 | Apex Safety (contractor) | Conducted safety assessments | {Witness} at ~42 min | Research entity; serve FRCP 45 subpoena for documents |

### NEW WITNESSES TO IDENTIFY
| # | Name/Description | Knowledge Area | Mentioned By | Next Steps |
|---|-----------------|----------------|-------------|------------|
| 1 | "Someone in compliance" (unnamed) | Internal complaint process | {Witness} at ~55 min | ROG: "Identify the person(s) in compliance responsible for {topic}." |

### DEADLINES
| Action | Deadline | Notes |
|--------|----------|-------|
| Serve supplemental RFPs | {date} | Before discovery cutoff |
| Serve subpoena to Apex Safety | {date} | Allow 30 days response time |
| Notice continuation depo (if needed) | {date} | Must complete before depo cutoff |
```

### Integration with DPB
The Unknowns Action Plan creates new rows in the DPB:
- New RFPs → DPB Extract with Direction = Outgoing
- New ROGs → DPB Extract with Direction = Outgoing
- New subpoenas → DPB Extract with SetType = RFP-SUBP

The AI offers to run DPB EXTRACT on the generated discovery instruments.

---

## POST Mode Invocation

**Attorney input:** "SYNAPSE POST" or "Hot wash" or "Post-depo analysis"

**Required input:**
- Deposition transcript (rough or final) OR session notes / summary
- LIVE phase data (SJ Tracker, Shield log) — auto-loaded if LIVE was run

**AI delivers in this order:**
1. **Hot-Wash Delta Report** — immediate tactical assessment
2. **SJ Fact Draft** — SUMF paragraphs with [Page:Line] placeholders
3. **Designation Map** — trial-ready Q&A blocks + exhibit pairings
4. **Unknowns Action Plan** — follow-up discovery generators

**Token management:** If output is large, chunk:
- Part 1: Hot-Wash + SJ Fact Draft
- Part 2: Designation Map
- Part 3: Unknowns Action Plan + DPB integration

---

## Transcript Processing Protocol

### Rough Transcript (same-day)
- Use approximate timestamps and paraphrased Q&A
- Mark all [Page:Line] as `[ROUGH — UPDATE WITH FINAL]`
- Prioritize Hot-Wash and Action Plan (time-sensitive)

### Final Transcript (when received)
- Attorney invokes: "SYNAPSE POST UPDATE — final transcript received"
- AI updates all [Page:Line] placeholders with exact references
- AI reviews for any admissions or impeachment moments missed in rough review
- AI finalizes Designation Map with exact page:line ranges
- AI updates SUMF draft with precise citations

---

*CONFIDENTIAL — Parnall & Adams Law, LLC — Attorney Work Product*
