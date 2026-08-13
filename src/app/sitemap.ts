import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { getPublishedBlogs } from "@/lib/uplift/client";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.siteUrl;
  const lastModified = new Date();

  // Every canonical, indexable public page. Home's in-page sections
  // (#services, #why, ...) are anchors on this same URL, not separate
  // pages, so they aren't listed separately.
  const staticEntries: MetadataRoute.Sitemap = [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/blog`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/contact`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];

  // getPublishedBlogs() already fails soft (returns [] on any Uplift
  // error/timeout/missing token) — if Uplift is down, the sitemap still
  // ships with every other page rather than 500ing entirely.
  const articles = await getPublishedBlogs();
  const articleEntries: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${base}/blog/${article.slug}`,
    lastModified: article.publishDate ? new Date(article.publishDate) : lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...articleEntries];
}
