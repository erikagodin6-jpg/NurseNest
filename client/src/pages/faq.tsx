import { Navigation } from "@/components/navigation";
import { useLocation } from "wouter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    category: "General",
    questions: [
      {
        id: "general-1",
        question: "What is NurseNest?",
        answer:
          "A comprehensive nursing education platform for RPN/LVN, RN, and NP students with interactive lessons, flashcards, and exam preparation tools.",
      },
      {
        id: "general-2",
        question: "Who is NurseNest for?",
        answer:
          "Nursing students at all levels preparing for REX-PN, NCLEX, and NP certification exams, as well as practicing nurses seeking continuing education.",
      },
      {
        id: "general-3",
        question: "Is the content evidence-based?",
        answer:
          "Yes, all content is developed by experienced nursing educators and follows current clinical practice guidelines from organizations like the ANA, CNA, and specialty nursing bodies.",
      },
    ],
  },
  {
    category: "Subscription & Pricing",
    questions: [
      {
        id: "pricing-1",
        question: "How much does it cost?",
        answer:
          "Plans start at $29.99/month for RPN/LVN, $39.99/month for RN/NCLEX, and $49.99/month for NP Advanced.",
      },
      {
        id: "pricing-2",
        question: "Can I switch between tiers?",
        answer:
          "Yes, you can upgrade or downgrade your subscription at any time through your profile.",
      },
      {
        id: "pricing-3",
        question: "Is there a free trial?",
        answer:
          "We offer free Anatomy & Physiology content. Subscribe to unlock full clinical content.",
      },
      {
        id: "pricing-4",
        question: "What payment methods are accepted?",
        answer:
          "We accept all major credit cards through Stripe, and PayPal.",
      },
      {
        id: "pricing-5",
        question: "Can I cancel anytime?",
        answer:
          "Yes, cancel anytime with no penalty. You'll retain access until the end of your billing period.",
      },
    ],
  },
  {
    category: "Content & Features",
    questions: [
      {
        id: "content-1",
        question: "What content is included?",
        answer:
          "Pathophysiology lessons, pharmacology, clinical skills, flashcards, question banks, progress tracking, and note-taking tools.",
      },
      {
        id: "content-2",
        question:
          "Is the content different for Canadian and American students?",
        answer:
          "Yes! Toggle between US and Canadian guidelines, lab values, and scope-of-practice standards.",
      },
      {
        id: "content-3",
        question: "Can I take notes during lessons?",
        answer:
          "Yes, each lesson has a built-in note-taking panel that auto-saves. You can view and print all notes from your profile.",
      },
      {
        id: "content-4",
        question: "Are there practice exams?",
        answer:
          "Yes, each lesson includes quiz questions with detailed rationales, and we offer timed practice exams.",
      },
    ],
  },
  {
    category: "Technical",
    questions: [
      {
        id: "technical-1",
        question: "Can I use NurseNest on my phone?",
        answer:
          "Yes, NurseNest is fully responsive and works on all devices including phones, tablets, and computers.",
      },
      {
        id: "technical-2",
        question: "Can I download content?",
        answer:
          "Content is accessible online. Notes can be printed from your profile.",
      },
      {
        id: "technical-3",
        question: "Is my data secure?",
        answer:
          "Absolutely. We use industry-standard encryption and secure payment processing through Stripe.",
      },
    ],
  },
];

export default function FAQPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-warmwhite">
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
      </div>
    </div>
  );
}
