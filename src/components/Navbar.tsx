import { Download, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const links = [
  { label: "Home", href: "#home", num: "00" },
  { label: "Skills", href: "#skills", num: "01" },
  { label: "Projects", href: "#projects", num: "02" },
  { label: "Experience", href: "#experience", num: "03" },
  { label: "Connect", href: "#connect", num: "04" },
];

export function Navbar({ name }: { name: string }) {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = links.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20 transition-smooth ${scrolled ? "py-3" : "py-5"}`}
      >
        <nav className={`flex items-center justify-between gap-4 rounded-2xl ${scrolled ? "glass-card px-5 py-3" : ""}`}>
          {/* Logo monogram */}
          <a href="#home" className="relative flex items-center gap-3 group">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold transition-transform group-hover:scale-105"
              style={{
                background: "var(--gradient-primary)",
                color: "oklch(0.09 0.01 30)",
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.03em",
              }}
            >
              AT
            </div>
            <span className="font-display text-xl font-bold tracking-tight hidden sm:block">
              {name}<span style={{ color: "oklch(0.73 0.22 48)" }}>.</span>
            </span>
          </a>

          {/* Desktop nav — numbered links */}
          <ul className="hidden md:flex items-center gap-0.5 rounded-2xl glass-card px-2 py-1.5">
            {links.map((l) => {
              const isActive = active === l.href.replace("#", "");
              return (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="relative flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-smooth group"
                    style={{
                      background: isActive ? "oklch(0.73 0.22 48 / 0.12)" : "transparent",
                      color: isActive ? "oklch(0.73 0.22 48)" : "oklch(0.58 0.020 60)",
                    }}
                  >
                    <span
                      className="font-mono text-[10px] transition-smooth"
                      style={{
                        color: isActive ? "oklch(0.73 0.22 48 / 0.7)" : "oklch(0.38 0.010 60)",
                      }}
                    >
                      {l.num}
                    </span>
                    <span className="group-hover:text-foreground transition-smooth">{l.label}</span>
                    {isActive && (
                      <span
                        className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                        style={{ background: "oklch(0.73 0.22 48)", boxShadow: "0 0 6px oklch(0.73 0.22 48 / 0.8)" }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            {/* Status pill */}
            <div className="hidden lg:flex items-center gap-2 glass-btn rounded-full px-3 py-1.5 text-xs">
              <span className="relative flex h-1.5 w-1.5">
                <span className="ping-dot absolute inline-flex h-full w-full rounded-full" style={{ background: "oklch(0.72 0.17 138)" }} />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: "oklch(0.72 0.17 138)" }} />
              </span>
              <span className="text-muted-foreground font-mono">open to work</span>
            </div>

            {/* Resume */}
            <a
              href="/resume.pdf"
              download="Aditya_Tomar_Resume.pdf"
              className="glass-btn flex items-center gap-2 rounded-xl border border-primary/25 pl-2 pr-4 py-2 text-xs font-medium hover:border-primary/50 transition-smooth"
            >
              <span
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[10px]"
                style={{ background: "var(--gradient-primary)", color: "oklch(0.09 0.01 30)" }}
              >
                <Download className="h-3.5 w-3.5" />
              </span>
              <span className="hidden sm:flex flex-col leading-tight">
                <span className="font-semibold">Resume</span>
                <span className="text-[10px] text-muted-foreground font-mono">.pdf</span>
              </span>
            </a>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden glass-btn flex h-9 w-9 items-center justify-center rounded-xl"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-20 left-4 right-4 glass-card rounded-2xl p-5">
            <ul className="space-y-1">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-smooth"
                    style={{
                      background: active === l.href.replace("#", "") ? "oklch(0.73 0.22 48 / 0.12)" : "transparent",
                      color: active === l.href.replace("#", "") ? "oklch(0.73 0.22 48)" : "oklch(0.58 0.020 60)",
                    }}
                  >
                    <span className="font-mono text-xs text-muted-foreground/50">{l.num}</span>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}