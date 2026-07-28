"use client";

import { useState } from "react";
import { WhatsAppIcon } from "./icons/SocialIcons";
import PricingDialog from "./PricingDialog";
import { WHATSAPP_HREF } from "../lib/contact";
import Image from "next/image";

/**
 * The logo asset here is already colour, rendered straight via next/image —
 * no SVG mask/filter trick needed (that approach was for recolouring a
 * black-line-art PNG and is no longer necessary now that a pre-coloured
 * export exists).
 */
export default function WynajemInfoPanel() {
  const [pricingOpen, setPricingOpen] = useState(false);

  return (
    <div className="flex flex-col gap-8 rounded-2xl border border-line bg-surface p-6 tablet:p-8">
      <div className="flex justify-center">
        <Image
          src={"/images/LABB_Alpha_color_Medium.png"}
          alt="LABB Studio"
          width={256}
          height={256}
          className={'object-contain top-0 h-80 w-80'}
        />
      </div>

      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
          Godziny otwarcia
        </p>
        <p className="mt-2 font-sans text-paper">
          Codziennie 6:00 – 24:00, po wcześniejszej rezerwacji
        </p>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-faint">
          Godziny kontaktu
        </p>
        <p className="mt-2 font-sans text-paper">
          W tygodniu 10:00 – 18:00, w weekendy do 24h
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setPricingOpen(true)}
          className="inline-flex cursor-pointer items-center rounded-[7px] bg-signal px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-signal-ink transition-opacity hover:opacity-90"
        >
          Cennik
        </button>

        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="flex h-15 w-15 items-center justify-center rounded-full border border-line-strong text-muted transition-colors hover:border-[#25D366] hover:bg-[#25D366]/10 hover:text-[#25D366]"
        >
          <WhatsAppIcon className="h-7.5 w-7.5" />
        </a>
      </div>

      <PricingDialog open={pricingOpen} onClose={() => setPricingOpen(false)} />
    </div>
  );
}
