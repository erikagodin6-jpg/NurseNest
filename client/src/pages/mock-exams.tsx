import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { getExamQuestions, getPoolStats } from "@/lib/question-pool";
import {
  GraduationCap, Clock, FileText, BarChart3, ChevronRight,
  Brain, Target, Trophy, ArrowRight, History
} from "lucide-react";

function getAuthHeaders(): Record<string, string> {
  try {
    const creds = localStorage.getItem("nursenest-credentials");
    if (creds) {
      const { username, password } = JSON.parse(creds);
      return { "x-username": username, "x-password": password };
    }
  } catch {}
  return {};
}

const examLengths = [
  { count: 25, label: "Quick Review", time: "~15 min", desc: "Fast knowledge check" },
  { count: 75, label: "Standard", time: "~45 min", desc: "Focused practice exam" },
  { count: 100, label: "Full Length", time: "~60 min", desc: "Comprehensive assessment" },
  { count: 150, label: "Extended", time: "~90 min", desc: "Maximum coverage" },
];

const tierOptions = [
  { value: "rpn", label: "RPN / LVN", desc: "Practical Nursing" },
  { value: "rn", label: "RN / NCLEX", desc: "Registered Nursing" },
  { value: "np", label: "NP Advanced", desc: "Nurse Practitioner" },
];

export default function MockExamsPage() {
  const { user } = useAuth();
  const [, navigate] = useLocation();
  const [selectedTier, setSelectedTier] = useState("rpn");
  const [selectedLength, setSelectedLength] = useState(75);
  const [starting, setStarting] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  const stats = getPoolStats(selectedTier);

  useEffect(() => {
    if (user) {
      fetch(`/api/mock-exams/history/${user.id}`, { headers: getAuthHeaders() })
        .then((r) => r.json())
        .then((data) => setHistory(Array.isArray(data) ? data : []))
        .catch(() => {});
    }
  }, [user]);

  const startExam = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setStarting(true);
    try {
      const questions = getExamQuestions(selectedTier, selectedLength);
      const res = await fetch("/api/mock-exams/start", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({
          tier: selectedTier,
          totalQuestions: questions.length,
          questions,
        }),
      });
      const data = await res.json();
      if (data.attemptId) {
        navigate(`/mock-exams/${data.attemptId}`);
      }
    } catch {
      setStarting(false);
    }
  };

  const completedExams = history.filter((h) => h.status === "completed");
  const avgScore = completedExams.length > 0
    ? Math.round(completedExams.reduce((sum, h) => sum + (h.report?.percentage || 0), 0) / completedExams.length)
    : null;
  const bestScore = completedExams.length > 0
    ? Math.max(...completedExams.map((h) => h.report?.percentage || 0))
    : null;

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
      <SEO title="Mock Exams - NurseNest" description="Practice with realistic nursing exam simulations. Timed mock exams with detailed post-exam reporting." />
      <Navigation />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1">
        <div className="text-center mb-12 space-y-4">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <GraduationCap className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-5xl font-bold" data-testid="text-mock-exam-title">Mock Exam Engine</h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Simulate real nursing exam conditions. Timed, randomized questions with detailed post-exam analysis and performance tracking.
          </p>
        </div>

        {completedExams.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-10">
            <Card className="border-none shadow-sm">
              <CardContent className="p-6 text-center">
                <Trophy className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                <p className="text-3xl font-bold text-primary">{completedExams.length}</p>
                <p className="text-sm text-gray-500">Exams Completed</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm">
              <CardContent className="p-6 text-center">
                <Target className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                <p className="text-3xl font-bold text-emerald-600">{avgScore}%</p>
                <p className="text-sm text-gray-500">Average Score</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm">
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-3xl font-bold text-blue-600">{bestScore}%</p>
                <p className="text-sm text-gray-500">Best Score</p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" /> Configure Your Exam
            </h2>

            <div className="space-y-3">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Select Focus Area</p>
              <div className="grid gap-2">
                {tierOptions.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => setSelectedTier(t.value)}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedTier === t.value
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    data-testid={`button-tier-${t.value}`}
                  >
                    <span className="font-bold text-gray-900">{t.label}</span>
                    <span className="text-sm text-gray-500 ml-2">{t.desc}</span>
                    <span className="text-xs text-gray-400 block mt-1">{stats.total} questions available</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Exam Length</p>
              <div className="grid grid-cols-2 gap-2">
                {examLengths.map((el) => (
                  <button
                    key={el.count}
                    onClick={() => setSelectedLength(el.count)}
                    disabled={stats.total < el.count}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedLength === el.count
                        ? "border-primary bg-primary/5 shadow-md"
                        : stats.total < el.count
                        ? "border-gray-100 opacity-50 cursor-not-allowed"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    data-testid={`button-length-${el.count}`}
                  >
                    <span className="font-bold text-gray-900">{el.count} Questions</span>
                    <span className="text-xs text-gray-500 block">{el.time}</span>
                    <span className="text-xs text-gray-400">{el.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <Button
              size="lg"
              className="w-full h-14 text-lg rounded-full gap-2"
              onClick={startExam}
              disabled={starting || !user}
              data-testid="button-start-exam"
            >
              {starting ? "Preparing Exam..." : user ? "Start Mock Exam" : "Sign In to Start"}
              <ArrowRight className="w-5 h-5" />
            </Button>

            {!user && (
              <p className="text-center text-sm text-gray-400">
                <Link href="/login" className="text-primary hover:underline">Sign in</Link> to save your exam results and track progress.
              </p>
            )}
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <History className="w-6 h-6 text-primary" /> Exam History
            </h2>

            {completedExams.length === 0 ? (
              <Card className="border-none shadow-sm">
                <CardContent className="p-8 text-center text-gray-400">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="font-medium">No exams completed yet</p>
                  <p className="text-sm mt-1">Your results will appear here after completing a mock exam.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {completedExams.map((exam) => (
                  <Link key={exam.id} href={`/mock-exams/${exam.id}/report`}>
                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-gray-900">
                            {exam.tier?.toUpperCase()} - {exam.total_questions} Questions
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(exam.started_at).toLocaleDateString()} - {exam.time_spent ? `${Math.round(exam.time_spent / 60)} min` : "N/A"}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-2xl font-bold ${
                            (exam.report?.percentage || 0) >= 80 ? "text-emerald-600" :
                            (exam.report?.percentage || 0) >= 60 ? "text-amber-600" : "text-red-500"
                          }`}>
                            {exam.report?.percentage || 0}%
                          </span>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}

            <Card className="border-none shadow-sm bg-gray-900 text-white">
              <CardContent className="p-6 space-y-3">
                <h3 className="font-bold flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" /> Question Coverage
                </h3>
                <div className="space-y-2">
                  {Object.entries(stats.systems).sort((a, b) => b[1] - a[1]).map(([system, count]) => (
                    <div key={system} className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">{system}</span>
                      <span className="text-gray-400">{count} questions</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
