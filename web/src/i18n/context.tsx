import { applyDocumentLocale, LOCALE_ENDONYMS } from "@hermes/shared/i18n";
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import type { Locale, Translations } from "./types";
import { en } from "./en";
import { zh } from "./zh";
import { zhHant } from "./zh-hant";
import { ja } from "./ja";
import { de } from "./de";
import { es } from "./es";
import { fr } from "./fr";
import { tr } from "./tr";
import { uk } from "./uk";
import { af } from "./af";
import { ko } from "./ko";
import { it } from "./it";
import { ga } from "./ga";
import { pt } from "./pt";
import { ru } from "./ru";
import { hu } from "./hu";
import { ar } from "./ar";
import { fa } from "./fa";

const TRANSLATIONS: Record<Locale, Translations> = {
  en,
  zh,
  "zh-hant": zhHant,
  ja,
  de,
  es,
  fr,
  tr,
  uk,
  af,
  ko,
  it,
  ga,
  pt,
  ru,
  hu,
  ar,
  fa,
};

const SUPPORTED_LOCALES = Object.keys(TRANSLATIONS) as Locale[];

// Display metadata for the language picker — endonyms from @hermes/shared so the
// desktop and web pickers can never disagree on a language's native name.
export const LOCALE_META: Record<Locale, { name: string }> = Object.fromEntries(
  SUPPORTED_LOCALES.map((id) => [id, { name: LOCALE_ENDONYMS[id] }]),
) as Record<Locale, { name: string }>;

const STORAGE_KEY = "hermes-locale";

function isLocale(value: string): value is Locale {
  return (SUPPORTED_LOCALES as string[]).includes(value);
}

export function getInitialLocale(): Locale {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && isLocale(stored)) return stored;
  } catch {
    // SSR or privacy mode
  }
  // 回退到浏览器语言：波斯语用户首次打开即得波斯语（用户显式选择仍优先）。
  // 否则 dist 安装后默认英文，与"面向波斯语用户"的定位相悖。
  try {
    const tags = navigator.languages?.length ? navigator.languages : [navigator.language];
    for (const tag of tags) {
      const base = String(tag ?? "").toLowerCase().split("-")[0];
      if (base && isLocale(base)) return base;
    }
  } catch {
    // navigator 不可用（测试环境等）
  }
  return "en";
}

interface I18nContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Translations;
}

const I18nContext = createContext<I18nContextValue>({
  locale: "en",
  setLocale: () => {},
  t: en,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getInitialLocale);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    applyDocumentLocale(locale);
  }, [locale]);

  const value: I18nContextValue = {
    locale,
    setLocale,
    t: TRANSLATIONS[locale],
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
