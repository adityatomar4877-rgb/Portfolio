import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { TechMarquee } from "@/components/TechMarquee";

const CATEGORIES = [
  {
    name: "Frontend",
    icon: "◈",
    color: "orange",
    label: "UI",
    skills: [
      { label: "React", level: 90, icon: "⚛" },
      { label: "Next.js", level: 82, icon: "▲" },
      { label: "TypeScript", level: 85, icon: "TS" },
      { label: "JavaScript", level: 92, icon: "JS" },
      { label: "Tailwind CSS", level: 90, icon: "✦" },
    ],
  },
  {
    name: "Backend",
    icon: "◉",
    color: "teal",
    label: "API",
    skills: [
      { label: "Node.js", level: 80, icon: "⬡" },
      { label: "Express.js", level: 78, icon: "∞" },
      { label: "FastAPI", level: 72, icon: "⚙" },
      { label: "Python", level: 85, icon: "🐍" },
    ],
  },
  {
    name: "Database & Cloud",
    icon: "◎",
    color: "green",
    label: "DB",
    skills: [
      { label: "Firebase", level: 78, icon: "🔥" },
      { label: "Supabase", level: 75, icon: "⚡" },
    ],
  },
  {
    name: "Tools",
    icon: "◇",
    color: "pink",
    label: "OPS",
    skills: [
      { label: "Git", level: 88, icon: "⎇" },
      { label: "Linux", level: 75, icon: "🐧" },
      { label: "Vercel", level: 82, icon: "▴" },
    ],
  },
];

const TONE: Record<string, { grad: string; glow: string; text: string; bg: string; border: string }> = {
  orange: {
    grad: "linear-gradient(135deg, oklch(0.73 0.22 48), oklch(0.80 0.20 55))",
    glow: "oklch(0.73 0.22 48 / 0.35)",
    text: "oklch(0.78 0.21 50)",
    bg: "oklch(0.73 0.22 48 / 0.08)",
    border: "oklch(0.73 0.22 48 / 0.22)",
  },
  teal: {
    grad: "linear-gradient(135deg, oklch(0.72 0.18 185), oklch(0.82 0.15 195))",
    glow: "oklch(0.76 0.17 185 / 0.35)",
    text: "oklch(0.80 0.17 185)",
    bg: "oklch(0.76 0.17 185 / 0.08)",
    border: "oklch(0.76 0.17 185 / 0.22)",
  },
  green: {
    grad: "linear-gradient(135deg, oklch(0.62 0.19 148), oklch(0.75 0.16 138))",
    glow: "oklch(0.65 0.18 148 / 0.35)",
    text: "oklch(0.72 0.18 142)",
    bg: "oklch(0.65 0.18 148 / 0.08)",
    border: "oklch(0.65 0.18 148 / 0.22)",
  },
  pink: {
    grad: "linear-gradient(135deg, oklch(0.68 0.20 330), oklch(0.78 0.18 315))",
    glow: "oklch(0.70 0.20 330 / 0.35)",
    text: "oklch(0.75 0.19 322)",
    bg: "oklch(0.70 0.20 330 / 0.08)",
    border: "oklch(0.70 0.20 330 / 0.22)",
  },
};

function SkillBar({ level, color, delay }: { level: number; color: string; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setFilled(true); obs.disconnect(); } },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const t = TONE[color];
  return (
    <div
      ref={ref}
      className="h-[2px] w-full rounded-full overflow-hidden"
      style={{ background: "oklch(1 0 0 / 0.05)" }}
    >
      <div
        className="h-full rounded-full transition-all"
        style={{
          width: filled ? `${level}%` : "0%",
          background: t.grad,
          boxShadow: filled ? `0 0 8px ${t.glow}` : "none",
          transitionDuration: "1.2s",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          transitionDelay: `${delay}ms`,
        }}
      />
    </div>
  );
}

function CategoryBlock({ cat, index }: { cat: typeof CATEGORIES[0]; index: number }) {
  const t = TONE[cat.color];
  const blockRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = blockRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={blockRef}
      className="skills-cat-block"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(44px) scale(0.97)",
        filter: visible ? "blur(0px)" : "blur(4px)",
        transition: `opacity 0.75s cubic-bezier(0.16,1,0.3,1) ${index * 110}ms, transform 0.75s cubic-bezier(0.16,1,0.3,1) ${index * 110}ms, filter 0.6s ease ${index * 110}ms`,
        borderColor: t.border,
        background: "oklch(0.10 0.013 30 / 0.8)",
      }}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-5 pb-4" style={{ borderBottom: `1px solid ${t.border}` }}>
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl text-base font-bold flex-shrink-0"
          style={{ background: t.bg, color: t.text, boxShadow: `0 0 18px ${t.glow}` }}
        >
          {cat.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold tracking-tight" style={{ color: t.text }}>{cat.name}</p>
          <p className="text-xs font-mono" style={{ color: "oklch(0.52 0.01 60)" }}>{cat.skills.length} technologies</p>
        </div>
        <span
          className="font-mono text-[10px] font-bold px-2 py-0.5 rounded"
          style={{ background: t.bg, color: t.text, letterSpacing: "0.1em" }}
        >
          {cat.label}
        </span>
      </div>

      {/* Skills list */}
      <div className="space-y-3.5">
        {cat.skills.map((s, si) => (
          <div key={s.label}>
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-xs w-4 text-center">{s.icon}</span>
                <span className="text-xs font-medium">{s.label}</span>
              </div>
              <span className="text-xs font-bold tabular-nums font-mono" style={{ color: t.text }}>
                {s.level}%
              </span>
            </div>
            <SkillBar level={s.level} color={cat.color} delay={visible ? si * 75 + 180 : 0} />
          </div>
        ))}
      </div>
    </div>
  );
}

function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[
        { top: "8%", left: "4%", color: "oklch(0.73 0.22 48 / 0.05)", size: 320, dur: 8 },
        { top: "58%", right: "2%", color: "oklch(0.80 0.17 185 / 0.05)", size: 280, dur: 11 },
        { top: "28%", left: "46%", color: "oklch(0.65 0.18 148 / 0.04)", size: 200, dur: 9 },
      ].map((o, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: o.top,
            left: (o as { left?: string }).left,
            right: (o as { right?: string }).right,
            width: o.size,
            height: o.size,
            background: `radial-gradient(circle, ${o.color}, transparent 70%)`,
            animation: `skills-orb-float ${o.dur}s ease-in-out infinite alternate`,
            animationDelay: `${i * 1.5}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Skills() {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="skills"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="reveal relative py-28 overflow-hidden"
    >
      <FloatingOrbs />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* Header */}
        <div className="reveal-child mb-16" style={{ "--reveal-delay": "0s" } as React.CSSProperties}>
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3 font-mono" style={{ color: "oklch(0.73 0.22 48)" }}>
            // arsenal
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              What I{" "}
              <span className="text-gradient-duo">Build With</span>
            </h2>
            <p className="text-muted-foreground text-sm max-w-xs md:text-right leading-relaxed font-mono">
              Tools and technologies I use to craft scalable, modern applications.
            </p>
          </div>
          <div className="mt-7 h-px bg-gradient-to-r from-primary/35 via-teal/20 to-transparent" />
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => (
            <CategoryBlock key={cat.name} cat={cat} index={i} />
          ))}
        </div>

        {/* Stats row */}
        <div
          className="reveal-child mt-12 grid grid-cols-3 gap-4 md:gap-6"
          style={{ "--reveal-delay": "0.5s" } as React.CSSProperties}
        >
          {[
            { num: "14+", label: "Technologies", color: "orange" },
            { num: "4", label: "Categories", color: "teal" },
            { num: "2+", label: "Yrs Learning", color: "green" },
          ].map((s) => {
            const t = TONE[s.color];
            return (
              <div
                key={s.label}
                className="glass-card rounded-2xl p-5 text-center"
                style={{ borderColor: t.border }}
              >
                <p className="text-3xl md:text-4xl font-bold mb-1" style={{ color: t.text }}>{s.num}</p>
                <p className="text-xs text-muted-foreground font-medium tracking-wide uppercase font-mono">{s.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Marquee */}
      <div className="mt-20 reveal-child" style={{ "--reveal-delay": "0.6s" } as React.CSSProperties}>
        <TechMarquee />
      </div>
    </section>
  );
}