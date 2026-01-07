import { cookies } from "next/headers";
import idMessages from "@/messages/id.json";
import enMessages from "@/messages/en.json";
import zhMessages from "@/messages/zh.json";

export type Locale = "id" | "en" | "zh";

const DICTIONARIES: Record<Locale, Record<string, string>> = {
  id: idMessages,
  en: enMessages,
  zh: zhMessages,
};

export async function getServerLocale(defaultLocale: Locale = "id"): Promise<Locale> {
  const cookieStore = await cookies();
  const raw = cookieStore.get("lang")?.value || cookieStore.get("locale")?.value;
  if (raw === "id" || raw === "en" || raw === "zh") return raw;
  return defaultLocale;
}

export function getMessages(locale: Locale): Record<string, string> {
  return DICTIONARIES[locale] ?? DICTIONARIES.id;
}

export function tServer(locale: Locale, key: string, fallback?: string) {
  const messages = getMessages(locale);
  return messages[key] ?? fallback ?? key;
}
