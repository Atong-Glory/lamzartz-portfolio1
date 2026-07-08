# LAMZ ARTZ — Portfolio

The personal portfolio of **Bantar Prosper Lamtang**, a structural designer and pencil artist based in Cameroon. Where engineering precision meets pencil art patience.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Server Components)
- **Language**: TypeScript (strict mode)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with CSS custom property design tokens
- **Animations**: CSS keyframes + IntersectionObserver (zero runtime animation libraries)
- **Contact**: [Resend](https://resend.com/) email delivery
- **Deployment**: Vercel / any Node.js host

## Features

- Canvas particle grid hero with mouse-responsive interaction
- "Blueprint to Portrait" scroll-driven canvas animation
- Project category filtering (Engineering / Art)
- Dual-identity narrative: engineering + fine art
- Custom cursor with idle-pause optimization
- Full accessibility: skip-to-content, focus trap, ARIA, prefers-reduced-motion
- Security headers via proxy: CSP, HSTS, X-Frame-Options, Referrer-Policy
- JSON-LD structured data for SEO
- Rate-limited contact form with honeypot bot protection

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A [Resend](https://resend.com) API key (free tier: 3,000 emails/month)

### Install & Run

```bash
git clone https://github.com/lamzartz/lamzartz-portfolio.git
cd lamzartz-portfolio
npm install
```

### Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Description | Required |
|---|---|---|
| `RESEND_API_KEY` | Resend API key for contact form | Yes |
| `CONTACT_EMAIL` | Email address to receive messages | Yes |

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── api/contact/    # Rate-limited email contact form
│   ├── layout.tsx      # Root layout + JSON-LD + metadata
│   ├── page.tsx        # Server component (section composition)
│   ├── sitemap.ts      # Auto-generated sitemap
│   └── globals.css     # Design tokens + animations
├── components/portfolio/
│   ├── Hero.tsx              # Canvas particle grid + entrance
│   ├── BlueprintToPortrait.tsx  # Scroll-driven morph animation
│   ├── Navigation.tsx        # Scroll spy + mobile focus trap
│   ├── Projects.tsx          # Category filter + grid
│   ├── Contact.tsx           # Purpose selector + validation
│   ├── Services.tsx          # Engineering vs Art clusters
│   ├── Process.tsx           # Dual workflow timelines
│   ├── Experience.tsx        # Timeline with case studies
│   ├── About.tsx             # Bio + "Why I Draw"
│   ├── Skills.tsx            # Animated progress bars
│   ├── Testimonials.tsx      # Horizontal scroll + grid
│   ├── CustomCursor.tsx      # Idle-pausing gold cursor
│   ├── ScrollReveal.tsx      # IO + CSS class toggle
│   ├── ScrollProgress.tsx    # Reading progress bar
│   ├── PortfolioLoader.tsx   # Pre-hydration skeleton
│   ├── PortfolioShell.tsx    # Client boundary component
│   ├── StatsCounter.tsx      # Animated number counters
│   ├── BackToTop.tsx         # Scroll-to-top button
│   └── Footer.tsx            # Minimal footer
├── lib/
│   └── utils.ts              # cn() utility
└── proxy.ts                  # Security headers
```

## Design System

All colors use CSS custom properties — change one token, the entire site updates:

| Token | Value | Usage |
|---|---|---|
| `--background` | `#0a0a0a` | Page background |
| `--foreground` | `#f5f5f0` | Primary text |
| `--primary` | `#c9a84c` | Gold accent |
| `--card` | `#111111` | Card backgrounds |
| `--muted-foreground` | `#a8a8a0` | Secondary text |
| `--border` | `#2a2a2a` | Subtle borders |

## License

All rights reserved. This portfolio and its content belong to Bantar Prosper Lamtang.

---

Built with patience. Designed with intention.
