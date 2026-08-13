/**
 * Types for the Uplift AI public Blog API.
 *
 * The only documented endpoint is `GET /api/public/v1/blogs` — there's no
 * public schema reference beyond the field names given in the integration
 * brief, so `UpliftRawArticle` below is intentionally permissive (almost
 * everything optional, several plausible key spellings per field). All of
 * that uncertainty is absorbed in `normalize.ts`; every other file in this
 * codebase works against `NormalizedArticle` / `NormalizedArticleSummary`
 * instead, so if Uplift's real field names differ once verified against a
 * live token, normalize.ts is the one place that needs to change.
 */

export type UpliftStatus = "PUBLISH" | "DRAFT" | string;

export type UpliftImage =
  | string
  | {
      url?: string;
      src?: string;
      alt?: string;
      altText?: string;
      width?: number;
      height?: number;
    }
  | null
  | undefined;

export type UpliftMeta = {
  seoTitle?: string;
  seoDescription?: string;
  focusKeyword?: string;
  keywords?: string | string[];
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  ogSiteName?: string;
  ogLocale?: string;
};

export type UpliftRawArticle = {
  id?: string | number;
  slug?: string;
  title?: string;
  excerpt?: string;
  summary?: string;
  description?: string;
  content?: string;
  status?: UpliftStatus;
  featuredImage?: UpliftImage;
  coverImage?: UpliftImage;
  image?: UpliftImage;
  publishDate?: string;
  publishedAt?: string;
  publishedDate?: string;
  createdAt?: string;
  updatedAt?: string;
  dateModified?: string;
  modifiedAt?: string;
  categories?: (string | { name?: string; slug?: string })[];
  readingTime?: number | string;
  readTime?: number | string;
  estimatedReadingTime?: number | string;
  articleAuthor?: string;
  authorName?: string;
  authorUrl?: string;
  articleSection?: string;
  articleTags?: string[];
  tags?: string[];
  meta?: UpliftMeta;
  [extra: string]: unknown;
};

/** What every page/component in this app actually works with. */
export type NormalizedArticleSummary = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  featuredImage: { url: string; alt: string } | null;
  publishDate: string | null;
  categories: string[];
  readingTimeMinutes: number | null;
};

export type NormalizedArticle = NormalizedArticleSummary & {
  contentHtml: string;
  dateModified: string | null;
  author: { name: string; url: string | null };
  articleSection: string | null;
  articleTags: string[];
  seo: {
    title: string;
    description: string | null;
    keywords: string[];
    ogTitle: string;
    ogDescription: string | null;
    ogType: string;
    ogSiteName: string;
    ogLocale: string;
  };
};
