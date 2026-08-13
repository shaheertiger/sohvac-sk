/**
 * Auth for the future content-publishing API (src/app/api/content/**).
 *
 * Single source of truth for "is this caller allowed to write content" —
 * route handlers call `verifyContentApiKey`, they never compare the header
 * to an env var themselves. That keeps the check consistent and gives
 * every integration (Uplift AI, others later) its own revocable key.
 *
 * CONTENT_API_KEYS format: comma-separated "name:key" pairs, e.g.
 *   CONTENT_API_KEYS="uplift-ai:<random-64-char-secret>,internal-cms:<other-secret>"
 * Naming each key means one integration can be revoked (drop its pair and
 * redeploy) without rotating everyone else's.
 *
 * Set only in Vercel → Project → Settings → Environment Variables. Never
 * commit real values — see .env.example for the placeholder.
 */
export type ContentApiCaller = { name: string };

export function verifyContentApiKey(request: Request): ContentApiCaller | null {
  const header = request.headers.get("authorization") ?? "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) return null;
  const presentedKey = match[1].trim();
  if (!presentedKey) return null;

  const configured = process.env.CONTENT_API_KEYS ?? "";
  for (const pair of configured.split(",")) {
    const [name, key] = pair.split(":").map((s) => s.trim());
    if (name && key && key === presentedKey) {
      return { name };
    }
  }
  return null;
}
