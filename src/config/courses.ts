// =====================================================================
// Courses configuration. Each course's topic bodies live as Markdown
// files under `src/content/courses/<courseId>/<slug>.md`.
// Edit this file only to add/remove/reorder topics or change titles.
// Body content lives in the markdown files.
// =====================================================================

const MARKDOWN_FILES = import.meta.glob("/src/content/courses/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function loadContent(courseId: string, slug: string): string {
  const key = `/src/content/courses/${courseId}/${slug}.md`;
  const md = MARKDOWN_FILES[key];
  if (!md) {
    throw new Error(
      `Missing markdown file for course topic "${courseId}/${slug}". Expected ${key}.`,
    );
  }
  return md;
}

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

type TopicMeta = Omit<CourseTopic, "content">;
type CourseMeta = Omit<Course, "topics"> & { topics: TopicMeta[] };

// Topic metadata only. Body lives in src/content/courses/<id>/<slug>.md
const COURSE_META: CourseMeta[] = [
  {
    id: "angular-masterclass",
    title: "Angular Masterclass",
    tagline:
      "Reactive patterns, signal-first architecture, monorepos, and performance — for senior Angular teams.",
    level: "Advanced",
    topics: [
      { slug: "overview", title: "Curriculum Overview" },
      { slug: "rxjs-operators", title: "Custom RxJS operators & reactive patterns" },
      { slug: "signals", title: "Zone-less signal architecture" },
      { slug: "monorepo", title: "Enterprise schematics & monorepo scaling" },
      { slug: "performance", title: "Performance profiling & hydration strategy" },
    ],
  },
  {
    id: "react-performance",
    title: "React Performance",
    tagline:
      "Concurrent mode, memory forensics, RSC, and streaming SSR — for teams scaling React in production.",
    level: "Expert",
    topics: [
      { slug: "overview", title: "Curriculum Overview" },
      { slug: "concurrent-mode", title: "Concurrent mode internals" },
      { slug: "memory-leaks", title: "Memory leak forensics in production" },
      { slug: "server-components", title: "Server Components deep-dive" },
      { slug: "streaming-ssr", title: "Streaming SSR & cache architecture" },
    ],
  },
];

export const COURSES: Course[] = COURSE_META.map((c) => ({
  ...c,
  topics: c.topics.map((t) => ({ ...t, content: loadContent(c.id, t.slug) })),
}));

export const ALL_COURSES = COURSES;