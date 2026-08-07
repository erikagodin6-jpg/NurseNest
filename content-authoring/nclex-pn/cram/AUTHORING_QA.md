# U.S. PN / NCLEX-PN Cram Library — Authoring QA

QA date: 2026-08-07
Branch: `content/us-pn-cram-authoring-20260807`
Status: ACTIVE AUTHORING — 120-lesson clinical baseline authored; full serving-lesson reconciliation remains in progress.

## Coverage QA

The current library contains 120 distinct Cram lessons aligned to entry-level U.S. practical nursing and the 2026 NCLEX-PN test plan. It spans all NCLEX-PN Client Needs categories and a broad set of clinical systems, lifespan stages, medications, devices, safety problems, emergencies, and coordinated-care decisions.

This is not yet a 100% full-lesson-to-Cram coverage claim. Completion requires reconciliation against the actual serving U.S. `LVN_LPN` lesson pool and authoring every remaining applicable gap.

## PN/LVN cognitive and scope QA

A U.S. PN Cram lesson is not a shortened RN or NP lesson. The default decision pathway is:

`recognize cues -> identify the immediate risk -> implement safe ordered care -> monitor response -> report/escalate deterioration`

Each lesson must:

- stay within entry-level PN/LPN/LVN practice expectations;
- emphasize observation, focused data collection, implementation of prescribed care, medication safety, patient teaching, reporting, delegation boundaries, and escalation;
- avoid implying independent medical diagnosis, prescribing, or advanced-practice authority;
- identify unstable or newly changing patients as requiring RN/provider/emergency escalation;
- tag `statePolicyCheck: true` when LPN/LVN authority, IV therapy, medication administration, delegation, consent, mandatory reporting, public-health procedure, or other legal/operational rules vary by state or setting.

## U.S. source hierarchy

Use the most current authoritative source appropriate to the claim:

1. NCSBN NCLEX-PN test plan and NCSBN nursing/delegation guidance for exam and role framing.
2. Federal U.S. sources where applicable: CDC, FDA, CMS, NIH agencies, USPSTF, HHS and other federal public-health/safety guidance.
3. Major U.S. specialty organizations and current evidence-based guidelines, including AHA/ACC, ACOG, AAP, ADA, ATS, IDSA, ASH, ACG, AAO, AABB, ASAM, SCCM/Surviving Sepsis Campaign and equivalent authoritative specialty bodies.
4. State Boards of Nursing, state health departments, and state law only for jurisdiction-specific scope, reporting, consent, public-health, or practice rules.
5. High-quality international guidance only when a suitable current U.S. source does not provide the needed clinical detail; the source must remain identifiable and must not introduce non-U.S. regulatory assumptions.

## High-change source refresh rules

Refresh affected lessons before publication when a newer authoritative recommendation has been released, especially for:

- NCSBN NCLEX-PN test plans and test specifications;
- CDC immunization schedules, infection-control guidance, STI treatment, contraception recommendations, isolation/public-health guidance, and wound prophylaxis;
- FDA boxed warnings, medication safety communications, labeling, antidotes, and product availability;
- AHA CPR/ECC and resuscitation special-circumstance guidance;
- ACC/AHA acute coronary syndrome, heart failure, dysrhythmia, and cardiovascular guidance;
- ADA diabetes standards and hyperglycemic-emergency guidance;
- ACOG obstetric, postpartum, reproductive, and perinatal mental-health guidance;
- AAP newborn and pediatric guidance;
- Surviving Sepsis Campaign/SCCM sepsis guidance;
- USPSTF screening recommendations;
- CMS restraint, patient-rights, long-term-care, and facility requirements;
- state Board of Nursing scope/delegation rules.

## Safety rejection rules

Reject or hold a lesson if downstream editing introduces any of the following:

- a Canadian REx-PN law, scope rule, terminology assumption, medication convention, screening program, or regulatory requirement presented as U.S. practice;
- RN- or NP-only autonomous assessment/diagnostic/prescribing language presented as routine PN authority;
- a state-specific LPN/LVN rule presented as universal U.S. law;
- an obsolete drug regimen, isolation practice, vaccine schedule, STI regimen, resuscitation sequence, or screening recommendation;
- an exact medication dose without an authoritative current basis or without the patient-specific qualification the recommendation requires;
- an emergency presentation that delays stabilization or escalation for routine testing/documentation;
- an instruction to delegate nursing judgment, initial assessment of instability, or evaluation of acute deterioration to unlicensed personnel;
- unsafe legacy exam myths, including automatically withholding needed oxygen from hypoxemic COPD patients, massaging a suspected DVT limb, putting an object in the mouth during a seizure, giving oral glucose to an unconscious patient, or IV-pushing potassium;
- stigmatizing, coercive, or non-trauma-informed language in mental health, substance use, reproductive health, sexual assault, IPV, or vulnerable-population care.

## Clinical-content integrity

Every lesson must preserve the meaning of these fields through any serving transformation:

- `bottomLine`
- `recognize`
- `priorities`
- `assessMonitor`
- `interventions`
- `medicationSafety`
- `complications`
- `redFlags`
- `teaching`
- `delegationScope`
- `examTrap`
- `oneLinePearl`

If the current Cram renderer cannot display a clinically necessary field, adapt the mapping/renderer. Do not delete clinically important safety content merely to satisfy a UI extractor or section-role contract.

## Duplicate and differentiation QA

Before adding a lesson:

1. Search the existing U.S. PN Cram library by topic and clinical decision.
2. If a topic already exists, deepen or correct it rather than creating a cosmetic duplicate.
3. A second lesson on the same disease is acceptable only when it teaches a materially different high-yield decision pathway, such as chronic care versus acute emergency, medication toxicity versus disease management, or adult versus newborn/pediatric physiology.
4. Titles alone are not sufficient for deduplication; compare clinical purpose and stable IDs.

## Serving-scope reconciliation

The current production-core access contract treats a U.S. practical-nurse learner as `country=US`, `tier=LVN_LPN`. Published lesson access is filtered to `regionScope=US_ONLY` or `BOTH` and the applicable practical-nurse/free/general content tiers.

The reconciliation process must therefore use the serving database lesson records—not the legacy mixed TypeScript `contentMap` alone—to classify every U.S. PN lesson as:

- `MATCHED` — a corresponding high-quality Cram lesson exists;
- `MISSING_CRAM` — applicable full lesson exists but no adequate Cram lesson exists;
- `NOT_APPLICABLE_TO_US_PN` — the lesson is outside U.S. PN scope/pathway or intentionally excluded with a documented reason.

Authoring completion is reached only when `MISSING_CRAM = 0` and no unexplained serving rows remain.

## Publication checkpoint

Clinical authored baseline: 120 lessons — COMPLETE as a baseline only.

Still required before declaring the U.S. PN Cram estate complete/live:

- full serving-lesson reconciliation;
- authoring and QA of every remaining `MISSING_CRAM` topic;
- machine/schema validation of all JSON objects;
- stable full-lesson-to-Cram identifier mapping;
- renderer integration into NurseNest Cram mode;
- learner-facing PN/US entitlement QA;
- merge/release/deployment certification.

Do not convert the 120-lesson count into a production-complete claim.