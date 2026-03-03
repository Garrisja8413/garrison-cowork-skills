# ENRICH Stage — Reference (CFP v7.0)

Read this file when entering ENRICH mode.

## Purpose

Add classification, scoring, and hierarchy to existing extracted rows.
This stage does NOT extract new facts — it annotates what EXTRACT produced.

## When to use

- User has a CFP Excel file from EXTRACT or COMBINE
- User says "enrich this", "add scoring", "classify facts", "tag the pack"

## Workflow

### Step 1: Load the Input Excel
Read the EXTRACT/COMBINE output. Inventory: row counts, DocIDs, any existing flags.

### Step 2: Classify Facts
Add to each Fact row:
- **PackType** — what subject area (see vocabulary below)
- **PartyTag** — which party this fact relates to
- **EvidenceType** — what kind of evidence supports it
- **UseType** — how it would be used in litigation

### Step 3: Score Facts
Add to each Fact row:
- **AdmisScore** — admissibility assessment
- **CredScore** — credibility assessment

### Step 4: Build Hierarchy
Add to each Fact row:
- **FactLevel** — Micro/Component/Composite/Material
- **FactGroupID** — cluster related facts

### Step 5: Extract Admissions
Scan Quotes and Facts for party admissions → create Admissions tab.

### Step 6: Tag Quotes and Timeline
Add PackType + PartyTag to Quotes and Timeline rows.

### Step 7: Save Enriched Excel + Report

## Columns Added to Facts

| Column | Values | Notes |
|--------|--------|-------|
| PackType | See vocabulary | Primary assignment; note secondary in Notes |
| PartyTag | `Pl-[Name]`, `Def-[Name]`, `TP-[Name]`, `All`, `N/A` | |
| EvidenceType | See vocabulary | |
| UseType | See vocabulary | |
| AdmisScore | See scoring | |
| CredScore | See scoring | |
| FactLevel | Micro, Component, Composite, Material | Default: Micro |
| FactGroupID | `FG-[CATEGORY]-[###]` | Groups related facts |

## Controlled Vocabulary

### PackType
| Value | What belongs |
|-------|-------------|
| `Core` | Party ID, jurisdiction/venue, case posture, service |
| `Incident` | Event/accident/breach — scene, sequence, conditions |
| `Medical` | Treatment, diagnosis, symptoms, prognosis, causation |
| `Damages` | Economic + non-economic damages, life impact |
| `Liability` | Duty, breach, fault, causation — per-party via PartyTag |
| `Corporate` | Corporate structure, agency, control, alter ego |
| `Jurisdiction` | Personal jurisdiction, venue, minimum contacts |
| `Expert` | Expert opinions, bases, methodology |
| `Discovery` | Discovery positions, responses, objections |
| `Background` | Prior history, relationships, context |

### EvidenceType
Direct_Testimony, Deposition_Testimony, Party_Admission, Interrogatory_Response,
RFA_Response, Treating_Provider_Record, Business_Record, Public_Record,
Expert_Report, Expert_Testimony, Photograph, Video, Physical_Evidence,
Contract_Document, Correspondence, Affidavit, Declaration, Other

### UseType
Fact_Assertion, Admission, Impeachment, Corroboration, Foundation,
Authentication, Expert_Basis, Damages_Proof, Causation, Timeline_Event,
Background, Discovery_Position, Other

## Scoring

### AdmissibilityScore (AdmisScore)
| Value | Meaning |
|-------|---------|
| `Binding-Admission` | RFA admission, judicial admission, stipulation |
| `Admitted` | Depo/interrogatory/pleading admission |
| `Likely-Admissible` | Business record w/ foundation, testimony w/ personal knowledge |
| `Conditional` | Admissible if foundation/exception established |
| `Disputed` | Likely objection, may need ruling |
| `Problematic` | Significant admissibility issues |
| `Unknown` | Needs attorney analysis |

### CredibilityScore (CredScore)
| Value | When |
|-------|------|
| `Very-High` | Multiple corroborating sources, binding admission |
| `High` | Business record, treating physician with personal knowledge |
| `Medium-High` | Single credible source, some corroboration |
| `Medium` | Single source, no reason to doubt |
| `Medium-Low` | Self-serving statement, minor inconsistencies |
| `Low` | Contradicted by other evidence, credibility issues |
| `Unknown` | Insufficient basis to assess |

Score based on the FACT AS STATED, not your assessment of truth.
Score conservatively when uncertain — prefer `Unknown` over guessing.

## Hierarchical Fact Grouping

| FactLevel | Definition | Example |
|-----------|-----------|---------|
| `Micro` | Smallest discrete attribute (DEFAULT) | "The vehicle was red" |
| `Component` | Combines related micro-facts | "Defendant drove a red Toyota" |
| `Composite` | Broader proposition from components | "Defendant ran stop sign and struck Plaintiff" |
| `Material` | Suitable for SUMF, maps to claim element | "A collision occurred between the vehicles" |

- FactGroupID format: `FG-[CATEGORY]-[###]` (e.g., `FG-INCIDENT-001`)
- Group related micro-facts under the same FactGroupID

## Admissions Tab (created in ENRICH)

| Column | Required | Notes |
|--------|----------|-------|
| AdmissionID | Yes | `ADM-###` |
| AdmissionType | Yes | Binding-RFA, Deemed-RFA, Pleading-Admission, Depo-Admission, Interrogatory-Admission, Stipulation, Judicial-Admission, Failure-to-Deny, Other |
| AdmittingParty | Yes | Party name |
| AdmissionText | Yes | The admission text |
| SourceDocID | Yes | Must match File_Metadata |
| Pinpoint | Yes | Or `PINPOINT NEEDED` |
| BindingEffect | Yes | Conclusively-Established, Strong-Evidence, Limited-Scope, Qualified, Withdrawn |
| RelatedFactIDs | Yes | Comma-separated Fact#s this admission supports |
| PackType | Yes | From vocabulary |
| PartyTag | Yes | From vocabulary |

## Enrichment for Quotes and Timeline

Add to existing Quotes rows:
- PackType
- PartyTag

Add to existing Timeline rows:
- PackType
- PartyTag

## Chunking (large enrichment jobs)

If the EXTRACT output has 100+ fact rows, process enrichment in batches:
1. Load the Excel file
2. Enrich rows 1-50 (update Excel, save)
3. Report: "Enriched [50] of [N] rows. Reply 'continue'."
4. Enrich rows 51-100 (update Excel, save)
5. Continue until complete

This prevents output token exhaustion on large packs.

## QA Summary (end of ENRICH)

Report:
- Rows enriched per tab
- PackType distribution (count per type)
- PartyTag distribution
- Admissions found: [count]
- Rows needing attorney review (Unknown scores): [count]
- "Next: Run VERIFY on this enriched file"
