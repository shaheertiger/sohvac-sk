"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, Loader2, AlertCircle } from "lucide-react";

type Status = "idle" | "submitting" | "success" | "error";

type ContactFormProps = {
  /** Prefixes every field id so two instances can render without id clashes. */
  idPrefix?: string;
  /**
   * "dark" — translucent card on a navy background (the original CTASection
   * booking box). "light" — bordered card on a white/light background,
   * matching the site's existing light-section card pattern (see
   * TrustSection's `border-[var(--color-line)] bg-[var(--color-light)]`
   * cards) for use on pages like /contact.
   */
  variant?: "dark" | "light";
  className?: string;
};

/**
 * The "Request a Free Estimate" lead form. Extracted from CTASection so
 * the exact same fields, validation, and /api/contact submission logic can
 * also power the dedicated /contact page without duplicating the form.
 */
export function ContactForm({
  idPrefix = "contact",
  variant = "dark",
  className,
}: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const dark = variant === "dark";

  const fieldClasses = dark
    ? "w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3.5 text-[15px] text-white placeholder:text-white/40 outline-none transition-colors duration-200 focus:border-[var(--color-blue-soft)] focus:bg-white/[0.07]"
    : "w-full rounded-xl border border-[var(--color-line)] bg-white px-4 py-3.5 text-[15px] text-[var(--color-ink)] placeholder:text-[var(--color-ink-soft)]/70 outline-none transition-colors duration-200 focus:border-[var(--color-blue)] focus:bg-white";

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

  if (status === "success") {
    return (
      <div
        className={`flex flex-col items-center gap-3 py-10 text-center ${className ?? ""}`}
      >
        <CheckCircle2
          size={36}
          className={dark ? "text-[var(--color-blue-soft)]" : "text-[var(--color-blue)]"}
        />
        <p
          className={`text-lg font-medium ${dark ? "text-white" : "text-[var(--color-ink)]"}`}
        >
          Thank you — your request has been sent.
        </p>
        <p
          className={`max-w-sm text-sm ${dark ? "text-white/60" : "text-[var(--color-ink-soft)]"}`}
        >
          We&apos;ll be in touch shortly to help with your request.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`grid gap-4 sm:grid-cols-2 ${className ?? ""}`}>
      <div>
        <label htmlFor={`${idPrefix}-name`} className="sr-only">
          Full name
        </label>
        <input
          id={`${idPrefix}-name`}
          name="name"
          required
          type="text"
          autoComplete="name"
          placeholder="Full name"
          className={fieldClasses}
        />
      </div>
      <div>
        <label htmlFor={`${idPrefix}-phone`} className="sr-only">
          Phone number
        </label>
        <input
          id={`${idPrefix}-phone`}
          name="phone"
          required
          type="tel"
          autoComplete="tel"
          placeholder="Phone number"
          className={fieldClasses}
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${idPrefix}-email`} className="sr-only">
          Email address
        </label>
        <input
          id={`${idPrefix}-email`}
          name="email"
          required
          type="email"
          autoComplete="email"
          placeholder="Email address"
          className={fieldClasses}
        />
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={`${idPrefix}-message`} className="sr-only">
          What&apos;s going on? (optional)
        </label>
        <textarea
          id={`${idPrefix}-message`}
          name="message"
          placeholder="What's going on? (optional)"
          rows={3}
          className={`w-full resize-none ${fieldClasses}`}
        />
      </div>

      {status === "error" && (
        <div
          className={`sm:col-span-2 flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm ${
            dark ? "text-red-200" : "text-red-700"
          }`}
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={`group sm:col-span-2 mt-1 inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-[15px] font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-70 ${
          dark
            ? "bg-white text-[var(--color-navy)] hover:bg-[var(--color-blue)] hover:text-white hover:shadow-[0_12px_32px_rgba(30,115,255,0.4)]"
            : "bg-[var(--color-navy)] text-white hover:bg-[var(--color-blue)] hover:shadow-[0_12px_32px_rgba(30,115,255,0.35)]"
        }`}
      >
        {status === "submitting" ? (
          <>
            <Loader2 size={17} className="animate-spin" />
            Sending...
          </>
        ) : (
          <>
            Request a Free Estimate
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </>
        )}
      </button>

      <p
        className={`sm:col-span-2 text-center text-[12.5px] leading-relaxed ${
          dark ? "text-white/45" : "text-[var(--color-ink-soft)]"
        }`}
      >
        By submitting, you agree to be contacted about your request. See our{" "}
        <a
          href="/privacy"
          className={`underline ${dark ? "hover:text-white/70" : "hover:text-[var(--color-blue)]"}`}
        >
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
