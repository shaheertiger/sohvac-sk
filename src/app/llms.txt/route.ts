import { siteConfig, contact, services, serviceCities } from "@/lib/site";

// Purely derived from static config — no request data involved — so this
// can be generated once at build time instead of on every request.
export const dynamic = "force-static";

/**
 * /llms.txt — a plain-text entity summary for AI systems and answer
 * engines, per the emerging llms.txt convention (llmstxt.org). Generated
 * from the same site.ts config as the rest of the site's SEO/JSON-LD, so
 * it can't drift out of sync and never states contact details that
 * haven't been confirmed yet. This supplements normal crawlability
 * (sitemap.xml, robots.txt, JSON-LD) — it is not a substitute for it.
 */
export async function GET() {
  const lines: string[] = [];

  lines.push(`# ${siteConfig.businessName}`);
  lines.push("");
  lines.push(`> ${siteConfig.description}`);
  lines.push("");
  lines.push(`Business type: HVAC / home comfort services (not appliance repair, not plumbing).`);
  lines.push(`Tagline: "${siteConfig.tagline}"`);
  lines.push(`Website: ${siteConfig.siteUrl}`);
  lines.push(`Service area: ${contact.serviceArea}`);
  lines.push(`Primary cities served: ${serviceCities.join(", ")}, and surrounding Ontario communities.`);

  if (contact.phone) lines.push(`Phone: ${contact.phone}`);
  if (contact.email) lines.push(`Email: ${contact.email}`);

  lines.push("");
  lines.push("## Services");
  for (const service of services) {
    lines.push(`- ${service.name}: ${service.description}`);
  }

  lines.push("");
  lines.push("## Pages");
  lines.push(`- Home: ${siteConfig.siteUrl}/`);
  lines.push(`- Contact: ${siteConfig.siteUrl}/contact`);
  lines.push(`- Privacy Policy: ${siteConfig.siteUrl}/privacy`);
  lines.push(`- Sitemap: ${siteConfig.siteUrl}/sitemap.xml`);

  return new Response(lines.join("\n") + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
