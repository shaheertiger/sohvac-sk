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
    api/contact/route.ts  Contact form → email (Resend)
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
- `siteConfig.siteUrl` — currently a placeholder domain. Update once the
  real domain is chosen (see LAUNCH.md).

## Scripts

```bash
npm run dev      # local dev server
npm run build    # production build (also what Vercel runs)
npm run start    # run the production build locally
npm run lint     # ESLint
```
