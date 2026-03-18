import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { NewGradGuide, GuideData } from "./new-grad-guide-template";
import { BookOpen, Loader2 } from "lucide-react";

import { useI18n } from "@/lib/i18n";
export default function SeoGuidePage() {
  const { t } = useI18n();
  const params = useParams<{ profession: string; guideSlug: string }>();
  const slug = `new-grad/${params.profession}/${params.guideSlug}`;

  const { data: guide, isLoading, error } = useQuery<GuideData>({
    queryKey: ["/api/new-grad/guides/by-slug", slug],
    queryFn: async () => {
      const res = await fetch(`/api/new-grad/guides/by-slug/${slug}`);
      if (!res.ok) throw new Error("Guide not found");
      const raw = await res.json();
      return {
        slug: raw.slug,
        type: raw.guide_type || raw.guideType || "survival-guide",
        title: raw.title,
        subtitle: raw.seo_description || raw.seoDescription || "",
        profession: raw.profession || "",
        professionSlug: raw.profession || "",
        readTime: raw.read_time || raw.readTime || "12 min read",
        author: raw.author_name || raw.authorName || "NurseNest Clinical Team",
        publishDate: raw.publish_date || raw.publishDate || new Date().toISOString().split("T")[0],
        seoTitle: raw.seo_title || raw.seoTitle || raw.title,
        seoDescription: raw.seo_description || raw.seoDescription || "",
        seoKeywords: raw.seo_keywords || raw.seoKeywords || "",
        sections: (raw.sections || []).map((s: any) => ({
          id: s.id || s.title?.toLowerCase().replace(/\s+/g, "-") || "",
          title: s.title || "",
          content: s.content || "",
          items: s.items || [],
        })),
        faqs: (raw.faq_items || raw.faqItems || []).map((f: any) => ({
          question: f.question,
          answer: f.answer,
        })),
        relatedLinks: (raw.related_links || raw.relatedLinks || []).map((l: any) => ({
          title: l.title,
          href: l.href || `/${l.slug || ""}`,
          description: l.description || "",
        })),
      };
    },
  });

  if (isLoading) {
    return (
      <div data-testid="guide-loading">
        <Navigation />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !guide) {
    return (
      <div data-testid="guide-not-found">
        <Navigation />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center max-w-md">
            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">{t("pages.newGrad.seoGuidePage.guideNotFound")}</h1>
            <p className="text-gray-600 mb-4">{t("pages.newGrad.seoGuidePage.thisGuideMayNotBe")}</p>
            <Link href="/new-grad" className="text-blue-600 hover:underline" data-testid="link-back-hub">{t("pages.newGrad.seoGuidePage.backToNewGradHub")}</Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return <NewGradGuide guideData={guide} />;
}
