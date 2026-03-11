import { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { SEO } from "@/components/seo";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { Zap, ArrowLeft, RotateCcw, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";

const EXAM_MAP: Record<string, { exam: string }> = {
  canada: { exam: "CAMRT" },
  usa: { exam: "ARRT" },
};

export default function ImagingFlashcardsPage() {
  const [, params] = useRoute("/medical-imaging/:country/flashcards");
  const country = params?.country || "canada";
  const examInfo = EXAM_MAP[country] || EXAM_MAP.canada;
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  const { data: flashcards = [], isLoading } = useQuery({
    queryKey: ["/api/imaging/flashcards", country],
    queryFn: () => fetch(`/api/imaging/flashcards?status=published&country=${country}`).then(r => r.json()),
  });

  const categories = useMemo(() => {
    const t = new Set(flashcards.map((f: any) => f.category).filter(Boolean));
    return Array.from(t).sort();
  }, [flashcards]);

  const filtered = useMemo(() => {
    if (categoryFilter === "all") return flashcards;
    return flashcards.filter((f: any) => f.category === categoryFilter);
  }, [flashcards, categoryFilter]);

  const current = filtered[currentIndex];
  const total = filtered.length;

  const next = useCallback(() => {
    setFlipped(false);
    setCurrentIndex(prev => Math.min(prev + 1, total - 1));
  }, [total]);

  const prev = useCallback(() => {
    setFlipped(false);
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  }, []);

  const markCompleted = useCallback(() => {
    setCompleted(prev => {
      const next = new Set(prev);
      next.add(currentIndex);
      return next;
    });
    next();
  }, [currentIndex, next]);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setFlipped(false);
    setCompleted(new Set());
  }, []);

  return (
    <div data-testid="imaging-flashcards-page">
      <SEO
        title={`${examInfo.exam} Flashcards | NurseNest`}
        description={`Study flashcards for ${examInfo.exam} exam preparation.`}
        canonicalPath={`/medical-imaging/${country}/flashcards`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <BreadcrumbNav items={[
          { name: "Home", url: "https://www.nursenest.ca/" },
          { name: "Medical Imaging", url: "https://www.nursenest.ca/medical-imaging" },
          { name: country === "canada" ? "Canada" : "USA", url: `https://www.nursenest.ca/medical-imaging/${country}` },
          { name: "Flashcards", url: `https://www.nursenest.ca/medical-imaging/${country}/flashcards` },
        ]} />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href={`/medical-imaging/${country}`} className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 mb-6" data-testid="link-back">
          <ArrowLeft className="w-4 h-4" /> Back to {examInfo.exam} Prep
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
              <Zap className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900" data-testid="text-flashcards-title">
                {examInfo.exam} Flashcards
              </h1>
              <p className="text-sm text-gray-500">{total} cards{completed.size > 0 ? ` | ${completed.size} reviewed` : ""}</p>
            </div>
          </div>
          {completed.size > 0 && (
            <button onClick={reset} className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700" data-testid="button-reset">
              <RotateCcw className="w-4 h-4" /> Reset
            </button>
          )}
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => { setCategoryFilter("all"); setCurrentIndex(0); setFlipped(false); }}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium ${categoryFilter === "all" ? "bg-amber-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              data-testid="button-topic-all"
            >
              All
            </button>
            {categories.map(t => (
              <button
                key={t}
                onClick={() => { setCategoryFilter(t); setCurrentIndex(0); setFlipped(false); }}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium ${categoryFilter === t ? "bg-amber-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                data-testid={`button-topic-${t}`}
              >
                {t}
              </button>
            ))}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12 text-gray-400">Loading flashcards...</div>
        ) : total === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <Zap className="w-10 h-10 mx-auto mb-3 text-gray-300" />
            <p className="font-medium text-gray-500">No flashcards available</p>
          </div>
        ) : (
          <>
            <div className="mb-3">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>Progress</span>
                <span>{completed.size}/{total} reviewed</span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${(completed.size / total) * 100}%` }} />
              </div>
            </div>

            <div
              onClick={() => setFlipped(!flipped)}
              className={`relative min-h-[280px] bg-white border-2 rounded-2xl p-8 cursor-pointer transition-all ${
                flipped ? "border-amber-300 bg-amber-50/30" : "border-gray-200 hover:border-indigo-200"
              } ${completed.has(currentIndex) ? "ring-2 ring-green-200" : ""}`}
              data-testid="flashcard"
            >
              <div className="absolute top-3 right-3 flex items-center gap-2">
                <span className="text-xs text-gray-400">{currentIndex + 1} / {total}</span>
                {completed.has(currentIndex) && <CheckCircle2 className="w-4 h-4 text-green-500" />}
              </div>
              <div className="absolute top-3 left-3">
                {current?.category && <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded">{current.category}</span>}
              </div>
              <div className="flex items-center justify-center h-full pt-6">
                <div className="text-center">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">
                    {flipped ? "Answer" : "Question"}
                  </p>
                  <p className={`text-lg ${flipped ? "text-amber-800" : "text-gray-900"} font-medium leading-relaxed`} data-testid="text-card-content">
                    {flipped ? current?.back : current?.front}
                  </p>
                  {!flipped && (
                    <p className="text-xs text-gray-400 mt-6">Click to flip</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                onClick={prev}
                disabled={currentIndex === 0}
                className="inline-flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                data-testid="button-prev"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>
              <button
                onClick={markCompleted}
                className="px-6 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700"
                data-testid="button-mark-reviewed"
              >
                Mark Reviewed
              </button>
              <button
                onClick={next}
                disabled={currentIndex >= total - 1}
                className="inline-flex items-center gap-1 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                data-testid="button-next"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
