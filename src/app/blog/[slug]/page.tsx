import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageJsonLd } from "@/components/PageJsonLd";
import { BlogPostingJsonLd } from "@/components/BlogPostingJsonLd";
import { getBlogBySlug } from "@/lib/uplift/client";
import { formatArticleDate } from "@/lib/uplift/format";
import { siteConfig } from "@/lib/site";
import { Clock } from "lucide-react";

// Literal, not imported — see the matching comment in ../page.tsx. Keep
// in sync with UPLIFT_REVALIDATE_SECONDS in src/lib/uplift/client.ts.
export const revalidate = 1800;

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getBlogBySlug(slug);
  if (!article) return {};

  const url = `${siteConfig.siteUrl}/blog/${article.slug}`;
  // Canonical/OG URL is always self-computed from our own route — never
  // taken from the API's meta.ogUrl, which could point anywhere.
  const ogImage = article.featuredImage?.url ?? `${siteConfig.siteUrl}/opengraph-image.jpg`;

  return {
    // `absolute` deliberately bypasses the root layout's title template
    // ("%s | SO HVAC") — article.seo.title comes from Uplift's own
    // seoTitle field, which is already a complete, editor-composed SEO
    // title. Using the plain string form here would double up the site
    // name ("...| SO HVAC | SO HVAC").
    title: { absolute: article.seo.title },
    description: article.seo.description ?? undefined,
    keywords: article.seo.keywords.length > 0 ? article.seo.keywords : undefined,
    alternates: { canonical: `/blog/${article.slug}` },
    robots: { index: true, follow: true },
    openGraph: {
      title: article.seo.ogTitle,
      description: article.seo.ogDescription ?? undefined,
      url,
      siteName: article.seo.ogSiteName,
      locale: article.seo.ogLocale,
      type: "article",
      publishedTime: article.publishDate ?? undefined,
      modifiedTime: article.dateModified ?? undefined,
      authors: [article.author.name],
      section: article.articleSection ?? undefined,
      tags: article.articleTags.length > 0 ? article.articleTags : undefined,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seo.ogTitle,
      description: article.seo.ogDescription ?? undefined,
      images: [ogImage],
    },
  };
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const article = await getBlogBySlug(slug);

  // Missing slug, Uplift unavailable, or (defense in depth) a non-PUBLISH
  // article somehow returned by the API — all treated as a normal 404
  // rather than a broken page.
  if (!article) notFound();

  const dateLabel = formatArticleDate(article.publishDate);

  return (
    <>
      <PageJsonLd
        path={`/blog/${article.slug}`}
        name={article.seo.title}
        description={article.seo.description ?? article.title}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: article.title, path: `/blog/${article.slug}` },
        ]}
      />
      <BlogPostingJsonLd article={article} />
      <Navbar />
      <main id="main-content" className="flex-1 bg-white pt-40 pb-28">
        <article className="mx-auto max-w-3xl px-6">
          <header>
            {article.categories.length > 0 && (
              <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-blue)]">
                {article.categories[0]}
              </span>
            )}
            <h1 className="mt-4 font-display text-balance text-4xl font-light leading-[1.15] text-[var(--color-ink)] sm:text-5xl">
              {article.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[14px] text-[var(--color-ink-soft)]">
              <span>By {article.author.name}</span>
              {dateLabel && (
                <>
                  <span aria-hidden="true">·</span>
                  <time dateTime={article.publishDate ?? undefined}>{dateLabel}</time>
                </>
              )}
              {article.readingTimeMinutes && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock size={13} />
                    {article.readingTimeMinutes} min read
                  </span>
                </>
              )}
            </div>
          </header>

          {article.featuredImage && (
            <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-[1.75rem] bg-[var(--color-light)]">
              <Image
                src={article.featuredImage.url}
                alt={article.featuredImage.alt || article.title}
                fill
                priority
                className="object-cover"
                sizes="(min-width: 1024px) 768px, 100vw"
              />
            </div>
          )}

          {article.contentHtml ? (
            <div
              className="article-body mt-12"
              // Sanitized server-side in src/lib/uplift/sanitize.ts before
              // this ever reaches the response — see that file for the
              // allowlist and the H1-downgrade rule.
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />
          ) : (
            <p className="mt-12 text-[15px] text-[var(--color-ink-soft)]">
              This article&apos;s content couldn&apos;t be loaded right now.
            </p>
          )}

          {article.articleTags.length > 0 && (
            <div className="mt-14 flex flex-wrap gap-2 border-t border-[var(--color-line)] pt-8">
              {article.articleTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[var(--color-light)] px-3.5 py-1.5 text-[12.5px] font-medium text-[var(--color-ink-soft)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="mt-14 rounded-3xl border border-[var(--color-line)] bg-[var(--color-light)] p-8 text-center">
            <p className="text-lg font-medium text-[var(--color-ink)]">
              Considering a repair, replacement, or new install?
            </p>
            <p className="mt-2 text-[15px] text-[var(--color-ink-soft)]">
              We&apos;ll give you a clear recommendation and a
              straightforward quote — no pressure, no surprises.
            </p>
            <Link
              href="/#contact"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-[var(--color-navy)] px-7 py-3.5 text-[14.5px] font-semibold text-white transition-colors duration-300 hover:bg-[var(--color-blue)]"
            >
              Request a Free Estimate
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
