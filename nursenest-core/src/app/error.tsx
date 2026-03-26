"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="mx-auto mt-16 w-full max-w-xl px-6">
      <div className="nn-card p-8">
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="mt-3 text-sm text-muted">
          A recoverable runtime issue occurred. Core navigation and data protection remain server-controlled.
        </p>
        <p className="mt-3 text-xs text-muted">{error.message}</p>
        <button className="mt-5 rounded-xl bg-primary px-4 py-2 font-semibold" onClick={reset}>
          Try again
        </button>
      </div>
    </main>
  );
}
