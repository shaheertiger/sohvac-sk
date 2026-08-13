import { siteConfig } from "@/lib/site";
import { sanitizeArticleHtml } from "./sanitize";
import type {
  NormalizedArticle,
  NormalizedArticleSummary,
  UpliftImage,
  UpliftRawArticle,
} from "./types";

export function isPublished(raw: UpliftRawArticle): boolean {
  return raw.status === "PUBLISH";
}

function firstString(...values: unknown[]): string | null {
  for (const v of values) {
    if (typeof v === "string" && v.trim()) return v.trim();
  }
  return null;
}

function normalizeImage(image: UpliftImage): { url: string; alt: string } | null {
  if (!image) return null;
  if (typeof image === "string") {
    return image.trim() ? { url: image.trim(), alt: "" } : null;
  }
  const url = firstString(image.url, image.src);
  if (!url) return null;
  return { url, alt: firstString(image.alt, image.altText) ?? "" };
}

function normalizeCategories(raw: UpliftRawArticle): string[] {
  if (!Array.isArray(raw.categories)) return [];
  return raw.categories
    .map((c) => (typeof c === "string" ? c : c?.name))
    .filter((c): c is string => Boolean(c && c.trim()))
    .map((c) => c.trim());
}

function normalizeReadingTime(raw: UpliftRawArticle): number | null {
  const value = raw.readingTime ?? raw.readTime ?? raw.estimatedReadingTime;
  if (value === undefined || value === null) return null;
  const n = typeof value === "number" ? value : parseFloat(value);
  return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
}

/**
 * Only trust an author URL when it actually points at sohvac.ca — SO HVAC
 * publishes under a company identity, not a personal one, so an
 * Uplift-supplied author link to some other domain (e.g. a generic
 * Uplift author profile) isn't "valid for the SO HVAC business" and gets
 * dropped rather than shown.
 */
function isOwnDomainUrl(url: string): boolean {
  try {
    return new URL(url).origin === new URL(siteConfig.siteUrl).origin;
  } catch {
    return false;
  }
}

function normalizeAuthor(raw: UpliftRawArticle): { name: string; url: string | null } {
  const name = firstString(raw.authorName, raw.articleAuthor) ?? siteConfig.businessName;
  const url = raw.authorUrl && isOwnDomainUrl(raw.authorUrl) ? raw.authorUrl : null;
  return { name, url };
}

function normalizeKeywords(raw: UpliftRawArticle): string[] {
  const meta = raw.meta;
  if (!meta) return [];
  const fromKeywords = Array.isArray(meta.keywords)
    ? meta.keywords
    : typeof meta.keywords === "string"
      ? meta.keywords.split(",").map((k) => k.trim())
      : [];
  const combined = [...fromKeywords, ...(meta.focusKeyword ? [meta.focusKeyword] : [])];
  return Array.from(new Set(combined.filter((k) => k && k.trim()).map((k) => k.trim())));
}

const VALID_OG_TYPES = new Set(["website", "article", "book", "profile"]);

export function normalizeSummary(raw: UpliftRawArticle): NormalizedArticleSummary | null {
  const slug = firstString(raw.slug);
  const title = firstString(raw.title);
  if (!slug || !title) return null; // requirement 9: missing slug/title — skip, don't crash the list

  return {
    id: firstString(String(raw.id ?? "")) ?? slug,
    slug,
    title,
    excerpt: firstString(raw.excerpt, raw.summary, raw.description),
    featuredImage: normalizeImage(raw.featuredImage ?? raw.coverImage ?? raw.image),
    publishDate: firstString(raw.publishDate, raw.publishedAt, raw.publishedDate, raw.createdAt),
    categories: normalizeCategories(raw),
    readingTimeMinutes: normalizeReadingTime(raw),
  };
}

export function normalizeArticle(raw: UpliftRawArticle): NormalizedArticle | null {
  const summary = normalizeSummary(raw);
  if (!summary) return null;

  const meta = raw.meta ?? {};
  // The page renders this with Metadata's `title: { absolute }` (bypasses
  // the root layout's "%s | SO HVAC" template, since an Uplift-supplied
  // seoTitle is already editor-composed and complete) — so when Uplift
  // *doesn't* provide one, build the brand suffix in here instead of
  // falling back to a bare title that would otherwise lose it entirely.
  const seoTitle = firstString(meta.seoTitle) ?? `${summary.title} | ${siteConfig.shortName}`;
  const ogTypeCandidate = firstString(meta.ogType)?.toLowerCase();

  return {
    ...summary,
    contentHtml: sanitizeArticleHtml(raw.content ?? ""),
    dateModified: firstString(raw.dateModified, raw.modifiedAt, raw.updatedAt),
    author: normalizeAuthor(raw),
    articleSection: firstString(raw.articleSection, summary.categories[0]),
    articleTags: Array.isArray(raw.articleTags)
      ? raw.articleTags.filter((t): t is string => typeof t === "string" && Boolean(t.trim()))
      : Array.isArray(raw.tags)
        ? raw.tags.filter((t): t is string => typeof t === "string" && Boolean(t.trim()))
        : [],
    seo: {
      title: seoTitle,
      description: firstString(meta.seoDescription, summary.excerpt),
      keywords: normalizeKeywords(raw),
      ogTitle: firstString(meta.ogTitle, seoTitle) ?? seoTitle,
      ogDescription: firstString(meta.ogDescription, meta.seoDescription, summary.excerpt),
      ogType: ogTypeCandidate && VALID_OG_TYPES.has(ogTypeCandidate) ? ogTypeCandidate : "article",
      ogSiteName: firstString(meta.ogSiteName) ?? siteConfig.shortName,
      ogLocale: firstString(meta.ogLocale) ?? "en_CA",
    },
  };
}

/**
 * Uplift's response envelope isn't documented beyond the endpoint itself —
 * accept a bare array or a few common wrapper shapes so a small mismatch
 * doesn't take the whole /blog page down.
 */
export function extractList(json: unknown): UpliftRawArticle[] {
  if (Array.isArray(json)) return json as UpliftRawArticle[];
  if (json && typeof json === "object") {
    const obj = json as Record<string, unknown>;
    for (const key of ["data", "blogs", "results", "items", "articles"]) {
      if (Array.isArray(obj[key])) return obj[key] as UpliftRawArticle[];
    }
  }
  return [];
}
