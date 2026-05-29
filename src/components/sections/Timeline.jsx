import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { timeline } from '../../data/timeline';

function TimelineItem({ item, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative flex items-start gap-0 w-full mb-12">
      {/* Left side content (desktop) */}
      <div className={`hidden md:flex flex-col flex-1 ${isLeft ? 'items-end pr-10' : 'items-start pl-10 opacity-0 pointer-events-none'}`}>
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass rounded-2xl p-5 max-w-sm border border-white/5 hover:border-cyan-400/20 transition-all duration-300 group"
            style={{ boxShadow: item.isFuture ? `0 0 20px ${item.color}15` : 'none' }}
          >
            <CardContent item={item} />
          </motion.div>
        )}
      </div>

      {/* Center line & dot */}
      <div className="flex flex-col items-center relative z-10 flex-shrink-0">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-12 h-12 rounded-full glass flex items-center justify-center text-xl flex-shrink-0"
          style={{
            border: `2px solid ${item.color}60`,
            boxShadow: `0 0 20px ${item.color}30, 0 0 40px ${item.color}10`,
          }}
        >
          {item.icon}
          {item.isFuture && (
            <div
              className="absolute inset-0 rounded-full animate-ping opacity-30"
              style={{ background: item.color }}
            />
          )}
        </motion.div>

        {/* Year badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="mt-2 px-3 py-1 rounded-full font-orbitron text-xs font-bold"
          style={{
            background: `${item.color}15`,
            color: item.color,
            border: `1px solid ${item.color}40`,
            boxShadow: `0 0 10px ${item.color}20`,
          }}
        >
          {item.year}
        </motion.div>
      </div>

      {/* Right side content (desktop) */}
      <div className={`hidden md:flex flex-col flex-1 ${!isLeft ? 'items-start pl-10' : 'items-end pr-10 opacity-0 pointer-events-none'}`}>
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="glass rounded-2xl p-5 max-w-sm border border-white/5 hover:border-cyan-400/20 transition-all duration-300 group"
          >
            <CardContent item={item} />
          </motion.div>
        )}
      </div>

      {/* Mobile content */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="md:hidden glass rounded-2xl p-4 flex-1 border border-white/5"
      >
        <CardContent item={item} />
      </motion.div>
    </div>
  );
}

function CardContent({ item }) {
  return (
    <>
      {item.isFuture && (
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: item.color }} />
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: item.color }}>
            Goal
          </span>
        </div>
      )}
      <h3 className="font-orbitron font-bold text-white text-sm mb-2 group-hover:text-cyan-400 transition-colors">
        {item.title}
      </h3>
      <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
    </>
  );
}

export default function Timeline() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="timeline" className="section-padding relative overflow-hidden" ref={sectionRef}>
      <div className="orb w-[300px] h-[300px] bottom-0 left-0 bg-purple-700/8 pointer-events-none" />

      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-tag justify-center mb-4">Journey</div>
          <h2 className="font-orbitron text-4xl md:text-5xl font-black text-white">
            My <span className="neon-text">Timeline</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical glowing line (desktop) */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px hidden md:block timeline-line"
            style={{ zIndex: 0 }}
          />
          {/* Vertical line (mobile) */}
          <div className="absolute left-[22px] top-0 bottom-0 w-px md:hidden"
            style={{ background: 'linear-gradient(180deg, transparent, #00d4ff 10%, #7c3aed 90%, transparent)', boxShadow: '0 0 10px rgba(0,212,255,0.3)' }}
          />

          {timeline.map((item, i) => (
            <TimelineItem key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
