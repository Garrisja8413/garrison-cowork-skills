# PACKET Mode — Reference (DPB v1.2)

Read this file when entering PACKET mode.

## Purpose

Generate a filtered markdown packet from a DPB Excel file for use in
downstream Prompt Blocks (PB-MTC-01, PB-GF-DISC-01). This is how DPB rows
flow into the Direct-Output drafting workflow.

## Workflow

### Step 1: Load DPB via Pandas
```python
import pandas as pd

DPB_PATH = "REPLACE"  # ← MUST SET
sheets = pd.read_excel(DPB_PATH, sheet_name=None, dtype=str, keep_default_na=False)
for name, df in sheets.items():
    print(f"{name}: {len(df)} rows, columns: {list(df.columns)}")
```

### Step 2: Apply Filters via Pandas

```python
df_req = sheets["Requests"]

# Check for Productions tab
has_productions = "Productions" in sheets and len(sheets["Productions"]) > 0
df_prod = sheets.get("Productions", pd.DataFrame())

# Example: MTC-ready rows
mtc_states = {"OBJECTION-ONLY", "EVASIVE", "CURE-FAILED", "NO-RESPONSE", "OBJECTION-WAIVED"}
mtc_mask = (
    (df_req["State"].isin(mtc_states)) &
    (df_req.get("Status", pd.Series(["PACK-READY"]*len(df_req))) == "PACK-READY")
)
filtered = df_req[mtc_mask]

# Example: Good faith letter rows (everything not COMPLETE/RESOLVED)
gf_exclude = {"COMPLETE", "WITHDRAWN", "RESOLVED", "ADMITTED", "DENIED"}
gf_mask = (
    (~df_req["State"].isin(gf_exclude)) &
    (df_req.get("Status", pd.Series(["PACK-READY"]*len(df_req))) == "PACK-READY")
)
gf_filtered = df_req[gf_mask]

# Get Productions for filtered requests (v1.2)
if has_productions:
    filtered_setids_reqnums = set(
        filtered["SetID"] + "|" + filtered["ReqNum"]
    )
    # Productions link via SetID + ReqNum (ReqNum may be pipe-delimited)
    prod_mask = df_prod.apply(
        lambda r: any(
            r["SetID"] + "|" + rn.strip() in filtered_setids_reqnums
            for rn in str(r["ReqNum"]).split("|")
        ), axis=1
    )
    filtered_prod = df_prod[prod_mask]
```

### Step 3: Auto-Include Dependencies
Every SetID in filtered rows → include matching Set_Metadata rows.

### Step 4: Output Packet as Markdown

## Packet Format

The DPB packet goes INSIDE `<evidence_layer>` (it's factual: what was asked,
answered, and what's deficient). LPB authority goes in `<legal_layer>`.

```markdown
### DISCOVERY PACK FILTERED PACKET — [Filter Type] / [Case Name]
### Source: [filename] | Generated: [date]
### Rows: [n] requests from [n] sets | [p] productions

---

A) **Set Metadata**
| SetID | SetType | Direction | Jurisdiction | ServingParty | RespondingParty | ServedDate | ResponseDate |

B) **Discovery Deficiencies** (filtered)
| SetID | ReqNum | ReqLabel | State | DeficiencyType | Severity | ObjText (summary) | AnswerText (summary) | CureRequested | Element_ID |

C) **Productions Index** (v1.2 — documents produced for filtered requests)
| ProdID | SetID | ReqNum | BatesStart | BatesEnd | DocDescription | Element_ID | CompletionFlag |

D) **Bates Production Summary** (legacy — aggregated per request)
| SetID | ReqNum | BatesProduced | Notes |

E) **Deposition Targets** (v1.2 — witnesses identified in answers)
| SetID | ReqNum | WitnessRefs | Notes |

---

F) **Packet QA**
- PACK-READY rows: [count]
- States included: [list]
- Severity breakdown: Critical=[n], Major=[n], Minor=[n]
- Element_IDs represented: [list]
- LPB authority linked: [n]/[total]
- Productions included: [count] | Element-tagged: [count]
- Depo targets: [count unique witnesses]
```

## Common Filter Recipes

| Downstream Use | State Filter | Status Filter |
|---------------|-------------|---------------|
| PB-MTC-01 (Motion to Compel) | OBJECTION-ONLY, EVASIVE, CURE-FAILED, NO-RESPONSE, OBJECTION-WAIVED | PACK-READY |
| PB-GF-DISC-01 (Good Faith Letter) | All except COMPLETE, WITHDRAWN, RESOLVED, ADMITTED, DENIED | PACK-READY |
| Spoliation tracking | Any with SPOLIATION in DeficiencyType | Any |
| RFA admissions (for CFP/MSJ) | ADMITTED, Deemed-Admitted | Any |
| By element (e.g., breach evidence) | Any | Filter by Element_ID contains "BREACH" |
| By severity (critical only) | Any | Filter DeficiencySeverity = "Critical" |
| By set type (RFPs only) | Any | Filter by SetType via Set_Metadata join |
| By direction (our outgoing only) | Any | Filter Direction = "Outgoing" via Set_Metadata join |
| Productions by element | N/A | Filter Productions.Element_ID |
| Depo planning | Any with WitnessRefs populated | PACK-READY |

## Prompt Block Mapping

| Prompt Block | DPB Filter | Also Needs |
|-------------|-----------|-----------|
| PB-GF-DISC-01 | State ≠ COMPLETE/RESOLVED | Meet_Confer_Log from CFP |
| PB-MTC-01 | State ∈ {OBJECTION-ONLY, EVASIVE, CURE-FAILED, NO-RESPONSE} | LPB packet (discovery standards) |
| PB-MSJ-01 | AdmissionResult = Admitted/Deemed-Admitted (RFA binding admissions) | CFP facts + LPB standards |

## Integration with Other Packets

When building a drafting packet for PB-GF-DISC-01 or PB-MTC-01, combine:

1. **From DPB (this packet):** Deficiency rows + Productions index inside `<evidence_layer>`
2. **From LPB:** Discovery-filtered LAW rows inside `<legal_layer>`
3. **From CFP:** Meet_Confer_Log, Timeline, File_Metadata inside `<evidence_layer>`

This separation ensures:
- Deficiencies traced to specific requests (DPB traceability)
- Productions traced to Bates ranges and elements (DPB Productions)
- Legal standards traced to authority (LPB three-layer completeness)
- Meet-and-confer efforts documented (CFP logs)
- Nothing invented by AI
