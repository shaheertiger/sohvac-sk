import { NextResponse } from "next/server";
import { verifyContentApiKey } from "@/lib/content/auth";
import { validateArticleDraft } from "@/lib/content/validation";

export const runtime = "nodejs";

/**
 * Foundation for the future authenticated content-publishing API (e.g.
 * Uplift AI or another automation system creating/updating blog posts).
 * See docs/content-api-architecture.md for the full design.
 *
 * This is intentionally NOT a working publish endpoint yet — there is no
 * blog/content storage or rendering in the codebase to publish into. What
 * IS real and enforced here: no request is answered, not even with an
 * error that echoes back payload details, until it presents a valid
 * CONTENT_API_KEYS bearer token. That's the one rule that must never be
 * relaxed when storage gets wired up behind this route — do not add a
 * write path here without going through verifyContentApiKey() first.
 */

export async function POST(request: Request) {
  const caller = verifyContentApiKey(request);
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const result = validateArticleDraft(payload);
  if (!result.ok) {
    return NextResponse.json({ error: "Validation failed.", details: result.errors }, { status: 400 });
  }

  // Auth + validation both passed — this is the point where a real
  // implementation would persist `result.data` (file-based content/
  // collection, or a database) and, if status === "published", trigger
  // revalidation (revalidatePath/revalidateTag) so the new page appears.
  // Neither exists yet, so this reports that plainly instead of pretending
  // to have saved something it didn't.
  console.info(`[content-api] Authenticated request from "${caller.name}" — storage not yet implemented.`);
  return NextResponse.json(
    {
      error: "Not implemented yet — authentication and validation succeeded, but no content storage is wired up.",
      seeDocs: "docs/content-api-architecture.md",
    },
    { status: 501 },
  );
}

export async function GET(request: Request) {
  const caller = verifyContentApiKey(request);
  if (!caller) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  return NextResponse.json(
    {
      error: "Not implemented yet — no content storage is wired up.",
      seeDocs: "docs/content-api-architecture.md",
    },
    { status: 501 },
  );
}
