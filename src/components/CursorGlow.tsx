import { useEffect, useRef } from "react";

export function CursorGlow() {
    const glowRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const trailRef = useRef<Array<{ x: number, y: number }>>([]);
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
            smooth.current.x += (pos.current.x - smooth.current.x) * 0.07;
            smooth.current.y += (pos.current.y - smooth.current.y) * 0.07;
            ring.current.x += (pos.current.x - ring.current.x) * 0.14;
            ring.current.y += (pos.current.y - ring.current.y) * 0.14;

            if (glowRef.current) {
                glowRef.current.style.transform = `translate(${smooth.current.x - 250}px, ${smooth.current.y - 250}px)`;
            }
            if (ringRef.current) {
                const s = isHover.current ? 1.8 : 1;
                ringRef.current.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px) scale(${s})`;
                ringRef.current.style.borderColor = isHover.current ? "oklch(0.7 0.21 45 / 0.9)" : "oklch(0.7 0.21 45 / 0.5)";
            }
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${pos.current.x - 3}px, ${pos.current.y - 3}px)`;
                dotRef.current.style.opacity = isHover.current ? "0" : "1";
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
            <div ref={glowRef} className="pointer-events-none fixed top-0 left-0 z-[198] h-[500px] w-[500px] rounded-full"
                style={{ background: "radial-gradient(circle, oklch(0.7 0.21 45 / 0.055) 0%, transparent 65%)", willChange: "transform" }} />
            <div ref={ringRef} className="pointer-events-none fixed top-0 left-0 z-[200] h-8 w-8 rounded-full border"
                style={{ willChange: "transform", transition: "border-color 0.3s, transform 0.05s, scale 0.3s cubic-bezier(0.34,1.56,0.64,1)", mixBlendMode: "difference" }} />
            <div ref={dotRef} className="pointer-events-none fixed top-0 left-0 z-[201] h-1.5 w-1.5 rounded-full bg-primary"
                style={{ willChange: "transform", transition: "opacity 0.2s" }} />
        </>
    );
}