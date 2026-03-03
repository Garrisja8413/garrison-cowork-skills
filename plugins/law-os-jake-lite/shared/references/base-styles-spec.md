# Base OOXML Style Specification — Shared Reference

This file contains all styles that are **identical across pleadings,
letters, and discovery** documents. Each format overlay skill's
`style-spec.md` inherits from this base and defines only its
document-type-specific overrides.

## Document Defaults (docDefaults)

**Optima 12pt baseline.** All documents use this. The Normal style may
further refine spacing and justification, but font and size are set here.

```xml
<w:docDefaults>
  <w:rPrDefault>
    <w:rPr>
      <w:rFonts w:ascii="Optima" w:eastAsia="Optima"
                w:hAnsi="Optima" w:cs="Times New Roman"/>
      <w:sz w:val="24"/>
      <w:szCs w:val="24"/>
      <w:lang w:val="en-US" w:eastAsia="en-US" w:bidi="ar-SA"/>
    </w:rPr>
  </w:rPrDefault>
  <w:pPrDefault/>
</w:docDefaults>
```

**Why Optima in docDefaults:** Previously, docDefaults used TNR with Normal
overriding to Optima. This caused any style that did not explicitly set
rFonts (e.g., Heading 5, Quote 2, Normal1) to fall through to TNR instead
of Optima. By setting Optima at the docDefaults level, every style inherits
Optima automatically unless explicitly overridden.

## Style: Normal1 (No-Space Variant)

Used for caption blocks, addresses, RE tables, signature areas — any
content that should be single-spaced without after-paragraph spacing.

```xml
<w:style w:type="paragraph" w:customStyle="1" w:styleId="Normal1">
  <w:name w:val="Normal1"/>
  <w:basedOn w:val="Normal"/>
  <w:qFormat/>
  <w:pPr>
    <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
  </w:pPr>
</w:style>
```

## Style: _PA Caption

See `shared/references/caption-block-spec.md` for the complete caption
specification including alignment rules and borderless table XML.

```xml
<w:style w:type="paragraph" w:customStyle="1" w:styleId="PACaption">
  <w:name w:val="_PA Caption"/>
  <w:basedOn w:val="Normal"/>
  <w:qFormat/>
  <w:pPr>
    <w:keepLines/>
    <w:suppressAutoHyphens/>
    <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
    <w:contextualSpacing/>
    <w:jc w:val="left"/>
  </w:pPr>
  <!-- NOTE: No <w:rPr> with <w:b/> — caption text is NOT bold -->
</w:style>
```

## Style: Heading 1

Roman numeral numbered (I., II., III.), **bold**, single-spaced:

```xml
<w:style w:type="paragraph" w:styleId="Heading1">
  <w:name w:val="heading 1"/>
  <w:basedOn w:val="Normal"/>
  <w:next w:val="Normal"/>
  <w:link w:val="Heading1Char"/>
  <w:uiPriority w:val="9"/>
  <w:qFormat/>
  <w:pPr>
    <w:keepNext/>
    <w:numPr>
      <w:numId w:val="6"/>
    </w:numPr>
    <w:spacing w:after="240" w:line="240" w:lineRule="auto"/>
    <w:jc w:val="left"/>
    <w:outlineLvl w:val="0"/>
  </w:pPr>
  <w:rPr>
    <w:b/>
  </w:rPr>
</w:style>
```

**Character companion (REQUIRED):**
```xml
<w:style w:type="character" w:customStyle="1" w:styleId="Heading1Char">
  <w:name w:val="Heading 1 Char"/>
  <w:basedOn w:val="DefaultParagraphFont"/>
  <w:link w:val="Heading1"/>
  <w:rPr>
    <w:rFonts w:ascii="Optima" w:hAnsi="Optima"/>
    <w:b/>
  </w:rPr>
</w:style>
```

## Style: Heading 2

Alpha upper numbered (A., B., C.), **bold**:

```xml
<w:style w:type="paragraph" w:styleId="Heading2">
  <w:name w:val="heading 2"/>
  <w:basedOn w:val="Heading1"/>
  <w:next w:val="Normal"/>
  <w:link w:val="Heading2Char"/>
  <w:qFormat/>
  <w:pPr>
    <w:numPr>
      <w:ilvl w:val="1"/>
    </w:numPr>
    <w:outlineLvl w:val="1"/>
  </w:pPr>
</w:style>
```

```xml
<w:style w:type="character" w:customStyle="1" w:styleId="Heading2Char">
  <w:name w:val="Heading 2 Char"/>
  <w:basedOn w:val="DefaultParagraphFont"/>
  <w:link w:val="Heading2"/>
  <w:rPr>
    <w:rFonts w:ascii="Optima" w:hAnsi="Optima"/>
    <w:b/>
  </w:rPr>
</w:style>
```

## Style: Heading 3

Decimal numbered (1., 2., 3.), **bold**:

```xml
<w:style w:type="paragraph" w:styleId="Heading3">
  <w:name w:val="heading 3"/>
  <w:basedOn w:val="Heading2"/>
  <w:next w:val="Normal"/>
  <w:link w:val="Heading3Char"/>
  <w:qFormat/>
  <w:pPr>
    <w:numPr>
      <w:ilvl w:val="2"/>
    </w:numPr>
    <w:outlineLvl w:val="2"/>
  </w:pPr>
</w:style>
```

```xml
<w:style w:type="character" w:customStyle="1" w:styleId="Heading3Char">
  <w:name w:val="Heading 3 Char"/>
  <w:basedOn w:val="DefaultParagraphFont"/>
  <w:link w:val="Heading3"/>
  <w:rPr>
    <w:rFonts w:ascii="Optima" w:hAnsi="Optima"/>
    <w:b/>
  </w:rPr>
</w:style>
```

## Style: Heading 4

Alpha lower numbered (a., b., c.), **bold**:

```xml
<w:style w:type="paragraph" w:styleId="Heading4">
  <w:name w:val="heading 4"/>
  <w:basedOn w:val="Heading3"/>
  <w:next w:val="Normal"/>
  <w:link w:val="Heading4Char"/>
  <w:qFormat/>
  <w:pPr>
    <w:numPr>
      <w:ilvl w:val="3"/>
    </w:numPr>
    <w:outlineLvl w:val="3"/>
  </w:pPr>
</w:style>
```

```xml
<w:style w:type="character" w:customStyle="1" w:styleId="Heading4Char">
  <w:name w:val="Heading 4 Char"/>
  <w:basedOn w:val="DefaultParagraphFont"/>
  <w:link w:val="Heading4"/>
  <w:rPr>
    <w:rFonts w:ascii="Optima" w:hAnsi="Optima"/>
    <w:b/>
  </w:rPr>
</w:style>
```

## Style: Heading 5 (Optional Lower Hierarchy)

```xml
<w:style w:type="paragraph" w:styleId="Heading5">
  <w:name w:val="heading 5"/>
  <w:basedOn w:val="Normal"/>
  <w:next w:val="Normal"/>
  <w:link w:val="Heading5Char"/>
  <w:qFormat/>
  <w:pPr>
    <w:keepNext/>
    <w:numPr>
      <w:ilvl w:val="4"/>
      <w:numId w:val="6"/>
    </w:numPr>
    <w:spacing w:before="40" w:after="240" w:line="240" w:lineRule="auto"/>
    <w:jc w:val="left"/>
    <w:outlineLvl w:val="4"/>
  </w:pPr>
  <w:rPr>
    <w:b/>
  </w:rPr>
</w:style>
```

```xml
<w:style w:type="character" w:customStyle="1" w:styleId="Heading5Char">
  <w:name w:val="Heading 5 Char"/>
  <w:basedOn w:val="DefaultParagraphFont"/>
  <w:link w:val="Heading5"/>
  <w:rPr>
    <w:rFonts w:ascii="Optima" w:hAnsi="Optima"/>
    <w:b/>
  </w:rPr>
</w:style>
```

## Style: Heading 6 (Optional Lower Hierarchy)

```xml
<w:style w:type="paragraph" w:styleId="Heading6">
  <w:name w:val="heading 6"/>
  <w:basedOn w:val="Heading5"/>
  <w:next w:val="Normal"/>
  <w:link w:val="Heading6Char"/>
  <w:qFormat/>
  <w:pPr>
    <w:numPr>
      <w:ilvl w:val="5"/>
    </w:numPr>
    <w:outlineLvl w:val="5"/>
  </w:pPr>
</w:style>
```

```xml
<w:style w:type="character" w:customStyle="1" w:styleId="Heading6Char">
  <w:name w:val="Heading 6 Char"/>
  <w:basedOn w:val="DefaultParagraphFont"/>
  <w:link w:val="Heading6"/>
  <w:rPr>
    <w:rFonts w:ascii="Optima" w:hAnsi="Optima"/>
    <w:b/>
  </w:rPr>
</w:style>
```

## Style: Title

Centered, **bold**, single-spaced:

```xml
<w:style w:type="paragraph" w:styleId="Title">
  <w:name w:val="Title"/>
  <w:basedOn w:val="Normal"/>
  <w:next w:val="Normal"/>
  <w:link w:val="TitleChar"/>
  <w:qFormat/>
  <w:pPr>
    <w:keepNext/>
    <w:spacing w:line="240" w:lineRule="auto"/>
    <w:jc w:val="center"/>
  </w:pPr>
  <w:rPr>
    <w:b/>
  </w:rPr>
</w:style>
```

```xml
<w:style w:type="character" w:customStyle="1" w:styleId="TitleChar">
  <w:name w:val="Title Char"/>
  <w:basedOn w:val="DefaultParagraphFont"/>
  <w:link w:val="Title"/>
  <w:rPr>
    <w:rFonts w:ascii="Optima" w:hAnsi="Optima"/>
    <w:b/>
  </w:rPr>
</w:style>
```

## Style: Title 2

Centered, **bold**, underlined:

```xml
<w:style w:type="paragraph" w:customStyle="1" w:styleId="Title2">
  <w:name w:val="Title 2"/>
  <w:basedOn w:val="Title"/>
  <w:qFormat/>
  <w:pPr>
    <w:spacing w:after="240"/>
  </w:pPr>
  <w:rPr>
    <w:u w:val="single"/>
  </w:rPr>
</w:style>
```

## Style: Quote (Block Quote)

Indented left and right 720 DXA (0.5 inch), single-spaced.
**Font: Optima** — NOT Baskerville Old Face.

```xml
<w:style w:type="paragraph" w:styleId="Quote">
  <w:name w:val="Quote"/>
  <w:basedOn w:val="Normal"/>
  <w:link w:val="QuoteChar"/>
  <w:qFormat/>
  <w:pPr>
    <w:tabs>
      <w:tab w:val="left" w:pos="3600"/>
    </w:tabs>
    <w:spacing w:after="240" w:line="240" w:lineRule="auto"/>
    <w:ind w:left="720" w:right="720"/>
  </w:pPr>
  <w:rPr>
    <w:bCs/>
  </w:rPr>
</w:style>
```

```xml
<w:style w:type="character" w:customStyle="1" w:styleId="QuoteChar">
  <w:name w:val="Quote Char"/>
  <w:basedOn w:val="DefaultParagraphFont"/>
  <w:link w:val="Quote"/>
  <w:rPr>
    <w:rFonts w:ascii="Optima" w:hAnsi="Optima"/>
  </w:rPr>
</w:style>
```

## Style: Quote 2 (Nested Block Quote)

Indented left and right 1440 DXA (1 inch), single-spaced:

```xml
<w:style w:type="paragraph" w:customStyle="1" w:styleId="Quote2">
  <w:name w:val="Quote 2"/>
  <w:basedOn w:val="Normal"/>
  <w:link w:val="Quote2Char"/>
  <w:qFormat/>
  <w:pPr>
    <w:tabs>
      <w:tab w:val="left" w:pos="3600"/>
    </w:tabs>
    <w:spacing w:after="240" w:line="240" w:lineRule="auto"/>
    <w:ind w:left="1440" w:right="1440"/>
  </w:pPr>
</w:style>
```

```xml
<w:style w:type="character" w:customStyle="1" w:styleId="Quote2Char">
  <w:name w:val="Quote 2 Char"/>
  <w:basedOn w:val="DefaultParagraphFont"/>
  <w:link w:val="Quote2"/>
  <w:rPr>
    <w:rFonts w:ascii="Optima" w:hAnsi="Optima"/>
  </w:rPr>
</w:style>
```

## Style: Footnote Text

**Optima 10pt**, single-spaced, tab-aligned:

```xml
<w:style w:type="paragraph" w:styleId="FootnoteText">
  <w:name w:val="footnote text"/>
  <w:basedOn w:val="Normal"/>
  <w:link w:val="FootnoteTextChar"/>
  <w:pPr>
    <w:tabs>
      <w:tab w:val="left" w:pos="144"/>
    </w:tabs>
    <w:spacing w:after="100" w:line="240" w:lineRule="auto"/>
  </w:pPr>
  <w:rPr>
    <w:rFonts w:ascii="Optima" w:eastAsia="Optima"
              w:hAnsi="Optima" w:cs="Times New Roman"/>
    <w:sz w:val="20"/>
    <w:szCs w:val="20"/>
  </w:rPr>
</w:style>
```

```xml
<w:style w:type="character" w:customStyle="1" w:styleId="FootnoteTextChar">
  <w:name w:val="Footnote Text Char"/>
  <w:basedOn w:val="DefaultParagraphFont"/>
  <w:link w:val="FootnoteText"/>
  <w:rPr>
    <w:rFonts w:ascii="Optima" w:eastAsia="Optima"
              w:hAnsi="Optima" w:cs="Times New Roman"/>
    <w:sz w:val="20"/>
    <w:szCs w:val="20"/>
  </w:rPr>
</w:style>
```

## Style: Footnote Reference

```xml
<w:style w:type="character" w:styleId="FootnoteReference">
  <w:name w:val="footnote reference"/>
  <w:rPr>
    <w:vertAlign w:val="superscript"/>
  </w:rPr>
</w:style>
```

## Style: Body Text

```xml
<w:style w:type="paragraph" w:styleId="BodyText">
  <w:name w:val="Body Text"/>
  <w:basedOn w:val="Normal"/>
  <w:link w:val="BodyTextChar"/>
  <w:pPr>
    <w:widowControl w:val="0"/>
    <w:autoSpaceDE w:val="0"/>
    <w:autoSpaceDN w:val="0"/>
    <w:spacing w:line="240" w:lineRule="auto"/>
    <w:jc w:val="left"/>
  </w:pPr>
  <w:rPr>
    <w:rFonts w:eastAsia="Optima" w:cs="Optima"/>
  </w:rPr>
</w:style>
```

```xml
<w:style w:type="character" w:customStyle="1" w:styleId="BodyTextChar">
  <w:name w:val="Body Text Char"/>
  <w:basedOn w:val="DefaultParagraphFont"/>
  <w:link w:val="BodyText"/>
  <w:rPr>
    <w:rFonts w:ascii="Optima" w:eastAsia="Optima"
              w:hAnsi="Optima" w:cs="Optima"/>
  </w:rPr>
</w:style>
```

## Style: _PA Brief Paragraph

```xml
<w:style w:type="paragraph" w:customStyle="1" w:styleId="PABriefParagraph">
  <w:name w:val="_PA Brief Paragraph"/>
  <w:basedOn w:val="Normal"/>
  <w:qFormat/>
  <w:pPr>
    <w:ind w:firstLine="540"/>
    <w:spacing w:after="320" w:line="240" w:lineRule="auto"/>
  </w:pPr>
</w:style>
```

## Style: _PA Block Quote Citation

```xml
<w:style w:type="paragraph" w:customStyle="1" w:styleId="PABlockQuoteCitation">
  <w:name w:val="_PA Block Quote Citation"/>
  <w:basedOn w:val="Normal"/>
  <w:qFormat/>
  <w:pPr>
    <w:jc w:val="right"/>
  </w:pPr>
</w:style>
```

## Style: _PA Signature Block

```xml
<w:style w:type="paragraph" w:customStyle="1" w:styleId="PASignatureBlock">
  <w:name w:val="_PA Signature Block"/>
  <w:basedOn w:val="Normal"/>
  <w:qFormat/>
  <w:pPr>
    <w:ind w:left="4230" w:right="720"/>
    <w:spacing w:line="240" w:lineRule="auto"/>
  </w:pPr>
</w:style>
```

## COS Styles

See `shared/references/certificate-of-service-spec.md` for the complete
COS specification including document type rules and service list format.

### _PA Cert Serve Body

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

### _PA Cert Serve or Letter Title

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

## Style: _PA Letter Body

```xml
<w:style w:type="paragraph" w:customStyle="1" w:styleId="PALetterBody">
  <w:name w:val="_PA Letter Body"/>
  <w:basedOn w:val="Normal"/>
  <w:qFormat/>
</w:style>
```

## Style: SignLeft

```xml
<w:style w:type="paragraph" w:customStyle="1" w:styleId="SignLeft">
  <w:name w:val="SignLeft"/>
  <w:basedOn w:val="Normal1"/>
  <w:qFormat/>
  <w:pPr>
    <w:tabs>
      <w:tab w:val="left" w:pos="4320"/>
    </w:tabs>
    <w:ind w:right="5040"/>
    <w:jc w:val="left"/>
  </w:pPr>
</w:style>
```

## Style: Header

```xml
<w:style w:type="paragraph" w:styleId="Header">
  <w:name w:val="header"/>
  <w:basedOn w:val="Normal"/>
  <w:link w:val="HeaderChar"/>
  <w:pPr>
    <w:tabs>
      <w:tab w:val="center" w:pos="4680"/>
      <w:tab w:val="right" w:pos="9360"/>
    </w:tabs>
    <w:spacing w:line="240" w:lineRule="auto"/>
  </w:pPr>
</w:style>
```

```xml
<w:style w:type="character" w:customStyle="1" w:styleId="HeaderChar">
  <w:name w:val="Header Char"/>
  <w:basedOn w:val="DefaultParagraphFont"/>
  <w:link w:val="Header"/>
  <w:rPr>
    <w:rFonts w:ascii="Optima" w:hAnsi="Optima"/>
  </w:rPr>
</w:style>
```

## Style: Footer

**Optima 8pt gray (#7F7F7F).** This is a critical style — incorrect footer
fonts were the most common formatting error across templates.

```xml
<w:style w:type="paragraph" w:styleId="Footer">
  <w:name w:val="footer"/>
  <w:basedOn w:val="Normal"/>
  <w:link w:val="FooterChar"/>
  <w:pPr>
    <w:tabs>
      <w:tab w:val="center" w:pos="4680"/>
      <w:tab w:val="right" w:pos="9360"/>
    </w:tabs>
    <w:spacing w:after="0" w:line="240" w:lineRule="auto"/>
    <w:jc w:val="left"/>
  </w:pPr>
  <w:rPr>
    <w:rFonts w:ascii="Optima" w:hAnsi="Optima"/>
    <w:color w:val="7F7F7F" w:themeColor="text1" w:themeTint="80"/>
    <w:sz w:val="16"/>
    <w:szCs w:val="16"/>
  </w:rPr>
</w:style>
```

```xml
<w:style w:type="character" w:customStyle="1" w:styleId="FooterChar">
  <w:name w:val="Footer Char"/>
  <w:basedOn w:val="DefaultParagraphFont"/>
  <w:link w:val="Footer"/>
  <w:rPr>
    <w:rFonts w:ascii="Optima" w:hAnsi="Optima"/>
    <w:color w:val="7F7F7F" w:themeColor="text1" w:themeTint="80"/>
    <w:sz w:val="16"/>
    <w:szCs w:val="16"/>
  </w:rPr>
</w:style>
```

## Style: Page Number

```xml
<w:style w:type="character" w:styleId="PageNumber">
  <w:name w:val="page number"/>
  <w:rPr>
    <w:color w:val="auto"/>
    <w:sz w:val="24"/>
  </w:rPr>
</w:style>
```

## Style: List Paragraph

```xml
<w:style w:type="paragraph" w:styleId="ListParagraph">
  <w:name w:val="List Paragraph"/>
  <w:basedOn w:val="Normal"/>
  <w:qFormat/>
  <w:pPr>
    <w:ind w:left="720"/>
    <w:contextualSpacing/>
  </w:pPr>
</w:style>
```

## Style: List Number

```xml
<w:style w:type="paragraph" w:styleId="ListNumber">
  <w:name w:val="List Number"/>
  <w:basedOn w:val="Normal"/>
  <w:pPr>
    <w:numPr>
      <w:ilvl w:val="4"/>
      <w:numId w:val="6"/>
    </w:numPr>
  </w:pPr>
</w:style>
```

## Style: Table Grid

```xml
<w:style w:type="table" w:styleId="TableGrid">
  <w:name w:val="Table Grid"/>
  <w:basedOn w:val="TableNormal"/>
  <w:rPr>
    <w:rFonts w:ascii="Optima" w:eastAsia="Optima"
              w:hAnsi="Optima" w:cs="Times New Roman"/>
  </w:rPr>
  <w:tblPr>
    <w:tblStyleRowBandSize w:val="1"/>
    <w:tblStyleColBandSize w:val="1"/>
    <w:tblBorders>
      <w:top w:val="single" w:sz="4" w:space="0" w:color="auto"/>
      <w:left w:val="single" w:sz="4" w:space="0" w:color="auto"/>
      <w:bottom w:val="single" w:sz="4" w:space="0" w:color="auto"/>
      <w:right w:val="single" w:sz="4" w:space="0" w:color="auto"/>
      <w:insideH w:val="single" w:sz="4" w:space="0" w:color="auto"/>
      <w:insideV w:val="single" w:sz="4" w:space="0" w:color="auto"/>
    </w:tblBorders>
  </w:tblPr>
</w:style>
```

## Borderless Table Override Pattern

For borderless tables (caption block, RE block, signature layout),
override borders to nil **at the TABLE level** inside `<w:tblPr>`:

```xml
<w:tblPr>
  <w:tblStyle w:val="TableGrid"/>
  <w:tblW w:w="9360" w:type="dxa"/>
  <w:tblBorders>
    <w:top w:val="nil"/>
    <w:left w:val="nil"/>
    <w:bottom w:val="nil"/>
    <w:right w:val="nil"/>
    <w:insideH w:val="nil"/>
    <w:insideV w:val="nil"/>
  </w:tblBorders>
  <w:tblLook w:val="04A0" w:firstRow="1" w:lastRow="0"
             w:firstColumn="1" w:lastColumn="0"
             w:noHBand="0" w:noVBand="1"/>
</w:tblPr>
```

**CRITICAL:** Use `w:val="nil"` — NOT `w:val="none"`. Column widths MUST
use `w:type="dxa"`, NOT percentage widths.

## docx-js Equivalent Values

| Property | OOXML DXA | docx-js Value | Notes |
|---|---|---|---|
| Font size 12pt | w:sz="24" | size: 24 | Half-points |
| Font size 10pt | w:sz="20" | size: 20 | Footnote default |
| Font size 8pt | w:sz="16" | size: 16 | Footer |
| Margin 1 inch | 1440 DXA | 1440 | convertInchesToTwip(1) |
| Content width | 9360 DXA | 9360 | 12240 - 2*1440 |
| Double space | line="480" | spacing: { line: 480 } | lineRule: auto |
| Single space | line="240" | spacing: { line: 240 } | lineRule: auto |
| Header offset | 720 DXA | 720 | 0.5 inch |
| Footer offset | 432 DXA | 432 | 0.3 inch |
