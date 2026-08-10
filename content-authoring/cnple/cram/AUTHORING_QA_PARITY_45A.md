# CNPLE Cram V2 — Parity Batch 45A Clinical Second Pass

Date: 2026-08-09
Scope: `45a-neurology-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-essential-tremor-evaluation-and-treatment`
- `np-myasthenia-gravis-diagnosis-and-management`
- `np-carpal-tunnel-syndrome-diagnosis-and-management`
- `np-cervical-radiculopathy-evaluation`
- `np-neuroimaging-in-clinical-neurology`
- `np-neuromuscular-junction-disorders`
- `np-movement-disorders-beyond-parkinson-disease`
- `np-neurologic-manifestations-of-systemic-disease`

All IDs are literal slugs emitted by the canonical NP parity generator.

## Clinical review

### Essential tremor
PASS. Action/postural phenomenology precedes testing; parkinsonian, cerebellar, medication and metabolic mimics are explicit. Imaging is not routine for a classic stable syndrome with a normal neurologic examination.

### Myasthenia gravis
PASS. Fatigable ocular/bulbar/proximal weakness and preserved sensation are explicit. Possible crisis is treated as a ventilation/bulbar-safety problem; pulse oximetry is not used to rule out impending ventilatory failure. Medication triggers and thymic evaluation are preserved.

### Carpal tunnel syndrome
PASS. Median-nerve localization comes before electrodiagnostic/imaging testing. Thenar weakness/atrophy changes urgency and peripheral/cervical mimics remain in the differential.

### Cervical radiculopathy
PASS. Root localization, conservative care and reassessment are explicit. Myelopathy, progressive motor loss, bowel/bladder dysfunction, cancer/infection and major trauma trigger urgent imaging/referral; severe pain alone does not.

### Neuroimaging
PASS. CT/MRI/no-imaging decisions are tied to a defined clinical question. Typical migraine/simple syncope/uncomplicated radiculopathy do not receive imaging for reassurance alone. Acute focal deficit, thunderclap headache, raised-ICP/infection/cancer/trauma contexts are treated as separate urgent pathways.

### Neuromuscular-junction disorders
PASS. Myasthenia, Lambert-Eaton and botulism are separated by fatigability, reflex/autonomic/pupil/exposure patterns. Respiratory/bulbar compromise is treated before confirmatory testing and suspected botulism retains urgent toxicology/public-health action.

### Other movement disorders
PASS. Phenomenology precedes disease naming. Chorea, dystonia, myoclonus, tics, akathisia and tardive/drug-induced movement are distinguished, and antipsychotic changes are not made reflexively without psychiatric risk review.

### Neurologic manifestations of systemic disease
PASS. Glucose/electrolyte/hepatic/renal/endocrine/infectious/autoimmune/malignant and medication causes are explicitly considered while focal stroke/seizure/CNS infection pathways remain protected.

## Canadian source refresh

Load-bearing sources rechecked on 2026-08-09:

- Choosing Wisely Canada Neurology recommendations (Canadian Neurological Society).
- Choosing Wisely Canada Headache and Radiology recommendations, including June 2026 radiology updates on low-value imaging and red-flag exceptions.
- Canadian Stroke Best Practices where acute focal-neurologic imaging applies.
- Canadian neuromuscular, movement-disorder, spine/hand and toxicology practice principles; international disease-specific consensus is used only where no current Canadian national CPG was identified and no foreign operational threshold is presented as Canadian policy.

## Authoring gates

- Required Cram fields: present in all eight records by editorial review.
- Canadian/SI framing: PASS.
- Localization-before-testing principle: PASS.
- Routine low-value neuroimaging avoided: PASS.
- Respiratory/bulbar neuromuscular red flags: PASS.
- Myelopathy/progressive deficit protection: PASS.
- US exam/regulatory framing: none intentionally authored.

## Publication boundary

Clinical authoring second pass only. Ordered V2 manifest registration, current Full-source and Bottom-Line anchors, exactly three eligible lesson-linked Quick Checks, runtime recipe certification, authenticated learner render QA, merge and deployment remain downstream fail-closed gates.
