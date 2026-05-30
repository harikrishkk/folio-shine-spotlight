import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Menu, X, ArrowRight, ArrowLeft, Github, Linkedin, Twitter, Sun, Moon } from "lucide-react";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/")({
  component: Index,
});

type FormState = {
  name: string;
  email: string;
  query: string;
};

const initialForm: FormState = { name: "", email: "", query: "" };

const { brand, nav: NAV, banner, marquee: MARQUEE, career, masterclass, testimonials, contact, footer } =
  siteConfig;
const TIMELINE = career.items;
const WORKSHOPS = masterclass.modules;
const TESTIMONIALS = testimonials.items;

const SOCIAL_ICONS = { github: Github, linkedin: Linkedin, twitter: Twitter };

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

  // Spark trail cursor for the headline
  const [sparks, setSparks] = React.useState<
    { id: number; x: number; y: number; dx: number; dy: number; size: number }[]
  >([]);
  const [cursor, setCursor] = React.useState<{ x: number; y: number } | null>(null);
  const sparkId = React.useRef(0);

  // Contact form state
  const [form, setForm] = React.useState<FormState>(initialForm);
  const [submitted, setSubmitted] = React.useState(false);

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm(initialForm);
    }, 3000);
  };

  const handleHeadlineMove = (e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    setCursor({ x, y });
    const count = 2;
    const newSparks = Array.from({ length: count }).map(() => ({
      id: sparkId.current++,
      x: x + (Math.random() - 0.5) * 12,
      y: y + (Math.random() - 0.5) * 12,
      dx: (Math.random() - 0.5) * 80,
      dy: Math.random() * 60 + 10,
      size: Math.random() * 4 + 2,
    }));
    setSparks((prev) => [...prev.slice(-40), ...newSparks]);
    newSparks.forEach((s) => {
      setTimeout(() => {
        setSparks((prev) => prev.filter((p) => p.id !== s.id));
      }, 700);
    });
  };
  const handleHeadlineLeave = () => setCursor(null);

  const headlineLines = banner.headlineLines;

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
            {brand.name}<span className="text-[var(--color-accent)]">{brand.suffix}</span>
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
            <Link
              to="/blogs"
              className="hover:text-[var(--color-accent)] transition-colors"
            >
              BLOGS
            </Link>
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
            <Link
              to="/blogs"
              onClick={() => setOpen(false)}
              className="hover:text-[var(--color-accent)]"
            >
              BLOGS
            </Link>
          </div>
        )}
      </nav>

      <main id="top">
        {/* HERO */}
        <section className="grid grid-cols-1 md:grid-cols-4 border-b border-foreground/10">
          <div className="md:col-span-3 border-b md:border-b-0 md:border-r border-foreground/10 p-8 md:p-16 flex flex-col justify-end min-h-[70vh] animate-entrance">
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.3em] text-[var(--color-accent)] mb-6">
              {banner.eyebrow}
            </p>
            <h1
              onMouseMove={handleHeadlineMove}
              onMouseLeave={handleHeadlineLeave}
              className="group text-5xl sm:text-7xl md:text-[8rem] xl:text-[10rem] font-extrabold leading-[0.85] tracking-tighter mb-8 select-none [cursor:none]"
            >
              {headlineLines.map((line, li) => (
                <span key={line} className="block">
                  {Array.from(line).map((ch, i) => (
                    <span
                      key={`${li}-${i}`}
                      className="glitch-char"
                      data-text={ch}
                    >
                      {ch}
                    </span>
                  ))}
                  {li === headlineLines.length - 1 && (
                    <span
                      className="glitch-char text-[var(--color-accent)]"
                      data-text={banner.headlineAccent}
                    >
                      {banner.headlineAccent}
                    </span>
                  )}
                </span>
              ))}
            </h1>
            {/* Spark trail */}
            <div className="pointer-events-none fixed inset-0 z-[60]">
              {cursor && (
                <div
                  className="absolute size-4 rounded-full bg-[var(--color-accent)] mix-blend-difference"
                  style={{
                    left: cursor.x,
                    top: cursor.y,
                    transform: "translate(-50%, -50%)",
                    boxShadow: "0 0 20px var(--color-accent), 0 0 40px var(--color-accent)",
                  }}
                />
              )}
              {sparks.map((s) => (
                <span
                  key={s.id}
                  className="spark absolute rounded-full bg-[var(--color-accent)]"
                  style={
                    {
                      left: s.x,
                      top: s.y,
                      width: s.size,
                      height: s.size,
                      boxShadow: "0 0 8px var(--color-accent)",
                      "--dx": `${s.dx}px`,
                      "--dy": `${s.dy}px`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
            <p className="max-w-xl text-base md:text-lg text-muted leading-relaxed">
              {banner.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={banner.primaryCta.href}
                className="px-5 py-3 bg-foreground text-background font-bold uppercase tracking-widest text-xs hover:bg-[var(--color-accent)] transition-colors inline-flex items-center gap-2"
              >
                {banner.primaryCta.label} <ArrowRight className="size-4" />
              </a>
              <a
                href={banner.secondaryCta.href}
                className="px-5 py-3 border border-foreground/20 font-bold uppercase tracking-widest text-xs hover:border-foreground transition-colors"
              >
                {banner.secondaryCta.label}
              </a>
            </div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-1 md:grid-rows-3 divide-x md:divide-x-0 md:divide-y divide-foreground/10">
            {banner.stats.map((s, i) => (
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
              {career.sectionLabel}
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
              {masterclass.sectionLabel}
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
                  href={masterclass.ctaHref}
                  className="block text-center w-full py-3 md:py-4 bg-foreground text-background font-bold uppercase tracking-widest text-xs md:text-sm hover:bg-[var(--color-accent)] transition-colors"
                >
                  {masterclass.ctaLabel}
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
            <h2 className="text-xs font-bold tracking-[0.3em] uppercase">{testimonials.sectionLabel}</h2>
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
                {contact.headlineTop}
                <br />
                {contact.headlineBottom}
                <span className="text-[var(--color-accent)]">.</span>
              </h2>
              <div className="flex flex-col gap-4 text-lg md:text-xl font-bold">
                <a
                  href={`mailto:${contact.email}`}
                  className="hover:text-[var(--color-accent)] underline underline-offset-8 transition-colors break-all"
                >
                  {contact.email}
                </a>
                <div className="flex gap-6 text-sm text-muted mt-6 uppercase tracking-widest font-bold">
                  {contact.socials.map((s) => {
                    const Icon = SOCIAL_ICONS[s.icon];
                    return (
                      <a
                        key={s.label}
                        href={s.href}
                        aria-label={s.label}
                        className="hover:text-foreground inline-flex items-center gap-2"
                      >
                        <Icon className="size-4" /> {s.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-end items-start md:items-end w-full">
              {submitted ? (
                <div className="w-full max-w-sm p-8 border border-[var(--color-accent)] text-center">
                  <div className="size-12 mx-auto mb-4 rounded-full bg-[var(--color-accent)]/20 grid place-items-center text-lg">
                    ✓
                  </div>
                  <p className="text-xl font-extrabold mb-2">{contact.successTitle}</p>
                  <p className="text-sm text-muted">{contact.successMessage}</p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="w-full max-w-sm space-y-4"
                >
                  <div>
                    <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-widest block mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleFormChange}
                      className="w-full bg-transparent border border-foreground/20 px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-widest block mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleFormChange}
                      className="w-full bg-transparent border border-foreground/20 px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="query" className="text-[10px] font-bold uppercase tracking-widest block mb-2">
                      Your Query
                    </label>
                    <textarea
                      id="query"
                      name="query"
                      required
                      rows={4}
                      value={form.query}
                      onChange={handleFormChange}
                      className="w-full bg-transparent border border-foreground/20 px-4 py-3 text-sm focus:outline-none focus:border-[var(--color-accent)] transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-foreground text-background font-bold uppercase tracking-widest text-xs hover:bg-[var(--color-accent)] transition-colors mt-2"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
          <div className="mt-16 md:mt-24 pt-8 border-t border-foreground/10 text-[10px] text-muted flex flex-col sm:flex-row gap-3 justify-between uppercase tracking-widest">
            <span>{footer.copyright}</span>
            <span>{footer.tagline}</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
