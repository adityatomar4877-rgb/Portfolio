import type React from "react";
import { useEffect, useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { RevealText } from "@/components/RevealText";

const timeline = [
  {
    role: "Technical Team Member",
    company: "Amity Coding Club · Amity University MP",
    period: "Present",
    tone: "orange",
    points: [
      "Organise coding competitions, CTF events, and technical workshops.",
      "Help Club with technical Events.",
    ],
  },
  {
    role: "HackSetu — 3rd Runner-Up",
    company: "24-Hour Hackathon",
    period: "2024",
    tone: "teal",
    points: [
      "Built a working prototype and shipped core features under 24-hour time pressure.",
      "Demonstrated rapid full-stack skills across design, backend, and deployment.",
    ],
  },
  {
    role: "CTF — Winner",
    company: "Amity Coding Club",
    period: "2024",
    tone: "green",
    points: [
      "Solved challenges in cryptography, web exploitation, and binary debugging.",
      "Ranked 1st among all participants across competitive security challenges.",
    ],
  },
  {
    role: "Brand Combat Winner · Ideathon 2nd Prize",
    company: "SISTec University Bhopal · Science Day",
    period: "2023–24",
    tone: "pink",
    points: [
      "Won the Brand Combat competition at SISTec University, Bhopal.",
      "Secured 2nd prize at the Ideathon and Science Day Model Presentation.",
    ],
  },
];

const TONE: Record<string, { dot: string; glow: string; text: string; bg: string; border: string }> = {
  orange: {
    dot: "oklch(0.73 0.22 48)",
    glow: "0 0 12px oklch(0.73 0.22 48 / 0.7)",
    text: "oklch(0.78 0.21 50)",
    bg: "oklch(0.73 0.22 48 / 0.08)",
    border: "oklch(0.73 0.22 48 / 0.20)",
  },
  teal: {
    dot: "oklch(0.80 0.17 185)",
    glow: "0 0 12px oklch(0.80 0.17 185 / 0.65)",
    text: "oklch(0.80 0.17 185)",
    bg: "oklch(0.80 0.17 185 / 0.08)",
    border: "oklch(0.80 0.17 185 / 0.20)",
  },
  green: {
    dot: "oklch(0.65 0.18 148)",
    glow: "0 0 12px oklch(0.65 0.18 148 / 0.65)",
    text: "oklch(0.72 0.17 142)",
    bg: "oklch(0.65 0.18 148 / 0.08)",
    border: "oklch(0.65 0.18 148 / 0.20)",
  },
  pink: {
    dot: "oklch(0.68 0.20 330)",
    glow: "0 0 12px oklch(0.68 0.20 330 / 0.65)",
    text: "oklch(0.75 0.19 322)",
    bg: "oklch(0.68 0.20 330 / 0.08)",
    border: "oklch(0.68 0.20 330 / 0.20)",
  },
};

function DrawLine() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("line-drawn"); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div className="absolute left-0 top-0 w-px overflow-hidden" style={{ height: "100%" }}>
      <div
        ref={ref}
        className="timeline-draw-line w-full"
        style={{ background: "linear-gradient(to bottom, oklch(0.73 0.22 48 / 0.5), oklch(0.80 0.17 185 / 0.3), transparent)" }}
      />
    </div>
  );
}

export function Experience() {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="experience"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="reveal relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Background decorations */}
      <div
        className="absolute top-1/3 right-0 h-80 w-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.80 0.17 185 / 0.05) 0%, transparent 70%)", filter: "blur(50px)" }}
      />

      {/* Watermark year */}
      <div
        className="absolute top-16 right-8 select-none pointer-events-none"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "clamp(6rem, 18vw, 16rem)",
          fontWeight: 700,
          color: "transparent",
          WebkitTextStroke: "1px oklch(1 0 0 / 0.03)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
        }}
      >
        2024
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 reveal-child" style={{ "--reveal-delay": "0s" } as React.CSSProperties}>
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-3 font-mono" style={{ color: "oklch(0.73 0.22 48)" }}>
            // where I've been
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Experience &{" "}
            <RevealText text="Achievements" wordClass="text-gradient-duo" baseDelay={200} />
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Education card */}
          <div
            className="glass-card rounded-2xl p-6 md:p-7 reveal-child reveal-from-left"
            style={{
              "--reveal-delay": "0.08s",
              borderColor: "oklch(0.73 0.22 48 / 0.18)",
            } as React.CSSProperties}
          >
            <div className="flex items-center gap-3 mb-5">
              <div
                className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center text-lg flex-shrink-0"
                style={{ color: "oklch(0.09 0.01 30)" }}
              >
                🎓
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] font-mono" style={{ color: "oklch(0.73 0.22 48)" }}>
                  Education
                </p>
                <h3 className="text-base font-bold">B.Tech Computer Science</h3>
              </div>
            </div>

            <p className="text-sm font-bold mb-1" style={{ color: "oklch(0.73 0.22 48)" }}>
              Amity University Madhya Pradesh
            </p>
            <p className="text-xs text-muted-foreground mb-5 font-mono">
              Expected Graduation: 2029
            </p>

            <div className="flex flex-wrap gap-2">
              {["Full Stack Dev", "Data Structures", "OS", "AI/ML Fundamentals"].map((area) => (
                <span
                  key={area}
                  className="text-xs px-2.5 py-1 rounded-full font-medium font-mono"
                  style={{ background: "oklch(0.73 0.22 48 / 0.10)", color: "oklch(0.78 0.21 50)" }}
                >
                  {area}
                </span>
              ))}
            </div>

            {/* Decorative metric */}
            <div
              className="mt-5 flex items-center gap-4 pt-5"
              style={{ borderTop: "1px solid oklch(0.73 0.22 48 / 0.12)" }}
            >
              {[
                { val: "4th", label: "Semester", color: "orange" },
                { val: "CS", label: "Branch", color: "teal" },
                { val: "'29", label: "Batch", color: "green" },
              ].map((m) => {
                const t = TONE[m.color];
                return (
                  <div key={m.label} className="text-center flex-1">
                    <p className="text-lg font-bold font-mono" style={{ color: t.text }}>{m.val}</p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-mono">{m.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Timeline */}
          <div
            className="relative pl-8 reveal-child reveal-from-right"
            style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}
          >
            <DrawLine />
            <div className="space-y-6">
              {timeline.map((item, i) => {
                const t = TONE[item.tone];
                return (
                  <div
                    key={item.role}
                    className="relative reveal-child"
                    style={{ "--reveal-delay": `${0.16 + 0.12 * i}s` } as React.CSSProperties}
                  >
                    {/* Timeline dot */}
                    <div
                      className="absolute -left-8 top-3.5 h-3 w-3 rounded-full -translate-x-[5px]"
                      style={{ background: t.dot, boxShadow: t.glow }}
                    />

                    {/* Card */}
                    <div
                      className="glass-card rounded-xl p-4"
                      style={{ borderColor: t.border }}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <h3 className="text-sm font-bold leading-snug">{item.role}</h3>
                        <span
                          className="text-xs px-2 py-0.5 rounded-full shrink-0 font-mono"
                          style={{ background: t.bg, color: t.text }}
                        >
                          {item.period}
                        </span>
                      </div>
                      <p className="text-xs font-semibold mb-3 font-mono" style={{ color: t.text }}>
                        {item.company}
                      </p>
                      <ul className="space-y-1.5">
                        {item.points.map((pt) => (
                          <li key={pt} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                            <span
                              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full flex-shrink-0"
                              style={{ background: t.dot, boxShadow: t.glow }}
                            />
                            {pt}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}