/**
 * Subtle 12-lead–inspired rhythm strip for ECG hub cards (semantic tokens only).
 * Grid + trace stay readable on Midnight via `--theme-body-text` contrast.
 */
export function EcgWaveformPreview({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-[var(--theme-card-border)] bg-[var(--theme-page-bg)] ${className}`}
      aria-hidden
    >
      <svg viewBox="0 0 320 72" className="h-16 w-full text-[var(--theme-body-text)]/25" preserveAspectRatio="none">
        <defs>
          <pattern id="ecg-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.35" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ecg-grid)" />
        <polyline
          fill="none"
          stroke="var(--theme-primary)"
          strokeWidth="1.4"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity="0.92"
          points="0,40 12,40 18,28 24,52 34,36 44,44 54,30 64,46 74,38 84,42 94,26 104,50 114,36 124,40 134,34 144,44 154,32 164,48 174,38 184,42 194,30 204,46 214,38 224,40 234,36 244,44 254,34 264,42 274,38 284,40 294,36 304,44 320,40"
        />
      </svg>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[var(--theme-card-bg)] to-transparent" />
    </div>
  );
}
