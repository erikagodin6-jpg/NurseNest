import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useRoute } from "wouter";
import { SEO } from "@/components/seo";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { MapPin, ArrowLeft, Search, ChevronDown, ChevronUp } from "lucide-react";

const EXAM_MAP: Record<string, { exam: string }> = {
  canada: { exam: "CAMRT" },
  usa: { exam: "ARRT" },
};

export default function ImagingPositioningPage() {
  const [, params] = useRoute("/medical-imaging/:country/positioning");
  const country = params?.country || "canada";
  const examInfo = EXAM_MAP[country] || EXAM_MAP.canada;
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState("All");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const { data: entries = [], isLoading } = useQuery({
    queryKey: ["/api/imaging/positioning", country],
    queryFn: () => fetch(`/api/imaging/positioning?status=published&country=${country}`).then(r => r.json()),
  });

  const filtered = useMemo(() => {
    return entries.filter((e: any) => {
      if (regionFilter !== "All" && e.bodyPart !== regionFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          (e.bodyPart || "").toLowerCase().includes(q) ||
          (e.projectionName || "").toLowerCase().includes(q) ||
          (e.patientPosition || "").toLowerCase().includes(q) ||
          (e.anatomyDemonstrated || "").toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [entries, regionFilter, search]);

  const regions = useMemo(() => {
    const unique = new Set(entries.map((e: any) => e.bodyPart));
    return ["All", ...Array.from(unique).sort()];
  }, [entries]);

  const toggle = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div data-testid="imaging-positioning-page">
      <SEO
        title={`${examInfo.exam} Positioning Guide | NurseNest`}
        description={`Complete radiographic positioning guide for ${examInfo.exam} exam preparation.`}
        canonicalPath={`/medical-imaging/${country}/positioning`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <BreadcrumbNav items={[
          { name: "Home", url: "https://www.nursenest.ca/" },
          { name: "Medical Imaging", url: "https://www.nursenest.ca/medical-imaging" },
          { name: country === "canada" ? "Canada" : "USA", url: `https://www.nursenest.ca/medical-imaging/${country}` },
          { name: "Positioning Guide", url: `https://www.nursenest.ca/medical-imaging/${country}/positioning` },
        ]} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href={`/medical-imaging/${country}`} className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 mb-6" data-testid="link-back">
          <ArrowLeft className="w-4 h-4" /> Back to {examInfo.exam} Prep
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
            <MapPin className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900" data-testid="text-positioning-title">
              Positioning Guide
            </h1>
            <p className="text-sm text-gray-500">{filtered.length} positioning entries for {examInfo.exam}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by body part, projection, anatomy..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-200"
              data-testid="input-search-positioning"
            />
          </div>
          <select
            value={regionFilter}
            onChange={e => setRegionFilter(e.target.value)}
            className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm"
            data-testid="select-region-filter"
          >
            {regions.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-gray-400">Loading positioning entries...</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <MapPin className="w-10 h-10 mx-auto mb-3 text-gray-300" />
            <p className="font-medium text-gray-500">No positioning entries found</p>
            <p className="text-sm text-gray-400">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((entry: any) => (
              <div key={entry.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden" data-testid={`positioning-entry-${entry.id}`}>
                <button
                  onClick={() => toggle(entry.id)}
                  className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-50 transition-colors"
                  data-testid={`button-expand-${entry.id}`}
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm">{entry.bodyPart} - {entry.projectionName}</h3>
                    {entry.patientPosition && <p className="text-xs text-gray-500 truncate">{entry.patientPosition}</p>}
                  </div>
                  {expanded.has(entry.id) ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </button>
                {expanded.has(entry.id) && (
                  <div className="border-t border-gray-100 p-4 bg-gray-50/50">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Patient Position</span>
                        <p className="text-sm text-gray-800 mt-1">{entry.patientPosition}</p>
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Central Ray</span>
                        <p className="text-sm text-gray-800 mt-1">{entry.centralRay}</p>
                      </div>
                      {entry.anatomyDemonstrated && (
                        <div className="sm:col-span-2">
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Anatomy Demonstrated</span>
                          <p className="text-sm text-gray-800 mt-1">{entry.anatomyDemonstrated}</p>
                        </div>
                      )}
                      {entry.sid && (
                        <div>
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">SID</span>
                          <p className="text-sm text-gray-800 mt-1">{entry.sid}</p>
                        </div>
                      )}
                      {entry.filmSize && (
                        <div>
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Film/IR Size</span>
                          <p className="text-sm text-gray-800 mt-1">{entry.filmSize}</p>
                        </div>
                      )}
                      {entry.technicalFactors && (
                        <div className="sm:col-span-2">
                          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Technical Factors</span>
                          <p className="text-sm text-gray-800 mt-1">{entry.technicalFactors}</p>
                        </div>
                      )}
                    </div>
                    {entry.tips && (
                      <div className="mt-3 bg-amber-50 rounded-lg p-3">
                        <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Tips</span>
                        <p className="text-sm text-amber-800 mt-1">{entry.tips}</p>
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
