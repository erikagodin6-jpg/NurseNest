import {
  MicroLesson,
  CognitiveCard,
  HoverReveal,
  MatchingExercise,
  SelfCheckQuiz,
  ProgressiveReveal,
} from "@/components/interactive-learning";
import {
  Bone,
  Brain,
  Heart,
  Shield,
  Zap,
  Activity,
  Layers,
  CircleDot,
  Droplets,
  Dumbbell,
  Network,
  Sparkles,
} from "lucide-react";

const structuralQuiz: import("@/components/interactive-learning").QuizQuestion[] = [
  {
    id: "so1",
    question: "Which level of structural organization involves groups of cells working together to perform a specific function?",
    options: ["Cellular level", "Tissue level", "Organ level", "Organ system level"],
    correctIndex: 1,
    rationale: "Tissues are groups of similar cells that work together to carry out a particular function. For example, epithelial tissue lines body surfaces. Organs are composed of two or more tissue types working together.",
  },
  {
    id: "so2",
    question: "A patient is lying face up with arms at sides and palms facing forward. This describes:",
    options: ["Prone position", "Anatomical position", "Lateral recumbent", "Trendelenburg position"],
    correctIndex: 1,
    rationale: "Anatomical position is the universal reference position: standing upright, facing forward, arms at sides, palms facing anteriorly. All directional terms are based on this standard position to avoid confusion in clinical communication.",
  },
  {
    id: "so3",
    question: "Negative feedback mechanisms work by:",
    options: [
      "Amplifying the initial stimulus",
      "Reversing the direction of change to maintain homeostasis",
      "Creating a positive loop that increases output",
      "Shutting down all body systems temporarily",
    ],
    correctIndex: 1,
    rationale: "Negative feedback opposes the initial change, bringing the variable back toward the set point. Example: when body temperature rises, sweating activates to cool the body back down. Most homeostatic mechanisms use negative feedback.",
    hint: "Think of a thermostat — when it gets too hot, the AC turns on to bring temperature back down.",
  },
  {
    id: "so4",
    question: "Which body plane divides the body into anterior and posterior portions?",
    options: ["Sagittal plane", "Frontal (coronal) plane", "Transverse plane", "Oblique plane"],
    correctIndex: 1,
    rationale: "The frontal (coronal) plane divides the body into front (anterior) and back (posterior) portions. The sagittal plane divides into left and right. The transverse (horizontal) plane divides into superior and inferior.",
  },
];

const cellTissueQuiz: import("@/components/interactive-learning").QuizQuestion[] = [
  {
    id: "ct1",
    question: "A nurse hangs a 0.45% NaCl (hypotonic) IV solution. What will happen to the patient's red blood cells?",
    options: ["Crenate (shrink)", "Swell and potentially lyse", "No change", "Clump together"],
    correctIndex: 1,
    rationale: "Hypotonic solutions have lower solute concentration than inside the cell. Water moves INTO the cell by osmosis, causing it to swell. Excessive swelling can lead to hemolysis (cell bursting). This is why hypotonic solutions must be infused carefully.",
    hint: "Water follows solute — or more precisely, water moves toward higher solute concentration.",
  },
  {
    id: "ct2",
    question: "The Na+/K+ pump moves:",
    options: [
      "3 Na+ out, 2 K+ in per ATP",
      "2 Na+ out, 3 K+ in per ATP",
      "3 Na+ in, 2 K+ out per ATP",
      "Equal amounts of Na+ and K+ in both directions",
    ],
    correctIndex: 0,
    rationale: "The Na+/K+ ATPase pumps 3 sodium ions OUT and 2 potassium ions IN per ATP molecule consumed. This maintains the electrochemical gradient essential for nerve impulses, muscle contraction, and cell volume regulation.",
  },
  {
    id: "ct3",
    question: "Which tissue type lines the respiratory tract and moves mucus via cilia?",
    options: ["Simple squamous epithelium", "Pseudostratified ciliated columnar epithelium", "Stratified squamous epithelium", "Transitional epithelium"],
    correctIndex: 1,
    rationale: "Pseudostratified ciliated columnar epithelium lines the respiratory tract. The cilia beat in coordinated waves (mucociliary escalator) to move mucus and trapped particles toward the throat for elimination. Smoking damages these cilia, increasing infection risk.",
  },
  {
    id: "ct4",
    question: "Active transport differs from passive transport because active transport:",
    options: [
      "Moves solutes down the concentration gradient",
      "Requires ATP energy to move solutes against the concentration gradient",
      "Does not require membrane proteins",
      "Only moves water molecules",
    ],
    correctIndex: 1,
    rationale: "Active transport uses cellular energy (ATP) to move substances against their concentration gradient — from low to high concentration. Passive transport (diffusion, osmosis, facilitated diffusion) requires no energy and moves substances down the gradient.",
  },
  {
    id: "ct5",
    question: "A cell exposed to chronic low-level irritation may undergo:",
    options: ["Immediate necrosis", "Adaptive changes such as metaplasia", "Mitosis arrest", "Immediate apoptosis"],
    correctIndex: 1,
    rationale: "Cells adapt to chronic stress through metaplasia (change in cell type), hypertrophy (increased size), hyperplasia (increased number), or atrophy (decreased size). Metaplasia is reversible if the irritant is removed. Example: smoker's bronchial epithelium changes from columnar to squamous.",
  },
];

const integumentaryQuiz: import("@/components/interactive-learning").QuizQuestion[] = [
  {
    id: "ig1",
    question: "A nurse assesses a patient and finds decreased skin turgor. This finding most likely indicates:",
    options: ["Fluid overload", "Dehydration", "Infection", "Allergic reaction"],
    correctIndex: 1,
    rationale: "Skin turgor is assessed by gently pinching skin (often on the sternum or forearm). Skin that remains tented indicates dehydration — reduced interstitial fluid causes decreased elasticity. Poor turgor in elderly patients may be normal due to loss of collagen.",
    hint: "Turgor reflects the hydration status of the interstitial tissue.",
  },
  {
    id: "ig2",
    question: "During the proliferative phase of wound healing, the primary activity is:",
    options: ["Blood clot formation", "Inflammatory response", "New tissue formation (granulation)", "Scar remodeling"],
    correctIndex: 2,
    rationale: "The proliferative phase (days 3-21) involves granulation tissue formation, angiogenesis (new blood vessels), and epithelialization. Fibroblasts produce collagen to rebuild the wound matrix. This follows the inflammatory phase and precedes the maturation/remodeling phase.",
  },
  {
    id: "ig3",
    question: "The primary mechanism by which the skin helps regulate body temperature is:",
    options: ["Melanin production", "Vasodilation/vasoconstriction of dermal blood vessels and sweating", "Keratin synthesis", "Sebum secretion"],
    correctIndex: 1,
    rationale: "Thermoregulation via the skin involves vasodilation (increases blood flow to surface for heat loss) and vasoconstriction (decreases surface blood flow to conserve heat), along with sweat production for evaporative cooling. This is controlled by the hypothalamus.",
  },
];

const skeletalQuiz: import("@/components/interactive-learning").QuizQuestion[] = [
  {
    id: "sk1",
    question: "Which cells are responsible for bone resorption (breaking down bone)?",
    options: ["Osteoblasts", "Osteocytes", "Osteoclasts", "Chondrocytes"],
    correctIndex: 2,
    rationale: "Osteoclasts break down bone tissue (resorption), releasing calcium into the blood. Osteoblasts build new bone. Osteocytes are mature bone cells that maintain the matrix. The balance between osteoclast and osteoblast activity determines bone density.",
  },
  {
    id: "sk2",
    question: "A patient's serum calcium is critically low. Which hormone would the body release to correct this?",
    options: ["Calcitonin", "Parathyroid hormone (PTH)", "Insulin", "Cortisol"],
    correctIndex: 1,
    rationale: "PTH is released by the parathyroid glands in response to low blood calcium. PTH stimulates osteoclast activity (releasing calcium from bone), increases renal calcium reabsorption, and promotes vitamin D activation. Calcitonin has the opposite effect — it lowers blood calcium.",
    hint: "Think 'PTH = Pushes calcium To High levels.'",
  },
  {
    id: "sk3",
    question: "Synovial joints are characterized by:",
    options: [
      "Lack of a joint cavity",
      "A fluid-filled joint cavity with articular cartilage",
      "Bones fused together",
      "Cartilage connecting bones directly",
    ],
    correctIndex: 1,
    rationale: "Synovial joints have a joint cavity filled with synovial fluid that lubricates and nourishes articular cartilage. They are the most movable joint type. Examples include the knee, shoulder, and hip. The synovial membrane produces the lubricating fluid.",
  },
  {
    id: "sk4",
    question: "The axial skeleton includes:",
    options: [
      "Arms and legs",
      "Skull, vertebral column, and rib cage",
      "Pelvic girdle and lower limbs",
      "Shoulder girdle and upper limbs",
    ],
    correctIndex: 1,
    rationale: "The axial skeleton (80 bones) forms the central axis: skull, vertebral column, ribs, and sternum. It protects the brain, spinal cord, and thoracic organs. The appendicular skeleton (126 bones) includes the limbs and girdles.",
  },
];

const muscularQuiz: import("@/components/interactive-learning").QuizQuestion[] = [
  {
    id: "mu1",
    question: "The sliding filament theory describes muscle contraction as:",
    options: [
      "Muscle fibers shortening by folding in half",
      "Actin and myosin filaments sliding past each other, shortening the sarcomere",
      "Muscle cells dividing to create more force",
      "Calcium leaving the muscle cell",
    ],
    correctIndex: 1,
    rationale: "During contraction, myosin heads bind to actin (forming cross-bridges) and pull the thin filaments toward the center of the sarcomere. The filaments themselves don't shorten — they slide past each other. This requires calcium (to expose binding sites) and ATP (for cross-bridge cycling).",
  },
  {
    id: "mu2",
    question: "At the neuromuscular junction, the neurotransmitter released is:",
    options: ["Norepinephrine", "Dopamine", "Acetylcholine (ACh)", "Serotonin"],
    correctIndex: 2,
    rationale: "Acetylcholine is released from motor neurons at the neuromuscular junction. It binds to nicotinic receptors on the muscle fiber, triggering depolarization and ultimately muscle contraction. Myasthenia gravis involves antibodies that block these ACh receptors.",
  },
  {
    id: "mu3",
    question: "Muscle fatigue during prolonged exercise is primarily caused by:",
    options: [
      "Excess calcium in the blood",
      "Accumulation of metabolic byproducts and ATP depletion",
      "Increased oxygen supply",
      "Excessive protein synthesis",
    ],
    correctIndex: 1,
    rationale: "Muscle fatigue results from depletion of ATP and creatine phosphate stores, accumulation of lactic acid and inorganic phosphate, and electrolyte imbalances. When oxygen supply is insufficient for aerobic metabolism, anaerobic pathways produce lactic acid, contributing to the sensation of fatigue.",
  },
];

const nervousQuiz: import("@/components/interactive-learning").QuizQuestion[] = [
  {
    id: "ns1",
    question: "During an action potential, the rapid depolarization phase is caused by:",
    options: [
      "Potassium rushing out of the cell",
      "Sodium rushing into the cell through voltage-gated channels",
      "Chloride entering the cell",
      "Calcium leaving the cell",
    ],
    correctIndex: 1,
    rationale: "When threshold is reached, voltage-gated sodium channels open rapidly, allowing Na+ to flood into the cell. This causes the membrane potential to spike from -70mV toward +30mV (depolarization). Voltage-gated potassium channels then open for repolarization.",
    hint: "Na+ channels open first and fast (depolarization), K+ channels open later (repolarization).",
  },
  {
    id: "ns2",
    question: "The sympathetic nervous system is often called the 'fight or flight' system because it:",
    options: [
      "Promotes digestion and rest",
      "Increases heart rate, dilates bronchioles, and redirects blood to skeletal muscles",
      "Slows heart rate and constricts pupils",
      "Only activates during sleep",
    ],
    correctIndex: 1,
    rationale: "Sympathetic activation prepares the body for emergency action: increased HR, BP, and respiration; bronchodilation; pupil dilation; blood shunted from GI tract to muscles; glycogen converted to glucose. The parasympathetic system does the opposite ('rest and digest').",
  },
  {
    id: "ns3",
    question: "A synapse transmits signals from one neuron to the next by releasing:",
    options: ["Hormones into the blood", "Electrical current across the gap", "Neurotransmitters into the synaptic cleft", "Red blood cells"],
    correctIndex: 2,
    rationale: "At chemical synapses, the presynaptic neuron releases neurotransmitters (stored in vesicles) into the synaptic cleft. These bind to receptors on the postsynaptic neuron, generating excitatory or inhibitory signals. This is the basis for nearly all neural communication.",
  },
  {
    id: "ns4",
    question: "The resting membrane potential of a neuron is approximately:",
    options: ["+30 mV", "0 mV", "-70 mV", "-90 mV"],
    correctIndex: 2,
    rationale: "At rest, the inside of a neuron is approximately -70mV relative to outside, maintained by the Na+/K+ pump (3 Na+ out, 2 K+ in) and K+ leak channels. This negative resting potential is essential — the neuron must be 'charged' to fire an action potential.",
  },
];

const endocrineQuiz: import("@/components/interactive-learning").QuizQuestion[] = [
  {
    id: "en1",
    question: "The primary mechanism for controlling most hormone levels in the body is:",
    options: ["Positive feedback", "Negative feedback", "Neural stimulation only", "Circadian rhythm only"],
    correctIndex: 1,
    rationale: "Negative feedback is the dominant control mechanism: when hormone levels rise above the set point, signals inhibit further release. Example: rising blood glucose triggers insulin release; as glucose drops, insulin secretion decreases. This prevents dangerous extremes.",
  },
  {
    id: "en2",
    question: "A patient with Type 1 diabetes cannot produce insulin because of:",
    options: [
      "Insulin receptor resistance",
      "Autoimmune destruction of pancreatic beta cells",
      "Excess glucagon production",
      "Liver failure",
    ],
    correctIndex: 1,
    rationale: "Type 1 diabetes is an autoimmune condition where the immune system destroys the insulin-producing beta cells of the pancreatic islets of Langerhans. Without beta cells, the body cannot produce insulin, requiring exogenous insulin administration.",
    hint: "Type 1 = autoimmune destruction; Type 2 = insulin resistance.",
  },
  {
    id: "en3",
    question: "The 'master gland' that regulates many other endocrine glands is the:",
    options: ["Thyroid gland", "Adrenal gland", "Pituitary gland", "Pineal gland"],
    correctIndex: 2,
    rationale: "The pituitary gland (hypophysis), controlled by the hypothalamus, releases hormones that regulate the thyroid (TSH), adrenals (ACTH), gonads (FSH/LH), growth (GH), and more. The hypothalamus-pituitary axis is the central command center of the endocrine system.",
  },
  {
    id: "en4",
    question: "During the stress response, cortisol is released from the:",
    options: ["Anterior pituitary", "Adrenal medulla", "Adrenal cortex", "Thyroid gland"],
    correctIndex: 2,
    rationale: "Cortisol is released from the adrenal cortex in response to ACTH from the anterior pituitary. It raises blood glucose, suppresses immune function, and helps the body cope with stress. Chronic cortisol elevation can cause Cushing syndrome. The adrenal medulla releases epinephrine/norepinephrine.",
  },
];

export function AnatomyPhysiologyModule() {
  return (
    <div className="space-y-10" data-testid="module-anatomy-physiology">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Anatomy & Physiology</h2>
        <p className="text-gray-600">
          Master the structure and function of the human body — from cells and tissues to organ systems — building the foundation for clinical nursing practice.
        </p>
      </div>

      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
            <Layers className="w-5 h-5 text-indigo-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Structural Organization</h3>
        </div>

        <MicroLesson
          title="Levels of Organization"
          subtitle="From atoms to the complete organism"
          icon={<Layers className="w-5 h-5" />}
        >
          <p className="text-sm text-gray-600 leading-relaxed">
            The human body is organized in a hierarchy of increasing complexity. Each{" "}
            <HoverReveal
              term="level of organization"
              definition="Chemical → Cellular → Tissue → Organ → Organ System → Organism. Each level emerges from the one below and contributes to the one above."
            />{" "}
            builds upon the previous, with emergent properties at each stage that cannot be predicted from the level below alone.
          </p>
          <div className="flex flex-col sm:flex-row gap-2 mt-3">
            <div className="flex-1 p-3 bg-blue-50/60 rounded-xl border border-blue-100 text-center">
              <p className="text-[10px] font-bold text-blue-700">Chemical</p>
              <p className="text-[10px] text-blue-600">Atoms & molecules</p>
            </div>
            <div className="flex items-center justify-center text-gray-300">→</div>
            <div className="flex-1 p-3 bg-indigo-50/60 rounded-xl border border-indigo-100 text-center">
              <p className="text-[10px] font-bold text-indigo-700">Cellular</p>
              <p className="text-[10px] text-indigo-600">Basic unit of life</p>
            </div>
            <div className="flex items-center justify-center text-gray-300">→</div>
            <div className="flex-1 p-3 bg-violet-50/60 rounded-xl border border-violet-100 text-center">
              <p className="text-[10px] font-bold text-violet-700">Tissue</p>
              <p className="text-[10px] text-violet-600">Groups of cells</p>
            </div>
            <div className="flex items-center justify-center text-gray-300">→</div>
            <div className="flex-1 p-3 bg-purple-50/60 rounded-xl border border-purple-100 text-center">
              <p className="text-[10px] font-bold text-purple-700">Organ</p>
              <p className="text-[10px] text-purple-600">Multiple tissues</p>
            </div>
            <div className="flex items-center justify-center text-gray-300">→</div>
            <div className="flex-1 p-3 bg-fuchsia-50/60 rounded-xl border border-fuchsia-100 text-center">
              <p className="text-[10px] font-bold text-fuchsia-700">System</p>
              <p className="text-[10px] text-fuchsia-600">Organs working together</p>
            </div>
            <div className="flex items-center justify-center text-gray-300">→</div>
            <div className="flex-1 p-3 bg-pink-50/60 rounded-xl border border-pink-100 text-center">
              <p className="text-[10px] font-bold text-pink-700">Organism</p>
              <p className="text-[10px] text-pink-600">Complete human</p>
            </div>
          </div>
          <CognitiveCard
            type="concept"
            title="Clinical Connection"
            content="Disease can originate at any level and cascade upward. A molecular mutation (chemical level) can impair cell function (cellular), damage tissue, compromise an organ, and ultimately affect the whole organism. Understanding this hierarchy helps you trace symptoms back to root causes."
          />
        </MicroLesson>

        <MicroLesson
          title="Anatomical Position & Directional Terms"
          subtitle="The universal language of anatomy"
          icon={<Sparkles className="w-5 h-5" />}
        >
          <p className="text-sm text-gray-600 leading-relaxed">
            All anatomical descriptions reference the{" "}
            <HoverReveal
              term="anatomical position"
              definition="Standing upright, facing forward, arms at sides, palms facing anteriorly (forward), feet slightly apart. This is the universal reference position for all directional terms."
            />. Using standardized directional terms ensures clear communication among healthcare providers.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
              <p className="text-xs font-semibold text-blue-700 mb-1">Paired Directional Terms</p>
              <p className="text-xs text-blue-600">Superior/Inferior (above/below) • Anterior/Posterior (front/back) • Medial/Lateral (toward/away from midline) • Proximal/Distal (closer/farther from trunk) • Superficial/Deep (surface/internal)</p>
            </div>
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
              <p className="text-xs font-semibold text-emerald-700 mb-1">Body Planes & Sections</p>
              <p className="text-xs text-emerald-600">Sagittal (left/right) • Frontal/Coronal (anterior/posterior) • Transverse/Horizontal (superior/inferior). CT scans typically show transverse sections; MRI can show any plane.</p>
            </div>
          </div>
          <CognitiveCard
            type="remember"
            title="Clinical Communication"
            content="Precise anatomical language prevents medical errors. 'The wound is on the medial aspect of the right lower leg, 3 cm distal to the knee' is far more useful than 'the wound is on the inside of the leg near the knee.' Always use directional terms in documentation."
          />
        </MicroLesson>

        <MicroLesson
          title="Homeostasis & Feedback Mechanisms"
          subtitle="How the body maintains internal stability"
          icon={<Activity className="w-5 h-5" />}
        >
          <p className="text-sm text-gray-600 leading-relaxed">
            <HoverReveal
              term="Homeostasis"
              definition="The body's ability to maintain a relatively stable internal environment despite changing external conditions. Variables maintained include temperature (36.1-37.2°C), blood pH (7.35-7.45), blood glucose (70-100 mg/dL), and electrolyte concentrations."
            />{" "}
            is the central organizing principle of physiology. Nearly every disease can be understood as a failure of homeostatic mechanisms.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-100">
              <p className="text-xs font-semibold text-teal-700 mb-1">Negative Feedback (Most Common)</p>
              <p className="text-xs text-teal-600">Opposes the initial change, returning the variable toward the set point. Examples: thermoregulation, blood glucose regulation, blood pressure control via baroreceptors.</p>
            </div>
            <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-100">
              <p className="text-xs font-semibold text-rose-700 mb-1">Positive Feedback (Rare)</p>
              <p className="text-xs text-rose-600">Amplifies the initial change until a culminating event occurs. Examples: oxytocin during labor (contractions intensify until delivery), blood clotting cascade, fever in some contexts.</p>
            </div>
          </div>
          <CognitiveCard
            type="warning"
            title="Feedback Components"
            content="Every feedback loop has three components: (1) Receptor — detects the change (sensor), (2) Control Center — processes information and determines response (often the brain), (3) Effector — carries out the corrective action (muscle, gland). Failure at any component disrupts homeostasis."
          />
        </MicroLesson>

        <MicroLesson
          title="Structure-Function Relationships & Organ Systems"
          subtitle="How anatomy dictates physiology"
          icon={<Network className="w-5 h-5" />}
        >
          <p className="text-sm text-gray-600 leading-relaxed">
            The principle of{" "}
            <HoverReveal
              term="complementarity of structure and function"
              definition="Structure always dictates function. The shape, size, and composition of a body part determines what it can do. Function, in turn, influences how structures develop and adapt over time."
            />{" "}
            is fundamental — you can predict a structure's function by examining its anatomy, and vice versa.
          </p>
          <ProgressiveReveal
            title="11 Organ Systems Overview"
            cards={[
              {
                id: "os1",
                title: "Integumentary & Skeletal",
                summary: "Protection, support, movement framework",
                detail: "Integumentary: skin, hair, nails — protection, thermoregulation, vitamin D synthesis. Skeletal: 206 bones — support, protection of organs, mineral storage, blood cell production (hematopoiesis).",
              },
              {
                id: "os2",
                title: "Muscular & Nervous",
                summary: "Movement and control/communication",
                detail: "Muscular: skeletal, smooth, cardiac — movement, posture, heat production. Nervous: brain, spinal cord, nerves — rapid electrochemical communication, sensation, integration, motor control.",
              },
              {
                id: "os3",
                title: "Endocrine & Cardiovascular",
                summary: "Hormonal regulation and transport",
                detail: "Endocrine: glands secreting hormones — slow but prolonged chemical regulation. Cardiovascular: heart and blood vessels — transport oxygen, nutrients, wastes, hormones, and immune cells throughout the body.",
              },
              {
                id: "os4",
                title: "Lymphatic, Respiratory & Digestive",
                summary: "Immunity, gas exchange, and nutrient processing",
                detail: "Lymphatic: lymph nodes, vessels, spleen — immunity and fluid recovery. Respiratory: lungs and airways — O2/CO2 exchange, pH regulation. Digestive: GI tract and accessory organs — nutrient breakdown, absorption, elimination.",
              },
              {
                id: "os5",
                title: "Urinary & Reproductive",
                summary: "Waste removal and species continuation",
                detail: "Urinary: kidneys, ureters, bladder — fluid/electrolyte balance, waste excretion, blood pressure regulation. Reproductive: gonads and associated structures — gamete production, hormone secretion, fetal development.",
              },
            ]}
          />
          <CognitiveCard
            type="concept"
            title="Cellular Communication Basics"
            content="Cells communicate via direct contact (gap junctions), chemical signals (hormones, neurotransmitters, paracrines), and electrical signals (neurons). Autocrine signals act on the same cell; paracrine signals act on nearby cells; endocrine signals travel via blood to distant targets. Understanding communication modes explains how drugs, diseases, and therapies work at the cellular level."
          />
        </MicroLesson>

        <MatchingExercise
          title="Directional Terms"
          description="Match each directional term to its meaning"
          pairs={[
            { id: "dt1", term: "Superior", definition: "Above or toward the head" },
            { id: "dt2", term: "Anterior", definition: "Toward the front of the body" },
            { id: "dt3", term: "Medial", definition: "Toward the midline" },
            { id: "dt4", term: "Proximal", definition: "Closer to the trunk/point of origin" },
            { id: "dt5", term: "Deep", definition: "Away from the body surface" },
            { id: "dt6", term: "Lateral", definition: "Away from the midline" },
          ]}
        />

        <SelfCheckQuiz title="Structural Organization Check" questions={structuralQuiz} />
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
            <CircleDot className="w-5 h-5 text-emerald-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Cell & Tissue Biology</h3>
        </div>

        <MicroLesson
          title="Cell Membrane Structure"
          subtitle="The phospholipid bilayer and membrane proteins"
          icon={<CircleDot className="w-5 h-5" />}
        >
          <p className="text-sm text-gray-600 leading-relaxed">
            The{" "}
            <HoverReveal
              term="cell membrane"
              definition="A selectively permeable phospholipid bilayer embedded with proteins, cholesterol, and carbohydrates. It controls what enters and exits the cell, maintaining the internal environment necessary for cellular function."
            />{" "}
            (plasma membrane) is the gatekeeper of every cell, controlling substance movement and enabling cellular communication.
          </p>
          <div className="space-y-3 mt-3">
            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
              <p className="text-xs font-semibold text-blue-700 mb-1">Phospholipid Bilayer</p>
              <p className="text-xs text-blue-600">Hydrophilic heads face outward (toward water); hydrophobic tails face inward. This arrangement creates a selectively permeable barrier. Small nonpolar molecules (O2, CO2) pass freely; charged ions and large molecules cannot.</p>
            </div>
            <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-100">
              <p className="text-xs font-semibold text-purple-700 mb-1">Membrane Proteins</p>
              <p className="text-xs text-purple-600">Channel proteins (allow specific ions through), carrier proteins (transport molecules via conformational change), receptor proteins (receive chemical signals), and enzymes. These proteins make the membrane functional.</p>
            </div>
            <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-100">
              <p className="text-xs font-semibold text-amber-700 mb-1">Cholesterol & Glycocalyx</p>
              <p className="text-xs text-amber-600">Cholesterol stabilizes membrane fluidity across temperature changes. The glycocalyx (sugar coat) enables cell recognition, immune function, and protection. Blood type antigens are part of the glycocalyx on red blood cells.</p>
            </div>
          </div>
        </MicroLesson>

        <MicroLesson
          title="Membrane Transport"
          subtitle="Passive vs active transport across the cell membrane"
          icon={<Droplets className="w-5 h-5" />}
        >
          <p className="text-sm text-gray-600 leading-relaxed">
            Understanding{" "}
            <HoverReveal
              term="membrane transport"
              definition="The movement of substances across the cell membrane. Passive transport requires no energy (follows concentration gradient). Active transport requires ATP (moves against the gradient). Both are essential for maintaining cellular homeostasis."
            />{" "}
            is critical for understanding IV fluid therapy, medication absorption, renal function, and electrolyte balance.
          </p>
          <ProgressiveReveal
            title="Transport Mechanisms"
            cards={[
              {
                id: "mt1",
                title: "Simple Diffusion",
                summary: "Movement of small nonpolar molecules down the concentration gradient",
                detail: "No energy or membrane proteins required. O2 and CO2 cross the membrane this way. The rate depends on concentration gradient, temperature, and molecular size. Gases exchange in the lungs and tissues via simple diffusion.",
              },
              {
                id: "mt2",
                title: "Osmosis",
                summary: "Water movement through a semipermeable membrane",
                detail: "Water moves from areas of LOW solute concentration to HIGH solute concentration. This is why hypertonic IV solutions pull water out of cells (crenation) and hypotonic solutions push water into cells (potential lysis). Isotonic solutions (0.9% NaCl) cause no net water movement.",
              },
              {
                id: "mt3",
                title: "Facilitated Diffusion",
                summary: "Protein-assisted passive transport",
                detail: "Large or charged molecules (glucose, ions) need channel or carrier proteins to cross. Still passive (no ATP), still follows the gradient. GLUT transporters move glucose into cells this way. Aquaporins are channel proteins for water.",
              },
              {
                id: "mt4",
                title: "Active Transport & Na+/K+ Pump",
                summary: "ATP-powered movement against the gradient",
                detail: "The Na+/K+ ATPase pumps 3 Na+ out and 2 K+ in per ATP. This maintains the electrochemical gradient essential for nerve impulses (-70mV resting potential), muscle contraction, and secondary active transport. Digoxin works by inhibiting this pump.",
              },
              {
                id: "mt5",
                title: "Vesicular Transport",
                summary: "Bulk transport via membrane-bound vesicles",
                detail: "Endocytosis brings material INTO the cell (phagocytosis = 'cell eating'; pinocytosis = 'cell drinking'). Exocytosis releases material OUT (neurotransmitter release, hormone secretion). Both require energy and membrane remodeling.",
              },
            ]}
          />
          <CognitiveCard
            type="remember"
            title="Electrochemical Gradients"
            content="The electrochemical gradient combines the concentration gradient (chemical) with the electrical gradient (charge difference across the membrane). The Na+/K+ pump creates both: more Na+ outside (chemical) and net negative charge inside (electrical). This stored energy drives nerve impulses, muscle contraction, and secondary active transport (e.g., glucose co-transport in the intestine)."
          />
        </MicroLesson>

        <MicroLesson
          title="Receptors & Cell Signaling"
          subtitle="How cells receive and respond to chemical messages"
          icon={<Network className="w-5 h-5" />}
        >
          <p className="text-sm text-gray-600 leading-relaxed">
            <HoverReveal
              term="Cell signaling"
              definition="The process by which cells communicate using chemical messengers (ligands) that bind to specific receptors, triggering intracellular responses. This is how hormones, neurotransmitters, and drugs exert their effects."
            />{" "}
            underlies pharmacology — drugs work by mimicking or blocking natural signaling molecules.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-100">
              <p className="text-xs font-semibold text-indigo-700 mb-1">Receptor Types</p>
              <p className="text-xs text-indigo-600">Membrane receptors: G-protein coupled, ion channels, enzyme-linked. Intracellular receptors: for lipid-soluble hormones (steroids, thyroid hormone) that cross the membrane and bind DNA directly.</p>
            </div>
            <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-100">
              <p className="text-xs font-semibold text-rose-700 mb-1">Signal Transduction</p>
              <p className="text-xs text-rose-600">Ligand binds receptor → intracellular cascade → cellular response. Second messengers (cAMP, Ca2+) amplify the signal. One hormone molecule can trigger thousands of cellular reactions through signal amplification.</p>
            </div>
          </div>
          <CognitiveCard
            type="concept"
            title="Drug-Receptor Interactions"
            content="Agonists mimic the natural ligand and activate the receptor (e.g., albuterol mimics epinephrine at beta-2 receptors → bronchodilation). Antagonists block the receptor without activating it (e.g., propranolol blocks beta receptors → decreased heart rate). Understanding receptor pharmacology is the foundation of safe medication administration."
          />
        </MicroLesson>

        <MicroLesson
          title="Tissue Types"
          subtitle="Epithelial, connective, muscle, and nervous tissue"
          icon={<Layers className="w-5 h-5" />}
        >
          <ProgressiveReveal
            title="The Four Primary Tissue Types"
            cards={[
              {
                id: "tt1",
                title: "Epithelial Tissue",
                summary: "Covers surfaces, lines cavities, forms glands",
                detail: "Classified by layers (simple = one layer, stratified = multiple) and cell shape (squamous = flat, cuboidal = cube, columnar = column). Simple squamous lines alveoli and blood vessels (thin for diffusion). Stratified squamous covers skin (thick for protection). Pseudostratified ciliated columnar lines airways.",
              },
              {
                id: "tt2",
                title: "Connective Tissue",
                summary: "Supports, binds, and protects structures",
                detail: "Most abundant tissue type. Includes: loose CT (areolar — fills spaces), dense CT (tendons, ligaments), cartilage (hyaline, fibro, elastic), bone, blood, and adipose. All have cells embedded in an extracellular matrix. Connective tissue proper has fibroblasts producing collagen and elastin.",
              },
              {
                id: "tt3",
                title: "Muscle Tissue",
                summary: "Generates force through contraction",
                detail: "Skeletal: voluntary, striated, multinucleated — moves the skeleton. Cardiac: involuntary, striated, branched with intercalated discs — pumps blood. Smooth: involuntary, non-striated, spindle-shaped — found in organ walls (blood vessels, GI tract, airways).",
              },
              {
                id: "tt4",
                title: "Nervous Tissue",
                summary: "Generates and transmits electrical signals",
                detail: "Neurons: excitable cells that transmit electrical impulses via action potentials. Neuroglia (glial cells): support cells — astrocytes (blood-brain barrier), oligodendrocytes (CNS myelin), Schwann cells (PNS myelin), microglia (immune defense). Neurons are generally amitotic (don't divide) — damage is often permanent.",
              },
            ]}
          />
          <CognitiveCard
            type="warning"
            title="Cellular Injury & Adaptation"
            content="Cells respond to stress through adaptive changes: Atrophy (decreased size — muscle wasting from disuse), Hypertrophy (increased size — cardiac enlargement from hypertension), Hyperplasia (increased number — endometrial thickening), Metaplasia (change in type — smoker's bronchial cells). If stress exceeds adaptive capacity, irreversible injury leads to necrosis (pathological death) or apoptosis (programmed death)."
          />
        </MicroLesson>

        <MatchingExercise
          title="Transport Mechanisms"
          description="Match each transport type to its key characteristic"
          pairs={[
            { id: "tm1", term: "Simple diffusion", definition: "No energy, no proteins needed" },
            { id: "tm2", term: "Osmosis", definition: "Water movement toward higher solute" },
            { id: "tm3", term: "Facilitated diffusion", definition: "Protein-assisted, still passive" },
            { id: "tm4", term: "Na+/K+ pump", definition: "3 Na+ out, 2 K+ in, uses ATP" },
            { id: "tm5", term: "Endocytosis", definition: "Material brought into cell via vesicle" },
            { id: "tm6", term: "Exocytosis", definition: "Material released from cell via vesicle" },
          ]}
        />

        <SelfCheckQuiz title="Cell & Tissue Biology Check" questions={cellTissueQuiz} />
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
            <Shield className="w-5 h-5 text-amber-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Integumentary System</h3>
        </div>

        <MicroLesson
          title="Skin Structure & Protective Functions"
          subtitle="The body's largest organ and first line of defense"
          icon={<Shield className="w-5 h-5" />}
        >
          <p className="text-sm text-gray-600 leading-relaxed">
            The skin is the body's largest organ, comprising about 16% of body weight. It has three primary layers:{" "}
            <HoverReveal
              term="epidermis"
              definition="The outermost layer of skin, composed of stratified squamous epithelium. Contains keratinocytes (produce keratin for waterproofing), melanocytes (produce melanin for UV protection), Langerhans cells (immune function), and Merkel cells (touch sensation)."
            />,{" "}
            <HoverReveal
              term="dermis"
              definition="The thick middle layer containing blood vessels, nerve endings, hair follicles, sweat and sebaceous glands. Made of dense irregular connective tissue with collagen and elastin fibers providing strength and elasticity."
            />, and the{" "}
            <HoverReveal
              term="hypodermis"
              definition="Also called subcutaneous tissue. Primarily adipose tissue providing insulation, cushioning, and energy storage. Contains larger blood vessels. Subcutaneous injection sites utilize this layer."
            />.
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mt-3">
            <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-100">
              <p className="text-xs font-semibold text-amber-700 mb-1">Protection</p>
              <p className="text-xs text-amber-600">Physical barrier against pathogens, chemicals, UV radiation. Acid mantle (pH 4-6) inhibits bacterial growth.</p>
            </div>
            <div className="p-4 bg-orange-50/60 rounded-xl border border-orange-100">
              <p className="text-xs font-semibold text-orange-700 mb-1">Thermoregulation</p>
              <p className="text-xs text-orange-600">Dermal blood vessel dilation/constriction and sweat gland activation regulate body temperature under hypothalamic control.</p>
            </div>
            <div className="p-4 bg-yellow-50/60 rounded-xl border border-yellow-100">
              <p className="text-xs font-semibold text-yellow-700 mb-1">Sensation & Synthesis</p>
              <p className="text-xs text-yellow-600">Rich nerve endings detect touch, pressure, temperature, pain. Vitamin D synthesis occurs when UV light hits the epidermis.</p>
            </div>
          </div>
        </MicroLesson>

        <MicroLesson
          title="Skin Integrity, Wound Healing & Fluid Loss"
          subtitle="Maintaining the body's protective barrier"
          icon={<Droplets className="w-5 h-5" />}
        >
          <p className="text-sm text-gray-600 leading-relaxed">
            Skin integrity is a critical nursing assessment. Factors that compromise the skin barrier include age (thinner epidermis, less collagen), nutrition (protein/vitamin C deficiency impairs healing), moisture (incontinence-associated dermatitis), pressure (decubitus ulcers), and disease (diabetes impairs microcirculation).
          </p>
          <ProgressiveReveal
            title="Wound Healing Phases"
            cards={[
              {
                id: "wh1",
                title: "Hemostasis (Immediate)",
                summary: "Blood vessel spasm and clot formation",
                detail: "Vascular spasm reduces blood flow. Platelets aggregate and form a temporary plug. The coagulation cascade produces fibrin mesh that stabilizes the clot. This stops bleeding and provides a framework for repair.",
              },
              {
                id: "wh2",
                title: "Inflammatory Phase (Days 1-4)",
                summary: "Immune response clears debris and fights infection",
                detail: "Neutrophils arrive first (within hours) to phagocytize bacteria and debris. Macrophages follow (24-48 hours), cleaning the wound and releasing growth factors. Cardinal signs: redness, heat, swelling, pain — these are NORMAL and necessary.",
              },
              {
                id: "wh3",
                title: "Proliferative Phase (Days 4-21)",
                summary: "New tissue formation and wound closure",
                detail: "Fibroblasts produce collagen (granulation tissue — beefy red appearance). Angiogenesis creates new blood vessels. Epithelial cells migrate across the wound surface (epithelialization). The wound contracts as myofibroblasts pull edges together.",
              },
              {
                id: "wh4",
                title: "Maturation/Remodeling (21 days-2 years)",
                summary: "Scar strengthening and reorganization",
                detail: "Collagen is reorganized and cross-linked for strength. The scar gradually strengthens but only reaches about 80% of original tissue strength. Excessive collagen → hypertrophic scar or keloid. This phase can last up to 2 years.",
              },
            ]}
          />
          <CognitiveCard
            type="remember"
            title="Skin Turgor & Fluid Assessment"
            content="Skin turgor assesses hydration status. When skin is gently pinched and released, well-hydrated tissue returns immediately to its normal position. Tenting (skin remains raised) indicates dehydration — decreased interstitial fluid reduces skin elasticity. Assess on the sternum or inner forearm; elderly patients' decreased collagen makes extremity turgor unreliable. Insensible water loss through the skin is approximately 300-400 mL/day and increases dramatically with burns, fever, and low humidity."
          />
        </MicroLesson>

        <SelfCheckQuiz title="Integumentary System Check" questions={integumentaryQuiz} />
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <Bone className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Skeletal System</h3>
        </div>

        <MicroLesson
          title="Bone Structure & Function"
          subtitle="Living tissue that supports, protects, and stores minerals"
          icon={<Bone className="w-5 h-5" />}
        >
          <p className="text-sm text-gray-600 leading-relaxed">
            Bones are dynamic living tissue, not static structures. They are continuously{" "}
            <HoverReveal
              term="remodeled"
              definition="Bone remodeling is the continuous process of bone resorption by osteoclasts and new bone formation by osteoblasts. This allows bones to repair microdamage, adapt to mechanical stress, and maintain calcium homeostasis."
            />{" "}
            throughout life, responding to mechanical stress, hormonal signals, and nutritional status.
          </p>
          <div className="space-y-3 mt-3">
            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
              <p className="text-xs font-semibold text-blue-700 mb-1">Bone Cells</p>
              <p className="text-xs text-blue-600">Osteoblasts BUILD bone (think 'B' for build). Osteoclasts BREAK DOWN bone (think 'C' for consume). Osteocytes are mature bone cells embedded in the matrix that sense mechanical stress and regulate remodeling.</p>
            </div>
            <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-100">
              <p className="text-xs font-semibold text-indigo-700 mb-1">Compact vs Spongy Bone</p>
              <p className="text-xs text-indigo-600">Compact (cortical) bone: dense outer layer, organized in osteons (Haversian systems). Spongy (cancellous) bone: inner lattice structure (trabeculae), lighter, contains red bone marrow for hematopoiesis in flat bones and epiphyses.</p>
            </div>
            <div className="p-4 bg-violet-50/60 rounded-xl border border-violet-100">
              <p className="text-xs font-semibold text-violet-700 mb-1">Bone Functions</p>
              <p className="text-xs text-violet-600">Support and shape • Protection (skull protects brain, ribs protect heart/lungs) • Movement (muscle attachment) • Mineral storage (calcium, phosphorus) • Blood cell production (hematopoiesis) • Energy storage (yellow marrow = fat).</p>
            </div>
          </div>
        </MicroLesson>

        <MicroLesson
          title="Calcium Homeostasis & Bone Types"
          subtitle="Hormonal regulation and skeletal classification"
          icon={<Activity className="w-5 h-5" />}
        >
          <p className="text-sm text-gray-600 leading-relaxed">
            <HoverReveal
              term="Calcium homeostasis"
              definition="Blood calcium (8.5-10.5 mg/dL) is tightly regulated by PTH (raises calcium) and calcitonin (lowers calcium). Calcium is critical for muscle contraction, nerve transmission, blood clotting, and cardiac rhythm."
            />{" "}
            involves a delicate balance between PTH and calcitonin, with bones serving as the body's calcium reservoir.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
              <p className="text-xs font-semibold text-emerald-700 mb-1">PTH (Raises Calcium)</p>
              <p className="text-xs text-emerald-600">Low Ca2+ → parathyroid glands release PTH → stimulates osteoclasts (bone resorption), increases renal Ca2+ reabsorption, activates vitamin D → calcium rises. Remember: PTH = 'Pulls calcium To High.'</p>
            </div>
            <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-100">
              <p className="text-xs font-semibold text-teal-700 mb-1">Calcitonin (Lowers Calcium)</p>
              <p className="text-xs text-teal-600">High Ca2+ → thyroid C-cells release calcitonin → inhibits osteoclasts, promotes calcium deposition in bone → calcium drops. Calcitonin 'tones down' calcium. Less clinically significant than PTH.</p>
            </div>
          </div>
          <CognitiveCard
            type="concept"
            title="Types of Bones"
            content="Long bones (femur, humerus) — levers for movement. Short bones (carpals, tarsals) — gliding movements. Flat bones (skull, sternum, pelvis) — protection and hematopoiesis. Irregular bones (vertebrae, facial bones) — complex shapes for specific functions. Sesamoid bones (patella) — develop within tendons to reduce friction."
          />
        </MicroLesson>

        <MicroLesson
          title="Joints & the Skeleton"
          subtitle="Where bones meet and how the skeleton is organized"
          icon={<Bone className="w-5 h-5" />}
        >
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
              <p className="text-sm font-semibold text-blue-700 mb-1">Joint Classification</p>
              <p className="text-xs text-blue-600">Fibrous joints (synarthroses): immovable (skull sutures). Cartilaginous joints (amphiarthroses): slightly movable (intervertebral discs, pubic symphysis). Synovial joints (diarthroses): freely movable (knee, shoulder, hip) — most clinically significant.</p>
            </div>
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
              <p className="text-sm font-semibold text-emerald-700 mb-1">Synovial Joint Features</p>
              <p className="text-xs text-emerald-600">Joint cavity with synovial fluid (lubrication, nutrition). Articular cartilage (smooth, shock-absorbing). Joint capsule with ligaments (stability). Menisci and bursae provide additional support. Movements: flexion, extension, abduction, adduction, rotation, circumduction.</p>
            </div>
          </div>
          <CognitiveCard
            type="remember"
            title="Axial vs Appendicular Skeleton"
            content="The axial skeleton (80 bones) forms the central axis: skull (22), hyoid (1), vertebral column (26), thoracic cage (25). It protects the brain, spinal cord, and thoracic organs. The appendicular skeleton (126 bones) includes the pectoral girdle, upper limbs, pelvic girdle, and lower limbs — designed for movement and manipulation. Total: 206 bones in the adult skeleton."
          />
        </MicroLesson>

        <MatchingExercise
          title="Bone & Joint Concepts"
          description="Match each term to its description"
          pairs={[
            { id: "bj1", term: "Osteoblasts", definition: "Bone-building cells" },
            { id: "bj2", term: "Osteoclasts", definition: "Bone-resorbing cells" },
            { id: "bj3", term: "PTH", definition: "Raises blood calcium" },
            { id: "bj4", term: "Calcitonin", definition: "Lowers blood calcium" },
            { id: "bj5", term: "Synovial fluid", definition: "Lubricates freely movable joints" },
            { id: "bj6", term: "Red bone marrow", definition: "Site of blood cell production" },
          ]}
        />

        <SelfCheckQuiz title="Skeletal System Check" questions={skeletalQuiz} />
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
            <Dumbbell className="w-5 h-5 text-rose-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Muscular System</h3>
        </div>

        <MicroLesson
          title="Muscle Tissue Characteristics"
          subtitle="Three types of muscle and their unique properties"
          icon={<Dumbbell className="w-5 h-5" />}
        >
          <p className="text-sm text-gray-600 leading-relaxed">
            All muscle tissue shares four key properties:{" "}
            <HoverReveal
              term="excitability"
              definition="The ability to respond to stimuli (nerve impulses, hormones, stretch). All muscle types are excitable, but they respond to different types of stimulation."
            />, contractility, extensibility, and elasticity. However, the three muscle types differ significantly in structure, control, and location.
          </p>
          <div className="grid sm:grid-cols-3 gap-3 mt-3">
            <div className="p-4 bg-rose-50/60 rounded-xl border border-rose-100">
              <p className="text-xs font-semibold text-rose-700 mb-1">Skeletal Muscle</p>
              <p className="text-xs text-rose-600">Voluntary, striated, multinucleated. Attached to bones via tendons. Under conscious (somatic nervous system) control. Fast contraction but fatigues. Makes up ~40% of body weight.</p>
            </div>
            <div className="p-4 bg-red-50/60 rounded-xl border border-red-100">
              <p className="text-xs font-semibold text-red-700 mb-1">Cardiac Muscle</p>
              <p className="text-xs text-red-600">Involuntary, striated, branched. Found ONLY in the heart. Intercalated discs allow synchronized contraction. Autorhythmic — generates its own electrical impulses. Highly resistant to fatigue.</p>
            </div>
            <div className="p-4 bg-pink-50/60 rounded-xl border border-pink-100">
              <p className="text-xs font-semibold text-pink-700 mb-1">Smooth Muscle</p>
              <p className="text-xs text-pink-600">Involuntary, non-striated, spindle-shaped. Found in walls of hollow organs (blood vessels, GI tract, bladder, airways). Slow, sustained contractions. Controlled by ANS, hormones, and local factors.</p>
            </div>
          </div>
        </MicroLesson>

        <MicroLesson
          title="Sliding Filament Theory & Neuromuscular Junction"
          subtitle="How muscles contract at the molecular level"
          icon={<Zap className="w-5 h-5" />}
        >
          <p className="text-sm text-gray-600 leading-relaxed">
            Muscle contraction follows the{" "}
            <HoverReveal
              term="sliding filament theory"
              definition="Thin filaments (actin) slide over thick filaments (myosin) within the sarcomere. Myosin heads form cross-bridges with actin and pull the thin filaments toward the center, shortening the sarcomere. Requires calcium (to expose binding sites on actin) and ATP (for cross-bridge cycling and detachment)."
            />, which begins with a signal at the neuromuscular junction.
          </p>
          <div className="space-y-3 mt-3">
            <div className="p-4 bg-violet-50/60 rounded-xl border border-violet-100">
              <p className="text-xs font-semibold text-violet-700 mb-1">Neuromuscular Junction (NMJ)</p>
              <p className="text-xs text-violet-600">Motor neuron releases ACh → ACh binds nicotinic receptors on muscle fiber → depolarization → action potential propagates along sarcolemma and into T-tubules → Ca2+ released from sarcoplasmic reticulum → contraction begins.</p>
            </div>
            <div className="p-4 bg-fuchsia-50/60 rounded-xl border border-fuchsia-100">
              <p className="text-xs font-semibold text-fuchsia-700 mb-1">Contraction Cycle</p>
              <p className="text-xs text-fuchsia-600">Ca2+ binds troponin → tropomyosin shifts → actin binding sites exposed → myosin cross-bridge forms → power stroke (pulls actin) → ATP binds myosin (detachment) → cycle repeats. Ca2+ removal → relaxation.</p>
            </div>
          </div>
          <CognitiveCard
            type="concept"
            title="Types of Contractions & Muscle Fatigue"
            content="Isotonic contractions: muscle length changes (concentric = shortening, eccentric = lengthening under tension). Isometric contractions: muscle generates force without length change (holding a heavy object). Muscle fatigue occurs from ATP depletion, lactic acid accumulation, electrolyte imbalances (K+, Ca2+, Na+), and CNS fatigue. Creatine phosphate provides immediate ATP for the first 10-15 seconds of intense activity, then aerobic and anaerobic pathways take over."
          />
        </MicroLesson>

        <SelfCheckQuiz title="Muscular System Check" questions={muscularQuiz} />
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
            <Brain className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Nervous System</h3>
        </div>

        <MicroLesson
          title="Neuron Structure & Electrical Signaling"
          subtitle="How nerve cells generate and transmit impulses"
          icon={<Brain className="w-5 h-5" />}
        >
          <p className="text-sm text-gray-600 leading-relaxed">
            Neurons are the functional units of the nervous system, specialized for rapid{" "}
            <HoverReveal
              term="electrochemical communication"
              definition="Neurons communicate using electrical signals (action potentials) along their length and chemical signals (neurotransmitters) across synapses. This combination allows for both speed (electrical) and specificity (chemical)."
            />.
          </p>
          <div className="space-y-3 mt-3">
            <div className="p-4 bg-purple-50/60 rounded-xl border border-purple-100">
              <p className="text-xs font-semibold text-purple-700 mb-1">Neuron Anatomy</p>
              <p className="text-xs text-purple-600">Cell body (soma): contains nucleus and organelles. Dendrites: receive incoming signals (input). Axon: conducts action potentials away from soma (output). Myelin sheath: insulating lipid layer that speeds conduction (saltatory conduction between nodes of Ranvier).</p>
            </div>
            <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-100">
              <p className="text-xs font-semibold text-indigo-700 mb-1">Resting Membrane Potential (-70mV)</p>
              <p className="text-xs text-indigo-600">At rest, the neuron interior is negative relative to outside. Maintained by: Na+/K+ pump (3 Na+ out, 2 K+ in), K+ leak channels (K+ diffuses out), and large intracellular anions. This 'charged' state is the potential energy for signaling.</p>
            </div>
          </div>
        </MicroLesson>

        <MicroLesson
          title="Action Potential & Synaptic Transmission"
          subtitle="The nerve impulse from generation to communication"
          icon={<Zap className="w-5 h-5" />}
        >
          <ProgressiveReveal
            title="Action Potential Steps"
            cards={[
              {
                id: "ap1",
                title: "1. Resting State",
                summary: "Neuron at -70mV, Na+ channels closed",
                detail: "The membrane is polarized at -70mV. Voltage-gated Na+ and K+ channels are closed. The Na+/K+ pump maintains ion gradients. The neuron is ready to fire but needs sufficient stimulation to reach threshold.",
              },
              {
                id: "ap2",
                title: "2. Depolarization",
                summary: "Na+ rushes in, membrane reaches +30mV",
                detail: "When a stimulus reaches threshold (-55mV), voltage-gated Na+ channels open rapidly. Na+ floods into the cell, driving the membrane potential from -70mV to about +30mV. This is an 'all-or-nothing' event — once threshold is reached, the full action potential fires.",
              },
              {
                id: "ap3",
                title: "3. Repolarization",
                summary: "K+ rushes out, membrane returns toward negative",
                detail: "Na+ channels inactivate. Voltage-gated K+ channels open (they're slower). K+ flows OUT of the cell, restoring the negative interior. The membrane potential drops back toward -70mV.",
              },
              {
                id: "ap4",
                title: "4. Hyperpolarization & Recovery",
                summary: "Brief overshoot below -70mV, then restoration",
                detail: "K+ channels close slowly, so the membrane briefly overshoots to about -80mV (hyperpolarization). The Na+/K+ pump then restores normal ion distribution. The absolute refractory period (during repolarization) prevents backward impulse propagation.",
              },
            ]}
          />
          <CognitiveCard
            type="remember"
            title="Synaptic Transmission"
            content="When an action potential reaches the axon terminal: (1) voltage-gated Ca2+ channels open, (2) Ca2+ influx triggers vesicle fusion with the membrane, (3) neurotransmitters are released into the synaptic cleft (exocytosis), (4) neurotransmitters bind postsynaptic receptors, (5) excitatory or inhibitory response generated. The signal is terminated by reuptake, enzymatic breakdown, or diffusion. Most psychiatric and neurological drugs target these synaptic mechanisms."
          />
        </MicroLesson>

        <MicroLesson
          title="CNS, PNS & the Autonomic Nervous System"
          subtitle="Structural and functional divisions of the nervous system"
          icon={<Network className="w-5 h-5" />}
        >
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
              <p className="text-sm font-semibold text-blue-700 mb-1">CNS (Brain & Spinal Cord)</p>
              <p className="text-xs text-blue-600">Integration and command center. Protected by meninges, CSF, and bone. Processes sensory input, initiates motor output, and manages higher functions (thought, memory, emotion). Damage is often permanent due to limited regeneration.</p>
            </div>
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
              <p className="text-sm font-semibold text-emerald-700 mb-1">PNS (Nerves & Ganglia)</p>
              <p className="text-xs text-emerald-600">Communication lines between CNS and body. Sensory (afferent) division: carries signals TO the CNS. Motor (efferent) division: carries signals FROM the CNS. Includes somatic (voluntary) and autonomic (involuntary) subdivisions.</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <div className="p-4 bg-orange-50/60 rounded-xl border border-orange-100">
              <p className="text-xs font-semibold text-orange-700 mb-1">Sympathetic NS ('Fight or Flight')</p>
              <p className="text-xs text-orange-600">Thoracolumbar origin. Releases norepinephrine. Effects: ↑HR, ↑BP, bronchodilation, pupil dilation, ↑blood glucose, blood shunted to muscles, ↓GI motility. Prepares body for emergency action.</p>
            </div>
            <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-100">
              <p className="text-xs font-semibold text-teal-700 mb-1">Parasympathetic NS ('Rest & Digest')</p>
              <p className="text-xs text-teal-600">Craniosacral origin. Releases acetylcholine. Effects: ↓HR, ↓BP, bronchoconstriction, pupil constriction, ↑GI motility/secretion, promotes digestion. Dominates during rest and recovery.</p>
            </div>
          </div>
          <CognitiveCard
            type="concept"
            title="Key Neurotransmitters"
            content="Acetylcholine (ACh): muscle contraction, parasympathetic effects, memory. Norepinephrine: sympathetic 'fight or flight,' alertness. Dopamine: reward, movement (Parkinson's = dopamine deficiency). Serotonin: mood, sleep, appetite (many antidepressants target serotonin). GABA: main inhibitory NT (benzodiazepines enhance GABA). Glutamate: main excitatory NT. Endorphins: natural pain relief. Understanding these helps you predict drug effects and side effects."
          />
        </MicroLesson>

        <MatchingExercise
          title="Nervous System Concepts"
          description="Match each concept to its description"
          pairs={[
            { id: "nc1", term: "Depolarization", definition: "Na+ rushes into the cell" },
            { id: "nc2", term: "Repolarization", definition: "K+ flows out of the cell" },
            { id: "nc3", term: "Sympathetic NS", definition: "Fight or flight response" },
            { id: "nc4", term: "Parasympathetic NS", definition: "Rest and digest response" },
            { id: "nc5", term: "Myelin sheath", definition: "Speeds up nerve conduction" },
            { id: "nc6", term: "Synapse", definition: "Junction between two neurons" },
          ]}
        />

        <SelfCheckQuiz title="Nervous System Check" questions={nervousQuiz} />
      </section>

      <section className="space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
            <Heart className="w-5 h-5 text-teal-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900">Endocrine System</h3>
        </div>

        <MicroLesson
          title="Hormone Signaling & Negative Feedback"
          subtitle="Chemical messengers and how the body regulates them"
          icon={<Heart className="w-5 h-5" />}
        >
          <p className="text-sm text-gray-600 leading-relaxed">
            The endocrine system uses{" "}
            <HoverReveal
              term="hormones"
              definition="Chemical messengers secreted by endocrine glands into the bloodstream. They travel to distant target cells with specific receptors. Hormones regulate metabolism, growth, reproduction, mood, and homeostasis. Two main types: water-soluble (peptide/protein — bind membrane receptors) and lipid-soluble (steroid/thyroid — enter cells and bind intracellular receptors)."
            />{" "}
            for slower but longer-lasting communication compared to the nervous system.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <div className="p-4 bg-teal-50/60 rounded-xl border border-teal-100">
              <p className="text-xs font-semibold text-teal-700 mb-1">Water-Soluble Hormones</p>
              <p className="text-xs text-teal-600">Peptides and proteins (insulin, ADH, oxytocin). Cannot cross cell membranes. Bind surface receptors → second messenger cascade (cAMP). Fast onset, short duration. Cannot be taken orally (digested).</p>
            </div>
            <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100">
              <p className="text-xs font-semibold text-emerald-700 mb-1">Lipid-Soluble Hormones</p>
              <p className="text-xs text-emerald-600">Steroids (cortisol, estrogen, testosterone) and thyroid hormones. Cross membranes freely. Bind intracellular/nuclear receptors → alter gene expression. Slow onset, long duration. Many can be taken orally.</p>
            </div>
          </div>
          <CognitiveCard
            type="warning"
            title="Negative Feedback Controls Most Hormones"
            content="Rising hormone levels inhibit further release. Example: Thyroid axis — Hypothalamus releases TRH → Anterior pituitary releases TSH → Thyroid releases T3/T4 → Rising T3/T4 levels inhibit TRH and TSH release (negative feedback). In hypothyroidism, low T3/T4 means TSH is HIGH (no feedback inhibition). In hyperthyroidism, high T3/T4 means TSH is LOW (strong feedback inhibition). This logic applies to most endocrine axes."
          />
        </MicroLesson>

        <MicroLesson
          title="The Pituitary Gland"
          subtitle="The master gland controlling other endocrine organs"
          icon={<Sparkles className="w-5 h-5" />}
        >
          <p className="text-sm text-gray-600 leading-relaxed">
            The{" "}
            <HoverReveal
              term="pituitary gland"
              definition="A pea-sized gland at the base of the brain, connected to the hypothalamus. Has two lobes: anterior (adenohypophysis) secretes six major hormones, posterior (neurohypophysis) stores and releases two hormones made by the hypothalamus."
            />{" "}
            is controlled by the hypothalamus and regulates thyroid, adrenals, gonads, growth, and more.
          </p>
          <div className="grid sm:grid-cols-2 gap-3 mt-3">
            <div className="p-4 bg-indigo-50/60 rounded-xl border border-indigo-100">
              <p className="text-xs font-semibold text-indigo-700 mb-1">Anterior Pituitary Hormones</p>
              <p className="text-xs text-indigo-600">GH (growth), TSH (thyroid), ACTH (adrenals/cortisol), FSH & LH (gonads), Prolactin (milk production). Mnemonic: FLAT PiG — FSH, LH, ACTH, TSH, Prolactin, GH.</p>
            </div>
            <div className="p-4 bg-violet-50/60 rounded-xl border border-violet-100">
              <p className="text-xs font-semibold text-violet-700 mb-1">Posterior Pituitary Hormones</p>
              <p className="text-xs text-violet-600">ADH (antidiuretic hormone): promotes water reabsorption in kidneys — low ADH → diabetes insipidus (dilute urine). Oxytocin: stimulates uterine contractions and milk let-down. Both made in hypothalamus, stored in posterior pituitary.</p>
            </div>
          </div>
        </MicroLesson>

        <MicroLesson
          title="Insulin, Glucose Regulation & Stress Hormones"
          subtitle="Critical metabolic and stress response pathways"
          icon={<Activity className="w-5 h-5" />}
        >
          <div className="space-y-3">
            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100">
              <p className="text-xs font-semibold text-blue-700 mb-1">Insulin & Glucagon</p>
              <p className="text-xs text-blue-600">Insulin (beta cells): released when glucose HIGH → moves glucose INTO cells, lowers blood sugar. Glucagon (alpha cells): released when glucose LOW → stimulates glycogenolysis and gluconeogenesis, raises blood sugar. They work as antagonistic partners to maintain glucose 70-100 mg/dL.</p>
            </div>
            <div className="p-4 bg-amber-50/60 rounded-xl border border-amber-100">
              <p className="text-xs font-semibold text-amber-700 mb-1">Stress Response Hormones</p>
              <p className="text-xs text-amber-600">Acute stress: Adrenal medulla releases epinephrine/norepinephrine (catecholamines) → rapid fight-or-flight response. Chronic stress: HPA axis activates → hypothalamus (CRH) → anterior pituitary (ACTH) → adrenal cortex (cortisol) → elevated glucose, suppressed immunity, protein breakdown.</p>
            </div>
          </div>
          <CognitiveCard
            type="remember"
            title="Clinical Implications of Cortisol"
            content="Chronic cortisol elevation (Cushing syndrome): hyperglycemia, immunosuppression, muscle wasting, central obesity, moon face, thin skin, osteoporosis, poor wound healing. Cortisol deficiency (Addison disease): hypoglycemia, hypotension, hyperkalemia, hyponatremia, hyperpigmentation, fatigue. Exogenous corticosteroids (prednisone) mimic cortisol — never stop abruptly (adrenal suppression → adrenal crisis)."
          />
        </MicroLesson>

        <MatchingExercise
          title="Endocrine Concepts"
          description="Match each hormone to its primary action"
          pairs={[
            { id: "ec1", term: "Insulin", definition: "Lowers blood glucose" },
            { id: "ec2", term: "Glucagon", definition: "Raises blood glucose" },
            { id: "ec3", term: "ADH", definition: "Promotes water reabsorption in kidneys" },
            { id: "ec4", term: "Cortisol", definition: "Stress hormone from adrenal cortex" },
            { id: "ec5", term: "TSH", definition: "Stimulates thyroid hormone release" },
            { id: "ec6", term: "Oxytocin", definition: "Uterine contractions and milk let-down" },
          ]}
        />

        <SelfCheckQuiz title="Endocrine System Check" questions={endocrineQuiz} />
      </section>
    </div>
  );
}