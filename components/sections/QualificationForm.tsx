'use client';

import { CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { TextField, SelectField, CheckboxGroup } from '@/components/form/FormField';
import { ConsentCheckbox } from '@/components/form/ConsentCheckbox';
import { useLeadForm } from '@/components/form/useLeadForm';
import { formatUsPhone } from '@/lib/validation';
import { form, FORM_ANCHOR } from '@/config/content';

/**
 * Section 7 — Qualification form. The conversion event. Client + server validated
 * (RHF + Zod), required TCPA consent, honeypot + timing spam guards, inline errors
 * announced to assistive tech, large mobile tap targets, loading + success states.
 * Submit button never says "Submit". Brief §7.
 */
export function QualificationForm() {
  const { methods, status, onSubmit, markStarted } = useLeadForm();
  const {
    register,
    setValue,
    formState: { errors },
  } = methods;

  const f = form.fields;

  if (status === 'success') {
    return (
      <section id={FORM_ANCHOR} className="scroll-mt-24 bg-cream-deep py-section">
        <Container className="flex flex-col items-center text-center">
          <span className="inline-flex size-16 items-center justify-center rounded-full bg-sage-deep/10 text-sage-deep">
            <CheckCircle2 className="size-9" strokeWidth={1.5} />
          </span>
          <h2 className="mt-6 text-h2 text-sage-deep">{form.success.heading}</h2>
          <p className="mt-4 max-w-xl text-body-lg text-charcoal/80">{form.success.body}</p>
          {/* Slot for the later "thank-you" no-show-reducer video (config-driven). */}
          {form.success.thankYouVideoSrc && (
            <video
              className="mt-8 w-full max-w-2xl rounded-lg shadow-card"
              controls
              playsInline
              src={form.success.thankYouVideoSrc}
            />
          )}
        </Container>
      </section>
    );
  }

  return (
    <section id={FORM_ANCHOR} className="scroll-mt-24 bg-cream-deep py-section">
      <Container className="max-w-3xl">
        <div className="text-center">
          <SectionLabel className="justify-center">{form.eyebrow}</SectionLabel>
          <h2 className="mt-4 text-h2 text-sage-deep text-balance">{form.headline}</h2>
          <p className="mx-auto mt-4 max-w-xl text-body-lg text-charcoal/75">{form.subline}</p>
        </div>

        <form
          noValidate
          onChange={markStarted}
          onSubmit={onSubmit}
          className="mt-10 rounded-lg border border-line bg-cream p-6 shadow-card sm:p-9"
        >
          {/* Honeypot — visually hidden, off the tab order, ignored by humans. */}
          <div aria-hidden className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
            <label htmlFor="company">Company (leave blank)</label>
            <input
              id="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register('company')}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <TextField
              label={f.fullName.label}
              placeholder={f.fullName.placeholder}
              autoComplete="name"
              error={errors.fullName?.message}
              {...register('fullName')}
            />
            <TextField
              label={f.clinicName.label}
              placeholder={f.clinicName.placeholder}
              autoComplete="organization"
              error={errors.clinicName?.message}
              {...register('clinicName')}
            />
            <TextField
              label={f.website.label}
              placeholder={f.website.placeholder}
              optional={f.website.optional}
              inputMode="url"
              autoComplete="url"
              error={errors.website?.message}
              {...register('website')}
            />
            <TextField
              label={f.cityState.label}
              placeholder={f.cityState.placeholder}
              autoComplete="address-level2"
              error={errors.cityState?.message}
              {...register('cityState')}
            />
          </div>

          {/* Phone + required SMS consent, grouped together (brief §7). */}
          <div className="mt-5 grid gap-5">
            <TextField
              label={f.phone.label}
              placeholder={f.phone.placeholder}
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              error={errors.phone?.message}
              {...register('phone', {
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                  setValue('phone', formatUsPhone(e.target.value), { shouldValidate: false });
                },
              })}
            />
            <ConsentCheckbox error={errors.consent?.message} {...register('consent')} />
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <SelectField
              label={f.role.label}
              placeholder={f.role.placeholder}
              options={f.role.options}
              error={errors.role?.message}
              {...register('role')}
            />
            <SelectField
              label={f.patientsPerMonth.label}
              placeholder={f.patientsPerMonth.placeholder}
              options={f.patientsPerMonth.options}
              error={errors.patientsPerMonth?.message}
              {...register('patientsPerMonth')}
            />
          </div>

          <div className="mt-5">
            <CheckboxGroup
              label={f.frustration.label}
              helper={f.frustration.helper}
              options={f.frustration.options}
              error={errors.frustration?.message as string | undefined}
              register={register('frustration')}
            />
          </div>

          <div className="mt-5">
            <SelectField
              label={f.timeline.label}
              placeholder={f.timeline.placeholder}
              options={f.timeline.options}
              error={errors.timeline?.message}
              {...register('timeline')}
            />
          </div>

          {status === 'error' && (
            <p role="alert" className="mt-6 rounded-sm bg-accent-brand/10 px-4 py-3 text-sm text-accent-brand">
              {form.error}
            </p>
          )}

          <div className="mt-8 flex flex-col items-center gap-3">
            <Button
              type="submit"
              size="lg"
              disabled={status === 'submitting'}
              withArrow={false}
              className="w-full sm:w-auto sm:min-w-64"
            >
              {status === 'submitting' ? 'Sending…' : form.submit}
            </Button>
            <p aria-live="polite" className="sr-only">
              {status === 'submitting' ? 'Sending your request' : ''}
            </p>
          </div>
        </form>
      </Container>
    </section>
  );
}
