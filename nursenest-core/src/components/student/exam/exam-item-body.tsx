"use client";

import type { QuestionType } from "@prisma/client";
import type { ExamDeliveryMode } from "@/lib/exam/exam-delivery-mode";
import { isCatDelivery } from "@/lib/exam/exam-delivery-mode";

/**
 * Backend coverage today (Prisma `QuestionType`): MCQ, SATA, NGN_CASE, ORDERING, FIB_NUMERIC.
 * Additional NCLEX-style shapes (bowtie, matrix/grid, prioritization, hotspot, trend) are not
 * yet modeled — UI falls back to a safe labeled stub so CAT never crashes.
 */
export type ExtendedQuestionShape =
  | QuestionType
  | "BOWTIE"
  | "MATRIX"
  | "PRIORITIZATION"
  | "HOTSPOT"
  | "TREND";

export type ExamItem = {
  id: string;
  stem: string;
  options: unknown;
  questionType: QuestionType;
};

function parseOptions(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map((x) => String(x));
  return [];
}

function resolveShape(qt: QuestionType): ExtendedQuestionShape {
  return qt;
}

function UnsupportedStub({
  shape,
  mode,
  children,
}: {
  shape: ExtendedQuestionShape;
  mode: ExamDeliveryMode;
  children?: React.ReactNode;
}) {
  return (
    <div
      className="rounded-lg border border-dashed border-amber-500/40 bg-amber-500/5 px-4 py-3 text-sm text-[var(--theme-body-text)]"
      data-testid="exam-item-unsupported-stub"
    >
      <p className="font-medium text-amber-900/90 dark:text-amber-100/90">
        Item type: {shape}
      </p>
      <p className="mt-1 text-xs text-[var(--theme-muted-text)]">
        {isCatDelivery(mode)
          ? "This format is not fully wired to the adaptive engine yet. Select any placeholder option to continue the exam flow."
          : "This format is not fully wired yet. Use placeholders for now."}
      </p>
      {children}
    </div>
  );
}

export function ExamItemBody({
  q,
  mode,
  rawAnswer,
  onAnswer,
  strikeLabels,
  onToggleStrike,
  highlightLabels,
  onToggleHighlight,
}: {
  q: ExamItem;
  mode: ExamDeliveryMode;
  rawAnswer: unknown;
  onAnswer: (next: unknown) => void;
  strikeLabels: Set<string>;
  onToggleStrike: (label: string) => void;
  highlightLabels: Set<string>;
  onToggleHighlight: (label: string) => void;
}) {
  const opts = parseOptions(q.options);
  const shape = resolveShape(q.questionType);

  const wrapOption = (label: string, inner: React.ReactNode) => {
    const struck = strikeLabels.has(label);
    const hi = highlightLabels.has(label);
    return (
      <div
        key={label}
        className={`rounded-xl border px-3 py-2 transition focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 ${
          hi ? "border-amber-400/80 bg-amber-100/30 dark:bg-amber-950/25" : "border-[var(--theme-card-border)]"
        } ${struck ? "opacity-50 line-through" : ""}`}
      >
        <div className="flex flex-wrap items-start gap-2">
          <div className="min-w-0 flex-1">{inner}</div>
          <div className="flex shrink-0 gap-1">
            <button
              type="button"
              className="rounded-md border border-transparent px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--theme-muted-text)] hover:border-border hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`Strike out option ${label}`}
              onClick={() => onToggleStrike(label)}
            >
              Out
            </button>
            <button
              type="button"
              className="rounded-md border border-transparent px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-[var(--theme-muted-text)] hover:border-border hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={`Highlight option ${label}`}
              onClick={() => onToggleHighlight(label)}
            >
              Hi
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (shape === "NGN_CASE") {
    return (
      <div className="space-y-4" data-testid="exam-item-ngn-case">
        <div className="rounded-lg border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] p-4 text-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-[var(--theme-muted-text)]">Case context</p>
          <p className="mt-2 text-[var(--theme-body-text)]">
            Multi-step NGN presentation: tabs, exhibits, and cascading stems will bind here when case JSON is available from
            the API. The item below is the active measure for this seat.
          </p>
        </div>
        <ExamItemBody
          q={{ ...q, questionType: "MCQ" }}
          mode={mode}
          rawAnswer={rawAnswer}
          onAnswer={onAnswer}
          strikeLabels={strikeLabels}
          onToggleStrike={onToggleStrike}
          highlightLabels={highlightLabels}
          onToggleHighlight={onToggleHighlight}
        />
      </div>
    );
  }

  if (shape === "ORDERING") {
    return (
      <div className="space-y-2" data-testid="exam-item-ordering">
        <p className="text-xs text-[var(--theme-muted-text)]">Drag ordering is not enabled in this build — tap options in priority order.</p>
        <ul className="space-y-2">
          {opts.map((label) =>
            wrapOption(
              label,
              <button
                type="button"
                className="w-full rounded-lg px-2 py-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                onClick={() => {
                  const prev = Array.isArray(rawAnswer) ? [...rawAnswer] : [];
                  const next = prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label];
                  onAnswer(next);
                }}
              >
                {label}
                {Array.isArray(rawAnswer) && rawAnswer.includes(label) ? (
                  <span className="ml-2 text-xs text-primary">#{rawAnswer.indexOf(label) + 1}</span>
                ) : null}
              </button>,
            ),
          )}
        </ul>
      </div>
    );
  }

  if (shape === "FIB_NUMERIC") {
    return (
      <div data-testid="exam-item-fib">
        <label className="block text-sm">
          <span className="text-[var(--theme-muted-text)]">Numeric response</span>
          <input
            type="text"
            inputMode="decimal"
            className="mt-2 w-full max-w-xs rounded-lg border border-[var(--theme-card-border)] bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            value={typeof rawAnswer === "string" ? rawAnswer : ""}
            onChange={(e) => onAnswer(e.target.value)}
          />
        </label>
      </div>
    );
  }

  if (shape === "SATA") {
    return (
      <ul className="space-y-2" data-testid="exam-item-sata">
        {opts.map((label) => {
          const selected = Array.isArray(rawAnswer) ? rawAnswer.includes(label) : false;
          return (
            <li key={label}>
              {wrapOption(
                label,
                <label className="flex cursor-pointer items-start gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={(e) => {
                      const prev = Array.isArray(rawAnswer) ? [...rawAnswer] : [];
                      const next = e.target.checked ? [...prev, label] : prev.filter((x) => x !== label);
                      onAnswer(next);
                    }}
                    className="mt-1 focus-visible:ring-2 focus-visible:ring-primary"
                  />
                  <span>{label}</span>
                </label>,
              )}
            </li>
          );
        })}
      </ul>
    );
  }

  if (shape === "MCQ") {
    return (
      <ul className="space-y-2" data-testid="exam-item-mcq">
        {opts.map((label) => (
          <li key={label}>
            {wrapOption(
              label,
              <button
                type="button"
                onClick={() => onAnswer(label)}
                className={`w-full rounded-lg px-2 py-2 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  rawAnswer === label ? "font-semibold text-primary" : ""
                }`}
              >
                {label}
              </button>,
            )}
          </li>
        ))}
      </ul>
    );
  }

  /* Prisma enum exhaustive — future shapes fall through */
  return (
    <UnsupportedStub shape={shape} mode={mode}>
      <ul className="mt-3 space-y-2">
        {opts.length ? (
          opts.map((label) => (
            <li key={label}>
              <button
                type="button"
                className="w-full rounded-lg border border-border px-3 py-2 text-left text-sm hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                onClick={() => onAnswer(label)}
              >
                {label}
              </button>
            </li>
          ))
        ) : (
          <li>
            <button
              type="button"
              className="rounded-lg border border-border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              onClick={() => onAnswer("ack")}
            >
              Acknowledge & continue
            </button>
          </li>
        )}
      </ul>
    </UnsupportedStub>
  );
}
