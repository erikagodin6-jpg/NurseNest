import { useState, useEffect, useMemo } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { AdminEditButton } from "@/components/admin-edit-button";
import { Footer } from "@/components/footer";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Wind,
  Brain,
  Utensils,
  Droplets,
  Gauge,
  Syringe,
  Baby,
  Users,
  Smile,
  Radiation,
  Zap,
  Eye,
  ShieldAlert,
  BarChart3,
  Target,
  TrendingUp,
  TrendingDown,
  Award,
  BookOpen,
  AlertTriangle,
  LogIn,
} from "lucide-react";

const BODY_SYSTEM_MAP: Record<string, { lessons: string[]; icon: any; color: string }> = {
  "Cardiovascular": {
    lessons: ["aaa-rupture", "mi-management", "hf-advanced", "dvt-pe", "endocarditis", "hypertensive-crisis"],
    icon: Heart,
    color: "text-red-500",
  },
  "Respiratory": {
    lessons: ["pneumonia", "copd-exacerbation", "pneumothorax", "ards", "tb", "asthma-status"],
    icon: Wind,
    color: "text-blue-500",
  },
  "Neurological": {
    lessons: ["neuro-basics", "stroke-management", "seizures", "meningitis", "icp-management"],
    icon: Brain,
    color: "text-purple-500",
  },
  "Gastrointestinal": {
    lessons: ["gi-bleed", "pancreatitis", "bowel-obstruction", "liver-failure", "appendicitis"],
    icon: Utensils,
    color: "text-amber-600",
  },
  "Renal": {
    lessons: ["aki-ckd", "electrolyte-emergencies", "uti-pyelo", "nephrotic-syndrome"],
    icon: Droplets,
    color: "text-cyan-500",
  },
  "Endocrine": {
    lessons: ["dka-management", "thyroid-storm", "addisonian-crisis", "siadh-di"],
    icon: Gauge,
    color: "text-orange-500",
  },
  "Hematology": {
    lessons: ["dic", "sickle-cell", "blood-transfusion", "thalassemia"],
    icon: Syringe,
    color: "text-rose-500",
  },
  "Pediatrics": {
    lessons: ["peds-cardiac", "epiglottitis", "cp-management", "kawasaki-critical", "all-leukemia"],
    icon: Baby,
    color: "text-pink-500",
  },
  "Maternity/OB": {
    lessons: ["preeclampsia", "placenta-previa", "postpartum-hemorrhage"],
    icon: Users,
    color: "text-fuchsia-500",
  },
  "Mental Health": {
    lessons: ["depression-suicide", "substance-withdrawal", "schizophrenia"],
    icon: Smile,
    color: "text-teal-500",
  },
  "Oncology": {
    lessons: ["oncology-emergencies", "chemo-management"],
    icon: Radiation,
    color: "text-indigo-500",
  },
  "Emergency": {
    lessons: ["trauma-assessment", "burn-management", "shock-types"],
    icon: Zap,
    color: "text-yellow-500",
  },
  "Eye/Ear": {
    lessons: ["glaucoma", "cataracts", "macular-degeneration", "retinal-detachment", "otitis-media", "menieres-disease", "hearing-loss"],
    icon: Eye,
    color: "text-emerald-500",
  },
  "Infection Control": {
    lessons: ["mrsa-management", "c-diff", "sepsis-management"],
    icon: ShieldAlert,
    color: "text-lime-600",
  },
};

type TestResult = { score: number; total: number; percentage: number };

type SystemData = {
  name: string;
  icon: any;
  color: string;
  totalLessons: number;
  completedLessons: number;
  averageScore: number;
  proficiency: string;
  scores: number[];
};

function getProficiency(avg: number, hasData: boolean): string {
  if (!hasData) return "Not Started";
  if (avg >= 90) return "Mastered";
  if (avg >= 75) return "Proficient";
  if (avg >= 60) return "Developing";
  return "Needs Review";
}

function proficiencyColor(p: string): string {
  switch (p) {
    case "Mastered": return "bg-emerald-100 text-emerald-700 border-emerald-200";
    case "Proficient": return "bg-blue-100 text-blue-700 border-blue-200";
    case "Developing": return "bg-amber-100 text-amber-700 border-amber-200";
    case "Needs Review": return "bg-red-100 text-red-700 border-red-200";
    default: return "bg-gray-100 text-gray-500 border-gray-200";
  }
}

function progressBarColor(p: string): string {
  switch (p) {
    case "Mastered": return "bg-emerald-500";
    case "Proficient": return "bg-blue-500";
    case "Developing": return "bg-amber-500";
    case "Needs Review": return "bg-red-500";
    default: return "bg-gray-300";
  }
}

function readTestResults(): Record<string, TestResult> {
  const results: Record<string, TestResult> = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key) continue;
    const preMatch = key.match(/^nursenest-pretest-(.+)$/);
    const postMatch = key.match(/^nursenest-posttest-(.+)$/);
    const lessonId = preMatch?.[1] || postMatch?.[1];
    if (lessonId) {
      try {
        const data = JSON.parse(localStorage.getItem(key) || "");
        if (data && typeof data.percentage === "number") {
          const existing = results[lessonId];
          if (!existing || data.percentage > existing.percentage) {
            results[lessonId] = data;
          }
        }
      } catch {}
    }
  }
  return results;
}

function computeSystemData(testResults: Record<string, TestResult>): SystemData[] {
  return Object.entries(BODY_SYSTEM_MAP).map(([name, { lessons, icon, color }]) => {
    const scores: number[] = [];
    let completedLessons = 0;
    for (const lessonId of lessons) {
      if (testResults[lessonId]) {
        scores.push(testResults[lessonId].percentage);
        completedLessons++;
      }
    }
    const averageScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    return {
      name,
      icon,
      color,
      totalLessons: lessons.length,
      completedLessons,
      averageScore,
      proficiency: getProficiency(averageScore, scores.length > 0),
      scores,
    };
  });
}

export default function Reports() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const [testResults, setTestResults] = useState<Record<string, TestResult>>({});

  useEffect(() => {
    setTestResults(readTestResults());
  }, []);

  const systemData = useMemo(() => computeSystemData(testResults), [testResults]);

  const totalTestsTaken = useMemo(() => Object.keys(testResults).length, [testResults]);

  const overallAverage = useMemo(() => {
    const vals = Object.values(testResults);
    if (vals.length === 0) return 0;
    return Math.round(vals.reduce((a, b) => a + b.percentage, 0) / vals.length);
  }, [testResults]);

  const systemsWithData = useMemo(() => systemData.filter((s) => s.completedLessons > 0), [systemData]);

  const bestSystem = useMemo(() => {
    if (systemsWithData.length === 0) return null;
    return systemsWithData.reduce((a, b) => (a.averageScore >= b.averageScore ? a : b));
  }, [systemsWithData]);

  const weakestSystem = useMemo(() => {
    if (systemsWithData.length === 0) return null;
    return systemsWithData.reduce((a, b) => (a.averageScore <= b.averageScore ? a : b));
  }, [systemsWithData]);

  const weakest3 = useMemo(() => {
    return [...systemsWithData].sort((a, b) => a.averageScore - b.averageScore).slice(0, 3);
  }, [systemsWithData]);

  const strongest3 = useMemo(() => {
    return [...systemsWithData].sort((a, b) => b.averageScore - a.averageScore).slice(0, 3);
  }, [systemsWithData]);

  const hasData = totalTestsTaken > 0;

  if (!user) {
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
        <SEO
          title="Performance Analytics - NurseNest"
          description="Monitor your nursing study performance with detailed analytics."
          keywords="nursing study analytics, NCLEX progress tracker"
          canonicalPath="/reports"
          ogType="website"
          structuredData={{
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "NurseNest Performance Analytics",
            "description": "Track nursing study progress with mastery scores and performance insights.",
            "url": "https://nursenest.replit.app/reports",
          }}
        />
        <Navigation />
        <main className="max-w-4xl mx-auto px-4 py-20 w-full flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <LogIn className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3" data-testid="text-login-required">
            Log in to View Your Performance
          </h1>
          <p className="text-gray-500 mb-8 max-w-md" data-testid="text-login-message">
            Sign in to your NurseNest account to access your performance analytics, track proficiency across body systems, and get personalized study recommendations.
          </p>
          <Button
            className="rounded-full px-8 bg-primary text-white hover:brightness-110"
            onClick={() => setLocation("/login")}
            data-testid="button-login-reports"
          >
            Log In
          </Button>
        </main>
        <AdminEditButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
      <SEO
        title="Performance Analytics - Track Your Nursing Study Progress"
        description="Monitor your nursing study performance with detailed analytics. Track mastery scores, study time, question completion rates, and identify areas for improvement across all body systems."
        keywords="nursing study analytics, NCLEX progress tracker, nursing performance metrics, study progress dashboard, nursing exam preparation tracking"
        canonicalPath="/reports"
        ogType="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "NurseNest Performance Analytics",
          "description": "Track nursing study progress with mastery scores, study time analytics, and performance insights.",
          "url": "https://nursenest.replit.app/reports",
        }}
      />
      <Navigation />

      <main className="max-w-6xl mx-auto px-4 py-12 w-full">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2" data-testid="text-page-title">
            Performance Analytics
          </h1>
          <p className="text-gray-500" data-testid="text-page-subtitle">
            Track your proficiency across all body systems
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <Card className="border-none shadow-md bg-white rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tests Taken</span>
            </div>
            <p className="text-3xl font-black text-gray-900" data-testid="stat-tests-taken">{totalTestsTaken}</p>
          </Card>
          <Card className="border-none shadow-md bg-white rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-500">
                <Target className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Avg Score</span>
            </div>
            <p className="text-3xl font-black text-gray-900" data-testid="stat-avg-score">{hasData ? `${overallAverage}%` : "-"}</p>
          </Card>
          <Card className="border-none shadow-md bg-white rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-blue-50 text-blue-500">
                <TrendingUp className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Best System</span>
            </div>
            <p className="text-xl font-black text-gray-900 truncate" data-testid="stat-best-system">
              {bestSystem ? bestSystem.name : "-"}
            </p>
            {bestSystem && <p className="text-sm text-emerald-500 font-semibold">{bestSystem.averageScore}%</p>}
          </Card>
          <Card className="border-none shadow-md bg-white rounded-2xl p-5">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 rounded-xl bg-amber-50 text-amber-500">
                <TrendingDown className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Weakest System</span>
            </div>
            <p className="text-xl font-black text-gray-900 truncate" data-testid="stat-weakest-system">
              {weakestSystem ? weakestSystem.name : "-"}
            </p>
            {weakestSystem && <p className="text-sm text-amber-500 font-semibold">{weakestSystem.averageScore}%</p>}
          </Card>
        </div>

        {hasData && bestSystem && weakestSystem && (
          <div className="bg-white border border-primary/10 rounded-2xl p-5 mb-10 shadow-sm" data-testid="text-summary">
            <p className="text-gray-700">
              You're strongest in <span className="font-bold text-primary">{bestSystem.name} ({bestSystem.averageScore}%)</span>
              {bestSystem.name !== weakestSystem.name && (
                <> and should focus on <span className="font-bold text-amber-600">{weakestSystem.name} ({weakestSystem.averageScore}%)</span></>
              )}
              .
            </p>
          </div>
        )}

        <h2 className="text-2xl font-bold text-gray-900 mb-6" data-testid="text-systems-heading">Body Systems Proficiency</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-14">
          {systemData.map((sys) => {
            const Icon = sys.icon;
            return (
              <Card
                key={sys.name}
                className="border-none shadow-md bg-white rounded-2xl overflow-hidden"
                data-testid={`card-system-${sys.name.toLowerCase().replace(/[^a-z]/g, "-")}`}
              >
                <CardContent className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Icon className={cn("w-5 h-5", sys.color)} />
                      <h3 className="font-bold text-gray-900 text-sm">{sys.name}</h3>
                    </div>
                    <span
                      className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border", proficiencyColor(sys.proficiency))}
                      data-testid={`badge-proficiency-${sys.name.toLowerCase().replace(/[^a-z]/g, "-")}`}
                    >
                      {sys.proficiency}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                    <div
                      className={cn("h-full rounded-full transition-all duration-500", progressBarColor(sys.proficiency))}
                      style={{ width: `${sys.completedLessons > 0 ? sys.averageScore : 0}%` }}
                      data-testid={`progress-${sys.name.toLowerCase().replace(/[^a-z]/g, "-")}`}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span data-testid={`text-score-${sys.name.toLowerCase().replace(/[^a-z]/g, "-")}`}>
                      {sys.completedLessons > 0 ? `${sys.averageScore}%` : "No data"}
                    </span>
                    <span data-testid={`text-completed-${sys.name.toLowerCase().replace(/[^a-z]/g, "-")}`}>
                      {sys.completedLessons}/{sys.totalLessons} lessons
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-6" data-testid="text-recommendations-heading">Study Recommendations</h2>

        {!hasData ? (
          <Card className="border-none shadow-md bg-white rounded-2xl p-8 text-center" data-testid="card-no-data">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No Test Data Yet</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Start taking pre-tests and post-tests in your lessons to see your performance analytics and get personalized study recommendations.
            </p>
            <Button
              className="rounded-full px-8 bg-primary text-white hover:brightness-110"
              onClick={() => setLocation("/lessons")}
              data-testid="button-start-lessons"
            >
              Browse Lessons
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-md bg-white rounded-2xl overflow-hidden" data-testid="card-weakest-systems">
              <div className="p-5 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <h3 className="font-bold text-gray-900">Areas to Improve</h3>
                </div>
              </div>
              <div className="divide-y divide-gray-50">
                {weakest3.map((sys) => {
                  const Icon = sys.icon;
                  const lessonsToStudy = BODY_SYSTEM_MAP[sys.name].lessons
                    .filter((l) => !testResults[l])
                    .slice(0, 2)
                    .map((l) => l.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()));
                  return (
                    <div key={sys.name} className="p-5" data-testid={`recommendation-weak-${sys.name.toLowerCase().replace(/[^a-z]/g, "-")}`}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Icon className={cn("w-4 h-4", sys.color)} />
                          <span className="font-bold text-gray-900 text-sm">{sys.name}</span>
                        </div>
                        <span className="text-sm font-bold text-amber-500">{sys.averageScore}%</span>
                      </div>
                      <p className="text-xs text-gray-400">
                        {lessonsToStudy.length > 0
                          ? `Try studying: ${lessonsToStudy.join(", ")}`
                          : `Review your completed lessons to improve your score`}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="border-none shadow-md bg-white rounded-2xl overflow-hidden" data-testid="card-strongest-systems">
              <div className="p-5 border-b border-gray-50">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-emerald-500" />
                  <h3 className="font-bold text-gray-900">Your Strengths</h3>
                </div>
              </div>
              <div className="divide-y divide-gray-50">
                {strongest3.map((sys) => {
                  const Icon = sys.icon;
                  return (
                    <div key={sys.name} className="p-5" data-testid={`recommendation-strong-${sys.name.toLowerCase().replace(/[^a-z]/g, "-")}`}>
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Icon className={cn("w-4 h-4", sys.color)} />
                          <span className="font-bold text-gray-900 text-sm">{sys.name}</span>
                        </div>
                        <span className="text-sm font-bold text-emerald-500">{sys.averageScore}%</span>
                      </div>
                      <p className="text-xs text-gray-400">
                        {sys.proficiency === "Mastered"
                          ? "Excellent work! You've mastered this system."
                          : `Great progress! ${sys.totalLessons - sys.completedLessons} more lessons to complete.`}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        )}
      </main>
      <AdminEditButton />
      <Footer />
    </div>
  );
}
