# CNPLE Cram V2 — Endocrine Parity Batch 41C Clinical Second Pass

Date: 2026-08-10
Scope: `41c-endocrine-bone-metabolic-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact Full identities
- `np-osteoporosis-diagnosis-and-pharmacotherapy`
- `np-metabolic-bone-disease-evaluation`
- `np-pituitary-adenoma-recognition-and-management`
- `np-polycystic-ovary-syndrome-metabolic-management`
- `np-lipid-disorders-diagnosis-and-management`
- `np-obesity-pharmacotherapy-selection`
- `np-electrolyte-disorders-sodium-and-potassium`
- `np-calcium-disorders-hypercalcemia-and-hypocalcemia`

Together with 41A–41B, these provide exact clinical-authoring companions for all 26 concepts in the canonical Endocrine NP parity generator.

## Clinical review
- **Osteoporosis:** fracture risk and prior fracture drive treatment, not T-score alone; bisphosphonate-first strategy and denosumab transition/rebound risk match the 2023 Canadian CPG.
- **Metabolic bone disease:** osteoporosis is separated from osteomalacia/CKD-MBD/PTH/phosphate disorders so low BMD is not treated without understanding mineral physiology.
- **Pituitary adenoma:** hormone excess/deficiency and mass effect are assessed in parallel; pituitary apoplexy and adrenal-axis safety remain explicit.
- **PCOS:** diagnosis excludes mimics, treats endometrial/reproductive symptoms and cardiometabolic risk together, and avoids ultrasound-only diagnosis or universal metformin use.
- **Lipid disorders:** CCS risk-based treatment, severe-triglyceride pancreatitis risk and inherited dyslipidemia clues are preserved.
- **Obesity pharmacotherapy:** current 2025 Canadian pharmacotherapy framework is long-term, individualized, complication-centred and non-stigmatizing; unapproved/compounded therapy and pregnancy use are rejected.
- **Sodium/potassium:** tonicity/tempo and ECG/neurologic risk guide emergency treatment; rapid sodium correction and unsafe potassium replacement are explicit harms.
- **Calcium:** corrected/ionized confirmation plus PTH physiology drives the differential; severe symptomatic hypo/hypercalcemia is stabilized before definitive etiologic workup.

## Current Canadian source refresh
Rechecked 2026-08-10 against Osteoporosis Canada 2023 CPG, Obesity Canada 2025 pharmacotherapy update, CCS 2021 dyslipidemia guidance, Diabetes Canada metabolic-risk resources and current Canadian endocrine/renal electrolyte practice.

## Publication boundary
Clinical authoring only. Manifest registration, structural JSON/required-field validation, exact-current-Full reconciliation, Full-source anchors, Bottom Line evidence, exactly three eligible Quick Checks, runtime certification, learner render QA, merge and deployment remain separate fail-closed gates.
