import { Shield, Award, Users, Star, BookOpen, CheckCircle } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  text: string;
  rating: number;
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    name: "Priya S.",
    role: "RPN Student, Ontario",
    text: "I passed the REx-PN on my first attempt using NurseNest. The practice questions and clinical simulations were incredibly close to the real exam.",
    rating: 5,
  },
  {
    name: "James K.",
    role: "RN Student, British Columbia",
    text: "The adaptive question bank helped me identify my weak areas. After 3 months of studying with NurseNest, I passed the NCLEX-RN with confidence.",
    rating: 5,
  },
  {
    name: "Sarah M.",
    role: "NP Student, Alberta",
    text: "NurseNest's NP-level content is the most thorough I have found. The pharmacology flashcards and differential diagnosis practice were essential for my AANP exam.",
    rating: 5,
  },
  {
    name: "Emily R.",
    role: "RN Student, California",
    text: "As an international student, I needed extra support preparing for the NCLEX-RN. NurseNest's step-by-step rationales helped me understand the clinical reasoning behind each answer.",
    rating: 5,
  },
];

interface TrustSignalsProps {
  testimonials?: Testimonial[];
  showStats?: boolean;
  className?: string;
}

export function TrustSignals({ testimonials = DEFAULT_TESTIMONIALS, showStats = true, className = "" }: TrustSignalsProps) {
  return (
    <section className={`py-16 ${className}`} data-testid="trust-signals-section">
      {showStats && (
        <div className="max-w-5xl mx-auto px-4 mb-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard icon={<Users className="w-6 h-6 text-primary" />} value="12,000+" label="Active Students" testId="stat-students" />
            <StatCard icon={<BookOpen className="w-6 h-6 text-primary" />} value="8,000+" label="Practice Questions" testId="stat-questions" />
            <StatCard icon={<Award className="w-6 h-6 text-primary" />} value="94%" label="First-Attempt Pass Rate" testId="stat-pass-rate" />
            <StatCard icon={<Shield className="w-6 h-6 text-primary" />} value="100%" label="Evidence-Based Content" testId="stat-evidence" />
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-2" data-testid="text-testimonials-heading">
          Trusted by Nursing Students Across North America
        </h2>
        <p className="text-center text-gray-500 mb-10 max-w-2xl mx-auto">
          Real results from real students preparing for NCLEX-RN, REx-PN, and NP certification exams.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon, value, label, testId }: { icon: React.ReactNode; value: string; label: string; testId: string }) {
  return (
    <div className="text-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm" data-testid={testId}>
      <div className="flex justify-center mb-2">{icon}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      <div className="text-sm text-gray-500">{label}</div>
    </div>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow" data-testid={`testimonial-card-${index}`}>
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
        ))}
      </div>
      <p className="text-gray-700 leading-relaxed mb-4 italic">"{testimonial.text}"</p>
      <div className="flex items-center gap-2">
        <CheckCircle className="w-4 h-4 text-emerald-500" />
        <div>
          <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
          <p className="text-xs text-gray-500">{testimonial.role}</p>
        </div>
      </div>
    </div>
  );
}
