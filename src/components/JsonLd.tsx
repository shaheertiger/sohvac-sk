import { siteConfig, contact, services } from "@/lib/site";

/**
 * LocalBusiness structured data.
 *
 * telephone / streetAddress are pulled from `contact` in src/lib/site.ts
 * and only included here once they're actually filled in there —
 * publishing invented NAP data in JSON-LD can mislead search engines and
 * users, so nothing renders until it's real.
 */
export function JsonLd() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    name: siteConfig.businessName,
    alternateName: siteConfig.shortName,
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    url: siteConfig.siteUrl,
    image: `${siteConfig.siteUrl}/opengraph-image.jpg`,
    logo: `${siteConfig.siteUrl}/brand/logo-icon-color.png`,
    areaServed: {
      "@type": "State",
      name: "Ontario",
    },
    priceRange: "$$",
    knowsAbout: [
      "Heating",
      "Air Conditioning",
      "Heat Pumps",
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
      name: "HVAC and Water System Services",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.name,
          description: service.description,
          areaServed: {
            "@type": "State",
            name: "Ontario",
          },
        },
      })),
    },
  };

  if (contact.phone) {
    data.telephone = contact.phone;
  }

  if (contact.email) {
    data.email = contact.email;
  }

  if (contact.hours) {
    data.openingHoursSpecification = {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    };
  }

  if (contact.streetAddress || contact.city || contact.postalCode) {
    data.address = {
      "@type": "PostalAddress",
      ...(contact.streetAddress && { streetAddress: contact.streetAddress }),
      ...(contact.city && { addressLocality: contact.city }),
      addressRegion: "ON",
      ...(contact.postalCode && { postalCode: contact.postalCode }),
      addressCountry: "CA",
    };
  } else {
    data.address = {
      "@type": "PostalAddress",
      addressRegion: "ON",
      addressCountry: "CA",
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/**
 * BreadcrumbList structured data for a non-homepage page. `path` is
 * the page's route (e.g. "/privacy") and `label` is what it should be
 * called in the trail — the homepage is always the implicit first crumb.
 */
export function BreadcrumbJsonLd({
  label,
  path,
}: {
  label: string;
  path: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: label,
        item: `${siteConfig.siteUrl}${path}`,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
