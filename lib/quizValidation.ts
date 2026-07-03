import { z } from 'zod';
import { asTuple, roleEnum, patientsEnum, timelineEnum, frustrationValues } from './validation';

/**
 * Lightweight schema for the fast /quiz funnel — same qualifier enums as the
 * long form (lib/validation.ts), but only name + email for contact instead of
 * the full field set (no phone/clinicName/website/consent). Client AND server
 * validated, same as the long form.
 */
export const quizLeadSchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name.').max(80, 'That name is a little too long.'),
  email: z
    .string()
    .trim()
    .min(1, 'Please enter your email.')
    .max(254, 'That email is a little too long.')
    .email('Please enter a valid email address.'),
  role: roleEnum,
  patientsPerMonth: patientsEnum,
  frustration: z.array(z.enum(asTuple(frustrationValues))).min(1, 'Please pick at least one.'),
  timeline: timelineEnum,
  company: z.string().max(0).optional().default(''), // honeypot
  renderedAt: z.number().optional(),
});

export type QuizLeadInput = z.input<typeof quizLeadSchema>;
export type QuizLeadData = z.output<typeof quizLeadSchema>;

export const quizLeadDefaults: QuizLeadInput = {
  fullName: '',
  email: '',
  role: '' as QuizLeadInput['role'],
  patientsPerMonth: '' as QuizLeadInput['patientsPerMonth'],
  frustration: [],
  timeline: '' as QuizLeadInput['timeline'],
  company: '',
};
