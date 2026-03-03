# Chrome Extension Workflow: Opposing Counsel & Judge Research

**Version:** 1.0
**Last Updated:** 2026-02-23
**Status:** Interim bridge — will be replaced by native research integrations

## Purpose

Capture structured intelligence on opposing counsel, judges, and expert
witnesses from web research sources and feed it into Law-OS for case strategy.
This workflow supports pre-litigation research, motion practice preparation,
and deposition planning (SYNAPSE).

## Prerequisites

- Chrome browser with Claude extension installed
- Active Claude Pro Cowork session mounted to `law-os-lite/` workspace
- Access to relevant research sources (court websites, bar directories, Martindale-Hubbell, LinkedIn, published opinions)

## When to Use

- New case assigned — research opposing counsel's litigation style
- Pre-motion — research judge's ruling patterns on the relevant issue
- Pre-deposition — research expert witness credentials and prior testimony
- Settlement negotiation — research opposing firm's settlement patterns

## Research Targets

### Opposing Counsel Profile

| Data Point | Source | What to Capture |
|------------|--------|-----------------|
| Practice areas | Bar website, firm website | Primary practice, case types |
| Years of experience | Bar website | Year admitted, jurisdictions |
| Litigation style | Court filings, published opinions | Aggressive vs. cooperative, motion practice frequency |
| Discovery approach | Prior case filings | Objection patterns, discovery disputes |
| Settlement patterns | Jury verdict databases, news | Range, timing, tendencies |
| Prior cases against our firm | Internal records, court search | History, outcomes |

### Judge Profile

| Data Point | Source | What to Capture |
|------------|--------|-----------------|
| Current caseload | Court website | Volume, case types |
| Ruling patterns | Published opinions, court orders | Tendencies on MSJ, MTC, discovery disputes |
| Scheduling preferences | Court website, local rules | Deadlines, trial setting practices |
| Pet peeves | Published opinions, bar association talks | Formatting requirements, procedure adherence |
| Prior rulings in similar cases | Court search | How they've ruled on negligence, damages, discovery scope |

### Expert Witness Profile

| Data Point | Source | What to Capture |
|------------|--------|-----------------|
| Credentials | CV, publications | Degrees, certifications, academic positions |
| Prior testimony | Court records, expert databases | Cases testified in, for which side |
| Published opinions | Academic databases | Positions on relevant medical/technical issues |
| Daubert/Alberico challenges | Court records | Prior challenges to their testimony, outcomes |
| Fees | Deposition transcripts, published reports | Standard rates |

## Workflow Steps

### Step 1: Identify Research Targets

Before starting research, identify what you need:

```
/inference-engine

I need to research [opposing counsel / judge / expert] for case [CASE_CODE].
Key issues: [list the legal issues that matter for this case].
What information would be most strategically valuable?
```

### Step 2: Conduct Web Research

For each research source:

1. Navigate to the source in Chrome
2. Locate relevant information
3. Use the Claude Chrome extension to capture the page content
4. Repeat for each relevant source page

**Recommended sources by target:**

| Target | Sources |
|--------|---------|
| Opposing counsel | NM Bar website, firm website, Google Scholar (filed motions), NM Courts case search |
| Judge | NM Courts published opinions, court website scheduling orders, NM Bar CLE materials |
| Expert witness | PubMed (publications), ExpertPages, prior deposition transcripts (if available) |

### Step 3: Feed to Cowork Session

Paste or send captured research to the Cowork session:

```
Here is research on [target name] for case [CASE_CODE]:

[Source 1: Bar Website]
[extracted content]

[Source 2: Published Opinion in Similar Case]
[extracted content]

[Source 3: Firm Website Biography]
[extracted content]

Please compile a structured profile memo.
```

### Step 4: Save Research Output

Save the compiled profile to the case directory:

```
cases/{CASE_CODE}/drafts/Research-OC-Profile-{Name}.md
cases/{CASE_CODE}/drafts/Research-Judge-Profile-{Name}.md
cases/{CASE_CODE}/drafts/Research-Expert-Profile-{Name}.md
```

## Output Format for Law-OS Consumption

### Opposing Counsel Profile Memo

```
# Opposing Counsel Profile: [Name]

## Background
- Firm: [firm name]
- Bar Number: [number]
- Year Admitted: [year]
- Primary Practice: [areas]

## Litigation Style Assessment
- Motion practice frequency: [High/Medium/Low]
- Discovery approach: [Cooperative/Aggressive/Mixed]
- Settlement tendencies: [Early settler/Litigator/Varies]

## Relevant Prior Cases
| Case | Issue | Outcome | Notes |
|------|-------|---------|-------|

## Strategic Notes
[Key observations for case strategy]

## Sources
[List all sources with dates accessed]
```

## SYNAPSE Integration

When researching for deposition preparation, feed the opposing counsel or
expert witness profile directly to SYNAPSE:

```
/synapse PREP

Here is the expert witness profile for [Name]:
[profile content]

Please develop a deposition examination plan.
```

SYNAPSE uses the research profile to:
- Select appropriate witness-type algorithm
- Identify personality archetype markers
- Plan questioning gear progression
- Flag areas for impeachment based on prior testimony

## Limitations

- **Point-in-time data:** Research reflects information available at time of capture
- **No automated updates:** Must re-research if circumstances change
- **Source reliability varies:** Court records are authoritative; web content may be outdated
- **Privacy boundaries:** Only collect publicly available information
- **No automated court search:** Must manually navigate court websites

## Future: Native Research Integration

Post-v1.1, native integrations with court filing databases and legal research
platforms will automate much of this research. The Chrome extension bridge
provides the interim workflow.

---

*CONFIDENTIAL — Attorney Work Product*
