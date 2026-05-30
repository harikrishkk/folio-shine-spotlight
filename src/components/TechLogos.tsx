import * as React from "react";

/* ============================================================
 * Tech Logos — solid filled inline SVGs for the brutalist theme.
 * Each logo is ~32×32 viewBox, styled with currentColor.
 * No outlines — bold, solid silhouettes.
 * ============================================================ */

export const TECH_LOGOS: Record<string, React.JSX.Element> = {
  Angular: (
    <svg viewBox="0 0 32 32" fill="none" className="size-9" aria-label="Angular">
      <path d="M16 2L2 7l3 15 11 8 11-8 3-15L16 2z" fill="currentColor" opacity="0.15" />
      <path d="M16 4L5 8l2.5 12.5L16 26l8.5-5.5L27 8 16 4z" fill="currentColor" />
      <path d="M16 10v8l-3.5-6h-1.5l5 9 5-9h-1.5L16 18v-8z" fill="var(--background)" />
    </svg>
  ),
  React: (
    <svg viewBox="0 0 32 32" fill="none" className="size-9" aria-label="React">
      <ellipse cx="16" cy="16" rx="13" ry="5.5" fill="currentColor" opacity="0.15" />
      <ellipse cx="16" cy="16" rx="13" ry="5.5" fill="currentColor" opacity="0.15" transform="rotate(60 16 16)" />
      <ellipse cx="16" cy="16" rx="13" ry="5.5" fill="currentColor" opacity="0.15" transform="rotate(120 16 16)" />
      <ellipse cx="16" cy="16" rx="12" ry="5" stroke="currentColor" strokeWidth="0" fill="currentColor" opacity="0.4" />
      <ellipse cx="16" cy="16" rx="12" ry="5" stroke="currentColor" strokeWidth="0" fill="currentColor" opacity="0.4" transform="rotate(60 16 16)" />
      <ellipse cx="16" cy="16" rx="12" ry="5" stroke="currentColor" strokeWidth="0" fill="currentColor" opacity="0.4" transform="rotate(120 16 16)" />
      <circle cx="16" cy="16" r="3" fill="currentColor" />
    </svg>
  ),
  Vue: (
    <svg viewBox="0 0 32 32" fill="none" className="size-9" aria-label="Vue">
      <path d="M16 4L4 26h6l6-11 6 11h6L16 4z" fill="currentColor" opacity="0.2" />
      <path d="M16 8L8 24h3l5-9 5 9h3L16 8z" fill="currentColor" />
    </svg>
  ),
  Node: (
    <svg viewBox="0 0 32 32" fill="none" className="size-9" aria-label="Node.js">
      <path d="M16 2l12 7v14l-12 7-12-7V9l12-7z" fill="currentColor" opacity="0.15" />
      <path d="M16 5l-9 5.3v9.4L16 25l9-5.3v-9.4L16 5z" fill="currentColor" />
      <path d="M16 9v8l-5-3v6l5 3 5-3v-6l-5 3V9z" fill="var(--background)" opacity="0.9" />
    </svg>
  ),
  Supabase: (
    <svg viewBox="0 0 32 32" fill="none" className="size-9" aria-label="Supabase">
      <path d="M16 2c0 8-6 14-14 14h14v14c0-8 6-14 14-14H16V2z" fill="currentColor" />
      <path d="M16 6c0 6-4 10-10 10h10v10c0-6 4-10 10-10H16V6z" fill="var(--background)" opacity="0.25" />
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 32 32" fill="none" className="size-9" aria-label="TypeScript">
      <rect x="3" y="3" width="26" height="26" rx="3" fill="currentColor" />
      <path d="M11 17h5v2h-5v-2zm2-3v8" stroke="var(--background)" strokeWidth="2" strokeLinecap="round" />
      <path d="M17 20.5c1 0 2-.5 2-1.5v-.5c0-1-1-1.5-2-1.5s-2 .5-2 1.5" stroke="var(--background)" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M19 17v4c0 1-1 1.5-2 1.5" stroke="var(--background)" strokeWidth="2" strokeLinecap="round" fill="none" />
    </svg>
  ),
  Claude: (
    <svg viewBox="0 0 32 32" fill="none" className="size-9" aria-label="Claude">
      <rect x="5" y="5" width="22" height="22" rx="5" fill="currentColor" opacity="0.15" />
      <path d="M10 22c3-6 6-10 12-10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M13 24c3-6 8-8 10-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
    </svg>
  ),
  Copilot: (
    <svg viewBox="0 0 32 32" fill="none" className="size-9" aria-label="Copilot">
      <circle cx="16" cy="11" r="6" fill="currentColor" opacity="0.2" />
      <path d="M8 26c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="16" cy="11" r="4" fill="currentColor" />
      <circle cx="16" cy="11" r="1.5" fill="var(--background)" />
    </svg>
  ),
  Nx: (
    <svg viewBox="0 0 32 32" fill="none" className="size-9" aria-label="Nx">
      <path d="M6 6l10 20L26 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 26l10-10 10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.35" />
    </svg>
  ),
  RxJS: (
    <svg viewBox="0 0 32 32" fill="none" className="size-9" aria-label="RxJS">
      <circle cx="16" cy="16" r="11" fill="currentColor" opacity="0.12" />
      <circle cx="16" cy="16" r="3" fill="currentColor" />
      <path d="M16 5v4M24 8l-3 2M27 16h-4M24 24l-3-2M16 27v-4M8 24l3-2M5 16h4M8 8l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
};

export type TechName = keyof typeof TECH_LOGOS;
