# Guhan Murugaiyan — Creative Developer & Agent Architect Portfolio

A premium, world-class creative developer portfolio website engineered with **Next.js 16 (App Router)**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **GSAP & ScrollTrigger**, and **Lenis Smooth Scroll**, meticulously crafted to match the aesthetic, interaction quality, and motion choreography of `reference_video.mp4`.

---

## ✨ Features & Architecture

- **Cinematic Preloader**:
  - Circular SVG progress ring tracking 0% to 100%.
  - Elegant gold cursive *"hello"* signature script reveal.
  - Dual curtain vertical split reveal unveiling the off-white editorial canvas.
- **Editorial Typography & Visual System**:
  - Google Fonts pairing: **Syne** (bold brutalist headlines), **Cinzel** (editorial serif), **Plus Jakarta Sans** (high-legibility body), **JetBrains Mono** (technical labels), and **Italianno** (cursive script).
  - Minimalist cream/off-white (`#F5F2EB`) to rich obsidian (`#0A0A0A`) canvas transitions.
  - Warm gold luxury accents (`#D4AF37`, `#FFDF73`).
- **Hero Section**:
  - Oversized typography with interactive liquid wave distortion on hover.
  - Interactive magnetic buttons with physics-based cursor attraction.
  - Continuously spinning rotating badge: *"LET'S WORK TOGETHER"*.
  - Floating scroll indicator prompt.
- **About Me Section**:
  - Architectural rounded portrait frame with developer portrait (`profile.jpg`).
  - Editorial manifesto: *"I BUILD DIGITAL WORLDS WHERE DESIGN MEETS CODE."*
  - Interactive six-point metrics grid (Origin, Role, Focus, Experience, Mindset, Projects).
- **Interactive Capabilities & Toolkit**:
  - Interactive domain accordion (Creative Development, Motion & Interaction, UI/UX Design, Modern Web Apps).
  - Floating tech stack pills (React 19, Next.js 16, GSAP, Lenis, TypeScript, Tailwind v4).
- **Featured Projects Showcase**:
  - Pinned horizontal scroll section with background parallax typography.
  - 6 rich case study cards with high-definition imagery, tags, live links, and GitHub sources.
- **Contact & Footer**:
  - Form validation with **React Hook Form** + **Zod** schema.
  - Direct contact cards (Email with one-click copy, LinkedIn, Location).
  - Footer with live IST digital clock ticker and smooth back-to-top trigger.
- **Performance & Accessibility**:
  - Lenis smooth momentum scrolling synchronized directly with the GSAP ticker.
  - `useGSAP` hooks for automatic memory cleanup and trigger disposal.
  - Full support for `prefers-reduced-motion: reduce`.
  - Zero hydration errors, zero TypeScript errors, clean production builds with Turbopack.

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Next.js 16.3.4 (App Router & Turbopack) |
| **UI Library** | React 19.2.8 |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4.3.3 (`@tailwindcss/postcss`) |
| **Scroll Engine** | Lenis (`lenis`) |
| **Animation** | GSAP 3.15.0, ScrollTrigger, `@gsap/react`, `motion` |
| **Form Management**| `react-hook-form`, `zod`, `@hookform/resolvers` |
| **Icons & Utilities** | `lucide-react`, `clsx`, `tailwind-merge`, `class-variance-authority` |

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Linting
```bash
# Type check
npx tsc --noEmit

# Linting
npm run lint

# Production compilation
npm run build

# Start production server
npm start
```

---

## ⚡ Vercel Deployment

This project is fully optimized for Vercel edge infrastructure:
- **Zero-Config Deployment**: Connect this repository to [Vercel](https://vercel.com/new) and it will automatically detect Next.js 16 with Turbopack.
- **Core Web Vitals & Analytics**: Pre-configured with `@vercel/analytics` and `@vercel/speed-insights`.
- **Edge Asset Caching & Optimization**: Configured in `next.config.ts` with AVIF/WebP image formats and security headers.
- **SEO & Social Cards**: Automated prerendered `robots.txt`, `sitemap.xml`, dynamic OpenGraph cards (`/opengraph-image`), and web manifest.

Deploy via CLI:
```bash
npx vercel
```
Or for production deployment:
```bash
npx vercel --prod
```

