import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArticleCard } from "@/components/ArticleCard";
import { PageJsonLd } from "@/components/PageJsonLd";
import { getPublishedBlogs } from "@/lib/uplift/client";
import { siteConfig } from "@/lib/site";

// Route segment config must be a literal — Next.js's build-time config
// extraction can't resolve an imported identifier here. Keep this in sync
// with UPLIFT_REVALIDATE_SECONDS in src/lib/uplift/client.ts, which is
// what actually governs the underlying fetch's cache lifetime; this just
// lets the rendered page itself follow the same cadence.
export const revalidate = 1800;

const title = "Blog";
const description = `HVAC tips, seasonal maintenance advice, and honest guidance from ${siteConfig.shortName} — helping Ontario homeowners make informed home comfort decisions.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/blog" },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${title} | ${siteConfig.shortName}`,
    description,
    url: `${siteConfig.siteUrl}/blog`,
    type: "website",
  },
  twitter: {
    title: `${title} | ${siteConfig.shortName}`,
    description,
  },
};

export default async function BlogIndexPage() {
  const articles = await getPublishedBlogs();

  return (
    <>
      <PageJsonLd
        path="/blog"
        name={`${title} | ${siteConfig.shortName}`}
        description={description}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]}
      />
      <Navbar />
      <main id="main-content" className="flex-1 bg-[var(--color-light)] pt-40 pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-blue)]">
              From SO HVAC
            </span>
            <h1 className="mt-5 font-display text-balance text-4xl font-light leading-[1.15] text-[var(--color-ink)] sm:text-5xl">
              Home comfort, explained honestly.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-ink-soft)]">
              {description}
            </p>
          </div>

          {articles.length > 0 ? (
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="mx-auto mt-16 max-w-lg rounded-3xl border border-[var(--color-line)] bg-white p-10 text-center">
              <p className="text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
                No articles published yet — check back soon, or{" "}
                <Link href="/#contact" className="font-medium text-[var(--color-blue)] hover:underline">
                  request a free estimate
                </Link>{" "}
                in the meantime.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
