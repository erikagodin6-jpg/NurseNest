# CNPLE Cram Library — Final Authoring QA V2

QA date: 2026-08-07
Branch: `content/cnple-cram-authoring-20260807`

## Final status

**Clinical authoring: COMPLETE for comprehensive Canadian entry-level CNPLE scope.**

**Second-pass clinical audit: PASS.**

**Machine-readable structural audit: PASS.**

Renderer integration, release merge and production deployment remain separate work and are not claimed complete here.

## Structural validation results

The authored branch was sparse-cloned and the complete `content-authoring/cnple/cram` JSON corpus was parsed independently after the final authoring pass.

Hard gates passed:

- 34 clinical JSON content files parsed successfully;
- 385 raw lesson objects parsed successfully;
- 385 unique lesson IDs;
- zero duplicate IDs;
- every lesson contains all required cram fields;
- all required list fields are populated arrays;
- `title`, `system`, `bottomLine`, `examTrap` and `oneLinePearl` are nonblank strings;
- `localPolicyCheck` is boolean;
- V2 source refresh markers are `2026-08`;
- contamination scan found no NCLEX/AANP/ANCC exam labels, FDA/Medicare/Medicaid/HIPAA regulatory framing, `mg/dL` glucose convention or Fahrenheit clinical temperature convention in the CNPLE JSON corpus.

The eight canonical audit-correction objects are explicit supersessions, not eight new distinct topic pathways. Canonical learner coverage therefore consists of 377 topic pathways.

## Clinical QA gates

Every canonical learner-facing lesson must retain:

- bottom-line clinical decision;
- discriminating differential;
- focused assessment;
- appropriate diagnostic workup;
- first-line or disposition-oriented management;
- medication safety;
- red flags and escalation;
- counselling;
- result/referral follow-up;
- CNPLE-style exam trap;
- one-line retrieval pearl;
- Canadian source basis;
- source-as-of date;
- local-policy flag where implementation varies.

## High-change canonical replacements

The following IDs are the source of truth and override older duplicate topic content:

- `cnple-ca-canonical-2026-hypertension`
- `cnple-ca-canonical-2026-asthma`
- `cnple-ca-canonical-2026-type2-diabetes`
- `cnple-ca-canonical-2026-sepsis`
- `cnple-ca-canonical-2026-stroke-tia`
- `cnple-ca-canonical-2026-atrial-fibrillation`
- `cnple-ca-canonical-2026-hfref`
- `cnple-ca-canonical-2026-febrile-infant`

The renderer/import layer must not merge older clinical wording back into these canonical replacements simply to preserve legacy text.

## Safety rejection rules

Reject or hold a lesson if downstream work introduces any of the following:

1. US-only exam, regulatory or public-payer framing presented as Canadian practice.
2. Non-SI glucose or routine Fahrenheit conventions in Canadian learner content.
3. Obsolete PHAC STBBI antimicrobial regimens.
4. Obsolete immunization products/intervals when current NACI guidance differs.
5. An obsolete acetaminophen NAC protocol presented as a universal current Canadian regimen.
6. A rigid older hypertension threshold/target that conflicts with the 2025 Canadian guideline.
7. SABA-only chronic asthma management without an anti-inflammatory strategy.
8. Type 2 diabetes medication selection based only on A1C while ignoring cardiorenal indications.
9. A sepsis pathway that delays shock treatment or applies fluids without reassessment.
10. A stroke/TIA pathway that delays same-day urgent evaluation because symptoms resolved.
11. A febrile-infant pathway that ignores exact age and the current CPS age-stratified framework.
12. Screening used instead of diagnostic evaluation for a symptomatic patient.
13. Pediatric content rewritten as adult content with only dose changes.
14. Pregnancy medication counselling that ignores the harms of untreated maternal disease.
15. A provincial legal/reporting/screening/funding rule presented as a universal Canada-wide fact.
16. Stigmatizing, coercive or stereotype-based language in Indigenous health, disability, 2SLGBTQIA+ care, substance use, mental health, reproductive health or safeguarding.
17. Capacity inferred solely from age, disability, diagnosis or communication method.
18. Emergency content with no escalation/disposition pathway.
19. A diagnostic result or referral without an ownership/follow-up plan.

## Source hierarchy

1. CNPLE/CCRNR/CNO competency and regulatory sources.
2. Canadian federal public-health and immunization sources: PHAC, NACI, Canadian Immunization Guide.
3. Canadian national specialty societies and living guidelines.
4. Provincial/territorial pathways for operational matters where national uniformity does not exist.
5. High-quality international guidance only when Canadian guidance does not supply the necessary clinical detail; the international source must remain visible in `sourceBasis` and must not introduce US regulatory assumptions.

See `SOURCE_REFRESH_LEDGER_V2.md` for refresh triggers.

## Final content decision

The authoring estate now has broad and deep coverage across all CNPLE entry-level competency categories and patient populations. No additional broad content category is missing after the V2 gap audit.

Future additions should be evidence-driven by a new blueprint, new Canadian clinical guidance, learner-performance weakness, or a truly distinct uncovered presentation. Adding lessons solely to raise the numerical count would reduce rather than improve content quality.
