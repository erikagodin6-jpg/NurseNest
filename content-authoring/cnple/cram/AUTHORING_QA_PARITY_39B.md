# CNPLE Cram V2 — Parity Batch 39B Clinical Second Pass

Date: 2026-08-08  
Scope: `39b-respiratory-diagnostics-prevention-parity.json`  
Result: **PASS — clinical authoring second pass**

## Exact identity set

- `np-pulmonary-function-test-interpretation`
- `np-thoracentesis-indications-and-complications`
- `np-allergic-rhinitis-and-sinusitis-management`
- `np-acute-bronchitis-versus-pneumonia-differentiation`
- `np-pneumonia-cap-versus-hap-diagnosis-and-treatment`
- `np-lung-cancer-screening-criteria-and-follow-up`
- `np-occupational-lung-disease-evaluation`
- `np-pulmonary-nodule-evaluation-and-follow-up`

All IDs are literal `np-${slugify(concept)}` outputs from the canonical NP parity generator.

## Clinical audit

### PFT interpretation
PASS. Test quality precedes interpretation; obstruction, lung-volume-confirmed restriction and diffusion capacity are separated. Low FVC alone is not labelled restriction.

### Thoracentesis
PASS. Diagnostic versus therapeutic indication, ultrasound-guided site selection, pleural-fluid question selection and pneumothorax/bleeding/re-expansion risk are explicit. Periprocedural anticoagulant decisions remain drug/context/local-policy specific.

### Rhinitis/sinusitis and bronchitis/pneumonia
PASS. Coloured mucus/sputum is not used as proof of bacterial infection. Most uncomplicated acute bronchitis remains non-antibiotic care; pneumonia probability is driven by vitals, oxygenation, focal findings, risk and trajectory. Bacterial sinusitis uses persistence/severity/double-worsening patterns.

### CAP versus HAP
PASS. Acquisition setting, severity and resistant-pathogen risk are separated. Positive respiratory culture is not equated with pneumonia without a compatible syndrome, and broad HAP therapy is not imported into ordinary CAP.

### Lung cancer screening
PASS. Screening is restricted to asymptomatic high-risk patients through the current provincial/territorial organized pathway. Hemoptysis, unexplained major weight loss, suspicious known nodules and metastatic symptoms switch to diagnostic evaluation.

### Occupational lung disease
PASS. Exposure history extends beyond occupational asthma to pneumoconiosis, hypersensitivity pneumonitis, toxic inhalation and chronic occupational airway/cancer risk. Treatment cannot substitute for exposure control.

### Pulmonary nodule
PASS. Nodule surveillance is distinct from screening. Risk, morphology, growth, prior imaging and patient factors determine follow-up; every nodule needing surveillance has a date and owner.

## Current Canadian source anchors rechecked

- Canadian Thoracic Society guideline library: current Pulmonary Function Testing resources.
- Choosing Wisely Canada respiratory/antimicrobial stewardship resources: uncomplicated bronchitis generally does not benefit from antibiotics.
- Cancer Care Ontario / Ontario Lung Screening Program 2026: organized LDCT screening eligibility, risk assessment and explicit separation of screening from symptomatic/known-nodule diagnostic pathways.
- Canadian thoracic/occupational/pleural practice principles.

## Publication boundary

Clinical second-pass PASS only. Ordered manifest registration, global JSON/required-field/identity validation, exact-current-Full reconciliation, source anchors, three lesson-linked gradeable Quick Checks, shared Cram certification and learner Full/Cram rendering remain mandatory.
