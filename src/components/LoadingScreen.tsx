import { useEffect, useState, useRef } from "react";

const TERMINAL_LINES = [
    { text: "> INITIALIZING PORTFOLIO_v2.0.2", type: "prompt", delay: 0 },
    { text: "  Loading modules...             [OK]", type: "ok", delay: 280 },
    { text: "  Compiling React components...  [OK]", type: "ok", delay: 520 },
    { text: "  Mounting TailwindCSS v4...     [OK]", type: "ok", delay: 740 },
    { text: "> CHECKING ASSETS...", type: "prompt", delay: 920 },
    { text: "  hero-character.png             [OK]", type: "ok", delay: 1080 },
    { text: "  animations.css                 [OK]", type: "ok", delay: 1200 },
    { text: "  projects.json                  [OK]", type: "ok", delay: 1320 },
    { text: "> SYSTEM READY — Welcome, Dev.", type: "prompt", delay: 1520 },
];

export function LoadingScreen({ onDone }: { onDone: () => void }) {
    const [progress, setProgress] = useState(0);
    const [visibleLines, setVisibleLines] = useState<number[]>([]);
    const [showName, setShowName] = useState(false);
    const [exiting, setExiting] = useState(false);
    const [wipeActive, setWipeActive] = useState(false);

    useEffect(() => {
        // Reveal terminal lines
        TERMINAL_LINES.forEach((line, i) => {
            setTimeout(() => {
                setVisibleLines((prev) => [...prev, i]);
            }, line.delay + 300);
        });

        // Show name letters after main lines
        setTimeout(() => setShowName(true), 1800);

        // Progress bar
        const dur = 2200;
        const start = performance.now();
        const tick = (now: number) => {
            const t = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setProgress(Math.round(eased * 100));
            if (t < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);

        // Exit
        setTimeout(() => {
            setExiting(true);
            setTimeout(() => {
                setWipeActive(true);
                setTimeout(() => onDone(), 700);
            }, 400);
        }, 2600);
    }, [onDone]);

    return (
        <div className="loading-screen">
            <div className="loading-grain" />
            <div className="loading-scan-lines" />
            <div className="loading-sweep" />

            <div className={`loading-terminal${exiting ? " loading-terminal-exit" : ""}`}>
                {/* Title bar */}
                <div className="loading-title-bar">
                    <div className="loading-traffic-light" style={{ background: "oklch(0.65 0.22 25)" }} />
                    <div className="loading-traffic-light" style={{ background: "oklch(0.78 0.19 80)" }} />
                    <div className="loading-traffic-light" style={{ background: "oklch(0.67 0.18 148)" }} />
                    <span style={{ marginLeft: "0.75rem", fontSize: "0.7rem", color: "oklch(0.45 0.01 60)", fontFamily: "var(--font-mono)" }}>
                        portfolio — bash
                    </span>
                </div>

                {/* Body */}
                <div className="loading-terminal-body">
                    {TERMINAL_LINES.map((line, i) => (
                        <span
                            key={i}
                            className={`terminal-line ${visibleLines.includes(i) ? "visible" : ""}`}
                        >
                            {line.type === "ok" ? (
                                <>
                                    <span className="terminal-dim">{line.text.slice(0, line.text.lastIndexOf("["))}</span>
                                    <span className="terminal-ok">[OK]</span>
                                </>
                            ) : (
                                <span className="terminal-prompt">{line.text}</span>
                            )}
                        </span>
                    ))}
                    {visibleLines.length >= TERMINAL_LINES.length && (
                        <span className="terminal-line visible">
                            <span className="terminal-prompt">{">"} </span>
                            <span className="terminal-cursor" />
                        </span>
                    )}

                    {/* Name */}
                    {showName && (
                        <div style={{ marginTop: "1rem", borderTop: "1px solid oklch(0.73 0.22 48 / 0.15)", paddingTop: "1rem" }}>
                            <div className="loading-name-row">
                                {"ADITYA".split("").map((ch, i) => (
                                    <span key={i} className="loading-letter" style={{ "--i": i } as React.CSSProperties}>{ch}</span>
                                ))}
                            </div>
                            <div style={{ marginTop: "0.5rem" }} className="loading-progress-row">
                                <div className="loading-bar-track">
                                    <div className="loading-bar-fill" style={{ width: `${progress}%` }}>
                                        <div className="loading-bar-shimmer" />
                                    </div>
                                </div>
                                <span className="loading-pct">{progress}%</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Wipe exit */}
            <div className={`loading-wipe${wipeActive ? " active" : ""}`} />
        </div>
    );
}