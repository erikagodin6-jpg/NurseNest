# CNPLE Cram V2 — Parity Batch 40B Clinical Second Pass

Date: 2026-08-09
Scope: `40b-cardiovascular-risk-valve-hf-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-coronary-artery-disease-risk-stratification-and-management`
- `np-stable-angina-diagnostic-workup-and-treatment`
- `np-valvular-heart-disease-murmur-recognition-and-referral`
- `np-peripheral-artery-disease-diagnosis-and-management`
- `np-anticoagulation-management-and-reversal-strategies`
- `np-aortic-stenosis-severity-assessment-and-timing-of-intervention`
- `np-cardiovascular-disease-prevention-strategies`
- `np-heart-failure-medication-titration-and-monitoring`

## Clinical review

- CAD: stable symptom assessment is separated from ACS; secondary prevention remains active even when asymptomatic.
- Stable angina: pattern stability, appropriate diagnostic testing, antianginal therapy and escalation of rest/accelerating pain are explicit.
- Valve murmurs: murmur is a clue; symptoms/echo define disease and referral urgency.
- PAD: limb symptoms are integrated with systemic ASCVD prevention; acute/chronic limb-threatening ischemia is escalated.
- Anticoagulation: drug/indication/renal function/bleeding/reversal are integrated; INR is not treated as a universal DOAC activity assay.
- Aortic stenosis: symptom/echo/flow/LV response determine urgency rather than murmur grade.
- Prevention: absolute risk and risk-defining conditions drive treatment; symptoms are not routed through screening logic.
- HF titration: complementary evidence-based therapy is built in parallel with BP/renal/potassium/volume monitoring; acute decompensation is separated from routine titration.

## Canadian source refresh

Rechecked 2026-08-09 against current Canadian Cardiovascular Society guideline/KT resources, CCS Peripheral Arterial Disease guidance, CCS Secondary Prevention Pathway, Thrombosis Canada clinical guides, Hypertension Canada, Diabetes Canada cardiorenal guidance and CCS/CHFS 2025 HFnrEF guidance.

## Publication boundary

Clinical authoring PASS only. Global JSON/required-field/identity validation, Full-source anchors, Bottom Line evidence, exactly three eligible Quick Checks, runtime recipe certification, learner render QA, merge and deployment remain fail-closed downstream gates.
