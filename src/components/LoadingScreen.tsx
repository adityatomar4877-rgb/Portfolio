import { useEffect, useState, useRef } from "react";

const GRID_COLS = 12;
const GRID_ROWS = 8;

export function LoadingScreen({ onDone }: { onDone: () => void }) {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<"loading" | "explode">("loading");
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Array<{ x: number, y: number, vx: number, vy: number, alpha: number, size: number, color: string }>>([]);
    const rafRef = useRef<number>(0);

    // Particle explosion on exit
    const spawnParticles = () => {
        const colors = ["oklch(0.7 0.21 45)", "oklch(0.78 0.19 55)", "oklch(0.62 0.20 250)", "oklch(0.65 0.19 148)", "oklch(1 0 0 / 0.8)"];
        const particles = [];
        for (let i = 0; i < 120; i++) {
            const angle = (Math.PI * 2 * i) / 120 + Math.random() * 0.3;
            const speed = 3 + Math.random() * 8;
            particles.push({
                x: window.innerWidth / 2,
                y: window.innerHeight / 2,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                size: 2 + Math.random() * 4,
                color: colors[Math.floor(Math.random() * colors.length)],
            });
        }
        particlesRef.current = particles;
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const ctx = canvas.getContext("2d")!;

        const loop = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particlesRef.current.forEach(p => {
                p.x += p.vx; p.y += p.vy;
                p.vy += 0.15; p.alpha -= 0.018;
                p.vx *= 0.99;
                ctx.globalAlpha = Math.max(0, p.alpha);
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;
            rafRef.current = requestAnimationFrame(loop);
        };
        loop();
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    useEffect(() => {
        const dur = 1800;
        const start = performance.now();
        const tick = (now: number) => {
            const t = Math.min((now - start) / dur, 1);
            const eased = 1 - Math.pow(1 - t, 4);
            setProgress(Math.round(eased * 100));
            if (t < 1) requestAnimationFrame(tick);
            else {
                setTimeout(() => {
                    setPhase("explode");
                    spawnParticles();
                    setTimeout(() => onDone(), 900);
                }, 200);
            }
        };
        requestAnimationFrame(tick);
    }, [onDone]);

    return (
        <div className={`loading-screen${phase === "explode" ? " loading-explode" : ""}`}>
            {/* Noise grain overlay */}
            <div className="loading-grain" />

            {/* Grid of tiles that scatter on explode */}
            <div className="loading-tile-grid">
                {Array.from({ length: GRID_COLS * GRID_ROWS }).map((_, i) => {
                    const col = i % GRID_COLS;
                    const row = Math.floor(i / GRID_COLS);
                    const cx = col - GRID_COLS / 2;
                    const cy = row - GRID_ROWS / 2;
                    const dist = Math.sqrt(cx * cx + cy * cy);
                    const angle = Math.atan2(cy, cx);
                    return (
                        <div
                            key={i}
                            className="loading-tile"
                            style={{
                                "--tx": `${Math.cos(angle) * dist * 180}px`,
                                "--ty": `${Math.sin(angle) * dist * 180}px`,
                                "--rot": `${(Math.random() - 0.5) * 720}deg`,
                                "--delay": `${dist * 0.04}s`,
                            } as React.CSSProperties}
                        />
                    );
                })}
            </div>

            {/* Particle canvas */}
            <canvas ref={canvasRef} className="loading-canvas" />

            {/* Center content */}
            <div className={`loading-content${phase === "explode" ? " loading-content-exit" : ""}`}>
                {/* Animated logo mark */}
                <div className="loading-logo-wrap">
                    <svg className="loading-logo-ring" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="44" fill="none" stroke="oklch(0.7 0.21 45 / 0.15)" strokeWidth="1" />
                        <circle cx="50" cy="50" r="44" fill="none" stroke="url(#loadGrad)" strokeWidth="1.5"
                            strokeDasharray="276" strokeDashoffset={276 - (276 * progress / 100)}
                            strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.05s linear", transform: "rotate(-90deg)", transformOrigin: "50% 50%" }} />
                        <defs>
                            <linearGradient id="loadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="oklch(0.7 0.21 45)" />
                                <stop offset="100%" stopColor="oklch(0.78 0.19 55)" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="loading-logo-inner">
                        <span className="loading-logo-text">AT</span>
                    </div>
                </div>

                <div className="loading-name-row">
                    {"ADITYA".split("").map((ch, i) => (
                        <span key={i} className="loading-letter" style={{ "--i": i } as React.CSSProperties}>{ch}</span>
                    ))}
                </div>
                <div className="loading-role-text">Upcoming Developer</div>

                <div className="loading-progress-row">
                    <div className="loading-bar-track">
                        <div className="loading-bar-fill" style={{ width: `${progress}%` }}>
                            <div className="loading-bar-shimmer" />
                        </div>
                    </div>
                    <span className="loading-pct">{progress}%</span>
                </div>

                <div className="loading-status">
                    {progress < 30 ? "Initializing..." : progress < 60 ? "Loading assets..." : progress < 90 ? "Preparing portfolio..." : "Ready."}
                </div>
            </div>
        </div>
    );
}