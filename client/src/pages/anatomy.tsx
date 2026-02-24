import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Link } from "wouter";
import { AdminEditButton } from "@/components/admin-edit-button";
import { Footer } from "@/components/footer";
import { useAuth } from "@/lib/auth";
import { LessonImageManager } from "@/components/lesson-image-manager";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Heart,
  Wind,
  Brain,
  Bone,
  UtensilsCrossed,
  Droplets,
  Zap,
  Shield,
  ShieldCheck,
  Baby,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Sparkles,
  Microscope,
  RefreshCw,
  PlayCircle,
  Video,
} from "lucide-react";

import illustrationCellStructure from "@assets/CC5529CB-1C54-4D82-9872-BF7B2A519E53_1771868083264.png";
import illustrationHomeostasis from "@assets/E9E33423-6365-4686-98CB-3197D14546E5_1771868083264.png";
import illustrationCardiacCycle from "@assets/C59AF0B3-CD44-43B6-B2D5-D708852AAFA8_1771867744630.png";
import illustrationCOPD from "@assets/1EDFE7E4-FCC4-4937-B2AC-A6E852F6306A_1771867744630.png";
import illustrationStroke from "@assets/ABD0FB30-EEF2-4E4F-9EFC-63FF5DD16E97_1771867815027.png";
import illustrationOsteoporosis from "@assets/FCA45E66-D79A-4B8E-BE56-78FCF54E7DDF_1771876993790.png";
import illustrationElectrolytes from "@assets/AB6C69A2-A616-4DBF-8567-6990D4260BDE_1771867744630.png";
import illustrationKidneys from "@assets/BF46940D-B9D9-4006-9ECE-FAA14A1AC986_1771867744630.png";
import illustrationWound from "@assets/0C0087C1-6D3B-4F00-8750-23E66D85FDE6_1771867669482.png";
import illustrationInflammatoryResponse from "@assets/046AF766-D3A2-4713-BF5D-BC2AFF8EEA89_1771876993790.png";
import illustrationInnateImmunity from "@assets/1C466673-4454-450E-AE1C-B74640446346_1771868083264.png";

const bodySystems = [
  {
    id: "cell-structure",
    name: "Cell Structure & Function",
    icon: Microscope,
    color: "text-emerald-500",
    borderColor: "border-emerald-200",
    bgAccent: "bg-emerald-50",
    image: illustrationCellStructure,
    description: "The fundamental unit of life: organelles, membranes, and cellular processes",
    content: [
      "The cell is the basic structural and functional unit of all living organisms. Human cells are eukaryotic, meaning they contain a true nucleus enclosed by a nuclear membrane (nuclear envelope). The cell is bounded by the plasma membrane (cell membrane), a phospholipid bilayer with embedded proteins that regulates the passage of substances in and out of the cell. The hydrophilic (water-loving) phosphate heads face outward toward the aqueous environment, while the hydrophobic (water-fearing) lipid tails face inward. Integral proteins span the entire membrane and may serve as channels, carriers, receptors, or enzymes. Peripheral proteins attach to the membrane surface and assist with signaling and structural support. Cholesterol molecules embedded in the bilayer help maintain membrane fluidity across temperature changes.",
      "The nucleus is the control center of the cell, containing the cell's genetic material (DNA) organized into 46 chromosomes (23 pairs). The nuclear envelope has nuclear pores that regulate the transport of mRNA and ribosomal subunits between the nucleus and cytoplasm. The nucleolus, found within the nucleus, is the site of ribosomal RNA (rRNA) synthesis. DNA replication occurs during the S (synthesis) phase of the cell cycle, producing identical copies of chromosomes before cell division. Transcription (DNA to mRNA) occurs in the nucleus, while translation (mRNA to protein) occurs at ribosomes in the cytoplasm.",
      "Key organelles include: the mitochondria (the 'powerhouse of the cell'), which generate adenosine triphosphate (ATP) through aerobic cellular respiration via the Krebs cycle and oxidative phosphorylation; the rough endoplasmic reticulum (RER), studded with ribosomes, which synthesizes and modifies proteins; the smooth endoplasmic reticulum (SER), which synthesizes lipids, steroids, and detoxifies drugs; the Golgi apparatus, which modifies, packages, and sorts proteins and lipids for transport or secretion; lysosomes, which contain digestive enzymes (hydrolases) that break down cellular waste, bacteria, and damaged organelles (autophagy); and peroxisomes, which detoxify harmful substances including hydrogen peroxide and fatty acids.",
      "The cytoskeleton provides structural support and facilitates cell movement. It consists of three types of filaments: microfilaments (actin filaments, involved in cell shape and muscle contraction), intermediate filaments (provide tensile strength and resist mechanical stress), and microtubules (composed of tubulin, form the mitotic spindle during cell division and provide tracks for intracellular transport). Centrioles, composed of microtubule triplets, play a critical role in organizing the mitotic spindle during cell division. The cell cycle consists of interphase (G1, S, G2 phases for growth and DNA replication) and the mitotic phase (M phase), which includes mitosis (nuclear division into two identical daughter cells) and cytokinesis (cytoplasmic division). Meiosis, occurring only in reproductive cells, produces four genetically unique haploid gametes through two rounds of division.",
      "Cells transport substances through passive and active mechanisms. Passive transport requires no energy: diffusion (movement from high to low concentration), osmosis (water movement across a semipermeable membrane toward higher solute concentration), and facilitated diffusion (using channel or carrier proteins). Active transport uses ATP to move substances against their concentration gradient via pumps such as the sodium-potassium ATPase pump (Na+/K+ pump), which moves 3 Na+ out and 2 K+ into the cell, maintaining the resting membrane potential essential for nerve impulse conduction. Endocytosis (phagocytosis, pinocytosis, receptor-mediated) brings large molecules into the cell, while exocytosis releases substances (e.g., neurotransmitters, hormones) from the cell.",
    ],
  },
  {
    id: "feedback-loops",
    name: "Homeostasis & Feedback Loops",
    icon: RefreshCw,
    color: "text-indigo-500",
    borderColor: "border-indigo-200",
    bgAccent: "bg-indigo-50",
    image: illustrationHomeostasis,
    description: "Negative and positive feedback mechanisms that maintain internal balance",
    content: [
      "Homeostasis is the body's ability to maintain a stable internal environment despite changes in external conditions. This dynamic equilibrium is essential for cellular function and survival. Homeostatic regulation requires three components: a receptor (sensor) that detects changes in the internal or external environment, a control center (integrator, usually the brain or endocrine gland) that processes the information and determines the appropriate response, and an effector (muscle or gland) that carries out the response to restore balance. Most homeostatic mechanisms operate through feedback loops, predominantly negative feedback, which is the primary mechanism for maintaining physiological stability.",
      "Negative feedback loops work to reverse or oppose a change, bringing a variable back toward its set point. This is the most common type of feedback in the human body. Thermoregulation is a classic example: when core body temperature rises above the set point (~37 degrees Celsius/98.6 degrees Fahrenheit), thermoreceptors in the skin and hypothalamus detect the change. The hypothalamus (control center) activates cooling mechanisms: vasodilation of cutaneous blood vessels increases heat loss through radiation, and sweat glands (effectors) produce sweat, which evaporates and cools the skin. When temperature drops below the set point, the hypothalamus triggers vasoconstriction, shivering (involuntary muscle contractions that generate heat), and piloerection (goosebumps). This negative feedback ensures temperature oscillates narrowly around the set point.",
      "Blood glucose regulation is another critical negative feedback loop. After eating, blood glucose levels rise. The beta cells of the pancreatic islets of Langerhans detect this increase and secrete insulin, which promotes glucose uptake by cells (especially skeletal muscle and adipose tissue), stimulates glycogenesis (glucose to glycogen storage in the liver), and inhibits gluconeogenesis (glucose production). These actions lower blood glucose back toward the set point (70-100 mg/dL fasting). Conversely, when blood glucose drops (e.g., between meals or during exercise), alpha cells of the pancreas secrete glucagon, which promotes glycogenolysis (glycogen breakdown) and gluconeogenesis in the liver, raising blood glucose. This glucose-insulin-glucagon interplay prevents both hyperglycemia and hypoglycemia.",
      "Blood pressure regulation involves the baroreceptor reflex, a negative feedback mechanism. Baroreceptors in the carotid sinus and aortic arch detect changes in arterial pressure. When blood pressure rises, these receptors send increased signals to the cardiovascular center in the medulla oblongata, which decreases sympathetic nervous system activity and increases parasympathetic (vagal) activity. This results in decreased heart rate, decreased force of contraction, and vasodilation, lowering blood pressure. When blood pressure drops, the opposite occurs: increased sympathetic output causes vasoconstriction, increased heart rate, and increased contractility. The renin-angiotensin-aldosterone system (RAAS) provides longer-term blood pressure regulation through sodium and water retention.",
      "Positive feedback loops amplify a change rather than reversing it, driving the system further from its starting point. These are less common and are typically self-limiting, ending when the stimulus is removed. Childbirth (parturition) is the most cited example: as the fetus descends into the birth canal, pressure on the cervix triggers stretch receptors that signal the hypothalamus. The hypothalamus stimulates the posterior pituitary to release oxytocin, which stimulates stronger uterine contractions, pushing the fetus further down, increasing cervical stretch, and triggering even more oxytocin release. This escalating cycle continues until the baby is delivered, removing the stimulus. Blood clotting (hemostatic cascade) is another positive feedback example: when a vessel is damaged, platelets adhere to the exposed collagen and release chemicals that attract more platelets, amplifying the platelet plug formation. Clotting factors activate each other in a cascade, rapidly generating a fibrin mesh to seal the wound. Lactation also involves positive feedback: infant suckling stimulates prolactin and oxytocin release, which promotes more milk production and the let-down reflex, maintaining the cycle as long as breastfeeding continues.",
    ],
  },
  {
    id: "cardiovascular",
    name: "Cardiovascular System",
    icon: Heart,
    color: "text-red-500",
    borderColor: "border-red-200",
    bgAccent: "bg-red-50",
    image: illustrationCardiacCycle,
    description: "Heart, blood vessels, and circulation",
    content: [
      "The cardiovascular system consists of the heart, blood vessels, and approximately 5 liters of blood. The heart is a four-chambered muscular organ divided into the right atrium, right ventricle, left atrium, and left ventricle. Deoxygenated blood returns to the right atrium via the superior and inferior vena cava, passes through the tricuspid valve into the right ventricle, and is pumped through the pulmonary valve into the pulmonary arteries toward the lungs. Oxygenated blood returns from the lungs via the pulmonary veins into the left atrium, passes through the mitral (bicuspid) valve into the left ventricle, and is ejected through the aortic valve into the aorta for systemic circulation.",
      "The cardiac cycle includes two phases: systole (contraction) and diastole (relaxation). During ventricular systole, the AV valves (tricuspid and mitral) close, producing the S1 heart sound ('lub'), while the semilunar valves (pulmonary and aortic) open to allow blood ejection. During diastole, the semilunar valves close (producing S2, the 'dub' sound), and the AV valves open for ventricular filling. The cardiac conduction system: consisting of the SA node, AV node, Bundle of His, bundle branches, and Purkinje fibers: coordinates this electrical activity. The SA node, located in the right atrium, is the natural pacemaker with an intrinsic rate of 60-100 beats per minute.",
      "Blood vessels are classified as arteries, arterioles, capillaries, venules, and veins. Arteries carry blood away from the heart and have thick, elastic walls to withstand high pressure. Capillaries are the smallest vessels where gas and nutrient exchange occurs across their single-cell endothelial walls. Veins return blood to the heart, contain valves to prevent backflow, and rely on skeletal muscle contraction for venous return. Coronary circulation supplies the myocardium itself: the left coronary artery branches into the left anterior descending (LAD) and circumflex arteries, while the right coronary artery (RCA) supplies the right side and inferior wall of the heart.",
    ],
  },
  {
    id: "respiratory",
    name: "Respiratory System",
    icon: Wind,
    color: "text-sky-500",
    borderColor: "border-sky-200",
    bgAccent: "bg-sky-50",
    image: illustrationCOPD,
    description: "Airways, lungs, and gas exchange",
    content: [
      "The respiratory system is divided into the upper and lower airways. The upper airway includes the nose, nasal cavity, pharynx (nasopharynx, oropharynx, and laryngopharynx), and larynx. These structures warm, humidify, and filter inspired air. The lower airway begins at the trachea, which bifurcates at the carina into the right and left mainstem bronchi. The right mainstem bronchus is shorter, wider, and more vertical, making it the more common site for aspiration. The bronchi further divide into lobar bronchi, segmental bronchi, bronchioles, terminal bronchioles, and finally respiratory bronchioles that lead to alveolar ducts and alveolar sacs.",
      "Gas exchange occurs at the alveolar-capillary membrane, a thin barrier (0.5 micrometers) composed of the alveolar epithelium, basement membrane, and capillary endothelium. There are approximately 300 million alveoli in the adult lungs, providing a surface area of about 70 square meters. Oxygen diffuses from the alveoli into the pulmonary capillaries along its concentration gradient, while carbon dioxide diffuses in the opposite direction. Type I alveolar cells facilitate gas exchange, while Type II alveolar cells produce surfactant, a phospholipid that reduces surface tension and prevents alveolar collapse (atelectasis).",
      "Ventilation is driven by pressure changes created by the diaphragm and intercostal muscles. During inspiration, the diaphragm contracts and descends, the external intercostals elevate the ribs, and intrapleural pressure becomes more negative, drawing air into the lungs (Boyle's Law). Expiration is normally passive, relying on elastic recoil. Lung volumes include tidal volume (TV, ~500 mL), inspiratory reserve volume (IRV, ~3000 mL), expiratory reserve volume (ERV, ~1100 mL), and residual volume (RV, ~1200 mL). Vital capacity is the sum of TV + IRV + ERV, while total lung capacity includes the residual volume. These measurements are assessed via spirometry and are essential for diagnosing restrictive and obstructive lung diseases.",
    ],
  },
  {
    id: "nervous",
    name: "Nervous System",
    icon: Brain,
    color: "text-purple-500",
    borderColor: "border-purple-200",
    bgAccent: "bg-purple-50",
    image: illustrationStroke,
    description: "Brain, spinal cord, and neural pathways",
    content: [
      "The nervous system is divided into the central nervous system (CNS): the brain and spinal cord: and the peripheral nervous system (PNS): cranial nerves, spinal nerves, and ganglia. The brain consists of the cerebrum (divided into frontal, parietal, temporal, and occipital lobes), the cerebellum (coordination and balance), the diencephalon (thalamus and hypothalamus), and the brainstem (midbrain, pons, and medulla oblongata). The medulla controls vital functions such as heart rate, blood pressure, and respiration. The spinal cord extends from the foramen magnum to approximately L1-L2 and serves as a conduit for ascending sensory and descending motor pathways.",
      "The fundamental unit of the nervous system is the neuron, composed of a cell body (soma), dendrites (receive signals), and an axon (transmits signals). Neurons communicate via synapses using neurotransmitters. Key neurotransmitters include acetylcholine (muscle contraction, parasympathetic activity), norepinephrine (sympathetic 'fight-or-flight' response), dopamine (reward, motor control), serotonin (mood, sleep regulation), GABA (inhibitory), and glutamate (excitatory). Action potentials propagate along myelinated axons via saltatory conduction, jumping between Nodes of Ranvier for rapid signal transmission.",
      "The PNS is further divided into the somatic nervous system (voluntary skeletal muscle control) and the autonomic nervous system (ANS), which regulates involuntary functions. The ANS has two divisions: the sympathetic ('fight or flight') system, which increases heart rate, dilates bronchioles, and diverts blood to muscles; and the parasympathetic ('rest and digest') system, which slows heart rate, increases GI motility, and promotes digestion. Reflex arcs are the simplest neural circuits: a stimulus activates a sensory receptor, the signal travels via an afferent neuron to the spinal cord, synapses with an interneuron or directly with an efferent motor neuron, producing a rapid involuntary response (e.g., the patellar reflex).",
    ],
  },
  {
    id: "musculoskeletal",
    name: "Musculoskeletal System",
    icon: Bone,
    color: "text-amber-600",
    borderColor: "border-amber-200",
    bgAccent: "bg-amber-50",
    image: illustrationOsteoporosis,
    description: "Bones, joints, and skeletal muscles",
    content: [
      "The adult human skeleton consists of 206 bones, classified by shape as long bones (femur, humerus), short bones (carpals, tarsals), flat bones (skull, sternum, scapula), irregular bones (vertebrae, pelvis), and sesamoid bones (patella). Bones serve as the framework for the body, protect internal organs, produce blood cells (hematopoiesis in red marrow), store minerals (calcium and phosphorus), and provide attachment points for muscles. Bone tissue is composed of an organic matrix (collagen for flexibility) and inorganic minerals (hydroxyapatite crystite for hardness). Osteoblasts build new bone, osteoclasts resorb bone, and osteocytes are mature bone cells that maintain the bone matrix.",
      "Joints (articulations) are classified structurally as fibrous (sutures, syndesmoses: immovable or slightly movable), cartilaginous (symphysis pubis, intervertebral discs: limited movement), and synovial (freely movable). Synovial joints include hinge (elbow, knee), ball-and-socket (shoulder, hip), pivot (atlantoaxial), saddle (carpometacarpal of thumb), condyloid (wrist), and gliding (intercarpal) types. Synovial joints are enclosed by a joint capsule lined with synovial membrane that secretes synovial fluid for lubrication and nourishment of articular cartilage.",
      "Skeletal muscle contraction follows the sliding filament theory. A motor neuron releases acetylcholine at the neuromuscular junction, which binds to receptors on the sarcolemma, generating an action potential. This signal travels along T-tubules, triggering calcium release from the sarcoplasmic reticulum. Calcium binds to troponin, causing a conformational change in tropomyosin that exposes myosin-binding sites on actin filaments. Myosin heads bind to actin, forming cross-bridges, and perform a power stroke using ATP hydrolysis, pulling the actin filaments toward the center of the sarcomere (the M-line). This shortens the sarcomere and produces muscle contraction. Relaxation occurs when calcium is pumped back into the sarcoplasmic reticulum.",
    ],
  },
  {
    id: "gastrointestinal",
    name: "Gastrointestinal System",
    icon: UtensilsCrossed,
    color: "text-green-600",
    borderColor: "border-green-200",
    bgAccent: "bg-green-50",
    image: illustrationElectrolytes,
    description: "Digestive organs and nutrient absorption",
    content: [
      "The gastrointestinal (GI) tract is a continuous tube from the mouth to the anus, consisting of the oral cavity, pharynx, esophagus, stomach, small intestine (duodenum, jejunum, ileum), large intestine (cecum, ascending, transverse, descending, and sigmoid colon), rectum, and anal canal. Digestion begins in the mouth with mechanical breakdown by teeth and chemical digestion by salivary amylase (starch) and lingual lipase (fats). The bolus travels through the esophagus via peristalsis, passing through the lower esophageal sphincter (cardiac sphincter) into the stomach. The stomach secretes hydrochloric acid (HCl) from parietal cells, pepsinogen from chief cells (activated to pepsin by HCl), and intrinsic factor (essential for vitamin B12 absorption in the ileum).",
      "The small intestine is the primary site of chemical digestion and nutrient absorption. The duodenum receives pancreatic enzymes (trypsin, lipase, amylase) and bile from the liver via the common bile duct at the ampulla of Vater (sphincter of Oddi). Bile salts emulsify fats into smaller droplets, increasing the surface area for lipase activity. The jejunum is the main site for absorption of carbohydrates, proteins, and water-soluble vitamins. The ileum absorbs bile salts, vitamin B12, and remaining nutrients. The intestinal mucosa is covered with villi and microvilli (brush border), dramatically increasing the absorptive surface area to approximately 200 square meters.",
      "The hepatobiliary system includes the liver, gallbladder, and bile ducts. The liver performs over 500 functions, including bile production, detoxification, protein synthesis (albumin, clotting factors), glycogen storage, and bilirubin metabolism. The gallbladder stores and concentrates bile, releasing it in response to cholecystokinin (CCK) secreted by the duodenum when fat enters the small intestine. The large intestine absorbs water and electrolytes, houses beneficial gut microbiota that synthesize vitamin K and certain B vitamins, and compacts waste into feces. The ileocecal valve prevents backflow from the colon into the ileum.",
    ],
  },
  {
    id: "renal",
    name: "Renal/Urinary System",
    icon: Droplets,
    color: "text-blue-500",
    borderColor: "border-blue-200",
    bgAccent: "bg-blue-50",
    image: illustrationKidneys,
    description: "Kidneys, nephrons, and fluid balance",
    content: [
      "The urinary system consists of two kidneys, two ureters, the urinary bladder, and the urethra. The kidneys are retroperitoneal organs located at T12-L3, with the right kidney slightly lower due to the liver. Each kidney contains approximately one million nephrons: the functional units responsible for urine formation. A nephron consists of the glomerulus (a capillary tuft enclosed by Bowman's capsule), the proximal convoluted tubule (PCT), the loop of Henle (descending and ascending limbs), the distal convoluted tubule (DCT), and the collecting duct. The kidneys receive about 20-25% of cardiac output, filtering approximately 180 liters of plasma daily, yet producing only 1-2 liters of urine.",
      "Urine formation involves three processes: glomerular filtration, tubular reabsorption, and tubular secretion. Filtration occurs at the glomerulus, where hydrostatic pressure forces water, electrolytes, glucose, amino acids, and waste products through the filtration membrane into Bowman's capsule. The glomerular filtration rate (GFR) is approximately 125 mL/min and is a key indicator of renal function. Tubular reabsorption occurs primarily in the PCT, where 65% of filtered sodium, water, glucose, and amino acids are reabsorbed. The loop of Henle establishes the osmotic gradient in the renal medulla via countercurrent multiplication. The DCT and collecting duct fine-tune reabsorption under the influence of aldosterone (sodium retention) and antidiuretic hormone (ADH/vasopressin, water reabsorption).",
      "The kidneys play a critical role in acid-base balance by reabsorbing bicarbonate (HCO3−), secreting hydrogen ions (H+), and producing new bicarbonate. The normal arterial blood pH is 7.35-7.45. Metabolic acidosis (pH < 7.35, low HCO3−) can result from diabetic ketoacidosis, renal failure, or severe diarrhea. Metabolic alkalosis (pH > 7.45, high HCO3−) may be caused by vomiting, nasogastric suction, or excessive antacid use. The kidneys also produce erythropoietin (stimulates red blood cell production), activate vitamin D (calcitriol, for calcium absorption), and secrete renin (part of the renin-angiotensin-aldosterone system that regulates blood pressure).",
    ],
  },
  {
    id: "endocrine",
    name: "Endocrine System",
    icon: Zap,
    color: "text-yellow-500",
    borderColor: "border-yellow-200",
    bgAccent: "bg-yellow-50",
    image: illustrationHomeostasis,
    description: "Hormones, glands, and feedback loops",
    content: [
      "The endocrine system consists of glands that produce hormones: chemical messengers transported via the bloodstream to target organs. Major endocrine glands include the hypothalamus, pituitary (anterior and posterior), thyroid, parathyroid, adrenal glands (cortex and medulla), pancreatic islets of Langerhans, ovaries, and testes. The hypothalamus links the nervous and endocrine systems by producing releasing and inhibiting hormones that control the anterior pituitary. The anterior pituitary secretes growth hormone (GH), thyroid-stimulating hormone (TSH), adrenocorticotropic hormone (ACTH), follicle-stimulating hormone (FSH), luteinizing hormone (LH), and prolactin.",
      "Hormone regulation primarily operates through negative feedback mechanisms. For example, the hypothalamic-pituitary-thyroid axis: the hypothalamus releases thyrotropin-releasing hormone (TRH), which stimulates the anterior pituitary to release TSH, which stimulates the thyroid to produce T3 and T4. When thyroid hormone levels are sufficient, they inhibit further TRH and TSH release. The thyroid hormones regulate metabolism, heat production, and growth. The parathyroid glands secrete parathyroid hormone (PTH) in response to low serum calcium, promoting calcium release from bones, calcium reabsorption in the kidneys, and activation of vitamin D. Calcitonin from the thyroid has the opposite effect, lowering blood calcium.",
      "The adrenal cortex produces three classes of steroid hormones: glucocorticoids (cortisol: stress response, anti-inflammatory, gluconeogenesis), mineralocorticoids (aldosterone: sodium and water retention, potassium excretion), and androgens. The adrenal medulla secretes catecholamines (epinephrine and norepinephrine) during the sympathetic stress response. The pancreatic islets contain beta cells (insulin: lowers blood glucose by promoting cellular uptake and glycogen synthesis) and alpha cells (glucagon: raises blood glucose by promoting glycogenolysis and gluconeogenesis). Insulin and glucagon work in opposition to maintain blood glucose homeostasis between 70-100 mg/dL.",
    ],
  },
  {
    id: "integumentary",
    name: "Integumentary System",
    icon: Shield,
    color: "text-orange-500",
    borderColor: "border-orange-200",
    bgAccent: "bg-orange-50",
    image: illustrationWound,
    description: "Skin layers, wound healing, and protection",
    content: [
      "The integumentary system includes the skin, hair, nails, and associated glands. The skin is the body's largest organ, covering approximately 1.5-2 square meters in adults. It consists of three primary layers: the epidermis, dermis, and hypodermis (subcutaneous tissue). The epidermis is the outermost layer, composed of stratified squamous keratinized epithelium. Its layers from deep to superficial are: stratum basale (basal layer with stem cells and melanocytes), stratum spinosum, stratum granulosum, stratum lucidum (only in thick skin like palms and soles), and stratum corneum (20-30 layers of dead keratinized cells providing the primary barrier).",
      "The dermis lies beneath the epidermis and is composed of connective tissue containing collagen and elastin fibers, blood vessels, nerve endings, hair follicles, and glands. The papillary dermis contains dermal papillae that interlock with the epidermis and house Meissner's corpuscles (light touch). The reticular dermis is thicker and contains Pacinian corpuscles (deep pressure/vibration), sebaceous glands (oil), and sudoriferous glands (eccrine for thermoregulation throughout the body; apocrine in axillae and groin). The hypodermis contains adipose tissue for insulation, energy storage, and cushioning.",
      "Wound healing occurs in four overlapping phases. The hemostasis phase (immediate) involves vasoconstriction and platelet plug formation, followed by fibrin clot stabilization. The inflammatory phase (1-4 days) features vasodilation, increased permeability, and migration of neutrophils and macrophages to clean debris and prevent infection. The proliferative phase (4-21 days) involves granulation tissue formation, angiogenesis (new blood vessel growth), fibroblast activity producing collagen, and epithelialization (wound closure from edges). The remodeling/maturation phase (21 days to 2 years) involves collagen reorganization and strengthening, though healed tissue typically only reaches 80% of the original tissue's tensile strength. Thermoregulation is achieved through vasodilation (heat dissipation), vasoconstriction (heat conservation), and eccrine sweat gland activation.",
    ],
  },
  {
    id: "lymphatic-immune",
    name: "Lymphatic/Immune System",
    icon: ShieldCheck,
    color: "text-teal-500",
    borderColor: "border-teal-200",
    bgAccent: "bg-teal-50",
    image: illustrationInnateImmunity,
    description: "Immune defense, lymph nodes, and antibodies",
    content: [
      "The immune system provides defense against pathogens through innate (nonspecific) and adaptive (specific) immunity. Innate immunity is the first line of defense, including physical barriers (skin, mucous membranes), chemical barriers (stomach acid, lysozyme in tears), cellular components (neutrophils, macrophages, natural killer cells, dendritic cells), and the inflammatory response. Phagocytic cells recognize pathogen-associated molecular patterns (PAMPs) via toll-like receptors (TLRs). The complement cascade is a group of ~30 plasma proteins that, when activated, promote opsonization (coating pathogens for phagocytosis), chemotaxis (attracting immune cells), and formation of the membrane attack complex (MAC) that creates pores in pathogen cell membranes.",
      "Adaptive immunity is specific, has memory, and involves lymphocytes. B lymphocytes (humoral immunity) mature in the bone marrow and, when activated by antigen and helper T cells, differentiate into plasma cells that produce antibodies (immunoglobulins). The five antibody classes are: IgG (most abundant, crosses placenta, provides passive immunity to newborns), IgA (found in secretions: saliva, breast milk, GI tract), IgM (first antibody produced in primary immune response, largest), IgE (allergic reactions and parasitic infections, triggers mast cell degranulation), and IgD (B cell activation). T lymphocytes mature in the thymus and include CD4+ helper T cells (coordinate immune response), CD8+ cytotoxic T cells (kill infected cells), and regulatory T cells (suppress immune response to prevent autoimmunity).",
      "The lymphatic system includes lymph vessels, lymph nodes, the spleen, thymus, and tonsils. Lymph vessels collect excess interstitial fluid (lymph) and return it to the bloodstream via the thoracic duct (drains into the left subclavian vein). Lymph nodes filter lymph and house lymphocytes and macrophages; they are concentrated in the cervical, axillary, and inguinal regions. The spleen filters blood, removes old red blood cells, and stores platelets. The thymus is most active during childhood and is the site of T cell maturation. Active immunity develops from exposure to antigens (infection or vaccination) and provides long-term protection via memory cells. Passive immunity involves the transfer of preformed antibodies (maternal IgG, immunoglobulin injections) and provides immediate but temporary protection.",
    ],
  },
  {
    id: "reproductive",
    name: "Reproductive System",
    icon: Baby,
    color: "text-pink-500",
    borderColor: "border-pink-200",
    bgAccent: "bg-pink-50",
    image: illustrationInflammatoryResponse,
    description: "Male and female reproductive anatomy",
    content: [
      "The female reproductive system includes the ovaries, fallopian tubes (oviducts), uterus, cervix, vagina, and external genitalia (vulva). The ovaries produce oocytes (eggs) and secrete estrogen and progesterone. Each month, one dominant follicle matures and releases an oocyte during ovulation, typically around day 14 of a 28-day cycle. The fallopian tubes transport the oocyte toward the uterus; fertilization typically occurs in the ampulla of the fallopian tube. The uterus has three layers: the perimetrium (outer serous layer), myometrium (thick muscular layer responsible for labor contractions), and endometrium (inner lining that thickens in preparation for implantation and is shed during menstruation).",
      "The menstrual cycle is regulated by the hypothalamic-pituitary-ovarian axis and consists of three phases. The follicular phase (days 1-13): FSH from the anterior pituitary stimulates follicular development; the growing follicle secretes increasing amounts of estrogen, which causes endometrial proliferation. Ovulation (day 14): a surge in LH triggers the release of the mature oocyte. The luteal phase (days 15-28): the ruptured follicle becomes the corpus luteum, secreting progesterone (and some estrogen) to maintain the secretory endometrium. If fertilization does not occur, the corpus luteum degenerates, progesterone drops, and the endometrium is shed (menstruation). If fertilization occurs, human chorionic gonadotropin (hCG) from the developing embryo maintains the corpus luteum.",
      "The male reproductive system includes the testes, epididymis, vas deferens, seminal vesicles, prostate gland, bulbourethral (Cowper's) glands, and penis. The testes produce spermatozoa (in the seminiferous tubules via spermatogenesis) and testosterone (from Leydig/interstitial cells). Spermatogenesis takes approximately 74 days and is regulated by FSH (acts on Sertoli cells to support sperm maturation) and LH (stimulates testosterone production). Sperm mature and are stored in the epididymis, then travel through the vas deferens during ejaculation. Fetal development proceeds through three trimesters: the embryonic period (weeks 1-8) involves organogenesis and is the most critical period for teratogenic exposure; the fetal period (weeks 9-40) involves growth and maturation of organ systems. Key milestones include fetal heart tones detectable by Doppler at 10-12 weeks, viability at approximately 24 weeks, and surfactant production beginning around 24-28 weeks.",
    ],
  },
];

export default function AnatomyPage() {
  const [expandedSystems, setExpandedSystems] = useState<Set<string>>(new Set());
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  const isAdmin = user?.tier === "admin";

  const toggleSystem = (id: string) => {
    setExpandedSystems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col" data-testid="page-anatomy">
      <Navigation />

      <section className="relative overflow-hidden py-16 md:py-24" data-testid="section-hero-anatomy">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent-foreground/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-6" data-testid="badge-free">
              <Sparkles className="w-4 h-4" />
              100% Free Content
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" data-testid="heading-anatomy">
              Anatomy & Physiology
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6" data-testid="text-anatomy-description">
              Master the foundations of nursing with our comprehensive A&P review. Each body system includes detailed educational content covering structure, function, and key clinical concepts: completely free, no subscription required.
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <BookOpen className="w-4 h-4" />
              <span>12 topics · Cell biology to organ systems · Exam-ready review</span>
            </div>
            {isAdmin && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isEditing
                    ? "bg-amber-100 text-amber-800 border border-amber-300"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                data-testid="button-toggle-anatomy-edit"
              >
                {isEditing ? "Exit Image Editing" : "Manage Images"}
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20" data-testid="section-body-systems">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {bodySystems.map((system) => {
            const isExpanded = expandedSystems.has(system.id);
            const IconComponent = system.icon;

            return (
              <Card
                key={system.id}
                className={`transition-all duration-300 border-2 ${isExpanded ? system.borderColor : "border-transparent"} hover:shadow-lg overflow-hidden`}
                data-testid={`card-system-${system.id}`}
              >
                <div
                  className="h-40 overflow-hidden bg-gray-50 cursor-pointer"
                  onClick={() => toggleSystem(system.id)}
                >
                  <img
                    src={system.image}
                    alt={system.name}
                    className="w-full h-full object-contain p-2 transition-transform duration-500 hover:scale-105"
                    draggable={false}
                  />
                </div>
                <CardHeader
                  className="cursor-pointer select-none"
                  onClick={() => toggleSystem(system.id)}
                  data-testid={`button-toggle-${system.id}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl ${system.bgAccent} flex items-center justify-center`}>
                        <IconComponent className={`w-5 h-5 ${system.color}`} />
                      </div>
                      <div>
                        <CardTitle className="text-lg" data-testid={`title-system-${system.id}`}>
                          {system.name}
                        </CardTitle>
                        <CardDescription data-testid={`desc-system-${system.id}`}>
                          {system.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className={`mt-1 transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                </CardHeader>

                {isExpanded && (
                  <CardContent className="pt-0 animate-in fade-in-0 slide-in-from-top-2 duration-300" data-testid={`content-system-${system.id}`}>
                    <div className={`border-t ${system.borderColor} pt-4 space-y-4`}>
                      <LessonImageManager
                        lessonId={`anatomy-${system.id}`}
                        section="anatomy"
                        isAdmin={isAdmin}
                        isEditing={isEditing}
                      />
                      {system.content.map((paragraph, idx) => (
                        <p key={idx} className="text-sm text-gray-700 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                      {system.id === "cell-structure" && (
                        <Link href="/lectures/cell-anatomy">
                          <div
                            className="flex items-center gap-3 p-4 mt-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 hover:border-emerald-300 cursor-pointer transition-all group hover:shadow-md"
                            data-testid="link-cell-anatomy-lecture"
                          >
                            <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 group-hover:bg-emerald-200 transition-colors">
                              <PlayCircle className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-900">Cell Anatomy & Cellular Biology – Video Lecture</span>
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-green-100 text-green-700 uppercase">Free</span>
                              </div>
                              <span className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                                <Video className="w-3 h-3" />Watch the full video lecture on cell biology foundations
                              </span>
                            </div>
                            <ChevronDown className="w-4 h-4 text-emerald-500 -rotate-90 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                          </div>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>

        <div className="mt-12 text-center" data-testid="section-cta-bottom">
          <p className="text-gray-600 mb-4">
            Ready to test your knowledge? Explore our premium study tools.
          </p>
          <Link href="/pricing">
            <span className="inline-flex items-center gap-2 bg-primary hover:brightness-110 text-white rounded-full px-6 py-3 font-semibold shadow-md shadow-primary/20 transition-all hover:-translate-y-0.5 cursor-pointer" data-testid="link-pricing-cta">
              View Study Plans
            </span>
          </Link>
        </div>
      </section>
      <AdminEditButton />
      <Footer />
    </div>
  );
}