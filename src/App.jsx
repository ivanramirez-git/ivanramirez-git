import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Globe,
  Cloud,
  Linkedin,
  Github,
  Mail,
  ChevronRight,
  ExternalLink,
  Smartphone,
  Server,
  Workflow,
  ShieldCheck,
  Languages
} from 'lucide-react';

// --- DICTIONARY ---
const content = {
  en: {
    nav: { about: "About", tech: "Stack", exp: "Experience", projects: "Projects", contact: "Contact" },
    hero: {
      badge: "AVAILABLE FOR ARCHITECTURE & DEV",
      title: "Ivan Ramírez",
      subtitle: "Full Stack Engineer | DevOps | AI Integrations",
      description: "Building resilient software ecosystems. I design, build, and deploy complete architectures across cloud providers.",
      cta_primary: "View Projects",
      cta_secondary: "Architecture Mindset"
    },
    about: {
      title: "I design, build and deploy complete software ecosystems.",
      text: "Systems Engineer with +5 years of experience building scalable web, mobile and cloud architectures. I specialize in Full Stack development, DevOps automation and AI integrations across AWS, Azure and modern cloud platforms."
    },
    architecture: {
      title: "I don't just build features. I design systems.",
      text: "I approach development from an architectural perspective — thinking about scalability, security, automation and cost optimization from day one."
    },
    experience: [
      { company: "CCSolutions", date: "2024 - Present", role: "Full Stack & DevOps", desc: "Automated CI/CD pipelines, multi-cloud infrastructure, and container orchestration." },
      { company: "TechD", date: "2024", role: "AI-powered web applications", desc: "NeuralSeek integrations, LLM fine-tuning, and ElasticSearch optimization." },
      { company: "Double V Partners", date: "2022 - 2024", role: "Full Stack Developer", desc: "Angular + Flutter + .NET + AWS implementations." },
      { company: "EY", date: "2021", role: "Data Specialist", desc: "Database migrations and Azure pipelines." }
    ],
    projects: {
      title: "Featured Project",
      name: "Micro Campeonato Regional",
      desc: "A full ecosystem showing architectural mastery: Vue 3, LoopBack API, Terraform AWS Infra, and Dockerized deployment.",
      tech: ["Vue 3", "Terraform", "AWS", "MongoDB", "MinIO"]
    }
  },
  es: {
    nav: { about: "Sobre mí", tech: "Tecnologías", exp: "Experiencia", projects: "Proyectos", contact: "Contacto" },
    hero: {
      badge: "DISPONIBLE PARA ARQUITECTURA Y DESARROLLO",
      title: "Ivan Ramírez",
      subtitle: "Ingeniero Full Stack | DevOps | Integración de IA",
      description: "Construyendo ecosistemas de software resilientes. Diseño, construyo y despliego arquitecturas completas en múltiples nubes.",
      cta_primary: "Ver Proyectos",
      cta_secondary: "Mentalidad de Arquitecto"
    },
    about: {
      title: "Diseño, construyo y despliego ecosistemas de software completos.",
      text: "Ingeniero de Sistemas con más de 5 años de experiencia creando arquitecturas escalables para web, móvil y nube. Especialista en Full Stack, automatización DevOps e integraciones de IA en AWS, Azure y plataformas modernas."
    },
    architecture: {
      title: "No solo programo funciones. Diseño sistemas.",
      text: "Abordo el desarrollo desde una perspectiva arquitectónica: pensando en escalabilidad, seguridad, automatización y optimización de costos desde el primer día."
    },
    experience: [
      { company: "CCSolutions", date: "2024 - Presente", role: "Full Stack & DevOps", desc: "Automatización de pipelines CI/CD, infraestructura multi-nube y orquestación de contenedores." },
      { company: "TechD", date: "2024", role: "Aplicaciones IA", desc: "Integraciones NeuralSeek, fine-tuning de LLMs y optimización de ElasticSearch." },
      { company: "Double V Partners", date: "2022 - 2024", role: "Full Stack Developer", desc: "Implementaciones en Angular + Flutter + .NET + AWS." },
      { company: "EY", date: "2021", role: "Especialista de Datos", desc: "Migraciones de bases de datos y pipelines de Azure." }
    ],
    projects: {
      title: "Proyecto Destacado",
      name: "Micro Campeonato Regional",
      desc: "Un ecosistema completo que demuestra maestría arquitectónica: Vue 3, LoopBack API, Terraform AWS Infra y despliegue con Docker.",
      tech: ["Vue 3", "Terraform", "AWS", "MongoDB", "MinIO"]
    }
  }
};

const App = () => {
  const [lang, setLang] = useState('en');
  const t = content[lang];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">

      {/* --- BACKGROUND EFFECTS --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm">IR</span>
            </div>
            <span className="hidden sm:inline">ivanrene.com</span>
          </div>

          <div className="flex items-center gap-8 text-sm font-medium text-slate-400">
            <a href="#about" className="hover:text-white transition-colors">{t.nav.about}</a>
            <a href="#experience" className="hover:text-white transition-colors">{t.nav.exp}</a>
            <a href="#projects" className="hover:text-white transition-colors">{t.nav.projects}</a>
            <button
              onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
              className="flex items-center gap-1 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 hover:border-slate-600 transition-all text-blue-400"
            >
              <Languages size={14} />
              {lang.toUpperCase()}
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10">

        {/* --- HERO --- */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <span className="px-3 py-1 text-[10px] font-mono tracking-widest text-blue-400 border border-blue-400/30 rounded-full bg-blue-400/5">
              {t.hero.badge}
            </span>

            <div className="mt-8 flex justify-center">
              <img
                src="https://avatars.githubusercontent.com/u/6560951?v=4"
                alt="Ivan Ramirez"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-slate-900 shadow-2xl ring-2 ring-blue-500/20"
              />
            </div>

            <h1 className="mt-6 text-5xl md:text-8xl font-bold tracking-tighter bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">
              {t.hero.title}
            </h1>

            <p className="mt-4 text-xl md:text-2xl font-medium text-slate-300">
              {t.hero.subtitle}
            </p>

            <p className="mt-6 text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              {t.hero.description}
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a href="#projects" className="group bg-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-500 transition-all duration-300 flex items-center gap-2">
                {t.hero.cta_primary} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#about" className="bg-slate-900 border border-slate-800 px-8 py-4 rounded-xl font-medium hover:border-slate-600 transition-all">
                {t.hero.cta_secondary}
              </a>
            </div>
          </motion.div>
        </section>

        {/* --- ABOUT & MINDSET --- */}
        <section id="about" className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
                {t.about.title}
              </h2>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                {t.about.text}
              </p>

              <div className="flex flex-wrap gap-3">
                {['Angular', 'Flutter', '.NET', 'NestJS', 'AWS', 'Docker', 'Terraform', 'OpenAI'].map(tag => (
                  <span key={tag} className="px-3 py-1 text-xs font-mono bg-slate-900 border border-slate-800 rounded-md text-blue-400">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm relative group overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Workflow size={120} />
              </div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="text-blue-500" /> {t.architecture.title}
              </h3>
              <p className="text-slate-400 italic">
                "{t.architecture.text}"
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- TECH GRID --- */}
        <section className="bg-slate-950/50 py-32 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-sm font-mono text-blue-500 uppercase tracking-widest mb-16">Technology Stack</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "Frontend & Mobile", items: ["Angular", "Vue 3", "NextJS", "Flutter (Bloc/GetX)"], icon: <Smartphone size={24}/> },
                { title: "Backend & Systems", items: ["NestJS", ".NET Core", "NodeJS", "LoopBack"], icon: <Server size={24}/> },
                { title: "DevOps & Cloud", items: ["Terraform", "Docker", "AWS", "Azure", "CI/CD Pipelines"], icon: <Cloud size={24}/> }
              ].map((category, idx) => (
                <div key={idx} className="p-8 rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 transition-all text-left">
                  <div className="text-blue-500 mb-4">{category.icon}</div>
                  <h3 className="text-lg font-bold mb-4">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.items.map(item => (
                      <li key={item} className="text-slate-400 text-sm flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" /> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- EXPERIENCE --- */}
        <section id="experience" className="max-w-4xl mx-auto px-6 py-32">
          <h2 className="text-3xl font-bold mb-16 text-center">{t.nav.exp}</h2>

          <div className="space-y-12">
            {t.experience.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative pl-8 border-l border-slate-800 group"
              >
                <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-slate-800 group-hover:bg-blue-500 transition-colors" />
                <span className="text-xs font-mono text-blue-500">{exp.date}</span>
                <h3 className="text-xl font-bold mt-1">{exp.company}</h3>
                <p className="text-blue-400 font-medium mb-2">{exp.role}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{exp.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* --- FEATURED PROJECT --- */}
        <section id="projects" className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
          <h2 className="text-sm font-mono text-blue-500 uppercase tracking-widest mb-16 text-center">{t.projects.title}</h2>

          <motion.div
            whileHover={{ y: -5 }}
            className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl overflow-hidden flex flex-col lg:flex-row items-center"
          >
            <div className="lg:w-1/2 p-8 lg:p-16">
              <div className="flex items-center gap-2 text-blue-500 mb-4 font-mono text-xs">
                <Globe size={14} /> WEB APPLICATION
              </div>
              <h3 className="text-3xl font-bold mb-6">{t.projects.name}</h3>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                {t.projects.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-10">
                {t.projects.tech.map(tag => (
                  <span key={tag} className="px-2 py-1 bg-slate-800 rounded text-[10px] text-slate-300 border border-white/5">
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href="https://micro.freeloz.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-white font-medium hover:text-blue-400 transition-colors group"
              >
                Live Demo <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>

            <div className="lg:w-1/2 bg-slate-800/50 p-4 w-full h-full min-h-[300px] flex items-center justify-center border-l border-white/5">
              <div className="relative w-full aspect-video rounded-xl bg-slate-950 overflow-hidden border border-white/10 shadow-2xl">
                 <div className="absolute inset-0 bg-blue-600/10" />
                 <div className="flex items-center justify-center h-full">
                    <span className="text-slate-500 font-mono text-sm tracking-tighter uppercase opacity-50">Preview: Micro Freeloz</span>
                 </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* --- CONTACT --- */}
        <section id="contact" className="max-w-7xl mx-auto px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-blue-600 rounded-[3rem] p-12 md:p-24 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff10_0%,transparent_70%)]" />

            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-8 relative z-10">
              Let's build something <br className="hidden md:block" /> truly scalable.
            </h2>

            <div className="flex flex-wrap justify-center gap-6 relative z-10">
              <a href="mailto:ivanrene10@gmail.com" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-100 transition-colors shadow-xl">
                <Mail size={20} /> Contact Me
              </a>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/ivanramirez-git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-blue-700/50 flex items-center justify-center hover:bg-blue-700 transition-colors text-white"
                >
                  <Github />
                </a>
                <a
                  href="https://www.linkedin.com/in/ivanramirez-in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-blue-700/50 flex items-center justify-center hover:bg-blue-700 transition-colors text-white"
                >
                  <Linkedin />
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        {/* --- FOOTER --- */}
        <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Ivan Ramírez. Engineered for performance.
          </div>
          <div className="flex gap-8 text-slate-500 text-sm font-mono uppercase tracking-widest">
            <span className="text-blue-500/50">Next.js</span>
            <span className="text-blue-500/50">Tailwind</span>
            <span className="text-blue-500/50">Framer Motion</span>
          </div>
        </footer>

      </main>
    </div>
  );
};

export default App;
