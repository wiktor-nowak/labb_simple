"use client";

import Link from "next/link";
import { useState } from "react";
import PricingDialog from "./PricingDialog";

export default function StudioActions() {
  const [pricingOpen, setPricingOpen] = useState(false);

  return (
    <>
      <div className="mt-16 flex flex-wrap gap-4">
        <Link
          href="/kontakt"
          className="inline-flex items-center rounded-[7px] bg-signal px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-signal-ink transition-opacity hover:opacity-90"
        >
          Zarezerwuj
        </Link>
        <button
          type="button"
          onClick={() => setPricingOpen(true)}
          className="inline-flex items-center rounded-[7px] bg-signal px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-signal-ink transition-opacity hover:opacity-90"
        >
          Cennik
        </button>
        <a
          href="https://filmbeast.pl/index.php/uslugi/#naszarsenal"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-[7px] border border-line-strong px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-paper transition-colors hover:bg-white/5"
        >
          Zobacz pełną listę sprzętu
        </a>
      </div>

      <PricingDialog open={pricingOpen} onClose={() => setPricingOpen(false)} />
    </>
  );
}
