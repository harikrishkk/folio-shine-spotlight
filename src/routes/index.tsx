import { createFileRoute } from "@tanstack/react-router";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Menu, X, ArrowRight, ArrowLeft, Github, Linkedin, Twitter, Sun, Moon } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

const NAV = [
  { href: "#workshops", label: "WORKSHOPS" },
  { href: "#timeline", label: "EXPERIENCE" },
  { href: "#testimonials", label: "PRAISE" },
  { href: "#contact", label: "CONTACT" },
];

const MARQUEE = [
  "TYPESCRIPT",
  "REACTIVE PATTERNS",
  "NX MONOREPOS",
  "PERFORMANCE AUDITS",
  "SSR & HYDRATION",
  "DESIGN SYSTEMS",
  "RXJS",
  "REACT SERVER COMPONENTS",
];

const TIMELINE = [
  {
    period: "2022 — PRESENT",
    role: "Staff Frontend Engineer @ TechScale",
    blurb: "Leading core platform rewrite for 500k DAU. Signals-first Angular architecture across 12 squads.",
    active: true,
  },
  {
    period: "2019 — 2022",
    role: "Senior UI Lead @ CloudSync",
    blurb: "Architected a React + React Native design system shared across four product teams.",
  },
  {
    period: "2016 — 2019",
    role: "JavaScript Trainer @ CodeCraft",
    blurb: "Designed and delivered on-site Angular & React intensives for Fortune 500 engineering orgs.",
  },
  {
    period: "2013 — 2016",
    role: "Frontend Engineer @ Peak Agency",
    blurb: "Shipped interactive data viz and design systems for global enterprise clients.",
  },
];

const WORKSHOPS = [
  {
    tag: "Level: Advanced",
    title: "Angular Masterclass",
    bullets: [
      "Custom RxJS operators & reactive patterns",
      "Zone-less signal architecture",
      "Enterprise schematics & monorepo scaling",
      "Performance profiling & hydration strategy",
    ],
  },
  {
    tag: "Level: Expert",
    title: "React Performance",
    bullets: [
      "Concurrent mode internals",
      "Memory leak forensics in production",
      "Server Components deep-dive",
      "Streaming SSR & cache architecture",
    ],
  },
];

const TESTIMONIALS = [
  {
    quote:
      "Hari doesn't just teach code; he teaches systems thinking. Our entire frontend team level-up happened in just three days.",
    name: "Sarah Chen",
    role: "CTO, NEXUS LABS",
  },
  {
    quote:
      "The most intensive Angular training we've ever booked. We refactored architecture debt in real-time during the workshop.",
    name: "Marcus Thorne",
    role: "VP ENGINEERING, FINTECH FLOW",
  },
  {
    quote:
      "A rare blend of high-level architecture and hands-on coding. His React Performance module changed how my team profiles.",
    name: "Elena Rodriguez",
    role: "STAFF ENGINEER, GLOBAL LOGISTICS",
  },
  {
    quote:
      "Hari's RxJS deep-dive single-handedly unblocked our migration. Worth every cent for any team scaling Angular.",
    name: "Liam Zhao",
    role: "ENGINEERING MANAGER, DATAFLUX",
  },
];

function Index() {
  const [open, setOpen] = React.useState(false);
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const autoplay = React.useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));
  const [theme, setTheme] = React.useState<"light" | "dark">("light");

  React.useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const initial =
      stored ??
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);
  }, []);

  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-foreground/10">
        <div className="px-6 py-4 flex justify-between items-center">
          <a href="#top" className="font-bold tracking-tighter text-base md:text-lg">
            HARI.KRISHNAN<span className="text-[var(--color-accent)]">[03]</span>
          </a>
          <div className="hidden md:flex gap-8 text-sm font-bold">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="hover:text-[var(--color-accent)] transition-colors"
              >
                {n.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Toggle theme"
              className="border border-foreground/20 p-2 hover:border-[var(--color-accent)] transition-colors"
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <button
              type="button"
              aria-label="Toggle menu"
              className="md:hidden border border-foreground/20 p-2"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden border-t border-foreground/10 px-6 py-4 flex flex-col gap-4 text-sm font-bold">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="hover:text-[var(--color-accent)]"
              >
                {n.label}
              </a>
            ))}
          </div>
        )}
      </nav>

      <main id="top">
        {/* HERO */}
        <section className="grid grid-cols-1 md:grid-cols-4 border-b border-foreground/10">
          <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-foreground/10 p-8 md:p-16 flex flex-col justify-end min-h-[70vh] animate-entrance">
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-accent)] mb-6">
              [ Hari Krishnan / Frontend JS Lead ]
            </p>
            <h1 className="text-5xl sm:text-7xl md:text-[8rem] xl:text-[10rem] font-extrabold leading-[0.85] tracking-tighter mb-8">
              FRONTEND
              <br />
              ARCHITECT
              <span className="text-[var(--color-accent)]">.</span>
            </h1>
            <p className="max-w-xl text-base md:text-lg text-muted leading-relaxed">
              Leading engineering teams at the intersection of scale and performance. Specializing
              in high-frequency Angular systems and React design patterns — and training the next
              generation through intensive, no-fluff workshops.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#workshops"
                className="px-5 py-3 bg-foreground text-background font-bold uppercase tracking-widest text-xs hover:bg-[var(--color-accent)] transition-colors inline-flex items-center gap-2"
              >
                View Workshops <ArrowRight className="size-4" />
              </a>
              <a
                href="#contact"
                className="px-5 py-3 border border-foreground/20 font-bold uppercase tracking-widest text-xs hover:border-foreground transition-colors"
              >
                Get in touch
              </a>
            </div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-1 md:grid-rows-3 divide-x md:divide-x-0 md:divide-y divide-foreground/10">
            {[
              { num: "12+", label: "Years Industry" },
              { num: "850", label: "Devs Trained" },
              { num: "40+", label: "Workshops Delivered" },
            ].map((s, i) => (
              <div
                key={s.label}
                className="p-6 md:p-8 flex flex-col justify-center animate-entrance"
                style={{ animationDelay: `${(i + 1) * 100}ms` }}
              >
                <span className="text-3xl md:text-5xl font-extrabold text-[var(--color-accent)]">
                  {s.num}
                </span>
                <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest mt-2">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* MARQUEE */}
        <div className="bg-foreground text-background py-4 overflow-hidden border-b border-foreground/10">
          <div className="flex whitespace-nowrap animate-marquee">
            {[0, 1].map((dup) => (
              <div
                key={dup}
                className="flex gap-8 md:gap-12 px-6 font-bold uppercase text-lg md:text-2xl items-center shrink-0"
              >
                {MARQUEE.map((m) => (
                  <React.Fragment key={`${dup}-${m}`}>
                    <span>{m}</span>
                    <span className="text-[var(--color-accent)]">//</span>
                  </React.Fragment>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* TIMELINE + WORKSHOPS */}
        <section className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x divide-foreground/10">
          <div id="timeline" className="p-8 md:p-12 border-b lg:border-b-0 border-foreground/10">
            <h2 className="text-xs font-bold tracking-[0.3em] uppercase mb-12 text-muted">
              [ Career Milestones ]
            </h2>
            <div className="space-y-10 relative">
              <div className="absolute left-[7px] top-2 bottom-2 w-px bg-foreground/10" />
              {TIMELINE.map((t) => (
                <div key={t.period} className="relative pl-8">
                  <div
                    className={`absolute left-0 top-1.5 size-4 rounded-full ring-4 ring-background ${t.active ? "bg-[var(--color-accent)]" : "bg-foreground/20"}`}
                  />
                  <p
                    className={`text-xs font-bold mb-1 ${t.active ? "text-[var(--color-accent)]" : "text-muted"}`}
                  >
                    {t.period}
                  </p>
                  <h3 className="text-lg md:text-xl font-extrabold">{t.role}</h3>
                  <p className="text-muted text-sm mt-2 leading-relaxed">{t.blurb}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="workshops" className="p-8 md:p-12 space-y-8">
            <h2 className="text-xs font-bold tracking-[0.3em] uppercase mb-4 text-muted">
              [ Masterclass Modules ]
            </h2>
            {WORKSHOPS.map((w) => (
              <div
                key={w.title}
                className="group bg-card ring-1 ring-foreground/10 p-6 md:p-8 hover:ring-[var(--color-accent)] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-6 gap-4">
                  <div>
                    <span className="text-[10px] bg-[var(--color-accent)]/10 text-[var(--color-accent)] px-2 py-1 font-bold rounded uppercase tracking-tight">
                      {w.tag}
                    </span>
                    <h3 className="text-xl md:text-2xl font-extrabold mt-3">{w.title}</h3>
                  </div>
                  <div className="size-12 grid place-items-center border border-foreground/10 group-hover:bg-[var(--color-accent)] group-hover:text-white group-hover:border-[var(--color-accent)] transition-colors shrink-0">
                    <ArrowRight className="size-4" />
                  </div>
                </div>
                <ul className="text-sm space-y-2 text-muted mb-8">
                  {w.bullets.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className="block text-center w-full py-3 md:py-4 bg-foreground text-background font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-[var(--color-accent)] transition-colors"
                >
                  Book Curriculum
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section
          id="testimonials"
          className="border-y border-foreground/10 bg-foreground text-background p-8 md:p-12 overflow-hidden"
        >
          <div className="flex justify-between items-center mb-10 md:mb-12">
            <h2 className="text-xs font-bold tracking-[0.3em] uppercase">[ Testimonials ]</h2>
            <div className="flex gap-3">
              <button
                type="button"
                aria-label="Previous"
                onClick={() => api?.scrollPrev()}
                className="size-10 border border-background/20 grid place-items-center hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
              >
                <ArrowLeft className="size-4" />
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={() => api?.scrollNext()}
                className="size-10 border border-background/20 grid place-items-center hover:bg-[var(--color-accent)] hover:border-[var(--color-accent)] transition-colors"
              >
                <ArrowRight className="size-4" />
              </button>
            </div>
          </div>

          <Carousel
            setApi={setApi}
            opts={{ loop: true, align: "start" }}
            plugins={[autoplay.current]}
            className="max-w-5xl"
          >
            <CarouselContent>
              {TESTIMONIALS.map((t, i) => (
                <CarouselItem key={i}>
                  <blockquote className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight leading-tight italic text-balance">
                    “{t.quote}”
                  </blockquote>
                  <div className="mt-8 flex items-center gap-4">
                    <div className="size-12 rounded-full bg-[var(--color-accent)]/20 grid place-items-center text-[10px] font-bold">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p className="font-bold">{t.name.toUpperCase()}</p>
                      <p className="text-xs text-background/50">{t.role}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          <div className="flex gap-2 mt-10 md:mt-12">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => api?.scrollTo(i)}
                className={`h-1 transition-all ${i === current ? "w-16 bg-[var(--color-accent)]" : "w-8 bg-background/20"}`}
              />
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <footer id="contact" className="p-8 md:p-24 bg-background border-t border-foreground/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            <div>
              <h2 className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter leading-none mb-12">
                START THE
                <br />
                PROJECT
                <span className="text-[var(--color-accent)]">.</span>
              </h2>
              <div className="flex flex-col gap-4 text-lg md:text-xl font-bold">
                <a
                  href="mailto:hello@harikrishnan.dev"
                  className="hover:text-[var(--color-accent)] underline underline-offset-8 transition-colors break-all"
                >
                  hello@harikrishnan.dev
                </a>
                <div className="flex gap-6 text-sm text-muted mt-6 uppercase tracking-widest font-bold">
                  <a href="#" aria-label="GitHub" className="hover:text-foreground inline-flex items-center gap-2">
                    <Github className="size-4" /> GitHub
                  </a>
                  <a href="#" aria-label="LinkedIn" className="hover:text-foreground inline-flex items-center gap-2">
                    <Linkedin className="size-4" /> LinkedIn
                  </a>
                  <a href="#" aria-label="Twitter" className="hover:text-foreground inline-flex items-center gap-2">
                    <Twitter className="size-4" /> Twitter
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-end items-start md:items-end">
              <div className="bg-foreground text-background p-6 w-full max-w-xs ring-1 ring-foreground">
                <div className="flex items-center gap-3 mb-4">
                  <div className="size-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    System Status: Optimal
                  </span>
                </div>
                <p className="text-xs text-background/60 leading-relaxed">
                  Currently accepting workshop bookings for Q3/Q4. Consulting slots limited.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-16 md:mt-24 pt-8 border-t border-foreground/10 text-[10px] text-muted flex flex-col sm:flex-row gap-3 justify-between uppercase tracking-widest">
            <span>© 2026 Hari Krishnan</span>
            <span>Built with precision</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
