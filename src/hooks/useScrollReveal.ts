import { useEffect, useRef } from "react";

/**
 * Adds "revealed" class to the ref'd element when it enters the viewport.
 * The element should start with .reveal class (hidden), and get .revealed (visible).
 */
export function useScrollReveal(threshold = 0.15) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add("revealed");
                    observer.disconnect(); // fire once
                }
            },
            { threshold }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return ref;
}