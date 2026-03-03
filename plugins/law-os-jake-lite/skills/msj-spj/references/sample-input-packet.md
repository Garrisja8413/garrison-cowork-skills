# Sample Input Packet Template for SPJ MSJ

Use this template to structure your input packet for the MSJ-SPJ skill.

---

## 1) SA Shell MERGE LEGEND

Example:
```
[MERGE:CaseName] - Full case caption
[MERGE:CaseNo] - Case number
[MERGE:Court] - Court name
[MERGE:DefendantName] - Defendant's full name
[MERGE:FilingDate] - Date of filing
```

---

## 2) Case Posture + MSJ Scope

**Template:**
```
- Jurisdiction: [NM State Court | D.N.M. Federal]
- Movant: Defendant [Name]
- Target: Lack of specific personal jurisdiction over [Defendant Name]
- Defendant's contacts alleged: 
  * [Contact 1 alleged by plaintiff]
  * [Contact 2 alleged by plaintiff]
- Relief requested: Dismissal with prejudice for lack of personal jurisdiction
- Local rules: [D.N.M. LR-Civ. 56.1 requires separate SUMF | NM 1-056 NMRA]
```

---

## 3) Case Fact Pack Excerpt

### MSJ_SUMF Rows

| Fact# | Statement | Evidence_DocID | Bates/Page:Line | ParaID | Material_Element_Tag | Dispute? | Notes |
|------:|-----------|----------------|-----------------|--------|---------------------|----------|-------|
| 1 | Defendant XYZ Corp. is incorporated in Delaware with principal place of business in Texas | DOC-001 | XYZ000001:5-7 | ¶1 | SPJ_DEFENDANT_ID | N | |
| 2 | Defendant has no registered agent in New Mexico | DOC-002 | XYZ000045:12-14 | ¶3 | SPJ_NO_CONTACTS | N | |
| 3 | Defendant has no employees or offices in New Mexico | DOC-002 | XYZ000045:15-20 | ¶4 | SPJ_NO_CONTACTS | N | |
| 4 | The alleged conduct occurred entirely in Texas | DOC-003 | XYZ000078:1-10 | ¶7 | SPJ_CONDUCT_LOCATION | N | |
| 5 | Plaintiff initiated all contact with Defendant | DOC-004 | XYZ000102:8-12 | ¶9 | SPJ_UNILATERAL_PLAINTIFF | N | |

### File_Metadata Rows

| DocID | Title | Type | BatesStart | BatesEnd | Confidentiality | StoredAt |
|-------|-------|------|------------|----------|-----------------|----------|
| DOC-001 | Certificate of Incorporation | Exhibit | XYZ000001 | XYZ000005 | Public | SA/Docs |
| DOC-002 | Deposition of John Smith (30(b)(6)) | Depo Transcript | XYZ000040 | XYZ000120 | Confidential | SA/Depos |
| DOC-003 | Email Chain re: Transaction | Exhibit | XYZ000075 | XYZ000085 | Confidential | SA/Docs |
| DOC-004 | Plaintiff's Interrogatory Responses | Discovery | XYZ000100 | XYZ000115 | Confidential | SA/Discovery |

---

## 4) Law Pack Excerpt

### LAW Rows (with pinpoints and Shepard status)

| LawTag | Authority | Pinpoint | Proposition | Shepard_Status | Verified |
|--------|-----------|----------|-------------|----------------|----------|
| MC-01 | Int'l Shoe Co. v. Washington, 326 U.S. 310 (1945) | 316 | Due process requires minimum contacts with forum | Good Law | Y |
| MC-03 | Burger King Corp. v. Rudzewicz, 471 U.S. 462 (1985) | 472 | Defendant must purposefully direct activities at forum | Good Law | Y |
| PJ-BURDEN-01 | Intercon, Inc. v. Bell Atl. Internet Sols., 205 F.3d 1244 (10th Cir. 2000) | 1247 | Plaintiff bears burden once jurisdiction challenged | Good Law | Y |
| LA-NM-01 | NMSA 1978 § 38-1-16(A) | (A) | NM long-arm extends to due process limits | Current | Y |

### RULES Rows

| RuleTag | Rule | Text | Pinpoint | Verified |
|---------|------|------|----------|----------|
| FRCP-56 | Fed. R. Civ. P. 56(a) | Summary judgment appropriate when no genuine dispute of material fact | 56(a) | Y |
| NMRA-1-056 | Rule 1-056 NMRA | [parallel NM rule] | 1-056(C) | Y |

---

## 5) For MSJ_REPLY_ATOMIC: Opposition Packet Excerpt

**Opposition memo headings + key arguments:**
```
I. Defendant Has Minimum Contacts with New Mexico
   - Plaintiff argues: [quote/paraphrase their argument]
   - Their cite: [their record cite]

II. The Claims Arise From Defendant's Forum Contacts
   - Plaintiff argues: [quote/paraphrase]
   - Their cite: [their record cite]
```

**Response to SUMF / disputed facts:**
```
SUMF ¶2: Plaintiff disputes, citing [their evidence + cite]
SUMF ¶5: Plaintiff admits
```

**Additional material facts asserted by opponent:**
```
Opp. AMF 1: [their statement] [their cite]
Opp. AMF 2: [their statement] [their cite]
```
