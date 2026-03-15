import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { getLocaleFromPath, isValidLocale, buildLocalePath, deLocalizeSlug, localizeSlug, type SupportedLocale } from "./locale-utils";

export type LanguageCode = "en" | "fr" | "tl" | "hi" | "es" | "zh" | "ar" | "ko" | "pt" | "pa" | "vi" | "ht" | "ur" | "ja" | "fa";

export const LANGUAGES: { code: LanguageCode; name: string; nativeName: string; flag: string }[] = [
  { code: "en", name: "English", nativeName: "English", flag: "\ud83c\uddec\ud83c\udde7" },
  { code: "fr", name: "French", nativeName: "Fran\u00e7ais", flag: "\ud83c\uddeb\ud83c\uddf7" },
  { code: "tl", name: "Filipino", nativeName: "Tagalog", flag: "\ud83c\uddf5\ud83c\udded" },
  { code: "hi", name: "Hindi", nativeName: "\u0939\u093f\u0928\u094d\u0926\u0940", flag: "\ud83c\uddee\ud83c\uddf3" },
  { code: "es", name: "Spanish", nativeName: "Espa\u00f1ol", flag: "\ud83c\uddea\ud83c\uddf8" },
  { code: "zh", name: "Chinese", nativeName: "\u4e2d\u6587", flag: "\ud83c\udde8\ud83c\uddf3" },
  { code: "ar", name: "Arabic", nativeName: "\u0627\u0644\u0639\u0631\u0628\u064a\u0629", flag: "\ud83c\uddf8\ud83c\udde6" },
  { code: "ko", name: "Korean", nativeName: "\ud55c\uad6d\uc5b4", flag: "\ud83c\uddf0\ud83c\uddf7" },
  { code: "pt", name: "Portuguese", nativeName: "Portugu\u00eas", flag: "\ud83c\udde7\ud83c\uddf7" },
  { code: "pa", name: "Punjabi", nativeName: "\u0a2a\u0a70\u0a1c\u0a3e\u0a2c\u0a40", flag: "\ud83c\udde8\ud83c\udde6" },
  { code: "vi", name: "Vietnamese", nativeName: "Ti\u1ebfng Vi\u1ec7t", flag: "\ud83c\uddfb\ud83c\uddf3" },
  { code: "ht", name: "Haitian Creole", nativeName: "Krey\u00f2l Ayisyen", flag: "\ud83c\udded\ud83c\uddf9" },
  { code: "ur", name: "Urdu", nativeName: "\u0627\u0631\u062f\u0648", flag: "\ud83c\uddf5\ud83c\uddf0" },
  { code: "ja", name: "Japanese", nativeName: "\u65e5\u672c\u8a9e", flag: "\ud83c\uddef\ud83c\uddf5" },
  { code: "fa", name: "Farsi", nativeName: "\u0641\u0627\u0631\u0633\u06cc", flag: "\ud83c\uddee\ud83c\uddf7" },
];

const translations: Partial<Record<LanguageCode, Record<string, string>>> & { en: Record<string, string> } = {
  en: {},
};

let enLoaded = false;
const enReady = import("./i18n-en").then((m) => {
  Object.assign(translations.en, m.default);
  enLoaded = true;
});

import("./i18n-translations").then((m) => {
  const data = m.default;
  Object.entries(data).forEach(([lang, strings]) => {
    translations[lang as LanguageCode] = strings as Record<string, string>;
  });
});

type I18nContextType = {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, vars?: Record<string, string>) => string;
};

const I18nContext = createContext<I18nContextType>({
  language: "en",
  setLanguage: () => {},
  t: (key: string, _vars?: Record<string, string>) => key,
});

function localeToLanguage(locale: SupportedLocale): LanguageCode {
  if (locale === "fil") return "tl";
  return locale as LanguageCode;
}

function languageToLocale(lang: LanguageCode): SupportedLocale {
  if (lang === "tl") return "fil";
  return lang as SupportedLocale;
}

function getInitialLanguage(): LanguageCode {
  const { locale } = getLocaleFromPath(window.location.pathname);
  if (isValidLocale(locale)) {
    return localeToLanguage(locale);
  }
  const saved = localStorage.getItem("nursenest-language");
  if (saved && LANGUAGES.some(l => l.code === saved)) {
    return saved as LanguageCode;
  }
  const browserLang = navigator.language?.split("-")[0]?.toLowerCase();
  if (browserLang && LANGUAGES.some(l => l.code === browserLang)) {
    return browserLang as LanguageCode;
  }
  return "en";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(getInitialLanguage);
  const [ready, setReady] = useState(enLoaded);

  useEffect(() => {
    if (!ready) {
      enReady.then(() => setReady(true));
    }
  }, [ready]);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem("nursenest-language", lang);
    document.documentElement.lang = lang;
    if (lang === "ar" || lang === "ur" || lang === "fa") {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }

    const newLocale = languageToLocale(lang);
    const currentPath = window.location.pathname;
    const { locale: currentLocale, pathWithoutLocale } = getLocaleFromPath(currentPath);
    const englishPath = deLocalizeSlug(currentLocale, pathWithoutLocale);
    const newPath = buildLocalePath(newLocale, englishPath);
    if (currentPath !== newPath) {
      window.location.assign(newPath);
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
    if (language === "ar" || language === "ur" || language === "fa") {
      document.documentElement.dir = "rtl";
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("nursenest-language", language);
  }, [language]);

  const t = (key: string, vars?: Record<string, string>): string => {
    let val = translations[language]?.[key] || translations.en[key];
    if (!val && typeof window !== "undefined" && (window as any).__DEV_MODE !== false) {
      if (process.env.NODE_ENV === "development" || import.meta.env?.DEV) {
        console.warn(`[i18n] Missing translation key: "${key}" for language "${language}"`);
      }
    }
    val = val || key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        val = val.replace(new RegExp(`\\{\\{${k}\\}\\}`, "g"), v);
      }
    }
    return val;
  };

  if (!ready) return null;

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
