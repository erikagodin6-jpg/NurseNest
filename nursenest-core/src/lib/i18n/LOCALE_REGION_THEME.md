# Locale, region, and theme (Phase 3)

## Resolution order

1. **Marketing UI locale** — Taken from the URL prefix: paths under `/{locale}/…` use that `locale` for `MarketingI18nProvider` (with messages = `marketing-en.json` merged with `content/locale/marketing-{locale}.json`). Paths without a prefix (`/`, `/pricing`, …) use **`en`**.
2. **Clinical / catalog region (US vs CA)** — `useNursenestRegion()` (client persistence). Independent of marketing locale; it only affects copy that references measurements, exam names, and similar region-specific content.
3. **Theme** — `AppThemeProvider` (`next-themes`, `data-theme` on `<html>`). Default theme is **lavender** (`NURSENEST_DEFAULT_THEME`). Region and locale do not change the theme automatically.

## Non-conflicting behavior

- Changing **language** does not reset **region** or **theme**.
- Changing **region** does not change **locale** or **theme**.
- **Exam** surfaces (see `(student)/app/exams`) do not import marketing i18n or `MarketingI18nProvider`; they keep the isolated exam shell from the structural pass.

## Payload loading

- **English (`en`)**: `marketing-en.json` is loaded on the server for `(default)` and `[locale]` marketing layouts and for the admin shell (same messages object passed into the client provider).
- **Other locales**: the same English base is merged with a **lazy** dynamic import of `content/locale/marketing-{locale}.json` when rendering a `/{locale}/…` route (separate webpack chunk per locale file).
