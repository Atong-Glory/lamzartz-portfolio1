'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * ScrollReveal — lightweight IntersectionObserver wrapper.
 * Replaces Framer Motion useInView for most sections,
 * keeping them as server-renderable HTML with progressive enhancement.
 */
interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'up' | 'left' | 'right' | 'scale';
  delay?: number;
  as?: React.ElementType;
}

export default function ScrollReveal({
  children,
  className = '',
  variant = 'up',
  delay = 0,
  as: Tag = 'div',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setRevealed(true), delay);
          observer.unobserve(el);
        }
      },
      { rootMargin: '-80px 0px', threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  const variantClass =
    variant === 'left'
      ? 'reveal-left'
      : variant === 'right'
        ? 'reveal-right'
        : variant === 'scale'
          ? 'reveal-scale'
          : 'reveal';

  return (
    <Tag
      ref={ref}
      className={`${variantClass} ${revealed ? 'revealed' : ''} ${className}`}
    >
      {children}
    </Tag>
  );
}
