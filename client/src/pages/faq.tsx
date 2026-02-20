import { Navigation } from "@/components/navigation";
import { SEO } from "@/components/seo";
import { useLocation } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buildFaqStructuredData, buildBreadcrumbStructuredData } from "@/lib/seo-utils";

const faqData = [
  {
    category: "General",
    questions: [
      {
        id: "general-1",
        question: "What is NurseNest?",
        answer:
          "NurseNest is a clinical learning platform designed to strengthen nursing knowledge, clinical reasoning, and exam preparedness. Unlike traditional study resources that emphasize memorization, NurseNest focuses on mechanisms, physiological logic, and decision-making frameworks used in real clinical environments and licensing examinations.",
      },
      {
        id: "general-2",
        question: "Who is NurseNest for?",
        answer:
          "NurseNest is designed for nursing students, exam candidates, and practicing nurses seeking deeper conceptual understanding. Content is structured to support learners across RPN, RN, and NP levels, with emphasis on clinical thinking rather than isolated fact recall.",
      },
      {
        id: "general-3",
        question: "Is NurseNest a replacement for nursing school or clinical training?",
        answer:
          "No. NurseNest is a supplementary educational resource intended to support formal education and professional development. It does not replace accredited nursing programs, clinical placements, institutional instruction, or regulatory training requirements.",
      },
      {
        id: "general-4",
        question: "Is the content evidence-informed?",
        answer:
          "Yes. Educational material is developed using widely accepted physiological principles, established clinical frameworks, and contemporary practice standards. NurseNest is an educational platform, not a clinical authority, and learners should always follow institutional policies, regulatory standards, and employer-specific protocols.",
      },
      {
        id: "general-5",
        question: "Does NurseNest provide medical or clinical advice?",
        answer:
          "No. All content is provided for educational purposes only. NurseNest does not offer medical diagnoses, treatment recommendations, or patient-specific guidance. Clinical decisions must always be based on professional judgment, institutional policies, and licensed provider direction.",
      },
    ],
  },
  {
    category: "Subscription & Access",
    questions: [
      {
        id: "pricing-1",
        question: "How much does NurseNest cost?",
        answer:
          "Pricing varies by access tier and duration. Options include monthly, 3-month, 6-month, and yearly plans, as well as limited trial passes. Current subscription options are listed on our pricing page.",
      },
      {
        id: "pricing-2",
        question: "What does a subscription include?",
        answer:
          "Subscriptions provide access to premium learning tools, including advanced pathophysiology lessons, clinical reasoning modules, exam-style questions, flashcards, note-taking, and progress tracking depending on the selected tier.",
      },
      {
        id: "pricing-3",
        question: "Can I switch between subscription tiers?",
        answer:
          "Yes. Users may upgrade or modify their subscription based on platform availability and billing cycle rules.",
      },
      {
        id: "pricing-4",
        question: "Is there a free trial?",
        answer:
          "NurseNest offers free Anatomy & Physiology content and may offer limited-access passes at certain times. Availability and terms may change without notice.",
      },
      {
        id: "pricing-5",
        question: "Can I cancel my subscription?",
        answer:
          "Yes. Subscriptions may be cancelled at any time. Access remains active until the end of the billing period. NurseNest does not provide partial-period refunds unless required by applicable consumer protection laws.",
      },
      {
        id: "pricing-6",
        question: "Are payments refundable?",
        answer:
          "Due to the digital nature of the platform, subscription fees are generally non-refundable once access is granted. First-time subscribers are covered by a 30-day money-back guarantee. Exceptions may apply where legally required.",
      },
      {
        id: "pricing-7",
        question: "What payment methods are accepted?",
        answer:
          "Payments are processed securely through Stripe. Accepted payment methods include major credit and debit cards.",
      },
      {
        id: "pricing-8",
        question: "Do subscriptions auto-renew?",
        answer:
          "Yes. All subscriptions auto-renew at the end of each billing period. You will receive a reminder email before renewal so you can cancel if you wish. You can manage your subscription from your profile at any time.",
      },
    ],
  },
  {
    category: "Exam Preparation",
    questions: [
      {
        id: "exam-1",
        question: "Can I use NurseNest to prepare for the NCLEX or REX-PN?",
        answer:
          "Yes. NurseNest is designed to support learners preparing for nursing licensure examinations including the NCLEX-RN, NCLEX-PN, and REX-PN. Content is structured around clinical reasoning, prioritization, and safety logic — the cognitive patterns these exams test. NurseNest is an independent educational resource and is not affiliated with NCSBN or any regulatory body.",
      },
      {
        id: "exam-2",
        question: "What is the difference between NCLEX and REX-PN?",
        answer:
          "NCLEX (National Council Licensure Examination) is the licensing exam used in the United States and some Canadian jurisdictions. REX-PN (Regulatory Exam for Practical Nurses) is the entry-to-practice exam for practical nurses in Canadian provinces that have adopted it. Both exams test clinical reasoning and safe nursing practice, but differ in format and jurisdiction. NurseNest supports preparation for both.",
      },
      {
        id: "exam-3",
        question: "Does NurseNest cover Next Generation NCLEX (NGN) question styles?",
        answer:
          "NurseNest's clinical case simulations, branching decision scenarios, and clinical judgment exercises are designed to build the reasoning skills tested by modern exam formats, including the clinical judgment measurement model. Our question bank includes extended scenarios that require analysis across multiple data points, consistent with contemporary examination approaches.",
      },
      {
        id: "exam-4",
        question: "Are NurseNest questions realistic compared to actual exam questions?",
        answer:
          "NurseNest questions are independently authored by nursing educators and structured to reflect the cognitive complexity, clinical reasoning depth, and safety-focused thinking patterns tested on licensure exams. They are original educational content — not reproductions of actual exam items — and are designed to develop the same clinical judgment skills that exams assess.",
      },
      {
        id: "exam-5",
        question: "Can I use NurseNest while still in nursing school?",
        answer:
          "Absolutely. Many students use NurseNest alongside their nursing courses to deepen their understanding of pathophysiology, pharmacology, and clinical reasoning. The platform is structured from foundational concepts through advanced clinical analysis, making it useful from first semester through exam preparation.",
      },
      {
        id: "exam-6",
        question: "How is NurseNest different from a traditional question bank?",
        answer:
          "Traditional question banks focus on repetition and answer memorization. NurseNest combines detailed pathophysiology lessons, mechanism-based rationales, interactive case simulations, clinical skill labs, and performance analytics into an integrated learning system. The goal is to teach you how to think through clinical problems, not just recall answers.",
      },
    ],
  },
  {
    category: "Content & Educational Design",
    questions: [
      {
        id: "content-1",
        question: "What makes NurseNest different from other study platforms?",
        answer:
          "NurseNest emphasizes mechanistic understanding, physiological reasoning, and clinical cognition. Rather than presenting isolated facts, lessons explain why clinical findings occur, how compensatory mechanisms operate, and how exam questions test decision-making under uncertainty.",
      },
      {
        id: "content-2",
        question: "Is content tailored for Canadian and American learners?",
        answer:
          "Yes. Use the region toggle to switch between Canadian and US guidelines, lab values, terminology, and scope-of-practice standards. Core physiological principles remain consistent across regions.",
      },
      {
        id: "content-3",
        question: "Are NurseNest questions identical to NCLEX or licensing examinations?",
        answer:
          "No. NurseNest provides independently developed, original educational content intended solely for learning and exam preparation purposes. NurseNest is not affiliated with, endorsed by, sponsored by, or representative of NCLEX, NCSBN, or any regulatory or examination authority. NurseNest questions are original educational materials designed to support knowledge development and clinical reasoning. They do not reproduce, replicate, or represent actual licensing examination content and should not be interpreted as predictive of examination outcomes.",
      },
      {
        id: "content-4",
        question: "Are rationales included?",
        answer:
          "Yes. Every quiz question includes detailed rationales that explain the correct answer and why incorrect options are wrong, emphasizing clinical reasoning over memorization.",
      },
      {
        id: "content-5",
        question: "Can I take notes during lessons?",
        answer:
          "Yes. Each lesson includes a built-in note-taking panel that auto-saves your work. You can view and print all your notes from your profile.",
      },
      {
        id: "content-6",
        question: "Are there pre-tests and post-tests?",
        answer:
          "Yes. Each lesson includes a 25-question pre-test to assess baseline knowledge and a 25-question post-test to measure improvement after studying. Scores are tracked on your performance dashboard.",
      },
    ],
  },
  {
    category: "Technical & Platform",
    questions: [
      {
        id: "technical-1",
        question: "Can NurseNest be used on mobile devices?",
        answer:
          "Yes. The platform is fully responsive and works on phones, tablets, and computers with modern browsers.",
      },
      {
        id: "technical-2",
        question: "Can I download or redistribute content?",
        answer:
          "No. NurseNest content is protected intellectual property. Downloading, copying, sharing, or redistributing materials without authorization is prohibited and may result in account termination.",
      },
      {
        id: "technical-3",
        question: "Is my data secure?",
        answer:
          "Yes. NurseNest uses industry-standard security practices and secure payment processing through Stripe. Users are responsible for maintaining their own account credentials.",
      },
    ],
  },
  {
    category: "Educational & Professional Boundaries",
    questions: [
      {
        id: "boundaries-1",
        question: "Does NurseNest guarantee exam success or clinical outcomes?",
        answer:
          "No educational resource can guarantee examination results or clinical performance. NurseNest supports learning and reasoning development, but outcomes depend on many individual factors.",
      },
      {
        id: "boundaries-2",
        question: "How should NurseNest be used alongside formal education?",
        answer:
          "NurseNest is intended to complement, not replace, accredited education, clinical mentorship, institutional policy, and regulatory standards.",
      },
    ],
  },
];

export default function FAQPage() {
  const [, setLocation] = useLocation();

  const allFaqs = faqData.flatMap((s) => s.questions.map((q) => ({ question: q.question, answer: q.answer })));

  return (
    <div className="min-h-screen bg-warmwhite">
      <SEO
        title="Frequently Asked Questions - NurseNest Nursing Education"
        description="Find answers about NurseNest nursing education platform: subscriptions, content depth, NCLEX preparation, privacy, and clinical learning resources for RPN, RN, and NP students."
        keywords="NurseNest FAQ, nursing education questions, NCLEX prep FAQ, nursing student help, subscription questions"
        canonicalPath="/faq"
        structuredData={buildFaqStructuredData(allFaqs)}
        additionalStructuredData={[
          buildBreadcrumbStructuredData([
            { name: "Home", url: "https://nursenest.replit.app/" },
            { name: "FAQ", url: "https://nursenest.replit.app/faq" },
          ]),
        ]}
      />
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1
            className="text-4xl font-bold text-gray-900 mb-4"
            data-testid="text-faq-title"
          >
            Frequently Asked Questions
          </h1>
          <p
            className="text-lg text-softgray max-w-2xl mx-auto"
            data-testid="text-faq-subtitle"
          >
            Find answers to common questions about NurseNest, our content,
            subscriptions, and more.
          </p>
        </div>

        {faqData.map((section) => (
          <div
            key={section.category}
            className="mb-8"
            data-testid={`faq-section-${section.category.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-")}`}
          >
            <h2
              className="text-2xl font-semibold text-primary mb-4"
              data-testid={`text-faq-category-${section.category.toLowerCase().replace(/\s+&\s+/g, "-").replace(/\s+/g, "-")}`}
            >
              {section.category}
            </h2>
            <div className="bg-white rounded-2xl shadow-sm border border-primary/10 p-6">
              <Accordion type="single" collapsible className="w-full">
                {section.questions.map((q) => (
                  <AccordionItem
                    key={q.id}
                    value={q.id}
                    data-testid={`accordion-item-${q.id}`}
                    className="border-primary/10"
                  >
                    <AccordionTrigger
                      className="text-left font-medium text-gray-800 hover:text-primary hover:no-underline"
                      data-testid={`accordion-trigger-${q.id}`}
                    >
                      {q.question}
                    </AccordionTrigger>
                    <AccordionContent
                      className="text-softgray leading-relaxed"
                      data-testid={`accordion-content-${q.id}`}
                    >
                      {q.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        ))}

        <div className="mt-12 pt-8 border-t border-primary/10 text-center text-sm text-softgray" data-testid="faq-footer-links">
          <p>
            For more information, please review our{" "}
            <a
              href="/terms"
              onClick={(e) => { e.preventDefault(); setLocation("/terms"); }}
              className="text-primary hover:underline font-medium"
              data-testid="link-terms"
            >
              Terms of Use
            </a>
            ,{" "}
            <a
              href="/privacy"
              onClick={(e) => { e.preventDefault(); setLocation("/privacy"); }}
              className="text-primary hover:underline font-medium"
              data-testid="link-privacy"
            >
              Privacy Policy
            </a>
            , and{" "}
            <a
              href="/disclaimer"
              onClick={(e) => { e.preventDefault(); setLocation("/disclaimer"); }}
              className="text-primary hover:underline font-medium"
              data-testid="link-disclaimer"
            >
              Disclaimer
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
