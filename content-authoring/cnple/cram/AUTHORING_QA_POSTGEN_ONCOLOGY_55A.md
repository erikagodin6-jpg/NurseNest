# CNPLE Cram — Post-Generator Oncology Supportive-Care Batch 55A Clinical Second Pass

Date: 2026-08-11
Scope: `55a-postgen-oncology-oral-supportive-parity.json`
Result: **PASS — clinical authoring second pass**

## Source-integrity denominator

This batch does **not** claim that a broad Oncology generator family is complete. It is based on two exact owner-curated NP lesson identities found in the current `nursenest-core` staging estate:

- `mucositis-np`
- `oral-candidiasis-np`

The core staging records explicitly label these lesson packages as not publication-certified / not learner-visible. Therefore this batch provides clinically reviewed Cram companions for those exact identities, but it does not count either identity toward current `publicComplete` parity until private-core reconciliation proves the corresponding canonical Full lesson is active and eligible.

## Mucositis

PASS. The lesson treats oral mucositis as treatment-related inflammatory injury while maintaining a differential for candidiasis, HSV/viral disease, bacterial/dental infection and esophageal involvement. It prioritizes oral intake, hydration, swallowing/airway status and possible febrile neutropenia over lesion appearance. It does not teach a universal compounded “magic mouthwash,” does not use empiric antifungal therapy for every white ulcer base, and preserves oncology ownership of antineoplastic treatment holds/dose modification.

## Oral candidiasis

PASS. The lesson distinguishes pseudomembranous removable plaques, erythematous candidiasis, mucositis and non-candidal white lesions. It treats odynophagia/dysphagia/retrosternal pain as possible esophageal disease, preserves immunocompromised-host escalation, and uses topical versus systemic antifungal therapy according to severity/host/esophageal risk rather than one universal regimen. Systemic azole interaction, hepatic/QT and pregnancy considerations are explicit; recurrent fluconazole exposure is not treated as risk-free.

## Current Canadian source refresh

Load-bearing sources rechecked on 2026-08-11:

- Cancer Care Ontario — **Oral Care (Mouth Care)**: current professional algorithms include mucositis, fungal, bacterial and viral oral-infection pathways.
- Cancer Care Ontario — **Mouth Care During Cancer Treatment**, updated November 2025: oral hygiene/moisture guidance and urgent escalation for fever or inability to eat/drink/swallow.
- Public Health Agency of Canada — **Candida albicans Pathogen Safety Data Sheet**: mucocutaneous antifungal susceptibility/treatment context and recognition of resistance with repeated fluconazole exposure in immunosuppressed patients.
- Health Canada medication safety/product information for systemic azole therapy, including pregnancy and drug-safety context.

## Safety gates

- No universal oncology treatment-hold rule authored.
- No universal mucositis mouthwash formula presented as evidence-equivalent across institutions.
- No routine antifungal treatment of all treatment-related ulcers.
- Possible febrile neutropenia remains an urgent oncology/acute-care pathway.
- Odynophagia/esophageal candidiasis red flags explicitly dispositioned.
- Systemic azole interaction/pregnancy review explicitly required.
- Required Cram fields present by editorial review; machine parser remains downstream.

## Publication boundary

Clinical authoring PASS only. Exact current normalized Full existence/publicComplete state, source anchors, Bottom Line evidence, exactly three eligible Quick Checks, shared runtime certification, authenticated learner rendering, manifest consolidation, merge and deployment remain fail-closed downstream work.
