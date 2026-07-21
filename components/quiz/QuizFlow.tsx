'use client';

import { useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft, X, CheckCircle2 } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Logo } from '@/components/ui/Logo';
import { StepProgressBar } from '@/components/ui/StepProgressBar';
import { TextField } from '@/components/form/FormField';
import { QuizOptionCard } from './QuizOptionCard';
import { quiz } from '@/config/content';
import { quizLeadSchema } from '@/lib/quizValidation';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/utils';

type SingleKey = 'role' | 'patientsPerMonth' | 'timeline';

interface Answers {
  role: string;
  patientsPerMonth: string;
  frustration: string[];
  timeline: string;
  clinicName: string;
  website: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;
const AUTO_ADVANCE_MS = 260;

const companySchema = quizLeadSchema.pick({ clinicName: true, website: true });
type CompanyValues = { clinicName: string; website: string };

const contactSchema = quizLeadSchema.pick({ fullName: true, email: true, company: true });
type ContactValues = { fullName: string; email: string; company: string };

const TOTAL_STEPS = quiz.steps.length + 2; // + company details + contact

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mb-6 inline-flex items-center gap-1 text-sm text-charcoal/50 transition-colors duration-200 hover:text-sage-deep"
    >
      <ChevronLeft className="size-4" strokeWidth={1.75} /> Back
    </button>
  );
}

export function QuizFlow() {
  const reduce = useReducedMotion();
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    role: '',
    patientsPerMonth: '',
    frustration: [],
    timeline: '',
    clinicName: '',
    website: '',
  });
  const [status, setStatus] = useState<'active' | 'submitting' | 'success' | 'error'>('active');

  const startedRef = useRef(false);
  const renderedAtRef = useRef<number>(Date.now());

  const markStarted = useCallback(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      track('quiz_start');
    }
  }, []);

  const {
    register: registerCompany,
    handleSubmit: handleCompanySubmit,
    formState: { errors: companyErrors },
  } = useForm<CompanyValues>({
    resolver: zodResolver(companySchema),
    defaultValues: { clinicName: '', website: '' },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { fullName: '', email: '', company: '' },
  });

  const selectSingle = (key: SingleKey, value: string) => {
    markStarted();
    setAnswers((a) => ({ ...a, [key]: value }));
    window.setTimeout(() => setStepIndex((i) => i + 1), AUTO_ADVANCE_MS);
  };

  const toggleFrustration = (value: string) => {
    markStarted();
    setAnswers((a) => {
      const has = a.frustration.includes(value);
      return { ...a, frustration: has ? a.frustration.filter((v) => v !== value) : [...a.frustration, value] };
    });
  };

  const back = () => setStepIndex((i) => Math.max(0, i - 1));

  const onCompanySubmit = handleCompanySubmit((vals) => {
    markStarted();
    setAnswers((a) => ({ ...a, clinicName: vals.clinicName, website: vals.website ?? '' }));
    setStepIndex((i) => i + 1);
  });

  const onContactSubmit = handleSubmit(async (vals) => {
    setStatus('submitting');
    try {
      const res = await fetch('/api/quiz-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: vals.fullName,
          email: vals.email,
          company: vals.company,
          clinicName: answers.clinicName,
          website: answers.website,
          role: answers.role,
          patientsPerMonth: answers.patientsPerMonth,
          frustration: answers.frustration,
          timeline: answers.timeline,
          renderedAt: renderedAtRef.current,
        }),
      });
      const data = (await res.json()) as { ok: boolean };
      if (!res.ok || !data.ok) {
        setStatus('error');
        return;
      }
      track('quiz_complete', {
        role: answers.role,
        patients_per_month: answers.patientsPerMonth,
        timeline: answers.timeline,
      });
      setStatus('success');
    } catch {
      setStatus('error');
    }
  });

  const progressPct = status === 'success' ? 100 : ((stepIndex + 1) / TOTAL_STEPS) * 100;
  const currentQuestion = stepIndex < quiz.steps.length ? quiz.steps[stepIndex] : undefined;
  const isCompanyStep = stepIndex === quiz.steps.length;
  const isContactStep = stepIndex === quiz.steps.length + 1;

  const transition = reduce
    ? { duration: 0 }
    : { duration: 0.4, ease: EASE };
  const variants = reduce
    ? { initial: {}, animate: {}, exit: {} }
    : {
        initial: { opacity: 0, x: 24 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -24 },
      };

  return (
    <div className="min-h-screen bg-cream">
      <header className="border-b border-line">
        <Container className="flex items-center justify-between py-4">
          <Link href="/" aria-label="TechxServe home">
            <Logo />
          </Link>
          {status !== 'success' && (
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-charcoal/60 transition-colors duration-200 hover:text-charcoal"
            >
              <X className="size-4" strokeWidth={1.5} /> Back to site
            </Link>
          )}
        </Container>
      </header>

      {status !== 'success' && <StepProgressBar pct={progressPct} />}

      <Container className="max-w-xl py-14 sm:py-20">
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={variants.initial}
              animate={variants.animate}
              exit={variants.exit}
              transition={transition}
              className="flex flex-col items-center text-center"
            >
              <span className="inline-flex size-16 items-center justify-center rounded-full bg-sage-deep/10 text-sage-deep">
                <CheckCircle2 className="size-9" strokeWidth={1.5} />
              </span>
              <h1 className="mt-6 text-h2 text-sage-deep">{quiz.success.heading}</h1>
              <p className="mt-4 max-w-md text-body-lg text-charcoal/80">{quiz.success.body}</p>

              {quiz.success.meetingLink ? (
                <a
                  href={quiz.success.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-sage-deep px-8 py-4 text-base font-medium text-cream shadow-soft ring-1 ring-inset ring-champagne/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[rgb(15_70_87)] hover:shadow-card"
                >
                  {quiz.success.meetingLinkLabel}
                </a>
              ) : null}

              <p className="mt-6 text-sm text-charcoal/55">
                {quiz.success.fallbackNote}{' '}
                <Link href="/#qualify" className="underline decoration-champagne/60 underline-offset-4 hover:text-sage-deep">
                  {quiz.success.fallbackLinkLabel}
                </Link>
              </p>
            </motion.div>
          ) : currentQuestion ? (
            <motion.div
              key={`q-${stepIndex}`}
              initial={variants.initial}
              animate={variants.animate}
              exit={variants.exit}
              transition={transition}
            >
              {stepIndex > 0 && <BackButton onClick={back} />}
              <p className="text-xs font-medium uppercase tracking-[0.16em] text-sage-soft">
                Question {stepIndex + 1} of {quiz.steps.length}
              </p>
              <h1 className="mt-3 text-h3 text-sage-deep sm:text-h2">{currentQuestion.question}</h1>
              {'helper' in currentQuestion && currentQuestion.helper && (
                <p className="mt-2 text-sm text-charcoal/60">{currentQuestion.helper}</p>
              )}

              {currentQuestion.type === 'multi' ? (
                <>
                  <div className="mt-6 flex flex-col gap-2.5">
                    {currentQuestion.options.map((opt) => (
                      <QuizOptionCard
                        key={opt}
                        label={opt}
                        active={answers.frustration.includes(opt)}
                        onClick={() => toggleFrustration(opt)}
                      />
                    ))}
                  </div>
                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      disabled={answers.frustration.length === 0}
                      onClick={() => setStepIndex((i) => i + 1)}
                      className={cn(
                        'inline-flex items-center justify-center rounded-lg bg-sage-deep px-6 py-3 text-[0.95rem] font-medium text-cream shadow-soft ring-1 ring-inset ring-champagne/40 transition-all duration-200',
                        'hover:-translate-y-0.5 hover:bg-[rgb(82_94_72)] hover:shadow-card disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0',
                      )}
                    >
                      Continue
                    </button>
                  </div>
                </>
              ) : (
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
              )}
            </motion.div>
          ) : isCompanyStep ? (
            <motion.div
              key="company"
              initial={variants.initial}
              animate={variants.animate}
              exit={variants.exit}
              transition={transition}
            >
              <BackButton onClick={back} />
              <h1 className="text-h3 text-sage-deep sm:text-h2">{quiz.companyStep.heading}</h1>
              <p className="mt-2 text-sm text-charcoal/60">{quiz.companyStep.body}</p>

              <form noValidate onSubmit={onCompanySubmit} className="mt-7 flex flex-col gap-5">
                <TextField
                  label={quiz.companyStep.clinicName.label}
                  placeholder={quiz.companyStep.clinicName.placeholder}
                  autoComplete="organization"
                  error={companyErrors.clinicName?.message}
                  {...registerCompany('clinicName')}
                />
                <TextField
                  label={quiz.companyStep.website.label}
                  placeholder={quiz.companyStep.website.placeholder}
                  optional={quiz.companyStep.website.optional}
                  inputMode="url"
                  autoComplete="url"
                  error={companyErrors.website?.message}
                  {...registerCompany('website')}
                />
                <div className="mt-1 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-sage-deep px-6 py-3 text-[0.95rem] font-medium text-cream shadow-soft ring-1 ring-inset ring-champagne/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[rgb(82_94_72)] hover:shadow-card"
                  >
                    {quiz.companyStep.cta}
                  </button>
                </div>
              </form>
            </motion.div>
          ) : isContactStep ? (
            <motion.div
              key="contact"
              initial={variants.initial}
              animate={variants.animate}
              exit={variants.exit}
              transition={transition}
            >
              <BackButton onClick={back} />
              <h1 className="text-h3 text-sage-deep sm:text-h2">{quiz.contact.heading}</h1>
              <p className="mt-2 text-sm text-charcoal/60">{quiz.contact.body}</p>

              <form noValidate onSubmit={onContactSubmit} className="mt-7 flex flex-col gap-5">
                {/* honeypot */}
                <div aria-hidden className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
                  <label htmlFor="quiz-company">Company (leave blank)</label>
                  <input id="quiz-company" type="text" tabIndex={-1} autoComplete="off" {...register('company')} />
                </div>

                <TextField
                  label={quiz.contact.fullName.label}
                  placeholder={quiz.contact.fullName.placeholder}
                  autoComplete="name"
                  error={errors.fullName?.message}
                  {...register('fullName')}
                />
                <TextField
                  label={quiz.contact.email.label}
                  placeholder={quiz.contact.email.placeholder}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  error={errors.email?.message}
                  {...register('email')}
                />

                {status === 'error' && (
                  <p role="alert" className="rounded-sm bg-accent-brand/10 px-4 py-3 text-sm text-accent-brand">
                    {quiz.error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-sage-deep px-6 py-4 text-base font-medium text-cream shadow-soft ring-1 ring-inset ring-champagne/40 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[rgb(82_94_72)] hover:shadow-card disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === 'submitting' ? 'Sending…' : quiz.submit}
                </button>
              </form>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </Container>
    </div>
  );
}
