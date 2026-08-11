# U.S. PN / NCLEX-PN Cram Authoring QA Addendum — 624

Status: ACTIVE AUTHORING
Checkpoint: 624 distinct authored Cram lessons

This addendum inherits every rejection, scope, source, lineage, and publication rule in `AUTHORING_QA.md` and all prior QA addenda. It does not weaken or replace them.

## IV and medication-calculation safety batch

Ten lessons add concentration verification, reconstitution, mg/kg/day versus mg/kg/dose distinction, infusion-rate verification, line tracing, IV compatibility, renal-dose cues, hepatic-dose cues, medication reconciliation, and dose-reasonableness checks.

Safety rules preserved:
- the exact supplied concentration is verified before dose-volume calculation;
- reconstitution uses product-specific diluent/final-concentration instructions;
- pediatric calculations distinguish mg/kg/day from mg/kg/dose and use kilograms;
- smart pumps and calculators do not replace clinical dose/rate reasonableness checks;
- IV lines are physically traced source-to-patient before manipulation;
- Y-site compatibility is verified from an approved source rather than visual appearance;
- renal/hepatic deterioration triggers medication-risk recognition and escalation, not autonomous PN dose adjustment;
- transition medication lists are reconciled rather than copied forward;
- IV therapy, pump programming, central-line manipulation, and high-alert responsibilities remain state/facility/competency dependent and use `statePolicyCheck: true`.

## Critical-care and burn safety batch

Ten lessons add inhalation injury, electrical injury, chemical decontamination, circumferential-burn perfusion monitoring, burn-shock monitoring, hypothermia prevention, burn infection/sepsis, tetanus wound prophylaxis, procedural pain, and contracture prevention.

Safety rules preserved:
- enclosed-space smoke exposure can produce evolving airway edema; concerning airway cues are escalated early;
- small electrical entry wounds do not rule out deep muscle/cardiac/renal injury;
- chemical exposure is stopped/decontaminated before routine wound dressing and staff secondary contamination is prevented;
- circumferential burns are monitored for early neurovascular/ventilatory compromise; pulse loss is not required before escalation;
- burn resuscitation formulas are framed as specialty-team starting estimates, not autonomous PN titration authority;
- large burns require active hypothermia prevention;
- burn infection is evaluated using wound change plus systemic deterioration rather than colonization alone;
- current CDC wound guidance is preserved: burns with devitalized tissue are dirty/major wounds for tetanus-risk assessment, vaccine/TIG depend on wound and immunization history, and antibiotics are not used solely to prevent tetanus;
- procedural burn pain is anticipated before dressing changes/rehabilitation while respiratory/CNS depression is monitored;
- anti-contracture positioning/ROM follows burn/PT/OT plans and graft precautions rather than independent alteration.

## Lineage boundary

Both new files are `SOURCE_FAMILY_AUTHORED_NOT_ROW_MAPPED`. They target `nursing-medication-dosage-iv-expansion-catalog.json` and `procedures-critical-care-burns-tiered-catalog.json` source families but do not decrement PN-013 or PN-015 counts without exact learner-reachable source-row verification and substantive Full-to-Cram comparison.

Measured production baseline remains:
- 1,177 indexed/learner-reachable U.S. PN lessons;
- 139 U.S. PN-013 pharmacology-element gaps;
- 971 U.S. PN-015 Cram-safety gaps;
- 796 missing Pre-Tests;
- 919 missing Post-Tests;
- 3 live-not-indexed/curation rows;
- 0 counted resolved production rows.

Completion remains fail-closed until every applicable learner-reachable `us-lpn-nclex-pn` Full lesson is row-classified and unexplained `MISSING_CRAM` reaches zero.
