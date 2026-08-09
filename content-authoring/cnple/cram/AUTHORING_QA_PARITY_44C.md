# CNPLE Cram V2 — Parity Batch 44C Clinical Second Pass

Date: 2026-08-09
Scope: `44c-dermatology-procedures-wounds-hair-nail-peds-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-skin-biopsy-techniques-and-indications`
- `np-cryotherapy-and-electrosurgery-basics`
- `np-wound-care-and-healing-principles`
- `np-leg-ulcer-evaluation-and-management`
- `np-hidradenitis-suppurativa-management`
- `np-hair-loss-evaluation-and-treatment`
- `np-nail-disorders-diagnosis`
- `np-pediatric-dermatology-common-conditions`

All IDs are literal slugs emitted by the canonical NP parity generator.

## Clinical review

### Biopsy / destructive procedures
PASS. Biopsy technique is selected from the diagnostic question and required depth. Melanoma depth and autoimmune-blistering direct-immunofluorescence specimen location are protected. Cryotherapy/electrosurgery are not used when histology is required or malignancy remains plausible.

### Wounds / leg ulcers
PASS. Chronic wound management is etiology/perfusion/pressure/edema/infection driven rather than dressing driven. Compression is not applied before clinically meaningful arterial insufficiency is assessed. Colonization is separated from invasive infection, and critical ischemia/deep infection/osteomyelitis are escalation triggers.

### Hidradenitis suppurativa
PASS. HS is framed as chronic follicular inflammatory disease rather than poor hygiene or repeated contagious abscesses. Longitudinal medical/biologic/deroofing/surgical strategies are distinguished from temporary incision-and-drainage relief. Mental-health, IBD/arthritis and metabolic comorbidity are included.

### Hair loss
PASS. Scarring versus nonscarring alopecia is the first safety distinction. Patterned, telogen, alopecia areata, traction, tinea and trichotillomania patterns are separated; suspected cicatricial disease prompts early biopsy/dermatology because follicle loss may become permanent.

### Nail disorders
PASS. Nail dystrophy is not assumed to be fungus. Systemic antifungal treatment requires mycologic confirmation, while evolving solitary longitudinal pigmentation/nail-unit mass triggers melanoma evaluation. Physiologic melanonychia in darker skin is not overcalled as disease.

### Pediatric dermatology
PASS. Age/morphology/distribution and systemic appearance guide the diagnosis. Toxic nonblanching rash, mucosal blistering, eczema herpeticum, neonatal vesicles, severe cellulitis and safeguarding concerns are explicit red flags. Pediatric topical/systemic dosing avoids adult-strength assumptions across large body surface area.

## Canadian source refresh

Load-bearing sources rechecked on 2026-08-09:

- Canadian Dermatology Association hidradenitis suppurativa, alopecia, nail and pediatric/skin-diversity resources.
- Choosing Wisely Canada Dermatology recommendations for mycologic confirmation and topical-antibiotic stewardship.
- Wounds Canada best-practice principles for chronic/venous wounds and cause-directed wound-bed management.
- Canadian dermatology procedural and pediatric practice principles.

## Authoring gates

- Required Cram fields: present in all eight.
- Canadian/SI framing: PASS.
- Procedure/biopsy diagnostic integrity: PASS.
- Vascular/wound infection distinctions: PASS.
- Dermatology diversity/pediatric safety: PASS.

## Completion note

With 44A, 44B and 44C, all 26 Dermatology concepts emitted by `generate-np-parity-expansion-catalog.mjs` have dedicated, clinically second-pass-reviewed CNPLE Cram authoring identities.

## Publication boundary

Clinical authoring second pass only. Manifest registration, current Full-source anchoring, Bottom Line evidence, exactly three eligible Quick Checks, runtime recipe integrity, learner rendering, merge and deployment remain downstream fail-closed gates.
