# Future content-publishing API — architecture

Not built yet as a working feature. This documents the intended design so
an authenticated API (for tools like Uplift AI or another automation
system) can be added cleanly later, and records the one file that already
exists as a foundation: `src/app/api/content/articles/route.ts`.

## Why nothing publishes yet

There's no blog/article rendering in this codebase today — no
`content/` collection, no `/blog/[slug]` route, no CMS. Building a
publishing API before there's anywhere for it to publish *to* would mean
either faking success or quietly doing nothing, both worse than not
building it. The scaffold that does exist enforces the one rule that
matters most (no unauthenticated writes) and stops there.

## Intended request flow, once built

```
Uplift AI (or similar)
  → POST /api/content/articles              (create a draft)
  → PATCH /api/content/articles/:id         (update draft / metadata)
  → POST /api/content/articles/:id/publish  (flip draft → published)
  → GET /api/content/articles(/:id)         (read back current state)
```

Every one of these requires a valid bearer token (see Auth below) — there
is no public/anonymous write path, and no anonymous read path either,
since "published" content should just be the rendered page itself, not a
duplicate JSON API surface.

## Layers

1. **Route handlers** (`src/app/api/content/**/route.ts`) — HTTP concerns
   only: parse the request, call `verifyContentApiKey`, call the service
   layer, map its result to a status code. No storage or business logic
   inline in the route file.
2. **Service layer** (`src/lib/content/*`) — the actual create/update/
   publish logic, storage-agnostic at the call site so the route handlers
   (and, later, anything else that needs to publish — a cron job, an admin
   UI) share one implementation instead of duplicating it.
   - `src/lib/content/auth.ts` — `verifyContentApiKey()`, already in place.
   - `src/lib/content/validation.ts` — payload validation, already in
     place for the `articles` draft shape; extend as the real payload
     (rich body, SEO fields, media) firms up.
   - `src/lib/content/store.ts` (not yet created) — where persistence
     would live once a backend is chosen (see below).
3. **Storage** — not chosen yet. Two reasonable options:
   - **File-based** (simplest, fits this project's current size): each
     article as an MDX or JSON file under `content/blog/`, written via
     the Node `fs` API from the route handler (this only works on a
     platform with a writable filesystem at runtime, or by having the API
     open a PR via the GitHub API instead of writing directly — worth
     deciding once Vercel's deployment model for this is confirmed, since
     Vercel's production filesystem is read-only).
   - **Database-backed** (Vercel Postgres, Supabase, etc.) — better once
     volume or editorial workflow (multiple drafts, revisions, scheduled
     publish) outgrows flat files.
4. **Publish side-effects** — when status flips to `published`: call
   Next.js `revalidatePath`/`revalidateTag` so the new page appears
   without a full redeploy, and optionally fire an outbound webhook
   (Slack notification, etc.) — both belong in the service layer, not the
   route handler.

## Auth

`CONTENT_API_KEYS` env var (see `.env.example`): comma-separated
`name:key` pairs, e.g.

```
CONTENT_API_KEYS="uplift-ai:<random-64-char-secret>,internal-cms:<other-secret>"
```

Naming each key lets one integration be revoked independently (drop its
pair, redeploy) without rotating every other integration's secret. Keys
are generated once (e.g. `openssl rand -hex 32`) and set only in Vercel →
Project → Settings → Environment Variables — never committed.

`verifyContentApiKey()` in `src/lib/content/auth.ts` is the single place
that checks the `Authorization: Bearer <key>` header against that list.
Every current and future mutating route calls it first and returns `401`
before touching anything else if it fails. This must stay true as storage
gets wired up — do not add a write path that skips it.

## Validation

`validateArticleDraft()` in `src/lib/content/validation.ts` hand-checks
the payload shape (title/slug/description/body/status) and rejects
anything malformed with a `400` and a list of specific errors, before any
write is attempted. Not using a schema library (zod, etc.) yet since the
shape is still small — worth adding once the real payload (rich content,
SEO metadata, media references) is defined against the actual integration.

## What's already in the repo

- `src/lib/content/auth.ts` — bearer-token verification against
  `CONTENT_API_KEYS`.
- `src/lib/content/validation.ts` — article-draft payload validation.
- `src/app/api/content/articles/route.ts` — `GET`/`POST`, both requiring
  auth, both currently returning `501 Not Implemented` once auth and
  validation pass (there's nothing to store into yet). This is the
  extension point: once a storage layer is chosen, its logic goes in
  `src/lib/content/store.ts` and gets called from here instead of the
  `501` response.
