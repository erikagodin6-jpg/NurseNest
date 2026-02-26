import {
  MicroLesson,
  CognitiveCard,
  HoverReveal,
  MatchingExercise,
  SelfCheckQuiz,
  ProgressiveReveal,
} from "@/components/interactive-learning";
import {
  Dna,
  FlaskConical,
  Microscope,
  Shield,
  Atom,
  Calculator,
  BookOpen,
  Beaker,
  Sparkles,
} from "lucide-react";

export function ScienceFoundationsModule() {
  return (
    <div className="space-y-10" data-testid="module-science-foundations">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Science Foundations</h2>
        <p className="text-gray-600">
          Build the essential science knowledge that underpins every nursing concept — from biomolecules to microbiology, chemistry to scientific reasoning.
        </p>
      </div>

      <MicroLesson title="Biological Systems" subtitle="Characteristics of life and levels of organization" icon={<Sparkles className="w-5 h-5" />}>
        <p className="text-sm text-gray-600 leading-relaxed">
          All living organisms share fundamental{" "}
          <HoverReveal term="characteristics of life" definition="Organization, metabolism, responsiveness, growth, reproduction, and homeostasis — the six hallmarks that distinguish living systems from non-living matter." />.
          Understanding these properties helps nurses recognize when physiological systems deviate from normal.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mt-3">
          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
            <p className="text-xs font-semibold text-blue-700 mb-1">Levels of Organization</p>
            <p className="text-xs text-blue-600">Chemical → Cellular → Tissue → Organ → Organ System → Organism. Disease can originate at any level and cascade upward.</p>
          </div>
          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
            <p className="text-xs font-semibold text-emerald-700 mb-1">Structure-Function Relationship</p>
            <p className="text-xs text-emerald-600">Structure always dictates function. Red blood cells are biconcave to maximize oxygen-carrying surface area. Alveoli are thin-walled for efficient gas exchange.</p>
          </div>
        </div>
        <CognitiveCard
          type="concept"
          title="Why This Matters for Nursing"
          content="When a patient presents with multi-organ dysfunction, you're seeing the levels of organization failing in reverse — from organism-level symptoms traced back to cellular injury. Understanding this hierarchy helps you prioritize assessments."
        />
      </MicroLesson>

      <MicroLesson title="Biomolecules & Metabolism" subtitle="Proteins, lipids, carbs, nucleic acids, and energy" icon={<Beaker className="w-5 h-5" />}>
        <p className="text-sm text-gray-600 leading-relaxed">
          The four major{" "}
          <HoverReveal term="biomolecules" definition="Large organic molecules essential for life: proteins (structure/enzymes), lipids (membranes/energy storage), carbohydrates (energy), and nucleic acids (genetic information)." />{" "}
          are the building blocks of all cellular structures and functions. Each plays a distinct role in maintaining health.
        </p>
        <ProgressiveReveal
          title="The Four Biomolecules"
          cards={[
            {
              id: "bio1",
              title: "Proteins",
              summary: "Structure, enzymes, transport, immunity",
              detail: "Made of amino acids linked by peptide bonds. Enzymes are biological catalysts that lower activation energy — nearly every metabolic reaction depends on them. Denaturation (by heat, pH change) destroys protein function.",
            },
            {
              id: "bio2",
              title: "Lipids",
              summary: "Cell membranes, energy storage, hormones",
              detail: "Phospholipids form the cell membrane bilayer. Triglycerides store energy. Cholesterol is a precursor for steroid hormones and bile salts. Saturated vs unsaturated affects cardiovascular risk.",
            },
            {
              id: "bio3",
              title: "Carbohydrates",
              summary: "Primary energy source, structural roles",
              detail: "Glucose is the body's preferred fuel. Glycogen is the storage form in liver and muscle. Complex carbs provide sustained energy; simple sugars cause rapid glucose spikes — critical for diabetic patient education.",
            },
            {
              id: "bio4",
              title: "Nucleic Acids",
              summary: "DNA and RNA — genetic information storage and expression",
              detail: "DNA stores the genetic blueprint; RNA translates it into proteins. Mutations in DNA can lead to disease (e.g., sickle cell disease from a single nucleotide change in the hemoglobin gene).",
            },
          ]}
        />
        <CognitiveCard
          type="remember"
          title="Energy Transfer"
          content="ATP (adenosine triphosphate) is the universal energy currency. Cells generate ATP primarily through aerobic metabolism (oxygen-dependent). When oxygen is unavailable, anaerobic metabolism produces lactic acid — this is why tissue hypoxia leads to metabolic acidosis."
        />
      </MicroLesson>

      <MatchingExercise
        title="Biomolecule Function Matching"
        description="Match each biomolecule to its primary role"
        pairs={[
          { id: "bm1", term: "Enzymes (proteins)", definition: "Catalyze metabolic reactions" },
          { id: "bm2", term: "Phospholipids", definition: "Form cell membrane bilayer" },
          { id: "bm3", term: "Glucose", definition: "Primary cellular energy source" },
          { id: "bm4", term: "DNA", definition: "Stores genetic information" },
          { id: "bm5", term: "Glycogen", definition: "Energy storage in liver and muscle" },
          { id: "bm6", term: "ATP", definition: "Universal energy currency" },
        ]}
      />

      <SelfCheckQuiz
        title="Biomolecules & Metabolism Check"
        questions={[
          {
            id: "sf1",
            question: "Which biomolecule forms the basic structure of cell membranes?",
            options: ["Proteins", "Phospholipids", "Carbohydrates", "Nucleic acids"],
            correctIndex: 1,
            rationale: "Phospholipids arrange in a bilayer with hydrophilic heads facing outward and hydrophobic tails facing inward, creating the selectively permeable cell membrane.",
          },
          {
            id: "sf2",
            question: "When cells lack oxygen, anaerobic metabolism produces:",
            options: ["Carbon dioxide only", "Lactic acid", "Bicarbonate", "Glucose"],
            correctIndex: 1,
            rationale: "Without oxygen, cells switch to anaerobic glycolysis, producing lactic acid as a byproduct. Accumulation of lactic acid causes metabolic acidosis — a key indicator of tissue hypoperfusion in shock.",
            hint: "Think about what happens to a patient's pH when tissues aren't getting enough oxygen.",
          },
          {
            id: "sf3",
            question: "Enzymes work by:",
            options: ["Providing energy for reactions", "Lowering activation energy", "Increasing temperature", "Destroying substrates permanently"],
            correctIndex: 1,
            rationale: "Enzymes are biological catalysts that lower the activation energy needed for a reaction. They are not consumed in the process and can be reused. Temperature and pH extremes denature enzymes.",
          },
        ]}
      />

      <MicroLesson title="DNA, Genes & Protein Synthesis" subtitle="Genetic information flow: from DNA to functional proteins" icon={<Dna className="w-5 h-5" />}>
        <p className="text-sm text-gray-600 leading-relaxed">
          The{" "}
          <HoverReveal term="central dogma" definition="The fundamental principle of molecular biology: DNA → RNA → Protein. Genetic information flows from DNA through transcription to mRNA, then through translation to protein." />{" "}
          describes how genetic information flows from DNA to functional proteins that run every process in the body.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-3">
          <div className="flex-1 p-4 bg-indigo-50/60 rounded-xl border border-indigo-100 text-center">
            <p className="text-xs font-bold text-indigo-700 mb-1">Transcription</p>
            <p className="text-xs text-indigo-600">DNA → mRNA</p>
            <p className="text-[10px] text-indigo-500 mt-1">Occurs in the nucleus</p>
          </div>
          <div className="flex items-center justify-center text-gray-300">→</div>
          <div className="flex-1 p-4 bg-violet-50/60 rounded-xl border border-violet-100 text-center">
            <p className="text-xs font-bold text-violet-700 mb-1">Translation</p>
            <p className="text-xs text-violet-600">mRNA → Protein</p>
            <p className="text-[10px] text-violet-500 mt-1">Occurs at ribosomes</p>
          </div>
          <div className="flex items-center justify-center text-gray-300">→</div>
          <div className="flex-1 p-4 bg-purple-50/60 rounded-xl border border-purple-100 text-center">
            <p className="text-xs font-bold text-purple-700 mb-1">Protein Function</p>
            <p className="text-xs text-purple-600">Enzymes, receptors, structures</p>
            <p className="text-[10px] text-purple-500 mt-1">Determines cell behavior</p>
          </div>
        </div>
        <CognitiveCard
          type="warning"
          title="Mutations & Disease"
          content="A single nucleotide mutation can alter the protein produced. Sickle cell disease results from one amino acid change in hemoglobin (Glu→Val), causing red blood cells to deform under low oxygen conditions. This is a powerful example of how molecular changes manifest as clinical disease."
        />
      </MicroLesson>

      <MicroLesson title="Cell Division" subtitle="Mitosis vs meiosis and clinical relevance" icon={<Dna className="w-5 h-5" />}>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
            <p className="text-sm font-semibold text-blue-700 mb-1">Mitosis</p>
            <p className="text-xs text-blue-600">Produces 2 identical diploid (2n) daughter cells. Used for growth, repair, and tissue maintenance. Occurs in somatic cells.</p>
            <p className="text-[10px] text-blue-500 mt-2 italic">Wound healing depends on mitosis. Cancer is uncontrolled mitosis.</p>
          </div>
          <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-100">
            <p className="text-sm font-semibold text-rose-700 mb-1">Meiosis</p>
            <p className="text-xs text-rose-600">Produces 4 genetically unique haploid (n) cells. Used only for gamete (egg/sperm) production. Includes crossing over for genetic diversity.</p>
            <p className="text-[10px] text-rose-500 mt-2 italic">Errors in meiosis → chromosomal abnormalities (e.g., Down syndrome = trisomy 21).</p>
          </div>
        </div>
        <CognitiveCard
          type="concept"
          title="Chromosomal Integrity"
          content="Maintaining accurate DNA replication during division is essential. Checkpoints in the cell cycle catch errors. When these checkpoints fail (e.g., p53 tumor suppressor mutation), cells can proliferate uncontrollably — the basis of cancer development."
        />
      </MicroLesson>

      <SelfCheckQuiz
        title="Genetics & Cell Division Check"
        questions={[
          {
            id: "sf4",
            question: "The central dogma of molecular biology describes the flow:",
            options: ["Protein → RNA → DNA", "RNA → DNA → Protein", "DNA → RNA → Protein", "DNA → Protein → RNA"],
            correctIndex: 2,
            rationale: "The central dogma: DNA is transcribed into mRNA (transcription), which is then translated into protein (translation). This one-directional flow governs all gene expression.",
          },
          {
            id: "sf5",
            question: "A patient with cancer has cells that divide uncontrollably. This involves dysregulation of:",
            options: ["Meiosis", "Mitosis", "Osmosis", "Diffusion"],
            correctIndex: 1,
            rationale: "Cancer is fundamentally uncontrolled mitosis. Normal cell cycle checkpoints (like p53) fail, allowing damaged cells to continue dividing. This is why chemotherapy targets rapidly dividing cells.",
            hint: "Which type of cell division is responsible for growth and repair of somatic cells?",
          },
          {
            id: "sf6",
            question: "Down syndrome (trisomy 21) results from an error during:",
            options: ["Mitosis", "Meiosis", "Transcription", "Translation"],
            correctIndex: 1,
            rationale: "Trisomy 21 occurs when chromosome 21 fails to separate during meiosis (nondisjunction), resulting in a gamete with an extra copy. The offspring inherits three copies instead of two.",
          },
        ]}
      />

      <MicroLesson title="Microbiology Essentials" subtitle="Pathogens, host interactions, and antimicrobial resistance" icon={<Microscope className="w-5 h-5" />}>
        <p className="text-sm text-gray-600 leading-relaxed">
          Understanding{" "}
          <HoverReveal term="pathogens" definition="Microorganisms capable of causing disease: bacteria, viruses, fungi, parasites, and prions. Each type requires different treatment approaches." />{" "}
          is essential for infection control, one of the most critical competencies in nursing practice.
        </p>
        <ProgressiveReveal
          title="Pathogen Categories"
          cards={[
            {
              id: "mic1",
              title: "Bacteria",
              summary: "Single-celled prokaryotes; treated with antibiotics",
              detail: "Classified as Gram-positive (thick cell wall, stains purple) or Gram-negative (thin cell wall + outer membrane, stains pink). This distinction guides antibiotic selection. Example: MRSA is a Gram-positive bacterium resistant to methicillin.",
            },
            {
              id: "mic2",
              title: "Viruses",
              summary: "Obligate intracellular parasites; treated with antivirals",
              detail: "Viruses cannot reproduce outside host cells. They hijack cellular machinery for replication. Antibiotics are ineffective against viruses. Examples: influenza, HIV, SARS-CoV-2.",
            },
            {
              id: "mic3",
              title: "Fungi",
              summary: "Eukaryotic organisms; treated with antifungals",
              detail: "Can cause superficial infections (dermatophytes → ringworm) or systemic infections (Candida, Aspergillus) especially in immunocompromised patients. Antifungals target the ergosterol in fungal cell membranes.",
            },
            {
              id: "mic4",
              title: "Parasites & Prions",
              summary: "Diverse pathogens with unique mechanisms",
              detail: "Parasites include protozoa (malaria) and helminths (tapeworms). Prions are misfolded proteins that cause fatal neurodegenerative diseases (Creutzfeldt-Jakob disease) — no treatment exists because prions contain no DNA/RNA.",
            },
          ]}
        />
        <CognitiveCard
          type="warning"
          title="Antimicrobial Resistance"
          content="Antibiotic resistance occurs when bacteria evolve mechanisms to survive antibiotic exposure. Key nursing actions: complete full antibiotic courses, practice meticulous hand hygiene, use contact precautions for resistant organisms (MRSA, VRE, C. diff), and educate patients on proper antibiotic use."
        />
      </MicroLesson>

      <MicroLesson title="Immunity" subtitle="Innate vs adaptive immunity, antibodies, and vaccination" icon={<Shield className="w-5 h-5" />}>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
            <p className="text-sm font-semibold text-blue-700 mb-1">Innate Immunity</p>
            <p className="text-xs text-blue-600">Non-specific, immediate defense. Present from birth. Includes skin barriers, mucous membranes, phagocytes (neutrophils, macrophages), inflammation, and fever.</p>
            <p className="text-[10px] text-blue-500 mt-1 italic">First responders — same response regardless of pathogen.</p>
          </div>
          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
            <p className="text-sm font-semibold text-emerald-700 mb-1">Adaptive Immunity</p>
            <p className="text-xs text-emerald-600">Specific, slower but creates memory. B cells produce antibodies; T cells directly attack infected cells. Takes days to activate initially but responds faster upon re-exposure.</p>
            <p className="text-[10px] text-emerald-500 mt-1 italic">Targeted response — memory cells provide lasting protection.</p>
          </div>
        </div>
        <CognitiveCard
          type="concept"
          title="Antibody Logic & Vaccination"
          content="Vaccines work by exposing the immune system to a harmless form of a pathogen (inactivated, attenuated, or mRNA-encoded antigen). This triggers adaptive immunity to produce memory B and T cells WITHOUT causing disease. Upon future exposure, the immune system mounts a rapid, targeted response. This is why booster doses enhance the memory response."
        />
      </MicroLesson>

      <SelfCheckQuiz
        title="Microbiology & Immunity Check"
        questions={[
          {
            id: "sf7",
            question: "Why are antibiotics ineffective against viral infections?",
            options: [
              "Viruses are too small for antibiotics to reach",
              "Viruses lack the cellular structures antibiotics target",
              "Antibiotics only work on fungi",
              "Viruses are killed by the immune system before antibiotics can act",
            ],
            correctIndex: 1,
            rationale: "Antibiotics target bacterial structures (cell walls, ribosomes, DNA replication). Viruses lack these structures because they use the host cell's machinery to replicate. This is why antiviral drugs work differently.",
          },
          {
            id: "sf8",
            question: "A nurse caring for a patient with MRSA should prioritize:",
            options: ["Administering broad-spectrum antibiotics", "Contact precautions and hand hygiene", "Respiratory isolation only", "No special precautions needed"],
            correctIndex: 1,
            rationale: "MRSA (Methicillin-Resistant Staphylococcus aureus) spreads by contact. Contact precautions (gown, gloves) and meticulous hand hygiene are the primary interventions to prevent transmission.",
            hint: "Think about how MRSA is transmitted — contact, droplet, or airborne?",
          },
          {
            id: "sf9",
            question: "Vaccines provide protection by stimulating:",
            options: ["Innate immunity only", "Passive immunity", "Active adaptive immunity with memory cells", "Inflammatory response only"],
            correctIndex: 2,
            rationale: "Vaccines stimulate active adaptive immunity by exposing the immune system to antigens, triggering production of memory B and T cells. This allows a rapid, specific response upon future natural exposure.",
          },
        ]}
      />

      <MicroLesson title="Chemistry for Nursing" subtitle="Atoms, bonds, solutions, pH, and electrolytes" icon={<Atom className="w-5 h-5" />}>
        <p className="text-sm text-gray-600 leading-relaxed">
          Chemistry concepts directly apply to clinical nursing. Understanding{" "}
          <HoverReveal term="pH" definition="A measure of hydrogen ion concentration on a scale of 0-14. Normal blood pH is 7.35-7.45. Below 7.35 = acidosis; above 7.45 = alkalosis. Even small deviations can be life-threatening." />,{" "}
          <HoverReveal term="electrolytes" definition="Charged particles (ions) in body fluids that conduct electrical impulses. Key electrolytes: Na+, K+, Ca2+, Mg2+, Cl⁻, HCO3⁻, PO4³⁻. Essential for nerve conduction, muscle contraction, and fluid balance." />, and solution chemistry is essential for safe medication administration and patient assessment.
        </p>
        <div className="space-y-3 mt-3">
          <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-100">
            <p className="text-xs font-semibold text-purple-700 mb-1">Atomic Structure & Chemical Bonds</p>
            <p className="text-xs text-purple-600">Atoms consist of protons, neutrons, and electrons. Ionic bonds (electron transfer) create electrolytes. Covalent bonds (electron sharing) form organic molecules. Hydrogen bonds give water its unique properties.</p>
          </div>
          <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-100">
            <p className="text-xs font-semibold text-teal-700 mb-1">Solutions & Concentrations</p>
            <p className="text-xs text-teal-600">IV fluids are solutions with precise concentrations. Isotonic solutions (0.9% NaCl) match plasma osmolarity. Hypertonic solutions pull water out of cells. Hypotonic solutions push water into cells.</p>
          </div>
          <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-100">
            <p className="text-xs font-semibold text-amber-700 mb-1">Acids, Bases & pH</p>
            <p className="text-xs text-amber-600">Acids donate H+ ions (lower pH). Bases accept H+ ions (raise pH). Buffer systems (bicarbonate, phosphate, protein) resist pH changes. The bicarbonate buffer system is the most clinically relevant: CO2 + H2O ↔ H2CO3 ↔ H+ + HCO3⁻.</p>
          </div>
        </div>
        <CognitiveCard
          type="remember"
          title="Electrolytes & Ionization"
          content="When salts dissolve in water, they dissociate into ions (ionization). NaCl → Na+ + Cl⁻. These ions conduct electricity in body fluids, enabling nerve impulses and muscle contractions. Electrolyte imbalances directly affect cardiac rhythm, muscle function, and neurological status."
        />
      </MicroLesson>

      <MatchingExercise
        title="Chemistry Concepts Matching"
        description="Match each chemistry concept to its clinical relevance"
        pairs={[
          { id: "ch1", term: "pH 7.35-7.45", definition: "Normal arterial blood range" },
          { id: "ch2", term: "Isotonic (0.9% NaCl)", definition: "Same osmolarity as plasma" },
          { id: "ch3", term: "Bicarbonate buffer", definition: "Primary blood pH regulator" },
          { id: "ch4", term: "Ionization", definition: "Salt dissociation into electrolytes" },
          { id: "ch5", term: "Hydrogen bonds", definition: "Give water high specific heat" },
          { id: "ch6", term: "Hypertonic solution", definition: "Pulls water out of cells" },
        ]}
      />

      <SelfCheckQuiz
        title="Chemistry Check"
        questions={[
          {
            id: "sf10",
            question: "A patient receives a hypertonic IV solution. What will happen to their red blood cells?",
            options: ["Swell (hemolysis)", "Shrink (crenation)", "No change", "Divide rapidly"],
            correctIndex: 1,
            rationale: "Hypertonic solutions have higher solute concentration than inside the cell. Water moves OUT of the cell by osmosis, causing the cell to shrink (crenate). This is the opposite of what happens in hypotonic solutions.",
          },
          {
            id: "sf11",
            question: "The bicarbonate buffer system equation is CO2 + H2O ↔ H2CO3 ↔ H+ + HCO3⁻. If CO2 increases, blood pH will:",
            options: ["Increase (more alkaline)", "Decrease (more acidic)", "Stay the same", "Become neutral (7.0)"],
            correctIndex: 1,
            rationale: "Increased CO2 drives the equation to the right, producing more H+ ions (acid). This is why hypoventilation (CO2 retention) causes respiratory acidosis. The lungs regulate pH by adjusting CO2 elimination.",
            hint: "More CO2 → more carbonic acid → more H+ ions. What happens to pH when H+ increases?",
          },
          {
            id: "sf12",
            question: "Which type of chemical bond creates electrolytes when dissolved in water?",
            options: ["Covalent bonds", "Hydrogen bonds", "Ionic bonds", "Metallic bonds"],
            correctIndex: 2,
            rationale: "Ionic bonds involve electron transfer between atoms, creating charged ions. When ionic compounds dissolve in water, they dissociate into their component ions (electrolytes). For example, KCl → K+ + Cl⁻.",
          },
        ]}
      />

      <MicroLesson title="Math Skills for Science" subtitle="Scientific notation, ratios, proportions, and unit conversions" icon={<Calculator className="w-5 h-5" />}>
        <p className="text-sm text-gray-600 leading-relaxed">
          Quantitative reasoning is essential in nursing. From calculating medication dosages to interpreting lab values, math skills directly affect patient safety.
        </p>
        <ProgressiveReveal
          title="Essential Math Concepts"
          cards={[
            {
              id: "math1",
              title: "Scientific Notation",
              summary: "Expressing very large or very small numbers",
              detail: "Used for lab values and cell counts. Example: WBC count of 8,000 = 8 × 10³/µL. A bacterial colony of 100,000 = 1 × 10⁵ CFU/mL. Moving the decimal right = smaller exponent.",
            },
            {
              id: "math2",
              title: "Ratios & Proportions",
              summary: "Comparing quantities and solving for unknowns",
              detail: "Foundation of dosage calculation. If 250 mg is in 5 mL, how many mL for 100 mg? Set up: 250/5 = 100/x → x = 2 mL. Cross-multiply and divide — the most-used math skill in nursing.",
            },
            {
              id: "math3",
              title: "Unit Conversions",
              summary: "Converting between measurement systems",
              detail: "Key conversions: 1 kg = 2.2 lb, 1 inch = 2.54 cm, 1 L = 1000 mL, 1 g = 1000 mg, 1 mg = 1000 mcg. Always use dimensional analysis to verify units cancel correctly. A weight-based dose requires converting lb to kg first.",
            },
          ]}
        />
        <CognitiveCard
          type="tip"
          title="Dimensional Analysis"
          content="Always write out your units and cancel them. Example: Order: 500 mg. Available: 250 mg/tablet. Calculation: 500 mg × (1 tablet / 250 mg) = 2 tablets. The 'mg' units cancel, leaving you with tablets."
        />
      </MicroLesson>

      <SelfCheckQuiz
        title="Math Skills Check"
        questions={[
          {
            id: "sf13",
            question: "A patient weighs 176 pounds. What is their weight in kilograms? (1 kg = 2.2 lb)",
            options: ["70 kg", "80 kg", "88 kg", "387 kg"],
            correctIndex: 1,
            rationale: "176 lb ÷ 2.2 lb/kg = 80 kg. Always divide pounds by 2.2 to convert to kilograms. This is essential for weight-based medication dosing.",
            hint: "To convert pounds to kilograms, divide by 2.2.",
          },
          {
            id: "sf14",
            question: "If 500 mg of a drug is in 10 mL, how many mL are needed for a 200 mg dose?",
            options: ["2 mL", "4 mL", "5 mL", "8 mL"],
            correctIndex: 1,
            rationale: "Using proportions: 500 mg/10 mL = 200 mg/x mL. Cross-multiply: 500x = 2000. Solve: x = 4 mL. Always double-check by verifying units and reasonableness.",
          },
        ]}
      />

      <MicroLesson title="Scientific Literacy" subtitle="Terminology, evidence-based thinking, and critical reasoning" icon={<BookOpen className="w-5 h-5" />}>
        <p className="text-sm text-gray-600 leading-relaxed">
          Nurses must evaluate evidence, think critically, and communicate using precise scientific terminology. These skills form the foundation of{" "}
          <HoverReveal term="evidence-based practice" definition="The integration of best available research evidence with clinical expertise and patient values/preferences to guide clinical decision-making. It ensures care is grounded in science, not tradition alone." />.
        </p>
        <div className="grid sm:grid-cols-2 gap-3 mt-3">
          <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-100">
            <p className="text-xs font-semibold text-indigo-700 mb-1">Scientific Terminology</p>
            <p className="text-xs text-indigo-600">Hypothesis: a testable prediction. Theory: well-supported explanation. Variable: factor that changes. Control: baseline for comparison. Peer review: expert evaluation of research.</p>
          </div>
          <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-100">
            <p className="text-xs font-semibold text-teal-700 mb-1">Critical Thinking in Nursing</p>
            <p className="text-xs text-teal-600">Question assumptions. Distinguish correlation from causation. Recognize bias. Evaluate source credibility. Consider alternative explanations. Apply evidence to specific patient contexts.</p>
          </div>
        </div>
        <CognitiveCard
          type="concept"
          title="Evidence-Based Thinking"
          content="Not all evidence is equal. A well-designed randomized controlled trial (RCT) provides stronger evidence than an expert opinion. The hierarchy of evidence helps nurses evaluate which findings should most influence clinical practice. Always ask: 'What is the evidence for this intervention?'"
        />
      </MicroLesson>

      <SelfCheckQuiz
        title="Scientific Literacy Check"
        questions={[
          {
            id: "sf15",
            question: "What is the difference between a hypothesis and a theory?",
            options: [
              "A hypothesis is proven; a theory is a guess",
              "A hypothesis is a testable prediction; a theory is a well-supported explanation",
              "They mean the same thing",
              "A theory is always wrong; a hypothesis is always right",
            ],
            correctIndex: 1,
            rationale: "A hypothesis is a testable prediction (e.g., 'hand hygiene reduces infection rates'). A theory is a broadly supported explanation backed by extensive evidence (e.g., germ theory). Theories are not 'just guesses' — they represent the strongest level of scientific understanding.",
          },
          {
            id: "sf16",
            question: "A study finds that patients who drink more water have fewer headaches. This demonstrates:",
            options: ["Causation", "Correlation", "A controlled experiment", "A theory"],
            correctIndex: 1,
            rationale: "This shows correlation (association) — not causation. There could be confounding variables (e.g., people who drink more water may also have healthier lifestyles). Establishing causation requires controlled experimental studies.",
            hint: "Just because two things happen together doesn't mean one causes the other.",
          },
          {
            id: "sf17",
            question: "In evidence-based practice, which provides the STRONGEST level of evidence?",
            options: ["Expert opinion", "Case study", "Systematic review of RCTs", "Single randomized controlled trial"],
            correctIndex: 2,
            rationale: "Systematic reviews and meta-analyses of multiple RCTs sit at the top of the evidence hierarchy because they synthesize findings across many studies, reducing bias and increasing generalizability. Expert opinion is the weakest level.",
          },
        ]}
      />
    </div>
  );
}
