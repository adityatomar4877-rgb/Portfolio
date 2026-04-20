import { useEffect, useRef, useState } from "react";

/**
 * Counts from 0 to `end` once the returned ref is visible.
 * Supports numeric strings like "4+" or "2029" — keeps non-digit suffix.
 */
export function useCountUp(rawValue: string, duration = 1400) {
    const ref = useRef<HTMLElement>(null);
    const [display, setDisplay] = useState("0");
    const triggered = useRef(false);

    // parse "4+" → { num: 4, suffix: "+" }
    const match = rawValue.match(/^(\d+)(.*)$/);
    const target = match ? parseInt(match[1], 10) : 0;
    const suffix = match ? match[2] : rawValue;

    useEffect(() => {
        if (!ref.current || triggered.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting || triggered.current) return;
                triggered.current = true;
                observer.disconnect();

                const start = performance.now();
                const animate = (now: number) => {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    // ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.round(eased * target);
                    setDisplay(`${current}${suffix}`);
                    if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
            },
            { threshold: 0.5 }
        );
        observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target, suffix, duration]);

    return { ref, display };
}