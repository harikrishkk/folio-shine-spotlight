import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BLOG_ENTRIES, ALL_TAGS, fetchGist, type Gist } from "@/lib/gists";

export const Route = createFileRoute("/blogs/")({
  head: () => ({
    meta: [
      { title: "Blogs — Hari Krishnan" },
      {
        name: "description",
        content:
          "Field notes on frontend architecture, Angular, React, and engineering leadership — sourced from GitHub Gists.",
      },
      { property: "og:title", content: "Blogs — Hari Krishnan" },
      {
        property: "og:description",
        content: "Field notes on frontend architecture and engineering leadership.",
      },
    ],
  }),
  component: BlogsPage,
});

function BlogsPage() {
  const [activeTag, setActiveTag] = useState<string>("ALL");

  const visible =
    activeTag === "ALL"
      ? BLOG_ENTRIES
      : BLOG_ENTRIES.filter((b) => b.tags.includes(activeTag));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/10">
        <div className="px-6 py-4 flex justify-between items-center">
          <Link to="/" className="font-bold tracking-tighter text-base md:text-lg">
            HARI.KRISHNAN<span className="text-[var(--color-accent)]">[03]</span>
          </Link>
          <Link
            to="/"
            className="text-sm font-bold inline-flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors"
          >
            <ArrowLeft className="size-4" /> HOME
          </Link>
        </div>
      </nav>

      <main className="px-6 md:px-16 py-16 max-w-5xl mx-auto">
        <header className="mb-12 animate-entrance">
          <p className="text-xs font-bold tracking-[0.3em] text-[var(--color-accent)] mb-4">
            [ FIELD NOTES ]
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.9]">
            Blogs.
          </h1>
          <p className="mt-6 text-muted-foreground max-w-2xl">
            Long-form notes on frontend architecture, patterns, and tradeoffs. Sourced
            directly from GitHub Gists.
          </p>
        </header>

        <div className="mb-8 flex flex-wrap gap-2">
          {["ALL", ...ALL_TAGS].map((tag) => {
            const active = tag === activeTag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(tag)}
                className={
                  "text-xs font-bold tracking-[0.15em] px-3 py-2 border transition-colors " +
                  (active
                    ? "bg-foreground text-background border-foreground"
                    : "border-foreground/20 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]")
                }
              >
                {tag.toUpperCase()}
              </button>
            );
          })}
        </div>

        <ul className="border-t border-foreground/10">
          {visible.map((entry) => (
            <BlogRow key={entry.id} id={entry.id} tags={entry.tags} />
          ))}
          {visible.length === 0 && (
            <li className="py-12 text-sm font-mono text-muted-foreground">
              No blogs tagged "{activeTag}" yet.
            </li>
          )}
        </ul>
      </main>
    </div>
  );
}

function BlogRow({ id, tags }: { id: string; tags: string[] }) {
  const { data, isLoading, error } = useQuery<Gist>({
    queryKey: ["gist", id],
    queryFn: () => fetchGist(id),
    staleTime: 5 * 60 * 1000,
  });

  const firstFile = data ? Object.values(data.files)[0] : undefined;
  const title =
    data?.description?.trim() ||
    firstFile?.filename.replace(/\.(md|markdown)$/i, "") ||
    id.slice(0, 8);

  return (
    <li className="border-b border-foreground/10">
      <Link
        to="/blogs/$gistId"
        params={{ gistId: id }}
        className="group block py-8 hover:bg-foreground/5 transition-colors -mx-6 px-6"
      >
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-[var(--color-accent)] transition-colors">
              {isLoading ? "Loading…" : error ? "Failed to load" : title}
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
              {tags.map((t) => (
                <span
                  key={t}
                  className="border border-[var(--color-accent)]/40 text-[var(--color-accent)] px-2 py-1"
                >
                  {t.toUpperCase()}
                </span>
              ))}
              {firstFile?.language && (
                <span className="border border-foreground/20 px-2 py-1">
                  {firstFile.language.toUpperCase()}
                </span>
              )}
              {data?.updated_at && (
                <span>UPDATED {new Date(data.updated_at).toLocaleDateString()}</span>
              )}
            </div>
          </div>
          <ArrowRight className="size-6 mt-2 shrink-0 group-hover:translate-x-1 group-hover:text-[var(--color-accent)] transition-all" />
        </div>
      </Link>
    </li>
  );
}