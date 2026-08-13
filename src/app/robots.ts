import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.siteUrl;

  return {
    rules: [
      {
        // Default: every crawler may index every public page. /api/ is
        // disallowed everywhere below — it's request-handling code (the
        // contact form endpoint), not indexable content, and has nothing
        // for a crawler to usefully read.
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      // Explicitly allowed AI/search crawlers — redundant with the
      // wildcard rule above today (nothing is blocked for anyone), but
      // named explicitly so this site's intent toward AI answer engines
      // is unambiguous rather than left to a bot's default behavior.
      { userAgent: "GPTBot", allow: "/", disallow: ["/api/"] },
      { userAgent: "ChatGPT-User", allow: "/", disallow: ["/api/"] },
      { userAgent: "PerplexityBot", allow: "/", disallow: ["/api/"] },
      { userAgent: "ClaudeBot", allow: "/", disallow: ["/api/"] },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
