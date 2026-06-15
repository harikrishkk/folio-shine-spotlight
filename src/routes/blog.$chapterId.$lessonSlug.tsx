import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { findLesson } from "@/config/blog";

export const Route = createFileRoute("/blog/$chapterId/$lessonSlug")({
  loader: ({ params }) => {
    const ref = findLesson(params.chapterId, params.lessonSlug);
    if (!ref) throw notFound();
    return { ref };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { lesson, chapter } = loaderData.ref;
    const desc = lesson.excerpt ?? `${chapter.title} — ${lesson.title}`;
    const url = `/blog/${chapter.id}/${lesson.slug}`;
    return {
      meta: [
        { title: `${lesson.title} — ${chapter.title} | Hari Krishnan` },
        { name: "description", content: desc },
        { property: "og:title", content: `${lesson.title} — ${chapter.title}` },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  notFoundComponent: () => (
    <p className="font-mono text-sm">Lesson not found.</p>
  ),
  errorComponent: ({ error }) => (
    <p className="font-mono text-sm text-destructive">{error.message}</p>
  ),
  component: LessonPage,
});

function LessonPage() {
  const { ref } = Route.useLoaderData();
  const { chapter, lesson, prev, next } = ref;

  return (
    <article>
      <p className="text-xs font-bold tracking-[0.3em] text-muted-foreground mb-3">
        {chapter.title.toUpperCase()}
      </p>
      <div
        className="prose prose-neutral dark:prose-invert max-w-none
          prose-headings:tracking-tight prose-headings:font-extrabold
          prose-h1:text-4xl md:prose-h1:text-5xl prose-h1:leading-[1.05] prose-h1:mb-6
          prose-h2:text-2xl prose-h2:mt-10
          prose-p:leading-relaxed
          prose-a:text-[var(--color-accent)] prose-a:no-underline hover:prose-a:underline
          prose-code:before:content-none prose-code:after:content-none
          prose-code:bg-foreground/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-code:font-mono prose-code:text-sm prose-code:font-normal
          prose-pre:bg-[#0d1117] prose-pre:border prose-pre:border-foreground/10
          prose-pre:rounded-md prose-pre:p-4 prose-pre:overflow-x-auto"
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[[rehypeHighlight, { detect: true, ignoreMissing: true }]]}
        >
          {lesson.content}
        </ReactMarkdown>
      </div>

      <nav className="mt-16 pt-6 border-t border-foreground/10 grid grid-cols-2 gap-4 text-sm">
        <div>
          {prev && (
            <Link
              to="/blog/$chapterId/$lessonSlug"
              params={{ chapterId: prev.chapterId, lessonSlug: prev.lessonSlug }}
              className="group inline-flex items-center gap-2 text-muted-foreground hover:text-[var(--color-accent)] transition-colors"
            >
              <ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
              <span>
                <span className="block text-xs uppercase tracking-wider">Previous</span>
                <span className="font-bold">{prev.title}</span>
              </span>
            </Link>
          )}
        </div>
        <div className="text-right">
          {next && (
            <Link
              to="/blog/$chapterId/$lessonSlug"
              params={{ chapterId: next.chapterId, lessonSlug: next.lessonSlug }}
              className="group inline-flex items-center gap-2 text-muted-foreground hover:text-[var(--color-accent)] transition-colors ml-auto"
            >
              <span>
                <span className="block text-xs uppercase tracking-wider">Next</span>
                <span className="font-bold">{next.title}</span>
              </span>
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </nav>
    </article>
  );
}