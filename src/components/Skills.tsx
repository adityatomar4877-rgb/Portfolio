import type React from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { RevealText } from "@/components/RevealText";
import { TechMarquee } from "@/components/TechMarquee";

const skills = [
  { label: "React", level: 90, tone: "orange", icon: "⚛" },
  { label: "TypeScript", level: 85, tone: "blue", icon: "TS" },
  { label: "Next.js", level: 82, tone: "green", icon: "▲" },
  { label: "JavaScript", level: 92, tone: "yellow", icon: "JS" },
  { label: "Node.js", level: 80, tone: "green", icon: "⬡" },
  { label: "Python", level: 85, tone: "blue", icon: "🐍" },
  { label: "Tailwind", level: 90, tone: "cyan", icon: "✦" },
  { label: "Firebase", level: 78, tone: "orange", icon: "🔥" },
  { label: "Supabase", level: 75, tone: "green", icon: "⚡" },
  { label: "FastAPI", level: 72, tone: "pink", icon: "⚙" },
  { label: "Git", level: 88, tone: "orange", icon: "⎇" },
  { label: "Linux", level: 75, tone: "blue", icon: "🐧" },
];

const toneVars: Record<string, { bar: string; glow: string; text: string }> = {
  orange: { bar: "from-primary to-primary-glow", glow: "oklch(0.7 0.21 45 / 0.4)", text: "text-primary" },
  blue: { bar: "from-[oklch(0.52_0.20_250)] to-[oklch(0.72_0.18_230)]", glow: "oklch(0.6 0.2 250 / 0.4)", text: "text-[oklch(0.72_0.18_230)]" },
  green: { bar: "from-[oklch(0.62_0.19_148)] to-[oklch(0.75_0.16_138)]", glow: "oklch(0.65 0.19 148 / 0.4)", text: "text-[oklch(0.75_0.16_138)]" },
  yellow: { bar: "from-[oklch(0.82_0.19_88)] to-[oklch(0.75_0.18_68)]", glow: "oklch(0.82 0.19 88 / 0.4)", text: "text-[oklch(0.82_0.19_88)]" },
  cyan: { bar: "from-[oklch(0.75_0.14_200)] to-[oklch(0.82_0.12_188)]", glow: "oklch(0.78 0.14 200 / 0.4)", text: "text-[oklch(0.82_0.12_188)]" },
  pink: { bar: "from-[oklch(0.68_0.20_330)] to-[oklch(0.78_0.18_315)]", glow: "oklch(0.7 0.20 330 / 0.4)", text: "text-[oklch(0.78_0.18_315)]" },
};

export function Skills() {
  const sectionRef = useScrollReveal();
  return (
    <section id="skills" ref={sectionRef as React.RefObject<HTMLElement>}
      className="reveal relative py-28 overflow-hidden">
      <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-[oklch(0.55_0.18_250)]/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
        {/* section label */}
        <div className="reveal-child" style={{ "--reveal-delay": "0s" } as React.CSSProperties}>
          <p className="text-sm font-semibold tracking-widest text-primary uppercase mb-3">What I work with</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-16">
            My{" "}
            <RevealText text="Skills" wordClass="text-gradient-primary" baseDelay={200} />
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((s, i) => {
            const t = toneVars[s.tone] ?? toneVars.orange;
            /* alternate: even cards come from left, odd from right */
            const dir = i % 2 === 0 ? "reveal-from-left" : "reveal-from-right";
            return (
              <div
                key={s.label}
                className={`skill-card glass-card rounded-2xl p-5 group reveal-child ${dir}`}
                style={{ "--reveal-delay": `${0.05 * i}s` } as React.CSSProperties}
              >
                <div className={`mb-4 text-2xl font-bold ${t.text}`}>{s.icon}</div>
                <div className="flex items-baseline justify-between mb-2">
                  <span className="text-sm font-semibold text-foreground/90">{s.label}</span>
                  <span className={`text-xs font-bold ${t.text}`}>{s.level}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/8 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${t.bar} skill-bar`}
                    style={{ "--skill-w": `${s.level}%`, boxShadow: `0 0 8px ${t.glow}` } as React.CSSProperties}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* marquee strip below cards */}
      <div className="mt-20 reveal-child" style={{ "--reveal-delay": "0.6s" } as React.CSSProperties}>
        <TechMarquee />
      </div>
    </section>
  );
}