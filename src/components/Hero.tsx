"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-[var(--color-navy-deep)]"
    >
      {/* Photographic backdrop — a slow "drone rise": the house stays put
          and fully in view the whole time, low scale change, while a
          gentle upward pan adds subtle motion, like the camera gaining
          altitude rather than the shot moving or zooming. */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.05, y: "0%" }}
          animate={{ scale: 1.1, y: "6%" }}
          transition={{ duration: 20, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/hero-house-final.jpg"
            alt="A luxury modern home at dusk, warmly lit, with a residential heat pump/condenser unit visible beside the front steps"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center 32%" }}
            sizes="100vw"
          />
        </motion.div>

        {/* This photo is already a moody, navy-toned dusk shot — no
            duotone/color wash needed on top of it, just the legibility
            gradients below. Darkens top-to-bottom AND left-to-right (left
            is where the headline sits) so the text stays clearly readable
            regardless of how bright/busy the underlying photo is at any
            given point. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(3,8,17,0.72) 0%, rgba(3,8,17,0.5) 32%, rgba(3,8,17,0.32) 58%, rgba(3,8,17,0.2) 78%, rgba(3,8,17,0.12) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(3,8,17,0.68) 0%, rgba(3,8,17,0.38) 42%, rgba(3,8,17,0) 72%)",
          }}
        />

        {/* Floating atmospheric motes — faint parallax-style drift */}
        {[
          { left: "12%", top: "58%", size: 5, dur: 14, delay: 0 },
          { left: "22%", top: "40%", size: 3, dur: 11, delay: 1.5 },
          { left: "68%", top: "50%", size: 4, dur: 16, delay: 0.6 },
          { left: "80%", top: "34%", size: 3, dur: 12.5, delay: 2.2 },
          { left: "45%", top: "62%", size: 3, dur: 13, delay: 3.1 },
        ].map((m, i) => (
          <motion.span
            key={i}
            aria-hidden="true"
            className="absolute rounded-full bg-white"
            style={{ left: m.left, top: m.top, width: m.size, height: m.size }}
            animate={{ y: [0, -22, 0], opacity: [0, 0.35, 0] }}
            transition={{
              duration: m.dur,
              delay: m.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        <div className="absolute inset-0 bg-noise mix-blend-overlay opacity-50" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto w-full max-w-7xl flex-1 px-6 pt-36 sm:pt-40"
      >
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-[var(--color-blue-soft)] shadow-[0_1px_6px_rgba(0,0,0,0.5)]" />
            <span className="text-[12.5px] font-semibold uppercase tracking-[0.22em] text-[var(--color-blue-soft)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
              Second Opinion. First Choice.
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-balance text-[2.75rem] font-bold leading-[1.08] text-white drop-shadow-[0_4px_28px_rgba(0,0,0,0.7)] sm:text-6xl lg:text-[4.5rem]"
          >
            Heating, Cooling &amp; Water,
            <br />
            <span className="italic text-[var(--color-blue-soft)]">
              Done Right.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-xl text-balance text-lg font-medium leading-relaxed text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.65)] sm:text-xl"
          >
            From new installations to repairs and replacements, SO HVAC
            provides professional heating, cooling, and water system
            service across Ontario — backed by straightforward
            recommendations you can trust.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="mt-11 flex flex-col gap-5"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <MagneticButton
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-[15px] font-semibold text-[var(--color-navy)] shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition-colors duration-300 hover:bg-[var(--color-blue)] hover:text-white"
              >
                Request a Free Estimate
                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </MagneticButton>
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-black/20 px-7 py-4 text-[15px] font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/60 hover:bg-white/10"
              >
                Explore Our Services
              </a>
            </div>
            <span className="text-[13px] font-medium tracking-wide text-white/80 drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]">
              No sales pressure. Ever.
            </span>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="relative z-10 mb-7 flex justify-center"
      >
        <div className="flex h-9 w-6 items-start justify-center rounded-full border border-white/40 p-1.5">
          <motion.span
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-white/80"
          />
        </div>
      </motion.div>
    </section>
  );
}

function MagneticButton({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.a
      href={href}
      className={className}
      whileHover={{ scale: 1.035 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
    >
      {children}
    </motion.a>
  );
}
