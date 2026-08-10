# CNPLE Cram V2 — Endocrine Parity Batch 41B Clinical Second Pass

Date: 2026-08-10
Scope: `41b-endocrine-thyroid-adrenal-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact Full identities
- `np-hypothyroidism-diagnosis-and-levothyroxine-dosing`
- `np-hyperthyroidism-diagnosis-and-management`
- `np-thyroid-nodule-evaluation-and-fna-indications`
- `np-thyroid-cancer-follow-up-and-surveillance`
- `np-adrenal-insufficiency-diagnosis-and-management`
- `np-cushing-syndrome-evaluation`
- `np-pheochromocytoma-recognition-and-workup`
- `np-hyperparathyroidism-diagnosis-and-management`
- `np-hypoparathyroidism-management`
- `np-vitamin-d-deficiency-evaluation-and-treatment`

## Clinical review
- Primary thyroid disease uses TSH-first testing; free T4 is required for confirmation and for central/pituitary disease where TSH can mislead. Free T3 remains selective rather than routine.
- Thyroid nodules use TSH + ultrasound risk before FNA. Thyroglobulin is not used to screen an intact thyroid for malignancy.
- Differentiated thyroid-cancer surveillance integrates thyroglobulin, anti-thyroglobulin antibodies, imaging, TSH target and treatment history; chronic over-suppression risk is retained.
- Stable adrenal-insufficiency diagnosis is separated from adrenal crisis, which remains immediate glucocorticoid/fluid care without waiting for perfect testing.
- Cushing workup follows phenotype → biochemical proof → source localization; exogenous glucocorticoid exposure is assessed first.
- Pheochromocytoma uses metanephrine-based biochemical evaluation before localization in the stable setting and explicitly preserves alpha blockade before beta blockade.
- Hyperparathyroidism is proven biochemically before localization imaging; secondary hyperparathyroidism/FHH mimics are retained.
- Chronic hypoparathyroidism balances symptom/calcium control against hypercalciuria/renal injury; severe symptomatic hypocalcemia remains monitored IV-calcium care.
- Vitamin-D testing/supplementation is indication-driven, avoids indiscriminate population testing/high-dose use, and is not substituted for effective osteoporosis therapy.

## Current Canadian source refresh
Rechecked 2026-08-10 against BC Thyroid Function Testing and Hormone Testing guidance, current Canadian endocrine/adrenal practice, Osteoporosis Canada 2023 CPG, and Osteoporosis Canada's July 2026 vitamin-D/calcium evidence update.

## Publication boundary
Clinical authoring only. Manifest registration, structural JSON/required-field validation, exact-current-Full reconciliation, Full-source anchors, Bottom Line evidence, exactly three eligible Quick Checks, runtime certification, learner render QA, merge and deployment remain separate fail-closed gates.
