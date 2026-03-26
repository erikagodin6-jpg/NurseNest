# NurseNest Core Guardrails

- No service workers.
- No custom bundle caching.
- No compile-time content generation.
- No file over 500 lines.
- No route-level cross-import contamination:
  - Marketing does not import learner/admin modules.
  - Admin does not load into public routes.
- Server-side entitlement checks only.
- API pagination and bounded queries for memory safety.
- Degraded-safe DB health behavior at `/api/health`.
