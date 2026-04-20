import { Download, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const links = [
  { label: "Home", href: "#home" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Connect", href: "#connect" },
];

export function Navbar({ name }: { name: string }) {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      // highlight active section
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
        className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-20 transition-smooth ${scrolled ? "py-4" : "py-6"
          }`}
      >
        <nav className={`flex items-center justify-between gap-4 rounded-2xl ${scrolled ? "glass-card px-5 py-3" : ""}`}>
          <a href="#home" className="font-display text-2xl md:text-3xl font-bold tracking-tight">
            {name}<span className="text-primary">.</span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1 rounded-full glass-card px-2 py-2">
            {links.map((l) => {
              const isActive = active === l.href.replace("#", "");
              return (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-smooth ${isActive
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            {/* Resume */}
            <a
              href="/resume.pdf"
              download="Aditya_Tomar_Resume.pdf"
              className="glass-btn flex items-center gap-2 rounded-full border-primary/40 pl-2 pr-4 py-2 text-sm font-medium"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-primary-foreground">
                <Download className="h-4 w-4" />
              </span>
              <span className="hidden sm:flex flex-col leading-tight">
                <span>Download</span>
                <span className="text-xs text-muted-foreground">Resume</span>
              </span>
            </a>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden glass-btn flex h-10 w-10 items-center justify-center rounded-full"
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
          <div className="absolute top-20 left-4 right-4 glass-card rounded-2xl p-6">
            <ul className="space-y-1">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-smooth ${active === l.href.replace("#", "")
                      ? "bg-primary/15 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
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