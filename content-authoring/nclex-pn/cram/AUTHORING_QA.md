# U.S. PN / NCLEX-PN Cram Library — Authoring QA

QA date: 2026-08-08
Branch: `content/us-pn-cram-authoring-20260807`
Status: ACTIVE AUTHORING — 344 authored Cram lessons; U.S. serving-row reconciliation remains in progress.

## Coverage QA

The current library contains 344 distinct Cram lessons aligned to entry-level U.S. practical nursing and the 2026 NCLEX-PN test plan. It spans all NCLEX-PN Client Needs categories and a broad set of clinical systems, lifespan stages, medications, devices, safety problems, emergencies, coordinated-care decisions, medication-administration skills, therapeutic communication, documentation, fluid-balance teaching, obstetric pharmacology, antidotes/reversal agents, parenteral electrolyte safety, high-alert monitored infusions, CKD/mineral-bone pharmacology, potassium binders, BPH/urinary-retention medications, overactive-bladder therapy, stone-prevention pharmacology, and UTI symptom/treatment distinctions.

This is not yet a 100% full-lesson-to-Cram coverage claim. Completion requires reconciliation against the actual serving U.S. `us-lpn-nclex-pn` lesson pool and authoring every remaining applicable gap.

## Measured U.S. production baseline

The 2026-08-05 production-core audit measured the U.S. pathway at:

- 1,296 catalog rows;
- 117 retired rows;
- 1,179 live rows;
- 1,177 indexed/learner-reachable lessons;
- 139 U.S. `PN-013-pharmacology-element-gap` rows;
- 971 U.S. `PN-015-cram-safety-gap` rows;
- 796 missing Pre-Tests;
- 919 missing Post-Tests;
- 3 live-not-indexed/curation rows.

These pathway-specific numbers supersede PN-family totals as the primary denominator for U.S. Cram completion.

## Lineage QA

`LINEAGE_CANDIDATES.json` is provisional by design. A proposed source-slug → Cram mapping does not reduce a gap count until:

1. the source row is verified as learner-reachable on `us-lpn-nclex-pn`;
2. the source lesson's substantive clinical content is reviewed against the proposed Cram object;
3. no safety-critical section is lost or incorrectly narrowed;
4. one-to-many or many-to-one relationships are documented when a broad full lesson is represented by several narrower Cram lessons.

New direct-remediation lessons may carry `sourceLessonSlugCandidate` and `lineageStatus`; these fields are evidence hooks, not a completion claim. The packaged practical-nursing lesson corpus is tarball-backed rather than ordinary tracked GitHub text, so inability to verify a row through GitHub code search must remain `REQUIRED`, never be treated as an implicit pass.

## High-alert infusion QA

The high-alert infusion lessons are deliberately framed around monitoring, safe implementation, recognition of adverse effects, and immediate escalation. They do not imply that a U.S. LPN/LVN universally has authority to initiate or independently titrate thrombolytics, vasoactive drips, propofol, dexmedetomidine, insulin infusions, heparin infusions, hypertonic saline, or other critical-care infusions. Those lessons carry `statePolicyCheck: true` where scope is facility/state dependent.

High-change/current-source checks in these tranches include current 2026 U.S. labeling for alteplase, tenecteplase, sodium nitroprusside, nicardipine, dexmedetomidine, propofol, vasopressin, phenylephrine, esmolol, diltiazem, heparin, magnesium sulfate, sodium/potassium phosphates, and related infusion products.

## Renal and urology pharmacology QA

The newest renal/metabolic and urology batches preserve drug-specific mechanisms and decision points rather than collapsing medications into generic kidney-drug summaries. Potassium binders are explicitly separated from emergency hyperkalemia rescue; desmopressin centers fluid balance and hyponatremia risk; CKD mineral-bone drugs require calcium/phosphorus/PTH-aware monitoring; BPH and bladder drugs distinguish orthostasis, retention, anticholinergic, blood-pressure, and obstruction risks; and urinary symptom-relief therapy is not presented as definitive infection treatment.

The newest lessons also preserve medication-reconciliation and interaction context where it materially changes safety, including lithium with thiazides, digitalis with calcium abnormalities, oral-drug timing with phosphate/potassium binders, and potassium-raising combinations in renal disease.

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
3. A second lesson on the same disease or drug is acceptable only when it teaches a materially different high-yield decision pathway, such as chronic care versus acute emergency, class safety versus continuous-infusion management, medication toxicity versus disease management, or adult versus newborn/pediatric physiology.
4. Titles alone are not sufficient for deduplication; compare clinical purpose and stable IDs.

## Serving-scope reconciliation

The current production-core access contract treats a U.S. practical-nurse learner as `country=US`, `tier=LVN_LPN`, pathway `us-lpn-nclex-pn`. Published lesson access is filtered to the applicable U.S./shared region and practical-nurse/free/general content tiers.

The reconciliation process must classify every applicable serving U.S. PN lesson as:

- `MATCHED` — a corresponding high-quality Cram lesson exists and lineage/content equivalence is verified;
- `MISSING_CRAM` — applicable full lesson exists but no adequate Cram lesson exists;
- `NOT_APPLICABLE_TO_US_PN` — the lesson is outside U.S. PN scope/pathway or intentionally excluded with a documented reason.

Authoring completion is reached only when `MISSING_CRAM = 0` and no unexplained serving rows remain.

## Publication checkpoint

Clinical authored baseline: 344 lessons — COMPLETE as a baseline only.

Still required before declaring the U.S. PN Cram estate complete/live:

- full serving-lesson reconciliation;
- verification of provisional lineage candidates;
- authoring and QA of every remaining `MISSING_CRAM` topic;
- machine/schema validation of all JSON objects;
- stable full-lesson-to-Cram identifier mapping;
- renderer integration into NurseNest Cram mode;
- learner-facing PN/US entitlement QA;
- merge/release/deployment certification.

Do not convert the 344-lesson count into a production-complete claim.
