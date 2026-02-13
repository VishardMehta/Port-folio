import { useRef, useEffect, useMemo } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { about } from '../data/portfolio';
import './About.css';

/**
 * Parse HTML paragraphs → flat array of { text, accent } words.
 */
function parseWords(paragraphs) {
    const words = [];
    paragraphs.forEach((html) => {
        const parts = html.split(/(<span class="text-accent">.*?<\/span>)/g);
        parts.forEach((part) => {
            const isAccent = part.startsWith('<span');
            const text = part.replace(/<[^>]*>/g, '').trim();
            text.trim()
                .split(/\s+/)
                .filter(Boolean)
                .forEach((w) => words.push({ text: w, accent: isAccent }));
        });
    });
    return words;
}

export default function About() {
    const revealRef = useScrollReveal();
    const wrapRef = useRef(null);

    const words = useMemo(() => parseWords(about.paragraphs), []);

    useEffect(() => {
        const section = wrapRef.current;
        if (!section) return;

        const wordEls = section.querySelectorAll('.about-word');
        let ticking = false;

        function update() {
            const rect = section.getBoundingClientRect();
            const sectionHeight = section.offsetHeight;
            const windowHeight = window.innerHeight;

            // Reveal: starts at 85% viewport, finishes when top is
            // 25% of section height above the viewport
            const triggerStart = windowHeight * 0.9;
            const triggerEnd = sectionHeight * 0.5;
            const scrollProgress =
                (triggerStart - rect.top) / (triggerStart - triggerEnd);
            const clamped = Math.min(Math.max(scrollProgress, 0), 1);

            const activeIndex = Math.ceil(clamped * wordEls.length);

            wordEls.forEach((word, i) => {
                word.style.opacity = i <= activeIndex ? 1 : 0.2;
            });

            ticking = false;
        }

        function onScroll() {
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        update();

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <section className="section about" id="about" ref={revealRef}>
            <div className="about-wrap" ref={wrapRef}>
                <div className="section-header reveal">
                    <h2 className="section-title">{about.heading}</h2>
                </div>

                <p className="about-scroll-text">
                    {words.map((w, i) => (
                        <span
                            key={i}
                            className={`about-word${w.accent ? ' accent' : ''}`}
                        >
                            {w.text}{' '}
                        </span>
                    ))}
                </p>
            </div>
        </section>
    );
}
