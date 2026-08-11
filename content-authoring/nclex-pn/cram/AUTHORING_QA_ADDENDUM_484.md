# U.S. PN / NCLEX-PN Cram — QA Addendum at 484 Lessons

QA date: 2026-08-09
Branch: `content/us-pn-cram-authoring-20260807`
Authored checkpoint: **484 Cram lessons**
Status: ACTIVE AUTHORING — production serving-row reconciliation remains incomplete.

This addendum inherits every rule in `AUTHORING_QA.md`, `AUTHORING_QA_444.md`, and `AUTHORING_QA_ADDENDUM_464.md`. It does not weaken, supersede, or truncate the full QA contract.

## New neuro/cognitive pharmacology QA

The 48 batch adds donepezil, memantine, galantamine, carbidopa/levodopa, entacapone, pramipexole, levetiracetam, gabapentin, pregabalin, and buspirone.

Safety requirements preserved in this batch:

- dementia drugs are symptomatic therapy and must never be presented as cures or as treatment for a new acute delirium;
- cholinesterase inhibitors retain bradycardia/syncope, GI/weight-loss, and fall-risk monitoring;
- carbidopa/levodopa is treated as time-sensitive therapy, with wearing-off separated from dyskinesia and abrupt dopaminergic withdrawal treated as dangerous;
- entacapone is adjunctive to levodopa/carbidopa and can intensify levodopa adverse effects;
- pramipexole retains sudden-sleep, hallucination, orthostatic, renal, and impulse-control warnings;
- levetiracetam retains behavioral/psychiatric and suicidality monitoring and must not be stopped abruptly without direction;
- gabapentin and pregabalin retain renal-dose awareness and respiratory-depression risk when combined with opioids or other CNS depressants;
- pregabalin angioedema is distinguished from ordinary peripheral edema;
- buspirone is scheduled anxiolytic therapy with delayed benefit, not rapid PRN panic rescue.

## New endocrine/metabolic pharmacology QA

The 49 batch adds sitagliptin, linagliptin, pioglitazone, acarbose, insulin glargine, insulin lispro, intranasal glucagon, cabergoline, bromocriptine, and somatropin.

Safety requirements preserved in this batch:

- DPP-4 inhibitors keep product-specific renal rules rather than treating the class as interchangeable; sitagliptin requires renal-dose adjustment while linagliptin generally does not;
- pancreatitis, serious hypersensitivity, bullous pemphigoid, and combination-therapy hypoglycemia remain visible DPP-4 safety signals;
- pioglitazone retains the congestive-heart-failure boxed warning and edema/weight/fracture/mac\-ular-edema surveillance;
- acarbose is tied to the first bite of a meal and preserves the glucose/dextrose rescue principle when combination therapy causes hypoglycemia;
- basal glargine and rapid lispro are kept distinct by physiologic role, meal timing, concentration/device verification, injection-site safety, and formulation-specific route rules;
- intranasal glucagon is taught as severe-hypoglycemia rescue that does not require inhalation, while airway positioning, emergency follow-up, and recurrence monitoring remain mandatory;
- cabergoline retains current valvular/fibrotic screening and impulse-control risks and is not taught as routine suppression of physiologic postpartum lactation;
- bromocriptine requires exact formulation/indication verification and retains orthostatic, psychiatric, and interaction risks;
- somatropin is restricted to appropriate growth-hormone indications and retains intracranial-hypertension, slipped-capital-femoral-epiphysis, glucose, thyroid, adrenal, edema, and exact-device monitoring.

## PN/LVN scope checkpoint

These medication lessons remain entry-level PN/LVN Cram content. They emphasize medication verification, focused observation, prescribed administration where authorized, adverse-effect recognition, reinforcement of teaching, and timely escalation. They do not grant independent diagnosis, prescribing, insulin-regimen design, dopamine-agonist titration, antiseizure titration, endocrine diagnosis, or specialty-drug initiation authority.

`statePolicyCheck: true` remains required where medication administration, insulin protocols, controlled-substance handling, injection teaching, emergency medication protocols, or specialty treatment responsibilities vary by state or facility.

## Production reconciliation checkpoint

The production denominator is intentionally unchanged from the 2026-08-05 audit:

- learner-reachable U.S. PN full lessons: **1,177**;
- U.S. `PN-013-pharmacology-element-gap`: **139**;
- U.S. `PN-015-cram-safety-gap`: **971**;
- missing Pre-Tests: **796**;
- missing Post-Tests: **919**;
- live-not-indexed/curation rows: **3**;
- `countedResolvedProductionRows`: **0**.

The authored checkpoint of 484 does not resolve a serving row by itself. Exact learner-reachable row identity plus substantive content-equivalence review is still required before a production gap can be decremented.

## Completion boundary

Do not convert the 484-lesson authored checkpoint into a production-complete claim. Completion still requires stable row-level `MATCHED`, `MISSING_CRAM`, or `NOT_APPLICABLE_TO_US_PN` classification for the serving U.S. PN estate and zero unexplained `MISSING_CRAM` rows, followed by schema/renderer/integration/entitlement/release verification.
