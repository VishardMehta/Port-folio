import useScrollReveal from '../hooks/useScrollReveal';
import { projects } from '../data/portfolio';

export default function Projects() {
    const ref = useScrollReveal();

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
                        <div className="project-tags">
                            {p.tags.map((t, j) => (
                                <span key={j}>{t}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* 3D Cube */}
            <div className="cube-container reveal">
                <div className="cube">
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
