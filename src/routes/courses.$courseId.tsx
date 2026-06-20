import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { COURSES, type CourseTopic, type Course } from "@/lib/courses";

export const Route = createFileRoute("/courses/$courseId")({
  loader: ({ params }) => {
    const course = COURSES.find((c: Course) => c.id === params.courseId);
    if (!course) throw notFound();
    return { course };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.course.title} — Course & Workshop | Hari Krishnan` },
          { name: "description", content: loaderData.course.tagline },
          { property: "og:title", content: `${loaderData.course.title} — Course & Workshop` },
          { property: "og:description", content: loaderData.course.tagline },
          { property: "og:type", content: "article" },
          { property: "og:url", content: `/courses/${loaderData.course.id}` },
        ]
      : [],
    links: loaderData
      ? [{ rel: "canonical", href: `/courses/${loaderData.course.id}` }]
      : [],
    scripts: loaderData
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Course",
              name: loaderData.course.title,
              description: loaderData.course.tagline,
              educationalLevel: loaderData.course.level,
              numberOfCredits: loaderData.course.topics.length,
              provider: {
                "@type": "Person",
                name: "Hari Krishnan",
              },
              hasCourseInstance: {
                "@type": "CourseInstance",
                courseMode: "Onsite",
                instructor: { "@type": "Person", name: "Hari Krishnan" },
              },
            }),
          },
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
  const topics = course.topics as CourseTopic[];

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

      <main className="px-6 md:px-12 py-16 max-w-3xl mx-auto">
        <p className="text-xs font-bold tracking-[0.3em] text-[var(--color-accent)] mb-3">
          [ COURSE ]
        </p>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-[1.05] mb-4">
          {course.title}
        </h1>
        <p className="text-base text-muted-foreground mb-12 max-w-2xl">
          {course.tagline}
        </p>

        <h2 className="text-xs font-bold tracking-[0.3em] text-muted-foreground mb-6">
          [ CURRICULUM ]
        </h2>
        <ol className="flex flex-col divide-y divide-foreground/10 border-y border-foreground/10">
          {topics.map((t: CourseTopic, i: number) => (
            <li key={t.title} className="py-6 flex gap-6">
              <span className="font-mono text-sm text-[var(--color-accent)] pt-1 shrink-0 w-8">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h3 className="text-lg font-bold tracking-tight mb-2">
                  {t.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}