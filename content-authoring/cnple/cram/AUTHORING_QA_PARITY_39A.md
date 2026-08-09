# CNPLE Cram V2 — Parity Batch 39A Clinical Second Pass

Date: 2026-08-09
Scope: `39a-respiratory-advanced-parity.json`
Result: **PASS — clinical authoring second pass**

## Identity contract

Each record uses the exact `ca-np-cnple` Full-lesson slug emitted by `generate-np-parity-expansion-catalog.mjs`:

- `np-bronchiectasis-diagnosis-and-management`
- `np-pulmonary-hypertension-recognition-and-referral`
- `np-sarcoidosis-diagnosis-and-management`
- `np-cystic-fibrosis-adult-management-basics`
- `np-mechanical-ventilation-basics-for-np`
- `np-asthma-copd-overlap-syndrome-management`

No conceptual alias is treated as canonical identity.

## Clinical review

### Bronchiectasis
PASS. The lesson separates structural bronchiectasis from COPD, treats exacerbation as a clinical syndrome rather than a culture result, requires airway clearance plus cause-directed/microbiology-informed care, and escalates major hemoptysis, hypoxemia and treatment failure.

### Pulmonary hypertension
PASS. The lesson treats pulmonary hypertension as a multi-group hemodynamic syndrome, preserves right-heart catheterization/specialty classification where definitive treatment decisions require it, and explicitly prevents empiric PAH-specific vasodilator therapy from an echocardiographic estimate alone.

### Sarcoidosis
PASS. Diagnosis requires a compatible multisystem pattern plus exclusion of important infection/malignancy mimics. Cardiac, neurologic, ocular, calcium and advanced pulmonary involvement are explicit red flags. Prolonged empiric immunosuppression is not taught before important infection has been considered.

### Adult cystic fibrosis
PASS. CF remains specialist-program disease. The lesson teaches pulmonary-exacerbation recognition, airway-clearance continuity, prior microbiology review, CFTR-modulator/interaction awareness, CFRD/liver/nutrition/mental-health complications and rapid CF-centre coordination. Routine CAP logic is not substituted for individualized CF care.

### Mechanical ventilation
PASS. The lesson separates oxygenation from ventilation, airway resistance from compliance, and patient deterioration from machine alarms. The required sequence is patient/airway assessment before setting changes. Weaning is physiologic rather than based on one normal blood gas.

### Asthma–COPD overlap
PASS. The lesson requires objective airflow assessment and a defensible asthma phenotype rather than labelling every smoker with obstruction as overlap. When asthma is genuinely present, ICS-containing therapy is preserved and LABA monotherapy is explicitly rejected.

## Canadian source refresh

Load-bearing sources rechecked on 2026-08-09:

- Canadian Thoracic Society Guideline Library and current assemblies/working groups, including Asthma, Home Mechanical Ventilation, Pulmonary Vascular Disease, Non-CF Bronchiectasis and Cystic Fibrosis.
- Canadian Thoracic Society current asthma guidance and current home mechanical ventilation guidance.
- Cystic Fibrosis Canada, national Guidelines & Standards of Care and Canadian Guidelines for Cystic Fibrosis Care.
- Cystic Fibrosis Canada guideline for diagnosis/treatment of pulmonary exacerbations for non-CF specialists.

Where a disease-specific current Canadian national CPG is not publicly available in the CTS library, the authored content remains principle-based and explicitly specialist-linked rather than inventing Canadian thresholds or drug algorithms.

## Authoring gates

- Required Cram fields: present in all six records by editorial review.
- Canadian/SI framing: PASS.
- US exam/regulatory framing: none intentionally authored.
- Product-specific or hemodynamic thresholds invented: none.
- Red flags and escalation: present in all six.
- Specialist-boundary clarity: PASS.
- `localPolicyCheck`: true for all six because referral access, specialized protocols and local implementation vary.

## Publication boundary

This PASS certifies clinical authoring only. It does not certify structural JSON validation, current Full-source anchoring, Bottom Line evidence, Quick Check eligibility, runtime recipe integrity, learner rendering, merge or deployment. Those remain fail-closed downstream gates.
