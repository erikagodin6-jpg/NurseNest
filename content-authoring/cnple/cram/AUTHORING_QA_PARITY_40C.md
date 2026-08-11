# CNPLE Cram V2 — Parity Batch 40C Clinical Second Pass

Date: 2026-08-11  
Scope: `40c-endocrine-metabolic-bone-parity.json`  
Result: **PASS — clinical authoring second pass**

## Exact canonical identity set

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

These are literal outputs of the canonical NP parity generator and complete the remaining Endocrine concepts after 40A/40B.

## Clinical second pass

**Hypoparathyroidism:** PASS. Severe symptomatic hypocalcemia is treated urgently; chronic calcium/active-vitamin-D therapy explicitly protects against hypercalciuria and renal injury. Magnesium and pregnancy context are retained.

**Vitamin D:** PASS. 25-hydroxyvitamin D testing is selective rather than universal; 1,25-dihydroxyvitamin D is not taught as routine deficiency testing. The 2026 Osteoporosis Canada evidence update is reflected: unselected supplementation is not substituted for fracture-risk therapy.

**Osteoporosis:** PASS. Canadian fracture-risk treatment logic is used. Bisphosphonates are first line for most treatment initiations; denosumab discontinuation requires antiresorptive transition because of rebound vertebral-fracture risk.

**Metabolic bone disease:** PASS. Calcium/phosphate/PTH/25-OH-D/renal/ALP pattern differentiates mineralization disorders and CKD-MBD from routine osteoporosis; antiresorptives are not reflexively used before major mineral abnormalities are corrected.

**Pituitary adenoma:** PASS. Secretion, deficiency and compression are evaluated separately. Pituitary apoplexy is emergent. Adrenal status precedes thyroid replacement when combined pituitary deficits are possible.

**PCOS metabolic management:** PASS. Important mimics are excluded; prolonged anovulation/endometrial protection, cardiometabolic risk and fertility goals are explicit. Weight-stigmatizing framing is excluded.

**Lipid disorders:** PASS. CCS risk-based statin logic, secondary prevention, non-HDL/ApoB use with elevated triglycerides, one-time Lp(a) assessment and evidence-based intensification are retained.

**Obesity pharmacotherapy:** PASS. Obesity Canada 2025 guidance is reflected. Treatment is long-term chronic-disease therapy, uses approved Canadian agents, incorporates complication/goals/access/pregnancy context and explicitly rejects unapproved/compounded substitution as a default strategy.

**Sodium/potassium:** PASS. Sodium uses tonicity/chronicity/volume/neurologic context; potassium uses ECG/renal/shift/loss context. Hyperkalemia separates myocardial stabilization, intracellular shift and potassium removal.

**Calcium disorders:** PASS. Calcium is confirmed before classification, PTH splits hypercalcemia mechanisms, parathyroid imaging is not used to make the biochemical diagnosis, and severe symptomatic calcium disturbances follow acute-care pathways.

## Current Canadian source refresh

Reviewed for this batch on 2026-08-11:

- Osteoporosis Canada — **2023 Clinical Practice Guideline** and July 2026 calcium/vitamin D evidence update.
- Obesity Canada — **Adult Clinical Practice Guideline, Pharmacotherapy in Obesity Management, updated 2025**.
- Canadian Cardiovascular Society — **2021 Dyslipidemia Guideline** and current CCS tools/library.
- Choosing Wisely Canada — vitamin D testing / laboratory stewardship.
- SOGC current PCOS resources and 2025 PCOS position statements, with international evidence-based PCOS guideline support where Canadian guidance does not specify the full metabolic algorithm.
- Canadian endocrine/nephrology emergency practice for calcium, sodium, potassium, pituitary and parathyroid disorders; exact local protocols remain policy-gated.

## Quality gates

- Required Cram fields: PASS by editorial review.
- Exact canonical identity: PASS.
- Canadian/SI framing: PASS.
- Generic repeated assessment/intervention block: none.
- Unsafe universal product-specific cutoffs: none.
- Red flags/escalation: present for all 10.
- Clinical second-pass status: PASS.

## Publication boundary

This certifies **clinical authoring only**. JSON/required-field parser validation, exact current Full reconciliation, point/Bottom-Line source anchoring, three eligible Quick Checks, runtime Cram integrity, learner rendering, merge and deployment remain separate fail-closed gates.
