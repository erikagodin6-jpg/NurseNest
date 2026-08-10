# CNPLE Cram V2 — Parity Batch 39C Clinical Second Pass

Date: 2026-08-09
Scope: `39c-respiratory-diagnostics-screening-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-pulmonary-nodule-evaluation-and-follow-up`
- `np-interstitial-lung-disease-recognition-and-referral`
- `np-sleep-apnea-diagnosis-and-cpap-management`
- `np-pleural-effusion-differential-diagnosis-and-workup`
- `np-hemoptysis-evaluation-and-management`
- `np-chronic-cough-diagnostic-algorithm`
- `np-tuberculosis-screening-and-treatment`
- `np-lung-cancer-screening-criteria-and-follow-up`

All IDs are literal slugs emitted by the canonical NP parity generator. PFT and oxygen are intentionally excluded because they already belong to audited 39B.

## Clinical review

### Pulmonary nodule
PASS. Risk, morphology, growth, symptoms and explicit follow-up ownership drive the pathway. Symptomatic disease is not treated as screening.

### ILD
PASS. Exposure/medication/autoimmune causes, HRCT/PFT pattern recognition, infection screening before immunosuppression and early specialty referral are explicit.

### OSA / CPAP
PASS. Screening tools estimate probability but do not diagnose OSA. PAP follow-up includes usability, objective adherence, residual symptoms and driving risk.

### Pleural effusion
PASS. Predictable transudative effusion is separated from unilateral/recurrent/febrile or malignant/infectious patterns. Empyema retains antibiotic plus drainage/source-control urgency.

### Hemoptysis
PASS. Airway/oxygenation/hemodynamic stability precedes etiologic workup. Anticoagulation is a modifier, not a diagnosis.

### Chronic cough
PASS. Medication, upper-airway, asthma/eosinophilic, reflux/aspiration, exposure/TB/malignancy pathways are covered; repeated antibiotics without a bacterial syndrome are rejected.

### Tuberculosis
PASS. TB infection testing is separated from active disease. Active disease is excluded before preventive treatment, and suspected infectious pulmonary TB triggers isolation/public-health/microbiologic action.

### Lung cancer screening
PASS. Organized screening is limited to asymptomatic high-risk patients. Symptoms trigger diagnostic pathways. Provincial/territorial eligibility variability is preserved rather than hard-coding one Canada-wide criterion.

## Canadian source refresh

Load-bearing sources rechecked on 2026-08-09:

- Canadian Thoracic Society current Guideline Library and ILD/sleep/chest-procedure resources.
- Public Health Agency of Canada / Canadian Thoracic Society, **Canadian Tuberculosis Standards, 8th edition**, including diagnosis, preventive treatment and transmission-control chapters.
- Cancer Care Ontario, **Ontario Lung Screening Program** and current healthcare-provider referral/eligibility resources.
- Current Canadian respiratory practice principles for pulmonary nodules, pleural disease, hemoptysis and chronic cough.

## Authoring gates

- Required Cram fields: present in all eight records.
- Canadian/SI framing: PASS.
- Screening vs diagnosis separation: PASS.
- Public-health/specialty boundaries: PASS.
- Universal program/assay thresholds invented: none.
- Red flags/escalation: present in all eight.
- `localPolicyCheck`: true for all eight where program/procedure/referral implementation can vary.

## Publication boundary

Clinical authoring second pass only. Structural JSON/required-field validation, exact current Full-source anchoring, Bottom Line evidence, three eligible Quick Checks, runtime recipe integrity, learner rendering, merge and deployment remain downstream fail-closed gates.
