# CNPLE Cram V2 — Parity Batch 40A Clinical Second Pass

Date: 2026-08-09
Scope: `40a-endocrine-diabetes-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-type-2-diabetes-diagnosis-and-initial-management`
- `np-type-1-diabetes-insulin-regimen-selection`
- `np-diabetes-medication-selection-beyond-metformin`
- `np-insulin-initiation-and-titration-protocols`
- `np-continuous-glucose-monitoring-interpretation`
- `np-diabetic-ketoacidosis-recognition-and-management`
- `np-hyperosmolar-hyperglycemic-state-management`
- `np-hypoglycemia-evaluation-and-prevention`

All IDs are literal slugs emitted by the canonical NP parity generator.

## Clinical review

### Type 2 diabetes diagnosis / initial management
PASS. Diagnosis and asymptomatic confirmation are separated from metabolic decompensation, and medication decisions include cardiorenal risk rather than A1C alone.

### Type 1 insulin regimen selection
PASS. Basal physiology is preserved during fasting/NPO states, while prandial/correction insulin is adjusted to food and glucose. Pump-failure DKA risk and backup planning are explicit.

### Medication selection beyond metformin
PASS. SGLT2/GLP-1 cardiorenal indications, hypoglycemia risk, renal function, weight, cost and de-intensification are incorporated. DPP-4 + GLP-1 duplication is rejected.

### Insulin initiation/titration
PASS. Titration is pattern-specific, over-basalization is explicitly prevented, and severe hypoglycemia/renal decline trigger dose reassessment rather than automatic escalation.

### CGM interpretation
PASS. Time-in-range/below-range/variability and timing patterns are prioritized over one sensor value. Sensor lag/error, active insulin and backup capillary testing are included.

### DKA
PASS. DKA is treated as ketosis/acidosis plus volume/electrolyte emergency rather than high glucose alone. Potassium-aware insulin and euglycemic DKA are explicit.

### HHS
PASS. Hyperosmolar dehydration and neurologic risk are central. Correction is controlled and fluid/electrolyte/osmolality monitoring is emphasized.

### Hypoglycemia prevention
PASS. Rescue treatment is paired with regimen redesign, renal/food/alcohol risk assessment, glucagon planning and recurrence prevention.

## Canadian source refresh

Load-bearing sources rechecked on 2026-08-09:

- Diabetes Canada **Pharmacologic Glycemic Management of Type 2 Diabetes in Adults — 2024 Update**.
- Diabetes Canada **Glycemic Management Across the Lifespan for People With Type 1 Diabetes** and insulin resources.
- Diabetes Canada **Hyperglycemic Emergencies in Adults** and DKA update resources.
- Diabetes Canada **Hypoglycemia in Adults — 2023 Update**.
- Diabetes Canada glucose-monitoring/CGM and CKD-in-diabetes resources.

## Authoring gates

- Required Cram fields: present in all eight records.
- Canadian SI framing: PASS.
- US-only exam/regulatory framing: none intentionally authored.
- Unsafe universal insulin-rescue/titration rules: none.
- Red flags/escalation: present in all eight.

## Publication boundary

Clinical authoring second pass only. Structural JSON/required-field validation, current Full-source anchoring, Bottom Line evidence, three eligible Quick Checks, runtime recipe integrity, learner rendering, merge and deployment remain downstream fail-closed gates.
