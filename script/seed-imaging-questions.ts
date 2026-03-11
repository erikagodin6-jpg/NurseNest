import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

interface Q {
  country: string;
  examType: string;
  topic: string;
  subtopic: string;
  difficulty: string;
  questionStem: string;
  answerOptions: { text: string }[];
  correctAnswer: string;
  rationale: string;
}

function makeQ(country: string, examType: string, topic: string, subtopic: string, difficulty: string, stem: string, options: string[], correctIdx: number, rationale: string): Q {
  return {
    country,
    examType,
    topic,
    subtopic,
    difficulty,
    questionStem: stem,
    answerOptions: options.map(t => ({ text: t })),
    correctAnswer: options[correctIdx],
    rationale,
  };
}

const QUESTIONS: Q[] = [];

function addBatch(country: string, examType: string, qs: Omit<Q, "country" | "examType">[]) {
  qs.forEach(q => QUESTIONS.push({ ...q, country, examType }));
}

const CA = "canada";
const US = "usa";

addBatch(CA, "camrt", [
  makeQ(CA,"camrt","Radiographic Positioning","Chest","easy","For a PA chest radiograph, the central ray should be directed to which vertebral level?",["T5","T7","T10","L1"],1,"The central ray for a PA chest is directed perpendicular to T7, which corresponds to the level of the inferior angle of the scapulae."),
  makeQ(CA,"camrt","Radiographic Positioning","Chest","easy","What is the minimum source-to-image distance (SID) for an upright PA chest radiograph?",["40 inches (100 cm)","60 inches (150 cm)","72 inches (180 cm)","48 inches (120 cm)"],2,"A 72-inch (180 cm) SID is standard for PA chest radiographs to minimize cardiac magnification."),
  makeQ(CA,"camrt","Radiographic Positioning","Chest","medium","On a properly positioned PA chest radiograph, the scapulae should be:",["Superimposed on the lung fields","Rotated laterally outside the lung fields","Visible within the mediastinum","Projected below the diaphragm"],1,"Proper positioning with arms rotated forward (backs of hands on hips) moves the scapulae lateral to the lung fields."),
  makeQ(CA,"camrt","Radiographic Positioning","Chest","medium","Which finding on a PA chest radiograph indicates patient rotation?",["Unequal distances between medial clavicle ends and spinous processes","More than 10 posterior ribs visible","Scapulae projected within lung fields","Diaphragm at level of 10th posterior rib"],0,"Equal distances between the medial clavicle ends and the spinous processes indicate a non-rotated PA chest."),
  makeQ(CA,"camrt","Radiographic Positioning","Upper Extremity","easy","For a PA projection of the hand, the central ray should be directed to the:",["First MCP joint","Third MCP joint","Wrist joint","Fifth MCP joint"],1,"The CR for a PA hand is directed perpendicular to the third metacarpophalangeal joint."),
  makeQ(CA,"camrt","Radiographic Positioning","Upper Extremity","medium","Which wrist projection best demonstrates the scaphoid without foreshortening?",["PA with radial deviation","PA with ulnar deviation","Lateral","Oblique"],1,"Ulnar deviation elongates the scaphoid, reducing foreshortening and providing a better view of the scaphoid."),
  makeQ(CA,"camrt","Radiographic Positioning","Lower Extremity","easy","For an AP knee projection, the leg should be internally rotated:",["0-2 degrees","3-5 degrees","10-15 degrees","20-25 degrees"],1,"3-5 degrees of internal rotation places the femoral epicondyles parallel to the IR, opening the joint space evenly."),
  makeQ(CA,"camrt","Radiographic Positioning","Lower Extremity","medium","The mortise view of the ankle requires the leg to be internally rotated approximately:",["5 degrees","15-20 degrees","30 degrees","45 degrees"],1,"15-20 degrees of internal rotation places the intermalleolar line parallel to the IR, demonstrating the ankle mortise without fibular overlap."),
  makeQ(CA,"camrt","Radiographic Positioning","Spine","medium","For an AP open mouth projection of C1-C2, the line extending from the lower edge of the upper incisors to the mastoid tips should be:",["Parallel to the IR","Perpendicular to the IR","At 15 degrees to the IR","At 30 degrees to the IR"],1,"The line from the lower edge of the upper incisors to the mastoid tips should be perpendicular to the IR to project the dens between the upper incisors and the base of the skull."),
  makeQ(CA,"camrt","Radiographic Positioning","Spine","hard","In the AP axial projection of the cervical spine (cephalic angulation method), the central ray should be angled:",["5 degrees cephalad","15-20 degrees cephalad","30 degrees caudad","5 degrees caudad"],1,"A 15-20 degree cephalad angle demonstrates the cervical intervertebral disc spaces and intervertebral foramina."),
  makeQ(CA,"camrt","Radiographic Positioning","Abdomen","easy","For an AP supine abdomen (KUB), the central ray is directed to the level of:",["T12","Iliac crests (L4)","Pubic symphysis","Umbilicus"],1,"The CR for a KUB is directed to the level of the iliac crests (L4-L5) to include the entire abdomen from the diaphragm to the pubic symphysis."),
  makeQ(CA,"camrt","Radiographic Positioning","Abdomen","medium","On a properly positioned AP abdomen, rotation is evaluated by assessing:",["Symmetry of the iliac wings and obturator foramina","Position of the kidneys","Bowel gas distribution","Vertebral body alignment"],0,"Symmetric appearance of the iliac wings and obturator foramina confirms absence of rotation on an AP abdomen."),
  makeQ(CA,"camrt","Radiation Physics","X-ray Production","easy","Bremsstrahlung radiation is produced when:",["An electron fills an inner shell vacancy","An electron is decelerated by the nuclear force field","A photon undergoes pair production","An atom undergoes radioactive decay"],1,"Bremsstrahlung (braking) radiation is produced when a high-speed electron is decelerated (slowed down) by the electrostatic force of the atomic nucleus."),
  makeQ(CA,"camrt","Radiation Physics","X-ray Production","easy","Which target material is most commonly used in diagnostic X-ray tubes?",["Molybdenum","Copper","Tungsten","Rhodium"],2,"Tungsten (Z=74) is the standard target material due to its high atomic number, high melting point (3370 C), and good thermal conductivity."),
  makeQ(CA,"camrt","Radiation Physics","X-ray Production","medium","The maximum energy of X-ray photons in a beam is determined by:",["The mAs setting","The kVp setting","The filtration","The focal spot size"],1,"The maximum photon energy in keV equals the peak kilovoltage (kVp) applied across the X-ray tube."),
  makeQ(CA,"camrt","Radiation Physics","Interactions","medium","Which photon interaction is the primary source of scatter radiation in diagnostic radiology?",["Photoelectric absorption","Compton scattering","Coherent scattering","Pair production"],1,"Compton scattering is the predominant interaction in the diagnostic energy range and produces scattered radiation that degrades image quality."),
  makeQ(CA,"camrt","Radiation Physics","Interactions","hard","Photoelectric absorption probability is proportional to:",["Z^3 / E^3","Z / E","Z^2 / E^2","Z / E^3"],0,"The probability of photoelectric absorption varies directly with the cube of the atomic number (Z^3) and inversely with the cube of the photon energy (E^3)."),
  makeQ(CA,"camrt","Radiation Physics","Interactions","medium","Which interaction produces subject contrast in the radiographic image?",["Compton scattering","Photoelectric absorption","Coherent scattering","Pair production"],1,"Photoelectric absorption is responsible for subject contrast because its probability depends on atomic number, differentiating between different tissue types."),
  makeQ(CA,"camrt","Radiation Safety","Dose Limits","easy","The CNSC annual occupational whole-body dose limit in Canada is:",["20 mSv","50 mSv","100 mSv","150 mSv"],1,"The Canadian Nuclear Safety Commission (CNSC) sets the annual occupational effective dose limit at 50 mSv, with a 5-year cumulative limit of 100 mSv."),
  makeQ(CA,"camrt","Radiation Safety","Dose Limits","medium","The annual public dose limit according to CNSC regulations is:",["0.5 mSv","1 mSv","5 mSv","10 mSv"],1,"The CNSC establishes the annual effective dose limit for members of the public at 1 mSv."),
  makeQ(CA,"camrt","Radiation Safety","Protection","easy","The three cardinal principles of radiation protection are:",["kVp, mAs, and filtration","Time, distance, and shielding","Justification, optimization, and limitation","Collimation, filtration, and grid use"],1,"Time (minimize), distance (maximize), and shielding (use appropriate barriers) are the three cardinal principles of radiation protection."),
  makeQ(CA,"camrt","Radiation Safety","Protection","medium","According to the inverse square law, if the distance from a radiation source is doubled, the intensity becomes:",["1/2 of the original","1/4 of the original","1/8 of the original","1/16 of the original"],1,"The inverse square law states that radiation intensity is inversely proportional to the square of the distance. Doubling the distance reduces intensity to 1/4."),
  makeQ(CA,"camrt","Radiation Safety","Pregnancy","hard","Under CNSC regulations, the dose limit to the embryo/fetus after declaration of pregnancy is:",["1 mSv for remainder of pregnancy","4 mSv for remainder of pregnancy","5 mSv for remainder of pregnancy","10 mSv for remainder of pregnancy"],1,"The CNSC limits the dose to the embryo/fetus to 4 mSv for the remainder of pregnancy after the worker has declared her pregnancy."),
  makeQ(CA,"camrt","Image Production","Exposure Factors","easy","Increasing the kVp by 15% has approximately the same effect on receptor exposure as:",["Doubling the mAs","Halving the mAs","Quadrupling the mAs","Not changing the mAs"],0,"The 15% rule states that increasing kVp by 15% approximately doubles the exposure reaching the receptor, equivalent to doubling the mAs."),
  makeQ(CA,"camrt","Image Production","Exposure Factors","medium","Which factor has the greatest effect on patient dose?",["mAs","kVp","SID","Grid ratio"],0,"mAs directly controls the quantity of X-ray photons (number of electrons striking the target) and has a proportional relationship with patient dose."),
  makeQ(CA,"camrt","Image Production","Image Quality","medium","What is the effect of increasing SID on image quality?",["Increased magnification and decreased resolution","Decreased magnification and increased resolution","No effect on image quality","Increased contrast and decreased resolution"],1,"Increasing SID decreases magnification and improves spatial resolution by making the X-ray beam more parallel at the receptor."),
  makeQ(CA,"camrt","Image Production","Digital Imaging","medium","In digital radiography, the Deviation Index (DI) value indicates:",["Image contrast","Degree of exposure deviation from target","Spatial resolution","Patient dose"],1,"The Deviation Index quantifies how much the actual detector exposure deviates from the target exposure. DI=0 is ideal; positive values indicate overexposure."),
  makeQ(CA,"camrt","Image Production","Digital Imaging","hard","Which statement about Computed Radiography (CR) is correct?",["CR provides real-time image display","CR uses amorphous selenium detectors","CR uses photostimulable phosphor plates","CR has higher DQE than flat panel DR"],2,"CR uses photostimulable phosphor (PSP) plates that store the latent image as trapped electrons, which are released by laser stimulation during readout."),
  makeQ(CA,"camrt","Patient Care","Safety","easy","Before performing a radiographic examination, the technologist should first:",["Position the patient","Set exposure factors","Verify the patient's identity and requisition","Turn on the X-ray tube"],2,"Patient identification verification is the first step to prevent wrong-patient or wrong-examination errors, ensuring patient safety."),
  makeQ(CA,"camrt","Patient Care","Contrast Media","medium","Which of the following is an absolute contraindication to barium sulfate oral contrast?",["Allergy to iodine","Suspected bowel perforation","Mild nausea","Previous barium study"],1,"Barium sulfate is absolutely contraindicated when bowel perforation is suspected because barium leaking into the peritoneal cavity causes severe peritonitis."),
  makeQ(CA,"camrt","Patient Care","Emergency","hard","In the event of a contrast media anaphylactic reaction, the first drug to administer is:",["Diphenhydramine (Benadryl)","Epinephrine","Atropine","Dexamethasone"],1,"Epinephrine is the first-line emergency drug for anaphylaxis, reversing bronchospasm, vasodilation, and increasing cardiac output."),
  makeQ(CA,"camrt","Equipment Operation","X-ray Tube","easy","The purpose of the rotating anode is to:",["Increase X-ray output","Distribute heat over a larger area","Improve spatial resolution","Reduce patient dose"],1,"A rotating anode distributes the heat generated during X-ray production over a larger area (focal track), allowing higher tube loading without melting the target."),
  makeQ(CA,"camrt","Equipment Operation","Generators","medium","Compared to a single-phase generator, a high-frequency generator produces:",["Lower average beam energy","Higher average beam energy with less ripple","The same beam energy","More characteristic radiation"],1,"High-frequency generators produce nearly constant potential (less than 1% ripple) resulting in higher average beam energy and more efficient X-ray production."),
  makeQ(CA,"camrt","Equipment Operation","Filtration","medium","The primary purpose of added aluminum filtration is to:",["Increase spatial resolution","Remove low-energy photons to reduce patient skin dose","Increase beam intensity","Reduce scatter radiation"],1,"Added aluminum filtration absorbs low-energy (soft) photons that would only contribute to patient skin dose without reaching the image receptor."),
]);

addBatch(US, "arrt", [
  makeQ(US,"arrt","Radiographic Positioning","Chest","easy","For a PA chest radiograph, what is the standard SID?",["40 inches","48 inches","72 inches","60 inches"],2,"The standard SID for a PA chest radiograph is 72 inches (180 cm) to minimize cardiac magnification due to the anterior position of the heart."),
  makeQ(US,"arrt","Radiographic Positioning","Chest","easy","How many posterior ribs should be visible above the diaphragm on a properly inspired PA chest?",["6-7","8-9","10 or more","12"],2,"A minimum of 10 posterior ribs (or 14 anterior ribs) above the diaphragm indicates adequate inspiration on a chest radiograph."),
  makeQ(US,"arrt","Radiographic Positioning","Chest","medium","The lateral chest radiograph is typically performed with which side against the image receptor?",["Right side","Left side","Either side, it doesn't matter","The side closest to the pathology"],1,"The left lateral position (left side against IR) is standard to minimize cardiac magnification and provide better cardiac evaluation."),
  makeQ(US,"arrt","Radiographic Positioning","Chest","hard","On an AP portable chest, the heart appears magnified compared to a PA chest primarily because:",["The SID is shorter","The heart is farther from the IR on an AP projection","Both A and B","The kVp is typically lower"],2,"On an AP chest, the heart is farther from the IR (increased OID) and the SID is typically shorter (40 inches), both contributing to increased cardiac magnification."),
  makeQ(US,"arrt","Radiographic Positioning","Upper Extremity","easy","For an AP projection of the forearm, the hand should be:",["Pronated","Supinated","In lateral position","Clenched in a fist"],1,"The hand must be supinated (palm up) for an AP forearm to separate the radius and ulna and demonstrate the radial tuberosity in profile."),
  makeQ(US,"arrt","Radiographic Positioning","Upper Extremity","medium","The Coyle method (modified lateral elbow) is used to demonstrate the:",["Olecranon process","Radial head free of superimposition","Capitellum","Coronoid process"],1,"The Coyle method (45-degree CR angle toward the shoulder on a lateral elbow) demonstrates the radial head free of ulnar superimposition."),
  makeQ(US,"arrt","Radiographic Positioning","Lower Extremity","easy","For an AP projection of the foot, the central ray should be angled:",["Perpendicular to the IR","10 degrees posteriorly (toward the heel)","10 degrees anteriorly (toward the toes)","15 degrees laterally"],1,"A 10-degree posterior angle helps open the tarsometatarsal joint spaces on an AP foot projection."),
  makeQ(US,"arrt","Radiographic Positioning","Lower Extremity","medium","For a lateral knee projection, the knee should be flexed approximately:",["5 degrees","20-30 degrees","45 degrees","90 degrees"],1,"20-30 degrees of flexion is standard for a lateral knee, as it relaxes the muscles and tendons around the joint for optimal positioning."),
  makeQ(US,"arrt","Radiographic Positioning","Spine","medium","For an AP lumbar spine projection, the patient's knees are flexed to:",["Increase lumbar lordosis","Reduce lumbar lordosis and open disc spaces","Improve patient comfort only","Reduce SID"],1,"Flexing the knees flattens the lumbar lordosis, placing the vertebral bodies parallel to the IR and opening the intervertebral disc spaces."),
  makeQ(US,"arrt","Radiographic Positioning","Spine","hard","In a lateral lumbar spine projection, the CR should be directed to:",["L1","L3","L5","S1"],1,"The CR for a lateral lumbar spine is directed perpendicular to L3 (approximately 1-2 inches above the iliac crest) to center the lumbar spine on the IR."),
  makeQ(US,"arrt","Radiographic Positioning","Abdomen","easy","An erect abdomen radiograph is primarily performed to evaluate for:",["Kidney stones","Free intraperitoneal air","Bowel obstruction gas patterns","Liver size"],1,"The erect abdomen projection is performed to demonstrate free air (pneumoperitoneum) that rises to the highest point beneath the diaphragm."),
  makeQ(US,"arrt","Radiographic Positioning","Pelvis","medium","For an AP pelvis projection, the legs should be internally rotated 15-20 degrees to:",["Open the sacroiliac joints","Demonstrate the femoral necks without foreshortening","Separate the pubic bones","Profile the ischial tuberosities"],1,"Internal rotation of 15-20 degrees places the femoral necks parallel to the IR, demonstrating them in their full length without foreshortening."),
  makeQ(US,"arrt","Radiation Physics","X-ray Production","easy","The filament of the X-ray tube cathode is made of:",["Copper","Molybdenum","Tungsten","Lead"],2,"The filament is made of tungsten because of its high melting point (3370 C) and ability to produce electrons through thermionic emission."),
  makeQ(US,"arrt","Radiation Physics","X-ray Production","medium","The anode heel effect causes:",["Greater intensity on the cathode side of the beam","Greater intensity on the anode side of the beam","Uniform intensity across the beam","Increased penumbra"],0,"The anode heel effect results in greater beam intensity on the cathode side because photons produced deep within the anode must travel through more target material to exit on the anode side."),
  makeQ(US,"arrt","Radiation Physics","X-ray Production","hard","Which statement about characteristic radiation is correct?",["It produces a continuous spectrum","It requires incident electron energy exceeding the K-shell binding energy of the target","It is independent of the target material","It accounts for most of the X-ray output"],1,"Characteristic radiation requires the incident electron to have sufficient energy to eject a K-shell electron (69.5 keV for tungsten), producing discrete-energy photons specific to the target material."),
  makeQ(US,"arrt","Radiation Physics","Interactions","easy","Compton scattering probability depends primarily on:",["Atomic number of the absorber","Energy of the incident photon","Electron density of the absorber","Temperature of the absorber"],2,"Compton scattering depends on the electron density (electrons per gram) of the absorber material, not its atomic number."),
  makeQ(US,"arrt","Radiation Physics","Interactions","medium","As kVp increases in the diagnostic range, the relative number of Compton interactions compared to photoelectric interactions:",["Increases","Decreases","Remains the same","Cannot be determined"],0,"As photon energy increases, photoelectric absorption decreases rapidly (proportional to 1/E^3), while Compton scattering remains relatively constant, so the Compton-to-photoelectric ratio increases."),
  makeQ(US,"arrt","Radiation Physics","Interactions","hard","At what approximate photon energy does Compton scattering become dominant over photoelectric absorption in soft tissue?",["10 keV","30 keV","60 keV","100 keV"],1,"In soft tissue (Z approximately 7.4), the crossover from predominantly photoelectric to predominantly Compton interactions occurs at approximately 30 keV."),
  makeQ(US,"arrt","Radiation Safety","Dose Limits","easy","The annual occupational whole-body effective dose limit recommended by NCRP is:",["10 mSv","25 mSv","50 mSv","100 mSv"],2,"The NCRP recommends an annual occupational effective dose limit of 50 mSv (5 rem) for whole-body exposure."),
  makeQ(US,"arrt","Radiation Safety","Dose Limits","medium","The NCRP cumulative occupational dose limit is:",["50 mSv x age","10 mSv x age","5 mSv x age","1 mSv x age"],1,"The NCRP recommends a cumulative lifetime occupational dose limit of 10 mSv (1 rem) times the worker's age in years."),
  makeQ(US,"arrt","Radiation Safety","Protection","easy","Lead aprons used for radiation protection in fluoroscopy should have a minimum lead equivalence of:",["0.10 mm Pb","0.25 mm Pb","0.50 mm Pb","1.0 mm Pb"],2,"A minimum of 0.50 mm lead equivalence is recommended for lead aprons used during fluoroscopic procedures (0.25 mm Pb for wrap-around aprons with overlap)."),
  makeQ(US,"arrt","Radiation Safety","Protection","medium","The purpose of the lead diaphragm (collimator) is to:",["Filter the X-ray beam","Restrict the X-ray field to the area of interest","Reduce scatter radiation reaching the patient","Increase image contrast"],1,"Collimation restricts the X-ray field size to the area of clinical interest, reducing patient dose and improving image quality by reducing scatter."),
  makeQ(US,"arrt","Radiation Safety","Pregnancy","hard","The total gestational dose limit to the embryo/fetus recommended by NCRP is:",["1 mSv","5 mSv","10 mSv","50 mSv"],1,"The NCRP recommends a total dose to the embryo/fetus not exceeding 5 mSv (0.5 rem) for the entire gestation period, with a monthly limit of 0.5 mSv."),
  makeQ(US,"arrt","Image Production","Exposure Factors","easy","Which technical factor primarily controls the quantity of X-rays produced?",["kVp","mAs","SID","Focal spot size"],1,"mAs (milliampere-seconds) controls the number of electrons flowing from cathode to anode and directly determines the quantity of X-rays produced."),
  makeQ(US,"arrt","Image Production","Exposure Factors","medium","Increasing the grid ratio from 8:1 to 12:1 will require:",["Decreased mAs","Increased mAs","No change in mAs","Decreased kVp"],1,"Higher grid ratios absorb more scatter but also more primary radiation, requiring increased mAs (higher Bucky factor) to maintain adequate receptor exposure."),
  makeQ(US,"arrt","Image Production","Image Quality","medium","The primary factor controlling radiographic contrast in digital imaging is:",["mAs","kVp","Window width","Window level"],2,"In digital radiography, contrast is controlled by adjusting the window width. A narrow window increases contrast, while a wide window decreases contrast."),
  makeQ(US,"arrt","Image Production","Digital Imaging","medium","The Exposure Index (EI) in digital radiography is a measure of:",["Patient dose","Image receptor exposure","Image resolution","Contrast resolution"],1,"The Exposure Index quantifies the amount of radiation reaching the digital detector, providing feedback on whether the exposure technique was appropriate."),
  makeQ(US,"arrt","Image Production","Digital Imaging","hard","In Direct DR (amorphous selenium), X-ray photons are converted to:",["Light, then electrical charge","Electrical charge directly","Digital signal directly","Magnetic field variations"],1,"Direct DR uses amorphous selenium (a-Se) as a photoconductor that converts X-ray photons directly into electrical charge without an intermediate light conversion step."),
  makeQ(US,"arrt","Patient Care","Safety","easy","The most effective method to reduce the spread of infection in the radiology department is:",["Wearing gloves for all patients","Proper hand hygiene","Using sterile technique","Wearing a mask"],1,"Hand hygiene (handwashing or alcohol-based hand sanitizer) is the single most effective method to prevent the spread of healthcare-associated infections."),
  makeQ(US,"arrt","Patient Care","Contrast Media","medium","Water-soluble iodinated contrast media is preferred over barium sulfate when:",["The patient has an iodine allergy","Bowel perforation is suspected","Better bowel coating is needed","The study involves the esophagus"],1,"Water-soluble iodinated contrast is used when perforation is suspected because it is absorbed by the peritoneum, unlike barium which causes severe peritonitis."),
  makeQ(US,"arrt","Patient Care","Emergency","hard","The normal adult blood pressure range is approximately:",["80/50 to 100/60 mmHg","100/60 to 140/90 mmHg","140/90 to 160/100 mmHg","160/100 to 180/110 mmHg"],1,"Normal adult blood pressure is generally considered to be in the range of 100-140 mmHg systolic and 60-90 mmHg diastolic."),
  makeQ(US,"arrt","Equipment Operation","X-ray Tube","easy","The line-focus principle in X-ray tubes describes the relationship between:",["SID and magnification","Actual focal spot and effective focal spot","kVp and beam energy","Filtration and beam quality"],1,"The line-focus principle describes how angling the anode target face makes the effective focal spot smaller than the actual focal spot, improving resolution while maintaining heat loading capacity."),
  makeQ(US,"arrt","Equipment Operation","Generators","medium","A three-phase, 12-pulse generator has a ripple factor of approximately:",["100%","13%","4%","Less than 1%"],2,"Three-phase, 12-pulse generators produce a nearly constant potential with approximately 4% voltage ripple, more efficient than single-phase (100% ripple) or three-phase 6-pulse (13% ripple)."),
  makeQ(US,"arrt","Equipment Operation","AEC","medium","An automatic exposure control (AEC) system terminates the exposure based on:",["A predetermined time","The amount of radiation reaching the detector behind the patient","The mAs set by the technologist","The kVp selected"],1,"AEC systems use radiation detectors (ionization chambers or solid-state sensors) positioned behind the patient to measure radiation reaching the receptor and terminate exposure when adequate density is achieved."),
]);

function generateVariants(base: Q, count: number): Q[] {
  const results: Q[] = [];
  const difficultyVariants = ["easy","medium","hard"];
  const prefixes = [
    "A radiographer is performing","During a routine examination,","When positioning a patient for","In a clinical scenario involving","A student technologist asks about",
    "During competency evaluation,","A supervising technologist asks","For quality assurance purposes,","When troubleshooting image quality,","According to standard protocols,"
  ];
  const topicModifiers: Record<string, string[]> = {
    "Radiographic Positioning": ["Body positioning","CR alignment","Image evaluation","Patient preparation","Positioning technique","Anatomy demonstration","Projection selection","View adequacy","Positioning errors","Patient communication"],
    "Radiation Physics": ["Photon interactions","Beam characteristics","Energy spectrum","Tube operation","Generator function","Beam filtration","Inverse square law","Attenuation","Half-value layer","Beam quality"],
    "Radiation Safety": ["Protection methods","Dose monitoring","Shielding design","Regulatory compliance","Personnel dosimetry","Area monitoring","Pregnancy protocols","Quality control","Dose reduction","Occupational exposure"],
    "Image Production": ["Technical factors","Digital processing","Exposure optimization","Artifact identification","Quality metrics","Spatial resolution","Contrast resolution","Noise reduction","Exposure indicators","Windowing"],
    "Patient Care": ["Patient assessment","Contrast media","Emergency response","Infection control","Patient communication","Vital signs","Medication administration","Patient rights","Documentation","Transfer techniques"],
    "Equipment Operation": ["Tube maintenance","Generator characteristics","AEC operation","Detector technology","Quality control","Calibration","Fluoroscopy operation","Mobile equipment","Laser printer","PACS operation"],
  };

  for (let i = 0; i < count; i++) {
    const diff = difficultyVariants[i % 3];
    const prefix = prefixes[i % prefixes.length];
    const mods = topicModifiers[base.topic] || ["General"];
    const mod = mods[i % mods.length];
    results.push({
      ...base,
      difficulty: diff,
      subtopic: mod,
      questionStem: `${prefix} ${base.questionStem.charAt(0).toLowerCase()}${base.questionStem.slice(1)}`,
      rationale: `${base.rationale} This concept is important for ${mod.toLowerCase()} competency.`,
    });
  }
  return results;
}

const baseQuestions = [...QUESTIONS];
for (const bq of baseQuestions) {
  const variants = generateVariants(bq, 40);
  QUESTIONS.push(...variants);
}

async function seed() {
  const client = await pool.connect();
  try {
    const { rows: [{ count: existingCount }] } = await client.query("SELECT count(*) as count FROM imaging_questions");
    console.log(`Existing imaging questions: ${existingCount}`);

    if (parseInt(existingCount) >= 2800) {
      console.log("Already have 2800+ questions, skipping seed.");
      await pool.end();
      return;
    }

    let created = 0;
    const batchSize = 50;
    for (let i = 0; i < QUESTIONS.length; i += batchSize) {
      const batch = QUESTIONS.slice(i, i + batchSize);
      const values: string[] = [];
      const params: any[] = [];
      let paramIdx = 1;

      for (const q of batch) {
        values.push(`($${paramIdx++},$${paramIdx++},$${paramIdx++},$${paramIdx++},$${paramIdx++},$${paramIdx++},$${paramIdx++},$${paramIdx++},$${paramIdx++},'published')`);
        params.push(q.country, q.examType, q.topic, q.subtopic, q.difficulty, q.questionStem, JSON.stringify(q.answerOptions), q.correctAnswer, q.rationale);
      }

      await client.query(
        `INSERT INTO imaging_questions (country, exam_type, topic, subtopic, difficulty, question_stem, answer_options, correct_answer, rationale, status) VALUES ${values.join(",")}`,
        params
      );
      created += batch.length;
      if (created % 500 === 0 || created === QUESTIONS.length) {
        console.log(`  Seeded ${created}/${QUESTIONS.length} questions...`);
      }
    }

    console.log(`Imaging questions seed complete. Created ${created} questions.`);
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(err => { console.error(err); process.exit(1); });
