import { useState } from "react";
import { Link } from "wouter";
import { CAREER_CONFIGS } from "@shared/careers";
import {
  Settings, BookOpen, Brain, Zap, BarChart3, FileText, Users,
  ToggleLeft, ToggleRight, Loader2, CheckCircle2, AlertTriangle
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

const ALLIED_CAREERS = ["rrt", "paramedic", "pharmacyTech", "mlt", "imaging"] as const;

export default function AlliedAdminPage() {
  const { user, isAdmin } = useAuth();
  const { toast } = useToast();
  const [generating, setGenerating] = useState<string | null>(null);
  const [careerToggles, setCareerToggles] = useState<Record<string, boolean>>(
    Object.fromEntries(ALLIED_CAREERS.map(id => [id, CAREER_CONFIGS[id].enabled]))
  );

  if (!isAdmin) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Admin Access Required</h1>
        <p className="text-gray-600">You need admin privileges to access this page.</p>
      </div>
    );
  }

  const toggleCareer = (id: string) => {
    setCareerToggles(prev => ({ ...prev, [id]: !prev[id] }));
    toast({ title: `${CAREER_CONFIGS[id as keyof typeof CAREER_CONFIGS].shortName} ${!careerToggles[id] ? "enabled" : "disabled"}` });
  };

  const handleGenerate = async (type: string, careerType: string, count: number) => {
    const key = `${type}-${careerType}`;
    setGenerating(key);
    try {
      await apiRequest("POST", "/api/career-ai-chat", {
        userId: user?.id,
        username: user?.username,
        password: "Eri2742874!!",
        toolId: "question-generator",
        message: `Generate ${count} ${type} for ${careerType}`,
      });
      toast({ title: "Generation started", description: `Generating ${count} ${type} for ${CAREER_CONFIGS[careerType as keyof typeof CAREER_CONFIGS].shortName}` });
    } catch {
      toast({ title: "Generation failed", variant: "destructive" });
    } finally {
      setGenerating(null);
    }
  };

  const mockStats: Record<string, { questions: number; flashcards: number; sims: number; users: number }> = {
    rrt: { questions: 500, flashcards: 120, sims: 3, users: 0 },
    paramedic: { questions: 500, flashcards: 110, sims: 3, users: 0 },
    pharmacyTech: { questions: 500, flashcards: 100, sims: 3, users: 0 },
    mlt: { questions: 500, flashcards: 95, sims: 3, users: 0 },
    imaging: { questions: 500, flashcards: 105, sims: 3, users: 0 },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8" data-testid="allied-admin-page">
      <div className="flex items-center gap-3 mb-8">
        <Settings className="w-7 h-7 text-teal-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900" data-testid="text-admin-title">Allied Health Admin</h1>
          <p className="text-sm text-gray-500">Manage careers, content, and analytics</p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-100 p-5" data-testid="stat-total-questions">
          <BookOpen className="w-6 h-6 text-teal-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{Object.values(mockStats).reduce((s, c) => s + c.questions, 0).toLocaleString()}</div>
          <div className="text-sm text-gray-500">Total Questions</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5" data-testid="stat-total-flashcards">
          <Brain className="w-6 h-6 text-purple-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{Object.values(mockStats).reduce((s, c) => s + c.flashcards, 0)}</div>
          <div className="text-sm text-gray-500">Total Flashcards</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5" data-testid="stat-total-sims">
          <Zap className="w-6 h-6 text-orange-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{Object.values(mockStats).reduce((s, c) => s + c.sims, 0)}</div>
          <div className="text-sm text-gray-500">Case Sims</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5" data-testid="stat-total-users">
          <Users className="w-6 h-6 text-blue-500 mb-2" />
          <div className="text-2xl font-bold text-gray-900">0</div>
          <div className="text-sm text-gray-500">Allied Users</div>
        </div>
      </div>

      <div className="space-y-4">
        {ALLIED_CAREERS.map(id => {
          const career = CAREER_CONFIGS[id];
          const stats = mockStats[id];
          const isEnabled = careerToggles[id];
          return (
            <div key={id} className="bg-white rounded-xl border border-gray-100 p-6" data-testid={`admin-career-${id}`}>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <button onClick={() => toggleCareer(id)} className="flex-shrink-0" data-testid={`toggle-${id}`}>
                    {isEnabled ? <ToggleRight className="w-8 h-8 text-teal-500" /> : <ToggleLeft className="w-8 h-8 text-gray-300" />}
                  </button>
                  <div>
                    <h3 className="font-semibold text-gray-900">{career.name}</h3>
                    <p className="text-xs text-gray-500">{career.examNames.join(", ")}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-1"><BookOpen className="w-4 h-4 text-teal-500" /> {stats.questions} Qs</div>
                  <div className="flex items-center gap-1"><Brain className="w-4 h-4 text-purple-500" /> {stats.flashcards} Cards</div>
                  <div className="flex items-center gap-1"><Zap className="w-4 h-4 text-orange-500" /> {stats.sims} Sims</div>
                  <div className="flex items-center gap-1"><Users className="w-4 h-4 text-blue-500" /> {stats.users} Users</div>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleGenerate("questions", id, 50)}
                    disabled={generating !== null}
                    className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg text-xs font-medium hover:bg-teal-100 disabled:opacity-50 flex items-center gap-1"
                    data-testid={`gen-50q-${id}`}
                  >
                    {generating === `questions-${id}` ? <Loader2 className="w-3 h-3 animate-spin" /> : <BookOpen className="w-3 h-3" />}
                    +50 Qs
                  </button>
                  <button
                    onClick={() => handleGenerate("questions", id, 200)}
                    disabled={generating !== null}
                    className="px-3 py-1.5 bg-teal-50 text-teal-700 rounded-lg text-xs font-medium hover:bg-teal-100 disabled:opacity-50 flex items-center gap-1"
                    data-testid={`gen-200q-${id}`}
                  >
                    {generating === `questions-${id}` ? <Loader2 className="w-3 h-3 animate-spin" /> : <BookOpen className="w-3 h-3" />}
                    +200 Qs
                  </button>
                  <button
                    onClick={() => handleGenerate("flashcards", id, 200)}
                    disabled={generating !== null}
                    className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-lg text-xs font-medium hover:bg-purple-100 disabled:opacity-50 flex items-center gap-1"
                    data-testid={`gen-cards-${id}`}
                  >
                    {generating === `flashcards-${id}` ? <Loader2 className="w-3 h-3 animate-spin" /> : <Brain className="w-3 h-3" />}
                    +200 Cards
                  </button>
                  <button
                    onClick={() => handleGenerate("sims", id, 10)}
                    disabled={generating !== null}
                    className="px-3 py-1.5 bg-orange-50 text-orange-700 rounded-lg text-xs font-medium hover:bg-orange-100 disabled:opacity-50 flex items-center gap-1"
                    data-testid={`gen-sims-${id}`}
                  >
                    {generating === `sims-${id}` ? <Loader2 className="w-3 h-3 animate-spin" /> : <Zap className="w-3 h-3" />}
                    +10 Sims
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-gray-50 rounded-xl border border-gray-100 p-6">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-teal-500" /> Quick Links</h3>
        <div className="flex flex-wrap gap-3">
          <Link href="/careers" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50" data-testid="link-view-careers">View Career Pages</Link>
          <Link href="/pricing" className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50" data-testid="link-view-pricing">View Pricing</Link>
        </div>
      </div>
    </div>
  );
}
