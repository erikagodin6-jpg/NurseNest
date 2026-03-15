import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import {
  ArrowRight,
  BookOpen,
  Users,
  Trophy,
} from "lucide-react";

export default function HomeChoosePath() {
  const [, setLocation] = useLocation();

  return (
    <section className="border-t border-gray-100" style={{ paddingTop: 'var(--space-block)', paddingBottom: 'var(--space-block)' }} data-testid="section-choose-your-path">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">Choose Your Path</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">Find the resources tailored to your journey in healthcare.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className="bg-white rounded-2xl border border-gray-150 p-6 sm:p-8 shadow-[var(--shadow-card)] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col"
            data-testid="card-nursing-students"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Nursing Students</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6 flex-1">Prepare for REx-PN, NCLEX-RN, and NP certification exams with practice questions, flashcards, and clinical lessons.</p>
            <Button
              onClick={() => setLocation("/exam-prep")}
              className="w-full"
              data-testid="button-start-nursing-prep"
            >
              Start Nursing Exam Prep
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div
            className="bg-white rounded-2xl border border-gray-150 p-6 sm:p-8 shadow-[var(--shadow-card)] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col"
            data-testid="card-allied-health"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                <Users className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Allied Health Students</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6 flex-1">Study for respiratory therapy, paramedic, pharmacy technician, medical lab, and diagnostic imaging certifications.</p>
            <Button
              onClick={() => setLocation("/allied-health")}
              className="w-full"
              data-testid="button-explore-allied-health"
            >
              Explore Allied Health Prep
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>

          <div
            className="bg-white rounded-2xl border border-gray-150 p-6 sm:p-8 shadow-[var(--shadow-card)] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 flex flex-col"
            data-testid="card-new-grad-nurses"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">New Graduate Nurses</h3>
            </div>
            <p className="text-sm text-gray-600 mb-6 flex-1">Get clinical survival guides, certification pathways, and career development tools for your first year in practice.</p>
            <Button
              onClick={() => setLocation("/new-grad")}
              className="w-full"
              data-testid="button-enter-new-grad-hub"
            >
              Enter the New Grad Hub
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6" data-testid="metrics-credibility-bar">
          <div className="text-center p-4" data-testid="metric-practice-questions">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">40,000+</p>
            <p className="text-sm text-gray-500 mt-1">Practice Questions</p>
          </div>
          <div className="text-center p-4" data-testid="metric-flashcards">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">13,000+</p>
            <p className="text-sm text-gray-500 mt-1">Flashcards</p>
          </div>
          <div className="text-center p-4" data-testid="metric-clinical-lessons">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">8,000+</p>
            <p className="text-sm text-gray-500 mt-1">Clinical Lessons</p>
          </div>
          <div className="text-center p-4" data-testid="metric-languages">
            <p className="text-2xl sm:text-3xl font-bold text-gray-900">15</p>
            <p className="text-sm text-gray-500 mt-1">Languages Supported</p>
          </div>
        </div>
      </div>
    </section>
  );
}
