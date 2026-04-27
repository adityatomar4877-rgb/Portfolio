import { useEffect, useRef } from "react";

/**
 * Adds "revealed" class to the ref'd element when it enters the viewport.
 * The element should start with .reveal class (hidden), and get .revealed (visible).
 */
export function useScrollReveal(threshold = 0.08) {
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // If already in viewport on mount (e.g. hero), reveal immediately
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add("revealed");
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add("revealed");
                    observer.disconnect();
                }
            },
            { threshold, rootMargin: "0px 0px -40px 0px" }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [threshold]);

    return ref;
}