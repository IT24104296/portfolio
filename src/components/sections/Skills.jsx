import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { skills, additionalSkills } from '../../data/skills';

const CX = 280;
const CY = 280;
const RADIUS = 180;

function polarToCartesian(cx, cy, r, angle) {
  const rad = (angle - 90) * (Math.PI / 180);
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function SkillNode({ skill, index, total, active, onHover, onLeave }) {
  const angle = (index / total) * 360;
  const pos = polarToCartesian(CX, CY, RADIUS, angle);
  const isActive = active === index;

  return (
    <g
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
      style={{ cursor: 'pointer' }}
    >
      {/* Connector line */}
      <motion.line
        x1={CX}
        y1={CY}
        x2={pos.x}
        y2={pos.y}
        stroke={skill.color}
        strokeWidth={isActive ? 2 : 1}
        strokeDasharray="4 4"
        opacity={isActive ? 1 : 0.3}
        animate={{ opacity: isActive ? 1 : 0.3, strokeWidth: isActive ? 2 : 1 }}
        transition={{ duration: 0.3 }}
        style={{ filter: isActive ? `drop-shadow(0 0 6px ${skill.color})` : 'none' }}
      />

      {/* Level arc */}
      <motion.circle
        cx={pos.x}
        cy={pos.y}
        r={isActive ? 34 : 28}
        fill="rgba(2,4,8,0.9)"
        stroke={skill.color}
        strokeWidth={isActive ? 2.5 : 1.5}
        animate={{ r: isActive ? 34 : 28, strokeWidth: isActive ? 2.5 : 1.5 }}
        transition={{ duration: 0.3 }}
        style={{
          filter: isActive ? `drop-shadow(0 0 12px ${skill.color})` : `drop-shadow(0 0 4px ${skill.color}60)`,
        }}
      />

      {/* Skill name */}
      <text
        x={pos.x}
        y={pos.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fill={isActive ? skill.color : '#94a3b8'}
        fontSize={isActive ? '10' : '9'}
        fontFamily="JetBrains Mono, monospace"
        fontWeight={isActive ? '700' : '500'}
      >
        {skill.name.split(' ')[0]}
      </text>

      {/* Level % badge */}
      {isActive && (
        <g>
          <rect
            x={pos.x - 18}
            y={pos.y + 38}
            width={36}
            height={16}
            rx={4}
            fill={skill.color}
            opacity={0.9}
          />
          <text
            x={pos.x}
            y={pos.y + 48}
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#000"
            fontSize="9"
            fontFamily="Orbitron, monospace"
            fontWeight="700"
          >
            {skill.level}%
          </text>
        </g>
      )}
    </g>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeSkill, setActiveSkill] = useState(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRotation(prev => (prev + 0.15) % 360);
    }, 16);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="skills" className="section-padding relative overflow-hidden" ref={sectionRef}>
      <div className="orb w-[500px] h-[500px] top-0 left-[-200px] bg-cyan-500/5 pointer-events-none" />

      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 md:mb-20"
        >
          <div className="section-tag justify-center mb-4">Arsenal</div>
          <h2 className="font-orbitron text-3xl md:text-5xl font-black text-white">
            Tech <span className="neon-text">Skills</span>
          </h2>
          <p className="text-slate-500 mt-4 font-mono text-sm">Hover a node to explore</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* SVG Skill Web */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="relative aspect-square w-full max-w-[560px]">
              <svg
                viewBox="0 0 560 560"
                className="w-full h-full"
                style={{ filter: 'drop-shadow(0 0 30px rgba(0,212,255,0.1))' }}
              >
                {/* Outer decorative rings */}
                {[230, 210, 190].map((r) => (
                  <circle
                    key={r}
                    cx={CX}
                    cy={CY}
                    r={r}
                    fill="none"
                    stroke="rgba(0,212,255,0.06)"
                    strokeWidth={1}
                    strokeDasharray="3 6"
                  />
                ))}

                {/* Rotating dotted ring */}
                <g transform={`rotate(${rotation}, ${CX}, ${CY})`}>
                  <circle
                    cx={CX}
                    cy={CY}
                    r={220}
                    fill="none"
                    stroke="rgba(0,212,255,0.12)"
                    strokeWidth={1}
                    strokeDasharray="6 12"
                  />
                </g>

                {/* Skill nodes */}
                {skills.map((skill, i) => (
                  <SkillNode
                    key={skill.name}
                    skill={skill}
                    index={i}
                    total={skills.length}
                    active={activeSkill}
                    onHover={setActiveSkill}
                    onLeave={() => setActiveSkill(null)}
                  />
                ))}

                {/* Center node */}
                <circle cx={CX} cy={CY} r={52} fill="rgba(0,212,255,0.05)" stroke="#00d4ff" strokeWidth={1.5} />
                <circle cx={CX} cy={CY} r={40} fill="rgba(0,0,0,0.8)" stroke="rgba(0,212,255,0.3)" strokeWidth={1} />
                <text
                  x={CX}
                  y={CY - 6}
                  textAnchor="middle"
                  fill="#00d4ff"
                  fontSize="8"
                  fontFamily="Orbitron, monospace"
                  fontWeight="700"
                  letterSpacing="2"
                >
                  VAHINTHAN
                </text>
                <text
                  x={CX}
                  y={CY + 8}
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize="6"
                  fontFamily="JetBrains Mono, monospace"
                >
                  FULL STACK
                </text>
                <text
                  x={CX}
                  y={CY + 18}
                  textAnchor="middle"
                  fill="#64748b"
                  fontSize="6"
                  fontFamily="JetBrains Mono, monospace"
                >
                  DEV · SEC
                </text>

                {/* Pulsing center glow */}
                <circle cx={CX} cy={CY} r={52} fill="none" stroke="#00d4ff" strokeWidth={0.5} opacity={0.5}>
                  <animate attributeName="r" values="52;62;52" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" repeatCount="indefinite" />
                </circle>
              </svg>
            </div>
          </motion.div>

          {/* Skill list + legend */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <h3 className="font-orbitron text-lg font-bold text-white mb-6">
                Core <span className="text-cyan-400">Competencies</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: 30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.06 }}
                    className={`group flex items-center gap-3.5 glass rounded-lg px-4 py-4 cursor-default transition-all duration-300 ${
                      activeSkill === i ? 'neon-border' : 'border border-white/5 hover:border-white/10'
                    }`}
                    onMouseEnter={() => setActiveSkill(i)}
                    onMouseLeave={() => setActiveSkill(null)}
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: skill.color,
                        boxShadow: `0 0 8px ${skill.color}`,
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="font-mono text-sm text-slate-300 group-hover:text-white transition-colors truncate">
                            {skill.name}
                          </span>
                          <span className="text-[9px] text-slate-600 font-mono hidden sm:inline flex-shrink-0">
                            {skill.category}
                          </span>
                        </div>
                        <span className="font-mono text-xs flex-shrink-0" style={{ color: skill.color }}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                          transition={{ duration: 1, delay: 0.5 + i * 0.08, ease: 'easeOut' }}
                          className="h-full rounded-full"
                          style={{
                            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}99)`,
                            boxShadow: `0 0 6px ${skill.color}60`,
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Additional skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <h4 className="font-mono text-xs text-slate-500 tracking-widest uppercase mb-4 mt-3">Also familiar with</h4>
              <div className="flex flex-wrap gap-2">
                {additionalSkills.map(s => (
                  <span
                    key={s}
                    className="font-mono text-xs px-3 py-1.5 rounded-full glass border border-white/8 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all duration-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
