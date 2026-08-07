# CNPLE Cram Library — Authoring QA

QA date: 2026-08-07
Branch: `content/cnple-cram-authoring-20260807`
Status: clinical authoring complete for v1; renderer mapping and production publication intentionally not performed in this authoring lane.

## Coverage QA

The v1 library contains 90 full cram lessons. The content spans all CNPLE blueprint domains and the major clinical presentations expected in entry-level NP practice across the lifespan.

The library deliberately prioritizes:

- immediate stability and disposition decisions;
- focused assessment rather than generic head-to-toe review;
- dangerous alternatives that must not be missed;
- discriminating investigations rather than shotgun panels;
- first-line management and treatment sequencing;
- medication contraindications, interactions and monitoring;
- red flags and emergency escalation;
- patient and family counselling;
- continuity, result ownership and follow-up;
- Canadian prevention, immunization, STBBI and antimicrobial-stewardship decisions;
- provincial or territorial variability where national uniformity cannot safely be assumed.

## Cognitive-level QA

The CNPLE blueprint heavily weights application and critical thinking. These lessons therefore use a clinical-decision sequence rather than a compressed textbook format:

`recognize -> differentiate -> assess -> investigate -> manage -> escalate/follow-up`

Pure recall is kept to the minimum needed to support decisions. Each lesson contains an `examTrap` to surface a plausible but unsafe or lower-value action and a `bottomLine`/`oneLinePearl` for last-minute retrieval.

## Canadian source hierarchy

Clinical claims were authored using the following hierarchy whenever applicable:

1. CCRNR / CNPLE national blueprint and Canadian NP entry-level competencies.
2. Public Health Agency of Canada and NACI guidance.
3. Canadian national specialty societies and guideline groups, including CCS, Hypertension Canada, Diabetes Canada, Canadian Thoracic Society, Canadian Stroke Best Practices, Thrombosis Canada, Canadian Paediatric Society, Canadian Rheumatology Association, Canadian Association of Gastroenterology, CASL, Canadian Urological Association, Canadian Menopause Society/SOGC and Choosing Wisely Canada.
4. Provincial or territorial clinical pathways where no sufficiently current national implementation guidance exists.
5. High-quality international specialty guidance only when a Canadian source does not provide the needed clinical detail; this must remain identifiable in `sourceBasis`.

## High-change source rules

The following source families must be refreshed before publication if the serving content is materially older than the current source or if a new national update is released:

- PHAC STBBI treatment guidance;
- NACI / Canadian Immunization Guide schedules and products;
- Hypertension Canada thresholds and pharmacotherapy;
- Diabetes Canada pharmacotherapy and kidney-protection guidance;
- CCS/CHRS atrial fibrillation and heart-failure pathways;
- Thrombosis Canada VTE diagnosis and anticoagulation guidance;
- Canadian Stroke Best Practices acute stroke/TIA pathways;
- CPS febrile infant and other acute pediatric statements;
- CASL viral hepatitis guidance;
- Canadian Thoracic Society asthma/COPD/sleep guidance;
- CRA living rheumatology guidelines;
- SOGC/CMS reproductive, pregnancy and menopause guidance.

If a recommendation varies by formulary, reporting law, consent law, prescribing authority, publicly funded screening program, driving rules, referral access or public-health practice, `localPolicyCheck` must remain `true` and the renderer must not convert the content into a false Canada-wide legal or operational rule.

## Safety QA rules

Before serving a lesson, reject or hold the lesson if any of the following is introduced during downstream mapping or editing:

- US-only units, screening schedules, regulatory assumptions or formularies presented as Canadian practice;
- obsolete antibiotic or STBBI regimens;
- an exact medication dose without a current authoritative basis or required patient-specific qualification;
- an emergency presentation that lacks an escalation/disposition pathway;
- advice that delays stabilization for confirmatory testing;
- a screening test used in place of diagnostic evaluation for a symptomatic patient;
- an unsupported absolute contraindication or a fabricated threshold;
- a provincial legal rule presented as a national Canadian rule;
- a pediatric condition handled as an adult condition with only a dose adjustment;
- stigmatizing or coercive substance-use, mental-health, reproductive or cultural-safety language.

## Renderer integrity rule

The clinical objects are the source of truth. Downstream UI integration must preserve the meaning of:

- `bottomLine`
- `differentiate`
- `management`
- `medicationSafety`
- `redFlags`
- `followUp`
- `examTrap`

If the current Cram extractor cannot render one of these fields, fix or adapt the mapping layer. Do not delete or rewrite clinically necessary content merely to satisfy a UI join key or section-role limitation.

## Publication checkpoint

Clinical authoring: COMPLETE for v1.

Still separate work:

- parse/schema validation against the final serving contract;
- renderer mapping into NurseNest Cram mode;
- learner-facing UI QA;
- any desired pre-test/post-test/case-question linkage;
- merge/release/deployment certification.

Those tasks must not be falsely reported as complete merely because this authoring branch exists.
