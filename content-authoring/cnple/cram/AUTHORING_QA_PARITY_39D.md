# CNPLE Cram V2 — Parity Batch 39D Clinical Second Pass

Date: 2026-08-09
Scope: `39d-respiratory-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-interstitial-lung-disease-recognition-and-referral`
- `np-tuberculosis-screening-and-treatment`
- `np-lung-cancer-screening-criteria-and-follow-up`
- `np-allergic-rhinitis-and-sinusitis-management`
- `np-acute-bronchitis-versus-pneumonia-differentiation`
- `np-asthma-diagnosis-and-stepwise-management`

All IDs are literal slugs emitted by the canonical NP parity generator.

## Clinical review

### Interstitial lung disease
PASS. Restrictive physiology is not equated with ILD without confirmation; HRCT/PFT pattern, exposure/medication/autoimmune causes and early specialty classification are explicit. Infection screening precedes significant immunosuppression when indicated.

### Tuberculosis
PASS. TB infection testing is separated from active disease. Active pulmonary TB is excluded before preventive treatment, and suspected infectious disease triggers airborne/public-health/microbiologic action through current Canadian TB pathways.

### Lung-cancer screening
PASS. Organized screening is limited to asymptomatic high-risk patients using the current jurisdictional program. Hemoptysis, unexplained weight loss or suspicious imaging triggers diagnostic rather than screening management.

### Allergic rhinitis / sinusitis
PASS. Allergic rhinitis uses intranasal therapy/trigger management. Most acute rhinosinusitis is viral/self-limited; coloured discharge alone does not justify antibiotics. Orbital/intracranial complication red flags are explicit.

### Acute bronchitis vs pneumonia
PASS. Uncomplicated bronchitis is treated as usually viral and self-limited; pneumonia probability is driven by vitals, oxygenation, focal findings and host risk rather than sputum colour. Chest imaging is targeted.

### Asthma
PASS. Diagnosis requires a compatible variable symptom pattern plus objective variable airflow evidence when feasible. ICS-containing therapy is preserved, LABA monotherapy is rejected, and step-up follows diagnosis/technique/adherence review.

## Canadian source refresh

Load-bearing sources rechecked on 2026-08-09:

- Canadian Thoracic Society current Guideline Library, including 2021 asthma guidance, current ILD position statements and 2026 infection-screening guidance before immunosuppression.
- Canadian Tuberculosis Standards, 8th edition, and Public Health Agency of Canada TB resources.
- Ontario Health (Cancer Care Ontario) Ontario Lung Screening Program and diagnostic-boundary resources.
- Choosing Wisely Canada respiratory/primary-care antimicrobial stewardship resources.

## Authoring gates

- Required Cram fields: present in all six records by editorial review.
- Canadian/SI framing: PASS.
- Screening vs diagnostic evaluation: PASS.
- TB infection vs active disease separation: PASS.
- Antibiotic stewardship: PASS.
- Red flags/escalation: present in all six.

## Completion boundary

This batch does **not** declare Respiratory parity complete. Several exact generator identities still require dedicated accounting or mapping, including COPD and other already-covered broad topics whose existing Cram objects may not yet use the canonical Full slug. Completion requires the reverse-coverage gate—not topic-family confidence.

## Publication boundary

Clinical authoring second pass only. Structural JSON validation, exact current Full-source anchoring, Bottom Line evidence, three eligible Quick Checks, runtime recipe integrity, learner rendering, merge and deployment remain downstream fail-closed gates.
