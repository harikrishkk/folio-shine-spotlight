import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { fetchGist, type Gist } from "@/lib/gists";
import "highlight.js/styles/github-dark.css";

export const Route = createFileRoute("/blogs/$gistId")({
  component: BlogPostPage,
});

function BlogPostPage() {
  const { gistId } = Route.useParams();
  const { data, isLoading, error } = useQuery<Gist>({
    queryKey: ["gist", gistId],
    queryFn: () => fetchGist(gistId),
    staleTime: 5 * 60 * 1000,
  });

  const files = data ? Object.values(data.files) : [];
  const title =
    data?.description?.trim() ||
    files[0]?.filename.replace(/\.(md|markdown)$/i, "") ||
    gistId.slice(0, 8);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/10">
        <div className="px-6 py-4 flex justify-between items-center">
          <Link to="/" className="font-bold tracking-tighter text-base md:text-lg">
            HARI.KRISHNAN<span className="text-[var(--color-accent)]">[03]</span>
          </Link>
          <Link
            to="/blogs"
            className="text-sm font-bold inline-flex items-center gap-2 hover:text-[var(--color-accent)] transition-colors"
          >
            <ArrowLeft className="size-4" /> ALL BLOGS
          </Link>
        </div>
      </nav>

      <main className="px-6 md:px-16 py-16">
        {isLoading && (
          <p className="font-mono text-sm text-muted-foreground">Loading gist…</p>
        )}
        {error && (
          <p className="font-mono text-sm text-destructive">
            Failed to load gist. It may be private or removed.
          </p>
        )}
        {data && (
          <>
            <header className="mb-12 animate-entrance">
              <p className="text-xs font-bold tracking-[0.3em] text-[var(--color-accent)] mb-4">
                [ GIST · {gistId.slice(0, 7)} ]
              </p>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-[0.95]">
                {title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground">
                {data.owner && <span>BY {data.owner.login.toUpperCase()}</span>}
                <span>UPDATED {new Date(data.updated_at).toLocaleDateString()}</span>
                <a
                  href={data.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 hover:text-[var(--color-accent)]"
                >
                  VIEW ON GITHUB <ExternalLink className="size-3" />
                </a>
              </div>
            </header>

            {files.map((file) => (
              <article key={file.filename} className="mb-16">
                {files.length > 1 && (
                  <h2 className="text-xs font-bold tracking-[0.2em] text-muted-foreground mb-6 border-b border-foreground/10 pb-2">
                    {file.filename}
                  </h2>
                )}
                {isMarkdown(file.filename) ? (
                  <div className="gist-prose">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                    >
                      {file.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                  <pre className="overflow-x-auto border border-foreground/10 bg-foreground/5 p-4 text-sm">
                    <code>{file.content}</code>
                  </pre>
                )}
              </article>
            ))}
          </>
        )}
      </main>
    </div>
  );
}

function isMarkdown(filename: string) {
  return /\.(md|markdown|mdx)$/i.test(filename);
}