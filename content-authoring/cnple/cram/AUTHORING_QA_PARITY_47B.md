# CNPLE Cram V2 — Pediatrics Parity Batch 47B Clinical Second Pass

Date: 2026-08-09
Scope: `47b-pediatrics-infectious-organ-systems-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity set

- `np-pediatric-respiratory-infections`
- `np-pediatric-gastrointestinal-disorders`
- `np-pediatric-skin-conditions`
- `np-childhood-fever-evaluation`
- `np-pediatric-otitis-media-management`
- `np-pediatric-pharyngitis-evaluation`
- `np-childhood-exanthems-recognition`
- `np-pediatric-cardiac-murmurs-evaluation`
- `np-pediatric-orthopedic-conditions`

All are literal slugs emitted by the canonical NP parity generator.

## Clinical second-pass findings

**Respiratory infections:** PASS. Syndrome and severity precede antibiotics. Work of breathing, oxygenation, hydration and age determine urgency; routine imaging/antibiotics are not taught for uncomplicated viral disease.

**GI disorders:** PASS. Bilious emesis, peritonitis, shock, GI bleeding and growth failure are explicit disposition changers. Oral rehydration is used where appropriate; obstruction/surgical disease is not hidden under a gastroenteritis label.

**Skin:** PASS. Morphology plus systemic condition drive diagnosis. The June 2026 CPS community-associated bacterial skin/soft-tissue guidance is reflected; abscess, cellulitis, barrier disease and dangerous purpuric/blistering patterns are separated.

**Fever:** PASS. Well-appearing febrile infants ≤90 days use the Canadian age-stratified CPS pathway. Antipyretic response is not used to distinguish bacterial from viral illness. Ill appearance and organ dysfunction override the fever number.

**AOM:** PASS. Objective middle-ear effusion/inflammation is required; tympanic-membrane redness alone does not justify antibiotics. Observation versus treatment remains age/severity/diagnostic-certainty dependent.

**Pharyngitis:** PASS. Viral features reduce GAS testing value. Testing and treatment are probability-driven; throat appearance alone does not justify antibiotics. Deep neck/airway red flags are explicit.

**Exanthems:** PASS. Benign viral patterns are separated from measles/public-health disease, meningococcemia, Kawasaki/MIS-C and severe drug reactions. Toxic/purpuric children are not labelled routine viral exanthem.

**Cardiac murmurs:** PASS. Murmur characteristics are integrated with oxygenation, pulses, growth and symptoms. Clearly innocent murmurs are not over-investigated; cyanosis, heart failure and exertional syncope are escalated.

**Orthopedics:** PASS. Developmental variation is separated from septic arthritis/osteomyelitis, fracture, SCFE, malignancy and neurovascular compromise. Febrile refusal to bear weight is treated as an urgent diagnostic problem.

## Canadian source refresh

Load-bearing sources rechecked on 2026-08-09:

- Canadian Paediatric Society: acute otitis media (reaffirmed 2024), GAS pharyngitis, well-appearing febrile infants ≤90 days, osteoarticular infection guidance and current infectious-disease resources.
- Canadian Paediatric Society June 2026 community-associated bacterial skin/soft-tissue infection statement.
- Canadian Paediatric Society 2026 Kawasaki disease guidance and PHAC communicable-disease resources.
- Choosing Wisely Canada pediatric diagnostic/antimicrobial stewardship principles.

## Gates

- Required Cram fields: PASS by editorial review.
- Canadian/SI framing: PASS.
- Antibiotic stewardship: PASS.
- Screening versus diagnostic escalation: PASS.
- Age-specific infant pathways preserved: PASS.
- Red flags/disposition: PASS in all nine.

## Publication boundary

Clinical authoring only. Structural JSON/global-ID validation, current Full-source and Bottom Line anchors, exactly three eligible Quick Checks, shared runtime certification, learner render QA, merge and deployment remain downstream fail-closed gates.
