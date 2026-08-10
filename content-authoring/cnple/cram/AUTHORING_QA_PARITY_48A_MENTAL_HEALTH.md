# CNPLE Cram V2 — Mental Health Parity Batch 48A Clinical Second Pass

Date: 2026-08-09
Scope: `48a-mental-health-diagnosis-treatment-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity set

- `np-depression-screening-and-diagnosis`
- `np-depression-pharmacotherapy-selection`
- `np-anxiety-disorders-diagnosis-and-management`
- `np-panic-disorder-diagnosis-and-treatment`
- `np-generalized-anxiety-disorder-management`
- `np-bipolar-disorder-recognition-and-management`
- `np-schizophrenia-diagnosis-and-management`
- `np-substance-use-disorder-screening`
- `np-alcohol-use-disorder-management`

All are literal canonical NP-generator slugs.

## Clinical second-pass findings

**Depression diagnosis:** PASS. Screen ≠ diagnosis; suicide risk, psychosis and bipolarity are required clinical discriminators. Medical/substance mimics remain targeted rather than a universal laboratory panel.

**Depression pharmacotherapy:** PASS. Medication choice is individualized by prior response, comorbidity, interaction, adverse-effect, reproductive and overdose context. Adequate dose/duration/adherence are checked before failure; unrecognized bipolarity blocks reflex antidepressant escalation.

**Anxiety/GAD/panic:** PASS. First/atypical cardiopulmonary presentations retain a medical differential. CBT/exposure and maintenance treatment are prioritized over chronic sedative rescue.

**Bipolar:** PASS. Mania/hypomania history defines the treatment frame; unsafe mania/mixed/psychotic episodes require urgent care. Lithium, valproate and antipsychotic monitoring are preserved.

**Schizophrenia/psychosis:** PASS. First psychosis is a syndrome requiring delirium/substance/mood/medical exclusion; schizophrenia remains longitudinal. Antipsychotic metabolic/movement and clozapine hematologic safety are explicit.

**Substance screening:** PASS. Positive screen ≠ SUD diagnosis. Harm reduction and person-first language are retained; severe withdrawal/overdose/psychosis/suicide risks are escalated.

**Alcohol use disorder:** PASS. Withdrawal/seizure/DT risk is assessed before advising cessation; evidence-based AUD pharmacotherapy and psychosocial treatment are offered rather than detox-only care.

## Canadian source refresh

- CANMAT 2023 Major Depressive Disorder guideline.
- CANMAT/ISBD bipolar guidance and Canadian psychiatric practice.
- CAMH psychosis/anxiety/addiction resources.
- Canadian Guideline for the Clinical Management of High-Risk Drinking and Alcohol Use Disorder (2023).
- CRISM/Canadian harm-reduction and substance-use practice.

## Authoring gates

Required Cram fields, Canadian framing, screening-versus-diagnosis boundary, suicide/mania/psychosis safety, withdrawal safety, medication monitoring and stigma-free care: PASS by editorial review.

## Publication boundary

Clinical authoring only. Structural JSON/global-ID validation, exact current Full-source/Bottom-Line anchors, exactly three eligible lesson-linked Quick Checks, shared runtime certification, authenticated learner rendering, merge and deployment remain downstream fail-closed gates.
