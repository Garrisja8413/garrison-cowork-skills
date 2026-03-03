# Merge Token Map — Token-to-Config Path Resolution

## Overview

Several skills and format overlays use merge tokens (e.g., `[MERGE:FirmName]`) as placeholders for dynamic firm/attorney data. This document maps each merge token to its source in the shared configuration.

## Token Resolution Table

### Firm Identity Tokens

| Token | Config Path | Example Value |
|-------|-------------|---------------|
| `[MERGE:FirmName]` | `firm-config.yaml → firm.name` | Parnall & Adams Law, LLC |
| `[MERGE:FirmShortName]` | `firm-config.yaml → firm.short_name` | Parnall & Adams |
| `[MERGE:FirmLetterhead]` | `firm-config.yaml → firm.letterhead_name` | Parnall & Adams Law, LLC |
| `[MERGE:FirmAddress]` | `firm-config.yaml → firm.address.full` | 2116 Vista Oeste NW, Suite 403, Albuquerque, NM 87120 |
| `[MERGE:FirmAddressLine1]` | `firm-config.yaml → firm.address.line1` | 2116 Vista Oeste NW, Suite 403 |
| `[MERGE:FirmCity]` | `firm-config.yaml → firm.address.city` | Albuquerque |
| `[MERGE:FirmState]` | `firm-config.yaml → firm.address.state` | NM |
| `[MERGE:FirmZip]` | `firm-config.yaml → firm.address.zip` | 87120 |
| `[MERGE:FirmPhone]` | `firm-config.yaml → firm.phone` | (505) 600-1417 |
| `[MERGE:FirmFax]` | `firm-config.yaml → firm.fax` | (505) 910-4466 |
| `[MERGE:FirmEmail]` | `firm-config.yaml → firm.email` | info@parnalladams.com |
| `[MERGE:FirmWebsite]` | `firm-config.yaml → firm.website` | https://www.hurtcallcharles.com |

### Attorney Identity Tokens

| Token | Config Path | Example Value |
|-------|-------------|---------------|
| `[MERGE:AttorneyName]` | `user-profiles/{slug}.yaml → name` | Charles R. Parnall |
| `[MERGE:AttorneyFormalName]` | `user-profiles/{slug}.yaml → formal_name` | Charles S. Parnall |
| `[MERGE:AttorneyBarNumber]` | `user-profiles/{slug}.yaml → bar_number` | 24069 |
| `[MERGE:AttorneyRole]` | `user-profiles/{slug}.yaml → role` | Managing Partner |
| `[MERGE:AttorneyEmail]` | `user-profiles/{slug}.yaml → email` | charles@parnalladams.com |
| `[MERGE:SignatureBlock]` | `user-profiles/{slug}.yaml → signature_block.{doc_type}` | (full signature block) |

### SmartAdvocate Merge Tokens

These tokens are preserved for SmartAdvocate integration. When SA merge tokens are available, they take priority over config-based resolution.

| SA Token | Equivalent Config Token | Notes |
|----------|------------------------|-------|
| `<! [Letterhead] !>` | `[MERGE:FirmLetterhead]` | SA provides full letterhead; config provides name only |
| `<! [CMC-LIT-SIGNATURE LINE-ATTORNEY] !>` | `[MERGE:SignatureBlock]` (pleading) | SA includes full formatted sig |
| `<! [CMC-LTR-SIGNATURE LINE-ATTORNEY] !>` | `[MERGE:SignatureBlock]` (letter) | SA includes full formatted sig |
| `<! [CMC-LTR-Footer-Pre-Lit-First Page] !>` | (computed from firm-config) | Footer with firm address |
| `<! [CMC-LTR-Footer-Pre-Lit-With Page Numbers] !>` | (computed from firm-config) | Footer + page numbers |
| `<! [CMC-LTR-Footer-Lit-First Page] !>` | (computed from firm-config) | Litigation footer |
| `<! [CMC-LTR-Footer-Lit-With Page Numbers] !>` | (computed from firm-config) | Litigation footer + page numbers |

## Resolution Priority

When resolving a merge token:

1. **SmartAdvocate token available?** → Use the SA token value (it includes full formatting)
2. **SA token not available?** → Resolve from `shared/config/` files using the mapping above
3. **Config value missing?** → FAIL CLOSED — stop and tell the user what config needs to be populated

## How Skills Use This Map

In a SKILL.md, instead of writing:

```
Sign: Charles R. Parnall, Esq. (Bar No. 24069)
Parnall & Adams Law, LLC
2116 Vista Oeste NW, Suite 403, Albuquerque, NM 87120
```

Write:

```
For the signature block, resolve [MERGE:SignatureBlock] using the active
attorney's profile from shared/config/user-profiles/.

Resolution rules: See shared/lib/config-loader.md.
Token mapping: See shared/lib/merge-token-map.md.
```
