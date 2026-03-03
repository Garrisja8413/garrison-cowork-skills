# PACKET Mode — Reference (CFP v7.0)

Read this file when entering PACKET mode.

## Purpose

Generate a filtered markdown packet from a CFP Excel file for use in
downstream Prompt Blocks (PB-MSJ-01, PB-MTC-01, PB-GF-DISC-01, etc.).

## When to use

- User needs a subset of the CFP for a specific drafting task
- User says "build a packet for [motion type]", "filter for [party/subject]"
- Before pasting into any Prompt Block

## Workflow

### Step 1: Load CFP Excel
Read the file. Identify available tabs, row counts, and enrichment status.

### Step 2: Apply Filters
Based on user request, filter by:
- **PackType** (e.g., Medical, Liability, Jurisdiction)
- **PartyTag** (e.g., Def-Acme, Pl-Smith)
- **Status** (if VERIFY has run: DRAFT-READY only for filing work)
- **FactLevel** (e.g., Material for SUMF candidates)
- **Custom** (any column + value combination)

### Step 3: Auto-Include Dependencies
- Every DocID cited in filtered rows → include in File_Metadata section
- Related Admissions → include
- Related Timeline events → include

### Step 4: Output Filtered Packet (markdown)

## Packet Format

```markdown
### CFP FILTERED PACKET — [PackType] / [PartyTag]
### Generated: [date] | Source: [filename]
### Rows: Facts=[n], Quotes=[n], Timeline=[n], Admissions=[n], Damages=[n]

---

A) **File_Metadata** (DocIDs referenced in this packet)
| DocID | Title | Type | BatesStart | BatesEnd |
[only DocIDs cited in rows below]

B) **Facts** (filtered)
| Fact# | Fact | SourceDocID | Pinpoint | PackType | PartyTag | AdmisScore | Status | Notes |

C) **Quotes** (filtered)
| DocID | Pinpoint | Quote | Use | PackType | PartyTag |

D) **Timeline** (filtered)
| Date | Event | SourceDocID | Pinpoint | PackType | PartyTag |

E) **Admissions** (filtered, if any)
| AdmissionID | Type | AdmittingParty | Text | SourceDocID | Pinpoint | BindingEffect |

F) **Damages** (if PackType includes Damages)
| Category | Amount | SourceDocID | Pinpoint | Notes |

---

G) **Packet QA**
- DRAFT-READY rows: [count]
- PINPOINT NEEDED rows: [count + refs]
- CITE NEEDED rows: [count + refs]
- Excluded rows that may be relevant: [brief note]
- Conflicts in this packet: [count + refs]
```

## Common Filter Recipes

| Request | Filter |
|---------|--------|
| Medical packet | PackType=Medical, PartyTag=ALL |
| Liability per defendant | PackType=Liability, PartyTag=Def-[Name] |
| Jurisdiction per defendant | PackType=Jurisdiction, PartyTag=Def-[Name] |
| Corporate structure | PackType=Corporate, PartyTag=Def-[Name] |
| Damages for plaintiff | PackType=Damages, PartyTag=Pl-[Name] |
| All facts for one party | PackType=ALL, PartyTag=Def-[Name] |
| Incident + Liability | PackType=Incident+Liability, PartyTag=ALL |
| MSJ candidates | FactLevel=Material, Status=DRAFT-READY |
| Admissions only | Has Admissions tab entry |
| Draft-ready only | Status=DRAFT-READY |

## Packet for Specific Prompt Blocks

### PB-MSJ-01 (Summary Judgment)
Filter: FactLevel=Material OR FactLevel=Composite, Status=DRAFT-READY
Include: MSJ_SUMF tab if exists, all supporting Quotes, Admissions
Add: Evidence_Key references if available

### PB-MTC-01 (Motion to Compel)
Filter: PackType=Discovery, Status=DRAFT-READY
Include: Discovery_Defects tab, Meet_Confer_Log tab
Add: File_Metadata for request/response sets

### PB-GF-DISC-01 (Good Faith Letter)
Filter: PackType=Discovery
Include: Discovery_Defects tab, Meet_Confer_Log tab
Add: File_Metadata for request/response sets

### PB-MTS-01 (Motion to Strike)
Filter: PackType=Liability OR PackType=Core
Include: Pleading_Issues_Log tab
Add: File_Metadata for challenged pleading

### PB-DEM-01 (Demand Letter)
Filter: PackType=Incident+Medical+Damages+Liability
Include: All Timeline events, key Quotes, Damages tab
