---
name: law
description: "Litigation Analysis Worksheet (LAW) generator. Creates professional, client-facing Word documents (.docx) that combine a plain-language litigation process overview with structured case-specific questionnaires, evidence photo identification sections, document checklists, and attorney work product strategy notes. Use this skill whenever the user mentions 'litigation analysis worksheet', 'LAW', 'client worksheet', 'client questionnaire', 'case analysis worksheet', 'intake worksheet for litigation', 'litigation overview for client', 'evidence photo worksheet', 'photo identification worksheet', or wants to create a professional document for a client that explains the litigation process and collects case information. (v1.0)"
---

# Litigation Analysis Worksheet (LAW)

## Purpose

The LAW skill generates a comprehensive, professional Word document (.docx) designed to serve dual purposes:

1. Client Education - Introduces the client to the litigation process in plain, accessible language.
2. Information Collection - Structures targeted questions, evidence identification, and document requests.

## When to Use

- After case opening when the client needs to understand the litigation ahead
- When onboarding a client into an active litigation matter
- When the attorney needs structured client input on facts, evidence, and documents
- When evidence photos need client identification and confirmation

## Document Architecture

Fixed section order: Cover Page, Table of Contents, Welcome, Litigation Process Overview, Case at a Glance, Questions for Client (lettered subsections A-J), Evidence Photo Identification (optional), Document Checklist, Next Steps, JAG Strategy (attorney work product).

## Formatting: Navy (1B3A5C), Gold (C9A84C), Arial font, US Letter, 1-inch margins.

## Implementation: Use docx-js npm package. Helper functions: spacer, dividerLine, sectionHeader, subHeader, bodyText, responseBox, questionWithBox, photoEntry.
