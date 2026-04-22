import type React from "react";
import { useRef, useState } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { RevealText } from "@/components/RevealText";
import manMitraImg from "@/assets/manmitra.png";
import jeevanamritImg from "@/assets/jeevanamrit.png";
import qaBotImg from "@/assets/qabot.png";
import amityConnectImg from "@/assets/amityconnect.png";




// ── Add your screenshot imports here once you place images in src/assets/ ──
// import amityConnectImg from "@/assets/amityconnect.png";
// import manMitraImg     from "@/assets/manmitra.png";
// import qaBotImg        from "@/assets/qabot.png";
// import jeevanamritImg  from "@/assets/jeevanamrit.png";

const projects = [
  {
    title: "AmityConnect",
    subtitle: "Smart Campus Safety Platform",
    desc: "Campus safety platform with SOS emergency alerts, ride sharing, and a peer service marketplace. Real-time location-based emergency response.",
    tags: ["Next.js", "Firebase", "Tailwind CSS"],
    live: "amityconnect.vercel.app",
    github: "#",
    tone: "orange",
    year: "2026",
    num: "01",
    image: amityConnectImg,
  },
  {
    title: "ManMitra",
    subtitle: "Student Mental Health Support",
    desc: "Mental wellness platform with counseling sessions, peer support, and mood tracking. AI support assistant and real-time appointment booking.",
    tags: ["React", "TypeScript", "Supabase", "Tailwind CSS"],
    live: "man-mitra-weld.vercel.app",
    github: "#",
    tone: "teal",
    year: "2025",
    num: "02",
    image: manMitraImg,
  },
  {
    title: "Autonomous QA Bot",
    subtitle: "AI UI Testing Agent",
    desc: "Converts natural language test instructions into executable browser tests with self-healing element detection and auto-generated bug reports.",
    tags: ["Playwright", "Node.js", "AI Integration"],
    live: "",
    github: "#",
    tone: "green",
    year: "2026",
    num: "03",
    image: qaBotImg,
  },
  {
    title: "Jeevanamrit",
    subtitle: "Ayurvedic Health Dashboard",
    desc: "Wellness dashboard for doctors and patients. Dosha-based diet planning, Ayurvedic health questionnaires, and clinical reporting.",
    tags: ["React", "TypeScript", "Supabase"],
    live: "",
    github: "#",
    tone: "pink",
    year: "2025",
    num: "04",
    image: jeevanamritImg,
  },
];

const TONE: Record<string, { text: string; border: string; bg: string; grad: string }> = {
  orange: {
    text: "oklch(0.78 0.21 50)",
    border: "oklch(0.73 0.22 48 / 0.25)",
    bg: "oklch(0.73 0.22 48 / 0.10)",
    grad: "linear-gradient(135deg, oklch(0.73 0.22 48 / 0.20), oklch(0.80 0.20 55 / 0.06))",
  },
  teal: {
    text: "oklch(0.80 0.17 185)",
    border: "oklch(0.80 0.17 185 / 0.25)",
    bg: "oklch(0.80 0.17 185 / 0.10)",
    grad: "linear-gradient(135deg, oklch(0.80 0.17 185 / 0.20), oklch(0.80 0.17 185 / 0.06))",
  },
  green: {
    text: "oklch(0.72 0.17 142)",
    border: "oklch(0.65 0.18 148 / 0.25)",
    bg: "oklch(0.65 0.18 148 / 0.10)",
    grad: "linear-gradient(135deg, oklch(0.65 0.18 148 / 0.20), oklch(0.65 0.18 148 / 0.06))",
  },
  pink: {
    text: "oklch(0.75 0.19 322)",
    border: "oklch(0.68 0.20 330 / 0.25)",
    bg: "oklch(0.68 0.20 330 / 0.10)",
    grad: "linear-gradient(135deg, oklch(0.68 0.20 330 / 0.20), oklch(0.68 0.20 330 / 0.06))",
  },
};

function TiltCard({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width / 2) / (r.width / 2);
    const dy = (e.clientY - r.top - r.height / 2) / (r.height / 2);
    el.style.transform = `perspective(900px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg) scale(1.012)`;
  };
  const onLeave = () => {
    if (cardRef.current) cardRef.current.style.transform = "perspective(900px) rotateY(0) rotateX(0) scale(1)";
  };
  return (
    <div ref={cardRef} onMouseMove={onMove} onMouseLeave={onLeave} className={className}
      style={{ transition: "transform 0.18s ease-out", willChange: "transform", ...style }}>
      {children}
    </div>
  );
}

function ProjectPreview({ image, grad, text, num, live, github, toneColor }: {
  image: string; grad: string; text: string; num: string;
  live: string; github: string; toneColor: string;
}) {
  const [imgError, setImgError] = useState(false);
  const showImg = !!image && !imgError;

  return (
    <div className="relative w-full rounded-xl overflow-hidden mb-5" style={{ aspectRatio: "16/9" }}>
      {/* Browser chrome */}
      <div
        className="absolute top-0 left-0 right-0 z-10 flex items-center gap-2 px-3"
        style={{
          height: "28px",
          background: "oklch(0.13 0.01 30 / 0.95)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid oklch(1 0 0 / 0.06)",
        }}
      >
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "oklch(0.62 0.20 25)" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "oklch(0.76 0.16 68)" }} />
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: "oklch(0.63 0.16 142)" }} />
        </div>
        <div
          className="flex-1 rounded-md px-2 font-mono truncate"
          style={{
            background: "oklch(0.18 0.01 30)",
            color: "oklch(0.45 0.01 60)",
            fontSize: "10px",
            lineHeight: "18px",
            height: "18px",
          }}
        >
          ● &nbsp;{live || "localhost:3000"}
        </div>
      </div>

      {/* Content */}
      <div className="absolute inset-0 pt-[28px]">
        {showImg ? (
          <img
            src={image}
            alt="Project preview"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-top"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center" style={{ background: grad }}>
            <span
              className="font-mono font-bold select-none"
              style={{ fontSize: "6rem", lineHeight: 1, color: "transparent", WebkitTextStroke: `1px ${text}2a`, letterSpacing: "-0.04em" }}
            >
              {num}
            </span>
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase mt-2" style={{ color: `${text}44` }}>
              screenshot coming soon
            </span>
          </div>
        )}
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to top, oklch(0.10 0.01 30 / 0.6), transparent)" }} />
      </div>

      {/* Action links */}
      <div className="absolute bottom-3 right-3 z-20 flex gap-2">
        {live && (
          <a href={`https://${live}`} target="_blank" rel="noreferrer"
            className="glass-btn text-xs px-3 py-1.5 rounded-full font-medium font-mono transition-smooth"
            style={{ color: toneColor }}>
            live ↗
          </a>
        )}
        <a href={github}
          className="glass-btn text-xs px-3 py-1.5 rounded-full font-medium font-mono hover:text-primary transition-smooth">
          github
        </a>
      </div>
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
      <div className="absolute top-1/2 left-0 -translate-y-1/2 h-[500px] w-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.73 0.22 48 / 0.04) 0%, transparent 70%)", filter: "blur(40px)" }} />

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
          <a href="https://github.com/adityatomar4877-rgb" target="_blank" rel="noreferrer"
            className="hidden md:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-smooth font-mono">
            github.com/adityatomar4877-rgb <span style={{ marginLeft: "4px" }}>↗</span>
          </a>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p, i) => {
            const t = TONE[p.tone];
            return (
              <TiltCard
                key={p.title}
                // @ts-ignore
                className={`project-card glass-card rounded-2xl p-5 border group reveal-child ${i % 2 === 0 ? "reveal-from-left" : "reveal-from-right"}`}
                style={{ "--reveal-delay": `${0.1 * i}s`, borderColor: t.border } as React.CSSProperties}
              >
                <ProjectPreview
                  image={p.image}
                  grad={t.grad}
                  text={t.text}
                  num={p.num}
                  live={p.live}
                  github={p.github}
                  toneColor={t.text}
                />

                <div>
                  <span className="font-mono text-xs mb-1.5 block" style={{ color: t.text }}>{p.year}</span>
                  <h3 className="text-lg font-bold mb-0.5 group-hover:text-primary transition-smooth"
                    style={{ color: "oklch(0.94 0.018 70)" }}>
                    {p.title}
                  </h3>
                  <p className="text-xs font-semibold mb-3 font-mono" style={{ color: t.text }}>{p.subtitle}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full font-medium font-mono"
                        style={{ background: t.bg, color: t.text }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}