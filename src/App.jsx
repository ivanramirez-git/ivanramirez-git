import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
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
    nav: { about: "About", tech: "Stack", exp: "Experience", projects: "Projects", contact: "Contact", services: "Services", resources: "Resources", hire: "Hire Ivan" },
    hero: {
      badge: "AVAILABLE FOR ARCHITECTURE & DEV",
      title: "Ivan Rene Ramirez Castro",
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
    },
    ui: {
      techTitle: "Technology Stack",
      techSections: [
        { title: "Frontend & Mobile", items: ["Angular", "Vue 3", "NextJS", "Flutter (Bloc/GetX)"] },
        { title: "Backend & Systems", items: ["NestJS", ".NET Core", "NodeJS", "LoopBack"] },
        { title: "DevOps & Cloud", items: ["Terraform", "Docker", "AWS", "Azure", "CI/CD Pipelines"] }
      ],
      projectLabel: "WEB APPLICATION",
      liveDemo: "Live Demo",
      previewLabel: "Preview: Micro Freeloz",
      contactTitle: "Let's build something truly scalable.",
      contactCta: "Contact Me",
      footerLine: "Engineered for performance.",
      footerRss: "RSS",
      moreProjectsTitle: "More Projects"
    },
    services: {
      badge: "SERVICES",
      title: "End-to-end engineering leadership.",
      subtitle: "Cloud architecture, DevOps automation, Node.js at scale, and AI integrations delivered with enterprise rigor.",
      highlightsTitle: "What you get",
      highlights: [
        "Scalable architecture with security and cost controls.",
        "Delivery pipelines with observability and incident readiness.",
        "Clear execution plans and leadership alignment."
      ],
      expertiseTitle: "Core expertise",
      expertise: [
        "AWS, Azure, Cloudflare, DNS management",
        "Firebase, Supabase, PostgreSQL, MongoDB",
        "Docker, Terraform, CapRover, CI/CD",
        "Linux servers, networking, and performance tuning",
        "AI integrations, LLM workflows, and guardrails"
      ],
      cta: "Book a strategy call"
    },
    resources: {
      badge: "RESOURCES",
      title: "Playbooks for modern engineering teams.",
      subtitle: "Practical guidance on architecture, delivery, and leadership in one place.",
      sections: [
        { title: "Architecture & Platforms", items: ["Cloud & multi-cloud strategy", "Platform engineering", "Data platforms & analytics"] },
        { title: "Delivery & Reliability", items: ["CI/CD automation", "Observability & SLOs", "Incident response"] },
        { title: "Leadership & Growth", items: ["Hiring systems", "Engineering rituals", "CTO advisory"] }
      ]
    },
    hire: {
      badge: "HIRE IVAN",
      title: "Senior engineer and CTO partner for ambitious teams.",
      subtitle: "Available for full-time roles, fractional CTO, or high-impact consulting.",
      reasonsTitle: "Why teams hire me",
      reasons: [
        "Architecture clarity with execution plans.",
        "Proven delivery across web, mobile, and cloud.",
        "Operational rigor with DevOps automation."
      ],
      availability: "Email me directly"
    },
    caseStudies: {
      badge: "CASE STUDIES",
      title: "Architecture outcomes with measurable impact.",
      subtitle: "Selected work across cloud, product delivery, and platform engineering.",
      items: [
        {
          name: "Micro Freeloz",
          desc: "Tournament platform with full stack delivery and scalable infrastructure.",
          image: "/images/projects/micro-freeloz-home.png",
          alt: "Micro Freeloz home page screenshot",
          link: "https://micro.freeloz.com"
        },
        {
          name: "Micro Freeloz Tournament",
          desc: "Live tournament analytics and standings experience.",
          image: "/images/projects/micro-freeloz-tournament.png",
          alt: "Micro Freeloz tournament page screenshot",
          link: "https://micro.freeloz.com/torneo/68f68c3a33878c42aafe471d"
        },
        {
          name: "Focus Timer",
          desc: "Minimal productivity timer with strong UX and performance.",
          image: "/images/projects/timer-freeloz.png",
          alt: "Timer Freeloz app screenshot",
          link: "https://timer.freeloz.com"
        },
        {
          name: "El Impostor",
          desc: "Realtime party game interface for sessions and joins.",
          image: "/images/projects/impostor-freeloz.png",
          alt: "Impostor Freeloz app screenshot",
          link: "https://impostor.freeloz.com"
        },
        {
          name: "Freeloz",
          desc: "Corporate client site delivering software services and growth.",
          image: "/images/projects/freeloz-home.png",
          alt: "Freeloz corporate site screenshot",
          link: "https://freeloz.com"
        }
      ]
    }
  },
  es: {
    nav: { about: "Sobre mí", tech: "Tecnologías", exp: "Experiencia", projects: "Proyectos", contact: "Contacto", services: "Servicios", resources: "Recursos", hire: "Contratar" },
    hero: {
      badge: "DISPONIBLE PARA ARQUITECTURA Y DESARROLLO",
      title: "Ivan Rene Ramirez Castro",
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
    },
    ui: {
      techTitle: "Tecnologías",
      techSections: [
        { title: "Frontend y Mobile", items: ["Angular", "Vue 3", "NextJS", "Flutter (Bloc/GetX)"] },
        { title: "Backend y Sistemas", items: ["NestJS", ".NET Core", "NodeJS", "LoopBack"] },
        { title: "DevOps y Cloud", items: ["Terraform", "Docker", "AWS", "Azure", "CI/CD Pipelines"] }
      ],
      projectLabel: "APLICACION WEB",
      liveDemo: "Demo en vivo",
      previewLabel: "Vista previa: Micro Freeloz",
      contactTitle: "Construyamos algo realmente escalable.",
      contactCta: "Contactame",
      footerLine: "Ingenieria orientada al rendimiento.",
      footerRss: "RSS",
      moreProjectsTitle: "Mas Proyectos"
    },
    services: {
      badge: "SERVICIOS",
      title: "Liderazgo de ingenieria end-to-end.",
      subtitle: "Arquitectura cloud, automatizacion DevOps, Node.js a escala e integraciones de IA con rigor empresarial.",
      highlightsTitle: "Lo que recibes",
      highlights: [
        "Arquitectura escalable con seguridad y control de costos.",
        "Pipelines con observabilidad y respuesta a incidentes.",
        "Planes de ejecucion claros y alineacion con liderazgo."
      ],
      expertiseTitle: "Experiencia clave",
      expertise: [
        "AWS, Azure, Cloudflare, gestion DNS",
        "Firebase, Supabase, PostgreSQL, MongoDB",
        "Docker, Terraform, CapRover, CI/CD",
        "Servidores Linux, networking y performance",
        "Integraciones de IA, workflows LLM y guardrails"
      ],
      cta: "Agendar llamada estrategica"
    },
    resources: {
      badge: "RECURSOS",
      title: "Playbooks para equipos modernos.",
      subtitle: "Guia practica sobre arquitectura, delivery y liderazgo.",
      sections: [
        { title: "Arquitectura y Plataformas", items: ["Estrategia cloud y multi-cloud", "Platform engineering", "Datos y analytics"] },
        { title: "Entrega y Confiabilidad", items: ["Automatizacion CI/CD", "Observabilidad y SLOs", "Respuesta a incidentes"] },
        { title: "Liderazgo y Crecimiento", items: ["Sistemas de hiring", "Rituales de liderazgo", "CTO advisory"] }
      ]
    },
    hire: {
      badge: "CONTRATAR",
      title: "Ingeniero senior y CTO partner para equipos ambiciosos.",
      subtitle: "Disponible para roles full-time, CTO fraccional o consultoria.",
      reasonsTitle: "Por que me contratan",
      reasons: [
        "Claridad de arquitectura con plan de ejecucion.",
        "Entrega comprobada en web, mobile y cloud.",
        "Rigor operativo con automatizacion DevOps."
      ],
      availability: "Escribeme directamente"
    },
    caseStudies: {
      badge: "CASOS",
      title: "Resultados de arquitectura con impacto medible.",
      subtitle: "Trabajo en cloud, delivery y plataformas.",
      items: [
        {
          name: "Micro Freeloz",
          desc: "Plataforma de torneos con full stack e infraestructura escalable.",
          image: "/images/projects/micro-freeloz-home.png",
          alt: "Captura del home de Micro Freeloz",
          link: "https://micro.freeloz.com"
        },
        {
          name: "Micro Freeloz Torneo",
          desc: "Experiencia de tablas y estadisticas en vivo.",
          image: "/images/projects/micro-freeloz-tournament.png",
          alt: "Captura de torneo Micro Freeloz",
          link: "https://micro.freeloz.com/torneo/68f68c3a33878c42aafe471d"
        },
        {
          name: "Focus Timer",
          desc: "Timer de productividad con UI limpia y performance.",
          image: "/images/projects/timer-freeloz.png",
          alt: "Captura de Timer Freeloz",
          link: "https://timer.freeloz.com"
        },
        {
          name: "El Impostor",
          desc: "Juego realtime para crear y unirse a sesiones.",
          image: "/images/projects/impostor-freeloz.png",
          alt: "Captura de Impostor Freeloz",
          link: "https://impostor.freeloz.com"
        },
        {
          name: "Freeloz",
          desc: "Sitio corporativo de cliente con servicios y crecimiento.",
          image: "/images/projects/freeloz-home.png",
          alt: "Captura de sitio Freeloz",
          link: "https://freeloz.com"
        }
      ]
    }
  }
};

const Layout = ({ lang, setLang, t, children }) => (
  <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30">
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full" />
    </div>

    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md px-6 py-4" aria-label="Primary">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">IR</span>
          </div>
          <span className="hidden sm:inline">ivanrene.com</span>
        </Link>

        <div className="flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="/#about" className="hover:text-white transition-colors">{t.nav.about}</a>
          <a href="/#experience" className="hover:text-white transition-colors">{t.nav.exp}</a>
          <a href="/#projects" className="hover:text-white transition-colors">{t.nav.projects}</a>
          <Link to="/services" className="hover:text-white transition-colors">{t.nav.services}</Link>
          <Link to="/resources" className="hover:text-white transition-colors">{t.nav.resources}</Link>
          <Link to="/case-studies" className="hover:text-white transition-colors">{lang === 'es' ? 'Casos' : 'Case Studies'}</Link>
          <Link to="/hire-ivan" className="hover:text-white transition-colors">{t.nav.hire}</Link>
          <button
            onClick={() => setLang(lang === 'en' ? 'es' : 'en')}
            className="flex items-center gap-1 px-3 py-1 rounded-full border border-slate-800 bg-slate-900/50 hover:border-slate-600 transition-all text-blue-400"
            aria-label={`Language ${lang.toUpperCase()}`}
          >
            <Languages size={14} />
            {lang.toUpperCase()}
          </button>
        </div>
      </div>
    </nav>

    <main className="relative z-10">{children}</main>

    <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="text-slate-400 text-sm">
        © {new Date().getFullYear()} Ivan Rene Ramirez Castro. {t.ui.footerLine}
      </div>
      <div className="flex gap-8 text-slate-400 text-sm font-mono uppercase tracking-widest">
        <span className="text-blue-300">Next.js</span>
        <span className="text-blue-300">Tailwind</span>
        <span className="text-blue-300">Framer Motion</span>
      </div>
      <a
        href="/rss.xml"
        className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
        aria-label="RSS feed"
      >
        {t.ui.footerRss}
      </a>
    </footer>
  </div>
);

const HomePage = ({ t }) => (
  <>
    <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
      <div className="text-center animate-fade-up">
        <span className="px-3 py-1 text-[10px] font-mono tracking-widest text-blue-400 border border-blue-400/30 rounded-full bg-blue-400/5">
          {t.hero.badge}
        </span>

        <div className="mt-8 flex justify-center">
          <img
            src="https://avatars.githubusercontent.com/u/6560951?v=4&s=256"
            alt="Ivan Rene Ramirez Castro"
            width="128"
            height="128"
            loading="eager"
            fetchpriority="high"
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
      </div>
    </section>

        {/* --- ABOUT & MINDSET --- */}
        <section id="about" className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-left">
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
            </div>

            <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm relative group overflow-hidden animate-fade-zoom">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Workflow size={120} />
              </div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <ShieldCheck className="text-blue-500" /> {t.architecture.title}
              </h3>
              <p className="text-slate-400 italic">
                "{t.architecture.text}"
              </p>
            </div>
          </div>
        </section>

        {/* --- TECH GRID --- */}
        <section className="bg-slate-950/50 py-32 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-sm font-mono text-blue-500 uppercase tracking-widest mb-16">{t.ui.techTitle}</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[<Smartphone size={24} />, <Server size={24} />, <Cloud size={24} />].map((icon, idx) => (
                <div key={idx} className="p-8 rounded-2xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 transition-all text-left">
                  <div className="text-blue-500 mb-4">{icon}</div>
                  <h3 className="text-lg font-bold mb-4">{t.ui.techSections[idx].title}</h3>
                  <ul className="space-y-2">
                    {t.ui.techSections[idx].items.map(item => (
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
              <div
                key={idx}
                className="relative pl-8 border-l border-slate-800 group animate-fade-up"
              >
                <div className="absolute left-[-5px] top-0 w-[9px] h-[9px] rounded-full bg-slate-800 group-hover:bg-blue-500 transition-colors" />
                <span className="text-xs font-mono text-blue-500">{exp.date}</span>
                <h3 className="text-xl font-bold mt-1">{exp.company}</h3>
                <p className="text-blue-400 font-medium mb-2">{exp.role}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{exp.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* --- FEATURED PROJECT --- */}
        <section id="projects" className="max-w-7xl mx-auto px-6 py-32 border-t border-white/5">
          <h2 className="text-sm font-mono text-blue-500 uppercase tracking-widest mb-16 text-center">{t.projects.title}</h2>

          <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-3xl overflow-hidden flex flex-col lg:flex-row items-center transition-transform hover:-translate-y-1">
            <div className="lg:w-1/2 p-8 lg:p-16">
              <div className="flex items-center gap-2 text-blue-500 mb-4 font-mono text-xs">
                <Globe size={14} /> {t.ui.projectLabel}
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
                {t.ui.liveDemo} <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>
            </div>

            <div className="lg:w-1/2 bg-slate-800/50 p-4 w-full h-full min-h-[300px] flex items-center justify-center border-l border-white/5">
              <div className="relative w-full aspect-video rounded-xl bg-slate-950 overflow-hidden border border-white/10 shadow-2xl">
                 <div className="absolute inset-0 bg-blue-600/10" />
                 <div className="flex items-center justify-center h-full">
                    <span className="text-slate-500 font-mono text-sm tracking-tighter uppercase opacity-50">{t.ui.previewLabel}</span>
                 </div>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5">
          <h2 className="text-sm font-mono text-blue-500 uppercase tracking-widest mb-12 text-center">{t.ui.moreProjectsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {t.caseStudies.items.slice(0, 4).map((item) => (
              <article key={item.name} className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
                <img src={item.image} alt={item.alt} className="w-full h-56 object-cover" loading="lazy" />
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-slate-400 text-sm mb-4">{item.desc}</p>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-400">
                    {t.ui.liveDemo} <ExternalLink size={14} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* --- CONTACT --- */}
        <section id="contact" className="max-w-7xl mx-auto px-6 py-32 text-center">
          <div className="bg-blue-600 rounded-[3rem] p-12 md:p-24 relative overflow-hidden animate-fade-zoom">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#ffffff10_0%,transparent_70%)]" />

            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-8 relative z-10">
              {t.ui.contactTitle}
            </h2>

            <div className="flex flex-wrap justify-center gap-6 relative z-10">
              <a href="mailto:ivanrene10@gmail.com" className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-100 transition-colors shadow-xl">
                <Mail size={20} /> {t.ui.contactCta}
              </a>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/ivanramirez-git"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ivan Ramirez on GitHub"
                  className="w-12 h-12 rounded-xl bg-blue-700/50 flex items-center justify-center hover:bg-blue-700 transition-colors text-white"
                >
                  <Github />
                </a>
                <a
                  href="https://www.linkedin.com/in/ivanramirez-in"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Ivan Ramirez on LinkedIn"
                  className="w-12 h-12 rounded-xl bg-blue-700/50 flex items-center justify-center hover:bg-blue-700 transition-colors text-white"
                >
                  <Linkedin />
                </a>
              </div>
            </div>
          </div>
        </section>

  </>
);

const ServicesPage = ({ t }) => (
  <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
    <section className="text-center">
      <span className="px-3 py-1 text-[10px] font-mono tracking-widest text-blue-400 border border-blue-400/30 rounded-full bg-blue-400/5">
        {t.services.badge}
      </span>
      <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tighter">{t.services.title}</h1>
      <p className="mt-4 text-slate-400 max-w-3xl mx-auto">{t.services.subtitle}</p>
      <img className="content-image" src="/images/hero-services.png" alt="Professional services overview" loading="lazy" />
    </section>

    <section className="section split">
      <div>
        <h2 className="text-2xl font-bold mb-4">{t.services.highlightsTitle}</h2>
        <ul className="list">
          {t.services.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <img className="content-image" src="/images/section-architecture.png" alt="Architecture planning visual" loading="lazy" />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">{t.services.expertiseTitle}</h2>
        <ul className="list">
          {t.services.expertise.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <img className="content-image" src="/images/section-strategy.png" alt="Technical strategy visual" loading="lazy" />
      </div>
    </section>

    <section className="section text-center">
      <a href="mailto:ivanrene10@gmail.com" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-500 transition-all inline-flex items-center gap-2">
        {t.services.cta} <ChevronRight className="w-4 h-4" />
      </a>
    </section>
  </div>
);

const ResourcesPage = ({ t }) => (
  <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
    <section className="text-center">
      <span className="px-3 py-1 text-[10px] font-mono tracking-widest text-blue-400 border border-blue-400/30 rounded-full bg-blue-400/5">
        {t.resources.badge}
      </span>
      <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tighter">{t.resources.title}</h1>
      <p className="mt-4 text-slate-400 max-w-3xl mx-auto">{t.resources.subtitle}</p>
      <img className="content-image" src="/images/hero-resources.png" alt="Resources library visual" loading="lazy" />
    </section>

    <section className="section grid">
      {t.resources.sections.map((section) => (
        <div key={section.title} className="card">
          <h3 className="text-lg font-bold mb-3">{section.title}</h3>
          <ul className="list">
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  </div>
);

const HirePage = ({ t }) => (
  <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
    <section className="text-center">
      <span className="px-3 py-1 text-[10px] font-mono tracking-widest text-blue-400 border border-blue-400/30 rounded-full bg-blue-400/5">
        {t.hire.badge}
      </span>
      <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tighter">{t.hire.title}</h1>
      <p className="mt-4 text-slate-400 max-w-3xl mx-auto">{t.hire.subtitle}</p>
      <img className="content-image" src="/images/hero-hire.png" alt="Leadership and hiring visual" loading="lazy" />
    </section>

    <section className="section split">
      <div>
        <h2 className="text-2xl font-bold mb-4">{t.hire.reasonsTitle}</h2>
        <ul className="list">
          {t.hire.reasons.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <img className="content-image" src="/images/section-reliability.png" alt="Reliability and execution visual" loading="lazy" />
      </div>
      <div>
        <h2 className="text-2xl font-bold mb-4">{t.services.expertiseTitle}</h2>
        <ul className="list">
          {t.services.expertise.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <img className="content-image" src="/images/section-hiring.png" alt="Team growth visual" loading="lazy" />
      </div>
    </section>

    <section className="section text-center">
      <a href="mailto:ivanrene10@gmail.com" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-blue-500 transition-all inline-flex items-center gap-2">
        {t.hire.availability} <ChevronRight className="w-4 h-4" />
      </a>
    </section>
  </div>
);

const CaseStudiesPage = ({ t }) => (
  <div className="max-w-7xl mx-auto px-6 pt-28 pb-20">
    <section className="text-center">
      <span className="px-3 py-1 text-[10px] font-mono tracking-widest text-blue-400 border border-blue-400/30 rounded-full bg-blue-400/5">
        {t.caseStudies.badge}
      </span>
      <h1 className="mt-6 text-4xl md:text-6xl font-bold tracking-tighter">{t.caseStudies.title}</h1>
      <p className="mt-4 text-slate-400 max-w-3xl mx-auto">{t.caseStudies.subtitle}</p>
      <img className="content-image" src="/images/hero-cases.png" alt="Case studies overview visual" loading="lazy" />
    </section>

    <section className="section grid">
      {t.caseStudies.items.map((item) => (
        <article key={item.name} className="card">
          <img className="content-image" src={item.image} alt={item.alt} loading="lazy" />
          <h3 className="text-lg font-bold mt-4">{item.name}</h3>
          <p className="text-slate-400 text-sm mt-2">{item.desc}</p>
          <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-400 mt-3">
            {t.ui.liveDemo} <ExternalLink size={14} />
          </a>
        </article>
      ))}
    </section>
  </div>
);

const App = () => {
  const [lang, setLang] = useState('en');
  const t = useMemo(() => content[lang], [lang]);

  useEffect(() => {
    const stored = localStorage.getItem('lang');
    const browser = (navigator.language || '').toLowerCase().startsWith('es') ? 'es' : 'en';
    setLang(stored || browser || 'en');
  }, []);

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <Layout lang={lang} setLang={setLang} t={t}>
      <Routes>
        <Route path="/" element={<HomePage t={t} />} />
        <Route path="/services" element={<ServicesPage t={t} />} />
        <Route path="/resources" element={<ResourcesPage t={t} />} />
        <Route path="/hire-ivan" element={<HirePage t={t} />} />
        <Route path="/case-studies" element={<CaseStudiesPage t={t} />} />
      </Routes>
    </Layout>
  );
};

export default App;
