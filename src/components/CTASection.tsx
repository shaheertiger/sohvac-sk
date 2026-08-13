"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { ContactForm } from "./ContactForm";
import { MapPin, Phone } from "lucide-react";
import { contact, serviceCities } from "@/lib/site";

export function CTASection() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[var(--color-navy)] py-28 sm:py-36"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(80% 60% at 20% 100%, rgba(30,115,255,0.22) 0%, rgba(30,115,255,0) 60%)",
        }}
      />

      <motion.div
        aria-hidden="true"
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] opacity-[0.06] sm:h-[560px] sm:w-[560px]"
      >
        <Image
          src="/brand/logo-icon-white.png"
          alt=""
          fill
          className="object-contain"
        />
      </motion.div>

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        <Reveal>
          <h2 className="font-display text-balance text-4xl font-light leading-[1.12] text-white sm:text-6xl">
            Let&apos;s get your home
            <br />
            <span className="italic text-[var(--color-blue-soft)]">
              comfortable again.
            </span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-white/65">
            Tell us what&apos;s going on — a repair, a replacement, a new
            installation, or a second opinion on a quote you&apos;ve
            received. We&apos;ll reach out to schedule your service.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div
            id="booking"
            className="mx-auto mt-14 max-w-2xl scroll-mt-32 rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-left backdrop-blur-sm sm:p-9"
          >
            <ContactForm idPrefix="cta" variant="dark" />
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mx-auto mt-10 flex flex-col items-center justify-center gap-3 text-sm text-white/60 sm:flex-row sm:gap-6">
            <div className="flex items-center gap-2">
              <MapPin size={15} />
              <span>
                Serving {serviceCities.slice(0, 3).join(", ")} & across Ontario
              </span>
            </div>
            {contact.phone && (
              <a
                href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
                className="flex items-center gap-2 transition-colors hover:text-white"
              >
                <Phone size={15} />
                <span>{contact.phone}</span>
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
