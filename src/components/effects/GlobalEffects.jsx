import { motion } from 'framer-motion';

function pseudoRandom(seed) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

const particles = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  left: `${pseudoRandom(i + 1) * 100}%`,
  top: `${pseudoRandom(i + 41) * 100}%`,
  size: 1 + pseudoRandom(i + 81) * 2,
  duration: 12 + pseudoRandom(i + 121) * 18,
  delay: pseudoRandom(i + 161) * 10,
  opacity: 0.15 + pseudoRandom(i + 201) * 0.35,
}));

function Particles() {

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
