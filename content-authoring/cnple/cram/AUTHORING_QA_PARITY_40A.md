# CNPLE Cram V2 — Parity Batch 40A Clinical Second Pass

Date: 2026-08-09
Scope: `40a-cardio-diagnostics-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-palpitations-evaluation-and-management`
- `np-cardiomyopathy-classification-and-management`
- `np-aortic-stenosis-severity-assessment-and-timing-of-intervention`
- `np-mitral-valve-prolapse-evaluation-and-counseling`
- `np-ecg-interpretation-for-advanced-practice`
- `np-stress-test-selection-and-result-interpretation`
- `np-echocardiogram-findings-and-clinical-correlation`
- `np-cardiac-ct-and-mri-indications-in-outpatient-practice`

All eight are literal slugs emitted by the canonical NP parity generator.

## Clinical review

### Palpitations
PASS. Rhythm diagnosis is not inferred from sensation alone; ambulatory monitoring is matched to symptom frequency and syncope/exertional/structural risk escalates care.

### Cardiomyopathy
PASS. Phenotype and cause come before treatment. Ischemic, valvular, toxic and inherited disease are separated; family/genetic and sudden-death risk are explicit.

### Aortic stenosis
PASS. Severity is integrated with symptoms, LV response and low-flow discordance. Symptomatic severe disease triggers structural-heart referral rather than repeated symptom-medication escalation.

### Mitral valve prolapse
PASS. Risk follows MR severity, chamber response and arrhythmia rather than the click/label itself. Routine endocarditis prophylaxis is explicitly rejected for uncomplicated MVP.

### Advanced ECG
PASS. Systematic rate/rhythm/conduction/axis/ST-T interpretation is required; automated interpretation is not accepted as the final diagnosis. Dynamic ischemia, high-grade block, VT and QT-related syncope are explicit red flags.

### Stress testing
PASS. Test selection is based on clinical question, pretest probability, exercise capacity and baseline ECG. Active suspected ACS is not routed to outpatient stress testing.

### Echocardiography
PASS. EF is not equated with the entire cardiac diagnosis. Valve severity, RV disease, diastolic/hemodynamic findings and loading/rhythm context are preserved.

### Cardiac CT/MRI
PASS. Advanced imaging requires a specific management-changing question. CCTA, CMR and calcium scoring are not treated as interchangeable or as generic screening tests.

## Canadian source refresh

Load-bearing sources rechecked on 2026-08-09:

- Canadian Cardiovascular Society current valvular heart disease resources.
- CCS/CHFS HFrEF guideline and device-referral recommendations.
- CCS Secondary Prevention Pathway and CCS imaging/arrhythmia resources.
- Canadian echocardiography, cardiac CT/CMR and heart-rhythm practice standards.

## Authoring gates

- Required Cram fields: present in all eight records.
- Canadian/SI framing: PASS.
- US-only exam/regulatory framing: none intentionally authored.
- Universal valve/imaging/device thresholds invented outside supported Canadian guidance: none.
- Red flags/escalation: present in all eight.
- Specialist-boundary clarity: PASS.

## Publication boundary

This PASS certifies clinical authoring only. Structural parsing, exact current Full-source anchors, Bottom Line evidence, three eligible Quick Checks, runtime recipe integrity, learner rendering, merge and deployment remain downstream fail-closed gates.
