import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { BLOG } from "@/lib/blog";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";

const PAGE_SIZE = 6;

const searchSchema = z.object({
  page: fallback(z.number().int().min(1), 1).default(1),
});

export const Route = createFileRoute("/blog/")({
  validateSearch: zodValidator(searchSchema),
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
  const { page } = Route.useSearch();

  const totalPages = Math.max(1, Math.ceil(BLOG.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageChapters = BLOG.slice(start, start + PAGE_SIZE);

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

      <div className="flex flex-col gap-8">
        {pageChapters.map((chapter) => {
          const first = chapter.lessons[0];
          return (
            <section
              key={chapter.id}
              className="group border border-foreground/10 hover:border-[var(--color-accent)] transition-colors p-6 md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 mb-2">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight">
                      {chapter.title}
                    </h2>
                    <span className="text-xs text-muted-foreground font-mono">
                      {chapter.lessons.length.toString().padStart(2, "0")} lessons
                    </span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed max-w-2xl">
                    {chapter.description}
                  </p>
                </div>
                {first && (
                  <Link
                    to="/blog/$chapterId/$lessonSlug"
                    params={{ chapterId: chapter.id, lessonSlug: first.slug }}
                    className="shrink-0 mt-1 inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-muted-foreground hover:text-[var(--color-accent)] transition-colors"
                  >
                    Read
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                )}
              </div>
            </section>
          );
        })}
      </div>

      {totalPages > 1 && (
        <nav
          aria-label="Blog pagination"
          className="mt-16 pt-8 border-t border-foreground/10 flex items-center justify-between"
        >
          <Link
            to="/blog"
            search={{ page: Math.max(1, currentPage - 1) }}
            disabled={currentPage === 1}
            aria-disabled={currentPage === 1}
            className={
              "text-xs font-bold tracking-[0.2em] uppercase transition-colors " +
              (currentPage === 1
                ? "text-muted-foreground/40 pointer-events-none"
                : "hover:text-[var(--color-accent)]")
            }
          >
            ← Prev
          </Link>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
              const active = n === currentPage;
              return (
                <Link
                  key={n}
                  to="/blog"
                  search={{ page: n }}
                  className={
                    "size-8 inline-flex items-center justify-center text-xs font-mono border transition-colors " +
                    (active
                      ? "border-[var(--color-accent)] text-[var(--color-accent)]"
                      : "border-foreground/10 text-muted-foreground hover:border-foreground/40 hover:text-foreground")
                  }
                >
                  {n.toString().padStart(2, "0")}
                </Link>
              );
            })}
          </div>

          <Link
            to="/blog"
            search={{ page: Math.min(totalPages, currentPage + 1) }}
            disabled={currentPage === totalPages}
            aria-disabled={currentPage === totalPages}
            className={
              "text-xs font-bold tracking-[0.2em] uppercase transition-colors " +
              (currentPage === totalPages
                ? "text-muted-foreground/40 pointer-events-none"
                : "hover:text-[var(--color-accent)]")
            }
          >
            Next →
          </Link>
        </nav>
      )}
    </div>
  );
}
