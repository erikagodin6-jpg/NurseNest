import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { AdminEditButton } from "@/components/admin-edit-button";
import { useI18n } from "@/lib/i18n";
import { getLessonTitle, loadTranslationLanguage, isTranslationLoaded } from "@/lib/getI18n";
import { Footer } from "@/components/footer";
import { LocaleLink } from "@/lib/LocaleLink";
import { buildBreadcrumbStructuredData, buildCatalogStructuredData } from "@/lib/structured-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getLecturesForTier, type LectureMetadata } from "@/data/micro-lectures";
import { AdminImageOverlay, useSiteImages } from "@/components/admin-image-overlay";
import { useToast } from "@/hooks/use-toast";
import { LessonLibraryHero } from "@/components/lesson-library-hero";
import { FeaturedTopics } from "@/components/featured-topics";
import { LessonProgressCard } from "@/components/lesson-progress-card";
import { LessonLibraryCTA } from "@/components/lesson-library-cta";
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
  Calculator,
  GraduationCap,
  Microscope,
  FlaskConical,
  BarChart3,
  Database,
  Trophy,
  Lightbulb,
  Search,
  FileText,
  Syringe,
  ClipboardList,
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  Save,
  Loader2,
  Dna,
  Layers,
  Sparkles,
  CheckCircle2,
  XCircle,
  MinusCircle,
  ArrowRight,
} from "lucide-react";

import { type DifficultyLevel, difficultyConfig, getDifficulty } from "@/lib/difficulty";
import { useAuth } from "@/lib/auth";
import { getSystemImage, getSystemPreviewImage } from "@/lib/system-images";

export const fundamentalsSystems = [
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

export const delegationSystems = [
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

export const clinicalScenariosSystems = [
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

export const medMathSystems = [
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

export const preNursingSystems = [
  {
    id: "pre-nursing-foundations",
    title: "Pre-Nursing Foundations",
    icon: GraduationCap,
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    diseases: [
      { id: "pre-nursing-science", name: "Science Foundations: Biology, Chemistry & Physics for Nursing", status: "Available" },
      { id: "pre-nursing-anatomy", name: "Anatomy & Physiology: Structure, Function & Body Systems", status: "Available" },
      { id: "pre-nursing-research", name: "Research & Statistics: Evidence-Based Nursing Practice", status: "Available" },
      { id: "pre-nursing-terminology", name: "Medical Terminology: Roots, Prefixes & Suffixes", status: "Available" },
      { id: "pre-nursing-chemistry", name: "Chemistry for Health Sciences: Atoms, Bonds & pH", status: "Available" },
      { id: "pre-nursing-microbiology", name: "Microbiology Foundations: Bacteria, Viruses & Fungi", status: "Available" },
      { id: "pre-nursing-infection-control", name: "Infection Control: Chain of Infection & PPE", status: "Available" },
      { id: "pre-nursing-fluids", name: "Fluids & Electrolytes Foundations", status: "Available" },
      { id: "pre-nursing-communication", name: "Healthcare Communication: SBAR & Documentation", status: "Available" },
      { id: "pre-nursing-ethics", name: "Ethics & Legal Foundations: Bioethics & Patient Rights", status: "Available" },
      { id: "pre-nursing-study", name: "Study & Cognitive Strategies for Nursing School", status: "Available" },
    ]
  }
];

export const rpnSystems = [
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
      { id: "chest-pain-differential-rpn", name: "Chest Pain Differentials: Cardiac vs Non-Cardiac", status: "Available" },
      { id: "aaa-rupture-rpn", name: "AAA Rupture: Recognition & Emergency Response", status: "Available" },
      { id: "mi-management-rpn", name: "MI Management: RPN Scope & Monitoring", status: "Available" },
      { id: "acute-pericarditis-rpn", name: "Acute Pericarditis", status: "Available" },
      { id: "constrictive-pericarditis-rpn", name: "Constrictive Pericarditis", status: "Available" },
      { id: "viral-myocarditis-rpn", name: "Viral Myocarditis", status: "Available" }
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
      { id: "rhonchi-rpn", name: "Rhonchi: Assessment & Clinical Significance", status: "Available" },
      { id: "asbestosis-rpn", name: "Asbestosis", status: "Available" },
      { id: "acute-silicosis-rpn", name: "Acute Silicosis", status: "Available" },
      { id: "black-lung-disease-rpn", name: "Black Lung Disease (Coal Workers' Pneumoconiosis)", status: "Available" },
      { id: "hypoventilation-syndromes-rpn", name: "Hypoventilation Syndromes", status: "Available" }
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
      { id: "febrile-seizure", name: "Febrile Seizures", status: "Available" },
      { id: "wernicke-encephalopathy-rpn", name: "Wernicke Encephalopathy", status: "Available" },
      { id: "korsakoff-syndrome-rpn", name: "Korsakoff Syndrome", status: "Available" },
      { id: "tardive-dyskinesia-rpn", name: "Tardive Dyskinesia", status: "Available" },
      { id: "acute-dystonic-reaction-rpn", name: "Acute Dystonic Reaction", status: "Available" },
      { id: "syringomyelia-rpn", name: "Syringomyelia", status: "Available" }
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
      { id: "cholecystitis-rpn", name: "Cholecystitis: Recognition & Monitoring", status: "Available" },
      { id: "appendicitis-rpn", name: "Appendicitis: Assessment & Pre-Op Care", status: "Available" },
      { id: "bowel-obstruction-rpn", name: "Bowel Obstruction: Assessment & Nursing Care", status: "Available" },
      { id: "cholecystectomy-rpn", name: "Cholecystectomy", status: "Available" },
      { id: "achalasia-rpn", name: "Achalasia", status: "Available" },
      { id: "esophageal-stricture-rpn", name: "Esophageal Stricture", status: "Available" },
      { id: "barrett-esophagus-rpn", name: "Barrett Esophagus", status: "Available" },
      { id: "ischemic-colitis-rpn", name: "Ischemic Colitis", status: "Available" },
      { id: "microscopic-colitis-rpn", name: "Microscopic Colitis", status: "Available" },
      { id: "short-bowel-syndrome-rpn", name: "Short Bowel Syndrome", status: "Available" },
      { id: "pancreatic-pseudocyst-rpn", name: "Pancreatic Pseudocyst", status: "Available" },
      { id: "eosinophilic-esophagitis-rpn", name: "Eosinophilic Esophagitis", status: "Available" },
      { id: "meckel-diverticulum-rpn", name: "Meckel Diverticulum", status: "Available" },
      { id: "sucralfate-rpn", name: "Sucralfate", status: "Available" },
      { id: "ulcerative-colitis-rpn", name: "Ulcerative Colitis", status: "Available" }
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
      { id: "renal-artery-stenosis-rpn", name: "Renal Artery Stenosis", status: "Available" },
      { id: "obstructive-uropathy-rpn", name: "Obstructive Uropathy", status: "Available" },
      { id: "diabetic-nephropathy-rpn", name: "Diabetic Nephropathy", status: "Available" }
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
      { id: "hypoglycemia-vs-dka-rpn", name: "Hypoglycemia vs DKA vs HHS: Recognition & Response", status: "Available" },
      { id: "hashimoto-thyroiditis-rpn", name: "Hashimoto Thyroiditis", status: "Available" },
      { id: "subacute-thyroiditis-rpn", name: "Subacute Thyroiditis", status: "Available" },
      { id: "metabolic-syndrome-rpn", name: "Metabolic Syndrome", status: "Available" },
      { id: "pseudohypoparathyroidism-rpn", name: "Pseudohypoparathyroidism", status: "Available" },
      { id: "dka-management-rpn", name: "DKA: Recognition & Monitoring", status: "Available" },
      { id: "thyroid-storm-rpn", name: "Thyroid Storm: Emergency Recognition", status: "Available" }
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
      { id: "febrile-transfusion-rpn", name: "Febrile Nonhemolytic Transfusion Reaction", status: "Available" },
      { id: "blood-transfusion-reactions", name: "Blood Transfusion Reactions: Complete Clinical Guide", status: "Available" },
      { id: "abo-blood-type-compatibility", name: "ABO & Rh Blood Type Compatibility", status: "Available" },
      { id: "ahtr-acute-hemolytic-transfusion-reaction", name: "Acute Hemolytic Transfusion Reaction (AHTR)", status: "Available" },
      { id: "fnhtr-febrile-nonhemolytic-transfusion-reaction", name: "Febrile Non-Hemolytic Reaction (FNHTR)", status: "Available" },
      { id: "allergic-transfusion-reaction", name: "Allergic Transfusion Reaction", status: "Available" },
      { id: "anaphylactic-transfusion-reaction", name: "Anaphylactic Transfusion Reaction", status: "Available" },
      { id: "taco-transfusion-associated-circulatory-overload", name: "TACO: Circulatory Overload", status: "Available" },
      { id: "trali-transfusion-related-acute-lung-injury", name: "TRALI: Acute Lung Injury", status: "Available" },
      { id: "septic-transfusion-reaction", name: "Septic Transfusion Reaction", status: "Available" },
      { id: "hypotensive-transfusion-reaction", name: "Hypotensive Transfusion Reaction", status: "Available" },
      { id: "acute-pain-transfusion-reaction", name: "Acute Pain Transfusion Reaction", status: "Available" },
      { id: "non-immune-hemolysis-transfusion", name: "Non-Immune Hemolysis", status: "Available" },
      { id: "air-embolism-transfusion", name: "Air Embolism During Transfusion", status: "Available" },
      { id: "delayed-hemolytic-transfusion-reaction", name: "Delayed Hemolytic Reaction (DHTR)", status: "Available" },
      { id: "post-transfusion-purpura", name: "Post-Transfusion Purpura (PTP)", status: "Available" },
      { id: "ta-gvhd-transfusion-associated", name: "TA-GVHD: Graft-Versus-Host Disease", status: "Available" },
      { id: "iron-overload-transfusion-hemosiderosis", name: "Iron Overload (Hemosiderosis)", status: "Available" },
      { id: "transfusion-hyperkalemia", name: "Transfusion-Associated Hyperkalemia", status: "Available" },
      { id: "transfusion-hypocalcemia-citrate-toxicity", name: "Citrate Toxicity & Hypocalcemia", status: "Available" },
      { id: "transfusion-hypothermia", name: "Transfusion-Associated Hypothermia", status: "Available" },
      { id: "dilutional-coagulopathy-massive-transfusion", name: "Dilutional Coagulopathy", status: "Available" },
      { id: "febrile-neutropenia-basics-rpn", name: "Febrile Neutropenia Basics", status: "Available" },
      { id: "iron-deficiency-anemia-rpn", name: "Iron Deficiency Anemia: Monitoring & Administration", status: "Available" },
      { id: "sickle-cell-crisis-rpn", name: "Sickle Cell Crisis: Recognition & Support", status: "Available" }
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
      { id: "fungal-infections-overview-rpn", name: "Fungal Infections Overview", status: "Available" },
      { id: "erythema-multiforme-rpn", name: "Erythema Multiforme", status: "Available" },
      { id: "erysipelas-rpn", name: "Erysipelas", status: "Available" },
      { id: "cellulitis-standalone-rpn", name: "Cellulitis", status: "Available" },
      { id: "hidradenitis-suppurativa-rpn", name: "Hidradenitis Suppurativa", status: "Available" },
      { id: "bullous-pemphigoid-rpn", name: "Bullous Pemphigoid", status: "Available" }
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
      { id: "pavlik-harness-rpn", name: "Pavlik Harness (DDH)", status: "Available" },
      { id: "patent-ductus-arteriosus-rpn", name: "Patent Ductus Arteriosus", status: "Available" },
      { id: "intestinal-malrotation-rpn", name: "Intestinal Malrotation", status: "Available" },
      { id: "febrile-seizures-rpn", name: "Febrile Seizures: Recognition & Monitoring", status: "Available" },
      { id: "pediatric-dehydration-rpn", name: "Pediatric Dehydration: Assessment & Monitoring", status: "Available" }
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
      { id: "fetal-oxygenation-pushing-rpn", name: "Fetal Oxygenation During Pushing", status: "Available" },
      { id: "molar-pregnancy-rpn", name: "Molar Pregnancy", status: "Available" },
      { id: "ovarian-hyperstimulation-rpn", name: "Ovarian Hyperstimulation Syndrome", status: "Available" },
      { id: "toxic-shock-gynecologic-rpn", name: "Toxic Shock Syndrome (Gynecologic)", status: "Available" },
      { id: "mastitis-rpn", name: "Mastitis", status: "Available" },
      { id: "maternal-newborn-edge-rpn", name: "Maternal-Newborn Edge Cases", status: "Available" }
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
      { id: "congenital-hypothyroidism-rpn", name: "Congenital Hypothyroidism", status: "Available" },
      { id: "infant-reflexes-rpn", name: "Infant Reflexes", status: "Available" },
      { id: "meconium-ileus-rpn", name: "Meconium Ileus", status: "Available" }
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
      { id: "toxic-shock-syndrome-rpn", name: "Toxic Shock Syndrome", status: "Available" },
      { id: "cytomegalovirus-rpn", name: "Cytomegalovirus (CMV)", status: "Available" },
      { id: "ebv-complications-rpn", name: "EBV Complications", status: "Available" },
      { id: "post-polio-syndrome-rpn", name: "Post-Polio Syndrome", status: "Available" },
      { id: "histoplasmosis-basics-rpn", name: "Histoplasmosis Basics", status: "Available" },
      { id: "aspergillosis-basics-rpn", name: "Aspergillosis Basics", status: "Available" },
      { id: "rotavirus-rpn", name: "Rotavirus", status: "Available" },
      { id: "sepsis-management-rpn", name: "Sepsis: Early Recognition & Monitoring", status: "Available" },
      { id: "antibiotic-stewardship-rpn", name: "Antibiotic Stewardship: Safe Administration", status: "Available" }
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
      { id: "endometrial-polyp-rpn", name: "Endometrial Polyp", status: "Available" },
      { id: "balanitis-rpn", name: "Balanitis", status: "Available" },
      { id: "breast-cancer-rpn", name: "Breast Cancer", status: "Available" },
      { id: "cryptorchidism-rpn", name: "Cryptorchidism", status: "Available" },
      { id: "endometriosis-rpn", name: "Endometriosis", status: "Available" },
      { id: "galactorrhea-rpn", name: "Galactorrhea", status: "Available" },
      { id: "infertility-rpn", name: "Infertility", status: "Available" },
      { id: "orchitis-rpn", name: "Orchitis", status: "Available" },
      { id: "penile-cancer-rpn", name: "Penile Cancer", status: "Available" },
      { id: "phimosis-rpn", name: "Phimosis", status: "Available" },
      { id: "priapism-rpn", name: "Priapism", status: "Available" },
      { id: "prostatitis-rpn", name: "Prostatitis", status: "Available" },
      { id: "urethritis-rpn", name: "Urethritis", status: "Available" }
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
  },
  {
    id: "toxicology-rpn",
    title: "Toxicology & Environmental",
    icon: AlertCircle,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    diseases: [
      { id: "acetaminophen-toxicity-rpn", name: "Acetaminophen Toxicity", status: "Available" },
      { id: "opioid-overdose-rpn", name: "Opioid Overdose", status: "Available" },
      { id: "carbon-monoxide-poisoning-rpn", name: "Carbon Monoxide Poisoning", status: "Available" },
      { id: "heat-stroke-rpn", name: "Heat Stroke", status: "Available" },
      { id: "hypothermia-rpn", name: "Hypothermia", status: "Available" },
      { id: "anaphylaxis-basics-rpn", name: "Anaphylaxis Basics", status: "Available" }
    ]
  },
  {
    id: "critical-care-rpn",
    title: "Critical Care Basics",
    icon: Zap,
    color: "text-red-700",
    bgColor: "bg-red-50",
    diseases: [
      { id: "hypovolemic-shock-basics-rpn", name: "Hypovolemic Shock Basics", status: "Available" },
      { id: "neurogenic-shock-basics-rpn", name: "Neurogenic Shock Basics", status: "Available" },
      { id: "acute-transfusion-reaction-rpn", name: "Acute Transfusion Reaction", status: "Available" }
    ]
  },
  {
    id: "professional-practice-rpn",
    title: "Professional Practice",
    icon: BookOpen,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
    diseases: [
      { id: "cultural-safety-rpn", name: "Cultural Safety", status: "Available" },
      { id: "delegation-license-rpn", name: "Delegation by License", status: "Available" },
      { id: "informatics-doc-rpn", name: "Informatics and Documentation", status: "Available" },
      { id: "labs-diagnostics-rpn", name: "Labs and Diagnostics", status: "Available" },
      { id: "leadership-mgmt-rpn", name: "Leadership and Management", status: "Available" },
      { id: "legal-edge-rpn", name: "Legal Edge Cases", status: "Available" },
      { id: "nursing-calc-rpn", name: "Nursing Calculations", status: "Available" },
      { id: "therapeutic-comm-rpn", name: "Therapeutic Communication", status: "Available" }
    ]
  }
];

export const rnSystems = [
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
      { id: "pacemaker-care", name: "Pacemakers: Types and Nursing Care", status: "Available" },
      { id: "arrhythmogenic-rv-cardiomyopathy-rn", name: "Arrhythmogenic Right Ventricular Cardiomyopathy", status: "Available" },
      { id: "restrictive-cardiomyopathy-rn", name: "Restrictive Cardiomyopathy", status: "Available" },
      { id: "noncompaction-cardiomyopathy-rn", name: "Noncompaction Cardiomyopathy", status: "Available" },
      { id: "giant-cell-myocarditis-rn", name: "Giant Cell Myocarditis", status: "Available" },
      { id: "cardiac-sarcoidosis-rn", name: "Cardiac Sarcoidosis", status: "Available" },
      { id: "cardiac-amyloidosis-rn", name: "Cardiac Amyloidosis", status: "Available" },
      { id: "papillary-muscle-rupture-rn", name: "Papillary Muscle Rupture", status: "Available" },
      { id: "ventricular-septal-rupture-rn", name: "Ventricular Septal Rupture Post-MI", status: "Available" },
      { id: "subclavian-steal-syndrome-rn", name: "Subclavian Steal Syndrome", status: "Available" },
      { id: "vasospastic-angina-rn", name: "Vasospastic Angina (Prinzmetal)", status: "Available" },
      { id: "microvascular-angina-rn", name: "Microvascular Angina", status: "Available" },
      { id: "atrial-myxoma-rn", name: "Atrial Myxoma", status: "Available" },
      { id: "carotid-artery-dissection-rn", name: "Carotid Artery Dissection", status: "Available" },
      { id: "coronary-artery-spasm-rn", name: "Coronary Artery Spasm", status: "Available" },
      { id: "heart-failure-rn", name: "Heart Failure: RN Clinical Management", status: "Available" },
      { id: "hypertensive-cardiomyopathy-rn", name: "Hypertensive Cardiomyopathy", status: "Available" },
      { id: "lvad-thrombosis-rn", name: "LVAD Thrombosis", status: "Available" },
      { id: "ecmo-complications-rn", name: "ECMO Complications", status: "Available" },
      { id: "pots-rn", name: "Postural Orthostatic Tachycardia Syndrome (POTS)", status: "Available" },
      { id: "myocardial-bridging-rn", name: "Myocardial Bridging", status: "Available" },
      { id: "eisenmenger-syndrome-rn", name: "Eisenmenger Syndrome", status: "Available" },
      { id: "ebstein-anomaly-rn", name: "Ebstein Anomaly", status: "Available" },
      { id: "tricuspid-atresia-rn", name: "Tricuspid Atresia", status: "Available" },
      { id: "double-outlet-rv-rn", name: "Double Outlet Right Ventricle", status: "Available" },
      { id: "aortic-root-dilation-rn", name: "Aortic Root Dilation", status: "Available" },
      { id: "coronary-artery-anomalies-rn", name: "Coronary Artery Anomalies", status: "Available" },
      { id: "endocardial-fibroelastosis-rn", name: "Endocardial Fibroelastosis", status: "Available" },
      { id: "pericardial-mesothelioma-rn", name: "Pericardial Mesothelioma", status: "Available" },
      { id: "ie-embolic-stroke-rn", name: "Infective Endocarditis with Embolic Stroke", status: "Available" },
      { id: "mechanical-circulatory-support-rn", name: "Mechanical Circulatory Support Complications", status: "Available" },
      { id: "pulmonary-valve-stenosis-rn", name: "Pulmonary Valve Stenosis", status: "Available" },
      { id: "carotid-body-tumor-rn", name: "Carotid Body Tumor", status: "Available" }
    ]
  },
  {
    id: "arrhythmias-rn",
    title: "Arrhythmias & ECG",
    icon: Heart,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    diseases: [
      { id: "normal-sinus-rhythm", name: "Normal Sinus Rhythm", status: "Available" },
      { id: "sinus-bradycardia", name: "Sinus Bradycardia", status: "Available" },
      { id: "sinus-tachycardia", name: "Sinus Tachycardia", status: "Available" },
      { id: "sinus-dysrhythmia", name: "Sinus Dysrhythmia (Sinus Arrhythmia)", status: "Available" },
      { id: "sinus-arrest", name: "Sinus Arrest", status: "Available" },
      { id: "sinus-exit-block", name: "Sinus Exit Block (SA Exit Block)", status: "Available" },
      { id: "atrial-fibrillation-rn", name: "Atrial Fibrillation", status: "Available" },
      { id: "atrial-flutter-rn", name: "Atrial Flutter", status: "Available" },
      { id: "atrial-tachycardia", name: "Atrial Tachycardia", status: "Available" },
      { id: "svt-recognition", name: "Supraventricular Tachycardia", status: "Available" },
      { id: "pvc-recognition", name: "Premature Ventricular Contractions", status: "Available" },
      { id: "vtach-management", name: "Ventricular Tachycardia", status: "Available" },
      { id: "vfib-management", name: "Ventricular Fibrillation", status: "Available" },
      { id: "first-degree-av-block", name: "First-Degree AV Block", status: "Available" },
      { id: "second-degree-av-block-type-i", name: "Second-Degree AV Block Type I (Wenckebach)", status: "Available" },
      { id: "second-degree-av-block-type-ii", name: "Second-Degree AV Block Type II (Mobitz II)", status: "Available" },
      { id: "heart-block-complete", name: "Third-Degree (Complete) Heart Block", status: "Available" },
      { id: "bundle-branch-block", name: "Bundle Branch Block (BBB)", status: "Available" },
      { id: "torsades-management", name: "Torsades de Pointes", status: "Available" },
      { id: "asystole-pea", name: "Asystole & PEA", status: "Available" },
      { id: "aivr-idioventricular", name: "AIVR & Idioventricular Rhythm", status: "Available" }
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
      { id: "osa-management", name: "Obstructive Sleep Apnea", status: "Available" },
      { id: "cryptogenic-organizing-pneumonia-rn", name: "Cryptogenic Organizing Pneumonia", status: "Available" },
      { id: "bronchiolitis-obliterans-rn", name: "Bronchiolitis Obliterans", status: "Available" },
      { id: "goodpasture-syndrome-rn", name: "Goodpasture Syndrome", status: "Available" },
      { id: "pulmonary-alveolar-hemorrhage-rn", name: "Pulmonary Alveolar Hemorrhage", status: "Available" },
      { id: "acute-chest-syndrome-rn", name: "Acute Chest Syndrome", status: "Available" },
      { id: "churg-strauss-syndrome-rn", name: "Churg-Strauss Syndrome (EGPA)", status: "Available" },
      { id: "acute-radiation-pneumonitis-rn", name: "Acute Radiation Pneumonitis", status: "Available" },
      { id: "trali-resp-rn", name: "Transfusion-Related Acute Lung Injury (TRALI)", status: "Available" },
      { id: "mediastinitis-rn", name: "Mediastinitis", status: "Available" },
      { id: "plastic-bronchitis-rn", name: "Plastic Bronchitis", status: "Available" },
      { id: "eosinophilic-pneumonia-rn", name: "Eosinophilic Pneumonia", status: "Available" },
      { id: "diffuse-alveolar-hemorrhage-rn", name: "Diffuse Alveolar Hemorrhage", status: "Available" },
      { id: "pulmonary-infarction-rn", name: "Pulmonary Infarction", status: "Available" },
      { id: "pulmonary-vasculitis-rn", name: "Pulmonary Vasculitis", status: "Available" },
      { id: "ards-phenotypes-rn", name: "ARDS Phenotypes (Focal vs Diffuse)", status: "Available" },
      { id: "bronchopulmonary-dysplasia-rn", name: "Bronchopulmonary Dysplasia (Advanced)", status: "Available" },
      { id: "pulmonary-sequestration-rn", name: "Pulmonary Sequestration", status: "Available" },
      { id: "tracheomalacia-rn", name: "Tracheomalacia", status: "Available" },
      { id: "subglottic-stenosis-rn", name: "Subglottic Stenosis", status: "Available" },
      { id: "vocal-cord-paralysis-rn", name: "Vocal Cord Paralysis", status: "Available" },
      { id: "lymphangioleiomyomatosis-rn", name: "Lymphangioleiomyomatosis (LAM)", status: "Available" },
      { id: "pulmonary-langerhans-histiocytosis-rn", name: "Pulmonary Langerhans Cell Histiocytosis", status: "Available" },
      { id: "cryptococcal-pneumonia-rn", name: "Cryptococcal Pneumonia", status: "Available" },
      { id: "pjp-pneumonia-rn", name: "PJP Pneumonia (Pneumocystis)", status: "Available" },
      { id: "obesity-hypoventilation-rn", name: "Obesity Hypoventilation Syndrome", status: "Available" },
      { id: "high-altitude-pulmonary-edema-rn", name: "High Altitude Pulmonary Edema (HAPE)", status: "Available" }
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
      { id: "neuritis-neuropathy", name: "Neuritis & Peripheral Neuropathy", status: "Available" },
      { id: "posterior-circulation-stroke-rn", name: "Posterior Circulation Stroke", status: "Available" },
      { id: "lateral-medullary-syndrome-rn", name: "Lateral Medullary Syndrome (Wallenberg)", status: "Available" },
      { id: "central-pontine-myelinolysis-rn", name: "Central Pontine Myelinolysis", status: "Available" },
      { id: "anti-nmda-receptor-encephalitis-rn", name: "Anti-NMDA Receptor Encephalitis", status: "Available" },
      { id: "autoimmune-encephalitis-rn", name: "Autoimmune Encephalitis", status: "Available" },
      { id: "cerebral-venous-sinus-thrombosis-rn", name: "Cerebral Venous Sinus Thrombosis", status: "Available" },
      { id: "pituitary-apoplexy-rn", name: "Pituitary Apoplexy", status: "Available" },
      { id: "paraneoplastic-neurologic-rn", name: "Paraneoplastic Neurologic Syndromes", status: "Available" },
      { id: "acute-intermittent-porphyria-rn", name: "Acute Intermittent Porphyria", status: "Available" },
      { id: "transverse-myelitis-rn", name: "Transverse Myelitis", status: "Available" },
      { id: "cauda-equina-syndrome-rn", name: "Cauda Equina Syndrome", status: "Available" },
      { id: "gbs-miller-fisher-rn", name: "GBS Variants: Miller Fisher Syndrome", status: "Available" },
      { id: "moyamoya-disease-rn", name: "Moyamoya Disease", status: "Available" },
      { id: "brainstem-glioma-rn", name: "Brainstem Glioma", status: "Available" },
      { id: "primary-cns-lymphoma-rn", name: "Primary CNS Lymphoma", status: "Available" },
      { id: "lewy-body-dementia-rn", name: "Lewy Body Dementia", status: "Available" },
      { id: "frontotemporal-dementia-rn", name: "Frontotemporal Dementia", status: "Available" },
      { id: "progressive-supranuclear-palsy-rn", name: "Progressive Supranuclear Palsy", status: "Available" },
      { id: "huntington-disease-rn", name: "Huntington Disease", status: "Available" },
      { id: "adem-rn", name: "Acute Disseminated Encephalomyelitis (ADEM)", status: "Available" },
      { id: "brainstem-stroke-syndromes-rn", name: "Brainstem Stroke Syndromes", status: "Available" },
      { id: "central-cord-syndrome-rn", name: "Central Cord Syndrome", status: "Available" },
      { id: "brown-sequard-syndrome-rn", name: "Brown-Séquard Syndrome", status: "Available" },
      { id: "locked-in-syndrome-rn", name: "Locked-In Syndrome", status: "Available" },
      { id: "cns-vasculitis-rn", name: "CNS Vasculitis", status: "Available" },
      { id: "pres-rn", name: "Posterior Reversible Encephalopathy Syndrome (PRES)", status: "Available" },
      { id: "intracranial-hypotension-rn", name: "Intracranial Hypotension", status: "Available" },
      { id: "tuberous-sclerosis-rn", name: "Tuberous Sclerosis", status: "Available" },
      { id: "neurofibromatosis-rn", name: "Neurofibromatosis Type 1 & 2", status: "Available" },
      { id: "pituitary-adenoma-syndromes-rn", name: "Pituitary Adenoma Syndromes", status: "Available" },
      { id: "cerebral-salt-wasting-rn", name: "Cerebral Salt Wasting", status: "Available" }
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
      { id: "chronic-hepatitis", name: "Chronic Hepatitis", status: "Available" },
      { id: "cholecystitis-rn", name: "Cholecystitis: RN Protocol-Based Assessment", status: "Available" },
      { id: "appendicitis-rn", name: "Appendicitis: RN Assessment & Perioperative Care", status: "Available" },
      { id: "bowel-obstruction-rn", name: "Bowel Obstruction: RN Assessment & Management", status: "Available" },
      { id: "acute-mesenteric-ischemia-rn", name: "Acute Mesenteric Ischemia", status: "Available" },
      { id: "portal-vein-thrombosis-rn", name: "Portal Vein Thrombosis", status: "Available" },
      { id: "hepatic-encephalopathy-rn", name: "Hepatic Encephalopathy", status: "Available" },
      { id: "wilson-disease-rn", name: "Wilson Disease", status: "Available" },
      { id: "hemochromatosis-rn", name: "Hemochromatosis", status: "Available" },
      { id: "alpha1-antitrypsin-deficiency-rn", name: "Alpha-1 Antitrypsin Deficiency", status: "Available" },
      { id: "primary-biliary-cholangitis-rn", name: "Primary Biliary Cholangitis", status: "Available" },
      { id: "budd-chiari-syndrome-rn", name: "Budd-Chiari Syndrome", status: "Available" },
      { id: "fulminant-hepatitis-rn", name: "Fulminant Hepatitis", status: "Available" },
      { id: "carcinoid-syndrome-rn", name: "Carcinoid Syndrome", status: "Available" },
      { id: "zollinger-ellison-syndrome-rn", name: "Zollinger-Ellison Syndrome", status: "Available" },
      { id: "cdiff-toxic-megacolon-rn", name: "C. diff Toxic Megacolon", status: "Available" },
      { id: "hepatorenal-syndrome-rn", name: "Hepatorenal Syndrome", status: "Available" },
      { id: "hepatopulmonary-syndrome-rn", name: "Hepatopulmonary Syndrome", status: "Available" },
      { id: "aflp-rn", name: "Acute Fatty Liver of Pregnancy (AFLP)", status: "Available" },
      { id: "autoimmune-hepatitis-rn", name: "Autoimmune Hepatitis", status: "Available" },
      { id: "psc-rn", name: "Primary Sclerosing Cholangitis (PSC)", status: "Available" },
      { id: "esophageal-variceal-hemorrhage-rn", name: "Esophageal Variceal Hemorrhage", status: "Available" },
      { id: "mallory-weiss-tear-rn", name: "Mallory-Weiss Tear", status: "Available" },
      { id: "boerhaave-syndrome-rn", name: "Boerhaave Syndrome", status: "Available" },
      { id: "sma-syndrome-rn", name: "Superior Mesenteric Artery Syndrome", status: "Available" },
      { id: "whipple-disease-rn", name: "Whipple Disease", status: "Available" },
      { id: "celiac-crisis-rn", name: "Celiac Crisis", status: "Available" },
      { id: "intestinal-ischemia-rn", name: "Intestinal Ischemia", status: "Available" }
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
      { id: "acute-glomerulonephritis", name: "Acute Postinfectious Glomerulonephritis", status: "Available" },
      { id: "atn-rn", name: "Acute Tubular Necrosis (ATN)", status: "Available" },
      { id: "ain-rn", name: "Acute Interstitial Nephritis (AIN)", status: "Available" },
      { id: "membranous-nephropathy-rn", name: "Membranous Nephropathy", status: "Available" },
      { id: "fsgs-rn", name: "Focal Segmental Glomerulosclerosis (FSGS)", status: "Available" },
      { id: "minimal-change-disease-rn", name: "Minimal Change Disease", status: "Available" },
      { id: "renal-vein-thrombosis-rn", name: "Renal Vein Thrombosis", status: "Available" },
      { id: "uremic-encephalopathy-rn", name: "Uremic Encephalopathy", status: "Available" },
      { id: "uremic-pericarditis-rn", name: "Uremic Pericarditis", status: "Available" },
      { id: "hyperkalemic-periodic-paralysis-rn", name: "Hyperkalemic Periodic Paralysis", status: "Available" },
      { id: "hypokalemic-periodic-paralysis-rn", name: "Hypokalemic Periodic Paralysis", status: "Available" },
      { id: "severe-metabolic-acidosis-rn", name: "Severe Metabolic Acidosis", status: "Available" },
      { id: "mixed-acid-base-disorders-rn", name: "Mixed Acid-Base Disorders", status: "Available" },
      { id: "lactic-acidosis-rn", name: "Lactic Acidosis", status: "Available" },
      { id: "rpgn-rn", name: "Rapidly Progressive Glomerulonephritis (RPGN)", status: "Available" },
      { id: "mpgn-rn", name: "Membranoproliferative Glomerulonephritis (MPGN)", status: "Available" },
      { id: "iga-nephropathy-rn", name: "IgA Nephropathy", status: "Available" },
      { id: "lupus-nephritis-rn", name: "Lupus Nephritis", status: "Available" },
      { id: "uric-acid-nephropathy-rn", name: "Uric Acid Nephropathy", status: "Available" },
      { id: "fanconi-syndrome-rn", name: "Fanconi Syndrome", status: "Available" },
      { id: "bartter-syndrome-rn", name: "Bartter Syndrome", status: "Available" },
      { id: "gitelman-syndrome-rn", name: "Gitelman Syndrome", status: "Available" }
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
      { id: "dm-type2", name: "Diabetes Mellitus Type 2", status: "Available" },
      { id: "dka-management-rn", name: "DKA: Protocol-Based Assessment & Titration", status: "Available" },
      { id: "thyroid-storm-rn", name: "Thyroid Storm: Assessment & Emergency Protocol", status: "Available" }
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
      { id: "cervical-cancer", name: "Cervical Cancer", status: "Available" },
      { id: "apl-rn", name: "Acute Promyelocytic Leukemia (APL)", status: "Available" },
      { id: "myelofibrosis-rn", name: "Myelofibrosis", status: "Available" },
      { id: "hairy-cell-leukemia-rn", name: "Hairy Cell Leukemia", status: "Available" },
      { id: "cll-rn", name: "Chronic Lymphocytic Leukemia (CLL)", status: "Available" },
      { id: "warm-aiha-rn", name: "Warm Autoimmune Hemolytic Anemia", status: "Available" },
      { id: "cold-agglutinin-disease-rn", name: "Cold Agglutinin Disease", status: "Available" },
      { id: "pnh-rn", name: "Paroxysmal Nocturnal Hemoglobinuria (PNH)", status: "Available" },
      { id: "essential-thrombocythemia-rn", name: "Essential Thrombocythemia", status: "Available" },
      { id: "bone-marrow-failure-rn", name: "Bone Marrow Failure Syndromes", status: "Available" },
      { id: "waldenstrom-rn", name: "Waldenström Macroglobulinemia", status: "Available" },
      { id: "metastatic-bone-disease-rn", name: "Metastatic Bone Disease", status: "Available" },
      { id: "malignant-hypercalcemia-rn", name: "Malignant Hypercalcemia", status: "Available" },
      { id: "multiple-myeloma-rn", name: "Multiple Myeloma", status: "Available" },
      { id: "mds-rn", name: "Myelodysplastic Syndromes (MDS)", status: "Available" },
      { id: "ahtr-acute-hemolytic-transfusion-reaction", name: "Acute Hemolytic Transfusion Reaction (AHTR)", status: "Available" },
      { id: "fnhtr-febrile-nonhemolytic-transfusion-reaction", name: "Febrile Non-Hemolytic Reaction (FNHTR)", status: "Available" },
      { id: "allergic-transfusion-reaction", name: "Allergic Transfusion Reaction", status: "Available" },
      { id: "anaphylactic-transfusion-reaction", name: "Anaphylactic Transfusion Reaction", status: "Available" },
      { id: "taco-transfusion-associated-circulatory-overload", name: "TACO: Circulatory Overload", status: "Available" },
      { id: "trali-transfusion-related-acute-lung-injury", name: "TRALI: Acute Lung Injury", status: "Available" },
      { id: "septic-transfusion-reaction", name: "Septic Transfusion Reaction", status: "Available" },
      { id: "hypotensive-transfusion-reaction", name: "Hypotensive Transfusion Reaction", status: "Available" },
      { id: "acute-pain-transfusion-reaction", name: "Acute Pain Transfusion Reaction", status: "Available" },
      { id: "non-immune-hemolysis-transfusion", name: "Non-Immune Hemolysis", status: "Available" },
      { id: "air-embolism-transfusion", name: "Air Embolism During Transfusion", status: "Available" },
      { id: "delayed-hemolytic-transfusion-reaction", name: "Delayed Hemolytic Reaction (DHTR)", status: "Available" },
      { id: "post-transfusion-purpura", name: "Post-Transfusion Purpura (PTP)", status: "Available" },
      { id: "ta-gvhd-transfusion-associated", name: "TA-GVHD: Graft-Versus-Host Disease", status: "Available" },
      { id: "iron-overload-transfusion-hemosiderosis", name: "Iron Overload (Hemosiderosis)", status: "Available" },
      { id: "transfusion-hyperkalemia", name: "Transfusion-Associated Hyperkalemia", status: "Available" },
      { id: "transfusion-hypocalcemia-citrate-toxicity", name: "Citrate Toxicity & Hypocalcemia", status: "Available" },
      { id: "transfusion-hypothermia", name: "Transfusion-Associated Hypothermia", status: "Available" },
      { id: "dilutional-coagulopathy-massive-transfusion", name: "Dilutional Coagulopathy", status: "Available" },
      { id: "iron-deficiency-anemia-rn", name: "Iron Deficiency Anemia: RN Assessment & Management", status: "Available" },
      { id: "sickle-cell-crisis-rn", name: "Sickle Cell Crisis: Protocol-Based Management", status: "Available" }
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
      { id: "fetal-oxygenation-pushing", name: "Fetal Oxygenation During Pushing with Variable Decels", status: "Available" },
      { id: "vasa-previa-rn", name: "Vasa Previa", status: "Available" },
      { id: "gestational-trophoblastic-disease-rn", name: "Gestational Trophoblastic Disease (Advanced)", status: "Available" }
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
      { id: "pavlik-harness", name: "Pavlik Harness: DDH Treatment", status: "Available" },
      { id: "congenital-adrenal-hyperplasia-rn", name: "Congenital Adrenal Hyperplasia", status: "Available" },
      { id: "kawasaki-complications-rn", name: "Kawasaki Disease Complications", status: "Available" },
      { id: "cdh-rn", name: "Congenital Diaphragmatic Hernia (CDH)", status: "Available" },
      { id: "tof-rn", name: "Tetralogy of Fallot (TOF)", status: "Available" },
      { id: "coarctation-of-aorta-rn", name: "Coarctation of the Aorta (CoA)", status: "Available" },
      { id: "febrile-seizures-rn", name: "Febrile Seizures: RN Assessment & Management", status: "Available" },
      { id: "pediatric-dehydration-rn", name: "Pediatric Dehydration: Fluid Resuscitation Protocol", status: "Available" }
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
      { id: "blood-transfusion-reactions", name: "Blood Transfusion Reactions: Complete Clinical Guide", status: "Available" },
      { id: "abo-blood-type-compatibility", name: "ABO & Rh Blood Type Compatibility", status: "Available" },
      { id: "ahtr-acute-hemolytic-transfusion-reaction", name: "Acute Hemolytic Transfusion Reaction (AHTR)", status: "Available" },
      { id: "fnhtr-febrile-nonhemolytic-transfusion-reaction", name: "Febrile Non-Hemolytic Reaction (FNHTR)", status: "Available" },
      { id: "allergic-transfusion-reaction", name: "Allergic Transfusion Reaction", status: "Available" },
      { id: "anaphylactic-transfusion-reaction", name: "Anaphylactic Transfusion Reaction", status: "Available" },
      { id: "taco-transfusion-associated-circulatory-overload", name: "TACO: Circulatory Overload", status: "Available" },
      { id: "trali-transfusion-related-acute-lung-injury", name: "TRALI: Acute Lung Injury", status: "Available" },
      { id: "septic-transfusion-reaction", name: "Septic Transfusion Reaction", status: "Available" },
      { id: "hypotensive-transfusion-reaction", name: "Hypotensive Transfusion Reaction", status: "Available" },
      { id: "acute-pain-transfusion-reaction", name: "Acute Pain Transfusion Reaction", status: "Available" },
      { id: "non-immune-hemolysis-transfusion", name: "Non-Immune Hemolysis", status: "Available" },
      { id: "air-embolism-transfusion", name: "Air Embolism During Transfusion", status: "Available" },
      { id: "delayed-hemolytic-transfusion-reaction", name: "Delayed Hemolytic Reaction (DHTR)", status: "Available" },
      { id: "post-transfusion-purpura", name: "Post-Transfusion Purpura (PTP)", status: "Available" },
      { id: "ta-gvhd-transfusion-associated", name: "TA-GVHD: Graft-Versus-Host Disease", status: "Available" },
      { id: "iron-overload-transfusion-hemosiderosis", name: "Iron Overload (Hemosiderosis)", status: "Available" },
      { id: "transfusion-hyperkalemia", name: "Transfusion-Associated Hyperkalemia", status: "Available" },
      { id: "transfusion-hypocalcemia-citrate-toxicity", name: "Citrate Toxicity & Hypocalcemia", status: "Available" },
      { id: "transfusion-hypothermia", name: "Transfusion-Associated Hypothermia", status: "Available" },
      { id: "dilutional-coagulopathy-massive-transfusion", name: "Dilutional Coagulopathy", status: "Available" },
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
      { id: "oral-candidiasis-rn", name: "Oral Candidiasis (Thrush)", status: "Available" },
      { id: "necrotizing-fasciitis-rn", name: "Necrotizing Fasciitis", status: "Available" },
      { id: "lemierre-syndrome-rn", name: "Lemierre Syndrome", status: "Available" },
      { id: "rmsf-rn", name: "Rocky Mountain Spotted Fever (RMSF)", status: "Available" },
      { id: "disseminated-gonococcal-rn", name: "Disseminated Gonococcal Infection", status: "Available" },
      { id: "brucellosis-rn", name: "Brucellosis", status: "Available" },
      { id: "tularemia-rn", name: "Tularemia", status: "Available" },
      { id: "coccidioidomycosis-rn", name: "Coccidioidomycosis", status: "Available" },
      { id: "mucormycosis-rn", name: "Mucormycosis", status: "Available" },
      { id: "meningococcemia-rn", name: "Meningococcemia", status: "Available" },
      { id: "fungal-sepsis-rn", name: "Fungal Sepsis", status: "Available" },
      { id: "blastomycosis-rn", name: "Blastomycosis", status: "Available" },
      { id: "sepsis-management-rn", name: "Sepsis: Protocol-Based Assessment & Bundle Management", status: "Available" },
      { id: "antibiotic-stewardship-rn", name: "Antibiotic Stewardship: De-escalation & Monitoring", status: "Available" }
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
      { id: "anaphylaxis", name: "Anaphylaxis", status: "Available" },
      { id: "mods-rn", name: "Multiple Organ Dysfunction Syndrome (MODS)", status: "Available" },
      { id: "dic-advanced-rn", name: "Disseminated Intravascular Coagulation (Advanced)", status: "Available" },
      { id: "acute-compartment-syndrome-rn", name: "Acute Compartment Syndrome", status: "Available" },
      { id: "acute-hemolytic-reaction-rn", name: "Acute Hemolytic Transfusion Reaction", status: "Available" },
      { id: "trali-critical-rn", name: "TRALI (Critical Care)", status: "Available" },
      { id: "massive-hemorrhage-rn", name: "Massive Hemorrhage Protocol", status: "Available" }
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
  },
  {
    id: "rheumatology-rn",
    title: "Rheumatology",
    icon: Activity,
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    diseases: [
      { id: "mctd-rn", name: "Mixed Connective Tissue Disease (MCTD)", status: "Available" },
      { id: "dermatomyositis-rn", name: "Dermatomyositis", status: "Available" },
      { id: "polymyositis-rn", name: "Polymyositis", status: "Available" },
      { id: "systemic-sclerosis-rn", name: "Systemic Sclerosis (Scleroderma)", status: "Available" },
      { id: "temporal-arteritis-rn", name: "Temporal Arteritis (Giant Cell Arteritis)", status: "Available" },
      { id: "behcet-disease-rn", name: "Behçet Disease", status: "Available" },
      { id: "reactive-arthritis-rn", name: "Reactive Arthritis", status: "Available" },
      { id: "psoriatic-arthritis-rn", name: "Psoriatic Arthritis", status: "Available" },
      { id: "gpa-rn", name: "Granulomatosis with Polyangiitis (GPA)", status: "Available" },
      { id: "cryoglobulinemia-rn", name: "Cryoglobulinemia", status: "Available" },
      { id: "microscopic-polyangiitis-rn", name: "Microscopic Polyangiitis", status: "Available" },
      { id: "antisynthetase-syndrome-rn", name: "Antisynthetase Syndrome", status: "Available" }
    ]
  },
  {
    id: "toxicology-rn",
    title: "Toxicology",
    icon: AlertCircle,
    color: "text-orange-700",
    bgColor: "bg-orange-50",
    diseases: [
      { id: "salicylate-toxicity-rn", name: "Salicylate Toxicity", status: "Available" },
      { id: "cyanide-toxicity-rn", name: "Cyanide Toxicity", status: "Available" },
      { id: "organophosphate-poisoning-rn", name: "Organophosphate Poisoning", status: "Available" },
      { id: "ethylene-glycol-toxicity-rn", name: "Ethylene Glycol Toxicity", status: "Available" },
      { id: "methanol-toxicity-rn", name: "Methanol Toxicity", status: "Available" },
      { id: "lithium-toxicity-rn", name: "Lithium Toxicity", status: "Available" },
      { id: "digoxin-toxicity-rn", name: "Digoxin Toxicity", status: "Available" },
      { id: "malignant-hyperthermia-rn", name: "Malignant Hyperthermia (Advanced)", status: "Available" },
      { id: "serotonin-syndrome-tox-rn", name: "Serotonin Syndrome (Toxicology)", status: "Available" },
      { id: "nms-rn", name: "Neuroleptic Malignant Syndrome (NMS)", status: "Available" }
    ]
  },
  {
    id: "dermatology-rn",
    title: "Dermatology",
    icon: Bandage,
    color: "text-pink-700",
    bgColor: "bg-pink-50",
    diseases: [
      { id: "sjs-advanced-rn", name: "Stevens-Johnson Syndrome (Advanced)", status: "Available" },
      { id: "ten-advanced-rn", name: "Toxic Epidermal Necrolysis (Advanced)", status: "Available" },
      { id: "pemphigus-vulgaris-rn", name: "Pemphigus Vulgaris", status: "Available" },
      { id: "necrotizing-soft-tissue-infection-rn", name: "Necrotizing Soft Tissue Infection", status: "Available" }
    ]
  }
];

export const npSystems = [
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
      { id: "heart-failure-np", name: "Heart Failure: NP Advanced Prescribing & Hemodynamics", status: "Available" },
      { id: "stemi-nstemi-algorithm-np", name: "STEMI vs NSTEMI: Diagnostic Algorithm & Intervention", status: "Available" },
      { id: "heart-transplant-rejection-np", name: "Heart Transplant Rejection: Immunosuppression & Monitoring", status: "Available" },
      { id: "secondary-hypertension-workup-np", name: "Secondary Hypertension Workup: Renal, Endocrine & Vascular", status: "Available" },
      { id: "cardiomyopathy-differential-np", name: "Cardiomyopathy Differential: Dilated, Hypertrophic, Restrictive", status: "Available" },
      { id: "syncope-diagnostic-algorithm-np", name: "Syncope Diagnostic Algorithm: Cardiac vs Neurogenic vs Reflex", status: "Available" },
      { id: "coronary-artery-ectasia-np", name: "Coronary Artery Ectasia: Diagnosis & Anticoagulation", status: "Available" },
      { id: "coronary-microvascular-dysfunction-np", name: "Coronary Microvascular Dysfunction: Diagnosis & Treatment", status: "Available" },
      { id: "vasculitis-coronary-arteries-np", name: "Vasculitis of Coronary Arteries: Kawasaki & Takayasu", status: "Available" },
      { id: "infiltrative-cardiomyopathy-np", name: "Infiltrative Cardiomyopathy: Amyloid, Sarcoid & Iron", status: "Available" },
      { id: "fibromuscular-dysplasia-np", name: "Fibromuscular Dysplasia: Renal & Carotid Involvement", status: "Available" },
      { id: "renovascular-hypertension-np", name: "Renovascular Hypertension: Screening & Intervention", status: "Available" },
      { id: "peripheral-embolism-np", name: "Peripheral Embolism: Arterial Thromboembolism Workup", status: "Available" },
      { id: "cholesterol-embolization-np", name: "Cholesterol Embolization Syndrome: Blue Toe & Renal Failure", status: "Available" },
      { id: "effusive-constrictive-pericarditis-np", name: "Effusive-Constrictive Pericarditis: Hemodynamics & Management", status: "Available" },
      { id: "libman-sacks-endocarditis-np", name: "Libman-Sacks Endocarditis: SLE-Associated Valve Disease", status: "Available" },
      { id: "endomyocardial-fibrosis-np", name: "Endomyocardial Fibrosis: Tropical Cardiomyopathy", status: "Available" },
      { id: "culture-negative-ie-np", name: "Culture-Negative Infective Endocarditis: Diagnostic Approach", status: "Available" }
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
      { id: "diabetes-pregnancy-np", name: "Diabetes Management in Pregnancy: Glycemic Targets", status: "Available" },
      { id: "hyperprolactinemia-workup-np", name: "Hyperprolactinemia Workup: Prolactinoma & Medication-Induced", status: "Available" },
      { id: "adrenal-incidentaloma-np", name: "Adrenal Incidentaloma Evaluation: Imaging & Hormonal Workup", status: "Available" },
      { id: "hypocalcemia-algorithm-np", name: "Hypocalcemia Algorithm: PTH, Vitamin D & Correction", status: "Available" },
      { id: "testosterone-deficiency-np", name: "Testosterone Deficiency Evaluation: Hypogonadism Workup", status: "Available" },
      { id: "glucagonoma-np", name: "Glucagonoma: 4D Syndrome & Diagnosis", status: "Available" },
      { id: "vipoma-np", name: "VIPoma: Watery Diarrhea Syndrome & Localization", status: "Available" },
      { id: "hypogonadism-np", name: "Hypogonadism: Primary vs Secondary & Hormone Replacement", status: "Available" },
      { id: "panhypopituitarism-np", name: "Panhypopituitarism: Multi-Hormone Deficiency & Replacement", status: "Available" },
      { id: "craniopharyngioma-np", name: "Craniopharyngioma: Sellar Mass Workup & Management", status: "Available" },
      { id: "ectopic-acth-np", name: "Ectopic ACTH Syndrome: Paraneoplastic Cushing Workup", status: "Available" },
      { id: "hyperparathyroid-crisis-np", name: "Hyperparathyroid Crisis: Severe Hypercalcemia Management", status: "Available" },
      { id: "toxic-multinodular-goiter-np", name: "Toxic Multinodular Goiter: Diagnosis & RAI Therapy", status: "Available" },
      { id: "thyroid-nodule-malignancy-np", name: "Thyroid Nodule Malignancy: Bethesda System & FNA Interpretation", status: "Available" },
      { id: "hypercalcemia-workup-np", name: "Hypercalcemia Workup: PTH-Mediated vs Non-PTH Differential", status: "Available" },
      { id: "diabetes-technology-np", name: "Diabetes Technology: CGM, Insulin Pumps & Closed-Loop Systems", status: "Available" },
      { id: "gestational-diabetes-screening-np", name: "Gestational Diabetes Screening: OGTT & Management Protocol", status: "Available" },
      { id: "thyroid-cancer-surveillance-np", name: "Thyroid Cancer Surveillance: Thyroglobulin & Imaging Follow-Up", status: "Available" },
      { id: "stress-hpa-axis-np", name: "Stress Response: HPA Axis Dysregulation & Clinical Consequences", status: "Available" }
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
      { id: "acute-glomerulonephritis-np", name: "Acute Glomerulonephritis: Immunopathology & Biopsy", status: "Available" },
      { id: "nephrogenic-di-np", name: "Nephrogenic Diabetes Insipidus: Lithium-Induced & Aquaporin Defects", status: "Available" },
      { id: "siadh-deep-pathophysiology-np", name: "SIADH Deep Pathophysiology: ADH Signaling & Correction Risks", status: "Available" },
      { id: "anion-gap-metabolic-acidosis-np", name: "Anion Gap Metabolic Acidosis: MUDPILES & Osmolar Gap", status: "Available" },
      { id: "hhs-deep-dive-np", name: "HHS Deep Dive: Extreme Hyperosmolarity & Fluid Resuscitation", status: "Available" },
      { id: "renal-tubular-acidosis-np", name: "Renal Tubular Acidosis: Types I–IV & Diagnostic Approach", status: "Available" },
      { id: "nephrolithiasis-prevention-np", name: "Nephrolithiasis Prevention: 24-Hour Urine & Dietary Strategies", status: "Available" },
      { id: "polycystic-kidney-management-np", name: "Polycystic Kidney Disease: Tolvaptan & Monitoring", status: "Available" },
      { id: "tls-renal-injury-np", name: "Tumor Lysis Syndrome Renal Injury: Urate Nephropathy & Rasburicase", status: "Available" }
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
      { id: "factor-v-leiden-np", name: "Factor V Leiden: Thrombophilia Screening & Management", status: "Available" },
      { id: "febrile-neutropenia-np", name: "Febrile Neutropenia: Risk Stratification & Empiric Coverage", status: "Available" },
      { id: "cml-management-np", name: "CML: BCR-ABL & Tyrosine Kinase Inhibitors", status: "Available" },
      { id: "lymphoma-workup-np", name: "Lymphoma Workup: Hodgkin vs Non-Hodgkin & Ann Arbor Staging", status: "Available" }
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
      { id: "graft-vs-host-disease-np", name: "Graft-Versus-Host Disease: Acute & Chronic Staging", status: "Available" },
      { id: "adaptive-immunity-np", name: "Adaptive Immunity: T-Cell Subsets & Immunoglobulin Classes", status: "Available" }
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
      { id: "methotrexate-safety-np", name: "Methotrexate: Molecular Pharmacology & Pharmacogenomics", status: "Available" },
      { id: "endocannabinoid-pharmacology-np", name: "Endocannabinoid Pharmacology: ECS, CB1/CB2 & Prescribing", status: "Available" },
      { id: "pharmacotherapeutics-principles-np", name: "Pharmacotherapeutics: Core Principles & OTC Management", status: "Available" }
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
      { id: "cholecystitis-np", name: "Cholecystitis: NP Differential Diagnosis & Ordering", status: "Available" },
      { id: "appendicitis-np", name: "Appendicitis: NP Diagnostic Workup & Surgical Referral", status: "Available" },
      { id: "bowel-obstruction-np", name: "Bowel Obstruction: NP Differential & Decision-Making", status: "Available" },
      { id: "acute-abdomen-np", name: "Acute Abdomen: Differential Diagnosis", status: "Available" },
      { id: "pancreatitis-advanced-np", name: "Pancreatitis: Ranson Criteria & Necrotizing", status: "Available" },
      { id: "cholangitis-np", name: "Cholangitis: Charcot & Reynolds Pentad", status: "Available" },
      { id: "hepatorenal-syndrome-np", name: "Hepatorenal Syndrome: Pathophysiology & Terlipressin", status: "Available" },
      { id: "portal-hypertension-np", name: "Portal Hypertension: Varices & Beta-Blockers", status: "Available" },
      { id: "tips-procedure-np", name: "TIPS Procedure: Indications & Complications", status: "Available" },
      { id: "cholecystectomy-np", name: "Cholecystectomy: Bile Duct Injury & Postcholecystectomy Syndrome", status: "Available" },
      { id: "nafld-nash-np", name: "NAFLD/NASH: Fibrosis Staging & Pharmacotherapy", status: "Available" },
      { id: "colon-cancer-screening-np", name: "Colon Cancer Screening: Guidelines, FIT & Colonoscopy Intervals", status: "Available" },
      { id: "pancreatic-cancer-workup-np", name: "Pancreatic Cancer Workup: CA 19-9 & Imaging Algorithm", status: "Available" },
      { id: "chronic-diarrhea-algorithm-np", name: "Chronic Diarrhea Algorithm: Osmotic vs Secretory vs Inflammatory", status: "Available" },
      { id: "chronic-mesenteric-ischemia-np", name: "Chronic Mesenteric Ischemia: Postprandial Pain & Revascularization", status: "Available" },
      { id: "chronic-pancreatitis-management-np", name: "Chronic Pancreatitis: Enzyme Replacement & Pain Management", status: "Available" },
      { id: "pancreatic-neuroendocrine-tumors-np", name: "Pancreatic Neuroendocrine Tumors: Functional vs Non-Functional", status: "Available" },
      { id: "eosinophilic-esophagitis-np", name: "Eosinophilic Esophagitis: Diagnosis & PPI/Elimination Diet", status: "Available" },
      { id: "sibo-np", name: "Small Intestinal Bacterial Overgrowth: Breath Testing & Treatment", status: "Available" },
      { id: "microscopic-colitis-np", name: "Microscopic Colitis: Collagenous vs Lymphocytic & Budesonide", status: "Available" },
      { id: "celiac-workup-algorithm-np", name: "Celiac Disease Workup: tTG-IgA & Biopsy Algorithm", status: "Available" }
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
      { id: "ten-np", name: "Toxic Epidermal Necrolysis: ICU Management", status: "Available" },
      { id: "actinic-keratosis-np", name: "Actinic Keratosis: Premalignant Workup & Cryotherapy", status: "Available" },
      { id: "squamous-cell-carcinoma-np", name: "Squamous Cell Carcinoma: Staging & Mohs Referral", status: "Available" },
      { id: "dermatitis-herpetiformis-np", name: "Dermatitis Herpetiformis: Celiac Association & Dapsone", status: "Available" },
      { id: "integumentary-pathophysiology-np", name: "Integumentary Pathophysiology: Epidermal Barrier & Atopic Dermatitis", status: "Available" }
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
      { id: "separation-anxiety-np", name: "Separation Anxiety: Neurodevelopmental & Pharmacogenomics", status: "Available" },
      { id: "adhd-pharmacology-np", name: "ADHD Pharmacology: Stimulant vs Non-Stimulant Selection", status: "Available" },
      { id: "suicide-risk-assessment-np", name: "Suicide Risk Assessment: Columbia Protocol & Safety Planning", status: "Available" },
      { id: "ptsd-management-np", name: "PTSD Management: Prazosin, EMDR & Pharmacotherapy", status: "Available" },
      { id: "eating-disorder-management-np", name: "Eating Disorder Management: Medical Stabilization & Refeeding", status: "Available" },
      { id: "insomnia-pharmacotherapy-np", name: "Insomnia Pharmacotherapy: CBT-I & Medication Selection", status: "Available" },
      { id: "geriatric-depression-np", name: "Geriatric Depression: Late-Onset & Medication Considerations", status: "Available" },
      { id: "personality-disorder-assessment-np", name: "Personality Disorder Assessment: Cluster A/B/C & DBT Referral", status: "Available" }
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
      { id: "prostatitis-np", name: "Prostatitis: NIH Classification & Targeted Therapy", status: "Available" },
      { id: "mens-health-ed-np", name: "Erectile Dysfunction: Neurovascular Pathophysiology & PDE5 Prescribing", status: "Available" },
      { id: "testosterone-deficiency-np", name: "Testosterone Deficiency: Hypogonadism Evaluation & HRT", status: "Available" },
      { id: "infertility-workup-np", name: "Infertility Workup: Female & Male Factor Evaluation", status: "Available" },
      { id: "recurrent-pregnancy-loss-np", name: "Recurrent Pregnancy Loss: Antiphospholipid & Genetic Workup", status: "Available" },
      { id: "preconception-counseling-np", name: "Preconception Counseling: Optimization & Medication Review", status: "Available" },
      { id: "breast-cancer-screening-np", name: "Breast Cancer Screening: Mammography & Risk Assessment Models", status: "Available" },
      { id: "contraception-prescribing-np", name: "Contraception Prescribing: CDC MEC & Method Selection", status: "Available" },
      { id: "menopause-pharmacotherapy-np", name: "Menopause Pharmacotherapy: Vasomotor Symptom Management", status: "Available" }
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
      { id: "otitis-media-management-np", name: "Otitis Media: Watchful Waiting vs Antibiotics", status: "Available" },
      { id: "annual-wellness-visit-np", name: "Annual Wellness Visit: Age-Appropriate Components & Screening", status: "Available" },
      { id: "cancer-screening-guidelines-np", name: "Cancer Screening by Age/Gender: USPSTF Recommendations", status: "Available" },
      { id: "preoperative-assessment-np", name: "Preoperative Assessment: Risk Stratification & Clearance", status: "Available" },
      { id: "sports-physical-np", name: "Sports Physical Assessment: Cardiac Screening & Clearance", status: "Available" },
      { id: "chronic-disease-management-plans-np", name: "Chronic Disease Management Plans: CCM Model & Follow-Up", status: "Available" },
      { id: "smoking-cessation-np", name: "Smoking Cessation: Pharmacotherapy & 5 A's Framework", status: "Available" },
      { id: "alcohol-use-screening-np", name: "Alcohol Use Screening: AUDIT-C & Brief Intervention", status: "Available" }
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
      { id: "oral-candidiasis-np", name: "Oral Candidiasis: Azole Resistance & Systemic Candidiasis", status: "Available" },
      { id: "endemic-fungal-pneumonias-np", name: "Endemic Fungal Pneumonias: Histo, Blasto, Cocci & Treatment", status: "Available" },
      { id: "post-viral-syndromes-np", name: "Post-Viral Syndromes: Long COVID & Post-Infectious Fatigue", status: "Available" },
      { id: "cdiff-recurrence-management-np", name: "C. diff Recurrence: Fidaxomicin & Fecal Microbiota Transplant", status: "Available" },
      { id: "ie-prophylaxis-np", name: "Infective Endocarditis Prophylaxis: AHA Guidelines & High-Risk", status: "Available" },
      { id: "travel-medicine-np", name: "Travel Medicine: Prophylaxis, Malaria & Traveler's Diarrhea", status: "Available" },
      { id: "opportunistic-infections-hiv-np", name: "Opportunistic Infections in HIV: CD4 Thresholds & Prophylaxis", status: "Available" },
      { id: "mrsa-decolonization-np", name: "MRSA Decolonization: Mupirocin & CHG Protocols", status: "Available" }
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
      { id: "opioid-od-np", name: "Opioid Overdose: Naloxone Dosing & Monitoring", status: "Available" },
      { id: "altered-mental-status-algorithm-np", name: "Altered Mental Status Algorithm: AEIOU-TIPS Differential", status: "Available" },
      { id: "chest-pain-workup-np", name: "Chest Pain Workup: ACS Rule-Out & Risk Stratification", status: "Available" },
      { id: "abdominal-pain-algorithm-np", name: "Abdominal Pain Algorithm: Surgical vs Medical Emergency", status: "Available" },
      { id: "syncope-emergency-workup-np", name: "Syncope Emergency Workup: San Francisco Rule & Disposition", status: "Available" },
      { id: "acute-visual-loss-np", name: "Acute Visual Loss Workup: CRAO, GCA & Retinal Detachment", status: "Available" },
      { id: "acute-testicular-pain-np", name: "Acute Testicular Pain: Torsion vs Epididymitis Algorithm", status: "Available" },
      { id: "toxicology-screening-approach-np", name: "Toxicology Screening Approach: Toxidromes & Antidotes", status: "Available" },
      { id: "acute-low-back-pain-algorithm-np", name: "Acute Low Back Pain Algorithm: Red Flags & Imaging Criteria", status: "Available" }
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
      { id: "vasculitis-classification-np", name: "Vasculitis Classification", status: "Available" },
      { id: "eosinophilic-granulomatosis-np", name: "Eosinophilic Granulomatosis with Polyangiitis (Churg-Strauss)", status: "Available" },
      { id: "psoriatic-arthritis-management-np", name: "Psoriatic Arthritis: DMARD & Biologic Selection", status: "Available" },
      { id: "mctd-np", name: "Mixed Connective Tissue Disease: Overlap Syndrome Workup", status: "Available" },
      { id: "ana-interpretation-np", name: "Antinuclear Antibody Interpretation: Patterns & Specificities", status: "Available" },
      { id: "cryoglobulinemia-workup-np", name: "Cryoglobulinemia: HCV-Associated & Renal Involvement", status: "Available" },
      { id: "microscopic-polyangiitis-np", name: "Microscopic Polyangiitis: ANCA & Renal-Pulmonary Syndrome", status: "Available" },
      { id: "antisynthetase-syndrome-np", name: "Antisynthetase Syndrome: Anti-Jo-1 & ILD Association", status: "Available" },
      { id: "ra-medication-escalation-np", name: "RA Medication Escalation: MTX to Biologics Algorithm", status: "Available" },
      { id: "osteoporosis-pharmacotherapy-np", name: "Osteoporosis Pharmacotherapy: Anabolic vs Antiresorptive", status: "Available" },
      { id: "gout-pharmacologic-management-np", name: "Gout Pharmacologic Management: ULT & Flare Prophylaxis", status: "Available" }
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
  },
  {
    id: "advanced-pathophysiology-foundations-np",
    title: "Core Advanced Pathophysiology",
    icon: Microscope,
    color: "text-violet-700",
    bgColor: "bg-violet-50",
    diseases: [
      { id: "cellular-injury-adaptation-np", name: "Advanced Cellular Injury & Adaptation", status: "Available" },
      { id: "reversible-irreversible-injury-np", name: "Reversible vs Irreversible Injury", status: "Available" },
      { id: "inflammation-cascade-np", name: "Inflammation Cascade", status: "Available" },
      { id: "oxidative-stress-np", name: "Oxidative Stress", status: "Available" },
      { id: "apoptosis-necrosis-np", name: "Apoptosis vs Necrosis", status: "Available" },
      { id: "tissue-repair-fibrosis-np", name: "Tissue Repair & Fibrosis", status: "Available" },
      { id: "chronic-inflammation-mechanisms-np", name: "Chronic Inflammation Mechanisms", status: "Available" },
      { id: "immunologic-inflammatory-mechanisms-np", name: "Immunologic & Inflammatory Mechanisms", status: "Available" },
      { id: "innate-adaptive-immunity-np", name: "Innate vs Adaptive Immunity", status: "Available" },
      { id: "cytokine-signaling-np", name: "Cytokine Signaling", status: "Available" },
      { id: "hypersensitivity-reactions-np", name: "Hypersensitivity Reactions (Type I–IV)", status: "Available" },
      { id: "autoimmune-pathogenesis-np", name: "Autoimmune Pathogenesis", status: "Available" },
      { id: "chronic-inflammatory-states-np", name: "Chronic Inflammatory States", status: "Available" },
      { id: "hemodynamic-shock-physiology-np", name: "Hemodynamic & Shock Physiology", status: "Available" },
      { id: "preload-afterload-contractility-np", name: "Preload, Afterload, Contractility", status: "Available" },
      { id: "perfusion-pressure-np", name: "Perfusion Pressure", status: "Available" },
      { id: "shock-types-np", name: "Shock Types: Cardiogenic, Distributive, Hypovolemic, Obstructive", status: "Available" },
      { id: "microcirculation-failure-np", name: "Microcirculation Failure", status: "Available" },
      { id: "acid-base-electrolyte-patho-np", name: "Acid–Base & Electrolyte Pathophysiology", status: "Available" },
      { id: "metabolic-respiratory-disturbances-np", name: "Metabolic vs Respiratory Disturbances", status: "Available" },
      { id: "compensation-mechanisms-np", name: "Compensation Mechanisms", status: "Available" },
      { id: "potassium-regulation-np", name: "Potassium Regulation", status: "Available" },
      { id: "sodium-disorders-np", name: "Sodium Disorders", status: "Available" },
      { id: "calcium-regulation-np", name: "Calcium Regulation", status: "Available" },
      { id: "raas-physiology-np", name: "RAAS Physiology", status: "Available" }
    ]
  },
  {
    id: "cardiovascular-pathophysiology-np",
    title: "Cardiovascular Pathophysiology",
    icon: Heart,
    color: "text-red-700",
    bgColor: "bg-red-50",
    diseases: [
      { id: "htn-mechanisms-np", name: "Hypertension Mechanisms: RAAS & Endothelial Dysfunction", status: "Available" },
      { id: "atherosclerosis-plaque-biology-np", name: "Atherosclerosis & Plaque Biology", status: "Available" },
      { id: "ischemic-heart-disease-patho-np", name: "Ischemic Heart Disease: O2 Supply-Demand Mismatch", status: "Available" },
      { id: "hf-mechanisms-np", name: "Heart Failure Mechanisms: HFrEF vs HFpEF", status: "Available" },
      { id: "arrhythmogenesis-np", name: "Arrhythmogenesis: Automaticity & Reentry", status: "Available" },
      { id: "valvular-disease-mechanisms-np", name: "Valvular Disease Mechanisms: Pressure vs Volume Overload", status: "Available" }
    ]
  },
  {
    id: "respiratory-pathophysiology-np",
    title: "Respiratory Pathophysiology",
    icon: Wind,
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    diseases: [
      { id: "obstructive-restrictive-mechanisms-np", name: "Obstructive vs Restrictive Disease Mechanisms", status: "Available" },
      { id: "asthma-pathophysiology-np", name: "Asthma Pathophysiology: Airway Hyperresponsiveness", status: "Available" },
      { id: "copd-pathophysiology-np", name: "COPD Pathophysiology: V/Q Mismatch", status: "Available" },
      { id: "pneumonia-gas-exchange-np", name: "Pneumonia & Gas Exchange: Consolidation & Diffusion", status: "Available" },
      { id: "pe-pathophysiology-np", name: "Pulmonary Embolism: Vascular Obstruction & Dead Space", status: "Available" }
    ]
  },
  {
    id: "neurological-pathophysiology-np",
    title: "Neurological Pathophysiology",
    icon: Brain,
    color: "text-purple-700",
    bgColor: "bg-purple-50",
    diseases: [
      { id: "ischemic-stroke-cascade-np", name: "Ischemic Stroke Cascade: Energy Failure & Excitotoxicity", status: "Available" },
      { id: "seizure-physiology-np", name: "Seizure Physiology: Neuronal Hyperexcitability", status: "Available" },
      { id: "neurodegeneration-np", name: "Neurodegeneration: Dopamine Depletion & Amyloid/Tau", status: "Available" },
      { id: "peripheral-neuropathy-patho-np", name: "Peripheral Neuropathy: Demyelination vs Axonal Injury", status: "Available" }
    ]
  },
  {
    id: "endocrine-pathophysiology-np",
    title: "Endocrine Pathophysiology",
    icon: Zap,
    color: "text-rose-700",
    bgColor: "bg-rose-50",
    diseases: [
      { id: "insulin-resistance-t2d-np", name: "Insulin Resistance & Type 2 Diabetes: Beta Cell Dysfunction", status: "Available" },
      { id: "dka-hhs-patho-np", name: "DKA vs HHS: Ketogenesis & Osmotic Diuresis", status: "Available" },
      { id: "thyroid-disorders-patho-np", name: "Thyroid Disorders: Hyperthyroidism & Autoimmune Thyroiditis", status: "Available" },
      { id: "adrenal-disorders-patho-np", name: "Adrenal Disorders: Cortisol Excess & Deficiency", status: "Available" },
      { id: "pcos-pathophysiology-np", name: "PCOS: Hyperandrogenism & Insulin Resistance", status: "Available" }
    ]
  },
  {
    id: "renal-pathophysiology-np",
    title: "Renal Pathophysiology",
    icon: Droplets,
    color: "text-cyan-700",
    bgColor: "bg-cyan-50",
    diseases: [
      { id: "aki-mechanisms-np", name: "AKI Mechanisms: Prerenal vs Intrinsic vs Postrenal", status: "Available" },
      { id: "ckd-progression-patho-np", name: "CKD Progression: Nephron Loss & RAAS Overactivation", status: "Available" },
      { id: "proteinuria-mechanisms-np", name: "Proteinuria Mechanisms: Glomerular Injury", status: "Available" }
    ]
  },
  {
    id: "gi-hepatic-pathophysiology-np",
    title: "GI / Hepatic Pathophysiology",
    icon: Droplets,
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    diseases: [
      { id: "gerd-mechanisms-np", name: "GERD Mechanisms: LES Dysfunction", status: "Available" },
      { id: "peptic-ulcer-patho-np", name: "Peptic Ulcer Disease: Mucosal Barrier Breakdown", status: "Available" },
      { id: "cirrhosis-patho-np", name: "Cirrhosis: Portal Hypertension & Ascites Formation", status: "Available" },
      { id: "pancreatitis-patho-np", name: "Pancreatitis: Autodigestion Cascade", status: "Available" }
    ]
  },
  {
    id: "hematology-pathophysiology-np",
    title: "Hematology Pathophysiology",
    icon: ShieldAlert,
    color: "text-orange-700",
    bgColor: "bg-orange-50",
    diseases: [
      { id: "anemia-mechanisms-np", name: "Anemia Mechanisms: Production vs Destruction vs Loss", status: "Available" },
      { id: "coagulation-disorders-patho-np", name: "Coagulation Disorders: Platelet & Clotting Factor", status: "Available" },
      { id: "thromboembolism-patho-np", name: "Thromboembolism: Virchow's Triad", status: "Available" }
    ]
  },
  {
    id: "infectious-pathophysiology-np",
    title: "Infectious Pathophysiology",
    icon: AlertCircle,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    diseases: [
      { id: "sepsis-cascade-patho-np", name: "Sepsis Cascade: Cytokine Storm & Capillary Leak", status: "Available" },
      { id: "host-pathogen-interaction-np", name: "Host–Pathogen Interaction: Immune Evasion", status: "Available" }
    ]
  },
  {
    id: "pediatric-pathophysiology-np",
    title: "Pediatric Pathophysiology",
    icon: Baby,
    color: "text-sky-700",
    bgColor: "bg-sky-50",
    diseases: [
      { id: "bronchiolitis-patho-np", name: "Bronchiolitis: Airway Narrowing in Infants", status: "Available" },
      { id: "congenital-heart-disease-patho-np", name: "Congenital Heart Disease: Shunting Physiology", status: "Available" }
    ]
  },
  {
    id: "womens-health-pathophysiology-np",
    title: "Women's Health Pathophysiology",
    icon: Users,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    diseases: [
      { id: "aub-mechanisms-np", name: "Abnormal Uterine Bleeding Mechanisms: Hormonal Dysregulation", status: "Available" },
      { id: "endometriosis-patho-np", name: "Endometriosis: Ectopic Endometrial Implantation", status: "Available" }
    ]
  },
  {
    id: "psychiatric-pathophysiology-np",
    title: "Psychiatric Pathophysiology",
    icon: Brain,
    color: "text-violet-700",
    bgColor: "bg-violet-50",
    diseases: [
      { id: "depression-neurobiology-np", name: "Depression Neurobiology: Monoamine Hypothesis & HPA Axis", status: "Available" },
      { id: "anxiety-disorders-patho-np", name: "Anxiety Disorders: Amygdala Dysregulation", status: "Available" }
    ]
  },
  {
    id: "cross-system-concepts-np",
    title: "Cross-System High-Yield Concepts",
    icon: Lightbulb,
    color: "text-yellow-700",
    bgColor: "bg-yellow-50",
    diseases: [
      { id: "differential-diagnosis-frameworks-np", name: "Differential Diagnosis Frameworks", status: "Available" },
      { id: "red-flag-mechanisms-np", name: "Red Flag Mechanisms: Why Symptoms Are Dangerous", status: "Available" },
      { id: "multi-system-disease-interaction-np", name: "Multi-System Disease Interaction: DM + CKD + HF", status: "Available" },
      { id: "metabolic-syndrome-np", name: "Metabolic Syndrome", status: "Available" },
      { id: "aging-physiology-changes-np", name: "Aging Physiology: Pharmacokinetic & Organ Reserve Changes", status: "Available" },
      { id: "orthostatic-hypotension-syndromes-np", name: "Orthostatic Hypotension Syndromes: Autonomic Failure & Shy-Drager", status: "Available" },
      { id: "osa-pathophysiology-deep-np", name: "OSA Pathophysiology Deep Dive: Upper Airway Collapse & CV Risk", status: "Available" }
    ]
  },
  {
    id: "diagnostic-reasoning-np",
    title: "Diagnostic Reasoning & Criteria",
    icon: Search,
    color: "text-teal-700",
    bgColor: "bg-teal-50",
    diseases: [
      { id: "diagnostic-criteria-logic-np", name: "Diagnostic Criteria Logic: Screening vs Diagnostic Tests", status: "Available" },
      { id: "sensitivity-specificity-np", name: "Sensitivity vs Specificity Application", status: "Available" },
      { id: "confirmatory-testing-logic-np", name: "Confirmatory Testing & Rule-In/Rule-Out Reasoning", status: "Available" },
      { id: "guideline-based-diagnosis-np", name: "Guideline-Based Diagnosis: DSM-5, ADA, AHA, GOLD", status: "Available" }
    ]
  },
  {
    id: "cardiovascular-diagnostic-criteria-np",
    title: "Cardiovascular Diagnostic Criteria",
    icon: Heart,
    color: "text-red-600",
    bgColor: "bg-red-50",
    diseases: [
      { id: "htn-diagnostic-criteria-np", name: "Hypertension: BP Thresholds & Confirmation", status: "Available" },
      { id: "hyperlipidemia-criteria-np", name: "Hyperlipidemia: LDL Thresholds & ASCVD Risk", status: "Available" },
      { id: "hf-diagnostic-criteria-np", name: "Heart Failure: Symptoms, EF & BNP Interpretation", status: "Available" },
      { id: "afib-diagnostic-criteria-np", name: "Atrial Fibrillation: ECG Confirmation", status: "Available" },
      { id: "acs-diagnostic-criteria-np", name: "ACS: Troponin Rise/Fall & ECG Changes", status: "Available" }
    ]
  },
  {
    id: "respiratory-diagnostic-criteria-np",
    title: "Respiratory Diagnostic Criteria",
    icon: Wind,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    diseases: [
      { id: "asthma-diagnostic-criteria-np", name: "Asthma: Spirometry & Reversibility Criteria", status: "Available" },
      { id: "copd-diagnostic-criteria-np", name: "COPD: FEV1/FVC Threshold & GOLD Staging", status: "Available" },
      { id: "pneumonia-diagnostic-criteria-np", name: "Pneumonia: Clinical + Imaging Requirements", status: "Available" },
      { id: "pe-diagnostic-criteria-np", name: "PE: Wells Criteria & D-Dimer Interpretation", status: "Available" }
    ]
  },
  {
    id: "neuro-diagnostic-criteria-np",
    title: "Neurological Diagnostic Criteria",
    icon: Brain,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    diseases: [
      { id: "stroke-diagnostic-criteria-np", name: "Stroke: Clinical Diagnosis & Imaging Confirmation", status: "Available" },
      { id: "migraine-diagnostic-criteria-np", name: "Migraine: ICHD Diagnostic Features", status: "Available" },
      { id: "epilepsy-diagnostic-criteria-np", name: "Epilepsy: Unprovoked Seizure Recurrence Definition", status: "Available" },
      { id: "dementia-diagnostic-criteria-np", name: "Dementia: Cognitive Decline & Reversible Causes", status: "Available" }
    ]
  },
  {
    id: "endocrine-diagnostic-criteria-np",
    title: "Endocrine Diagnostic Criteria",
    icon: Zap,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    diseases: [
      { id: "t2d-diagnostic-criteria-np", name: "Type 2 Diabetes: A1C, FPG, OGTT Criteria", status: "Available" },
      { id: "prediabetes-criteria-np", name: "Prediabetes: Lab Cutoffs", status: "Available" },
      { id: "hypothyroidism-criteria-np", name: "Hypothyroidism: TSH & Free T4 Interpretation", status: "Available" },
      { id: "hyperthyroidism-criteria-np", name: "Hyperthyroidism: Suppressed TSH & T4/T3", status: "Available" },
      { id: "pcos-rotterdam-criteria-np", name: "PCOS: Rotterdam Criteria", status: "Available" }
    ]
  },
  {
    id: "renal-diagnostic-criteria-np",
    title: "Renal Diagnostic Criteria",
    icon: Droplets,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    diseases: [
      { id: "ckd-diagnostic-criteria-np", name: "CKD: eGFR Threshold & Albuminuria Criteria", status: "Available" },
      { id: "aki-diagnostic-criteria-np", name: "AKI: Creatinine Rise & Urine Output Thresholds", status: "Available" }
    ]
  },
  {
    id: "gi-diagnostic-criteria-np",
    title: "GI Diagnostic Criteria",
    icon: Droplets,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    diseases: [
      { id: "gerd-diagnostic-criteria-np", name: "GERD: Clinical vs Endoscopy Indications", status: "Available" },
      { id: "ibs-rome-iv-criteria-np", name: "IBS: Rome IV Criteria", status: "Available" },
      { id: "cirrhosis-diagnostic-criteria-np", name: "Cirrhosis: Imaging, Labs & Clinical Findings", status: "Available" },
      { id: "acute-pancreatitis-criteria-np", name: "Acute Pancreatitis: 2 of 3 Diagnostic Rule", status: "Available" }
    ]
  },
  {
    id: "hematology-diagnostic-criteria-np",
    title: "Hematology Diagnostic Criteria",
    icon: ShieldAlert,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    diseases: [
      { id: "iron-deficiency-anemia-criteria-np", name: "Iron Deficiency Anemia: Ferritin & Microcytosis", status: "Available" },
      { id: "b12-deficiency-criteria-np", name: "B12 Deficiency: Lab Thresholds & Clinical Signs", status: "Available" },
      { id: "dvt-diagnostic-criteria-np", name: "DVT: Wells Criteria & Imaging Confirmation", status: "Available" }
    ]
  },
  {
    id: "infectious-diagnostic-criteria-np",
    title: "Infectious Disease Diagnostic Criteria",
    icon: AlertCircle,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    diseases: [
      { id: "uti-diagnostic-criteria-np", name: "UTI: Urinalysis & Culture Thresholds", status: "Available" },
      { id: "sepsis-diagnostic-criteria-np", name: "Sepsis: SIRS vs qSOFA Concepts", status: "Available" },
      { id: "hiv-diagnostic-criteria-np", name: "HIV: Screening vs Confirmatory Testing", status: "Available" }
    ]
  },
  {
    id: "pediatric-diagnostic-criteria-np",
    title: "Pediatric Diagnostic Criteria",
    icon: Baby,
    color: "text-sky-600",
    bgColor: "bg-sky-50",
    diseases: [
      { id: "otitis-media-criteria-np", name: "Otitis Media: Bulging TM Requirement", status: "Available" },
      { id: "adhd-dsm5-criteria-np", name: "ADHD: DSM-5 Duration & Impairment Criteria", status: "Available" }
    ]
  },
  {
    id: "womens-health-diagnostic-criteria-np",
    title: "Women's Health Diagnostic Criteria",
    icon: Users,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    diseases: [
      { id: "aub-palm-coein-criteria-np", name: "AUB: PALM-COEIN Classification", status: "Available" },
      { id: "menopause-criteria-np", name: "Menopause: 12-Month Amenorrhea Rule", status: "Available" },
      { id: "ectopic-pregnancy-criteria-np", name: "Ectopic Pregnancy: hCG Trends & Imaging", status: "Available" }
    ]
  },
  {
    id: "psychiatric-diagnostic-criteria-np",
    title: "Psychiatric Diagnostic Criteria",
    icon: Brain,
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    diseases: [
      { id: "mdd-dsm5-criteria-np", name: "MDD: DSM-5 Symptom Count & Duration", status: "Available" },
      { id: "gad-diagnostic-criteria-np", name: "GAD: Duration Requirement", status: "Available" },
      { id: "bipolar-diagnostic-criteria-np", name: "Bipolar Disorder: Mania Duration Threshold", status: "Available" }
    ]
  },
  {
    id: "high-yield-exam-patterns-np",
    title: "High-Yield NP Exam Patterns",
    icon: Trophy,
    color: "text-yellow-700",
    bgColor: "bg-yellow-50",
    diseases: [
      { id: "borderline-lab-values-np", name: "Borderline Lab Values: When to Recheck", status: "Available" },
      { id: "criteria-fulfillment-np", name: "Does Patient Meet Full Criteria?", status: "Available" },
      { id: "confirmatory-repeat-testing-np", name: "What Must Be Repeated to Confirm?", status: "Available" },
      { id: "lab-confirms-diagnosis-np", name: "Which Lab Confirms the Diagnosis?", status: "Available" },
      { id: "ruling-out-findings-np", name: "Which Finding Rules It Out?", status: "Available" },
      { id: "mandatory-imaging-np", name: "When Is Imaging Mandatory?", status: "Available" },
      { id: "severity-markers-np", name: "What Makes It Severe?", status: "Available" }
    ]
  },
  {
    id: "prescribing-foundations-np",
    title: "Core Prescribing Foundations",
    icon: Syringe,
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
    diseases: [
      { id: "pharmacokinetics-applied-np", name: "Pharmacokinetics: Absorption, Bioavailability & First-Pass", status: "Available" },
      { id: "half-life-dosing-np", name: "Half-Life & Steady-State Dosing Principles", status: "Available" },
      { id: "cyp450-interactions-np", name: "Hepatic Metabolism: CYP450 Interactions", status: "Available" },
      { id: "renal-elimination-dosing-np", name: "Renal Elimination & Dose Adjustment", status: "Available" },
      { id: "protein-binding-np", name: "Protein Binding Relevance", status: "Available" },
      { id: "pharmacodynamics-np", name: "Pharmacodynamics: Agonists, Antagonists & Dose-Response", status: "Available" },
      { id: "therapeutic-window-np", name: "Therapeutic Window & Potency vs Efficacy", status: "Available" },
      { id: "renal-dosing-adjustments-np", name: "Patient-Specific: Renal Dosing Adjustments", status: "Available" },
      { id: "hepatic-impairment-prescribing-np", name: "Patient-Specific: Hepatic Impairment Considerations", status: "Available" },
      { id: "pregnancy-safety-prescribing-np", name: "Pregnancy Safety Categories & Logic", status: "Available" },
      { id: "geriatric-prescribing-beers-np", name: "Geriatric Prescribing: Beers Criteria Logic", status: "Available" },
      { id: "pediatric-weight-dosing-np", name: "Pediatric Weight-Based Dosing", status: "Available" },
      { id: "obesity-prescribing-np", name: "Obesity Prescribing Considerations", status: "Available" },
      { id: "polypharmacy-risk-np", name: "Polypharmacy Risk Assessment", status: "Available" },
      { id: "drug-drug-interactions-np", name: "Drug–Drug Interactions: CYP Inhibitors/Inducers", status: "Available" },
      { id: "qt-prolongation-risks-np", name: "QT Prolongation Risks", status: "Available" },
      { id: "serotonin-syndrome-risk-np", name: "Serotonin Syndrome Risk Combinations", status: "Available" },
      { id: "bleeding-risk-stacking-np", name: "Bleeding Risk: Anticoagulant Stacking", status: "Available" },
      { id: "additive-hypotension-np", name: "Additive Hypotension Risks", status: "Available" },
      { id: "hyperkalemia-stacking-np", name: "Hyperkalemia Stacking", status: "Available" },
      { id: "monitoring-safety-np", name: "Monitoring & Safety: Baseline Labs & Ongoing Requirements", status: "Available" },
      { id: "red-flag-adverse-effects-np", name: "Red Flag Adverse Effects & When to Stop", status: "Available" },
      { id: "black-box-warnings-np", name: "Black Box Warnings: High-Yield", status: "Available" },
      { id: "prescribing-process-logic-np", name: "Prescribing Process: Diagnosis to Follow-Up", status: "Available" }
    ]
  },
  {
    id: "cardiovascular-prescribing-np",
    title: "Cardiovascular Prescribing",
    icon: Heart,
    color: "text-red-600",
    bgColor: "bg-red-50",
    diseases: [
      { id: "acei-arb-selection-np", name: "Hypertension: ACEi vs ARB Selection", status: "Available" },
      { id: "thiazide-prescribing-np", name: "Thiazide Diuretics: Selection & Monitoring", status: "Available" },
      { id: "ccb-dhp-nondhp-np", name: "CCB: DHP vs Non-DHP Logic", status: "Available" },
      { id: "beta-blocker-selection-np", name: "Beta Blockers: When Appropriate & Agent Selection", status: "Available" },
      { id: "resistant-htn-strategies-np", name: "Resistant Hypertension Strategies", status: "Available" },
      { id: "hf-acei-arb-arni-np", name: "Heart Failure: ACEi/ARB/ARNI Prescribing", status: "Available" },
      { id: "hf-beta-blocker-agents-np", name: "Heart Failure: Beta Blocker Agent Selection", status: "Available" },
      { id: "hf-mra-prescribing-np", name: "Heart Failure: MRA Prescribing", status: "Available" },
      { id: "hf-sglt2i-np", name: "Heart Failure: SGLT2 Inhibitor Logic", status: "Available" },
      { id: "diuretics-loop-thiazide-np", name: "Diuretics: Loop vs Thiazide in HF", status: "Available" },
      { id: "afib-rate-rhythm-logic-np", name: "AFib: Rate vs Rhythm Control Logic", status: "Available" },
      { id: "afib-anticoagulation-chadsvasc-np", name: "AFib: CHA₂DS₂-VASc Anticoagulation Decisions", status: "Available" },
      { id: "doac-warfarin-selection-np", name: "DOAC vs Warfarin Selection", status: "Available" },
      { id: "statin-intensity-np", name: "Statin Intensity Selection & ASCVD Risk", status: "Available" },
      { id: "lipid-monitoring-np", name: "Lipid Monitoring: LFTs & CK", status: "Available" }
    ]
  },
  {
    id: "respiratory-prescribing-np",
    title: "Respiratory Prescribing",
    icon: Wind,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    diseases: [
      { id: "asthma-step-therapy-np", name: "Asthma: Step Therapy Prescribing", status: "Available" },
      { id: "saba-ics-logic-np", name: "SABA vs ICS Logic", status: "Available" },
      { id: "laba-safety-logic-np", name: "LABA Safety Logic", status: "Available" },
      { id: "smart-therapy-np", name: "SMART Therapy Concept", status: "Available" },
      { id: "copd-lama-laba-ics-np", name: "COPD: LAMA vs LABA vs ICS Combinations", status: "Available" },
      { id: "copd-exacerbation-rx-np", name: "COPD Exacerbation Prescribing", status: "Available" },
      { id: "pneumonia-outpatient-abx-np", name: "Pneumonia Outpatient: Antibiotic Selection & Allergy", status: "Available" }
    ]
  },
  {
    id: "psychiatric-prescribing-np",
    title: "Psychiatric Prescribing",
    icon: Brain,
    color: "text-violet-600",
    bgColor: "bg-violet-50",
    diseases: [
      { id: "ssri-selection-differences-np", name: "Depression: SSRI Selection Differences", status: "Available" },
      { id: "snri-logic-np", name: "SNRI Logic & Selection", status: "Available" },
      { id: "ssri-sexual-side-effects-np", name: "Sexual Side Effects Management", status: "Available" },
      { id: "discontinuation-syndrome-np", name: "Discontinuation Syndrome", status: "Available" },
      { id: "augmentation-strategies-np", name: "Augmentation Strategies", status: "Available" },
      { id: "anxiety-ssri-firstline-np", name: "Anxiety: First-Line SSRIs", status: "Available" },
      { id: "benzodiazepine-risks-rx-np", name: "Benzodiazepine Risks & Prescribing", status: "Available" },
      { id: "bipolar-mood-stabilizers-rx-np", name: "Bipolar: Mood Stabilizer Prescribing", status: "Available" },
      { id: "atypical-antipsychotics-rx-np", name: "Atypical Antipsychotics: Selection & Monitoring", status: "Available" },
      { id: "antipsychotic-metabolic-monitoring-np", name: "Antipsychotic Metabolic Monitoring", status: "Available" },
      { id: "eps-recognition-np", name: "EPS Recognition & Management", status: "Available" },
      { id: "antipsychotic-qt-risk-np", name: "Antipsychotic QT Prolongation Risk", status: "Available" }
    ]
  },
  {
    id: "endocrine-prescribing-np",
    title: "Endocrine Prescribing",
    icon: Zap,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    diseases: [
      { id: "metformin-firstline-np", name: "Diabetes: Metformin First-Line Logic", status: "Available" },
      { id: "sglt2i-cv-renal-benefit-np", name: "SGLT2 Inhibitors: CV/Renal Benefit", status: "Available" },
      { id: "glp1-agonists-np", name: "GLP-1 Agonists: Selection & Titration", status: "Available" },
      { id: "insulin-types-titration-np", name: "Insulin Types & Titration Basics", status: "Available" },
      { id: "levothyroxine-dosing-np", name: "Levothyroxine Dosing & TSH Monitoring", status: "Available" },
      { id: "bisphosphonate-prescribing-np", name: "Bisphosphonate Prescribing", status: "Available" },
      { id: "calcium-vitamin-d-logic-np", name: "Calcium/Vitamin D Logic", status: "Available" }
    ]
  },
  {
    id: "renal-electrolyte-prescribing-np",
    title: "Renal / Electrolyte Prescribing",
    icon: Droplets,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    diseases: [
      { id: "hyperkalemia-mgmt-rx-np", name: "Hyperkalemia Management Prescribing", status: "Available" },
      { id: "diuretic-selection-logic-np", name: "Diuretic Selection Logic", status: "Available" },
      { id: "ckd-medication-adjustments-np", name: "CKD Medication Adjustments", status: "Available" }
    ]
  },
  {
    id: "gi-prescribing-np",
    title: "GI Prescribing",
    icon: Droplets,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    diseases: [
      { id: "ppi-h2-blocker-logic-np", name: "PPI vs H2 Blocker Selection", status: "Available" },
      { id: "ibs-therapies-rx-np", name: "IBS Therapies: Selection & Logic", status: "Available" },
      { id: "h-pylori-regimens-np", name: "H. pylori Regimens", status: "Available" },
      { id: "hepatitis-treatment-overview-np", name: "Hepatitis Treatment Overview", status: "Available" }
    ]
  },
  {
    id: "womens-health-prescribing-np",
    title: "Women's Health Prescribing",
    icon: Users,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    diseases: [
      { id: "contraceptive-selection-np", name: "Contraceptive Selection Logic", status: "Available" },
      { id: "hormone-therapy-rx-np", name: "Hormone Therapy Prescribing", status: "Available" },
      { id: "sti-treatment-guidelines-np", name: "STI Treatment Guidelines", status: "Available" },
      { id: "uti-women-management-np", name: "UTI Management in Women", status: "Available" },
      { id: "pregnancy-safe-meds-np", name: "Pregnancy-Safe Medication Logic", status: "Available" }
    ]
  },
  {
    id: "pediatric-prescribing-np",
    title: "Pediatric Prescribing",
    icon: Baby,
    color: "text-sky-600",
    bgColor: "bg-sky-50",
    diseases: [
      { id: "peds-weight-dosing-np", name: "Pediatric Weight-Based Dosing", status: "Available" },
      { id: "peds-antibiotic-selection-np", name: "Pediatric Antibiotic Selection", status: "Available" },
      { id: "vaccine-contraindications-np", name: "Vaccine Contraindications", status: "Available" }
    ]
  },
  {
    id: "geriatric-prescribing-np",
    title: "Geriatric Prescribing",
    icon: Users,
    color: "text-stone-600",
    bgColor: "bg-stone-50",
    diseases: [
      { id: "beers-criteria-prescribing-np", name: "Beers Criteria: Prescribing Application", status: "Available" },
      { id: "fall-risk-meds-np", name: "Fall-Risk Medications", status: "Available" },
      { id: "deprescribing-strategies-np", name: "Deprescribing Strategies", status: "Available" }
    ]
  },
  {
    id: "infectious-disease-prescribing-np",
    title: "Infectious Disease Prescribing",
    icon: Bug,
    color: "text-lime-600",
    bgColor: "bg-lime-50",
    diseases: [
      { id: "antibiotic-selection-logic-np", name: "Antibiotic Selection Logic", status: "Available" },
      { id: "narrow-broad-spectrum-np", name: "Narrow vs Broad Spectrum Selection", status: "Available" },
      { id: "resistance-principles-np", name: "Resistance Principles", status: "Available" },
      { id: "antibiotic-duration-decisions-np", name: "Antibiotic Duration Decisions", status: "Available" },
      { id: "antifungal-basics-np", name: "Antifungal Basics", status: "Available" },
      { id: "antiviral-basics-np", name: "Antiviral Basics", status: "Available" }
    ]
  },
  {
    id: "legal-ethical-prescribing-np",
    title: "Legal & Ethical Prescribing",
    icon: Scale,
    color: "text-gray-700",
    bgColor: "bg-gray-50",
    diseases: [
      { id: "controlled-substances-np", name: "Controlled Substances Prescribing", status: "Available" },
      { id: "documentation-requirements-np", name: "Documentation Requirements", status: "Available" },
      { id: "pdmp-usage-np", name: "PDMP Usage", status: "Available" },
      { id: "informed-consent-prescribing-np", name: "Informed Consent for Prescribing", status: "Available" },
      { id: "off-label-prescribing-np", name: "Off-Label Prescribing Principles", status: "Available" },
      { id: "scope-of-practice-ca-us-np", name: "Scope-of-Practice: Canada vs U.S. Differences", status: "Available" }
    ]
  },
  {
    id: "cv-core-physiology-np",
    title: "Cardiovascular Core Physiology & Assessment",
    icon: Heart,
    color: "text-red-700",
    bgColor: "bg-red-50",
    diseases: [
      { id: "cardiac-conduction-system-np", name: "Cardiac Conduction System", status: "Available" },
      { id: "pressure-volume-relationships-np", name: "Pressure-Volume Relationships", status: "Available" },
      { id: "cardiac-output-determinants-np", name: "Cardiac Output Determinants", status: "Available" },
      { id: "systemic-pulmonary-circulation-np", name: "Systemic vs Pulmonary Circulation", status: "Available" },
      { id: "vascular-resistance-principles-np", name: "Vascular Resistance Principles", status: "Available" },
      { id: "heart-sound-interpretation-np", name: "Heart Sound Interpretation (S1, S2, S3, S4)", status: "Available" },
      { id: "murmur-timing-logic-np", name: "Murmur Timing Logic: Systolic vs Diastolic", status: "Available" },
      { id: "jvp-assessment-np", name: "Jugular Venous Pressure Assessment", status: "Available" },
      { id: "peripheral-pulse-assessment-np", name: "Peripheral Pulse Assessment", status: "Available" },
      { id: "edema-grading-np", name: "Edema Grading & Interpretation", status: "Available" },
      { id: "orthostatic-vitals-np", name: "Orthostatic Vitals", status: "Available" },
      { id: "ecg-basics-np", name: "12-Lead ECG Basics: Rhythms, Blocks & Ischemia", status: "Available" },
      { id: "arrhythmia-recognition-np", name: "Basic Arrhythmia Recognition", status: "Available" },
      { id: "troponin-interpretation-np", name: "Troponin Interpretation", status: "Available" },
      { id: "bnp-interpretation-np", name: "BNP Interpretation", status: "Available" },
      { id: "lipid-panel-analysis-np", name: "Lipid Panel Analysis", status: "Available" },
      { id: "ascvd-risk-calculation-np", name: "ASCVD Risk Calculation", status: "Available" },
      { id: "htn-all-stages-np", name: "Hypertension: All Stages & Guidelines", status: "Available" },
      { id: "hyperlipidemia-np", name: "Hyperlipidemia", status: "Available" },
      { id: "stable-ischemic-hd-np", name: "Stable Ischemic Heart Disease", status: "Available" },
      { id: "pad-basics-np", name: "Peripheral Arterial Disease", status: "Available" },
      { id: "dvt-basics-np", name: "DVT Basics", status: "Available" },
      { id: "antihypertensives-comparison-np", name: "Antihypertensives: Mechanism-Based Comparison", status: "Available" },
      { id: "anticoagulants-doac-warfarin-np", name: "Anticoagulants: DOAC vs Warfarin Logic", status: "Available" },
      { id: "antiplatelets-np", name: "Antiplatelets", status: "Available" }
    ]
  },
  {
    id: "resp-core-physiology-np",
    title: "Respiratory Core Physiology & Assessment",
    icon: Wind,
    color: "text-blue-700",
    bgColor: "bg-blue-50",
    diseases: [
      { id: "ventilation-perfusion-np", name: "Ventilation-Perfusion Relationships", status: "Available" },
      { id: "oxygen-dissociation-curve-np", name: "Oxygen Dissociation Curve", status: "Available" },
      { id: "airflow-dynamics-np", name: "Airflow Dynamics", status: "Available" },
      { id: "acid-base-physiology-np", name: "Acid-Base Physiology Basics", status: "Available" },
      { id: "lung-auscultation-interpretation-np", name: "Lung Auscultation Interpretation", status: "Available" },
      { id: "percussion-patterns-np", name: "Percussion Patterns", status: "Available" },
      { id: "spirometry-interpretation-np", name: "Spirometry Interpretation", status: "Available" },
      { id: "pulse-oximetry-limits-np", name: "Pulse Oximetry Limits", status: "Available" },
      { id: "abg-interpretation-np", name: "ABG Interpretation", status: "Available" },
      { id: "pft-obstructive-restrictive-np", name: "PFT Patterns: Obstructive vs Restrictive", status: "Available" },
      { id: "chest-xray-interpretation-np", name: "Chest X-Ray Interpretation Basics", status: "Available" },
      { id: "asthma-step-therapy-core-np", name: "Asthma: Step Therapy", status: "Available" },
      { id: "copd-gold-staging-np", name: "COPD: GOLD Staging", status: "Available" },
      { id: "pneumonia-outpatient-np", name: "Pneumonia: Outpatient Management", status: "Available" },
      { id: "tb-basics-np", name: "TB Basics", status: "Available" },
      { id: "pe-basics-np", name: "PE Basics", status: "Available" },
      { id: "sleep-apnea-np", name: "Sleep Apnea", status: "Available" },
      { id: "uri-differentiation-np", name: "URI Differentiation", status: "Available" },
      { id: "beta-agonists-saba-laba-np", name: "Beta-Agonists: SABA/LABA", status: "Available" },
      { id: "inhaled-corticosteroids-np", name: "Inhaled Corticosteroids", status: "Available" },
      { id: "anticholinergics-resp-np", name: "Anticholinergics (Respiratory)", status: "Available" },
      { id: "systemic-steroids-np", name: "Systemic Steroids", status: "Available" },
      { id: "antibiotic-selection-resp-np", name: "Antibiotic Selection Principles (Respiratory)", status: "Available" }
    ]
  },
  {
    id: "neuro-core-physiology-np",
    title: "Neurological Core Physiology & Assessment",
    icon: Brain,
    color: "text-purple-700",
    bgColor: "bg-purple-50",
    diseases: [
      { id: "neuronal-signaling-np", name: "Neuronal Signaling", status: "Available" },
      { id: "cranial-nerve-functions-np", name: "Cranial Nerve Functions", status: "Available" },
      { id: "motor-sensory-pathways-np", name: "Motor vs Sensory Pathways", status: "Available" },
      { id: "complete-neuro-exam-np", name: "Complete Neuro Exam", status: "Available" },
      { id: "gcs-assessment-np", name: "Glasgow Coma Scale", status: "Available" },
      { id: "stroke-fast-nih-np", name: "Stroke Recognition: FAST + NIH Basics", status: "Available" },
      { id: "headache-red-flags-np", name: "Headache Red Flags", status: "Available" },
      { id: "imaging-indications-neuro-np", name: "Neurological Imaging Indications", status: "Available" },
      { id: "migraine-tension-cluster-np", name: "Migraine vs Tension vs Cluster", status: "Available" },
      { id: "stroke-tia-np", name: "Stroke/TIA", status: "Available" },
      { id: "seizure-disorders-np", name: "Seizure Disorders", status: "Available" },
      { id: "peripheral-neuropathy-np", name: "Peripheral Neuropathy", status: "Available" },
      { id: "bells-palsy-np", name: "Bell's Palsy", status: "Available" },
      { id: "dementia-delirium-np", name: "Dementia vs Delirium", status: "Available" },
      { id: "parkinsons-disease-np", name: "Parkinson's Disease", status: "Available" },
      { id: "antiepileptics-basics-np", name: "Antiepileptics Basics", status: "Available" },
      { id: "migraine-therapies-np", name: "Migraine Therapies", status: "Available" },
      { id: "parkinson-meds-np", name: "Parkinson Medications", status: "Available" },
      { id: "neuropathic-pain-meds-np", name: "Neuropathic Pain Medications", status: "Available" }
    ]
  },
  {
    id: "heme-core-np",
    title: "Hematology Core Concepts",
    icon: ShieldAlert,
    color: "text-orange-700",
    bgColor: "bg-orange-50",
    diseases: [
      { id: "hematopoiesis-np", name: "Hematopoiesis", status: "Available" },
      { id: "coagulation-cascade-np", name: "Coagulation Cascade", status: "Available" },
      { id: "iron-metabolism-np", name: "Iron Metabolism", status: "Available" },
      { id: "cbc-interpretation-np", name: "CBC Interpretation", status: "Available" },
      { id: "iron-studies-np", name: "Iron Studies", status: "Available" },
      { id: "pt-inr-aptt-np", name: "PT/INR/aPTT Interpretation", status: "Available" },
      { id: "d-dimer-logic-np", name: "D-Dimer Logic", status: "Available" },
      { id: "iron-deficiency-anemia-np", name: "Iron Deficiency Anemia", status: "Available" },
      { id: "b12-deficiency-np", name: "B12 Deficiency", status: "Available" },
      { id: "anemia-chronic-disease-np", name: "Anemia of Chronic Disease", status: "Available" },
      { id: "sickle-cell-np", name: "Sickle Cell Disease", status: "Available" },
      { id: "thrombocytopenia-np", name: "Thrombocytopenia", status: "Available" },
      { id: "coagulopathies-basics-np", name: "Coagulopathies Basics", status: "Available" }
    ]
  },
  {
    id: "infectious-disease-core-np",
    title: "Infectious Disease: Primary Care Scope",
    icon: Bug,
    color: "text-lime-700",
    bgColor: "bg-lime-50",
    diseases: [
      { id: "host-pathogen-interaction-core-np", name: "Host-Pathogen Interaction", status: "Available" },
      { id: "antimicrobial-stewardship-np", name: "Antimicrobial Stewardship", status: "Available" },
      { id: "resistance-mechanisms-np", name: "Resistance Mechanisms", status: "Available" },
      { id: "uti-primary-care-np", name: "UTI: Primary Care Management", status: "Available" },
      { id: "sti-management-core-np", name: "STI Management", status: "Available" },
      { id: "cellulitis-np", name: "Cellulitis", status: "Available" },
      { id: "sinusitis-np", name: "Sinusitis", status: "Available" },
      { id: "pharyngitis-np", name: "Pharyngitis", status: "Available" },
      { id: "gi-infections-np", name: "GI Infections", status: "Available" },
      { id: "hiv-basics-np", name: "HIV Basics", status: "Available" },
      { id: "hepatitis-basics-np", name: "Hepatitis Basics", status: "Available" },
      { id: "adult-immunizations-np", name: "Adult Immunizations", status: "Available" },
      { id: "pediatric-vaccine-schedule-np", name: "Pediatric Vaccine Schedule Overview", status: "Available" }
    ]
  },
  {
    id: "endocrine-core-np",
    title: "Endocrine Core Physiology & Conditions",
    icon: Zap,
    color: "text-rose-700",
    bgColor: "bg-rose-50",
    diseases: [
      { id: "hypothalamic-pituitary-axis-np", name: "Hypothalamic-Pituitary Axis", status: "Available" },
      { id: "insulin-glucose-dynamics-np", name: "Insulin-Glucose Dynamics", status: "Available" },
      { id: "thyroid-regulation-np", name: "Thyroid Regulation", status: "Available" },
      { id: "tsh-interpretation-np", name: "TSH Interpretation", status: "Available" },
      { id: "a1c-interpretation-np", name: "A1C Interpretation", status: "Available" },
      { id: "cortisol-testing-np", name: "Cortisol Testing Basics", status: "Available" },
      { id: "type1-vs-type2-dm-np", name: "Type 1 vs Type 2 Diabetes", status: "Available" },
      { id: "dka-hhs-basics-np", name: "DKA vs HHS Basics", status: "Available" },
      { id: "hypothyroidism-core-np", name: "Hypothyroidism", status: "Available" },
      { id: "hyperthyroidism-core-np", name: "Hyperthyroidism", status: "Available" },
      { id: "thyroid-nodules-np", name: "Thyroid Nodules", status: "Available" },
      { id: "adrenal-disorders-basics-np", name: "Adrenal Disorders Basics", status: "Available" },
      { id: "pcos-core-np", name: "PCOS", status: "Available" },
      { id: "osteoporosis-core-np", name: "Osteoporosis", status: "Available" },
      { id: "insulin-types-np", name: "Insulin Types", status: "Available" },
      { id: "thyroid-hormone-therapy-np", name: "Thyroid Hormone Therapy", status: "Available" }
    ]
  },
  {
    id: "renal-gu-core-np",
    title: "Renal / GU Core Physiology & Conditions",
    icon: Droplets,
    color: "text-cyan-700",
    bgColor: "bg-cyan-50",
    diseases: [
      { id: "gfr-physiology-np", name: "GFR Physiology", status: "Available" },
      { id: "raas-np", name: "RAAS", status: "Available" },
      { id: "fluid-balance-np", name: "Fluid Balance", status: "Available" },
      { id: "cmp-interpretation-np", name: "CMP Interpretation", status: "Available" },
      { id: "egfr-np", name: "eGFR", status: "Available" },
      { id: "urinalysis-interpretation-np", name: "Urinalysis Interpretation", status: "Available" },
      { id: "urine-culture-logic-np", name: "Urine Culture Logic", status: "Available" },
      { id: "aki-vs-ckd-np", name: "AKI vs CKD", status: "Available" },
      { id: "electrolyte-abnormalities-np", name: "Electrolyte Abnormalities", status: "Available" },
      { id: "bph-np", name: "BPH", status: "Available" },
      { id: "nephrolithiasis-np", name: "Nephrolithiasis", status: "Available" }
    ]
  },
  {
    id: "gi-hepatic-core-np",
    title: "GI / Hepatic Core Physiology & Conditions",
    icon: Droplets,
    color: "text-amber-700",
    bgColor: "bg-amber-50",
    diseases: [
      { id: "liver-function-np", name: "Liver Function", status: "Available" },
      { id: "bilirubin-metabolism-np", name: "Bilirubin Metabolism", status: "Available" },
      { id: "gi-motility-np", name: "GI Motility", status: "Available" },
      { id: "lft-interpretation-np", name: "LFT Interpretation", status: "Available" },
      { id: "lipase-amylase-np", name: "Lipase/Amylase Interpretation", status: "Available" },
      { id: "stool-testing-np", name: "Stool Testing", status: "Available" },
      { id: "gerd-core-np", name: "GERD", status: "Available" },
      { id: "pud-np", name: "PUD", status: "Available" },
      { id: "ibs-ibd-np", name: "IBS vs IBD", status: "Available" },
      { id: "hepatitis-core-np", name: "Hepatitis", status: "Available" },
      { id: "cirrhosis-core-np", name: "Cirrhosis", status: "Available" },
      { id: "gallbladder-disease-np", name: "Gallbladder Disease", status: "Available" },
      { id: "pancreatitis-basics-np", name: "Pancreatitis Basics", status: "Available" }
    ]
  },
  {
    id: "derm-core-np",
    title: "Dermatology Core Assessment & Conditions",
    icon: Eye,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    diseases: [
      { id: "primary-secondary-lesions-np", name: "Primary vs Secondary Lesions", status: "Available" },
      { id: "abcde-melanoma-rule-np", name: "ABCDE Melanoma Rule", status: "Available" },
      { id: "eczema-np", name: "Eczema", status: "Available" },
      { id: "psoriasis-core-np", name: "Psoriasis", status: "Available" },
      { id: "acne-np", name: "Acne", status: "Available" },
      { id: "fungal-infections-np", name: "Fungal Infections", status: "Available" },
      { id: "skin-cancers-basics-np", name: "Skin Cancers Basics", status: "Available" },
      { id: "rashes-differentiation-np", name: "Rashes Differentiation", status: "Available" }
    ]
  },
  {
    id: "pediatrics-core-np",
    title: "Pediatrics Core Concepts & Conditions",
    icon: Baby,
    color: "text-sky-700",
    bgColor: "bg-sky-50",
    diseases: [
      { id: "growth-development-milestones-np", name: "Growth & Development Milestones", status: "Available" },
      { id: "pediatric-dosing-logic-np", name: "Pediatric Dosing Logic", status: "Available" },
      { id: "pediatric-red-flags-np", name: "Pediatric Red Flags", status: "Available" },
      { id: "otitis-media-np", name: "Otitis Media", status: "Available" },
      { id: "bronchiolitis-np", name: "Bronchiolitis", status: "Available" },
      { id: "croup-np", name: "Croup", status: "Available" },
      { id: "pediatric-asthma-np", name: "Pediatric Asthma", status: "Available" },
      { id: "adhd-basics-np", name: "ADHD Basics", status: "Available" },
      { id: "kawasaki-disease-np", name: "Kawasaki Disease", status: "Available" },
      { id: "intussusception-np", name: "Intussusception", status: "Available" },
      { id: "tetralogy-of-fallot-np", name: "Tetralogy of Fallot", status: "Available" },
      { id: "vaccine-catchup-schedules-np", name: "Vaccine Catch-Up Schedules: CDC & Shared Clinical Decision-Making", status: "Available" },
      { id: "pediatric-growth-disorders-np", name: "Pediatric Growth Disorders: Short Stature & Growth Hormone", status: "Available" },
      { id: "autism-screening-np", name: "Autism Screening: M-CHAT & Developmental Referral", status: "Available" },
      { id: "failure-to-thrive-np", name: "Failure to Thrive Workup: Organic vs Non-Organic", status: "Available" },
      { id: "pediatric-obesity-management-np", name: "Pediatric Obesity Management: BMI Percentiles & Lifestyle", status: "Available" },
      { id: "febrile-infant-algorithm-np", name: "Febrile Infant Algorithm: Rochester & Step-by-Step Criteria", status: "Available" },
      { id: "neonatal-jaundice-workup-np", name: "Neonatal Jaundice Workup: Bhutani Nomogram & Phototherapy", status: "Available" },
      { id: "pediatric-asthma-management-np", name: "Pediatric Asthma Management: NAEPP Step Therapy", status: "Available" }
    ]
  },
  {
    id: "womens-health-core-np",
    title: "Women's Health Core Concepts",
    icon: Users,
    color: "text-rose-700",
    bgColor: "bg-rose-50",
    diseases: [
      { id: "menstrual-physiology-np", name: "Menstrual Physiology", status: "Available" },
      { id: "contraception-np", name: "Contraception", status: "Available" },
      { id: "pregnancy-basics-np", name: "Pregnancy Basics", status: "Available" },
      { id: "amenorrhea-np", name: "Amenorrhea", status: "Available" },
      { id: "prenatal-screening-np", name: "Prenatal Screening", status: "Available" },
      { id: "sti-screening-np", name: "STI Screening", status: "Available" },
      { id: "menopause-management-np", name: "Menopause Management", status: "Available" }
    ]
  },
  {
    id: "geriatrics-core-np",
    title: "Geriatrics Core Concepts",
    icon: Users,
    color: "text-stone-700",
    bgColor: "bg-stone-50",
    diseases: [
      { id: "polypharmacy-np", name: "Polypharmacy", status: "Available" },
      { id: "frailty-np", name: "Frailty", status: "Available" },
      { id: "fall-risk-np", name: "Fall Risk", status: "Available" },
      { id: "cognitive-decline-np", name: "Cognitive Decline", status: "Available" }
    ]
  },
  {
    id: "psych-core-np",
    title: "Psychiatric Core Diagnoses & Pharmacology",
    icon: Brain,
    color: "text-violet-700",
    bgColor: "bg-violet-50",
    diseases: [
      { id: "depression-core-np", name: "Depression", status: "Available" },
      { id: "anxiety-disorders-core-np", name: "Anxiety Disorders", status: "Available" },
      { id: "bipolar-disorder-core-np", name: "Bipolar Disorder", status: "Available" },
      { id: "schizophrenia-basics-np", name: "Schizophrenia Basics", status: "Available" },
      { id: "substance-use-disorders-np", name: "Substance Use Disorders", status: "Available" },
      { id: "ssris-np", name: "SSRIs", status: "Available" },
      { id: "snris-np", name: "SNRIs", status: "Available" },
      { id: "antipsychotics-core-np", name: "Antipsychotics", status: "Available" },
      { id: "mood-stabilizers-core-np", name: "Mood Stabilizers", status: "Available" }
    ]
  },
  {
    id: "professional-practice-np",
    title: "Professional Practice & Guidelines",
    icon: FileText,
    color: "text-gray-700",
    bgColor: "bg-gray-50",
    diseases: [
      { id: "evidence-based-practice-np", name: "Evidence-Based Practice", status: "Available" },
      { id: "screening-guidelines-uspstf-np", name: "Screening Guidelines: USPSTF-Style Logic", status: "Available" },
      { id: "preventive-care-np", name: "Preventive Care", status: "Available" },
      { id: "risk-stratification-np", name: "Risk Stratification", status: "Available" },
      { id: "shared-decision-making-np", name: "Shared Decision-Making", status: "Available" },
      { id: "documentation-standards-np", name: "Documentation Standards", status: "Available" },
      { id: "scope-of-practice-np", name: "Scope of Practice", status: "Available" },
      { id: "ethics-practice-np", name: "Ethics", status: "Available" }
    ]
  },
  {
    id: "exam-strategy-np",
    title: "NP Exam Strategy",
    icon: GraduationCap,
    color: "text-indigo-700",
    bgColor: "bg-indigo-50",
    diseases: [
      { id: "clinical-prioritization-np", name: "Clinical Prioritization", status: "Available" },
      { id: "red-flags-exam-np", name: "Red Flags Recognition", status: "Available" },
      { id: "guideline-application-np", name: "Guideline Application", status: "Available" },
      { id: "medication-selection-logic-np", name: "Medication Selection Logic", status: "Available" },
      { id: "risk-benefit-reasoning-np", name: "Risk vs Benefit Reasoning", status: "Available" },
      { id: "differential-diagnosis-narrowing-np", name: "Differential Diagnosis Narrowing", status: "Available" },
      { id: "next-best-step-np", name: "Next Best Step Decisions", status: "Available" },
      { id: "health-promotion-np", name: "Health Promotion", status: "Available" }
    ]
  },
  {
    id: "rare-high-risk-np",
    title: "Rare & High-Risk: Don't Miss Diseases",
    icon: AlertCircle,
    color: "text-red-700",
    bgColor: "bg-red-50",
    diseases: [
      { id: "aortic-dissection-np", name: "Aortic Dissection", status: "Available" },
      { id: "hypertrophic-cardiomyopathy-np", name: "Hypertrophic Cardiomyopathy", status: "Available" },
      { id: "spontaneous-pneumothorax-np", name: "Spontaneous Pneumothorax", status: "Available" },
      { id: "guillain-barre-np", name: "Guillain–Barré Syndrome", status: "Available" },
      { id: "celiac-disease-atypical-np", name: "Celiac Disease: Atypical Presentation", status: "Available" },
      { id: "wernicke-encephalopathy-np", name: "Wernicke Encephalopathy", status: "Available" },
      { id: "creutzfeldt-jakob-np", name: "Creutzfeldt-Jakob Disease", status: "Available" },
      { id: "pheochromocytoma-crisis-np", name: "Pheochromocytoma Crisis: Hypertensive Emergency & Alpha-Blockade", status: "Available" },
      { id: "adrenal-hemorrhage-np", name: "Adrenal Hemorrhage: Waterhouse-Friderichsen Syndrome", status: "Available" },
      { id: "hereditary-hemorrhagic-telangiectasia-np", name: "Hereditary Hemorrhagic Telangiectasia: Osler-Weber-Rendu", status: "Available" },
      { id: "cholangiocarcinoma-np", name: "Cholangiocarcinoma: Biliary Obstruction & Staging", status: "Available" },
      { id: "primary-sclerosing-cholangitis-np", name: "Primary Sclerosing Cholangitis: IBD Association & ERCP", status: "Available" }
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

interface DbLesson {
  id: number;
  title: string;
  slug: string;
  category?: string;
  bodySystem?: string;
  tier?: string;
  summary?: string;
  tags?: string[];
}

function DbLessonsSection({ lessons }: { lessons: DbLesson[] }) {
  if (lessons.length === 0) return null;

  const grouped = lessons.reduce<Record<string, DbLesson[]>>((acc, lesson) => {
    const cat = lesson.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(lesson);
    return acc;
  }, {});

  const tierColors: Record<string, string> = {
    free: "bg-green-100 text-green-800",
    rpn: "bg-blue-100 text-blue-800",
    rn: "bg-purple-100 text-purple-800",
    np: "bg-red-100 text-red-800",
  };

  return (
    <div className="mt-10">
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-xl bg-primary/10">
          <Database className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Additional Lessons</h2>
          <p className="text-sm text-gray-500">Supplemental lesson content</p>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(grouped).map(([category, items]) => (
          <Card key={category} className="border-none shadow-md hover:shadow-lg transition-all overflow-hidden bg-white">
            <CardHeader className="flex flex-row items-center gap-3 py-3 px-4 bg-slate-50">
              <div className="p-2 rounded-lg bg-white shadow-sm text-primary">
                <BookOpen className="w-4 h-4" />
              </div>
              <CardTitle className="text-base font-bold text-gray-900">{category}</CardTitle>
            </CardHeader>
            <CardContent className="pt-3 px-4 pb-4">
              <div className="space-y-1.5">
                {items.map((lesson) => (
                  <LocaleLink
                    key={lesson.id}
                    href={`/lessons/${lesson.slug}`}
                    data-testid={`db-lesson-card-${lesson.slug}`}
                    className="flex items-center justify-between px-3 py-2 rounded-lg border border-primary/10 bg-primary/5 hover:bg-primary/10 transition-all cursor-pointer group no-underline"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <BookOpen className="w-4 h-4 shrink-0 text-primary" />
                      <div className="min-w-0">
                        <span className="text-sm font-medium text-gray-900 block truncate">{lesson.title}</span>
                        {lesson.summary && (
                          <span className="text-xs text-gray-500 block truncate mt-0.5">{lesson.summary}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      {lesson.tier && (
                        <Badge variant="secondary" className={`text-xs ${tierColors[lesson.tier] || ""}`}>
                          {lesson.tier.toUpperCase()}
                        </Badge>
                      )}
                      <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                    </div>
                  </LocaleLink>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default function Lessons() {
  const [, setLocation] = useLocation();
  const { user } = useAuth();
  const { t, language } = useI18n();
  const [translationsReady, setTranslationsReady] = useState(isTranslationLoaded(language));
  const userTier = user?.tier || "free";
  const isAdmin = userTier === "admin";
  const previewTier = isAdmin ? (localStorage.getItem("nursenest-admin-preview") || null) : null;
  const effectiveTier = previewTier || userTier;
  const showAllTabs = effectiveTier === "free" || effectiveTier === "admin" || !user;

  useEffect(() => {
    if (language === "en") { setTranslationsReady(true); return; }
    let cancelled = false;
    loadTranslationLanguage(language).then(() => {
      if (!cancelled) setTranslationsReady(true);
    });
    return () => { cancelled = true; };
  }, [language]);

  const defaultTab = showAllTabs ? "rpn" : effectiveTier;
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [lessonSearchQuery, setLessonSearchQuery] = useState("");
  const [selectedSystemFilter, setSelectedSystemFilter] = useState<string>("all");

  const [dbLessons, setDbLessons] = useState<DbLesson[]>([]);
  const [customSystems, setCustomSystems] = useState<any[]>([]);
  const [showSystemModal, setShowSystemModal] = useState(false);
  const [editingSystem, setEditingSystem] = useState<any>(null);
  const [systemModalTier, setSystemModalTier] = useState("rpn");
  const [lessonOverrides, setLessonOverrides] = useState<Record<string, any>>({});
  const [completeLessons, setCompleteLessons] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const refreshOverrides = () => {
    fetch("/api/lesson-overrides")
      .then((r) => r.ok ? r.json() : {})
      .then(setLessonOverrides)
      .catch(() => {});
  };

  useEffect(() => {
    refreshOverrides();
    if (isAdmin) {
      fetch("/api/lessons/meta")
        .then((r) => r.ok ? r.json() : [])
        .then((meta: { id: string; isComplete: boolean }[]) => {
          const complete = new Set<string>();
          for (const m of meta) {
            if (m.isComplete) complete.add(m.id);
          }
          setCompleteLessons(complete);
        })
        .catch(() => {});
    }
  }, []);

  useEffect(() => {
    fetch("/api/custom-modules?page=lessons")
      .then((r) => r.ok ? r.json() : [])
      .then(setCustomSystems)
      .catch(() => {});
  }, []);

  const deleteCustomSystem = async (id: string) => {
    const creds = JSON.parse(localStorage.getItem("nursenest-credentials") || "{}");
    try {
      const res = await fetch(`/api/custom-modules/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: creds.username, password: creds.password }),
      });
      if (!res.ok) throw new Error("Delete failed");
      setCustomSystems((prev) => prev.filter((s) => s.id !== id));
      toast({ title: "System deleted" });
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  useEffect(() => {
    const langParam = language && language !== "en" ? `?lang=${encodeURIComponent(language)}` : "";
    fetch(`/api/content/lessons${langParam}`)
      .then((r) => r.ok ? r.json() : [])
      .then((data) => setDbLessons(Array.isArray(data) ? data : []))
      .catch(() => setDbLessons([]));
  }, [language]);

  const rpnNonPharm = rpnSystems.filter(s => !s.id.includes("pharmacology"));
  const rnNonPharm = rnSystems.filter(s => !s.id.includes("pharmacology"));
  const npNonPharm = npSystems.filter(s => !s.id.includes("pharmacology"));

  const preNursingRoutes: Record<string, string> = {
    "pre-nursing-science": "/pre-nursing?module=science-foundations",
    "pre-nursing-anatomy": "/pre-nursing?module=anatomy-physiology",
    "pre-nursing-research": "/pre-nursing?module=research-statistics",
    "pre-nursing-terminology": "/pre-nursing?module=medical-terminology",
    "pre-nursing-chemistry": "/pre-nursing?module=chemistry",
    "pre-nursing-microbiology": "/pre-nursing?module=microbiology",
    "pre-nursing-infection-control": "/pre-nursing?module=infection-control",
    "pre-nursing-fluids": "/pre-nursing?module=fluids-electrolytes",
    "pre-nursing-communication": "/pre-nursing?module=communication",
    "pre-nursing-ethics": "/pre-nursing?module=ethics-legal",
    "pre-nursing-study": "/pre-nursing?module=study-strategies",
  };

  const handleLessonSelect = (id: string) => {
    if (preNursingRoutes[id]) {
      setLocation(preNursingRoutes[id]);
    } else {
      setLocation(`/lessons/${id}`);
    }
  };

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
      
      <LessonLibraryHero activeTier={activeTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-12 flex flex-col items-center gap-6">
          <div className="text-center w-full">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">{t("lessons.title")}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">{t("lessons.subtitle")}</p>
          </div>
          <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setSelectedSystemFilter("all"); }} className="w-full md:w-auto">
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

        <div className="mb-6 flex flex-col sm:flex-row items-center gap-3 max-w-3xl mx-auto">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search lessons by title..."
              value={lessonSearchQuery}
              onChange={(e) => setLessonSearchQuery(e.target.value)}
              className="pl-10 rounded-full border-gray-200 bg-white shadow-sm"
              data-testid="input-lesson-search"
            />
            {lessonSearchQuery && (
              <button
                onClick={() => setLessonSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                data-testid="button-clear-lesson-search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <select
            value={selectedSystemFilter}
            onChange={(e) => {
              setSelectedSystemFilter(e.target.value);
              if (e.target.value !== "all") {
                const el = document.getElementById(`system-${e.target.value}`);
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }
            }}
            className="w-full sm:w-56 h-10 rounded-full border border-gray-200 bg-white shadow-sm px-4 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/30 appearance-none cursor-pointer"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center" }}
            data-testid="select-system-filter"
          >
            <option value="all">All Systems</option>
            {(() => {
              const currentSystems = activeTab === "rpn" ? [...fundamentalsSystems, ...delegationSystems, ...clinicalScenariosSystems, ...medMathSystems, ...rpnNonPharm]
                : activeTab === "rn" ? [...fundamentalsSystems, ...delegationSystems, ...clinicalScenariosSystems, ...medMathSystems, ...rnNonPharm]
                : activeTab === "np" ? [...fundamentalsSystems, ...delegationSystems, ...clinicalScenariosSystems, ...medMathSystems, ...npNonPharm]
                : [];
              return currentSystems.map((s) => (
                <option key={s.id} value={s.id}>{s.title || s.name} ({(s.diseases || s.lessons || []).length})</option>
              ));
            })()}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <div className="lg:col-span-2">
            <FeaturedTopics activeTier={activeTab} onNavigate={(path) => setLocation(path)} />
          </div>
          <div className="lg:col-span-1">
            <LessonProgressCard
              activeTier={activeTab}
              systems={activeTab === "rpn" ? [...fundamentalsSystems, ...delegationSystems, ...clinicalScenariosSystems, ...medMathSystems, ...rpnNonPharm]
                : activeTab === "rn" ? [...fundamentalsSystems, ...delegationSystems, ...clinicalScenariosSystems, ...medMathSystems, ...rnNonPharm]
                : activeTab === "np" ? [...fundamentalsSystems, ...delegationSystems, ...clinicalScenariosSystems, ...medMathSystems, ...npNonPharm]
                : []}
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="rpn" className="mt-0">
            <LecturesSection tier="rpn" onNavigate={setLocation} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...fundamentalsSystems, ...delegationSystems, ...clinicalScenariosSystems, ...medMathSystems, ...rpnNonPharm].filter((system) => { if (selectedSystemFilter !== "all" && system.id !== selectedSystemFilter) return false; if (!lessonSearchQuery) return true; const q = lessonSearchQuery.toLowerCase(); const sysName = (system.name || system.title || "").toLowerCase(); return sysName.includes(q) || system.diseases?.some((d: any) => d.name?.toLowerCase().includes(q)) || system.lessons?.some((l: any) => l.title?.toLowerCase().includes(q)); }).map((system) => (
                <LessonSystemCard key={system.id} system={system} tier="rpn" onSelect={handleLessonSelect} lessonOverrides={lessonOverrides} onOverridesChange={refreshOverrides} completeLessons={completeLessons} />
              ))}
              {customSystems.filter((s) => s.tier === "rpn" || !s.tier).map((cs) => (
                <CustomSystemCard key={cs.id} system={cs} tier="rpn" isAdmin={isAdmin} onSelect={handleLessonSelect} onEdit={() => { setEditingSystem(cs); setSystemModalTier("rpn"); setShowSystemModal(true); }} onDelete={() => { if (confirm("Delete this system?")) deleteCustomSystem(cs.id); }} lessonOverrides={lessonOverrides} onOverridesChange={refreshOverrides} />
              ))}
              {isAdmin && (
                <AddSystemCard onClick={() => { setEditingSystem(null); setSystemModalTier("rpn"); setShowSystemModal(true); }} />
              )}
            </div>
            <DbLessonsSection lessons={dbLessons.filter(l => !l.tier || l.tier === "free" || l.tier === "rpn")} />
          </TabsContent>
          <TabsContent value="rn" className="mt-0">
            <LecturesSection tier="rn" onNavigate={setLocation} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...fundamentalsSystems, ...delegationSystems, ...clinicalScenariosSystems, ...medMathSystems, ...rnNonPharm].filter((system) => { if (selectedSystemFilter !== "all" && system.id !== selectedSystemFilter) return false; if (!lessonSearchQuery) return true; const q = lessonSearchQuery.toLowerCase(); const sysName = (system.name || system.title || "").toLowerCase(); return sysName.includes(q) || system.diseases?.some((d: any) => d.name?.toLowerCase().includes(q)) || system.lessons?.some((l: any) => l.title?.toLowerCase().includes(q)); }).map((system) => (
                <LessonSystemCard key={system.id} system={system} tier="rn" onSelect={handleLessonSelect} lessonOverrides={lessonOverrides} onOverridesChange={refreshOverrides} completeLessons={completeLessons} />
              ))}
              {customSystems.filter((s) => s.tier === "rn" || !s.tier).map((cs) => (
                <CustomSystemCard key={cs.id} system={cs} tier="rn" isAdmin={isAdmin} onSelect={handleLessonSelect} onEdit={() => { setEditingSystem(cs); setSystemModalTier("rn"); setShowSystemModal(true); }} onDelete={() => { if (confirm("Delete this system?")) deleteCustomSystem(cs.id); }} lessonOverrides={lessonOverrides} onOverridesChange={refreshOverrides} />
              ))}
              {isAdmin && (
                <AddSystemCard onClick={() => { setEditingSystem(null); setSystemModalTier("rn"); setShowSystemModal(true); }} />
              )}
            </div>
            <DbLessonsSection lessons={dbLessons.filter(l => !l.tier || l.tier === "free" || l.tier === "rn")} />
          </TabsContent>
          <TabsContent value="np" className="mt-0">
            <LecturesSection tier="np" onNavigate={setLocation} />
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...fundamentalsSystems, ...delegationSystems, ...clinicalScenariosSystems, ...medMathSystems, ...npNonPharm].filter((system) => { if (selectedSystemFilter !== "all" && system.id !== selectedSystemFilter) return false; if (!lessonSearchQuery) return true; const q = lessonSearchQuery.toLowerCase(); const sysName = (system.name || system.title || "").toLowerCase(); return sysName.includes(q) || system.diseases?.some((d: any) => d.name?.toLowerCase().includes(q)) || system.lessons?.some((l: any) => l.title?.toLowerCase().includes(q)); }).map((system) => (
                <LessonSystemCard key={system.id} system={system} tier="np" onSelect={handleLessonSelect} lessonOverrides={lessonOverrides} onOverridesChange={refreshOverrides} completeLessons={completeLessons} />
              ))}
              {customSystems.filter((s) => s.tier === "np" || !s.tier).map((cs) => (
                <CustomSystemCard key={cs.id} system={cs} tier="np" isAdmin={isAdmin} onSelect={handleLessonSelect} onEdit={() => { setEditingSystem(cs); setSystemModalTier("np"); setShowSystemModal(true); }} onDelete={() => { if (confirm("Delete this system?")) deleteCustomSystem(cs.id); }} lessonOverrides={lessonOverrides} onOverridesChange={refreshOverrides} />
              ))}
              {isAdmin && (
                <AddSystemCard onClick={() => { setEditingSystem(null); setSystemModalTier("np"); setShowSystemModal(true); }} />
              )}
            </div>
            <DbLessonsSection lessons={dbLessons.filter(l => !l.tier || l.tier === "free" || l.tier === "np")} />
          </TabsContent>
          <TabsContent value="pharmacology" className="mt-0">
            <div className="space-y-10">
              {(showAllTabs || effectiveTier === "rpn") && (
                <div>
                  <h2 className="text-lg font-bold text-gray-700 mb-4">{t("lessons.rpnPharmacology")}</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rpnSystems.filter(s => s.id.includes("pharmacology")).filter((system) => { if (!lessonSearchQuery) return true; const q = lessonSearchQuery.toLowerCase(); const sysName = (system.name || system.title || "").toLowerCase(); return sysName.includes(q) || system.diseases?.some((d: any) => d.name?.toLowerCase().includes(q)) || system.lessons?.some((l: any) => l.title?.toLowerCase().includes(q)); }).map((system) => (
                      <LessonSystemCard key={system.id} system={system} tier="rpn" onSelect={(id) => setLocation(`/lessons/${id}`)} lessonOverrides={lessonOverrides} onOverridesChange={refreshOverrides} completeLessons={completeLessons} />
                    ))}
                  </div>
                </div>
              )}
              {(showAllTabs || effectiveTier === "rn") && (
                <div>
                  <h2 className="text-lg font-bold text-gray-700 mb-4">{t("lessons.rnPharmacology")}</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rnSystems.filter(s => s.id.includes("pharmacology")).filter((system) => { if (!lessonSearchQuery) return true; const q = lessonSearchQuery.toLowerCase(); const sysName = (system.name || system.title || "").toLowerCase(); return sysName.includes(q) || system.diseases?.some((d: any) => d.name?.toLowerCase().includes(q)) || system.lessons?.some((l: any) => l.title?.toLowerCase().includes(q)); }).map((system) => (
                      <LessonSystemCard key={system.id} system={system} tier="rn" onSelect={(id) => setLocation(`/lessons/${id}`)} lessonOverrides={lessonOverrides} onOverridesChange={refreshOverrides} completeLessons={completeLessons} />
                    ))}
                  </div>
                </div>
              )}
              {(showAllTabs || effectiveTier === "np") && (
                <div>
                  <h2 className="text-lg font-bold text-gray-700 mb-4">{t("lessons.npPharmacology")}</h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {npSystems.filter(s => s.id.includes("pharmacology")).filter((system) => { if (!lessonSearchQuery) return true; const q = lessonSearchQuery.toLowerCase(); const sysName = (system.name || system.title || "").toLowerCase(); return sysName.includes(q) || system.diseases?.some((d: any) => d.name?.toLowerCase().includes(q)) || system.lessons?.some((l: any) => l.title?.toLowerCase().includes(q)); }).map((system) => (
                      <LessonSystemCard key={system.id} system={system} tier="np" onSelect={(id) => setLocation(`/lessons/${id}`)} lessonOverrides={lessonOverrides} onOverridesChange={refreshOverrides} completeLessons={completeLessons} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      {showSystemModal && (
        <LessonSystemModal
          system={editingSystem}
          defaultTier={systemModalTier}
          onClose={() => { setShowSystemModal(false); setEditingSystem(null); }}
          onSaved={(mod) => {
            if (editingSystem) {
              setCustomSystems((prev) => prev.map((s) => s.id === mod.id ? mod : s));
            } else {
              setCustomSystems((prev) => [...prev, mod]);
            }
            setShowSystemModal(false);
            setEditingSystem(null);
          }}
        />
      )}
      <LessonLibraryCTA activeTier={activeTab} />

      <AdminEditButton />
      <Footer />
    </div>
  );
}

function estimateStudyTime(difficulty: DifficultyLevel): string {
  const minutes: Record<DifficultyLevel, number> = { 1: 5, 2: 7, 3: 10, 4: 13, 5: 18 };
  return `${minutes[difficulty]} min`;
}

function DifficultyBadge({ level }: { level: DifficultyLevel }) {
  const config = difficultyConfig[level];
  const shortLabels: Record<DifficultyLevel, string> = { 1: "B", 2: "E", 3: "M", 4: "H", 5: "X" };
  const fullLabels: Record<DifficultyLevel, string> = { 1: "Beginner", 2: "Easy", 3: "Moderate", 4: "Hard", 5: "Expert" };
  return (
    <span data-testid={`badge-difficulty-${level}`} title={fullLabels[level]} className={cn("font-semibold rounded-full whitespace-nowrap text-[10px] leading-tight px-1.5 py-px", config.color, config.bg)}>
      <span className="hidden sm:inline">{fullLabels[level]}</span>
      <span className="sm:hidden">{shortLabels[level]}</span>
    </span>
  );
}

const COLLAPSE_THRESHOLD = 6;

function CollapsibleLessonList({ diseases, systemId, children }: { diseases: any[]; systemId: string; children: (disease: any) => React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  const sorted = [...diseases].sort((a: any, b: any) => a.name.localeCompare(b.name));
  const shouldCollapse = sorted.length > COLLAPSE_THRESHOLD;
  const visible = shouldCollapse && !expanded ? sorted.slice(0, COLLAPSE_THRESHOLD) : sorted;
  const hiddenCount = sorted.length - COLLAPSE_THRESHOLD;

  return (
    <div className="space-y-1.5">
      {visible.map((disease) => children(disease))}
      {shouldCollapse && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-center py-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors rounded-lg hover:bg-primary/5"
          data-testid={`button-toggle-${systemId}`}
        >
          {expanded ? "Show less" : `Show ${hiddenCount} more`}
        </button>
      )}
    </div>
  );
}

function LessonSystemCard({ system, onSelect, tier, lessonOverrides, onOverridesChange, completeLessons }: { system: any, onSelect: (id: string) => void, tier: string, lessonOverrides?: Record<string, any>, onOverridesChange?: () => void, completeLessons?: Set<string> }) {
  const { t, language } = useI18n();
  const { user } = useAuth();
  const { getImageUrl, refresh: refreshImages } = useSiteImages();
  const systemImg = getSystemPreviewImage(system.id) || getSystemImage(system.id);
  const isAdmin = user?.tier === "admin";
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);
  const { toast } = useToast();

  const saveLessonName = async (lessonId: string, newName: string) => {
    const creds = JSON.parse(localStorage.getItem("nursenest-credentials") || "{}");
    setSavingName(true);
    try {
      const existing = lessonOverrides?.[lessonId] || {};
      const res = await fetch(`/api/lesson-overrides/${lessonId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...existing, title: newName, username: creds.username, password: creds.password }),
      });
      if (!res.ok) throw new Error("Save failed");
      toast({ title: "Lesson name updated" });
      setEditingLessonId(null);
      onOverridesChange?.();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setSavingName(false);
    }
  };

  const uploadAndSaveLessonImage = async (lessonId: string, file: File) => {
    setUploadingImage(lessonId);
    const creds = JSON.parse(localStorage.getItem("nursenest-credentials") || "{}");
    try {
      const reqRes = await fetch("/api/uploads/request-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: file.name, size: file.size, contentType: file.type || "image/png" }),
      });
      if (!reqRes.ok) throw new Error("Failed to get upload URL");
      const { uploadURL, objectPath } = await reqRes.json();
      const uploadRes = await fetch(uploadURL, { method: "PUT", body: file, headers: { "Content-Type": file.type || "image/png" } });
      if (!uploadRes.ok) throw new Error("Upload failed");
      const saveRes = await fetch(`/api/site-images/${encodeURIComponent(`lesson-${lessonId}`)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: objectPath, username: creds.username, password: creds.password }),
      });
      if (!saveRes.ok) throw new Error("Save failed");
      toast({ title: "Lesson image updated" });
      refreshImages();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setUploadingImage(null);
    }
  };

  const removeLessonImage = async (lessonId: string) => {
    const creds = JSON.parse(localStorage.getItem("nursenest-credentials") || "{}");
    try {
      const res = await fetch(`/api/site-images/${encodeURIComponent(`lesson-${lessonId}`)}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: creds.username, password: creds.password }),
      });
      if (!res.ok) throw new Error("Delete failed");
      toast({ title: "Lesson image removed" });
      refreshImages();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  return (
    <Card id={`system-${system.id}`} className="border-none shadow-md hover:shadow-lg transition-all overflow-hidden bg-white scroll-mt-24">
      {systemImg && (
        <div className={cn("relative h-24 overflow-hidden", system.bgColor)}>
          <AdminImageOverlay
            imageKey={`lesson-system-${system.id}`}
            src={systemImg}
            alt={system.title}
            isAdmin={isAdmin}
            className="w-full h-full"
            imgClassName="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent pointer-events-none" />
        </div>
      )}
      <CardHeader className={cn("flex flex-row items-center gap-3 py-3 px-4", !systemImg && system.bgColor)}>
        <div className={cn("p-2 rounded-lg bg-white shadow-sm", system.color)}>
          <system.icon className="w-4 h-4" />
        </div>
        <CardTitle className="text-base font-bold text-gray-900">{system.title}</CardTitle>
        <span className="ml-auto text-xs text-gray-400 font-normal">{system.diseases.length}</span>
      </CardHeader>
      <CardContent className="pt-3 px-4 pb-4">
        <CollapsibleLessonList diseases={system.diseases} systemId={system.id}>
          {(disease: any) => {
            const difficulty = getDifficulty(disease.id, tier);
            const overrideName = lessonOverrides?.[disease.id]?.title;
            const displayName = overrideName || getLessonTitle(disease.id, language) || disease.name;
            const lessonImgUrl = getImageUrl(`lesson-${disease.id}`, "");
            const isEditingThis = editingLessonId === disease.id;
            return (
              <div 
                key={disease.id}
                data-testid={`lesson-card-${disease.id}`}
                onClick={() => !isEditingThis && disease.status === "Available" && onSelect(disease.id)}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-lg border transition-all group",
                  isEditingThis ? "border-primary/30 bg-primary/5" :
                  disease.status === "Available" 
                    ? "border-primary/10 bg-primary/5 hover:bg-primary/10 cursor-pointer" 
                    : "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                )}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  {lessonImgUrl ? (
                    <img src={lessonImgUrl} alt={displayName} className="w-7 h-7 rounded object-cover shrink-0" data-testid={`img-lesson-${disease.id}`} />
                  ) : (
                    <BookOpen className={cn("w-4 h-4 shrink-0", disease.status === "Available" ? "text-primary" : "text-gray-400")} />
                  )}
                  {isEditingThis ? (
                    <div className="flex items-center gap-2 min-w-0 flex-1" onClick={(e) => e.stopPropagation()}>
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="h-8 text-sm font-medium flex-1"
                        autoFocus
                        data-testid={`input-edit-lesson-name-${disease.id}`}
                        onKeyDown={(e) => { if (e.key === "Enter" && editName.trim()) saveLessonName(disease.id, editName.trim()); if (e.key === "Escape") setEditingLessonId(null); }}
                      />
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0" disabled={savingName || !editName.trim()} onClick={() => saveLessonName(disease.id, editName.trim())} data-testid={`button-save-lesson-name-${disease.id}`}>
                        {savingName ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setEditingLessonId(null)} data-testid={`button-cancel-edit-${disease.id}`}>
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <span className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                      {displayName}
                    </span>
                  )}
                  {isAdmin && completeLessons && completeLessons.has(disease.id) && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" data-testid={`check-complete-${disease.id}`} />
                  )}
                  {isAdmin && completeLessons && !completeLessons.has(disease.id) && (
                    <MinusCircle className="w-4 h-4 text-amber-400 shrink-0" data-testid={`check-incomplete-${disease.id}`} />
                  )}
                </div>
                <div className="flex items-center gap-1.5 shrink-0 ml-1">
                  {isAdmin && !isEditingThis && (
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => { e.stopPropagation(); setEditingLessonId(disease.id); setEditName(displayName); }}
                        className="w-6 h-6 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center hover:bg-blue-50"
                        title="Edit lesson name"
                        data-testid={`button-edit-lesson-name-${disease.id}`}
                      >
                        <Pencil className="w-3 h-3 text-blue-600" />
                      </button>
                      <label
                        className="w-6 h-6 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center hover:bg-green-50 cursor-pointer"
                        title={lessonImgUrl ? "Change lesson image" : "Add lesson image"}
                        data-testid={`button-upload-lesson-image-${disease.id}`}
                      >
                        {uploadingImage === disease.id ? (
                          <Loader2 className="w-3 h-3 animate-spin text-gray-500" />
                        ) : (
                          <Upload className="w-3 h-3 text-green-600" />
                        )}
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadAndSaveLessonImage(disease.id, f); e.target.value = ""; }} />
                      </label>
                      {lessonImgUrl && (
                        <button
                          onClick={(e) => { e.stopPropagation(); if (confirm("Remove lesson image?")) removeLessonImage(disease.id); }}
                          className="w-6 h-6 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center hover:bg-red-50"
                          title="Remove lesson image"
                          data-testid={`button-remove-lesson-image-${disease.id}`}
                        >
                          <Trash2 className="w-3 h-3 text-red-500" />
                        </button>
                      )}
                    </div>
                  )}
                  <span className="hidden sm:flex items-center gap-0.5 text-[10px] text-gray-400" data-testid={`study-time-${disease.id}`}>
                    <Clock className="w-3 h-3" />
                    {estimateStudyTime(difficulty)}
                  </span>
                  <DifficultyBadge level={difficulty} />
                  {disease.status === "Available" ? (
                    <ChevronRight className="w-4 h-4 text-primary group-hover:translate-x-1 transition-transform" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </div>
              </div>
            );
          }}
        </CollapsibleLessonList>
      </CardContent>
    </Card>
  );
}

const LESSON_ICON_MAP: Record<string, any> = {
  BookOpen, Heart, Brain, Dna, Activity, Pill, Stethoscope, Beaker, FlaskConical, Lightbulb,
  Droplets, Wind, Sparkles, GraduationCap, Target, Layers, AlertCircle, Baby, Users, Eye,
  ShieldAlert, Scissors, Bug, Thermometer, Flame, HeartHandshake, Bandage, Calculator, Microscope,
};

function CustomSystemCard({ system, tier, isAdmin, onSelect, onEdit, onDelete, lessonOverrides, onOverridesChange }: {
  system: any; tier: string; isAdmin: boolean; onSelect: (id: string) => void; onEdit: () => void; onDelete: () => void; lessonOverrides?: Record<string, any>; onOverridesChange?: () => void;
}) {
  const { language } = useI18n();
  const lessons = (system.lessons || []) as { id: string; name: string; status?: string }[];
  const IconComp = LESSON_ICON_MAP[system.icon] || BookOpen;
  const { getImageUrl, refresh: refreshImages } = useSiteImages();
  const [editingLessonId, setEditingLessonId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [savingName, setSavingName] = useState(false);
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);
  const { toast } = useToast();

  const saveLessonName = async (lessonId: string, newName: string) => {
    const creds = JSON.parse(localStorage.getItem("nursenest-credentials") || "{}");
    setSavingName(true);
    try {
      const existing = lessonOverrides?.[lessonId] || {};
      const res = await fetch(`/api/lesson-overrides/${lessonId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...existing, title: newName, username: creds.username, password: creds.password }),
      });
      if (!res.ok) throw new Error("Save failed");
      toast({ title: "Lesson name updated" });
      setEditingLessonId(null);
      onOverridesChange?.();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setSavingName(false);
    }
  };

  const uploadAndSaveLessonImage = async (lessonId: string, file: File) => {
    setUploadingImage(lessonId);
    const creds = JSON.parse(localStorage.getItem("nursenest-credentials") || "{}");
    try {
      const reqRes = await fetch("/api/uploads/request-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: file.name, size: file.size, contentType: file.type || "image/png" }),
      });
      if (!reqRes.ok) throw new Error("Failed to get upload URL");
      const { uploadURL, objectPath } = await reqRes.json();
      const uploadRes = await fetch(uploadURL, { method: "PUT", body: file, headers: { "Content-Type": file.type || "image/png" } });
      if (!uploadRes.ok) throw new Error("Upload failed");
      const saveRes = await fetch(`/api/site-images/${encodeURIComponent(`lesson-${lessonId}`)}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: objectPath, username: creds.username, password: creds.password }),
      });
      if (!saveRes.ok) throw new Error("Save failed");
      toast({ title: "Lesson image updated" });
      refreshImages();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setUploadingImage(null);
    }
  };

  const removeLessonImage = async (lessonId: string) => {
    const creds = JSON.parse(localStorage.getItem("nursenest-credentials") || "{}");
    try {
      const res = await fetch(`/api/site-images/${encodeURIComponent(`lesson-${lessonId}`)}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: creds.username, password: creds.password }),
      });
      if (!res.ok) throw new Error("Delete failed");
      toast({ title: "Lesson image removed" });
      refreshImages();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  return (
    <Card className="border-none shadow-md hover:shadow-lg transition-all overflow-hidden bg-white relative group">
      {system.imageUrl && (
        <div className={cn("relative h-24 overflow-hidden", system.bgColor || "bg-gray-50")}>
          <img src={system.imageUrl} alt={system.title} className="w-full h-full object-cover opacity-80" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
        </div>
      )}
      <CardHeader className={cn("flex flex-row items-center gap-3 py-3 px-4", !system.imageUrl && (system.bgColor || "bg-gray-50"))}>
        <div className={cn("p-2 rounded-lg bg-white shadow-sm", system.color || "text-primary")}>
          <IconComp className="w-4 h-4" />
        </div>
        <CardTitle className="text-base font-bold text-gray-900">{system.title}</CardTitle>
        <span className="ml-auto text-xs text-gray-400 font-normal">{lessons.length}</span>
      </CardHeader>
      <CardContent className="pt-3 px-4 pb-4">
        <CollapsibleLessonList diseases={lessons.map((l, i) => ({ ...l, name: l.name || l.id || `lesson-${i}` }))} systemId={system.id || "custom"}>
          {(disease: any) => {
            const idx = lessons.findIndex(l => l.id === disease.id);
            const overrideName = lessonOverrides?.[disease.id]?.title;
            const displayName = overrideName || getLessonTitle(disease.id, language) || disease.name;
            const lessonImgUrl = disease.id ? getImageUrl(`lesson-${disease.id}`, "") : "";
            const isEditingThis = editingLessonId === disease.id;
            return (
              <div
                key={disease.id || idx}
                data-testid={`custom-lesson-card-${disease.id || idx}`}
                onClick={() => !isEditingThis && disease.id && onSelect(disease.id)}
                className={cn("flex items-center justify-between px-3 py-2 rounded-lg border transition-all group/lesson border-primary/10 bg-primary/5 hover:bg-primary/10", isEditingThis ? "" : "cursor-pointer")}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  {lessonImgUrl ? (
                    <img src={lessonImgUrl} alt={displayName} className="w-7 h-7 rounded object-cover shrink-0" data-testid={`img-lesson-${disease.id}`} />
                  ) : (
                    <BookOpen className="w-4 h-4 shrink-0 text-primary" />
                  )}
                  {isEditingThis ? (
                    <div className="flex items-center gap-2 min-w-0 flex-1" onClick={(e) => e.stopPropagation()}>
                      <Input
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="h-8 text-sm font-medium flex-1"
                        autoFocus
                        data-testid={`input-edit-lesson-name-${disease.id}`}
                        onKeyDown={(e) => { if (e.key === "Enter" && editName.trim()) saveLessonName(disease.id, editName.trim()); if (e.key === "Escape") setEditingLessonId(null); }}
                      />
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0" disabled={savingName || !editName.trim()} onClick={() => saveLessonName(disease.id, editName.trim())} data-testid={`button-save-lesson-name-${disease.id}`}>
                        {savingName ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => setEditingLessonId(null)}>
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <span className="text-sm font-medium text-gray-900 truncate">{displayName}</span>
                  )}
                </div>
                <div className="flex items-center gap-1 shrink-0 ml-2">
                  {isAdmin && !isEditingThis && disease.id && (
                    <div className="flex items-center gap-1 opacity-0 group-hover/lesson:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => { e.stopPropagation(); setEditingLessonId(disease.id); setEditName(displayName); }}
                        className="w-6 h-6 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center hover:bg-blue-50"
                        title="Edit lesson name"
                        data-testid={`button-edit-lesson-name-${disease.id}`}
                      >
                        <Pencil className="w-3 h-3 text-blue-600" />
                      </button>
                      <label
                        className="w-6 h-6 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center hover:bg-green-50 cursor-pointer"
                        title={lessonImgUrl ? "Change lesson image" : "Add lesson image"}
                        data-testid={`button-upload-lesson-image-${disease.id}`}
                      >
                        {uploadingImage === disease.id ? (
                          <Loader2 className="w-3 h-3 animate-spin text-gray-500" />
                        ) : (
                          <Upload className="w-3 h-3 text-green-600" />
                        )}
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadAndSaveLessonImage(disease.id, f); e.target.value = ""; }} />
                      </label>
                      {lessonImgUrl && (
                        <button
                          onClick={(e) => { e.stopPropagation(); if (confirm("Remove lesson image?")) removeLessonImage(disease.id); }}
                          className="w-6 h-6 rounded-full bg-white shadow border border-gray-200 flex items-center justify-center hover:bg-red-50"
                          title="Remove lesson image"
                          data-testid={`button-remove-lesson-image-${disease.id}`}
                        >
                          <Trash2 className="w-3 h-3 text-red-500" />
                        </button>
                      )}
                    </div>
                  )}
                  <ChevronRight className="w-5 h-5 text-primary group-hover/lesson:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          }}
        </CollapsibleLessonList>
      </CardContent>
      {isAdmin && (
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            className="w-7 h-7 rounded-full bg-white/90 shadow-md border border-gray-200 flex items-center justify-center hover:bg-blue-50"
            data-testid={`button-edit-system-${system.id}`}
          >
            <Pencil className="w-3 h-3 text-blue-600" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(); }}
            className="w-7 h-7 rounded-full bg-white/90 shadow-md border border-gray-200 flex items-center justify-center hover:bg-red-50"
            data-testid={`button-delete-system-${system.id}`}
          >
            <Trash2 className="w-3 h-3 text-red-600" />
          </button>
        </div>
      )}
    </Card>
  );
}

function AddSystemCard({ onClick }: { onClick: () => void }) {
  return (
    <Card
      className="border-2 border-dashed border-primary/30 hover:border-primary/50 transition-all cursor-pointer bg-white/50 flex items-center justify-center min-h-[200px]"
      onClick={onClick}
      data-testid="button-add-system"
    >
      <div className="text-center space-y-3 p-6">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto hover:bg-primary/20 transition-colors">
          <Plus className="w-7 h-7 text-primary" />
        </div>
        <div>
          <p className="font-semibold text-gray-900">Add System</p>
          <p className="text-xs text-gray-500 mt-1">Create a new lesson system</p>
        </div>
      </div>
    </Card>
  );
}

const SYSTEM_ICON_OPTIONS = [
  { name: "BookOpen", icon: BookOpen },
  { name: "Heart", icon: Heart },
  { name: "Brain", icon: Brain },
  { name: "Activity", icon: Activity },
  { name: "Pill", icon: Pill },
  { name: "Stethoscope", icon: Stethoscope },
  { name: "Beaker", icon: Beaker },
  { name: "FlaskConical", icon: FlaskConical },
  { name: "Lightbulb", icon: Lightbulb },
  { name: "Droplets", icon: Droplets },
  { name: "Wind", icon: Wind },
  { name: "AlertCircle", icon: AlertCircle },
  { name: "Baby", icon: Baby },
  { name: "Eye", icon: Eye },
  { name: "Scissors", icon: Scissors },
  { name: "Bug", icon: Bug },
];

const SYSTEM_COLOR_OPTIONS = [
  { label: "Red", color: "text-red-500", bg: "bg-red-50" },
  { label: "Blue", color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Green", color: "text-green-500", bg: "bg-green-50" },
  { label: "Purple", color: "text-purple-500", bg: "bg-purple-50" },
  { label: "Amber", color: "text-amber-500", bg: "bg-amber-50" },
  { label: "Teal", color: "text-teal-500", bg: "bg-teal-50" },
  { label: "Rose", color: "text-rose-500", bg: "bg-rose-50" },
  { label: "Indigo", color: "text-indigo-500", bg: "bg-indigo-50" },
];

function LessonSystemModal({ system, defaultTier, onClose, onSaved }: {
  system: any; defaultTier: string; onClose: () => void; onSaved: (mod: any) => void;
}) {
  const [title, setTitle] = useState(system?.title || "");
  const [icon, setIcon] = useState(system?.icon || "BookOpen");
  const [colorIdx, setColorIdx] = useState(() => {
    const idx = SYSTEM_COLOR_OPTIONS.findIndex((c) => c.color === system?.color);
    return idx >= 0 ? idx : 0;
  });
  const [tier, setTier] = useState(system?.tier || defaultTier);
  const [imageUrl, setImageUrl] = useState(system?.imageUrl || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lessons, setLessons] = useState<{ id: string; name: string; status: string }[]>(
    system?.lessons ? (system.lessons as any[]).map((l: any) => ({ ...l, status: l.status || "Available" })) : []
  );
  const [newLessonName, setNewLessonName] = useState("");
  const [newLessonId, setNewLessonId] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const res = await fetch("/api/uploads/request-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: file.name, size: file.size, contentType: file.type || "image/png" }),
      });
      if (!res.ok) throw new Error("Failed to get upload URL");
      const { uploadURL, objectPath } = await res.json();
      const uploadRes = await fetch(uploadURL, { method: "PUT", body: file, headers: { "Content-Type": file.type || "image/png" } });
      if (!uploadRes.ok) throw new Error("Upload failed");
      setImageUrl(objectPath);
    } catch (e: any) {
      toast({ title: "Upload error", description: e.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim()) { toast({ title: "Title required", variant: "destructive" }); return; }
    setSaving(true);
    const creds = JSON.parse(localStorage.getItem("nursenest-credentials") || "{}");
    const selectedColor = SYSTEM_COLOR_OPTIONS[colorIdx];
    const body = {
      page: "lessons",
      title: title.trim(),
      icon,
      color: selectedColor.color,
      bgColor: selectedColor.bg,
      imageUrl: imageUrl || null,
      tier,
      lessons,
      username: creds.username,
      password: creds.password,
    };
    try {
      const url = system ? `/api/custom-modules/${system.id}` : "/api/custom-modules";
      const method = system ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      if (!res.ok) throw new Error("Save failed");
      const saved = await res.json();
      toast({ title: system ? "System updated" : "System created" });
      onSaved(saved);
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 space-y-5 my-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()} data-testid="modal-lesson-system">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{system ? "Edit System" : "Add New System"}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">System Title *</label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Endocrine System" data-testid="input-system-title" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Tier</label>
            <div className="flex gap-2">
              {["rpn", "rn", "np"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTier(t)}
                  className={cn("px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all uppercase", tier === t ? "border-primary bg-primary/10 text-primary" : "border-gray-200 text-gray-500 hover:border-gray-300")}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Icon</label>
            <div className="flex flex-wrap gap-2">
              {SYSTEM_ICON_OPTIONS.map((opt) => (
                <button
                  key={opt.name}
                  onClick={() => setIcon(opt.name)}
                  className={cn("w-9 h-9 rounded-lg flex items-center justify-center border-2 transition-all", icon === opt.name ? "border-primary bg-primary/10" : "border-gray-200 hover:border-gray-300")}
                  title={opt.name}
                >
                  <opt.icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Color</label>
            <div className="flex flex-wrap gap-2">
              {SYSTEM_COLOR_OPTIONS.map((opt, idx) => (
                <button
                  key={opt.label}
                  onClick={() => setColorIdx(idx)}
                  className={cn("px-3 py-1.5 rounded-lg text-sm font-medium border-2 transition-all", opt.bg, opt.color, colorIdx === idx ? "border-current ring-1 ring-current" : "border-transparent")}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">System Image</label>
            {imageUrl && (
              <div className="mb-2 rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                <img src={imageUrl} alt="System" className="w-full h-32 object-cover" />
              </div>
            )}
            <div className="flex gap-2">
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }} />
              <Button variant="outline" size="sm" onClick={() => fileRef.current?.click()} disabled={uploading} className="gap-2">
                {uploading ? <><Loader2 className="w-3 h-3 animate-spin" /> Uploading...</> : <><Upload className="w-3 h-3" /> Upload</>}
              </Button>
              <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Or paste image URL" className="flex-1 text-sm h-9" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Lessons</label>
            <div className="space-y-2">
              {lessons.map((l, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                  <BookOpen className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                  <span className="text-sm text-gray-700 flex-1">{l.name}</span>
                  <span className="text-xs text-gray-400">{l.id}</span>
                  <button onClick={() => setLessons(lessons.filter((_, i) => i !== idx))} className="text-red-400 hover:text-red-600">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <div className="flex gap-2">
                <Input value={newLessonName} onChange={(e) => setNewLessonName(e.target.value)} placeholder="Lesson name" className="flex-1 text-sm h-9" data-testid="input-system-lesson-name" />
                <Input value={newLessonId} onChange={(e) => setNewLessonId(e.target.value)} placeholder="lesson-slug" className="w-32 text-sm h-9" data-testid="input-system-lesson-id" />
                <Button
                  variant="outline"
                  size="sm"
                  className="h-9"
                  disabled={!newLessonName.trim()}
                  onClick={() => {
                    if (newLessonName.trim()) {
                      const slug = newLessonId.trim() || newLessonName.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
                      setLessons([...lessons, { id: slug, name: newLessonName.trim(), status: "Available" }]);
                      setNewLessonName("");
                      setNewLessonId("");
                    }
                  }}
                  data-testid="button-add-system-lesson"
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button onClick={handleSave} disabled={saving || !title.trim()} className="flex-1 gap-2" data-testid="button-save-system">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {system ? "Save Changes" : "Create System"}
          </Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
