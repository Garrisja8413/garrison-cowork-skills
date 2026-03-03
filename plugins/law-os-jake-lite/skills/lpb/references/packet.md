# PACKET Mode — Reference (LPB v1.1)

Read this file when entering PACKET mode.

## Purpose

Generate a filtered markdown packet from a Law Pack Excel file for use in
downstream Prompt Blocks (PB-MSJ-01, PB-MTC-01, PB-MTS-01, PB-GF-DISC-01, etc.).
This is how Law Pack rows flow into the Direct-Output drafting workflow.

## Workflow

### Step 1: Load LP via Pandas
```python
import pandas as pd
sheets = pd.read_excel("input.xlsx", sheet_name=None, dtype=str, keep_default_na=False)
for name, df in sheets.items():
    print(f"{name}: {len(df)} rows, columns: {list(df.columns)}")
```

### Step 2: Apply Filters via Pandas
Filter programmatically — do not eyeball rows.

```python
# Example: MSJ standard authorities, pack-ready only
mask = (
    (df_law["Placement"].str.contains("MSJ", case=False, na=False)) &
    (df_law.get("Status", pd.Series(["PACK-READY"]*len(df_law))) == "PACK-READY")
)
filtered_law = df_law[mask]

# Get matching RULES
msj_rules_mask = df_rules["Category"] == "Procedure"
# (or filter by Subcategory == "Summary-Judgment" if enriched)
filtered_rules = df_rules[msj_rules_mask]
```

### Step 3: Auto-Include Dependencies
Every SourceID in filtered rows → include matching Source_Docs rows.

### Step 4: Output Packet as Markdown

If filtered result exceeds ~40 LAW rows, split into two responses.

## Packet Format

```markdown
### LAW PACK FILTERED PACKET — [Subject] / [Jurisdiction]
### Source: [filename] | Generated: [date]
### Rows: RULES=[n], LAW=[n], Standards=[n], Elements=[n]

---

A) **RULES** (rule text for this subject)
| RuleID | RuleName | Jurisdiction | Text | Status |

B) **LAW** (propositions with authority)
| LawTag | FullCitation | Court | Year | Proposition | QuoteOrSummary | Pinpoint | Placement | ShepardStatus | Status |

C) **Standards_of_Review** (if applicable)
| StandardID | StandardName | Jurisdiction | StandardText | KeyAuthority | Pinpoint |

D) **Elements_by_Claim** (if applicable)
| ClaimID | Claim | ElementNumber | ElementText | KeyAuthority | Pinpoint |

---

E) **Packet QA**
- PACK-READY rows: [count]
- PINPOINT NEEDED: [count + LawTags]
- ShepardStatus Not-Checked: [count]
- Negative Treatment: [count] — DO NOT CITE
```

## Common Filter Recipes

| Request | Filter |
|---------|--------|
| MSJ authorities | Placement contains "MSJ" |
| Motion to Compel law | Placement contains "MTC" |
| Motion to Strike law | Placement contains "MTS" |
| Discovery scope | Subcategory = "Discovery" |
| Personal jurisdiction | Subcategory = "Jurisdiction" |
| Evidence — hearsay | Subcategory = "Hearsay" or Placement contains "Hearsay" |
| All NM law | Jurisdiction = "NM" |
| All FED law | Jurisdiction contains "FED" |
| Specific claim elements | Category = "Claims", Subject contains claim name |
| Pack-ready only | Status = "PACK-READY" |
| Needs Lexis work | Status in (NEEDS-PINPOINT, VERIFY-CITE, NEEDS-QUOTE-AND-PINPOINT) |

## Prompt Block Mapping

| Prompt Block | LAW Filter | RULES Filter |
|-------------|-----------|-------------|
| PB-MSJ-01 | Placement contains "MSJ", Status=PACK-READY | Subcategory="Summary-Judgment" |
| PB-MTC-01 | Placement contains "MTC" or "Discovery", Status=PACK-READY | Subcategory="Discovery" or "Sanctions" |
| PB-GF-DISC-01 | Placement contains "Discovery", Status=PACK-READY | Subcategory="Discovery" |
| PB-MTS-01 | Placement contains "MTS" or "Pleading", Status=PACK-READY | Subcategory="Pleadings" |
| PB-DEM-01 | Category="Claims" or "Theories-Doctrines", Status=PACK-READY | As needed |

## Integration with Case Fact Pack

When building a drafting packet for a Prompt Block, combine:
1. **From Law Pack (this packet):** RULES + LAW rows for legal standards
2. **From Case Fact Pack:** Facts + Quotes + Timeline + SUMF rows for factual support

The Prompt Block receives both packets. The AI drafts BODY-ONLY using:
- Case Fact Pack rows for factual assertions (with Evidence_DocID + Bates pinpoints)
- Law Pack rows for legal propositions (with authority + pinpoints)

This separation ensures:
- Facts are traced to evidence (CFP traceability)
- Law is traced to authority (LP three-layer completeness)
- Neither is invented by AI
