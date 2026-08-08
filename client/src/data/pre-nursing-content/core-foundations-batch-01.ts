export type PreNursingCheck = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  rationale: string;
  misconception?: string;
};

export type PreNursingDeepLesson = {
  id: string;
  moduleId: string;
  slug: string;
  seoTitle: string;
  metaDescription: string;
  primaryQuery: string;
  title: string;
  hook: string;
  estimatedMinutes: number;
  objectives: string[];
  sections: Array<{
    heading: string;
    paragraphs: string[];
    clinicalBridge?: string;
    knowledgeChecks: PreNursingCheck[];
  }>;
  finalReview: PreNursingCheck[];
  faq: Array<{ question: string; answer: string }>;
};

export const CORE_FOUNDATIONS_BATCH_01: PreNursingDeepLesson[] = [
  {
    id: "prenursing-medterm-001",
    moduleId: "medical-terminology",
    slug: "medical-terminology-prefixes-roots-suffixes",
    seoTitle: "Medical Terminology for Nursing Students: Prefixes, Roots & Suffixes",
    metaDescription: "Learn medical terminology from scratch with prefixes, roots, suffixes, clinical examples, knowledge checks, and beginner nursing practice questions.",
    primaryQuery: "medical terminology for nursing students",
    title: "Decode Medical Language Like a Puzzle",
    hook: "Medical words look intimidating until you realize they are built from reusable pieces. Instead of memorizing thousands of terms, you can learn to decode unfamiliar words safely and logically.",
    estimatedMinutes: 40,
    objectives: [
      "Identify prefixes, roots, combining vowels, and suffixes.",
      "Infer the meaning of unfamiliar medical terms from word parts.",
      "Connect common word parts to anatomy, conditions, and procedures.",
      "Recognize when an abbreviation or interpretation must be verified rather than guessed.",
    ],
    sections: [
      {
        heading: "Start with the suffix",
        paragraphs: [
          "The suffix often tells you what kind of word you are dealing with. -itis means inflammation, -ectomy means surgical removal, -algia means pain, -emia refers to a blood condition, and -megaly means enlargement.",
          "Now add the root. Cardiomegaly contains cardi, meaning heart, plus -megaly, meaning enlargement. Nephrectomy contains nephr, meaning kidney, plus -ectomy, meaning surgical removal.",
          "This is a more durable strategy than memorizing whole words because the same parts appear repeatedly across specialties and body systems.",
        ],
        clinicalBridge: "When you can decode a term, chart reading becomes less cognitively expensive and you can focus on what the information means for the patient.",
        knowledgeChecks: [
          { id: "mt001-k1", prompt: "What does the suffix -itis mean?", options: ["Pain", "Inflammation", "Removal", "Enlargement"], correctIndex: 1, rationale: "-itis means inflammation, as in gastritis or dermatitis." },
          { id: "mt001-k2", prompt: "What does nephrectomy mean?", options: ["Inflammation of a kidney", "Surgical removal of a kidney", "Enlargement of a kidney", "Pain in a kidney"], correctIndex: 1, rationale: "Nephr- means kidney and -ectomy means surgical removal." },
          { id: "mt001-k3", prompt: "Which part of a medical term usually identifies a condition or procedure?", options: ["Suffix", "Combining vowel", "Punctuation", "Article"], correctIndex: 0, rationale: "The suffix commonly identifies the condition, procedure, or specialty." },
        ],
      },
      {
        heading: "Prefixes modify speed, amount, position, and number",
        paragraphs: [
          "Prefixes sit before the root and change meaning. Brady- means slow, tachy- means fast, hypo- means below or deficient, hyper- means above or excessive, intra- means within, and peri- means around.",
          "Think in opposites. Hypoglycemia means low blood glucose while hyperglycemia means high blood glucose. Bradycardia means a slow heart rate while tachycardia means a fast heart rate.",
          "Connecting a prefix to a patient state makes it easier to remember than memorizing definitions in isolation.",
        ],
        clinicalBridge: "Small changes in prefixes can completely change the meaning of a clinical word and therefore what you assess next.",
        knowledgeChecks: [
          { id: "mt001-k4", prompt: "Which term means slow breathing?", options: ["Tachypnea", "Bradypnea", "Dyspnea", "Apnea"], correctIndex: 1, rationale: "Brady- means slow and -pnea refers to breathing." },
          { id: "mt001-k5", prompt: "The prefix intra- means:", options: ["Around", "Below", "Within", "Above"], correctIndex: 2, rationale: "Intra- means within, as in intravenous or intracellular." },
          { id: "mt001-k6", prompt: "Hyperkalemia describes:", options: ["Low potassium", "High potassium", "No potassium", "Potassium outside the body"], correctIndex: 1, rationale: "Hyper- means above or excessive; kal refers to potassium; -emia indicates a blood condition." },
        ],
      },
      {
        heading: "Roots anchor the term to anatomy or function",
        paragraphs: [
          "Roots identify the central subject of the word. Cardi refers to heart, hepat to liver, nephr or ren to kidney, gastr to stomach, enter to intestine, neur to nerve, and oste to bone.",
          "Medical language uses both Greek- and Latin-derived roots, so one organ can have more than one common root. Kidney can appear as nephr- or ren-. Blood can appear as hem-, hemo-, or hemat-.",
          "A combining vowel, usually o, connects word parts. In gastroenterology, gastr/o refers to the stomach and enter/o to the intestine. The vowel mainly makes the word easier to pronounce.",
        ],
        knowledgeChecks: [
          { id: "mt001-k7", prompt: "Which root refers to the liver?", options: ["Hepat", "Nephr", "Oste", "Cardi"], correctIndex: 0, rationale: "Hepat- refers to the liver." },
          { id: "mt001-k8", prompt: "Which two roots can both refer to the kidney?", options: ["Cardi and hepat", "Nephr and ren", "Gastr and oste", "Neur and hem"], correctIndex: 1, rationale: "Both nephr- and ren- are used for kidney-related terminology." },
          { id: "mt001-k9", prompt: "What is the main job of a combining vowel?", options: ["Change disease severity", "Connect word parts for pronunciation", "Identify medication dose", "Make every term plural"], correctIndex: 1, rationale: "A combining vowel joins word elements and improves pronunciation." },
        ],
      },
      {
        heading: "Know when not to guess",
        paragraphs: [
          "Decoding is useful, but safe healthcare communication also requires recognizing uncertainty. An unfamiliar abbreviation in a medication order, procedure, or patient identifier should not be guessed.",
          "A strong beginner habit is to ask: could being wrong here change what happens to a patient? If yes, verify using an approved reference or clarification process.",
          "Clinical competence is not knowing every abbreviation from memory. It is knowing when confidence is high enough to proceed and when uncertainty requires verification.",
        ],
        clinicalBridge: "This is one of the earliest forms of clinical judgment: identify uncertainty, estimate the consequence of error, and choose verification when the risk matters.",
        knowledgeChecks: [
          { id: "mt001-k10", prompt: "You cannot confidently interpret an abbreviation in a medication order. What is safest?", options: ["Guess from context", "Clarify through an approved process", "Ignore the order", "Choose the most familiar meaning"], correctIndex: 1, rationale: "Medication-related ambiguity should be clarified, not inferred." },
          { id: "mt001-k11", prompt: "Which situation most clearly requires verification?", options: ["A familiar anatomy root", "An ambiguous medication abbreviation", "A known suffix", "A common plural"], correctIndex: 1, rationale: "Ambiguity that could affect medication administration carries safety consequences." },
          { id: "mt001-k12", prompt: "What is the best general rule for uncertain clinical language?", options: ["Never look anything up", "Guess quickly", "Verify when an error could affect care", "Memorize only abbreviations"], correctIndex: 2, rationale: "Verification is appropriate when the consequence of a wrong interpretation could affect care." },
        ],
      },
    ],
    finalReview: [
      { id: "mt001-r1", prompt: "Which suffix means surgical removal?", options: ["-itis", "-ectomy", "-algia", "-megaly"], correctIndex: 1, rationale: "-ectomy means surgical removal." },
      { id: "mt001-r2", prompt: "Which term means inflammation of the liver?", options: ["Hepatitis", "Nephritis", "Cardiomegaly", "Gastrectomy"], correctIndex: 0, rationale: "Hepat- means liver and -itis means inflammation." },
      { id: "mt001-r3", prompt: "What does tachy- mean?", options: ["Slow", "Fast", "Below", "Around"], correctIndex: 1, rationale: "Tachy- means fast." },
      { id: "mt001-r4", prompt: "Which root refers to bone?", options: ["Oste", "Neur", "Hemat", "Enter"], correctIndex: 0, rationale: "Oste- refers to bone." },
      { id: "mt001-r5", prompt: "What is the most useful first step with a long unfamiliar term?", options: ["Identify recognizable word parts", "Assume it is a diagnosis", "Skip it", "Translate each letter"], correctIndex: 0, rationale: "Recognizing suffixes, roots, and prefixes lets you infer meaning logically." },
      { id: "mt001-r6", prompt: "Which term means enlargement of the heart?", options: ["Carditis", "Cardiomegaly", "Cardiectomy", "Cardialgia"], correctIndex: 1, rationale: "Cardi- means heart and -megaly means enlargement." },
      { id: "mt001-r7", prompt: "Hypoglycemia means:", options: ["High blood glucose", "Low blood glucose", "No insulin", "High potassium"], correctIndex: 1, rationale: "Hypo- means low or below normal; glyc refers to glucose; -emia refers to blood." },
      { id: "mt001-r8", prompt: "Which word part most commonly identifies the body structure?", options: ["Root", "Suffix", "Article", "Punctuation"], correctIndex: 0, rationale: "The root typically identifies the core structure or concept." },
      { id: "mt001-r9", prompt: "Why is decoding better than memorizing every whole term?", options: ["Medical terms never repeat", "Reusable word parts generalize to unfamiliar terms", "Roots are optional", "Suffixes are decorative"], correctIndex: 1, rationale: "Reusable word parts allow learners to reason through many unfamiliar words." },
      { id: "mt001-r10", prompt: "If a term interpretation could alter patient care and you are unsure, you should:", options: ["Verify it", "Guess it", "Ignore it", "Rewrite it"], correctIndex: 0, rationale: "Safety takes priority over guessing." },
    ],
    faq: [
      { question: "What is the easiest way to learn medical terminology?", answer: "Learn reusable prefixes, roots, and suffixes, then practice decoding unfamiliar terms in context instead of memorizing isolated lists." },
      { question: "Do nursing students need to memorize every medical abbreviation?", answer: "No. Learn common approved terminology, but verify unfamiliar or ambiguous abbreviations whenever an incorrect interpretation could affect care." },
      { question: "What should I learn before anatomy and physiology?", answer: "Basic directional terms, body planes, common medical roots, and a small set of prefixes and suffixes make anatomy and physiology much easier to read." },
    ],
  },
  {
    id: "prenursing-cell-001",
    moduleId: "cell-biology",
    slug: "cell-biology-organelles-osmosis-diffusion-nursing",
    seoTitle: "Cell Biology for Nursing Students: Organelles, Osmosis & Diffusion",
    metaDescription: "Learn cell biology for nursing school with organelles, membranes, osmosis, diffusion, ATP, cell injury, clinical examples, and practice questions.",
    primaryQuery: "cell biology for nursing students",
    title: "The Cell as a Tiny Hospital",
    hook: "Picture a cell as a miniature hospital: a controlled entrance, a command centre, protein factories, packaging stations, recycling units, and power generators. Disease becomes easier to understand when you ask which cellular job has failed.",
    estimatedMinutes: 45,
    objectives: [
      "Explain the function of major organelles.",
      "Differentiate diffusion, osmosis, facilitated diffusion, and active transport.",
      "Predict water movement in hypertonic, hypotonic, and isotonic environments.",
      "Connect oxygen deprivation and ATP depletion to cellular injury.",
    ],
    sections: [
      {
        heading: "The cell membrane is a regulated border",
        paragraphs: [
          "The plasma membrane is mainly a phospholipid bilayer containing proteins, cholesterol, and carbohydrates. It separates intracellular from extracellular fluid while controlling exchange.",
          "Small nonpolar molecules can cross the lipid bilayer relatively easily. Ions and many polar molecules rely on channels or carriers. Some transport is passive and follows a gradient; other transport consumes ATP to move substances against a gradient.",
          "Membrane receptors detect chemical signals such as hormones and neurotransmitters, allowing an outside message to change events inside the cell.",
        ],
        clinicalBridge: "Many medications work by binding membrane receptors or changing ion channels, so cell-membrane physiology is a direct foundation for pharmacology.",
        knowledgeChecks: [
          { id: "cb001-k1", prompt: "Why is the plasma membrane selectively permeable?", options: ["It blocks everything", "It regulates what crosses and how", "Only oxygen can cross", "It contains DNA"], correctIndex: 1, rationale: "Membrane structure and transport proteins allow selective movement of substances." },
          { id: "cb001-k2", prompt: "Moving sodium against its concentration gradient usually requires:", options: ["ATP", "No energy", "DNA", "Osmosis"], correctIndex: 0, rationale: "Movement against a gradient is active transport and requires energy." },
          { id: "cb001-k3", prompt: "A receptor on the cell membrane primarily helps the cell:", options: ["Store chromosomes", "Receive signals", "Make red blood cells", "Digest all proteins"], correctIndex: 1, rationale: "Membrane receptors bind signals and trigger intracellular responses." },
        ],
      },
      {
        heading: "Organelles divide the workload",
        paragraphs: [
          "The nucleus stores DNA. Ribosomes assemble proteins. Rough endoplasmic reticulum helps produce and process many proteins. Smooth endoplasmic reticulum participates in lipid synthesis and detoxification. The Golgi apparatus modifies, sorts, and packages products.",
          "Mitochondria generate most ATP during aerobic metabolism. Lysosomes contain digestive enzymes that break down damaged components and debris. The cytoskeleton supports shape, movement, and intracellular organization.",
          "Instead of memorizing a list, imagine the consequences of failure. Mitochondrial dysfunction threatens energy supply. Lysosomal dysfunction can allow substances to accumulate. Ribosomal dysfunction reduces protein production.",
        ],
        clinicalBridge: "The brain and heart are highly energy dependent, which helps explain why prolonged oxygen interruption can damage them quickly.",
        knowledgeChecks: [
          { id: "cb001-k4", prompt: "Which organelle produces most ATP aerobically?", options: ["Mitochondrion", "Golgi apparatus", "Lysosome", "Nucleus"], correctIndex: 0, rationale: "Mitochondria generate most ATP through oxidative phosphorylation." },
          { id: "cb001-k5", prompt: "Which structure directly assembles proteins?", options: ["Ribosome", "Lysosome", "Nucleus membrane", "Centriole"], correctIndex: 0, rationale: "Ribosomes translate mRNA into protein." },
          { id: "cb001-k6", prompt: "Which organelle modifies and packages cellular products?", options: ["Golgi apparatus", "Mitochondrion", "Nucleolus", "Cell membrane"], correctIndex: 0, rationale: "The Golgi apparatus sorts, modifies, and packages molecules." },
        ],
      },
      {
        heading: "Diffusion and osmosis explain movement without pumps",
        paragraphs: [
          "Diffusion is net particle movement from higher concentration toward lower concentration. Oxygen moving from alveoli toward pulmonary capillary blood is a clinically important example.",
          "Osmosis specifically describes water movement across a selectively permeable membrane toward the side with the greater effective concentration of nonpenetrating solute.",
          "In a hypertonic environment, water tends to leave a cell and the cell shrinks. In a hypotonic environment, water tends to enter and the cell swells. In an isotonic environment, there is no major net change in cell volume.",
        ],
        clinicalBridge: "Understanding tonicity prepares learners for later IV-fluid reasoning and fluid/electrolyte concepts.",
        knowledgeChecks: [
          { id: "cb001-k7", prompt: "A red blood cell is placed in a hypertonic solution. What happens?", options: ["It swells", "It shrinks", "It divides", "It produces extra DNA"], correctIndex: 1, rationale: "Water leaves the cell toward the higher extracellular effective solute concentration." },
          { id: "cb001-k8", prompt: "Oxygen moving down a concentration gradient is an example of:", options: ["Diffusion", "Mitosis", "Active transport", "Endocytosis"], correctIndex: 0, rationale: "Diffusion is movement down a concentration gradient." },
          { id: "cb001-k9", prompt: "A strongly hypotonic environment tends to make cells:", options: ["Shrink", "Swell", "Calcify", "Stop containing water"], correctIndex: 1, rationale: "Water moves into cells when extracellular fluid is relatively hypotonic." },
        ],
      },
      {
        heading: "Low oxygen becomes a cellular energy crisis",
        paragraphs: [
          "ATP powers ion pumps, synthesis, contraction, signalling, and repair. Under aerobic conditions, mitochondria produce much more ATP from glucose than anaerobic glycolysis alone.",
          "When oxygen delivery falls severely, oxidative phosphorylation slows. ATP levels fall, energy-dependent membrane pumps fail, sodium accumulates inside cells, and water follows. Cells swell and normal electrical and chemical gradients deteriorate.",
          "Anaerobic metabolism increases and lactate accumulates. If oxygen delivery is restored early, the cell may recover. If membrane damage and metabolic failure become severe enough, injury becomes irreversible.",
        ],
        clinicalBridge: "Shock, stroke, and myocardial infarction become easier to understand when you see them as problems of perfusion, oxygen delivery, ATP failure, and cell injury.",
        knowledgeChecks: [
          { id: "cb001-k10", prompt: "Why can ATP depletion cause cell swelling?", options: ["Ion pumps fail and intracellular sodium rises", "DNA doubles", "All proteins leave", "Oxygen becomes hypertonic"], correctIndex: 0, rationale: "ATP-dependent ion pumps fail, sodium accumulates intracellularly, and water follows osmotically." },
          { id: "cb001-k11", prompt: "Which metabolic change increases when oxygen is severely limited?", options: ["Anaerobic glycolysis", "Oxidative phosphorylation", "DNA transcription only", "Protein packaging"], correctIndex: 0, rationale: "Cells rely more heavily on anaerobic glycolysis when oxygen-dependent ATP generation is impaired." },
          { id: "cb001-k12", prompt: "Why are brain and heart tissues vulnerable to prolonged hypoxia?", options: ["They have high energy demand", "They contain no mitochondria", "They use no glucose", "They are outside circulation"], correctIndex: 0, rationale: "Brain and heart tissue have high continuous energy demands and depend heavily on adequate oxygen delivery." },
        ],
      },
    ],
    finalReview: [
      { id: "cb001-r1", prompt: "Which organelle stores most cellular DNA?", options: ["Nucleus", "Golgi", "Lysosome", "Ribosome"], correctIndex: 0, rationale: "The nucleus contains most cellular DNA." },
      { id: "cb001-r2", prompt: "Which organelle is the main aerobic ATP producer?", options: ["Mitochondrion", "Ribosome", "Golgi", "Lysosome"], correctIndex: 0, rationale: "Mitochondria produce most aerobic ATP." },
      { id: "cb001-r3", prompt: "Diffusion moves particles generally from:", options: ["Low to high concentration", "High to low concentration", "Nucleus to membrane only", "Blood to lymph only"], correctIndex: 1, rationale: "Net diffusion proceeds down a concentration gradient." },
      { id: "cb001-r4", prompt: "Osmosis describes movement of:", options: ["Water", "DNA", "Protein synthesis", "ATP"], correctIndex: 0, rationale: "Osmosis refers to water movement across a selectively permeable membrane." },
      { id: "cb001-r5", prompt: "A hypertonic extracellular fluid causes a cell to generally:", options: ["Shrink", "Swell", "Divide", "Produce antibodies"], correctIndex: 0, rationale: "Water leaves the cell in a hypertonic environment." },
      { id: "cb001-r6", prompt: "Which process requires energy to move a substance against its gradient?", options: ["Active transport", "Simple diffusion", "Osmosis", "Filtration only"], correctIndex: 0, rationale: "Active transport uses energy to move substances against a gradient." },
      { id: "cb001-r7", prompt: "Which structure assembles proteins?", options: ["Ribosome", "Lysosome", "Mitochondrion", "Golgi only"], correctIndex: 0, rationale: "Ribosomes synthesize proteins." },
      { id: "cb001-r8", prompt: "Which organelle contains digestive enzymes for breakdown and recycling?", options: ["Lysosome", "Nucleus", "Ribosome", "Centromere"], correctIndex: 0, rationale: "Lysosomes contain hydrolytic enzymes used in intracellular digestion." },
      { id: "cb001-r9", prompt: "Severe oxygen shortage reduces ATP mainly because it impairs:", options: ["Oxidative phosphorylation", "Mitosis", "Osmosis", "DNA storage"], correctIndex: 0, rationale: "Oxidative phosphorylation requires oxygen as the final electron acceptor." },
      { id: "cb001-r10", prompt: "Which sequence best links hypoxia to cell swelling?", options: ["Hypoxia → low ATP → pump failure → sodium and water enter", "Hypoxia → extra ATP → sodium exits", "Hypoxia → DNA loss → water exits", "Hypoxia → protein synthesis → shrinkage"], correctIndex: 0, rationale: "ATP depletion impairs ion pumps, leading to intracellular sodium and water accumulation." },
    ],
    faq: [
      { question: "What cell organelles should nursing students know first?", answer: "Start with the nucleus, ribosomes, rough and smooth endoplasmic reticulum, Golgi apparatus, mitochondria, lysosomes, and the plasma membrane, then connect each structure to what happens when its function fails." },
      { question: "What is the difference between diffusion and osmosis?", answer: "Diffusion is net movement of particles down a concentration gradient. Osmosis specifically refers to water moving across a selectively permeable membrane in response to effective solute concentration differences." },
      { question: "Why is ATP important in nursing pathophysiology?", answer: "ATP powers membrane pumps and other essential cellular processes. When oxygen delivery fails, ATP falls, ion gradients fail, cells swell, and injury can progress." },
    ],
  },
  {
    id: "prenursing-chem-001",
    moduleId: "chemistry",
    slug: "chemistry-for-nursing-students-atoms-electrolytes-ph",
    seoTitle: "Chemistry for Nursing Students: Atoms, Electrolytes, pH & Buffers",
    metaDescription: "Understand chemistry for nursing school from scratch: atoms, ions, electrolytes, bonds, pH, buffers, clinical examples, and practice questions.",
    primaryQuery: "chemistry for nursing students",
    title: "Chemistry Without the Fear",
    hook: "Every heartbeat depends on ions, every breath changes acid-base chemistry, and every IV fluid changes the chemical environment around cells. Chemistry becomes easier when you connect it to what the body is doing every minute.",
    estimatedMinutes: 45,
    objectives: [
      "Describe atoms, elements, ions, and common bond types.",
      "Explain why electrolytes conduct electrical current in body fluids.",
      "Interpret the pH scale conceptually.",
      "Explain the purpose of buffers and the roles of lungs and kidneys in acid-base balance.",
    ],
    sections: [
      {
        heading: "Atoms become clinically important when they carry charge",
        paragraphs: [
          "Atoms contain positively charged protons, neutral neutrons, and negatively charged electrons. The number of protons identifies the element, while electron behaviour strongly influences chemical interactions.",
          "If an atom loses electrons, it becomes positively charged. If it gains electrons, it becomes negatively charged. Charged atoms or molecules are ions.",
          "Sodium, potassium, calcium, chloride, magnesium, and bicarbonate are clinically important ions. Their controlled distribution helps create electrical gradients used by nerves and muscles.",
        ],
        clinicalBridge: "Electrolyte values matter because changing ion concentrations can alter excitability, conduction, contraction, fluid distribution, and acid-base balance.",
        knowledgeChecks: [
          { id: "ch001-k1", prompt: "An atom that loses electrons becomes generally:", options: ["Positively charged", "Negatively charged", "Neutral forever", "A protein"], correctIndex: 0, rationale: "Losing negatively charged electrons leaves a net positive charge." },
          { id: "ch001-k2", prompt: "Why are electrolytes important to nerves and muscles?", options: ["Their ions participate in electrical gradients", "They store DNA", "They replace all proteins", "They eliminate oxygen"], correctIndex: 0, rationale: "Ion gradients across membranes are central to electrical signalling and contraction." },
          { id: "ch001-k3", prompt: "Which is an example of a clinically important ion?", options: ["Sodium", "Starch", "Collagen", "DNA"], correctIndex: 0, rationale: "Sodium is a major body electrolyte and ion." },
        ],
      },
      {
        heading: "Chemical bonds explain how biological matter holds together",
        paragraphs: [
          "Covalent bonds involve sharing electrons. Ionic interactions reflect attraction between oppositely charged particles. Hydrogen bonds are weaker individually but collectively important for water behaviour, protein structure, and DNA base pairing.",
          "Water is polar because its electrons are shared unequally, creating partial charges. This polarity allows water to interact with ions and many other polar substances.",
          "When sodium chloride dissolves in water, sodium and chloride separate into mobile ions. This is why dissolved electrolytes can conduct current.",
        ],
        knowledgeChecks: [
          { id: "ch001-k4", prompt: "Which property helps water dissolve many ionic substances?", options: ["Polarity", "Radioactivity", "Lack of electrons", "Permanent acidity"], correctIndex: 0, rationale: "Water's polarity allows its partial charges to interact with ions." },
          { id: "ch001-k5", prompt: "A covalent bond generally involves:", options: ["Sharing electrons", "Destroying protons", "Moving water only", "Removing all charge"], correctIndex: 0, rationale: "Covalent bonds are formed by shared electron pairs." },
          { id: "ch001-k6", prompt: "Why can dissolved sodium chloride conduct electrical current?", options: ["It forms mobile charged ions", "It becomes protein", "It loses all water", "It makes ATP directly"], correctIndex: 0, rationale: "Dissociation creates mobile sodium and chloride ions that carry charge." },
        ],
      },
      {
        heading: "pH tells you about hydrogen ion activity",
        paragraphs: [
          "Lower pH means greater hydrogen ion activity and greater acidity. Higher pH means lower hydrogen ion activity and greater basicity or alkalinity.",
          "The pH scale is logarithmic. A change of one whole pH unit represents a tenfold change in hydrogen ion concentration, so small numerical shifts can represent large chemical changes.",
          "Proteins and enzymes depend on their three-dimensional shape. Significant pH changes can alter charge and structure, disrupting protein function.",
        ],
        clinicalBridge: "The body tightly regulates pH because enzyme function, membrane activity, and cellular metabolism depend on a narrow chemical environment.",
        knowledgeChecks: [
          { id: "ch001-k7", prompt: "Which solution is more acidic?", options: ["pH 6", "pH 8", "They are equal", "pH does not measure acidity"], correctIndex: 0, rationale: "Lower pH corresponds to greater hydrogen ion activity and greater acidity." },
          { id: "ch001-k8", prompt: "Why is a one-unit pH change significant?", options: ["The scale is logarithmic", "The scale is a temperature scale", "It always doubles sodium", "It removes all water"], correctIndex: 0, rationale: "A one-unit pH change represents a tenfold hydrogen ion concentration change." },
          { id: "ch001-k9", prompt: "Large pH disturbances can impair enzymes because they may alter:", options: ["Protein shape and charge", "The number of bones", "Blood type", "Chromosome count"], correctIndex: 0, rationale: "pH changes can alter protein ionization, structure, and therefore function." },
        ],
      },
      {
        heading: "Buffers, lungs, and kidneys defend pH",
        paragraphs: [
          "A buffer resists abrupt pH change by accepting or donating hydrogen ions. Bicarbonate is an important extracellular buffer system.",
          "The lungs influence acid-base balance by controlling carbon dioxide elimination. Because carbon dioxide participates in an equilibrium involving carbonic acid and hydrogen ions, ventilation changes can shift acidity.",
          "The kidneys act more slowly but powerfully by excreting hydrogen ions and conserving or generating bicarbonate. Later arterial blood gas interpretation will build directly on these concepts.",
        ],
        clinicalBridge: "Instead of memorizing acid-base disorders as labels, learners can later reason from ventilation, carbon dioxide, bicarbonate, hydrogen ions, and compensation.",
        knowledgeChecks: [
          { id: "ch001-k10", prompt: "What is the main purpose of a buffer?", options: ["Resist abrupt pH change", "Destroy all acids", "Increase temperature", "Stop kidney filtration"], correctIndex: 0, rationale: "Buffers minimize sudden pH changes by accepting or donating hydrogen ions." },
          { id: "ch001-k11", prompt: "Which organ system can rapidly change carbon dioxide elimination?", options: ["Respiratory system", "Skeletal system", "Integumentary system", "Reproductive system"], correctIndex: 0, rationale: "Ventilation controls how quickly carbon dioxide is exhaled." },
          { id: "ch001-k12", prompt: "Which organs provide slower acid-base regulation through hydrogen ion and bicarbonate handling?", options: ["Kidneys", "Spleen", "Skin only", "Pancreas only"], correctIndex: 0, rationale: "The kidneys regulate acid-base balance through hydrogen ion excretion and bicarbonate handling." },
        ],
      },
    ],
    finalReview: [
      { id: "ch001-r1", prompt: "Which particle carries a negative charge?", options: ["Electron", "Proton", "Neutron", "Nucleus"], correctIndex: 0, rationale: "Electrons are negatively charged." },
      { id: "ch001-r2", prompt: "A positively charged ion is called a:", options: ["Cation", "Anion", "Buffer", "Solvent"], correctIndex: 0, rationale: "A cation carries a positive charge." },
      { id: "ch001-r3", prompt: "Which pH is more acidic?", options: ["5", "9", "10", "11"], correctIndex: 0, rationale: "Lower pH is more acidic." },
      { id: "ch001-r4", prompt: "What does a buffer do?", options: ["Resists pH change", "Stops all reactions", "Creates DNA", "Removes all electrolytes"], correctIndex: 0, rationale: "Buffers resist abrupt pH change." },
      { id: "ch001-r5", prompt: "Which electrolyte is a positively charged ion in body fluids?", options: ["Sodium", "Chloride", "Bicarbonate", "Protein"], correctIndex: 0, rationale: "Sodium is a major cation." },
      { id: "ch001-r6", prompt: "Why does water dissolve many ions?", options: ["It is polar", "It is nonpolar", "It has no charge distribution", "It is a protein"], correctIndex: 0, rationale: "Water's polarity stabilizes charged particles in solution." },
      { id: "ch001-r7", prompt: "Which bond involves shared electrons?", options: ["Covalent", "No bond", "Osmotic", "Hydrostatic"], correctIndex: 0, rationale: "Covalent bonds form through electron sharing." },
      { id: "ch001-r8", prompt: "Which system rapidly alters CO2 by changing ventilation?", options: ["Respiratory", "Skeletal", "Lymphatic", "Integumentary"], correctIndex: 0, rationale: "The respiratory system controls CO2 elimination through ventilation." },
      { id: "ch001-r9", prompt: "Which organs regulate bicarbonate and hydrogen ions over longer periods?", options: ["Kidneys", "Lungs only", "Bones only", "Skin only"], correctIndex: 0, rationale: "Kidneys provide slower metabolic acid-base regulation." },
      { id: "ch001-r10", prompt: "Why do electrolytes matter clinically?", options: ["They influence electrical and fluid physiology", "They are decorative lab values", "They contain all genetic material", "They never change cell function"], correctIndex: 0, rationale: "Electrolytes participate in membrane potentials, contraction, fluid distribution, and acid-base physiology." },
    ],
    faq: [
      { question: "How much chemistry do I need before nursing school?", answer: "Focus first on atoms and ions, bonds and polarity, solutions and concentration, acids and bases, pH and buffers, and the chemistry behind electrolytes and body fluids." },
      { question: "Why do nursing students need to understand pH?", answer: "pH affects enzyme and cell function and is central to acid-base disorders, ventilation, kidney regulation, and later arterial blood gas interpretation." },
      { question: "What are the most important electrolytes to learn first?", answer: "Start with sodium, potassium, calcium, magnesium, chloride, and bicarbonate, then connect each ion to fluid balance, electrical activity, muscle function, or acid-base regulation." },
    ],
  },
];

export const CORE_FOUNDATIONS_BATCH_01_COUNTS = {
  lessons: CORE_FOUNDATIONS_BATCH_01.length,
  embeddedKnowledgeChecks: CORE_FOUNDATIONS_BATCH_01.reduce(
    (total, lesson) => total + lesson.sections.reduce((sectionTotal, section) => sectionTotal + section.knowledgeChecks.length, 0),
    0,
  ),
  finalReviewQuestions: CORE_FOUNDATIONS_BATCH_01.reduce((total, lesson) => total + lesson.finalReview.length, 0),
} as const;
