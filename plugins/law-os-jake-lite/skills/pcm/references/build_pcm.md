# Building the PCM

When the user asks to build a PCM, execute the following script. It will automatically find the uploaded CFP and LPB files.

```python
import pandas as pd
import glob
import os

# Find the uploaded files
cfp_files = glob.glob("/mnt/user-data/uploads/CFP*.xlsx") + glob.glob("/home/claude/CFP*.xlsx")
lpb_files = glob.glob("/mnt/user-data/uploads/LP*.xlsx") + glob.glob("/home/claude/LP*.xlsx")

if not cfp_files or not lpb_files:
    raise FileNotFoundError("Missing required files. Please upload BOTH a CFP Excel file and an LPB Excel file.")

CFP_PATH = cfp_files[0]
LPB_PATH = lpb_files[0]
OUT_EXCEL = "/mnt/user-data/outputs/PCM-Claims-Matrix.xlsx"
OUT_MD = "/mnt/user-data/outputs/PCM-Strategic-Layer.md"

# Safe relational aggregation without Cartesian Explosion
df_facts = pd.read_excel(CFP_PATH, sheet_name='Facts', dtype=str, keep_default_na=False)
df_law = pd.read_excel(LPB_PATH, sheet_name='LAW', dtype=str, keep_default_na=False)

df_facts['Element_ID'] = df_facts['Element_ID'].replace('', 'ELEMENT-UNTAGGED')
df_law['Element_ID'] = df_law['Element_ID'].replace('', 'ELEMENT-UNTAGGED')

facts_exp = df_facts.assign(Element_ID_single=df_facts['Element_ID'].str.split('|')).explode('Element_ID_single')
law_exp = df_law.assign(Element_ID_single=df_law['Element_ID'].str.split('|')).explode('Element_ID_single')

facts_exp['Element_ID_single'] = facts_exp['Element_ID_single'].str.strip()
law_exp['Element_ID_single'] = law_exp['Element_ID_single'].str.strip()

law_agg = law_exp.groupby('Element_ID_single').agg(
    Required_Standard=('Proposition', lambda x: " \n\n".join(x.dropna().unique())),
    Law_Authorities=('LawTag', lambda x: ", ".join(x.dropna().unique()))
).reset_index()

# Reject "nan" strings to prevent Ghost Facts
facts_agg = facts_exp.groupby('Element_ID_single').agg(
    Supporting_Facts=('Fact#', lambda x: ", ".join([str(i) for i in x.dropna().unique() if str(i).lower() != "nan"])),
    Fact_Count=('Fact#', 'count'),
    Material_Count=('FactLevel', lambda x: (x == 'Material').sum())
).reset_index()

pcm = pd.merge(law_agg, facts_agg, on='Element_ID_single', how='outer').fillna("")

# HUMAN TRANSLATION DICTIONARY
element_names = {
    "DUTY-001": "Duty of Care",
    "BREACH-001": "Breach of Duty",
    "CAUSE-ACTUAL-001": "Actual Causation",
    "CAUSE-PROX-001": "Proximate Causation",
    "INJURY-001": "Physical Injury",
    "DAMAGES-ECON-001": "Economic Damages",
    "MSJ-NODISPUTE-001": "No Genuine Dispute of Fact",
    "MSJ-BURDEN-001": "Burden Shifting Standard",
    "ELEMENT-UNTAGGED": "Unclassified / Background"
}

pcm.insert(1, 'Element_Name', pcm['Element_ID_single'].map(element_names).fillna("Unknown Element"))

def classify_gap(row):
    has_law, has_facts = bool(row['Required_Standard']), bool(row['Fact_Count'])
    
    # Safe float parsing
    try:
        mat_facts = int(float(row['Material_Count'])) if str(row['Material_Count']).strip() else 0
    except ValueError:
        mat_facts = 0
        
    if has_law and has_facts and mat_facts > 0: return "COVERED"
    if has_law and has_facts: return "PARTIAL"
    if has_law and not has_facts: return "LAW-ONLY"
    if has_facts and not has_law: return "FACTS-ONLY"
    return "UNPROVEN"

pcm['Gap_Status'] = pcm.apply(classify_gap, axis=1)

# Sort by severity to put the biggest gaps at the top
status_rank = {"UNPROVEN": 1, "LAW-ONLY": 2, "FACTS-ONLY": 3, "PARTIAL": 4, "COVERED": 5}
pcm['Rank'] = pcm['Gap_Status'].map(status_rank)
pcm = pcm.sort_values('Rank').drop(columns=['Rank'])

# Write Excel
pcm.to_excel(OUT_EXCEL, sheet_name="Claims_Matrix", index=False)

# Write Markdown Packet for LawOS
with open(OUT_MD, "w", encoding="utf-8") as f:
    f.write('<strategic_layer source="PCM">\n')
    f.write('### PROOF OF CLAIMS MATRIX (GAP ANALYSIS)\n')
    f.write(pcm.to_markdown(index=False))
    f.write('\n</strategic_layer>\n')

print(f"PCM Excel saved to: {OUT_EXCEL}")
print(f"PCM Strategic Packet saved to: {OUT_MD}")
```

### Next Steps for the LLM

After the script runs, analyze the output and provide the attorney with a **Battle Map Summary** in the chat:

1. List Elements that are **COVERED**.
2. List Elements that are **LAW-ONLY** (We have the law, but missing evidence. Recommend Discovery).
3. List Elements that are **UNPROVEN** (Critical Failure Warning).
4. Instruct the user to download the `.md` packet and feed it to the LawOS Drafter.
