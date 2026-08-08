# CNPLE Cram V2 — Lab Interpretation Parity Batch 38B Audit

Audit date: 2026-08-08

Scope: `38b-lab-interpretation-parity.json` — eight Full-lesson parity records using exact canonical Full-lesson slugs as authoring IDs.

## Disposition

**Clinical second pass: PASS.**

These remain authoring assets only until private-core parse/identity/source/Quick-Check/shared-Cram certification succeeds.

## Records

- `lab-bun-and-creatinine`
- `lab-egfr-and-renal-function`
- `lab-acute-kidney-injury-lab-trends`
- `lab-sodium-disorders`
- `lab-potassium-disorders`
- `lab-phosphate-disorders`
- `lab-hemoglobin-and-hematocrit`
- `lab-white-blood-cells-and-differential`

## Clinical audit

### BUN and creatinine

PASS. The record prevents a BUN/creatinine ratio from replacing clinical volume/urine/obstruction assessment, recognizes creatinine limitations in low muscle mass and changing renal function, and avoids indiscriminate fluid treatment of every azotemic patient.

### eGFR and renal function

PASS. Uses the KDIGO/Kidney Foundation chronicity principle: CKD requires reduced GFR and/or kidney-damage markers for at least three months. Albuminuria is incorporated into risk, and the record explicitly prevents steady-state eGFR from being overtrusted during AKI or at extremes of muscle mass. Drug dosing remains tied to the renal-function method specified for that medication.

Current anchor: KDIGO 2024 CKD guideline and Kidney Foundation of Canada CKD resources.

### AKI lab trends

PASS. Treats AKI as dynamic: creatinine lag, urine-output change, potassium/acidosis/volume complications and cause are all required. Dialysis/renal replacement therapy is triggered by clinical complications such as refractory hyperkalemia, acidosis, pulmonary edema or uremic complications—not a creatinine threshold alone.

### Sodium disorders

PASS. Requires tonicity and symptoms/chronicity before correction. Severe symptomatic hyponatremia is treated through monitored hypertonic-saline protocol; overcorrection/osmotic-demylination risk is explicit. Hypernatremia is managed as a water-balance disorder with controlled cause-directed correction. The record does not hard-code one universal daily correction ceiling for every risk group; local high-acuity protocols govern exact limits.

Current Canadian anchor: Emergency Care BC hyponatremia guidance and Canadian nephrology/acute-care practice.

### Potassium disorders

PASS. Separates three jobs in dangerous hyperkalemia: cardiac membrane stabilization, intracellular shift and actual potassium removal. Calcium is explicitly described as not lowering serum potassium, and insulin therapy includes delayed hypoglycemia monitoring. Pseudohyperkalemia, hypomagnesemia and potassium-replacement infusion safety are addressed.

Current Canadian anchor: Emergency Care BC hyperkalemia guidance.

### Phosphate disorders

PASS. Links severe hypophosphatemia to respiratory-muscle weakness, rhabdomyolysis and refeeding/DKA treatment and requires simultaneous potassium/magnesium/thiamine/fluid review in refeeding. Hyperphosphatemia differentiates chronic CKD-mineral disease from acute tumor lysis/cell breakdown. IV phosphate safety is protocol-governed rather than given a fabricated universal infusion rule.

### Hemoglobin / hematocrit

PASS. Separates concentration from cause and explicitly notes that acute hemorrhagic shock can precede a large measured hemoglobin drop. Stable non-bleeding transfusion uses restrictive/single-unit reassessment principles where appropriate; major hemorrhage follows a different resuscitation pathway. Iron-deficiency treatment does not replace investigation of the source of loss.

Canadian anchor: Choosing Wisely Canada transfusion stewardship and Canadian Blood Services practice resources.

### WBC and differential

PASS. Prevents 'high WBC = bacterial infection' and recognizes steroid/stress demargination. Uses absolute neutrophil count and the clinical syndrome rather than total WBC alone, and makes fever/systemic illness with clinically significant neutropenia an urgent oncology/hematology infection pathway. Persistent blasts/multilineage cytopenia remains a separate hematologic emergency pathway.

Canadian anchor: Cancer Care Ontario systemic-treatment/febrile-neutropenia safety resources.

## Safety checks

- No diagnosis is made from BUN/creatinine ratio alone.
- CKD chronicity and albuminuria are preserved.
- Steady-state eGFR is not trusted during rapidly evolving AKI.
- Sodium therapy requires tonicity, symptoms and chronicity.
- Calcium for hyperkalemia is not misrepresented as potassium removal.
- Insulin treatment of hyperkalemia includes post-treatment glucose monitoring.
- Severe phosphate depletion triggers refeeding/respiratory-risk assessment.
- Hemoglobin does not delay hemorrhagic-shock treatment or mandate an automatic two-unit transfusion.
- WBC does not independently diagnose infection; neutropenic fever remains urgent.

## Remaining publication gates

1. Manifest/file parse and required-field validation.
2. Exact Full-lesson identity confirmation in current `ca-np-cnple` catalogue.
3. Learner-visible Full source hash plus point/Bottom-Line anchor review.
4. Exactly three lesson-related, single-answer, server-gradable Quick Check IDs.
5. Shared Cram integrity certification.
6. Learner Full/Cram render and accessibility verification.
