"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import idMessages from "@/messages/id.json";
import enMessages from "@/messages/en.json";
import zhMessages from "@/messages/zh.json";

const SUPPORTED_LOCALES = ["id", "en", "zh"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

type Messages = Record<string, string>;

type I18nContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, fallback?: string) => string;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

const DICTIONARIES: Record<Locale, Messages> = {
  id: idMessages,
  en: enMessages,
  zh: zhMessages,
};

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("id");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const cookieLang = document.cookie
      ?.split(";")
      .map(c => c.trim())
      .find(c => c.startsWith("lang="))
      ?.split("=")?.[1] as Locale | undefined;
    const stored = (localStorage.getItem("lang") as Locale | null) ?? cookieLang ?? null;
    if (stored && SUPPORTED_LOCALES.includes(stored)) {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", next);
      document.cookie = `lang=${next}; path=/; max-age=31536000; SameSite=Lax`;
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  const value = useMemo<I18nContextType>(
    () => ({
      locale,
      setLocale,
      t: (key: string, fallback?: string) => DICTIONARIES[locale]?.[key] ?? fallback ?? key,
    }),
    [locale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
}
