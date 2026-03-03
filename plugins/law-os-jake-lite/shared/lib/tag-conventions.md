# XML Tag Conventions v1.2

## Core Data Layers

These tags are used across nearly all skills. They wrap pack data when fed into drafting or analysis skills.

| Tag | Purpose | Used In |
|-----|---------|---------|
| `<evidence_layer>` | Factual evidence from CFP | 20+ skills |
| `<legal_layer>` | Legal authority from LPB | 20+ skills |
| `<strategic_layer>` | Claims gap analysis from PCM | 15+ skills |
| `<behavioral_layer>` | Judge/jury profile data | 12+ skills |
| `<discovery_layer>` | Discovery status tracking | depo-index, trial-brief |

## Domain-Specific Strategic Layers

Three intentionally distinct variants for different analytical domains:

| Tag | Domain | Used In |
|-----|--------|---------|
| `<strategic_layer>` | Claims element proof gaps (PCM-driven) | Most drafting/analysis skills |
| `<strategic_defense_layer>` | Defense element proof gaps (PDM-driven) | PDM |
| `<strategy_layer>` | Settlement positioning & leverage (DRO-driven) | DRO |

These are NOT synonyms. Each serves a different analytical purpose.

## Pack Request Tags

Builder skills (CAL, DVP) use structured request tags for their EXTRACT/ENRICH/VERIFY stages:

| Pattern | Example | Purpose |
|---------|---------|---------|
| `<{skill}_extract_request>` | `<cal_extract_request>` | Request to extract data |
| `<{skill}_enrich_request>` | `<dvp_enrich_request>` | Request to enrich data |
| `<{skill}_packet_request>` | `<cal_packet_request>` | Request for final packet output |

## Pack Reference Tags

| Tag | Purpose |
|-----|---------|
| `<cfp_packet>` / `<cfp_reference>` | CFP data container / reference link |
| `<lpb_packet>` / `<lpb_reference>` | LPB data container / reference link |
| `<pcm_data>` | PCM data container |

Convention: `_packet` = full embedded data; `_reference` = link to external pack.

## Deposition Tags

| Tag | Purpose |
|-----|---------|
| `<depo_index>` | Transcript index container |
| `<prior_statements>` | Prior statements for impeachment |
| `<duces_tecum>` | Documents to produce at deposition |
| `<topics_30b6>` | 30(b)(6) examination topics |
| `<impeachment_sources>` | Impeachment source list |

## Operational Tags

| Tag | Purpose |
|-----|---------|
| `<case_context>` | Relevance context for discovery requests |
| `<case_facts>` | Case facts data container |
| `<intake_info>` | Intake information |
| `<meet_confer_log>` | Meet-and-confer discussion log |
| `<motion_history>` | Motion history in case |
| `<quote_requests>` | Quote extraction request list (QVS) |

## Rules

1. Core layer tags (`<evidence_layer>`, `<legal_layer>`, `<strategic_layer>`, `<behavioral_layer>`) are universal -- use them in any skill that consumes those pack types
2. Domain-specific tags stay in their domain -- don't use `<strategy_layer>` outside DRO
3. Builder request tags follow the `<{skill}_{stage}_request>` pattern
4. New tags should be documented here before use
5. Tags that appear in examples or HTML artifacts (`<u>`, `<w>`, `<paste>`, `<sys>`) are NOT part of the schema
