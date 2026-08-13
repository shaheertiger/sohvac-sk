import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import { nav, contact } from "@/lib/site";

export function Footer() {
  const hasContactDetails = contact.phone || contact.email || contact.streetAddress;

  return (
    <footer className="bg-[var(--color-navy-deep)] py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <Image
              src="/brand/logo-horizontal-white.png"
              alt="SO HVAC — Second Opinion. First Choice."
              width={190}
              height={62}
              className="h-9 w-auto"
            />
            <p className="mt-5 text-[14.5px] leading-relaxed text-white/50">
              Professional heating, cooling, and water system
              installation, repair, and service across Ontario.
            </p>

            <Link
              href="/contact"
              className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-medium text-[var(--color-blue-soft)] transition-colors hover:text-white"
            >
              View full contact details
              <ArrowRight size={13} />
            </Link>

            {hasContactDetails && (
              <div className="mt-6 flex flex-col gap-2.5 text-[14px] text-white/60">
                {contact.phone && (
                  <a
                    href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                    className="flex items-center gap-2 transition-colors hover:text-white"
                  >
                    <Phone size={14} />
                    {contact.phone}
                  </a>
                )}
                {contact.email && (
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-2 transition-colors hover:text-white"
                  >
                    <Mail size={14} />
                    {contact.email}
                  </a>
                )}
                {contact.streetAddress && (
                  <span className="flex items-center gap-2">
                    <MapPin size={14} />
                    {contact.streetAddress}
                    {contact.city ? `, ${contact.city}` : ""}
                    {contact.postalCode ? ` ${contact.postalCode}` : ""}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-x-12 gap-y-3 sm:grid-cols-3">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[14px] text-white/55 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-[13px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Second Opinion HVAC Services
            Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a href="/privacy" className="transition-colors hover:text-white/70">
              Privacy Policy
            </a>
            <p>Second Opinion. First Choice.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
