import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { SEO } from "@/components/seo";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { Atom, ArrowLeft, ChevronDown, ChevronUp } from "lucide-react";

const EXAM_MAP: Record<string, { exam: string }> = {
  canada: { exam: "CAMRT" },
  usa: { exam: "ARRT" },
};

export default function ImagingPhysicsPage() {
  const [, params] = useRoute("/medical-imaging/:country/physics");
  const country = params?.country || "canada";
  const examInfo = EXAM_MAP[country] || EXAM_MAP.canada;
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const { data: topics = [], isLoading } = useQuery({
    queryKey: ["/api/imaging/physics", country],
    queryFn: () => fetch(`/api/imaging/physics?status=published&country=${country}`).then(r => r.json()),
  });

  const categories = useMemo(() => {
    const cats = new Set(topics.map((t: any) => t.category).filter(Boolean));
    return Array.from(cats).sort();
  }, [topics]);

  const filtered = useMemo(() => {
    if (!activeCategory) return topics;
    return topics.filter((t: any) => t.category === activeCategory);
  }, [topics, activeCategory]);

  const toggle = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div data-testid="imaging-physics-page">
      <SEO
        title={`${examInfo.exam} Physics Review | NurseNest`}
        description={`Radiation physics review for ${examInfo.exam} exam preparation.`}
        canonicalPath={`/medical-imaging/${country}/physics`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <BreadcrumbNav items={[
          { name: "Home", url: "https://www.nursenest.ca/" },
          { name: "Medical Imaging", url: "https://www.nursenest.ca/medical-imaging" },
          { name: country === "canada" ? "Canada" : "USA", url: `https://www.nursenest.ca/medical-imaging/${country}` },
          { name: "Physics Review", url: `https://www.nursenest.ca/medical-imaging/${country}/physics` },
        ]} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href={`/medical-imaging/${country}`} className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 mb-6" data-testid="link-back">
          <ArrowLeft className="w-4 h-4" /> Back to {examInfo.exam} Prep
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center">
            <Atom className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900" data-testid="text-physics-title">
              Radiation Physics Review
            </h1>
            <p className="text-sm text-gray-500">{topics.length} topics for {examInfo.exam}</p>
          </div>
        </div>

        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${!activeCategory ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              data-testid="button-category-all"
            >
              All ({topics.length})
            </button>
            {categories.map(cat => {
              const catCount = topics.filter((t: any) => t.category === cat).length;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                  data-testid={`button-category-${cat}`}
                >
                  {cat} ({catCount})
                </button>
              );
            })}
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12 text-gray-400">Loading physics topics...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <Atom className="w-10 h-10 mx-auto mb-3 text-gray-300" />
            <p className="font-medium text-gray-500">No physics topics found</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((topic: any) => (
              <div key={topic.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden" data-testid={`physics-topic-${topic.id}`}>
                <button
                  onClick={() => toggle(topic.id)}
                  className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 transition-colors"
                  data-testid={`button-expand-${topic.id}`}
                >
                  <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                    <Atom className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm">{topic.title}</h3>
                    <div className="flex gap-2 mt-1">
                      {topic.category && <span className="px-2 py-0.5 bg-purple-50 text-purple-700 text-xs rounded">{topic.category}</span>}
                      {topic.difficulty != null && <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">Level {topic.difficulty}</span>}
                    </div>
                  </div>
                  {expanded.has(topic.id) ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                {expanded.has(topic.id) && (
                  <div className="border-t border-gray-100 p-4 bg-gray-50/50">
                    {topic.content && (
                      typeof topic.content === "string" ? (
                        <p className="text-sm text-gray-700 mb-4 whitespace-pre-line">{topic.content}</p>
                      ) : Array.isArray(topic.content) ? (
                        <ul className="text-sm text-gray-700 mb-4 space-y-1 list-disc pl-5">
                          {topic.content.map((item: string | Record<string, unknown>, idx: number) => (
                            <li key={idx} className="whitespace-pre-line">
                              {typeof item === "string" ? item : JSON.stringify(item)}
                            </li>
                          ))}
                        </ul>
                      ) : typeof topic.content === "object" && topic.content !== null ? (
                        <div className="text-sm text-gray-700 mb-4 space-y-2">
                          {Object.entries(topic.content).map(([key, val]: [string, unknown]) => (
                            <div key={key}>
                              <span className="font-medium text-gray-900">{key}: </span>
                              <span className="whitespace-pre-line">{typeof val === "string" ? val : JSON.stringify(val)}</span>
                            </div>
                          ))}
                        </div>
                      ) : null
                    )}

                    {topic.keyConcepts && Array.isArray(topic.keyConcepts) && topic.keyConcepts.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Key Concepts</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {topic.keyConcepts.map((c: string, i: number) => (
                            <span key={i} className="px-2 py-0.5 bg-purple-50 text-purple-700 text-xs rounded-full">{c}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {topic.formulas && Array.isArray(topic.formulas) && topic.formulas.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Formulas</h4>
                        <div className="space-y-2">
                          {topic.formulas.map((f: any, i: number) => (
                            <div key={i} className="bg-purple-50 rounded-lg px-4 py-3">
                              {typeof f === "string" ? (
                                <span className="text-sm text-purple-800 font-mono">{f}</span>
                              ) : typeof f === "object" && f !== null ? (
                                <div>
                                  {f.name && <span className="text-sm font-semibold text-purple-900">{f.name}: </span>}
                                  <span className="text-sm text-purple-700 font-mono">{f.formula || f.expression || ""}</span>
                                  {f.description && <p className="text-xs text-purple-600 mt-1">{f.description}</p>}
                                </div>
                              ) : null}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
