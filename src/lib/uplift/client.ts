import "server-only";
import { extractList, isPublished, normalizeArticle, normalizeSummary } from "./normalize";
import type { NormalizedArticle, NormalizedArticleSummary, UpliftRawArticle } from "./types";

/**
 * `import "server-only"` above is a build-time guardrail, not just a
 * comment: if any "use client" component ever imports this module
 * (directly or transitively), the Next.js build fails instead of quietly
 * shipping UPLIFT_API_TOKEN into a browser bundle.
 */

const UPLIFT_API_BASE = "https://api.upliftai.co/api/public/v1";

/**
 * How long a fetched response is trusted before Next.js revalidates it in
 * the background (stale-while-revalidate — visitors never wait on the
 * Uplift API directly). 30 minutes balances "new articles show up
 * reasonably fast" against "don't hammer Uplift on every page view."
 * Tagged so a future publish-webhook could call
 * `revalidateTag("uplift-blogs")` for near-instant updates instead of
 * waiting out the window.
 */
export const UPLIFT_REVALIDATE_SECONDS = 1800;
const UPLIFT_CACHE_TAG = "uplift-blogs";

function authHeaders(): Record<string, string> | null {
  const token = process.env.UPLIFT_API_TOKEN;
  if (!token) {
    console.error(
      "[uplift] UPLIFT_API_TOKEN is not set — /blog will show no posts until it's configured (see .env.example).",
    );
    return null;
  }
  return { Authorization: `Bearer ${token}` };
}

async function fetchJson(url: string): Promise<unknown | null> {
  const headers = authHeaders();
  if (!headers) return null;

  try {
    const res = await fetch(url, {
      headers,
      next: { revalidate: UPLIFT_REVALIDATE_SECONDS, tags: [UPLIFT_CACHE_TAG] },
    });

    if (!res.ok) {
      // Covers an invalid/expired token (401/403) and any other API-side
      // failure alike — never surface response details to the visitor,
      // just log server-side for whoever's debugging deploys.
      console.error(`[uplift] Request to ${url} failed: ${res.status} ${res.statusText}`);
      return null;
    }

    return await res.json();
  } catch (err) {
    // Network error / Uplift unreachable — same graceful-degradation path.
    console.error(`[uplift] Request to ${url} threw:`, err);
    return null;
  }
}

/** Every published article, newest logic left to normalize/consumers. */
export async function getPublishedBlogs(): Promise<NormalizedArticleSummary[]> {
  const json = await fetchJson(`${UPLIFT_API_BASE}/blogs`);
  if (json === null) return [];

  return extractList(json)
    .filter(isPublished)
    .map(normalizeSummary)
    .filter((a): a is NormalizedArticleSummary => a !== null);
}

/**
 * Full article by slug. Only one Uplift endpoint is documented (the list
 * endpoint) — this tries the conventional REST detail path first
 * (`/blogs/{slug}`) since that's the most likely real shape, and falls
 * back to finding the slug within the full list if that path doesn't
 * behave as expected. See docs noted in the integration report: worth
 * confirming the real detail-endpoint path once Uplift access is live.
 */
export async function getBlogBySlug(slug: string): Promise<NormalizedArticle | null> {
  if (!slug) return null;

  const direct = await fetchJson(`${UPLIFT_API_BASE}/blogs/${encodeURIComponent(slug)}`);
  const directRaw = extractSingle(direct);
  if (directRaw && directRaw.slug === slug) {
    return isPublished(directRaw) ? normalizeArticle(directRaw) : null;
  }

  const json = await fetchJson(`${UPLIFT_API_BASE}/blogs`);
  if (json === null) return null;
  const match = extractList(json).find((a) => a.slug === slug);
  if (!match || !isPublished(match)) return null;
  return normalizeArticle(match);
}

function extractSingle(json: unknown): UpliftRawArticle | null {
  if (!json || typeof json !== "object") return null;
  const obj = json as Record<string, unknown>;
  if (typeof obj.slug === "string") return obj as UpliftRawArticle;
  for (const key of ["data", "blog", "article"]) {
    const nested = obj[key];
    if (nested && typeof nested === "object" && typeof (nested as UpliftRawArticle).slug === "string") {
      return nested as UpliftRawArticle;
    }
  }
  return null;
}
