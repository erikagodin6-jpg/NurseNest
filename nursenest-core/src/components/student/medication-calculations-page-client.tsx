"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  type DrillKind,
  generateMedicationDrill,
  nearlyEqual,
  nextCombinedKind,
  type MedicationDrill,
} from "@/lib/learner/medication-calculations-drills";
import {
  defaultMedCalcProgress,
  loadMedCalcProgress,
  MED_CALC_PROGRESS_TODO_BACKEND,
  saveMedCalcProgress,
  type MedCalcProgressV1,
} from "@/lib/learner/medication-calculations-progress";

type TimerPreset = "off" | "300" | "600";

function parseDrillAnswer(raw: string): number | null {
  const n = parseFloat(raw.replace(",", ".").trim());
  if (!Number.isFinite(n)) return null;
  return n;
}

function formatSourceLabel(source: string | null): string | null {
  if (!source) return null;
  if (source === "exams-remediation") return "practice exams report card";
  if (source === "questions-remediation") return "question bank study rail";
  if (source === "hub") return "pathway hub premium modules";
  if (source === "dashboard") return "learner dashboard";
  return source.replace(/-/g, " ");
}

export function MedicationCalculationsPageClient() {
  const searchParams = useSearchParams();
  const source = searchParams.get("source");
  const weak = searchParams.get("weak");
  const focusParam = searchParams.get("focus");
  const examTarget = searchParams.get("examTarget");

  const initialMode: DrillKind = useMemo(() => {
    if (focusParam === "iv" || focusParam === "dosage" || focusParam === "weight" || focusParam === "combined") {
      return focusParam;
    }
    if (weak === "pharmacology-calculations" || weak === "pharm") return "combined";
    return "dosage";
  }, [focusParam, weak]);

  const [mode, setMode] = useState<DrillKind>(initialMode);
  const [timerPreset, setTimerPreset] = useState<TimerPreset>("off");
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [sessionActive, setSessionActive] = useState(false);
  const [seed, setSeed] = useState(() => Math.floor(Math.random() * 1e9));
  const [progress, setProgress] = useState<MedCalcProgressV1>(defaultMedCalcProgress);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState<"idle" | "correct" | "incorrect">("idle");
  const [showWork, setShowWork] = useState(false);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionAttempts, setSessionAttempts] = useState(0);
  const [summaryOpen, setSummaryOpen] = useState(false);

  useEffect(() => {
    const loaded = loadMedCalcProgress();
    if (loaded) setProgress(loaded);
  }, []);

  const activeKind = useMemo<Exclude<DrillKind, "combined">>(() => {
    if (mode === "combined") return nextCombinedKind(seed);
    return mode;
  }, [mode, seed]);

  const drill: MedicationDrill = useMemo(
    () => generateMedicationDrill(activeKind, seed, progress.difficultyTier),
    [activeKind, seed, progress.difficultyTier],
  );

  useEffect(() => {
    if (!sessionActive || timerPreset === "off" || secondsLeft === null) return;
    if (secondsLeft <= 0) {
      setSummaryOpen(true);
      setSessionActive(false);
      return;
    }
    const id = window.setInterval(() => {
      setSecondsLeft((s) => (s === null ? s : s - 1));
    }, 1000);
    return () => window.clearInterval(id);
  }, [sessionActive, timerPreset, secondsLeft]);

  const startTimedSession = () => {
    if (timerPreset === "off") return;
    const dur = Number(timerPreset);
    setSecondsLeft(dur);
    setSessionActive(true);
    setSummaryOpen(false);
    setSessionCorrect(0);
    setSessionAttempts(0);
    setFeedback("idle");
    setShowWork(false);
    setSeed((s) => s + 1);
  };

  const stopSession = () => {
    setSessionActive(false);
    setSecondsLeft(null);
    setSummaryOpen(true);
  };

  const bumpProgress = useCallback((correct: boolean) => {
    setProgress((prev) => {
      const streak = correct ? prev.streak + 1 : 0;
      let difficultyTier = prev.difficultyTier;
      if (streak >= 4 && difficultyTier < 2) difficultyTier = 2;
      else if (streak >= 2 && difficultyTier < 1) difficultyTier = 1;
      else if (!correct && streak === 0 && prev.totalAttempts > 2) {
        difficultyTier = (Math.max(0, prev.difficultyTier - 1) as 0 | 1 | 2);
      }
      const next: MedCalcProgressV1 = {
        version: 1,
        totalAttempts: prev.totalAttempts + 1,
        totalCorrect: prev.totalCorrect + (correct ? 1 : 0),
        streak,
        difficultyTier,
        lastUpdatedIso: new Date().toISOString(),
      };
      saveMedCalcProgress(next);
      return next;
    });
  }, []);

  const onSubmit = () => {
    const val = parseDrillAnswer(answer);
    setSessionAttempts((n) => n + 1);
    if (val === null) {
      setFeedback("incorrect");
      return;
    }
    const ok = nearlyEqual(val, drill.expected, drill.tolerance);
    setFeedback(ok ? "correct" : "incorrect");
    bumpProgress(ok);
    if (ok) setSessionCorrect((n) => n + 1);
    if (ok || feedback !== "idle") setShowWork(true);
  };

  const nextDrill = () => {
    setFeedback("idle");
    setShowWork(false);
    setAnswer("");
    setSeed((s) => s + 9973);
  };

  const remediationCopy =
    weak && (weak.includes("pharm") || weak.includes("calc"))
      ? `Suggested because ${weak.replace(/-/g, " ")} appeared in your study signals. Short, structured reps build automaticity without guessing.`
      : source === "exams-remediation" || source === "questions-remediation"
        ? "Pulled in from your adaptive study rail — tighten dose safety before the next block or mock."
        : null;

  return (
    <main className="space-y-6" data-testid="med-calc-module">
      {remediationCopy ? (
        <aside
          className="rounded-2xl border border-[var(--theme-card-border)] bg-[color-mix(in_srgb,var(--theme-primary)_10%,var(--theme-card-bg))] p-4 text-sm text-[var(--theme-body-text)]"
          data-testid="med-calc-remediation-banner"
        >
          <p className="font-semibold text-[var(--theme-heading-text)]">Adaptive remediation</p>
          <p className="mt-1 leading-relaxed">{remediationCopy}</p>
          {formatSourceLabel(source) ? (
            <p className="mt-2 text-xs text-[var(--theme-muted-text)]">Entry: {formatSourceLabel(source)}</p>
          ) : null}
          {examTarget ? (
            <p className="mt-1 text-xs text-[var(--theme-muted-text)]">Pathway context: {examTarget}</p>
          ) : null}
        </aside>
      ) : null}

      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-[var(--theme-muted-text)]">Premium learning lab</p>
        <h1 className="text-3xl font-bold tracking-tight text-[var(--theme-heading-text)]">Medication calculations</h1>
        <p className="max-w-3xl text-sm leading-relaxed text-[var(--theme-body-text)]">
          Structured dosage, IV drip, and weight-based drills with dimensional-analysis scaffolding, timed sessions, and local
          progress until analytics sync ships.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="space-y-5">
          <section
            className="rounded-2xl border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] p-4 shadow-sm sm:p-6"
            aria-label="Drill mode"
          >
            <div className="flex flex-wrap gap-2">
              {(
                [
                  ["dosage", "Dosage"],
                  ["iv", "IV drip"],
                  ["weight", "Weight-based"],
                  ["combined", "Mixed practice"],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  data-testid={`med-calc-mode-${id}`}
                  className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                    mode === id
                      ? "border-[var(--theme-primary)] bg-[color-mix(in_srgb,var(--theme-primary)_14%,var(--theme-card-bg))] text-[var(--theme-heading-text)]"
                      : "border-[var(--theme-input-border)] bg-[var(--theme-input-bg)] text-[var(--theme-body-text)] hover:border-[var(--theme-primary)]"
                  }`}
                  onClick={() => {
                    setMode(id);
                    nextDrill();
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-3 border-t border-[var(--theme-separator)] pt-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[var(--theme-muted-text)]">Timed drill</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {(
                    [
                      ["off", "Timer off"],
                      ["300", "5 min"],
                      ["600", "10 min"],
                    ] as const
                  ).map(([id, label]) => (
                    <button
                      key={id}
                      type="button"
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${
                        timerPreset === id
                          ? "border-[var(--theme-primary)] bg-[color-mix(in_srgb,var(--theme-primary)_12%,var(--theme-card-bg))]"
                          : "border-[var(--theme-input-border)] bg-[var(--theme-input-bg)]"
                      }`}
                      onClick={() => {
                        setTimerPreset(id);
                        setSessionActive(false);
                        setSecondsLeft(null);
                      }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {secondsLeft !== null && timerPreset !== "off" ? (
                  <span
                    className="rounded-full border border-[var(--theme-card-border)] bg-[var(--theme-page-bg)] px-3 py-1 font-mono text-sm font-semibold text-[var(--theme-heading-text)]"
                    data-testid="med-calc-timer"
                  >
                    {Math.floor(secondsLeft / 60)
                      .toString()
                      .padStart(2, "0")}
                    :{(secondsLeft % 60).toString().padStart(2, "0")}
                  </span>
                ) : null}
                <Button
                  type="button"
                  size="sm"
                  className="rounded-full"
                  onClick={sessionActive ? stopSession : startTimedSession}
                  disabled={timerPreset === "off"}
                >
                  {sessionActive ? "End timed session" : "Start timed session"}
                </Button>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] p-4 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--theme-muted-text)]">Active drill</p>
              <span className="rounded-full border border-[var(--theme-input-border)] bg-[var(--theme-accent)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[var(--theme-accent-foreground)]">
                {activeKind.replace("-", " ")}
              </span>
            </div>
            <p className="mt-4 text-base font-medium leading-relaxed text-[var(--theme-heading-text)]">{drill.prompt}</p>

            <div className="mt-5 rounded-xl border border-[var(--theme-separator)] bg-[var(--theme-page-bg)] p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--theme-muted-text)]">Dimensional analysis</p>
              <ol className="mt-2 space-y-2 text-sm text-[var(--theme-body-text)]">
                {drill.factors.map((f, i) => (
                  <li key={i} className="font-mono text-[13px] leading-snug">
                    {f.expression}
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-xs text-[var(--theme-muted-text)]">
                Enter your final numeric answer — the checker tolerates small rounding differences.
              </p>
            </div>

            <label className="mt-5 block space-y-2">
              <span className="text-sm font-medium text-[var(--theme-heading-text)]">Your answer ({drill.unit})</span>
              <Input
                inputMode="decimal"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="max-w-xs border-[var(--theme-input-border)] bg-[var(--theme-input-bg)] font-mono text-lg tracking-wide text-[var(--theme-heading-text)]"
                placeholder="0.0"
                data-testid="med-calc-answer-input"
              />
            </label>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button type="button" className="rounded-full" onClick={onSubmit} data-testid="med-calc-check">
                Check answer
              </Button>
              <Button type="button" variant="outline" className="rounded-full border-[var(--theme-input-border)]" onClick={nextDrill}>
                New problem
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="rounded-full text-[var(--theme-muted-text)]"
                onClick={() => setShowWork((s) => !s)}
              >
                {showWork ? "Hide" : "Show"} worked rationale
              </Button>
            </div>

            {feedback === "correct" ? (
              <p className="mt-3 text-sm font-semibold text-[color-mix(in_srgb,var(--theme-primary)_65%,#166534)]">Correct — nice work.</p>
            ) : null}
            {feedback === "incorrect" ? (
              <p className="mt-3 text-sm font-semibold text-amber-800 dark:text-amber-200">
                Not quite — review the factor train, then try a fresh number set.
              </p>
            ) : null}
            {showWork ? (
              <p className="mt-2 rounded-lg border border-[var(--theme-card-border)] bg-[var(--theme-muted-surface)] p-3 text-sm text-[var(--theme-body-text)]">
                {drill.rationale} Expected: <span className="font-mono font-semibold">{drill.expected.toFixed(3)}</span>{" "}
                {drill.unit}.
              </p>
            ) : null}
          </section>

          <section className="rounded-2xl border border-dashed border-[var(--theme-card-border)] bg-[var(--theme-accent)]/40 p-4 text-xs text-[var(--theme-muted-text)]">
            {MED_CALC_PROGRESS_TODO_BACKEND}
          </section>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] p-4 shadow-sm">
            <h2 className="text-sm font-semibold text-[var(--theme-heading-text)]">Session & progress</h2>
            <dl className="mt-3 space-y-2 text-sm text-[var(--theme-body-text)]">
              <div className="flex justify-between gap-2">
                <dt>This sitting</dt>
                <dd className="font-mono font-semibold text-[var(--theme-heading-text)]">
                  {sessionCorrect}/{sessionAttempts} correct
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt>Lifetime (local)</dt>
                <dd className="font-mono font-semibold text-[var(--theme-heading-text)]">
                  {progress.totalCorrect}/{progress.totalAttempts}
                </dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt>Streak</dt>
                <dd className="font-mono font-semibold text-[var(--theme-heading-text)]">{progress.streak}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt>Difficulty band</dt>
                <dd className="font-semibold text-[var(--theme-heading-text)]">
                  {progress.difficultyTier === 0 ? "Foundations" : progress.difficultyTier === 1 ? "Clinical pace" : "High stakes"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-2xl border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] p-4 text-sm shadow-sm">
            <h2 className="font-semibold text-[var(--theme-heading-text)]">Also available</h2>
            <p className="mt-2 text-[var(--theme-body-text)]">Need a fast free calculator for a single dose check?</p>
            <Link
              href="/tools/med-math"
              className="mt-3 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
            >
              Open marketing med-math tool →
            </Link>
          </div>
        </aside>
      </div>

      {summaryOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="med-calc-summary-title"
        >
          <div className="w-full max-w-md rounded-2xl border border-[var(--theme-card-border)] bg-[var(--theme-card-bg)] p-6 shadow-xl">
            <h2 id="med-calc-summary-title" className="text-lg font-semibold text-[var(--theme-heading-text)]">
              Timed session summary
            </h2>
            <p className="mt-2 text-sm text-[var(--theme-body-text)]">
              You logged <span className="font-mono font-semibold">{sessionCorrect}</span> correct checks out of{" "}
              <span className="font-mono font-semibold">{sessionAttempts}</span> attempts this session.
            </p>
            <div className="mt-4 flex justify-end gap-2">
              <Button type="button" variant="outline" className="rounded-full" onClick={() => setSummaryOpen(false)}>
                Close
              </Button>
              <Button type="button" className="rounded-full" onClick={nextDrill}>
                Continue drills
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
