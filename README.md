# TechxServe — Med Spa Landing Page

A production-ready, high-converting landing page with **one job**: book a 15-minute
discovery call via the qualification form. Built as a **re-skinnable template** —
the same skeleton ships for the next niche as a config swap, not a rebuild.

> Native to the med spa world, not to TechxServe. Calm, clean, premium, lots of
> whitespace. The page *is* the portfolio piece.

## Stack

- **Next.js 14 (App Router) + TypeScript** (strict, no `any`)
- **Tailwind CSS** with a CSS-variable token layer (the re-skin seam)
- **Framer Motion** — scroll reveals, respects `prefers-reduced-motion`
- **React Hook Form + Zod** — typed, inline-validated form (client **and** server)
- **Embla Carousel** — testimonials · custom **before/after slider**
- **Lucide React** — thin-stroke icons, recolored to sage/gold
- **next/font** — self-hosted Playfair Display + Inter (no third font, no CLS)
- Deploy target: **Vercel** (static + Edge API route)

## Getting started

```bash
pnpm install
cp .env.example .env.local   # optional — app runs fine with everything unset
pnpm dev                     # http://localhost:3000
```

Other scripts: `pnpm build`, `pnpm start`, `pnpm lint`, `pnpm typecheck`, `pnpm format`.

## Environment variables

All optional for local dev — the app degrades gracefully (the form logs the lead
to the server console and returns success; analytics no-op).

| Var | Purpose |
|---|---|
| `LEAD_WEBHOOK_URL` | CRM / Zapier / Make webhook the lead JSON is POSTed to. Unset → logged in dev. |
| `NEXT_PUBLIC_GA_ID` | GA4 Measurement ID (`G-…`). Tag skipped if unset. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID. Pixel + `Lead` event skipped if unset. |
| `NEXT_PUBLIC_SITE_URL` | Absolute URL for canonical + Open Graph tags. |

## Architecture — where things live

```
config/theme.ts     ← the niche SKIN: palette, radii, shadows (CSS-variable values)
config/content.ts   ← ALL copy + form options + the full platform catalog
app/layout.tsx      ← fonts, metadata/OG, theme injection, analytics tags
app/page.tsx        ← composes the 9 sections in order
app/api/lead/route.ts ← Edge form handler (re-validates, spam guards, webhook)
components/ui/       ← Button, FeatureTile, StatBlock, PhoneMockup, BeforeAfterSlider, …
components/form/     ← FormField primitives, ConsentCheckbox, useLeadForm
components/layout/   ← StickyNav, StickyMobileCTA, ScrollReveal
components/sections/ ← the 9 sections
```

**Hard rule:** no hardcoded copy or hex codes inside components. Components read
tokens via Tailwind classes (which map to CSS variables) and text via
`config/content.ts`. That is what makes the re-skin a config swap.

### Compliance + conversion notes

- **TCPA SMS consent** is a required, unchecked-by-default checkbox enforced by the
  Zod schema (`z.literal(true)`) — the form cannot submit until it's checked. Exact
  mandated text lives in `config/content.ts → form.consent` and is recorded with
  every lead (text + version + timestamp) for the audit trail.
- The word **"Submit" never appears** — CTAs come from the approved list in config.
- **No inline budget question** (protects submit rate; the closer qualifies budget
  on the call). A disabled extension point is noted in config (`// Shayan to confirm`).
- Spam: hidden **honeypot** field + **min-fill-time** check + IP **rate limit**.
- Analytics events: `cta_click` (with section source), `video_play`, `form_start`,
  `lead_submit` (→ Meta `Lead`).

### Client-pending values (isolated + commented)

Search the codebase for these markers — each is a one-line config edit:

- `// CLIENT: confirm figures` — the math/ROI stats (`config/content.ts → math`)
- `// CLIENT: confirm qualifier bands` — patients/month ranges
- `// CLIENT: replace asset` — placeholder images (see `ASSETS.md`)
- `// Shayan to confirm` — optional soft budget filter (intentionally off)

## Re-skinning for the next niche (roofing, dental, …)

The nine-section order, the form + SMS consent, the component library, CTA logic,
sticky mobile bar, and footer all **stay fixed**. Only two files change:

1. **Copy `config/theme.ts` → `config/theme.<niche>.ts`** and swap the palette,
   radii, and shadow values. Point `app/globals.css`'s injection (`themeToCss`) at
   the new theme (or just edit the values in `theme.ts`). This re-skins the whole
   page — colors flow through CSS variables to every component.
2. **Copy `config/content.ts`** and swap every string: eyebrow, headline, subhead,
   problem points, feature tiles, platform catalog, math/ROI framing, social-proof
   copy, form qualifier options, CTA strings, footer lines.
3. **Replace assets** per `ASSETS.md` (hero mockup, before/after, video poster, OG).

That's it — no component code changes. The one rule that carries across every
niche: **the page must always look native to the client's world, never to
TechxServe's.** The brand appears only in the nav and footer.

> Sanity-test the seam: temporarily change a few values in `config/theme.ts`
> (e.g. make `--color-sage-deep` a blue) and watch the entire page re-skin, then
> revert.

## Accessibility & performance

- Semantic landmarks, single `<h1>`, labelled inputs, `aria-describedby` errors,
  `aria-live` status, focus-visible rings, keyboard-operable slider + carousel.
- WCAG AA contrast: body text is always charcoal-on-cream; sage is used for
  headings/large text only.
- `prefers-reduced-motion` disables all transforms/animations.
- Self-hosted fonts (`display: swap`), `priority` only on the hero image, lazy
  everything below the fold, analytics `afterInteractive`.

---

TechxServe — *Tomorrow's Reality, Today.*
