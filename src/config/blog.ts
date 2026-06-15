// =====================================================================
// Blog configuration. Chapters group related lessons; each lesson has a
// markdown body that supports headings, lists, links, and fenced code
// blocks (rendered with syntax highlighting). Edit this file to add or
// rewrite content — no other files need to change.
// =====================================================================

export type BlogLesson = {
  slug: string;
  title: string;
  excerpt?: string;
  content: string; // markdown
};

export type BlogChapter = {
  id: string;
  title: string;
  lessons: BlogLesson[];
};

export const BLOG: BlogChapter[] = [
  {
    id: "angular",
    title: "Modern Angular",
    lessons: [
      {
        slug: "intro",
        title: "Intro",
        excerpt: "Why a fresh take on Angular matters in 2026.",
        content: `# Intro

Angular has changed more in the last three releases than in the five before
them. Signals, zoneless change detection, and deferrable views are not
incremental — they shift how you architect an app.

This series is a working notebook for senior engineers who already ship
Angular and want a sharper mental model of the runtime.

## What you will get

- Short chapters, each focused on one mechanism.
- Runnable code, not pseudocode.
- Opinionated guidance on what to use, what to skip.
`,
      },
      {
        slug: "signals",
        title: "Signals from scratch",
        excerpt: "The primitive, the graph, and the trap most teams fall into.",
        content: `# Signals from scratch

A signal is a reactive value with a known set of consumers. When the value
changes, every consumer is scheduled — not run synchronously.

\`\`\`ts
import { signal, computed, effect } from '@angular/core';

const count = signal(0);
const double = computed(() => count() * 2);

effect(() => console.log('double is', double()));

count.set(2); // logs: "double is 4"
\`\`\`

## The trap

Reading a signal inside a \`computed\` registers a dependency. Reading the
same signal inside a plain function does not. That asymmetry is the source
of 90% of "why didn't it update?" bugs.
`,
      },
      {
        slug: "directives",
        title: "Custom directives",
        excerpt: "Encapsulate DOM behavior without leaking jQuery into 2026.",
        content: `# Custom directives

Directives are enhancements for elements. Unlike components, they don't
have a template — they attach behavior to an existing host.

\`\`\`ts
import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({ selector: '[appToggleOpen]', standalone: true })
export class ToggleOpenDirective {
  private host = inject(ElementRef<HTMLElement>);

  @HostListener('click')
  onClick() {
    this.host.nativeElement.classList.toggle('is-open');
  }
}
\`\`\`

Use \`Renderer2\` instead of \`classList\` when you care about SSR — the DOM
API is not available on the server.
`,
      },
    ],
  },
  {
    id: "react",
    title: "React Performance",
    lessons: [
      {
        slug: "concurrent",
        title: "Concurrent rendering",
        excerpt: "Lanes, transitions, and the cost of getting them wrong.",
        content: `# Concurrent rendering

React 18 didn't add APIs on top of an old scheduler — it rewrote the
scheduler. Renders are now assigned to **lanes** with priorities.

\`\`\`tsx
import { startTransition, useState } from 'react';

function Search({ items }: { items: string[] }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(items);

  return (
    <input
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        startTransition(() => {
          setResults(items.filter((i) => i.includes(e.target.value)));
        });
      }}
    />
  );
}
\`\`\`
`,
      },
    ],
  },
];

export type BlogLessonRef = {
  chapter: BlogChapter;
  lesson: BlogLesson;
  prev: { chapterId: string; lessonSlug: string; title: string } | null;
  next: { chapterId: string; lessonSlug: string; title: string } | null;
};

export function findLesson(chapterId: string, lessonSlug: string): BlogLessonRef | null {
  const flat: { chapterId: string; lessonSlug: string; title: string }[] = [];
  for (const c of BLOG) for (const l of c.lessons) {
    flat.push({ chapterId: c.id, lessonSlug: l.slug, title: l.title });
  }
  const idx = flat.findIndex((f) => f.chapterId === chapterId && f.lessonSlug === lessonSlug);
  if (idx === -1) return null;
  const chapter = BLOG.find((c) => c.id === chapterId)!;
  const lesson = chapter.lessons.find((l) => l.slug === lessonSlug)!;
  return {
    chapter,
    lesson,
    prev: idx > 0 ? flat[idx - 1] : null,
    next: idx < flat.length - 1 ? flat[idx + 1] : null,
  };
}

export function firstLesson(): { chapterId: string; lessonSlug: string } | null {
  const c = BLOG[0];
  if (!c || !c.lessons[0]) return null;
  return { chapterId: c.id, lessonSlug: c.lessons[0].slug };
}