import { LocaleLink } from "@/lib/LocaleLink";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SEO } from "@/components/seo";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { getExamQuestions, getPoolStats, getAvailableBodySystems, getAvailableBlueprintsForTier, getOfficialExamQuestions, getReadinessExamQuestions, getReadinessExamForTier, EXAM_BLUEPRINTS, READINESS_EXAMS } from "@/lib/question-pool";
import type { ExamBlueprint } from "@/lib/question-pool";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  GraduationCap, Clock, FileText, BarChart3, ChevronRight,
  Brain, Target, Trophy, ArrowRight, History, Lock, ShieldAlert, Shield, Zap, Gift,
  Check, Palette
} from "lucide-react";
import { AdminEditButton } from "@/components/admin-edit-button";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { getTierConfig } from "@shared/tier-config";

const EXAM_THEMES = [
  { id: "pastelLilac", name: "Pastel Lilac", color: "#C8B6FF" },
  { id: "softRose", name: "Soft Rose", color: "#F4A6B5" },
  { id: "skyBlue", name: "Sky Blue", color: "#A9D6FF" },
  { id: "mintClinical", name: "Mint Clinical", color: "#A8E6CF" },
  { id: "warmPeach", name: "Warm Peach", color: "#FFD6A5" },
  { id: "nursenestPurple", name: "Classic NurseNest", color: "#8A6BFF" },
  { id: "minimalNeutral", name: "Minimal Neutral", color: "#CBD5E1" },
  { id: "highContrast", name: "High Contrast", color: "#4F46E5" },
];

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

function getPrimaryExamTier(userTier: string | undefined, isAdmin: boolean, previewActive: boolean): string | null {
  if (isAdmin && !previewActive) return null;
  if (!userTier || userTier === "free") return null;
  return userTier;
}

export default function MockExamsPage() {
  const { user, effectiveTier, isAdmin, previewTier } = useAuth();
  const { t } = useI18n();
  const [, navigate] = useLocation();
  const primaryExamTier = getPrimaryExamTier(effectiveTier, isAdmin, !!previewTier);
  const isAdminWithAllTiers = isAdmin && !previewTier;
  const allowedTiers = isAdminWithAllTiers ? ["rpn", "rn", "np"] : primaryExamTier ? [primaryExamTier] : [];
  const [selectedTier, setSelectedTier] = useState(primaryExamTier || (isAdminWithAllTiers ? "rpn" : "rpn"));
  const [selectedLength, setSelectedLength] = useState(75);
  const [selectedSystems, setSelectedSystems] = useState<string[]>([]);
  const [strictMode, setStrictMode] = useState(false);
  const [starting, setStarting] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [examMode, setExamMode] = useState<"official" | "practice">("official");
  const [selectedBlueprint, setSelectedBlueprint] = useState<string>("");
  const [showThemeCustomizer, setShowThemeCustomizer] = useState(false);
  const [examTheme, setExamTheme] = useState(() => localStorage.getItem("examTheme") || "nursenestPurple");
  const [userRegion, setUserRegion] = useState<"US" | "CA">(() => (localStorage.getItem("nursenest-region") as "US" | "CA") || "US");

  useEffect(() => {
    const handleRegionChange = () => {
      setUserRegion((localStorage.getItem("nursenest-region") as "US" | "CA") || "US");
    };
    window.addEventListener("regionChange", handleRegionChange);
    window.addEventListener("storage", handleRegionChange);
    return () => {
      window.removeEventListener("regionChange", handleRegionChange);
      window.removeEventListener("storage", handleRegionChange);
    };
  }, []);

  const availableBlueprints = getAvailableBlueprintsForTier(selectedTier, userRegion);

  useEffect(() => {
    const bps = getAvailableBlueprintsForTier(selectedTier, userRegion);
    if (bps.length > 0) {
      setSelectedBlueprint(bps[0].examCode);
    }
  }, [selectedTier, userRegion]);

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

  const [availableSystems, setAvailableSystems] = useState<string[]>([]);
  const [stats, setStats] = useState<{ total: number; systems: Record<string, number> }>({ total: 0, systems: {} });
  const [tierStatsMap, setTierStatsMap] = useState<Record<string, { total: number }>>({});

  useEffect(() => {
    getAvailableBodySystems(selectedTier).then(setAvailableSystems);
    getPoolStats(selectedTier).then(setStats);
  }, [selectedTier]);

  useEffect(() => {
    const tiersToFetch = allowedTiers.length > 0 ? tierOptions.filter(t => allowedTiers.includes(t.value)) : tierOptions;
    Promise.all(
      tiersToFetch.map(async (t) => {
        const s = await getPoolStats(t.value);
        return [t.value, { total: s.total }] as const;
      })
    ).then((entries) => setTierStatsMap(Object.fromEntries(entries)));
  }, []);

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
      let questions;
      let blueprintMeta: any = null;
      let domainAssignments: Record<string, string> | null = null;

      if (examMode === "official" && selectedBlueprint) {
        const result = await getOfficialExamQuestions(selectedBlueprint);
        questions = result.questions;
        blueprintMeta = result.blueprint;
        domainAssignments = result.domainAssignments;
      } else {
        questions = await getExamQuestions(selectedTier, selectedLength, selectedSystems.length > 0 ? selectedSystems : undefined);
      }

      const res = await fetch("/api/mock-exams/start", {
        method: "POST",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({
          tier: selectedTier,
          totalQuestions: questions.length,
          questions,
          examMode: examMode,
          blueprintCode: examMode === "official" ? selectedBlueprint : undefined,
          blueprintMeta: blueprintMeta ? {
            examCode: blueprintMeta.examCode,
            examName: blueprintMeta.examName,
            passingThreshold: blueprintMeta.passingThreshold,
            domainPassThreshold: blueprintMeta.domainPassThreshold,
            domains: blueprintMeta.domains,
            timeLimit: blueprintMeta.timeLimit,
            examType: blueprintMeta.examType,
            scaledScoreRange: blueprintMeta.scaledScoreRange,
            minQuestions: blueprintMeta.minQuestions,
            maxQuestions: blueprintMeta.maxQuestions,
            showQuestionCount: blueprintMeta.showQuestionCount,
          } : undefined,
          domainAssignments: domainAssignments || undefined,
        }),
      });
      const data = await res.json();
      if (data.attemptId) {
        if (examMode === "official" || strictMode) {
          localStorage.setItem(`strict-mode-${data.attemptId}`, "true");
        }
        if (examMode === "official" && blueprintMeta) {
          localStorage.setItem(`blueprint-${data.attemptId}`, JSON.stringify({
            ...blueprintMeta,
            domainAssignments,
          }));
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

  const activeTierConfig = getTierConfig(effectiveTier);
  const tierSpecificTitle = (effectiveTier && effectiveTier !== "free" && effectiveTier !== "admin")
    ? activeTierConfig.examPrepLabel
    : t("mockExams.pageTitle");
  const tierSpecificSubtitle = (effectiveTier && effectiveTier !== "free" && effectiveTier !== "admin")
    ? `${activeTierConfig.readinessLabel} - ${activeTierConfig.tone.split(",")[0].trim()} exam preparation`
    : t("mockExams.pageSubtitle");

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
      <SEO title={`${tierSpecificTitle} - NurseNest`} description="Practice with realistic nursing exam simulations. Timed mock exams with detailed post-exam reporting." canonicalPath="/mock-exams" />
      <Navigation />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1">
        <BreadcrumbNav />
        <div className="text-center mb-12 space-y-4">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <GraduationCap className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold" data-testid="text-mock-exam-title">{tierSpecificTitle}</h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            {tierSpecificSubtitle}
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
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Exam Type</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setExamMode("official")}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    examMode === "official"
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  data-testid="button-mode-official"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="font-bold text-gray-900">Real Exam Mode</span>
                  </div>
                  <span className="text-xs text-gray-500 block">CAT-style adaptive testing for NCLEX/REx-PN, scaled scoring for NP boards</span>
                </button>
                <button
                  onClick={() => setExamMode("practice")}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    examMode === "practice"
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  data-testid="button-mode-practice"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Target className="w-4 h-4 text-blue-500" />
                    <span className="font-bold text-gray-900">Practice Mode</span>
                  </div>
                  <span className="text-xs text-gray-500 block">Customize question count, focus areas, and study at your own pace</span>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              {isAdminWithAllTiers && (
                <>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">{t("mockExams.examFocus")}</p>
                  <div className="grid gap-2">
                    {tierOptions.filter((tier) => allowedTiers.includes(tier.value)).map((tier) => {
                      const tierStats = tierStatsMap[tier.value] || { total: 0 };
                      return (
                        <button
                          key={tier.value}
                          onClick={() => setSelectedTier(tier.value)}
                          className={`p-4 rounded-xl border-2 text-left transition-all relative ${
                            selectedTier === tier.value
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
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
              {primaryExamTier && !isAdminWithAllTiers && (() => {
                const tierInfo = tierOptions.find(t => t.value === primaryExamTier);
                const tierStats = tierStatsMap[primaryExamTier] || { total: 0 };
                return (
                  <Card className="border-none shadow-sm bg-primary/5 border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2">
                        <GraduationCap className="w-5 h-5 text-primary shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{tierInfo?.label} Exam Track</p>
                          <p className="text-xs text-gray-500">{tierStats.total} {t("mockExams.questionsAvailable")}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })()}
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

            {examMode === "official" && (
              <div className="space-y-3">
                <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Select Exam</p>
                <div className="grid gap-2">
                  {availableBlueprints.map((bp) => {
                    const isCat = bp.examType === "cat";
                    const lengthLabel = isCat
                      ? `Variable length (${bp.minQuestions}-${bp.maxQuestions} items)`
                      : bp.scaledScoreRange
                        ? `${bp.totalQuestions} items - Scaled Score (${bp.scaledScoreRange.min}-${bp.scaledScoreRange.max})`
                        : `${bp.totalQuestions} items`;
                    return (
                      <button
                        key={bp.examCode}
                        onClick={() => setSelectedBlueprint(bp.examCode)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          selectedBlueprint === bp.examCode
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        data-testid={`button-blueprint-${bp.examCode.toLowerCase()}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-gray-900">{bp.examName}</span>
                              <Badge variant="secondary" className={`text-[10px] ${isCat ? "bg-violet-100 text-violet-700" : "bg-blue-100 text-blue-700"}`}>
                                {isCat ? "CAT Mode" : "Scaled Score"}
                              </Badge>
                            </div>
                            <span className="text-xs text-gray-500 block mt-1">{lengthLabel} &middot; {bp.timeLimit} min &middot; {bp.domains.length} domains</span>
                          </div>
                          <Shield className="w-4 h-4 text-primary" />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {selectedBlueprint && EXAM_BLUEPRINTS[selectedBlueprint] && (() => {
                  const bp = EXAM_BLUEPRINTS[selectedBlueprint];
                  const isCat = bp.examType === "cat";
                  return (
                    <Card className="border-none shadow-sm bg-blue-50/50 border-l-4 border-l-primary">
                      <CardContent className="p-4 space-y-3">
                        <p className="text-sm font-semibold text-gray-900">Domain Distribution</p>
                        <div className="space-y-2">
                          {bp.domains.map((d) => (
                            <div key={d.name} className="flex items-center justify-between text-xs">
                              <span className="text-gray-700">{d.name}</span>
                              <span className="font-bold text-gray-900">{Math.round(d.weight * 100)}%</span>
                            </div>
                          ))}
                        </div>
                        <div className="pt-2 border-t border-blue-100 space-y-1">
                          {isCat ? (
                            <>
                              <p className="text-xs text-gray-600">Result: <span className="font-bold">Pass / Fail only</span> (no percentage score)</p>
                              <p className="text-xs text-gray-600">Method: <span className="font-bold">Computer Adaptive Testing (CAT)</span></p>
                              <p className="text-xs text-gray-600">Difficulty adjusts based on your performance</p>
                            </>
                          ) : bp.scaledScoreRange ? (
                            <>
                              <p className="text-xs text-gray-600">Scaled score range: <span className="font-bold">{bp.scaledScoreRange.min} - {bp.scaledScoreRange.max}</span></p>
                              <p className="text-xs text-gray-600">Passing score: <span className="font-bold">{bp.scaledScoreRange.passScore}</span></p>
                              <p className="text-xs text-gray-600">Domain breakdown provided for analytics</p>
                            </>
                          ) : null}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })()}

                <Card className="border-none shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Real Exam Mode Enforced</p>
                        <ul className="text-xs text-gray-600 space-y-1 mt-1.5 list-disc list-inside">
                          {EXAM_BLUEPRINTS[selectedBlueprint]?.examType === "cat" && <li>Adaptive difficulty - questions adjust to your ability level</li>}
                          <li>No going back to previous questions</li>
                          <li>Answers lock once selected</li>
                          <li>Timed mode only -- no pausing</li>
                          <li>Tab switching is tracked</li>
                          <li>Review only after full submission</li>
                          {EXAM_BLUEPRINTS[selectedBlueprint]?.examType === "cat" && <li>No question count shown during exam</li>}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {(examMode === "official" || examMode === "practice") && (
              <div className="space-y-3">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
                  <div className="relative flex justify-center text-xs uppercase"><span className="bg-warmwhite px-2 text-gray-400">or try for free</span></div>
                </div>
                {getReadinessExamForTier(selectedTier, userRegion) && (
                  <button
                    onClick={async () => {
                      if (!user) { navigate("/login"); return; }
                      setStarting(true);
                      try {
                        const result = await getReadinessExamQuestions(selectedTier);
                        const res = await fetch("/api/mock-exams/start", {
                          method: "POST",
                          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
                          body: JSON.stringify({
                            tier: selectedTier,
                            totalQuestions: result.questions.length,
                            questions: result.questions,
                            examMode: "readiness",
                            blueprintCode: result.blueprint.examCode,
                            blueprintMeta: {
                              examCode: result.blueprint.examCode,
                              examName: result.blueprint.examName,
                              passingThreshold: result.blueprint.passingThreshold,
                              domainPassThreshold: result.blueprint.domainPassThreshold,
                              domains: result.blueprint.domains,
                              timeLimit: result.blueprint.timeLimit,
                              examType: result.blueprint.examType,
                            },
                            domainAssignments: result.domainAssignments,
                          }),
                        });
                        const data = await res.json();
                        if (data.attemptId) {
                          localStorage.setItem(`blueprint-${data.attemptId}`, JSON.stringify({
                            ...result.blueprint,
                            domainAssignments: result.domainAssignments,
                          }));
                          navigate(`/mock-exams/${data.attemptId}`);
                        }
                      } catch { setStarting(false); }
                    }}
                    className="w-full p-4 rounded-xl border-2 border-emerald-200 bg-emerald-50/50 text-left transition-all hover:border-emerald-300 hover:shadow-md"
                    data-testid="button-start-readiness"
                    disabled={starting || !user}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Gift className="w-4 h-4 text-emerald-600" />
                          <span className="font-bold text-gray-900">Free Readiness Check</span>
                          <Badge className="bg-emerald-100 text-emerald-700 text-[10px]">Free</Badge>
                        </div>
                        <span className="text-xs text-gray-500 block mt-1">25 questions -- gauge your exam preparedness with a quick assessment</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-emerald-600" />
                    </div>
                  </button>
                )}
              </div>
            )}

            {examMode === "practice" && (
              <>
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
              </>
            )}

            <Button
              size="lg"
              className="w-full h-14 text-lg rounded-full gap-2"
              onClick={() => setShowThemeCustomizer(true)}
              disabled={starting || !user || allowedTiers.length === 0 || !allowedTiers.includes(selectedTier) || (examMode === "official" && !selectedBlueprint)}
              data-testid="button-start-exam"
            >
              {starting ? t("mockExams.preparingExam") : !user ? t("mockExams.signInToStart") : allowedTiers.length === 0 ? t("mockExams.subscriptionRequired") : examMode === "official" ? `Start ${EXAM_BLUEPRINTS[selectedBlueprint]?.examType === "cat" ? "CAT" : "Scaled Score"} Exam` : t("mockExams.startMockExam")}
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
                {completedExams.map((exam) => {
                  const isCatExam = exam.report?.examType === "cat";
                  const isScaledExam = exam.report?.examType === "linear-scaled";
                  const isReadiness = exam.report?.examType === "readiness";
                  const examLabel = exam.report?.blueprintName || `${exam.tier?.toUpperCase()} Mock`;
                  return (
                    <LocaleLink key={exam.id} href={`/mock-exams/${exam.id}/report`}>
                      <Card className="border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-4 flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-bold text-gray-900">{examLabel}</p>
                              {isCatExam && <Badge variant="secondary" className="text-[10px] bg-violet-100 text-violet-700">CAT</Badge>}
                              {isScaledExam && <Badge variant="secondary" className="text-[10px] bg-blue-100 text-blue-700">Scaled</Badge>}
                              {isReadiness && <Badge variant="secondary" className="text-[10px] bg-emerald-100 text-emerald-700">Readiness</Badge>}
                            </div>
                            <p className="text-xs text-gray-400">
                              {new Date(exam.started_at).toLocaleDateString()} - {exam.time_spent ? `${Math.round(exam.time_spent / 60)} ${t("mockExams.min")}` : t("mockExams.na")}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            {isCatExam ? (
                              <span className={`text-lg font-bold ${exam.report?.overallPass ? "text-emerald-600" : "text-red-500"}`}>
                                {exam.report?.overallPass ? "PASS" : "FAIL"}
                              </span>
                            ) : isScaledExam && exam.report?.scaledScore != null ? (
                              <span className={`text-lg font-bold ${exam.report?.overallPass ? "text-emerald-600" : "text-red-500"}`}>
                                {exam.report.scaledScore}
                              </span>
                            ) : (
                              <span className={`text-2xl font-bold ${
                                (exam.report?.percentage || 0) >= 80 ? "text-emerald-600" :
                                (exam.report?.percentage || 0) >= 60 ? "text-amber-600" : "text-red-500"
                              }`}>
                                {exam.report?.percentage || 0}%
                              </span>
                            )}
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                          </div>
                        </CardContent>
                      </Card>
                    </LocaleLink>
                  );
                })}
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

      {showThemeCustomizer && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={() => setShowThemeCustomizer(false)}>
          <Card className="border-none shadow-2xl max-w-lg w-full animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-6 sm:p-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <Palette className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-xl font-bold text-[#2E3A59]" data-testid="text-theme-customizer-title">Customize Your Exam Interface</h2>
                <p className="text-sm text-gray-500">Choose a colour theme that helps you stay focused. Your selection will only apply to this exam session.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {EXAM_THEMES.map((theme) => {
                  const isSelected = examTheme === theme.id;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => setExamTheme(theme.id)}
                      data-testid={`button-exam-theme-${theme.id}`}
                      className={`relative rounded-xl border-2 p-0 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${
                        isSelected
                          ? "border-[#2E3A59] shadow-lg ring-2 ring-[#2E3A59]/20"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <div className="h-8 w-full" style={{ backgroundColor: theme.color }} />
                      <div className="px-2 py-2.5 bg-white">
                        <span className="text-xs font-semibold text-[#2E3A59] leading-tight block">{theme.name}</span>
                      </div>
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-[#2E3A59] flex items-center justify-center">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="rounded-lg border border-gray-100 bg-gray-50 p-3">
                <p className="text-xs font-medium text-gray-500 mb-2">Preview</p>
                <div className="rounded-lg overflow-hidden shadow-sm border border-gray-200">
                  <div className="h-8 flex items-center px-3 gap-2" style={{ backgroundColor: EXAM_THEMES.find(t => t.id === examTheme)?.color || "#8A6BFF" }}>
                    <span className="text-[10px] font-semibold text-[#2E3A59]">Q 4 of 60</span>
                    <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden">
                      <div className="h-full w-1/3 rounded-full" style={{ backgroundColor: "#2E3A59" }} />
                    </div>
                    <span className="text-[10px] font-mono text-[#2E3A59]">12:34</span>
                  </div>
                  <div className="bg-white p-2.5 space-y-1.5">
                    <div className="h-2 bg-gray-200 rounded w-3/4" />
                    <div className="h-2 bg-gray-100 rounded w-1/2" />
                    <div className="flex gap-1.5 mt-2">
                      <div className="h-5 flex-1 rounded border border-gray-200" />
                      <div className="h-5 flex-1 rounded" style={{ backgroundColor: (EXAM_THEMES.find(t => t.id === examTheme)?.color || "#8A6BFF") + "20", borderLeft: `2px solid ${EXAM_THEMES.find(t => t.id === examTheme)?.color || "#8A6BFF"}` }} />
                    </div>
                  </div>
                  <div className="h-7 flex items-center justify-between px-3" style={{ backgroundColor: EXAM_THEMES.find(t => t.id === examTheme)?.color || "#8A6BFF" }}>
                    <span className="text-[9px] font-medium text-[#2E3A59]/60">Previous</span>
                    <span className="text-[9px] font-semibold text-white bg-[#2E3A59]/80 rounded px-2 py-0.5">Next</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 h-12 rounded-full"
                  onClick={() => setShowThemeCustomizer(false)}
                  data-testid="button-cancel-theme"
                >
                  Back
                </Button>
                <Button
                  className="flex-1 h-12 rounded-full text-base font-semibold gap-2"
                  onClick={() => {
                    const selectedTheme = EXAM_THEMES.find(t => t.id === examTheme);
                    if (selectedTheme) {
                      localStorage.setItem("examTheme", selectedTheme.id);
                      localStorage.setItem("examThemeColor", selectedTheme.color);
                    }
                    setShowThemeCustomizer(false);
                    startExam();
                  }}
                  disabled={starting}
                  data-testid="button-begin-exam"
                >
                  {starting ? "Preparing..." : "Begin Exam"}
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
