'use client';

import { useEffect, useRef, useState } from 'react';

function useParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const isRunning = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Respect reduced motion — show static grid, no animation
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReduced.matches) {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const gap = 40;
      ctx.strokeStyle = 'rgba(201, 168, 76, 0.06)';
      ctx.lineWidth = 0.5;
      for (let x = 0; x < w; x += gap) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y < h; y += gap) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }
      return;
    }

    const dpr = window.devicePixelRatio || 1;
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    // Use non-null references for the closure
    const cvs = canvas!;
    const c = ctx!;

    function animate() {
      if (!isRunning.current) return;
      const w = cvs.width / dpr;
      const h = cvs.height / dpr;
      c.clearRect(0, 0, w, h);
      const gap = 40;
      const cols = Math.ceil(w / gap);
      const rows = Math.ceil(h / gap);
      const maxDist = 150;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * gap;
          const y = j * gap;
          const dx = mouseRef.current.x - x;
          const dy = mouseRef.current.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / maxDist);
          const alpha = 0.06 + influence * 0.25;
          const size = 1 + influence * 1.5;
          c.beginPath();
          c.arc(x, y, size, 0, Math.PI * 2);
          c.fillStyle = `rgba(201, 168, 76, ${alpha})`;
          c.fill();
          if (i < cols - 1) {
            const ndx = mouseRef.current.x - (x + gap / 2);
            const ndy = mouseRef.current.y - y;
            const ndist = Math.sqrt(ndx * ndx + ndy * ndy);
            const nAlpha = Math.max(0, 0.03 + (1 - ndist / maxDist) * 0.1);
            c.beginPath(); c.moveTo(x, y); c.lineTo((i + 1) * gap, y);
            c.strokeStyle = `rgba(201, 168, 76, ${nAlpha})`; c.lineWidth = 0.5; c.stroke();
          }
          if (j < rows - 1) {
            const ndx = mouseRef.current.x - x;
            const ndy = mouseRef.current.y - (y + gap / 2);
            const ndist = Math.sqrt(ndx * ndx + ndy * ndy);
            const nAlpha = Math.max(0, 0.03 + (1 - ndist / maxDist) * 0.1);
            c.beginPath(); c.moveTo(x, y); c.lineTo(x, (j + 1) * gap);
            c.strokeStyle = `rgba(201, 168, 76, ${nAlpha})`; c.lineWidth = 0.5; c.stroke();
          }
        }
      }
      animRef.current = requestAnimationFrame(animate);
    }

    // IntersectionObserver: pause when hero is off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!isRunning.current) {
            isRunning.current = true;
            animRef.current = requestAnimationFrame(animate);
          }
        } else {
          isRunning.current = false;
          cancelAnimationFrame(animRef.current);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const onMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMouse, { passive: true });
    window.addEventListener('resize', resize, { passive: true });

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', resize);
      observer.disconnect();
    };
  }, []);

  return canvasRef;
}

export default function Hero() {
  const canvasRef = useParticleGrid();
  const [prefersReduced] = useState(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0a0a0a_70%)]" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Tagline — first to appear */}
        <p
          className={`font-body text-sm md:text-base tracking-[0.3em] uppercase text-primary mb-6 ${
            prefersReduced ? '' : 'hero-fade-in'
          }`}
          style={prefersReduced ? undefined : { animationDelay: '0.2s' }}
        >
          Engineer &middot; Artist &middot; Stillness
        </p>

        {/* Main heading — LAMZ ARTZ */}
        <h1
          className={`font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[0.95] ${
            prefersReduced ? '' : 'hero-fade-in'
          }`}
          style={prefersReduced ? undefined : { animationDelay: '0.5s' }}
        >
          LAMZ
          <span className="text-primary"> ARTZ</span>
        </h1>

        {/* Real name — smaller, below the artist name */}
        <p
          className={`font-body text-sm md:text-base tracking-[0.15em] text-muted-foreground/60 mt-3 mb-0 ${
            prefersReduced ? '' : 'hero-fade-in'
          }`}
          style={prefersReduced ? undefined : { animationDelay: '0.65s' }}
        >
          Bantar Prosper Lamtang
        </p>

        {/* Gold divider line — scales in from center */}
        <div
          className={`w-16 h-[1px] bg-primary mx-auto my-8 origin-center ${
            prefersReduced ? '' : 'hero-scale-in'
          }`}
          style={prefersReduced ? undefined : { animationDelay: '0.85s' }}
        />

        {/* Subheadline */}
        <p
          className={`font-body text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto ${
            prefersReduced ? '' : 'hero-fade-in'
          }`}
          style={prefersReduced ? undefined : { animationDelay: '1.05s' }}
        >
          I don&apos;t make things quickly. I make them carefully.
          <br />
          <span className="text-primary/60 italic">There is a difference.</span>
        </p>

        {/* Dual CTAs — side by side */}
        <div
          className={`mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 ${
            prefersReduced ? '' : 'hero-fade-in'
          }`}
          style={prefersReduced ? undefined : { animationDelay: '1.35s' }}
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#projects');
            }}
            className="inline-flex items-center gap-2 font-body text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors duration-300 group"
          >
            <span>View Engineering</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>

          <span className="hidden sm:block w-[1px] h-4 bg-border" />

          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              scrollTo('#projects');
            }}
            className="inline-flex items-center gap-2 font-body text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors duration-300 group"
          >
            <span>View Art Commissions</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300"
            >
              <path d="M7 17L17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}