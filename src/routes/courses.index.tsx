import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { COURSES } from "@/config/courses";

export const Route = createFileRoute("/courses/")({
  head: () => ({
    meta: [
      { title: "Angular & React Courses — Hari Krishnan" },
      {
        name: "description",
        content:
          "Advanced Angular and React courses for senior engineers. Reactive patterns, signals, monorepos, React performance and SSR — taught by Hari Krishnan.",
      },
      { property: "og:title", content: "Angular & React Courses — Hari Krishnan" },
      {
        property: "og:description",
        content:
          "Advanced Angular and React courses for senior engineers, taught by Hari Krishnan.",
      },
      { property: "og:url", content: "/courses" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "canonical", href: "/courses" },
    ],
  }),
  component: CoursesIndex,
});

function CoursesIndex() {
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
            [ COURSES ]
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-[0.9]">
            Courses.
          </h1>
          <p className="mt-6 text-muted-foreground max-w-2xl">
            Long-form, self-paced curriculum. Each course is broken into focused
            topics with runnable code samples.
          </p>
        </header>

        <ul className="border-t border-foreground/10">
          {COURSES.map((c) => (
            <li key={c.id} className="border-b border-foreground/10">
              <Link
                to="/courses/$courseId"
                params={{ courseId: c.id }}
                className="group block py-8 hover:bg-foreground/5 transition-colors -mx-6 px-6"
              >
                <div className="flex items-start justify-between gap-6">
                  <div className="min-w-0">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-[var(--color-accent)] transition-colors">
                      {c.title}
                    </h2>
                    <p className="mt-2 text-muted-foreground">{c.tagline}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
                      <span className="border border-[var(--color-accent)]/40 text-[var(--color-accent)] px-2 py-1">
                        {c.level.toUpperCase()}
                      </span>
                      <span className="border border-foreground/20 px-2 py-1">
                        {c.topics.length} TOPICS
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="size-6 mt-2 shrink-0 group-hover:translate-x-1 group-hover:text-[var(--color-accent)] transition-all" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}