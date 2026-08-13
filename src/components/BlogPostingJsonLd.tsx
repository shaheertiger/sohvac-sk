import { siteConfig } from "@/lib/site";
import type { NormalizedArticle } from "@/lib/uplift/types";

/**
 * BlogPosting JSON-LD for an individual /blog/[slug] page. Uses only
 * verified data: fields Uplift actually returned (via NormalizedArticle),
 * plus the site's own Organization/WebSite entities referenced by @id —
 * same pattern as <JsonLd> / <PageJsonLd>. Publisher is always SO HVAC;
 * nothing here fabricates a review, rating, or address.
 */
export function BlogPostingJsonLd({ article }: { article: NormalizedArticle }) {
  const base = siteConfig.siteUrl;
  const url = `${base}/blog/${article.slug}`;
  const businessId = `${base}/#business`;

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#blogposting`,
    headline: article.seo.title,
    description: article.seo.description ?? undefined,
    url,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    publisher: { "@id": businessId },
    author: article.author.url
      ? { "@type": "Organization", name: article.author.name, url: article.author.url }
      : { "@type": "Organization", name: article.author.name },
    inLanguage: "en-CA",
  };

  if (article.featuredImage) {
    data.image = article.featuredImage.url;
  }
  if (article.publishDate) {
    data.datePublished = article.publishDate;
  }
  if (article.dateModified) {
    data.dateModified = article.dateModified;
  }
  if (article.articleSection) {
    data.articleSection = article.articleSection;
  }
  if (article.articleTags.length > 0) {
    data.keywords = article.articleTags.join(", ");
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
