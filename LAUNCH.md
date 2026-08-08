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

## 2. Contact form → your inbox (15–20 min)

The form is fully built and already validates input — it just needs a
place to send email.

1. Create a free account at **[resend.com](https://resend.com)**
2. Dashboard → **API Keys** → Create API Key → copy it
3. (Recommended, do this before real traffic arrives) Dashboard →
   **Domains** → add your domain and follow the DNS verification steps,
   so emails send *from* your own domain and don't land in spam.
   Until then, the form works fine sending from Resend's shared address.
4. You'll add the key as an environment variable in step 4 below — don't
   put it in any file, it's a secret.

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
2. Before the first deploy, add these under **Environment Variables**:

   | Key | Value | Required? |
   |---|---|---|
   | `RESEND_API_KEY` | from step 2 | Yes, for the form to work |
   | `CONTACT_TO_EMAIL` | where leads should land | Yes |
   | `CONTACT_FROM_EMAIL` | `onboarding@resend.dev`, or `leads@yourdomain.com` once verified | Optional |
   | `NEXT_PUBLIC_GA_MEASUREMENT_ID` | from step 5 | Optional |

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
- **No CRM integration.** Leads currently land as email only. If volume
  grows, consider piping the `/api/contact` route into a CRM instead of
  (or alongside) email.
