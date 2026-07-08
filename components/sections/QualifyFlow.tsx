'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CalendarClock, CheckCircle2, MessageCircleMore } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SectionLabel } from '@/components/ui/SectionLabel';
import { StepProgressBar } from '@/components/ui/StepProgressBar';
import { FeatureTile } from '@/components/ui/FeatureTile';
import { TextField } from '@/components/form/FormField';
import { QuizOptionCard } from '@/components/quiz/QuizOptionCard';
import { qualify, FORM_ANCHOR } from '@/config/content';
import { qualifyLeadSchema } from '@/lib/qualifyValidation';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

type SingleKey = 'role' | 'patientsPerMonth' | 'timeline';
type SchedulingPreference = 'self' | 'propose';

interface Answers {
  role: string;
  patientsPerMonth: string;
  timeline: string;
  clinicName: string;
  email: string;
  website: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTO_ADVANCE_MS = 260;

const businessSchema = qualifyLeadSchema.pick({ clinicName: true, email: true, website: true, company: true });
type BusinessValues = { clinicName: string; email: string; website: string; company: string };

const TOTAL_STEPS = qualify.steps.length + 2; // + business info + scheduling

/**
 * Section 7 — the site's single conversion target (id="qualify"). Replaces
 * the old long form: three quick taps, one business-info step, then a
 * scheduling choice — self-pick via Cal.com, or ask us to propose a time.
 * "What to expect on the call" becomes the terminal screen once a real
 * booking completes (or immediately, on the propose-a-time path).
 */
export function QualifyFlow() {
  const reduce = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    role: '',
    patientsPerMonth: '',
    timeline: '',
    clinicName: '',
    email: '',
    website: '',
  });
  const [schedulingPreference, setSchedulingPreference] = useState<SchedulingPreference | null>(null);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');
  const [showExpect, setShowExpect] = useState(false);

  const startedRef = useRef(false);
  const renderedAtRef = useRef<number>(Date.now());

  const markStarted = useCallback(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      track('qualify_start');
    }
  }, []);

  const {
    register: registerBusiness,
    handleSubmit: handleBusinessSubmit,
    formState: { errors: businessErrors },
  } = useForm<BusinessValues>({
    resolver: zodResolver(businessSchema),
    defaultValues: { clinicName: '', email: '', website: '', company: '' },
  });

  const selectSingle = (key: SingleKey, value: string) => {
    markStarted();
    setAnswers((a) => ({ ...a, [key]: value }));
    window.setTimeout(() => setStepIndex((i) => i + 1), AUTO_ADVANCE_MS);
  };

  const back = () => setStepIndex((i) => Math.max(0, i - 1));

  const onBusinessSubmit = handleBusinessSubmit((vals) => {
    setAnswers((a) => ({ ...a, clinicName: vals.clinicName, email: vals.email, website: vals.website ?? '' }));
    setStepIndex((i) => i + 1);
  });

  const submitLead = async (preference: SchedulingPreference) => {
    setSubmitStatus('submitting');
    setSchedulingPreference(preference);
    try {
      const res = await fetch('/api/qualify-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clinicName: answers.clinicName,
          email: answers.email,
          website: answers.website,
          role: answers.role,
          patientsPerMonth: answers.patientsPerMonth,
          timeline: answers.timeline,
          schedulingPreference: preference,
          renderedAt: renderedAtRef.current,
        }),
      });
      const data = (await res.json()) as { ok: boolean };
      if (!res.ok || !data.ok) {
        setSubmitStatus('error');
        return;
      }
      track('qualify_submit', {
        role: answers.role,
        patients_per_month: answers.patientsPerMonth,
        timeline: answers.timeline,
        scheduling_preference: preference,
      });
      setSubmitStatus('submitted');
      if (preference === 'propose') setShowExpect(true);
    } catch {
      setSubmitStatus('error');
    }
  };

  // Build the Cal.com booking URL with every answer passed as a prefill query
  // param, so the booking page opens (new tab) with the form already filled.
  // Each param maps to a Cal.com booking-question Identifier (set on the event's
  // Advanced tab): name/email are Cal's defaults; the rest are custom questions
  // whose slugs must match these keys exactly, or the value is silently dropped.
  const calHref = useMemo(() => {
    const params = new URLSearchParams();
    const add = (key: string, value: string) => value && params.set(key, value);
    add('name', answers.clinicName);
    add('email', answers.email);
    add('clinicName', answers.clinicName);
    add('website', answers.website);
    add('role', answers.role);
    add('patientsPerMonth', answers.patientsPerMonth);
    add('timeline', answers.timeline);
    const query = params.toString();
    return `https://cal.com/${qualify.scheduling.calcomLink}${query ? `?${query}` : ''}`;
  }, [answers]);

  const progressPct = showExpect ? 100 : ((stepIndex + 1) / TOTAL_STEPS) * 100;
  const currentQuestion = stepIndex < qualify.steps.length ? qualify.steps[stepIndex] : undefined;
  const isBusinessStep = stepIndex === qualify.steps.length;
  const isSchedulingStep = stepIndex === qualify.steps.length + 1;

  const transition = reduce ? { duration: 0 } : { duration: 0.35, ease: EASE };
  const variants = reduce
    ? { initial: {}, animate: {}, exit: {} }
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -12 },
      };

  return (
    <section id={FORM_ANCHOR} className="scroll-mt-24 bg-cream-deep py-section">
      <Container className="max-w-2xl">
        <div className="text-center">
          <SectionLabel className="justify-center">{qualify.eyebrow}</SectionLabel>
          <h2 className="mt-4 text-h2 text-sage-deep text-balance">{qualify.headline}</h2>
          <p className="mx-auto mt-4 max-w-md text-body-lg text-charcoal/75">{qualify.subline}</p>
        </div>

        <div className="mt-10 overflow-hidden rounded-lg border border-line bg-cream shadow-card">
          {!showExpect && <StepProgressBar pct={progressPct} />}

          <div className="p-6 sm:p-9">
            <AnimatePresence mode="wait">
              {showExpect ? (
                <motion.div
                  key="expect"
                  initial={variants.initial}
                  animate={variants.animate}
                  exit={variants.exit}
                  transition={transition}
                >
                  <div className="flex flex-col items-center text-center">
                    <span className="inline-flex size-14 items-center justify-center rounded-full bg-sage-deep/10 text-sage-deep">
                      <CheckCircle2 className="size-8" strokeWidth={1.5} />
                    </span>
                    <p className="mt-4 text-sm font-medium text-sage-deep">
                      {schedulingPreference === 'propose'
                        ? qualify.scheduling.proposedNote
                        : qualify.whatToExpect.bookedNote}
                    </p>
                    <h3 className="mt-5 text-h3 text-sage-deep">{qualify.whatToExpect.heading}</h3>
                    <p className="mt-2 text-sm text-charcoal/60">{qualify.whatToExpect.body}</p>
                  </div>
                  <div className="mt-8 grid gap-6 sm:grid-cols-2">
                    {qualify.whatToExpect.items.map((item) => (
                      <FeatureTile key={item.label} icon={item.icon} label={item.label} desc={item.desc} />
                    ))}
                  </div>
                </motion.div>
              ) : currentQuestion ? (
                <motion.div
                  key={`q-${stepIndex}`}
                  initial={variants.initial}
                  animate={variants.animate}
                  exit={variants.exit}
                  transition={transition}
                >
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-sage-soft">
                    Step {stepIndex + 1} of {TOTAL_STEPS}
                  </p>
                  <h3 className="mt-3 text-h3 text-sage-deep">{currentQuestion.question}</h3>
                  <div className="mt-6 flex flex-col gap-2.5">
                    {currentQuestion.options.map((opt) => (
                      <QuizOptionCard
                        key={opt}
                        label={opt}
                        active={answers[currentQuestion.key] === opt}
                        onClick={() => selectSingle(currentQuestion.key, opt)}
                      />
                    ))}
                  </div>
                  {stepIndex > 0 && (
                    <button
                      type="button"
                      onClick={back}
                      className="mt-5 text-sm text-charcoal/50 transition-colors duration-200 hover:text-sage-deep"
                    >
                      ← Back
                    </button>
                  )}
                </motion.div>
              ) : isBusinessStep ? (
                <motion.div
                  key="business"
                  initial={variants.initial}
                  animate={variants.animate}
                  exit={variants.exit}
                  transition={transition}
                >
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-sage-soft">
                    Step {stepIndex + 1} of {TOTAL_STEPS}
                  </p>
                  <h3 className="mt-3 text-h3 text-sage-deep">{qualify.business.heading}</h3>
                  <p className="mt-2 text-sm text-charcoal/60">{qualify.business.body}</p>

                  <form noValidate onSubmit={onBusinessSubmit} className="mt-6 flex flex-col gap-5">
                    {/* honeypot */}
                    <div aria-hidden className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
                      <label htmlFor="qualify-company">Company (leave blank)</label>
                      <input
                        id="qualify-company"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        {...registerBusiness('company')}
                      />
                    </div>

                    <TextField
                      label={qualify.business.clinicName.label}
                      placeholder={qualify.business.clinicName.placeholder}
                      autoComplete="organization"
                      error={businessErrors.clinicName?.message}
                      {...registerBusiness('clinicName')}
                    />
                    <TextField
                      label={qualify.business.email.label}
                      placeholder={qualify.business.email.placeholder}
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      error={businessErrors.email?.message}
                      {...registerBusiness('email')}
                    />
                    <TextField
                      label={qualify.business.website.label}
                      placeholder={qualify.business.website.placeholder}
                      optional={qualify.business.website.optional}
                      inputMode="url"
                      autoComplete="url"
                      error={businessErrors.website?.message}
                      {...registerBusiness('website')}
                    />

                    <div className="mt-1 flex items-center justify-between gap-4">
                      <button
                        type="button"
                        onClick={back}
                        className="text-sm text-charcoal/50 transition-colors duration-200 hover:text-sage-deep"
                      >
                        ← Back
                      </button>
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 rounded-lg bg-sage-deep px-6 py-3 text-[0.95rem] font-medium text-cream shadow-soft ring-1 ring-inset ring-champagne/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[rgb(82_94_72)] hover:shadow-card"
                      >
                        {qualify.business.cta}
                      </button>
                    </div>
                  </form>
                </motion.div>
              ) : isSchedulingStep ? (
                <motion.div
                  key="scheduling"
                  initial={variants.initial}
                  animate={variants.animate}
                  exit={variants.exit}
                  transition={transition}
                >
                  <p className="text-xs font-medium uppercase tracking-[0.16em] text-sage-soft">
                    Step {stepIndex + 1} of {TOTAL_STEPS}
                  </p>
                  <h3 className="mt-3 text-h3 text-sage-deep">{qualify.scheduling.heading}</h3>
                  <p className="mt-2 text-sm text-charcoal/60">{qualify.scheduling.body}</p>

                  {!schedulingPreference ? (
                    <div className="mt-6 flex flex-col gap-2.5">
                      <button
                        type="button"
                        onClick={() => submitLead('self')}
                        className={cn(
                          'group flex w-full flex-col gap-0.5 rounded-md border border-line bg-cream p-4 text-left shadow-soft transition-all duration-200 hover:border-champagne/50 hover:shadow-card',
                        )}
                      >
                        <span className="text-[0.95rem] font-medium text-charcoal">
                          {qualify.scheduling.selfOption.label}
                        </span>
                        <span className="text-xs text-charcoal/55">{qualify.scheduling.selfOption.desc}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => submitLead('propose')}
                        className={cn(
                          'group flex w-full flex-col gap-0.5 rounded-md border border-line bg-cream p-4 text-left shadow-soft transition-all duration-200 hover:border-champagne/50 hover:shadow-card',
                        )}
                      >
                        <span className="flex items-center gap-2 text-[0.95rem] font-medium text-charcoal">
                          <MessageCircleMore className="size-4 text-sage-soft" strokeWidth={1.75} />
                          {qualify.scheduling.proposeOption.label}
                        </span>
                        <span className="text-xs text-charcoal/55">{qualify.scheduling.proposeOption.desc}</span>
                      </button>
                    </div>
                  ) : schedulingPreference === 'self' ? (
                    <div className="mt-6">
                      {submitStatus === 'error' ? (
                        <div className="rounded-sm bg-accent-brand/10 px-4 py-3 text-sm text-accent-brand">
                          {qualify.error}
                          <button
                            type="button"
                            onClick={() => submitLead('self')}
                            className="ml-2 underline underline-offset-2"
                          >
                            Try again
                          </button>
                        </div>
                      ) : (
                        <div className="mt-6 flex flex-col items-center gap-4 rounded-lg border border-line bg-cream-deep/40 p-8 text-center">
                          <CalendarClock className="size-8 text-sage-soft" strokeWidth={1.5} />
                          <p className="max-w-xs text-sm text-charcoal/70">
                            {qualify.scheduling.calcomFallback}
                          </p>
                          <a
                            href={calHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setShowExpect(true)}
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-sage-deep px-6 py-3 text-[0.95rem] font-medium text-cream shadow-soft ring-1 ring-inset ring-champagne/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[rgb(82_94_72)] hover:shadow-card"
                          >
                            <CalendarClock className="size-4" strokeWidth={1.75} />
                            {qualify.scheduling.selfOption.label}
                          </a>
                        </div>
                      )}
                    </div>
                  ) : null}

                  {!schedulingPreference && (
                    <button
                      type="button"
                      onClick={back}
                      className="mt-5 text-sm text-charcoal/50 transition-colors duration-200 hover:text-sage-deep"
                    >
                      ← Back
                    </button>
                  )}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-charcoal/45">
          Prefer email?{' '}
          <Link href="/quiz" className="underline decoration-champagne/60 underline-offset-4 hover:text-sage-deep">
            Try the 1-minute quiz instead
          </Link>
        </p>
      </Container>
    </section>
  );
}
