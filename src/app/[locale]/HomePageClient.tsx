"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BadgeCheck, BookOpen, CirclePlay, Gamepad2, Layers3, Sparkles, Star, Trophy, Zap } from "lucide-react";
import { ResponsiveLeaderboardAd } from "@/components/ads/ResponsiveLeaderboardAd";
import { NAVIGATION_CONFIG } from "@/config/navigation";
import type { ContentMeta } from "@/lib/content";
import type { SiteMessages } from "@/lib/messages";
import { cn } from "@/lib/utils";

type HomeModule = SiteMessages["home"]["explore"]["modules"][number];

const OFFICIAL_ROBLOX_URL = "https://www.roblox.com/games/114758508835875/Card-Chronicles";
const iconByIndex = [Sparkles, BookOpen, Layers3, Star, Gamepad2, Zap, BadgeCheck, Trophy];

function getLocalePrefix(locale: string) {
  return locale === "en" ? "" : `/${locale}`;
}

function articleHref(item: Pick<ContentMeta, "category" | "slug">, prefix: string) {
  const publicSlug = item.slug.replace(/^card-chronicles-/, "");
  return `${prefix}/${item.category}/${publicSlug}`;
}

function ModuleHighlights({ module }: { module: HomeModule }) {
  if (module.displayType === "tier-grid") {
    return (
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {module.highlights.map((item) => (
          <div key={item.label} className="rounded-md border border-slate-700 bg-slate-950/70 p-3">
            <div className="flex items-center justify-between gap-3">
              <span className="grid h-8 w-8 place-items-center rounded bg-amber-400 font-black text-slate-950">{item.label}</span>
              {"badge" in item && <span className="text-xs font-bold uppercase tracking-wide text-cyan-200">{item.badge}</span>}
            </div>
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
          </div>
        ))}
      </div>
    );
  }

  if (module.displayType === "code-cards") {
    return (
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {module.highlights.map((item) => (
          <div key={item.label} className="rounded-md border border-amber-500/30 bg-amber-950/30 p-4">
            <div className="font-mono text-lg font-black text-amber-100">{item.label}</div>
            {"badge" in item && <div className="mt-1 text-xs font-bold uppercase tracking-wide text-cyan-200">{item.badge}</div>}
            <p className="mt-3 text-sm leading-6 text-slate-300">{item.detail}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("mt-5 grid gap-3", module.displayType === "step-by-step" ? "sm:grid-cols-2" : "")}>
      {module.highlights.map((item) => (
        <div key={item.label} className="flex gap-3 rounded-md bg-slate-950/60 p-3">
          <span className="grid h-7 w-7 shrink-0 place-items-center rounded bg-slate-800 text-sm font-black text-amber-200">{item.label}</span>
          <p className="text-sm leading-6 text-slate-300">{item.detail}</p>
        </div>
      ))}
    </div>
  );
}

export default function HomePageClient({ locale, messages, content }: { locale: string; messages: SiteMessages; content: ContentMeta[] }) {
  const prefix = getLocalePrefix(locale);
  const href = (path: string) => `${prefix}${path}`;
  const latest = [...content].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 8);
  const trending = content.filter((item) =>
    ["card-chronicles-beginner-guide", "card-chronicles-codes", "card-chronicles-card-rolling", "card-chronicles-best-lineup"].includes(item.slug),
  );

  return (
    <main>
      <section className="relative overflow-hidden border-b border-slate-800 bg-[#090b12]">
        <Image src="/images/hero.webp" alt="Card Chronicles official Roblox thumbnail" fill priority className="object-cover opacity-48" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#090b12_0%,rgba(9,11,18,0.92)_38%,rgba(9,11,18,0.45)_74%,#090b12_100%)]" />
        <div className="relative mx-auto grid min-h-[680px] max-w-7xl content-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">{messages.home.hero.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.98] text-slate-50 sm:text-7xl">
              {messages.home.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">{messages.home.hero.description}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={href("/guide/beginner-guide")} className="inline-flex items-center gap-2 rounded-md bg-amber-400 px-5 py-3 text-sm font-black text-slate-950 shadow-xl shadow-amber-950/30 transition hover:bg-amber-300">
                {messages.home.hero.primaryCta}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={href("/cards")} className="inline-flex items-center gap-2 rounded-md border border-cyan-300/40 bg-slate-950/50 px-5 py-3 text-sm font-black text-cyan-100 transition hover:bg-cyan-400/10">
                {messages.home.hero.secondaryCta}
              </Link>
              <Link href={href("/codes")} className="inline-flex items-center gap-2 rounded-md border border-slate-700 bg-slate-950/50 px-5 py-3 text-sm font-black text-slate-200 transition hover:border-amber-300/50 hover:text-amber-100">
                {messages.home.hero.tertiaryCta}
              </Link>
            </div>
            <div className="mt-9 grid gap-3 sm:grid-cols-5">
              {messages.home.hero.stats.map((stat) => (
                <div key={stat} className="rounded-md border border-slate-700/80 bg-slate-950/70 px-3 py-3 text-sm font-bold text-slate-200">
                  {stat}
                </div>
              ))}
            </div>
          </div>
          <div className="self-center rounded-lg border border-amber-500/30 bg-slate-950/76 p-4 shadow-2xl shadow-black/50">
            <Image src="/images/main-capsule.webp" alt="Card Chronicles official Roblox media" width={768} height={432} className="rounded-md object-cover" priority />
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-300">
              <div className="rounded-md bg-slate-900/80 p-3"><span className="block font-black text-amber-200">Developer</span>Chronicle Entertainment</div>
              <div className="rounded-md bg-slate-900/80 p-3"><span className="block font-black text-cyan-200">Genre</span>Incremental Simulator</div>
            </div>
          </div>
        </div>
      </section>

      <ResponsiveLeaderboardAd />

      <section className="border-b border-slate-800 bg-[#111827]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.84fr_1.16fr] lg:px-8">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">{messages.home.hero.videoLabel}</p>
            <h2 className="mt-4 text-3xl font-black text-slate-50">{messages.home.video.title}</h2>
            <p className="mt-4 text-base leading-8 text-slate-400">{messages.home.video.description}</p>
            <a href={OFFICIAL_ROBLOX_URL} target="_blank" rel="noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-md bg-amber-400 px-5 py-3 text-sm font-black text-slate-950 hover:bg-amber-300">
              {messages.home.video.button}
              <CirclePlay className="h-4 w-4" />
            </a>
          </div>
          <div className="overflow-hidden rounded-lg border border-slate-700 bg-black shadow-2xl shadow-black/50">
            <Image src="/images/hero.webp" alt="Card Chronicles official Roblox thumbnail preview" width={768} height={432} className="aspect-video w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-[#090b12]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[240px_1fr] lg:px-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-lg border border-slate-800 bg-slate-950/76 p-4 shadow-xl shadow-black/30">
              <div className="flex items-center gap-2 text-sm font-black uppercase tracking-wide text-amber-200">
                <BookOpen className="h-4 w-4" />
                {messages.shared.wikiNavigation}
              </div>
              <div className="mt-4 grid gap-2">
                {Object.values(NAVIGATION_CONFIG).map((item) => (
                  <Link key={item.key} href={href(item.href)} className="rounded-md border border-slate-800 bg-slate-900/55 px-3 py-2 text-sm font-bold text-slate-300 hover:border-amber-300/50 hover:text-amber-100">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </aside>

          <div className="min-w-0">
            <section>
              <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">{messages.home.recent.eyebrow}</p>
                  <h2 className="mt-4 text-3xl font-black text-slate-50">{messages.home.recent.title}</h2>
                  <p className="mt-3 text-base leading-7 text-slate-400">{messages.home.recent.description}</p>
                </div>
                <Link href={href("/guide")} className="inline-flex items-center gap-2 text-sm font-black text-amber-200 hover:text-amber-100">
                  {messages.shared.allArticles} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {latest.map((item) => (
                  <Link key={item.path} href={articleHref(item, prefix)} className="group rounded-lg border border-slate-800 bg-slate-950/76 p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-400/40 hover:shadow-xl hover:shadow-black/30">
                    <div className="text-xs font-black uppercase tracking-wide text-cyan-200">{item.category} / {item.date}</div>
                    <h3 className="mt-3 text-lg font-black leading-snug text-slate-50 group-hover:text-amber-200">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-400">{item.description}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="mt-16">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">{messages.home.start.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-black text-slate-50">{messages.home.start.title}</h2>
              <div className="mt-8 grid gap-4 md:grid-cols-4">
                {messages.home.start.cards.map((card) => (
                  <div key={card.number} className="rounded-lg border border-slate-800 bg-slate-950/76 p-5">
                    <span className="grid h-9 w-9 place-items-center rounded bg-amber-400 font-black text-slate-950">{card.number}</span>
                    <h3 className="mt-5 text-lg font-black text-slate-50">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-400">{card.description}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mt-16 rounded-lg border border-slate-800 bg-slate-950/76 p-6 shadow-xl shadow-black/20">
              <p className="text-sm font-black uppercase tracking-[0.2em] text-cyan-200">{messages.home.trending.eyebrow}</p>
              <h2 className="mt-4 text-3xl font-black text-slate-50">{messages.home.trending.title}</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {trending.map((item) => (
                  <Link key={item.path} href={articleHref(item, prefix)} className="rounded-md border border-slate-800 bg-slate-900/70 p-4 hover:border-amber-400/50">
                    <h3 className="font-black text-slate-50">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-400">{item.description}</p>
                  </Link>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-800 bg-[#111827]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-black text-slate-50">{messages.home.aboutGame.title}</h2>
            {messages.home.aboutGame.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-5 text-base leading-8 text-slate-300">{paragraph}</p>
            ))}
            <Link href={href("/guide")} className="mt-7 inline-flex items-center gap-2 rounded-md bg-amber-400 px-5 py-3 text-sm font-black text-slate-950 hover:bg-amber-300">
              {messages.home.aboutGame.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {messages.home.aboutGame.stats.map((stat) => (
              <div key={stat.label} className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
                <div className="text-xs font-black uppercase tracking-wide text-cyan-200">{stat.label}</div>
                <div className="mt-2 text-base font-bold text-slate-100">{stat.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#090b12]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-black text-slate-50">{messages.home.explore.title}</h2>
            <p className="mt-4 text-base leading-8 text-slate-400">{messages.home.explore.description}</p>
          </div>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {messages.home.explore.modules.map((module, index) => {
              const Icon = iconByIndex[index] || BookOpen;
              return (
                <article key={module.name} className="rounded-lg border border-slate-800 bg-slate-950/76 p-5 shadow-xl shadow-black/20">
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-amber-400 text-slate-950">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-xl font-black text-slate-50">{module.name}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-400">{module.description}</p>
                    </div>
                  </div>
                  <ModuleHighlights module={module} />
                  <Link href={href(module.href)} className="mt-5 inline-flex items-center gap-2 text-sm font-black text-amber-200 hover:text-amber-100">
                    {messages.shared.readMore} <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-t border-slate-800 bg-[#111827]">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <h2 className="text-3xl font-black text-slate-50">Card Chronicles FAQ</h2>
            <p className="mt-4 text-base leading-8 text-slate-400">{messages.home.recent.description}</p>
          </div>
          <div className="grid gap-4">
            {messages.home.faq.map((item) => (
              <details key={item.question} className="rounded-lg border border-slate-800 bg-slate-950/76 p-5">
                <summary className="cursor-pointer text-base font-black text-slate-50">{item.question}</summary>
                <p className="mt-4 text-sm leading-7 text-slate-400">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(120deg,#e4b44b,#55c8bd)]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:px-8">
          <div>
            <h2 className="text-3xl font-black text-slate-950">{messages.home.finalCta.title}</h2>
            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-900/85">{messages.home.finalCta.description}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href={href("/guide/beginner-guide")} className="rounded-md bg-slate-950 px-5 py-3 text-sm font-black text-amber-100 hover:bg-slate-900">
              {messages.home.finalCta.primary}
            </Link>
            <a href={OFFICIAL_ROBLOX_URL} target="_blank" rel="noreferrer" className="rounded-md border border-slate-950 px-5 py-3 text-sm font-black text-slate-950 hover:bg-slate-950/10">
              {messages.home.finalCta.secondary}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
