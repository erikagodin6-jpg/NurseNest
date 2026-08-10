# CNPLE Cram V2 — Parity Batch 40C Clinical Second Pass

Date: 2026-08-09
Scope: `40c-endocrine-bone-metabolic-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-hypoparathyroidism-management`
- `np-vitamin-d-deficiency-evaluation-and-treatment`
- `np-osteoporosis-diagnosis-and-pharmacotherapy`
- `np-metabolic-bone-disease-evaluation`
- `np-pituitary-adenoma-recognition-and-management`
- `np-polycystic-ovary-syndrome-metabolic-management`
- `np-lipid-disorders-diagnosis-and-management`
- `np-obesity-pharmacotherapy-selection`
- `np-electrolyte-disorders-sodium-and-potassium`
- `np-calcium-disorders-hypercalcemia-and-hypocalcemia`

All IDs are literal slugs emitted by the canonical NP parity generator.

## Clinical review

### Hypoparathyroidism
PASS. Chronic treatment balances symptoms/serum calcium against hypercalciuria and renal injury; magnesium and urine calcium are included, and severe symptomatic hypocalcemia remains an emergency pathway.

### Vitamin D deficiency
PASS. 25-hydroxyvitamin D is the status test, testing is indication-driven rather than universal, and treatment avoids unmonitored megadose exposure/hypercalcemia.

### Osteoporosis
PASS. Treatment is fracture-risk driven rather than T-score-only. Denosumab discontinuation requires a transition plan, and falls/prior fracture/secondary causes are incorporated.

### Metabolic bone disease
PASS. Osteoporosis is separated from osteomalacia, hyperparathyroidism and CKD-mineral bone disorder. Mineral physiology is established before routine antiresorptive therapy is applied.

### Pituitary adenoma
PASS. The framework separately evaluates hormone excess, hormone deficiency and mass effect. Pituitary apoplexy and possible ACTH deficiency before levothyroxine are explicit safety gates.

### PCOS metabolic management
PASS. Diagnosis requires appropriate exclusion of important mimics, rapid virilization is a red flag, and management includes endometrial protection, fertility goals and metabolic risk without weight-stigmatizing care.

### Lipid disorders
PASS. Canadian cardiovascular-risk framing is preserved. ASCVD/statin-indicated conditions, familial patterns and severe hypertriglyceridemia are separated appropriately.

### Obesity pharmacotherapy
PASS. Pharmacotherapy is chronic-disease treatment selected by complications, contraindications, reproductive plans, tolerability, access and goals. The 2025 Obesity Canada update is the current anchor.

### Sodium/potassium disorders
PASS. Sodium disorders use tonicity, symptoms, tempo and volume status; hyperkalemia separates myocardial stabilization, intracellular shift and potassium removal. Overcorrection and insulin-associated hypoglycemia are explicit hazards.

### Calcium disorders
PASS. Calcium is confirmed first, then PTH chooses the diagnostic branch. Hyper/hypocalcemic emergencies, magnesium context and medication causes are explicit.

## Canadian source refresh

Load-bearing sources rechecked on 2026-08-09:

- Canadian Society of Endocrinology and Metabolism hypoparathyroidism and mineral-metabolism guideline resources.
- Osteoporosis Canada, **Clinical Practice Guideline for Management of Osteoporosis and Fracture Prevention — 2023 Update**.
- Obesity Canada, **Adult Clinical Practice Guideline — Pharmacotherapy 2025 Update**.
- Canadian Cardiovascular Society dyslipidemia guideline/resources.
- Canadian endocrine/renal emergency practice principles for sodium, potassium and calcium disorders.

## Completion note

With batches 40A–40C, every Endocrine concept emitted by `generate-np-parity-expansion-catalog.mjs` now has a dedicated CNPLE Cram authoring identity. Remaining Endocrine work is downstream manifest reconciliation, exact Full-source anchoring, Bottom Line evidence, Quick Check certification, runtime integrity and learner rendering—not missing Endocrine authoring.

## Publication boundary

Clinical authoring second pass only. No merge/deploy claim is made.
