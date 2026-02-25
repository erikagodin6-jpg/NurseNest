import type { BankQuestion } from "./types";

export const anatomyQuestions: BankQuestion[] = [
  // ===== ANATOMICAL TERMINOLOGY (10 questions: anat-001 to anat-010) =====
  {
    id: "anat-001",
    course: "anatomy",
    topic: "Anatomical Terminology",
    subtopic: "Body Planes",
    stem: "Which anatomical plane divides the body into anterior and posterior portions?",
    options: ["Sagittal plane", "Coronal (frontal) plane", "Transverse plane", "Oblique plane"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The coronal (frontal) plane divides the body into anterior (front) and posterior (back) portions. It runs vertically from side to side, perpendicular to the sagittal plane.",
    rationaleIncorrect: [
      "The sagittal plane divides the body into left and right portions, not anterior and posterior.",
      "The transverse plane divides the body into superior and inferior portions.",
      "An oblique plane passes through the body at an angle and is not a standard reference plane."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Understanding body planes is essential for interpreting imaging studies such as CT scans and MRIs, which display cross-sections along specific planes.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["body planes", "coronal plane", "anatomical terminology", "imaging"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-002",
    course: "anatomy",
    topic: "Anatomical Terminology",
    subtopic: "Directional Terms",
    stem: "A nurse documents that a wound is located on the lateral aspect of the patient's right leg. What does 'lateral' mean in this context?",
    options: ["Closer to the midline of the body", "Farther from the midline of the body", "Toward the head", "Toward the feet"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "Lateral means farther from the midline of the body. A wound on the lateral aspect of the right leg would be on the outer side of the leg, away from the body's center.",
    rationaleIncorrect: [
      "Closer to the midline describes the term 'medial,' not lateral.",
      "Toward the head describes the term 'superior' or 'cranial.'",
      "Toward the feet describes the term 'inferior' or 'caudal.'"
    ],
    difficulty: 1,
    bloomLevel: "understanding",
    clinicalCorrelation: "Nurses use directional terminology to accurately document wound locations, injection sites, and areas of pain, ensuring clear communication among healthcare providers.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["directional terms", "lateral", "documentation", "nursing communication"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-003",
    course: "anatomy",
    topic: "Anatomical Terminology",
    subtopic: "Body Cavities",
    stem: "The heart is located within which body cavity?",
    options: ["Abdominal cavity", "Pleural cavity", "Mediastinum", "Cranial cavity"],
    correctAnswer: 2,
    type: "mcq",
    rationaleCorrect: "The heart is located in the mediastinum, which is the central compartment of the thoracic cavity. The mediastinum lies between the two pleural cavities and contains the heart, great vessels, trachea, and esophagus.",
    rationaleIncorrect: [
      "The abdominal cavity contains organs such as the stomach, liver, and intestines, not the heart.",
      "The pleural cavities surround the lungs, not the heart.",
      "The cranial cavity contains the brain."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Knowledge of the mediastinum is critical when assessing for conditions like cardiac tamponade or mediastinal shift, which can be life-threatening emergencies.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["body cavities", "mediastinum", "thoracic cavity", "heart location"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-004",
    course: "anatomy",
    topic: "Anatomical Terminology",
    subtopic: "Anatomical Position",
    stem: "In the standard anatomical position, which of the following is correct?",
    options: ["Arms are crossed over the chest", "Palms face posteriorly", "The body stands erect with palms facing anteriorly", "The feet are crossed"],
    correctAnswer: 2,
    type: "mcq",
    rationaleCorrect: "In the standard anatomical position, the body stands erect, facing forward, with arms at the sides and palms facing anteriorly (forward). The feet are flat on the floor and slightly apart.",
    rationaleIncorrect: [
      "Arms crossed over the chest is not part of the standard anatomical position.",
      "In anatomical position, palms face anteriorly (forward), not posteriorly.",
      "The feet are parallel and slightly apart, not crossed."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "The anatomical position is the universal reference standard used in clinical documentation, ensuring consistent communication when describing body locations and directions.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["anatomical position", "body orientation", "clinical documentation"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-005",
    course: "anatomy",
    topic: "Anatomical Terminology",
    subtopic: "Abdominopelvic Regions",
    stem: "A patient reports pain in the right lower quadrant (RLQ). Which organ is most commonly associated with pathology in this region?",
    options: ["Spleen", "Appendix", "Stomach", "Gallbladder"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The appendix is located in the right lower quadrant of the abdomen. Pain in the RLQ is classically associated with appendicitis, one of the most common surgical emergencies.",
    rationaleIncorrect: [
      "The spleen is located in the left upper quadrant (LUQ).",
      "The stomach is primarily located in the left upper quadrant and epigastric region.",
      "The gallbladder is located in the right upper quadrant (RUQ)."
    ],
    difficulty: 1,
    bloomLevel: "application",
    clinicalCorrelation: "Nurses performing abdominal assessments must correlate quadrant location with underlying organs to prioritize assessment findings and recognize potential emergencies like appendicitis.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["abdominopelvic regions", "RLQ", "appendix", "abdominal assessment"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-006",
    course: "anatomy",
    topic: "Anatomical Terminology",
    subtopic: "Directional Terms",
    stem: "The term 'proximal' means:",
    options: ["Closer to the trunk or point of origin", "Farther from the trunk or point of origin", "On the front surface", "On the back surface"],
    correctAnswer: 0,
    type: "mcq",
    rationaleCorrect: "Proximal means closer to the trunk or point of origin of a structure. For example, the elbow is proximal to the wrist because it is closer to the trunk.",
    rationaleIncorrect: [
      "Farther from the trunk describes the term 'distal.'",
      "On the front surface describes the term 'anterior' or 'ventral.'",
      "On the back surface describes the term 'posterior' or 'dorsal.'"
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Nurses use proximal and distal references when documenting IV insertion sites, fracture locations, and assessing peripheral pulses.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["directional terms", "proximal", "distal", "clinical terminology"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-007",
    course: "anatomy",
    topic: "Anatomical Terminology",
    subtopic: "Body Movements",
    stem: "Which movement describes bending a joint to decrease the angle between two bones?",
    options: ["Extension", "Flexion", "Abduction", "Rotation"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "Flexion is the movement that decreases the angle between two bones at a joint. For example, bending the elbow brings the forearm closer to the upper arm, reducing the joint angle.",
    rationaleIncorrect: [
      "Extension increases the angle between bones at a joint, the opposite of flexion.",
      "Abduction is movement away from the midline of the body.",
      "Rotation is the turning of a bone around its own axis."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Nurses assess range of motion using movement terminology during musculoskeletal assessments and when documenting patient mobility status.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["body movements", "flexion", "range of motion", "joint movement"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-008",
    course: "anatomy",
    topic: "Anatomical Terminology",
    subtopic: "Serous Membranes",
    stem: "Which serous membrane lines the abdominal cavity and covers the abdominal organs?",
    options: ["Pleura", "Pericardium", "Peritoneum", "Meninges"],
    correctAnswer: 2,
    type: "mcq",
    rationaleCorrect: "The peritoneum is the serous membrane of the abdominal cavity. The parietal peritoneum lines the abdominal wall, and the visceral peritoneum covers the abdominal organs. The peritoneal cavity between them contains a small amount of serous fluid.",
    rationaleIncorrect: [
      "The pleura is the serous membrane surrounding the lungs.",
      "The pericardium is the serous membrane surrounding the heart.",
      "The meninges are protective membranes of the brain and spinal cord, not serous membranes of the abdomen."
    ],
    difficulty: 2,
    bloomLevel: "recall",
    clinicalCorrelation: "Understanding the peritoneum is essential for recognizing peritonitis, a serious inflammation that can result from a ruptured appendix or perforated bowel.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["serous membranes", "peritoneum", "body cavities", "peritonitis"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-009",
    course: "anatomy",
    topic: "Anatomical Terminology",
    subtopic: "Organ Systems Overview",
    stem: "Place the following levels of structural organization in order from simplest to most complex. (Select all that apply)",
    options: ["Organ", "Chemical", "Tissue", "Cell", "Organ system"],
    correctOrder: [1, 3, 2, 0, 4],
    type: "ordered",
    rationaleCorrect: "The correct order from simplest to most complex is: Chemical → Cell → Tissue → Organ → Organ system. This hierarchy reflects increasing complexity, with each level building upon the previous one.",
    rationaleIncorrect: [
      "Organ is the fourth level, not the first.",
      "Chemical is the simplest level of organization.",
      "Tissue is the third level, formed by groups of similar cells.",
      "Cell is the second level, the basic unit of life.",
      "Organ system is the most complex level listed here."
    ],
    difficulty: 2,
    bloomLevel: "understanding",
    clinicalCorrelation: "Understanding levels of organization helps nurses comprehend how disease at the cellular level can lead to tissue damage, organ dysfunction, and system-wide failure.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["structural organization", "levels of organization", "hierarchy", "body organization"],
    estimatedTimeSeconds: 60
  },
  {
    id: "anat-010",
    course: "anatomy",
    topic: "Anatomical Terminology",
    subtopic: "Homeostasis",
    stem: "Which of the following best describes a negative feedback mechanism?",
    options: [
      "A response that amplifies the original stimulus",
      "A response that reverses or reduces the original stimulus",
      "A response that has no effect on the stimulus",
      "A response that only occurs during disease states"
    ],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "A negative feedback mechanism reverses or reduces the original stimulus, bringing the body back toward a set point. Most homeostatic mechanisms in the body use negative feedback. For example, when blood glucose rises, insulin is released to lower it.",
    rationaleIncorrect: [
      "Amplifying the original stimulus describes positive feedback, such as during labor contractions.",
      "A response with no effect would not contribute to homeostasis.",
      "Negative feedback operates continuously in health, not only during disease states."
    ],
    difficulty: 2,
    bloomLevel: "understanding",
    clinicalCorrelation: "Nurses monitor vital signs and lab values that reflect homeostatic balance. Understanding feedback mechanisms helps explain why conditions like diabetes involve disrupted glucose regulation.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["homeostasis", "negative feedback", "feedback mechanisms", "regulation"],
    estimatedTimeSeconds: 45
  },

  // ===== CELLS/TISSUES (10 questions: anat-011 to anat-020) =====
  {
    id: "anat-011",
    course: "anatomy",
    topic: "Cells and Tissues",
    subtopic: "Cell Organelles",
    stem: "Which organelle is primarily responsible for producing ATP, the cell's main energy source?",
    options: ["Ribosome", "Golgi apparatus", "Mitochondria", "Endoplasmic reticulum"],
    correctAnswer: 2,
    type: "mcq",
    rationaleCorrect: "Mitochondria are often called the 'powerhouses' of the cell because they produce most of the cell's ATP through cellular respiration. They have a double membrane and contain their own DNA.",
    rationaleIncorrect: [
      "Ribosomes are responsible for protein synthesis, not energy production.",
      "The Golgi apparatus packages and modifies proteins for secretion or transport.",
      "The endoplasmic reticulum is involved in protein synthesis (rough ER) and lipid synthesis (smooth ER), not primary ATP production."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Cells with high energy demands, such as cardiac muscle cells, contain abundant mitochondria. Mitochondrial dysfunction can contribute to heart failure and metabolic disorders.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["cell organelles", "mitochondria", "ATP", "cellular respiration"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-012",
    course: "anatomy",
    topic: "Cells and Tissues",
    subtopic: "Cell Membrane",
    stem: "The cell membrane is best described as:",
    options: [
      "A rigid, impermeable barrier",
      "A fluid mosaic of phospholipids and proteins",
      "A single layer of carbohydrates",
      "A double layer of proteins without lipids"
    ],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The cell membrane is described by the fluid mosaic model as a dynamic structure composed of a phospholipid bilayer with embedded and peripheral proteins, cholesterol, and glycolipids. This structure allows selective permeability.",
    rationaleIncorrect: [
      "The cell membrane is flexible and selectively permeable, not rigid and impermeable.",
      "The membrane is primarily a phospholipid bilayer, not a single carbohydrate layer.",
      "Both phospholipids and proteins are essential components of the cell membrane."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Understanding cell membrane structure is essential for comprehending how medications cross cell membranes and how electrolytes move during IV fluid administration.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["cell membrane", "fluid mosaic model", "phospholipid bilayer", "membrane transport"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-013",
    course: "anatomy",
    topic: "Cells and Tissues",
    subtopic: "Transport Mechanisms",
    stem: "Which type of transport requires cellular energy (ATP) to move substances against their concentration gradient?",
    options: ["Osmosis", "Simple diffusion", "Active transport", "Facilitated diffusion"],
    correctAnswer: 2,
    type: "mcq",
    rationaleCorrect: "Active transport uses ATP to move substances against (up) their concentration gradient, from an area of lower concentration to higher concentration. The sodium-potassium pump is a classic example.",
    rationaleIncorrect: [
      "Osmosis is passive movement of water across a selectively permeable membrane.",
      "Simple diffusion is passive movement of molecules from high to low concentration.",
      "Facilitated diffusion uses carrier proteins but does not require ATP; it moves substances down their concentration gradient."
    ],
    difficulty: 1,
    bloomLevel: "understanding",
    clinicalCorrelation: "The sodium-potassium pump is critical for maintaining resting membrane potential in nerve and muscle cells. Electrolyte imbalances can disrupt this pump and affect cardiac rhythm.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["active transport", "ATP", "concentration gradient", "sodium-potassium pump"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-014",
    course: "anatomy",
    topic: "Cells and Tissues",
    subtopic: "Tissue Types",
    stem: "Which of the following are characteristics of epithelial tissue? (Select all that apply)",
    options: [
      "Lines body surfaces and cavities",
      "Is highly vascular with abundant blood supply",
      "Cells are tightly packed with minimal extracellular matrix",
      "Has a free (apical) surface exposed to a body cavity or exterior",
      "Attaches to a basement membrane",
      "Primarily functions in energy storage"
    ],
    correctAnswers: [0, 2, 3, 4],
    type: "sata",
    rationaleCorrect: "Epithelial tissue lines body surfaces and cavities, has tightly packed cells with minimal matrix, a free apical surface, and attaches to a basement membrane. These features support its protective and secretory functions.",
    rationaleIncorrect: [
      "Correct: epithelial tissue lines body surfaces and cavities.",
      "Epithelial tissue is avascular; it receives nutrients by diffusion from underlying connective tissue.",
      "Correct: epithelial cells are closely packed with little extracellular matrix.",
      "Correct: the apical surface is exposed to a cavity, lumen, or the exterior.",
      "Correct: the basal surface attaches to a basement membrane.",
      "Energy storage is a function of adipose (connective) tissue, not epithelial tissue."
    ],
    difficulty: 2,
    bloomLevel: "understanding",
    clinicalCorrelation: "Epithelial tissue forms protective barriers such as skin and mucous membranes. Nurses assess epithelial integrity when evaluating wound healing and monitoring for pressure injuries.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["epithelial tissue", "tissue types", "basement membrane", "apical surface", "avascular"],
    estimatedTimeSeconds: 60
  },
  {
    id: "anat-015",
    course: "anatomy",
    topic: "Cells and Tissues",
    subtopic: "Connective Tissue",
    stem: "Which type of connective tissue forms the framework of organs such as the spleen and lymph nodes?",
    options: ["Dense regular connective tissue", "Reticular connective tissue", "Adipose tissue", "Hyaline cartilage"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "Reticular connective tissue consists of fine reticular fibers that form a soft internal skeleton (stroma) supporting organs like the spleen, lymph nodes, and bone marrow. It provides structural support while allowing cell movement.",
    rationaleIncorrect: [
      "Dense regular connective tissue forms tendons and ligaments, not organ frameworks.",
      "Adipose tissue stores fat and provides insulation, not organ framework support.",
      "Hyaline cartilage provides flexible support for structures like the trachea and nose, not soft organ frameworks."
    ],
    difficulty: 2,
    bloomLevel: "recall",
    clinicalCorrelation: "Understanding reticular tissue helps nurses comprehend lymph node structure, which is relevant when assessing for lymphadenopathy in patients with infections or malignancies.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["connective tissue", "reticular tissue", "spleen", "lymph nodes"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-016",
    course: "anatomy",
    topic: "Cells and Tissues",
    subtopic: "Cell Division",
    stem: "During which phase of mitosis do chromosomes line up along the cell's equator?",
    options: ["Prophase", "Metaphase", "Anaphase", "Telophase"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "During metaphase, chromosomes align along the metaphase plate (cell equator). This alignment ensures each daughter cell will receive an identical set of chromosomes when the centromeres split during the subsequent anaphase.",
    rationaleIncorrect: [
      "During prophase, chromosomes condense and the spindle apparatus begins to form, but chromosomes are not yet aligned.",
      "During anaphase, sister chromatids separate and move toward opposite poles.",
      "During telophase, chromosomes decondense and nuclear envelopes reform around each set."
    ],
    difficulty: 2,
    bloomLevel: "recall",
    clinicalCorrelation: "Understanding mitosis is fundamental to understanding how chemotherapy drugs work, as many target specific phases of cell division to destroy rapidly dividing cancer cells.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["mitosis", "metaphase", "cell division", "chromosomes"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-017",
    course: "anatomy",
    topic: "Cells and Tissues",
    subtopic: "Muscle Tissue Types",
    stem: "Which tissue type is involuntary, striated, and found only in the heart?",
    options: ["Skeletal muscle tissue", "Smooth muscle tissue", "Cardiac muscle tissue", "Dense connective tissue"],
    correctAnswer: 2,
    type: "mcq",
    rationaleCorrect: "Cardiac muscle tissue is unique in being both involuntary and striated. It is found exclusively in the heart and features intercalated discs that allow synchronized contraction.",
    rationaleIncorrect: [
      "Skeletal muscle tissue is striated but voluntary, not involuntary.",
      "Smooth muscle tissue is involuntary but non-striated (lacks visible striations).",
      "Dense connective tissue is not a muscle tissue type."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Cardiac muscle's involuntary, rhythmic contractions are essential for maintaining circulation. Damage to cardiac muscle from myocardial infarction leads to permanent loss of contractile function.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["muscle tissue", "cardiac muscle", "involuntary", "striated", "intercalated discs"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-018",
    course: "anatomy",
    topic: "Cells and Tissues",
    subtopic: "Osmosis",
    stem: "A red blood cell placed in a hypotonic solution will:",
    options: ["Crenate (shrink)", "Swell and possibly lyse", "Remain unchanged", "Become rigid and inflexible"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "In a hypotonic solution, the solute concentration outside the cell is lower than inside. Water moves into the cell by osmosis, causing it to swell and potentially lyse (hemolysis). This is due to the osmotic gradient driving water toward higher solute concentration.",
    rationaleIncorrect: [
      "Crenation occurs in a hypertonic solution, where water leaves the cell.",
      "The cell would not remain unchanged because water follows osmotic gradients.",
      "Rigidity is not the response to a hypotonic environment; swelling and lysis occur."
    ],
    difficulty: 2,
    bloomLevel: "application",
    clinicalCorrelation: "Nurses must understand tonicity when administering IV fluids. Infusing a hypotonic solution too rapidly can cause red blood cell hemolysis and dangerous electrolyte shifts.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["osmosis", "tonicity", "hypotonic", "hemolysis", "IV fluids"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-019",
    course: "anatomy",
    topic: "Cells and Tissues",
    subtopic: "Epithelial Classification",
    stem: "Simple squamous epithelium is found lining which of the following structures?",
    options: ["Urinary bladder", "Trachea", "Blood vessels (endothelium)", "Skin surface"],
    correctAnswer: 2,
    type: "mcq",
    rationaleCorrect: "Simple squamous epithelium forms the endothelium lining blood vessels and the mesothelium lining body cavities. Its thin, flat single layer allows rapid diffusion and filtration.",
    rationaleIncorrect: [
      "The urinary bladder is lined by transitional epithelium, which stretches to accommodate urine.",
      "The trachea is lined by pseudostratified ciliated columnar epithelium.",
      "The skin surface is covered by stratified squamous keratinized epithelium for protection."
    ],
    difficulty: 2,
    bloomLevel: "understanding",
    clinicalCorrelation: "The thin endothelial lining of blood vessels facilitates gas and nutrient exchange. Endothelial damage from atherosclerosis is a key factor in cardiovascular disease.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["epithelial tissue", "simple squamous", "endothelium", "blood vessels"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-020",
    course: "anatomy",
    topic: "Cells and Tissues",
    subtopic: "Tissue Repair",
    stem: "Which type of tissue repair results in scar formation rather than restoration of original tissue?",
    options: ["Regeneration", "Fibrosis", "Hypertrophy", "Hyperplasia"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "Fibrosis is the replacement of damaged tissue with scar tissue (collagen-rich connective tissue). Unlike regeneration, fibrosis does not restore original tissue function. It occurs when damage is extensive or the tissue has limited regenerative capacity.",
    rationaleIncorrect: [
      "Regeneration replaces damaged cells with identical cells, restoring original function.",
      "Hypertrophy is an increase in cell size, not a repair mechanism involving scar formation.",
      "Hyperplasia is an increase in cell number, not scar-mediated repair."
    ],
    difficulty: 2,
    bloomLevel: "understanding",
    clinicalCorrelation: "Nurses assess wound healing and recognize that extensive fibrosis, such as in liver cirrhosis or post-MI cardiac scarring, results in permanent loss of tissue function.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["tissue repair", "fibrosis", "scar tissue", "wound healing"],
    estimatedTimeSeconds: 45
  },

  // ===== INTEGUMENTARY SYSTEM (8 questions: anat-021 to anat-028) =====
  {
    id: "anat-021",
    course: "anatomy",
    topic: "Integumentary System",
    subtopic: "Skin Layers",
    stem: "Which layer of the skin contains blood vessels, nerve endings, hair follicles, and sweat glands?",
    options: ["Epidermis", "Dermis", "Hypodermis (subcutaneous layer)", "Stratum corneum"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The dermis is the deeper layer of the skin that contains blood vessels, lymphatic vessels, nerves, hair follicles, sebaceous glands, and sweat glands. It provides structural support through collagen and elastic fibers.",
    rationaleIncorrect: [
      "The epidermis is avascular and composed mainly of keratinocytes in stratified layers.",
      "The hypodermis lies beneath the dermis and contains mainly adipose tissue for insulation, though it is not considered a true skin layer.",
      "The stratum corneum is the outermost sublayer of the epidermis, consisting of dead keratinized cells."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "When performing wound assessments, nurses must determine wound depth. A wound extending into the dermis will bleed because it contains blood vessels, unlike superficial epidermal injuries.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["skin layers", "dermis", "integumentary system", "wound assessment"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-022",
    course: "anatomy",
    topic: "Integumentary System",
    subtopic: "Epidermis",
    stem: "The protein that makes the epidermis waterproof and resistant to abrasion is:",
    options: ["Collagen", "Elastin", "Keratin", "Melanin"],
    correctAnswer: 2,
    type: "mcq",
    rationaleCorrect: "Keratin is a tough, fibrous protein produced by keratinocytes in the epidermis. It provides waterproofing and abrasion resistance. The outermost layer (stratum corneum) consists of dead cells filled with keratin.",
    rationaleIncorrect: [
      "Collagen provides tensile strength to the dermis, not waterproofing of the epidermis.",
      "Elastin provides elasticity to the dermis, allowing skin to stretch and recoil.",
      "Melanin is a pigment that protects against UV radiation damage, not a structural waterproofing protein."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Keratin's protective function is compromised in burn patients. Loss of the keratinized barrier increases risk for infection, fluid loss, and hypothermia.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["keratin", "epidermis", "skin protection", "integumentary"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-023",
    course: "anatomy",
    topic: "Integumentary System",
    subtopic: "Skin Functions",
    stem: "Which of the following are functions of the integumentary system? (Select all that apply)",
    options: [
      "Protection against pathogens and physical trauma",
      "Production of red blood cells",
      "Thermoregulation through sweat glands and blood vessel dilation",
      "Synthesis of vitamin D upon UV exposure",
      "Sensation through cutaneous receptors",
      "Filtration of blood plasma"
    ],
    correctAnswers: [0, 2, 3, 4],
    type: "sata",
    rationaleCorrect: "The integumentary system provides protection, thermoregulation via sweat and vasodilation, vitamin D synthesis through UV-activated conversion in the skin, and sensation through various cutaneous receptors including pain, pressure, and temperature.",
    rationaleIncorrect: [
      "Correct: skin serves as a physical and chemical barrier against pathogens.",
      "Red blood cell production (hematopoiesis) occurs in red bone marrow, not the integumentary system.",
      "Correct: sweating and blood vessel changes regulate body temperature.",
      "Correct: UV light converts 7-dehydrocholesterol in skin to previtamin D3.",
      "Correct: cutaneous receptors detect touch, pressure, temperature, and pain.",
      "Blood plasma filtration is a function of the kidneys, not the integumentary system."
    ],
    difficulty: 2,
    bloomLevel: "understanding",
    clinicalCorrelation: "Nurses monitor skin integrity and function. Loss of skin from burns compromises all these functions, requiring careful management of temperature, infection risk, and fluid balance.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["skin functions", "thermoregulation", "vitamin D", "sensation", "protection"],
    estimatedTimeSeconds: 60
  },
  {
    id: "anat-024",
    course: "anatomy",
    topic: "Integumentary System",
    subtopic: "Glands",
    stem: "Eccrine sweat glands are most abundant in which area of the body?",
    options: ["Axillae (armpits)", "Palms of the hands and soles of the feet", "Groin region", "Scalp"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "Eccrine sweat glands are distributed over most of the body surface but are most concentrated on the palms, soles, and forehead. They produce a watery sweat that is important for thermoregulation.",
    rationaleIncorrect: [
      "The axillae contain primarily apocrine sweat glands, which produce a thicker secretion associated with body odor.",
      "The groin also has a higher concentration of apocrine glands rather than eccrine glands.",
      "While eccrine glands are present on the scalp, they are most abundant on the palms and soles."
    ],
    difficulty: 2,
    bloomLevel: "recall",
    clinicalCorrelation: "Nurses observe diaphoresis (excessive sweating) on the palms and forehead as an early sign of sympathetic nervous system activation, which can indicate pain, anxiety, or cardiac distress.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["eccrine glands", "sweat glands", "thermoregulation", "integumentary"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-025",
    course: "anatomy",
    topic: "Integumentary System",
    subtopic: "Skin Color",
    stem: "Cyanosis, a bluish discoloration of the skin, results from:",
    options: [
      "Excess melanin production",
      "Elevated bilirubin levels in the blood",
      "Increased deoxyhemoglobin in dermal blood vessels",
      "Dilation of superficial arterioles"
    ],
    correctAnswer: 2,
    type: "mcq",
    rationaleCorrect: "Cyanosis occurs when there is an increased amount of deoxyhemoglobin (hemoglobin not bound to oxygen) in the blood vessels of the dermis. This gives the skin, lips, and nail beds a bluish appearance. It indicates inadequate oxygenation.",
    rationaleIncorrect: [
      "Excess melanin causes darkening of the skin (hyperpigmentation), not cyanosis.",
      "Elevated bilirubin causes jaundice (yellow discoloration), not cyanosis.",
      "Dilation of superficial arterioles causes erythema (redness), not cyanosis."
    ],
    difficulty: 2,
    bloomLevel: "application",
    clinicalCorrelation: "Nurses assess for cyanosis in the lips, nail beds, and earlobes as a sign of hypoxemia. In dark-skinned patients, cyanosis may be best assessed in the oral mucosa and conjunctiva.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["cyanosis", "skin color", "deoxyhemoglobin", "oxygenation", "assessment"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-026",
    course: "anatomy",
    topic: "Integumentary System",
    subtopic: "Burns Classification",
    stem: "A burn that destroys the epidermis and part of the dermis, presenting with blisters and pain, is classified as:",
    options: ["Superficial (first-degree) burn", "Superficial partial-thickness (second-degree) burn", "Full-thickness (third-degree) burn", "Deep partial-thickness burn extending to subcutaneous tissue"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "A superficial partial-thickness (second-degree) burn involves the epidermis and part of the dermis. It characteristically presents with blisters, redness, edema, and significant pain due to exposed nerve endings in the dermis.",
    rationaleIncorrect: [
      "Superficial (first-degree) burns affect only the epidermis, causing redness and pain but no blisters.",
      "Full-thickness (third-degree) burns destroy the entire epidermis and dermis, appearing white, brown, or charred, with no pain due to nerve destruction.",
      "Burns extending to subcutaneous tissue would be classified as fourth-degree, involving structures beyond the dermis."
    ],
    difficulty: 2,
    bloomLevel: "application",
    clinicalCorrelation: "Nurses classify burns by depth to guide treatment decisions. Second-degree burns require careful wound care and pain management because intact nerve endings in the remaining dermis cause significant discomfort.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["burns", "burn classification", "partial thickness", "wound care"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-027",
    course: "anatomy",
    topic: "Integumentary System",
    subtopic: "Hair and Nails",
    stem: "The visible part of a hair above the skin surface is called the:",
    options: ["Hair root", "Hair shaft", "Hair follicle", "Hair bulb"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The hair shaft is the visible portion of the hair that projects above the skin surface. It is composed of dead, keratinized cells. The root is the portion below the surface within the follicle.",
    rationaleIncorrect: [
      "The hair root is the portion embedded within the skin, surrounded by the follicle.",
      "The hair follicle is the sheath of epidermis and dermis that surrounds the hair root.",
      "The hair bulb is the expanded base of the root where hair growth occurs."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Nurses assess hair condition as part of the integumentary assessment. Brittle, dry hair shafts can indicate nutritional deficiencies or thyroid disorders.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["hair structure", "hair shaft", "integumentary", "assessment"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-028",
    course: "anatomy",
    topic: "Integumentary System",
    subtopic: "Wound Healing",
    stem: "On a diagram of the skin layers, identify the layer where melanocytes are primarily located.",
    options: ["Stratum corneum", "Stratum basale (stratum germinativum)", "Papillary dermis", "Reticular dermis"],
    correctAnswer: 1,
    type: "hot-spot",
    rationaleCorrect: "Melanocytes are located primarily in the stratum basale (also called stratum germinativum), the deepest layer of the epidermis. They produce melanin, which is transferred to surrounding keratinocytes to protect against UV damage.",
    rationaleIncorrect: [
      "The stratum corneum contains only dead, flattened keratinized cells; melanocytes are not found here.",
      "The papillary dermis is the superficial layer of the dermis containing capillaries and Meissner's corpuscles, not melanocytes.",
      "The reticular dermis is the deeper dermal layer with dense connective tissue; melanocytes reside in the epidermis."
    ],
    difficulty: 2,
    bloomLevel: "application",
    clinicalCorrelation: "Understanding melanocyte location helps nurses recognize that melanoma arises from the stratum basale. Assessing moles using the ABCDE criteria is part of skin cancer screening.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["melanocytes", "stratum basale", "skin layers", "melanoma", "UV protection"],
    estimatedTimeSeconds: 45
  },

  // ===== SKELETAL SYSTEM (12 questions: anat-029 to anat-040) =====
  {
    id: "anat-029",
    course: "anatomy",
    topic: "Skeletal System",
    subtopic: "Bone Classification",
    stem: "The femur is classified as which type of bone?",
    options: ["Short bone", "Flat bone", "Long bone", "Irregular bone"],
    correctAnswer: 2,
    type: "mcq",
    rationaleCorrect: "The femur is classified as a long bone. Long bones are longer than they are wide and consist of a shaft (diaphysis) and two ends (epiphyses). Other examples include the humerus, tibia, and fibula.",
    rationaleIncorrect: [
      "Short bones are roughly cube-shaped, like the carpals and tarsals.",
      "Flat bones are thin, flattened, and slightly curved, such as the sternum and skull bones.",
      "Irregular bones have complex shapes, such as vertebrae and facial bones."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "The femur is the longest and strongest bone in the body. Femur fractures, common in elderly patients from falls, can result in significant blood loss and fat embolism.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["bone classification", "long bones", "femur", "skeletal system"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-030",
    course: "anatomy",
    topic: "Skeletal System",
    subtopic: "Bone Structure",
    stem: "The diaphysis of a long bone is composed primarily of:",
    options: ["Spongy (cancellous) bone", "Compact (cortical) bone", "Hyaline cartilage", "Fibrocartilage"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The diaphysis (shaft) of a long bone is composed primarily of compact (cortical) bone, which provides strength and rigidity. It surrounds a medullary cavity that contains yellow bone marrow in adults.",
    rationaleIncorrect: [
      "Spongy (cancellous) bone is found mainly in the epiphyses (ends) of long bones.",
      "Hyaline cartilage covers the articular surfaces at the epiphyses, not the diaphysis.",
      "Fibrocartilage is found in structures like intervertebral discs and the menisci, not the bone shaft."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Understanding bone structure helps nurses recognize that fractures of the diaphysis (shaft fractures) heal differently from fractures near the epiphysis, particularly in growing children.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["bone structure", "diaphysis", "compact bone", "cortical bone"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-031",
    course: "anatomy",
    topic: "Skeletal System",
    subtopic: "Bone Cells",
    stem: "Which bone cell is responsible for breaking down bone tissue during remodeling?",
    options: ["Osteoblast", "Osteocyte", "Osteoclast", "Osteoprogenitor cell"],
    correctAnswer: 2,
    type: "mcq",
    rationaleCorrect: "Osteoclasts are large, multinucleated cells that break down (resorb) bone tissue by secreting acids and enzymes. They are essential for bone remodeling, calcium homeostasis, and repair.",
    rationaleIncorrect: [
      "Osteoblasts are bone-building cells that synthesize and deposit new bone matrix.",
      "Osteocytes are mature bone cells trapped in lacunae that maintain bone tissue and sense mechanical stress.",
      "Osteoprogenitor cells are stem cells that differentiate into osteoblasts."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Excessive osteoclast activity leads to osteoporosis. Bisphosphonate medications prescribed for osteoporosis work by inhibiting osteoclast activity to preserve bone density.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["bone cells", "osteoclast", "bone remodeling", "osteoporosis"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-032",
    course: "anatomy",
    topic: "Skeletal System",
    subtopic: "Axial Skeleton",
    stem: "How many vertebrae make up the cervical region of the vertebral column?",
    options: ["5", "7", "12", "4"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "There are 7 cervical vertebrae (C1-C7) in the neck region. The first cervical vertebra (C1) is the atlas, which supports the skull, and C2 is the axis, which allows head rotation.",
    rationaleIncorrect: [
      "There are 5 lumbar vertebrae, not 5 cervical vertebrae.",
      "There are 12 thoracic vertebrae, not 12 cervical vertebrae.",
      "There are 4 fused coccygeal vertebrae, not 4 cervical vertebrae."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Cervical spine injuries, particularly at C3-C5, can impair diaphragm function and breathing. Nurses must maintain cervical spine stabilization in trauma patients until injury is ruled out.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["vertebral column", "cervical vertebrae", "axial skeleton", "spinal injury"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-033",
    course: "anatomy",
    topic: "Skeletal System",
    subtopic: "Joints",
    stem: "A synovial joint is characterized by which of the following features?",
    options: [
      "Bones are joined by cartilage with no joint cavity",
      "A fibrous joint capsule enclosing a synovial cavity with fluid",
      "Bones are connected by dense fibrous tissue",
      "Bones are fused together with no movement"
    ],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "Synovial joints have a joint capsule that encloses a synovial cavity containing synovial fluid. The fluid lubricates the joint and nourishes articular cartilage. These joints are freely movable (diarthroses) and include the knee, hip, and shoulder.",
    rationaleIncorrect: [
      "Cartilaginous joints (amphiarthroses) are joined by cartilage without a joint cavity.",
      "Fibrous joints are connected by dense fibrous tissue, such as skull sutures.",
      "Fused bones with no movement describe synostoses, which are not synovial joints."
    ],
    difficulty: 1,
    bloomLevel: "understanding",
    clinicalCorrelation: "Synovial joints can be affected by arthritis and joint effusion. Nurses assess for swelling, redness, warmth, and decreased range of motion when evaluating joint health.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["synovial joints", "joint types", "synovial fluid", "joint capsule"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-034",
    course: "anatomy",
    topic: "Skeletal System",
    subtopic: "Fracture Types",
    stem: "A fracture in which the bone breaks into multiple fragments is called a:",
    options: ["Greenstick fracture", "Comminuted fracture", "Transverse fracture", "Spiral fracture"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "A comminuted fracture occurs when the bone shatters into three or more fragments. This type is more common in the elderly due to osteoporosis and often requires surgical intervention for repair.",
    rationaleIncorrect: [
      "A greenstick fracture is an incomplete fracture common in children where the bone bends but only partially breaks.",
      "A transverse fracture occurs straight across the bone shaft, perpendicular to the long axis.",
      "A spiral fracture wraps around the bone, typically caused by a twisting force."
    ],
    difficulty: 2,
    bloomLevel: "understanding",
    clinicalCorrelation: "Nurses caring for patients with comminuted fractures monitor for complications including compartment syndrome, fat embolism, and neurovascular compromise distal to the fracture site.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["fractures", "comminuted fracture", "bone injury", "orthopedic"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-035",
    course: "anatomy",
    topic: "Skeletal System",
    subtopic: "Bone Formation",
    stem: "Arrange the stages of intramembranous ossification in the correct order.",
    options: [
      "Osteoblasts cluster within the mesenchyme and begin secreting osteoid",
      "An ossification center develops within the fibrous membrane",
      "Osteoid calcifies and traps osteoblasts, which become osteocytes",
      "Compact bone forms on the surface, creating periosteum"
    ],
    correctOrder: [1, 0, 2, 3],
    type: "ordered",
    rationaleCorrect: "Intramembranous ossification proceeds as follows: first, an ossification center develops in the fibrous membrane; then osteoblasts cluster and secrete osteoid; the osteoid calcifies, trapping osteoblasts as osteocytes; finally, compact bone replaces surface layers and periosteum forms.",
    rationaleIncorrect: [
      "Osteoblast clustering occurs after the ossification center develops.",
      "Development of the ossification center is the first step.",
      "Calcification and osteocyte formation follow osteoid secretion.",
      "Compact bone and periosteum formation is the final stage."
    ],
    difficulty: 3,
    bloomLevel: "understanding",
    clinicalCorrelation: "Understanding ossification is relevant to nursing care of premature infants whose skull bones are incompletely ossified, requiring careful handling to protect fontanelles.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["ossification", "intramembranous", "bone formation", "osteoblasts"],
    estimatedTimeSeconds: 75
  },
  {
    id: "anat-036",
    course: "anatomy",
    topic: "Skeletal System",
    subtopic: "Appendicular Skeleton",
    stem: "Which of the following bones is part of the appendicular skeleton?",
    options: ["Sternum", "Ribs", "Scapula", "Vertebrae"],
    correctAnswer: 2,
    type: "mcq",
    rationaleCorrect: "The scapula (shoulder blade) is part of the appendicular skeleton, which includes the bones of the upper and lower limbs and their girdles (pectoral and pelvic). The scapula forms part of the pectoral girdle.",
    rationaleIncorrect: [
      "The sternum is part of the axial skeleton.",
      "The ribs are part of the axial skeleton.",
      "The vertebrae are part of the axial skeleton."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Shoulder injuries involving the scapula or its articulations are common. Nurses assess for limited range of motion and pain when caring for patients with shoulder fractures or dislocations.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["appendicular skeleton", "scapula", "pectoral girdle", "skeletal divisions"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-037",
    course: "anatomy",
    topic: "Skeletal System",
    subtopic: "Bone Markings",
    stem: "A foramen in a bone is best described as:",
    options: [
      "A smooth, flat articular surface",
      "A rounded opening through which blood vessels or nerves pass",
      "A sharp, slender projection for muscle attachment",
      "A shallow depression on the bone surface"
    ],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "A foramen is a rounded opening or hole in a bone through which blood vessels, nerves, or ligaments pass. The foramen magnum at the base of the skull is the largest example, allowing passage of the spinal cord.",
    rationaleIncorrect: [
      "A smooth, flat articular surface describes a facet.",
      "A sharp, slender projection describes a spine or spinous process.",
      "A shallow depression describes a fossa."
    ],
    difficulty: 2,
    bloomLevel: "recall",
    clinicalCorrelation: "Knowledge of foramina is important for understanding cranial nerve pathways. For example, the optic nerve passes through the optic foramen, relevant to assessments of pupil reactivity.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["bone markings", "foramen", "skeletal features", "bone anatomy"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-038",
    course: "anatomy",
    topic: "Skeletal System",
    subtopic: "Calcium Homeostasis",
    stem: "Which hormone stimulates osteoclast activity to release calcium from bone into the blood?",
    options: ["Calcitonin", "Parathyroid hormone (PTH)", "Insulin", "Cortisol"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "Parathyroid hormone (PTH) is released by the parathyroid glands when blood calcium levels are low. PTH stimulates osteoclast activity to break down bone and release calcium into the blood, raising serum calcium levels.",
    rationaleIncorrect: [
      "Calcitonin, produced by the thyroid gland, inhibits osteoclast activity and lowers blood calcium - the opposite effect of PTH.",
      "Insulin regulates blood glucose levels, not calcium homeostasis.",
      "Cortisol is a stress hormone that can indirectly affect bone density but does not directly stimulate osteoclasts for calcium release."
    ],
    difficulty: 2,
    bloomLevel: "understanding",
    clinicalCorrelation: "Hyperparathyroidism causes excessive PTH secretion, leading to bone loss and hypercalcemia. Nurses monitor serum calcium levels and assess for signs such as muscle weakness and kidney stones.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["calcium homeostasis", "PTH", "osteoclasts", "parathyroid", "bone resorption"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-039",
    course: "anatomy",
    topic: "Skeletal System",
    subtopic: "Skull",
    stem: "On a diagram of the skull, identify the bone that forms the forehead.",
    options: ["Frontal bone", "Parietal bone", "Occipital bone", "Temporal bone"],
    correctAnswer: 0,
    type: "hot-spot",
    rationaleCorrect: "The frontal bone forms the forehead, the superior portion of the orbits (eye sockets), and the anterior part of the cranial floor. It articulates with the parietal bones at the coronal suture.",
    rationaleIncorrect: [
      "The parietal bones form the superior and lateral walls of the cranium, not the forehead.",
      "The occipital bone forms the posterior and inferior portion of the cranium.",
      "The temporal bones form the lateral walls of the cranium below the parietal bones."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Frontal bone fractures can result from head trauma. Nurses performing neurological assessments palpate the skull for depressions or irregularities that may indicate fractures.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["skull bones", "frontal bone", "cranium", "head trauma"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-040",
    course: "anatomy",
    topic: "Skeletal System",
    subtopic: "Pelvic Girdle",
    stem: "Which of the following correctly describes a difference between the male and female pelvis?",
    options: [
      "The female pelvis has a narrower pelvic inlet than the male pelvis",
      "The female pelvis is wider and shallower with a larger pelvic outlet",
      "The male pelvis has a wider pubic arch greater than 90 degrees",
      "The male pelvis is lighter and more adapted for childbirth"
    ],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The female pelvis is wider, shallower, and has a larger pelvic outlet to accommodate childbirth. The pubic arch in females is typically greater than 90 degrees, compared to less than 90 degrees in males.",
    rationaleIncorrect: [
      "The female pelvis has a wider pelvic inlet, not narrower, to facilitate passage of the fetal head.",
      "The male pelvis has a narrower pubic arch (less than 90 degrees), not wider.",
      "The female pelvis is adapted for childbirth; the male pelvis is heavier and more suited for weight-bearing."
    ],
    difficulty: 2,
    bloomLevel: "understanding",
    clinicalCorrelation: "Obstetric nurses assess pelvic dimensions during prenatal care. A narrow pelvic outlet (android pelvis) may complicate vaginal delivery and necessitate cesarean section.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["pelvic girdle", "male vs female pelvis", "obstetrics", "pelvic anatomy"],
    estimatedTimeSeconds: 45
  },

  // ===== MUSCULAR SYSTEM (12 questions: anat-041 to anat-052) =====
  {
    id: "anat-041",
    course: "anatomy",
    topic: "Muscular System",
    subtopic: "Muscle Types",
    stem: "Which type of muscle is under voluntary control and attached to bones?",
    options: ["Cardiac muscle", "Smooth muscle", "Skeletal muscle", "Visceral muscle"],
    correctAnswer: 2,
    type: "mcq",
    rationaleCorrect: "Skeletal muscle is the only type of muscle tissue under voluntary (conscious) control. It is attached to bones by tendons and produces movement of the skeleton when it contracts.",
    rationaleIncorrect: [
      "Cardiac muscle is involuntary and found only in the heart wall.",
      "Smooth muscle is involuntary and found in the walls of hollow organs and blood vessels.",
      "Visceral muscle is another name for smooth muscle, which is involuntary."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Nurses assess voluntary skeletal muscle function when performing motor strength testing and evaluating patients for conditions such as muscular dystrophy or stroke-related weakness.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["muscle types", "skeletal muscle", "voluntary movement", "motor function"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-042",
    course: "anatomy",
    topic: "Muscular System",
    subtopic: "Muscle Contraction",
    stem: "According to the sliding filament theory, which protein filaments slide past each other during muscle contraction?",
    options: ["Collagen and elastin", "Actin and myosin", "Keratin and fibrin", "Troponin and tropomyosin"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The sliding filament theory states that during muscle contraction, thin filaments (actin) slide over thick filaments (myosin), shortening the sarcomere. The myosin heads form cross-bridges with actin, pulling the thin filaments inward.",
    rationaleIncorrect: [
      "Collagen and elastin are connective tissue proteins, not contractile filaments.",
      "Keratin is a structural protein in skin and hair; fibrin is involved in blood clotting.",
      "Troponin and tropomyosin are regulatory proteins on actin that control contraction but do not themselves slide."
    ],
    difficulty: 1,
    bloomLevel: "understanding",
    clinicalCorrelation: "Understanding muscle contraction at the molecular level helps explain how neuromuscular blocking agents used during surgery prevent actin-myosin interaction to achieve muscle paralysis.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["sliding filament theory", "actin", "myosin", "muscle contraction", "sarcomere"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-043",
    course: "anatomy",
    topic: "Muscular System",
    subtopic: "Muscle Terminology",
    stem: "The origin of a muscle refers to:",
    options: [
      "The movable attachment point of the muscle",
      "The stationary attachment point of the muscle",
      "The middle, fleshy portion of the muscle",
      "The nerve that stimulates the muscle"
    ],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The origin of a muscle is its stationary (fixed) attachment point, usually on the more proximal or stable bone. During contraction, the insertion (movable end) is pulled toward the origin.",
    rationaleIncorrect: [
      "The movable attachment point is called the insertion.",
      "The middle, fleshy portion is called the belly of the muscle.",
      "The nerve that stimulates a muscle is called a motor nerve or the muscle's innervation."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Understanding muscle origins and insertions helps nurses assess functional deficits after injuries. For example, a rotator cuff tear affects the insertion of muscles on the humerus.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["muscle terminology", "origin", "insertion", "muscle attachment"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-044",
    course: "anatomy",
    topic: "Muscular System",
    subtopic: "Major Muscles",
    stem: "The diaphragm is the primary muscle responsible for:",
    options: ["Flexing the hip", "Breathing (inspiration)", "Swallowing food", "Maintaining posture"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The diaphragm is the dome-shaped muscle that separates the thoracic and abdominal cavities. It is the primary muscle of inspiration. When it contracts, it flattens and increases thoracic volume, drawing air into the lungs.",
    rationaleIncorrect: [
      "Hip flexion is primarily performed by the iliopsoas muscle.",
      "Swallowing involves muscles of the pharynx and esophagus, not the diaphragm.",
      "Postural muscles include the erector spinae and core muscles, not primarily the diaphragm."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Spinal cord injuries above C3-C5 can paralyze the diaphragm (innervated by the phrenic nerve), requiring mechanical ventilation. Nurses monitor respiratory function in spinal cord injury patients.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["diaphragm", "respiration", "breathing", "phrenic nerve", "inspiration"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-045",
    course: "anatomy",
    topic: "Muscular System",
    subtopic: "Neuromuscular Junction",
    stem: "Which neurotransmitter is released at the neuromuscular junction to stimulate skeletal muscle contraction?",
    options: ["Norepinephrine", "Dopamine", "Acetylcholine (ACh)", "Serotonin"],
    correctAnswer: 2,
    type: "mcq",
    rationaleCorrect: "Acetylcholine (ACh) is the neurotransmitter released by motor neurons at the neuromuscular junction. It binds to receptors on the muscle fiber's motor end plate, triggering depolarization and ultimately muscle contraction.",
    rationaleIncorrect: [
      "Norepinephrine is a neurotransmitter of the sympathetic nervous system, not the neuromuscular junction.",
      "Dopamine functions primarily in the brain and is not the neurotransmitter at the neuromuscular junction.",
      "Serotonin is primarily involved in mood regulation and GI motility, not skeletal muscle contraction."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Myasthenia gravis involves autoantibodies that destroy ACh receptors at the neuromuscular junction, causing progressive muscle weakness. Anticholinesterase medications help by increasing ACh availability.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["neuromuscular junction", "acetylcholine", "motor neuron", "muscle contraction"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-046",
    course: "anatomy",
    topic: "Muscular System",
    subtopic: "Muscle Actions",
    stem: "A muscle that assists the prime mover (agonist) in performing an action is called a:",
    options: ["Antagonist", "Synergist", "Fixator", "Flexor"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "A synergist is a muscle that assists the prime mover (agonist) by adding force or reducing unnecessary movement. Synergists stabilize joints and help produce smooth, coordinated movements.",
    rationaleIncorrect: [
      "An antagonist opposes the action of the prime mover.",
      "A fixator stabilizes the origin of the prime mover but does not directly assist the movement.",
      "Flexor describes a type of action (flexion), not the functional relationship between muscles."
    ],
    difficulty: 2,
    bloomLevel: "understanding",
    clinicalCorrelation: "Understanding muscle group roles helps nurses with rehabilitation exercises. When a prime mover is injured, synergist muscles may compensate, and physical therapy targets these relationships.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["synergist", "agonist", "muscle actions", "muscle roles"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-047",
    course: "anatomy",
    topic: "Muscular System",
    subtopic: "Muscle Energy",
    stem: "Which of the following energy sources does skeletal muscle use first during brief, intense activity?",
    options: ["Fatty acids via aerobic metabolism", "Creatine phosphate", "Blood glucose via glycolysis", "Muscle glycogen via aerobic respiration"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "Creatine phosphate is the first and fastest energy source used during brief, intense activity (first 10-15 seconds). It donates its phosphate group directly to ADP to regenerate ATP without requiring oxygen.",
    rationaleIncorrect: [
      "Fatty acid metabolism is a slow, aerobic process used during prolonged, low-intensity activity.",
      "Blood glucose via glycolysis becomes a primary source after creatine phosphate is depleted.",
      "Aerobic respiration of glycogen is used for sustained moderate activity, not the initial burst."
    ],
    difficulty: 2,
    bloomLevel: "understanding",
    clinicalCorrelation: "Understanding muscle energy systems helps nurses educate patients on exercise physiology and recognize rhabdomyolysis, where excessive muscle breakdown releases myoglobin that can damage the kidneys.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["creatine phosphate", "muscle energy", "ATP", "exercise physiology"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-048",
    course: "anatomy",
    topic: "Muscular System",
    subtopic: "Major Muscles",
    stem: "Which of the following muscles are involved in inspiration? (Select all that apply)",
    options: [
      "Diaphragm",
      "External intercostals",
      "Internal intercostals",
      "Sternocleidomastoid (accessory muscle)",
      "Rectus abdominis"
    ],
    correctAnswers: [0, 1, 3],
    type: "sata",
    rationaleCorrect: "The diaphragm is the primary muscle of inspiration. External intercostals elevate the ribs to increase thoracic volume during normal inspiration. The sternocleidomastoid is an accessory muscle recruited during forced or labored inspiration.",
    rationaleIncorrect: [
      "Correct: the diaphragm is the primary inspiratory muscle.",
      "Correct: external intercostals elevate the ribs during inspiration.",
      "Internal intercostals depress the ribs and assist with forced expiration, not inspiration.",
      "Correct: the sternocleidomastoid is an accessory inspiratory muscle used during labored breathing.",
      "The rectus abdominis compresses the abdomen to assist with forced expiration, not inspiration."
    ],
    difficulty: 2,
    bloomLevel: "application",
    clinicalCorrelation: "Nurses assess for use of accessory muscles (sternocleidomastoid, scalenes) during breathing as a sign of respiratory distress. This is an important finding in patients with COPD or asthma exacerbations.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["muscles of respiration", "diaphragm", "intercostals", "accessory muscles", "respiratory assessment"],
    estimatedTimeSeconds: 60
  },
  {
    id: "anat-049",
    course: "anatomy",
    topic: "Muscular System",
    subtopic: "Muscle Fiber Types",
    stem: "Slow-twitch (Type I) muscle fibers are best suited for:",
    options: [
      "Short bursts of powerful, explosive activity",
      "Sustained, endurance-type activities",
      "Rapid movements requiring large force production",
      "Activities performed only during sleep"
    ],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "Slow-twitch (Type I) muscle fibers are fatigue-resistant and well-suited for sustained, endurance activities such as maintaining posture and long-distance running. They contain abundant mitochondria and rely on aerobic metabolism.",
    rationaleIncorrect: [
      "Short, powerful bursts are performed by fast-twitch (Type II) fibers.",
      "Rapid, high-force movements are characteristic of Type IIb (fast glycolytic) fibers.",
      "Muscle fibers are not specific to sleep; postural muscles use Type I fibers continuously."
    ],
    difficulty: 2,
    bloomLevel: "understanding",
    clinicalCorrelation: "Understanding fiber types helps nurses counsel patients on exercise. Postural muscles are predominantly Type I, which is why prolonged bedrest leads to significant muscle atrophy and weakness.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["muscle fiber types", "slow-twitch", "Type I", "endurance", "aerobic"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-050",
    course: "anatomy",
    topic: "Muscular System",
    subtopic: "Muscle Naming",
    stem: "The 'biceps' in biceps brachii refers to:",
    options: [
      "The location of the muscle on the arm",
      "The action of the muscle",
      "The number of origins (two heads)",
      "The shape of the muscle"
    ],
    correctAnswer: 2,
    type: "mcq",
    rationaleCorrect: "The prefix 'bi-' means two, and '-ceps' means heads. The biceps brachii has two heads (origins): the short head and long head. Muscle naming conventions often reference the number of origins, location, action, or shape.",
    rationaleIncorrect: [
      "'Brachii' refers to the arm location, but 'biceps' specifically indicates the number of heads.",
      "The action of the biceps brachii is flexion and supination, but the name 'biceps' refers to its two origins.",
      "Muscles named by shape include the deltoid (triangular) and trapezius (trapezoid)."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Understanding muscle naming conventions helps nurses communicate about injection sites accurately. The deltoid, named for its triangular shape, is a common intramuscular injection site.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["muscle naming", "biceps brachii", "muscle origins", "muscle heads"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-051",
    course: "anatomy",
    topic: "Muscular System",
    subtopic: "Smooth Muscle",
    stem: "Which characteristic distinguishes smooth muscle from skeletal muscle?",
    options: [
      "Smooth muscle has striations visible under microscopy",
      "Smooth muscle is multinucleated",
      "Smooth muscle contracts involuntarily and lacks visible striations",
      "Smooth muscle attaches to bones via tendons"
    ],
    correctAnswer: 2,
    type: "mcq",
    rationaleCorrect: "Smooth muscle is involuntary and lacks the visible striations seen in skeletal and cardiac muscle. It is found in the walls of hollow organs (stomach, intestines, blood vessels, bladder) and is controlled by the autonomic nervous system.",
    rationaleIncorrect: [
      "Smooth muscle does not have visible striations; skeletal and cardiac muscle do.",
      "Smooth muscle cells are uninucleated (single nucleus); skeletal muscle fibers are multinucleated.",
      "Smooth muscle is found in organ walls, not attached to bones."
    ],
    difficulty: 1,
    bloomLevel: "understanding",
    clinicalCorrelation: "Smooth muscle in blood vessel walls controls vasoconstriction and vasodilation, which directly affects blood pressure. Antihypertensive medications often target smooth muscle relaxation.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["smooth muscle", "involuntary muscle", "visceral muscle", "muscle comparison"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-052",
    course: "anatomy",
    topic: "Muscular System",
    subtopic: "Muscle Contraction Physiology",
    stem: "A patient is admitted with severe hyperkalemia. Which statement best explains why hyperkalemia affects skeletal muscle function?",
    options: [
      "Elevated potassium blocks calcium from binding to troponin",
      "Elevated extracellular potassium alters the resting membrane potential, impairing normal depolarization of muscle fibers",
      "Excess potassium causes permanent cross-bridge formation between actin and myosin",
      "High potassium levels destroy acetylcholine receptors at the neuromuscular junction"
    ],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "Elevated extracellular potassium reduces the potassium concentration gradient across the cell membrane, making the resting membrane potential less negative (partially depolarized). This impairs the cell's ability to generate and propagate normal action potentials, leading to muscle weakness or paralysis.",
    rationaleIncorrect: [
      "Potassium does not directly block calcium binding to troponin; calcium regulation is separate from potassium balance.",
      "Hyperkalemia does not cause permanent cross-bridge formation; it disrupts the electrical activity needed to initiate contraction.",
      "Acetylcholine receptors are not destroyed by potassium; they are affected in conditions like myasthenia gravis."
    ],
    difficulty: 3,
    bloomLevel: "analysis",
    clinicalCorrelation: "Nurses monitor serum potassium levels closely because hyperkalemia can cause life-threatening cardiac dysrhythmias and skeletal muscle weakness. ECG changes and muscle weakness are key assessment findings.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["hyperkalemia", "membrane potential", "muscle physiology", "electrolytes", "cardiac"],
    estimatedTimeSeconds: 90
  },

  // ===== CARDIOVASCULAR SYSTEM (12 questions: anat-053 to anat-064) =====
  {
    id: "anat-053",
    course: "anatomy",
    topic: "Cardiovascular System",
    subtopic: "Heart Chambers",
    stem: "Which chamber of the heart receives deoxygenated blood from the superior and inferior vena cava?",
    options: ["Left atrium", "Right atrium", "Left ventricle", "Right ventricle"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The right atrium receives deoxygenated blood returning from the body via the superior vena cava (upper body) and inferior vena cava (lower body). From there, blood passes through the tricuspid valve into the right ventricle.",
    rationaleIncorrect: [
      "The left atrium receives oxygenated blood from the pulmonary veins.",
      "The left ventricle pumps oxygenated blood to the systemic circulation via the aorta.",
      "The right ventricle pumps deoxygenated blood to the lungs via the pulmonary arteries."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Central venous catheters are positioned with the tip in or near the right atrium. Nurses verify placement via chest X-ray and monitor for complications such as dysrhythmias.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["heart chambers", "right atrium", "vena cava", "deoxygenated blood"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-054",
    course: "anatomy",
    topic: "Cardiovascular System",
    subtopic: "Heart Valves",
    stem: "The mitral (bicuspid) valve is located between the:",
    options: [
      "Right atrium and right ventricle",
      "Left atrium and left ventricle",
      "Right ventricle and pulmonary artery",
      "Left ventricle and aorta"
    ],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The mitral (bicuspid) valve is located between the left atrium and left ventricle. It has two cusps and prevents backflow of blood from the left ventricle into the left atrium during ventricular systole.",
    rationaleIncorrect: [
      "The tricuspid valve is located between the right atrium and right ventricle.",
      "The pulmonary valve is located between the right ventricle and pulmonary artery.",
      "The aortic valve is located between the left ventricle and aorta."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Mitral valve stenosis or regurgitation can lead to heart failure. Nurses auscultate the mitral valve area at the 5th intercostal space, midclavicular line, to assess for murmurs.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["heart valves", "mitral valve", "bicuspid valve", "cardiac anatomy"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-055",
    course: "anatomy",
    topic: "Cardiovascular System",
    subtopic: "Blood Flow",
    stem: "Arrange the following structures in the correct order of blood flow through the heart, starting from the right atrium.",
    options: [
      "Right ventricle",
      "Pulmonary arteries",
      "Left atrium",
      "Pulmonary veins",
      "Left ventricle"
    ],
    correctOrder: [0, 1, 3, 2, 4],
    type: "ordered",
    rationaleCorrect: "Blood flows from the right atrium → right ventricle → pulmonary arteries (to lungs) → pulmonary veins (return oxygenated blood) → left atrium → left ventricle. This sequence represents the complete path through the heart's four chambers.",
    rationaleIncorrect: [
      "The right ventricle is the first structure blood enters after leaving the right atrium.",
      "Pulmonary arteries carry blood from the right ventricle to the lungs.",
      "The left atrium receives blood from the pulmonary veins, not directly from the pulmonary arteries.",
      "Pulmonary veins carry oxygenated blood from the lungs to the left atrium.",
      "The left ventricle is the last chamber, pumping blood into the aorta."
    ],
    difficulty: 2,
    bloomLevel: "understanding",
    clinicalCorrelation: "Understanding cardiac blood flow helps nurses comprehend why right-sided heart failure causes systemic congestion (peripheral edema) while left-sided failure causes pulmonary congestion.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["blood flow", "cardiac circulation", "pulmonary circuit", "heart chambers"],
    estimatedTimeSeconds: 60
  },
  {
    id: "anat-056",
    course: "anatomy",
    topic: "Cardiovascular System",
    subtopic: "Coronary Circulation",
    stem: "The left anterior descending (LAD) artery supplies blood primarily to the:",
    options: [
      "Posterior wall of the left ventricle",
      "Anterior wall of the left ventricle and interventricular septum",
      "Right atrium and SA node",
      "Lateral wall of the right ventricle"
    ],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The LAD artery is a branch of the left coronary artery that supplies the anterior wall of the left ventricle and the anterior two-thirds of the interventricular septum. It is sometimes called the 'widow-maker' due to the devastating consequences of its occlusion.",
    rationaleIncorrect: [
      "The posterior wall of the left ventricle is primarily supplied by the posterior descending artery (from the right coronary artery in most people).",
      "The SA node is typically supplied by a branch of the right coronary artery.",
      "The right ventricle is primarily supplied by the right coronary artery."
    ],
    difficulty: 2,
    bloomLevel: "understanding",
    clinicalCorrelation: "Occlusion of the LAD artery causes anterior wall myocardial infarction, which can significantly impair left ventricular function. Nurses monitor for ST elevation in leads V1-V4 on ECG.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["coronary arteries", "LAD", "coronary circulation", "myocardial infarction"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-057",
    course: "anatomy",
    topic: "Cardiovascular System",
    subtopic: "Cardiac Conduction",
    stem: "The normal pacemaker of the heart is the:",
    options: ["Atrioventricular (AV) node", "Sinoatrial (SA) node", "Bundle of His", "Purkinje fibers"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The sinoatrial (SA) node, located in the right atrium, is the natural pacemaker of the heart. It spontaneously generates electrical impulses at a rate of 60-100 beats per minute, setting the normal heart rhythm (sinus rhythm).",
    rationaleIncorrect: [
      "The AV node is a secondary pacemaker (40-60 bpm) that delays impulse transmission between atria and ventricles.",
      "The Bundle of His conducts impulses from the AV node to the ventricles but has a lower intrinsic rate (20-40 bpm).",
      "Purkinje fibers distribute impulses throughout the ventricles but have the lowest intrinsic rate (20-40 bpm)."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "SA node dysfunction (sick sinus syndrome) can cause bradycardia or irregular rhythms. Nurses monitor heart rate and rhythm and may prepare for pacemaker insertion in symptomatic patients.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["cardiac conduction", "SA node", "pacemaker", "heart rhythm"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-058",
    course: "anatomy",
    topic: "Cardiovascular System",
    subtopic: "Blood Vessel Structure",
    stem: "Which layer of a blood vessel wall contains smooth muscle and is responsible for vasoconstriction?",
    options: ["Tunica intima", "Tunica media", "Tunica adventitia (externa)", "Endothelium"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The tunica media is the middle layer of a blood vessel wall, composed primarily of smooth muscle and elastic fibers. Contraction of the smooth muscle causes vasoconstriction, which increases blood pressure and redirects blood flow.",
    rationaleIncorrect: [
      "The tunica intima is the innermost layer, consisting of endothelium and a thin basement membrane.",
      "The tunica adventitia (externa) is the outermost layer, composed of connective tissue that anchors the vessel.",
      "The endothelium is the single-cell lining within the tunica intima, not responsible for vasoconstriction."
    ],
    difficulty: 2,
    bloomLevel: "recall",
    clinicalCorrelation: "Many antihypertensive medications (calcium channel blockers, vasodilators) target smooth muscle in the tunica media to promote vasodilation and reduce blood pressure.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["blood vessel layers", "tunica media", "vasoconstriction", "smooth muscle"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-059",
    course: "anatomy",
    topic: "Cardiovascular System",
    subtopic: "Arteries and Veins",
    stem: "Which of the following is a key structural difference between arteries and veins?",
    options: [
      "Arteries have valves to prevent backflow; veins do not",
      "Arteries have thicker tunica media with more smooth muscle; veins have thinner walls with valves",
      "Veins carry only oxygenated blood; arteries carry only deoxygenated blood",
      "Arteries and veins are structurally identical"
    ],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "Arteries have a thicker tunica media with more smooth muscle and elastic tissue to withstand high-pressure blood flow from the heart. Veins have thinner walls, wider lumens, and contain valves to prevent blood backflow, especially in the extremities.",
    rationaleIncorrect: [
      "Veins have valves; arteries generally do not.",
      "Pulmonary veins carry oxygenated blood and pulmonary arteries carry deoxygenated blood, so this generalization is incorrect.",
      "Arteries and veins differ significantly in wall thickness and structure."
    ],
    difficulty: 1,
    bloomLevel: "understanding",
    clinicalCorrelation: "Venous valves can become incompetent, leading to varicose veins and chronic venous insufficiency. Nurses assess for venous stasis ulcers and teach patients about leg elevation and compression stockings.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["arteries", "veins", "blood vessel structure", "valves", "vascular"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-060",
    course: "anatomy",
    topic: "Cardiovascular System",
    subtopic: "Blood Components",
    stem: "Which type of white blood cell is the most abundant in the bloodstream and is the first responder to bacterial infections?",
    options: ["Lymphocytes", "Monocytes", "Neutrophils", "Eosinophils"],
    correctAnswer: 2,
    type: "mcq",
    rationaleCorrect: "Neutrophils are the most abundant white blood cells, comprising 50-70% of circulating WBCs. They are the first responders to bacterial infections, arriving at infection sites to phagocytize bacteria and release antimicrobial substances.",
    rationaleIncorrect: [
      "Lymphocytes are the second most abundant WBCs and are primarily involved in adaptive immunity (T cells, B cells).",
      "Monocytes mature into macrophages and arrive later in the inflammatory response.",
      "Eosinophils are primarily involved in parasitic infections and allergic reactions, not first-line bacterial defense."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Nurses monitor the WBC differential count. An elevated neutrophil count (neutrophilia) suggests bacterial infection, while a critically low neutrophil count (neutropenia) increases infection risk.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["white blood cells", "neutrophils", "immune response", "WBC differential"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-061",
    course: "anatomy",
    topic: "Cardiovascular System",
    subtopic: "Cardiac Cycle",
    stem: "During ventricular systole, what happens to the AV valves?",
    options: [
      "They open to allow blood to flow into the ventricles",
      "They close to prevent backflow of blood into the atria",
      "They remain partially open throughout the cycle",
      "They open to allow blood into the aorta"
    ],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "During ventricular systole (contraction), the AV valves (tricuspid and mitral) close to prevent backflow of blood from the ventricles into the atria. The closing of these valves produces the first heart sound (S1, 'lub').",
    rationaleIncorrect: [
      "AV valves open during ventricular diastole (filling), not systole.",
      "AV valves do not remain partially open; they fully close during systole to maintain unidirectional blood flow.",
      "The semilunar valves (aortic and pulmonary) open during ventricular systole to eject blood, not the AV valves."
    ],
    difficulty: 2,
    bloomLevel: "understanding",
    clinicalCorrelation: "The S1 heart sound results from AV valve closure. Nurses auscultate heart sounds to identify murmurs, which may indicate valve incompetence or stenosis.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["cardiac cycle", "ventricular systole", "AV valves", "heart sounds", "S1"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-062",
    course: "anatomy",
    topic: "Cardiovascular System",
    subtopic: "Heart Layers",
    stem: "On a diagram of the heart wall, identify the thick muscular layer responsible for contraction.",
    options: ["Epicardium (visceral pericardium)", "Myocardium", "Endocardium", "Parietal pericardium"],
    correctAnswer: 1,
    type: "hot-spot",
    rationaleCorrect: "The myocardium is the thick, muscular middle layer of the heart wall composed of cardiac muscle. It is responsible for the heart's contractile force. The myocardium is thickest in the left ventricle because it pumps blood to the systemic circulation.",
    rationaleIncorrect: [
      "The epicardium is the thin outermost layer (visceral pericardium) that covers the heart surface.",
      "The endocardium is the thin innermost layer lining the heart chambers and covering the valves.",
      "The parietal pericardium is the outer layer of the pericardial sac, not part of the heart wall itself."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Myocardial infarction involves death of myocardial tissue due to ischemia. The extent of myocardial damage determines the severity of heart failure and guides nursing interventions.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["heart wall layers", "myocardium", "cardiac muscle", "heart anatomy"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-063",
    course: "anatomy",
    topic: "Cardiovascular System",
    subtopic: "Capillary Exchange",
    stem: "Which type of capillary has the largest pores and is found in organs like the liver and spleen?",
    options: ["Continuous capillaries", "Fenestrated capillaries", "Sinusoidal (discontinuous) capillaries", "Arteriolar capillaries"],
    correctAnswer: 2,
    type: "mcq",
    rationaleCorrect: "Sinusoidal (discontinuous) capillaries have the largest pores with gaps between endothelial cells and an incomplete basement membrane. They are found in the liver, spleen, and bone marrow, allowing passage of large molecules and even blood cells.",
    rationaleIncorrect: [
      "Continuous capillaries have the tightest junctions and are found in muscle, skin, and the brain (blood-brain barrier).",
      "Fenestrated capillaries have small pores (fenestrations) and are found in kidneys and endocrine glands; they are more permeable than continuous but less than sinusoidal.",
      "Arteriolar capillaries is not a standard capillary classification."
    ],
    difficulty: 3,
    bloomLevel: "understanding",
    clinicalCorrelation: "Sinusoidal capillaries in the liver allow hepatocytes to process toxins and synthesize proteins from the blood. Liver disease disrupts this function, which nurses monitor through liver function tests.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["capillary types", "sinusoidal capillaries", "capillary exchange", "liver"],
    estimatedTimeSeconds: 60
  },
  {
    id: "anat-064",
    course: "anatomy",
    topic: "Cardiovascular System",
    subtopic: "Major Blood Vessels",
    stem: "A nurse is assessing a patient's pedal pulse. Which artery is being palpated on the dorsum of the foot?",
    options: ["Posterior tibial artery", "Dorsalis pedis artery", "Femoral artery", "Popliteal artery"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The dorsalis pedis artery runs along the dorsum (top) of the foot and is palpated between the first and second metatarsal bones. It is an important pulse point for assessing peripheral circulation in the lower extremities.",
    rationaleIncorrect: [
      "The posterior tibial artery is palpated behind the medial malleolus (ankle bone), not on the dorsum of the foot.",
      "The femoral artery is palpated in the inguinal (groin) area.",
      "The popliteal artery is palpated in the popliteal fossa (behind the knee)."
    ],
    difficulty: 1,
    bloomLevel: "application",
    clinicalCorrelation: "Nurses assess the dorsalis pedis pulse to evaluate peripheral arterial circulation, especially in patients with peripheral arterial disease (PAD) or diabetes. An absent pulse may indicate arterial occlusion.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["pulse assessment", "dorsalis pedis", "peripheral circulation", "arterial pulse"],
    estimatedTimeSeconds: 30
  },

  // ===== RESPIRATORY SYSTEM (10 questions: anat-065 to anat-074) =====
  {
    id: "anat-065",
    course: "anatomy",
    topic: "Respiratory System",
    subtopic: "Upper Airway",
    stem: "The larynx is commonly known as the:",
    options: ["Windpipe", "Voice box", "Throat", "Air sac"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The larynx is commonly known as the voice box. It contains the vocal cords (vocal folds) and connects the pharynx to the trachea. In addition to voice production, the larynx protects the airway during swallowing via the epiglottis.",
    rationaleIncorrect: [
      "The windpipe refers to the trachea, not the larynx.",
      "The throat generally refers to the pharynx.",
      "Air sacs refer to the alveoli in the lungs."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Laryngeal edema from allergic reactions can obstruct the airway. Nurses must recognize signs of stridor and prepare for emergency airway management including possible intubation.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["larynx", "voice box", "upper airway", "airway anatomy"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-066",
    course: "anatomy",
    topic: "Respiratory System",
    subtopic: "Lower Airway",
    stem: "Gas exchange in the lungs occurs primarily at the:",
    options: ["Bronchi", "Bronchioles", "Alveoli", "Trachea"],
    correctAnswer: 2,
    type: "mcq",
    rationaleCorrect: "Alveoli are the tiny, thin-walled air sacs at the end of the respiratory tree where gas exchange occurs. Oxygen diffuses from alveolar air into pulmonary capillary blood, and carbon dioxide diffuses in the opposite direction across the respiratory membrane.",
    rationaleIncorrect: [
      "Bronchi are conducting airways that transport air but do not participate in gas exchange.",
      "Bronchioles are smaller conducting airways; terminal bronchioles do not participate in gas exchange (respiratory bronchioles begin gas exchange).",
      "The trachea is a conducting airway that transports air from the larynx to the bronchi."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Conditions that damage alveoli, such as emphysema or ARDS, impair gas exchange and cause hypoxemia. Nurses monitor oxygen saturation and administer supplemental oxygen as needed.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["alveoli", "gas exchange", "respiratory system", "oxygen diffusion"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-067",
    course: "anatomy",
    topic: "Respiratory System",
    subtopic: "Lung Anatomy",
    stem: "How many lobes does the right lung have?",
    options: ["1", "2", "3", "4"],
    correctAnswer: 2,
    type: "mcq",
    rationaleCorrect: "The right lung has three lobes (superior, middle, and inferior), separated by the oblique and horizontal fissures. The left lung has only two lobes (superior and inferior) because the heart occupies more space on the left side.",
    rationaleIncorrect: [
      "The right lung has more than one lobe.",
      "Two lobes describes the left lung, not the right.",
      "Neither lung has four lobes."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Nurses auscultate lung sounds over each lobe systematically. Knowing lobe locations helps identify which lobe is affected when abnormal sounds such as crackles or wheezes are heard.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["lung anatomy", "lung lobes", "right lung", "respiratory assessment"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-068",
    course: "anatomy",
    topic: "Respiratory System",
    subtopic: "Pleural Membranes",
    stem: "The pleural space between the visceral and parietal pleurae normally contains:",
    options: [
      "Air to facilitate lung expansion",
      "A small amount of serous fluid to reduce friction",
      "Blood to nourish the lung tissue",
      "Mucus to trap inhaled particles"
    ],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The pleural space normally contains a thin layer of serous (pleural) fluid that acts as a lubricant, reducing friction between the visceral and parietal pleurae during breathing. The fluid also creates surface tension that keeps the lungs expanded against the chest wall.",
    rationaleIncorrect: [
      "Air in the pleural space is abnormal and defines a pneumothorax.",
      "Blood in the pleural space is abnormal and defines a hemothorax.",
      "Mucus lines the airways, not the pleural space."
    ],
    difficulty: 1,
    bloomLevel: "understanding",
    clinicalCorrelation: "Accumulation of excess fluid in the pleural space (pleural effusion) compresses the lung and impairs breathing. Nurses assist with thoracentesis to drain the fluid and monitor respiratory status.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["pleural space", "pleural fluid", "pleural membranes", "pneumothorax"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-069",
    course: "anatomy",
    topic: "Respiratory System",
    subtopic: "Respiratory Mechanics",
    stem: "During normal quiet inspiration, intrapulmonary pressure:",
    options: [
      "Increases above atmospheric pressure",
      "Decreases below atmospheric pressure",
      "Remains equal to atmospheric pressure",
      "Fluctuates rapidly between positive and negative values"
    ],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "During inspiration, diaphragm contraction increases thoracic volume, causing intrapulmonary (intra-alveolar) pressure to drop below atmospheric pressure. This negative pressure gradient draws air into the lungs (Boyle's law: as volume increases, pressure decreases).",
    rationaleIncorrect: [
      "Intrapulmonary pressure increases above atmospheric pressure during expiration, forcing air out.",
      "If pressures were equal, no air would flow; a pressure gradient is necessary for ventilation.",
      "Pressure changes are gradual and cyclical, not rapidly fluctuating."
    ],
    difficulty: 2,
    bloomLevel: "understanding",
    clinicalCorrelation: "Understanding respiratory pressure changes helps nurses interpret ventilator settings. Negative-pressure ventilation mimics normal breathing, while positive-pressure ventilation pushes air into the lungs.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["respiratory mechanics", "intrapulmonary pressure", "Boyle's law", "ventilation"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-070",
    course: "anatomy",
    topic: "Respiratory System",
    subtopic: "Surfactant",
    stem: "Pulmonary surfactant is produced by which type of alveolar cell?",
    options: ["Type I alveolar cells (pneumocytes)", "Type II alveolar cells (pneumocytes)", "Alveolar macrophages", "Goblet cells"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "Type II alveolar cells (also called type II pneumocytes or septal cells) produce and secrete pulmonary surfactant. Surfactant reduces surface tension within the alveoli, preventing their collapse during expiration.",
    rationaleIncorrect: [
      "Type I alveolar cells are thin, flat cells that form the gas exchange surface; they do not produce surfactant.",
      "Alveolar macrophages (dust cells) phagocytize particles and pathogens within the alveoli.",
      "Goblet cells produce mucus in the conducting airways, not surfactant in the alveoli."
    ],
    difficulty: 2,
    bloomLevel: "recall",
    clinicalCorrelation: "Premature infants often lack sufficient surfactant, leading to neonatal respiratory distress syndrome (NRDS). Nurses administer exogenous surfactant replacement therapy to prevent alveolar collapse.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["surfactant", "Type II pneumocytes", "alveoli", "surface tension", "NRDS"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-071",
    course: "anatomy",
    topic: "Respiratory System",
    subtopic: "Respiratory Defense",
    stem: "Which of the following are defense mechanisms of the respiratory system? (Select all that apply)",
    options: [
      "Mucociliary escalator (cilia and mucus) trapping and removing particles",
      "Alveolar macrophages phagocytizing inhaled pathogens",
      "Cough reflex expelling foreign material",
      "Secretion of hydrochloric acid to kill bacteria",
      "Nasal hairs filtering large particles"
    ],
    correctAnswers: [0, 1, 2, 4],
    type: "sata",
    rationaleCorrect: "The respiratory system has multiple defense mechanisms: nasal hairs filter large particles, the mucociliary escalator (ciliated epithelium with mucus) traps and moves debris upward, alveolar macrophages phagocytize pathogens that reach the alveoli, and the cough reflex forcefully expels foreign material.",
    rationaleIncorrect: [
      "Correct: the mucociliary escalator is a primary defense mechanism in the conducting airways.",
      "Correct: alveolar macrophages are the last line of defense in the alveoli.",
      "Correct: the cough reflex is a protective mechanism to clear the airway.",
      "Hydrochloric acid is secreted by the stomach for digestion, not by the respiratory system.",
      "Correct: nasal hairs (vibrissae) filter large inhaled particles."
    ],
    difficulty: 2,
    bloomLevel: "understanding",
    clinicalCorrelation: "Smoking impairs the mucociliary escalator and reduces macrophage function, increasing susceptibility to respiratory infections. Nurses counsel patients on smoking cessation.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["respiratory defense", "mucociliary escalator", "alveolar macrophages", "cough reflex"],
    estimatedTimeSeconds: 60
  },
  {
    id: "anat-072",
    course: "anatomy",
    topic: "Respiratory System",
    subtopic: "Gas Transport",
    stem: "Most oxygen in the blood is transported by:",
    options: [
      "Dissolved in plasma",
      "Bound to hemoglobin in red blood cells",
      "Carried by white blood cells",
      "Attached to plasma proteins"
    ],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "Approximately 98.5% of oxygen in the blood is transported bound to hemoglobin (as oxyhemoglobin) within red blood cells. Only about 1.5% is dissolved directly in plasma. Each hemoglobin molecule can carry up to four oxygen molecules.",
    rationaleIncorrect: [
      "Only about 1.5% of oxygen is dissolved in plasma; this is insufficient to meet tissue demands alone.",
      "White blood cells are immune cells and do not transport oxygen.",
      "Plasma proteins do not carry oxygen; hemoglobin within RBCs is the primary carrier."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Anemia reduces hemoglobin levels and therefore the blood's oxygen-carrying capacity. Nurses monitor hemoglobin levels and assess for signs of hypoxia in anemic patients.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["oxygen transport", "hemoglobin", "oxyhemoglobin", "gas transport"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-073",
    course: "anatomy",
    topic: "Respiratory System",
    subtopic: "Bronchial Tree",
    stem: "The trachea bifurcates into the right and left primary bronchi at a point called the:",
    options: ["Hilum", "Carina", "Cricoid cartilage", "Thyroid cartilage"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The carina is the cartilaginous ridge at the bifurcation of the trachea, where it splits into the right and left primary (main) bronchi. The carina is located approximately at the level of the sternal angle (T4-T5).",
    rationaleIncorrect: [
      "The hilum is the area on each lung where bronchi, blood vessels, and nerves enter, not the tracheal bifurcation point.",
      "The cricoid cartilage is a ring-shaped cartilage at the inferior end of the larynx, above the trachea.",
      "The thyroid cartilage is the largest laryngeal cartilage (Adam's apple), not the tracheal bifurcation."
    ],
    difficulty: 2,
    bloomLevel: "recall",
    clinicalCorrelation: "The carina is highly sensitive and triggers a strong cough reflex when stimulated during suctioning. Nurses performing endotracheal suctioning must avoid inserting the catheter beyond the carina.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["trachea", "carina", "bronchial tree", "airway anatomy"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-074",
    course: "anatomy",
    topic: "Respiratory System",
    subtopic: "Respiratory Volumes",
    stem: "Tidal volume refers to the:",
    options: [
      "Maximum amount of air that can be exhaled after maximum inspiration",
      "Amount of air remaining in the lungs after forced expiration",
      "Volume of air inhaled or exhaled during normal quiet breathing",
      "Amount of air that can be forcibly inhaled beyond normal inspiration"
    ],
    correctAnswer: 2,
    type: "mcq",
    rationaleCorrect: "Tidal volume (TV) is the volume of air inhaled or exhaled during a single normal, quiet breath. In an average adult, tidal volume is approximately 500 mL. It is a key parameter monitored in ventilated patients.",
    rationaleIncorrect: [
      "The maximum amount of air exhaled after maximum inspiration describes vital capacity.",
      "Air remaining after forced expiration describes residual volume.",
      "The amount forcibly inhaled beyond normal inspiration describes inspiratory reserve volume."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Nurses set and monitor tidal volume on mechanical ventilators. Low tidal volumes (6-8 mL/kg ideal body weight) are used in ARDS patients to prevent ventilator-induced lung injury.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["tidal volume", "respiratory volumes", "pulmonary function", "ventilation"],
    estimatedTimeSeconds: 30
  },

  // ===== GI (GASTROINTESTINAL) SYSTEM (8 questions: anat-075 to anat-082) =====
  {
    id: "anat-075",
    course: "anatomy",
    topic: "Gastrointestinal System",
    subtopic: "GI Tract Layers",
    stem: "The innermost layer of the GI tract wall that directly contacts food is the:",
    options: ["Serosa", "Muscularis", "Submucosa", "Mucosa"],
    correctAnswer: 3,
    type: "mcq",
    rationaleCorrect: "The mucosa is the innermost layer of the GI tract wall, directly lining the lumen and contacting ingested food. It consists of epithelium, lamina propria, and muscularis mucosae. The mucosa secretes mucus, enzymes, and hormones.",
    rationaleIncorrect: [
      "The serosa is the outermost layer of the GI tract (in organs within the peritoneal cavity).",
      "The muscularis (muscularis externa) contains smooth muscle layers responsible for peristalsis.",
      "The submucosa lies between the mucosa and muscularis, containing blood vessels and nerves."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Mucosal damage from NSAIDs, H. pylori, or acid can lead to peptic ulcers. Nurses monitor for signs of GI bleeding such as melena, hematemesis, and dropping hemoglobin levels.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["GI tract layers", "mucosa", "gastrointestinal", "peptic ulcers"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-076",
    course: "anatomy",
    topic: "Gastrointestinal System",
    subtopic: "Accessory Organs",
    stem: "The liver produces bile, which is stored and concentrated in the:",
    options: ["Pancreas", "Gallbladder", "Duodenum", "Spleen"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "Bile is produced by hepatocytes in the liver and stored and concentrated in the gallbladder. When stimulated by cholecystokinin (CCK), the gallbladder contracts and releases bile into the duodenum via the common bile duct to aid in fat digestion.",
    rationaleIncorrect: [
      "The pancreas produces digestive enzymes and bicarbonate, not bile.",
      "The duodenum receives bile from the gallbladder but does not store it.",
      "The spleen is involved in filtering blood and immune function, not bile storage."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Gallstones can obstruct the bile duct, causing biliary colic and jaundice. Nurses assess for right upper quadrant pain, clay-colored stools, and dark urine in patients with suspected cholecystitis.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["gallbladder", "bile", "liver", "accessory organs", "digestion"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-077",
    course: "anatomy",
    topic: "Gastrointestinal System",
    subtopic: "Small Intestine",
    stem: "Which segment of the small intestine is the primary site for nutrient absorption?",
    options: ["Duodenum", "Jejunum", "Ileum", "Cecum"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The jejunum is the primary site for nutrient absorption in the small intestine. Its mucosa has prominent circular folds (plicae circulares) and long villi that maximize the surface area for absorption of carbohydrates, amino acids, and fatty acids.",
    rationaleIncorrect: [
      "The duodenum is the first and shortest segment, primarily involved in chemical digestion and receiving bile and pancreatic secretions.",
      "The ileum absorbs bile salts and vitamin B12 but is not the primary site for most nutrient absorption.",
      "The cecum is the beginning of the large intestine, not part of the small intestine."
    ],
    difficulty: 2,
    bloomLevel: "understanding",
    clinicalCorrelation: "Surgical removal of the jejunum significantly impairs nutrient absorption, requiring nutritional support. Nurses monitor patients with short bowel syndrome for malnutrition and fluid imbalance.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["small intestine", "jejunum", "nutrient absorption", "villi"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-078",
    course: "anatomy",
    topic: "Gastrointestinal System",
    subtopic: "Large Intestine",
    stem: "Which of the following are functions of the large intestine? (Select all that apply)",
    options: [
      "Absorption of water and electrolytes",
      "Production of digestive enzymes for protein digestion",
      "Formation and storage of feces",
      "Bacterial synthesis of certain vitamins (K and B vitamins)",
      "Peristaltic propulsion of fecal material"
    ],
    correctAnswers: [0, 2, 3, 4],
    type: "sata",
    rationaleCorrect: "The large intestine absorbs water and electrolytes, forms and stores feces, houses bacteria that synthesize vitamins K and some B vitamins, and uses peristalsis (including mass movements) to propel fecal material toward the rectum.",
    rationaleIncorrect: [
      "Correct: water and electrolyte absorption is a primary function.",
      "The large intestine does not produce digestive enzymes; protein digestion occurs mainly in the stomach and small intestine.",
      "Correct: feces are formed and stored in the large intestine and rectum.",
      "Correct: intestinal flora synthesize vitamin K and B vitamins.",
      "Correct: peristalsis moves fecal material through the colon."
    ],
    difficulty: 2,
    bloomLevel: "understanding",
    clinicalCorrelation: "Antibiotic therapy can disrupt intestinal flora, reducing vitamin K synthesis and increasing bleeding risk. Nurses assess for signs of bleeding and monitor coagulation studies.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["large intestine", "colon functions", "water absorption", "vitamin K", "intestinal flora"],
    estimatedTimeSeconds: 60
  },
  {
    id: "anat-079",
    course: "anatomy",
    topic: "Gastrointestinal System",
    subtopic: "Esophagus and Stomach",
    stem: "The lower esophageal sphincter (LES) prevents:",
    options: [
      "Food from entering the trachea",
      "Reflux of stomach contents into the esophagus",
      "Premature emptying of the stomach into the duodenum",
      "Bile from entering the stomach"
    ],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The lower esophageal sphincter (LES), also called the cardiac sphincter, prevents the reflux of acidic stomach contents back into the esophagus. When the LES is weakened or relaxes inappropriately, gastroesophageal reflux disease (GERD) can occur.",
    rationaleIncorrect: [
      "The epiglottis prevents food from entering the trachea during swallowing.",
      "The pyloric sphincter regulates the passage of chyme from the stomach into the duodenum.",
      "The sphincter of Oddi controls bile flow into the duodenum."
    ],
    difficulty: 1,
    bloomLevel: "understanding",
    clinicalCorrelation: "Nurses educate GERD patients about lifestyle modifications including avoiding late-night meals, elevating the head of bed, and recognizing when reflux symptoms require medical evaluation.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["LES", "esophageal sphincter", "GERD", "stomach", "reflux"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-080",
    course: "anatomy",
    topic: "Gastrointestinal System",
    subtopic: "Pancreas",
    stem: "The pancreas has both endocrine and exocrine functions. Which of the following describes its exocrine function?",
    options: [
      "Secretion of insulin and glucagon into the blood",
      "Production of digestive enzymes and bicarbonate released into the duodenum",
      "Production of bile for fat emulsification",
      "Secretion of erythropoietin for red blood cell production"
    ],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The exocrine function of the pancreas involves acinar cells producing digestive enzymes (lipase, amylase, proteases) and ductal cells secreting bicarbonate, which are released into the duodenum via the pancreatic duct to facilitate chemical digestion and neutralize gastric acid.",
    rationaleIncorrect: [
      "Insulin and glucagon secretion is the endocrine function of the pancreas (performed by islets of Langerhans).",
      "Bile is produced by the liver, not the pancreas.",
      "Erythropoietin is produced primarily by the kidneys."
    ],
    difficulty: 2,
    bloomLevel: "understanding",
    clinicalCorrelation: "Pancreatitis occurs when digestive enzymes activate within the pancreas, causing autodigestion. Nurses monitor for severe epigastric pain, elevated amylase and lipase levels, and provide supportive care.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["pancreas", "exocrine function", "digestive enzymes", "bicarbonate"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-081",
    course: "anatomy",
    topic: "Gastrointestinal System",
    subtopic: "Peritoneum",
    stem: "Which peritoneal fold suspends portions of the small intestine from the posterior abdominal wall?",
    options: ["Greater omentum", "Lesser omentum", "Mesentery", "Falciform ligament"],
    correctAnswer: 2,
    type: "mcq",
    rationaleCorrect: "The mesentery is a fan-shaped fold of peritoneum that attaches the jejunum and ileum to the posterior abdominal wall. It contains blood vessels, lymphatic vessels, and nerves that supply the small intestine.",
    rationaleIncorrect: [
      "The greater omentum is a large peritoneal fold that hangs from the greater curvature of the stomach like an 'apron.'",
      "The lesser omentum connects the liver to the lesser curvature of the stomach and the duodenum.",
      "The falciform ligament attaches the liver to the anterior abdominal wall."
    ],
    difficulty: 3,
    bloomLevel: "recall",
    clinicalCorrelation: "Mesenteric ischemia (loss of blood supply through the mesentery) is a surgical emergency. Nurses should recognize severe abdominal pain disproportionate to exam findings as a potential sign.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["mesentery", "peritoneum", "peritoneal folds", "small intestine"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-082",
    course: "anatomy",
    topic: "Gastrointestinal System",
    subtopic: "Oral Cavity",
    stem: "Arrange the following segments of the GI tract in the correct order food travels from the mouth.",
    options: ["Esophagus", "Pharynx", "Stomach", "Small intestine"],
    correctOrder: [1, 0, 2, 3],
    type: "ordered",
    rationaleCorrect: "Food travels from the mouth → pharynx → esophagus → stomach → small intestine. The pharynx connects the oral cavity to the esophagus, which then transports food to the stomach via peristalsis before it enters the small intestine for further digestion and absorption.",
    rationaleIncorrect: [
      "The esophagus comes after the pharynx, not first.",
      "The pharynx is the first segment food enters after the oral cavity.",
      "The stomach receives food from the esophagus.",
      "The small intestine is the last in this sequence."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Understanding GI tract order helps nurses recognize where obstructions may occur and anticipate symptoms. Esophageal obstruction causes dysphagia, while gastric outlet obstruction causes projectile vomiting.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["GI tract order", "digestion pathway", "esophagus", "stomach", "pharynx"],
    estimatedTimeSeconds: 45
  },

  // ===== RENAL/URINARY SYSTEM (8 questions: anat-083 to anat-090) =====
  {
    id: "anat-083",
    course: "anatomy",
    topic: "Renal/Urinary System",
    subtopic: "Kidney Anatomy",
    stem: "The functional unit of the kidney responsible for filtering blood and producing urine is the:",
    options: ["Renal pelvis", "Nephron", "Ureter", "Renal cortex"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The nephron is the functional unit of the kidney. Each kidney contains approximately 1 million nephrons. Each nephron consists of a renal corpuscle (glomerulus and Bowman's capsule) and a renal tubule, working together to filter blood, reabsorb needed substances, and secrete waste.",
    rationaleIncorrect: [
      "The renal pelvis is the funnel-shaped collecting area that drains urine into the ureter.",
      "The ureter is a tube that transports urine from the renal pelvis to the urinary bladder.",
      "The renal cortex is the outer region of the kidney where most nephrons' corpuscles are located, but it is not the functional unit itself."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Damage to nephrons from conditions like diabetes or hypertension reduces kidney function. Nurses monitor creatinine, BUN, and GFR as indicators of nephron function.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["nephron", "kidney anatomy", "functional unit", "renal system"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-084",
    course: "anatomy",
    topic: "Renal/Urinary System",
    subtopic: "Nephron Structure",
    stem: "Glomerular filtration occurs as blood is filtered from the glomerulus into the:",
    options: ["Proximal convoluted tubule", "Bowman's (glomerular) capsule", "Loop of Henle", "Collecting duct"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "Glomerular filtration is the first step of urine formation. Blood is filtered under high pressure from the glomerular capillaries into Bowman's (glomerular) capsule. The filtrate then passes into the renal tubule for selective reabsorption and secretion.",
    rationaleIncorrect: [
      "The proximal convoluted tubule receives filtrate from Bowman's capsule; filtration does not occur here.",
      "The loop of Henle concentrates urine but is not the site of initial filtration.",
      "The collecting duct receives processed filtrate from multiple nephrons and transports urine to the renal pelvis."
    ],
    difficulty: 1,
    bloomLevel: "understanding",
    clinicalCorrelation: "Glomerulonephritis damages the glomerular filtration barrier, allowing proteins and blood cells into the urine. Nurses assess for proteinuria, hematuria, and edema in affected patients.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["glomerular filtration", "Bowman's capsule", "nephron", "urine formation"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-085",
    course: "anatomy",
    topic: "Renal/Urinary System",
    subtopic: "Urine Transport",
    stem: "Urine is transported from the kidney to the bladder through the:",
    options: ["Urethra", "Ureter", "Renal vein", "Collecting duct"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The ureters are paired muscular tubes that transport urine from the renal pelvis of each kidney to the urinary bladder via peristaltic contractions. Each ureter is approximately 25-30 cm long.",
    rationaleIncorrect: [
      "The urethra transports urine from the bladder to the outside of the body.",
      "The renal vein carries filtered blood away from the kidney back to the inferior vena cava.",
      "The collecting duct is within the kidney and drains into the renal pelvis."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Kidney stones can obstruct the ureter, causing severe colicky flank pain (renal colic). Nurses monitor urine output, strain urine for stones, and manage pain.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["ureter", "urine transport", "urinary tract", "kidney stones"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-086",
    course: "anatomy",
    topic: "Renal/Urinary System",
    subtopic: "Bladder",
    stem: "The internal urethral sphincter of the bladder is composed of which type of muscle?",
    options: ["Skeletal muscle (voluntary)", "Smooth muscle (involuntary)", "Cardiac muscle", "Elastic connective tissue"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The internal urethral sphincter is composed of smooth muscle and is under involuntary control by the autonomic nervous system. It maintains urinary continence by tonically contracting and relaxing during micturition (urination).",
    rationaleIncorrect: [
      "Skeletal muscle forms the external urethral sphincter, which is under voluntary control.",
      "Cardiac muscle is found only in the heart.",
      "The internal sphincter is muscular, not composed of elastic connective tissue."
    ],
    difficulty: 2,
    bloomLevel: "understanding",
    clinicalCorrelation: "Spinal cord injuries can disrupt autonomic control of the internal sphincter, causing urinary retention or incontinence. Nurses monitor bladder function and may perform intermittent catheterization.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["urinary bladder", "sphincters", "smooth muscle", "urinary continence"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-087",
    course: "anatomy",
    topic: "Renal/Urinary System",
    subtopic: "Kidney Blood Supply",
    stem: "Which vessel supplies blood directly to the kidney for filtration?",
    options: ["Renal vein", "Renal artery", "Inferior vena cava", "Hepatic artery"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The renal artery branches directly from the abdominal aorta and delivers blood to the kidney for filtration. Each kidney receives approximately 20-25% of cardiac output, reflecting the kidney's vital role in filtering blood.",
    rationaleIncorrect: [
      "The renal vein carries filtered blood away from the kidney to the inferior vena cava.",
      "The inferior vena cava returns blood to the heart; it does not directly supply the kidney.",
      "The hepatic artery supplies blood to the liver, not the kidneys."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Renal artery stenosis can reduce blood flow to the kidney, causing renovascular hypertension. Nurses monitor blood pressure and assess for signs of reduced renal perfusion.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["renal artery", "kidney blood supply", "renal circulation", "filtration"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-088",
    course: "anatomy",
    topic: "Renal/Urinary System",
    subtopic: "Tubular Reabsorption",
    stem: "Most water and solute reabsorption in the nephron occurs in the:",
    options: ["Proximal convoluted tubule", "Loop of Henle", "Distal convoluted tubule", "Collecting duct"],
    correctAnswer: 0,
    type: "mcq",
    rationaleCorrect: "The proximal convoluted tubule (PCT) reabsorbs approximately 65% of filtered water, sodium, and other solutes. It also reabsorbs nearly all filtered glucose, amino acids, and bicarbonate through active transport and osmosis. Its cells have abundant microvilli and mitochondria for this purpose.",
    rationaleIncorrect: [
      "The loop of Henle contributes to urine concentration but reabsorbs less than the PCT.",
      "The distal convoluted tubule fine-tunes reabsorption under hormonal control (aldosterone, ADH) but handles a smaller percentage.",
      "The collecting duct performs final concentration of urine under ADH influence but is not the primary reabsorption site."
    ],
    difficulty: 2,
    bloomLevel: "understanding",
    clinicalCorrelation: "Certain medications and toxins can damage the PCT, causing acute tubular necrosis (ATN). Nurses monitor urine output and electrolytes in patients at risk for nephrotoxic kidney injury.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["tubular reabsorption", "PCT", "nephron function", "kidney physiology"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-089",
    course: "anatomy",
    topic: "Renal/Urinary System",
    subtopic: "Kidney Regions",
    stem: "On a diagram of a kidney cross-section, identify the inner region that contains the renal pyramids.",
    options: ["Renal cortex", "Renal medulla", "Renal pelvis", "Renal capsule"],
    correctAnswer: 1,
    type: "hot-spot",
    rationaleCorrect: "The renal medulla is the inner region of the kidney containing triangular structures called renal pyramids. The pyramids contain the loops of Henle and collecting ducts, which are involved in concentrating urine. The tips of the pyramids (renal papillae) point toward the renal pelvis.",
    rationaleIncorrect: [
      "The renal cortex is the outer region of the kidney, containing the glomeruli and convoluted tubules.",
      "The renal pelvis is the funnel-shaped cavity that collects urine from the calyces.",
      "The renal capsule is the outer fibrous covering of the kidney, not an internal region."
    ],
    difficulty: 2,
    bloomLevel: "application",
    clinicalCorrelation: "Renal medullary damage can impair the kidney's ability to concentrate urine, resulting in dilute urine and polyuria. Nurses monitor urine specific gravity and output in patients with renal disease.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["renal medulla", "renal pyramids", "kidney regions", "kidney anatomy"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-090",
    course: "anatomy",
    topic: "Renal/Urinary System",
    subtopic: "Hormonal Regulation",
    stem: "Antidiuretic hormone (ADH) acts primarily on which part of the nephron to promote water reabsorption?",
    options: ["Glomerulus", "Proximal convoluted tubule", "Loop of Henle ascending limb", "Collecting duct"],
    correctAnswer: 3,
    type: "mcq",
    rationaleCorrect: "ADH (vasopressin) acts primarily on the collecting duct by inserting aquaporin channels into the duct's walls, making them permeable to water. This allows water to be reabsorbed back into the blood, producing concentrated urine and conserving body water.",
    rationaleIncorrect: [
      "The glomerulus is the site of filtration; ADH does not act here.",
      "The PCT reabsorbs water constitutively and is not the primary target of ADH.",
      "The ascending limb of the loop of Henle is impermeable to water and is not a target of ADH."
    ],
    difficulty: 2,
    bloomLevel: "understanding",
    clinicalCorrelation: "SIADH (syndrome of inappropriate ADH) causes excess water retention and dilutional hyponatremia. Nurses monitor serum sodium levels, fluid balance, and neurological status in affected patients.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["ADH", "vasopressin", "collecting duct", "water reabsorption", "SIADH"],
    estimatedTimeSeconds: 45
  },

  // ===== NERVOUS SYSTEM BASICS (10 questions: anat-091 to anat-100) =====
  {
    id: "anat-091",
    course: "anatomy",
    topic: "Nervous System",
    subtopic: "Divisions",
    stem: "The central nervous system (CNS) consists of the:",
    options: [
      "Brain and cranial nerves",
      "Brain and spinal cord",
      "Spinal cord and spinal nerves",
      "Sympathetic and parasympathetic divisions"
    ],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The central nervous system (CNS) consists of the brain and spinal cord. These structures are protected by the skull and vertebral column, respectively, and are surrounded by meninges and cerebrospinal fluid.",
    rationaleIncorrect: [
      "Cranial nerves are part of the peripheral nervous system (PNS), not the CNS.",
      "Spinal nerves are part of the PNS.",
      "The sympathetic and parasympathetic divisions are parts of the autonomic nervous system within the PNS."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "CNS damage from stroke or traumatic brain injury is often permanent because neurons in the CNS have limited regenerative capacity. Nurses perform neurological assessments to detect changes.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["CNS", "brain", "spinal cord", "nervous system divisions"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-092",
    course: "anatomy",
    topic: "Nervous System",
    subtopic: "Neuron Structure",
    stem: "The portion of a neuron that receives signals from other neurons is the:",
    options: ["Axon", "Cell body (soma)", "Dendrite", "Synaptic terminal"],
    correctAnswer: 2,
    type: "mcq",
    rationaleCorrect: "Dendrites are the branching extensions of a neuron that receive incoming signals (nerve impulses) from other neurons or sensory receptors. They transmit these signals toward the cell body. Most neurons have multiple dendrites to receive input from many sources.",
    rationaleIncorrect: [
      "The axon conducts impulses away from the cell body toward other neurons or effectors.",
      "The cell body (soma) contains the nucleus and organelles; while it can receive some signals, dendrites are the primary receptive structures.",
      "The synaptic terminal (axon terminal) is where neurotransmitters are released to communicate with the next cell."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Dendritic damage or loss is associated with neurodegenerative diseases such as Alzheimer's. Nurses assess cognitive function and safety in patients with progressive neurological decline.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["neuron structure", "dendrites", "nerve impulse", "signal reception"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-093",
    course: "anatomy",
    topic: "Nervous System",
    subtopic: "Myelin",
    stem: "In the peripheral nervous system, myelin sheaths are formed by:",
    options: ["Oligodendrocytes", "Schwann cells", "Astrocytes", "Microglia"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "In the peripheral nervous system (PNS), Schwann cells wrap around axons to form the myelin sheath. Each Schwann cell myelinates a single segment of one axon. Myelin insulates the axon and speeds up nerve impulse conduction.",
    rationaleIncorrect: [
      "Oligodendrocytes form myelin in the central nervous system (CNS), not the PNS.",
      "Astrocytes are CNS glial cells that support neurons, maintain the blood-brain barrier, and regulate the chemical environment.",
      "Microglia are CNS immune cells that phagocytize pathogens and debris."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Guillain-Barré syndrome involves autoimmune destruction of Schwann cell myelin in the PNS, causing ascending paralysis. Nurses monitor for respiratory compromise and provide supportive care.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["myelin", "Schwann cells", "PNS", "nerve conduction", "Guillain-Barré"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-094",
    course: "anatomy",
    topic: "Nervous System",
    subtopic: "Brain Regions",
    stem: "Which part of the brain is responsible for coordinating voluntary movements, balance, and posture?",
    options: ["Cerebrum", "Cerebellum", "Medulla oblongata", "Hypothalamus"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The cerebellum, located posterior to the brainstem, coordinates voluntary movements, maintains balance, and regulates posture. It refines motor commands from the cerebral cortex to produce smooth, accurate movements. Damage causes ataxia (uncoordinated movement).",
    rationaleIncorrect: [
      "The cerebrum is responsible for higher functions including thought, reasoning, and initiating voluntary movement, but coordination is primarily cerebellar.",
      "The medulla oblongata controls vital autonomic functions such as heart rate, blood pressure, and respiration.",
      "The hypothalamus regulates homeostatic functions including body temperature, hunger, thirst, and hormone secretion."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Cerebellar damage from stroke or tumors causes ataxia, intention tremor, and difficulty with balance. Nurses assess coordination using finger-to-nose testing and observe gait stability.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["cerebellum", "motor coordination", "balance", "brain regions", "ataxia"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-095",
    course: "anatomy",
    topic: "Nervous System",
    subtopic: "Meninges",
    stem: "Which of the following lists the meninges in correct order from outermost to innermost?",
    options: [
      "Pia mater, arachnoid mater, dura mater",
      "Dura mater, arachnoid mater, pia mater",
      "Arachnoid mater, dura mater, pia mater",
      "Dura mater, pia mater, arachnoid mater"
    ],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The three meninges from outermost to innermost are: dura mater (tough, outermost), arachnoid mater (middle, web-like), and pia mater (delicate, innermost, directly covering the brain and spinal cord). Cerebrospinal fluid circulates in the subarachnoid space.",
    rationaleIncorrect: [
      "This order is reversed (innermost to outermost).",
      "The arachnoid mater is the middle layer, not the outermost.",
      "The pia mater is the innermost layer, not between the dura and arachnoid."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Meningitis is inflammation of the meninges caused by infection. Nurses assess for nuchal rigidity, headache, fever, and photophobia, and assist with lumbar puncture to obtain CSF for analysis.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["meninges", "dura mater", "arachnoid mater", "pia mater", "meningitis"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-096",
    course: "anatomy",
    topic: "Nervous System",
    subtopic: "Autonomic Nervous System",
    stem: "The 'fight or flight' response is primarily mediated by the:",
    options: ["Somatic nervous system", "Parasympathetic nervous system", "Sympathetic nervous system", "Enteric nervous system"],
    correctAnswer: 2,
    type: "mcq",
    rationaleCorrect: "The sympathetic nervous system mediates the 'fight or flight' response, preparing the body for emergencies by increasing heart rate, dilating bronchioles, diverting blood to skeletal muscles, and releasing epinephrine and norepinephrine.",
    rationaleIncorrect: [
      "The somatic nervous system controls voluntary skeletal muscle movements.",
      "The parasympathetic nervous system mediates 'rest and digest' functions, opposing sympathetic effects.",
      "The enteric nervous system controls GI tract motility and secretion independently."
    ],
    difficulty: 1,
    bloomLevel: "recall",
    clinicalCorrelation: "Understanding sympathetic responses helps nurses recognize signs of acute stress: tachycardia, diaphoresis, pupil dilation, and elevated blood pressure. Beta-blockers are used to counteract excessive sympathetic activity.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["sympathetic nervous system", "fight or flight", "ANS", "autonomic"],
    estimatedTimeSeconds: 30
  },
  {
    id: "anat-097",
    course: "anatomy",
    topic: "Nervous System",
    subtopic: "Cranial Nerves",
    stem: "Which cranial nerve is assessed when a nurse checks a patient's pupillary light reflex?",
    options: ["Cranial nerve II (optic)", "Cranial nerve III (oculomotor)", "Cranial nerve V (trigeminal)", "Cranial nerve VII (facial)"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "The pupillary light reflex involves both CN II (optic, afferent/sensory limb detecting light) and CN III (oculomotor, efferent/motor limb constricting the pupil). CN III is assessed because it directly controls the pupillary sphincter muscle responsible for constriction.",
    rationaleIncorrect: [
      "CN II detects the light stimulus (afferent limb) but does not cause pupil constriction.",
      "CN V (trigeminal) controls facial sensation and muscles of mastication, not pupil response.",
      "CN VII (facial) controls facial expression and taste, not pupillary function."
    ],
    difficulty: 2,
    bloomLevel: "application",
    clinicalCorrelation: "Nurses check pupillary response as part of neurological assessments. A fixed, dilated pupil can indicate increased intracranial pressure or CN III compression, requiring immediate intervention.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["cranial nerves", "oculomotor nerve", "pupillary reflex", "neurological assessment"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-098",
    course: "anatomy",
    topic: "Nervous System",
    subtopic: "Spinal Cord",
    stem: "Which of the following are components of a reflex arc? (Select all that apply)",
    options: [
      "Receptor that detects the stimulus",
      "Sensory (afferent) neuron that transmits impulse to CNS",
      "Integration center in the CNS",
      "Motor (efferent) neuron that transmits impulse to effector",
      "Effector (muscle or gland) that produces the response",
      "Cerebral cortex for conscious awareness before response"
    ],
    correctAnswers: [0, 1, 2, 3, 4],
    type: "sata",
    rationaleCorrect: "A reflex arc has five components: receptor (detects stimulus), sensory neuron (carries impulse to CNS), integration center (processes information, usually in spinal cord), motor neuron (carries response to effector), and effector (muscle or gland that responds). Reflexes do not require cerebral cortex processing.",
    rationaleIncorrect: [
      "Correct: the receptor detects the stimulus.",
      "Correct: the sensory neuron carries the signal to the CNS.",
      "Correct: the integration center (interneuron or synapse in spinal cord) processes the signal.",
      "Correct: the motor neuron carries the command to the effector.",
      "Correct: the effector produces the response.",
      "Reflexes are involuntary and do not require conscious awareness from the cerebral cortex before the response occurs."
    ],
    difficulty: 2,
    bloomLevel: "understanding",
    clinicalCorrelation: "Nurses assess deep tendon reflexes (e.g., patellar reflex) to evaluate spinal cord and peripheral nerve function. Absent or hyperactive reflexes can indicate neurological pathology.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["reflex arc", "spinal reflexes", "sensory neuron", "motor neuron", "neurological assessment"],
    estimatedTimeSeconds: 60
  },
  {
    id: "anat-099",
    course: "anatomy",
    topic: "Nervous System",
    subtopic: "Cerebrospinal Fluid",
    stem: "Cerebrospinal fluid (CSF) is produced primarily by the:",
    options: ["Arachnoid villi", "Choroid plexus", "Pia mater", "Dural sinuses"],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "CSF is produced primarily by the choroid plexus, a network of capillaries and ependymal cells located within the ventricles of the brain. Approximately 500 mL of CSF is produced daily, though only about 150 mL circulates at any given time.",
    rationaleIncorrect: [
      "Arachnoid villi (granulations) are responsible for draining CSF back into venous blood, not producing it.",
      "The pia mater is the innermost meningeal layer covering the brain surface; it does not produce CSF.",
      "Dural sinuses are venous channels that receive CSF from arachnoid villi and drain venous blood."
    ],
    difficulty: 2,
    bloomLevel: "recall",
    clinicalCorrelation: "Hydrocephalus results from impaired CSF drainage or overproduction, causing increased intracranial pressure. Nurses monitor for signs of increased ICP including headache, vomiting, and altered consciousness.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["CSF", "choroid plexus", "ventricles", "hydrocephalus", "intracranial pressure"],
    estimatedTimeSeconds: 45
  },
  {
    id: "anat-100",
    course: "anatomy",
    topic: "Nervous System",
    subtopic: "Action Potential",
    stem: "A patient presents with symptoms consistent with multiple sclerosis (MS). Based on your understanding of nerve impulse conduction, which of the following best explains why demyelination slows or blocks nerve signal transmission?",
    options: [
      "Demyelination increases the number of sodium channels available for depolarization",
      "Demyelination removes the insulating sheath, preventing saltatory conduction and forcing slower continuous conduction or signal failure",
      "Demyelination enhances neurotransmitter release at the synapse, causing signal overload",
      "Demyelination causes excessive production of potassium, hyperpolarizing the neuron"
    ],
    correctAnswer: 1,
    type: "mcq",
    rationaleCorrect: "Myelin allows saltatory conduction, where action potentials 'jump' between nodes of Ranvier, greatly increasing conduction speed. Demyelination removes this insulation, forcing slower continuous conduction along the bare axon or causing complete conduction block where the signal cannot be regenerated.",
    rationaleIncorrect: [
      "Demyelination does not increase sodium channels; it disrupts the efficient propagation of action potentials.",
      "Demyelination affects axonal conduction, not neurotransmitter release at synapses.",
      "Demyelination does not cause excessive potassium production; the issue is loss of insulation for electrical conduction."
    ],
    difficulty: 3,
    bloomLevel: "analysis",
    clinicalCorrelation: "MS patients experience variable neurological deficits depending on which nerves are demyelinated. Nurses assess for vision changes, weakness, numbness, and coordinate care with the multidisciplinary team.",
    references: ["Tortora & Derrickson, Principles of Anatomy & Physiology"],
    tags: ["demyelination", "multiple sclerosis", "saltatory conduction", "myelin", "action potential"],
    estimatedTimeSeconds: 90
  }
];
