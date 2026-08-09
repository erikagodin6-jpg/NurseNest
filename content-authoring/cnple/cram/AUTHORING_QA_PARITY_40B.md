# CNPLE Cram V2 — Parity Batch 40B Clinical Second Pass

Date: 2026-08-09
Scope: `40b-neurology-diagnostics-neuromuscular-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-myasthenia-gravis-diagnosis-and-management`
- `np-bell-palsy-evaluation-and-treatment`
- `np-carpal-tunnel-syndrome-diagnosis-and-management`
- `np-low-back-pain-with-radiculopathy-management`
- `np-cervical-radiculopathy-evaluation`
- `np-vertigo-and-dizziness-differential-diagnosis`
- `np-neuroimaging-in-clinical-neurology`
- `np-neuromuscular-junction-disorders`
- `np-movement-disorders-beyond-parkinson-disease`
- `np-neurologic-manifestations-of-systemic-disease`

All are literal slugs from the canonical NP parity generator.

## Clinical second-pass findings

- Myasthenia gravis: fatigable/bulbar phenotype, medication triggers and respiratory strength are explicit; normal oxygen saturation is not used to exclude ventilatory failure.
- Bell palsy: isolated peripheral CN VII syndrome is separated from central/multicranial disease; corneal protection and early steroid treatment remain central.
- Carpal tunnel: median distribution and motor severity precede EMG/surgery; cervical and diffuse neuropathy mimics are preserved.
- Lumbar radiculopathy: routine early MRI is rejected without red flags; cauda equina, cancer, infection, fracture and progressive motor deficit change urgency.
- Cervical radiculopathy: cord/myelopathy signs (gait, dexterity, hyperreflexia, bowel/bladder) are explicit emergency/referral discriminators.
- Vertigo/dizziness: timing/triggers/exam reasoning, BPPV repositioning and stroke red flags are preserved; HINTS is limited to the correct acute vestibular syndrome and trained examiners.
- Neuroimaging: modality is selected by the clinical question; low-value imaging for stable migraine/simple syncope/established uncomplicated epilepsy is rejected.
- NMJ disorders: MG, Lambert-Eaton and botulism are separated by fatigability/facilitation/autonomic/pupil patterns; bulbar/respiratory failure drives disposition.
- Movement disorders: phenomenology precedes disease label; tardive/drug-induced and functional disorders are handled without stigmatizing or reflexive treatment.
- Systemic-disease neurology: localization precedes broad testing and focal neurologic emergencies are not explained away by chronic renal/hepatic/endocrine disease.

## Canadian source refresh

Rechecked 2026-08-09 against Choosing Wisely Canada Neurology/Emergency Medicine imaging recommendations, Canadian Stroke Best Practices imaging pathways, and current Canadian neurologic/neuromuscular practice resources. Stable physiologic principles are used where exact product/procedure thresholds are local or specialist specific.

## Publication boundary

Clinical authoring PASS only. Structural/global-identity validation, current Full reconciliation, source anchors, Bottom Line evidence, three eligible Quick Checks, runtime integrity and learner rendering remain fail-closed downstream gates.
