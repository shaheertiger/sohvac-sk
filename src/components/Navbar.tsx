"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { nav } from "@/lib/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const dark = scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 py-2.5 transition-all duration-500 ${
            scrolled
              ? "glass shadow-[0_8px_30px_rgba(11,31,58,0.08)] border border-[var(--color-line)]"
              : "border border-transparent"
          }`}
        >
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <Image
              src={
                dark
                  ? "/brand/logo-horizontal-color.png"
                  : "/brand/logo-horizontal-white.png"
              }
              alt="SO HVAC — Second Opinion. First Choice."
              width={200}
              height={65}
              priority
              className="h-8 w-auto transition-opacity duration-300 sm:h-9"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`group relative flex items-center gap-1.5 rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors duration-300 ${
                  dark
                    ? "text-[var(--color-navy)]/80 hover:text-[var(--color-navy)]"
                    : "text-white/85 hover:text-white"
                }`}
              >
                {item.label}
                {item.badge && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide transition-colors duration-300 ${
                      dark
                        ? "bg-[var(--color-blue)]/10 text-[var(--color-blue)]"
                        : "bg-white/10 text-[var(--color-blue-soft)]"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
                <span
                  className={`absolute inset-x-4 -bottom-0.5 h-px scale-x-0 transition-transform duration-300 group-hover:scale-x-100 ${
                    dark ? "bg-[var(--color-blue)]" : "bg-white"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/#contact"
              className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-[13.5px] font-semibold text-[var(--color-navy)] shadow-sm transition-all duration-300 hover:bg-[var(--color-blue)] hover:text-white hover:shadow-[0_8px_24px_rgba(30,115,255,0.35)]"
            >
              Request a Free Estimate
            </Link>
          </div>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 lg:hidden ${
              dark ? "text-[var(--color-navy)]" : "text-white"
            }`}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mx-4 mt-2 rounded-2xl border border-[var(--color-line)] glass p-4 lg:hidden"
          >
            <nav className="flex flex-col">
              {nav.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium text-[var(--color-navy)]"
                >
                  {item.label}
                  {item.badge && (
                    <span className="rounded-full bg-[var(--color-blue)]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--color-blue)]">
                      {item.badge}
                    </span>
                  )}
                </a>
              ))}
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center rounded-full bg-[var(--color-navy)] px-5 py-3 text-[15px] font-semibold text-white"
              >
                Request a Free Estimate
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
