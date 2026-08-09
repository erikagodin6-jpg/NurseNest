# CNPLE Cram V2 — Parity Batch 40C Clinical Second Pass

Date: 2026-08-09
Scope: `40c-cardiovascular-core-decisions-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract
- `np-hypertension-diagnosis-and-guideline-based-management`
- `np-heart-failure-with-reduced-and-preserved-ejection-fraction`
- `np-atrial-fibrillation-rate-versus-rhythm-control-decisions`
- `np-acute-coronary-syndrome-recognition-and-initial-management`
- `np-deep-vein-thrombosis-and-pulmonary-embolism-management`
- `np-hyperlipidemia-statin-selection-and-monitoring`

## Clinical review
- Hypertension: PASS. Uses validated/standardized measurement, out-of-office confirmation, adult definition >=130/80 mm Hg, pharmacotherapy at >=140/90 or SBP 130-139 with high CVD risk, and SBP target <130 when tolerated.
- HF reduced/non-reduced EF: PASS. Congestion/perfusion first; HFrEF and 2025 HFnrEF treatment evidence are separated; preserved EF is not treated as absence of HF.
- AF: PASS. Stability, stroke prevention and rate/rhythm strategy are three independent decisions; anticoagulation is not stopped merely because sinus rhythm returns.
- ACS: PASS. Serial ECG/high-sensitivity troponin and dangerous mimics are preserved; one early normal result cannot rule out ACS.
- DVT/PE: PASS. Clinical probability drives testing; hemodynamic/bleeding risk drives treatment intensity and disposition; D-dimer is not a diagnosis or post-diagnosis severity marker.
- Dyslipidemia: PASS. Secondary prevention and statin-indicated conditions precede primary-prevention risk calculation; statin symptoms and nonstatin intensification are handled through current CCS logic.

## Canadian source refresh
Rechecked 2026-08-09 against Hypertension Canada 2025 Primary Care Guideline, CCS/CHFS heart-failure resources including 2025 HFnrEF, CCS AF/ACS/secondary-prevention resources, Thrombosis Canada VTE/AF guides, and CCS Dyslipidemia guidance.

## Publication boundary
Clinical authoring PASS only. Global JSON/count/unique-ID validation, current Full identity reconciliation, Full-source anchors, Bottom Line evidence, exactly three eligible Quick Checks, runtime certification, learner rendering, merge and deployment remain downstream fail-closed gates.
