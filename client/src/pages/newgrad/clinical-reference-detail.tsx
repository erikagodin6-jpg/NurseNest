import { useState } from "react";
import { Link, useParams } from "wouter";
import { SEO } from "@/components/seo";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { getClinicalReferenceBySlug, type ClinicalReferenceLesson, type ClinicalFlashcard } from "@/data/newgrad/clinical-reference-content";
import {
  ArrowRight, BookOpen, Thermometer, Droplets, HeartPulse, Monitor,
  HeartCrack, Calculator, ArrowLeftRight, AlertTriangle, Lightbulb,
  Zap, CheckCircle2, Eye, ChevronDown, ChevronRight, RotateCcw,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Thermometer, Droplets, HeartPulse, Monitor, HeartCrack, Calculator, ArrowLeftRight,
};

function FlashcardDeck({ flashcards, color }: { flashcards: ClinicalFlashcard[]; color: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const card = flashcards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + flashcards.length) % flashcards.length);
  };

  if (showAll) {
    return (
      <div data-testid="flashcard-list-view">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">All Flashcards ({flashcards.length})</h3>
          <Button variant="outline" size="sm" onClick={() => setShowAll(false)} data-testid="button-card-view">
            <RotateCcw className="w-3.5 h-3.5 mr-1" /> Card View
          </Button>
        </div>
        <div className="space-y-3">
          {flashcards.map((fc, i) => (
            <div key={fc.id} className="border border-gray-200 rounded-lg p-4" data-testid={`flashcard-list-${fc.id}`}>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: color }}>
                  {i + 1}
                </span>
                <div className="flex-1">
                  <Badge variant="outline" className="text-[10px] mb-1.5">{fc.category}</Badge>
                  <p className="text-sm font-medium text-gray-900 mb-2">{fc.question}</p>
                  <p className="text-sm text-gray-600 bg-gray-50 rounded p-3">{fc.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div data-testid="flashcard-deck">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900">Flashcards ({flashcards.length})</h3>
        <Button variant="outline" size="sm" onClick={() => setShowAll(true)} data-testid="button-list-view">
          <BookOpen className="w-3.5 h-3.5 mr-1" /> List View
        </Button>
      </div>
      <div className="relative">
        <div
          className="min-h-[220px] rounded-xl border-2 p-6 flex flex-col justify-center cursor-pointer transition-all hover:shadow-md"
          style={{ borderColor: color + "40", backgroundColor: isFlipped ? `${color}08` : "white" }}
          onClick={() => setIsFlipped(!isFlipped)}
          data-testid="flashcard-interactive"
        >
          <Badge variant="outline" className="self-start text-[10px] mb-3">{card.category}</Badge>
          {!isFlipped ? (
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide font-semibold mb-2">Question</p>
              <p className="text-base font-medium text-gray-900" data-testid="text-flashcard-question">{card.question}</p>
              <p className="text-xs text-gray-400 mt-4">Click to reveal answer</p>
            </div>
          ) : (
            <div>
              <p className="text-sm uppercase tracking-wide font-semibold mb-2" style={{ color }}>Answer</p>
              <p className="text-sm text-gray-700 leading-relaxed" data-testid="text-flashcard-answer">{card.answer}</p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between mt-4">
          <Button variant="outline" size="sm" onClick={handlePrev} data-testid="button-prev-card">
            ← Previous
          </Button>
          <span className="text-sm text-gray-500" data-testid="text-card-counter">
            {currentIndex + 1} / {flashcards.length}
          </span>
          <Button variant="outline" size="sm" onClick={handleNext} data-testid="button-next-card">
            Next →
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function ClinicalReferenceDetail() {
  const params = useParams<{ slug: string }>();
  const lesson = getClinicalReferenceBySlug(params.slug || "");
  const [expandedConcept, setExpandedConcept] = useState<number | null>(0);

  if (!lesson) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4" data-testid="text-not-found">Clinical Reference Not Found</h1>
          <p className="text-gray-600 mb-6">The clinical reference you are looking for does not exist.</p>
          <Link href="/newgrad/clinical-references">
            <Button data-testid="button-back-to-references">Back to Clinical References</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const IconComp = ICON_MAP[lesson.icon] || BookOpen;

  return (
    <div className="min-h-screen bg-gray-50" data-testid={`clinical-ref-${lesson.slug}`}>
      <Navigation />
      <SEO
        title={lesson.metaTitle}
        description={lesson.metaDescription}
        keywords={lesson.keywords}
        canonicalPath={`/newgrad/clinical-references/${lesson.slug}`}
        breadcrumbs={[
          { name: "Home", url: "https://www.nursenest.ca" },
          { name: "New Grad Career Hub", url: "https://www.nursenest.ca/newgrad" },
          { name: "Clinical References", url: "https://www.nursenest.ca/newgrad/clinical-references" },
          { name: lesson.title, url: `https://www.nursenest.ca/newgrad/clinical-references/${lesson.slug}` },
        ]}
      />

      <section className="relative py-14 sm:py-18 overflow-hidden" data-testid="section-detail-hero">
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${lesson.colorAccent}80, white, ${lesson.colorAccent}40)` }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbNav
            items={[
              { name: "Home", url: "https://www.nursenest.ca/" },
              { name: "New Grad Career Hub", url: "https://www.nursenest.ca/newgrad" },
              { name: "Clinical References", url: "https://www.nursenest.ca/newgrad/clinical-references" },
              { name: lesson.shortTitle, url: `https://www.nursenest.ca/newgrad/clinical-references/${lesson.slug}` },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <Badge className="mb-4 text-white" style={{ backgroundColor: lesson.color }} data-testid="badge-lesson-type">
              <IconComp className="w-3 h-3 mr-1" /> Clinical Reference
            </Badge>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight" data-testid="text-lesson-title">
              {lesson.title}
            </h1>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline" className="text-xs">
                <Lightbulb className="w-3 h-3 mr-1" /> {lesson.clinicalPearls.length} Clinical Pearls
              </Badge>
              <Badge variant="outline" className="text-xs">
                <AlertTriangle className="w-3 h-3 mr-1" /> {lesson.redFlags.length} Red Flags
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Zap className="w-3 h-3 mr-1" /> {lesson.flashcards.length} Flashcards
              </Badge>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block lg:w-56 shrink-0">
            <nav className="bg-white rounded-xl border border-gray-200 p-5 sticky top-24" data-testid="nav-lesson-toc">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4" style={{ color: lesson.color }} /> Contents
              </h3>
              <ul className="space-y-1.5">
                <li><a href="#overview" className="text-sm text-gray-600 hover:text-gray-900 block py-0.5 border-l-2 border-transparent hover:border-gray-400 pl-3">Overview</a></li>
                <li><a href="#key-concepts" className="text-sm text-gray-600 hover:text-gray-900 block py-0.5 border-l-2 border-transparent hover:border-gray-400 pl-3">Key Concepts</a></li>
                <li><a href="#clinical-pearls" className="text-sm text-gray-600 hover:text-gray-900 block py-0.5 border-l-2 border-transparent hover:border-gray-400 pl-3">Clinical Pearls</a></li>
                <li><a href="#red-flags" className="text-sm text-gray-600 hover:text-gray-900 block py-0.5 border-l-2 border-transparent hover:border-gray-400 pl-3">Red Flags</a></li>
                <li><a href="#exam-tips" className="text-sm text-gray-600 hover:text-gray-900 block py-0.5 border-l-2 border-transparent hover:border-gray-400 pl-3">Exam Tips</a></li>
                <li><a href="#flashcards" className="text-sm text-gray-600 hover:text-gray-900 block py-0.5 border-l-2 border-transparent hover:border-gray-400 pl-3">Flashcards</a></li>
              </ul>
              <div className="mt-4 pt-4 border-t">
                <Link href="/newgrad/clinical-references">
                  <span className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer">
                    <ArrowRight className="w-3 h-3 rotate-180" /> All Clinical References
                  </span>
                </Link>
              </div>
            </nav>
          </div>

          <div className="flex-1 min-w-0">
            <section id="overview" className="mb-10 scroll-mt-24" data-testid="section-overview">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <div className="w-1.5 h-8 rounded-full" style={{ backgroundColor: lesson.color }} />
                Overview
              </h2>
              <p className="text-gray-600 leading-relaxed">{lesson.overview}</p>
            </section>

            <section id="key-concepts" className="mb-10 scroll-mt-24" data-testid="section-key-concepts">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <div className="w-1.5 h-8 rounded-full" style={{ backgroundColor: lesson.color }} />
                Key Concepts
              </h2>
              <div className="space-y-3">
                {lesson.keyConcepts.map((concept, i) => (
                  <div key={i} className="border border-gray-200 rounded-lg overflow-hidden" data-testid={`concept-${i}`}>
                    <button
                      className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                      onClick={() => setExpandedConcept(expandedConcept === i ? null : i)}
                      data-testid={`button-concept-${i}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0" style={{ backgroundColor: lesson.color }}>
                          {i + 1}
                        </span>
                        <span className="font-semibold text-gray-900 text-sm">{concept.title}</span>
                      </div>
                      <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${expandedConcept === i ? "rotate-180" : ""}`} />
                    </button>
                    {expandedConcept === i && (
                      <div className="px-4 pb-4 pl-14" data-testid={`text-concept-content-${i}`}>
                        <p className="text-sm text-gray-600 leading-relaxed">{concept.content}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section id="clinical-pearls" className="mb-10 scroll-mt-24" data-testid="section-clinical-pearls">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <div className="w-1.5 h-8 rounded-full" style={{ backgroundColor: lesson.color }} />
                <Lightbulb className="w-5 h-5" style={{ color: lesson.color }} /> Clinical Pearls
              </h2>
              <div className="space-y-2">
                {lesson.clinicalPearls.map((pearl, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-amber-50 rounded-lg" data-testid={`pearl-${i}`}>
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-900">{pearl}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="red-flags" className="mb-10 scroll-mt-24" data-testid="section-red-flags">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <div className="w-1.5 h-8 rounded-full bg-red-500" />
                <AlertTriangle className="w-5 h-5 text-red-500" /> Red Flags
              </h2>
              <div className="bg-red-50 rounded-xl p-5">
                <ul className="space-y-2">
                  {lesson.redFlags.map((flag, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-red-800" data-testid={`red-flag-${i}`}>
                      <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      {flag}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="exam-tips" className="mb-10 scroll-mt-24" data-testid="section-exam-tips">
              <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                <div className="w-1.5 h-8 rounded-full" style={{ backgroundColor: lesson.color }} />
                <GraduationCap className="w-5 h-5" style={{ color: lesson.color }} /> Exam-Relevant Tips
              </h2>
              <div className="bg-blue-50 rounded-xl p-5">
                <ul className="space-y-2">
                  {lesson.examTips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-blue-800" data-testid={`exam-tip-${i}`}>
                      <CheckCircle2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section id="flashcards" className="mb-10 scroll-mt-24" data-testid="section-flashcards">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="w-1.5 h-8 rounded-full" style={{ backgroundColor: lesson.color }} />
                <Zap className="w-5 h-5" style={{ color: lesson.color }} /> Flashcards
              </h2>
              <FlashcardDeck flashcards={lesson.flashcards} color={lesson.color} />
            </section>

            <section className="mb-10" data-testid="section-lesson-cta">
              <div className="rounded-2xl p-8 text-center" style={{ backgroundColor: lesson.color }}>
                <h2 className="text-xl font-bold text-white mb-3">
                  Continue Your Clinical Learning
                </h2>
                <p className="text-white/80 text-sm mb-6 max-w-2xl mx-auto">
                  Explore more clinical reference guides designed for new graduate nurses.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link href="/newgrad/clinical-references">
                    <Button className="bg-white text-gray-900 hover:bg-gray-100 px-6 py-2.5 font-semibold" data-testid="button-all-references">
                      All Clinical References <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                  <Link href="/newgrad">
                    <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-6 py-2.5" data-testid="button-career-hub">
                      Career Hub
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
