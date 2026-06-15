import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BLOG } from "@/config/blog";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Hari Krishnan" },
      {
        name: "description",
        content:
          "Chapters and lessons on modern Angular, React performance, and frontend architecture by Hari Krishnan.",
      },
      { property: "og:title", content: "Blog — Hari Krishnan" },
      {
        property: "og:description",
        content:
          "Chapters and lessons on modern Angular, React performance, and frontend architecture.",
      },
      { property: "og:url", content: "/blog" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogLanding,
});

function BlogLanding() {
  const totalLessons = BLOG.reduce((n, c) => n + c.lessons.length, 0);

  return (
    <div className="max-w-4xl mx-auto">
      <header className="mb-12 pb-8 border-b border-foreground/10">
        <p className="text-xs font-bold tracking-[0.3em] text-[var(--color-accent)] mb-3">
          [ BLOG / INDEX ]
        </p>
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
          Notes on modern frontend.
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl">
          {BLOG.length} chapters · {totalLessons} lessons. Pick a topic —
          everything is short, opinionated, and runnable.
        </p>
      </header>

      <div className="flex flex-col gap-12">
        {BLOG.map((chapter) => (
          <section key={chapter.id}>
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="text-2xl font-bold tracking-tight">
                {chapter.title}
              </h2>
              <span className="text-xs text-muted-foreground font-mono">
                {chapter.lessons.length.toString().padStart(2, "0")} lessons
              </span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {chapter.lessons.map((l, i) => (
                <li key={l.slug}>
                  <Link
                    to="/blog/$chapterId/$lessonSlug"
                    params={{ chapterId: chapter.id, lessonSlug: l.slug }}
                    className="group block h-full p-5 border border-foreground/10 hover:border-[var(--color-accent)] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <span className="text-xs font-mono text-muted-foreground">
                        {(i + 1).toString().padStart(2, "0")}
                      </span>
                      <ArrowRight className="size-4 opacity-0 group-hover:opacity-100 group-hover:text-[var(--color-accent)] transition-all -translate-x-1 group-hover:translate-x-0" />
                    </div>
                    <h3 className="font-bold tracking-tight mb-1 group-hover:text-[var(--color-accent)] transition-colors">
                      {l.title}
                    </h3>
                    {l.excerpt && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {l.excerpt}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}