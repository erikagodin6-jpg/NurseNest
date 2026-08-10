# CNPLE Cram V2 — Parity Batch 39D Clinical Second Pass

Date: 2026-08-09
Scope: `39d-respiratory-core-completion-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-asthma-diagnosis-and-stepwise-management`
- `np-copd-diagnosis-gold-staging-and-management`
- `np-pneumonia-cap-versus-hap-diagnosis-and-treatment`
- `np-pulmonary-embolism-risk-stratification-and-treatment`
- `np-allergic-rhinitis-and-sinusitis-management`
- `np-acute-bronchitis-versus-pneumonia-differentiation`

These are literal slugs emitted by the canonical NP parity generator.

## Clinical review

### Asthma
PASS. Diagnosis requires a compatible variable symptom pattern plus objective variable airflow evidence when feasible. ICS-containing therapy is preserved, LABA monotherapy is rejected, and step-up occurs only after diagnosis/technique/adherence review.

### COPD
PASS. Persistent post-bronchodilator obstruction is required in the correct exposure context. Treatment is symptoms/exacerbation/phenotype driven rather than FEV1 alone, with current CTS stable-COPD pharmacotherapy framing.

### CAP vs HAP pneumonia
PASS. Severity and epidemiologic/healthcare exposure drive empiric therapy; CAP and HAP are not interchangeable. Cultures are selective and de-escalation/reassessment is explicit.

### Pulmonary embolism
PASS. Pretest probability guides the diagnostic pathway; hemodynamic/RV risk guides treatment intensity and disposition after diagnosis. D-dimer is not used as a severity marker and thrombolysis is not triggered by clot burden alone.

### Allergic rhinitis / sinusitis
PASS. Allergic rhinitis uses intranasal therapy/trigger management. Most acute sinusitis is viral/self-limited; coloured discharge alone does not justify antibiotics. Orbital/intracranial complication red flags are explicit.

### Acute bronchitis vs pneumonia
PASS. Uncomplicated bronchitis is treated as usually viral and self-limited; pneumonia is assessed from vitals, oxygenation, focal findings, host risk and targeted imaging. Antibiotics are not prescribed from sputum colour alone.

## Canadian source refresh

Load-bearing sources rechecked on 2026-08-09:

- Canadian Thoracic Society current Guideline Library, including current 2021 asthma guidance and 2023 stable-COPD pharmacotherapy guideline/tools.
- Thrombosis Canada current PE diagnosis, treatment, high/intermediate-risk and duration-of-treatment guides.
- Choosing Wisely Canada respiratory/primary-care antibiotic stewardship resources.

## Completion note

With batches 39A–39D, every Respiratory concept emitted by `generate-np-parity-expansion-catalog.mjs` now has a dedicated CNPLE Cram authoring identity. Remaining respiratory work is downstream structural/manifest reconciliation, Full-source anchoring, Bottom Line evidence, Quick Check certification, runtime integrity and learner rendering—not missing respiratory authoring.

## Publication boundary

Clinical authoring second pass only. No merge/deploy claim is made.
