export const GIST_USER = "harikrishkk";

export const GIST_IDS: string[] = [
  "9ba02bca24153bd01e1e0c138437dcce",
  "c82d1fe0054379a2fdf0a4397493a78d",
];

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