#!/usr/bin/env node
// Migrate postical/contents/<slug>/CONTENT.md → content/blog/<slug>.mdx
// Usage: node scripts/migrate-postical.mjs [--force] [slug1 slug2 ...]

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC_DIR = path.join(ROOT, "postical", "contents");
const DEST_DIR = path.join(ROOT, "content", "blog");

const args = process.argv.slice(2);
const force = args.includes("--force");
const slugs = args.filter((a) => !a.startsWith("--"));

function pickCategory(tags) {
  if (!Array.isArray(tags) || tags.length === 0) return "Fertility";
  const map = {
    "pre-conception": "Preconception",
    preconception: "Preconception",
    ttc: "Fertility",
    pcos: "PCOS",
    ivf: "Treatment",
    iui: "Treatment",
    treatment: "Treatment",
    "gestational diabetes": "Pregnancy",
    pregnancy: "Pregnancy",
    nutrition: "Lifestyle",
    lifestyle: "Lifestyle",
  };
  for (const tag of tags) {
    const key = String(tag).toLowerCase().trim();
    if (map[key]) return map[key];
  }
  return String(tags[0]);
}

function transform(src, slug) {
  const { data, content } = matter(src);
  const out = {
    title: data.title ?? "",
    date: data.publishedAt ?? data.date ?? "",
    description: data.description ?? "",
    category: data.category ?? pickCategory(data.tags),
    thumbnail: `/blog/${slug}-thumbnail.png`,
  };
  if (data.updatedAt && data.updatedAt !== out.date) out.updated = data.updatedAt;
  if (Array.isArray(data.tags) && data.tags.length) out.tags = data.tags;
  return matter.stringify(content.trimStart(), out);
}

function listSlugs() {
  return fs
    .readdirSync(SRC_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

function migrate(slug) {
  const srcFile = path.join(SRC_DIR, slug, "CONTENT.md");
  if (!fs.existsSync(srcFile)) {
    console.warn(`skip ${slug}: no CONTENT.md`);
    return { slug, status: "missing" };
  }
  const destFile = path.join(DEST_DIR, `${slug}.mdx`);
  if (fs.existsSync(destFile) && !force) {
    console.warn(`skip ${slug}: ${path.relative(ROOT, destFile)} exists (use --force to overwrite)`);
    return { slug, status: "exists" };
  }
  const src = fs.readFileSync(srcFile, "utf8");
  const out = transform(src, slug);
  fs.mkdirSync(path.dirname(destFile), { recursive: true });
  fs.writeFileSync(destFile, out, "utf8");
  console.log(`wrote ${path.relative(ROOT, destFile)}`);
  return { slug, status: "ok" };
}

const targets = slugs.length ? slugs : listSlugs();
const results = targets.map(migrate);
const ok = results.filter((r) => r.status === "ok").length;
const skipped = results.length - ok;
console.log(`\ndone: ${ok} wrote, ${skipped} skipped`);
