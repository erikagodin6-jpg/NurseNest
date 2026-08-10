# CNPLE Cram V2 — Cardiovascular Parity Batch 40D Clinical Second Pass

Date: 2026-08-10
Scope: `40d-cardiovascular-core-exact-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact Full identities
- `np-hypertension-diagnosis-and-guideline-based-management`
- `np-heart-failure-with-reduced-and-preserved-ejection-fraction`
- `np-atrial-fibrillation-rate-versus-rhythm-control-decisions`
- `np-acute-coronary-syndrome-recognition-and-initial-management`
- `np-deep-vein-thrombosis-and-pulmonary-embolism-management`
- `np-hyperlipidemia-statin-selection-and-monitoring`
- `np-syncope-differential-diagnosis-and-workup`
- `np-pericarditis-and-myocarditis-diagnosis`

Together with 40A–40C, these provide exact clinical-authoring companions for all 28 concepts in the canonical Cardiovascular NP parity generator.

## Clinical review
- **Hypertension:** current 2025 Hypertension Canada standardized measurement, out-of-office confirmation, ≥130/80 definition, risk-based medication initiation and tolerated SBP <130 target are preserved. Hypertensive emergency remains organ-injury based.
- **HF across EF:** HFrEF foundational classes and 2025 HFnrEF framework are separated; EF does not determine whether the HF syndrome exists.
- **AF:** electrocardiographic confirmation, hemodynamic stability, stroke prevention and rate/rhythm strategy remain independent decisions. Successful rhythm restoration does not erase anticoagulation-risk assessment.
- **ACS:** ECG plus serial high-sensitivity troponin and clinical evolution are required; one normal early test does not rule out disease and lethal alternatives remain explicit.
- **DVT/PE:** probability precedes D-dimer/imaging; anticoagulant choice and duration reflect anatomy, physiology, provoking factors, recurrence risk and bleeding context.
- **Dyslipidemia/statins:** treatment is vascular-risk based; secondary prevention is not reduced to the LDL number and routine CK monitoring in asymptomatic patients is avoided.
- **Syncope:** history + ECG + risk stratification precede selective testing; routine CT head/EEG for uncomplicated syncope is rejected.
- **Pericarditis/myocarditis:** inflammatory syndromes are separated from ACS while preserving tamponade, arrhythmia, HF and shock escalation.

## Current Canadian source refresh
Rechecked 2026-08-10 against Hypertension Canada 2025 Primary Care Guideline, CCS/CHFS 2021 HFrEF and 2025 HFnrEF guidance, CCS/CHRS 2020 AF guidance, current CCS ACS/secondary-prevention/dyslipidemia resources, and Thrombosis Canada PE/VTE guidance including the May 2025 PE treatment version.

## Safety gates
- No US-only exam/regulatory framing intentionally authored.
- No universal assay, anticoagulation-duration, reperfusion, BP-emergency, statin-monitoring or inflammatory-cardiac threshold invented where context matters.
- Pregnancy, renal function, bleeding risk, hemodynamic instability and specialist ownership are retained where clinically material.

## Publication boundary
Clinical authoring only. Manifest registration, JSON/schema validation, exact-current-Full reconciliation, point-level Full-source anchors, Bottom Line evidence, exactly three eligible Quick Checks, runtime certification, learner render QA, merge and deployment remain separate fail-closed gates.
