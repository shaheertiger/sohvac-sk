"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";
import { serviceCities } from "@/lib/site";

export function AboutSection() {
  return (
    <section id="about" className="relative bg-white py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-blue)]">
                About SO HVAC
              </span>
              <h2 className="mt-5 font-display text-balance text-4xl font-light leading-[1.15] text-[var(--color-ink)] sm:text-5xl">
                Second Opinion HVAC Services Inc.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 text-lg leading-relaxed text-[var(--color-ink-soft)]">
                We&apos;re a full-service Ontario HVAC company providing
                installation, repair, and maintenance for heating,
                cooling, and water systems across{" "}
                {serviceCities.slice(0, 4).join(", ")}, and surrounding
                communities — built around one idea: homeowners make
                better decisions when they have straightforward
                information.
              </p>
              <p className="mt-5 text-lg leading-relaxed text-[var(--color-ink-soft)]">
                Second Opinion. First Choice. isn&apos;t just our tagline —
                it&apos;s why homeowners trust us with everything from
                routine maintenance to full system replacements.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.15}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-[var(--color-light)]">
                <Image
                  src="/images/about-technician.jpg"
                  alt="An SO HVAC technician walking a homeowner through their options"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(11,31,58,0) 60%, rgba(11,31,58,0.25) 100%)",
                  }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
