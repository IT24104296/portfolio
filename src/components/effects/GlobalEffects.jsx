import { useMemo } from 'react';
import { motion } from 'framer-motion';

function Particles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: 1 + Math.random() * 2,
        duration: 12 + Math.random() * 18,
        delay: Math.random() * 10,
        opacity: 0.15 + Math.random() * 0.35,
      })),
    [],
  );

  return (
    <div className="global-particles" aria-hidden>
      {particles.map((p) => (
        <span
          key={p.id}
          className="global-particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function GlobalEffects() {
  return (
    <div className="global-effects" aria-hidden>
      <Particles />
      <div className="global-noise" />
      <div className="global-vignette" />
      <div className="global-grid-shimmer" />
      <motion.div
        className="global-scan-beam"
        animate={{ top: ['-5%', '105%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />
      <div className="global-aurora global-aurora--cyan" />
      <div className="global-aurora global-aurora--purple" />
    </div>
  );
}
