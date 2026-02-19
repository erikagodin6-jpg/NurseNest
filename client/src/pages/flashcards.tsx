import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, RefreshCw } from "lucide-react";

type Flashcard = {
  question: string;
  answer: string;
  category: string;
};

const flashcards: Flashcard[] = [
  { question: "What is the priority post-op for AAA repair?", answer: "Monitor distal peripheral pulses and ensure renal perfusion (Urine output > 30mL/hr).", category: "RN Cardiovascular" },
  { question: "Target 'door-to-PCI' time for STEMI?", answer: "90 minutes from first medical contact.", category: "RN Cardiovascular" },
  { question: "Clinical triad for AAA rupture?", answer: "Intense back/flank pain, pulsatile abdominal mass, and hypovolemic shock (low BP, high HR).", category: "RN Cardiovascular" },
  { question: "Difference between Systolic and Diastolic HF?", answer: "Systolic (Reduced EF) has thin, weak walls; Diastolic (Preserved EF) has thick, stiff walls.", category: "RN Cardiovascular" },
  { question: "What is a 'Strawberry Tongue' a sign of?", answer: "Kawasaki Disease (acute phase vasculitis).", category: "RN Pediatrics" },
  { question: "Wait time for live vaccines after IVIG?", answer: "Postpone live vaccines (MMR, Varicella) for 11 months post-treatment.", category: "RN Pediatrics" },
  { question: "Is Cerebral Palsy progressive?", answer: "No, it is a nonprogressive (static) brain injury, though physical symptoms change as the child grows.", category: "RN Pediatrics" },
  { question: "ANC level for severe neutropenic precautions?", answer: "ANC < 500 (or < 0.5 x 10^9/L in Canada).", category: "RN Oncology" },
  { question: "Dietary restrictions for Neutropenic Precautions?", answer: "Avoid raw fruits/vegetables, uncooked foods, and fresh flowers.", category: "RN Oncology" },
  { question: "Priority for a client with sudden severe back pain post-AAA repair?", answer: "Assess for graft leakage (increasing girth, shock signs).", category: "RN Cardiovascular" }
];

export default function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [region, setRegion] = useState<"US" | "CA">("CA");

  useEffect(() => {
    setRegion((localStorage.getItem("nursenest-region") as "US" | "CA") || "CA");
  }, []);

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 py-12 w-full flex-1 flex flex-col">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mastery Flashcards</h1>
          <p className="text-gray-600">Quick clinical recall for RN and RPN students ({region === "CA" ? "Canadian Data" : "US Data"}).</p>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center gap-12">
          <div 
            className="w-full max-w-2xl h-80 relative cursor-pointer group"
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <div className={`w-full h-full transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
              {/* Front */}
              <Card className="absolute inset-0 w-full h-full backface-hidden bg-white border-2 border-primary/20 flex flex-col items-center justify-center p-12 shadow-xl rounded-3xl">
                <span className="absolute top-6 left-6 text-xs font-bold text-primary uppercase tracking-widest">{currentCard.category}</span>
                <h2 className="text-2xl font-bold text-gray-900 text-center">{currentCard.question}</h2>
                <div className="absolute bottom-6 flex items-center gap-2 text-gray-400 text-sm font-medium">
                  <RefreshCw className="w-4 h-4" />
                  Tap to flip
                </div>
              </Card>

              {/* Back */}
              <Card className="absolute inset-0 w-full h-full backface-hidden [transform:rotateY(180deg)] bg-primary text-white flex flex-col items-center justify-center p-12 shadow-xl rounded-3xl">
                <h2 className="text-xl font-medium text-center leading-relaxed">{currentCard.answer}</h2>
                <span className="absolute bottom-6 text-white/60 text-sm">Clinical Reasoning</span>
              </Card>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <Button variant="outline" size="lg" onClick={handlePrev} className="rounded-full h-14 w-14 p-0">
              <ChevronLeft className="w-6 h-6" />
            </Button>
            <div className="text-gray-500 font-bold">
              {currentIndex + 1} / {flashcards.length}
            </div>
            <Button variant="outline" size="lg" onClick={handleNext} className="rounded-full h-14 w-14 p-0">
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
