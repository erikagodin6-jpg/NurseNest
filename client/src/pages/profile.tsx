import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { User, BookOpen, FileText, Crown, LogOut, Printer, Trash2 } from "lucide-react";
import { contentMap } from "@/data/lessons";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetch(`/api/notes/${user.id}`)
      .then((r) => r.json())
      .then(setNotes)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [user]);

  function handlePrint(note: any) {
    const lesson = contentMap[note.lessonId];
    const w = window.open("", "_blank");
    if (w) {
      w.document.write(`
        <html><head><title>${lesson?.title || note.lessonId} - Notes</title>
        <style>body{font-family:sans-serif;padding:40px;max-width:800px;margin:auto;line-height:1.6}h1{color:#333}pre{white-space:pre-wrap;font-family:inherit}</style>
        </head><body><h1>${lesson?.title || note.lessonId} - My Notes</h1><pre>${note.content}</pre></body></html>
      `);
      w.document.close();
      w.print();
    }
  }

  async function handleDelete(noteId: string, lessonId: string) {
    if (!user) return;
    await fetch(`/api/notes/${user.id}/${lessonId}`, { method: "DELETE" });
    setNotes(notes.filter((n) => n.id !== noteId));
    toast({ title: "Note deleted" });
  }

  function handleManageSubscription() {
    if (!user) return;
    fetch("/api/stripe/portal", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.url) window.location.href = data.url;
      });
  }

  if (!user) return null;

  const tierLabels: Record<string, string> = { rpn: "RPN/LVN", rn: "RN/NCLEX", np: "NP Advanced", free: "Free" };

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
      <Navigation />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">My Profile</h1>
          <Button variant="outline" onClick={() => { logout(); navigate("/"); }} data-testid="button-logout">
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="w-5 h-5 text-primary" /> Account
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p><span className="text-gray-500">Username:</span> <strong>{user.username}</strong></p>
              <p><span className="text-gray-500">Email:</span> <strong>{user.email || "Not set"}</strong></p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Crown className="w-5 h-5 text-amber-500" /> Subscription
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p><span className="text-gray-500">Tier:</span> <strong className="text-primary">{tierLabels[user.tier] || user.tier}</strong></p>
              <p><span className="text-gray-500">Status:</span>{" "}
                <span className={user.subscriptionStatus === "active" ? "text-emerald-600 font-bold" : "text-gray-400"}>
                  {user.subscriptionStatus === "active" ? "Active" : "Inactive"}
                </span>
              </p>
              {user.subscriptionStatus === "active" && (
                <Button variant="outline" size="sm" onClick={handleManageSubscription} data-testid="button-manage-subscription">
                  Manage Subscription
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> My Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-gray-500">Loading notes...</p>
            ) : notes.length === 0 ? (
              <p className="text-gray-500">No notes yet. Take notes while studying lessons and they'll appear here.</p>
            ) : (
              <div className="space-y-4">
                {notes.map((note) => {
                  const lesson = contentMap[note.lessonId];
                  return (
                    <div key={note.id} className="border rounded-xl p-4 space-y-2" data-testid={`note-item-${note.id}`}>
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-900">{lesson?.title || note.lessonId}</h3>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handlePrint(note)} data-testid={`button-print-note-${note.id}`}>
                            <Printer className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(note.id, note.lessonId)} data-testid={`button-delete-note-${note.id}`}>
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </Button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 whitespace-pre-wrap line-clamp-3">{note.content}</p>
                      <p className="text-xs text-gray-400">Last updated: {new Date(note.updatedAt).toLocaleDateString()}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
