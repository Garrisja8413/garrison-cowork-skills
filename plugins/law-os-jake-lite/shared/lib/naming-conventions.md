# Skill Naming Conventions v1.2

## Folder Names

1. **Short acronyms** (3-4 chars) are acceptable for well-known skill names: `cfp`, `lpb`, `dpb`, `pcm`, `pdm`, `dvp`, `cal`, `mtc`, `msj`, `gfl`, `drp`, `drr`, `drs`, `ocn`, `qvs`, `r11`, `adr`, `dc`, `sdc`, `sga`, `nml`, `dro`
2. **Multi-word names** use kebab-case: `letter-of-representation`, `mtd-response`, `trial-brief`, `depo-notice`
3. **Maximum length:** 30 characters
4. **Prefixed names** for related groups: `oa-rog`, `oa-rfp`, `oa-rfa` (objection analyzers), `pa-doc-format-*` (firm format overlays), `depo-*` (deposition suite)
5. **No underscores, no camelCase, no spaces**

## Display Names

- Used in documentation and CLAUDE.md tables
- Title case: "Motion to Compel", "Case Fact Pack Builder"
- Acronyms stay uppercase: "MSJ", "CFP", "DRP"

## Frontmatter `name` Field

- MUST exactly match the folder name
- Example: folder `msj-spj/` -> `name: msj-spj`

## Renames Applied in v1.2

| Previous Name | v1.2 Name | Reason |
|---------------|-----------|--------|
| `msj-specific-personal-jurisdiction` | `msj-spj` | Exceeded 30-char limit (39 chars) |

## Reference File Names

- Kebab-case: `output-format.md`, `demand-anchoring.md`
- Descriptive: prefer `mode-corporate.md` over `mode-2.md`
- Always `.md` extension
