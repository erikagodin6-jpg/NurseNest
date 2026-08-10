# CNPLE Cram V2 — Complete Pediatrics Generator Clinical Second Pass

Date: 2026-08-10
Scope: `49a-pediatrics-parity.json` + `49b-pediatrics-parity.json`
Canonical generator denominator: **26/26 exact identities**
Result: **PASS — clinical authoring second pass**

## Identity

All records use literal `np-${slugify(concept)}` identities from the canonical NP parity generator. No title alias or fuzzy identity is treated as canonical.

## Clinical gates

- Preventive care uses longitudinal growth/development and family context rather than one-visit normality.
- Immunization uses current NACI/Canadian Immunization Guide plus provincial/territorial implementation; delayed series are generally continued, not restarted.
- Newborn assessment is age-in-hours/gestational/trajectory specific and preserves jaundice, hypoglycemia, sepsis and critical congenital-heart-disease risk.
- Feeding/nutrition counselling is safe, nonjudgmental and growth/hydration based.
- Developmental/autism screening is risk identification, not a stand-alone diagnosis; regression triggers escalation.
- ADHD requires cross-setting impairment and assessment for sleep/learning/mood/trauma mimics.
- Pediatric asthma uses age-appropriate objective confirmation when feasible and ICS-containing prevention rather than rescue-only care.
- Respiratory/GI/skin/fever lessons use pediatric physiology, hydration and work-of-breathing severity rather than adult thresholds.
- AOM requires true middle-ear inflammation/effusion; OME or a red TM alone does not justify antibiotics.
- GAS pharyngitis uses pretest probability plus microbiologic confirmation in usual low-ARF-risk settings; deep-neck/airway disease is escalated.
- Exanthems are assessed by rash pattern plus child wellness; nonblanching purpura, mucosal blistering and measles/public-health risk are explicit.
- Murmurs integrate pulses, oxygenation, growth and symptoms; innocent murmurs do not trigger blanket echo/prophylaxis.
- Orthopedic care is age/gait/growth-plate aware; septic joint and SCFE patterns are protected.
- Adolescent confidentiality is capacity-, safety- and law-aware with routine private time and clearly explained limits.
- Mental-health screening does not replace suicide/bipolarity/functional assessment.
- Child maltreatment requires stabilization, objective documentation and jurisdictional reporting on reasonable concern; repeated forensic interviewing is avoided.
- Toxicology uses product, maximum dose/kg, time and poison-centre guidance; induced vomiting/generic decontamination is rejected.
- Anaphylaxis uses IM epinephrine first; broad sensitization panels do not define clinical allergy.
- Pediatric endocrine/neurologic lessons use development/trajectory and age-specific physiology.
- Urgent-care triage prioritizes appearance, breathing, circulation, hydration and age before the diagnostic label.

## Current Canadian source refresh

Rechecked on 2026-08-10:

- Canadian Immunization Guide and NACI 2026 statements, including current infant/child RSV and meningococcal updates.
- Canadian Paediatric Society position/practice resources, including febrile young infants, acute asthma, bronchiolitis/croup, acute otitis media (reaffirmed 2024), GAS pharyngitis, oral rehydration, and Child and Youth Maltreatment resources.
- CPS pre-pubertal child sexual-abuse medical-evaluation statement, reaffirmed January 2026.
- CADDRA Canadian ADHD Practice Guidelines and Canadian child/adolescent mental-health practice resources.

## Publication boundary

This certifies **clinical authoring only**. The family is not learner-publishable until global JSON/field/ID validation, current canonical Full-lesson reconciliation, point-level Full-source anchors, independent Bottom Line evidence, exactly three lesson-linked gradeable Quick Checks, shared Cram runtime certification and authenticated learner render QA all pass.
