import { useEffect, useRef, useState } from "react";
import { Mail } from "lucide-react";
import heroCharacter from "@/assets/hero-character.png";
import { useCountUp } from "@/hooks/useCountUp";

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

function scrollToSection(href: string) {
  if (!href.startsWith("#")) return;
  const id = href.slice(1);
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
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

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href?.startsWith("#")) {
      e.preventDefault();
      scrollToSection(href);
    }
  };

  return (
    <a
      ref={ref}
      href={href}
      onClick={handleClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ transition: "transform 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}
      {...props}
    >
      {children}
    </a>
  );
}

/* ─────────────────────────────────────────
   HORIZONTAL FLIP CARD
   Front : photo  |  identity + tech stack
   Back  : code snippet  |  stats + facts
───────────────────────────────────────── */
function FlipCard() {
  return (
    <div className="hfc-scene">
      <div className="hfc-card">

        {/* ══ FRONT ══ */}
        <div className="hfc-face hfc-front">
          <span className="hfc-corner hfc-corner--tl" />
          <span className="hfc-corner hfc-corner--br" />

          {/* LEFT — photo */}
          <div className="hfc-photo-col">
            <div className="hfc-photo-ring">
              <div className="hfc-photo-inner">
                <img src={heroCharacter} alt="Aditya Tomar" className="hfc-photo-img" />
              </div>
            </div>
            <div className="hfc-status-pill">
              <span className="hfc-status-dot" />
              <span className="hfc-status-label font-mono">Open to work</span>
            </div>
          </div>

          {/* RIGHT — info */}
          <div className="hfc-info-col">
            <p className="hfc-greeting font-mono">// full-stack dev</p>
            <h3 className="hfc-name">Aditya<br />Tomar</h3>
            <p className="hfc-sub font-mono">CS '29 · Amity Univ MP</p>

            <div className="hfc-divider" />

            <div className="hfc-stack-grid">
              {[
                { label: "React", color: "amber" },
                { label: "TS", color: "teal" },
                { label: "Node", color: "green" },
                { label: "Next", color: "amber" },
                { label: "Python", color: "pink" },
                { label: "AI/ML", color: "teal" },
              ].map((t) => (
                <span key={t.label} className={`hfc-tech hfc-tech--${t.color}`}>{t.label}</span>
              ))}
            </div>

            <p className="hfc-hint font-mono">hover to flip →</p>
          </div>
        </div>

        {/* ══ BACK ══ */}
        <div className="hfc-face hfc-back">
          <span className="hfc-corner hfc-corner--tl hfc-corner--rev" />
          <span className="hfc-corner hfc-corner--br hfc-corner--rev" />

          {/* LEFT — code snippet */}
          <div className="hfc-back-left">
            <div className="hfc-term">
              <div className="hfc-term-bar">
                <span className="hfc-dot" style={{ background: "oklch(0.65 0.22 25)" }} />
                <span className="hfc-dot" style={{ background: "oklch(0.75 0.18 80)" }} />
                <span className="hfc-dot" style={{ background: "oklch(0.62 0.18 148)" }} />
                <span className="hfc-term-file font-mono">aditya.config.ts</span>
              </div>
              <div className="hfc-term-body font-mono">
                <p className="hfc-tc-dim">/** my operating system */</p>
                <p><span className="hfc-tc-kw">const</span> <span className="hfc-tc-var">dev</span> <span className="hfc-tc-op">=</span> {"{"}</p>
                <p className="hfc-tc-indent"><span className="hfc-tc-key">fuel</span><span className="hfc-tc-op">:</span> <span className="hfc-tc-str">"caffeine"</span><span className="hfc-tc-op">,</span></p>
                <p className="hfc-tc-indent"><span className="hfc-tc-key">sleep</span><span className="hfc-tc-op">:</span> <span className="hfc-tc-num">2</span><span className="hfc-tc-op">,</span> <span className="hfc-tc-dim">// hrs</span></p>
                <p className="hfc-tc-indent"><span className="hfc-tc-key">bugs</span><span className="hfc-tc-op">:</span> <span className="hfc-tc-str">"features"</span><span className="hfc-tc-op">,</span></p>
                <p className="hfc-tc-indent"><span className="hfc-tc-key">mode</span><span className="hfc-tc-op">:</span> <span className="hfc-tc-str">"ship 🚀"</span></p>
                <p>{"}"}<span className="hfc-cursor" /></p>
              </div>
            </div>
          </div>

          {/* RIGHT — stats + achievements */}
          <div className="hfc-back-right">
            <p className="hfc-back-title font-mono">// quick.stats()</p>

            <div className="hfc-stat-pills">
              <div className="hfc-stat-pill hfc-sp--amber">
                <span className="hfc-sp-num">10+</span>
                <span className="hfc-sp-lbl font-mono">projects</span>
              </div>
              <div className="hfc-stat-pill hfc-sp--teal">
                <span className="hfc-sp-num">5+</span>
                <span className="hfc-sp-lbl font-mono">hackathons</span>
              </div>
              <div className="hfc-stat-pill hfc-sp--purple">
                <span className="hfc-sp-num">3</span>
                <span className="hfc-sp-lbl font-mono">awards</span>
              </div>
            </div>

            <div className="hfc-facts">
              <div className="hfc-fact">
                <span className="hfc-fact-icon">🏆</span>
                <span className="hfc-fact-text font-mono">National hackathon finalist</span>
              </div>
              <div className="hfc-fact">
                <span className="hfc-fact-icon">🎯</span>
                <span className="hfc-fact-text font-mono">CTF &amp; brand combat winner</span>
              </div>
              <div className="hfc-fact">
                <span className="hfc-fact-icon">🤖</span>
                <span className="hfc-fact-text font-mono">Building AI-powered tools</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}


export function Hero({ name, role: _role }: { name: string; role: string }) {
  const heroRef = useRef<HTMLDivElement>(null);
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
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute -top-48 -right-24 h-[750px] w-[750px] rounded-full bg-primary/6 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 -left-40 h-[550px] w-[550px] rounded-full" style={{ background: "oklch(0.50 0.15 185 / 0.08)", filter: "blur(110px)" }} />
      <div className="absolute inset-0 hero-grid pointer-events-none opacity-40" />
      <div className="absolute top-28 right-0 w-[40%] h-px" style={{ background: "linear-gradient(to left, transparent, oklch(0.73 0.22 48 / 0.12))" }} />
      <div className="absolute bottom-24 left-0 w-[30%] h-px" style={{ background: "linear-gradient(to right, transparent, oklch(0.80 0.17 185 / 0.12))" }} />

      <div
        ref={heroRef}
        className="relative grid lg:grid-cols-2 gap-10 items-center max-w-7xl mx-auto"
        style={{ willChange: "transform,opacity" }}
      >
        {/* ── LEFT ── */}
        <div className="hero-copy" style={{ position: "relative", zIndex: 30 }}>
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="font-mono text-sm" style={{ color: "oklch(0.80 0.17 185)" }}>{"<"}</span>
            <span className="font-mono text-xs font-medium tracking-widest uppercase" style={{ color: "oklch(0.58 0.020 60)" }}>cs_student</span>
            <span className="font-mono text-sm" style={{ color: "oklch(0.80 0.17 185)" }}>{"/>"}</span>
            <span className="relative flex h-2 w-2 ml-1">
              <span className="ping-dot absolute inline-flex h-full w-full rounded-full" style={{ background: "oklch(0.72 0.17 138)" }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "oklch(0.72 0.17 138)" }} />
            </span>
            <span className="text-xs text-muted-foreground">Open to work</span>
          </div>

          <p className="text-base md:text-lg text-muted-foreground mb-1">
            Hey, I'm{" "}
            <span className="font-bold" style={{ color: "oklch(0.80 0.17 185)" }}>{name}</span>
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.92] mb-2 tracking-tight">
            <span className="glitch hero-role-text block" data-text="Upcoming">Upcoming</span>
          </h1>

          <div className="mb-6" style={{ position: "relative", zIndex: 31 }}>
            <span key={roleIdx} className={`text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.15] tracking-tight block text-stroke ${wordClass}`}>
              {ROLE_WORDS[roleIdx]}
            </span>
          </div>

          <p className="text-sm md:text-base text-muted-foreground max-w-md mb-10 leading-relaxed font-mono">
            CS student building scalable web platforms and AI-powered automation
            tools — strong interest in intelligent systems and developer tooling.
          </p>

          <div className="flex items-center gap-3 mb-10">
            <MagneticBtn href="#connect" className="rounded-full bg-gradient-primary px-7 py-3.5 text-sm font-semibold shadow-glow hover:opacity-90 transition-opacity" style={{ color: "oklch(0.09 0.01 30)" }}>
              Hire Me
            </MagneticBtn>
            <MagneticBtn href="#projects" className="glass-btn rounded-full px-7 py-3.5 text-sm font-semibold hover:text-primary transition-smooth">
              See Work
            </MagneticBtn>
            <MagneticBtn href="https://mail.google.com/mail/?view=cm&to=adityatomar4877@gmail.com" target="_blank" rel="noreferrer" aria-label="Email" className="glass-btn flex h-12 w-12 items-center justify-center rounded-full hover:text-primary transition-smooth">
              <Mail className="h-4 w-4" />
            </MagneticBtn>
          </div>

          <div className="hero-stats-row mb-10">
            <StatCounter value="10+" label="Projects" />
            <div className="h-8 w-px bg-border/40" />
            <StatCounter value="2029" label="Graduating" accent="teal" />
            <div className="h-8 w-px bg-border/40" />
            <StatCounter value="5+" label="Hackathons" />
          </div>

          <div className="diagonal-rule mb-8 w-3/4" />

          <div className="glass-card max-w-sm rounded-2xl p-4 hero-award-card border border-primary/15">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-primary text-base">🏆</div>
              <div>
                <p className="text-sm font-bold mb-0.5">2nd Runner-Up · National Level Hackathon</p>
                <p className="text-xs text-muted-foreground leading-relaxed font-mono">CTF Winner · Brand Combat Champion</p>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-3 pt-3 border-t border-white/8">
              <div className="h-8 w-8 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold" style={{ color: "oklch(0.09 0.01 30)" }}>AT</div>
              <div>
                <p className="text-sm font-semibold">Aditya Tomar</p>
                <p className="text-xs text-muted-foreground font-mono">Amity University MP · CS '29</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT — horizontal flip card ── */}
        <div className="relative flex items-center justify-center h-[500px] md:h-[580px] lg:h-[620px]">
          <FlipCard />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <div className="hero-scroll-mouse" />
        <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-mono">scroll</span>
      </div>
    </section>
  );
}