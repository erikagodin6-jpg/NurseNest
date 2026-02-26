import {
  MicroLesson,
  CognitiveCard,
  HoverReveal,
  MatchingExercise,
  SelfCheckQuiz,
  ProgressiveReveal,
} from "@/components/interactive-learning";
import { Bug, Shield, Microscope, AlertTriangle } from "lucide-react";

export function MicrobiologyModule() {
  return (
    <div className="space-y-10" data-testid="module-microbiology">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Microbiology Foundations</h2>
        <p className="text-gray-600">
          Understand the microorganisms relevant to healthcare — their structures, reproduction, transmission, and the principles of controlling microbial spread.
        </p>
      </div>

      <MicroLesson title="Types of Microorganisms" subtitle="Bacteria, viruses, fungi, parasites, and prions" icon={<Bug className="w-5 h-5" />}>
        <p className="text-sm text-gray-600 leading-relaxed">
          Microorganisms are classified by their{" "}
          <HoverReveal term="cellular structure and reproduction" definition="Bacteria are prokaryotic (no nucleus). Viruses are acellular (not truly alive — require a host cell to replicate). Fungi are eukaryotic (have a nucleus). These structural differences determine how each type is targeted by antimicrobial agents." />.
          Understanding these distinctions is essential because treatment strategies differ fundamentally between organism types.
        </p>
        <ProgressiveReveal
          title="The Five Categories of Microorganisms"
          cards={[
            {
              id: "mb1",
              title: "Bacteria",
              summary: "Prokaryotic, single-celled, diverse metabolisms",
              detail: "Bacteria are prokaryotes — they lack a membrane-bound nucleus and organelles. They have a cell wall (peptidoglycan in most), a plasma membrane, ribosomes, and circular DNA. They reproduce by binary fission (simple division). Classified as Gram-positive (thick peptidoglycan wall, stains purple) or Gram-negative (thin peptidoglycan with outer membrane, stains pink). This distinction affects antibiotic susceptibility.",
            },
            {
              id: "mb2",
              title: "Viruses",
              summary: "Acellular, obligate intracellular parasites",
              detail: "Viruses are not cells — they consist of genetic material (DNA or RNA) surrounded by a protein coat (capsid), sometimes with a lipid envelope. They cannot reproduce independently; they hijack host cell machinery. Enveloped viruses (like influenza) are easier to kill with disinfectants because the lipid envelope is fragile. Non-enveloped viruses (like norovirus) are more resistant.",
            },
            {
              id: "mb3",
              title: "Fungi",
              summary: "Eukaryotic, can be unicellular or multicellular",
              detail: "Fungi include yeasts (unicellular, reproduce by budding — e.g., Candida) and molds (multicellular, grow as hyphae). Fungi have cell walls made of chitin (not peptidoglycan), which is why antibacterial drugs don't work against them. Fungal infections (mycoses) are treated with antifungals that target ergosterol in fungal cell membranes.",
            },
            {
              id: "mb4",
              title: "Parasites",
              summary: "Protozoa, helminths — live on or in a host",
              detail: "Protozoa are single-celled eukaryotes (e.g., Plasmodium causing malaria, Giardia). Helminths are multicellular worms (roundworms, tapeworms, flukes). Parasites have complex life cycles often involving intermediate hosts. Transmission is often fecal-oral, vector-borne, or through contaminated water/food.",
            },
            {
              id: "mb5",
              title: "Prions",
              summary: "Misfolded proteins — no nucleic acid",
              detail: "Prions are infectious misfolded proteins that cause other normal proteins to misfold. They contain no DNA or RNA. They are extremely resistant to standard sterilization methods (heat, chemicals, radiation). Examples include Creutzfeldt-Jakob disease. Prions cannot be treated with antibiotics, antivirals, or antifungals.",
            },
          ]}
        />
      </MicroLesson>

      <MicroLesson title="Normal Flora & Colonization" subtitle="The body's resident microbial communities" icon={<Microscope className="w-5 h-5" />}>
        <p className="text-sm text-gray-600 leading-relaxed">
          The human body hosts trillions of microorganisms collectively called the{" "}
          <HoverReveal term="normal flora (microbiome)" definition="Resident microorganisms that colonize body surfaces (skin, gut, respiratory tract, urogenital tract) without causing disease under normal conditions. They provide protective functions including competitive exclusion of pathogens, vitamin synthesis, and immune system development." />.
          These organisms are not contaminants — they are essential partners in health.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mt-3">
          <div className="p-4 bg-green-50/60 rounded-xl border border-green-100">
            <p className="text-xs font-semibold text-green-700 mb-1">Protective Functions</p>
            <p className="text-xs text-green-600"><strong>Competitive exclusion:</strong> Normal flora occupy binding sites and consume nutrients, preventing pathogens from establishing. <strong>Immune training:</strong> Constant exposure to commensal organisms trains the immune system. <strong>Vitamin production:</strong> Gut bacteria synthesize vitamin K and some B vitamins.</p>
          </div>
          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-100">
            <p className="text-xs font-semibold text-amber-700 mb-1">When Flora Becomes Harmful</p>
            <p className="text-xs text-amber-600"><strong>Opportunistic infection:</strong> Normal flora can cause infection if displaced to a sterile site (e.g., E. coli from gut to urinary tract → UTI). <strong>Antibiotic disruption:</strong> Broad-spectrum antibiotics kill normal flora, allowing resistant organisms like C. difficile to overgrow.</p>
          </div>
        </div>
        <CognitiveCard
          type="warning"
          title="Colonization vs Infection"
          content="Colonization means microorganisms are present and multiplying but not causing tissue damage or immune response. Infection means microorganisms are invading tissue, multiplying, and causing damage with an immune response (signs: redness, swelling, heat, pain, loss of function). A patient can be colonized with MRSA on their skin without being infected — but if that MRSA enters a wound, infection develops."
        />
      </MicroLesson>

      <MicroLesson title="Microbial Transmission" subtitle="How microorganisms spread between hosts" icon={<AlertTriangle className="w-5 h-5" />}>
        <p className="text-sm text-gray-600 leading-relaxed">
          Understanding transmission routes is the foundation of{" "}
          <HoverReveal term="infection prevention" definition="Strategies to interrupt the chain of infection by targeting the weakest links: hand hygiene (breaking the mode of transmission), PPE (protecting the portal of entry), and isolation precautions (containing the reservoir)." />.
          Each route requires different prevention strategies.
        </p>
        <div className="space-y-3 mt-3">
          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
            <p className="text-xs font-semibold text-blue-700 mb-1">Contact Transmission</p>
            <p className="text-xs text-blue-600"><strong>Direct contact:</strong> Person-to-person physical transfer (touching, bodily fluids). <strong>Indirect contact:</strong> Transfer via contaminated objects (fomites) — doorknobs, stethoscopes, bed rails. This is the most common transmission route in healthcare settings. Prevention: Hand hygiene is the single most effective measure.</p>
          </div>
          <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-100">
            <p className="text-xs font-semibold text-purple-700 mb-1">Droplet Transmission</p>
            <p className="text-xs text-purple-600">Large respiratory droplets (&gt;5 μm) generated by coughing, sneezing, or talking. They travel short distances (typically &lt;1 meter) and fall quickly due to gravity. Examples: influenza, pertussis. Prevention: Surgical mask within close proximity.</p>
          </div>
          <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-100">
            <p className="text-xs font-semibold text-rose-700 mb-1">Airborne Transmission</p>
            <p className="text-xs text-rose-600">Tiny droplet nuclei (&lt;5 μm) that remain suspended in air for extended periods and can travel long distances through air currents. Examples: tuberculosis, measles, varicella. Prevention: N95 respirator, negative-pressure room, airborne precautions.</p>
          </div>
        </div>
      </MicroLesson>

      <MicroLesson title="Sterilization, Disinfection & Asepsis" subtitle="Levels of microbial control" icon={<Shield className="w-5 h-5" />}>
        <p className="text-sm text-gray-600 leading-relaxed">
          Microbial control exists on a spectrum from{" "}
          <HoverReveal term="sterilization" definition="The complete destruction or removal of ALL forms of microbial life, including bacterial endospores. Achieved through autoclaving (steam under pressure), ethylene oxide gas, or ionizing radiation. Required for surgical instruments and implantable devices." />{" "}
          to basic cleaning. Understanding this hierarchy prevents both under-treatment (infection risk) and over-treatment (unnecessary cost/damage).
        </p>
        <div className="space-y-3 mt-3">
          <div className="p-4 bg-red-50/60 rounded-xl border border-red-100">
            <p className="text-xs font-semibold text-red-700 mb-1">Sterilization (Highest Level)</p>
            <p className="text-xs text-red-600">Destroys ALL microorganisms including spores. Methods: autoclaving (121°C, 15 psi, 15+ min), chemical sterilants (glutaraldehyde), ethylene oxide gas. Used for: surgical instruments, implants, items entering sterile body cavities.</p>
          </div>
          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-100">
            <p className="text-xs font-semibold text-amber-700 mb-1">High-Level Disinfection</p>
            <p className="text-xs text-amber-600">Destroys all microorganisms EXCEPT high numbers of bacterial spores. Used for semi-critical items that contact mucous membranes or non-intact skin (endoscopes, respiratory therapy equipment).</p>
          </div>
          <div className="p-4 bg-yellow-50/60 rounded-xl border border-yellow-100">
            <p className="text-xs font-semibold text-yellow-700 mb-1">Intermediate & Low-Level Disinfection</p>
            <p className="text-xs text-yellow-600">Intermediate: Kills vegetative bacteria, most viruses and fungi, mycobacteria. Low: Kills most bacteria and some viruses/fungi. Used for non-critical items (blood pressure cuffs, stethoscopes, environmental surfaces).</p>
          </div>
          <div className="p-4 bg-green-50/60 rounded-xl border border-green-100">
            <p className="text-xs font-semibold text-green-700 mb-1">Antisepsis</p>
            <p className="text-xs text-green-600">Application of antimicrobial agents to LIVING tissue (skin, mucous membranes). Antiseptics are safe for skin; disinfectants are NOT. Example: chlorhexidine for surgical hand scrub, povidone-iodine for skin prep. Never use a disinfectant as an antiseptic.</p>
          </div>
        </div>
        <CognitiveCard
          type="concept"
          title="Critical Distinction"
          content="Antiseptics are for living tissue. Disinfectants are for inanimate objects. Using a disinfectant on skin causes chemical burns. Using an antiseptic on a surgical instrument does not achieve sterilization. Matching the right agent to the right surface is a safety fundamental."
        />
      </MicroLesson>

      <MatchingExercise
        title="Match the Microbiology Concept"
        pairs={[
          { term: "Gram-positive bacteria", definition: "Thick peptidoglycan wall, stains purple" },
          { term: "Virus", definition: "Acellular, requires host to replicate" },
          { term: "Prion", definition: "Misfolded protein, no nucleic acid" },
          { term: "Normal flora", definition: "Resident microbes that usually don't cause disease" },
          { term: "Sterilization", definition: "Destroys ALL microbes including spores" },
          { term: "Antiseptic", definition: "Antimicrobial agent safe for living tissue" },
        ]}
      />

      <SelfCheckQuiz
        title="Microbiology Foundations Quiz"
        questions={[
          {
            id: "mb1",
            question: "What structural feature distinguishes bacteria from human cells?",
            options: ["Bacteria have mitochondria", "Bacteria are prokaryotic (no membrane-bound nucleus)", "Bacteria have a lipid envelope", "Bacteria use RNA instead of DNA"],
            correctIndex: 1,
            rationale: "Bacteria are prokaryotes — they lack a membrane-bound nucleus and membrane-bound organelles. Human cells are eukaryotic with a defined nucleus.",
          },
          {
            id: "mb2",
            question: "Why are enveloped viruses generally easier to kill with disinfectants than non-enveloped viruses?",
            options: ["They are larger", "Their lipid envelope is easily disrupted by soap and alcohol", "They have weaker DNA", "They reproduce more slowly"],
            correctIndex: 1,
            rationale: "The lipid envelope is fragile and is easily disrupted by detergents, alcohol, and disinfectants, inactivating the virus. Non-enveloped viruses (e.g., norovirus) lack this vulnerable layer and are more environmentally resistant.",
          },
          {
            id: "mb3",
            question: "A patient is colonized with MRSA on their skin. This means:",
            options: ["They have an active MRSA infection", "MRSA is present but not causing tissue damage", "They need immediate antibiotic treatment", "They are immune to MRSA"],
            correctIndex: 1,
            rationale: "Colonization means the organism is present and multiplying but not invading tissue or causing an immune response. Colonized patients can still transmit MRSA to others.",
          },
          {
            id: "mb4",
            question: "Which transmission route requires an N95 respirator for protection?",
            options: ["Contact transmission", "Droplet transmission", "Airborne transmission", "Vehicle transmission"],
            correctIndex: 2,
            rationale: "Airborne transmission involves tiny droplet nuclei (<5 μm) that remain suspended in air. Standard surgical masks don't filter these — an N95 respirator is required (e.g., for TB, measles, varicella).",
          },
          {
            id: "mb5",
            question: "The single most effective measure to prevent healthcare-associated infections is:",
            options: ["Wearing gloves at all times", "Hand hygiene", "Administering prophylactic antibiotics", "Using UV sterilization"],
            correctIndex: 1,
            rationale: "Hand hygiene (handwashing or alcohol-based hand rub) is consistently identified as the single most effective measure to prevent transmission of microorganisms in healthcare.",
          },
          {
            id: "mb6",
            question: "Why do broad-spectrum antibiotics increase the risk of C. difficile infection?",
            options: ["They directly stimulate C. difficile growth", "They kill normal flora, eliminating competitive exclusion", "They cause immune suppression", "They increase intestinal pH"],
            correctIndex: 1,
            rationale: "Broad-spectrum antibiotics kill normal gut flora that normally outcompete C. difficile for nutrients and binding sites. Without this competition, C. difficile can overgrow and produce toxins.",
          },
          {
            id: "mb7",
            question: "What is the difference between disinfection and sterilization?",
            options: ["They are the same process", "Disinfection kills all organisms; sterilization kills most", "Disinfection reduces microbial load; sterilization eliminates ALL microbes including spores", "Disinfection is for skin; sterilization is for objects"],
            correctIndex: 2,
            rationale: "Sterilization destroys ALL forms of microbial life including bacterial endospores. Disinfection reduces microbial load but may not eliminate all spores.",
          },
          {
            id: "mb8",
            question: "Fungi require antifungal medications rather than antibiotics because:",
            options: ["Fungi are too large for antibiotics to penetrate", "Fungi have chitin cell walls, not peptidoglycan", "Fungi don't have cell membranes", "Antibiotics are only for viruses"],
            correctIndex: 1,
            rationale: "Antibacterial antibiotics target structures unique to bacteria (e.g., peptidoglycan synthesis). Fungi have chitin-based cell walls and ergosterol-containing membranes — antifungals target these fungal-specific structures.",
          },
        ]}
      />
    </div>
  );
}
