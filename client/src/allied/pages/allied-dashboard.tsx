import { useState } from "react";
import { useParams, Link } from "wouter";
import { CAREER_CONFIGS, type CareerConfig } from "@shared/careers";
import { BarChart3, Target, TrendingUp, Clock, Flame, Calendar, ChevronRight, BookOpen, Award } from "lucide-react";

const ALLIED_CAREER_MAP: Record<string, CareerConfig> = {
  rrt: CAREER_CONFIGS.rrt, paramedic: CAREER_CONFIGS.paramedic,
  "pharmacy-tech": CAREER_CONFIGS.pharmacyTech, mlt: CAREER_CONFIGS.mlt, imaging: CAREER_CONFIGS.imaging,
};

export default function AlliedDashboardPage() {
  const params = useParams<{ careerSlug: string }>();
  const career = ALLIED_CAREER_MAP[params.careerSlug || ""];
  const [examDate, setExamDate] = useState("");

  if (!career) {
    return <div className="max-w-2xl mx-auto px-4 py-20 text-center"><h1 className="text-2xl font-bold">Career Not Found</h1></div>;
  }

  const mockReadiness = 62;
  const mockStreak = 3;
  const mockAccuracy = 68;
  const mockTimeStudied = 12.5;
  const mockWeakTopics = career.domains.slice(0, 3).map((d, i) => ({ topic: d, accuracy: 40 + i * 8 }));
  const mockDomainMastery = career.domains.map((d, i) => ({ domain: d, mastery: 30 + Math.random() * 60 }));

  const daysUntilExam = examDate ? Math.max(0, Math.ceil((new Date(examDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" data-testid="allied-dashboard-page">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href={`/careers/${career.slug}`} className="hover:text-teal-600">{career.shortName}</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-teal-700 font-medium">Dashboard</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-8" data-testid="text-dashboard-title">{career.shortName} Progress Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-5" data-testid="stat-readiness">
          <Target className="w-6 h-6 text-teal-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{mockReadiness}%</div>
          <div className="text-sm text-gray-500">Readiness Score</div>
          <div className="w-full bg-gray-100 rounded-full h-2 mt-2">
            <div className="h-2 rounded-full bg-teal-500 transition-all" style={{ width: `${mockReadiness}%` }} />
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5" data-testid="stat-streak">
          <Flame className="w-6 h-6 text-orange-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{mockStreak}</div>
          <div className="text-sm text-gray-500">Day Streak</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5" data-testid="stat-accuracy">
          <TrendingUp className="w-6 h-6 text-green-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{mockAccuracy}%</div>
          <div className="text-sm text-gray-500">Avg Accuracy</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5" data-testid="stat-time">
          <Clock className="w-6 h-6 text-blue-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{mockTimeStudied}h</div>
          <div className="text-sm text-gray-500">Time Studied</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 p-6" data-testid="domain-mastery">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-teal-500" /> Domain Mastery</h3>
          <div className="space-y-3">
            {mockDomainMastery.map(d => (
              <div key={d.domain}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700 truncate mr-2">{d.domain}</span>
                  <span className="font-medium text-gray-600">{Math.round(d.mastery)}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="h-2 rounded-full transition-all" style={{ width: `${d.mastery}%`, backgroundColor: d.mastery >= 70 ? "#059669" : d.mastery >= 50 ? "#d97706" : "#dc2626" }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 p-6" data-testid="exam-countdown">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Calendar className="w-5 h-5 text-teal-500" /> Exam Countdown</h3>
            <input type="date" value={examDate} onChange={e => setExamDate(e.target.value)} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm mb-3" data-testid="input-exam-date" />
            {daysUntilExam !== null && (
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-600">{daysUntilExam}</div>
                <div className="text-sm text-gray-500">days remaining</div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-xl border border-gray-100 p-6" data-testid="weak-areas">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2"><Target className="w-5 h-5 text-red-500" /> Weak Areas</h3>
            <div className="space-y-2">
              {mockWeakTopics.map(t => (
                <div key={t.topic} className="flex justify-between items-center text-sm">
                  <span className="text-gray-700">{t.topic}</span>
                  <span className="text-red-600 font-medium">{t.accuracy}%</span>
                </div>
              ))}
            </div>
            <Link href={`/qbank?career=${career.slug}`} className="mt-4 w-full px-4 py-2 bg-red-50 text-red-700 rounded-lg text-sm font-medium hover:bg-red-100 text-center block" data-testid="button-drill-weak">
              Drill Weak Areas
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl border border-teal-100 p-6 text-center" data-testid="readiness-meter">
        <Award className="w-10 h-10 text-teal-500 mx-auto mb-3" />
        <h3 className="text-lg font-bold text-gray-900 mb-1">Estimated Readiness: {mockReadiness}%</h3>
        <p className="text-sm text-gray-600 mb-4">Based on rolling accuracy, topic coverage, and difficulty mastery. Continue studying to improve your score.</p>
        <div className="w-full max-w-md mx-auto bg-white/60 rounded-full h-4">
          <div className="h-4 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all" style={{ width: `${mockReadiness}%` }} />
        </div>
        <p className="text-xs text-gray-500 mt-2">This is an estimated readiness indicator and does not guarantee exam results.</p>
      </div>
    </div>
  );
}
