import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Heart, 
  Wind, 
  Brain, 
  Droplets, 
  ChevronRight,
  BookOpen,
  Lock,
  Activity,
  Pill,
  AlertCircle,
  Baby,
  Users,
  Eye,
  Beaker,
  Zap,
  ShieldAlert,
  Scissors,
  Stethoscope,
  Bug,
  Thermometer
} from "lucide-react";

const rpnSystems = [
  {
    id: "cardiovascular-rpn",
    title: "Cardiovascular",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-50",
    diseases: [
      { id: "heart-failure", name: "Heart Failure", status: "Available" },
      { id: "hypertension", name: "Hypertension", status: "Available" },
      { id: "peds-cardiac-basics", name: "Pediatric Cardiac Principles", status: "Available" },
      { id: "cardiac-assessment-ecg", name: "Cardiac Assessment and ECG", status: "Available" },
      { id: "cardiac-cycle-hemodynamics", name: "Cardiac Cycle and Hemodynamics", status: "Available" },
      { id: "conduction-system", name: "Conduction System and Dysrhythmias", status: "Available" },
      { id: "cardiac-monitoring", name: "Continuous Cardiac Monitoring", status: "Available" },
      { id: "pad-claudication", name: "Peripheral Artery Disease and Claudication", status: "Available" },
      { id: "cardioversion-defib", name: "Cardioversion and Defibrillation", status: "Available" },
      { id: "pacemaker-care", name: "Pacemaker Basics and Care", status: "Available" }
    ]
  },
  {
    id: "respiratory-rpn",
    title: "Respiratory",
    icon: Wind,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    diseases: [
      { id: "respiratory-assessment", name: "Respiratory Assessment", status: "Available" },
      { id: "lung-auscultation", name: "Lung Sounds and Auscultation", status: "Available" },
      { id: "oxygen-therapy-basics", name: "Oxygen Therapy and Delivery", status: "Available" },
      { id: "inhaled-spacers", name: "Inhaled Spacers", status: "Available" },
      { id: "abg-basics", name: "ABG Interpretation Basics", status: "Available" }
    ]
  },
  {
    id: "neurological-rpn",
    title: "Neurological",
    icon: Brain,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    diseases: [
      { id: "neuro-basics", name: "Early vs Late Deterioration", status: "Available" },
      { id: "stroke", name: "Stroke FAST and Time", status: "Available" },
      { id: "delirium-dementia", name: "Delirium vs Dementia", status: "Available" },
      { id: "parkinsons", name: "Parkinson's and Mobility", status: "Available" },
      { id: "peds-neuro", name: "Pediatric Neuro and Seizures", status: "Available" },
      { id: "concussion-assessment", name: "Concussion Assessment (SCAT5)", status: "Available" },
      { id: "cranial-nerve-assessment", name: "Cranial Nerve Assessment", status: "Available" },
      { id: "icp-basics", name: "Intracranial Pressure Basics", status: "Available" },
      { id: "cerebral-edema-basics", name: "Cerebral Edema", status: "Available" },
      { id: "brain-abscess", name: "Brain Abscess", status: "Available" }
    ]
  },
  {
    id: "gastrointestinal-rpn",
    title: "Gastrointestinal",
    icon: Droplets,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    diseases: [
      { id: "abdominal-assessment", name: "Abdominal Assessment", status: "Available" },
      { id: "ibs-basics", name: "Irritable Bowel Syndrome", status: "Available" },
      { id: "ngtube-care", name: "NG Tube Insertion and Care", status: "Available" },
      { id: "enteral-feeding", name: "Enteral Feeding and Tube Care", status: "Available" },
      { id: "feeding-tube-verification", name: "Feeding Tube Placement Verification", status: "Available" },
      { id: "tube-feeding-admin", name: "Administering Tube Feedings", status: "Available" },
      { id: "feeding-tube-irrigation", name: "Feeding Tube Irrigation", status: "Available" }
    ]
  },
  {
    id: "renal-rpn",
    title: "Renal & Urinary",
    icon: Droplets,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
    diseases: [
      { id: "catheterization", name: "Urinary Catheterization", status: "Available" },
      { id: "cauti-prevention", name: "CAUTI Prevention", status: "Available" },
      { id: "urine-output-monitoring", name: "Urine Output Monitoring", status: "Available" }
    ]
  },
  {
    id: "endocrine-rpn",
    title: "Endocrine",
    icon: Thermometer,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    diseases: [
      { id: "hormonal-regulation", name: "Mechanisms of Hormonal Regulation", status: "Available" },
      { id: "hypothyroidism-basics", name: "Hypothyroidism", status: "Available" },
      { id: "hyperthyroidism-basics", name: "Hyperthyroidism", status: "Available" },
      { id: "thyroid-function", name: "Thyroid Function and Disorders", status: "Available" },
      { id: "diabetes-lifespan", name: "Diabetes Across Ages", status: "Available" },
      { id: "pancreatic-function", name: "Pancreatic Function and Insulin", status: "Available" },
      { id: "adrenal-function", name: "Adrenal Gland Function", status: "Available" },
      { id: "pituitary-function", name: "Pituitary Gland and Hormones", status: "Available" },
      { id: "negative-feedback", name: "Negative Feedback Loops", status: "Available" }
    ]
  },
  {
    id: "immune-system-rpn",
    title: "Immune System",
    icon: ShieldAlert,
    color: "text-green-500",
    bgColor: "bg-green-50",
    diseases: [
      { id: "innate-immunity", name: "Innate Immunity and Barriers", status: "Available" },
      { id: "adaptive-immunity", name: "Adaptive Immunity (B and T Cells)", status: "Available" },
      { id: "antibody-types", name: "Immunoglobulins and Antibody Types", status: "Available" },
      { id: "vaccination-immunity", name: "Vaccination and Herd Immunity", status: "Available" },
      { id: "autoimmune-basics", name: "Autoimmune Disorders Overview", status: "Available" },
      { id: "inflammation-response", name: "Inflammatory Response", status: "Available" },
      { id: "complement-system", name: "Complement System", status: "Available" }
    ]
  },
  {
    id: "hematology-rpn",
    title: "Hematology",
    icon: Activity,
    color: "text-red-500",
    bgColor: "bg-red-50",
    diseases: [
      { id: "iron-deficiency-anemia", name: "Iron Deficiency Anemia", status: "Available" },
      { id: "dic-basics", name: "Disseminated Intravascular Coagulation", status: "Available" },
      { id: "coagulation-cascade", name: "Coagulation Cascade", status: "Available" },
      { id: "blood-products", name: "Blood Products and Transfusion Basics", status: "Available" }
    ]
  },
  {
    id: "heent-skin-rpn",
    title: "HEENT & Skin",
    icon: Eye,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
    diseases: [
      { id: "heent-emergencies", name: "HEENT Emergencies", status: "Available" },
      { id: "vision-hearing", name: "Vision and Hearing Safety", status: "Available" },
      { id: "skin-integrity", name: "Pressure Injuries and Cellulitis", status: "Available" },
      { id: "epistaxis", name: "Epistaxis Nosebleeds", status: "Available" },
      { id: "peds-heent", name: "Otitis Media and Conjunctivitis", status: "Available" },
      { id: "atopic-dermatitis", name: "Atopic Dermatitis (Eczema)", status: "Available" }
    ]
  },
  {
    id: "musculoskeletal-rpn",
    title: "Musculoskeletal",
    icon: Activity,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
    diseases: [
      { id: "osteoporosis-basics", name: "Osteoporosis", status: "Available" },
      { id: "scoliosis-basics", name: "Scoliosis", status: "Available" },
      { id: "hip-dysplasia", name: "Developmental Hip Dysplasia", status: "Available" },
      { id: "fracture-sprain-care", name: "Fractures, Sprains, and Strains", status: "Available" },
      { id: "fracture-types", name: "Fracture Types and Healing", status: "Available" },
      { id: "cast-care", name: "Cast Care and Traction", status: "Available" },
      { id: "rom-exercises", name: "Range of Motion Exercises", status: "Available" },
      { id: "mobility-aids", name: "Mobility Aids and Ambulation", status: "Available" },
      { id: "joint-replacement-basics", name: "Joint Replacement Basics", status: "Available" },
      { id: "body-mechanics", name: "Body Mechanics and Ergonomics", status: "Available" },
      { id: "fall-prevention", name: "Fall Prevention Strategies", status: "Available" }
    ]
  },
  {
    id: "pediatrics-rpn",
    title: "Pediatrics",
    icon: Baby,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    diseases: [
      { id: "epiglottitis", name: "Epiglottitis Emergency", status: "Available" },
      { id: "dehydration-peds", name: "Pediatric Dehydration", status: "Available" },
      { id: "foreign-body-aspiration", name: "Foreign Body Aspiration", status: "Available" },
      { id: "varicella", name: "Varicella (Chickenpox)", status: "Available" },
      { id: "impetigo", name: "Impetigo", status: "Available" },
      { id: "head-lice", name: "Head Lice (Pediculosis)", status: "Available" },
      { id: "pinworms", name: "Pinworms (Enterobiasis)", status: "Available" },
      { id: "diaper-candidiasis", name: "Diaper Candidiasis", status: "Available" },
      { id: "lead-poisoning", name: "Lead Poisoning", status: "Available" },
      { id: "adhd-basics", name: "ADHD", status: "Available" },
      { id: "separation-anxiety", name: "Separation Anxiety", status: "Available" }
    ]
  },
  {
    id: "maternity-rpn",
    title: "Maternity",
    icon: Baby,
    color: "text-rose-500",
    bgColor: "bg-rose-50",
    diseases: [
      { id: "prenatal-basics", name: "Prenatal Care Essentials", status: "Available" },
      { id: "labor-stages", name: "Stages of Labor and Delivery", status: "Available" },
      { id: "postpartum-basics", name: "Postpartum Assessment and Care", status: "Available" },
      { id: "breastfeeding-basics", name: "Breastfeeding and Lactation", status: "Available" }
    ]
  },
  {
    id: "neonatal-rpn",
    title: "Neonatal",
    icon: Baby,
    color: "text-sky-500",
    bgColor: "bg-sky-50",
    diseases: [
      { id: "newborn-assessment", name: "Newborn Assessment and APGAR", status: "Available" },
      { id: "neonatal-thermoreg", name: "Thermoregulation in Neonates", status: "Available" },
      { id: "neonatal-feeding", name: "Neonatal Feeding and Weight", status: "Available" },
      { id: "neonatal-jaundice-basics", name: "Neonatal Jaundice Basics", status: "Available" }
    ]
  },
  {
    id: "mental-health-rpn",
    title: "Mental Health",
    icon: Brain,
    color: "text-violet-500",
    bgColor: "bg-violet-50",
    diseases: [
      { id: "depression-basics", name: "Depression Overview", status: "Available" },
      { id: "anxiety-disorders", name: "Anxiety Disorders", status: "Available" },
      { id: "stress-response", name: "Stress Response and Coping", status: "Available" },
      { id: "general-adaptation", name: "General Adaptation Syndrome", status: "Available" },
      { id: "therapeutic-communication", name: "Therapeutic Communication", status: "Available" },
      { id: "crisis-intervention", name: "Crisis Intervention Basics", status: "Available" },
      { id: "substance-abuse-basics", name: "Substance Abuse Overview", status: "Available" }
    ]
  },
  {
    id: "infections-rpn",
    title: "Infections",
    icon: Bug,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    diseases: [
      { id: "tinea-corporis", name: "Tinea Corporis (Ringworm)", status: "Available" },
      { id: "oral-candidiasis", name: "Oral Candidiasis (Thrush)", status: "Available" },
      { id: "cdiff-basics", name: "C. Difficile Infection", status: "Available" },
      { id: "pertussis-basics", name: "Pertussis (Whooping Cough)", status: "Available" }
    ]
  },
  {
    id: "procedures-rpn",
    title: "Procedures",
    icon: Scissors,
    color: "text-teal-500",
    bgColor: "bg-teal-50",
    diseases: [
      { id: "vitals-assessment", name: "Vital Signs and Physical Assessment", status: "Available" },
      { id: "wound-care-basics", name: "Wound Care and Dressing Changes", status: "Available" },
      { id: "vac-dressing", name: "VAC Dressing (Wound Vacuum)", status: "Available" },
      { id: "wound-irrigation", name: "Wound Irrigation", status: "Available" },
      { id: "cleansing-enemas", name: "Cleansing Enemas", status: "Available" },
      { id: "meds-to-infants", name: "Administering Meds to Infants", status: "Available" }
    ]
  },
  {
    id: "pharmacology-rpn",
    title: "Pharmacology",
    icon: Pill,
    color: "text-cyan-500",
    bgColor: "bg-cyan-50",
    diseases: [
      { id: "med-rights", name: "Rights of Medication Administration", status: "Available" },
      { id: "drug-calculations", name: "Drug Dosage Calculations", status: "Available" },
      { id: "injection-techniques", name: "Injection Techniques (IM, SC, ID)", status: "Available" },
      { id: "med-interactions", name: "Common Drug Interactions", status: "Available" },
      { id: "adverse-drug-reactions", name: "Adverse Drug Reactions", status: "Available" },
      { id: "analgesic-basics", name: "Pain Management and Analgesics", status: "Available" },
      { id: "antibiotic-basics", name: "Antibiotic Classes Overview", status: "Available" }
    ]
  },
  {
    id: "womens-health-rpn",
    title: "Women's Health",
    icon: Users,
    color: "text-rose-500",
    bgColor: "bg-rose-50",
    diseases: [
      { id: "menstrual-cycle", name: "Menstrual Cycle and Hormones", status: "Available" },
      { id: "contraception-basics", name: "Contraception Methods", status: "Available" },
      { id: "menopause-basics", name: "Menopause", status: "Available" },
      { id: "breast-self-exam", name: "Breast Self-Examination", status: "Available" },
      { id: "pap-smear-basics", name: "Pap Smear and Cervical Screening", status: "Available" },
      { id: "uti-basics", name: "Urinary Tract Infections", status: "Available" }
    ]
  },
  {
    id: "nutrition-rpn",
    title: "Nutrition",
    icon: Stethoscope,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    diseases: [
      { id: "iron-deficiency-nutrition", name: "Iron Deficiency Anemia", status: "Available" },
      { id: "nutrition-screening", name: "Nutrition Screening and Assessment", status: "Available" },
      { id: "therapeutic-diets", name: "Therapeutic Diets", status: "Available" },
      { id: "fluid-electrolyte-basics", name: "Fluid and Electrolyte Basics", status: "Available" },
      { id: "dehydration-basics", name: "Dehydration Recognition", status: "Available" }
    ]
  },
  {
    id: "infection-control-rpn",
    title: "Infection Control",
    icon: ShieldAlert,
    color: "text-green-600",
    bgColor: "bg-green-50",
    diseases: [
      { id: "hand-hygiene", name: "Hand Hygiene and Handwashing", status: "Available" },
      { id: "ppe-basics", name: "PPE: Donning and Doffing", status: "Available" },
      { id: "isolation-precautions-rpn", name: "Isolation Precautions Overview", status: "Available" },
      { id: "sterile-technique", name: "Sterile Technique and Asepsis", status: "Available" }
    ]
  },
  {
    id: "assessment-rpn",
    title: "Assessment Skills",
    icon: Stethoscope,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
    diseases: [
      { id: "head-to-toe-rpn", name: "Head-to-Toe Assessment", status: "Available" },
      { id: "vital-signs-assessment", name: "Vital Signs: Complete Guide", status: "Available" },
      { id: "blood-pressure-technique", name: "Blood Pressure Measurement", status: "Available" },
      { id: "pulse-oximetry-rpn", name: "Pulse Oximetry and SpO2", status: "Available" },
      { id: "temperature-assessment", name: "Temperature Assessment Methods", status: "Available" },
      { id: "pain-assessment-rpn", name: "Pain Assessment Scales (NRS, FACES, Wong-Baker)", status: "Available" },
      { id: "head-neck-assessment", name: "Head and Neck Assessment", status: "Available" },
      { id: "thyroid-palpation", name: "Thyroid Gland Palpation", status: "Available" },
      { id: "lymphatic-assessment", name: "Lymph Node Assessment", status: "Available" },
      { id: "focused-cardiac-assessment", name: "Focused Cardiac Assessment", status: "Available" },
      { id: "heart-sounds-rpn", name: "Heart Sounds: S1, S2, S3, S4", status: "Available" },
      { id: "peripheral-pulse-assessment", name: "Peripheral Pulse Assessment", status: "Available" },
      { id: "capillary-refill-assessment", name: "Capillary Refill and Perfusion", status: "Available" },
      { id: "lung-sounds-assessment-rpn", name: "Lung Sound Auscultation", status: "Available" },
      { id: "respiratory-pattern-rpn", name: "Respiratory Patterns and Rate", status: "Available" },
      { id: "abdominal-assessment-rpn", name: "Abdominal Assessment (4 Quadrants)", status: "Available" },
      { id: "bowel-sound-assessment", name: "Bowel Sound Auscultation", status: "Available" },
      { id: "neuro-level-consciousness", name: "Level of Consciousness (LOC)", status: "Available" },
      { id: "pupil-assessment-rpn", name: "Pupil Assessment (PERRLA)", status: "Available" },
      { id: "gcs-assessment-rpn", name: "Glasgow Coma Scale (GCS)", status: "Available" },
      { id: "skin-assessment-rpn", name: "Skin Assessment and Turgor", status: "Available" },
      { id: "wound-assessment-rpn", name: "Wound Assessment and Staging", status: "Available" },
      { id: "braden-scale-rpn", name: "Braden Scale for Pressure Injury", status: "Available" },
      { id: "edema-assessment-rpn", name: "Edema Assessment and Grading", status: "Available" },
      { id: "intake-output-rpn", name: "Intake and Output (I&O) Monitoring", status: "Available" },
      { id: "fall-risk-assessment-rpn", name: "Fall Risk Assessment (Morse Scale)", status: "Available" },
      { id: "nutritional-screening-rpn", name: "Nutritional Screening (MNA, MUST)", status: "Available" },
      { id: "mental-status-rpn", name: "Mental Status Assessment", status: "Available" },
      { id: "apgar-assessment-rpn", name: "APGAR Scoring for Newborns", status: "Available" },
      { id: "growth-chart-assessment", name: "Pediatric Growth Chart Assessment", status: "Available" },
      { id: "fundal-height-rpn", name: "Fundal Height and Uterine Assessment", status: "Available" },
      { id: "lochia-assessment-rpn", name: "Lochia Assessment Postpartum", status: "Available" },
      { id: "rom-assessment-rpn", name: "Range of Motion Assessment", status: "Available" },
      { id: "muscle-strength-grading", name: "Muscle Strength Grading (0-5)", status: "Available" },
      { id: "visual-acuity-rpn", name: "Visual Acuity Screening", status: "Available" },
      { id: "hearing-screening-rpn", name: "Hearing Assessment (Whisper, Weber, Rinne)", status: "Available" },
      { id: "documentation-assessment", name: "Assessment Documentation (SBAR, DAR)", status: "Available" }
    ]
  }
];

const rnSystems = [
  {
    id: "cardiovascular-rn",
    title: "Cardiovascular",
    icon: Heart,
    color: "text-red-600",
    bgColor: "bg-red-50",
    diseases: [
      { id: "aaa-rupture", name: "Abdominal Aortic Aneurysm", status: "Available" },
      { id: "mi-management", name: "Myocardial Infarction Mastery", status: "Available" },
      { id: "hf-advanced", name: "Advanced Heart Failure", status: "Available" },
      { id: "shock-syndromes", name: "Shock States (Septic/Cardio)", status: "Available" },
      { id: "dysrhythmias", name: "Lethal Dysrhythmias", status: "Available" },
      { id: "infective-endocarditis", name: "Infective Endocarditis", status: "Available" },
      { id: "peripheral-artery-disease", name: "Peripheral Artery Disease", status: "Available" },
      { id: "aortic-dissection", name: "Aortic Dissection", status: "Available" },
      { id: "polycythemia", name: "Polycythemia Vera", status: "Available" },
      { id: "carotid-endarterectomy", name: "Carotid Endarterectomy", status: "Available" },
      { id: "dvt-management", name: "Deep Vein Thrombosis", status: "Available" },
      { id: "cardiogenic-shock", name: "Cardiogenic Shock", status: "Available" },
      { id: "pacemaker-care", name: "Pacemakers: Types and Nursing Care", status: "Available" }
    ]
  },
  {
    id: "respiratory-rn",
    title: "Respiratory",
    icon: Wind,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    diseases: [
      { id: "copd-exacerbation", name: "COPD and Airway", status: "Available" },
      { id: "asthma-emergency", name: "Asthma & Status Asthmaticus", status: "Available" },
      { id: "pe-recognition", name: "Pulmonary Embolism", status: "Available" },
      { id: "ards-management", name: "ARDS", status: "Available" },
      { id: "active-tb", name: "Active Tuberculosis", status: "Available" },
      { id: "osa-management", name: "Obstructive Sleep Apnea", status: "Available" }
    ]
  },
  {
    id: "neurological-rn",
    title: "Neurological",
    icon: Brain,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    diseases: [
      { id: "increased-icp", name: "Increased ICP and TBI", status: "Available" },
      { id: "stroke-advanced", name: "Stroke & TIA Management", status: "Available" },
      { id: "seizure-safety", name: "Seizure Precautions", status: "Available" },
      { id: "subdural-hematoma", name: "Subdural Hematoma", status: "Available" },
      { id: "meniere-disease", name: "Meniere Disease", status: "Available" },
      { id: "duchenne-md", name: "Duchenne Muscular Dystrophy", status: "Available" },
      { id: "spina-bifida", name: "Spina Bifida (Myelomeningocele)", status: "Available" },
      { id: "myasthenia-gravis", name: "Myasthenia Gravis", status: "Available" },
      { id: "guillain-barre", name: "Guillain-Barre Syndrome", status: "Available" },
      { id: "neuritis-neuropathy", name: "Neuritis & Peripheral Neuropathy", status: "Available" }
    ]
  },
  {
    id: "gastrointestinal-rn",
    title: "Gastrointestinal",
    icon: Droplets,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    diseases: [
      { id: "gi-bleed", name: "GI Bleeding & Obstruction", status: "Available" },
      { id: "acute-abdomen", name: "Appendicitis & Cholecystitis", status: "Available" },
      { id: "pyloric-intussusception", name: "Pyloric Stenosis & Intussusception", status: "Available" },
      { id: "liver-cirrhosis", name: "Cirrhosis & Esophageal Varices", status: "Available" },
      { id: "peptic-ulcer", name: "Peptic Ulcer Disease", status: "Available" },
      { id: "ulcerative-colitis", name: "Ulcerative Colitis", status: "Available" },
      { id: "cholecystectomy", name: "Cholecystectomy", status: "Available" },
      { id: "ercp-egd", name: "ERCP & EGD Procedures", status: "Available" },
      { id: "dumping-syndrome", name: "Dumping Syndrome", status: "Available" },
      { id: "celiac-disease", name: "Celiac Disease", status: "Available" }
    ]
  },
  {
    id: "renal-metabolic-rn",
    title: "Renal & Metabolic",
    icon: Droplets,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    diseases: [
      { id: "aki-management", name: "Acute Kidney Injury", status: "Available" },
      { id: "electrolyte-safety", name: "Electrolyte Imbalances", status: "Available" },
      { id: "ckd-management", name: "Chronic Kidney Disease", status: "Available" },
      { id: "rhabdomyolysis", name: "Rhabdomyolysis", status: "Available" },
      { id: "av-fistula", name: "Arteriovenous Fistula & Dialysis", status: "Available" },
      { id: "dialysis-steal", name: "Dialysis Access Steal Syndrome", status: "Available" },
      { id: "hemodialysis-care", name: "Hemodialysis: Principles and Nursing Care", status: "Available" },
      { id: "bph-management", name: "Benign Prostatic Hyperplasia", status: "Available" }
    ]
  },
  {
    id: "endocrine-rn",
    title: "Endocrine",
    icon: Thermometer,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    diseases: [
      { id: "siadh-di", name: "SIADH vs Diabetes Insipidus", status: "Available" },
      { id: "dka-hhns", name: "DKA & Hyperglycemic States", status: "Available" },
      { id: "adrenal-insufficiency", name: "Primary Adrenal Insufficiency", status: "Available" },
      { id: "thyroidectomy", name: "Thyroidectomy", status: "Available" },
      { id: "cushing-syndrome", name: "Cushing Syndrome", status: "Available" },
      { id: "dm-type1", name: "Diabetes Mellitus Type 1", status: "Available" },
      { id: "dm-type2", name: "Diabetes Mellitus Type 2", status: "Available" }
    ]
  },
  {
    id: "hematology-rn",
    title: "Hematology & Oncology",
    icon: ShieldAlert,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    diseases: [
      { id: "all-leukemia", name: "Acute Lymphoblastic Leukemia", status: "Available" },
      { id: "aml-leukemia", name: "Acute Myelogenous Leukemia", status: "Available" },
      { id: "sepsis-mastery", name: "Sepsis & SIRS Recognition", status: "Available" },
      { id: "sickle-cell", name: "Sickle Cell Crisis", status: "Available" },
      { id: "anemia-types", name: "Iron, Aplastic & Pernicious Anemia", status: "Available" },
      { id: "sle-autoimmune", name: "SLE (Lupus) & Autoimmune", status: "Available" },
      { id: "breast-cancer", name: "Breast Cancer & Mastectomy", status: "Available" },
      { id: "basal-cell-carcinoma", name: "Basal Cell Carcinoma", status: "Available" },
      { id: "prostate-cancer", name: "Prostate Cancer", status: "Available" },
      { id: "cervical-cancer", name: "Cervical Cancer", status: "Available" }
    ]
  },
  {
    id: "msk-rn",
    title: "Musculoskeletal & Skin",
    icon: Activity,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    diseases: [
      { id: "compartment-syndrome", name: "Compartment Syndrome", status: "Available" },
      { id: "burn-management", name: "Burn Injury & Resuscitation", status: "Available" },
      { id: "pressure-injury", name: "Advanced Wound Care", status: "Available" },
      { id: "vac-dressing", name: "VAC Dressing (Negative Pressure Wound Therapy)", status: "Available" },
      { id: "fracture-sprain-care", name: "Fractures, Sprains, and Strains", status: "Available" },
      { id: "knee-arthroplasty", name: "Knee Arthroplasty", status: "Available" },
      { id: "osteomyelitis", name: "Osteomyelitis", status: "Available" },
      { id: "rheumatoid-arthritis", name: "Rheumatoid Arthritis", status: "Available" },
      { id: "osteoporosis-rn", name: "Osteoporosis (Advanced)", status: "Available" },
      { id: "gout-management", name: "Gout", status: "Available" },
      { id: "toxic-epidermal", name: "Toxic Epidermal Necrolysis", status: "Available" },
      { id: "cataracts", name: "Cataracts", status: "Available" },
      { id: "sjogren-syndrome", name: "Sjogren Syndrome", status: "Available" }
    ]
  },
  {
    id: "maternity-rn",
    title: "Maternity & Obstetrics",
    icon: Baby,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    diseases: [
      { id: "preeclampsia", name: "Preeclampsia & Mag Safety", status: "Available" },
      { id: "placenta-previa-abruption", name: "Placenta Previa vs Abruption", status: "Available" },
      { id: "postpartum-hemorrhage", name: "Postpartum Hemorrhage", status: "Available" },
      { id: "gestational-diabetes", name: "Gestational Diabetes Management", status: "Available" },
      { id: "fetal-monitoring-rn", name: "Fetal Heart Rate Monitoring", status: "Available" },
      { id: "hyperemesis-gravidarum", name: "Hyperemesis Gravidarum", status: "Available" },
      { id: "cervical-cerclage", name: "Cervical Cerclage", status: "Available" },
      { id: "preterm-labor", name: "Preterm Labor", status: "Available" },
      { id: "shoulder-dystocia", name: "Shoulder Dystocia", status: "Available" },
      { id: "vacuum-assisted-birth", name: "Vacuum Assisted Vaginal Birth", status: "Available" },
      { id: "ruptured-ectopic", name: "Ruptured Ectopic Pregnancy", status: "Available" },
      { id: "postpartum-endometritis", name: "Postpartum Endometritis", status: "Available" },
      { id: "uterine-inversion", name: "Uterine Inversion", status: "Available" },
      { id: "mastitis", name: "Mastitis", status: "Available" },
      { id: "postpartum-depression-care", name: "Postpartum Depression", status: "Available" },
      { id: "postpartum-psychosis", name: "Postpartum Psychosis", status: "Available" }
    ]
  },
  {
    id: "neonatal-rn",
    title: "Neonatal",
    icon: Baby,
    color: "text-sky-600",
    bgColor: "bg-sky-50",
    diseases: [
      { id: "neonatal-respiratory-distress", name: "Neonatal Respiratory Distress", status: "Available" },
      { id: "neonatal-sepsis", name: "Neonatal Sepsis Recognition", status: "Available" },
      { id: "hyperbilirubinemia", name: "Hyperbilirubinemia & Phototherapy", status: "Available" },
      { id: "nec-necrotizing", name: "Necrotizing Enterocolitis (NEC)", status: "Available" },
      { id: "newborn-circumcision", name: "Newborn Circumcision", status: "Available" }
    ]
  },
  {
    id: "pediatrics-rn",
    title: "Pediatrics",
    icon: Baby,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    diseases: [
      { id: "peds-respiratory", name: "Bronchiolitis & Croup", status: "Available" },
      { id: "epiglottitis-peds", name: "Epiglottitis Emergency", status: "Available" },
      { id: "congenital-heart", name: "Congenital Heart Defects", status: "Available" },
      { id: "cp-management", name: "Cerebral Palsy and Spasticity", status: "Available" },
      { id: "retinoblastoma", name: "Retinoblastoma", status: "Available" },
      { id: "dmd-peds", name: "Duchenne Muscular Dystrophy", status: "Available" },
      { id: "cleft-lip-palate", name: "Cleft Lip and Palate", status: "Available" },
      { id: "hirschsprung-disease", name: "Hirschsprung Disease", status: "Available" },
      { id: "infant-botulism", name: "Infant Botulism", status: "Available" },
      { id: "hydrocephalus", name: "Hydrocephalus", status: "Available" },
      { id: "trisomy-21", name: "Down Syndrome (Trisomy 21)", status: "Available" },
      { id: "fetal-alcohol-syndrome", name: "Fetal Alcohol Spectrum Disorder", status: "Available" },
      { id: "tonsillectomy", name: "Tonsillectomy", status: "Available" }
    ]
  },
  {
    id: "psychiatry-rn",
    title: "Psychiatry & Mental Health",
    icon: Brain,
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    diseases: [
      { id: "lithium-toxicity", name: "Lithium & Mood Stabilizers", status: "Available" },
      { id: "nms-serotonin", name: "NMS & Serotonin Syndrome", status: "Available" },
      { id: "major-depression", name: "Major Depressive Disorder", status: "Available" },
      { id: "alcohol-withdrawal", name: "Alcohol Withdrawal", status: "Available" },
      { id: "borderline-pd", name: "Borderline Personality Disorder", status: "Available" },
      { id: "tardive-dyskinesia", name: "Tardive Dyskinesia", status: "Available" },
      { id: "bulimia-nervosa", name: "Bulimia Nervosa", status: "Available" },
      { id: "schizophrenia", name: "Schizophrenia", status: "Available" },
      { id: "bipolar-disorder", name: "Bipolar Disorder", status: "Available" },
      { id: "ocd", name: "Obsessive Compulsive Disorder", status: "Available" },
      { id: "ptsd", name: "PTSD", status: "Available" },
      { id: "panic-disorder", name: "Panic Disorder", status: "Available" },
      { id: "anorexia-nervosa", name: "Anorexia Nervosa", status: "Available" },
      { id: "social-anxiety", name: "Social Anxiety Disorder", status: "Available" },
      { id: "agoraphobia", name: "Agoraphobia", status: "Available" },
      { id: "opioid-withdrawal", name: "Opioid Withdrawal", status: "Available" },
      { id: "serotonin-syndrome", name: "Serotonin Syndrome", status: "Available" },
      { id: "antisocial-pd", name: "Antisocial Personality Disorder", status: "Available" },
      { id: "conduct-disorder", name: "Conduct Disorder", status: "Available" }
    ]
  },
  {
    id: "pharmacology-rn",
    title: "Pharmacology",
    icon: Pill,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    diseases: [
      { id: "cardiac-meds", name: "Vasoactive & Cardiac Meds", status: "Available" },
      { id: "insulin-safety", name: "Insulin & Diabetic Safety", status: "Available" },
      { id: "anticoagulant-safety", name: "Anticoagulation Mastery", status: "Available" },
      { id: "herbals-safety", name: "Herbal & Supplement Safety", status: "Available" },
      { id: "factor-xa-inhibitors", name: "Factor Xa Inhibitors", status: "Available" },
      { id: "thiazide-diuretics", name: "Thiazide Diuretics", status: "Available" },
      { id: "statins-safety", name: "Statins", status: "Available" },
      { id: "allopurinol-safety", name: "Allopurinol", status: "Available" },
      { id: "methotrexate-safety", name: "Methotrexate", status: "Available" },
      { id: "methadone-safety", name: "Methadone", status: "Available" },
      { id: "ccb-safety", name: "Calcium Channel Blockers", status: "Available" }
    ]
  },
  {
    id: "procedures-rn",
    title: "Clinical Procedures",
    icon: Scissors,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    diseases: [
      { id: "iv-therapy", name: "IV Therapy and Venipuncture", status: "Available" },
      { id: "blood-transfusion", name: "Blood Transfusion Administration", status: "Available" },
      { id: "chest-tube-mgmt", name: "Chest Tube Management", status: "Available" },
      { id: "trach-care", name: "Tracheostomy Care and Suctioning", status: "Available" },
      { id: "thoracentesis", name: "Thoracentesis", status: "Available" },
      { id: "hemodialysis-care", name: "Hemodialysis: Procedure and Complications", status: "Available" },
      { id: "postmortem-care", name: "Postmortem Care", status: "Available" },
      { id: "burn-care-advanced", name: "Burn Injury Care", status: "Available" }
    ]
  },
  {
    id: "infectious-disease-rn",
    title: "Infectious Disease",
    icon: Bug,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    diseases: [
      { id: "hiv-management", name: "HIV", status: "Available" },
      { id: "mrsa-management", name: "MRSA", status: "Available" },
      { id: "hepatitis-management", name: "Hepatitis", status: "Available" },
      { id: "trichomoniasis", name: "Trichomoniasis", status: "Available" },
      { id: "zika-virus", name: "Zika Virus", status: "Available" },
      { id: "chlamydia", name: "Chlamydia", status: "Available" }
    ]
  },
  {
    id: "shock-emergency-rn",
    title: "Shock & Emergency",
    icon: Zap,
    color: "text-red-700",
    bgColor: "bg-red-50",
    diseases: [
      { id: "neurogenic-shock", name: "Neurogenic Shock", status: "Available" },
      { id: "obstructive-shock", name: "Obstructive Shock", status: "Available" },
      { id: "malignant-hyperthermia", name: "Malignant Hyperthermia", status: "Available" },
      { id: "anaphylaxis", name: "Anaphylaxis", status: "Available" }
    ]
  },
  {
    id: "safety-forensic-rn",
    title: "Safety & Forensic Nursing",
    icon: ShieldAlert,
    color: "text-red-600",
    bgColor: "bg-red-50",
    diseases: [
      { id: "child-abuse", name: "Child Abuse & Neglect", status: "Available" },
      { id: "elder-mistreatment", name: "Elder Mistreatment", status: "Available" },
      { id: "intimate-partner-violence", name: "Intimate Partner Violence", status: "Available" },
      { id: "disaster-triage", name: "Disaster Triage", status: "Available" }
    ]
  },
  {
    id: "foundations-rn",
    title: "Infection Control & Safety",
    icon: ShieldAlert,
    color: "text-green-600",
    bgColor: "bg-green-50",
    diseases: [
      { id: "airborne-precautions", name: "Airborne Precautions", status: "Available" },
      { id: "droplet-precautions", name: "Droplet Precautions", status: "Available" },
      { id: "contact-precautions", name: "Contact Precautions", status: "Available" },
      { id: "transmission-based-precautions", name: "Transmission-Based Precautions", status: "Available" }
    ]
  },
  {
    id: "assessment-rn",
    title: "Assessment Skills",
    icon: Stethoscope,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    diseases: [
      { id: "comprehensive-health-assessment", name: "Comprehensive Health Assessment", status: "Available" },
      { id: "primary-survey-rn", name: "Primary Survey (ABCDE)", status: "Available" },
      { id: "secondary-survey-rn", name: "Secondary Survey: Head-to-Toe Trauma", status: "Available" },
      { id: "rapid-assessment-rn", name: "Rapid Patient Assessment", status: "Available" },
      { id: "focused-assessment-rn", name: "Focused Assessment by System", status: "Available" },
      { id: "ecg-interpretation-rn", name: "ECG / EKG Interpretation", status: "Available" },
      { id: "cardiac-rhythm-rn", name: "Cardiac Rhythm Strip Analysis", status: "Available" },
      { id: "hemodynamic-assessment-rn", name: "Hemodynamic Monitoring (CVP, MAP, CO)", status: "Available" },
      { id: "nih-stroke-scale", name: "NIH Stroke Scale (NIHSS)", status: "Available" },
      { id: "gcs-advanced-rn", name: "Glasgow Coma Scale: Advanced Application", status: "Available" },
      { id: "neuro-checks-rn", name: "Neurological Checks and Trending", status: "Available" },
      { id: "cranial-nerve-exam-rn", name: "Cranial Nerve Examination (CN I-XII)", status: "Available" },
      { id: "icp-monitoring-rn", name: "ICP Monitoring Assessment", status: "Available" },
      { id: "scat5-assessment-rn", name: "SCAT5 Concussion Assessment Tool", status: "Available" },
      { id: "respiratory-assessment-rn", name: "Advanced Respiratory Assessment", status: "Available" },
      { id: "abg-interpretation-rn", name: "ABG Interpretation and Acid-Base", status: "Available" },
      { id: "ventilator-assessment-rn", name: "Ventilator Waveform Assessment", status: "Available" },
      { id: "chest-assessment-rn", name: "Chest Auscultation: Adventitious Sounds", status: "Available" },
      { id: "airway-assessment-rn", name: "Airway Assessment (Mallampati, Cormack)", status: "Available" },
      { id: "cardiac-auscultation-rn", name: "Advanced Cardiac Auscultation (Murmurs, Rubs)", status: "Available" },
      { id: "jvd-assessment-rn", name: "Jugular Venous Distension (JVD)", status: "Available" },
      { id: "peripheral-vascular-rn", name: "Peripheral Vascular Assessment (ABI)", status: "Available" },
      { id: "abdominal-assessment-rn", name: "Advanced Abdominal Assessment", status: "Available" },
      { id: "ascites-assessment-rn", name: "Ascites and Fluid Wave Assessment", status: "Available" },
      { id: "hepatojugular-reflux-rn", name: "Hepatojugular Reflux", status: "Available" },
      { id: "trauma-assessment-rn", name: "Trauma Assessment (AMPLE, SAMPLE)", status: "Available" },
      { id: "burn-assessment-rn", name: "Burn Assessment (Rule of 9s, Lund-Browder)", status: "Available" },
      { id: "wound-classification-rn", name: "Wound Classification and Healing Stages", status: "Available" },
      { id: "pressure-injury-staging-rn", name: "Pressure Injury Staging (NPUAP)", status: "Available" },
      { id: "pain-assessment-rn", name: "Multimodal Pain Assessment", status: "Available" },
      { id: "sedation-scale-rn", name: "Sedation Scales (Ramsay, RASS)", status: "Available" },
      { id: "delirium-screening-rn", name: "Delirium Screening (CAM, CAM-ICU)", status: "Available" },
      { id: "suicide-risk-assessment-rn", name: "Suicide Risk Assessment (Columbia, PHQ-9)", status: "Available" },
      { id: "mental-status-exam-rn", name: "Mental Status Examination (MSE)", status: "Available" },
      { id: "psychiatric-assessment-rn", name: "Psychiatric Nursing Assessment", status: "Available" },
      { id: "substance-screening-rn", name: "Substance Abuse Screening (CAGE, AUDIT)", status: "Available" },
      { id: "fetal-monitoring-assessment-rn", name: "Electronic Fetal Monitoring Interpretation", status: "Available" },
      { id: "bishop-score-rn", name: "Bishop Score: Cervical Readiness", status: "Available" },
      { id: "leopold-maneuvers-rn", name: "Leopold Maneuvers", status: "Available" },
      { id: "postpartum-assessment-rn", name: "Postpartum Assessment (BUBBLE-HE)", status: "Available" },
      { id: "ballard-score-rn", name: "Ballard Gestational Age Scoring", status: "Available" },
      { id: "pediatric-triangle-rn", name: "Pediatric Assessment Triangle (PAT)", status: "Available" },
      { id: "pediatric-early-warning-rn", name: "Pediatric Early Warning Score (PEWS)", status: "Available" },
      { id: "developmental-milestones-rn", name: "Developmental Milestone Assessment", status: "Available" },
      { id: "fluid-balance-rn", name: "Fluid Balance and Third-Spacing Assessment", status: "Available" },
      { id: "sepsis-screening-rn", name: "Sepsis Screening (qSOFA, SIRS Criteria)", status: "Available" },
      { id: "postop-assessment-rn", name: "Post-Operative Assessment", status: "Available" },
      { id: "discharge-readiness-rn", name: "Discharge Readiness Assessment", status: "Available" },
      { id: "cultural-assessment-rn", name: "Cultural Assessment in Nursing", status: "Available" },
      { id: "family-assessment-rn", name: "Family Assessment Models", status: "Available" },
      { id: "functional-assessment-rn", name: "Functional Assessment (ADL, Katz, Barthel)", status: "Available" },
      { id: "early-warning-score-rn", name: "National Early Warning Score (NEWS2)", status: "Available" },
      { id: "handoff-communication-rn", name: "Assessment Handoff (SBAR, I-SBAR-R)", status: "Available" }
    ]
  }
];

const npSystems = [
  {
    id: "cardiovascular-np",
    title: "Cardiovascular",
    icon: Heart,
    color: "text-red-700",
    bgColor: "bg-red-50",
    diseases: [
      { id: "aaa-rupture-np", name: "AAA: Pathogenesis & Management", status: "Available" },
      { id: "mi-management-np", name: "STEMI: Molecular & Pharmacology", status: "Available" },
      { id: "hf-advanced-np", name: "Heart Failure: Neurohormonal Blockade", status: "Available" },
      { id: "shock-syndromes-np", name: "Shock: Hemodynamic Monitoring", status: "Available" }
    ]
  },
  {
    id: "respiratory-np",
    title: "Respiratory",
    icon: Wind,
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    diseases: [
      { id: "copd-exacerbation-np", name: "COPD: Cellular Mechanisms", status: "Available" },
      { id: "asthma-emergency-np", name: "Status Asthmaticus: Advanced Mgmt", status: "Available" },
      { id: "pe-recognition-np", name: "PE: Wells Criteria & Thrombolysis", status: "Available" }
    ]
  },
  {
    id: "neurological-np",
    title: "Neurological",
    icon: Brain,
    color: "text-purple-700",
    bgColor: "bg-purple-50",
    diseases: [
      { id: "increased-icp-np", name: "ICP: Cerebral Perfusion Pressure", status: "Available" },
      { id: "stroke-advanced-np", name: "Stroke: Penumbra & Reperfusion", status: "Available" },
      { id: "seizure-safety-np", name: "Status Epilepticus: Refractory Mgmt", status: "Available" }
    ]
  },
  {
    id: "endocrine-np",
    title: "Endocrine & Metabolic",
    icon: Users,
    color: "text-rose-700",
    bgColor: "bg-rose-50",
    diseases: [
      { id: "dka-hhns-np", name: "DKA/HHS: Anion Gap & Osmolality", status: "Available" },
      { id: "siadh-di-np", name: "Sodium Disorders: Osmoregulation", status: "Available" },
      { id: "thyroid-storm-np", name: "Thyroid Storm: Receptor Blockade", status: "Available" }
    ]
  },
  {
    id: "renal-np",
    title: "Renal & Nephrology",
    icon: Droplets,
    color: "text-cyan-700",
    bgColor: "bg-cyan-50",
    diseases: [
      { id: "aki-management-np", name: "AKI: RIFLE Criteria & Dialysis", status: "Available" },
      { id: "electrolyte-safety-np", name: "Advanced Electrolyte Correction", status: "Available" }
    ]
  },
  {
    id: "hematology-np",
    title: "Hematology & Oncology",
    icon: ShieldAlert,
    color: "text-orange-700",
    bgColor: "bg-orange-50",
    diseases: [
      { id: "sepsis-mastery-np", name: "Sepsis: Cytokine Storm & SOFA", status: "Available" },
      { id: "dic-management-np", name: "DIC: Coagulation Cascade", status: "Available" },
      { id: "transfusion-reactions-np", name: "Transfusion Reactions: Hemolytic vs Febrile", status: "Available" },
      { id: "tumor-lysis-np", name: "Tumor Lysis Syndrome: Uric Acid Crisis", status: "Available" }
    ]
  },
  {
    id: "maternity-np",
    title: "Maternity & Obstetrics",
    icon: Baby,
    color: "text-rose-700",
    bgColor: "bg-rose-50",
    diseases: [
      { id: "hellp-syndrome-np", name: "HELLP Syndrome: Hepatic Cascade", status: "Available" },
      { id: "amniotic-fluid-embolism-np", name: "Amniotic Fluid Embolism: DIC Pathway", status: "Available" },
      { id: "eclampsia-np", name: "Eclampsia: Endothelial Dysfunction", status: "Available" },
      { id: "obstetric-hemorrhage-np", name: "Obstetric Hemorrhage: Massive Transfusion", status: "Available" }
    ]
  },
  {
    id: "neonatal-np",
    title: "Neonatal",
    icon: Baby,
    color: "text-sky-700",
    bgColor: "bg-sky-50",
    diseases: [
      { id: "neonatal-rds-np", name: "RDS: Surfactant Physiology", status: "Available" },
      { id: "neonatal-hie-np", name: "HIE: Therapeutic Hypothermia", status: "Available" },
      { id: "persistent-pulm-htn-np", name: "PPHN: Nitric Oxide Pathway", status: "Available" },
      { id: "neonatal-abstinence-np", name: "NAS: Opioid Withdrawal Scoring", status: "Available" }
    ]
  },
  {
    id: "immune-np",
    title: "Immune System",
    icon: ShieldAlert,
    color: "text-green-700",
    bgColor: "bg-green-50",
    diseases: [
      { id: "autoimmune-np", name: "Autoimmune Pathophysiology: Molecular", status: "Available" },
      { id: "immunodeficiency-np", name: "Immunodeficiency Syndromes", status: "Available" },
      { id: "transplant-rejection-np", name: "Transplant Rejection: T-Cell Mediated", status: "Available" },
      { id: "cytokine-cascade-np", name: "Cytokine Cascade and SIRS", status: "Available" }
    ]
  },
  {
    id: "pharmacology-np",
    title: "Pharmacology",
    icon: Pill,
    color: "text-indigo-700",
    bgColor: "bg-indigo-50",
    diseases: [
      { id: "vasopressors-np", name: "Vasopressors: Receptor Pharmacology", status: "Available" },
      { id: "sedation-np", name: "ICU Sedation: RASS & Protocols", status: "Available" },
      { id: "paralytic-agents-np", name: "Neuromuscular Blocking Agents", status: "Available" },
      { id: "thrombolytics-np", name: "Thrombolytics: Fibrinolytic Pathway", status: "Available" }
    ]
  },
  {
    id: "procedures-np",
    title: "Procedures",
    icon: Scissors,
    color: "text-teal-700",
    bgColor: "bg-teal-50",
    diseases: [
      { id: "central-line-np", name: "Central Line Insertion & Bundle", status: "Available" },
      { id: "lumbar-puncture-np", name: "Lumbar Puncture & CSF Analysis", status: "Available" },
      { id: "abg-sampling-np", name: "ABG Sampling & Interpretation", status: "Available" },
      { id: "mechanical-vent-np", name: "Mechanical Ventilation Management", status: "Available" }
    ]
  },
  {
    id: "musculoskeletal-np",
    title: "Musculoskeletal",
    icon: Activity,
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    diseases: [
      { id: "compartment-np", name: "Compartment Syndrome: Fasciotomy", status: "Available" },
      { id: "fat-embolism-np", name: "Fat Embolism Syndrome", status: "Available" },
      { id: "spinal-cord-injury-np", name: "Spinal Cord Injury: Autonomic Dysreflexia", status: "Available" }
    ]
  },
  {
    id: "assessment-np",
    title: "Assessment Skills",
    icon: Stethoscope,
    color: "text-indigo-700",
    bgColor: "bg-indigo-50",
    diseases: [
      { id: "comprehensive-hpi-np", name: "Comprehensive History and Physical (H&P)", status: "Available" },
      { id: "differential-diagnosis-np", name: "Differential Diagnosis Formulation", status: "Available" },
      { id: "clinical-reasoning-np", name: "Clinical Reasoning and Decision-Making", status: "Available" },
      { id: "evidence-based-assessment-np", name: "Evidence-Based Assessment Practice", status: "Available" },
      { id: "advanced-cardiac-auscultation-np", name: "Advanced Cardiac Auscultation (Murmurs, Gallops, Clicks)", status: "Available" },
      { id: "ecg-advanced-np", name: "12-Lead ECG: Advanced Interpretation", status: "Available" },
      { id: "hemodynamic-monitoring-np", name: "Hemodynamic Monitoring: Waveform Analysis", status: "Available" },
      { id: "swan-ganz-np", name: "Pulmonary Artery Catheter (Swan-Ganz) Assessment", status: "Available" },
      { id: "cardiac-output-np", name: "Cardiac Output and Preload/Afterload Assessment", status: "Available" },
      { id: "pft-interpretation-np", name: "Pulmonary Function Test Interpretation", status: "Available" },
      { id: "abg-advanced-np", name: "ABG Interpretation: Complex Acid-Base Disorders", status: "Available" },
      { id: "vent-waveform-np", name: "Ventilator Waveform Analysis: Auto-PEEP, Asynchrony", status: "Available" },
      { id: "respiratory-mechanics-np", name: "Respiratory Mechanics Assessment", status: "Available" },
      { id: "neuro-exam-advanced-np", name: "Comprehensive Neurological Examination", status: "Available" },
      { id: "cranial-nerve-advanced-np", name: "Cranial Nerve Testing: Advanced Techniques", status: "Available" },
      { id: "cerebellar-exam-np", name: "Cerebellar Examination", status: "Available" },
      { id: "motor-sensory-exam-np", name: "Motor and Sensory Examination", status: "Available" },
      { id: "reflex-grading-np", name: "Deep Tendon Reflexes and Pathological Reflexes", status: "Available" },
      { id: "brain-death-assessment-np", name: "Brain Death Assessment Protocol", status: "Available" },
      { id: "dermatological-exam-np", name: "Dermatological Assessment and Lesion Classification", status: "Available" },
      { id: "dermoscopy-np", name: "Dermoscopy: Pattern Analysis", status: "Available" },
      { id: "msk-special-tests-np", name: "Musculoskeletal Special Tests (Lachman, McMurray, Phalen)", status: "Available" },
      { id: "joint-exam-np", name: "Joint-Specific Examination Techniques", status: "Available" },
      { id: "spine-exam-np", name: "Spinal Assessment (Spurling, SLR, Schober)", status: "Available" },
      { id: "gait-analysis-np", name: "Gait Analysis and Abnormalities", status: "Available" },
      { id: "ophthalmoscopic-exam-np", name: "Ophthalmoscopic Examination (Fundoscopy)", status: "Available" },
      { id: "otoscopic-exam-np", name: "Otoscopic and Audiometric Examination", status: "Available" },
      { id: "thyroid-exam-np", name: "Thyroid Examination: Palpation and Assessment", status: "Available" },
      { id: "breast-exam-np", name: "Clinical Breast Examination", status: "Available" },
      { id: "gynecological-exam-np", name: "Gynecological Assessment and Cervical Screening", status: "Available" },
      { id: "prenatal-assessment-np", name: "Advanced Prenatal Assessment", status: "Available" },
      { id: "fetal-surveillance-np", name: "Fetal Surveillance: NST, BPP, CST", status: "Available" },
      { id: "geriatric-assessment-np", name: "Comprehensive Geriatric Assessment (CGA)", status: "Available" },
      { id: "frailty-assessment-np", name: "Frailty Assessment (Clinical Frailty Scale)", status: "Available" },
      { id: "cognitive-screening-np", name: "Cognitive Screening (MMSE, MoCA, Mini-Cog)", status: "Available" },
      { id: "developmental-screening-np", name: "Pediatric Developmental Screening (ASQ, MCHAT)", status: "Available" },
      { id: "psychiatric-diagnostic-np", name: "Psychiatric Diagnostic Assessment (DSM-5)", status: "Available" },
      { id: "vascular-assessment-np", name: "Advanced Vascular Assessment (Doppler, ABI)", status: "Available" },
      { id: "lymphedema-assessment-np", name: "Lymphedema Assessment and Staging", status: "Available" },
      { id: "abdominal-exam-np", name: "Advanced Abdominal Examination (Murphy, McBurney, Rovsing)", status: "Available" },
      { id: "rectal-prostate-np", name: "Digital Rectal and Prostate Examination", status: "Available" },
      { id: "sofa-apache-np", name: "SOFA and APACHE II Scoring", status: "Available" },
      { id: "wells-criteria-np", name: "Wells Criteria and Clinical Prediction Rules", status: "Available" },
      { id: "imaging-interpretation-np", name: "Chest X-Ray and Basic Imaging Interpretation", status: "Available" },
      { id: "lab-interpretation-np", name: "Advanced Lab Interpretation: Panels and Trends", status: "Available" },
      { id: "point-of-care-us-np", name: "Point-of-Care Ultrasound (POCUS) Assessment", status: "Available" },
      { id: "nutritional-assessment-np", name: "Advanced Nutritional Assessment (Prealbumin, Nitrogen Balance)", status: "Available" },
      { id: "wound-specialist-np", name: "Advanced Wound Assessment (TIME, WBP Framework)", status: "Available" },
      { id: "capacity-assessment-np", name: "Decision-Making Capacity Assessment", status: "Available" },
      { id: "palliative-assessment-np", name: "Palliative Care and Symptom Assessment", status: "Available" }
    ]
  }
];

export default function Lessons() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("rn");

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
      <SEO
        title="Nursing Lessons - Pathophysiology Mastery by Body System"
        description="Browse 100+ interactive nursing pathophysiology lessons organized by body system. Cover cardiovascular, respiratory, neurological, GI, endocrine, maternity, neonatal, and more for RPN, RN, and NP students."
        keywords="nursing pathophysiology lessons, body system nursing, cardiovascular nursing, respiratory nursing, neurological nursing, NCLEX study guide, nursing exam prep, clinical nursing education"
        canonicalPath="/lessons"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Nursing Pathophysiology Lessons",
          "description": "Interactive nursing lessons organized by body system covering cardiovascular, respiratory, neurological, GI, endocrine, maternity, neonatal, and more.",
          "url": "https://nursenest.replit.app/lessons",
          "isPartOf": { "@type": "WebSite", "name": "NurseNest" },
          "about": { "@type": "Thing", "name": "Nursing Pathophysiology" }
        }}
      />
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Pathophysiology Mastery</h1>
            <p className="text-lg text-gray-600">Advanced clinical recognition and safety logic for nursing students.</p>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-[600px]">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-full p-1">
              <TabsTrigger value="rpn" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">RPN / LVN</TabsTrigger>
              <TabsTrigger value="rn" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">RN (NCLEX)</TabsTrigger>
              <TabsTrigger value="np" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm text-purple-700 font-bold">NP (Advanced)</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="rpn" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {rpnSystems.map((system) => (
                <LessonSystemCard key={system.id} system={system} onSelect={(id) => setLocation(`/lessons/${id}`)} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="rn" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {rnSystems.map((system) => (
                <LessonSystemCard key={system.id} system={system} onSelect={(id) => setLocation(`/lessons/${id}`)} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="np" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {npSystems.map((system) => (
                <LessonSystemCard key={system.id} system={system} onSelect={(id) => setLocation(`/lessons/${id}`)} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function LessonSystemCard({ system, onSelect }: { system: any, onSelect: (id: string) => void }) {
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-all overflow-hidden bg-white">
      <CardHeader className={cn("flex flex-row items-center gap-4 pb-2", system.bgColor)}>
        <div className={cn("p-3 rounded-xl bg-white shadow-sm", system.color)}>
          <system.icon className="w-6 h-6" />
        </div>
        <CardTitle className="text-xl font-bold text-gray-900">{system.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-3">
          {system.diseases.map((disease: any) => (
            <div 
              key={disease.id}
              onClick={() => disease.status === "Available" && onSelect(disease.id)}
              className={cn(
                "flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group",
                disease.status === "Available" 
                  ? "border-primary/20 bg-primary/5 hover:bg-primary/10" 
                  : "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
              )}
            >
              <div className="flex items-center gap-3">
                <BookOpen className={cn("w-5 h-5", disease.status === "Available" ? "text-primary" : "text-gray-400")} />
                <span className="font-medium text-gray-900">
                  {disease.name}
                </span>
              </div>
              {disease.status === "Available" ? (
                <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
              ) : (
                <Lock className="w-4 h-4 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
