# CNPLE Cram V2 — Parity Batch 41A Clinical Second Pass

Date: 2026-08-09
Scope: `41a-endocrine-advanced-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-type-1-diabetes-insulin-regimen-selection`
- `np-insulin-initiation-and-titration-protocols`
- `np-continuous-glucose-monitoring-interpretation`
- `np-hyperosmolar-hyperglycemic-state-management`
- `np-thyroid-cancer-follow-up-and-surveillance`
- `np-pheochromocytoma-recognition-and-workup`
- `np-hypoparathyroidism-management`
- `np-vitamin-d-deficiency-evaluation-and-treatment`
- `np-metabolic-bone-disease-evaluation`
- `np-pituitary-adenoma-recognition-and-management`

All IDs are literal `np-${slugify(concept)}` outputs from the canonical NP parity generator.

## Clinical second-pass findings

- Type 1 insulin regimen: basal, prandial and correction roles are separated; basal insulin is not omitted simply because oral intake stops.
- Insulin initiation/titration: fasting versus post-meal patterns drive the component adjusted; over-basalization and frailty/hypoglycemia are explicit.
- CGM: data sufficiency, time-below-range, TIR, variability and insulin-on-board are prioritized over isolated sensor spikes.
- HHS: fluid/osmolality/neurologic physiology is treated as the emergency; insulin does not precede potassium/volume assessment blindly.
- Thyroid cancer: recurrence-risk/response-adapted surveillance and harm from unnecessary chronic aggressive TSH suppression are explicit.
- Pheochromocytoma: biochemical confirmation precedes localization when feasible; alpha blockade precedes beta blockade.
- Hypoparathyroidism: chronic therapy targets symptom control without hypercalciuria/renal injury; severe symptomatic hypocalcemia escalates.
- Vitamin D: indiscriminate population testing and chronic megadose therapy are rejected.
- Metabolic bone disease: osteoporosis is separated from osteomalacia/CKD-MBD/other secondary causes before antiresorptive therapy.
- Pituitary adenoma: hormone excess, hormone deficiency and mass effect are assessed separately; adrenal insufficiency is addressed before levothyroxine when central deficiency is possible.

## Canadian source refresh

Load-bearing guidance rechecked 2026-08-09:

- Diabetes Canada current type 1, insulin initiation/titration, glucose monitoring/CGM and hyperglycemic-emergency resources.
- Osteoporosis Canada 2023 Clinical Practice Guideline for fracture prevention and treatment.
- Canadian endocrine/adrenal/pituitary specialty practice principles for pheochromocytoma, hypoparathyroidism and pituitary disease.

## Publication boundary

Clinical authoring PASS only. Global parse/uniqueness, exact-current-Full reconciliation, point/Bottom-Line source anchors, three eligible Quick Checks, runtime recipe integrity and learner-render certification remain downstream fail-closed gates.
