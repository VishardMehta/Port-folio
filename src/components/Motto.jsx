import useScrollReveal from '../hooks/useScrollReveal';
import { motto } from '../data/portfolio';

export default function Motto() {
    const ref = useScrollReveal();

    return (
        <section className="section motto" id="motto" ref={ref}>
            <div className="motto-content reveal">
                <h2
                    className="motto-text"
                    dangerouslySetInnerHTML={{ __html: motto.text }}
                />
                <p className="motto-author">{motto.author}</p>
            </div>
        </section>
    );
}
