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
  Lock
} from "lucide-react";

const systems = [
  {
    id: "cardiovascular",
    title: "Cardiovascular System",
    icon: Heart,
    color: "text-red-500",
    bgColor: "bg-red-50",
    diseases: [
      { id: "heart-failure", name: "Heart Failure", status: "Available" },
      { id: "hypertension", name: "Hypertension", status: "Available" },
      { id: "mi", name: "Myocardial Infarction (MI)", status: "Available" },
      { id: "afib", name: "Atrial Fibrillation", status: "Available" }
    ]
  },
  {
    id: "endocrine",
    title: "Endocrine System",
    icon: Droplets,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    diseases: [
      { id: "diabetes-t1", name: "Diabetes Type 1", status: "Available" },
      { id: "diabetes-t2", name: "Diabetes Type 2", status: "Available" },
      { id: "dka", name: "DKA (Ketoacidosis)", status: "Available" },
      { id: "hhs", name: "HHS (Hyperglycemic State)", status: "Available" }
    ]
  },
  {
    id: "neurological",
    title: "Neurological System",
    icon: Brain,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    diseases: [
      { id: "stroke", name: "Ischemic Stroke", status: "Available" },
      { id: "tia", name: "TIA (Mini-Stroke)", status: "Available" }
    ]
  },
  {
    id: "respiratory",
    title: "Respiratory System",
    icon: Wind,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    diseases: [
      { id: "copd", name: "COPD", status: "Locked" },
      { id: "asthma", name: "Asthma", status: "Locked" }
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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">RPN Lessons: Pathophysiology</h1>
          <p className="text-lg text-gray-600">Master core nursing concepts arranged by body systems for REX-PN success.</p>
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
                          : "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <BookOpen className={cn("w-5 h-5", disease.status === "Available" ? "text-primary" : "text-gray-400")} />
                        <span className="font-medium text-gray-900">{disease.name}</span>
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
