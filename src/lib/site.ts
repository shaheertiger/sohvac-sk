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
  { label: "FAQ", href: "#faq" },
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
  phone: "(905) 202-6267",
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

/**
 * FAQ content — shown in the FAQ section and mirrored into FAQPage
 * structured data (see FAQSection.tsx). Every answer here is grounded
 * in copy that already appears elsewhere on the site, so the schema
 * never asserts anything the page itself doesn't say.
 */
export const faqs = [
  {
    question: "Is the free second opinion really free?",
    answer:
      "Yes. Booking a second opinion through SO HVAC costs nothing, and there's no obligation to buy anything afterward — no countdown timers, no scare tactics, no sales pressure. Ever.",
  },
  {
    question: "What happens during a second opinion?",
    answer:
      "You tell us what you've been told — a quote, a recommendation, or simply a system that's giving you trouble. We take an honest, independent look at the equipment, separate from whoever gave the first opinion, then explain plainly what's actually required, what's optional, and what to ask before you sign anything.",
  },
  {
    question: "What systems can SO HVAC evaluate?",
    answer: `We evaluate ${services.map((s) => s.name).join(", ")} — whatever home comfort system is in question.`,
  },
  {
    question: "What areas does SO HVAC serve?",
    answer: `We serve homeowners across ${contact.serviceArea}.`,
  },
  {
    question:
      "Why get a second opinion instead of just trusting the first quote?",
    answer:
      "Replacing a furnace, air conditioner, or water heater is one of the largest decisions a homeowner makes, and most people only ever hear from the company trying to sell them the equipment. An independent second opinion means someone with no stake in which system you choose tells you what needs attention now, what can wait, and what questions to ask before you commit.",
  },
  {
    question: "Does SO HVAC offer financing?",
    answer:
      "Flexible financing options for homeowners are coming soon. Ask us for the latest when you book your free second opinion.",
  },
];
