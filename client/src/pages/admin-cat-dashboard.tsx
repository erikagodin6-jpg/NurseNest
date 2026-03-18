import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import {
  BarChart3, Activity, Target, StopCircle, AlertTriangle,
  RefreshCw, Settings, TrendingUp
} from "lucide-react";

type CatAnalytics = {
  totalSessions: number;
  abilityDistribution: number[];
  earlyStopRate: string | number;
  avgQuestionCount: number;
  recentSessions: any[];
  adjustmentLog: any[];
};

export default function AdminCatDashboard() {
  const { t } = useI18n();
  const { user } = useAuth();
  const [data, setData] = useState<CatAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  const isAdmin = user?.tier === "admin";

  useEffect(() => {
    if (!isAdmin) return;
    loadData();
  }, [isAdmin]);

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/cat-analytics");
      if (res.ok) setData(await res.json());
    } catch (e) { console.error(e); }
    setLoading(false);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <div className="max-w-4xl mx-auto p-8 text-center">
          <h1 className="text-2xl font-bold">{t("pages.adminCatDashboard.accessDenied")}</h1>
        </div>
      </div>
    );
  }

  const abilityLabels = ["Very Low", "Low", "Below Avg", "Average", "Above Avg", "High", "Very High"];
  const maxAbility = data ? Math.max(...data.abilityDistribution, 1) : 1;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <SEO title={t("pages.adminCatDashboard.adaptiveCatDashboardAdmin")} description={t("pages.adminCatDashboard.catEngineAnalyticsAndCalibration")} />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900" data-testid="text-page-title">{t("pages.adminCatDashboard.adaptiveCatDashboard")}</h1>
            <p className="text-gray-600 mt-1">{t("pages.adminCatDashboard.abilityEstimationDifficultyCalibrationAnd")}</p>
            <p className="text-xs text-gray-400 mt-1">{t("pages.adminCatDashboard.thisIsAPredictiveCoaching")}</p>
          </div>
          <Button data-testid="btn-refresh" onClick={loadData} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-1" /> Refresh
          </Button>
        </div>

        {loading && <div className="flex justify-center py-12"><RefreshCw className="w-8 h-8 animate-spin text-blue-500" /></div>}

        {!loading && data && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Activity className="w-8 h-8 text-blue-500" />
                    <div>
                      <div className="text-2xl font-bold" data-testid="text-total-sessions">{data.totalSessions}</div>
                      <div className="text-sm text-gray-600">{t("pages.adminCatDashboard.totalCatSessions")}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Target className="w-8 h-8 text-green-500" />
                    <div>
                      <div className="text-2xl font-bold" data-testid="text-avg-questions">{data.avgQuestionCount}</div>
                      <div className="text-sm text-gray-600">{t("pages.adminCatDashboard.avgQuestionssession")}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <StopCircle className="w-8 h-8 text-orange-500" />
                    <div>
                      <div className="text-2xl font-bold" data-testid="text-early-stop">{data.earlyStopRate}%</div>
                      <div className="text-sm text-gray-600">{t("pages.adminCatDashboard.earlyStopRate")}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3">
                    <Settings className="w-8 h-8 text-purple-500" />
                    <div>
                      <div className="text-2xl font-bold" data-testid="text-adjustments">{data.adjustmentLog.length}</div>
                      <div className="text-sm text-gray-600">{t("pages.adminCatDashboard.calibrationAdjustments")}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><BarChart3 className="w-5 h-5" /> {t("pages.adminCatDashboard.abilityDistributionHistogram")}</CardTitle>
              </CardHeader>
              <CardContent>
                {data.totalSessions === 0 ? (
                  <div className="text-center py-8 text-gray-500">{t("pages.adminCatDashboard.noCatSessionsRecordedYet")}</div>
                ) : (
                  <div className="flex items-end gap-2 h-48">
                    {data.abilityDistribution.map((count, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center" data-testid={`bar-ability-${i}`}>
                        <div className="text-xs font-medium mb-1">{count}</div>
                        <div
                          className="w-full bg-blue-500 rounded-t transition-all"
                          style={{ height: `${(count / maxAbility) * 100}%`, minHeight: count > 0 ? "4px" : "0px" }}
                        />
                        <div className="text-xs text-gray-500 mt-2 text-center">{abilityLabels[i]}</div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5" /> {t("pages.adminCatDashboard.recentSessions")}</CardTitle>
                </CardHeader>
                <CardContent>
                  {data.recentSessions.length === 0 ? (
                    <div className="text-center py-4 text-gray-500 text-sm">{t("pages.adminCatDashboard.noSessionsYet")}</div>
                  ) : (
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {data.recentSessions.map((s: any, i: number) => (
                        <div key={i} className="flex items-center justify-between p-2 border rounded text-sm">
                          <div>
                            <span className="font-medium">Ability: {Number(s.final_ability).toFixed(1)}</span>
                            <span className="text-gray-500 ml-2">CI: ±{Number(s.confidence_interval).toFixed(1)}</span>
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="outline" className="text-xs">{s.question_count}Q</Badge>
                            {s.early_stop && <Badge className="text-xs bg-orange-100 text-orange-700">{t("pages.adminCatDashboard.earlyStop")}</Badge>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> {t("pages.adminCatDashboard.difficultyAdjustmentLog")}</CardTitle>
                </CardHeader>
                <CardContent>
                  {data.adjustmentLog.length === 0 ? (
                    <div className="text-center py-4 text-gray-500 text-sm">{t("pages.adminCatDashboard.noCalibrationAdjustmentsRecordedYet")}</div>
                  ) : (
                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                      {data.adjustmentLog.map((a: any, i: number) => (
                        <div key={i} className="p-2 border rounded text-sm">
                          <div className="flex justify-between">
                            <span className="font-medium">Level {a.difficulty_level}</span>
                            <span className="text-xs text-gray-500">{new Date(a.created_at).toLocaleDateString()}</span>
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {Number(a.old_scaling).toFixed(2)} → {Number(a.new_scaling).toFixed(2)} | {a.reason}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
