"use client";

import Link from "next/link";
import { useState } from "react";
import BrandMark from "./BrandMark";
import PricingDialog from "./PricingDialog";

const NAV_LINKS = [
  { href: "/studio", label: "Studio" },
  { href: "/cennik", label: "Cennik" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-ink/55 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-6 py-4 tablet:px-10">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <BrandMark size="medium" pixels={144} className="h-12 w-12" />
          <span className="font-mono text-md font-bold uppercase tracking-[0.25em] text-paper">
            Labb
          </span>
        </Link>

        <nav className="hidden items-center gap-8 tablet:flex">
          {NAV_LINKS.map((link) =>
            link.label === "Cennik" ? (
              <button
                key={link.href}
                type="button"
                onClick={() => setPricingOpen(true)}
                className="cursor-pointer font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-paper"
              >
                {link.label}
              </button>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-paper"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-3 tablet:gap-5">
          <Link
            href="/jak-dotrzec"
            className="hidden items-center rounded-[7px] border border-line-strong px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-paper transition-colors hover:bg-white/5 tablet:inline-flex"
          >
            Jak do nas dotrzeć
          </Link>

          <button
            type="button"
            className="hidden cursor-pointer items-center font-mono text-xs uppercase tracking-[0.2em] tablet:inline-flex"
            aria-label="Przełącz język na angielski"
          >
            <span className="text-paper">PL</span>
            <span className="mx-1.5 text-line-strong">/</span>
            <span className="text-faint">EN</span>
          </button>

          <Link
            href="/wynajem"
            className="inline-flex items-center rounded-[7px] bg-signal px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-signal-ink transition-opacity hover:opacity-90"
          >
            Zarezerwuj
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label="Przełącz menu"
            className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-[7px] border border-line-strong text-paper tablet:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {menuOpen ? (
                <path d="M5 5l14 14M19 5L5 19" strokeLinecap="round" />
              ) : (
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  strokeLinecap="round"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-line bg-ink/95 px-6 py-6 backdrop-blur tablet:hidden">
          <nav className="flex flex-col gap-5">
            {NAV_LINKS.map((link) =>
              link.label === "Cennik" ? (
                <button
                  key={link.href}
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setPricingOpen(true);
                  }}
                  className="cursor-pointer text-left font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-paper"
                >
                  {link.label}
                </button>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-paper"
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              href="/jak-dotrzec"
              onClick={() => setMenuOpen(false)}
              className="font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-paper"
            >
              Jak do nas dotrzeć
            </Link>
            <div className="flex items-center gap-1.5 pt-2 font-mono text-xs uppercase tracking-[0.2em]">
              <span className="text-paper">PL</span>
              <span className="text-line-strong">/</span>
              <span className="text-faint">EN</span>
            </div>
          </nav>
        </div>
      )}

      <PricingDialog open={pricingOpen} onClose={() => setPricingOpen(false)} />
    </header>
  );
}
