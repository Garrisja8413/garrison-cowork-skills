# PARSE Stage — Reference (CVR v1.0)

Read this file when entering PARSE mode.

## Purpose

Extract every case citation from an uploaded pleading, resolve short-form and
*Id.* references, and produce a structured Citation Index for retrieval.

## Citation Patterns to Recognize

### Full Case Citations
Pattern: `*Party v. Party*, [Vol] [Reporter] [Page], [Pinpoint] ([Court] [Year])`
Examples:
- *Celotex Corp. v. Catrett*, 477 U.S. 317, 322 (1986)
- *Anderson v. Liberty Lobby, Inc.*, 477 U.S. 242, 248 (1986)
- *Ruiz v. City of Santa Fe*, 2014-NMCA-102, para. 15, 336 P.3d 1013

### New Mexico Parallel Citations
NM cases may have parallel citations:
- *Rodriguez v. Brand W. Dairy*, 2016-NMSC-029, para. 27, 378 P.3d 13
- Watch for both NMSC/NMCA cites and Pacific Reporter cites

### Federal Reporter Citations
- F.2d, F.3d, F.4th (Circuit courts)
- F. Supp., F. Supp. 2d, F. Supp. 3d (District courts)
- U.S., S.Ct., L.Ed. (Supreme Court)

### Short-Form Citations
- *Celotex*, 477 U.S. at 323
- *Anderson*, 477 U.S. at 250-51

### Id. Citations
- *Id.* at 325
- *Id.* (same page as previous)
Must be resolved to the immediately preceding full citation.

### Supra References
- *Celotex*, *supra*, at 323
Resolve to the first full citation of that case in the document.

### String Citations
Multiple cases cited for the same proposition, separated by semicolons:
- *Smith*, 123 F.3d at 456; *Jones*, 789 F.3d at 101; *Brown*, 456 U.S. at 78

Each case in a string citation gets its own CiteID but shares the same
PropositionCited.

## Resolution Algorithm

1. **First pass:** Identify all full citations. Assign CiteID.
2. **Second pass:** Resolve short-form citations to their full citation by
   matching case name and reporter.
3. **Third pass:** Resolve *Id.* citations sequentially — each *Id.* refers to
   the most recent preceding citation.
4. **Fourth pass:** Resolve *supra* references to the first full citation of
   that case.
5. **Deduplication:** Merge entries for the same case. Collect all unique
   pinpoints and propositions.

## Proposition Extraction

For each citation, capture the proposition the pleading attributes to it.
This is the legal point the author is using the case to support.

Look for these patterns:
- "In *Smith*, the court held that [proposition]."
- "[Proposition]. *Smith*, 123 F.3d at 456."
- "As the Tenth Circuit explained, '[quoted language].' *Smith*, 123 F.3d at 456."
- "*See* *Smith*, 123 F.3d at 456 ([parenthetical proposition])."

Capture the proposition exactly as the pleading states it. Do not rephrase.

## Quoted Language Extraction

If the pleading directly quotes from a case, capture the quoted text exactly
as it appears in the pleading (including any brackets, ellipses, or emphasis
notations). This is what will be compared against the actual opinion text in
the VERIFY phase.

## Output: Citation Index Excel

Use the raw-string + io.StringIO pattern from LPB:

```python
import pandas as pd
import io

raw = r"""CiteID~|~CaseName~|~FullCitation~|~Court~|~Year~|~Pinpoints~|~PropositionsCited~|~QuotedLanguage~|~PleadingLocation~|~RetrievalStatus~|~VerificationStatus
CVR-001~|~Celotex Corp. v. Catrett~|~477 U.S. 317~|~U.S. Supreme Court~|~1986~|~322, 323~|~The moving party bears the initial burden of showing absence of genuine dispute~|~~|~p.4, para.12~|~PENDING~|~PENDING"""

df = pd.read_csv(io.StringIO(raw), sep=r"~\|~", engine="python")
```

Save as `CVR-Index-[PleadingName].xlsx`.
