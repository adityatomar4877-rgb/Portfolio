import { useEffect, useRef } from "react";

export function CursorGlow() {
    const glowRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: -300, y: -300 });
    const smooth = useRef({ x: -300, y: -300 });
    const ring = useRef({ x: -300, y: -300 });
    const rafRef = useRef<number>(0);
    const isHover = useRef(false);

    useEffect(() => {
        const onMove = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
        const onOver = (e: MouseEvent) => {
            const t = e.target as HTMLElement;
            isHover.current = !!(t.closest("a,button,[data-hover]"));
        };
        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseover", onOver);

        const animate = () => {
            smooth.current.x += (pos.current.x - smooth.current.x) * 0.065;
            smooth.current.y += (pos.current.y - smooth.current.y) * 0.065;
            ring.current.x += (pos.current.x - ring.current.x) * 0.16;
            ring.current.y += (pos.current.y - ring.current.y) * 0.16;

            if (glowRef.current) {
                glowRef.current.style.transform = `translate(${smooth.current.x - 250}px, ${smooth.current.y - 250}px)`;
            }
            if (ringRef.current) {
                const s = isHover.current ? 1.7 : 1;
                ringRef.current.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px) scale(${s})`;
                ringRef.current.style.borderColor = isHover.current
                    ? "oklch(0.80 0.17 185 / 0.9)"
                    : "oklch(0.73 0.22 48 / 0.55)";
                ringRef.current.style.width = isHover.current ? "40px" : "32px";
                ringRef.current.style.height = isHover.current ? "40px" : "32px";
            }
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px)`;
                dotRef.current.style.opacity = isHover.current ? "0" : "1";
                dotRef.current.style.background = isHover.current
                    ? "oklch(0.80 0.17 185)"
                    : "oklch(0.73 0.22 48)";
            }
            rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mouseover", onOver);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <>
            {/* Ambient glow blob */}
            <div
                ref={glowRef}
                className="pointer-events-none fixed top-0 left-0 z-[198] h-[500px] w-[500px] rounded-full"
                style={{
                    background: "radial-gradient(circle, oklch(0.73 0.22 48 / 0.04) 0%, transparent 65%)",
                    willChange: "transform",
                }}
            />
            {/* Outer ring */}
            <div
                ref={ringRef}
                className="pointer-events-none fixed top-0 left-0 z-[200] rounded-full border"
                style={{
                    width: "32px",
                    height: "32px",
                    willChange: "transform",
                    transition: "border-color 0.3s ease, width 0.25s cubic-bezier(0.34,1.56,0.64,1), height 0.25s cubic-bezier(0.34,1.56,0.64,1)",
                    mixBlendMode: "difference",
                }}
            />
            {/* Dot */}
            <div
                ref={dotRef}
                className="pointer-events-none fixed top-0 left-0 z-[201] h-1.5 w-1.5 rounded-full"
                style={{
                    background: "oklch(0.73 0.22 48)",
                    willChange: "transform",
                    transition: "opacity 0.2s ease, background 0.3s ease",
                }}
            />
        </>
    );
}