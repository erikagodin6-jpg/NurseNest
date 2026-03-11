import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const POSITIONING_ENTRIES = [
  { country: "canada", bodyRegion: "Chest", projection: "PA Erect", patientPosition: "Patient stands upright facing the image receptor with chin extended. Arms internally rotated with backs of hands on hips.", centralRay: "Perpendicular to T7, entering at the level of the inferior angle of the scapulae", criticalAnatomy: "Both lung fields, costophrenic angles, cardiac silhouette, trachea, mediastinum", structures: ["Lungs", "Heart", "Mediastinum", "Diaphragm", "Costophrenic angles"], commonErrors: ["Rotation indicated by unequal distance between medial clavicle ends and spinous processes", "Scapulae not rotated out of lung fields", "Inadequate inspiration showing fewer than 10 posterior ribs"] },
  { country: "canada", bodyRegion: "Chest", projection: "Lateral", patientPosition: "Patient stands with left side against image receptor. Arms raised overhead and crossed.", centralRay: "Perpendicular to T7 at the level of the inferior angle of the scapulae, midcoronal plane", criticalAnatomy: "Retrosternal and retrocardiac spaces, thoracic spine, sternum", structures: ["Lungs", "Heart", "Thoracic spine", "Sternum", "Diaphragm"], commonErrors: ["Arms not elevated sufficiently", "Patient rotation causing posterior ribs to not superimpose", "Kyphotic patients may require CR angle adjustment"] },
  { country: "canada", bodyRegion: "Upper Extremity", projection: "Hand PA", patientPosition: "Patient seated at end of table with hand pronated, fingers extended and slightly separated on image receptor", centralRay: "Perpendicular to the third MCP joint", criticalAnatomy: "All phalanges, metacarpals, carpals, and distal radius and ulna", structures: ["Phalanges", "Metacarpals", "Carpals", "MCP joints", "IP joints"], commonErrors: ["Fingers not separated causing overlap", "Hand not flat against receptor", "Ring or jewelry artifacts"] },
  { country: "canada", bodyRegion: "Upper Extremity", projection: "Wrist PA", patientPosition: "Patient seated, forearm pronated with wrist centered on image receptor. Fingers slightly flexed.", centralRay: "Perpendicular to the midcarpal area", criticalAnatomy: "All 8 carpal bones, distal radius and ulna, proximal metacarpals", structures: ["Scaphoid", "Lunate", "Triquetrum", "Pisiform", "Trapezium", "Trapezoid", "Capitate", "Hamate"], commonErrors: ["Wrist not flat causing foreshortening of carpals", "Ulnar deviation not performed for scaphoid view", "Overexposure obscuring carpal detail"] },
  { country: "canada", bodyRegion: "Lower Extremity", projection: "Knee AP", patientPosition: "Patient supine with knee extended. Leg internally rotated 3-5 degrees.", centralRay: "5 degrees caudad to a point 1 cm below the patellar apex", criticalAnatomy: "Distal femur, proximal tibia and fibula, patella, joint space", structures: ["Femoral condyles", "Tibial plateau", "Intercondylar eminence", "Patella", "Fibular head"], commonErrors: ["Insufficient internal rotation causing fibular overlap", "CR not angled for body habitus", "Collimation too tight excluding soft tissue margins"] },
  { country: "canada", bodyRegion: "Spine", projection: "Cervical Lateral", patientPosition: "Patient standing or seated in lateral position. Shoulders depressed, chin slightly elevated.", centralRay: "Horizontal beam perpendicular to C4 (level of thyroid cartilage)", criticalAnatomy: "C1-C7 vertebral bodies, intervertebral disc spaces, spinous processes, zygapophyseal joints", structures: ["Vertebral bodies C1-C7", "Disc spaces", "Spinous processes", "Zygapophyseal joints", "Odontoid process"], commonErrors: ["C7-T1 not demonstrated due to shoulder superimposition", "Patient rotation", "Excessive OID from patient standing too far from receptor"] },
  { country: "canada", bodyRegion: "Abdomen", projection: "AP Supine (KUB)", patientPosition: "Patient supine, MSP centered. Arms at sides, knees may be slightly flexed for comfort.", centralRay: "Perpendicular to the iliac crests at the level of L4", criticalAnatomy: "Kidneys, liver, spleen, psoas muscles, bowel gas pattern, bony pelvis", structures: ["Kidneys", "Psoas muscles", "Liver shadow", "Bowel gas", "Pubic symphysis", "Iliac crests"], commonErrors: ["Pubic symphysis cut off inferiorly", "Rotation indicated by asymmetric iliac wings", "Inadequate exposure technique for body habitus"] },
  { country: "canada", bodyRegion: "Shoulder", projection: "AP External Rotation", patientPosition: "Patient erect or supine. Arm externally rotated with palm facing forward (anatomical position).", centralRay: "Perpendicular to a point 1 inch inferior and lateral to the coracoid process", criticalAnatomy: "Greater tuberosity in profile, humeral head, glenoid cavity, acromioclavicular joint", structures: ["Humeral head", "Greater tuberosity", "Glenoid cavity", "Acromion", "Clavicle"], commonErrors: ["Insufficient external rotation", "CR too high missing glenohumeral joint", "Scapula superimposed on humeral head from rotation"] },
  { country: "canada", bodyRegion: "Hip", projection: "AP Pelvis", patientPosition: "Patient supine, MSP centered, both legs internally rotated 15-20 degrees with feet together.", centralRay: "Perpendicular midway between ASIS and pubic symphysis", criticalAnatomy: "Both hip joints, femoral necks, greater and lesser trochanters, iliac wings, sacrum", structures: ["Femoral heads", "Acetabula", "Femoral necks", "Greater trochanters", "Iliac wings", "Pubic symphysis"], commonErrors: ["Legs not internally rotated causing foreshortened femoral necks", "Patient rotation indicated by asymmetric obturator foramina", "Gonadal shield improperly placed"] },
  { country: "canada", bodyRegion: "Skull", projection: "PA Caldwell", patientPosition: "Patient prone or erect facing image receptor. OML perpendicular to receptor, MSP perpendicular.", centralRay: "15 degrees caudad to exit the nasion", criticalAnatomy: "Frontal bone, frontal sinuses, superior orbital margins, crista galli, petrous ridges in lower third of orbits", structures: ["Frontal bone", "Frontal sinuses", "Orbital margins", "Petrous ridges", "Crista galli"], commonErrors: ["OML not perpendicular causing distortion", "MSP rotation", "Petrous ridges not projected into lower orbits"] },
  { country: "usa", bodyRegion: "Chest", projection: "PA Erect", patientPosition: "Patient upright facing the IR, chin extended. Backs of hands on hips with shoulders rolled forward.", centralRay: "Perpendicular to T7, 72-inch SID", criticalAnatomy: "Both lung fields, costophrenic angles, cardiac silhouette, trachea, mediastinum", structures: ["Lungs", "Heart", "Mediastinum", "Diaphragm", "Costophrenic angles"], commonErrors: ["Rotation shown by asymmetric clavicle positions", "Scapulae not cleared from lung fields", "Less than 10 posterior ribs indicating poor inspiration"] },
  { country: "usa", bodyRegion: "Chest", projection: "AP Portable", patientPosition: "Patient supine or semi-upright in bed. Arms away from thorax if possible.", centralRay: "Perpendicular to the sternum at T7, minimum 40-inch SID", criticalAnatomy: "Lung fields, heart (magnified), mediastinum, tubes and lines", structures: ["Lungs", "Heart", "ETT position", "Central lines", "NGT position"], commonErrors: ["Short SID causing excessive magnification", "Patient rotation", "Poor inspiration from patient condition"] },
  { country: "usa", bodyRegion: "Upper Extremity", projection: "Forearm AP", patientPosition: "Patient seated, arm extended on table with forearm supinated. Both elbow and wrist joints included.", centralRay: "Perpendicular to midpoint of forearm", criticalAnatomy: "Radius, ulna, proximal and distal radioulnar joints, elbow joint, wrist joint", structures: ["Radius", "Ulna", "Elbow joint", "Wrist joint", "Radial tuberosity"], commonErrors: ["Forearm not fully supinated causing radius/ulna crossover", "Elbow or wrist joint excluded", "Hand pronation artifact"] },
  { country: "usa", bodyRegion: "Lower Extremity", projection: "Ankle AP (Mortise)", patientPosition: "Patient supine, leg internally rotated 15-20 degrees until intermalleolar line is parallel to IR.", centralRay: "Perpendicular to midpoint between malleoli", criticalAnatomy: "Tibiotalar joint (ankle mortise), medial and lateral malleoli, talus, distal tibia/fibula", structures: ["Ankle mortise", "Medial malleolus", "Lateral malleolus", "Talus", "Tibial plafond"], commonErrors: ["Insufficient internal rotation showing fibular overlap on talus", "Excessive rotation opening lateral joint space", "CR not centered at joint space"] },
  { country: "usa", bodyRegion: "Spine", projection: "Lumbar AP", patientPosition: "Patient supine, MSP centered. Knees flexed with feet flat on table to reduce lordosis.", centralRay: "Perpendicular to L3 (level of the lower costal margin or umbilicus)", criticalAnatomy: "L1-L5 vertebral bodies, disc spaces, pedicles, spinous and transverse processes, sacroiliac joints", structures: ["Vertebral bodies", "Pedicles", "Spinous processes", "Transverse processes", "SI joints"], commonErrors: ["Rotation indicated by asymmetric pedicle positions", "Knees not flexed increasing lordosis", "Underexposure for large patients"] },
  { country: "usa", bodyRegion: "Abdomen", projection: "AP Supine", patientPosition: "Patient supine, MSP centered. Include diaphragm to pubic symphysis.", centralRay: "Perpendicular to iliac crests at L4-L5 level", criticalAnatomy: "Kidneys, liver, spleen, psoas muscles, bowel gas, bladder, bony pelvis", structures: ["Kidneys", "Psoas muscles", "Bowel gas pattern", "Pubic symphysis", "Diaphragm"], commonErrors: ["Symphysis excluded", "Rotation from asymmetric iliac wings", "Motion from inadequate suspension of respiration"] },
  { country: "usa", bodyRegion: "Shoulder", projection: "AP Internal Rotation", patientPosition: "Patient erect or supine. Arm internally rotated with palm against thigh.", centralRay: "Perpendicular to coracoid process, 1 inch inferior", criticalAnatomy: "Lesser tuberosity in profile, humeral head, glenohumeral joint space", structures: ["Humeral head", "Lesser tuberosity", "Glenoid cavity", "Acromion"], commonErrors: ["Not enough internal rotation to profile lesser tuberosity", "CR too medial missing joint", "Breathing motion"] },
  { country: "usa", bodyRegion: "Hip", projection: "Cross-Table Lateral (Surgical)", patientPosition: "Patient supine, unaffected leg elevated and flexed. Affected leg remains in neutral or as found.", centralRay: "Horizontal beam perpendicular to femoral neck, entering at the groin crease", criticalAnatomy: "Femoral head, femoral neck, greater and lesser trochanters, acetabulum", structures: ["Femoral head", "Femoral neck", "Greater trochanter", "Lesser trochanter", "Acetabulum"], commonErrors: ["IR not positioned firmly against lateral hip", "CR not horizontal causing distortion", "Unaffected leg superimposing on the area of interest"] },
  { country: "usa", bodyRegion: "Skull", projection: "Towne (AP Axial)", patientPosition: "Patient supine or erect facing tube. OML perpendicular to IR, MSP perpendicular.", centralRay: "30 degrees caudad (to OML) through foramen magnum, exiting approximately 1 inch superior to the nasion", criticalAnatomy: "Occipital bone, foramen magnum, dorsum sellae projected within foramen magnum, petrous pyramids", structures: ["Occipital bone", "Foramen magnum", "Dorsum sellae", "Posterior clinoids", "Petrous pyramids"], commonErrors: ["Incorrect CR angle projecting dorsum sellae outside foramen magnum", "MSP rotation", "Insufficient flexion of OML"] },
  { country: "usa", bodyRegion: "Spine", projection: "Cervical AP Open Mouth", patientPosition: "Patient supine or erect. Mouth wide open, line from lower edge of upper incisors to mastoid tips perpendicular to IR.", centralRay: "Perpendicular through the center of the open mouth", criticalAnatomy: "C1 (atlas) lateral masses, C2 (axis) odontoid process (dens), atlantoaxial joints", structures: ["Atlas lateral masses", "Dens (odontoid)", "C1-C2 joint spaces", "Spinous process C2"], commonErrors: ["Mouth not open wide enough obscuring dens", "Incisors or occiput superimposed on dens", "Patient moving during exposure"] },
];

const PHYSICS_TOPICS = [
  {
    country: "canada",
    title: "X-ray Production",
    category: "Radiation Physics",
    difficulty: "medium",
    content: [
      { heading: "Bremsstrahlung Radiation", text: "Produced when an electron is decelerated by the nuclear force field of a target atom. The electron loses energy as it changes direction near the nucleus. This is the primary source of diagnostic X-rays, producing a continuous spectrum.", points: ["Accounts for 80-90% of the X-ray beam", "Continuous energy spectrum from zero to maximum keV", "Probability increases with increasing atomic number of target"] },
      { heading: "Characteristic Radiation", text: "Produced when an incoming electron ejects an inner-shell electron from a target atom. An outer-shell electron fills the vacancy and a photon equal to the binding energy difference is emitted.", points: ["Discrete energy photons specific to the target material", "K-characteristic X-rays of tungsten at 57-69 keV", "Requires incident electron energy exceeding K-shell binding energy (69.5 keV for tungsten)"] },
    ],
    keyFormulas: [
      { name: "Maximum Photon Energy", formula: "E_max = kVp (in keV)", description: "Maximum photon energy equals the peak kilovoltage applied across the tube" },
      { name: "Beam Intensity", formula: "I proportional to kVp^2 x mAs x Z", description: "Intensity is proportional to the square of kVp, mAs, and target atomic number" },
    ],
    examRelevance: "High - X-ray production principles appear on every CAMRT exam",
  },
  {
    country: "canada",
    title: "Radiation Interactions with Matter",
    category: "Radiation Physics",
    difficulty: "hard",
    content: [
      { heading: "Compton Scattering", text: "Incident photon interacts with a loosely bound outer-shell electron. The photon is scattered with reduced energy while the electron is ejected. This is the predominant interaction in diagnostic radiology and the primary source of scatter radiation.", points: ["Independent of atomic number", "Probability depends on electron density", "Primary contributor to image fog and radiation dose to patient and staff"] },
      { heading: "Photoelectric Absorption", text: "Incident photon is completely absorbed by an inner-shell electron, which is then ejected from the atom. Subsequent electron transitions produce characteristic radiation.", points: ["Probability proportional to Z^3/E^3", "Produces subject contrast in the image", "No scattered radiation produced", "Responsible for patient dose to the irradiated tissue"] },
    ],
    keyFormulas: [
      { name: "Compton Probability", formula: "Proportional to electron density (independent of Z)", description: "Likelihood of Compton interaction depends only on the number of electrons per gram" },
      { name: "Photoelectric Probability", formula: "Proportional to Z^3 / E^3", description: "Probability increases with cube of atomic number and decreases with cube of photon energy" },
    ],
    examRelevance: "High - Understanding interactions is fundamental to image quality and radiation protection",
  },
  {
    country: "canada",
    title: "Image Quality Factors",
    category: "Image Production",
    difficulty: "medium",
    content: [
      { heading: "Spatial Resolution", text: "The ability to distinguish two closely spaced objects as separate entities. Measured in line pairs per millimeter (lp/mm). Affected by focal spot size, OID, SID, and detector element size.", points: ["Smaller focal spot = better resolution", "Shorter OID = better resolution", "Longer SID = better resolution (less magnification)", "Digital detector pixel size limits resolution"] },
      { heading: "Contrast Resolution", text: "The ability to distinguish between similar tissues with slightly different attenuation. Digital systems have superior contrast resolution compared to film-screen systems.", points: ["Window width controls contrast in digital imaging", "Window level controls brightness/density", "Subject contrast affected by kVp, tissue type, and part thickness"] },
    ],
    keyFormulas: [
      { name: "Magnification Factor", formula: "MF = SID / SOD", description: "Image size = Object size x MF. SOD = SID - OID." },
      { name: "mAs Reciprocity", formula: "mA x time(s) = mAs", description: "Same mAs from different mA/time combinations produces equivalent exposure" },
    ],
    examRelevance: "High - Image quality optimization questions appear frequently on CAMRT exam",
  },
  {
    country: "canada",
    title: "Radiation Protection Principles",
    category: "Radiation Safety",
    difficulty: "medium",
    content: [
      { heading: "ALARA Principle", text: "As Low As Reasonably Achievable. The guiding principle in radiation protection requiring that all exposures be kept as low as reasonably achievable, taking into account social and economic factors.", points: ["Applies to all radiation workers and the public", "Mandated by CNSC regulations in Canada", "Involves time, distance, and shielding optimization"] },
      { heading: "Dose Limits (Canada)", text: "CNSC regulatory dose limits for occupational and public exposure.", points: ["Occupational: 50 mSv/year, 100 mSv over 5 years", "Public: 1 mSv/year", "Lens of eye: 50 mSv/year (occupational)", "Pregnant worker: 4 mSv over remainder of pregnancy after declaration", "Extremities: 500 mSv/year"] },
    ],
    keyFormulas: [
      { name: "Inverse Square Law", formula: "I1/I2 = (D2/D1)^2", description: "Intensity varies inversely with the square of the distance from the source" },
      { name: "Half-Value Layer", formula: "Reduces beam intensity to 50%", description: "The thickness of material needed to reduce beam intensity by half" },
    ],
    examRelevance: "High - Radiation safety is a major component of CAMRT exam (approximately 15-20% of questions)",
  },
  {
    country: "usa",
    title: "X-ray Tube Components and Operation",
    category: "Radiation Physics",
    difficulty: "medium",
    content: [
      { heading: "Cathode Assembly", text: "The negative electrode containing the filament (typically tungsten) that serves as the electron source through thermionic emission. Focusing cup directs electrons toward the anode.", points: ["Dual filament design: small (0.5-0.6mm) and large (1.0-1.2mm) focal spots", "Thermionic emission requires filament heating to approximately 2200 degrees C", "Space charge effect limits electron flow at low mA settings"] },
      { heading: "Anode Assembly", text: "The positive electrode where X-rays are produced. Rotating anodes (3000-10000 RPM) distribute heat over a larger area, allowing higher tube loading.", points: ["Target material: tungsten (Z=74) or tungsten-rhenium alloy", "Anode angle typically 7-17 degrees", "Line-focus principle: actual focal spot larger than effective focal spot", "Anode heel effect: intensity decreases toward the anode end"] },
    ],
    keyFormulas: [
      { name: "Heat Units (single phase)", formula: "HU = kVp x mA x time", description: "Heat generated in a single-phase generator" },
      { name: "Heat Units (3-phase/HF)", formula: "HU = kVp x mA x time x 1.35 (3-phase) or 1.40 (HF)", description: "Correction factor for higher-efficiency generators" },
    ],
    examRelevance: "High - Tube components and operation are core ARRT content",
  },
  {
    country: "usa",
    title: "Digital Image Processing",
    category: "Image Production",
    difficulty: "medium",
    content: [
      { heading: "Computed Radiography (CR)", text: "Uses a photostimulable phosphor (PSP) imaging plate that stores the latent image as trapped electrons. The plate is scanned by a laser in the CR reader, releasing trapped energy as visible light (photostimulated luminescence) that is detected by a PMT.", points: ["PSP material: barium fluorohalide doped with europium", "Resolution determined by laser spot size and sampling rate", "Imaging plates can be reused approximately 10,000 times"] },
      { heading: "Digital Radiography (DR)", text: "Direct capture systems that convert X-ray energy to digital signal. Indirect DR uses a scintillator (cesium iodide or gadolinium oxysulfide) coupled to a photodiode array. Direct DR uses amorphous selenium to convert X-rays directly to electrical charge.", points: ["Higher DQE than CR systems", "Immediate image availability", "Fixed detector size limits field coverage", "TFT (thin-film transistor) array reads the charge"] },
    ],
    keyFormulas: [
      { name: "Exposure Index", formula: "EI = c x log10(Exposure)", description: "Logarithmic relationship between detector exposure and EI value" },
      { name: "Deviation Index", formula: "DI = 10 x log10(EI / EI_target)", description: "DI = 0 is ideal, positive = overexposure, negative = underexposure" },
    ],
    examRelevance: "High - Digital imaging concepts are heavily tested on ARRT exam",
  },
  {
    country: "usa",
    title: "Radiation Biology",
    category: "Radiation Safety",
    difficulty: "hard",
    content: [
      { heading: "Radiosensitivity", text: "The Law of Bergonie and Tribondeau states that cells are more radiosensitive when they are: rapidly dividing, have a long mitotic future, and are undifferentiated.", points: ["Lymphocytes are the most radiosensitive blood cells", "Mature nerve and muscle cells are the most radioresistant", "Fetal tissue is highly radiosensitive, especially during organogenesis (weeks 2-8)"] },
      { heading: "Dose-Response Relationships", text: "Linear nonthreshold (LNT) model is used for radiation protection purposes, assuming any radiation dose carries some risk.", points: ["Stochastic effects: probability increases with dose, no threshold (cancer, genetic effects)", "Deterministic effects: severity increases with dose above a threshold (skin erythema, cataracts)", "Effective dose limit considers tissue weighting factors"] },
    ],
    keyFormulas: [
      { name: "Effective Dose", formula: "E = sum of (w_T x H_T)", description: "w_T = tissue weighting factor, H_T = equivalent dose to tissue T" },
      { name: "Equivalent Dose", formula: "H = D x w_R", description: "D = absorbed dose, w_R = radiation weighting factor (1.0 for X-rays)" },
    ],
    examRelevance: "High - Radiation biology and protection make up approximately 18% of the ARRT exam",
  },
  {
    country: "usa",
    title: "Radiation Protection Standards (USA)",
    category: "Radiation Safety",
    difficulty: "medium",
    content: [
      { heading: "NRC and State Regulations", text: "The Nuclear Regulatory Commission (NRC) and individual state radiation control programs establish dose limits and regulations for ionizing radiation. Most states are Agreement States that have assumed regulatory authority from the NRC.", points: ["NCRP recommendations form the basis for US regulations", "States may have stricter requirements than federal standards", "Facilities must have a radiation safety officer (RSO)"] },
      { heading: "Dose Limits (USA)", text: "NCRP-recommended and NRC-mandated dose limits for occupational workers and the general public.", points: ["Occupational whole body: 50 mSv/year (5 rem/year)", "Cumulative: 10 mSv x age in years", "Public: 1 mSv/year (0.1 rem/year)", "Lens of eye: 150 mSv/year (occupational)", "Embryo/fetus: 5 mSv (0.5 rem) total gestation, 0.5 mSv/month", "Extremities: 500 mSv/year"] },
    ],
    keyFormulas: [
      { name: "Barrier Thickness", formula: "Depends on workload (W), use factor (U), and occupancy factor (T)", description: "Primary barriers for direct beam, secondary for scatter and leakage" },
      { name: "10-Day Rule / 28-Day Rule", formula: "Elective abdominal procedures on females of reproductive age scheduled within 10 days of onset of menses or confirmed non-pregnant within 28 days", description: "Minimizes risk of irradiating an unknown pregnancy" },
    ],
    examRelevance: "High - Radiation protection is a major ARRT content area (approximately 18%)",
  },
];

async function seed() {
  const client = await pool.connect();
  try {
    for (const entry of POSITIONING_ENTRIES) {
      const existing = await client.query(
        `SELECT id FROM imaging_positioning_entries WHERE country=$1 AND body_region=$2 AND projection=$3 LIMIT 1`,
        [entry.country, entry.bodyRegion, entry.projection]
      );
      if (existing.rows.length > 0) {
        console.log(`  Skip: ${entry.country} ${entry.bodyRegion} - ${entry.projection} (exists)`);
        continue;
      }
      await client.query(
        `INSERT INTO imaging_positioning_entries (country, body_region, projection, patient_position, central_ray, critical_anatomy, structures, common_errors, status) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,'published')`,
        [entry.country, entry.bodyRegion, entry.projection, entry.patientPosition, entry.centralRay, entry.criticalAnatomy, entry.structures, entry.commonErrors]
      );
      console.log(`  Created: ${entry.country} ${entry.bodyRegion} - ${entry.projection}`);
    }

    for (const topic of PHYSICS_TOPICS) {
      const existing = await client.query(
        `SELECT id FROM imaging_physics_topics WHERE country=$1 AND title=$2 LIMIT 1`,
        [topic.country, topic.title]
      );
      if (existing.rows.length > 0) {
        console.log(`  Skip: ${topic.country} ${topic.title} (exists)`);
        continue;
      }
      await client.query(
        `INSERT INTO imaging_physics_topics (country, title, category, content, key_formulas, exam_relevance, difficulty, status) VALUES ($1,$2,$3,$4,$5,$6,$7,'published')`,
        [topic.country, topic.title, topic.category, JSON.stringify(topic.content), JSON.stringify(topic.keyFormulas), topic.examRelevance, topic.difficulty]
      );
      console.log(`  Created: ${topic.country} ${topic.title}`);
    }

    console.log("Positioning & physics seed complete.");
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(err => { console.error(err); process.exit(1); });
