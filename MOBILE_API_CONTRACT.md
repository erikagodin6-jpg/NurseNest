# NurseNest Mobile API Contract

> **Version:** 1.0  
> **Generated:** 2026-03-18  
> **Base URL:** `https://<host>/api`  
> **Audience:** Mobile workspace engineers integrating with the NurseNest backend

---

## Table of Contents

1. [Authentication](#1-authentication)
2. [User Profile](#2-user-profile)
3. [Entitlements](#3-entitlements)
4. [Question Bank (QBank)](#4-question-bank-qbank)
5. [Lessons](#5-lessons)
6. [Flashcard Decks & Cards](#6-flashcard-decks--cards)
7. [Study Sessions](#7-study-sessions)
8. [Mock Exams](#8-mock-exams)
9. [Question of the Day (QOTD)](#9-question-of-the-day-qotd)
10. [Bookmarks](#10-bookmarks)
11. [Readiness & Performance](#11-readiness--performance)
12. [Adaptive Engine](#12-adaptive-engine)
13. [Trial Subscription](#13-trial-subscription)
14. [Mastery Progress](#14-mastery-progress)
15. [Nursing Question Topics (SEO Content)](#15-nursing-question-topics-seo-content)
16. [Data Model Reference](#16-data-model-reference)
17. [Common Patterns](#17-common-patterns)

---

## 1. Authentication

All authenticated requests must include one of the following headers:

| Header | Format | Notes |
|--------|--------|-------|
| `Authorization` | `Bearer <userToken>` | **Recommended for mobile.** |
| `x-user-token` | `<userToken>` | Legacy web header; works but prefer `Authorization`. |

> **Important:** The server accepts both headers. For consistency and standards compliance, mobile clients **must** use `Authorization: Bearer <token>`.

### 1.1 Register

```
POST /api/auth/register
```

**Rate Limit:** 3 requests / 15 minutes per IP

**Request Body:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `username` | string | ✅ | Must be unique |
| `password` | string | ✅ | |
| `email` | string | ✅ | |
| `region` | string | ❌ | `"US"` or `"CA"` |
| `inviteCode` | string | ❌ | Tester invite code (uppercase) |
| `referralCode` | string | ❌ | Format `NN-REF-XXXX` |

**Success Response `200`:**

```json
{
  "id": "uuid",
  "username": "string",
  "tier": "free",
  "subscriptionStatus": "none",
  "testerAccess": false,
  "testerExpiry": null
}
```

**Error Responses:**

| Status | Body | Cause |
|--------|------|-------|
| `400` | `{ "error": "Username already taken" }` | Duplicate username |
| `400` | `{ "error": "<validation message>" }` | Schema validation failure |
| `429` | `{ "error": "Too many signup attempts..." }` | Rate limit exceeded |

---

### 1.2 Login

```
POST /api/auth/login
```

**Rate Limit:** 5 requests / 60 seconds per IP

**Request Body:**

| Field | Type | Required |
|-------|------|----------|
| `username` | string | ✅ |
| `password` | string | ✅ |

**Success Response `200`:**

```json
{
  "id": "uuid",
  "username": "string",
  "tier": "free|rpn|rn|np|admin",
  "subscriptionStatus": "none|active|past_due|canceled",
  "email": "string|null",
  "region": "US|CA|null",
  "testerAccess": false,
  "testerExpiry": "ISO-8601|null",
  "preferredTheme": "string|null",
  "userToken": "jwt-string",
  "userTokenExpiry": 604800
}
```

> **Token Lifetime:** `userToken` expires in **7 days** (604800 seconds).  
> Mobile clients should store this token securely and refresh by re-authenticating before expiry.  
> Admin-specific fields (`accessToken`, `adminRole`, `csrfToken`) are returned only when `tier === "admin"` — mobile clients should ignore them.

**Error Responses:**

| Status | Body |
|--------|------|
| `400` | `{ "error": "Username and password required" }` |
| `401` | `{ "error": "Invalid credentials" }` |
| `429` | `{ "error": "Too many login attempts..." }` |

---

## 2. User Profile

### 2.1 Get User

```
GET /api/user/:userId
```

**Auth:** Not required (public endpoint)

**Success Response `200`:**

```json
{
  "id": "uuid",
  "username": "string",
  "tier": "free|rpn|rn|np|admin",
  "subscriptionStatus": "none|active|past_due|canceled",
  "email": "string|null",
  "region": "US|CA|null",
  "testerAccess": false,
  "testerExpiry": "ISO-8601|null",
  "preferredTheme": "string|null"
}
```

> **Security Note:** The server already strips sensitive fields (`password`, `stripeCustomerId`, `stripeSubscriptionId`, `adminRole`). The response shape is safe for mobile consumption.

### 2.2 Update Theme

```
POST /api/user/:userId/theme
```

**Auth:** Required (must be the same user or admin)

**Request Body:**

| Field | Type | Required | Valid Values |
|-------|------|----------|--------------|
| `theme` | string | ✅ | `lavender`, `rose`, `sky`, `mint`, `peach`, `coral`, `teal`, `amber`, `indigo`, `emerald`, `plum`, `ocean`, `sunset`, `forest`, `ruby`, `slate`, `mauve`, `gold`, `dark-clinical`, `dark-academia`, `pastel-lilac`, `lavender-dream`, `soft-sage`, `dark-mode` |

**Success Response `200`:** `{ "success": true }`

---

## 3. Entitlements

### 3.1 Resolve Entitlements

```
GET /api/entitlements/resolve
```

**Auth:** Required

**Query Parameters:**

| Param | Type | Required | Notes |
|-------|------|----------|-------|
| `productType` | string | ❌ | e.g., `"lesson"`, `"question"`, `"mock_exam"` |
| `productId` | string | ❌ | Specific content ID |

**Success Response `200`:**

```json
{
  "access": true,
  "source": "subscription|tester|trial|admin|free",
  "tier": "rn",
  "subscriptionStatus": "active",
  "testerAccess": false,
  "trialActive": false,
  "features": {
    "qbank": true,
    "mock_exams": true,
    "study_sessions": true,
    "adaptive_engine": true,
    "pass_probability_model": true,
    "flashcard_bank": true,
    "flashcard_review": true,
    "study_plan": true,
    "ai_tutor": true
  }
}
```

### 3.2 User Card Entitlement

```
GET /api/user-entitlement?userId=<userId>
```

**Auth:** Not required

**Success Response `200`:**

```json
{
  "isPremium": true,
  "totalFreeCards": 45,
  "freeGlobalMax": 150
}
```

### 3.3 Tier Hierarchy

| Tier | Level | Can Access |
|------|-------|------------|
| `free` | 0 | Free content only |
| `rpn` | 1 | Free + RPN content |
| `rn` | 2 | Free + RPN + RN content |
| `np` | 3 | Free + RPN + RN + NP content |
| `admin` | 4 | Everything |

Additional tiers (not hierarchical): `newgrad`, `new_grad_toolkit`, `certification_prep`, `full_access`, `allied`, `imaging`

---

## 4. Question Bank (QBank)

### 4.1 List Questions

```
GET /api/qbank
```

**Auth:** Required (paid tier)  
**Rate Limit:** 60 requests / minute

**Query Parameters:**

| Param | Type | Default | Notes |
|-------|------|---------|-------|
| `tier` | string | user's tier | `rpn`, `rn`, `np` |
| `limit` | number | 50 | Max 50 |
| `offset` | number | 0 | Pagination offset |
| `bodySystem` | string | — | e.g., `"Cardiovascular"` |
| `difficulty` | string | — | `easy`, `moderate`, `hard` |
| `topic` | string | — | Topic filter (ILIKE match) |
| `exam` | string | — | Exam type filter |
| `country` | string | — | Country code |
| `shuffle` | `"true"` | — | Randomize results |
| `country_code` | string | — | ISO country code |
| `language_code` | string | — | e.g., `"en"` |
| `licensing_body` | string | — | Licensing body filter |

**Success Response `200`:**

```json
{
  "questions": [
    {
      "id": "uuid",
      "tier": "rn",
      "exam": "NCLEX-RN",
      "questionType": "multiple_choice",
      "status": "published",
      "stem": "A patient presents with...",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "bodySystem": "Cardiovascular",
      "topic": "Heart Failure",
      "difficulty": 3,
      "regionScope": "BOTH",
      "countryCode": "US",
      "languageCode": "en",
      "licensingBody": null,
      "cognitiveLevel": "application",
      "questionFormat": "standard"
    }
  ],
  "total": 1250,
  "limit": 50,
  "offset": 0,
  "tier": "rn"
}
```

> **Note:** Non-admin users only see `status = 'published'` questions. Region filtering is automatic based on user's region. Response is an **object** with `questions` array and pagination metadata, not a raw array.

**Error Responses:**

| Status | Body |
|--------|------|
| `401` | `{ "error": "Authentication required" }` |
| `403` | `{ "error": "Upgrade required", "upgradeRequired": true }` |

### 4.2 Random Exam Set

```
GET /api/qbank/exam-set
```

**Auth:** Required (paid tier)  
**Rate Limit:** 60 requests / minute

**Query Parameters:**

| Param | Type | Default | Notes |
|-------|------|---------|-------|
| `tier` | string | user's tier | Required |
| `limit` | number | 25 | Max 200 |
| `bodySystem` | string | — | Optional filter |

**Success Response `200`:** Array of full question objects (includes `correctAnswer`, `rationale`, `clinicalPearl`, etc.)

> **Important:** Questions are selected using `ORDER BY RANDOM()`. Not cursor-paginated — each call returns a fresh random sample. Not idempotent.

### 4.3 Record Attempt

```
POST /api/qbank/attempt
```

**Auth:** Required (paid tier)  
**Rate Limit:** 60 requests / minute

**Request Body:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `questionId` | string | ✅ | UUID of the exam question |
| `selectedOption` | number | ✅ | Zero-based index of selected answer |

**Success Response `200`:**

```json
{
  "correct": true,
  "correctAnswer": [2],
  "rationale": "The correct answer is C because...",
  "correctAnswerExplanation": "Detailed explanation...",
  "distractorRationales": { "0": "Why A is wrong...", "1": "Why B is wrong..." },
  "clinicalPearl": "Remember that...",
  "bodySystem": "Cardiovascular"
}
```

> **Note:** The server evaluates correctness and returns the result with explanations. `correctAnswer` is always an array of zero-based indices (even for single-answer questions).

**Error Responses:**

| Status | Body |
|--------|------|
| `400` | `{ "error": "questionId and selectedOption required" }` |
| `401` | `{ "error": "Authentication required" }` |
| `403` | `{ "error": "Upgrade required" }` |
| `403` | `{ "error": "Question not accessible for your tier" }` |
| `500` | `{ "error": "Question has invalid answer data" }` |

### 4.4 Get Stats

```
GET /api/qbank/stats?userId=<userId>&tier=<tier>
```

**Auth:** Required

### 4.5 Get Body Systems

```
GET /api/qbank/body-systems?tier=<tier>
```

**Auth:** Required

**Success Response `200`:** Array of `{ bodySystem, count }`

### 4.6 Get Filter Options

```
GET /api/qbank/filter-options
```

**Auth:** Required  
Returns available filter values (body systems, topics, exams, difficulties, country codes, etc.)

---

## 5. Lessons

### 5.1 Lesson Metadata

```
GET /api/lessons/meta
```

**Auth:** Optional (determines tier-based filtering)

**Query Parameters:**

| Param | Type | Notes |
|-------|------|-------|
| `tier` | string | Filter by specific tier |

**Success Response `200`:** Array of lesson metadata

```json
[
  {
    "id": "lesson-id-slug",
    "title": "Cardiac Assessment",
    "tier": "rn",
    "category": "Cardiovascular",
    "hasQuiz": true,
    "hasPreTest": false,
    "hasPostTest": true,
    "medCount": 5,
    "image": "url|undefined",
    "isComplete": true
  }
]
```

> **⚠️ No Pagination:** This endpoint returns **all** lessons matching the user's tier in a single array. Mobile clients should cache this data and implement client-side search/filtering. Expect 100–400 items.

### 5.2 Lesson Content

```
GET /api/lessons/content/:slug
```

**Auth:** Optional (determines access)

**Success Response `200`:** Full lesson content object (varies by lesson)

**Error Responses:**

| Status | Body | Cause |
|--------|------|-------|
| `403` | `{ "error": "Premium content..." }` | User tier too low |
| `404` | `{ "error": "Lesson not found" }` | Invalid slug |

> Free users can preview up to **5 lessons** (`FREE_LESSON_PREVIEW_LIMIT = 5`).

### 5.3 Search Lessons

```
GET /api/lessons/search?q=<query>
```

**Auth:** Optional  
**Rate Limit:** Applied

### 5.4 Lesson Count

```
GET /api/lessons/count
```

**Auth:** Not required

---

## 6. Flashcard Decks & Cards

### 6.1 List Decks

```
GET /api/decks
```

**Auth:** Not required

**Query Parameters:**

| Param | Type | Notes |
|-------|------|-------|
| `userId` | string | Filter by owner |
| `visibility` | `"public"` | Filter public only |
| `search` | string | Title/description search |

**Success Response `200`:** Array of deck objects (max 100, no offset pagination)

```json
[
  {
    "id": "uuid",
    "ownerId": "uuid",
    "ownerUsername": "string",
    "title": "string",
    "description": "string",
    "tags": [],
    "tier": "free",
    "visibility": "private|public",
    "slug": "string",
    "careerType": "nursing",
    "cardCount": 25,
    "viewCount": 100,
    "saveCount": 5,
    "createdAt": "ISO-8601",
    "updatedAt": "ISO-8601"
  }
]
```

### 6.2 Get Deck by ID

```
GET /api/decks/:id?userId=<userId>
```

**Auth:** Not required (userId query param used for private deck access check)

### 6.3 Get Deck by Slug

```
GET /api/decks/by-slug/:slug?userId=<userId>
```

**Auth:** Not required

### 6.4 Create Deck

```
POST /api/decks
```

**Auth:** Not required (uses `userId` in body)

**Request Body:**

| Field | Type | Required |
|-------|------|----------|
| `userId` | string | ✅ |
| `title` | string | ✅ |
| `description` | string | ❌ |
| `tags` | array | ❌ |
| `tier` | string | ❌ |
| `visibility` | string | ❌ |
| `slug` | string | ❌ |

### 6.5 Update Deck

```
PUT /api/decks/:id
```

**Request Body:** Same as create plus `userId` for ownership verification.

### 6.6 Delete Deck

```
DELETE /api/decks/:id?userId=<userId>
```

### 6.7 Get Deck Cards

```
GET /api/decks/:id/cards?userId=<userId>
```

**Auth:** Not required (uses `userId` query param for entitlement check)

**Success Response `200`:** Array of flashcard objects

```json
[
  {
    "id": "uuid",
    "deckId": "uuid",
    "front": "string",
    "back": "string",
    "rationale": "string|null",
    "clinicalPearl": "string|null",
    "tags": [],
    "difficulty": "easy|medium|hard",
    "sortOrder": 0
  }
]
```

> **⚠️ Free User Card Limit:** Non-premium, non-owner users receive only the **first 5 cards** (`FREE_PREVIEW_LIMIT = 5`). Premium users and deck owners receive all cards. The response array is silently truncated with no `totalCards` or `truncated` metadata — use the deck's `cardCount` field to detect truncation.

### 6.8 Add Card to Deck

```
POST /api/decks/:id/cards
```

**Request Body:**

| Field | Type | Required |
|-------|------|----------|
| `userId` | string | ✅ |
| `front` | string | ✅ |
| `back` | string | ✅ |
| `rationale` | string | ❌ |
| `clinicalPearl` | string | ❌ |
| `tags` | array | ❌ |
| `difficulty` | string | ❌ |

> Free users have a global card creation limit of `FREE_GLOBAL_MAX` cards across all decks.

### 6.9 Update Card

```
PUT /api/decks/:deckId/cards/:cardId
```

### 6.10 Delete Card

```
DELETE /api/decks/:deckId/cards/:cardId
```

### 6.11 Bulk Import Cards

```
POST /api/decks/:id/cards/bulk-import
```

### 6.12 Save/Unsave Deck

```
POST /api/decks/:id/save
DELETE /api/decks/:id/save
```

### 6.13 Duplicate Deck

```
POST /api/decks/:id/duplicate
```

### 6.14 Deck Stats

```
GET /api/decks/:id/stats?userId=<userId>
```

---

## 7. Study Sessions

All study session endpoints require the `study_sessions` entitlement.

### 7.1 Start Session

```
POST /api/study-sessions
```

**Auth:** Required (entitlement: `study_sessions`)

**Request Body:**

| Field | Type | Required |
|-------|------|----------|
| `userId` | string | ✅ |
| `deckId` | string | ✅ |
| `mode` | string | ❌ | Default: `"learn"` |

**Success Response `200`:** Study session object with `id`, `userId`, `deckId`, `mode`, `startedAt`

### 7.2 Update Session (Complete)

```
PUT /api/study-sessions/:id
```

**Auth:** Required (entitlement: `study_sessions`)

**Request Body:**

| Field | Type | Required |
|-------|------|----------|
| `totalCards` | number | ❌ |
| `correctCount` | number | ❌ |
| `incorrectCount` | number | ❌ |
| `timeSeconds` | number | ❌ |
| `missedCardIds` | array | ❌ |

### 7.3 List Sessions

```
GET /api/study-sessions?userId=<userId>&deckId=<deckId>
```

**Auth:** Required (entitlement: `study_sessions`)

**Success Response `200`:** Array of sessions (max 20, no offset pagination, ordered by `startedAt DESC`)

---

## 8. Mock Exams

All mock exam endpoints require the `mock_exams` entitlement unless noted.

### 8.1 Get Exam Definitions

```
GET /api/mock-exam-definitions
```

**Auth:** Required (entitlement: `mock_exams`)

**Query Parameters:**

| Param | Type | Notes |
|-------|------|-------|
| `specialty` | string | Optional filter |

**Success Response `200`:** Array of exam definition objects

```json
[
  {
    "id": "uuid",
    "specialty": "string",
    "examNumber": 1,
    "title": "string",
    "difficultyLevel": "string",
    "categoryTags": [],
    "timeLimit": 3600,
    "sections": {},
    "totalQuestions": 75,
    "createdAt": "ISO-8601"
  }
]
```

### 8.2 Get Exam Definition by ID

```
GET /api/mock-exam-definitions/:id
```

**Auth:** Required (entitlement: `mock_exams`)

### 8.3 Start Mock Exam (General)

```
POST /api/mock-exams/start
```

**Auth:** Required (entitlement: `mock_exams`)  
**Rate Limit:** Applied  
**Kill Switch:** `mock_exams` feature flag

**Request Body:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `tier` | string | ✅ | e.g., `"rpn"`, `"rn"`, `"np"` |
| `totalQuestions` | number | ✅ | |
| `questions` | array | ✅ | Array of question objects (must include `id`) |
| `examMode` | string | ❌ | `"practice"`, `"official"`, `"readiness"` |
| `blueprintCode` | string | ❌ | e.g., `"NCLEX-RN"`, `"REX-PN"` |
| `blueprintMeta` | object | ❌ | Blueprint metadata |
| `domainAssignments` | object | ❌ | Domain assignment map |

> **⚠️ Architecture Note:** The client must pre-fetch question objects and send them in the request body. The server extracts only the `id` fields and stores them. The full question data is **not** stored server-side in the attempt — the client must retain the question set locally for the exam UI. **Mobile should prefer `/start-specialty` instead** (see §8.4).

**Success Response `200`:**

```json
{
  "attemptId": "uuid",
  "creditUsed": false
}
```

**Error Responses:**

| Status | Code | Meaning |
|--------|------|---------|
| `400` | — | `"Missing required fields"` or `"Cannot start an exam with zero questions"` |
| `403` | `TIER_MISMATCH` | User tier doesn't allow this exam tier |
| `403` | `MOCK_PAYWALL` | Requires upgrade or exam credit; includes `requiredTier` and `creditScope` |
| `500` | `SCHEMA_DRIFT` | Temporary DB configuration issue |
| `503` | `FEATURE_DISABLED` | Kill switch active |

### 8.4 Start Specialty Mock Exam

```
POST /api/mock-exams/start-specialty
```

**Auth:** Required (entitlement: `mock_exams`)

**Request Body:**

| Field | Type | Required |
|-------|------|----------|
| `examDefinitionId` | string | ✅ |
| `specialty` | string | ❌ |

> Unlike `/start`, this endpoint fetches questions server-side from the exam definition. **Preferred for mobile.**

**Success Response `200`:**

```json
{
  "attemptId": "uuid",
  "timeLimit": 3600,
  "examTitle": "string"
}
```

### 8.5 Save Progress

```
PUT /api/mock-exams/:attemptId/progress
```

**Auth:** Required (any paid tier)

**Request Body:**

| Field | Type | Required |
|-------|------|----------|
| `answers` | object | ❌ | Map of questionId → selectedAnswer |
| `flagged` | array | ❌ | Array of flagged question IDs |
| `timeSpent` | number | ❌ | Seconds elapsed |
| `catState` | object | ❌ | CAT algorithm state |
| `timerState` | object | ❌ | Timer state |
| `currentQuestion` | number | ❌ | Current question index |

**Success Response `200`:** `{ "success": true }`

### 8.6 Complete Exam

```
POST /api/mock-exams/:attemptId/complete
```

**Auth:** Required (any paid tier)

**Request Body:**

| Field | Type | Required |
|-------|------|----------|
| `answers` | object | ✅ |
| `timeSpent` | number | ❌ |
| `questions` | array | ✅ |

### 8.7 Get Exam History

```
GET /api/mock-exams/history/:userId
```

**Auth:** Required (any paid tier)

### 8.8 Get Exam Attempt

```
GET /api/mock-exams/:attemptId
```

**Auth:** Required (any paid tier)

---

## 9. Question of the Day (QOTD)

### 9.1 Get Today's Question

```
GET /api/qotd/today
```

**Auth:** Not required (public)

**Success Response `200`:**

```json
{
  "date": "2026-03-18",
  "tier": "free",
  "question": "A patient presents with...",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctIndex": 2,
  "rationale": "string",
  "bodySystem": "Cardiovascular",
  "lessonId": "lesson-slug"
}
```

### 9.2 Submit Answer

```
POST /api/qotd/answer
```

**Auth:** Required

**Request Body:**

| Field | Type | Required |
|-------|------|----------|
| `selectedIndex` | number | ✅ | Non-negative integer |

**Success Response `200`:**

```json
{
  "answer": { "userId": "...", "questionDate": "...", "selectedIndex": 2, "isCorrect": true },
  "streak": { "currentStreak": 5, "longestStreak": 12, "totalAnswered": 30, "totalCorrect": 22 },
  "isCorrect": true
}
```

**Error Responses:**

| Status | Body |
|--------|------|
| `401` | `{ "error": "Login required to track answers" }` |
| `409` | `{ "error": "Already answered today", "answer": {...} }` |

### 9.3 Get Streak

```
GET /api/qotd/streak
```

**Auth:** Required

**Success Response `200`:**

```json
{
  "currentStreak": 5,
  "longestStreak": 12,
  "totalAnswered": 30,
  "totalCorrect": 22,
  "lastAnswerDate": "2026-03-17"
}
```

### 9.4 Get History

```
GET /api/qotd/history?limit=30
```

**Auth:** Required

### 9.5 Get My Answer (Today)

```
GET /api/qotd/my-answer
```

**Auth:** Optional (returns `{ "answer": null }` if not authenticated)

### 9.6 Archive

```
GET /api/qotd/archive?limit=30
```

**Auth:** Not required (public)

**Success Response `200`:** Array of `{ date, tier, question, bodySystem }`

---

## 10. Bookmarks

All bookmark endpoints require any paid tier.

### 10.1 Create Bookmark

```
POST /api/bookmarks/:questionId
```

**Auth:** Required (any paid tier)

**Request Body:**

| Field | Type | Required | Valid Values |
|-------|------|----------|--------------|
| `questionSource` | string | ✅ | `"exam_questions"` or `"allied_questions"` |

**Success Response `200`:** `{ "bookmarked": true, "id": "uuid", ... }`

### 10.2 Remove Bookmark

```
DELETE /api/bookmarks/:questionId?questionSource=exam_questions
```

**Auth:** Required (any paid tier)

### 10.3 List Bookmarks

```
GET /api/bookmarks
```

**Auth:** Required (any paid tier)

**Query Parameters:**

| Param | Type | Notes |
|-------|------|-------|
| `profession` | string | Filter by career type |
| `topic` | string | Filter by topic |
| `difficulty` | string | Filter by difficulty |
| `source` | string | `"exam_questions"` or `"allied_questions"` |

**Success Response `200`:**

```json
{
  "bookmarks": [
    {
      "bookmark": { "id": "uuid", "userId": "uuid", "questionId": "uuid", "questionSource": "exam_questions", "createdAt": "ISO-8601" },
      "question": { "id": "uuid", "stem": "...", "options": [...], ... }
    }
  ],
  "total": 25
}
```

> **⚠️ Performance Warning:** This endpoint has no pagination and performs N+1 queries (one per bookmark to fetch the associated question). For users with many bookmarks, response times may be slow. Mobile clients should cache results aggressively.

---

## 11. Readiness & Performance

### 11.1 Get Readiness Score

```
GET /api/readiness/:userId
```

**Auth:** Required (must be same user or admin)

**Free Tier Response `200`:**

```json
{
  "readinessScore": 72,
  "readinessTier": "moderate",
  "tierLabel": "Getting There",
  "upgradeRequired": true,
  "message": "Upgrade to premium for full readiness analysis..."
}
```

**Premium Tier Response `200`:**

```json
{
  "readinessScore": 72,
  "readinessTier": "moderate",
  "tierLabel": "Getting There",
  "passProbability": 68,
  "passProbabilityMessage": "string",
  "factors": {},
  "examType": "nclex-rn",
  "benchmarks": {},
  "weakTopics": [],
  "recommendations": [],
  "upgradeRequired": false
}
```

> Requires `pass_probability_model` entitlement for full analysis.

### 11.2 Readiness History

```
GET /api/readiness/:userId/history?limit=52
```

**Auth:** Required (must be same user or admin)

### 11.3 Readiness Benchmarks

```
GET /api/readiness/:userId/benchmarks
```

**Auth:** Required (entitlement: `pass_probability_model`)

---

## 12. Adaptive Engine

All adaptive endpoints require the `adaptive_engine` entitlement unless noted.

### 12.1 Record Response

```
POST /api/adaptive/record-response
```

### 12.2 Mastery Progress

```
GET /api/adaptive/mastery/:userId
```

### 12.3 Weak Areas

```
GET /api/adaptive/weak-areas/:userId
```

### 12.4 Next Cards

```
GET /api/adaptive/next-cards/:userId
```

### 12.5 Dashboard

```
GET /api/adaptive/dashboard/:userId
```

### 12.6 Session Types

```
GET /api/adaptive/session-types
```

**Auth:** Required (any paid tier — does not require `adaptive_engine`)

### 12.7 Start Session

```
POST /api/adaptive/session/start
```

### 12.8 Complete Session

```
POST /api/adaptive/session/complete
```

### 12.9 Flag Card

```
POST /api/adaptive/flag-card
```

### 12.10 Mark Mastered

```
POST /api/adaptive/mark-mastered
```

### 12.11 Study Again Soon

```
POST /api/adaptive/study-again-soon
```

### 12.12 Card Stats

```
GET /api/adaptive/card-stats/:cardId
```

---

## 13. Trial Subscription

### 13.1 Activate Trial

```
POST /api/trial-sub/activate
```

**Auth:** Required  
**Rate Limit:** 3 attempts / 15 minutes

**Request Body:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `tier` | string | ✅ | Target subscription tier |
| `deviceFingerprint` | string | ❌ | Device fingerprint for fraud prevention |

**Success Response `200`:**

```json
{
  "success": true,
  "clientSecret": "stripe-setup-intent-client-secret",
  "trialId": "uuid",
  "expiresAt": "ISO-8601"
}
```

> **Flow:** Mobile must collect a payment method via Stripe SDK using the returned `clientSecret`, then call `/confirm` to finalize.

**Error Responses:**

| Status | Body |
|--------|------|
| `400` | `{ "error": "Email verification required" }` |
| `403` | `{ "error": "Trial already used..." }` |
| `429` | Rate limit |

### 13.2 Confirm Trial

```
POST /api/trial-sub/confirm
```

**Auth:** Required

### 13.3 Trial Status

```
GET /api/trial-sub/status
```

**Auth:** Required

### 13.4 Cancel Trial

```
POST /api/trial-sub/cancel
```

**Auth:** Required

### 13.5 Trial Consumption

```
GET /api/trial-sub/consumption
```

**Auth:** Required

**Success Response `200`:** Shows usage against trial limits:

| Limit | Default |
|-------|---------|
| Questions | 50 |
| Flashcards | 30 |
| Lessons | 5 |
| Mock Exams | 2 |

---

## 14. Mastery Progress

### 14.1 Get Mastery Progress

```
GET /api/mastery-progress/:userId
```

**Auth:** Not required

**Success Response `200`:** Array of topic mastery objects

```json
[
  {
    "topic": "cardiac-assessment",
    "accuracy": 85,
    "exposureCount": 120,
    "improvementSlope": 2.5,
    "estimatedHoursToMastery": 0,
    "mastered": true,
    "displayTitle": "Cardiac Assessment"
  }
]
```

---

## 15. Nursing Question Topics (SEO Content)

These endpoints serve structured topic/body-system browsing for question banks. Useful for mobile content navigation.

### 15.1 List Topics by Tier

```
GET /api/nursing/question-topics/:tier
```

**Auth:** Not required (public)  
**Rate Limit:** Content browse limiter

**Path Parameters:**

| Param | Type | Valid Values |
|-------|------|-------------|
| `tier` | string | `rpn`, `rn`, `np` |

**Success Response `200`:**

```json
{
  "tier": "rn",
  "tierLabel": "Registered Nurse",
  "examLabel": "NCLEX-RN",
  "topics": [
    {
      "topicSlug": "heart-failure",
      "topic": "Heart Failure",
      "bodySystem": "Cardiovascular",
      "questionCount": 45,
      "difficulties": [2, 3, 4]
    }
  ],
  "bodySystems": [
    {
      "bodySystem": "Cardiovascular",
      "bodySystemSlug": "cardiovascular",
      "topicCount": 12,
      "questionCount": 340
    }
  ],
  "totalQuestions": 1250,
  "totalTopics": 85
}
```

### 15.2 Get Topic Questions

```
GET /api/nursing/question-topics/:tier/:topicSlug
```

**Auth:** Not required (public)  
**Rate Limit:** Content browse limiter

**Success Response `200`:** Object containing topic metadata and up to 10 sample questions with stems, options, correct answers, and rationales. Also includes related topics and breadcrumb data.

---

## 16. Data Model Reference

This section documents the core database tables and their column shapes. Fields marked **🚫 Strip** must never be exposed to mobile clients in API responses (the server already handles this for user-facing endpoints).

### 16.1 `users`

| Column | DB Type | Nullable | Default | Mobile-Safe |
|--------|---------|----------|---------|-------------|
| `id` | varchar (PK) | No | `gen_random_uuid()` | ✅ |
| `username` | text (unique) | No | — | ✅ |
| `password` | text | No | — | 🚫 Strip |
| `email` | text | Yes | `null` | ✅ |
| `email_verified_at` | timestamp | Yes | `null` | ✅ |
| `tier` | text | Yes | `"free"` | ✅ |
| `stripe_customer_id` | text | Yes | `null` | 🚫 Strip |
| `stripe_subscription_id` | text | Yes | `null` | 🚫 Strip |
| `subscription_status` | text | Yes | `"inactive"` | ✅ |
| `region` | text | Yes | `"US"` | ✅ |
| `flashcard_limit` | integer | Yes | `300` | ✅ |
| `plan_expires_at` | timestamp | Yes | `null` | ✅ |
| `career_type` | text | Yes | `"nursing"` | ✅ |
| `tester_access` | boolean | Yes | `false` | ✅ |
| `tester_expiry` | timestamp | Yes | `null` | ✅ |
| `tester_invite_code` | text | Yes | `null` | 🚫 Strip |
| `referral_code` | text (unique) | Yes | `null` | ✅ |
| `referral_uses` | integer | Yes | `0` | ✅ |
| `referred_by` | text | Yes | `null` | ✅ |
| `referral_discount_used` | boolean | Yes | `false` | ✅ |
| `is_lifetime` | boolean | Yes | `false` | ✅ |
| `lifetime_purchased_at` | timestamp | Yes | `null` | ✅ |
| `preferred_theme` | text | Yes | `null` | ✅ |
| `admin_role` | text | Yes | `null` | 🚫 Strip |

### 16.2 `pricing_plans`

| Column | DB Type | Nullable | Default |
|--------|---------|----------|---------|
| `id` | varchar (PK) | No | `gen_random_uuid()` |
| `tier` | text | No | — |
| `duration` | text | No | — |
| `is_lifetime` | boolean | Yes | `false` |
| `price_cad` | integer | No | — |
| `price_usd` | integer | No | — |
| `is_enabled` | boolean | Yes | `true` |
| `is_popular` | boolean | Yes | `false` |
| `is_founding_price` | boolean | Yes | `false` |
| `feature_list` | jsonb | Yes | `[]` |
| `display_order` | integer | Yes | `0` |
| `created_at` | timestamp | No | `now()` |
| `updated_at` | timestamp | No | `now()` |

### 16.3 `free_trial_usage`

| Column | DB Type | Nullable | Default |
|--------|---------|----------|---------|
| `id` | varchar (PK) | No | `gen_random_uuid()` |
| `user_id` | varchar (unique) | No | — |
| `questions_used` | integer | Yes | `0` |
| `flashcards_used` | integer | Yes | `0` |
| `cat_exams_used` | integer | Yes | `0` |
| `created_at` | timestamp | No | `now()` |
| `updated_at` | timestamp | No | `now()` |

### 16.4 `exam_questions`

| Column | DB Type | Nullable | Default |
|--------|---------|----------|---------|
| `id` | varchar (PK) | No | `gen_random_uuid()` |
| `tier` | text | No | — |
| `exam` | text | No | — |
| `question_type` | text | No | — |
| `status` | text | Yes | `"draft"` |
| `publish_at` | timestamp | Yes | `null` |
| `stem` | text | No | — |
| `options` | jsonb | Yes | `[]` |
| `correct_answer` | jsonb | Yes | `[]` |
| `rationale` | text | Yes | `null` |
| `difficulty` | integer | Yes | `3` |
| `tags` | text[] | Yes | `{}` |
| `body_system` | text | Yes | `null` |
| `topic` | text | Yes | `null` |
| `subtopic` | text | Yes | `null` |
| `region_scope` | text | Yes | `"BOTH"` |
| `career_type` | text | Yes | `"nursing"` |
| `scenario` | text | Yes | `null` |
| `clinical_pearl` | text | Yes | `null` |
| `exam_strategy` | text | Yes | `null` |
| `memory_hook` | text | Yes | `null` |
| `framework_used` | text | Yes | `null` |
| `clinical_trap` | text | Yes | `null` |
| `distractor_rationales` | jsonb | Yes | `null` |
| `quality_score` | integer | Yes | `null` |
| `country_code` | text | Yes | `null` |
| `region_code` | text | Yes | `null` |
| `licensing_body` | text | Yes | `null` |
| `language_code` | text | Yes | `"en"` |
| `cognitive_level` | text | Yes | `null` |
| `question_format` | text | Yes | `null` |
| `is_mock_exam_eligible` | boolean | Yes | `true` |
| `is_adaptive_eligible` | boolean | Yes | `true` |
| `correct_answer_explanation` | text | Yes | `null` |
| `incorrect_answer_rationale` | jsonb | Yes | `null` |
| `clinical_reasoning` | text | Yes | `null` |
| `key_takeaway` | text | Yes | `null` |
| `mnemonic` | text | Yes | `null` |
| `reference_source` | text | Yes | `null` |
| `created_at` | timestamp | No | `now()` |
| `updated_at` | timestamp | No | `now()` |

### 16.5 `flashcard_decks`

| Column | DB Type | Nullable | Default |
|--------|---------|----------|---------|
| `id` | varchar (PK) | No | `gen_random_uuid()` |
| `owner_id` | varchar | No | — |
| `title` | text | No | — |
| `description` | text | Yes | `""` |
| `tags` | jsonb | Yes | `[]` |
| `tier` | text | Yes | `"free"` |
| `visibility` | text | Yes | `"private"` |
| `slug` | text | Yes | `null` |
| `career_type` | text | Yes | `"nursing"` |
| `is_upgraded` | boolean | Yes | `false` |
| `upgraded_at` | timestamp | Yes | `null` |
| `upgraded_limit` | integer | Yes | `300` |
| `stripe_payment_intent_id` | text | Yes | `null` |
| `card_count` | integer | Yes | `0` |
| `view_count` | integer | Yes | `0` |
| `save_count` | integer | Yes | `0` |
| `created_at` | timestamp | No | `now()` |
| `updated_at` | timestamp | No | `now()` |

### 16.6 `deck_flashcards`

| Column | DB Type | Nullable | Default |
|--------|---------|----------|---------|
| `id` | varchar (PK) | No | `gen_random_uuid()` |
| `deck_id` | varchar | No | — |
| `front` | text | No | — |
| `back` | text | No | — |
| `rationale` | text | Yes | `null` |
| `clinical_pearl` | text | Yes | `null` |
| `tags` | jsonb | Yes | `[]` |
| `difficulty` | text | Yes | `"medium"` |
| `ai_check_status` | text | Yes | `"unknown"` |
| `ai_check_summary` | text | Yes | `null` |
| `ai_check_confidence` | integer | Yes | `null` |
| `user_override` | boolean | Yes | `false` |
| `sort_order` | integer | Yes | `0` |
| `created_at` | timestamp | No | `now()` |
| `updated_at` | timestamp | No | `now()` |

### 16.7 `mock_exam_attempts`

| Column | DB Type | Nullable | Default |
|--------|---------|----------|---------|
| `id` | varchar (PK) | No | `gen_random_uuid()` |
| `user_id` | varchar | No | — |
| `tier` | text | No | `"rpn"` |
| `total_questions` | integer | No | — |
| `status` | text | No | `"in_progress"` |
| `score` | integer | Yes | `null` |
| `time_spent` | integer | Yes | `null` |
| `questions` | jsonb | Yes | `[]` |
| `answers` | jsonb | Yes | `{}` |
| `flagged` | jsonb | Yes | `[]` |
| `report` | jsonb | Yes | `{}` |
| `career_type` | text | Yes | `"nursing"` |
| `exam_type` | text | Yes | `"practice"` |
| `cat_state` | jsonb | Yes | `null` |
| `blueprint_coverage_state` | jsonb | Yes | `null` |
| `review_unlocked` | boolean | Yes | `false` |
| `timer_state` | jsonb | Yes | `null` |
| `stopping_rule_status` | text | Yes | `null` |
| `blueprint_code` | text | Yes | `null` |
| `blueprint_meta` | jsonb | Yes | `null` |
| `started_at` | timestamp | No | `now()` |
| `completed_at` | timestamp | Yes | `null` |

### 16.8 `user_progress`

| Column | DB Type | Nullable | Default |
|--------|---------|----------|---------|
| `id` | varchar (PK) | No | `gen_random_uuid()` |
| `user_id` | varchar | No | — |
| `lesson_id` | text | No | — |
| `completed` | text | Yes | `"false"` |
| `pre_test_score` | integer | Yes | `null` |
| `post_test_score` | integer | Yes | `null` |
| `last_accessed` | timestamp | No | `now()` |

### 16.9 `user_performance_summary`

| Column | DB Type | Nullable | Default |
|--------|---------|----------|---------|
| `id` | varchar (PK) | No | `gen_random_uuid()` |
| `user_id` | varchar | No | — |
| `readiness_score` | integer | Yes | `0` |
| `projected_pass_probability` | integer | Yes | `0` |
| `weakness_vector` | jsonb | Yes | `{}` |
| `strengths_vector` | jsonb | Yes | `{}` |
| `top_weak_domains` | jsonb | Yes | `[]` |
| `top_weak_question_types` | jsonb | Yes | `[]` |
| `updated_at` | timestamp | No | `now()` |

### 16.10 `study_sessions`

| Column | DB Type | Nullable | Default |
|--------|---------|----------|---------|
| `id` | varchar (PK) | No | `gen_random_uuid()` |
| `user_id` | varchar | No | — |
| `deck_id` | varchar | No | — |
| `mode` | text | No | `"learn"` |
| `total_cards` | integer | Yes | `0` |
| `correct_count` | integer | Yes | `0` |
| `incorrect_count` | integer | Yes | `0` |
| `time_seconds` | integer | Yes | `null` |
| `missed_card_ids` | jsonb | Yes | `[]` |
| `started_at` | timestamp | No | `now()` |
| `ended_at` | timestamp | Yes | `null` |

### 16.11 `qotd_history`

| Column | DB Type | Nullable | Default |
|--------|---------|----------|---------|
| `id` | varchar (PK) | No | `gen_random_uuid()` |
| `question_date` | text (unique) | No | — |
| `tier` | text | No | `"rpn"` |
| `question_text` | text | No | — |
| `options` | jsonb | Yes | `[]` |
| `correct_index` | integer | No | — |
| `rationale` | text | No | — |
| `body_system` | text | Yes | `null` |
| `lesson_id` | text | Yes | `null` |
| `created_at` | timestamp | No | `now()` |

### 16.12 `qotd_user_answers`

| Column | DB Type | Nullable | Default |
|--------|---------|----------|---------|
| `id` | varchar (PK) | No | `gen_random_uuid()` |
| `user_id` | varchar | No | — |
| `question_date` | text | No | — |
| `selected_index` | integer | No | — |
| `is_correct` | boolean | No | — |
| `answered_at` | timestamp | No | `now()` |

### 16.13 `qotd_streaks`

| Column | DB Type | Nullable | Default |
|--------|---------|----------|---------|
| `id` | varchar (PK) | No | `gen_random_uuid()` |
| `user_id` | varchar (unique) | No | — |
| `current_streak` | integer | No | `0` |
| `longest_streak` | integer | No | `0` |
| `total_answered` | integer | No | `0` |
| `total_correct` | integer | No | `0` |
| `last_answer_date` | text | Yes | `null` |

---

## 17. Common Patterns

### 17.1 Error Response Format

Error responses vary across endpoints. There is **no single enforced error schema**. Mobile clients should handle errors defensively:

**Most common pattern:**

```json
{ "error": "Human-readable error message" }
```

**Extended pattern (some endpoints):**

```json
{
  "error": "Human-readable message",
  "code": "MACHINE_READABLE_CODE",
  "upgradeRequired": true,
  "requiredTier": "rn",
  "limit": 150,
  "used": 45
}
```

**Key error codes to handle:**

| Code | Endpoints | Meaning |
|------|-----------|---------|
| `TIER_MISMATCH` | Mock exams | User tier doesn't permit this exam |
| `MOCK_PAYWALL` | Mock exams | Upgrade or credit required |
| `SCHEMA_DRIFT` | Mock exams | Temporary DB issue, retry |
| `FEATURE_DISABLED` | Mock exams (503) | Feature kill-switched |
| — | Various (401) | Auth required / token expired |
| — | Various (403) | Insufficient tier / entitlement |

> **⚠️ Inconsistency Warning:** Not all endpoints include `code` fields. Some return only `{ "error": "..." }`. Some 500 errors expose raw error messages. Mobile should display user-friendly messages for all non-2xx responses and log the raw `error` field for debugging.

### 17.2 Pagination

Most list endpoints use `limit` / `offset` query parameters. Notable exceptions:

| Endpoint | Pagination | Notes |
|----------|------------|-------|
| `/api/lessons/meta` | ❌ None | Returns all lessons in one array |
| `/api/bookmarks` | ❌ None | Returns all bookmarks |
| `/api/decks` | Hardcoded `LIMIT 100` | No offset support |
| `/api/qbank` | ✅ `limit` + `offset` | Max 50 per page. Returns `{ questions, total, limit, offset, tier }` |
| `/api/qbank/exam-set` | ❌ Random | `ORDER BY RANDOM() LIMIT N` |
| `/api/study-sessions` | Hardcoded `LIMIT 20` | No offset support |

### 17.3 CSRF

CSRF protection applies only to cookie-based admin sessions. Mobile clients using `Authorization: Bearer` header are **not affected** by CSRF and do not need to send a CSRF token.

### 17.4 Rate Limiting

| Endpoint | Limit | Retry Strategy |
|----------|-------|----------------|
| `POST /api/auth/register` | 3 / 15 min | Show countdown timer |
| `POST /api/auth/login` | 5 / 60 sec | Show "try again in X seconds" |
| `GET /api/qbank/*` | 60 / 60 sec | Exponential backoff |
| `POST /api/mock-exams/start*` | Custom limiter | Show "please wait" |
| `POST /api/trial-sub/activate` | 3 / 15 min | Show countdown timer |
| `GET /api/lessons/search` | Custom limiter | Debounce client-side |
| `GET /api/nursing/question-topics/*` | Content browse limiter | Cache results |

Rate-limited responses return HTTP `429`. Mobile should:
- Check `Retry-After` header when present
- Implement exponential backoff for automated retries
- Display user-friendly "Please try again" messages

### 17.5 Response Case Convention

The server uses **camelCase** for all JSON response keys (snake_case DB columns are converted via `snakeToCamel` helper). Mobile can generally rely on camelCase.

> **Edge case:** Some raw SQL responses may occasionally use snake_case if the `snakeToCamel` conversion was missed. Mobile should handle both cases defensively for maximum robustness.

### 17.6 Timestamps

All timestamps are returned as ISO-8601 strings. The server uses UTC internally.

### 17.7 Batch / Retry / Resume Semantics

| Scenario | Approach |
|----------|----------|
| **Batch operations** | `POST /api/decks/:id/cards/bulk-import` is the only batch endpoint. All other mutations are single-item. |
| **Idempotency** | No idempotency keys are supported. Duplicate `POST` requests may create duplicate records. Mobile should debounce user actions and prevent double-submission. |
| **Resume after disconnect** | Mock exam progress can be saved and resumed via `PUT /api/mock-exams/:attemptId/progress`. Study sessions can be updated via `PUT /api/study-sessions/:id`. QOTD answer returns `409` if already submitted (safe to retry). |
| **Retry safety** | All `GET` endpoints are safe to retry. `POST /api/qotd/answer` is idempotent (409 on duplicate). Other `POST` endpoints are **not** idempotent — retry with caution. |
| **Offline queue replay** | No server-side batch sync endpoint exists. Mobile must replay queued requests sequentially and handle conflicts. |
