/* global console, process */

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const expectedLocales = ["en", "de", "es", "pt"];
const expectedArticleCount = 19;
const expectedCategories = ["guide", "codes", "cards", "lineup", "upgrades", "waves", "ranks", "system"];
const bannedPatterns = [
  /Yu-Gi-Oh/i,
  /\bTCG\b/i,
  /Magic: The Gathering/i,
  /\bMTG\b/i,
  /Panini/i,
  /\bNFL\b/i,
  /Kenny Pickett/i,
  /Patrick Mahomes/i,
  /Tom Brady/i,
  /Deshaun Watson/i,
  /Josh Allen/i,
  /Chronicles of Crime/i,
  /Keep the Heroes Out/i,
  /Duel Links/i,
  /Konami/i,
  /Dogmatika/i,
  /Tri-Brigade/i,
  /Card Kingdom/i,
];

function fail(message) {
  console.error(`content quality check failed: ${message}`);
  process.exitCode = 1;
}

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function listMdxFiles(locale) {
  const localeDir = path.join(root, "content", locale);
  if (!fs.existsSync(localeDir)) {
    fail(`missing content/${locale}`);
    return [];
  }

  const files = [];
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(fullPath);
      if (entry.isFile() && entry.name.endsWith(".mdx")) files.push(fullPath);
    }
  };
  walk(localeDir);
  return files.sort();
}

const routingSource = readText("src/i18n/routing.ts");
for (const locale of expectedLocales) {
  if (!routingSource.includes(`"${locale}"`)) {
    fail(`routing.ts does not include locale "${locale}"`);
  }
}

const localizedContent = JSON.parse(readText("src/lib/localized-content.json"));
for (const locale of expectedLocales) {
  if (!Array.isArray(localizedContent[locale])) {
    fail(`localized-content.json is missing locale "${locale}"`);
  }
}

const slugSets = new Map();
for (const locale of expectedLocales) {
  const files = listMdxFiles(locale);
  if (files.length !== expectedArticleCount) {
    fail(`content/${locale} has ${files.length} MDX files; expected ${expectedArticleCount}`);
  }

  const relativeSlugs = files.map((file) => path.relative(path.join(root, "content", locale), file).replaceAll("\\", "/"));
  slugSets.set(locale, relativeSlugs);

  for (const file of files) {
    const relative = path.relative(path.join(root, "content", locale), file).replaceAll("\\", "/");
    const category = relative.split("/")[0];
    if (!expectedCategories.includes(category)) {
      fail(`${path.relative(root, file)} lives under unknown category "${category}"`);
    }

    const text = fs.readFileSync(file, "utf8");
    const banned = bannedPatterns.find((pattern) => pattern.test(text));
    if (banned) {
      fail(`${path.relative(root, file)} contains banned off-game term ${banned}`);
    }
  }
}

const reference = slugSets.get("en") || [];
for (const locale of expectedLocales.slice(1)) {
  const current = slugSets.get(locale) || [];
  const missing = reference.filter((slug) => !current.includes(slug));
  const extra = current.filter((slug) => !reference.includes(slug));
  if (missing.length || extra.length) {
    fail(`content/${locale} slug set differs from English; missing=${missing.join(",") || "none"} extra=${extra.join(",") || "none"}`);
  }
}

const generatedContent = JSON.parse(readText("src/lib/generated-content.json"));
if (!Array.isArray(generatedContent) || generatedContent.length !== expectedArticleCount) {
  fail(`generated-content.json has ${Array.isArray(generatedContent) ? generatedContent.length : "non-array"} entries; expected ${expectedArticleCount}`);
}

for (const locale of expectedLocales) {
  const entries = localizedContent[locale] || [];
  if (entries.length !== expectedArticleCount) {
    fail(`localized-content.json locale "${locale}" has ${entries.length} entries; expected ${expectedArticleCount}`);
  }
}

if (!process.exitCode) {
  console.log(`content quality check passed: ${expectedLocales.length} locales, ${expectedArticleCount} articles per locale`);
}
