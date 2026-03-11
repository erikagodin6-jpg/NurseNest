import { useState, useEffect } from "react";
import { Link } from "wouter";
import { BookOpen, Brain, FileText, Trash2, Plus, Edit2, Eye, EyeOff, Search, ChevronRight } from "lucide-react";
import { useAuth } from "@/lib/auth";

type Tab = "lessons" | "questions" | "flashcard-decks" | "exams";

export default function PharmtechAdminPage() {
  const { user, isAdmin } = useAuth();
  const [tab, setTab] = useState<Tab>("lessons");
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/pharmtech/${tab}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch { setItems([]); }
    setLoading(false);
  };

  useEffect(() => { fetchItems(); }, [tab]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    await fetch(`/api/admin/pharmtech/${tab}/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    fetchItems();
  };

  const handleTogglePublish = async (item: any) => {
    const endpoint = tab === "questions" ? "questions" : tab === "flashcard-decks" ? "flashcard-decks" : tab === "exams" ? "exams" : "lessons";
    await fetch(`/api/admin/pharmtech/${endpoint}/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
      body: JSON.stringify({ published: !item.published }),
    });
    fetchItems();
  };

  if (!isAdmin) {
    return <div className="max-w-2xl mx-auto px-4 py-20 text-center"><h1 className="text-2xl font-bold text-gray-900">Admin Access Required</h1></div>;
  }

  const filtered = items.filter(item => {
    if (!search) return true;
    const s = search.toLowerCase();
    return (item.title || item.stem || "").toLowerCase().includes(s) || (item.category || "").toLowerCase().includes(s) || (item.slug || "").toLowerCase().includes(s);
  });

  const tabs: { key: Tab; label: string; icon: any }[] = [
    { key: "lessons", label: "Lessons", icon: BookOpen },
    { key: "questions", label: "Questions", icon: FileText },
    { key: "flashcard-decks", label: "Flashcard Decks", icon: Brain },
    { key: "exams", label: "Exams", icon: FileText },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="pharmtech-admin-page">
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link href="/admin/allied" className="hover:text-teal-600">Admin</Link>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-green-700 font-medium">Pharmacy Technician</span>
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">Pharmacy Technician Content Manager</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => { setTab(t.key); setSearch(""); }}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${tab === t.key ? "bg-green-600 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
            data-testid={`tab-${t.key}`}
          >
            <t.icon className="w-4 h-4" />
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            data-testid="input-admin-search"
          />
        </div>
        <span className="text-sm text-gray-500">{filtered.length} items</span>
      </div>

      {loading ? (
        <div className="flex justify-center py-20"><div className="w-8 h-8 border-3 border-green-500 border-t-transparent rounded-full animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
          <p className="text-gray-500">No items found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(item => (
            <div key={item.id} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center justify-between" data-testid={`admin-item-${item.id}`}>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-block w-2 h-2 rounded-full ${item.published ? "bg-green-500" : "bg-gray-300"}`} />
                  <h3 className="font-medium text-gray-900 text-sm truncate">{item.title || item.stem?.substring(0, 80) || "Untitled"}</h3>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  {item.slug && <span className="bg-gray-50 px-1.5 py-0.5 rounded">{item.slug}</span>}
                  {item.category && <span className="bg-gray-50 px-1.5 py-0.5 rounded">{item.category}</span>}
                  {item.difficulty && <span>Difficulty {item.difficulty}</span>}
                  {item.cardCount !== undefined && <span>{item.cardCount} cards</span>}
                  {item.questionIds && <span>{item.questionIds.length} questions</span>}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button onClick={() => handleTogglePublish(item)} className={`p-1.5 rounded-lg transition-colors ${item.published ? "text-green-600 hover:bg-green-50" : "text-gray-400 hover:bg-gray-50"}`} title={item.published ? "Unpublish" : "Publish"} data-testid={`button-publish-${item.id}`}>
                  {item.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </button>
                <button onClick={() => handleDelete(item.id)} className="p-1.5 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors" data-testid={`button-delete-${item.id}`}>
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
