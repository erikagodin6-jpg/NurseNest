import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, BookOpen, Layers, Download, FileText } from "lucide-react";

export function SafeExamFallback({ questions, onBack }: { questions?: any[]; onBack?: () => void }) {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-8" data-testid="safe-mode-exam">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-amber-800">Safe Mode — Simplified View</p>
            <p className="text-sm text-amber-700">
              The interactive exam player encountered an issue. Here are your questions in a simplified format.
            </p>
          </div>
        </div>

        {onBack && (
          <Button variant="outline" onClick={onBack} className="gap-2" data-testid="button-safe-exam-back">
            <ArrowLeft className="w-4 h-4" /> Back to Exams
          </Button>
        )}

        {questions && questions.length > 0 ? (
          questions.map((q, i) => (
            <Card key={q.id || i} className="border-slate-200">
              <CardContent className="p-6 space-y-3">
                <p className="font-semibold text-slate-800">
                  <span className="text-primary mr-2">Q{i + 1}.</span>
                  {q.question || q.stem || q.text || "Question unavailable"}
                </p>
                {Array.isArray(q.options) && (
                  <ul className="space-y-2 ml-4">
                    {q.options.map((opt: string, j: number) => (
                      <li key={j} className="text-sm text-slate-600">
                        <span className="font-medium mr-2">{String.fromCharCode(65 + j)}.</span>
                        {typeof opt === "string" ? opt : JSON.stringify(opt)}
                      </li>
                    ))}
                  </ul>
                )}
                {q.answer && (
                  <details className="mt-2">
                    <summary className="text-sm text-primary cursor-pointer font-medium">Show Answer</summary>
                    <p className="mt-2 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">{q.answer}</p>
                  </details>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center text-slate-500">
              <BookOpen className="w-10 h-10 mx-auto mb-3 text-slate-400" />
              <p>Questions could not be loaded in safe mode.</p>
              <p className="text-sm mt-1">Please try again later or contact support.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export function SafeFlashcardFallback({ cards, onBack }: { cards?: any[]; onBack?: () => void }) {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-8" data-testid="safe-mode-flashcards">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-amber-800">Safe Mode — Basic Flashcards</p>
            <p className="text-sm text-amber-700">
              The interactive flashcard viewer encountered an issue. Here are your cards in a simple format.
            </p>
          </div>
        </div>

        {onBack && (
          <Button variant="outline" onClick={onBack} className="gap-2" data-testid="button-safe-flashcards-back">
            <ArrowLeft className="w-4 h-4" /> Back to Flashcards
          </Button>
        )}

        {cards && cards.length > 0 ? (
          <div className="grid gap-4">
            {cards.map((card, i) => (
              <Card key={card.id || i} className="border-slate-200 hover:shadow-md transition-shadow">
                <CardContent className="p-5 space-y-3">
                  <p className="font-semibold text-slate-800">
                    {card.question || card.front || card.term || `Card ${i + 1}`}
                  </p>
                  <details>
                    <summary className="text-sm text-primary cursor-pointer font-medium">Flip Card</summary>
                    <div className="mt-2 text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                      {card.answer || card.back || card.definition || "Answer unavailable"}
                    </div>
                  </details>
                  {card.category && (
                    <span className="inline-block text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      {card.category}
                    </span>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center text-slate-500">
              <Layers className="w-10 h-10 mx-auto mb-3 text-slate-400" />
              <p>Flashcards could not be loaded in safe mode.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export function SafeLessonFallback({ content, onBack }: { content?: any; onBack?: () => void }) {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-8" data-testid="safe-mode-lesson">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-amber-800">Safe Mode — Static Lesson View</p>
            <p className="text-sm text-amber-700">
              The interactive lesson viewer encountered an issue. Content is shown in a simplified format.
            </p>
          </div>
        </div>

        {onBack && (
          <Button variant="outline" onClick={onBack} className="gap-2" data-testid="button-safe-lesson-back">
            <ArrowLeft className="w-4 h-4" /> Back to Lessons
          </Button>
        )}

        {content ? (
          <Card>
            <CardContent className="p-6 space-y-4">
              {content.title && <h1 className="text-2xl font-bold text-slate-800">{content.title}</h1>}
              {content.summary && <p className="text-slate-600">{content.summary}</p>}
              {Array.isArray(content.content) &&
                content.content.map((block: any, i: number) => {
                  if (block.type === "heading") {
                    return <h2 key={i} className="text-lg font-semibold text-slate-800 mt-4">{block.content}</h2>;
                  }
                  if (block.type === "paragraph") {
                    return <p key={i} className="text-slate-600 text-sm leading-relaxed">{block.content}</p>;
                  }
                  if ((block.type === "list" || block.type === "bulletList") && Array.isArray(block.items)) {
                    return (
                      <ul key={i} className="list-disc ml-5 space-y-1 text-sm text-slate-600">
                        {block.items.map((item: string, j: number) => (
                          <li key={j}>{item}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (block.type === "clinical-pearl") {
                    return (
                      <div key={i} className="bg-amber-50 border-l-4 border-amber-400 p-3 text-sm text-amber-800">
                        {block.content}
                      </div>
                    );
                  }
                  return null;
                })}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-8 text-center text-slate-500">
              <FileText className="w-10 h-10 mx-auto mb-3 text-slate-400" />
              <p>Lesson content could not be loaded in safe mode.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export function SafeDownloadFallback({ onBack }: { onBack?: () => void }) {
  return (
    <div className="min-h-screen bg-background p-4 sm:p-8" data-testid="safe-mode-downloads">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
          <div>
            <p className="font-semibold text-amber-800">Downloads Temporarily Unavailable</p>
            <p className="text-sm text-amber-700">
              We're having trouble loading the download center. Your purchased content is safe and will be available shortly.
            </p>
          </div>
        </div>

        {onBack && (
          <Button variant="outline" onClick={onBack} className="gap-2" data-testid="button-safe-downloads-back">
            <ArrowLeft className="w-4 h-4" /> Return to Dashboard
          </Button>
        )}

        <Card>
          <CardContent className="p-8 text-center text-slate-500">
            <Download className="w-10 h-10 mx-auto mb-3 text-slate-400" />
            <p className="font-medium text-slate-700">Downloads are temporarily unavailable</p>
            <p className="text-sm mt-1">Please try again in a few minutes. If the issue persists, contact support.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export function KillSwitchMessage({ feature, onBack }: { feature: string; onBack?: () => void }) {
  const featureLabels: Record<string, string> = {
    exams: "Exams",
    flashcards: "Flashcards",
    lessons: "Lessons",
    downloads: "Downloads",
    cat: "CAT Exams",
    qbank: "Question Bank",
    mockExams: "Mock Exams",
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4" data-testid="kill-switch-message">
      <Card className="max-w-md w-full border-blue-200 shadow-lg">
        <CardContent className="p-8 text-center space-y-6">
          <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
            <AlertTriangle className="w-8 h-8 text-blue-500" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-800" data-testid="text-kill-switch-title">
              {featureLabels[feature] || feature} is temporarily disabled
            </h2>
            <p className="text-slate-500 text-sm">
              This feature is temporarily disabled for maintenance. Your account and progress are not affected. Please check back shortly.
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => onBack ? onBack() : (window.location.href = "/en/dashboard")}
            className="gap-2"
            data-testid="button-kill-switch-dashboard"
          >
            <ArrowLeft className="w-4 h-4" /> Return to Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
