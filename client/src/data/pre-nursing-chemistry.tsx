import {
  MicroLesson,
  CognitiveCard,
  HoverReveal,
  MatchingExercise,
  SelfCheckQuiz,
  ProgressiveReveal,
} from "@/components/interactive-learning";
import { EditableModuleText, useEditableText } from "@/components/module-edit-context";
import { Atom, Beaker, Droplets, FlaskConical } from "lucide-react";

export function ChemistryModule() {
  const bondTypeContent = useEditableText("chem-bond-type-content", "Ionic bonds create electrolytes that dissociate in body fluids — essential for electrical signaling. Covalent bonds create the stable molecules of life. Hydrogen bonds maintain the 3D shapes of proteins and DNA. When a fever denatures enzymes, it's disrupting hydrogen bonds that maintain protein folding.");
  const waterSolventContent = useEditableText("chem-water-solvent-content", "Water is a polar molecule — the oxygen end is slightly negative, the hydrogen end slightly positive. This polarity allows water to dissolve ionic and polar substances (hydrophilic), making it the universal solvent of the body. Non-polar substances (lipids) do not dissolve in water (hydrophobic) — this is why cell membranes, made of phospholipids, form barriers in an aqueous environment.");
  const bufferContent = useEditableText("chem-buffer-content", "A buffer resists changes in pH by absorbing excess H⁺ or releasing H⁺ as needed. The bicarbonate buffer system is the most important: CO₂ + H₂O ⇌ H₂CO₃ ⇌ H⁺ + HCO₃⁻. The lungs regulate CO₂ (acid side) and the kidneys regulate HCO₃⁻ (base side). This dual regulation is why respiratory and renal function both affect pH.");

  return (
    <div className="space-y-10" data-testid="module-chemistry">
      <div>
        <EditableModuleText sectionKey="chem-title" defaultText="Basic Chemistry for Health Sciences" as="h2" className="text-2xl font-bold text-gray-900 mb-2" />
        <EditableModuleText sectionKey="chem-desc" defaultText="Understand the chemical principles that govern biological processes — from atomic structure and bonding to pH, solutions, and the chemistry of life." as="p" className="text-gray-600" multiline />
      </div>

      <MicroLesson title="Atomic Structure & Chemical Bonds" subtitle="Building blocks of all matter" icon={<Atom className="w-5 h-5" />}>
        <EditableModuleText sectionKey="chem-atomic-content" defaultText="All matter consists of atoms, and the way atoms interact determines the properties of every substance in the body. Three types of chemical bonds are essential to understand:" as="p" className="text-sm text-gray-600 leading-relaxed" multiline />
        <ProgressiveReveal
          title="Types of Chemical Bonds"
          cards={[
            {
              id: "cb1",
              title: "Ionic Bonds",
              summary: "Electron transfer between atoms",
              detail: "One atom donates electrons to another, creating charged ions (cations = positive, anions = negative). The electrostatic attraction between opposite charges forms the bond. Example: NaCl — sodium loses an electron (Na⁺) and chlorine gains one (Cl⁻). This is why NaCl dissociates in water into electrolytes critical for nerve conduction and fluid balance.",
            },
            {
              id: "cb2",
              title: "Covalent Bonds",
              summary: "Electron sharing between atoms",
              detail: "Atoms share electron pairs. This creates very stable molecules. Water (H₂O) has covalent bonds — oxygen shares electrons with two hydrogens. Organic molecules (proteins, carbohydrates, lipids, nucleic acids) are held together primarily by covalent bonds, which is why they are structurally stable.",
            },
            {
              id: "cb3",
              title: "Hydrogen Bonds",
              summary: "Weak but collectively powerful attractions",
              detail: "A weak attraction between a slightly positive hydrogen and a slightly negative oxygen or nitrogen. Individually weak, but collectively they give water its unique properties (high specific heat, surface tension, solvent capability) and maintain protein/DNA structure. Breaking hydrogen bonds denatures proteins.",
            },
          ]}
        />
        <CognitiveCard
          type="concept"
          title="Why Bond Type Matters in Healthcare"
          content={bondTypeContent}
        />
      </MicroLesson>

      <MicroLesson title="Ions, Electrolytes & Water" subtitle="The chemistry of body fluids" icon={<Droplets className="w-5 h-5" />}>
        <EditableModuleText sectionKey="chem-ions-content" defaultText="When ionic compounds dissolve in water, they dissociate into charged particles. These electrolytes are responsible for nerve impulse transmission, muscle contraction, fluid balance, and pH regulation." as="p" className="text-sm text-gray-600 leading-relaxed" multiline />
        <div className="grid sm:grid-cols-2 gap-3 mt-3">
          <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
            <p className="text-xs font-semibold text-blue-700 mb-1">Key Cations (+)</p>
            <p className="text-xs text-blue-600"><strong>Na⁺</strong> — primary extracellular cation, drives fluid volume. <strong>K⁺</strong> — primary intracellular cation, critical for cardiac and nerve function. <strong>Ca²⁺</strong> — muscle contraction, bone structure, clotting. <strong>Mg²⁺</strong> — enzyme cofactor, neuromuscular function.</p>
          </div>
          <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
            <p className="text-xs font-semibold text-emerald-700 mb-1">Key Anions (−)</p>
            <p className="text-xs text-emerald-600"><strong>Cl⁻</strong> — follows sodium, maintains osmolarity. <strong>HCO₃⁻</strong> — bicarbonate, the body's primary pH buffer. <strong>HPO₄²⁻</strong> — phosphate, energy metabolism (ATP), bone. These balance the cations to maintain electrical neutrality.</p>
          </div>
        </div>
        <CognitiveCard
          type="warning"
          title="Water as a Solvent"
          content={waterSolventContent}
        />
      </MicroLesson>

      <MicroLesson title="Acids, Bases & pH" subtitle="The hydrogen ion concentration scale" icon={<Beaker className="w-5 h-5" />}>
        <EditableModuleText sectionKey="chem-ph-content" defaultText="The pH scale is fundamental to understanding how the body maintains the narrow range (7.35–7.45) required for normal enzyme function and cellular processes." as="p" className="text-sm text-gray-600 leading-relaxed" multiline />
        <div className="mt-3 p-4 bg-gradient-to-r from-red-50 via-yellow-50 to-blue-50 rounded-xl border">
          <p className="text-xs font-semibold text-gray-700 mb-2">The pH Scale</p>
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>0 (Strong Acid)</span>
            <span>7 (Neutral)</span>
            <span>14 (Strong Base)</span>
          </div>
          <div className="h-3 rounded-full bg-gradient-to-r from-red-400 via-yellow-300 to-blue-400" />
          <div className="flex justify-between text-xs mt-1 text-gray-500">
            <span>HCl, Gastric acid (~2)</span>
            <span>Blood: 7.35–7.45</span>
            <span>NaOH, Bleach (~13)</span>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 mt-3">
          <div className="p-4 bg-orange-50/60 rounded-xl border border-orange-100">
            <p className="text-xs font-semibold text-orange-700 mb-1">Acids</p>
            <p className="text-xs text-orange-600">Substances that release H⁺ ions in solution. Strong acids (HCl) dissociate completely. Weak acids (carbonic acid, H₂CO₃) dissociate partially and are important in buffering systems.</p>
          </div>
          <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-100">
            <p className="text-xs font-semibold text-indigo-700 mb-1">Bases</p>
            <p className="text-xs text-indigo-600">Substances that accept H⁺ ions or release OH⁻ ions. Bicarbonate (HCO₃⁻) is the body's primary base. It neutralizes excess H⁺ by combining to form carbonic acid, which is then expelled as CO₂ by the lungs.</p>
          </div>
        </div>
        <CognitiveCard
          type="concept"
          title="Buffer Systems"
          content={bufferContent}
        />
      </MicroLesson>

      <MicroLesson title="Solutions & Concentrations" subtitle="How substances are measured in clinical practice" icon={<FlaskConical className="w-5 h-5" />}>
        <EditableModuleText sectionKey="chem-solutions-content" defaultText="In healthcare, solutions are described by their concentration. Understanding concentrations is critical for medication preparation, IV fluid therapy, and lab value interpretation." as="p" className="text-sm text-gray-600 leading-relaxed" multiline />
        <div className="space-y-3 mt-3">
          <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-100">
            <p className="text-xs font-semibold text-purple-700 mb-1">Concentration Units</p>
            <p className="text-xs text-purple-600"><strong>mg/mL</strong> — milligrams of drug per milliliter of solution (most common in medication dosing). <strong>%</strong> — grams of solute per 100 mL of solution (0.9% NaCl = 0.9 g NaCl per 100 mL = 9 g/L). <strong>mEq/L</strong> — milliequivalents per liter (used for electrolytes, accounts for ionic charge). <strong>mmol/L</strong> — millimoles per liter (used for lab values like glucose in some countries).</p>
          </div>
          <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-100">
            <p className="text-xs font-semibold text-teal-700 mb-1">Dilution Reasoning</p>
            <p className="text-xs text-teal-600">When you dilute a solution, the amount of solute stays the same but the volume increases. C₁V₁ = C₂V₂. If you have 10 mL of a 10 mg/mL solution and add 90 mL of diluent, you now have 100 mL of a 1 mg/mL solution. The total drug amount (100 mg) hasn't changed.</p>
          </div>
        </div>
      </MicroLesson>

      <MatchingExercise
        title="Match the Chemistry Concept"
        pairs={[
          { term: "Ionic bond", definition: "Electron transfer creating charged ions" },
          { term: "Covalent bond", definition: "Electron sharing between atoms" },
          { term: "pH 7.0", definition: "Neutral — equal H⁺ and OH⁻" },
          { term: "Buffer", definition: "Resists pH changes" },
          { term: "Electrolyte", definition: "Ion that conducts electricity in solution" },
          { term: "Hydrophobic", definition: "Repels water (non-polar)" },
        ]}
      />

      <SelfCheckQuiz
        title="Chemistry Foundations Quiz"
        questions={[
          {
            id: "c1",
            question: "What type of bond holds NaCl together in its solid crystal form?",
            options: ["Covalent bond", "Ionic bond", "Hydrogen bond", "Metallic bond"],
            correctIndex: 1,
            rationale: "NaCl is formed by the transfer of an electron from sodium to chlorine, creating Na⁺ and Cl⁻ ions held together by electrostatic (ionic) attraction.",
          },
          {
            id: "c2",
            question: "Blood pH of 7.30 is classified as:",
            options: ["Normal", "Acidotic", "Alkalotic", "Neutral"],
            correctIndex: 1,
            rationale: "Normal blood pH is 7.35–7.45. A pH of 7.30 is below normal range, indicating acidosis (excess H⁺ ions).",
          },
          {
            id: "c3",
            question: "Why is water an effective solvent for electrolytes?",
            options: ["Water is non-polar", "Water has a high pH", "Water is a polar molecule that attracts ions", "Water has covalent bonds"],
            correctIndex: 2,
            rationale: "Water's polarity (partial positive and negative charges) allows it to surround and separate ions from ionic compounds, dissolving them effectively.",
          },
          {
            id: "c4",
            question: "The primary extracellular cation is:",
            options: ["K⁺", "Ca²⁺", "Na⁺", "Mg²⁺"],
            correctIndex: 2,
            rationale: "Sodium (Na⁺) is the primary cation in extracellular fluid and is the major determinant of plasma osmolarity and fluid volume.",
          },
          {
            id: "c5",
            question: "Each pH unit represents what change in H⁺ concentration?",
            options: ["2-fold change", "5-fold change", "10-fold change", "100-fold change"],
            correctIndex: 2,
            rationale: "The pH scale is logarithmic — each whole unit represents a 10-fold (one order of magnitude) change in H⁺ concentration.",
          },
          {
            id: "c6",
            question: "A 0.9% NaCl solution contains how many grams of NaCl per liter?",
            options: ["0.9 g", "9 g", "90 g", "0.09 g"],
            correctIndex: 1,
            rationale: "Percent concentration = grams per 100 mL. 0.9% = 0.9 g/100 mL = 9 g/1000 mL (1 liter).",
          },
          {
            id: "c7",
            question: "What happens to a protein when hydrogen bonds are disrupted by extreme heat?",
            options: ["It becomes stronger", "It denatures and loses function", "It gains new functions", "Nothing — hydrogen bonds are not important to proteins"],
            correctIndex: 1,
            rationale: "Hydrogen bonds maintain protein tertiary structure (3D folding). Disrupting them causes denaturation — the protein unfolds and loses its specific shape, destroying enzyme activity.",
          },
          {
            id: "c8",
            question: "In the bicarbonate buffer system, which organ regulates the CO₂ component?",
            options: ["Kidneys", "Liver", "Lungs", "Pancreas"],
            correctIndex: 2,
            rationale: "The lungs regulate CO₂ by adjusting ventilation rate. More CO₂ exhaled = less carbonic acid = higher pH. The kidneys regulate the HCO₃⁻ (bicarbonate) component.",
          },
        ]}
      />
    </div>
  );
}
