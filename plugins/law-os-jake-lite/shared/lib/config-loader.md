# Config Loader — How Skills Reference Shared Configuration

## Overview

Every skill that outputs firm identity, attorney identity, court-formatted documents, or styled output references the shared configuration files instead of hardcoding values. This document defines the resolution rules.

## Config File Locations

```
shared/
├── config/
│   ├── firm-config.yaml          # Firm identity (name, address, phone, etc.)
│   └── user-profiles/
│       ├── charles-parnall.yaml  # Attorney: bar#, sig block, role
│       └── david-adams.yaml
├── court-rules/
│   ├── nm-state.yaml             # NM state court formatting (NMRA)
│   └── nm-federal.yaml           # D.NM / 10th Circuit rules
├── firm-styles/
│   ├── pa-style.yaml             # Parnall & Adams style
│   └── generic-style.yaml        # Default style for new firms
└── lib/
    ├── config-loader.md          # This file
    └── merge-token-map.md        # Merge token → config path mapping
```

## Resolution Rules

### 1. Firm Identity

When a skill needs firm name, address, phone, or other firm-level data:

1. Read `shared/config/firm-config.yaml`
2. Use the `firm.*` fields for identity
3. Use the `attorneys` list for available attorneys
4. Use `defaults.active_attorney` to determine the current attorney (unless the user specifies otherwise)

### 2. Attorney Identity

When a skill needs the active attorney's name, bar number, or signature block:

1. Determine the active attorney slug:
   - If the user has specified an attorney in this session, use that
   - Otherwise, use `defaults.active_attorney` from `firm-config.yaml`
2. Read `shared/config/user-profiles/{slug}.yaml`
3. Use the appropriate `signature_block` variant (pleading vs. letter)

### 3. Court Rules (Mandatory)

When a skill produces court-filed documents:

1. Determine the jurisdiction:
   - If the user has specified, use that
   - Otherwise, use `defaults.jurisdiction` from `firm-config.yaml`
2. Read `shared/court-rules/{jurisdiction}.yaml`
3. Apply ALL rules — these are HARD REQUIREMENTS, not suggestions
4. Court rules CANNOT be overridden by firm style

### 4. Firm Style (Swappable)

When a skill applies formatting preferences:

1. Determine the firm style:
   - If the user has specified, use that
   - Otherwise, use `defaults.firm_style` from `firm-config.yaml`
2. Read `shared/firm-styles/{firm_style}.yaml`
3. Apply style rules ONLY WHERE THEY DON'T CONFLICT with court rules
4. If a court rule and firm style rule conflict, the court rule wins

### 5. Two-Layer Merge Order

For any document formatting decision:

```
Court Rule (mandatory)  →  WINS (always)
Firm Style (preference) →  Applied only where court rule is silent
```

Example:
- Court says: "minimum font size 12pt" → HARD REQUIREMENT
- Firm says: "use Optima 12pt" → Applied (satisfies court minimum)
- If firm said "use 10pt" → BLOCKED (violates court minimum)

## Skill Integration Pattern

### Before (hardcoded):
```markdown
Sign: Charles R. Parnall, Esq. (Bar No. 24069)
Parnall & Adams Law, LLC
2116 Vista Oeste NW, Suite 403, Albuquerque, NM 87120
```

### After (config-referenced):
```markdown
For the signature block, use the active attorney's signature block
from `shared/config/user-profiles/{active_attorney}.yaml`.

For firm identity (name, address, phone), use
`shared/config/firm-config.yaml`.

For court formatting rules, load `shared/court-rules/{jurisdiction}.yaml`
— these are MANDATORY and cannot be overridden.

For firm style preferences, load `shared/firm-styles/{firm_style}.yaml`
— these layer on top of court rules.
```

## Validation

A skill can verify its config is properly loaded by checking:

1. `firm-config.yaml` exists and has `firm.name` populated
2. Active attorney profile exists and has `name` + `signature_block` populated
3. Court rules file exists for the target jurisdiction
4. Firm style file exists for the target style

If any required config is missing, the skill should STOP and tell the user what needs to be configured, following the fail-closed principle.
