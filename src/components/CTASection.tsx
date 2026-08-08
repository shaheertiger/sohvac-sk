"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "./Reveal";
import { ArrowRight, MapPin, Phone, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { contact } from "@/lib/site";

const fieldClasses =
  "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-[15px] text-white placeholder:text-white/40 outline-none transition-colors duration-200 focus:border-[var(--color-blue-soft)] focus:bg-white/[0.07]";

type Status = "idle" | "submitting" | "success" | "error";

export function CTASection() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
    }
  }

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
            Before you spend thousands,
            <br />
            <span className="italic text-[var(--color-blue-soft)]">
              get a second opinion.
            </span>
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-white/65">
            Tell us a little about your home and what&apos;s going on.
            We&apos;ll reach out to schedule your free, no-pressure second
            opinion.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div
            id="booking"
            className="mx-auto mt-14 max-w-2xl scroll-mt-32 rounded-3xl border border-white/10 bg-white/[0.04] p-6 text-left backdrop-blur-sm sm:p-9"
          >
            {status === "success" ? (
              <div className="flex flex-col items-center gap-3 py-10 text-center">
                <CheckCircle2 size={36} className="text-[var(--color-blue-soft)]" />
                <p className="text-lg font-medium text-white">
                  Thank you — your request has been sent.
                </p>
                <p className="max-w-sm text-sm text-white/60">
                  We&apos;ll be in touch to schedule your free second
                  opinion.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="cta-name" className="sr-only">
                    Full name
                  </label>
                  <input
                    id="cta-name"
                    name="name"
                    required
                    type="text"
                    autoComplete="name"
                    placeholder="Full name"
                    className={fieldClasses}
                  />
                </div>
                <div>
                  <label htmlFor="cta-phone" className="sr-only">
                    Phone number
                  </label>
                  <input
                    id="cta-phone"
                    name="phone"
                    required
                    type="tel"
                    autoComplete="tel"
                    placeholder="Phone number"
                    className={fieldClasses}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="cta-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="cta-email"
                    name="email"
                    required
                    type="email"
                    autoComplete="email"
                    placeholder="Email address"
                    className={fieldClasses}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="cta-message" className="sr-only">
                    What&apos;s going on? (optional)
                  </label>
                  <textarea
                    id="cta-message"
                    name="message"
                    placeholder="What's going on? (optional)"
                    rows={3}
                    className={`w-full resize-none ${fieldClasses}`}
                  />
                </div>

                {status === "error" && (
                  <div className="sm:col-span-2 flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="group sm:col-span-2 mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-[15px] font-semibold text-[var(--color-navy)] transition-all duration-300 hover:bg-[var(--color-blue)] hover:text-white hover:shadow-[0_12px_32px_rgba(30,115,255,0.4)] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 size={17} className="animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Book a Free Second Opinion
                      <ArrowRight
                        size={17}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}
                </button>

                <p className="sm:col-span-2 text-center text-[12.5px] leading-relaxed text-white/45">
                  By submitting, you agree to be contacted about your
                  request. See our{" "}
                  <a href="/privacy" className="underline hover:text-white/70">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mx-auto mt-10 flex flex-col items-center justify-center gap-3 text-sm text-white/60 sm:flex-row sm:gap-6">
            <div className="flex items-center gap-2">
              <MapPin size={15} />
              <span>Serving homeowners across Ontario</span>
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
