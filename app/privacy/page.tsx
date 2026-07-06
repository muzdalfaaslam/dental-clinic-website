import type { Metadata } from 'next';
import { LegalPage } from '@/components/layout/LegalPage';
import { footer } from '@/config/content';

export const metadata: Metadata = {
  title: 'Privacy Policy | TechxServe',
  description: 'How TechxServe collects, uses, and protects the information you submit.',
  robots: { index: false, follow: true },
};

/**
 * Stub privacy policy — present and linked (required for ad platforms).
 * Replace with counsel-reviewed copy before any paid traffic.
 */
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="July 2026">
      <p>
        {/* CLIENT: replace with counsel-reviewed policy before launch. */}
        This Privacy Policy explains how TechxServe (“we,” “us”) collects and uses the information
        you provide through this website. By completing the form on this site, you agree to the
        practices described here.
      </p>

      <h2 className="font-display text-h3 text-sage-deep">Information we collect</h2>
      <p>
        When you complete our qualify flow or 1-minute quiz we collect the details you provide:
        your clinic or business name, email, existing website (if any), role, patient volume,
        current-site frustrations, and desired timeline. We also record the date and time of
        submission and your IP address for security and anti-spam purposes.
      </p>

      <h2 className="font-display text-h3 text-sage-deep">Scheduling a call</h2>
      <p>
        If you choose to pick your own time, scheduling is handled by Cal.com, a third-party
        booking service embedded on this page. Any information you provide while booking (such as
        your name and time zone) is governed by{' '}
        <a
          className="underline decoration-champagne underline-offset-2"
          href="https://cal.com/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cal.com’s own privacy policy
        </a>
        .
      </p>

      <h2 className="font-display text-h3 text-sage-deep">How we use it</h2>
      <p>
        We use your information to research your clinic, prepare a website preview, contact you about
        your request, and schedule your discovery call.
      </p>

      <h2 className="font-display text-h3 text-sage-deep">Your choices</h2>
      <p>
        You may request access to, correction of, or deletion of your information, and you may opt
        out of messages at any time, by emailing{' '}
        <a className="underline decoration-champagne underline-offset-2" href={`mailto:${footer.contact.email}`}>
          {footer.contact.email}
        </a>
        .
      </p>

      <h2 className="font-display text-h3 text-sage-deep">Contact</h2>
      <p>
        Questions? Email{' '}
        <a className="underline decoration-champagne underline-offset-2" href={`mailto:${footer.contact.email}`}>
          {footer.contact.email}
        </a>{' '}
        or call {footer.contact.phone}.
      </p>
    </LegalPage>
  );
}
