import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';

/** Shared shell for the privacy + terms pages. */
export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-line">
        <Container className="flex items-center justify-between py-4">
          <Link href="/" aria-label="TechxServe home">
            <Logo />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-charcoal/70 hover:text-charcoal"
          >
            <ArrowLeft className="size-4" strokeWidth={1.5} /> Back to site
          </Link>
        </Container>
      </header>
      <Container className="max-w-2xl py-16">
        <h1 className="text-h2 text-sage-deep">{title}</h1>
        <p className="mt-2 text-sm text-charcoal/55">Last updated {updated}</p>
        <div className="legal-prose mt-8 space-y-6 text-[0.95rem] leading-relaxed text-charcoal/85">
          {children}
        </div>
      </Container>
    </div>
  );
}
