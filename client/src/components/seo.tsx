import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalPath?: string;
  ogType?: string;
  structuredData?: Record<string, any>;
}

export function SEO({ title, description, keywords, canonicalPath, ogType = "website", structuredData }: SEOProps) {
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

    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", description, true);
    setMeta("og:type", ogType, true);
    setMeta("twitter:title", fullTitle, true);
    setMeta("twitter:description", description, true);
    setMeta("twitter:card", "summary_large_image", true);

    if (canonicalPath) {
      const base = window.location.origin;
      const url = `${base}${canonicalPath}`;
      setMeta("og:url", url, true);
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = url;
    }

    if (structuredData) {
      let script = document.getElementById("structured-data") as HTMLScriptElement;
      if (!script) {
        script = document.createElement("script");
        script.id = "structured-data";
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    return () => {
      const script = document.getElementById("structured-data");
      if (script) script.remove();
    };
  }, [title, description, keywords, canonicalPath, ogType, structuredData]);

  return null;
}
