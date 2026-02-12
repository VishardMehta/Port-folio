import { useEffect, useState } from 'react';

const links = [
    { label: 'ABOUT', href: '#about' },
    { label: 'WORK', href: '#work' },
    { label: 'CONTACT', href: '#contact' },
];

export default function Navbar({ visible }) {
    const [active, setActive] = useState('');

    useEffect(() => {
        const sections = document.querySelectorAll('.section[id]');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActive(entry.target.id);
                });
            },
            { threshold: 0.3 }
        );
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    const handleClick = (e, href) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    return (
        <nav className={`nav ${visible ? 'visible' : ''}`}>
            {links.map((l) => (
                <a
                    key={l.href}
                    href={l.href}
                    className={`nav-link ${active === l.href.slice(1) ? 'active' : ''}`}
                    onClick={(e) => handleClick(e, l.href)}
                >
                    {l.label}
                </a>
            ))}
        </nav>
    );
}
