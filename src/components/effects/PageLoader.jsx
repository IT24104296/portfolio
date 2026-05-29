import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [show, setShow] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(intervalRef.current);
          setTimeout(() => {
            setShow(false);
            onComplete?.();
          }, 400);
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 60);
    return () => clearInterval(intervalRef.current);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="loader-screen"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {/* Glowing logo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="font-orbitron text-4xl font-black gradient-text mb-2 tracking-widest">
              VAHINTHAN
            </h1>
            <p className="font-mono text-xs text-cyan-400/60 tracking-[0.3em] uppercase">
              Initializing System...
            </p>
          </motion.div>

          {/* Progress bar */}
          <div className="w-64">
            <div className="flex justify-between mb-2">
              <span className="font-mono text-xs text-slate-500">LOADING</span>
              <span className="font-mono text-xs text-cyan-400">{Math.round(Math.min(progress, 100))}%</span>
            </div>
            <div className="h-0.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, #00d4ff, #7c3aed)',
                  boxShadow: '0 0 10px #00d4ff',
                  width: `${Math.min(progress, 100)}%`,
                }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2 border-cyan-400/40" />
          <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2 border-cyan-400/40" />
          <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2 border-purple-400/40" />
          <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2 border-purple-400/40" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
