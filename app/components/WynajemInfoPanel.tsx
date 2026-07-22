"use client";

import { useState } from "react";
import { WhatsAppIcon } from "./icons/SocialIcons";
import PricingDialog from "./PricingDialog";

const WHATSAPP_HREF = "https://wa.me/48535520745";

/**
 * The source PNG is black line-art on an opaque white background — plain
 * CSS filters (hue-rotate, sepia, etc.) can't recolor true black/white since
 * those are fixed points of every standard filter matrix. Instead: an SVG
 * mask inverts the image's luminance (so the line-art becomes the "visible"
 * region and the white background becomes "hidden"), then a plain bg-signal
 * div is masked by it — giving an accent-coloured mark with no background
 * at all, rather than a filter-tinted logo sitting in a colour tile.
 */
function AccentLogo({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg width="0" height="0" aria-hidden focusable="false">
        <defs>
          <filter id="wynajem-logo-invert" colorInterpolationFilters="sRGB">
            <feColorMatrix
              type="matrix"
              values="-1 0 0 0 1
                      0 -1 0 0 1
                      0 0 -1 0 1
                      0 0 0 1 0"
            />
          </filter>
          <mask
            id="wynajem-logo-mask"
            maskContentUnits="objectBoundingBox"
          >
            <image
              href="/images/LABB_WB_Alpha_Large_V2.png"
              width="1"
              height="1"
              preserveAspectRatio="xMidYMid meet"
              filter="url(#wynajem-logo-invert)"
            />
          </mask>
        </defs>
      </svg>
      <div
        className="h-full w-full bg-signal"
        style={{
          WebkitMaskImage: "url(#wynajem-logo-mask)",
          maskImage: "url(#wynajem-logo-mask)",
        }}
      />
    </div>
  );
}

export default function WynajemInfoPanel() {
  const [pricingOpen, setPricingOpen] = useState(false);

  return (
    <div className="flex flex-col gap-8 rounded-2xl border border-line bg-surface p-6 tablet:p-8">
      <div className="flex justify-center">
        <AccentLogo className="h-80 w-80 tablet:h-100 tablet:w-100" />
      </div>

      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
          Godziny otwarcia
        </p>
        <p className="mt-2 font-sans text-paper">
          Codziennie 8:00 – 22:00, po wcześniejszej rezerwacji
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setPricingOpen(true)}
          className="inline-flex items-center rounded-[7px] bg-signal px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-signal-ink transition-opacity hover:opacity-90"
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
