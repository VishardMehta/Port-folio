import { useState } from 'react';
import useScrollReveal from '../hooks/useScrollReveal';
import { personal } from '../data/portfolio';

const links = [
    { name: 'GitHub', subtitle: 'My project dumpyard', url: personal.github },
    { name: 'LinkedIn', subtitle: 'The corporate me', url: personal.linkedin },
    { name: 'Kaggle', subtitle: 'Where I compete', url: 'https://www.kaggle.com/vishardmehta' },
    { name: 'Instagram', subtitle: 'The real me', url: 'https://instagram.com/vishard_mehta' },
];

export default function Contact() {
    const ref = useScrollReveal();
    const [hovered, setHovered] = useState(null);

    return (
        <section className="section connect" id="contact" ref={ref}>
            <div className="connect-header">
                <div className="section-header reveal">
                    <span className="section-tag">Connect</span>
                    <h2 className="section-title">Let&apos;s talk.</h2>
                </div>
            </div>

            <div className="connect-body reveal">
                {/* Left column */}
                <div className="connect-col">
                    {links.slice(0, 2).map((link, i) => (
                        <a
                            key={i}
                            className="connect-link"
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setHovered(link.name)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            <span className="connect-link-inner">
                                <span className="connect-link-name">
                                    {hovered === link.name ? link.subtitle : link.name}
                                </span>
                            </span>
                        </a>
                    ))}
                </div>

                {/* Middle column */}
                <div className="connect-col">
                    {links.slice(2).map((link, i) => (
                        <a
                            key={i}
                            className="connect-link"
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onMouseEnter={() => setHovered(link.name)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            <span className="connect-link-inner">
                                <span className="connect-link-name">
                                    {hovered === link.name ? link.subtitle : link.name}
                                </span>
                            </span>
                        </a>
                    ))}
                </div>

                {/* Right column — contact info */}
                <div className="connect-info">
                    <div className="connect-info-block">
                        <div className="connect-info-label">Email</div>
                        <a
                            className="connect-info-value"
                            href={`mailto:${personal.email}`}
                        >
                            {personal.email}
                        </a>
                        <div className="connect-info-subtext">
                            100% chance I read it
                        </div>
                    </div>
                    <div className="connect-info-block">
                        <div className="connect-info-label">Location</div>
                        <div className="connect-info-value">
                            Patiala, Punjab, India
                        </div>
                        <div className="connect-info-subtext">
                            Thapar Institute of Engineering &amp; Technology
                        </div>
                    </div>
                </div>
            </div>

            <footer className="footer reveal">
                <p>&copy; {new Date().getFullYear()} Vishard Mehta — All rights reserved.</p>
            </footer>
        </section>
    );
}
