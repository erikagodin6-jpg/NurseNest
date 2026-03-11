import { AlliedSEO } from "@/allied/allied-seo";
import { HubHero, ContentCard, FinalCTASection } from "./components";
import { Brain } from "lucide-react";

const FLASHCARD_DECKS = [
  { title: "Trauma Assessment & Management", description: "XABCDE primary survey, hemorrhage control, trauma triage criteria, and prehospital trauma management protocols.", cardCount: 45, tags: ["Trauma", "Assessment"] },
  { title: "ACLS Pharmacology", description: "Cardiac arrest drugs, antiarrhythmics, vasopressors, and peri-arrest medication dosages and indications.", cardCount: 50, tags: ["Pharmacology", "Cardiac"] },
  { title: "Cardiac Rhythms & ECG", description: "Rhythm identification, STEMI recognition, bundle branch blocks, axis deviation, and dysrhythmia management.", cardCount: 40, tags: ["Cardiac", "ECG"] },
  { title: "Airway Management", description: "Basic and advanced airway techniques, RSI medications, difficult airway algorithms, and ventilator settings.", cardCount: 35, tags: ["Airway", "Procedures"] },
  { title: "Pediatric Emergencies & PALS", description: "Pediatric assessment triangle, weight-based dosing, PALS algorithms, and neonatal resuscitation steps.", cardCount: 30, tags: ["Pediatric", "PALS"] },
  { title: "Medical Emergencies", description: "Stroke assessment (FAST/LAMS), sepsis criteria, diabetic emergencies, seizure management, and toxicology.", cardCount: 40, tags: ["Medical", "Assessment"] },
  { title: "OB Emergencies", description: "Normal delivery, shoulder dystocia, breech presentation, eclampsia, postpartum hemorrhage, and neonatal care.", cardCount: 25, tags: ["OB", "Neonatal"] },
  { title: "Field Drug Dosages", description: "All paramedic-scope medication dosages, routes, contraindications, and side effects in a quick-reference format.", cardCount: 55, tags: ["Pharmacology", "Quick Reference"] },
  { title: "EMS Operations & Triage", description: "START/JumpSTART triage, MCI management, ICS structure, communication protocols, and transport decisions.", cardCount: 30, tags: ["Operations", "Triage"] },
  { title: "Assessment Mnemonics", description: "OPQRST, SAMPLE, DCAP-BTLS, GCS scoring, APGAR, and all essential paramedic assessment mnemonics.", cardCount: 25, tags: ["Assessment", "Quick Reference"] },
];

export default function ParamedicFlashcardsHub() {
  return (
    <div data-testid="paramedic-flashcards-hub">
      <AlliedSEO
        title="Paramedic Flashcards — Spaced Repetition Study Decks | NurseNest"
        description="Master paramedic protocols, drug dosages, and clinical mnemonics with spaced repetition flashcard decks. Covers trauma, ACLS, pharmacology, pediatrics, and more."
        keywords="paramedic flashcards, EMS flashcards, ACLS flashcards, paramedic drug dosages, paramedic study cards, spaced repetition paramedic"
        canonicalPath="/paramedic/flashcards"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Paramedic Flashcards",
          "description": "Spaced repetition flashcard decks for paramedic exam prep covering trauma, ACLS, pharmacology, pediatrics, and clinical mnemonics.",
          "provider": { "@type": "Organization", "name": "NurseNest Allied", "url": "https://allied.nursenest.ca" }
        }}
      />

      <HubHero
        title="Paramedic Flashcards"
        subtitle="Spaced repetition flashcard decks organized by clinical domain. Cards adapt to your recall accuracy — spending more time on concepts you find difficult and less on what you already know."
        breadcrumbs={[
          { label: "Paramedic", href: "/paramedic" },
          { label: "Flashcards" },
        ]}
      />

      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-sm text-gray-500">{FLASHCARD_DECKS.length} flashcard decks · {FLASHCARD_DECKS.reduce((a, d) => a + d.cardCount, 0)} total cards</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FLASHCARD_DECKS.map(deck => (
              <ContentCard
                key={deck.title}
                title={deck.title}
                description={deck.description}
                meta={`${deck.cardCount} cards`}
                tags={deck.tags}
                href="/careers/paramedic/flashcards"
                icon={Brain}
              />
            ))}
          </div>
        </div>
      </section>

      <FinalCTASection
        title="Master Paramedic Concepts with Spaced Repetition"
        subtitle="Flashcards are most effective when combined with practice questions and clinical scenarios. Start with a free diagnostic to build your personalized study plan."
        primaryCTA={{ label: "Start Free Diagnostic", href: "/diagnostic?career=paramedic" }}
        secondaryCTA={{ label: "View Pricing", href: "/pricing" }}
      />
    </div>
  );
}
