import { useEffect, useRef } from 'react';

export default function useScrollReveal(threshold = 0.15) {
    const ref = useRef(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            },
            { threshold, rootMargin: '0px 0px -50px 0px' }
        );

        const children = node.querySelectorAll('.reveal');
        children.forEach((el) => observer.observe(el));

        // Also observe the node itself if it has .reveal
        if (node.classList.contains('reveal')) {
            observer.observe(node);
        }

        return () => observer.disconnect();
    }, [threshold]);

    return ref;
}
