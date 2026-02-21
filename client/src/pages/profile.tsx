import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { User, BookOpen, FileText, Crown, LogOut, Printer, Trash2, Plus, Pencil, X, RotateCcw, ChevronLeft, ChevronRight, Layers } from "lucide-react";
import { contentMap } from "@/data/lessons";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [notes, setNotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [flashcards, setFlashcards] = useState<any[]>([]);
  const [flashcardsLoading, setFlashcardsLoading] = useState(true);
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [editingCard, setEditingCard] = useState<any>(null);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [newCategory, setNewCategory] = useState("My Cards");
  const [studyMode, setStudyMode] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

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
    fetch(`/api/user-flashcards/${user.id}`)
      .then((r) => r.json())
      .then(setFlashcards)
      .catch(() => {})
      .finally(() => setFlashcardsLoading(false));
  }, [user]);

  async function handleCreateFlashcard() {
    if (!user || !newQuestion.trim() || !newAnswer.trim()) return;
    const res = await fetch("/api/user-flashcards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, question: newQuestion, answer: newAnswer, category: newCategory }),
    });
    if (res.ok) {
      const card = await res.json();
      setFlashcards([card, ...flashcards]);
      setNewQuestion(""); setNewAnswer(""); setNewCategory("My Cards"); setShowCreateCard(false);
      toast({ title: "Flashcard created" });
    }
  }

  async function handleUpdateFlashcard() {
    if (!user || !editingCard) return;
    const res = await fetch(`/api/user-flashcards/${editingCard.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.id, question: newQuestion, answer: newAnswer, category: newCategory }),
    });
    if (res.ok) {
      const updated = await res.json();
      setFlashcards(flashcards.map(c => c.id === updated.id ? updated : c));
      setEditingCard(null); setNewQuestion(""); setNewAnswer(""); setNewCategory("My Cards");
      toast({ title: "Flashcard updated" });
    }
  }

  async function handleDeleteFlashcard(id: string) {
    if (!user) return;
    await fetch(`/api/user-flashcards/${id}?userId=${user.id}`, { method: "DELETE" });
    setFlashcards(flashcards.filter(c => c.id !== id));
    toast({ title: "Flashcard deleted" });
  }

  function startEdit(card: any) {
    setEditingCard(card);
    setNewQuestion(card.question);
    setNewAnswer(card.answer);
    setNewCategory(card.category || "My Cards");
    setShowCreateCard(true);
  }

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
              <Layers className="w-5 h-5 text-indigo-500" /> My Flashcards
              <span className="text-sm font-normal text-gray-400 ml-2">{flashcards.length} cards</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {studyMode && flashcards.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{currentIndex + 1} / {flashcards.length}</span>
                  <Button variant="outline" size="sm" onClick={() => { setStudyMode(false); setCurrentIndex(0); setFlipped(false); }} data-testid="button-exit-study">
                    <X className="w-4 h-4 mr-1" /> Exit Study
                  </Button>
                </div>
                <div
                  className="min-h-[200px] border-2 rounded-2xl p-8 flex items-center justify-center cursor-pointer transition-all hover:shadow-md bg-gradient-to-br from-white to-gray-50"
                  onClick={() => setFlipped(!flipped)}
                  data-testid="flashcard-study-card"
                >
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-2">{flipped ? "ANSWER" : "QUESTION"}</p>
                    <p className="text-lg font-medium">{flipped ? flashcards[currentIndex]?.answer : flashcards[currentIndex]?.question}</p>
                    {!flipped && <p className="text-xs text-gray-400 mt-4">Tap to reveal answer</p>}
                  </div>
                </div>
                <div className="flex justify-center gap-4">
                  <Button variant="outline" size="sm" onClick={() => { setCurrentIndex(Math.max(0, currentIndex - 1)); setFlipped(false); }} disabled={currentIndex === 0} data-testid="button-prev-card">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => { setFlipped(false); }} data-testid="button-flip-card">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => { setCurrentIndex(Math.min(flashcards.length - 1, currentIndex + 1)); setFlipped(false); }} disabled={currentIndex === flashcards.length - 1} data-testid="button-next-card">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => { setShowCreateCard(!showCreateCard); setEditingCard(null); setNewQuestion(""); setNewAnswer(""); setNewCategory("My Cards"); }} data-testid="button-create-flashcard">
                    <Plus className="w-4 h-4 mr-1" /> New Card
                  </Button>
                  {flashcards.length > 0 && (
                    <Button variant="outline" size="sm" onClick={() => { setStudyMode(true); setCurrentIndex(0); setFlipped(false); }} data-testid="button-study-flashcards">
                      <BookOpen className="w-4 h-4 mr-1" /> Study ({flashcards.length})
                    </Button>
                  )}
                </div>

                {showCreateCard && (
                  <div className="border rounded-xl p-4 space-y-3 bg-gray-50">
                    <Input placeholder="Question" value={newQuestion} onChange={e => setNewQuestion(e.target.value)} data-testid="input-flashcard-question" />
                    <Textarea placeholder="Answer" value={newAnswer} onChange={e => setNewAnswer(e.target.value)} rows={3} data-testid="input-flashcard-answer" />
                    <Input placeholder="Category (optional)" value={newCategory} onChange={e => setNewCategory(e.target.value)} data-testid="input-flashcard-category" />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={editingCard ? handleUpdateFlashcard : handleCreateFlashcard} disabled={!newQuestion.trim() || !newAnswer.trim()} data-testid="button-save-flashcard">
                        {editingCard ? "Update" : "Save"}
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => { setShowCreateCard(false); setEditingCard(null); }} data-testid="button-cancel-flashcard">
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}

                {flashcardsLoading ? (
                  <p className="text-gray-500">Loading flashcards...</p>
                ) : flashcards.length === 0 && !showCreateCard ? (
                  <p className="text-gray-500">No flashcards yet. Create your own study cards to review anytime.</p>
                ) : (
                  <div className="space-y-3">
                    {flashcards.map(card => (
                      <div key={card.id} className="border rounded-xl p-4 space-y-1" data-testid={`flashcard-item-${card.id}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{card.question}</p>
                            <p className="text-sm text-gray-600 mt-1">{card.answer}</p>
                            {card.category && <p className="text-xs text-gray-400 mt-1">{card.category}</p>}
                          </div>
                          <div className="flex gap-1 ml-2 flex-shrink-0">
                            <Button variant="ghost" size="sm" onClick={() => startEdit(card)} data-testid={`button-edit-flashcard-${card.id}`}>
                              <Pencil className="w-3 h-3" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteFlashcard(card.id)} data-testid={`button-delete-flashcard-${card.id}`}>
                              <Trash2 className="w-3 h-3 text-red-400" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

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
      <Footer />
    </div>
  );
}
