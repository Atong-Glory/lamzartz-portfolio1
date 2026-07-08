import ScrollReveal from '@/components/portfolio/ScrollReveal';

const timeline = [
  {
    year: '2024 — Present',
    role: 'Freelance Structural Designer & Pencil Artist',
    company: 'LAMZ ARTZ — Independent Practice',
    category: 'Art + Engineering',
    description:
      'Operating at the intersection of engineering and fine art. Delivering structural design, technical drafting, and pencil art commissions for clients who value precision and intentionality over speed. Every project receives the same standard of care — regardless of scale.',
    highlights: [
      'Designed residential structures for 12+ clients across Cameroon, including a 3-storey apartment building in Douala',
      'Delivered 30+ pencil portraits for private collectors, with commissions averaging 40-80 hours of focused work',
      'Reduced structural revision requests by 40% through meticulous upfront load path analysis and code compliance documentation',
    ],
  },
  {
    year: '2022 — 2024',
    role: 'Structural Design Engineer',
    company: 'High School',
    category: 'Engineering',
    description:
      'Designed and drafted structural systems for residential and commercial projects across Cameroon. Managed project timelines, client communications, and technical documentation. Earned recognition for meticulous attention to reinforcement detailing and load path analysis.',
    highlights: [],
  },
  {
    year: '2017 — 2019',
    role: 'Science Studies',
    company: 'College Education',
    category: 'Sciences-S1',
    description:
      'Developed amongst other the skill of Strategic Problem Solving, Critical thinking...',
    highlights: [],
  },
  {
    year: '2011 — 2016',
    role: 'Civil Engineering Studies',
    company: 'Secondary Education',
    category: 'Engineering',
    description:
      'Built the technical foundation that underpins every calculation and drawing.',
    highlights: [],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-padding bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-4">
            05 / Experience
          </p>
        </ScrollReveal>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-4">
          <ScrollReveal delay={100}>
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground">
              The <span className="text-primary">journey</span>
            </h2>
          </ScrollReveal>
        </div>

        <ScrollReveal variant="scale" delay={250}>
          <div className="gold-divider-wide mb-16 origin-left" />
        </ScrollReveal>

        <div className="relative">
          <div className="hidden md:block absolute left-[120px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/40 via-primary/20 to-transparent" />
          <div className="space-y-12 md:space-y-16">
            {timeline.map((item, i) => (
              <ScrollReveal key={item.year} delay={300 + i * 150}>
                <div className="relative flex flex-col md:flex-row gap-4 md:gap-8">
                  <div className="md:w-[120px] shrink-0 md:text-right">
                    <span className="font-body text-sm text-primary/70 tracking-wide">
                      {item.year}
                    </span>
                  </div>
                  <div className="hidden md:flex absolute left-[116px] top-2 w-[9px] h-[9px] rounded-full bg-primary/60 border-2 border-background" />
                  <div className="flex-1 bg-card border border-border p-6 hover:border-primary/20 transition-all duration-500">
                    {/* Category badge */}
                    <span className="inline-block font-body text-[10px] tracking-[0.25em] uppercase text-primary/60 mb-3">
                      {item.category}
                    </span>
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {item.role}
                    </h3>
                    <p className="font-body text-sm text-primary/60 mb-3">
                      {item.company}
                    </p>
                    <p className="font-body text-sm text-muted-foreground leading-[1.8]">
                      {item.description}
                    </p>

                    {/* Mini case study highlights */}
                    {item.highlights.length > 0 && (
                      <ul className="mt-5 space-y-2.5 border-t border-border/50 pt-5">
                        {item.highlights.map((highlight, hi) => (
                          <li key={hi} className="flex items-start gap-3">
                            <span className="mt-2 w-1 h-1 rounded-full bg-primary/50 shrink-0" />
                            <span className="font-body text-sm text-muted-foreground leading-[1.7]">
                              {highlight}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
