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
  Users
} from "lucide-react";

const systems = [
  {
    id: "pediatrics",
    title: "Pediatric Mastery",
    icon: Baby,
    color: "text-pink-500",
    bgColor: "bg-pink-50",
    diseases: [
      { id: "peds-cardiac-basics", name: "⭐ Pediatric Cardiac Principles", status: "Available" },
      { id: "peds-chf", name: "Pediatric Heart Failure", status: "Available" },
      { id: "congenital-defects", name: "Congenital Heart Defects", status: "Available" },
      { id: "peds-hypoxia", name: "⭐ Pediatric Hypoxia & WOB", status: "Available" },
      { id: "bronchiolitis", name: "Bronchiolitis (RSV)", status: "Available" },
      { id: "croup", name: "Croup (Barking Cough)", status: "Available" },
      { id: "epiglottitis", name: "🚨 Epiglottitis Emergency", status: "Available" }
    ]
  },
  {
    id: "lifespan",
    title: "Across the Lifespan",
    icon: Users,
    color: "text-indigo-500",
    bgColor: "bg-indigo-50",
    diseases: [
      { id: "heart-failure", name: "Heart Failure (Adult vs Peds)", status: "Available" },
      { id: "hypertension", name: "Hypertension (All Ages)", status: "Available" },
      { id: "diabetes-lifespan", name: "Diabetes Across Ages", status: "Available" }
    ]
  },
  {
    id: "cardiovascular",
    title: "Cardiovascular System",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-50",
    diseases: [
      { id: "cardio-pharma", name: "💊 Cardiovascular Pharmacology", status: "Available" },
      { id: "mi", name: "Myocardial Infarction (MI)", status: "Available" },
      { id: "afib", name: "Atrial Fibrillation", status: "Available" },
      { id: "shock", name: "Shock States (Hypovolemic/Septic)", status: "Available" }
    ]
  },
  {
    id: "respiratory",
    title: "Respiratory System",
    icon: Wind,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    diseases: [
      { id: "respiratory-pharma", name: "💊 Respiratory Pharmacology", status: "Available" },
      { id: "respiratory-basics", name: "⭐ Hypoxia & Breath Sounds", status: "Available" },
      { id: "copd", name: "COPD (High Yield)", status: "Available" },
      { id: "asthma", name: "Asthma", status: "Available" },
      { id: "pneumonia", name: "Pneumonia", status: "Available" }
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">REX-PN Pathophysiology</h1>
          <p className="text-lg text-gray-600">Master core nursing concepts across all ages for exam success.</p>
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
                  {system.diseases.map((disease) => (
                    <div 
                      key={disease.id}
                      onClick={() => disease.status === "Available" && setLocation(`/lessons/${disease.id}`)}
                      className={cn(
                        "flex items-center justify-between p-4 rounded-xl border transition-all cursor-pointer group",
                        disease.status === "Available" 
                          ? "border-primary/20 bg-primary/5 hover:bg-primary/10" 
                          : "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed",
                        (disease.name.includes("💊") || disease.name.includes("⭐") || disease.name.includes("🚨")) && "border-primary/30 bg-primary/10 shadow-sm"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {disease.name.includes("💊") ? (
                          <Pill className="w-5 h-5 text-primary" />
                        ) : (disease.name.includes("⭐") || disease.name.includes("🚨")) ? (
                          <AlertCircle className={cn("w-5 h-5", disease.name.includes("🚨") ? "text-red-500" : "text-primary")} />
                        ) : (
                          <BookOpen className={cn("w-5 h-5", disease.status === "Available" ? "text-primary" : "text-gray-400")} />
                        )}
                        <span className={cn("font-medium", (disease.name.includes("💊") || disease.name.includes("⭐") || disease.name.includes("🚨")) ? "text-primary-foreground font-bold" : "text-gray-900")}>
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
          ))}
        </div>
      </main>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
