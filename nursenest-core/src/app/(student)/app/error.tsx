"use client";

export default function LearnerError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="nn-card p-6">
      <h2 className="text-xl font-semibold">Unable to load this section</h2>
      <p className="mt-2 text-sm text-muted">Your account and access remain intact. Try again.</p>
      <p className="mt-2 text-xs text-muted">{error.message}</p>
      <button className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-semibold" onClick={reset}>
        Retry
      </button>
    </div>
  );
}
