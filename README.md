# Guhan Murugaiyan — Portfolio (ARC '26)

[![Live Site](https://img.shields.io/badge/Live%20Site-guhanmurugaiyan.vercel.app-FFE600?style=for-the-badge&logo=vercel&logoColor=black)](https://guhanmurugaiyan.vercel.app)
[![Next.js 16](https://img.shields.io/badge/Next.js-16.3-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.2-00F0FF?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

> **ARC '26 Edition** // High-performance portfolio engineered with Next.js 16, React 19, GSAP animation choreography, and Lenis smooth scrolling, presented through a tactile comic-book & manga neo-brutalist visual identity.

---

## 🎨 Visual Identity: ARC '26

The portfolio employs an **ARC '26 Comic & Manga Neo-Brutalist** aesthetic:
- **Tactile Comic Geometry**: Bold `3px solid #000000` borders on interactive panels, cards, and buttons.
- **Hard Drop Shadows**: Signature offset black shadows (`4px 4px 0px #000000`, `6px 6px 0px #000000`, and `7px 7px 0px #000000`) providing physical depth.
- **Vibrant Accent Spectrum**: High-voltage comic palette featuring:
  - **Electric Yellow (`#FFE600`)**: Primary hero accents, badges, and focal points.
  - **Cyber Cyan (`#00F0FF`)**: Technical badges and interactive states.
  - **Crimson Pink (`#FF2A55`)**: Alert states, error banners, and close triggers.
  - **Emerald Green (`#00E676`)**: Status indicators and release flags.
- **Halftone Dot Backgrounds**: Custom SVG halftone dot patterns on obsidian surfaces (`#0B0B0F` and `#13131A`).
- **Interactive Micro-Interactions**: Tactile button press translations, magnetic cursor tracking, soundwave ticker, and chapter select overlay navigation.

---

## 🚀 Featured Case Studies

The portfolio highlights 5 real-world production engineering projects:

1. **ARC 01 — CampusCart01**  
   *Web · Student Marketplace*  
   Built with Next.js, Supabase, TypeScript, and PostgreSQL. Features a relational schema and a dedicated admin-verification workflow ensuring product originality before listings publish live.  
   `[Demo: https://campus-cart01.vercel.app]`

2. **ARC 02 — PersonalTracker**  
   *Web · Productivity & Habits*  
   Engineered with Next.js, TypeScript, Tailwind, and Supabase. Tracks day-to-day productivity objectives and habit streaks with precision metrics and real-time state synchronization.  
   `[Demo: https://personaltracker-psi.vercel.app]`

3. **ARC 03 — TransferHub**  
   *Java · Banking UI & Core Service*  
   Developed in Java 21 and Spring Boot utilizing clean service architecture. Features resilient transactional accounts, sender-receiver balance verification, and receipt logging.  
   `[Demo: https://transfer-hub-neon.vercel.app]`

4. **ARC 04 — JanaFibreGlass**  
   *Web · 3D Configurator Platform*  
   A commercial business showcase and interactive 3D parametric product configurator for architectural doors, rendering dynamic dimensions, swing angles, and manufacturing specifications in real time.  
   `[Demo: https://janafibre.vercel.app]`

5. **ARC 05 — TharikaDecors**  
   *Web · Luxury Client Showcase*  
   A bespoke luxury event styling and stage decor showcase built with Next.js and Prisma, featuring curated wedding mandap collections and client consultation booking workflows.  
   `[Demo: https://tharikadecors.vercel.app]`

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | Next.js 16.3.4 (App Router) | High-speed server and client components built with Turbopack |
| **UI Library** | React 19.2.8 | Latest concurrent rendering engine and hooks |
| **Language** | TypeScript 5 | End-to-end static typing and interface contracts |
| **Styling** | Tailwind CSS v4 | Modern stylesheet engine using `@tailwindcss/postcss` |
| **Motion** | GSAP 3.15 + ScrollTrigger | Scroll-driven timeline choreography and `@gsap/react` integration |
| **Smooth Scroll** | Lenis 1.3 | Momentum-based physics scroll linked with GSAP ticker |
| **Email Dispatch**| Resend | Serverless email transmission for contact form dispatches |
| **Validation** | React Hook Form + Zod | Strict schema validation, sanitization, and honeypot spam protection |
| **Typography** | Google Fonts | Anton, Syne, Plus Jakarta Sans, and JetBrains Mono |
| **Analytics** | Vercel Analytics & Speed Insights | Real-time Web Vitals and performance monitoring |

---

## ⚡ Getting Started

### 1. Prerequisites
- Node.js 20.x or higher
- npm 10.x or higher

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/ErrGuhan/Guhan_Murugaiyan.git
cd Guhan_Murugaiyan
npm install
```

### 3. Environment Configuration
Create a `.env.local` file modeled after `.env.example`:
```bash
cp .env.example .env.local
```
Configure your keys:
```env
# Resend API Key for contact form email dispatch
RESEND_API_KEY=re_your_api_key_here

# Public site domain URL
NEXT_PUBLIC_SITE_URL=https://guhanmurugaiyan.vercel.app
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Verification & Production Build

Run static analysis and build the production bundle:

```bash
# Static typecheck
npx tsc --noEmit

# Next.js production compilation with Turbopack
npm run build

# Start production server locally
npm start
```

---

## 📄 License & Credits

Designed and engineered by **Guhan Murugaiyan** © 2026. All rights reserved.
