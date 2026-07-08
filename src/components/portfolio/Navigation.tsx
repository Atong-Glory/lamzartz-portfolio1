'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const mobileNavRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Scroll state for backdrop
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll spy — track which section is currently visible
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace('#', ''));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Close mobile menu on Escape and trap focus
  useEffect(() => {
    if (!mobileOpen) return;

    // Focus the close button when menu opens
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        return;
      }

      // Focus trap
      if (e.key === 'Tab') {
        const nav = mobileNavRef.current;
        if (!nav) return;
        const focusable = nav.querySelectorAll<HTMLElement>(
          'a[href], button, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    // Prevent body scroll when menu is open
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleClick = useCallback((href: string) => {
    setMobileOpen(false);
    document.body.style.overflow = '';
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-primary/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); handleClick('#hero'); }}
          className="font-heading text-xl font-semibold tracking-wider text-foreground hover:text-primary transition-colors duration-300"
        >
          LAMZ<span className="text-primary">.</span>ARTZ
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navItems.map((item) => {
            const id = item.href.replace('#', '');
            const isActive = activeSection === id;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleClick(item.href); }}
                className={`font-body text-sm tracking-wide transition-colors duration-300 relative group ${
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-primary'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
                <span className={`absolute -bottom-1 left-0 h-[1px] bg-primary transition-all duration-300 ${
                  isActive ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </a>
            );
          })}
        </nav>

        {/* Mobile toggle */}
        <button
          ref={closeButtonRef}
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          <span className={`block w-6 h-[1px] bg-foreground transition-all duration-300 origin-center ${
            mobileOpen ? 'rotate-45 translate-y-[3.5px]' : ''
          }`} />
          <span className={`block w-6 h-[1px] bg-foreground transition-all duration-300 ${
            mobileOpen ? 'opacity-0 scale-0' : ''
          }`} />
          <span className={`block w-6 h-[1px] bg-foreground transition-all duration-300 origin-center ${
            mobileOpen ? '-rotate-45 -translate-y-[3.5px]' : ''
          }`} />
        </button>
      </div>

      {/* Mobile Menu — focus trapped */}
      <div
        ref={mobileNavRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`md:hidden fixed inset-0 top-0 bg-background/95 backdrop-blur-md transition-all duration-300 ${
          mobileOpen
            ? 'opacity-100 pointer-events-auto translate-x-0'
            : 'opacity-0 pointer-events-none translate-x-full'
        }`}
        style={{ paddingTop: '80px' }}
      >
        <nav className="flex flex-col px-6 gap-1" aria-label="Mobile navigation">
          {navItems.map((item, i) => {
            const id = item.href.replace('#', '');
            const isActive = activeSection === id;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleClick(item.href); }}
                className={`font-heading text-2xl font-medium py-3 border-b border-border/50 transition-all duration-300 ${
                  isActive
                    ? 'text-primary pl-4'
                    : 'text-muted-foreground hover:text-primary hover:pl-2'
                }`}
                style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms' }}
                tabIndex={mobileOpen ? 0 : -1}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
