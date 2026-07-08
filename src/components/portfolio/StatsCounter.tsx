'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * StatsCounter — animated number counters that count up when scrolled into view.
 * Placed between Skills and Experience sections.
 */
interface Stat {
  value: number;
  suffix: string;
  label: string;
}

const stats: Stat[] = [
  { value: 5, suffix: '+', label: 'Years of Experience' },
  { value: 40, suffix: '+', label: 'Art Commissions Delivered' },
  { value: 12, suffix: '+', label: 'Structural Projects Completed' },
  { value: 100, suffix: '%', label: 'Client Satisfaction' },
];

function AnimatedNumber({ value, suffix, inView }: { value: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    const duration = 2000;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span className="font-heading tabular-nums">
      {count}{suffix}
    </span>
  );
}

export default function StatsCounter() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-20 md:py-28 bg-background border-y border-border"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="text-center"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <p className="font-heading text-4xl md:text-5xl font-bold text-primary mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} inView={inView} />
              </p>
              <p className="font-body text-xs md:text-sm text-muted-foreground/70 tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}