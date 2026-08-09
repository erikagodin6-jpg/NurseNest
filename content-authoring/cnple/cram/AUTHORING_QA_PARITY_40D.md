# CNPLE Cram V2 — Parity Batch 40D Clinical Second Pass

Date: 2026-08-09
Scope: `40d-cardio-vascular-safety-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identities

- `np-peripheral-artery-disease-diagnosis-and-management`
- `np-deep-vein-thrombosis-and-pulmonary-embolism-management`
- `np-syncope-differential-diagnosis-and-workup`
- `np-anticoagulation-management-and-reversal-strategies`
- `np-pericarditis-and-myocarditis-diagnosis`
- `np-hypertensive-urgency-versus-emergency-decision-making`
- `np-cardiac-biomarker-interpretation-in-acute-settings`

All are literal slugs emitted by the canonical NP parity generator.

## Clinical review

PAD: PASS — limb-threatening disease and systemic ASCVD risk are both addressed; acute limb ischemia is an emergency and ABI limitations in diabetes/CKD are preserved.

DVT/PE: PASS — probability-based diagnosis, stability-driven PE treatment and provoking-factor/bleeding-risk duration decisions are explicit.

Syncope: PASS — history/ECG drive first-line assessment; routine neuroimaging is rejected without a specific indication; exertional/abnormal-ECG/structural-risk presentations escalate.

Anticoagulation/reversal: PASS — drug-specific monitoring and reversal are preserved. INR/aPTT are not used as universal DOAC-effect tests. Reversal is matched to severe bleeding/urgent procedure context and thrombotic risk.

Pericarditis/myocarditis: PASS — ACS remains in the differential, tamponade/ventricular dysfunction/arrhythmia change urgency, and exercise restriction/specialist follow-up are explicit.

Hypertensive emergency: PASS — acute target-organ injury defines emergency; rapid normalization of asymptomatic severe BP is rejected.

Cardiac biomarkers: PASS — troponin means myocardial injury, not automatically type-1 MI; BNP/NT-proBNP are contextual HF probability markers. CK-MB is not treated as preferred routine ACS biomarker.

## Current Canadian source refresh

Rechecked 2026-08-09:

- CCS 2022 Peripheral Arterial Disease guideline.
- CCS/CHRS AF and CCS heart-failure/secondary-prevention/cardiac guideline resources.
- Thrombosis Canada current 2026 Warfarin and DOAC bleeding/reversal guides, plus DVT/PE guides.
- Hypertension Canada 2025 Primary Care Guideline.

## Cardiovascular parity statement

With 40D, all 28 cardiovascular concepts emitted by the current canonical NP parity generator have a distinct CNPLE Cram authoring identity across 40A–40D.

## Publication boundary

Clinical authoring second pass only. Manifest registration, global JSON/ID validation, current Full-source anchors, Bottom Line evidence, exactly three eligible Quick Checks, runtime recipe certification, learner rendering, merge and deployment remain downstream fail-closed gates.
