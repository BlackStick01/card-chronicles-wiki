# Card Chronicles Multilingual Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the Card Chronicles wiki as a quality-filtered multilingual site using seoscout output for English, German, Spanish, and Portuguese.

**Architecture:** Keep English as the default locale with no `/en` prefix, add `/de`, `/es`, and `/pt` routes through the existing `next-intl` setup, and generate localized content registries from filtered MDX files. Filter articles by slug and content quality signals so non-Roblox Card Chronicles material is excluded from every locale.

**Tech Stack:** Next.js App Router, next-intl, MDX, TypeScript, Node validation script.

---

### Task 1: Add Multilingual Quality Gate

**Files:**
- Create: `scripts/validate-content-quality.mjs`
- Modify: `package.json`

- [ ] **Step 1: Add a validation script**

Create `scripts/validate-content-quality.mjs` that checks:
- `src/i18n/routing.ts` includes `["en", "de", "es", "pt"]`.
- `content/en`, `content/de`, `content/es`, and `content/pt` exist.
- Each locale has the same set of MDX slugs.
- No MDX file contains banned off-game terms such as `Yu-Gi-Oh`, `Panini`, `NFL`, `Chronicles of Crime`, `Keep the Heroes Out`, or `Duel Links`.
- `src/lib/localized-content.json` has the same locale keys.

- [ ] **Step 2: Add npm script**

Add `"validate:content": "node scripts/validate-content-quality.mjs"` to `package.json`.

- [ ] **Step 3: Run red check**

Run: `npm.cmd run validate:content`

Expected: FAIL because only English is currently enabled and only `content/en` exists.

### Task 2: Import Filtered Multilingual MDX

**Files:**
- Modify: `content/`

- [ ] **Step 1: Replace generated article content**

Copy seoscout MDX from `D:\Codex_Work\seoscout\output\card_chronicles\articles\{locale}` into `content/{locale}` for `en`, `de`, `es`, and `pt`.

- [ ] **Step 2: Remove off-game articles**

Remove the same bad slug list from every locale:
- `card-chronicles-best-cards.mdx`
- `card-chronicles-card-list.mdx`
- `card-chronicles-cards.mdx`
- `card-chronicles-rare-cards.mdx`
- `card-chronicles-lineup.mdx`
- `card-chronicles-max-players.mdx`
- `card-chronicles-mobile.mdx`
- `card-chronicles-abilities.mdx`
- `card-chronicles-ability-unlocks.mdx`
- `card-chronicles-upgrades.mdx`
- `card-chronicles-fights.mdx`
- `card-chronicles-strong-foes.mdx`

This keeps 19 Roblox-relevant article slugs per locale.

- [ ] **Step 3: Normalize MDX headings**

For all retained MDX files, remove stray code-fence markers, convert the first `#` heading to `##`, and ensure a blank line after metadata.

### Task 3: Regenerate Content Registries

**Files:**
- Modify: `src/lib/generated-content.json`
- Modify: `src/lib/localized-content.json`
- Modify: `src/lib/content-registry.ts`
- Modify: `src/lib/content.ts`

- [ ] **Step 1: Regenerate metadata JSON**

Generate localized metadata for all four locales from retained MDX metadata.

- [ ] **Step 2: Regenerate MDX loader registry**

Create dynamic import entries for every retained locale/category/slug.

- [ ] **Step 3: Enable supported locales**

Update `SUPPORTED_LOCALES` to `["en", "de", "es", "pt"]`.

### Task 4: Restore Locale Routing and UI

**Files:**
- Modify: `src/i18n/routing.ts`
- Modify: `src/components/language-switcher.tsx`
- Modify: `src/locales/en.json`
- Create: `src/locales/de.json`
- Create: `src/locales/es.json`
- Create: `src/locales/pt.json`
- Modify: `src/app/[locale]/[...slug]/page.tsx`
- Modify: `src/app/sitemap.ts`

- [ ] **Step 1: Enable routing locales**

Set routing locales to `["en", "de", "es", "pt"]` with `localePrefix: "as-needed"`.

- [ ] **Step 2: Add localized UI messages**

Create German, Spanish, and Portuguese locale JSON files by translating site labels, homepage modules, CTA text, and FAQ text.

- [ ] **Step 3: Restore language switcher**

Render links for English, Deutsch, Español, and Português, preserving the current path where possible.

- [ ] **Step 4: Use locale-aware messages on category/article pages**

Replace hard-coded English `messages` import with locale-loaded messages where those pages need labels.

- [ ] **Step 5: Generate locale-aware sitemap**

Use actual localized content paths instead of mapping English paths across all locales.

### Task 5: Verify, Commit, Push, Deploy

**Files:**
- No new source files expected beyond tasks above.

- [ ] **Step 1: Run quality validation**

Run: `npm.cmd run validate:content`

Expected: PASS with four locales and 19 MDX files per locale.

- [ ] **Step 2: Run standard checks**

Run:
- `npm.cmd run lint`
- `npm.cmd run typecheck`
- `npm.cmd run build`

Expected: all exit 0.

- [ ] **Step 3: Commit and push**

Commit message: `Add multilingual Card Chronicles content`

Push to `origin main`.

- [ ] **Step 4: Deploy to Vercel production**

Run: `npx.cmd vercel@latest --prod --yes`

Expected: production deployment completes and aliases to `card-chronicles-wiki.vercel.app`.
