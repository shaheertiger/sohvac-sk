"use client";

import { Reveal } from "./Reveal";
import { Clock } from "lucide-react";

export function FinancingTeaser() {
  return (
    <section id="financing" className="relative bg-[var(--color-light)] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-[var(--color-line)] bg-white px-8 py-10 sm:flex-row sm:items-center sm:px-12">
            <div className="flex items-start gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-navy)]/[0.06] text-[var(--color-navy)]">
                <Clock size={20} strokeWidth={1.75} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-[var(--color-ink)]">
                    Financing
                  </h3>
                  <span className="rounded-full bg-[var(--color-blue)]/10 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-blue)]">
                    Coming Soon
                  </span>
                </div>
                <p className="mt-2 max-w-lg text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
                  We&apos;re building flexible financing options for
                  homeowners who need them. Details will be published here
                  as soon as they&apos;re finalized.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
