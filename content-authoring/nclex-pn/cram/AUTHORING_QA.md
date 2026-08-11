# U.S. PN / NCLEX-PN Cram Library — Authoring QA

QA date: 2026-08-09
Branch: `content/us-pn-cram-authoring-20260807`
Status: ACTIVE AUTHORING — 424 authored Cram lessons; U.S. serving-row reconciliation remains in progress.

## Coverage QA

The current library contains 424 distinct Cram lessons aligned to entry-level U.S. practical nursing and the 2026 NCLEX-PN test plan. It spans all NCLEX-PN Client Needs categories and a broad set of clinical systems, lifespan stages, medications, devices, safety problems, emergencies, coordinated-care decisions, medication-administration skills, therapeutic communication, documentation, fluid-balance teaching, obstetric pharmacology, antidotes/reversal agents, parenteral electrolyte safety, high-alert monitored infusions, CKD/mineral-bone pharmacology, potassium binders, renal/urology therapy, GI pharmacology, endocrine replacement/thyroid therapy, osteoporosis/calcium-regulation therapy, antiepileptic safety, migraine treatment, spasticity/myasthenia medication safety, psych/substance-use pharmacology, HIV treatment/prevention pharmacology, reproductive medication safety, drug-specific oncology pharmacology, newborn/pediatric medication safety, advanced cardiovascular pharmacology, and route/site-specific infectious-disease pharmacology.

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

These pathway-specific numbers supersede PN-family totals as the primary denominator for U.S. Cram completion. `countedResolvedProductionRows` remains zero until lineage is proven.

## Lineage QA

`LINEAGE_CANDIDATES.json` is provisional by design. A proposed source-slug → Cram mapping does not reduce a gap count until:

1. the source row is verified as learner-reachable on `us-lpn-nclex-pn`;
2. the source lesson's substantive clinical content is reviewed against the proposed Cram object;
3. no safety-critical section is lost or incorrectly narrowed;
4. one-to-many or many-to-one relationships are documented when a broad full lesson is represented by several narrower Cram lessons.

New direct-remediation lessons may carry `sourceLessonSlugCandidate` and `lineageStatus`; these fields are evidence hooks, not a completion claim. The packaged practical-nursing lesson corpus is tarball-backed rather than ordinary tracked GitHub text, so inability to verify a row through GitHub code search must remain `REQUIRED`, never be treated as an implicit pass. The checked-in audit exposes aggregate/source counts and sample slugs, not a complete U.S. PN-013/PN-015 row list; topic similarity must not be treated as row-level proof.

## High-alert infusion QA

The high-alert infusion lessons are deliberately framed around monitoring, safe implementation, recognition of adverse effects, and immediate escalation. They do not imply that a U.S. LPN/LVN universally has authority to initiate or independently titrate thrombolytics, vasoactive drips, propofol, dexmedetomidine, insulin infusions, heparin infusions, hypertonic saline, or other critical-care infusions. Those lessons carry `statePolicyCheck: true` where scope is facility/state dependent.

High-change/current-source checks in these tranches include current 2026 U.S. labeling for alteplase, tenecteplase, sodium nitroprusside, nicardipine, dexmedetomidine, propofol, vasopressin, phenylephrine, esmolol, diltiazem, heparin, magnesium sulfate, sodium/potassium phosphates, and related infusion products.

## Renal and urology pharmacology QA

Renal/metabolic and urology batches preserve drug-specific mechanisms and decision points rather than collapsing medications into generic kidney-drug summaries. Potassium binders are explicitly separated from emergency hyperkalemia rescue; desmopressin centers fluid balance and hyponatremia risk; CKD mineral-bone drugs require calcium/phosphorus/PTH-aware monitoring; BPH and bladder drugs distinguish orthostasis, retention, anticholinergic, blood-pressure, and obstruction risks; and urinary symptom-relief therapy is not presented as definitive infection treatment.

The renal/urology lessons preserve medication-reconciliation and interaction context where it materially changes safety, including lithium with thiazides, calcium/PTH context with cinacalcet/calcitriol, oral-drug timing with phosphate/potassium binders, and potassium-raising combinations in renal disease.

## GI, neuro, and endocrine pharmacology QA

The GI pharmacology batch preserves distinct mechanisms and formulation rules rather than treating all GI drugs as symptom medications. H2 blockade is renal-aware; sucralfate requires oral-drug spacing; mesalamine preserves renal monitoring and acute-intolerance recognition; pancreatic enzymes are synchronized with meals; loperamide is not used reflexively for bloody/invasive diarrhea; bowel-obstruction red flags outrank additional laxatives; phenothiazine antiemetics retain movement-disorder/NMS risk; promethazine retains pediatric respiratory-depression and severe tissue-injury warnings; and scopolamine is treated as a systemic anticholinergic despite transdermal delivery.

The neuro/endocrine batch preserves current high-risk distinctions: PTU carries severe liver-injury risk and pregnancy-specific selection considerations; hydrocortisone is framed as replacement/stress therapy rather than generic anti-inflammatory steroid use; fludrocortisone is monitored for hypertension, edema, and hypokalemia; denosumab incorporates the 2026 severe-hypocalcemia boxed warning for advanced CKD; calcitonin requires ongoing-need reassessment; lamotrigine rash is a safety signal; topiramate centers metabolic acidosis/stone/ocular risk; sumatriptan preserves vascular contraindications; baclofen withdrawal is treated as dangerous; and pyridostigmine excess is distinguished from myasthenic deterioration without delaying respiratory escalation.

## Psych and substance-use pharmacology QA

Psychotropic lessons must separate class benefit from acute safety. SNRIs retain suicide-risk, serotonin, blood-pressure, sodium and discontinuation monitoring; mirtazapine and trazodone are not reduced to “sleep drugs” and preserve sedation/fall, priapism, hematologic and interaction risks; stimulant therapy preserves current boxed abuse/misuse/addiction language, cardiovascular monitoring, growth/appetite and psychosis/mania cues; atomoxetine preserves the pediatric suicidal-ideation boxed warning and liver/cardiovascular monitoring.

Substance-use pharmacology must remain non-stigmatizing and evidence-based. Buprenorphine/naloxone preserves induction timing, precipitated-withdrawal, respiratory/CNS-depressant, diversion and naloxone-access teaching; extended-release naltrexone requires opioid-free initiation and teaches overdose vulnerability as blockade wanes; acamprosate is maintenance therapy after abstinence rather than detox treatment and is renal-aware; disulfiram requires informed participation, alcohol-product avoidance and hepatic monitoring rather than coercive use.

## HIV and reproductive pharmacology QA

HIV medication lessons use current U.S. CDC/NIH/FDA guidance. ART lessons preserve adherence, complete-regimen logic, interaction review, renal/hepatic monitoring and hepatitis-B discontinuation risk. PrEP lessons require HIV-negative status and regimen-specific kidney/HBV monitoring; injectable cabotegravir preserves the long pharmacokinetic tail and resistance risk after missed/stopped injections. nPEP is treated as time-sensitive: initiate as soon as possible when indicated and no later than the current CDC window, complete the prescribed course, and do not delay the first dose for nonessential testing.

Reproductive medication lessons use person-centered, noncoercive counseling. Combined hormonal contraception preserves estrogen-specific thrombotic/BP/migraine/smoking risk screening; DMPA preserves bone-density and delayed-fertility considerations; progestin-only pills use formulation-specific missed-dose guidance rather than one generic rule; levonorgestrel emergency contraception is distinguished from abortion medication and STI prevention; ulipristal preserves the current five-day delay before resuming hormonal contraception and its interaction with enzyme-inducing drugs.

## Oncology pharmacology QA

Drug-specific oncology lessons must preserve the toxicity pattern that changes nursing priority rather than collapsing all chemotherapy into neutropenic precautions. Cisplatin centers renal, magnesium, hearing, and neuropathy surveillance; doxorubicin centers cumulative cardiac function and vesicant extravasation; cyclophosphamide centers marrow and hemorrhagic-cystitis prevention; vincristine is IV-only and fatal intrathecal error prevention outranks routine administration; fluorouracil preserves DPD-deficiency, cardiotoxicity, neurotoxicity, diarrhea and mucositis warnings; paclitaxel retains severe hypersensitivity and neuropathy; trastuzumab requires cardiac/infusion/pulmonary surveillance; bleomycin centers pulmonary toxicity; etoposide preserves severe myelosuppression and rate-related hypotension; tamoxifen retains thromboembolic and abnormal-uterine-bleeding risk.

Chemotherapy administration must never be implied as universal LPN/LVN authority. Vesicants, antineoplastics and specialty biologics carry `statePolicyCheck: true` where administration/handling requires state/facility oncology competency. The PN-facing decision pathway remains recognize toxicity, implement authorized supportive care, protect the patient/line, and escalate promptly.

## Newborn and pediatric medication-safety QA

Newborn/pediatric lessons must not be adult medication cards with smaller doses. Phytonadione distinguishes prophylaxis from evaluation of active bleeding; erythromycin ophthalmic prophylaxis is not presented as adequate treatment for symptomatic neonatal infection; nirsevimab and clesrovimab are passive RSV antibodies rather than vaccines and preserve current first-/second-season eligibility distinctions; caffeine citrate requires reassessment for alternative causes of apnea and recognition of caffeine-base/citrate dose-language risk; beractant requires immediate respiratory/ventilator reassessment as compliance changes; diazepam nasal rescue preserves current opioid/CNS-depressant respiratory warnings and individualized seizure-action-plan thresholds.

Pediatric calculations use current measured kilograms, distinguish mg/kg/dose from mg/kg/day, check concentration and maximum dose, and prohibit blind trust in arithmetic when the result is clinically implausible. Liquid medication teaching uses milliliters and an appropriate oral device, verifies the exact concentration, and requires caregiver teach-back. Neonatal product selection must account for preservatives/excipients and not assume adult/older-child formulations are interchangeable in premature or low-birth-weight infants.

## Cardiovascular pharmacology QA

The newest cardiovascular lessons remain decision-specific rather than duplicating the earlier beta-blocker, ACE/ARB, nitrate, or arrhythmia-condition lessons. Sacubitril/valsartan preserves ACE-inhibitor separation, angioedema, renal, potassium and fetal-toxicity safety; ivabradine is tied to sinus rhythm and bradycardia/atrial-fibrillation surveillance; ranolazine is chronic angina therapy rather than acute rescue and retains QT/CYP interaction risk; sotalol requires QT, renal and electrolyte monitoring; flecainide preserves structural/ischemic-heart-disease proarrhythmia risk; isosorbide mononitrate is preventive rather than rescue therapy; ezetimibe/evolocumab are judged by lipid-risk reduction rather than immediate symptoms; clonidine withdrawal is treated as a rebound-hypertension hazard; and chronic oral hydralazine is differentiated from emergency IV obstetric hydralazine.

Antiarrhythmic initiation, titration and rhythm interpretation must not be represented as universal PN authority. New syncope, high-grade block, torsades/proarrhythmia, severe hypotension, angioedema or acute ischemic symptoms require immediate escalation.

## Infectious-disease pharmacology QA

The newest infectious-disease lessons preserve route, site, organism and public-health distinctions. Fidaxomicin and oral vancomycin are gut-directed C. difficile therapies rather than generic systemic antibiotics; oral vancomycin must not be substituted for IV systemic therapy. Entecavir preserves severe HBV flare risk after discontinuation and HIV/HBV coinfection concerns; sofosbuvir/velpatasvir preserves HBV-reactivation and acid-reducer/amiodarone interaction risks. Topical mupirocin is product/site specific; permethrin treatment includes contact/environmental logic without reflex reapplication for persistent itch; oral terbinafine is liver-aware; benzathine penicillin G is deep-IM only and never IV; ceftriaxone preserves neonatal calcium/bilirubin and allergy-phenotype distinctions; daptomycin is explicitly not a pneumonia drug and requires CK/muscle/eosinophilic-pneumonia monitoring.

Antimicrobial stewardship remains part of PN-facing safety: cultures, site, route, adherence, adverse effects and clinical response matter, while diagnosis, drug selection and definitive de-escalation remain prescriber/team decisions.

## PN/LVN cognitive and scope QA

A U.S. PN Cram lesson is not a shortened RN or NP lesson. The default decision pathway is:

`recognize cues -> identify the immediate risk -> implement safe ordered care -> monitor response -> report/escalate deterioration`

Each lesson must:

- stay within entry-level PN/LPN/LVN practice expectations;
- emphasize observation, focused data collection, implementation of prescribed care, medication safety, patient teaching, reporting, delegation boundaries, and escalation;
- avoid implying independent medical diagnosis, prescribing, or advanced-practice authority;
- identify unstable or newly changing patients as requiring RN/provider/emergency escalation;
- tag `statePolicyCheck: true` when LPN/LVN authority, IV therapy, medication administration, chemotherapy/biologic administration, antiarrhythmic/advanced-cardiac therapy, delegation, consent, mandatory reporting, public-health procedure, contraceptive/HIV-service authority, or other legal/operational rules vary by state or setting.

## U.S. source hierarchy

Use the most current authoritative source appropriate to the claim:

1. NCSBN NCLEX-PN test plan and NCSBN nursing/delegation guidance for exam and role framing.
2. Federal U.S. sources where applicable: CDC, FDA, CMS, NIH agencies, USPSTF, HHS and other federal public-health/safety guidance.
3. Major U.S. specialty organizations and current evidence-based U.S. guidelines, including AHA/ACC, ACOG, AAP, ADA, ATS, IDSA, ASH, ACG, AAO, AABB, ASAM, SCCM/Surviving Sepsis Campaign and equivalent authoritative specialty bodies.
4. State Boards of Nursing, state health departments, and state law only for jurisdiction-specific scope, reporting, consent, public-health, reproductive-health, or practice rules.
5. High-quality international guidance only when a suitable current U.S. source does not provide the needed clinical detail; the source must remain identifiable and must not introduce non-U.S. regulatory assumptions.

## High-change source refresh rules

Refresh affected lessons before publication when a newer authoritative recommendation has been released, especially for:

- NCSBN NCLEX-PN test plans and test specifications;
- CDC immunization schedules, RSV antibody guidance, infection-control guidance, STI treatment, HIV PrEP/PEP, contraception recommendations, isolation/public-health guidance, and wound prophylaxis;
- NIH HIV treatment and perinatal antiretroviral guidance;
- FDA boxed warnings, medication safety communications, antineoplastic labels, newborn/pediatric product labeling, antiarrhythmics, antivirals, antibiotics, antidotes, and product availability;
- AHA CPR/ECC and resuscitation special-circumstance guidance;
- ACC/AHA acute coronary syndrome, heart failure, dysrhythmia, chronic coronary disease, and cardiovascular guidance;
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
- an obsolete drug regimen, isolation practice, vaccine/RSV-antibody schedule, STI/HIV regimen, resuscitation sequence, contraception rule, oncology safety rule, cardiac-drug safety rule, or screening recommendation;
- an exact medication dose without an authoritative current basis or without the patient-specific qualification the recommendation requires;
- an emergency presentation that delays stabilization or escalation for routine testing/documentation;
- an instruction to delegate nursing judgment, initial assessment of instability, or evaluation of acute deterioration to unlicensed personnel;
- unsafe legacy exam myths, including automatically withholding needed oxygen from hypoxemic COPD patients, massaging a suspected DVT limb, putting an object in the mouth during a seizure, giving oral glucose to an unconscious patient, IV-pushing potassium, delaying indicated HIV PEP for routine results, treating vincristine as safe by any non-IV route, using a pound weight as kilograms for pediatric dosing, using oral vancomycin for systemic infection, giving benzathine penicillin G IV, or using daptomycin for pneumonia;
- stigmatizing, coercive, or non-trauma-informed language in mental health, substance use, reproductive health, sexual assault, IPV, HIV care, oncology, pediatric, infectious-disease, or vulnerable-population care.

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

Clinical authored baseline: 424 lessons — COMPLETE as a baseline only.

Still required before declaring the U.S. PN Cram estate complete/live:

- full serving-lesson reconciliation;
- verification of provisional lineage candidates;
- authoring and QA of every remaining `MISSING_CRAM` topic;
- machine/schema validation of all JSON objects;
- stable full-lesson-to-Cram identifier mapping;
- renderer integration into NurseNest Cram mode;
- learner-facing PN/US entitlement QA;
- merge/release/deployment certification.

Do not convert the 424-lesson count into a production-complete claim.
