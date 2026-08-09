# CNPLE Cram V2 — Parity Batch 39C Core Clinical Second Pass

Date: 2026-08-09
Scope: `39c-respiratory-core-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact Full identities

- `np-asthma-diagnosis-and-stepwise-management`
- `np-copd-diagnosis-gold-staging-and-management`
- `np-pneumonia-cap-versus-hap-diagnosis-and-treatment`
- `np-pulmonary-embolism-risk-stratification-and-treatment`

All are literal slugs emitted by the canonical NP parity generator.

## Clinical review

### Asthma
PASS. Diagnosis requires a compatible variable symptom pattern plus objective evidence when feasible. ICS-containing therapy is foundational, LABA monotherapy is explicitly rejected, and technique/adherence/trigger review precedes escalation.

### COPD
PASS. Persistent airflow obstruction is required in the appropriate exposure/clinical context. Current CTS pharmacotherapy principles are followed; ICS is not universal and chronic oral corticosteroids are not taught for stable COPD.

### Pneumonia
PASS. Setting, severity and resistant-organism risk determine empiric therapy and disposition. CAP, hospital-associated exposure, acute bronchitis, aspiration pneumonitis, PE and heart failure are separated. Antibiotic de-escalation and duration stewardship are explicit.

### Pulmonary embolism
PASS. Pretest probability precedes D-dimer; positive D-dimer is not diagnostic; high-probability presentations proceed to appropriate imaging. Hemodynamic stability, RV strain and bleeding risk drive treatment/disposition, and thrombolysis is not routine for stable low-risk PE.

## Current Canadian source refresh

Rechecked 2026-08-09:

- Canadian Thoracic Society current asthma guideline/focused update.
- Canadian Thoracic Society 2023 stable-COPD pharmacotherapy guideline and current COPD tools.
- Choosing Wisely Canada respiratory antimicrobial stewardship principles.
- Thrombosis Canada pulmonary embolism/VTE clinical guides.

## Publication boundary

Clinical authoring second pass only. Manifest registration, structural JSON/global-ID validation, current Full-source anchors, Bottom Line evidence, exactly three eligible Quick Checks, runtime recipe certification, learner rendering, merge and deployment remain downstream fail-closed gates.
