# CNPLE Cram V2 — Parity Batch 40C Clinical Second Pass

Date: 2026-08-09
Scope: `40c-cardio-core-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identities

- `np-hypertension-diagnosis-and-guideline-based-management`
- `np-coronary-artery-disease-risk-stratification-and-management`
- `np-heart-failure-with-reduced-and-preserved-ejection-fraction`
- `np-atrial-fibrillation-rate-versus-rhythm-control-decisions`
- `np-stable-angina-diagnostic-workup-and-treatment`
- `np-acute-coronary-syndrome-recognition-and-initial-management`
- `np-valvular-heart-disease-murmur-recognition-and-referral`

All are literal slugs from the canonical NP parity generator.

## Clinical review

Hypertension: PASS — standardized confirmation and risk-based treatment; emergency requires target-organ injury.

CAD/stable angina/ACS: PASS — stable vs acute syndromes are separated; test selection and antithrombotic/anti-ischemic therapy are indication- and risk-based; one negative early troponin does not rule out ACS.

Heart failure: PASS — HFrEF uses the four foundational classes; 2025 CCS/CHFS HFnrEF guidance is preserved for LVEF >40% with congestion/comorbidity management and SGLT2-inhibitor evidence.

AF: PASS — stability, stroke prevention and rate/rhythm strategy are separate decisions; anticoagulation assessment is not lost when rhythm symptoms improve.

Valvular disease: PASS — murmur is a clue, echocardiography defines structure/severity, and symptoms/ventricular response drive referral. Universal dental prophylaxis is rejected.

## Current Canadian source refresh

Rechecked 2026-08-09 against current CCS/CHFS guidance, including 2025 HFnrEF, 2021 HFrEF, CCS/CHRS AF, CCS secondary-prevention and valvular/coronary resources.

## Publication boundary

Clinical authoring second pass only. Structural/global-ID validation, current Full-source anchors, Bottom Line evidence, three eligible Quick Checks, runtime certification, learner rendering, merge and deployment remain fail-closed downstream gates.
