export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-8 mt-auto">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <p className="font-heading text-sm text-muted-foreground/50 tracking-wider">
            LAMZ<span className="text-primary/40">.</span>ARTZ
          </p>
          <span className="text-muted-foreground/20 hidden sm:inline">|</span>
          <p className="font-body text-xs text-muted-foreground/40 hidden sm:block">
            Bantar Prosper Lamtang
          </p>
        </div>
        <p className="font-body text-xs text-muted-foreground/30 tracking-wide">
          Built with patience. Designed with intention.
        </p>
        <p className="font-body text-xs text-muted-foreground/30">
          &copy; {new Date().getFullYear()} Bantar Prosper Lamtang
        </p>
      </div>
    </footer>
  );
}
