import type { Express, Request, Response, NextFunction } from "express";

const TIMESTAMP_SUFFIX_REGEX = /-(\d{10,13})$/;

const KNOWN_REDIRECTS: Record<string, string> = {
  "oxygenation-vs-ventilation-critical-differences": "oxygenation-vs-ventilation-clinical-distinction",
  "create-more-posts-about-hyperkalemia": "hyperkalemia-nursing-guide",
  "test-publish-flow-1772145129698": "",
};

const LOCALE_PATTERN = /^\/([a-z]{2}(?:-[a-z]{2,4})?)(?=\/)/i;

function stripTimestampSuffix(slug: string): string | null {
  const match = slug.match(TIMESTAMP_SUFFIX_REGEX);
  if (match) {
    return slug.replace(TIMESTAMP_SUFFIX_REGEX, "");
  }
  return null;
}

function resolveCanonicalSlug(slug: string): string | null {
  let canonical = stripTimestampSuffix(slug);
  const resolvedSlug = canonical || slug;

  if (KNOWN_REDIRECTS[resolvedSlug] !== undefined) {
    const target = KNOWN_REDIRECTS[resolvedSlug];
    if (!target) return canonical;
    return target;
  }

  return canonical;
}

export function setupSeoRedirects(app: Express) {
  app.use((req: Request, res: Response, next: NextFunction) => {
    const path = req.path;

    let localePart = "";
    let restPath = path;

    const localeMatch = path.match(LOCALE_PATTERN);
    if (localeMatch) {
      localePart = `/${localeMatch[1]}`;
      restPath = path.slice(localeMatch[0].length);
    }

    const learnMatch = restPath.match(/^\/learn\/(.+?)$/);
    const lessonMatch = restPath.match(/^\/lessons\/(.+?)$/);

    const slug = learnMatch?.[1] || lessonMatch?.[1];
    if (!slug) return next();

    const canonicalSlug = resolveCanonicalSlug(slug);
    if (canonicalSlug && canonicalSlug !== slug) {
      const prefix = learnMatch ? "learn" : "lessons";
      res.redirect(301, `${localePart}/${prefix}/${canonicalSlug}`);
      return;
    }

    if (canonicalSlug === null && KNOWN_REDIRECTS[slug] !== undefined) {
      const target = KNOWN_REDIRECTS[slug];
      if (!target) return next();
      const prefix = learnMatch ? "learn" : "lessons";
      res.redirect(301, `${localePart}/${prefix}/${target}`);
      return;
    }

    next();
  });
}

export function isTimestampDuplicate(slug: string): boolean {
  return TIMESTAMP_SUFFIX_REGEX.test(slug);
}

export function getCanonicalSlug(slug: string): string {
  const canonical = stripTimestampSuffix(slug);
  return canonical || slug;
}
