# CNPLE Cram V2 — Cardiovascular Parity Batch 40C Clinical Second Pass

Date: 2026-08-10
Scope: `40c-cardiovascular-rhythm-prevention-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact Full identities
- `np-mitral-valve-prolapse-evaluation-and-counseling`
- `np-hypertensive-urgency-versus-emergency-decision-making`
- `np-cardiac-biomarker-interpretation-in-acute-settings`
- `np-ecg-interpretation-for-advanced-practice`
- `np-cardiovascular-disease-prevention-strategies`
- `np-heart-failure-medication-titration-and-monitoring`
- `np-device-therapy-indications-pacemakers-and-icds`
- `np-endocarditis-prophylaxis-guidelines-and-risk-stratification`

## Clinical review
- **Mitral valve prolapse:** prolapse is separated from clinically important mitral regurgitation and arrhythmic risk; routine endocarditis prophylaxis/activity restriction is rejected for low-risk isolated MVP.
- **Severe hypertension:** acute target-organ injury defines hypertensive emergency. Asymptomatic severe BP is not rapidly normalized with IV medication, and pregnancy/postpartum pathways remain distinct.
- **Cardiac biomarkers:** troponin is myocardial injury rather than automatic type-1 MI; BNP/NT-proBNP are wall-stress adjuncts rather than stand-alone HF diagnoses. Serial change, ECG, physiology and competing causes are required.
- **Advanced ECG:** rate/rhythm/conduction/QRS/ST-T interpretation is tied to patient stability; machine interpretation and sinus-tachycardia misclassification are explicitly guarded against.
- **Cardiovascular prevention:** primary and secondary prevention are separated; global risk/high-risk conditions guide therapy, and low-value asymptomatic CAD testing is not substituted for risk-factor treatment.
- **HF medication titration:** HFrEF foundational classes are introduced in parallel as tolerated rather than one-at-a-time maximization; renal function, potassium, BP, volume and heart rate are explicit monitoring domains. HFnrEF is not treated as a copy of HFrEF.
- **Pacemaker/ICD/CRT:** pacing, sudden-death prevention and resynchronization indications are separated; reversible causes and guideline timing precede permanent device decisions.
- **Endocarditis prophylaxis:** prophylaxis is restricted to highest-risk cardiac conditions and qualifying procedures; suspected active endocarditis requires cultures/diagnostic care rather than prophylaxis.

## Current Canadian source basis
Rechecked against current Canadian Cardiovascular Society/CHRS rhythm/device and heart-failure resources, the CCS Secondary Prevention Pathway, Hypertension Canada current primary-care guidance, and current Canadian structural-heart/endocarditis-prevention practice.

## Safety gates
- No US-only exam/regulatory framing intentionally authored.
- No universal assay, device, BP-reduction, antithrombotic or medication-titration threshold invented where syndrome/product/local protocol matters.
- ACS, malignant arrhythmia, high-grade block, shock, acute HF, pregnancy-related severe hypertension and suspected active endocarditis remain explicit escalation pathways.

## Publication boundary
Clinical authoring only. Manifest registration, structural JSON/required-field validation, exact-current-Full reconciliation, point-level Full-source anchors, Bottom Line evidence, exactly three eligible Quick Checks, runtime certification, learner render QA, merge and deployment remain separate fail-closed gates.
