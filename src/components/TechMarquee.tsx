const TECHS = [
    { label: "React", icon: "⚛" },
    { label: "TypeScript", icon: "TS" },
    { label: "Next.js", icon: "▲" },
    { label: "Node.js", icon: "⬡" },
    { label: "Python", icon: "🐍" },
    { label: "Tailwind", icon: "✦" },
    { label: "Firebase", icon: "🔥" },
    { label: "Supabase", icon: "⚡" },
    { label: "FastAPI", icon: "⚙" },
    { label: "Playwright", icon: "🎭" },
    { label: "Git", icon: "⎇" },
    { label: "Linux", icon: "🐧" },
    { label: "Vercel", icon: "▴" },
    { label: "Express.js", icon: "∞" },
];

const ROW1 = [...TECHS, ...TECHS];
const ROW2 = [...TECHS.slice(7), ...TECHS.slice(0, 7), ...TECHS.slice(7), ...TECHS.slice(0, 7)];

export function TechMarquee() {
    return (
        <div
            className="relative overflow-hidden py-7 space-y-3"
            style={{ borderTop: "1px solid oklch(1 0 0 / 0.05)", borderBottom: "1px solid oklch(1 0 0 / 0.05)" }}
        >
            {/* Fade edges */}
            <div
                className="pointer-events-none absolute left-0 top-0 bottom-0 w-40 z-10"
                style={{ background: "linear-gradient(to right, var(--color-background), transparent)" }}
            />
            <div
                className="pointer-events-none absolute right-0 top-0 bottom-0 w-40 z-10"
                style={{ background: "linear-gradient(to left, var(--color-background), transparent)" }}
            />

            {/* Row 1 — scrolls left */}
            <div className="marquee-track flex items-center gap-7 whitespace-nowrap">
                {ROW1.map((t, i) => (
                    <span
                        key={i}
                        className="flex items-center gap-2 text-xs font-medium cursor-default select-none shrink-0 group transition-smooth"
                        style={{ color: "oklch(0.42 0.010 60)" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.color = "oklch(0.73 0.22 48)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.color = "oklch(0.42 0.010 60)"; }}
                    >
                        <span
                            className="w-6 h-6 flex items-center justify-center rounded-lg text-[10px] transition-smooth"
                            style={{ background: "oklch(1 0 0 / 0.04)", fontFamily: "var(--font-mono)" }}
                        >
                            {t.icon}
                        </span>
                        <span style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.02em" }}>{t.label}</span>
                    </span>
                ))}
            </div>

            {/* Row 2 — scrolls right */}
            <div className="marquee-track-reverse flex items-center gap-7 whitespace-nowrap">
                {ROW2.map((t, i) => (
                    <span
                        key={i}
                        className="flex items-center gap-2 text-xs font-medium cursor-default select-none shrink-0 transition-smooth"
                        style={{ color: "oklch(0.35 0.008 60)" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLSpanElement).style.color = "oklch(0.80 0.17 185)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLSpanElement).style.color = "oklch(0.35 0.008 60)"; }}
                    >
                        <span
                            className="w-6 h-6 flex items-center justify-center rounded-lg text-[10px] transition-smooth"
                            style={{ background: "oklch(1 0 0 / 0.03)", fontFamily: "var(--font-mono)" }}
                        >
                            {t.icon}
                        </span>
                        <span style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.02em" }}>{t.label}</span>
                    </span>
                ))}
            </div>
        </div>
    );
}