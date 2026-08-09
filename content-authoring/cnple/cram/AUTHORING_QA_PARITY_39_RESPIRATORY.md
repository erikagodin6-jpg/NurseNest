# CNPLE Cram V2 — Respiratory Parity Batch 39 Clinical Second Pass

Date: 2026-08-09
Scope: `39a-respiratory-advanced-parity.json` + `39b-respiratory-infectious-procedure-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact Full-lesson identities

The batch uses canonical NP generator slugs:

- `np-bronchiectasis-diagnosis-and-management`
- `np-pulmonary-hypertension-recognition-and-referral`
- `np-sarcoidosis-diagnosis-and-management`
- `np-cystic-fibrosis-adult-management-basics`
- `np-respiratory-infection-in-immunocompromised-host`
- `np-thoracentesis-indications-and-complications`
- `np-mechanical-ventilation-basics-for-np`
- `np-asthma-copd-overlap-syndrome-management`

## Clinical review

### Bronchiectasis
PASS. Structural disease is separated from recurrent uncomplicated pneumonia/COPD. Airway clearance, microbiology, underlying-cause workup, Pseudomonas/frequent-exacerbation risk and hemoptysis escalation are explicit. Long-term antimicrobial therapy is not presented as routine primary-care empiricism.

### Pulmonary hypertension
PASS. Echocardiographic probability is not treated as a complete hemodynamic diagnosis. Left-heart, lung/hypoxic, chronic thromboembolic and pulmonary arterial causes are separated, and PAH-specific therapy remains specialist/classification dependent.

### Sarcoidosis
PASS. Granulomatous mimics—especially TB, fungal infection and malignancy—must be excluded. Observation is preserved for appropriate low-risk disease, while cardiac, neurologic, ocular and severe calcium/pulmonary involvement trigger urgent specialty care.

### Adult cystic fibrosis
PASS. Care is anchored to Canadian multidisciplinary CF-centre continuity. Pulmonary exacerbation is defined as change from baseline; prior microbiology, airway-clearance therapy, CFTR-modulator continuity, nutrition/CFRD/liver disease and major pulmonary complications are integrated.

### Respiratory infection in immunocompromise
PASS. The pathogen differential is driven by the immune defect and timing. Absence of fever is not reassuring; bacterial, viral, fungal, mycobacterial and opportunistic infection are distinguished from noninfectious mimics. Hypoxemia, neutropenia and rapid progression escalate early.

### Thoracentesis
PASS. Diagnostic versus therapeutic indications are separated. Ultrasound localization, clinically targeted pleural studies, anticoagulation/procedure-policy variability and pneumothorax/bleeding/re-expansion complications are explicit. Routine tapping of every small bilateral HF effusion is rejected.

### Mechanical ventilation
PASS. Patient-first troubleshooting, oxygenation versus ventilation, airway/circuit causes of alarms and critical complications are emphasized. Ventilator settings are not taught as one-number reflex adjustments, and lung-protective principles are preserved.

### Asthma–COPD overlap
PASS. The lesson protects the asthma safety principle: clinically meaningful asthma features require an inhaled-corticosteroid-containing strategy; LABA monotherapy is not acceptable for asthma biology. Fixed obstruction, exacerbation burden, smoking/exposure and inhaler technique remain part of the COPD side of the problem.

## Canadian source refresh

Load-bearing sources rechecked 2026-08-09:

- Canadian Thoracic Society current asthma/COPD and respiratory specialty guidance.
- Cystic Fibrosis Canada national standards/guidelines, including Canadian Guidelines for Cystic Fibrosis Care and pulmonary-exacerbation guidance.
- Canadian cardiopulmonary specialty practice for pulmonary vascular disease, pleural procedures and ventilation.
- Canadian infectious-disease/oncology/transplant practice for respiratory infection in immunocompromised hosts.

## Authoring gates

- No US exam-framework language intentionally authored: PASS.
- Canadian/SI instructional framing: PASS.
- No fabricated universal drug, ventilator, anticoagulant-hold or procedural thresholds: PASS.
- Red flags/escalation present in every record: PASS.
- `localPolicyCheck` enabled where specialty/procedural implementation varies: PASS.

## Publication boundary

This PASS certifies clinical authoring only. Private-core still owns current Full-lesson identity reconciliation, JSON/required-field validation, source anchoring for every Cram point and Bottom Line, exactly three eligible lesson-linked Quick Checks, shared Cram integrity certification, learner rendering, merge and deployment.
