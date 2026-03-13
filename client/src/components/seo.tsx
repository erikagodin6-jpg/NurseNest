import { useEffect, useRef } from "react";
import { SUPPORTED_LOCALES, getLocaleFromPath } from "@/lib/locale-utils";
import { buildBreadcrumbs, buildBreadcrumbJsonLd, type BreadcrumbItem } from "@/lib/breadcrumb-builder";

const SITE_DOMAIN = "https://www.nursenest.ca";
let seoFirstRender = true;

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogType?: string;
  noindex?: boolean;
  structuredData?: Record<string, any>;
  additionalStructuredData?: Record<string, any>[];
  breadcrumbs?: BreadcrumbItem[];
  noBreadcrumbs?: boolean;
}

export function SEO({ title, description, keywords, canonicalPath, ogType = "website", noindex, structuredData, additionalStructuredData, breadcrumbs, noBreadcrumbs }: SEOProps) {
  useEffect(() => {
    const fullTitle = title.includes("NurseNest") ? title : `${title} | NurseNest`;
    document.title = fullTitle;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    if (noindex) {
      setMeta("robots", "noindex, follow");
    } else {
      const robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
      if (robotsMeta && robotsMeta.content.includes("noindex")) {
        robotsMeta.remove();
      }
    }

    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:type", ogType, true);
    setMeta("og:image", "https://www.nursenest.ca/opengraph.jpg", true);
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:image", "https://www.nursenest.ca/opengraph.jpg");

    const hreflangLinks: HTMLLinkElement[] = [];

    if (canonicalPath) {
      const { pathWithoutLocale } = getLocaleFromPath(canonicalPath);
      const basePath = pathWithoutLocale === "/" ? "" : pathWithoutLocale;

      const currentPath = window.location.pathname;
      const { locale: activeLocale } = getLocaleFromPath(currentPath);
      const localePrefix = activeLocale && activeLocale !== "en" ? `/${activeLocale}` : "/en";
      const canonicalUrl = basePath
        ? `${SITE_DOMAIN}${localePrefix}${basePath}`
        : `${SITE_DOMAIN}${localePrefix}`;

      setMeta("og:url", canonicalUrl, true);

      const isFirstRender = seoFirstRender;
      seoFirstRender = false;

      const existingCanonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      const ssrCanonicalCorrect = isFirstRender && existingCanonical && existingCanonical.href === canonicalUrl;

      if (!ssrCanonicalCorrect) {
        let link = existingCanonical;
        if (!link) {
          link = document.createElement("link");
          link.rel = "canonical";
          document.head.appendChild(link);
        }
        link.href = canonicalUrl;
      }

      const existingHreflangs = document.querySelectorAll('link[rel="alternate"][hreflang]');
      const ssrHreflangsCorrect = isFirstRender && existingHreflangs.length > 0;

      if (!ssrHreflangsCorrect) {
        existingHreflangs.forEach(el => el.remove());

        for (const locale of SUPPORTED_LOCALES) {
          const altLink = document.createElement("link");
          altLink.rel = "alternate";
          altLink.hreflang = locale;
          altLink.href = `${SITE_DOMAIN}/${locale}${basePath}`;
          document.head.appendChild(altLink);
          hreflangLinks.push(altLink);
        }

        const xDefaultLink = document.createElement("link");
        xDefaultLink.rel = "alternate";
        xDefaultLink.hreflang = "x-default";
        xDefaultLink.href = `${SITE_DOMAIN}/en${basePath}`;
        document.head.appendChild(xDefaultLink);
        hreflangLinks.push(xDefaultLink);
      }
    }

    const scriptIds: string[] = [];

    if (structuredData) {
      let script = document.getElementById("structured-data") as HTMLScriptElement;
      if (!script) {
        script = document.createElement("script");
        script.id = "structured-data";
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
      scriptIds.push("structured-data");
    }

    if (additionalStructuredData) {
      const filtered = additionalStructuredData.filter(
        (data) => data["@type"] !== "BreadcrumbList"
      );
      filtered.forEach((data, i) => {
        const id = `structured-data-${i}`;
        let script = document.getElementById(id) as HTMLScriptElement;
        if (!script) {
          script = document.createElement("script");
          script.id = id;
          script.type = "application/ld+json";
          document.head.appendChild(script);
        }
        script.textContent = JSON.stringify(data);
        scriptIds.push(id);
      });
    }

    if (!noindex && !noBreadcrumbs) {
      const currentPath = window.location.pathname;
      const items = breadcrumbs && breadcrumbs.length > 0
        ? breadcrumbs
        : buildBreadcrumbs(currentPath, { title });

      if (items.length >= 2) {
        const jsonLd = buildBreadcrumbJsonLd(items);
        const existing = document.getElementById("breadcrumb-jsonld");
        if (existing) existing.remove();

        const script = document.createElement("script");
        script.id = "breadcrumb-jsonld";
        script.type = "application/ld+json";
        script.textContent = JSON.stringify(jsonLd);
        document.head.appendChild(script);
        scriptIds.push("breadcrumb-jsonld");
      }
    }

    return () => {
      const mainScript = document.getElementById("structured-data");
      if (mainScript) mainScript.remove();
      scriptIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
      hreflangLinks.forEach((el) => el.remove());
      if (noindex) {
        const robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement;
        if (robotsMeta) robotsMeta.remove();
      }
    };
  }, [title, description, keywords, canonicalPath, ogType, noindex, structuredData, additionalStructuredData, breadcrumbs, noBreadcrumbs]);

  return null;
}
