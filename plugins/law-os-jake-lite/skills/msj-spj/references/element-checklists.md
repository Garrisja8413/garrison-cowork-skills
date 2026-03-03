# Specific Personal Jurisdiction Element Checklists

## Two-Part Framework

Specific personal jurisdiction requires satisfying BOTH:
1. **State long-arm statute** (procedural authority)
2. **Constitutional due process** (14th Amendment limits)

---

## Part 1: Long-Arm Statute Analysis

### New Mexico State Court
**NMSA 1978 § 38-1-16(A)**

NM long-arm statute is **coextensive with federal due process**. If due process is satisfied, long-arm is satisfied.

Material_Element_Tags for SUMF:
- `SPJ_LONGARM_NM`

### D.N.M. Federal Court
**Fed. R. Civ. P. 4(k)(1)(A)** → looks to NM long-arm → same analysis

Material_Element_Tags for SUMF:
- `SPJ_LONGARM_FED`

---

## Part 2: Constitutional Due Process Analysis

### Element A: Purposeful Direction / Minimum Contacts

**Test (Calder effects test for intentional torts):**
1. Intentional act
2. Expressly aimed at the forum state
3. Causing harm the defendant knew would be felt in the forum state

**Alternative (Purposeful availment for contracts/business):**
- Defendant deliberately engaged in significant activities within the forum state
- OR created continuing obligations with forum residents

Material_Element_Tags for SUMF:
- `SPJ_MINIMUM_CONTACTS`
- `SPJ_PURPOSEFUL_DIRECTION`
- `SPJ_PURPOSEFUL_AVAILMENT`
- `SPJ_INTENTIONAL_ACT`
- `SPJ_EXPRESS_AIMING`
- `SPJ_FORUM_EFFECTS`

**Negative contacts (support lack of jurisdiction):**
- `SPJ_NO_CONTACTS`
- `SPJ_UNILATERAL_PLAINTIFF`
- `SPJ_FORTUITOUS_CONTACTS`
- `SPJ_NO_TARGETING`

### Element B: Arising From / Relatedness (Nexus)

**Ford Motor Co. standard (2021):**
The claim must "arise out of or relate to" defendant's contacts with the forum.

Does NOT require strict causation—"relate to" is sufficient if there is an affiliation between the forum and the underlying controversy.

Material_Element_Tags for SUMF:
- `SPJ_ARISING_FROM`
- `SPJ_RELATEDNESS`
- `SPJ_NEXUS`
- `SPJ_NO_NEXUS`

### Element C: Reasonableness (Burger King factors)

Only reached if minimum contacts AND nexus are satisfied. Even then, jurisdiction may be unreasonable if it offends "traditional notions of fair play and substantial justice."

**Five factors:**
1. Burden on defendant
2. Forum state's interest in adjudicating
3. Plaintiff's interest in convenient relief
4. Interstate judicial system's interest in efficiency
5. Shared interest of states in furthering substantive policies

Material_Element_Tags for SUMF:
- `SPJ_BURDEN_DEFENDANT`
- `SPJ_FORUM_INTEREST`
- `SPJ_PLAINTIFF_INTEREST`
- `SPJ_EFFICIENCY`
- `SPJ_POLICY_INTERESTS`
- `SPJ_REASONABLENESS`

---

## Burden Allocation

### Initial Burden: Plaintiff
Once defendant properly challenges personal jurisdiction, **plaintiff bears the burden** of making a prima facie showing that jurisdiction exists.

### Shift to Defendant
Defendant must show unreasonableness would make jurisdiction constitutionally impermissible (rarely succeeds if minimum contacts established).

Material_Element_Tags:
- `SPJ_BURDEN_PLAINTIFF`
- `SPJ_BURDEN_SHIFT`

---

## Stream of Commerce Considerations

For product liability / defective product cases:

**J. McIntyre (plurality):**
- Mere awareness product may reach forum ≠ purposeful availment
- Need something more: targeting, marketing, distribution in forum

**Asahi (O'Connor concurrence):**
- Requires "additional conduct" indicating intent to serve the forum

Material_Element_Tags:
- `SPJ_STREAM_COMMERCE`
- `SPJ_TARGETING_FORUM`
- `SPJ_DISTRIBUTION`
- `SPJ_MARKETING`

---

## Internet Contacts Analysis

**Zippo sliding scale:**
1. **Passive websites** (info only) → no jurisdiction
2. **Interactive websites** (some exchange) → depends on level/nature
3. **Active business** (contracts, transactions) → likely jurisdiction

Material_Element_Tags:
- `SPJ_INTERNET_PASSIVE`
- `SPJ_INTERNET_INTERACTIVE`
- `SPJ_INTERNET_ACTIVE`

---

## SUMF Organization by Element

Recommended SUMF structure for SPJ motions:

**Section I: Defendant's Identity & Domicile**
- Corporate status, state of incorporation, principal place of business
- Tags: `SPJ_DEFENDANT_ID`, `SPJ_DOMICILE`

**Section II: Lack of Contacts with Forum**
- No office, employees, agents in forum
- No property in forum
- No registration/license in forum
- Tags: `SPJ_NO_CONTACTS`, `SPJ_NO_PRESENCE`

**Section III: Nature of Alleged Conduct**
- Where conduct occurred
- Who directed/controlled conduct
- Tags: `SPJ_CONDUCT_LOCATION`, `SPJ_NO_TARGETING`

**Section IV: Relationship to Claims**
- How claims allegedly arise
- Why no nexus to forum contacts
- Tags: `SPJ_NO_NEXUS`, `SPJ_UNILATERAL_PLAINTIFF`

**Section V: Reasonableness Factors (if applicable)**
- Burden of litigating in forum
- Tags: `SPJ_BURDEN_DEFENDANT`
