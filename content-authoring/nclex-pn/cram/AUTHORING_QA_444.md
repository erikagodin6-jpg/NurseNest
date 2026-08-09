# U.S. PN / NCLEX-PN Cram — QA Checkpoint 444

Checkpoint date: 2026-08-09
Branch: `content/us-pn-cram-authoring-20260807`
Authored Cram lessons: 444
Status: ACTIVE AUTHORING; production reconciliation remains incomplete.

This addendum **inherits every rule and rejection gate in `AUTHORING_QA.md`**. It does not replace, narrow, or weaken that contract.

## New batch QA

### Dermatology pharmacology

The 20-lesson expansion includes a 10-lesson dermatology batch covering clobetasol topical, silver sulfadiazine, isotretinoin, topical tacrolimus, dupilumab, apremilast, calcipotriene, topical ketoconazole, acitretin, and topical fluorouracil.

Safety decisions preserved:

- super-potent topical corticosteroids can produce skin atrophy and systemic glucocorticoid effects when exposure is excessive;
- topical burn antimicrobial therapy never substitutes for burn-depth assessment, source control, or specialty escalation;
- isotretinoin remains a pregnancy-prevention/REMS medication with systemic adverse-effect monitoring;
- topical tacrolimus remains dermatologic-only and retains the current long-term-safety boxed warning;
- biologic therapy is maintenance therapy, not rescue treatment for acute deterioration;
- systemic retinoid pregnancy risk can persist after treatment stops;
- route matters: topical ketoconazole and topical fluorouracil are not taught as interchangeable with systemic formulations.

### Rheumatology / immunology pharmacology

The 10-lesson immunology batch covers adalimumab, etanercept, infliximab, tofacitinib, upadacitinib, abatacept, secukinumab, ustekinumab, rituximab, and leflunomide.

Safety decisions preserved:

- TNF inhibitors require serious-infection/TB screening and hepatitis-B reactivation awareness;
- biologic infusion reactions require protocol-driven interruption/escalation rather than automatic continuation;
- JAK inhibitors retain serious-infection, malignancy, cardiovascular, mortality, and thrombosis risk framing;
- live-vaccine and overlapping-immunosuppression decisions require prescriber review;
- IL-17 blockade requires attention to new/worsening inflammatory-bowel symptoms;
- rituximab requires infusion-reaction, HBV-reactivation, infection, and PML vigilance;
- leflunomide can require accelerated drug elimination because the active metabolite persists after tablets stop.

## PN/LVN scope check

No new lesson grants universal LPN/LVN authority to initiate, independently titrate, select, prescribe, or manage biologic/JAK/infusion therapy. The PN-facing pathway remains:

`recognize cues -> implement authorized care -> monitor -> report/escalate -> evaluate response`

`statePolicyCheck: true` is retained when administration authority or specialty competency varies by state/facility.

## Reconciliation gate

The production audit still measures 1,177 learner-reachable U.S. PN lessons, 139 U.S. PN-013 pharmacology-element gaps, 971 U.S. PN-015 Cram-safety gaps, 796 missing Pre-Tests, 919 missing Post-Tests, and 3 live-not-indexed items at the 2026-08-05 checkpoint.

`countedResolvedProductionRows` remains **0**. The audit exposes aggregate/source counts and sample slugs rather than a complete row-level PN-013/PN-015 inventory; no newly authored topic is credited as a resolved production row by inference.

Completion still requires every applicable serving `us-lpn-nclex-pn` lesson to be classified by stable identity as `MATCHED`, `MISSING_CRAM`, or `NOT_APPLICABLE_TO_US_PN`, with zero unexplained `MISSING_CRAM` rows, followed by schema validation, renderer mapping, learner-facing entitlement QA, merge, release, and deployment verification.
