"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal, RevealGroup, itemVariants } from "./Reveal";
import { motion } from "framer-motion";
import { faqs } from "@/lib/site";

/**
 * FAQPage structured data — mirrors `faqs` exactly, per Google's
 * guidance that FAQ schema must match visible page content. Scoped to
 * this section (not the site-wide JsonLd) since FAQPage schema should
 * describe the page it actually appears on.
 */
function FAQJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-white py-28 sm:py-36">
      <FAQJsonLd />
      <div className="mx-auto max-w-3xl px-6">
        <Reveal className="text-center">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-blue)]">
            FAQ
          </span>
          <h2 className="mt-5 font-display text-balance text-4xl font-light leading-[1.15] text-[var(--color-ink)] sm:text-5xl">
            Frequently asked questions.
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 divide-y divide-[var(--color-line)] rounded-3xl border border-[var(--color-line)]">
          {faqs.map((faq, i) => {
            const open = openIndex === i;
            return (
              <motion.div key={faq.question} variants={itemVariants}>
                <h3>
                  <button
                    type="button"
                    id={`faq-header-${i}`}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left text-[15.5px] font-semibold text-[var(--color-ink)] transition-colors duration-300 hover:text-[var(--color-blue)] sm:px-8"
                  >
                    {faq.question}
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-[var(--color-ink-soft)] transition-transform duration-300 ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-header-${i}`}
                  className={`grid transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-[15px] leading-relaxed text-[var(--color-ink-soft)] sm:px-8">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
