// =====================================================================
// Site configuration — edit this file to customize all page content.
// Everything from banner copy to career timeline, masterclass modules,
// testimonials, navigation, marquee, and contact details lives here.
// =====================================================================

export type NavItem = { href: string; label: string };
export type Stat = { num: string; label: string };
export type TimelineEntry = {
  period: string;
  role: string;
  blurb: string;
  active?: boolean;
};
export type Workshop = { tag: string; title: string; bullets: string[] };
export type Testimonial = { quote: string; name: string; role: string };
export type SocialLink = { label: string; href: string; icon: "github" | "linkedin" | "twitter" };

export type SiteConfig = {
  brand: {
    name: string;
    suffix: string; // e.g. "[03]"
  };
  nav: NavItem[];
  banner: {
    eyebrow: string;
    headlineLines: string[];
    headlineAccent: string; // e.g. "."
    description: string;
    primaryCta: { label: string; href: string };
    secondaryCta: { label: string; href: string };
    stats: Stat[];
  };
  marquee: string[];
  career: {
    sectionLabel: string;
    items: TimelineEntry[];
  };
  masterclass: {
    sectionLabel: string;
    modules: Workshop[];
    ctaLabel: string;
    ctaHref: string;
  };
  testimonials: {
    sectionLabel: string;
    items: Testimonial[];
  };
  contact: {
    headlineTop: string;
    headlineBottom: string;
    email: string;
    socials: SocialLink[];
    successTitle: string;
    successMessage: string;
  };
  techStack: {
    label: string;
    logos: string[];
  };
  footer: {
    copyright: string;
    tagline: string;
  };
};

export const siteConfig: SiteConfig = {
  brand: {
    name: "HARI.KRISHNAN",
    suffix: "[03]",
  },
  nav: [
    { href: "#workshops", label: "WORKSHOPS" },
    { href: "#timeline", label: "EXPERIENCE" },
    { href: "#testimonials", label: "PRAISE" },
    { href: "#contact", label: "CONTACT" },
  ],
  banner: {
    eyebrow: "[ Hari Krishnan / Frontend JS Lead ]",
    headlineLines: ["FRONTEND", "ARCHITECT"],
    headlineAccent: ".",
    description:
      "Leading engineering teams at the intersection of scale and performance. Specializing in high-frequency Angular systems and React design patterns — and training the next generation through intensive, no-fluff workshops.",
    primaryCta: { label: "View Workshops", href: "#workshops" },
    secondaryCta: { label: "Get in touch", href: "#contact" },
    stats: [
      { num: "12+", label: "Years Industry" },
      { num: "850", label: "Devs Trained" },
      { num: "40+", label: "Workshops Delivered" },
    ],
  },
  marquee: [
    "TYPESCRIPT",
    "REACTIVE PATTERNS",
    "NX MONOREPOS",
    "PERFORMANCE AUDITS",
    "SSR & HYDRATION",
    "DESIGN SYSTEMS",
    "RXJS",
    "REACT SERVER COMPONENTS",
  ],
  career: {
    sectionLabel: "[ Career Milestones ]",
    items: [
      {
        period: "2022 — PRESENT",
        role: "Staff Frontend Engineer @ TechScale",
        blurb:
          "Leading core platform rewrite for 500k DAU. Signals-first Angular architecture across 12 squads.",
        active: true,
      },
      {
        period: "2019 — 2022",
        role: "Senior UI Lead @ CloudSync",
        blurb:
          "Architected a React + React Native design system shared across four product teams.",
      },
      {
        period: "2016 — 2019",
        role: "JavaScript Trainer @ CodeCraft",
        blurb:
          "Designed and delivered on-site Angular & React intensives for Fortune 500 engineering orgs.",
      },
      {
        period: "2013 — 2016",
        role: "Frontend Engineer @ Peak Agency",
        blurb:
          "Shipped interactive data viz and design systems for global enterprise clients.",
      },
    ],
  },
  masterclass: {
    sectionLabel: "[ Masterclass Modules ]",
    ctaLabel: "Book Curriculum",
    ctaHref: "#contact",
    modules: [
      {
        tag: "Level: Advanced",
        title: "Angular Masterclass",
        bullets: [
          "Custom RxJS operators & reactive patterns",
          "Zone-less signal architecture",
          "Enterprise schematics & monorepo scaling",
          "Performance profiling & hydration strategy",
        ],
      },
      {
        tag: "Level: Expert",
        title: "React Performance",
        bullets: [
          "Concurrent mode internals",
          "Memory leak forensics in production",
          "Server Components deep-dive",
          "Streaming SSR & cache architecture",
        ],
      },
    ],
  },
  testimonials: {
    sectionLabel: "[ Testimonials ]",
    items: [
      {
        quote:
          "Hari doesn't just teach code; he teaches systems thinking. Our entire frontend team level-up happened in just three days.",
        name: "Sarah Chen",
        role: "CTO, NEXUS LABS",
      },
      {
        quote:
          "The most intensive Angular training we've ever booked. We refactored architecture debt in real-time during the workshop.",
        name: "Marcus Thorne",
        role: "VP ENGINEERING, FINTECH FLOW",
      },
      {
        quote:
          "A rare blend of high-level architecture and hands-on coding. His React Performance module changed how my team profiles.",
        name: "Elena Rodriguez",
        role: "STAFF ENGINEER, GLOBAL LOGISTICS",
      },
      {
        quote:
          "Hari's RxJS deep-dive single-handedly unblocked our migration. Worth every cent for any team scaling Angular.",
        name: "Liam Zhao",
        role: "ENGINEERING MANAGER, DATAFLUX",
      },
    ],
  },
  contact: {
    headlineTop: "START THE",
    headlineBottom: "PROJECT",
    email: "hello@harikrishnan.dev",
    socials: [
      { label: "GitHub", href: "#", icon: "github" },
      { label: "LinkedIn", href: "#", icon: "linkedin" },
      { label: "Twitter", href: "#", icon: "twitter" },
    ],
    successTitle: "Message received",
    successMessage: "I'll get back to you shortly.",
  },
  footer: {
    copyright: "© 2026 Hari Krishnan",
    tagline: "Built with precision",
  },
};