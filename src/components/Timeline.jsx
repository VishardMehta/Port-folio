import { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Stage, Html, OrbitControls } from '@react-three/drei';
import { timeline } from '../data/portfolio';
import './Timeline.css';

/* ── 3D Moon Component ── */
function MoonModel({ scrollProgress }) {
    const { scene } = useGLTF('/moon.glb');
    const meshRef = useRef();

    useFrame(() => {
        if (meshRef.current) {
            // Rotation speed logic can be tuned
            meshRef.current.rotation.y =
                scrollProgress.current * Math.PI * 0.5 + performance.now() * 0.00005;
        }
    });

    return <primitive ref={meshRef} object={scene} />;
}

export default function Timeline() {
    const sectionRef = useRef(null);
    const scrollProgress = useRef(0);

    useEffect(() => {
        useGLTF.preload('/moon.glb');
    }, []);

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

            // ── Animation Logic ──
            // "Pile Up" Logic: Cards fly in from Right and Stack/Overlap in center.
            // They do NOT exit left. They stay.

            const isDesktop = window.innerWidth > 768;
            const cardWidth = isDesktop ? window.innerWidth * 0.22 : window.innerWidth * 0.85;

            // Overlap Logic to fit in Screen
            // Available width = 90vw?
            const availableWidth = window.innerWidth * 0.9;
            const totalWidthRaw = numCards * cardWidth;

            // If raw width fits, use standard gap. If not, use required overlap.
            let gap = 40;
            if (totalWidthRaw > availableWidth && numCards > 1) {
                // negative gap = overlap
                gap = (availableWidth - totalWidthRaw) / (numCards - 1);
            }
            // Add a limit to overlap? Don't hide more than 50%?
            // If gap < -cardWidth * 0.5, we might need to squish scale?
            // Let's rely on overlap for now.

            // Calculate Final Positions (Centered Strip)
            const finalTotalWidth = numCards * cardWidth + (numCards - 1) * gap;
            const startX_Chain = -finalTotalWidth / 2; // Left edge of first card relative to center

            // Animation Stagger
            const stagger = 0.1; // 10% overlap in timing
            const entryDuration = 0.5; // Each card takes 50% of scroll to settle? 
            // We want them to fill the sequence from 0 to 0.9.
            // i=0 starts at 0.
            // i=last starts at ??

            // Simple mapping: 
            // FinalX = startX_Chain + i * (cardWidth + gap) + cardWidth/2 (for center);

            cards.forEach((card, i) => {
                // Final Target Position (Center of card relative to screen center)
                // chain start + i offset + half_width
                const finalX = startX_Chain + i * (cardWidth + gap) + cardWidth / 2;

                // Fly-in Logic
                // Start Position: Offscreen Right.
                // startX = window.innerWidth / 2 + cardWidth;
                const entryX = window.innerWidth / 2 + cardWidth + i * 100; // Stagger start pos too?

                // Timing
                // Card i enters from progress A to B.
                // We divide scroll into segments?
                // Or just fluid interruptible spring feel?
                // Let's use simple segmentation for control.

                // Total duration available 0 to 0.9.
                // Step per card?
                const step = 0.12;
                const startP = i * step;
                const endP = startP + 0.4; // Valid duration

                // Progress normalized for this card
                const t = Math.min(Math.max((progress - startP) / (endP - startP), 0), 1);
                // Ease out
                const eased = 1 - Math.pow(1 - t, 3);

                // Interpolate
                const currentX = entryX + (finalX - entryX) * eased;

                // Slight Stack Effect in Z? 
                // Card i should be above card i-1? 
                // Standard DOM order does this (later in DOM = higher Z).

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

                {/* 3D Moon - Centered */}
                <div className="moon-3d-canvas">
                    <Canvas shadows dpr={[1, 2]} camera={{ fov: 45 }}>
                        <Suspense fallback={null}>
                            {/* Darker per request: intensity 0.15 */}
                            <Stage environment="city" intensity={0.15} contactShadow={false} adjustCamera>
                                <MoonModel scrollProgress={scrollProgress} />
                            </Stage>
                        </Suspense>
                        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.2} makeDefault />
                    </Canvas>
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
