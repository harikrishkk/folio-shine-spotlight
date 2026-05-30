export const GIST_USER = "harikrishkk";

export type BlogEntry = {
  id: string;
  tags: string[];
};

// Edit the tags below to categorize each gist. Tags drive the filter pills.
export const BLOG_ENTRIES: BlogEntry[] = [
  { id: "9ba02bca24153bd01e1e0c138437dcce", tags: ["Angular"] },
  { id: "c82d1fe0054379a2fdf0a4397493a78d", tags: ["React"] },
];

// All unique tags across blogs, in stable order.
export const ALL_TAGS: string[] = Array.from(
  new Set(BLOG_ENTRIES.flatMap((b) => b.tags)),
);

export type GistFile = {
  filename: string;
  language: string | null;
  type: string;
  content: string;
};

export type Gist = {
  id: string;
  description: string | null;
  updated_at: string;
  html_url: string;
  owner?: { login: string; avatar_url: string };
  files: Record<string, GistFile>;
};

export async function fetchGist(id: string): Promise<Gist> {
  const res = await fetch(`https://api.github.com/gists/${id}`, {
    headers: { Accept: "application/vnd.github+json" },
  });
  if (!res.ok) throw new Error(`Failed to load gist ${id} (${res.status})`);
  return res.json();
}