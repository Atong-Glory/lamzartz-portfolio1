import ScrollReveal from '@/components/portfolio/ScrollReveal';

export default function About() {
  return (
    <section id="about" className="section-padding bg-background">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <p className="font-body text-sm tracking-[0.3em] uppercase text-primary mb-4">
            01 / About
          </p>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Photo placeholder */}
          <ScrollReveal variant="left" delay={200}>
            <div className="relative">
              <div className="aspect-[3/4] bg-card border border-primary/20 relative overflow-hidden group">
                <img
                  src="/images/upload-01.jpg"
                  alt="Bantar Prosper Lamtang — LAMZ ARTZ"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Subtle gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
                <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-primary/40" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary/40" />
              </div>
              <div className="absolute -bottom-3 -right-3 w-full h-full border border-primary/10 -z-10" />
            </div>
          </ScrollReveal>

          {/* Bio */}
          <ScrollReveal variant="right" delay={300}>
            <div className="space-y-6">
              <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground leading-tight">
                I am Bantar Prosper Lamtang.
                <br />
                <span className="text-primary">Two disciplines. One obsession.</span>
              </h2>

              <div className="gold-divider" />

              <p className="font-body text-base md:text-lg text-muted-foreground leading-[1.8]">
                By day, I engineer structures — calculating loads, drafting in AutoCAD,
                designing systems that hold weight and weather storms. By night, I draw
                with pencil — studying light, texture, and the quiet geometry of a human
                face. Both require the same thing: <span className="text-foreground">complete presence</span>.
              </p>

              <p className="font-body text-base md:text-lg text-muted-foreground leading-[1.8]">
                You can&apos;t rush a line or a calculation. Both demand stillness,
                patience, and the humility to start over when something isn&apos;t right.
                That&apos;s not a limitation — it&apos;s the discipline that makes the work
                worth trusting.
              </p>

              <blockquote className="border-l-2 border-primary/40 pl-6 py-2">
                <p className="font-heading text-lg md:text-xl text-foreground italic leading-relaxed">
                  &ldquo;Stillness is not the absence of motion. It is the presence of
                  intention.&rdquo;
                </p>
              </blockquote>

              <div className="space-y-4">
                <h3 className="font-heading text-lg font-semibold text-primary tracking-wide">
                  Why I Draw
                </h3>
                <p className="font-body text-base md:text-lg text-muted-foreground leading-[1.8]">
                  I draw because stillness is rare. In a world that rewards speed, sitting
                  with a face for hours — studying the geometry of a brow, the weight of a
                  gaze — is an act of resistance. Every portrait I create is not just a
                  likeness; it is proof that attention is a form of love. I believe the best
                  engineering, like the best art, begins with the willingness to see what
                  others overlook.
                </p>
              </div>

              <p className="font-body text-base text-muted-foreground/70 leading-[1.8]">
                This portfolio is not a showcase of speed. It is a record of care.
                Every line, every calculation, every stroke exists because I chose
                to be fully present when I made it.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}