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
  math: 'Book My 15-Minute Call',
  formSubmit: 'Show Me My New Website', // the form's own button — never "Submit"
  footer: 'Book My 15-Minute Call',
} as const;

/** Single conversion target — every CTA scrolls here. */
export const FORM_ANCHOR = 'qualify';

/** Shared qualifier option lists — used by both the qualify flow and /quiz. */
export const qualifierOptions = {
  role: ['Owner', 'Manager', 'Other'], // QUALIFIER: owner/decision-maker must be on the call.
  patientsPerMonth: ['Under 20', '20-50', '50-100', '100+'], // CLIENT: confirm qualifier bands
  frustration: [
    'It looks dated',
    'It’s slow or clumsy on mobile',
    'No easy online booking',
    'Before/afters & reviews are buried',
    'It doesn’t reflect our brand',
    'New patients can’t find us',
  ],
  timeline: ['As soon as possible', 'Within a month', '1-3 months', 'Just exploring'], // gauges urgency
};

export const genericFormError =
  'Something went wrong on our end. Please try again, or email us and we’ll take care of it.';

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
  // Rendered as exactly two lines. Line 1 is sage; line 2 is charcoal with
  // "Booked Treatments" sage-marked and "3 Days" gold-underlined.
  headline: {
    line1: 'A Beautiful New Website That Turns Visitors',
    line2: {
      pre: 'Into',
      mark: 'Booked Treatments',
      mid: 'in About',
      underline: '3 Days',
    },
  },
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
};

/* ── Section 3 — "Sound familiar?" problem block. ─────────────────────────── */
export const problem = {
  headline: 'Sound familiar?',
  points: [
    {
      icon: 'clock' as IconKey,
      text: 'Your site looks dated next to the clinic down the street',
      response: {
        headline: 'A dated site signals an outdated practice.',
        body: 'First impressions happen in under 3 seconds online. We rebuild your site to look as premium as the work you do inside.',
      },
    },
    {
      icon: 'smartphone' as IconKey,
      text: 'It\'s slow or clumsy on a phone, where most of your bookings happen',
      response: {
        headline: 'Over 70% of patients are on their phone.',
        body: 'If your site is clumsy on mobile, they close the tab and book the clinic down the street. We build mobile-first, always.',
      },
    },
    {
      icon: 'calendar' as IconKey,
      text: 'There\'s no easy way to book online, so people call... or don\'t',
      response: {
        headline: 'Every missed booking is revenue you never see.',
        body: 'We put a fast, clear booking button exactly where patients look for it, and wire it to real-time availability.',
      },
    },
    {
      icon: 'images' as IconKey,
      text: 'Your before/afters and reviews are buried instead of selling for you',
      response: {
        headline: 'Your results are your best salesperson.',
        body: 'We design before/after galleries and review sections right into the page where they actually convert browsers into bookings.',
      },
    },
    {
      icon: 'sparkles' as IconKey,
      text: 'You\'re proud of your work, but the website doesn\'t reflect your brand',
      response: {
        headline: 'Your in-room experience deserves a site that matches it.',
        body: 'We design to your aesthetic, not a template. Custom colors, fonts, and layouts that feel like you.',
      },
    },
    {
      icon: 'search' as IconKey,
      text: 'New patients can\'t find you, and the ones who do don\'t convert',
      response: {
        headline: 'Visibility and conversion are two different problems.',
        body: 'We fix both: SEO so the right patients find you, and a site designed to turn those visitors into booked treatments.',
      },
    },
  ],
};

/* ── Section 4 — What we build (feature tiles + platform showcase). ───────── */
export const whatWeBuild = {
  eyebrow: 'YOUR NEW WEBSITE, DONE FOR YOU',
  headline: 'Your New Website, Done For You, in About 3 Days',
  // `hotspot` places the pulsing pin over the screen mockup (percentages).
  features: [
    {
      icon: 'palette' as IconKey,
      label: 'Custom, on-brand design',
      desc: 'Matched to your clinic’s aesthetic',
      hotspot: { x: 50, y: 27 },
    },
    {
      icon: 'smartphone' as IconKey,
      label: 'Fast, mobile-first',
      desc: 'Flawless on a phone',
      hotspot: { x: 15, y: 12 },
    },
    {
      icon: 'calendar' as IconKey,
      label: 'Online booking front and center',
      desc: 'The button patients actually find',
      hotspot: { x: 92, y: 39 },
    },
    {
      icon: 'images' as IconKey,
      label: 'Before/after galleries & reviews',
      desc: 'Proof that sells for you',
      hotspot: { x: 24, y: 80 },
    },
    {
      icon: 'fileText' as IconKey,
      label: 'Treatment & service pages',
      desc: 'Built to convert browsers into bookings',
      hotspot: { x: 62, y: 65 },
    },
    {
      icon: 'phoneCall' as IconKey,
      label: 'Click-to-call, maps & contact',
      desc: 'Instant ways to reach you',
      hotspot: { x: 50, y: 93 },
    },
  ],
  platform: {
    eyebrow: 'EVERYTHING UNDER ONE ROOF',
    heading: 'Your website is just the start',
    blurb:
      'Behind it sits one connected platform that runs your whole clinic. Add any part whenever you’re ready.',
    upsellSeed: 'One platform. One login. Everything connected.',
    upsellHighlight: 'Start with your new site; grow into the rest.',
  },
};

/* ── New section — theme showcase ("try it live"). ────────────────────────── */
export const themeShowcase = {
  eyebrow: 'MAKE IT YOURS',
  headline: 'Your site, your colors',
  blurb:
    'Every color on this page is a variable, not a decision we made for you. Try a few — the whole page repaints, live.',
  resetLabel: 'Reset to default',
};

/* ── Section 5 — The math. ────────────────────────────────────────────────── */
export const math = {
  eyebrow: 'THE MATH IS SIMPLE',
  headline: 'The Math Is Simple',
  intro: 'Drag the slider to see what a slow site could quietly be costing your clinic.',
  // CLIENT: confirm figures — keep ranges defensible, no "double your revenue" claims.
  calculator: {
    patients: {
      label: 'New patients a slow site costs you, per month',
      min: 5,
      max: 30,
      step: 1,
      default: 12,
    },
    // CLIENT: confirm figures — value of one new patient up front
    valuePerPatient: {
      label: 'Average value of one new patient',
      min: 200,
      max: 1500,
      step: 50,
      default: 500,
    },
  },
  fact: { value: '~3', suffix: ' days', caption: 'From kickoff to a site built to convert' },
  closing:
    'A website built to convert pays for itself with a handful of extra bookings — every single month.',
  cta: ctas.math,
};

/* ── Section 6 — Social proof. ────────────────────────────────────────────── */
export const socialProof = {
  eyebrow: 'BUILT FOR MED SPAS ONLY',
  headline: 'Built exclusively for med spas',
  // Credibility + scarcity (brief §6).
  credibility:
    'We build websites exclusively for med spas. We’re currently taking on a small number of US clinics. If accepted, you’ll have a site that puts you ahead of the clinic down the street.',
  beforeAfterHeading: 'Before & after, on every screen',
  beforeAfterNote: 'Drag either one to compare the same rebuild, on desktop and on mobile.',
  // Same rebuild, shown big on both a desktop screen and a phone.
  // CLIENT: replace asset — real before/after screenshots of an actual rebuild.
  beforeAfter: {
    desktop: {
      before: { src: '/images/desktop-before.svg', alt: 'A dated med spa website, before the rebuild' },
      after: { src: '/images/desktop-after.svg', alt: 'The same med spa website, rebuilt by TechxServe' },
    },
    mobile: {
      before: { src: '/images/before-site.svg', alt: 'A dated med spa website on mobile, before the rebuild' },
      after: { src: '/images/after-site.svg', alt: 'The same med spa website on mobile, rebuilt by TechxServe' },
    },
  },
};

/* ── Section 7 — Qualify flow. Short taps → business info → book a call. ──── */
export const qualify = {
  eyebrow: 'FREE, NO OBLIGATION',
  headline: 'See What We’d Build For Your Clinic',
  subline: 'A few quick taps, then pick a time. Limited spots each month.',
  steps: [
    { key: 'role' as const, question: 'Which best describes you?', options: qualifierOptions.role },
    {
      key: 'patientsPerMonth' as const,
      question: 'Roughly how many new patients a month?',
      options: qualifierOptions.patientsPerMonth,
    },
    {
      key: 'timeline' as const,
      question: 'When would you want a new site live?',
      options: qualifierOptions.timeline,
    },
  ],
  business: {
    heading: 'Tell us about your clinic',
    body: 'So we know who we’re building for.',
    clinicName: { label: 'Business name', placeholder: 'Glow Aesthetic Studio' },
    email: { label: 'Email', placeholder: 'you@glowaesthetic.com' },
    website: { label: 'Existing website (if any)', placeholder: 'glowaesthetic.com', optional: true },
    cta: 'Continue',
  },
  scheduling: {
    heading: 'Pick a time for your 15-minute call',
    body: 'Whatever’s easiest for you.',
    selfOption: { label: 'Pick a time that works for me', desc: 'Open the calendar and grab a slot' },
    proposeOption: {
      label: 'Propose a time for me',
      desc: 'We’ll text or email a couple of times that work',
    },
    // CLIENT: add your Cal.com booking link (e.g. "techxserve/15min").
    calcomLink: 'hamnanoor/15-min-meeting',
    calcomFallback: 'Opens our calendar in a new tab with your details already filled in — just pick a time.',
    proposedNote: 'We’ll reach out within one business day with a couple of times that work for us.',
  },
  whatToExpect: {
    heading: 'What to expect on the call',
    body: '15 minutes, no pressure.',
    bookedNote: 'You’re booked — we’ll see you then!',
    items: [
      { icon: 'search' as IconKey, label: 'A quick audit', desc: 'What your current site is costing you' },
      {
        icon: 'sparkles' as IconKey,
        label: 'A brainstorm',
        desc: 'Your aesthetic, your treatments, your patients',
      },
      { icon: 'globe' as IconKey, label: 'Packages', desc: 'Website-only, or the full platform' },
      { icon: 'barChart' as IconKey, label: 'The value', desc: 'Exactly what it’s worth to your clinic' },
    ],
  },
  submit: ctas.formSubmit,
  error: genericFormError,
};

/* ── Standalone quiz funnel — linked from Hero's secondary CTA (/quiz). ───── */
export const quiz = {
  entryCta: 'Don’t have the time? It takes 1 minute.',
  metaTitle: 'Quick Start — See What We’d Build For Your Clinic | TechxServe',
  steps: [
    {
      key: 'role' as const,
      question: 'Which best describes you?',
      type: 'single' as const,
      options: qualifierOptions.role,
    },
    {
      key: 'patientsPerMonth' as const,
      question: 'Roughly how many new patients a month?',
      type: 'single' as const,
      options: qualifierOptions.patientsPerMonth,
    },
    {
      key: 'frustration' as const,
      question: 'What’s your biggest frustration with your current site?',
      helper: 'Choose all that apply.',
      type: 'multi' as const,
      options: qualifierOptions.frustration,
    },
    {
      key: 'timeline' as const,
      question: 'When would you want a new site live?',
      type: 'single' as const,
      options: qualifierOptions.timeline,
    },
  ],
  companyStep: {
    heading: 'A couple more details',
    body: 'Tell us about your clinic.',
    clinicName: { label: 'Company name', placeholder: 'Glow Aesthetic Studio' },
    website: { label: 'Existing website (if any)', placeholder: 'glowaesthetic.com', optional: true },
    cta: 'Continue',
  },
  contact: {
    heading: 'Almost there',
    body: 'Where should we send it?',
    fullName: { label: 'Full name', placeholder: 'Jordan Avery' },
    email: { label: 'Email', placeholder: 'you@glowaesthetic.com' },
  },
  submit: 'Show Me My New Website',
  success: {
    heading: 'On its way.',
    body: 'Check your inbox for what we’d build for your clinic — then grab a time below.',
    meetingLinkLabel: 'Book Your 15-Minute Call',
    meetingLink: '', // CLIENT: add scheduling link (e.g. Calendly)
    fallbackNote: 'Prefer to tell us more first?',
    fallbackLinkLabel: 'Fill out the full form',
  },
  error: genericFormError,
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
  phrases?: string[];
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
    tagline: "Every client's history in one click",
    phrases: [
      "Full patient history, one tap, any device",
      "Paperless intake, signed before they arrive",
      "Photos, notes, and preferences auto-stored",
    ],
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
    tagline: 'Always in touch',
    phrases: [
      "Cut no-shows. Dramatically. Automatically.",
      "Clients confirm with a single reply",
      "Set once. Runs forever in the background",
    ],
    items: [
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
    phrases: [
      "Win back lapsed patients, automatically",
      "Promos and campaigns sent without lifting a finger",
      "Turn your happiest patients into referrers",
    ],
    items: [
      { name: 'Patient reactivation', desc: 'Win back lapsed clients automatically for fast, high-margin revenue' },
      { name: 'Rebooking automations', desc: 'Treatment-cycle nudges (e.g. time-to-rebook reminders for injectables)' },
      { name: 'Email & SMS campaigns', desc: 'Promotions, new treatments, and seasonal offers, sent for them' },
      { name: 'Review automation', desc: 'Ask happy clients for reviews automatically for more 5-star ratings' },
      { name: 'Loyalty & referral programs', desc: 'Reward repeat clients and turn them into referrers' },
    ],
  },
  {
    icon: 'search',
    title: 'SEO & Get Found',
    tagline: 'Local growth',
    phrases: [
      "Rank for 'med spa near me' in your city",
      "Show up before the clinic down the street",
      "More visibility, more bookings, less ad spend",
    ],
    items: [
      { name: 'Local SEO', desc: 'Rank for “med spa near me” in your city' },
      { name: 'Google Business Profile', desc: 'Optimized so you show up on the map and in search' },
      { name: 'Social media & content', desc: 'On-brand Instagram content that keeps the calendar full' },
      { name: 'Paid ads', desc: "Meta & Google campaigns when you're ready to scale" },
    ],
  },
  {
    icon: 'bot',
    title: 'AI Chatbot & 24/7 Support',
    tagline: 'Always available',
    phrases: [
      "Books appointments while you sleep",
      "Every after-hours inquiry answered instantly",
      "No missed leads. Ever.",
    ],
    items: [
      { name: 'AI receptionist chatbot', desc: 'Answers questions and books appointments around the clock, even after hours' },
      { name: '24/7 customer service', desc: 'No missed inquiries. Every lead gets an instant, intelligent response' },
      { name: 'AI lead follow-up', desc: 'Instantly responds to and nurtures new enquiries so none go cold' },
      { name: 'Smart workflows', desc: 'Intake, reminder, aftercare, review, rebook. Fully automated end to end' },
    ],
  },
  {
    icon: 'smartphone',
    title: 'Mobile Application',
    tagline: 'For consistent customers',
    phrases: [
      "Your clinic in their pocket, always",
      "Rebook a favourite treatment in one tap",
      "Loyalty and rewards that keep them returning",
    ],
    items: [
      { name: 'Branded client app', desc: 'Your own app so returning patients book, track history, and earn loyalty points easily' },
      { name: 'Push notifications', desc: 'Re-engage clients with offers, reminders, and new treatment announcements' },
      { name: 'In-app booking & history', desc: 'One tap to rebook a favourite treatment, view past visits, or redeem rewards' },
    ],
  },
  {
    icon: 'wrench',
    title: 'Maintenance',
    tagline: 'Whenever you need it',
    phrases: [
      "Changes done the same day you ask",
      "Security and hosting handled, always",
      "Zero tech headaches on your end",
    ],
    items: [
      { name: 'Hosting & uptime monitoring', desc: 'Your site stays fast, live, and secure 24/7 with no effort on your end' },
      { name: 'Updates on demand', desc: "New offers, photos, pages, or copy. Just ask and it's done" },
      { name: 'Security & backups', desc: 'Always patched, always backed up, always protected' },
      { name: 'Dedicated support', desc: 'Help when you need it, no ticket queue, no waiting' },
    ],
  },
  {
    icon: 'palette',
    title: 'Brand Refreshment',
    tagline: 'Look the part',
    phrases: [
      "Look as polished as your results",
      "A brand patients trust on sight",
      "Consistent across every touchpoint",
    ],
    items: [
      { name: 'Logo & identity refresh', desc: 'Modernize your brand without starting from scratch' },
      { name: 'Color, typography & style guide', desc: 'A consistent look across every touchpoint, online and offline' },
      { name: 'Brand assets & collateral', desc: 'Business cards, social kits, menus, and more, all on-brand' },
    ],
  },
  {
    icon: 'barChart',
    title: 'Management System',
    tagline: 'Your business, in one view',
    phrases: [
      "Revenue, staff, clients in one screen",
      "Real-time numbers, no spreadsheets",
      "Run your whole clinic from anywhere",
    ],
    items: [
      { name: 'Revenue tracking', desc: 'Real-time revenue reports across services, providers, and locations' },
      { name: 'Client management', desc: 'Full client records, history, spend, and communication all in one place' },
      { name: 'Employee management', desc: 'Schedules, roles, commissions, and performance in one system' },
    ],
  },
];
