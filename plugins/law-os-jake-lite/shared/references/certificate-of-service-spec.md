# Certificate of Service (COS) Specification — Shared Reference

This is the single source of truth for Certificate of Service formatting
across all PA-DOC-FORMAT overlay skills.

## COS Styles (OOXML)

### _PA Cert Serve or Letter Title

Bold, underlined, and **CENTERED**. Used for the "CERTIFICATE OF SERVICE"
heading.

```xml
<w:style w:type="paragraph" w:customStyle="1" w:styleId="PACertServeorLetterTitle">
  <w:name w:val="_PA Cert Serve or Letter Title"/>
  <w:basedOn w:val="Normal"/>
  <w:qFormat/>
  <w:pPr>
    <w:spacing w:before="480" w:line="240" w:lineRule="auto"/>
    <w:jc w:val="center"/>
  </w:pPr>
  <w:rPr>
    <w:b/>
    <w:u w:val="single"/>
  </w:rPr>
</w:style>
```

### _PA Cert Serve Body

Single-spaced body text for the COS. Based on `_PA Brief Paragraph` with
first-line indent removed. The COS body is NEVER double-spaced.

```xml
<w:style w:type="paragraph" w:customStyle="1" w:styleId="PACertServeBody">
  <w:name w:val="_PA Cert Serve Body"/>
  <w:basedOn w:val="PABriefParagraph"/>
  <w:qFormat/>
  <w:pPr>
    <w:ind w:firstLine="0"/>
  </w:pPr>
</w:style>
```

### _PA Cert Serve Signature

**LEFT-JUSTIFIED.** This is the ONLY left-justified signature block in a
court filing. The main attorney signature (SignRight) remains right-indented.
Only the COS signature uses this left-justified style.

```xml
<w:style w:type="paragraph" w:customStyle="1" w:styleId="PACertServeSignature">
  <w:name w:val="_PA Cert Serve Signature"/>
  <w:basedOn w:val="Normal"/>
  <w:qFormat/>
  <w:pPr>
    <w:ind w:left="446"/>
    <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
    <w:jc w:val="left"/>
  </w:pPr>
</w:style>
```

## COS Title Text

The COS title is always:

```
CERTIFICATE OF SERVICE
```

Formatted with `_PA Cert Serve or Letter Title` style (bold, underlined,
centered).

## COS Body Template

Standard certification language:

> I hereby certify that on [DATE], I served the foregoing [DOCUMENT TITLE]
> upon the following by [METHOD OF SERVICE]:

Formatted with `_PA Cert Serve Body` style (single-spaced, no first-line
indent).

## Service List Specification

The service list follows the COS body text and identifies each party
served, their address, and the method of service.

### Format

Each served party is listed on its own line or block using `_PA Cert Serve
Body` or `Normal1` style:

```
[Party Name]
[Address Line 1]
[Address Line 2]
[City, State ZIP]
[Method of service]
```

### Method of Service Notation

Use one of the following standard method designations:

- **"via e-mail"** — electronic mail service
- **"via U.S. Mail"** — first-class mail
- **"via hand delivery"** — personal delivery
- **"via certified mail, return receipt requested"** — certified mail
- **"via facsimile"** — fax transmission

### SmartAdvocate Integration

When using SmartAdvocate shells, the service list may be populated by:

```
<! [COURT-COURT#-SERVICE LIST] !>
```

When this token is present, it replaces the manual service list.

### Manual Format

When building the service list manually:

- Each party on a separate block
- Party name, address, and method clearly identified
- Use `_PA Cert Serve Body` style for consistent formatting
- Blank line between served parties for readability

## COS Signature Block

The COS signature uses `_PA Cert Serve Signature` style (LEFT-justified,
indent 446 DXA):

```
/s/ [Attorney Name]
```

Followed by the date line.

## Document Type Rules — Which Documents Include COS

| Document Type | COS Included? | Notes |
|---------------|---------------|-------|
| **Motions** (MTC, MSJ, MTD-Response, etc.) | **YES** — always | Filed with the court |
| **Briefs** (replies, responses) | **YES** — always | Filed with the court |
| **Complaints/Petitions** | **YES** — always | Filed with the court |
| **Affidavits** | **YES** — always | Filed with the court |
| **Firm-originated discovery requests** (ROGs, RFPs, RFAs) | **YES** | Filed with the court |
| **Discovery responses** (ROG answers, RFP/RFA responses) | **NO** | COS is a separate document; responses are served but not filed |
| **Letters** (LOR, GFL, demand, cover) | **NO** | Unless specifically requested by the attorney |

### Discovery Response Exception

Discovery responses do NOT include a COS on the document itself. The COS
for discovery responses is a separate document filed with the court.
Discovery responses are served on parties but not filed with the court.

If the user specifically requests a COS on a discovery response document,
include it using the standard COS styles — but the default is NO COS on
discovery responses.
