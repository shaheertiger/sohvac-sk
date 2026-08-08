import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl;

  // Single-page site today — in-page sections listed as anchors so
  // crawlers see them, plus the root URL as the canonical entry point.
  // Add real routes here (e.g. /blog/[slug]) as the site grows.
  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
