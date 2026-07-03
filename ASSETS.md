# Assets — replace before launch

Every image below ships as an **on-brand SVG placeholder** so the layout is
pixel-correct today. Each is referenced from `config/content.ts` (search for
`// CLIENT: replace asset`). Swap the file in place (keep the path **or** update
the one line in config) — no component edits needed.

Visual language (brief §5): soft, bright, natural-light photography — calm
treatment rooms, glowing skin, hands, close-ups. Negative space, rounded corners,
soft shadows. **No** harsh red, neon, aggressive gradients, "handshake" stock, or
clip-art.

| Asset | Path | Aspect / size | Used in | Config key |
|---|---|---|---|---|
| Desktop — before | `public/images/desktop-before.svg` | 16:10 landscape (≈1200×750, export ≥2400×1500) | Social proof desktop slider | `socialProof.beforeAfter.desktop.before` |
| Desktop — after | `public/images/desktop-after.svg` | 16:10 landscape | Social proof desktop slider | `socialProof.beforeAfter.desktop.after` |
| Mobile — before | `public/images/before-site.svg` | 9:19 portrait (≈360×760, export ≥1080×2280) | Social proof phone slider | `socialProof.beforeAfter.mobile.before` |
| Mobile — after | `public/images/after-site.svg` | 9:19 portrait | Social proof phone slider | `socialProof.beforeAfter.mobile.after` |
| Hero site mockup | `public/images/hero-site-mockup.svg` | 9:19 portrait | (kept in config; not currently rendered) | `hero.mockup` |
| Video poster | `public/images/video-poster.svg` | 16:9 (1280×720, export 1920×1080) | Video frame | `video.poster` |
| Open Graph image | `public/images/og.svg` | 1200×630 | Social share preview | `app/layout.tsx` metadata |
| Favicon | `public/favicon.svg` | 32×32 (SVG scales) | Browser tab | `app/layout.tsx` icons |

## Video (real file supplied later)

- Drop the 45–90s **visual demo** at `public/video/medspa-demo.mp4` and set
  `video.src` in `config/content.ts`. Add captions at
  `public/video/medspa-demo.en.vtt` and set `video.captionsSrc`.
- The frame already shows the poster + an elegant play button until `video.src`
  is set — launch is never blocked on the video (brief §2).
- **Thank-you / no-show-reducer video** (later): set `form.success.thankYouVideoSrc`.

## Coming with real clients

- **Before/after screenshots** of an actual rebuild (strongest proof for this niche)
  → replace all four files in `socialProof.beforeAfter` (desktop + mobile pairs).
- **Treatment-room / brand photography** for future section backgrounds, if art
  direction calls for it.

## Export notes

- Prefer **AVIF/WebP** for photos; Next.js `<Image>` serves modern formats
  automatically. Provide images at ~2× their display size for retina.
- Keep the hero image optimized — it's the LCP element (loaded with `priority`).
- Always preserve intrinsic width/height so there is zero layout shift (brief §8, §10).
