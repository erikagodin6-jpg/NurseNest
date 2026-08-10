# CNPLE Cram V2 — Complete Mental Health Generator Clinical Second Pass

Date: 2026-08-10
Source lineage: `content/cnple-cram-parity-mental-health-48c-20260809`
Source files: `48a-mental-health-diagnosis-treatment-parity.json`, `48b-mental-health-addiction-trauma-safety-parity.json`, `48c-mental-health-medication-systems-parity.json`
Canonical generator denominator: **26/26 exact identities**
Result: **PASS — clinical authoring second pass**

## Prior audited batches

48A and 48B retain their dedicated PASS ledgers. They cover depression diagnosis/pharmacotherapy, anxiety/panic/GAD, bipolar disorder, schizophrenia, substance-use screening, AUD, OUD, tobacco cessation, insomnia, eating disorders, adult ADHD, PTSD, personality disorders, suicide risk and psychopharmacology fundamentals.

## 48C final-eight clinical audit

### Antidepressant selection and monitoring
PASS. A correct target diagnosis, bipolarity and suicide-risk assessment precede medication choice. Adequate dose/duration/adherence are checked before declaring failure. Activation, serotonin toxicity, hyponatremia, bleeding, QT/interaction risk and discontinuation symptoms are patient/agent specific; abrupt discontinuation and random augmentation are rejected.

### Antipsychotic prescribing and monitoring
PASS. Treatment has a defined psychosis/mood target. Metabolic, movement-disorder, cardiovascular/QT and prolactin risks are monitored by agent/patient. Akathisia is distinguished from worsening agitation. Clozapine uses current Canadian monitoring pathways rather than obsolete U.S. REMS assumptions; fever/neutropenia, myocarditis, seizure and severe constipation/ileus remain high-priority safety signals.

### Mood stabilizer management
PASS. Lithium, valproate, carbamazepine and lamotrigine are not taught as one monitoring class. Lithium clinical toxicity can override a previously acceptable level and renal/sodium/fluid/drug-interaction changes matter. Valproate reproductive/hepatic/hematologic risk, carbamazepine sodium/CBC/liver/interactions and lamotrigine slow titration/severe-rash safety are explicit.

### Benzodiazepine prescribing
PASS. Long-term benzodiazepines are not default treatment for chronic anxiety or insomnia. Opioid/alcohol/sedative interaction, respiratory disease, falls/cognition, driving and pregnancy context are assessed. Physical dependence is not equated with use disorder; established chronic therapy is tapered safely rather than abruptly stopped and precipitating severe withdrawal or seizures.

### Mental health in primary care
PASS. Longitudinal primary care can manage many common stable conditions but must repeatedly reassess suicide risk, bipolarity, psychosis, substances, sleep/trauma and medical/medication contributors. Severe mania/psychosis, imminent suicide risk, medically unstable eating disorders and treatment-resistant/uncertain illness retain specialty or acute-care escalation.

### Collaborative care
PASS. Co-location or referral alone is not collaboration. One plan, defined role ownership, measurement, medication reconciliation, feedback and escalation thresholds are required. A referral cannot substitute for interim safety follow-up.

### Crisis intervention
PASS. Medical causes and immediate threats are assessed before labelling agitation purely psychiatric. Trauma-informed verbal/environmental de-escalation and the least restrictive effective setting are prioritized. Sedation/restraint is a monitored safety intervention only when justified; it does not replace assessment.

### Mental-health referral indications
PASS. Referral is driven by severity, diagnostic uncertainty, treatment resistance, psychosis/mania, complex comorbidity, eating-disorder medical risk, pregnancy/perinatal complexity, substance-use complexity and functional collapse. Imminent danger is an emergency pathway, not a routine referral.

## Current Canadian source families

Rechecked within the current authoring program through 2026-08-10:
- CANMAT 2023 Major Depressive Disorder guidance.
- CANMAT/ISBD bipolar guidance and Canadian psychiatric pharmacology practice.
- CAMH psychosis, anxiety, ADHD, suicide-risk, addiction and primary-care integration resources.
- CRISM National Guideline for Clinical Management of Opioid Use Disorder — 2024 update.
- Canadian Guideline for Clinical Management of High-Risk Drinking and Alcohol Use Disorder — 2023.
- CADDRA Canadian ADHD Practice Guidelines.
- Choosing Wisely Canada sedative/geriatric/psychiatric recommendations.

## Authoring gates

- Literal 26-ID generator denominator: required by consolidation gate.
- Screening is not diagnosis: PASS.
- Suicide/mania/psychosis/withdrawal medical-safety boundaries: PASS.
- Agent-specific monitoring rather than generic psychopharmacology tables: PASS.
- Trauma-informed and non-stigmatizing language: PASS.
- Canadian regulatory/monitoring framing: PASS.

## Publication boundary

Clinical authoring PASS only. Exact current Full-lesson reconciliation, learner-visible Full-source and Bottom-Line anchors, exactly three eligible linked Quick Checks, shared runtime integrity certification, authenticated learner rendering, merge and deployment remain downstream fail-closed gates.
