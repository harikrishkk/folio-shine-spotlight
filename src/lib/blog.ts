// Loads blog chapters and lessons from src/content/blog/<chapter>/<lesson>.md.
// Add a new chapter by creating a folder; add a lesson by dropping a .md file in it.
// Optional `_index.md` in a chapter folder provides chapter title/description via frontmatter.
// Optional lesson frontmatter: title, excerpt, order. Falls back to first H1 + first paragraph.

const MARKDOWN_FILES = import.meta.glob("/src/content/blog/**/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export type BlogLesson = {
  slug: string;
  title: string;
  excerpt?: string;
  content: string;
};

export type BlogChapter = {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: BlogLesson[];
};

function parseFrontmatter(src: string): { data: Record<string, string>; body: string } {
  const m = src.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { data: {}, body: src };
  const data: Record<string, string> = {};
  for (const line of m[1].split("\n")) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    const val = line.slice(i + 1).trim().replace(/^["']|["']$/g, "");
    if (key) data[key] = val;
  }
  return { data, body: m[2] };
}

function titleCase(s: string): string {
  return s.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function firstHeading(body: string): string | null {
  const m = body.match(/^#\s+(.+?)\s*$/m);
  return m ? m[1] : null;
}

function firstParagraph(body: string): string {
  // Strip the leading heading, then take the first non-empty, non-code paragraph.
  const stripped = body.replace(/^#\s+.+\n+/, "");
  for (const block of stripped.split(/\n\s*\n/)) {
    const t = block.trim();
    if (!t) continue;
    if (t.startsWith("```") || t.startsWith("#")) continue;
    return t.replace(/\s+/g, " ");
  }
  return "";
}

type RawChapter = { id: string; index?: { data: Record<string, string>; body: string }; lessons: BlogLesson[] };

const byChapter = new Map<string, RawChapter>();

for (const [path, src] of Object.entries(MARKDOWN_FILES)) {
  // path = /src/content/blog/<chapterId>/<file>.md
  const parts = path.split("/");
  const file = parts.pop()!;
  const chapterId = parts.pop()!;
  if (!byChapter.has(chapterId)) byChapter.set(chapterId, { id: chapterId, lessons: [] });
  const chapter = byChapter.get(chapterId)!;
  const slug = file.replace(/\.md$/, "");
  const { data, body } = parseFrontmatter(src);

  if (slug === "_index") {
    chapter.index = { data, body };
    continue;
  }

  chapter.lessons.push({
    slug,
    title: data.title ?? firstHeading(body) ?? titleCase(slug),
    excerpt: data.excerpt ?? (firstParagraph(body) || undefined),
    content: body,
  });
}

export const BLOG: BlogChapter[] = Array.from(byChapter.values())
  .map((c) => {
    const order = c.index?.data.order ? Number(c.index.data.order) : Number.POSITIVE_INFINITY;
    return {
      id: c.id,
      title: c.index?.data.title ?? titleCase(c.id),
      description: c.index?.data.description ?? (c.index ? firstParagraph(c.index.body) : ""),
      order: Number.isFinite(order) ? order : Number.POSITIVE_INFINITY,
      lessons: c.lessons.sort((a, b) => a.slug.localeCompare(b.slug)),
    };
  })
  .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));

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