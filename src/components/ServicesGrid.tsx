"use client";

import { motion } from "framer-motion";
import { Reveal, RevealGroup, itemVariants } from "./Reveal";
import { services } from "@/lib/site";
import { ArrowUpRight } from "lucide-react";

export function ServicesGrid() {
  return (
    <section
      id="services"
      className="relative bg-[var(--color-light)] py-28 sm:py-36"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-blue)]">
              Core Services
            </span>
            <h2 className="mt-5 font-display text-balance text-4xl font-light leading-[1.15] text-[var(--color-ink)] sm:text-5xl">
              Complete home comfort, evaluated honestly.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-[var(--color-ink-soft)]">
              Whatever system is in question, our approach stays the same:
              a clear assessment first, a recommendation second.
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <motion.div
              key={service.name}
              variants={itemVariants}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-[var(--color-line)] bg-white p-8 shadow-[0_1px_2px_rgba(11,31,58,0.04)] transition-all duration-500 hover:border-[var(--color-blue)]/25 hover:shadow-[0_24px_60px_rgba(11,31,58,0.1)]"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle, rgba(30,115,255,0.18) 0%, rgba(30,115,255,0) 70%)",
                }}
              />
              <div className="relative flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--color-navy)]/[0.06] text-[var(--color-navy)] transition-colors duration-500 group-hover:bg-[var(--color-navy)] group-hover:text-white">
                  <service.icon size={21} strokeWidth={1.75} />
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-[var(--color-ink-soft)]/40 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:text-[var(--color-blue)]"
                />
              </div>
              <h3 className="relative mt-6 text-[17px] font-semibold text-[var(--color-ink)]">
                {service.name}
              </h3>
              <p className="relative mt-2.5 text-[14.5px] leading-relaxed text-[var(--color-ink-soft)]">
                {service.description}
              </p>
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
