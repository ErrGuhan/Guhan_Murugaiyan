export interface Project {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  tags: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  year: string;
  accent: string;
}

export const PROJECTS: Project[] = [
  {
    id: "creative-portfolio",
    num: "01",
    title: "Creative Portfolio",
    subtitle: "I DESIGN VISUALS THAT FEEL ALIVE",
    category: "Creative Development / Motion",
    description: "An ultra-minimalist editorial portfolio engineered with cinematic scroll timelines, custom cursor physics, and micro-interactions designed to leave an unforgettable impression.",
    tags: ["Next.js", "GSAP", "Lenis", "TypeScript", "Tailwind"],
    image: "/images/project-portfolio.jpg",
    liveUrl: "https://github.com/ErrGuhan/Guhan_Murugaiyan",
    githubUrl: "https://github.com/ErrGuhan/Guhan_Murugaiyan",
    year: "2026",
    accent: "#D4AF37"
  },
  {
    id: "summer-essentials",
    num: "02",
    title: "Summer Essentials",
    subtitle: "MODERN COMMERCE FOR CONTEMPORARY BRANDS",
    category: "E-Commerce / Experience",
    description: "A luxury lifestyle e-commerce experience featuring fluid page transitions, instant filtering, dynamic product stages, and seamless checkout architecture.",
    tags: ["React", "Next.js", "Tailwind CSS", "Motion", "Stripe"],
    image: "/images/project-ecommerce.jpg",
    liveUrl: "https://github.com/ErrGuhan",
    githubUrl: "https://github.com/ErrGuhan",
    year: "2026",
    accent: "#E2C391"
  },
  {
    id: "gazu-clothing",
    num: "03",
    title: "GAZU Clothing",
    subtitle: "FASHION THAT MOVES WITH YOU",
    category: "High Fashion / Lookbook",
    description: "An avant-garde fashion lookbook and digital storefront featuring editorial split-screen typography, magnetic galleries, and tactile hover states.",
    tags: ["Next.js", "GSAP ScrollTrigger", "Lenis", "Tailwind CSS"],
    image: "/images/project-gazu.jpg",
    liveUrl: "https://github.com/ErrGuhan",
    githubUrl: "https://github.com/ErrGuhan",
    year: "2025",
    accent: "#D4AF37"
  },
  {
    id: "luxury-timepieces",
    num: "04",
    title: "Luxury Timepieces",
    subtitle: "TIME REDEFINED — PRECISION ENGINEERING",
    category: "3D Product Showcase",
    description: "A precision horology digital experience highlighting Swiss craftsmanship, micro-mechanical details, and dark luxury aesthetic.",
    tags: ["TypeScript", "WebGL", "GSAP", "Tailwind CSS"],
    image: "/images/project-watches.jpg",
    liveUrl: "https://github.com/ErrGuhan",
    githubUrl: "https://github.com/ErrGuhan",
    year: "2025",
    accent: "#D9A05B"
  },
  {
    id: "premium-audio",
    num: "05",
    title: "Premium Headphones",
    subtitle: "CRAFTED FOR FOCUS. DESIGNED FOR LIFE.",
    category: "Industrial Design / Audio",
    description: "Immersive product landing page for acoustic audio hardware, blending tactile interactive controls with studio-grade sound fidelity.",
    tags: ["Next.js", "Motion", "Tailwind CSS", "Web Audio"],
    image: "/images/project-audio.jpg",
    liveUrl: "https://github.com/ErrGuhan",
    githubUrl: "https://github.com/ErrGuhan",
    year: "2025",
    accent: "#C5A880"
  },
  {
    id: "agentic-ai",
    num: "06",
    title: "Agentic AI Platform",
    subtitle: "INTELLIGENT AUTONOMOUS WORKFLOWS",
    category: "AI & Full Stack Systems",
    description: "Enterprise orchestration platform coordinating autonomous multi-agent reasoning, streaming interfaces, and distributed task pipelines.",
    tags: ["Next.js", "React 19", "Gemini API", "TypeScript", "Tailwind"],
    image: "/images/project-ai.jpg",
    liveUrl: "https://github.com/ErrGuhan",
    githubUrl: "https://github.com/ErrGuhan",
    year: "2026",
    accent: "#E5C07B"
  }
];

export interface ExpertiseItem {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  highlight: string;
}

export const EXPERTISE_ITEMS: ExpertiseItem[] = [
  {
    id: "creative-dev",
    num: "01",
    title: "Creative Development",
    subtitle: "Front-end engineering pushed to its artistic limit",
    description: "Building fast, responsive, and scalable interfaces with modern frontend technologies. Crafting bespoke web experiences where code serves art.",
    skills: ["Next.js", "React 19", "TypeScript", "Modern Web APIs", "Performance Tuning"],
    highlight: "Pixel-perfect execution"
  },
  {
    id: "motion-interaction",
    num: "02",
    title: "Motion & Interaction",
    subtitle: "Turning static web layouts into living, responsive environments",
    description: "Creating tactile, organic web experiences through meaningful motion design, custom physics cursors, and cinematic scroll sequences.",
    skills: ["GSAP", "ScrollTrigger", "Lenis Smooth Scroll", "Motion", "SVG Animation"],
    highlight: "60fps buttery animations"
  },
  {
    id: "ui-ux-design",
    num: "03",
    title: "UI / UX Design",
    subtitle: "Minimalism rooted in typography, hierarchy, and spatial balance",
    description: "Designing modern digital products with strong hierarchy, usability, and a distinctive luxury editorial aesthetic that commands attention.",
    skills: ["Design Systems", "Editorial Layouts", "Wireframing", "Responsive UI", "Figma"],
    highlight: "High-fashion typography"
  },
  {
    id: "modern-web-apps",
    num: "04",
    title: "Modern Web Apps",
    subtitle: "Enterprise-grade architecture with real-time responsiveness",
    description: "Developing complex applications with modular component-based architecture, dynamic state synchronization, and robust validation.",
    skills: ["Next.js App Router", "Server Components", "Zod", "React Hook Form", "Tailwind v4"],
    highlight: "Rock-solid reliability"
  }
];
