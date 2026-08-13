import { siteConfig } from "@/lib/site";

type Breadcrumb = { name: string; path: string };

type PageJsonLdProps = {
  /** Route path, e.g. "/", "/privacy", "/contact". */
  path: string;
  name: string;
  description: string;
  /**
   * Full trail including Home, e.g. [{name:"Home",path:"/"}, {name:"Contact",path:"/contact"}].
   * Omit on the homepage itself — a single-item trail there is redundant.
   */
  breadcrumbs?: Breadcrumb[];
};

/**
 * Per-page WebPage (+ optional BreadcrumbList) structured data. Deliberately
 * separate from <JsonLd> (site-wide Organization/WebSite, rendered once in
 * the root layout) so pages get their own WebPage entity without repeating
 * the business's LocalBusiness data on every route — avoids duplicate/
 * conflicting schema while still giving each page a distinct, indexable
 * WebPage node that references the shared Organization/WebSite via @id.
 */
export function PageJsonLd({ path, name, description, breadcrumbs }: PageJsonLdProps) {
  const base = siteConfig.siteUrl;
  const url = path === "/" ? base : `${base}${path}`;
  // Fragment ids always need a "/" before "#" — for every path but "/"
  // that's already true of `url`; the homepage is the one case where
  // `url` itself has no trailing slash, so build the id base separately.
  const idBase = path === "/" ? `${base}/` : url;

  const graph: Record<string, unknown>[] = [
    {
      "@type": "WebPage",
      "@id": `${idBase}#webpage`,
      url,
      name,
      description,
      inLanguage: "en-CA",
      isPartOf: { "@id": `${base}/#website` },
      about: { "@id": `${base}/#business` },
    },
  ];

  if (breadcrumbs && breadcrumbs.length > 0) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${idBase}#breadcrumb`,
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.path === "/" ? base : `${base}${item.path}`,
      })),
    });
  }

  const data = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
