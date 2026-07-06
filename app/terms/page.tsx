import type { Metadata } from 'next';
import { LegalPage } from '@/components/layout/LegalPage';
import { footer } from '@/config/content';

export const metadata: Metadata = {
  title: 'Terms of Service | TechxServe',
  description: 'The terms that govern your use of this website and our services.',
  robots: { index: false, follow: true },
};

/**
 * Stub terms of service — present and linked (required for ad platforms + SMS
 * consent). Replace with counsel-reviewed copy before any paid traffic.
 */
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="July 2026">
      <p>
        {/* CLIENT: replace with counsel-reviewed terms before launch. */}
        These Terms govern your use of this website and your request for a discovery call with
        TechxServe. By submitting the form, you confirm that the information you provide is accurate
        and that you are authorized to request services on behalf of your clinic.
      </p>

      <h2 className="font-display text-h3 text-sage-deep">The offer</h2>
      <p>
        The discovery call and website preview are provided free and with no obligation. Any
        services we agree to perform will be governed by a separate written agreement.
      </p>

      <h2 className="font-display text-h3 text-sage-deep">Scheduling</h2>
      <p>
        If you choose to pick your own time, scheduling is handled by Cal.com, a third-party
        booking service embedded on this page and subject to its own terms.
      </p>

      <h2 className="font-display text-h3 text-sage-deep">No guarantees</h2>
      <p>
        Any figures or examples shown on this page are illustrative and are not a guarantee of
        specific results. Outcomes depend on many factors unique to each clinic.
      </p>

      <h2 className="font-display text-h3 text-sage-deep">Contact</h2>
      <p>
        Questions about these Terms? Email{' '}
        <a className="underline decoration-champagne underline-offset-2" href={`mailto:${footer.contact.email}`}>
          {footer.contact.email}
        </a>
        .
      </p>
    </LegalPage>
  );
}
