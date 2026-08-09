# CNPLE Cram V2 — Primary Care Parity Batch 42 Clinical Second Pass

Date: 2026-08-09
Scope: `42a-primary-care-prevention-parity.json` through `42d-primary-care-documentation-practice-parity.json`
Result: **PASS — Canadian primary-care clinical second pass**

## Coverage

All 26 canonical concepts emitted by the NP parity generator's Primary Care system are represented by exact Full-lesson IDs:

- comprehensive preventive care / health-maintenance structure / age-and-risk screening / immunization;
- lifestyle, nutrition, exercise and obesity/weight-management strategies;
- tobacco cessation, alcohol brief intervention, substance-use screening and sexual-health counselling;
- travel medicine, occupational health, disability and workers' compensation;
- school/sports assessments, chronic-disease management, referral/care coordination;
- population health, QI, patient-centred primary-care home and team-based models;
- virtual care, documentation/coding and practice-management fundamentals.

## Canadian/current corrections

### Prevention and screening
PASS. Symptoms are separated from screening, high-risk pathways from average-risk pathways, and national evidence from provincial/territorial implementation. PHAC's National Advisory Committee on Preventive Health Services (launched June 2026) is the current national preventive-guideline architecture.

### Immunization
PASS. The lesson requires current NACI statements + Canadian Immunization Guide + provincial/territorial program. It explicitly prevents memorized stale schedules from overriding 2026 guidance and recognizes that some CIG chapters can lag newly issued NACI statements.

### Nutrition / weight / exercise
PASS. Canada's Food Guide provides general healthy-eating framing; disease-specific nutrition remains individualized. Obesity is treated as chronic disease using current Obesity Canada guidance, not as a motivation problem or BMI-only diagnosis. Exercise is individualized and red-flag driven rather than requiring indiscriminate pre-exercise testing.

### Tobacco / alcohol / substance use
PASS. Tobacco dependence receives behavioural + pharmacologic treatment rather than advice alone. Canada's Guidance on Alcohol and Health is used as risk communication, not an AUD diagnosis. Screening is linked to harm-reduction/treatment capacity; toxicology is not substituted for clinical SUD assessment.

### Sexual health / travel medicine
PASS. Sexual health follows anatomy/exposure, not identity assumptions. STI/HIV prevention is PHAC based. Travel care uses CATMAT/PHAC itinerary- and traveller-specific risk and integrates routine immunization; a returned traveller with malaria-compatible fever is an urgent diagnostic problem.

### Occupational / disability / compensation
PASS. Work exposure/function is documented clinically. Disability eligibility and workers' compensation are program/jurisdiction specific; clinicians document evidence and functional restrictions without pretending to be the final legal adjudicator. Workers' compensation is explicitly provincial/territorial rather than a fictitious Canada-wide rule.

### Team, coordination and chronic care
PASS. Primary care is framed as longitudinal and coordinated. A referral is not complete until receipt/acceptance/follow-up ownership is clear. Team-based care distributes expertise but not invisible accountability.

### Virtual care
PASS. CAN/HSO 83001:2025 principles are reflected: same clinical standard as in-person care, modality limitations, privacy, identity/location, emergency contingency, equity/digital access, integrated records and conversion to in-person care when needed.

### Documentation / practice systems
PASS. Documentation captures clinical truth and reasoning before administrative codes. No US CPT/insurance assumption is imported. Practice management includes clinical safety systems—results, triage, refill/medication processes, privacy, downtime and equity—not business efficiency alone.

## Current Canadian anchors rechecked

- PHAC National Advisory Committee on Preventive Health Services, launched June 10, 2026.
- Canadian Immunization Guide / NACI statements and 2026 CIG update table.
- Canada's Food Guide.
- Obesity Canada Adult Clinical Practice Guideline including 2025 pharmacotherapy update.
- Canada's Guidance on Alcohol and Health / Health Canada substance-use resources.
- PHAC CATMAT travel-health resources.
- Health Canada primary-care framework.
- CAN/HSO 83001:2025 Virtual Care.

## Publication boundary

Clinical second-pass authoring only. Manifest registration remains ordered behind predecessor parity branches. Private-core must still validate exact current Full identity, JSON/required fields, point-level Full-source anchors and Bottom Line evidence, exactly three eligible lesson-linked Quick Checks, shared Cram integrity certification and authenticated learner rendering before publication.
