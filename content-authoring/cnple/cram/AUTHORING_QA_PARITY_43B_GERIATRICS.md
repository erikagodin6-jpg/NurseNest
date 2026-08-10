# CNPLE Cram V2 — Geriatrics Parity Batch 43B Clinical Second Pass

Date: 2026-08-09
Scope: `43b-geriatrics-function-symptoms-safety-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity set

- `np-urinary-incontinence-in-older-adults`
- `np-constipation-in-older-adults`
- `np-nutrition-and-weight-loss-in-elderly`
- `np-sleep-disorders-in-older-adults`
- `np-chronic-pain-management-in-elderly`
- `np-osteoporosis-management-in-older-adults`
- `np-vision-and-hearing-loss-in-elderly`
- `np-driving-safety-assessment`
- `np-elder-abuse-recognition-and-reporting`

All are literal canonical NP-generator slugs.

## Clinical second-pass findings

**Incontinence:** PASS. Urgency/stress/overflow/functional patterns and reversible contributors are separated. Asymptomatic bacteriuria is not used as an explanation for chronic leakage. Anticholinergic burden, retention, cognition and constipation are reviewed before bladder medication.

**Constipation:** PASS. Medication, mobility, hydration, outlet dysfunction, impaction and obstruction are differentiated. Docusate alone is not presented as adequate opioid-induced-constipation prophylaxis.

**Nutrition/weight loss:** PASS. Unintentional loss is a symptom requiring medical, swallowing/dental, medication, mood/cognition and food-access evaluation. Appetite stimulants/supplements do not replace diagnosis.

**Sleep:** PASS. Insomnia is separated from OSA, restless legs, circadian problems, nocturia and pain. CBT-I/non-drug care precedes routine sedative-hypnotics because older adults have disproportionate falls/cognitive harm.

**Chronic pain:** PASS. Function and treatment harms are tracked with pain. Non-drug and non-opioid therapy are optimized first for chronic non-cancer pain; opioids require a defined functional benefit and stopping plan.

**Osteoporosis:** PASS. Fracture risk, falls and prior fracture drive treatment rather than BMD alone. Current Osteoporosis Canada guidance is used and denosumab discontinuation requires a planned antiresorptive transition.

**Sensory loss:** PASS. Hearing/vision loss is treated as a contributor to falls, isolation, medication errors, delirium and apparent cognitive impairment. Sudden sensory loss remains urgent.

**Driving:** PASS. Fitness is function-based, not age-based or one cognitive score. Syncope/seizure/vision/medication/cognitive risks and provincial/territorial reporting rules are explicit.

**Elder abuse:** PASS. Safety and capacity are assessed without erasing a capable older adult's autonomy. Reporting/protection duties remain jurisdiction-specific; serious immediate danger is escalated.

## Canadian source refresh

- Choosing Wisely Canada Geriatrics, Family Medicine, Hospital Pharmacy and Palliative Care recommendations.
- Choosing Wisely Canada Nurse Practitioner recommendations updated October 2025.
- Osteoporosis Canada 2023 Clinical Practice Guideline.
- Canadian geriatric, continence, driving-safety and adult-protection practice principles.

## Authoring gates

Required fields, Canadian/SI framing, medication/falls safety, frailty-aware treatment, autonomy/capacity framing and red-flag disposition: PASS by editorial review.

## Publication boundary

Clinical authoring only. Structural JSON/global-ID validation, current Full-source/Bottom-Line anchors, exactly three eligible lesson-linked Quick Checks, shared runtime certification, authenticated learner rendering, merge and deployment remain downstream fail-closed gates.
