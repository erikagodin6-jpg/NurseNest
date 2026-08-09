# CNPLE Cram V2 — Parity Batch 40D Clinical Second Pass

Date: 2026-08-09
Scope: `40d-cardiovascular-diagnostics-devices-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract
- `np-syncope-differential-diagnosis-and-workup`
- `np-pericarditis-and-myocarditis-diagnosis`
- `np-hypertensive-urgency-versus-emergency-decision-making`
- `np-cardiac-biomarker-interpretation-in-acute-settings`
- `np-ecg-interpretation-for-advanced-practice`
- `np-device-therapy-indications-pacemakers-and-icds`

## Clinical review
- Syncope: PASS. Etiology/risk first; routine neuroimaging/EEG is not taught for uncomplicated syncope; exertion/ECG/structural disease and driving implications are explicit.
- Pericarditis/myocarditis: PASS. ACS and dangerous inflammatory complications remain in the differential; tamponade, ventricular dysfunction and arrhythmia drive escalation.
- Severe hypertension: PASS. Acute target-organ injury defines hypertensive emergency; asymptomatic severe BP is not rapidly normalized with IV therapy.
- Cardiac biomarkers: PASS. Troponin = myocardial injury, not automatically type-1 MI; BNP/NT-proBNP remain context-dependent; CK-MB is not preferred when contemporary troponin is available.
- ECG: PASS. Systematic interpretation, instability, wide-complex rhythms, high-grade block, ischemia and QT/inherited-arrhythmia risk are prioritized over automated text.
- Pacemaker/ICD: PASS. Pacemakers and ICDs have distinct indications; HFrEF primary-prevention device referral follows optimized medical therapy/LVEF reassessment and sudden-death risk assessment.

## Canadian source refresh
Rechecked 2026-08-09 against CCS Syncope CPU, CCS Fitness to Drive 2023/2024, CCS/CHRS AF/arrhythmia resources, CCS/CHFS HFrEF ICD/CRT guidance, Hypertension Canada 2025 and current Canadian cardiovascular acute-care practice.

## Publication boundary
Clinical authoring PASS only. Global parse/count/ID validation, exact-current-Full reconciliation, Full-source anchors, Bottom Line evidence, three eligible Quick Checks, runtime recipe certification, learner render QA, merge and deployment remain downstream fail-closed gates.
