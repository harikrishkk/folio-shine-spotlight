import * as React from "react";

/* ============================================================
 * Tech Logos — monochrome inline SVGs for the brutalist theme.
 * Each logo is ~28×28 viewBox, single-path where possible,
 * styled with currentColor so parent can control fill/stroke.
 * ============================================================ */

export const TECH_LOGOS: Record<string, React.JSX.Element> = {
  Angular: (
    <svg viewBox="0 0 32 32" fill="none" className="size-7" aria-label="Angular">
      <path d="M16 2L2 7l3 15 11 8 11-8 3-15L16 2z" fill="currentColor" opacity="0.12" />
      <path d="M16 2L2 7l3 15 11 8 11-8 3-15L16 2z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 6v13M12 24l4-5 4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 12h12" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  React: (
    <svg viewBox="0 0 32 32" fill="none" className="size-7" aria-label="React">
      <ellipse cx="16" cy="16" rx="12" ry="5" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="16" cy="16" rx="12" ry="5" stroke="currentColor" strokeWidth="1.5" transform="rotate(60 16 16)" />
      <ellipse cx="16" cy="16" rx="12" ry="5" stroke="currentColor" strokeWidth="1.5" transform="rotate(120 16 16)" />
      <circle cx="16" cy="16" r="2.5" fill="currentColor" />
    </svg>
  ),
  Vue: (
    <svg viewBox="0 0 32 32" fill="none" className="size-7" aria-label="Vue">
      <path d="M16 4L4 26h6l6-11 6 11h6L16 4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 12l-3 6h6l-3-6z" fill="currentColor" opacity="0.25" />
    </svg>
  ),
  Node: (
    <svg viewBox="0 0 32 32" fill="none" className="size-7" aria-label="Node.js">
      <path d="M16 2l12 7v14l-12 7-12-7V9l12-7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M16 7v18" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 18l-6-3.5v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 18l6-3.5v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  Supabase: (
    <svg viewBox="0 0 32 32" fill="none" className="size-7" aria-label="Supabase">
      <path d="M16 2c0 8-6 14-14 14h14v14c0-8 6-14 14-14H16V2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <circle cx="16" cy="16" r="3" fill="currentColor" opacity="0.25" />
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 32 32" fill="none" className="size-7" aria-label="TypeScript">
      <rect x="4" y="4" width="24" height="24" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 18h4M13 18v5M18 16.5c1.5 0 2.5 1 2.5 2.5v1c0 1.5-1 2.5-2.5 2.5s-2.5-1-2.5-2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  Claude: (
    <svg viewBox="0 0 32 32" fill="none" className="size-7" aria-label="Claude">
      <rect x="6" y="6" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 20c2-4 4-8 10-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M13 22c2-4 6-6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  ),
  Copilot: (
    <svg viewBox="0 0 32 32" fill="none" className="size-7" aria-label="Copilot">
      <circle cx="16" cy="11" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 26c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="11" r="1.5" fill="currentColor" opacity="0.25" />
    </svg>
  ),
  Nx: (
    <svg viewBox="0 0 32 32" fill="none" className="size-7" aria-label="Nx">
      <path d="M6 6l10 20L26 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 26l10-10 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
    </svg>
  ),
  RxJS: (
    <svg viewBox="0 0 32 32" fill="none" className="size-7" aria-label="RxJS">
      <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M16 6v6M22.5 10.5l-4.5 3M26 16h-6M22.5 21.5l-4.5-3M16 26v-6M9.5 21.5l4.5-3M6 16h6M9.5 10.5l4.5 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="16" cy="16" r="2.5" fill="currentColor" />
    </svg>
  ),
};

export type TechName = keyof typeof TECH_LOGOS;
