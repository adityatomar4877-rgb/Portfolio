const TECHS = [
    "React", "TypeScript", "Next.js", "Node.js", "Python",
    "Tailwind CSS", "Firebase", "Supabase", "FastAPI",
    "Playwright", "Git", "Linux", "Vercel", "Express.js",
];

// duplicate for seamless loop
const DOUBLE = [...TECHS, ...TECHS];

export function TechMarquee() {
    return (
        <div className="relative overflow-hidden py-10 border-y border-white/6">
            {/* fade edges */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10"
                style={{ background: "linear-gradient(to right, var(--color-background), transparent)" }} />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10"
                style={{ background: "linear-gradient(to left, var(--color-background), transparent)" }} />

            <div className="marquee-track flex items-center gap-10 whitespace-nowrap">
                {DOUBLE.map((tech, i) => (
                    <span key={i} className="flex items-center gap-3 text-sm font-semibold text-muted-foreground/60 hover:text-primary transition-smooth cursor-default select-none shrink-0">
                        <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    );
}