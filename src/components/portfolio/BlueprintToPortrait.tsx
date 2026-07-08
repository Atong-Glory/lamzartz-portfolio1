'use client';

import { useEffect, useRef, useState } from 'react';
import ScrollReveal from '@/components/portfolio/ScrollReveal';

/**
 * BlueprintToPortrait — Interactive section where an engineering blueprint
 * progressively morphs into a pencil portrait as the user scrolls.
 * This is the "Bold Move" feature that bridges both identities.
 *
 * Canvas-based: a blueprint grid crossfades into pencil shading strokes.
 * No images required — generated procedurally.
 */

export default function BlueprintToPortrait() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [progress, setProgress] = useState(0);
  const isRunning = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const c = ctx;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReduced.matches) return;

    const dpr = window.devicePixelRatio || 1;
    const w = 600;
    const h = 400;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Face outline path (normalized 0-1 coordinates)
    const face = [
      // Oval head outline
      { type: 'ellipse', cx: 0.5, cy: 0.42, rx: 0.2, ry: 0.28 },
      // Left eye
      { type: 'line', x1: 0.42, y1: 0.36, x2: 0.48, y2: 0.36 },
      // Right eye
      { type: 'line', x1: 0.52, y1: 0.36, x2: 0.58, y2: 0.36 },
      // Nose
      { type: 'line', x1: 0.5, y1: 0.38, x2: 0.49, y2: 0.46 },
      // Left nostril
      { type: 'arc', cx: 0.48, cy: 0.47, r: 0.015 },
      // Right nostril
      { type: 'arc', cx: 0.52, cy: 0.47, r: 0.015 },
      // Mouth
      { type: 'curve', x1: 0.45, y1: 0.52, cx: 0.5, cy: 0.54, x2: 0.55, y2: 0.52 },
      // Left brow
      { type: 'curve', x1: 0.40, y1: 0.32, cx: 0.44, cy: 0.30, x2: 0.49, y2: 0.33 },
      // Right brow
      { type: 'curve', x1: 0.51, y1: 0.33, cx: 0.56, cy: 0.30, x2: 0.60, y2: 0.32 },
      // Left jawline
      { type: 'curve', x1: 0.30, y1: 0.42, cx: 0.30, cy: 0.55, x2: 0.45, y2: 0.62 },
      // Right jawline
      { type: 'curve', x1: 0.55, y1: 0.62, cx: 0.70, cy: 0.55, x2: 0.70, y2: 0.42 },
      // Chin
      { type: 'curve', x1: 0.45, y1: 0.62, cx: 0.5, cy: 0.66, x2: 0.55, y2: 0.62 },
      // Neck left
      { type: 'line', x1: 0.42, y1: 0.65, x2: 0.40, y2: 0.80 },
      // Neck right
      { type: 'line', x1: 0.58, y1: 0.65, x2: 0.60, y2: 0.80 },
      // Left shoulder
      { type: 'curve', x1: 0.40, y1: 0.80, cx: 0.35, cy: 0.85, x2: 0.28, y2: 0.88 },
      // Right shoulder
      { type: 'curve', x1: 0.60, y1: 0.80, cx: 0.65, cy: 0.85, x2: 0.72, y2: 0.88 },
      // Hair left
      { type: 'curve', x1: 0.30, y1: 0.42, cx: 0.28, cy: 0.32, x2: 0.35, y2: 0.22 },
      // Hair top
      { type: 'curve', x1: 0.35, y1: 0.22, cx: 0.5, cy: 0.18, x2: 0.65, y2: 0.22 },
      // Hair right
      { type: 'curve', x1: 0.65, y1: 0.22, cx: 0.72, cy: 0.32, x2: 0.70, y2: 0.42 },
    ];

    function drawBlueprint(p: number) {
      c.clearRect(0, 0, w, h);

      // Background
      c.fillStyle = '#0a0a0a';
      c.fillRect(0, 0, w, h);

      // Blueprint grid (fades out as p increases)
      const gridAlpha = 0.12 * (1 - p);
      if (gridAlpha > 0.01) {
        c.strokeStyle = `rgba(201, 168, 76, ${gridAlpha})`;
        c.lineWidth = 0.3;
        const gridSize = 20;
        for (let x = 0; x < w; x += gridSize) {
          c.beginPath();
          c.moveTo(x, 0);
          c.lineTo(x, h);
          c.stroke();
        }
        for (let y = 0; y < h; y += gridSize) {
          c.beginPath();
          c.moveTo(0, y);
          c.lineTo(w, y);
          c.stroke();
        }
      }

      // Blueprint dimension lines (fade out)
      const dimAlpha = 0.2 * (1 - p);
      if (dimAlpha > 0.01) {
        c.strokeStyle = `rgba(201, 168, 76, ${dimAlpha})`;
        c.lineWidth = 0.5;
        c.setLineDash([4, 4]);
        // Horizontal dims
        [0.2, 0.42, 0.62, 0.8].forEach((yPos) => {
          c.beginPath();
          c.moveTo(w * 0.1, h * yPos);
          c.lineTo(w * 0.9, h * yPos);
          c.stroke();
        });
        // Vertical dims
        [0.2, 0.5, 0.8].forEach((xPos) => {
          c.beginPath();
          c.moveTo(w * xPos, h * 0.1);
          c.lineTo(w * xPos, h * 0.9);
          c.stroke();
        });
        c.setLineDash([]);
      }

      // Draw the face/portrait
      const strokeAlpha = 0.3 + p * 0.6;
      const strokeColor = p < 0.5
        ? `rgba(201, 168, 76, ${strokeAlpha})`
        : `rgba(245, 245, 240, ${strokeAlpha})`;
      const strokeWidth = 0.8 + p * 1.2;

      // Add pencil texture noise at higher progress
      c.lineWidth = strokeWidth;
      c.strokeStyle = strokeColor;
      c.lineCap = 'round';

      face.forEach((element) => {
        c.beginPath();
        if (element.type === 'ellipse') {
          const { cx, cy, rx, ry } = element as { cx: number; cy: number; rx: number; ry: number };
          c.ellipse(cx * w, cy * h, rx * w, ry * h, 0, 0, Math.PI * 2);
          c.stroke();
        } else if (element.type === 'line') {
          const { x1, y1, x2, y2 } = element as { x1: number; y1: number; x2: number; y2: number };
          c.moveTo(x1 * w, y1 * h);
          c.lineTo(x2 * w, y2 * h);
          c.stroke();
        } else if (element.type === 'arc') {
          const { cx, cy, r } = element as { cx: number; cy: number; r: number };
          c.arc(cx * w, cy * h, r * w, 0, Math.PI * 2);
          c.stroke();
        } else if (element.type === 'curve') {
          const { x1, y1, cx: cpx, cy: cpy, x2, y2 } = element as { x1: number; y1: number; cx: number; cy: number; x2: number; y2: number };
          c.moveTo(x1 * w, y1 * h);
          c.quadraticCurveTo(cpx * w, cpy * h, x2 * w, y2 * h);
          c.stroke();
        }
      });

      // Pencil shading strokes (appear as p increases)
      if (p > 0.3) {
        const shadeAlpha = (p - 0.3) / 0.7 * 0.08;
        c.strokeStyle = `rgba(200, 195, 185, ${shadeAlpha})`;
        c.lineWidth = 0.5;
        // Hatching under the eyes, along the jaw, and around the hair
        const hatchAreas = [
          { x: 0.38, y: 0.38, w: 0.24, h: 0.04, angle: -0.1 },  // under eyes
          { x: 0.35, y: 0.50, w: 0.30, h: 0.06, angle: 0.05 },   // cheek area
          { x: 0.38, y: 0.55, w: 0.24, h: 0.08, angle: 0 },      // jaw shading
          { x: 0.32, y: 0.20, w: 0.36, h: 0.12, angle: -0.15 },   // forehead
          { x: 0.36, y: 0.28, w: 0.28, h: 0.08, angle: 0.1 },     // brow ridge
        ];
        hatchAreas.forEach((area) => {
          const step = 3;
          for (let i = 0; i < area.h * h / step; i++) {
            const y0 = (area.y + (i * step) / h) * h;
            const x0 = area.x * w;
            const x1 = (area.x + area.w) * w;
            c.beginPath();
            c.moveTo(x0, y0);
            c.lineTo(x1, y0 + Math.sin(area.angle) * area.h * h * 0.3);
            c.stroke();
          }
        });
      }

      // Blueprint annotations (fade out)
      const annotAlpha = 0.25 * (1 - p);
      if (annotAlpha > 0.01) {
        c.fillStyle = `rgba(201, 168, 76, ${annotAlpha})`;
        c.font = '9px monospace';
        c.fillText('SECTION A-A', w * 0.08, h * 0.18);
        c.fillText('SCALE 1:4', w * 0.78, h * 0.18);
        c.fillText('STRUCT-001', w * 0.08, h * 0.92);
        c.fillText('REV.03', w * 0.78, h * 0.92);
      }
    }

    function animate() {
      if (!isRunning.current) return;
      drawBlueprint(progress);
      animRef.current = requestAnimationFrame(animate);
    }

    // IntersectionObserver: only render when visible
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
    observer.observe(section);

    return () => {
      cancelAnimationFrame(animRef.current);
      observer.disconnect();
    };
  }, [progress]);

  // Track scroll progress through the section
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowH = window.innerHeight;
      // Progress from 0 to 1 as section scrolls through viewport
      const p = Math.max(0, Math.min(1,
        (windowH - rect.top) / (windowH + rect.height)
      ));
      setProgress(p);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="blueprint-to-portrait"
      ref={sectionRef}
      className="py-24 md:py-32 bg-card border-y border-border overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary/60 mb-4 text-center">
            Intersection
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground text-center mb-4">
            Where <span className="text-primary">Structure</span> Meets <span className="text-primary">Soul</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="scale" delay={200}>
          <div className="gold-divider-wide mb-12 origin-center" />
        </ScrollReveal>

        <ScrollReveal delay={250}>
          <p className="font-body text-base text-muted-foreground leading-[1.8] max-w-2xl mx-auto text-center mb-16">
            Scroll to watch engineering precision transform into artistic expression.
            The same discipline that holds a building upright also brings a portrait to life.
          </p>
        </ScrollReveal>

        {/* Canvas container */}
        <div className="flex justify-center mb-12">
          <div className="relative bg-background border border-border p-2">
            <canvas
              ref={canvasRef}
              className="block"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </div>
        </div>

        {/* Progress indicator */}
        <div className="max-w-md mx-auto">
          <div className="flex justify-between mb-2">
            <span className="font-body text-xs tracking-wide text-primary/60">Blueprint</span>
            <span className="font-body text-xs tracking-wide text-muted-foreground/40">{Math.round(progress * 100)}%</span>
            <span className="font-body text-xs tracking-wide text-primary/60">Portrait</span>
          </div>
          <div className="w-full h-[2px] bg-border relative overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-foreground/80 transition-all duration-150"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
