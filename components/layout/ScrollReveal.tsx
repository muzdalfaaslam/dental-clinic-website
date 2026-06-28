'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/**
 * Scroll-reveal wrapper: fade + 16px upward translate, 0.6s, ease [0.22,1,0.36,1],
 * triggered once at ~20% in view. Set `stagger` on a parent to cascade children
 * (use ScrollReveal.Item inside). Framer Motion honors prefers-reduced-motion;
 * we also hard-disable transforms here for safety (brief §4.4).
 */
const EASE = [0.22, 1, 0.36, 1] as const;

export function ScrollReveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'section' | 'li' | 'span';
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

/** Container that staggers its ScrollReveal.Item children. */
export function StaggerGroup({
  children,
  className,
  stagger = 0.08,
  as = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  as?: 'div' | 'ul';
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className,
  as = 'div',
}: {
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'li';
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }}
    >
      {children}
    </MotionTag>
  );
}
