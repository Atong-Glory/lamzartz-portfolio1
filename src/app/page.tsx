import PortfolioShell from '@/components/portfolio/PortfolioShell';
import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import Services from '@/components/portfolio/Services';
import BlueprintToPortrait from '@/components/portfolio/BlueprintToPortrait';
import Process from '@/components/portfolio/Process';
import Projects from '@/components/portfolio/Projects';
import Skills from '@/components/portfolio/Skills';
import StatsCounter from '@/components/portfolio/StatsCounter';
import Testimonials from '@/components/portfolio/Testimonials';
import Experience from '@/components/portfolio/Experience';
import Contact from '@/components/portfolio/Contact';

export default function Home() {
  return (
    <PortfolioShell>
      <Hero />

      {/* Diversified transition: wide gradient line */}
      <div className="gold-divider-wide" />

      <About />

      {/* Transition: asymmetric accent */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <Services />

      {/* Blueprint to Portrait interactive section */}
      <BlueprintToPortrait />

      {/* Transition: gold dot + line */}
      <div className="flex items-center justify-center gap-3 py-1">
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-primary/30" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
        <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-primary/30" />
      </div>

      <Process />

      <Projects />

      {/* Transition: wide gradient line */}
      <div className="gold-divider-wide" />

      <Skills />

      {/* Stats counter — creative addition between Skills and Experience */}
      <StatsCounter />

      <Testimonials />

      <Experience />

      {/* Transition: gold dot + line */}
      <div className="flex items-center justify-center gap-3 py-1">
        <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-primary/30" />
        <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
        <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-primary/30" />
      </div>

      <Contact />
    </PortfolioShell>
  );
}
