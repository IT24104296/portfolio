import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, Download, ExternalLink } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const contacts = [
  {
    id: 'email',
    icon: Mail,
    label: 'Email',
    value: 'raseetharanvahinthan2003@gmail.com',
    href: 'mailto:raseetharanvahinthan2003@gmail.com',
    color: '#00d4ff',
    description: 'Drop me a message anytime',
  },
  {
    id: 'github',
    icon: FaGithub,
    label: 'GitHub',
    value: 'github.com/IT24104296',
    href: 'https://github.com/IT24104296',
    color: '#a855f7',
    description: 'Explore my open source work',
  },
  {
    id: 'linkedin',
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/raseetharanvahinthan',
    href: 'https://www.linkedin.com/in/raseetharanvahinthan/',
    color: '#0ea5e9',
    description: "Let's connect professionally",
  },
  {
    id: 'phone',
    icon: Phone,
    label: 'Phone',
    value: '+94 705 069 621',
    href: 'tel:+94705069621',
    color: '#22c55e',
    description: 'Available for a quick chat',
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="section-padding relative overflow-hidden" ref={sectionRef}>
      <div className="orb w-[500px] h-[500px] top-0 left-1/2 -translate-x-1/2 bg-purple-700/8 pointer-events-none" />

      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="section-tag justify-center mb-4">Contact</div>
          <h2 className="font-orbitron text-4xl md:text-5xl font-black text-white leading-tight">
            Let's Build Something
            <br />
            <span className="neon-text">Extraordinary</span>
          </h2>
          <p className="text-slate-400 mt-6 max-w-lg mx-auto leading-relaxed">
            Whether you have an internship opportunity, a project idea, or just want to say hi —
            I'd love to hear from you.
          </p>
        </motion.div>

        {/* Contact cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {contacts.map((contact, i) => (
            <motion.a
              key={contact.id}
              href={contact.href}
              target={contact.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass rounded-2xl p-6 relative overflow-hidden group block text-center cursor-pointer"
              style={{
                border: `1px solid ${contact.color}25`,
                textDecoration: 'none',
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: `radial-gradient(circle at center, ${contact.color}08, transparent 70%)` }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${contact.color}, transparent)` }}
              />

              {/* Icon */}
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.4 }}
                className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{
                  background: `${contact.color}15`,
                  border: `1px solid ${contact.color}30`,
                }}
              >
                <contact.icon size={24} style={{ color: contact.color }} />
              </motion.div>

              <h3
                className="font-orbitron font-bold text-sm mb-1"
                style={{ color: contact.color }}
              >
                {contact.label}
              </h3>
              <p className="text-slate-500 text-xs mb-2">{contact.description}</p>
              <p className="text-slate-300 text-xs font-mono break-all">{contact.value}</p>

              {/* Arrow */}
              <div
                className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: contact.color }}
              >
                <ExternalLink size={12} />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Resume download CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center"
        >
          <div className="glass neon-border rounded-2xl p-10 inline-block max-w-lg w-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-600/5" />
            <div className="relative z-10">
              <p className="font-orbitron text-xs tracking-widest text-slate-500 uppercase mb-3">
                Ready to work together?
              </p>
              <h3 className="font-orbitron text-xl font-bold text-white mb-6">
                Download My <span className="gradient-text">Resume</span>
              </h3>
              <a
                href="/resume.pdf"
                download="Vahinthan_Resume.pdf"
                className="btn-neon btn-neon-solid inline-flex mx-auto text-sm px-8 py-3"
              >
                <Download size={16} />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
