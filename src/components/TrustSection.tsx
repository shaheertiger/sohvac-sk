"use client";

import { Reveal, RevealGroup, itemVariants } from "./Reveal";
import { motion } from "framer-motion";
import { Eye, Scale, MessageCircle } from "lucide-react";

const principles = [
  {
    icon: Eye,
    title: "See it clearly",
    body: "We walk you through what's actually happening with your system — in plain language, not sales jargon.",
  },
  {
    icon: Scale,
    title: "Compare before you commit",
    body: "A major HVAC purchase deserves the same diligence as any large home investment. We encourage you to compare options.",
  },
  {
    icon: MessageCircle,
    title: "Ask, don't guess",
    body: "If something doesn't add up in a quote you've received, ask us. Honest answers, without the pressure to buy.",
  },
];

export function TrustSection() {
  return (
    <section id="why" className="relative bg-white py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-blue)]">
                Why &ldquo;Second Opinion&rdquo;
              </span>
              <h2 className="mt-5 font-display text-balance text-4xl font-light leading-[1.15] text-[var(--color-ink)] sm:text-5xl">
                Our name is a promise, not a marketing line.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 text-lg leading-relaxed text-[var(--color-ink-soft)]">
                We&apos;re called Second Opinion HVAC because that&apos;s
                exactly what we offer. Replacing a furnace, air conditioner,
                or water heater is one of the largest decisions a homeowner
                makes — and most people only ever hear from the company
                trying to sell them the equipment.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-[var(--color-ink-soft)]">
                We exist to be the honest, independent voice in that
                process. We&apos;ll tell you what we&apos;d tell a family
                member: what needs attention now, what can wait, and what
                questions to ask before you sign anything.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:pl-8">
            <RevealGroup className="grid gap-5 sm:grid-cols-2">
              {principles.map((p, i) => (
                <motion.div
                  key={p.title}
                  variants={itemVariants}
                  className={`group relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-[var(--color-light)] p-8 transition-all duration-500 hover:border-[var(--color-blue)]/30 hover:shadow-[0_20px_50px_rgba(11,31,58,0.08)] ${
                    i === 2 ? "sm:col-span-2" : ""
                  }`}
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-navy)] transition-colors duration-500 group-hover:bg-[var(--color-blue)]">
                    <p.icon size={20} className="text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--color-ink)]">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
                    {p.body}
                  </p>
                </motion.div>
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </section>
  );
}
