import { useEffect, useRef } from 'react';

export default function Hero({ loaded }) {
    const linesRef = useRef([]);

    useEffect(() => {
        if (loaded) {
            linesRef.current.forEach((el) => el?.classList.add('animate'));
        }
    }, [loaded]);

    const words = [
        { text: 'BUILDING', color: 'cream' },
        { text: 'WITH', color: 'orange' },
        { text: 'INTENT', color: 'cream' },
    ];

    return (
        <section className="section hero" id="home">
            <p className="hero-label">VISHARD MEHTA</p>
            <h1 className="hero-title">
                {words.map((w, i) => (
                    <span
                        key={i}
                        className={`hero-line ${w.color}`}
                        ref={(el) => (linesRef.current[i] = el)}
                    >
                        {w.text}
                    </span>
                ))}
            </h1>
        </section>
    );
}
