# CNPLE Cram V2 — Parity Batch 41A Clinical Second Pass

Date: 2026-08-09
Scope: `41a-endocrine-technology-bone-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-continuous-glucose-monitoring-interpretation`
- `np-insulin-initiation-and-titration-protocols`
- `np-thyroid-cancer-follow-up-and-surveillance`
- `np-hypoparathyroidism-management`
- `np-vitamin-d-deficiency-evaluation-and-treatment`
- `np-metabolic-bone-disease-evaluation`
- `np-pituitary-adenoma-recognition-and-management`
- `np-obesity-pharmacotherapy-selection`

All are literal slugs emitted by the canonical NP parity generator.

## Clinical review

### CGM interpretation
PASS. Pattern/data-quality reasoning precedes medication changes. Time-below-range is prioritized and single trend arrows are not treated as sufficient evidence for repeated dose changes.

### Insulin initiation/titration
PASS. Basal, prandial and correction insulin are assigned distinct jobs; titration follows the timing of the glucose abnormality and type 1 basal insulin is preserved during fasting/NPO care.

### Thyroid-cancer surveillance
PASS. Follow-up is dynamic and risk-adapted; thyroglobulin/antibody interpretation depends on surgical/RAI context, and TSH suppression is balanced against cardiovascular/bone harm rather than kept maximally suppressed forever.

### Hypoparathyroidism
PASS. Chronic treatment targets symptom safety without normal-high serum calcium at the expense of hypercalciuria/renal damage; acute symptomatic hypocalcemia is an emergency pathway.

### Vitamin D
PASS. Indiscriminate screening and high-dose supplementation are rejected. Testing is tied to an actionable deficiency/bone/endocrine indication and excessive supplementation risk is explicit.

### Metabolic bone disease
PASS. Primary osteoporosis is separated from osteomalacia, CKD-mineral/bone disease and secondary causes; denosumab discontinuation/rebound risk and secondary-cause workup are explicit.

### Pituitary adenoma
PASS. The lesion is evaluated for hormone excess, hormone deficiency and mass effect. Central adrenal insufficiency is assessed before thyroid replacement when panhypopituitarism is plausible; apoplexy is an emergency.

### Obesity pharmacotherapy
PASS. Therapy is complication-, goal-, contraindication- and access-based, not a BMI-only or 'failed lifestyle first' gate. Pregnancy/eating-disorder exclusions and long-term treatment framing are explicit.

## Canadian source refresh

Load-bearing sources rechecked on 2026-08-09:

- Diabetes Canada glucose-monitoring/CGM guidance and Appendix 9 insulin initiation/titration.
- Diabetes Canada 2024 pharmacologic management and current type 1 diabetes update.
- Cancer Care Ontario Thyroid Cancer Pathway.
- Osteoporosis Canada 2023 CPG and 2026 calcium/vitamin D position update.
- Obesity Canada Adult Clinical Practice Guideline — pharmacotherapy updated 2025.
- Canadian endocrine/pituitary specialty practice resources where no current national Canadian CPG supplies an operational threshold.

## Authoring gates

- Required Cram fields: present in all eight records.
- Canadian/SI framing: PASS.
- US-only exam/regulatory framing: none intentionally authored.
- Unsupported universal endocrine/surveillance thresholds: none.
- Red flags/escalation: present in all eight.
- Longitudinal monitoring and specialist boundaries: explicit.

## Publication boundary

Clinical authoring second pass only. Structural parsing, exact current Full-source anchoring, Bottom Line evidence, three eligible Quick Checks, runtime recipe integrity, learner rendering, merge and deployment remain downstream fail-closed gates.
