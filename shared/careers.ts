export const CAREER_TYPES = [
  "nursing",
  "rrt",
  "paramedic",
  "pharmacyTech",
  "mlt",
  "imaging",
] as const;

export type CareerType = (typeof CAREER_TYPES)[number];

export interface CareerTier {
  id: string;
  name: string;
  level: number;
}

export interface CareerAITool {
  id: string;
  name: string;
  description: string;
  route: string;
}

export interface CareerConfig {
  id: CareerType;
  name: string;
  shortName: string;
  slug: string;
  description: string;
  icon: string;
  routePrefix: string;
  tiers: CareerTier[];
  examNames: string[];
  color: string;
  colorAccent: string;
  aiTools: CareerAITool[];
  domains: string[];
  enabled: boolean;
}

export const CAREER_CONFIGS: Record<CareerType, CareerConfig> = {
  nursing: {
    id: "nursing",
    name: "Nursing",
    shortName: "Nursing",
    slug: "nursing",
    description: "RPN, RN, and NP exam preparation with 2,400+ clinical lessons",
    icon: "Stethoscope",
    routePrefix: "",
    tiers: [
      { id: "free", name: "Free", level: 0 },
      { id: "rpn", name: "RPN / LPN", level: 1 },
      { id: "rn", name: "RN", level: 2 },
      { id: "np", name: "NP", level: 3 },
    ],
    examNames: ["REx-PN", "NCLEX-RN", "NP Certification"],
    color: "#6C63FF",
    colorAccent: "#E8E6FF",
    aiTools: [],
    domains: [
      "Cardiovascular",
      "Respiratory",
      "Neurological",
      "Gastrointestinal",
      "Renal",
      "Endocrine",
      "Hematology",
      "Musculoskeletal",
      "Maternity",
      "Pediatrics",
      "Mental Health",
      "Pharmacology",
    ],
    enabled: true,
  },
  rrt: {
    id: "rrt",
    name: "Registered Respiratory Therapist",
    shortName: "RRT",
    slug: "rrt",
    description: "Respiratory therapy exam prep covering ventilator management, ABG analysis, and airway management",
    icon: "Wind",
    routePrefix: "/rrt",
    tiers: [
      { id: "free", name: "Free", level: 0 },
      { id: "rrt-basic", name: "RRT Basic", level: 1 },
      { id: "rrt-advanced", name: "RRT Advanced", level: 2 },
    ],
    examNames: ["NBRC TMC", "NBRC CSE", "CBRC"],
    color: "#2196F3",
    colorAccent: "#E3F2FD",
    aiTools: [
      { id: "abg-engine", name: "ABG Interpretation Engine", description: "Practice arterial blood gas analysis with instant AI feedback", route: "/rrt/abg-engine" },
      { id: "ventilator-sim", name: "Ventilator Mode Simulator", description: "Interactive ventilator settings and waveform analysis", route: "/rrt/ventilator-sim" },
    ],
    domains: [
      "Patient Assessment",
      "Airway Management",
      "Ventilator Management",
      "ABG Interpretation",
      "Neonatal/Pediatric Respiratory",
      "Pharmacology",
      "Diagnostics",
      "Disease Management",
      "Emergency Procedures",
      "Equipment",
    ],
    enabled: true,
  },
  paramedic: {
    id: "paramedic",
    name: "Paramedic / Advanced Care Paramedic",
    shortName: "Paramedic",
    slug: "paramedic",
    description: "Paramedic certification exam prep with trauma algorithms, ACLS/PALS, and field pharmacology",
    icon: "Ambulance",
    routePrefix: "/paramedic",
    tiers: [
      { id: "free", name: "Free", level: 0 },
      { id: "pcp", name: "Primary Care Paramedic", level: 1 },
      { id: "acp", name: "Advanced Care Paramedic", level: 2 },
    ],
    examNames: ["NREMT", "COPR", "PCP/ACP Provincial"],
    color: "#F44336",
    colorAccent: "#FFEBEE",
    aiTools: [
      { id: "trauma-algorithm", name: "Trauma Algorithm Simulator", description: "Step-through trauma assessment and management algorithms", route: "/paramedic/trauma-algorithm" },
      { id: "ecg-drill", name: "ECG Recognition Drill", description: "Identify cardiac rhythms with progressive difficulty", route: "/paramedic/ecg-drill" },
    ],
    domains: [
      "Trauma",
      "Medical Emergencies",
      "Cardiac/ACLS",
      "Pediatric/PALS",
      "OB Emergencies",
      "Pharmacology",
      "Airway Management",
      "Assessment",
      "Operations",
      "Legal/Ethics",
    ],
    enabled: true,
  },
  pharmacyTech: {
    id: "pharmacyTech",
    name: "Pharmacy Technician",
    shortName: "Pharm Tech",
    slug: "pharmacy-tech",
    description: "Pharmacy technician certification prep with dosage calculations, compounding, and drug classification",
    icon: "Pill",
    routePrefix: "/pharmacy-tech",
    tiers: [
      { id: "free", name: "Free", level: 0 },
      { id: "ptcb-basic", name: "PTCB Basic", level: 1 },
      { id: "ptcb-advanced", name: "PTCB Advanced", level: 2 },
    ],
    examNames: ["PTCB", "ExCPT", "PEBC Qualifying"],
    color: "#4CAF50",
    colorAccent: "#E8F5E9",
    aiTools: [
      { id: "dosage-calc", name: "Dosage Calculator", description: "Practice pharmaceutical calculations with step-by-step solutions", route: "/pharmacy-tech/dosage-calc" },
      { id: "compounding-sim", name: "Compounding Math Simulator", description: "Master compounding ratios, dilutions, and alligation methods", route: "/pharmacy-tech/compounding-sim" },
    ],
    domains: [
      "Pharmacology",
      "Dosage Calculations",
      "Compounding",
      "Drug Interactions",
      "Regulations/Law",
      "Sterile Products",
      "Inventory Management",
      "Patient Safety",
      "Drug Classifications",
      "Prescription Processing",
    ],
    enabled: true,
  },
  mlt: {
    id: "mlt",
    name: "Medical Laboratory Technologist",
    shortName: "MLT",
    slug: "mlt",
    description: "Medical lab technologist exam prep covering hematology, clinical chemistry, microbiology, and blood banking",
    icon: "Microscope",
    routePrefix: "/mlt",
    tiers: [
      { id: "free", name: "Free", level: 0 },
      { id: "mlt-basic", name: "MLT Basic", level: 1 },
      { id: "mlt-advanced", name: "MLT Advanced", level: 2 },
    ],
    examNames: ["ASCP BOC", "AMT", "CSMLS"],
    color: "#9C27B0",
    colorAccent: "#F3E5F5",
    aiTools: [
      { id: "lab-critical", name: "Lab Critical Value Engine", description: "Recognize and respond to critical laboratory values", route: "/mlt/lab-critical" },
      { id: "morphology-drill", name: "Morphology Drill", description: "Identify cell morphology and abnormalities", route: "/mlt/morphology-drill" },
    ],
    domains: [
      "Hematology",
      "Clinical Chemistry",
      "Microbiology",
      "Blood Banking",
      "Urinalysis",
      "Immunology/Serology",
      "Molecular Diagnostics",
      "Lab Operations",
      "Quality Assurance",
      "Body Fluids",
    ],
    enabled: true,
  },
  imaging: {
    id: "imaging",
    name: "Diagnostic Imaging",
    shortName: "Imaging",
    slug: "imaging",
    description: "Radiologic, MRI, and sonography exam prep with anatomy positioning, radiation safety, and image analysis",
    icon: "ScanLine",
    routePrefix: "/imaging",
    tiers: [
      { id: "free", name: "Free", level: 0 },
      { id: "img-basic", name: "Imaging Basic", level: 1 },
      { id: "img-advanced", name: "Imaging Advanced", level: 2 },
    ],
    examNames: ["ARRT Radiography", "ARRT MRI", "ARDMS Sonography", "CAMRT"],
    color: "#FF9800",
    colorAccent: "#FFF3E0",
    aiTools: [
      { id: "anatomy-labeling", name: "Anatomy Labeling Simulator", description: "Interactive anatomy identification on diagnostic images", route: "/imaging/anatomy-labeling" },
      { id: "image-recognition", name: "Image Recognition Drill", description: "Identify pathology and normal variants on radiographic images", route: "/imaging/image-recognition" },
    ],
    domains: [
      "Radiographic Positioning",
      "Radiation Safety",
      "Anatomy/Physiology",
      "Image Production",
      "Equipment Operation",
      "Patient Care",
      "Pathology Recognition",
      "CT Imaging",
      "MRI Physics",
      "Ultrasound Physics",
    ],
    enabled: true,
  },
};

export function getCareerBySlug(slug: string): CareerConfig | undefined {
  return Object.values(CAREER_CONFIGS).find((c) => c.slug === slug);
}

export function getCareerById(id: CareerType): CareerConfig {
  return CAREER_CONFIGS[id];
}

export function getEnabledCareers(): CareerConfig[] {
  return Object.values(CAREER_CONFIGS).filter((c) => c.enabled);
}

export function getCareerRoutePrefix(careerType: CareerType): string {
  return CAREER_CONFIGS[careerType].routePrefix;
}
