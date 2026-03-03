# EXTRACT Stage — Reference (MPR v1.0)

Read this file when entering EXTRACT mode.

## Purpose

Parse a filed motion, response, reply, or order into structured rows,
preserving every issue, argument, factual assertion, and evidence submission
verbatim with perfect party attribution.

## THE TWO DANGERS AND HOW TO AVOID THEM

**Danger 1: Output token exhaustion.** Legal arguments are verbose. You try to
output too many rows and the response gets cut off. Fix: stop at 15 Issue rows,
20 Argument rows, or 25 Factual Assertion rows per chunk, period.

**Danger 2: Python syntax crash from embedded text.** Legal text contains nested
quotes, case citations with internal punctuation, statutory references, and
special formatting that will cause `SyntaxError`. Fix: embed rows in a raw
triple-quoted string (`r"""..."""`) with `~|~` delimiter, then parse with
`pd.read_csv(io.StringIO(...), sep=r"~\|~", engine="python")`.
Every record MUST be on one line — no line breaks inside fields.

## Workflow

### Step 1: Stop-Sign Gate
Check for prohibited inputs. If sealed/in-camera material, refuse.

### Step 2: Identify the Filing
Determine from the document:
- **FilingType**: MOTION, RESPONSE, REPLY, SUR-REPLY, ORDER, NOTICE
- **MotionType**: MSJ, MTD, MTC, MIL, MTStrike, MForSanctions, MToAmend, etc.
- **ParentMotionID**: For responses/replies, identify what they respond to
- **FilingParty**: Full name as stated
- **FilingDate**: From file stamp

### Step 3: Create Workbook (FIRST CHUNK ONLY)

Create tabs: Motion_Index, Issues, Arguments, Factual_Assertions,
Evidence_Submitted, Processing_Log, README.

### Step 4: Write Motion_Index Row

### Step 5: Extract Issues

Read the motion section by section. Each time the motion raises a discrete
legal question or argument heading, create an Issues row:

**How to identify issues:**
- Section headings often signal issues (e.g., "I. PLAINTIFF FAILS TO STATE A
  CLAIM FOR NEGLIGENCE")
- Separately numbered argument sections
- Sub-issues within a major issue (each gets its own row)
- Standard of review is an issue (but categorized as PROCEDURE)

**For RESPONSES:** Also identify which motion issue each response section
addresses. Some response sections may address multiple motion issues.

### Step 6: Extract Arguments

For each issue, extract the supporting legal arguments:

**What constitutes a separate argument:**
- A legal proposition + supporting authority
- A factual-legal conclusion (application of law to facts)
- A policy or equity argument
- A procedural argument
- A rebuttal to an opposing argument

**Capture:**
- The verbatim argument text
- The authority cited (case, statute, rule)
- The pinpoint citation
- The page reference in the source filing

### Step 7: Extract Factual Assertions

Extract every factual statement made in the filing:

**For MSJ/MSJ Responses:**
- SUMF (Statement of Undisputed Material Facts) paragraphs each get a row
- Additional Material Facts (in responses) each get a row
- Factual assertions within the argument section each get a row

**For other motions:**
- Background/factual history section assertions each get a row
- Factual assertions within arguments each get a row

**Capture:**
- The verbatim factual assertion
- What evidence is cited to support it
- The pinpoint for the cited evidence
- The page reference in the source filing

### Step 8: Extract Evidence Submitted

List every exhibit, declaration, affidavit, or other evidence submitted:

- Exhibit label (as marked in the filing)
- Type (declaration, document, deposition excerpt, etc.)
- Brief description
- Whether it appears to be new to the record

### Step 9: Report and Wait for 'continue'

## Data Writing Patterns

### Pattern A: Write Issues Rows

```python
raw = r"""IssueID~|~MotionID~|~IssueNum~|~VerbatimIssueStatement~|~IssueCategory~|~RelatedElement_IDs~|~ResponseStatus~|~ResponseMotionID~|~RulingStatus~|~RulingMotionID~|~PageRef~|~Notes
[ROW 1 — all on one line]
[ROW 2 — all on one line]
..."""

df = pd.read_csv(io.StringIO(raw), sep=r"~\|~", engine="python")
assert len(df.columns) == 12
```

### Pattern B: Write Arguments Rows

```python
raw = r"""ArgumentID~|~MotionID~|~IssueID~|~ArgumentNum~|~VerbatimArgument~|~AuthorityCited~|~AuthorityPinpoint~|~ArgumentType~|~ValidityFlag~|~LPB_LawTag~|~CounterArgumentID~|~ResponseStatus~|~PageRef~|~Notes
[ROW 1 — all on one line]
..."""

df = pd.read_csv(io.StringIO(raw), sep=r"~\|~", engine="python")
assert len(df.columns) == 14
```

### Pattern C: Write Factual Assertions Rows

```python
raw = r"""AssertionID~|~MotionID~|~IssueID~|~AssertionNum~|~VerbatimAssertion~|~EvidenceCited~|~EvidencePinpoint~|~AssertingParty~|~CFP_CrossRef~|~CFP_Consistency~|~NewEvidence~|~DisputeStatus~|~PageRef~|~Notes
[ROW 1 — all on one line]
..."""

df = pd.read_csv(io.StringIO(raw), sep=r"~\|~", engine="python")
assert len(df.columns) == 14
```

### Pattern D: Write Evidence Submitted Rows

```python
raw = r"""EvidenceID~|~MotionID~|~ExhibitLabel~|~EvidenceType~|~Description~|~BatesOrPinpoint~|~IsNewToRecord~|~CFP_DocID~|~FlagForCFP~|~SubmittingParty~|~AuthenticatedBy~|~Notes
[ROW 1 — all on one line]
..."""

df = pd.read_csv(io.StringIO(raw), sep=r"~\|~", engine="python")
assert len(df.columns) == 12
```

## Issue Extraction Tips

### For MSJ Motions
Typical MSJ issues:
1. Standard of review / burden of proof (PROCEDURE)
2. Each element of each cause of action (SJ-ELEMENT)
3. Damages issues (DAMAGES)
4. Affirmative defense issues if raised (SJ-ELEMENT)

### For MTD Motions
Typical MTD issues:
1. Jurisdictional issues (JURISDICTION)
2. Standing issues (STANDING)
3. Failure to state a claim per cause of action (FAILURE-TO-STATE)
4. Procedural issues (improper service, venue) (PROCEDURE)

### For MTC Motions
Typical MTC issues:
1. Timeliness / exhaustion of meet-and-confer (PROCEDURE)
2. Per-request objection validity (DISCOVERY-COMPEL)
3. Sanctions / fees (SANCTIONS)

### For MIL (Motion in Limine)
Typical MIL issues:
1. Per-evidence admissibility (EVIDENCE-EXCLUDE)
2. Relevance (EVIDENCE-EXCLUDE)
3. Prejudice vs. probative (EVIDENCE-EXCLUDE)
