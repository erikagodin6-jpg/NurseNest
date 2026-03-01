import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { AdminEditButton } from "@/components/admin-edit-button";
import { Footer } from "@/components/footer";
import { useAuth } from "@/lib/auth";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Stethoscope,
  Activity,
  Heart,
  Wind,
  Brain,
  Thermometer,
  Droplets,
  Pill,
  FlaskConical,
  ShieldCheck,
  CheckCircle,
  XCircle,
  ChevronRight,
  Lock,
  ArrowRight,
  ArrowLeft,
  Clock,
  Eye,
  Beaker,
  TestTube2,
} from "lucide-react";

const paidTiers = ["rpn", "rn", "np", "admin", "all_access"];

interface StationScenario {
  question: string;
  options: { id: string; text: string; correct: boolean }[];
  explanation: string;
}

interface Station {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  available: boolean;
  icon: any;
  scenario?: StationScenario;
}

const osceStations: Station[] = [
  {
    id: "head-to-toe",
    title: "Head-to-Toe Assessment",
    description: "Systematic physical assessment from head to toe following proper clinical sequence.",
    difficulty: "Beginner",
    available: true,
    icon: Eye,
    scenario: {
      question: "During a head-to-toe assessment, you notice the patient has JVD (jugular venous distension). What does this finding most likely indicate?",
      options: [
        { id: "a", text: "Dehydration", correct: false },
        { id: "b", text: "Right-sided heart failure", correct: true },
        { id: "c", text: "Hyperthyroidism", correct: false },
        { id: "d", text: "Liver cirrhosis", correct: false },
      ],
      explanation: "JVD (jugular venous distension) is a classic sign of right-sided heart failure. When the right ventricle cannot effectively pump blood forward, pressure backs up into the venous system, causing visible distension of the jugular veins. Dehydration would cause flat neck veins, not distended ones.",
    },
  },
  {
    id: "vital-signs",
    title: "Vital Signs Interpretation",
    description: "Interpret vital sign patterns and identify clinical significance of abnormal values.",
    difficulty: "Beginner",
    available: true,
    icon: Activity,
    scenario: {
      question: "A patient presents with BP 88/52, HR 126, RR 28, Temp 39.2°C, SpO2 94%. Which condition does this vital sign cluster most suggest?",
      options: [
        { id: "a", text: "Cardiogenic shock", correct: false },
        { id: "b", text: "Septic shock", correct: true },
        { id: "c", text: "Hypovolemic shock", correct: false },
        { id: "d", text: "Neurogenic shock", correct: false },
      ],
      explanation: "This presentation: hypotension, tachycardia, tachypnea, fever, and mildly decreased SpO2: is the hallmark of septic shock. The elevated temperature with hemodynamic instability suggests a systemic infectious process. Cardiogenic shock typically presents with cool/clammy skin without fever, and neurogenic shock presents with bradycardia rather than tachycardia.",
    },
  },
  {
    id: "med-admin",
    title: "Medication Administration Safety",
    description: "Practice the rights of medication administration and identify safety concerns.",
    difficulty: "Intermediate",
    available: true,
    icon: Pill,
    scenario: {
      question: "You are about to administer IV potassium chloride 40 mEq. The pharmacy sends it in 100 mL NS. What is the MOST important safety consideration?",
      options: [
        { id: "a", text: "Administer via rapid IV push for faster effect", correct: false },
        { id: "b", text: "Infuse over at least 1 hour using an IV pump; never push IV potassium", correct: true },
        { id: "c", text: "Mix with D5W instead of NS", correct: false },
        { id: "d", text: "Administer without cardiac monitoring", correct: false },
      ],
      explanation: "IV potassium must NEVER be given via IV push: it can cause fatal cardiac arrhythmias. It must be diluted and infused slowly (typically no faster than 10 mEq/hour peripherally, 20 mEq/hour centrally) using an infusion pump. Cardiac monitoring is recommended for rates >10 mEq/hr. This is a critical patient safety principle tested on NCLEX.",
    },
  },
  {
    id: "wound-assessment",
    title: "Wound Assessment & Documentation",
    description: "Assess wound characteristics, staging, and proper documentation techniques.",
    difficulty: "Intermediate",
    available: false,
    icon: ShieldCheck,
  },
  {
    id: "iv-therapy",
    title: "IV Therapy & Fluid Management",
    description: "Manage IV access, fluid types, and infusion rate calculations.",
    difficulty: "Advanced",
    available: false,
    icon: Droplets,
  },
  {
    id: "patient-education",
    title: "Patient Education & Discharge Planning",
    description: "Develop patient-centered education and safe discharge planning strategies.",
    difficulty: "Intermediate",
    available: false,
    icon: Brain,
  },
  {
    id: "respiratory",
    title: "Respiratory Assessment",
    description: "Assess breath sounds, respiratory patterns, and oxygen delivery systems.",
    difficulty: "Intermediate",
    available: true,
    icon: Wind,
    scenario: {
      question: "You auscultate coarse crackles bilaterally in a patient with a history of CHF. The patient is sitting upright and using accessory muscles. What is your priority nursing action?",
      options: [
        { id: "a", text: "Encourage deep breathing and coughing exercises", correct: false },
        { id: "b", text: "Administer prescribed diuretic and elevate HOB to high-Fowler's", correct: true },
        { id: "c", text: "Apply a nasal cannula at 6 L/min", correct: false },
        { id: "d", text: "Suction the airway", correct: false },
      ],
      explanation: "Bilateral coarse crackles in a CHF patient indicate pulmonary edema from fluid overload. The priority is to reduce fluid volume with the prescribed diuretic (e.g., furosemide) and position the patient in high-Fowler's to improve lung expansion and reduce preload. Suctioning is not appropriate as the crackles are from fluid in the alveoli, not secretions in the airway.",
    },
  },
  {
    id: "cardiac",
    title: "Cardiac Assessment",
    description: "Perform cardiac auscultation, identify heart sounds, and recognize abnormalities.",
    difficulty: "Advanced",
    available: true,
    icon: Heart,
    scenario: {
      question: "During cardiac auscultation, you hear an S3 heart sound in a 68-year-old patient. What is the clinical significance of this finding?",
      options: [
        { id: "a", text: "Normal finding in elderly patients", correct: false },
        { id: "b", text: "Indicates aortic stenosis", correct: false },
        { id: "c", text: "Suggests heart failure with volume overload", correct: true },
        { id: "d", text: "Indicates mitral valve prolapse", correct: false },
      ],
      explanation: "An S3 heart sound (ventricular gallop) in an adult over 30 is pathological and suggests heart failure with volume overload. It occurs during rapid ventricular filling when the ventricle is already distended. While an S3 can be normal in children and young adults, in elderly patients it is a key indicator of decompensated heart failure and should prompt further assessment.",
    },
  },
];

const clinicalLabStations: Station[] = [
  {
    id: "blood-gas",
    title: "Blood Gas Interpretation",
    description: "Analyze arterial blood gas values to identify acid-base imbalances.",
    difficulty: "Advanced",
    available: true,
    icon: FlaskConical,
    scenario: {
      question: "ABG results: pH 7.28, PaCO2 55 mmHg, HCO3 24 mEq/L, PaO2 68 mmHg. What acid-base disturbance is present?",
      options: [
        { id: "a", text: "Metabolic acidosis", correct: false },
        { id: "b", text: "Respiratory acidosis, uncompensated", correct: true },
        { id: "c", text: "Respiratory alkalosis", correct: false },
        { id: "d", text: "Mixed respiratory and metabolic acidosis", correct: false },
      ],
      explanation: "The pH is acidotic (<7.35), PaCO2 is elevated (>45 mmHg) indicating respiratory cause, and HCO3 is normal (22-26 mEq/L) meaning the kidneys have not yet compensated. This is uncompensated respiratory acidosis, commonly seen in COPD exacerbation, opioid overdose, or respiratory failure. The low PaO2 confirms hypoxemia accompanying the hypoventilation.",
    },
  },
  {
    id: "cbc",
    title: "Complete Blood Count Analysis",
    description: "Interpret CBC results and correlate findings with clinical conditions.",
    difficulty: "Beginner",
    available: true,
    icon: TestTube2,
    scenario: {
      question: "CBC results show: WBC 18,500/μL, Neutrophils 85%, Bands 12%, Hgb 13.5 g/dL, Platelets 245,000/μL. What does the 'left shift' in the differential indicate?",
      options: [
        { id: "a", text: "Viral infection", correct: false },
        { id: "b", text: "Acute bacterial infection with increased immature neutrophils", correct: true },
        { id: "c", text: "Iron deficiency anemia", correct: false },
        { id: "d", text: "Thrombocytopenia", correct: false },
      ],
      explanation: "A 'left shift' refers to an increase in bands (immature neutrophils >6%) along with elevated WBC and neutrophilia. This pattern strongly suggests acute bacterial infection. The bone marrow releases immature cells to fight the infection before they fully mature. Viral infections typically show lymphocytosis, not neutrophilia with bandemia.",
    },
  },
  {
    id: "bmp",
    title: "Basic Metabolic Panel",
    description: "Evaluate electrolytes, glucose, and renal function from BMP results.",
    difficulty: "Beginner",
    available: true,
    icon: Activity,
    scenario: {
      question: "BMP results: Na+ 128 mEq/L, K+ 5.8 mEq/L, BUN 45 mg/dL, Creatinine 3.2 mg/dL, Glucose 95 mg/dL. Which condition best explains these findings?",
      options: [
        { id: "a", text: "Diabetic ketoacidosis", correct: false },
        { id: "b", text: "Acute kidney injury", correct: true },
        { id: "c", text: "Addison's disease", correct: false },
        { id: "d", text: "Dehydration", correct: false },
      ],
      explanation: "The combination of elevated BUN and creatinine (azotemia), hyperkalemia (K+ 5.8), and hyponatremia (Na+ 128) is the classic triad of acute kidney injury (AKI). The kidneys cannot excrete potassium or concentrate urine properly. Normal glucose rules out DKA. While Addison's can cause similar electrolyte patterns, the markedly elevated renal markers point to AKI as the primary cause.",
    },
  },
  {
    id: "liver-function",
    title: "Liver Function Tests",
    description: "Interpret LFTs to differentiate hepatocellular vs. cholestatic liver disease.",
    difficulty: "Intermediate",
    available: false,
    icon: Thermometer,
  },
  {
    id: "coagulation",
    title: "Coagulation Studies",
    description: "Analyze PT, INR, aPTT, and fibrinogen for bleeding or clotting disorders.",
    difficulty: "Advanced",
    available: false,
    icon: Droplets,
  },
  {
    id: "urinalysis",
    title: "Urinalysis Interpretation",
    description: "Evaluate urinalysis results for infection, kidney disease, and metabolic conditions.",
    difficulty: "Beginner",
    available: false,
    icon: FlaskConical,
  },
  {
    id: "thyroid",
    title: "Thyroid Function Tests",
    description: "Interpret TSH, T3, and T4 to identify thyroid disorders.",
    difficulty: "Intermediate",
    available: false,
    icon: Brain,
  },
  {
    id: "cardiac-biomarkers",
    title: "Cardiac Biomarkers",
    description: "Evaluate troponin, BNP, and CK-MB to assess cardiac damage and heart failure.",
    difficulty: "Advanced",
    available: true,
    icon: Heart,
    scenario: {
      question: "A patient presents with chest pain. Labs show: Troponin I 2.8 ng/mL (normal <0.04), CK-MB 45 U/L (normal <25), BNP 85 pg/mL (normal <100). What do these results indicate?",
      options: [
        { id: "a", text: "Congestive heart failure", correct: false },
        { id: "b", text: "Acute myocardial infarction", correct: true },
        { id: "c", text: "Stable angina", correct: false },
        { id: "d", text: "Pulmonary embolism", correct: false },
      ],
      explanation: "Markedly elevated Troponin I (70x normal) and elevated CK-MB confirm acute myocardial infarction (AMI). Troponin is the most sensitive and specific marker for myocardial cell death. The normal BNP suggests the heart has not yet developed significant failure from the infarction. Stable angina does not cause troponin elevation because there is no myocardial necrosis.",
    },
  },
];

const difficultyConfig: Record<string, { bg: string; text: string }> = {
  Beginner: { bg: "bg-emerald-50", text: "text-emerald-700" },
  Intermediate: { bg: "bg-amber-50", text: "text-amber-700" },
  Advanced: { bg: "bg-rose-50", text: "text-rose-700" },
};

function StationExercise({ station, onClose }: { station: Station; onClose: () => void }) {
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const scenario = station.scenario!;

  const handleSelect = (optionId: string) => {
    if (revealed) return;
    setSelected(optionId);
    setRevealed(true);
  };

  const selectedOption = scenario.options.find(o => o.id === selected);
  const isCorrect = selectedOption?.correct;

  return (
    <div className="mt-6 border-t border-gray-100 pt-6" data-testid={`exercise-${station.id}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          <h4 className="text-sm font-bold text-gray-900">Clinical Scenario</h4>
        </div>
        <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:text-gray-600" onClick={onClose} data-testid={`button-close-exercise-${station.id}`}>
          <ArrowLeft className="w-3 h-3 mr-1" />
          Back
        </Button>
      </div>

      <p className="text-sm text-gray-700 leading-relaxed mb-4">{scenario.question}</p>

      <div className="space-y-2">
        {scenario.options.map((opt) => {
          let borderClass = "border-gray-100 hover:border-primary/30 cursor-pointer";
          if (revealed && selected === opt.id && opt.correct) borderClass = "border-emerald-300 bg-emerald-50/30";
          else if (revealed && selected === opt.id && !opt.correct) borderClass = "border-red-300 bg-red-50/30";
          else if (revealed && opt.correct) borderClass = "border-emerald-200 bg-emerald-50/20";
          else if (revealed) borderClass = "border-gray-100 opacity-60";

          return (
            <div
              key={opt.id}
              className={`border-2 rounded-lg p-3 transition-all duration-200 ${borderClass}`}
              onClick={() => handleSelect(opt.id)}
              data-testid={`option-${station.id}-${opt.id}`}
            >
              <div className="flex items-start gap-3">
                {revealed ? (
                  opt.correct ? (
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                  ) : selected === opt.id ? (
                    <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-gray-200 flex-shrink-0 mt-0.5" />
                  )
                ) : (
                  <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 mt-0.5 ${selected === opt.id ? "border-primary bg-primary" : "border-gray-300"}`} />
                )}
                <span className="text-sm text-gray-700">{opt.text}</span>
              </div>
            </div>
          );
        })}
      </div>

      {revealed && (
        <div className="mt-4 p-4 rounded-xl bg-primary/5 border border-primary/10">
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <CheckCircle className="w-4 h-4 text-emerald-500" />
            ) : (
              <XCircle className="w-4 h-4 text-red-400" />
            )}
            <span className={`text-sm font-bold ${isCorrect ? "text-emerald-700" : "text-red-600"}`}>
              {isCorrect ? "Correct!" : "Incorrect"}
            </span>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{scenario.explanation}</p>
        </div>
      )}
    </div>
  );
}

function StationCard({ station, hasPaidAccess, isLoggedIn }: { station: Station; hasPaidAccess: boolean; isLoggedIn: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const diff = difficultyConfig[station.difficulty];
  const Icon = station.icon;

  const handleClick = () => {
    if (!station.available) return;
    if (!isLoggedIn || !hasPaidAccess) return;
    setExpanded(!expanded);
  };

  return (
    <Card
      className={`border border-gray-100 bg-white transition-all duration-300 ${
        station.available && hasPaidAccess && isLoggedIn
          ? "hover:shadow-lg hover:border-primary/20 cursor-pointer group"
          : "opacity-80"
      }`}
      data-testid={`card-station-${station.id}`}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center">
              <Icon className="w-4 h-4 text-primary/70" />
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${diff.bg} ${diff.text}`}>
              {station.difficulty}
            </span>
          </div>
          {station.available ? (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600" data-testid={`status-available-${station.id}`}>
              Available
            </span>
          ) : (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500" data-testid={`status-coming-soon-${station.id}`}>
              Coming Soon
            </span>
          )}
        </div>

        <h3
          className={`text-lg font-bold mb-2 transition-colors ${
            station.available && hasPaidAccess && isLoggedIn
              ? "text-gray-900 group-hover:text-primary"
              : "text-gray-600"
          }`}
          onClick={handleClick}
        >
          {station.title}
        </h3>
        <p className="text-sm text-gray-500 mb-3">{station.description}</p>

        {station.available && hasPaidAccess && isLoggedIn && !expanded && (
          <div className="flex items-center text-xs text-primary font-medium" onClick={handleClick} data-testid={`button-start-${station.id}`}>
            <span>Start Exercise</span>
            <ChevronRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        )}

        {station.available && (!isLoggedIn || !hasPaidAccess) && (
          <div className="flex items-center text-xs text-gray-400 gap-1">
            <Lock className="w-3 h-3" />
            <span>{!isLoggedIn ? "Sign up to access" : "Upgrade to access"}</span>
          </div>
        )}

        {expanded && station.scenario && (
          <StationExercise station={station} onClose={() => setExpanded(false)} />
        )}
      </CardContent>
    </Card>
  );
}

function PreviewCTA() {
  const [, setLocation] = useLocation();
  return (
    <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent mb-8">
      <CardContent className="p-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
          <Stethoscope className="w-7 h-7 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Practice Clinical Skills Interactively</h3>
        <p className="text-sm text-gray-600 max-w-md mx-auto mb-6 leading-relaxed">
          Sign up for free to preview our simulator stations, or subscribe to unlock full interactive exercises with detailed clinical explanations.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            className="rounded-full bg-primary text-white hover:brightness-110 gap-2"
            onClick={() => setLocation("/login")}
            data-testid="button-signup-cta"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            className="rounded-full border-primary/30 text-primary hover:bg-primary/5"
            onClick={() => setLocation("/pricing")}
            data-testid="button-pricing-cta"
          >
            View Plans
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function UpgradePaywall() {
  const [, setLocation] = useLocation();
  return (
    <Card className="border-2 border-amber-200 bg-amber-50/30 mb-8">
      <CardContent className="p-8 text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-4">
          <Lock className="w-7 h-7 text-amber-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Upgrade to Access Simulators</h3>
        <p className="text-sm text-gray-600 max-w-md mx-auto mb-6 leading-relaxed">
          Interactive simulator exercises are available on paid plans. Upgrade your account to practice with clinical scenarios, get instant feedback, and build confidence for your exams.
        </p>
        <Button
          className="rounded-full bg-primary text-white hover:brightness-110 gap-2"
          onClick={() => setLocation("/pricing")}
          data-testid="button-upgrade-cta"
        >
          Upgrade Now
          <ArrowRight className="w-4 h-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

export default function SimulatorsPage() {
  const [, params] = useRoute("/simulators/:type");
  const simulatorType = params?.type || "osce";
  const isOsce = simulatorType === "osce";
  const [, setLocation] = useLocation();
  const { user, effectiveTier } = useAuth();

  const isLoggedIn = !!user;
  const hasPaidAccess = isLoggedIn && paidTiers.includes(effectiveTier);

  const stations = isOsce ? osceStations : clinicalLabStations;

  const title = isOsce ? "OSCE Simulator" : "Clinical Lab Simulator";
  const subtitle = isOsce
    ? "Objective Structured Clinical Examination Practice"
    : "Laboratory Value Interpretation Mastery";
  const description = isOsce
    ? "Practice clinical examination stations with interactive scenarios. Build confidence in assessment skills, medication safety, and patient care competencies."
    : "Master laboratory value interpretation with interactive clinical scenarios. Analyze blood gases, CBC differentials, metabolic panels, and cardiac biomarkers.";

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
      <SEO
        title={`${title} - Interactive Clinical Practice | NurseNest`}
        description={description}
        keywords={isOsce
          ? "OSCE simulator nursing, clinical examination practice, nursing assessment skills, OSCE stations, nursing simulation"
          : "clinical lab simulator nursing, lab value interpretation, ABG analysis, CBC interpretation, nursing lab practice"
        }
        canonicalPath={`/simulators/${simulatorType}`}
        ogType="website"
      />
      <Navigation />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Button
              variant={isOsce ? "default" : "outline"}
              className={`rounded-full text-sm ${isOsce ? "bg-primary text-white" : "border-primary/30 text-primary hover:bg-primary/5"}`}
              onClick={() => setLocation("/simulators/osce")}
              data-testid="button-tab-osce"
            >
              <Stethoscope className="w-4 h-4 mr-1.5" />
              OSCE Stations
            </Button>
            <Button
              variant={!isOsce ? "default" : "outline"}
              className={`rounded-full text-sm ${!isOsce ? "bg-primary text-white" : "border-primary/30 text-primary hover:bg-primary/5"}`}
              onClick={() => setLocation("/simulators/clinical-lab")}
              data-testid="button-tab-clinical-lab"
            >
              <FlaskConical className="w-4 h-4 mr-1.5" />
              Clinical Lab
            </Button>
          </div>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
              {isOsce ? (
                <Stethoscope className="w-6 h-6 text-primary" />
              ) : (
                <FlaskConical className="w-6 h-6 text-primary" />
              )}
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900" data-testid="text-page-title">
                {title}
              </h1>
              <p className="text-sm text-primary font-semibold uppercase tracking-wider mt-0.5">
                {subtitle}
              </p>
            </div>
          </div>
          <p className="text-lg text-gray-600 max-w-3xl leading-relaxed mt-4">
            {description}
          </p>
        </div>

        {!isLoggedIn && <PreviewCTA />}
        {isLoggedIn && !hasPaidAccess && <UpgradePaywall />}

        <div className="grid gap-6 md:grid-cols-2">
          {stations.map((station) => (
            <StationCard
              key={station.id}
              station={station}
              hasPaidAccess={hasPaidAccess}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-xs text-gray-400">
            New stations are added regularly. Content is designed for educational purposes and exam preparation.
          </p>
        </div>
      </main>
      <AdminEditButton />
      <Footer />
    </div>
  );
}
