# CNPLE Cram V2 — Parity Batch 39A Clinical Second Pass

Date: 2026-08-10
Scope: `39a-respiratory-advanced-parity.json`
Result: **PASS — clinical authoring second pass**

## Identity contract

All eight records use the exact slug rule of the canonical NP parity generator (`np-` + normalized concept):

- `np-bronchiectasis-diagnosis-and-management`
- `np-pulmonary-hypertension-recognition-and-referral`
- `np-sarcoidosis-diagnosis-and-management`
- `np-cystic-fibrosis-adult-management-basics`
- `np-respiratory-infection-in-immunocompromised-host`
- `np-thoracentesis-indications-and-complications`
- `np-mechanical-ventilation-basics-for-np`
- `np-asthma-copd-overlap-syndrome-management`

Private-core reconciliation must still prove these identities exist in the current public-complete `ca-np-cnple` denominator before runtime certification.

## Clinical review

### Bronchiectasis
PASS. Structural confirmation, etiologic workup, sputum microbiology and airway clearance are separated from routine empiric-antibiotic thinking. Long-term antimicrobial strategies remain specialty/protocol governed and chronic colonization is not treated as automatic acute infection.

### Pulmonary hypertension
PASS. Pulmonary hypertension is treated as a syndrome requiring classification. Left-heart, chronic lung/hypoxic and chronic thromboembolic causes are separated from pulmonary arterial hypertension. Echocardiography is not misrepresented as definitive invasive hemodynamics, and disease-specific vasodilators are not started empirically.

### Sarcoidosis
PASS. The lesson requires a compatible clinicoradiologic pattern plus exclusion of important mimics and tissue confirmation when needed. Cardiac, neurologic and ocular disease are explicit high-risk referral domains. Serum ACE is not used as a stand-alone diagnosis.

### Adult cystic fibrosis
PASS. Care is multidisciplinary and CF-centre coordinated. Airway clearance, longitudinal microbiology, CFTR modulators, nutrition, CF-related diabetes/liver/bone disease and transition/reproductive care are included. Routine COPD/bronchiectasis substitution is explicitly rejected.

### Respiratory infection in the immunocompromised host
PASS. The immune defect is defined before the pathogen differential. Muted fever/WBC responses do not reassure against serious infection. Opportunistic infection, drug pneumonitis, edema, malignancy and alveolar hemorrhage remain in the differential, and hypoxemia/neutropenia/transplant deterioration are explicit escalation triggers.

### Thoracentesis
PASS. The lesson requires a diagnostic or therapeutic purpose, imaging/ultrasound localization and a plan for pleural-fluid studies. Anticoagulation decisions remain individualized to urgency/bleeding risk/local policy. Pneumothorax, bleeding, re-expansion injury and empyema/source-control needs are explicit.

### Mechanical ventilation
PASS. The learner is taught patient-first ventilator deterioration assessment, oxygenation versus ventilation, airway resistance versus compliance, hemodynamic consequences of positive pressure, and escalation to the critical-care/RT team. No unsupported autonomous ventilator-prescribing scope is implied.

### Asthma-COPD overlap
PASS. The asthma component preserves inhaled-corticosteroid-containing therapy and rejects LABA monotherapy. Fixed obstruction is not treated as proof of COPD alone; quality spirometry and alternate diagnoses remain part of assessment.

## Current Canadian source refresh

Rechecked 2026-08-10:

- Canadian Thoracic Society Guideline Library and specialty assemblies: current asthma/COPD, pulmonary vascular, interstitial-lung, respiratory-procedure and Non-CF Bronchiectasis resources/working groups.
- Cystic Fibrosis Canada: current Canadian Guidelines for CF Care, Standards of Care program, pulmonary-exacerbation guidance and CFTR-modulator guidance.
- Public Health Agency of Canada: current respiratory-infection risk guidance identifying immunocompromised people as a high-risk group for severe respiratory infection.
- Canadian critical-care / respiratory-therapy practice standards for mechanical ventilation and acute respiratory deterioration.

## Safety / authoring gates

- All required Cram fields editorially present: PASS.
- Canadian framing / no US exam substitution: PASS.
- Specialist therapy boundaries explicit: PASS.
- No fabricated universal product-, culture-, hemodynamic-, procedure- or ventilator-specific thresholds: PASS.
- Emergency disposition/red flags present in all eight: PASS.
- Local/specialty policy variability flagged where appropriate: PASS.

## Publication boundary

This PASS covers clinical authoring only. JSON/schema validation, exact current Full identity, point-level Full-source anchors, Bottom Line evidence, exactly three eligible Quick Checks, runtime recipe certification, learner render QA, merge and deployment remain separate fail-closed gates.
