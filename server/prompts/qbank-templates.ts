import { pool } from "../storage";

interface PromptVariant {
  variantKey: string;
  examKey: string;
  region: string;
  defaultCount: number;
  domainWeights: Record<string, [number, number]>;
  requiredTypeMix: Record<string, number>;
  formatRules: {
    allowed: string[];
    prohibited?: string[];
    requiredMinimums?: Record<string, number>;
  };
}

interface PromptTemplateDef {
  key: string;
  name: string;
  category: string;
  systemPrompt: string;
  userPromptTemplate: string;
  variants: PromptVariant[];
  validationRules: {
    rationaleMinWords: number;
    domainTolerance: number;
    scopeChecks: string[];
  };
  metadata: Record<string, any>;
}

const TEMPLATES: PromptTemplateDef[] = [
  {
    key: "ngn_batch_v1",
    name: "NGN Nursing Exam Questions",
    category: "nursing_ngn",
    systemPrompt: `You are a senior nursing psychometrician, NGN item writer, and exam blueprint engineer.
Generate Next Generation Nursing-style exam questions and output them in structured JSON for direct ingestion into a question bank.
DO NOT write explanations outside JSON. DO NOT compress rationales. DO NOT skip validation rules.
All questions must be clinically realistic, reflect scope of practice (PN vs RN), avoid trivia, use applied reasoning, include plausible distractors, avoid absolute terms unless clinically justified, use safety-first logic, and include prioritization logic when appropriate.`,
    userPromptTemplate: `Generate {{count}} {{examKey}} exam questions for {{region}} region.

BLUEPRINT ENFORCEMENT:
Follow Client Needs domain distribution:
{{domainWeightsBlock}}
Block generation if domain distribution is not within +-3%.

FORMAT DISTRIBUTION:
{{formatDistBlock}}

CONTENT RULES:
{{regionRules}}

OUTPUT FORMAT:
Return a JSON array of objects with these fields:
{
  "questionId": "AUTO_INCREMENT",
  "questionType": "",
  "clientNeedDomain": "",
  "subCategory": "",
  "difficulty": 1-5,
  "stem": "",
  "scenario": "",
  "options": [],
  "correctAnswer": {},
  "rationale": "",
  "clinicalPearls": [],
  "tags": [],
  "labReference": "{{labRef}}",
  "blueprintValidated": true
}

Each rationale must be minimum {{rationaleMinWords}} words.
Return ONLY valid JSON array. No commentary, no markdown.`,
    variants: [
      {
        variantKey: "rexpn_can",
        examKey: "REx-PN",
        region: "Canada",
        defaultCount: 25,
        domainWeights: {
          "Safe & Effective Care Environment": [0.26, 0.38],
          "Health Promotion & Maintenance": [0.06, 0.12],
          "Psychosocial Integrity": [0.06, 0.12],
          "Physiological Integrity": [0.38, 0.62],
        },
        requiredTypeMix: {
          CASE_CLUSTER: 4,
          BOWTIE: 2,
          MATRIX_MULTI: 2,
          MATRIX_SINGLE: 2,
          HIGHLIGHT_TEXT: 2,
          DROPDOWN_CLOZE: 2,
          DRAG_DROP_CLOZE: 2,
          SATA: 4,
          MCQ: 5,
        },
        formatRules: {
          allowed: ["BOWTIE", "MATRIX_SINGLE", "MATRIX_MULTI", "HIGHLIGHT_TEXT", "DROPDOWN_CLOZE", "DRAG_DROP_CLOZE", "SATA", "MCQ", "CASE_CLUSTER"],
        },
      },
      {
        variantKey: "nclexpn_can",
        examKey: "NCLEX-PN",
        region: "Canada",
        defaultCount: 25,
        domainWeights: {
          "Safe & Effective Care Environment": [0.26, 0.38],
          "Health Promotion & Maintenance": [0.06, 0.12],
          "Psychosocial Integrity": [0.06, 0.12],
          "Physiological Integrity": [0.38, 0.62],
        },
        requiredTypeMix: { CASE_CLUSTER: 4, BOWTIE: 2, MATRIX_MULTI: 2, SATA: 4, MCQ: 5, HIGHLIGHT_TEXT: 2, DROPDOWN_CLOZE: 2, DRAG_DROP_CLOZE: 2, MATRIX_SINGLE: 2 },
        formatRules: { allowed: ["BOWTIE", "MATRIX_SINGLE", "MATRIX_MULTI", "HIGHLIGHT_TEXT", "DROPDOWN_CLOZE", "DRAG_DROP_CLOZE", "SATA", "MCQ", "CASE_CLUSTER"] },
      },
      {
        variantKey: "nclexpn_us",
        examKey: "NCLEX-PN",
        region: "US",
        defaultCount: 25,
        domainWeights: {
          "Safe & Effective Care Environment": [0.26, 0.38],
          "Health Promotion & Maintenance": [0.06, 0.12],
          "Psychosocial Integrity": [0.06, 0.12],
          "Physiological Integrity": [0.38, 0.62],
        },
        requiredTypeMix: { CASE_CLUSTER: 4, BOWTIE: 2, MATRIX_MULTI: 2, SATA: 4, MCQ: 5, HIGHLIGHT_TEXT: 2, DROPDOWN_CLOZE: 2, DRAG_DROP_CLOZE: 2, MATRIX_SINGLE: 2 },
        formatRules: { allowed: ["BOWTIE", "MATRIX_SINGLE", "MATRIX_MULTI", "HIGHLIGHT_TEXT", "DROPDOWN_CLOZE", "DRAG_DROP_CLOZE", "SATA", "MCQ", "CASE_CLUSTER"] },
      },
      {
        variantKey: "nclexrn_us",
        examKey: "NCLEX-RN",
        region: "US",
        defaultCount: 25,
        domainWeights: {
          "Safe & Effective Care Environment": [0.26, 0.38],
          "Health Promotion & Maintenance": [0.06, 0.12],
          "Psychosocial Integrity": [0.06, 0.12],
          "Physiological Integrity": [0.38, 0.62],
        },
        requiredTypeMix: { CASE_CLUSTER: 4, BOWTIE: 2, MATRIX_MULTI: 2, SATA: 4, MCQ: 5, HIGHLIGHT_TEXT: 2, DROPDOWN_CLOZE: 2, DRAG_DROP_CLOZE: 2, MATRIX_SINGLE: 2 },
        formatRules: { allowed: ["BOWTIE", "MATRIX_SINGLE", "MATRIX_MULTI", "HIGHLIGHT_TEXT", "DROPDOWN_CLOZE", "DRAG_DROP_CLOZE", "SATA", "MCQ", "CASE_CLUSTER"] },
      },
      {
        variantKey: "nclexrn_can",
        examKey: "NCLEX-RN",
        region: "Canada",
        defaultCount: 25,
        domainWeights: {
          "Safe & Effective Care Environment": [0.26, 0.38],
          "Health Promotion & Maintenance": [0.06, 0.12],
          "Psychosocial Integrity": [0.06, 0.12],
          "Physiological Integrity": [0.38, 0.62],
        },
        requiredTypeMix: { CASE_CLUSTER: 4, BOWTIE: 2, MATRIX_MULTI: 2, SATA: 4, MCQ: 5, HIGHLIGHT_TEXT: 2, DROPDOWN_CLOZE: 2, DRAG_DROP_CLOZE: 2, MATRIX_SINGLE: 2 },
        formatRules: { allowed: ["BOWTIE", "MATRIX_SINGLE", "MATRIX_MULTI", "HIGHLIGHT_TEXT", "DROPDOWN_CLOZE", "DRAG_DROP_CLOZE", "SATA", "MCQ", "CASE_CLUSTER"] },
      },
    ],
    validationRules: {
      rationaleMinWords: 250,
      domainTolerance: 0.03,
      scopeChecks: ["pn_scope", "rn_scope", "region_units"],
    },
    metadata: { author: "NurseNest", version: "1.0", examTypes: ["REx-PN", "NCLEX-PN", "NCLEX-RN"] },
  },

  {
    key: "allied_batch_v1",
    name: "Allied Health Exam Questions",
    category: "allied",
    systemPrompt: `You are a senior psychometrician, licensing exam blueprint analyst, and allied health item writer.
Generate licensing-level exam questions for the specified allied profession and output structured JSON ready for direct ingestion into a question bank.
DO NOT include commentary. DO NOT include markdown. DO NOT shorten rationales. OUTPUT CLEAN JSON ONLY.
All items must reflect real licensing exam cognitive level, avoid textbook trivia, focus on applied reasoning, include plausible distractors, respect scope of practice, avoid absolutes unless clinically justified, and include safety-first reasoning.`,
    userPromptTemplate: `Generate {{count}} licensing-level exam questions for {{examKey}} profession.

BLUEPRINT ENFORCEMENT:
{{domainWeightsBlock}}
Block generation if distribution not met +-3%.

FORMAT DISTRIBUTION:
{{formatDistBlock}}

QUALITY RULES:
All items must reflect real licensing exam cognitive level, avoid textbook trivia, focus on applied reasoning, include plausible distractors, respect scope of practice.

OUTPUT FORMAT:
Return a JSON array of objects:
{
  "questionId": "AUTO_INCREMENT",
  "questionType": "",
  "domain": "",
  "subDomain": "",
  "difficulty": 1-5,
  "stem": "",
  "scenario": "",
  "options": [],
  "correctAnswer": {},
  "rationale": "",
  "clinicalPearls": [],
  "tags": [],
  "blueprintValidated": true
}

Each rationale must be minimum {{rationaleMinWords}} words.
Return ONLY valid JSON array.`,
    variants: [
      {
        variantKey: "mlt",
        examKey: "MLT",
        region: "US",
        defaultCount: 25,
        domainWeights: { "Clinical Chemistry": [0.25, 0.35], "Hematology & Coagulation": [0.20, 0.30], "Microbiology": [0.20, 0.30], "Transfusion Medicine": [0.10, 0.15], "Immunology/Molecular/Lab Ops": [0.10, 0.20] },
        requiredTypeMix: { MCQ_SINGLE: 10, CASE_BASED_CLUSTER: 5, NUMERIC_ENTRY: 3, DATA_TABLE_INTERPRETATION: 3, MATCHING: 2 },
        formatRules: { allowed: ["MCQ_SINGLE", "CASE_BASED_CLUSTER", "NUMERIC_ENTRY", "MATCHING", "DATA_TABLE_INTERPRETATION", "MATRIX_SINGLE"], prohibited: ["BOWTIE", "DRAG_DROP_CLOZE", "HIGHLIGHT_TEXT"] },
      },
      {
        variantKey: "pharm_tech",
        examKey: "Pharmacy Technician",
        region: "US",
        defaultCount: 25,
        domainWeights: { "Prescription Processing": [0.25, 0.35], "Pharmacology Basics": [0.20, 0.30], "Calculations": [0.20, 0.30], "Compounding": [0.10, 0.20], "Law & Ethics": [0.10, 0.15] },
        requiredTypeMix: { MCQ_SINGLE: 10, NUMERIC_ENTRY: 5, CASE_BASED_CLUSTER: 5, MATCHING: 3, PRIORITIZATION: 2 },
        formatRules: { allowed: ["MCQ_SINGLE", "NUMERIC_ENTRY", "CASE_BASED_CLUSTER", "MATCHING", "PRIORITIZATION"], prohibited: ["BOWTIE", "DRAG_DROP_CLOZE", "HIGHLIGHT_TEXT"] },
      },
      {
        variantKey: "paramedic",
        examKey: "Paramedic",
        region: "US",
        defaultCount: 25,
        domainWeights: { "Airway & Respiratory": [0.20, 0.30], "Cardiology": [0.20, 0.30], "Trauma": [0.20, 0.25], "Medical Emergencies": [0.15, 0.25], "Professional Practice": [0.05, 0.10] },
        requiredTypeMix: { MCQ_SINGLE: 10, CASE_BASED_CLUSTER: 8, PRIORITIZATION: 5, NUMERIC_ENTRY: 2 },
        formatRules: { allowed: ["MCQ_SINGLE", "CASE_BASED_CLUSTER", "PRIORITIZATION", "NUMERIC_ENTRY"], prohibited: ["BOWTIE", "DRAG_DROP_CLOZE", "HIGHLIGHT_TEXT"] },
      },
      {
        variantKey: "rrt",
        examKey: "RRT",
        region: "US",
        defaultCount: 25,
        domainWeights: { "Airway Management": [0.08, 0.12], "Oxygen Therapy": [0.06, 0.10], "ABG Interpretation": [0.08, 0.12], "Mechanical Ventilation": [0.10, 0.14], "Pulmonary Function Testing": [0.04, 0.08], "Neonatal & Pediatric Respiratory Care": [0.06, 0.10], "Critical Care Respiratory Therapy": [0.08, 0.12], "Cardiopulmonary Physiology": [0.06, 0.10], "Aerosol & Medication Delivery": [0.04, 0.08], "Sleep & Noninvasive Ventilation": [0.04, 0.08], "Emergency Respiratory Care": [0.04, 0.08], "Patient Assessment": [0.04, 0.08], "Infection Control & Equipment": [0.02, 0.06] },
        requiredTypeMix: { MCQ_SINGLE: 10, CASE_BASED_CLUSTER: 8, NUMERIC_ENTRY: 4, DATA_TABLE_INTERPRETATION: 3 },
        formatRules: { allowed: ["MCQ_SINGLE", "CASE_BASED_CLUSTER", "NUMERIC_ENTRY", "DATA_TABLE_INTERPRETATION"], prohibited: ["BOWTIE", "DRAG_DROP_CLOZE", "HIGHLIGHT_TEXT"] },
      },
      {
        variantKey: "imaging",
        examKey: "Diagnostic Imaging",
        region: "US",
        defaultCount: 25,
        domainWeights: { "Patient Care & Safety": [0.20, 0.30], "Radiation Physics": [0.20, 0.30], "Imaging Procedures & Positioning": [0.25, 0.35], "Image Production & Evaluation": [0.15, 0.25], "Radiation Protection": [0.10, 0.15] },
        requiredTypeMix: { MCQ_SINGLE: 10, CASE_BASED_CLUSTER: 8, CALCULATION: 4, MATCHING: 3 },
        formatRules: { allowed: ["MCQ_SINGLE", "CASE_BASED_CLUSTER", "CALCULATION", "MATCHING"], prohibited: ["BOWTIE", "DRAG_DROP_CLOZE", "HIGHLIGHT_TEXT"] },
      },
      {
        variantKey: "ot",
        examKey: "Occupational Therapy",
        region: "US",
        defaultCount: 25,
        domainWeights: { "Evaluation & Assessment": [0.25, 0.35], "Intervention Planning & Implementation": [0.30, 0.40], "Professional Practice & Ethics": [0.15, 0.25], "Psychosocial & Mental Health": [0.10, 0.20], "Pediatrics & Development": [0.10, 0.20] },
        requiredTypeMix: { MCQ_SINGLE: 10, CASE_BASED_CLUSTER: 8, PRIORITIZATION: 5, MATCHING: 2 },
        formatRules: { allowed: ["MCQ_SINGLE", "CASE_BASED_CLUSTER", "PRIORITIZATION", "MATCHING", "SHORT_CASE_ANALYSIS"], prohibited: ["BOWTIE", "DRAG_DROP_CLOZE", "HIGHLIGHT_TEXT"] },
      },
      {
        variantKey: "pt",
        examKey: "Physical Therapy",
        region: "US",
        defaultCount: 25,
        domainWeights: { "Musculoskeletal": [0.25, 0.35], "Neuromuscular": [0.20, 0.30], "Cardiopulmonary": [0.10, 0.20], "Other Systems": [0.10, 0.15], "Non-System / Professional": [0.10, 0.20] },
        requiredTypeMix: { MCQ_SINGLE: 10, CASE_BASED_CLUSTER: 8, DIFFERENTIAL_DIAGNOSIS: 5, PRIORITIZATION: 2 },
        formatRules: { allowed: ["MCQ_SINGLE", "CASE_BASED_CLUSTER", "PRIORITIZATION", "DIFFERENTIAL_DIAGNOSIS", "NUMERIC_ENTRY", "PROGRESSION_DECISION"], prohibited: ["BOWTIE", "DRAG_DROP_CLOZE", "HIGHLIGHT_TEXT"] },
      },
      {
        variantKey: "psychotherapist",
        examKey: "Psychotherapist",
        region: "US",
        defaultCount: 25,
        domainWeights: { "Ethics & Professional Standards": [0.25, 0.35], "Assessment & Diagnosis": [0.20, 0.30], "Treatment Planning": [0.20, 0.30], "Crisis & Risk Management": [0.10, 0.20] },
        requiredTypeMix: { MCQ_SINGLE: 10, CASE_BASED_CLUSTER: 8, PRIORITIZATION: 5, SHORT_CASE_ANALYSIS: 2 },
        formatRules: { allowed: ["MCQ_SINGLE", "CASE_BASED_CLUSTER", "PRIORITIZATION", "SHORT_CASE_ANALYSIS"], prohibited: ["BOWTIE", "DRAG_DROP_CLOZE", "HIGHLIGHT_TEXT"] },
      },
      {
        variantKey: "social_worker",
        examKey: "ASWB/Canadian Social Work",
        region: "BOTH",
        defaultCount: 50,
        domainWeights: {
          "Human Behavior & Development": [0.15, 0.20],
          "Assessment & Diagnosis": [0.18, 0.22],
          "Intervention & Treatment Planning": [0.20, 0.25],
          "Ethics & Professional Practice": [0.18, 0.22],
          "Community Resources": [0.10, 0.15],
          "Crisis Intervention": [0.10, 0.15],
        },
        requiredTypeMix: { MCQ_SINGLE: 20, CASE_BASED_CLUSTER: 20, PRIORITIZATION: 10 },
        formatRules: { allowed: ["MCQ_SINGLE", "CASE_BASED_CLUSTER", "PRIORITIZATION"], prohibited: ["BOWTIE", "DRAG_DROP_CLOZE", "HIGHLIGHT_TEXT"] },
      },
      {
        variantKey: "addictions_worker",
        examKey: "Addictions Worker",
        region: "US",
        defaultCount: 25,
        domainWeights: { "Foundations of Addiction": [0.20, 0.30], "Counseling Techniques": [0.25, 0.35], "Harm Reduction": [0.15, 0.25], "Crisis & Withdrawal": [0.15, 0.20], "Ethics & Legal": [0.10, 0.15] },
        requiredTypeMix: { MCQ_SINGLE: 10, CASE_BASED_CLUSTER: 8, PRIORITIZATION: 5 },
        formatRules: { allowed: ["MCQ_SINGLE", "CASE_BASED_CLUSTER", "PRIORITIZATION"], prohibited: ["BOWTIE", "DRAG_DROP_CLOZE", "HIGHLIGHT_TEXT"] },
      },
      {
        variantKey: "peds_nursing",
        examKey: "Pediatric Nursing",
        region: "US",
        defaultCount: 25,
        domainWeights: { "Neonatal Care": [0.18, 0.22], "Developmental Milestones": [0.18, 0.22], "Pediatric Infections": [0.18, 0.22], "Congenital Disorders": [0.18, 0.22], "Pediatric Emergencies": [0.18, 0.22] },
        requiredTypeMix: { MCQ_SINGLE: 10, CASE_BASED_CLUSTER: 8, PRIORITIZATION: 5, MATCHING: 2 },
        formatRules: { allowed: ["MCQ_SINGLE", "CASE_BASED_CLUSTER", "PRIORITIZATION", "MATCHING"], prohibited: ["BOWTIE", "DRAG_DROP_CLOZE", "HIGHLIGHT_TEXT"] },
      },
    ],
    validationRules: {
      rationaleMinWords: 250,
      domainTolerance: 0.03,
      scopeChecks: ["profession_scope", "prohibited_formats"],
    },
    metadata: { author: "NurseNest", version: "1.0", professions: 11 },
  },

  {
    key: "cnpe_v1",
    name: "Canadian NP Exam (CNPE 2025+)",
    category: "np_canada",
    systemPrompt: `You are a senior Canadian NP psychometrician writing for the NEW Canadian Nurse Practitioner Examination (CNPE 2025+ format).
This exam emphasizes competency-based clinical reasoning, primary care integration, population health, Indigenous health and cultural safety, ethical and professional accountability, interprofessional collaboration, and systems navigation.
DO NOT mimic American NP exams. Generate CNPE-aligned questions with Canadian lab values (mmol/L), Canadian prescribing authority context, rural/remote care considerations, and Indigenous health scenarios.
All questions must use MCQ_SINGLE format only, be case vignette driven, and emphasize clinical reasoning.`,
    userPromptTemplate: `Generate {{count}} CNPE-aligned questions for Canadian Nurse Practitioners.

REQUIREMENTS:
- >=65% case-based scenarios
- >=20% therapeutic management
- >=15% urgent referral/red flag recognition
- Canadian lab values (mmol/L)
- Canadian prescribing authority context
- Rural/remote care considerations
- Indigenous health scenarios
- Public system navigation logic

DOMAIN DISTRIBUTION:
{{domainWeightsBlock}}

FORMAT: MCQ_SINGLE only, case vignette driven, clinical reasoning heavy.

OUTPUT FORMAT:
Return a JSON array:
{
  "questionId": "AUTO_INCREMENT",
  "questionType": "MCQ_SINGLE",
  "domain": "",
  "subDomain": "",
  "difficulty": 1-5,
  "stem": "",
  "scenario": "",
  "options": [],
  "correctAnswer": "",
  "rationale": "",
  "clinicalPearls": [],
  "tags": [],
  "blueprintValidated": true
}

Each rationale must be minimum {{rationaleMinWords}} words.
Return ONLY valid JSON array.`,
    variants: [
      {
        variantKey: "cnpe_2025",
        examKey: "CNPE",
        region: "Canada",
        defaultCount: 25,
        domainWeights: {
          "Health Assessment & Diagnosis": [0.20, 0.30],
          "Therapeutic Management": [0.20, 0.30],
          "Health Promotion & Prevention": [0.15, 0.25],
          "Professional Role & Accountability": [0.10, 0.20],
          "System Navigation & Collaboration": [0.10, 0.20],
        },
        requiredTypeMix: { MCQ_SINGLE: 25 },
        formatRules: { allowed: ["MCQ_SINGLE"], prohibited: ["BOWTIE", "MATRIX_SINGLE", "MATRIX_MULTI", "DRAG_DROP_CLOZE", "HIGHLIGHT_TEXT", "DROPDOWN_CLOZE"] },
      },
    ],
    validationRules: {
      rationaleMinWords: 250,
      domainTolerance: 0.03,
      scopeChecks: ["np_scope", "canadian_units", "indigenous_health"],
    },
    metadata: { author: "NurseNest", version: "1.0", country: "Canada", examFormat: "CNPE 2025+" },
  },

  {
    key: "np_us_v1",
    name: "US NP Board Certification Exams",
    category: "np_us",
    systemPrompt: `You are a senior NP board exam psychometrician and certification blueprint analyst writing advanced practice Nurse Practitioner board certification questions.
NP exams are NOT NGN. Do NOT use NGN formats. MCQ_SINGLE only.
Each exam type must be treated as a completely separate blueprint. DO NOT merge American and Canadian formats.
All questions must follow domain weighting, include case-based vignettes (>=60%), pharmacology management (>=20%), differential diagnosis (>=15%), and urgent referral scenarios (>=10%).
Use US lab units (mg/dL), include prescriptive authority logic.`,
    userPromptTemplate: `Generate {{count}} {{examKey}}-aligned board certification questions.

REQUIREMENTS:
- >=60% case-based vignettes
- >=20% pharmacology management
- >=15% differential diagnosis
- >=10% urgent/emergent referral
- US labs (mg/dL)
- {{examSpecificRules}}

DOMAIN DISTRIBUTION:
{{domainWeightsBlock}}

FORMAT: MCQ_SINGLE only. No NGN, no matrix, no drag-drop, no cloze.

DIFFICULTY DISTRIBUTION:
- 25% moderate recall
- 50% applied reasoning
- 25% complex multi-step clinical reasoning

OUTPUT FORMAT:
Return a JSON array:
{
  "questionId": "AUTO_INCREMENT",
  "questionType": "MCQ_SINGLE",
  "domain": "",
  "subDomain": "",
  "difficulty": 1-5,
  "stem": "",
  "scenario": "",
  "options": [],
  "correctAnswer": "",
  "rationale": "",
  "clinicalPearls": [],
  "tags": [],
  "blueprintValidated": true
}

Each rationale must be minimum {{rationaleMinWords}} words.
All pharmacology questions must include mechanism, contraindications, and monitoring.
Return ONLY valid JSON array.`,
    variants: [
      {
        variantKey: "aanp_fnp",
        examKey: "AANP FNP",
        region: "US",
        defaultCount: 25,
        domainWeights: {
          "Assessment & Diagnosis": [0.35, 0.40],
          "Clinical Management & Treatment": [0.35, 0.40],
          "Health Promotion": [0.10, 0.15],
        },
        requiredTypeMix: { MCQ_SINGLE: 25 },
        formatRules: { allowed: ["MCQ_SINGLE"], prohibited: ["BOWTIE", "MATRIX_SINGLE", "MATRIX_MULTI", "DRAG_DROP_CLOZE", "HIGHLIGHT_TEXT", "DROPDOWN_CLOZE"] },
      },
      {
        variantKey: "ancc_fnp",
        examKey: "ANCC FNP",
        region: "US",
        defaultCount: 25,
        domainWeights: {
          "Assessment & Diagnosis": [0.30, 0.35],
          "Clinical Management & Treatment": [0.30, 0.35],
          "Health Promotion": [0.10, 0.15],
          "Professional Practice": [0.05, 0.10],
          "Research & Evidence": [0.05, 0.10],
        },
        requiredTypeMix: { MCQ_SINGLE: 25 },
        formatRules: { allowed: ["MCQ_SINGLE"], prohibited: ["BOWTIE", "MATRIX_SINGLE", "MATRIX_MULTI", "DRAG_DROP_CLOZE", "HIGHLIGHT_TEXT", "DROPDOWN_CLOZE"] },
      },
      {
        variantKey: "agnp",
        examKey: "AGNP",
        region: "US",
        defaultCount: 25,
        domainWeights: {
          "Adult/Geriatric Disease Management": [0.30, 0.40],
          "Chronic Illness Management": [0.20, 0.30],
          "Acute Episodic Care": [0.15, 0.25],
          "Palliative & End-of-Life": [0.10, 0.15],
          "Health Promotion": [0.10, 0.15],
        },
        requiredTypeMix: { MCQ_SINGLE: 25 },
        formatRules: { allowed: ["MCQ_SINGLE"], prohibited: ["BOWTIE", "MATRIX_SINGLE", "MATRIX_MULTI", "DRAG_DROP_CLOZE", "HIGHLIGHT_TEXT", "DROPDOWN_CLOZE"] },
      },
      {
        variantKey: "pmhnp",
        examKey: "PMHNP",
        region: "US",
        defaultCount: 25,
        domainWeights: {
          "Psychiatric Assessment": [0.25, 0.35],
          "Psychopharmacology": [0.25, 0.35],
          "Therapy Modalities": [0.15, 0.25],
          "Crisis Intervention": [0.10, 0.20],
          "Professional Practice": [0.05, 0.10],
        },
        requiredTypeMix: { MCQ_SINGLE: 25 },
        formatRules: { allowed: ["MCQ_SINGLE"], prohibited: ["BOWTIE", "MATRIX_SINGLE", "MATRIX_MULTI", "DRAG_DROP_CLOZE", "HIGHLIGHT_TEXT", "DROPDOWN_CLOZE"] },
      },
    ],
    validationRules: {
      rationaleMinWords: 250,
      domainTolerance: 0.03,
      scopeChecks: ["np_scope", "us_units", "no_ngn_formats"],
    },
    metadata: { author: "NurseNest", version: "1.0", country: "US", examTypes: ["AANP FNP", "ANCC FNP", "AGNP", "PMHNP"] },
  },

  {
    key: "np_seo_v1",
    name: "NP SEO Content Architecture",
    category: "seo",
    systemPrompt: `You are a senior SEO strategist and medical education content architect building board-level Nurse Practitioner exam preparation content.
Strictly separate Canadian (CNPE) and American (AANP, ANCC, AGNP, PMHNP) content. Do NOT mix US and Canada on any page. Do NOT reference NCLEX anywhere. NP is board certification.
Create original, authority-driven language. Professional, data-driven tone. No hype. No exaggerated guarantees.`,
    userPromptTemplate: `Generate SEO content for {{examKey}} exam preparation.

CONTENT TYPE: {{contentType}}
TARGET LENGTH: {{targetLength}} words minimum
KEYWORD CLUSTER: {{keywordCluster}}

REQUIREMENTS:
- {{regionRules}}
- Include FAQ section (8-12 questions)
- Internal linking structure
- H1/H2/H3 hierarchy
- No competitor wording

OUTPUT FORMAT:
Return JSON:
{
  "title": "",
  "metaDescription": "",
  "h1": "",
  "sections": [{"heading": "", "level": 2, "content": "", "wordCount": 0}],
  "faq": [{"question": "", "answer": ""}],
  "internalLinks": [],
  "keywords": []
}

Return ONLY valid JSON.`,
    variants: [
      {
        variantKey: "np_canada_pillar",
        examKey: "CNPE",
        region: "Canada",
        defaultCount: 1,
        domainWeights: {},
        requiredTypeMix: {},
        formatRules: { allowed: ["CONTENT"] },
      },
      {
        variantKey: "aanp_silo",
        examKey: "AANP FNP",
        region: "US",
        defaultCount: 1,
        domainWeights: {},
        requiredTypeMix: {},
        formatRules: { allowed: ["CONTENT"] },
      },
      {
        variantKey: "ancc_silo",
        examKey: "ANCC FNP",
        region: "US",
        defaultCount: 1,
        domainWeights: {},
        requiredTypeMix: {},
        formatRules: { allowed: ["CONTENT"] },
      },
      {
        variantKey: "agnp_silo",
        examKey: "AGNP",
        region: "US",
        defaultCount: 1,
        domainWeights: {},
        requiredTypeMix: {},
        formatRules: { allowed: ["CONTENT"] },
      },
      {
        variantKey: "pmhnp_silo",
        examKey: "PMHNP",
        region: "US",
        defaultCount: 1,
        domainWeights: {},
        requiredTypeMix: {},
        formatRules: { allowed: ["CONTENT"] },
      },
    ],
    validationRules: {
      rationaleMinWords: 0,
      domainTolerance: 0,
      scopeChecks: ["no_cross_region"],
    },
    metadata: {
      author: "NurseNest",
      version: "1.0",
      seoArchitecture: {
        canadianUrls: ["/np-canada", "/np-canada/blueprint", "/np-canada/new-exam-format", "/np-canada/mock-exams", "/np-canada/practice-questions", "/np-canada/case-examples", "/np-canada/passing-score", "/np-canada/cnpe-vs-aanp"],
        usUrls: { aanp: ["/np-aanp-fnp", "/np-aanp-fnp/blueprint", "/np-aanp-fnp/mock-exams", "/np-aanp-fnp/practice-questions", "/np-aanp-fnp/passing-score", "/np-aanp-fnp/aanp-vs-ancc"], ancc: ["/np-ancc-fnp"], agnp: ["/np-agnp"], pmhnp: ["/np-pmhnp"] },
      },
    },
  },
];

function buildDomainWeightsBlock(weights: Record<string, [number, number]>): string {
  if (!weights || Object.keys(weights).length === 0) return "No specific domain weighting required.";
  return Object.entries(weights)
    .map(([domain, [min, max]]) => `- ${domain}: ${(min * 100).toFixed(0)}%-${(max * 100).toFixed(0)}%`)
    .join("\n");
}

function buildFormatDistBlock(typeMix: Record<string, number>, count: number): string {
  if (!typeMix || Object.keys(typeMix).length === 0) return "Use appropriate question formats.";
  const total = Object.values(typeMix).reduce((a, b) => a + b, 0);
  const scale = count / total;
  return Object.entries(typeMix)
    .map(([type, base]) => {
      const scaled = Math.max(1, Math.round(base * scale));
      return `- ${type}: ${scaled} questions`;
    })
    .join("\n");
}

export async function seedPromptTemplates(): Promise<void> {
  for (const tmpl of TEMPLATES) {
    const existing = await pool.query("SELECT id FROM qbank_prompt_templates WHERE key = $1", [tmpl.key]);
    if (existing.rows.length > 0) {
      await pool.query(
        `UPDATE qbank_prompt_templates SET name = $1, category = $2, system_prompt = $3, user_prompt_template = $4, variants = $5, validation_rules = $6, metadata = $7, updated_at = NOW() WHERE key = $8`,
        [tmpl.name, tmpl.category, tmpl.systemPrompt, tmpl.userPromptTemplate, JSON.stringify(tmpl.variants), JSON.stringify(tmpl.validationRules), JSON.stringify(tmpl.metadata), tmpl.key]
      );
    } else {
      await pool.query(
        `INSERT INTO qbank_prompt_templates (key, name, category, system_prompt, user_prompt_template, variants, validation_rules, metadata) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [tmpl.key, tmpl.name, tmpl.category, tmpl.systemPrompt, tmpl.userPromptTemplate, JSON.stringify(tmpl.variants), JSON.stringify(tmpl.validationRules), JSON.stringify(tmpl.metadata)]
      );
    }
  }
  console.log(`[QBank Templates] Seeded ${TEMPLATES.length} prompt templates`);
}

export async function getActiveTemplates(): Promise<any[]> {
  const r = await pool.query("SELECT id, key, name, category, version, is_active, variants, metadata, created_at FROM qbank_prompt_templates WHERE is_active = true ORDER BY category, key");
  return r.rows.map((row: any) => ({
    ...row,
    variants: typeof row.variants === "string" ? JSON.parse(row.variants) : row.variants,
    variantCount: Array.isArray(row.variants) ? row.variants.length : (typeof row.variants === "string" ? JSON.parse(row.variants).length : 0),
  }));
}

export async function getTemplateByKey(key: string): Promise<any | null> {
  const r = await pool.query("SELECT * FROM qbank_prompt_templates WHERE key = $1 AND is_active = true", [key]);
  if (!r.rows[0]) return null;
  const row = r.rows[0];
  return {
    ...row,
    variants: typeof row.variants === "string" ? JSON.parse(row.variants) : row.variants,
    validationRules: typeof row.validation_rules === "string" ? JSON.parse(row.validation_rules) : row.validation_rules,
  };
}

export async function renderPromptForVariant(
  templateKey: string,
  variantKey: string,
  params: { count?: number; rationaleMinWords?: number }
): Promise<{ systemPrompt: string; userPrompt: string; validationRules: any; variant: any } | null> {
  const template = await getTemplateByKey(templateKey);
  if (!template) return null;

  const variants = template.variants as PromptVariant[];
  const variant = variants.find((v: PromptVariant) => v.variantKey === variantKey);
  if (!variant) return null;

  const count = params.count || variant.defaultCount;
  const rationaleMinWords = params.rationaleMinWords || template.validationRules?.rationaleMinWords || 250;

  const domainWeightsBlock = buildDomainWeightsBlock(variant.domainWeights);
  const formatDistBlock = buildFormatDistBlock(variant.requiredTypeMix, count);

  let regionRules = "";
  if (variant.region === "Canada") {
    regionRules = "Use Canadian lab values (mmol/L, Celsius). Use Canadian medication naming where applicable. Include Canadian healthcare system context.";
  } else {
    regionRules = "Use US lab values (mg/dL, Fahrenheit). Use US medication naming. Include US healthcare system context where relevant.";
  }

  let examSpecificRules = "";
  if (variant.examKey === "AANP FNP") examSpecificRules = "Clinical focus only. No professional role theory. Heavy diagnosis and management.";
  else if (variant.examKey === "ANCC FNP") examSpecificRules = "Clinical + professional practice. Include Medicare/insurance considerations.";
  else if (variant.examKey === "AGNP") examSpecificRules = "Adult/geriatric disease management focus. Include chronic illness and palliative care.";
  else if (variant.examKey === "PMHNP") examSpecificRules = "Psychiatric assessment and psychopharmacology focus. Include crisis intervention.";

  const labRef = variant.region === "Canada" ? "CAN" : "US";

  let userPrompt = template.user_prompt_template || template.userPromptTemplate;
  userPrompt = userPrompt
    .replace(/\{\{count\}\}/g, String(count))
    .replace(/\{\{examKey\}\}/g, variant.examKey)
    .replace(/\{\{region\}\}/g, variant.region)
    .replace(/\{\{rationaleMinWords\}\}/g, String(rationaleMinWords))
    .replace(/\{\{domainWeightsBlock\}\}/g, domainWeightsBlock)
    .replace(/\{\{formatDistBlock\}\}/g, formatDistBlock)
    .replace(/\{\{regionRules\}\}/g, regionRules)
    .replace(/\{\{examSpecificRules\}\}/g, examSpecificRules)
    .replace(/\{\{labRef\}\}/g, labRef)
    .replace(/\{\{contentType\}\}/g, "pillar_page")
    .replace(/\{\{targetLength\}\}/g, "2500")
    .replace(/\{\{keywordCluster\}\}/g, variant.examKey);

  return {
    systemPrompt: template.system_prompt || template.systemPrompt,
    userPrompt,
    validationRules: template.validationRules || template.validation_rules,
    variant,
  };
}
