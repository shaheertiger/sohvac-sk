/**
 * Manual payload validation for the future content-publishing API.
 *
 * Deliberately not using a schema library (zod, etc.) yet — the shape is
 * still small enough that hand-written checks are clearer than adding a
 * new dependency for it. Revisit once the real payload (rich body content,
 * SEO fields, media references) is defined with the actual integration
 * (e.g. Uplift AI) — see docs/content-api-architecture.md.
 */

export type ArticleDraftInput = {
  title: string;
  slug: string;
  description: string;
  body: string;
  status: "draft" | "published";
};

export type ValidationResult =
  | { ok: true; data: ArticleDraftInput }
  | { ok: false; errors: string[] };

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateArticleDraft(input: unknown): ValidationResult {
  const errors: string[] = [];

  if (typeof input !== "object" || input === null) {
    return { ok: false, errors: ["Request body must be a JSON object."] };
  }

  const body = input as Record<string, unknown>;

  const title = typeof body.title === "string" ? body.title.trim() : "";
  if (!title || title.length > 160) {
    errors.push("`title` is required and must be 1-160 characters.");
  }

  const slug = typeof body.slug === "string" ? body.slug.trim() : "";
  if (!slug || !SLUG_PATTERN.test(slug)) {
    errors.push("`slug` is required and must be lowercase-kebab-case (e.g. \"furnace-maintenance-tips\").");
  }

  const description = typeof body.description === "string" ? body.description.trim() : "";
  if (!description || description.length > 300) {
    errors.push("`description` is required and must be 1-300 characters.");
  }

  const articleBody = typeof body.body === "string" ? body.body : "";
  if (!articleBody) {
    errors.push("`body` is required.");
  }

  const status = body.status === "published" ? "published" : body.status === "draft" ? "draft" : null;
  if (!status) {
    errors.push('`status` must be "draft" or "published".');
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    data: { title, slug, description, body: articleBody, status: status! },
  };
}
