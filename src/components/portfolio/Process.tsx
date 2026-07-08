import ScrollReveal from '@/components/portfolio/ScrollReveal';

const engineeringSteps = [
  {
    number: '01',
    title: 'Consultation',
    description: 'Understanding structural requirements, site conditions, and project scope',
  },
  {
    number: '02',
    title: 'Analysis',
    description: 'Load calculations, material specifications, and code compliance review',
  },
  {
    number: '03',
    title: 'Design',
    description: 'Structural systems, reinforcement detailing, and connection design',
  },
  {
    number: '04',
    title: 'Drafting',
    description: 'AutoCAD and Civil 3D construction documentation',
  },
  {
    number: '05',
    title: 'Review',
    description: 'Quality assurance, peer review, and final delivery',
  },
];

const artSteps = [
  {
    number: '01',
    title: 'Conversation',
    description: 'Understanding your vision, the subject\'s story, and emotional goals',
  },
  {
    number: '02',
    title: 'Reference',
    description: 'Photograph study, composition planning, and proportional mapping',
  },
  {
    number: '03',
    title: 'Layering',
    description: 'Building depth through progressive graphite shading and tonal values',
  },
  {
    number: '04',
    title: 'Detailing',
    description: 'Refining textures, highlights, and the subtle geometry of expression',
  },
  {
    number: '05',
    title: 'Delivery',
    description: 'Final review, high-resolution scanning, and careful packaging',
  },
];

function ProcessColumn({
  label,
  steps,
  variant,
}: {
  label: string;
  steps: typeof engineeringSteps;
  variant: 'left' | 'right';
}) {
  return (
    <div>
      <ScrollReveal variant={variant}>
        <p className="font-body text-xs tracking-[0.25em] uppercase text-primary/70 mb-10">
          {label}
        </p>
      </ScrollReveal>

      <div className="relative">
        {/* Vertical gold line */}
        <div className="absolute left-[15px] top-6 bottom-6 w-[1px] bg-gradient-to-b from-primary/40 via-primary/20 to-primary/40" />

        <div className="space-y-10">
          {steps.map((step, i) => (
            <ScrollReveal key={step.title} delay={200 + i * 100} variant={variant}>
              <div className="relative flex gap-6">
                {/* Gold number circle */}
                <div className="relative z-10 flex-shrink-0 w-[31px] h-[31px] rounded-full border border-primary/40 bg-card flex items-center justify-center">
                  <span className="font-heading text-xs text-primary font-semibold">
                    {step.number}
                  </span>
                </div>

                <div className="pt-[3px]">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-1.5">
                    {step.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-[1.8]">
                    {step.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Process() {
  return (
    <section id="process" className="section-padding bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-4">
            Process
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
            The <span className="text-primary">Process</span>
          </h2>
          <p className="font-body text-base text-muted-foreground/70 mb-2">
            How I work
          </p>
        </ScrollReveal>

        <ScrollReveal variant="scale" delay={200}>
          <div className="gold-divider mb-16 origin-left" />
        </ScrollReveal>

        <ScrollReveal delay={250}>
          <p className="font-body text-base md:text-lg text-muted-foreground leading-[1.8] max-w-2xl mb-16">
            Whether I am engineering a structure or rendering a portrait, the discipline is the same.
            Every project follows a deliberate progression — from understanding to delivery.
            No step is skipped. No detail is rushed.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <ProcessColumn label="Engineering Process" steps={engineeringSteps} variant="left" />
          <ProcessColumn label="Art Process" steps={artSteps} variant="right" />
        </div>
      </div>
    </section>
  );
}
