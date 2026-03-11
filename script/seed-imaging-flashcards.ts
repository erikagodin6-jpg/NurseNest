import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });

const FLASHCARDS = [
  { country: "canada", examType: "camrt", topic: "Positioning", front: "What is the standard SID for a PA chest radiograph?", back: "72 inches (180 cm)", rationale: "A 72-inch SID minimizes cardiac magnification because the heart is anterior in the chest.", difficulty: "easy" },
  { country: "canada", examType: "camrt", topic: "Positioning", front: "How many posterior ribs should be visible on a properly inspired PA chest?", back: "Minimum of 10 posterior ribs above the diaphragm", rationale: "10 posterior ribs (or 14 anterior ribs) indicates adequate inspiration.", difficulty: "easy" },
  { country: "canada", examType: "camrt", topic: "Positioning", front: "What indicates rotation on a PA chest radiograph?", back: "Unequal distances between medial clavicle ends and spinous processes", rationale: "Equal distances confirm a non-rotated PA projection.", difficulty: "medium" },
  { country: "canada", examType: "camrt", topic: "Positioning", front: "What is the CR direction for a PA hand?", back: "Perpendicular to the third MCP joint", rationale: "The third MCP joint is the centering point for a PA hand projection.", difficulty: "easy" },
  { country: "canada", examType: "camrt", topic: "Positioning", front: "Which wrist view best demonstrates the scaphoid bone?", back: "PA with ulnar deviation", rationale: "Ulnar deviation elongates the scaphoid, reducing foreshortening.", difficulty: "medium" },
  { country: "canada", examType: "camrt", topic: "Positioning", front: "How much should the leg be internally rotated for an ankle mortise view?", back: "15-20 degrees", rationale: "This places the intermalleolar line parallel to the IR, opening the mortise joint.", difficulty: "medium" },
  { country: "canada", examType: "camrt", topic: "Positioning", front: "What is the CR angle for an AP knee?", back: "5 degrees caudad to 1 cm below patellar apex", rationale: "The small caudad angle opens the joint space for most body habitus types.", difficulty: "medium" },
  { country: "canada", examType: "camrt", topic: "Positioning", front: "For an AP pelvis, how much should the legs be internally rotated?", back: "15-20 degrees", rationale: "Internal rotation places the femoral necks parallel to the IR, preventing foreshortening.", difficulty: "easy" },
  { country: "canada", examType: "camrt", topic: "Positioning", front: "What line should be perpendicular to the IR for a Caldwell (PA skull) projection?", back: "OML (orbitomeatal line)", rationale: "The OML perpendicular to the IR with 15 degrees caudad CR projects petrous ridges into the lower third of the orbits.", difficulty: "hard" },
  { country: "canada", examType: "camrt", topic: "Positioning", front: "What is the CR angle for a PA Caldwell skull projection?", back: "15 degrees caudad exiting the nasion", rationale: "This angle projects the petrous ridges into the lower third of the orbits, clearing the orbital floors.", difficulty: "hard" },
  { country: "canada", examType: "camrt", topic: "Physics", front: "What is bremsstrahlung radiation?", back: "Radiation produced when an electron is decelerated by the nuclear force field of a target atom", rationale: "Bremsstrahlung (braking radiation) produces a continuous energy spectrum and accounts for 80-90% of the X-ray beam.", difficulty: "easy" },
  { country: "canada", examType: "camrt", topic: "Physics", front: "What is the K-shell binding energy of tungsten?", back: "69.5 keV", rationale: "Incident electrons must exceed this energy to produce K-characteristic X-rays from a tungsten target.", difficulty: "hard" },
  { country: "canada", examType: "camrt", topic: "Physics", front: "What determines the maximum photon energy in an X-ray beam?", back: "The kVp setting", rationale: "Maximum photon energy (in keV) equals the peak kilovoltage applied across the tube.", difficulty: "easy" },
  { country: "canada", examType: "camrt", topic: "Physics", front: "How does photoelectric absorption probability change with atomic number?", back: "It is proportional to Z^3 (cube of atomic number)", rationale: "The full relationship is proportional to Z^3/E^3, explaining why it is dominant in high-Z materials at lower energies.", difficulty: "hard" },
  { country: "canada", examType: "camrt", topic: "Physics", front: "What is the primary source of scatter radiation in diagnostic radiology?", back: "Compton scattering", rationale: "Compton scattering is the predominant interaction in the diagnostic energy range and produces scattered photons that degrade image quality.", difficulty: "medium" },
  { country: "canada", examType: "camrt", topic: "Physics", front: "What is the magnification factor formula?", back: "MF = SID / SOD", rationale: "SOD (source-to-object distance) = SID - OID. Image size = object size multiplied by MF.", difficulty: "medium" },
  { country: "canada", examType: "camrt", topic: "Physics", front: "State the inverse square law.", back: "I1/I2 = (D2/D1)^2 - Intensity varies inversely with the square of the distance", rationale: "Doubling the distance reduces radiation intensity to one-quarter.", difficulty: "medium" },
  { country: "canada", examType: "camrt", topic: "Physics", front: "What is a half-value layer (HVL)?", back: "The thickness of material needed to reduce beam intensity by 50%", rationale: "HVL is a measure of beam quality/penetrating ability. Higher HVL = more penetrating beam.", difficulty: "medium" },
  { country: "canada", examType: "camrt", topic: "Radiation Safety", front: "What is the annual occupational whole-body dose limit in Canada?", back: "50 mSv per year, with 100 mSv over 5 years", rationale: "Set by the CNSC. The 5-year cumulative limit provides additional long-term protection.", difficulty: "easy" },
  { country: "canada", examType: "camrt", topic: "Radiation Safety", front: "What is the annual public dose limit in Canada?", back: "1 mSv per year", rationale: "The CNSC sets the public dose limit at 1 mSv/year, which is 1/50th of the occupational limit.", difficulty: "easy" },
  { country: "canada", examType: "camrt", topic: "Radiation Safety", front: "What is the dose limit to the embryo/fetus after declaration of pregnancy in Canada?", back: "4 mSv for the remainder of pregnancy", rationale: "This is a CNSC regulation to protect the developing fetus from radiation exposure.", difficulty: "hard" },
  { country: "canada", examType: "camrt", topic: "Radiation Safety", front: "What are the three cardinal principles of radiation protection?", back: "Time, Distance, and Shielding", rationale: "Minimize time, maximize distance, and use appropriate shielding to reduce radiation exposure.", difficulty: "easy" },
  { country: "canada", examType: "camrt", topic: "Radiation Safety", front: "What does ALARA stand for?", back: "As Low As Reasonably Achievable", rationale: "The guiding principle mandated by CNSC requiring optimization of all radiation exposures.", difficulty: "easy" },
  { country: "canada", examType: "camrt", topic: "Image Production", front: "What is the 15% kVp rule?", back: "Increasing kVp by 15% approximately doubles the receptor exposure, equivalent to doubling mAs", rationale: "This rule is used for technique adjustments and exposure optimization.", difficulty: "medium" },
  { country: "canada", examType: "camrt", topic: "Image Production", front: "What controls contrast in digital radiography?", back: "Window width", rationale: "Narrow window width = high contrast; wide window width = low contrast. Window level controls brightness.", difficulty: "medium" },
  { country: "canada", examType: "camrt", topic: "Image Production", front: "What does Deviation Index (DI) = 0 indicate?", back: "The exposure to the detector matched the target exposure exactly", rationale: "Positive DI = overexposure; negative DI = underexposure relative to the calibrated target.", difficulty: "medium" },
  { country: "usa", examType: "arrt", topic: "Positioning", front: "For a PA chest, what indicates adequate inspiration?", back: "Minimum of 10 posterior ribs visible above the diaphragm", rationale: "Inadequate inspiration can simulate cardiomegaly and basilar pathology.", difficulty: "easy" },
  { country: "usa", examType: "arrt", topic: "Positioning", front: "Why is the left lateral preferred for a chest radiograph?", back: "To minimize cardiac magnification since the heart is on the left side of the thorax", rationale: "Left lateral places the heart closest to the IR, reducing OID and magnification.", difficulty: "medium" },
  { country: "usa", examType: "arrt", topic: "Positioning", front: "For an AP forearm, the hand should be in what position?", back: "Supinated (palm up)", rationale: "Supination separates the radius and ulna and demonstrates the radial tuberosity in profile.", difficulty: "easy" },
  { country: "usa", examType: "arrt", topic: "Positioning", front: "What degree of knee flexion is standard for a lateral knee?", back: "20-30 degrees", rationale: "This degree of flexion relaxes the muscles and tendons, optimizing joint space demonstration.", difficulty: "easy" },
  { country: "usa", examType: "arrt", topic: "Positioning", front: "For an AP lumbar spine, why are the knees flexed?", back: "To reduce lumbar lordosis and open intervertebral disc spaces", rationale: "Flexed knees flatten the lumbar curve, placing vertebral bodies parallel to the IR.", difficulty: "medium" },
  { country: "usa", examType: "arrt", topic: "Positioning", front: "What does the Towne (AP axial skull) projection demonstrate?", back: "Occipital bone, foramen magnum, and dorsum sellae projected within the foramen magnum", rationale: "30 degrees caudad to OML projects these structures optimally.", difficulty: "hard" },
  { country: "usa", examType: "arrt", topic: "Physics", front: "What is the anode heel effect?", back: "Greater beam intensity on the cathode side due to photon absorption within the anode on the anode side", rationale: "The thicker body part should be placed on the cathode side where intensity is higher.", difficulty: "medium" },
  { country: "usa", examType: "arrt", topic: "Physics", front: "What is the line-focus principle?", back: "Angling the anode target makes the effective focal spot smaller than the actual focal spot", rationale: "This improves spatial resolution while maintaining the heat-loading capacity of a larger actual focal spot.", difficulty: "medium" },
  { country: "usa", examType: "arrt", topic: "Physics", front: "What target material is used in diagnostic X-ray tubes?", back: "Tungsten (atomic number 74)", rationale: "Tungsten is chosen for its high atomic number, high melting point, and good thermal conductivity.", difficulty: "easy" },
  { country: "usa", examType: "arrt", topic: "Physics", front: "How does a high-frequency generator compare to a single-phase generator?", back: "Higher average beam energy with less than 1% voltage ripple (vs 100% for single-phase)", rationale: "Higher efficiency means more consistent X-ray output and lower patient dose.", difficulty: "medium" },
  { country: "usa", examType: "arrt", topic: "Physics", front: "Compton scattering probability depends on what?", back: "Electron density of the absorber (independent of atomic number)", rationale: "Unlike photoelectric absorption, Compton probability does not depend on atomic number.", difficulty: "medium" },
  { country: "usa", examType: "arrt", topic: "Radiation Safety", front: "What is the annual occupational dose limit in the USA?", back: "50 mSv (5 rem) per year", rationale: "Recommended by NCRP and regulated by NRC for whole-body effective dose.", difficulty: "easy" },
  { country: "usa", examType: "arrt", topic: "Radiation Safety", front: "What is the NCRP cumulative dose formula?", back: "10 mSv (1 rem) x age in years", rationale: "This provides a lifetime cumulative limit based on the worker's age.", difficulty: "medium" },
  { country: "usa", examType: "arrt", topic: "Radiation Safety", front: "What is the total gestational dose limit for an embryo/fetus?", back: "5 mSv (0.5 rem) total gestation, with 0.5 mSv/month", rationale: "NCRP recommendation to minimize fetal radiation exposure during pregnancy.", difficulty: "hard" },
  { country: "usa", examType: "arrt", topic: "Radiation Safety", front: "What is the minimum lead equivalence for a protective apron in fluoroscopy?", back: "0.50 mm Pb (or 0.25 mm Pb for wrap-around with overlap)", rationale: "This provides adequate protection during fluoroscopic procedures.", difficulty: "medium" },
  { country: "usa", examType: "arrt", topic: "Image Production", front: "What technical factor primarily controls X-ray quantity?", back: "mAs (milliampere-seconds)", rationale: "mAs directly controls the number of electrons and thus the number of X-ray photons produced.", difficulty: "easy" },
  { country: "usa", examType: "arrt", topic: "Image Production", front: "What does the Exposure Index (EI) represent?", back: "A measure of the amount of radiation reaching the digital detector", rationale: "EI provides feedback on technique adequacy. The Deviation Index (DI) compares actual to target EI.", difficulty: "medium" },
  { country: "usa", examType: "arrt", topic: "Image Production", front: "In direct DR, what material converts X-rays to electrical charge?", back: "Amorphous selenium (a-Se)", rationale: "Direct DR converts X-rays directly to electrical charge without an intermediate light conversion step, unlike indirect DR.", difficulty: "hard" },
  { country: "usa", examType: "arrt", topic: "Image Production", front: "What is the difference between CR and DR?", back: "CR uses photostimulable phosphor plates requiring separate scanning; DR uses fixed flat-panel detectors with immediate image display", rationale: "DR generally offers higher DQE, faster workflow, and better image quality compared to CR.", difficulty: "medium" },
];

async function seed() {
  const client = await pool.connect();
  try {
    const { rows: [{ count }] } = await client.query("SELECT count(*) as count FROM imaging_flashcards");
    console.log(`Existing imaging flashcards: ${count}`);
    if (parseInt(count) >= 40) {
      console.log("Already have 40+ flashcards, skipping seed.");
      await pool.end();
      return;
    }

    for (const fc of FLASHCARDS) {
      const existing = await client.query(
        `SELECT id FROM imaging_flashcards WHERE country=$1 AND front=$2 LIMIT 1`,
        [fc.country, fc.front]
      );
      if (existing.rows.length > 0) {
        console.log(`  Skip: ${fc.front.substring(0, 50)}... (exists)`);
        continue;
      }
      await client.query(
        `INSERT INTO imaging_flashcards (country, exam_type, topic, front, back, rationale, difficulty, status) VALUES ($1,$2,$3,$4,$5,$6,$7,'published')`,
        [fc.country, fc.examType, fc.topic, fc.front, fc.back, fc.rationale, fc.difficulty]
      );
      console.log(`  Created: ${fc.front.substring(0, 60)}...`);
    }
    console.log("Flashcard seed complete.");
  } finally {
    client.release();
    await pool.end();
  }
}

seed().catch(err => { console.error(err); process.exit(1); });
