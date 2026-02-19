import { useState } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Leaf
} from "lucide-react";

const systems = [
  {
    id: "pediatrics",
    title: "Pediatric Mastery",
    icon: Baby,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    diseases: [
      { id: "peds-neuro", name: "⭐ Pediatric Neuro & Seizures", status: "Available" },
      { id: "peds-cardiac-basics", name: "⭐ Pediatric Cardiac Principles", status: "Available" },
      { id: "epiglottitis", name: "🚨 Epiglottitis Emergency", status: "Available" },
      { id: "peds-heent", name: "Otitis Media & Conjunctivitis", status: "Available" }
    ]
  },
  {
    id: "neurological",
    title: "Neurological System",
    icon: Brain,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    diseases: [
      { id: "neuro-basics", name: "⭐ Early vs Late Deterioration", status: "Available" },
      { id: "stroke", name: "Stroke (FAST & Time)", status: "Available" },
      { id: "delirium-dementia", name: "Delirium vs Dementia", status: "Available" },
      { id: "parkinsons", name: "Parkinson's & Mobility", status: "Available" }
    ]
  },
  {
    id: "heent-skin",
    title: "HEENT & Skin",
    icon: Eye,
    color: "text-emerald-500",
    bgColor: "bg-emerald-50",
    diseases: [
      { id: "heent-emergencies", name: "🚨 HEENT Emergencies", status: "Available" },
      { id: "vision-hearing", name: "Vision & Hearing Safety", status: "Available" },
      { id: "skin-integrity", name: "Pressure Injuries & Cellulitis", status: "Available" },
      { id: "epistaxis", name: "Epistaxis (Nosebleeds)", status: "Available" }
    ]
  },
  {
    id: "meds-labs",
    title: "Pharmacology & Labs",
    icon: Beaker,
    color: "text-amber-500",
    bgColor: "bg-amber-50",
    diseases: [
      { id: "abg-mastery", name: "⭐ ABG Analysis Made Easy", status: "Available" },
      { id: "high-yield-labs", name: "Critical Lab Results", status: "Available" },
      { id: "supplement-safety", name: "🌿 Supplement Interactions", status: "Available" },
      { id: "medication-safety", name: "💊 Core Med Safety", status: "Available" }
    ]
  },
  {
    id: "gi-gu-msk",
    title: "GI, GU & MSK",
    icon: Activity,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    diseases: [
      { id: "gi-emergencies", name: "GI Bleeding & N/V", status: "Available" },
      { id: "gu-infections", name: "UTI & Renal Safety", status: "Available" },
      { id: "msk-safety", name: "Fractures & Neurovascular", status: "Available" },
      { id: "sepsis", name: "🚨 Sepsis Recognition", status: "Available" }
    ]
  },
  {
    id: "lifespan",
    title: "Across the Lifespan",
    icon: Users,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
    diseases: [
      { id: "heart-failure", name: "Heart Failure (All Ages)", status: "Available" },
      { id: "hypertension", name: "Hypertension (All Ages)", status: "Available" },
      { id: "respiratory-lifespan", name: "Hypoxia Across Ages", status: "Available" }
    ]
  }
];

export default function Lessons() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">REX-PN Pathophysiology Mastery</h1>
          <p className="text-lg text-gray-600">Comprehensive clinical recognition and safety logic for RPN/LVN students.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {systems.map((system) => (
            <Card key={system.id} className="border-none shadow-lg hover:shadow-xl transition-all overflow-hidden bg-white">
              <CardHeader className={cn("flex flex-row items-center gap-4 pb-2", system.bgColor)}>
                <div className={cn("p-3 rounded-xl bg-white shadow-sm", system.color)}>
                  <system.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl font-bold">{system.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-3">
                  {system.diseases.map((disease) => {
                    const isHighYield = disease.name.includes("💊") || disease.name.includes("⭐") || disease.name.includes("🚨") || disease.name.includes("🌿");
                    return (
                      <div 
                        key={disease.id}
                        onClick={() => disease.status === "Available" && setLocation(`/lessons/${disease.id}`)}
                        className={cn(
                          "flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group",
                          disease.status === "Available" 
                            ? "border-primary/20 bg-primary/5 hover:bg-primary/10" 
                            : "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed",
                          isHighYield ? "border-primary/30 bg-primary/10 shadow-sm" : ""
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {disease.name.includes("💊") ? (
                            <Pill className="w-5 h-5 text-primary" />
                          ) : (disease.name.includes("⭐") || disease.name.includes("🚨")) ? (
                            <AlertCircle className={cn("w-5 h-5", disease.name.includes("🚨") ? "text-red-500" : "text-primary")} />
                          ) : disease.name.includes("🌿") ? (
                            <Leaf className="w-5 h-5 text-emerald-600" />
                          ) : (
                            <BookOpen className={cn("w-5 h-5", disease.status === "Available" ? "text-primary" : "text-gray-400")} />
                          )}
                          <span className={cn("font-medium", isHighYield ? "text-primary-foreground font-bold" : "text-gray-900")}>
                            {disease.name}
                          </span>
                        </div>
                        {disease.status === "Available" ? (
                          <ChevronRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform" />
                        ) : (
                          <Lock className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
