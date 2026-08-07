# Canadian NP CNPLE Cram Library

Status: ACTIVE AUTHORING
Locale: Canada
Exam: Canadian Nurse Practitioner Licensure Exam (CNPLE)
Level: Entry-level Nurse Practitioner across the lifespan and practice settings

## Purpose

These are not shortened textbook lessons. A CNPLE cram lesson is a rapid clinical-decision pathway designed for application and critical-thinking questions.

The library is authored against the national CNPLE blueprint and revised Canadian NP entry-level competencies. It deliberately emphasizes assessment, differential diagnosis, management, counselling, transition/continuity, safety, evidence appraisal, leadership, education and advocacy across the lifespan.

## Cram lesson contract

Every cram lesson must contain:

- `id` — stable deterministic identifier
- `title` — learner-facing title without tier labels
- `system` — primary body-system or professional-practice grouping
- `blueprintDomains` — CNPLE domain/subdomain mapping
- `lifespan` — applicable ages/stages
- `acuity` — routine, urgent, emergent, or mixed
- `bottomLine` — 1–3 sentences that state the clinical decision the learner must remember
- `recognize` — high-yield presentation/pattern-recognition clues
- `differentiate` — findings that separate the most important competing diagnoses
- `assessment` — focused history and physical examination priorities
- `workup` — targeted investigations and interpretation priorities; avoid shotgun testing
- `management` — prioritized treatment/management sequence
- `medicationSafety` — contraindications, interactions, monitoring, pregnancy/renal/hepatic or deprescribing issues when relevant
- `redFlags` — findings requiring emergency stabilization, ED transfer, urgent specialty involvement or higher level of care
- `counselling` — patient/family teaching, harm reduction, shared decision-making or prevention
- `followUp` — reassessment interval/targets, transition and continuity requirements
- `examTrap` — the tempting but unsafe/incorrect CNPLE choice
- `oneLinePearl` — last-second recall line
- `sourceBasis` — current Canadian/national guideline or regulator source used for the clinical claims
- `sourceAsOf` — date/year of the source checked during authoring
- `localPolicyCheck` — `true` when legislation, formularies, public-health reporting, referral pathways, screening programs or prescribing authority can vary by province/territory

## Authoring rules

1. Canadian guidance takes priority when a current authoritative Canadian source exists.
2. Do not import US-only thresholds, drug availability, screening schedules, billing rules or scope-of-practice assumptions into the Canadian library.
3. Provincial/territorial legal and public-health differences are tagged for local-policy verification rather than falsely presented as national rules.
4. Use SI units used in Canadian practice (for example mmol/L) unless an alternate unit is itself clinically relevant.
5. Prefer the smallest investigation set that safely distinguishes the serious differential diagnoses.
6. Medication content must include the safety reason behind the choice, not only the drug name.
7. Every topic must include a disposition/escalation decision where clinically relevant.
8. Across the library, include infants, children, adolescents, adults, pregnancy/postpartum, older adults, advanced age and end-of-life presentations.
9. Cases should integrate culture, trauma/violence-informed care, social determinants, accessibility, rural/remote constraints, Indigenous health and health inequities where clinically relevant without stereotyping.
10. No unsupported mnemonics, fake precision, obsolete legacy protocols or absolute claims where Canadian recommendations are conditional.

## CNPLE blueprint weighting used for prioritization

The production order intentionally overweights clinician work because the official blueprint allocates most exam content to the Clinician domain, especially Assessment and Management. The item style also prioritizes application and critical thinking over pure recall.

## Source hierarchy

1. Canadian Council of Registered Nurse Regulators (CCRNR) / CNPLE blueprint and national NP entry-level competencies
2. Federal Canadian guidance (PHAC, Health Canada, NACI) where nationally applicable
3. National Canadian specialty societies and guideline groups
4. Provincial/territorial regulators or health authorities when the content is jurisdiction-specific
5. High-quality international guidance only when no appropriate Canadian guidance exists, clearly marked

## Publication rule

Clinical authoring is separated from renderer/integration code. Do not silently rewrite clinical content to satisfy a UI extractor. If the serving contract changes, adapt the mapping layer or explicitly migrate these fields while preserving their meaning.
