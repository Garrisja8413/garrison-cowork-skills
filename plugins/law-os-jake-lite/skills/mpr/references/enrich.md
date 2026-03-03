# ENRICH Stage — Reference (MPR v1.0)

Read this file when entering ENRICH mode.

## Purpose

Add classification, cross-referencing, validity flags, and generate the
derived Response_Coverage and Reply_Coverage tabs.

## ENRICH Does NOT:
- Add new issue, argument, or assertion rows
- Change any verbatim text fields
- Resolve legal validity questions (flags them for LPB verification)

## Workflow

### Step 1: Classify Issues (IssueCategory)

For each Issues row, assign an IssueCategory from the controlled vocabulary:
- `JURISDICTION` — subject matter or personal jurisdiction
- `STANDING` — party standing to sue
- `FAILURE-TO-STATE` — failure to state a claim
- `SJ-ELEMENT` — summary judgment on specific claim/defense element
- `DISCOVERY-COMPEL` — discovery compliance
- `EVIDENCE-EXCLUDE` — evidence admissibility / motions in limine
- `SANCTIONS` — sanctions, fees, contempt
- `PROCEDURE` — procedural issues (venue, service, timing, standard of review)
- `DAMAGES` — damages-specific issues
- `OTHER` — anything not covered above

### Step 2: Classify Arguments (ArgumentType + ValidityFlag)

**ArgumentType:**
- `RULE-STATEMENT` — states a legal rule from authority
- `RULE-APPLICATION` — applies a legal rule to the facts
- `POLICY-ARGUMENT` — argues policy reasons
- `ANALOGY` — analogizes to another case
- `DISTINCTION` — distinguishes an opposing authority
- `REBUTTAL` — directly rebuts an opposing argument
- `BURDEN-SHIFTING` — addresses burden of proof allocation
- `STANDARD-OF-REVIEW` — states or argues the standard of review

**ValidityFlag:**
- `VALID` — authority appears current and correctly cited
- `VERIFY-CITE` — authority needs Shepardization or verification
- `UNCITED` — legal assertion made without supporting authority
- `STANDARD-CHECK` — stated standard may not be correct for this context
- `PERSUASIVE-ONLY` — federal authority cited as if controlling in NM state court
- `OVERRULED` — authority appears to have been overruled or superseded

### Step 3: Cross-Reference Factual Assertions Against CFP

For each Factual_Assertions row:
1. Search CFP for matching facts (by content similarity + evidence citation)
2. Set `CFP_CrossRef` to the matching Fact# if found
3. Set `CFP_Consistency`:
   - `CONSISTENT` — assertion matches CFP fact
   - `INCONSISTENT` — assertion contradicts CFP fact (flag for review)
   - `NEW-FACT` — assertion makes a factual claim not in CFP
   - `NOT-IN-CFP` — fact not found in CFP (may need extraction)

### Step 4: Flag New Evidence for CFP

For each Evidence_Submitted row:
1. Check if the evidence document is already in CFP File_Metadata
2. Set `CFP_DocID` if found
3. Set `IsNewToRecord`:
   - `Y` — evidence not previously in the case record
   - `N` — evidence already cataloged
4. Set `FlagForCFP`:
   - `Y` — new evidence that should be extracted into CFP
   - `N` — already in CFP or not relevant for CFP extraction

### Step 5: Build Response_Coverage Tab

**This is the critical cross-referencing step for responses.**

For each Issue in the original motion:
1. Search the response filing for arguments that address this issue
2. Classify coverage:
   - `ADDRESSED` — response directly addresses the issue with counter-arguments
   - `NOT-ADDRESSED` — response does not mention or address this issue
   - `PARTIALLY-ADDRESSED` — response touches on the issue but incompletely
   - `CONCEDED` — response explicitly concedes the issue

3. For addressed issues: link the specific ArgumentIDs from the response
4. For each factual assertion in the motion related to this issue:
   - `ACKNOWLEDGED` — response agrees with the fact
   - `DISPUTED` — response disputes the fact with contrary evidence
   - `NOT-ADDRESSED` — response does not address the fact

**Strategic significance of NOT-ADDRESSED issues:**
- In MSJ context: failure to address a SUMF fact may result in it being deemed undisputed
- In MTD context: failure to address a dismissal ground may be treated as concession
- In MTC context: failure to oppose specific requests may waive objections

### Step 6: Build Reply_Coverage Tab

For each argument in the response:
1. Search the reply for counter-arguments
2. Classify:
   - `COUNTERED` — reply directly addresses this response argument
   - `NOT-COUNTERED` — reply does not address this argument
   - `CONCEDED-BY-SILENCE` — reply's failure to counter may indicate weakness

3. Flag new arguments in the reply:
   - `NewArgumentFlag=Y` if the reply raises an argument not in the original motion
   - `ImproperNewMatter=Y` if the new argument constitutes improper new matter
     (replies are generally limited to rebutting arguments raised in the response)

### Step 7: Tag Element_IDs

Map issues and arguments to PCM/PDM Element_IDs where applicable.

### Step 8: Cross-Reference Arguments Against LPB

For each argument's cited authority:
1. Search LPB for matching LawTag
2. If found: set `LPB_LawTag` and inherit Shepard status
3. If not found: flag for LPB research

## Output QA Summary

Report:
- Total issues classified: [N] by category
- Total arguments classified: [N] by type
- Validity flags: [N] VERIFY-CITE, [N] UNCITED, [N] STANDARD-CHECK, [N] PERSUASIVE-ONLY
- CFP cross-references: [N] CONSISTENT, [N] INCONSISTENT, [N] NEW-FACT, [N] NOT-IN-CFP
- New evidence for CFP: [N] flagged
- Response coverage: [N] ADDRESSED, [N] NOT-ADDRESSED, [N] PARTIALLY-ADDRESSED
- Reply coverage: [N] COUNTERED, [N] NOT-COUNTERED, [N] new arguments flagged
