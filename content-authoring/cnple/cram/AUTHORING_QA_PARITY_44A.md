# CNPLE Cram V2 — Parity Batch 44A Clinical Second Pass

Date: 2026-08-09
Scope: `44a-dermatology-inflammatory-infectious-parity.json`
Result: **PASS — clinical authoring second pass**

## Exact identity contract

- `np-acne-vulgaris-diagnosis-and-treatment`
- `np-rosacea-diagnosis-and-management`
- `np-atopic-dermatitis-management`
- `np-contact-dermatitis-evaluation-and-management`
- `np-psoriasis-diagnosis-and-treatment`
- `np-seborrheic-dermatitis-management`
- `np-bacterial-skin-infections-management`
- `np-viral-skin-infections-diagnosis-and-treatment`
- `np-fungal-skin-infections-diagnosis-and-treatment`

All IDs are literal slugs emitted by the canonical NP parity generator.

## Clinical review

### Acne / rosacea
PASS. Acne uses comedonal/inflammatory/scarring risk and antibiotic stewardship; oral antibiotics are reassessed rather than continued indefinitely and benzoyl peroxide accompanies antibiotic therapy. Rosacea is separated from acne and ocular disease is treated as a safety issue.

### Atopic / contact / seborrheic dermatitis
PASS. Atopic dermatitis uses barrier repair plus adequate anti-inflammatory treatment and recognizes eczema herpeticum. Contact dermatitis is exposure-pattern based and patch testing—not serum allergy testing—is used for delayed allergic contact disease. Seborrheic dermatitis uses antifungal maintenance and avoids chronic potent facial steroid use.

### Psoriasis
PASS. Skin severity is linked to joint, mental-health and cardiometabolic burden. Psoriatic arthritis screening and systemic/biologic escalation are explicit; routine systemic corticosteroid treatment is rejected.

### Bacterial infection
PASS. Cellulitis, abscess and pseudocellulitis are separated. Bilateral chronic lower-leg erythema is not automatically treated with antibiotics; abscess management preserves drainage/source control and necrotizing infection red flags.

### Viral infection
PASS. HSV, zoster, warts and molluscum are separated. Ocular, disseminated, neonatal, neurologic and immunocompromised HSV/VZV presentations are urgent.

### Fungal infection
PASS. Limited tinea uses topical therapy; scalp/extensive/nail disease may require systemic therapy. Mycologic confirmation is required before systemic onychomycosis treatment and potent antifungal–steroid combination misuse is rejected.

## Canadian source refresh

Load-bearing sources rechecked on 2026-08-09:

- Canadian Dermatology Association acne, eczema and psoriasis clinical/public resources.
- Choosing Wisely Canada Dermatology recommendations, including acne antibiotic duration, pseudocellulitis, topical antibiotic stewardship and confirmation before systemic onychomycosis treatment.
- Choosing Wisely Canada Emergency Medicine recommendations for uncomplicated abscess management.
- Canadian dermatology/infectious-disease practice principles for rosacea, viral skin disease and tinea.

## Authoring gates

- Required Cram fields: present in all nine.
- Canadian/SI framing: PASS.
- US-only exam/regulatory framing: none intentionally authored.
- Antibiotic/antifungal stewardship: PASS.
- Dermatologic emergencies/red flags: present.

## Publication boundary

Clinical authoring second pass only. Manifest registration, exact current Full-source anchoring, Bottom Line evidence, three eligible Quick Checks, runtime recipe integrity, learner rendering, merge and deployment remain downstream fail-closed gates.
