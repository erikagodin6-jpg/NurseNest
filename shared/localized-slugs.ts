export const LOCALIZED_SLUGS: Record<string, Record<string, string>> = {
  fr: {
    "pricing": "tarifs",
    "lessons": "lecons",
    "flashcards": "cartes-memoire",
    "question-bank": "banque-questions",
    "about": "a-propos",
    "contact": "contact",
    "faq": "faq",
    "blog": "blogue",
    "glossary": "glossaire",
    "shop": "boutique",
    "nursing": "soins-infirmiers",
    "exam-prep": "preparation-examen",
    "topics": "sujets",
    "guides": "guides",
  },
  es: {
    "pricing": "precios",
    "lessons": "lecciones",
    "flashcards": "tarjetas",
    "question-bank": "banco-preguntas",
    "about": "acerca-de",
    "contact": "contacto",
    "faq": "preguntas-frecuentes",
    "blog": "blog",
    "glossary": "glosario",
    "shop": "tienda",
    "nursing": "enfermeria",
    "exam-prep": "preparacion-examen",
    "topics": "temas",
    "guides": "guias",
  },
};

const _reverseCache: Record<string, Record<string, string>> = {};

function getReverseMap(locale: string): Record<string, string> {
  if (_reverseCache[locale]) return _reverseCache[locale];
  const map = LOCALIZED_SLUGS[locale];
  if (!map) return {};
  const reverse: Record<string, string> = {};
  for (const [english, localized] of Object.entries(map)) {
    if (english !== localized) {
      reverse[localized] = english;
    }
  }
  _reverseCache[locale] = reverse;
  return reverse;
}

export function localizeSlug(locale: string, englishPath: string): string {
  const map = LOCALIZED_SLUGS[locale];
  if (!map) return englishPath;

  const cleanPath = englishPath.startsWith("/") ? englishPath.slice(1) : englishPath;
  const segments = cleanPath.split("/");
  const firstSegment = segments[0];

  if (map[firstSegment] && map[firstSegment] !== firstSegment) {
    segments[0] = map[firstSegment];
    return "/" + segments.join("/");
  }

  return englishPath.startsWith("/") ? englishPath : "/" + englishPath;
}

export function deLocalizeSlug(locale: string, localizedPath: string): string {
  const reverse = getReverseMap(locale);
  if (!reverse || Object.keys(reverse).length === 0) return localizedPath;

  const cleanPath = localizedPath.startsWith("/") ? localizedPath.slice(1) : localizedPath;
  const segments = cleanPath.split("/");
  const firstSegment = segments[0];

  if (reverse[firstSegment]) {
    segments[0] = reverse[firstSegment];
    return "/" + segments.join("/");
  }

  return localizedPath.startsWith("/") ? localizedPath : "/" + localizedPath;
}

export function getEnglishSlugFromLocalized(locale: string, localizedSlug: string): string | null {
  const reverse = getReverseMap(locale);
  return reverse[localizedSlug] || null;
}

export function getLocalizedSlugFromEnglish(locale: string, englishSlug: string): string | null {
  const map = LOCALIZED_SLUGS[locale];
  if (!map) return null;
  const localized = map[englishSlug];
  if (localized && localized !== englishSlug) return localized;
  return null;
}

export function getAllLocalizedSlugs(): Array<{ locale: string; english: string; localized: string }> {
  const result: Array<{ locale: string; english: string; localized: string }> = [];
  for (const [locale, map] of Object.entries(LOCALIZED_SLUGS)) {
    for (const [english, localized] of Object.entries(map)) {
      if (english !== localized) {
        result.push({ locale, english, localized });
      }
    }
  }
  return result;
}
