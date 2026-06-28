'use client';

import { useCallback, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { leadSchema, leadDefaults, type LeadInput, type LeadData } from '@/lib/validation';
import { track } from '@/lib/analytics';

type Status = 'idle' | 'submitting' | 'success' | 'error';

/**
 * Encapsulates all form behavior: RHF + Zod (validate on blur), a one-time
 * `form_start` analytics event on first interaction, a min-fill-time stamp for
 * spam timing, POST to /api/lead, and success/error/loading state. The component
 * stays presentational. See brief §7, §9.
 */
export function useLeadForm() {
  const methods = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: leadDefaults,
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const [status, setStatus] = useState<Status>('idle');
  const startedRef = useRef(false);
  const renderedAtRef = useRef<number>(Date.now());

  const markStarted = useCallback(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      track('form_start');
    }
  }, []);

  const onSubmit = methods.handleSubmit(async (values) => {
    setStatus('submitting');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...values,
          renderedAt: renderedAtRef.current,
          consentVersion: undefined, // server stamps the authoritative version
        } satisfies LeadInput & Record<string, unknown>),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setStatus('error');
        return;
      }
      const clean = values as unknown as LeadData;
      track('lead_submit', {
        role: clean.role,
        patients_per_month: clean.patientsPerMonth,
        timeline: clean.timeline,
      });
      setStatus('success');
      methods.reset();
    } catch {
      setStatus('error');
    }
  });

  return { methods, status, onSubmit, markStarted };
}
