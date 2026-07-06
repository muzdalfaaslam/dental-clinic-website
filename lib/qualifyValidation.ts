import { z } from 'zod';
import { asTuple, roleEnum, patientsEnum, timelineEnum, looseUrl } from './validation';

/**
 * Schema for the qualify flow (id="qualify", the site's single conversion
 * target) — short qualifier taps + business info + a scheduling choice.
 * No phone number is collected here, so no TCPA/SMS consent applies; that
 * stays scoped to whatever the client's Cal.com booking page collects on
 * its own. Client AND server validated, same pattern as the quiz funnel.
 */
export const schedulingPreferenceEnum = z.enum(asTuple(['self', 'propose']));

export const qualifyLeadSchema = z.object({
  clinicName: z
    .string()
    .trim()
    .min(2, 'Please enter your business name.')
    .max(120, 'That name is a little too long.'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email.')
    .max(254, 'That email is a little too long.')
    .email('Please enter a valid email address.'),
  website: looseUrl.optional().default(''),
  role: roleEnum,
  patientsPerMonth: patientsEnum,
  timeline: timelineEnum,
  schedulingPreference: schedulingPreferenceEnum,
  company: z.string().max(0).optional().default(''), // honeypot
  renderedAt: z.number().optional(),
});

export type QualifyLeadInput = z.input<typeof qualifyLeadSchema>;
export type QualifyLeadData = z.output<typeof qualifyLeadSchema>;

export const qualifyLeadDefaults: QualifyLeadInput = {
  clinicName: '',
  email: '',
  website: '',
  role: '' as QualifyLeadInput['role'],
  patientsPerMonth: '' as QualifyLeadInput['patientsPerMonth'],
  timeline: '' as QualifyLeadInput['timeline'],
  schedulingPreference: 'self',
  company: '',
};
