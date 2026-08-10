# CNPLE Cram V2 — Parity Batch 41C Clinical Second Pass

Date: 2026-08-09
Scope: `41c-neurological-specialty-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract
- `np-migraine-prophylaxis-and-abortive-therapy`
- `np-neuroimaging-in-clinical-neurology`
- `np-neuromuscular-junction-disorders`
- `np-movement-disorders-beyond-parkinson-disease`
- `np-neurologic-manifestations-of-systemic-disease`

## Clinical review
- Migraine: PASS. Typical migraine remains a clinical diagnosis; red flags switch to secondary-headache workup; current CHS 2024 prevention options, CGRP-targeting therapy and medication-overuse prevention are represented.
- Neuroimaging: PASS. Modality follows the question; routine imaging is rejected for uncomplicated migraine/syncope/known epilepsy/radiculopathy; posterior-fossa/vascular limitations of CT are explicit.
- Neuromuscular junction disorders: PASS. MG, Lambert-Eaton and botulism are separated by fatigability, reflexes, autonomic/pupillary findings and context; respiratory/bulbar compromise is emergent.
- Movement disorders: PASS. Phenomenology precedes disease label; medication-induced dystonia/parkinsonism/akathisia/tardive syndromes and acute red flags are explicit.
- Systemic neurologic disease: PASS. Neurologic localization precedes systemic cause testing; glucose/electrolyte/renal/hepatic/infectious/medication causes are handled before indiscriminate neurologic panels.

## Neurological generator accounting
The canonical NP generator emits 25 Neurological identities. Batches 41A (8), 41B (8) and 41C (5) add 21 exact-ID records. Four generator concepts were already represented by earlier reviewed CNPLE Cram content and are not duplicated here: broad headache differential/management, tension-type headache, cluster headache, and neurologic syncope. Those earlier records require their existing explicit/full-identity adjudication to remain authoritative during private-core reconciliation.

## Canadian source refresh
Rechecked 2026-08-09 against Canadian Headache Society 2024 migraine-prevention guidance; Choosing Wisely Canada Headache/Neurology/Radiology recommendations; Canadian Stroke Best Practices; Canadian movement/neuromuscular practice resources.

## Publication boundary
Clinical authoring PASS only. The four inherited concept mappings plus all new exact identities still require global parse/count/ID validation, current Full reconciliation, Full-source anchors, Bottom Line evidence, three eligible Quick Checks, runtime recipe certification, learner render QA, merge and deployment.
