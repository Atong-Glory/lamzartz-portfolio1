'use client';

import PortfolioLoader from '@/components/portfolio/PortfolioLoader';
import Navigation from '@/components/portfolio/Navigation';
import Footer from '@/components/portfolio/Footer';
import ScrollProgress from '@/components/portfolio/ScrollProgress';
import CustomCursor from '@/components/portfolio/CustomCursor';
import BackToTop from '@/components/portfolio/BackToTop';

export default function PortfolioShell({ children }: { children: React.ReactNode }) {
  return (
    <PortfolioLoader>
      <div className="grain-overlay min-h-screen flex flex-col bg-background">
        <ScrollProgress />
        <CustomCursor />
        <Navigation />

        <main id="main-content" className="flex-1">
          {children}
        </main>

        <Footer />
        <BackToTop />
      </div>
    </PortfolioLoader>
  );
}
