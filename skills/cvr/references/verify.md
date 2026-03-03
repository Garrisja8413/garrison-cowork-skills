# VERIFY Stage — Reference (CVR v1.0)

Read this file when entering VERIFY mode.

## Purpose

Compare every proposition, quote, and pinpoint attributed to a case in the
pleading against the actual full opinion text. Produce a Fidelity Report that
gives the user absolute confidence in their citations — or flags problems
before they become Rule 11 issues.

## Verification Methodology

### For Each Case in the Citation Index:

1. **Load the full opinion text** from the retrieved .txt file
2. **Read the entire opinion** — not just the pinpointed pages. Context matters.
   A holding on page 322 may be qualified by language on page 330.
3. **Perform each verification check below**
4. **Update the Fidelity Report**

## Check 1: Quote Verification

**Standard: QVS Zero Tolerance**

For each QuotedLanguage entry in the Citation Index:

1. Search the full opinion text for the quoted language
2. Compare character-for-character

**Scoring:**
- **MATCH** — Exact match found. Record the location in the opinion.
- **NEAR-MATCH** — Language is substantively the same but has differences.
  Record: what word(s) differ, whether the difference is material, and the
  actual text from the opinion. Common near-match causes:
  - Ellipsis in the pleading omitting non-essential words (usually acceptable)
  - Brackets in the pleading altering capitalization (usually acceptable)
  - Word substitution (flag as potentially material)
  - Omission of qualifying language (flag as potentially material)
- **MISQUOTED** — Material differences between the pleading's quote and the
  actual opinion text. This is a RED flag. Record the exact differences and
  the actual opinion text.
- **NOT-FOUND** — The quoted language does not appear anywhere in the opinion.
  This is a RED flag. Could indicate: wrong case cited, wrong reporter volume,
  or fabricated quotation.
- **N/A** — No quoted language in the pleading for this case (only propositions).

### Near-Match Analysis Framework

When differences are found, classify each difference:

| Difference Type | Materiality | Example |
|----------------|-------------|---------|
| Capitalization change via brackets | Low | "[T]he court held..." vs "the court held..." |
| Ellipsis omitting non-essential words | Low-Medium | Depends on what was omitted |
| Word substitution | Medium-High | "must" vs "should" changes legal meaning |
| Omission of qualifying clause | High | Dropping "in most circumstances" changes the rule |
| Combining two separate passages | High | Stitching together language from different pages |

## Check 2: Proposition Verification

For each PropositionCited in the Citation Index:

1. Read the full opinion looking for language that supports or contradicts the
   proposition
2. Identify whether the proposition reflects a holding, dictum, standard
   recitation, or factual finding

**Scoring:**
- **VERIFIED** — The opinion expressly holds or states this proposition. The
  proposition is a fair and accurate characterization of the court's ruling.
  Record the supporting language and its location.
- **SUPPORTED** — The proposition is a reasonable inference from the opinion
  but is not stated as directly as the pleading implies. This is a YELLOW flag.
  Record the closest supporting language and explain the gap.
- **DICTA** — The language exists in the opinion but is dictum, not holding.
  The pleading may be overstating the authority. YELLOW flag. Record the context
  showing it is dicta (e.g., "even if we were to consider...", hypothetical
  discussion, alternative holding).
- **UNSUPPORTED** — The opinion does not contain language supporting this
  proposition. RED flag. The case may be cited for a point it does not actually
  address.
- **CONTRARY** — The opinion actually holds the opposite of what the pleading
  claims. RED flag. Record the contrary holding and its location.

### Proposition Analysis Framework

When assessing whether a proposition is supported:
- **Holding** = the legal conclusion necessary to the outcome. Strongest authority.
- **Alternative holding** = "even if X, Y would still apply." Still binding but
  sometimes disputed.
- **Standard recitation** = the court restating a legal test before applying it.
  Reliable for the test itself, but the court's application may limit or expand it.
- **Dictum** = discussion not necessary to the outcome. Persuasive but not binding.
- **Factual finding** = a determination about the specific facts of that case.
  Not directly transferable to other cases but may support analogical reasoning.

## Check 3: Pinpoint Verification

For each cited pinpoint:

1. Locate the cited page/paragraph in the opinion
2. Check whether the relevant material actually appears at that location

**Scoring:**
- **CORRECT** — The cited material is found at the specified pinpoint.
- **WRONG-PAGE** — The material exists in the opinion but at a different location.
  Provide the correct pinpoint. YELLOW flag.
- **NOT-AT-PINPOINT** — The cited pinpoint does not contain material related to
  the proposition. RED flag. May indicate a transposition error or incorrect
  citation.

Note: For NM cases using paragraph-based citation (para. 15), verify the
paragraph number. For federal cases using page-based citation, verify the page.

## Check 4: Context Verification

This is the most judgment-intensive check. Read the surrounding text to
determine whether the cited language is presented in its proper context.

**Scoring:**
- **IN-CONTEXT** — The full opinion context confirms the pleading's use of
  this authority. No material qualifications or limitations are omitted.
- **PARTIAL-CONTEXT** — The opinion contains qualifications, exceptions, or
  limitations that the pleading does not mention. YELLOW flag. Record what
  context is missing and assess whether the omission changes the legal import.
  Common partial-context issues:
  - Court applied a specific standard that limits the holding's breadth
  - Holding was based on specific facts not present in the current case
  - Court noted an exception that may apply
  - Subsequent portion of opinion limited or walked back the cited language
- **OUT-OF-CONTEXT** — The full opinion context materially changes the meaning
  of the cited language. RED flag. Examples:
  - Court was describing a standard it then rejected
  - Language was from a dissent, not the majority
  - Court was summarizing a party's argument, not endorsing it
  - Holding was explicitly limited to specific circumstances not present here

## Overall Fidelity Rating

Combine all four checks into a single rating:

- **GREEN** — All checks pass. Citation is accurate and reliable.
  - QuoteStatus: MATCH or N/A
  - PropositionStatus: VERIFIED
  - PinpointStatus: CORRECT
  - ContextStatus: IN-CONTEXT

- **YELLOW** — Minor issues that should be reviewed but may not require correction.
  - Any check scored NEAR-MATCH, SUPPORTED, DICTA, WRONG-PAGE, or PARTIAL-CONTEXT
  - None scored MISQUOTED, UNSUPPORTED, CONTRARY, NOT-FOUND, or OUT-OF-CONTEXT

- **RED** — Material problems requiring correction before use.
  - Any check scored MISQUOTED, UNSUPPORTED, CONTRARY, NOT-FOUND (for quotes),
    NOT-AT-PINPOINT, or OUT-OF-CONTEXT

## Output: Fidelity Report Excel

Update the Citation Index with all verification columns. Use the raw-string
pattern for data output. Save as `CVR-Fidelity-[PleadingName].xlsx`.

## Verification Reporting

After each case is verified, report:

```
**Verified: CVR-[CiteID] — [CaseName]**
- Quote: [status]
- Proposition: [status]
- Pinpoint: [status]
- Context: [status]
- Overall: [GREEN/YELLOW/RED]
- [If YELLOW or RED: brief explanation of the issue]
```

After all cases verified, provide the summary:
```
**CVR Fidelity Summary — [Pleading Name]**
- Total cases: [N]
- GREEN: [count] — citations verified accurate
- YELLOW: [count] — minor issues to review
- RED: [count] — material problems requiring correction
```

Then list each YELLOW and RED case with a one-line explanation of the issue.
