# NurseNest Mobile Endpoint Matrix

> **Version:** 1.0  
> **Generated:** 2026-03-18  
> **Purpose:** Quick-lookup table of mobile-safe endpoints with auth, tier, safety, and retry semantics

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Safe for mobile — use as-is |
| ⚠️ | Usable but has caveats (see Notes) |
| 🔒 | Requires authentication |
| 💎 | Requires paid tier or specific entitlement |
| 🌐 | Public / no auth required |
| ❌ | Not recommended for mobile |

**Retry Column Key:**
- **Safe** = GET or idempotent; retry freely
- **Idempotent** = POST returns conflict on duplicate; safe to retry
- **Unsafe** = POST/PUT may duplicate data; debounce required
- **Resumable** = Has dedicated save/resume mechanism

---

## Authentication

| Method | Path | Auth | Tier | Mobile Safety | Retry | Notes |
|--------|------|------|------|---------------|-------|-------|
| `POST` | `/api/auth/register` | 🌐 | — | ✅ | Unsafe | Rate: 3/15min. Response is safe (no sensitive fields). |
| `POST` | `/api/auth/login` | 🌐 | — | ✅ | Safe | Rate: 5/60s. Store `userToken` securely. Expires in 7 days. Ignore `accessToken`/`csrfToken`/`adminRole` fields. |

---

## User Profile

| Method | Path | Auth | Tier | Mobile Safety | Retry | Notes |
|--------|------|------|------|---------------|-------|-------|
| `GET` | `/api/user/:userId` | 🌐 | — | ✅ | Safe | Server strips sensitive fields. Safe response shape. |
| `POST` | `/api/user/:userId/theme` | 🔒 | — | ✅ | Safe | Idempotent (last write wins). |

---

## Entitlements

| Method | Path | Auth | Tier | Mobile Safety | Retry | Notes |
|--------|------|------|------|---------------|-------|-------|
| `GET` | `/api/entitlements/resolve` | 🔒 | — | ✅ | Safe | Use to determine feature access before navigating to gated screens. |
| `GET` | `/api/user-entitlement` | 🌐 | — | ✅ | Safe | Card creation entitlement check. |

---

## Question Bank (QBank)

| Method | Path | Auth | Tier | Mobile Safety | Retry | Notes |
|--------|------|------|------|---------------|-------|-------|
| `GET` | `/api/qbank` | 🔒💎 | Paid | ✅ | Safe | Max 50/page. Returns `{ questions, total, limit, offset, tier }` object. Region-filtered automatically. |
| `GET` | `/api/qbank/exam-set` | 🔒💎 | Paid | ⚠️ | Safe | Random selection, no cursor. Max 200. Not idempotent — each call yields different questions. |
| `POST` | `/api/qbank/attempt` | 🔒💎 | Paid | ✅ | Unsafe | Body: `{ questionId, selectedOption }`. Returns `{ correct, correctAnswer, rationale, ... }`. |
| `GET` | `/api/qbank/stats` | 🔒 | — | ✅ | Safe | |
| `GET` | `/api/qbank/body-systems` | 🔒 | — | ✅ | Safe | |
| `GET` | `/api/qbank/filter-options` | 🔒 | — | ✅ | Safe | Cache this — changes infrequently. |
| `GET` | `/api/qbank/filters` | 🔒 | — | ✅ | Safe | Alternative filter endpoint. |

---

## Lessons

| Method | Path | Auth | Tier | Mobile Safety | Retry | Notes |
|--------|------|------|------|---------------|-------|-------|
| `GET` | `/api/lessons/meta` | 🌐 | — | ⚠️ | Safe | **No pagination.** Returns all lessons (100–400 items). Cache aggressively on mobile. |
| `GET` | `/api/lessons/content/:slug` | 🌐 | — | ⚠️ | Safe | Free users limited to 5 lesson previews. Tier gating applied server-side. Content payload can be large. |
| `GET` | `/api/lessons/search` | 🌐 | — | ✅ | Safe | Rate limited. Debounce client-side. |
| `GET` | `/api/lessons/count` | 🌐 | — | ✅ | Safe | |

---

## Flashcard Decks & Cards

| Method | Path | Auth | Tier | Mobile Safety | Retry | Notes |
|--------|------|------|------|---------------|-------|-------|
| `GET` | `/api/decks` | 🌐 | — | ⚠️ | Safe | Hard limit of 100 results. No offset pagination. |
| `GET` | `/api/decks/:id` | 🌐 | — | ✅ | Safe | Pass `userId` query param for private deck access. |
| `GET` | `/api/decks/by-slug/:slug` | 🌐 | — | ✅ | Safe | Pass `userId` query param for private deck access. |
| `POST` | `/api/decks` | 🌐 | — | ⚠️ | Unsafe | `userId` in body. No idempotency — duplicate POST creates duplicate deck. |
| `PUT` | `/api/decks/:id` | 🌐 | — | ✅ | Safe | Last-write-wins. Ownership verified via `userId` in body. |
| `DELETE` | `/api/decks/:id` | 🌐 | — | ✅ | Safe | Ownership verified via `userId` query param. |
| `GET` | `/api/decks/:id/cards` | 🌐 | — | ⚠️ | Safe | **Free users see only 5 cards** (silent truncation). Pass `userId` to unlock for owners/premium. Compare `cardCount` from deck to detect truncation. |
| `POST` | `/api/decks/:id/cards` | 🌐 | — | ⚠️ | Unsafe | Free global card limit enforced. Premium users have higher/no limits. No idempotency. |
| `PUT` | `/api/decks/:deckId/cards/:cardId` | 🌐 | — | ✅ | Safe | Last-write-wins. |
| `DELETE` | `/api/decks/:deckId/cards/:cardId` | 🌐 | — | ✅ | Safe | |
| `POST` | `/api/decks/:id/cards/bulk-import` | 🌐 | — | ⚠️ | Unsafe | Subject to card limits. Only batch endpoint. |
| `POST` | `/api/decks/:id/save` | 🌐 | — | ✅ | Idempotent | |
| `DELETE` | `/api/decks/:id/save` | 🌐 | — | ✅ | Safe | |
| `POST` | `/api/decks/:id/duplicate` | 🌐 | — | ⚠️ | Unsafe | Creates new deck on each call. |
| `GET` | `/api/decks/:id/stats` | 🌐 | — | ✅ | Safe | Requires `userId` query param. |

---

## Study Sessions

| Method | Path | Auth | Tier | Mobile Safety | Retry | Notes |
|--------|------|------|------|---------------|-------|-------|
| `POST` | `/api/study-sessions` | 🔒💎 | `study_sessions` | ✅ | Unsafe | Duplicate POST creates duplicate session. |
| `PUT` | `/api/study-sessions/:id` | 🔒💎 | `study_sessions` | ✅ | Safe | Resumable — updates existing session. |
| `GET` | `/api/study-sessions` | 🔒💎 | `study_sessions` | ⚠️ | Safe | Hard limit 20 results. No offset pagination. |

---

## Mock Exams

| Method | Path | Auth | Tier | Mobile Safety | Retry | Notes |
|--------|------|------|------|---------------|-------|-------|
| `GET` | `/api/mock-exam-definitions` | 🔒💎 | `mock_exams` | ✅ | Safe | |
| `GET` | `/api/mock-exam-definitions/:id` | 🔒💎 | `mock_exams` | ✅ | Safe | |
| `POST` | `/api/mock-exams/start` | 🔒💎 | `mock_exams` | ⚠️ | Unsafe | **Client must pre-fetch questions and send in body.** Server only stores question IDs. Mobile must retain full question data locally. Prefer `/start-specialty`. |
| `POST` | `/api/mock-exams/start-specialty` | 🔒💎 | `mock_exams` | ✅ | Unsafe | Server fetches questions from definition. **Preferred for mobile.** |
| `PUT` | `/api/mock-exams/:attemptId/progress` | 🔒💎 | Paid | ✅ | Resumable | Last-write-wins. Auto-saves exam state. |
| `POST` | `/api/mock-exams/:attemptId/complete` | 🔒💎 | Paid | ✅ | Unsafe | Finalizes exam. Do not call twice. |
| `GET` | `/api/mock-exams/history/:userId` | 🔒💎 | Paid | ✅ | Safe | |
| `GET` | `/api/mock-exams/:attemptId` | 🔒💎 | Paid | ✅ | Safe | |

---

## Question of the Day (QOTD)

| Method | Path | Auth | Tier | Mobile Safety | Retry | Notes |
|--------|------|------|------|---------------|-------|-------|
| `GET` | `/api/qotd/today` | 🌐 | — | ✅ | Safe | Public. Great for pre-login engagement. |
| `POST` | `/api/qotd/answer` | 🔒 | — | ✅ | Idempotent | Returns 409 if already answered today. Safe to retry. |
| `GET` | `/api/qotd/streak` | 🔒 | — | ✅ | Safe | |
| `GET` | `/api/qotd/history` | 🔒 | — | ✅ | Safe | Supports `limit` param (default 30). |
| `GET` | `/api/qotd/my-answer` | 🌐 | — | ✅ | Safe | Returns `{ answer: null }` if not authenticated. |
| `GET` | `/api/qotd/archive` | 🌐 | — | ✅ | Safe | Public. Supports `limit` param. |

---

## Bookmarks

| Method | Path | Auth | Tier | Mobile Safety | Retry | Notes |
|--------|------|------|------|---------------|-------|-------|
| `POST` | `/api/bookmarks/:questionId` | 🔒💎 | Paid | ✅ | Idempotent | Returns existing bookmark if already saved. |
| `DELETE` | `/api/bookmarks/:questionId` | 🔒💎 | Paid | ✅ | Safe | |
| `GET` | `/api/bookmarks` | 🔒💎 | Paid | ⚠️ | Safe | **No pagination. N+1 query pattern.** Can be slow with many bookmarks. Cache results. |

---

## Readiness & Performance

| Method | Path | Auth | Tier | Mobile Safety | Retry | Notes |
|--------|------|------|------|---------------|-------|-------|
| `GET` | `/api/readiness/:userId` | 🔒 | — | ✅ | Safe | Free users get basic score. Premium users get full analysis. |
| `GET` | `/api/readiness/:userId/history` | 🔒 | — | ✅ | Safe | Max 104 entries. |
| `GET` | `/api/readiness/:userId/benchmarks` | 🔒💎 | `pass_probability_model` | ✅ | Safe | |
| `GET` | `/api/mastery-progress/:userId` | 🌐 | — | ✅ | Safe | |

---

## Adaptive Engine

| Method | Path | Auth | Tier | Mobile Safety | Retry | Notes |
|--------|------|------|------|---------------|-------|-------|
| `POST` | `/api/adaptive/record-response` | 🔒💎 | `adaptive_engine` | ✅ | Unsafe | |
| `GET` | `/api/adaptive/mastery/:userId` | 🔒💎 | `adaptive_engine` | ✅ | Safe | |
| `GET` | `/api/adaptive/weak-areas/:userId` | 🔒💎 | `adaptive_engine` | ✅ | Safe | |
| `GET` | `/api/adaptive/next-cards/:userId` | 🔒💎 | `adaptive_engine` | ✅ | Safe | |
| `GET` | `/api/adaptive/dashboard/:userId` | 🔒💎 | `adaptive_engine` | ✅ | Safe | |
| `GET` | `/api/adaptive/session-types` | 🔒💎 | Paid | ✅ | Safe | Any paid tier (no specific entitlement). |
| `POST` | `/api/adaptive/session/start` | 🔒💎 | `adaptive_engine` | ✅ | Unsafe | |
| `POST` | `/api/adaptive/session/complete` | 🔒💎 | `adaptive_engine` | ✅ | Unsafe | |
| `POST` | `/api/adaptive/flag-card` | 🔒💎 | `adaptive_engine` | ✅ | Unsafe | |
| `POST` | `/api/adaptive/mark-mastered` | 🔒💎 | `adaptive_engine` | ✅ | Unsafe | |
| `POST` | `/api/adaptive/study-again-soon` | 🔒💎 | `adaptive_engine` | ✅ | Unsafe | |
| `GET` | `/api/adaptive/card-stats/:cardId` | 🔒💎 | `adaptive_engine` | ✅ | Safe | |

---

## Trial Subscription

| Method | Path | Auth | Tier | Mobile Safety | Retry | Notes |
|--------|------|------|------|---------------|-------|-------|
| `POST` | `/api/trial-sub/activate` | 🔒 | — | ⚠️ | Unsafe | Requires email verification. Returns Stripe `clientSecret`. Rate: 3/15min. |
| `POST` | `/api/trial-sub/confirm` | 🔒 | — | ✅ | Unsafe | |
| `GET` | `/api/trial-sub/status` | 🔒 | — | ✅ | Safe | |
| `POST` | `/api/trial-sub/cancel` | 🔒 | — | ✅ | Unsafe | |
| `GET` | `/api/trial-sub/consumption` | 🔒 | — | ✅ | Safe | |

---

## User Flashcards (Personal)

| Method | Path | Auth | Tier | Mobile Safety | Retry | Notes |
|--------|------|------|------|---------------|-------|-------|
| `GET` | `/api/user-flashcards/:userId` | 🌐 | — | ✅ | Safe | |
| `POST` | `/api/user-flashcards` | 🌐 | — | ✅ | Unsafe | |
| `PUT` | `/api/user-flashcards/:id` | 🌐 | — | ✅ | Safe | |
| `DELETE` | `/api/user-flashcards/:id` | 🌐 | — | ✅ | Safe | |
| `POST` | `/api/user-flashcards/validate` | 🌐 | — | ✅ | Safe | Read-only validation. |
| `POST` | `/api/user-flashcards/ai-generate` | 🔒💎 | Paid | ✅ | Unsafe | |
| `POST` | `/api/user-flashcards/ai-generate-from-notes` | 🔒💎 | Paid | ✅ | Unsafe | |

---

## Flashcard Bank & Review

| Method | Path | Auth | Tier | Mobile Safety | Retry | Notes |
|--------|------|------|------|---------------|-------|-------|
| `GET` | `/api/flashcard-bank` | 🔒💎 | `flashcard_bank` | ✅ | Safe | |
| `GET` | `/api/flashcard-bank/counts` | 🔒💎 | Paid | ✅ | Safe | |
| `POST` | `/api/flashcard-review` | 🔒💎 | `flashcard_review` | ✅ | Unsafe | |
| `GET` | `/api/flashcard-review-due/:userId` | 🔒💎 | `flashcard_review` | ✅ | Safe | |

---

## Nursing Question Topics (SEO Content)

| Method | Path | Auth | Tier | Mobile Safety | Retry | Notes |
|--------|------|------|------|---------------|-------|-------|
| `GET` | `/api/nursing/question-topics/:tier` | 🌐 | — | ✅ | Safe | Public. Returns topics, body systems, counts by tier. Rate limited. |
| `GET` | `/api/nursing/question-topics/:tier/:topicSlug` | 🌐 | — | ✅ | Safe | Public. Returns sample questions (up to 10) for a topic. |

---

## Practice Sessions

| Method | Path | Auth | Tier | Mobile Safety | Retry | Notes |
|--------|------|------|------|---------------|-------|-------|
| `POST` | `/api/practice-sessions` | 🔒💎 | Paid | ✅ | Unsafe | Custom practice session with topic/difficulty filters. |

---

## Summary Statistics

| Category | Total Endpoints | ✅ Safe | ⚠️ Caution | ❌ Avoid |
|----------|----------------|---------|------------|---------|
| Auth | 2 | 2 | 0 | 0 |
| User | 2 | 2 | 0 | 0 |
| Entitlements | 2 | 2 | 0 | 0 |
| QBank | 7 | 6 | 1 | 0 |
| Lessons | 4 | 2 | 2 | 0 |
| Decks/Cards | 14 | 8 | 6 | 0 |
| Study Sessions | 3 | 2 | 1 | 0 |
| Mock Exams | 8 | 7 | 1 | 0 |
| QOTD | 6 | 6 | 0 | 0 |
| Bookmarks | 3 | 2 | 1 | 0 |
| Readiness | 4 | 4 | 0 | 0 |
| Adaptive | 12 | 12 | 0 | 0 |
| Trial | 5 | 4 | 1 | 0 |
| User Flashcards | 7 | 7 | 0 | 0 |
| Flashcard Bank | 4 | 4 | 0 | 0 |
| Nursing Topics | 2 | 2 | 0 | 0 |
| Practice | 1 | 1 | 0 | 0 |
| **Total** | **86** | **73** | **13** | **0** |
