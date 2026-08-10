# CNPLE Cram V2 — Parity Batch 40C Clinical Second Pass

Date: 2026-08-10
Scope: `40c-cardiovascular-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact Full identities
- `np-hypertension-diagnosis-and-guideline-based-management`
- `np-echocardiogram-findings-and-clinical-correlation`
- `np-cardiac-ct-and-mri-indications-in-outpatient-practice`
- `np-cardiovascular-disease-prevention-strategies`
- `np-post-mi-secondary-prevention-and-rehabilitation`
- `np-heart-failure-medication-titration-and-monitoring`
- `np-device-therapy-indications-pacemakers-and-icds`
- `np-endocarditis-prophylaxis-guidelines-and-risk-stratification`

Together with 40A–40B, these close all 28 Cardiovascular concepts emitted by the canonical NP parity generator at the clinical-authoring layer.

## High-change Canadian checks

### Hypertension
PASS against Hypertension Canada 2025 Primary Care Guideline: adult hypertension is defined at BP >=130/80 mm Hg under optimal validated measurement; out-of-office confirmation is recommended; medication initiation is recommended at >=140/90 or SBP 130–139 with high cardiovascular risk; treatment target is SBP <130 mm Hg when tolerated.

### Infective endocarditis dental prophylaxis
PASS against Canadian Dental Association position statement revised February 2024. Prophylaxis is limited to highest-risk groups (prosthetic cardiac valve/prosthetic valve-repair material, prior IE, cardiac transplant with valvular disease, specified serious congenital heart disease situations). Routine prophylaxis is not required solely for MVP, rheumatic heart disease, bicuspid valve disease, calcified AS, routine ASD/VSD or hypertrophic cardiomyopathy.

## Remaining clinical review
PASS for echo interpretation, cardiac CT/CMR indication discipline, total-risk cardiovascular prevention, CCS Secondary Prevention Pathway post-MI care, HFrEF/HFnrEF medication titration, and pacemaker-versus-ICD indication boundaries. Device criteria remain principle-based where exact EF/timing thresholds require current cardiology guideline adjudication.

## Publication boundary
Clinical authoring only. Manifest registration, structural validation, exact current Full identity, Full-source anchors, Bottom Line evidence, exactly three eligible Quick Checks, runtime recipe certification, learner render QA, merge and deployment remain separate fail-closed gates.
