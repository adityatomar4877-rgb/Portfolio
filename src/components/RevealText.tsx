import { useEffect, useRef } from "react";

/**
 * Splits text into words; each word slides up + fades in when visible.
 * Pass `className` for the outer span, `wordClass` for per-word styling.
 */
export function RevealText({
    text,
    className = "",
    wordClass = "",
    baseDelay = 0,
    stagger = 80,
}: {
    text: string;
    className?: string;
    wordClass?: string;
    baseDelay?: number;
    stagger?: number;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const triggered = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || triggered.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || triggered.current) return;
                triggered.current = true;
                el.querySelectorAll<HTMLSpanElement>(".word-inner").forEach((w, i) => {
                    w.style.transitionDelay = `${baseDelay + i * stagger}ms`;
                    w.classList.add("word-visible");
                });
                observer.disconnect();
            },
            { threshold: 0.2 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [baseDelay, stagger]);

    const words = text.split(" ");

    return (
        <span ref={ref} className={`inline ${className}`}>
            {words.map((word, i) => (
                <span key={i} className="word-clip inline-block overflow-hidden mr-[0.22em]">
                    <span className={`word-inner inline-block ${wordClass}`}>
                        {word}
                    </span>
                </span>
            ))}
        </span>
    );
}