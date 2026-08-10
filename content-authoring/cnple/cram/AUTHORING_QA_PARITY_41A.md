# CNPLE Cram V2 — Endocrine Parity Batch 41A Clinical Second Pass

Date: 2026-08-10
Scope: `41a-endocrine-diabetes-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact Full identities
- `np-type-2-diabetes-diagnosis-and-initial-management`
- `np-type-1-diabetes-insulin-regimen-selection`
- `np-diabetes-medication-selection-beyond-metformin`
- `np-insulin-initiation-and-titration-protocols`
- `np-continuous-glucose-monitoring-interpretation`
- `np-diabetic-ketoacidosis-recognition-and-management`
- `np-hyperosmolar-hyperglycemic-state-management`
- `np-hypoglycemia-evaluation-and-prevention`

## Clinical review
- Type-2 diagnosis uses validated laboratory criteria and preserves confirmatory testing for asymptomatic results while allowing immediate treatment of symptomatic metabolic decompensation.
- Type-1 regimen teaching preserves basal insulin physiology, pump-failure risk and distinction between basal, prandial and correction insulin.
- Medication selection uses cardiorenal benefit, eGFR, hypoglycemia, weight, pregnancy, cost/access and preference rather than A1C potency alone.
- Insulin titration is pattern-based and explicitly guards against over-basalization.
- CGM interpretation uses time-in/below/above-range and recurrent patterns, with capillary confirmation when symptoms/clinical decisions do not fit the sensor.
- DKA is treated as a ketone/acidosis emergency with potassium-aware insulin and continued treatment until ketoacidosis resolves; euglycemic SGLT2-associated DKA is retained.
- HHS management is volume/osmolality/sodium/neurologic-state aware rather than glucose-only.
- Hypoglycemia management includes immediate rescue plus root-cause/regimen redesign, severe-event prevention, glucagon and food-security/renal/frailty context.

## Current Canadian source refresh
Rechecked 2026-08-10 against the current Diabetes Canada Clinical Practice Guidelines index, including the 2024 Pharmacologic Glycemic Management of Type 2 Diabetes update and current glycemic-monitoring, type-1, hypoglycemia and hyperglycemic-emergency guidance.

## Safety gates
- Canadian SI framing retained.
- No universal insulin dose or correction algorithm invented across pregnancy, frailty, type 1 diabetes and acute illness.
- Severe hypoglycemia, ketosis, pump failure, major electrolyte disturbance and altered consciousness remain explicit escalation triggers.
- Cardiorenal indications are not subordinated to A1C alone.

## Publication boundary
Clinical authoring only. Manifest registration, structural JSON/required-field validation, exact-current-Full reconciliation, Full-source anchors, Bottom Line evidence, exactly three eligible Quick Checks, runtime certification, learner render QA, merge and deployment remain separate fail-closed gates.
