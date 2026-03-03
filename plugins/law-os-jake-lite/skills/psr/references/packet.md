# PACKET Mode — Reference (PSR v1.0)

Read this file when entering PACKET mode.

## Purpose

Generate a filtered markdown packet from a PSR workbook for consumption by
a downstream skill. The packet contains only the rows and columns needed
by the requesting skill.

## Packet Types

### 1. Admissions Packet (for CFP)

Exports all admitted facts for import into the Case Fact Pack:

```xml
<psr_admissions source="PSR" case_id="[CASE_CODE]" generated="[timestamp]">
  <admission id="[AdmissionID]" type="[FULL|PARTIAL|DEEMED]"
             party="[AdmittingParty]" para="[AllegationParaNum]">
    <admitted_text>[Verbatim admitted text]</admitted_text>
    <source_pleading>[PleadingID]</source_pleading>
  </admission>
  ...
</psr_admissions>
```

### 2. Claims Packet (for PCM)

Exports all active claims with element mappings:

```xml
<psr_claims source="PSR" case_id="[CASE_CODE]" generated="[timestamp]">
  <claim id="[ClaimID]" type="[CLAIM|COUNTERCLAIM|CROSS-CLAIM]"
         asserting="[AssertingParty]" target="[TargetParty]" status="[ACTIVE]">
    <label>[ClaimLabel]</label>
    <legal_basis>[LegalBasis]</legal_basis>
    <element_ids>[Element_IDs]</element_ids>
    <supporting_paragraphs>[SupportingParagraphs]</supporting_paragraphs>
  </claim>
  ...
</psr_claims>
```

### 3. Defenses Packet (for PDM)

Exports all affirmative defenses with element mappings:

```xml
<psr_defenses source="PSR" case_id="[CASE_CODE]" generated="[timestamp]">
  <defense id="[DefenseID]" type="[DefenseType]"
           asserting="[AssertingParty]" defect="[DefectFlag]">
    <verbatim>[VerbatimText]</verbatim>
    <factual_basis>[FactualBasis]</factual_basis>
    <legal_basis>[LegalBasis]</legal_basis>
    <element_id>[Element_ID]</element_id>
    <target_claims>[TargetClaims]</target_claims>
  </defense>
  ...
</psr_defenses>
```

### 4. Response Analysis Packet (for ADR)

Exports all responses with defect flags for answer diagnostic:

```xml
<psr_responses source="PSR" case_id="[CASE_CODE]" generated="[timestamp]">
  <response id="[ResponseID]" type="[ResponseType]"
            classification="[ResponseClassification]" defect="[DefectFlag]">
    <allegation para="[AllegationParaNum]">[VerbatimText of allegation]</allegation>
    <response_text>[VerbatimResponse]</response_text>
    <denial_basis>[DenialBasis]</denial_basis>
  </response>
  ...
</psr_responses>
```

### 5. Undisputed Facts Packet (for MSJ)

Exports admitted and deemed-admitted facts as SUMF candidates:

```xml
<psr_undisputed source="PSR" case_id="[CASE_CODE]" generated="[timestamp]">
  <undisputed_fact id="[AdmissionID]" type="[FULL|DEEMED]"
                   para="[AllegationParaNum]">
    <fact_text>[AdmittedText]</fact_text>
    <admission_source>[SourcePleading]</admission_source>
    <admitting_party>[AdmittingParty]</admitting_party>
  </undisputed_fact>
  ...
</psr_undisputed>
```

### 6. Full PSR Summary Packet

Complete summary for general consumption:

```markdown
# PSR Summary — [CASE_CODE]

## Pleadings Filed
| PleadingID | Type | Filing Party | Filing Date |
|------------|------|--------------|-------------|
...

## Allegation-Response Summary
| ¶ | Allegation (excerpt) | Response Type | Defect |
|---|---------------------|--------------|--------|
...

## Admissions ([N] total)
| ¶ | Admitted Text (excerpt) | Type | Admitting Party |
|---|------------------------|------|-----------------|
...

## Denied Allegations ([N] total)
| ¶ | Denied Text (excerpt) | Denial Type | Basis | Defect |
|---|----------------------|------------|-------|--------|
...

## Affirmative Defenses ([N] total)
| # | Defense Type | Defect | Target Claims |
|---|-------------|--------|---------------|
...

## Claims Register ([N] total)
| ID | Type | Asserting | Target | Status |
|----|------|-----------|--------|--------|
...
```

## Filtering Options

When generating a packet, the user may request filters:
- **By party:** Only admissions/denials by a specific party
- **By claim:** Only allegations/responses related to a specific cause of action
- **By defect:** Only responses with defect flags
- **By status:** Only VERIFIED entries (for verified-only downstream use)
- **By type:** Only admissions, only denials, only defenses
