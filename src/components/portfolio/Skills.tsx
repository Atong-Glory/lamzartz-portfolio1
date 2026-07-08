'use client';

import { useRef, useState, useEffect } from 'react';
import ScrollReveal from '@/components/portfolio/ScrollReveal';
import { Square, Wrench, PenLine, Clock } from 'lucide-react';

const skills = [
  { name: 'AutoCAD', level: 95, icon: 'design' },
  { name: 'Civil 3D', level: 88, icon: 'design' },
  { name: 'Structural Analysis', level: 90, icon: 'engineering' },
  { name: 'Architectural Design', level: 92, icon: 'design' },
  { name: 'Graphite Pencil', level: 97, icon: 'art' },
  { name: 'Portraiture', level: 94, icon: 'art' },
  { name: 'Technical Drafting', level: 96, icon: 'engineering' },
  { name: 'Project Management', level: 85, icon: 'management' },
];

function SkillIcon({ type }: { type: string }) {
  const props = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.5 } as const;
  switch (type) {
    case 'design': return <Square {...props}><path d="M3 3h18v18H3z" /><path d="M3 9h18" /><path d="M9 3v18" /></Square>;
    case 'engineering': return <Wrench {...props} />;
    case 'art': return <PenLine {...props} />;
    default: return <Clock {...props} />;
  }
}

function SkillBar({ level, delay }: { level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setActive(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className="w-full h-[2px] bg-border relative overflow-hidden skill-bar-container">
      <div
        className={`skill-bar-fill absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary/60 transition-[width] duration-[1200ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          active ? '' : '!w-0'
        }`}
        style={{ width: active ? `${level}%` : '0%' }}
      />
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-padding bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-4">
            04 / Skills
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Tools of the <span className="text-primary">craft</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="scale" delay={200}>
          <div className="gold-divider mb-16 origin-left" />
        </ScrollReveal>

        <ScrollReveal delay={250}>
          <p className="font-body text-base md:text-lg text-muted-foreground leading-[1.8] max-w-2xl mb-16">
            Skills are not acquired quickly. They are earned through repetition,
            failure, and the quiet refusal to accept &ldquo;good enough.&rdquo;
            These are the tools I have sharpened over years of deliberate practice.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
          {skills.map((skill, i) => (
            <ScrollReveal key={skill.name} delay={300 + i * 80}>
              <div className="skill-row group">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-primary/60 group-hover:text-primary transition-colors duration-300 skill-icon">
                      <SkillIcon type={skill.icon} />
                    </span>
                    <span className="font-heading text-sm font-medium text-foreground">
                      {skill.name}
                    </span>
                  </div>
                  <span className="font-body text-xs text-muted-foreground/60 tabular-nums">
                    {skill.level}%
                  </span>
                </div>
                <SkillBar level={skill.level} delay={500 + i * 100} />
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={1000}>
          <div className="mt-16 flex flex-wrap gap-3 justify-center">
            {['AutoCAD', 'Civil 3D', 'Revit', 'SketchUp', 'Graphite', 'Charcoal', 'Ink', 'Photoshop', 'Structural Calc', 'Site Analysis', 'Hand Drafting', 'Figure Drawing'].map((chip) => (
              <span
                key={chip}
                className="font-body text-xs px-4 py-2 border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300 cursor-default"
              >
                {chip}
              </span>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}