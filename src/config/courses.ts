// =====================================================================
// Courses configuration. Each course is a full curriculum with a table
// of contents (topics) on the left and markdown content on the right.
// The Angular Masterclass and React Performance courses are linked from
// the masterclass cards on the homepage.
// =====================================================================

export type CourseTopic = {
  slug: string;
  title: string;
  content: string; // markdown
};

export type Course = {
  id: string;
  title: string;
  tagline: string;
  level: string;
  topics: CourseTopic[];
};

export const COURSES: Course[] = [
  {
    id: "angular-masterclass",
    title: "Angular Masterclass",
    tagline:
      "Reactive patterns, signal-first architecture, monorepos, and performance — for senior Angular teams.",
    level: "Advanced",
    topics: [
      {
        slug: "overview",
        title: "Curriculum Overview",
        content: `# Angular Masterclass — Curriculum

A four-day intensive for senior Angular engineers. We go beyond syntax into
the architectural decisions that make large Angular codebases fast,
reactive, and maintainable.

## What you'll learn

1. **Custom RxJS operators & reactive patterns** — design declarative data
   flows you can actually maintain.
2. **Zone-less signal architecture** — wire your app around signals and ditch
   change-detection guesswork.
3. **Enterprise schematics & monorepo scaling** — Nx, generators, and module
   boundaries that survive 20+ squads.
4. **Performance profiling & hydration strategy** — measure what matters,
   then fix it with SSR + partial hydration.

## Who it's for

Senior engineers, tech leads, and architects already shipping Angular in
production who want a step-change in how their team builds.

## Format

On-site or remote. Four full days, hands-on labs, real code from your
codebase. Cohort capped at 12.
`,
      },
      {
        slug: "rxjs-operators",
        title: "Custom RxJS operators & reactive patterns",
        content: `# Custom RxJS operators & reactive patterns

RxJS is the substrate of every serious Angular app. This module teaches
you to **think in streams** — not callbacks dressed up as observables.

## What we cover

- Higher-order mapping: \`switchMap\` vs \`mergeMap\` vs \`concatMap\` vs \`exhaustMap\`
- Multicasting with \`shareReplay\`, \`connectable\`, and ref-counting pitfalls
- Building **your own operators** with \`pipe()\` and the \`OperatorFunction<T,R>\` contract
- State machines on top of \`scan\`
- Cancellation, retries, and backoff that actually work

## Example: a typed retry-with-backoff operator

\`\`\`ts
import { Observable, timer, throwError } from 'rxjs';
import { retry } from 'rxjs/operators';

export function retryWithBackoff<T>(maxRetries = 3, base = 500) {
  return (source: Observable<T>) =>
    source.pipe(
      retry({
        count: maxRetries,
        delay: (_err, attempt) => timer(base * 2 ** attempt),
      }),
    );
}
\`\`\`

By the end of this module you can refactor a tangled \`subscribe\`-heavy
service into a single declarative pipeline.
`,
      },
      {
        slug: "signals",
        title: "Zone-less signal architecture",
        content: `# Zone-less signal architecture

Signals are the biggest shift in Angular since standalone components.
We rebuild a feature from scratch — no \`zone.js\`, no manual change
detection — using signals end-to-end.

## What we cover

- The signal primitive: \`signal\`, \`computed\`, \`effect\`
- Interop with RxJS via \`toSignal\` and \`toObservable\`
- \`provideExperimentalZonelessChangeDetection()\` and what it actually changes
- Designing components and services around signal graphs
- Migration playbook for an existing zone-based codebase

## Example

\`\`\`ts
import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  standalone: true,
  template: \`
    <input (input)="query.set($any($event.target).value)" />
    @for (u of filtered(); track u.id) { <p>{{ u.name }}</p> }
  \`,
})
export class UsersComponent {
  private users = toSignal(inject(UsersService).all$, { initialValue: [] });
  query = signal('');
  filtered = computed(() =>
    this.users().filter(u => u.name.includes(this.query())),
  );
}
\`\`\`
`,
      },
      {
        slug: "monorepo",
        title: "Enterprise schematics & monorepo scaling",
        content: `# Enterprise schematics & monorepo scaling

Once you cross ~5 squads, ad-hoc folder structures stop working. This
module teaches the architectural patterns that scale Angular to dozens of
teams sharing one repo.

## What we cover

- Nx workspace layout: \`apps/\`, \`libs/\`, scope and type tags
- Enforcing module boundaries with \`@nx/enforce-module-boundaries\`
- Custom **schematics** and **generators** for your team's conventions
- Affected graphs, distributed task execution, and CI partitioning
- Versioning and publishing internal libraries

## Example tags

\`\`\`json
{
  "scope:checkout": ["libs/checkout/**"],
  "scope:shared":   ["libs/shared/**"],
  "type:feature":   ["**/feature-*/**"],
  "type:ui":        ["**/ui-*/**"]
}
\`\`\`

You leave with a generator your team can run on day one.
`,
      },
      {
        slug: "performance",
        title: "Performance profiling & hydration strategy",
        content: `# Performance profiling & hydration strategy

The difference between a fast Angular app and a slow one is rarely the
framework — it's the architecture. We profile a real app and remove the
top three bottlenecks live.

## What we cover

- Reading Chrome DevTools performance traces (long tasks, layout thrash)
- The Angular DevTools profiler: change detection cost per component
- SSR + **partial hydration** with \`@defer\` blocks and route-level hydration
- Image, font, and bundle budgets that hold the line
- Real-user monitoring: Core Web Vitals you can act on

## Example: deferring a heavy block

\`\`\`html
@defer (on viewport) {
  <heavy-chart [data]="data()" />
} @placeholder {
  <skeleton-chart />
}
\`\`\`

Outcome: hydration cost drops, TTI improves, and you have a measurable
budget per route.
`,
      },
    ],
  },
  {
    id: "react-performance",
    title: "React Performance",
    tagline:
      "Concurrent mode, memory forensics, RSC, and streaming SSR — for teams scaling React in production.",
    level: "Expert",
    topics: [
      {
        slug: "overview",
        title: "Curriculum Overview",
        content: `# React Performance — Curriculum

A three-day deep-dive into how React 18+ actually renders, schedules, and
streams — and what that means for the apps you ship.

## What you'll learn

1. **Concurrent mode internals** — fibers, lanes, and how \`startTransition\`
   really works.
2. **Memory leak forensics in production** — track down the leaks your
   monitoring can't see.
3. **Server Components deep-dive** — what they are, what they're not, and
   how to migrate without breaking your team.
4. **Streaming SSR & cache architecture** — \`renderToPipeableStream\`,
   Suspense boundaries, and edge caching that scales.

## Who it's for

Senior React engineers who already know hooks, context, and Suspense, and
want to understand the runtime well enough to debug it.

## Format

Three days, ~50% live coding on a real app. Cohort capped at 12.
`,
      },
      {
        slug: "concurrent-mode",
        title: "Concurrent mode internals",
        content: `# Concurrent mode internals

React 18 didn't just add new APIs — it rewrote the scheduler. We open the
hood and trace a render from \`setState\` to commit.

## What we cover

- The fiber tree and the two-pass render/commit model
- Lanes, priorities, and \`startTransition\`
- \`useDeferredValue\` vs \`useTransition\` — when to use which
- Tearing, \`useSyncExternalStore\`, and external state libraries
- Reading React DevTools' "Why did this render?" output

## Example

\`\`\`tsx
import { startTransition, useState } from 'react';

export function Search({ items }: { items: string[] }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(items);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    startTransition(() => {
      setResults(items.filter(i => i.includes(e.target.value)));
    });
  }

  return <input value={query} onChange={onChange} />;
}
\`\`\`
`,
      },
      {
        slug: "memory-leaks",
        title: "Memory leak forensics in production",
        content: `# Memory leak forensics in production

Memory leaks in React rarely come from React itself — they come from
subscriptions, closures, and detached DOM nodes. We hunt them down.

## What we cover

- Chrome DevTools heap snapshots and the **3-snapshot technique**
- Common offenders: stale event listeners, \`useEffect\` cleanups, observers
- Detached DOM nodes and what keeps them alive
- Production monitoring with \`performance.memory\` and PerformanceObserver
- Writing a leak-regression test

## Example: a leak that hides in plain sight

\`\`\`tsx
useEffect(() => {
  const onResize = () => setSize(window.innerWidth);
  window.addEventListener('resize', onResize);
  // forgot the cleanup → every navigation away leaks a listener
}, []);
\`\`\`

You leave with a checklist your team can run before every release.
`,
      },
      {
        slug: "server-components",
        title: "Server Components deep-dive",
        content: `# Server Components deep-dive

RSC isn't "SSR 2.0" — it's a different programming model. We cover what
RSC actually is, what it gives you, and what it takes away.

## What we cover

- The mental model: server vs client component boundaries
- The \`"use client"\` directive and where it actually matters
- Streaming RSC payloads and Suspense at the boundary
- Data fetching: \`async\` components, request deduplication, caching layers
- Migration: how to introduce RSC into an existing CSR app without a rewrite

## Example

\`\`\`tsx
// app/posts/page.tsx — server component
import { db } from '@/lib/db';
import { PostList } from './post-list'; // "use client"

export default async function PostsPage() {
  const posts = await db.post.findMany();
  return <PostList initialPosts={posts} />;
}
\`\`\`
`,
      },
      {
        slug: "streaming-ssr",
        title: "Streaming SSR & cache architecture",
        content: `# Streaming SSR & cache architecture

Streaming SSR turns "blank screen until everything is ready" into
"meaningful pixels in 200ms." We wire it up end-to-end.

## What we cover

- \`renderToPipeableStream\` vs \`renderToReadableStream\`
- Suspense boundaries as **stream chunks**
- HTTP caching: \`Cache-Control\`, \`stale-while-revalidate\`, edge caches
- Per-route ISR and on-demand revalidation
- Observability: TTFB, FCP, LCP — what to alert on

## Example

\`\`\`tsx
import { renderToPipeableStream } from 'react-dom/server';

const { pipe } = renderToPipeableStream(<App />, {
  bootstrapScripts: ['/main.js'],
  onShellReady() { pipe(res); },
});
\`\`\`

Outcome: a measurable improvement in real-user LCP on day one.
`,
      },
    ],
  },
];

export const ALL_COURSES = COURSES;
