import useScrollReveal from '../hooks/useScrollReveal';
import { timeline } from '../data/portfolio';

export default function Timeline() {
    const ref = useScrollReveal();

    return (
        <section className="section experience" id="experience" ref={ref}>
            <div className="section-header reveal">
                <span className="section-tag">Experience</span>
                <h2 className="section-title">My Journey</h2>
            </div>

            <div className="timeline-vertical">
                <div className="timeline-line" />

                {timeline.map((item, i) => (
                    <div className="timeline-entry reveal" key={i}>
                        <div className="timeline-dot" />
                        <div className="timeline-period">{item.period}</div>
                        <div className="timeline-content">
                            <h3 className="timeline-role">{item.role}</h3>
                            <span className="timeline-org">{item.org}</span>
                            <p className="timeline-desc">{item.description}</p>
                            {item.tags && (
                                <div className="timeline-tags">
                                    {item.tags.map((t, j) => (
                                        <span key={j}>{t}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
