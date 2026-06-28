/**
 * ─────────────────────────────────────────────────────────────────────────────
 * ALL PAGE COPY + STRUCTURED CONTENT  (med spa niche)
 * ─────────────────────────────────────────────────────────────────────────────
 * Every word the visitor reads lives here — laid in verbatim from the brief.
 * Components contain NO hardcoded copy. To re-skin for the next niche, copy this
 * file, swap the strings, and you're done (see brief §11, §13).
 *
 * `icon` fields are string keys resolved by components/ui/icon-registry.ts — this
 * keeps the content config pure data with no React/lucide imports.
 *
 * CLIENT-pending values (real stats, qualifier bands, soft budget filter, assets)
 * are isolated and marked with `// CLIENT:` / `// Shayan to confirm` comments.
 */

import type { IconKey } from '@/components/ui/icon-registry';

/* ── Approved CTA language (brief §11). Never the word "Submit". ───────────── */
export const ctas = {
  hero: 'See What We’d Build For Your Clinic',
  nav: 'See What We’d Build',
  video: 'See What We’d Build For Your Clinic',
  whatWeBuild: 'Get My Free Website Preview',
  math: 'Book My 15-Minute Call',
  socialProof: 'See What We’d Build For Your Clinic',
  stickyMobile: 'See What We’d Build',
  formSubmit: 'Show Me My New Website', // the form's own button — never "Submit"
  footer: 'Book My 15-Minute Call',
} as const;

/** Single conversion target — every CTA scrolls here. */
export const FORM_ANCHOR = 'qualify';

/* ── Site / SEO metadata (brief §10). ─────────────────────────────────────── */
export const meta = {
  title: 'Beautiful Med Spa Websites That Book More Treatments | TechxServe',
  description:
    'We design and build modern, fast, mobile-first websites made specifically for med spas, so more of the people finding you online actually book. Live in about 3 days.',
  ogImageAlt: 'A beautiful med spa website on a phone, built by TechxServe',
  // One-line toggle for paid-only traffic that wants the page kept out of search.
  indexable: true, // set false to emit <meta name="robots" content="noindex">
};

/* ── Nav (brief §5 brand integration). ────────────────────────────────────── */
export const nav = {
  brand: 'TechxServe',
  brandTagline: 'Tomorrow’s Reality, Today.',
};

/* ── Section 1 — Hero. ────────────────────────────────────────────────────── */
export const hero = {
  eyebrow: 'FOR US MED SPAS & AESTHETIC CLINICS',
  headline:
    'A Beautiful New Website That Turns Visitors Into Booked Treatments in About 3 Days',
  subhead:
    'We design and build modern, fast, mobile-first websites made specifically for med spas, so more of the people finding you online actually book.',
  cta: ctas.hero,
  trustLine: 'A US-registered software company. Built by TechxServe.',
  // CLIENT: replace asset — hero phone mockup of a finished med spa site.
  mockup: {
    src: '/images/hero-site-mockup.svg',
    alt: 'Preview of a modern med spa website on a phone, designed by TechxServe',
  },
};

/* ── Section 2 — Video. ───────────────────────────────────────────────────── */
export const video = {
  eyebrow: 'A 60-SECOND LOOK',
  heading: 'Watch a Med Spa Site Come to Life',
  blurb:
    'A quick visual demo: real before/after med spa sites animating on a phone. See the transformation, then book your 15-minute call.',
  // CLIENT: replace asset — real 45–90s visual demo + poster supplied later.
  poster: '/images/video-poster.svg',
  // Wired to a single config constant; drop the real file in /public/video/ and point here.
  src: '', // e.g. '/video/medspa-demo.mp4' — empty until supplied; UI shows poster + play affordance
  captionsSrc: '', // e.g. '/video/medspa-demo.en.vtt'
  cta: ctas.video,
};

/* ── Section 3 — "Sound familiar?" problem block. ─────────────────────────── */
export const problem = {
  headline: 'Sound familiar?',
  points: [
    {
      icon: 'clock' as IconKey,
      text: 'Your site looks dated next to the clinic down the street',
    },
    {
      icon: 'smartphone' as IconKey,
      text: 'It’s slow or clumsy on a phone, where most of your bookings happen',
    },
    {
      icon: 'calendar' as IconKey,
      text: 'There’s no easy way to book online, so people call… or don’t',
    },
    {
      icon: 'images' as IconKey,
      text: 'Your before/afters and reviews are buried instead of selling for you',
    },
    {
      icon: 'sparkles' as IconKey,
      text: 'You’re proud of your work, but the website doesn’t reflect your brand',
    },
    {
      icon: 'search' as IconKey,
      text: 'New patients can’t find you, and the ones who do don’t convert',
    },
  ],
};

/* ── Section 4 — What we build (feature tiles + platform showcase). ───────── */
export const whatWeBuild = {
  eyebrow: 'YOUR NEW WEBSITE, DONE FOR YOU',
  headline: 'Your New Website, Done For You, in About 3 Days',
  features: [
    {
      icon: 'palette' as IconKey,
      label: 'Custom, on-brand design',
      desc: 'Matched to your clinic’s aesthetic',
    },
    {
      icon: 'smartphone' as IconKey,
      label: 'Fast, mobile-first',
      desc: 'Flawless on a phone',
    },
    {
      icon: 'calendar' as IconKey,
      label: 'Online booking front and center',
      desc: 'The button patients actually find',
    },
    {
      icon: 'images' as IconKey,
      label: 'Before/after galleries & reviews',
      desc: 'Proof that sells for you',
    },
    {
      icon: 'fileText' as IconKey,
      label: 'Treatment & service pages',
      desc: 'Built to convert browsers into bookings',
    },
    {
      icon: 'phoneCall' as IconKey,
      label: 'Click-to-call, maps & contact',
      desc: 'Instant ways to reach you',
    },
  ],
  platform: {
    eyebrow: 'EVERYTHING UNDER ONE ROOF',
    heading: 'Your website is just the start',
    blurb:
      'Behind it sits one connected platform that runs your whole clinic. Add any part whenever you’re ready.',
    upsellSeed:
      'One platform. One login. Everything connected: booking, client records, reminders, marketing, and AI. Start with your new site; grow into the rest.',
  },
  cta: ctas.whatWeBuild,
};

/* ── Section 5 — The math. ────────────────────────────────────────────────── */
export const math = {
  eyebrow: 'THE MATH IS SIMPLE',
  headline: 'The Math Is Simple',
  intro:
    'A single new patient is worth hundreds up front, and often thousands over time with repeat visits.',
  // CLIENT: confirm figures — keep ranges defensible, no "double your revenue" claims.
  stats: [
    { value: 'Hundreds', suffix: '', caption: 'Value of one new patient up front' },
    { value: 'Thousands', suffix: '', caption: 'Lifetime value with repeat visits' },
    { value: '2-4', suffix: '/mo', caption: 'New patients a slow site can quietly cost you' },
    { value: '~3', suffix: ' days', caption: 'From kickoff to a site built to convert' },
  ],
  closing:
    'If a slow site or buried booking button costs you even 2-4 new patients a month, that’s real revenue walking out the door every single month. A website built to convert pays for itself with a handful of extra bookings.',
  cta: ctas.math,
};

/* ── Section 6 — Social proof. ────────────────────────────────────────────── */
export const socialProof = {
  eyebrow: 'BUILT FOR MED SPAS ONLY',
  headline: 'Built exclusively for med spas',
  // Pre-testimonial: credibility + scarcity (brief §6).
  credibility:
    'We build websites exclusively for med spas. We’re currently taking on a small number of US clinics. If accepted, you’ll have a site that puts you ahead of the clinic down the street.',
  beforeAfterHeading: 'Before & after, on the device that matters most',
  beforeAfterNote: 'Drag to compare: the same clinic, rebuilt to book treatments.',
  // CLIENT: replace asset — real before/after screenshots of an actual rebuild.
  beforeAfter: {
    before: { src: '/images/before-site.svg', alt: 'A dated med spa website, before the rebuild' },
    after: { src: '/images/after-site.svg', alt: 'The same med spa website, rebuilt by TechxServe' },
  },
  // CLIENT: real testimonials arrive post-launch. Cards render from this array;
  // until then we show the credibility + scarcity copy above and these samples are
  // clearly marked as illustrative via `pending: true`.
  testimonials: [
    {
      quote: 'We started getting online bookings the first week the new site went live.',
      name: 'Owner',
      city: 'Scottsdale, AZ',
      rating: 5,
      pending: true, // CLIENT: replace with a real, consented testimonial
    },
    {
      quote: 'Went from 4 online bookings a month to 19. The booking button is finally where people look.',
      name: 'Owner',
      city: 'Austin, TX',
      rating: 5,
      pending: true, // CLIENT: replace with a real, consented testimonial
    },
    {
      quote: 'It finally looks like the brand we’ve worked so hard to build in the room.',
      name: 'Medical Director',
      city: 'Miami, FL',
      rating: 5,
      pending: true, // CLIENT: replace with a real, consented testimonial
    },
  ],
  cta: ctas.socialProof,
};

/* ── Section 7 — Qualification form. ──────────────────────────────────────── */
export const form = {
  eyebrow: 'FREE, NO OBLIGATION',
  headline: 'See What We’d Build For Your Clinic. Free, No Obligation',
  subline:
    'Tell us a little about your clinic and we’ll show you exactly what your new site could look like. Limited spots each month.',
  fields: {
    fullName: { label: 'Full name', placeholder: 'Jordan Avery' },
    clinicName: { label: 'Clinic / business name', placeholder: 'Glow Aesthetic Studio' },
    website: { label: 'Clinic website', placeholder: 'glowaesthetic.com', optional: true },
    phone: { label: 'Phone number', placeholder: '(555) 123-4567' },
    cityState: { label: 'City / State', placeholder: 'Austin, TX' },
    role: {
      label: 'Which best describes you?',
      placeholder: 'Select one',
      // QUALIFIER: owner / decision-maker must be on the call.
      options: ['Owner', 'Manager', 'Other'],
    },
    patientsPerMonth: {
      label: 'Roughly how many new patients a month?',
      placeholder: 'Select a range',
      // QUALIFIER: filters clinics too small to benefit yet.
      options: ['Under 20', '20-50', '50-100', '100+'], // CLIENT: confirm qualifier bands
    },
    frustration: {
      label: 'What’s your biggest frustration with your current site?',
      helper: 'Choose all that apply.',
      // Multi-select — mirrors the Site Issue Note; uses their words to open the call.
      options: [
        'It looks dated',
        'It’s slow or clumsy on mobile',
        'No easy online booking',
        'Before/afters & reviews are buried',
        'It doesn’t reflect our brand',
        'New patients can’t find us',
      ],
    },
    timeline: {
      label: 'When would you want a new site live?',
      placeholder: 'Select a timeline',
      // Gauges urgency / readiness.
      options: ['As soon as possible', 'Within a month', '1-3 months', 'Just exploring'],
    },
  },
  // ⚠ Required SMS consent (US / TCPA). Exact mandated text — do not alter.
  consent: {
    text: 'I agree to receive call/text messages from TechxServe about my request. Msg & data rates may apply.',
    version: 'tcpa-2026-06', // recorded with every lead for compliance audit trail
  },
  submit: ctas.formSubmit,
  // Shayan to confirm — soft budget filter intentionally OFF the inline form to
  // protect submit rate. Extension point lives in the form component, disabled.
  success: {
    heading: 'You’re on the list.',
    body: 'We’ll review your clinic and reach out shortly to show you exactly what your new site could look like. Keep an eye on your phone. We may text to confirm a time.',
    // Slot for the later "thank-you" no-show-reducer video (brief §2).
    thankYouVideoSrc: '', // CLIENT: add 60–90s thank-you video later
  },
  error:
    'Something went wrong on our end. Please try again, or email us and we’ll take care of it.',
};

/* ── Section 8 — Reassurance strip. ───────────────────────────────────────── */
export const reassurance = {
  items: [
    'No long-term contracts',
    'Done for you, zero extra work on your end',
    'We build for med spas only, so we know your patients',
    'Your new site, ready in about 3 days',
  ],
};

/* ── Section 9 — Footer. ──────────────────────────────────────────────────── */
export const footer = {
  brand: nav.brand,
  tagline: nav.brandTagline,
  companyLine: 'A US-registered software company with a full design team.',
  // CLIENT: replace with real contact details.
  contact: {
    email: 'hello@techxserve.co',
    phone: '(555) 000-0000',
  },
  cta: ctas.footer,
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
  ],
  copyright: `© ${new Date().getFullYear()} TechxServe. All rights reserved.`,
};

/* ─────────────────────────────────────────────────────────────────────────────
 * THE FULL PLATFORM CATALOG  (brief §9)
 * Internal sales material that POWERS the high-level "Everything Under One Roof"
 * grid (page section 4). The page renders only group titles + icons + one-liners;
 * the full item list stays here for the sales team and is intentionally NOT dumped
 * on the page. See brief §6 note.
 * ───────────────────────────────────────────────────────────────────────────── */
export interface PlatformItem {
  name: string;
  desc: string;
}
export interface PlatformGroup {
  icon: IconKey;
  title: string;
  tagline: string;
  items: PlatformItem[];
}

export const platformCatalog: PlatformGroup[] = [
  {
    icon: 'globe',
    title: 'Website & Online Booking',
    tagline: 'The front door',
    items: [
      { name: 'Custom med spa website', desc: 'On-brand, fast, mobile-first, built to turn visitors into booked treatments, live in ~3 days' },
      { name: 'Online booking platform', desc: '24/7 self-service scheduling with real-time availability, deposits, and instant confirmations' },
      { name: 'Treatment & service pages', desc: 'Each treatment given its own page, designed to sell and drive bookings' },
      { name: 'Before / after galleries', desc: 'Showcase real results that turn browsers into patients' },
      { name: 'Packages, memberships & gift cards', desc: 'Sell online with recurring revenue built in' },
      { name: 'Multi-location ready', desc: 'One system across every clinic location' },
    ],
  },
  {
    icon: 'users',
    title: 'Client Management',
    tagline: 'Every client’s history in one click',
    items: [
      { name: 'Med spa CRM', desc: 'Full client history (treatments, notes, photos, preferences, visit history) in a single click' },
      { name: 'Digital intake & consent forms', desc: 'Paperless, e-signed, stored automatically against the client record' },
      { name: 'Treatment & photo records', desc: 'Before/after photos and chart notes tied to each client' },
      { name: 'Memberships & loyalty tracking', desc: 'Packages, points, and recurring members managed automatically' },
      { name: 'Payments & invoicing', desc: 'Take payment, track revenue, multi-currency ready' },
    ],
  },
  {
    icon: 'messageSquare',
    title: 'Communication & Reminders',
    tagline: 'The texting app',
    items: [
      { name: 'Two-way texting app', desc: 'Text clients and reply from one shared clinic inbox, on web and mobile' },
      { name: 'Automated appointment reminders', desc: 'SMS + email reminders that cut no-shows dramatically' },
      { name: 'Confirmations & rescheduling', desc: 'Clients confirm or rebook with a single tap' },
      { name: 'Aftercare & follow-up messages', desc: 'Automatic post-treatment check-ins that build loyalty' },
      { name: 'Internal clinic messaging', desc: 'Staff coordination inside the same app' },
    ],
  },
  {
    icon: 'repeat',
    title: 'Retention & Marketing',
    tagline: 'Keep them coming back',
    items: [
      { name: 'Patient reactivation', desc: 'Win back lapsed clients automatically for fast, high-margin revenue' },
      { name: 'Rebooking automations', desc: 'Treatment-cycle nudges (e.g. time-to-rebook reminders for injectables)' },
      { name: 'Email & SMS campaigns', desc: 'Promotions, new treatments, and seasonal offers, sent for them' },
      { name: 'Review automation', desc: 'Ask happy clients for reviews automatically for more 5-star ratings' },
      { name: 'Loyalty & referral programs', desc: 'Reward repeat clients and turn them into referrers' },
    ],
  },
  {
    icon: 'mapPin',
    title: 'Get Found',
    tagline: 'Local growth',
    items: [
      { name: 'Local SEO', desc: 'Rank for “med spa near me” in your city' },
      { name: 'Google Business Profile', desc: 'Optimized so you show up on the map and in search' },
      { name: 'Social media & content', desc: 'On-brand Instagram content that keeps the calendar full' },
      { name: 'Paid ads', desc: 'Meta & Google campaigns when you’re ready to scale' },
    ],
  },
  {
    icon: 'bot',
    title: 'AI & Automation',
    tagline: 'Work that runs itself',
    items: [
      { name: 'AI receptionist', desc: 'A 24/7 assistant that answers questions and books appointments after hours' },
      { name: 'AI lead follow-up', desc: 'Instantly responds to and nurtures new enquiries so none go cold' },
      { name: 'Smart workflows', desc: 'Intake → reminder → aftercare → review → rebook, fully automated' },
    ],
  },
  {
    icon: 'smartphone',
    title: 'Apps & Infrastructure',
    tagline: 'The foundation',
    items: [
      { name: 'Branded mobile app', desc: 'Your own client app for booking, history, loyalty, and push notifications' },
      { name: 'Staff & schedule management', desc: 'Roles, calendars, and clinic operations in one place' },
      { name: 'Hosting, security & support', desc: 'We host, maintain, secure, and support everything' },
    ],
  },
];
