import type { Express } from "express";
import { pool } from "./storage";
import { CAREER_CONFIGS } from "@shared/careers";
import { getUncachableStripeClient } from "./stripeClient";

const ALLIED_CAREERS = ["rrt", "paramedic", "pharmacyTech", "mlt", "imaging"];

const DEFAULT_DIFFICULTY_DIST: Record<number, number> = { 1: 0.10, 2: 0.20, 3: 0.35, 4: 0.25, 5: 0.10 };
const DEFAULT_COGNITIVE_DIST: Record<string, { min: number; max: number }> = {
  recall: { min: 0.10, max: 0.30 },
  application: { min: 0.40, max: 0.60 },
  analysis: { min: 0.20, max: 0.40 },
};
const DEFAULT_QUESTION_TYPES = ["multiple-choice", "select-all", "ordered-response", "hot-spot", "fill-in-blank"];
const SIMILARITY_THRESHOLD = 0.80;
const MIN_RATIONALE_WORDS = 600;
const MIN_BATCH = 25;
const MAX_BATCH = 100;

const CAREER_BLUEPRINT_DOMAINS: Record<string, Record<string, { weight: number; subtopics: string[] }>> = {
  pharmacyTech: {
    "Pharmaceutical Calculations": { weight: 0.18, subtopics: ["Dosage Calculations", "IV Flow Rates", "Dilution/Concentration", "Alligation", "Business Math", "Day Supply", "Pediatric Dosing", "Unit Conversions"] },
    "Dispensing Workflow & Safety": { weight: 0.15, subtopics: ["Prescription Processing", "Label Requirements", "Sig Code Interpretation", "Workflow Steps", "Technology Systems", "Patient Counseling Points", "Transfer Protocols"] },
    "Sterile & Non-Sterile Compounding": { weight: 0.14, subtopics: ["USP 795 Standards", "USP 797 Standards", "USP 800 Hazardous", "Aseptic Technique", "Beyond-Use Dating", "Equipment Calibration", "Quality Assurance", "Garbing Procedures"] },
    "Medication Safety & Error Prevention": { weight: 0.12, subtopics: ["Look-Alike/Sound-Alike", "High-Alert Medications", "Error Reporting", "ISMP Guidelines", "Barcode Verification", "Patient Identifiers", "Black Box Warnings"] },
    "Drug Classes Foundations": { weight: 0.12, subtopics: ["Top 200 Drugs", "Drug Interactions", "Adverse Effects", "Contraindications", "Therapeutic Categories", "OTC vs Rx", "Generic/Brand Equivalents"] },
    "Controlled Substances": { weight: 0.10, subtopics: ["DEA Schedules", "Documentation Requirements", "Ordering/Receiving", "Disposal Procedures", "Refill Limitations", "Transfer Rules", "Inventory Requirements"] },
    "Inventory & Storage": { weight: 0.10, subtopics: ["Storage Conditions", "Expiration Dating", "Recall Procedures", "Ordering Systems", "Formulary Management", "Return-to-Stock", "Cold Chain Management"] },
    "Prescription Interpretation": { weight: 0.09, subtopics: ["Abbreviations", "Route of Administration", "Dosage Forms", "DAW Codes", "Insurance Codes", "Prior Authorization", "Rejection Resolution"] },
  },
  rrt: {
    "Respiratory Physiology": { weight: 0.12, subtopics: ["Gas Exchange", "Ventilation/Perfusion", "Oxygen Transport", "Lung Volumes/Capacities", "Pulmonary Mechanics", "Control of Breathing", "Acid-Base Physiology"] },
    "ABGs & Acid-Base": { weight: 0.15, subtopics: ["ABG Interpretation", "Compensation Mechanisms", "Mixed Disorders", "Anion Gap", "Base Excess", "Oxygenation Indices", "A-a Gradient"] },
    "Oxygen Therapy": { weight: 0.12, subtopics: ["Delivery Devices", "Flow Rates/FiO2", "Humidification", "Hyperbaric Oxygen", "Titration Protocols", "Monitoring", "Complications"] },
    "Mechanical Ventilation": { weight: 0.18, subtopics: ["Modes of Ventilation", "Initial Settings", "Waveform Analysis", "Weaning Protocols", "Patient-Ventilator Asynchrony", "ARDS Protocols", "Non-Invasive Ventilation", "Troubleshooting"] },
    "Respiratory Disorders": { weight: 0.14, subtopics: ["COPD/Asthma", "Pneumonia/ARDS", "Pulmonary Embolism", "Pneumothorax", "Sleep Apnea", "Cystic Fibrosis", "Interstitial Lung Disease"] },
    "Airway & Emergencies": { weight: 0.12, subtopics: ["Intubation", "Difficult Airway", "CPR/ACLS", "Tracheostomy Care", "Airway Assessment", "Emergency Protocols", "Suctioning"] },
    "Diagnostics": { weight: 0.09, subtopics: ["Pulmonary Function Tests", "Chest X-Ray Interpretation", "Bronchoscopy", "Capnography", "Pulse Oximetry", "Sleep Studies", "Exercise Testing"] },
    "Infection Control": { weight: 0.08, subtopics: ["VAP Prevention", "Isolation Precautions", "Equipment Disinfection", "Surveillance", "Antibiotic Stewardship", "Hand Hygiene", "PPE"] },
  },
  paramedic: {
    "Trauma": { weight: 0.15, subtopics: ["Primary Survey", "Hemorrhage Control", "Spinal Motion Restriction", "Chest Trauma", "Abdominal Trauma", "Burns", "Blast Injuries"] },
    "Medical Emergencies": { weight: 0.15, subtopics: ["Stroke Assessment", "Diabetic Emergencies", "Seizures", "Overdose/Poisoning", "Anaphylaxis", "Sepsis", "Electrolyte Disorders"] },
    "Cardiac/ACLS": { weight: 0.15, subtopics: ["12-Lead ECG", "ACLS Algorithms", "Cardiac Arrest", "Acute Coronary Syndrome", "Dysrhythmia Recognition", "Cardioversion/Defibrillation", "Pacing"] },
    "Pediatric/PALS": { weight: 0.10, subtopics: ["Pediatric Assessment Triangle", "PALS Algorithms", "Neonatal Resuscitation", "Pediatric Airway", "Pediatric Pharmacology", "Child Abuse Recognition"] },
    "OB Emergencies": { weight: 0.08, subtopics: ["Normal Delivery", "Breech Presentation", "Cord Prolapse", "Eclampsia", "Postpartum Hemorrhage", "Neonatal Care"] },
    "Pharmacology": { weight: 0.12, subtopics: ["Drug Calculations", "Cardiac Drugs", "Sedation/Analgesia", "RSI Medications", "Vasopressors", "Antidotes", "Routes of Administration"] },
    "Airway Management": { weight: 0.10, subtopics: ["BVM Ventilation", "Supraglottic Airways", "Endotracheal Intubation", "Surgical Airway", "Capnography", "RSI Technique"] },
    "Assessment": { weight: 0.08, subtopics: ["Scene Size-Up", "Patient History", "Physical Examination", "Glasgow Coma Scale", "Vitals Interpretation", "Documentation"] },
    "Operations": { weight: 0.04, subtopics: ["Scene Safety", "MCI/Triage", "Vehicle Extrication", "Hazmat Awareness", "Air Medical"] },
    "Legal/Ethics": { weight: 0.03, subtopics: ["Consent/Refusal", "Mandatory Reporting", "Scope of Practice", "Documentation Standards", "HIPAA"] },
  },
  mlt: {
    "Hematology": { weight: 0.15, subtopics: ["CBC Interpretation", "Coagulation Cascade", "Hemoglobinopathies", "Leukemia Classification", "Peripheral Smear", "Bone Marrow", "Hemostasis Testing"] },
    "Clinical Chemistry": { weight: 0.15, subtopics: ["Renal Function", "Liver Function", "Cardiac Markers", "Electrolytes", "Endocrine Testing", "Therapeutic Drug Monitoring", "Tumor Markers"] },
    "Microbiology": { weight: 0.14, subtopics: ["Gram Stain", "Culture Techniques", "Antibiotic Susceptibility", "Parasitology", "Mycology", "Virology", "Specimen Collection"] },
    "Blood Banking": { weight: 0.14, subtopics: ["ABO/Rh Typing", "Antibody Screen", "Crossmatch", "Transfusion Reactions", "Component Therapy", "Donor Screening", "Quality Control"] },
    "Urinalysis": { weight: 0.08, subtopics: ["Physical Examination", "Chemical Analysis", "Microscopic Examination", "Body Fluids", "Renal Function Correlation"] },
    "Immunology/Serology": { weight: 0.10, subtopics: ["Immune Response", "Autoimmune Disorders", "Infectious Disease Serology", "Transplant Immunology", "Complement System", "Flow Cytometry"] },
    "Molecular Diagnostics": { weight: 0.08, subtopics: ["PCR Techniques", "Nucleic Acid Extraction", "Sequencing", "Molecular Markers", "Point-of-Care Testing"] },
    "Lab Operations": { weight: 0.08, subtopics: ["Safety Regulations", "Quality Management", "Instrument Maintenance", "Method Validation", "Proficiency Testing"] },
    "Quality Assurance": { weight: 0.05, subtopics: ["Westgard Rules", "QC Statistics", "Calibration", "CLIA Compliance", "Accreditation Standards"] },
    "Body Fluids": { weight: 0.03, subtopics: ["CSF Analysis", "Synovial Fluid", "Serous Fluids", "Seminal Fluid"] },
  },
  imaging: {
    "Radiographic Positioning": { weight: 0.18, subtopics: ["Upper Extremity", "Lower Extremity", "Chest/Abdomen", "Spine", "Skull/Facial", "Pediatric Positioning", "Trauma Positioning"] },
    "Radiation Safety": { weight: 0.14, subtopics: ["ALARA Principle", "Dose Limits", "Shielding", "Distance/Time", "Personnel Monitoring", "Pregnant Patient", "Regulatory Compliance"] },
    "Anatomy/Physiology": { weight: 0.12, subtopics: ["Skeletal System", "Organ Systems", "Cross-Sectional Anatomy", "Vascular Anatomy", "Pathology Correlation"] },
    "Image Production": { weight: 0.12, subtopics: ["Exposure Factors", "Image Quality", "Digital Imaging", "Artifact Recognition", "Post-Processing", "CR/DR Systems"] },
    "Equipment Operation": { weight: 0.10, subtopics: ["X-Ray Tube", "Generator Components", "Automatic Exposure Control", "Quality Control", "Maintenance"] },
    "Patient Care": { weight: 0.10, subtopics: ["Contrast Media", "Patient Assessment", "Infection Control", "Emergency Procedures", "Communication", "Immobilization"] },
    "Pathology Recognition": { weight: 0.08, subtopics: ["Fractures", "Pneumonia Patterns", "Cardiac Conditions", "GI Pathology", "Musculoskeletal Disease"] },
    "CT Imaging": { weight: 0.06, subtopics: ["CT Principles", "Helical/Spiral CT", "CT Protocols", "3D Reconstruction", "Dose Reduction"] },
    "MRI Physics": { weight: 0.05, subtopics: ["Magnetic Fields", "Pulse Sequences", "T1/T2 Weighting", "Safety Screening", "Contrast Agents"] },
    "Ultrasound Physics": { weight: 0.05, subtopics: ["Sound Wave Properties", "Transducer Types", "Doppler Principles", "Image Optimization", "Artifacts"] },
  },
};

async function requirePipelineAdmin(req: any, res: any): Promise<any> {
  const adminId = String(req.headers?.["x-admin-id"] || req.body?.adminId || req.query?.adminId || "");
  if (!adminId) return res.status(401).json({ error: "Admin required" });
  const r = await pool.query("SELECT * FROM users WHERE id = $1 AND tier = 'admin'", [adminId]);
  if (!r.rows[0]) return res.status(403).json({ error: "Admin access denied" });
  return r.rows[0];
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function cosineSimilarity(a: string, b: string): number {
  const wordsA = a.toLowerCase().split(/\s+/);
  const wordsB = b.toLowerCase().split(/\s+/);
  const vocab = new Set([...wordsA, ...wordsB]);
  const vecA: number[] = [];
  const vecB: number[] = [];
  for (const w of vocab) {
    vecA.push(wordsA.filter(x => x === w).length);
    vecB.push(wordsB.filter(x => x === w).length);
  }
  let dot = 0, magA = 0, magB = 0;
  for (let i = 0; i < vecA.length; i++) {
    dot += vecA[i] * vecB[i];
    magA += vecA[i] * vecA[i];
    magB += vecB[i] * vecB[i];
  }
  const denom = Math.sqrt(magA) * Math.sqrt(magB);
  return denom === 0 ? 0 : dot / denom;
}

interface ValidationResult {
  valid: boolean;
  reasons: string[];
}

function validateQuestion(q: any, existingStems: string[], batchCognitive: Record<string, number>, batchTotal: number): ValidationResult {
  const reasons: string[] = [];

  if (!q.learningObjective || q.learningObjective.trim().length < 10) reasons.push("missing_learning_objective");
  if (!q.blueprintCategory) reasons.push("missing_blueprint_category");
  if (!q.subtopic) reasons.push("missing_subtopic");
  if (!q.cognitiveLevel) reasons.push("missing_cognitive_level");
  if (!q.questionType) reasons.push("missing_question_type");
  if (!q.stem || q.stem.length < 20) reasons.push("stem_too_short");
  if (!q.options || !Array.isArray(q.options) || q.options.length < 4) reasons.push("insufficient_options");
  if (q.correctAnswer === undefined || q.correctAnswer === null) reasons.push("missing_correct_answer");
  if (!q.difficulty || q.difficulty < 1 || q.difficulty > 5) reasons.push("invalid_difficulty");
  if (!q.examTrap || q.examTrap.trim().length < 5) reasons.push("missing_exam_trap");
  if (!q.clinicalPearls || !Array.isArray(q.clinicalPearls) || q.clinicalPearls.length < 3) reasons.push("insufficient_clinical_pearls");

  const rationaleWords = wordCount(q.rationaleLong || "");
  if (rationaleWords < MIN_RATIONALE_WORDS) reasons.push(`rationale_too_short_${rationaleWords}_words`);

  if (!q.distractorRationales || !Array.isArray(q.distractorRationales) || q.distractorRationales.length < 3) {
    reasons.push("missing_distractor_rationales");
  }

  const optionsText = (q.options || []).map((o: string) => o.toLowerCase());
  if (optionsText.some((o: string) => o.includes("all of the above") || o.includes("none of the above"))) {
    reasons.push("contains_all_of_the_above");
  }

  for (const existing of existingStems) {
    const sim = cosineSimilarity(q.stem, existing);
    if (sim > SIMILARITY_THRESHOLD) {
      reasons.push(`duplicate_similarity_${sim.toFixed(2)}`);
      break;
    }
  }

  if (batchTotal > 5) {
    const recallPct = (batchCognitive["recall"] || 0) / batchTotal;
    const analysisPct = (batchCognitive["analysis"] || 0) / batchTotal;
    if (q.cognitiveLevel === "recall" && recallPct > 0.30) reasons.push("recall_quota_exceeded");
    if (analysisPct < 0.20 && batchTotal > 15 && q.cognitiveLevel !== "analysis") reasons.push("analysis_quota_below_minimum");
  }

  return { valid: reasons.length === 0, reasons };
}

function generateFlashcardsFromQuestion(q: any): Array<{ cardType: string; front: string; back: string; rationale: string }> {
  const cards: Array<{ cardType: string; front: string; back: string; rationale: string }> = [];

  cards.push({
    cardType: "definition",
    front: q.learningObjective,
    back: q.options[q.correctAnswer],
    rationale: (q.rationaleLong || "").substring(0, 500),
  });

  if (q.clinicalPearls && Array.isArray(q.clinicalPearls) && q.clinicalPearls.length > 0) {
    cards.push({
      cardType: "clinical_decision",
      front: `Clinical decision: ${q.subtopic} - What is the key clinical pearl?`,
      back: q.clinicalPearls[0],
      rationale: q.clinicalPearls.slice(1).join(" | "),
    });
  }

  if (q.safetyNote) {
    cards.push({
      cardType: "red_flag",
      front: `Red Flag: ${q.subtopic} - What safety concern must you remember?`,
      back: q.safetyNote,
      rationale: `From: ${q.blueprintCategory}`,
    });
  }

  return cards;
}

export function registerAlliedPipelineRoutes(app: Express) {

  app.get("/api/allied/pipeline/blueprints", async (req, res) => {
    try {
      const admin = await requirePipelineAdmin(req, res);
      if (!admin) return;
      const { careerType } = req.query;
      let query = "SELECT * FROM allied_blueprints ORDER BY career_type, version DESC";
      const params: any[] = [];
      if (careerType && ALLIED_CAREERS.includes(careerType as string)) {
        query = "SELECT * FROM allied_blueprints WHERE career_type = $1 ORDER BY version DESC";
        params.push(careerType);
      }
      const r = await pool.query(query, params);
      res.json(r.rows);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/allied/pipeline/blueprints", async (req, res) => {
    try {
      const admin = await requirePipelineAdmin(req, res);
      if (!admin) return;
      const { careerType } = req.body;
      if (!careerType || !ALLIED_CAREERS.includes(careerType)) {
        return res.status(400).json({ error: "Invalid careerType" });
      }
      const career = CAREER_CONFIGS[careerType as keyof typeof CAREER_CONFIGS];
      const vRes = await pool.query(
        "SELECT COALESCE(MAX(version), 0) as max_v FROM allied_blueprints WHERE career_type = $1",
        [careerType]
      );
      const nextVersion = (vRes.rows[0]?.max_v || 0) + 1;

      await pool.query("UPDATE allied_blueprints SET is_active = false WHERE career_type = $1", [careerType]);

      const specializedDomains = CAREER_BLUEPRINT_DOMAINS[careerType];
      const domainWeights: Record<string, number> = {};
      if (specializedDomains) {
        Object.entries(specializedDomains).forEach(([d, config]) => { domainWeights[d] = config.weight; });
      } else {
        const weight = parseFloat((1.0 / career.domains.length).toFixed(3));
        career.domains.forEach(d => { domainWeights[d] = weight; });
      }

      const r = await pool.query(
        `INSERT INTO allied_blueprints (career_type, version, domains, difficulty_distribution, cognitive_distribution, allowed_question_types, is_active)
         VALUES ($1, $2, $3, $4, $5, $6, true) RETURNING *`,
        [careerType, nextVersion, JSON.stringify(domainWeights), JSON.stringify(DEFAULT_DIFFICULTY_DIST), JSON.stringify(DEFAULT_COGNITIVE_DIST), JSON.stringify(DEFAULT_QUESTION_TYPES)]
      );
      res.json(r.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/allied/pipeline/blueprints/:id", async (req, res) => {
    try {
      const admin = await requirePipelineAdmin(req, res);
      if (!admin) return;
      const { domains, difficultyDistribution, cognitiveDistribution, allowedQuestionTypes } = req.body;
      const updates: string[] = [];
      const params: any[] = [];
      let idx = 1;
      if (domains) { updates.push(`domains = $${idx++}`); params.push(JSON.stringify(domains)); }
      if (difficultyDistribution) { updates.push(`difficulty_distribution = $${idx++}`); params.push(JSON.stringify(difficultyDistribution)); }
      if (cognitiveDistribution) { updates.push(`cognitive_distribution = $${idx++}`); params.push(JSON.stringify(cognitiveDistribution)); }
      if (allowedQuestionTypes) { updates.push(`allowed_question_types = $${idx++}`); params.push(JSON.stringify(allowedQuestionTypes)); }
      if (updates.length === 0) return res.status(400).json({ error: "No updates" });
      params.push(req.params.id);
      const r = await pool.query(
        `UPDATE allied_blueprints SET ${updates.join(", ")} WHERE id = $${idx} RETURNING *`,
        params
      );
      res.json(r.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/allied/pipeline/generate", async (req, res) => {
    try {
      const admin = await requirePipelineAdmin(req, res);
      if (!admin) return;
      const { careerType, count, domain, subtopic } = req.body;
      if (!careerType || !ALLIED_CAREERS.includes(careerType)) {
        return res.status(400).json({ error: "Invalid careerType" });
      }
      if (!domain) return res.status(400).json({ error: "Domain selection required" });

      const batchCount = Math.max(MIN_BATCH, Math.min(MAX_BATCH, count || 25));

      const bpRes = await pool.query(
        "SELECT * FROM allied_blueprints WHERE career_type = $1 AND is_active = true ORDER BY version DESC LIMIT 1",
        [careerType]
      );
      if (!bpRes.rows[0]) {
        return res.status(400).json({ error: "No active blueprint. Create one first." });
      }
      const blueprint = bpRes.rows[0];
      const domains = typeof blueprint.domains === "string" ? JSON.parse(blueprint.domains) : blueprint.domains;
      if (!domains[domain]) {
        return res.status(400).json({ error: `Domain "${domain}" not in blueprint` });
      }

      const batchRes = await pool.query(
        `INSERT INTO allied_batch_runs (career_type, blueprint_id, requested_count, status)
         VALUES ($1, $2, $3, 'running') RETURNING *`,
        [careerType, blueprint.id, batchCount]
      );
      const batchId = batchRes.rows[0].id;

      const existingStemsRes = await pool.query(
        "SELECT stem FROM allied_questions WHERE career_type = $1 AND status != 'rejected'",
        [careerType]
      );
      const existingStems = existingStemsRes.rows.map((r: any) => r.stem);

      const career = CAREER_CONFIGS[careerType as keyof typeof CAREER_CONFIGS];
      const diffDist = typeof blueprint.difficulty_distribution === "string" ? JSON.parse(blueprint.difficulty_distribution) : blueprint.difficulty_distribution;
      const cogDist = typeof blueprint.cognitive_distribution === "string" ? JSON.parse(blueprint.cognitive_distribution) : blueprint.cognitive_distribution;
      const allowedTypes = typeof blueprint.allowed_question_types === "string" ? JSON.parse(blueprint.allowed_question_types) : blueprint.allowed_question_types;

      res.json({
        batchId,
        careerType,
        domain,
        subtopic: subtopic || "general",
        requestedCount: batchCount,
        blueprintVersion: blueprint.version,
        status: "running",
        generationPrompt: buildGenerationPrompt(career, domain, subtopic || "general", batchCount, diffDist, cogDist, allowedTypes),
      });

      generateBatchAsync(batchId, careerType, domain, subtopic || "general", batchCount, blueprint, existingStems).catch(console.error);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/allied/pipeline/batches", async (req, res) => {
    try {
      const admin = await requirePipelineAdmin(req, res);
      if (!admin) return;
      const { careerType } = req.query;
      let query = "SELECT * FROM allied_batch_runs ORDER BY started_at DESC LIMIT 50";
      const params: any[] = [];
      if (careerType) {
        query = "SELECT * FROM allied_batch_runs WHERE career_type = $1 ORDER BY started_at DESC LIMIT 50";
        params.push(careerType);
      }
      const r = await pool.query(query, params);
      res.json(r.rows);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/allied/pipeline/questions", async (req, res) => {
    try {
      const admin = await requirePipelineAdmin(req, res);
      if (!admin) return;
      const { careerType, status, domain, difficulty, page } = req.query;
      const conditions: string[] = [];
      const params: any[] = [];
      let idx = 1;
      if (careerType) { conditions.push(`career_type = $${idx++}`); params.push(careerType); }
      if (status) { conditions.push(`status = $${idx++}`); params.push(status); }
      if (domain) { conditions.push(`blueprint_category = $${idx++}`); params.push(domain); }
      if (difficulty) { conditions.push(`difficulty = $${idx++}`); params.push(parseInt(difficulty as string)); }
      const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
      const offset = ((parseInt(page as string) || 1) - 1) * 25;
      const countRes = await pool.query(`SELECT COUNT(*) as total FROM allied_questions ${where}`, params);
      params.push(25); params.push(offset);
      const r = await pool.query(`SELECT * FROM allied_questions ${where} ORDER BY created_at DESC LIMIT $${idx++} OFFSET $${idx++}`, params);
      res.json({ questions: r.rows, total: parseInt(countRes.rows[0].total), page: parseInt(page as string) || 1 });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/allied/pipeline/questions/:id/status", async (req, res) => {
    try {
      const admin = await requirePipelineAdmin(req, res);
      if (!admin) return;
      const { status } = req.body;
      if (!["approved", "rejected", "revision"].includes(status)) {
        return res.status(400).json({ error: "Invalid status" });
      }
      const r = await pool.query(
        "UPDATE allied_questions SET status = $1 WHERE id = $2 RETURNING *",
        [status, req.params.id]
      );
      if (!r.rows[0]) return res.status(404).json({ error: "Question not found" });
      if (status === "revision") {
        await pool.query(
          "INSERT INTO allied_revision_queue (question_id, career_type, reason, severity) VALUES ($1, $2, $3, $4)",
          [req.params.id, r.rows[0].career_type, "manual_review", "medium"]
        );
      }
      res.json(r.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/allied/pipeline/revision-queue", async (req, res) => {
    try {
      const admin = await requirePipelineAdmin(req, res);
      if (!admin) return;
      const { careerType, status } = req.query;
      const conditions: string[] = [];
      const params: any[] = [];
      let idx = 1;
      if (careerType) { conditions.push(`rq.career_type = $${idx++}`); params.push(careerType); }
      if (status) { conditions.push(`rq.status = $${idx++}`); params.push(status); }
      const where = conditions.length ? `WHERE ${conditions.join(" AND ")}` : "";
      const r = await pool.query(
        `SELECT rq.*, aq.stem, aq.blueprint_category, aq.difficulty, aq.cognitive_level
         FROM allied_revision_queue rq
         LEFT JOIN allied_questions aq ON aq.id = rq.question_id
         ${where} ORDER BY rq.created_at DESC LIMIT 100`,
        params
      );
      res.json(r.rows);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.put("/api/allied/pipeline/revision-queue/:id", async (req, res) => {
    try {
      const admin = await requirePipelineAdmin(req, res);
      if (!admin) return;
      const { status, reviewNotes } = req.body;
      const r = await pool.query(
        "UPDATE allied_revision_queue SET status = $1, review_notes = $2, reviewed_at = NOW() WHERE id = $3 RETURNING *",
        [status || "reviewed", reviewNotes || "", req.params.id]
      );
      res.json(r.rows[0]);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/allied/pipeline/analytics", async (req, res) => {
    try {
      const admin = await requirePipelineAdmin(req, res);
      if (!admin) return;

      const stats: Record<string, any> = {};
      for (const ct of ALLIED_CAREERS) {
        const totalRes = await pool.query("SELECT COUNT(*) as c FROM allied_questions WHERE career_type = $1 AND status != 'rejected'", [ct]);
        const domainRes = await pool.query(
          "SELECT blueprint_category, COUNT(*) as c FROM allied_questions WHERE career_type = $1 AND status != 'rejected' GROUP BY blueprint_category",
          [ct]
        );
        const diffRes = await pool.query(
          "SELECT difficulty, COUNT(*) as c FROM allied_questions WHERE career_type = $1 AND status != 'rejected' GROUP BY difficulty ORDER BY difficulty",
          [ct]
        );
        const cogRes = await pool.query(
          "SELECT cognitive_level, COUNT(*) as c FROM allied_questions WHERE career_type = $1 AND status != 'rejected' GROUP BY cognitive_level",
          [ct]
        );
        const rationaleRes = await pool.query(
          "SELECT AVG(LENGTH(rationale_long) - LENGTH(REPLACE(rationale_long, ' ', '')) + 1) as avg_words FROM allied_questions WHERE career_type = $1 AND status != 'rejected'",
          [ct]
        );
        const rejectedRes = await pool.query("SELECT COUNT(*) as c FROM allied_questions WHERE career_type = $1 AND status = 'rejected'", [ct]);
        const totalAll = await pool.query("SELECT COUNT(*) as c FROM allied_questions WHERE career_type = $1", [ct]);
        const flashcardRes = await pool.query("SELECT COUNT(*) as c FROM allied_flashcards WHERE career_type = $1", [ct]);
        const flaggedRes = await pool.query("SELECT COUNT(*) as c FROM allied_questions WHERE career_type = $1 AND flagged = true", [ct]);
        const revisionRes = await pool.query("SELECT COUNT(*) as c FROM allied_revision_queue WHERE career_type = $1 AND status = 'pending'", [ct]);

        const total = parseInt(totalRes.rows[0].c);
        const totalInclRejected = parseInt(totalAll.rows[0].c);

        stats[ct] = {
          totalQuestions: total,
          flashcards: parseInt(flashcardRes.rows[0].c),
          flaggedCount: parseInt(flaggedRes.rows[0].c),
          pendingRevisions: parseInt(revisionRes.rows[0].c),
          domainBreakdown: Object.fromEntries(domainRes.rows.map((r: any) => [r.blueprint_category, parseInt(r.c)])),
          difficultyBreakdown: Object.fromEntries(diffRes.rows.map((r: any) => [r.difficulty, parseInt(r.c)])),
          cognitiveBreakdown: Object.fromEntries(cogRes.rows.map((r: any) => [r.cognitive_level, parseInt(r.c)])),
          avgRationaleWords: Math.round(parseFloat(rationaleRes.rows[0].avg_words || "0")),
          rejectionRate: totalInclRejected > 0 ? parseFloat(((parseInt(rejectedRes.rows[0].c) / totalInclRejected) * 100).toFixed(1)) : 0,
        };
      }
      res.json(stats);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/allied/pipeline/discrimination", async (req, res) => {
    try {
      const admin = await requirePipelineAdmin(req, res);
      if (!admin) return;
      const { careerType } = req.query;
      const conditions = ["total_attempts >= 50"];
      const params: any[] = [];
      if (careerType) { conditions.push("career_type = $1"); params.push(careerType); }
      const r = await pool.query(
        `SELECT id, career_type, stem, blueprint_category, difficulty, discrimination_index, total_attempts, correct_attempts, flagged, flag_reason
         FROM allied_questions WHERE ${conditions.join(" AND ")} ORDER BY discrimination_index ASC NULLS LAST LIMIT 100`,
        params
      );
      res.json(r.rows);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/allied/pipeline/commit-batch/:batchId", async (req, res) => {
    try {
      const admin = await requirePipelineAdmin(req, res);
      if (!admin) return;
      const { batchId } = req.params;
      const pendingRes = await pool.query(
        "SELECT * FROM allied_questions WHERE batch_id = $1 AND status = 'pending'",
        [batchId]
      );
      const questions = pendingRes.rows;
      if (questions.length === 0) return res.status(400).json({ error: "No pending questions in batch" });

      await pool.query("UPDATE allied_questions SET status = 'approved' WHERE batch_id = $1 AND status = 'pending'", [batchId]);

      let flashcardCount = 0;
      for (const q of questions) {
        const cards = generateFlashcardsFromQuestion(q);
        for (const card of cards) {
          await pool.query(
            `INSERT INTO allied_flashcards (career_type, question_id, card_type, front, back, rationale, blueprint_category, subtopic)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
            [q.career_type, q.id, card.cardType, card.front, card.back, card.rationale, q.blueprint_category, q.subtopic]
          );
          flashcardCount++;
        }
      }

      await pool.query("UPDATE allied_batch_runs SET status = 'committed' WHERE id = $1", [batchId]);

      res.json({ committed: questions.length, flashcardsGenerated: flashcardCount });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.get("/api/allied/pipeline/subtopics", async (req, res) => {
    try {
      const { careerType, domain } = req.query;
      if (!careerType || !ALLIED_CAREERS.includes(careerType as string)) {
        return res.status(400).json({ error: "Invalid careerType" });
      }
      const careerDomains = CAREER_BLUEPRINT_DOMAINS[careerType as string];
      if (!careerDomains) return res.json({ domains: {}, subtopics: [] });
      if (domain && careerDomains[domain as string]) {
        return res.json({ subtopics: careerDomains[domain as string].subtopics });
      }
      const allDomains: Record<string, string[]> = {};
      Object.entries(careerDomains).forEach(([d, config]) => {
        allDomains[d] = config.subtopics;
      });
      res.json({ domains: allDomains });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/allied/pipeline/seed-blueprints", async (req, res) => {
    try {
      const admin = await requirePipelineAdmin(req, res);
      if (!admin) return;
      const results: Record<string, any> = {};
      for (const careerType of ALLIED_CAREERS) {
        const specializedDomains = CAREER_BLUEPRINT_DOMAINS[careerType];
        if (!specializedDomains) continue;
        const existingRes = await pool.query(
          "SELECT COUNT(*) as c FROM allied_blueprints WHERE career_type = $1",
          [careerType]
        );
        if (parseInt(existingRes.rows[0].c) > 0) {
          await pool.query("UPDATE allied_blueprints SET is_active = false WHERE career_type = $1", [careerType]);
        }
        const vRes = await pool.query(
          "SELECT COALESCE(MAX(version), 0) as max_v FROM allied_blueprints WHERE career_type = $1",
          [careerType]
        );
        const nextVersion = (vRes.rows[0]?.max_v || 0) + 1;
        const domainWeights: Record<string, number> = {};
        Object.entries(specializedDomains).forEach(([d, config]) => { domainWeights[d] = config.weight; });
        const r = await pool.query(
          `INSERT INTO allied_blueprints (career_type, version, domains, difficulty_distribution, cognitive_distribution, allowed_question_types, is_active)
           VALUES ($1, $2, $3, $4, $5, $6, true) RETURNING id, career_type, version`,
          [careerType, nextVersion, JSON.stringify(domainWeights), JSON.stringify(DEFAULT_DIFFICULTY_DIST), JSON.stringify(DEFAULT_COGNITIVE_DIST), JSON.stringify(DEFAULT_QUESTION_TYPES)]
        );
        results[careerType] = { id: r.rows[0].id, version: nextVersion, domains: Object.keys(domainWeights).length };
      }
      res.json({ seeded: results });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/allied/diagnostic/submit", async (req, res) => {
    try {
      const { email, careerType, score, totalQuestions, domainBreakdown, weakAreas, strongAreas, timeSpent } = req.body;
      if (!email || !email.includes("@")) return res.status(400).json({ error: "Valid email required" });
      await pool.query(
        `INSERT INTO allied_leads (email, career_type, source, consent, diagnostic_data)
         VALUES ($1, $2, 'diagnostic', true, $3) ON CONFLICT DO NOTHING`,
        [
          email,
          careerType || null,
          JSON.stringify({ score, totalQuestions, domainBreakdown, weakAreas, strongAreas, timeSpent }),
        ]
      );
      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/allied/leads", async (req, res) => {
    try {
      const { email, careerType, source, consent } = req.body;
      if (!email || !email.includes("@")) return res.status(400).json({ error: "Valid email required" });
      await pool.query(
        "INSERT INTO allied_leads (email, career_type, source, consent) VALUES ($1, $2, $3, $4) ON CONFLICT DO NOTHING",
        [email, careerType || null, source || "homepage", consent || false]
      );
      res.json({ ok: true });
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  });

  app.post("/api/allied/checkout", async (req, res) => {
    try {
      const { planType, userId } = req.body;
      if (!planType || !["monthly", "annual"].includes(planType)) {
        return res.status(400).json({ error: "Invalid planType. Must be 'monthly' or 'annual'." });
      }
      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }

      const priceId = planType === "monthly"
        ? process.env.ALLIED_PRO_MONTHLY_PRICE_ID
        : process.env.ALLIED_PRO_ANNUAL_PRICE_ID;

      if (!priceId) {
        return res.json({ url: null, message: "Checkout is not configured yet. Please try again later." });
      }

      const stripe = await getUncachableStripeClient();

      const protocol = req.headers["x-forwarded-proto"] || "https";
      const host = req.headers.host || "localhost:5000";
      const baseUrl = `${protocol}://${host}`;

      const session = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [{ price: priceId, quantity: 1 }],
        metadata: {
          platform: "allied",
          planType,
          userId: String(userId),
        },
        success_url: `${baseUrl}/allied/pricing?success=true`,
        cancel_url: `${baseUrl}/allied/pricing?canceled=true`,
        client_reference_id: String(userId),
      });

      res.json({ url: session.url });
    } catch (e: any) {
      console.error("[Allied Checkout] Error:", e.message);
      res.status(500).json({ error: "Could not create checkout session" });
    }
  });
}

function buildGenerationPrompt(
  career: any,
  domain: string,
  subtopic: string,
  count: number,
  diffDist: Record<string, number>,
  cogDist: Record<string, any>,
  allowedTypes: string[]
): string {
  return `You are an expert ${career.name} exam item writer. Generate ${count} high-quality questions for the ${career.examNames.join("/")} exam.

DOMAIN: ${domain}
SUBTOPIC: ${subtopic}
CAREER: ${career.id}

DIFFICULTY DISTRIBUTION:
${Object.entries(diffDist).map(([d, w]) => `  Level ${d}: ${Math.round(Number(w) * 100)}%`).join("\n")}

COGNITIVE LEVEL DISTRIBUTION:
  Recall: ${cogDist.recall?.min ? Math.round(cogDist.recall.min * 100) : 10}%-${cogDist.recall?.max ? Math.round(cogDist.recall.max * 100) : 30}%
  Application: ${cogDist.application?.min ? Math.round(cogDist.application.min * 100) : 40}%-${cogDist.application?.max ? Math.round(cogDist.application.max * 100) : 60}%
  Analysis: ${cogDist.analysis?.min ? Math.round(cogDist.analysis.min * 100) : 20}%-${cogDist.analysis?.max ? Math.round(cogDist.analysis.max * 100) : 40}%

ALLOWED QUESTION TYPES: ${allowedTypes.join(", ")}

MANDATORY STRUCTURE (each question MUST include ALL fields):
{
  "learningObjective": "Clear statement of what the student should know",
  "blueprintCategory": "${domain}",
  "subtopic": "${subtopic}",
  "difficulty": 1-5,
  "cognitiveLevel": "recall|application|analysis",
  "questionType": "${allowedTypes[0]}",
  "stem": "Clinical scenario with specific patient data",
  "options": ["A", "B", "C", "D"],
  "correctAnswer": 0-3,
  "rationaleLong": "MINIMUM 600 WORDS. Must include: step-by-step reasoning, why correct answer is correct, why EACH distractor is wrong, pathophysiology explanation, 'How exam writers try to trick you' section, scenario variation explanation, priority/escalation hierarchy",
  "examTrap": "How this question tries to trick test-takers",
  "clinicalPearls": ["Pearl 1", "Pearl 2", "Pearl 3"],
  "safetyNote": "Critical safety information if applicable",
  "distractorRationales": ["Why A is wrong/right", "Why B is wrong/right", "Why C is wrong/right", "Why D is wrong/right"],
  "isFree": false
}

RULES:
- NEVER use "all of the above" or "none of the above"
- Each rationale MUST be at minimum 600 words
- Include specific clinical values, lab ranges, drug dosages
- Distractors must be plausible and commonly confused
- Each question must have a unique clinical scenario

Return a JSON array of ${count} questions.`;
}

async function generateBatchAsync(
  batchId: string,
  careerType: string,
  domain: string,
  subtopic: string,
  count: number,
  blueprint: any,
  existingStems: string[]
) {
  try {
    const career = CAREER_CONFIGS[careerType as keyof typeof CAREER_CONFIGS];
    const diffDist = typeof blueprint.difficulty_distribution === "string" ? JSON.parse(blueprint.difficulty_distribution) : blueprint.difficulty_distribution;
    const cogDist = typeof blueprint.cognitive_distribution === "string" ? JSON.parse(blueprint.cognitive_distribution) : blueprint.cognitive_distribution;
    const allowedTypes = typeof blueprint.allowed_question_types === "string" ? JSON.parse(blueprint.allowed_question_types) : blueprint.allowed_question_types;

    const prompt = buildGenerationPrompt(career, domain, subtopic, count, diffDist, cogDist, allowedTypes);

    const OpenAI = (await import("openai")).default;
    const openai = new OpenAI({
      apiKey: process.env.AI_INTEGRATIONS_OPENAI_API_KEY,
      baseURL: process.env.AI_INTEGRATIONS_OPENAI_BASE_URL,
    });

    let generated = 0;
    let accepted = 0;
    let rejected = 0;
    const rejectionReasons: Record<string, number> = {};
    const diffBreakdown: Record<number, number> = {};
    const cogBreakdown: Record<string, number> = {};
    const domBreakdown: Record<string, number> = {};
    let totalRationaleWords = 0;

    const batchSize = Math.min(count, 5);
    const iterations = Math.ceil(count / batchSize);

    for (let iter = 0; iter < iterations; iter++) {
      const iterCount = Math.min(batchSize, count - generated);
      try {
        const response = await openai.chat.completions.create({
          model: "openai/gpt-4o-mini",
          messages: [
            { role: "system", content: prompt },
            { role: "user", content: `Generate exactly ${iterCount} questions as a JSON array. Ensure each rationale is AT LEAST 600 words. Return ONLY valid JSON.` },
          ],
          max_tokens: 16000,
          temperature: 0.8,
        });

        const content = response.choices[0]?.message?.content || "";
        let questions: any[];
        try {
          const jsonMatch = content.match(/\[[\s\S]*\]/);
          questions = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
        } catch {
          questions = [];
        }

        for (const q of questions) {
          generated++;
          const validation = validateQuestion(q, existingStems, cogBreakdown, accepted);

          if (!validation.valid) {
            rejected++;
            for (const r of validation.reasons) {
              const key = r.split("_").slice(0, 2).join("_");
              rejectionReasons[key] = (rejectionReasons[key] || 0) + 1;
            }
            const rejRes = await pool.query(
              `INSERT INTO allied_questions (career_type, blueprint_id, batch_id, stem, options, correct_answer, rationale_long,
                learning_objective, blueprint_category, subtopic, difficulty, cognitive_level, question_type,
                exam_trap, clinical_pearls, safety_note, distractor_rationales, is_free, status, flag_reason)
               VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,'rejected',$19) RETURNING id`,
              [
                careerType, blueprint.id, batchId,
                q.stem || "", JSON.stringify(q.options || []), q.correctAnswer || 0, q.rationaleLong || "",
                q.learningObjective || "", q.blueprintCategory || domain, q.subtopic || subtopic,
                q.difficulty || 3, q.cognitiveLevel || "application", q.questionType || "multiple-choice",
                q.examTrap || null, JSON.stringify(q.clinicalPearls || []), q.safetyNote || null,
                JSON.stringify(q.distractorRationales || []), q.isFree || false,
                validation.reasons.join(", ")
              ]
            );
            const hasSevereIssue = validation.reasons.some(r =>
              r.includes("duplicate") || r.includes("rationale_too_short") || r.includes("all_of_the_above")
            );
            if (hasSevereIssue && rejRes.rows[0]) {
              await pool.query(
                "INSERT INTO allied_revision_queue (question_id, career_type, reason, severity) VALUES ($1, $2, $3, $4)",
                [rejRes.rows[0].id, careerType, validation.reasons.join(", "), "high"]
              );
            }
            continue;
          }

          accepted++;
          existingStems.push(q.stem);
          diffBreakdown[q.difficulty] = (diffBreakdown[q.difficulty] || 0) + 1;
          cogBreakdown[q.cognitiveLevel] = (cogBreakdown[q.cognitiveLevel] || 0) + 1;
          domBreakdown[q.blueprintCategory || domain] = (domBreakdown[q.blueprintCategory || domain] || 0) + 1;
          totalRationaleWords += wordCount(q.rationaleLong || "");

          await pool.query(
            `INSERT INTO allied_questions (career_type, blueprint_id, batch_id, stem, options, correct_answer, rationale_long,
              learning_objective, blueprint_category, subtopic, difficulty, cognitive_level, question_type,
              exam_trap, clinical_pearls, safety_note, distractor_rationales, is_free, status)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,'pending')`,
            [
              careerType, blueprint.id, batchId,
              q.stem, JSON.stringify(q.options), q.correctAnswer, q.rationaleLong,
              q.learningObjective, q.blueprintCategory || domain, q.subtopic || subtopic,
              q.difficulty, q.cognitiveLevel, q.questionType,
              q.examTrap || null, JSON.stringify(q.clinicalPearls || []), q.safetyNote || null,
              JSON.stringify(q.distractorRationales || []), q.isFree || false
            ]
          );
        }
      } catch (aiErr: any) {
        console.error(`[Allied Pipeline] AI generation error iter ${iter}:`, aiErr.message);
      }
    }

    await pool.query(
      `UPDATE allied_batch_runs SET
        generated_count = $1, accepted_count = $2, rejected_count = $3,
        rejection_reasons = $4, difficulty_breakdown = $5, cognitive_breakdown = $6,
        domain_breakdown = $7, avg_rationale_words = $8, status = 'completed', completed_at = NOW()
       WHERE id = $9`,
      [
        generated, accepted, rejected,
        JSON.stringify(rejectionReasons), JSON.stringify(diffBreakdown), JSON.stringify(cogBreakdown),
        JSON.stringify(domBreakdown), accepted > 0 ? totalRationaleWords / accepted : 0, batchId
      ]
    );

    console.log(`[Allied Pipeline] Batch ${batchId} complete: ${generated} generated, ${accepted} accepted, ${rejected} rejected`);
  } catch (e: any) {
    console.error(`[Allied Pipeline] Batch ${batchId} failed:`, e.message);
    await pool.query("UPDATE allied_batch_runs SET status = 'failed' WHERE id = $1", [batchId]);
  }
}
