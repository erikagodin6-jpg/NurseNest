# CNPLE Cram V2 — Parity Batch 39B Clinical Second Pass

Date: 2026-08-09
Scope: `39b-respiratory-diagnostics-procedures-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-pulmonary-function-test-interpretation`
- `np-oxygen-therapy-indications-and-prescribing`
- `np-respiratory-infection-in-immunocompromised-host`
- `np-thoracentesis-indications-and-complications`
- `np-occupational-lung-disease-evaluation`

These IDs are literal slugs from the canonical NP parity generator.

## Clinical review

### Pulmonary function testing
PASS. The lesson requires test quality first, separates obstruction from restriction, requires lung volumes to confirm true restriction, and prevents bronchodilator response or DLCO from becoming stand-alone diagnoses.

### Oxygen prescribing
PASS. Oxygen is explicitly a treatment for hypoxemia rather than dyspnea. Acute oxygen is separated from long-term home-oxygen qualification; carbon-dioxide retention risk is assessed where relevant and oxygen is reassessed/weaned after acute illness.

### Immunocompromised-host respiratory infection
PASS. The lesson ties risk to the specific immune deficit, broadens opportunistic and noninfectious differentials, supports early CT/specialized sampling when justified and does not delay time-critical empiric treatment in unstable high-risk patients.

### Thoracentesis
PASS. The procedure must answer a diagnostic or symptom-management question. Ultrasound/local procedure safety is preserved, pleural studies are differential-driven, anticoagulant hold rules are not invented universally, and pneumothorax/bleeding/re-expansion complications are explicit.

### Occupational lung disease
PASS. The occupational history is detailed enough to establish exposure timing and intensity, work-related asthma is not assumed merely because a patient works, exposure control is part of treatment, and occupational/respirology referral is triggered when the exposure-disease relationship is complex.

## Canadian source refresh

Load-bearing sources rechecked on 2026-08-09:

- Canadian Thoracic Society current Guideline Library and pulmonary-function testing resources, including current interpretation statements and COPD spirometry tools.
- Canadian Thoracic Society assemblies/working groups, including Chest Procedures, Interstitial Lung Disease, Pulmonary Vascular Disease and Canadian Respiratory Health Professionals.
- Canadian respiratory/home-oxygen program principles for long-term oxygen qualification and reassessment.
- Canadian infectious-disease and occupational lung disease practice principles where no single current national CTS CPG publicly specifies an operational threshold.

## Authoring gates

- Required Cram fields: present in all five records.
- Canadian/SI framing: PASS.
- US-only exam/regulatory framing: none intentionally authored.
- Universal oxygen, anticoagulant-hold or procedure thresholds invented: none.
- Red flags/escalation: present in all five.
- Specialist/local-protocol boundaries: explicit.

## Publication boundary

Clinical authoring second pass only. Structural JSON/required-field validation, exact current Full-source anchoring, Bottom Line evidence, three eligible Quick Checks, runtime recipe integrity, learner rendering, merge and deployment remain downstream fail-closed gates.
