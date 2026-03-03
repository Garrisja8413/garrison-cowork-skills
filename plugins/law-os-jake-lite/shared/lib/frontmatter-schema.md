# Frontmatter Schema v1.2

**Standard:** Every SKILL.md in Law-OS Lite v1.2 MUST have a YAML frontmatter block between `---` markers at the top of the file.

## Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Skill folder name (kebab-case or short acronym) |
| `description` | string (folded `>-`) | What the skill does, max 1024 chars. Optimized for Cowork trigger matching. |

## Recommended Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `display_name` | string | Human-readable name | "Motion to Compel" |
| `version` | string | Skill version | "1.0" |
| `category` | enum | One of: `builder`, `drafting`, `analysis`, `correspondence`, `discovery-review`, `discovery-response`, `deposition`, `formatting` | "drafting" |
| `pack_consumes` | list | Packs this skill reads as input | `[CFP, LPB]` |
| `pack_produces` | list | Packs this skill writes as output | `[PCM]` |
| `checkpoints` | integer | Number of attorney checkpoint pauses (0 if none) | 3 |
| `author` | string | Skill author | "Parnall & Adams" |
| `license` | string | License type | "Proprietary" |

## Validation Rules

1. `name` MUST match the skill folder name exactly
2. `description` MUST be 1024 characters or fewer
3. `description` SHOULD use `>-` folding style (strips trailing newline)
4. `category` MUST be one of the 8 allowed values if present
5. `pack_consumes` and `pack_produces` use uppercase pack acronyms (CFP, LPB, DPB, DVP, PCM, PDM)
6. `checkpoints` = 0 means no attorney pauses; omit if 0
7. SKILL.md MUST be 500 lines or fewer

## Category Definitions

| Category | Description | Example Skills |
|----------|-------------|----------------|
| `builder` | Creates structured packs from source documents | CFP, LPB, DPB, PCM, PDM, DVP, CAL |
| `drafting` | Produces legal document body text | Complaint, MSJ, MTC, Demand, Trial-Brief |
| `analysis` | Analyzes packs or documents without producing a filing | ADR, DC, SDC, SGA, DRO, Depo-Impeach, Depo-Index |
| `correspondence` | Produces letters or notices | GFL, LOR |
| `discovery-review` | Reviews opponent's discovery responses | DRR, OA-ROG, OA-RFP, OA-RFA, DRS, OCN |
| `discovery-response` | Drafts responses to incoming discovery | DRP, QVS |
| `deposition` | Deposition preparation, conduct, or analysis | SYNAPSE, Depo-Notice, Depo-Outline |
| `formatting` | Applies format overlays to drafts | NML, PA-DOC-FORMAT-PLEADINGS/LETTERS/DISCOVERY |

## Lint Enforcement

`scripts/lint_skill_md.py` validates:
- Frontmatter present and parseable
- Required fields present (`name`, `description`)
- Description length <= 1024 chars
- SKILL.md <= 500 lines
- No phantom reference sections
