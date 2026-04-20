import { useEffect, useRef } from "react";
import { Mail, Quote, ArrowDown } from "lucide-react";
import heroCharacter from "@/assets/hero-character.png";
import { useCountUp } from "@/hooks/useCountUp";

const TILT_DEG = 72;
const TILT_RAD = (TILT_DEG * Math.PI) / 180;

const BADGES = [
  { label: "React", tone: "orange", radiusX: 195, speed: 0.45, startAngle: 0 },
  { label: "TS", tone: "blue", radiusX: 195, speed: 0.45, startAngle: 120 },
  { label: "Node", tone: "green", radiusX: 195, speed: 0.45, startAngle: 240 },
  { label: "Next", tone: "yellow", radiusX: 130, speed: 0.65, startAngle: 60 },
  { label: "Python", tone: "pink", radiusX: 130, speed: 0.65, startAngle: 220 },
] as const;

const TONE_GRADIENT: Record<string, string> = {
  orange: "linear-gradient(135deg, oklch(0.7 0.21 45), oklch(0.78 0.19 55))",
  blue: "linear-gradient(135deg, oklch(0.52 0.20 250), oklch(0.68 0.17 240))",
  yellow: "linear-gradient(135deg, oklch(0.82 0.19 88), oklch(0.72 0.19 68))",
  green: "linear-gradient(135deg, oklch(0.62 0.19 148), oklch(0.72 0.17 138))",
  pink: "linear-gradient(135deg, oklch(0.68 0.20 330), oklch(0.78 0.18 315))",
};
const TONE_SHADOW: Record<string, string> = {
  orange: "0 0 24px 6px oklch(0.7 0.21 45 / 0.6)",
  blue: "0 0 24px 6px oklch(0.55 0.18 250 / 0.55)",
  yellow: "0 0 24px 6px oklch(0.82 0.19 88 / 0.50)",
  green: "0 0 24px 6px oklch(0.65 0.18 150 / 0.55)",
  pink: "0 0 24px 6px oklch(0.68 0.20 330 / 0.55)",
};

function StatCounter({ value, label }: { value: string; label: string }) {
  const { ref, display } = useCountUp(value);
  return (
    <div>
      <p ref={ref as React.RefObject<HTMLParagraphElement>}
        className="text-2xl font-bold text-gradient-primary tabular-nums">{display}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

export function Hero({ name, role }: { name: string; role: string }) {
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    function frame(ts: number) {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = (ts - startRef.current) / 1000;
      BADGES.forEach((b, i) => {
        const el = badgeRefs.current[i];
        if (!el) return;
        const angle = (b.startAngle * Math.PI) / 180 + elapsed * b.speed * (Math.PI / 180) * 60;
        const x = b.radiusX * Math.cos(angle);
        const y = b.radiusX * Math.cos(TILT_RAD) * Math.sin(angle);
        const depth = Math.sin(angle);
        const scale = 0.72 + 0.28 * (depth + 1) / 2;
        const opacity = 0.40 + 0.60 * (depth + 1) / 2;
        el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.zIndex = depth > 0 ? "20" : "2";
      });
      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-32 pb-12 px-6 md:px-12 lg:px-20">
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute -top-40 -right-20 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-40 h-[400px] w-[400px] rounded-full bg-[oklch(0.55_0.18_250)]/5 blur-3xl pointer-events-none" />

      <div className="relative grid lg:grid-cols-2 gap-10 items-center max-w-7xl mx-auto">
        {/* LEFT */}
        <div className="hero-copy">
          <div className="inline-flex items-center gap-2 glass-card rounded-full px-4 py-2 mb-6">
            <span className="h-2 w-2 rounded-full bg-[oklch(0.72_0.17_138)] animate-pulse" />
            <span className="text-xs font-medium text-muted-foreground">Open to opportunities</span>
          </div>
          <p className="text-lg md:text-xl text-muted-foreground mb-2">
            Hey, I am <span className="text-primary font-semibold">{name}</span>
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6">
            <span className="text-gradient-primary">{role}</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-md mb-10">
            CS student building scalable web platforms and AI-powered automation tools. Strong interest in intelligent software systems and developer tooling.
          </p>
          <div className="flex items-center gap-3 mb-10">
            <a href="#connect" className="rounded-full bg-gradient-primary px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-glow transition-smooth hover:opacity-90">Hire Me</a>
            <a href="#projects" className="glass-btn rounded-full px-7 py-3.5 text-base font-semibold transition-smooth hover:text-primary">See Work</a>
            <a href="mailto:adityatomar4877@gmail.com" aria-label="Email" className="glass-btn flex h-12 w-12 items-center justify-center rounded-full">
              <Mail className="h-5 w-5" />
            </a>
          </div>
          {/* Animated counters */}
          <div className="flex items-center gap-8 mb-10 divide-x divide-border/40">
            <StatCounter value="4" label="Projects" />
            <div className="pl-8"><StatCounter value="2029" label="Graduating" /></div>
            <div className="pl-8"><StatCounter value="3" label="Hackathons" /></div>
          </div>
          <div className="h-px w-3/4 bg-gradient-to-r from-border to-transparent mb-8" />
          <div className="glass-card max-w-md rounded-2xl p-5">
            <Quote className="h-6 w-6 text-primary mb-2" />
            <p className="text-sm text-foreground/90 leading-relaxed mb-4">
              3rd Runner-Up at HackSetu 24-Hour Hackathon. CTF Winner at Amity Coding Club. Building real products that solve real problems.
            </p>
            <div className="flex items-center gap-3 pt-3 border-t border-white/10">
              <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">AT</div>
              <div>
                <p className="text-sm font-semibold">Aditya Tomar</p>
                <p className="text-xs text-muted-foreground">Amity University MP · CS '29</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — orbiting */}
        <div className="relative h-[500px] md:h-[600px] lg:h-[680px] flex items-center justify-center">
          <div className="absolute inset-12 rounded-full bg-primary/18 blur-3xl" style={{ zIndex: 1 }} />
          <div className="absolute rounded-full border border-primary/14 pointer-events-none"
            style={{ width: "390px", height: "390px", transform: `scaleY(${Math.cos(TILT_RAD).toFixed(3)})`, zIndex: 3 }} />
          <div className="absolute rounded-full border border-primary/8 pointer-events-none"
            style={{ width: "265px", height: "265px", transform: `scaleY(${Math.cos(TILT_RAD).toFixed(3)})`, zIndex: 3 }} />
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            {BADGES.map((b, i) => (
              <div key={b.label} ref={(el) => { badgeRefs.current[i] = el; }}
                className="absolute top-1/2 left-1/2 flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-2xl text-sm md:text-base font-bold text-white border border-white/20"
                style={{ background: TONE_GRADIENT[b.tone], boxShadow: TONE_SHADOW[b.tone], willChange: "transform, opacity" }}>
                {b.label}
              </div>
            ))}
          </div>
          <img src={heroCharacter} alt="Aditya Tomar"
            className="relative max-h-full w-auto object-contain drop-shadow-[0_30px_60px_rgba(255,120,40,0.35)]"
            style={{ zIndex: 10 }} />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 animate-bounce">
        <ArrowDown className="h-4 w-4" />
        <span className="text-xs">Scroll</span>
      </div>
    </section>
  );
}