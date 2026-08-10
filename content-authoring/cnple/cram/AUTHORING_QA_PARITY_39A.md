# CNPLE Cram V2 — Parity Batch 39A Clinical Second Pass

Date: 2026-08-10
Scope: `39a-respiratory-specialty-parity.json`
Result: **PASS — clinical authoring second pass**

## Identity contract

All six records use the exact slug rule of the canonical NP parity generator (`np-` + normalized concept):

- `np-bronchiectasis-diagnosis-and-management`
- `np-pulmonary-hypertension-recognition-and-referral`
- `np-sarcoidosis-diagnosis-and-management`
- `np-cystic-fibrosis-adult-management-basics`
- `np-mechanical-ventilation-basics-for-np`
- `np-asthma-copd-overlap-syndrome-management`

Private-core reconciliation must still prove these identities exist in the current public-complete `ca-np-cnple` denominator before runtime certification.

## Clinical review

### Bronchiectasis
PASS. Structural confirmation, etiologic workup, sputum microbiology and airway clearance are separated from routine empiric-antibiotic thinking. Chronic macrolide therapy is specialist/protocol governed and nontuberculous-mycobacterial risk is preserved.

### Pulmonary hypertension
PASS. Pulmonary hypertension is treated as a syndrome requiring classification. Left-heart, chronic lung/hypoxic and chronic thromboembolic causes are separated from pulmonary arterial hypertension. Echocardiography is not misrepresented as definitive invasive hemodynamics, and disease-specific vasodilators are not started empirically.

### Sarcoidosis
PASS. The lesson requires a compatible clinicoradiologic pattern plus exclusion of important mimics and tissue confirmation when needed. Cardiac, neurologic and ocular disease are explicit high-risk referral domains. Serum ACE is not used as a stand-alone diagnosis.

### Adult cystic fibrosis
PASS. Care is multidisciplinary and CF-centre coordinated. Airway clearance, longitudinal microbiology, CFTR modulators, nutrition, CF-related diabetes/liver/bone disease and transition/reproductive care are included. Routine COPD/bronchiectasis substitution is explicitly rejected.

### Mechanical ventilation
PASS. The learner is taught patient-first ventilator deterioration assessment, oxygenation versus ventilation, airway resistance versus compliance, hemodynamic consequences of positive pressure, and escalation to the critical-care/RT team. No unsupported autonomous ventilator-prescribing scope is implied.

### Asthma-COPD overlap
PASS. The asthma component preserves inhaled-corticosteroid-containing therapy and rejects LABA monotherapy. Fixed obstruction is not treated as proof of COPD alone; quality spirometry and alternate diagnoses remain part of assessment.

## Current Canadian source refresh

Rechecked 2026-08-10:

- Canadian Thoracic Society Guideline Library: current asthma/COPD, pulmonary vascular disease, ILD and home-ventilation resources; pulmonary-hypertension statement remains listed as current.
- Canadian Thoracic Society assemblies/working groups: active Non-CF Bronchiectasis, Cystic Fibrosis and Pulmonary Vascular Disease groups.
- Cystic Fibrosis Canada: current Canadian Guidelines for CF Care, Standards of Care program and 2024 CFTR modulator consensus guidance.
- Canadian Critical Care Society: current mechanical-ventilation educational/guideline resources and national critical-care scope.

## Safety / authoring gates

- All required Cram fields editorially present: PASS.
- Canadian framing / no US exam substitution: PASS.
- Specialist therapy boundaries explicit: PASS.
- No fabricated universal product-, culture-, hemodynamic- or ventilator-specific thresholds: PASS.
- Emergency disposition/red flags present in all six: PASS.
- Local/specialty policy variability flagged where appropriate: PASS.

## Publication boundary

This PASS covers clinical authoring only. JSON/schema validation, exact current Full identity, point-level Full-source anchors, Bottom Line evidence, exactly three eligible Quick Checks, runtime recipe certification, learner render QA, merge and deployment remain separate fail-closed gates.
