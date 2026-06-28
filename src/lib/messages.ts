import deMessages from "@/locales/de.json";
import enMessages from "@/locales/en.json";
import esMessages from "@/locales/es.json";
import ptMessages from "@/locales/pt.json";
import { DEFAULT_LOCALE, isSupportedLocale, type SupportedLocale } from "./content";

export type SiteMessages = typeof enMessages;

const messagesByLocale: Record<SupportedLocale, SiteMessages> = {
  en: enMessages,
  de: deMessages,
  es: esMessages,
  pt: ptMessages,
};

export function getMessagesForLocale(locale: string): SiteMessages {
  return messagesByLocale[isSupportedLocale(locale) ? locale : DEFAULT_LOCALE];
}
