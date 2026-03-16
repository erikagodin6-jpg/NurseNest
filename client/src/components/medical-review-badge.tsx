import { ShieldCheck, CalendarDays } from "lucide-react";

interface MedicalReviewBadgeProps {
  lastUpdated?: string;
  className?: string;
}

const REVIEWERS = [
  { name: "NurseNest Clinical Team", credentials: "RN, BScN" },
];

export function MedicalReviewBadge({ lastUpdated, className = "" }: MedicalReviewBadgeProps) {
  const reviewer = REVIEWERS[0];
  const displayDate = lastUpdated
    ? new Date(lastUpdated).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" })
    : "2025";

  return (
    <div className={`rounded-xl border border-emerald-200 bg-emerald-50/50 p-5 ${className}`} data-testid="medical-review-badge">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900">
            Medically reviewed by {reviewer.name}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {reviewer.credentials}
          </p>
          <div className="flex items-center gap-1.5 mt-2 text-xs text-gray-400">
            <CalendarDays className="w-3 h-3" />
            <span>Last reviewed: {displayDate}</span>
          </div>
          <p className="text-xs text-gray-500 mt-2 leading-relaxed">
            All clinical content on NurseNest is authored and reviewed by Registered Nurses with active clinical experience. Our editorial process follows evidence-based nursing practice standards.
          </p>
        </div>
      </div>
    </div>
  );
}

export function MedicalReviewJsonLd({ title, slug, lastUpdated, description }: {
  title: string;
  slug: string;
  lastUpdated?: string;
  description?: string;
}) {
  const reviewer = REVIEWERS[0];
  const baseUrl = "https://www.nursenest.ca";
  const dateStr = lastUpdated || new Date().toISOString().split("T")[0];

  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": title,
    "url": `${baseUrl}/lessons/${slug}`,
    "datePublished": dateStr,
    "dateModified": dateStr,
    "description": description || `Clinical nursing study guide: ${title}. Evidence-based pathophysiology, nursing interventions, pharmacology, and exam preparation.`,
    "author": {
      "@type": "Organization",
      "name": "NurseNest",
      "url": baseUrl,
    },
    "reviewedBy": {
      "@type": "Organization",
      "name": reviewer.name,
    },
    "publisher": {
      "@type": "Organization",
      "name": "NurseNest",
      "url": baseUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/favicon.png`,
      },
    },
    "medicalAudience": {
      "@type": "MedicalAudience",
      "audienceType": "Nurse",
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": "NurseNest",
      "url": baseUrl,
    },
    "inLanguage": "en",
    "about": {
      "@type": "MedicalCondition",
      "name": title,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
