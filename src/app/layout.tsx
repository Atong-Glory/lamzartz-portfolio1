import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Bantar Prosper Lamtang",
  alternateName: "LAMZ ARTZ",
  url: "https://lamzartz.com",
  jobTitle: "Structural Designer & Pencil Artist",
  description:
    "The portfolio of Lamz Artz — where engineering precision meets pencil art patience. Structural design, drafting, and fine art commissions crafted with discipline and intentionality.",
  knowsAbout: [
    "Structural Engineering",
    "AutoCAD",
    "Civil 3D",
    "Pencil Art",
    "Portraiture",
    "Architectural Design",
    "Technical Drafting",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "CM",
    addressLocality: "Cameroon",
  },
  sameAs: [
    "https://instagram.com/lamzartz",
    "https://linkedin.com/in/lamzartz",
    "https://behance.net/lamzartz",
  ],
  email: "mailto:atongglory17@gmail.com",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://lamzartz.com'),
  title: "Bantar Prosper Lamtang — LAMZ ARTZ | Structural Designer & Pencil Artist",
  description:
    "The portfolio of Lamz Artz — where engineering precision meets pencil art patience. Structural design, drafting, and fine art commissions crafted with discipline and intentionality.",
  keywords: [
    "Bantar Prosper Lamtang",
    "LAMZ ARTZ",
    "structural design",
    "AutoCAD",
    "pencil art",
    "civil engineering",
    "fine art commissions",
    "architectural design",
    "Cameroon",
  ],
  icons: {
    icon: '/favicon.svg',
    apple: '/icon.svg',
  },
  openGraph: {
    title: "Bantar Prosper Lamtang — LAMZ ARTZ | Structural Designer & Pencil Artist",
    description: "I don't make things quickly. I make them carefully. Where engineering precision meets pencil art patience.",
    type: "website",
    locale: "en_US",
    siteName: "LAMZ ARTZ",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "LAMZ ARTZ — Structural Designer & Pencil Artist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bantar Prosper Lamtang — LAMZ ARTZ",
    description: "I don't make things quickly. I make them carefully.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preload critical fonts */}
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        {/* Skip to content — accessibility first */}
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
