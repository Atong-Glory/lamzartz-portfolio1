'use client';

import { useRef, useState, useEffect } from 'react';
import ScrollReveal from '@/components/portfolio/ScrollReveal';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote:
      'Bantar delivered structural drawings that were among the most meticulous our firm has reviewed. His attention to reinforcement detailing saved us from a costly revision during construction. The young man understands that precision is not optional in our field.',
    name: 'Chief Eng. Nkoulou M.',
    role: 'Project Director, Douala',
    category: 'Engineering',
  },
  {
    quote:
      'The portrait he drew of me for my birthday is the most meaningful piece of art in our home. Every visitor asks about it. You can feel the hours of quiet attention in every pencil stroke. It is not just a drawing — it is a presence.',
    name: 'Achille Fotso',
    role: 'Private Collector, Yaoundé',
    category: 'Art',
  },
  {
    quote:
      'What sets Bantar apart is his patience. He does not rush calculations. He explained every structural decision to me in language I could understand, and the result was a building that has weathered two rainy seasons without a single crack.',
    name: 'Mme. Ngassa T.',
    role: 'Property Developer, Buea',
    category: 'Engineering',
  },
  {
    quote:
      'I commissioned a portrait for my office, and what arrived was not what I expected — it was more. Bantar captured something I did not think a pencil could capture: the weight of years spent in study. I have since commissioned two more.',
    name: 'Rev. Dr. Emmanuel Tabi',
    role: 'Academic, University of Buea',
    category: 'Art',
  },
];

export default function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="testimonials" className="section-padding bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Testimonials
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Words from Those Who <span className="text-primary">Trusted the Process</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="scale" delay={200}>
          <div className="gold-divider mb-16 origin-left" />
        </ScrollReveal>

        {/* Mobile: horizontal scroll with controls */}
        <div className="md:hidden relative">
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4 -mx-2 px-2"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {testimonials.map((testimonial, i) => (
              <div
                key={testimonial.name}
                className="snap-start flex-shrink-0 w-[85vw] max-w-[340px] bg-card border border-border p-6"
              >
                <ScrollReveal delay={200 + i * 100}>
                  <span className="inline-block font-body text-xs tracking-[0.2em] uppercase text-primary/50 mb-4">
                    {testimonial.category}
                  </span>
                  <blockquote className="font-body text-sm text-muted-foreground italic leading-[1.8] mb-6">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div>
                    <p className="font-heading text-sm font-semibold text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="font-body text-xs text-primary/60 mt-0.5">
                      {testimonial.role}
                    </p>
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>

          {/* Scroll controls */}
          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={() => scroll('left')}
              disabled={!canScrollLeft}
              className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={!canScrollRight}
              className="w-10 h-10 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Desktop: 2x2 grid */}
        <div className="hidden md:grid grid-cols-2 gap-6">
          {testimonials.map((testimonial, i) => (
            <ScrollReveal key={testimonial.name} delay={200 + i * 120} variant={i % 2 === 0 ? 'left' : 'right'}>
              <div className="bg-card border border-border p-8 h-full hover:border-primary/20 transition-all duration-500">
                <span className="inline-block font-body text-xs tracking-[0.2em] uppercase text-primary/50 mb-5">
                  {testimonial.category}
                </span>
                <blockquote className="font-body text-sm text-muted-foreground italic leading-[1.8] mb-8">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-auto">
                  <p className="font-heading text-base font-semibold text-foreground">
                    {testimonial.name}
                  </p>
                  <p className="font-body text-sm text-primary/60 mt-1">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
