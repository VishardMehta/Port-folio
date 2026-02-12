import { useRef, useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { about } from '../data/portfolio';

/**
 * Splits text into words and animates their color
 * from dim → lit as the user scrolls through the section.
 */
function ScrollColorText({ html }) {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Strip HTML to plain text and get accent spans
        const temp = document.createElement('div');
        temp.innerHTML = html;

        // Build word spans preserving accent markup
        const words = [];
        temp.childNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE) {
                node.textContent.split(/(\s+)/).forEach((w) => {
                    if (w.trim()) words.push({ text: w, accent: false });
                });
            } else if (node.tagName === 'SPAN' && node.classList.contains('text-accent')) {
                node.textContent.split(/(\s+)/).forEach((w) => {
                    if (w.trim()) words.push({ text: w, accent: true });
                });
            }
        });

        // Render word spans
        container.innerHTML = words
            .map(
                (w, i) =>
                    `<span class="scroll-color-word" data-idx="${i}" data-accent="${w.accent}">${w.text}</span> `
            )
            .join('');

        const wordEls = container.querySelectorAll('.scroll-color-word');

        const onScroll = () => {
            const rect = container.getBoundingClientRect();
            const vh = window.innerHeight;
            // Progress from 0 → 1 as the paragraph scrolls through
            const progress = Math.min(
                1,
                Math.max(0, (vh - rect.top) / (vh + rect.height))
            );
            const litCount = Math.floor(progress * wordEls.length * 1.4);

            wordEls.forEach((el, i) => {
                if (i < litCount) {
                    el.classList.add(
                        el.dataset.accent === 'true' ? 'lit-accent' : 'lit'
                    );
                } else {
                    el.classList.remove('lit', 'lit-accent');
                }
            });
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        return () => window.removeEventListener('scroll', onScroll);
    }, [html]);

    return <p className="about-text" ref={containerRef} />;
}

export default function About() {
    const ref = useScrollReveal();

    return (
        <section className="section about" id="about" ref={ref}>
            <div className="about-wrap">
                <div className="section-header reveal">
                    <span className="section-tag">{about.tag}</span>
                    <h2 className="section-title">{about.heading}</h2>
                </div>
                <div className="about-content reveal">
                    {about.paragraphs.map((p, i) => (
                        <ScrollColorText key={i} html={p} />
                    ))}
                </div>
            </div>
        </section>
    );
}
