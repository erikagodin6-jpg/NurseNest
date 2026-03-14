import { useQuery } from "@tanstack/react-query";
import { adminFetch } from "@/lib/admin-fetch";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  RefreshCw,
  DollarSign,
  TrendingUp,
  FileText,
  Users,
  ArrowLeft,
  BarChart3,
  Activity,
} from "lucide-react";

export default function AdminBusinessHealth() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["business-health"],
    queryFn: async () => {
      const res = await adminFetch("/api/admin/business-health");
      if (!res.ok) throw new Error("Failed to load business health data");
      return res.json();
    },
    refetchInterval: 30000,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const spend = data?.spend || { daily: 0, weekly: 0, monthly: 0, caps: {} };
  const content = data?.content || { published: 0, drafts: 0, total: 0 };
  const aiJobs = data?.aiJobs || { totalJobs: 0, completedJobs: 0, totalItemsGenerated: 0, totalAiSpend: 0, costPerItem: 0 };
  const revenue = data?.revenue || { activeSubscribers: 0, mrr: 0, totalRevenue: 0 };
  const roi = data?.roi || 0;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <a href="/admin" className="text-gray-500 hover:text-gray-700" data-testid="link-back-admin">
            <ArrowLeft className="w-5 h-5" />
          </a>
          <h1 className="text-2xl font-bold" data-testid="text-page-title">Business Health Dashboard</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <TrendingUp className="w-4 h-4" />
                <span>ROI</span>
              </div>
              <p className="text-3xl font-bold text-green-600" data-testid="text-roi">
                {roi > 0 ? `${roi.toFixed(1)}x` : "N/A"}
              </p>
              <p className="text-xs text-gray-400 mt-1">Revenue / AI Spend</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <DollarSign className="w-4 h-4" />
                <span>Monthly Revenue (MRR)</span>
              </div>
              <p className="text-3xl font-bold text-blue-600" data-testid="text-mrr">
                ${revenue.mrr.toFixed(2)}
              </p>
              <p className="text-xs text-gray-400 mt-1">{revenue.activeSubscribers} active subscribers</p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <DollarSign className="w-4 h-4" />
                <span>Total Revenue</span>
              </div>
              <p className="text-3xl font-bold text-purple-600" data-testid="text-total-revenue">
                ${revenue.totalRevenue.toFixed(2)}
              </p>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="pt-4">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                <DollarSign className="w-4 h-4" />
                <span>Total AI Spend</span>
              </div>
              <p className="text-3xl font-bold text-orange-600" data-testid="text-total-ai-spend">
                ${aiJobs.totalAiSpend.toFixed(2)}
              </p>
              <p className="text-xs text-gray-400 mt-1">${aiJobs.costPerItem.toFixed(4)} per item</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                AI Spend Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm font-medium">Today</span>
                  <div className="text-right">
                    <span className="font-bold" data-testid="text-spend-daily">${spend.daily.toFixed(2)}</span>
                    <span className="text-sm text-gray-400"> / ${spend.caps?.dailyCap || 10}</span>
                    <div className="w-32 bg-gray-200 rounded-full h-1.5 mt-1">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, (spend.daily / (spend.caps?.dailyCap || 10)) * 100)}%` }} />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm font-medium">This Week</span>
                  <div className="text-right">
                    <span className="font-bold" data-testid="text-spend-weekly">${spend.weekly.toFixed(2)}</span>
                    <span className="text-sm text-gray-400"> / ${spend.caps?.weeklyCap || 50}</span>
                    <div className="w-32 bg-gray-200 rounded-full h-1.5 mt-1">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${Math.min(100, (spend.weekly / (spend.caps?.weeklyCap || 50)) * 100)}%` }} />
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm font-medium">This Month</span>
                  <span className="font-bold" data-testid="text-spend-monthly">${spend.monthly.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Revenue Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm font-medium">Active Subscribers</span>
                  <span className="font-bold text-lg" data-testid="text-active-subs">{revenue.activeSubscribers}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm font-medium">Monthly Recurring Revenue</span>
                  <span className="font-bold text-lg text-green-600" data-testid="text-mrr-detail">${revenue.mrr.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm font-medium">Total Revenue</span>
                  <span className="font-bold text-lg" data-testid="text-total-rev-detail">${revenue.totalRevenue.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Content Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm font-medium">Published Content</span>
                  <span className="font-bold text-lg text-green-600" data-testid="text-published-count">{content.published}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm font-medium">Draft Content</span>
                  <span className="font-bold text-lg text-yellow-600" data-testid="text-draft-count">{content.drafts}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm font-medium">Total Content Items</span>
                  <span className="font-bold text-lg" data-testid="text-total-content">{content.total}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                AI Generation Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm font-medium">Total Jobs Run</span>
                  <span className="font-bold text-lg" data-testid="text-total-jobs">{aiJobs.totalJobs}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm font-medium">Completed Jobs</span>
                  <span className="font-bold text-lg text-green-600" data-testid="text-completed-jobs">{aiJobs.completedJobs}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm font-medium">Items Generated</span>
                  <span className="font-bold text-lg" data-testid="text-items-generated">{aiJobs.totalItemsGenerated}</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <span className="text-sm font-medium">Cost Per Item</span>
                  <span className="font-bold text-lg" data-testid="text-cost-per-item">${aiJobs.costPerItem.toFixed(4)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
