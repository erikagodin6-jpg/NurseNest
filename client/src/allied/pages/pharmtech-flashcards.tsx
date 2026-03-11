import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "wouter";
import { Brain, ChevronRight, ArrowRight, RotateCcw, ChevronLeft, Shuffle } from "lucide-react";
import { AlliedSEO } from "@/allied/allied-seo";

function DeckLibrary() {
  const [decks, setDecks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/pharmtech/flashcard-decks").then(r => { if (!r.ok) throw new Error("Failed"); return r.json(); }).then(data => { setDecks(Array.isArray(data) ? data : []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  return (
    <>
      <AlliedSEO
        title="Pharmacy Technician Flashcards - Study Decks by Topic"
        description="Master pharmacy technician concepts with interactive flashcard decks organized by exam topic. Covers pharmacology, dosage calculations, pharmacy law, compounding, and more."
        canonicalPath="/pharmacy-technician/flashcards"
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="pharmtech-flashcards-page">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/pharmacy-technician" className="hover:text-teal-600">Pharmacy Technician</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-green-700 font-medium">Flashcards</span>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2" data-testid="text-flashcards-title">Flashcard Decks</h1>
        <p className="text-gray-500 text-sm mb-8">{decks.length} decks available — tap to study</p>

        {loading ? (
          <div className="flex justify-center py-20"><div className="w-8 h-8 border-3 border-green-500 border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {decks.map(deck => (
              <Link key={deck.id} href={`/pharmacy-technician/flashcards/${deck.slug}`} className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg hover:border-green-200 transition-all" data-testid={`card-deck-${deck.slug}`}>
                <Brain className="w-6 h-6 text-green-600 mb-3" />
                <span className="inline-block px-2 py-0.5 bg-green-50 text-green-700 rounded text-xs font-medium mb-2">{deck.category}</span>
                <h3 className="font-semibold text-gray-900 mb-1">{deck.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{deck.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{deck.cardCount} cards</span>
                  <span className="text-green-600 text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Study <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function DeckDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [deck, setDeck] = useState<any>(null);
  const [cards, setCards] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/pharmtech/flashcard-decks/${slug}`).then(r => { if (!r.ok) throw new Error("Not found"); return r.json(); }).then(data => {
      setDeck(data);
      setCards(data.cards || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [slug]);

  const handleShuffle = useCallback(() => {
    setCards(prev => [...prev].sort(() => Math.random() - 0.5));
    setCurrentIndex(0);
    setFlipped(false);
  }, []);

  const handleNext = useCallback(() => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(i => i + 1);
      setFlipped(false);
    }
  }, [currentIndex, cards.length]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(i => i - 1);
      setFlipped(false);
    }
  }, [currentIndex]);

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-3 border-green-500 border-t-transparent rounded-full animate-spin" /></div>;
  if (!deck) return <div className="max-w-2xl mx-auto px-4 py-20 text-center"><h1 className="text-2xl font-bold">Deck Not Found</h1></div>;

  const card = cards[currentIndex];

  return (
    <>
      <AlliedSEO
        title={`${deck.title} - Pharmacy Technician Flashcards`}
        description={deck.description || `Study ${deck.title} flashcards for pharmacy technician certification exam prep. ${deck.cardCount} cards available.`}
        canonicalPath={`/pharmacy-technician/flashcards/${deck.slug}`}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8" data-testid="pharmtech-deck-detail">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/pharmacy-technician" className="hover:text-teal-600">Pharmacy Technician</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/pharmacy-technician/flashcards" className="hover:text-teal-600">Flashcards</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-green-700 font-medium truncate">{deck.title}</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900" data-testid="text-deck-title">{deck.title}</h1>
            <p className="text-gray-500 text-sm">{deck.cardCount} cards · {deck.category}</p>
          </div>
          <div className="flex gap-2">
            <button onClick={handleShuffle} className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700 transition-colors" data-testid="button-shuffle">
              <Shuffle className="w-4 h-4" />
            </button>
            <button onClick={() => { setCurrentIndex(0); setFlipped(false); }} className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-700 transition-colors" data-testid="button-restart">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-500" data-testid="text-card-progress">Card {currentIndex + 1} of {cards.length}</span>
          <div className="w-40 bg-gray-100 rounded-full h-1.5">
            <div className="bg-green-500 h-1.5 rounded-full transition-all" style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }} />
          </div>
        </div>

        {card ? (
          <>
            <div
              onClick={() => setFlipped(!flipped)}
              className="bg-white rounded-2xl border-2 border-gray-100 p-8 sm:p-12 min-h-[280px] flex items-center justify-center cursor-pointer hover:shadow-lg hover:border-green-200 transition-all select-none"
              data-testid="flashcard"
            >
              <div className="text-center max-w-lg">
                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-4 block">
                  {flipped ? "Answer" : "Question"} — tap to flip
                </span>
                <p className={`text-lg leading-relaxed ${flipped ? "text-green-800" : "text-gray-900"} font-medium`} data-testid="text-card-content">
                  {flipped ? card.back : card.front}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <button onClick={handlePrev} disabled={currentIndex === 0} className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 disabled:opacity-30 disabled:cursor-not-allowed" data-testid="button-prev-card">
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button onClick={handleNext} disabled={currentIndex >= cards.length - 1} className="flex items-center gap-1 px-6 py-2.5 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors" data-testid="button-next-card">
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <Brain className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No cards in this deck yet.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default function PharmtechFlashcardsPage() {
  const params = useParams<{ slug: string }>();
  if (params.slug) return <DeckDetail />;
  return <DeckLibrary />;
}
