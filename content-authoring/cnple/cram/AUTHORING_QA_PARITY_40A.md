# CNPLE Cram V2 — Parity Batch 40A Clinical Second Pass

Date: 2026-08-08  
Scope: `40a-endocrine-diabetes-parity.json`  
Result: **PASS — clinical authoring second pass**

## Exact identity set

- `np-type-2-diabetes-diagnosis-and-initial-management`
- `np-type-1-diabetes-insulin-regimen-selection`
- `np-diabetes-medication-selection-beyond-metformin`
- `np-insulin-initiation-and-titration-protocols`
- `np-continuous-glucose-monitoring-interpretation`
- `np-diabetic-ketoacidosis-recognition-and-management`
- `np-hyperosmolar-hyperglycemic-state-management`
- `np-hypoglycemia-evaluation-and-prevention`

All IDs are literal outputs of the canonical NP parity generator.

## Clinical audit

### Type 2 diagnosis / initial care
PASS. Stable asymptomatic diagnostic confirmation is kept separate from symptomatic metabolic decompensation requiring immediate treatment. Cardiorenal risk, renal function, pregnancy, hypoglycemia risk and access shape initial pharmacotherapy.

### Type 1 insulin replacement
PASS. Physiologic basal insulin is never treated as optional. NPO/illness changes dose and monitoring rather than permitting complete insulin interruption. Pump-failure and DKA risk are explicit.

### Drug selection beyond metformin
PASS. Medication choice is outcome/comorbidity based rather than A1C potency alone. SGLT2/GLP-1 cardiorenal benefits, hypoglycemia risk, kidney function, weight, adverse effects and affordability are explicit.

### Insulin initiation/titration
PASS. Stable type 2 basal initiation is separated from type 1 basal-bolus and acute IV insulin. Titration follows glucose pattern; over-basalization and stepwise mealtime insulin are explicit.

### CGM
PASS. CGM is interpreted through data sufficiency, time/pattern/variability and hypoglycemia exposure rather than isolated sensor readings. Sensor lag/discordance and insulin-on-board safety are explicit.

### DKA / HHS
PASS. DKA is ketosis/acidosis with potassium-aware insulin and precipitant management; glucose normalization alone is not the endpoint. HHS is dominated by hyperosmolar volume loss and requires cautious osmolality correction. Euglycemic/SGLT2-associated DKA is preserved.

### Hypoglycemia
PASS. Immediate rescue is followed by cause/regimen redesign; recurrent medication-induced lows are not managed by simply advising more food. Severe events require prompt follow-up and prevention planning.

## Current Canadian source anchors rechecked

- Diabetes Canada — Pharmacologic Glycemic Management of Type 2 Diabetes in Adults: 2024 Update and User Guide.
- Diabetes Canada — Glycemic Management in Adults with Type 1 Diabetes / Continuous Glucose Monitoring resources.
- Diabetes Canada — Hyperglycemic Emergencies in Adults and current DKA update material.
- Diabetes Canada — Hypoglycemia in Adults 2023 Update.

## Publication boundary

Clinical second-pass PASS only. Ordered authoring-manifest registration, global JSON/field/identity validation, exact-current-Full reconciliation, Full-source point/Bottom-Line anchors, exactly three lesson-linked gradeable Quick Checks, shared Cram certification and authenticated learner rendering remain mandatory.
