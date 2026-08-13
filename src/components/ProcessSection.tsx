"use client";

import { motion } from "framer-motion";
import { Reveal, RevealGroup, itemVariants } from "./Reveal";

const steps = [
  {
    number: "01",
    title: "Tell us what you need",
    body: "A repair, a replacement, a new installation, or a second opinion on a quote you've received — start with a call or a quick form.",
  },
  {
    number: "02",
    title: "We take a firsthand look",
    body: "We inspect the equipment and the situation directly and give you a straightforward, no-surprises assessment.",
  },
  {
    number: "03",
    title: "You get a clear explanation",
    body: "What's actually required, what's optional, and what the real trade-offs are — explained plainly.",
  },
  {
    number: "04",
    title: "You decide, without pressure",
    body: "No countdown timers, no scare tactics. You make the call once you feel genuinely informed.",
  },
];

export function ProcessSection() {
  return (
    <section
      id="second-opinion"
      className="relative overflow-hidden bg-[var(--color-navy-deep)] py-28 sm:py-36"
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(90% 60% at 85% 10%, rgba(30,115,255,0.18) 0%, rgba(30,115,255,0) 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-blue-soft)]">
              How It Works
            </span>
            <h2 className="mt-5 font-display text-balance text-4xl font-light leading-[1.15] text-white sm:text-5xl">
              Four steps. Zero pressure.
            </h2>
          </Reveal>
        </div>

        <RevealGroup className="mt-20 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div key={step.number} variants={itemVariants} className="relative">
              <span className="font-display text-5xl font-light text-white/15">
                {step.number}
              </span>
              <h3 className="mt-5 text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-[14.5px] leading-relaxed text-white/60">
                {step.body}
              </p>
              {i < steps.length - 1 && (
                <div className="absolute -right-4 top-6 hidden h-px w-8 bg-white/15 lg:block" />
              )}
            </motion.div>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
