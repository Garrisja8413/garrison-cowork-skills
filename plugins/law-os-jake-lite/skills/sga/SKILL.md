---
name: sga
display_name: "Statutory Grammar Analysis"
description: >-
  Statutory Grammar Analysis (SGA) — parses statutory text into grammatical
  and structural components, identifies conditions/exceptions/definitions,
  applies canons of construction, and returns an interpretive analysis report
  with ambiguity flags and supporting NM authority. Use when interpreting
  statutory language or resolving textual ambiguity (v1.0)
version: "1.0"
category: analysis
pack_consumes:
  - Statutory text
pack_produces:
  - SGA analysis report
checkpoints: 0
author: "Parnall & Adams"
license: Proprietary
---

# SGA — Statutory Grammar Analysis  v1.0

## Purpose

Parse and analyze statutory text to support legal interpretation and
statutory construction arguments.  The tool:

1. **Parses** statutory text into grammatical components (subject/verb/object,
   conditionals, enumerations, connectors, modifiers, cross-references).
2. **Classifies** each provision (operative, definitional, exception, condition,
   penalty, procedural, findings, severability, effective-date).
3. **Builds** a structural dependency tree mapping conditions to consequences,
   exceptions to operative rules, and definitions to usage locations.
4. **Applies** canons of statutory construction — textual, grammatical,
   whole-text, and substantive — identifying which canons are triggered
   and how strongly.
5. **Flags** ambiguities (modifier scope, mixed connectors, serial-comma
   gaps, competing canons) so the drafter can brief the strongest reading.

## Architecture

```
sga/
├── SKILL.md                   ← this file (metadata + instructions)
├── __init__.py                ← public API entry point
├── sga_engine.py              ← core grammatical parsing engine
├── structural_parser.py       ← hierarchical structure & dependency trees
├── canons.py                  ← canons of construction detection & analysis
└── tests/
    └── test_sga.py            ← unit tests
```

### Module Responsibilities

| Module | Responsibility |
|--------|---------------|
| `sga_engine.py` | Tokenize provisions, extract connectors, conditionals, enumerations, defined terms, cross-references, punctuation analysis, modifier-scope analysis, SVO extraction, ambiguity detection, report generation |
| `structural_parser.py` | Build dependency tree (conditions → consequences, exceptions → rules), definition-usage mapping, nesting-depth analysis, exception mapping |
| `canons.py` | Detect triggered canons (textual, grammatical, whole-text, substantive), strength rating, competing-canon identification, NM authority citation, report generation |
| `__init__.py` | `analyze_statute()` — single entry point that runs all three modules and returns a combined report |

## Input

Provide the raw statutory text and (optionally) the citation:

```
STATUTE TEXT:
<paste the full text of the statutory section>

CITATION:
§ 41-4-12 NMSA 1978
```

The tool also accepts multi-section input.  Separate sections with a blank
line or a `---` divider.

## Output

### Primary Deliverables

1. **Grammatical Analysis Report** — provision-by-provision breakdown with
   SVO structure, conditionals, enumerations, connectors, cross-references,
   punctuation notes, and ambiguities.
2. **Structural Analysis Report** — dependency tree, operative-provision table,
   condition → consequence map, exception map, definition map.
3. **Canons of Construction Report** — triggered canons grouped by family,
   strength-rated, with NM case law authority and competing-canon flags.

### Output Format

Each report section follows the project standard:

```
# REPORT TITLE
## 1. [Analysis Section]
...
---
## CITE TABLE
| # | Assertion | Authority | Confidence |
## GATE RESULTS
- Parse Integrity: PASS/FAIL
- ...
## OPEN ITEMS
- [AMBIGUITY] ...
- [VERIFY-CITE] ...
- [DECISION REQUIRED] ...
```

## Canons Covered

### Textual Canons
| Canon | Latin | Description |
|-------|-------|-------------|
| Ordinary Meaning | — | Words bear their everyday meaning unless defined |
| Noscitur a Sociis | *noscitur a sociis* | A word is known by its companions |
| Ejusdem Generis | *ejusdem generis* | General term limited by preceding specifics |
| Expressio Unius | *expressio unius est exclusio alterius* | Inclusion of one implies exclusion of others |
| In Pari Materia | *in pari materia* | Related statutes read together |
| Reddendo Singula Singulis | *reddendo singula singulis* | Parallel lists correspond item-by-item |

### Grammatical Canons
| Canon | Description |
|-------|-------------|
| Last Antecedent Rule | Modifier attaches to nearest preceding term |
| Series-Qualifier Canon | Comma-separated modifier applies to entire series |
| Conjunctive/Disjunctive | "And" = all required; "or" = any sufficient |
| Mandatory/Permissive | "Shall"/"must" = mandatory; "may" = discretionary |
| Punctuation Canon | Punctuation is part of the statute and given effect |

### Whole-Text Canons
| Canon | Description |
|-------|-------------|
| Surplusage | Every word must be given effect |
| Consistent Usage | Same word = same meaning throughout |
| Harmonious Reading | Provisions read to avoid internal conflict |
| Title & Headings | Headings are interpretive aids, not controlling |

### Substantive Canons (NM-Specific)
| Canon | Description |
|-------|-------------|
| Rule of Lenity | Criminal ambiguity favors defendant |
| Remedial Statute | Remedial statutes construed liberally |
| Strict Construction of Immunity Waivers | TCA waivers strictly construed |
| Derogation of Common Law | Statutes in derogation strictly construed |

## Hard Rules

1. **No invention.** Every canon application must be triggered by actual
   text features.  If a canon is not triggered, it is not applied.
2. **Authority discipline.** Every canon citation to NM case law must include
   a pinpoint or be marked `[VERIFY-CITE]`.
3. **Ambiguity transparency.** All identified ambiguities are surfaced in the
   OPEN ITEMS section — never suppressed.
4. **Competing canons.** When two canons point in opposite directions, both
   are reported with a `[DECISION REQUIRED]` tag.
5. **No policy arguments.** This tool performs *grammatical* analysis only.
   Policy arguments belong in the brief, not the parse.

## Pack Locations (v1.1)

**Read CFP from:** `cases/{CASE_CODE}/cfp/`
**Read LP from:** `law-packs/` + `law-packs/law-of-the-case/{CASE_CODE}/` (if exists)
**Save analysis output to:** `cases/{CASE_CODE}/drafts/`

## Usage with Other Skills

| Consuming Skill | How SGA Output is Used |
|----------------|------------------------|
| **LPB** (Law Pack Builder) | SGA analysis feeds the `Micro-Brief` and `Proposition` columns for statutory entries |
| **MTC** (Motion to Compel) | SGA resolves ambiguities in discovery rules (NMRA 1-026, 1-033, 1-034, 1-036, 1-037) |
| **ADR** (Answer Diagnostic) | SGA analyzes pleading-standard statutes and rules for defect identification |
| **MSJ** (Summary Judgment) | SGA supports statutory element analysis for undisputed-fact mapping |
| **GFL** (Good Faith Letter) | SGA identifies specific statutory obligations cited in meet-and-confer letters |

## Example

```python
from sga import analyze_statute

report = analyze_statute(
    text=\"""
    A. As used in the Tort Claims Act, "governmental entity" means the
    state or any local public body as defined in this section.
    B. A governmental entity and any public employee while acting within
    the scope of duty are granted immunity from liability for any tort
    except as waived by Sections 41-4-5 through 41-4-12 NMSA 1978.
    C. Except as provided in Subsection B of this section, nothing in
    the Tort Claims Act shall be construed to grant immunity to any
    person other than a governmental entity or public employee.
    \""",
    citation="§ 41-4-4 NMSA 1978"
)
print(report)
```
