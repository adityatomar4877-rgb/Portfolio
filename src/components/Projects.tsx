import type React from "react";
import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { RevealText } from "@/components/RevealText";

const projects = [
  {
    title: "AmityConnect", subtitle: "Smart Campus Safety Platform",
    desc: "Campus safety platform with SOS emergency alerts, ride sharing, and a peer service marketplace. Real-time location-based emergency response.",
    tags: ["Next.js", "Firebase", "Tailwind CSS"], live: "amityconnect.vercel.app", github: "#",
    tone: "orange", year: "2024", num: "01",
  },
  {
    title: "ManMitra", subtitle: "Student Mental Health Support",
    desc: "Mental wellness platform with counseling sessions, peer support, and mood tracking. AI support assistant and real-time appointment booking.",
    tags: ["React", "TypeScript", "Supabase", "Tailwind CSS"], live: "man-mitra-weld.vercel.app", github: "#",
    tone: "teal", year: "2024", num: "02",
  },
  {
    title: "Autonomous QA Bot", subtitle: "AI UI Testing Agent",
    desc: "Converts natural language test instructions into executable browser tests with self-healing element detection and auto-generated bug reports.",
    tags: ["Playwright", "Node.js", "AI Integration"], live: "", github: "#",
    tone: "green", year: "2024", num: "03",
  },
  {
    title: "Jeevanamrit", subtitle: "Ayurvedic Health Dashboard",
    desc: "Wellness dashboard for doctors and patients. Dosha-based diet planning, Ayurvedic health questionnaires, and clinical reporting.",
    tags: ["React", "TypeScript", "Supabase"], live: "", github: "#",
    tone: "pink", year: "2024", num: "04",
  },
];

const TONE: Record<string, { text: string; glow: string; border: string; bg: string; grad: string; tag: string }> = {
  orange: {
    text: "oklch(0.78 0.21 50)",
    glow: "0 0 40px -10px oklch(0.73 0.22 48 / 0.5)",
    border: "oklch(0.73 0.22 48 / 0.25)",
    bg: "oklch(0.73 0.22 48 / 0.08)",
    grad: "linear-gradient(135deg, oklch(0.73 0.22 48 / 0.18), oklch(0.80 0.20 55 / 0.04))",
    tag: "background: oklch(0.73 0.22 48 / 0.12); color: oklch(0.78 0.21 50);",
  },
  teal: {
    text: "oklch(0.80 0.17 185)",
    glow: "0 0 40px -10px oklch(0.80 0.17 185 / 0.45)",
    border: "oklch(0.80 0.17 185 / 0.25)",
    bg: "oklch(0.80 0.17 185 / 0.08)",
    grad: "linear-gradient(135deg, oklch(0.80 0.17 185 / 0.18), oklch(0.80 0.17 185 / 0.04))",
    tag: "background: oklch(0.80 0.17 185 / 0.12); color: oklch(0.80 0.17 185);",
  },
  green: {
    text: "oklch(0.72 0.17 142)",
    glow: "0 0 40px -10px oklch(0.65 0.18 148 / 0.45)",
    border: "oklch(0.65 0.18 148 / 0.25)",
    bg: "oklch(0.65 0.18 148 / 0.08)",
    grad: "linear-gradient(135deg, oklch(0.65 0.18 148 / 0.18), oklch(0.65 0.18 148 / 0.04))",
    tag: "background: oklch(0.65 0.18 148 / 0.12); color: oklch(0.72 0.17 142);",
  },
  pink: {
    text: "oklch(0.75 0.19 322)",
    glow: "0 0 40px -10px oklch(0.68 0.20 330 / 0.45)",
    border: "oklch(0.68 0.20 330 / 0.25)",
    bg: "oklch(0.68 0.20 330 / 0.08)",
    grad: "linear-gradient(135deg, oklch(0.68 0.20 330 / 0.18), oklch(0.68 0.20 330 / 0.04))",
    tag: "background: oklch(0.68 0.20 330 / 0.12); color: oklch(0.75 0.19 322);",
  },
};

function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    el.style.transform = `perspective(900px) rotateY(${dx * 5}deg) rotateX(${-dy * 5}deg) scale(1.015)`;
  };

  const onLeave = () => {
    if (cardRef.current)
      cardRef.current.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transition: "transform 0.18s ease-out", willChange: "transform", ...style }}
    >
      {children}
    </div>
  );
}

export function Projects() {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="projects"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="reveal relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      <div
        className="absolute top-1/2 left-0 -translate-y-1/2 h-[500px] w-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.73 0.22 48 / 0.04) 0%, transparent 70%)", filter: "blur(40px)" }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 flex items-end justify-between reveal-child" style={{ "--reveal-delay": "0s" } as React.CSSProperties}>
          <div>
            <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3 font-mono" style={{ color: "oklch(0.73 0.22 48)" }}>
              // what I've built
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Featured{" "}
              <RevealText text="Projects" wordClass="text-gradient-primary" baseDelay={200} />
            </h2>
          </div>
          <a
            href="https://github.com/adityatomar4877-rgb"
            target="_blank"
            rel="noreferrer"
            className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-smooth font-mono"
          >
            github.com/adityatomar4877-rgb <span style={{ marginLeft: "4px" }}>↗</span>
          </a>
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => {
            const t = TONE[p.tone];
            return (
              <TiltCard
                key={p.title}
                // @ts-ignore
                className={`project-card glass-card rounded-2xl p-6 border group reveal-child ${i % 2 === 0 ? "reveal-from-left" : "reveal-from-right"}`}
                style={{
                  "--reveal-delay": `${0.1 * i}s`,
                  borderColor: t.border,
                } as React.CSSProperties}
              >
                {/* Preview strip */}
                <div
                  className="h-32 w-full rounded-xl mb-5 flex items-center justify-between px-5 relative overflow-hidden"
                  style={{ background: t.grad }}
                >
                  {/* Big dim number */}
                  <span
                    className="font-mono text-[4.5rem] font-bold leading-none select-none"
                    style={{
                      color: "transparent",
                      WebkitTextStroke: `1px ${t.text}22`,
                      letterSpacing: "-0.04em",
                    }}
                  >
                    {p.num}
                  </span>

                  {/* Corner dots decoration */}
                  <div className="absolute top-3 right-3 flex gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: t.text, opacity: 0.4 }} />
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: t.text, opacity: 0.25 }} />
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: t.text, opacity: 0.15 }} />
                  </div>

                  {/* Action links */}
                  <div className="flex gap-2 z-10">
                    {p.live && (
                      <a
                        href={`https://${p.live}`}
                        target="_blank"
                        rel="noreferrer"
                        className="glass-btn text-xs px-3 py-1.5 rounded-full font-medium font-mono transition-smooth"
                        style={{ color: t.text }}
                      >
                        live ↗
                      </a>
                    )}
                    <a
                      href={p.github}
                      className="glass-btn text-xs px-3 py-1.5 rounded-full font-medium font-mono hover:text-primary transition-smooth"
                    >
                      github
                    </a>
                  </div>
                </div>

                {/* Year */}
                <span className="font-mono text-xs mb-2 block" style={{ color: t.text }}>
                  {p.year}
                </span>

                {/* Title */}
                <h3
                  className="text-lg font-bold mb-1 transition-smooth"
                  style={{ color: "oklch(0.94 0.018 70)" }}
                >
                  <span className="group-hover:text-primary transition-smooth">{p.title}</span>
                </h3>
                <p className="text-xs font-semibold mb-3 font-mono" style={{ color: t.text }}>
                  {p.subtitle}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.desc}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-full font-medium font-mono"
                      style={{ background: `oklch(0.73 0.22 48 / 0.08)`, color: t.text }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}