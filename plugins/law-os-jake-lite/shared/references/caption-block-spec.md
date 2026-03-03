# Caption Block Specification — Shared Reference

This is the single source of truth for court caption formatting across all
PA-DOC-FORMAT overlay skills (pleadings, discovery, letters RE tables).

## _PA Caption Style (OOXML)

Caption text is **NOT bold**. The `_PA Caption` style must NOT contain
`<w:b/>` in its rPr. State, county, district, and case number lines are
all plain (non-bold), left-aligned text.

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

### Key Properties

- **keepLines:** Prevents page break within caption
- **suppressAutoHyphens:** No word breaking in caption text
- **contextualSpacing:** Removes extra space between consecutive caption lines
- **spacing after="0", line="240":** Tight single-spacing with no extra
  paragraph space between caption lines
- **jc="left":** Default for state court (override to "center" for federal)

## Court Type Detection and Alignment

### State Court (NM District Courts) — LEFT-ALIGNED (Default)

All PA filings default to left-aligned captions. Case numbers starting
with "D-" (state district format, e.g., D-202-CV-2024-xxxxx) indicate
state court.

- State, County, and District lines are left-justified
- `<w:jc w:val="left"/>` in `_PA Caption` style

### Federal Court (D.N.M.) — CENTERED

Case numbers starting with "Cv-", "1:", or "2:" (federal format) indicate
federal court.

- All caption lines are centered
- Override `_PA Caption` style to `<w:jc w:val="center"/>`

### Detection Logic

```
IF case_number starts with "D-"     → state court → LEFT-ALIGNED
IF case_number starts with "Cv-"    → federal court → CENTERED
IF case_number starts with "1:"     → federal court → CENTERED
IF case_number starts with "2:"     → federal court → CENTERED
DEFAULT (when in doubt)             → LEFT-ALIGNED (state court)
```

## Caption Table (Borderless)

The caption block uses a borderless table for party name and cause number
alignment. Borders MUST be set to `w:val="nil"` at the TABLE level.

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

### Critical Rules

- **Use `w:val="nil"`** — NOT `w:val="none"` and NOT `w:val="single"`
- Set nil on ALL SIX border positions: top, left, bottom, right, insideH,
  insideV
- Do NOT rely on cell-level border overrides
- Column widths MUST use `w:type="dxa"` (absolute DXA values), NOT
  percentage-based widths (`w:type="pct"`)
- Total table width: 9360 DXA (full content width)

## Party Block Structure

### Court Identification Lines

```
STATE OF NEW MEXICO
COUNTY OF [COUNTY NAME]
[JUDICIAL DISTRICT] JUDICIAL DISTRICT
```

- Each line uses `_PA Caption` style
- Single-spaced (`line="240"`, `after="0"`)
- Blank paragraph separator (using `_PA Caption` style) or `w:spacing
  w:before` value between court ID lines and the party block

### Party Block (Table Layout)

| Column | Content |
|--------|---------|
| Left (party names) | Plaintiff name(s), "v.", Defendant name(s) |
| Right (case info) | Cause No., Division |

- Plaintiff line(s) above "v." separator
- "v." on its own row
- Defendant line(s) below "v."
- Cause number right-aligned or in right column

## SmartAdvocate Integration

When using SmartAdvocate shells, use the merge token for the entire
caption block:

```
<! [COURT-COURT#-CAPTION] !>
```

This token replaces the entire caption block (court ID lines + party
block + cause number). When this token is present, do not generate
the caption block manually.

## Spacing Rules

- **Between consecutive caption lines:** No extra spacing. `after="0"`
  and `contextualSpacing` handle this.
- **Between court ID block and party block:** Single blank `_PA Caption`
  paragraph OR `w:spacing w:before` value on the first party block
  paragraph.
- **After the entire caption block:** Standard paragraph spacing before
  the title block.
