import { useState, useEffect, useRef, useMemo } from "react";
import { useLocation } from "wouter";
import { Search, X, BookOpen, Stethoscope, Pill, FileText, ArrowRight } from "lucide-react";
import { contentMap } from "@/data/lessons";
import { clinicalConfusions } from "@/data/clinical-confusions";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SearchResult = {
  id: string;
  title: string;
  type: "lesson" | "clinical-clarity" | "medication";
  path: string;
  snippet?: string;
};

function buildSearchIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  Object.entries(contentMap).forEach(([id, lesson]) => {
    results.push({
      id,
      title: lesson.title,
      type: "lesson",
      path: `/lessons/${id}`,
      snippet: lesson.cellular?.content?.slice(0, 120),
    });
  });

  if (Array.isArray(clinicalConfusions)) {
    clinicalConfusions.forEach((topic: any) => {
      if (topic.slug && topic.title) {
        results.push({
          id: topic.slug,
          title: topic.title,
          type: "clinical-clarity",
          path: `/clinical-clarity/${topic.slug}`,
          snippet: topic.description || topic.summary || "",
        });
      }
    });
  }

  return results;
}

const TYPE_ICONS: Record<string, any> = {
  lesson: BookOpen,
  "clinical-clarity": Stethoscope,
  medication: Pill,
};

const TYPE_LABELS: Record<string, string> = {
  lesson: "Lesson",
  "clinical-clarity": "Clinical Clarity",
  medication: "Medication",
};

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [, setLocation] = useLocation();
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const searchIndex = useMemo(() => buildSearchIndex(), []);

  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];
    const q = query.toLowerCase();
    return searchIndex
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          (item.snippet && item.snippet.toLowerCase().includes(q))
      )
      .slice(0, 8);
  }, [query, searchIndex]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
        setQuery("");
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  const handleSelect = (result: SearchResult) => {
    setLocation(result.path);
    setOpen(false);
    setQuery("");
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/15 bg-primary/5 hover:bg-primary/10 transition-colors text-sm text-gray-500 hover:text-primary"
        data-testid="button-global-search"
      >
        <Search className="w-3.5 h-3.5" />
        <span className="hidden lg:inline">Search...</span>
        <kbd className="hidden lg:inline-flex items-center text-[10px] font-mono text-gray-400 bg-white/80 border border-gray-200 rounded px-1 py-0.5">
          Ctrl K
        </kbd>
      </button>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]" />
      <div className="fixed inset-0 z-[70] flex items-start justify-center pt-[15vh]">
        <div
          ref={containerRef}
          className="w-full max-w-lg mx-4 bg-white rounded-2xl shadow-2xl border border-primary/10 overflow-hidden"
          data-testid="section-global-search"
        >
          <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
            <Search className="w-5 h-5 text-primary/60 shrink-0" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search conditions, lessons, topics..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="border-0 shadow-none focus-visible:ring-0 text-base px-0 h-auto"
              data-testid="input-global-search"
            />
            <button
              onClick={() => { setOpen(false); setQuery(""); }}
              className="shrink-0 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="max-h-80 overflow-y-auto">
            {query.length >= 2 && results.length === 0 && (
              <div className="px-6 py-8 text-center text-gray-400">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No results found for "{query}"</p>
                <p className="text-xs mt-1">Try a different spelling or keyword</p>
              </div>
            )}

            {results.length > 0 && (
              <div className="py-2">
                {results.map((result) => {
                  const Icon = TYPE_ICONS[result.type] || FileText;
                  return (
                    <button
                      key={`${result.type}-${result.id}`}
                      onClick={() => handleSelect(result)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary/5 transition-colors text-left group"
                      data-testid={`search-result-${result.id}`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {result.title}
                        </p>
                        <p className="text-xs text-gray-400">
                          {TYPE_LABELS[result.type]}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-primary shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  );
                })}
              </div>
            )}

            {query.length < 2 && (
              <div className="px-6 py-8 text-center text-gray-400">
                <p className="text-sm">Type at least 2 characters to search</p>
                <p className="text-xs mt-1">Search across lessons, conditions, and topics</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
