/** Lightweight loading UI for lazy tool chunks (no extra deps). */
export function ToolSkeleton() {
  return (
    <div className="animate-pulse space-y-4 rounded-xl border border-[var(--theme-nav-border)] bg-[var(--theme-card-bg)] p-6">
      <div className="h-4 w-1/3 rounded bg-[var(--theme-muted-text)]/20" />
      <div className="h-10 w-full rounded bg-[var(--theme-muted-text)]/15" />
      <div className="h-10 w-full rounded bg-[var(--theme-muted-text)]/15" />
      <div className="h-12 w-40 rounded bg-[var(--theme-muted-text)]/20" />
    </div>
  );
}
