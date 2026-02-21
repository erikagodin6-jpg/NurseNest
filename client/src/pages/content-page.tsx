import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EducationalIntegrity } from "@/components/educational-integrity";
import { CiteThisPage } from "@/components/cite-this-page";
import {
  ArrowLeft,
  Lightbulb,
  Pill,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Calendar,
  BookOpen,
  Home,
  List,
  User,
  Pencil,
} from "lucide-react";
import { useAuth } from "@/lib/auth";
import { buildBreadcrumbStructuredData } from "@/lib/seo-utils";
import type { ContentItem } from "@shared/schema";

interface ContentBlock {
  type: string;
  content: string;
}

function QuizQuestionBlock({ content }: { content: string }) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const lines = content.split("\n").filter((l) => l.trim());
  const question = lines.find((l) => l.startsWith("Q:"))?.replace("Q:", "").trim() || "";
  const options: { label: string; text: string }[] = [];
  let correctAnswer = "";
  let rationale = "";

  for (const line of lines) {
    const optMatch = line.match(/^([A-D]):\s*(.+)/);
    if (optMatch) {
      options.push({ label: optMatch[1], text: optMatch[2].trim() });
    }
    if (line.startsWith("Correct:")) {
      correctAnswer = line.replace("Correct:", "").trim();
    }
    if (line.startsWith("Rationale:")) {
      rationale = line.replace("Rationale:", "").trim();
    }
  }

  const handleSelect = (label: string) => {
    if (showResult) return;
    setSelectedAnswer(label);
    setShowResult(true);
  };

  const isCorrect = selectedAnswer === correctAnswer;

  return (
    <div className="my-6 p-6 bg-blue-50/50 border border-blue-100 rounded-2xl space-y-4" data-testid="section-quiz-question">
      <div className="flex items-center gap-2 text-blue-700 font-bold text-sm uppercase tracking-wider">
        <BookOpen className="w-4 h-4" />
        Knowledge Check
      </div>
      <p className="text-lg font-semibold text-gray-900" data-testid="text-quiz-question">{question}</p>
      <div className="grid gap-3">
        {options.map((opt) => {
          let style = "hover:bg-blue-50 hover:border-blue-300 cursor-pointer";
          if (showResult) {
            if (opt.label === correctAnswer) style = "bg-emerald-50 border-emerald-400 text-emerald-900";
            else if (opt.label === selectedAnswer) style = "bg-red-50 border-red-400 text-red-900";
            else style = "opacity-60";
          }
          return (
            <Card
              key={opt.label}
              className={`border shadow-sm transition-all ${style}`}
              onClick={() => handleSelect(opt.label)}
              data-testid={`card-quiz-option-${opt.label}`}
            >
              <CardContent className="p-4 flex items-start gap-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${
                    showResult && opt.label === correctAnswer
                      ? "bg-emerald-500 text-white"
                      : showResult && opt.label === selectedAnswer
                        ? "bg-red-500 text-white"
                        : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {showResult && opt.label === correctAnswer ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : showResult && opt.label === selectedAnswer ? (
                    <XCircle className="w-5 h-5" />
                  ) : (
                    opt.label
                  )}
                </div>
                <span className="pt-1">{opt.text}</span>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {showResult && (
        <div
          className={`p-4 rounded-xl border ${
            isCorrect ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-red-50 border-red-200 text-red-800"
          }`}
          data-testid="text-quiz-rationale"
        >
          <p className="font-bold mb-1">{isCorrect ? "✓ Correct!" : "✗ Incorrect"}</p>
          {rationale && <p className="text-sm">{rationale}</p>}
        </div>
      )}
    </div>
  );
}

function getBlockContent(block: any): string {
  return block.content || block.text || "";
}

function getBlockItems(block: any): string[] {
  if (block.items && Array.isArray(block.items)) return block.items;
  const content = getBlockContent(block);
  return content.split("\n").filter((item: string) => item.trim());
}

function ContentBlockRenderer({ block }: { block: ContentBlock }) {
  const content = getBlockContent(block);

  switch (block.type) {
    case "heading":
      return (
        <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4" data-testid="text-content-heading">
          {content}
        </h2>
      );

    case "paragraph":
      return (
        <p className="text-gray-700 leading-relaxed mb-4" data-testid="text-content-paragraph">
          {content}
        </p>
      );

    case "list":
      return (
        <ul className="my-4 space-y-2 pl-1" data-testid="list-content">
          {getBlockItems(block).map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-gray-700">
              <List className="w-4 h-4 text-primary shrink-0 mt-1" />
              <span>{item.trim()}</span>
            </li>
          ))}
        </ul>
      );

    case "clinical-pearl":
      return (
        <Card className="my-6 border-none shadow-lg bg-amber-50/80" data-testid="card-clinical-pearl">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                <Lightbulb className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-amber-700 uppercase tracking-wider mb-1">Clinical Pearl</p>
                <p className="text-gray-800 leading-relaxed">{content}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      );

    case "medication":
      return (
        <Card className="my-6 border-none shadow-lg bg-purple-50/80" data-testid="card-medication">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                <Pill className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-purple-700 uppercase tracking-wider mb-1">Medication Information</p>
                <p className="text-gray-800 leading-relaxed">{content}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      );

    case "warning":
      return (
        <Card className="my-6 border-none shadow-lg bg-red-50/80 border-l-4 border-l-red-400" data-testid="card-warning">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-red-700 uppercase tracking-wider mb-1">Warning</p>
                <p className="text-gray-800 leading-relaxed">{content}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      );

    case "quiz-question":
    case "question":
      return <QuizQuestionBlock content={content} />;

    case "callout":
      return (
        <Card className="my-6 border-none shadow-lg bg-blue-50/80" data-testid="card-callout">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-1">Key Point</p>
                <p className="text-gray-800 leading-relaxed">{content}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      );

    case "flashcard":
      return (
        <Card className="my-6 border-none shadow-lg bg-indigo-50/80" data-testid="card-flashcard">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <p className="text-sm font-bold text-indigo-700 uppercase tracking-wider mb-1">Flashcard</p>
                <p className="text-gray-800 leading-relaxed whitespace-pre-line">{content}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      );

    default:
      return (
        <p className="text-gray-700 leading-relaxed mb-4">{content}</p>
      );
  }
}

function formatDate(dateStr: string | null | undefined): string {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function ContentPage() {
  const { slug } = useParams<{ slug: string }>();
  const { user, isAdmin } = useAuth();

  const { data: contentItem, isLoading, error } = useQuery<ContentItem>({
    queryKey: ["content-slug", slug],
    queryFn: async () => {
      const res = await fetch(`/api/content/slug/${slug}`);
      if (!res.ok) throw new Error("Not found");
      return res.json();
    },
    enabled: !!slug,
  });

  const { data: relatedItems } = useQuery<ContentItem[]>({
    queryKey: ["content-related", contentItem?.bodySystem, contentItem?.id],
    queryFn: async () => {
      const res = await fetch(`/api/content?status=published`);
      if (!res.ok) return [];
      const items: ContentItem[] = await res.json();
      return items
        .filter((item) => item.bodySystem === contentItem?.bodySystem && item.id !== contentItem?.id)
        .slice(0, 3);
    },
    enabled: !!contentItem?.bodySystem,
  });

  const isNotFound = !isLoading && (!contentItem || contentItem.status !== "published");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
        <Navigation />
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full text-center">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-3/4 mx-auto" />
            <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
            <div className="h-64 bg-gray-200 rounded-xl" />
          </div>
        </main>
      </div>
    );
  }

  if (isNotFound) {
    return (
      <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
        <SEO title="Content Not Found - NurseNest" description="The requested content could not be found." />
        <Navigation />
        <main className="max-w-2xl mx-auto px-4 py-20 w-full text-center space-y-6">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
            <BookOpen className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Content Not Found</h1>
          <p className="text-gray-600">The page you're looking for doesn't exist or hasn't been published yet.</p>
          <Link href="/">
            <Button className="rounded-full px-8" data-testid="button-go-home">
              <Home className="w-4 h-4 mr-2" /> Go Home
            </Button>
          </Link>
        </main>
      </div>
    );
  }

  const title = contentItem!.seoTitle || contentItem!.title;
  const description = contentItem!.seoDescription || contentItem!.summary || "";
  const contentBlocks: ContentBlock[] = (contentItem!.content as ContentBlock[]) || [];
  const tags: string[] = contentItem!.tags || [];
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://nursenest.replit.app";

  const learningResourceData = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: contentItem!.title,
    description: description,
    learningResourceType: contentItem!.type || "Lesson",
    educationalLevel: contentItem!.tier === "np" ? "Nurse Practitioner" : contentItem!.tier === "rn" ? "Registered Nurse" : "Practical Nurse",
    provider: {
      "@type": "EducationalOrganization",
      name: "NurseNest",
      url: baseUrl,
    },
    isAccessibleForFree: contentItem!.tier === "free",
    inLanguage: "en",
    datePublished: contentItem!.publishedAt,
    url: `${baseUrl}/learn/${slug}`,
  };

  const breadcrumbData = buildBreadcrumbStructuredData([
    { name: "Home", url: `${baseUrl}/` },
    { name: "Learn", url: `${baseUrl}/lessons` },
    { name: contentItem!.title, url: `${baseUrl}/learn/${slug}` },
  ]);

  const tierLabel =
    contentItem!.tier === "np" ? "NP" : contentItem!.tier === "rn" ? "RN" : contentItem!.tier === "free" ? "Free" : "RPN";

  return (
    <div className="min-h-screen bg-warmwhite flex flex-col font-sans text-gray-900">
      <SEO
        title={`${title} - NurseNest`}
        description={description}
        canonicalPath={`/learn/${slug}`}
        ogType="article"
        structuredData={learningResourceData}
        additionalStructuredData={[breadcrumbData]}
      />
      <Navigation />

      <article
        className="select-none"
        onContextMenu={(e) => e.preventDefault()}
        data-testid="article-content"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gray-500" data-testid="nav-breadcrumb">
            <ol className="flex items-center gap-1 flex-wrap">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3 h-3 text-gray-300 mx-1" />
              </li>
              <li>
                <Link href="/lessons" className="hover:text-primary transition-colors">
                  Learn
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3 h-3 text-gray-300 mx-1" />
              </li>
              <li className="text-gray-900 font-medium">{contentItem!.title}</li>
            </ol>
          </nav>

          <header className="mb-10 space-y-4">
            <div className="flex items-center gap-3 flex-wrap">
              {contentItem!.bodySystem && (
                <Badge variant="secondary" className="text-sm" data-testid="badge-body-system">
                  {contentItem!.bodySystem}
                </Badge>
              )}
              <Badge
                variant="outline"
                className="text-sm"
                data-testid="badge-tier"
              >
                {tierLabel}
              </Badge>
              {contentItem!.publishedAt && (
                <span className="flex items-center gap-1 text-sm text-gray-400" data-testid="text-published-date">
                  <Calendar className="w-3.5 h-3.5" />
                  {formatDate(contentItem!.publishedAt as unknown as string)}
                </span>
              )}
              {(contentItem as any).authorName && (
                <span className="flex items-center gap-1 text-sm text-gray-400" data-testid="text-author-name">
                  <User className="w-3.5 h-3.5" />
                  {(contentItem as any).authorName}
                </span>
              )}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900" data-testid="text-content-title">
              {contentItem!.title}
            </h1>
            {contentItem!.summary && (
              <p className="text-lg text-gray-600 leading-relaxed" data-testid="text-content-summary">
                {contentItem!.summary}
              </p>
            )}
          </header>

          <div className="flex items-center gap-3 mb-8" data-testid="section-cite-top">
            <CiteThisPage
              title={contentItem!.title}
              publishedDate={contentItem!.publishedAt as unknown as string}
            />
            {isAdmin && (
              <Link href={`/content-editor?edit=${contentItem!.id}`}>
                <Button variant="outline" size="sm" className="gap-2 rounded-full" data-testid="button-admin-edit">
                  <Pencil className="w-4 h-4" />
                  Edit Page
                </Button>
              </Link>
            )}
          </div>

          <section className="prose-lg max-w-none" data-testid="section-content-blocks">
            {contentBlocks.map((block, index) => (
              <ContentBlockRenderer key={index} block={block} />
            ))}
          </section>

          {tags.length > 0 && (
            <section className="mt-12 pt-8 border-t border-gray-200" data-testid="section-tags">
              <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Topics</h2>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-sm" data-testid={`badge-tag-${tag}`}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </section>
          )}

          <div className="mt-8 flex justify-start" data-testid="section-cite-this-page">
            <CiteThisPage
              title={contentItem!.title}
              publishedDate={contentItem!.publishedAt as unknown as string}
            />
          </div>

          {relatedItems && relatedItems.length > 0 && (
            <section className="mt-12 pt-8 border-t border-gray-200" data-testid="section-related-content">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Related Content</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {relatedItems.map((item) => (
                  <Link key={item.id} href={`/learn/${item.slug}`}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full" data-testid={`card-related-${item.id}`}>
                      <CardContent className="p-5 space-y-2">
                        <div className="flex items-center gap-2">
                          {item.bodySystem && (
                            <Badge variant="secondary" className="text-xs">
                              {item.bodySystem}
                            </Badge>
                          )}
                        </div>
                        <h3 className="font-bold text-gray-900">{item.title}</h3>
                        {item.summary && (
                          <p className="text-sm text-gray-500 line-clamp-2">{item.summary}</p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <div className="mt-12">
            <EducationalIntegrity variant="footer" />
          </div>
        </div>
      </article>
    </div>
  );
}
