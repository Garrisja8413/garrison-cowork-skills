# ENRICH Stage — Reference (PSR v1.0)

Read this file when entering ENRICH mode.

## Purpose

Add classification, Element_ID tagging, defect flags, and generate the derived
Admissions_Map and Denials_Map tabs from the Response data.

## ENRICH Does NOT:
- Add new allegation or response rows (that's EXTRACT)
- Change any VerbatimText or VerbatimResponse fields
- Resolve ambiguities (those stay flagged for attorney review)

## Workflow

### Step 1: Load the Extract/Combined PSR

```python
import pandas as pd

psr = pd.ExcelFile('PSR-Extract-CASE-Complaint.xlsx')
allegations = pd.read_excel(psr, 'Allegations')
responses = pd.read_excel(psr, 'Responses')
aff_defenses = pd.read_excel(psr, 'Affirmative_Defenses')
claims = pd.read_excel(psr, 'Claims_Register')
```

### Step 2: Classify Responses (ResponseClassification + DefectFlag)

For each row in the Responses tab, add classification based on ResponseType
and the quality of the response:

| ResponseType | Potential ResponseClassification | DefectFlag Trigger |
|-------------|--------------------------------|-------------------|
| ADMITTED | PROPER-ADMISSION | NONE |
| DENIED (with specific basis) | PROPER-DENIAL | NONE |
| DENIED (bare, no basis) | BLANKET-DENIAL | BLANKET |
| DENIED (qualified: "to the extent...") | EVASIVE-DENIAL | EVASIVE |
| INSUFFICIENT-KNOWLEDGE (facts in party's control) | LKI-IMPROPER | LKI-IMPROPER |
| INSUFFICIENT-KNOWLEDGE (facts not in party's control) | PROPER-DENIAL | NONE |
| NO-RESPONSE | DEEMED-ADMITTED | NO-RESPONSE |
| QUALIFIED (ambiguous language) | QUALIFIED-RESPONSE | EVASIVE |
| DENIED-IN-PART-ADMITTED-IN-PART (clear) | PROPER-DENIAL | NONE |
| DENIED-IN-PART-ADMITTED-IN-PART (vague on what is admitted) | EVASIVE-DENIAL | EVASIVE |

**Rule for INSUFFICIENT-KNOWLEDGE:** A party cannot claim insufficient knowledge
about facts within its own control or matters of public record. Flag these as
`LKI-IMPROPER`. Examples:
- Defendant claims LKI about its own corporate structure
- Defendant claims LKI about whether it employed a specific person
- Defendant claims LKI about facts in its own documents

**Rule for DEEMED-ADMITTED:** Under NMRA 1-008(D), allegations not denied are
deemed admitted. If a complaint paragraph has NO corresponding response row
(ResponseType=NO-RESPONSE), classify as DEEMED-ADMITTED.

### Step 3: Classify Affirmative Defenses (DefenseType + DefectFlag)

Populate the `DefenseType` field from the controlled vocabulary:

| Defense Pattern | DefenseType |
|----------------|-------------|
| comparative negligence / fault | COMPARATIVE-NEGLIGENCE |
| assumption of risk | ASSUMPTION-OF-RISK |
| statute of limitations | SOL |
| failure to mitigate | FAILURE-TO-MITIGATE |
| governmental immunity / qualified immunity | IMMUNITY |
| federal preemption | PREEMPTION |
| contributory negligence | CONTRIBUTORY-NEGLIGENCE |
| release / waiver | RELEASE-WAIVER |
| accord and satisfaction | ACCORD-SATISFACTION |
| estoppel | ESTOPPEL |
| laches | LACHES |
| (anything else) | OTHER |

Populate the `DefectFlag` field:

| Pattern | DefectFlag |
|---------|-----------|
| Defense contains NO factual assertions | BOILERPLATE |
| Fraud/heightened defense lacks specificity | SPECIFICITY-FAIL |
| "Reserves right to add defenses" | IMPROPER-RESERVATION |
| Redundant / immaterial / impertinent | REDUNDANT-IMMATERIAL |
| Defense contradicts party's own denials | DEFENSE-DENIAL-CONFLICT |
| No reasonable factual basis apparent | CERT-FAILURE |
| Defense appears properly pled | NONE |

### Step 4: Tag Element_IDs

For Allegations: Map each allegation to Element_IDs based on which legal
element it supports. Use the case's claim structure:
- Duty allegations -> DUTY-xxx
- Breach allegations -> BREACH-xxx
- Causation allegations -> CAUSE-xxx
- Damages allegations -> DAMAGES-xxx

For Affirmative_Defenses: Map to defense Element_IDs:
- AFF-SOL-1 (statute of limitations, element 1)
- AFF-COMPNEG-1 (comparative negligence, element 1)
- etc.

For Claims_Register: Populate Element_IDs and RequiredElements based on
LPB cross-reference.

### Step 5: Build Admissions_Map (DERIVED TAB)

Create the Admissions_Map tab from Response rows where:
- ResponseType = ADMITTED (full admission)
- ResponseType = DENIED-IN-PART-ADMITTED-IN-PART (extract admitted portion)
- ResponseType = NO-RESPONSE (deemed admitted under NMRA 1-008(D))

```python
admissions_rows = []
for _, resp in responses.iterrows():
    if resp['ResponseType'] == 'ADMITTED':
        allegation = allegations[allegations['AllegationID'] == resp['AllegationID']]
        if not allegation.empty:
            admissions_rows.append({
                'AdmissionID': f"ADM-{resp['ResponseID']}",
                'ResponseID': resp['ResponseID'],
                'AllegationID': resp['AllegationID'],
                'AllegationParaNum': resp['AllegationParaNum'],
                'AdmittingParty': resp['RespondingParty'],
                'AdmittedText': allegation.iloc[0]['VerbatimText'],
                'AdmissionType': 'FULL',
                'SourcePleading': resp['PleadingID'],
                'CFP_FactRef': '',  # Populated in VERIFY
                'Notes': ''
            })
    elif resp['ResponseType'] == 'NO-RESPONSE':
        allegation = allegations[allegations['AllegationID'] == resp['AllegationID']]
        if not allegation.empty:
            admissions_rows.append({
                'AdmissionID': f"ADM-{resp['ResponseID']}",
                'ResponseID': resp['ResponseID'],
                'AllegationID': resp['AllegationID'],
                'AllegationParaNum': resp['AllegationParaNum'],
                'AdmittingParty': resp['RespondingParty'],
                'AdmittedText': allegation.iloc[0]['VerbatimText'],
                'AdmissionType': 'DEEMED',
                'SourcePleading': resp['PleadingID'],
                'CFP_FactRef': '',
                'Notes': 'Deemed admitted — no response to allegation (NMRA 1-008(D))'
            })
    elif resp['ResponseType'] == 'DENIED-IN-PART-ADMITTED-IN-PART':
        if pd.notna(resp.get('AdmittedPortion')) and resp['AdmittedPortion']:
            admissions_rows.append({
                'AdmissionID': f"ADM-{resp['ResponseID']}",
                'ResponseID': resp['ResponseID'],
                'AllegationID': resp['AllegationID'],
                'AllegationParaNum': resp['AllegationParaNum'],
                'AdmittingParty': resp['RespondingParty'],
                'AdmittedText': resp['AdmittedPortion'],
                'AdmissionType': 'PARTIAL',
                'SourcePleading': resp['PleadingID'],
                'CFP_FactRef': '',
                'Notes': 'Partial admission extracted from mixed response'
            })
```

### Step 6: Build Denials_Map (DERIVED TAB)

Create the Denials_Map tab from Response rows where:
- ResponseType = DENIED
- ResponseType = DENIED-IN-PART-ADMITTED-IN-PART (extract denied portion)
- ResponseType = INSUFFICIENT-KNOWLEDGE
- ResponseType = QUALIFIED

```python
denials_rows = []
for _, resp in responses.iterrows():
    if resp['ResponseType'] in ['DENIED', 'INSUFFICIENT-KNOWLEDGE', 'QUALIFIED']:
        allegation = allegations[allegations['AllegationID'] == resp['AllegationID']]
        if not allegation.empty:
            denial_type_map = {
                'DENIED': 'GENERAL' if resp.get('DenialBasis') == '[NONE STATED]' else 'SPECIFIC',
                'INSUFFICIENT-KNOWLEDGE': 'INSUFFICIENT-KNOWLEDGE',
                'QUALIFIED': 'QUALIFIED'
            }
            denials_rows.append({
                'DenialID': f"DEN-{resp['ResponseID']}",
                'ResponseID': resp['ResponseID'],
                'AllegationID': resp['AllegationID'],
                'AllegationParaNum': resp['AllegationParaNum'],
                'DenyingParty': resp['RespondingParty'],
                'DeniedText': allegation.iloc[0]['VerbatimText'],
                'DenialType': denial_type_map.get(resp['ResponseType'], 'GENERAL'),
                'DenialBasis': resp.get('DenialBasis', '[NONE STATED — BARE DENIAL]'),
                'DefectFlag': resp.get('DefectFlag', ''),
                'DisputedFacts': '',  # Populated after Element_ID tagging
                'SourcePleading': resp['PleadingID'],
                'Notes': ''
            })
```

### Step 7: Populate TargetClaims for Affirmative Defenses

For each affirmative defense, identify which claims it purports to apply to.
If the defense text says "applies to all claims", set TargetClaims to "ALL".
If it specifies particular claims, list them (e.g., "COUNT I, COUNT III").

### Step 8: Write Enriched Output

Save the enriched workbook with all original tabs updated and new derived tabs
(Admissions_Map, Denials_Map) added.

## Output QA Summary

Report:
- Total responses classified: [N]
- Admissions found: [N] full + [N] partial + [N] deemed = [N] total
- Denials found: [N] (of which [N] have defect flags)
- Defective responses: [N] (BLANKET: [N], EVASIVE: [N], LKI-IMPROPER: [N], NO-RESPONSE: [N])
- Affirmative defenses classified: [N] (of which [N] flagged BOILERPLATE)
- Element_IDs assigned: [N] allegations, [N] defenses, [N] claims
