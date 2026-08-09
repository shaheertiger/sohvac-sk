# SO HVAC — Website

Second Opinion HVAC Services Inc. — marketing site. Next.js (App Router) +
TypeScript + Tailwind CSS + Framer Motion.

See **[LAUNCH.md](./LAUNCH.md)** for the deployment checklist — that's the
one to hand to whoever is putting this live.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project structure

```
src/
  app/
    page.tsx            Homepage — assembles all sections
    layout.tsx           Global metadata, fonts, JSON-LD, analytics
    contact/page.tsx      Contact page — phone, email, service area, hours
    privacy/page.tsx      Privacy policy
    sitemap.ts            Auto-generated sitemap.xml
    robots.ts             Auto-generated robots.txt
    llms.txt/route.ts     Auto-generated llms.txt (AI/answer-engine summary)
    opengraph-image.jpg   Social share image
  components/            One file per site section (Hero, Navbar, etc.)
    JsonLd.tsx             LocalBusiness + services structured data
    FAQSection.tsx          FAQ accordion + FAQPage structured data
  lib/
    site.ts               ⚠️ Business info, nav, services, FAQs — edit this first
public/
  brand/                 Logo files (all official variants + favicon set)
  images/                 Generated photography used across the site
```

## SEO

- **Structured data** — `JsonLd.tsx` emits `HVACBusiness` schema (NAP,
  service area, `hasOfferCatalog` listing every service) site-wide;
  `FAQSection.tsx` emits matching `FAQPage` schema scoped to the FAQ
  section itself, generated from the same `faqs` array it renders — the
  schema can never drift from what's actually on the page.
- **`/llms.txt`** — a plain-language site summary for AI assistants and
  answer engines (ChatGPT, Claude, Perplexity, etc.), generated from
  `site.ts` at `src/app/llms.txt/route.ts`.
- **Metadata** — full Open Graph/Twitter cards, canonical URLs,
  author/publisher tags, and a title template are set in `layout.tsx`;
  `sitemap.ts`/`robots.ts` cover crawlers and both stay in sync with
  `siteConfig.siteUrl` automatically.
- Every piece of business data (`contact`, `services`, `faqs`) lives in
  `site.ts` — nothing fake is ever published in copy or structured
  data, and empty fields just stay hidden.

## Before you touch anything else, edit `src/lib/site.ts`

- `contact` — phone, email, address, hours. Empty fields stay hidden on
  the site and out of the SEO structured data; nothing fake is ever
  shown. `contact.email` also doubles as the formsubmit.co destination
  address for the contact form (see below).
- `siteConfig.siteUrl` — currently a placeholder domain. Update once the
  real domain is chosen (see LAUNCH.md).

## Contact form

The booking form (`src/components/CTASection.tsx`) submits directly to
[formsubmit.co](https://formsubmit.co) — no backend route, no API key.
It POSTs to `https://formsubmit.co/ajax/<contact.email>` with the
visitor's details, sets `Reply-To` to the visitor's email, and includes
a hidden honeypot field for basic spam filtering. The very first
submission to a given address triggers a one-time confirmation email
from formsubmit.co that must be clicked before it starts delivering.

## Scripts

```bash
npm run dev      # local dev server
npm run build    # production build (also what Vercel runs)
npm run start    # run the production build locally
npm run lint     # ESLint
```
