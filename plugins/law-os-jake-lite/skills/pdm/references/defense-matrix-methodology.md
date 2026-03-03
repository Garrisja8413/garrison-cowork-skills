# Proof of Defense Matrix Methodology — PDM Reference

**Version:** 1.0
**Applies to:** PDM (Proof of Defense Matrix Builder)

## Purpose

PDM builds a litigation-ready defense matrix by joining CFP facts to LPB law
on Element_ID for all defense elements. This reference defines the methodology
for element mapping, gap analysis, and strategic assessment.

## Matrix Construction

### Step 1 — Defense Element Identification
Extract all defense elements from LPB:
- **Affirmative defenses:** Comparative fault, assumption of risk, statute of
  limitations, immunity, accord and satisfaction, etc.
- **Responsive defenses:** Denial of duty, denial of breach, denial of causation,
  denial of damages
- **Counterclaim elements:** If applicable, each counterclaim is treated as a
  separate proof matrix

### Step 2 — Fact-to-Element Mapping
For each defense element, map relevant facts from CFP:
- **Supporting facts:** Evidence that supports the defense element
- **Contradicting facts:** Evidence that undermines the defense element
- **Neutral facts:** Evidence with ambiguous relevance

### Step 3 — Strength Assessment
Rate each element using a three-tier scale:
- **Strong (S):** Multiple supporting facts, no contradicting facts, legal
  authority squarely on point
- **Partial (P):** Some supporting facts but gaps exist, or contradicting facts
  create uncertainty
- **Missing (M):** No supporting facts identified, or contradicting facts
  outweigh supporting facts

### Step 4 — Gap Analysis
For each element rated Partial or Missing:
- Identify what specific evidence would strengthen the element
- Map to specific discovery requests that could fill the gap
- Prioritize gaps by strategic importance to the case

## Strategic Analysis

### Exploiting Opponent's Defense Gaps
For elements where the opponent bears the burden of proof:
- Missing elements represent weaknesses to target in discovery
- Summary judgment may be appropriate where elements have no evidentiary support
- Deposition questions can be designed to confirm gaps

### Strengthening Our Affirmative Defenses
For elements where we bear the burden:
- Missing elements require investigation or supplemental discovery
- Partial elements may need expert witness support
- Strong elements should be highlighted in dispositive motions

## Output Format

PDM produces:
- **Excel workbook** with one row per element, columns for:
  - Element_ID, Element description, Legal standard
  - Supporting facts (with CFP cross-reference)
  - Contradicting facts (with CFP cross-reference)
  - Strength rating (S/P/M)
  - Discovery gap recommendation
- **Strategic Defense Layer packet** summarizing:
  - Overall defense posture assessment
  - Priority gaps requiring immediate attention
  - Recommended discovery and investigation actions
  - Summary judgment viability assessment per defense
