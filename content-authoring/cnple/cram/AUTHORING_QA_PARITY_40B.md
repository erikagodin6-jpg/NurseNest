# CNPLE Cram V2 — Parity Batch 40B Clinical Second Pass

Date: 2026-08-09
Scope: `40b-endocrine-thyroid-adrenal-parathyroid-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-hypothyroidism-diagnosis-and-levothyroxine-dosing`
- `np-hyperthyroidism-diagnosis-and-management`
- `np-thyroid-nodule-evaluation-and-fna-indications`
- `np-thyroid-cancer-follow-up-and-surveillance`
- `np-adrenal-insufficiency-diagnosis-and-management`
- `np-cushing-syndrome-evaluation`
- `np-pheochromocytoma-recognition-and-workup`
- `np-hyperparathyroidism-diagnosis-and-management`

## Clinical review

PASS across all eight. The batch keeps endocrine testing physiology-first: TSH-first only when the pituitary axis is reliable; thyrotoxicosis requires etiologic classification; thyroid nodules use TSH plus ultrasound risk before FNA; low-risk thyroid-cancer surveillance is risk-adapted; adrenal crisis treatment is never delayed for perfect testing; Cushing testing is phenotype-driven; pheochromocytoma is biochemical before localization and alpha before beta; hyperparathyroidism is diagnosed from calcium–PTH physiology before localization.

## Canadian source refresh

Load-bearing sources rechecked on 2026-08-09:

- BC Guidelines: **Thyroid Function Testing in the Diagnosis and Monitoring of Thyroid Function Disorder** and **Hormone Testing — Indications and Appropriate Use**.
- Canadian Society of Endocrinology and Metabolism clinical-practice guideline resources, including adrenal insufficiency, low-risk thyroid-cancer transition/follow-up and hyperparathyroidism guidance.
- Choosing Wisely Canada Endocrinology and Metabolism recommendations.

## Authoring gates

- Required Cram fields: present in all eight.
- Canadian/SI framing: PASS.
- Broad endocrine screening without phenotype: rejected.
- Universal product/procedure thresholds invented: none.
- Red flags/escalation: present in all eight.

## Publication boundary

Clinical authoring second pass only. Structural JSON/required-field validation, current Full-source anchoring, Bottom Line evidence, three eligible Quick Checks, runtime recipe integrity, learner rendering, merge and deployment remain downstream fail-closed gates.
