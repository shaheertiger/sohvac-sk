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
    privacy/page.tsx      Privacy policy
    sitemap.ts            Auto-generated sitemap.xml
    robots.ts             Auto-generated robots.txt
    opengraph-image.jpg   Social share image
  components/            One file per site section (Hero, Navbar, etc.)
  lib/
    site.ts               ⚠️ Business info, nav, services — edit this first
public/
  brand/                 Logo files (all official variants + favicon set)
  images/                 Generated photography used across the site
```

## Before you touch anything else, edit `src/lib/site.ts`

- `contact` — phone, email, address. Empty fields stay hidden on the site
  and out of the SEO structured data; nothing fake is ever shown.
  `contact.email` also doubles as the formsubmit.co destination address
  for the contact form (see below).
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
