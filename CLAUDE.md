# LABB Studio — labb_simple

Website for **LABB Studio**, a photo-and-film studio for rent in the centre
of Bielsko-Biała, Poland. Visitors view the space, check pricing/equipment,
and get in touch to book it. All on-screen copy is **Polish** (`lang="pl"`);
a PL/EN switcher exists in the header now, but only PL is implemented.

This repo (`labb_simple`) is the **simple/initial version** of the site —
build only what's asked for a given page, don't reach for the full future
stack (next-intl, React Hook Form + Zod, shadcn/ui, Resend, a rule-based
chatbot) unless the user explicitly asks for it here. Those are noted in the
source brief as later-stage plans, not requirements for this repo.

The full design brief (foundation + all page prompts, B1–B7) lives outside
this repo at `C:\Users\nowak\Downloads\LABB-Studio-Claude-Design-Brief.md`.
Pages are built **one at a time** as the user pastes each prompt — don't
pre-build pages that haven't been requested yet, and don't assume a page
prompt is final until the user has iterated on it in chat.

## Stack

- Next.js (App Router) + TypeScript, Tailwind CSS v4 (CSS-first config, no
  `tailwind.config.js` — theme lives in `app/globals.css` via `@theme`).
- Real brand fonts are already licensed and wired in, **not** the brief's
  open-source stand-ins (Space Grotesk / Space Mono) — see `app/fonts.ts`:
  - `magion` → `next/font/local`, weight 400 only (regular + italic; no
    bold face exists, don't request `font-weight: 700` on it).
  - `sinter` → `next/font/local`, full weight range 100–950 incl. italics
    (missing: non-italic 600/Demi, italic 700/Bold — those two slots just
    don't have source files).
- Tailwind theme mapping (`app/globals.css`): `--font-sans` = Magion
  (display/headings/body per the brief), `--font-mono` = Sinter (technical
  labels/nav/eyebrows/buttons, even though it isn't a literal monospace).
- Exactly three breakpoints app-wide, defined in `app/globals.css`. Tailwind's
  defaults are reset (`--breakpoint-*: initial`) and replaced with just two,
  so `sm:`/`md:`/`lg:`/`xl:`/`2xl:` **don't exist** — using them is a no-op:
  - mobile — unprefixed base classes, `<720px`.
  - `tablet:` ("laptop_tablet") — `≥720px` (720–1199px in practice, but
    cascades upward like all Tailwind breakpoints unless overridden).
  - `desktop:` — `≥1200px`. Used sparingly, only where laptop_tablet width
    genuinely isn't enough (e.g. a fixed-width sidebar next to a 16:9 image
    on the `/studio` page).
- Shared UI lives in `app/components/` (`Header.tsx`, `BrandMark.tsx`, …).

## Design system (from the brief's Section A — Foundation)

**Art direction:** dark, editorial, gallery-like. Generous black space, a
few very large headlines, full-bleed imagery, almost no clutter. Green is
the *only* accent colour and appears **only on actionable things** (book,
links, form focus, active states) — never as decoration. No gradients, no
drop shadows, no glow. Small labels are mono, letter-spaced, uppercase —
like a spec sheet. The brand motif is an isometric "impossible cube"
monogram plus a halftone dot texture: loud once per page (hero), then quiet
everywhere else (thin dotted dividers, small monogram, low-contrast tile
texture — see `.halftone-bold` / `.halftone-quiet` utilities in
`globals.css`).

**Colour tokens** (CSS vars + Tailwind utilities, e.g. `bg-ink`,
`text-paper`, `border-line-strong`):

| Token | Hex | Role |
|---|---|---|
| `ink` | `#0B0B0B` | Page background |
| `surface` | `#121212` | Raised cards / panels |
| `line` | `#242424` | Hairline borders |
| `line-strong` | `#2E2E2E` | Emphasised borders / dividers |
| `paper` | `#F5F4EF` | Primary text, light marks |
| `muted` | `#9A9A94` | Secondary text |
| `faint` | `#5A5A56` | Captions, hints, meta |
| `signal` | `#5CFFAB` | Accent — actions only |
| `signal-ink` | `#05271A` | Text on green fills |

No light mode — everything is dark-mode-native.

**Typography scale:**
- H1: ~48–64px, tight letter-spacing (−1px), max ~15 characters/line.
- H2: ~30–36px. H3: ~20–22px.
- Body: 16px, line-height 1.7, colour `muted`/`paper`.
- Eyebrow/technical label: 11–12px mono, uppercase, letter-spacing 3–5px,
  colour `faint` (or `signal` when it labels an action).
- Casing: headings/body in normal Polish sentence case. ALL-CAPS is
  reserved for mono technical labels and lockups (`ZAREZERWUJ`, etc.).

**Shape & spacing:**
- Radius: 7px on controls, 12–14px on cards/image tiles. Full borders only
  — no single-sided rounded accents.
- Borders: 1px hairline `line`; `line-strong` for emphasis.
- Generous vertical rhythm: large section padding (96–128px desktop), wide
  side margins.

**Shared components (per the brief):**
- **Header** — sticky/transparent, cube monogram + `LABB` wordmark left,
  mono nav links, PL/EN switcher, primary green `ZAREZERWUJ` button. Mobile
  collapses nav into a hamburger; the green button always stays visible.
- **Primary button** — green fill, `signal-ink` text, mono bold,
  letter-spaced, 7px radius.
- **Ghost button** — transparent, 1px `line-strong` border, `paper` text.
- **Form field** — fill `#0F0F0F`, 1px `line` border; `signal` border +
  soft green focus ring on focus. Mono uppercase label above.
- **Card/feature block** — `surface` fill or transparent + 1px `line`,
  12px radius, roomy padding.
- **Gallery tile** — aspect-ratio box, halftone-textured placeholder
  (no real photos yet), subtle hover (slight lift or border brighten).
- **Footer** — monogram, nav repeat, contact line, links to Regulamin and
  Polityka prywatności, address/NIP placeholder. **Not used on the
  homepage** — homepage is a single full-height view with no scroll.

Placeholder content marked `‹TO FILL›` in the brief (equipment lists, exact
dimensions, phone number, legal text) is real content the studio still
needs to supply — use sensible placeholder values so mockups look real, but
flag anything load-bearing before it'd ship.
