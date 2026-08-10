# CNPLE Cram V2 — Parity Batch 39C Clinical Second Pass

Date: 2026-08-09
Scope: `39c-respiratory-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-pneumonia-cap-versus-hap-diagnosis-and-treatment`
- `np-pulmonary-embolism-risk-stratification-and-treatment`
- `np-sleep-apnea-diagnosis-and-cpap-management`
- `np-pleural-effusion-differential-diagnosis-and-workup`
- `np-hemoptysis-evaluation-and-management`
- `np-chronic-cough-diagnostic-algorithm`

All IDs are literal slugs emitted by the canonical NP parity generator. Pulmonary nodule remains in audited 39B. ILD, tuberculosis and lung-cancer screening are intentionally moved to 39D rather than duplicated here.

## Clinical review

### CAP versus HAP
PASS. Severity and acquisition context are separated; recent microbiology/antibiotic exposure and local resistance guide empiric therapy. Aspiration pneumonitis is not automatically treated as bacterial pneumonia and broad-spectrum therapy is reassessed/de-escalated.

### Pulmonary embolism
PASS. Pretest probability precedes D-dimer/CTPA; confirmed PE is then risk-stratified by hemodynamics, RV strain/biomarkers, bleeding risk and outpatient suitability. Intermediate-risk disease is not taught as automatic thrombolysis.

### Sleep apnea / CPAP
PASS. Screening questionnaires estimate risk rather than diagnose OSA. Sleep testing is required through the appropriate pathway, CPAP efficacy/adherence is reassessed, and sedatives/opioids/driving risk are included.

### Pleural effusion
PASS. Effusion is treated as a sign with transudative/exudative/infectious/malignant differentials. Diagnostic thoracentesis and fluid studies are question-driven; complicated parapneumonic disease requires drainage/source-control planning.

### Hemoptysis
PASS. Airway and hemodynamic threat define urgency more reliably than a memorized volume cutoff. The lesson separates pseudohemoptysis/hematemesis, includes malignancy/TB/bronchiectasis/PE, and does not use a normal chest radiograph as a universal stop rule.

### Chronic cough
PASS. The workup is stepwise and cause-based, includes ACE inhibitors and smoking/exposure, and prevents repeated empiric antibiotic or sedative-antitussive prescribing without a defensible diagnosis.

## Canadian source refresh

Load-bearing sources rechecked on 2026-08-09:

- Thrombosis Canada 2025 Pulmonary Embolism Diagnosis, Treatment and High-/Intermediate-Risk clinical guides.
- Canadian Thoracic Society current respiratory/sleep/cough resource catalogue.
- Choosing Wisely Canada respiratory antimicrobial and diagnostic stewardship principles.
- Canadian pleural-procedure and acute-care respiratory practice principles where exact operational rules vary locally.

No universal anticoagulant, oxygen, pleural-procedure, hemoptysis-volume or sleep-testing threshold is invented where the current Canadian/local pathway is context dependent.

## Authoring gates

- Required Cram fields: present in all six records by editorial review.
- Canadian/SI framing: PASS.
- PE pretest-probability and postdiagnosis risk logic: PASS.
- Antibiotic stewardship: PASS.
- Red flags and escalation: present in all six.

## Publication boundary

Clinical authoring second pass only. Structural parsing, exact current Full-source anchoring, Bottom Line evidence, exactly three eligible Quick Checks, runtime recipe integrity, learner rendering, merge and deployment remain downstream fail-closed gates.
