# Statutory Grammar & Interpretation Framework — SGA Reference

**Version:** 1.0
**Applies to:** SGA (Statutory Grammar Analyzer)

## Purpose

SGA performs deep grammatical analysis of statutory text to identify ambiguities,
resolve interpretation disputes, and map grammatical structure to legal meaning.
This reference defines the analytical framework.

## Canons of Construction

### Textual Canons

| Canon | Description | Application |
|-------|-------------|-------------|
| **Plain Meaning** | Words given their ordinary, contemporary, common meaning | Default starting point; resort to other canons only when plain meaning is ambiguous |
| **Whole Act Rule** | Interpret provisions in context of the entire statute | Cross-reference related sections; avoid reading provisions in isolation |
| **Consistent Usage** | Same term carries same meaning throughout statute | Flag instances where the same term appears to have different meanings |
| **Surplusage** | Every word should be given effect; no word is superfluous | Identify provisions that would be rendered meaningless by a proposed interpretation |
| **Expressio Unius** | Expression of one thing implies exclusion of others | Lists without "including but not limited to" imply exclusivity |
| **Noscitur a Sociis** | Word known by its associates — interpret in context of surrounding words | Analyze terms in a series to derive meaning from the group |
| **Ejusdem Generis** | General term following specific terms limited to same class | Identify general catch-all terms and constrain to the genus of the listed specifics |

### Grammatical Analysis Points

| Element | What to Analyze | Impact |
|---------|----------------|--------|
| **"And" vs. "Or"** | Conjunctive vs. disjunctive requirements | "And" = all conditions required; "Or" = any condition sufficient |
| **"Shall" vs. "May"** | Mandatory vs. permissive | "Shall" = mandatory obligation; "May" = discretionary authority |
| **"Including"** | Illustrative vs. exhaustive list | "Including" without "but not limited to" — analyze whether exhaustive |
| **Comma placement** | Modifying clause scope | Determines which terms a modifier applies to |
| **Antecedent reference** | What does "it," "such," or "thereof" refer to? | Ambiguous antecedents create interpretation disputes |
| **Active vs. passive voice** | Who bears the obligation? | Passive voice can obscure the actor responsible |
| **Temporal markers** | "Before," "after," "within," "upon" | Defines sequence and deadlines; ambiguity affects timeliness |

## New Mexico Statutory Interpretation Hierarchy

1. **Plain language** of the statute (primary)
2. **Legislative history** and committee reports (secondary)
3. **Agency interpretation** if statute delegates authority (Chevron-like deference in NM)
4. **Canons of construction** (aids to interpretation, not binding rules)
5. **Policy and purpose** as expressed in legislative findings or preamble

## Output Format Requirements

For each analyzed provision, SGA must produce:

1. **Parsed Structure** — diagrammed sentence showing subject, verb, object, modifiers
2. **Ambiguity Identification** — flag each grammatical ambiguity with type classification
3. **Interpretation Options** — for each ambiguity, present competing readings
4. **Canon Application** — which canons support which reading
5. **Recommendation** — which interpretation is strongest, with confidence level

---

*CONFIDENTIAL — Attorney Work Product*
