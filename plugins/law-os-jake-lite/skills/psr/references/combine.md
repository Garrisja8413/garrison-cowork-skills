# COMBINE Stage — Reference (PSR v1.0)

Read this file when entering COMBINE mode.

## Purpose

Merge multiple PSR Extract files (e.g., complaint extract + answer extract +
counterclaim extract) into one consolidated workbook that provides a unified
view of all pleading data for a case.

## COMBINE is a DATA-ENGINEERING TASK

Claude MUST write and execute pandas scripts. Claude's text response should
contain ONLY the summary/QA report, not the row-by-row data.

## Workflow

### Step 1: Load All Input PSR Files

```python
import pandas as pd

# Load each PSR extract
files = [
    'PSR-Extract-CASE-Complaint.xlsx',
    'PSR-Extract-CASE-Answer.xlsx',
    # ... additional files
]

dfs = {}
for f in files:
    for sheet in ['Pleading_Index', 'Allegations', 'Responses',
                  'Affirmative_Defenses', 'Claims_Register', 'Processing_Log']:
        key = f"{f}_{sheet}"
        try:
            dfs[key] = pd.read_excel(f, sheet_name=sheet)
        except:
            pass  # Sheet may not exist in all files
```

### Step 2: Merge Pleading_Index Tabs
Concatenate all Pleading_Index rows. Deduplicate on PleadingID. Flag any
PleadingID collisions.

### Step 3: Cross-Link Allegations to Responses

**THIS IS THE CRITICAL STEP.**

For every row in the `Responses` tab:
1. Look up `AllegationParaNum` in the `Allegations` tab
2. Verify the `AllegationID` foreign key is valid
3. If a response references a paragraph that doesn't exist in the Allegations
   tab, flag as `[PARAGRAPH-MISMATCH]` in Notes

```python
# Cross-link validation
allegations_df = combined_allegations.set_index('ParaNum')
for idx, row in combined_responses.iterrows():
    para = row['AllegationParaNum']
    if para not in allegations_df.index:
        combined_responses.at[idx, 'Notes'] = (
            f"[PARAGRAPH-MISMATCH] Response references ¶{para} "
            f"but no matching allegation found in complaint extract"
        )
```

### Step 4: Handle Amended Pleadings

When combining an original complaint with an amended complaint:

1. **The amended version controls.** All allegations from the amended complaint
   are the current operative allegations.
2. **Original allegations are preserved** but get `Notes=[SUPERSEDED by {AmendedPleadingID}]`.
3. **Responses to the original complaint** that reference paragraphs also in
   the amended complaint retain their links. Responses to paragraphs removed
   in the amendment get `Notes=[ALLEGATION SUPERSEDED]`.

### Step 5: Merge Claims_Register

- Combine all claims, counterclaims, cross-claims
- Deduplicate on ClaimID
- For amended complaints: superseded claims get `Status=SUPERSEDED`

### Step 6: Merge Affirmative_Defenses

- Combine all affirmative defenses
- If amended answer changes defenses, original versions get
  `Notes=[SUPERSEDED by {AmendedPleadingID}]`

### Step 7: Write Combined Output

Write all merged tabs to a single Excel file:
`PSR-Combined-{CASE_CODE}-Master.xlsx`

### Step 8: Generate QA Summary

Report:
- Total pleadings combined: [N]
- Total allegations: [N] (active) + [N] (superseded)
- Total responses: [N] matched + [N] unmatched (PARAGRAPH-MISMATCH)
- Total affirmative defenses: [N]
- Total claims/counterclaims/cross-claims: [N]
- Paragraph mismatches: [list]
- Superseded entries: [count]

## Merge Rules

1. **PleadingID is globally unique.** No two pleadings may share a PleadingID.
2. **AllegationID includes PleadingID.** This ensures allegations from different
   pleadings are never confused.
3. **ResponseID includes PleadingID.** Same principle.
4. **The most recent active pleading controls.** When both original and amended
   exist, the amended is the operative pleading.
5. **Never delete superseded rows.** Mark them, but preserve for history.
