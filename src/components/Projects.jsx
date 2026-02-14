import { useRef, useEffect } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { projects } from '../data/portfolio';

export default function Projects() {
    const ref = useScrollReveal();
    const cubeRef = useRef(null);
    const rotationRef = useRef({ x: 0, y: 0 });
    const isDraggingRef = useRef(false);
    const lastMouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        let animationFrameId;

        const animate = () => {
            if (!isDraggingRef.current && cubeRef.current) {
                // Auto-rotate logic (slow spin)
                rotationRef.current.x += 0.5;
                rotationRef.current.y += 0.5;
                cubeRef.current.style.transform = `rotateX(${rotationRef.current.x}deg) rotateY(${rotationRef.current.y}deg)`;
            }
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    const handleMouseDown = (e) => {
        isDraggingRef.current = true;
        lastMouseRef.current = { x: e.clientX, y: e.clientY };
        if (cubeRef.current) {
            cubeRef.current.style.cursor = 'grabbing';
            // Stop CSS animation if present (though we are overriding transform manually)
            cubeRef.current.style.animation = 'none';
        }
    };

    const handleMouseMove = (e) => {
        if (!isDraggingRef.current) return;

        const deltaX = e.clientX - lastMouseRef.current.x;
        const deltaY = e.clientY - lastMouseRef.current.y;

        // Update rotation state
        rotationRef.current.y += deltaX * 0.5;
        rotationRef.current.x -= deltaY * 0.5;

        // Apply immediately
        if (cubeRef.current) {
            cubeRef.current.style.transform = `rotateX(${rotationRef.current.x}deg) rotateY(${rotationRef.current.y}deg)`;
        }

        lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
        isDraggingRef.current = false;
        if (cubeRef.current) {
            cubeRef.current.style.cursor = 'grab';
        }
    };

    return (
        <section className="section work" id="work" ref={ref}>
            <div className="section-header reveal">
                <span className="section-tag">Projects</span>
                <h2 className="section-title">My Work</h2>
            </div>


            <div className="projects-grid">
                {projects.map((p, i) => (
                    <div className="project-card reveal" key={i}>
                        <div className="project-number">{p.number}</div>
                        <h3 className="project-name">{p.name}</h3>
                        <p className="project-desc">{p.desc}</p>
                        <div className="project-links">
                            {p.repo && (
                                <a
                                    href={p.repo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-link"
                                >
                                    GitHub ↗
                                </a>
                            )}
                            {p.link && p.link !== '#' && p.link !== p.repo && (
                                <a
                                    href={p.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="project-link live"
                                >
                                    Live Demo ↗
                                </a>
                            )}
                        </div>
                        <div className="project-tags">
                            {p.tags.map((t, j) => (
                                <span key={j}>{t}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* 3D Cube */}
            {/* 3D Cube - Interactive */}
            <div
                className="cube-container reveal"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{ cursor: 'grab' }}
            >
                <div className="cube" ref={cubeRef}>
                    <div className="cube-face front">VM</div>
                    <div className="cube-face back">DEV</div>
                    <div className="cube-face right">ML</div>
                    <div className="cube-face left">AI</div>
                    <div className="cube-face top">CODE</div>
                    <div className="cube-face bottom">DATA</div>
                </div>
            </div>
        </section>
    );
}
