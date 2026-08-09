# CNPLE Cram V2 — Parity Batch 40A Clinical Second Pass

Date: 2026-08-09
Scope: `40a-cardiovascular-advanced-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

The eight records use the literal slugs produced by the canonical NP parity generator:

- `np-palpitations-evaluation-and-management`
- `np-cardiomyopathy-classification-and-management`
- `np-mitral-valve-prolapse-evaluation-and-counseling`
- `np-stress-test-selection-and-result-interpretation`
- `np-echocardiogram-findings-and-clinical-correlation`
- `np-cardiac-ct-and-mri-indications-in-outpatient-practice`
- `np-post-mi-secondary-prevention-and-rehabilitation`
- `np-endocarditis-prophylaxis-guidelines-and-risk-stratification`

## Clinical review

### Palpitations
PASS. Rhythm correlation precedes antiarrhythmic/rate-control therapy; physiologic sinus tachycardia and high-risk syncope/wide-complex presentations are separated.

### Cardiomyopathy
PASS. The lesson is phenotype-first and includes inherited disease/family screening, heart-failure and ventricular-arrhythmia risk, pregnancy context and sudden-death stratification without treating all phenotypes as one disease.

### Mitral valve prolapse
PASS. Significant MR/chamber consequences/arrhythmia determine risk. Uncomplicated MVP is not presented as an automatic indication for antibiotic prophylaxis or major activity restriction.

### Stress testing
PASS. Testing is restricted to stable patients where modality/result can change management. Baseline ECG interpretability and exercise capacity guide modality; suspected ACS remains an acute-care pathway.

### Echocardiography
PASS. EF, wall motion, valves, RV, pulmonary-pressure probability and pericardium are interpreted as physiology. Preserved EF is not equated with a normal heart and effusion is not equated with tamponade.

### Cardiac CT/MRI
PASS. CT is primarily anatomy/coronary-question oriented and MRI tissue/phenotype oriented. Device/contrast/pregnancy/renal considerations are explicit and unstable disease is not routed to outpatient advanced imaging.

### Post-MI secondary prevention/rehabilitation
PASS. Active secondary prevention, medication reconciliation, LV-risk review, smoking/lipid/BP/diabetes care, cardiac rehabilitation and transition ownership are all present.

### Endocarditis prophylaxis
PASS. Prophylaxis is deliberately narrow: highest-risk cardiac condition + qualifying procedure + current regimen. Routine MVP/murmur/native valve disease and coronary stents are not incorrectly treated as automatic prophylaxis indications.

## Canadian source refresh

Load-bearing sources rechecked 2026-08-09:

- Canadian Cardiovascular Society current Guidelines & KT Tools / Guideline and Clinical Practice Update Library.
- CCS Drive & Fly 2023 inherited-arrhythmia/cardiomyopathy risk framework.
- CCS Secondary Prevention Pathway.
- Heart & Stroke Foundation of Canada cardiac rehabilitation and post-heart-attack recovery resources.
- Canadian cardiovascular imaging/echocardiography and infective-endocarditis prophylaxis practice resources.

## Authoring gates

- Required Cram fields: PASS by editorial review; structural parser still required.
- Canadian scope/framing: PASS.
- US exam/regulatory framing intentionally authored: none.
- Unstable disease incorrectly routed to elective testing: none.
- Universal imaging/prophylaxis/arrhythmia treatment rule invented: none.
- Red flags/escalation/follow-up: present in all eight.

## Publication boundary

This certifies clinical authoring only. Manifest parse/count/unique-ID validation, current Full-lesson identity reconciliation, source anchors, Bottom Line evidence, exactly three eligible Quick Checks, runtime recipe certification, learner render QA, merge and deployment remain separate fail-closed gates.
