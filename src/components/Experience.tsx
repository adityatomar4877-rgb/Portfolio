import type React from "react";
import { useEffect, useRef } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { RevealText } from "@/components/RevealText";

const timeline = [
  {
    role: "Technical Team Member", company: "Amity Coding Club · Amity University MP", period: "Present", tone: "orange",
    points: ["Organise coding competitions, CTF events, and technical workshops.", "Help Club with technical Events."],
  },
  {
    role: "HackSetu — 3rd Runner-Up", company: "24-Hour Hackathon", period: "2024", tone: "blue",
    points: ["Built a working prototype and shipped core features under 24-hour time pressure.", "Demonstrated rapid full-stack skills across design, backend, and deployment."],
  },
  {
    role: "CTF — Winner", company: "Amity Coding Club", period: "2024", tone: "green",
    points: ["Solved challenges in cryptography, web exploitation, and binary debugging.", "Ranked 1st among all participants across competitive security challenges."],
  },
  {
    role: "Brand Combat Winner · Ideathon 2nd Prize", company: "SISTec University Bhopal · Science Day", period: "2023–24", tone: "pink",
    points: ["Won the Brand Combat competition at SISTec University, Bhopal.", "Secured 2nd prize at the Ideathon and Science Day Model Presentation."],
  },
];

const toneDot: Record<string, string> = {
  orange: "bg-primary shadow-[0_0_12px_oklch(0.7_0.21_45/0.7)]",
  blue: "bg-[oklch(0.62_0.20_250)] shadow-[0_0_12px_oklch(0.6_0.2_250/0.6)]",
  green: "bg-[oklch(0.65_0.19_148)] shadow-[0_0_12px_oklch(0.65_0.19_148/0.6)]",
  pink: "bg-[oklch(0.68_0.20_330)] shadow-[0_0_12px_oklch(0.68_0.20_330/0.6)]",
};
const toneLabel: Record<string, string> = {
  orange: "text-primary",
  blue: "text-[oklch(0.72_0.18_230)]",
  green: "text-[oklch(0.72_0.17_138)]",
  pink: "text-[oklch(0.78_0.18_315)]",
};

/** Self-drawing vertical line using height transition */
function DrawLine() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("line-drawn");
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="absolute left-0 top-0 w-px overflow-hidden" style={{ height: "100%" }}>
      <div ref={ref} className="timeline-draw-line w-full bg-gradient-to-b from-primary/60 via-border to-transparent" />
    </div>
  );
}

export function Experience() {
  const sectionRef = useScrollReveal();
  return (
    <section id="experience" ref={sectionRef as React.RefObject<HTMLElement>}
      className="reveal relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="absolute top-1/3 right-0 h-80 w-80 rounded-full bg-[oklch(0.55_0.18_250)]/5 blur-3xl pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <div className="mb-16 reveal-child" style={{ "--reveal-delay": "0s" } as React.CSSProperties}>
          <p className="text-sm font-semibold tracking-widest text-primary uppercase mb-3">Where I've been</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold">
            Experience &{" "}
            <RevealText text="Achievements" wordClass="text-gradient-primary" baseDelay={200} />
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Education card */}
          <div className="glass-card rounded-2xl p-6 md:p-7 border border-primary/20 reveal-child reveal-from-left"
            style={{ "--reveal-delay": "0.08s" } as React.CSSProperties}>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-10 w-10 rounded-xl bg-gradient-primary flex items-center justify-center text-lg">🎓</div>
              <div>
                <p className="text-xs font-semibold text-primary uppercase tracking-wider">Education</p>
                <h3 className="text-base font-bold">B.Tech Computer Science</h3>
              </div>
            </div>
            <p className="text-sm font-semibold text-primary mb-1">Amity University Madhya Pradesh</p>
            <p className="text-xs text-muted-foreground mb-4">Expected Graduation: 2029</p>
            <div className="flex flex-wrap gap-2">
              {["Full Stack Dev", "Data Structures", "OS", "AI/ML Fundamentals"].map((area) => (
                <span key={area} className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">{area}</span>
              ))}
            </div>
          </div>

          {/* Timeline with self-drawing line */}
          <div className="relative pl-8 reveal-child reveal-from-right"
            style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}>
            <DrawLine />
            <div className="space-y-7">
              {timeline.map((item, i) => (
                <div key={item.role} className="relative reveal-child"
                  style={{ "--reveal-delay": `${0.16 + 0.12 * i}s` } as React.CSSProperties}>
                  <div className={`absolute -left-8 top-1.5 h-3 w-3 rounded-full ${toneDot[item.tone]} -translate-x-[5px]`} />
                  <div className="glass-card rounded-xl p-4">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-0.5">
                      <h3 className="text-sm font-bold leading-snug">{item.role}</h3>
                      <span className="text-xs text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full shrink-0">{item.period}</span>
                    </div>
                    <p className={`text-xs font-semibold mb-2 ${toneLabel[item.tone]}`}>{item.company}</p>
                    <ul className="space-y-1">
                      {item.points.map((pt) => (
                        <li key={pt} className="flex items-start gap-2 text-xs text-muted-foreground leading-relaxed">
                          <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${toneDot[item.tone]}`} />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}