# Entitlement System Audit Summary

## What Was Hardened

### Centralized Server-Side Entitlements (`server/entitlements.ts`)
- Created a single source-of-truth module for all server-side premium access decisions.
- Provides `requireEntitlement(feature)` middleware, `requireAnyPremium()` middleware, `checkEntitlement(user, feature)` function, and `getUserEntitlements(user)` diagnostic function.
- Incorporates admin bypass, tester bypass, and trial access in one place.
- Includes `[EntitlementWarning]` logging when routes attempt to serve premium content without authentication.

### Protective Comments
- `client/src/lib/entitlements.ts` — Header block clarifying this is the frontend source of truth and that frontend gating is UX-only, not a security boundary.
- `server/admin-auth.ts` — Header block clarifying this module handles authentication only, with a pointer to `server/entitlements.ts` for access decisions.
- `server/entitlements.ts` — Comprehensive header documenting the module's purpose, usage patterns, and warnings against inline bypasses.

### Routes Migrated to Centralized Checks
| Route | Feature Key |
|-------|------------|
| `GET /api/mock-exam-definitions` | `mock_exams` |
| `GET /api/mock-exam-definitions/:id` | `mock_exams` |
| `POST /api/mock-exams/start-specialty` | `mock_exams` |
| `POST /api/mock-exams/start` | `mock_exams` |
| `POST /api/study-sessions` | `study_sessions` |
| `PUT /api/study-sessions/:id` | `study_sessions` |
| `GET /api/study-sessions` | `study_sessions` |
| `POST /api/study-plan/generate` | `study_plan` |
| `GET /api/study-plan` | `study_plan` |
| `POST /api/study-plan/update` | `study_plan` |
| `POST /api/study-groups` | `study_groups` |
| `POST /api/study-groups/join` | `study_groups` |
| `GET /api/study-groups/user/:userId` | `study_groups` |
| `GET /api/study-groups/:id/members` | `study_groups` |
| `DELETE /api/study-groups/:groupId/members/:userId` | `study_groups` |
| `GET /api/flashcard-bank` | `flashcard_bank` |
| `POST /api/flashcard-review` | `flashcard_review` |
| `GET /api/flashcard-review-due/:userId` | `flashcard_review` |
| `POST /api/adaptive/record-response` | `adaptive_engine` |
| `GET /api/adaptive/mastery/:userId` | `adaptive_engine` |
| `GET /api/adaptive/weak-areas/:userId` | `adaptive_engine` |
| `GET /api/adaptive/next-cards/:userId` | `adaptive_engine` |
| `GET /api/adaptive/dashboard/:userId` | `adaptive_engine` |
| `POST /api/adaptive/session/start` | `adaptive_engine` |
| `POST /api/adaptive/session/complete` | `adaptive_engine` |
| `POST /api/adaptive/flag-card` | `adaptive_engine` |
| `POST /api/adaptive/mark-mastered` | `adaptive_engine` |
| `POST /api/adaptive/study-again-soon` | `adaptive_engine` |
| `GET /api/adaptive/card-stats/:cardId` | `adaptive_engine` |
| `POST /api/adaptive/next-question` | `adaptive_engine` |

### Diagnostic Endpoint
- `GET /api/admin/entitlement-debug` — Admin-only endpoint returning user role, subscription tier, subscription status, tester status, trial status, and full computed entitlements map. Supports `?userId=` query param to inspect other users.

### Test Coverage
- `server/__tests__/entitlements.test.ts` — Unit tests covering:
  - Free user denied premium features
  - Paid users allowed for their tier (rpn, rn)
  - Admin user allowed for everything
  - Tester bypass works while active
  - Tester bypass fails after expiry
  - `getUserEntitlements()` returns correct reasons

## Remaining Risk Areas

### Imaging Monetization (Separate System)
- `server/imaging-monetization-routes.ts` uses its own entitlement model (`imaging_entitlements` table, Stripe checkout, per-product scope).
- This is intentionally out of scope — imaging has a different purchase model (individual products, not tiered subscriptions).
- Future consolidation could bring imaging under the same `requireEntitlement` pattern, but the data models differ significantly.

### Frontend-Only Gating
- Several React components use `ContentGate`, `canAccessFeature`, or direct tier checks for UI gating.
- These are UX affordances only — they hide UI but do not prevent data access.
- The server now enforces all premium routes, so frontend-only gating is safe as a UX layer.

### Trial Consumption Limits
- Trial limits (max questions, flashcards, lessons, mock exams) are driven by environment variables in `server/trial-subscription.ts`.
- These limits are enforced via the trial system middleware, not through the entitlement module.
- The entitlement module grants/denies access at the feature level; trial consumption tracking is a separate concern.

### QBank Routes (`server/qbank-api.ts`)
- Already have their own inline tier checks (checking `userTier === "free"` and returning 403).
- These are consistent with the entitlement model but use their own inline logic rather than `requireEntitlement`.
- The inline checks are appropriate here because the QBank routes also do tier-specific query filtering.

### `flashcard-bank/counts` Endpoint
- `GET /api/flashcard-bank/counts` is intentionally left unprotected — it returns aggregate count metadata only, no content.

### `adaptive/session-types` Endpoint
- `GET /api/adaptive/session-types` is left unprotected — it returns static configuration data describing available session types, not premium content.
