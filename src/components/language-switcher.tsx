"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe2 } from "lucide-react";

const languageLocales = ["en", "de", "es", "pt"] as const;

const localeLabels: Record<(typeof languageLocales)[number], string> = {
  en: "English",
  de: "Deutsch",
  es: "Español",
  pt: "Português",
};

function stripLocalePrefix(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  const first = parts[0];
  if (languageLocales.includes(first as (typeof languageLocales)[number])) {
    return `/${parts.slice(1).join("/")}`.replace(/\/$/, "") || "/";
  }
  return pathname || "/";
}

function localizedHref(pathname: string, locale: string) {
  const basePath = stripLocalePrefix(pathname);
  if (locale === "en") return basePath;
  return basePath === "/" ? `/${locale}` : `/${locale}${basePath}`;
}

export function LanguageSwitcher({ locale = "en" }: { locale?: string }) {
  const pathname = usePathname();

  return (
    <div className="hidden items-center gap-1 rounded-md border border-slate-800 bg-slate-950/70 px-2 py-1 text-sm font-black text-slate-300 sm:flex">
      <Globe2 className="h-4 w-4 text-amber-300" />
      {languageLocales.map((targetLocale) => (
        <Link
          key={targetLocale}
          href={localizedHref(pathname, targetLocale)}
          className={`rounded px-2 py-1 transition hover:bg-amber-400/10 hover:text-amber-100 ${targetLocale === locale ? "bg-amber-400 text-slate-950 hover:bg-amber-300 hover:text-slate-950" : ""}`}
        >
          {localeLabels[targetLocale]}
        </Link>
      ))}
    </div>
  );
}
