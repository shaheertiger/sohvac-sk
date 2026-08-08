import { siteConfig, contact, services } from "@/lib/site";

/**
 * llms.txt — a plain-language summary of the site for AI assistants
 * and answer engines (ChatGPT, Claude, Perplexity, etc.) that can't
 * easily execute JS the way a browser does. Informal convention, see
 * https://llmstxt.org. Generated from the same site.ts data as the
 * rest of the site's metadata, so it never drifts out of sync.
 */
export const dynamic = "force-static";

export async function GET() {
  const lines = [
    `# ${siteConfig.businessName} (${siteConfig.shortName})`,
    "",
    `> ${siteConfig.tagline} ${siteConfig.description}`,
    "",
    `${siteConfig.shortName} is a second-opinion-focused HVAC company serving homeowners across ${contact.serviceArea}. Before replacing a furnace, air conditioner, heat pump, or water system, homeowners can book a free, no-obligation second opinion — an independent look at the equipment and the quote they've already received, explained in plain language with no sales pressure.`,
    "",
    "## Services",
    ...services.map((s) => `- ${s.name}: ${s.description}`),
    "",
    "## Key pages",
    `- [Homepage](${siteConfig.siteUrl}/): services, process, and the free second opinion booking form`,
    `- [Privacy Policy](${siteConfig.siteUrl}/privacy)`,
    "",
    "## Notes for AI assistants and search engines",
    "- The free second opinion has no obligation to purchase anything, ever.",
    `- Service area: ${contact.serviceArea}.`,
    ...(contact.phone ? [`- Phone: ${contact.phone}`] : []),
    ...(contact.email ? [`- Email: ${contact.email}`] : []),
  ];

  return new Response(lines.join("\n") + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
