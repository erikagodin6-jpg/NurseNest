# CNPLE Cram V2 — Parity Batch 43A Clinical Second Pass

Date: 2026-08-09
Scope: `43a-endocrine-advanced-management-parity.json`
Result: **PASS — Canadian clinical authoring second pass**

## Exact identity contract
- `np-diabetes-medication-selection-beyond-metformin`
- `np-insulin-initiation-and-titration-protocols`
- `np-continuous-glucose-monitoring-interpretation`
- `np-thyroid-nodule-evaluation-and-fna-indications`
- `np-adrenal-insufficiency-diagnosis-and-management`
- `np-cushing-syndrome-evaluation`
- `np-pheochromocytoma-recognition-and-workup`
- `np-pituitary-adenoma-recognition-and-management`

## Clinical review

### Diabetes medication selection beyond metformin
PASS. Therapy is cardiorenal- and patient-risk driven rather than A1C-only. Specific SGLT2 inhibitors and GLP-1 receptor agonists with demonstrated benefit are prioritized for relevant high-CV-risk/HF/CKD populations even when A1C is at target. Metabolic decompensation or severe symptomatic hyperglycemia triggers immediate insulin rather than slow oral escalation.

### Insulin initiation/titration
PASS. Basal, prandial and correction insulin are assigned to the glucose patterns they actually treat. The lesson prevents over-basalization and preserves basal insulin physiology in type 1 diabetes during fasting/illness while allowing clinician-directed adjustment. Hypoglycemia, renal function, technique and device/concentration errors are explicit safety gates.

### CGM interpretation
PASS. Data sufficiency/quality is checked first; clinically important time below range is reviewed before hyperglycemia intensification, followed by time in range, above-range burden and variability. A1C is not used to hide recurrent nocturnal hypoglycemia and unexpected sensor values are confirmed when device instructions/clinical context require it.

### Thyroid nodule
PASS. TSH + structural ultrasound risk determine the pathway. FNA is risk/size based, not anxiety/palpability based. Routine thyroid ultrasound is not used to investigate thyroid-function abnormalities without a palpable/structural indication. Suppressed TSH changes the functional-nodule pathway and can justify thyroid scintigraphy rather than reflex FNA.

### Adrenal insufficiency
PASS. Suspected adrenal crisis is treat-first: parenteral glucocorticoid and resuscitation are not delayed for confirmatory testing. Stable disease distinguishes primary from central adrenal insufficiency, including mineralocorticoid implications. Chronic steroid withdrawal, sick-day dosing and emergency injectable steroid education are explicit.

### Cushing syndrome
PASS. Testing is reserved for a meaningful discriminatory/progressive phenotype after exogenous glucocorticoid exposure is reviewed. Validated biochemical screening/confirmation precedes localization imaging; random cortisol or imaging-first strategies are not taught.

### Pheochromocytoma/paraganglioma
PASS. Plasma free or urinary fractionated metanephrines are the first-line biochemical strategy, with preanalytical conditions/interference considered. Plasma catecholamines are not taught as the preferred initial screen. Localization follows biochemical evidence in the usual pathway. When preoperative blockade is needed, alpha blockade precedes beta blockade.

### Pituitary adenoma
PASS. Evaluation is explicitly three-axis: hormone excess, hormone deficiency and mass effect. Central hypothyroidism is interpreted with free T4 rather than a primary-gland TSH algorithm. Possible central adrenal insufficiency is addressed before thyroid replacement where clinically relevant. Pituitary apoplexy/visual compromise are emergency pathways.

## Canadian source refresh
Load-bearing sources rechecked 2026-08-09:

- Diabetes Canada CPG, Pharmacologic Glycemic Management of Type 2 Diabetes in Adults — 2024 Update: metformin for most requiring pharmacotherapy; immediate insulin for metabolic decompensation/severe symptomatic hyperglycemia; SGLT2/GLP-1 cardiorenal therapies for appropriate high-risk/HF/CKD populations regardless of A1C target status.
- Diabetes Canada Hypoglycemia — 2023 Update and Blood Glucose Monitoring/CGM guidance: active prevention of hypoglycemia, CGM time-in-range/time-below-range/variability interpretation and individualized targets.
- Diabetes Canada CKD in Diabetes — 2025 Update: cardiorenal benefit and kidney-safety context for SGLT2-based therapy.
- Choosing Wisely Canada / Canadian Society of Endocrinology and Metabolism, Endocrinology and Metabolism Recommendations, updated April 2026: no routine thyroid ultrasound for thyroid-function abnormalities without a palpable structural finding; TSH-first primary hypothyroid testing except central disease; plasma/urine metanephrines preferred over plasma catecholamines for PPGL.
- Choosing Wisely Canada / Canadian Association of Medical Biochemists: metanephrine testing and endocrine laboratory stewardship.

## Authoring gates
- Required Cram fields: PASS by editorial review; global structural parser still required.
- Canadian SI framing: PASS.
- US-only exam/regulatory framing intentionally authored: none.
- Unsupported universal insulin, endocrine-imaging or biochemical cutoffs invented: none.
- Emergency deterioration pathways: explicit where clinically relevant.
- Specialist/local-protocol boundaries: explicit.

## Publication boundary
This PASS certifies clinical authoring only. Global JSON/count/unique-ID validation, exact current Full-lesson identity reconciliation, Full-source anchors, Bottom Line evidence, exactly three eligible Quick Checks, runtime recipe certification, learner rendering, merge and deployment remain downstream fail-closed gates.
