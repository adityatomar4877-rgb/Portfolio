import { useEffect, useState } from "react";

export function ScrollProgress() {
    const [progress, setProgress] = useState(0);
    const [section, setSection] = useState("home");

    const SECTIONS = ["home", "skills", "projects", "experience", "connect"];
    const LABELS: Record<string, string> = { home: "Home", skills: "Skills", projects: "Projects", experience: "Experience", connect: "Connect" };

    useEffect(() => {
        const update = () => {
            const scrolled = window.scrollY;
            const total = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(total > 0 ? (scrolled / total) * 100 : 0);
            for (const id of [...SECTIONS].reverse()) {
                const el = document.getElementById(id);
                if (el && scrolled >= el.offsetTop - 200) { setSection(id); break; }
            }
        };
        window.addEventListener("scroll", update, { passive: true });
        return () => window.removeEventListener("scroll", update);
    }, []);

    return (
        <>
            {/* Top bar */}
            <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-transparent pointer-events-none">
                <div className="h-full bg-gradient-primary" style={{ width: `${progress}%`, boxShadow: "0 0 8px oklch(0.7 0.21 45 / 0.8)", transition: "none" }} />
            </div>
            {/* Side dots */}
            <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
                {SECTIONS.map((id) => (
                    <a key={id} href={`#${id}`} title={LABELS[id]}
                        className="group flex items-center gap-2 justify-end">
                        <span className={`text-xs font-medium transition-all duration-300 ${section === id ? "opacity-70 translate-x-0" : "opacity-0 translate-x-2"}`}
                            style={{ color: section === id ? "oklch(0.7 0.21 45)" : "inherit" }}>{LABELS[id]}</span>
                        <span className={`block rounded-full transition-all duration-300 ${section === id ? "h-4 w-1.5 bg-primary shadow-[0_0_8px_oklch(0.7_0.21_45/0.8)]" : "h-1.5 w-1.5 bg-white/20 group-hover:bg-white/50"}`} />
                    </a>
                ))}
            </div>
        </>
    );
}