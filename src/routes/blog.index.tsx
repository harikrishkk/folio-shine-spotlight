import { createFileRoute, redirect } from "@tanstack/react-router";
import { firstLesson } from "@/config/blog";

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
  beforeLoad: () => {
    const first = firstLesson();
    if (first) {
      throw redirect({
        to: "/blog/$chapterId/$lessonSlug",
        params: { chapterId: first.chapterId, lessonSlug: first.lessonSlug },
      });
    }
  },
  component: () => null,
});