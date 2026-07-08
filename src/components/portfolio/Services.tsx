import ScrollReveal from '@/components/portfolio/ScrollReveal';
import { Pencil, Ruler, PenTool, Globe } from 'lucide-react';

const engineeringServices = [
  {
    icon: <Ruler className="w-8 h-8" />,
    title: 'Structural Design',
    description:
      'Residential and commercial structural systems engineered with precision. Load calculations, material specifications, and design documentation that meets code and exceeds expectations.',
    tag: 'Engineering',
  },
  {
    icon: <Pencil className="w-8 h-8" />,
    title: 'Technical Drafting',
    description:
      'AutoCAD and Civil 3D drafting that translates concepts into buildable realities. Floor plans, elevations, sections, and site plans drafted with meticulous attention to detail.',
    tag: 'Drafting',
  },
];

const artisticServices = [
  {
    icon: <PenTool className="w-8 h-8" />,
    title: 'Pencil Art Commissions',
    description:
      'Portraits, conceptual drawings, and fine art pieces rendered in graphite pencil. Each work is a meditation — built from hours of focused observation and intentional mark-making.',
    tag: 'Fine Art',
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: 'Project Consultation',
    description:
      'Whether it is a structural challenge or a creative vision, I bring both engineer and artist to the table. Consultations that consider not just what to build, but why.',
    tag: 'Consulting',
  },
];

function ServiceGroup({
  label,
  services,
  startDelay,
}: {
  label: string;
  services: typeof engineeringServices;
  startDelay: number;
}) {
  return (
    <div>
      <ScrollReveal delay={startDelay}>
        <p className="font-body text-xs tracking-[0.25em] uppercase text-primary/60 mb-6">
          {label}
        </p>
      </ScrollReveal>
      <div className="grid sm:grid-cols-2 gap-6">
        {services.map((service, i) => (
          <ScrollReveal key={service.title} delay={startDelay + 100 + i * 150}>
            <div className="group bg-background border border-border p-8 relative overflow-hidden hover:border-primary/30 transition-all duration-500 h-full pencil-corner">
              <div className="absolute top-0 right-0 w-0 h-0 group-hover:w-8 group-hover:h-8 border-t border-r border-primary/40 transition-all duration-500" />
              <div className="text-primary mb-5">{service.icon}</div>
              <span className="inline-block font-body text-xs tracking-[0.2em] uppercase text-primary/60 mb-3">
                {service.tag}
              </span>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="font-body text-sm text-muted-foreground leading-[1.8]">
                {service.description}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="section-padding bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-4">
            02 / Services
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
            What I <span className="text-primary pencil-smudge">offer</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="scale" delay={200}>
          <div className="gold-divider mb-16 origin-left" />
        </ScrollReveal>

        <ScrollReveal delay={250}>
          <p className="font-body text-base md:text-lg text-muted-foreground leading-[1.8] max-w-2xl mb-16">
            Every service I offer carries the same philosophy: I would rather take the time
            to do it right than rush and compromise. Whether I am calculating a beam or
            shading a portrait, the standard does not change.
          </p>
        </ScrollReveal>

        {/* Engineering Services */}
        <ServiceGroup label="Engineering Services" services={engineeringServices} startDelay={300} />

        {/* Visual separator */}
        <div className="flex items-center justify-center my-12">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-primary/25" />
          <div className="w-1 h-1 rounded-full bg-primary/30 mx-2" />
          <div className="w-24 h-[1px] bg-primary/25" />
          <div className="w-1 h-1 rounded-full bg-primary/30 mx-2" />
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-primary/25" />
        </div>

        {/* Artistic Services */}
        <ServiceGroup label="Artistic Services" services={artisticServices} startDelay={450} />
      </div>
    </section>
  );
}
