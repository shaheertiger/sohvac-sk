import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import type { NormalizedArticleSummary } from "@/lib/uplift/types";
import { formatArticleDate } from "@/lib/uplift/format";

export function ArticleCard({ article }: { article: NormalizedArticleSummary }) {
  const dateLabel = formatArticleDate(article.publishDate);

  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-[var(--color-line)] bg-white shadow-[0_1px_2px_rgba(11,31,58,0.04)] transition-all duration-500 hover:border-[var(--color-blue)]/25 hover:shadow-[0_24px_60px_rgba(11,31,58,0.1)]"
    >
      {article.featuredImage && (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--color-light)]">
          <Image
            src={article.featuredImage.url}
            alt={article.featuredImage.alt || article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            sizes="(min-width: 1024px) 33vw, 100vw"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-7">
        {article.categories.length > 0 && (
          <span className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[var(--color-blue)]">
            {article.categories[0]}
          </span>
        )}

        <h3 className="mt-3 text-[18px] font-semibold leading-snug text-[var(--color-ink)]">
          {article.title}
        </h3>

        {article.excerpt && (
          <p className="mt-2.5 line-clamp-3 text-[14.5px] leading-relaxed text-[var(--color-ink-soft)]">
            {article.excerpt}
          </p>
        )}

        <div className="mt-5 flex flex-1 items-end justify-between text-[13px] text-[var(--color-ink-soft)]/80">
          <div className="flex items-center gap-3">
            {dateLabel && <span>{dateLabel}</span>}
            {article.readingTimeMinutes && (
              <span className="flex items-center gap-1">
                <Clock size={12} />
                {article.readingTimeMinutes} min read
              </span>
            )}
          </div>
          <ArrowUpRight
            size={16}
            className="text-[var(--color-ink-soft)]/40 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--color-blue)]"
          />
        </div>
      </div>
    </Link>
  );
}
