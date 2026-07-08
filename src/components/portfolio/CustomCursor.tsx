'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * CustomCursor — gold dot + ring that follows the mouse on desktop.
 * Hidden on touch devices via CSS media query (pointer: fine).
 * Cancels RAF loop after 3 seconds of no mouse movement; resumes on next move.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only run on devices with fine pointer (mouse/trackpad)
    const mq = window.matchMedia('(pointer: fine)');
    if (!mq.matches) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReduced.matches) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId: number | null = null;
    let idleTimer: ReturnType<typeof setTimeout>;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Show cursor on first move
      if (!visible) setVisible(true);

      // Reset idle timer — cancel RAF after 3s of no movement
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        // Hide cursors and cancel the RAF loop entirely
        if (dotRef.current) dotRef.current.style.opacity = '0';
        if (ringRef.current) ringRef.current.style.opacity = '0';
        if (rafId !== null) {
          cancelAnimationFrame(rafId);
          rafId = null;
        }
      }, 3000);

      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.opacity = '1';
        dotRef.current.style.transform = `translate(${mouseX - 3}px, ${mouseY - 3}px)`;
      }

      // Ring should be visible again and RAF should resume
      if (rafId === null) {
        // Snap ring to mouse position so it doesn't teleport from stale position
        ringX = mouseX;
        ringY = mouseY;
        if (ringRef.current) {
          ringRef.current.style.opacity = '1';
          ringRef.current.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
        }
        rafId = requestAnimationFrame(animateRing);
      }
    };

    // Ring follows with smooth lag
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      }
      rafId = requestAnimationFrame(animateRing);
    };

    // Detect hoverable elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]')
      ) {
        setHovering(true);
      }
    };
    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setHovering(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      if (rafId !== null) cancelAnimationFrame(rafId);
      clearTimeout(idleTimer);
    };
  }, [visible]);

  // Don't render anything on touch devices or reduced-motion
  const mq = typeof window !== 'undefined' ? window.matchMedia('(pointer: fine)') : null;
  const prefersReduced = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  if (mq && !mq.matches) return null;
  if (prefersReduced && prefersReduced.matches) return null;

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={ringRef} className={`custom-cursor-ring ${hovering ? 'hovering' : ''}`} />
    </>
  );
}