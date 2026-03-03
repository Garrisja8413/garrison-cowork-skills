# Quote & Verification Source Extraction Methodology — QVS Reference

**Version:** 1.0
**Applies to:** QVS (Quote Verification System)

## Purpose

QVS extracts, verifies, and formats quotations from source materials for use in
legal documents. This reference defines the extraction methodology to ensure
accuracy and proper attribution.

## Extraction Protocol

### Step 1 — Source Identification
Identify the source document and classify:
- **Deposition transcript** — cite by witness name, page:line
- **Medical record** — cite by provider, date, Bates number
- **Correspondence** — cite by author, recipient, date
- **Court filing** — cite by document title, docket number, page
- **Statute/rule** — cite by jurisdiction, title, section

### Step 2 — Verbatim Extraction
Extract the exact text from the source:
- Copy character-for-character including punctuation, capitalization, and spelling
- Preserve paragraph breaks and formatting cues (emphasis, underlining)
- Note any illegible portions as `[illegible]`
- Note any interpolations as `[sic]` for errors in the original

### Step 3 — Verification Against Source
Compare extracted text against the source document:
- Character-by-character comparison for short quotes (under 50 words)
- Paragraph-level comparison for block quotes
- Flag any discrepancies for attorney review

### Step 4 — Citation Formatting
Format the citation per the applicable style:
- **Deposition:** `(Doe Dep. 45:12-18)`
- **Medical record:** `(Dr. Smith, Progress Note, 3/15/2024, Bates PA000123)`
- **Statute:** `NMSA 1978, Section 41-5-3`
- **Case law:** `Doe v. Roe, 2023-NMCA-045, Para. 23`

## Confidence Levels

| Level | Meaning | Action |
|-------|---------|--------|
| **HIGH** | Exact match verified against source | Use without qualification |
| **MEDIUM** | Source available but minor ambiguity (e.g., unclear handwriting) | Note ambiguity; attorney review recommended |
| **LOW** | Source not directly available; reconstructed from secondary reference | Flag prominently; do not use in filed documents without verification |
| **UNVERIFIED** | Quote provided by user without source verification | Mark as `[UNVERIFIED — source verification required]` |

## Hard Rules

1. **Never fabricate quotes** — if the source text is not available, mark as UNVERIFIED
2. **Never alter quotes** — use `[brackets]` for interpolations, `...` for omissions
3. **Always provide pinpoint citations** — page, paragraph, or line number required
4. **Preserve original errors** — use `[sic]` rather than correcting
5. **Block quote rule** — quotes of 50+ words must use block quote format
6. **Ellipsis standards** — use three dots for within-sentence omission, four dots for
   omission that includes end of sentence

---

*CONFIDENTIAL — Attorney Work Product*
