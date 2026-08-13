import {
  Flame,
  Snowflake,
  Wind,
  Droplets,
  Waves,
  FlaskConical,
  Wind as AirIcon,
  Wrench,
  Siren,
  ThermometerSun,
  Gauge,
} from "lucide-react";

/**
 * Nav hrefs are homepage-relative ("/#section") rather than bare
 * ("#section") on purpose — this is the site's only nav config, shared by
 * both <Navbar> and <Footer>, and it's rendered on every route (home,
 * /privacy, /contact, ...). A bare "#contact" href only works on the page
 * that actually has an element with id="contact" (today, just "/"); on
 * every other page it's a dead link. "/#contact" works everywhere: on the
 * homepage the browser treats it as a same-document hash scroll (no
 * reload), and from any other page it navigates to the homepage and then
 * scrolls to the section.
 */
export const nav = [
  { label: "Home", href: "/#home" },
  { label: "Services", href: "/#services" },
  { label: "Why SO HVAC", href: "/#why" },
  { label: "How It Works", href: "/#second-opinion" },
  { label: "Financing", href: "/#financing", badge: "Coming Soon" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/#contact" },
];

export const services = [
  {
    name: "Heating",
    description:
      "Furnace installation, repair, and replacement — keeping your home warm and running reliably all winter.",
    icon: Flame,
  },
  {
    name: "Air Conditioning",
    description:
      "Air conditioner installation, repair, and replacement, sized and installed right the first time.",
    icon: Snowflake,
  },
  {
    name: "Heat Pumps",
    description:
      "Heat pump installation and replacement — efficient, all-in-one heating and cooling for Ontario's climate.",
    icon: ThermometerSun,
  },
  {
    name: "Boilers",
    description:
      "Boiler installation, repair, and replacement for reliable whole-home heating.",
    icon: Gauge,
  },
  {
    name: "Tankless Water Heaters",
    description:
      "Tankless water heater installation and service — endless hot water, sized right for your household.",
    icon: Wind,
  },
  {
    name: "Water Heaters",
    description:
      "Conventional water heater installation, repair, and replacement, done right.",
    icon: Droplets,
  },
  {
    name: "Water Softeners",
    description:
      "Water softener installation and service — a real fix for hard water, sized for your home.",
    icon: Waves,
  },
  {
    name: "Reverse Osmosis",
    description:
      "Reverse osmosis drinking water system installation for cleaner, better-tasting water at the tap.",
    icon: FlaskConical,
  },
  {
    name: "Indoor Air Quality",
    description:
      "Indoor air quality systems installed for cleaner, healthier air throughout your home.",
    icon: AirIcon,
  },
  {
    name: "Maintenance",
    description:
      "Preventative maintenance plans that keep your equipment running reliably for years.",
    icon: Wrench,
  },
  {
    name: "Emergency Service",
    description:
      "Fast, responsive repair when your heating, cooling, or water system needs attention now.",
    icon: Siren,
  },
];

/**
 * Primary cities SO HVAC serves, used in on-page copy and in the
 * HVACBusiness JSON-LD `areaServed` list (src/components/JsonLd.tsx).
 * This is real business context, not guessed — update it if the actual
 * service area changes.
 */
export const serviceCities = [
  "Mississauga",
  "Oakville",
  "Burlington",
  "Brampton",
  "Milton",
  "Hamilton",
];

/**
 * ⚠️ FILL THIS IN BEFORE LAUNCH.
 *
 * Every field left empty here stays hidden on the site (footer, contact
 * section, /contact page) and omitted from JSON-LD — nothing fake ever
 * gets shown or published in structured data in the meantime. The moment
 * a field is filled in, it appears everywhere it's used automatically.
 * No other file needs to change.
 *
 * `phone` — displayed as-is, and used as a tel: link. Use the format you
 *   want shown, e.g. "(416) 555-0123".
 * `email` — a real monitored inbox, shown as a mailto: link.
 * `streetAddress` / `city` / `postalCode` — only needed if you want a
 *   physical address published (optional for a service-area business;
 *   many HVAC companies intentionally omit this and rely on
 *   `serviceArea` + Google Business Profile instead). Leave these blank
 *   unless SO HVAC has a real public office address — do not fill with a
 *   placeholder just to satisfy LocalBusiness schema.
 * `hours` — optional. Only fill in if these are real, published hours;
 *   an empty array hides openingHours everywhere (footer, /contact,
 *   JSON-LD `openingHoursSpecification`).
 */
export const contact = {
  phone: "(825) 258-5471",
  email: "info@sohvac.ca",
  streetAddress: "",
  city: "",
  postalCode: "",
  serviceArea:
    "Ontario, Canada — focused on Mississauga, Oakville, Burlington, Brampton, Milton, Hamilton, and surrounding areas.",
  /**
   * Each entry maps straight onto schema.org OpeningHoursSpecification, and
   * `label` is the human-readable form shown on the footer/Contact page.
   * Example once real hours are confirmed:
   *   { label: "Monday – Friday: 8:00 AM – 6:00 PM",
   *     dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"],
   *     opens: "08:00", closes: "18:00" }
   * Leave empty until real hours are confirmed — an empty array hides
   * hours everywhere (footer, /contact, JSON-LD `openingHoursSpecification`).
   */
  hours: [] as { label: string; dayOfWeek: string[]; opens: string; closes: string }[],
};

/**
 * ⚠️ TODO — fill in only with SO HVAC's own, real, verified profiles.
 * Each URL populates JSON-LD `sameAs` (src/components/JsonLd.tsx) and
 * helps search engines confirm this is the same business across the web.
 * Leave a platform blank if SO HVAC doesn't have (or hasn't confirmed) a
 * profile there yet — never fill with a guessed or placeholder URL.
 */
export const socialLinks = {
  facebook: "",
  instagram: "",
  linkedin: "",
  youtube: "",
  googleBusinessProfile: "",
};

/**
 * Site-wide constants for metadata, JSON-LD, sitemap, and canonical URLs.
 *
 * ⚠️ siteUrl is a PLACEHOLDER. Replace with the real production domain
 * before launch — it feeds metadataBase, canonical tags, sitemap.xml,
 * robots.txt, and the JSON-LD "url" field, all of which should point to
 * the actual live domain, not a guess.
 */
export const siteConfig = {
  siteUrl: "https://www.sohvac.ca",
  businessName: "Second Opinion HVAC Services Inc.",
  shortName: "SO HVAC",
  tagline: "Second Opinion. First Choice.",
  description:
    "Professional heating, cooling, and water system installation, repair, and service for Ontario homeowners — backed by straightforward recommendations and a free second opinion whenever you want one.",
  areaServed: "Ontario, Canada",
};
