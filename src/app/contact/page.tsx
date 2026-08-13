import type { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { PageJsonLd } from "@/components/PageJsonLd";
import { siteConfig, contact, serviceCities } from "@/lib/site";

const title = "Contact Us";
const description = `Get in touch with ${siteConfig.shortName} for heating, cooling, and water system installation, repair, service, or a free second opinion on a quote you've received. Serving ${serviceCities.slice(0, 3).join(", ")}, and surrounding Ontario communities.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/contact",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${title} | ${siteConfig.shortName}`,
    description,
    url: `${siteConfig.siteUrl}/contact`,
  },
  twitter: {
    title: `${title} | ${siteConfig.shortName}`,
    description,
  },
};

export default function ContactPage() {
  const hasDirectDetails = contact.phone || contact.email;

  return (
    <>
      <PageJsonLd
        path="/contact"
        name={`${title} | ${siteConfig.shortName}`}
        description={description}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <Navbar />
      <main id="main-content" className="flex-1 bg-white pt-40 pb-28">
        <div className="mx-auto max-w-6xl px-6">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-blue)]">
            Get in touch
          </span>
          <h1 className="mt-4 font-display text-balance text-4xl font-light leading-[1.15] text-[var(--color-ink)] sm:text-5xl">
            Contact {siteConfig.shortName}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[var(--color-ink-soft)]">
            Tell us what you need — installation, repair, replacement,
            service, or a second opinion on a quote you&apos;ve received.
            We&apos;ll reach out to schedule your visit.
          </p>

          <div className="mt-16 grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-[var(--color-line)] bg-[var(--color-light)] p-8">
                <h2 className="text-lg font-semibold text-[var(--color-ink)]">
                  {siteConfig.businessName}
                </h2>

                <div className="mt-6 flex flex-col gap-5 text-[15px] text-[var(--color-ink-soft)]">
                  {contact.phone && (
                    <a
                      href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                      className="flex items-center gap-3 transition-colors hover:text-[var(--color-blue)]"
                    >
                      <Phone size={17} className="shrink-0 text-[var(--color-blue)]" />
                      {contact.phone}
                    </a>
                  )}
                  {contact.email && (
                    <a
                      href={`mailto:${contact.email}`}
                      className="flex items-center gap-3 transition-colors hover:text-[var(--color-blue)]"
                    >
                      <Mail size={17} className="shrink-0 text-[var(--color-blue)]" />
                      {contact.email}
                    </a>
                  )}
                  <div className="flex items-start gap-3">
                    <MapPin size={17} className="mt-0.5 shrink-0 text-[var(--color-blue)]" />
                    <span>{contact.serviceArea}</span>
                  </div>
                  {contact.hours.length > 0 && (
                    <div className="flex items-start gap-3">
                      <Clock size={17} className="mt-0.5 shrink-0 text-[var(--color-blue)]" />
                      <div className="flex flex-col gap-1">
                        {contact.hours.map((h) => (
                          <span key={h.label}>{h.label}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {!hasDirectDetails && (
                  <p className="mt-6 text-[13.5px] leading-relaxed text-[var(--color-ink-soft)]/80">
                    Use the form and we&apos;ll get back to you directly —
                    a public phone number and email will be listed here
                    once confirmed.
                  </p>
                )}

                <div className="mt-8 border-t border-[var(--color-line)] pt-6">
                  <h3 className="text-[13px] font-semibold uppercase tracking-[0.1em] text-[var(--color-ink)]">
                    Service area
                  </h3>
                  <p className="mt-3 text-[14.5px] leading-relaxed">
                    {serviceCities.join(", ")}, and surrounding Ontario
                    communities.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-3xl border border-[var(--color-line)] bg-white p-6 shadow-[0_1px_2px_rgba(11,31,58,0.04)] sm:p-9">
                <ContactForm idPrefix="contact-page" variant="light" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
