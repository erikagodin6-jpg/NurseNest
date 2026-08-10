# CNPLE Cram V2 — Geriatrics Parity Batch 43A Clinical Second Pass

Date: 2026-08-09
Scope: `43a-geriatrics-core-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity set

- `np-comprehensive-geriatric-assessment`
- `np-falls-risk-assessment-and-prevention`
- `np-frailty-recognition-and-management`
- `np-polypharmacy-and-deprescribing`
- `np-dementia-in-older-adults-evaluation-and-management`
- `np-delirium-prevention-and-management`
- `np-depression-in-older-adults`
- `np-anxiety-in-older-adults`

All are literal slugs emitted by the canonical NP parity generator.

## Clinical second-pass findings

**Comprehensive geriatric assessment:** PASS. Function, mobility, cognition, medications, nutrition, continence, sensory loss, supports, caregiver burden and goals are treated as clinical outcomes rather than adjuncts to disease lists.

**Falls:** PASS. Falls are multifactorial syndromes; acute injury/syncope/neurologic/medication causes are separated from long-term prevention. Sedative/hypotensive/hypoglycemia-producing medications are explicit modifiable risks.

**Frailty:** PASS. Frailty is reduced reserve rather than chronological age, disability or comorbidity alone. It informs treatment intensity and discharge planning without becoming an automatic reason to withhold beneficial care.

**Polypharmacy/deprescribing:** PASS. Every drug requires current indication/net benefit. Prescribing cascades, anticholinergic/sedative burden and withdrawal/rebound risks are explicit; deprescribing is supervised treatment rather than abrupt abandonment.

**Dementia:** PASS. Screening score alone is insufficient. Functional decline, collateral history, delirium/depression/medication mimics, safety, caregiver needs and advance planning are integrated. Antipsychotics are not routine treatment for dementia behaviours.

**Delirium:** PASS. Acute fluctuating inattention is treated as medical brain failure. Causes are sought; mobility/orientation/hearing/vision/sleep/hydration are prioritized. Benzodiazepines are not routine delirium therapy outside specific withdrawal indications, and asymptomatic bacteriuria is not automatically labelled the cause.

**Late-life depression/anxiety:** PASS. Medical/medication mimics and suicide risk are retained. Chronic benzodiazepine/sedative strategies are not first-line, especially when falls/cognitive vulnerability is present.

## Canadian source refresh

Load-bearing source families rechecked on 2026-08-09:

- Choosing Wisely Canada Geriatrics recommendations, including sedative-hypnotic and asymptomatic-bacteriuria stewardship.
- Canadian Frailty Network and Canadian geriatric comprehensive-assessment practice resources.
- Public Health Agency of Canada healthy-aging/falls/dementia resources.
- Canadian deprescribing and geriatric mental-health practice principles.

## Authoring gates

- Required Cram fields: PASS by editorial review.
- Frailty-versus-age distinction: PASS.
- Delirium-versus-dementia distinction: PASS.
- Sedative/anticholinergic medication safety: PASS.
- Falls and functional disposition: PASS.
- Suicide/safety assessment in mood disorders: PASS.

## Publication boundary

Clinical authoring only. Structural JSON/global-ID validation, exact current Full-source and Bottom Line anchors, exactly three eligible lesson-linked Quick Checks, shared runtime certification, authenticated learner rendering, merge and deployment remain downstream fail-closed gates.
