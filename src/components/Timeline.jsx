import { useRef, useEffect } from 'react';
import GlobePulse from './GlobePulse';
import { timeline } from '../data/portfolio';
import './Timeline.css';

export default function Timeline() {
    const sectionRef = useRef(null);
    const scrollProgress = useRef(0);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        const cards = section.querySelectorAll('.orbital-card');
        const numCards = cards.length;
        let ticking = false;

        function update() {
            const rect = section.getBoundingClientRect();
            const scrollableDistance = section.offsetHeight - window.innerHeight;
            if (scrollableDistance <= 0) {
                ticking = false;
                return;
            }

            const progress = Math.min(
                Math.max(-rect.top / scrollableDistance, 0),
                1
            );
            scrollProgress.current = progress;

            // "Pile Up" Logic: cards fly in from the right and stack in the center.
            const isDesktop = window.innerWidth > 768;
            const cardWidth = isDesktop ? window.innerWidth * 0.22 : window.innerWidth * 0.85;

            const availableWidth = window.innerWidth * 0.9;
            const totalWidthRaw = numCards * cardWidth;

            let gap = 20;
            if (totalWidthRaw > availableWidth && numCards > 1) {
                gap = (availableWidth - totalWidthRaw) / (numCards - 1);
            }

            const finalTotalWidth = numCards * cardWidth + (numCards - 1) * gap;
            const startX_Chain = -finalTotalWidth / 2;

            cards.forEach((card, i) => {
                const finalX = startX_Chain + i * (cardWidth + gap) + cardWidth / 2;
                const entryX = window.innerWidth / 2 + cardWidth + i * 100;

                const step = 0.12;
                const startP = i * step;
                const endP = startP + 0.4;

                const t = Math.min(Math.max((progress - startP) / (endP - startP), 0), 1);
                const eased = 1 - Math.pow(1 - t, 3);

                const currentX = entryX + (finalX - entryX) * eased;

                const scale = 0.5 + 0.5 * eased;
                const opacity = Math.min(1, eased * 2);

                card.style.transform = `translate(${currentX}px, 0px) translateX(-50%) scale(${scale})`;
                card.style.opacity = opacity;
                card.style.width = `${cardWidth}px`;
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
        window.addEventListener('resize', onScroll);
        update();

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    return (
        <section className="journey-section" id="experience" ref={sectionRef}>
            <div className="journey-sticky">
                <div className="journey-header">
                    <span className="section-tag">Experience</span>
                    <h2 className="section-title">My Journey</h2>
                </div>

                {/* Interactive Earth Globe - Centered */}
                <div className="moon-3d-canvas">
                    <GlobePulse />
                </div>

                {/* Cards Container */}
                <div className="cards-center-container">
                    <div className="orbital-cards">
                        {timeline.map((item, i) => (
                            <div className="orbital-card" key={i}>
                                <span className="oc-period">{item.period}</span>
                                <div className="oc-content-row">
                                    <h3 className="oc-role">{item.role}</h3>
                                    <span className="oc-org">{item.org}</span>
                                </div>
                                <p className="oc-desc">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
