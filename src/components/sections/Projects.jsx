import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { ExternalLink, X } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projects } from '../../data/projects';

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        onClick={e => e.stopPropagation()}
        className="glass-strong rounded-2xl overflow-hidden max-w-3xl w-full max-h-[90vh] overflow-y-auto"
        style={{ border: `1px solid ${project.accentColor}40` }}
      >
        {/* Hero image */}
        <div className="relative h-52 sm:h-64 overflow-hidden">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-cyber-black via-cyber-black/60 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 glass rounded-full flex items-center justify-center text-slate-300 hover:text-white hover:scale-110 transition-all"
          >
            <X size={18} />
          </button>
          <div className="absolute bottom-4 left-6">
            <span
              className="font-mono text-xs px-3 py-1 rounded-full mb-2 inline-block"
              style={{ background: `${project.accentColor}20`, color: project.accentColor, border: `1px solid ${project.accentColor}40` }}
            >
              {project.category}
            </span>
            <h2 className="font-orbitron text-2xl font-black text-white">{project.title}</h2>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {/* Overview */}
          <div className="mb-6">
            <h3 className="font-orbitron text-sm font-bold mb-3" style={{ color: project.accentColor }}>OVERVIEW</h3>
            <p className="text-slate-300 leading-relaxed">{project.longDescription}</p>
          </div>

          {/* Features */}
          <div className="mb-6">
            <h3 className="font-orbitron text-sm font-bold mb-3" style={{ color: project.accentColor }}>KEY FEATURES</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {project.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-400">
                  <span style={{ color: project.accentColor }}>▸</span> {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div className="mb-8">
            <h3 className="font-orbitron text-sm font-bold mb-3" style={{ color: project.accentColor }}>TECH STACK</h3>
            <div className="flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span
                  key={t}
                  className="font-mono text-xs px-3 py-1.5 rounded-full"
                  style={{ background: `${project.accentColor}15`, color: project.accentColor, border: `1px solid ${project.accentColor}35` }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-4">
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-neon flex-1 justify-center">
                            <FaGithub size={15} /> GitHub
            </a>
            {project.demo !== '#' && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-neon btn-neon-solid flex-1 justify-center">
                <ExternalLink size={15} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [modalProject, setModalProject] = useState(null);

  return (
    <section id="projects" className="section-padding relative overflow-hidden" ref={sectionRef}>
      <div className="orb w-[400px] h-[400px] top-1/2 right-[-150px] bg-cyan-500/6 pointer-events-none" />

      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="section-tag justify-center mb-4">Work</div>
          <h2 className="font-orbitron text-4xl md:text-5xl font-black text-white">
            Featured <span className="neon-text">Projects</span>
          </h2>
          <p className="text-slate-500 mt-4 font-mono text-sm">Hover to expand · Click for details</p>
        </motion.div>

        {/* Expanding cards — desktop */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden lg:flex gap-3 h-[520px]"
        >
          {projects.map((project, i) => {
            const isHovered = hoveredIdx === i;
            return (
              <motion.div
                key={project.id}
                className="project-card rounded-2xl relative"
                animate={{
                  flex: isHovered ? 4 : 1,
                }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                style={{
                  border: isHovered
                    ? `1px solid ${project.accentColor}60`
                    : '1px solid rgba(255,255,255,0.05)',
                  boxShadow: isHovered ? `0 0 40px ${project.accentColor}20` : 'none',
                }}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                onClick={() => setModalProject(project)}
              >
                {/* Background image */}
                <div
                  className="absolute inset-0 bg-cover bg-center rounded-2xl transition-opacity duration-500"
                  style={{
                    backgroundImage: `url(${project.image})`,
                    opacity: isHovered ? 0.35 : 0.15,
                  }}
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background: isHovered
                      ? `linear-gradient(to top, ${project.accentColor}20, transparent, transparent)`
                      : 'linear-gradient(to top, rgba(2,4,8,0.9), rgba(2,4,8,0.5))',
                  }}
                />

                {/* Collapsed state: vertical title */}
                {!isHovered && (
                  <div className="absolute inset-0 flex flex-col items-center justify-end p-4">
                    <span
                      className="font-orbitron text-xs font-bold tracking-widest text-slate-400 writing-vertical"
                      style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', transform: 'rotate(180deg)' }}
                    >
                      {project.title}
                    </span>
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-2"
                      style={{ backgroundColor: project.accentColor }}
                    />
                  </div>
                )}

                {/* Expanded state content */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="absolute inset-0 flex flex-col justify-end p-6"
                    >
                      <div className="mb-3">
                        <span
                          className="font-orbitron font-black text-5xl opacity-20 absolute top-6 right-6"
                          style={{ color: project.accentColor }}
                        >
                          {project.number}
                        </span>
                        <span
                          className="font-mono text-xs px-2 py-1 rounded mb-2 inline-block"
                          style={{ background: `${project.accentColor}20`, color: project.accentColor }}
                        >
                          {project.category}
                        </span>
                        <h3 className="font-orbitron text-xl font-black text-white mb-2 leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-slate-300 text-sm leading-relaxed mb-4 line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      {/* Tech badges */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tech.slice(0, 4).map(t => (
                          <span
                            key={t}
                            className="font-mono text-xs px-2 py-0.5 rounded"
                            style={{ background: `${project.accentColor}15`, color: project.accentColor, border: `1px solid ${project.accentColor}30` }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2">
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className="flex items-center gap-1.5 px-3 py-2 glass rounded-lg font-mono text-xs text-slate-300 hover:text-white border border-white/10 hover:border-white/30 transition-all"
                        >
                                                    <FaGithub size={12} /> GitHub
                        </a>
                        <button
                          onClick={() => setModalProject(project)}
                          className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg font-mono text-xs text-black font-bold transition-all"
                          style={{ background: `linear-gradient(135deg, ${project.accentColor}, ${project.accentColor}80)` }}
                        >
                          <ExternalLink size={12} /> Details
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Mobile / tablet: vertical cards */}
        <div className="flex lg:hidden flex-col gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setModalProject(project)}
              className="rounded-2xl overflow-hidden cursor-pointer relative group"
              style={{ border: `1px solid ${project.accentColor}30` }}
            >
              <div className="relative h-44 overflow-hidden">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-black to-transparent" />
              </div>
              <div className="p-5 glass">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs" style={{ color: project.accentColor }}>{project.category}</span>
                  <span className="font-orbitron text-xs text-slate-600">{project.number}</span>
                </div>
                <h3 className="font-orbitron font-bold text-white mb-2">{project.title}</h3>
                <p className="text-slate-400 text-sm line-clamp-2 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.slice(0, 3).map(t => (
                    <span key={t} className="font-mono text-xs px-2 py-0.5 rounded"
                      style={{ background: `${project.accentColor}15`, color: project.accentColor, border: `1px solid ${project.accentColor}30` }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalProject && (
          <ProjectModal project={modalProject} onClose={() => setModalProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
