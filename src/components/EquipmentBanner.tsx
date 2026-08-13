"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";

export function EquipmentBanner() {
  return (
    <section className="relative bg-[var(--color-light)] pb-28 sm:pb-36">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal>
          {/* aspect-[3/2] matches the source photo's native 1536x1024
              ratio exactly — object-cover then has nothing to crop, so
              the full equipment lineup stays visible at any viewport
              width instead of losing the ends off a wider letterbox. */}
          <div className="relative aspect-[3/2] overflow-hidden rounded-[2rem] sm:aspect-[16/10]">
            <Image
              src="/images/equipment-lineup.jpg"
              alt="A full residential HVAC and water system lineup — furnace, air conditioner, tankless water heater, water softener, reverse osmosis filtration, and smart thermostat, professionally installed"
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
                <p className="text-balance text-xl font-light leading-snug text-white sm:text-3xl">
                  Home comfort, done right
                </p>
                <p className="mt-4 text-balance text-[15px] leading-relaxed text-white/70 sm:text-base">
                  Heating, cooling and water systems professionally
                  assessed, serviced and installed for lasting comfort
                  and reliability.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
