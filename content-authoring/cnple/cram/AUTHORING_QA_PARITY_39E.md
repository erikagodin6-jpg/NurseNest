# CNPLE Cram V2 — Parity Batch 39E Clinical Second Pass

Date: 2026-08-09
Scope: `39e-respiratory-copd-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-copd-diagnosis-gold-staging-and-management`

The ID is the literal legacy Full-lesson slug emitted by the canonical NP parity generator. The learner-facing title/content intentionally use current Canadian Thoracic Society framing rather than treating the word `GOLD` in the legacy slug as the Canadian clinical authority.

## Clinical review

PASS. COPD diagnosis requires persistent post-bronchodilator obstruction in an appropriate exposure/clinical context. Symptom and exacerbation burden are separated from FEV1 severity. Long-acting bronchodilators, pulmonary rehabilitation, smoking cessation and vaccination are core care; inhaled corticosteroid-containing therapy is selective and tied to exacerbation/eosinophil/asthma phenotype rather than automatic use.

Acute exacerbation teaching distinguishes routine flare from pneumonia, heart failure, PE and pneumothorax. Hypercapnic/hypoxemic respiratory failure, hemodynamic instability and failure of initial therapy are explicit escalation triggers.

## Canadian source refresh

Load-bearing sources rechecked on 2026-08-09:

- Canadian Thoracic Society **2023 Guideline on Pharmacotherapy in Patients with Stable COPD** — listed as current in the 2026 CTS Guideline Library.
- Canadian Thoracic Society current COPD tools/guideline catalogue and 2025 alpha-1 antitrypsin deficiency guideline for atypical/early disease context.

No GOLD-specific drug algorithm or threshold is presented as Canadian policy merely because the canonical Full slug contains `gold-staging`.

## Respiratory generator accounting

With audited batches 39A, 39B, 39C, 39D and 39E, all 25 Respiratory concept identities emitted by `generate-np-parity-expansion-catalog.mjs` now have dedicated exact-ID CNPLE Cram authoring records.

This is **Respiratory generator authoring parity only**. It does not prove that the full current `ca-np-cnple` catalogue contains no additional respiratory identities from other source families, and it does not satisfy downstream runtime gates.

## Publication boundary

Structural JSON validation, manifest registration, current Full-source anchoring, Bottom Line evidence, exactly three eligible Quick Checks, runtime recipe integrity, learner rendering, merge and deployment remain downstream fail-closed gates.
