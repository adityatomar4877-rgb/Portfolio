import { useEffect, useRef } from "react";

export function CursorGlow() {
    const glowRef = useRef<HTMLDivElement>(null);
    const dotRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: -200, y: -200 });
    const current = useRef({ x: -200, y: -200 });
    const rafRef = useRef<number>(0);

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            pos.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener("mousemove", onMove);

        const animate = () => {
            // smooth follow for large glow
            current.current.x += (pos.current.x - current.current.x) * 0.08;
            current.current.y += (pos.current.y - current.current.y) * 0.08;

            if (glowRef.current) {
                glowRef.current.style.transform =
                    `translate(${current.current.x - 200}px, ${current.current.y - 200}px)`;
            }
            // dot follows precisely
            if (dotRef.current) {
                dotRef.current.style.transform =
                    `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
            }
            rafRef.current = requestAnimationFrame(animate);
        };
        rafRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", onMove);
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <>
            {/* large soft glow */}
            <div
                ref={glowRef}
                className="pointer-events-none fixed top-0 left-0 z-[200] h-[400px] w-[400px] rounded-full"
                style={{
                    background: "radial-gradient(circle, oklch(0.7 0.21 45 / 0.06) 0%, transparent 70%)",
                    willChange: "transform",
                }}
            />
            {/* tiny sharp dot */}
            <div
                ref={dotRef}
                className="pointer-events-none fixed top-0 left-0 z-[201] h-2 w-2 rounded-full bg-primary/60"
                style={{ willChange: "transform" }}
            />
        </>
    );
}