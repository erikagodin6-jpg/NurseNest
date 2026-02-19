import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft, RefreshCw, CheckCircle2, XCircle, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import heartImg from "@/assets/images/heart-flashcard.png";
import pedsImg from "@/assets/images/peds-flashcard.png";
import oncologyImg from "@/assets/images/oncology-flashcard.png";

type Flashcard = {
  question: string;
  options: string[];
  correctIndex: number;
  rationale: string;
  category: string;
  image?: string;
};

const flashcards: Flashcard[] = [
  { 
    question: "What is the priority assessment for a client post-op following an Abdominal Aortic Aneurysm (AAA) repair?", 
    options: [
      "Assessing for bowel sounds in all four quadrants",
      "Monitoring distal peripheral pulses and hourly urine output",
      "Encouraging early ambulation within 2 hours",
      "Measuring abdominal girth once every 24 hours"
    ],
    correctIndex: 1,
    rationale: "Priority is ensuring the graft is patent and renal perfusion is maintained. Urine output must be >30mL/hr, and distal pulses ensure blood flow past the graft.",
    category: "RN Cardiovascular",
    image: heartImg
  },
  { 
    question: "A child with Kawasaki Disease is receiving IVIG. Which teaching is most important regarding live vaccines?", 
    options: [
      "Get live vaccines immediately after discharge",
      "Live vaccines should be avoided for 11 months",
      "Only inactivated vaccines are prohibited",
      "Live vaccines can be given after 2 weeks"
    ],
    correctIndex: 1,
    rationale: "IVIG contains high concentrations of antibodies that can interfere with the immune response to live vaccines like MMR and Varicella. Delay for 11 months.",
    category: "RN Pediatrics",
    image: pedsImg
  },
  { 
    question: "A client with Acute Lymphoblastic Leukemia (ALL) has an Absolute Neutrophil Count (ANC) of 350. Which action is the priority?", 
    options: [
      "Provide a diet rich in raw fruits and vegetables",
      "Administer a rectal suppository for constipation",
      "Implement strict neutropenic precautions",
      "Encourage the client to visit the hospital cafeteria"
    ],
    correctIndex: 2,
    rationale: "An ANC < 500 represents severe neutropenia. Strict precautions (no raw foods, no fresh flowers, limited visitors) are vital to prevent life-threatening infection.",
    category: "RN Oncology",
    image: oncologyImg
  },
  { 
    question: "What is the target 'door-to-PCI' time for a client presenting with a STEMI?", 
    options: [
      "30 minutes",
      "60 minutes",
      "90 minutes",
      "120 minutes"
    ],
    correctIndex: 2,
    rationale: "Clinical standards dictate a 90-minute target from first medical contact to percutaneous coronary intervention (PCI) to minimize myocardial damage.",
    category: "RN Cardiovascular",
    image: heartImg
  },
  { 
    question: "Which finding in a child suggests the 'acute phase' of Kawasaki Disease?", 
    options: [
      "Peeling of the skin on hands and feet",
      "High fever unresponsive to antibiotics",
      "Resolution of all clinical symptoms",
      "Decreased irritability and improved appetite"
    ],
    correctIndex: 1,
    rationale: "The acute phase is characterized by sudden high fever, irritability, strawberry tongue, and inflamed nodes. Peeling occurs in the subacute phase.",
    category: "RN Pediatrics",
    image: pedsImg
  }
];

export default function Flashcards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showRationale, setShowRationale] = useState(false);
  const [region, setRegion] = useState<"US" | "CA">("CA");

  useEffect(() => {
    setRegion((localStorage.getItem("nursenest-region") as "US" | "CA") || "CA");
  }, []);

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    setSelectedOption(null);
    setShowRationale(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setSelectedOption(null);
    setShowRationale(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  const handleOptionClick = (index: number) => {
    if (showRationale) return;
    setSelectedOption(index);
    setShowRationale(true);
  };

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans select-none print:hidden">
      <Navigation />
      
      <main className="max-w-5xl mx-auto px-4 py-12 w-full flex-1 flex flex-col items-center">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Mastery Flashcards</h1>
          <p className="text-gray-600">Multiple choice clinical reasoning ({region === "CA" ? "Canadian Data" : "US Data"}).</p>
          <div className="mt-2 flex items-center justify-center gap-2 text-xs text-amber-600 bg-amber-50 px-3 py-1 rounded-full border border-amber-100">
            <ShieldAlert className="w-3 h-3" />
            Security enabled: Screen capture restricted
          </div>
        </div>

        <div className="w-full grid lg:grid-cols-5 gap-8 flex-1 items-start">
          {/* Progress & Info */}
          <div className="lg:col-span-1 space-y-4">
             <Card className="border-none shadow-sm bg-white p-4">
               <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Progress</p>
               <p className="text-2xl font-bold text-primary">{currentIndex + 1} <span className="text-gray-300 text-lg">/ {flashcards.length}</span></p>
               <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
                 <div 
                   className="bg-primary h-full transition-all duration-500" 
                   style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
                 />
               </div>
             </Card>
             <Card className="border-none shadow-sm bg-indigo-50 p-4 border border-indigo-100">
               <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1">Category</p>
               <p className="text-sm font-bold text-indigo-900">{currentCard.category}</p>
             </Card>
          </div>

          {/* Flashcard Content */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-none shadow-xl bg-white overflow-hidden rounded-3xl min-h-[500px] flex flex-col">
              <div className="grid md:grid-cols-2 flex-1">
                {/* Visual Side */}
                <div className="bg-gray-50 flex flex-col items-center justify-center p-8 border-r border-gray-100 relative overflow-hidden">
                  <div className="absolute inset-0 opacity-5 pointer-events-none">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-primary rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent-foreground rounded-full blur-3xl" />
                  </div>
                  {currentCard.image ? (
                    <img 
                      src={currentCard.image} 
                      alt="Clinical Visualization" 
                      className="w-64 h-64 object-contain rounded-2xl shadow-sm hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-64 h-64 bg-gray-200 rounded-2xl flex items-center justify-center">
                       <Microscope className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <p className="mt-6 text-xs text-gray-400 font-medium text-center uppercase tracking-widest italic">
                    Clinical Pattern Recognition
                  </p>
                </div>

                {/* Interaction Side */}
                <div className="p-8 md:p-12 flex flex-col">
                  <h2 className="text-xl font-bold text-gray-900 mb-8 leading-snug">
                    {currentCard.question}
                  </h2>

                  <div className="space-y-3 flex-1">
                    {currentCard.options.map((option, idx) => {
                      const isSelected = selectedOption === idx;
                      const isCorrect = idx === currentCard.correctIndex;
                      
                      let variantClasses = "border-gray-100 hover:border-primary/30 hover:bg-primary/5 text-gray-700";
                      if (showRationale) {
                        if (isCorrect) variantClasses = "border-emerald-500 bg-emerald-50 text-emerald-900";
                        else if (isSelected) variantClasses = "border-rose-500 bg-rose-50 text-rose-900";
                        else variantClasses = "border-gray-50 bg-gray-50/50 text-gray-400 opacity-50";
                      }

                      return (
                        <button
                          key={idx}
                          disabled={showRationale}
                          onClick={() => handleOptionClick(idx)}
                          className={cn(
                            "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-start gap-3 text-sm font-medium relative group",
                            variantClasses
                          )}
                        >
                          <span className="shrink-0 w-6 h-6 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          {option}
                          {showRationale && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 ml-auto" />}
                          {showRationale && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500 shrink-0 ml-auto" />}
                        </button>
                      );
                    })}
                  </div>

                  {showRationale && (
                    <div className="mt-8 p-6 bg-primary/5 border border-primary/10 rounded-2xl animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3" />
                        Clinical Rationale
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed font-medium">
                        {currentCard.rationale}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Footer Controls */}
              <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
                <Button variant="ghost" size="sm" onClick={handlePrev} className="text-gray-400 hover:text-gray-900 gap-2">
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Button>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Nursing Excellence Series
                </div>
                <Button variant="ghost" size="sm" onClick={handleNext} className="text-primary hover:text-primary gap-2">
                  Next Card
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { display: none !important; }
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
      `}} />
    </div>
  );
}

function Microscope(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 18h8" />
      <path d="M3 22h18" />
      <path d="M14 22a7 7 0 1 0 0-14h-1" />
      <path d="M9 14h2" />
      <path d="M9 12a2 2 0 1 1-2-2V6h6v8h2" />
      <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
    </svg>
  )
}
