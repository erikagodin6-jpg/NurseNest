# NurseNest - Complete Nursing Learning Platform

## Overview

NurseNest is a nursing education platform targeting RPN/LVN, RN, and NP students. It provides interactive lessons organized by body system (cardiovascular, respiratory, neurological, etc.), flashcards with quiz-style questions, and performance analytics/reports. The platform supports both US and Canadian nursing standards with a region toggle. Content covers clinical pathophysiology, medication safety, NCLEX/REX-PN exam preparation, and condition recognition patterns.

The app is a full-stack TypeScript monorepo with a React frontend, Express backend, and PostgreSQL database using Drizzle ORM. Currently, most content (lessons, flashcards) is hardcoded in the frontend components rather than stored in the database. The storage layer has a basic in-memory implementation with a `MemStorage` class that can be swapped for a database-backed implementation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript (no RSC/server components)
- **Routing**: Wouter (lightweight client-side router)
- **State Management**: TanStack React Query for server state, React useState for local state
- **UI Components**: shadcn/ui (new-york style) with Radix UI primitives
- **Styling**: Tailwind CSS v4 with `@tailwindcss/vite` plugin, CSS custom properties for theming
- **Theming**: `next-themes` library with `data-theme` attribute. Supports 4 themes: lavender (default), mint, blush, slate. Theme colors defined as CSS variables in `client/src/index.css`
- **Font**: DM Sans from Google Fonts
- **Build Tool**: Vite with React plugin
- **Path Aliases**: `@/` → `client/src/`, `@shared/` → `shared/`, `@assets/` → `attached_assets/`

### Pages
- `/` - Home (marketing/landing page)
- `/lessons` - Lesson catalog organized by body system with tabs for RPN and RN tracks
- `/lessons/:id` - Individual lesson detail with pathophysiology content, medications, clinical pearls, and quizzes
- `/flashcards` - Interactive flashcard system with question and term card types, bookmarking, and scoring
- `/reports` - Performance analytics dashboard (currently static/mock data)

### Backend Architecture
- **Framework**: Express 5 on Node.js with TypeScript (tsx for dev, esbuild for production)
- **API Pattern**: RESTful API with `/api` prefix (routes defined in `server/routes.ts`)
- **Server Entry**: `server/index.ts` creates HTTP server, registers routes, sets up Vite dev middleware or serves static files
- **Development**: Vite dev server runs as Express middleware with HMR via WebSocket at `/vite-hmr`
- **Production Build**: Client built with Vite to `dist/public/`, server bundled with esbuild to `dist/index.cjs`
- **Static Serving**: In production, Express serves `dist/public/` with SPA fallback to `index.html`

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` - shared between client and server
- **Current Schema**: Only a `users` table with id (UUID), username, password
- **Migration Tool**: Drizzle Kit with `db:push` command for schema pushing
- **Storage Interface**: `server/storage.ts` defines `IStorage` interface with `MemStorage` in-memory implementation. This is designed to be replaced with a `DatabaseStorage` implementation using Drizzle
- **Validation**: Zod schemas generated from Drizzle schema via `drizzle-zod`

### Content Architecture
- Lesson content and flashcard data are currently hardcoded as TypeScript objects in the page components (`lesson-detail.tsx`, `flashcards.tsx`)
- Content covers nursing topics: cardiovascular, respiratory, neurological, pediatric, GI, skin disorders, ABG analysis, and more
- The `attached_assets/` directory contains reference text files with detailed nursing content that should be incorporated into the platform

### Build System
- **Dev**: `npm run dev` runs tsx to start Express with Vite middleware
- **Build**: `npm run build` runs `script/build.ts` which builds client with Vite and server with esbuild
- **Production**: `npm start` runs the bundled `dist/index.cjs`
- **Server bundling**: Dependencies in the allowlist are bundled into the server output to reduce cold start syscalls; others are external

## External Dependencies

### Database
- **PostgreSQL** via `DATABASE_URL` environment variable
- **Drizzle ORM** for query building and schema management
- **connect-pg-simple** for session storage (available but not yet wired up)

### Key npm Dependencies
- **UI**: Full shadcn/ui component library with Radix UI primitives, Lucide icons, `class-variance-authority`, `embla-carousel-react`, `recharts`, `react-day-picker`, `vaul` (drawer), `cmdk` (command palette), `react-resizable-panels`
- **Forms**: `react-hook-form` with `@hookform/resolvers` and Zod validation
- **Dates**: `date-fns`
- **Replit-specific**: `@replit/vite-plugin-runtime-error-modal`, `@replit/vite-plugin-cartographer` (dev only), `@replit/vite-plugin-dev-banner` (dev only)
- **Build allowlist hints at planned integrations**: `@google/generative-ai`, `openai`, `stripe`, `passport`, `passport-local`, `jsonwebtoken`, `express-session`, `nodemailer`, `multer`, `xlsx` — these are listed in the build script but may not yet be implemented

### Planned/Partial Integrations (from build allowlist)
- **AI**: Google Generative AI and OpenAI SDKs (for potential AI-powered study features)
- **Payments**: Stripe
- **Auth**: Passport.js with local strategy, JWT, express-session
- **Email**: Nodemailer
- **File Upload**: Multer
- **Spreadsheets**: xlsx library