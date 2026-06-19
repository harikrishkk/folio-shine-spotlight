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
  blurb: string | string[];
  tech: string[];
  active?: boolean;
};
export type Workshop = {
  tag: string;
  title: string;
  courseId?: string;
};
export type Testimonial = { quote: string; name: string; role: string; href?: string };
export type SocialLink = { label: string; href: string; icon: "github" | "linkedin" };

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

import siteData from "./site.json";

// All editable content lives in src/config/site.json. Edit that file to
// update the homepage, workshops, experience, testimonials, and contact.
export const siteConfig: SiteConfig = siteData as SiteConfig;