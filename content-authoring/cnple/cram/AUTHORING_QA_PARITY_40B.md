# CNPLE Cram V2 — Parity Batch 40B Clinical Second Pass

Date: 2026-08-08  
Scope: `40b-endocrine-thyroid-adrenal-parity.json`  
Result: **PASS — clinical authoring second pass**

## Exact identity set

- `np-hypothyroidism-diagnosis-and-levothyroxine-dosing`
- `np-hyperthyroidism-diagnosis-and-management`
- `np-thyroid-nodule-evaluation-and-fna-indications`
- `np-thyroid-cancer-follow-up-and-surveillance`
- `np-adrenal-insufficiency-diagnosis-and-management`
- `np-cushing-syndrome-evaluation`
- `np-pheochromocytoma-recognition-and-workup`
- `np-hyperparathyroidism-diagnosis-and-management`

All IDs are literal outputs of the canonical NP parity generator.

## Clinical audit

### Hypothyroidism / levothyroxine
PASS. TSH is the primary test/dose target for uncomplicated primary hypothyroidism; free T4 is required when the pituitary/hypothalamic axis is unreliable. Pregnancy, coronary disease, absorption and interacting supplements/medications alter dosing and follow-up.

### Hyperthyroidism
PASS. Thyrotoxicosis is separated from etiology. Graves/toxic autonomy and thyroiditis are not managed identically; thyroid storm is a clinical emergency. Routine thyroid ultrasound is not used merely for abnormal function tests without a structural finding.

### Thyroid nodule / FNA
PASS. TSH plus risk-stratified ultrasound precedes FNA; biopsy is driven by sonographic risk/size/context. Nuclear scanning is not used as a generic malignancy test in euthyroid nodules.

### Thyroid cancer surveillance
PASS. Differentiated thyroid cancer uses risk/response-adapted biochemical and neck surveillance, with intentional rather than perpetual maximal TSH suppression. Medullary/anaplastic disease remain distinct specialist pathways.

### Adrenal insufficiency
PASS. Primary and central disease are distinguished by mineralocorticoid physiology. Suspected adrenal crisis is treated immediately with parenteral glucocorticoid and fluids rather than delayed for testing. Emergency-card/sick-day planning is explicit.

### Cushing syndrome
PASS. Exogenous glucocorticoid exposure is excluded first; testing is targeted to discriminatory/progressive phenotypes and uses validated screening before source localization.

### Pheochromocytoma
PASS. Biochemical metanephrine evidence generally precedes localization; medication/preanalytic false positives are recognized; alpha blockade precedes beta blockade in confirmed catecholamine-secreting tumour preparation.

### Hyperparathyroidism
PASS. Persistent hypercalcemia with an inappropriately nonsuppressed PTH is the key physiology. Renal, vitamin D, medication and FHH mimics are assessed; imaging is for localization after biochemical diagnosis, not diagnosis itself.

## Current Canadian source anchors rechecked

- Choosing Wisely Canada Endocrinology and Metabolism recommendations — updated April 2026.
- Canadian Society of Endocrinology and Metabolism Clinical Practice Guidelines/Quality Improvement resources, including adrenal insufficiency.
- BC Guidelines — Thyroid Function Testing / Endocrine System directory updated May 2026.
- Choosing Wisely Canada Nuclear Medicine recommendations for thyroid imaging stewardship.

## Publication boundary

Clinical second-pass PASS only. Ordered manifest registration, global JSON/required-field/identity validation, exact-current-Full reconciliation, source anchors, exactly three gradeable lesson-linked Quick Checks, shared Cram certification and authenticated learner rendering remain mandatory.
