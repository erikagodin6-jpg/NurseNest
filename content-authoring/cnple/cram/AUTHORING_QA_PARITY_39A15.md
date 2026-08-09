# CNPLE Cram V2 — Respiratory 15-Lesson Tranche Clinical Second Pass

Date: 2026-08-09
Scope: `39a-respiratory-parity.json`
Result: **PASS — clinical authoring second pass**

## Batch contract

Exactly 15 records were authored and reviewed in this tranche. Their IDs are the literal slugs produced by the canonical NP parity generator:

1. `np-asthma-diagnosis-and-stepwise-management`
2. `np-copd-diagnosis-gold-staging-and-management`
3. `np-pneumonia-cap-versus-hap-diagnosis-and-treatment`
4. `np-pulmonary-nodule-evaluation-and-follow-up`
5. `np-interstitial-lung-disease-recognition-and-referral`
6. `np-pulmonary-embolism-risk-stratification-and-treatment`
7. `np-sleep-apnea-diagnosis-and-cpap-management`
8. `np-pleural-effusion-differential-diagnosis-and-workup`
9. `np-hemoptysis-evaluation-and-management`
10. `np-chronic-cough-diagnostic-algorithm`
11. `np-tuberculosis-screening-and-treatment`
12. `np-bronchiectasis-diagnosis-and-management`
13. `np-pulmonary-function-test-interpretation`
14. `np-oxygen-therapy-indications-and-prescribing`
15. `np-lung-cancer-screening-criteria-and-follow-up`

This QA record is deliberately separate from the existing `AUTHORING_QA_PARITY_39A.md`, which covers a different six-lesson advanced-respiratory tranche already present on the branch.

## Current Canadian source refresh

Load-bearing sources rechecked on 2026-08-09:

- Canadian Thoracic Society current Guideline Library, including current asthma resources, the 2023 stable-COPD pharmacotherapy guideline, the 2025 alpha-1 antitrypsin deficiency guideline, fibrotic-ILD evaluation/monitoring statements, the 2026 infection-screening-before-ILD-immunosuppression statement, pulmonary-function-testing guidance, and home mechanical-ventilation guidance.
- Public Health Agency of Canada / Canadian Thoracic Society / AMMI Canada: Canadian Tuberculosis Standards, 8th edition. TST/IGRA identify TB infection and are not adult active-TB diagnostic tests; suspected disease requires imaging/microbiology; positive AFB/NAAT/culture results are critical values; active TB is reportable; NAAT is not used to monitor treatment response or contagiousness once therapy has begun.
- Choosing Wisely Canada Using Antibiotics Wisely: ambulatory pneumonia should not be diagnosed from crackles alone when chest imaging is readily available; stable patients with normal vitals and a normal respiratory examination are unlikely to have pneumonia.
- Thrombosis Canada: PE investigation is driven by hemodynamic stability and pretest probability; D-dimer is a rule-out tool in appropriate probability settings, not diagnostic proof.
- Canadian Cancer Society and provincial lung-screening programs: lung-cancer screening is low-dose CT for eligible **asymptomatic** high-risk people; symptoms require diagnostic evaluation and program eligibility varies by jurisdiction.

## Clinical audit

### Asthma
PASS. Objective confirmation of variable expiratory airflow limitation is required when feasible. Controller escalation follows reassessment of diagnosis, adherence, inhaler technique and exposures. Acute severe asthma is separated from routine step-up care.

### COPD
PASS. Diagnosis requires spirometric confirmation. Symptoms/exacerbations guide treatment intensity; inhaled corticosteroids are not universal therapy. Acute deterioration requires consideration of pneumonia, PE, pneumothorax and heart failure.

### Pneumonia
PASS. CAP and HAP are separated. Severity, healthcare exposure/resistance risk, objective evidence and stewardship determine therapy. Crackles alone are not proof of bacterial pneumonia.

### Pulmonary nodule
PASS. Previous imaging, growth, morphology and patient risk drive surveillance versus diagnostic evaluation. Follow-up ownership is explicit.

### ILD
PASS. Progressive restrictive symptoms trigger HRCT/PFT/exposure/autoimmune evaluation and early specialist referral. Immunosuppression is not started without appropriate infection-risk assessment.

### Pulmonary embolism
PASS. Probability chooses testing and hemodynamics choose urgency. A positive D-dimer does not diagnose PE. Anticoagulant choice incorporates pregnancy, renal function, cancer and bleeding risk.

### Sleep apnea
PASS. Screening questionnaires estimate risk but do not diagnose OSA. Sleep testing confirms disease; dangerous daytime sleepiness/driving risk is treated as a safety issue.

### Pleural effusion
PASS. Systemic transudative disease is separated from exudative infection/malignancy/PE/TB. Empyema requires drainage/source control, not antibiotics alone.

### Hemoptysis
PASS. Life-threatening bleeding is defined by airway, oxygenation and hemodynamic threat rather than a fabricated universal volume threshold. Cancer, TB, PE and anticoagulant causes are retained.

### Chronic cough
PASS. Medication/exposure causes, chest imaging, spirometry and red flags precede repetitive empiric antibiotics/PPI/suppressant cycles.

### Tuberculosis
PASS. TB infection and disease are separated correctly. TST/IGRA and NAAT limitations, public-health reporting, susceptibility testing and culturally safe Canadian care are explicit.

### Bronchiectasis
PASS. CT confirmation, airway clearance, sputum microbiology and treatable-cause workup are core. Repeated blind antibiotic cycling is rejected.

### Pulmonary function tests
PASS. Interpretation sequence is quality → obstruction → bronchodilator response → restriction → diffusion → clinical context. Physiologic patterns are not mislabeled as diseases.

### Oxygen therapy
PASS. Oxygen is treated as a drug with an indication and target. Patients at risk of hypercapnic respiratory failure receive controlled oxygen plus ventilatory assessment rather than indiscriminate high-flow therapy.

### Lung-cancer screening
PASS. Screening is explicitly asymptomatic and LDCT-based. Hemoptysis, persistent concerning cough or other cancer symptoms switch the patient to a diagnostic pathway.

## Cross-batch safety gates

- Required Cram fields editorially present in all 15 records: PASS.
- Canadian-first clinical framing: PASS.
- US-only exam/regulatory framing intentionally authored: none.
- Non-SI glucose/temperature teaching introduced: none.
- Screening substituted for diagnostic evaluation: none.
- Universal product/assay/provincial thresholds invented: none.
- Red flags and disposition/escalation present in every lesson: PASS.
- `localPolicyCheck` used where provincial programs, antimicrobial pathways, procedure rules or referral access vary.

## Publication boundary

Clinical authoring only. These 15 records are not learner-visible and are not runtime-certified parity until the ordered V2 manifest lineage includes them, private-core confirms exact current Full identities, every Cram point and Bottom Line is source-anchored, exactly three lesson-related gradeable Quick Checks are proven, the shared integrity contract passes, and learner Full/Cram rendering is verified.
