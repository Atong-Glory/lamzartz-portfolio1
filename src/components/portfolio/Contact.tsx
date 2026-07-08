'use client';

import { useState, useRef, useCallback } from 'react';
import ScrollReveal from '@/components/portfolio/ScrollReveal';
import { Instagram, Linkedin, Globe } from 'lucide-react';

type Purpose = 'engineering' | 'art' | 'job' | '';

const purposeOptions: { value: Purpose; label: string }[] = [
  { value: 'engineering', label: 'Engineering Inquiry' },
  { value: 'art', label: 'Art Commission' },
  { value: 'job', label: 'Job Opportunity' },
];

const submitButtonLabels: Record<Purpose, string> = {
  engineering: 'Inquire About Engineering',
  art: 'Request a Commission',
  job: 'Submit Application',
  '': 'Send Message',
};

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [purpose, setPurpose] = useState<Purpose>('');

  const validate = useCallback((name: string, email: string, message: string): FieldErrors => {
    const errors: FieldErrors = {};
    if (name.trim().length < 2) errors.name = 'Name must be at least 2 characters.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address.';
    if (message.trim().length < 10) errors.message = 'Message must be at least 10 characters.';
    return errors;
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setFieldErrors({});

    const form = e.currentTarget;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    // Client-side validation
    const errors = validate(name, email, message);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          purpose: purpose || undefined,
          // Honeypot field — bots fill this, humans don't see it
          website: (form.elements.namedItem('website') as HTMLInputElement)?.value || '',
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Something went wrong. Please try again.');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }, [validate, purpose]);

  return (
    <section id="contact" ref={ref} className="section-padding bg-card">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-4">
            06 / Contact
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
            Let&apos;s <span className="text-primary">talk</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal variant="scale" delay={200}>
          <div className="gold-divider mb-16 origin-left" />
        </ScrollReveal>

        <ScrollReveal delay={250}>
          <p className="font-body text-base md:text-lg text-muted-foreground leading-[1.8] max-w-2xl mb-16">
            If your project requires care, patience, and someone who will not cut corners
            to save time — we might work well together. Reach out. I respond to every
            message with the same attention I bring to my work.
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Contact Form */}
          <ScrollReveal variant="left" delay={300}>
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 bg-background border border-primary/20">
                <div className="w-12 h-12 mb-6 rounded-full border border-primary/40 flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <p className="font-heading text-xl text-foreground mb-2">
                  Message received.
                </p>
                <p className="font-body text-sm text-muted-foreground">
                  I will respond with the care you deserve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {error && (
                  <div className="bg-destructive/10 border border-destructive/30 px-4 py-3 font-body text-sm text-destructive" role="alert">
                    {error}
                  </div>
                )}
                {/* Honeypot — hidden from humans, visible to bots */}
                <div className="absolute -left-[9999px]" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

                {/* Purpose selection */}
                <div>
                  <label className="block font-body text-xs tracking-[0.15em] uppercase text-muted-foreground/60 mb-3">
                    Purpose
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {purposeOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => setPurpose(option.value)}
                        className={`px-4 py-2 font-body text-xs tracking-wide border transition-all duration-300 ${
                          purpose === option.value
                            ? 'border-primary/40 text-primary bg-primary/5'
                            : 'border-border text-muted-foreground hover:text-primary hover:border-primary/20'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="name" className="block font-body text-xs tracking-[0.15em] uppercase text-muted-foreground/60 mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    aria-invalid={!!fieldErrors.name}
                    aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                    className={`w-full bg-background border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none transition-colors duration-300 ${
                      fieldErrors.name ? 'border-destructive/50 focus:border-destructive' : 'border-border focus:border-primary/40'
                    }`}
                  />
                  {fieldErrors.name && (
                    <p id="name-error" className="mt-1 font-body text-xs text-destructive" role="alert">{fieldErrors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block font-body text-xs tracking-[0.15em] uppercase text-muted-foreground/60 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="your@email.com"
                    aria-invalid={!!fieldErrors.email}
                    aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                    className={`w-full bg-background border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none transition-colors duration-300 ${
                      fieldErrors.email ? 'border-destructive/50 focus:border-destructive' : 'border-border focus:border-primary/40'
                    }`}
                  />
                  {fieldErrors.email && (
                    <p id="email-error" className="mt-1 font-body text-xs text-destructive" role="alert">{fieldErrors.email}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="message" className="block font-body text-xs tracking-[0.15em] uppercase text-muted-foreground/60 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell me about your project, your vision, or what brought you here..."
                    aria-invalid={!!fieldErrors.message}
                    aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                    className={`w-full bg-background border px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground/30 focus:outline-none transition-colors duration-300 resize-none ${
                      fieldErrors.message ? 'border-destructive/50 focus:border-destructive' : 'border-border focus:border-primary/40'
                    }`}
                  />
                  {fieldErrors.message && (
                    <p id="message-error" className="mt-1 font-body text-xs text-destructive" role="alert">{fieldErrors.message}</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-primary text-primary-foreground font-heading text-sm font-semibold tracking-[0.15em] uppercase hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-card transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Sending...' : submitButtonLabels[purpose]}
                </button>
              </form>
            )}
          </ScrollReveal>

          {/* Contact Info */}
          <ScrollReveal variant="right" delay={400}>
            <div className="space-y-10">
              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                  Connect
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-[1.8] mb-6">
                  The best work begins with a conversation. Whether you need a structure
                  designed, a drawing commissioned, or simply want to discuss what patience
                  can produce — I am here.
                </p>
                <div className="space-y-4">
                  <a
                    href="mailto:atongglory17@gmail.com"
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    <span className="font-body text-sm">atongglory17@gmail.com</span>
                  </a>
                  <div className="flex items-center gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c9a84c" strokeWidth="1.5">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="font-body text-sm text-muted-foreground">Based in Cameroon</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                  Follow the Process
                </h3>
                <div className="flex gap-4">
                  <a href="https://instagram.com/lamzartz" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300" aria-label="Instagram">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="https://linkedin.com/in/bantar-prosper-lamtang" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300" aria-label="LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://behance.net/lamzartz" target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-all duration-300" aria-label="Behance">
                    <Globe className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Availability badge */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                </span>
                <span className="font-body text-sm text-primary/80">
                  Currently open to commissions &amp; freelance work
                </span>
              </div>

              <p className="font-body text-xs text-muted-foreground/50">
                Typically responds within 24 hours
              </p>

              <blockquote className="border-l-2 border-primary/40 pl-6 py-2">
                <p className="font-heading text-base md:text-lg text-foreground italic leading-relaxed">
                  &ldquo;The work speaks for those willing to listen.
                  The rest will scroll past — and that is fine.&rdquo;
                </p>
              </blockquote>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
