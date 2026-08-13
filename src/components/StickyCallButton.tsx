"use client";

import { Phone } from "lucide-react";
import { contact } from "@/lib/site";

export function StickyCallButton() {
  if (!contact.phone) return null;

  return (
    <a
      href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}
      className="fixed inset-x-4 bottom-4 z-40 flex items-center justify-center gap-2 rounded-full bg-[var(--color-blue)] px-6 py-4 text-[15px] font-semibold text-white shadow-[0_12px_32px_rgba(30,115,255,0.45)] transition-all duration-300 hover:bg-[var(--color-navy)] hover:shadow-[0_16px_40px_rgba(30,115,255,0.55)] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:px-7"
    >
      <Phone size={18} />
      Talk To Alex
    </a>
  );
}
