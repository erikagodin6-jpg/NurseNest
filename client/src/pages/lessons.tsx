import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
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
  ShieldAlert
} from "lucide-react";

const rpnSystems = [
  {
    id: "pediatrics",
    title: "Pediatric Mastery",
    icon: Baby,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    diseases: [
      { id: "peds-neuro", name: "Pediatric Neuro and Seizures", status: "Available" },
      { id: "peds-cardiac-basics", name: "Pediatric Cardiac Principles", status: "Available" },
      { id: "epiglottitis", name: "Epiglottitis Emergency", status: "Available" },
      { id: "peds-heent", name: "Otitis Media and Conjunctivitis", status: "Available" }
    ]
  },
  {
    id: "neurological",
    title: "Neurological System",
    icon: Brain,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    diseases: [
      { id: "neuro-basics", name: "Early vs Late Deterioration", status: "Available" },
      { id: "stroke", name: "Stroke FAST and Time", status: "Available" },
      { id: "delirium-dementia", name: "Delirium vs Dementia", status: "Available" },
      { id: "parkinsons", name: "Parkinson's and Mobility", status: "Available" }
    ]
  },
  {
    id: "heent-skin",
    title: "HEENT and Skin",
    icon: Eye,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
    diseases: [
      { id: "heent-emergencies", name: "HEENT Emergencies", status: "Available" },
      { id: "vision-hearing", name: "Vision and Hearing Safety", status: "Available" },
      { id: "skin-integrity", name: "Pressure Injuries and Cellulitis", status: "Available" },
      { id: "epistaxis", name: "Epistaxis Nosebleeds", status: "Available" }
    ]
  },
  {
    id: "lifespan",
    title: "Across the Lifespan",
    icon: Users,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
    diseases: [
      { id: "heart-failure", name: "Heart Failure All Ages", status: "Available" },
      { id: "hypertension", name: "Hypertension All Ages", status: "Available" },
      { id: "diabetes-lifespan", name: "Diabetes Across Ages", status: "Available" }
    ]
  }
];

const rnSystems = [
  {
    id: "cardiovascular-critical",
    title: "Critical Cardiovascular",
    icon: Heart,
    color: "text-red-600",
    bgColor: "bg-red-50",
    diseases: [
      { id: "aaa-rupture", name: "Abdominal Aortic Aneurysm", status: "Available" },
      { id: "mi-management", name: "Myocardial Infarction Mastery", status: "Available" },
      { id: "hf-advanced", name: "Advanced Heart Failure", status: "Available" },
      { id: "shock-syndromes", name: "Shock States (Septic/Cardio)", status: "Available" },
      { id: "dysrhythmias", name: "Lethal Dysrhythmias", status: "Available" }
    ]
  },
  {
    id: "respiratory-critical",
    title: "Critical Respiratory",
    icon: Wind,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    diseases: [
      { id: "copd-exacerbation", name: "COPD and Airway", status: "Available" },
      { id: "asthma-emergency", name: "Asthma & Status Asthmaticus", status: "Available" },
      { id: "pe-recognition", name: "Pulmonary Embolism", status: "Available" }
    ]
  },
  {
    id: "neurological-rn",
    title: "Advanced Neurological",
    icon: Brain,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    diseases: [
      { id: "increased-icp", name: "Increased ICP and TBI", status: "Available" },
      { id: "stroke-advanced", name: "Stroke & TIA Management", status: "Available" },
      { id: "seizure-safety", name: "Seizure Precautions", status: "Available" }
    ]
  },
  {
    id: "pediatric-complex",
    title: "Complex Pediatrics",
    icon: Baby,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    diseases: [
      { id: "peds-respiratory", name: "Bronchiolitis & Croup", status: "Available" },
      { id: "epiglottitis-peds", name: "Epiglottitis Emergency", status: "Available" },
      { id: "congenital-heart", name: "Congenital Heart Defects", status: "Available" },
      { id: "cp-management", name: "Cerebral Palsy and Spasticity", status: "Available" }
    ]
  },
  {
    id: "gi-gu-critical",
    title: "GI and Renal Critical",
    icon: Droplets,
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    diseases: [
      { id: "gi-bleed", name: "GI Bleeding & Obstruction", status: "Available" },
      { id: "aki-management", name: "Acute Kidney Injury", status: "Available" },
      { id: "electrolyte-safety", name: "Electrolyte Imbalances", status: "Available" }
    ]
  },
  {
    id: "ms-skin-safety",
    title: "MSK & Skin Integrity",
    icon: Activity,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    diseases: [
      { id: "compartment-syndrome", name: "Compartment Syndrome", status: "Available" },
      { id: "burn-management", name: "Burn Injury & Resuscitation", status: "Available" },
      { id: "pressure-injury", name: "Advanced Wound Care", status: "Available" }
    ]
  },
  {
    id: "oncology-hematology",
    title: "Hematology & Oncology",
    icon: ShieldAlert,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    diseases: [
      { id: "all-leukemia", name: "Acute Lymphoblastic Leukemia", status: "Available" },
      { id: "aml-leukemia", name: "Acute Myelogenous Leukemia", status: "Available" },
      { id: "sepsis-mastery", name: "Sepsis & SIRS Recognition", status: "Available" }
    ]
  },
  {
    id: "pharmacology-safety",
    title: "RN Pharmacology",
    icon: Pill,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    diseases: [
      { id: "cardiac-meds", name: "Vasoactive & Cardiac Meds", status: "Available" },
      { id: "insulin-safety", name: "Insulin & Diabetic Safety", status: "Available" },
      { id: "anticoagulant-safety", name: "Anticoagulation Mastery", status: "Available" },
      { id: "herbals-safety", name: "Herbal & Supplement Safety", status: "Available" }
    ]
  },
  {
    id: "endocrine-maternal",
    title: "Endocrine & Maternal",
    icon: Users,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    diseases: [
      { id: "siadh-di", name: "SIADH vs Diabetes Insipidus", status: "Available" },
      { id: "dka-hhns", name: "DKA & Hyperglycemic States", status: "Available" },
      { id: "preeclampsia", name: "Preeclampsia & Mag Safety", status: "Available" }
    ]
  },
  {
    id: "psych-crisis",
    title: "Psychiatry & Crisis",
    icon: Zap,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    diseases: [
      { id: "lithium-toxicity", name: "Lithium & Mood Stabilizers", status: "Available" },
      { id: "nms-serotonin", name: "NMS & Serotonin Syndrome", status: "Available" }
    ]
  },
  {
    id: "hematology-anemia",
    title: "Hematology & Immunology",
    icon: ShieldAlert,
    color: "text-red-700",
    bgColor: "bg-red-50",
    diseases: [
      { id: "sickle-cell", name: "Sickle Cell Crisis", status: "Available" },
      { id: "anemia-types", name: "Iron, Aplastic & Pernicious Anemia", status: "Available" },
      { id: "sle-autoimmune", name: "SLE (Lupus) & Autoimmune", status: "Available" }
    ]
  },
  {
    id: "gi-complications",
    title: "GI Complications",
    icon: Droplets,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
    diseases: [
      { id: "acute-abdomen", name: "Appendicitis & Cholecystitis", status: "Available" },
      { id: "pyloric-intussusception", name: "Pyloric Stenosis & Intussusception", status: "Available" },
      { id: "liver-cirrhosis", name: "Cirrhosis & Esophageal Varices", status: "Available" }
    ]
  }
];

const npSystems = [
  {
    id: "cardiovascular-advanced",
    title: "Advanced Cardiology",
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
    id: "respiratory-advanced",
    title: "Advanced Pulmonology",
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
    id: "neuro-advanced",
    title: "Advanced Neurology",
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
    id: "endo-metabolic-advanced",
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
    id: "renal-advanced",
    title: "Advanced Nephrology",
    icon: Droplets,
    color: "text-cyan-700",
    bgColor: "bg-cyan-50",
    diseases: [
      { id: "aki-management-np", name: "AKI: RIFLE Criteria & Dialysis", status: "Available" },
      { id: "electrolyte-safety-np", name: "Advanced Electrolyte Correction", status: "Available" }
    ]
  },
  {
    id: "hematology-advanced",
    title: "Advanced Hematology",
    icon: ShieldAlert,
    color: "text-orange-700",
    bgColor: "bg-orange-50",
    diseases: [
      { id: "sepsis-mastery-np", name: "Sepsis: Cytokine Storm & SOFA", status: "Available" },
      { id: "dic-management-np", name: "DIC: Coagulation Cascade", status: "Available" },
      { id: "transfusion-reactions-np", name: "Transfusion Reactions: Hemolytic vs Febrile", status: "Available" },
      { id: "tumor-lysis-np", name: "Tumor Lysis Syndrome: Uric Acid Crisis", status: "Available" }
    ]
  }
];

export default function Lessons() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("rn");

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
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
