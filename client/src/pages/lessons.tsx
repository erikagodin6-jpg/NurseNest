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
      { id: "kawasaki-critical", name: "Kawasaki Disease Vasculitis", status: "Available" }
    ]
  },
  {
    id: "pediatric-complex",
    title: "Complex Pediatrics",
    icon: Baby,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    diseases: [
      { id: "cp-management", name: "Cerebral Palsy and Spasticity", status: "Available" },
      { id: "peds-oncology", name: "Pediatric Oncology Basics", status: "Available" }
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
      { id: "aml-leukemia", name: "Acute Myelogenous Leukemia", status: "Available" }
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
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-[400px]">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-full p-1">
              <TabsTrigger value="rpn" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">RPN / LVN</TabsTrigger>
              <TabsTrigger value="rn" className="rounded-full data-[state=active]:bg-white data-[state=active]:shadow-sm">RN (NCLEX)</TabsTrigger>
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
