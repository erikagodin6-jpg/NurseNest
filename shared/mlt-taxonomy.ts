export const MLT_DISCIPLINES = [
  "Clinical Chemistry",
  "Hematology",
  "Hemostasis / Coagulation",
  "Immunohematology / Blood Banking",
  "Microbiology",
  "Urinalysis & Body Fluids",
  "Immunology / Serology",
  "Molecular Diagnostics",
  "Histotechnology",
  "Cytotechnology",
  "Mycology",
  "Parasitology",
  "Virology",
  "Phlebotomy & Specimen Collection",
  "Laboratory Operations & Quality Management",
  "Point-of-Care Testing",
] as const;

export type MltDiscipline = (typeof MLT_DISCIPLINES)[number];

export const MLT_SUBDISCIPLINES: Record<string, string[]> = {
  "Clinical Chemistry": [
    "Carbohydrates",
    "Lipids & Lipoproteins",
    "Proteins & Amino Acids",
    "Enzymes",
    "Electrolytes & Blood Gases",
    "Liver Function",
    "Renal Function",
    "Endocrine / Hormones",
    "Tumor Markers",
    "Therapeutic Drug Monitoring",
    "Toxicology",
    "Instrumentation (Spectrophotometry, ISE, HPLC)",
  ],
  "Hematology": [
    "Erythrocytes (RBC Morphology & Disorders)",
    "Leukocytes (WBC Morphology & Disorders)",
    "Platelets & Megakaryocytes",
    "Hemoglobin & Hemoglobinopathies",
    "Hematopoiesis",
    "Anemias (Iron-deficiency, Megaloblastic, Hemolytic)",
    "Leukemias & Lymphomas",
    "Automated Hematology Analyzers",
    "Manual Differential",
    "Peripheral Blood Smear Evaluation",
    "ESR & Reticulocyte Count",
  ],
  "Hemostasis / Coagulation": [
    "Coagulation Cascade (Intrinsic, Extrinsic, Common)",
    "PT / INR",
    "aPTT",
    "Fibrinolysis",
    "D-dimer & FDP",
    "Platelet Function Testing",
    "DIC",
    "Anticoagulant Therapy Monitoring",
    "Mixing Studies",
    "Thrombophilia Screening",
  ],
  "Immunohematology / Blood Banking": [
    "ABO & Rh Blood Group Systems",
    "Antibody Identification",
    "Crossmatch Procedures",
    "Direct & Indirect Antiglobulin Test (DAT/IAT)",
    "Transfusion Reactions",
    "Component Therapy",
    "Hemolytic Disease of the Fetus & Newborn (HDFN)",
    "Blood Donor Screening",
    "Irradiation & Leukoreduction",
    "Rare Blood Group Antigens",
  ],
  "Microbiology": [
    "Gram-Positive Cocci",
    "Gram-Negative Rods (Enterobacteriaceae)",
    "Gram-Negative Non-Fermenters",
    "Anaerobes",
    "Mycobacteria (AFB)",
    "Staining Techniques (Gram, AFB, India Ink)",
    "Culture & Sensitivity (C&S)",
    "Antimicrobial Susceptibility Testing (AST)",
    "Biochemical Identification",
    "Automated Microbiology Systems (MALDI-TOF)",
    "Infection Control & Surveillance",
  ],
  "Urinalysis & Body Fluids": [
    "Physical Examination of Urine",
    "Chemical Examination (Dipstick)",
    "Microscopic Sediment Analysis",
    "Cerebrospinal Fluid (CSF)",
    "Synovial Fluid",
    "Serous Fluids (Pleural, Peritoneal, Pericardial)",
    "Seminal Fluid Analysis",
    "Fecal Occult Blood & Fecal Analysis",
    "Amniotic Fluid",
  ],
  "Immunology / Serology": [
    "Antigen-Antibody Reactions",
    "ELISA & EIA",
    "Immunofluorescence (DFA/IFA)",
    "Western Blot",
    "Flow Cytometry",
    "Complement System",
    "Autoimmune Markers (ANA, RF, Anti-dsDNA)",
    "Hepatitis Serology (HBsAg, Anti-HBc, Anti-HCV)",
    "HIV Testing Algorithms",
    "Syphilis Testing (RPR, FTA-ABS)",
    "Transplant Immunology (HLA Typing)",
  ],
  "Molecular Diagnostics": [
    "PCR (Conventional, Real-Time, RT-PCR)",
    "Nucleic Acid Extraction",
    "Southern / Northern / Western Blots",
    "Sequencing (Sanger, NGS)",
    "FISH (Fluorescence In Situ Hybridization)",
    "Microarray Technology",
    "Molecular Infectious Disease Testing",
    "Pharmacogenomics",
    "Molecular Oncology Markers",
  ],
  "Histotechnology": [
    "Tissue Fixation & Processing",
    "Embedding & Microtomy",
    "H&E Staining",
    "Special Stains (PAS, Masson Trichrome, GMS)",
    "Immunohistochemistry (IHC)",
    "Frozen Sections",
    "Decalcification",
    "Quality Control in Histology",
  ],
  "Cytotechnology": [
    "Pap Smear Evaluation",
    "Fine Needle Aspiration (FNA)",
    "Liquid-Based Cytology",
    "Bethesda System Classification",
    "Non-Gynecological Cytology",
  ],
  "Mycology": [
    "Dermatophytes",
    "Yeasts (Candida, Cryptococcus)",
    "Dimorphic Fungi",
    "Mold Identification",
    "Antifungal Susceptibility",
    "KOH Preparation",
  ],
  "Parasitology": [
    "Intestinal Protozoa",
    "Blood & Tissue Protozoa (Malaria, Toxoplasma)",
    "Intestinal Helminths",
    "Tissue Helminths",
    "Ova & Parasite (O&P) Examination",
    "Concentration Techniques",
    "Arthropod Vectors",
  ],
  "Virology": [
    "Viral Culture & Identification",
    "Rapid Antigen Detection",
    "Molecular Viral Testing",
    "Serological Viral Markers",
    "Emerging Viral Pathogens",
  ],
  "Phlebotomy & Specimen Collection": [
    "Order of Draw",
    "Venipuncture Technique",
    "Capillary Collection",
    "Specimen Handling & Transport",
    "Patient Identification & Safety",
    "Special Collection Procedures (Blood Cultures, Glucose Tolerance)",
  ],
  "Laboratory Operations & Quality Management": [
    "Quality Control (Levey-Jennings, Westgard Rules)",
    "Quality Assurance Programs",
    "Proficiency Testing",
    "Laboratory Safety (Chemical, Biological, Radiation)",
    "CLIA / CAP / Accreditation Canada Standards",
    "Laboratory Information Systems (LIS)",
    "Lean & Six Sigma in the Lab",
    "Regulatory Compliance",
    "Specimen Rejection Criteria",
  ],
  "Point-of-Care Testing": [
    "Glucose Meters",
    "Blood Gas Analyzers",
    "Coagulation Point-of-Care (iSTAT)",
    "Rapid Strep / Flu / COVID Testing",
    "Urine Pregnancy Testing",
    "Quality Management for POCT",
  ],
};

export const MLT_CANADA_BLUEPRINT_CATEGORIES = [
  { name: "Hematology & Coagulation", weight: 25, disciplines: ["Hematology", "Hemostasis / Coagulation"] },
  { name: "Clinical Chemistry", weight: 20, disciplines: ["Clinical Chemistry"] },
  { name: "Microbiology", weight: 20, disciplines: ["Microbiology", "Mycology", "Parasitology", "Virology"] },
  { name: "Transfusion Science", weight: 15, disciplines: ["Immunohematology / Blood Banking"] },
  { name: "Histotechnology", weight: 10, disciplines: ["Histotechnology", "Cytotechnology"] },
  { name: "Quality Management", weight: 10, disciplines: ["Laboratory Operations & Quality Management", "Point-of-Care Testing"] },
] as const;

export const MLT_USA_CONTENT_AREAS = [
  { name: "Hematology", weight: 25, disciplines: ["Hematology", "Hemostasis / Coagulation"] },
  { name: "Clinical Chemistry", weight: 25, disciplines: ["Clinical Chemistry"] },
  { name: "Microbiology", weight: 20, disciplines: ["Microbiology", "Mycology", "Parasitology", "Virology"] },
  { name: "Immunohematology / Blood Banking", weight: 15, disciplines: ["Immunohematology / Blood Banking"] },
  { name: "Urinalysis & Body Fluids", weight: 10, disciplines: ["Urinalysis & Body Fluids"] },
  { name: "Laboratory Operations", weight: 5, disciplines: ["Laboratory Operations & Quality Management", "Point-of-Care Testing"] },
] as const;

export const MLT_DIFFICULTY_LEVELS = [
  { id: "foundational", label: "Foundational", description: "Recall-level knowledge of facts, terminology, and procedures" },
  { id: "intermediate", label: "Intermediate", description: "Application of knowledge to routine laboratory scenarios" },
  { id: "advanced", label: "Advanced", description: "Analysis, evaluation, and troubleshooting of complex cases" },
  { id: "expert", label: "Expert", description: "Synthesis across disciplines, rare findings, and critical decision-making" },
] as const;

export type MltDifficultyLevel = (typeof MLT_DIFFICULTY_LEVELS)[number]["id"];

export const MLT_COGNITIVE_LEVELS = [
  { id: "recall", label: "Recall", bloom: "Remember", description: "Retrieve factual knowledge" },
  { id: "application", label: "Application", bloom: "Apply", description: "Use knowledge in routine situations" },
  { id: "analysis", label: "Analysis", bloom: "Analyze", description: "Break down information and identify patterns" },
  { id: "evaluation", label: "Evaluation", bloom: "Evaluate", description: "Make judgments based on criteria and evidence" },
  { id: "synthesis", label: "Synthesis", bloom: "Create", description: "Combine information to form new conclusions" },
] as const;

export type MltCognitiveLevel = (typeof MLT_COGNITIVE_LEVELS)[number]["id"];

export type MltCountryTrack = "canada" | "usa" | "both";
export type MltExamTrack = "csmls" | "ascp-mlt" | "ascp-mls" | "both";

export const MLT_COUNTRY_TRACKS = [
  { id: "canada" as const, label: "Canada", examBoard: "CSMLS", examName: "CSMLS National Certification Examination" },
  { id: "usa" as const, label: "United States", examBoard: "ASCP", examName: "ASCP Board of Certification MLS/MLT Examination" },
] as const;

export const MLT_EXAM_TRACKS = [
  { id: "csmls" as const, country: "canada", label: "CSMLS MLT", description: "Canadian Society for Medical Laboratory Science" },
  { id: "ascp-mlt" as const, country: "usa", label: "ASCP MLT", description: "American Society for Clinical Pathology — Medical Laboratory Technician" },
  { id: "ascp-mls" as const, country: "usa", label: "ASCP MLS", description: "American Society for Clinical Pathology — Medical Laboratory Scientist" },
] as const;

export const MLT_FLASHCARD_CARD_TYPES = [
  "term-definition",
  "image-identification",
  "clinical-scenario",
  "lab-value",
  "procedure-steps",
  "comparison",
  "mnemonic",
] as const;

export type MltFlashcardCardType = (typeof MLT_FLASHCARD_CARD_TYPES)[number];
