import { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import heroCharacter from "@/assets/hero-character.png";
import { useCountUp } from "@/hooks/useCountUp";

const TILT_DEG = 72;
const TILT_RAD = (TILT_DEG * Math.PI) / 180;

const BADGES = [
  { label: "React", tone: "orange", radiusX: 195, speed: 0.42, startAngle: 0 },
  { label: "TS", tone: "teal", radiusX: 195, speed: 0.42, startAngle: 120 },
  { label: "Node", tone: "green", radiusX: 195, speed: 0.42, startAngle: 240 },
  { label: "Next", tone: "yellow", radiusX: 130, speed: 0.62, startAngle: 60 },
  { label: "Python", tone: "pink", radiusX: 130, speed: 0.62, startAngle: 220 },
] as const;

const TONE_GRADIENT: Record<string, string> = {
  orange: "linear-gradient(135deg, oklch(0.73 0.22 48), oklch(0.80 0.20 55))",
  teal: "linear-gradient(135deg, oklch(0.72 0.18 185), oklch(0.82 0.15 195))",
  yellow: "linear-gradient(135deg, oklch(0.82 0.19 88), oklch(0.72 0.19 68))",
  green: "linear-gradient(135deg, oklch(0.62 0.19 148), oklch(0.72 0.17 138))",
  pink: "linear-gradient(135deg, oklch(0.68 0.20 330), oklch(0.78 0.18 315))",
};
const TONE_SHADOW: Record<string, string> = {
  orange: "0 0 20px 5px oklch(0.73 0.22 48 / 0.55)",
  teal: "0 0 20px 5px oklch(0.75 0.17 185 / 0.55)",
  yellow: "0 0 20px 5px oklch(0.82 0.19 88 / 0.45)",
  green: "0 0 20px 5px oklch(0.65 0.18 150 / 0.50)",
  pink: "0 0 20px 5px oklch(0.68 0.20 330 / 0.50)",
};

const ROLE_WORDS = ["Developer", "Builder", "Engineer", "Creator", "Gamer"];

function StatCounter({ value, label, accent }: { value: string; label: string; accent?: "teal" }) {
  const { ref, display } = useCountUp(value);
  return (
    <div className="text-center">
      <p
        ref={ref as React.RefObject<HTMLParagraphElement>}
        className={`text-2xl font-bold tabular-nums ${accent === "teal" ? "text-teal" : "text-gradient-primary"}`}
      >
        {display}
      </p>
      <p className="text-xs text-muted-foreground mt-0.5 font-mono tracking-wide">{label}</p>
    </div>
  );
}

function MagneticBtn({
  children, className, href, ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { children: React.ReactNode }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.38;
    const y = (e.clientY - r.top - r.height / 2) * 0.38;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };
  return (
    <a ref={ref} href={href} onMouseMove={onMove} onMouseLeave={onLeave}
      className={className} style={{ transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)" }} {...props}>
      {children}
    </a>
  );
}

export function Hero({ name, role: _role }: { name: string; role: string }) {
  const badgeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Cycling role words
  const [roleIdx, setRoleIdx] = useState(0);
  const [cycling, setCycling] = useState<"in" | "out" | "idle">("idle");

  useEffect(() => {
    const id = setInterval(() => {
      setCycling("out");
      setTimeout(() => {
        setRoleIdx((i) => (i + 1) % ROLE_WORDS.length);
        setCycling("in");
        setTimeout(() => setCycling("idle"), 450);
      }, 350);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  // Orbital badges
  useEffect(() => {
    function frame(ts: number) {
      if (startRef.current === null) startRef.current = ts;
      const elapsed = (ts - startRef.current) / 1000;
      BADGES.forEach((b, i) => {
        const el = badgeRefs.current[i]; if (!el) return;
        const angle = (b.startAngle * Math.PI) / 180 + elapsed * b.speed * (Math.PI / 180) * 60;
        const x = b.radiusX * Math.cos(angle);
        const y = b.radiusX * Math.cos(TILT_RAD) * Math.sin(angle);
        const depth = Math.sin(angle);
        const scale = 0.72 + 0.28 * (depth + 1) / 2;
        const opacity = 0.45 + 0.55 * (depth + 1) / 2;
        el.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.zIndex = depth > 0 ? "20" : "2";
      });
      rafRef.current = requestAnimationFrame(frame);
    }
    rafRef.current = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Parallax on scroll
  useEffect(() => {
    const onScroll = () => {
      const el = heroRef.current; if (!el) return;
      const y = window.scrollY;
      el.style.transform = `translateY(${y * 0.22}px)`;
      el.style.opacity = String(1 - y / 650);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const wordClass =
    cycling === "out" ? "word-cycling-out" :
      cycling === "in" ? "word-cycling-in" : "";

  return (
    <section id="home" className="relative min-h-screen overflow-hidden pt-32 pb-16 px-6 md:px-12 lg:px-20 noise-overlay">
      {/* Layered background */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute -top-48 -right-24 h-[750px] w-[750px] rounded-full bg-primary/6 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 -left-40 h-[550px] w-[550px] rounded-full" style={{ background: "oklch(0.50 0.15 185 / 0.08)", filter: "blur(110px)" }} />
      <div className="absolute inset-0 hero-grid pointer-events-none opacity-40" />

      {/* Decorative diagonal lines */}
      <div className="absolute top-28 right-0 w-[40%] h-px" style={{ background: "linear-gradient(to left, transparent, oklch(0.73 0.22 48 / 0.12))" }} />
      <div className="absolute bottom-24 left-0 w-[30%] h-px" style={{ background: "linear-gradient(to right, transparent, oklch(0.80 0.17 185 / 0.12))" }} />

      <div
        ref={heroRef}
        className="relative grid lg:grid-cols-2 gap-10 items-center max-w-7xl mx-auto"
        style={{ willChange: "transform,opacity" }}
      >
        {/* ── LEFT ── */}
        <div className="hero-copy" style={{ position: "relative", zIndex: 30 }}>
          {/* Code tag */}
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="font-mono text-sm" style={{ color: "oklch(0.80 0.17 185)" }}>{"<"}</span>
            <span className="font-mono text-xs font-medium tracking-widest uppercase" style={{ color: "oklch(0.58 0.020 60)" }}>
              cs_student
            </span>
            <span className="font-mono text-sm" style={{ color: "oklch(0.80 0.17 185)" }}>{"/>"}</span>
            <span className="relative flex h-2 w-2 ml-1">
              <span className="ping-dot absolute inline-flex h-full w-full rounded-full" style={{ background: "oklch(0.72 0.17 138)" }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "oklch(0.72 0.17 138)" }} />
            </span>
            <span className="text-xs text-muted-foreground">Open to work</span>
          </div>

          {/* Name */}
          <p className="text-base md:text-lg text-muted-foreground mb-1">
            Hey, I'm{" "}
            <span className="font-bold" style={{ color: "oklch(0.80 0.17 185)" }}>{name}</span>
          </p>

          {/* Big title */}
          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.92] mb-2 tracking-tight">
            <span
              className="glitch hero-role-text block"
              data-text="Upcoming"
            >
              Upcoming
            </span>
          </h1>

          {/* Cycling word */}
          <div className="mb-6" style={{ position: "relative", zIndex: 31 }}>
            <span
              key={roleIdx}
              className={`text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.15] tracking-tight block text-stroke ${wordClass}`}
            >
              {ROLE_WORDS[roleIdx]}
            </span>
          </div>

          <p className="text-sm md:text-base text-muted-foreground max-w-md mb-10 leading-relaxed font-mono">
            CS student building scalable web platforms and AI-powered automation
            tools — strong interest in intelligent systems and developer tooling.
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3 mb-10">
            <MagneticBtn
              href="#connect"
              className="rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold shadow-glow hover:opacity-90 transition-opacity"
              style={{ color: "oklch(0.09 0.01 30)" }}
            >
              Hire Me
            </MagneticBtn>
            <MagneticBtn
              href="#projects"
              className="glass-btn rounded-full px-7 py-3.5 text-sm font-semibold hover:text-primary transition-smooth"
            >
              See Work
            </MagneticBtn>
            <MagneticBtn
              href="mailto:adityatomar4877@gmail.com"
              aria-label="Email"
              className="glass-btn flex h-12 w-12 items-center justify-center rounded-full hover:text-primary transition-smooth"
            >
              <Mail className="h-4 w-4" />
            </MagneticBtn>
          </div>

          {/* Stats */}
          <div className="hero-stats-row mb-10">
            <StatCounter value="10+" label="Projects" />
            <div className="h-8 w-px bg-border/40" />
            <StatCounter value="2029" label="Graduating" accent="teal" />
            <div className="h-8 w-px bg-border/40" />
            <StatCounter value="5+" label="Hackathons" />
          </div>

          <div className="diagonal-rule mb-8 w-3/4" />

          {/* Award badge */}
          <div className="glass-card max-w-sm rounded-2xl p-4 hero-award-card border border-primary/15">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-base">🏆</div>
              <div>
                <p className="text-sm font-bold mb-0.5">2nd Runner-Up · National Level Hackathon</p>
                <p className="text-xs text-muted-foreground leading-relaxed font-mono">
                  CTF Winner · Brand Combat Champion
                </p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3 pt-3 border-t border-white/8">
              <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold" style={{ color: "oklch(0.09 0.01 30)" }}>
                AT
              </div>
              <div>
                <p className="text-sm font-semibold">Aditya Tomar</p>
                <p className="text-xs text-muted-foreground font-mono">Amity University MP · CS '29</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT — orbiting ── */}
        <div className="relative h-[500px] md:h-[580px] lg:h-[660px] flex items-center justify-center">
          {/* Glow core */}
          <div
            className="absolute rounded-full glow-pulse"
            style={{ width: "280px", height: "280px", background: "radial-gradient(circle, oklch(0.73 0.22 48 / 0.12) 0%, transparent 70%)", zIndex: 1 }}
          />
          <div
            className="absolute rounded-full teal-pulse"
            style={{ width: "380px", height: "380px", background: "radial-gradient(circle, oklch(0.80 0.17 185 / 0.06) 0%, transparent 70%)", zIndex: 1 }}
          />

          {/* Orbit rings */}
          <div
            className="absolute rounded-full border hero-ring-spin pointer-events-none"
            style={{
              width: "400px", height: "400px",
              transform: `scaleY(${Math.cos(TILT_RAD).toFixed(3)})`,
              borderColor: "oklch(0.73 0.22 48 / 0.10)",
              zIndex: 3,
            }}
          />
          <div
            className="absolute rounded-full border hero-ring-spin-reverse pointer-events-none"
            style={{
              width: "270px", height: "270px",
              transform: `scaleY(${Math.cos(TILT_RAD).toFixed(3)})`,
              borderColor: "oklch(0.80 0.17 185 / 0.08)",
              zIndex: 3,
            }}
          />

          {/* Orbital badges */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
            {BADGES.map((b, i) => (
              <div
                key={b.label}
                ref={(el) => { badgeRefs.current[i] = el; }}
                className="absolute top-1/2 left-1/2 flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-xl text-xs md:text-sm font-bold border font-mono"
                style={{
                  background: TONE_GRADIENT[b.tone],
                  boxShadow: TONE_SHADOW[b.tone],
                  borderColor: "oklch(1 0 0 / 0.15)",
                  color: "oklch(0.09 0.01 30)",
                  willChange: "transform, opacity",
                  letterSpacing: "-0.02em",
                }}
              >
                {b.label}
              </div>
            ))}
          </div>

          {/* Character */}
          <div className="relative" style={{ zIndex: 10 }}>
            {/* Bracket frame decoration */}
            <div
              className="absolute -inset-3 pointer-events-none"
              style={{
                borderTop: "1.5px solid oklch(0.80 0.17 185 / 0.3)",
                borderLeft: "1.5px solid oklch(0.80 0.17 185 / 0.3)",
                borderRadius: "4px 0 0 0",
                top: 0, left: 0, width: "40px", height: "40px",
              }}
            />
            <div
              className="absolute pointer-events-none"
              style={{
                borderBottom: "1.5px solid oklch(0.73 0.22 48 / 0.3)",
                borderRight: "1.5px solid oklch(0.73 0.22 48 / 0.3)",
                borderRadius: "0 0 4px 0",
                bottom: 0, right: 0, width: "40px", height: "40px",
              }}
            />
            <img
              src={heroCharacter}
              alt="Aditya Tomar"
              className="relative max-h-full w-auto object-contain hero-character-float"
              style={{
                maxHeight: "420px",
                filter: "drop-shadow(0 30px 60px oklch(0.73 0.22 48 / 0.35)) drop-shadow(0 0 120px oklch(0.80 0.17 185 / 0.15))",
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="hero-scroll-mouse" />
        <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-mono">scroll</span>
      </div>
    </section>
  );
}