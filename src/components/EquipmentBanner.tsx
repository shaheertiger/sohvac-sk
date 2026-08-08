"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";

export function EquipmentBanner() {
  return (
    <section className="relative bg-[var(--color-light)] pb-28 sm:pb-36">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          <div className="relative aspect-[21/9] overflow-hidden rounded-[2rem] sm:aspect-[3/1]">
            <Image
              src="/images/equipment-v2.jpg"
              alt="Premium high-efficiency HVAC equipment, professionally installed"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(90deg, rgba(11,31,58,0.92) 0%, rgba(11,31,58,0.6) 38%, rgba(11,31,58,0.15) 62%, rgba(11,31,58,0.02) 78%)",
              }}
            />
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-[15rem] px-8 sm:max-w-sm sm:px-14">
                <span className="text-[12px] font-semibold uppercase leading-snug tracking-[0.1em] text-[var(--color-blue-soft)] sm:text-[13px] sm:tracking-[0.14em]">
                  Equipment, evaluated honestly
                </span>
                <p className="mt-4 text-balance text-lg font-light leading-snug text-white sm:text-2xl">
                  Whether it&apos;s staying or being replaced, we&apos;ll
                  tell you the truth about what&apos;s in your home.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
