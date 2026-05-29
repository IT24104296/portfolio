export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/5 py-10 mt-0">
      <div className="container-custom">
        <div className="glow-line mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-orbitron font-black text-lg gradient-text tracking-widest">
              V<span className="text-cyan-400">//</span>H
            </span>
            <p className="font-mono text-xs text-slate-600 mt-1">VAHINTHAN · PORTFOLIO {year}</p>
          </div>
          <div className="flex items-center gap-6">
            {[
              { label: 'GitHub', href: 'https://github.com/IT24104296' },
              { label: 'LinkedIn', href: 'https://www.linkedin.com/in/raseetharanvahinthan/' },
              { label: 'Email', href: 'mailto:raseetharanvahinthan2003@gmail.com' },
            ].map(link => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-slate-500 hover:text-cyan-400 transition-colors tracking-widest uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="font-mono text-xs text-slate-700">
            Crafted with <span className="text-cyan-400">⚡</span> & passion
          </p>
        </div>
      </div>
    </footer>
  );
}
