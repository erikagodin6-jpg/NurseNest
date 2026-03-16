import { Link } from "wouter";
import { SEO } from "@/components/seo";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { BreadcrumbNav } from "@/components/breadcrumb-nav";
import { CLINICAL_REFERENCE_LESSONS } from "@/data/newgrad/clinical-reference-content";
import {
  ArrowRight, BookOpen, Thermometer, Droplets, HeartPulse, Monitor,
  HeartCrack, Calculator, ArrowLeftRight, GraduationCap, AlertTriangle,
  Lightbulb, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import type { LucideIcon } from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  Thermometer, Droplets, HeartPulse, Monitor, HeartCrack, Calculator, ArrowLeftRight,
};

export default function ClinicalReferencesPage() {
  return (
    <div className="min-h-screen bg-gray-50" data-testid="clinical-references-page">
      <Navigation />
      <SEO
        title="Clinical Reference Guides for New Grad Nurses | NurseNest"
        description="Essential clinical reference guides for new graduate nurses covering sepsis, DKA, hemorrhage protocols, ICU monitoring, cardiac emergencies, medication calculations, and clinical handoff."
        keywords="new grad clinical reference, sepsis management, DKA protocol, ICU monitoring, cardiac emergencies, medication calculations, clinical handoff, SBAR"
        canonicalPath="/newgrad/clinical-references"
        breadcrumbs={[
          { name: "Home", url: "https://www.nursenest.ca" },
          { name: "New Grad Career Hub", url: "https://www.nursenest.ca/newgrad" },
          { name: "Clinical References", url: "https://www.nursenest.ca/newgrad/clinical-references" },
        ]}
      />

      <section className="relative py-14 sm:py-18 overflow-hidden" data-testid="section-clinical-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50/30 to-white" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <BreadcrumbNav
            items={[
              { name: "Home", url: "https://www.nursenest.ca/" },
              { name: "New Grad Career Hub", url: "https://www.nursenest.ca/newgrad" },
              { name: "Clinical References", url: "https://www.nursenest.ca/newgrad/clinical-references" },
            ]}
          />
          <div className="mt-6 max-w-3xl">
            <Badge className="mb-4 bg-red-100 text-red-700" data-testid="badge-clinical-ref">
              <AlertTriangle className="w-3 h-3 mr-1" /> Clinical Reference
            </Badge>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight" data-testid="text-clinical-ref-title">
              Clinical Reference Guides for New Graduates
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-6" data-testid="text-clinical-ref-subtitle">
              High-acuity clinical reference content designed to bridge the gap between nursing school and bedside practice. Each guide includes key concepts, clinical pearls, red flags, exam tips, and flashcards.
            </p>
            <Link href="/newgrad/survival-guide" className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors text-sm shadow-lg shadow-emerald-200" data-testid="button-survival-guide">
              <BookOpen className="w-4 h-4" /> View Survival Guide
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10" data-testid="section-clinical-topics">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CLINICAL_REFERENCE_LESSONS.map((lesson) => {
            const IconComp = ICON_MAP[lesson.icon] || BookOpen;
            return (
              <Link key={lesson.slug} href={`/newgrad/clinical-references/${lesson.slug}`}>
                <Card className="h-full hover:shadow-lg transition-all cursor-pointer group border-gray-100" data-testid={`card-clinical-${lesson.slug}`}>
                  <CardContent className="p-6">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: `${lesson.color}15` }}>
                      <IconComp className="w-5.5 h-5.5" style={{ color: lesson.color }} />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors" data-testid={`text-title-${lesson.slug}`}>
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed mb-3 line-clamp-3">
                      {lesson.overview.substring(0, 150)}...
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px]">
                          <Lightbulb className="w-2.5 h-2.5 mr-0.5" /> {lesson.clinicalPearls.length} pearls
                        </Badge>
                        <Badge variant="outline" className="text-[10px]">
                          <Zap className="w-2.5 h-2.5 mr-0.5" /> {lesson.flashcards.length} cards
                        </Badge>
                      </div>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-gradient-to-r from-red-600 to-orange-600 py-14" data-testid="section-clinical-cta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Build Your Clinical Confidence
          </h2>
          <p className="text-red-100 mb-8 max-w-xl mx-auto">
            These guides are designed to help new graduate nurses bridge the gap between classroom knowledge and confident bedside practice.
          </p>
          <Link href="/newgrad">
            <Button className="bg-white text-red-700 hover:bg-red-50 rounded-full px-8 gap-2" data-testid="button-back-to-hub">
              <GraduationCap className="w-4 h-4" /> Back to Career Hub
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
