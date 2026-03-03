# COMBINE Stage — Reference (CFP v7.0)

Read this file when entering COMBINE mode.

## Purpose

Merge multiple partial CFP Excel files into a single consolidated master CFP.
This is the answer to processing documents one at a time and then needing one
unified pack.

## When to use

- User has 2+ CFP Excel files from separate EXTRACT runs
- User says "combine these CFPs", "merge packs", "consolidate", "build master pack"
- User has been building CFPs document-by-document and needs a single source

## Workflow

### Step 1: Inventory Input Files
List each uploaded CFP file and its contents:
- File name
- Tabs present
- Row counts per tab
- DocIDs present in File_Metadata

### Step 2: Merge File_Metadata
- Combine all File_Metadata rows
- Check for DocID collisions (same DocID, different content → flag)
- Check for duplicate documents (different DocID, same document → flag for user)

### Step 3: Merge Quotes
- Combine all Quotes tabs
- Deduplicate exact matches (same DocID + same Pinpoint + same Quote text)
- Flag near-duplicates (same quote, slight variations) for user review
- Renumber if needed

### Step 4: Merge Facts
- Combine all Facts tabs
- Renumber sequentially: `M-001, M-002, M-003...` (M = merged)
- Maintain a cross-reference: old Fact# → new Fact#
- Deduplicate exact matches
- Flag near-duplicates and CONFLICTS:
  - Same assertion, different source → keep BOTH (anti-consolidation rule)
  - Contradictory assertions → keep BOTH + add `CONFLICT` in Notes

### Step 5: Merge Timeline
- Combine all Timeline tabs
- Sort chronologically
- Deduplicate exact date+event matches from same source
- Keep separate entries for same event from different sources

### Step 6: Merge Other Tabs
For each optional tab present in any input file:
- Damages, Procedural_History, Discovery_Defects, etc.
- Merge following same dedup/conflict rules

### Step 7: Cross-Reference Validation
- Every SourceDocID in Facts must exist in merged File_Metadata
- Every DocID in Quotes must exist in merged File_Metadata
- Flag orphaned references

### Step 8: Create Excel + Merge Report

## Output Excel Structure

Same tabs as EXTRACT, but with:
- Renumbered rows (M-### prefix)
- All sources consolidated
- A **Merge_Log** tab documenting what was combined

### Merge_Log Tab
| Action | SourceFile | OriginalRef | NewRef | Notes |
|--------|-----------|-------------|--------|-------|
| Merged | CFP-Extract-MedRec.xlsx | C1-003 | M-015 | Renumbered |
| Deduped | CFP-Extract-Depo.xlsx | C2-007 | — | Exact match of M-012 |
| Conflict | CFP-Extract-MedRec.xlsx | C1-010 | M-022 | Conflicts with M-023 from Depo |

## Conflict Handling Rules

1. **Never silently resolve conflicts.** Both versions stay as separate rows.
2. **Flag clearly:** Add `CONFLICT — see also M-[###]` in Notes of both rows.
3. **Same fact, different source:** Two rows, not one. Each cites its own source.
4. **Date conflicts:** Both Timeline entries preserved, both flagged.
5. **Near-duplicate quotes:** Keep both unless byte-identical from same DocID+Pinpoint.

## QA Summary (end of COMBINE)

Report:
- Input files merged: [list]
- Total rows per tab (before/after dedup)
- Exact duplicates removed: [count]
- Conflicts flagged: [count + list]
- Orphaned DocID references: [count + list]
- "Next: Run ENRICH on this combined file"
