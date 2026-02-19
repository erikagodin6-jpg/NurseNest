import { useState, useMemo } from "react";
import { Link, useParams } from "wouter";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  Microscope, 
  AlertCircle, 
  Stethoscope, 
  Pill, 
  Lightbulb, 
  FileText,
  CheckCircle2,
  XCircle,
  Trophy,
  Activity,
  Heart,
  Droplets,
  Brain,
  Wind,
  Zap,
  Baby,
  Users
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type LessonContent = {
  title: string;
  cellular: { title: string; content: string };
  signs: { left: string[]; right: string[] };
  medications: { name: string; type: string; action: string; sideEffects: string; contra: string; pearl: string }[];
  pearls: string[];
  lifespan?: { title: string; content: string };
  quiz: { question: string; options: string[]; correct: number; rationale: string }[];
};

const contentMap: Record<string, LessonContent> = {
  "peds-cardiac-basics": {
    title: "Pediatric Cardiac Foundations",
    cellular: {
      title: "Pediatric vs Adult Compensation",
      content: "Children maintain blood pressure until the very end. Tachycardia is the most sensitive early indicator of deterioration. \n\nEarly Signs: Tachycardia, Poor feeding, Irritability, Cool extremities. \n\nLate Signs: Hypotension, Bradycardia (EXTREMELY OMINOUS)."
    },
    signs: {
      left: ["Tachycardia (Early Sign)", "Poor Feeding", "Diaphoresis with Feeds", "Irritability/Lethargy"],
      right: ["🚨 Bradycardia (Emergency!)", "🚨 Hypotension (Late Sign)", "Delayed Cap Refill", "Weak Pulses"]
    },
    medications: [
      { name: "Digoxin", type: "Cardiac Med", action: "Increases contractility", sideEffects: "Bradycardia, Toxicity", contra: "Low HR", pearl: "Extremely narrow therapeutic window in children. Monitor for toxicity (N/V)." }
    ],
    pearls: [
      "Poor perfusion ≠ always hypotension in children",
      "Monitor effort and feeding intolerance as primary clues",
      "Bradycardia in a child often = imminent cardiac arrest"
    ],
    quiz: [
      { question: "What is the most sensitive early sign of heart failure in an infant?", options: ["Hypotension", "Cyanosis", "Feeding intolerance/sweating", "Bradycardia"], correct: 2, rationale: "Infants often show cardiac distress through feeding difficulties and diaphoresis during feeding." }
    ]
  },
  "peds-chf": {
    title: "Pediatric Congestive Heart Failure",
    cellular: {
      title: "High Metabolic Demand",
      content: "In children, CHF occurs when the heart cannot meet the metabolic demands of growth. This leads to systemic and pulmonary congestion. At the cellular level, the failure to provide oxygenated blood results in 'Failure to Thrive'—the body prioritizing survival over growth."
    },
    signs: {
      left: ["Tachypnea", "Poor Weight Gain", "Hepatomegaly", "Feeding Intolerance"],
      right: ["⭐ Sweating with feeds", "⭐ Periorbital Edema", "Irritability", "Tachycardia"]
    },
    medications: [
      { name: "Furosemide", type: "Diuretic", action: "Fluid removal", sideEffects: "Electrolyte loss", contra: "Dehydration", pearl: "Monitor hydration status and electrolytes (K+) closely." }
    ],
    pearls: [
      "Feeding intolerance is the classic 'Activity Intolerance' for infants",
      "Weights are the best indicator of fluid status",
      "Position semi-upright to ease breathing"
    ],
    quiz: [
      { question: "Classic REX-PN clue for pediatric heart failure?", options: ["Chest pain", "Leg cramps", "Sweating while feeding", "High blood pressure"], correct: 2, rationale: "Sweating with feeds is a hallmark sign of pediatric cardiac distress." }
    ]
  },
  "congenital-defects": {
    title: "Congenital Heart Defects (CHD)",
    cellular: {
      title: "Acyanotic vs Cyanotic Shunting",
      content: "Acyanotic (Left-to-Right Shunt): Increased pulmonary blood flow (e.g., VSD, ASD, PDA). Leads to CHF risk. \n\nCyanotic (Right-to-Left Shunt): Decreased pulmonary blood flow (e.g., Tetralogy of Fallot). Leads to Hypoxia/Cyanosis."
    },
    signs: {
      left: ["⭐ Acyanotic: CHF Signs, Murmur", "Increased pulmonary congestion", "Frequent infections"],
      right: ["⭐ Cyanotic: Hypoxia, Cyanosis", "🚨 Tet Spells (Knee-chest position)", "Clubbing", "Polycythemia"]
    },
    medications: [
      { name: "Indomethacin", type: "NSAID", action: "Closes PDA", sideEffects: "Renal risk", contra: "Active bleed", pearl: "Used to close a Patent Ductus Arteriosus (PDA)." }
    ],
    pearls: [
      "Cyanotic defects = Right-to-Left shunt",
      "Acyanotic defects = Left-to-Right shunt",
      "Prioritize symptoms and safety over memorizing anatomy"
    ],
    quiz: [
      { question: "Position for an infant in a 'Tet Spell'?", options: ["Flat on back", "Semi-Fowlers", "Knee-Chest position", "Prone"], correct: 2, rationale: "The knee-chest position increases systemic resistance and improves oxygenation during a cyanotic spell." }
    ]
  },
  "heart-failure": {
    title: "Heart Failure (HF) - Across the Lifespan",
    cellular: {
      title: "The Failure of Cellular Output",
      content: "At any age, HF is the inability of the heart to pump enough blood to meet cellular needs. In adults, it's often chronic (RAAS activation). In infants, it presents as growth failure and feeding distress."
    },
    signs: {
      left: ["Adult: Dyspnea, Crackles", "Adult: Peripheral Edema, JVD", "Adult: Orthopnea"],
      right: ["Pediatric: Feeding Sweating", "Pediatric: Poor weight gain", "Pediatric: Hepatomegaly"]
    },
    medications: [
      { name: "Digoxin", type: "Inotrope", action: "Increases contractility", sideEffects: "Bradycardia", contra: "Low HR", pearl: "Adult: Hold if HR < 60. Child: Hold if HR < 90-110 (age dependent)." }
    ],
    lifespan: {
      title: "Lifespan Considerations",
      content: "Adults present with classic symptoms like JVD and peripheral edema. Infants present with systemic signs like sweating during feeds and failure to thrive. The nursing goal remains the same: reduce demand and improve output."
    },
    pearls: ["Daily weights are the priority across all ages", "Fluid restriction is common in both", "Safety: Digoxin toxicity risk is universal"],
    quiz: [
      { question: "Common finding in BOTH adult and pediatric heart failure?", options: ["Orthopnea", "Tachycardia", "Clubbing", "Hypotension"], correct: 1, rationale: "Tachycardia is a universal compensatory mechanism for low cardiac output across all ages." }
    ]
  },
  "peds-hypoxia": {
    title: "Pediatric Hypoxia & Work of Breathing",
    cellular: {
      title: "Pediatric Oxygenation Failure",
      content: "Children decompensate faster than adults. Recognition of early signs is the key. \n\nEarly Signs: Tachycardia, Tachypnea, Restlessness, Nasal Flaring, Retractions. \n\nLate Signs: Bradycardia (OMINOUS), Cyanosis, Lethargy."
    },
    signs: {
      left: ["Tachycardia & Tachypnea", "Restlessness/Irritability", "Nasal Flaring", "Retractions"],
      right: ["🚨 Bradycardia (Danger!)", "🚨 Grunting/Head Bobbing", "Cyanosis", "Decreased LOC"]
    },
    medications: [
      { name: "Oxygen Therapy", type: "Supportive", action: "Restores O2", sideEffects: "Dryness", contra: "None", pearl: "Monitor effort, not just numbers. Children look 'okay' until they don't." }
    ],
    pearls: [
      "🚨 Bradycardia in a hypoxic child = code blue emergency",
      "Work of Breathing is MORE important than SpO2 alone",
      "Visible retractions = significant distress"
    ],
    quiz: [
      { question: "Most sensitive early sign of hypoxia in a child?", options: ["Cyanosis", "Bradycardia", "Tachycardia", "Decreased LOC"], correct: 2, rationale: "Tachycardia is the first sensitive sign of distress in peds." }
    ]
  },
  "bronchiolitis": {
    title: "Bronchiolitis (RSV)",
    cellular: {
      title: "Viral Airway Obstruction",
      content: "Commonly caused by RSV. Viral infection leads to inflammation and heavy mucus production in the smallest airways (bronchioles). This causes narrowing and obstruction, making breathing difficult for infants."
    },
    signs: {
      left: ["Tachypnea", "Wheezing/Crackles", "Retractions", "Nasal Flaring"],
      right: ["Feeding Difficulty", "🚨 Apnea Episodes", "Dehydration", "Irritability"]
    },
    medications: [
      { name: "Fluids (IV/PO)", type: "Supportive", action: "Maintains hydration", sideEffects: "Fluid overload", contra: "None", pearl: "Priority is hydration and airway maintenance. Antibiotics are NOT routine." }
    ],
    pearls: [
      "Commonly viral (RSV); antibiotics don't work",
      "Infants/Premature babies are at highest risk",
      "Assess work of breathing and feeding ability"
    ],
    quiz: [
      { question: "What is the priority for an infant with bronchiolitis?", options: ["Antibiotics", "Hydration & Airway", "Chest PT", "Steroids"], correct: 1, rationale: "Supportive care focused on hydration and monitoring work of breathing is the priority." }
    ]
  },
  "croup": {
    title: "Croup (Laryngotracheobronchitis)",
    cellular: {
      title: "Upper Airway Narrowing",
      content: "Inflammation of the upper airway (larynx/trachea) leads to subglottic swelling and narrowing. This creates the classic 'barking' cough and inspiratory stridor as air is forced through a tight space."
    },
    signs: {
      left: ["Barking Cough (Seal-like)", "Inspiratory Stridor", "Hoarseness", "Worse at night"],
      right: ["🚨 Stridor at Rest", "🚨 Increasing distress", "Agitation", "Tachypnea"]
    },
    medications: [
      { name: "Dexamethasone", type: "Steroid", action: "Reduces airway swelling", sideEffects: "Irritability", contra: "Viral infection", pearl: "Single dose is often effective." },
      { name: "Epinephrine (Nebulized)", type: "Vasoconstrictor", action: "Rapid reduction of swelling", sideEffects: "Tachycardia", contra: "None", pearl: "Watch for rebound swelling after 2 hours." }
    ],
    pearls: [
      "Cold night air or steam can help relieve symptoms",
      "Agitation worsens the obstruction—keep the child calm!",
      "Stridor at rest is a red flag for severe narrowing"
    ],
    quiz: [
      { question: "Classic finding of Croup?", options: ["Drooling", "Barking cough", "Sudden onset choking", "Absent breath sounds"], correct: 1, rationale: "A barky, seal-like cough is the hallmark sign of Croup." }
    ]
  },
  "epiglottitis": {
    title: "Epiglottitis (Airway Emergency)",
    cellular: {
      title: "Supraglottic Inflammation",
      content: "Severe, life-threatening inflammation of the epiglottis. The airway can become completely obstructed in minutes. This is a medical emergency that requires immediate recognition."
    },
    signs: {
      left: ["🚨 Drooling", "🚨 Tripod Positioning", "🚨 Dysphagia (Difficulty swallowing)", "🚨 Toxic Appearance"],
      right: ["High Fever", "Muffled Voice", "Inspiratory Stridor", "Severe Anxiety"]
    },
    medications: [
      { name: "Antibiotics (IV)", type: "Antibacterial", action: "Treats underlying infection", sideEffects: "Diarrhea", contra: "Allergy", pearl: "Airway MUST be secured before any other treatment." }
    ],
    pearls: [
      "🚨 DO NOT examine the throat aggressively (can trigger total closure)",
      "Keep child in whatever position is most comfortable (usually tripod)",
      "Emergency intubation equipment must be available"
    ],
    quiz: [
      { question: "What is a hallmark sign of Epiglottitis?", options: ["Barking cough", "Drooling & Tripod positioning", "Wheezing", "Coughing"], correct: 1, rationale: "The 4 Ds (Drooling, Dysphagia, Dysphonia, Distress) and tripod positioning are classic for epiglottitis." }
    ]
  }
};

export default function LessonDetail() {
  const { id } = useParams();
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const { toast } = useToast();

  const lessonContent = useMemo(() => {
    return contentMap[id as string] || contentMap["heart-failure"];
  }, [id]);

  const handleAnswer = (index: number) => {
    if (index === lessonContent.quiz[currentQuestion].correct) {
      setScore(score + 1);
      toast({ title: "Correct!", description: lessonContent.quiz[currentQuestion].rationale });
    } else {
      toast({ 
        title: "Incorrect", 
        description: lessonContent.quiz[currentQuestion].rationale,
        variant: "destructive"
      });
    }

    if (currentQuestion + 1 < lessonContent.quiz.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const isPharma = id?.includes("pharma");
  const isPeds = id?.includes("peds") || id === "congenital-defects" || id === "bronchiolitis" || id === "croup" || id === "epiglottitis";
  
  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
      <Navigation />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <Link href="/lessons">
          <Button variant="ghost" className="mb-8 group">
            <ArrowLeft className="mr-2 w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Overview
          </Button>
        </Link>

        <div className="space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
               {isPeds && (
                 <div className="w-12 h-12 rounded-2xl bg-pink-100 flex items-center justify-center text-pink-500">
                    <Baby className="w-6 h-6" />
                 </div>
               )}
               <h1 className="text-5xl font-bold text-gray-900">{lessonContent.title}</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">REX-PN Core</span>
              <span className="text-gray-500 text-sm">Estimated time: 30 mins</span>
            </div>
          </div>

          {/* Progress Tracker */}
          <Card className="bg-primary/5 border-none">
            <CardContent className="p-6 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-bold text-primary uppercase tracking-wider">Your Progress</p>
                <p className="text-gray-600">Complete the quiz at the end to track your mastery.</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">{quizComplete ? "100%" : "25%"}</p>
                <Progress value={quizComplete ? 100 : 25} className="w-32 h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Intro Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              {isPeds ? <Baby className="text-pink-500 w-8 h-8" /> : <Microscope className="text-primary w-8 h-8" />}
              <h2>{lessonContent.cellular.title}</h2>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 leading-relaxed text-gray-700 whitespace-pre-wrap">
              {lessonContent.cellular.content}
            </div>
          </section>

          {/* Lifespan Section if exists */}
          {lessonContent.lifespan && (
            <section className="space-y-6">
              <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
                <Users className="text-indigo-500 w-8 h-8" />
                <h2>{lessonContent.lifespan.title}</h2>
              </div>
              <div className="bg-indigo-50 p-8 rounded-2xl border border-indigo-100 leading-relaxed text-indigo-900 italic">
                {lessonContent.lifespan.content}
              </div>
            </section>
          )}

          {/* Assessment/Findings Section */}
          <section className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <AlertCircle className="text-blue-500 w-6 h-6" />
                  <h3>Assessment Patterns</h3>
                </div>
                <ul className="space-y-2">
                  {lessonContent.signs.left.map((s, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md bg-white">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-2 text-xl font-bold text-gray-900">
                  <AlertCircle className="text-orange-500 w-6 h-6" />
                  <h3>Clinical Alert Signs</h3>
                </div>
                <ul className="space-y-2">
                  {lessonContent.signs.right.map((s, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      {s}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </section>

          {/* Medications Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-2xl font-bold text-gray-900">
              <Pill className="text-primary w-8 h-8" />
              <h2>Pharmacology & Safety</h2>
            </div>
            <div className="space-y-4">
              {lessonContent.medications.map((med, i) => (
                <Card key={i} className="border-none shadow-sm bg-white overflow-hidden">
                  <div className="bg-primary/5 px-6 py-3 border-b border-primary/10">
                    <span className="font-bold text-primary">{med.name}</span> <span className="text-gray-500 text-sm">({med.type})</span>
                  </div>
                  <CardContent className="p-6 grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-gray-400 uppercase">Action</p>
                      <p className="text-gray-700">{med.action}</p>
                      <p className="text-sm font-bold text-gray-400 uppercase pt-2">Side Effects</p>
                      <p className="text-gray-700">{med.sideEffects}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-bold text-gray-400 uppercase">Contraindications</p>
                      <p className="text-gray-700">{med.contra}</p>
                      <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-100 flex gap-2">
                        <Lightbulb className="w-5 h-5 text-yellow-600 shrink-0" />
                        <p className="text-sm text-yellow-800 font-medium">Pearl: {med.pearl}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Quick Fact Sheet */}
          <section className="bg-gray-900 text-white p-10 rounded-3xl space-y-6 shadow-2xl">
            <div className="flex items-center gap-3 text-2xl font-bold">
              <FileText className="text-primary w-8 h-8" />
              <h2>REX-PN Mastery Summary</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-primary font-bold uppercase tracking-widest text-sm">Nursing Priorities</h4>
                <ul className="space-y-2 text-gray-300">
                  {lessonContent.pearls.map((p, i) => (
                    <li key={i} className="flex gap-2">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                <h4 className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Exam Danger Zone</h4>
                <p className="text-sm text-gray-400 leading-relaxed italic">
                  Always prioritize based on age-specific patterns. Infants decompensate through feeding distress; adults through exertional dyspnea. Bradycardia in a child is never "stable"—it is an emergency.
                </p>
              </div>
            </div>
          </section>

          {/* Quiz Section */}
          <section className="py-12 border-t border-gray-100">
            {!quizStarted ? (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Stethoscope className="w-10 h-10 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">Knowledge Check</h2>
                <p className="text-gray-600 max-w-md mx-auto">Ready to test your understanding? Complete these questions to finish the module.</p>
                <Button size="lg" onClick={() => setQuizStarted(true)} className="rounded-full px-12 bg-primary hover:brightness-110 h-14 text-lg text-white">
                  Start Quiz
                </Button>
              </div>
            ) : quizComplete ? (
              <Card className="border-none shadow-xl bg-white text-center p-12 space-y-6">
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                  <Trophy className="w-12 h-12 text-emerald-500" />
                </div>
                <h2 className="text-3xl font-bold">Lesson Mastered!</h2>
                <p className="text-xl text-gray-600">You scored {score} out of {lessonContent.quiz.length}</p>
                <div className="pt-4">
                  <Link href="/lessons">
                    <Button variant="outline" className="rounded-full px-8">Return to Overview</Button>
                  </Link>
                </div>
              </Card>
            ) : (
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="space-y-2">
                  <p className="text-sm font-bold text-primary uppercase tracking-wider">Question {currentQuestion + 1} of {lessonContent.quiz.length}</p>
                  <h3 className="text-2xl font-bold text-gray-900">{lessonContent.quiz[currentQuestion].question}</h3>
                </div>
                <div className="grid gap-4">
                  {lessonContent.quiz[currentQuestion].options.map((option, i) => (
                    <Button 
                      key={i} 
                      variant="outline" 
                      onClick={() => handleAnswer(i)}
                      className="justify-start h-auto py-4 px-6 text-left hover:bg-primary/5 hover:border-primary/40 rounded-xl"
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
