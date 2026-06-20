// Loads courses from single-file markdown documents at
// src/content/courses/<id>.md. Frontmatter holds tagline/level; each `# `
// heading begins a topic, and the paragraph(s) below it are its description.

const MARKDOWN_FILES = import.meta.glob("/src/content/courses/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

export type CourseTopic = { title: string; description: string };
export type Course = {
  id: string;
  title: string;
  tagline: string;
  level: string;
  topics: CourseTopic[];
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

function parseTopics(body: string): CourseTopic[] {
  const topics: CourseTopic[] = [];
  const lines = body.split("\n");
  let title: string | null = null;
  let buf: string[] = [];
  const flush = () => {
    if (title === null) return;
    const description = buf.join("\n").trim().split(/\n\s*\n/)[0]?.replace(/\s+/g, " ").trim() ?? "";
    topics.push({ title, description });
  };
  for (const line of lines) {
    const h = line.match(/^#\s+(.+?)\s*$/);
    if (h) {
      flush();
      title = h[1];
      buf = [];
    } else {
      buf.push(line);
    }
  }
  flush();
  return topics;
}

export const COURSES: Course[] = Object.entries(MARKDOWN_FILES)
  .map(([path, src]) => {
    const id = path.split("/").pop()!.replace(/\.md$/, "");
    const { data, body } = parseFrontmatter(src);
    return {
      id,
      title: data.title ?? id,
      tagline: data.tagline ?? "",
      level: data.level ?? "",
      topics: parseTopics(body),
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title));