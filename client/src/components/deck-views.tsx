import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight, ChevronLeft, ArrowLeft, Plus, Search, Trash2, Pencil, Loader2,
  BookOpen, Layers, Copy, Flag, Globe, EyeOff, Eye, Timer, Upload,
  Download, BarChart3, Sparkles, Lock, CreditCard, CheckCircle2,
  XCircle, RefreshCw, Share2
} from "lucide-react";
import { cn } from "@/lib/utils";

type DeckViewsProps = {
  user: any;
  isPaid: boolean;
  view: string;
  setView: (v: any) => void;
  setLocation: (l: string) => void;
  myDecks: any[];
  setMyDecks: (d: any) => void;
  publicDecks: any[];
  savedDecksList: any[];
  currentDeck: any;
  setCurrentDeck: (d: any) => void;
  deckCards: any[];
  setDeckCards: (c: any) => void;
  deckLoading: boolean;
  entitlement: any;
  deckTab: string;
  setDeckTab: (t: any) => void;
  deckSearchQuery: string;
  setDeckSearchQuery: (s: string) => void;
  fetchMyDecks: () => void;
  fetchPublicDecks: () => void;
  fetchSavedDecks: () => void;
  fetchDeckCards: (id: string) => void;
  fetchEntitlement: () => void;
  createDeck: () => void;
  addCardToDeck: (f?: string, b?: string) => void;
  deleteDeckCard: (id: string) => void;
  deleteDeck: (id: string) => void;
  startDeckStudy: (mode: "learn" | "test") => void;
  handleDeckStudyAnswer: (correct: boolean) => void;
  saveDeck: (id: string) => void;
  duplicateDeck: (id: string) => void;
  reportDeck: (id: string, reason: string) => void;
  aiCheckCard: () => void;
  handleCsvImport: () => void;
  newDeckTitle: string;
  setNewDeckTitle: (s: string) => void;
  newDeckDescription: string;
  setNewDeckDescription: (s: string) => void;
  newDeckVisibility: string;
  setNewDeckVisibility: (s: string) => void;
  newCardFront: string;
  setNewCardFront: (s: string) => void;
  newCardBack: string;
  setNewCardBack: (s: string) => void;
  newCardRationale: string;
  setNewCardRationale: (s: string) => void;
  aiCheckResult: any;
  aiChecking: boolean;
  csvImportText: string;
  setCsvImportText: (s: string) => void;
  showCsvImport: boolean;
  setShowCsvImport: (b: boolean) => void;
  aiGeneratePrompt: string;
  setAiGeneratePrompt: (s: string) => void;
  aiGenerateCount: number;
  setAiGenerateCount: (n: number) => void;
  aiGenerating: boolean;
  aiGeneratedCards: {front: string; back: string; rationale: string}[];
  aiGenerateCards: () => void;
  addAiGeneratedCards: () => void;
  removeAiGeneratedCard: (index: number) => void;
  aiUpgradeRequired: boolean;
  deckStudyIndex: number;
  deckStudyFlipped: boolean;
  setDeckStudyFlipped: (b: boolean) => void;
  deckStudyCorrect: number;
  deckStudyIncorrect: number;
  deckStudyQueue: any[];
  deckStudyComplete: boolean;
  deckStudyStartTime: number;
  deckStudyMissed: string[];
};

export function DeckHub({
  user, isPaid, setView, setLocation, myDecks, setMyDecks, publicDecks, savedDecksList,
  currentDeck, setCurrentDeck, deckCards, setDeckCards, deckLoading, entitlement,
  deckTab, setDeckTab, deckSearchQuery, setDeckSearchQuery,
  fetchMyDecks, fetchPublicDecks, fetchSavedDecks, fetchDeckCards, fetchEntitlement,
  createDeck, deleteDeck, saveDeck, duplicateDeck,
  newDeckTitle, setNewDeckTitle, newDeckDescription, setNewDeckDescription,
  newDeckVisibility, setNewDeckVisibility,
}: Partial<DeckViewsProps> & { user: any; setView: any; setLocation: any }) {
  const [showCreate, setShowCreate] = useState(false);
  const [createMode, setCreateMode] = useState<"manual" | "ai">("ai");
  const [aiTopic, setAiTopic] = useState("");
  const [aiCardCount, setAiCardCount] = useState(10);
  const [aiCreating, setAiCreating] = useState(false);
  const [aiPreviewCards, setAiPreviewCards] = useState<{front: string; back: string; rationale: string}[]>([]);
  const [aiError, setAiError] = useState("");

  const handleCreateWithAI = async () => {
    if (!user || !aiTopic.trim()) return;
    setAiCreating(true);
    setAiError("");
    setAiPreviewCards([]);
    try {
      const title = aiTopic.trim().length > 60 ? aiTopic.trim().substring(0, 60) : aiTopic.trim();
      const deckRes = await fetch("/api/decks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, title, description: `AI-generated deck: ${aiTopic}`, visibility: newDeckVisibility || "private" }),
      });
      if (!deckRes.ok) { setAiError("Failed to create deck."); return; }
      const deck = await deckRes.json();

      const genRes = await fetch(`/api/decks/${deck.id}/ai-generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, prompt: aiTopic, count: aiCardCount }),
      });
      if (!genRes.ok) {
        const err = await genRes.json();
        if (err.upgradeRequired) {
          setAiError("You've reached the free card limit. Upgrade to create more cards with AI.");
        } else {
          setAiError(err.error || "AI generation failed. Try again.");
        }
        setMyDecks?.((prev: any) => [deck, ...prev]);
        setCurrentDeck?.(deck);
        setDeckCards?.([]);
        setView("deck-edit");
        setShowCreate(false);
        return;
      }
      const data = await genRes.json();
      const cards = data.cards || [];

      if (cards.length > 0) {
        const bulkRes = await fetch(`/api/decks/${deck.id}/cards/bulk-import`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id, cards }),
        });
        if (bulkRes.ok) {
          const result = await bulkRes.json();
          setMyDecks?.((prev: any) => [deck, ...prev]);
          setCurrentDeck?.(deck);
          fetchDeckCards?.(deck.id);
          fetchEntitlement?.();
          setView("deck-view");
          setShowCreate(false);
          setAiTopic("");
        }
      } else {
        setAiError("AI didn't generate any cards. Try a more specific topic.");
        setMyDecks?.((prev: any) => [deck, ...prev]);
        setCurrentDeck?.(deck);
        setDeckCards?.([]);
        setView("deck-edit");
        setShowCreate(false);
      }
    } catch (e: any) {
      setAiError("Something went wrong. Please try again.");
    } finally {
      setAiCreating(false);
    }
  };

  if (!user) {
    return (
      <div className="text-center py-16">
        <Lock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In to Use Study Decks</h2>
        <p className="text-gray-500 mb-6">Create a free account to build study decks with Learn and Test modes.</p>
        <Button className="rounded-xl" onClick={() => setLocation("/signup")} data-testid="button-signup-decks">Create Free Account</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900" data-testid="text-decks-title">Study Decks</h2>
          <p className="text-gray-500 text-sm mt-1">
            {entitlement?.isPremium
              ? `Premium - ${entitlement?.totalFreeCards || 0} cards created`
              : `${entitlement?.totalFreeCards || 0} / ${entitlement?.limit || 50} free cards used`
            }
          </p>
        </div>
        <Button onClick={() => setShowCreate(!showCreate)} className="rounded-xl gap-2" data-testid="button-new-deck">
          <Plus className="w-4 h-4" /> New Deck
        </Button>
      </div>

      {showCreate && (
        <Card className="border-2 border-primary/20 shadow-lg">
          <CardContent className="p-5 space-y-4">
            <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setCreateMode("ai")}
                className={cn("flex-1 px-3 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors",
                  createMode === "ai" ? "bg-purple-600 text-white shadow-sm" : "text-gray-500 hover:bg-gray-200"
                )}
                data-testid="button-create-mode-ai"
              >
                <Sparkles className="w-3.5 h-3.5" /> AI Generator
              </button>
              <button
                onClick={() => setCreateMode("manual")}
                className={cn("flex-1 px-3 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-colors",
                  createMode === "manual" ? "bg-primary text-white shadow-sm" : "text-gray-500 hover:bg-gray-200"
                )}
                data-testid="button-create-mode-manual"
              >
                <Plus className="w-3.5 h-3.5" /> Manual
              </button>
            </div>

            {createMode === "ai" ? (
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <h3 className="text-sm font-bold text-purple-800">AI Flashcard Generator</h3>
                </div>
                <p className="text-xs text-purple-600">Enter any nursing topic and AI will create a medically verified study deck for you instantly.</p>
                <Input
                  placeholder="e.g., Cardiac medications and their side effects"
                  value={aiTopic}
                  onChange={(e: any) => setAiTopic(e.target.value)}
                  className="rounded-xl border-purple-200 focus:border-purple-400"
                  onKeyDown={(e: any) => { if (e.key === "Enter" && aiTopic.trim() && !aiCreating) handleCreateWithAI(); }}
                  disabled={aiCreating}
                  data-testid="input-ai-topic"
                />
                <div className="flex items-center gap-3">
                  <label className="text-xs text-gray-500">Cards:</label>
                  <select
                    value={aiCardCount}
                    onChange={(e: any) => setAiCardCount(parseInt(e.target.value))}
                    className="text-xs border rounded-lg px-2 py-1.5 bg-white"
                    data-testid="select-ai-card-count"
                  >
                    {[5, 10, 15, 20, 25, 30, 40, 50].map(n => <option key={n} value={n}>{n}{n > 25 ? " ⭐" : ""} cards</option>)}
                  </select>
                  <div className="flex-1" />
                  <label className="text-xs text-gray-500">Visibility:</label>
                  <div className="flex rounded-lg border overflow-hidden">
                    {[
                      { v: "private", icon: EyeOff, label: "Private" },
                      { v: "public", icon: Globe, label: "Public" },
                    ].map(({ v, icon: Icon, label }) => (
                      <button
                        key={v}
                        onClick={() => setNewDeckVisibility!(v)}
                        className={cn("px-2.5 py-1 text-xs font-medium flex items-center gap-1 transition-colors",
                          newDeckVisibility === v ? "bg-primary text-white" : "bg-white text-gray-500 hover:bg-gray-50"
                        )}
                        data-testid={`button-ai-visibility-${v}`}
                      >
                        <Icon className="w-3 h-3" /> {label}
                      </button>
                    ))}
                  </div>
                </div>
                {aiError && (
                  <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-3" data-testid="text-ai-error">
                    {aiError}
                  </div>
                )}
                <div className="flex gap-2 pt-1">
                  <Button
                    onClick={handleCreateWithAI}
                    disabled={!aiTopic.trim() || aiCreating}
                    className="rounded-xl gap-2 bg-purple-600 hover:bg-purple-700"
                    data-testid="button-create-ai-deck"
                  >
                    {aiCreating ? (
                      <><Loader2 className="w-4 h-4 animate-spin" /> Generating Deck...</>
                    ) : (
                      <><Sparkles className="w-4 h-4" /> Create Deck with AI</>
                    )}
                  </Button>
                  <Button variant="outline" onClick={() => { setShowCreate(false); setAiError(""); }} className="rounded-xl" disabled={aiCreating}>Cancel</Button>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {[
                    "Cardiac Medications & Side Effects",
                    "Respiratory Assessment Findings",
                    "Diabetes Management Nursing",
                    "Electrolyte Imbalances",
                    "Pediatric Milestones",
                    "Mental Health Medications",
                  ].map(topic => (
                    <button
                      key={topic}
                      onClick={() => setAiTopic(topic)}
                      className="text-[11px] text-left text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-lg px-2.5 py-1.5 border border-purple-100 transition-colors"
                      disabled={aiCreating}
                      data-testid={`button-topic-${topic.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-700">Create Empty Deck</h3>
                <Input
                  placeholder="Deck title (e.g., Cardiac Medications)"
                  value={newDeckTitle}
                  onChange={(e: any) => setNewDeckTitle!(e.target.value)}
                  className="rounded-xl"
                  data-testid="input-deck-title"
                />
                <Textarea
                  placeholder="Description (optional)"
                  value={newDeckDescription}
                  onChange={(e: any) => setNewDeckDescription!(e.target.value)}
                  className="rounded-xl min-h-[60px]"
                  data-testid="input-deck-description"
                />
                <div className="flex items-center gap-3">
                  <label className="text-xs text-gray-500">Visibility:</label>
                  <div className="flex rounded-lg border overflow-hidden">
                    {[
                      { v: "private", icon: EyeOff, label: "Private" },
                      { v: "unlisted", icon: Eye, label: "Unlisted" },
                      { v: "public", icon: Globe, label: "Public" },
                    ].map(({ v, icon: Icon, label }) => (
                      <button
                        key={v}
                        onClick={() => setNewDeckVisibility!(v)}
                        className={cn("px-3 py-1.5 text-xs font-medium flex items-center gap-1.5 transition-colors",
                          newDeckVisibility === v ? "bg-primary text-white" : "bg-white text-gray-500 hover:bg-gray-50"
                        )}
                        data-testid={`button-visibility-${v}`}
                      >
                        <Icon className="w-3 h-3" /> {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <Button onClick={() => { createDeck!(); setShowCreate(false); }} disabled={!newDeckTitle?.trim()} className="rounded-xl" data-testid="button-create-deck">
                    Create Deck
                  </Button>
                  <Button variant="outline" onClick={() => setShowCreate(false)} className="rounded-xl">Cancel</Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex gap-1 bg-gray-100 rounded-xl p-1">
        {([["my", "My Decks"], ["browse", "Browse Public"], ["saved", "Saved"]] as const).map(([key, label]) => (
          <button
            key={key}
            onClick={() => {
              setDeckTab!(key);
              if (key === "browse") fetchPublicDecks!();
              if (key === "saved") fetchSavedDecks!();
            }}
            className={cn("flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              deckTab === key ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            )}
            data-testid={`tab-deck-${key}`}
          >
            {label}
          </button>
        ))}
      </div>

      {deckTab === "browse" && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search public decks..."
            value={deckSearchQuery}
            onChange={(e: any) => setDeckSearchQuery!(e.target.value)}
            onKeyDown={(e: any) => e.key === "Enter" && fetchPublicDecks!()}
            className="pl-10 rounded-xl"
            data-testid="input-search-decks"
          />
        </div>
      )}

      {deckLoading ? (
        <div className="text-center py-12 text-gray-400">Loading decks...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(deckTab === "my" ? myDecks : deckTab === "browse" ? publicDecks : savedDecksList)?.map((deck: any) => (
            <Card
              key={deck.id}
              className="border border-gray-200 hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group"
              onClick={() => {
                setCurrentDeck!(deck);
                fetchDeckCards!(deck.id);
                setView("deck-view");
              }}
              data-testid={`card-deck-${deck.id}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-900 text-sm group-hover:text-primary transition-colors line-clamp-1">{deck.title}</h3>
                  <div className="flex items-center gap-1 shrink-0">
                    {deck.isUpgraded && <Badge className="bg-amber-100 text-amber-700 text-[10px] border-none">PRO</Badge>}
                    {deck.visibility === "public" && <Globe className="w-3 h-3 text-gray-400" />}
                    {deck.visibility === "private" && <EyeOff className="w-3 h-3 text-gray-400" />}
                  </div>
                </div>
                {deck.description && <p className="text-xs text-gray-500 line-clamp-2 mb-3">{deck.description}</p>}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-gray-400">{deck.cardCount || 0} cards</span>
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-primary transition-colors" />
                </div>
              </CardContent>
            </Card>
          ))}
          {((deckTab === "my" ? myDecks : deckTab === "browse" ? publicDecks : savedDecksList)?.length || 0) === 0 && (
            <div className="col-span-full text-center py-12">
              <Layers className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 text-sm">
                {deckTab === "my" ? "No decks yet. Create your first study deck!" :
                 deckTab === "browse" ? "No public decks found." : "No saved decks yet."}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function DeckView({
  user, setView, currentDeck, setCurrentDeck, deckCards,
  fetchDeckCards, startDeckStudy, deleteDeck,
  saveDeck, duplicateDeck, reportDeck, entitlement,
  aiGeneratePrompt, setAiGeneratePrompt, aiGenerateCount, setAiGenerateCount,
  aiGenerating, aiGeneratedCards, aiGenerateCards, addAiGeneratedCards, removeAiGeneratedCard,
  aiUpgradeRequired, fetchEntitlement,
}: Partial<DeckViewsProps> & { user: any; setView: any }) {
  const [reportOpen, setReportOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [showAiPanel, setShowAiPanel] = useState(false);
  const isOwner = currentDeck?.userId === user?.id;

  const shareUrl = currentDeck?.slug
    ? `${window.location.origin}/flashcards/deck/${currentDeck.slug}`
    : "";

  const handleCopyLink = async () => {
    if (!shareUrl) return;
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const input = document.createElement("input");
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleNativeShare = async () => {
    if (navigator.share && shareUrl) {
      try {
        await navigator.share({
          title: `${currentDeck.title} - NurseNest Study Deck`,
          text: currentDeck.description || "Check out this nursing study deck!",
          url: shareUrl,
        });
      } catch {}
    } else {
      handleCopyLink();
    }
  };

  if (!currentDeck) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={() => setView("decks")} className="gap-2" data-testid="button-back-decks">
          <ArrowLeft className="w-4 h-4" /> Back
        </Button>
      </div>

      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900" data-testid="text-deck-title">{currentDeck.title}</h2>
          {currentDeck.description && <p className="text-gray-500 text-sm mt-1">{currentDeck.description}</p>}
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
            <span>{deckCards?.length || 0} cards</span>
            {currentDeck.isUpgraded && <Badge className="bg-amber-100 text-amber-700 text-[10px] border-none">PRO</Badge>}
            <span className="flex items-center gap-1">
              {currentDeck.visibility === "public" ? <><Globe className="w-3 h-3" /> Public</> :
               currentDeck.visibility === "unlisted" ? <><Eye className="w-3 h-3" /> Unlisted</> :
               <><EyeOff className="w-3 h-3" /> Private</>}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {(deckCards?.length || 0) >= 2 && (
            <>
              <Button onClick={() => startDeckStudy!("learn")} className="rounded-xl gap-2 bg-emerald-600 hover:bg-emerald-700" data-testid="button-learn-mode">
                <BookOpen className="w-4 h-4" /> Learn
              </Button>
              <Button onClick={() => startDeckStudy!("test")} className="rounded-xl gap-2 bg-indigo-600 hover:bg-indigo-700" data-testid="button-test-mode">
                <Timer className="w-4 h-4" /> Test
              </Button>
            </>
          )}
          {isOwner && (
            <Button variant="outline" onClick={() => { setView("deck-edit"); }} className="rounded-xl gap-2" data-testid="button-edit-deck">
              <Pencil className="w-4 h-4" /> Edit
            </Button>
          )}
          {!isOwner && user && (
            <>
              <Button variant="outline" onClick={() => saveDeck!(currentDeck.id)} className="rounded-xl gap-2" data-testid="button-save-deck">
                <BookOpen className="w-4 h-4" /> Save
              </Button>
              <Button variant="outline" onClick={() => duplicateDeck!(currentDeck.id)} className="rounded-xl gap-2" data-testid="button-duplicate-deck">
                <Copy className="w-4 h-4" /> Copy
              </Button>
              <Button variant="outline" onClick={() => setReportOpen(!reportOpen)} className="rounded-xl gap-2 text-red-500 hover:text-red-600" data-testid="button-report-deck">
                <Flag className="w-4 h-4" /> Report
              </Button>
            </>
          )}
          {isOwner && !currentDeck.isUpgraded && (
            <Button
              variant="outline"
              onClick={async () => {
                try {
                  const res = await fetch("/api/billing/deck-upgrade/create-checkout", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: user.id, deckId: currentDeck.id }),
                  });
                  const data = await res.json();
                  if (data.url) window.location.href = data.url;
                } catch {}
              }}
              className="rounded-xl gap-2 border-amber-300 text-amber-700 hover:bg-amber-50"
              data-testid="button-upgrade-deck"
            >
              <CreditCard className="w-4 h-4" /> Upgrade ($2.99 CAD)
            </Button>
          )}
          {isOwner && (
            <Button variant="ghost" onClick={() => deleteDeck!(currentDeck.id)} className="text-red-400 hover:text-red-600" data-testid="button-delete-deck">
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>

      {shareUrl && (
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200">
          <div className="flex-1 min-w-0">
            <input
              readOnly
              value={shareUrl}
              className="w-full bg-transparent text-sm text-gray-600 border-none outline-none truncate"
              onClick={(e) => (e.target as HTMLInputElement).select()}
              data-testid="input-share-url"
            />
          </div>
          <Button size="sm" variant="outline" onClick={handleCopyLink} className="rounded-lg gap-1.5 shrink-0" data-testid="button-copy-deck-link">
            {linkCopied ? <><CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy Link</>}
          </Button>
          <Button size="sm" variant="outline" onClick={handleNativeShare} className="rounded-lg gap-1.5 shrink-0" data-testid="button-share-deck-native">
            <Share2 className="w-3.5 h-3.5" /> Share
          </Button>
        </div>
      )}

      {reportOpen && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4 space-y-2">
            <p className="text-sm font-medium text-red-700">Report this deck for inaccuracy</p>
            <Textarea
              placeholder="Describe the issue..."
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              className="min-h-[80px]"
              data-testid="input-report-reason"
            />
            <div className="flex gap-2">
              <Button size="sm" variant="destructive" onClick={() => { reportDeck!(currentDeck.id, reportReason); setReportOpen(false); setReportReason(""); }} disabled={!reportReason.trim()} data-testid="button-submit-report">
                Submit Report
              </Button>
              <Button size="sm" variant="outline" onClick={() => setReportOpen(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isOwner && (
        <div className="space-y-3">
          <Button
            variant="outline"
            onClick={() => setShowAiPanel(!showAiPanel)}
            className="w-full rounded-xl gap-2 border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 py-3"
            data-testid="button-ai-generate-deck-view"
          >
            <Sparkles className="w-4 h-4" />
            {showAiPanel ? "Hide AI Generator" : "Generate Cards with AI"}
          </Button>

          {showAiPanel && (
            <Card className="border-purple-200 bg-purple-50/30" data-testid="card-ai-generate-deckview">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-semibold text-purple-800">AI Flashcard Generator</span>
                </div>
                <p className="text-xs text-purple-600">Enter a nursing topic and AI will create study-ready flashcards for you.</p>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g. Cardiac medications, Diabetes management, Pediatric milestones..."
                    value={aiGeneratePrompt || ""}
                    onChange={(e) => setAiGeneratePrompt?.(e.target.value)}
                    className="text-sm bg-white flex-1"
                    onKeyDown={(e) => { if (e.key === "Enter" && aiGeneratePrompt?.trim()) aiGenerateCards?.(); }}
                    data-testid="input-ai-generate-prompt-deckview"
                  />
                  <select
                    value={aiGenerateCount || 10}
                    onChange={(e) => setAiGenerateCount?.(parseInt(e.target.value))}
                    className="bg-white border border-gray-200 rounded-lg px-2 text-sm"
                    data-testid="select-ai-generate-count-deckview"
                  >
                    {[5, 10, 15, 20, 25, 30, 40, 50].map(n => <option key={n} value={n}>{n}{n > 25 ? " ⭐" : ""} cards</option>)}
                  </select>
                </div>
                <Button
                  onClick={aiGenerateCards}
                  disabled={aiGenerating || !aiGeneratePrompt?.trim()}
                  className="w-full gap-2 bg-purple-600 hover:bg-purple-700 rounded-xl"
                  data-testid="button-ai-generate-deckview"
                >
                  {aiGenerating ? <><Layers className="w-4 h-4 animate-spin" /> Generating...</> : <><Sparkles className="w-4 h-4" /> Generate Cards</>}
                </Button>
                {aiUpgradeRequired && (
                  <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3">You've reached the free card limit. Upgrade your deck or plan to create more cards with AI.</p>
                )}
                {aiGeneratedCards && aiGeneratedCards.length > 0 && (
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-purple-700">{aiGeneratedCards.length} cards generated — review before adding:</p>
                      <Button size="sm" onClick={addAiGeneratedCards} className="gap-1 bg-emerald-600 hover:bg-emerald-700 text-xs rounded-lg" data-testid="button-add-ai-cards-deckview">
                        <Plus className="w-3 h-3" /> Add All to Deck
                      </Button>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto space-y-2">
                      {aiGeneratedCards.map((card, idx) => (
                        <div key={idx} className="bg-white rounded-lg border border-purple-100 p-3 relative group">
                          <button
                            onClick={() => removeAiGeneratedCard?.(idx)}
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition-opacity"
                            data-testid={`button-remove-ai-card-${idx}`}
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                          <p className="text-sm font-medium text-gray-900">{card.front}</p>
                          <p className="text-xs text-gray-600 mt-1">{card.back}</p>
                          {card.rationale && <p className="text-[10px] text-gray-400 mt-1 italic">{card.rationale}</p>}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <div className="space-y-2">
        {deckCards?.map((card: any, i: number) => (
          <Card key={card.id} className="border-gray-200" data-testid={`card-deck-card-${card.id}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] text-gray-400 font-medium">{i + 1}.</span>
                  <p className="text-sm font-medium text-gray-900 mt-0.5">{card.front}</p>
                  <p className="text-xs text-gray-500 mt-1">{card.back}</p>
                  {card.rationale && <p className="text-[10px] text-gray-400 mt-1 italic">{card.rationale}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {(!deckCards || deckCards.length === 0) && (
          <div className="text-center py-12 space-y-4">
            <Sparkles className="w-10 h-10 text-purple-300 mx-auto" />
            <p className="text-gray-500 text-sm font-medium">This deck is empty</p>
            <p className="text-gray-400 text-xs max-w-md mx-auto">Use the AI Generator above to create flashcards on any nursing topic, or add cards manually.</p>
            <div className="flex gap-3 justify-center">
              {isOwner && !showAiPanel && (
                <Button variant="outline" onClick={() => setShowAiPanel(true)} className="gap-2 border-purple-200 text-purple-700 hover:bg-purple-50 rounded-xl" data-testid="button-ai-generate-empty">
                  <Sparkles className="w-4 h-4" /> Generate with AI
                </Button>
              )}
              {isOwner && (
                <Button variant="outline" onClick={() => setView("deck-edit")} className="gap-2 rounded-xl" data-testid="button-add-cards-manual">
                  <Plus className="w-4 h-4" /> Add Manually
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function DeckEditor({
  user, setView, currentDeck, deckCards, setDeckCards,
  addCardToDeck, deleteDeckCard, aiCheckCard, handleCsvImport, entitlement,
  newCardFront, setNewCardFront, newCardBack, setNewCardBack,
  newCardRationale, setNewCardRationale, aiCheckResult, aiChecking,
  csvImportText, setCsvImportText, showCsvImport, setShowCsvImport,
  fetchDeckCards, fetchEntitlement,
  aiGeneratePrompt, setAiGeneratePrompt, aiGenerateCount, setAiGenerateCount,
  aiGenerating, aiGeneratedCards, aiGenerateCards, addAiGeneratedCards, removeAiGeneratedCard,
  aiUpgradeRequired, isPaid,
}: Partial<DeckViewsProps> & { user: any; setView: any }) {
  const [editingCard, setEditingCard] = useState<any>(null);
  const [showAiGenerate, setShowAiGenerate] = useState(false);

  if (!currentDeck) return null;

  const limitInfo = currentDeck.isUpgraded
    ? { max: 300, used: deckCards?.length || 0 }
    : entitlement?.isPremium
    ? { max: 5000, used: entitlement?.totalFreeCards || 0 }
    : { max: entitlement?.limit || 50, used: entitlement?.totalFreeCards || 0 };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" onClick={() => { setView("deck-view"); }} className="gap-2" data-testid="button-back-deck-view">
          <ArrowLeft className="w-4 h-4" /> Back to Deck
        </Button>
        <h2 className="text-lg font-bold text-gray-900">Edit: {currentDeck.title}</h2>
      </div>

      <div className="flex items-center gap-3 text-xs text-gray-500 flex-wrap">
        <span>{deckCards?.length || 0} cards</span>
        <span className={cn("font-medium", limitInfo.used >= limitInfo.max ? "text-red-500" : "text-gray-500")}>
          {limitInfo.used} / {limitInfo.max} {currentDeck.isUpgraded ? "deck" : "total"} cards used
        </span>
        <Button size="sm" variant="outline" onClick={() => { setShowAiGenerate(!showAiGenerate); if (showCsvImport) setShowCsvImport!(false); }} className="h-7 text-xs gap-1 ml-auto bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100" data-testid="button-ai-generate-toggle">
          <Sparkles className="w-3 h-3" /> AI Generate
        </Button>
        <Button size="sm" variant="outline" onClick={() => { setShowCsvImport!(!showCsvImport); if (showAiGenerate) setShowAiGenerate(false); }} className="h-7 text-xs gap-1" data-testid="button-csv-import">
          <Upload className="w-3 h-3" /> CSV Import
        </Button>
      </div>

      {showAiGenerate && (
        <Card className="border-purple-200 bg-purple-50/30" data-testid="card-ai-generate">
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              <h3 className="text-sm font-bold text-purple-800">AI Flashcard Generator</h3>
            </div>
            <p className="text-xs text-gray-600">Describe what you want to study and AI will create flashcards for you.</p>
            <Textarea
              placeholder="e.g., Cardiac medications including beta blockers, ACE inhibitors, and antiarrhythmics with their mechanisms of action and side effects"
              value={aiGeneratePrompt}
              onChange={(e) => setAiGeneratePrompt!(e.target.value)}
              className="min-h-[80px] text-sm bg-white"
              data-testid="input-ai-generate-prompt"
            />
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <label className="text-xs text-gray-500 whitespace-nowrap">Cards:</label>
                <select
                  value={aiGenerateCount}
                  onChange={(e) => setAiGenerateCount!(parseInt(e.target.value))}
                  className="text-xs border rounded-lg px-2 py-1.5 bg-white"
                  data-testid="select-ai-generate-count"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                  <option value={25}>25</option>
                  <option value={30}>30 ⭐</option>
                  <option value={40}>40 ⭐</option>
                  <option value={50}>50 ⭐</option>
                </select>
              </div>
              <Button
                size="sm"
                onClick={aiGenerateCards}
                disabled={aiGenerating || !aiGeneratePrompt?.trim()}
                className="gap-1 bg-purple-600 hover:bg-purple-700"
                data-testid="button-ai-generate"
              >
                {aiGenerating ? (
                  <>
                    <RefreshCw className="w-3 h-3 animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3 h-3" /> Generate Cards
                  </>
                )}
              </Button>
              <Button size="sm" variant="outline" onClick={() => setShowAiGenerate(false)}>Cancel</Button>
            </div>

            {!isPaid && (
              <div className="flex items-center gap-2 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2" data-testid="text-ai-card-limit">
                <span>Free plan: {limitInfo.used} / {limitInfo.max} cards used</span>
                {limitInfo.used >= limitInfo.max && (
                  <span className="text-red-500 font-medium">— limit reached</span>
                )}
              </div>
            )}

            {aiUpgradeRequired && (
              <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl" data-testid="text-ai-upgrade-prompt">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-amber-800">Free card limit reached (50 cards)</p>
                  <p className="text-xs text-amber-600 mt-0.5">Upgrade your plan to generate unlimited AI flashcards and unlock all premium features.</p>
                </div>
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700 shrink-0" onClick={() => window.location.href = "/pricing"} data-testid="button-ai-upgrade">
                  Upgrade Now
                </Button>
              </div>
            )}

            {aiGeneratedCards && aiGeneratedCards.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-purple-200">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-purple-700">{aiGeneratedCards.length} cards generated — review before adding:</p>
                  <Button size="sm" onClick={addAiGeneratedCards} className="gap-1 bg-emerald-600 hover:bg-emerald-700" data-testid="button-add-ai-cards">
                    <Plus className="w-3 h-3" /> Add All to Deck
                  </Button>
                </div>
                <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1">
                  {aiGeneratedCards.map((card, idx) => (
                    <div key={idx} className="bg-white rounded-lg border border-purple-100 p-3 text-sm" data-testid={`ai-card-preview-${idx}`}>
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900">{card.front}</p>
                          <p className="text-gray-600 mt-1">{card.back}</p>
                          {card.rationale && <p className="text-xs text-gray-400 mt-1 italic">{card.rationale}</p>}
                        </div>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="shrink-0 text-red-400 hover:text-red-600 h-7 w-7 p-0"
                          onClick={() => removeAiGeneratedCard!(idx)}
                          data-testid={`button-remove-ai-card-${idx}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {showCsvImport && (
        <Card className="border-primary/20">
          <CardContent className="p-4 space-y-2">
            <p className="text-xs text-gray-600">Paste CSV data (front, back, rationale per line):</p>
            <Textarea
              placeholder={"What is normal saline?, 0.9% NaCl isotonic solution, Used for fluid resuscitation\nWhat is D5W?, 5% dextrose in water, Provides free water and calories"}
              value={csvImportText}
              onChange={(e) => setCsvImportText!(e.target.value)}
              className="min-h-[120px] font-mono text-xs"
              data-testid="input-csv-import"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={handleCsvImport} disabled={!csvImportText?.trim()} data-testid="button-import-csv">Import Cards</Button>
              <Button size="sm" variant="outline" onClick={() => setShowCsvImport!(false)}>Cancel</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-2 border-primary/20">
        <CardContent className="p-4 space-y-3">
          <h3 className="text-sm font-bold text-gray-700">Add New Card</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">Front (Question/Term)</label>
              <Textarea
                placeholder="e.g., What is the antidote for heparin?"
                value={newCardFront}
                onChange={(e) => setNewCardFront!(e.target.value)}
                className="min-h-[80px] text-sm"
                data-testid="input-card-front"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">Back (Answer/Definition)</label>
              <Textarea
                placeholder="e.g., Protamine sulfate"
                value={newCardBack}
                onChange={(e) => setNewCardBack!(e.target.value)}
                className="min-h-[80px] text-sm"
                data-testid="input-card-back"
              />
            </div>
          </div>
          <div>
            <label className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-1">Rationale (Optional)</label>
            <Input
              placeholder="Why this is the correct answer..."
              value={newCardRationale}
              onChange={(e) => setNewCardRationale!(e.target.value)}
              className="text-sm"
              data-testid="input-card-rationale"
            />
          </div>

          {aiCheckResult && (
            <div className={cn("p-3 rounded-lg border text-sm", aiCheckResult.accurate ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-amber-50 border-amber-200 text-amber-800")}>
              <div className="flex items-center gap-2 font-medium mb-1">
                {aiCheckResult.accurate ? <CheckCircle2 className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                {aiCheckResult.accurate ? "Accurate" : "Needs Review"}
              </div>
              <p className="text-xs">{aiCheckResult.feedback}</p>
            </div>
          )}

          <div className="flex gap-2 flex-wrap">
            <Button onClick={() => addCardToDeck!()} disabled={!newCardFront?.trim() || !newCardBack?.trim()} className="rounded-xl" data-testid="button-add-card">
              <Plus className="w-4 h-4 mr-1" /> Add Card
            </Button>
            <Button variant="outline" onClick={aiCheckCard} disabled={aiChecking || !newCardFront?.trim() || !newCardBack?.trim()} className="rounded-xl gap-2" data-testid="button-ai-check">
              <Sparkles className="w-4 h-4" /> {aiChecking ? "Checking..." : "Verify Accuracy"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {deckCards?.map((card: any, i: number) => (
          <Card key={card.id} className="border-gray-200" data-testid={`card-edit-${card.id}`}>
            <CardContent className="p-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[10px] text-gray-400 font-medium shrink-0">{i + 1}.</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{card.front}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{card.back}</p>
                    </div>
                  </div>
                </div>
                <Button variant="ghost" size="sm" onClick={() => deleteDeckCard!(card.id)} className="text-red-400 hover:text-red-600 shrink-0" data-testid={`button-delete-card-${card.id}`}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export function DeckStudyLearn({
  user, setView, currentDeck, deckStudyQueue, deckStudyIndex,
  deckStudyFlipped, setDeckStudyFlipped, deckStudyCorrect, deckStudyIncorrect,
  handleDeckStudyAnswer,
}: Partial<DeckViewsProps> & { user: any; setView: any }) {
  const card = deckStudyQueue?.[deckStudyIndex!];
  const total = deckStudyQueue?.length || 0;
  const progress = total > 0 ? ((deckStudyIndex! + 1) / total) * 100 : 0;
  const [aiVerifyResult, setAiVerifyResult] = useState<{status: string; explanation: string; confidence: number; suggestedCorrection?: string} | null>(null);
  const [aiVerifying, setAiVerifying] = useState(false);

  useEffect(() => {
    setAiVerifyResult(null);
    setAiVerifying(false);
  }, [deckStudyIndex]);

  const verifyCardAccuracy = async () => {
    if (!card || !currentDeck) return;
    setAiVerifying(true);
    try {
      const res = await fetch(`/api/decks/${currentDeck.id}/ai-check`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ front: card.front, back: card.back, rationale: card.rationale }),
      });
      if (res.ok) setAiVerifyResult(await res.json());
    } catch {} finally { setAiVerifying(false); }
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (!deckStudyFlipped) setDeckStudyFlipped!(true);
      }
      if (deckStudyFlipped && (e.key === "ArrowRight" || e.key === "1")) handleDeckStudyAnswer!(true);
      if (deckStudyFlipped && (e.key === "ArrowLeft" || e.key === "2")) handleDeckStudyAnswer!(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [deckStudyFlipped, deckStudyIndex]);

  if (!card) return null;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => setView("deck-view")} className="gap-2" data-testid="button-exit-learn">
          <ArrowLeft className="w-4 h-4" /> Exit
        </Button>
        <div className="flex items-center gap-4 text-sm">
          <span className="text-emerald-600 font-medium">{deckStudyCorrect} correct</span>
          <span className="text-red-500 font-medium">{deckStudyIncorrect} missed</span>
          <span className="text-gray-400">{deckStudyIndex! + 1} / {total}</span>
        </div>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-emerald-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      {card.retry && (
        <div className="flex items-center gap-2 text-xs text-amber-600 bg-amber-50 px-3 py-2 rounded-lg">
          <RefreshCw className="w-3 h-3" /> Retry card - you missed this one earlier
        </div>
      )}

      <div
        className="min-h-[350px] cursor-pointer"
        onClick={() => !deckStudyFlipped && setDeckStudyFlipped!(true)}
      >
        <Card className={cn(
          "border-none shadow-xl rounded-3xl min-h-[350px] flex flex-col items-center justify-center p-8 text-center transition-all",
          deckStudyFlipped ? "bg-primary text-white" : "bg-white"
        )}>
          {!deckStudyFlipped ? (
            <>
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-6">Question</span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-relaxed">{card.front}</h2>
              <div className="mt-8 text-xs text-gray-400 uppercase tracking-widest animate-pulse flex items-center gap-2">
                <RefreshCw className="w-3 h-3" /> Tap or press Space to reveal
              </div>
            </>
          ) : (
            <>
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-6">Answer</span>
              <p className="text-xl font-medium leading-relaxed">{card.back}</p>
              {card.rationale && (
                <p className="text-sm text-white/70 mt-4 italic max-w-lg">{card.rationale}</p>
              )}
            </>
          )}
        </Card>
      </div>

      {deckStudyFlipped && (
        <div className="space-y-3">
          <div className="flex gap-4 justify-center">
            <Button
              onClick={() => handleDeckStudyAnswer!(false)}
              variant="outline"
              className="rounded-xl gap-2 px-8 py-6 border-red-200 text-red-600 hover:bg-red-50"
              data-testid="button-missed"
            >
              <XCircle className="w-5 h-5" /> Missed It
            </Button>
            <Button
              onClick={() => handleDeckStudyAnswer!(true)}
              className="rounded-xl gap-2 px-8 py-6 bg-emerald-600 hover:bg-emerald-700"
              data-testid="button-got-it"
            >
              <CheckCircle2 className="w-5 h-5" /> Got It
            </Button>
          </div>
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={verifyCardAccuracy}
              disabled={aiVerifying}
              className="text-xs text-gray-400 hover:text-primary gap-1.5"
              data-testid="button-verify-accuracy"
            >
              <Sparkles className="w-3 h-3" />
              {aiVerifying ? "Checking..." : "Verify Medical Accuracy"}
            </Button>
          </div>
          {aiVerifyResult && (
            <div className={cn(
              "rounded-xl border p-4 text-sm",
              aiVerifyResult.status === "pass" ? "bg-emerald-50 border-emerald-200 text-emerald-800" :
              aiVerifyResult.status === "flag" ? "bg-red-50 border-red-200 text-red-800" :
              "bg-amber-50 border-amber-200 text-amber-800"
            )} data-testid="ai-verify-result">
              <div className="flex items-center gap-2 mb-1">
                {aiVerifyResult.status === "pass" ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> :
                 aiVerifyResult.status === "flag" ? <Flag className="w-4 h-4 text-red-600" /> :
                 <Sparkles className="w-4 h-4 text-amber-600" />}
                <span className="font-semibold capitalize">{aiVerifyResult.status === "pass" ? "Medically Accurate" : aiVerifyResult.status === "flag" ? "Accuracy Concern" : "Uncertain"}</span>
                <span className="text-xs opacity-60 ml-auto">{Math.round(aiVerifyResult.confidence * 100)}% confidence</span>
              </div>
              <p className="text-xs leading-relaxed">{aiVerifyResult.explanation}</p>
              {aiVerifyResult.suggestedCorrection && (
                <p className="text-xs mt-2 font-medium">Suggested: {aiVerifyResult.suggestedCorrection}</p>
              )}
            </div>
          )}
        </div>
      )}

      <p className="text-center text-[10px] text-gray-400">
        Keyboard: Space/Enter to flip | Right Arrow/1 = Got it | Left Arrow/2 = Missed
      </p>
    </div>
  );
}

export function DeckStudyTest({
  user, setView, currentDeck, deckStudyQueue, deckStudyIndex,
  deckStudyFlipped, setDeckStudyFlipped, deckStudyCorrect, deckStudyIncorrect,
  handleDeckStudyAnswer, deckStudyStartTime,
}: Partial<DeckViewsProps> & { user: any; setView: any }) {
  const [elapsed, setElapsed] = useState(0);
  const card = deckStudyQueue?.[deckStudyIndex!];
  const total = deckStudyQueue?.length || 0;
  const progress = total > 0 ? ((deckStudyIndex! + 1) / total) * 100 : 0;

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - (deckStudyStartTime || Date.now())) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [deckStudyStartTime]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        if (!deckStudyFlipped) setDeckStudyFlipped!(true);
      }
      if (deckStudyFlipped && (e.key === "ArrowRight" || e.key === "1")) handleDeckStudyAnswer!(true);
      if (deckStudyFlipped && (e.key === "ArrowLeft" || e.key === "2")) handleDeckStudyAnswer!(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [deckStudyFlipped, deckStudyIndex]);

  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  if (!card) return null;

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={() => setView("deck-view")} className="gap-2" data-testid="button-exit-test">
          <ArrowLeft className="w-4 h-4" /> Exit
        </Button>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1 text-gray-500"><Timer className="w-4 h-4" /> {formatTime(elapsed)}</span>
          <span className="text-gray-400">{deckStudyIndex! + 1} / {total}</span>
        </div>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
      </div>

      <div
        className="min-h-[350px] cursor-pointer"
        onClick={() => !deckStudyFlipped && setDeckStudyFlipped!(true)}
      >
        <Card className={cn(
          "border-none shadow-xl rounded-3xl min-h-[350px] flex flex-col items-center justify-center p-8 text-center transition-all",
          deckStudyFlipped ? "bg-indigo-600 text-white" : "bg-white"
        )}>
          {!deckStudyFlipped ? (
            <>
              <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-6">Test Mode</span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-relaxed">{card.front}</h2>
              <div className="mt-8 text-xs text-gray-400 uppercase tracking-widest animate-pulse flex items-center gap-2">
                <RefreshCw className="w-3 h-3" /> Tap or press Space to reveal
              </div>
            </>
          ) : (
            <>
              <span className="text-[10px] font-bold text-white/60 uppercase tracking-widest mb-6">Answer</span>
              <p className="text-xl font-medium leading-relaxed">{card.back}</p>
              {card.rationale && (
                <p className="text-sm text-white/70 mt-4 italic max-w-lg">{card.rationale}</p>
              )}
            </>
          )}
        </Card>
      </div>

      {deckStudyFlipped && (
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => handleDeckStudyAnswer!(false)}
            variant="outline"
            className="rounded-xl gap-2 px-8 py-6 border-red-200 text-red-600 hover:bg-red-50"
            data-testid="button-test-wrong"
          >
            <XCircle className="w-5 h-5" /> Wrong
          </Button>
          <Button
            onClick={() => handleDeckStudyAnswer!(true)}
            className="rounded-xl gap-2 px-8 py-6 bg-emerald-600 hover:bg-emerald-700"
            data-testid="button-test-correct"
          >
            <CheckCircle2 className="w-5 h-5" /> Correct
          </Button>
        </div>
      )}
    </div>
  );
}

export function DeckReportCard({
  setView, currentDeck, deckStudyCorrect, deckStudyIncorrect,
  deckStudyQueue, deckStudyStartTime, deckStudyMissed, deckCards,
  startDeckStudy,
}: Partial<DeckViewsProps> & { setView: any }) {
  const total = (deckStudyCorrect || 0) + (deckStudyIncorrect || 0);
  const percentage = total > 0 ? Math.round(((deckStudyCorrect || 0) / total) * 100) : 0;
  const timeSeconds = Math.round((Date.now() - (deckStudyStartTime || Date.now())) / 1000);
  const formatTime = (s: number) => `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, "0")}`;

  const missedCards = deckCards?.filter((c: any) => deckStudyMissed?.includes(c.id)) || [];

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="text-center">
        <div className={cn(
          "w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl font-black",
          percentage >= 80 ? "bg-emerald-100 text-emerald-600" :
          percentage >= 60 ? "bg-amber-100 text-amber-600" : "bg-red-100 text-red-600"
        )}>
          {percentage}%
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Session Complete</h2>
        <p className="text-gray-500 text-sm mt-1">{currentDeck?.title}</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="text-center border-none bg-emerald-50">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-emerald-600">{deckStudyCorrect}</p>
            <p className="text-xs text-emerald-700">Correct</p>
          </CardContent>
        </Card>
        <Card className="text-center border-none bg-red-50">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-red-500">{deckStudyIncorrect}</p>
            <p className="text-xs text-red-700">Missed</p>
          </CardContent>
        </Card>
        <Card className="text-center border-none bg-gray-50">
          <CardContent className="p-4">
            <p className="text-2xl font-bold text-gray-600">{formatTime(timeSeconds)}</p>
            <p className="text-xs text-gray-500">Time</p>
          </CardContent>
        </Card>
      </div>

      {missedCards.length > 0 && (
        <Card className="border-red-100">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-red-700">Cards to Review ({missedCards.length})</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {missedCards.map((card: any) => (
              <div key={card.id} className="text-sm border-b border-red-50 pb-2 last:border-0">
                <p className="font-medium text-gray-900">{card.front}</p>
                <p className="text-gray-500 text-xs">{card.back}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <div className="flex gap-3 justify-center">
        <Button onClick={() => startDeckStudy!("learn")} className="rounded-xl gap-2 bg-emerald-600 hover:bg-emerald-700" data-testid="button-study-again">
          <RefreshCw className="w-4 h-4" /> Study Again
        </Button>
        <Button variant="outline" onClick={() => setView("deck-view")} className="rounded-xl" data-testid="button-back-to-deck">
          Back to Deck
        </Button>
        <Button variant="outline" onClick={() => setView("decks")} className="rounded-xl" data-testid="button-all-decks">
          All Decks
        </Button>
      </div>
    </div>
  );
}
