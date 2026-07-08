'use client';

import { useRef, useState, useCallback } from 'react';
import ScrollReveal from '@/components/portfolio/ScrollReveal';

interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  filterCategory: 'engineering' | 'art';
  color: string;
  image: string;
}

const projects: Project[] = [
  { id: 'lady-in-stillness', title: 'Lady in Stillness', subtitle: 'Presence Captured', category: 'Portraiture', filterCategory: 'art', color: '#c9a84c', image: '/images/upload-06.jpg' },
  { id: 'grace', title: 'Grace', subtitle: 'A Study in Light', category: 'Portraiture', filterCategory: 'art', color: '#a8a8a0', image: '/images/upload-02.jpg' },
  { id: 'the-making', title: 'The Making of a Portrait', subtitle: 'Process Revealed', category: 'Fine Art', filterCategory: 'art', color: '#c9a84c', image: '/images/upload-03.jpg' },
  { id: 'steady-gaze', title: 'A Steady Gaze', subtitle: 'Character in Pencil', category: 'Portraiture', filterCategory: 'art', color: '#a8a8a0', image: '/images/upload-04.jpg' },
  { id: 'woman-in-light', title: 'Woman in Light', subtitle: 'Shadows and Truth', category: 'Portraiture', filterCategory: 'art', color: '#c9a84c', image: '/images/upload-05.jpg' },
  { id: 'coming-soon', title: 'Engineering Works', subtitle: 'Structural design coming soon', category: 'Engineering', filterCategory: 'engineering', color: '#a8a8a0', image: '' },
];

type FilterCategory = 'all' | 'engineering' | 'art';

const filterOptions: { label: string; value: FilterCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'Engineering', value: 'engineering' },
  { label: 'Art', value: 'art' },
];

function ProjectVisual({ color, title, image }: { color: string; title: string; image: string }) {
  return (
    <div className="absolute inset-0 bg-card overflow-hidden">
      {image ? (
        <>
          {/* Real project image */}
          <img
            src={image}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-90"
          />
          {/* Subtle vignette overlay to blend with dark theme */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-60" />
          {/* Blueprint grid overlay for art identity */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`grid-${title.replace(/\s/g, '')}`} width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke={color} strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${title.replace(/\s/g, '')})`} />
          </svg>
        </>
      ) : (
        <>
          {/* Placeholder for engineering — blueprint aesthetic */}
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id={`grid-${title.replace(/\s/g, '')}`} width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke={color} strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill={`url(#grid-${title.replace(/\s/g, '')})`} />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 border opacity-20 rotate-45" style={{ borderColor: color }} />
            <div className="absolute w-8 h-8 border opacity-40 rotate-12" style={{ borderColor: color }} />
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="font-body text-[10px] tracking-[0.2em] uppercase opacity-40">
              Coming Soon
            </p>
          </div>
        </>
      )}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isComingSoon = project.id === 'coming-soon';
  const ref = useRef<HTMLDivElement>(null);
  const isLarge = index === 0 || index === 3;

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      // Future: navigate to project detail
    }
  }, []);

  return (
    <article
      ref={ref}
      tabIndex={0}
      role="button"
      aria-label={`View project: ${project.title}`}
      onKeyDown={handleKeyDown}
      className={`project-card ${isComingSoon ? 'opacity-40' : 'pencil-corner group cursor-pointer'} ${isComingSoon ? '' : 'hover:border-primary/20 hover:shadow-[0_0_30px_rgba(201,168,76,0.06)]'} relative overflow-hidden bg-card border border-border transition-all duration-500 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 ${
        isLarge ? 'sm:col-span-2 lg:col-span-1' : ''
      }`}
      style={{ aspectRatio: isLarge ? '4/5' : '3/4' }}
    >
      <ProjectVisual color={project.color} title={project.title} image={project.image} />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <span className="font-body text-[10px] tracking-[0.2em] uppercase text-primary/70 mb-2 block">
          {project.category}
        </span>
        <h3 className={`font-heading text-lg font-semibold mb-1 transition-colors duration-300 ${
          isComingSoon ? 'text-muted-foreground/50' : 'text-foreground group-hover:text-primary'
        }`}>
          {project.title}
        </h3>
        <p className="font-body text-sm text-muted-foreground/70">
          {project.subtitle}
        </p>
      </div>
      <div className={`absolute top-4 right-4 z-10 transition-opacity duration-300 ${isComingSoon ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'}`}>
        <div className="w-8 h-8 flex items-center justify-center border border-primary/30 text-primary">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.filterCategory === activeFilter);

  return (
    <section id="projects" className="section-padding bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-4">
            03 / Projects
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Selected <span className="text-primary pencil-smudge">works</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="scale" delay={200}>
          <div className="gold-divider mb-16 origin-left" />
        </ScrollReveal>

        <ScrollReveal delay={250}>
          <p className="font-body text-base md:text-lg text-muted-foreground leading-[1.8] max-w-2xl mb-12">
            Each piece below represents weeks — sometimes months — of intentional work.
            There are no shortcuts here. Hover long enough, and you might feel the patience
            that built it.
          </p>
        </ScrollReveal>

        {/* Category filter buttons */}
        <ScrollReveal delay={300}>
          <div className="flex items-center gap-8 mb-12" role="tablist" aria-label="Filter projects by category">
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                role="tab"
                aria-selected={activeFilter === opt.value}
                onClick={() => setActiveFilter(opt.value)}
                className={`font-body text-sm tracking-wide pb-1 border-b-2 transition-all duration-300 outline-none focus-visible:text-primary ${
                  activeFilter === opt.value
                    ? 'text-primary border-primary'
                    : 'text-muted-foreground/60 border-transparent hover:text-muted-foreground hover:border-border'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Empty state when no projects match the filter */}
        {filteredProjects.length === 0 && (
          <p className="text-center font-body text-sm text-muted-foreground/50 py-16">
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}