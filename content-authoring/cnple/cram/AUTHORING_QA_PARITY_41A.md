# CNPLE Cram V2 — Parity Batch 41A Clinical Second Pass

Date: 2026-08-09
Scope: `41a-neurological-core-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract
- `np-seizure-classification-and-antiepileptic-selection`
- `np-stroke-acute-management-and-secondary-prevention`
- `np-tia-workup-and-risk-stratification`
- `np-parkinson-disease-diagnosis-and-management`
- `np-essential-tremor-evaluation-and-treatment`
- `np-multiple-sclerosis-diagnosis-and-disease-modifying-therapy`
- `np-peripheral-neuropathy-workup-and-management`
- `np-dementia-diagnosis-and-disease-modifying-therapy`

All IDs are literal slugs from the canonical NP parity generator.

## Clinical review
- Seizures: PASS. Provoked vs unprovoked and seizure classification precede chronic medication selection; status remains an emergency; reproductive and drug-specific toxicity are explicit.
- Stroke: PASS. Last-known-well, glucose, urgent brain/vascular imaging and specialist reperfusion decisions are preserved; secondary prevention is mechanism-specific.
- TIA: PASS. Resolved focal symptoms remain high-risk; urgent imaging/cardiac evaluation and appropriate antithrombotic strategy are explicit; risk scores do not replace clinical urgency.
- Parkinson disease: PASS. Bradykinesia plus compatible syndrome is required; levodopa timing, nonmotor symptoms and atypical-parkinsonism clues are explicit.
- Essential tremor: PASS. Action/postural tremor is separated from parkinsonism; treatment is function driven.
- Multiple sclerosis: PASS. Compatible demyelinating syndrome plus dissemination/mimic exclusion is required; relapse and DMT are separate decisions; pregnancy/infection monitoring is explicit.
- Peripheral neuropathy: PASS. Distribution/tempo precede testing; rapidly progressive motor/autonomic disease is escalated rather than handled as routine distal neuropathy.
- Dementia: PASS. Delirium/reversible contributors and functional impairment are required for syndrome diagnosis. Current Canadian anti-amyloid disease-modifying therapy availability is accurately represented as restricted, biomarker-confirmed, specialist-managed early-Alzheimer care rather than general dementia treatment.

## Canadian source refresh
Rechecked 2026-08-09 against Canadian Stroke Best Practices; Parkinson Canada Canadian Guideline/health-professional medication resources; Canadian MS Working Group/MS Canada resources; Choosing Wisely Canada Neurology; and Health Canada Drug Product Database/PDL/NOC information for LEQEMBI (lecanemab) and KISUNLA (donanemab).

## Publication boundary
Clinical authoring PASS only. Global parse/count/ID validation, current Full identity reconciliation, Full-source anchors, Bottom Line evidence, three eligible Quick Checks, runtime recipe certification, learner render QA, merge and deployment remain downstream fail-closed gates.
