# CNPLE Cram V2 — Pediatrics Parity Batch 47C Clinical Second Pass

Date: 2026-08-09
Scope: `47c-pediatrics-adolescent-safety-specialty-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity set

- `np-adolescent-health-and-confidentiality`
- `np-pediatric-mental-health-screening`
- `np-child-abuse-recognition-and-reporting`
- `np-pediatric-toxicology-common-exposures`
- `np-pediatric-allergic-conditions`
- `np-pediatric-endocrine-disorders`
- `np-pediatric-neurologic-conditions`
- `np-pediatric-urgent-care-triage`

All are literal slugs emitted by the canonical NP parity generator.

## Clinical second-pass findings

**Adolescent confidentiality:** PASS. Routine private time, capable-adolescent participation, confidentiality limits, safety exceptions and province-specific legal variability are explicit. Portal/pharmacy access is treated as a real privacy risk.

**Mental-health screening:** PASS. Screening is not diagnosis. Function, developmental context and direct suicide/self-harm assessment determine safety. Psychosis, mania, severe eating-disorder instability and inability to maintain safety trigger urgent in-person assessment.

**Child maltreatment:** PASS. Reasonable concern—not proof—is sufficient to activate child-protection duties. The lesson prioritizes stabilization, objective documentation, avoidance of repeated leading interrogation, direct reporting to the proper child-welfare authority and safe disposition. A normal physical exam does not exclude sexual abuse.

**Toxicology:** PASS. Exposure substance, formulation, maximum possible dose, timing, route, weight and symptoms determine management. Poison-centre consultation is early; induced emesis and universal charcoal/antidote rules are rejected. Button batteries, multiple magnets, caustics and high-risk single-pill exposures remain urgent pathways.

**Allergy/anaphylaxis:** PASS. Sensitization is separated from clinical allergy. IM epinephrine is first-line for anaphylaxis and antihistamines do not substitute for airway/breathing/circulatory treatment.

**Endocrine:** PASS. Growth/puberty/glucose trajectories guide chronic evaluation; DKA, severe hypoglycemia, adrenal crisis and dangerous electrolyte disease are acute physiology problems. Type 1 diabetes retains basal-insulin continuity with individualized fasting/illness adjustment.

**Neurology:** PASS. Development, localization and tempo are central. Status epilepticus, CNS infection, raised ICP/shunt failure, acute focal deficit and progressive neuromuscular respiratory/bulbar weakness are explicit emergencies. Routine neuroimaging is not taught for every uncomplicated headache/simple febrile seizure.

**Urgent-care triage:** PASS. Pediatric ABCDE assessment uses age-adjusted physiology plus appearance, work of breathing, perfusion and hydration. Normal blood pressure does not exclude compensated pediatric shock. Medication calculations require kilograms and concentration verification.

## Canadian source refresh

Load-bearing source families rechecked on 2026-08-09:

- Canadian Paediatric Society adolescent privacy/confidentiality and comprehensive sexual-health assessment guidance.
- Canadian Paediatric Society mental-health resources and screening/rating-scale guidance.
- Canadian Paediatric Society Child and Youth Maltreatment resources, including the pre-pubertal sexual-abuse statement reaffirmed January 2026 and traumatic-head-injury maltreatment guidance.
- Canadian regional poison-centre and pediatric emergency-toxicology practice.
- Canadian Paediatric Society allergy/anaphylaxis, endocrine, neurology and acute-care resources; Diabetes Canada pediatric/type 1 diabetes guidance where relevant.

Provincial/territorial legal and reporting variability remains explicit; no U.S.-only adolescent-consent or mandatory-reporting rule is presented as Canada-wide law.

## Authoring gates

- Required Cram fields: PASS by editorial review.
- Canadian/SI framing: PASS.
- Confidentiality/safeguarding boundary: PASS.
- Anaphylaxis first-line treatment: PASS.
- Toxicology poison-centre/protocol boundary: PASS.
- Pediatric emergency escalation: PASS.
- Weight-based medication safety: PASS.

## Publication boundary

Clinical authoring only. Structural JSON/global-ID validation, exact current Full-source and Bottom Line anchors, exactly three eligible lesson-linked Quick Checks, shared runtime certification, authenticated learner rendering, merge and deployment remain downstream fail-closed gates.
