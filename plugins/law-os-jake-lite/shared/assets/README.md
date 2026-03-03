# Shared Assets Directory

This directory holds firm branding assets used by format overlay skills
when generating documents outside SmartAdvocate.

## Expected Files

### letterhead.png

The firm letterhead image used in first-page headers for letters.

- **Recommended dimensions:** 6.5 inches wide (9360 DXA) to fill content width
- **Recommended DPI:** 300 DPI for print quality
- **Format:** PNG (preferred) or JPEG

#### OOXML Embedding

When embedding the letterhead image in a Word document header, use:

```xml
<w:hdr>
  <w:p>
    <w:pPr>
      <w:pStyle w:val="Header"/>
      <w:jc w:val="center"/>
    </w:pPr>
    <w:r>
      <w:drawing>
        <wp:inline distT="0" distB="0" distL="0" distR="0">
          <wp:extent cx="5943600" cy="[HEIGHT_EMU]"/>
          <wp:docPr id="1" name="Letterhead"/>
          <a:graphic>
            <a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">
              <pic:pic>
                <pic:blipFill>
                  <a:blip r:embed="rId_image"/>
                </pic:blipFill>
                <pic:spPr>
                  <a:xfrm>
                    <a:ext cx="5943600" cy="[HEIGHT_EMU]"/>
                  </a:xfrm>
                </pic:spPr>
              </pic:pic>
            </a:graphicData>
          </a:graphic>
        </wp:inline>
      </w:drawing>
    </w:r>
  </w:p>
</w:hdr>
```

Note: `cx="5943600"` = 6.5 inches in EMUs (English Metric Units).
Calculate height EMU from actual image aspect ratio.

#### Relationship Entries

Add to `word/_rels/header1.xml.rels`:

```xml
<Relationship Id="rId_image"
  Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image"
  Target="media/letterhead.png"/>
```

Add to `[Content_Types].xml`:

```xml
<Default Extension="png" ContentType="image/png"/>
```

### logo.png

Firm logo if used separately from the letterhead (optional).

## Fallback Rule

If no image file exists in this directory, use the text-based letterhead
fallback from `pa-doc-format-letters/references/letterhead-spec.md`.

When the SmartAdvocate shell is available, always prefer the
`<! [Letterhead] !>` merge token over either the image or text fallback.

### Priority Order

1. SmartAdvocate `<! [Letterhead] !>` merge token (production)
2. `shared/assets/letterhead.png` image file (direct generation)
3. Text-based XML letterhead from `letterhead-spec.md` (last resort)
