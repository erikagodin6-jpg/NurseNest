# CNPLE Cram V2 — Parity Batch 39B Clinical Second Pass

Date: 2026-08-09
Scope: `39b-respiratory-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

Each record uses the literal canonical Full-lesson slug emitted by `generate-np-parity-expansion-catalog.mjs`:

- `np-pulmonary-function-test-interpretation`
- `np-oxygen-therapy-indications-and-prescribing`
- `np-pulmonary-nodule-evaluation-and-follow-up`
- `np-respiratory-infection-in-immunocompromised-host`
- `np-thoracentesis-indications-and-complications`
- `np-occupational-lung-disease-evaluation`

## Clinical review

### Pulmonary function testing
PASS. Test quality comes first; obstruction is separated from low FEV1, total lung capacity is required before calling true restriction, bronchodilator response is not a stand-alone asthma diagnosis and DLCO remains physiologic evidence rather than a disease label.

### Oxygen prescribing
PASS. Oxygen is treatment for hypoxemia rather than dyspnea alone. Oxygenation is separated from ventilation failure, acute oxygen is separated from stable long-term home-oxygen qualification, and patients at risk of hypercapnia are assessed for ventilation rather than simply having needed oxygen withdrawn.

### Pulmonary nodule
PASS. Nodule management is risk-, morphology- and growth-based. Screening is explicitly separated from diagnostic evaluation; hemoptysis, unexplained weight loss or an already-surveilled nodule moves the patient out of routine screening logic. Follow-up ownership is explicit.

### Immunocompromised-host respiratory infection
PASS. The lesson ties risk to the specific immune deficit, broadens opportunistic and noninfectious differentials, supports earlier imaging/specialized sampling when justified and does not delay time-critical empiric treatment in unstable high-risk patients.

### Thoracentesis
PASS. The procedure must answer a diagnostic or symptom-management question. Ultrasound/local procedure safety is preserved, pleural studies are differential-driven, anticoagulant hold rules are not invented universally, and pneumothorax/bleeding/re-expansion complications are explicit.

### Occupational lung disease
PASS. Exposure chronology and objective work/off-work physiology are treated as diagnostic evidence. Medication does not substitute for exposure control, and permanent employment advice is not given before adequate assessment unless ongoing exposure is immediately unsafe.

## Canadian source refresh

Load-bearing sources rechecked on 2026-08-09:

- Canadian Thoracic Society current Guideline Library and pulmonary-function-testing resources, including current PFT interpretation statements.
- Canadian Thoracic Society current pulmonary-vascular, COPD/home-respiratory and chest-procedure resource catalogue.
- Ontario Health (Cancer Care Ontario) Ontario Lung Screening Program eligibility/diagnostic boundaries, lung diagnostic pathways and pulmonary-nodule imaging resources.
- Canadian infectious-disease/transplant and occupational-health practice principles where no single current national CTS CPG specifies an operational threshold.

Where exact procedural thresholds, home-oxygen qualification rules, anticoagulant holds or nodule intervals vary by local protocol/risk model, the lessons intentionally require the current applicable pathway rather than inventing a universal Canadian rule.

## Authoring gates

- Required Cram fields: present in all six records by editorial review.
- Canadian/SI framing: PASS.
- Screening versus diagnostic evaluation: PASS.
- US-only exam/regulatory framing: none intentionally authored.
- Universal oxygen/procedure/drug thresholds invented: none.
- Red flags/escalation: present in all six.
- Specialist/local-protocol boundaries: explicit.

## Publication boundary

Clinical authoring second pass only. Structural JSON/required-field validation, exact current Full-source anchoring, Bottom Line evidence, three eligible Quick Checks, runtime recipe integrity, learner rendering, merge and deployment remain downstream fail-closed gates.
