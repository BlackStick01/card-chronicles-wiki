"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown, Globe2 } from "lucide-react";

const languageLocales = ["en", "de", "es", "pt"] as const;

const localeLabels: Record<(typeof languageLocales)[number], string> = {
  en: "English",
  de: "Deutsch",
  es: "Espa\u00f1ol",
  pt: "Portugu\u00eas",
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
  const [open, setOpen] = useState(false);
  const activeLocale = languageLocales.includes(locale as (typeof languageLocales)[number])
    ? (locale as (typeof languageLocales)[number])
    : "en";

  return (
    <div className="relative hidden sm:block">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex h-10 items-center gap-2 rounded-md border border-slate-800 bg-slate-950/80 px-3 text-sm font-black text-slate-200 transition hover:border-amber-400/50 hover:text-amber-100"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <Globe2 className="h-4 w-4 text-amber-300" />
        <span className="min-w-16 text-left">{localeLabels[activeLocale]}</span>
        <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-12 z-50 w-44 overflow-hidden rounded-md border border-slate-800 bg-slate-950 shadow-2xl shadow-black/40" role="menu">
          {languageLocales.map((targetLocale) => (
            <Link
              key={targetLocale}
              href={localizedHref(pathname, targetLocale)}
              onClick={() => setOpen(false)}
              className={`block px-4 py-3 text-sm font-black transition hover:bg-amber-400/10 hover:text-amber-100 ${
                targetLocale === activeLocale
                  ? "bg-amber-400 text-slate-950 hover:bg-amber-300 hover:text-slate-950"
                  : "text-slate-300"
              }`}
              role="menuitem"
            >
              {localeLabels[targetLocale]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
