# CNPLE Cram V2 — Mental Health Parity Batch 48B Clinical Second Pass

Date: 2026-08-09
Scope: `48b-mental-health-addiction-trauma-safety-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity set

- `np-opioid-use-disorder-treatment`
- `np-tobacco-cessation-counseling-and-pharmacotherapy`
- `np-insomnia-evaluation-and-management`
- `np-eating-disorders-recognition-and-referral`
- `np-adhd-in-adults-diagnosis-and-management`
- `np-ptsd-diagnosis-and-management`
- `np-personality-disorders-recognition`
- `np-suicide-risk-assessment`
- `np-psychopharmacology-basics`

All are literal canonical NP-generator slugs.

## Clinical second-pass findings

**OUD:** PASS. 2024 CRISM national guidance anchors treatment. Opioid agonist treatment plus overdose prevention/harm reduction is offered rather than detoxification alone; recurrence does not trigger discharge from care.

**Tobacco cessation:** PASS. Behavioural counselling plus effective quit medication is the default evidence-based strategy. Health Canada-authorized cessation aids are separated from vaping products, and sacred/ceremonial tobacco is not conflated with commercial tobacco dependence.

**Insomnia:** PASS. CBT-I and diagnosis of OSA/restless legs/circadian/mood/substance contributors precede routine sedative use. Benzodiazepine/Z-drug/anticholinergic harms are explicit.

**Eating disorders:** PASS. Physiologic and behavioural severity outrank visible body size. Atypical anorexia, ARFID, orthostasis/electrolytes/ECG, refeeding risk and bupropion contraindication are preserved.

**Adult ADHD:** PASS. Childhood/developmental onset and multi-setting impairment are required. Depression/anxiety/PTSD/bipolar/sleep/substance mimics are assessed; rating scales do not independently diagnose ADHD.

**PTSD:** PASS. Trauma-focused psychotherapy and trauma-informed choice/control are central. Forced detailed disclosure and chronic benzodiazepine treatment are rejected.

**Personality disorders:** PASS. Diagnosis is longitudinal, non-stigmatizing and never substitutes for fresh suicide/psychosis/substance assessment. Polypharmacy for a personality label is avoided.

**Suicide risk:** PASS. Direct assessment of intent/plan/means/recent behaviour and dynamic risk guides level of care. No score or no-suicide contract is used to certify discharge; collaborative safety planning and lethal-means reduction are explicit.

**Psychopharmacology:** PASS. Every medication requires a defined target, time course, monitoring plan, interaction/adverse-effect review and exit strategy. Prescribing cascades and abrupt discontinuation are avoided.

## Canadian source refresh

- CRISM National Guideline for Clinical Management of OUD — 2024 update.
- Health Canada Quit with Confidence and tobacco-dependence resources.
- CADDRA Canadian ADHD Practice Guidelines and CAMH adult ADHD resources.
- CAMH PTSD and suicide-risk clinician resources.
- Choosing Wisely Canada sleep/sedative recommendations.

## Publication boundary

Clinical authoring only. Structural JSON/global-ID validation, exact current Full-source/Bottom-Line anchors, exactly three eligible lesson-linked Quick Checks, shared runtime certification, authenticated learner rendering, merge and deployment remain downstream fail-closed gates.
