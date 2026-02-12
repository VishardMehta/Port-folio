import useScrollReveal from '../hooks/useScrollReveal';
import { skills } from '../data/portfolio';

export default function Skills() {
    const ref = useScrollReveal();

    return (
        <section className="section skills" id="skills" ref={ref}>
            <div className="skills-track">
                {skills.map((s, i) => (
                    <div className="skill-card reveal" key={i}>
                        <h3 className="skill-title">{s.title}</h3>
                        <p className="skill-desc">{s.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
