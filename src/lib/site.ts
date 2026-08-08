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
} from "lucide-react";

export const nav = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Why SO HVAC", href: "#why" },
  { label: "Second Opinion", href: "#second-opinion" },
  { label: "Financing", href: "#financing", badge: "Coming Soon" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const services = [
  {
    name: "Heating",
    description:
      "Furnace and heating system evaluations, repairs, and honest replacement guidance.",
    icon: Flame,
  },
  {
    name: "Air Conditioning",
    description:
      "Cooling system assessments and installations sized correctly for your home.",
    icon: Snowflake,
  },
  {
    name: "Heat Pumps",
    description:
      "All-in-one heating and cooling advice for Ontario's four-season climate.",
    icon: ThermometerSun,
  },
  {
    name: "Tankless Water Heaters",
    description:
      "On-demand hot water systems evaluated for real household usage.",
    icon: Wind,
  },
  {
    name: "Water Heaters",
    description:
      "Conventional tank water heater inspection, service, and replacement advice.",
    icon: Droplets,
  },
  {
    name: "Water Softeners",
    description:
      "Hard water solutions explained clearly, without unnecessary upsells.",
    icon: Waves,
  },
  {
    name: "Reverse Osmosis",
    description:
      "Drinking water filtration systems reviewed for quality and value.",
    icon: FlaskConical,
  },
  {
    name: "Indoor Air Quality",
    description:
      "Air quality solutions for cleaner, healthier air throughout your home.",
    icon: AirIcon,
  },
  {
    name: "Maintenance",
    description:
      "Preventative maintenance plans that protect your existing equipment.",
    icon: Wrench,
  },
  {
    name: "Emergency Service",
    description:
      "Responsive support when your home comfort systems need attention now.",
    icon: Siren,
  },
];

/**
 * ⚠️ FILL THIS IN BEFORE LAUNCH.
 *
 * Every field left empty here stays hidden on the site (footer, contact
 * section) and omitted from JSON-LD — nothing fake gets shown in the
 * meantime. The moment a field is filled in, it appears everywhere it's
 * used automatically. No other file needs to change.
 *
 * `phone` — displayed as-is, and used as a tel: link. Use the format you
 *   want shown, e.g. "(416) 555-0123".
 * `email` — a real monitored inbox, shown as a mailto: link.
 * `streetAddress` / `city` / `postalCode` — only needed if you want a
 *   physical address published (optional for a service-area business;
 *   many HVAC companies intentionally omit this and rely on
 *   `serviceArea` + Google Business Profile instead).
 */
export const contact = {
  phone: "",
  email: "info@sohvac.ca",
  streetAddress: "",
  city: "",
  postalCode: "",
  serviceArea: "Ontario, Canada",
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
    "Helping Ontario homeowners make informed home comfort decisions before spending thousands of dollars. Book a free, no-pressure second opinion on heating, cooling, and water systems.",
  areaServed: "Ontario, Canada",
};
