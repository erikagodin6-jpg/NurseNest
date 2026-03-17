# TDZ & Circular Import Crash — Root Cause Report

## Error
`ReferenceError: Cannot access 'Jh' before initialization` — intermittent production crash (blank screen).

## Root Cause

### Primary: Circular import in `medications.ts` ↔ `medications-batch-*.ts`

The medication batch files (`medications-batch-a.ts` through `medications-batch-d.ts`) used `import { Medication }` (a non-type import) from `medications.ts`, while `medications.ts` imported the batch arrays from those same files to compose the full `medications` array. Additionally, the import statements in `medications.ts` were placed at line 295 (after 290 lines of data declarations), not at the top of the file.

This created 4 circular module dependency chains:
```
medications.ts  →  medications-batch-a.ts
      ↑                    ↓
      └────────────────────┘  (and likewise for batch b, c, d)
```

In Vite's production build (Rollup), when modules form a cycle, one module's bindings may still be in the Temporal Dead Zone (uninitialized `const`) when the other tries to access them during top-level evaluation. The `medications` array is a top-level computed `const` that depends on all four batch imports, and `moaCategories`/`medBodySystems` are further top-level computed values derived from it. The minified symbol `Jh` corresponds to one of these values.

### Secondary: Circular import in `case-study-series-renderer.tsx` ↔ `ngn-question-dispatcher.tsx`

These two components mutually imported each other eagerly — the dispatcher renders the case study renderer, and the case study renderer embeds the dispatcher for sub-questions. Both used synchronous `import` statements, creating identical TDZ risk.

### Tertiary: Static analysis cycle in `i18n.tsx` ↔ `i18n-translations.ts`

While `i18n-translations.ts` used `import type` (erased at compile time), the static cycle was a maintenance hazard — one accidental change from `import type` to `import` would create a runtime TDZ.

## Fixes Applied

1. **Fixed medications circular imports** — Changed all batch files from `import { Medication }` to `import type { Medication }` (erased at compile time, breaking the runtime cycle). Moved the batch import statements in `medications.ts` to the top of the file per ES module best practice.

2. **Extracted `LanguageCode` type** to `client/src/lib/i18n-types.ts` — Both `i18n.tsx` and `i18n-translations.ts` now import from this dependency-free module, eliminating even the static analysis cycle.

3. **Extracted `createDefaultResponse`** to `client/src/components/ngn-renderers/ngn-default-response.ts` — Both `case-study-series-renderer.tsx` and `ngn-question-dispatcher.tsx` import this function from the new file. Both components now use `React.lazy()` + dynamic `import()` for their mutual reference, breaking the synchronous initialization cycle.

4. **Improved ErrorBoundary** in `App.tsx`:
   - Logs route, component name, and React component stack on crash
   - Detects TDZ-specific error messages and flags them in console output
   - Shows diagnostic context panel (route, component stack) in development mode only
   - Production UX is clean: generic error message + reload button (no stack traces exposed)

5. **Enabled source maps** in `vite.config.ts` (`sourcemap: true`) to enable future production crash debugging with meaningful symbol names.

## Files Changed
- `client/src/lib/i18n-types.ts` (new — dependency-free LanguageCode type)
- `client/src/lib/i18n.tsx` (re-exports LanguageCode from i18n-types)
- `client/src/lib/i18n-translations.ts` (imports from i18n-types instead of i18n)
- `client/src/data/medications.ts` (moved imports to top, cycle broken)
- `client/src/data/medications-batch-a.ts` (changed to import type)
- `client/src/data/medications-batch-b.ts` (changed to import type)
- `client/src/data/medications-batch-c.ts` (changed to import type)
- `client/src/data/medications-batch-d.ts` (changed to import type)
- `client/src/components/ngn-renderers/ngn-default-response.ts` (new — extracted createDefaultResponse)
- `client/src/components/ngn-renderers/ngn-question-dispatcher.tsx` (lazy import for case study renderer)
- `client/src/components/ngn-renderers/case-study-series-renderer.tsx` (lazy import for dispatcher)
- `client/src/components/ngn-renderers/index.ts` (updated barrel exports)
- `client/src/App.tsx` (improved ErrorBoundary with dev diagnostics, clean prod UX)
- `vite.config.ts` (enabled sourcemaps)

## Remaining Notes
- The ngn-renderers still appear as a "circular dependency" in static analysis tools (madge) because both files reference each other via dynamic `import()`. At runtime, lazy loading prevents any TDZ.
- The medications circular deps still appear in madge because it doesn't distinguish `import type` from `import`. At runtime, TypeScript/esbuild erases type-only imports.
- Zero circular dependencies in lib/, config/, shared/, allied/, hooks/ directories.
- Recommendation: Add `eslint-plugin-import` with `no-cycle` rule to catch future circular imports at lint time.
