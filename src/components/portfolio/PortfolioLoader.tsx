'use client';

import { useEffect, useState } from 'react';

export default function PortfolioLoader({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Dismiss loader once content is ready
    const timer = setTimeout(() => setLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={`portfolio-loader ${loaded ? 'loaded' : ''}`}>
        <h1>LAMZ<span style={{ color: '#c9a84c' }}>.</span>ARTZ</h1>
        <div className="loader-line" />
      </div>
      <div style={{ visibility: loaded ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </>
  );
}
