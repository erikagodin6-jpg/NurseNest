# CNPLE Cram V2 — Parity Batch 39C Clinical Second Pass

Date: 2026-08-08  
Scope: `39c-respiratory-core-identity-parity.json`  
Result: **PASS — clinical authoring second pass**

## Exact identity set

- `np-asthma-diagnosis-and-stepwise-management`
- `np-copd-diagnosis-gold-staging-and-management`
- `np-interstitial-lung-disease-recognition-and-referral`
- `np-pulmonary-embolism-risk-stratification-and-treatment`
- `np-sleep-apnea-diagnosis-and-cpap-management`
- `np-pleural-effusion-differential-diagnosis-and-workup`
- `np-hemoptysis-evaluation-and-management`
- `np-chronic-cough-diagnostic-algorithm`
- `np-tuberculosis-screening-and-treatment`

All IDs are literal outputs of the canonical NP parity generator.

## Clinical audit

### Asthma / COPD
PASS. Stable diagnoses require objective spirometric/variability evidence when feasible. Asthma retains ICS-containing controller therapy and avoids LABA monotherapy. COPD treatment is symptom/exacerbation phenotype driven, with selective rather than automatic ICS use.

### ILD
PASS. Restrictive/fibrotic patterns trigger cause search and early specialist classification; autoimmune, exposure and medication causes are considered before idiopathic labeling. Current CTS infection-screening principles before immunosuppression are preserved.

### PE
PASS. Pretest probability precedes D-dimer/imaging. Hemodynamic/RV risk determines disposition/reperfusion urgency; thrombolysis is not routine for every PE. Anticoagulant choice reflects renal, pregnancy, cancer, interaction and bleeding context.

### OSA
PASS. Objective sleep testing is required rather than snoring alone. PAP management includes interface, pressure, nasal symptoms, adherence barriers and residual sleepiness. Hypoventilation and driving risk remain distinct safety issues.

### Pleural effusion / hemoptysis / chronic cough
PASS. Effusion is treated as a finding requiring etiologic classification; empyema requires source control. Hemoptysis severity is functional airway/hemodynamic threat rather than a memorized volume. Chronic cough uses a structured medication/airway/upper-airway/reflux/red-flag algorithm rather than repeated antibiotics.

### Tuberculosis
PASS. Canadian TB infection testing is targeted to meaningful risk and is not used to diagnose active TB disease in adults/adolescents >12. Suspected active pulmonary TB uses imaging plus respiratory molecular/culture testing, airborne/public-health action and drug-susceptibility assessment. Preventive treatment follows exclusion of active disease and current Canadian regimens/interactions.

## Current Canadian source anchors rechecked

- Canadian Thoracic Society current asthma, COPD, ILD, pulmonary vascular and sleep guidance.
- Thrombosis Canada pulmonary embolism clinical guides.
- Public Health Agency of Canada / Canadian Thoracic Society, Canadian Tuberculosis Standards 8th edition: diagnosis of infection, diagnosis of disease, treatment of disease and preventive treatment.

## Family completion note

With 39A, 39B and 39C, every concept listed under the canonical NP parity generator's Respiratory system now has a distinct Cram authoring identity. This is clinical-authoring coverage only; ordered manifest registration and private-core source/Quick-Check/runtime certification remain mandatory.
