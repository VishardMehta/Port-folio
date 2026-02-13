import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useScrollReveal from '../hooks/useScrollReveal';
import { skills } from '../data/portfolio';
import './Skills.css';

export default function Skills() {
    const ref = useScrollReveal();
    const [hovered, setHovered] = useState(null);
    const listRef = useRef(null);

    /* ── Scroll-linked row color reveal ── */
    useEffect(() => {
        const list = listRef.current;
        if (!list) return;

        const rows = list.querySelectorAll('.skill-row');
        let ticking = false;

        function update() {
            const windowHeight = window.innerHeight;

            rows.forEach((row) => {
                const rect = row.getBoundingClientRect();
                const rowCenter = rect.top + rect.height / 2;

                // Progress: 0 when row center is at bottom of viewport,
                //           1 when row center reaches 35% from top
                const progress =
                    (windowHeight - rowCenter) / (windowHeight * 0.65);
                const clamped = Math.min(Math.max(progress, 0), 1);

                // Interpolate heading: dim → cream (#b7ab98)
                const heading = row.querySelector('.skill-heading');
                const number = row.querySelector('.skill-number');
                if (heading) {
                    const r = Math.round(40 + clamped * (183 - 40));
                    const g = Math.round(40 + clamped * (171 - 40));
                    const b = Math.round(40 + clamped * (152 - 40));
                    heading.style.color = `rgb(${r},${g},${b})`;
                }
                if (number) {
                    const alpha = 0.1 + clamped * 0.4;
                    number.style.color = `rgba(255,255,255,${alpha})`;
                }
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
        <section className="section skills" id="skills" ref={ref}>
            <div className="section-header reveal">
                <span className="section-tag">Expertise</span>
                <h2 className="section-title">What I Do</h2>
            </div>

            <div className="skills-list reveal" ref={listRef}>
                {skills.map((s, i) => (
                    <div
                        key={i}
                        className={`skill-row${hovered === i ? ' active' : ''}`}
                        onMouseEnter={() => setHovered(i)}
                        onMouseLeave={() => setHovered(null)}
                    >
                        {/* Orange bar — center-pop, vertical expand */}
                        <AnimatePresence>
                            {hovered === i && (
                                <motion.div
                                    className="skill-bar"
                                    initial={{ scaleY: 0, opacity: 0 }}
                                    animate={{ scaleY: 1, opacity: 1 }}
                                    exit={{ scaleY: 0, opacity: 0 }}
                                    transition={{
                                        type: 'spring',
                                        stiffness: 300,
                                        damping: 28,
                                    }}
                                    style={{ transformOrigin: 'center' }}
                                />
                            )}
                        </AnimatePresence>

                        {/* Strike-through line (orange, full width) */}
                        <AnimatePresence>
                            {hovered === i && (
                                <motion.div
                                    className="skill-line"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    exit={{ scaleX: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        ease: [0.25, 1, 0.5, 1],
                                    }}
                                />
                            )}
                        </AnimatePresence>

                        {/* Number */}
                        <span className="skill-number">
                            {String(i + 1).padStart(2, '0')}
                        </span>

                        {/* Massive heading */}
                        <h3 className="skill-heading">
                            {s.title.toUpperCase()}
                        </h3>

                        {/* Description — always in row, black text */}
                        <p className="skill-hover-desc">
                            {s.desc}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
