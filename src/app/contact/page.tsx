import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { siteConfig, contact, services } from "@/lib/site";

const contactDescription = `Contact ${siteConfig.businessName} for a free, no-pressure second opinion on heating, cooling, and water systems. Serving homeowners across ${contact.serviceArea}.`;

export const metadata: Metadata = {
  title: "Contact Us",
  description: contactDescription,
  alternates: {
    canonical: "/contact",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    title: `Contact Us | ${siteConfig.shortName}`,
    description: contactDescription,
    url: "/contact",
  },
  twitter: {
    title: `Contact Us | ${siteConfig.shortName}`,
    description: contactDescription,
  },
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd label="Contact" path="/contact" />
      <Navbar />
      <main id="main-content" className="flex-1 bg-white pt-40 pb-28">
        <div className="mx-auto max-w-3xl px-6">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-blue)]">
            Get in touch
          </span>
          <h1 className="mt-4 font-display text-4xl font-light leading-[1.15] text-[var(--color-ink)] sm:text-5xl">
            Contact {siteConfig.shortName}
          </h1>
          <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed text-[var(--color-ink-soft)]">
            Book a free, no-pressure second opinion on your heating,
            cooling, or water system — or reach out with any question.
            We&apos;ll get back to you quickly.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {contact.phone && (
              <a
                href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                className="flex items-start gap-4 rounded-2xl border border-[var(--color-line)] p-6 transition-colors hover:border-[var(--color-blue)]"
              >
                <Phone size={20} className="mt-0.5 shrink-0 text-[var(--color-blue)]" />
                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-wide text-[var(--color-ink-soft)]">
                    Phone
                  </p>
                  <p className="mt-1 text-[17px] font-medium text-[var(--color-ink)]">
                    {contact.phone}
                  </p>
                </div>
              </a>
            )}

            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex items-start gap-4 rounded-2xl border border-[var(--color-line)] p-6 transition-colors hover:border-[var(--color-blue)]"
              >
                <Mail size={20} className="mt-0.5 shrink-0 text-[var(--color-blue)]" />
                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-wide text-[var(--color-ink-soft)]">
                    Email
                  </p>
                  <p className="mt-1 text-[17px] font-medium text-[var(--color-ink)]">
                    {contact.email}
                  </p>
                </div>
              </a>
            )}

            {contact.serviceArea && (
              <div className="flex items-start gap-4 rounded-2xl border border-[var(--color-line)] p-6">
                <MapPin size={20} className="mt-0.5 shrink-0 text-[var(--color-blue)]" />
                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-wide text-[var(--color-ink-soft)]">
                    Service area
                  </p>
                  <p className="mt-1 text-[17px] font-medium text-[var(--color-ink)]">
                    {contact.serviceArea}
                  </p>
                </div>
              </div>
            )}

            {contact.hours && (
              <div className="flex items-start gap-4 rounded-2xl border border-[var(--color-line)] p-6">
                <Clock size={20} className="mt-0.5 shrink-0 text-[var(--color-blue)]" />
                <div>
                  <p className="text-[13px] font-semibold uppercase tracking-wide text-[var(--color-ink-soft)]">
                    Hours
                  </p>
                  <p className="mt-1 text-[17px] font-medium text-[var(--color-ink)]">
                    {contact.hours}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-10 rounded-2xl bg-[var(--color-light)] p-6 sm:p-8">
            <h2 className="font-display text-xl font-normal text-[var(--color-ink)]">
              What we help with
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
              {services.map((s) => s.name).join(", ")}.
            </p>
          </div>

          <div className="mt-10">
            <Link
              href="/#booking"
              className="inline-flex items-center justify-center rounded-full bg-[var(--color-navy)] px-7 py-3.5 text-[15px] font-semibold text-white transition-colors duration-300 hover:bg-[var(--color-blue)]"
            >
              Book a Free Second Opinion
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
