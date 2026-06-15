import { createFileRoute, Link, Outlet, useParams } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { BLOG } from "@/config/blog";
import "highlight.js/styles/github-dark.css";

export const Route = createFileRoute("/blog")({
  component: BlogLayout,
});

function BlogLayout() {
  // Read the chapter/lesson params if a child route matches; otherwise undefined.
  const params = useParams({ strict: false }) as {
    chapterId?: string;
    lessonSlug?: string;
  };

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

      <div className="w-full px-4 md:px-8 grid grid-cols-1 md:grid-cols-[260px_1fr] gap-10 py-10">
        <aside className="md:sticky md:top-20 md:self-start md:max-h-[calc(100vh-6rem)] md:overflow-y-auto">
          <p className="text-xs font-bold tracking-[0.3em] text-[var(--color-accent)] mb-4">
            [ BLOG ]
          </p>
          <nav className="flex flex-col gap-6 text-sm">
            {BLOG.map((chapter) => (
              <div key={chapter.id}>
                <h2 className="font-bold tracking-tight mb-2">{chapter.title}</h2>
                <ul className="flex flex-col">
                  {chapter.lessons.map((l) => {
                    const active =
                      params.chapterId === chapter.id && params.lessonSlug === l.slug;
                    return (
                      <li key={l.slug}>
                        <Link
                          to="/blog/$chapterId/$lessonSlug"
                          params={{ chapterId: chapter.id, lessonSlug: l.slug }}
                          className={
                            "block py-1.5 pl-3 border-l transition-colors " +
                            (active
                              ? "border-[var(--color-accent)] text-[var(--color-accent)] font-semibold"
                              : "border-foreground/10 text-muted-foreground hover:text-foreground hover:border-foreground/40")
                          }
                        >
                          {l.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <main className="min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}