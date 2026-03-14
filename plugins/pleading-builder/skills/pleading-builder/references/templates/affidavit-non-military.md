# Affidavit of Non-Military Service

## Purpose
Attorney affidavit certifying compliance with the Servicemembers Civil Relief Act (SCRA) of 2003. Required before entry of default judgment to confirm the defendant is not on active military duty. Filed per-defendant.

## Document Format
- **Font**: Century Schoolbook, 12pt
- **Page**: US Letter, margins 1" all around
- **Caption**: Case number on same line as "Plaintiff," via tabs, underlined
- **Title**: Two lines â "AFFIDAVIT OF NON-MILITARY SERVICE" and "(Defendant Name)" â centered, bold, underlined
- **Body**: Justified, double-spaced, first paragraph indented 0.5"
- **Signature**: Firm name, /s/ line underlined, attorney info, single-spaced

## Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `state` | State name (caps) | NEW MEXICO |
| `county` | County name (caps) | SANDOVAL |
| `court` | Court name | THIRTEENTH JUDICIAL DISTRICT |
| `caseNumber` | Full case number | D-1329-CV-2022-00350 |
| `plaintiffs` | Plaintiff name(s) | STEVE STRIBLING |
| `defendants` | All defendant name(s) | DNM FARMS, LLC, GEORGE BUDAGHER, ANTHONY ORTIZ, LAWRENCE RAEL, CHAD BUDAGHER, and ROBERT PIANZA |
| `clientRole` | "Plaintiffs" or "Plaintiff" | Plaintiff |
| `targetDefendant` | Specific defendant this affidavit covers | GEORGE BUDAGHER |
| `affiantName` | Name of affiant (attorney) | Jake Garrison |
| `dated` | Date of affidavit | 12/6/2023 |

## Note
This document is filed **per defendant**. If there are multiple defendants, generate one for each.

## Generation Script
`scripts/generate-affidavit-non-military.js`
