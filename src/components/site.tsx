import Image from "next/image";
import Link from "next/link";
import { BookOpen, Gamepad2, Shield, Sparkles } from "lucide-react";
import { NAVIGATION_CONFIG } from "@/config/navigation";
import messages from "@/locales/en.json";
import { getArticlePath, getLatestContent, localizePath } from "@/lib/content";
import { LanguageSwitcher } from "./language-switcher";

const OFFICIAL_ROBLOX_URL = "https://www.roblox.com/games/114758508835875/Card-Chronicles";
const OFFICIAL_GROUP_URL = "https://www.roblox.com/communities/35338731/Chronicle-Entertainment";

export function SiteHeader({ locale = "en" }: { locale?: string }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#090b12]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-3 sm:px-6 lg:px-8">
        <Link href={localizePath("/", locale)} className="flex min-w-0 items-center gap-3">
          <Image
            src="/images/main-capsule.webp"
            alt="Card Chronicles official Roblox thumbnail"
            width={112}
            height={64}
            className="h-11 w-20 rounded-sm object-cover shadow-lg shadow-black/40"
            priority
          />
          <div className="hidden min-w-0 sm:block">
            <div className="truncate text-sm font-black uppercase tracking-wide text-amber-100">{messages.site.shortName}</div>
            <div className="hidden text-xs text-slate-400 sm:block">{messages.site.tagline}</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {Object.values(NAVIGATION_CONFIG).map((item) => (
            <Link key={item.key} href={localizePath(item.href, locale)} className="rounded-md px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-amber-400/10 hover:text-amber-100">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <a href={OFFICIAL_ROBLOX_URL} className="rounded-md bg-amber-400 px-4 py-2 text-sm font-black text-slate-950 shadow-lg shadow-amber-950/30 transition hover:bg-amber-300" target="_blank" rel="noreferrer">
            Roblox
          </a>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter({ locale = "en" }: { locale?: string }) {
  return (
    <footer className="border-t border-slate-800 bg-[#080a10]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <h2 className="text-xl font-black text-slate-50">{messages.footer.aboutTitle}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">{messages.footer.about}</p>
          <p className="mt-4 text-xs text-slate-500">{messages.site.legalNotice}</p>
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-wide text-amber-200">Official Links</h3>
          <div className="mt-4 grid gap-3 text-sm">
            <a className="text-slate-300 hover:text-amber-200" href={OFFICIAL_ROBLOX_URL} target="_blank" rel="noreferrer">Official Roblox Page</a>
            <a className="text-slate-300 hover:text-amber-200" href={OFFICIAL_GROUP_URL} target="_blank" rel="noreferrer">Chronicle Entertainment</a>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-black uppercase tracking-wide text-amber-200">Site</h3>
          <div className="mt-4 grid gap-3 text-sm">
            <Link className="text-slate-300 hover:text-amber-200" href={localizePath("/about", locale)}>About</Link>
            <Link className="text-slate-300 hover:text-amber-200" href={localizePath("/privacy-policy", locale)}>{messages.footer.privacyPolicy}</Link>
            <Link className="text-slate-300 hover:text-amber-200" href={localizePath("/terms-of-service", locale)}>{messages.footer.termsOfService}</Link>
            <Link className="text-slate-300 hover:text-amber-200" href={localizePath("/copyright", locale)}>Copyright</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function WikiSidebar({ locale = "en" }: { locale?: string }) {
  const latest = getLatestContent(6, locale);
  return (
    <aside className="space-y-5">
      <div className="rounded-lg border border-slate-800 bg-slate-950/76 p-5 shadow-xl shadow-black/20">
        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-amber-200">
          <BookOpen className="h-4 w-4" />
          {messages.shared.wikiNavigation}
        </div>
        <div className="mt-4 grid gap-2">
          {Object.values(NAVIGATION_CONFIG).map((item) => (
            <Link key={item.key} href={localizePath(item.href, locale)} className="rounded-md border border-slate-800 bg-slate-900/55 px-3 py-2 text-sm font-semibold text-slate-300 hover:border-amber-400/50 hover:text-amber-100">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-amber-500/30 bg-amber-950/20 p-5">
        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-amber-200">
          <Sparkles className="h-4 w-4" />
          {messages.shared.activeCodes}
        </div>
        <div className="mt-4 space-y-3">
          {messages.sidebarCodes.map((code) => (
            <div key={code.reward} className="rounded-md bg-slate-950/70 p-3">
              <div className="font-mono text-sm font-black text-amber-100">{code.code}</div>
              <div className="mt-1 text-xs leading-5 text-slate-400">{code.reward}</div>
            </div>
          ))}
        </div>
        <Link href={localizePath("/codes", locale)} className="mt-4 inline-flex text-sm font-bold text-amber-200 hover:text-amber-100">
          {messages.shared.viewAllCodes}
        </Link>
      </div>
      <div className="rounded-lg border border-slate-800 bg-slate-950/76 p-5">
        <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-amber-200">
          <Gamepad2 className="h-4 w-4" />
          Latest Articles
        </div>
        <div className="mt-4 space-y-3">
          {latest.map((item) => (
            <Link key={item.path} href={getArticlePath(item, locale)} className="block text-sm font-semibold leading-6 text-slate-300 hover:text-amber-100">
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-slate-800 bg-slate-950/76 p-5 text-sm leading-7 text-slate-400">
        <div className="flex items-center gap-2 font-black uppercase tracking-wide text-amber-200">
          <Shield className="h-4 w-4" />
          Fan Notice
        </div>
        <p className="mt-3">{messages.site.legalNotice}</p>
      </div>
    </aside>
  );
}
