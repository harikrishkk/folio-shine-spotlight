import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { ArrowLeft } from "lucide-react";
import { z } from "zod";
import { COURSES } from "@/config/courses";
import "highlight.js/styles/github-dark.css";

const searchSchema = z.object({
  topic: z.string().optional(),
});

export const Route = createFileRoute("/courses/$courseId")({
  validateSearch: searchSchema,
  loader: ({ params }) => {
    const course = COURSES.find((c) => c.id === params.courseId);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.course.title} — Courses` },
          { name: "description", content: loaderData.course.tagline },
          { property: "og:title", content: `${loaderData.course.title} — Courses` },
          { property: "og:description", content: loaderData.course.tagline },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex items-center justify-center text-foreground">
      <p className="font-mono text-sm">Course not found.</p>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen flex items-center justify-center text-foreground">
      <p className="font-mono text-sm text-destructive">{error.message}</p>
    </div>
  ),
  component: CoursePage,
});

function CoursePage() {
  const { course } = Route.useLoaderData();
  const { topic } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const activeSlug = topic ?? course.topics[0]?.slug;
  const active = course.topics.find((t) => t.slug === activeSlug) ?? course.topics[0];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/10">
        <div className="px-6 py-4 flex justify-between items-center">
          <Link to="/" className="font-bold tracking-tighter text-base md:text-lg">
            HARI.KRISHNAN<span className="text-[var(--color-accent)]">[03]</span>
          </Link>
          <Link
            to="/courses"
            className="text-sm font-bold inline-flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors"
          >
            <ArrowLeft className="size-4" /> ALL COURSES
          </Link>
        </div>
      </nav>

      <div className="flex flex-col md:flex-row min-h-[calc(100vh-65px)]">
        {/* Sidebar */}
        <aside className="md:w-72 md:shrink-0 border-b md:border-b-0 md:border-r border-foreground/10 md:sticky md:top-[65px] md:self-start md:max-h-[calc(100vh-65px)] md:overflow-y-auto">
          <div className="px-6 py-8">
            <p className="text-xs font-bold tracking-[0.3em] text-[var(--color-accent)] mb-3">
              [ COURSE ]
            </p>
            <h2 className="text-xl font-extrabold tracking-tight leading-tight mb-6">
              {course.title}
            </h2>
            <ul className="flex flex-col">
              {course.topics.map((t) => {
                const isActive = t.slug === active?.slug;
                return (
                  <li key={t.slug}>
                    <button
                      type="button"
                      onClick={() =>
                        navigate({
                          search: (prev) => ({ ...prev, topic: t.slug }),
                          replace: true,
                        })
                      }
                      className={
                        "w-full text-left px-3 py-2 text-sm font-medium border-l-2 transition-colors " +
                        (isActive
                          ? "border-[var(--color-accent)] text-[var(--color-accent)] bg-foreground/5"
                          : "border-transparent text-muted-foreground hover:text-foreground hover:border-foreground/30")
                      }
                    >
                      {t.title}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0 px-6 md:px-12 py-12">
          {active && (
            <article className="gist-prose max-w-3xl">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
              >
                {active.content}
              </ReactMarkdown>
            </article>
          )}
        </main>
      </div>
    </div>
  );
}