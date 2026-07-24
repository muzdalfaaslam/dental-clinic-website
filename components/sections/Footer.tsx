import Link from 'next/link';
import { Mail, Phone } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { footer, nav } from '@/config/content';

/**
 * Section 9 — Footer. TechxServe branding + tagline, the US-registered company
 * line, contact, one final repeat CTA, and privacy + terms links (required for ad
 * platforms + SMS consent). This is the one place a small red accent is permitted
 * (the Logo `accent` glyph). Brief §8/Section 9.
 */
export function Footer() {
  return (
    <footer className="rounded-t-lg bg-sage-deep text-cream">
      <div aria-hidden className="h-1 w-full rounded-t-lg bg-warm" />
      <Container className="py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.7fr_1fr] lg:gap-12">
          {/* Brand */}
          <div>
            {/* Footer brand sits on sage — render the wordmark in cream with the
                single permitted red accent. */}
            <span className="font-display text-xl font-semibold tracking-tight text-cream">
              Techx<span className="text-accent-brand">Serve</span>
            </span>
            <p className="mt-3 font-display text-lg text-cream/90">{footer.tagline}</p>
            <p className="mt-4 max-w-sm text-sm text-cream/70">{footer.companyLine}</p>

            <div className="mt-6 flex flex-col gap-3 text-sm text-cream/80">
              <a href={`mailto:${footer.contact.email}`} className="inline-flex items-center gap-2.5 hover:text-cream">
                <span className="inline-flex size-7 items-center justify-center rounded-full bg-warm/20 text-warm">
                  <Mail className="size-3.5" strokeWidth={1.75} />
                </span>
                {footer.contact.email}
              </a>
              <a href={`tel:${footer.contact.phone.replace(/[^\d+]/g, '')}`} className="inline-flex items-center gap-2.5 hover:text-cream">
                <span className="inline-flex size-7 items-center justify-center rounded-full bg-warm/20 text-warm">
                  <Phone className="size-3.5" strokeWidth={1.75} />
                </span>
                {footer.contact.phone}
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-cream/50">Quick Links</p>
            <nav className="mt-4 flex flex-col gap-3" aria-label="Quick links">
              {nav.links.map((link) => (
                
                  key={link.href}
                  href={link.href}
                  className="text-sm text-cream/80 transition-colors duration-200 hover:text-cream"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Final CTA + legal */}
          <div className="flex flex-col items-start gap-6 lg:items-end lg:text-right">
            <p className="max-w-xs font-display text-h3 text-cream">
              Ready to see your new site?
            </p>
            <Button source="footer" variant="invert" size="lg" withArrow>
              {footer.cta}
            </Button>
            <nav className="mt-2 flex gap-5 text-sm text-cream/70" aria-label="Legal">
              {footer.legal.map((l) => (
                <Link key={l.href} href={l.href} className="underline decoration-cream/30 underline-offset-4 hover:text-cream">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-12 border-t border-cream/15 pt-6 text-xs text-cream/55">
          <Logo className="sr-only" />
          {footer.copyright}
        </div>
      </Container>
    </footer>
  );
}