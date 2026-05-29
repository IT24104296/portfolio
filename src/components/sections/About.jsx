import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Terminal, Code2, Sparkles } from 'lucide-react';

const highlights = [
  {
    icon: Terminal,
    title: 'Software Engineering',
    desc: 'Pursuing a degree in Software Engineering at SLIIT. Deeply interested in systems design, algorithms, and modular clean architectures.',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-400/20',
    bg: 'rgba(0,212,255,0.03)',
  },
  {
    icon: Code2,
    title: 'Full Stack Development',
    desc: 'Passionate about building end-to-end applications — from Java backends to interactive React frontends.',
    color: 'text-purple-400',
    borderColor: 'border-purple-400/20',
    bg: 'rgba(168,85,247,0.03)',
  },
  {
    icon: Sparkles,
    title: 'Interactive UI Design',
    desc: 'Obsessed with creating immersive, animated user experiences that blur the line between design and engineering.',
    color: 'text-teal-400',
    borderColor: 'border-teal-400/20',
    bg: 'rgba(6,182,212,0.03)',
  },
];

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: [0.25, 0.46, 0.45, 0.94] } },
});

export default function About() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding relative overflow-hidden" ref={sectionRef}>
      <div className="orb w-[400px] h-[400px] top-0 right-[-150px] bg-purple-700/8 pointer-events-none" />

      <div className="container-custom">
        {/* Header */}
        <motion.div
          variants={fadeUp(0)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <div className="section-tag justify-center mb-4">About Me</div>
          <h2 className="font-orbitron text-4xl md:text-5xl font-black text-white">
            Who Am I<span className="neon-text">?</span>
          </h2>
        </motion.div>

        {/* Bio + highlights */}
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Bio card */}
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="glass neon-border rounded-2xl p-8 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-cyan-400/10 to-transparent rounded-bl-2xl pointer-events-none" />
            <div className="scan-line opacity-30" />

            <div className="flex items-center gap-4 mb-6 relative z-10">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-purple-600 flex items-center justify-center font-orbitron font-black text-xl flex-shrink-0 animate-pulse-glow">
                V
              </div>
              <div>
                <h3 className="font-orbitron font-bold text-white text-lg">Vahinthan</h3>
                <p className="font-mono text-xs text-cyan-400 tracking-widest">SLIIT · Software Engineering Undergraduate</p>
              </div>
            </div>

            <p className="text-slate-300 leading-relaxed mb-4 relative z-10">
              I'm a passionate{' '}
              <span className="text-cyan-400 font-medium">Software Engineering undergraduate</span> at SLIIT
              (Sri Lanka Institute of Information Technology), with a deep love for{' '}
              <span className="text-purple-400 font-medium">full-stack development</span> and
              interactive UI engineering.
            </p>
            <p className="text-slate-400 leading-relaxed mb-4 relative z-10">
              I focus on the complete software lifecycle — writing clean, modular code, designing robust APIs, and optimizing system performance.
            </p>
            <p className="text-slate-400 leading-relaxed relative z-10">
              When I'm not writing code, I'm exploring advanced architectural patterns, studying algorithms and data structures, and pushing the boundaries of interactive browser experiences.
            </p>

            <div className="flex flex-wrap gap-2 mt-6 relative z-10">
              {['SLIIT', 'Sri Lanka', 'Open to Internship', 'Clean Code Advocate'].map(tag => (
                <span
                  key={tag}
                  className="font-mono text-xs px-3 py-1 rounded-full glass neon-border text-cyan-400/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Highlight cards */}
          <div className="flex flex-col gap-4">
            {highlights.map((item, i) => (
              <motion.div
                key={item.title}
                variants={fadeUp(0.2 + i * 0.12)}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                whileHover={{ scale: 1.02, x: 6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`rounded-xl p-5 border ${item.borderColor} relative overflow-hidden group cursor-default`}
                style={{ background: item.bg }}
              >
                <div className="flex items-start gap-4">
                  <div className={`${item.color} mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity flex-shrink-0`}>
                    <item.icon size={22} />
                  </div>
                  <div>
                    <h4 className={`font-orbitron font-bold text-sm ${item.color} mb-1.5`}>{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
