import { LocaleLink } from "@/lib/LocaleLink";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { getExamQuestions, getPoolStats, getAvailableBodySystems } from "@/lib/question-pool";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  GraduationCap, Clock, FileText, BarChart3, ChevronRight,
  Brain, Target, Trophy, ArrowRight, History, Lock, ShieldAlert, Shield
} from "lucide-react";
import { AdminEditButton } from "@/components/admin-edit-button";

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

function getAllowedTiers(userTier: string | undefined, isAdmin: boolean): string[] {
  if (isAdmin) return ["rpn", "rn", "np"];
  if (!userTier || userTier === "free") return [];
  const tierMap: Record<string, string[]> = {
    rpn: ["rpn"],
    rn: ["rn"],
    np: ["np"],
  };
  return tierMap[userTier] || [];
}

export default function MockExamsPage() {
  const { user, effectiveTier, isAdmin } = useAuth();
  const { t } = useI18n();
  const [, navigate] = useLocation();
  const allowedTiers = getAllowedTiers(effectiveTier, isAdmin);
  const [selectedTier, setSelectedTier] = useState(allowedTiers[0] || "rpn");
  const [selectedLength, setSelectedLength] = useState(75);
  const [selectedSystems, setSelectedSystems] = useState<string[]>([]);
  const [strictMode, setStrictMode] = useState(false);
  const [starting, setStarting] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  const examLengths = [
    { count: 25, label: t("mockExams.quickReview"), time: t("mockExams.quickReviewTime"), desc: t("mockExams.quickReviewDesc") },
    { count: 75, label: t("mockExams.standard"), time: t("mockExams.standardTime"), desc: t("mockExams.standardDesc") },
    { count: 100, label: t("mockExams.fullLength"), time: t("mockExams.fullLengthTime"), desc: t("mockExams.fullLengthDesc") },
    { count: 150, label: t("mockExams.extended"), time: t("mockExams.extendedTime"), desc: t("mockExams.extendedDesc") },
  ];

  const tierOptions = [
    { value: "rpn", label: t("mockExams.tierRpnLabel"), desc: t("mockExams.tierRpnDesc") },
    { value: "rn", label: t("mockExams.tierRnLabel"), desc: t("mockExams.tierRnDesc") },
    { value: "np", label: t("mockExams.tierNpLabel"), desc: t("mockExams.tierNpDesc") },
  ];

  const availableSystems = getAvailableBodySystems(selectedTier);
  const stats = getPoolStats(selectedTier);

  const filteredStats = selectedSystems.length > 0
    ? { total: selectedSystems.reduce((sum, sys) => sum + (stats.systems[sys] || 0), 0), systems: Object.fromEntries(Object.entries(stats.systems).filter(([sys]) => selectedSystems.includes(sys))) }
    : stats;

  const toggleSystem = (sys: string) => {
    setSelectedSystems((prev) =>
      prev.includes(sys) ? prev.filter((s) => s !== sys) : [...prev, sys]
    );
  };

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
      const questions = getExamQuestions(selectedTier, selectedLength, selectedSystems.length > 0 ? selectedSystems : undefined);
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
        if (strictMode) {
          localStorage.setItem(`strict-mode-${data.attemptId}`, "true");
        }
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold" data-testid="text-mock-exam-title">{t("mockExams.pageTitle")}</h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            {t("mockExams.pageSubtitle")}
          </p>
        </div>

        {completedExams.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            <Card className="border-none shadow-sm">
              <CardContent className="p-6 text-center">
                <Trophy className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                <p className="text-3xl font-bold text-primary">{completedExams.length}</p>
                <p className="text-sm text-gray-500">{t("mockExams.examsCompleted")}</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm">
              <CardContent className="p-6 text-center">
                <Target className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                <p className="text-3xl font-bold text-emerald-600">{avgScore}%</p>
                <p className="text-sm text-gray-500">{t("mockExams.averageScore")}</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm">
              <CardContent className="p-6 text-center">
                <BarChart3 className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <p className="text-3xl font-bold text-blue-600">{bestScore}%</p>
                <p className="text-sm text-gray-500">{t("mockExams.bestScore")}</p>
              </CardContent>
            </Card>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Brain className="w-6 h-6 text-primary" /> {t("mockExams.configureExam")}
            </h2>

            <div className="space-y-3">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{t("mockExams.examFocus")}</p>
              <div className="grid gap-2">
                {tierOptions.map((tier) => {
                  const isAllowed = allowedTiers.includes(tier.value);
                  const tierStats = getPoolStats(tier.value);
                  return (
                    <button
                      key={tier.value}
                      onClick={() => isAllowed && setSelectedTier(tier.value)}
                      disabled={!isAllowed}
                      className={`p-4 rounded-xl border-2 text-left transition-all relative ${
                        !isAllowed
                          ? "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                          : selectedTier === tier.value
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      data-testid={`button-tier-${tier.value}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-gray-900">{tier.label}</span>
                          <span className="text-sm text-gray-500 ml-2">{tier.desc}</span>
                          <span className="text-xs text-gray-400 block mt-1">{tierStats.total} {t("mockExams.questionsAvailable")}</span>
                        </div>
                        {!isAllowed && <Lock className="w-4 h-4 text-gray-400" />}
                      </div>
                    </button>
                  );
                })}
              </div>
              {!user && (
                <p className="text-sm text-gray-500 text-center py-2">
                  <LocaleLink href="/login" className="text-primary font-medium hover:underline">{t("mockExams.signIn")}</LocaleLink> {t("mockExams.signInPrompt")}
                </p>
              )}
              {user && allowedTiers.length === 0 && (
                <Card className="border-none shadow-sm bg-amber-50 border-l-4 border-l-amber-400">
                  <CardContent className="p-4 flex items-start gap-3">
                    <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{t("mockExams.subscriptionRequired")}</p>
                      <p className="text-xs text-gray-600 mt-1">{t("mockExams.subscriptionDesc")}</p>
                      <LocaleLink href="/pricing">
                        <Button size="sm" className="mt-2 rounded-full" data-testid="button-upgrade-exams">{t("mockExams.viewPlans")}</Button>
                      </LocaleLink>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{t("mockExams.focusAreas")}</p>
                {selectedSystems.length > 0 && (
                  <button onClick={() => setSelectedSystems([])} className="text-xs text-primary hover:underline" data-testid="button-clear-systems">{t("mockExams.clearAll")}</button>
                )}
              </div>
              <p className="text-xs text-gray-400">{t("mockExams.focusAreasDesc")}</p>
              <div className="flex flex-wrap gap-2">
                {availableSystems.map((sys) => {
                  const isSelected = selectedSystems.includes(sys);
                  const count = stats.systems[sys] || 0;
                  return (
                    <button
                      key={sys}
                      onClick={() => toggleSystem(sys)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                        isSelected
                          ? "bg-primary text-white border-primary shadow-sm"
                          : "bg-white text-gray-600 border-gray-200 hover:border-primary/40"
                      }`}
                      data-testid={`button-system-${sys.replace(/\s+/g, "-").toLowerCase()}`}
                    >
                      {sys} <span className="opacity-70">({count})</span>
                    </button>
                  );
                })}
              </div>
              {selectedSystems.length > 0 && (
                <p className="text-xs text-primary font-medium">{filteredStats.total} {t("mockExams.questionsFromSystems")} {selectedSystems.length} {selectedSystems.length > 1 ? t("mockExams.selectedSystems") : t("mockExams.selectedSystem")}</p>
              )}
            </div>

            <div className="space-y-3">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{t("mockExams.examLength")}</p>
              <div className="grid grid-cols-2 gap-2">
                {examLengths.map((el) => (
                  <button
                    key={el.count}
                    onClick={() => setSelectedLength(el.count)}
                    disabled={filteredStats.total < el.count}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      selectedLength === el.count
                        ? "border-primary bg-primary/5 shadow-md"
                        : filteredStats.total < el.count
                        ? "border-gray-100 opacity-50 cursor-not-allowed"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    data-testid={`button-length-${el.count}`}
                  >
                    <span className="font-bold text-gray-900">{el.count} {t("mockExams.questions")}</span>
                    <span className="text-xs text-gray-500 block">{el.time}</span>
                    <span className="text-xs text-gray-400">{el.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Exam Mode</p>
              <Card className="border-none shadow-sm">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5 text-red-500" />
                      <div>
                        <Label htmlFor="strict-mode" className="font-bold text-gray-900 cursor-pointer">Strict Mode</Label>
                        <p className="text-xs text-gray-500 mt-0.5">Simulates real exam conditions</p>
                      </div>
                    </div>
                    <Switch
                      id="strict-mode"
                      checked={strictMode}
                      onCheckedChange={setStrictMode}
                      data-testid="toggle-strict-mode"
                    />
                  </div>
                  {strictMode && (
                    <div className="bg-red-50 rounded-lg p-3 space-y-1.5">
                      <p className="text-xs font-semibold text-red-700">Strict mode enforces:</p>
                      <ul className="text-xs text-red-600 space-y-1 list-disc list-inside">
                        <li>No going back to previous questions</li>
                        <li>Answers lock once selected — no changes</li>
                        <li>Timer cannot be paused</li>
                        <li>Tab switching is tracked</li>
                        <li>Scheduled break prompts</li>
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <Button
              size="lg"
              className="w-full h-14 text-lg rounded-full gap-2"
              onClick={startExam}
              disabled={starting || !user || allowedTiers.length === 0 || !allowedTiers.includes(selectedTier)}
              data-testid="button-start-exam"
            >
              {starting ? t("mockExams.preparingExam") : !user ? t("mockExams.signInToStart") : allowedTiers.length === 0 ? t("mockExams.subscriptionRequired") : t("mockExams.startMockExam")}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <History className="w-6 h-6 text-primary" /> {t("mockExams.examHistory")}
            </h2>

            {completedExams.length === 0 ? (
              <Card className="border-none shadow-sm">
                <CardContent className="p-8 text-center text-gray-400">
                  <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p className="font-medium">{t("mockExams.noExamsYet")}</p>
                  <p className="text-sm mt-1">{t("mockExams.noExamsDesc")}</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                {completedExams.map((exam) => (
                  <LocaleLink key={exam.id} href={`/mock-exams/${exam.id}/report`}>
                    <Card className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="font-bold text-gray-900">
                            {exam.tier?.toUpperCase()} - {exam.total_questions} {t("mockExams.questions")}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(exam.started_at).toLocaleDateString()} - {exam.time_spent ? `${Math.round(exam.time_spent / 60)} ${t("mockExams.min")}` : t("mockExams.na")}
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
                  </LocaleLink>
                ))}
              </div>
            )}

            <Card className="border-none shadow-sm bg-gray-900 text-white">
              <CardContent className="p-6 space-y-3">
                <h3 className="font-bold flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" /> {t("mockExams.questionCoverage")}
                </h3>
                <div className="space-y-2">
                  {Object.entries(stats.systems).sort((a, b) => b[1] - a[1]).map(([system, count]) => (
                    <div key={system} className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">{system}</span>
                      <span className="text-gray-400">{count} {t("mockExams.questions").toLowerCase()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <AdminEditButton pageName="mock-exams" />
      <Footer />
    </div>
  );
}
