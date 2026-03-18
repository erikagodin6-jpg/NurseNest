# NurseNest Mobile Integration Gap Analysis

> **Version:** 1.0  
> **Generated:** 2026-03-18  
> **Purpose:** Identify integration risks, missing capabilities, and remediation recommendations for the mobile workspace team

---

## Table of Contents

1. [Critical Risks](#1-critical-risks)
2. [High-Priority Gaps](#2-high-priority-gaps)
3. [Medium-Priority Gaps](#3-medium-priority-gaps)
4. [Low-Priority Considerations](#4-low-priority-considerations)
5. [Remediation Roadmap](#5-remediation-roadmap)

---

## 1. Critical Risks

### 1.1 Dual-Header Authentication Inconsistency

**Risk Level:** 🔴 Critical  
**Affected Endpoints:** All authenticated endpoints

**Description:**  
The server accepts authentication via two different headers: `Authorization: Bearer <token>` and `x-user-token: <token>`. Both are resolved identically through `resolveAuthUser()` in `server/admin-auth.ts`. However, some web-client code sends `x-user-token` while some sends `Authorization`.

**Mobile Impact:**  
If mobile chooses one header and the server's auth resolution changes or a middleware is added that only checks one header, auth will silently break.

**Remediation:**
- **Mobile team:** Standardize on `Authorization: Bearer <token>` exclusively.
- **Backend team:** No changes needed — both headers are supported. Consider adding a deprecation notice for `x-user-token` in the future.
- **Effort:** None (mobile just needs to be consistent)

---

### 1.2 Mock Exam `/start` Requires Client-Side Question Pre-Fetch

**Risk Level:** 🔴 Critical  
**Affected Endpoint:** `POST /api/mock-exams/start`

**Description:**  
The general `/api/mock-exams/start` endpoint expects the client to send the full `questions` array (with `id` fields) in the request body. The server extracts only the question IDs — it does **not** return questions. The client must:

1. Fetch questions from QBank or exam-set first
2. Hold the full question data in local memory/state
3. Send the questions array to `/start`
4. Use the locally-held questions for the exam UI

If the mobile app loses state (backgrounding, crash, memory pressure), the exam questions are lost and the attempt is orphaned.

**Remediation:**
- **Mobile team (immediate):** Use `POST /api/mock-exams/start-specialty` instead, which fetches questions server-side from exam definitions. This is the preferred mobile path.
- **Backend team (future):** Consider adding a `GET /api/mock-exams/:attemptId/questions` endpoint that returns the full question set for a given attempt, enabling recovery after state loss.
- **Effort:** Low (mobile uses alternate endpoint); Medium (backend adds recovery endpoint)

---

### 1.3 No Token Refresh Endpoint

**Risk Level:** 🔴 Critical  
**Affected:** All authenticated flows

**Description:**  
User tokens expire after 7 days. There is no refresh token mechanism or token renewal endpoint. When the token expires, the user must re-enter credentials.

**Mobile Impact:**  
Users will be logged out every 7 days with no graceful session extension. On mobile, this creates a poor user experience, especially if the app is used daily.

**Remediation:**
- **Mobile team (immediate):** Detect 401 responses and redirect to login screen with a clear "Session expired" message. Store credentials securely if the user opts into biometric/keychain login for quick re-authentication.
- **Backend team (future):** Implement a `POST /api/auth/refresh` endpoint that accepts a valid (non-expired or recently-expired) token and returns a fresh token.
- **Effort:** Low (mobile handles 401); Medium (backend adds refresh)

---

### 1.4 Inconsistent Error Response Schema

**Risk Level:** 🔴 Critical  
**Affected Endpoints:** All endpoints

**Description:**  
There is no enforced error response contract across the API. Different endpoints return errors in different shapes:

| Pattern | Example | Where Used |
|---------|---------|------------|
| Simple string | `{ "error": "message" }` | Most endpoints |
| With code | `{ "error": "message", "code": "MOCK_PAYWALL" }` | Mock exams |
| With upgrade hint | `{ "error": "...", "upgradeRequired": true }` | QBank, cards |
| With limits | `{ "error": "...", "limit": 150, "used": 45 }` | Card creation |
| Raw exception | `{ "error": e.message }` | Many 500 handlers |

Some 500-error handlers expose raw backend exception messages (e.g., Postgres errors, module import failures) which can leak implementation details.

**Mobile Impact:**
- Mobile cannot rely on a consistent error parsing strategy
- Raw error messages displayed to users would be confusing
- No reliable machine-readable error codes for programmatic handling in most cases

**Remediation:**
- **Mobile team (immediate):** Always parse `error` as a string for display. Treat `code` as optional. Never display raw 500 error messages — use a generic "Something went wrong" fallback. Log the raw `error` field for debugging.
- **Backend team (future):** Implement error normalization middleware that wraps all error responses in a consistent `{ error: string, code?: string, details?: object }` envelope and sanitizes 500 errors to hide internal details.
- **Effort:** Low (mobile defensive parsing); Medium (backend error middleware)

---

## 2. High-Priority Gaps

### 2.1 No Pagination on Lessons Metadata

**Risk Level:** 🟠 High  
**Affected Endpoint:** `GET /api/lessons/meta`

**Description:**  
Returns **all** lessons matching the user's tier in a single JSON array. Currently 100–400 items. No `limit`, `offset`, or cursor parameters are accepted.

**Mobile Impact:**  
- Large payload (potentially 100KB+) on every call
- Slow initial load on poor networks
- Memory pressure on low-end devices

**Remediation:**
- **Mobile team (immediate):** Cache the response aggressively (ETag or timestamp-based staleness). Load once per session, filter client-side.
- **Backend team (future):** Add `limit` + `offset` query parameters. Consider adding `If-Modified-Since` header support.
- **Effort:** Low (mobile caching); Medium (backend pagination)

---

### 2.2 No Pagination on Bookmarks + N+1 Query Pattern

**Risk Level:** 🟠 High  
**Affected Endpoint:** `GET /api/bookmarks`

**Description:**  
Returns **all** bookmarks for a user with no pagination. For each bookmark, the server executes a separate `SELECT` query to fetch the associated question. A user with 100 bookmarks triggers 100+ DB queries.

**Mobile Impact:**  
- Response times degrade linearly with bookmark count
- Risk of request timeouts on slow connections
- No way to load bookmarks incrementally

**Remediation:**
- **Mobile team (immediate):** Add client-side timeout handling (30s). Cache bookmark data. Show loading states.
- **Backend team (future):** 
  1. Add `limit` + `offset` parameters
  2. Replace N+1 queries with a single `JOIN` query
  3. Consider `GET /api/bookmarks/ids` for lightweight sync
- **Effort:** Medium (backend needs query refactor + pagination)

---

### 2.3 Flashcard Deck Cards — Silent Truncation for Free Users

**Risk Level:** 🟠 High  
**Affected Endpoint:** `GET /api/decks/:id/cards`

**Description:**  
Free users (non-premium, non-owner) receive only the first 5 cards (`FREE_PREVIEW_LIMIT = 5`) with **no indication** in the response that the result was truncated. The response is a plain array — there's no `totalCards`, `truncated`, or `limitApplied` field.

**Mobile Impact:**  
The mobile UI cannot tell the difference between a 5-card deck and a 500-card deck that was truncated. Users may think a deck is incomplete when it's actually gated.

**Remediation:**
- **Mobile team (immediate):** Cross-reference the `cardCount` field from the deck object (`GET /api/decks/:id`) with the returned card array length. If `cardCount > cards.length`, display an upgrade prompt.
- **Backend team (future):** Add `totalCards` and `truncated` fields to the response when the result is limited.
- **Effort:** Low (mobile workaround); Low (backend adds metadata)

---

### 2.4 Decks Endpoints Use `userId` in Body/Query Instead of Auth Token

**Risk Level:** 🟠 High  
**Affected Endpoints:** All `/api/decks/*` endpoints

**Description:**  
Deck CRUD operations use `userId` passed as a query parameter or request body field for ownership verification instead of extracting the user from the auth token. This means:

1. Any user could theoretically pass another user's ID
2. The server does verify ownership for mutations, but the pattern is inconsistent with auth-token-based endpoints

**Mobile Impact:**  
Mobile must always include `userId` in requests even when an auth token is present. If the mobile app's locally stored `userId` gets out of sync with the token, operations will fail silently or affect the wrong user.

**Remediation:**
- **Mobile team (immediate):** Always derive `userId` from the login response and ensure it stays synchronized with the stored token.
- **Backend team (future):** Migrate deck endpoints to extract `userId` from the auth token via `resolveAuthUser()`, falling back to query/body `userId` for backward compatibility.
- **Effort:** Low (mobile consistency); Medium (backend migration)

---

## 3. Medium-Priority Gaps

### 3.1 No Push Notification Hooks

**Risk Level:** 🟡 Medium  
**Affected Feature:** QOTD, Study Reminders, Streak Maintenance

**Description:**  
There are no endpoints to register device push tokens, manage notification preferences, or trigger server-side push notifications. Mobile apps typically need:

- `POST /api/devices/register` — Register FCM/APNs token
- `PUT /api/notifications/preferences` — Set notification types
- Server-side scheduled push for QOTD, streak reminders, study nudges

**Remediation:**
- **Mobile team (immediate):** Implement local notifications for QOTD reminder and study streak maintenance. Schedule them client-side.
- **Backend team (future):** Build a device registration and notification dispatch system.
- **Effort:** Medium (local notifications); High (server-side push infrastructure)

---

### 3.2 No Offline Sync / Conflict Resolution Protocol

**Risk Level:** 🟡 Medium  
**Affected Features:** Flashcard creation, QBank attempts, Study sessions

**Description:**  
There is no mechanism for offline operation. No `ETag`, `Last-Modified`, or versioning headers are sent. No batch sync endpoints exist. Most `POST` endpoints are not idempotent — duplicate submissions create duplicate records.

**Mobile Impact:**  
- Users in poor network conditions can't study offline
- If the app queues actions while offline, there's no batch replay endpoint
- No conflict detection for concurrent edits
- Retry after network timeout may create duplicates

**Remediation:**
- **Mobile team (immediate):** Implement optimistic UI with local queuing. Replay queued requests sequentially on reconnect. Treat 409 (conflict) responses as signals to refetch. Debounce all mutation buttons to prevent double-submission.
- **Backend team (future):** Add `ETag` / `If-Match` headers. Consider idempotency keys for POST endpoints. Consider a batch operation endpoint.
- **Effort:** Medium (mobile queue); High (backend sync protocol)

---

### 3.3 Trial Activation Requires Stripe SDK Integration

**Risk Level:** 🟡 Medium  
**Affected Endpoint:** `POST /api/trial-sub/activate`

**Description:**  
Trial activation returns a Stripe `clientSecret` for a SetupIntent. The mobile app must integrate the Stripe Mobile SDK to collect a payment method. This is a well-documented Stripe flow but adds a significant dependency.

**Prerequisites:**
1. Email must be verified (`email_verified_at` must be set)
2. No prior trial for this email/device/payment method (fraud checks)
3. Stripe Mobile SDK integration (iOS: `stripe-ios`, Android: `stripe-android`)

**Remediation:**
- **Mobile team:** Integrate Stripe SDK early. Follow Stripe's mobile SetupIntent guide. Handle all fraud-rejection error messages gracefully.
- **Effort:** Medium

---

### 3.4 Deck Listing Has No Offset Pagination

**Risk Level:** 🟡 Medium  
**Affected Endpoint:** `GET /api/decks`

**Description:**  
The endpoint has a hard `LIMIT 100` with no offset parameter. Users with more than 100 decks cannot access all of them.

**Remediation:**
- **Mobile team (immediate):** Use the `userId` and `search` query params to narrow results when needed.
- **Backend team (future):** Add `offset` query parameter support.
- **Effort:** Low

---

### 3.5 Study Sessions Hard-Limited to 20 Results

**Risk Level:** 🟡 Medium  
**Affected Endpoint:** `GET /api/study-sessions`

**Description:**  
Returns a maximum of 20 sessions with no offset pagination. Historical sessions beyond the most recent 20 are inaccessible.

**Remediation:**
- **Backend team (future):** Add `offset` and configurable `limit` parameters.
- **Effort:** Low

---

### 3.6 No Email Verification Endpoint for Mobile

**Risk Level:** 🟡 Medium  
**Affected Feature:** Trial activation, Account security

**Description:**  
Trial activation requires `email_verified_at` to be set, but there's no visible `POST /api/auth/verify-email` or `POST /api/auth/send-verification` endpoint in the public API. Email verification may be handled through web-only flows.

**Mobile Impact:**  
Mobile users who register in-app may not be able to activate a trial if there's no in-app email verification flow.

**Remediation:**
- **Backend team:** Expose `POST /api/auth/send-verification-email` and `POST /api/auth/verify-email` endpoints that work with deep links or verification codes.
- **Effort:** Medium

---

## 4. Low-Priority Considerations

### 4.1 Response Field Sensitivity

**Risk Level:** 🟢 Low  
**Status:** Currently handled correctly

The server already strips sensitive fields from user-facing responses:

| Endpoint | Fields Stripped |
|----------|---------------|
| `GET /api/user/:userId` | `password`, `stripeCustomerId`, `stripeSubscriptionId`, `adminRole` |
| `POST /api/auth/register` | Returns only safe fields |
| `POST /api/auth/login` | Returns safe fields + token (admin fields only for admin users) |

**Recommendation:** No action needed, but mobile should defensively ignore any unexpected fields.

---

### 4.2 Rate Limit Response Handling

**Risk Level:** 🟢 Low

Rate-limited responses return HTTP `429` with a JSON body. Mobile should:
- Display a user-friendly "Please try again in X seconds" message
- Implement exponential backoff for automated retries
- Check `Retry-After` header when present

---

### 4.3 camelCase Consistency

**Risk Level:** 🟢 Low

The server converts most snake_case DB columns to camelCase in responses using a `snakeToCamel` utility. This is generally consistent but not 100% guaranteed — some raw SQL endpoints may occasionally miss the conversion.

**Recommendation:** Mobile JSON parsing should handle both `camelCase` and `snake_case` defensively (e.g., using a case-insensitive key mapper or checking both variants for critical fields).

---

### 4.4 Kill Switch Feature Flags

**Risk Level:** 🟢 Low

Some endpoints (mock exams) are gated behind a kill switch (`killSwitchGuard`). When a feature is disabled:

```json
{
  "error": "Mock exams are temporarily unavailable for your account.",
  "code": "FEATURE_DISABLED"
}
```

Status code: `503`

Mobile should handle `503` + `FEATURE_DISABLED` gracefully with a "temporarily unavailable" UI state.

---

### 4.5 Region-Based Content Filtering

**Risk Level:** 🟢 Low

QBank questions are automatically filtered by the user's `region` field:
- `US` users see US-scoped and BOTH-scoped questions, excluding `REx-PN` exam
- `CA` users see CAN-scoped and BOTH-scoped questions, excluding `NCLEX-PN` exam

Mobile should allow users to set their region during onboarding and include it in registration.

---

## 5. Remediation Roadmap

### Phase 1: Mobile Launch (No Backend Changes Required)

| Item | Action | Owner | Effort |
|------|--------|-------|--------|
| Auth header | Use `Authorization: Bearer` exclusively | Mobile | None |
| Mock exams | Use `/start-specialty` instead of `/start` | Mobile | Low |
| Token expiry | Handle 401 → re-login flow | Mobile | Low |
| Error handling | Parse `error` as string, treat `code` as optional, never display raw 500 errors | Mobile | Low |
| Lessons meta | Cache full response, filter client-side | Mobile | Low |
| Bookmarks | Add timeout, cache results | Mobile | Low |
| Deck cards | Compare `cardCount` vs array length for truncation | Mobile | Low |
| userId sync | Derive from login response, keep in sync with token | Mobile | Low |
| JSON case | Handle both camelCase and snake_case defensively | Mobile | Low |
| Debounce mutations | Prevent double-submission on all POST buttons | Mobile | Low |
| Offline | Implement local request queue with sequential replay | Mobile | Medium |
| Stripe | Integrate Stripe Mobile SDK for trial activation | Mobile | Medium |
| Local notifications | Schedule QOTD and streak reminders locally | Mobile | Medium |

### Phase 2: Backend Improvements (Recommended Before Scale)

| Item | Action | Owner | Effort | Priority |
|------|--------|-------|--------|----------|
| Error normalization | Implement error middleware with consistent `{ error, code?, details? }` envelope | Backend | Medium | Critical |
| Token refresh | Add `POST /api/auth/refresh` | Backend | Medium | High |
| Lessons pagination | Add `limit`/`offset` to `/api/lessons/meta` | Backend | Medium | High |
| Bookmarks pagination | Add pagination + replace N+1 with JOIN | Backend | Medium | High |
| Cards truncation metadata | Add `totalCards`/`truncated` to card response | Backend | Low | High |
| Email verification API | Expose verification endpoints for mobile | Backend | Medium | High |
| Deck auth migration | Extract userId from token instead of body/query | Backend | Medium | Medium |
| Deck pagination | Add `offset` to `/api/decks` | Backend | Low | Medium |
| Session pagination | Add `offset`/`limit` to `/api/study-sessions` | Backend | Low | Medium |
| Exam question recovery | Add `GET /api/mock-exams/:id/questions` | Backend | Medium | Medium |
| Idempotency keys | Support `Idempotency-Key` header on POST endpoints | Backend | Medium | Medium |

### Phase 3: Mobile-Native Features (New Endpoints Required)

| Item | Action | Owner | Effort | Priority |
|------|--------|-------|--------|----------|
| Push notifications | Device registration + server-side dispatch | Backend | High | Medium |
| Offline sync | ETag/versioning headers + batch sync endpoint | Backend | High | Low |
| Biometric login | Token refresh with biometric verification | Both | Medium | Low |

---

## Summary

| Risk Level | Count | Description |
|------------|-------|-------------|
| 🔴 Critical | 4 | Auth consistency, mock exam architecture, no token refresh, inconsistent error schema |
| 🟠 High | 4 | No pagination (lessons, bookmarks), silent card truncation, userId-in-body pattern |
| 🟡 Medium | 6 | No push notifications, no offline sync, Stripe dependency, pagination gaps, no email verification API |
| 🟢 Low | 5 | Response safety (already handled), rate limits, camelCase edge cases, kill switches, region filtering |

**Overall Assessment:** The existing API surface is **usable for mobile launch** with the workarounds described in Phase 1. No new endpoints are strictly required for an MVP. The critical risks are mitigated by using `Authorization: Bearer` for auth, `/start-specialty` for mock exams, implementing client-side 401 handling for token expiry, and defensive error parsing. The inconsistent error schema is the most impactful gap for mobile DX — Phase 2 error normalization should be a top backend priority. Phase 2 improvements should be completed before scaling to prevent performance degradation with growing user data.
