# TechxServe — Med Spa Landing Page

A production-ready, high-converting landing page with **one job**: book a 15-minute
discovery call. Built as a **re-skinnable template** — the same skeleton ships for
the next niche as a config swap, not a rebuild.

> Native to the med spa world, not to TechxServe. Calm, clean, premium, lots of
> whitespace. The page *is* the portfolio piece.

## Two ways in

- **The qualify flow** (`id="qualify"`, at the bottom of the page) — every CTA on
  the page scrolls here. Three quick taps, one business-info step, then a
  scheduling choice: pick a time via an embedded **Cal.com** calendar, or ask us
  to propose one. Ends on a "what to expect on the call" screen.
- **`/quiz`** — an even faster, one-question-at-a-time path linked from the Hero's
  low-key secondary CTA, for visitors who don't want to scroll. Ends with a
  personal name + email capture instead of a full booking.

Both are separate step-machines (`components/sections/QualifyFlow.tsx` and
`components/quiz/QuizFlow.tsx`) sharing option data, validation primitives, and a
few small UI pieces (`QuizOptionCard`, `StepProgressBar`), but are otherwise
independent — they post to their own Edge routes (`/api/qualify-lead`,
`/api/quiz-lead`).

## Stack

- **Next.js 14 (App Router) + TypeScript** (strict, no `any` outside typed
  third-party-global shims)
- **Tailwind CSS** with a CSS-variable token layer (the re-skin seam) — also
  powers a visitor-facing **live theme switcher** (`PlatformThemeShowcase`) that
  swaps those variables client-side to prove the seam
- **Framer Motion** — scroll reveals + step transitions, respects
  `prefers-reduced-motion`
- **React Hook Form + Zod** — typed, inline-validated steps (client **and**
  server; the same schema validates both)
- **Cal.com inline embed** — lazy-loaded only once a visitor reaches the
  scheduling step; graceful placeholder when no booking link is configured yet
- Custom **before/after slider**, an auto-scrolling **glassmorphic carousel**, an
  animated **feature-pointer mockup**, and a looping **animated demo** standing in
  for the real product video
- **Lucide React** — thin-stroke icons, recolored to sage/gold
- **next/font** — self-hosted Playfair Display + Inter (no third font, no CLS)
- Deploy target: **Vercel** (static + Edge API routes)

## Getting started

```bash
pnpm install
cp .env.example .env.local   # optional — app runs fine with everything unset
pnpm dev                     # http://localhost:3000
```

Other scripts: `pnpm build`, `pnpm start`, `pnpm lint`, `pnpm typecheck`, `pnpm format`.

## Environment variables

All optional for local dev — the app degrades gracefully (leads log to the server
console and return success; analytics no-op).

| Var | Purpose |
|---|---|
| `LEAD_WEBHOOK_URL` | CRM / Zapier / Make webhook both `/api/qualify-lead` and `/api/quiz-lead` POST to. Unset → logged in dev. |
| `NEXT_PUBLIC_GA_ID` | GA4 Measurement ID (`G-…`). Tag skipped if unset. |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel ID. Pixel + `Lead` event skipped if unset. |
| `NEXT_PUBLIC_SITE_URL` | Absolute URL for canonical + Open Graph tags. |

Cal.com's booking link is **not** an env var — it's `config/content.ts →
qualify.scheduling.calcomLink` (a `// CLIENT:` placeholder), consistent with every
other not-yet-supplied value in this file.

## Architecture — where things live

```
config/theme.ts       ← the niche SKIN: palette, radii, shadows (CSS-variable values)
                         + themeVariants (the live theme-switcher's palette options)
config/content.ts     ← ALL copy + qualifier options + the full platform catalog
app/layout.tsx        ← fonts, metadata/OG, theme injection, analytics tags
app/page.tsx          ← composes the 10 homepage sections in order
app/quiz/page.tsx      ← the standalone fast-path route
app/api/qualify-lead/  ← Edge handler for the qualify flow (re-validates, spam guards, webhook)
app/api/quiz-lead/      ← Edge handler for /quiz (same shape, lighter schema)
components/ui/         ← Button, FeatureTile, PhoneMockup/DesktopMockup, BeforeAfterSlider,
                          CalComEmbed, StepProgressBar, InlineTextCta, FeaturePointerMockup, …
components/form/       ← FormField (TextField) — the one shared form primitive
components/quiz/       ← QuizFlow, QuizOptionCard (also used by QualifyFlow)
components/layout/     ← StickyNav, StickyMobileCTA, ScrollReveal
components/sections/   ← the 10 homepage sections
lib/validation.ts      ← shared Zod primitives + qualifier enums
lib/qualifyValidation.ts, lib/quizValidation.ts ← the two flows' own schemas
lib/theme-runtime.ts   ← applies/resets CSS-variable overrides for the theme switcher
```

**Hard rule:** no hardcoded copy or hex codes inside components. Components read
tokens via Tailwind classes (which map to CSS variables) and text via
`config/content.ts`. That is what makes the re-skin a config swap.

### Compliance + conversion notes

- Neither flow collects a phone number, so there's no TCPA/SMS consent
  requirement — any phone/SMS collection now lives inside Cal.com's own booking
  form (governed by Cal.com's terms, linked from `/privacy` and `/terms`).
- The word **"Submit" never appears** — CTAs come from the approved list in config.
- Spam: hidden **honeypot** field + **min-fill-time** check + IP **rate limit** on
  both API routes.
- Analytics events: `cta_click` (with section source), `video_play`, `form_start`,
  `quiz_start`/`quiz_complete`, `qualify_start`/`qualify_submit` (→ Meta `Lead`).

### Client-pending values (isolated + commented)

Search the codebase for these markers — each is a one-line config edit:

- `// CLIENT: confirm figures` — the math/ROI stats (`config/content.ts → math`)
- `// CLIENT: confirm qualifier bands` — patients/month ranges
- `// CLIENT: add your Cal.com booking link` — `config/content.ts → qualify.scheduling.calcomLink`
- `// CLIENT: replace asset` — placeholder images (see `ASSETS.md`)

## Re-skinning for the next niche (roofing, dental, …)

The section order, the two-flow conversion system, the component library, CTA
logic, sticky mobile bar, and footer all **stay fixed**. Only two files change:

1. **Copy `config/theme.ts` → `config/theme.<niche>.ts`** and swap the palette,
   radii, and shadow values. Point `app/globals.css`'s injection (`themeToCss`) at
   the new theme. This re-skins the whole page — colors flow through CSS
   variables to every component. (`themeVariants` is a separate, optional
   visitor-facing demo array — not part of the re-skin contract itself.)
2. **Copy `config/content.ts`** and swap every string: eyebrow, headline, subhead,
   problem points, feature tiles, platform catalog, math/ROI framing, qualify-flow
   copy + qualifier options, quiz copy, CTA strings, footer lines.
3. **Replace assets** per `ASSETS.md` (hero mockup, before/after, video poster, OG).

That's it — no component code changes. The one rule that carries across every
niche: **the page must always look native to the client's world, never to
TechxServe's.** The brand appears only in the nav and footer.

> Sanity-test the seam: temporarily change a few values in `config/theme.ts`
> (e.g. make `--color-sage-deep` a blue) and watch the entire page re-skin, then
> revert. Or just click through the live theme switcher on the page itself.

## Accessibility & performance

- Semantic landmarks, single `<h1>`, labelled inputs, `aria-describedby` errors,
  `aria-live` status, focus-visible rings, keyboard-operable before/after slider
  and carousel.
- WCAG AA contrast: body text is always charcoal-on-cream; sage is used for
  headings/large text only.
- `prefers-reduced-motion` disables all transforms/animations, including step
  transitions in both flows and the carousel's auto-scroll (falls back to a
  static scrollable row).
- Self-hosted fonts (`display: swap`), `priority` only on the hero image, lazy
  everything below the fold, analytics `afterInteractive`, Cal.com's script
  lazy-loaded only once the scheduling step is actually reached.

---

TechxServe — *Tomorrow's Reality, Today.*

> Auto-deploys: pushes to `main` deploy to production via Vercel’s Git integration.
