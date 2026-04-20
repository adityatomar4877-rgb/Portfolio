import type React from "react";
import { useEffect, useRef } from "react";
import { Mail, Github, Linkedin, Phone } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const socials = [
  { label: "GitHub", icon: Github, href: "https://github.com/adityatomar4877-rgb", tone: "hover:text-primary" },
  { label: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/aditya-tomar-b41654387", tone: "hover:text-[oklch(0.72_0.18_230)]" },
  { label: "Phone", icon: Phone, href: "tel:+919755745209", tone: "hover:text-[oklch(0.72_0.17_138)]" },
];

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@._";

/** Scrambles then resolves to `finalText` when visible */
function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || triggered.current) return;
    el.textContent = text; // set initial so layout is correct

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || triggered.current) return;
        triggered.current = true;
        observer.disconnect();

        let iteration = 0;
        const totalFrames = text.length * 3;

        const id = setInterval(() => {
          el.textContent = text
            .split("")
            .map((char, i) => {
              if (char === " ") return " ";
              if (i < iteration / 3) return char; // resolved
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("");
          iteration++;
          if (iteration > totalFrames) clearInterval(id);
        }, 40);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [text]);

  return <span ref={ref} className={className}>{text}</span>;
}

export function Connect() {
  const sectionRef = useScrollReveal();
  return (
    <section id="connect" ref={sectionRef as React.RefObject<HTMLElement>}
      className="reveal relative py-28 px-6 md:px-12 lg:px-20 overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-[600px] w-[600px] rounded-full bg-primary/8 blur-[120px]" />
      </div>

      <div className="relative max-w-3xl mx-auto text-center">
        <div className="reveal-child" style={{ "--reveal-delay": "0s" } as React.CSSProperties}>
          <p className="text-sm font-semibold tracking-widest text-primary uppercase mb-4">Get in touch</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5">
            Let's{" "}
            <ScrambleText text="Connect" className="text-gradient-primary" />
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-12 max-w-lg mx-auto">
            Open to internships, freelance work, and hackathon collaborations. Have a project or just want to say hi? My inbox is always open.
          </p>
        </div>

        <div className="reveal-child" style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}>
          <a href="mailto:adityatomar4877@gmail.com"
            className="inline-flex items-center gap-3 rounded-full bg-gradient-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-glow transition-smooth hover:opacity-90 mb-12">
            <Mail className="h-5 w-5" />
            adityatomar4877@gmail.com
          </a>
        </div>

        <div className="h-px w-1/2 mx-auto bg-gradient-to-r from-transparent via-border to-transparent mb-10 reveal-child"
          style={{ "--reveal-delay": "0.20s" } as React.CSSProperties} />

        <div className="flex items-center justify-center gap-4 reveal-child"
          style={{ "--reveal-delay": "0.28s" } as React.CSSProperties}>
          {socials.map(({ label, icon: Icon, href, tone }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
              className={`glass-btn flex h-12 w-12 items-center justify-center rounded-full text-foreground/70 transition-smooth ${tone}`}>
              <Icon className="h-5 w-5" />
            </a>
          ))}
        </div>

        <p className="mt-8 text-sm text-muted-foreground reveal-child"
          style={{ "--reveal-delay": "0.34s" } as React.CSSProperties}>
          📍 Gwalior, Madhya Pradesh, India
        </p>
        <p className="mt-10 text-xs text-muted-foreground/50 reveal-child"
          style={{ "--reveal-delay": "0.40s" } as React.CSSProperties}>
          Designed & built by Aditya · {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
}