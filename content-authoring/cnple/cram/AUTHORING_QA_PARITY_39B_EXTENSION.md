# CNPLE Cram V2 — Parity Batch 39B Specialty Extension Clinical Second Pass

Date: 2026-08-09
Scope: `39b-respiratory-specialty-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-lung-cancer-screening-criteria-and-follow-up`
- `np-pulmonary-nodule-evaluation-and-follow-up`
- `np-pleural-effusion-differential-diagnosis-and-workup`

All are literal Full slugs emitted by the canonical NP parity generator.

## Clinical review

### Lung cancer screening
PASS. Screening is limited to asymptomatic high-risk patients through current provincial/territorial organized programs. Symptomatic suspected cancer is explicitly moved to diagnosis. No stale universal Canada-wide age/pack-year rule is taught.

### Pulmonary nodule
PASS. Management is based on prior imaging, malignancy probability, size/morphology/growth and screening-vs-incidental context. No one-size-fits-all follow-up interval is invented, and closed-loop ownership is mandatory.

### Pleural effusion
PASS. The lesson separates clear responding transudative presentations from unilateral, atypical, febrile, malignant or unexplained effusions that require sampling. Complicated parapneumonic effusion/empyema is correctly treated as drainage/source-control disease rather than repeated outpatient observation.

## Current Canadian source refresh

Rechecked 2026-08-09:

- Ontario Health/Cancer Care Ontario Lung Screening Program: current organized screening uses referral plus risk assessment; symptomatic people with suspected lung cancer are not routed through screening.
- PHAC launched the National Advisory Committee on Preventive Health Services in June 2026; therefore no former federal task-force recommendation is presented as a universal current Canada-wide operational program.
- Current Canadian thoracic radiology/respirology and pleural-care principles are used for nodule and effusion follow-up where local program details vary.

## Publication boundary

Clinical authoring second pass only. Manifest registration, global JSON/field validation, current Full-source anchoring, Bottom Line evidence, exactly three gradeable Quick Checks, runtime certification, learner rendering, merge and deployment remain downstream fail-closed gates.
