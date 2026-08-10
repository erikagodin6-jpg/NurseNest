# CNPLE Cram V2 — Parity Batch 46B Clinical Second Pass

Date: 2026-08-09
Scope: `46b-womens-health-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-uterine-fibroids-evaluation-and-management`
- `np-endometrial-cancer-recognition`
- `np-ovarian-cancer-recognition`
- `np-osteoporosis-prevention-in-women`
- `np-sexual-dysfunction-in-women`

All IDs are literal slugs emitted by the canonical NP parity generator.

## Clinical review

### Uterine fibroids
PASS. Management is based on symptoms, anemia, location and reproductive goals rather than lesion size alone. Postmenopausal bleeding and atypical/rising mass patterns are not attributed automatically to known fibroids.

### Endometrial-cancer recognition
PASS. Postmenopausal bleeding is a diagnostic pathway. Cervical screening does not evaluate the endometrium, bleeding resolution does not cancel indicated workup, and transvaginal ultrasound/endometrial sampling are used through the risk-based symptomatic pathway.

### Ovarian-cancer recognition
PASS. Routine CA-125/ultrasound population screening is not taught for asymptomatic average-risk patients. Persistent new symptoms and adnexal-mass morphology/risk drive diagnostic evaluation, and hereditary-risk patients are routed to genetics/specialty care.

### Osteoporosis prevention
PASS. Canadian fracture-risk guidance is used rather than age alone. POI/early menopause, glucocorticoids, fragility fracture and secondary causes can justify earlier assessment. Denosumab discontinuation requires a transition plan; BMD is not repeated simply to chase a number.

### Sexual dysfunction
PASS. Diagnosis requires patient-defined distress and a biopsychosocial/medication/pelvic-floor/menopause/safety assessment. Low desire without distress is not medicalized, routine hormone panels are not used to diagnose most sexual concerns, and consent/trauma/coercion remain explicit.

## Canadian source refresh

Load-bearing sources rechecked on 2026-08-09:

- Canadian Menopause Society / SOGC clinical practice guideline series 422, including sexuality, genitourinary health and osteoporosis.
- Osteoporosis Canada 2023 Clinical Practice Guideline and current implementation tools for fracture-risk assessment, treatment and denosumab transition.
- Canadian gynecology and gynecologic-oncology diagnostic pathways for postmenopausal bleeding, adnexal masses and suspected endometrial/ovarian malignancy.
- Choosing Wisely Canada screening principles where population screening is unsupported.

## Authoring gates

- Required Cram fields: present in all five records by editorial review.
- Canadian/SI framing: PASS.
- Postmenopausal bleeding protection: PASS.
- Ovarian-cancer screening limitation: PASS.
- Fracture-risk rather than age-only logic: PASS.
- Patient-defined sexual-health goals/consent: PASS.
- Red flags/escalation: present in all five.

## Publication boundary

Clinical authoring second pass only. Ordered manifest registration, current Full-source and Bottom-Line anchors, exactly three eligible lesson-linked Quick Checks, runtime recipe certification, authenticated learner render QA, merge and deployment remain downstream fail-closed gates.
