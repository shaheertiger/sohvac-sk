# Launch checklist

Everything code-side is done and builds clean. What's left is account
setup and business info that only the SO HVAC team has — none of it
requires touching code beyond editing one file.

---

## 1. Fill in business info (5 min)

Open `src/lib/site.ts`, find the `contact` object near the top, and fill
in what you have:

```ts
export const contact = {
  phone: "",          // e.g. "(416) 555-0123"
  email: "",           // a real monitored inbox
  streetAddress: "",   // optional — see note in the file
  city: "",
  postalCode: "",
  serviceArea: "Ontario, Canada",
};
```

Whatever you fill in appears automatically in the footer, the contact
section, and the site's structured data (the thing Google reads to show
your business info in search results). Anything left blank just stays
hidden — nothing fake ever displays.

---

## 2. Contact form → your inbox (2 min)

The form is fully built and submits straight to
**[formsubmit.co](https://formsubmit.co)** — no account, no API key, no
backend to configure. It's wired to `contact.email` in
`src/lib/site.ts` (currently `info@sohvac.ca`).

1. The **first** submission formsubmit.co receives for that address
   triggers a one-time confirmation email — someone with access to that
   inbox must click the link in it before real submissions start
   arriving. Send yourself a test submission from the live site once
   it's deployed and confirm it.
2. To change where leads go, just edit `email` in the `contact` object
   in `src/lib/site.ts` — nothing else needs to change.

---

## 3. Push to GitHub

```bash
cd "SO HVAC Website"
git init
git add .
git commit -m "Initial launch-ready site"
```

Create a new (private, recommended) repo on GitHub, then:

```bash
git remote add origin <your-repo-url>
git branch -M main
git push -u origin main
```

---

## 4. Deploy on Vercel (same day)

1. Go to **[vercel.com/new](https://vercel.com/new)**, sign in, and
   import the GitHub repo. Framework preset (Next.js) is auto-detected —
   no config needed.
2. Before the first deploy, optionally add under **Environment
   Variables**:

   | Key | Value | Required? |
   |---|---|---|
   | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | from step 5 | Optional |

   The contact form needs no environment variables — it POSTs directly
   to formsubmit.co from the browser using the email set in
   `src/lib/site.ts`.

3. Click **Deploy**. It'll be live at a `*.vercel.app` URL in about a
   minute.
4. **Connect your real domain**: Project → Settings → Domains → add
   `sohvac.ca` (or whatever you register) and follow Vercel's DNS
   instructions.
5. Once the domain is live, update `siteUrl` in `src/lib/site.ts` to the
   real domain, commit, and push — Vercel redeploys automatically. This
   one line feeds the sitemap, canonical tags, and social share links, so
   it matters.

---

## 5. Analytics (15 min, optional but recommended)

1. **[analytics.google.com](https://analytics.google.com)** → Admin →
   create a property → create a **Web** data stream for your domain.
2. Copy the **Measurement ID** (`G-XXXXXXXXXX`).
3. Add it as `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel's environment
   variables (step 4) and redeploy.

---

## 6. Tell Google the site exists (10 min)

1. **[Google Search Console](https://search.google.com/search-console)**
   → add your domain as a property → verify (Vercel domain settings
   shows the DNS TXT record to use).
2. Submit the sitemap: `https://yourdomain.com/sitemap.xml`

---

## 6a. Make sure Vercel isn't blocking crawlers (5 min, check every time)

Everything crawler-facing that code controls (robots.txt, headers,
sitemap) is already correct and can't accidentally block Googlebot or
other legitimate crawlers. But two **Vercel dashboard settings** — not
part of this repo — can silently block every crawler including Google,
and code can't detect or fix them. Check under
**Project → Settings**:

- **Deployment Protection** — must be **off** (or at minimum not set to
  "Standard Protection"/Vercel Authentication) for the production
  domain. If it's on, *every* request — including Googlebot — gets
  redirected to a login page instead of the site, and nothing will
  index.
- **Firewall** (if you're on a plan with Vercel's Bot/Attack
  Challenge features) — make sure "Bot Protection" or any challenge
  mode isn't set to block or CAPTCHA well-known crawler user agents
  (Googlebot, Bingbot, and AI crawlers like GPTBot, ClaudeBot,
  PerplexityBot, Google-Extended). These ship off by default, but
  worth a look if they were ever enabled.

If you're using Cloudflare or another CDN/WAF in front of Vercel,
check its bot-management rules too — same failure mode.

---

## 7. Final smoke test before sharing the link

- [ ] Submit the contact form on the *live* site and confirm the email
      arrives
- [ ] Check the site on an actual phone, not just a resized browser
- [ ] Click every nav link and both CTA buttons
- [ ] View the `/privacy` page
- [ ] Share the homepage link in Slack/iMessage once and confirm the
      preview card shows the branded image, not a blank/broken one

---

## What's intentionally not included

- **No cookie consent banner.** Not legally required under PIPEDA the
  way GDPR requires it, but revisit this if you start running paid ads
  with retargeting pixels.
- **No blog/content section.** Fine for launch; worth adding later for
  long-tail local SEO ("heat pump vs furnace Ontario," etc.).
- **No CRM integration.** Leads currently land as email only (via
  formsubmit.co). If volume grows, consider a CRM-connected form backend
  instead of (or alongside) email.
