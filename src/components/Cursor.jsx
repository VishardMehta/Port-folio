import { useEffect, useRef } from 'react';

export default function Cursor() {
    const dotRef = useRef(null);
    const followerRef = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });
    const followerPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMove = (e) => {
            mouse.current = { x: e.clientX, y: e.clientY };
            if (dotRef.current) {
                dotRef.current.style.left = e.clientX + 'px';
                dotRef.current.style.top = e.clientY + 'px';
            }
        };

        const animate = () => {
            followerPos.current.x += (mouse.current.x - followerPos.current.x) * 0.12;
            followerPos.current.y += (mouse.current.y - followerPos.current.y) * 0.12;
            if (followerRef.current) {
                followerRef.current.style.left = followerPos.current.x + 'px';
                followerRef.current.style.top = followerPos.current.y + 'px';
            }
            requestAnimationFrame(animate);
        };

        document.addEventListener('mousemove', handleMove);
        const raf = requestAnimationFrame(animate);

        // Hover effect delegation
        const onOver = (e) => {
            // Check for magnetic hero text
            const heroLine = e.target.closest('.hero-line, .hero-title, .motto-text');
            if (heroLine) {
                dotRef.current?.classList.add('hero-magnetic');
                followerRef.current?.classList.add('hero-magnetic');
                dotRef.current?.classList.remove('hover');
                followerRef.current?.classList.remove('hover');
                return;
            }

            const target = e.target.closest(
                'a, button, .project-card, .skill-card, .connect-link, .timeline-entry'
            );
            if (target) {
                dotRef.current?.classList.add('hover');
                followerRef.current?.classList.add('hover');
            }
        };

        const onOut = (e) => {
            const heroLine = e.target.closest('.hero-line, .hero-title, .motto-text, .motto');
            if (heroLine) {
                dotRef.current?.classList.remove('hero-magnetic');
                followerRef.current?.classList.remove('hero-magnetic');
                return;
            }

            const target = e.target.closest(
                'a, button, .project-card, .skill-card, .connect-link, .timeline-entry'
            );
            if (target) {
                dotRef.current?.classList.remove('hover');
                followerRef.current?.classList.remove('hover');
            }
        };

        document.addEventListener('mouseover', onOver);
        document.addEventListener('mouseout', onOut);

        return () => {
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseover', onOver);
            document.removeEventListener('mouseout', onOut);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <>
            <div className="cursor" ref={dotRef} />
            <div className="cursor-follower" ref={followerRef} />
        </>
    );
}
