import { useEffect, useRef, useState } from 'react';

export default function Loader({ onComplete }) {
    const circleRef = useRef(null);
    const [percent, setPercent] = useState(0);
    const [hidden, setHidden] = useState(false);
    const circumference = 2 * Math.PI * 40;

    useEffect(() => {
        let progress = 0;
        const id = setInterval(() => {
            progress += Math.random() * 5 + 2;
            if (progress >= 100) {
                progress = 100;
                clearInterval(id);
                setTimeout(() => {
                    setHidden(true);
                    onComplete();
                }, 400);
            }
            setPercent(Math.round(progress));
            if (circleRef.current) {
                circleRef.current.style.strokeDashoffset =
                    circumference - (progress / 100) * circumference;
            }
        }, 80);
        return () => clearInterval(id);
    }, []);

    return (
        <div className={`loader ${hidden ? 'hidden' : ''}`}>
            <div className="loader-ring">
                <svg viewBox="0 0 100 100">
                    <circle className="loader-track" cx="50" cy="50" r="40" />
                    <circle
                        className="loader-progress"
                        cx="50"
                        cy="50"
                        r="40"
                        ref={circleRef}
                    />
                </svg>
                <span className="loader-percent">{percent}%</span>
            </div>
            <span className="loader-label">VM</span>
        </div>
    );
}
