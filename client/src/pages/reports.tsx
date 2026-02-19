import { useState, useEffect, useMemo } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Award, 
  Clock, 
  ChevronRight,
  BookOpen,
  Target,
  ShieldAlert
} from "lucide-react";

export default function Reports() {
  const [region, setRegion] = useState<"US" | "CA">("CA");

  useEffect(() => {
    setRegion((localStorage.getItem("nursenest-region") as "US" | "CA") || "CA");
  }, []);

  const stats = [
    { label: "Total Study Time", value: "12h 45m", icon: Clock, color: "text-blue-500" },
    { label: "Mastery Score", value: "88%", icon: Target, color: "text-emerald-500" },
    { label: "Questions Completed", value: "452", icon: BarChart3, color: "text-primary" },
    { label: "Current Streak", value: "5 Days", icon: TrendingUp, color: "text-orange-500" }
  ];

  const recentActivity = [
    { module: "AAA Management", score: "90%", date: "Today", type: "Quiz" },
    { module: "Kawasaki Vasculitis", score: "85%", date: "Yesterday", type: "Flashcards" },
    { module: "ALL Pathophysiology", score: "92%", date: "Oct 22", type: "Quiz" },
    { module: "Critical Labs (CA)", score: "88%", date: "Oct 20", type: "Study" }
  ];

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans">
      <Navigation />
      
      <main className="max-w-6xl mx-auto px-4 py-12 w-full">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Performance Analytics</h1>
            <p className="text-gray-600">Tracking your clinical excellence journey ({region === "CA" ? "Canadian" : "US"} Standards).</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="rounded-full gap-2">
              <Calendar className="w-4 h-4" />
              This Month
            </Button>
            <Button className="rounded-full gap-2">
              Export PDF
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, i) => (
            <Card key={i} className="border-none shadow-md bg-white p-6 rounded-3xl">
              <div className="flex items-center gap-4 mb-4">
                <div className={cn("p-3 rounded-2xl bg-gray-50", stat.color)}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
              </div>
              <p className="text-3xl font-black text-gray-900">{stat.value}</p>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 border-none shadow-xl bg-white rounded-[40px] overflow-hidden">
            <CardHeader className="p-8 border-b border-gray-50 flex flex-row items-center justify-between">
              <CardTitle className="text-xl font-bold text-gray-900">Recent Performance</CardTitle>
              <Button variant="ghost" size="sm" className="text-primary font-bold">View All History</Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-gray-50">
                {recentActivity.map((activity, i) => (
                  <div key={i} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{activity.module}</p>
                        <p className="text-xs text-gray-400">{activity.type} • {activity.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-emerald-500 text-lg">{activity.score}</p>
                      <p className="text-[10px] font-bold text-gray-300 uppercase">Proficient</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="border-none shadow-xl bg-gray-900 text-white p-8 rounded-[40px]">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Mastery Badge</h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                You've achieved "Expert" status in Cardiovascular and Oncology modules. Keep studying to reach "Elite".
              </p>
              <Button className="w-full rounded-2xl bg-white text-gray-900 hover:bg-gray-100 font-bold">
                Share Achievement
              </Button>
            </Card>

            <Card className="border-none shadow-md bg-white p-8 rounded-[40px]">
              <h4 className="font-bold text-gray-900 mb-6">Suggested Focus</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-amber-50 rounded-2xl border border-amber-100">
                  <div className="flex items-center gap-3">
                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                    <span className="text-sm font-bold text-amber-900">Pediatric Labs</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-amber-400" />
                </div>
                <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-4 h-4 text-indigo-500" />
                    <span className="text-sm font-bold text-indigo-900">AAA Complications</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-indigo-400" />
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
