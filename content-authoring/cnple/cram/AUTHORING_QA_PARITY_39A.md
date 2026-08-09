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

- Canadian Thoracic Society (CTS) Guideline Library: current 2021 asthma guidance, current 2023 stable-COPD pharmacotherapy guidance, current interstitial-lung-disease resources, and current home-mechanical-ventilation guidance.
- Cystic Fibrosis Canada: Canadian Guidelines for Cystic Fibrosis Care, Guidelines & Standards of Care, CFTR-modulator resources, and the Canadian pulmonary-exacerbation guideline for non-CF specialists.
- Pulmonary Hypertension Association of Canada: Canadian pulmonary-hypertension education/referral resources.
- For bronchiectasis and sarcoidosis, where a current disease-specific Canadian national CPG was not identified in the CTS public guideline library, the lesson remains principle-based and specialist-linked; international disease-specific guidance may support the framework but no Canadian-specific threshold or drug algorithm is invented.

The previous audit wording naming specific CTS bronchiectasis/pulmonary-vascular working groups was removed because those exact labels were not independently verified in the current public CTS directory. Clinical conclusions were not changed by this source-label correction.

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
