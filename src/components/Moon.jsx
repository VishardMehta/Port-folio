import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import moonImg from '../assets/moon.jpg';
import './Moon.css';

export default function Moon() {
    const sectionRef = useRef(null);
    const imgRef = useRef(null);

    /* ── Scroll-based vertical parallax ── */
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start'],
    });

    const y = useTransform(scrollYProgress, [0, 1], ['80px', '-80px']);
    const rotate = useTransform(scrollYProgress, [0, 1], [-8, 8]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1.05, 0.95]);

    /* ── Mouse-driven 3D tilt ── */
    function handleMouseMove(e) {
        const rect = imgRef.current?.getBoundingClientRect();
        if (!rect) return;

        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;

        // -1 → 1 normalized
        const px = (e.clientX - cx) / (rect.width / 2);
        const py = (e.clientY - cy) / (rect.height / 2);

        const tiltX = py * -15; // degrees
        const tiltY = px * 15;

        imgRef.current.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    }

    function handleMouseLeave() {
        if (imgRef.current) {
            imgRef.current.style.transform =
                'perspective(800px) rotateX(0deg) rotateY(0deg)';
        }
    }

    return (
        <section className="moon-section" ref={sectionRef}>
            {/* Soft glow behind the moon */}
            <div className="moon-glow" />

            <motion.div
                className="moon-parallax"
                style={{ y, rotate, scale }}
            >
                <div
                    className="moon-tilt"
                    ref={imgRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                >
                    <img
                        src={moonImg}
                        alt="Moon"
                        className="moon-img"
                        draggable={false}
                    />
                </div>
            </motion.div>
        </section>
    );
}
