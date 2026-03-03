# Chrome Extension Workflow: LexisNexis Citation Verification

**Version:** 1.0
**Last Updated:** 2026-02-23
**Status:** Interim bridge — will be replaced by native Lexis API integration

## Purpose

Verify and validate legal citations produced by the LPB skill (and downstream
drafting skills) against LexisNexis to confirm accuracy, check for subsequent
history, and ensure no cited authority has been overruled, reversed, or
otherwise negatively treated. This workflow supports the LPB VERIFY stage
and the R11 pre-filing certification.

## Prerequisites

- Active LexisNexis subscription with Shepard's access
- Chrome browser with Claude extension installed
- Active Claude Pro Cowork session mounted to `law-os-lite/` workspace
- An LPB law pack with citations to verify (EXTRACT or ENRICH stage)

## When to Use

- **LPB VERIFY stage:** After LPB EXTRACT and ENRICH, before marking a law pack as verified
- **Pre-filing:** Before filing any motion or brief, verify all cited authorities
- **Law pack maintenance:** Periodically re-verify existing law packs for subsequent history
- **Opposing authority check:** Verify authorities cited by opposing counsel

## Verification Categories

| Category | What to Check | Shepard's Signal |
|----------|---------------|------------------|
| **Still good law** | Case not overruled or reversed | Green arrow / Positive |
| **Caution** | Case has some negative treatment but not overruled | Yellow triangle / Caution |
| **Overruled** | Case has been overruled or reversed | Red stop sign / Negative |
| **Superseded** | Statute amended or repealed | Orange Q / Questioned |
| **Distinguished** | Case distinguished on relevant point | Blue circle / Cited |

## Workflow Steps

### Step 1: Export Citations from Law Pack

From the Cowork session, extract the citations that need verification:

```
/lpb VERIFY

I need to verify the citations in this law pack:
[upload or reference the LPB EXTRACT/ENRICH output]

Please list all citations that need Shepard's verification.
```

LPB produces a verification checklist:

```
Citations requiring Shepard's verification:

1. Herrera v. Quality Pontiac, 2003-NMSC-018
2. Rodriguez v. Del Sol Shopping Center, 2014-NMSC-014
3. Montoya v. Villa Linda Mall, Inc., 1990-NMSC-064
4. NMSA 1978, § 41-5-1 (Medical Malpractice Act)
...
```

### Step 2: Shepardize Each Citation

For each citation in the verification checklist:

1. Open LexisNexis in Chrome
2. Search for the citation
3. Click "Shepard's Citations" (or Shepardize button)
4. Use the Chrome extension to capture:
   - Shepard's signal (positive, caution, negative, questioned)
   - Number of citing references
   - Any negative treatment (overruled, reversed, distinguished, criticized)
   - Most recent citing decision
   - Whether the specific proposition cited is still supported

### Step 3: Capture Verification Results

For each citation, capture and paste to Cowork:

```
Citation: Herrera v. Quality Pontiac, 2003-NMSC-018
Shepard's Signal: Positive (Green Arrow)
Citing References: 247
Negative Treatment: None
Most Recent Cite: [Case Name], 2025-NMCA-XXX
Specific Proposition: [duty of care standard] — Still supported
Status: VERIFIED GOOD LAW
```

### Step 4: Feed Results to LPB VERIFY

```
/lpb VERIFY

Here are the Shepard's results for the citations in [law pack name]:

[Paste all verification results]

Please update the law pack with verification status and flag any citations
that need replacement.
```

### Step 5: Handle Flagged Citations

For citations with negative treatment:

| Shepard's Result | LPB Action |
|------------------|------------|
| **Overruled/Reversed** | REMOVE from law pack; find replacement authority |
| **Distinguished on this point** | FLAG with warning; note the distinguishing case |
| **Superseded (statute)** | UPDATE to current version; note amendment |
| **Caution (criticized)** | KEEP but note caution; consider alternative authority |
| **Questioned** | REVIEW the questioning case; determine if still reliable |

```
/lpb VERIFY

Citation "Smith v. Jones, 2010-NMSC-005" was overruled by
"Johnson v. Williams, 2024-NMSC-012" on the causation standard.

Please find replacement authority for the proximate causation
standard in NM and update the law pack.
```

## Verification Output Format

After completing verification, LPB produces an updated law pack with a
verification tab:

### Verification Tab (in LP Excel)

| Citation | Shepard_Signal | Last_Checked | Negative_Treatment | Replacement | Verified_By | Notes |
|----------|---------------|--------------|-------------------|-------------|-------------|-------|
| Herrera v. Quality Pontiac, 2003-NMSC-018 | Positive | 2026-02-23 | None | N/A | [Attorney] | Good law |
| Smith v. Jones, 2010-NMSC-005 | Negative | 2026-02-23 | Overruled | Johnson v. Williams, 2024-NMSC-012 | [Attorney] | Replaced |

## R11 Integration

The R11 (Rule 11 Pre-Filing Certification) skill checks whether cited
authorities in a drafted motion have been verified:

```
/r11

[Upload the drafted motion]

Please run Rule 11 pre-filing certification. The law pack used for this
motion is at law-packs/LP-Verified-Negligence-Elements-NM.xlsx.
```

R11 checks that:
- Every cited authority appears in a VERIFIED law pack
- No cited authority has a Negative Shepard's signal
- Verification was performed within the last 90 days
- No subsequent contradictory authority exists

## Bulk Verification Workflow

For verifying an entire law pack efficiently:

1. Export all unique citations from the law pack (LPB does this automatically)
2. Group citations by reporter (NMSC, NMCA, federal, statutes)
3. In LexisNexis, use Shepard's batch citation feature if available
4. For each citation, capture the signal and any negative treatment
5. Feed all results to LPB VERIFY in one batch

**Estimated throughput:** 15-20 citations per hour with manual Shepardizing

## Limitations

- **Manual process:** Each citation must be individually Shepardized via the web interface
- **No automated monitoring:** Must re-verify periodically; no alerts for subsequent negative treatment
- **Lexis subscription required:** Cannot verify without active LexisNexis access
- **Point-in-time verification:** Results reflect Shepard's database at time of check
- **Proposition-level accuracy:** Shepard's checks the case overall; verifying the specific legal proposition cited requires reading the citing cases

## Future: Native Lexis Integration

Post-v1.1, a native LexisNexis API integration will:
- Automatically Shepardize all citations in a law pack
- Monitor for subsequent negative treatment
- Alert when cited authority changes status
- Auto-flag motions drafted from stale packs
- Integrate with LPB VERIFY for automated verification marking

Until then, this Chrome extension workflow is the supported method.

---

*CONFIDENTIAL — Attorney Work Product*
