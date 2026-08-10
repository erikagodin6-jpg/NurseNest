# CNPLE Cram V2 — Parity Batch 39D Clinical Second Pass

Date: 2026-08-10
Scope: `39d-respiratory-common-conditions-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact Full identities
- `np-asthma-diagnosis-and-stepwise-management`
- `np-copd-diagnosis-gold-staging-and-management`
- `np-pneumonia-cap-versus-hap-diagnosis-and-treatment`
- `np-pulmonary-embolism-risk-stratification-and-treatment`
- `np-lung-cancer-screening-criteria-and-follow-up`

Together with the surviving 39A–39C artifacts, these close the 25-concept Respiratory section of the canonical NP parity generator at the clinical-authoring layer without duplicate Cram identities.

## Clinical review
- **Asthma:** objective diagnosis, ICS-containing therapy, technique/adherence before escalation, LABA-monotherapy prohibition and severe-asthma referral are explicit.
- **COPD:** post-bronchodilator spirometry confirmation, symptom/exacerbation-driven therapy, selective ICS use, smoking cessation/pulmonary rehabilitation and stable-state oxygen distinction are explicit.
- **Pneumonia:** objective syndrome plus severity and pathogen/resistance risk; broad-spectrum therapy is not triggered solely by generic prior health-care contact.
- **Pulmonary embolism:** probability drives D-dimer/imaging; hemodynamics and physiologic severity drive disposition/reperfusion. Biomarker/RV-strain findings do not by themselves justify thrombolysis.
- **Lung cancer screening:** screening is for asymptomatic high-risk patients using current organized provincial/territorial pathways; hemoptysis, weight loss and other alarm symptoms switch to a diagnostic pathway.

## Current Canadian source refresh
Rechecked 2026-08-10 against current Canadian Thoracic Society asthma and COPD guidance, Thrombosis Canada PE guidance, Choosing Wisely Canada respiratory antimicrobial stewardship, Canadian Cancer Society/provincial lung-screening pathways, and current Canadian preventive-health governance.

## Publication boundary
Clinical authoring only. Manifest registration, JSON/schema validation, exact current Full identity, Full-source anchors, Bottom Line evidence, exactly three eligible Quick Checks, runtime recipe certification, learner render QA, merge and deployment remain separate fail-closed gates.
