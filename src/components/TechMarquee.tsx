const TECHS = [
    { label: "React", icon: "⚛" }, { label: "TypeScript", icon: "TS" }, { label: "Next.js", icon: "▲" },
    { label: "Node.js", icon: "⬡" }, { label: "Python", icon: "🐍" }, { label: "Tailwind CSS", icon: "✦" },
    { label: "Firebase", icon: "🔥" }, { label: "Supabase", icon: "⚡" }, { label: "FastAPI", icon: "⚙" },
    { label: "Playwright", icon: "🎭" }, { label: "Git", icon: "⎇" }, { label: "Linux", icon: "🐧" },
    { label: "Vercel", icon: "▴" }, { label: "Express.js", icon: "∞" },
];

const ROW1 = [...TECHS, ...TECHS];
const ROW2 = [...TECHS.slice(7), ...TECHS.slice(0, 7), ...TECHS.slice(7), ...TECHS.slice(0, 7)];

export function TechMarquee() {
    return (
        <div className="relative overflow-hidden py-8 border-y border-white/6 space-y-4">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-40 z-10"
                style={{ background: "linear-gradient(to right, var(--color-background), transparent)" }} />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-40 z-10"
                style={{ background: "linear-gradient(to left, var(--color-background), transparent)" }} />

            {/* Row 1 — left */}
            <div className="marquee-track flex items-center gap-8 whitespace-nowrap">
                {ROW1.map((t, i) => (
                    <span key={i} className="flex items-center gap-2.5 text-sm font-semibold text-muted-foreground/50 hover:text-primary transition-smooth cursor-default select-none shrink-0 group">
                        <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 group-hover:bg-primary/10 transition-smooth text-xs">{t.icon}</span>
                        {t.label}
                    </span>
                ))}
            </div>

            {/* Row 2 — right */}
            <div className="marquee-track-reverse flex items-center gap-8 whitespace-nowrap">
                {ROW2.map((t, i) => (
                    <span key={i} className="flex items-center gap-2.5 text-sm font-semibold text-muted-foreground/40 hover:text-primary transition-smooth cursor-default select-none shrink-0 group">
                        <span className="w-7 h-7 flex items-center justify-center rounded-lg bg-white/5 group-hover:bg-primary/10 transition-smooth text-xs">{t.icon}</span>
                        {t.label}
                    </span>
                ))}
            </div>
        </div>
    );
}