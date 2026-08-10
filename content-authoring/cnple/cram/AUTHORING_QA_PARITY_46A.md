# CNPLE Cram V2 — Parity Batch 46A Clinical Second Pass

Date: 2026-08-09
Scope: `46a-womens-health-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-iud-insertion-and-management`
- `np-implantable-contraceptive-management`
- `np-oral-contraceptive-prescribing-and-monitoring`
- `np-emergency-contraception-counseling`
- `np-preconception-counseling-and-care`
- `np-infertility-initial-evaluation`
- `np-premature-ovarian-insufficiency`
- `np-pelvic-floor-disorders-evaluation`

All IDs are literal slugs emitted by the canonical NP parity generator.

## Clinical review

### Intrauterine contraception
PASS. Adolescence/nulliparity are not treated as contraindications. Pregnancy timing, true infection/anatomic contraindications and symptom-driven evaluation are explicit. Routine prophylactic antibiotics and mandatory asymptomatic string-check visits are not taught universally; patient-requested removal is respected.

### Contraceptive implant
PASS. Irregular bleeding is anticipated rather than mislabelled as failure. Enzyme-inducing interactions, nonpalpable/deep implant safety and requested removal are explicit. The July/August 2025 SOGC bleeding/removal statements are reflected.

### Oral contraception
PASS. Blood pressure plus focused estrogen/VTE/migraine/vascular risk assessment precede combined-pill prescribing. Routine pelvic examination and universal thrombophilia laboratory screening are rejected as prerequisites. Product-specific missed-pill rules remain product-specific.

### Emergency contraception
PASS. EC is time-sensitive and not delayed by low-value examination/testing. Copper IUC and oral options are selected by timing, interactions and patient preference, and the ongoing-contraception restart plan is explicit.

### Preconception care
PASS. Reproductive goals come first. Chronic disease, medication, vaccination, infection, nutrition, genetic, substance/mental-health and social risk are optimized before conception without abruptly stopping essential therapy. Current SOGC 2026 Preconception Health Hub framing is used.

### Infertility
PASS. Ovulation, tubal/uterine anatomy and sperm factors are evaluated in parallel. Age and known fertility threats appropriately accelerate referral. Ovarian-reserve testing is not presented as a stand-alone prediction of spontaneous fertility.

### Premature ovarian insufficiency
PASS. POI is separated from pregnancy, hypothalamic amenorrhea, hyperprolactinemia, thyroid disease and PCOS. Diagnosis uses current POI biochemical guidance. Hormone replacement is framed as long-term health replacement in a young patient rather than optional older-age menopause symptom therapy; uterine endometrial protection remains explicit.

### Pelvic-floor disorders
PASS. Prolapse, stress/urgency incontinence, retention, pain and pelvic-floor overactivity are differentiated. Pelvic-floor strengthening is not prescribed reflexively for hypertonic pain, and advanced testing is reserved for complex/preprocedural questions.

## Canadian source refresh

Load-bearing sources rechecked on 2026-08-09:

- Society of Obstetricians and Gynaecologists of Canada current contraception resources and 2025 position statements on contraceptive implant removal and bleeding patterns with progestin-only contraception.
- SOGC 2026 Preconception Health Hub and linked current guidance on chronic disease, nutrition/lifestyle/age, infection/immunization and reproductive planning.
- Canadian Menopause Society Menopause HUB, including POI diagnostic framing and the 2024 ESHRE POI guideline referenced by CMS.
- Canadian fertility and urogynecology/pelvic-health practice principles where operational details vary by jurisdiction or specialty program.

## Authoring gates

- Required Cram fields: present in all eight records by editorial review.
- Canadian/SI framing: PASS.
- Reproductive autonomy/removal access: PASS.
- Estrogen/VTE/migraine safety: PASS.
- Screening/testing stewardship: PASS.
- Inclusive reproductive-goal framing: PASS.
- Red flags/escalation: present in all eight.

## Publication boundary

Clinical authoring second pass only. Ordered manifest registration, current Full-source and Bottom-Line anchors, exactly three eligible lesson-linked Quick Checks, runtime recipe certification, authenticated learner render QA, merge and deployment remain downstream fail-closed gates.
