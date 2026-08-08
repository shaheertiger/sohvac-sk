"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Snowfall } from "./Snowfall";

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
      {/* Photographic backdrop — wide, bright establishing shot, house low in frame */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1, x: 0, y: 0 }}
          animate={{ scale: 1.18, x: "-1.5%", y: "-1%" }}
          transition={{ duration: 20, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
          className="absolute inset-0"
        >
          <Image
            src="/images/hero-home-v2.jpg"
            alt="A grand modern Canadian luxury home at golden hour"
            fill
            priority
            className="object-cover"
            style={{ objectPosition: "center 20%" }}
            sizes="100vw"
          />
        </motion.div>

        {/* Reinforce the natural dark sky so the headline stays crisp on any display */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(4,10,20,0.65) 0%, rgba(4,10,20,0.35) 30%, rgba(4,10,20,0.07) 52%, rgba(4,10,20,0.01) 62%)",
          }}
        />
        <div className="absolute inset-0 bg-[var(--color-navy-deep)]/[0.08]" />

        <motion.div
          animate={{ x: [0, 24, 0], y: [0, -16, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-[8%] top-[4%] h-[420px] w-[420px] rounded-full opacity-20 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(30,115,255,0.55) 0%, rgba(30,115,255,0) 70%)",
          }}
        />

        {/* Diagonal light sweep — sells the "living scene" illusion */}
        <motion.div
          aria-hidden="true"
          animate={{ x: ["-30%", "130%"] }}
          transition={{ duration: 9, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
          className="absolute inset-y-0 left-0 w-1/3 mix-blend-overlay"
          style={{
            background:
              "linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.16) 45%, rgba(255,255,255,0) 100%)",
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

      {/* Snowfall — sits between the photo and the headline, like it's
          falling just in front of the camera */}
      <Snowfall count={46} className="z-[5]" />

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
            className="font-display text-balance text-[2.75rem] font-light leading-[1.08] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.55)] sm:text-6xl lg:text-[4.5rem]"
          >
            Get a Second Opinion
            <br />
            <span className="italic text-[var(--color-blue-soft)]">
              Before You Spend Thousands.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-xl text-balance text-lg leading-relaxed text-white/90 drop-shadow-[0_2px_16px_rgba(0,0,0,0.55)] sm:text-xl"
          >
            Before you replace a furnace, air conditioner, or water heater,
            you deserve honest advice — not a sales pitch. SO HVAC helps
            Ontario homeowners understand their options clearly, so every
            decision is an informed one.
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
                Book a Free Second Opinion
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
