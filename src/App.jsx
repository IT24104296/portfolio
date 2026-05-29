import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import CustomCursor from './components/effects/CustomCursor';
import GlobalEffects from './components/effects/GlobalEffects';
import PageLoader from './components/effects/PageLoader';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Timeline from './components/sections/Timeline';
import Contact from './components/sections/Contact';

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const lenisRef = useRef(null);

  // Lenis smooth scroll
  useEffect(() => {
    if (!loaded) return;
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, [loaded]);

  return (
    <>
      <PageLoader onComplete={() => setLoaded(true)} />

      {loaded && (
        <>
          <CustomCursor />
          <GlobalEffects />
          <div className="relative min-h-screen" style={{ background: '#020408' }}>
            {/* Global ambient gradient */}
            <div
              className="fixed inset-0 pointer-events-none z-0"
              style={{
                background: 'radial-gradient(ellipse at 20% 50%, rgba(0,212,255,0.04) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(124,58,237,0.05) 0%, transparent 60%)',
              }}
            />

            <Navbar />

            <main className="relative z-10 grid-bg">
              <Hero />

              {/* Section separator */}
              <div className="glow-line opacity-30" />

              <About />

              <div className="glow-line opacity-20" style={{ background: 'linear-gradient(90deg, transparent, #7c3aed, transparent)' }} />

              <Skills />

              <div className="glow-line opacity-20" />

              <Projects />

              <div className="glow-line opacity-20" style={{ background: 'linear-gradient(90deg, transparent, #7c3aed, transparent)' }} />

              <Timeline />

              <div className="glow-line opacity-20" />

              <Contact />
            </main>

            <Footer />
          </div>
        </>
      )}
    </>
  );
}
