import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { AdminEditButton } from "@/components/admin-edit-button";
import { useI18n } from "@/lib/i18n";
import { Footer } from "@/components/footer";
import { buildBreadcrumbStructuredData, buildCatalogStructuredData } from "@/lib/seo-utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getLecturesForTier, type LectureMetadata } from "@/data/micro-lectures";
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
  Thermometer,
  PlayCircle,
  Scale,
  Clock,
  Home,
  Flame,
  HeartHandshake,
  Bandage,
  Target,
  Calculator
} from "lucide-react";

import { type DifficultyLevel, difficultyConfig, getDifficulty } from "@/lib/difficulty";
import { useAuth } from "@/lib/auth";
import { getSystemImage } from "@/lib/system-images";

const fundamentalsSystems = [
  {
    id: "fundamentals-core",
    title: "Nursing Fundamentals",
    icon: BookOpen,
    color: "text-teal-700",
    bgColor: "bg-teal-50",
    diseases: [
      { id: "nursing-process-adpie", name: "Nursing Process (ADPIE) & Clinical Reasoning", status: "Available" },
      { id: "vital-signs-red-flags", name: "Vital Signs: Red Flags & Rapid Response Triggers", status: "Available" },
      { id: "medication-administration-safety", name: "Medication Administration: Rights & Safety Checks", status: "Available" },
      { id: "infection-prevention-ppe", name: "Infection Prevention & PPE Standards", status: "Available" },
      { id: "documentation-sbar-dar", name: "Clinical Documentation: SBAR, DAR & Legal Safety", status: "Available" },
      { id: "fluid-balance-assessment", name: "Fluid Balance: I&O, Dehydration & Overload", status: "Available" }
    ]
  }
];

const delegationSystems = [
  {
    id: "delegation-core",
    title: "Delegation & Prioritization",
    icon: ShieldAlert,
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    diseases: [
      { id: "abcs-life-threats", name: "ABCs & Immediate Life Threat Prioritization", status: "Available" },
      { id: "unstable-vs-stable", name: "Unstable vs Stable: Prioritization Framework", status: "Available" },
      { id: "who-to-see-first", name: "Who to See First: Clinical Decision Framework", status: "Available" },
      { id: "delegation-rules-scope", name: "Delegation Rules & Scope of Practice", status: "Available" },
      { id: "sbar-escalation", name: "SBAR Escalation: When & How to Escalate", status: "Available" },
      { id: "post-op-prioritization", name: "Post-Op Complications: Prioritization", status: "Available" }
    ]
  }
];

const clinicalScenariosSystems = [
  {
    id: "clinical-scenarios",
    title: "Clinical Scenarios & Prioritization",
    icon: Target,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    diseases: [
      { id: "who-see-first-adult", name: "Who Do You See First: Adult Medical-Surgical", status: "Available" },
      { id: "who-see-first-pediatric", name: "Who Do You See First: Pediatric Scenarios", status: "Available" },
      { id: "delegation-traps-exam", name: "Delegation Traps: Common Exam Pitfalls", status: "Available" },
      { id: "unexpected-vs-expected", name: "Unexpected vs Expected Findings: Clinical Red Flags", status: "Available" },
      { id: "acute-deterioration-recognition", name: "Acute Deterioration Recognition & Rapid Response", status: "Available" },
      { id: "medication-safety-prioritization", name: "Medication Safety: Prioritization & Error Prevention", status: "Available" },
      { id: "postop-complication-recognition", name: "Post-Operative Complication Recognition", status: "Available" },
      { id: "pediatric-vs-adult-priorities", name: "Pediatric vs Adult Prioritization Differences", status: "Available" },
      { id: "first-action-logic", name: "First Action Logic: What to Do Before Calling the Provider", status: "Available" },
      { id: "assignment-making-scenarios", name: "Assignment Making: Matching Patient Acuity to Staff", status: "Available" }
    ]
  }
];

const medMathSystems = [
  {
    id: "med-math-core",
    title: "Med Math & Calculations",
    icon: Calculator,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    diseases: [
      { id: "med-math-dosage-calculations", name: "Dosage Calculation Fundamentals", status: "Available" },
      { id: "med-math-iv-flow-rates", name: "IV Flow Rate Calculations", status: "Available" },
      { id: "med-math-weight-based-dosing", name: "Weight-Based Dosing Calculations", status: "Available" },
      { id: "med-math-infusion-rates", name: "Infusion Rate & Titration Calculations", status: "Available" },
      { id: "med-math-pediatric-dosing", name: "Pediatric Dosing & Safety", status: "Available" },
      { id: "med-math-reconstitution", name: "Reconstitution & Dilution Calculations", status: "Available" },
      { id: "med-math-unit-conversions", name: "Unit Conversions in Medication Math", status: "Available" },
      { id: "med-math-drip-rate-formulas", name: "Drip Rate Formulas & Shortcuts", status: "Available" },
      { id: "med-math-safe-dose-range", name: "Safe Dose Range Verification", status: "Available" }
    ]
  }
];

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
      { id: "pacemaker-care", name: "Pacemaker Basics and Care", status: "Available" },
      { id: "raynauds-phenomenon-rpn", name: "Raynaud's Phenomenon", status: "Available" },
      { id: "buergers-disease-rpn", name: "Buerger's Disease", status: "Available" },
      { id: "venous-insufficiency-rpn", name: "Venous Insufficiency", status: "Available" },
      { id: "varicose-veins-rpn", name: "Varicose Veins", status: "Available" },
      { id: "endocarditis-basics-rpn", name: "Endocarditis Basics", status: "Available" },
      { id: "rheumatic-fever-rpn", name: "Rheumatic Fever", status: "Available" },
      { id: "kawasaki-disease-rpn", name: "Kawasaki Disease Basics", status: "Available" },
      { id: "cardiomyopathy-basics-rpn", name: "Cardiomyopathy Basics", status: "Available" },
      { id: "shock-types-recognition-rpn", name: "Shock Types: Hypovolemic, Cardiogenic, Septic, Anaphylactic", status: "Available" },
      { id: "chest-pain-differential-rpn", name: "Chest Pain Differentials: Cardiac vs Non-Cardiac", status: "Available" }
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
      { id: "abg-basics", name: "ABG Interpretation Basics", status: "Available" },
      { id: "copd-basics-rpn", name: "COPD Basics", status: "Available" },
      { id: "asthma-basics-rpn", name: "Asthma Basics", status: "Available" },
      { id: "pneumonia-basics-rpn", name: "Pneumonia Basics", status: "Available" },
      { id: "tb-basics-rpn", name: "Tuberculosis Basics", status: "Available" },
      { id: "tracheostomy-basics-rpn", name: "Tracheostomy Basics", status: "Available" },
      { id: "chest-physiotherapy-rpn", name: "Chest Physiotherapy", status: "Available" },
      { id: "suctioning-rpn", name: "Suctioning Techniques", status: "Available" },
      { id: "incentive-spirometry-rpn", name: "Incentive Spirometry", status: "Available" },
      { id: "peak-flow-monitoring-rpn", name: "Peak Flow Monitoring", status: "Available" },
      { id: "cystic-fibrosis-basics-rpn", name: "Cystic Fibrosis Basics", status: "Available" },
      { id: "pleurisy-rpn", name: "Pleurisy", status: "Available" },
      { id: "pulmonary-fibrosis-basics-rpn", name: "Pulmonary Fibrosis Basics", status: "Available" },
      { id: "bronchiectasis-rpn", name: "Bronchiectasis", status: "Available" },
      { id: "rsv-rpn", name: "Respiratory Syncytial Virus (RSV)", status: "Available" },
      { id: "pertussis-management-rpn", name: "Pertussis/Whooping Cough Management", status: "Available" },
      { id: "hemoptysis-assessment-rpn", name: "Hemoptysis Assessment", status: "Available" },
      { id: "rhonchi-rpn", name: "Rhonchi: Assessment & Clinical Significance", status: "Available" }
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
      { id: "brain-abscess", name: "Brain Abscess", status: "Available" },
      { id: "multiple-sclerosis-basics-rpn", name: "Multiple Sclerosis Basics", status: "Available" },
      { id: "als-basics-rpn", name: "ALS Basics", status: "Available" },
      { id: "myasthenia-gravis-basics-rpn", name: "Myasthenia Gravis Basics", status: "Available" },
      { id: "trigeminal-neuralgia-rpn", name: "Trigeminal Neuralgia", status: "Available" },
      { id: "bells-palsy-rpn", name: "Bell's Palsy", status: "Available" },
      { id: "carpal-tunnel-syndrome-rpn", name: "Carpal Tunnel Syndrome", status: "Available" },
      { id: "restless-leg-syndrome-rpn", name: "Restless Leg Syndrome", status: "Available" },
      { id: "narcolepsy-rpn", name: "Narcolepsy", status: "Available" },
      { id: "hydrocephalus-basics-rpn", name: "Hydrocephalus Basics", status: "Available" },
      { id: "spinal-stenosis-rpn", name: "Spinal Stenosis", status: "Available" },
      { id: "peripheral-neuropathy-basics-rpn", name: "Peripheral Neuropathy Basics", status: "Available" },
      { id: "seizure-types-priorities-rpn", name: "Seizure Types & Nursing Priorities", status: "Available" },
      { id: "febrile-seizure", name: "Febrile Seizures", status: "Available" }
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
      { id: "feeding-tube-irrigation", name: "Feeding Tube Irrigation", status: "Available" },
      { id: "gerd-basics-rpn", name: "GERD (Gastroesophageal Reflux)", status: "Available" },
      { id: "peptic-ulcer-basics-rpn", name: "Peptic Ulcer Basics", status: "Available" },
      { id: "constipation-management-rpn", name: "Constipation Management", status: "Available" },
      { id: "diarrhea-management-rpn", name: "Diarrhea Management", status: "Available" },
      { id: "hepatitis-basics-rpn", name: "Hepatitis Basics", status: "Available" },
      { id: "viral-hepatitis", name: "Viral Hepatitis Overview", status: "Available" },
      { id: "hepatitis-c", name: "Hepatitis C", status: "Available" },
      { id: "chronic-hepatitis", name: "Chronic Hepatitis", status: "Available" },
      { id: "stoma-care-rpn", name: "Stoma Care and Ostomy Management", status: "Available" },
      { id: "rectal-medication-rpn", name: "Rectal Medication Administration", status: "Available" },
      { id: "crohns-disease-basics-rpn", name: "Crohn's Disease Basics", status: "Available" },
      { id: "ulcerative-colitis-basics-rpn", name: "Ulcerative Colitis Basics", status: "Available" },
      { id: "diverticulitis-rpn", name: "Diverticulitis", status: "Available" },
      { id: "hiatal-hernia-rpn", name: "Hiatal Hernia", status: "Available" },
      { id: "dysphagia-management-rpn", name: "Dysphagia Management", status: "Available" },
      { id: "gi-bleed-basics-rpn", name: "GI Bleed Basics", status: "Available" },
      { id: "hemorrhoids-rpn", name: "Hemorrhoids", status: "Available" },
      { id: "anal-fissure-rpn", name: "Anal Fissure", status: "Available" },
      { id: "cdiff-management-rpn", name: "C. Difficile Management", status: "Available" },
      { id: "malabsorption-syndromes-rpn", name: "Malabsorption Syndromes", status: "Available" },
      { id: "cholecystectomy-rpn", name: "Cholecystectomy", status: "Available" }
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
      { id: "urine-output-monitoring", name: "Urine Output Monitoring", status: "Available" },
      { id: "uti-basics-rpn", name: "UTI Basics", status: "Available" },
      { id: "kidney-stone-basics-rpn", name: "Kidney Stone Basics", status: "Available" },
      { id: "fluid-balance-monitoring-rpn", name: "Fluid Balance Monitoring", status: "Available" },
      { id: "peritoneal-dialysis-basics-rpn", name: "Peritoneal Dialysis Basics", status: "Available" },
      { id: "hemodialysis-basics-rpn", name: "Hemodialysis Basics", status: "Available" },
      { id: "bph-basics-rpn", name: "Benign Prostatic Hyperplasia (BPH)", status: "Available" },
      { id: "incontinence-management-rpn", name: "Incontinence Management", status: "Available" },
      { id: "glomerulonephritis-basics-rpn", name: "Glomerulonephritis Basics", status: "Available" },
      { id: "polycystic-kidney-disease-rpn", name: "Polycystic Kidney Disease", status: "Available" },
      { id: "renal-calculi-types-rpn", name: "Renal Calculi Types", status: "Available" },
      { id: "urethral-stricture-rpn", name: "Urethral Stricture", status: "Available" },
      { id: "neurogenic-bladder-rpn", name: "Neurogenic Bladder", status: "Available" },
      { id: "renal-artery-stenosis-rpn", name: "Renal Artery Stenosis", status: "Available" }
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
      { id: "negative-feedback", name: "Negative Feedback Loops", status: "Available" },
      { id: "addisons-disease-basics-rpn", name: "Addison's Disease Basics", status: "Available" },
      { id: "cushings-syndrome-basics-rpn", name: "Cushing's Syndrome Basics", status: "Available" },
      { id: "siadh-basics-rpn", name: "SIADH Basics", status: "Available" },
      { id: "diabetes-insipidus-basics-rpn", name: "Diabetes Insipidus Basics", status: "Available" },
      { id: "hyperparathyroidism-rpn", name: "Hyperparathyroidism", status: "Available" },
      { id: "hypoparathyroidism-rpn", name: "Hypoparathyroidism", status: "Available" },
      { id: "acromegaly-basics-rpn", name: "Acromegaly Basics", status: "Available" },
      { id: "graves-disease-rpn", name: "Graves' Disease", status: "Available" },
      { id: "hypoglycemia-vs-dka-rpn", name: "Hypoglycemia vs DKA vs HHS: Recognition & Response", status: "Available" }
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
      { id: "blood-products", name: "Blood Products and Transfusion Basics", status: "Available" },
      { id: "hemophilia-basics-rpn", name: "Hemophilia Basics", status: "Available" },
      { id: "thrombocytopenia-rpn", name: "Thrombocytopenia", status: "Available" },
      { id: "von-willebrand-disease-rpn", name: "Von Willebrand Disease", status: "Available" },
      { id: "thalassemia-rpn", name: "Thalassemia", status: "Available" },
      { id: "aplastic-anemia-rpn", name: "Aplastic Anemia", status: "Available" },
      { id: "blood-typing-crossmatch-rpn", name: "Blood Typing and Crossmatch", status: "Available" },
      { id: "polycythemia-basics-rpn", name: "Polycythemia Basics", status: "Available" },
      { id: "lymphoma-basics-rpn", name: "Lymphoma Basics", status: "Available" },
      { id: "blood-transfusion-rpn", name: "Blood Transfusions", status: "Available" },
      { id: "hemolytic-transfusion-rpn", name: "Acute Hemolytic Transfusion Reaction", status: "Available" },
      { id: "anaphylactic-transfusion-rpn", name: "Anaphylactic Transfusion Reaction", status: "Available" },
      { id: "febrile-transfusion-rpn", name: "Febrile Nonhemolytic Transfusion Reaction", status: "Available" }
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
      { id: "atopic-dermatitis", name: "Atopic Dermatitis (Eczema)", status: "Available" },
      { id: "glaucoma-rpn", name: "Glaucoma", status: "Available" },
      { id: "macular-degeneration-rpn", name: "Macular Degeneration", status: "Available" },
      { id: "retinal-detachment-rpn", name: "Retinal Detachment", status: "Available" },
      { id: "menieres-disease-basics-rpn", name: "Meniere's Disease Basics", status: "Available" },
      { id: "tinnitus-rpn", name: "Tinnitus", status: "Available" },
      { id: "herpes-simplex-rpn", name: "Herpes Simplex", status: "Available" },
      { id: "shingles-herpes-zoster-rpn", name: "Shingles/Herpes Zoster", status: "Available" },
      { id: "stevens-johnson-basics-rpn", name: "Stevens-Johnson Basics", status: "Available" },
      { id: "pemphigus-rpn", name: "Pemphigus", status: "Available" },
      { id: "vitiligo-rpn", name: "Vitiligo", status: "Available" },
      { id: "alopecia-rpn", name: "Alopecia", status: "Available" },
      { id: "scabies-rpn", name: "Scabies", status: "Available" },
      { id: "fungal-infections-overview-rpn", name: "Fungal Infections Overview", status: "Available" }
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
      { id: "clubfoot", name: "Clubfoot (Talipes Equinovarus)", status: "Available" },
      { id: "rickets", name: "Rickets", status: "Available" },
      { id: "compartment-syndrome", name: "Compartment Syndrome", status: "Available" },
      { id: "fibromyalgia", name: "Fibromyalgia", status: "Available" },
      { id: "contracture", name: "Contracture", status: "Available" },
      { id: "chronic-fatigue-syndrome", name: "Chronic Fatigue Syndrome", status: "Available" },
      { id: "disuse-atrophy", name: "Disuse Atrophy", status: "Available" },
      { id: "syndactyly", name: "Syndactyly", status: "Available" },
      { id: "polydactyly", name: "Polydactyly", status: "Available" },
      { id: "fracture-sprain-care", name: "Fractures, Sprains, and Strains", status: "Available" },
      { id: "fracture-types", name: "Fracture Types and Healing", status: "Available" },
      { id: "cast-care", name: "Cast Care and Traction", status: "Available" },
      { id: "rom-exercises", name: "Range of Motion Exercises", status: "Available" },
      { id: "mobility-aids", name: "Mobility Aids and Ambulation", status: "Available" },
      { id: "joint-replacement-basics", name: "Joint Replacement Basics", status: "Available" },
      { id: "body-mechanics", name: "Body Mechanics and Ergonomics", status: "Available" },
      { id: "fall-prevention", name: "Fall Prevention Strategies", status: "Available" },
      { id: "rib-fractures-rpn", name: "Rib Fractures", status: "Available" }
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
      { id: "separation-anxiety", name: "Separation Anxiety", status: "Available" },
      { id: "pyloric-stenosis-basics-rpn", name: "Pyloric Stenosis Basics", status: "Available" },
      { id: "intussusception-basics-rpn", name: "Intussusception Basics", status: "Available" },
      { id: "hirschsprung-disease-basics-rpn", name: "Hirschsprung Disease Basics", status: "Available" },
      { id: "cystic-fibrosis-peds-rpn", name: "Cystic Fibrosis (Peds)", status: "Available" },
      { id: "phenylketonuria-rpn", name: "Phenylketonuria (PKU)", status: "Available" },
      { id: "galactosemia-rpn", name: "Galactosemia", status: "Available" },
      { id: "biliary-atresia-rpn", name: "Biliary Atresia", status: "Available" },
      { id: "wilms-tumor-rpn", name: "Wilms Tumor", status: "Available" },
      { id: "neuroblastoma-rpn", name: "Neuroblastoma", status: "Available" },
      { id: "osteogenesis-imperfecta-rpn", name: "Osteogenesis Imperfecta", status: "Available" },
      { id: "marfan-syndrome-rpn", name: "Marfan Syndrome", status: "Available" },
      { id: "turner-syndrome-rpn", name: "Turner Syndrome", status: "Available" },
      { id: "klinefelter-syndrome-rpn", name: "Klinefelter Syndrome", status: "Available" },
      { id: "hemolytic-uremic-syndrome-rpn", name: "Hemolytic Uremic Syndrome", status: "Available" },
      { id: "reye-syndrome-rpn", name: "Reye Syndrome", status: "Available" },
      { id: "androgen-insensitivity-rpn", name: "Androgen Insensitivity Syndrome", status: "Available" },
      { id: "pavlik-harness-rpn", name: "Pavlik Harness (DDH)", status: "Available" }
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
      { id: "breastfeeding-basics", name: "Breastfeeding and Lactation", status: "Available" },
      { id: "antepartum-complications-rpn", name: "Antepartum Complications Basics", status: "Available" },
      { id: "fetal-monitoring-basics-rpn", name: "Fetal Monitoring Basics", status: "Available" },
      { id: "gestational-diabetes-rpn", name: "Gestational Diabetes Basics", status: "Available" },
      { id: "pregnancy-nutrition-rpn", name: "Pregnancy Nutrition", status: "Available" },
      { id: "cesarean-section-care-rpn", name: "Cesarean Section Care", status: "Available" },
      { id: "episiotomy-care-rpn", name: "Episiotomy Care", status: "Available" },
      { id: "ectopic-pregnancy-basics-rpn", name: "Ectopic Pregnancy Basics", status: "Available" },
      { id: "placenta-previa-basics-rpn", name: "Placenta Previa Basics", status: "Available" },
      { id: "placental-abruption-basics-rpn", name: "Placental Abruption Basics", status: "Available" },
      { id: "hellp-basics-rpn", name: "HELLP Basics Awareness", status: "Available" },
      { id: "hyperemesis-gravidarum-rpn", name: "Hyperemesis Gravidarum", status: "Available" },
      { id: "rh-incompatibility-rpn", name: "Rh Incompatibility", status: "Available" },
      { id: "umbilical-cord-prolapse-rpn", name: "Umbilical Cord Prolapse", status: "Available" },
      { id: "amniotic-fluid-imbalances-rpn", name: "Amniotic Fluid Imbalances", status: "Available" },
      { id: "postpartum-hemorrhage-basics-rpn", name: "Postpartum Hemorrhage Basics", status: "Available" },
      { id: "mastitis-basics-rpn", name: "Mastitis Basics", status: "Available" },
      { id: "vaginal-hematoma-rpn", name: "Vaginal Hematoma", status: "Available" },
      { id: "fetal-oxygenation-pushing-rpn", name: "Fetal Oxygenation During Pushing", status: "Available" }
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
      { id: "neonatal-jaundice-basics", name: "Neonatal Jaundice Basics", status: "Available" },
      { id: "circumcision-care-rpn", name: "Circumcision Care", status: "Available" },
      { id: "cord-care-rpn", name: "Umbilical Cord Care", status: "Available" },
      { id: "neonatal-screening-rpn", name: "Neonatal Screening Tests", status: "Available" },
      { id: "neonatal-reflexes-rpn", name: "Neonatal Reflexes", status: "Available" },
      { id: "neonatal-vital-signs-rpn", name: "Neonatal Vital Signs", status: "Available" },
      { id: "car-seat-safety-rpn", name: "Car Seat Safety", status: "Available" },
      { id: "neonatal-hypoglycemia-basics-rpn", name: "Neonatal Hypoglycemia Basics", status: "Available" },
      { id: "neonatal-sepsis-awareness-rpn", name: "Neonatal Sepsis Awareness", status: "Available" },
      { id: "meconium-aspiration-basics-rpn", name: "Meconium Aspiration Basics", status: "Available" },
      { id: "necrotizing-enterocolitis-basics-rpn", name: "Necrotizing Enterocolitis Basics", status: "Available" },
      { id: "retinopathy-of-prematurity-rpn", name: "Retinopathy of Prematurity", status: "Available" },
      { id: "bronchopulmonary-dysplasia-rpn", name: "Bronchopulmonary Dysplasia", status: "Available" },
      { id: "neonatal-abstinence-basics-rpn", name: "Neonatal Abstinence Syndrome Basics", status: "Available" },
      { id: "congenital-hypothyroidism-rpn", name: "Congenital Hypothyroidism", status: "Available" }
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
      { id: "pertussis-basics", name: "Pertussis (Whooping Cough)", status: "Available" },
      { id: "mrsa-rpn", name: "MRSA (Methicillin-Resistant Staph)", status: "Available" },
      { id: "vre-rpn", name: "VRE (Vancomycin-Resistant Enterococcus)", status: "Available" },
      { id: "hepatitis-bc-rpn", name: "Hepatitis B and C", status: "Available" },
      { id: "hiv-basics-rpn", name: "HIV Basics", status: "Available" },
      { id: "influenza-rpn", name: "Influenza", status: "Available" },
      { id: "covid-basics-rpn", name: "COVID-19 Basics", status: "Available" },
      { id: "wound-infection-signs-rpn", name: "Wound Infection Signs", status: "Available" },
      { id: "measles-rpn", name: "Measles", status: "Available" },
      { id: "mumps-rpn", name: "Mumps", status: "Available" },
      { id: "rubella-rpn", name: "Rubella", status: "Available" },
      { id: "scarlet-fever-rpn", name: "Scarlet Fever", status: "Available" },
      { id: "hand-foot-mouth-disease-rpn", name: "Hand Foot and Mouth Disease", status: "Available" },
      { id: "mononucleosis-rpn", name: "Mononucleosis", status: "Available" },
      { id: "meningitis-basics-rpn", name: "Meningitis Basics", status: "Available" },
      { id: "encephalitis-basics-rpn", name: "Encephalitis Basics", status: "Available" },
      { id: "malaria-basics-rpn", name: "Malaria Basics", status: "Available" },
      { id: "dengue-basics-rpn", name: "Dengue Basics", status: "Available" },
      { id: "lyme-disease-basics-rpn", name: "Lyme Disease Basics", status: "Available" },
      { id: "tetanus-rpn", name: "Tetanus", status: "Available" },
      { id: "rabies-post-exposure-rpn", name: "Rabies Post-Exposure", status: "Available" },
      { id: "tb-management-basics-rpn", name: "Tuberculosis Management Basics", status: "Available" },
      { id: "osteomyelitis-basics-rpn", name: "Osteomyelitis Basics", status: "Available" },
      { id: "sepsis-basics-rpn", name: "Sepsis Basics", status: "Available" },
      { id: "endocarditis-infection-rpn", name: "Endocarditis Infection", status: "Available" },
      { id: "toxic-shock-syndrome-rpn", name: "Toxic Shock Syndrome", status: "Available" }
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
      { id: "meds-to-infants", name: "Administering Meds to Infants", status: "Available" },
      { id: "blood-glucose-monitoring-rpn", name: "Blood Glucose Monitoring", status: "Available" },
      { id: "specimen-collection-rpn", name: "Specimen Collection", status: "Available" },
      { id: "oxygen-therapy-setup-rpn", name: "Oxygen Therapy Setup", status: "Available" },
      { id: "suctioning-technique-rpn", name: "Suctioning Technique", status: "Available" },
      { id: "tracheostomy-care-rpn", name: "Tracheostomy Care", status: "Available" },
      { id: "chest-tube-basics-rpn", name: "Chest Tube Basics", status: "Available" },
      { id: "drain-management-rpn", name: "Drain Management", status: "Available" },
      { id: "pre-post-op-care-rpn", name: "Pre- and Post-Operative Care", status: "Available" }
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
      { id: "antibiotic-basics", name: "Antibiotic Classes Overview", status: "Available" },
      { id: "methotrexate-safety-rpn", name: "Methotrexate Safety", status: "Available" },
      { id: "oxybutynin-rpn", name: "Oxybutynin (Ditropan)", status: "Available" },
      { id: "levetiracetam-rpn", name: "Levetiracetam (Keppra)", status: "Available" },
      { id: "short-acting-insulin-rpn", name: "Regular Insulin (Humulin R/Novolin R)", status: "Available" }
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
      { id: "uti-basics", name: "Urinary Tract Infections", status: "Available" },
      { id: "delayed-puberty-rpn", name: "Delayed Puberty", status: "Available" },
      { id: "precocious-puberty-rpn", name: "Precocious Puberty", status: "Available" },
      { id: "dysmenorrhea-rpn", name: "Dysmenorrhea", status: "Available" },
      { id: "abnormal-uterine-bleeding-rpn", name: "Abnormal Uterine Bleeding", status: "Available" },
      { id: "pcos-rpn", name: "Polycystic Ovary Syndrome (PCOS)", status: "Available" },
      { id: "pid-rpn", name: "Pelvic Inflammatory Disease", status: "Available" },
      { id: "vaginitis-rpn", name: "Vaginitis", status: "Available" },
      { id: "bacterial-vaginosis-rpn", name: "Bacterial Vaginosis", status: "Available" },
      { id: "cervicitis-rpn", name: "Cervicitis", status: "Available" },
      { id: "vulvodynia-rpn", name: "Vulvodynia", status: "Available" },
      { id: "bartholinitis-rpn", name: "Bartholinitis", status: "Available" },
      { id: "uterine-prolapse-rpn", name: "Uterine Prolapse", status: "Available" },
      { id: "benign-ovarian-cysts-rpn", name: "Benign Ovarian Cysts", status: "Available" },
      { id: "endometrial-polyp-rpn", name: "Endometrial Polyp", status: "Available" }
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
  },
  {
    id: "fluid-electrolytes-rpn",
    title: "Fluid & Electrolytes",
    icon: Beaker,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    diseases: [
      { id: "sodium-imbalance-rpn", name: "Sodium Imbalances (Hypo/Hypernatremia)", status: "Available" },
      { id: "potassium-imbalance-rpn", name: "Potassium Imbalances (Hypo/Hyperkalemia)", status: "Available" },
      { id: "calcium-imbalance-rpn", name: "Calcium Imbalances (Hypo/Hypercalcemia)", status: "Available" },
      { id: "magnesium-imbalance-rpn", name: "Magnesium Imbalances", status: "Available" },
      { id: "dehydration-rpn", name: "Dehydration Assessment and Management", status: "Available" },
      { id: "overhydration-rpn", name: "Fluid Overload (Overhydration)", status: "Available" },
      { id: "iv-fluid-types-rpn", name: "IV Fluid Types (Isotonic, Hypertonic, Hypotonic)", status: "Available" },
      { id: "iv-therapy-basics-rpn", name: "IV Therapy Basics and Monitoring", status: "Available" },
      { id: "acid-base-balance-rpn", name: "Acid-Base Balance Overview", status: "Available" },
      { id: "electrolyte-emergency-patterns-rpn", name: "Electrolyte Emergency Patterns: Recognition & Intervention", status: "Available" },
      { id: "fluid-resuscitation-logic-rpn", name: "Fluid Resuscitation: Principles & Monitoring", status: "Available" }
    ]
  },
  {
    id: "safety-ethics-rpn",
    title: "Safety & Ethics",
    icon: Scale,
    color: "text-slate-600",
    bgColor: "bg-slate-50",
    diseases: [
      { id: "informed-consent-rpn", name: "Informed Consent", status: "Available" },
      { id: "advance-directives-rpn", name: "Advance Directives", status: "Available" },
      { id: "hipaa-phipa-rpn", name: "HIPAA and PHIPA Privacy Laws", status: "Available" },
      { id: "restraint-use-rpn", name: "Restraint Use and Alternatives", status: "Available" },
      { id: "medication-errors-rpn", name: "Medication Errors and Prevention", status: "Available" },
      { id: "incident-reporting-rpn", name: "Incident Reporting", status: "Available" },
      { id: "patient-rights-rpn", name: "Patient Rights and Advocacy", status: "Available" },
      { id: "scope-of-practice-rpn", name: "Scope of Practice (RPN/LVN)", status: "Available" },
      { id: "delegation-rpn", name: "Delegation and Assignment", status: "Available" },
      { id: "mandatory-reporting-rpn", name: "Mandatory Reporting Obligations", status: "Available" },
      { id: "cultural-competence-rpn", name: "Cultural Competence in Nursing", status: "Available" }
    ]
  },
  {
    id: "gerontology-rpn",
    title: "Gerontology",
    icon: Clock,
    color: "text-stone-600",
    bgColor: "bg-stone-50",
    diseases: [
      { id: "aging-changes-rpn", name: "Normal Aging Changes", status: "Available" },
      { id: "polypharmacy-rpn", name: "Polypharmacy in the Elderly", status: "Available" },
      { id: "fall-risk-elderly-rpn", name: "Fall Risk in the Elderly", status: "Available" },
      { id: "delirium-elderly-rpn", name: "Delirium in the Elderly", status: "Available" },
      { id: "elder-abuse-rpn", name: "Elder Abuse Recognition and Reporting", status: "Available" },
      { id: "sensory-changes-rpn", name: "Sensory Changes in Aging", status: "Available" },
      { id: "mobility-decline-rpn", name: "Mobility Decline and Prevention", status: "Available" },
      { id: "eol-basics-rpn", name: "End-of-Life Basics", status: "Available" },
      { id: "dementia-care-rpn", name: "Dementia Care Strategies", status: "Available" },
      { id: "nutrition-elderly-rpn", name: "Nutrition in the Elderly", status: "Available" }
    ]
  },
  {
    id: "wound-care-rpn",
    title: "Wound Care & Skin",
    icon: Bandage,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    diseases: [
      { id: "wound-healing-phases-rpn", name: "Wound Healing Phases", status: "Available" },
      { id: "wound-measurement-rpn", name: "Wound Measurement and Documentation", status: "Available" },
      { id: "npwt-basics-rpn", name: "Negative Pressure Wound Therapy Basics", status: "Available" },
      { id: "skin-tears-rpn", name: "Skin Tears Prevention and Management", status: "Available" },
      { id: "masd-rpn", name: "Moisture-Associated Skin Damage", status: "Available" },
      { id: "surgical-wound-care-rpn", name: "Surgical Wound Care", status: "Available" },
      { id: "burn-wound-basics-rpn", name: "Burn Wound Basics", status: "Available" },
      { id: "dressing-types-rpn", name: "Wound Dressing Types and Selection", status: "Available" }
    ]
  },
  {
    id: "pain-management-rpn",
    title: "Pain Management",
    icon: Flame,
    color: "text-red-600",
    bgColor: "bg-red-50",
    diseases: [
      { id: "pain-pathways-rpn", name: "Pain Pathways and Physiology", status: "Available" },
      { id: "acute-vs-chronic-pain-rpn", name: "Acute vs Chronic Pain", status: "Available" },
      { id: "non-pharm-pain-rpn", name: "Non-Pharmacological Pain Interventions", status: "Available" },
      { id: "pca-pumps-rpn", name: "PCA Pumps (Patient-Controlled Analgesia)", status: "Available" },
      { id: "epidural-analgesia-rpn", name: "Epidural Analgesia Basics", status: "Available" },
      { id: "pediatric-pain-rpn", name: "Pediatric Pain Assessment and Management", status: "Available" },
      { id: "neonatal-pain-rpn", name: "Neonatal Pain Recognition", status: "Available" },
      { id: "opioid-safety-rpn", name: "Opioid Safety and Monitoring", status: "Available" }
    ]
  },
  {
    id: "palliative-eol-rpn",
    title: "Palliative & End of Life",
    icon: HeartHandshake,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    diseases: [
      { id: "palliative-symptom-mgmt-rpn", name: "Symptom Management in Palliative Care", status: "Available" },
      { id: "death-dying-stages-rpn", name: "Death and Dying Stages", status: "Available" },
      { id: "grief-and-loss-rpn", name: "Grief and Loss", status: "Available" },
      { id: "comfort-measures-rpn", name: "Comfort Measures", status: "Available" },
      { id: "hospice-vs-palliative-rpn", name: "Hospice vs Palliative Care", status: "Available" },
      { id: "dnr-directives-rpn", name: "DNR and Advance Directives", status: "Available" },
      { id: "family-support-eol-rpn", name: "Family Support at End of Life", status: "Available" },
      { id: "postmortem-care-rpn", name: "Postmortem Care", status: "Available" }
    ]
  },
  {
    id: "community-health-rpn",
    title: "Community Health",
    icon: Home,
    color: "text-teal-600",
    bgColor: "bg-teal-50",
    diseases: [
      { id: "home-care-nursing-rpn", name: "Home Care Nursing", status: "Available" },
      { id: "public-health-concepts-rpn", name: "Public Health Concepts", status: "Available" },
      { id: "communicable-disease-reporting-rpn", name: "Communicable Disease Reporting", status: "Available" },
      { id: "health-promotion-rpn", name: "Health Promotion and Education", status: "Available" },
      { id: "screening-programs-rpn", name: "Screening Programs", status: "Available" },
      { id: "community-resources-rpn", name: "Community Resources and Referrals", status: "Available" },
      { id: "discharge-planning-rpn", name: "Discharge Planning", status: "Available" }
    ]
  },
  {
    id: "oncology-rpn",
    title: "Oncology",
    icon: Activity,
    color: "text-fuchsia-500",
    bgColor: "bg-fuchsia-50",
    diseases: [
      { id: "cancer-basics-staging-rpn", name: "Cancer Basics and Staging", status: "Available" },
      { id: "chemotherapy-basics-rpn", name: "Chemotherapy Basics", status: "Available" },
      { id: "radiation-therapy-basics-rpn", name: "Radiation Therapy Basics", status: "Available" },
      { id: "tumor-markers-rpn", name: "Tumor Markers", status: "Available" },
      { id: "oncological-emergencies-rpn", name: "Oncological Emergencies Awareness", status: "Available" },
      { id: "neutropenic-precautions-rpn", name: "Neutropenic Precautions", status: "Available" },
      { id: "cancer-pain-management-rpn", name: "Cancer Pain Management", status: "Available" },
      { id: "palliative-chemo-concepts-rpn", name: "Palliative Chemo Concepts", status: "Available" },
      { id: "breast-cancer-basics-rpn", name: "Breast Cancer Basics", status: "Available" },
      { id: "lung-cancer-basics-rpn", name: "Lung Cancer Basics", status: "Available" },
      { id: "colorectal-cancer-basics-rpn", name: "Colorectal Cancer Basics", status: "Available" },
      { id: "prostate-cancer-basics-rpn", name: "Prostate Cancer Basics", status: "Available" },
      { id: "cervical-cancer-basics-rpn", name: "Cervical Cancer Basics", status: "Available" },
      { id: "leukemia-basics-rpn", name: "Leukemia Basics", status: "Available" },
      { id: "lymphoma-basics-onc-rpn", name: "Lymphoma Basics", status: "Available" },
      { id: "tumor-lysis-rpn", name: "Tumor Lysis Syndrome", status: "Available" }
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
      { id: "febrile-seizure", name: "Febrile Seizures", status: "Available" },
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
      { id: "celiac-disease", name: "Celiac Disease", status: "Available" },
      { id: "viral-hepatitis", name: "Viral Hepatitis Overview", status: "Available" },
      { id: "hepatitis-c", name: "Hepatitis C", status: "Available" },
      { id: "chronic-hepatitis", name: "Chronic Hepatitis", status: "Available" }
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
      { id: "bph-management", name: "Benign Prostatic Hyperplasia", status: "Available" },
      { id: "acute-glomerulonephritis", name: "Acute Postinfectious Glomerulonephritis", status: "Available" }
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
      { id: "thalassemia", name: "Thalassemia", status: "Available" },
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
      { id: "fibromyalgia", name: "Fibromyalgia", status: "Available" },
      { id: "contracture", name: "Contracture", status: "Available" },
      { id: "chronic-fatigue-syndrome", name: "Chronic Fatigue Syndrome", status: "Available" },
      { id: "disuse-atrophy", name: "Disuse Atrophy", status: "Available" },
      { id: "scoliosis", name: "Scoliosis", status: "Available" },
      { id: "hip-dysplasia", name: "Hip Dysplasia", status: "Available" },
      { id: "clubfoot", name: "Clubfoot", status: "Available" },
      { id: "rickets", name: "Rickets", status: "Available" },
      { id: "syndactyly", name: "Syndactyly", status: "Available" },
      { id: "polydactyly", name: "Polydactyly", status: "Available" },
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
      { id: "sjogren-syndrome", name: "Sjogren Syndrome", status: "Available" },
      { id: "rib-fractures", name: "Rib Fractures", status: "Available" }
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
      { id: "postpartum-psychosis", name: "Postpartum Psychosis", status: "Available" },
      { id: "vaginal-hematoma", name: "Vaginal Hematoma", status: "Available" },
      { id: "fetal-oxygenation-pushing", name: "Fetal Oxygenation During Pushing with Variable Decels", status: "Available" }
    ]
  },
  {
    id: "womens-health-rn",
    title: "Women's Health & Reproductive",
    icon: Users,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    diseases: [
      { id: "endometriosis", name: "Endometriosis", status: "Available" },
      { id: "polycystic-ovary-syndrome", name: "Polycystic Ovary Syndrome (PCOS)", status: "Available" },
      { id: "ovarian-cysts", name: "Ovarian Cysts", status: "Available" },
      { id: "uterine-fibroids", name: "Uterine Fibroids (Leiomyomas)", status: "Available" },
      { id: "cervical-cancer", name: "Cervical Cancer", status: "Available" },
      { id: "ovarian-cancer", name: "Ovarian Cancer", status: "Available" },
      { id: "pelvic-inflammatory-disease", name: "Pelvic Inflammatory Disease", status: "Available" },
      { id: "delayed-puberty", name: "Delayed Puberty", status: "Available" },
      { id: "precocious-puberty", name: "Precocious Puberty", status: "Available" },
      { id: "dysmenorrhea", name: "Dysmenorrhea", status: "Available" },
      { id: "abnormal-uterine-bleeding", name: "Abnormal Uterine Bleeding", status: "Available" },
      { id: "vaginitis", name: "Vaginitis", status: "Available" },
      { id: "bacterial-vaginosis", name: "Bacterial Vaginosis", status: "Available" },
      { id: "cervicitis", name: "Cervicitis", status: "Available" },
      { id: "vulvodynia", name: "Vulvodynia", status: "Available" },
      { id: "bartholinitis", name: "Bartholinitis", status: "Available" },
      { id: "uterine-prolapse", name: "Uterine Prolapse", status: "Available" },
      { id: "benign-ovarian-cysts", name: "Benign Ovarian Cysts", status: "Available" },
      { id: "endometrial-polyp", name: "Endometrial Polyp", status: "Available" }
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
      { id: "tonsillectomy", name: "Tonsillectomy", status: "Available" },
      { id: "separation-anxiety-rn", name: "Separation Anxiety Disorder", status: "Available" },
      { id: "androgen-insensitivity", name: "Androgen Insensitivity Syndrome", status: "Available" },
      { id: "pavlik-harness", name: "Pavlik Harness: DDH Treatment", status: "Available" }
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
      { id: "chlamydia", name: "Chlamydia", status: "Available" },
      { id: "oral-candidiasis-rn", name: "Oral Candidiasis (Thrush)", status: "Available" }
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
      { id: "shock-syndromes-np", name: "Shock: Hemodynamic Monitoring", status: "Available" },
      { id: "afib-management-np", name: "Atrial Fibrillation: Rate vs Rhythm Control", status: "Available" },
      { id: "hypertensive-emergency-np", name: "Hypertensive Emergency: End-Organ Damage", status: "Available" },
      { id: "acs-management-np", name: "Acute Coronary Syndrome: Risk Stratification", status: "Available" },
      { id: "cardiac-arrest-acls-np", name: "Cardiac Arrest: ACLS Algorithms", status: "Available" },
      { id: "hfpef-np", name: "Heart Failure with Preserved EF", status: "Available" },
      { id: "valvular-disease-np", name: "Valvular Disease: Stenosis & Regurgitation", status: "Available" },
      { id: "pvd-advanced-np", name: "Peripheral Vascular Disease: Advanced Mgmt", status: "Available" },
      { id: "vte-prophylaxis-np", name: "Venous Thromboembolism Prophylaxis", status: "Available" },
      { id: "brugada-syndrome-np", name: "Brugada Syndrome: ECG Patterns & Risk Stratification", status: "Available" },
      { id: "long-qt-syndrome-np", name: "Long QT Syndrome: Genetics & Torsades de Pointes", status: "Available" },
      { id: "takotsubo-cardiomyopathy-np", name: "Takotsubo Cardiomyopathy: Stress-Induced", status: "Available" },
      { id: "infective-endocarditis-advanced-np", name: "Infective Endocarditis: Duke Criteria & Surgical Indications", status: "Available" },
      { id: "marfan-cardiac-np", name: "Marfan Syndrome Cardiac: Aortic Root & Valve Management", status: "Available" },
      { id: "constrictive-pericarditis-np", name: "Constrictive Pericarditis: Differentiation & Management", status: "Available" },
      { id: "cardiac-tamponade-mgmt-np", name: "Cardiac Tamponade: Pericardiocentesis & Hemodynamics", status: "Available" },
      { id: "stemi-nstemi-algorithm-np", name: "STEMI vs NSTEMI: Diagnostic Algorithm & Intervention", status: "Available" },
      { id: "heart-transplant-rejection-np", name: "Heart Transplant Rejection: Immunosuppression & Monitoring", status: "Available" }
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
      { id: "pe-recognition-np", name: "PE: Wells Criteria & Thrombolysis", status: "Available" },
      { id: "ards-management-np", name: "ARDS: Berlin Criteria & Lung Protective Ventilation", status: "Available" },
      { id: "pneumonia-management-np", name: "Pneumonia: CAP vs HAP Management", status: "Available" },
      { id: "tb-management-np", name: "Tuberculosis: RIPE Therapy & MDR-TB", status: "Available" },
      { id: "pleural-effusion-np", name: "Pleural Effusion: Exudative vs Transudative", status: "Available" },
      { id: "pulmonary-hypertension-np", name: "Pulmonary Hypertension: WHO Classification", status: "Available" },
      { id: "lung-cancer-staging-np", name: "Lung Cancer: TNM Staging & Treatment", status: "Available" },
      { id: "respiratory-failure-np", name: "Respiratory Failure: Type I vs Type II", status: "Available" },
      { id: "bronchiectasis-management-np", name: "Bronchiectasis: Pathophysiology & Airway Clearance", status: "Available" },
      { id: "interstitial-lung-disease-np", name: "Interstitial Lung Disease: Classification & Treatment", status: "Available" },
      { id: "sarcoidosis-pulmonary-np", name: "Sarcoidosis Pulmonary: Staging & Corticosteroid Therapy", status: "Available" },
      { id: "occupational-lung-disease-np", name: "Occupational Lung Disease: Asbestosis & Silicosis", status: "Available" },
      { id: "ventilator-associated-pneumonia-np", name: "Ventilator-Associated Pneumonia: Prevention & Treatment", status: "Available" },
      { id: "tracheobronchial-injury-np", name: "Tracheobronchial Injury: Diagnosis & Surgical Management", status: "Available" },
      { id: "hemothorax-management-np", name: "Hemothorax: Chest Tube & Surgical Intervention", status: "Available" }
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
      { id: "seizure-safety-np", name: "Status Epilepticus: Refractory Mgmt", status: "Available" },
      { id: "tbi-management-np", name: "TBI: Classification & Neuroprotection", status: "Available" },
      { id: "sah-management-np", name: "Subarachnoid Hemorrhage: Hunt-Hess & Vasospasm", status: "Available" },
      { id: "sci-management-np", name: "Spinal Cord Injury: ASIA Classification", status: "Available" },
      { id: "multiple-sclerosis-np", name: "Multiple Sclerosis: DMT & Relapse Management", status: "Available" },
      { id: "als-management-np", name: "ALS: Disease Progression & Supportive Care", status: "Available" },
      { id: "parkinsons-advanced-np", name: "Parkinson's: Dopaminergic Pharmacology", status: "Available" },
      { id: "dementia-management-np", name: "Dementia: Differential & Cholinesterase Inhibitors", status: "Available" },
      { id: "headache-management-np", name: "Headache: Primary vs Secondary Differential", status: "Available" },
      { id: "myasthenia-gravis-crisis-np", name: "Myasthenia Gravis Crisis: Plasmapheresis & IVIG", status: "Available" },
      { id: "huntington-disease-np", name: "Huntington Disease: Genetic Counseling & Management", status: "Available" },
      { id: "normal-pressure-hydrocephalus-np", name: "Normal Pressure Hydrocephalus: Triad & VP Shunt", status: "Available" },
      { id: "central-pontine-myelinolysis-np", name: "Central Pontine Myelinolysis: Osmotic Demyelination", status: "Available" },
      { id: "pres-np", name: "Posterior Reversible Encephalopathy (PRES): Imaging & Management", status: "Available" },
      { id: "cavernous-sinus-thrombosis-np", name: "Cavernous Sinus Thrombosis: Diagnosis & Anticoagulation", status: "Available" },
      { id: "cerebral-venous-sinus-thrombosis-np", name: "Cerebral Venous Sinus Thrombosis: Risk Factors & Treatment", status: "Available" },
      { id: "brown-sequard-syndrome-np", name: "Brown-Séquard Syndrome: Hemisection Patterns", status: "Available" },
      { id: "locked-in-syndrome-np", name: "Locked-In Syndrome: Assessment & Communication", status: "Available" }
    ]
  },
  {
    id: "endocrine-np",
    title: "Endocrine & Metabolic",
    icon: Thermometer,
    color: "text-rose-700",
    bgColor: "bg-rose-50",
    diseases: [
      { id: "dka-hhns-np", name: "DKA/HHS: Anion Gap & Osmolality", status: "Available" },
      { id: "siadh-di-np", name: "Sodium Disorders: Osmoregulation", status: "Available" },
      { id: "thyroid-storm-np", name: "Thyroid Storm: Receptor Blockade", status: "Available" },
      { id: "adrenal-crisis-np", name: "Adrenal Crisis: Acute Management & Steroid Replacement", status: "Available" },
      { id: "cushing-syndrome-np", name: "Cushing Syndrome: Diagnosis & Etiology", status: "Available" },
      { id: "hyperaldosteronism-np", name: "Hyperaldosteronism: Conn Syndrome & Screening", status: "Available" },
      { id: "pheochromocytoma-np", name: "Pheochromocytoma: Catecholamine Crisis", status: "Available" },
      { id: "hypercalcemia-malignancy-np", name: "Hypercalcemia of Malignancy: PTHrP & Bisphosphonates", status: "Available" },
      { id: "hyponatremia-correction-np", name: "Hyponatremia: Osmotic Demyelination Prevention", status: "Available" },
      { id: "men-syndromes-np", name: "MEN Syndromes: Type 1, 2A & 2B Classification", status: "Available" },
      { id: "carcinoid-syndrome-np", name: "Carcinoid Syndrome: Serotonin & 5-HIAA", status: "Available" },
      { id: "insulinoma-np", name: "Insulinoma: Whipple Triad & Surgical Management", status: "Available" },
      { id: "conn-syndrome-np", name: "Conn Syndrome: Primary Aldosteronism & ARR", status: "Available" },
      { id: "myxedema-coma-np", name: "Myxedema Coma: Emergency Thyroid Replacement", status: "Available" },
      { id: "androgen-insensitivity-np", name: "Androgen Insensitivity Syndrome: AR Gene & DSD", status: "Available" },
      { id: "diabetes-pregnancy-np", name: "Diabetes Management in Pregnancy: Glycemic Targets", status: "Available" }
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
      { id: "electrolyte-safety-np", name: "Advanced Electrolyte Correction", status: "Available" },
      { id: "ckd-staging-np", name: "CKD: KDIGO Staging & Progression Management", status: "Available" },
      { id: "nephrotic-syndrome-np", name: "Nephrotic Syndrome: Proteinuria & Complications", status: "Available" },
      { id: "renal-replacement-np", name: "Renal Replacement Therapy: HD vs CRRT vs PD", status: "Available" },
      { id: "contrast-nephropathy-np", name: "Contrast Nephropathy: Prevention Strategies", status: "Available" },
      { id: "hyperkalemia-emergency-np", name: "Hyperkalemia Emergency: ECG Changes & Treatment", status: "Available" },
      { id: "acute-glomerulonephritis-np", name: "Acute Glomerulonephritis: Immunopathology & Biopsy", status: "Available" }
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
      { id: "tumor-lysis-np", name: "Tumor Lysis Syndrome: Uric Acid Crisis", status: "Available" },
      { id: "hit-np", name: "Heparin-Induced Thrombocytopenia (HIT): 4T Score & Argatroban", status: "Available" },
      { id: "ttp-np", name: "Thrombotic Thrombocytopenic Purpura (TTP): ADAMTS13 & Plasmapheresis", status: "Available" },
      { id: "hus-np", name: "Hemolytic Uremic Syndrome (HUS): Shiga Toxin & Eculizumab", status: "Available" },
      { id: "hellp-vs-ttp-np", name: "HELLP vs TTP Differentiation: Diagnostic Algorithm", status: "Available" },
      { id: "myelodysplastic-syndromes-np", name: "Myelodysplastic Syndromes: Classification & Transformation", status: "Available" },
      { id: "antiphospholipid-syndrome-np", name: "Antiphospholipid Syndrome: Thrombosis & Pregnancy Loss", status: "Available" },
      { id: "factor-v-leiden-np", name: "Factor V Leiden: Thrombophilia Screening & Management", status: "Available" }
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
      { id: "obstetric-hemorrhage-np", name: "Obstetric Hemorrhage: Massive Transfusion", status: "Available" },
      { id: "uterine-rupture-np", name: "Uterine Rupture: Risk Factors & Emergency Management", status: "Available" },
      { id: "cervical-insufficiency-np", name: "Cervical Insufficiency: Cerclage & Progesterone", status: "Available" },
      { id: "chorioamnionitis-np", name: "Chorioamnionitis: Intra-Amniotic Infection & Antibiotics", status: "Available" },
      { id: "vbac-management-np", name: "VBAC Management: Risk Stratification & Monitoring", status: "Available" },
      { id: "twin-to-twin-transfusion-np", name: "Twin-to-Twin Transfusion Syndrome: Staging & Laser Therapy", status: "Available" },
      { id: "cord-prolapse-management-np", name: "Cord Prolapse Management: Emergency Delivery", status: "Available" },
      { id: "dic-obstetrics-np", name: "DIC in Obstetrics: Etiology & Coagulation Replacement", status: "Available" },
      { id: "vaginal-hematoma-np", name: "Vaginal Hematoma: Surgical Management & Embolization", status: "Available" }
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
      { id: "cytokine-cascade-np", name: "Cytokine Cascade and SIRS", status: "Available" },
      { id: "anaphylaxis-advanced-np", name: "Anaphylaxis Advanced: Biphasic Reactions & Epinephrine Protocols", status: "Available" },
      { id: "angioedema-np", name: "Angioedema: ACE Inhibitor & Histamine-Mediated", status: "Available" },
      { id: "hereditary-angioedema-np", name: "Hereditary Angioedema: C1 Esterase Inhibitor Deficiency", status: "Available" },
      { id: "mast-cell-activation-np", name: "Mast Cell Activation Syndrome: Tryptase & Management", status: "Available" },
      { id: "drug-hypersensitivity-np", name: "Drug Hypersensitivity Reactions: Gell-Coombs Classification", status: "Available" },
      { id: "serum-sickness-np", name: "Serum Sickness: Type III Hypersensitivity & Management", status: "Available" },
      { id: "graft-vs-host-disease-np", name: "Graft-Versus-Host Disease: Acute & Chronic Staging", status: "Available" }
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
      { id: "thrombolytics-np", name: "Thrombolytics: Fibrinolytic Pathway", status: "Available" },
      { id: "methotrexate-safety-np", name: "Methotrexate: Molecular Pharmacology & Pharmacogenomics", status: "Available" }
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
      { id: "spinal-cord-injury-np", name: "Spinal Cord Injury: Autonomic Dysreflexia", status: "Available" },
      { id: "rib-fractures-np", name: "Rib Fractures: Flail Chest & Regional Analgesia", status: "Available" }
    ]
  },
  {
    id: "gi-hepatology-np",
    title: "GI & Hepatology",
    icon: Droplets,
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    diseases: [
      { id: "cirrhosis-management-np", name: "Cirrhosis: Child-Pugh & MELD Scoring", status: "Available" },
      { id: "hepatic-encephalopathy-np", name: "Hepatic Encephalopathy: Ammonia & Lactulose", status: "Available" },
      { id: "gi-bleed-management-np", name: "GI Bleed: Upper vs Lower & Resuscitation", status: "Available" },
      { id: "ibd-advanced-np", name: "IBD: Crohn's vs UC Advanced Management", status: "Available" },
      { id: "acute-abdomen-np", name: "Acute Abdomen: Differential Diagnosis", status: "Available" },
      { id: "pancreatitis-advanced-np", name: "Pancreatitis: Ranson Criteria & Necrotizing", status: "Available" },
      { id: "cholangitis-np", name: "Cholangitis: Charcot & Reynolds Pentad", status: "Available" },
      { id: "hepatorenal-syndrome-np", name: "Hepatorenal Syndrome: Pathophysiology & Terlipressin", status: "Available" },
      { id: "portal-hypertension-np", name: "Portal Hypertension: Varices & Beta-Blockers", status: "Available" },
      { id: "tips-procedure-np", name: "TIPS Procedure: Indications & Complications", status: "Available" },
      { id: "cholecystectomy-np", name: "Cholecystectomy: Bile Duct Injury & Postcholecystectomy Syndrome", status: "Available" }
    ]
  },
  {
    id: "dermatology-np",
    title: "Dermatology",
    icon: Eye,
    color: "text-pink-700",
    bgColor: "bg-pink-50",
    diseases: [
      { id: "melanoma-staging-np", name: "Melanoma: Breslow Depth & Staging", status: "Available" },
      { id: "psoriasis-advanced-np", name: "Psoriasis: Biologics & Systemic Therapy", status: "Available" },
      { id: "drug-eruptions-np", name: "Drug Eruptions: Morbilliform & Fixed Drug", status: "Available" },
      { id: "sjs-np", name: "Stevens-Johnson Syndrome: SCORTEN & Management", status: "Available" },
      { id: "wound-healing-molecular-np", name: "Wound Healing: Molecular & Growth Factors", status: "Available" },
      { id: "necrotizing-fasciitis-np", name: "Necrotizing Fasciitis: LRINEC Score & Surgical Mgmt", status: "Available" },
      { id: "ten-np", name: "Toxic Epidermal Necrolysis: ICU Management", status: "Available" }
    ]
  },
  {
    id: "psychiatry-np",
    title: "Psychiatry & Mental Health",
    icon: Brain,
    color: "text-violet-700",
    bgColor: "bg-violet-50",
    diseases: [
      { id: "psychopharmacology-advanced-np", name: "Psychopharmacology: Receptor Binding & Selection", status: "Available" },
      { id: "mood-stabilizers-moa-np", name: "Mood Stabilizers: MOA & Monitoring", status: "Available" },
      { id: "antipsychotic-profiles-np", name: "Antipsychotic Receptor Profiles: Typical vs Atypical", status: "Available" },
      { id: "benzodiazepine-pharmacology-np", name: "Benzodiazepine Pharmacology: GABA & Dependence", status: "Available" },
      { id: "serotonin-syndrome-advanced-np", name: "Serotonin Syndrome: Hunter Criteria & Management", status: "Available" },
      { id: "nms-advanced-np", name: "Neuroleptic Malignant Syndrome: Dantrolene Protocol", status: "Available" },
      { id: "ect-np", name: "ECT: Indications, Mechanism & Monitoring", status: "Available" },
      { id: "sud-advanced-np", name: "Substance Use Disorders: Advanced Pharmacotherapy", status: "Available" },
      { id: "oud-mat-np", name: "Opioid Use Disorder: MAT & Buprenorphine Prescribing", status: "Available" },
      { id: "separation-anxiety-np", name: "Separation Anxiety: Neurodevelopmental & Pharmacogenomics", status: "Available" }
    ]
  },
  {
    id: "womens-health-np",
    title: "Women's Health & Gynecology",
    icon: Users,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    diseases: [
      { id: "pcos-management-np", name: "PCOS: Diagnosis & Metabolic Management", status: "Available" },
      { id: "endometriosis-np", name: "Endometriosis: Staging & Hormonal Therapy", status: "Available" },
      { id: "ovarian-torsion-np", name: "Ovarian Torsion: Diagnosis & Surgical Emergency", status: "Available" },
      { id: "ectopic-pregnancy-np", name: "Ectopic Pregnancy: Methotrexate vs Surgical", status: "Available" },
      { id: "cervical-cancer-screening-np", name: "Cervical Cancer Screening: Guidelines & Colposcopy", status: "Available" },
      { id: "hrt-prescribing-np", name: "HRT Prescribing: Risks, Benefits & Monitoring", status: "Available" },
      { id: "aub-np", name: "Abnormal Uterine Bleeding: PALM-COEIN Classification", status: "Available" },
      { id: "pid-np", name: "Pelvic Inflammatory Disease: Empiric Treatment", status: "Available" },
      { id: "delayed-puberty-np", name: "Delayed Puberty: KNDy Neurons & Hormonal Replacement", status: "Available" },
      { id: "precocious-puberty-np", name: "Precocious Puberty: GnRH Agonist Protocols", status: "Available" },
      { id: "dysmenorrhea-np", name: "Dysmenorrhea: COX-2/Prostaglandin Pathway & IUD Management", status: "Available" },
      { id: "vaginitis-np", name: "Vaginitis: Microbiome Ecology & Resistance Patterns", status: "Available" },
      { id: "bacterial-vaginosis-np", name: "Bacterial Vaginosis: Biofilm Ecology & Recurrence", status: "Available" },
      { id: "cervicitis-np", name: "Cervicitis: Pathogen Lifecycle & Empiric Treatment", status: "Available" },
      { id: "vulvodynia-np", name: "Vulvodynia: Neuropathic Pain & Multimodal Management", status: "Available" },
      { id: "bartholinitis-np", name: "Bartholinitis: Abscess Algorithm & Surgical Options", status: "Available" },
      { id: "uterine-prolapse-np", name: "Uterine Prolapse: POP-Q & Surgical Repair", status: "Available" },
      { id: "benign-ovarian-cysts-np", name: "Benign Ovarian Cysts: IOTA Rules & RMI Scoring", status: "Available" },
      { id: "endometrial-polyp-np", name: "Endometrial Polyp: Molecular Proliferation & Malignancy Risk", status: "Available" },
      { id: "priapism-np", name: "Priapism: Ischemic vs Nonischemic & Corporal Aspiration", status: "Available" },
      { id: "balanitis-np", name: "Balanitis: Etiology & Treatment Algorithms", status: "Available" },
      { id: "penile-cancer-np", name: "Penile Cancer: Staging & Surgical Management", status: "Available" },
      { id: "cryptorchidism-np", name: "Cryptorchidism: GnRH Axis & Orchiopexy Timing", status: "Available" },
      { id: "orchitis-np", name: "Orchitis: Viral vs Bacterial & Fertility Implications", status: "Available" },
      { id: "prostatitis-np", name: "Prostatitis: NIH Classification & Targeted Therapy", status: "Available" }
    ]
  },
  {
    id: "family-medicine-np",
    title: "Family Medicine Primary Care",
    icon: Stethoscope,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    diseases: [
      { id: "htn-guidelines-np", name: "Hypertension: JNC/ACC-AHA Guidelines & Stepped Therapy", status: "Available" },
      { id: "dm2-management-np", name: "Diabetes Type 2: ADA Guidelines & SGLT2/GLP-1", status: "Available" },
      { id: "lipid-management-np", name: "Lipid Management: Statin Intensity & Risk Calculators", status: "Available" },
      { id: "obesity-medicine-np", name: "Obesity Medicine: Pharmacotherapy & Metabolic Surgery", status: "Available" },
      { id: "chronic-pain-mgmt-np", name: "Chronic Pain Management: Multimodal Approach", status: "Available" },
      { id: "headache-differential-np", name: "Headache Differential: Red Flags & Triptans", status: "Available" },
      { id: "low-back-pain-np", name: "Low Back Pain: Evidence-Based Evaluation", status: "Available" },
      { id: "gerd-management-np", name: "GERD Management: PPI Stewardship & Complications", status: "Available" },
      { id: "asthma-outpatient-np", name: "Asthma Management: Stepwise Outpatient Therapy", status: "Available" },
      { id: "copd-outpatient-np", name: "COPD Management: GOLD Guidelines & Inhalers", status: "Available" },
      { id: "uti-management-np", name: "UTI Management: Uncomplicated vs Complicated", status: "Available" },
      { id: "sinusitis-management-np", name: "Sinusitis: Bacterial vs Viral & Antibiotic Criteria", status: "Available" },
      { id: "otitis-media-management-np", name: "Otitis Media: Watchful Waiting vs Antibiotics", status: "Available" }
    ]
  },
  {
    id: "palliative-ethics-np",
    title: "Palliative & Ethics",
    icon: HeartHandshake,
    color: "text-slate-700",
    bgColor: "bg-slate-50",
    diseases: [
      { id: "advance-care-planning-np", name: "Advance Care Planning: Goals of Care Conversations", status: "Available" },
      { id: "ethics-np-practice-np", name: "Ethics in NP Practice: Autonomy & Beneficence", status: "Available" },
      { id: "informed-consent-advanced-np", name: "Informed Consent: Capacity & Shared Decision-Making", status: "Available" },
      { id: "eol-pharmacology-np", name: "End-of-Life Pharmacology: Symptom Management", status: "Available" },
      { id: "palliative-sedation-np", name: "Palliative Sedation: Indications & Protocols", status: "Available" },
      { id: "prognostication-np", name: "Prognostication: Tools & Communication", status: "Available" },
      { id: "hospice-eligibility-np", name: "Hospice Eligibility: LCD Criteria & Referral", status: "Available" },
      { id: "pain-crisis-management-np", name: "Pain Crisis Management: Rapid Titration", status: "Available" }
    ]
  },
  {
    id: "infectious-disease-np",
    title: "Infectious Disease",
    icon: Bug,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    diseases: [
      { id: "antibiotic-resistance-np", name: "Antibiotic Resistance: ESBL, CRE & Stewardship", status: "Available" },
      { id: "empiric-antibiotic-np", name: "Empiric Antibiotic Selection: Site-Based Algorithms", status: "Available" },
      { id: "hiv-art-np", name: "HIV Management: ART Regimens & Resistance Testing", status: "Available" },
      { id: "tb-management-advanced-np", name: "TB Management: LTBI, Active TB & DOT", status: "Available" },
      { id: "septic-arthritis-np", name: "Septic Arthritis: Joint Aspiration & Treatment", status: "Available" },
      { id: "osteomyelitis-np", name: "Osteomyelitis: Acute vs Chronic Management", status: "Available" },
      { id: "meningitis-management-np", name: "Meningitis: Empiric Coverage & Dexamethasone", status: "Available" },
      { id: "lyme-disease-np", name: "Lyme Disease: Staging & Doxycycline Protocols", status: "Available" },
      { id: "sti-management-np", name: "STI Management: Syndromic & Expedited Partner Therapy", status: "Available" },
      { id: "oral-candidiasis-np", name: "Oral Candidiasis: Azole Resistance & Systemic Candidiasis", status: "Available" }
    ]
  },
  {
    id: "trauma-emergency-np",
    title: "Trauma & Emergency",
    icon: Activity,
    color: "text-red-600",
    bgColor: "bg-red-50",
    diseases: [
      { id: "trauma-atls-np", name: "Trauma Assessment: ATLS Primary & Secondary Survey", status: "Available" },
      { id: "massive-transfusion-np", name: "Massive Transfusion Protocol: 1:1:1 Ratio", status: "Available" },
      { id: "damage-control-resus-np", name: "Damage Control Resuscitation: Permissive Hypotension", status: "Available" },
      { id: "burn-resuscitation-np", name: "Burn Resuscitation: Parkland Formula & Fluid Mgmt", status: "Available" },
      { id: "crush-injury-np", name: "Crush Injury: Rhabdomyolysis & Hyperkalemia", status: "Available" },
      { id: "blast-injury-np", name: "Blast Injury: Primary, Secondary & Tertiary", status: "Available" },
      { id: "hypothermia-management-np", name: "Hypothermia Management: Rewarming Strategies", status: "Available" },
      { id: "drowning-management-np", name: "Drowning Management: Pulmonary & Neurological Care", status: "Available" },
      { id: "acetaminophen-od-np", name: "Acetaminophen Overdose: NAC Protocol & Rumack-Matthew", status: "Available" },
      { id: "aspirin-od-np", name: "Aspirin Overdose: Alkalinization & Dialysis", status: "Available" },
      { id: "opioid-od-np", name: "Opioid Overdose: Naloxone Dosing & Monitoring", status: "Available" }
    ]
  },
  {
    id: "geriatric-medicine-np",
    title: "Geriatric Medicine",
    icon: Users,
    color: "text-stone-700",
    bgColor: "bg-stone-50",
    diseases: [
      { id: "polypharmacy-deprescribing-np", name: "Polypharmacy: Deprescribing Frameworks", status: "Available" },
      { id: "beers-criteria-np", name: "Beers Criteria: Potentially Inappropriate Medications", status: "Available" },
      { id: "delirium-dementia-advanced-np", name: "Delirium vs Dementia: Advanced Differentiation", status: "Available" },
      { id: "falls-prevention-np", name: "Falls Prevention: Evidence-Based Interventions", status: "Available" },
      { id: "pressure-injury-prevention-np", name: "Pressure Injury Prevention: Braden & Bundles", status: "Available" },
      { id: "urinary-incontinence-np", name: "Urinary Incontinence: Types & Management", status: "Available" },
      { id: "osteoporosis-advanced-np", name: "Osteoporosis: FRAX, Bisphosphonates & Denosumab", status: "Available" }
    ]
  },
  {
    id: "pain-management-np",
    title: "Pain Management",
    icon: Pill,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    diseases: [
      { id: "multimodal-analgesia-np", name: "Multimodal Analgesia: Synergistic Combinations", status: "Available" },
      { id: "regional-anesthesia-np", name: "Regional Anesthesia: Nerve Blocks & Epidural", status: "Available" },
      { id: "ketamine-infusion-np", name: "Ketamine Infusion: Sub-Anesthetic Protocols", status: "Available" },
      { id: "pca-management-np", name: "PCA Management: Programming & Safety", status: "Available" },
      { id: "neuropathic-pain-np", name: "Neuropathic Pain: Gabapentinoids & TCAs", status: "Available" },
      { id: "chronic-pain-assessment-np", name: "Chronic Pain Assessment: Functional & Psychosocial", status: "Available" },
      { id: "opioid-tapering-np", name: "Opioid Tapering: CDC Guidelines & Strategies", status: "Available" }
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
  },
  {
    id: "rheumatology-np",
    title: "Rheumatology",
    icon: Activity,
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    diseases: [
      { id: "sle-advanced-np", name: "Systemic Lupus Erythematosus Advanced", status: "Available" },
      { id: "rheumatoid-arthritis-advanced-np", name: "Rheumatoid Arthritis Advanced", status: "Available" },
      { id: "ankylosing-spondylitis-np", name: "Ankylosing Spondylitis", status: "Available" },
      { id: "polymyalgia-rheumatica-np", name: "Polymyalgia Rheumatica", status: "Available" },
      { id: "giant-cell-arteritis-np", name: "Giant Cell Arteritis", status: "Available" },
      { id: "granulomatosis-polyangiitis-np", name: "Granulomatosis with Polyangiitis (GPA)", status: "Available" },
      { id: "polyarteritis-nodosa-np", name: "Polyarteritis Nodosa", status: "Available" },
      { id: "behcet-disease-np", name: "Behcet Disease", status: "Available" },
      { id: "scleroderma-systemic-sclerosis-np", name: "Scleroderma/Systemic Sclerosis", status: "Available" },
      { id: "dermatomyositis-polymyositis-np", name: "Dermatomyositis/Polymyositis", status: "Available" },
      { id: "reactive-arthritis-np", name: "Reactive Arthritis", status: "Available" },
      { id: "gout-advanced-management-np", name: "Gout Advanced Management", status: "Available" },
      { id: "pseudogout-cppd-np", name: "Pseudogout/CPPD", status: "Available" },
      { id: "sjogren-syndrome-advanced-np", name: "Sjogren Syndrome Advanced", status: "Available" },
      { id: "vasculitis-classification-np", name: "Vasculitis Classification", status: "Available" }
    ]
  },
  {
    id: "toxicology-np",
    title: "Toxicology",
    icon: Beaker,
    color: "text-lime-700",
    bgColor: "bg-lime-50",
    diseases: [
      { id: "organophosphate-poisoning-np", name: "Organophosphate Poisoning", status: "Available" },
      { id: "carbon-monoxide-poisoning-np", name: "Carbon Monoxide Poisoning", status: "Available" },
      { id: "cyanide-poisoning-np", name: "Cyanide Poisoning", status: "Available" },
      { id: "methanol-ethylene-glycol-poisoning-np", name: "Methanol/Ethylene Glycol Poisoning", status: "Available" },
      { id: "iron-poisoning-np", name: "Iron Poisoning", status: "Available" },
      { id: "digoxin-toxicity-np", name: "Digoxin Toxicity", status: "Available" },
      { id: "beta-blocker-overdose-np", name: "Beta-Blocker Overdose", status: "Available" },
      { id: "calcium-channel-blocker-overdose-np", name: "Calcium Channel Blocker Overdose", status: "Available" },
      { id: "tricyclic-antidepressant-overdose-np", name: "Tricyclic Antidepressant Overdose", status: "Available" },
      { id: "lithium-toxicity-advanced-np", name: "Lithium Toxicity Advanced", status: "Available" },
      { id: "warfarin-reversal-np", name: "Warfarin Reversal", status: "Available" },
      { id: "doac-reversal-np", name: "DOAC Reversal", status: "Available" },
      { id: "snake-envenomation-np", name: "Snake Envenomation", status: "Available" },
      { id: "anticholinergic-toxidrome-np", name: "Anticholinergic Toxidrome", status: "Available" },
      { id: "sympathomimetic-toxidrome-np", name: "Sympathomimetic Toxidrome", status: "Available" },
      { id: "cholinergic-toxidrome-np", name: "Cholinergic Toxidrome", status: "Available" },
      { id: "serotonergic-toxidrome-np", name: "Serotonergic Toxidrome", status: "Available" },
      { id: "sedative-hypnotic-toxidrome-np", name: "Sedative-Hypnotic Toxidrome", status: "Available" }
    ]
  },
  {
    id: "rare-genetic-disorders-np",
    title: "Rare & Genetic Disorders",
    icon: Beaker,
    color: "text-fuchsia-700",
    bgColor: "bg-fuchsia-50",
    diseases: [
      { id: "ehlers-danlos-syndrome-np", name: "Ehlers-Danlos Syndrome", status: "Available" },
      { id: "marfan-syndrome-np", name: "Marfan Syndrome", status: "Available" },
      { id: "wilson-disease-np", name: "Wilson Disease", status: "Available" },
      { id: "hemochromatosis-np", name: "Hemochromatosis", status: "Available" },
      { id: "porphyria-np", name: "Porphyria", status: "Available" },
      { id: "amyloidosis-np", name: "Amyloidosis", status: "Available" },
      { id: "fabry-disease-np", name: "Fabry Disease", status: "Available" },
      { id: "gaucher-disease-np", name: "Gaucher Disease", status: "Available" },
      { id: "pku-adult-management-np", name: "PKU Adult Management", status: "Available" },
      { id: "cystic-fibrosis-adult-np", name: "Cystic Fibrosis Adult", status: "Available" },
      { id: "alpha-1-antitrypsin-deficiency-np", name: "Alpha-1 Antitrypsin Deficiency", status: "Available" },
      { id: "hereditary-spherocytosis-np", name: "Hereditary Spherocytosis", status: "Available" },
      { id: "g6pd-deficiency-np", name: "G6PD Deficiency", status: "Available" },
      { id: "huntington-disease-genetic-np", name: "Huntington Disease", status: "Available" },
      { id: "tuberous-sclerosis-np", name: "Tuberous Sclerosis", status: "Available" },
      { id: "neurofibromatosis-np", name: "Neurofibromatosis", status: "Available" },
      { id: "prader-willi-syndrome-np", name: "Prader-Willi Syndrome", status: "Available" },
      { id: "angelman-syndrome-np", name: "Angelman Syndrome", status: "Available" }
    ]
  },
  {
    id: "critical-care-advanced-np",
    title: "Critical Care Advanced",
    icon: Activity,
    color: "text-red-700",
    bgColor: "bg-red-50",
    diseases: [
      { id: "ecmo-management-np", name: "ECMO Management", status: "Available" },
      { id: "intra-aortic-balloon-pump-np", name: "Intra-Aortic Balloon Pump", status: "Available" },
      { id: "targeted-temperature-management-np", name: "Targeted Temperature Management", status: "Available" },
      { id: "brain-death-determination-np", name: "Brain Death Determination Criteria", status: "Available" },
      { id: "organ-donation-management-np", name: "Organ Donation Management", status: "Available" },
      { id: "prone-positioning-np", name: "Prone Positioning", status: "Available" },
      { id: "neuromuscular-blockade-monitoring-np", name: "Neuromuscular Blockade Monitoring", status: "Available" },
      { id: "crrt-np", name: "Continuous Renal Replacement Therapy (CRRT)", status: "Available" },
      { id: "plasmapheresis-indications-np", name: "Plasmapheresis Indications", status: "Available" },
      { id: "high-flow-nasal-cannula-np", name: "High-Flow Nasal Cannula", status: "Available" },
      { id: "non-invasive-ventilation-modes-np", name: "Non-Invasive Ventilation Modes", status: "Available" },
      { id: "ventilator-bundle-np", name: "Ventilator Bundle", status: "Available" },
      { id: "icu-delirium-management-np", name: "ICU Delirium Management", status: "Available" },
      { id: "icu-nutrition-np", name: "ICU Nutrition", status: "Available" },
      { id: "early-mobilization-icu-np", name: "Early Mobilization ICU", status: "Available" }
    ]
  }
];

function LecturesSection({ tier, onNavigate }: { tier: string; onNavigate: (path: string) => void }) {
  const { t } = useI18n();
  const lectures = getLecturesForTier(tier);
  if (lectures.length === 0) return null;

  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-xl bg-primary/10">
          <PlayCircle className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">{t("lessons.microLectures")}</h2>
          <p className="text-sm text-gray-500">{t("lessons.microLecturesDesc")}</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {lectures.map((lecture) => (
          <div
            key={lecture.slug}
            data-testid={`lecture-card-${lecture.slug}`}
            onClick={() => onNavigate(`/lectures/${lecture.slug}`)}
            className="flex items-center gap-4 p-4 rounded-xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all cursor-pointer group"
          >
            <div className="p-2.5 rounded-lg bg-primary/15 shrink-0">
              <PlayCircle className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="font-medium text-gray-900 block truncate">{lecture.title}</span>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{lecture.duration}</span>
                <span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{lecture.level}</span>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Lessons() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { t } = useI18n();
  const userTier = user?.tier || "free";
  const isAdmin = userTier === "admin";
  const previewTier = isAdmin ? (localStorage.getItem("nursenest-admin-preview") || null) : null;
  const effectiveTier = previewTier || userTier;
  const showAllTabs = effectiveTier === "free" || effectiveTier === "admin" || !user;

  const defaultTab = showAllTabs ? "rpn" : effectiveTier;
  const [activeTab, setActiveTab] = useState(defaultTab);

  const rpnNonPharm = rpnSystems.filter(s => !s.id.includes("pharmacology"));
  const rnNonPharm = rnSystems.filter(s => !s.id.includes("pharmacology"));
  const npNonPharm = npSystems.filter(s => !s.id.includes("pharmacology"));

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
      <SEO
        title="Clinical Lesson Library - Nursing Pathophysiology & Exam Prep by Body System"
        description="Explore 150+ structured nursing lessons organized by body system. Medical-surgical, pharmacology, maternal-newborn, mental health, critical care, and clinical prioritization content for RPN, RN, and NP students preparing for NCLEX and REX-PN."
        keywords="nursing pathophysiology lessons, body system nursing, cardiovascular nursing, respiratory nursing, neurological nursing, NCLEX study guide, nursing exam prep, clinical nursing education"
        canonicalPath="/lessons"
        ogType="website"
        structuredData={buildCatalogStructuredData(
          rpnSystems.flatMap((s) => s.diseases.map((d) => ({ id: d.id, name: d.name })))
            .concat(rnSystems.flatMap((s) => s.diseases.map((d) => ({ id: d.id, name: d.name }))))
        )}
        additionalStructuredData={[
          buildBreadcrumbStructuredData([
            { name: "Home", url: "https://www.nursenest.ca/" },
            { name: "Lessons", url: "https://www.nursenest.ca/lessons" },
          ]),
        ]}
      />
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-12 flex flex-col items-center gap-6">
          <div className="text-center w-full">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t("lessons.title")}</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t("lessons.subtitle")}</p>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList className={cn("bg-gray-100 rounded-full p-1", showAllTabs ? "grid grid-cols-4 w-full md:w-[700px]" : "grid grid-cols-2 w-full md:w-[350px]")}>
              {showAllTabs ? (
                <>
                  <TabsTrigger value="rpn" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs sm:text-sm">{t("lessons.rpn")}</TabsTrigger>
                  <TabsTrigger value="rn" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs sm:text-sm">{t("lessons.rn")}</TabsTrigger>
                  <TabsTrigger value="np" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm text-purple-700 font-bold text-xs sm:text-sm">{t("lessons.np")}</TabsTrigger>
                  <TabsTrigger value="pharmacology" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm text-indigo-700 font-semibold text-xs sm:text-sm">{t("lessons.pharmacology")}</TabsTrigger>
                </>
              ) : (
                <>
                  <TabsTrigger value={effectiveTier} className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs sm:text-sm">
                    {effectiveTier === "rpn" ? t("lessons.rpn") : effectiveTier === "rn" ? t("lessons.rn") : t("lessons.np")} {t("lessons.lessons")}
                  </TabsTrigger>
                  <TabsTrigger value="pharmacology" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm text-indigo-700 font-semibold text-xs sm:text-sm">{t("lessons.pharmacology")}</TabsTrigger>
                </>
              )}
            </TabsList>
          </Tabs>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="rpn" className="mt-0">
            <LecturesSection tier="rpn" onNavigate={setLocation} />
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {[...fundamentalsSystems, ...delegationSystems, ...clinicalScenariosSystems, ...medMathSystems, ...rpnNonPharm].map((system) => (
                <LessonSystemCard key={system.id} system={system} tier="rpn" onSelect={(id) => setLocation(`/lessons/${id}`)} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="rn" className="mt-0">
            <LecturesSection tier="rn" onNavigate={setLocation} />
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {[...fundamentalsSystems, ...delegationSystems, ...clinicalScenariosSystems, ...medMathSystems, ...rnNonPharm].map((system) => (
                <LessonSystemCard key={system.id} system={system} tier="rn" onSelect={(id) => setLocation(`/lessons/${id}`)} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="np" className="mt-0">
            <LecturesSection tier="np" onNavigate={setLocation} />
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {[...fundamentalsSystems, ...delegationSystems, ...clinicalScenariosSystems, ...medMathSystems, ...npNonPharm].map((system) => (
                <LessonSystemCard key={system.id} system={system} tier="np" onSelect={(id) => setLocation(`/lessons/${id}`)} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="pharmacology" className="mt-0">
            <div className="space-y-10">
              {(showAllTabs || effectiveTier === "rpn") && (
                <div>
                  <h2 className="text-lg font-bold text-gray-700 mb-4">{t("lessons.rpnPharmacology")}</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {rpnSystems.filter(s => s.id.includes("pharmacology")).map((system) => (
                      <LessonSystemCard key={system.id} system={system} tier="rpn" onSelect={(id) => setLocation(`/lessons/${id}`)} />
                    ))}
                  </div>
                </div>
              )}
              {(showAllTabs || effectiveTier === "rn") && (
                <div>
                  <h2 className="text-lg font-bold text-gray-700 mb-4">{t("lessons.rnPharmacology")}</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {rnSystems.filter(s => s.id.includes("pharmacology")).map((system) => (
                      <LessonSystemCard key={system.id} system={system} tier="rn" onSelect={(id) => setLocation(`/lessons/${id}`)} />
                    ))}
                  </div>
                </div>
              )}
              {(showAllTabs || effectiveTier === "np") && (
                <div>
                  <h2 className="text-lg font-bold text-gray-700 mb-4">{t("lessons.npPharmacology")}</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {npSystems.filter(s => s.id.includes("pharmacology")).map((system) => (
                      <LessonSystemCard key={system.id} system={system} tier="np" onSelect={(id) => setLocation(`/lessons/${id}`)} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <AdminEditButton />
      <Footer />
    </div>
  );
}

function DifficultyBadge({ level }: { level: DifficultyLevel }) {
  const config = difficultyConfig[level];
  const { t } = useI18n();
  const labelKeys: Record<DifficultyLevel, string> = {
    1: "difficulty.beginner",
    2: "difficulty.easy",
    3: "difficulty.moderate",
    4: "difficulty.hard",
    5: "difficulty.expert",
  };
  return (
    <span data-testid={`badge-difficulty-${level}`} className={cn("text-xs font-semibold px-2 py-0.5 rounded-full whitespace-nowrap", config.color, config.bg)}>
      {t(labelKeys[level])}
    </span>
  );
}

function LessonSystemCard({ system, onSelect, tier }: { system: any, onSelect: (id: string) => void, tier: string }) {
  const systemImg = getSystemImage(system.id);
  return (
    <Card className="border-none shadow-lg hover:shadow-xl transition-all overflow-hidden bg-white">
      {systemImg && (
        <div className={cn("relative h-36 overflow-hidden", system.bgColor)}>
          <img
            src={systemImg}
            alt={system.title}
            className="w-full h-full object-cover opacity-80"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
        </div>
      )}
      <CardHeader className={cn("flex flex-row items-center gap-4 pb-2", !systemImg && system.bgColor)}>
        <div className={cn("p-3 rounded-xl bg-white shadow-sm", system.color)}>
          <system.icon className="w-6 h-6" />
        </div>
        <CardTitle className="text-xl font-bold text-gray-900">{system.title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-3">
          {system.diseases.map((disease: any) => {
            const difficulty = getDifficulty(disease.id, tier);
            return (
              <div 
                key={disease.id}
                data-testid={`lesson-card-${disease.id}`}
                onClick={() => disease.status === "Available" && onSelect(disease.id)}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group",
                  disease.status === "Available" 
                    ? "border-primary/20 bg-primary/5 hover:bg-primary/10" 
                    : "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                )}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <BookOpen className={cn("w-5 h-5 shrink-0", disease.status === "Available" ? "text-primary" : "text-gray-400")} />
                  <span className="font-medium text-gray-900 truncate">
                    {disease.name}
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0 ml-2">
                  <DifficultyBadge level={difficulty} />
                  {disease.status === "Available" ? (
                    <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                  ) : (
                    <Lock className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
