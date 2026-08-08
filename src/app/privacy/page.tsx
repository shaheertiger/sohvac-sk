import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { siteConfig, contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.businessName} collects, uses, and protects your information.`,
  robots: { index: true, follow: true },
};

const lastUpdated = "August 2026";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 bg-white pt-40 pb-28">
        <div className="mx-auto max-w-3xl px-6">
          <span className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[var(--color-blue)]">
            Legal
          </span>
          <h1 className="mt-4 font-display text-4xl font-light leading-[1.15] text-[var(--color-ink)] sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-[var(--color-ink-soft)]">
            Last updated: {lastUpdated}
          </p>

          <div className="prose-block mt-12 space-y-9 text-[15.5px] leading-relaxed text-[var(--color-ink-soft)]">
            <section>
              <p>
                {siteConfig.businessName} (&quot;SO HVAC,&quot;
                &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates
                this website and provides home comfort services to
                homeowners in {contact.serviceArea}. This policy explains
                what information we collect when you use this site,
                how we use it, and the choices you have. It&apos;s written
                to be consistent with Canada&apos;s Personal Information
                Protection and Electronic Documents Act (PIPEDA) and
                Canada&apos;s Anti-Spam Legislation (CASL).
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-normal text-[var(--color-ink)]">
                Information we collect
              </h2>
              <p className="mt-4">
                When you submit the &quot;Book a Free Second Opinion&quot;
                form, we collect the information you provide directly:
                your name, phone number, email address, and any details
                you choose to share about your home comfort system.
              </p>
              <p className="mt-4">
                We do not ask for or knowingly collect financial account
                numbers, government identification, or other sensitive
                information through this form.
              </p>
              <p className="mt-4">
                Like most websites, we may also collect basic technical
                information automatically — such as pages visited and
                general usage patterns — through analytics tools, to
                understand how the site is used and to improve it.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-normal text-[var(--color-ink)]">
                How we use your information
              </h2>
              <p className="mt-4">We use the information you submit to:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5">
                <li>
                  Contact you to schedule and provide your free second
                  opinion consultation;
                </li>
                <li>
                  Respond to questions or requests you send us;
                </li>
                <li>
                  Maintain records of our communications with you for
                  service and quality purposes; and
                </li>
                <li>
                  Understand and improve how visitors use this website.
                </li>
              </ul>
              <p className="mt-4">
                We do not sell your personal information to third
                parties. We do not use the information you submit for
                automated marketing calls or texts without your consent.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-normal text-[var(--color-ink)]">
                Cookies and analytics
              </h2>
              <p className="mt-4">
                This site may use privacy-conscious analytics tools
                (such as Google Analytics) to understand overall traffic
                and site performance. These tools may use cookies or
                similar technology. You can control or disable cookies
                through your browser settings at any time.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-normal text-[var(--color-ink)]">
                How we protect your information
              </h2>
              <p className="mt-4">
                We take reasonable administrative and technical measures
                to protect the information you share with us from loss,
                misuse, and unauthorized access. No method of electronic
                transmission or storage is perfectly secure, but we work
                to protect your information appropriately for its
                sensitivity.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-normal text-[var(--color-ink)]">
                Your choices and rights
              </h2>
              <p className="mt-4">
                You can ask us at any time what information we hold
                about you, request that we correct it, or ask us to
                delete it, subject to any legal or legitimate business
                record-keeping requirements. If you&apos;ve provided
                your email or phone number and no longer want to be
                contacted, let us know and we will honour that request.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-normal text-[var(--color-ink)]">
                Contact us
              </h2>
              {contact.email ? (
                <p className="mt-4">
                  Questions about this policy or your information can be
                  sent to{" "}
                  <a
                    href={`mailto:${contact.email}`}
                    className="font-medium text-[var(--color-blue)] hover:underline"
                  >
                    {contact.email}
                  </a>
                  .
                </p>
              ) : (
                <p className="mt-4">
                  Questions about this policy or your information can be
                  sent through the{" "}
                  <Link
                    href="/#contact"
                    className="font-medium text-[var(--color-blue)] hover:underline"
                  >
                    contact form
                  </Link>{" "}
                  on this site.
                </p>
              )}
            </section>

            <section>
              <h2 className="font-display text-2xl font-normal text-[var(--color-ink)]">
                Changes to this policy
              </h2>
              <p className="mt-4">
                We may update this policy from time to time as our
                practices or applicable law change. The &quot;last
                updated&quot; date at the top of this page reflects the
                most recent revision.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
