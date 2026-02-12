import useScrollReveal from '../hooks/useScrollReveal';
import { testimonials } from '../data/portfolio';

export default function Testimonials() {
    const ref = useScrollReveal();
    const t = testimonials[0];

    return (
        <section className="section testimonials" id="testimonials" ref={ref}>
            <div className="section-header reveal">
                <span className="section-tag">What they said</span>
            </div>
            <div className="testimonial-card reveal">
                <span className="quote-icon">"</span>
                <p
                    className="testimonial-text"
                    dangerouslySetInnerHTML={{ __html: t.text }}
                />
                <div className="testimonial-author">
                    <span className="author-name">{t.author}</span>
                    <span className="author-role">{t.role}</span>
                </div>
            </div>
        </section>
    );
}
