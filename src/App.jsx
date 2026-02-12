import { useState } from 'react';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Projects from './components/Projects';
import Stats from './components/Stats';
import Motto from './components/Motto';
import Contact from './components/Contact';

export default function App() {
    const [loaded, setLoaded] = useState(false);

    return (
        <>
            <Cursor />
            <Loader onComplete={() => setLoaded(true)} />

            {/* Subtle grid overlay */}
            <div className="grid-overlay" aria-hidden="true" />

            {/* Main content */}
            <div className={`site-wrapper ${loaded ? 'visible' : ''}`}>
                <Sidebar visible={loaded} />
                <Navbar visible={loaded} />
                <Hero loaded={loaded} />
                <About />
                <Skills />
                <Timeline />
                <Projects />
                <Stats />
                <Motto />
                <Contact />
            </div>
        </>
    );
}
