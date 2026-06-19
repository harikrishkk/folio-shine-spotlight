// =====================================================================
// Blog configuration. Chapters group related lessons; each lesson's body
// is a Markdown file under `src/content/blog/<chapterId>/<slug>.md`.
// Edit this file only to add/remove/reorder lessons or change titles.
// Body content lives in the markdown files.
// =====================================================================

// Eagerly load every markdown file under src/content/blog as a raw string.
// Key shape: "/src/content/blog/<chapterId>/<slug>.md"
const MARKDOWN_FILES = import.meta.glob("/src/content/blog/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function loadContent(chapterId: string, slug: string): string {
  const key = `/src/content/blog/${chapterId}/${slug}.md`;
  const md = MARKDOWN_FILES[key];
  if (!md) {
    throw new Error(
      `Missing markdown file for lesson "${chapterId}/${slug}". Expected ${key}.`,
    );
  }
  return md;
}

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

type LessonMeta = Omit<BlogLesson, "content">;
type ChapterMeta = { id: string; title: string; lessons: LessonMeta[] };

// Lesson metadata only. Content for each lesson lives in
// src/content/blog/<chapter.id>/<lesson.slug>.md
const CHAPTERS: ChapterMeta[] = [
  {
    id: "angular",
    title: "Modern Angular",
    lessons: [
      { slug: "intro", title: "Intro", excerpt: "Why a fresh take on Angular matters in 2026." },
      { slug: "signals", title: "Signals from scratch", excerpt: "The primitive, the graph, and the trap most teams fall into." },
      { slug: "directives", title: "Custom directives", excerpt: "Encapsulate DOM behavior without leaking jQuery into 2026." },
    ],
  },
  {
    id: "react",
    title: "React Performance",
    lessons: [
      { slug: "concurrent", title: "Concurrent rendering", excerpt: "Lanes, transitions, and the cost of getting them wrong." },
    ],
  },
];

export const BLOG: BlogChapter[] = CHAPTERS.map((c) => ({
  id: c.id,
  title: c.title,
  lessons: c.lessons.map((l) => ({ ...l, content: loadContent(c.id, l.slug) })),
}));

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