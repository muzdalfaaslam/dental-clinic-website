import type { Metadata } from 'next';
import { LegalPage } from '@/components/layout/LegalPage';
import { footer, form } from '@/config/content';

export const metadata: Metadata = {
  title: 'Privacy Policy — TechxServe',
  description: 'How TechxServe collects, uses, and protects the information you submit.',
  robots: { index: false, follow: true },
};

/**
 * Stub privacy policy — present and linked (required for ad platforms + SMS
 * consent). Replace with counsel-reviewed copy before any paid traffic.
 */
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="June 2026">
      <p>
        {/* CLIENT: replace with counsel-reviewed policy before launch. */}
        This Privacy Policy explains how TechxServe (“we,” “us”) collects and uses the information
        you provide through this website. By submitting the form on this site, you agree to the
        practices described here.
      </p>

      <h2 className="font-display text-h3 text-sage-deep">Information we collect</h2>
      <p>
        When you complete our discovery form we collect the details you provide: your name, clinic
        or business name, website, phone number, city/state, role, patient volume, current-site
        frustrations, and desired timeline. We also record the date and time of submission and your
        IP address for security and anti-spam purposes.
      </p>

      <h2 className="font-display text-h3 text-sage-deep">How we use it</h2>
      <p>
        We use your information to research your clinic, prepare a website preview, contact you about
        your request, and schedule your discovery call.
      </p>

      <h2 className="font-display text-h3 text-sage-deep">SMS &amp; calls (consent)</h2>
      <p>
        If you check the consent box, you agree that we may call or text you about your request:
        “{form.consent.text}” Message frequency varies. Reply STOP to opt out at any time or HELP for
        help. Carriers are not liable for delayed or undelivered messages. We do not sell your phone
        number, and SMS consent is not shared with third parties for their own marketing.
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
