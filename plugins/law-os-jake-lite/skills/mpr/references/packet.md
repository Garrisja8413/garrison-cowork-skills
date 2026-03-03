# PACKET Mode — Reference (MPR v1.0)

Read this file when entering PACKET mode.

## Purpose

Generate a filtered markdown or XML packet from an MPR workbook for
consumption by a downstream skill.

## Packet Types

### 1. Motion Summary Packet (general)

```xml
<mpr_summary source="MPR" case_id="[CASE_CODE]" generated="[timestamp]">
  <motion id="[MotionID]" type="[MotionType]" filing_type="[FilingType]"
          party="[FilingParty]" date="[FilingDate]" status="[RulingStatus]">
    <issues count="[N]">
      <issue id="[IssueID]" category="[IssueCategory]"
             response_status="[ResponseStatus]" ruling="[RulingStatus]">
        [VerbatimIssueStatement]
      </issue>
      ...
    </issues>
  </motion>
  ...
</mpr_summary>
```

### 2. Arguments Packet (for LPB cross-reference)

```xml
<mpr_arguments source="MPR" case_id="[CASE_CODE]" generated="[timestamp]">
  <argument id="[ArgumentID]" motion="[MotionID]" issue="[IssueID]"
            type="[ArgumentType]" validity="[ValidityFlag]">
    <text>[VerbatimArgument]</text>
    <authority>[AuthorityCited]</authority>
    <pinpoint>[AuthorityPinpoint]</pinpoint>
  </argument>
  ...
</mpr_arguments>
```

### 3. Response Gap Packet (for strategy)

```xml
<mpr_response_gaps source="MPR" case_id="[CASE_CODE]" generated="[timestamp]">
  <unaddressed_issue motion="[MotionID]" issue="[IssueID]">
    <issue_text>[VerbatimIssueStatement]</issue_text>
    <strategic_note>[Implications of not addressing]</strategic_note>
  </unaddressed_issue>
  ...
  <unaddressed_facts>
    <fact motion="[MotionID]" assertion="[AssertionID]"
         dispute_status="NOT-ADDRESSED">
      [VerbatimAssertion]
    </fact>
    ...
  </unaddressed_facts>
</mpr_response_gaps>
```

### 4. New Evidence Packet (for CFP)

```xml
<mpr_new_evidence source="MPR" case_id="[CASE_CODE]" generated="[timestamp]">
  <evidence id="[EvidenceID]" motion="[MotionID]"
            type="[EvidenceType]" flag_for_cfp="[Y/N]">
    <label>[ExhibitLabel]</label>
    <description>[Description]</description>
    <submitted_by>[SubmittingParty]</submitted_by>
  </evidence>
  ...
</mpr_new_evidence>
```

### 5. Rulings Packet (for LOTC)

```xml
<mpr_rulings source="MPR" case_id="[CASE_CODE]" generated="[timestamp]">
  <ruling id="[RulingID]" motion="[MotionID]" date="[RulingDate]"
          result="[RulingResult]" affects_lotc="[Y/N]">
    <verbatim>[VerbatimRuling]</verbatim>
    <basis>[RulingBasis]</basis>
    <judge>[Judge]</judge>
  </ruling>
  ...
</mpr_rulings>
```

### 6. Factual Assertion Cross-Reference Packet (for CFP check)

```xml
<mpr_fact_crossref source="MPR" case_id="[CASE_CODE]" generated="[timestamp]">
  <assertion id="[AssertionID]" party="[AssertingParty]"
             cfp_consistency="[CFP_Consistency]">
    <text>[VerbatimAssertion]</text>
    <evidence>[EvidenceCited]</evidence>
    <cfp_ref>[CFP_CrossRef]</cfp_ref>
    <dispute_status>[DisputeStatus]</dispute_status>
  </assertion>
  ...
</mpr_fact_crossref>
```

## Filtering Options

- **By motion type:** Only MSJ motions, only MTC motions, etc.
- **By party:** Only motions filed by a specific party
- **By status:** Only pending motions, only decided motions
- **By validity flag:** Only arguments with VERIFY-CITE flags
- **By coverage:** Only NOT-ADDRESSED issues
- **By date range:** Motions filed within a date range
