import { useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Download, ChevronDown } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import HeroCanvas from '../three/HeroCanvas';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export default function Hero() {
  const mouse = useRef({ x: 0, y: 0 });

  const onMouseMove = (e) => {
    mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden grid-bg"
      onMouseMove={onMouseMove}
    >
      {/* Background orbs */}
      <div className="orb w-[600px] h-[600px] top-[-200px] left-[-200px] bg-cyan-500/10" />
      <div className="orb w-[500px] h-[500px] bottom-[-100px] right-[-100px] bg-purple-700/10" />
      <div className="orb w-[300px] h-[300px] top-[40%] left-[40%] bg-blue-600/5" />

      <div className="container-custom relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen pt-20 pb-12">

          {/* Left: Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-6 lg:pr-8"
          >
            {/* Status badge */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="flex items-center gap-2 glass neon-border rounded-full px-4 py-2 w-fit">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="font-mono text-xs text-green-400 tracking-widest">
                  AVAILABLE FOR INTERNSHIP
                </span>
              </div>
            </motion.div>

            {/* Greeting */}
            <motion.div variants={itemVariants}>
              <p className="font-mono text-xs md:text-sm text-cyan-400/70 tracking-[0.3em] uppercase mb-2">
                Hello World, I'm
              </p>
              <h1 className="font-orbitron text-4xl md:text-6xl xl:text-7xl font-black leading-tight">
                <span className="neon-text animate-glitch block">VAHINTHAN</span>
              </h1>
            </motion.div>

            {/* Typing animation */}
            <motion.div variants={itemVariants}>
              <div className="flex items-center gap-3">
                <span className="text-slate-500 font-mono text-sm">$</span>
                <TypeAnimation
                  sequence={[
                    'Software Engineering Student', 2500,
                    'Full Stack Developer', 2500,
                    'UI/UX Architect', 2000,
                    'Problem Solver', 2000,
                    'SLIIT Undergraduate', 2000,
                  ]}
                  wrapper="span"
                  speed={50}
                  repeat={Infinity}
                  className="font-mono text-lg md:text-xl text-cyan-400 font-medium"
                />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-slate-400 text-base leading-relaxed max-w-md text-justify"
            >
              Crafting immersive digital experiences at the intersection of
              <span className="text-cyan-400"> software engineering</span> and
              <span className="text-purple-400"> full-stack development</span>.
              Passionate about building secure, beautiful, and high-performance applications.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap gap-4 mt-6">
              <button onClick={scrollToProjects} className="btn-neon btn-neon-solid w-full sm:w-auto justify-center">
                <span>View Projects</span>
              </button>
              <a href="/resume.pdf" download="Vahinthan_Resume.pdf" className="btn-neon w-full sm:w-auto justify-center">
                <Download size={14} />
                <span>Resume</span>
              </a>
            </motion.div>

            {/* Social links */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
              <span className="font-mono text-xs text-slate-600 tracking-widest">FIND ME ON</span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <a
                  href="https://github.com/IT24104296"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass neon-border rounded-lg flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-neon-cyan"
                >
                  <FaGithub size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/raseetharanvahinthan/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass neon-border rounded-lg flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all duration-300 hover:shadow-neon-cyan"
                >
                  <FaLinkedin size={18} />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: 'easeOut' }}
            className="relative h-[300px] sm:h-[400px] lg:h-[600px] w-full"
          >
            <Suspense fallback={
              <div className="w-full h-full flex items-center justify-center">
                <div className="w-32 h-32 rounded-full border-2 border-cyan-400/30 border-t-cyan-400 animate-spin" />
              </div>
            }>
              <HeroCanvas mouse={mouse} />
            </Suspense>

            {/* Floating UI badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-10 left-4 glass neon-border rounded-xl p-3 hidden md:block"
            >
              <p className="font-mono text-xs text-cyan-400">{'<SoftwareEng />'}</p>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute bottom-16 right-4 glass neon-border-purple rounded-xl p-3 hidden md:block"
            >
              <p className="font-mono text-xs text-purple-400">{'{ fullStack: true }'}</p>
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              className="absolute top-1/2 right-2 glass rounded-xl p-3 hidden lg:block"
              style={{ border: '1px solid rgba(6,182,212,0.3)' }}
            >
              <p className="font-mono text-xs text-teal-400">SLIIT · Oct 2024</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 hover:text-cyan-400 transition-colors"
      >
        <span className="font-mono text-xs tracking-widest">SCROLL</span>
        <ChevronDown size={20} />
      </motion.button>
    </section>
  );
}
