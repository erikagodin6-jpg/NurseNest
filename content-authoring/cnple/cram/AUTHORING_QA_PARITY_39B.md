# CNPLE Cram V2 — Parity Batch 39B Clinical Second Pass

Date: 2026-08-10
Scope: `39b-respiratory-diagnostics-procedures-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact Full identities

- `np-pulmonary-function-test-interpretation`
- `np-oxygen-therapy-indications-and-prescribing`
- `np-pulmonary-nodule-evaluation-and-follow-up`
- `np-interstitial-lung-disease-recognition-and-referral`
- `np-occupational-lung-disease-evaluation`
- `np-lung-cancer-screening-criteria-and-follow-up`
- `np-acute-bronchitis-versus-pneumonia-differentiation`

These follow the canonical NP parity generator's `np-${slugify(concept)}` identity rule. Private-core must still confirm each in the current public-complete `ca-np-cnple` denominator before runtime certification.

## Clinical second-pass findings

### PFT interpretation
PASS. Test quality, obstruction/restriction/diffusion physiology and clinical correlation are explicit. Restriction is not diagnosed from low FVC alone; one poor-quality study cannot justify treatment escalation.

### Oxygen therapy
PASS. Oxygen treats hypoxemia rather than dyspnea itself. Acute titration is separated from stable long-term oxygen eligibility, hypercapnia risk is explicit, and severe hypoxemia is not left untreated from fear of CO2 retention.

### Pulmonary nodule
PASS. Prior imaging, morphology, growth, malignancy probability and patient treatment fitness determine surveillance vs PET/biopsy/referral. Screening and incidental-nodule pathways are separated and follow-up ownership is explicit.

### Interstitial lung disease
PASS. Exposure/medication/autoimmune history, HRCT, complete PFTs and specialist subtype classification are explicit. Empiric chronic corticosteroids for undifferentiated fibrotic ILD are rejected; current CTS infection-screening-before-immunosuppression guidance is incorporated.

### Occupational lung disease
PASS. The work history includes tasks, agents, exposure timing and work/off-work relationships. Objective testing and exposure control are prioritized over medication escalation. The archived 1998 occupational-asthma guideline is not represented as current operational guidance.

### Lung-cancer screening
PASS. Screening is restricted to eligible asymptomatic high-risk patients under the current jurisdictional program. Hemoptysis, unexplained weight loss, persistent focal symptoms or a suspicious nodule trigger diagnostic evaluation rather than a screening interval.

### Acute bronchitis vs pneumonia
PASS. Coloured sputum is not treated as proof of bacterial infection. Pneumonia probability is based on vital signs, oxygenation, focal findings, host risk and clinical course; uncomplicated bronchitis is not routinely treated with antibiotics.

## Current Canadian source refresh

Rechecked 2026-08-10:

- Canadian Thoracic Society current Guideline Library and respiratory assemblies, including current ILD infection-screening guidance and current pulmonary-function/home-respiratory resources.
- Cancer Care Ontario current Lung Cancer Pathway Maps and Ontario Lung Screening resources; other provinces/territories use their own current screening pathways.
- Choosing Wisely Canada Cold Standard respiratory/antibiotic stewardship recommendations.
- Provincial/territorial oxygen, occupational-health and nodule pathways remain local-policy dependent.

## Safety / authoring gates

- All required Cram fields editorially present: PASS.
- Exact canonical generator identity convention: PASS.
- No duplicate identity with 39A: PASS.
- Canadian framing / no US exam substitution: PASS.
- Screening-vs-diagnostic separation: PASS.
- No fabricated universal PFT, oxygen, nodule, screening or antibiotic thresholds: PASS.
- Emergency red flags and follow-up ownership present throughout: PASS.

## Publication boundary

Clinical authoring only. JSON/schema validation, current Full identity, point-level Full-source anchors, Bottom Line evidence, exactly three eligible Quick Checks, runtime recipe certification, learner render QA, merge and deployment remain separate fail-closed gates.
