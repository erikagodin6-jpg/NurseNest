import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { SEO } from "@/components/seo";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PremiumUpgradeCTA, useNewGradAccess } from "./premium-cta";
import {
  ChevronRight, ChevronDown, ArrowRight, MessageSquare, Lock,
  CheckCircle2, Star, Lightbulb
} from "lucide-react";

const INTERVIEW_CATEGORIES = [
  "Behavioral (STAR format)",
  "Clinical Scenario",
  "Conflict Resolution",
  "Time Management",
  "Teamwork & Delegation",
  "Patient Safety",
];

const FREE_SAMPLE_QUESTIONS = [
  {
    category: "Behavioral (STAR format)",
    question: "Tell me about a time you had to advocate for a patient.",
    answer: "During my clinical rotation, I noticed a patient's pain was not being adequately managed. I assessed the patient, documented my findings, and communicated my concerns using SBAR to the charge nurse. I recommended a pain management consultation, which was implemented and resulted in significantly improved patient comfort scores.",
    tips: "Use the STAR framework: Situation, Task, Action, Result. Focus on patient outcomes and your clinical reasoning.",
    isPremium: false,
  },
  {
    category: "Clinical Scenario",
    question: "How would you handle a patient whose condition is rapidly deteriorating?",
    answer: "I would follow a systematic approach: assess airway, breathing, and circulation; obtain vital signs; call for help using the rapid response system; implement standing orders; and communicate findings using SBAR. I would stay with the patient and document all interventions and responses.",
    tips: "Demonstrate your ability to stay calm, prioritize, and follow protocols. Mention teamwork and communication.",
    isPremium: false,
  },
  {
    category: "Conflict Resolution",
    question: "Describe a time you disagreed with a colleague. How did you handle it?",
    answer: "During a clinical rotation, I disagreed with a fellow student about patient care priorities. I approached them privately, listened to their perspective, shared my clinical reasoning, and we collaborated on a solution that incorporated both viewpoints. This improved our working relationship and patient care.",
    tips: "Show emotional maturity, willingness to listen, and focus on patient outcomes rather than being right.",
    isPremium: false,
  },
];

export default function InterviewPage() {
  const { hasAccess } = useNewGradAccess();
  const [expandedQ, setExpandedQ] = useState<number | null>(null);

  const { data: dbQuestions = [] } = useQuery({
    queryKey: ["/api/newgrad/interview-questions"],
    queryFn: async () => {
      const res = await fetch("/api/newgrad/interview-questions");
      return res.ok ? res.json() : [];
    },
  });

  const allQuestions = dbQuestions.length > 0 ? dbQuestions : FREE_SAMPLE_QUESTIONS;
  const freeQuestions = allQuestions.filter((q: any) => !q.isPremium && !q.is_premium);
  const premiumQuestions = allQuestions.filter((q: any) => q.isPremium || q.is_premium);

  return (
    <div data-testid="newgrad-interview-page">
      <Navigation />
      <SEO
        title="New Grad Nurse Interview Prep - 100+ Questions & STAR Answers | NurseNest"
        description="Master your nursing interview with 100+ behavioral and clinical questions, STAR-format sample answers, and nurse manager tips. Free sample questions available."
        keywords="nurse interview questions, new grad nurse interview, nursing behavioral interview, STAR format nursing, nurse interview prep, nursing job interview tips"
        canonicalPath="/newgrad/interview"
        breadcrumbs={[
          { name: "Home", url: "https://www.nursenest.ca" },
          { name: "New Grad Career Hub", url: "https://www.nursenest.ca/newgrad" },
          { name: "Interview Prep", url: "https://www.nursenest.ca/newgrad/interview" },
        ]}
      />

      <section className="relative py-16 sm:py-20 overflow-hidden" data-testid="section-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-indigo-50/30 to-white" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <Link href="/newgrad" className="hover:text-blue-600">New Grad Career Hub</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-purple-700 font-medium">Interview Prep</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-4 bg-purple-100 text-purple-700">
            <MessageSquare className="w-4 h-4" /> Interview Preparation
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" data-testid="text-title">
            Nursing Interview Question Bank
          </h1>
          <p className="text-lg text-gray-600">
            Practice with 100+ behavioral and clinical interview questions. Each question includes a detailed STAR-format sample answer and expert tips from nurse managers.
          </p>
        </div>
      </section>

      <section className="py-8 bg-white border-b border-gray-100" data-testid="section-categories">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {INTERVIEW_CATEGORIES.map((cat, i) => (
              <span key={i} className="px-3 py-1.5 text-sm rounded-full bg-purple-50 text-purple-700 font-medium" data-testid={`badge-category-${i}`}>
                {cat}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" data-testid="section-free-questions">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle2 className="w-5 h-5 text-green-500" />
            <h2 className="text-2xl font-bold text-gray-900">Free Sample Questions</h2>
          </div>
          <div className="space-y-4">
            {(freeQuestions.length > 0 ? freeQuestions : FREE_SAMPLE_QUESTIONS).map((q: any, i: number) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 overflow-hidden" data-testid={`question-free-${i}`}>
                <button
                  onClick={() => setExpandedQ(expandedQ === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                  data-testid={`button-question-${i}`}
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 font-medium mr-2">{q.category}</span>
                    <span className="font-medium text-gray-900">{q.question}</span>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 ml-2 transition-transform ${expandedQ === i ? 'rotate-180' : ''}`} />
                </button>
                {expandedQ === i && (
                  <div className="px-6 pb-5 border-t border-gray-100 pt-4">
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" /> Sample Answer
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{q.answer || q.sample_answer}</p>
                    </div>
                    {(q.tips) && (
                      <div className="bg-blue-50 rounded-lg p-3">
                        <h4 className="text-sm font-semibold text-blue-800 mb-1 flex items-center gap-1">
                          <Lightbulb className="w-4 h-4" /> Expert Tip
                        </h4>
                        <p className="text-sm text-blue-700">{q.tips}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {premiumQuestions.length > 0 && hasAccess && (
        <section className="py-16 bg-gray-50" data-testid="section-premium-questions">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Full Question Bank</h2>
            <div className="space-y-3">
              {premiumQuestions.map((q: any, i: number) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-5" data-testid={`question-premium-${i}`}>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-purple-50 text-purple-600 font-medium mr-2">{q.category}</span>
                  <span className="font-medium text-gray-900">{q.question}</span>
                  <p className="text-sm text-gray-600 mt-2">{q.answer || q.sample_answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {!hasAccess && (
        <section className="py-16 bg-gray-50" data-testid="section-premium-preview">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 mb-6">
              <Lock className="w-5 h-5 text-indigo-500" />
              <h2 className="text-2xl font-bold text-gray-900">Premium Question Bank Preview</h2>
            </div>
            <div className="space-y-3 mb-6">
              {[
                "Walk me through your most challenging patient care experience",
                "How do you prioritize when you have multiple patients with competing needs?",
                "Describe a time you received constructive criticism. How did you respond?",
                "How would you handle a medication error?",
                "Tell me about a time you worked with a difficult team member",
              ].map((q, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 flex items-center gap-3 opacity-75" data-testid={`preview-question-${i}`}>
                  <Lock className="w-4 h-4 text-gray-400 shrink-0" />
                  <span className="text-gray-600">{q}</span>
                </div>
              ))}
            </div>
            <PremiumUpgradeCTA requiredEntitlement="toolkit" context="Unlock 100+ interview questions with detailed STAR-format answers, nurse manager insights, and category-specific tips. Practice with confidence." />
          </div>
        </section>
      )}

      <section className="py-12 bg-gradient-to-r from-purple-50 to-indigo-50" data-testid="section-bottom-cta">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-3">More Career Resources</h2>
          <p className="text-sm text-gray-500 mb-4">
            Looking for healthcare career-entry support? <a href="https://applynest.ca" target="_blank" rel="noopener noreferrer" className="text-indigo-700 font-semibold hover:underline" data-testid="link-applynest-interview">ApplyNest offers admissions guidance and scholarship search tools</a>.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/newgrad/resume" className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-indigo-700 rounded-xl font-semibold hover:bg-indigo-50 transition-colors border border-indigo-200" data-testid="link-resume">
              Resume Tools
            </Link>
            <Link href="/newgrad" className="inline-flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors" data-testid="link-hub">
              Career Hub <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
