import { enContent } from "@/lib/i18n/en";
import { simplifiedContent } from "@/lib/i18n/simplified";
import { traditionalContent } from "@/lib/i18n/traditional";
import type { Language, SiteContent } from "@/lib/i18n/types";

export const LANGUAGE_STORAGE_KEY = "aesir-kino-language";

export const languages: readonly Language[] = [
  "en",
  "traditional",
  "simplified"
];

export const languageNames: Record<Language, string> = {
  en: "English",
  traditional: "繁體中文",
  simplified: "简体中文"
};

export const contentByLanguage: Record<Language, SiteContent> = {
  en: enContent,
  traditional: traditionalContent,
  simplified: simplifiedContent
};

export function isLanguage(value: unknown): value is Language {
  return typeof value === "string" && languages.includes(value as Language);
}

export function interpolate(template: string, values: Record<string, string>): string {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replaceAll(`{{${key}}}`, value),
    template
  );
}

export type { Language, SiteContent } from "@/lib/i18n/types";
