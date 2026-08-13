import { siteConfig, contact, services, serviceCities, socialLinks } from "@/lib/site";

/**
 * Site-wide structured data: HVACBusiness (a schema.org LocalBusiness
 * subtype) + WebSite, rendered once in the root layout so it's present,
 * server-rendered, on every page without being duplicated per route.
 * Per-page WebPage/BreadcrumbList data lives in <PageJsonLd> instead.
 *
 * Only real, verified information is emitted. telephone / email / address /
 * openingHours / sameAs all come from `contact` / `socialLinks` in
 * src/lib/site.ts and are skipped entirely when left blank there — nothing
 * fabricated ever ships in structured data.
 */
export function JsonLd() {
  const base = siteConfig.siteUrl;
  const businessId = `${base}/#business`;
  const websiteId = `${base}/#website`;

  const business: Record<string, unknown> = {
    "@type": "HVACBusiness",
    "@id": businessId,
    name: siteConfig.businessName,
    alternateName: siteConfig.shortName,
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    url: base,
    image: `${base}/opengraph-image.jpg`,
    logo: `${base}/brand/logo-icon-color.png`,
    priceRange: "$$",
    areaServed: [
      { "@type": "State", name: "Ontario" },
      ...serviceCities.map((city) => ({
        "@type": "City",
        name: city,
        containedInPlace: { "@type": "State", name: "Ontario" },
      })),
    ],
    knowsAbout: [
      "Heating",
      "Air Conditioning",
      "Heat Pumps",
      "Boilers",
      "Tankless Water Heaters",
      "Water Heaters",
      "Water Softeners",
      "Reverse Osmosis",
      "Indoor Air Quality",
      "HVAC Maintenance",
      "Emergency HVAC Service",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "HVAC & Home Comfort Services",
      itemListElement: services.map((service, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          provider: { "@id": businessId },
          areaServed: { "@type": "State", name: "Ontario" },
        },
      })),
    },
  };

  if (contact.phone) {
    business.telephone = contact.phone;
    business.contactPoint = [
      {
        "@type": "ContactPoint",
        telephone: contact.phone,
        contactType: "customer service",
        areaServed: "CA-ON",
        availableLanguage: ["en"],
        ...(contact.email && { email: contact.email }),
      },
    ];
  }

  if (contact.email) {
    business.email = contact.email;
  }

  if (contact.streetAddress || contact.city || contact.postalCode) {
    business.address = {
      "@type": "PostalAddress",
      ...(contact.streetAddress && { streetAddress: contact.streetAddress }),
      ...(contact.city && { addressLocality: contact.city }),
      addressRegion: "ON",
      ...(contact.postalCode && { postalCode: contact.postalCode }),
      addressCountry: "CA",
    };
  } else {
    // No street address published (common for a service-area HVAC
    // business) — region-only address, no fabricated street/postal code.
    business.address = {
      "@type": "PostalAddress",
      addressRegion: "ON",
      addressCountry: "CA",
    };
  }

  if (contact.hours.length > 0) {
    business.openingHoursSpecification = contact.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    }));
  }

  const sameAs = Object.values(socialLinks).filter(Boolean);
  if (sameAs.length > 0) {
    business.sameAs = sameAs;
  }

  const website: Record<string, unknown> = {
    "@type": "WebSite",
    "@id": websiteId,
    url: base,
    name: siteConfig.shortName,
    description: siteConfig.description,
    inLanguage: "en-CA",
    publisher: { "@id": businessId },
  };

  const data = {
    "@context": "https://schema.org",
    "@graph": [business, website],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
