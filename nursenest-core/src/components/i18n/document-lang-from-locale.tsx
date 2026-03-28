"use client";

import { useEffect } from "react";
import { marketingLocaleToHtmlLang } from "@/lib/i18n/marketing-html-lang";

/**
 * Sets document.documentElement.lang for marketing surfaces so non-English routes
 * are not stuck on the root layout's default (en).
 */
export function DocumentLangFromLocale({ locale }: { locale: string }) {
  useEffect(() => {
    const tag = marketingLocaleToHtmlLang(locale);
    const prev = document.documentElement.lang;
    document.documentElement.lang = tag;
    return () => {
      document.documentElement.lang = prev;
    };
  }, [locale]);
  return null;
}
