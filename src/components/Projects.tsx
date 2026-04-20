import type React from "react";
import { useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { RevealText } from "@/components/RevealText";

const projects = [
  {
    title: "AmityConnect", subtitle: "Smart Campus Safety Platform",
    desc: "Campus safety platform with SOS emergency alerts, ride sharing, and a peer service marketplace. Real-time location-based emergency response.",
    tags: ["Next.js", "Firebase", "Tailwind CSS"], live: "amityconnect.vercel.app", github: "#",
    tone: "orange", gradient: "from-primary/20 to-primary-glow/5", year: "2024",
  },
  {
    title: "ManMitra", subtitle: "Student Mental Health Support",
    desc: "Mental wellness platform with counseling sessions, peer support, and mood tracking. AI support assistant and real-time appointment booking.",
    tags: ["React", "TypeScript", "Supabase", "Tailwind CSS"], live: "man-mitra-weld.vercel.app", github: "#",
    tone: "blue", gradient: "from-[oklch(0.52_0.20_250)]/20 to-[oklch(0.52_0.20_250)]/0", year: "2024",
  },
  {
    title: "Autonomous QA Bot", subtitle: "AI UI Testing Agent",
    desc: "Converts natural language test instructions into executable browser tests with self-healing element detection and auto-generated bug reports.",
    tags: ["Playwright", "Node.js", "AI Integration"], live: "", github: "#",
    tone: "green", gradient: "from-[oklch(0.62_0.19_148)]/20 to-[oklch(0.62_0.19_148)]/0", year: "2024",
  },
  {
    title: "Jeevanamrit", subtitle: "Ayurvedic Health Dashboard",
    desc: "Wellness dashboard for doctors and patients. Dosha-based diet planning, Ayurvedic health questionnaires, and clinical reporting.",
    tags: ["React", "TypeScript", "Supabase"], live: "", github: "#",
    tone: "pink", gradient: "from-[oklch(0.68_0.20_330)]/20 to-[oklch(0.68_0.20_330)]/0", year: "2024",
  },
];

const toneText: Record<string, string> = { orange: "text-primary", blue: "text-[oklch(0.72_0.18_230)]", green: "text-[oklch(0.72_0.17_138)]", pink: "text-[oklch(0.78_0.18_315)]" };
const toneBorder: Record<string, string> = { orange: "border-primary/30", blue: "border-[oklch(0.52_0.20_250)]/30", green: "border-[oklch(0.62_0.19_148)]/30", pink: "border-[oklch(0.68_0.20_330)]/30" };
const toneTag: Record<string, string> = { orange: "bg-primary/10 text-primary", blue: "bg-[oklch(0.52_0.20_250)]/10 text-[oklch(0.72_0.18_230)]", green: "bg-[oklch(0.62_0.19_148)]/10 text-[oklch(0.72_0.17_138)]", pink: "bg-[oklch(0.68_0.20_330)]/10 text-[oklch(0.78_0.18_315)]" };

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    el.style.transform = `perspective(800px) rotateY(${dx * 6}deg) rotateX(${-dy * 6}deg) scale(1.02)`;
  };

  const onLeave = () => {
    if (cardRef.current)
      cardRef.current.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <div ref={cardRef} onMouseMove={onMove} onMouseLeave={onLeave}
      className={className}
      style={{ transition: "transform 0.15s ease-out", willChange: "transform" }}>
      {children}
    </div>
  );
}

export function Projects() {
  const sectionRef = useScrollReveal();
  return (
    <section id="projects" ref={sectionRef as React.RefObject<HTMLElement>}
      className="reveal relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/4 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        <div className="mb-16 flex items-end justify-between reveal-child" style={{ "--reveal-delay": "0s" } as React.CSSProperties}>
          <div>
            <p className="text-sm font-semibold tracking-widest text-primary uppercase mb-3">What I've built</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
              Featured{" "}
              <RevealText text="Projects" wordClass="text-gradient-primary" baseDelay={200} />
            </h2>
          </div>
          <a href="https://github.com/adityatomar4877-rgb" target="_blank" rel="noreferrer"
            className="hidden md:flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-smooth">
            GitHub →
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((p, i) => (
            <TiltCard
              key={p.title}
              className={`project-card glass-card rounded-2xl p-6 border ${toneBorder[p.tone]} group reveal-child ${i % 2 === 0 ? "reveal-from-left" : "reveal-from-right"}`}
              // @ts-ignore
              style={{ "--reveal-delay": `${0.1 * i}s` }}
            >
              <div className={`h-36 w-full rounded-xl mb-5 bg-gradient-to-br ${p.gradient} flex items-center justify-between px-5`}>
                <span className={`text-5xl font-black opacity-25 ${toneText[p.tone]}`}>{p.title[0]}</span>
                <div className="flex gap-2">
                  {p.live && (
                    <a href={`https://${p.live}`} target="_blank" rel="noreferrer"
                      className="glass-btn text-xs px-3 py-1.5 rounded-full font-medium hover:text-primary transition-smooth">
                      Live ↗
                    </a>
                  )}
                  <a href={p.github} className="glass-btn text-xs px-3 py-1.5 rounded-full font-medium hover:text-primary transition-smooth">
                    GitHub
                  </a>
                </div>
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs font-semibold ${toneText[p.tone]}`}>{p.year}</span>
              </div>
              <h3 className={`text-lg font-bold mb-0.5 group-hover:text-primary transition-smooth`}>{p.title}</h3>
              <p className={`text-xs font-semibold mb-3 ${toneText[p.tone]}`}>{p.subtitle}</p>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((tag) => (
                  <span key={tag} className={`text-xs px-2.5 py-1 rounded-full font-medium ${toneTag[p.tone]}`}>{tag}</span>
                ))}
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}