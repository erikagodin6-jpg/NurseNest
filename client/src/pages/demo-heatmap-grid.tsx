// Demo screenshot component - NOT real learner data.

import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Brain, TrendingUp } from "lucide-react";
import { DemoPageWrapper, DemoHeader, SectionCard, SectionTitle, HeatCell } from "@/components/demo-shared";
import { heatmapData as d } from "@/data/demo-screenshot-data";

export default function DemoHeatmapGrid() {
  const { user, isAdmin } = useAuth();
  if (!user || !isAdmin) return <DemoPageWrapper><div className="flex items-center justify-center min-h-screen"><p className="text-slate-500">Admin access required.</p></div></DemoPageWrapper>;

  const columns = ["Exposure", "Accuracy", "Confidence", "Mastery"];
  const urgencyStyle: Record<string, string> = {
    high: "bg-rose-50 text-rose-600 border-rose-100",
    medium: "bg-amber-50 text-amber-600 border-amber-100",
    low: "bg-emerald-50 text-emerald-600 border-emerald-100",
  };

  return (
    <DemoPageWrapper>
      <main className="max-w-5xl mx-auto px-6 pt-10 pb-16">
        <DemoHeader
          title="Topic Mastery Heatmap"
          subtitle="Multi-dimensional analysis of learning performance across content domains"
          rightContent={
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-50 text-violet-700 text-xs font-semibold border border-violet-100">
              <Brain className="w-3.5 h-3.5" /> Adaptive Intelligence
            </span>
          }
        />

        <SectionCard className="mb-6">
          <SectionTitle title="Performance Grid" subtitle="Color-coded mastery indicators across learning dimensions" />

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left text-xs font-semibold text-slate-500 pb-3 pr-4 w-[160px]">System / Topic</th>
                  {columns.map((col) => (
                    <th key={col} className="text-center text-xs font-semibold text-slate-500 pb-3 px-2 w-20">{col}</th>
                  ))}
                  <th className="text-center text-xs font-semibold text-slate-500 pb-3 px-2 w-24">Urgency</th>
                </tr>
              </thead>
              <tbody>
                {d.systems.map((sys) => (
                  <tr key={sys.name} className="border-t border-slate-50">
                    <td className="py-2 pr-4">
                      <span className="text-sm font-medium text-slate-700">{sys.name}</span>
                    </td>
                    <td className="py-2 px-2"><HeatCell value={sys.exposure} /></td>
                    <td className="py-2 px-2"><HeatCell value={sys.accuracy} /></td>
                    <td className="py-2 px-2"><HeatCell value={sys.confidence} /></td>
                    <td className="py-2 px-2"><HeatCell value={sys.mastery} /></td>
                    <td className="py-2 px-2 text-center">
                      <span className={cn("inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold border capitalize", urgencyStyle[sys.urgency])}>
                        {sys.urgency === "high" ? "High Priority" : sys.urgency === "medium" ? "Review" : "Strong"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center gap-6 mt-5 pt-4 border-t border-slate-100 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-emerald-400" />
              <span className="text-[10px] text-slate-500 font-medium">80-100%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-emerald-300" />
              <span className="text-[10px] text-slate-500 font-medium">70-79%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-amber-300" />
              <span className="text-[10px] text-slate-500 font-medium">60-69%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-amber-400" />
              <span className="text-[10px] text-slate-500 font-medium">50-59%</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-rose-300" />
              <span className="text-[10px] text-slate-500 font-medium">&lt;50%</span>
            </div>
          </div>
        </SectionCard>

        <div className="grid grid-cols-3 gap-5">
          <SectionCard className="text-center">
            <p className="text-2xl font-bold text-emerald-600 mb-1">4</p>
            <p className="text-xs text-slate-500">Strong Topics</p>
            <p className="text-[10px] text-slate-400 mt-1">Cardiovascular, Respiratory, Fundamentals, Mental Health</p>
          </SectionCard>
          <SectionCard className="text-center">
            <p className="text-2xl font-bold text-amber-600 mb-1">3</p>
            <p className="text-xs text-slate-500">Needs Review</p>
            <p className="text-[10px] text-slate-400 mt-1">Neurological, Renal, Maternity</p>
          </SectionCard>
          <SectionCard className="text-center">
            <p className="text-2xl font-bold text-rose-500 mb-1">3</p>
            <p className="text-xs text-slate-500">High Priority</p>
            <p className="text-[10px] text-slate-400 mt-1">Endocrine, Pharmacology, Leadership</p>
          </SectionCard>
        </div>
      </main>
    </DemoPageWrapper>
  );
}
