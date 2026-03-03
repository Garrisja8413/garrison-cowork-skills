# COMBINE Stage — Reference (MPR v1.0)

Read this file when entering COMBINE mode.

## Purpose

Merge multiple MPR Extract files (e.g., motion extract + response extract +
reply extract + order extract) into one consolidated workbook that provides
a unified view of all motion practice for a case.

## COMBINE is a DATA-ENGINEERING TASK

Claude MUST write and execute pandas scripts.

## Workflow

### Step 1: Load All Input MPR Files

```python
import pandas as pd

files = [
    'MPR-Extract-CASE-MSJ-Def.xlsx',
    'MPR-Extract-CASE-MSJ-Response.xlsx',
    'MPR-Extract-CASE-MSJ-Reply.xlsx',
    'MPR-Extract-CASE-MSJ-Order.xlsx',
]

dfs = {}
for f in files:
    for sheet in ['Motion_Index', 'Issues', 'Arguments',
                  'Factual_Assertions', 'Evidence_Submitted',
                  'Rulings', 'Processing_Log']:
        try:
            dfs[f"{f}_{sheet}"] = pd.read_excel(f, sheet_name=sheet)
        except:
            pass
```

### Step 2: Merge Motion_Index
Concatenate all Motion_Index rows. Each filing is a separate row.
Validate ParentMotionID links.

### Step 3: Cross-Link Motion-Response-Reply Chain
For each response:
- Verify its ParentMotionID matches a valid motion
- Link response issues to motion issues

For each reply:
- Verify its ParentMotionID matches a valid response (or the original motion)
- Link reply arguments to response arguments

### Step 4: Merge All Tabs
Concatenate Issues, Arguments, Factual_Assertions, Evidence_Submitted from
all files. Foreign key integrity must be maintained.

### Step 5: Build Cross-Reference Summary
Create a motion lifecycle view showing:
- Motion -> Response -> Reply -> Order chain for each motion
- Timeline of filings
- Current status of each motion

### Step 6: Write Combined Output
`MPR-Combined-{CASE_CODE}-Master.xlsx`

## Merge Rules

1. **MotionID is globally unique.** No two filings share a MotionID.
2. **ParentMotionID creates the chain.** Response -> Motion, Reply -> Response.
3. **Rulings link to motions.** Every ruling references the motion it decides.
4. **Evidence_Submitted is cumulative.** All evidence from all filings is included.
5. **Never delete entries.** Withdrawn motions get `Status=WITHDRAWN`, not deletion.
