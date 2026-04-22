import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Mail, Github, Linkedin, Phone, MapPin } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const socials = [
  { label: "GitHub", icon: Github, href: "https://github.com/adityatomar4877-rgb", color: "oklch(0.73 0.22 48)" },
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/aditya-tomar-b41654387", color: "oklch(0.80 0.17 185)" },
  { label: "Phone", icon: Phone, href: "tel:+919755745209", color: "oklch(0.72 0.17 142)" },
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@._";
const CYCLE_WORDS = ["Build", "Create", "Ship", "Design", "Solve"];

function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || triggered.current) return;
    el.textContent = text;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || triggered.current) return;
        triggered.current = true;
        obs.disconnect();

        let iteration = 0;
        const totalFrames = text.length * 3;
        const id = setInterval(() => {
          el.textContent = text
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < iteration / 3) return char;
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("");
          iteration++;
          if (iteration > totalFrames) clearInterval(id);
        }, 40);
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [text]);

  return <span ref={ref} className={className}>{text}</span>;
}

function CyclingWord() {
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");

  useEffect(() => {
    const id = setInterval(() => {
      setPhase("out");
      setTimeout(() => {
        setIdx((i) => (i + 1) % CYCLE_WORDS.length);
        setPhase("in");
        setTimeout(() => setPhase("idle"), 420);
      }, 350);
    }, 2500);
    return () => clearInterval(id);
  }, []);

  const cls =
    phase === "out" ? "word-cycling-out" :
      phase === "in" ? "word-cycling-in" : "";

  return (
    <span
      key={idx}
      className={`inline-block text-gradient-primary ${cls}`}
      style={{ minWidth: "3ch" }}
    >
      {CYCLE_WORDS[idx]}
    </span>
  );
}

export function Connect() {
  const sectionRef = useScrollReveal();

  return (
    <section
      id="connect"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="reveal relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="h-[500px] w-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, oklch(0.73 0.22 48 / 0.07) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
      </div>
      <div
        className="absolute bottom-0 right-0 h-[350px] w-[350px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, oklch(0.80 0.17 185 / 0.05) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="relative max-w-3xl mx-auto text-center">
        {/* Label */}
        <div className="reveal-child" style={{ "--reveal-delay": "0s" } as React.CSSProperties}>
          <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-5 font-mono" style={{ color: "oklch(0.73 0.22 48)" }}>
            // get in touch
          </p>

          {/* Headline with cycling word */}
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-3 leading-[1.0]">
            Let's{" "}
            <span className="h-[1.15em] inline-block overflow-hidden align-bottom" style={{ minWidth: "3ch" }}>
              <CyclingWord />
            </span>
          </h2>

          {/* Subtitle */}
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8">
            Something{" "}
            <ScrambleText text="Amazing" className="text-gradient-duo" />
          </h3>

          <p className="text-sm md:text-base text-muted-foreground mb-12 max-w-md mx-auto leading-relaxed font-mono">
            Open to internships, freelance work, and hackathon collabs. Have a project or just want to say hi?
          </p>
        </div>

        {/* Email CTA */}
        <div className="reveal-child" style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}>
          <a
            href="mailto:adityatomar4877@gmail.com"
            className="group inline-flex items-center gap-3 rounded-2xl px-8 py-4 text-sm font-semibold shadow-glow transition-smooth hover:opacity-90 mb-12"
            style={{
              background: "var(--gradient-primary)",
              color: "oklch(0.09 0.01 30)",
            }}
          >
            <Mail className="h-4 w-4 transition-transform group-hover:scale-110" />
            <span className="font-mono">adityatomar4877@gmail.com</span>
          </a>
        </div>

        {/* Divider */}
        <div
          className="h-px w-1/2 mx-auto mb-10 reveal-child"
          style={{
            "--reveal-delay": "0.20s",
            background: "linear-gradient(to right, transparent, oklch(0.73 0.22 48 / 0.3), oklch(0.80 0.17 185 / 0.3), transparent)",
          } as React.CSSProperties}
        />

        {/* Social links */}
        <div
          className="flex items-center justify-center gap-3 reveal-child"
          style={{ "--reveal-delay": "0.28s" } as React.CSSProperties}
        >
          {socials.map(({ label, icon: Icon, href, color }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="group glass-btn flex h-12 w-12 items-center justify-center rounded-2xl transition-smooth"
              style={{ borderColor: `${color}22` }}
            >
              <Icon
                className="h-4 w-4 transition-all duration-300 group-hover:scale-110"
                style={{ color: "oklch(0.58 0.020 60)" }}
                onMouseEnter={(e) => { (e.currentTarget as SVGElement).style.color = color; }}
                onMouseLeave={(e) => { (e.currentTarget as SVGElement).style.color = "oklch(0.58 0.020 60)"; }}
              />
            </a>
          ))}
        </div>

        {/* Location */}
        <p
          className="mt-7 flex items-center justify-center gap-1.5 text-xs text-muted-foreground font-mono reveal-child"
          style={{ "--reveal-delay": "0.34s" } as React.CSSProperties}
        >
          <MapPin className="h-3 w-3" style={{ color: "oklch(0.73 0.22 48)" }} />
          Gwalior, Madhya Pradesh, India
        </p>

        {/* Footer */}
        <p
          className="mt-10 text-xs font-mono reveal-child"
          style={{
            "--reveal-delay": "0.40s",
            color: "oklch(0.35 0.008 60)",
          } as React.CSSProperties}
        >
          Designed &amp; built by Aditya · {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}