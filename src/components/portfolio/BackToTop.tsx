'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * BackToTop — appears after scrolling 600px, smooth-scrolls to hero.
 * Only renders on client; respects prefers-reduced-motion.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) return;

    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    document.querySelector('#hero')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-[90] w-12 h-12 border border-primary/30 bg-background/80 backdrop-blur-sm flex items-center justify-center text-primary hover:bg-primary hover:text-background transition-all duration-300 group"
      aria-label="Back to top"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="group-hover:-translate-y-0.5 transition-transform duration-300"
      >
        <path d="M12 19V5" />
        <path d="m5 12 7-7 7 7" />
      </svg>
    </button>
  );
}
