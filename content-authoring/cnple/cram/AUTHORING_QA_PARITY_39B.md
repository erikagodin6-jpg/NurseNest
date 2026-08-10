# CNPLE Cram V2 — Parity Batch 39B Clinical Second Pass

Date: 2026-08-10
Scope: `39b-respiratory-diagnostics-procedures-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact Full identities
- `np-pulmonary-function-test-interpretation`
- `np-oxygen-therapy-indications-and-prescribing`
- `np-thoracentesis-indications-and-complications`
- `np-pulmonary-nodule-evaluation-and-follow-up`
- `np-interstitial-lung-disease-recognition-and-referral`
- `np-occupational-lung-disease-evaluation`

These are produced by the canonical NP parity generator's `np-${slugify(concept)}` rule. Private-core must still confirm them in the current public-complete CNPLE denominator.

## Clinical second-pass findings

- **PFT interpretation:** PASS. Test quality, obstruction/restriction/diffusion physiology and clinical correlation are explicit. Restriction is not diagnosed from low FVC alone. Current CTS PFT equity guidance is respected.
- **Oxygen therapy:** PASS. Oxygen treats hypoxemia, not breathlessness alone. Acute titration is separated from stable long-term oxygen eligibility and hypercapnia risk is explicit.
- **Thoracentesis:** PASS. Indication/question, image guidance, pleural-fluid studies, complications and procedural-scope boundaries are explicit. No universal anticoagulant hold interval is invented.
- **Pulmonary nodule:** PASS. Prior imaging, malignancy probability, morphology/growth, screening-vs-incidental pathways and closed-loop surveillance are explicit. Endless CT surveillance and reflex biopsy are rejected.
- **ILD:** PASS. Exposure/medication/autoimmune history, HRCT, complete PFTs and specialist multidisciplinary classification are explicit. Empiric chronic corticosteroids for undifferentiated fibrotic ILD are rejected; current CTS infection-screening-before-immunosuppression guidance is incorporated.
- **Occupational lung disease:** PASS. Work/off-work timing, objective testing, exposure control and occupational-medicine/referral pathways are explicit. The archived 1998 CTS occupational-asthma guideline is not represented as current operational guidance.

## Source refresh
Rechecked 2026-08-10 against the Canadian Thoracic Society current Guideline Library, PFT resources, ILD guidance, COPD/home-ventilation resources and current CTS status labels. Local oxygen programs, thoracentesis procedural governance, nodule pathways and occupational reporting vary by province/territory and remain `localPolicyCheck` items.

## Publication boundary
Clinical authoring only. JSON/schema validation, current Full identity, point-level Full-source anchors, Bottom Line evidence, exactly three eligible Quick Checks, runtime recipe certification, learner render QA, merge and deployment remain separate fail-closed gates.
